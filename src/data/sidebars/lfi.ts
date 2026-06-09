import { apiRef, type SidebarItem } from './shared'

const BASE = '/tech/lfi-api-hub'
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

export const lfiSidebar: SidebarItem[] = [
  {
    text: 'Getting Started',
    collapsed: true,
    items: [
      { text: 'LFI Integration Journey', link: `${BASE}/getting-started/` },
      { text: 'Recommended Bank Rollout Plan', link: `${BASE}/getting-started/bank-rollout-plan` },
      { text: 'Recommended Insurance Rollout Plan', link: `${BASE}/getting-started/insurance-rollout-plan` },
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
            text: 'API Guide', link: `${BASE}/trust-framework/api/api-guide`,
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/token', `${BASE}/trust-framework/api/token`),
              apiRef('GET', '/organisations', `${BASE}/trust-framework/api/organisations`),
              apiRef('GET', '.../{OrganisationId}/softwarestatements', `${BASE}/trust-framework/api/software-statements`),
              apiRef('GET', '.../{OrganisationId}/contacts', `${BASE}/trust-framework/api/contacts`),
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
          { text: 'Application Layer Authentication', link: `${BASE}/${VERSION}/api-hub/onboarding/application-layer-auth` },
          {
            text: 'Environment Specific',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific` },
              { text: 'Certificate Walkthroughs', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/certificate-walkthroughs` },
              { text: 'Ozone Connect Base URL', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: 'Authorization Endpoint', link: `${BASE}/${VERSION}/api-hub/onboarding/environment-specific/auth-endpoint` },
            ],
          },
          {
            text: 'Configuring Authentication',
            collapsed: true,
            items: [
              { text: 'mTLS — Server-side', link: `${BASE}/${VERSION}/api-hub/onboarding/configuring-authentication/mtls-server` },
              { text: 'mTLS — Client-side', link: `${BASE}/${VERSION}/api-hub/onboarding/configuring-authentication/mtls-client` },
              { text: 'JWT — Server-side', link: `${BASE}/${VERSION}/api-hub/onboarding/configuring-authentication/jwt-server` },
              { text: 'JWT — Client-side', link: `${BASE}/${VERSION}/api-hub/onboarding/configuring-authentication/jwt-client` },
            ],
          },
        ],
      },
      {
        text: 'Admin Portal',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/api-hub/admin-portal/` },
          { text: 'TPP Management & Activation', link: `${BASE}/${VERSION}/api-hub/admin-portal/tpp-activation` },
          { text: 'Logs', link: `${BASE}/${VERSION}/api-hub/admin-portal/logs` },
          { text: 'Reports', link: `${BASE}/${VERSION}/api-hub/admin-portal/reports` },
        ],
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
                ],
              },
              {
                text: 'Authorization',
                items: [
                  apiRef('GET', '/auth', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth`),
                  apiRef('POST', '/auth/{interactionId}/doConfirm', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                  apiRef('POST', '/auth/{interactionId}/doFail', `${BASE}/${VERSION}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`),
                ],
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
                ],
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
                ],
              },
              {
                text: 'Payment Log',
                items: [
                  apiRef('GET', '/payment-log', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/payment-log`),
                  apiRef('PATCH', '/payment-log/{id}', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/payment-log-id`),
                ],
              },
              {
                text: 'Insurance Quote Log',
                items: [
                  apiRef('PATCH', '/insurance-quote-log/{logId}', `${BASE}/${VERSION}/api-hub/consent-manager/open-api/insurance-quote-log-logId`),
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    text: 'Ozone Connect | Health Check',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/health-check/` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          apiRef('GET', '/hello', `${BASE}/${VERSION}/health-check/open-api/hello`),
          apiRef('GET', '/hello-mtls', `${BASE}/${VERSION}/health-check/open-api/hello-mtls`),
          apiRef('GET', '/echo-cert', `${BASE}/${VERSION}/health-check/open-api/echo-cert`),
        ],
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
    ],
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
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/service-initiation/` },
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
                  {
                    text: 'Variable On Demand', collapsed: true,
                    items: [
                      { text: 'Requirements', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements` },
                      { text: 'User Experience', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys` },
                      { text: 'API Guide', link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide` },
                    ],
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
              { text: 'Debtor Account', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: 'Creditor', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/creditor` },
              {
                text: 'API Guide',
                collapsed: true,
                items: [
                  { text: 'How to Decrypt PII', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii` },
                  { text: 'Verify TPP Signature (Optional)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature` },
                ],
              },
              {
                text: 'API Schemas',
                collapsed: true,
                items: [
                  { text: 'PII (Consent - Consent Manager)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: 'PII (Payments - Ozone Connect)', link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` },
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
              apiRef('GET', '/payment-consents/{ConsentId}/refund', `${BASE}/${VERSION}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
            ],
          },
        ],
      },
      {
        text: 'Confirmation of Payee',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/confirmation-of-payee/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/customers/action/cop-query', `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/cop-query`),
            ],
          },
        ],
      },
      {
        text: 'Products & Leads',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/products-and-leads/` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/banking/products-and-leads/requirements` },
          { text: 'API Guide', link: `${BASE}/${VERSION}/banking/products-and-leads/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/products', `${BASE}/${VERSION}/banking/products-and-leads/open-api/products`),
              apiRef('POST', '/leads', `${BASE}/${VERSION}/banking/products-and-leads/open-api/leads`),
            ],
          },
        ],
      },
      {
        text: 'ATMs',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/banking/atms/` },
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
    ],
  },


  {
    text: 'Ozone Connect | Insurance',
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
          { text: 'Quote Types (New / Renewal / Switch)', link: `${BASE}/${VERSION}/insurance/quotation/quote-types` },
          { text: 'User Journeys', link: `${BASE}/${VERSION}/insurance/quotation/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview & Status Events', link: `${BASE}/${VERSION}/insurance/quotation/api-guide/` },
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
        ],
      },
      {
        text: 'Authorization',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${VERSION}/consent-journey/authorization` },
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-journey/authorization/requirements` },
        ],
      },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent-journey/api-guide` },
    ],
  },

  {
    text: 'Consent Management Interface',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/consent-management-interface/` },
      {
        text: 'Bank Data Sharing',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-management-interface/bank-data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/consent-management-interface/bank-data-sharing/user-experience` },
        ],
      },
      {
        text: 'Bank Service Initiation',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-management-interface/bank-service-initiation/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/consent-management-interface/bank-service-initiation/user-experience` },
        ],
      },
      {
        text: 'Insurance Data Sharing',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${VERSION}/consent-management-interface/insurance-data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${VERSION}/consent-management-interface/insurance-data-sharing/user-experience` },
        ],
      },
      { text: 'API Guide', link: `${BASE}/${VERSION}/consent-management-interface/api-guide` },
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
        ],
      },
    ],
  },

  {
    text: 'CAAP',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${VERSION}/caap/` },
      { text: 'User Experience', link: `${BASE}/${VERSION}/caap/user-experience` },
      { text: 'API Guide', link: `${BASE}/${VERSION}/caap/api-guide` },
      { text: 'Pricing', link: `${BASE}/${VERSION}/caap/pricing` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          {
            text: 'User Verification',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/challenge/initialize', `${BASE}/${VERSION}/caap/open-api/users-challenge-initialize`),
              apiRef('POST', '/users/actions/challenge/query', `${BASE}/${VERSION}/caap/open-api/users-challenge-query`),
              apiRef('POST', '/users/actions/challenge/complete', `${BASE}/${VERSION}/caap/open-api/users-challenge-complete`),
            ],
          },
          {
            text: 'User Registration',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/register/initialize', `${BASE}/${VERSION}/caap/open-api/users-register-initialize`),
              apiRef('POST', '/users/actions/register/complete', `${BASE}/${VERSION}/caap/open-api/users-register-complete`),
              apiRef('POST', '/users/actions/deregister', `${BASE}/${VERSION}/caap/open-api/users-deregister`),
            ],
          },
          {
            text: 'PII Decryption',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/pii/decrypt', `${BASE}/${VERSION}/caap/open-api/users-pii-decrypt`),
            ],
          },
          {
            text: 'Consent',
            collapsed: true,
            items: [
              apiRef('POST', '/consent/actions/validate', `${BASE}/${VERSION}/caap/open-api/consent-actions-validate`),
            ],
          },
          {
            text: 'Accounts',
            collapsed: true,
            items: [
              apiRef('GET', '/accounts', `${BASE}/${VERSION}/caap/open-api/accounts`),
              apiRef('GET', '/accounts/{accountId}', `${BASE}/${VERSION}/caap/open-api/accounts-accountId`),
            ],
          },
          {
            text: 'Insurance Policies',
            collapsed: true,
            items: [
              apiRef('GET', '/employment-insurance-policies', `${BASE}/${VERSION}/caap/open-api/employment-insurance-policies`),
              apiRef('GET', '/health-insurance-policies', `${BASE}/${VERSION}/caap/open-api/health-insurance-policies`),
              apiRef('GET', '/home-insurance-policies', `${BASE}/${VERSION}/caap/open-api/home-insurance-policies`),
              apiRef('GET', '/life-insurance-policies', `${BASE}/${VERSION}/caap/open-api/life-insurance-policies`),
              apiRef('GET', '/motor-insurance-policies', `${BASE}/${VERSION}/caap/open-api/motor-insurance-policies`),
              apiRef('GET', '/renters-insurance-policies', `${BASE}/${VERSION}/caap/open-api/renters-insurance-policies`),
              apiRef('GET', '/travel-insurance-policies', `${BASE}/${VERSION}/caap/open-api/travel-insurance-policies`),
            ],
          },
        ],
      },
    ],
  },

]
