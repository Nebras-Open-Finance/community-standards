// Verifies dist/sitemap.xml, produced by scripts/generate-sitemap.mjs via the
// vite-ssg `onFinished` hook. robots.txt advertises this file, so a build that
// silently stops emitting it — or one that leaks internal/dev routes into it —
// is an SEO regression. Depends on the dist produced by the app build.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'dist')
const SITEMAP = resolve(DIST, 'sitemap.xml')
const ORIGIN = 'https://nebras-open-finance.com'

// Route substrings that must never appear in the sitemap — kept in sync with
// the EXCLUDE list in scripts/generate-sitemap.mjs.
const FORBIDDEN = ['/_dev/', '/_shared/', '/internal', '/proposals/internal']

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walkHtml(full, out)
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
}

describe('Sitemap', {
  skip: !existsSync(DIST) && 'dist not found — run the app build first',
}, () => {
  const exists = existsSync(SITEMAP)
  const xml = exists ? readFileSync(SITEMAP, 'utf-8') : ''
  const urls = exists ? locs(xml) : []

  it('sitemap.xml exists and is well-formed', () => {
    assert.ok(exists, 'dist/sitemap.xml is missing — the onFinished hook did not run')
    assert.ok(xml.startsWith('<?xml'), 'missing XML declaration')
    assert.match(xml, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/)
    assert.equal(
      (xml.match(/<loc>/g) || []).length,
      (xml.match(/<\/loc>/g) || []).length,
      'unbalanced <loc> tags',
    )
    assert.ok(urls.length > 0, 'sitemap contains no URLs')
  })

  it('every URL is an absolute origin URL, and all are unique', () => {
    const bad = urls.filter((u) => !u.startsWith(`${ORIGIN}/`))
    assert.equal(bad.length, 0, `non-canonical origin URLs:\n  ${bad.slice(0, 10).join('\n  ')}`)
    assert.equal(new Set(urls).size, urls.length, 'sitemap contains duplicate URLs')
  })

  it('excludes internal, dev, and gated routes', () => {
    const leaked = urls.filter((u) => FORBIDDEN.some((f) => u.includes(f)))
    assert.equal(leaked.length, 0, `internal/dev routes leaked into sitemap:\n  ${leaked.join('\n  ')}`)
  })

  it('lists every public prerendered page exactly once', () => {
    // Derive the set of public canonical URLs straight from dist and compare —
    // catches both missing pages (never added) and stale ones (removed page
    // still advertised). Uses each page's own <link rel="canonical">, the same
    // source the generator reads.
    const expected = new Set()
    for (const file of walkHtml(DIST)) {
      const rel = relative(DIST, file).replace(/\\/g, '/').replace(/\.html$/, '')
      if (
        /^_dev(\/|$)/.test(rel) ||
        /^internal(\/|$)/.test(rel) ||
        /^proposals\/internal(\/|$)/.test(rel) ||
        /(^|\/)_shared(\/|$)/.test(rel)
      ) continue
      const m = readFileSync(file, 'utf-8').match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)
      if (m) expected.add(m[1])
    }
    const inSitemap = new Set(urls)
    const missing = [...expected].filter((u) => !inSitemap.has(u))
    const extra = [...inSitemap].filter((u) => !expected.has(u))
    assert.equal(missing.length, 0, `public pages absent from sitemap:\n  ${missing.slice(0, 10).join('\n  ')}`)
    assert.equal(extra.length, 0, `sitemap URLs with no matching page:\n  ${extra.slice(0, 10).join('\n  ')}`)
  })
})
