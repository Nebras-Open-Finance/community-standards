// Fails when a .md page under docs/ is unreachable from any navigation path.
//
// Reachability roots:
//   1. docs/index.md (the site home)
//   2. Every `link` in every sidebar (sidebars are evaluated, not regex-scraped,
//      so helper functions and template literals resolve to their real values)
//   3. Every `link` in the top nav (parsed from config.ts)
//   4. Every href in GLOBAL_CHROME_COMPONENTS — components that render on every page
//      (header, footer, layout). Page-conditional components are deliberately
//      excluded: a link rendered only on /foo/* pointing back to /foo/ is a
//      self-referential loop, not real navigation from outside the section.
//
// From those roots we BFS through markdown links, @include directives, and
// href attributes inside .md files. When a reachable .md uses a Vue component
// (e.g. <PolicyPage />), we also follow hrefs rendered by that component —
// including template literal prefixes like `/foo/${x}` → every .md under
// docs/foo/ — and recurse into nested components and imported data files.
// Anything unreached — and not a partial under _shared/ or a dynamic-route
// file under [param]/ — is an orphan.
import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { resolve, dirname, join, relative, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const SIDEBAR_DIR = resolve(DOCS, '.vitepress', 'config', 'sidebars')
const CONFIG_FILE = resolve(DOCS, '.vitepress', 'config.ts')
const VERSION_FILE = resolve(DOCS, '.vitepress', 'version.ts')

// Components that render on EVERY page — their links count as navigation roots.
// Page-conditional components (e.g. DocumentRepoDisplay, which only renders under /doc-repository/)
// are deliberately excluded: a link rendered only on /foo/* pointing back to /foo/ is a
// self-referential loop, not real navigation.
const GLOBAL_CHROME_COMPONENTS = [
  resolve(DOCS, 'components', 'WebPages', 'Components', 'PageHeader.vue'),
  resolve(DOCS, 'components', 'WebPages', 'Components', 'PageFooter.vue'),
  resolve(DOCS, '.vitepress', 'theme', 'Layout.vue'),
]

// Pages we knowingly leave unlinked. Relative to docs/, forward slashes.
// Add entries only with a reason — if a page belongs on a sidebar, wire it up instead.
const ALLOWED_ORPHANS = new Set([
  'processes/index.md', // Landing for the processes section; sidebar exists but no in-site link points at /processes/ itself.
])

function walk(dir, filterExt, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (entry === '.vitepress' || entry === 'dist' || entry === 'cache' || entry === 'public') continue
      walk(full, filterExt, acc)
    } else if (filterExt.test(entry)) {
      acc.push(full)
    }
  }
  return acc
}

// kb.ts reads docs/knowledge-base at module load via `import.meta.url`. If esbuild
// bundles that reference into a tmp output path, the relative fs lookup resolves
// into AppData/knowledge-base and crashes. Replace each file's `import.meta.url`
// with a literal of its ORIGINAL file:// URL so runtime path math survives bundling.
function pinImportMetaUrlPlugin() {
  return {
    name: 'pin-import-meta-url',
    setup(b) {
      b.onLoad({ filter: /\.ts$/ }, (args) => {
        const raw = readFileSync(args.path, 'utf-8')
        const origUrl = pathToFileURL(args.path).href
        return {
          contents: raw.replace(/\bimport\.meta\.url\b/g, JSON.stringify(origUrl)),
          loader: 'ts',
        }
      })
    },
  }
}

async function loadSidebarConfig() {
  const tmp = mkdtempSync(join(tmpdir(), 'orphan-'))
  const out = join(tmp, 'config.mjs')
  const entry = join(tmp, 'entry.ts')

  writeFileSync(entry, `
    export { tppSidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'tpp.ts'))}
    export { lfiSidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'lfi.ts'))}
    export { processesSidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'policy.ts'))}
    export { kbSidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'kb.ts'))}
    export { apiSpecsSidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'api-specs.ts'))}
    export { docRepositorySidebar } from ${JSON.stringify(join(SIDEBAR_DIR, 'doc-repository.ts'))}
    export { CURRENT_VERSION } from ${JSON.stringify(VERSION_FILE)}
  `)

  await build({
    entryPoints: [entry],
    outfile: out,
    bundle: true,
    format: 'esm',
    platform: 'node',
    external: ['vitepress'],
    plugins: [pinImportMetaUrlPlugin()],
    logLevel: 'silent',
  })

  try {
    return await import(pathToFileURL(out).href)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

function collectLinksFromSidebarTree(node, acc = new Set()) {
  if (!node) return acc
  if (Array.isArray(node)) {
    for (const n of node) collectLinksFromSidebarTree(n, acc)
    return acc
  }
  if (typeof node === 'object') {
    if (typeof node.link === 'string') acc.add(node.link)
    if (node.items) collectLinksFromSidebarTree(node.items, acc)
  }
  return acc
}

// The inline `/tech/` fallback sidebar lives in config.ts (not exported as a module),
// so we scan the file for `link:`. The top `nav: [...]` block is deliberately excluded:
// Layout.vue / editorial-doc.css hide VitePress's default nav bar, so themeConfig.nav
// entries never render to users — treating them as reachability roots would mask real
// orphans (e.g. a page listed only in the dead nav).
function collectConfigLinks() {
  const src = readFileSync(CONFIG_FILE, 'utf-8')
  const navRange = findNavArrayRange(src)
  const links = new Set()
  const re = /\blink\s*:\s*([`'"])([^`'"]+)\1/g
  let m
  while ((m = re.exec(src)) !== null) {
    if (navRange && m.index >= navRange.start && m.index < navRange.end) continue
    links.add(m[2])
  }
  return links
}

// Locate the `nav: [ ... ]` array in config.ts by counting brackets.
// Returns { start, end } byte offsets of the array body, or null if not found.
function findNavArrayRange(src) {
  const m = /\bnav\s*:\s*\[/.exec(src)
  if (!m) return null
  const start = m.index + m[0].length - 1 // position of opening '['
  let depth = 0
  for (let i = start; i < src.length; i++) {
    const c = src[i]
    if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) return { start, end: i + 1 }
    }
  }
  return null
}

// Scan global-chrome Vue components for href attributes (static `href="..."` and
// bound `:href="'...'"`). These render on every page so their links are real roots.
function collectGlobalChromeLinks() {
  const links = new Set()
  const patterns = [
    /\shref\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:href\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
  ]
  for (const file of GLOBAL_CHROME_COMPONENTS) {
    if (!existsSync(file)) continue
    const src = readFileSync(file, 'utf-8')
    for (const re of patterns) {
      let m
      while ((m = re.exec(src)) !== null) links.add(m[1])
    }
  }
  return links
}

// cleanUrls mapping:
//   "/foo/bar/"  → docs/foo/bar/index.md
//   "/foo/bar"   → docs/foo/bar.md, or fallback docs/foo/bar/index.md
function resolveSiteLink(link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned.startsWith('/')) return null
  const trailing = cleaned.endsWith('/')
  const bare = cleaned.replace(/^\//, '').replace(/\/$/, '')
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

function resolveRelativeLink(fromFile, link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned) return null
  if (/^(https?:|mailto:)/.test(cleaned)) return null
  const abs = resolve(dirname(fromFile), cleaned)
  if (cleaned.endsWith('.md')) return existsSync(abs) ? abs : null
  if (cleaned.endsWith('/')) {
    const idx = join(abs, 'index.md')
    return existsSync(idx) ? idx : null
  }
  if (existsSync(abs + '.md')) return abs + '.md'
  const idx = join(abs, 'index.md')
  if (existsSync(idx)) return idx
  return null
}

function extractLinksFromMarkdown(src) {
  const refs = new Set()
  const patterns = [
    /\]\(([^)\s]+?)(?:\s+"[^"]*")?\)/g,        // [text](href)
    /<!--\s*@include:\s*([^\s]+?)\s*-->/g,      // <!--@include:-->
    /href\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,    // <a href="...">
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(src)) !== null) refs.add(m[1])
  }
  return refs
}

// Map PascalCase component name → .vue file path.
function discoverComponents() {
  const map = new Map()
  for (const f of walk(resolve(DOCS, 'components'), /\.vue$/)) {
    map.set(basename(f, '.vue'), f)
  }
  return map
}

// Find <PascalCaseName ...> tags (Vue components) in markdown or .vue source.
function extractComponentTags(src) {
  const names = new Set()
  const re = /<([A-Z][A-Za-z0-9]*)\b[^>]*>/g
  let m
  while ((m = re.exec(src)) !== null) names.add(m[1])
  return names
}

// Extract site-relative URLs from .vue / .ts source. Returns:
//   links[]    — static paths: href="/foo/bar", `/foo/bar`
//   prefixes[] — directory prefixes from interpolated template literals:
//                `/foo/${slug}` → "/foo/"
function extractComponentRefs(src) {
  const links = new Set()
  const prefixes = new Set()
  const hrefPatterns = [
    /\shref\s*=\s*"([^"#?]+)(?:[#?][^"]*)?"/g,
    /\s:href\s*=\s*"'([^'"#?]+)(?:[#?][^'"]*)?'"/g,
  ]
  for (const re of hrefPatterns) {
    let m
    while ((m = re.exec(src)) !== null) if (m[1].startsWith('/')) links.add(m[1])
  }
  const tplRe = /`(\/[^`]*?)`/g
  let m
  while ((m = tplRe.exec(src)) !== null) {
    const tpl = m[1]
    const dollar = tpl.indexOf('${')
    if (dollar === -1) {
      links.add(tpl)
    } else {
      const prefix = tpl.slice(0, dollar)
      if (prefix.length > 1) prefixes.add(prefix)
    }
  }
  return { links, prefixes }
}

// Resolve relative `from '...'` imports in .vue / .ts source to abs .ts paths.
function extractRelativeImports(file, src) {
  const dir = dirname(file)
  const out = []
  const re = /\bfrom\s+["'](\.[^"']+)["']/g
  let m
  while ((m = re.exec(src)) !== null) {
    const spec = m[1]
    const candidates = [
      resolve(dir, spec),
      resolve(dir, spec + '.ts'),
      resolve(dir, spec + '.data.ts'),
      resolve(dir, spec, 'index.ts'),
    ]
    for (const c of candidates) {
      if (existsSync(c) && statSync(c).isFile()) { out.push(c); break }
    }
  }
  return out
}

// All .md files under docs/<prefix>/ — used to seed pages reachable via
// interpolated URLs like `/foo/${slug}`.
function mdFilesUnderPrefix(prefix) {
  const bare = prefix.replace(/^\//, '').replace(/\/$/, '')
  if (!bare) return []
  const dir = join(DOCS, bare)
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return []
  return walk(dir, /\.md$/)
}

function followComponent(file, visited, registry, seed) {
  if (visited.has(file) || !existsSync(file)) return
  visited.add(file)
  const src = readFileSync(file, 'utf-8')
  const { links, prefixes } = extractComponentRefs(src)
  for (const link of links) {
    const target = resolveSiteLink(link)
    if (target) seed(target)
  }
  for (const prefix of prefixes) for (const md of mdFilesUnderPrefix(prefix)) seed(md)
  for (const name of extractComponentTags(src)) {
    const sub = registry.get(name)
    if (sub) followComponent(sub, visited, registry, seed)
  }
  for (const imp of extractRelativeImports(file, src)) {
    if (visited.has(imp) || !/\.(ts|mjs|js)$/.test(imp)) continue
    visited.add(imp)
    const impSrc = readFileSync(imp, 'utf-8')
    const { links: l2, prefixes: p2 } = extractComponentRefs(impSrc)
    for (const link of l2) {
      const target = resolveSiteLink(link)
      if (target) seed(target)
    }
    for (const prefix of p2) for (const md of mdFilesUnderPrefix(prefix)) seed(md)
  }
}

async function computeReachable() {
  const reachable = new Set()
  const queue = []
  const seed = (f) => { if (f && !reachable.has(f)) { reachable.add(f); queue.push(f) } }

  seed(join(DOCS, 'index.md'))

  const sidebarMod = await loadSidebarConfig()
  const sidebarLinks = new Set()
  for (const key of Object.keys(sidebarMod)) {
    if (key === 'CURRENT_VERSION') continue
    collectLinksFromSidebarTree(sidebarMod[key], sidebarLinks)
  }
  const navLinks = collectConfigLinks()
  const chromeLinks = collectGlobalChromeLinks()

  for (const link of new Set([...sidebarLinks, ...navLinks, ...chromeLinks])) {
    const target = resolveSiteLink(link)
    if (target) seed(target)
  }

  const componentRegistry = discoverComponents()
  const visitedComponents = new Set()

  while (queue.length) {
    const file = queue.shift()
    const src = readFileSync(file, 'utf-8')
    for (const ref of extractLinksFromMarkdown(src)) {
      if (/^(https?:|mailto:)/.test(ref)) continue
      if (/\.(png|jpe?g|gif|svg|webp|pdf|zip|mp4|webm|ico|css|js|yaml|yml|json)$/i.test(ref)) continue
      const target = ref.startsWith('/')
        ? resolveSiteLink(ref)
        : resolveRelativeLink(file, ref)
      if (target) seed(target)
    }
    for (const name of extractComponentTags(src)) {
      const comp = componentRegistry.get(name)
      if (comp) followComponent(comp, visitedComponents, componentRegistry, seed)
    }
  }

  return reachable
}

function isExemptByPath(absFile) {
  const rel = relative(DOCS, absFile).replace(/\\/g, '/')
  return rel.split('/').some(seg => seg === '_shared' || seg.startsWith('['))
}

function toRelDocs(absFile) {
  return relative(DOCS, absFile).replace(/\\/g, '/')
}

describe('Docs pages are reachable from navigation', () => {
  let reachable
  let allMd

  before(async () => {
    allMd = walk(DOCS, /\.md$/)
    reachable = await computeReachable()
  })

  it('no .md page is orphaned (unreachable from sidebar, nav, or any linked page)', () => {
    const orphans = allMd
      .filter(f => !reachable.has(f) && !isExemptByPath(f))
      .map(toRelDocs)
      .filter(p => !ALLOWED_ORPHANS.has(p))

    assert.deepStrictEqual(
      orphans,
      [],
      `Found ${orphans.length} orphaned page(s) — no path from the sidebar, top nav, or any reachable page leads to them.\n` +
      `Either wire each into a sidebar, delete it, or add it to ALLOWED_ORPHANS with a reason:\n` +
      orphans.map(p => '  - ' + p).join('\n'),
    )
  })

  it('no .md page is shadowed by a sibling directory with index.md', () => {
    // A link like "/foo/bar/" (trailing slash) resolves to foo/bar/index.md.
    // If foo/bar.md also exists, nothing can link to it — the dir form always wins
    // under cleanUrls. These are always orphans by construction.
    const shadowed = []
    for (const f of allMd) {
      const rel = toRelDocs(f)
      if (rel.endsWith('/index.md')) continue
      const sibling = join(f.replace(/\.md$/, ''), 'index.md')
      if (existsSync(sibling)) {
        shadowed.push({ file: toRelDocs(f), sibling: toRelDocs(sibling) })
      }
    }

    assert.deepStrictEqual(
      shadowed,
      [],
      `Found ${shadowed.length} shadowed .md file(s) — a sibling directory with index.md will always win:\n` +
      shadowed.map(s => `  - ${s.file}\n    ← shadowed by ${s.sibling}`).join('\n'),
    )
  })
})
