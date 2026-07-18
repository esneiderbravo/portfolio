import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  ArticlePageClient,
  type ArticlePagePayload,
  type RelatedArticle,
} from '@/src/components/article/ArticlePageClient'
import type { Locale } from '@/src/i18n/translations'
import { renderArticle } from '@/src/lib/article'
import { getAllArticles, getArticleBySlug } from '@/src/lib/articles'

const SITE_URL = 'https://esneiderbravo.dev'
const RELATED_COUNT = 3

type ArticleRouteParams = { slug: string }

/** Only non-draft articles get a route; anything else 404s (`dynamicParams` off). */
export const dynamicParams = false

export function generateStaticParams(): ArticleRouteParams[] {
  return getAllArticles('en').map((article) => ({ slug: article.slug }))
}

/** Article metadata from the EN frontmatter, the site's canonical SEO language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleRouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug, 'en')
  if (!article || article.draft) return {}

  const url = `${SITE_URL}/article/${slug}`
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      ...(article.updated ? { modifiedTime: article.updated } : {}),
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

/**
 * Related articles: the non-draft articles that share the most tags with the
 * current one, ties broken by most recent, top {@link RELATED_COUNT}. Titles
 * are per-locale; tag overlap and dates are locale-invariant so ranking uses
 * the EN list.
 */
function buildRelated(slug: string, tags: string[]): Record<Locale, RelatedArticle[]> {
  const en = getAllArticles('en')
  const es = getAllArticles('es')
  const esBySlug = new Map(es.map((article) => [article.slug, article]))

  const ranked = en
    .filter((article) => article.slug !== slug)
    .map((article) => ({
      article,
      shared: article.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.article.date.localeCompare(a.article.date))
    .slice(0, RELATED_COUNT)
    .map((entry) => entry.article)

  const toSummary = (locale: Locale): RelatedArticle[] =>
    ranked.map((article) => {
      const localized = locale === 'en' ? article : (esBySlug.get(article.slug) ?? article)
      return {
        slug: article.slug,
        title: localized.title,
        date: article.date,
        readingTimeMinutes: article.readingTimeMinutes,
        tags: article.tags,
      }
    })

  return { en: toSummary('en'), es: toSummary('es') }
}

export default async function ArticlePage({ params }: { params: Promise<ArticleRouteParams> }) {
  const { slug } = await params
  const en = getArticleBySlug(slug, 'en')
  const es = getArticleBySlug(slug, 'es')
  if (!en || !es || en.draft) notFound()

  const allEn = getAllArticles('en')
  const total = allEn.length
  const index = allEn.findIndex((article) => article.slug === slug)
  // Chronological edition: the oldest published article is 01.
  const edition = index === -1 ? '01' : String(total - index).padStart(2, '0')

  const enRendered = renderArticle(en.body)
  const esRendered = renderArticle(es.body)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: en.title,
    description: en.description,
    datePublished: en.date,
    ...(en.updated ? { dateModified: en.updated } : {}),
    author: { '@type': 'Person', name: 'Esneider Bravo', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/article/${slug}`,
    inLanguage: 'en',
    keywords: en.tags.join(', '),
  }

  const article: ArticlePagePayload = {
    slug,
    date: en.date,
    ...(en.updated ? { updated: en.updated } : {}),
    tags: en.tags,
    edition,
    related: buildRelated(slug, en.tags),
    versions: {
      en: {
        title: en.title,
        description: en.description,
        html: enRendered.html,
        toc: enRendered.toc,
        readingTimeMinutes: en.readingTimeMinutes,
      },
      es: {
        title: es.title,
        description: es.description,
        html: esRendered.html,
        toc: esRendered.toc,
        readingTimeMinutes: es.readingTimeMinutes,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticlePageClient article={article} />
    </>
  )
}
