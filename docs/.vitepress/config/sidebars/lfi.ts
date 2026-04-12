import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'

const BASE = '/tech/lfi-api-hub'
const VERSION = 'v2.1'

function multiPaymentItems(base: string): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Requirements', link: `${base}/requirements` },
    { text: 'User Experience', link: `${base}/user-journeys` },
    { text: 'API Guide', link: `${base}/api-guide` },
  ]
}

export const lfiSidebar: DefaultTheme.SidebarItem[] = [



  {
    text: 'Getting Started',
    collapsed: true,
    items: [
      { text: 'LFI Integration Journey', link: `${BASE}/getting-started/` },
    ],
  },


  {
    text: 'Trust Framework',
    collapsed: true,
    items: [
      { text: 'Overview & Organisations', link: `${BASE}/trust-framework/` },
      {
        text: 'Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/onboarding` },
          { text: 'Organisation Admins', link: `${BASE}/trust-framework/organisation-admins` },
          { text: 'Adding Users', link: `${BASE}/trust-framework/adding-users` },
          { text: 'User/Admin Sign Up', link: `${BASE}/trust-framework/user-sign-up` },
        ],
      },
      { text: 'Roles', link: `${BASE}/trust-framework/roles` },
      {
        text: 'Servers',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/servers` },
          { text: 'Creating a Server', link: `${BASE}/trust-framework/servers/creating` },
          {
            text: 'API Resources',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/servers/api` },
              { text: 'Creating an API resource', link: `${BASE}/trust-framework/servers/api/creating` },
              { text: 'Meta Data', link: `${BASE}/trust-framework/servers/api/meta` },
            ],
          },

        ],
      },
      {
        text: 'Applications',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/application` },
          { text: 'Creating C3-hh-cm-client', link: `${BASE}/trust-framework/creating-c3-application` },
          {
            text: 'Keys & Certificates',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/certificates/` },
              { text: 'Client Transport', link: `${BASE}/trust-framework/certificates/client-transport` },
              { text: 'Client Signing', link: `${BASE}/trust-framework/certificates/client-signing` },
              { text: 'Certificates with a SAN', link: `${BASE}/trust-framework/certificates-san/` },
            ],
          },
        ],
      },
      { text: 'Contacts', link: `${BASE}/trust-framework/contacts` },
      {
        text: 'Trust Framework APIs',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/api/` },
          {
            text: 'API Guide', link: `${BASE}/trust-framework/api/api-guide`
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/token', `${BASE}/trust-framework/api/token`),
              apiRef('GET', '/organisations', `${BASE}/trust-framework/api/organisations`),
              apiRef('GET', '.../{OrganisationId}/softwarestatements', `${BASE}/trust-framework/api/software-statements`),
              apiRef('GET', '.../{OrganisationId}/authorisationservers', `${BASE}/trust-framework/api/auth-servers`),
              apiRef('GET', '.../{AuthorisationServerId}/apiresources', `${BASE}/trust-framework/api/api-resources`),
              apiRef('GET', '/references/apifamilies', `${BASE}/trust-framework/api/api-families`),
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'API Hub',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/` },
      { text: 'Connectivity & Certificates', link: `${BASE}/${VERSION}/api-hub/connectivity/` },
      {
        text: 'Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/onboarding/` },
          { text: 'Prerequisites Questionnaire', link: `${BASE}/${VERSION}/api-hub/onboarding/prerequisites` },
          {
            text: 'Application Layer Authentication',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/onboarding/application-layer-auth` },
              { text: 'JWT Auth', link: `${BASE}/${VERSION}/api-hub/onboarding/jwt-auth` },
            ]
          },
          {
            text: 'Environment Specific',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific` },
              { text: 'Certificate Walkthroughs', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/certificate-walkthroughs` },
              { text: 'Ozone Connect Base URL', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: 'Authorization Endpoint', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/auth-endpoint` },
            ]
          }
        ]
      },
      {
        text: 'Admin Portal',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/admin-portal/` },
          { text: 'TPP Management & Activation', link: `${BASE}/${VERSION}/api-hub/admin-portal/tpp-activation` },
          { text: 'Logs', link: `${BASE}/${VERSION}/api-hub/admin-portal/logs` },
          { text: 'Reports', link: `${BASE}/${VERSION}/api-hub/admin-portal/reports` },
        ]
      },
      {
        text: 'Headless Heimdall Auth Server',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/headless-heimdall` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              {
                text: 'Health Check',
                items: [
                  apiRef('GET', '/hello-mtls', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/hello-mtls`),
                ]
              },
              {
                text: 'Authorization',
                items: [
                  apiRef('GET', '/auth', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth`),
                  apiRef('POST', '/auth/{interactionId}/doConfirm', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                  apiRef('POST', '/auth/{interactionId}/doFail', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`),
                ]
              },
            ],
          },
        ],
      },
      {
        text: 'Consent Manager',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/consent-manager/` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              {
                text: 'Health Check',
                items: [
                  apiRef('GET', '/hello-mtls', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/hello-mtls`),
                ]
              },
              {
                text: 'Consents',
                items: [
                  apiRef('GET', '/consents', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consents`),
                  apiRef('GET', '/consents/{consentId}', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consents-consentId`),
                  apiRef('PATCH', '/consents/{consentId}', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/patch-consents-consentId`),
                  apiRef('GET', '/consents/{consentId}/audit', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consents-consentId-audit`),
                  apiRef('GET', '/consent-groups/{consentGroupId}/consents', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
                  apiRef('GET', '/psu/{userId}/consents', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/psu-userId-consents`),
                  apiRef('GET', '/accounts/{accountId}/consents', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
                  apiRef('POST', '/consent-groups/{consentGroupId}/consents/action/revoke', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
                  apiRef('POST', '/consents/{consentId}/action/revoke', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`),
                ]
              },
              {
                text: 'Payment Log',
                items: [
                  apiRef('GET', '/payment-log', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/payment-log`),
                  apiRef('PATCH', '/payment-log/{id}', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/payment-log-id`),
                ]
              },
            ],
          },
        ],
      },
      {
        text: 'Deployments',
        collapsed: true,
        items: [
          { text: '2026', link: `${BASE}/${VERSION}/api-hub/deployments/2026` }
        ]
      },
    ],
  },

  {
      text: 'Ozone Connect | Consent Events',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${BASE}/${VERSION}/consent-events` },
        { text: 'API Guide', link: `${BASE}/${VERSION}/consent-events/api-guide` },
        {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/consent/action/validate', `${BASE}/${VERSION}/consent-events/open-api/validate`),
              apiRef('POST', '/consent/event/{operation}', `${BASE}/${VERSION}/consent-events/open-api/event-op`),
            ],
          },
      ]
  },

  {
    text: 'Ozone Connect | Banking',
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
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/data-sharing/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/accounts', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts`),
              apiRef('GET', '/accounts/{AccountId}', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef('GET', '/accounts/{AccountId}/balances', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef('GET', '/accounts/{AccountId}/beneficiaries', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef('GET', '/customer', `${BASE}/${VERSION}/banking/data-sharing/open-api/customer`),
              apiRef('GET', '/accounts/{AccountId}/customer', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-customer`),
              apiRef('GET', '/accounts/{AccountId}/direct-debits', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef('GET', '/accounts/{AccountId}/products', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-products`),
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
                  {
                    text: 'Variable On Demand', collapsed: true,
                    items: [
                      { text: 'Requirements', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements` },
                      { text: 'User Experience', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys` },
                      { text: 'API Guide', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide` },
                    ]
                  },
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
              {
                text: 'API Guide',
                collapsed: true,
                items: [
                  { text: 'How to Decrypt PII', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii` },
                  { text: 'Verify TPP Signature (Optional)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature` },
                ]
              },
              {
                text: 'API Schemas',
                collapsed: true,
                items: [
                  { text: 'PII (Consent - Consent Manager)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: 'PII (Payments - Ozone Connect)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` },
                ]
              },
            ],
          },
          {
            text: 'Multi Authorization', link: `${BASE}/${VERSION}/banking/service-initiation//multi-authorization/`
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
              apiRef('GET', '/payment-consents/{ConsentId}/refund', `${BASE}/${VERSION}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
            ],
          },
        ],
      },
      {
        text: 'Confirmation of Payee',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/customers/action/cop-query', `${BASE}//${VERSION}/banking/confirmation-of-payee/open-api/cop-query`),
            ],
          },
        ],
      },
      {
        text: 'Products & Leads',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/products-and-leads/requirements` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/products-and-leads/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [

            ],
          },
        ],
      },
      {
        text: 'ATMs',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/atms/requirements` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/atms/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/atm', `${BASE}/${VERSION}/banking/atms/open-api/atm`),
            ],
          },
        ],
      },
    ]
  },


  {
    text: 'Consent Journey',
    collapsed: true,
    items: [
      {
        text: 'Authentication',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/consent-journey/authentication` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-journey/authentication/requirements` },
          { text: 'Strong Customer Authentication', link: `${BASE}/${VERSION}/consent-journey/authentication/sca` },
          { text: 'Implementation Guide', link: `${BASE}/${VERSION}/consent-journey/authentication/implementation` },
        ]
      },
      {
        text: 'Authorization',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/consent-journey/authorization` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-journey/authorization/requirements` },
        ]
      },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent-journey/api-guide` },
    ],
  },

  {
    text: 'Consent Management Interface',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/consent-management-interface/` },
      { text: 'Requirements', link: `${BASE}/${VERSION}/consent-management-interface/requirements` },
      { text: 'User Experience', link: `${BASE}/${VERSION}/consent-management-interface/user-experience` },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent-management-interface/api-guide` },
    ],

  },

  {
    text: 'Operational Requirements',
    collapsed: true,
    items: [
      { text: 'Availability', link: `${BASE}/operational-requirements/` },
      { text: 'API Responsiveness', link: `${BASE}/operational-requirements/api-responsiveness` },
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
              { text: 'Bank Data Sharing', link: `${BASE}/production/testing-certification/functional` },
            ],
          },
          { text: 'User Experience Evidence', link: `${BASE}/production/testing-certification/user-experience` },
          { text: 'Performance Testing', link: `${BASE}/production/testing-certification/performance` },
          { text: 'Security Validation', link: `${BASE}/production/testing-certification/security-validation` },
        ],
      },
      {
        text: 'Production Live Proving',
        collapsed: true,
        items: [
          { text: 'Attestation & Self Testing', link: `${BASE}/production/testing-certification/self-testing` },
          { text: 'TPP Buddying', link: `${BASE}/production/testing-certification/tpp-buddying` },
        ]
      },
    ]
  },

  {
    text: 'CAAP',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/caap/` },
    ],
  },
]
