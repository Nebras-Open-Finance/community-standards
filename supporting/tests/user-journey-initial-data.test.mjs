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
// NOTE: the original VitePress test also evaluated each form's `initialData`
// expression and asserted it satisfied the referenced schema. Recreating that
// for the Vue/TS/<script setup> world requires instantiating Vue's reactivity
// (the data lives behind `ref(...)`), so it's deferred — see todo.md §7.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

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
// for both. Returns { spec, schemaName } or null if either is missing.
function extractInvocations(src) {
  const re = /<EditableJson\b([\s\S]*?)(?:\/>|>\s*<\/EditableJson>)/g
  const out = []
  let m
  while ((m = re.exec(src)) !== null) {
    const attrs = m[1]
    const spec = readStaticAttr(attrs, 'spec')
    const schemaName = readStaticAttr(attrs, 'schema-name')
      ?? readStaticAttr(attrs, 'schemaName')
    out.push({ spec, schemaName, raw: m[0] })
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
