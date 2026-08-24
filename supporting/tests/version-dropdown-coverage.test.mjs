// Fails when VersionDropdown would navigate to a dead page.
//
// VersionDropdown swaps the active version segment in the current route path
// (`/.../v2.1/...` → `/.../v2.2/...`) and pushes the result. That swapped path
// MUST resolve to a real page or the dropdown produces a broken navigation.
//
// This test enforces version parity: every version-bearing .vue page under
// src/pages/ must have a counterpart at the equivalent path for every
// other entry in VERSIONS.
//
// Today (single version) the test is a no-op. It activates the moment a new
// version is added to src/data/versions.ts and fails with the exact
// dead paths the dropdown would produce.

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const VERSIONS_FILE = resolve(ROOT, 'src', 'data', 'versions.ts')

// Cheap parser: VERSIONS is a const tuple of string literals — no need to
// boot a TS bundler just to read the array.
function parseVersions() {
  const src = readFileSync(VERSIONS_FILE, 'utf-8')
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from versions.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

// Pages that exist in some versions but not others, because the capability
// they document was introduced (or withdrawn) at a version boundary.
//
// Each entry is a route path with the version segment replaced by `{v}`, plus
// the versions it legitimately exists in. The dropdown must not offer these on
// a version that lacks them — gate the sidebar entry too (see
// DATA_DELETION_CONFIRMATION_VERSIONS in src/data/sidebars/tpp.ts).
//
// Add entries only with a reason. This is an escape hatch from version parity,
// not a place to park pages nobody mirrored.
// Data deletion confirmation (attestations) — introduced in v2.2 by OFP-005.
// `prefix: true` covers the whole subtree, including the per-endpoint Redoc
// pages under open-api/.
const ONLY_IN = [
  {
    pattern: '/tech/tpp-standards/{v}/consent/data-deletion-confirmation/',
    prefix: true,
    versions: ['v2.2-rc1'],
  },
]

function allowedMissing(routePath, targetVersion) {
  return ONLY_IN.some(({ pattern, prefix, versions }) => {
    const expected = pattern.replace('{v}', targetVersion)
    const hit = prefix ? routePath.startsWith(expected) : routePath === expected
    return hit && !versions.includes(targetVersion)
  })
}

function walkVue(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      walkVue(full, acc)
    } else if (entry.endsWith('.vue') || entry.endsWith('.md')) {
      acc.push(full)
    }
  }
  return acc
}

// Mirrors vite-plugin-pages defaults:
//   src/pages/foo/bar/index.vue  →  /foo/bar/
//   src/pages/foo/bar.vue        →  /foo/bar
function toRoutePath(absFile) {
  let rel = absFile.slice(PAGES.length).replace(/\\/g, '/')
  rel = rel.replace(/\.(vue|md)$/, '')
  if (rel.endsWith('/index')) return rel.slice(0, -'index'.length)
  return rel
}

function resolveSitePath(routePath) {
  const trailing = routePath.endsWith('/')
  const bare = routePath.replace(/^\//, '').replace(/\/$/, '')
  if (!bare) {
    for (const ext of ['.vue', '.md']) {
      const home = join(PAGES, 'index' + ext)
      if (existsSync(home)) return home
    }
    return null
  }
  const candidates = trailing
    ? ['index.vue', 'index.md'].map(f => join(PAGES, bare, f))
    : [
        join(PAGES, bare + '.vue'),
        join(PAGES, bare + '.md'),
        join(PAGES, bare, 'index.vue'),
        join(PAGES, bare, 'index.md'),
      ]
  for (const c of candidates) if (existsSync(c)) return c
  return null
}

describe('VersionDropdown navigation never lands on a dead page', () => {
  let VERSIONS
  let allFiles

  before(() => {
    VERSIONS = parseVersions()
    allFiles = walkVue(PAGES)
  })

  it('VERSIONS loads and contains at least the current version', () => {
    assert.ok(Array.isArray(VERSIONS) && VERSIONS.length >= 1,
      'src/data/versions.ts must export a non-empty VERSIONS array')
  })

  it('every version-bearing page has a counterpart at every other version in VERSIONS', () => {
    if (VERSIONS.length < 2) return // dormant when only one version exists

    const failures = []
    for (const file of allFiles) {
      const routePath = toRoutePath(file)
      const sourceVersion = VERSIONS.find(v => routePath.includes(`/${v}/`))
      if (!sourceVersion) continue

      for (const targetVersion of VERSIONS) {
        if (targetVersion === sourceVersion) continue
        const swapped = routePath.replace(`/${sourceVersion}/`, `/${targetVersion}/`)
        if (!resolveSitePath(swapped) && !allowedMissing(swapped, targetVersion)) {
          failures.push({ from: routePath, to: swapped, targetVersion })
        }
      }
    }

    assert.deepStrictEqual(
      failures,
      [],
      `Found ${failures.length} version-mirror gap(s) — VersionDropdown would land on a dead page:\n` +
      failures.map(f => `  ${f.from}  → pick ${f.targetVersion} → ${f.to}  (no page exists)`).join('\n'),
    )
  })
})
