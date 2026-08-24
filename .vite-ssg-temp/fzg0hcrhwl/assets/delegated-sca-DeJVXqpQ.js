const RS_BASE = "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}";
const SANDBOX = "/tech/lfi-api-hub/getting-started/";
const SI_GUIDE = "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments";
const CREDITOR_DOC = "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor";
const DEBTOR_ACCOUNT = { SchemeName: "IBAN", Identification: "AE460090000000123456789" };
const CREDITORS = [
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
];
const SINGLE_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: [CREDITORS[0]]
  }
};
const MULTI_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT,
    Creditor: CREDITORS
  }
};
const OPEN_BENEFICIARY_PII = {
  Initiation: {
    DebtorAccount: DEBTOR_ACCOUNT
    // Initiation.Creditor is omitted — this is the Open Beneficiaries model.
  }
};
const BENEFICIARIES = [
  {
    key: "single",
    label: "Single Beneficiary",
    description: "The consent fixes exactly one creditor entry in Initiation.Creditor. Every payment under the consent must be to that beneficiary.",
    referencePii: JSON.stringify(SINGLE_BENEFICIARY_PII, null, 2)
  },
  {
    key: "multiple",
    label: "Multiple Beneficiaries",
    description: "The consent fixes 2–10 creditor entries in Initiation.Creditor. Every payment must exactly match one of them.",
    trustFrameworkFlag: "ApiMetadata.DelegatedSCA.MultipleBeneficiariesSupported",
    referencePii: JSON.stringify(MULTI_BENEFICIARY_PII, null, 2)
  },
  {
    key: "open",
    label: "Open Beneficiaries",
    description: "The consent omits Initiation.Creditor entirely. No creditor is fixed at consent; the TPP supplies it on each POST /payments, where your Ozone Connect endpoint validates it.",
    trustFrameworkFlag: "ApiMetadata.DelegatedSCA.OpenBeneficiariesSupported",
    referencePii: JSON.stringify(OPEN_BENEFICIARY_PII, null, 2)
  }
];
const delegatedScaArea = {
  kind: "delegated-sca",
  key: "delegated-sca",
  label: "Delegated SCA",
  apiName: "Bank Service Initiation",
  paymentType: "DelegatedSCA",
  role: "lfi",
  certType: "LFI Functional Certification Evidence",
  tppBaseUrlTemplate: RS_BASE,
  segments: ["Retail", "SME", "Corporate"],
  docHref: `${SI_GUIDE}/multi-payments/delegated-sca/api-guide`,
  creditorDocHref: CREDITOR_DOC,
  sandboxEvidenceHref: SANDBOX,
  beneficiaries: BENEFICIARIES
};
export {
  delegatedScaArea as d
};
