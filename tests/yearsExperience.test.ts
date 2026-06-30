import { describe, expect, it } from 'vitest'

import { portfolioContent } from '@/src/content/portfolio'
import { formatYearsOfExperience, parseExperienceStartDate } from '@/src/lib/yearsExperience'

describe('yearsExperience', () => {
  it('parses experience period start dates', () => {
    expect(parseExperienceStartDate('Feb 2019 - Aug 2020')).toEqual(new Date(2019, 1, 1))
    expect(parseExperienceStartDate('Jun 2026 - Present')).toEqual(new Date(2026, 5, 1))
    expect(parseExperienceStartDate('invalid')).toBeNull()
  })

  it('computes years from the earliest experience', () => {
    const roles = portfolioContent.companyExperiences.flatMap((company) => company.roles)
    expect(formatYearsOfExperience(roles, new Date(2026, 5, 30))).toBe('7+')
    expect(formatYearsOfExperience(roles, new Date(2027, 1, 1))).toBe('8+')
    expect(formatYearsOfExperience(roles, new Date(2019, 1, 1))).toBe('0+')
  })
})
