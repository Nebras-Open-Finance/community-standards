/**
 * Builds an LFI → sector map from the live participants directory
 * (https://data.directory.openfinance.ae/participants) and writes it to
 * public/api/lfi-sectors.json for the metrics dashboard.
 *
 * Sector is taken from each organisation's `Flags.lfi_type` (`Bank` → `bank`,
 * `Insurer` → `insurer`). The log files key every row by `lfinamekey`
 * (e.g. `uae-adcbrt`); that key is derived here from the authorisation server's
 * OpenID discovery host (`https://auth1.adcbrt.apihub.openfinance.ae/...`
 * → `uae-adcbrt`), which is the same code the API Hub stamps into the logs.
 *
 * The directory is the authoritative source but lags new entrants, so the
 * dashboard additionally treats any LFI observed calling the `insurance` API
 * family as an insurer at runtime — this file only needs to cover directory
 * participants. It rarely changes, so it is fetched at build time.
 *
 * Exits non-zero on fetch failure or if the response yields no usable entries.
 *
 * Usage:  node scripts/fetch-lfi-sectors.mjs [--source <url>]
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_PATH = resolve(ROOT, 'public', 'api', 'lfi-sectors.json')

const DEFAULT_SOURCE = 'https://data.directory.openfinance.ae/participants'

function parseSource() {
  const idx = process.argv.indexOf('--source')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.PARTICIPANTS_SOURCE_URL || DEFAULT_SOURCE
}

// `Bank` → `bank`, `Insurer` → `insurer`; anything else is skipped.
function sectorFromLfiType(lfiType) {
  const raw = Array.isArray(lfiType) ? lfiType[0] : lfiType
  if (typeof raw !== 'string') return null
  const v = raw.toLowerCase()
  if (v === 'bank') return 'bank'
  if (v === 'insurer') return 'insurer'
  return null
}

// The `lfinamekey` used across the log files is `uae-<code>`, where <code> is
// the second label of the auth server's host (auth1.<code>.apihub…).
function lfiKeyFromServer(server) {
  const url = server?.OpenIDDiscoveryDocument || server?.Issuer || ''
  const m = String(url).match(/https?:\/\/[^.]+\.([^.]+)\.apihub\./i)
  return m ? `uae-${m[1]}` : null
}

async function main() {
  const source = parseSource()
  console.log(`Fetching participants from ${source}`)

  let res
  try {
    res = await fetch(source, { headers: { Accept: 'application/json' } })
  } catch (err) {
    throw new Error(`Network error fetching ${source}: ${err.message}`)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${source}`)

  let data
  try {
    data = JSON.parse(await res.text())
  } catch (err) {
    throw new Error(`Response is not valid JSON: ${err.message}`)
  }
  if (!Array.isArray(data)) throw new Error('expected top-level JSON array')

  const sectors = {}
  const warnings = []
  let banks = 0
  let insurers = 0

  for (const org of data) {
    const sector = sectorFromLfiType(org?.Flags?.lfi_type)
    if (!sector) {
      warnings.push(`${org?.OrganisationName || org?.OrganisationId || '<unknown>'}: no lfi_type flag`)
      continue
    }
    for (const server of org?.AuthorisationServers || []) {
      const key = lfiKeyFromServer(server)
      if (!key) {
        warnings.push(`${org?.OrganisationName}/${server?.CustomerFriendlyName || '?'}: could not derive lfinamekey`)
        continue
      }
      if (sectors[key] && sectors[key] !== sector) {
        warnings.push(`${key}: conflicting sector (${sectors[key]} vs ${sector}) — keeping ${sectors[key]}`)
        continue
      }
      sectors[key] = sector
      if (sector === 'bank') banks++
      else insurers++
    }
  }

  if (Object.keys(sectors).length === 0) {
    throw new Error('no LFI sector entries produced — refusing to write')
  }

  // Deterministic key order keeps the committed-artifact diff minimal.
  const ordered = Object.fromEntries(Object.keys(sectors).sort().map(k => [k, sectors[k]]))

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(ordered, null, 2) + '\n')

  console.log(`✓ Wrote ${Object.keys(ordered).length} LFI sectors to ${OUT_PATH}`)
  console.log(`  Banks: ${banks}  Insurers: ${insurers}`)
  if (warnings.length) {
    console.log(`  ${warnings.length} warning(s):`)
    for (const w of warnings) console.log(`    - ${w}`)
  }
}

main().catch(err => {
  console.error('fetch-lfi-sectors failed:', err.message)
  process.exit(1)
})
