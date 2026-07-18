---
title: Building a bilingual blog with Next.js
description: How this blog ships every post in English and Spanish from plain markdown, with a typed frontmatter contract and zero runtime services.
date: 2026-07-18
tags:
  - nextjs
  - typescript
  - i18n
featured: true
---

Welcome to the blog. This first post doubles as a smoke test for the
publishing pipeline: markdown in, statically generated HTML out, in two
languages, with no runtime services.

## How posts work here

Every post lives in its own folder with one markdown file per language:

```text
content/articles/building-a-bilingual-blog-with-nextjs/
├── en.md
└── es.md
```

Folder names and slugs are always English kebab-case, even for content that
reads mostly in Spanish, so URLs stay stable and predictable. Frontmatter is
validated at build time: a missing translation, a malformed date, or a
non-kebab-case tag fails the build instead of shipping a broken page.

```ts
const post = getArticleBySlug('building-a-bilingual-blog-with-nextjs', 'en')
```

## One source of truth per fact

Locale-invariant fields (`date`, `tags`, `featured`, `draft`) are read from
`en.md` only, so the two files can never disagree about when a post was
published or how it is categorized. Titles and descriptions are per-locale,
because a good title is written, not translated word by word.

## Why not route-based i18n?

The classic approach is `/es/blog/...` mirrors of every page. This site
deliberately keeps one URL per post and switches language client-side: both
locale payloads are embedded at build time and the toggle swaps them without
navigation. Readers keep their scroll position, the URL they share works for
everyone, and the static output stays a single page per post.

## What the pipeline refuses to do

No database, no CMS, no API calls at request time. The entire blog is files
in a git repository, reviewed in pull requests like any other code, and
rendered to static HTML at build time. If this post is visible, the pipeline
works.
