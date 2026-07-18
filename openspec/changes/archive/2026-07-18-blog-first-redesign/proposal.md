# Proposal: blog-first-redesign

## Why

The site is a single-page CV, but the owner's goal is a bilingual technical publication — tutorials, backend/AI engineering, architecture, fintech, events, and field notes. Project docs (`CLAUDE.md`, `docs/architecture.md`) and `src/i18n/translations.ts` already describe/contain the target blog architecture, but none of it is implemented: no `app/blog`, no `content/posts`, no markdown pipeline, no CV route. This change closes that gap.

## What Changes

- **BREAKING**: `/` becomes a blog-first editorial homepage (hero, latest/featured posts, topic discovery, author/CV access). The current portfolio landing page moves off `/`.
- New `/cv` route hosting the full existing portfolio experience (profile, experience, skills, projects, education, certifications, contact) — content in `src/content/portfolio.ts` is preserved, not rewritten.
- New blog content model: `content/posts/<english-kebab-case-slug>/{en.md,es.md}` with a typed frontmatter contract (title, description, date, tags/topics, plus locale-fallback rules).
- New markdown pipeline: `src/lib/posts.ts` (discovery, frontmatter parsing, sorting, locale-aware loading) and `src/lib/blog.ts` (rendering) using `gray-matter` + `marked` — the two new libraries already designated for this in project docs (small, build-time only, no runtime services).
- New `/blog/[slug]` post pages with per-post metadata, OG tags, and `BlogPosting` JSON-LD; statically generated.
- Blog UI components under `src/components/blog/`; shared EN/ES toggle behavior extracted so locale persists across `/`, `/blog/[slug]`, and `/cv`.
- SEO updates: `app/sitemap.ts` lists `/`, `/cv`, and all posts; JSON-LD extended with `Blog` schema; canonical/OG per route.
- Tests: Vitest coverage for the posts pipeline (discovery, frontmatter validation, sorting, locale fallback) while keeping existing portfolio-content tests green.

## Capabilities

### New Capabilities

- `blog-content-model`: bilingual markdown post storage and frontmatter contract.
- `blog-pipeline`: post discovery, parsing, sorting, locale-aware loading, and markdown rendering.
- `blog-home`: blog-first editorial homepage at `/`.
- `blog-post-page`: individual post rendering at `/blog/[slug]` with post-level SEO.
- `cv-page`: secondary CV/portfolio experience at `/cv`.

### Modified Capabilities

- `i18n`: locale selection SHALL persist across routes (blog ↔ post ↔ CV); blog UI strings join the completeness requirements.
- `seo-discoverability`: sitemap SHALL include `/cv` and every post URL; JSON-LD extended beyond Person/WebSite; canonical per route.

## Impact

- Code: `app/page.tsx` (replaced), new `app/blog/[slug]/`, `app/cv/`, `app/sitemap.ts`, `src/lib/`, `src/components/blog/`, `src/types/`, `tests/`.
- Dependencies: add `gray-matter`, `marked` (flagged above).
- Site stays fully static — no database, no API.

## Non-goals

- No RSS feed, comments, analytics, newsletter, search index service, or CMS.
- No route-based i18n (`/es/...`) — keep client-side toggle.
- No redesign of the design-token system; reuse `globals.css` tokens and visual identity.
- No rewriting of portfolio copy; content moves, it doesn't change.
