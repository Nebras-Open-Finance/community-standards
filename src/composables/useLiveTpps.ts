// `useLiveTpps` — TPP mini-feed for LFI-facing landing pages.
//
// "Live" here means "called the API for the requested family in the last 30
// days" — matching the rolling window `/program/whats-live` uses for the
// TPP tab. The cutoff is computed relative to the latest log entry (not the
// current wall clock) so the figure is stable even if the log lags.
//
// `/api/trust-framework.json` provides logo / legal-name lookup. URLs in
// `/api/api-log.json` follow the shape `open-finance/{family}/v{ver}/...`.

import {
  API_LOG_URL,
  FAMILY_URL_PREFIX,
  FAMILY_KEYS,
  LIVE_TPP_DAYS_WINDOW,
  TRUST_FRAMEWORK_PROXY_URL,
  type FamilyKey,
} from './liveEcosystem'

export interface LiveTpp {
  name: string
  legalName: string
  logoUri: string | null
}

export interface UseLiveTppsResult {
  liveTpps: Ref<LiveTpp[]>
  totalCount: Ref<number>
  loadError: Ref<boolean>
  loading: Ref<boolean>
}

interface DirectoryOrg {
  name: string
  legalName: string
  logoUri: string
  type: 'LFI' | 'TPP'
}

interface ApiLogRow {
  date?: string
  tppname?: string
  url?: string
}

export function useLiveTpps(
  familyKeys: readonly FamilyKey[],
  previewCount = 6,
): UseLiveTppsResult {
  const liveTpps = ref<LiveTpp[]>([])
  const totalCount = ref<number>(0)
  const loadError = ref<boolean>(false)
  const loading = ref<boolean>(true)

  const wanted = new Set<string>(
    (familyKeys.length ? familyKeys : FAMILY_KEYS).map((k) => FAMILY_URL_PREFIX[k]),
  )

  async function load(): Promise<void> {
    try {
      const [directoryRes, logRes] = await Promise.all([
        fetch(TRUST_FRAMEWORK_PROXY_URL),
        fetch(API_LOG_URL),
      ])
      if (!directoryRes.ok || !logRes.ok) { loadError.value = true; return }
      const directory = (await directoryRes.json()) as unknown
      const log = (await logRes.json()) as unknown
      if (!Array.isArray(directory) || !Array.isArray(log)) {
        loadError.value = true; return
      }

      const tppLookup = new Map<string, DirectoryOrg>()
      for (const o of directory) {
        const org = o as Partial<DirectoryOrg>
        if (org.type === 'TPP' && typeof org.name === 'string') {
          tppLookup.set(org.name.toUpperCase(), org as DirectoryOrg)
        }
      }

      // Anchor the rolling window on the latest log entry — keeps counts
      // stable even when the log lags real time.
      const latestMs = log.reduce<number>((max, r) => {
        const row = r as Partial<ApiLogRow>
        const t = Date.parse(row.date || '')
        return Number.isFinite(t) && t > max ? t : max
      }, 0)
      const cutoffMs = latestMs - (LIVE_TPP_DAYS_WINDOW - 1) * 24 * 60 * 60 * 1000

      const seen = new Set<string>()
      const consumers: string[] = []
      for (const r of log) {
        const row = r as Partial<ApiLogRow>
        if (!row.tppname || typeof row.url !== 'string') continue
        if (latestMs > 0) {
          const ts = Date.parse(row.date || '')
          if (!Number.isFinite(ts) || ts < cutoffMs) continue
        }
        const parts = row.url.split('/')
        if (parts[0] !== 'open-finance') continue
        const urlFamily = parts[1] || ''
        if (!wanted.has(urlFamily)) continue

        const key = row.tppname.toUpperCase()
        if (seen.has(key)) continue
        seen.add(key)
        consumers.push(row.tppname)
      }

      totalCount.value = consumers.length
      liveTpps.value = consumers.slice(0, previewCount).map((name) => {
        const match = tppLookup.get(name.toUpperCase())
        return {
          name,
          legalName: match?.legalName ?? name,
          logoUri: match?.logoUri ?? null,
        }
      })
    } catch {
      loadError.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(() => { void load() })

  return { liveTpps, totalCount, loadError, loading }
}
