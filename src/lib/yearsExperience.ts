import type { Experience, ExperienceRole } from '@/src/types/portfolio'

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

/** Parses the start of an experience period string (e.g. "Feb 2019 - Aug 2020"). */
export function parseExperienceStartDate(period: string): Date | null {
  const startPart = period.split(' - ')[0]?.trim()
  if (!startPart) return null

  const match = startPart.match(/^([A-Za-z]{3})\s+(\d{4})$/)
  if (!match) return null

  const month = MONTH_INDEX[match[1].toLowerCase()]
  const year = Number.parseInt(match[2], 10)
  if (month === undefined || Number.isNaN(year)) return null

  return new Date(year, month, 1)
}

/** Full years since the earliest role start, formatted as "7+". */
export function formatYearsOfExperience(
  roles: Pick<ExperienceRole, 'period'>[] | Pick<Experience, 'period'>[],
  asOf: Date = new Date(),
): string {
  const startDates = roles
    .map((role) => parseExperienceStartDate(role.period))
    .filter((date): date is Date => date !== null)

  if (startDates.length === 0) return '0+'

  const earliest = new Date(Math.min(...startDates.map((date) => date.getTime())))

  let years = asOf.getFullYear() - earliest.getFullYear()
  const hasNotReachedAnniversary =
    asOf.getMonth() < earliest.getMonth() ||
    (asOf.getMonth() === earliest.getMonth() && asOf.getDate() < earliest.getDate())

  if (hasNotReachedAnniversary) years -= 1

  return `${Math.max(0, years)}+`
}
