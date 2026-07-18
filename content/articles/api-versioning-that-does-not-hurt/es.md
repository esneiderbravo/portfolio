---
title: Versionado de APIs que no duele
description: Por qué dejamos de planear el /v2 y adoptamos cambios solo aditivos, migraciones expand-contract y headers de sunset.
date: 2026-01-15
tags:
  - fastapi
  - clean-architecture
  - python
---

Toda reunión de diseño de API pregunta en algún momento "¿cuál es nuestra
estrategia de versionado?", y la respuesta esperada es un esquema de URLs.
Tras años manteniendo APIs de cara a partners, mi respuesta honesta es: la
mejor estrategia de versionado es necesitar una lo menos posible.

## Aditivo por defecto

La mayoría de cambios no necesita versión si sostienes dos líneas:

- **Añadir campos nuevos en las respuestas siempre es seguro.** Los
  consumidores deben ignorar campos desconocidos; lo declaramos en el contrato
  y probamos nuestros propios SDKs contra eso.
- **Los campos nuevos de request son siempre opcionales con un default
  compatible.** Un campo nuevo requerido es un cambio rompiente con sombrero.

Con esas reglas aplicadas en review, nuestra API de partners absorbió tres
años de cambios de producto en la misma versión mayor.

## Cuando un cambio sí rompe

Renombrar un campo, cambiar semántica, partir un recurso. Para esto usamos
expand-contract, la misma disciplina que las migraciones de base de datos sin
downtime:

1. **Expandir.** Publica el campo nuevo junto al viejo, ambos poblados.
2. **Migrar.** Mueve a los consumidores con documentación, avisos de
   deprecación en la respuesta (headers `Deprecation` y `Sunset`) y métricas
   de uso por campo y por cliente para saber quién falta.
3. **Contraer.** Elimina el campo viejo cuando su tráfico llegue a cero, o
   cuando llegue la fecha de sunset anunciada.

Las métricas del paso 2 son lo más importante: "quién sigue mandando `amount`
en vez de `amount_cents`" debe ser un dashboard, no un proyecto de
arqueología.

## ¿Por qué no simplemente /v2?

Una versión en la URL bifurca toda la superficie para cambiar un endpoint.
Ambas bifurcaciones necesitan tests, docs, revisión de seguridad,
conocimiento de guardia; la bifurcación vive años porque las fechas de
migración se corren. Hay casos legítimos (un rediseño real, un congelamiento
contractual para un regulador) y ahí una versión en el path es honesta. Como
reflejo por defecto, convierte cada evolución pequeña en un proyecto de
plataforma.

La estrategia en una línea: haz aburridos los cambios aditivos, haz raros e
instrumentados los cambios rompientes, y trata el `/v2` como la alarma de
incendios, no como la manija de la puerta.
