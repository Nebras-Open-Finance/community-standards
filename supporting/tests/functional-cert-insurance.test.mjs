// Guards the Insurance Data Sharing Functional Certification checklist against
// drift, mirroring functional-cert-endpoints.test.mjs for Bank Data Sharing.
//
// The checklist is derived from the endpoint registry and annotated with
// permissions + TPP-facing paths in
// src/data/functional-certification/insurance-data-sharing.ts. If the fetched
// Ozone Connect insurance spec gains or loses a policy-retrieval endpoint, this
// test fails until the config is reconciled — so the portal can never quietly
// present a checklist that disagrees with the published API.
//
// The insurance spec holds both Insurance Data Sharing (GET policies) and
// Insurance Quotation (POST policies, GET/PATCH quotes) operations, so the
// completeness guard is confined to GET operations on `*-insurance-policies`
// paths — the policy-retrieval surface this area certifies. The encrypted
// Premium field (ReadInsurancePremium / JWE) is certified separately and is out
// of scope here.
//
// We assert three things:
//   1. The config imports cleanly and every endpoint carries a permission
//      mapping (the config throws on an unannotated endpoint).
//   2. Every checklist endpoint exists as a GET operation in the fetched spec.
//   3. Every GET *-insurance-policies path in the spec is present on the
//      checklist (catches newly-added sectors/endpoints).

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const SPEC_FILE = resolve(
  ROOT,
  'public/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml',
)

// Normalise path params so registry `{InsurancePolicyId}` compares equal to spec
// `{insurancePolicyId}` — casing of the placeholder is cosmetic.
const norm = (p) => p.replace(/\{[^}]+\}/g, (m) => m.toLowerCase())

let area
let dispose
let spec

before(async () => {
  const a = await bundleAndImport(
    `export { insuranceDataSharingArea } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'insurance-data-sharing.ts'),
    )}`,
  )
  area = a.mod.insuranceDataSharingArea
  dispose = a.dispose
  spec = existsSync(SPEC_FILE) ? parseYaml(readFileSync(SPEC_FILE, 'utf-8')) : null
})

after(() => dispose?.())

describe('Functional Certification — Insurance Data Sharing endpoints', () => {
  it('config imports and every endpoint has a permission mapping', () => {
    assert.ok(area && Array.isArray(area.endpoints) && area.endpoints.length > 0, 'no endpoints derived')
    const missing = area.endpoints.filter((e) => !Array.isArray(e.permissions) || e.permissions.length === 0)
    assert.deepStrictEqual(
      missing.map((e) => e.ozonePath),
      [],
      'endpoints with no permission mapping',
    )
  })

  it('the fetched Ozone Connect insurance spec is present', () => {
    assert.ok(spec?.paths, `spec not found or has no paths: ${SPEC_FILE}`)
  })

  it('every checklist endpoint exists as a GET in the spec', () => {
    const specPaths = new Set(Object.keys(spec.paths).map(norm))
    const broken = []
    for (const e of area.endpoints) {
      const p = norm(e.ozonePath)
      if (!specPaths.has(p)) {
        broken.push(`${e.ozonePath} — path not in spec`)
      } else if (!spec.paths[Object.keys(spec.paths).find((k) => norm(k) === p)].get) {
        broken.push(`${e.ozonePath} — no GET operation in spec`)
      }
    }
    assert.deepStrictEqual(broken, [], `Checklist endpoints missing from the spec:\n  - ${broken.join('\n  - ')}`)
  })

  it('every GET policy list/by-id path in the spec is on the checklist', () => {
    const listed = new Set(area.endpoints.map((e) => norm(e.ozonePath)))
    // The policy-retrieval surface this area certifies: the collection and the
    // by-id policy, GET only. Deeper sub-resources gated by separate permissions
    // — `/…/payment-details` (ReadCustomerPaymentDetails) and the encrypted
    // Premium field (ReadInsurancePremium) — are certified separately and are not
    // modelled in the endpoint registry's insurance-data-sharing section, so they
    // are intentionally out of scope here. POST /…-insurance-policies (quotation →
    // create policy) and the /…-insurance-quotes operations are a different area.
    const IN_SCOPE = /^\/[a-z-]+-insurance-policies(\/\{insurancepolicyid\})?$/
    const missing = []
    for (const [rawPath, ops] of Object.entries(spec.paths)) {
      const p = norm(rawPath)
      if (!IN_SCOPE.test(p) || !ops.get) continue
      if (!listed.has(p)) missing.push(rawPath)
    }
    assert.deepStrictEqual(
      missing,
      [],
      `Spec has insurance-policy list/by-id GET endpoints not on the Functional Certification checklist ` +
        `(add the sector to INSURANCE_SECTORS in src/data/functional-certification/insurance-data-sharing.ts):\n  - ${missing.join('\n  - ')}`,
    )
  })
})
