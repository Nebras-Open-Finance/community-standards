// Guards the Confirmation of Payee Functional Certification config against drift.
//
// CoP is scenario-based, not endpoint-based: there is a single Ozone Connect
// endpoint (`POST /customers/action/cop-query`) and the API Hub computes the
// name-match verdict. This test asserts:
//   1. The config imports cleanly and is internally coherent (segments carry a
//      name type; outcomes carry a match indicator except not-found).
//   2. The single Ozone Connect endpoint the config names exists, with that
//      method, in the fetched Ozone Connect spec — so the portal can never point
//      LFIs at an endpoint the published API does not define.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
// The cop-query operation lives in the Bank Data Sharing Ozone Connect spec.
const SPEC_FILE = resolve(
  ROOT,
  'public/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml',
)

const norm = (p) => p.replace(/\{[^}]+\}/g, (m) => m.toLowerCase())

let area
let tppArea
let dispose
let spec

before(async () => {
  const a = await bundleAndImport(
    `export { confirmationOfPayeeArea } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'confirmation-of-payee.ts'),
    )}
     export { confirmationOfPayeeTppArea } from ${JSON.stringify(
       resolve(ROOT, 'src', 'data', 'functional-certification', 'confirmation-of-payee-tpp.ts'),
     )}`,
  )
  area = a.mod.confirmationOfPayeeArea
  tppArea = a.mod.confirmationOfPayeeTppArea
  dispose = a.dispose
  spec = existsSync(SPEC_FILE) ? parseYaml(readFileSync(SPEC_FILE, 'utf-8')) : null
})

after(() => dispose?.())

// Both the LFI and TPP areas share the FcCopArea shape and the same coherence
// rules; the only differences are role, outcome set, and the evidence flags.
function assertCoherent(a, role) {
  assert.equal(a?.kind, 'cop', `${role}: not a CoP area`)
  assert.equal(a.role, role, `${role}: wrong role`)
  assert.ok(Array.isArray(a.segments) && a.segments.length > 0, `${role}: no segments`)
  for (const s of a.segments) {
    assert.ok(['personal', 'business'].includes(s.nameType), `${role}: bad name type on ${s.key}`)
  }
  assert.ok(Array.isArray(a.outcomes) && a.outcomes.length > 0, `${role}: no outcomes`)
  for (const o of a.outcomes) {
    // Every outcome that returns a name must carry a match indicator; the
    // not-found outcome must not (the call returns 204 with no body).
    if (o.returnsName) assert.ok(o.indicator, `${role}: outcome ${o.key} returns a name but has no indicator`)
    else assert.equal(o.indicator, '', `${role}: not-found-style outcome ${o.key} should have no indicator`)
  }
  // The Testing Tool report and captured response name are LFI-only concerns.
  if (role === 'tpp') {
    assert.equal(a.requiresTestingTool, false, 'tpp: should not require a Testing Tool report')
    assert.equal(a.captureResponseName, false, 'tpp: should not capture a response name')
  }
}

describe('Functional Certification — Confirmation of Payee config', () => {
  it('both LFI and TPP configs import and are internally coherent', () => {
    assertCoherent(area, 'lfi')
    assertCoherent(tppArea, 'tpp')
  })

  it('the fetched Ozone Connect spec is present', () => {
    assert.ok(spec?.paths, `spec not found or has no paths: ${SPEC_FILE}`)
  })

  it('the cop-query endpoint the config names exists with that method in the spec', () => {
    const { method, path } = area.ozoneEndpoint
    const specKey = Object.keys(spec.paths).find((k) => norm(k) === norm(path))
    assert.ok(specKey, `cop-query path ${path} not in spec`)
    assert.ok(
      spec.paths[specKey][method.toLowerCase()],
      `cop-query path ${path} has no ${method} operation in spec`,
    )
  })
})
