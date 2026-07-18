---
title: 'Practical TDD: when it pays off and when it does not'
description: Test-first is a tool, not a religion. The kinds of code where TDD earns its keep, and the kinds where I write tests after.
date: 2026-05-06
tags:
  - tdd
  - python
---

I write tests first for some code and tests after for other code, and the
split is not laziness. After years of shipping backends, the pattern is
consistent enough to write down.

## Where test-first genuinely wins

**Business rules with many cases.** Interest accrual, fee waterfalls,
eligibility rules. The test list doubles as the spec, and writing it first
exposes the cases the ticket forgot. By the time the implementation exists,
the edge cases are already encoded.

**Bug fixes, always.** Reproduce the bug in a failing test before touching the
code. It keeps the fix honest and makes the regression impossible to
reintroduce silently. This is the single highest-return habit in this post.

**Parsers and validators.** Anything that turns messy input into structured
data has adversarial examples worth listing up front: the empty string, the
double delimiter, the date that only exists in one timezone.

## Where test-first fights you

**Exploratory code.** When I do not yet know what the interface should be,
tests written first calcify a guess. I spike, learn the shape, throw the spike
away, then write tests for the real thing.

**Thin glue.** A router that parses a request and calls one service does not
need a test written first; it needs one integration test written ever.

**UI details.** Snapshot-driven TDD on visual code produces tests that assert
whatever the code happened to do.

## The actual discipline

The valuable part of TDD was never the ceremony; it is two properties you can
keep even when writing tests after:

1. **Tests describe behavior, not implementation.** If renaming a private
   function breaks tests, they were watching the wrong thing.
2. **You have seen every test fail.** A test whose failure you never witnessed
   is a hope, not a check. When writing tests after, break the code on purpose
   for a second to watch the test catch it.

Rule of thumb: the more the code is *decisions* (rules, math, branching), the
earlier the tests. The more it is *wiring*, the later, and the more they
should be integration-shaped.
