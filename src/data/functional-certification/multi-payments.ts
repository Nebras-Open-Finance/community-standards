// Functional Certification config for the six Multi-Payment types and the
// Delegated SCA overlay (LFI side). These are certified after Single Instant
// Payment, and the evidence is entirely about the *consent*: for each type the
// LFI shares the JIRA ticket of its Single Instant Payment certification, then
// evidences two pre-production consents — one with every optional ControlParameter
// set (cumulative caps and, for on-demand types, per-period controls), and one
// with only the required minimum — each with the consent details and a screenshot
// of the authorization screen linked to it.
//
// The example ControlParameters below are the reference the portal shows LFIs; the
// structure follows AEBankServiceInitiationControlParametersProperties in the
// standards spec — ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule
// discriminated by `Type`, with the optional MaximumCumulativeValueOfPayments /
// MaximumCumulativeNumberOfPayments caps on the MultiPayment. See
// src/data/functional-certification/types.ts (FcMultiPaymentArea).

import type { FcBeneficiaryModel, FcConsentScenario, FcMultiPaymentArea } from './types'

const RS_BASE = 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}'
const SANDBOX = '/tech/tpp-standards/sandbox/model-bank'
const SI_GUIDE = '/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments'
const CREDITOR_DOC =
  '/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor'

// ── Beneficiary models (Variable On-Demand) ──────────────────────────────────
// A Variable On-Demand consent is authorised against a beneficiary model fixed by
// the shape of the decrypted PII's `Initiation.Creditor`: Single (1 entry, implied
// by a plain consent), Multiple (2–10 entries), or Open (the array omitted — the
// creditor is supplied and validated at POST /payments instead). The VOD area
// evidences the Multiple and Open models as required evidence. See the Creditor PII
// page for the model definitions.

// A shared debtor account for the reference payloads — optional on the consent PII,
// but included so each reference reads like a real authorised consent rather than a
// bare Creditor fragment.
const DEBTOR_ACCOUNT = { SchemeName: 'IBAN', Identification: 'AE460090000000123456789' }

// Multiple-beneficiary reference: `Initiation.Creditor` carries 2–10 entries, each a
// valid UAE domestic creditor (IBAN scheme, name in en and/or ar). The submitted
// creditor on any subsequent payment MUST exactly match one of these entries.
const MULTI_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: [
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
    ],
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

const VOD_BENEFICIARY_MODELS: FcBeneficiaryModel[] = [
  {
    key: 'multiple',
    label: 'Multiple Beneficiaries',
    description:
      'The consent fixes 2–10 creditor entries in Initiation.Creditor. Every subsequent payment’s creditor must exactly match one of them.',
    trustFrameworkFlag: 'ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported',
    referencePii: JSON.stringify(MULTI_BENEFICIARY_PII, null, 2),
    collectsCreditorArray: true,
  },
  {
    key: 'open',
    label: 'Open Beneficiaries',
    description:
      'The consent omits Initiation.Creditor entirely. No creditor is fixed at consent; the TPP supplies it on each POST /payments, where your Ozone Connect endpoint validates it.',
    trustFrameworkFlag: 'ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported',
    referencePii: JSON.stringify(OPEN_BENEFICIARY_PII, null, 2),
    collectsCreditorArray: false,
  },
]

// The consent-level cumulative caps are optional on every multi-payment type — a
// lifetime ceiling on the total value and number of successful payments under the
// consent. They are what "all optional control parameters set" adds.
const CUMULATIVE_CAPS = ['MaximumCumulativeValueOfPayments', 'MaximumCumulativeNumberOfPayments']

// Wrap a MultiPayment body (the meaningful part of ControlParameters) as the
// pretty JSON the portal displays. Every multi-payment consent carries
// IsDelegatedAuthentication explicitly — false here; Delegated SCA (which sets it
// true with an empty ConsentSchedule) is its own standalone area, see
// delegated-sca.ts. Confirmed against the sandbox: these exact shapes are accepted
// at PAR by the API Hub.
function controlParams(multiPaymentBody: string): string {
  return `{
    "IsDelegatedAuthentication": false,
    "ConsentSchedule": {
      "MultiPayment": ${multiPaymentBody}
    }
  }`
}

interface TypeDef {
  key: string
  label: string
  paymentType: string
  /** Controls this type always carries beyond the cumulative caps. */
  requiredControls: string[]
  /** Optional controls unique to this type (added to the cumulative caps). */
  extraOptionalControls?: string[]
  /**
   * True when the API Hub mandates MaximumCumulativeNumberOfPayments for this type
   * even though the OpenAPI spec marks it optional — confirmed against the sandbox:
   * the two Periodic Schedule types reject a consent that omits it. So it is
   * treated as required (present in both scenarios) rather than optional.
   */
  numberCapMandatory?: boolean
  /** MultiPayment body with every optional control set. */
  allSet: string
  /** MultiPayment body with only the required minimum (the Hub-accepted minimum). */
  minimal: string
}

const TYPES: TypeDef[] = [
  {
    key: 'variable-on-demand',
    label: 'Variable On-Demand',
    paymentType: 'VariableOnDemand',
    requiredControls: ['PeriodType', 'PeriodStartDate', 'Controls (≥ 1 of the below)'],
    extraOptionalControls: [
      'Controls.MaximumIndividualAmount',
      'Controls.MaximumCumulativeValueOfPaymentsPerPeriod',
      'Controls.MaximumCumulativeNumberOfPaymentsPerPeriod',
    ],
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "10000.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 24,
        "PeriodicSchedule": {
          "Type": "VariableOnDemand",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Controls": {
            "MaximumIndividualAmount": { "Amount": "1000.00", "Currency": "AED" },
            "MaximumCumulativeValueOfPaymentsPerPeriod": { "Amount": "3000.00", "Currency": "AED" },
            "MaximumCumulativeNumberOfPaymentsPerPeriod": 5
          }
        }
      }`,
    minimal: `{
        "PeriodicSchedule": {
          "Type": "VariableOnDemand",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Controls": {
            "MaximumIndividualAmount": { "Amount": "1000.00", "Currency": "AED" }
          }
        }
      }`,
  },
  {
    key: 'fixed-on-demand',
    label: 'Fixed On-Demand',
    paymentType: 'FixedOnDemand',
    requiredControls: ['PeriodType', 'PeriodStartDate', 'Amount', 'Controls (≥ 1 of the below)'],
    extraOptionalControls: [
      'Controls.MaximumCumulativeValueOfPaymentsPerPeriod',
      'Controls.MaximumCumulativeNumberOfPaymentsPerPeriod',
    ],
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "6000.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 12,
        "PeriodicSchedule": {
          "Type": "FixedOnDemand",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Amount": { "Amount": "500.00", "Currency": "AED" },
          "Controls": {
            "MaximumCumulativeValueOfPaymentsPerPeriod": { "Amount": "1500.00", "Currency": "AED" },
            "MaximumCumulativeNumberOfPaymentsPerPeriod": 3
          }
        }
      }`,
    minimal: `{
        "PeriodicSchedule": {
          "Type": "FixedOnDemand",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Amount": { "Amount": "500.00", "Currency": "AED" },
          "Controls": {
            "MaximumCumulativeNumberOfPaymentsPerPeriod": 3
          }
        }
      }`,
  },
  {
    key: 'variable-periodic-schedule',
    label: 'Variable Periodic Schedule',
    paymentType: 'VariablePeriodicSchedule',
    requiredControls: ['PeriodType', 'PeriodStartDate', 'MaximumIndividualAmount', 'MaximumCumulativeNumberOfPayments'],
    numberCapMandatory: true,
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "12000.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 12,
        "PeriodicSchedule": {
          "Type": "VariablePeriodicSchedule",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" }
        }
      }`,
    minimal: `{
        "MaximumCumulativeNumberOfPayments": 12,
        "PeriodicSchedule": {
          "Type": "VariablePeriodicSchedule",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" }
        }
      }`,
  },
  {
    key: 'fixed-periodic-schedule',
    label: 'Fixed Periodic Schedule',
    paymentType: 'FixedPeriodicSchedule',
    requiredControls: ['PeriodType', 'PeriodStartDate', 'Amount', 'MaximumCumulativeNumberOfPayments'],
    numberCapMandatory: true,
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "6000.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 12,
        "PeriodicSchedule": {
          "Type": "FixedPeriodicSchedule",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Amount": { "Amount": "500.00", "Currency": "AED" }
        }
      }`,
    minimal: `{
        "MaximumCumulativeNumberOfPayments": 12,
        "PeriodicSchedule": {
          "Type": "FixedPeriodicSchedule",
          "PeriodType": "Month",
          "PeriodStartDate": "2026-08-01",
          "Amount": { "Amount": "500.00", "Currency": "AED" }
        }
      }`,
  },
  {
    key: 'variable-defined-schedule',
    label: 'Variable Defined Schedule',
    paymentType: 'VariableDefinedSchedule',
    requiredControls: ['Schedule[] (PaymentExecutionDate + MaximumIndividualAmount per date)'],
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "3600.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 3,
        "PeriodicSchedule": {
          "Type": "VariableDefinedSchedule",
          "Schedule": [
            { "PaymentExecutionDate": "2026-08-15", "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-09-15", "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-10-15", "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" } }
          ]
        }
      }`,
    minimal: `{
        "PeriodicSchedule": {
          "Type": "VariableDefinedSchedule",
          "Schedule": [
            { "PaymentExecutionDate": "2026-08-15", "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-09-15", "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" } }
          ]
        }
      }`,
  },
  {
    key: 'fixed-defined-schedule',
    label: 'Fixed Defined Schedule',
    paymentType: 'FixedDefinedSchedule',
    requiredControls: ['Schedule[] (PaymentExecutionDate + Amount per date)'],
    allSet: `{
        "MaximumCumulativeValueOfPayments": { "Amount": "1500.00", "Currency": "AED" },
        "MaximumCumulativeNumberOfPayments": 3,
        "PeriodicSchedule": {
          "Type": "FixedDefinedSchedule",
          "Schedule": [
            { "PaymentExecutionDate": "2026-08-15", "Amount": { "Amount": "500.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-09-15", "Amount": { "Amount": "500.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-10-15", "Amount": { "Amount": "500.00", "Currency": "AED" } }
          ]
        }
      }`,
    minimal: `{
        "PeriodicSchedule": {
          "Type": "FixedDefinedSchedule",
          "Schedule": [
            { "PaymentExecutionDate": "2026-08-15", "Amount": { "Amount": "500.00", "Currency": "AED" } },
            { "PaymentExecutionDate": "2026-09-15", "Amount": { "Amount": "500.00", "Currency": "AED" } }
          ]
        }
      }`,
  },
]

// Which cumulative caps are genuinely optional for this type. The API Hub
// mandates MaximumCumulativeNumberOfPayments for the Periodic Schedule types
// (confirmed against the sandbox), so only the value cap is optional there.
function optionalCaps(t: TypeDef): string[] {
  return t.numberCapMandatory ? ['MaximumCumulativeValueOfPayments'] : CUMULATIVE_CAPS
}

function scenarios(t: TypeDef): FcConsentScenario[] {
  const caps = optionalCaps(t)
  const mandatoryNote = t.numberCapMandatory
    ? ' Note the API Hub still requires MaximumCumulativeNumberOfPayments for this type, so it is kept.'
    : ''
  return [
    {
      key: 'all-set',
      label: 'All control parameters set',
      guidance:
        `Create a ${t.label} consent with every optional control parameter populated — the consent-level ` +
        `cumulative caps (${caps.join(', ')})` +
        (t.extraOptionalControls ? ` and the per-period controls (${t.extraOptionalControls.join(', ')})` : '') +
        `. Your authorization screen must surface these limits to the customer.`,
      example: controlParams(t.allSet),
    },
    {
      key: 'optional-not-set',
      label: 'Optional control parameters not set',
      guidance:
        `Create a second ${t.label} consent carrying only the required minimum ` +
        `(${t.requiredControls.join(', ')}) — omit the optional cap${caps.length > 1 ? 's' : ''} (${caps.join(', ')})` +
        (t.extraOptionalControls ? ' and every optional per-period control beyond the required minimum' : '') +
        `. This proves your LFI handles a consent with no optional ceilings.${mandatoryNote}`,
      example: controlParams(t.minimal),
    },
  ]
}

function buildArea(t: TypeDef): FcMultiPaymentArea {
  // Only Variable On-Demand carries the Multiple / Open beneficiary-model evidence;
  // the other types accept a single beneficiary and don't need it.
  const carriesBeneficiaryModels = t.key === 'variable-on-demand'
  return {
    kind: 'multi-payment',
    key: t.key,
    label: t.label,
    apiName: 'Bank Service Initiation',
    paymentType: t.paymentType,
    role: 'lfi',
    certType: 'LFI Functional Certification Evidence',
    tppBaseUrlTemplate: RS_BASE,
    segments: ['Retail', 'SME', 'Corporate'],
    requiredControls: t.requiredControls,
    optionalControls: [...optionalCaps(t), ...(t.extraOptionalControls ?? [])],
    docHref: `${SI_GUIDE}/multi-payments/${t.key}/api-guide`,
    sandboxEvidenceHref: SANDBOX,
    scenarios: scenarios(t),
    ...(carriesBeneficiaryModels
      ? { beneficiaryModels: VOD_BENEFICIARY_MODELS, creditorDocHref: CREDITOR_DOC }
      : {}),
  }
}

export const variableOnDemandArea = buildArea(TYPES[0]!)
export const fixedOnDemandArea = buildArea(TYPES[1]!)
export const variablePeriodicScheduleArea = buildArea(TYPES[2]!)
export const fixedPeriodicScheduleArea = buildArea(TYPES[3]!)
export const variableDefinedScheduleArea = buildArea(TYPES[4]!)
export const fixedDefinedScheduleArea = buildArea(TYPES[5]!)

// Delegated SCA (IsDelegatedAuthentication: true, with an empty ConsentSchedule —
// the TPP defines and manages the controls) is certified as its own standalone
// area with a distinct evidence shape — see delegated-sca.ts.

export const multiPaymentAreas: FcMultiPaymentArea[] = [
  variableOnDemandArea,
  fixedOnDemandArea,
  variablePeriodicScheduleArea,
  fixedPeriodicScheduleArea,
  variableDefinedScheduleArea,
  fixedDefinedScheduleArea,
]
