// Fails when VersionDropdown would navigate to a dead page.
//
// VersionDropdown.selectVersion (docs/components/VersionDropdown.vue) does:
//   route.path.replace(`/${oldVersion}/`, `/${newVersion}/`)
//   router.go(newPath)
//
// So if the user is on a page whose path contains `/v2.1/` and picks v2.2 from
// the dropdown, they land at the v2.2-equivalent path. That path MUST exist or
// the dropdown produces a broken navigation.
//
// This test enforces version parity: every version-bearing .md page must have
// a counterpart at the equivalent path for every other entry in VERSIONS.
//
// Today (single version) the test is a no-op. It activates the moment a new
// version is added to docs/.vitepress/version.ts and fails with the exact
// dead paths the dropdown would produce.

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const VERSION_FILE = resolve(DOCS, '.vitepress', 'version.ts')

async function loadVersions() {
  const tmp = mkdtempSync(join(tmpdir(), 'vd-cov-'))
  const out = join(tmp, 'version.mjs')
  await build({
    entryPoints: [VERSION_FILE],
    outfile: out,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  })
  try {
    return await import(pathToFileURL(out).href)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

function walkMd(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (entry === '.vitepress' || entry === 'public' || entry === 'cache' || entry === 'dist') continue
      walkMd(full, acc)
    } else if (entry.endsWith('.md')) {
      acc.push(full)
    }
  }
  return acc
}

// docs/tech/foo/v2.1/bar/index.md  →  /tech/foo/v2.1/bar/
// docs/tech/foo/v2.1/bar.md        →  /tech/foo/v2.1/bar
function toRoutePath(absMd) {
  let rel = absMd.slice(DOCS.length).replace(/\\/g, '/')
  if (rel.endsWith('/index.md')) return rel.slice(0, -'index.md'.length)
  return rel.slice(0, -'.md'.length)
}

// cleanUrls mapping (mirrors VitePress + orphan-pages.test.mjs):
//   "/foo/bar/" → docs/foo/bar/index.md
//   "/foo/bar"  → docs/foo/bar.md, fallback docs/foo/bar/index.md
function resolveSitePath(routePath) {
  const trailing = routePath.endsWith('/')
  const bare = routePath.replace(/^\//, '').replace(/\/$/, '')
  if (!bare) {
    const home = join(DOCS, 'index.md')
    return existsSync(home) ? home : null
  }
  const candidates = trailing
    ? [join(DOCS, bare, 'index.md')]
    : [join(DOCS, bare + '.md'), join(DOCS, bare, 'index.md')]
  for (const c of candidates) if (existsSync(c)) return c
  return null
}

describe('VersionDropdown navigation never lands on a dead page', () => {
  let VERSIONS
  let allMd

  before(async () => {
    ({ VERSIONS } = await loadVersions())
    allMd = walkMd(DOCS)
  })

  it('VERSIONS loads and contains at least the current version', () => {
    assert.ok(Array.isArray(VERSIONS) && VERSIONS.length >= 1,
      'docs/.vitepress/version.ts must export a non-empty VERSIONS array')
  })

  it('every version-bearing page has a counterpart at every other version in VERSIONS', () => {
    if (VERSIONS.length < 2) return // dormant when only one version exists

    const failures = []
    for (const file of allMd) {
      const routePath = toRoutePath(file)
      const sourceVersion = VERSIONS.find(v => routePath.includes(`/${v}/`))
      if (!sourceVersion) continue

      for (const targetVersion of VERSIONS) {
        if (targetVersion === sourceVersion) continue
        const swapped = routePath.replace(`/${sourceVersion}/`, `/${targetVersion}/`)
        if (!resolveSitePath(swapped)) {
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
