import type { Metadata } from 'next'

import CvPageClient from './CvPageClient'

const SITE_URL = 'https://esneiderbravo.dev'
const CV_URL = `${SITE_URL}/cv`
const CV_TITLE = 'CV — Senior Software Engineer'
const CV_DESCRIPTION =
  'CV of Esneider Bravo — Senior Software Engineer specializing in Python, FastAPI, microservices, and AWS. AI-First architect building scalable fintech platforms at Muno Labs. Technical leadership, clean architecture, and TDD.'

export const metadata: Metadata = {
  title: CV_TITLE,
  description: CV_DESCRIPTION,
  alternates: { canonical: CV_URL },
  openGraph: {
    type: 'profile',
    url: CV_URL,
    title: CV_TITLE,
    description: CV_DESCRIPTION,
  },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: CV_URL,
  name: CV_TITLE,
  description: CV_DESCRIPTION,
  mainEntity: {
    '@type': 'Person',
    name: 'Esneider Bravo',
    url: SITE_URL,
  },
}

/** Server shell for `/cv`: route metadata plus the client portfolio experience. */
export default function CvPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <CvPageClient />
    </>
  )
}
