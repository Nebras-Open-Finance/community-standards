import type { Endpoint, Surface } from './types'
import type { Version } from '../versions'
import { standardsEndpoints } from './standards'
import { apiHubEndpoints } from './api-hub'
import { ozoneConnectEndpoints } from './ozone-connect'

export type { Endpoint, EndpointRedoc, HttpMethod, OverrideServer, Surface } from './types'

/** Every endpoint across every surface and version. */
export const allEndpoints: readonly Endpoint[] = [
  ...standardsEndpoints,
  ...apiHubEndpoints,
  ...ozoneConnectEndpoints,
]

// The `standards` surface uses URL segment `tpp` for backwards-compat with
// existing public links; the others use their surface name directly.
const SURFACE_TO_URL: Record<Surface, string> = {
  standards: 'tpp',
  'api-hub': 'api-hub',
  'ozone-connect': 'ozone-connect',
}

const URL_TO_SURFACE: Record<string, Surface> = {
  tpp: 'standards',
  'api-hub': 'api-hub',
  'ozone-connect': 'ozone-connect',
}

export function surfaceToUrlSegment(surface: Surface): string {
  return SURFACE_TO_URL[surface]
}

export function urlSegmentToSurface(segment: string): Surface | undefined {
  return URL_TO_SURFACE[segment]
}

/**
 * Build the canonical URL for a single endpoint:
 *   `/tech/api-specs/<version>/<urlSegment>/<sectionSlug>/<slug>`
 * `sectionSlug` may contain a `/` (e.g. `headless-heimdall/open-api`); it is
 * preserved verbatim — the catch-all route handles arbitrary depth.
 */
export function endpointUrl(endpoint: Endpoint): string {
  const seg = surfaceToUrlSegment(endpoint.surface)
  return `/tech/api-specs/${endpoint.version}/${seg}/${endpoint.sectionSlug}/${endpoint.slug}`
}

/**
 * Resolve an endpoint by its URL tail (everything after `/tech/api-specs/`).
 * Returns undefined if the tail doesn't match any registered endpoint.
 */
export function getEndpointBySlug(tail: string): Endpoint | undefined {
  const trimmed = tail.replace(/^\/+|\/+$/g, '')
  return allEndpoints.find((e) => endpointUrl(e) === `/tech/api-specs/${trimmed}`)
}

export function getEndpointsForVersion(version: Version): Endpoint[] {
  return allEndpoints.filter((e) => e.version === version)
}

export function getEndpointsForSurface(surface: Surface, version?: Version): Endpoint[] {
  return allEndpoints.filter(
    (e) => e.surface === surface && (version === undefined || e.version === version),
  )
}

export type SectionScope =
  | {
      kind: 'surface'
      surface: Surface
      version: Version
      endpoints: Endpoint[]
    }
  | {
      kind: 'section'
      surface: Surface
      version: Version
      sectionSlug: string
      sectionLabel: string
      endpoints: Endpoint[]
    }

/**
 * Resolve a non-leaf URL tail (`<version>/<surface>` or
 * `<version>/<surface>/<sectionSlug>`) to the listing scope it describes.
 * Returns undefined if the tail doesn't match any registered surface or
 * section. A trailing typo segment falls back to the parent section so a
 * mistyped endpoint URL still lands somewhere useful.
 */
export function getSectionScope(tail: string): SectionScope | undefined {
  const trimmed = tail.replace(/^\/+|\/+$/g, '')
  const segments = trimmed.split('/').filter(Boolean)
  if (segments.length < 2) return undefined

  const versionSeg = segments[0]!
  const surfaceSeg = segments[1]!
  const rest = segments.slice(2)
  const surface = urlSegmentToSurface(surfaceSeg)
  if (!surface) return undefined

  const versioned = allEndpoints.filter(
    (e) => e.surface === surface && e.version === versionSeg,
  )
  if (versioned.length === 0) return undefined
  const version = versionSeg as Version

  if (rest.length === 0) {
    return { kind: 'surface', surface, version, endpoints: versioned }
  }

  for (let i = rest.length; i > 0; i--) {
    const candidate = rest.slice(0, i).join('/')
    const matches = versioned.filter((e) => e.sectionSlug === candidate)
    if (matches.length > 0) {
      return {
        kind: 'section',
        surface,
        version,
        sectionSlug: candidate,
        sectionLabel: matches[0]!.section,
        endpoints: matches,
      }
    }
  }

  return undefined
}

/**
 * Build the canonical URL for a section listing under a given surface and
 * version: `/tech/api-specs/<version>/<urlSegment>/<sectionSlug>`.
 */
export function sectionUrl(surface: Surface, version: Version, sectionSlug: string): string {
  const seg = surfaceToUrlSegment(surface)
  return `/tech/api-specs/${version}/${seg}/${sectionSlug}`
}

/**
 * Build the canonical URL for a surface listing:
 *   `/tech/api-specs/<version>/<urlSegment>`.
 */
export function surfaceUrl(surface: Surface, version: Version): string {
  const seg = surfaceToUrlSegment(surface)
  return `/tech/api-specs/${version}/${seg}`
}
