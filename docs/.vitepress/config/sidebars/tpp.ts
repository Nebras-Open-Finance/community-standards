import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'

const BASE = '/tech/tpp-standards'
const VERSION = 'v2.1'

function multiPaymentItems(base: string): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Requirements', link: `${base}/requirements` },
    { text: 'User Experience', link: `${base}/user-journeys` },
    { text: 'API Guide', link: `${base}/api-guide` },
  ]
}

export const tppSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    collapsed: true,
    items: [
      { text: 'TPP Sandbox Quickstart', link: `${BASE}/getting-started` }
    ],
  },
  {
    text: 'Trust Framework (Directory)',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/trust-framework/` },
      {
        text: 'Onboarding',
        collapsed: true,
        link: `${BASE}/trust-framework/onboarding/`,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/onboarding/` },
          { text: 'Roles in the Trust Framework', link: `${BASE}/trust-framework/roles/` },
        ],
      },
      {
        text: 'Creating an Application',
        collapsed: true,
        link: `${BASE}/trust-framework/application`,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/application` },
          { text: 'Handling Redirect URIs', link: `${BASE}/trust-framework/redirect-uri/` },
          {
            text: 'Keys and Certificates',
            link: `${BASE}/trust-framework/certificates/`,
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/certificates/` },
              { text: 'Certificates with a SAN', link: `${BASE}/trust-framework/certificates-san/` },
            ],
          },
        ],
      },
      {
        text: 'API Guides',
        collapsed: true,
        items: [
          { text: '/participants', link: `${BASE}/trust-framework/api-discovery/` },
          { text: '/.well-known', link: `${BASE}/trust-framework/well-known/` },
        ],
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          apiRef('GET', '/participants', `${BASE}/trust-framework/open-api/participants`),
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
    text: 'Security & Authorization',
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
    ],
  },

  {
    text: 'Consent',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/consent/` },
      { text: 'Requirements', link: `${BASE}/${VERSION}/consent/requirements` },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent/api-guide` },
      { text: 'Consent Management Interface', link: `${BASE}/${VERSION}/consent/consent-management-interface` },
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
        link: `${BASE}/${VERSION}/banking/data-sharing`,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/data-sharing` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/data-sharing/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/data-sharing/api-guide` },
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
          {
            text: 'Domestic Payments',
            collapsed: true,
            items: [
               {
                text: 'Overview',
                collapsed: true,
                items: [
                  { text: 'Payment Rails', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/overview/payment-rails` },
                  { text: 'Payment Status', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/overview/payment-status` },
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
            ],
          },
          {
            text: 'Multi Authorization', link: `${BASE}/${VERSION}/banking/service-initiation//multi-authorization/`
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
          { text: 'Requirements', link: `${BASE}/${VERSION}/requirements` },
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
      // {
      //   text: 'Products and Leads',
      //   collapsed: true,
      //   items: [
      //     { text: 'Requirements', link: `${BASE}/${VERSION}/banking/products-leads/requirements` },
      //     { text: 'User Experience', link: `${BASE}/${VERSION}/banking/products-leads/user-journeys` },
      //     { text: 'API Guide', link: `${BASE}/${VERSION}/banking/products-leads/api-guide` },
      //     {
      //       text: 'API Reference',
      //       collapsed: true,
      //       items: [
      //         apiRef('GET', '/products', `${BASE}/${VERSION}/banking/products-leads/open-api/products`),
      //         apiRef('POST', '/leads', `${BASE}/${VERSION}/banking/products-leads/open-api/leads `),
      //       ],
      //     },
      //   ],
      // },
    ],
  },

    {
    text: 'Sandbox',
    collapsed: true,
    items: [
  { text: 'Model Bank', link: `${BASE}/sandbox/model-bank` },
  ]
  },

  {
    text: 'Production',
    collapsed: true,
    items: [
  {
    text: 'Testing & Certification',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/production/testing-certification/overview` },
      { text: 'Readiness Checklist', link: `${BASE}/production/testing-certification/readiness-checklist` },
      {
        text: 'Functional Evidence',
        collapsed: true,
        items: [
          { text: 'Bank Data Sharing', link: `${BASE}/production/testing-certification/functional` },
        ],
      },
      { text: 'User Experience Evidence', link: `${BASE}/production/testing-certification/user-experience` },
      { text: 'FAPI Conformance', link: `${BASE}/production/testing-certification/fapi` },
      { text: 'Security Validation', link: `${BASE}/production/testing-certification/security-validation` },
    ],
  },
  { text: 'Production Live Proving', link: `${BASE}/production/live-proving` },
  ]
  }
]
