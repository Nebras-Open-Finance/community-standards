// Stale-deploy self-healing must never regress. Every build hashes its asset
// filenames, so a browser holding a PREVIOUS build's shell requests old
// /assets/*.js the new deploy no longer serves; on this host that 404 is served
// as HTML, the module is rejected ("Expected a JavaScript module but got
// text/html"), and the SPA fails to boot — which takes down EVERY page at once
// (proposals, doc-repository, everything), since they share one app bundle.
//
// Two independent layers guard against this, and this test pins both so a future
// refactor can't silently remove either:
//
//   1. In-app recovery (src/main.ts): catches a LAZY route chunk going stale
//      mid-session via `vite:preloadError` and `router.onError`, and reloads.
//   2. Entry-bundle guard (index.html): an inline, capture-phase `error` listener
//      that runs BEFORE the app module, so it can recover even when the ENTRY
//      bundle itself is the stale module — the one case layer 1 cannot cover,
//      because layer 1 lives inside the bundle that failed to load.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

const indexHtml = readFileSync(resolve(ROOT, 'index.html'), 'utf8')
const mainTs = readFileSync(resolve(ROOT, 'src', 'main.ts'), 'utf8')

describe('stale-deploy recovery: entry-bundle guard (index.html)', () => {
  // Isolate the inline head scripts so we assert against the guard, not the app.
  const inlineScripts = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const guard = inlineScripts.find((s) => /addEventListener\(\s*['"]error['"]/.test(s)) || ''

  it('installs an inline error listener before the app module loads', () => {
    assert.ok(guard, 'index.html must contain an inline <script> with an "error" listener')
    // Must be registered in the head, ahead of the module in the body, so it is
    // listening before the entry bundle is even requested.
    assert.ok(
      indexHtml.indexOf(guard) < indexHtml.indexOf('type="module"'),
      'the recovery guard must appear before the module script tag',
    )
  })

  it('listens in the capture phase (resource-load errors do not bubble)', () => {
    assert.match(
      guard,
      /addEventListener\(\s*['"]error['"][\s\S]*?,\s*true\s*\)/,
      'the error listener must pass capture=true, or SCRIPT load failures are never seen',
    )
  })

  it('only reacts to a failed module / hashed-asset script, not any error', () => {
    assert.match(guard, /tagName\s*!==?\s*['"]SCRIPT['"]|tagName\s*===?\s*['"]SCRIPT['"]/)
    assert.ok(
      /type\s*!==?\s*['"]module['"]/.test(guard) || /\/assets\//.test(guard),
      'the guard must key off a module script or a hashed /assets/ URL',
    )
  })

  it('forces a full document reload', () => {
    assert.match(guard, /location\.reload\(|location\.assign\(|location\.replace\(/)
  })

  it('has a sessionStorage cooldown so a genuinely-missing chunk cannot loop', () => {
    assert.match(guard, /sessionStorage/)
    assert.match(guard, /\b\d{4,}\b/, 'expected a millisecond cooldown threshold in the guard')
  })

  it('bails out rather than reloading when sessionStorage is unreachable', () => {
    // The cooldown is the only bound on the reload. With storage blocked
    // (sandboxed iframe, cookies disabled) no marker survives the reload, so a
    // catch that falls through to location.reload() refreshes forever. The catch
    // must return instead — recovery is abandoned, not made unbounded.
    const [, catchBody] = guard.match(/catch\s*\([^)]*\)\s*\{([\s\S]*?)\}/) || []
    assert.ok(catchBody !== undefined, 'the storage access must be wrapped in try/catch')
    assert.match(
      catchBody,
      /\breturn\b/,
      'the sessionStorage catch must return, or a storage failure becomes an infinite reload loop',
    )
  })
})

describe('stale-deploy recovery: in-app handler (src/main.ts)', () => {
  it('handles vite:preloadError for stale lazy chunks', () => {
    assert.match(mainTs, /vite:preloadError/, 'main.ts must listen for vite:preloadError')
  })

  it('handles router.onError for navigation-time chunk failures', () => {
    assert.match(mainTs, /router\.onError/, 'main.ts must wire router.onError recovery')
  })

  it('recovers by reloading / re-navigating (not just swallowing the error)', () => {
    assert.match(mainTs, /location\.(reload|assign)\(/)
  })

  it('guards against reload loops', () => {
    assert.match(mainTs, /sessionStorage/)
  })
})
