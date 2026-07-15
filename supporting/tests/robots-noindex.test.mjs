// Verifies the robots noindex directive emitted by src/App.vue: internal/gated
// and developer-tooling pages must carry <meta name="robots" content="noindex…">,
// and public pages must NOT. This is the counterpart to the sitemap's EXCLUDE
// list — the same route set must be both absent from the sitemap and marked
// noindex, so a crawler that finds one via an inbound link won't index it.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'dist')

// Mirrors NOINDEX_RE in src/App.vue and EXCLUDE in scripts/generate-sitemap.mjs
// (matched against the route path, i.e. the dist-relative path sans .html).
const NOINDEX = [
  /^_dev(\/|$)/,
  /^internal(\/|$)/,
  /^proposals\/internal(\/|$)/,
  /(^|\/)_shared(\/|$)/,
]

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walkHtml(full, out)
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

function hasNoindex(html) {
  const m = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)
  return !!m && /noindex/i.test(m[1])
}

describe('Robots noindex', {
  skip: !existsSync(DIST) && 'dist not found — run the app build first',
}, () => {
  it('gated/dev pages are noindex; public pages are not', () => {
    const missing = [] // should be noindex but isn't
    const leaked = [] // is noindex but shouldn't be
    for (const file of walkHtml(DIST)) {
      const rel = relative(DIST, file).replace(/\\/g, '/').replace(/\.html$/, '')
      const shouldNoindex = NOINDEX.some((re) => re.test(rel))
      const isNoindex = hasNoindex(readFileSync(file, 'utf-8'))
      if (shouldNoindex && !isNoindex) missing.push(rel)
      else if (!shouldNoindex && isNoindex) leaked.push(rel)
    }
    assert.equal(missing.length, 0, `gated/dev pages missing noindex:\n  ${missing.slice(0, 10).join('\n  ')}`)
    assert.equal(leaked.length, 0, `public pages wrongly marked noindex:\n  ${leaked.slice(0, 10).join('\n  ')}`)
  })
})
