// Validation for SupportedCurrencyPairsForm, shared with currencyPairsFile.
//
// A code must be a current ISO 4217 code whose category is 'currency': fund
// codes, precious metals, units of account and the test/no-currency codes are
// all refused. A pair must name two different currencies and not repeat an
// earlier row. Mirrors validate() in standards-api
// services/jira/forms/supported-currency-pairs.js, which re-checks on submit.

import { ISO_4217, type Iso4217Category } from '@/data/iso4217'

export interface CurrencyPair {
  FromCurrency: string
  ToCurrency: string
}

export type PairField = keyof CurrencyPair
/** Per-field problems, plus `pair` for a problem with the row as a whole. */
export type PairErrors = Partial<Record<PairField | 'pair', string>>

const CURRENCY_RE = /^[A-Z]{3,3}$/
const ISO = new Map(ISO_4217.map((c) => [c.code, c]))

const REFUSED: Record<Exclude<Iso4217Category, 'currency'>, string> = {
  'fund': 'Fund code, not a currency',
  'precious-metal': 'Precious metal, not a currency',
  'unit-of-account': 'Unit of account, not a currency',
  'test': 'Test code, not a currency',
  'no-currency': 'No-currency code',
}

/** True for any current ISO 4217 code, accepted or not. */
export const isIso4217Code = (code: string): boolean => ISO.has(code)

/** Why `code` is not an accepted currency, or undefined if it is. */
export function currencyCodeError(code: string): string | undefined {
  if (!code) return 'Required'
  if (!CURRENCY_RE.test(code)) return 'Three letters, A–Z'
  const iso = ISO.get(code)
  if (!iso) return 'Not an ISO 4217 code'
  if (iso.category !== 'currency') return REFUSED[iso.category]
  return undefined
}

/** Problems for each row, in order. An empty object means the row is fine. */
export function pairErrors(rows: readonly CurrencyPair[]): PairErrors[] {
  const seen = new Map<string, number>()
  return rows.map((r, i) => {
    const e: PairErrors = {}
    const from = currencyCodeError(r.FromCurrency)
    const to = currencyCodeError(r.ToCurrency)
    if (from) e.FromCurrency = from
    if (to) e.ToCurrency = to
    if (from || to) return e
    if (r.FromCurrency === r.ToCurrency) {
      e.pair = 'From and To must be different currencies'
      return e
    }
    const key = `${r.FromCurrency}/${r.ToCurrency}`
    const first = seen.get(key)
    if (first !== undefined) e.pair = `Same as row ${first + 1}`
    else seen.set(key, i)
    return e
  })
}
