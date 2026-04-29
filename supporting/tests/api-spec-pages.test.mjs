// Catches drift between the endpoint registry (src/data/endpoints/) and the
// machinery that renders endpoints to static HTML.
//
// The /tech/api-specs/* tree is rendered by a single dynamic catch-all
// (src/pages/tech/api-specs/[...slug].vue). vite-ssg only emits HTML for
// dynamic routes that ssgOptions.includedRoutes expands them into — and that
// expansion lives in src/data/ssg-paths.ts. So the failure modes worth
// guarding against are:
//
//   1. The catch-all .vue file is missing (renders 404 for every endpoint).
//   2. ssg-paths doesn't list the api-specs catch-all placeholder (every
//      endpoint silently disappears from the static build).
//   3. An endpoint's URL doesn't round-trip through getEndpointBySlug
//      (bug in endpointUrl / SURFACE_TO_URL / URL_TO_SURFACE / lookups).

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const ENDPOINTS_INDEX = resolve(ROOT, 'src', 'data', 'endpoints', 'index.ts')
const SSG_PATHS = resolve(ROOT, 'src', 'data', 'ssg-paths.ts')

let endpointsMod
let ssgMod
let dispose1
let dispose2

before(async () => {
  const a = await bundleAndImport(`
    export * from ${JSON.stringify(ENDPOINTS_INDEX)}
  `)
  endpointsMod = a.mod
  dispose1 = a.dispose

  const b = await bundleAndImport(`
    export { expandSsgPath } from ${JSON.stringify(SSG_PATHS)}
  `)
  ssgMod = b.mod
  dispose2 = b.dispose
})

after(() => {
  dispose1?.()
  dispose2?.()
})

describe('API-spec endpoint coverage', () => {
  it('the catch-all renderer page exists', () => {
    const file = resolve(PAGES, 'tech', 'api-specs', '[...slug].vue')
    assert.ok(existsSync(file), `Missing dynamic renderer at ${file}`)
  })

  it('endpoint registry is non-empty', () => {
    assert.ok(
      Array.isArray(endpointsMod.allEndpoints) && endpointsMod.allEndpoints.length > 0,
      'src/data/endpoints/index.ts must export a non-empty allEndpoints',
    )
  })

  it('ssg-paths expands the api-specs catch-all to one path per endpoint', () => {
    const expanded = ssgMod.expandSsgPath('/tech/api-specs/:slug(.+)')
    assert.ok(
      Array.isArray(expanded) && expanded.length > 0,
      'expandSsgPath should return an array of concrete paths for the api-specs placeholder',
    )

    const expandedSet = new Set(expanded)
    const missing = []
    for (const e of endpointsMod.allEndpoints) {
      const url = endpointsMod.endpointUrl(e)
      if (!expandedSet.has(url)) missing.push(url)
    }

    assert.deepStrictEqual(
      missing,
      [],
      `Endpoints not covered by ssg-paths expansion (would 404 in static build):\n` +
      missing.map(u => `  - ${u}`).join('\n'),
    )
  })

  it('every endpoint URL round-trips through getEndpointBySlug', () => {
    const failures = []
    for (const e of endpointsMod.allEndpoints) {
      const url = endpointsMod.endpointUrl(e)
      const tail = url.replace(/^\/tech\/api-specs\//, '')
      const resolved = endpointsMod.getEndpointBySlug(tail)
      if (!resolved) {
        failures.push({ url, reason: 'no match' })
      } else if (
        resolved.surface !== e.surface ||
        resolved.slug !== e.slug ||
        resolved.sectionSlug !== e.sectionSlug ||
        resolved.version !== e.version
      ) {
        failures.push({ url, reason: 'matched a different endpoint' })
      }
    }

    assert.deepStrictEqual(
      failures,
      [],
      `Endpoints whose URL doesn't round-trip:\n` +
      failures.map(f => `  - ${f.url} (${f.reason})`).join('\n'),
    )
  })
})
