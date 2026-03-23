import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'

const BASE = '/tech/lfi-api-hub'
const VERSION = 'v2.1'

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
      {
        text: 'Applications',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/trust-framework/application` },
          { text: 'Creating An Application', link: `${BASE}/trust-framework/creating-an-application` },
          { text: 'Roles', link: `${BASE}/trust-framework/roles` },
          {
            text: 'Keys & Certificates',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/certificates/` },
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
      { text: 'Overview', link: `${BASE}/api-hub/` },
      {
        text: 'Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/api-hub/onboarding/` },
          { text: 'Prerequisites', link: `${BASE}/api-hub/onboarding/prerequisites` },
          { text: 'Application Layer Authentication', link: `${BASE}/api-hub/onboarding/application-layer-auth` },
          {
            text: 'Environment Specific',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/api-hub/onboarding/environment-specific` },
              { text: 'Ozone Connect Base URL', link: `${BASE}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: 'Authorization Endpoint', link: `${BASE}/api-hub/onboarding/environment-specific/auth-endpoint` },
            ]
          }
        ]
      },
      {
        text: 'Admin Portal',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/api-hub/admin-portal/` },
          { text: 'TPP Activation', link: `${BASE}/api-hub/tpp-activation/` },
        ]
      },
      {
        text: 'Deployments',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/api-hub/depolyments/` }
        ]
      }
    ],
  },



  {
    text: 'Ozone Connect Specifications',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/` },
      {
        text: 'Authentication & Authorization',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/auth/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/auth/requirements` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/auth/api-guide` },
          {
            text: 'Headless Heimdall API Reference',
            collapsed: true,
            items: [

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
          {
            text: 'Consent Management Interface',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/consent/consent-management-interface` },
              { text: 'Requirements', link: `${BASE}/${VERSION}/consent/consent-management-interface/requirements` },
              { text: 'User Experience', link: `${BASE}/${VERSION}/consent/consent-management-interface/user-experience` }
            ]
          },
          {
            text: 'Consent Manager API Reference',
            collapsed: true,
            items: [

            ],
          },
          {
            text: 'Consent Events & Actions',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/consent/events-and-actions` },
              {
                text: 'API Reference',
                collapsed: true,
                items: [

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
  }
]
