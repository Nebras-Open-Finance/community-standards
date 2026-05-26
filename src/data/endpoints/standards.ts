import type { Endpoint, EndpointRedoc, OverrideServer } from './types'

const VERSION = 'v2.1'

const PAYMENT_SERVERS: OverrideServer[] = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/payment/${VERSION}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/payment/${VERSION}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/${VERSION}` },
]

const COP_SERVERS: OverrideServer[] = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION}` },
]

const ATM_SERVERS: OverrideServer[] = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/atm/${VERSION}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/atm/${VERSION}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/atm/${VERSION}` },
]

const PRODUCT_SERVERS: OverrideServer[] = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/product/${VERSION}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/product/${VERSION}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/product/${VERSION}` },
]

const INSURANCE_SERVERS: OverrideServer[] = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/insurance/${VERSION}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/insurance/${VERSION}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/${VERSION}` },
]

const PAR_TOKEN_SERVERS: OverrideServer[] = [
  { url: `https://as1.[LFICODE].apihub.openfinance.ae` },
  { url: `https://as1.[LFICODE].preprod.apihub.openfinance.ae` },
  { url: `https://as1.[LFICODE].sandbox.apihub.openfinance.ae` },
]

const REGISTRATION_SERVERS: OverrideServer[] = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae' },
]

const WEBHOOK_SERVERS: OverrideServer[] = [
  { url: `https://[subscription.Webhook.Url]` },
]

// Specs
const SPEC_ACCOUNT_INFO = '/openapi/v2.1/standards/uae-account-information-openapi.yaml'
const SPEC_BANK_INITIATION = '/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml'
const SPEC_CONFIRMATION = '/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml'
const SPEC_ATM = '/openapi/v2.1/standards/uae-atm-openapi.yaml'
const SPEC_PRODUCT = '/openapi/v2.1/standards/uae-product-openapi.yaml'
const SPEC_INSURANCE = '/openapi/v2.1/standards/uae-insurance-openapi.yaml'
const SPEC_AUTH_ENDPOINTS = '/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml'
const SPEC_REGISTRATION = '/openapi/v2.1/api-hub/uae-api-hub-tpp-onboarding-openapi.yaml'
const SPEC_WEBHOOK = '/openapi/v2.1/standards/uae-webhook-template-openapi.yaml'

// ── Helper --------------------------------------------------------------------

interface EntryInput {
  section: string
  sectionSlug: string
  subsection?: string
  slug: string
  method: Endpoint['method']
  path: string
  title: string
  redoc: EndpointRedoc
}

function entry(input: EntryInput): Endpoint {
  return {
    surface: 'standards',
    version: VERSION,
    ...input,
  }
}

// ── Endpoints -----------------------------------------------------------------

export const standardsEndpoints: readonly Endpoint[] = [
  // Registration
  entry({
    section: 'Registration',
    sectionSlug: 'registration',
    slug: 'tpp-registration',
    method: 'POST',
    path: '/tpp-registration',
    title: 'Post Registration to Request Onboarding to an LFI',
    redoc: {
      spec: SPEC_REGISTRATION,
      filterPath: '/tpp-registration',
      overrideServers: REGISTRATION_SERVERS,
    },
  }),

  // Token
  entry({
    section: 'Token',
    sectionSlug: 'token',
    slug: 'token',
    method: 'POST',
    path: '/token',
    title: 'Token endpoint',
    redoc: {
      spec: SPEC_AUTH_ENDPOINTS,
      filterPath: '/token',
      overrideServers: PAR_TOKEN_SERVERS,
    },
  }),

  // Consent — Create Consent
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Create Consent',
    slug: 'par',
    method: 'POST',
    path: '/par',
    title: 'Pushed Authorization Request endpoint',
    redoc: {
      spec: SPEC_AUTH_ENDPOINTS,
      filterPath: '/par',
      overrideServers: PAR_TOKEN_SERVERS,
    },
  }),

  // Consent — Bank Data Sharing
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Data Sharing',
    slug: 'account-access-consents',
    method: 'GET',
    path: '/account-access-consents',
    title: 'Retrieve Bank Data Sharing Consents by BaseConsentId',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/account-access-consents' },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Data Sharing',
    slug: 'account-access-consents-ConsentId',
    method: 'GET',
    path: '/account-access-consents/{ConsentId}',
    title: 'Retrieve Bank Data Sharing Consent by ConsentId',
    redoc: {
      spec: SPEC_ACCOUNT_INFO,
      filterPath: '/account-access-consents/{ConsentId}',
      filterMethod: 'get',
    },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Data Sharing',
    slug: 'patch-account-access-consents-ConsentId',
    method: 'PATCH',
    path: '/account-access-consents/{ConsentId}',
    title: 'Modify a Bank Data Sharing Consent',
    redoc: {
      spec: SPEC_ACCOUNT_INFO,
      filterPath: '/account-access-consents/{ConsentId}',
      filterMethod: 'patch',
    },
  }),

  // Consent — Bank Service Initiation
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Service Initiation',
    slug: 'payment-consents',
    method: 'GET',
    path: '/payment-consents',
    title: 'Retrieve Payment Consents by BaseConsentId',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payment-consents',
      overrideServers: PAYMENT_SERVERS,
    },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Service Initiation',
    slug: 'payment-consents-ConsentId',
    method: 'GET',
    path: '/payment-consents/{ConsentId}',
    title: 'Retrieve Payment Consent by ConsentId',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payment-consents/{ConsentId}',
      filterMethod: 'get',
      overrideServers: PAYMENT_SERVERS,
    },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Bank Service Initiation',
    slug: 'patch-payment-consents-ConsentId',
    method: 'PATCH',
    path: '/payment-consents/{ConsentId}',
    title: 'Modify a Payment Consent',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payment-consents/{ConsentId}',
      filterMethod: 'patch',
      overrideServers: PAYMENT_SERVERS,
    },
  }),

  // Consent — Insurance Data Sharing
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Insurance Data Sharing',
    slug: 'insurance-consents',
    method: 'GET',
    path: '/insurance-consents',
    title: 'Retrieve Insurance Data Sharing Consents by BaseConsentId',
    redoc: { spec: SPEC_INSURANCE, filterPath: '/insurance-consents' },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Insurance Data Sharing',
    slug: 'insurance-consents-ConsentId',
    method: 'GET',
    path: '/insurance-consents/{ConsentId}',
    title: 'Retrieve Insurance Data Sharing Consent by ConsentId',
    redoc: {
      spec: SPEC_INSURANCE,
      filterPath: '/insurance-consents/{ConsentId}',
      filterMethod: 'get',
    },
  }),
  entry({
    section: 'Consent',
    sectionSlug: 'consent',
    subsection: 'Insurance Data Sharing',
    slug: 'patch-insurance-consents-ConsentId',
    method: 'PATCH',
    path: '/insurance-consents/{ConsentId}',
    title: 'Modify an Insurance Data Sharing Consent',
    redoc: {
      spec: SPEC_INSURANCE,
      filterPath: '/insurance-consents/{ConsentId}',
      filterMethod: 'patch',
    },
  }),

  // Bank Data Sharing
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts',
    method: 'GET',
    path: '/accounts',
    title: 'Get Accounts',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId',
    method: 'GET',
    path: '/accounts/{AccountId}',
    title: 'Get an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-balances',
    method: 'GET',
    path: '/accounts/{AccountId}/balances',
    title: 'Get Balances for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/balances' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-beneficiaries',
    method: 'GET',
    path: '/accounts/{AccountId}/beneficiaries',
    title: 'Get Beneficiaries for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/beneficiaries' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-direct-debits',
    method: 'GET',
    path: '/accounts/{AccountId}/direct-debits',
    title: 'Get Direct Debits for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/direct-debits' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'parties',
    method: 'GET',
    path: '/parties',
    title: 'Get Customers',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/parties' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-parties',
    method: 'GET',
    path: '/accounts/{AccountId}/parties',
    title: 'Get Customer for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/parties' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-scheduled-payments',
    method: 'GET',
    path: '/accounts/{AccountId}/scheduled-payments',
    title: 'Get Scheduled Payments for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/scheduled-payments' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-standing-orders',
    method: 'GET',
    path: '/accounts/{AccountId}/standing-orders',
    title: 'Get Standing Orders for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/standing-orders' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-statements',
    method: 'GET',
    path: '/accounts/{AccountId}/statements',
    title: 'Get Statements for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/statements' },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-transactions',
    method: 'GET',
    path: '/accounts/{AccountId}/transactions',
    title: 'Get Transactions for an Account',
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: '/accounts/{AccountId}/transactions' },
  }),

  // Bank Service Initiation
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payments',
    method: 'POST',
    path: '/payments',
    title: 'Create a Payment',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payments',
      filterMethod: 'post',
      overrideServers: PAYMENT_SERVERS,
    },
  }),
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payments-PaymentId',
    method: 'GET',
    path: '/payments/{PaymentId}',
    title: 'Get a Payment',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payments/{PaymentId}',
      filterMethod: 'get',
      overrideServers: PAYMENT_SERVERS,
    },
  }),
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payments-idempotency',
    method: 'GET',
    path: '/payments',
    title: 'Get a PaymentId from Idempotency Key',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payments',
      filterMethod: 'get',
      overrideServers: PAYMENT_SERVERS,
    },
  }),
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payment-consents-ConsentId-refund',
    method: 'GET',
    path: '/payment-consents/{ConsentId}/refund',
    title: 'Get Account Details for a Refund',
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: '/payment-consents/{ConsentId}/refund',
      filterMethod: 'get',
      overrideServers: PAYMENT_SERVERS,
    },
  }),

  // Confirmation of Payee
  entry({
    section: 'Confirmation of Payee',
    sectionSlug: 'confirmation-of-payee',
    slug: 'discovery',
    method: 'POST',
    path: '/discovery',
    title: 'Discover the LFI that will confirm the payee',
    redoc: {
      spec: SPEC_CONFIRMATION,
      filterPath: '/discovery',
      overrideServers: COP_SERVERS,
    },
  }),
  entry({
    section: 'Confirmation of Payee',
    sectionSlug: 'confirmation-of-payee',
    slug: 'confirmation',
    method: 'POST',
    path: '/confirmation',
    title: 'Confirm the IBAN matches the Name on the Account',
    redoc: {
      spec: SPEC_CONFIRMATION,
      filterPath: '/confirmation',
      overrideServers: COP_SERVERS,
    },
  }),

  // Products & Leads
  entry({
    section: 'Products & Leads',
    sectionSlug: 'products-and-leads',
    slug: 'products',
    method: 'GET',
    path: '/products',
    title: 'Retrieve Banking products currently publicly available',
    redoc: {
      spec: SPEC_PRODUCT,
      filterPath: '/products',
      overrideServers: PRODUCT_SERVERS,
    },
  }),
  entry({
    section: 'Products & Leads',
    sectionSlug: 'products-and-leads',
    slug: 'leads',
    method: 'POST',
    path: '/leads',
    title: 'Provide user lead details',
    redoc: {
      spec: SPEC_PRODUCT,
      filterPath: '/leads',
    },
  }),

  // ATMs
  entry({
    section: 'ATMs',
    sectionSlug: 'atms',
    slug: 'atms',
    method: 'GET',
    path: '/atms',
    title: 'Retrieve ATMs',
    redoc: {
      spec: SPEC_ATM,
      filterPath: '/atms',
      overrideServers: ATM_SERVERS,
    },
  }),

  // Insurance Data Sharing — 7 insurance types × 2 endpoints (list + by-id)
  ...(['employment', 'health', 'home', 'life', 'motor', 'renters', 'travel'] as const).flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1)
      return [
        entry({
          section: 'Insurance Data Sharing',
          sectionSlug: 'insurance-data-sharing',
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies`,
          method: 'GET',
          path: `/${type}-insurance-policies`,
          title: `Get ${Type} Insurance Policies`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies`,
            overrideServers: INSURANCE_SERVERS,
          },
        }),
        entry({
          section: 'Insurance Data Sharing',
          sectionSlug: 'insurance-data-sharing',
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies-InsurancePolicyId`,
          method: 'GET',
          path: `/${type}-insurance-policies/{InsurancePolicyId}`,
          title: `Get a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies/{InsurancePolicyId}`,
            overrideServers: INSURANCE_SERVERS,
          },
        }),
      ]
    },
  ),

  // Events & Webhooks (schema-only, patched)
  entry({
    section: 'Events & Webhooks',
    sectionSlug: 'webhooks',
    slug: 'consent-status',
    method: 'POST',
    path: '[consent status]',
    title: 'Consent Status Change Event',
    redoc: {
      spec: SPEC_WEBHOOK,
      patchSchemas: {
        AEWebhookEventTypes: { $ref: '#/components/schemas/AEWebhookConsentedEventProperties' },
      },
      overrideServers: WEBHOOK_SERVERS,
    },
  }),
  entry({
    section: 'Events & Webhooks',
    sectionSlug: 'webhooks',
    slug: 'payment-status',
    method: 'POST',
    path: '[payment status]',
    title: 'Payment Status Change Event',
    redoc: {
      spec: SPEC_WEBHOOK,
      patchSchemas: {
        AEWebhookEventTypes: { $ref: '#/components/schemas/AEWebhookPaymentInitiationEventProperties' },
      },
      overrideServers: WEBHOOK_SERVERS,
    },
  }),
] as const
