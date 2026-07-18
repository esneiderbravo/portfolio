# AGENTS.md — portfolio (esneiderbravo.dev)

Instructions for AI coding agents (Cursor, Claude Code, Copilot, Codex, etc.)
working in this repository.

**Coding standards and agent rules → [`CLAUDE.md`](CLAUDE.md)** (single source of truth).
Read CLAUDE.md before writing any code.

---

## Project summary

Personal portfolio site for Esneider Bravo (Senior Backend Engineer /
Systems Architect), live at https://esneiderbravo.dev. Its purpose is a
professional showcase targeting senior/lead engineering roles in fintech and
AI-first companies. Built with Next.js 16 (App Router), React 19, and
TypeScript 5 in strict mode — no database, no backend API: all portfolio
content lives in `src/content/portfolio.ts` and articles are bilingual
markdown files under `content/articles/`.

## Repository map

```
portfolio/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Article-first homepage — hero, article listing, filters
│   ├── layout.tsx            # Root layout — fonts & metadata
│   ├── globals.css           # Design system — tokens, layout, responsive
│   ├── article/[slug]/       # Article pages (per-locale markdown rendering)
│   ├── cv/                   # CV page (page.tsx + CvPageClient.tsx)
│   └── opengraph-image.tsx, robots.ts, sitemap.ts   # SEO routes
├── content/articles/<slug>/     # Articles — en.md + es.md per article (gray-matter frontmatter)
├── src/
│   ├── components/           # LocaleSwitch + article/ (ArticleHome, ArticlePageClient, SiteHeader, useLocale)
│   ├── content/portfolio.ts  # ← ALL portfolio content (single source)
│   ├── i18n/translations.ts  # EN/ES UI strings
│   ├── lib/                  # articles.ts + article.ts (markdown pipeline), yearsExperience.ts
│   └── types/                # portfolio.ts (sync with content) + article.ts (frontmatter contract)
├── tests/                    # Vitest unit tests
├── scripts/                  # validate.mjs (quality gate), setup-symlinks.sh
├── openspec/                 # OpenSpec spec-driven workflow (specs + changes archive)
├── ai-specs/                 # Canonical AI skills/commands/agents (symlinked into tool dirs)
├── docs/                     # Foundation docs — required reading below
└── public/                   # Static assets (brand/, logos/, favicons, profile.png)
```

## What exists today

| Area          | Status                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage      | Live — `/` is article-first (`app/page.tsx` + `ArticleHome`), with tag filter and search                                                         |
| Articles      | Bilingual markdown (`content/articles/<slug>/{en,es}.md`), rendered via `src/lib/articles.ts` + `marked`, statically generated at `/article/[slug]` |
| CV page       | Live — full portfolio experience at `/cv` (`page.tsx` + `CvPageClient.tsx`), content-driven from `src/content/portfolio.ts`                |
| i18n          | EN/ES client-side toggle (no router locale), strings in `src/i18n/translations.ts`                                                         |
| SEO           | Sitemap, robots, OG image route, raster favicons, Google verification                                                                      |
| Tests         | 3 Vitest suites (`tests/`)                                                                                                                 |
| CI            | GitHub Actions `ci.yml` — runs `npm run validate` on PRs and pushes to `main`                                                              |
| Deployment    | Vercel — automatic deploy on push to `main` (see `README.md`)                                                                              |

## Required reading (before non-trivial changes)

| Doc                     | When                                                  |
| ----------------------- | ----------------------------------------------------- |
| `CLAUDE.md`             | Before writing any code                               |
| `docs/codegraph.md`     | When/how to use Codegraph MCP                         |
| `docs/architecture.md`  | Before changing module boundaries or adding a feature |
| `docs/conventions.md`   | Naming, git, and language conventions                 |
| `docs/design-tokens.md` | Before touching styles or brand assets                |
| `openspec/config.yaml`  | Project context for the OpenSpec spec-driven workflow |

## Codegraph (code intelligence) — MANDATORY

**Always call `codegraph_explore` before any grep, Read, or manual file search.**
Full guide: `docs/codegraph.md`.

## Git

- Do **not** commit unless the user explicitly asks
- Never commit: `.env*`, credentials, build artifacts, `.codegraph/`, `.mcp.json`
- Commit messages follow conventional-commit-style prefixes observed in history
  (`feat:`, `fix:`, `seo:`, `chore:`, `docs:`, `test:`)

## Commands

```bash
npm run dev           # next dev
npm run build         # next build
npm run lint          # eslint .
npm run lint:fix      # eslint . --fix
npm run format        # prettier --write .
npm run format:check  # prettier --check .
npm run typecheck     # tsc --noEmit
npm run test          # vitest run
npm run validate      # lint → typecheck → test → build (the CI gate)
```
