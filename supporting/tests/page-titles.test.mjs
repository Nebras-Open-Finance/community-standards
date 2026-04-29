// Fails when a built page has a duplicated brand in its <title> — e.g.
// "UAE Open Finance | UAE Open Finance". This happens when a page falls
// back to the site title and the global title template then re-suffixes
// it. Depends on the dist produced by build-and-links.test.mjs.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'dist')
const SITE_TITLE = 'UAE Open Finance'

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const s = statSync(full)
    if (s.isDirectory()) walkHtml(full, out)
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return m ? m[1].trim() : null
}

describe('Page titles', {
  skip: !existsSync(DIST) && 'dist not found — run the app build first',
}, () => {
  it('no rendered <title> duplicates the site name', () => {
    const offenders = []
    for (const file of walkHtml(DIST)) {
      // Skip partials — `_shared/` files exist for shared components but
      // vite-plugin-pages may still emit standalone HTML for each. Excluded
      // from vite.config.ts but kept here as a safety net.
      const rel = relative(DIST, file).replace(/\\/g, '/')
      if (rel.includes('/_shared/')) continue

      const title = extractTitle(readFileSync(file, 'utf-8'))
      if (!title) continue
      const parts = title.split('|').map(p => p.trim())
      const duplicated = parts.filter(p => p === SITE_TITLE).length > 1
      if (duplicated) {
        offenders.push(`${rel} — <title>${title}</title>`)
      }
    }
    assert.equal(
      offenders.length,
      0,
      `Pages with duplicated "${SITE_TITLE}" in <title>:\n  ${offenders.join('\n  ')}\n\nFix by setting the page's title via useHead/<Title> rather than relying on the site default.`
    )
  })
})
