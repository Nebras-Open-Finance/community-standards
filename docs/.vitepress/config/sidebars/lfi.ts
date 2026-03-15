import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'

const BASE = '/tech/lfi-api-hub'
const VERSION = 'v2.1'

export const lfiSidebar: DefaultTheme.SidebarItem[] = [

  // ── Getting Started ───────────────────────────────────────────────────
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'LFI Integration Journey', link: `${BASE}/getting-started/` },
    ],
  },

  // ── Trust Framework (Directory) ──────────────────────────────────────
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
    ],
  },

  // ── Onboarding to the API Hub ─────────────────────────────────────────
  {
    text: 'Onboarding to the API Hub',
    collapsed: true,
    items: [
      { text: 'Overview of the API Hub', link: `${BASE}/${VERSION}/onboarding/` },
      { text: 'Prerequisites', link: `${BASE}/${VERSION}/onboarding/prerequisites` },
      { text: 'Application Layer Authentication', link: `${BASE}/${VERSION}/onboarding/application-layer-auth` },
      { text: 'Environment Specific', link: `${BASE}/${VERSION}/onboarding/environment-specific` },
    ],
  },

  // ── Admin Portal ──────────────────────────────────────────────────────
  {
    text: 'Admin Portal',
    collapsed: true,
    items: [
      { text: 'TPP Activation', link: '/tech/lfi-api-hub/admin-portal/tpp-activation' },
    ],
  },

  // ── Banking ───────────────────────────────────────────────────────────
  {
    text: 'Banking',
    collapsed: true,
    items: [
      {
        text: 'Data Sharing',
        items: [
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
              apiRef('GET', '/customer', `${BASE}/${VERSION}/banking/data-sharing/open-api/customer`),
              apiRef('GET', '/accounts/{AccountId}/customer', `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-customer`),
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
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/`},
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/customers/action/cop-query', `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/cop-query`)
            ],
          },
        ],
      },
    ],
  },

]
