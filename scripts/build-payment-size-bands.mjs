// Roll the per-payment log up into size-band counts for the "Payment Size
// Distribution" chart on /metrics?section=payment-volumes.
//
// Why a rollup: `public/api/raw-payment-log.json` holds one record per payment
// (~50k rows, ~10 MiB minified). Every other chart on the dashboard reads a
// pre-aggregated log, and shipping the raw file to every visitor to draw six
// bars would be absurd. Grouping by date + LFI + TPP + status + band keeps
// every dimension the dashboard filters on while collapsing the payload by
// ~50x.
//
// Why it can't just reuse payments-log.json: that log is already aggregated, so
// a row's only size signal is its mean ticket (amount / count). The chart that
// used to live here banded by that mean and was therefore an approximation of
// the real spread. Banding the raw per-payment amounts is exact, which is the
// whole point of this script.
//
// The raw log is gitignored (see .gitignore) — it is a local export, and the
// rolled-up output is what gets committed and deployed. So this script is a
// no-op when the raw file is absent, leaving the committed rollup untouched;
// that keeps CI and fresh clones building without it.

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const RAW_LOG   = 'public/api/raw-payment-log.json'
const PAYMENTS  = 'public/api/payments-log.json'
const OUT       = 'public/api/payment-size-bands.json'

// Size bands in AED, with the edges the chart this replaces used. Each band
// includes its lower bound and excludes its upper one, and the labels say so
// with `<` because the boundaries are the busiest values in the data: round
// amounts land exactly on them (3,039 payments of exactly 100, 2,405 of exactly
// 1,000), so "100 – 1K" left it genuinely ambiguous which side they counted on.
//
// `min` is emitted with each row so the chart orders the x-axis from the data
// rather than keeping its own copy of these edges.
const SIZE_BANDS = [
  { label: '< 100',       min: 0,      max: 100    },
  { label: '100 – <1K',   min: 100,    max: 1_000  },
  { label: '1K – <5K',    min: 1_000,  max: 5_000  },
  { label: '5K – <10K',   min: 5_000,  max: 10_000 },
  { label: '10K – <50K',  min: 10_000, max: 50_000 },
  { label: '≥ 50K',       min: 50_000, max: Infinity },
]

// The raw log carries both the historical short name and the current legal name
// for four TPPs, while payments-log.json — which populates the dashboard's TPP
// filter — only ever uses one spelling. Left unmapped, selecting "MASHREQ BANK
// PSC" would silently drop the rows the raw log labels "MASHREQ". Each pair
// below was confirmed by matching per-TPP payment counts and LFI/month
// footprints across the two logs.
const TPP_ALIASES = {
  'EMIRATES NBD':                    'EMIRATES NBD BANK PJSC',
  'MASHREQ':                         'MASHREQ BANK PSC',
  'NYMCARD PAYMENT SERVICES L.L.C.': 'NYMCARD',
  'SPARE TECHNOLOGIES':              'SPARE DIGITAL TECHNOLOGIES LLC S.O.C',
}

if (!existsSync(RAW_LOG)) {
  console.log(`[payment-size-bands] ${RAW_LOG} not present — keeping the committed rollup.`)
  process.exit(0)
}

const raw = JSON.parse(await readFile(RAW_LOG, 'utf8'))
if (!Array.isArray(raw)) {
  console.error(`[payment-size-bands] ${RAW_LOG} is not an array of payment records.`)
  process.exit(1)
}

// Canonical TPP spellings, taken from the log that drives the filter dropdown.
const canonicalTpps = new Set(
  JSON.parse(await readFile(PAYMENTS, 'utf8'))
    .map(r => r?.tppname)
    .filter(v => typeof v === 'string'),
)

function canonicalTpp(name, unmapped) {
  if (typeof name !== 'string' || !name) return 'Unknown'
  const mapped = TPP_ALIASES[name] ?? name
  // A name that is neither canonical nor aliased means the raw export has
  // introduced a spelling the filter can't match. Collect rather than guess.
  if (!canonicalTpps.has(mapped)) unmapped.add(name)
  return mapped
}

function bandOf(amount) {
  const i = SIZE_BANDS.findIndex(b => amount < b.max)
  return i === -1 ? SIZE_BANDS.length - 1 : i
}

const unmapped = new Set()
let skipped = 0

// key → row. Grouping by date + LFI + TPP + status keeps every dimension the
// dashboard filters on; `paymentconsenttype` is deliberately dropped, as it
// would multiply the row count for a breakdown this chart doesn't draw.
const groups = new Map()

for (const r of raw) {
  const amount = Number(r?.amount)
  const date   = String(r?.timestamp ?? '').substring(0, 10)

  // A payment with no date or no usable amount can't be placed on either axis.
  if (!date || !Number.isFinite(amount) || amount <= 0) {
    skipped++
    continue
  }

  const lfi    = typeof r?.lfinamekey === 'string' && r.lfinamekey ? r.lfinamekey : 'Unknown'
  const tpp    = canonicalTpp(r?.tppname, unmapped)
  const status = typeof r?.status === 'string' && r.status ? r.status : 'Unknown'
  const band   = bandOf(amount)

  const key = `${date}|${lfi}|${tpp}|${status}|${band}`
  const row = groups.get(key)
  if (row) {
    row.count  += 1
    row.amount += amount
  } else {
    groups.set(key, {
      date,
      lfinamekey: lfi,
      tppname:    tpp,
      status,
      band:    SIZE_BANDS[band].label,
      bandmin: SIZE_BANDS[band].min,
      count:   1,
      amount,
    })
  }
}

if (unmapped.size) {
  console.error(
    `[payment-size-bands] TPP name(s) in ${RAW_LOG} match neither a canonical name in\n` +
      `${PAYMENTS} nor an alias in TPP_ALIASES:\n  ${[...unmapped].join('\n  ')}\n` +
      'Add the mapping, or the dashboard\'s TPP filter will silently exclude these payments.',
  )
  process.exit(1)
}

// Sort by date, then by the band's lower edge, so the committed file reads in
// chronological order and diffs between exports stay legible.
const rows = [...groups.values()].sort((a, b) =>
  a.date.localeCompare(b.date) ||
  a.lfinamekey.localeCompare(b.lfinamekey) ||
  a.tppname.localeCompare(b.tppname) ||
  a.bandmin - b.bandmin ||
  a.status.localeCompare(b.status),
)

// Round to fils — floating-point addition over thousands of amounts otherwise
// leaves long decimal tails in the committed file.
for (const row of rows) row.amount = Math.round(row.amount * 100) / 100

await writeFile(OUT, `${JSON.stringify(rows, null, '\t')}\n`)

const banded = rows.reduce((s, r) => s + r.count, 0)
console.log(
  `[payment-size-bands] ${raw.length.toLocaleString()} payments -> ` +
    `${rows.length.toLocaleString()} rows (${banded.toLocaleString()} banded` +
    `${skipped ? `, ${skipped.toLocaleString()} skipped` : ''}) -> ${OUT}`,
)
for (const b of SIZE_BANDS) {
  const n = rows.filter(r => r.band === b.label).reduce((s, r) => s + r.count, 0)
  if (n) console.log(`  ${b.label.padEnd(10)} ${String(n).padStart(7)}  ${((n / banded) * 100).toFixed(2)}%`)
}
