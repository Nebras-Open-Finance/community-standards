// Pre-aggregate the usage logs into the small summaries the homepage and
// /metrics render, so neither page downloads or scans the raw logs.
//
// Reads (all under public/api/):
//   api-log-index.json + its shards   ~380k rows, one per day/LFI/TPP/URL/code group
//   payments-log.json, auth-log.json  homepage ticker and consent figures
//   trust-framework.json              participant counts (fetched by fetch:orgs; optional)
//
// Writes (gitignored, under src/data/generated/):
//   home-stats.json                   every figure the homepage plots, a few KB.
//                                     Imported eagerly, so it is prerendered.
//   metrics/api-monthly.json          API log rolled up per month — /metrics' default view.
//   metrics/api-daily-YYYY-MM.json    the same rolled up per day, one file per month,
//                                     loaded only when the dashboard is filtered to a
//                                     single month (its charts then group by day).
//
// Both metrics files are imported via import.meta.glob, so Vite emits them as
// content-hashed chunks under /assets/ that browsers can cache indefinitely.
//
// Rows are rolled up only across dimensions the dashboard never reads (the
// exact response-code group, and the raw URL once it is parsed into
// family/version/endpoint). Response times on /metrics are an unweighted mean
// of each raw row's average, so every summary row carries `rtSum` (the sum of
// those per-row averages) and `rtN` (how many raw rows it absorbed) — the
// dashboard divides the two and gets exactly the figure it computed from the
// raw log.

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const API_DIR = 'public/api'
const OUT_DIR = 'src/data/generated'
const METRICS_DIR = join(OUT_DIR, 'metrics')

const readJson = async (file) => JSON.parse(await readFile(join(API_DIR, file), 'utf8'))

async function readOptional(file) {
  try {
    return await readJson(file)
  } catch {
    console.warn(`[build-metrics] ${file} unavailable — figures derived from it will render as dashes`)
    return null
  }
}

const manifest = await readJson('api-log-index.json')
const apiLog = []
for (const file of manifest.shards ?? []) for (const row of await readJson(file)) apiLog.push(row)
if (!apiLog.length) {
  console.error('[build-metrics] the API log is empty')
  process.exit(1)
}

const paymentsLog = (await readOptional('payments-log.json')) ?? []
const authLog = (await readOptional('auth-log.json')) ?? []
const trustFramework = await readOptional('trust-framework.json')

// ── /metrics API summaries ─────────────────────────────────────────────────

// Parses a log row's URL exactly as src/stores/dashboard.ts did when it read
// the raw log.
function parseUrl(url) {
  const family = url.match(/open-finance\/([^/]+)(?:\/|$)/)?.[1] ?? 'other'
  const versionMatch = url.match(/\/(v\d+\.\d+)(\/.*)?$/)
  return {
    family,
    version: versionMatch?.[1] ?? 'unknown',
    endpoint: versionMatch?.[2] ?? (family !== 'other' ? `/${family}` : url || '/other'),
  }
}

const SUMMARY_FIELDS = ['period', 'lfi', 'tpp', 'family', 'version', 'endpoint', 'method', 'ok', 'volume', 'rtSum', 'rtN']
const DICT_FIELDS = ['period', 'lfi', 'tpp', 'family', 'version', 'endpoint', 'method']

const parsedUrls = new Map()

function rollUp(rows, periodOf) {
  const groups = new Map()
  for (const row of rows) {
    const url = row.url ?? ''
    let parsed = parsedUrls.get(url)
    if (!parsed) parsedUrls.set(url, (parsed = parseUrl(url)))

    const dims = {
      period: periodOf(row.date ?? ''),
      lfi: row.lfinamekey ?? 'Unknown',
      tpp: row.tppname ?? 'Unknown',
      ...parsed,
      method: row.httpmethod?.toUpperCase() || 'Unknown',
      ok: (row.tppresponsecodegroup ?? '2xx') === '2xx' ? 1 : 0,
    }
    const key = DICT_FIELDS.map((f) => dims[f]).join('\u0000') + `\u0000${dims.ok}`
    let group = groups.get(key)
    if (!group) groups.set(key, (group = { ...dims, volume: 0, rtSum: 0, rtN: 0 }))

    const volume = row.totalapicalls ?? 0
    group.volume += volume
    group.rtSum += volume > 0 ? Math.round((row.executiontime ?? 0) / volume) : 0
    group.rtN += 1
  }
  return [...groups.values()]
}

function encodeTable(rows) {
  const dicts = Object.fromEntries(DICT_FIELDS.map((f) => [f, []]))
  const lookups = Object.fromEntries(DICT_FIELDS.map((f) => [f, new Map()]))
  const encoded = rows.map((row) =>
    SUMMARY_FIELDS.map((f) => {
      const lookup = lookups[f]
      if (!lookup) return row[f]
      let i = lookup.get(row[f])
      if (i === undefined) lookup.set(row[f], (i = dicts[f].push(row[f]) - 1))
      return i
    }),
  )
  return { fields: SUMMARY_FIELDS, dicts, rows: encoded }
}

// A roll-up must preserve every total the dashboard derives from it.
function assertTotalsPreserved(label, rows) {
  const sum = (arr, fn) => arr.reduce((s, r) => s + fn(r), 0)
  const expected = {
    volume: sum(apiLog, (r) => r.totalapicalls ?? 0),
    rtN: apiLog.length,
  }
  const actual = { volume: sum(rows, (r) => r.volume), rtN: sum(rows, (r) => r.rtN) }
  for (const k of Object.keys(expected)) {
    if (expected[k] !== actual[k]) {
      console.error(`[build-metrics] ${label} roll-up lost data: ${k} ${actual[k]} != ${expected[k]}`)
      process.exit(1)
    }
  }
}

const monthly = rollUp(apiLog, (date) => date.substring(0, 7))
const daily = rollUp(apiLog, (date) => date.substring(0, 10))
assertTotalsPreserved('monthly', monthly)
assertTotalsPreserved('daily', daily)

let latestDay = ''
for (const r of apiLog) if (r.date && r.date > latestDay) latestDay = r.date

await rm(METRICS_DIR, { recursive: true, force: true })
await mkdir(METRICS_DIR, { recursive: true })

await writeFile(
  join(METRICS_DIR, 'api-monthly.json'),
  JSON.stringify({ latestDay: latestDay.substring(0, 10), table: encodeTable(monthly) }),
)

const dailyByMonth = new Map()
for (const row of daily) {
  const month = row.period.substring(0, 7)
  if (!dailyByMonth.has(month)) dailyByMonth.set(month, [])
  dailyByMonth.get(month).push(row)
}
for (const [month, rows] of dailyByMonth) {
  // Rows without a usable date have no month to file under; the monthly
  // summary still counts them.
  if (!/^\d{4}-\d{2}$/.test(month)) continue
  await writeFile(join(METRICS_DIR, `api-daily-${month}.json`), JSON.stringify({ table: encodeTable(rows) }))
}

// ── Homepage stats ─────────────────────────────────────────────────────────

const SUCCESS_PAYMENT_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])
// doConfirm's success response is a 3xx redirect back to the Hub; 2xx is
// kept for resilience.
const CONSENT_AUTH_URL = '/auth/:interactionId/doConfirm'
const CONSENT_SUCCESS_CODES = new Set(['2xx', '3xx'])
const AUTH_START_URL = '/auth'

function byMonth(rows, include, valueOf) {
  const totals = {}
  for (const r of rows) {
    if (!include(r)) continue
    const month = (r.date ?? '').substring(0, 7)
    if (!month) continue
    totals[month] = (totals[month] ?? 0) + (valueOf(r) ?? 0)
  }
  return totals
}

let lastDate = ''
for (const rows of [apiLog, paymentsLog, authLog]) {
  for (const r of rows) if (r.date && r.date > lastDate) lastDate = r.date
}

// Orgs are pre-filtered (active only) and pre-deduped (one entry per id) by
// fetch-organisations.mjs. An LFI with a tppGoLiveDate counts as both an LFI
// and a TPP. Live ⊆ production ⊆ onboarded; "live" is driven by the go-live
// date, not by isProduction alone.
function participantCounts(orgs, goLiveField) {
  return {
    live: orgs.filter((o) => !!o[goLiveField]).length,
    production: orgs.filter((o) => o.isProduction === true).length,
    onboarded: orgs.length,
  }
}

const orgs = Array.isArray(trustFramework) ? trustFramework : null
const lfiOrgs = orgs?.filter((o) => o.type === 'LFI') ?? null
const tppOrgs = orgs?.filter((o) => o.type === 'TPP' || !!o.tppGoLiveDate) ?? null

// Unique LFIs/TPPs that sent or received any API call in the trailing 30 days,
// anchored to the latest date in the log (data may lag real time). The log's
// `tppname` is free text that also carries LFIs calling without a TPP
// registration, so callers are matched back to the directory — by legal or
// short name, case-insensitively — so "active TPPs" never exceeds the number
// registered and an org logged under both names counts once.
function activeParticipants() {
  let maxDate = ''
  for (const r of apiLog) if (r.date && r.date > maxDate) maxDate = r.date
  const d = new Date(`${maxDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - 30)
  const windowStart = d.toISOString().substring(0, 10)

  const tppIdByName = new Map()
  for (const o of tppOrgs ?? []) {
    const id = o.id ?? o.legalName ?? o.name ?? ''
    if (!id) continue
    if (o.legalName) tppIdByName.set(o.legalName.toUpperCase(), id)
    if (o.name) tppIdByName.set(o.name.toUpperCase(), id)
  }

  const lfis = new Set()
  const tpps = new Set()
  for (const r of apiLog) {
    if (!r.date || r.date < windowStart) continue
    if (r.lfinamekey) lfis.add(r.lfinamekey)
    const tppId = r.tppname ? tppIdByName.get(r.tppname.toUpperCase()) : undefined
    if (tppId) tpps.add(tppId)
  }
  return { lfis: lfis.size, tpps: orgs ? tpps.size : null }
}

const now = new Date()
const homeStats = {
  // The in-progress month at build time. The homepage drops it from its charts
  // and growth figures; fixing it here rather than reading the viewer's clock
  // keeps the prerendered HTML and the hydrated page identical.
  partialMonth: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
  lastDate,
  apiCallsByMonth: byMonth(apiLog, () => true, (r) => r.totalapicalls),
  successfulPaymentAmountByMonth: byMonth(
    paymentsLog,
    (r) => typeof r.status === 'string' && SUCCESS_PAYMENT_STATUSES.has(r.status) && !!r.lfinamekey,
    (r) => r.amount,
  ),
  consentsAuthorisedByMonth: byMonth(
    authLog,
    (r) => r.url === CONSENT_AUTH_URL && CONSENT_SUCCESS_CODES.has(r.tppresponsecodegroup),
    (r) => r.totalapicalls,
  ),
  authStartsByMonth: byMonth(
    authLog,
    (r) => r.url === AUTH_START_URL && r.tppresponsecodegroup === '2xx',
    (r) => r.totalapicalls,
  ),
  participants: orgs
    ? { lfi: participantCounts(lfiOrgs, 'lfiGoLiveDate'), tpp: participantCounts(tppOrgs, 'tppGoLiveDate') }
    : null,
  active30d: activeParticipants(),
}

await writeFile(join(OUT_DIR, 'home-stats.json'), `${JSON.stringify(homeStats, null, 2)}\n`)

const kib = (n) => `${(n / 1024).toFixed(0)} KiB`
const files = await readdir(METRICS_DIR)
console.log(
  `[build-metrics] ${apiLog.length} API log rows -> ${monthly.length} monthly / ${daily.length} daily ` +
    `summary rows (${files.length} files); home-stats ${kib(JSON.stringify(homeStats).length)}`,
)
