---
title: Optimización de consultas PostgreSQL en un backend fintech
description: Una guía de campo sobre las consultas que de verdad se vuelven lentas en sistemas de préstamos, y los índices y reescrituras que las arreglaron.
date: 2026-05-20
tags:
  - postgresql
  - fintech
  - python
---

Los sistemas de préstamos producen una carga de consultas muy particular:
tablas de ledger que solo crecen, dashboards que agregan por cliente y por
día, y reportes de cumplimiento que barren meses de historia. Estos son los
patrones que se nos volvieron lentos y qué arregló cada uno.

## La paginación que escaneaba todo

El clásico: `OFFSET 40000 LIMIT 20` en la pantalla de transacciones. Postgres
igual lee y descarta las cuarenta mil filas antes de tu página. La paginación
por keyset lee solo lo que devuelve:

```sql
SELECT * FROM transactions
WHERE (created_at, id) < (:last_seen_at, :last_seen_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Con un índice en `(created_at DESC, id DESC)` el costo se mantiene plano sin
importar cuánto profundice el usuario. El p95 de ese endpoint pasó de 1.8 s a
40 ms.

## El filtro de estado que ignoraba su índice

Casi toda consulta operativa filtraba por `status = 'pending'`, que era
alrededor del 2% de una tabla grande. Un índice completo sobre `status` era
grande y frío; un índice parcial calzaba exacto con la carga:

```sql
CREATE INDEX idx_disbursements_pending
ON disbursements (created_at)
WHERE status = 'pending';
```

Lo bastante pequeño para vivir en memoria, y el planner lo elige siempre que
la consulta coincide con el predicado.

## El dashboard que agregaba en vivo

Los dashboards de portafolio calculaban saldos agregando el ledger en cada
carga de página. El arreglo no fue una consulta más rápida sino un contrato
distinto: una vista materializada refrescada cada cinco minutos, más una
etiqueta honesta de "datos al corte" en la UI. Producto aceptó que nadie
necesita ver los saldos moverse en tiempo real. La base dejó de hacer la misma
agregación de millones de filas cientos de veces al día.

## El hábito que importa más que cualquier truco

Cada historia de consulta lenta de arriba se encontró igual:
`pg_stat_statements` ordenado por `total_exec_time`, una vez por semana, en un
bloque recurrente de calendario. No cuando algo se incendiaba. Las tres
primeras entradas casi siempre pagan la hora completa, y un
`EXPLAIN (ANALYZE, BUFFERS)` sobre una copia de tamaño productivo te dice si
el arreglo es un índice, una reescritura o una conversación con producto sobre
qué necesita realmente esa pantalla.
