// Client for the API Hub reports service (standards-api).
//
// Two reports today, both CSV downloads driven from the internal area:
//   Generate Report — trust-framework snapshot. No user auth: the API calls the
//                     directory with its own certificate.
//   PII Report      — pooled directory emails. Requires the caller to sign in at
//                     the directory first, so the export is attributed to a
//                     person rather than to the service.
//
// Downloads go through fetch rather than a plain <a href> so failures surface as
// messages in the page instead of a browser error page, and so the PII flow can
// redirect to sign-in when the session has expired.

import { ref, computed, type Ref, type ComputedRef } from 'vue'

// Override at build time with VITE_REPORTS_API; otherwise the deployed Worker.
const API_BASE = (
  (import.meta.env.VITE_REPORTS_API as string | undefined) ||
  'https://reports-api.nebras-open-finance.com'
).replace(/\/$/, '')

export type ReportEnv = 'sandbox' | 'prod'

/** The label the UI shows. The API only ever accepts 'sandbox' | 'prod'. */
export const ENV_LABEL: Record<ReportEnv, string> = {
  sandbox: 'Sandbox',
  prod: 'Production',
}

export interface TrustFrameworkSummary {
  env: ReportEnv
  organisations: number
  authServers: number
  apiResources: number
}

/** Pull the filename the server suggested, falling back to a sensible default. */
function filenameFrom(res: Response, fallback: string): string {
  const cd = res.headers.get('Content-Disposition') || ''
  const match = cd.match(/filename="?([^";]+)"?/i)
  return match?.[1] ?? fallback
}

/** Save a Blob to disk. Object URL is revoked so the blob can be collected. */
function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export interface UseReport {
  env: Ref<ReportEnv>
  envLabel: ComputedRef<string>
  busy: Ref<boolean>
  error: Ref<string | null>
  done: Ref<boolean>
  /** Sign-in URL, set when the API answers 401 and hands one back. */
  loginUrl: Ref<string | null>
  download: (path: string, fallbackName: string) => Promise<void>
  reset: () => void
}

function useDownloader(): UseReport {
  const env = ref<ReportEnv>('sandbox')
  const busy = ref(false)
  const error = ref<string | null>(null)
  const done = ref(false)
  const loginUrl = ref<string | null>(null)

  const envLabel = computed(() => ENV_LABEL[env.value])

  function reset(): void {
    error.value = null
    done.value = false
    loginUrl.value = null
  }

  async function download(path: string, fallbackName: string): Promise<void> {
    reset()
    busy.value = true
    try {
      // credentials: the PII report reads a session cookie set by the directory
      // sign-in; the trust-framework report ignores it harmlessly.
      const res = await fetch(`${API_BASE}${path}`, { credentials: 'include' })

      if (!res.ok) {
        // The API answers JSON on failure, including a login_url on 401.
        let message = `Request failed (${res.status})`
        try {
          const body = await res.json()
          if (body?.error) message = body.error
          if (body?.login_url) loginUrl.value = body.login_url
        } catch {
          // non-JSON error body — keep the status message
        }
        error.value = message
        return
      }

      const blob = await res.blob()
      saveBlob(blob, filenameFrom(res, fallbackName))
      done.value = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Network error'
    } finally {
      busy.value = false
    }
  }

  return { env, envLabel, busy, error, done, loginUrl, download, reset }
}

/** Generate Report — trust-framework snapshot. */
export function useTrustFrameworkReport() {
  const base = useDownloader()
  const summary = ref<TrustFrameworkSummary | null>(null)
  const summaryBusy = ref(false)

  async function loadSummary(): Promise<void> {
    summary.value = null
    summaryBusy.value = true
    try {
      const res = await fetch(
        `${API_BASE}/reports/trust-framework/summary?env=${base.env.value}`,
        { credentials: 'include' },
      )
      if (res.ok) summary.value = await res.json()
    } catch {
      // The summary is a nicety — a failure here must not block the download.
    } finally {
      summaryBusy.value = false
    }
  }

  // One download, all three sections — the API returns them in a single file
  // with a leading Sheet column.
  async function downloadCsv(): Promise<void> {
    await base.download(
      `/reports/trust-framework?env=${base.env.value}`,
      `trustframework-${base.env.value}.csv`,
    )
  }

  return { ...base, summary, summaryBusy, loadSummary, downloadCsv }
}

/** PII Report — pooled directory emails. Requires directory sign-in. */
export function usePiiReport() {
  const base = useDownloader()

  async function downloadCsv(): Promise<void> {
    await base.download(
      `/reports/pii?env=${base.env.value}`,
      `pii-${base.env.value}.csv`,
    )
  }

  return { ...base, downloadCsv }
}
