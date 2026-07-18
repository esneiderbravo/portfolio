/**
 * Markdown rendering for articles, kept separate from discovery/loading
 * (`src/lib/articles.ts`) so rendering concerns never leak into the pipeline.
 *
 * Article bodies are author-controlled files in this repo (no user input), so
 * the rendered HTML is injected without an additional sanitizer pass.
 */

import { marked } from 'marked'

/** One entry in an article's table of contents (an `<h2>` heading). */
export type TocEntry = {
  /** Slug used as the heading's `id` and the in-page anchor target. */
  id: string
  /** Plain-text heading label. */
  text: string
}

/** Rendered article: HTML body (with heading ids) plus its table of contents. */
export type RenderedArticle = {
  html: string
  toc: TocEntry[]
}

/** Accent-stripped kebab-case slug for a heading, used as its anchor id. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Renders a markdown article body to an HTML string. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false })
}

/**
 * Renders a markdown article body and, in one pass, gives every `<h2>` a slug
 * `id` and collects those headings into a table of contents. Duplicate slugs
 * get a numeric suffix so anchors stay unique.
 */
export function renderArticle(markdown: string): RenderedArticle {
  const raw = renderMarkdown(markdown)
  const toc: TocEntry[] = []
  const seen = new Map<string, number>()

  const html = raw.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
    (_match, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '').trim()
      const base = slugify(text) || 'section'
      const count = seen.get(base) ?? 0
      seen.set(base, count + 1)
      const id = count === 0 ? base : `${base}-${count}`
      toc.push({ id, text })
      return `<h2 id="${id}"${attrs}>${inner}</h2>`
    },
  )

  return { html, toc }
}
