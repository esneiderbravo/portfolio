---
title: 'CI/CD without drama: GitHub Actions + Docker'
description: The minimal pipeline I use to deploy with confidence several times a day, and the few rules that keep it boring.
date: 2026-06-15
tags:
  - devops
  - aws
  - docker
---

Every deploy pipeline I have inherited was either so thin it proved nothing or
so elaborate nobody dared touch it. The sweet spot I keep coming back to fits
in one workflow file and four rules.

## The four rules

1. **The image you test is the image you ship.** Build once, tag with the
   commit SHA, run tests against that exact image, push that exact image.
   No rebuild between CI and production.
2. **Every check runs on every PR.** Lint, types, tests, build. If a check is
   too slow to run on PRs, make it faster instead of skipping it.
3. **Deploys are triggered by merges, not by humans.** `main` is always
   deployable; merging is the deploy button.
4. **Rollback is a redeploy of the previous tag.** No snowflake fix-forward
   procedures at 2 a.m.

## The workflow

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app:${{ github.sha }} .
      - run: docker run --rm app:${{ github.sha }} make check

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR
          docker push $ECR/app:${{ github.sha }}
          aws ecs update-service --force-new-deployment \
            --cluster prod --service app
```

That is genuinely most of it. The `make check` target runs the same lint,
type-check, and test commands developers run locally, so CI failures are
reproducible on any laptop with Docker.

## The parts people skip

**Health checks gate the rollout.** ECS only shifts traffic when the new task
passes its health endpoint, and the endpoint checks real dependencies (the
database answers, migrations are applied), not just "the process is up".

**Migrations run before the new code, in a one-off task.** Migrations must be
backwards compatible with the previous release, because for a few minutes both
run side by side. That constraint sounds annoying and instead is a gift: it
forces additive schema changes.

**Build caching keeps it fast.** Layer ordering (dependencies first, source
last) plus GitHub's registry cache keeps the average pipeline under six
minutes. Fast pipelines are the difference between deploying daily and
batching a week of risk into one Friday deploy.

Boring is the feature. When the pipeline is small enough to read in one
sitting, everyone on the team can fix it, and nobody builds a parallel manual
process around it.
