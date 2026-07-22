import type { Metadata } from 'next'

import CardPageClient from './CardPageClient'

const SITE_URL = 'https://esneiderbravo.dev'
const CARD_URL = `${SITE_URL}/card`
const CARD_TITLE = 'Esneider Bravo — Digital Business Card'
const CARD_DESCRIPTION =
  'Building something big? I turn business ideas into products that scale — fintech, AI, and revenue-ready platforms. Save my contact or book a call today.'

export const metadata: Metadata = {
  title: CARD_TITLE,
  description: CARD_DESCRIPTION,
  alternates: { canonical: CARD_URL },
  openGraph: {
    type: 'profile',
    url: CARD_URL,
    title: CARD_TITLE,
    description: CARD_DESCRIPTION,
    // The root opengraph-image.tsx only serves `/`, so reference it explicitly.
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
}

/** Server shell for `/card`: route metadata plus the client business card. */
export default function CardPage() {
  return <CardPageClient />
}
