// Catches drift between the endpoint-pricing registry and the concrete TPP
// ReDoc-backed endpoint pages.
//
// Each entry in src/data/endpoint-pricing.ts has a `docPath` like
// `tech/tpp-standards/v2.1/consent/open-api/par`, which corresponds to a
// `.vue` page at `src/pages/<docPath>.vue` that embeds a `<RedocWrapper>`.
//
// Two-way parity:
//   1. Every pricing entry's docPath must resolve to a real .vue page.
//   2. Every .vue page under `tpp-standards/.../open-api/` containing
//      `<RedocWrapper` must have a matching pricing entry.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const TPP_ROOT = resolve(PAGES, 'tech', 'tpp-standards')
const PRICING_FILE = resolve(ROOT, 'src', 'data', 'endpoint-pricing.ts')

let ENDPOINT_PRICING
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { ENDPOINT_PRICING } from ${JSON.stringify(PRICING_FILE)}
  `)
  ENDPOINT_PRICING = a.mod.ENDPOINT_PRICING
  dispose = a.dispose
})

after(() => dispose?.())

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

// Every ReDoc-backed endpoint page lives under an `open-api/` folder in the
// TPP standards tree. Find them by structure rather than content so adding a
// new endpoint page automatically extends the contract.
function discoverRedocPages() {
  const pages = []
  for (const file of walk(TPP_ROOT)) {
    if (!file.endsWith('.vue')) continue
    const segments = relative(TPP_ROOT, file).split(sep)
    if (!segments.includes('open-api')) continue
    const src = readFileSync(file, 'utf-8')
    if (!/<RedocWrapper\b/.test(src)) continue
    const docPath = relative(PAGES, file).replace(/\\/g, '/').replace(/\.vue$/, '')
    pages.push({ file, docPath })
  }
  return pages
}

describe('chargeable endpoints — coverage', () => {
  it('finds at least one ReDoc-backed TPP endpoint page', () => {
    const discovered = discoverRedocPages()
    assert.ok(
      discovered.length > 0,
      `No ReDoc pages discovered under ${TPP_ROOT}. Did the directory structure change?`,
    )
  })

  it('every pricing entry maps to a real .vue page', () => {
    const missing = []
    for (const e of ENDPOINT_PRICING) {
      const file = resolve(PAGES, e.docPath + '.vue')
      if (!existsSync(file)) {
        missing.push(`${e.method} ${e.path} → ${e.docPath}`)
      }
    }
    assert.deepStrictEqual(
      missing,
      [],
      `Pricing entries with no .vue page in src/pages/:\n` +
      missing.map(m => '  - ' + m).join('\n'),
    )
  })

  it('every ReDoc-backed TPP page has a pricing entry', () => {
    const discovered = discoverRedocPages()
    const mapped = new Set(ENDPOINT_PRICING.map(e => e.docPath))
    const missing = discovered
      .map(p => p.docPath)
      .filter(p => !mapped.has(p))

    assert.deepStrictEqual(
      missing,
      [],
      `ReDoc pages with no entry in src/data/endpoint-pricing.ts:\n` +
      missing.map(m => '  - ' + m).join('\n'),
    )
  })
})
