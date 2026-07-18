---
title: Diseñar herramientas que los agentes LLM puedan usar de verdad
description: Lecciones construyendo interfaces de herramientas para agentes en producción, donde el diseño de la API determina la confiabilidad del agente más que el prompt.
date: 2026-02-25
tags:
  - ai-agents
  - python
---

Cuando un agente usa mal una herramienta, el instinto es arreglar el prompt.
En mi experiencia la palanca está casi siempre en la interfaz de la
herramienta. Un agente es un consumidor de API con creatividad ilimitada y
cero vergüenza; el contrato de la herramienta es donde canalizas eso.

## Menos herramientas, más anchas

Nuestro agente de reservas empezó con once herramientas de grano fino
(`check_room`, `hold_room`, `price_room`, ...) y el modelo las encadenaba mal
en cada situación nueva. Colapsarlas en tres herramientas a nivel de intención
(`search_availability`, `create_booking`, `get_booking`) eliminó la clase
entera de bugs de secuenciación. La orquestación que el modelo improvisaba
ahora vive dentro de la herramienta, en Python normal y testeado.

## Los errores también son prompts

El agente lee las excepciones. Un `422 Unprocessable Entity` pelado no le
enseña nada; un error que nombra el problema y el remedio arregla el retry:

```json
{
  "error": "check_in_date is in the past",
  "hint": "Dates must be today or later. Today is 2026-02-25.",
  "retryable": true
}
```

Tras reescribir las respuestas de error con esta forma, el éxito al primer
retry sobre llamadas fallidas se triplicó aproximadamente. La ganancia de
confiabilidad más barata del proyecto.

## Idempotencia, porque los agentes se repiten

Los agentes reintentan, a veces tras éxitos parciales que no notaron. Toda
herramienta que muta recibe un `idempotency_key` generado por el cliente, así
la habitación doblemente reservada se vuelve un no-op en lugar de un
incidente. Es disciplina normal de APIs; los agentes solo eliminan la
vacilación humana que antes escondía su ausencia.

## Responde menos

Devolver un volcado completo del ORM por resultado reventaba el presupuesto de
contexto y enterraba la señal. Cada herramienta ahora devuelve exactamente los
campos que necesita la *siguiente decisión*, más un id para profundizar. El
costo en tokens por conversación bajó un tercio y, más sorprendente, las
respuestas mejoraron: menos ruido que atender.

El hilo conductor: trata al agente como un integrador junior leyendo tu API
por primera vez, para siempre. Todo lo que arreglarías en la documentación de
tu API pública (nombres claros, una herramienta obvia por intención, errores
accionables, retries seguros) cuenta doble cuando el consumidor improvisa en
runtime.
