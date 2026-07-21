import { describe, expect, it } from 'vitest'

import { portfolioContent } from '@/src/content/portfolio'
import { buildVCard } from '@/src/lib/vcard'
import type { BusinessCard, Profile } from '@/src/types/portfolio'

const baseProfile: Profile = {
  ...portfolioContent.profile,
  name: 'Esneider Bravo',
  email: 'test@example.com',
  socialLinks: [{ label: 'GitHub', href: 'https://github.com/esneiderbravo' }],
}

const baseCard: BusinessCard = {
  phone: '+573001234567',
  whatsappUrl: 'https://wa.me/573001234567',
  schedulingUrl: 'https://calendly.com/example',
  pitch: { en: 'Backend engineer.', es: 'Ingeniero backend.' },
  organization: 'Muno Labs',
  jobTitle: 'Senior Software Engineer',
}

describe('buildVCard', () => {
  it('includes the required vCard 3.0 fields', () => {
    const vcard = buildVCard(baseProfile, baseCard)
    expect(vcard).toContain('BEGIN:VCARD')
    expect(vcard).toContain('VERSION:3.0')
    expect(vcard).toContain('FN:Esneider Bravo')
    expect(vcard).toContain('N:Bravo;Esneider;;;')
    expect(vcard).toContain('TITLE:Senior Software Engineer')
    expect(vcard).toContain('ORG:Muno Labs')
    expect(vcard).toContain('TEL;TYPE=CELL:+573001234567')
    expect(vcard).toContain('EMAIL;TYPE=INTERNET:test@example.com')
    expect(vcard).toContain('URL:https://esneiderbravo.dev')
    expect(vcard).toContain('END:VCARD')
  })

  it('uses CRLF line endings throughout', () => {
    const vcard = buildVCard(baseProfile, baseCard)
    expect(vcard.endsWith('\r\n')).toBe(true)
    expect(vcard.split('\r\n').length).toBeGreaterThan(5)
    expect(/[^\r]\n/.test(vcard)).toBe(false)
  })

  it('escapes commas, semicolons, and newlines in values', () => {
    const vcard = buildVCard(baseProfile, {
      ...baseCard,
      organization: 'Muno Labs, Inc; LATAM',
      pitch: { ...baseCard.pitch, en: 'Line one\nLine two' },
    })
    expect(vcard).toContain('ORG:Muno Labs\\, Inc\\; LATAM')
    expect(vcard).toContain('NOTE:Line one\\nLine two')
  })

  it('omits properties whose content field is empty', () => {
    const vcard = buildVCard(baseProfile, { ...baseCard, organization: '', jobTitle: ' ' })
    expect(vcard).not.toContain('ORG:')
    expect(vcard).not.toContain('TITLE:')
  })

  it('builds from the real portfolio content without errors', () => {
    const vcard = buildVCard(portfolioContent.profile, portfolioContent.businessCard)
    expect(vcard).toContain(`FN:${portfolioContent.profile.name}`)
    expect(vcard).toContain(portfolioContent.businessCard.phone)
  })
})
