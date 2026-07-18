---
title: Designing tools LLM agents can actually use
description: Lessons from building tool interfaces for production agents, where the API design determines the agent's reliability more than the prompt does.
date: 2026-02-25
tags:
  - ai-agents
  - python
---

When an agent misuses a tool, the instinct is to fix the prompt. In my
experience the leverage is almost always in the tool interface itself. An
agent is an API consumer with unlimited creativity and zero shame; the tool
contract is where you channel that.

## Fewer, wider tools

Our booking agent started with eleven fine-grained tools (`check_room`,
`hold_room`, `price_room`, ...) and the model chained them wrong in every
novel situation. Collapsing them into three intent-level tools
(`search_availability`, `create_booking`, `get_booking`) removed the entire
class of sequencing bugs. The orchestration the model used to improvise now
lives inside the tool, in ordinary tested Python.

## Errors are prompts too

The agent reads exceptions. A bare `422 Unprocessable Entity` teaches it
nothing; an error that names the problem and the remedy fixes the retry:

```json
{
  "error": "check_in_date is in the past",
  "hint": "Dates must be today or later. Today is 2026-02-25.",
  "retryable": true
}
```

After we rewrote error responses in this shape, first-retry success on failed
tool calls roughly tripled. Cheapest reliability win of the project.

## Idempotency, because agents repeat themselves

Agents retry, sometimes after partial successes they did not notice. Every
mutating tool takes a client-generated `idempotency_key`, so the double-booked
room becomes a no-op instead of an incident. This is normal API discipline;
agents just remove the human hesitation that used to hide its absence.

## Say less back

Returning a full ORM dump per result blew the context budget and buried the
signal. Each tool now returns exactly the fields the *next decision* needs,
plus an id for drilling down. Token cost per conversation dropped by a third
and, more surprisingly, answers got better: less noise to attend over.

The through-line: treat the agent as a junior integrator reading your API for
the first time, forever. Everything you would fix in your public API docs
(clear names, one obvious tool per intent, actionable errors, safe retries)
counts double when the consumer improvises at runtime.
