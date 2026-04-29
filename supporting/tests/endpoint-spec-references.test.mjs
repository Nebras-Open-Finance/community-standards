// Catches drift between the endpoint registry and the OpenAPI specs it
// references. Today, when an endpoint's `redoc.spec` / `redoc.filterPath` /
// `redoc.filterMethod` / `redoc.filterSchema` doesn't match the upstream
// spec, the ReDoc pane just renders an empty viewer — nothing in the build
// errors. The drift slips into the deploy.
//
// We assert, for each entry in src/data/endpoints/:
//   1. `redoc.spec` resolves to a fetched OpenAPI YAML under public/.
//   2. If `redoc.filterPath` is set, `paths[filterPath]` exists in the spec.
//   3. If `redoc.filterMethod` is set, `paths[filterPath][filterMethod]` exists.
//   4. If `redoc.filterSchema` is set, `components.schemas[filterSchema]` exists.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PUBLIC = resolve(ROOT, 'public')
const ENDPOINTS_INDEX = resolve(ROOT, 'src', 'data', 'endpoints', 'index.ts')

let allEndpoints
let endpointUrl
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { allEndpoints, endpointUrl } from ${JSON.stringify(ENDPOINTS_INDEX)}
  `)
  allEndpoints = a.mod.allEndpoints
  endpointUrl = a.mod.endpointUrl
  dispose = a.dispose
})

after(() => dispose?.())

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

describe('Endpoint registry — OpenAPI spec references', () => {
  it('endpoint registry is non-empty', () => {
    assert.ok(
      Array.isArray(allEndpoints) && allEndpoints.length > 0,
      'src/data/endpoints/index.ts must export a non-empty allEndpoints',
    )
  })

  it('every endpoint.redoc.spec resolves to a fetched OpenAPI file', () => {
    const broken = []
    for (const e of allEndpoints) {
      const url = endpointUrl(e)
      if (!loadSpec(e.redoc.spec)) {
        broken.push(`${url} → ${e.redoc.spec} (file not found under public/)`)
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `Broken spec references in endpoint registry:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })

  it('every endpoint.redoc.filterPath exists in its spec', () => {
    const broken = []
    for (const e of allEndpoints) {
      if (!e.redoc.filterPath) continue
      const doc = loadSpec(e.redoc.spec)
      if (!doc) continue // already reported above
      if (!doc?.paths?.[e.redoc.filterPath]) {
        broken.push(`${endpointUrl(e)} → ${e.redoc.spec} has no paths['${e.redoc.filterPath}']`)
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `Endpoint filterPath values that don't match any path in their spec:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })

  it('every endpoint.redoc.filterMethod exists at filterPath in its spec', () => {
    const broken = []
    for (const e of allEndpoints) {
      if (!e.redoc.filterMethod || !e.redoc.filterPath) continue
      const doc = loadSpec(e.redoc.spec)
      if (!doc) continue
      const path = doc?.paths?.[e.redoc.filterPath]
      if (!path) continue // already reported above
      const method = e.redoc.filterMethod.toLowerCase()
      if (!path[method]) {
        broken.push(
          `${endpointUrl(e)} → ${e.redoc.spec} paths['${e.redoc.filterPath}'] has no '${method}' operation`,
        )
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `Endpoint filterMethod values that don't match any operation in their spec:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })

  it('every endpoint.redoc.filterSchema resolves to components.schemas in its spec', () => {
    const broken = []
    for (const e of allEndpoints) {
      if (!e.redoc.filterSchema) continue
      const doc = loadSpec(e.redoc.spec)
      if (!doc) continue
      if (!doc?.components?.schemas?.[e.redoc.filterSchema]) {
        broken.push(
          `${endpointUrl(e)} → ${e.redoc.spec} has no components.schemas.${e.redoc.filterSchema}`,
        )
      }
    }
    assert.deepStrictEqual(
      broken,
      [],
      `Endpoint filterSchema values that don't match any schema in their spec:\n` +
      broken.map(b => '  - ' + b).join('\n'),
    )
  })
})
