import type { Endpoint, EndpointRedoc, OverrideServer } from './types'

const VERSION = 'v2.1'

const OZONE_SERVERS: OverrideServer[] = [
  { url: 'https://[Ozone_Connect_API]' },
]

const SPEC_HEALTH = '/openapi/v2.1/ozone-connect/uae-ozone-connect-health-check-openapi.yaml'
const SPEC_DATA_SHARING = '/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml'
const SPEC_SERVICE_INITIATION = '/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml'
const SPEC_CONSENT_EVENTS = '/openapi/v2.1/ozone-connect/uae-ozone-connect-consent-events-actions-openapi.yaml'
const SPEC_PRODUCTS = '/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-products-data-openapi.yaml'
const SPEC_OPEN_DATA = '/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-open-data-openapi.yaml'
const SPEC_INSURANCE = '/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml'
const SPEC_CAAP = '/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml'

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
    surface: 'ozone-connect',
    version: VERSION,
    ...input,
  }
}

export const ozoneConnectEndpoints: readonly Endpoint[] = [
  // Health Check
  entry({
    section: 'Health Check',
    sectionSlug: 'health-check',
    slug: 'hello',
    method: 'GET',
    path: '/hello',
    title: 'Hello',
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: '/hello',
      filterMethod: 'get',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Health Check',
    sectionSlug: 'health-check',
    slug: 'hello-mtls',
    method: 'GET',
    path: '/hello-mtls',
    title: 'Hello MTLS',
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: '/hello-mtls',
      filterMethod: 'get',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Health Check',
    sectionSlug: 'health-check',
    slug: 'echo-cert',
    method: 'GET',
    path: '/echo-cert',
    title: 'Echo Cert',
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: '/echo-cert',
      filterMethod: 'get',
      overrideServers: OZONE_SERVERS,
    },
  }),

  // Consent Events
  entry({
    section: 'Consent Events',
    sectionSlug: 'consent-events',
    slug: 'validate',
    method: 'POST',
    path: '/consent/action/validate',
    title: 'Validate consent before Creation',
    redoc: {
      spec: SPEC_CONSENT_EVENTS,
      filterPath: '/consent/action/validate',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Consent Events',
    sectionSlug: 'consent-events',
    slug: 'event-op',
    method: 'POST',
    path: '/consent/event/{operation}',
    title: 'Event when a consent is updated or created',
    redoc: {
      spec: SPEC_CONSENT_EVENTS,
      filterPath: '/consent/event/{operation}',
      overrideServers: OZONE_SERVERS,
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
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId',
    method: 'GET',
    path: '/accounts/{AccountId}',
    title: 'Get an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-balances',
    method: 'GET',
    path: '/accounts/{AccountId}/balances',
    title: 'Get Balances for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/balances',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-beneficiaries',
    method: 'GET',
    path: '/accounts/{AccountId}/beneficiaries',
    title: 'Get Beneficiaries for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/beneficiaries',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'customer',
    method: 'GET',
    path: '/customer',
    title: 'Get Customers',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/customer',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-customer',
    method: 'GET',
    path: '/accounts/{AccountId}/customer',
    title: 'Get Customer for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/customer',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-direct-debits',
    method: 'GET',
    path: '/accounts/{AccountId}/direct-debits',
    title: 'Get Direct Debits for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/direct-debits',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-products',
    method: 'GET',
    path: '/accounts/{AccountId}/products',
    title: 'Get Product Configuration for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/products',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-scheduled-payments',
    method: 'GET',
    path: '/accounts/{AccountId}/scheduled-payments',
    title: 'Get Scheduled Payments for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/scheduled-payments',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-standing-orders',
    method: 'GET',
    path: '/accounts/{AccountId}/standing-orders',
    title: 'Get Standing Orders for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/standing-orders',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-statements',
    method: 'GET',
    path: '/accounts/{AccountId}/statements',
    title: 'Get Statements for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/statements',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Data Sharing',
    sectionSlug: 'data-sharing',
    slug: 'accounts-AccountId-transactions',
    method: 'GET',
    path: '/accounts/{AccountId}/transactions',
    title: 'Get Transactions for an Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/accounts/{accountId}/transactions',
      overrideServers: OZONE_SERVERS,
    },
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
      spec: SPEC_SERVICE_INITIATION,
      filterSchema: 'AEPaymentRequest',
      displayPath: '/payments',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payments-PaymentId',
    method: 'GET',
    path: '/payments/{PaymentId}',
    title: 'Get a Payment by PaymentId',
    redoc: {
      spec: SPEC_SERVICE_INITIATION,
      filterPath: '/payments/{paymentId}',
      filterMethod: 'GET',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Bank Service Initiation',
    sectionSlug: 'service-initiation',
    slug: 'payment-consents-ConsentId-refund',
    method: 'GET',
    path: '/payment-consents/{ConsentId}/refund',
    title: 'Retrieve Account Details for a Refund',
    redoc: {
      spec: SPEC_SERVICE_INITIATION,
      filterPath: '/payment-consents/{consentId}/refund',
      filterMethod: 'GET',
      overrideServers: OZONE_SERVERS,
    },
  }),

  // Confirmation of Payee
  entry({
    section: 'Confirmation of Payee',
    sectionSlug: 'confirmation-of-payee',
    slug: 'cop-query',
    method: 'POST',
    path: '/customers/action/cop-query',
    title: 'Confirm the IBAN matches the Name on the Account',
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: '/customers/action/cop-query',
      overrideServers: OZONE_SERVERS,
    },
  }),

  // Products & Leads
  entry({
    section: 'Products & Leads',
    sectionSlug: 'products-and-leads',
    slug: 'products',
    method: 'GET',
    path: '/products',
    title: 'Get Products',
    redoc: {
      spec: SPEC_PRODUCTS,
      filterPath: '/products',
      overrideServers: OZONE_SERVERS,
    },
  }),
  entry({
    section: 'Products & Leads',
    sectionSlug: 'products-and-leads',
    slug: 'leads',
    method: 'POST',
    path: '/leads',
    title: 'Submit Lead',
    redoc: {
      spec: SPEC_PRODUCTS,
      filterPath: '/leads',
      overrideServers: OZONE_SERVERS,
    },
  }),

  // ATMs
  entry({
    section: 'ATMs',
    sectionSlug: 'atms',
    slug: 'atm',
    method: 'GET',
    path: '/atm',
    title: 'Retrieve ATMs',
    redoc: {
      spec: SPEC_OPEN_DATA,
      filterPath: '/atm',
      overrideServers: OZONE_SERVERS,
    },
  }),

  // CAAP — User Verification
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Verification',
    slug: 'users-challenge-initialize',
    method: 'POST',
    path: '/users/actions/challenge/initialize',
    title: 'Initialize a User Challenge',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/challenge/initialize', overrideServers: OZONE_SERVERS },
  }),
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Verification',
    slug: 'users-challenge-query',
    method: 'POST',
    path: '/users/actions/challenge/query',
    title: 'Query a User Challenge',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/challenge/query', overrideServers: OZONE_SERVERS },
  }),
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Verification',
    slug: 'users-challenge-complete',
    method: 'POST',
    path: '/users/actions/challenge/complete',
    title: 'Complete a User Challenge',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/challenge/complete', overrideServers: OZONE_SERVERS },
  }),

  // CAAP — User Registration
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Registration',
    slug: 'users-register-initialize',
    method: 'POST',
    path: '/users/actions/register/initialize',
    title: 'Initialize User Registration',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/register/initialize', overrideServers: OZONE_SERVERS },
  }),
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Registration',
    slug: 'users-register-complete',
    method: 'POST',
    path: '/users/actions/register/complete',
    title: 'Complete User Registration',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/register/complete', overrideServers: OZONE_SERVERS },
  }),
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'User Registration',
    slug: 'users-deregister',
    method: 'POST',
    path: '/users/actions/deregister',
    title: 'Deregister a User',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/deregister', overrideServers: OZONE_SERVERS },
  }),

  // CAAP — PII Decryption
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'PII Decryption',
    slug: 'users-pii-decrypt',
    method: 'POST',
    path: '/users/actions/pii/decrypt',
    title: 'Decrypt PII for a User',
    redoc: { spec: SPEC_CAAP, filterPath: '/users/actions/pii/decrypt', overrideServers: OZONE_SERVERS },
  }),

  // CAAP — Consent Validation
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'Consent',
    slug: 'consent-actions-validate',
    method: 'POST',
    path: '/consent/actions/validate',
    title: 'Validate a Consent',
    redoc: { spec: SPEC_CAAP, filterPath: '/consent/actions/validate', overrideServers: OZONE_SERVERS },
  }),

  // CAAP — Accounts (CAAP-specific variant)
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'Accounts',
    slug: 'accounts',
    method: 'GET',
    path: '/accounts',
    title: 'Retrieve Accounts (CAAP)',
    redoc: { spec: SPEC_CAAP, filterPath: '/accounts', filterMethod: 'get', overrideServers: OZONE_SERVERS },
  }),
  entry({
    section: 'CAAP',
    sectionSlug: 'caap',
    subsection: 'Accounts',
    slug: 'accounts-accountId',
    method: 'GET',
    path: '/accounts/{accountId}',
    title: 'Retrieve an Account (CAAP)',
    redoc: { spec: SPEC_CAAP, filterPath: '/accounts/{accountId}', filterMethod: 'get', overrideServers: OZONE_SERVERS },
  }),

  // CAAP — Insurance Policies (list only; CAAP-only response properties)
  ...(['employment', 'health', 'home', 'life', 'motor', 'renters', 'travel'] as const).map((type) => {
    const Type = type.charAt(0).toUpperCase() + type.slice(1)
    return entry({
      section: 'CAAP',
      sectionSlug: 'caap',
      subsection: 'Insurance Policies',
      slug: `${type}-insurance-policies`,
      method: 'GET',
      path: `/${type}-insurance-policies`,
      title: `Retrieve ${Type} Insurance Policies (CAAP)`,
      redoc: { spec: SPEC_CAAP, filterPath: `/${type}-insurance-policies`, overrideServers: OZONE_SERVERS },
    })
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
            filterMethod: 'get',
            overrideServers: OZONE_SERVERS,
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
            overrideServers: OZONE_SERVERS,
          },
        }),
      ]
    },
  ),

  // Insurance Quotation — 7 insurance types × 4 endpoints
  // (POST quotes, GET/PATCH quotes/{QuoteId}, POST policies)
  ...(['employment', 'health', 'home', 'life', 'motor', 'renters', 'travel'] as const).flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1)
      return [
        entry({
          section: 'Insurance Quotation',
          sectionSlug: 'insurance-quotation',
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-quotes`,
          method: 'POST',
          path: `/${type}-insurance-quotes`,
          title: `Create a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes`,
            filterMethod: 'post',
            overrideServers: OZONE_SERVERS,
          },
        }),
        entry({
          section: 'Insurance Quotation',
          sectionSlug: 'insurance-quotation',
          subsection: `${Type} Insurance`,
          slug: `get-${type}-insurance-quotes-QuoteId`,
          method: 'GET',
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Retrieve a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: 'get',
            overrideServers: OZONE_SERVERS,
          },
        }),
        entry({
          section: 'Insurance Quotation',
          sectionSlug: 'insurance-quotation',
          subsection: `${Type} Insurance`,
          slug: `patch-${type}-insurance-quotes-QuoteId`,
          method: 'PATCH',
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Accept a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: 'patch',
            overrideServers: OZONE_SERVERS,
          },
        }),
        entry({
          section: 'Insurance Quotation',
          sectionSlug: 'insurance-quotation',
          subsection: `${Type} Insurance`,
          slug: `post-${type}-insurance-policies`,
          method: 'POST',
          path: `/${type}-insurance-policies`,
          title: `Create a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies`,
            filterMethod: 'post',
            overrideServers: OZONE_SERVERS,
          },
        }),
      ]
    },
  ),
] as const
