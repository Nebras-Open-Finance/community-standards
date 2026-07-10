// Builds the summary.html at the root of a TPP certification bundle. Restates the
// use case, the consent (RAR) object, the endpoints consumed, and links to the
// Postman screenshots proving retrieval from the sandbox Model Bank.

import type { FcArea, FcEndpoint } from '@/data/functional-certification/types'
import type { FcTppFormState, TppEndpointState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface TppEndpointEvidenceRef {
  endpoint: FcEndpoint
  state: TppEndpointState
  paths: { postman?: string }
}

export interface TppSummaryContext {
  area: FcArea
  form: FcTppFormState
  identity: { name: string; org: string; email: string }
  /** Resolved sandbox Model Bank base URL (version substituted). */
  baseUrl: string
  endpoints: TppEndpointEvidenceRef[]
  generatedAt: string
}

export function buildTppSummaryHtml(ctx: TppSummaryContext): string {
  const { area, form, identity, endpoints } = ctx

  const endpointSections = endpoints
    .map((e) => {
      const notes = e.state.notes.trim()
        ? `<p><strong>Notes:</strong> ${esc(e.state.notes)}</p>`
        : ''
      const url = e.endpoint.tppPath ? ctx.baseUrl + e.endpoint.tppPath : ''
      return `
      <section class="endpoint">
        <h3><span class="method">${esc(e.endpoint.method)}</span> <code>${esc(e.endpoint.tppPath || e.endpoint.ozonePath)}</code></h3>
        <table>
          <tr><th>Permission(s)</th><td>${e.endpoint.permissions.map((p) => `<code>${esc(p)}</code>`).join(' ')}</td></tr>
          ${url ? `<tr><th>Model Bank URL</th><td><code>${esc(url)}</code></td></tr>` : ''}
          <tr><th>Postman evidence</th><td>${fileLink(e.paths.postman)}</td></tr>
        </table>
        ${notes}
      </section>`
    })
    .join('\n')

  const body = `
  <h2>1. Submitting TPP</h2>
  <table>
    ${row('TPP / Organisation', identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${form.segment.length ? row('Segment', form.segment.join(', ')) : ''}
    ${row('Model Bank base URL', ctx.baseUrl)}
  </table>

  <h2>2. Use case</h2>
  <pre>${esc(form.useCase) || '<em class="missing">Not provided</em>'}</pre>

  <h2>3. Consent — authorization_details (RAR)</h2>
  <p>Permissions aligned to the endpoints consumed:
    <strong class="${form.alignmentConfirmed ? 'ok' : 'missing'}">${form.alignmentConfirmed ? 'Confirmed' : 'Not confirmed'}</strong>
  </p>
  <pre>${esc(form.rarObject) || '<em class="missing">Not provided</em>'}</pre>

  <h2>4. Endpoints consumed &amp; evidence</h2>
  <p class="meta">${endpoints.length} endpoint(s) in scope. Screenshots are included in this bundle under <code>evidence/</code>.</p>
  ${endpointSections || '<p class="missing">No endpoints selected.</p>'}

  <h2>5. Reviewer comments</h2>
  <pre>${esc(form.comments) || '<em>None</em>'}</pre>`

  return summaryShell(
    {
      title: `Functional Certification Submission — ${area.label} (TPP)`,
      certType: area.certType,
      label: area.label,
      generatedAt: ctx.generatedAt,
      org: identity.org,
      name: identity.name,
    },
    body,
  )
}
