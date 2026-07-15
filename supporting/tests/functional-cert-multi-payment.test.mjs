// Guards the Multi-Payment Functional Certification configs against drift.
//
// Each of the six multi-payment areas is consent-focused: it evidences two
// pre-production consents (all optional control parameters set, and only the
// required minimum). This test asserts:
//   1. Each config imports cleanly and is coherent (payment area, LFI role, two
//      scenarios keyed all-set / optional-not-set).
//   2. Each area's paymentType is a real `Type` enum value in the standards Bank
//      Service Initiation spec — so the portal can never name a payment type the
//      published API does not define.
//   3. Each scenario's example ControlParameters is valid JSON whose
//      ConsentSchedule.MultiPayment.PeriodicSchedule.Type matches the area, and
//      the all-set example is a strict superset of the optional-not-set example
//      (it carries the cumulative caps the minimal one omits).

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const SPEC_FILE = resolve(ROOT, 'public/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml')

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

let areas
let dispose
let specTypeValues

before(async () => {
  const a = await bundleAndImport(
    `export { multiPaymentAreas } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'multi-payments.ts'),
    )}`,
  )
  areas = a.mod.multiPaymentAreas
  dispose = a.dispose
  const spec = existsSync(SPEC_FILE) ? parseYaml(readFileSync(SPEC_FILE, 'utf-8')) : null
  // The set of every single-value `Type` enum used by the RAR payment-type schemas.
  specTypeValues = new Set(
    collectEnums(spec)
      .filter((e) => e.length === 1)
      .map((e) => e[0]),
  )
})

after(() => dispose?.())

describe('Functional Certification — Multi-Payment configs', () => {
  it('there are six coherent multi-payment areas', () => {
    assert.equal(areas.length, 6, 'expected six multi-payment areas')
    for (const area of areas) {
      assert.equal(area.kind, 'multi-payment', `${area.key}: wrong kind`)
      assert.equal(area.role, 'lfi', `${area.key}: wrong role`)
      assert.ok(area.paymentType, `${area.key}: no paymentType`)
      const keys = area.scenarios.map((s) => s.key).sort()
      assert.deepEqual(keys, ['all-set', 'optional-not-set'], `${area.key}: wrong scenarios`)
    }
  })

  it('only Variable On-Demand carries beneficiary-model evidence (Multiple + Open)', () => {
    for (const area of areas) {
      const isVod = area.key === 'variable-on-demand'
      if (!isVod) {
        assert.ok(!area.beneficiaryModels, `${area.key}: only Variable On-Demand should carry beneficiary models`)
        continue
      }
      assert.ok(Array.isArray(area.beneficiaryModels), 'variable-on-demand: expected beneficiaryModels')
      const models = Object.fromEntries(area.beneficiaryModels.map((m) => [m.key, m]))
      assert.deepEqual(Object.keys(models).sort(), ['multiple', 'open'], 'expected multiple + open models')
      assert.ok(area.creditorDocHref, 'variable-on-demand: expected creditorDocHref with beneficiary models')

      // Multiple: reference PII carries a 2–10 entry IBAN Creditor array, and the
      // portal collects that array. Open: Creditor omitted, array not collected.
      assert.equal(models.multiple.collectsCreditorArray, true, 'multiple must collect the creditor array')
      const multiPii = JSON.parse(models.multiple.referencePii)
      const creditors = multiPii?.Initiation?.Creditor
      assert.ok(Array.isArray(creditors) && creditors.length >= 2 && creditors.length <= 10, 'multiple PII needs 2–10 creditors')
      for (const c of creditors) {
        assert.equal(c?.CreditorAccount?.SchemeName, 'IBAN', 'every creditor must use the IBAN scheme')
        assert.ok(c?.CreditorAccount?.Identification, 'every creditor must carry an IBAN')
      }
      assert.equal(models.open.collectsCreditorArray, false, 'open must not collect a creditor array')
      const openPii = JSON.parse(models.open.referencePii)
      assert.equal(openPii?.Initiation?.Creditor, undefined, 'open reference PII must omit Initiation.Creditor')
    }
  })

  it('the standards Bank Service Initiation spec is present', () => {
    assert.ok(specTypeValues.size > 0, `spec not found or has no Type enums: ${SPEC_FILE}`)
  })

  it('each area paymentType is a real Type enum in the spec', () => {
    for (const area of areas) {
      assert.ok(
        specTypeValues.has(area.paymentType),
        `${area.key}: paymentType ${area.paymentType} is not a Type enum in the spec`,
      )
    }
  })

  it('each example is valid JSON with the right Type, and all-set ⊇ optional-not-set', () => {
    for (const area of areas) {
      const byKey = Object.fromEntries(area.scenarios.map((s) => [s.key, s]))
      const allSet = JSON.parse(byKey['all-set'].example)
      const minimal = JSON.parse(byKey['optional-not-set'].example)
      for (const [label, cp] of [['all-set', allSet], ['optional-not-set', minimal]]) {
        const sched = cp?.ConsentSchedule?.MultiPayment?.PeriodicSchedule
        assert.ok(sched, `${area.key} ${label}: no PeriodicSchedule`)
        assert.equal(sched.Type, area.paymentType, `${area.key} ${label}: Type mismatch`)
        assert.equal(cp.IsDelegatedAuthentication, false, `${area.key} ${label}: expected IsDelegatedAuthentication false`)
      }
      // The all-set consent must carry both cumulative caps.
      const mp = allSet.ConsentSchedule.MultiPayment
      assert.ok(
        mp.MaximumCumulativeValueOfPayments && mp.MaximumCumulativeNumberOfPayments != null,
        `${area.key}: all-set example must carry both cumulative caps`,
      )
      // The minimal consent always omits the (always-optional) value cap. The
      // Periodic Schedule types must KEEP MaximumCumulativeNumberOfPayments — the
      // API Hub mandates it for them (sandbox-confirmed); every other type omits it.
      const minMp = minimal.ConsentSchedule.MultiPayment
      assert.ok(
        minMp.MaximumCumulativeValueOfPayments == null,
        `${area.key}: optional-not-set example must omit MaximumCumulativeValueOfPayments`,
      )
      if (area.paymentType.endsWith('PeriodicSchedule')) {
        assert.ok(
          minMp.MaximumCumulativeNumberOfPayments != null,
          `${area.key}: periodic minimal must keep the Hub-mandated MaximumCumulativeNumberOfPayments`,
        )
      } else {
        assert.ok(
          minMp.MaximumCumulativeNumberOfPayments == null,
          `${area.key}: non-periodic minimal must omit MaximumCumulativeNumberOfPayments`,
        )
      }
    }
  })
})
