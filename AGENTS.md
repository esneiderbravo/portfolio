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
content lives in `src/content/portfolio.ts` and blog posts are bilingual
markdown files under `content/posts/`.

## Repository map

```
portfolio/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Single-page portfolio — all sections + carousel
│   ├── layout.tsx            # Root layout — fonts & metadata
│   ├── globals.css           # Design system — tokens, layout, responsive
│   ├── blog/[slug]/          # Blog post pages (per-locale markdown rendering)
│   ├── cv/                   # CV page (page.tsx + CvPageClient.tsx)
│   └── opengraph-image.tsx, robots.ts, sitemap.ts   # SEO routes
├── content/posts/<slug>/     # Blog posts — en.md + es.md per post (gray-matter frontmatter)
├── src/
│   ├── components/           # LocaleSwitch + blog/ (BlogHome, PostPageClient, SiteHeader, useLocale)
│   ├── content/portfolio.ts  # ← ALL portfolio content (single source)
│   ├── i18n/translations.ts  # EN/ES UI strings
│   ├── lib/                  # posts.ts + blog.ts (markdown pipeline), yearsExperience.ts
│   └── types/portfolio.ts    # Types — must stay in sync with content
├── tests/                    # Vitest unit tests
├── scripts/                  # validate.mjs (quality gate), setup-symlinks.sh
├── openspec/                 # OpenSpec spec-driven workflow (specs + changes archive)
├── ai-specs/                 # Canonical AI skills/commands/agents (symlinked into tool dirs)
├── docs/                     # Foundation docs — required reading below
└── public/                   # Static assets (brand/, logos/, favicons, profile.png)
```

## What exists today

| Area | Status |
|------|--------|
| Portfolio page | Live — single page (`app/page.tsx`), fully content-driven from `src/content/portfolio.ts` |
| Blog | 8 bilingual posts (`content/posts/<slug>/{en,es}.md`), rendered via `src/lib/posts.ts` + `marked` |
| CV page | `app/cv/` with client component |
| i18n | EN/ES client-side toggle (no router locale), strings in `src/i18n/translations.ts` |
| SEO | Sitemap, robots, OG image route, raster favicons, Google verification |
| Tests | 3 Vitest suites (`tests/`) |
| CI | GitHub Actions `ci.yml` — runs `npm run validate` on PRs and pushes to `main` |
| Deployment | Vercel — automatic deploy on push to `main` (see `README.md`) |

## Required reading (before non-trivial changes)

| Doc | When |
|-----|------|
| `CLAUDE.md` | Before writing any code |
| `docs/codegraph.md` | When/how to use Codegraph MCP |
| `docs/architecture.md` | Before changing module boundaries or adding a feature |
| `docs/conventions.md` | Naming, git, and language conventions |
| `docs/design-tokens.md` | Before touching styles or brand assets |
| `openspec/config.yaml` | Project context for the OpenSpec spec-driven workflow |

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
