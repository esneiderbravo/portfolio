---
title: API versioning that does not hurt
description: Why we stopped planning for /v2 and adopted additive-only changes, expand-contract migrations, and sunset headers instead.
date: 2026-01-15
tags:
  - fastapi
  - clean-architecture
  - python
---

Every API design meeting eventually asks "what is our versioning strategy?",
and the expected answer is a URL scheme. After maintaining partner-facing APIs
for years, my honest answer is: the best versioning strategy is needing one as
rarely as possible.

## Additive by default

Most changes do not need a version at all if you hold two lines:

- **New fields in responses are always safe to add.** Consumers must ignore
  unknown fields; we state it in the contract and test our own SDKs against
  it.
- **New request fields are always optional with a compatible default.** A
  required new field is a breaking change wearing a hat.

With those rules enforced in review, our partner API absorbed three years of
product changes, in the same major version.

## When a change really is breaking

Renaming a field, changing semantics, splitting a resource. For these we use
expand-contract, the same discipline as zero-downtime database migrations:

1. **Expand.** Ship the new field alongside the old one, both populated.
2. **Migrate.** Move consumers over with docs, deprecation notices in the
   response (`Deprecation` and `Sunset` headers), and usage metrics per field
   per client so you know who is left.
3. **Contract.** Remove the old field when its traffic hits zero, or when the
   announced sunset date arrives.

Step 2's metrics matter most: "who still sends `amount` instead of
`amount_cents`" must be a dashboard, not an archaeology project.

## Why not just /v2?

A URL version forks the whole surface to change one endpoint. Both forks need
tests, docs, security review, on-call knowledge; the fork lives for years
because migration deadlines slip. There are legitimate cases (a true redesign,
a contractual freeze for a regulator) and then a path version is honest. As a
default reflex it converts every small evolution into a platform project.

The strategy in one line: make additive changes boring, make breaking changes
rare and instrumented, and treat `/v2` as the fire alarm, not the door handle.
