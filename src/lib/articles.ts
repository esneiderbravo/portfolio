/**
 * Articles pipeline: discovery, frontmatter validation, and locale-aware loading
 * of markdown articles stored at `content/articles/<slug>/{en.md,es.md}`.
 *
 * Pure Node/fs at build/render time (no database, no network). Rendering
 * markdown to HTML lives separately in `src/lib/article.ts`.
 */

import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

import type { Locale } from '@/src/i18n/translations'
import type { Article, ArticleFrontmatter, ArticleSummary } from '@/src/types/article'

/** Default production content root. Tests pass fixture directories instead. */
const DEFAULT_ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const KEBAB_CASE_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const WORDS_PER_MINUTE = 200

/** Frontmatter fields that must match `en.md` regardless of locale. */
const LOCALE_INVARIANT_FIELDS = ['date', 'tags', 'featured', 'draft', 'updated'] as const

type ParsedArticleFile = {
  frontmatter: ArticleFrontmatter
  body: string
}

/** Throws a validation error pinpointing the offending file and field. */
function invalid(filePath: string, field: string, reason: string): never {
  throw new Error(`Invalid article frontmatter in ${filePath}: field "${field}" ${reason}`)
}

/** Validates raw gray-matter data against the frontmatter contract. */
function validateFrontmatter(data: Record<string, unknown>, filePath: string): ArticleFrontmatter {
  const { title, description, date, tags, featured, draft, updated } = data

  if (typeof title !== 'string' || title.trim() === '') {
    invalid(filePath, 'title', 'must be a non-empty string')
  }
  if (typeof description !== 'string' || description.trim() === '') {
    invalid(filePath, 'description', 'must be a non-empty string')
  }
  const dateString = date instanceof Date ? date.toISOString().slice(0, 10) : date
  if (typeof dateString !== 'string' || !DATE_PATTERN.test(dateString)) {
    invalid(filePath, 'date', 'must be a YYYY-MM-DD string')
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    invalid(filePath, 'tags', 'must be a non-empty array')
  }
  for (const tag of tags) {
    if (typeof tag !== 'string' || !KEBAB_CASE_PATTERN.test(tag)) {
      invalid(filePath, 'tags', `must contain English kebab-case strings (got "${String(tag)}")`)
    }
  }
  if (featured !== undefined && typeof featured !== 'boolean') {
    invalid(filePath, 'featured', 'must be a boolean when present')
  }
  if (draft !== undefined && typeof draft !== 'boolean') {
    invalid(filePath, 'draft', 'must be a boolean when present')
  }
  const updatedString = updated instanceof Date ? updated.toISOString().slice(0, 10) : updated
  if (
    updatedString !== undefined &&
    (typeof updatedString !== 'string' || !DATE_PATTERN.test(updatedString))
  ) {
    invalid(filePath, 'updated', 'must be a YYYY-MM-DD string when present')
  }

  return {
    title,
    description,
    date: dateString,
    tags: tags as string[],
    featured: featured ?? false,
    draft: draft ?? false,
    ...(updatedString !== undefined ? { updated: updatedString } : {}),
  }
}

/** Reads and validates one locale file of an article; throws if the file is missing. */
function parseArticleFile(articlesDir: string, slug: string, locale: Locale): ParsedArticleFile {
  const filePath = path.join(articlesDir, slug, `${locale}.md`)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Article "${slug}" is missing its required locale file: ${filePath}`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { frontmatter: validateFrontmatter(data, filePath), body: content }
}

/** Whole-minute reading time (minimum 1) from the markdown body word count. */
function readingTimeMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Discovers article slugs: every directory under the articles root, sorted ascending. */
export function getArticleSlugs(articlesDir: string = DEFAULT_ARTICLES_DIR): string[] {
  if (!fs.existsSync(articlesDir)) return []
  return fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

/**
 * Loads one article in the given locale. Both `en.md` and `es.md` must exist;
 * locale-invariant fields come from `en.md` as the source of truth.
 * Returns `null` when no folder exists for the slug (so routes can 404).
 */
export function getArticleBySlug(
  slug: string,
  locale: Locale,
  articlesDir: string = DEFAULT_ARTICLES_DIR,
): Article | null {
  if (!fs.existsSync(path.join(articlesDir, slug))) return null

  // Both locale files are required regardless of the requested locale, so a
  // missing translation fails the build at the earliest load.
  for (const requiredLocale of ['en', 'es'] as const) {
    const localeFile = path.join(articlesDir, slug, `${requiredLocale}.md`)
    if (!fs.existsSync(localeFile)) {
      throw new Error(`Article "${slug}" is missing its required locale file: ${localeFile}`)
    }
  }

  const en = parseArticleFile(articlesDir, slug, 'en')
  const localized = locale === 'en' ? en : parseArticleFile(articlesDir, slug, locale)

  const invariants = Object.fromEntries(
    LOCALE_INVARIANT_FIELDS.map((field) => [field, en.frontmatter[field]]),
  ) as Pick<ArticleFrontmatter, (typeof LOCALE_INVARIANT_FIELDS)[number]>

  return {
    slug,
    title: localized.frontmatter.title,
    description: localized.frontmatter.description,
    ...invariants,
    readingTimeMinutes: readingTimeMinutes(localized.body),
    body: localized.body,
  }
}

/**
 * All non-draft articles for a locale, sorted by date descending with ties
 * broken by slug ascending so ordering is deterministic.
 */
export function getAllArticles(
  locale: Locale,
  articlesDir: string = DEFAULT_ARTICLES_DIR,
): ArticleSummary[] {
  return getArticleSlugs(articlesDir)
    .map((slug) => getArticleBySlug(slug, locale, articlesDir))
    .filter((article): article is Article => article !== null && !article.draft)
    .map((article) => {
      const { body, ...summary } = article
      void body
      return summary
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}
