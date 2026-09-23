// Client for the API Hub reports service (standards-api).
//
// Two reports today, both driven from the internal area:
//   Generate Report — trust-framework snapshot, as an XLSX workbook with one
//                     sheet per section. No user auth: the API calls the
//                     directory with its own certificate.
//   PII Report      — pooled directory emails, as CSV. Requires the caller to
//                     sign in at the directory first, so the export is
//                     attributed to a person rather than to the service.
//
// Downloads go through fetch rather than a plain <a href> so failures surface as
// messages in the page instead of a browser error page, and so the PII flow can
// redirect to sign-in when the session has expired.

import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { rememberSignInReturn, clearSignInReturn } from './useSignInReturn'

// Override at build time with VITE_REPORTS_API; otherwise the deployed Worker.
const API_BASE = (
  (import.meta.env.VITE_REPORTS_API as string | undefined) ||
  'https://reports-api.nebras-open-finance.com'
).replace(/\/$/, '')

export type ReportEnv = 'sandbox' | 'prod'

// Sign-in bounce, same shape as the proposals votes page and the doc repository:
// a 401 sends the browser straight to Trust Framework SSO instead of asking the
// user to click a link. A sessionStorage marker breaks the loop when the session
// never sticks (third-party cookies blocked, no access) — if we come back inside
// the cooldown and are STILL unauthorised, we say so rather than bouncing again.
// The window is deliberately generous: signing in takes a while, and erring long
// only costs a manual retry, whereas erring short costs a redirect loop.
const LOGIN_COOLDOWN_MS = 120_000

// How long a pending download survives the round trip to the directory. Past
// this the user is on a fresh visit, so we do not start a download they did not
// just ask for.
const RESUME_TTL_MS = 10 * 60_000

/** sessionStorage keys for a report whose API requires the caller to sign in. */
interface AuthBounce {
  /** Timestamp of our last redirect to sign-in — used for loop detection. */
  markerKey: string
  /** The download to resume once the user lands back here signed in. */
  resumeKey: string
}

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

/**
 * Point a sign-in URL back at the page we are on.
 *
 * Always overwrite any redirect the API supplied: the reports API fills in a
 * default of its own (today, the PII report's path), which is wrong for every
 * other page that uses this flow. The page starting the bounce is the only
 * thing that knows where the user should come back to.
 */
function withRedirect(raw: string): string {
  if (typeof window === 'undefined') return raw
  try {
    const url = new URL(raw, window.location.origin)
    url.searchParams.set('redirect', window.location.href)
    return url.toString()
  } catch {
    // Not a URL we can parse — hand it to the browser as the API gave it to us.
    return raw
  }
}

export interface UseReport {
  env: Ref<ReportEnv>
  envLabel: ComputedRef<string>
  busy: Ref<boolean>
  error: Ref<string | null>
  done: Ref<boolean>
  /** Sign-in URL, set when the API answers 401 and hands one back. */
  loginUrl: Ref<string | null>
  /** True once we have started navigating to sign-in — the page is leaving. */
  redirecting: Ref<boolean>
  /** True when sign-in came back and the API still says 401. */
  loopDetected: Ref<boolean>
  download: (path: string, fallbackName: string) => Promise<void>
  reset: () => void
  /** Clear the loop marker and run the download again. */
  retrySignIn: (run: () => Promise<void>) => void
  /** Run the download the user asked for before they were sent to sign in. */
  resumeAfterSignIn: (run: () => Promise<void>) => void
}

function useDownloader(auth?: AuthBounce): UseReport {
  const env = ref<ReportEnv>('sandbox')
  const busy = ref(false)
  const error = ref<string | null>(null)
  const done = ref(false)
  const loginUrl = ref<string | null>(null)
  const redirecting = ref(false)
  const loopDetected = ref(false)

  const envLabel = computed(() => ENV_LABEL[env.value])

  function reset(): void {
    error.value = null
    done.value = false
    loginUrl.value = null
    loopDetected.value = false
  }

  /**
   * Send the browser to sign-in, remembering the download so it can be picked
   * back up on return. Returns false — having set loopDetected — when we have
   * just come back from an attempt that did not take, so the caller shows the
   * error instead of bouncing again.
   */
  function startSignIn(target: string): boolean {
    if (!auth || typeof window === 'undefined') return false

    let marker = 0
    try {
      marker = Number(window.sessionStorage.getItem(auth.markerKey) || 0)
    } catch {
      // Storage disabled — we cannot detect a loop, so allow the redirect.
    }
    if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
      try { window.sessionStorage.removeItem(auth.markerKey) } catch { /* ignore */ }
      loopDetected.value = true
      return false
    }

    try {
      window.sessionStorage.setItem(auth.markerKey, String(Date.now()))
      window.sessionStorage.setItem(
        auth.resumeKey,
        JSON.stringify({ t: Date.now(), env: env.value }),
      )
    } catch {
      // Private mode — the bounce still works, we just cannot auto-resume.
    }

    // Belt and braces: ?redirect= asks the API to bring us back here, and this
    // brings us back ourselves if it lands the browser somewhere else.
    rememberSignInReturn()

    redirecting.value = true
    window.location.href = withRedirect(target)
    return true
  }

  function clearMarker(): void {
    if (!auth || typeof window === 'undefined') return
    try { window.sessionStorage.removeItem(auth.markerKey) } catch { /* ignore */ }
    clearSignInReturn()
  }

  function retrySignIn(run: () => Promise<void>): void {
    clearMarker()
    loopDetected.value = false
    void run()
  }

  function resumeAfterSignIn(run: () => Promise<void>): void {
    if (!auth || typeof window === 'undefined') return
    let raw: string | null = null
    try {
      raw = window.sessionStorage.getItem(auth.resumeKey)
      if (raw) window.sessionStorage.removeItem(auth.resumeKey)
    } catch {
      return
    }
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as { t?: number; env?: ReportEnv }
      if (!saved.t || Date.now() - saved.t > RESUME_TTL_MS) return
      // Come back to the environment the download was started for.
      if (saved.env === 'sandbox' || saved.env === 'prod') env.value = saved.env
    } catch {
      return
    }
    void run()
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

        // Not signed in → go to the directory rather than telling the user to.
        // startSignIn navigates away; when it declines (loop) we fall through
        // and the page renders the retry state instead.
        if (res.status === 401 && startSignIn(loginUrl.value ?? `${API_BASE}/login`)) return

        error.value = message
        return
      }

      clearMarker()
      const blob = await res.blob()
      saveBlob(blob, filenameFrom(res, fallbackName))
      done.value = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Network error'
    } finally {
      busy.value = false
    }
  }

  return {
    env, envLabel, busy, error, done, loginUrl, redirecting, loopDetected,
    download, reset, retrySignIn, resumeAfterSignIn,
  }
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

  // One download, all three sections — the API returns a workbook with an
  // Organisations, an Auth Servers and an API Resources sheet.
  async function downloadWorkbook(): Promise<void> {
    await base.download(
      `/reports/trust-framework?env=${base.env.value}`,
      `trustframework-${base.env.value}.xlsx`,
    )
  }

  return { ...base, summary, summaryBusy, loadSummary, downloadWorkbook }
}

/**
 * PII Report — pooled directory emails. Requires directory sign-in, so a 401
 * bounces the browser to Trust Framework SSO and the download resumes on return.
 */
export function usePiiReport() {
  const base = useDownloader({
    markerKey: 'nebras_pii_report_login_attempt',
    resumeKey: 'nebras_pii_report_resume',
  })

  async function downloadCsv(): Promise<void> {
    await base.download(
      `/reports/pii?env=${base.env.value}`,
      `pii-${base.env.value}.csv`,
    )
  }

  return {
    ...base,
    downloadCsv,
    /** Call from onMounted: continues a download interrupted by sign-in. */
    resume: () => base.resumeAfterSignIn(downloadCsv),
    /** Call from the retry button after a sign-in that did not take. */
    retry: () => base.retrySignIn(downloadCsv),
  }
}
