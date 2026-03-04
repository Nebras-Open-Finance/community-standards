import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'

const BASE = '/tech/lfi-api-hub'
const VERSION = 'v2.1'

export const lfiSidebar: DefaultTheme.SidebarItem[] = [

  // ── Trust Framework (Directory) ──────────────────────────────────────
  {
    text: 'Trust Framework (Directory)',
    collapsed: true,
    link: `${BASE}/trust-framework/`,
    items: [
      {
        text: 'Onboarding',
        collapsed: true,
        link: `${BASE}/trust-framework/onboarding/`,
        items: [
          { text: 'Adding Users', link: `${BASE}/trust-framework/onboarding/adding-users` },
        ],
      },
      { text: 'Organisation Certificates', link: `${BASE}/trust-framework/onboarding/organisation-certificates` },
      {
        text: 'Creating an Application',
        link: `${BASE}/trust-framework/onboarding/application`,
        items: [
          { text: 'Keys and Certificates', link: `${BASE}/trust-framework/onboarding/keys-certificates` },
        ],
      },
    ],
  },

  // ── Onboarding to the API Hub ─────────────────────────────────────────
  {
    text: 'Onboarding to the API Hub',
    collapsed: true,
    link: `${BASE}/onboarding/`,
    items: [
      { text: 'Overview of the API Hub', link: `${BASE}/onboarding/` },
      { text: 'Prerequisites', link: `${BASE}/onboarding/prerequisites` },
      { text: 'Application Layer Authentication', link: `${BASE}/onboarding/application-layer-auth` },
      { text: 'Environment Specific', link: `${BASE}/onboarding/environment-specific` },
    ],
  },

  // ── Admin Portal ──────────────────────────────────────────────────────
  {
    text: 'Admin Portal',
    collapsed: true,
    link: '/tech/lfi-api-hub/admin-portal',
    items: [
      { text: 'TPP Activation', link: '/tech/lfi-api-hub/admin-portal/tpp-activation' },
    ],
  },

  // ── Consent ───────────────────────────────────────────────────────────
  {
    text: 'Consent',
    collapsed: true,
    link: `${BASE}/consent/`,
    items: [],
  },

  // ── Banking ───────────────────────────────────────────────────────────
  {
    text: 'Banking',
    collapsed: true,
    link: `${BASE}/${VERSION}/banking/`,
    items: [
      {
        text: 'Data Sharing',
        collapsed: true,
        link: `${BASE}/${VERSION}/banking/data-sharing/`,
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
        link: `${BASE}/${VERSION}/banking/confirmation-of-payee/`,
        items: [
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
