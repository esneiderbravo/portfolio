---
title: PostgreSQL query optimization in a fintech backend
description: A field guide to the queries that actually get slow in lending systems, and the indexes and rewrites that fixed them.
date: 2026-05-20
tags:
  - postgresql
  - fintech
  - python
---

Lending systems produce a very particular query workload: append-heavy ledger
tables, dashboards that aggregate by customer and by day, and compliance
reports that scan months of history. These are the patterns that got slow for
us and what fixed each one.

## The pagination that scanned everything

The classic: `OFFSET 40000 LIMIT 20` on the transactions screen. Postgres
still reads and discards the forty thousand rows before your page. Keyset
pagination reads only what it returns:

```sql
SELECT * FROM transactions
WHERE (created_at, id) < (:last_seen_at, :last_seen_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

With an index on `(created_at DESC, id DESC)` this stays flat no matter how
deep the user scrolls. p95 on that endpoint went from 1.8 s to 40 ms.

## The status filter that ignored its index

Nearly every operational query filtered on `status = 'pending'`, which was
about 2% of a large table. A full index on `status` was big and cold; a
partial index matched the workload exactly:

```sql
CREATE INDEX idx_disbursements_pending
ON disbursements (created_at)
WHERE status = 'pending';
```

Small enough to live in memory, and the planner picks it every time the query
matches the predicate.

## The dashboard that aggregated live

Portfolio dashboards computed balances by aggregating the ledger on every
page load. The fix was not a faster query but a different contract: a
materialized view refreshed every five minutes, plus an honest "as of" label
in the UI. Product agreed nobody needs to watch balances tick in real time.
The database stopped doing the same multi-million-row aggregation hundreds of
times a day.

## The habit that matters more than any trick

Every slow-query story above was found the same way: `pg_stat_statements`
sorted by `total_exec_time`, once a week, in a recurring calendar slot. Not
when things were on fire. The top three entries almost always pay for the
whole hour, and `EXPLAIN (ANALYZE, BUFFERS)` on a production-sized copy tells
you whether the fix is an index, a rewrite, or a conversation with product
about what the screen really needs.
