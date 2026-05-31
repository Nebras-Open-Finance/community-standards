import { computed, type ComputedRef } from 'vue'
import { apiRef, type SidebarItem } from './shared'
import {
  allEndpoints,
  endpointUrl,
  type Endpoint,
  type Surface,
} from '../endpoints'
import { useSelectedVersion } from '../../composables/useSelectedVersion'
import type { Version } from '../versions'

const SURFACE_ORDER: readonly Surface[] = ['standards', 'api-hub', 'ozone-connect']

const SURFACE_LABEL: Record<Surface, string> = {
  standards: 'TPP - Standards',
  'api-hub': 'API Hub',
  'ozone-connect': 'Ozone Connect',
}

// Trust Framework is the Raidiam-operated directory and is not versioned with
// the rest of UAE Open Finance — no registry surface backs it, so its sidebar
// entries are hand-rolled.
const TRUST_FRAMEWORK_GROUP: SidebarItem = {
  text: 'Trust Framework',
  items: [
    {
      text: 'Participants',
      collapsed: true,
      items: [
        apiRef('GET', '/participants', '/tech/api-specs/trust-framework/participants'),
      ],
    },
    {
      text: 'Token',
      collapsed: true,
      items: [
        apiRef('POST', '/token', '/tech/api-specs/trust-framework/token'),
      ],
    },
    {
      text: 'Organisations',
      collapsed: true,
      items: [
        apiRef('GET', '/organisations', '/tech/api-specs/trust-framework/organisations'),
        apiRef('GET', '/organisations/{OrganisationId}/authorisationservers', '/tech/api-specs/trust-framework/auth-servers'),
        apiRef('GET', '/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources', '/tech/api-specs/trust-framework/api-resources'),
        apiRef('GET', '/organisations/{OrganisationId}/softwarestatements', '/tech/api-specs/trust-framework/software-statements'),
      ],
    },
    {
      text: 'References',
      collapsed: true,
      items: [
        apiRef('GET', '/references/apifamilies', '/tech/api-specs/trust-framework/api-families'),
      ],
    },
  ],
}

/**
 * Build the API Specs sidebar for a given version. Result is suitable for
 * passing to `<EdHoverSidebar :items="...">`.
 */
export function buildApiSpecsSidebar(version: Version): SidebarItem[] {
  const endpoints = allEndpoints.filter((e) => e.version === version)
  const caapEndpoints = endpoints.filter((e) => e.sectionSlug === 'caap')
  const nonCaapEndpoints = endpoints.filter((e) => e.sectionSlug !== 'caap')

  const surfaceGroups = SURFACE_ORDER.map<SidebarItem>((surface) => {
    const surfaceEndpoints = nonCaapEndpoints.filter((e) => e.surface === surface)

    const sections = groupBy(surfaceEndpoints, (e) => e.section)

    const sectionItems: SidebarItem[] = sections.map(([sectionLabel, sectionEndpoints]) => {
      const subsections = groupBy(sectionEndpoints, (e) => e.subsection ?? '')
      const hasSubsections = subsections.some(([key]) => key !== '')

      const items: SidebarItem[] = hasSubsections
        ? subsections.map(([subLabel, subEndpoints]) => {
          if (subLabel === '') {
            return subEndpoints.map(toLeaf)
          }
          return [{
            text: subLabel,
            items: subEndpoints.map(toLeaf),
          }]
        }).flat()
        : sectionEndpoints.map(toLeaf)

      return {
        text: sectionLabel,
        collapsed: true,
        items,
      }
    })

    return {
      text: SURFACE_LABEL[surface],
      items: sectionItems,
    }
  })

  const caapGroup: SidebarItem | null = caapEndpoints.length === 0 ? null : (() => {
    const subsections = groupBy(caapEndpoints, (e) => e.subsection ?? '')
    const items: SidebarItem[] = subsections
      .map(([subLabel, subEndpoints]) => {
        if (subLabel === '') return subEndpoints.map(toLeaf)
        return [{ text: subLabel, collapsed: true, items: subEndpoints.map(toLeaf) }]
      })
      .flat()
    return { text: 'CAAP', collapsed: true, items }
  })()

  return [...surfaceGroups, TRUST_FRAMEWORK_GROUP, ...(caapGroup ? [caapGroup] : [])]
}

function toLeaf(e: Endpoint): SidebarItem {
  return apiRef(e.method, e.path, endpointUrl(e))
}

function groupBy<T, K>(items: readonly T[], keyOf: (item: T) => K): [K, T[]][] {
  const map = new Map<K, T[]>()
  for (const item of items) {
    const key = keyOf(item)
    const list = map.get(key)
    if (list) list.push(item)
    else map.set(key, [item])
  }
  return [...map.entries()]
}

/**
 * Reactive sidebar that follows the selected version — used by both the
 * catalog landing page and per-endpoint dynamic pages.
 */
export function useApiSpecsSidebar(): ComputedRef<SidebarItem[]> {
  const { selectedVersion } = useSelectedVersion()
  return computed(() => buildApiSpecsSidebar(selectedVersion.value))
}
