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
const VERSION_CHANGES_FILE = resolve(ROOT, 'src', 'data', 'version-changes-registry.ts')
const ANNOUNCEMENT_FILE = resolve(ROOT, 'src', 'data', 'site-announcement.ts')
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
    export { buildTppSidebar } from ${JSON.stringify(join(SIDEBARS, 'tpp.ts'))}
    export { buildLfiSidebar } from ${JSON.stringify(join(SIDEBARS, 'lfi.ts'))}
    export { buildApiSpecsSidebar } from ${JSON.stringify(join(SIDEBARS, 'api-specs.ts'))}
    export { VERSIONS } from ${JSON.stringify(VERSIONS_FILE)}
    export { getEndpointBySlug } from ${JSON.stringify(ENDPOINTS_INDEX)}
    export { ERRATA_SECTIONS, errataVersions } from ${JSON.stringify(ERRATAS_FILE)}
    export { VERSION_CHANGES, specUrl, changelogVersions } from ${JSON.stringify(VERSION_CHANGES_FILE)}
    export { SITE_ANNOUNCEMENT } from ${JSON.stringify(ANNOUNCEMENT_FILE)}
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

  // Dynamic /erratas/:version and /changelog/:version — `[version].vue` files,
  // which resolveSiteLink cannot match. Round-trip through the same registries
  // that drive SSG path expansion (see src/data/ssg-paths.ts).
  for (const [prefix, versions] of [
    ['/tech/release-notes-and-erratas/erratas/', bundle.errataVersions],
    ['/tech/release-notes-and-erratas/changelog/', bundle.changelogVersions],
  ]) {
    if (!cleaned.startsWith(prefix)) continue
    const tail = cleaned.slice(prefix.length).replace(/\/$/, '')
    if ((versions || []).includes(tail)) return true
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
  // Each sidebar builder is exercised for every version. The non-empty guard
  // matters: if a builder is renamed, the bundled export becomes `undefined`
  // and the link set collapses to [], which would otherwise pass vacuously.
  for (const [label, builderName] of [
    ['buildTppSidebar', 'buildTppSidebar'],
    ['buildLfiSidebar', 'buildLfiSidebar'],
  ]) {
    it(`every link in ${label}(v) resolves for every version`, () => {
      const build = bundle[builderName]
      assert.equal(typeof build, 'function', `${builderName} is not exported from its sidebar module`)

      const failures = []
      let total = 0
      for (const v of bundle.VERSIONS) {
        const links = collectSidebarLinks(build(v))
        total += links.length
        for (const link of links) {
          if (!resolveOrEndpoint(link)) failures.push(`${v}: ${link}`)
        }
      }
      assert.ok(total > 0, `${builderName} produced no links at all`)
      assert.deepStrictEqual(
        failures,
        [],
        `Dead links in ${label}:\n` + failures.map(l => '  - ' + l).join('\n'),
      )
    })
  }

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

  // The changelog renders affectedPaths and endpoint paths as clickable chips,
  // so a dead entry there is a dead link on the page.
  it('every path in version-changes-registry resolves to a real page or endpoint', () => {
    const changes = bundle.VERSION_CHANGES
    assert.ok(Array.isArray(changes) && changes.length > 0,
      'VERSION_CHANGES is not exported, or is empty')

    const failures = []
    for (const change of changes) {
      const id = `${change.changeId} §${change.number}`
      for (const path of change.affectedPaths || []) {
        if (!resolveOrEndpoint(path)) failures.push(`${id} affectedPaths: ${path}`)
      }
      for (const ep of change.endpoints || []) {
        if (!resolveOrEndpoint(ep.path)) failures.push(`${id} endpoint "${ep.label}": ${ep.path}`)
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `version-changes entries pointing at dead routes:\n` +
      failures.map(l => '  - ' + l).join('\n'),
    )
  })

  // Spec chips link to the API Specs reference via specUrl(), which derives the
  // route from the endpoint catalogue. A misspelt spec name resolves to null
  // and silently degrades to a search button, so assert the names are real
  // rather than waiting for someone to notice a chip that does not navigate.
  it('every specs entry in version-changes-registry resolves to an API Specs page', () => {
    const changes = bundle.VERSION_CHANGES
    const specUrl = bundle.specUrl
    assert.equal(typeof specUrl, 'function', 'specUrl is not exported from version-changes-registry')

    const failures = []
    for (const change of changes) {
      const id = `${change.changeId} §${change.number}`
      for (const spec of change.specs || []) {
        const url = specUrl(spec, change.toVersion)
        if (!url) {
          failures.push(`${id} spec "${spec}": no catalogue entry at ${change.toVersion}`)
        } else if (!url.startsWith(`/tech/api-specs/${change.toVersion}/`)) {
          failures.push(`${id} spec "${spec}": resolved to ${url}, which is not a ${change.toVersion} API Specs route`)
        }
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `version-changes specs that do not resolve:\n` +
      failures.map(l => '  - ' + l).join('\n'),
    )
  })

  // The site announcement modal renders on every public page, so a dead path
  // there is a dead link the whole readership sees on arrival.
  it('every item path in site-announcement resolves to a real page or endpoint', () => {
    const ann = bundle.SITE_ANNOUNCEMENT
    assert.ok(ann && Array.isArray(ann.items),
      'SITE_ANNOUNCEMENT is not exported, or has no items array')

    const failures = []
    for (const item of ann.items) {
      if (!resolveOrEndpoint(item.path)) failures.push(`"${item.title}": ${item.path}`)
    }
    assert.deepStrictEqual(
      failures,
      [],
      `site-announcement items pointing at dead routes:\n` +
      failures.map(l => '  - ' + l).join('\n'),
    )
  })
})
