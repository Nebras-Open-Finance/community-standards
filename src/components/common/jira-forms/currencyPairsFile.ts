// Read currency pairs from an uploaded spreadsheet for SupportedCurrencyPairsForm.
//
// .xlsx, .xls or .csv; the first sheet only. Column A is From Currency, column B
// To Currency. Values are trimmed and upper-cased; rows empty in both columns are
// skipped. A first row with no valid currency code in either column is taken to
// be a header and skipped. Anything else invalid is KEPT, so the form can
// highlight it for the customer to fix rather than silently dropping a pair.
//
// SheetJS is imported on demand, so the page does not carry it until a file is
// actually uploaded.

export interface ParsedPair {
  FromCurrency: string
  ToCurrency: string
}

export type ParseResult =
  | { ok: true; pairs: ParsedPair[]; skippedHeader: boolean }
  | { ok: false; error: string }

export const MAX_FILE_BYTES = 2 * 1024 * 1024
export const ACCEPTED_FILES = '.xlsx,.xls,.csv'

const CURRENCY_RE = /^[A-Z]{3,3}$/

const cell = (v: unknown): string => String(v ?? '').trim().toUpperCase()

export async function parseCurrencyPairsFile(data: ArrayBuffer, maxPairs: number): Promise<ParseResult> {
  if (data.byteLength > MAX_FILE_BYTES) {
    return { ok: false, error: 'That file is larger than 2 MB. Upload just the two currency columns.' }
  }

  let rows: unknown[][]
  try {
    const XLSX = await import('xlsx')
    const book = XLSX.read(data, { type: 'array' })
    const first = book.SheetNames[0]
    const sheet = first ? book.Sheets[first] : undefined
    if (!sheet) return { ok: false, error: 'That file has no sheets.' }
    // raw: false gives each cell's displayed text, so a code never arrives as a
    // number or date the spreadsheet guessed at.
    rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: false, defval: '', blankrows: false })
  } catch {
    return { ok: false, error: 'Could not read that file. Upload an .xlsx, .xls or .csv file.' }
  }

  let pairs = rows
    .map((r) => ({ FromCurrency: cell(r[0]), ToCurrency: cell(r[1]) }))
    .filter((p) => p.FromCurrency || p.ToCurrency)

  const head = pairs[0]
  const skippedHeader = !!head && !CURRENCY_RE.test(head.FromCurrency) && !CURRENCY_RE.test(head.ToCurrency)
  if (skippedHeader) pairs = pairs.slice(1)

  if (pairs.length === 0) {
    return { ok: false, error: 'No currency pairs found. Put From Currency in column A and To Currency in column B.' }
  }
  if (pairs.length > maxPairs) {
    return {
      ok: false,
      error: `That file has ${pairs.length} pairs; the maximum is ${maxPairs}. Split it, or remove pairs, and upload again.`,
    }
  }
  return { ok: true, pairs, skippedHeader }
}
