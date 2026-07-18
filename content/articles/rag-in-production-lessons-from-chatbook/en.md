---
title: 'RAG in production: lessons from the Chatbook assistant'
description: What worked (and what did not) taking a RAG pipeline to real hotels over WhatsApp, from chunking strategy to answer grounding.
date: 2026-06-28
tags:
  - ai-agents
  - rag
  - python
---

Chatbook is a conversational assistant that answers hotel guests over
WhatsApp: room availability, amenities, check-in rules, local tips. Under the
hood it is a retrieval-augmented generation (RAG) pipeline. This post collects
the lessons that survived contact with real guests.

## The naive version failed quietly

Our first pipeline was the textbook one: split every hotel document into
512-token chunks, embed them, retrieve the top 4 by cosine similarity, and
stuff them into the prompt. It demoed beautifully and failed in production in
ways the demo never showed:

- Guests ask in Spanish about documents written in English. Similarity scores
  drop just enough to miss the right chunk.
- Hotel policies contradict each other across documents of different ages.
  The model happily cited the outdated one.
- "What time is breakfast?" retrieved the restaurant menu, not the schedule,
  because the menu mentioned breakfast eleven times.

## What actually moved the needle

Three changes accounted for most of the quality gain:

**Structure-aware chunking.** Instead of fixed-size windows, we chunk on
document structure: one chunk per policy, per FAQ entry, per menu section.
Chunks got smaller and retrieval got dramatically more precise.

**Metadata filters before similarity.** Every chunk carries the hotel id,
document type, and a `valid_from` date. Retrieval filters on those first and
ranks by similarity second. That single change killed the outdated-policy
citations.

**Answer grounding checks.** After generation we run a cheap verification
pass: does the answer actually appear in the retrieved context? If not, the
assistant says it does not know and offers to contact the front desk. Guests
trust "let me connect you with the team" far more than a confident wrong
answer.

```python
async def answer(question: str, hotel_id: str) -> Answer:
    chunks = await retrieve(question, hotel_id=hotel_id, top_k=6)
    draft = await generate(question, chunks)
    if not await is_grounded(draft, chunks):
        return Answer.fallback(hotel_id)
    return draft
```

## Evaluation is the real product

The pipeline changed weekly; what kept us honest was a regression set of about
200 real guest questions with reviewed answers. Every change ran against it
before deploy. When a hotel onboarded, we generated a starter set from their
documents and had the hotel review it. Boring, unglamorous, and the single
best investment of the project.

## What I would skip next time

Reranking models added latency and almost no quality on our short-document
corpus. Hybrid search (BM25 + vectors) helped only after we had metadata
filters, and by then the gain was marginal. Start with structure and metadata;
add machinery only when the eval set demands it.
