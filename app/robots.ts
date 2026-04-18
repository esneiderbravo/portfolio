import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://esneiderbravo.dev/sitemap.xml',
    host: 'https://esneiderbravo.dev',
  }
}
