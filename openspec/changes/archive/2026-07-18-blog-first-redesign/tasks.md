# Tasks: blog-first-redesign

## 1. Foundations (no visible change)

- [x] 1.1 Add `gray-matter` and `marked` to `package.json` dependencies; install and verify `npm run validate` still passes
- [x] 1.2 Create `src/types/blog.ts` with the frontmatter contract and loaded-post types (`PostFrontmatter`, `PostSummary`, `Post`) per design D2; verify with `npm run typecheck`
- [x] 1.3 Implement `src/lib/posts.ts`: slug discovery, frontmatter validation (throw on missing locale file / invalid field), EN-as-source for locale-invariant fields, draft filtering, date-desc + slug-asc sorting, reading-time calculation, `getAllPosts(locale)` / `getPostBySlug(slug, locale)`; verify with `npm run typecheck`
- [x] 1.4 Implement `src/lib/blog.ts` markdown→HTML rendering with `marked`; verify a fenced code block renders as `<pre><code>` via a quick unit test
- [x] 1.5 Add `tests/posts.test.ts` with fixture post folders (valid post, draft post, missing-locale post, invalid frontmatter) covering discovery, validation errors, sorting, draft exclusion, locale loading, and reading time; `npm run test` passes

## 2. Shared locale + header

- [x] 2.1 Extract locale state into `src/components/blog/useLocale.ts` (localStorage + `useSyncExternalStore`, hydration-safe) and refactor `app/page.tsx` to use it with no behavior change; verify toggle still works in `npm run dev`
- [x] 2.2 Create `src/components/blog/SiteHeader.tsx` (logo, Blog link, CV link, `LocaleSwitch`) with styles added to `app/globals.css` using existing tokens; verify it renders on the current page

## 3. CV route

- [x] 3.1 Create `app/cv/page.tsx` (metadata: CV title, description, canonical `/cv`) and `app/cv/CvPageClient.tsx` by moving the current portfolio page component, preserving section ids, scroll-spy, and all sections; verify `/cv` renders identically to the old `/` in `npm run dev`
- [x] 3.2 Wire `SiteHeader` + `useLocale` into the CV page and confirm EN/ES toggle works and `/cv#projects` anchors scroll correctly

## 4. Blog post pages

- [x] 4.1 Seed two placeholder posts under `content/posts/` (one `featured: true`, one draft) with valid `en.md`/`es.md` for local verification
- [x] 4.2 Create `app/blog/[slug]/page.tsx` with `generateStaticParams` (non-draft only), `generateMetadata` (EN frontmatter: title template, description, canonical, OG `article`, Twitter card), `BlogPosting` JSON-LD, and 404 for unknown slugs
- [x] 4.3 Create `src/components/blog/PostPageClient.tsx` rendering the `{en, es}` payload for the active locale (title, date, tags, reading time, body HTML, `backToBlog` link) with article/typography styles in `globals.css`; verify toggle swaps language without navigation
- [x] 4.4 Verify draft post produces no route and unknown slug 404s (`npm run build` output + manual check)

## 5. Blog-first homepage

- [x] 5.1 Create `src/components/blog/BlogHome.tsx`: hero from `blog.*` translations, featured treatment, dense latest-posts list (localized title/description, date, tags, reading time), author card, `viewCv` CTA
- [x] 5.2 Add client-side tag-chip filtering and text search over loaded metadata with localized `emptyState`; verify filter, search, and empty state in `npm run dev`
- [x] 5.3 Replace `app/page.tsx` with the blog homepage (server component loading both-locale post summaries, `Blog` JSON-LD, root metadata retained) rendering `BlogHome`; verify `/` is blog-first and links to `/cv` and posts
- [x] 5.4 Verify locale persists across `/` → post → `/cv` navigation and across reload

## 6. SEO + cleanup

- [x] 6.1 Update `app/sitemap.ts` to list `/` (priority 1), `/cv`, and every non-draft post with `lastModified` from `updated ?? date`; verify `/sitemap.xml` output in `npm run build`/`dev`
- [x] 6.2 Review `app/layout.tsx` metadata/JSON-LD: keep Person/WebSite, ensure title/description reflect the blog-first site, canonical stays route-correct; verify head output on all three route types
- [x] 6.3 Update `tests/content.test.ts` if imports/paths moved and add any missing i18n blog-string completeness assertion; `npm run test` passes

## 7. Validation & docs

- [x] 7.1 Run `npm run validate` (lint → typecheck → test → build) and fix any failures
- [x] 7.2 Update `docs/architecture.md` "Decisions & open questions" and `AGENTS.md`/`README` references if they describe `/` as the portfolio page; confirm docs match the shipped state
