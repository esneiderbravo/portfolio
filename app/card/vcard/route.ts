import { portfolioContent } from '@/src/content/portfolio'
import { buildVCard } from '@/src/lib/vcard'

export const dynamic = 'force-static'

/**
 * Serves the contact vCard at `/card/vcard`, derived from portfolio content
 * at build time. The `text/vcard` type plus attachment disposition triggers
 * the native add-contact flow on iOS and Android.
 */
export function GET(): Response {
  const vcard = buildVCard(portfolioContent.profile, portfolioContent.businessCard)

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="esneider-bravo.vcf"',
    },
  })
}
