/**
 * Helpers for generating future-dated example values so documentation
 * examples do not rot once their hard-coded dates slip into the past.
 */

/** Return a YYYY-MM-DD string for a date `daysAhead` days from today (UTC). */
export function futureDateOnly(daysAhead: number): string {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + daysAhead)
  return d.toISOString().slice(0, 10)
}

/** Return an end-of-day ISO timestamp (23:59:59.000Z) for `daysAhead` days from today. */
export function futureDateTime(daysAhead: number): string {
  return `${futureDateOnly(daysAhead)}T23:59:59.000Z`
}

/**
 * Generate a list of `count` future payment-execution dates (YYYY-MM-DD),
 * starting `startInDays` from today and spaced `stepDays` apart.
 * Defaults keep the last date comfortably under one year.
 */
export function generateScheduleDates(
  count = 12,
  startInDays = 10,
  stepDays = 28,
): string[] {
  return Array.from({ length: count }, (_, i) =>
    futureDateOnly(startInDays + i * stepDays),
  )
}
