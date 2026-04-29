// Phase 5b-vi — endpoint pricing chargeability map, ported from
// `docs/components/WebPages/data/endpointPricing.mjs`.
//
// Authoritative chargeability map for every TPP-callable endpoint with a
// ReDoc page in the TPP standards docs.
//
// `chargeable` reflects the Nebras API Hub fee (Fee 01 in the pricing
// model). `discountable: true` means the call is billed at 0.5 fils when
// paired with a payment within 2 hours.

export type EndpointFamily =
  | 'Consent & authorization'
  | 'Data sharing'
  | 'Service initiation'
  | 'Confirmation of Payee'
  | 'ATMs, products, leads'
  | 'Onboarding & directory'

export interface EndpointPricing {
  docPath: string
  method: string
  path: string
  family: EndpointFamily
  title: string
  chargeable: boolean
  discountable?: boolean
}

export const ENDPOINT_PRICING: readonly EndpointPricing[] = [
  // ─── Consent & authorization (all non-chargeable) ────────────────────────
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/par',
    method: 'POST',
    path: '/par',
    family: 'Consent & authorization',
    title: 'Pushed Authorization Request',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/security/tokens/open-api/token',
    method: 'POST',
    path: '/token',
    family: 'Consent & authorization',
    title: 'Token endpoint',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/account-access-consents',
    method: 'GET',
    path: '/account-access-consents',
    family: 'Consent & authorization',
    title: 'Retrieve Data Sharing Consents by BaseConsentId',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId',
    method: 'GET',
    path: '/account-access-consents/{ConsentId}',
    family: 'Consent & authorization',
    title: 'Retrieve Data Sharing Consent by ConsentId',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId',
    method: 'PATCH',
    path: '/account-access-consents/{ConsentId}',
    family: 'Consent & authorization',
    title: 'Modify a Data Sharing Consent',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/payment-consents',
    method: 'GET',
    path: '/payment-consents',
    family: 'Consent & authorization',
    title: 'Retrieve Payment Consents by BaseConsentId',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId',
    method: 'GET',
    path: '/payment-consents/{ConsentId}',
    family: 'Consent & authorization',
    title: 'Retrieve Payment Consent by ConsentId',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId',
    method: 'PATCH',
    path: '/payment-consents/{ConsentId}',
    family: 'Consent & authorization',
    title: 'Modify a Payment Consent',
    chargeable: false,
  },

  // ─── Data sharing (all chargeable; balance is discounted with payment) ───
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts',
    method: 'GET',
    path: '/accounts',
    family: 'Data sharing',
    title: 'Get Accounts',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId',
    method: 'GET',
    path: '/accounts/{AccountId}',
    family: 'Data sharing',
    title: 'Get an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances',
    method: 'GET',
    path: '/accounts/{AccountId}/balances',
    family: 'Data sharing',
    title: 'Get Balances for an Account',
    chargeable: true,
    discountable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries',
    method: 'GET',
    path: '/accounts/{AccountId}/beneficiaries',
    family: 'Data sharing',
    title: 'Get Beneficiaries for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits',
    method: 'GET',
    path: '/accounts/{AccountId}/direct-debits',
    family: 'Data sharing',
    title: 'Get Direct Debits for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties',
    method: 'GET',
    path: '/accounts/{AccountId}/parties',
    family: 'Data sharing',
    title: 'Get Customer for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-products',
    method: 'GET',
    path: '/accounts/{AccountId}/product',
    family: 'Data sharing',
    title: 'Get Product Configuration for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments',
    method: 'GET',
    path: '/accounts/{AccountId}/scheduled-payments',
    family: 'Data sharing',
    title: 'Get Scheduled Payments for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders',
    method: 'GET',
    path: '/accounts/{AccountId}/standing-orders',
    family: 'Data sharing',
    title: 'Get Standing Orders for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements',
    method: 'GET',
    path: '/accounts/{AccountId}/statements',
    family: 'Data sharing',
    title: 'Get Statements for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions',
    method: 'GET',
    path: '/accounts/{AccountId}/transactions',
    family: 'Data sharing',
    title: 'Get Transactions for an Account',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties',
    method: 'GET',
    path: '/parties',
    family: 'Data sharing',
    title: 'Get Customers',
    chargeable: true,
  },

  // ─── Service initiation — payments ───────────────────────────────────────
  {
    docPath: 'tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments',
    method: 'POST',
    path: '/payments',
    family: 'Service initiation',
    title: 'Create a Payment',
    chargeable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency',
    method: 'GET',
    path: '/payments',
    family: 'Service initiation',
    title: 'Get a PaymentId from Idempotency Key',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId',
    method: 'GET',
    path: '/payments/{PaymentId}',
    family: 'Service initiation',
    title: 'Get a Payment',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund',
    method: 'GET',
    path: '/payment-consents/{ConsentId}/refund',
    family: 'Service initiation',
    title: 'Get Account Details for a Refund',
    chargeable: true,
  },

  // ─── Confirmation of Payee ───────────────────────────────────────────────
  {
    docPath: 'tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation',
    method: 'POST',
    path: '/confirmation',
    family: 'Confirmation of Payee',
    title: 'Confirm the IBAN matches the Name on the Account',
    chargeable: true,
    discountable: true,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery',
    method: 'POST',
    path: '/discovery',
    family: 'Confirmation of Payee',
    title: 'Discover the LFI that will confirm the payee',
    chargeable: false,
  },

  // ─── ATMs, products, leads ───────────────────────────────────────────────
  {
    docPath: 'tech/tpp-standards/v2.1/banking/atms/open-api/atms',
    method: 'GET',
    path: '/atms',
    family: 'ATMs, products, leads',
    title: 'Retrieve ATMs',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/products-leads/open-api/products',
    method: 'GET',
    path: '/products',
    family: 'ATMs, products, leads',
    title: 'Retrieve publicly available banking products',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/v2.1/banking/products-leads/open-api/leads',
    method: 'POST',
    path: '/leads',
    family: 'ATMs, products, leads',
    title: 'Provide user lead details',
    chargeable: false,
  },

  // ─── Onboarding & directory ──────────────────────────────────────────────
  {
    docPath: 'tech/tpp-standards/registration/open-api/tpp-registration',
    method: 'POST',
    path: '/tpp-registration',
    family: 'Onboarding & directory',
    title: 'Post Registration to Request Onboarding to an LFI',
    chargeable: false,
  },
  {
    docPath: 'tech/tpp-standards/trust-framework/open-api/participants',
    method: 'GET',
    path: '/participants',
    family: 'Onboarding & directory',
    title: 'Retrieve all Open Finance Servers and API Resources',
    chargeable: false,
  },
]
