// Draft specs are served from public/openapi-drafts/ for versions whose changes
// have not reached api-specs yet. Three things have to agree, and nothing in the
// build fails loudly when they don't:
//
//   src/data/openapi-drafts.ts        declares which specs a version drafts
//   scripts/build-openapi-drafts.mjs  patches the generated ones into existence
//   public/openapi-drafts/            holds the files the pages actually fetch
//
// A drift between them produces a Redoc viewer that renders nothing, or renders
// the previous version's document while claiming to be the draft — both of which
// look fine in CI and wrong to a reader.

import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const DRAFTS_DIR = join(ROOT, 'public', 'openapi-drafts')
const DRAFTS_FILE = join(ROOT, 'src', 'data', 'openapi-drafts.ts')
const ENDPOINTS_INDEX = join(ROOT, 'src', 'data', 'endpoints', 'index.ts')
const BUILD_SCRIPT = join(ROOT, 'scripts', 'build-openapi-drafts.mjs')

let bundle
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { DRAFT_SPECS, draftSpecUrl, resolveSpecUrl } from ${JSON.stringify(DRAFTS_FILE)}
    export { allEndpoints } from ${JSON.stringify(ENDPOINTS_INDEX)}
  `)
  bundle = a.mod
  dispose = a.dispose
})

after(async () => { await dispose?.() })

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function walkPages(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walkPages(full, acc)
    else if (/\.(vue|md)$/.test(name)) acc.push(full)
  }
  return acc
}

function eachDraftSpec() {
  const out = []
  for (const [version, specs] of Object.entries(bundle.DRAFT_SPECS)) {
    for (const spec of specs) out.push({ version, ...spec })
  }
  return out
}

describe('OpenAPI drafts', () => {
  test('DRAFT_SPECS is non-empty and well formed', () => {
    const specs = eachDraftSpec()
    assert.ok(specs.length > 0, 'DRAFT_SPECS is empty or failed to load')
    for (const s of specs) {
      assert.ok(s.name, `${s.version}: a draft spec has no name`)
      assert.ok(
        s.origin === 'hand-authored' || s.origin === 'generated',
        `${s.version}/${s.name}: unknown origin "${s.origin}"`,
      )
      assert.ok(s.reason, `${s.version}/${s.name}: no reason recorded`)
    }
  })

  test('every declared draft spec exists on disk and is parseable', () => {
    const failures = []
    for (const s of eachDraftSpec()) {
      const file = join(DRAFTS_DIR, s.version, `${s.name}.yaml`)
      if (!existsSync(file)) {
        const hint = s.origin === 'generated'
          ? 'run `node scripts/build-openapi-drafts.mjs`'
          : 'hand-authored — the file should be committed'
        failures.push(`${s.version}/${s.name}.yaml is missing (${hint})`)
        continue
      }
      try {
        const doc = parse(readFileSync(file, 'utf-8'))
        if (!doc?.paths || Object.keys(doc.paths).length === 0) {
          failures.push(`${s.version}/${s.name}.yaml has no paths`)
        }
      } catch (err) {
        failures.push(`${s.version}/${s.name}.yaml does not parse: ${err.message}`)
      }
    }
    assert.deepStrictEqual(failures, [], failures.join('\n'))
  })

  test('every generated draft spec has a patch in build-openapi-drafts.mjs', () => {
    const script = readFileSync(BUILD_SCRIPT, 'utf-8')
    const missing = eachDraftSpec()
      .filter((s) => s.origin === 'generated')
      .filter((s) => !script.includes(s.name))
      .map((s) => `${s.version}/${s.name} is declared 'generated' but has no patch`)
    assert.deepStrictEqual(missing, [], missing.join('\n'))
  })

  // The whole point of resolveSpecUrl is that a page and the API Specs
  // catalogue entry for the same endpoint fetch the same document.
  test('endpoint catalogue points drafted specs at the drafts folder', () => {
    const failures = []
    for (const e of bundle.allEndpoints) {
      const declared = (bundle.DRAFT_SPECS[e.version] ?? []).map((s) => s.name)
      const name = (e.redoc.spec.split('/').pop() ?? '').replace(/\.ya?ml$/i, '')
      const expected = declared.includes(name)
        ? bundle.draftSpecUrl(e.version, name)
        : null
      if (expected && e.redoc.spec !== expected) {
        failures.push(`${e.version} ${e.method} ${e.path}: spec is ${e.redoc.spec}, expected ${expected}`)
      }
    }
    assert.deepStrictEqual(failures, [], failures.join('\n'))
  })

  test('a spec that is not drafted is left on the fetched path', () => {
    const untouched = '/openapi/v2.2-draft/standards/uae-atm-openapi.yaml'
    assert.equal(bundle.resolveSpecUrl(untouched, 'v2.2-draft'), untouched)
  })

  // resolveSpecUrl only reaches the API Specs catalogue. The hand-written pages
  // under each version tree carry their spec URL as a literal attribute, and the
  // v2.2-draft tree was produced by rewriting `/openapi/v2.1/` to
  // `/openapi/v2.2-draft/` wholesale — which lands on the FETCHED copy. For a
  // drafted spec the fetched copy is the previous version's document, so the
  // page renders confidently and shows none of the change.
  test('no page fetches a drafted spec from the fetched tree', () => {
    const failures = []
    for (const file of walkPages(join(ROOT, 'src', 'pages'))) {
      const src = readFileSync(file, 'utf-8')
      for (const [version, specs] of Object.entries(bundle.DRAFT_SPECS)) {
        for (const spec of specs) {
          // Any depth of surface folder between the version and the basename.
          const wrong = new RegExp(`/openapi/${escapeRe(version)}/[^"'\\s]*${escapeRe(spec.name)}\\.ya?ml`)
          if (wrong.test(src)) {
            failures.push(
              `${relative(ROOT, file)}\n` +
              `    references ${spec.name} under /openapi/${version}/ (the fetched, unpatched copy)\n` +
              `    expected ${bundle.draftSpecUrl(version, spec.name)}`,
            )
          }
        }
      }
    }
    assert.deepStrictEqual(failures, [], `\n${failures.join('\n')}\n`)
  })
})
