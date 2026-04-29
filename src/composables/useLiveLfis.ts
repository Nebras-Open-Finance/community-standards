// `useLiveLfis` — LFI mini-feed for TPP-facing landing pages.
//
// "Live" here counts each AuthorisationServer that exposes any of the
// requested API families — matching `/program/whats-live`, which lists one
// card per server (so a bank with retail + corporate servers counts twice).
// The dedupe key is `${OrganisationId}::${AuthorisationServerId}`, identical
// to whats-live, so the totals stay aligned.

import {
  DIRECTORY_PARTICIPANTS_URL,
  FAMILY_KEYS,
  PLACEHOLDER_LOGO_URL,
  type FamilyKey,
} from './liveEcosystem'

export interface LiveLfi {
  key: string         // stable dedupe key — `${OrganisationId}::${AuthorisationServerId}`
  name: string        // display label (CustomerFriendlyName ?? OrganisationName)
  legalName: string   // tooltip / alt text
  logoUri: string | null
}

export interface UseLiveLfisResult {
  liveLfis: Ref<LiveLfi[]>
  totalCount: Ref<number>
  loadError: Ref<boolean>
  loading: Ref<boolean>
}

interface DirectoryResource { ApiFamilyType?: string }
interface DirectoryServer {
  AuthorisationServerId?: string
  CustomerFriendlyName?: string
  CustomerFriendlyLogoUri?: string
  ApiResources?: DirectoryResource[]
}
interface DirectoryOrg {
  OrganisationId?: string
  OrganisationName?: string
  AuthorisationServers?: DirectoryServer[]
}

export function useLiveLfis(
  familyKeys: readonly FamilyKey[],
  previewCount = 6,
): UseLiveLfisResult {
  const liveLfis = ref<LiveLfi[]>([])
  const totalCount = ref<number>(0)
  const loadError = ref<boolean>(false)
  const loading = ref<boolean>(true)

  const wanted = new Set<string>(familyKeys.length ? familyKeys : FAMILY_KEYS)

  async function load(): Promise<void> {
    try {
      const res = await fetch(DIRECTORY_PARTICIPANTS_URL)
      if (!res.ok) { loadError.value = true; return }
      const data = (await res.json()) as unknown
      if (!Array.isArray(data)) { loadError.value = true; return }

      const seen = new Set<string>()
      const accepted: LiveLfi[] = []

      for (const o of data) {
        const org = o as DirectoryOrg
        if (!org.AuthorisationServers?.length) continue

        // One entry per AuthorisationServer that exposes any of the wanted
        // families — same shape `/program/whats-live` uses.
        for (const server of org.AuthorisationServers) {
          const exposes = (server.ApiResources || []).some(
            (r) => typeof r.ApiFamilyType === 'string' && wanted.has(r.ApiFamilyType),
          )
          if (!exposes) continue

          const key = `${org.OrganisationId || org.OrganisationName || ''}::${
            server.AuthorisationServerId || server.CustomerFriendlyName || ''
          }`
          if (seen.has(key)) continue
          seen.add(key)

          accepted.push({
            key,
            name: server.CustomerFriendlyName || org.OrganisationName || '',
            legalName: org.OrganisationName || server.CustomerFriendlyName || '',
            logoUri: server.CustomerFriendlyLogoUri || PLACEHOLDER_LOGO_URL,
          })
        }
      }

      totalCount.value = accepted.length
      liveLfis.value = accepted.slice(0, previewCount)
    } catch {
      loadError.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(() => { void load() })

  return { liveLfis, totalCount, loadError, loading }
}
