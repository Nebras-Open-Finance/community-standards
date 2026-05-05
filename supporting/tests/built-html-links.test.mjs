// Walks dist/**/*.html and asserts every internal `<a href>` resolves
// to an actually-emitted file. Catches the case lychee silently passes:
// a directory path that exists but has no `index.html` inside.
//
// Lychee's `fallback_extensions = ['html']` config treats an existing
// directory as a resolved link — so a card pointing at `/foo/` whose
// dist counterpart is just an empty directory wrapping sub-pages slips
// through. That's the bug class this test plugs.
//
// Skipped if `dist/` is missing — local devs without a build don't see
// failures; CI runs after `npm run build` so dist is always present.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'dist')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = resolve(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

// Resolve a site-absolute href to the dist file that should serve it.
// Mirrors vite-ssg's emission: `/foo/bar` → `foo/bar.html` *or*
// `foo/bar/index.html` (either form is served by Cloudflare Pages).
// For paths with a non-`.html` extension, the literal file must exist.
function resolveDistPath(href) {
  const path = href.replace(/[#?].*$/, '')
  if (!path.startsWith('/')) return 'skip'
  if (path === '/') {
    return existsSync(resolve(DIST, 'index.html')) ? 'ok' : null
  }
  const m = /\.([a-z0-9]+)$/i.exec(path)
  if (m && m[1].toLowerCase() !== 'html') {
    const literal = resolve(DIST, path.slice(1))
    return existsSync(literal) ? 'ok' : null
  }
  const cleaned = path.replace(/\/$/, '').slice(1)
  const candidates = [
    resolve(DIST, cleaned + '.html'),
    resolve(DIST, cleaned, 'index.html'),
  ]
  return candidates.some(existsSync) ? 'ok' : null
}

// Match `<a ... href="...">`. Captures any quoting style; we strip
// fragment / query in resolveDistPath. We don't try to validate
// `<link>`, `<script>`, or `<img>` — those are bundled and stable.
const A_HREF_RE = /<a\b[^>]*?\shref\s*=\s*["']([^"']+)["']/gi

describe('Built HTML — internal links resolve', {
  skip: !existsSync(DIST) && 'No dist/. Run `npm run build` first.',
}, () => {
  it('every internal href in dist HTML maps to an emitted file', () => {
    const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'))
    const dead = []

    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8')
      let m
      A_HREF_RE.lastIndex = 0
      while ((m = A_HREF_RE.exec(html)) !== null) {
        const href = m[1]
        // Skip non-site-absolute (external, anchor-only, relative, etc.)
        if (!href.startsWith('/')) continue
        const status = resolveDistPath(href)
        if (status === null) {
          dead.push({
            in: relative(DIST, f).split(sep).join('/'),
            href,
          })
        }
      }
    }

    if (dead.length) {
      // Group by href so the report stays readable when many pages
      // share the same broken link (e.g. a chrome / sidebar offender).
      const byHref = new Map()
      for (const d of dead) {
        if (!byHref.has(d.href)) byHref.set(d.href, [])
        byHref.get(d.href).push(d.in)
      }
      const lines = []
      for (const [href, pages] of byHref) {
        lines.push(`  ${href}`)
        lines.push(`    ${pages.length} occurrence(s), e.g. ${pages[0]}`)
      }
      assert.fail(
        `${dead.length} dead internal link(s) across ${byHref.size} unique href(s):\n${lines.join('\n')}`,
      )
    }
  })
})
