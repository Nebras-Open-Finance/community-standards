// Fails when a .vue component under src/components/ is unreachable from any
// usage path.
//
// Components are auto-registered globally by unplugin-vue-components scanning
// `src/components/`. So a component is "used" if its tag name (PascalCase or
// kebab-case) appears inside the template of any reachable file, OR if a
// reachable file imports it explicitly.
//
// Reachability roots:
//   1. src/layouts/*.vue   (always rendered)
//   2. src/pages/**/*.vue  (every page is a route entry)
//   3. src/pages/**/*.md   (markdown pages can embed component tags via
//                            unplugin-vue-markdown)
//
// From those roots we BFS through:
//   - relative .vue imports in `<script setup>` of each reachable .vue file
//   - PascalCase / kebab-case tags used inside the template of each reachable
//     file (resolved against the component registry by name)

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const COMPONENTS = resolve(ROOT, 'src', 'components')
const PAGES = resolve(ROOT, 'src', 'pages')
const LAYOUTS = resolve(ROOT, 'src', 'layouts')

// Components knowingly kept despite appearing unused. Relative to src/components/,
// forward slashes. Add entries only with a reason — if a component is truly
// used, wire it up instead.
const ALLOWED_UNUSED = new Set([
  // Reusable Word-document download button. Built ahead of need — the data-
  // quality / availability / response-time policy pages are expected to wire
  // it in; until they do, the component lives unreferenced.
  'common/WordDocDownload.vue',
  // Proposals & Voting standard-layout scaffolding. `PvProposalView` is the
  // turnkey layout (hero + vote panel + body band) for proposal pages that want
  // it; `PvProposalBody` renders block content, and the two tag chips are used
  // only by that layout. Bespoke proposal pages (e.g. ofp-001.vue) author their
  // own layout and drop in PvVotePanel directly, so these stay unreferenced
  // until a page uses the standard layout.
  'proposals/PvProposalView.vue',
  'proposals/PvProposalBody.vue',
  'proposals/PvCategoryTag.vue',
  'proposals/PvPriorityTag.vue',
])

function walk(dir, filterExt, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.cache') continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, filterExt, acc)
    else if (filterExt.test(entry)) acc.push(full)
  }
  return acc
}

function pascalToKebab(name) {
  return name.replace(/([A-Z])/g, (c, _, i) => (i === 0 ? '' : '-') + c.toLowerCase())
}

function kebabToPascal(name) {
  return name.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

// Build a registry mapping every component name (PascalCase) to its abs path.
// unplugin-vue-components uses the file basename as the component name.
function buildComponentRegistry() {
  const map = new Map()
  for (const file of walk(COMPONENTS, /\.vue$/)) {
    map.set(basename(file, '.vue'), file)
  }
  return map
}

// Extract <PascalCaseName ...> tags from .vue / .md source. Also handles
// kebab-case usages by converting them back to PascalCase before lookup.
function extractComponentTags(src) {
  const names = new Set()
  // PascalCase: <Foo>, <FooBar>
  const pascal = /<([A-Z][A-Za-z0-9]*)\b[^>]*>/g
  let m
  while ((m = pascal.exec(src)) !== null) names.add(m[1])
  // kebab-case: <foo-bar> — only counts if it has a hyphen (avoids matching
  // every <div>).
  const kebab = /<([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\b[^>]*>/g
  while ((m = kebab.exec(src)) !== null) names.add(kebabToPascal(m[1]))
  return names
}

// Resolve relative .vue imports in `<script setup>`. Aliased imports
// (`@/components/...`) are also handled.
function extractVueImports(file, src) {
  const dir = dirname(file)
  const out = []
  const re = /\bfrom\s+["']([^"']+\.vue)["']/g
  let m
  while ((m = re.exec(src)) !== null) {
    const spec = m[1]
    let abs
    if (spec.startsWith('@/')) {
      abs = resolve(ROOT, 'src', spec.slice(2))
    } else if (spec.startsWith('@components/')) {
      abs = resolve(COMPONENTS, spec.slice('@components/'.length))
    } else if (spec.startsWith('.')) {
      abs = resolve(dir, spec)
    } else {
      continue // bare package import, ignore
    }
    if (existsSync(abs)) out.push(abs)
  }
  return out
}

function computeReachable() {
  const registry = buildComponentRegistry()
  const reachable = new Set()
  const queue = []
  const seed = (f) => {
    if (f && !reachable.has(f)) {
      reachable.add(f)
      queue.push(f)
    }
  }

  // Roots: every layout + every page.
  for (const f of walk(LAYOUTS, /\.vue$/)) seed(f)
  for (const f of walk(PAGES, /\.(vue|md)$/)) seed(f)

  while (queue.length) {
    const file = queue.shift()
    const src = readFileSync(file, 'utf-8')

    // Tag-driven reachability (auto-registered components).
    for (const name of extractComponentTags(src)) {
      const target = registry.get(name)
      if (target) seed(target)
    }

    // Import-driven reachability (covers explicit imports of .vue files).
    for (const target of extractVueImports(file, src)) {
      seed(target)
    }
  }

  return { reachable, registry }
}

function toRelComponents(absFile) {
  return relative(COMPONENTS, absFile).replace(/\\/g, '/')
}

describe('Components are reachable from layouts or pages', () => {
  it('no .vue component is unused', () => {
    const { reachable, registry } = computeReachable()
    const unused = []
    for (const [name, file] of registry) {
      if (reachable.has(file)) continue
      const rel = toRelComponents(file)
      if (ALLOWED_UNUSED.has(rel)) continue
      unused.push(rel)
    }

    assert.deepStrictEqual(
      unused,
      [],
      `Found ${unused.length} unused component(s) — no layout or page references their tag or imports the file.\n` +
      `Either delete each, use it from a page, or add to ALLOWED_UNUSED with a reason:\n` +
      unused.map(p => '  - ' + p).join('\n'),
    )
  })
})
