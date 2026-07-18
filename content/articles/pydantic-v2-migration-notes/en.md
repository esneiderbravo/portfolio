---
title: Migrating a large FastAPI codebase to Pydantic v2
description: Notes from moving ~400 models to Pydantic v2, the breakages the guide warned about, the ones it did not, and the performance payoff.
date: 2026-03-12
tags:
  - python
  - fastapi
---

We migrated a lending platform with roughly 400 Pydantic models from v1 to v2
over two weeks. The official migration guide covers the renames; these notes
cover what actually cost us time.

## The mechanical part is genuinely mechanical

`bump-pydantic` handled most renames: `validator` to `field_validator`,
`Config` classes to `model_config`, `.dict()` to `.model_dump()`. Two days,
mostly review. Do not hand-edit what the codemod can do.

## What actually broke

**Stricter coercion by default.** v1 quietly turned the string `"3"` into the
int `3` everywhere. v2 is stricter in places, and some of our API clients
depended on the sloppiness. We audited the boundary schemas and kept lax types
(`int | str` with a normalizing validator) only where real traffic needed
them.

**Optional no longer means default None.** In v1, `x: Optional[int]` was
implicitly optional with default `None`. In v2 it is required unless you write
`= None`. This one produces runtime validation errors, not import errors, so
it hides until a request omits the field. Grep for `Optional[` without `=` and
fix them all up front.

**Custom root types and `__get_validators__`.** Every hand-rolled custom type
needed rewriting to the new `__get_pydantic_core_schema__` protocol. This was
the only part requiring actual thought; budget it for whatever wraps ids,
money, or phone numbers in your codebase.

## The payoff

Validation-heavy endpoints got measurably faster since pydantic-core does the
work in Rust. Our ingestion endpoint, which validates deeply nested payloads,
dropped from 210 ms to 160 ms p95 with no other change. Serialization with
`model_dump_json()` showed similar gains.

Beyond speed: `model_validate` with strict mode in tests caught two dormant
bugs where tests were passing dicts that production could never produce.

## Recommendations condensed

1. Run `bump-pydantic` first; review its diff instead of writing your own.
2. Fix all `Optional` defaults before running anything.
3. Inventory custom types early; they are the real work.
4. Keep one PR: a half-migrated codebase with v1 shims is worse than either
   world.
