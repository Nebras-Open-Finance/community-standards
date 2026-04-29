// Shared route-resolution logic. Mirrors what vite-plugin-pages emits and
// vue-router resolves at runtime, so tests that walk static `<a href>` /
// `<RouterLink to>` / sidebar links can ask "does this URL correspond to a
// real `.vue`/`.md` file under src/pages/ — or, for /tech/api-specs paths,
// a registered endpoint in the dynamic catch-all?".
//
//   "/"            → src/pages/index.vue
//   "/foo/bar/"    → src/pages/foo/bar/index.{vue,md}
//   "/foo/bar"     → src/pages/foo/bar.{vue,md}, then foo/bar/index.{vue,md}
//   "/tech/api-specs/v2.1/tpp/.../slug"  →  endpointUrl round-trip via [...slug].vue

import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HELPERS_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HELPERS_DIR, '..', '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages')

/**
 * Resolve a site-absolute path (`/foo/bar/`, `/foo/bar`) to the .vue/.md file
 * that vite-plugin-pages would render for it. Returns the absolute path of
 * the file, or null if no static page matches.
 *
 * Trailing slash is treated as advisory: `/foo/` matches both `foo/index.vue`
 * and `foo.vue`, mirroring how Cloudflare Pages serves either request from
 * a single emitted `foo.html`. The test cares about "is there a page?", not
 * about strict route equivalence.
 *
 * Does NOT cover dynamic catch-all routes — for those, callers should fall
 * through to a registry lookup (e.g. `getEndpointBySlug`) when this returns
 * null but the prefix matches a known dynamic mount point.
 */
export function resolveSiteLink(link) {
  const cleaned = link.replace(/#.*$/, '').replace(/\?.*$/, '')
  if (!cleaned.startsWith('/')) return null
  const bare = cleaned.replace(/^\//, '').replace(/\/$/, '')
  if (!bare) {
    for (const ext of ['.vue', '.md']) {
      const home = resolve(PAGES, 'index' + ext)
      if (existsSync(home)) return home
    }
    return null
  }
  const candidates = [
    resolve(PAGES, bare + '.vue'),
    resolve(PAGES, bare + '.md'),
    resolve(PAGES, bare, 'index.vue'),
    resolve(PAGES, bare, 'index.md'),
  ]
  for (const c of candidates) if (existsSync(c)) return c
  return null
}

export const PAGES_DIR = PAGES
export const ROOT_DIR = ROOT
