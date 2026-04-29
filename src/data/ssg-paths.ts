// Phase 5b-v — central SSG path-enumeration helper.
//
// `vite.config.ts` `ssgOptions.includedRoutes(paths)` rewrites generated
// dynamic-route placeholders (`/foo/:id`) into one concrete path per data
// row, so vite-ssg can materialise the static HTML. The list of dynamic
// routes is small but growing — keeping the expansion table here lets the
// build config stay declarative.
//
// Each entry pairs a dynamic-route placeholder (the path vite-plugin-pages
// emits from `[id].vue` / `[year].vue` / `[version].vue` filenames) with a
// pure function that maps it to one or more concrete paths.

// Relative imports — `@/...` aliases aren't resolved when this module is
// loaded by Node from `vite.config.ts` (Vite's resolver only kicks in for
// source code, not the config file itself).
import { docRepoIds } from './doc-repo-orgs'
import { apiHubYears } from './api-hub-releases-registry'
import { trustFrameworkYears } from './trust-framework-releases-registry'
import { errataVersions } from './erratas-registry'
import { allEndpoints, endpointUrl, sectionUrl, surfaceUrl } from './endpoints'

// Trailing-slash policy mirrors what VitePress's `cleanUrls` produces today
// (`/doc-repository/{id}/`, `/erratas/{version}/`). Year pages historically
// have no trailing slash — keep both patterns identical to the docs build
// so external links don't break at cut-over.
type Expander = (placeholder: string) => string[] | null

const expanders: Expander[] = [
  (p) => (p === '/doc-repository/:id'
    ? docRepoIds.map((id) => `/doc-repository/${id}/`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/release-notes/api-hub/:year'
    ? apiHubYears.map((y) => `/tech/release-notes-and-erratas/release-notes/api-hub/${y}`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/release-notes/trust-framework/:year'
    ? trustFrameworkYears.map((y) => `/tech/release-notes-and-erratas/release-notes/trust-framework/${y}`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/erratas/:version'
    ? errataVersions.map((v) => `/tech/release-notes-and-erratas/erratas/${v}/`)
    : null),
  // Phase 6 — the `[...notFound].vue` catch-all materialises as a vue-router
  // path-matcher placeholder (`/:notFound(.*)*`). vite-ssg has no route to
  // pre-render here (the route is purely a runtime fallback), so drop it
  // from the static path list. Returning `[]` filters the placeholder out.
  (p) => (p === '/:notFound(.*)*' ? [] : null),
  (p) => (p === '/tech/api-specs/:slug(.+)'
    ? [
      ...allEndpoints.map(endpointUrl),
      ...apiSpecsListingPaths(),
    ]
    : null),
]

/**
 * Surface- and section-level listing paths for the API Specs catch-all.
 * Each unique (surface, version) and (surface, version, sectionSlug) tuple
 * materialises one HTML page that lists the endpoints in scope.
 */
function apiSpecsListingPaths(): string[] {
  const paths = new Set<string>()
  for (const e of allEndpoints) {
    paths.add(surfaceUrl(e.surface, e.version))
    paths.add(sectionUrl(e.surface, e.version, e.sectionSlug))
  }
  return [...paths]
}

/**
 * Expand a single dynamic-route placeholder into all concrete paths it
 * should materialise as static HTML. Returns the placeholder unchanged for
 * routes that aren't in the table (i.e. static routes pass through).
 */
export function expandSsgPath(placeholder: string): string | string[] {
  for (const expand of expanders) {
    const out = expand(placeholder)
    if (out !== null) return out
  }
  return placeholder
}
