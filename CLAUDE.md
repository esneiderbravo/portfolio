# CLAUDE.md — portfolio Coding Standards

Agent rules and coding standards for **portfolio (esneiderbravo.dev)**.
Project context (what exists, layout, status): [`AGENTS.md`](AGENTS.md)

---

## Stack & layout

Single Next.js 16 (App Router) app — React 19, TypeScript 5 strict, pure CSS.

| Area | Path | Rule |
|------|------|------|
| Pages & routes | `app/` | App Router; portfolio is a single page (`app/page.tsx`) |
| Portfolio content | `src/content/portfolio.ts` | ALL portfolio copy/data lives here — never hardcode content in components |
| UI strings | `src/i18n/translations.ts` | Every user-visible string exists in **both** EN and ES |
| Blog posts | `content/posts/<slug>/{en.md,es.md}` | Folder/slug always English kebab-case, even for bilingual content |
| Markdown pipeline | `src/lib/posts.ts`, `src/lib/blog.ts` | `gray-matter` frontmatter + `marked` rendering |
| Types | `src/types/portfolio.ts` | Must stay in sync with `src/content/portfolio.ts` |
| Styling | `app/globals.css` | Pure CSS with custom properties — no CSS framework, no UI library. See `docs/design-tokens.md` |
| Tests | `tests/` | Vitest unit tests |

## Quality gates

Pre-commit (husky) runs `lint-staged` (prettier + eslint on staged files).
CI runs `npm run validate` on every PR and push to `main`. Before finishing
any change:

```bash
npm run validate   # lint → typecheck → test → build, all must pass
```

Spec-driven changes follow the **OpenSpec** workflow in `openspec/`
(specs in `openspec/specs/`, changes archived in `openspec/changes/`).

---

## General rules

1. **Never commit** code that fails lint, format, type-check, or pre-commit hooks.
2. **Match neighboring patterns** — naming, file structure, conventions.
3. **No new libraries** without flagging it first.
4. **Docstrings and type hints are not optional** — write them as you code.
5. **English** for all code, comments, and docs. User-visible copy ships in **both English and Spanish** (`translations.ts` / per-locale markdown).
6. **No secrets** in code, docs, or tracked config.
7. **MANDATORY: `codegraph_explore` before grep, Read, or manual file search.** See [`docs/codegraph.md`](docs/codegraph.md).
8. **Minimize scope** — smallest correct diff; no drive-by refactors.

---

## Codegraph workflow (mandatory)

```
1. codegraph_explore(query)     ← FIRST for any code question or before edits
2. Treat returned source as already Read
3. Edit using line numbers from the response
4. If staleness banner lists edited files → Read those only
5. Lint / test as usual
```

| Area | Example query |
|------|---------------|
| Portfolio sections | "hero experience carousel sections in app/page.tsx" |
| Blog pipeline | "how markdown posts are loaded and rendered posts.ts blog.ts" |
| i18n | "locale toggle translations useLocale" |
| SEO routes | "sitemap robots opengraph metadata generation" |
| Content & types | "portfolio content profile experiences types" |

MCP config: [`.mcp.json`](.mcp.json) · Index: `.codegraph/` (gitignored)

---

## Commands

```bash
npm run dev           # local dev server
npm run lint          # eslint .
npm run format:check  # prettier --check .
npm run typecheck     # tsc --noEmit
npm run test          # vitest run
npm run validate      # lint → typecheck → test → build (CI gate)
```

---

## Agent-specific notes

- Skills, commands, and agents live in `ai-specs/` — the single source of truth. Every top-level `ai-specs/` folder is symlinked into `.agents/`, `.claude/`, `.codex/`, and `.cursor/`. Run `bash scripts/setup-symlinks.sh` after cloning and whenever a new top-level folder is added to `ai-specs/`.
- Add new skills/commands **only** inside `ai-specs/` — never directly in a tool dir (they are symlinks; content added "in `.claude/skills`" lands in `ai-specs/` anyway, but tooling and reviews assume `ai-specs/` paths).
- **Do not commit** unless the user explicitly asks.
