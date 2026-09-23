// Come back to the page that sent you to sign in.
//
// Every Trust Framework sign-in on this site is a top-level bounce to an API
// that owns the OAuth round trip (the reports API, the voting API, the doc
// repository API): we leave the site, the API talks to the directory, and the
// API decides where the browser lands afterwards. We pass ?redirect=<this page>
// so it can send us back — but the return hop is the API's to make, and when it
// drops us somewhere else (the reports API lands some journeys on the site root)
// the user has to find their way back and start again.
//
// So we also remember the page locally, before leaving, and put the browser back
// on it if we return anywhere else. sessionStorage is the right store: it is
// per-tab, survives the cross-origin round trip in that tab, and disappears when
// the tab does — so the memory cannot leak into an unrelated later visit.
//
// Any page with a sign-in bounce gets this by calling rememberSignInReturn()
// immediately before navigating away; the return hop itself is wired once, in
// main.ts, and needs no per-page code.

import type { Router } from 'vue-router'

const RETURN_KEY = 'nebras_signin_return'

// How long a remembered page stays valid. Long enough to sign in at the
// directory (which can mean a password, an MFA prompt and a consent screen),
// short enough that it cannot fire on a visit the user starts later.
const RETURN_TTL_MS = 10 * 60_000

interface PendingReturn {
  /** Full path, including query and hash, e.g. "/internal/pages/pii-report". */
  p: string
  /** When the bounce started. */
  t: number
}

/** Trailing slashes differ between our routes and the API's redirect values. */
function normalise(path: string): string {
  const cut = path.search(/[?#]/)
  const pathname = cut === -1 ? path : path.slice(0, cut)
  const rest = cut === -1 ? '' : path.slice(cut)
  return (pathname.replace(/\/+$/, '') || '/') + rest
}

/** The current page as a router path — where a sign-in bounce should return to. */
export function currentFullPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname + window.location.search + window.location.hash
}

/**
 * Remember the page a sign-in bounce is leaving from. Call this immediately
 * before navigating to an API's /login endpoint.
 */
export function rememberSignInReturn(fullPath?: string): void {
  if (typeof window === 'undefined') return
  const entry: PendingReturn = { p: fullPath ?? currentFullPath(), t: Date.now() }
  try {
    window.sessionStorage.setItem(RETURN_KEY, JSON.stringify(entry))
  } catch {
    // Private mode — the bounce still works, we just cannot correct the landing.
  }
}

/** Forget any remembered page (e.g. the user abandoned the sign-in). */
export function clearSignInReturn(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(RETURN_KEY)
  } catch {
    // ignore
  }
}

/**
 * Where this document load should be redirected to, if anywhere. Consumes the
 * remembered page, so it can only ever fire once per bounce.
 *
 * Returns a path only when all of these hold:
 *  - a bounce from this tab is still within its TTL;
 *  - we did not land on the page the bounce started from; and
 *  - we arrived from outside the site (the directory or the API), not from a
 *    link on the site — a same-origin referrer means the user navigated here
 *    deliberately and we must not drag them somewhere else.
 */
export function signInReturnTarget(landingFullPath: string): string | null {
  if (typeof window === 'undefined') return null

  let raw: string | null = null
  try {
    raw = window.sessionStorage.getItem(RETURN_KEY)
    if (raw) window.sessionStorage.removeItem(RETURN_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  let entry: PendingReturn
  try {
    entry = JSON.parse(raw) as PendingReturn
  } catch {
    return null
  }
  if (!entry?.p || !entry.t || Date.now() - entry.t > RETURN_TTL_MS) return null

  // Only ever return to our own site, and only to a path — never to an absolute
  // URL a remembered value might have been tampered into.
  if (!entry.p.startsWith('/') || entry.p.startsWith('//')) return null

  if (normalise(entry.p) === normalise(landingFullPath)) return null

  const referrer = document.referrer
  if (referrer) {
    try {
      if (new URL(referrer).origin === window.location.origin) return null
    } catch {
      // Unparseable referrer — treat it as external.
    }
  }

  return entry.p
}

/**
 * Wire the return hop into the router. Registered once, on the client, for the
 * first navigation of a document load: a redirect decided here happens before
 * anything renders, so the user sees the page they signed in for, not a flash of
 * wherever the API dropped them.
 */
export function installSignInReturn(router: Router): void {
  let checked = false
  router.beforeEach((to) => {
    if (checked) return true
    checked = true
    return signInReturnTarget(to.fullPath) ?? true
  })
}
