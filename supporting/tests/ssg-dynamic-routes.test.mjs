// Catches the silent failure mode where a new dynamic route is added under
// `src/pages/` (e.g. a fresh `[id].vue`) without a matching `expandSsgPath`
// expander in `src/data/ssg-paths.ts`.
//
// Without an expander, vite-ssg's `includedRoutes` returns the literal
// placeholder (`/foo/:id`) which it can't materialise, so the route disappears
// from the static build. vue-router still resolves it at runtime (lychee
// reports it as fine), so the regression goes unnoticed until someone tries
// to share a deep link or hit it from a search engine.
//
// We assert: every dynamic-route file produces a placeholder for which an
// expander matches. An expander returning `[]` is acceptable — that's the
// explicit "skip" signal (e.g. the `[...notFound].vue` fallback).

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const SSG_PATHS = resolve(ROOT, 'src', 'data', 'ssg-paths.ts')

let expandSsgPath
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { expandSsgPath } from ${JSON.stringify(SSG_PATHS)}
  `)
  expandSsgPath = a.mod.expandSsgPath
  dispose = a.dispose
})

after(() => dispose?.())

function walkDynamic(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('_')) continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walkDynamic(full, acc)
    else if (/\.(vue|md)$/.test(entry) && /\[[^\]]+\]/.test(entry)) acc.push(full)
  }
  return acc
}

// Mirror vite-plugin-pages route generation:
//   [name].vue              →  :name
//   [...name].vue (nested)  →  :name(.+)        — must match ≥1 segment
//   [...name].vue (root)    →  :name(.*)*       — optional catch-all
function fileToPlaceholder(absFile) {
  const rel = relative(PAGES, absFile).replace(/\\/g, '/').replace(/\.(vue|md)$/, '')
  const segments = rel.split('/')
  const isTopLevel = segments.length === 1

  const transformed = segments.map((seg) => {
    if (seg.startsWith('[...') && seg.endsWith(']')) {
      const name = seg.slice(4, -1)
      return isTopLevel ? `:${name}(.*)*` : `:${name}(.+)`
    }
    if (seg.startsWith('[') && seg.endsWith(']')) {
      return ':' + seg.slice(1, -1)
    }
    return seg
  })

  return '/' + transformed.join('/')
}

function toRelPages(absFile) {
  return relative(PAGES, absFile).replace(/\\/g, '/')
}

describe('SSG dynamic-route coverage', () => {
  it('every dynamic-route file has a matching expandSsgPath expander', () => {
    const files = walkDynamic(PAGES)
    assert.ok(
      files.length > 0,
      `No dynamic-route files found under ${PAGES}. Did the layout change?`,
    )

    const missing = []
    for (const file of files) {
      const placeholder = fileToPlaceholder(file)
      const result = expandSsgPath(placeholder)
      // expandSsgPath returns the placeholder unchanged when no expander
      // matched. An array (even empty) means an expander handled it.
      if (!Array.isArray(result)) {
        missing.push({ file: toRelPages(file), placeholder })
      }
    }

    assert.deepStrictEqual(
      missing,
      [],
      `Found ${missing.length} dynamic-route file(s) with no matching expander in src/data/ssg-paths.ts.\n` +
      `Without one, vite-ssg drops the route from the static build:\n` +
      missing.map(m => `  - ${m.file}\n    placeholder: ${m.placeholder}`).join('\n'),
    )
  })
})
