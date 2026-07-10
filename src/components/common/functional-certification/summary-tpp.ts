// Builds the summary.html at the root of a TPP certification bundle. Restates the
// use case, the consent (RAR) object, the endpoints consumed, and links to the
// Postman screenshots proving retrieval from the sandbox Model Bank.

import type { FcArea, FcConsentOp, FcEndpoint } from '@/data/functional-certification/types'
import type { ConsentOpState, FcTppFormState, TppEndpointState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface TppEndpointEvidenceRef {
  endpoint: FcEndpoint
  state: TppEndpointState
  paths: { postman?: string }
}

export interface ConsentOpEvidenceRef {
  op: FcConsentOp
  state: ConsentOpState
  /** Resolved call URL (version substituted). */
  url: string
  /** Archive-relative path of the Postman screenshot, if provided. */
  postman?: string
}

export interface TppSummaryContext {
  area: FcArea
  form: FcTppFormState
  identity: { name: string; org: string; email: string }
  /** Resolved sandbox Model Bank base URL (version substituted). */
  baseUrl: string
  endpoints: TppEndpointEvidenceRef[]
  consentOps: ConsentOpEvidenceRef[]
  generatedAt: string
}

function consentOpSection(ref: ConsentOpEvidenceRef): string {
  const errRows = ref.op.captureErrorDetails
    ? `<tr><th><code>error</code></th><td>${esc(ref.state.error) || '<em class="missing">Not provided</em>'}</td></tr>
       <tr><th><code>error_description</code></th><td>${esc(ref.state.errorDescription) || '<em class="missing">Not provided</em>'}</td></tr>`
    : ''
  return `
  <section class="endpoint">
    <h3><span class="method">${esc(ref.op.method)}</span> <code>${esc(ref.op.path)}</code> — ${esc(ref.op.title)}</h3>
    <p class="meta">${esc(ref.op.scenario)}</p>
    <table>
      <tr><th>Call</th><td><code>${esc(ref.url)}</code></td></tr>
      <tr><th>Postman screenshot</th><td>${fileLink(ref.postman)}</td></tr>
      ${errRows}
    </table>
  </section>`
}

export function buildTppSummaryHtml(ctx: TppSummaryContext): string {
  const { area, form, identity, endpoints, consentOps } = ctx

  const consentSections = consentOps.map(consentOpSection).join('\n')
  // Sections 1–3 are fixed; consent management (when present) takes 4 and pushes
  // the endpoint and comments sections down by one.
  const n = (base: number): number => (consentOps.length && base >= 4 ? base + 1 : base)

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

  ${
    consentOps.length
      ? `<h2>4. Consent management</h2>
  <p class="meta">${consentOps.length} consent-lifecycle operation(s), certified regardless of the endpoints consumed. Screenshots are included under <code>evidence/consent-management/</code>.</p>
  ${consentSections}`
      : ''
  }

  <h2>${n(4)}. Endpoints consumed &amp; evidence</h2>
  <p class="meta">${endpoints.length} endpoint(s) in scope. Screenshots are included in this bundle under <code>evidence/</code>.</p>
  ${endpointSections || '<p class="missing">No endpoints selected.</p>'}

  <h2>${n(5)}. Reviewer comments</h2>
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
