import { describe, expect, it } from 'vitest'

import { portfolioContent } from '@/src/content/portfolio'
import { translations } from '@/src/i18n/translations'

describe('portfolio content', () => {
  it('contains required profile fields', () => {
    expect(portfolioContent.profile.name.length).toBeGreaterThan(0)
    expect(portfolioContent.profile.email.includes('@')).toBe(true)
  })

  it('has at least three featured projects', () => {
    expect(portfolioContent.projects.length).toBeGreaterThanOrEqual(3)
  })

  it('defines all required skill groups', () => {
    expect(portfolioContent.skillGroups.length).toBeGreaterThanOrEqual(5)
  })

  it('has work experience entries', () => {
    expect(portfolioContent.companyExperiences.length).toBeGreaterThanOrEqual(3)
  })

  it('has certifications', () => {
    expect(portfolioContent.certifications.length).toBeGreaterThanOrEqual(1)
  })
})

describe('article i18n completeness', () => {
  it('declares the same article keys in EN and ES', () => {
    expect(Object.keys(translations.en.article).sort()).toEqual(
      Object.keys(translations.es.article).sort(),
    )
  })

  it('has a non-empty value for every article string in both locales', () => {
    for (const locale of ['en', 'es'] as const) {
      for (const [key, value] of Object.entries(translations[locale].article)) {
        expect(value.trim().length, `${locale}.article.${key}`).toBeGreaterThan(0)
      }
    }
  })
})
