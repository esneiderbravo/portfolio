import { describe, expect, it } from 'vitest'

import { portfolioContent } from '@/src/content/portfolio'

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
    expect(portfolioContent.experiences.length).toBeGreaterThanOrEqual(3)
  })

  it('has certifications', () => {
    expect(portfolioContent.certifications.length).toBeGreaterThanOrEqual(1)
  })
})
