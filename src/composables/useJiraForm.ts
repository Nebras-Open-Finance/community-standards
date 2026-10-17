// Ticket-gated Jira forms: a form is shown only once the API confirms that the
// signed-in Sandbox Trust Framework user can see the Jira ticket it relates to.
//
// Shared by every SSO form under /internal/pages/jira-forms/ via JiraFormShell
// (all of them except Sandbox onboarding — see src/data/jiraForms.ts). The
// check runs on the proposals API (standards-api, services/jira), which holds the
// Jira credentials and the same SSO session as useSandboxAuth. Access mirrors the
// Service Desk portal: reporter, participant, or member of a JSM organisation the
// request is shared with; proposals admins get every ticket. The page hiding the
// form is a courtesy — the API re-checks and re-validates on submit, and that is
// the boundary.

import { ref, type Ref } from 'vue'

/** The proposals API (standards-api), which holds the Jira credentials. */
export const API_BASE = (
  (import.meta.env.VITE_PROPOSALS_API as string | undefined) ||
  'https://proposals-api.nebras-open-finance.com'
).replace(/\/$/, '')

const KEY_RE = /^[A-Z][A-Z0-9_]+-[1-9]\d{0,8}$/

/**
 * "of-7894", or a pasted link such as
 * https://servicedesk.nebrasopenfinance.ae/browse/OF-7894, → "OF-7894".
 * Null when the input is not a ticket key. Matches parseTicketKey on the API.
 */
export function parseTicketKey(raw: string): string | null {
  let input = raw.trim()
  if (/^https?:\/\//i.test(input)) {
    try {
      input = new URL(input).pathname.split('/').filter(Boolean).pop() || ''
    } catch {
      return null
    }
  }
  const key = input.toUpperCase()
  return KEY_RE.test(key) ? key : null
}

export interface JiraTicket {
  key: string
  summary: string
  status: string
  /** Portal link to the request. */
  url: string
  /** Why access was granted. */
  access: 'reporter' | 'participant' | 'organisation' | 'admin'
}

/**
 * idle      nothing checked yet
 * checking  waiting on the API
 * granted   the user can see the ticket — show the form
 * denied    no such ticket, or not theirs (the API does not say which)
 * signedOut the session is missing or expired
 * error     the API or Jira could not answer
 */
export type TicketState = 'idle' | 'checking' | 'granted' | 'denied' | 'signedOut' | 'error'

/** How a submission landed: JSON attachment, or inline comment (fallback). */
export type Delivery = 'attachment' | 'comment'

export interface UseJiraForm {
  state: Ref<TicketState>
  ticket: Ref<JiraTicket | null>
  message: Ref<string>
  submitting: Ref<boolean>
  submitError: Ref<string>
  submitted: Ref<boolean>
  delivered: Ref<Delivery | null>
  check: (key: string) => Promise<void>
  /** Post the form's payload; its shape is the form's own (see standards-api forms/). */
  submit: (payload: unknown) => Promise<void>
}

async function errorOf(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string }
    if (body.error) return body.error
  } catch { /* not JSON */ }
  return `Request failed (${res.status}).`
}

/** @param formId the form's id in the standards-api registry, e.g. "supported-currency-pairs". */
export function useJiraForm(formId: string): UseJiraForm {
  const state = ref<TicketState>('idle')
  const ticket = ref<JiraTicket | null>(null)
  const message = ref('')
  const submitting = ref(false)
  const submitError = ref('')
  const submitted = ref(false)
  const delivered = ref<Delivery | null>(null)

  async function check(key: string): Promise<void> {
    state.value = 'checking'
    ticket.value = null
    message.value = ''
    submitted.value = false
    submitError.value = ''
    try {
      const res = await fetch(`${API_BASE}/jira/tickets/${encodeURIComponent(key)}`, { credentials: 'include' })
      if (res.ok) {
        ticket.value = ((await res.json()) as { ticket: JiraTicket }).ticket
        state.value = 'granted'
        return
      }
      message.value = await errorOf(res)
      state.value = res.status === 401 ? 'signedOut' : res.status === 404 ? 'denied' : 'error'
    } catch {
      message.value = 'Could not reach the API. Check your connection and try again.'
      state.value = 'error'
    }
  }

  async function submit(payload: unknown): Promise<void> {
    if (!ticket.value) return
    submitting.value = true
    submitError.value = ''
    try {
      const res = await fetch(
        `${API_BASE}/jira/tickets/${encodeURIComponent(ticket.value.key)}/forms/${encodeURIComponent(formId)}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )
      if (res.ok) {
        const result = (await res.json()) as { delivered?: Delivery }
        delivered.value = result.delivered ?? null
        submitted.value = true
        return
      }
      submitError.value = await errorOf(res)
      // Access can change between check and submit (session expiry, removed
      // participant). Reflect it rather than leaving a form that cannot post.
      if (res.status === 401) state.value = 'signedOut'
      if (res.status === 404) state.value = 'denied'
    } catch {
      submitError.value = 'Could not reach the API. Nothing was submitted.'
    } finally {
      submitting.value = false
    }
  }

  return { state, ticket, message, submitting, submitError, submitted, delivered, check, submit }
}
