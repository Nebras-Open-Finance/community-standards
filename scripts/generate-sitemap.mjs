// Generates dist/sitemap.xml after a vite-ssg build.
//
// Invoked from vite.config.ts `ssgOptions.onFinished`, so it runs automatically
// as part of `npm run build` — no separate step. robots.txt already advertises
// https://nebras-open-finance.com/sitemap.xml; this produces that file.
//
// URLs are read from each prerendered page's own <link rel="canonical"> tag
// (emitted by src/App.vue), so the sitemap is guaranteed to match the canonical
// URLs exactly — index routes keep their trailing slash, leaf routes don't, and
// there is no `.html` guesswork. Pages that are internal, dev-only, or otherwise
// not meant for search engines are excluded by route prefix.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')

// Route prefixes (relative to dist, posix-style, sans .html) kept out of the
// sitemap: internal/gated surfaces and developer tooling. Match the same set
// that carries no public SEO value.
const EXCLUDE = [
  /^_dev(\/|$)/, // component viewer / kit
  /^internal(\/|$)/, // internal landing + pages
  /^proposals\/internal(\/|$)/, // internal proposals view
  /(^|\/)_shared(\/|$)/, // route-less partials (safety net)
]

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walkHtml(full, out)
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

function canonicalOf(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)
  return m ? m[1] : null
}

export function generateSitemap() {
  const files = walkHtml(DIST)
  const locs = new Set()

  for (const file of files) {
    const rel = relative(DIST, file).replace(/\\/g, '/').replace(/\.html$/, '')
    if (EXCLUDE.some((re) => re.test(rel))) continue
    const href = canonicalOf(readFileSync(file, 'utf-8'))
    if (href) locs.add(href)
  }

  const urls = [...locs].sort()
  // Build date, not per-page mtime — every page was (re)rendered by this build,
  // so a single build-day lastmod is honest and avoids noisy churn.
  const lastmod = new Date().toISOString().slice(0, 10)

  const body = urls
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  writeFileSync(resolve(DIST, 'sitemap.xml'), xml, 'utf-8')
  console.log(`[sitemap] wrote dist/sitemap.xml with ${urls.length} URLs`)
  return urls.length
}

// Allow standalone invocation: `node scripts/generate-sitemap.mjs`
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-sitemap.mjs')) {
  generateSitemap()
}
