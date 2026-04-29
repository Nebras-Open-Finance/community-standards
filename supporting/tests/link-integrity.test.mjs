// Catches dead static links in the three places where they live outside any
// individual page: sidebars, chrome (header / footer / layout), and the
// erratas registry's `affectedPaths`.
//
// The orphan-pages test treats sidebar/chrome links as REACHABILITY ROOTS —
// it assumes they work. So a sidebar typo (`/foo/bar/` → `/foo/baz/`) leaves
// the destination orphaned in the test output, not the sidebar entry flagged.
// lychee catches it post-build, but only after running the full vite-ssg
// build. This test is fast and runs without a build.
//
// Resolution rules:
//   - Static `.vue`/`.md` page paths resolve via `resolveSiteLink`.
//   - Paths under `/tech/api-specs/` may match the dynamic `[...slug].vue`
//     catch-all; we round-trip them through `getEndpointBySlug`.
//   - External (`http(s):`, `mailto:`, `tel:`) and asset (`.png`, etc.) links
//     are intentionally not validated here — that's lychee's job.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'
import { resolveSiteLink, ROOT_DIR } from './_helpers/resolve-site-link.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = ROOT_DIR
const SIDEBARS = resolve(ROOT, 'src', 'data', 'sidebars')
const VERSIONS_FILE = resolve(ROOT, 'src', 'data', 'versions.ts')
const ENDPOINTS_INDEX = resolve(ROOT, 'src', 'data', 'endpoints', 'index.ts')
const ERRATAS_FILE = resolve(ROOT, 'src', 'data', 'erratas-registry.ts')
const CHROME_FILES = [
  resolve(ROOT, 'src', 'components', 'chrome', 'PageHeader.vue'),
  resolve(ROOT, 'src', 'components', 'chrome', 'PageFooter.vue'),
  resolve(ROOT, 'src', 'layouts', 'default.vue'),
]

const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|pdf|zip|mp4|webm|ico|css|js|yaml|yml|json|xlsx)$/i
const EXTERNAL = /^(https?:|mailto:|tel:)/

let bundle
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { tppSidebar } from ${JSON.stringify(join(SIDEBARS, 'tpp.ts'))}
    export { lfiSidebar } from ${JSON.stringify(join(SIDEBARS, 'lfi.ts'))}
    export { buildApiSpecsSidebar } from ${JSON.stringify(join(SIDEBARS, 'api-specs.ts'))}
    export { VERSIONS } from ${JSON.stringify(VERSIONS_FILE)}
    export { getEndpointBySlug } from ${JSON.stringify(ENDPOINTS_INDEX)}
    export { ERRATA_SECTIONS } from ${JSON.stringify(ERRATAS_FILE)}
  `)
  bundle = a.mod
  dispose = a.dispose
})

after(() => dispose?.())

// ─── Resolution combining static pages + dynamic /tech/api-specs/ ────────────

function resolveOrEndpoint(link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned || !cleaned.startsWith('/')) return false
  if (EXTERNAL.test(cleaned) || ASSET_EXT.test(cleaned)) return true

  if (resolveSiteLink(cleaned)) return true

  // Dynamic /tech/api-specs/* — covered by the [...slug].vue catch-all.
  // Round-trip through the endpoint registry to confirm it's a real entry.
  if (cleaned.startsWith('/tech/api-specs/')) {
    const tail = cleaned.replace(/^\/tech\/api-specs\//, '').replace(/\/$/, '')
    if (bundle.getEndpointBySlug(tail)) return true
  }

  return false
}

// ─── Walkers ─────────────────────────────────────────────────────────────────

function collectSidebarLinks(node, acc = []) {
  if (!node) return acc
  if (Array.isArray(node)) {
    for (const n of node) collectSidebarLinks(n, acc)
    return acc
  }
  if (typeof node === 'object') {
    if (typeof node.link === 'string') acc.push(node.link)
    if (node.items) collectSidebarLinks(node.items, acc)
  }
  return acc
}

function extractStaticHrefs(src) {
  const refs = new Set()
  const patterns = [
    /\shref\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:href\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
    /\sto\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:to\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(src)) !== null) refs.add(m[1])
  }
  return refs
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Link integrity — sidebars, chrome, and errata banners', () => {
  it('every link in tppSidebar resolves to a real page or endpoint', () => {
    const links = collectSidebarLinks(bundle.tppSidebar)
    const broken = links.filter(l => !resolveOrEndpoint(l))
    assert.deepStrictEqual(
      broken,
      [],
      `Dead links in tppSidebar:\n` + broken.map(l => '  - ' + l).join('\n'),
    )
  })

  it('every link in lfiSidebar resolves to a real page or endpoint', () => {
    const links = collectSidebarLinks(bundle.lfiSidebar)
    const broken = links.filter(l => !resolveOrEndpoint(l))
    assert.deepStrictEqual(
      broken,
      [],
      `Dead links in lfiSidebar:\n` + broken.map(l => '  - ' + l).join('\n'),
    )
  })

  it('every link in buildApiSpecsSidebar(v) resolves for every version', () => {
    const failures = []
    for (const v of bundle.VERSIONS) {
      const links = collectSidebarLinks(bundle.buildApiSpecsSidebar(v))
      for (const link of links) {
        if (!resolveOrEndpoint(link)) failures.push(`${v}: ${link}`)
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `Dead links in api-specs sidebar:\n` + failures.map(l => '  - ' + l).join('\n'),
    )
  })

  it('every static href / RouterLink in PageHeader, PageFooter, and the default layout resolves', () => {
    const failures = []
    for (const file of CHROME_FILES) {
      if (!existsSync(file)) continue
      const src = readFileSync(file, 'utf-8')
      for (const ref of extractStaticHrefs(src)) {
        if (EXTERNAL.test(ref)) continue
        if (!resolveOrEndpoint(ref)) {
          const name = file.split(/[\\/]/).pop()
          failures.push(`${name}: ${ref}`)
        }
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `Dead chrome links:\n` + failures.map(l => '  - ' + l).join('\n'),
    )
  })

  it('every affectedPaths entry in erratas-registry resolves to a real page or endpoint', () => {
    const failures = []
    for (const section of bundle.ERRATA_SECTIONS) {
      const id = `${section.errataId} §${section.number}`
      for (const path of section.affectedPaths || []) {
        if (!resolveOrEndpoint(path)) failures.push(`${id}: ${path}`)
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `affectedPaths entries pointing at dead routes:\n` +
      failures.map(l => '  - ' + l).join('\n'),
    )
  })
})
