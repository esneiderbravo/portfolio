# Codegraph — code intelligence for agents

**Codegraph** is a pre-indexed knowledge graph of every symbol, edge, and file
in this workspace. Agents must use it **before** manual grep/read loops when
exploring or editing code.

## Why use it

| Without Codegraph | With Codegraph |
|-------------------|----------------|
| Many `Grep` + `Read` round-trips | One `codegraph_explore` call |
| Miss dynamic dispatch (callbacks, framework indirection) | Call paths follow them |
| Edit without blast radius | Returns what depends on changed symbols |
| Stale mental model of large features | Verbatim, line-numbered source grouped by file |

## MCP setup

Configured in [`.mcp.json`](../.mcp.json) at the repo root:

```json
{ "mcpServers": { "codegraph": { "type": "stdio", "command": "codegraph", "args": ["serve", "--mcp"] } } }
```

**Prerequisites:** `npm i -g codegraph`, then `codegraph init` once from repo
root (creates `.codegraph/` — gitignored). If the project is not indexed,
fall back to `Grep`/`Read` and suggest the user run `codegraph init`.

## When to call (mandatory)

| Situation | Action |
|-----------|--------|
| "How does X work?" | `codegraph_explore` with question or symbol names |
| Before editing a symbol/file | Query that symbol — get call path + blast radius |
| Bug in a flow | Query start and end symbols |
| Surveying an area | One NL query, not directory listing + many reads |

## When NOT to rely on it alone

| Situation | Fallback |
|-----------|----------|
| Config, docs, `.yaml`, `.md` | `Read` directly |
| Staleness banner lists your files | `Read` the listed files |
| Project not indexed | `Grep` + `Read`; suggest `codegraph init` |

## Anti-patterns

- Do not grep-first then read 10 files when one `codegraph_explore` suffices
- Do not re-verify Codegraph source with grep (trust unless stale banner)
- Do not commit `.codegraph/`

## portfolio query cheat sheet

| Area | Example query |
|------|----------------|
| Portfolio sections & carousel | "hero experience carousel sections in app/page.tsx" |
| Article pipeline | "how markdown articles are loaded and rendered articles.ts article.ts" |
| Article UI | "ArticleHome ArticlePageClient SiteHeader components" |
| i18n | "locale toggle translations useLocale" |
| CV page | "cv page CvPageClient" |
| SEO routes | "sitemap robots opengraph metadata generation" |
| Content & types | "portfolio content profile experiences types" |
