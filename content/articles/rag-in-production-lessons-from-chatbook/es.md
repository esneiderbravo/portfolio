---
title: 'RAG en producción: lecciones del asistente Chatbook'
description: Lo que funcionó (y lo que no) llevando un pipeline RAG a hoteles reales por WhatsApp, desde la estrategia de chunking hasta el grounding de respuestas.
date: 2026-06-28
tags:
  - ai-agents
  - rag
  - python
---

Chatbook es un asistente conversacional que responde a huéspedes de hotel por
WhatsApp: disponibilidad de habitaciones, amenidades, reglas de check-in,
recomendaciones locales. Por debajo es un pipeline de generación aumentada por
recuperación (RAG). Este post reúne las lecciones que sobrevivieron al
contacto con huéspedes reales.

## La versión ingenua falló en silencio

Nuestro primer pipeline era el de libro de texto: partir cada documento del
hotel en chunks de 512 tokens, generar embeddings, recuperar los 4 mejores por
similitud de coseno y meterlos en el prompt. En demo funcionaba precioso y en
producción fallaba de formas que la demo nunca mostró:

- Los huéspedes preguntan en español sobre documentos escritos en inglés. Los
  scores de similitud bajan justo lo suficiente para perder el chunk correcto.
- Las políticas del hotel se contradicen entre documentos de distintas épocas.
  El modelo citaba feliz la versión desactualizada.
- "¿A qué hora es el desayuno?" recuperaba el menú del restaurante, no el
  horario, porque el menú mencionaba el desayuno once veces.

## Lo que de verdad movió la aguja

Tres cambios explican casi toda la mejora de calidad:

**Chunking consciente de la estructura.** En lugar de ventanas de tamaño fijo,
partimos por estructura del documento: un chunk por política, por entrada de
FAQ, por sección de menú. Los chunks se hicieron más pequeños y la
recuperación mucho más precisa.

**Filtros de metadata antes de la similitud.** Cada chunk lleva el id del
hotel, el tipo de documento y una fecha `valid_from`. La recuperación filtra
primero por eso y ordena por similitud después. Ese único cambio eliminó las
citas de políticas desactualizadas.

**Verificación de grounding.** Tras generar, corremos un pase barato de
verificación: ¿la respuesta aparece realmente en el contexto recuperado? Si
no, el asistente dice que no lo sabe y ofrece contactar a recepción. Los
huéspedes confían mucho más en "déjame conectarte con el equipo" que en una
respuesta equivocada dicha con confianza.

```python
async def answer(question: str, hotel_id: str) -> Answer:
    chunks = await retrieve(question, hotel_id=hotel_id, top_k=6)
    draft = await generate(question, chunks)
    if not await is_grounded(draft, chunks):
        return Answer.fallback(hotel_id)
    return draft
```

## La evaluación es el producto real

El pipeline cambiaba cada semana; lo que nos mantuvo honestos fue un set de
regresión de unas 200 preguntas reales de huéspedes con respuestas revisadas.
Cada cambio corría contra ese set antes del deploy. Cuando un hotel se
incorporaba, generábamos un set inicial desde sus documentos y el hotel lo
revisaba. Aburrido, nada glamuroso y la mejor inversión del proyecto.

## Lo que me saltaría la próxima vez

Los modelos de reranking añadieron latencia y casi nada de calidad en nuestro
corpus de documentos cortos. La búsqueda híbrida (BM25 + vectores) ayudó solo
después de tener filtros de metadata, y para entonces la ganancia era
marginal. Empieza por estructura y metadata; añade maquinaria solo cuando el
set de evaluación lo exija.
