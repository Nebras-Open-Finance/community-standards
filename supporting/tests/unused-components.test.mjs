// Fails when a .vue component under docs/ is unreachable from any usage path.
//
// Reachability roots:
//   1. docs/.vitepress/theme/Layout.vue — VitePress always mounts this
//   2. Any .vue file imported by an .md file (via <script setup>)
//   3. Any .vue file imported by a non-theme .ts file under docs/
//   4. Any globally registered component (app.component('Name', X) in theme/index.ts)
//      whose tag <Name /> or <name-kebab /> appears in some .md file
//
// From those roots we BFS through:
//   - ESM .vue imports in each reachable .vue file
//   - Tag usages inside each reachable .vue file's template that match a global registration
//
// Anything not reached is an unused component.
//
// Why skip theme/index.ts imports as a reachability root: theme/index.ts imports every
// globally registered component. Treating those imports as usage would make every
// registered file trivially reachable — hiding registrations that are dead because their
// tag is never rendered. Global registrations count only when the tag is actually used.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const THEME_DIR = resolve(DOCS, '.vitepress', 'theme')
const THEME_INDEX = resolve(THEME_DIR, 'index.ts')
const LAYOUT = resolve(THEME_DIR, 'Layout.vue')

// Components knowingly kept despite appearing unused. Relative to docs/, forward slashes.
// Add entries only with a reason — if a component is truly used, wire it up instead.
const ALLOWED_UNUSED = new Set([])

function walk(dir, filterExt, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === 'cache' || entry === 'public') continue
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

// Parse theme/index.ts: map each `app.component('Name', Ident)` to the absolute .vue
// path that `Ident` was imported from. Ignores registrations whose identifier wasn't
// imported as a .vue module (defensive — shouldn't happen in this codebase).
function parseGlobalRegistrations() {
  const src = readFileSync(THEME_INDEX, 'utf-8')
  const identToPath = new Map()
  const importRe = /import\s+(\w+)\s+from\s+['"]([^'"]+\.vue)['"]/g
  let m
  while ((m = importRe.exec(src)) !== null) {
    identToPath.set(m[1], resolve(THEME_DIR, m[2]))
  }
  const registrations = new Map() // registered tag name → absolute file path
  const regRe = /app\.component\(\s*['"]([^'"]+)['"]\s*,\s*(\w+)\s*\)/g
  while ((m = regRe.exec(src)) !== null) {
    const path = identToPath.get(m[2])
    if (path) registrations.set(m[1], path)
  }
  return registrations
}

// Extract component-shaped tags from any file body: <PascalCase ...> or <kebab-case ...>.
// Plain lowercase HTML tags (no hyphen) are filtered out by the regex itself.
function collectTags(src) {
  const tags = new Set()
  const re = /<([A-Z][A-Za-z0-9]*|[a-z]+(?:-[a-z0-9]+)+)(?=[\s/>])/g
  let m
  while ((m = re.exec(src)) !== null) tags.add(m[1])
  return tags
}

// Extract absolute paths of .vue files imported (or re-exported) by `src`, resolved
// relative to `fromFile`. VitePress root-based specs starting with "/" resolve under docs/.
function collectVueImports(fromFile, src) {
  const out = new Set()
  const re = /from\s+['"]([^'"]+\.vue)['"]/g
  let m
  while ((m = re.exec(src)) !== null) {
    const spec = m[1]
    const abs = spec.startsWith('/')
      ? join(DOCS, spec.slice(1))
      : resolve(dirname(fromFile), spec)
    if (existsSync(abs)) out.add(abs)
  }
  return out
}

describe('Vue components are used', () => {
  it('every .vue file under docs/ is imported or referenced via a registered tag', () => {
    const vueFiles = walk(DOCS, /\.vue$/)
    const mdFiles = walk(DOCS, /\.md$/)
    const tsFiles = walk(resolve(DOCS, '.vitepress'), /\.ts$/)
    const registrations = parseGlobalRegistrations()

    // Pre-collect tag usages from every .md file. Global registrations become reachable
    // when their tag appears in any markdown page.
    const mdTags = new Set()
    for (const md of mdFiles) {
      for (const t of collectTags(readFileSync(md, 'utf-8'))) mdTags.add(t)
    }

    const reachable = new Set()
    const queue = []
    const seed = (p) => { if (p && !reachable.has(p)) { reachable.add(p); queue.push(p) } }

    seed(LAYOUT)

    // .md imports of .vue files (via <script setup>)
    for (const md of mdFiles) {
      for (const p of collectVueImports(md, readFileSync(md, 'utf-8'))) seed(p)
    }

    // .ts imports of .vue files, excluding theme/index.ts — see header comment.
    for (const ts of tsFiles) {
      if (ts === THEME_INDEX) continue
      for (const p of collectVueImports(ts, readFileSync(ts, 'utf-8'))) seed(p)
    }

    // Global registrations reachable via tag usage in any .md page
    for (const [name, path] of registrations) {
      if (mdTags.has(name) || mdTags.has(pascalToKebab(name))) seed(path)
    }

    // BFS: from each reachable .vue, follow imports and tag usages
    while (queue.length) {
      const file = queue.shift()
      const src = readFileSync(file, 'utf-8')
      for (const p of collectVueImports(file, src)) seed(p)
      const tags = collectTags(src)
      for (const [name, path] of registrations) {
        if (tags.has(name) || tags.has(pascalToKebab(name))) seed(path)
      }
    }

    const unused = vueFiles
      .filter(f => !reachable.has(f))
      .map(f => relative(DOCS, f).replace(/\\/g, '/'))
      .filter(p => !ALLOWED_UNUSED.has(p))

    assert.deepStrictEqual(
      unused,
      [],
      `Found ${unused.length} unused .vue component(s) — no import or registered-tag usage reaches them.\n` +
      `Either delete each, wire it up (import or <Tag/> in an .md page), or add it to ALLOWED_UNUSED with a reason:\n` +
      unused.map(p => '  - ' + p).join('\n'),
    )
  })
})
