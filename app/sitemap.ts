import type { MetadataRoute } from 'next'

import { getAllArticles } from '@/src/lib/articles'

const SITE_URL = 'https://esneiderbravo.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles: MetadataRoute.Sitemap = getAllArticles('en').map((article) => ({
    url: `${SITE_URL}/article/${article.slug}`,
    lastModified: new Date(`${article.updated ?? article.date}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/card`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...articles,
  ]
}
