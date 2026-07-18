/**
 * Article content types — the frontmatter contract for `content/articles/<slug>/{en.md,es.md}`
 * and the shapes returned by the articles pipeline (`src/lib/articles.ts`).
 *
 * Locale-invariant fields (`date`, `tags`, `featured`, `draft`, `updated`) are
 * sourced from `en.md`; `title` and `description` are per-locale.
 */

/** Frontmatter declared at the top of every article markdown file. */
export type ArticleFrontmatter = {
  /** Article title, per-locale. */
  title: string
  /** Meta description and card excerpt, per-locale. */
  description: string
  /** Publication date in `YYYY-MM-DD` format; locale-invariant. */
  date: string
  /** English kebab-case topic tags; locale-invariant. */
  tags: string[]
  /** Visually highlighted on the home page. Defaults to false. */
  featured: boolean
  /** Excluded from listings, static params, and sitemap. Defaults to false. */
  draft: boolean
  /** Last significant update in `YYYY-MM-DD` format; feeds sitemap lastModified. */
  updated?: string
}

/** Listing-level article data for one locale (no body). */
export type ArticleSummary = {
  /** English kebab-case folder name under `content/articles/`. */
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  featured: boolean
  draft: boolean
  updated?: string
  /** Whole minutes (minimum 1) computed from the markdown body word count. */
  readingTimeMinutes: number
}

/** Full article for one locale: summary fields plus the raw markdown body. */
export type Article = ArticleSummary & {
  /** Markdown body (frontmatter stripped); render with `src/lib/article.ts`. */
  body: string
}
