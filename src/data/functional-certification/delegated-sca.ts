// Functional Certification config for Delegated SCA (LFI side). Delegated SCA is
// the IsDelegatedAuthentication overlay on a payment consent: the consent carries
// IsDelegatedAuthentication: true with an empty ConsentSchedule, so the TPP
// defines and manages the payment controls. That is why — unlike the six
// Multi-Payment types (see multi-payments.ts) — there are no ControlParameters
// scenarios to evidence here.
//
// It is certified as its own standalone area (its own explainer, submission
// portal, and Service Desk ticket), building on Single Instant Payment. The
// evidence it collects is scenario-shaped:
//   - the payment limit the LFI enforces for Delegated SCA payments;
//   - Creditor decryption / validation and Risk handling — the same
//     encryption-model evidence as Single Instant Payment, re-captured because it
//     may differ slightly under delegation; and
//   - one authorised pre-production consent for each of the three beneficiary
//     models (Single, Multiple, Open), each with a ConsentId and the
//     authorization screen the customer saw.
// See src/data/functional-certification/types.ts (FcDelegatedScaArea).

import type { FcDelegatedScaArea, FcDelegatedScaBeneficiary } from './types'

const RS_BASE = 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}'
const SANDBOX = '/tech/lfi-api-hub/getting-started/'
const SI_GUIDE = '/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments'
const CREDITOR_DOC =
  '/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor'

// A shared debtor account for the reference payloads — optional on the consent
// PII, but included so each reference reads like a real authorised consent rather
// than a bare Creditor fragment.
const DEBTOR_ACCOUNT = { SchemeName: 'IBAN', Identification: 'AE460090000000123456789' }

const CREDITORS = [
  {
    Creditor: { Name: 'Ivan England' },
    CreditorAccount: { SchemeName: 'IBAN', Identification: 'AE070331234567890123456', Name: { en: 'Ivan David England' } },
  },
  {
    Creditor: { Name: 'Al Noor Trading LLC' },
    CreditorAccount: { SchemeName: 'IBAN', Identification: 'AE320260001234567890123', Name: { en: 'Al Noor Trading LLC' } },
  },
  {
    Creditor: { Name: 'Emirates Telecommunications Group' },
    CreditorAccount: { SchemeName: 'IBAN', Identification: 'AE980350000009876543210', Name: { en: 'Emirates Telecommunications Group' } },
  },
]

// Single-beneficiary reference: `Initiation.Creditor` carries exactly one entry —
// the beneficiary is fixed at consent and every payment must match it.
const SINGLE_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: [CREDITORS[0]],
  },
}

// Multiple-beneficiary reference: `Initiation.Creditor` carries 2–10 entries, each
// a valid UAE domestic creditor (IBAN scheme). Any subsequent payment's creditor
// MUST exactly match one of these entries.
const MULTI_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: CREDITORS,
  },
}

// Open-beneficiary reference: `Initiation.Creditor` is deliberately absent. No
// creditor is fixed at consent — the TPP supplies the creditor on each
// POST /payments, where the LFI performs the creditor validation that would
// otherwise run at consent-validate.
const OPEN_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    // Initiation.Creditor is omitted — this is the Open Beneficiaries model.
  },
}

const BENEFICIARIES: FcDelegatedScaBeneficiary[] = [
  {
    key: 'single',
    label: 'Single Beneficiary',
    description:
      'The consent fixes exactly one creditor entry in Initiation.Creditor. Every payment under the consent must be to that beneficiary.',
    referencePii: JSON.stringify(SINGLE_BENEFICIARY_PII, null, 2),
  },
  {
    key: 'multiple',
    label: 'Multiple Beneficiaries',
    description:
      'The consent fixes 2–10 creditor entries in Initiation.Creditor. Every payment must exactly match one of them.',
    trustFrameworkFlag: 'ApiMetadata.DelegatedSCA.MultipleBeneficiariesSupported',
    referencePii: JSON.stringify(MULTI_BENEFICIARY_PII, null, 2),
  },
  {
    key: 'open',
    label: 'Open Beneficiaries',
    description:
      'The consent omits Initiation.Creditor entirely. No creditor is fixed at consent; the TPP supplies it on each POST /payments, where your Ozone Connect endpoint validates it.',
    trustFrameworkFlag: 'ApiMetadata.DelegatedSCA.OpenBeneficiariesSupported',
    referencePii: JSON.stringify(OPEN_BENEFICIARY_PII, null, 2),
  },
]

export const delegatedScaArea: FcDelegatedScaArea = {
  kind: 'delegated-sca',
  key: 'delegated-sca',
  label: 'Delegated SCA',
  apiName: 'Bank Service Initiation',
  paymentType: 'DelegatedSCA',
  role: 'lfi',
  certType: 'LFI Functional Certification Evidence',
  tppBaseUrlTemplate: RS_BASE,
  segments: ['Retail', 'SME', 'Corporate'],
  docHref: `${SI_GUIDE}/multi-payments/delegated-sca/api-guide`,
  creditorDocHref: CREDITOR_DOC,
  sandboxEvidenceHref: SANDBOX,
  beneficiaries: BENEFICIARIES,
}
