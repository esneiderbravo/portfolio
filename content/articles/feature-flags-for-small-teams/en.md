---
title: Feature flags for small teams, without a platform
description: A flags table, a decorator, and three lifecycle rules. Everything a small backend team needs before buying a feature-flag platform.
date: 2026-01-28
tags:
  - python
  - fastapi
  - devops
---

Feature-flag platforms are great, and most small teams reach for one about two
years before they need it. Here is the sub-100-line setup that carried our
team through dozens of gradual rollouts, and the lifecycle rules that matter
more than the tooling.

## The whole implementation

A table, a cached loader, and a check:

```python
class FeatureFlag(Base):
    __tablename__ = "feature_flags"
    name: Mapped[str] = mapped_column(primary_key=True)
    enabled: Mapped[bool] = mapped_column(default=False)
    rollout_percent: Mapped[int] = mapped_column(default=0)
    allow_list: Mapped[list[str]] = mapped_column(JSONB, default=list)

async def is_enabled(flag: str, subject_id: str) -> bool:
    f = await flags_cache.get(flag)          # 30s TTL
    if f is None or not f.enabled:
        return False
    if subject_id in f.allow_list:
        return True
    bucket = crc32(f"{flag}:{subject_id}".encode()) % 100
    return bucket < f.rollout_percent
```

The hash makes rollout sticky per subject: a customer at 20% stays in the 20%
as you dial up, instead of flickering between code paths on every request.
Flipping a flag is an `UPDATE`, effective within the cache TTL, no deploy.

## The rules that keep it sane

**Flags are branches in the code review sense.** Both paths get tested, and a
flag PR includes the removal ticket. A flag without a removal date is not a
rollout, it is permanent configuration wearing a disguise.

**One flag per behavior, never nested.** The moment `if flag_a and not
flag_b` appears, you have four states, three of which nobody has run. Flatten
into a single flag or an explicit enum-valued setting.

**Log the decision.** Every check logs flag name, subject, and outcome into
request context. When support asks "why did this customer get the old flow",
the answer is a query, not an investigation.

## When to graduate

We moved to a hosted platform when non-engineers needed to flip flags and when
we wanted percentage rollouts coordinated across three services. Those are
real needs; a five-person team shipping one backend does not have them yet.
The table version costs an afternoon and teaches you exactly what to demand
from the platform later.
