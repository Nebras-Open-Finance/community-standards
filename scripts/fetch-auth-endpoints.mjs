/**
 * Builds the redirect-testing dataset: every Active authorisation server in the
 * live participants directory (https://data.directory.openfinance.ae/participants),
 * paired with the `authorization_endpoint` resolved from its OpenID discovery
 * document. Writes public/api/authorization-endpoints.json.
 *
 * The `authorization_endpoint` is the LFI-hosted URL the customer is redirected
 * to for authentication — it is NOT an API Hub host, so it can only be learned
 * by dereferencing each server's discovery document. Those are fetched in
 * parallel at build time.
 *
 * Note: `SupportsRedirect` in the directory is `false` on every server and is not
 * maintained upstream — it is deliberately ignored here.
 *
 * Exits non-zero if the directory fetch fails, if it yields no Active servers,
 * or if ANY discovery document fails to resolve — the page must not silently
 * render a partial ecosystem.
 *
 * Usage:  node scripts/fetch-auth-endpoints.mjs [--source <url>]
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { probeOrigin } from './lib/well-known-probe.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_PATH = resolve(ROOT, 'public', 'api', 'authorization-endpoints.json')

const DEFAULT_SOURCE = 'https://data.directory.openfinance.ae/participants'
const DISCOVERY_TIMEOUT_MS = 20000

function parseSource() {
  const idx = process.argv.indexOf('--source')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.PARTICIPANTS_SOURCE_URL || DEFAULT_SOURCE
}

async function getJson(url, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

function originOf(url) {
  try { return new URL(url).origin } catch { return null }
}

// The LFI code the API Hub stamps into hostnames: auth1.<code>.apihub… → <code>.
function lfiCodeFromIssuer(issuer) {
  const m = String(issuer || '').match(/https?:\/\/[^.]+\.([^.]+)\.apihub\./i)
  return m ? m[1] : null
}

function sectorFromLfiType(lfiType) {
  const raw = Array.isArray(lfiType) ? lfiType[0] : lfiType
  if (typeof raw !== 'string') return null
  const v = raw.toLowerCase()
  if (v === 'bank') return 'bank'
  if (v === 'insurer') return 'insurer'
  return null
}

async function main() {
  const source = parseSource()
  console.log(`Fetching participants from ${source}`)

  let participants
  try {
    participants = await getJson(source, 60000)
  } catch (err) {
    throw new Error(`Failed to fetch participants from ${source}: ${err.message}`)
  }
  if (!Array.isArray(participants)) {
    throw new Error('Participants response is not a JSON array')
  }

  // Flatten to one row per Active authorisation server of an Active organisation.
  const servers = []
  for (const org of participants) {
    if (!org || typeof org !== 'object') continue
    if (org.Status !== 'Active') continue
    for (const s of org.AuthorisationServers || []) {
      if (!s || s.Status !== 'Active') continue
      if (!s.OpenIDDiscoveryDocument) continue
      servers.push({
        organisationId: org.OrganisationId,
        organisationName: org.OrganisationName,
        legalEntityName: org.LegalEntityName,
        sector: sectorFromLfiType(org.Flags?.lfi_type),
        authorisationServerId: s.AuthorisationServerId,
        customerFriendlyName: s.CustomerFriendlyName,
        customerFriendlyDescription: s.CustomerFriendlyDescription || null,
        logoUri: s.CustomerFriendlyLogoUri || null,
        issuer: s.Issuer,
        discoveryUri: s.OpenIDDiscoveryDocument,
        lfiCode: lfiCodeFromIssuer(s.Issuer || s.OpenIDDiscoveryDocument),
        accountTypes: Array.isArray(s.Flags?.AccountType) ? s.Flags.AccountType : [],
        apiFamilies: [...new Set((s.ApiResources || [])
          .filter(r => r?.Status === 'Active' && typeof r.ApiFamilyType === 'string')
          .map(r => r.ApiFamilyType))].sort(),
      })
    }
  }

  if (servers.length === 0) {
    throw new Error('No Active authorisation servers found — refusing to write.')
  }
  console.log(`Resolving ${servers.length} discovery documents…`)

  const resolved = await Promise.all(servers.map(async (s) => {
    try {
      const doc = await getJson(s.discoveryUri, DISCOVERY_TIMEOUT_MS)
      const ae = doc?.authorization_endpoint
      if (typeof ae !== 'string' || !ae) {
        return { ...s, error: 'discovery document has no authorization_endpoint' }
      }
      return {
        ...s,
        authorizationEndpoint: ae,
        parEndpoint: typeof doc.pushed_authorization_request_endpoint === 'string'
          ? doc.pushed_authorization_request_endpoint
          : null,
        tokenEndpoint: typeof doc.token_endpoint === 'string' ? doc.token_endpoint : null,
      }
    } catch (err) {
      return { ...s, error: err.name === 'AbortError' ? `timed out after ${DISCOVERY_TIMEOUT_MS}ms` : err.message }
    }
  }))

  const failures = resolved.filter(r => r.error)
  if (failures.length) {
    console.error(`Discovery resolution failed for ${failures.length} of ${resolved.length} server(s):`)
    for (const f of failures) {
      console.error(`  - ${f.organisationName} / ${f.customerFriendlyName}: ${f.error}`)
      console.error(`    ${f.discoveryUri}`)
    }
    throw new Error('One or more discovery documents could not be resolved — refusing to write.')
  }

  // Probe the two deep-link verification files once per unique origin (several
  // servers can share one host), then attach the result to every server on it.
  const origins = [...new Set(resolved.map((r) => originOf(r.authorizationEndpoint)).filter(Boolean))]
  console.log(`Probing deep-link verification files for ${origins.length} origins…`)

  const byOrigin = new Map()
  await Promise.all(origins.map(async (origin) => {
    byOrigin.set(origin, await probeOrigin(origin))
  }))

  for (const r of resolved) {
    const origin = originOf(r.authorizationEndpoint)
    r.verification = (origin && byOrigin.get(origin)) || null
  }

  const failing = [...byOrigin.values()].filter(
    (v) => v.android.verdict === 'fail' || v.ios.verdict === 'fail',
  ).length
  const warning = [...byOrigin.values()].filter(
    (v) => v.android.verdict === 'warn' || v.ios.verdict === 'warn',
  ).length
  console.log(`  verification: ${origins.length} origins probed — ${failing} failing, ${warning} with warnings`)

  resolved.sort((a, b) =>
    a.organisationName.localeCompare(b.organisationName) ||
    String(a.customerFriendlyName).localeCompare(String(b.customerFriendlyName)))

  const payload = {
    source,
    servers: resolved,
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n')

  const orgs = new Set(resolved.map(r => r.organisationId)).size
  console.log(`✓ Wrote ${resolved.length} authorisation servers across ${orgs} organisations to ${OUT_PATH}`)
}

main().catch(err => {
  console.error('fetch-auth-endpoints failed:', err.message)
  process.exit(1)
})
