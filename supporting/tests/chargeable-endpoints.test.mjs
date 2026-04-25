import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ENDPOINT_PRICING } from '../../docs/components/WebPages/data/endpointPricing.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const TPP_ROOT = resolve(DOCS, 'tech', 'tpp-standards')

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

// Every ReDoc-backed endpoint page lives under an `open-api/` folder in the
// TPP standards tree. Find them by structure rather than content so that
// adding a new endpoint page automatically extends the contract.
function discoverRedocPages() {
  const pages = []
  for (const file of walk(TPP_ROOT)) {
    if (!file.endsWith('.md')) continue
    const segments = relative(TPP_ROOT, file).split(sep)
    if (!segments.includes('open-api')) continue
    const src = readFileSync(file, 'utf-8')
    if (!/<RedocWrapper\b/.test(src)) continue
    const docPath = relative(DOCS, file).replace(/\\/g, '/').replace(/\.md$/, '')
    pages.push({ file, docPath })
  }
  return pages
}

const discovered = discoverRedocPages()
const discoveredKeys = new Set(discovered.map(p => p.docPath))
const mappedKeys = new Set(ENDPOINT_PRICING.map(e => e.docPath))

describe('chargeable endpoints — coverage', () => {
  it('finds at least one ReDoc-backed TPP endpoint page', () => {
    assert.ok(
      discovered.length > 0,
      `No ReDoc pages discovered under ${TPP_ROOT}. Did the directory structure change?`,
    )
  })

  it('every ReDoc-backed TPP endpoint has a chargeability mapping', () => {
    const missing = [...discoveredKeys].filter(k => !mappedKeys.has(k)).sort()
    assert.equal(
      missing.length,
      0,
      `New TPP endpoint pages are missing from endpointPricing.mjs. ` +
        `Add an entry for each, marking chargeable: true|false:\n  ` +
        missing.map(k => `- ${k}`).join('\n  '),
    )
  })

  it('every chargeability entry points to an existing endpoint page', () => {
    const stale = [...mappedKeys].filter(k => !discoveredKeys.has(k)).sort()
    assert.equal(
      stale.length,
      0,
      `endpointPricing.mjs has entries that no longer match a ReDoc page. ` +
        `Either restore the page or remove the entry:\n  ` +
        stale.map(k => `- ${k}`).join('\n  '),
    )
  })
})

describe('chargeable endpoints — entry shape', () => {
  for (const entry of ENDPOINT_PRICING) {
    describe(entry.docPath, () => {
      it('has the required string fields', () => {
        for (const field of ['docPath', 'method', 'path', 'family', 'title']) {
          assert.equal(
            typeof entry[field],
            'string',
            `Field "${field}" must be a string on ${entry.docPath}`,
          )
          assert.ok(entry[field].length > 0, `Field "${field}" must be non-empty on ${entry.docPath}`)
        }
      })

      it('has a boolean chargeable flag', () => {
        assert.equal(
          typeof entry.chargeable,
          'boolean',
          `chargeable must be a boolean on ${entry.docPath}`,
        )
      })

      it('uses an HTTP method known to the TPP standards', () => {
        assert.ok(
          ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(entry.method),
          `Unexpected method "${entry.method}" on ${entry.docPath}`,
        )
      })

      it('only sets discountable on chargeable endpoints', () => {
        if (entry.discountable) {
          assert.equal(
            entry.chargeable,
            true,
            `discountable: true requires chargeable: true on ${entry.docPath}`,
          )
        }
      })

      it('points to an existing endpoint page', () => {
        const file = resolve(DOCS, `${entry.docPath}.md`)
        assert.ok(existsSync(file), `Endpoint page does not exist: ${file}`)
      })
    })
  }
})
