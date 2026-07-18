# Architecture — portfolio

## Overview

Single Next.js 16 (App Router) application — a static, content-driven
portfolio site with a markdown blog. No database and no backend API: all data
is TypeScript constants or markdown files resolved at build/render time.
React 19, TypeScript 5 strict mode, pure CSS (no framework). Deployed on
Vercel.

## Modules

| Module            | Path                                                           | Responsibility                                                                                                                                        |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home page         | `app/page.tsx`                                                 | Article-first editorial page at `/` (hero, article listing, tag filter/search, author card) rendering `ArticleHome`                                            |
| Article routes    | `app/article/[slug]/`                                             | Per-article pages rendering bilingual markdown, statically generated                                                                                     |
| CV                | `app/cv/`                                                      | Full portfolio experience (`page.tsx` + `CvPageClient.tsx`) — hero, about, AI stack, skills, experience, education, certifications, projects, contact |
| SEO routes        | `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`   | Crawling, sitemap, OG image generation                                                                                                                |
| Design system     | `app/globals.css`                                              | CSS custom properties, layout, responsive rules (see `design-tokens.md`)                                                                              |
| Content layer     | `src/content/portfolio.ts`                                     | All portfolio copy/data — the single source components read from                                                                                      |
| Article content   | `content/articles/<slug>/{en.md,es.md}`                           | One folder per article, one markdown file per locale                                                                                                     |
| Markdown pipeline | `src/lib/articles.ts`, `src/lib/article.ts`                          | Read article folders, parse `gray-matter` frontmatter, render with `marked`                                                                              |
| i18n              | `src/i18n/translations.ts`, `src/components/article/useLocale.ts` | EN/ES strings + client-side locale state (no router locale)                                                                                           |
| Types             | `src/types/portfolio.ts`                                       | Content shape — kept in sync with `src/content/portfolio.ts`                                                                                          |
| Shared components | `src/components/`                                              | `LocaleSwitch`, article components (`ArticleHome`, `ArticlePageClient`, `SiteHeader`)                                                                          |

## Data flow

1. **Portfolio/CV**: `app/cv/CvPageClient.tsx` imports structured data from
   `src/content/portfolio.ts` and strings from `src/i18n/translations.ts`;
   locale is client-side state (`useLocale`) toggled by `LocaleSwitch`.
2. **Articles**: `src/lib/articles.ts` reads `content/articles/<slug>/` from the
   filesystem, parses frontmatter with `gray-matter`, and `src/lib/article.ts` /
   `marked` produce the rendered HTML consumed by `app/article/[slug]/page.tsx`
   and the article components. Server components load BOTH locale payloads at
   build time; client components pick the active locale so the EN/ES toggle
   needs no navigation.

## External integrations

- **Vercel** — hosting and automatic deploys on push to `main`.
- **GitHub Actions** (`.github/workflows/ci.yml`) — runs `npm run validate`
  (lint → typecheck → test → build) on PRs and pushes to `main`.
- **Google Fonts** (Geist / Geist Mono) and Google site verification
  (`public/google-site-verification.txt`).

No runtime third-party APIs, queues, or databases.

## Decisions & open questions

- **Blog-first homepage (2026-07)**: `/` is the blog editorial page; the full
  portfolio moved to `/cv` (section ids preserved, so `/cv#projects` works;
  old `/#projects` deep links degrade to the blog home — no redirect infra on
  static hosting). See `openspec/changes/blog-first-redesign/`.
- **Both locale files required per article**: a missing `en.md`/`es.md` or
  invalid frontmatter fails the build (`src/lib/articles.ts`). Locale-invariant
  fields (`date`, `tags`, `featured`, `draft`, `updated`) are read from
  `en.md` as the source of truth.
- **SEO language is EN**: article metadata/JSON-LD come from EN frontmatter; ES
  content is client-toggled and not separately crawlable (route-based i18n is
  an explicit non-goal for now).
