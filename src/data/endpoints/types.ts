// Endpoint registry — shared types.
//
// Drives the API Specs catalog landing page, the per-endpoint dynamic page
// (`pages/tech/api-specs/[...slug].vue`), and the in-page sidebar
// (`data/sidebars/api-specs.ts`). Every entry mirrors a single endpoint
// invocation under `docs/tech/api-specs/v*/<surface>/<section>/<slug>.md`,
// capturing the `<RedocWrapper>` props the corresponding include passes plus
// the sidebar grouping the existing VitePress config emits.

import type { Version } from '../versions'

export type Surface = 'standards' | 'api-hub' | 'ozone-connect'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface OverrideServer {
  url: string
  description?: string
}

/**
 * Mirrors the prop surface of `<RedocWrapper>`. Every field except `spec`
 * is optional — most endpoints only need `spec` + `filterPath`. Webhook /
 * schema-only entries use `filterSchema` + `displayPath` + `patchSchemas`
 * instead of `filterPath`.
 */
export interface EndpointRedoc {
  spec: string
  filterPath?: string
  filterMethod?: HttpMethod | Lowercase<HttpMethod>
  displayPath?: string
  overrideServers?: OverrideServer[]
  hideSecurity?: boolean
  filterSchema?: string
  patchSchemas?: Record<string, unknown>
}

export interface Endpoint {
  /** Top-level group: which audience the endpoint is for. */
  surface: Surface
  /** Spec version this entry applies to (e.g. 'v2.1'). */
  version: Version
  /** Sidebar group label — e.g. 'Bank Data Sharing'. */
  section: string
  /** URL segment that follows the surface — e.g. 'data-sharing'. */
  sectionSlug: string
  /** Optional nested group label — e.g. 'Create Consent', 'Health Check'. */
  subsection?: string
  /** URL leaf — e.g. 'accounts-AccountId-balances'. */
  slug: string
  /** HTTP method shown in the sidebar badge. */
  method: HttpMethod
  /** Path label shown next to the badge — e.g. '/accounts/{AccountId}/balances'. */
  path: string
  /** H1 rendered above the Redoc viewer. */
  title: string
  /** Props passed to `<RedocWrapper>` on the per-endpoint page. */
  redoc: EndpointRedoc
}
