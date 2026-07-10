// Functional Certification config for the TPP (consumer) side of Confirmation of
// Payee. The TPP proves it can obtain a name-match verdict from the sandbox Model
// Bank: it resolves the LFI via /discovery, then submits a payee name + IBAN to
// /confirmation and receives the verdict. Scope is deliberately narrow — a full
// match and a no match are enough to demonstrate the round trip — so unlike the
// LFI area there is no partial or account-not-found scenario, no Testing Tool
// report, and no captured response name (the TPP is the consumer, not the source
// of the account-holder name). See src/data/functional-certification/types.ts
// (FcCopArea) for the shape.

import type { FcCopArea } from './types'

// A full match and a no match — the two ends of the outcome range, enough to
// prove the TPP handles both a positive and a negative verdict from the Hub.
const OUTCOMES: FcCopArea['outcomes'] = [
  {
    key: 'yes',
    label: 'Full match',
    indicator: 'ConfirmationOfPayee.Yes',
    returnsName: true,
    guidance:
      'Submit the payee name exactly as the Model Bank account holder is known. The API Hub returns ConfirmationOfPayee.Yes.',
  },
  {
    key: 'no',
    label: 'No match',
    indicator: 'ConfirmationOfPayee.No',
    returnsName: true,
    guidance:
      'Submit a payee name that does not match the Model Bank account holder. The API Hub returns ConfirmationOfPayee.No.',
  },
]

// Same segment → name-type mapping as the LFI area: Retail is matched by a
// personal name, SME and Corporate by a business name.
const SEGMENTS: FcCopArea['segments'] = [
  { key: 'Retail', nameType: 'personal' },
  { key: 'SME', nameType: 'business' },
  { key: 'Corporate', nameType: 'business' },
]

export const confirmationOfPayeeTppArea: FcCopArea = {
  kind: 'cop',
  key: 'confirmation-of-payee',
  label: 'Confirmation of Payee',
  apiName: 'Confirmation of Payee',
  role: 'tpp',
  certType: 'TPP Functional Certification Evidence',
  // The TPP does not implement cop-query; kept for type completeness only.
  ozoneEndpoint: { method: 'POST', path: '/customers/action/cop-query' },
  tppEndpoints: [
    { method: 'POST', path: '/confirmation', title: 'Confirm the payee name against the account' },
    { method: 'POST', path: '/discovery', title: 'Discover the LFI that will confirm the payee' },
  ],
  // Sandbox Model Bank resource server — {VERSION} is substituted by the portal.
  baseUrlTemplate:
    'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/{VERSION}',
  segments: SEGMENTS,
  outcomes: OUTCOMES,
  requiresTestingTool: false,
  captureResponseName: false,
  sandboxEvidenceHref: '/tech/tpp-standards/sandbox/model-bank',
  wellKnownUrl: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration',
}
