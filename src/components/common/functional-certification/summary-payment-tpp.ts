// Builds the summary.html at the root of a TPP Domestic Payments certification
// bundle. For each payment type the TPP certifies it restates the Consent
// (authorization_details) and Risk (AERisk) objects the TPP constructs, links the
// Postman example of a payment against that consent type, and — for Delegated SCA —
// the authentication the TPP performs and how it maps to Risk.DebtorIndicators.
// Authentication. It then restates any optional capabilities (account/balance
// reads before the payment, Refunds after) with their evidence.

import type { FcTppPaymentArea, FcTppPaymentCapability, FcTppPaymentType } from '@/data/functional-certification/types'
import type { PaymentTppFormState, TppPaymentCapabilityState, TppPaymentTypeState } from './types'
import { esc, fileLink, row, summaryShell } from './summary-shared'

export interface TppPaymentTypeEvidenceRef {
  type: FcTppPaymentType
  state: TppPaymentTypeState
  /** Archive-relative path of the Postman payment screenshot, if provided. */
  paymentPostman?: string
  /** Archive-relative path of the Delegated SCA authentication screenshot, if provided. */
  authScreenshot?: string
}

export interface TppCapabilityEvidenceRef {
  capability: FcTppPaymentCapability
  state: TppPaymentCapabilityState
  /** Resolved call URLs (version substituted). */
  urls: string[]
  /** Archive-relative path of the Postman screenshot, if provided. */
  postman?: string
}

export interface PaymentTppSummaryContext {
  area: FcTppPaymentArea
  form: PaymentTppFormState
  identity: { name: string; org: string; email: string }
  /** Resolved sandbox Model Bank payments base URL (version substituted). */
  baseUrl: string
  types: TppPaymentTypeEvidenceRef[]
  capabilities: TppCapabilityEvidenceRef[]
  generatedAt: string
}

function typeSection(ref: TppPaymentTypeEvidenceRef): string {
  const t = ref.type
  const delegated = t.isDelegatedSca
    ? `
      <h4>Delegated SCA — authentication performed by the TPP</h4>
      <table>
        <tr><th>Authentication screenshot</th><td>${fileLink(ref.authScreenshot)}</td></tr>
        <tr><th>How it maps to <code>Risk.DebtorIndicators.Authentication</code></th>
            <td>${esc(ref.state.authExplanation) || '<em class="missing">Not provided</em>'}</td></tr>
      </table>`
    : ''
  return `
  <section class="endpoint">
    <h3><code>${esc(t.paymentType)}</code> — ${esc(t.label)}</h3>
    <p class="meta">${esc(t.summary)}</p>
    <h4>Consent — authorization_details (RAR)</h4>
    <pre>${esc(ref.state.consentJson) || '<em class="missing">Not provided</em>'}</pre>
    <h4>Risk object (AERisk)</h4>
    <pre>${esc(ref.state.riskJson) || '<em class="missing">Not provided</em>'}</pre>
    <table>
      <tr><th>Payment against this consent (Postman)</th><td>${fileLink(ref.paymentPostman)}</td></tr>
    </table>
    ${delegated}
  </section>`
}

function capabilitySection(ref: TppCapabilityEvidenceRef): string {
  const when = ref.capability.timing === 'before' ? 'before the payment' : 'after the payment'
  const eps = ref.capability.endpoints
    .map(
      (e, i) =>
        `<tr><th><code>${esc(e.method)}</code> <code>${esc(e.path)}</code></th>
             <td><code>${esc(e.permission)}</code>${ref.urls[i] ? ` — <code>${esc(ref.urls[i]!)}</code>` : ''}</td></tr>`,
    )
    .join('\n')
  return `
  <section class="endpoint">
    <h3>${esc(ref.capability.label)} <span class="meta">(${esc(when)})</span></h3>
    <p class="meta">${esc(ref.capability.description)}</p>
    <table>
      ${eps}
      <tr><th>Postman evidence</th><td>${fileLink(ref.postman)}</td></tr>
    </table>
  </section>`
}

export function buildPaymentTppSummaryHtml(ctx: PaymentTppSummaryContext): string {
  const { area, form, identity, types, capabilities } = ctx

  const typeSections = types.map(typeSection).join('\n')
  const capSections = capabilities.length
    ? capabilities.map(capabilitySection).join('\n')
    : '<p class="meta">No optional capabilities declared.</p>'

  const body = `
  <h2>1. Submitting TPP</h2>
  <table>
    ${row('TPP / Organisation', identity.org)}
    ${row('Submitted by', identity.name)}
    ${row('Email', identity.email)}
    ${row('Standards version', form.version)}
    ${row('Model Bank payments base URL', ctx.baseUrl)}
    ${row('Payment types certified', String(types.length))}
  </table>

  <h2>2. Use case</h2>
  <pre>${esc(form.useCase) || '<em class="missing">Not provided</em>'}</pre>

  <h2>3. Payment types</h2>
  <p class="meta">For each type, the Consent (authorization_details) and Risk (AERisk) objects the TPP sends,
  plus a Postman example of a payment against a consent of that type. Screenshots are included under
  <code>evidence/</code>.</p>
  ${typeSections || '<p class="missing">No payment types selected.</p>'}

  <h2>4. Optional capabilities</h2>
  ${capSections}

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
