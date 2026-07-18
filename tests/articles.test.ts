import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { renderMarkdown } from '@/src/lib/article'
import { getAllArticles, getArticleBySlug, getArticleSlugs } from '@/src/lib/articles'

const FIXTURES = path.join(__dirname, 'fixtures')
const ARTICLES_DIR = path.join(FIXTURES, 'articles')
const MISSING_LOCALE_DIR = path.join(FIXTURES, 'articles-missing-locale')
const INVALID_DIR = path.join(FIXTURES, 'articles-invalid')

describe('article discovery', () => {
  it('discovers every article folder as a slug', () => {
    expect(getArticleSlugs(ARTICLES_DIR)).toEqual([
      'alpha-notes',
      'beta-notes',
      'draft-article',
      'shipping-fastapi',
    ])
  })

  it('returns null for an unknown slug so routes can 404', () => {
    expect(getArticleBySlug('does-not-exist', 'en', ARTICLES_DIR)).toBeNull()
  })
})

describe('frontmatter validation', () => {
  it('throws an error naming the missing locale file', () => {
    expect(() => getArticleBySlug('only-english', 'en', MISSING_LOCALE_DIR)).toThrowError(/es\.md/)
  })

  it('throws when a required field is missing, identifying file and field', () => {
    expect(() => getArticleBySlug('missing-title', 'en', INVALID_DIR)).toThrowError(
      /missing-title.*en\.md.*"title"/,
    )
  })

  it('throws on a malformed date, identifying file and field', () => {
    expect(() => getArticleBySlug('bad-date', 'en', INVALID_DIR)).toThrowError(/"date"/)
  })

  it('applies defaults for omitted optional fields', () => {
    const article = getArticleBySlug('beta-notes', 'en', ARTICLES_DIR)
    expect(article?.featured).toBe(false)
    expect(article?.draft).toBe(false)
    expect(article?.updated).toBeUndefined()
  })
})

describe('getAllArticles', () => {
  it('excludes draft articles from listings', () => {
    const slugs = getAllArticles('en', ARTICLES_DIR).map((article) => article.slug)
    expect(slugs).not.toContain('draft-article')
  })

  it('sorts by date descending with slug-ascending tie-break', () => {
    const slugs = getAllArticles('en', ARTICLES_DIR).map((article) => article.slug)
    expect(slugs).toEqual(['shipping-fastapi', 'alpha-notes', 'beta-notes'])
  })

  it('loads per-locale title and description', () => {
    const [newestEs] = getAllArticles('es', ARTICLES_DIR)
    expect(newestEs.title).toBe('Desplegando servicios FastAPI')
    expect(newestEs.description).toBe('Notas sobre desplegar servicios FastAPI a producción.')
  })
})

describe('locale-invariant fields', () => {
  it('takes date, tags, featured, draft, and updated from en.md', () => {
    const es = getArticleBySlug('shipping-fastapi', 'es', ARTICLES_DIR)
    // es.md declares featured: false and omits updated — EN is the source of truth.
    expect(es?.featured).toBe(true)
    expect(es?.updated).toBe('2026-03-10')
    expect(es?.date).toBe('2026-03-05')
    expect(es?.tags).toEqual(['python', 'fastapi'])
  })
})

describe('reading time', () => {
  it('computes whole minutes from the body word count', () => {
    const article = getArticleBySlug('alpha-notes', 'en', ARTICLES_DIR)
    // Fixture body has 450 words → round(450 / 200) = 2 minutes.
    expect(article?.readingTimeMinutes).toBe(2)
  })

  it('never reports less than one minute', () => {
    const article = getArticleBySlug('beta-notes', 'en', ARTICLES_DIR)
    expect(article?.readingTimeMinutes).toBe(1)
  })
})

describe('renderMarkdown', () => {
  it('renders a fenced code block as <pre><code>', () => {
    const html = renderMarkdown('# Title\n\n```python\napp = FastAPI()\n```\n')
    expect(html).toContain('<pre><code')
    expect(html).toContain('app = FastAPI()')
  })

  it('renders headings, lists, links, and inline code', () => {
    const html = renderMarkdown('## Heading\n\n- item\n\n[link](https://example.com) and `code`')
    expect(html).toContain('<h2')
    expect(html).toContain('<li>item</li>')
    expect(html).toContain('<a href="https://example.com"')
    expect(html).toContain('<code>code</code>')
  })
})
