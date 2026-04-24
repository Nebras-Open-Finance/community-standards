import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, relative, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const PUBLIC = resolve(DOCS, 'public')
const TECH_ROOTS = [
  resolve(DOCS, 'tech', 'lfi-api-hub'),
  resolve(DOCS, 'tech', 'tpp-standards'),
]

// ─── File discovery ──────────────────────────────────────────────────────────

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, out)
    else if (s.isFile() && entry === 'user-journeys.md') out.push(p)
  }
  return out
}

// Recursively inline `<!--@include: ... -->` directives so EditableJson tags
// and their <script setup> that live in _shared/ files are visible on the
// page that embeds them.
function readWithIncludes(file, seen = new Set()) {
  if (seen.has(file)) return ''
  seen.add(file)
  if (!existsSync(file)) return ''
  const src = readFileSync(file, 'utf-8')
  return src.replace(/<!--\s*@include:\s*([^\s-][^\s]*?)\s*-->/g, (_, inc) => {
    const included = resolve(dirname(file), inc)
    return readWithIncludes(included, seen)
  })
}

// ─── EditableJson extraction ─────────────────────────────────────────────────

function extractEditableJsonBlocks(src) {
  // Handle both self-closing `<EditableJson .../>` and paired `<EditableJson ...></EditableJson>`.
  const re = /<EditableJson\b([\s\S]*?)(?:\/>|>\s*<\/EditableJson>)/g
  const out = []
  let m
  while ((m = re.exec(src)) !== null) {
    const attrs = m[1]
    out.push({
      raw: m[0],
      spec: readAttr(attrs, 'spec'),
      schemaName: readAttr(attrs, 'schemaName'),
      initialDataRef: readAttr(attrs, 'initialData', true),
      customValidatorRef: readAttr(attrs, 'customValidator', true),
      excludedFieldsExpr: readAttr(attrs, 'excludedFields', true),
    })
  }
  return out
}

function readAttr(attrs, name, isBinding = false) {
  const prefix = isBinding ? ':' : ''
  const re = new RegExp(`(?:^|\\s)${prefix}${name}\\s*=\\s*"([^"]*)"`)
  const m = attrs.match(re)
  return m ? m[1] : null
}

function parseExcludedFields(expr) {
  if (!expr) return []
  // Attribute value is a JS array literal like ['a.b', 'c']. Normalise to JSON.
  const json = expr.replace(/'/g, '"')
  try {
    return JSON.parse(json)
  } catch {
    return []
  }
}

// ─── <script setup> evaluation ───────────────────────────────────────────────

function extractScriptSetup(src) {
  const m = src.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/)
  return m ? m[1] : ''
}

// Stubs + real helpers available to every script. Composable imports are
// stripped from the script source, and the symbols below replace them.
const SANDBOX_PRELUDE = `
function ref(v) { return v }
function computed(fn) { return typeof fn === 'function' ? fn() : fn }
function watch() {}
function watchEffect() {}

function futureDateOnly(daysAhead) {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + daysAhead)
  return d.toISOString().slice(0, 10)
}
function futureDateTime(daysAhead) {
  return futureDateOnly(daysAhead) + 'T23:59:59.000Z'
}
function generateScheduleDates(count, startInDays, stepDays) {
  count = count == null ? 12 : count
  startInDays = startInDays == null ? 10 : startInDays
  stepDays = stepDays == null ? 28 : stepDays
  return Array.from({ length: count }, (_, i) => futureDateOnly(startInDays + i * stepDays))
}

function useSharedState() {
  const sharedState = { value: {} }
  const consentData = { value: {} }
  return {
    sharedState,
    consentData,
    updateField: function () {},
    initializeState: function () {},
  }
}
`

// Extract just the `purposeCodes = { ... }` object literal from aaniPaymentCodes.ts
// so we can evaluate customValidators that check `purposeCodes[code]` without
// pulling the whole TypeScript file through a parser.
function loadPurposeCodes() {
  const p = resolve(DOCS, 'components', 'Composables', 'aaniPaymentCodes.ts')
  const src = readFileSync(p, 'utf-8')
  const m = src.match(/export\s+const\s+purposeCodes\s*=\s*(\{[\s\S]*?\n\})/)
  if (!m) return {}
  const ctx = vm.createContext({})
  vm.runInContext(`globalThis.__codes = ${m[1]}`, ctx)
  return ctx.__codes
}
const purposeCodes = loadPurposeCodes()

function evalScriptSetup(scriptSrc, captureNames) {
  // Strip every `import ... from ...` line so the vm doesn't choke on real
  // module specifiers (Vue, composables, @components/* alias).
  const stripped = scriptSrc.replace(/^\s*import\s[\s\S]+?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
  const captures = captureNames
    .filter(Boolean)
    .map(n => `${n}: (typeof ${n} !== 'undefined') ? ${n} : undefined`)
    .join(', ')
  const code =
    SANDBOX_PRELUDE +
    '\n' +
    stripped +
    `\n;globalThis.__result = { ${captures} };`
  const ctx = vm.createContext({
    console,
    Date,
    Math,
    Array,
    Object,
    JSON,
    String,
    Number,
    Boolean,
    Proxy,
    Symbol,
    Map,
    Set,
    Error,
    Promise,
    RegExp,
    purposeCodes,
  })
  vm.runInContext(code, ctx, { timeout: 5000 })
  return ctx.__result || {}
}

// ─── Schema resolution (ported from EditableJson.vue) ────────────────────────

function resolveRef(schema, spec, seen) {
  if (!schema) return schema
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    if (seen.has(refName)) return {} // cycle — fall back to permissive schema
    seen.add(refName)
    const target = spec?.components?.schemas?.[refName]
    return resolveRef(target, spec, seen)
  }
  return schema
}

function fullResolveSchema(schema, spec, seen = new Set()) {
  let resolved = resolveRef(schema, spec, seen)
  if (!resolved || typeof resolved !== 'object') return resolved
  resolved = JSON.parse(JSON.stringify(resolved))

  if (resolved.allOf) {
    const merged = { type: 'object', properties: {}, required: [] }
    if (resolved.description) merged.description = resolved.description
    for (const sub of resolved.allOf) {
      const r = fullResolveSchema(sub, spec, new Set(seen))
      Object.assign(merged.properties, r.properties || {})
      if (r.required) merged.required = [...new Set([...merged.required, ...r.required])]
    }
    return merged
  }

  if (resolved.anyOf) resolved.anyOf = resolved.anyOf.map(s => fullResolveSchema(s, spec, new Set(seen)))
  if (resolved.oneOf) resolved.oneOf = resolved.oneOf.map(s => fullResolveSchema(s, spec, new Set(seen)))

  if (resolved.properties) {
    for (const key of Object.keys(resolved.properties)) {
      resolved.properties[key] = fullResolveSchema(resolved.properties[key], spec, new Set(seen))
    }
  }
  if (resolved.items) resolved.items = fullResolveSchema(resolved.items, spec, new Set(seen))

  return resolved
}

function removeProperties(schema, paths) {
  for (const pathStr of paths || []) {
    const parts = pathStr.split('.')
    let cur = schema
    for (let i = 0; i < parts.length - 1; i++) {
      if (cur?.type !== 'object' || !cur.properties) return
      cur = cur.properties[parts[i]]
    }
    if (cur?.type === 'object' && cur.properties) {
      const last = parts[parts.length - 1]
      delete cur.properties[last]
      if (cur.required) cur.required = cur.required.filter(r => r !== last)
    }
  }
}

function initFormValue(schema) {
  if (!schema) return ''
  if (schema.allOf) {
    const out = {}
    for (const s of schema.allOf) Object.assign(out, initFormValue(s))
    return out
  }
  if (schema.anyOf || schema.oneOf) {
    const v = schema.anyOf || schema.oneOf
    return v.length ? initFormValue(v[0]) : null
  }
  if (schema.type === 'object') {
    const out = {}
    const required = new Set(schema.required || [])
    for (const [k, s] of Object.entries(schema.properties || {})) {
      if (required.has(k)) out[k] = initFormValue(s)
    }
    return out
  }
  if (schema.type === 'array') return []
  if (schema.enum) return schema.enum[0] ?? ''
  if (schema.type === 'boolean') return false
  if (schema.type === 'number' || schema.type === 'integer') return 0
  return ''
}

function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) return source
  if (Array.isArray(target) && Array.isArray(source)) return source
  const out = { ...target }
  for (const k of Object.keys(source)) {
    out[k] = k in out ? deepMerge(out[k], source[k]) : source[k]
  }
  return out
}

function validateAgainstSchema(value, schema, path = '') {
  if (!schema) return null

  if (schema.allOf) {
    for (const s of schema.allOf) {
      const err = validateAgainstSchema(value, s, path)
      if (err) return err
    }
    return null
  }

  if (schema.anyOf) {
    const errs = []
    for (const s of schema.anyOf) {
      const err = validateAgainstSchema(value, s, path)
      if (!err) return null
      errs.push(err)
    }
    return `Doesn't match any schema at ${path || '(root)'}: ${errs.join(' | ')}`
  }

  if (schema.oneOf) {
    let matches = 0
    for (const s of schema.oneOf) {
      if (!validateAgainstSchema(value, s, path)) matches++
    }
    if (matches === 0) return `Doesn't match any schema at ${path || '(root)'}`
    if (matches > 1) return `Matches more than one schema at ${path || '(root)'}`
    return null
  }

  if (schema.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return `Expected object at ${path || '(root)'}`
    const props = schema.properties || {}
    for (const req of schema.required || []) {
      if (!(req in value)) return `Missing required field: ${req} at ${path || '(root)'}`
    }
    for (const [k, v] of Object.entries(value)) {
      if (!(k in props) && schema.additionalProperties === false) return `Unexpected field: ${k} at ${path || '(root)'}`
      if (k in props) {
        const err = validateAgainstSchema(v, props[k], `${path ? path + '.' : ''}${k}`)
        if (err) return err
      }
    }
    return null
  }

  if (schema.type === 'array') {
    if (!Array.isArray(value)) return `Expected array at ${path}`
    for (let i = 0; i < value.length; i++) {
      const err = validateAgainstSchema(value[i], schema.items, `${path}[${i}]`)
      if (err) return err
    }
    if (schema.minItems && value.length < schema.minItems) return `Array too short (min ${schema.minItems}) at ${path}`
    if (schema.maxItems && value.length > schema.maxItems) return `Array too long (max ${schema.maxItems}) at ${path}`
    return null
  }

  if (schema.type === 'string') {
    if (typeof value !== 'string') return `Expected string at ${path}`
    if (schema.enum && !schema.enum.includes(value)) return `Invalid enum value '${value}' at ${path}`
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) return `Does not match pattern ${schema.pattern} at ${path}`
    if (schema.minLength && value.length < schema.minLength) return `String too short (min ${schema.minLength}) at ${path}`
    if (schema.maxLength && value.length > schema.maxLength) return `String too long (max ${schema.maxLength}) at ${path}`
    if (schema.format === 'uuid') {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
        return `Invalid UUID format at ${path}`
      }
    } else if (schema.format === 'date-time') {
      if (isNaN(Date.parse(value))) return `Invalid date-time format at ${path}`
    } else if (schema.format === 'date') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || isNaN(Date.parse(value + 'T00:00:00Z'))) {
        return `Invalid date format at ${path}`
      }
    }
    return null
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    if (typeof value !== 'number') return `Expected ${schema.type} at ${path}`
    if (schema.type === 'integer' && !Number.isInteger(value)) return `Expected integer at ${path}`
    if (schema.minimum != null && value < schema.minimum) return `Value too small (min ${schema.minimum}) at ${path}`
    if (schema.maximum != null && value > schema.maximum) return `Value too large (max ${schema.maximum}) at ${path}`
    return null
  }

  if (schema.type === 'boolean') {
    if (typeof value !== 'boolean') return `Expected boolean at ${path}`
    return null
  }

  return null
}

// ─── Date-field rendering check ──────────────────────────────────────────────

// Walks data alongside schema; returns error messages for any value at a
// `format: date` or `format: date-time` path that would render "Invalid Date"
// via the consent/auth-page formatDate helpers (i.e. new Date(v) produces NaN).
function collectDateFormatErrors(value, schema, path = '', errors = []) {
  if (!schema || value === undefined || value === null) return errors

  if (schema.allOf) {
    for (const s of schema.allOf) collectDateFormatErrors(value, s, path, errors)
    return errors
  }
  if (schema.anyOf || schema.oneOf) {
    const variants = schema.anyOf || schema.oneOf
    // Pick the first variant that validates, matching how EditableJson renders.
    const match = variants.find(s => !validateAgainstSchema(value, s, path)) || variants[0]
    collectDateFormatErrors(value, match, path, errors)
    return errors
  }

  if (schema.type === 'object' && typeof value === 'object' && value !== null) {
    for (const [k, v] of Object.entries(value)) {
      const sub = schema.properties?.[k]
      if (sub) collectDateFormatErrors(v, sub, `${path ? path + '.' : ''}${k}`, errors)
    }
    return errors
  }

  if (schema.type === 'array' && Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      collectDateFormatErrors(value[i], schema.items, `${path}[${i}]`, errors)
    }
    return errors
  }

  if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
    if (typeof value !== 'string' || isNaN(new Date(value).getTime())) {
      errors.push(`${path}: value ${JSON.stringify(value)} is not a parseable ${schema.format} (formatDate would render "Invalid Date")`)
    }
  }
  return errors
}

// ─── Spec loading ────────────────────────────────────────────────────────────

const specCache = new Map()
function loadSpec(specAttr) {
  if (!specAttr?.startsWith('/')) return { error: `Bad spec path: ${specAttr}` }
  const file = join(PUBLIC, specAttr.replace(/^\//, ''))
  if (!specCache.has(file)) {
    if (!existsSync(file)) {
      specCache.set(file, { error: `Spec file not found: ${file}` })
    } else {
      try {
        specCache.set(file, { spec: parseYaml(readFileSync(file, 'utf-8')), file })
      } catch (e) {
        specCache.set(file, { error: `YAML parse error in ${file}: ${e.message}` })
      }
    }
  }
  return specCache.get(file)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

const pages = TECH_ROOTS.flatMap(r => walk(r)).sort()

describe('user-journey EditableJson initial data', () => {
  assert.ok(pages.length > 0, `No user-journeys.md pages found under ${TECH_ROOTS.join(', ')}`)

  for (const page of pages) {
    const rel = relative(ROOT, page).replace(/\\/g, '/')
    const src = readWithIncludes(page)
    const blocks = extractEditableJsonBlocks(src)
    if (blocks.length === 0) continue

    const script = extractScriptSetup(src)

    describe(rel, () => {
      // Evaluate the script once per page — every block on the page shares the
      // same <script setup>, and a single vm run is enough to surface every
      // referenced initialData / customValidator.
      const captureNames = new Set()
      for (const b of blocks) {
        if (b.initialDataRef) captureNames.add(b.initialDataRef)
        if (b.customValidatorRef) captureNames.add(b.customValidatorRef)
      }

      let captured = {}
      let scriptError = null
      try {
        captured = evalScriptSetup(script, [...captureNames])
      } catch (e) {
        scriptError = e
      }

      it('script setup evaluates without error', () => {
        assert.ok(!scriptError, `Script evaluation failed: ${scriptError?.stack || scriptError?.message}`)
      })

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        const label = `block #${i + 1} (${block.schemaName || 'unknown schema'})`

        describe(label, () => {
          const { spec, error: specError } = loadSpec(block.spec)
          const rawSchema = spec?.components?.schemas?.[block.schemaName]

          it('spec loads and the schemaName exists', () => {
            assert.ok(!specError, specError)
            assert.ok(spec, `Spec did not load for ${block.spec}`)
            assert.ok(
              rawSchema,
              `Schema "${block.schemaName}" not found in ${block.spec}`,
            )
          })

          if (!spec || !rawSchema) return

          const resolvedSchema = fullResolveSchema(rawSchema, spec)
          removeProperties(resolvedSchema, parseExcludedFields(block.excludedFieldsExpr))

          const initialData = block.initialDataRef ? captured[block.initialDataRef] : undefined
          const customValidator = block.customValidatorRef ? captured[block.customValidatorRef] : null

          it(`initialData ref "${block.initialDataRef}" resolved from script`, () => {
            assert.ok(block.initialDataRef, 'EditableJson missing :initialData binding')
            assert.ok(
              initialData && typeof initialData === 'object',
              `initialData ref "${block.initialDataRef}" was not captured from <script setup>`,
            )
          })

          if (!initialData || typeof initialData !== 'object') return

          const merged = deepMerge(initFormValue(resolvedSchema), initialData)

          it('initialData validates against the OpenAPI schema', () => {
            const err = validateAgainstSchema(merged, resolvedSchema)
            assert.equal(err, null, `Schema validation failed: ${err}`)
          })

          if (block.customValidatorRef) {
            it(`customValidator "${block.customValidatorRef}" returns null`, () => {
              assert.equal(
                typeof customValidator,
                'function',
                `customValidator "${block.customValidatorRef}" was not captured from <script setup>`,
              )
              const result = customValidator(merged)
              assert.equal(result, null, `customValidator returned: ${result}`)
            })
          }

          it('all date/date-time fields render cleanly via formatDate', () => {
            const errs = collectDateFormatErrors(merged, resolvedSchema)
            assert.equal(
              errs.length,
              0,
              `Date fields would render as "Invalid Date":\n  - ${errs.join('\n  - ')}`,
            )
          })
        })
      }
    })
  }
})
