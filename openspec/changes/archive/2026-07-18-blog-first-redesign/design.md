# Design: blog-first-redesign

## Context

The repo is a single-page portfolio (`app/page.tsx`) with static content
(`src/content/portfolio.ts`), client-side EN/ES toggle
(`src/i18n/translations.ts`, `LocaleSwitch`), pure-CSS design tokens
(`app/globals.css`), and full SEO plumbing (metadata, JSON-LD, sitemap,
robots, OG image). Project docs already describe the target blog
architecture (routes, markdown pipeline, component names) and the blog
translation strings already exist in both locales — but nothing is
implemented. Verified current state: `npm run typecheck` passes, `app/sitemap.ts`
is static-only, and `gray-matter`/`marked` are not yet installed.

Constraints: fully static (no DB/API), TypeScript strict, pure CSS tokens,
bilingual EN/ES via client-side toggle (no router locale), OpenSpec workflow,
no new libraries without justification.

## Goals / Non-Goals

**Goals:**

- `/` becomes a blog-first editorial homepage; `/blog/[slug]` renders posts;
  `/cv` hosts the full existing portfolio experience.
- Typed, testable markdown pipeline for bilingual posts.
- Locale toggle persists across all routes.
- Post-level SEO (metadata, OG, `BlogPosting` JSON-LD) and a complete sitemap.
- Reuse existing content, translations, tokens, and visual identity.

**Non-Goals:**

- RSS, comments, analytics, CMS, server search, route-based i18n (`/es/...`),
  design-token overhaul, portfolio copy rewrites.

## Decisions

### D1 — Routes: `/`, `/blog/[slug]`, `/cv`

`/cv` (not `/portfolio`) — shorter, matches the existing `nav.resume` label
and the path already documented in `docs/architecture.md`. The current
`app/page.tsx` portfolio UI moves to `app/cv/` (server `page.tsx` +
`CvPageClient.tsx`), preserving its section structure, scroll-spy, and
styles. `/` is rebuilt as the blog home. `app/blog/[slug]/page.tsx` uses
`generateStaticParams` so every post is statically generated.

### D2 — Content model: one folder per post, one file per locale

`content/posts/<english-kebab-case-slug>/{en.md,es.md}` (per
`docs/conventions.md`; locale lives in the file name, never the folder).
Both locale files are REQUIRED — the pipeline fails the build on a missing
locale file rather than silently falling back, enforcing the documented
"every post ships en.md and es.md" convention at the earliest point.

Frontmatter contract (typed in `src/types/blog.ts`):

```yaml
title: string        # required, per-locale
description: string  # required, per-locale (meta description + card excerpt)
date: YYYY-MM-DD     # required, must match in both locales
tags: string[]       # required, English kebab-case, shared across locales
featured: boolean    # optional, default false
draft: boolean       # optional, default false — excluded from listing/sitemap/build params
updated: YYYY-MM-DD  # optional — feeds sitemap lastModified
```

Reading time is computed from word count (no frontmatter field to drift).
Slug-invariant fields (`date`, `tags`, `featured`, `draft`) are read from
`en.md` as the source of truth; a test asserts `es.md` does not contradict them.

### D3 — Pipeline: `gray-matter` + `marked`, split discovery vs rendering

- `src/lib/posts.ts`: `getAllPosts(locale)`, `getPostBySlug(slug, locale)`,
  slug discovery from the filesystem, frontmatter validation, date-desc
  sorting, draft filtering, reading-time calculation. Pure Node/fs — unit
  testable with fixture folders.
- `src/lib/blog.ts`: markdown → HTML via `marked` (headings, code blocks,
  links with safe defaults). Kept separate so rendering concerns never leak
  into discovery/tests.

Why these two libraries: they are the pipeline already designated in
`CLAUDE.md`/`docs/architecture.md`; both are small, dependency-light,
build-time-only. Alternatives rejected: MDX (pulls a compiler + new authoring
pattern for plain-markdown needs), remark/rehype (plugin ecosystem overhead
unneeded here). Content is author-controlled, so no sanitizer is required.

### D4 — Bilingual rendering: build both locales, toggle client-side

Locale is client state (existing pattern), so server components can't know
it. Post pages and listings therefore load BOTH locales at build time and
pass `{ en, es }` payloads to client components (`BlogHome`,
`PostPageClient`) that pick the active one. Cost: ~2× HTML payload per post
page — acceptable for a static personal blog; benefit: instant toggle with
no navigation, consistent with the portfolio's behavior.

Locale state is extracted to `src/components/blog/useLocale.ts` — a
`localStorage`-backed hook using `useSyncExternalStore` (the hydration-safe
pattern already landed in commit `ce57d0f`) so the choice persists across
routes and reloads. `LocaleSwitch` is reused as-is. A shared
`SiteHeader` (logo, Blog, CV, locale toggle) renders on all routes.

### D5 — SEO

- `generateMetadata` on `/blog/[slug]` from EN frontmatter (canonical SEO
  language, matching the site's `lang="en"`): title via existing template,
  description, canonical, OG `type: article`, Twitter card.
- JSON-LD: `BlogPosting` per post (headline, datePublished, dateModified,
  author linked to the existing Person schema, inLanguage); `Blog` schema on
  `/`; existing `Person`/`WebSite` schemas stay in the root layout.
- `app/sitemap.ts` lists `/` (priority 1), `/cv`, and every non-draft post
  (lastModified from `updated ?? date`).
- `/cv` gets its own metadata + `ProfilePage` canonical; ES content remains
  invisible to crawlers — accepted trade-off of client-side i18n (explicit
  non-goal to change).

### D6 — Editorial design within existing tokens

Publication feel comes from typography and hierarchy, not new chrome:
existing tokens (`--content-max`, text/surface/accent vars, Geist/Space
Grotesk fonts) plus new blog-scoped CSS in `globals.css` following its
media-query structure. Homepage: kicker/hero (strings already in
`translations.ts` `blog.*`), featured post, dense latest-posts list with
date/tags/reading time, tag-chip topic filter + client-side text search over
the already-loaded metadata, author card, prominent CV link. Post page:
measure-limited article column, styled code blocks (mono font token),
`backToBlog` link.

## Risks / Trade-offs

- [Both-locale payload doubles post HTML] → static pages, text-only; measured
  as negligible for a personal blog. Revisit only if posts grow very large.
- [ES content not crawlable] → accepted; route-based i18n is an explicit
  non-goal and can be a future change.
- [`marked` output injected via `dangerouslySetInnerHTML`] → content is
  author-authored files in the repo; no user input. Documented in code.
- [Strict "both locales required" blocks quick note publishing] → intentional
  quality gate; failure is a clear build error naming the missing file.
- [Homepage replacement breaks existing `#section` deep links] → `/cv`
  preserves section ids; old external links to `/#projects` degrade to the
  blog home (no redirect infra in static hosting; acceptable).

## Migration Plan

Phased, each independently verifiable (see tasks.md): types+pipeline+tests
first (no visible change), then routes (`/cv`, `/blog/[slug]`), then homepage
swap, then SEO, then validate + docs. Rollback at any phase is `git revert`
of that phase's commits; content files are additive.

## Open Questions

None blocking — sample/seed posts will be minimal placeholder content the
owner replaces with real writing.
