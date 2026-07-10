// Sandbox Trust Framework identity, for pre-filling forms from the signed-in
// user rather than having them type their org/name. Same SSO the Proposals and
// Document Repository features use: the Cloudflare Worker exposes GET /me (with
// the session cookie) and a top-level /login?redirect= flow. We only read
// identity here — no submission is sent to the Worker; the certification bundle
// is generated entirely client-side.

import { ref, type Ref } from 'vue'

const API_BASE = (
  (import.meta.env.VITE_PROPOSALS_API as string | undefined) ||
  'https://proposals-api.nebras-open-finance.com'
).replace(/\/$/, '')

export interface SandboxOrg {
  id: string
  name: string
}

export interface SandboxAuthState {
  // Flips true once the first /me call resolves, so the UI can avoid flashing a
  // "sign in" prompt before we know whether there is a session.
  loaded: boolean
  authenticated: boolean
  name?: string | undefined
  email?: string | undefined
  orgs: SandboxOrg[]
}

const auth: Ref<SandboxAuthState> = ref({ loaded: false, authenticated: false, orgs: [] })

// Normalise the orgs field, which the Worker returns either as objects
// ({ id, name }) or as bare strings depending on the endpoint.
function normaliseOrgs(raw: unknown): SandboxOrg[] {
  if (!Array.isArray(raw)) return []
  return raw.map((o) =>
    typeof o === 'string' ? { id: o, name: o } : { id: String(o?.id ?? o?.name ?? ''), name: String(o?.name ?? o?.id ?? '') },
  ).filter((o) => o.name)
}

// Load the current session. Sends the session cookie; on any failure the user is
// treated as signed out.
async function loadMe(): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: 'include' })
    if (!res.ok) {
      auth.value = { loaded: true, authenticated: false, orgs: [] }
      return
    }
    const d = (await res.json()) as {
      authenticated?: boolean
      name?: string
      email?: string
      orgs?: unknown
    }
    auth.value = {
      loaded: true,
      authenticated: !!d.authenticated,
      name: d.name,
      email: d.email,
      orgs: normaliseOrgs(d.orgs),
    }
  } catch {
    auth.value = { loaded: true, authenticated: false, orgs: [] }
  }
}

// Send the user through Sandbox Trust Framework SSO, returning to the current
// page. Top-level navigation so the directory can set its cookies and redirect
// back signed in.
function signIn(): void {
  if (typeof window === 'undefined') return
  const redirect = encodeURIComponent(window.location.href)
  window.location.href = `${API_BASE}/login?redirect=${redirect}`
}

export interface UseSandboxAuth {
  auth: Ref<SandboxAuthState>
  loadMe: () => Promise<void>
  signIn: () => void
}

export function useSandboxAuth(): UseSandboxAuth {
  return { auth, loadMe, signIn }
}
