import { apiRef, type SidebarItem } from './shared'

const BASE = '/tech/tpp-standards'
const VERSION = 'v2.1'

function multiPaymentItems(base: string): SidebarItem[] {
  return [
    { text: 'Requirements', link: `${base}/requirements` },
    { text: 'User Experience', link: `${base}/user-journeys` },
    { text: 'API Guide', link: `${base}/api-guide` },
  ]
}

const INSURANCE_TYPES = [
  ['Employment', 'employment'],
  ['Health',     'health'],
  ['Home',       'home'],
  ['Life',       'life'],
  ['Motor',      'motor'],
  ['Renters',    'renters'],
  ['Travel',     'travel'],
] as const

function insuranceApiRef(base: string): SidebarItem[] {
  return INSURANCE_TYPES.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef('GET', `/${slug}-insurance-policies`, `${base}/${slug}-insurance-policies`),
      apiRef('GET', `/${slug}-insurance-policies/{InsurancePolicyId}`, `${base}/${slug}-insurance-policies-InsurancePolicyId`),
    ],
  }))
}

function insuranceQuotationApiRef(base: string): SidebarItem[] {
  return INSURANCE_TYPES.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef('POST', `/${slug}-insurance-quotes`, `${base}/${slug}-insurance-quotes`),
      apiRef('GET', `/${slug}-insurance-quotes/{QuoteId}`, `${base}/get-${slug}-insurance-quotes-QuoteId`),
      apiRef('PATCH', `/${slug}-insurance-quotes/{QuoteId}`, `${base}/patch-${slug}-insurance-quotes-QuoteId`),
      apiRef('POST', `/${slug}-insurance-policies`, `${base}/post-${slug}-insurance-policies`),
    ],
  }))
}

export const tppSidebar: SidebarItem[] = [
  {
    text: 'Getting Started',
    collapsed: true,
    items: [
      { text: 'Sandbox Quickstart', link: `${BASE}/${VERSION}/getting-started/` },
      { text: 'Postman Guide', link: `${BASE}/${VERSION}/getting-started/postman` },
      { text: 'Sandbox Model Bank', link: `${BASE}/sandbox/model-bank` },
      { text: 'Sandbox Model Insurer', link: `${BASE}/sandbox/model-insurer` },
    ],
  },
  {
    text: 'Trust Framework (Directory)',
    collapsed: true,
    items: [
      { text: 'Overview & Organisations', link: `${BASE}/trust-framework/` },
      {
        text: 'Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/onboarding/` },
          { text: 'Organisation Admins', link: `${BASE}/trust-framework/organisation-admins` },
          { text: 'Adding Users', link: `${BASE}/trust-framework/adding-users` },
          { text: 'User/Admin Sign Up', link: `${BASE}/trust-framework/user-sign-up` },
        ],
      },
      { text: 'Roles', link: `${BASE}/trust-framework/roles/` },
      {
        text: 'Applications',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/application` },
          { text: 'Creating An Application', link: `${BASE}/trust-framework/creating-an-application` },
          { text: 'Redirect URIs', link: `${BASE}/trust-framework/redirect-uri/` },
          {
            text: 'Keys & Certificates',
            collapsed: true,
            items: [
              { text: 'Overview',   link: `${BASE}/trust-framework/certificates/`},
              { text: 'Client Transport', link: `${BASE}/trust-framework/certificates/client-transport` },
              { text: 'Client Signing', link: `${BASE}/trust-framework/certificates/client-signing` },
              { text: 'Client Encryption', link: `${BASE}/trust-framework/certificates/client-encryption` },
              { text: 'Certificates with a SAN', link: `${BASE}/trust-framework/certificates-san/` },
            ],
          },
        ],
      },
      { text: 'Contacts', link: `${BASE}/trust-framework/contacts` },
      {
        text: 'LFI Discovery',
        collapsed: true,
        items: [
          { text: 'Overview & /participants', link: `${BASE}/trust-framework/api-discovery/` },
          {
            text: 'Authorisation Servers',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/authorisation-servers`},
              { text: 'Discovery', link: `${BASE}/trust-framework/well-known/` },
            ],
          },
          { text: 'API Resources', link: `${BASE}/trust-framework/api-resources` },
          { text: 'Flags & Meta Data', link: `${BASE}/trust-framework/flags-metadata` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/participants', `${BASE}/trust-framework/open-api/participants`),
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'Registration',
    collapsed: true,
    items: [
      { text: 'Overview & API Guide', link: `${BASE}/registration/api-guide` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          apiRef('POST', '/tpp-registration', `${BASE}/registration/open-api/tpp-registration`),
        ],
      },
    ],
  },

  {
    text: 'Security, Auth & Headers',
    collapsed: true,
    items: [
      {
        text: 'FAPI Security Profile',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/security/fapi` },
          { text: 'Preparing /par request JWT', link: `${BASE}/security/fapi/request-jwt` },
          { text: 'Message Signing', link: `${BASE}/security/fapi/message-signing` },
          { text: 'Message Encryption', link: `${BASE}/security/fapi/message-encryption` },
          { text: 'Receiving Event Notifications', link: `${BASE}/security/fapi/receiving-events` },
          { text: 'Handling Authorization Callbacks', link: `${BASE}/security/fapi/handling-callback` },
        ],
      },
      {
        text: 'Tokens & Assertions',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/security/tokens` },
          { text: 'Preparing Client Assertion', link: `${BASE}/security/tokens/client-assertion` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/token', `${BASE}/security/tokens/open-api/token`),
            ],
          },
        ],
      },
      { text: 'Request Headers', link: `${BASE}/security/request-headers` },
    ],
  },

  {
    text: 'Consent',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/consent/` },
      { text: 'Requirements', link: `${BASE}/${VERSION}/consent/requirements` },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent/api-guide` },
      {
        text: 'Consent Management Interface',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/consent/consent-management-interface` },
          {
            text: 'Bank Data Sharing',
            collapsed: true,
            items: [
              { text: 'Requirements', link: `${BASE}/${VERSION}/consent/consent-management-interface/bank-data-sharing/requirements` },
              { text: 'User Experience', link: `${BASE}/${VERSION}/consent/consent-management-interface/bank-data-sharing/user-experience` },
            ],
          },
          {
            text: 'Bank Service Initiation',
            collapsed: true,
            items: [
              { text: 'Requirements', link: `${BASE}/${VERSION}/consent/consent-management-interface/bank-service-initiation/requirements` },
              { text: 'User Experience', link: `${BASE}/${VERSION}/consent/consent-management-interface/bank-service-initiation/user-experience` },
            ],
          },
          {
            text: 'Insurance Data Sharing',
            collapsed: true,
            items: [
              { text: 'Requirements', link: `${BASE}/${VERSION}/consent/consent-management-interface/insurance-data-sharing/requirements` },
              { text: 'User Experience', link: `${BASE}/${VERSION}/consent/consent-management-interface/insurance-data-sharing/user-experience` },
            ],
          },
        ],
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          {
            text: 'Create Consent',
            items: [
              apiRef('POST', '/par', `${BASE}/${VERSION}/consent/open-api/par`),
            ],
          },
          {
            text: 'Bank Data Sharing',
            items: [
              apiRef('GET', '/account-access-consents', `${BASE}/${VERSION}/consent/open-api/account-access-consents`),
              apiRef('GET', '/account-access-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/account-access-consents-ConsentId`),
              apiRef('PATCH', '/account-access-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/patch-account-access-consents-ConsentId`),
            ],
          },
          {
            text: 'Bank Service Initiation',
            items: [
              apiRef('GET', '/payment-consents', `${BASE}/${VERSION}/consent/open-api/payment-consents`),
              apiRef('GET', '/payment-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/payment-consents-ConsentId`),
              apiRef('PATCH', '/payment-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/patch-payment-consents-ConsentId`),
            ],
          },
          {
            text: 'Insurance Data Sharing',
            items: [
              apiRef('GET', '/insurance-consents', `${BASE}/${VERSION}/consent/open-api/insurance-consents`),
              apiRef('GET', '/insurance-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/insurance-consents-ConsentId`),
              apiRef('PATCH', '/insurance-consents/{ConsentId}', `${BASE}/${VERSION}/consent/open-api/patch-insurance-consents-ConsentId`),
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'Banking',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/banking` },
      {
        text: 'Data Sharing',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/data-sharing` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/data-sharing/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/banking/data-sharing/api-guide` },
              { text: 'Pagination', link: `${BASE}/${VERSION}/banking/data-sharing/api-guide/pagination` },
              { text: 'Encrypted FinanceRates', link: `${BASE}/${VERSION}/banking/data-sharing/api-guide/finance-rates` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/accounts', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts`),
              apiRef('GET', '/accounts/{AccountId}', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef('GET', '/accounts/{AccountId}/balances', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef('GET', '/accounts/{AccountId}/beneficiaries', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef('GET', '/accounts/{AccountId}/direct-debits', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef('GET', '/parties', `${BASE}/${VERSION}/banking/data-sharing/open-api/parties`),
              apiRef('GET', '/accounts/{AccountId}/parties', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-parties`),
              apiRef('GET', '/accounts/{AccountId}/product', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-product`),
              apiRef('GET', '/accounts/{AccountId}/scheduled-payments', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef('GET', '/accounts/{AccountId}/standing-orders', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef('GET', '/accounts/{AccountId}/statements', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef('GET', '/accounts/{AccountId}/transactions', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-transactions`),
            ],
          },
        ],
      },
      {
        text: 'Payments (Service Initiation)',
        collapsed: true,
        items: [
          { text: 'Overview',  link: `${BASE}/${VERSION}/banking/service-initiation/`},
          {
            text: 'Domestic Payments',
            collapsed: true,
            items: [
               {
                text: 'Overview',
                collapsed: true,
                items: [
                  { text: 'Payment Rails and Status', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/overview/payment-status` },
                ],
              },
              {
                text: 'Single Instant Payment',
                collapsed: true,
                items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/single-instant-payment`),
              },
              {
                text: 'Multi Payments',
                collapsed: true,
                items: [
                  { text: 'Variable On Demand', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand`) },
                  { text: 'Fixed On Demand', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: 'Variable Periodic Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: 'Fixed Periodic Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: 'Variable Defined Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: 'Fixed Defined Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                   { text: 'Delegated SCA', collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) },
                ],
              },
            ],
          },
          {
            text: 'Personal Identifiable Information',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/` },
              { text: 'Debtor Account', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: 'Creditor', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/creditor` },
              { text: 'Risk', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/risk` },
              { text: 'API Schemas',
                collapsed: true,
                items: [
                { text: 'PII (Post /par)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                { text: 'PII (Post /payments)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` },
                ],
               },
            ],
          },
          {
            text: 'Multi Authorization', link: `${BASE}/${VERSION}/banking/service-initiation/multi-authorization`,
          },
          {
            text: 'Refunds',
            collapsed: true,
            items: [
              { text: 'Requirements', link: `${BASE}/${VERSION}/banking/service-initiation/refunds/requirements` },
              { text: 'API Guide', link: `${BASE}/${VERSION}/banking/service-initiation/refunds/api-guide` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/payments', `${BASE}/${VERSION}/banking/service-initiation/open-api/payments`),
              apiRef('GET', '/payments/{PaymentId}', `${BASE}/${VERSION}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef('GET', '/payments', `${BASE}/${VERSION}/banking/service-initiation/open-api/payments-idempotency`),
              apiRef('GET', '/payment-consents/{ConsentId}/refund', `${BASE}/${VERSION}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
            ],
          },
        ],
      },
      {
        text: 'Confirmation of Payee',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/confirmation-of-payee` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/discovery', `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/discovery`),
              apiRef('POST', '/confirmation', `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/confirmation`),
            ],
          },
        ],
      },
      {
        text: 'Products and Leads',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/products-leads/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/products-leads/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/products-leads/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/products-leads/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/products', `${BASE}/${VERSION}/banking/products-leads/open-api/products`),
              apiRef('POST', '/leads', `${BASE}/${VERSION}/banking/products-leads/open-api/leads`),
            ],
          },
        ],
      },
      {
        text: 'ATMs',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/atms` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/atms/requirements` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/atms/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/atms', `${BASE}/${VERSION}/banking/atms/open-api/atms`),
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'Insurance',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/insurance/` },
      {
        text: 'Data Sharing',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/insurance/data-sharing/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/insurance/data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/insurance/data-sharing/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/insurance/data-sharing/api-guide/` },
              { text: 'Encrypted Premiums', link: `${BASE}/${VERSION}/insurance/data-sharing/api-guide/premiums` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: insuranceApiRef(`${BASE}/${VERSION}/insurance/data-sharing/open-api`),
          },
        ],
      },
      {
        text: 'Quotation',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/insurance/quotation/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/insurance/quotation/requirements` },
          { text: 'Quote Types (New / Renewal / Switch)', link: `/tech/lfi-api-hub/${VERSION}/insurance/quotation/quote-types` },
          { text: 'User Journeys', link: `${BASE}/${VERSION}/insurance/quotation/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview & Event Schema', link: `${BASE}/${VERSION}/insurance/quotation/api-guide/` },
              { text: 'LFI-Led Flow', link: `${BASE}/${VERSION}/insurance/quotation/api-guide/lfi-led` },
              { text: 'TPP-Led Flow', link: `${BASE}/${VERSION}/insurance/quotation/api-guide/tpp-led` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: insuranceQuotationApiRef(`${BASE}/${VERSION}/insurance/quotation/open-api`),
          },
        ],
      },
    ],
  },

  {
    text: 'Event Notifications & Webhooks',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/webhooks/` },
      {
        text: 'Consent Status',
        collapsed: true,
        items: [
          { text: 'API Guide', link: `${BASE}/${VERSION}/webhooks/consent-status/api-guide` },
          {
            text: 'API Referrence',
            collapsed: true,
            items: [
              apiRef('POST', '[consent status]', `${BASE}/${VERSION}/webhooks/consent-status/open-api`),
            ],
          },
        ],
      },
      {
        text: 'Payment Status',
        collapsed: true,
        items: [
          { text: 'API Guide', link: `${BASE}/${VERSION}/webhooks/payment-status/api-guide` },
          {
            text: 'API Referrence',
            collapsed: true,
            items: [
              apiRef('POST', '[payment status]', `${BASE}/${VERSION}/webhooks/payment-status/open-api`),
            ],
          },
        ],
      },
      {
        text: 'Insurance Quote Status',
        collapsed: true,
        items: [
          { text: 'API Guide', link: `${BASE}/${VERSION}/webhooks/insurance-status/api-guide` },
          {
            text: 'API Referrence',
            collapsed: true,
            items: [
              apiRef('POST', '[insurance quote status]', `${BASE}/${VERSION}/webhooks/insurance-status/open-api`),
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'Testing & Certification',
    collapsed: true,
    items: [
      {
        text: 'Required Certifications',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/production/testing-certification/overview` },
          {
            text: 'Functional Evidence',
            collapsed: true,
            items: [
              { text: 'Bank Data Sharing', link: `${BASE}/production/testing-certification/functional/bank-data-sharing` },
              { text: 'Domestic Payments', link: `${BASE}/production/testing-certification/functional/domestic-payments` },
              { text: 'Confirmation of Payee', link: `${BASE}/production/testing-certification/functional/confirmation-of-payee` },
              { text: 'Insurance Data Sharing', link: `${BASE}/production/testing-certification/functional/insurance-data-sharing` },
            ],
          },
          { text: 'User Experience Evidence', link: `${BASE}/production/testing-certification/user-experience` },
          { text: 'FAPI Conformance', link: `${BASE}/production/testing-certification/fapi` },
          { text: 'Security Validation', link: `${BASE}/production/testing-certification/security-validation` },
        ],
      },
      {
        text: 'Optional Certifications',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/production/testing-certification/optional/overview` },
          { text: 'Access Encrypted Resource Data', link: `${BASE}/production/testing-certification/optional/access-encrypted-resource-data` },
        ],
      },
      { text: 'Production Live Proving', link: `${BASE}/production/live-proving` },
    ],
  },
]
