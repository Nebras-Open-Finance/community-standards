// Builds the summary.html at the root of a Confirmation of Payee certification
// bundle. Restates the submitter, the segments and version certified, and every
// match-outcome scenario — the name + IBAN requested, the name the LFI's
// cop-query returned, the API Hub verdict, and a link to the Postman screenshot
// packaged alongside.

import type { CopOutcome, CopSegment, FcCopArea } from '@/data/functional-certification/types'
import type { CopFormState, CopScenarioState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface CopScenarioEvidenceRef {
  segment: CopSegment
  outcome: CopOutcome
  state: CopScenarioState
  /** Archive-relative path of the Postman screenshot for this scenario. */
  paths: { postman?: string }
}

export interface CopSummaryContext {
  area: FcCopArea
  form: CopFormState
  identity: { name: string; org: string; email: string }
  baseUrl: string
  testingToolPath?: string | undefined
  scenarios: CopScenarioEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
  generatedAt: string
}

function requestedName(seg: CopSegment, st: CopScenarioState): string {
  if (seg.nameType === 'business') return st.reqName || ''
  return [st.reqName, st.reqFirstName, st.reqLastName].filter(Boolean).join(' / ')
}

function returnedName(seg: CopSegment, st: CopScenarioState): string {
  if (seg.nameType === 'business') return st.resName || ''
  return [st.resName, st.resFirstName, st.resLastName].filter(Boolean).join(' / ')
}

export function buildCopSummaryHtml(ctx: CopSummaryContext): string {
  const { area, form, identity, scenarios } = ctx

  const scenarioSections = scenarios
    .map((s) => {
      const verdict = s.outcome.indicator
        ? `<code>${esc(s.outcome.indicator)}</code>`
        : '<em>204 — no body (account not found)</em>'
      // The cop-query response name is only captured for the LFI; the TPP is the
      // consumer and evidences the verdict alone.
      const responseRow = !area.captureResponseName
        ? ''
        : s.outcome.returnsName
          ? `<tr><th>Name returned by cop-query</th><td>${esc(returnedName(s.segment, s.state)) || '<span class="missing">Not provided</span>'}</td></tr>`
          : `<tr><th>cop-query response</th><td>${s.state.confirmedEmpty ? '<span class="ok">Confirmed empty data / 200</span>' : '<span class="missing">Not confirmed</span>'}</td></tr>`
      const notes = s.state.notes.trim()
        ? `<p><strong>Notes:</strong> ${esc(s.state.notes)}</p>`
        : ''
      return `
      <section class="endpoint">
        <h3>${esc(s.segment.key)} &middot; ${esc(s.outcome.label)}</h3>
        <table>
          <tr><th>API Hub verdict</th><td>${verdict}</td></tr>
          <tr><th>Requested name</th><td>${esc(requestedName(s.segment, s.state)) || '<span class="missing">Not provided</span>'}</td></tr>
          <tr><th>Requested IBAN</th><td><code>${esc(s.state.reqIban) || '—'}</code></td></tr>
          ${responseRow}
          <tr><th>Postman screenshot (/confirmation)</th><td>${fileLink(s.paths.postman)}</td></tr>
        </table>
        ${notes}
      </section>`
    })
    .join('\n')

  const confirmationUrl = `${ctx.baseUrl}${area.tppEndpoints[0]?.path ?? '/confirmation'}`
  const who = area.role === 'lfi' ? 'LFI' : 'TPP'
  // The LFI implements one Ozone Connect endpoint; the TPP exercises the
  // TPP-facing discovery + confirmation endpoints. Show whichever applies.
  const endpointRow =
    area.role === 'lfi'
      ? row('Ozone Connect endpoint', `${area.ozoneEndpoint.method} ${area.ozoneEndpoint.path}`)
      : area.tppEndpoints
          .map((e) => row('TPP-facing endpoint', `${e.method} ${e.path}`))
          .join('\n    ')

  // Testing Tool section only exists for the LFI (it runs cop-query); numbering
  // shifts accordingly so the TPP summary reads 1-2-3 without a gap.
  const testingToolSection = area.requiresTestingTool
    ? `
  <h2>2. Testing Tool</h2>
  <table>
    <tr><th>Testing Tool output (cop-query)</th><td>${fileLink(ctx.testingToolPath)}</td></tr>
  </table>
`
    : ''
  const scenariosNum = area.requiresTestingTool ? 3 : 2
  const commentsNum = scenariosNum + 1

  const body = `
  <h2>1. Submitting ${who}</h2>
  <table>
    ${row(`${who} / Organisation`, identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${row('Segments', form.segment.join(', '))}
    ${endpointRow}
    ${row('Confirmation URL', confirmationUrl)}
  </table>
${testingToolSection}
  <h2>${scenariosNum}. Match-outcome scenarios</h2>
  <p class="meta">${scenarios.length} scenario(s) across ${form.segment.length} segment(s). Postman screenshots are included in this bundle under <code>evidence/</code>.</p>
  ${scenarioSections || '<p class="missing">No scenarios evidenced.</p>'}

  <h2>${commentsNum}. Reviewer comments</h2>
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
