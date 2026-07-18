import { ArticleHome } from '@/src/components/article/ArticleHome'
import { getAllArticles } from '@/src/lib/articles'

const SITE_URL = 'https://esneiderbravo.dev'

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Esneider Bravo — Engineering Blog',
  url: SITE_URL,
  description:
    'Deep dives and honest notes on Python, FastAPI, AWS and AI-first engineering by Esneider Bravo.',
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Esneider Bravo', url: SITE_URL },
}

/** Article-first home page: loads both-locale article summaries at build time. */
export default function HomePage() {
  const articles = {
    en: getAllArticles('en'),
    es: getAllArticles('es'),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <ArticleHome articles={articles} />
    </>
  )
}
