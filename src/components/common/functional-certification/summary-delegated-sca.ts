// Builds the summary.html at the root of a Delegated SCA certification bundle.
// Delegated SCA is consent-focused but distinct from the Multi-Payment types (the
// TPP manages the controls), so instead of ControlParameters scenarios it restates
// the submitter, the payment limit the LFI enforces, the Single Instant Payment
// JIRA ticket, the Creditor / Risk handling (re-captured because it may differ
// under delegation), and one authorised consent for each beneficiary model —
// Single, Multiple, Open — each with its ConsentId and a link to the
// authorization-screen screenshot packaged alongside.

import type {
  FcDelegatedScaArea,
  FcDelegatedScaBeneficiary,
} from '@/data/functional-certification/types'
import type {
  DelegatedScaFormState,
  PaymentAuthScenarioState,
  PaymentCreditorRiskState,
} from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface DelegatedScaBeneficiaryEvidenceRef {
  model: FcDelegatedScaBeneficiary
  state: PaymentAuthScenarioState
  /** Archive-relative path of the authorization-screen screenshot. */
  authPath?: string | undefined
}

export interface DelegatedScaSummaryContext {
  area: FcDelegatedScaArea
  form: DelegatedScaFormState
  identity: { name: string; org: string; email: string }
  baseUrl: string
  /** Archive-relative path of the optional Testing Tool report, if attached. */
  testingToolPath?: string | undefined
  /** Archive-relative path of the optional payment-limit rejection screenshot. */
  limitPath?: string | undefined
  creditorRisk: {
    state: PaymentCreditorRiskState
    decryptPath?: string | undefined
    creditorPath?: string | undefined
    riskPath?: string | undefined
  }
  beneficiaries: DelegatedScaBeneficiaryEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
  generatedAt: string
}

export function buildDelegatedScaSummaryHtml(ctx: DelegatedScaSummaryContext): string {
  const { area, form, identity } = ctx
  const cr = ctx.creditorRisk.state

  const beneficiarySections = ctx.beneficiaries
    .map((b) => {
      const flagRow = b.model.trustFrameworkFlag
        ? `<tr><th>Trust Framework flag</th><td><code>${esc(b.model.trustFrameworkFlag)}</code></td></tr>`
        : ''
      return `
      <section class="endpoint">
        <h3>${esc(b.model.label)}</h3>
        <p class="meta">${esc(b.model.description)}</p>
        <table>
          ${flagRow}
          <tr><th>Pre-production ConsentId</th><td><code>${esc(b.state.consentId) || '—'}</code></td></tr>
          <tr><th>Authorization screen</th><td>${fileLink(b.authPath)}</td></tr>
        </table>
        <h4>Reference decrypted PII</h4>
        <pre>${esc(b.model.referencePii)}</pre>
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
    ${row('Payment type', area.paymentType)}
    ${row('Segments', form.segment.join(', '))}
    ${row('Payments base URL', ctx.baseUrl)}
    ${row('Payment limit (max AED)', form.paymentLimit)}
    <tr><th>Limit-exceeded rejection screenshot</th><td>${fileLink(ctx.limitPath)}</td></tr>
  </table>

  <h2>2. Single Instant Payment certification</h2>
  <table>
    ${row('Single Instant Payment JIRA ticket', form.sipJiraTicket)}
    ${ctx.testingToolPath ? `<tr><th>Testing Tool report</th><td>${fileLink(ctx.testingToolPath)}</td></tr>` : ''}
  </table>

  <h2>3. Creditor validation &amp; Risk handling</h2>
  <p class="meta">The Creditor account arrives inside the encrypted PersonalIdentifiableInformation; the Risk object (AERisk) is cleartext and feeds fraud/screening. Re-captured for Delegated SCA because it may differ slightly under delegation.</p>
  <table>
    <tr><th>PII decryption</th><td>${fileLink(ctx.creditorRisk.decryptPath)}</td></tr>
    <tr><th>Creditor validation (reachability / CoP)</th><td>${fileLink(ctx.creditorRisk.creditorPath)}</td></tr>
    <tr><th>Risk object received &amp; used</th><td>${fileLink(ctx.creditorRisk.riskPath)}</td></tr>
  </table>
  <h3>Creditor validation rules — beyond the OpenAPI spec</h3>
  <pre>${esc(cr.creditorValidationText) || '<em class="missing">Not provided</em>'}</pre>
  <h3>Risk validation rules — beyond the OpenAPI spec</h3>
  <pre>${esc(cr.riskValidationText) || '<em class="missing">Not provided</em>'}</pre>

  <h2>4. Beneficiary models</h2>
  <p class="meta">A Delegated SCA consent is authorised against a beneficiary model fixed by the shape of the decrypted PII's <code>Initiation.Creditor</code> — Single (one entry), Multiple (2–10 entries), or Open (the array omitted). Each model below is evidenced with its own consent; authorization-screen screenshots are included under <code>evidence/</code>.</p>
  ${beneficiarySections || '<p class="missing">No beneficiary models evidenced.</p>'}

  <h2>5. Reviewer comments</h2>
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
