import type { Locale } from '@/src/i18n/translations'

/**
 * Formats a `YYYY-MM-DD` article date for display in the active locale.
 * Parses as UTC so server and client render the same day regardless of zone.
 */
export function formatArticleDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
