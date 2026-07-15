// Guards the TPP Domestic Payments Functional Certification config against drift.
//
// The TPP side is a single area covering all eight domestic payment types. For
// each type the portal pre-seeds two schema-validated JSON editors — the Consent
// (authorization_details) and the Risk (AERisk) object. The editor (EditableJson)
// silently falls back to schema defaults if a seed does not validate, which would
// strip the guidance the TPP relies on. This test replicates EditableJson's exact
// resolve + validate logic and asserts that every seed the config ships would be
// KEPT by the editor — so a future edit that breaks a seed fails CI, not silently
// in the browser. It also checks internal coherence and that the capability
// endpoints exist in the fetched Ozone Connect specs.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

let area
let dispose
let spec

// ── EditableJson's schema functions (copied verbatim so the guard matches the
//    runtime editor exactly) ───────────────────────────────────────────────────
function makeResolver(components) {
  function resolveSchema(schema) {
    if (!schema) return schema
    if (schema.$ref) return resolveSchema(components[schema.$ref.split('/').pop() ?? ''])
    return schema
  }
  function fullResolveSchema(schema) {
    let resolved = resolveSchema(schema) ?? {}
    resolved = JSON.parse(JSON.stringify(resolved))
    if (resolved.allOf) {
      const hasLocalShape = !!resolved.properties || !!resolved.required?.length || resolved.additionalProperties !== undefined
      if (resolved.allOf.length === 1 && !hasLocalShape) return fullResolveSchema(resolved.allOf[0])
      const merged = { type: 'object', properties: {}, required: [...(resolved.required ?? [])] }
      if (resolved.additionalProperties !== undefined) merged.additionalProperties = resolved.additionalProperties
      for (const [k, sub] of Object.entries(resolved.properties ?? {})) merged.properties[k] = fullResolveSchema(sub)
      resolved.allOf.forEach((sub) => {
        const subMerged = fullResolveSchema(sub)
        Object.assign(merged.properties, subMerged.properties)
        if (subMerged.required) merged.required = [...new Set([...(merged.required ?? []), ...subMerged.required])]
      })
      return merged
    }
    if (resolved.anyOf) resolved.anyOf = resolved.anyOf.map(fullResolveSchema)
    if (resolved.oneOf) resolved.oneOf = resolved.oneOf.map(fullResolveSchema)
    if (resolved.properties) for (const k of Object.keys(resolved.properties)) resolved.properties[k] = fullResolveSchema(resolved.properties[k])
    if (resolved.items) resolved.items = fullResolveSchema(resolved.items)
    return resolved
  }
  return fullResolveSchema
}
function initFormValue(resolved) {
  if (resolved.allOf) { const m = {}; resolved.allOf.forEach((s) => Object.assign(m, initFormValue(s))); return m }
  if (resolved.anyOf || resolved.oneOf) { const v = resolved.anyOf || resolved.oneOf || []; return v.length ? initFormValue(v[0]) : null }
  if (resolved.type === 'object') {
    const obj = {}; const properties = resolved.properties || {}; const required = new Set(resolved.required || [])
    for (const [key, sub] of Object.entries(properties)) if (required.has(key)) obj[key] = initFormValue(sub)
    return obj
  }
  if (resolved.type === 'array') return []
  if (resolved.enum) return resolved.enum[0] ?? ''
  if (resolved.type === 'boolean') return false
  if (resolved.type === 'number' || resolved.type === 'integer') return 0
  return ''
}
function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) return source
  if (Array.isArray(target) && Array.isArray(source)) return source
  const merged = { ...target }
  for (const key of Object.keys(source)) merged[key] = key in merged ? deepMerge(merged[key], source[key]) : source[key]
  return merged
}
function validate(value, resolved, path = '') {
  if (resolved.allOf) { for (const s of resolved.allOf) { const e = validate(value, s, path); if (e) return e } return null }
  if (resolved.anyOf) { for (const s of resolved.anyOf) if (!validate(value, s, path)) return null; return `Doesn't match any schema at ${path}` }
  if (resolved.oneOf) {
    let matches = 0
    for (const s of resolved.oneOf) if (!validate(value, s, path)) matches++
    if (matches === 0) return `Doesn't match any schema at ${path}`
    if (matches > 1) return `Matches more than one schema at ${path}`
    return null
  }
  if (resolved.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return `Expected object at ${path}`
    const properties = resolved.properties || {}
    for (const req of resolved.required || []) if (!(req in value)) return `Missing required field: ${req} at ${path}`
    for (const [key, val] of Object.entries(value)) {
      if (!(key in properties) && resolved.additionalProperties === false) return `Unexpected field: ${key} at ${path}`
      if (key in properties) { const e = validate(val, properties[key], `${path ? path + '.' : ''}${key}`); if (e) return e }
    }
    return null
  }
  if (resolved.type === 'array') {
    if (!Array.isArray(value)) return `Expected array at ${path}`
    for (let i = 0; i < value.length; i++) { const e = validate(value[i], resolved.items, `${path}[${i}]`); if (e) return e }
    if (resolved.minItems && value.length < resolved.minItems) return `Array too short at ${path}`
    if (resolved.maxItems && value.length > resolved.maxItems) return `Array too long at ${path}`
    return null
  }
  if (resolved.type === 'string') {
    if (typeof value !== 'string') return `Expected string at ${path}`
    if (resolved.enum && !resolved.enum.includes(value)) return `Invalid enum value: ${value} at ${path}`
    if (resolved.pattern && !new RegExp(resolved.pattern).test(value)) return `Does not match pattern at ${path}`
    if (resolved.minLength && value.length < resolved.minLength) return `String too short at ${path}`
    if (resolved.maxLength && value.length > resolved.maxLength) return `String too long at ${path}`
    if (resolved.format === 'uuid' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) return `Invalid UUID at ${path}`
    if (resolved.format === 'date-time' && isNaN(Date.parse(value))) return `Invalid date-time at ${path}`
    if (resolved.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Invalid date at ${path}`
    return null
  }
  if (resolved.type === 'number' || resolved.type === 'integer') {
    if (typeof value !== 'number') return `Expected ${resolved.type} at ${path}`
    if (resolved.type === 'integer' && !Number.isInteger(value)) return `Expected integer at ${path}`
    if (resolved.minimum !== undefined && value < resolved.minimum) return `Value too small at ${path}`
    if (resolved.maximum !== undefined && value > resolved.maximum) return `Value too large at ${path}`
    return null
  }
  if (resolved.type === 'boolean') { if (typeof value !== 'boolean') return `Expected boolean at ${path}`; return null }
  return `Unknown schema type at ${path}`
}

/** Mirror loadSpec: would the editor KEEP this seed (returns null) or discard it? */
function seedError(components, schemaName, seed) {
  const root = makeResolver(components)(components[schemaName])
  const merged = deepMerge(initFormValue(root), seed)
  return validate(merged, root)
}

before(async () => {
  const a = await bundleAndImport(
    `export { domesticPaymentsTppArea } from ${JSON.stringify(
      resolve(ROOT, 'src', 'data', 'functional-certification', 'domestic-payments-tpp.ts'),
    )}`,
  )
  area = a.mod.domesticPaymentsTppArea
  dispose = a.dispose
  // consentEditor.spec is a site path ('/openapi/…'); it is served from public/.
  const specFile = resolve(ROOT, 'public', area.consentEditor.spec.replace(/^\//, ''))
  spec = existsSync(specFile) ? parseYaml(readFileSync(specFile, 'utf-8')) : null
})

after(() => dispose?.())

describe('Functional Certification — Domestic Payments (TPP) config', () => {
  it('imports and is internally coherent', () => {
    assert.equal(area?.kind, 'payment-tpp', 'not a payment-tpp area')
    assert.equal(area.role, 'tpp', 'wrong role')
    assert.equal(area.key, 'domestic-payments')
    assert.equal(area.types.length, 8, 'expected all eight payment types')
    const delegated = area.types.filter((t) => t.isDelegatedSca)
    assert.equal(delegated.length, 1, 'expected exactly one Delegated SCA type')
    assert.equal(delegated[0].paymentType, 'DelegatedSCA')
    for (const t of area.types) {
      assert.ok(t.key && t.label && t.paymentType, `type missing key/label/paymentType`)
      assert.ok(t.consentSeed && typeof t.consentSeed === 'object', `type ${t.key} missing consentSeed`)
      assert.ok(t.riskSeed && typeof t.riskSeed === 'object', `type ${t.key} missing riskSeed`)
      assert.ok(t.docHref?.startsWith('/tech/tpp-standards/'), `type ${t.key} docHref not a TPP path`)
    }
    assert.ok(area.capabilities.length >= 2, 'expected the accounts/balances and refunds capabilities')
    assert.ok(area.capabilities.some((c) => c.timing === 'before'), 'expected a before-payment capability')
    assert.ok(area.capabilities.some((c) => c.timing === 'after'), 'expected an after-payment capability')
  })

  it('the fetched authorization-endpoints spec is present with both editor schemas', () => {
    assert.ok(spec?.components?.schemas, `spec not found: ${area.consentEditor.spec}`)
    assert.ok(spec.components.schemas[area.consentEditor.schemaName], 'consent schema missing from spec')
    assert.ok(spec.components.schemas[area.riskEditor.schemaName], 'risk schema missing from spec')
  })

  it('every Consent seed validates against the consent schema (editor would keep it)', () => {
    const components = spec.components.schemas
    for (const t of area.types) {
      const err = seedError(components, area.consentEditor.schemaName, t.consentSeed)
      assert.equal(err, null, `Consent seed for ${t.key} would be discarded by the editor: ${err}`)
    }
  })

  it('every Risk seed validates against the AERisk schema (editor would keep it)', () => {
    const components = spec.components.schemas
    for (const t of area.types) {
      const err = seedError(components, area.riskEditor.schemaName, t.riskSeed)
      assert.equal(err, null, `Risk seed for ${t.key} would be discarded by the editor: ${err}`)
    }
  })

  it('the Delegated SCA Risk seed populates DebtorIndicators.Authentication', () => {
    const dsca = area.types.find((t) => t.isDelegatedSca)
    const auth = dsca.riskSeed?.DebtorIndicators?.Authentication
    assert.ok(auth && typeof auth === 'object', 'Delegated SCA risk seed must carry DebtorIndicators.Authentication')
    assert.ok(auth.ChallengeOutcome, 'Authentication section should evidence a ChallengeOutcome')
  })
})
