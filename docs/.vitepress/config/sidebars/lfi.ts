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
          { text: 'Roles', link: `${BASE}/trust-framework/roles` },
          {
            text: 'Keys & Certificates',
            items: [
              { text: 'Overview', link: `${BASE}/trust-framework/certificates` },
              { text: 'Server Certificates with SAN', link: `${BASE}/trust-framework/certificates-san` },
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
          { text: 'Overview', link: `${BASE}/api-hub/tpp-activation/` },
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
            text: 'API Reference',
            collapsed: true,
            items: [

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

                ],
              },
            ],
          },
          {
            text: 'ATMs',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/banking/atms` },
              { text: 'Requirements', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
              { text: 'API Guide', link: `${BASE}/${VERSION}/banking/atms/api-guide` },
              {
                text: 'API Reference',
                collapsed: true,
                items: [

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
          { text: 'TrustFramework Checklist', link: `${BASE}/production/testing-certification/readiness-checklist` },
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
