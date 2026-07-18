---
title: Structured logging for FastAPI you can actually query
description: Moving a FastAPI service from print-style logs to structured events with request context, and the queries that became possible.
date: 2026-04-14
tags:
  - observability
  - fastapi
  - python
---

The difference between logs you grep and logs you query is the difference
between "I think it was the retry logic" and "requests from client X started
failing at 14:32 with timeout errors on the payments dependency". Here is the
setup that got us there.

## Events, not sentences

Log entries are dictionaries with a stable event name and typed fields, not
prose with values interpolated in:

```python
log.info("disbursement_created",
         loan_id=loan.id, amount_cents=amount, channel="ach")
```

The event name is a constant you can count, alert on, and dashboard. The
fields are dimensions. `structlog` does the heavy lifting, rendered as JSON in
production and as colored key-value pairs in development.

## Context comes from middleware, not arguments

Nobody should thread a request id through fifteen function calls. A middleware
binds request-scoped context once, using contextvars, and every log line in
that request inherits it:

```python
@app.middleware("http")
async def bind_request_context(request: Request, call_next):
    structlog.contextvars.bind_contextvars(
        request_id=request.headers.get("x-request-id", str(uuid4())),
        client_id=getattr(request.state, "client_id", None),
        path=request.url.path,
    )
    try:
        return await call_next(request)
    finally:
        structlog.contextvars.clear_contextvars()
```

Async-safe, invisible to business code, and suddenly every event carries the
who and the where.

## The three rules that kept it useful

1. **One access log per request, emitted by middleware,** with status,
   duration, and the bound context. Handlers log domain events only.
2. **Never log payloads.** Log ids and derived facts (`item_count=3`), not
   bodies. This is a compliance rule in fintech and good hygiene everywhere.
3. **Errors log once, at the boundary.** The exception handler logs with full
   context; inner layers raise and stay quiet. Log-and-reraise at every level
   is how one failure becomes forty lines of noise.

## Was it worth it?

The week after rollout, a partner reported intermittent failures. One query
(filter by their `client_id`, group by `event`) showed their requests hitting
a timeout on a single downstream dependency, starting exactly when their
traffic doubled. Ten minutes, no reproduction environment, no grep
archaeology. That one incident paid for the whole migration.
