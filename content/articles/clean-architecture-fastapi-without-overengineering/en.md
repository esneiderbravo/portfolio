---
title: Clean architecture in FastAPI without overengineering
description: Where I draw the layer boundaries in a real FastAPI service, and where I deliberately stop drawing them.
date: 2026-06-02
tags:
  - clean-architecture
  - fastapi
  - python
---

Clean architecture discussions tend to jump straight to diagrams with five
concentric circles. Most FastAPI services need exactly three layers, and the
discipline is not in adding layers but in respecting the two boundaries
between them.

## The three layers

```text
routers/     HTTP: request parsing, status codes, auth dependencies
services/    business logic: pure-ish Python, no HTTP, no ORM queries
repositories/ persistence: all SQLAlchemy lives here
```

The rules that matter:

- **Routers never touch the ORM.** A router parses input, calls one service
  function, and shapes the response. If a router has a `select()` in it, the
  boundary is already gone.
- **Services never import FastAPI.** No `Request`, no `HTTPException`.
  Services raise domain errors (`InsufficientFunds`, `LoanNotFound`) and an
  exception handler maps them to status codes in one place.
- **Repositories return domain objects, not rows.** The service layer should
  not know whether data came from Postgres, a cache, or a test fake.

## What I deliberately skip

**No use-case classes with one method.** A module of plain functions does the
same job with less ceremony. When a function needs shared dependencies, an
explicit parameter beats a class holding it.

**No repository interfaces "for swappability".** We are not going to swap
Postgres. Tests use the real database in a container; fakes appear only where
the real thing is slow or external (payment gateways, LLM calls).

**No DTO-to-entity-to-model mapping chains.** Pydantic schemas at the edge,
domain dataclasses inside, and one honest mapping function between them. Three
representations is already plenty.

## The payoff, concretely

On a lending platform this structure meant the underwriting rules lived in
`services/underwriting.py` as plain functions over dataclasses. When the
business asked "what would change if we lowered the minimum score", we
answered by running the service layer against a CSV of historical
applications. No HTTP, no database, just imports. That test took minutes to
write because the boundary was already there.

Overengineering and underengineering fail the same way: the code stops telling
you where things belong. Three layers and two enforced boundaries is the
smallest structure I know that keeps the answer obvious.
