// Guards the Single Instant Payment Functional Certification config against drift.
//
// Payments certification is per payment type and scenario-shaped: the LFI
// declares the rails it supports and evidences each rail's terminal status, the
// AANI timing and a rejection, the Creditor/Risk handling, and two consent-shape
// scenarios. This test asserts:
//   1. The config imports cleanly and is internally coherent (payment area, LFI
//      role, rails carry a terminal status, exactly one rail is timed = AANI).
//   2. The resource-server endpoints the config names (POST /payments, GET
//      /payments/{PaymentId}, GET /payment-consents/{ConsentId}/refund) exist,
//      with those methods, in the fetched Ozone Connect Bank Service Initiation
//      spec — so the portal can never point LFIs at an endpoint the published API
//      does not define.
//   3. Every rail terminal status the config uses is a value in the spec's
//      payment status enum.

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
  'public/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml',
)

const norm = (p) => p.replace(/\{[^}]+\}/g, (m) => m.toLowerCase())

// The terminal-status PATCH targets the Consent Manager Payment Log, a separate
// spec — only the resource-server endpoints are validated against the SI spec.
const isResourceServerPath = (p) => p.startsWith('/payments') || p.startsWith('/payment-consents')

/** Recursively collect every `enum` array found in a parsed spec object. */
function collectEnums(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectEnums(item, out)
  } else if (node && typeof node === 'object') {
    if (Array.isArray(node.enum)) out.push(node.enum)
    for (const v of Object.values(node)) collectEnums(v, out)
  }
  return out
}

let area
let dispose
let spec

before(async () => {
  const a = await bundleAndImport(
    `export { singleInstantPaymentArea } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'single-instant-payment.ts'),
    )}`,
  )
  area = a.mod.singleInstantPaymentArea
  dispose = a.dispose
  spec = existsSync(SPEC_FILE) ? parseYaml(readFileSync(SPEC_FILE, 'utf-8')) : null
})

after(() => dispose?.())

describe('Functional Certification — Single Instant Payment config', () => {
  it('imports and is internally coherent', () => {
    assert.equal(area?.kind, 'payment', 'not a payment area')
    assert.equal(area.role, 'lfi', 'wrong role')
    assert.equal(area.paymentType, 'SingleInstantPayment', 'wrong payment type')
    assert.ok(Array.isArray(area.segments) && area.segments.length > 0, 'no segments')
    assert.ok(Array.isArray(area.rails) && area.rails.length > 0, 'no rails')
    for (const r of area.rails) {
      assert.ok(r.key && r.label, `rail missing key/label`)
      assert.ok(r.terminalStatus, `rail ${r.key} missing terminal status`)
    }
    // Exactly one rail is timed, and it is AANI — the primary instant rail whose
    // POST→rail and POST→terminal delays are evidenced.
    const timed = area.rails.filter((r) => r.timed)
    assert.equal(timed.length, 1, 'expected exactly one timed rail')
    assert.equal(timed[0].key, 'aani', 'the timed rail must be AANI')
    assert.ok(Array.isArray(area.endpoints) && area.endpoints.length > 0, 'no endpoints')
    // Authorisation-screen scenarios: the debtor-at-TPP case plus the three
    // Confirmation of Payee outcomes, each with a stable key, label and guidance.
    assert.ok(
      Array.isArray(area.authScreenScenarios) && area.authScreenScenarios.length > 0,
      'no authScreenScenarios',
    )
    for (const s of area.authScreenScenarios) {
      assert.ok(s.key && s.label && s.guidance, `auth scenario missing key/label/guidance`)
    }
    const copScenarios = area.authScreenScenarios.filter((s) => s.indicator)
    for (const s of copScenarios) {
      assert.match(
        s.indicator,
        /^ConfirmationOfPayee\.(Yes|Partial|No)$/,
        `auth scenario ${s.key} has a non-standard CoP indicator ${s.indicator}`,
      )
    }
    assert.ok(
      area.authScreenScenarios.some((s) => s.key === 'debtor-tpp' && !s.indicator),
      'expected a debtor-tpp scenario with no CoP indicator',
    )
  })

  it('the fetched Ozone Connect Bank Service Initiation spec is present', () => {
    assert.ok(spec?.paths, `spec not found or has no paths: ${SPEC_FILE}`)
  })

  it('the resource-server endpoints the config names exist with those methods in the spec', () => {
    const rsEndpoints = area.endpoints.filter((e) => isResourceServerPath(e.path))
    assert.ok(rsEndpoints.length >= 3, 'expected at least the three resource-server endpoints')
    for (const e of rsEndpoints) {
      const specKey = Object.keys(spec.paths).find((k) => norm(k) === norm(e.path))
      assert.ok(specKey, `path ${e.path} not in spec`)
      assert.ok(
        spec.paths[specKey][e.method.toLowerCase()],
        `path ${e.path} has no ${e.method} operation in spec`,
      )
    }
  })

  it('the spec defines AECreditorReference (the reconciliation reference carried through AANI)', () => {
    // The AANI evidence asserts the CreditorReference received on POST /payments is
    // carried into the AANI submission to the receiving bank. Guard that the field
    // the portal names still exists in the spec and remains the Creditor-side
    // reconciliation reference — not transposed with DebtorReference.
    const schema = spec.components?.schemas?.AECreditorReference
    assert.ok(schema, 'AECreditorReference schema not found in spec')
    assert.match(
      schema.description ?? '',
      /Creditor/,
      'AECreditorReference no longer describes the Creditor-side reference',
    )
  })

  it('every rail terminal status is a value in the spec payment status enum', () => {
    // The payment status enum is the one that carries both Pending and the
    // AANI terminal status; find it among all enums in the spec.
    const statusEnum = collectEnums(spec).find(
      (e) => e.includes('Pending') && e.includes('AcceptedWithoutPosting'),
    )
    assert.ok(statusEnum, 'payment status enum not found in spec')
    for (const r of area.rails) {
      assert.ok(
        statusEnum.includes(r.terminalStatus),
        `rail ${r.key} terminal status ${r.terminalStatus} not in spec status enum`,
      )
    }
  })
})
