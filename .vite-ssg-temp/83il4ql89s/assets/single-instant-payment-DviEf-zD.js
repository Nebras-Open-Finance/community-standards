const RS_BASE = "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}";
const ACCOUNT_INFO_BASE = "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/account-information/{VERSION}";
const CONSENT_MANAGER_BASE = "https://cm.{LFICODE}.apihub.openfinance.ae";
const SI_DOC = "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api";
const CM_DOC = "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api";
const RAILS = [
  {
    key: "aani",
    label: "AANI",
    terminalStatus: "AcceptedWithoutPosting",
    note: "The primary instant rail. A positive Account Verification Response (pacs.002) is terminal — AANI does not confirm credit posting at the receiving bank, so the LFI MUST NOT infer AcceptedCreditSettlementCompleted.",
    timed: true
  },
  {
    key: "intra-bank",
    label: "Intra-bank",
    terminalStatus: "AcceptedCreditSettlementCompleted",
    note: "Both debtor and creditor accounts are held at the LFI, executed as an internal debit-and-credit. The LFI sees both legs, so the payment reaches the most specific terminal status.",
    timed: false
  },
  {
    key: "uaefts",
    label: "UAEFTS",
    terminalStatus: "AcceptedCreditSettlementCompleted",
    note: "The fallback rail when AANI is unavailable or the receiving bank is unreachable on AANI. A CB900 Debit Confirmation settles through the Central Bank and implicitly confirms the creditor side.",
    timed: false
  }
];
const singleInstantPaymentArea = {
  kind: "payment",
  key: "single-instant-payment",
  label: "Single Instant Payment",
  apiName: "Bank Service Initiation",
  paymentType: "SingleInstantPayment",
  role: "lfi",
  certType: "LFI Functional Certification Evidence",
  tppBaseUrlTemplate: RS_BASE,
  accountInfoBaseUrlTemplate: ACCOUNT_INFO_BASE,
  segments: ["Retail", "SME", "Corporate"],
  endpoints: [
    {
      slug: "post-payments",
      method: "POST",
      path: "/payments",
      title: "Create a payment (returns 201 with status Pending)",
      baseUrlTemplate: RS_BASE,
      docHref: `${SI_DOC}/payments`
    },
    {
      slug: "get-payment",
      method: "GET",
      path: "/payments/{PaymentId}",
      title: "Get a payment by PaymentId (reflects the current status)",
      baseUrlTemplate: RS_BASE,
      docHref: `${SI_DOC}/payments-PaymentId`
    },
    {
      slug: "patch-payment-log",
      method: "PATCH",
      path: "/payment-log/{paymentId}",
      title: "PATCH the terminal payment status to the Consent Manager Payment Log",
      baseUrlTemplate: CONSENT_MANAGER_BASE,
      docHref: `${CM_DOC}/payment-log-id`
    },
    {
      slug: "get-refund",
      method: "GET",
      path: "/payment-consents/{ConsentId}/refund",
      title: "Retrieve the debtor refund-account details after a payment",
      baseUrlTemplate: RS_BASE,
      docHref: `${SI_DOC}/payment-consents-ConsentId-refund`
    }
  ],
  rails: RAILS,
  authScreenScenarios: [
    {
      key: "debtor-tpp",
      label: "Debtor account specified at the TPP",
      guidance: "Authorise a payment consent whose DebtorAccount was supplied by the TPP. Screenshot your authorisation page showing that debtor account already resolved for the customer — not selected by them on the page."
    },
    {
      key: "cop-yes",
      label: "Confirmation of Payee — ConfirmationOfPayee.Yes",
      indicator: "ConfirmationOfPayee.Yes",
      guidance: "Authorise a payment whose Creditor name matches the account holder exactly. Screenshot your authorisation page showing the ConfirmationOfPayee.Yes indicator surfaced to the customer."
    },
    {
      key: "cop-partial",
      label: "Confirmation of Payee — ConfirmationOfPayee.Partial",
      indicator: "ConfirmationOfPayee.Partial",
      guidance: "Authorise a payment whose Creditor name is close but not exact. Screenshot your authorisation page showing the ConfirmationOfPayee.Partial indicator surfaced to the customer."
    },
    {
      key: "cop-no",
      label: "Confirmation of Payee — ConfirmationOfPayee.No",
      indicator: "ConfirmationOfPayee.No",
      guidance: "Authorise a payment whose Creditor name does not match the account holder. Screenshot your authorisation page showing the ConfirmationOfPayee.No indicator surfaced to the customer."
    }
  ],
  sandboxEvidenceHref: "/tech/lfi-api-hub/getting-started/",
  paymentStatusDocHref: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status",
  accountPermsDocHref: "/knowledge-base/articles/payment-account-permissions",
  refundsDocHref: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide"
};
export {
  singleInstantPaymentArea as s
};
