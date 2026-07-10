// Builds the human-readable summary.html that sits at the root of the generated
// certification bundle. It restates every answer and links to the evidence files
// packaged alongside it, so a reviewer can open one file and see the whole
// submission. Self-contained (inline CSS), printable.

import type { FcArea, FcEndpoint } from '@/data/functional-certification/types'
import type { EndpointState, FcFormState } from './types'

export interface EndpointEvidenceRef {
  endpoint: FcEndpoint
  state: EndpointState
  /** Archive-relative paths of the files included for this endpoint (by slot). */
  paths: { testLog?: string; postman?: string; responseJson?: string }
}

export interface SummaryContext {
  area: FcArea
  form: FcFormState
  identity: { name: string; org: string; email: string }
  tppBaseUrl: string
  endpoints: EndpointEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
  generatedAt: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string): string {
  return `<tr><th>${esc(label)}</th><td>${value ? esc(value) : '<em>—</em>'}</td></tr>`
}

function outcomeLabel(state: EndpointState): string {
  if (state.outcome === 'all-pass') return 'All tests passed'
  if (state.outcome === 'issues') return 'Some tests failed or were skipped'
  return 'Not stated'
}

function fileLink(path: string | undefined): string {
  return path ? `<a href="${esc(path)}">${esc(path)}</a>` : '<span class="missing">Not provided</span>'
}

export function buildSummaryHtml(ctx: SummaryContext): string {
  const { area, form, identity, endpoints } = ctx

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

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Functional Certification Submission — ${esc(area.label)}</title>
<style>
  :root { color-scheme: light; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a2233; max-width: 60rem; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; line-height: 1.55; }
  h1 { font-size: 1.9rem; margin: 0 0 0.25rem; }
  h2 { font-size: 1.2rem; margin: 2.2rem 0 0.6rem; border-bottom: 2px solid #d8dee9; padding-bottom: 0.3rem; }
  h3 { font-size: 1rem; margin: 1.4rem 0 0.5rem; }
  .eyebrow { font-family: ui-monospace, Menlo, monospace; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #2a7d6f; font-weight: 700; }
  table { border-collapse: collapse; width: 100%; margin: 0.5rem 0 1rem; font-size: 0.9rem; }
  th, td { text-align: left; vertical-align: top; padding: 0.45rem 0.6rem; border: 1px solid #e2e6ee; }
  th { width: 15rem; background: #f6f8fb; font-weight: 600; }
  code { font-family: ui-monospace, Menlo, monospace; font-size: 0.85em; background: #f2f5f9; padding: 0.05rem 0.3rem; border-radius: 3px; }
  .method { color: #fff; background: #2a7d6f; padding: 0.1rem 0.35rem; border-radius: 3px; font-size: 0.75em; }
  .endpoint { border: 1px solid #e2e6ee; border-left: 3px solid #2a7d6f; padding: 0.5rem 1rem 1rem; margin: 0.75rem 0; }
  .missing { color: #a6391f; font-style: italic; }
  pre { background: #f2f5f9; border: 1px solid #e2e6ee; padding: 0.8rem; overflow-x: auto; font-size: 0.82rem; white-space: pre-wrap; }
  .meta { color: #5b6472; font-size: 0.85rem; }
  a { color: #1d5fb3; }
  @media print { body { padding: 0; } a { color: inherit; text-decoration: none; } }
</style>
</head>
<body>
  <div class="eyebrow">Functional Certification &middot; ${esc(area.certType)}</div>
  <h1>Functional Certification Submission — ${esc(area.label)}</h1>
  <p class="meta">Generated ${esc(ctx.generatedAt)} &middot; ${esc(identity.org || '—')}${identity.name ? ' &middot; ' + esc(identity.name) : ''}</p>

  <h2>1. Submitting LFI</h2>
  <table>
    ${row('LFI / Organisation', identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${row('LFI code', form.lfiCode)}
    ${row('TPP-facing base URL', ctx.tppBaseUrl)}
    ${row('Implementation notes', form.implementationNotes)}
  </table>

  <h2>2. Endpoints &amp; evidence</h2>
  <p class="meta">${endpoints.length} endpoint(s) in scope. Evidence files are included in this bundle under <code>evidence/</code>.</p>
  ${endpointSections || '<p class="missing">No endpoints selected.</p>'}

  <h2>3. Reviewer comments</h2>
  <pre>${esc(form.comments) || '<em>None</em>'}</pre>
</body>
</html>`
}
