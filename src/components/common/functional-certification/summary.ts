// Builds the summary.html at the root of an LFI certification bundle. It restates
// every answer and links to the evidence files packaged alongside it.

import type { FcArea, FcConsentOp, FcEndpoint } from '@/data/functional-certification/types'
import type { ConsentOpState, EndpointState, FcFormState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface EndpointEvidenceRef {
  endpoint: FcEndpoint
  state: EndpointState
  /** Archive-relative paths of the files included for this endpoint (by slot). */
  paths: { testLog?: string; postman?: string; responseJson?: string }
}

export interface ConsentOpEvidenceRef {
  op: FcConsentOp
  state: ConsentOpState
  /** Resolved call URL (version substituted). */
  url: string
  /** Archive-relative path of the Postman screenshot, if provided. */
  postman?: string
}

export interface SummaryContext {
  area: FcArea
  form: FcFormState
  identity: { name: string; org: string; email: string }
  tppBaseUrl: string
  endpoints: EndpointEvidenceRef[]
  consentOps: ConsentOpEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
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

function outcomeLabel(state: EndpointState): string {
  if (state.outcome === 'all-pass') return 'All tests passed'
  if (state.outcome === 'issues') return 'Some tests failed or were skipped'
  return 'Not stated'
}

export function buildSummaryHtml(ctx: SummaryContext): string {
  const { area, form, identity, endpoints, consentOps } = ctx

  const consentSections = consentOps.map(consentOpSection).join('\n')

  const endpointSections = endpoints
    .map((e) => {
      const notes =
        e.state.outcome === 'issues'
          ? `<p><strong>Failure / skip notes:</strong> ${esc(e.state.notes) || '<em class="missing">none given</em>'}</p>`
          : ''
      const tppRows = e.endpoint.tppPath
        ? `<tr><th>TPP-facing equivalent</th><td><code>${esc(ctx.tppBaseUrl + e.endpoint.tppPath)}</code></td></tr>
           <tr><th>Postman success screenshot</th><td>${fileLink(e.paths.postman)}</td></tr>
           <tr><th>Full JSON response</th><td>${fileLink(e.paths.responseJson)}</td></tr>`
        : `<tr><th>TPP-facing equivalent</th><td><em>None on the ${esc(area.apiName)} resource server</em></td></tr>`
      return `
      <section class="endpoint">
        <h3><span class="method">${esc(e.endpoint.method)}</span> <code>${esc(e.endpoint.ozonePath)}</code></h3>
        <table>
          <tr><th>Permission(s)</th><td>${e.endpoint.permissions.map((p) => `<code>${esc(p)}</code>`).join(' ')}</td></tr>
          <tr><th>Test outcome</th><td>${esc(outcomeLabel(e.state))}</td></tr>
          <tr><th>Testing Tool output</th><td>${fileLink(e.paths.testLog)}</td></tr>
          ${tppRows}
        </table>
        ${notes}
      </section>`
    })
    .join('\n')

  const body = `
  <h2>1. Submitting LFI</h2>
  <table>
    ${row('LFI / Organisation', identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${form.segment.length ? row('Segment', form.segment.join(', ')) : ''}
    ${row('TPP-facing base URL', ctx.tppBaseUrl)}
  </table>

  ${
    consentOps.length
      ? `<h2>2. Consent management</h2>
  <p class="meta">${consentOps.length} consent-lifecycle operation(s), certified regardless of the endpoints in scope. Screenshots are included under <code>evidence/consent-management/</code>.</p>
  ${consentSections}`
      : ''
  }

  <h2>${consentOps.length ? '3' : '2'}. Endpoints &amp; evidence</h2>
  <p class="meta">${endpoints.length} endpoint(s) in scope. Evidence files are included in this bundle under <code>evidence/</code>.</p>
  ${endpointSections || '<p class="missing">No endpoints selected.</p>'}

  <h2>${consentOps.length ? '4' : '3'}. Reviewer comments</h2>
  <pre>${esc(form.comments) || '<em>None</em>'}</pre>`

  return summaryShell(
    {
      title: `Functional Certification Submission — ${area.label}`,
      certType: area.certType,
      label: area.label,
      generatedAt: ctx.generatedAt,
      org: identity.org,
      name: identity.name,
    },
    body,
  )
}
