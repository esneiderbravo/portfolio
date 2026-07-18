---
title: 'AWS Lambda cost tuning: field notes'
description: How we cut a serverless bill roughly in half with memory right-sizing, batching, and honest questions about what needed to be a Lambda at all.
date: 2026-03-30
tags:
  - aws
  - devops
---

Serverless bills grow quietly. Each function costs cents, nobody watches the
total, and one day finance asks why the line item doubled. These notes come
from one such audit on an event-driven ingestion platform.

## Memory is also CPU

Lambda allocates CPU proportionally to memory, so the cheapest setting is
rarely the lowest one. A CPU-bound parser at 128 MB ran for 9 seconds; at
1024 MB it finished in about a second. Eight times the price per millisecond,
nine times fewer milliseconds: slightly cheaper *and* dramatically faster.

Do not guess: [AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning)
runs your function across memory sizes and draws the cost-duration curve.
Nearly all our functions had a clear elbow; almost none sat at it.

## Stop paying per event

Our worst offender processed SQS messages one at a time: one invocation per
message, most of it spent opening connections. Three settings changed the
economics:

- **Batch size** raised from 1 to 50, with partial batch failure reporting so
  one bad message does not poison the batch.
- **Batching window** of 20 seconds, letting queues fill batches during quiet
  hours instead of invoking per trickle.
- **Connection reuse** by moving clients outside the handler, which the
  per-message design had made pointless.

Invocations dropped by ~95% and the function's cost stopped being visible on
the bill at all.

## Some Lambdas should be containers

One function ran every five minutes, took four minutes, and needed 3 GB. That
is not an event handler; that is a batch job wearing a costume. Moved to a
scheduled Fargate task, it cost a third as much and lost its timeout anxiety.
The reverse also held: a 24/7 ECS service handling twelve requests a day
became a Lambda and effectively free.

The pattern behind all of it: serverless pricing is a magnifying glass on
architectural honesty. Steady heavy work wants reserved capacity; spiky light
work wants Lambda: the bill just tells you which one you actually have.
