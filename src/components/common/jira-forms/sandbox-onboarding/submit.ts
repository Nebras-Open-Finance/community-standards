// Sends a validated Sandbox onboarding request to standards-api, which raises a
// new Service Desk request ("Initiate Onboarding to Trust Framework") on behalf
// of the requester email, with the documents attached. No session: the API
// re-validates everything (services/jira/requests/sandbox-onboarding.js).
//
// Multipart: "data" is the form values as JSON; each document is its own part,
// named by its DocKey.

import { API_BASE } from '@/composables/useJiraForm'
import type { Values } from './fields'
import type { DocDef, DocKey } from './documents'
import { submissionValues } from './validators'

export interface RaisedRequest {
  /** e.g. "OF-1234". */
  key: string
  /** Portal link to the request, when Jira returned one. */
  url: string | null
  /** Who the request was raised for: the requester, or the service account (fallback). */
  reporter: 'requester' | 'service'
  /** False when the request was created but its documents could not be attached. */
  attached: boolean
}

export type SubmitResult = { ok: true, request: RaisedRequest } | { ok: false, error: string }

export function buildSubmission(values: Values, docs: DocDef[], files: Partial<Record<DocKey, File>>): FormData {
  const form = new FormData()
  form.append('data', JSON.stringify(submissionValues(values)))
  for (const d of docs) {
    const file = files[d.key]
    if (file) form.append(d.key, file, file.name)
  }
  return form
}

export async function submitSandboxOnboarding(form: FormData): Promise<SubmitResult> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/jira/requests/sandbox-onboarding`, { method: 'POST', body: form })
  } catch {
    return { ok: false, error: 'Could not reach the Service Desk. Check your connection and try again. Nothing was submitted.' }
  }
  let body: { key?: string, url?: string | null, reporter?: RaisedRequest['reporter'], attached?: boolean, error?: string } = {}
  try {
    body = await res.json()
  } catch { /* not JSON */ }

  if (res.ok && body.key) {
    return {
      ok: true,
      request: { key: body.key, url: body.url ?? null, reporter: body.reporter ?? 'requester', attached: body.attached !== false },
    }
  }
  if (res.status === 429) {
    return { ok: false, error: 'Too many submissions from your network. Wait a minute, then try again.' }
  }
  return { ok: false, error: body.error || `The request could not be submitted (${res.status}). Please try again.` }
}
