// Fails when a page under src/pages/ is unreachable from any navigation path.
//
// Reachability roots:
//   1. src/pages/index.vue (the site home)
//   2. Every `link` in tppSidebar, lfiSidebar, and buildApiSpecsSidebar(v)
//      for every version (sidebars are evaluated, not regex-scraped, so
//      template literals and helper calls resolve to real strings)
//   3. Every static href in chrome (PageHeader, PageFooter, default layout)
//
// From those roots we BFS through static `<a href="...">`, `<RouterLink to="...">`,
// markdown `[text](path)`, and `<!-- @include: -->` references inside reachable
// .vue / .md files.
//
// Listing-prefix inference: a few pages render their child links from a data
// registry (`policies.ts`, `articles.ts`) via `:href="x.url"`. Static-link
// scraping can't see these, so we hardcode known listing→child-tree pairs.
// Once the listing page is reachable, every page under the child tree is too.
//
// Skipped (never expected to be statically linked):
//   - dynamic-route files: `[id].vue`, `[...slug].vue`, `[year].vue`, etc.
//     These are reached via ssg-paths.ts expansion, not static links.
//   - underscore-prefixed dirs (`_shared/`, `_dev/`, …): partials and dev-only
//     scratch pages that aren't part of public navigation.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')
const SIDEBARS = resolve(ROOT, 'src', 'data', 'sidebars')
const VERSIONS_FILE = resolve(ROOT, 'src', 'data', 'versions.ts')
const LAYOUT_DEFAULT = resolve(ROOT, 'src', 'layouts', 'default.vue')
const CHROME_FILES = [
  resolve(ROOT, 'src', 'components', 'chrome', 'PageHeader.vue'),
  resolve(ROOT, 'src', 'components', 'chrome', 'PageFooter.vue'),
  LAYOUT_DEFAULT,
]

// Pages we knowingly leave unlinked. Relative to src/pages/, forward slashes.
// Add entries only with a reason — if a page belongs on a sidebar, wire it up.
const ALLOWED_ORPHANS = new Set([])

// Listing pages that render their children via data-driven `:href`. Once the
// listing is reachable, every .vue under the child tree is treated reachable.
// Pairs are { listing: '/route/of/index/page', tree: 'src/pages/relative/dir' }.
const LISTING_INFERENCE = [
  { listing: '/policy', tree: 'policy' },
  { listing: '/policy/', tree: 'policy' },
  { listing: '/knowledge-base', tree: 'knowledge-base/articles' },
  { listing: '/knowledge-base/', tree: 'knowledge-base/articles' },
  { listing: '/proposals', tree: 'proposals' },
  { listing: '/proposals/', tree: 'proposals' },
]

let sidebars
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { tppSidebar } from ${JSON.stringify(join(SIDEBARS, 'tpp.ts'))}
    export { lfiSidebar } from ${JSON.stringify(join(SIDEBARS, 'lfi.ts'))}
    export { buildApiSpecsSidebar } from ${JSON.stringify(join(SIDEBARS, 'api-specs.ts'))}
    export { VERSIONS } from ${JSON.stringify(VERSIONS_FILE)}
  `)
  sidebars = a.mod
  dispose = a.dispose
})

after(() => dispose?.())

// ─── File walking ────────────────────────────────────────────────────────────

function walk(dir, filterExt, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, filterExt, acc)
    else if (filterExt.test(entry)) acc.push(full)
  }
  return acc
}

function isExemptByPath(absFile) {
  const rel = relative(PAGES, absFile).replace(/\\/g, '/')
  // The /internal section is a password-gated authoring area, deliberately
  // absent from the public sidebar and top nav — reached by URL only. Its
  // index, editor, and user-authored Markdown pages are never expected to be
  // statically linked from the rest of the site.
  if (rel === 'internal' || rel.startsWith('internal/')) return true
  return rel.split('/').some(seg => seg.startsWith('_') || seg.startsWith('['))
}

function toRelPages(absFile) {
  return relative(PAGES, absFile).replace(/\\/g, '/')
}

// ─── Sidebar tree → links ────────────────────────────────────────────────────

function collectLinksFromTree(node, acc = new Set()) {
  if (!node) return acc
  if (Array.isArray(node)) {
    for (const n of node) collectLinksFromTree(n, acc)
    return acc
  }
  if (typeof node === 'object') {
    if (typeof node.link === 'string') acc.add(node.link)
    if (node.items) collectLinksFromTree(node.items, acc)
  }
  return acc
}

// ─── Chrome / markdown / template parsing ────────────────────────────────────

function extractStaticHrefs(src) {
  const refs = new Set()
  const patterns = [
    // <a href="..."> and bound :href="'...'" (single-quoted literal)
    /\shref\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:href\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
    // <RouterLink to="..."> and <RouterLink :to="'...'">
    /\sto\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:to\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
    // markdown [text](path) and HTML <!-- @include: x -->
    /\]\(([^)\s]+?)(?:\s+"[^"]*")?\)/g,
    /<!--\s*@include:\s*([^\s]+?)\s*-->/g,
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(src)) !== null) refs.add(m[1])
  }
  return refs
}

function collectChromeLinks() {
  const links = new Set()
  for (const file of CHROME_FILES) {
    if (!existsSync(file)) continue
    for (const ref of extractStaticHrefs(readFileSync(file, 'utf-8'))) {
      links.add(ref)
    }
  }
  return links
}

// ─── Route resolution (mirrors vite-plugin-pages defaults) ───────────────────
//
//   "/foo/bar/"  → src/pages/foo/bar/index.vue (or .md)
//   "/foo/bar"   → src/pages/foo/bar.vue (then .md, then bar/index.vue)
//   "/"          → src/pages/index.vue

function resolveSiteLink(link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned.startsWith('/')) return null
  const trailing = cleaned.endsWith('/')
  const bare = cleaned.replace(/^\//, '').replace(/\/$/, '')
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

function resolveRelativeLink(fromFile, link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned) return null
  if (/^(https?:|mailto:|tel:)/.test(cleaned)) return null
  const abs = resolve(dirname(fromFile), cleaned)
  if (cleaned.endsWith('.vue') || cleaned.endsWith('.md')) {
    return existsSync(abs) ? abs : null
  }
  if (cleaned.endsWith('/')) {
    for (const ext of ['index.vue', 'index.md']) {
      const candidate = join(abs, ext)
      if (existsSync(candidate)) return candidate
    }
    return null
  }
  for (const ext of ['.vue', '.md']) {
    if (existsSync(abs + ext)) return abs + ext
  }
  for (const ext of ['index.vue', 'index.md']) {
    const candidate = join(abs, ext)
    if (existsSync(candidate)) return candidate
  }
  return null
}

// ─── Reachability BFS ────────────────────────────────────────────────────────

async function computeReachable() {
  const reachable = new Set()
  const queue = []
  const seed = (f) => {
    if (f && !reachable.has(f)) {
      reachable.add(f)
      queue.push(f)
    }
  }

  // 1. Home
  seed(join(PAGES, 'index.vue'))

  // 2. Sidebar links — every static + every dynamic version's api-specs.
  const sidebarLinks = new Set()
  collectLinksFromTree(sidebars.tppSidebar, sidebarLinks)
  collectLinksFromTree(sidebars.lfiSidebar, sidebarLinks)
  for (const v of sidebars.VERSIONS) {
    const apiSpecs = sidebars.buildApiSpecsSidebar(v)
    collectLinksFromTree(apiSpecs, sidebarLinks)
  }

  // 3. Chrome links.
  const chromeLinks = collectChromeLinks()

  // 4. Resolve all root links.
  for (const link of new Set([...sidebarLinks, ...chromeLinks])) {
    const target = resolveSiteLink(link)
    if (target) seed(target)
  }

  // 5. BFS through links inside reachable files.
  while (queue.length) {
    const file = queue.shift()
    const src = readFileSync(file, 'utf-8')
    for (const ref of extractStaticHrefs(src)) {
      if (/^(https?:|mailto:|tel:)/.test(ref)) continue
      if (/\.(png|jpe?g|gif|svg|webp|pdf|zip|mp4|webm|ico|css|js|yaml|yml|json)$/i.test(ref)) continue
      const target = ref.startsWith('/')
        ? resolveSiteLink(ref)
        : resolveRelativeLink(file, ref)
      if (target) seed(target)
    }
  }

  // 6. Listing-prefix inference for data-driven children.
  for (const { listing, tree } of LISTING_INFERENCE) {
    const listingFile = resolveSiteLink(listing)
    if (!listingFile || !reachable.has(listingFile)) continue
    const treeDir = resolve(PAGES, tree)
    for (const f of walk(treeDir, /\.(vue|md)$/)) seed(f)
  }

  return reachable
}

describe('Pages are reachable from navigation', () => {
  let reachable
  let allPages

  before(async () => {
    allPages = walk(PAGES, /\.(vue|md)$/)
    reachable = await computeReachable()
  })

  it('no .vue/.md page is orphaned (unreachable from sidebar, nav, or any reachable page)', () => {
    const orphans = allPages
      .filter(f => !reachable.has(f) && !isExemptByPath(f))
      .map(toRelPages)
      .filter(p => !ALLOWED_ORPHANS.has(p))

    assert.deepStrictEqual(
      orphans,
      [],
      `Found ${orphans.length} orphaned page(s) — no path from the sidebar, top nav, or any reachable page leads to them.\n` +
      `Either wire each into a sidebar, delete it, or add it to ALLOWED_ORPHANS with a reason:\n` +
      orphans.map(p => '  - ' + p).join('\n'),
    )
  })

  it('no .vue page is shadowed by a sibling directory with index.vue', () => {
    // A link like "/foo/bar/" (trailing slash) resolves to foo/bar/index.vue.
    // If foo/bar.vue also exists, nothing can link to it — the dir form always
    // wins under vue-router cleanup. These are always orphans by construction.
    const shadowed = []
    for (const f of allPages) {
      const rel = toRelPages(f)
      if (basename(rel) === 'index.vue' || basename(rel) === 'index.md') continue
      const noExt = f.replace(/\.(vue|md)$/, '')
      for (const sibling of [join(noExt, 'index.vue'), join(noExt, 'index.md')]) {
        if (existsSync(sibling)) {
          shadowed.push({ file: rel, sibling: toRelPages(sibling) })
          break
        }
      }
    }

    assert.deepStrictEqual(
      shadowed,
      [],
      `Found ${shadowed.length} shadowed page(s) — a sibling directory with index.vue/.md will always win:\n` +
      shadowed.map(s => `  - ${s.file}\n    ← shadowed by ${s.sibling}`).join('\n'),
    )
  })
})
