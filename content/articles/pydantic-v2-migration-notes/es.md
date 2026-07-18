---
title: Migrar una base de código FastAPI grande a Pydantic v2
description: Notas de mover ~400 modelos a Pydantic v2, las rupturas que la guía anunciaba, las que no, y la ganancia de rendimiento.
date: 2026-03-12
tags:
  - python
  - fastapi
---

Migramos una plataforma de préstamos con unos 400 modelos Pydantic de v1 a v2
en dos semanas. La guía oficial de migración cubre los renombres; estas notas
cubren lo que de verdad nos costó tiempo.

## La parte mecánica es genuinamente mecánica

`bump-pydantic` resolvió la mayoría de renombres: `validator` a
`field_validator`, clases `Config` a `model_config`, `.dict()` a
`.model_dump()`. Dos días, casi todo revisión. No edites a mano lo que el
codemod puede hacer.

## Lo que sí se rompió

**Coerción más estricta por defecto.** v1 convertía en silencio el string
`"3"` en el int `3` en todos lados. v2 es más estricto en varios puntos, y
algunos clientes de nuestra API dependían de esa laxitud. Auditamos los
esquemas de frontera y mantuvimos tipos laxos (`int | str` con un validador
normalizador) solo donde el tráfico real lo necesitaba.

**Optional ya no implica default None.** En v1, `x: Optional[int]` era
implícitamente opcional con default `None`. En v2 es requerido salvo que
escribas `= None`. Esto produce errores de validación en runtime, no de
import, así que se esconde hasta que un request omite el campo. Busca
`Optional[` sin `=` y arréglalos todos de entrada.

**Root types custom y `__get_validators__`.** Cada tipo custom hecho a mano
necesitó reescribirse al nuevo protocolo `__get_pydantic_core_schema__`. Fue
la única parte que exigió pensar de verdad; presupuéstala para lo que envuelva
ids, dinero o teléfonos en tu código.

## La ganancia

Los endpoints pesados en validación se volvieron notablemente más rápidos, ya
que pydantic-core hace el trabajo en Rust. Nuestro endpoint de ingesta, que
valida payloads profundamente anidados, bajó de 210 ms a 160 ms p95 sin ningún
otro cambio. La serialización con `model_dump_json()` mostró ganancias
similares.

Más allá de la velocidad: `model_validate` en modo estricto dentro de los
tests atrapó dos bugs dormidos donde los tests pasaban dicts que producción
jamás podría producir.

## Recomendaciones condensadas

1. Corre `bump-pydantic` primero; revisa su diff en lugar de escribir el tuyo.
2. Arregla todos los defaults de `Optional` antes de correr nada.
3. Inventaría los tipos custom temprano; son el trabajo real.
4. Un solo PR: una base a medio migrar con shims de v1 es peor que cualquiera
   de los dos mundos.
