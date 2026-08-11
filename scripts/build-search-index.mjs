/**
 * Builds the in-app search index from src/pages/.
 *
 * Walks every routable page (.vue and .md), extracts:
 *   - title  (from <route lang="yaml"> meta.title, .md frontmatter, or first heading)
 *   - body   (stripped of script/style/HTML/markdown — used for full-text matching)
 *   - headings (h1/h2/h3 — weighted higher than body)
 * Maps the file path to a vue-router route, infers category/section from the
 * route prefix, and emits a single TypeScript module that SearchModal.vue
 * imports.
 *
 * Dynamic routes (filenames containing `[`) and helpers (`_shared/`, `_dev/`)
 * are skipped — those pages either have no concrete URL at this stage or
 * aren't user-facing. Internal, password-gated routes are excluded too — see
 * EXCLUDE_ROUTES below.
 *
 * Output: src/components/chrome/search-data.ts
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, relative, sep } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PAGES_DIR = resolve(ROOT, 'src', 'pages')
const OUT_FILE = resolve(ROOT, 'src', 'components', 'chrome', 'search-data.ts')

// Per-page caps. Keep the generated module small enough to load synchronously.
const MAX_BODY_CHARS = 4000
const MAX_HEADINGS = 12

// Draft versions are mirrors of the current version plus a small delta, so
// indexing them would return a near-duplicate hit for every query. They stay
// reachable via the version dropdown and sidebar — just not via search.
// Parsed from src/data/versions.ts so the list has a single source of truth.
function parseDraftVersions() {
  const src = readFileSync(resolve(ROOT, 'src', 'data', 'versions.ts'), 'utf-8')
  const match = src.match(/DRAFT_VERSIONS[^=]*=\s*\[([^\]]*)\]/)
  if (!match) throw new Error('Could not parse DRAFT_VERSIONS from versions.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

const DRAFT_VERSIONS = parseDraftVersions()
const DESCRIPTION_CHARS = 180

// Routes kept out of search: internal/gated surfaces. A hit on one of these
// lands the reader on the internal password gate, not on content. Kept in step
// with the EXCLUDE list in scripts/generate-sitemap.mjs and NOINDEX_RE in
// src/App.vue. (`_dev` and `_shared` are skipped during the walk instead.)
const EXCLUDE_ROUTES = [
  /^\/internal(\/|$)/,
]

// ─── Route prefix → category/section ──────────────────────────────────────────
// Order matters: longer prefixes first so they win the `startsWith` check.
const CATEGORY_RULES = [
  { prefix: '/tech/tpp-standards/v2.1/banking',     category: 'TPP Standards',   section: 'Banking' },
  { prefix: '/tech/tpp-standards/v2.1/consent',     category: 'TPP Standards',   section: 'Consent' },
  { prefix: '/tech/tpp-standards/v2.1/webhooks',    category: 'TPP Standards',   section: 'Webhooks' },
  { prefix: '/tech/tpp-standards/v2.1/getting-started', category: 'TPP Standards', section: 'Getting Started' },
  { prefix: '/tech/tpp-standards/security',         category: 'TPP Standards',   section: 'Security' },
  { prefix: '/tech/tpp-standards/trust-framework',  category: 'TPP Standards',   section: 'Trust Framework' },
  { prefix: '/tech/tpp-standards/registration',     category: 'TPP Standards',   section: 'Registration' },
  { prefix: '/tech/tpp-standards',                  category: 'TPP Standards',   section: 'Overview' },
  { prefix: '/tech/lfi-api-hub/v2.1/banking',       category: 'LFI Integration', section: 'Banking' },
  { prefix: '/tech/lfi-api-hub/v2.1/consent-journey', category: 'LFI Integration', section: 'Consent Journey' },
  { prefix: '/tech/lfi-api-hub/v2.1/consent-events', category: 'LFI Integration', section: 'Consent Events' },
  { prefix: '/tech/lfi-api-hub/v2.1/consent-management-interface', category: 'LFI Integration', section: 'CMI' },
  { prefix: '/tech/lfi-api-hub/v2.1/api-hub',       category: 'LFI Integration', section: 'API Hub' },
  { prefix: '/tech/lfi-api-hub/v2.1/health-check',  category: 'LFI Integration', section: 'Health Check' },
  { prefix: '/tech/lfi-api-hub/production',         category: 'LFI Integration', section: 'Production' },
  { prefix: '/tech/lfi-api-hub/trust-framework',    category: 'LFI Integration', section: 'Trust Framework' },
  { prefix: '/tech/lfi-api-hub',                    category: 'LFI Integration', section: 'Overview' },
  { prefix: '/tech/api-specs',                      category: 'API Specs',       section: 'Reference' },
  { prefix: '/tech/release-notes-and-erratas',      category: 'Release Notes',   section: 'Changelog' },
  { prefix: '/knowledge-base',                      category: 'Knowledge Base',  section: 'Articles' },
  { prefix: '/policy',                              category: 'Policy',          section: 'Standards' },
  { prefix: '/pricing',                             category: 'Pricing',         section: 'Commercial' },
  { prefix: '/doc-repository',                      category: 'Participants',    section: 'Documents' },
  { prefix: '/program',                             category: 'Program',         section: 'Activity' },
  { prefix: '/metrics',                             category: 'Dashboard',       section: 'Metrics' },
  { prefix: '/news',                                category: 'News',            section: 'Updates' },
  { prefix: '/support-service-desk',                category: 'Support',         section: 'Help' },
]

function categorize(path) {
  for (const r of CATEGORY_RULES) {
    if (path === r.prefix || path.startsWith(r.prefix + '/') || path === r.prefix + '/') {
      return { category: r.category, section: r.section }
    }
  }
  return { category: 'General', section: 'Pages' }
}

// ─── Walk src/pages/ ──────────────────────────────────────────────────────────

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      // vite-plugin-pages excludes `_shared`; `_dev` is project-internal.
      if (name === '_shared' || name === '_dev') continue
      // Draft-version trees are excluded from search (see DRAFT_VERSIONS above).
      if (DRAFT_VERSIONS.includes(name)) continue
      walk(full, files)
    } else if (stat.isFile() && /\.(vue|md)$/.test(name)) {
      // Proposal companion partials (outcome/feedback, in either the folder or the
      // flat convention) are rendered INSIDE their proposal page and excluded from
      // routing in vite.config — indexing them would yield search hits that 404.
      if (/^(.*\.)?(outcome|feedback)\.vue$/.test(name)) continue
      files.push(full)
    }
  }
  return files
}

function fileToRoute(absPath) {
  const rel = relative(PAGES_DIR, absPath).split(sep).join('/')
  // Skip dynamic routes (`[id]`, `[...slug]`) — they have no concrete URL here.
  if (rel.includes('[')) return null
  const noExt = rel.replace(/\.(vue|md)$/, '')
  // `index` segments become trailing-slash routes.
  if (noExt === 'index') return '/'
  if (noExt.endsWith('/index')) return '/' + noExt.slice(0, -'/index'.length) + '/'
  return '/' + noExt
}

// ─── Title extraction ─────────────────────────────────────────────────────────

function extractTitle(src, ext, fallback) {
  if (ext === 'vue') {
    // <route lang="yaml"> meta: title: ...
    const routeBlock = src.match(/<route\b[^>]*>([\s\S]*?)<\/route>/i)
    if (routeBlock) {
      const m = routeBlock[1].match(/^\s*title\s*:\s*(.+?)\s*$/m)
      if (m) return cleanInline(m[1].replace(/^["']|["']$/g, ''))
    }
    // Templated <h1 class="ed-doc__title">…</h1> or generic <h1>
    const h1 = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (h1) return cleanInline(stripTags(h1[1]))
  } else {
    // .md frontmatter
    const fm = src.match(/^---\s*\n([\s\S]*?)\n---/)
    if (fm) {
      const m = fm[1].match(/^\s*title\s*:\s*(.+?)\s*$/m)
      if (m) return cleanInline(m[1].replace(/^["']|["']$/g, ''))
    }
    // First markdown `# heading`
    const md = src.match(/^\s*#\s+(.+?)\s*$/m)
    if (md) return cleanInline(md[1])
  }
  return fallback
}

function fallbackTitle(routePath) {
  if (routePath === '/') return 'Home'
  const segs = routePath.replace(/\/$/, '').split('/').filter(Boolean)
  const last = segs[segs.length - 1] || 'Home'
  return last
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ─── Body extraction ──────────────────────────────────────────────────────────

function stripTags(s) {
  return s.replace(/<[^>]+>/g, ' ')
}

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  middot: '·', thinsp: ' ', ensp: ' ', emsp: ' ',
  rarr: '→', larr: '←', uarr: '↑', darr: '↓',
  nearr: '↗', nwarr: '↖', searr: '↘', swarr: '↙',
  copy: '©', reg: '®', trade: '™', deg: '°',
}

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : ' ',
    )
}

function cleanInline(s) {
  return decodeEntities(s)
    .replace(/\{\{[\s\S]*?\}\}/g, ' ') // Vue mustache expressions
    .replace(/\s+/g, ' ')
    .trim()
}

function extractVueBody(src) {
  // Drop <script>, <style>, <route> blocks entirely.
  let s = src
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<route\b[\s\S]*?<\/route>/gi, ' ')
  const tpl = s.match(/<template\b[^>]*>([\s\S]*)<\/template>/i)
  const inner = tpl ? tpl[1] : s
  return cleanInline(stripTags(inner))
}

function extractMdBody(src) {
  let s = src
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ')             // fenced code
    .replace(/`[^`]*`/g, ' ')                    // inline code
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')       // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')     // links → text
    .replace(/^[#>\-*]+\s+/gm, ' ')              // bullets, headings markers
    .replace(/[*_`~]+/g, ' ')                    // emphasis
  return cleanInline(s)
}

function extractHeadings(src, ext) {
  const out = []
  if (ext === 'vue') {
    const re = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi
    let m
    while ((m = re.exec(src)) && out.length < MAX_HEADINGS) {
      const t = cleanInline(stripTags(m[2]))
      if (t) out.push(t)
    }
  } else {
    const re = /^(#{1,3})\s+(.+?)\s*$/gm
    let m
    while ((m = re.exec(src)) && out.length < MAX_HEADINGS) {
      const t = cleanInline(m[2])
      if (t) out.push(t)
    }
  }
  return out
}

// ─── Build description (used in search result snippet) ────────────────────────

function makeDescription(body) {
  if (!body) return ''
  if (body.length <= DESCRIPTION_CHARS) return body
  const slice = body.slice(0, DESCRIPTION_CHARS)
  const lastSpace = slice.lastIndexOf(' ')
  return (lastSpace > 60 ? slice.slice(0, lastSpace) : slice) + '…'
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function build() {
  const files = walk(PAGES_DIR)
  const items = []

  for (const file of files) {
    const route = fileToRoute(file)
    if (!route) continue
    if (EXCLUDE_ROUTES.some((re) => re.test(route))) continue
    const src = readFileSync(file, 'utf-8')
    const ext = file.endsWith('.md') ? 'md' : 'vue'
    const fallback = fallbackTitle(route)
    const title = extractTitle(src, ext, fallback)
    const headings = extractHeadings(src, ext)
    const body = (ext === 'vue' ? extractVueBody(src) : extractMdBody(src)).slice(0, MAX_BODY_CHARS)
    const { category, section } = categorize(route)
    const description = makeDescription(body) || `${section} — ${title}`
    items.push({
      title,
      path: route,
      category,
      section,
      description,
      headings,
      body,
    })
  }

  // Stable order: by category, then title.
  items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category)
    return a.title.localeCompare(b.title)
  })

  const out = `// AUTO-GENERATED by scripts/build-search-index.mjs — DO NOT EDIT.
// Re-run \`npm run build:search\` (or any \`npm run dev\` / \`npm run build\`) to refresh.

export interface SearchItem {
  title: string
  path: string
  category: string
  section: string
  description: string
  headings: string[]
  body: string
}

export const SEARCH_DATA: readonly SearchItem[] = ${JSON.stringify(items, null, 2)} as const
`

  writeFileSync(OUT_FILE, out, 'utf-8')
  console.log(`[search-index] wrote ${items.length} pages → ${relative(ROOT, OUT_FILE)}`)
}

build()
