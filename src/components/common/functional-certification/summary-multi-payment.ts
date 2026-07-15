// Builds the summary.html at the root of a Multi-Payment (or Delegated SCA)
// certification bundle. These certs are consent-focused: it restates the
// submitter, the Single Instant Payment JIRA ticket, and the two consent
// scenarios (all optional control parameters set, and only the required minimum) —
// each with its ConsentId, the consent details, and a link to the authorization
// screen screenshot packaged alongside.

import type {
  FcBeneficiaryModel,
  FcConsentScenario,
  FcMultiPaymentArea,
} from '@/data/functional-certification/types'
import type { BeneficiaryModelState, ConsentScenarioState, MultiPaymentFormState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface ConsentScenarioEvidenceRef {
  scenario: FcConsentScenario
  state: ConsentScenarioState
  /** Archive-relative path of the authorization-screen screenshot. */
  authPath?: string | undefined
}

export interface BeneficiaryEvidenceRef {
  model: FcBeneficiaryModel
  state: BeneficiaryModelState
  /** Archive-relative path of the authorization-screen screenshot. */
  authPath?: string | undefined
}

export interface MultiPaymentSummaryContext {
  area: FcMultiPaymentArea
  form: MultiPaymentFormState
  identity: { name: string; org: string; email: string }
  baseUrl: string
  /** Archive-relative path of the optional Testing Tool report, if attached. */
  testingToolPath?: string | undefined
  scenarios: ConsentScenarioEvidenceRef[]
  /** Beneficiary-model evidence (Variable On-Demand only); empty otherwise. */
  beneficiaries?: BeneficiaryEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
  generatedAt: string
}

export function buildMultiPaymentSummaryHtml(ctx: MultiPaymentSummaryContext): string {
  const { area, form, identity } = ctx

  const scenarioSections = ctx.scenarios
    .map(
      (s) => `
      <section class="endpoint">
        <h3>${esc(s.scenario.label)}</h3>
        <p class="meta">${esc(s.scenario.guidance)}</p>
        <table>
          <tr><th>Pre-production ConsentId</th><td><code>${esc(s.state.consentId) || '—'}</code></td></tr>
          <tr><th>Authorization screen</th><td>${fileLink(s.authPath)}</td></tr>
        </table>
        <h4>Consent details</h4>
        <pre>${esc(s.state.consentDetails) || '<em class="missing">Not provided</em>'}</pre>
      </section>`,
    )
    .join('\n')

  const beneficiaries = ctx.beneficiaries ?? []
  const beneficiarySections = beneficiaries
    .map((b) => {
      const creditorBlock = b.model.collectsCreditorArray
        ? `<h4>Consent Initiation.Creditor array</h4>
        <pre>${esc(b.state.creditorArray) || '<em class="missing">Not provided</em>'}</pre>`
        : `<p class="meta">Open Beneficiaries — the consent omits <code>Initiation.Creditor</code>; the creditor is supplied and validated at <code>POST /payments</code>.</p>`
      return `
      <section class="endpoint">
        <h3>${esc(b.model.label)}</h3>
        <p class="meta">${esc(b.model.description)}</p>
        <table>
          <tr><th>Trust Framework flag</th><td><code>${esc(b.model.trustFrameworkFlag)}</code></td></tr>
          <tr><th>Pre-production ConsentId</th><td><code>${esc(b.state.consentId) || '—'}</code></td></tr>
          <tr><th>Authorization screen</th><td>${fileLink(b.authPath)}</td></tr>
        </table>
        ${creditorBlock}
        <h4>Reference decrypted PII</h4>
        <pre>${esc(b.model.referencePii)}</pre>
      </section>`
    })
    .join('\n')

  const beneficiarySection = beneficiaries.length
    ? `
  <h2>4. Beneficiary models</h2>
  <p class="meta">A Variable On-Demand consent is authorised against a beneficiary model fixed by the shape of the decrypted PII's <code>Initiation.Creditor</code>. Each model below is evidenced with its own consent; authorization-screen screenshots are included under <code>evidence/</code>.</p>
  ${beneficiarySections}
`
    : ''

  // Reviewer comments follow the beneficiary section when present, else take its number.
  const commentsNum = beneficiaries.length ? '5' : '4'

  const body = `
  <h2>1. Submitting LFI</h2>
  <table>
    ${row('LFI / Organisation', identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${row('Payment type', area.paymentType)}
    ${row('Segments', form.segment.join(', '))}
    ${row('Payments base URL', ctx.baseUrl)}
  </table>

  <h2>2. Single Instant Payment certification</h2>
  <table>
    ${row('Single Instant Payment JIRA ticket', form.sipJiraTicket)}
    ${ctx.testingToolPath ? `<tr><th>Testing Tool report</th><td>${fileLink(ctx.testingToolPath)}</td></tr>` : ''}
  </table>

  <h2>3. Consent scenarios</h2>
  <p class="meta">${ctx.scenarios.length} consent scenario(s). Authorization-screen screenshots are included in this bundle under <code>evidence/</code>.</p>
  ${scenarioSections || '<p class="missing">No consent scenarios evidenced.</p>'}
  ${beneficiarySection}
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
