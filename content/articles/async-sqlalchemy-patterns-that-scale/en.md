---
title: Async SQLAlchemy patterns that survive production
description: Session scope, lazy loading traps, and connection pool sizing for FastAPI services on SQLAlchemy 2.0 async.
date: 2026-02-10
tags:
  - python
  - postgresql
  - fastapi
---

SQLAlchemy 2.0's async support is excellent and unforgiving. The patterns that
were mildly wasteful in sync code become deadlocks and cryptic
`MissingGreenlet` errors in async. These are the rules our team converged on
after running it in production for a year.

## One session per request, injected

The session is request-scoped, created by a dependency, committed on success,
rolled back on error, always closed:

```python
async def get_session() -> AsyncIterator[AsyncSession]:
    async with session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

No sessions created inside services, no session-per-query, no global session.
Every violation of this rule eventually shows up as a connection leak under
load.

## Lazy loading is a trap; make it an error

Accessing an unloaded relationship in async raises `MissingGreenlet`, usually
somewhere far from the query, during response serialization. Instead of
sprinkling `await session.refresh()` everywhere, we made lazy loading
impossible and loading explicit:

```python
class Base(DeclarativeBase):
    __mapper_args__ = {"lazy": "raise"}
```

Now every relationship is loaded with `selectinload()` or `joinedload()` at
query time, where you can see it, or the query fails loudly in tests instead
of quietly in production.

## Pool sizing is a budget, not a vibe

Each worker holds its own pool. The arithmetic that matters:

```text
workers x (pool_size + max_overflow) <= postgres max_connections - headroom
```

We run 4 workers with `pool_size=10, max_overflow=5`, which caps at 60
connections against Postgres's 100, leaving room for migrations, cron jobs,
and humans with `psql`. When we violated this (8 workers, defaults), the
symptom was not an error but p99 latency spikes as requests queued for
connections. `pool_timeout=5` with a loud log turned that silent queueing into
a visible signal.

## The one-liner summary

Sessions are request-scoped and injected; relationship loading is explicit or
an error; the pool math is written down in the config file next to the
numbers. Everything else about async SQLAlchemy has been pleasantly boring.
