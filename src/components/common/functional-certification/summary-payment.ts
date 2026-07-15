// Builds the summary.html at the root of a Single Instant Payment certification
// bundle. Restates the submitter, segments and version, the rails supported and
// their terminal statuses, the AANI timing windows (with derived deltas), the
// Creditor / Risk handling, and the two consent-shape scenarios — account +
// balance reads before the payment and the refund-account read after it.

import type {
  FcPaymentArea,
  FcPaymentAuthScenario,
  FcPaymentRail,
} from '@/data/functional-certification/types'
import type {
  PaymentAaniRejectState,
  PaymentAuthScenarioState,
  PaymentCreditorRiskState,
  PaymentDataSharingState,
  PaymentFormState,
  PaymentRailState,
  PaymentRefundState,
  PaymentTimingState,
} from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface PaymentRailEvidenceRef {
  rail: FcPaymentRail
  state: PaymentRailState
  /** Archive-relative path of the terminal-status Postman screenshot. */
  postman?: string | undefined
}

export interface PaymentAuthScreenEvidenceRef {
  scenario: FcPaymentAuthScenario
  state: PaymentAuthScenarioState
  /** Archive-relative path of the authorisation-page screenshot. */
  screenshot?: string | undefined
}

export interface PaymentSummaryContext {
  area: FcPaymentArea
  form: PaymentFormState
  identity: { name: string; org: string; email: string }
  baseUrl: string
  accountInfoBaseUrl: string
  /** Archive-relative path of the Testing Tool report, if provided. */
  testingToolPath?: string | undefined
  /** Archive-relative path of the core POST /payments Postman screenshot. */
  postPaymentsPath?: string | undefined
  /** Archive-relative path of the payment-limit rejection screenshot, if provided. */
  limitPath?: string | undefined
  rails: PaymentRailEvidenceRef[]
  timing: {
    state: PaymentTimingState
    railSubmitPath?: string | undefined
    terminalPatchPath?: string | undefined
  }
  aaniReject: { state: PaymentAaniRejectState; postman?: string | undefined }
  creditorRisk: {
    state: PaymentCreditorRiskState
    decryptPath?: string | undefined
    creditorPath?: string | undefined
    riskPath?: string | undefined
  }
  dataSharing: {
    state: PaymentDataSharingState
    accountsPath?: string | undefined
    balancesPath?: string | undefined
    postPaymentsPath?: string | undefined
    authPath?: string | undefined
  }
  refund: {
    state: PaymentRefundState
    postPaymentsPath?: string | undefined
    refundPath?: string | undefined
    authPath?: string | undefined
  }
  /** Authorisation-screen scenarios — debtor-at-TPP and each Confirmation of Payee outcome. */
  authScreens: PaymentAuthScreenEvidenceRef[]
  /** Timestamp string, formatted by the caller. */
  generatedAt: string
}

/**
 * Best-effort delta between two timestamps the certifier entered as free text.
 * Returns a human string like "≈ 1.4 s" when both parse, or '' when they do not —
 * the raw timestamps are always shown regardless, so a non-parsing pair is not a
 * lost datum, just an uncomputed one.
 */
function delta(a: string, b: string): string {
  const ta = Date.parse(a)
  const tb = Date.parse(b)
  if (Number.isNaN(ta) || Number.isNaN(tb) || tb < ta) return ''
  const secs = (tb - ta) / 1000
  return `≈ ${secs.toFixed(secs < 10 ? 1 : 0)} s`
}

export function buildPaymentSummaryHtml(ctx: PaymentSummaryContext): string {
  const { area, form, identity } = ctx

  const railRows = ctx.rails
    .map(
      (r) => `
      <tr>
        <th>${esc(r.rail.label)}</th>
        <td><code>${esc(r.rail.terminalStatus)}</code></td>
        <td>${fileLink(r.postman)}</td>
      </tr>`,
    )
    .join('\n')

  const t = ctx.timing.state
  const railDelta = delta(t.postTimestamp, t.railSubmitTimestamp)
  const terminalDelta = delta(t.postTimestamp, t.terminalPatchTimestamp)
  const cr = ctx.creditorRisk.state

  const timingSection = `
  <h2>4. AANI timing</h2>
  <p class="meta">The POST→rail-submission and POST→terminal-PATCH delays are evidenced for AANI, the primary instant rail.</p>
  <table>
    <tr><th>POST /payments (201 Pending)</th><td><code>${esc(t.postTimestamp) || '—'}</code></td></tr>
    <tr><th>Submitted to AANI</th><td><code>${esc(t.railSubmitTimestamp) || '—'}</code>${railDelta ? ` &middot; Δ ${esc(railDelta)}` : ''}</td></tr>
    <tr><th>Rail-submission screenshot</th><td>${fileLink(ctx.timing.railSubmitPath)}</td></tr>
    <tr><th>Terminal-status PATCH</th><td><code>${esc(t.terminalPatchTimestamp) || '—'}</code>${terminalDelta ? ` &middot; Δ ${esc(terminalDelta)}` : ''}</td></tr>
    <tr><th>Terminal-PATCH screenshot</th><td>${fileLink(ctx.timing.terminalPatchPath)}</td></tr>
    <tr><th>AANI rejection — reason code</th><td>${ctx.aaniReject.state.rejectCode.trim() ? `<code>${esc(ctx.aaniReject.state.rejectCode)}</code>` : '—'}</td></tr>
    <tr><th>AANI rejection — PATCH /payment-log screenshot</th><td>${fileLink(ctx.aaniReject.postman)}</td></tr>
  </table>`

  const creditorRiskSection = `
  <h2>5. Creditor validation &amp; Risk handling</h2>
  <p class="meta">The Creditor account arrives inside the encrypted PersonalIdentifiableInformation; the Risk object (AERisk) is cleartext and feeds fraud/screening.</p>
  <table>
    <tr><th>PII decryption</th><td>${fileLink(ctx.creditorRisk.decryptPath)}</td></tr>
    <tr><th>Creditor validation (reachability / CoP)</th><td>${fileLink(ctx.creditorRisk.creditorPath)}</td></tr>
    <tr><th>Risk object received &amp; used</th><td>${fileLink(ctx.creditorRisk.riskPath)}</td></tr>
  </table>
  <h3>Creditor validation rules — beyond the OpenAPI spec</h3>
  <pre>${esc(cr.creditorValidationText) || '<em class="missing">Not provided</em>'}</pre>
  <h3>Risk validation rules — beyond the OpenAPI spec</h3>
  <pre>${esc(cr.riskValidationText) || '<em class="missing">Not provided</em>'}</pre>`

  const dataSharingSection = `
  <h2>6. Account &amp; balance reads before the payment</h2>
  <p class="meta">Evidences a payment consent carrying ReadAccountsBasic / ReadAccountsDetail and ReadBalances — successful account and balance reads ahead of a successful payment. Account reads are served from <code>${esc(ctx.accountInfoBaseUrl)}</code>.</p>
  <table>
    ${row('Pre-production ConsentId', ctx.dataSharing.state.consentId)}
    <tr><th>GET /accounts</th><td>${fileLink(ctx.dataSharing.accountsPath)}</td></tr>
    <tr><th>GET /accounts/{AccountId}/balances</th><td>${fileLink(ctx.dataSharing.balancesPath)}</td></tr>
    <tr><th>Subsequent POST /payments</th><td>${fileLink(ctx.dataSharing.postPaymentsPath)}</td></tr>
    <tr><th>Authorisation page</th><td>${fileLink(ctx.dataSharing.authPath)}</td></tr>
  </table>`

  const refundSection = `
  <h2>7. Refund-account read after the payment</h2>
  <p class="meta">Evidences a payment consent carrying ReadRefundAccount — a successful refund-account read after a successful payment.</p>
  <table>
    ${row('Pre-production ConsentId', ctx.refund.state.consentId)}
    <tr><th>POST /payments</th><td>${fileLink(ctx.refund.postPaymentsPath)}</td></tr>
    <tr><th>GET /payment-consents/{ConsentId}/refund</th><td>${fileLink(ctx.refund.refundPath)}</td></tr>
    <tr><th>Authorisation page</th><td>${fileLink(ctx.refund.authPath)}</td></tr>
  </table>`

  const authScreenRows = ctx.authScreens
    .map(
      (a) => `
      <tr>
        <th>${esc(a.scenario.label)}${a.scenario.indicator ? `<br><code>${esc(a.scenario.indicator)}</code>` : ''}</th>
        <td><code>${esc(a.state.consentId) || '—'}</code></td>
        <td>${fileLink(a.screenshot)}</td>
      </tr>`,
    )
    .join('\n')

  const authScreenSection = `
  <h2>8. Payment authorisation screen</h2>
  <p class="meta">The customer authorises the payment consent at the LFI, so these screenshots come from the LFI's own authorisation page: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee NameMatchIndicator (ConfirmationOfPayee.Yes / ConfirmationOfPayee.Partial / ConfirmationOfPayee.No) surfaced to the customer. Each scenario is its own pre-production consent.</p>
  <table>
    <thead><tr><th>Scenario</th><th>Pre-production ConsentId</th><th>Authorisation page</th></tr></thead>
    <tbody>
      ${authScreenRows || '<tr><td colspan="3" class="missing">No authorisation-screen scenarios.</td></tr>'}
    </tbody>
  </table>`

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

  <h2>2. Core payment execution</h2>
  <table>
    <tr><th>Testing Tool output (POST /payments)</th><td>${fileLink(ctx.testingToolPath)}</td></tr>
    <tr><th>Postman — POST /payments (201 Pending)</th><td>${fileLink(ctx.postPaymentsPath)}</td></tr>
    ${row('Payment limit (max AED)', form.paymentLimit)}
    <tr><th>Limit-exceeded rejection screenshot</th><td>${fileLink(ctx.limitPath)}</td></tr>
  </table>

  <h2>3. Rails supported &amp; terminal status</h2>
  <p class="meta">${ctx.rails.length} rail(s) declared. Each terminal status is evidenced with a Postman screenshot under <code>evidence/</code>.</p>
  <table>
    <thead><tr><th>Rail</th><th>Terminal status</th><th>Evidence</th></tr></thead>
    <tbody>
      ${railRows || '<tr><td colspan="3" class="missing">No rails declared.</td></tr>'}
    </tbody>
  </table>
${timingSection}
${creditorRiskSection}
${dataSharingSection}
${refundSection}
${authScreenSection}

  <h2>9. Reviewer comments</h2>
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
