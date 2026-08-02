// Each entry pairs a dynamic-route placeholder (the path vite-plugin-pages
// emits from `[id].vue` / `[year].vue` / `[version].vue` filenames) with a
// pure function that maps it to one or more concrete paths for vite-ssg.
//
// Relative imports — `@/...` aliases aren't resolved when this module is
// loaded by Node from `vite.config.ts`.
import { docRepoIds } from './doc-repo-orgs'
import { apiHubYears } from './api-hub-releases-registry'
import { trustFrameworkYears } from './trust-framework-releases-registry'
import { errataVersions } from './erratas-registry'
import { changelogVersions } from './version-changes-registry'
import { allEndpoints, endpointUrl, sectionUrl, surfaceUrl } from './endpoints'

// Trailing-slash policy: doc-repository and erratas use a trailing slash
// (`/doc-repository/{id}/`); year pages don't. Don't change either —
// existing external links depend on these shapes.
type Expander = (placeholder: string) => string[] | null

const expanders: Expander[] = [
  (p) => (p === '/doc-repository/:id'
    ? docRepoIds.map((id) => `/doc-repository/${id}/`)
    : null),
  // Proposals & Voting — each proposal is its own authored static page
  // (`src/pages/proposals/<id>.vue`), so vite-plugin-pages enumerates them
  // directly; no dynamic expander needed here.
  // The per-proposal votes breakdown (`proposals/[id]/votes.vue`) is an
  // admin-only, unlinked page: returning [] keeps it OUT of the static build
  // and sitemap (no direct link), so it resolves client-side only — like the
  // internal draft route below. Auth + data are gated by the proposals Worker.
  (p) => (p === '/proposals/:id/votes' ? [] : null),
  (p) => (p === '/tech/release-notes-and-erratas/release-notes/api-hub/:year'
    ? apiHubYears.map((y) => `/tech/release-notes-and-erratas/release-notes/api-hub/${y}`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/release-notes/trust-framework/:year'
    ? trustFrameworkYears.map((y) => `/tech/release-notes-and-erratas/release-notes/trust-framework/${y}`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/erratas/:version'
    ? errataVersions.map((v) => `/tech/release-notes-and-erratas/erratas/${v}/`)
    : null),
  (p) => (p === '/tech/release-notes-and-erratas/changelog/:version'
    ? changelogVersions.map((v) => `/tech/release-notes-and-erratas/changelog/${v}/`)
    : null),
  // The `[...notFound].vue` catch-all is a runtime-only fallback;
  // returning `[]` drops it from the static path list.
  (p) => (p === '/:notFound(.*)*' ? [] : null),
  // Internal draft pages live in browser localStorage only — there are no
  // known slugs at build time, and the route only resolves client-side.
  (p) => (p === '/internal/draft/:slug' ? [] : null),
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
