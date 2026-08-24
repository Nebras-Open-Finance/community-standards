const RS_BASE = "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}";
const SANDBOX = "/tech/lfi-api-hub/getting-started/";
const SI_GUIDE = "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments";
const CREDITOR_DOC = "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor";
const DEBTOR_ACCOUNT = { SchemeName: "IBAN", Identification: "AE460090000000123456789" };
const MULTI_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: [
      {
        Creditor: { Name: "Ivan England" },
        CreditorAccount: { SchemeName: "IBAN", Identification: "AE070331234567890123456", Name: { en: "Ivan David England" } }
      },
      {
        Creditor: { Name: "Al Noor Trading LLC" },
        CreditorAccount: { SchemeName: "IBAN", Identification: "AE320260001234567890123", Name: { en: "Al Noor Trading LLC" } }
      },
      {
        Creditor: { Name: "Emirates Telecommunications Group" },
        CreditorAccount: { SchemeName: "IBAN", Identification: "AE980350000009876543210", Name: { en: "Emirates Telecommunications Group" } }
      }
    ]
  }
};
const OPEN_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT
    // Initiation.Creditor is omitted — this is the Open Beneficiaries model.
  }
};
const VOD_BENEFICIARY_MODELS = [
  {
    key: "multiple",
    label: "Multiple Beneficiaries",
    description: "The consent fixes 2–10 creditor entries in Initiation.Creditor. Every subsequent payment’s creditor must exactly match one of them.",
    trustFrameworkFlag: "ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported",
    referencePii: JSON.stringify(MULTI_BENEFICIARY_PII, null, 2),
    collectsCreditorArray: true
  },
  {
    key: "open",
    label: "Open Beneficiaries",
    description: "The consent omits Initiation.Creditor entirely. No creditor is fixed at consent; the TPP supplies it on each POST /payments, where your Ozone Connect endpoint validates it.",
    trustFrameworkFlag: "ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported",
    referencePii: JSON.stringify(OPEN_BENEFICIARY_PII, null, 2),
    collectsCreditorArray: false
  }
];
const CUMULATIVE_CAPS = ["MaximumCumulativeValueOfPayments", "MaximumCumulativeNumberOfPayments"];
function controlParams(multiPaymentBody) {
  return `{
    "IsDelegatedAuthentication": false,
    "ConsentSchedule": {
      "MultiPayment": ${multiPaymentBody}
    }
  }`;
}
const TYPES = [
  {
    key: "variable-on-demand",
    label: "Variable On-Demand",
    paymentType: "VariableOnDemand",
    requiredControls: ["PeriodType", "PeriodStartDate", "Controls (≥ 1 of the below)"],
    extraOptionalControls: [
      "Controls.MaximumIndividualAmount",
      "Controls.MaximumCumulativeValueOfPaymentsPerPeriod",
      "Controls.MaximumCumulativeNumberOfPaymentsPerPeriod"
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
      }`
  },
  {
    key: "fixed-on-demand",
    label: "Fixed On-Demand",
    paymentType: "FixedOnDemand",
    requiredControls: ["PeriodType", "PeriodStartDate", "Amount", "Controls (≥ 1 of the below)"],
    extraOptionalControls: [
      "Controls.MaximumCumulativeValueOfPaymentsPerPeriod",
      "Controls.MaximumCumulativeNumberOfPaymentsPerPeriod"
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
      }`
  },
  {
    key: "variable-periodic-schedule",
    label: "Variable Periodic Schedule",
    paymentType: "VariablePeriodicSchedule",
    requiredControls: ["PeriodType", "PeriodStartDate", "MaximumIndividualAmount", "MaximumCumulativeNumberOfPayments"],
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
      }`
  },
  {
    key: "fixed-periodic-schedule",
    label: "Fixed Periodic Schedule",
    paymentType: "FixedPeriodicSchedule",
    requiredControls: ["PeriodType", "PeriodStartDate", "Amount", "MaximumCumulativeNumberOfPayments"],
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
      }`
  },
  {
    key: "variable-defined-schedule",
    label: "Variable Defined Schedule",
    paymentType: "VariableDefinedSchedule",
    requiredControls: ["Schedule[] (PaymentExecutionDate + MaximumIndividualAmount per date)"],
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
      }`
  },
  {
    key: "fixed-defined-schedule",
    label: "Fixed Defined Schedule",
    paymentType: "FixedDefinedSchedule",
    requiredControls: ["Schedule[] (PaymentExecutionDate + Amount per date)"],
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
      }`
  }
];
function optionalCaps(t) {
  return t.numberCapMandatory ? ["MaximumCumulativeValueOfPayments"] : CUMULATIVE_CAPS;
}
function scenarios(t) {
  const caps = optionalCaps(t);
  const mandatoryNote = t.numberCapMandatory ? " Note the API Hub still requires MaximumCumulativeNumberOfPayments for this type, so it is kept." : "";
  return [
    {
      key: "all-set",
      label: "All control parameters set",
      guidance: `Create a ${t.label} consent with every optional control parameter populated — the consent-level cumulative caps (${caps.join(", ")})` + (t.extraOptionalControls ? ` and the per-period controls (${t.extraOptionalControls.join(", ")})` : "") + `. Your authorization screen must surface these limits to the customer.`,
      example: controlParams(t.allSet)
    },
    {
      key: "optional-not-set",
      label: "Optional control parameters not set",
      guidance: `Create a second ${t.label} consent carrying only the required minimum (${t.requiredControls.join(", ")}) — omit the optional cap${caps.length > 1 ? "s" : ""} (${caps.join(", ")})` + (t.extraOptionalControls ? " and every optional per-period control beyond the required minimum" : "") + `. This proves your LFI handles a consent with no optional ceilings.${mandatoryNote}`,
      example: controlParams(t.minimal)
    }
  ];
}
function buildArea(t) {
  const carriesBeneficiaryModels = t.key === "variable-on-demand";
  return {
    kind: "multi-payment",
    key: t.key,
    label: t.label,
    apiName: "Bank Service Initiation",
    paymentType: t.paymentType,
    role: "lfi",
    certType: "LFI Functional Certification Evidence",
    tppBaseUrlTemplate: RS_BASE,
    segments: ["Retail", "SME", "Corporate"],
    requiredControls: t.requiredControls,
    optionalControls: [...optionalCaps(t), ...t.extraOptionalControls ?? []],
    docHref: `${SI_GUIDE}/multi-payments/${t.key}/api-guide`,
    sandboxEvidenceHref: SANDBOX,
    scenarios: scenarios(t),
    ...carriesBeneficiaryModels ? { beneficiaryModels: VOD_BENEFICIARY_MODELS, creditorDocHref: CREDITOR_DOC } : {}
  };
}
const variableOnDemandArea = buildArea(TYPES[0]);
const fixedOnDemandArea = buildArea(TYPES[1]);
const variablePeriodicScheduleArea = buildArea(TYPES[2]);
const fixedPeriodicScheduleArea = buildArea(TYPES[3]);
const variableDefinedScheduleArea = buildArea(TYPES[4]);
const fixedDefinedScheduleArea = buildArea(TYPES[5]);
export {
  variableOnDemandArea as a,
  variableDefinedScheduleArea as b,
  fixedOnDemandArea as c,
  fixedDefinedScheduleArea as d,
  fixedPeriodicScheduleArea as f,
  variablePeriodicScheduleArea as v
};
