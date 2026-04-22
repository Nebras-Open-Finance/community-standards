/**
 * Fetches the live trust-framework organisation list from the Nebras docs Worker
 * (https://docs.nebras-open-finance.com/) and writes it to
 * docs/public/api/trust-framework.json for build-time consumers (sidebars,
 * SSG pages, homepage ticker, org scroller).
 *
 * Validates the response shape before writing so a bad upstream can't silently
 * break the build. Exits non-zero on fetch failure or schema validation error.
 *
 * Usage:  node scripts/fetch-organisations.mjs [--source <url>]
 *   --source  Override the source URL (default: https://docs.nebras-open-finance.com/)
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_PATH = resolve(ROOT, 'docs', 'public', 'api', 'trust-framework.json')

const DEFAULT_SOURCE = 'https://docs.nebras-open-finance.com/'
const VALID_TYPES = new Set(['LFI', 'TPP', 'Authority'])
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function parseSource() {
  const idx = process.argv.indexOf('--source')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.ORGS_SOURCE_URL || DEFAULT_SOURCE
}

function validate(data) {
  const errors = []
  if (!Array.isArray(data)) {
    return ['expected top-level JSON array']
  }
  if (data.length === 0) {
    errors.push('organisation list is empty')
  }

  const seen = new Set()
  data.forEach((o, i) => {
    const tag = `[${i}] ${o?.name || o?.id || '<unknown>'}`
    if (!o || typeof o !== 'object') { errors.push(`${tag}: not an object`); return }
    if (typeof o.id !== 'string' || !o.id) errors.push(`${tag}: missing/invalid id`)
    if (typeof o.name !== 'string' || !o.name) errors.push(`${tag}: missing/invalid name`)
    if (typeof o.legalName !== 'string' || !o.legalName) errors.push(`${tag}: missing/invalid legalName`)
    if (o.logoUri !== null && typeof o.logoUri !== 'string') errors.push(`${tag}: invalid logoUri`)
    if (!VALID_TYPES.has(o.type)) errors.push(`${tag}: invalid type '${o.type}'`)
    if (typeof o.isProduction !== 'boolean') errors.push(`${tag}: invalid isProduction`)
    if (o.lfiGoLiveDate !== undefined && !ISO_DATE.test(o.lfiGoLiveDate)) errors.push(`${tag}: invalid lfiGoLiveDate '${o.lfiGoLiveDate}'`)
    if (o.tppGoLiveDate !== undefined && !ISO_DATE.test(o.tppGoLiveDate)) errors.push(`${tag}: invalid tppGoLiveDate '${o.tppGoLiveDate}'`)

    if (o.id && seen.has(o.id)) errors.push(`${tag}: duplicate id ${o.id}`)
    if (o.id) seen.add(o.id)
  })

  return errors
}

async function main() {
  const source = parseSource()
  console.log(`Fetching organisations from ${source}`)

  let res
  try {
    res = await fetch(source, { headers: { Accept: 'application/json' } })
  } catch (err) {
    throw new Error(`Network error fetching ${source}: ${err.message}`)
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${source}`)
  }

  const body = await res.text()
  let data
  try {
    data = JSON.parse(body)
  } catch (err) {
    throw new Error(`Response is not valid JSON: ${err.message}`)
  }

  const errors = validate(data)
  if (errors.length) {
    console.error(`Validation failed (${errors.length} error${errors.length === 1 ? '' : 's'}):`)
    for (const e of errors) console.error(`  - ${e}`)
    throw new Error('Organisation data failed schema validation — refusing to write.')
  }

  const lfiCount = data.filter(o => o.type === 'LFI').length
  const tppCount = data.filter(o => o.type === 'TPP').length
  const prodCount = data.filter(o => o.isProduction).length
  const liveLfi = data.filter(o => o.lfiGoLiveDate).length
  const liveTpp = data.filter(o => o.tppGoLiveDate).length

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + '\n')

  console.log(`✓ Wrote ${data.length} organisations to ${OUT_PATH}`)
  console.log(`  LFIs: ${lfiCount}  TPPs: ${tppCount}  Production: ${prodCount}`)
  console.log(`  Live in prod — LFIs: ${liveLfi}, TPPs: ${liveTpp}`)
}

main().catch(err => {
  console.error('fetch-organisations failed:', err.message)
  process.exit(1)
})
