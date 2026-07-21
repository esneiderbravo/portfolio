import type { BusinessCard, Profile } from '@/src/types/portfolio'

const SITE_URL = 'https://esneiderbravo.dev'

/**
 * Escapes a text value per RFC 2426 (vCard 3.0): backslash, newline,
 * comma, and semicolon.
 */
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

/** Formats a single property line, or returns null when the value is empty. */
function property(name: string, value: string): string | null {
  if (value.trim().length === 0) return null
  return `${name}:${escapeVCardValue(value)}`
}

/**
 * Builds a vCard 3.0 string from portfolio content — the single source of
 * truth for the downloadable contact card served at `/card/vcard`.
 *
 * Uses version 3.0 (not 4.0) for the widest native support in the iOS and
 * Android add-contact flows. Lines are CRLF-terminated per spec; empty
 * content fields are omitted.
 */
export function buildVCard(profile: Profile, businessCard: BusinessCard): string {
  const [givenName, ...familyParts] = profile.name.split(' ')
  const familyName = familyParts.join(' ')

  const lines: (string | null)[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    property('FN', profile.name),
    `N:${escapeVCardValue(familyName)};${escapeVCardValue(givenName)};;;`,
    property('TITLE', businessCard.jobTitle),
    property('ORG', businessCard.organization),
    property('TEL;TYPE=CELL', businessCard.phone),
    property('EMAIL;TYPE=INTERNET', profile.email),
    property('URL', SITE_URL),
    ...profile.socialLinks.map((link) =>
      property(`X-SOCIALPROFILE;TYPE=${link.label.toLowerCase()}`, link.href),
    ),
    property('NOTE', businessCard.pitch.en),
    'END:VCARD',
  ]

  return lines.filter((line): line is string => line !== null).join('\r\n') + '\r\n'
}
