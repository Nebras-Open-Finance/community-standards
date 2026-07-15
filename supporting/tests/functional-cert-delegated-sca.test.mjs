// Guards the Delegated SCA Functional Certification config against drift.
//
// Delegated SCA is the IsDelegatedAuthentication overlay on a payment consent: the
// TPP manages the ControlParameters (empty ConsentSchedule), so — unlike the six
// Multi-Payment types — there are no control-parameter scenarios. The LFI instead
// evidences its payment limit, Creditor / Risk handling, and one consent per
// beneficiary model (Single, Multiple, Open). This test asserts:
//   1. The config imports cleanly and is coherent (delegated-sca area, LFI role,
//      DelegatedSCA payment type, three beneficiary models keyed single/multiple/
//      open).
//   2. Each beneficiary's reference PII is valid JSON with the right Initiation
//      .Creditor cardinality — one entry (single), 2–10 (multiple), omitted (open)
//      — and every fixed creditor uses the IBAN scheme.
//   3. The Multiple and Open models advertise a Trust Framework flag; Single does
//      not (it is the default model).

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

let area
let dispose

before(async () => {
  const a = await bundleAndImport(
    `export { delegatedScaArea } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'delegated-sca.ts'),
    )}`,
  )
  area = a.mod.delegatedScaArea
  dispose = a.dispose
})

after(() => dispose?.())

describe('Functional Certification — Delegated SCA config', () => {
  it('imports and is internally coherent', () => {
    assert.equal(area?.kind, 'delegated-sca', 'not a delegated-sca area')
    assert.equal(area.key, 'delegated-sca', 'wrong key')
    assert.equal(area.role, 'lfi', 'wrong role')
    assert.equal(area.paymentType, 'DelegatedSCA', 'wrong payment type')
    assert.ok(Array.isArray(area.segments) && area.segments.length > 0, 'no segments')
    assert.ok(area.docHref && area.creditorDocHref && area.sandboxEvidenceHref, 'missing doc hrefs')
    // No control-parameter scenarios — that is the point of Delegated SCA.
    assert.ok(!('scenarios' in area), 'delegated SCA must not carry control-parameter scenarios')
  })

  it('carries the three beneficiary models (single, multiple, open)', () => {
    assert.ok(Array.isArray(area.beneficiaries), 'expected beneficiaries')
    const models = Object.fromEntries(area.beneficiaries.map((m) => [m.key, m]))
    assert.deepEqual(Object.keys(models).sort(), ['multiple', 'open', 'single'], 'expected single + multiple + open')
    for (const m of area.beneficiaries) {
      assert.ok(m.label && m.description && m.referencePii, `${m.key}: missing label/description/referencePii`)
    }
  })

  it('each beneficiary reference PII has the right Initiation.Creditor cardinality', () => {
    const models = Object.fromEntries(area.beneficiaries.map((m) => [m.key, m]))

    const singleCreditors = JSON.parse(models.single.referencePii)?.Initiation?.Creditor
    assert.ok(Array.isArray(singleCreditors) && singleCreditors.length === 1, 'single PII needs exactly one creditor')

    const multiCreditors = JSON.parse(models.multiple.referencePii)?.Initiation?.Creditor
    assert.ok(
      Array.isArray(multiCreditors) && multiCreditors.length >= 2 && multiCreditors.length <= 10,
      'multiple PII needs 2–10 creditors',
    )

    for (const c of [...singleCreditors, ...multiCreditors]) {
      assert.equal(c?.CreditorAccount?.SchemeName, 'IBAN', 'every fixed creditor must use the IBAN scheme')
      assert.ok(c?.CreditorAccount?.Identification, 'every fixed creditor must carry an IBAN')
    }

    const openPii = JSON.parse(models.open.referencePii)
    assert.equal(openPii?.Initiation?.Creditor, undefined, 'open reference PII must omit Initiation.Creditor')
  })

  it('Multiple and Open advertise a Trust Framework flag; Single does not', () => {
    const models = Object.fromEntries(area.beneficiaries.map((m) => [m.key, m]))
    assert.ok(!models.single.trustFrameworkFlag, 'single (default model) should not carry a Trust Framework flag')
    assert.ok(models.multiple.trustFrameworkFlag, 'multiple must advertise a Trust Framework flag')
    assert.ok(models.open.trustFrameworkFlag, 'open must advertise a Trust Framework flag')
  })
})
