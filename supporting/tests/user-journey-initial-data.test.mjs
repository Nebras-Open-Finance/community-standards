// Catches drift between user-journey forms and the OpenAPI specs they validate
// against.
//
// Each <EditableJson> invocation pairs an OpenAPI spec (`spec="..."`) with a
// schema name (`schema-name="..."`). At runtime the form validates user input
// against `components.schemas[schemaName]` from that spec. If the spec path or
// schema name drifts, every form click throws — but nothing in the build
// catches it. This test parses every <EditableJson> invocation under
// src/pages/ and asserts both ends resolve.
//
// It also evaluates each form's `:initial-data` ref and asserts the merged
// (defaults + initialData) value satisfies the schema — same pipeline the
// runtime runs in EditableJson.vue's `loadSpec`. This catches the case where
// a spec change silently invalidates a hand-coded example: the form would
// toast `Initial data invalid: …. Using defaults.` and render the wrong
// thing, with no build-time signal.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const PUBLIC = resolve(ROOT, 'public')

function walk(dir, filter, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, filter, acc)
    else if (filter.test(entry)) acc.push(full)
  }
  return acc
}

// Read attributes from an <EditableJson ... /> invocation. The Vue template
// hyphenates camelCase prop names (`schemaName` → `schema-name`), so we look
// for both. Static attrs read as their literal string; bound (`:foo="..."`)
// attrs read as their expression source. Either side may be null.
function extractInvocations(src) {
  const re = /<EditableJson\b([\s\S]*?)(?:\/>|>\s*<\/EditableJson>)/g
  const out = []
  let m
  while ((m = re.exec(src)) !== null) {
    const attrs = m[1]
    const spec = readStaticAttr(attrs, 'spec')
    const schemaName = readStaticAttr(attrs, 'schema-name')
      ?? readStaticAttr(attrs, 'schemaName')
    const initialDataExpr = readBoundAttr(attrs, 'initial-data')
      ?? readBoundAttr(attrs, 'initialData')
    const excludedFieldsExpr = readBoundAttr(attrs, 'excluded-fields')
      ?? readBoundAttr(attrs, 'excludedFields')
    out.push({ spec, schemaName, initialDataExpr, excludedFieldsExpr, raw: m[0] })
  }
  return out
}

// Reads only static (string-literal) attribute values. Bound (`:foo="expr"`)
// values can't be statically evaluated from a regex, so they read as null —
// we don't fail on them, just skip the assertion for that attribute.
function readStaticAttr(attrs, name) {
  const re = new RegExp(`(?<!\\:)\\s${name}\\s*=\\s*"([^"]*)"`)
  const m = attrs.match(re)
  return m ? m[1] : null
}

// Reads a `:foo="expr"` bound-attribute expression as a raw string. The
// expression itself is evaluated later via the bundle-and-import path.
function readBoundAttr(attrs, name) {
  const re = new RegExp(`\\s:${name}\\s*=\\s*"([^"]*)"`)
  const m = attrs.match(re)
  return m ? m[1] : null
}

// `spec` is a site-relative path like `/openapi/v2.1/standards/foo.yaml`.
// Resolve to the file under `public/` and parse it.
const specCache = new Map()
function loadSpec(specPath) {
  if (specCache.has(specPath)) return specCache.get(specPath)
  const file = resolve(PUBLIC, specPath.replace(/^\//, ''))
  if (!existsSync(file)) {
    specCache.set(specPath, null)
    return null
  }
  const doc = parseYaml(readFileSync(file, 'utf-8'))
  specCache.set(specPath, doc)
  return doc
}

describe('User-journey forms — schema references', () => {
  const pages = walk(PAGES, /^user-journeys\.(vue|md)$/)

  it('finds at least one <EditableJson> invocation', () => {
    let total = 0
    for (const file of pages) {
      total += extractInvocations(readFileSync(file, 'utf-8')).length
    }
    assert.ok(
      total > 0,
      `No <EditableJson> usages found under ${PAGES}. Did the user-journey pages move?`,
    )
  })

  it('every <EditableJson> spec= path resolves to a fetched OpenAPI file', () => {
    const broken = []
    for (const file of pages) {
      const rel = relative(PAGES, file).replace(/\\/g, '/')
      const invocations = extractInvocations(readFileSync(file, 'utf-8'))
      for (const inv of invocations) {
        if (!inv.spec) continue // bound value — skip
        const doc = loadSpec(inv.spec)
        if (!doc) broken.push(`${rel} → spec="${inv.spec}" (file not found under public/)`)
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `Broken spec references in user-journey pages:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })

  it('every <EditableJson> schema-name resolves to components.schemas in its spec', () => {
    const broken = []
    for (const file of pages) {
      const rel = relative(PAGES, file).replace(/\\/g, '/')
      const invocations = extractInvocations(readFileSync(file, 'utf-8'))
      for (const inv of invocations) {
        if (!inv.spec || !inv.schemaName) continue // bound value — skip
        const doc = loadSpec(inv.spec)
        if (!doc) continue // already reported by the spec test
        const schema = doc?.components?.schemas?.[inv.schemaName]
        if (!schema) {
          broken.push(`${rel} → ${inv.spec} has no components.schemas.${inv.schemaName}`)
        }
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `<EditableJson> schema-name values that don't match any schema in their spec:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })
})

// ─── initialData → schema validation ─────────────────────────────────────────
//
// The functions below mirror EditableJson.vue's `loadSpec` pipeline (lines
// 89-279 of src/components/common/editors/EditableJson.vue). Keep them in
// sync — if the runtime gets stricter (e.g. starts honouring `nullable` or
// `additionalProperties: SomeSchema`), update both sides.

function resolveSchema(schema, spec) {
  if (!schema) return schema
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() ?? ''
    return resolveSchema(spec?.components?.schemas?.[refName], spec)
  }
  return schema
}

function fullResolveSchema(schema, spec) {
  let resolved = resolveSchema(schema, spec) ?? {}
  resolved = JSON.parse(JSON.stringify(resolved))
  if (resolved.allOf) {
    const hasLocalShape =
      !!resolved.properties
      || !!(resolved.required && resolved.required.length)
      || resolved.additionalProperties !== undefined
    // A single-element `allOf` with no other constraints is equivalent to its
    // child schema. Important for primitive wrappers like
    // `IdentifierType: allOf: [$ref: …enum]` — flattening into an object would
    // mistype the field. Mirrors EditableJson.vue.
    if (resolved.allOf.length === 1 && !hasLocalShape) {
      return fullResolveSchema(resolved.allOf[0], spec)
    }
    // Otherwise treat `allOf` as composition: union the parent's local
    // properties/required with each child's. Preserve the parent's
    // `additionalProperties` so local restrictions still hold.
    const merged = {
      type: 'object',
      properties: {},
      required: [...(resolved.required || [])],
    }
    if (resolved.description) merged.description = resolved.description
    if (resolved.additionalProperties !== undefined) {
      merged.additionalProperties = resolved.additionalProperties
    }
    for (const [k, sub] of Object.entries(resolved.properties || {})) {
      merged.properties[k] = fullResolveSchema(sub, spec)
    }
    for (const sub of resolved.allOf) {
      const subMerged = fullResolveSchema(sub, spec)
      Object.assign(merged.properties, subMerged.properties || {})
      if (subMerged.required) {
        merged.required = [...new Set([...merged.required, ...subMerged.required])]
      }
    }
    return merged
  }
  if (resolved.anyOf) resolved.anyOf = resolved.anyOf.map(s => fullResolveSchema(s, spec))
  if (resolved.oneOf) resolved.oneOf = resolved.oneOf.map(s => fullResolveSchema(s, spec))
  if (resolved.properties) {
    for (const k of Object.keys(resolved.properties)) {
      resolved.properties[k] = fullResolveSchema(resolved.properties[k], spec)
    }
  }
  if (resolved.items) resolved.items = fullResolveSchema(resolved.items, spec)
  return resolved
}

function removeProperties(schema, paths, warnings) {
  for (const pathStr of paths) {
    const parts = pathStr.split('.')
    let current = schema
    let ok = true
    for (let i = 0; i < parts.length - 1; i++) {
      if (current.type !== 'object' || !current.properties) {
        warnings.push(`Cannot traverse non-object at ${parts.slice(0, i + 1).join('.')}`)
        ok = false
        break
      }
      const next = current.properties[parts[i]]
      if (!next) { ok = false; break }
      current = next
    }
    if (!ok) continue
    if (current.type !== 'object' || !current.properties) {
      warnings.push(`Cannot remove from non-object at ${pathStr}`)
      continue
    }
    const last = parts[parts.length - 1]
    delete current.properties[last]
    if (current.required) current.required = current.required.filter(r => r !== last)
  }
}

function initFormValue(schema) {
  const r = schema
  if (r.allOf) {
    const merged = {}
    for (const sub of r.allOf) Object.assign(merged, initFormValue(sub) ?? {})
    return merged
  }
  if (r.anyOf || r.oneOf) {
    const variants = r.anyOf || r.oneOf || []
    return variants.length ? initFormValue(variants[0]) : null
  }
  if (r.type === 'object') {
    const obj = {}
    const properties = r.properties || {}
    const required = new Set(r.required || [])
    for (const [key, sub] of Object.entries(properties)) {
      if (required.has(key)) obj[key] = initFormValue(sub)
    }
    return obj
  }
  if (r.type === 'array') return []
  if (r.enum) return r.enum[0] ?? ''
  if (r.type === 'boolean') return false
  if (r.type === 'number' || r.type === 'integer') return 0
  return ''
}

function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null
      || typeof source !== 'object' || source === null) return source
  if (Array.isArray(target) && Array.isArray(source)) return source
  const merged = { ...target }
  for (const key of Object.keys(source)) {
    const s = source[key]
    if (key in merged) merged[key] = deepMerge(merged[key], s)
    else merged[key] = s
  }
  return merged
}

function validateAgainstSchema(value, schema, path = '') {
  const r = schema
  if (r.allOf) {
    for (const sub of r.allOf) {
      const err = validateAgainstSchema(value, sub, path)
      if (err) return err
    }
    return null
  }
  if (r.anyOf) {
    for (const sub of r.anyOf) if (!validateAgainstSchema(value, sub, path)) return null
    return `Doesn't match any schema at ${path}`
  }
  if (r.oneOf) {
    let matches = 0
    for (const sub of r.oneOf) if (!validateAgainstSchema(value, sub, path)) matches++
    if (matches === 0) return `Doesn't match any schema at ${path}`
    if (matches > 1) return `Matches more than one schema at ${path}`
    return null
  }
  if (r.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return `Expected object at ${path}`
    }
    const properties = r.properties || {}
    for (const req of r.required || []) {
      if (!(req in value)) return `Missing required field: ${req} at ${path}`
    }
    for (const [key, val] of Object.entries(value)) {
      if (!(key in properties) && r.additionalProperties === false) {
        return `Unexpected field: ${key} at ${path}`
      }
      if (key in properties) {
        const err = validateAgainstSchema(val, properties[key], `${path ? path + '.' : ''}${key}`)
        if (err) return err
      }
    }
    return null
  }
  if (r.type === 'array') {
    if (!Array.isArray(value)) return `Expected array at ${path}`
    for (let i = 0; i < value.length; i++) {
      const err = validateAgainstSchema(value[i], r.items, `${path}[${i}]`)
      if (err) return err
    }
    if (r.minItems && value.length < r.minItems) return `Array too short at ${path}`
    if (r.maxItems && value.length > r.maxItems) return `Array too long at ${path}`
    return null
  }
  if (r.type === 'string') {
    if (typeof value !== 'string') return `Expected string at ${path}`
    if (r.enum && !r.enum.includes(value)) return `Invalid enum value: ${value} at ${path}`
    if (r.pattern && !new RegExp(r.pattern).test(value)) return `Does not match pattern at ${path}`
    if (r.minLength && value.length < r.minLength) return `String too short at ${path}`
    if (r.maxLength && value.length > r.maxLength) return `String too long at ${path}`
    if (r.format === 'uuid' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) return `Invalid UUID at ${path}`
    if (r.format === 'date-time' && isNaN(Date.parse(value))) return `Invalid date-time at ${path}`
    if (r.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Invalid date at ${path}`
    return null
  }
  if (r.type === 'number' || r.type === 'integer') {
    if (typeof value !== 'number') return `Expected ${r.type} at ${path}`
    if (r.type === 'integer' && !Number.isInteger(value)) return `Expected integer at ${path}`
    if (r.minimum !== undefined && value < r.minimum) return `Value too small at ${path}`
    if (r.maximum !== undefined && value > r.maximum) return `Value too large at ${path}`
    return null
  }
  if (r.type === 'boolean') {
    if (typeof value !== 'boolean') return `Expected boolean at ${path}`
    return null
  }
  return `Unknown schema type at ${path}`
}

// Vue APIs that unplugin-auto-import injects automatically — see
// vite.config.ts `AutoImport({ imports: ['vue'] })`. The list isn't
// exhaustive; we only need what user-journey scripts actually call.
const AUTO_VUE_IMPORTS = [
  'ref', 'computed', 'reactive', 'readonly', 'watch', 'watchEffect', 'watchPostEffect',
  'isRef', 'unref', 'toRef', 'toRefs', 'shallowRef', 'shallowReactive',
  'nextTick', 'onMounted', 'onUnmounted', 'onBeforeMount', 'onBeforeUnmount',
  'onUpdated', 'onBeforeUpdate', 'provide', 'inject', 'getCurrentInstance', 'h',
]

function existingVueBindings(script) {
  const found = new Set()
  const re = /import\s*(?:(\{[^}]*\}))\s*from\s*['"]vue['"]/g
  let m
  while ((m = re.exec(script)) !== null) {
    for (const part of m[1].slice(1, -1).split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop()
      if (name) found.add(name)
    }
  }
  return found
}

// Extract <script setup>, drop .vue imports (template-only), inject the Vue
// APIs that unplugin-auto-import would normally provide, and append
// `export { ... }` lines so we can pull each ref's value out after import.
// `.vue` imports in the script block come from sibling _shared/ partials —
// they're never referenced by name in the script itself, so stripping them
// is safe and avoids esbuild trying to load them.
function buildScriptModuleSource(file, initialDataNames, excludedFieldsExprs) {
  const src = readFileSync(file, 'utf-8')
  const m = src.match(/<script[^>]*\bsetup\b[^>]*>([\s\S]*?)<\/script>/)
  if (!m) return null
  let script = m[1]
  script = script.replace(/^[ \t]*import\s+[^\n]+from\s+['"][^'"]+\.vue['"][^\n]*\r?\n/gm, '')

  const already = existingVueBindings(script)
  const missing = AUTO_VUE_IMPORTS.filter(n => !already.has(n))
  const prelude = missing.length
    ? `import { ${missing.join(', ')} } from 'vue'\n`
    : ''

  const lines = []
  if (initialDataNames.length) lines.push(`export { ${initialDataNames.join(', ')} }`)
  excludedFieldsExprs.forEach((expr, i) => {
    if (expr) lines.push(`export const __excluded_${i} = ${expr}`)
  })
  return prelude + script + '\n' + lines.join('\n') + '\n'
}

function unwrapRef(v) {
  return v && typeof v === 'object' && 'value' in v ? v.value : v
}

describe('User-journey forms — initialData satisfies schema', () => {
  const pages = walk(PAGES, /^user-journeys\.(vue|md)$/)

  it('every <EditableJson> :initial-data merges and validates against the schema', async () => {
    const errors = []
    for (const file of pages) {
      const rel = relative(PAGES, file).replace(/\\/g, '/')
      const invocations = extractInvocations(readFileSync(file, 'utf-8'))
      const dataInvs = invocations.filter(inv =>
        inv.spec && inv.schemaName && inv.initialDataExpr
        && /^[a-zA-Z_$][\w$]*$/.test(inv.initialDataExpr),
      )
      if (!dataInvs.length) continue

      const names = [...new Set(dataInvs.map(inv => inv.initialDataExpr))]
      const excluded = dataInvs.map(inv => inv.excludedFieldsExpr)
      const moduleSrc = buildScriptModuleSource(file, names, excluded)
      if (!moduleSrc) continue

      let mod, dispose
      try {
        ({ mod, dispose } = await bundleAndImport(moduleSrc))
      } catch (err) {
        errors.push(`${rel} — failed to bundle <script setup>: ${err.message}`)
        continue
      }

      try {
        for (let i = 0; i < dataInvs.length; i++) {
          const inv = dataInvs[i]
          const spec = loadSpec(inv.spec)
          if (!spec) continue // already reported by the spec= test
          const schema = spec?.components?.schemas?.[inv.schemaName]
          if (!schema) continue // already reported by the schema-name test

          const initialData = unwrapRef(mod[inv.initialDataExpr])
          const excludedFields = inv.excludedFieldsExpr
            ? (unwrapRef(mod[`__excluded_${i}`]) ?? [])
            : []

          const resolved = fullResolveSchema(schema, spec)
          const removeWarnings = []
          removeProperties(resolved, excludedFields, removeWarnings)
          for (const w of removeWarnings) {
            errors.push(`${rel} → ${inv.initialDataExpr} excluded-fields: ${w}`)
          }

          const defaults = initFormValue(resolved)
          const merged = deepMerge(defaults, initialData)
          const error = validateAgainstSchema(merged, resolved)
          if (error) errors.push(`${rel} → ${inv.initialDataExpr}: ${error}`)
        }
      } finally {
        dispose?.()
      }
    }

    assert.deepStrictEqual(
      errors,
      [],
      `<EditableJson> :initial-data values that don't satisfy their schema:\n` +
      errors.map(e => '  - ' + e).join('\n'),
    )
  })
})
