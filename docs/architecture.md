# Architecture — portfolio

## Overview

Single Next.js 16 (App Router) application — a static, content-driven
portfolio site with a markdown blog. No database and no backend API: all data
is TypeScript constants or markdown files resolved at build/render time.
React 19, TypeScript 5 strict mode, pure CSS (no framework). Deployed on
Vercel.

## Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| Portfolio page | `app/page.tsx` | Single page with all sections (hero, about, skills, experience carousel, projects, contact) |
| Blog routes | `app/blog/[slug]/` | Per-post pages rendering bilingual markdown |
| CV | `app/cv/` | CV page (`page.tsx` + `CvPageClient.tsx`) |
| SEO routes | `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` | Crawling, sitemap, OG image generation |
| Design system | `app/globals.css` | CSS custom properties, layout, responsive rules (see `design-tokens.md`) |
| Content layer | `src/content/portfolio.ts` | All portfolio copy/data — the single source components read from |
| Blog content | `content/posts/<slug>/{en.md,es.md}` | One folder per post, one markdown file per locale |
| Markdown pipeline | `src/lib/posts.ts`, `src/lib/blog.ts` | Read post folders, parse `gray-matter` frontmatter, render with `marked` |
| i18n | `src/i18n/translations.ts`, `src/components/blog/useLocale.ts` | EN/ES strings + client-side locale state (no router locale) |
| Types | `src/types/portfolio.ts` | Content shape — kept in sync with `src/content/portfolio.ts` |
| Shared components | `src/components/` | `LocaleSwitch`, blog components (`BlogHome`, `PostPageClient`, `SiteHeader`) |

## Data flow

1. **Portfolio**: `app/page.tsx` imports structured data from
   `src/content/portfolio.ts` and strings from `src/i18n/translations.ts`;
   locale is client-side state toggled by `LocaleSwitch`.
2. **Blog**: `src/lib/posts.ts` reads `content/posts/<slug>/` from the
   filesystem, parses frontmatter with `gray-matter`, and `src/lib/blog.ts` /
   `marked` produce the rendered HTML consumed by `app/blog/[slug]/page.tsx`
   and the blog components.

## External integrations

- **Vercel** — hosting and automatic deploys on push to `main`.
- **GitHub Actions** (`.github/workflows/ci.yml`) — runs `npm run validate`
  (lint → typecheck → test → build) on PRs and pushes to `main`.
- **Google Fonts** (Geist / Geist Mono) and Google site verification
  (`public/google-site-verification.txt`).

No runtime third-party APIs, queues, or databases.

## Decisions & open questions

<!-- TODO: record architectural decisions the team has made that code can't show -->
