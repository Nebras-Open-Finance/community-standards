import { computed, type ComputedRef } from 'vue'
import { apiRef, type HttpMethod, type SidebarItem } from './shared'
import { useSelectedVersion } from '../../composables/useSelectedVersion'
import type { Version } from '../versions'

const BASE = '/tech/lfi-api-hub'

// Field Mapping sits directly below each capability's API Reference, one page
// per endpoint, badged the same way as the API Reference entries above it.
// Entries are [method, path, slug]; the path is the Ozone Connect operation the
// LFI implements, except where the API Hub serves the endpoint itself.
type FieldMapEntry = readonly [HttpMethod, string, string]

function fieldMapItems(base: string, endpoints: readonly FieldMapEntry[]): SidebarItem {
  return {
    text: 'Field Mapping',
    collapsed: true,
    items: endpoints.map(([method, path, slug]) =>
      apiRef(method, path, `${base}/field-mapping/${slug}`),
    ),
  }
}

const DATA_SHARING_FIELD_MAP: readonly FieldMapEntry[] = [
  ['GET', '/accounts', 'accounts'],
  ['GET', '/accounts/{accountId}', 'accounts-AccountId'],
  ['GET', '/accounts/{accountId}/balances', 'accounts-AccountId-balances'],
  ['GET', '/accounts/{accountId}/beneficiaries', 'accounts-AccountId-beneficiaries'],
  ['GET', '/accounts/{accountId}/customer', 'accounts-AccountId-customer'],
  ['GET', '/accounts/{accountId}/direct-debits', 'accounts-AccountId-direct-debits'],
  ['GET', '/accounts/{accountId}/products', 'accounts-AccountId-products'],
  ['GET', '/accounts/{accountId}/scheduled-payments', 'accounts-AccountId-scheduled-payments'],
  ['GET', '/accounts/{accountId}/standing-orders', 'accounts-AccountId-standing-orders'],
  ['GET', '/accounts/{accountId}/statements', 'accounts-AccountId-statements'],
  ['GET', '/accounts/{accountId}/transactions', 'accounts-AccountId-transactions'],
  ['GET', '/customer', 'customer'],
]

// Most of the generated bank-initiation family is not published here: the API
// Hub serves the payment-consent reads itself, file payments have no Ozone
// Connect surface for an LFI to implement, and the payment operations
// themselves are held back pending review.
const SERVICE_INITIATION_FIELD_MAP: readonly FieldMapEntry[] = [
  ['GET', '/payment-consents/{consentId}/refund', 'payment-consents-ConsentId-refund'],
]

const PRODUCTS_LEADS_FIELD_MAP: readonly FieldMapEntry[] = [
  ['GET', '/products', 'products'],
  ['POST', '/leads', 'leads'],
]

const ATMS_FIELD_MAP: readonly FieldMapEntry[] = [['GET', '/atm', 'atm']]

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

export const buildLfiSidebar = (version: Version): SidebarItem[] => [
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
      { text: 'Overview', link: `${BASE}/${version}/api-hub/` },
      { text: 'Connectivity & Certificates', link: `${BASE}/${version}/api-hub/connectivity/` },
      {
        text: 'Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/api-hub/onboarding/` },
          { text: 'Prerequisites Questionnaire', link: `${BASE}/${version}/api-hub/onboarding/prerequisites` },
          { text: 'Application Layer Authentication', link: `${BASE}/${version}/api-hub/onboarding/application-layer-auth` },
          {
            text: 'Environment Specific',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${version}/api-hub/onboarding/environment-specific` },
              { text: 'Certificate Walkthroughs', link: `${BASE}/${version}/api-hub/onboarding/environment-specific/certificate-walkthroughs` },
              { text: 'Ozone Connect Base URL', link: `${BASE}/${version}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: 'Authorization Endpoint', link: `${BASE}/${version}/api-hub/onboarding/environment-specific/auth-endpoint` },
            ],
          },
          {
            text: 'Configuring Authentication',
            collapsed: true,
            items: [
              { text: 'mTLS — Server-side', link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/mtls-server` },
              { text: 'mTLS — Client-side', link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/mtls-client` },
              { text: 'JWT — Server-side', link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/jwt-server` },
              { text: 'JWT — Client-side', link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/jwt-client` },
            ],
          },
        ],
      },
      {
        text: 'Admin Portal',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/api-hub/admin-portal/` },
          { text: 'TPP Management & Activation', link: `${BASE}/${version}/api-hub/admin-portal/tpp-activation` },
          { text: 'Logs', link: `${BASE}/${version}/api-hub/admin-portal/logs` },
          { text: 'Reports', link: `${BASE}/${version}/api-hub/admin-portal/reports` },
        ],
      },
      {
        text: 'Headless Heimdall Auth Server',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/api-hub/headless-heimdall` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              {
                text: 'Health Check',
                items: [
                  apiRef('GET', '/hello-mtls', `${BASE}/${version}/api-hub/headless-heimdall/open-api/hello-mtls`),
                ],
              },
              {
                text: 'Authorization',
                items: [
                  apiRef('GET', '/auth', `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth`),
                  apiRef('POST', '/auth/{interactionId}/doConfirm', `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                  apiRef('POST', '/auth/{interactionId}/doFail', `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`),
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
          { text: 'Overview', link: `${BASE}/${version}/api-hub/consent-manager/` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              {
                text: 'Health Check',
                items: [
                  apiRef('GET', '/hello-mtls', `${BASE}/${version}/api-hub/consent-manager/open-api/hello-mtls`),
                ],
              },
              {
                text: 'Consents',
                items: [
                  apiRef('GET', '/consents', `${BASE}/${version}/api-hub/consent-manager/open-api/consents`),
                  apiRef('GET', '/consents/{consentId}', `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId`),
                  apiRef('PATCH', '/consents/{consentId}', `${BASE}/${version}/api-hub/consent-manager/open-api/patch-consents-consentId`),
                  apiRef('GET', '/consents/{consentId}/audit', `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId-audit`),
                  apiRef('GET', '/consent-groups/{consentGroupId}/consents', `${BASE}/${version}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
                  apiRef('GET', '/psu/{userId}/consents', `${BASE}/${version}/api-hub/consent-manager/open-api/psu-userId-consents`),
                  apiRef('GET', '/accounts/{accountId}/consents', `${BASE}/${version}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
                  apiRef('POST', '/consent-groups/{consentGroupId}/consents/action/revoke', `${BASE}/${version}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
                  apiRef('POST', '/consents/{consentId}/action/revoke', `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`),
                ],
              },
              {
                text: 'Payment Log',
                items: [
                  apiRef('GET', '/payment-log', `${BASE}/${version}/api-hub/consent-manager/open-api/payment-log`),
                  apiRef('PATCH', '/payment-log/{id}', `${BASE}/${version}/api-hub/consent-manager/open-api/payment-log-id`),
                ],
              },
              {
                text: 'Insurance Quote Log',
                items: [
                  apiRef('PATCH', '/insurance-quote-log/{logId}', `${BASE}/${version}/api-hub/consent-manager/open-api/insurance-quote-log-logId`),
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
      { text: 'Overview', link: `${BASE}/${version}/health-check/` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          apiRef('GET', '/hello', `${BASE}/${version}/health-check/open-api/hello`),
          apiRef('GET', '/hello-mtls', `${BASE}/${version}/health-check/open-api/hello-mtls`),
          apiRef('GET', '/echo-cert', `${BASE}/${version}/health-check/open-api/echo-cert`),
        ],
      },
    ],
  },

  {
    text: 'Ozone Connect | Consent Events',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${version}/consent-events` },
      { text: 'API Guide', link: `${BASE}/${version}/consent-events/api-guide` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          apiRef('POST', '/consent/action/validate', `${BASE}/${version}/consent-events/open-api/validate`),
          apiRef('POST', '/consent/event/{operation}', `${BASE}/${version}/consent-events/open-api/event-op`),
        ],
      },
    ],
  },

  {
    text: 'Ozone Connect | Banking',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${version}/banking` },
      {
        text: 'Data Sharing',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/banking/data-sharing` },
          { text: 'Requirements', link: `${BASE}/${version}/banking/data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/banking/data-sharing/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${version}/banking/data-sharing/api-guide` },
              { text: 'Pagination', link: `${BASE}/${version}/banking/data-sharing/api-guide/pagination` },
              { text: 'Encrypted FinanceRates', link: `${BASE}/${version}/banking/data-sharing/api-guide/finance-rates` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/accounts', `${BASE}/${version}/banking/data-sharing/open-api/accounts`),
              apiRef('GET', '/accounts/{AccountId}', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef('GET', '/accounts/{AccountId}/balances', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef('GET', '/accounts/{AccountId}/beneficiaries', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef('GET', '/customer', `${BASE}/${version}/banking/data-sharing/open-api/customer`),
              apiRef('GET', '/accounts/{AccountId}/customer', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-customer`),
              apiRef('GET', '/accounts/{AccountId}/direct-debits', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef('GET', '/accounts/{AccountId}/products', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-products`),
              apiRef('GET', '/accounts/{AccountId}/scheduled-payments', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef('GET', '/accounts/{AccountId}/standing-orders', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef('GET', '/accounts/{AccountId}/statements', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef('GET', '/accounts/{AccountId}/transactions', `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-transactions`),
            ],
          },
          fieldMapItems(`${BASE}/${version}/banking/data-sharing`, DATA_SHARING_FIELD_MAP),
        ],
      },
      {
        text: 'Payments (Service Initiation)',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/banking/service-initiation/` },
          {
            text: 'Domestic Payments',
            collapsed: true,
            items: [
              {
                text: 'Overview',
                collapsed: true,
                items: [
                  { text: 'Payment Rails and Status', link: `${BASE}/${version}/banking/service-initiation/domestic-payments/overview/payment-status` },
                ],
              },
              {
                text: 'Single Instant Payment',
                collapsed: true,
                items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/single-instant-payment`),
              },
              {
                text: 'Multi Payments',
                collapsed: true,
                items: [
                  {
                    text: 'Variable On Demand', collapsed: true,
                    items: [
                      { text: 'Requirements', link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements` },
                      { text: 'User Experience', link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys` },
                      { text: 'API Guide', link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide` },
                    ],
                  },
                  { text: 'Fixed On Demand', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: 'Variable Periodic Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: 'Fixed Periodic Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: 'Variable Defined Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: 'Fixed Defined Schedule', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                  { text: 'Delegated SCA', collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) },
                ],
              },
            ],
          },
          {
            text: 'Personal Identifiable Information',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/` },
              { text: 'Debtor Account', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: 'Creditor', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/creditor` },
              {
                text: 'API Guide',
                collapsed: true,
                items: [
                  { text: 'How to Decrypt PII', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii` },
                  { text: 'Verify TPP Signature (Optional)', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature` },
                ],
              },
              {
                text: 'API Schemas',
                collapsed: true,
                items: [
                  { text: 'PII (Consent - Consent Manager)', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: 'PII (Payments - Ozone Connect)', link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` },
                ],
              },
            ],
          },
          {
            text: 'Multi Authorization', link: `${BASE}/${version}/banking/service-initiation/multi-authorization`,
          },
          {
            text: 'Refunds',
            collapsed: true,
            items: [
              { text: 'Requirements', link: `${BASE}/${version}/banking/service-initiation/refunds/requirements` },
              { text: 'API Guide', link: `${BASE}/${version}/banking/service-initiation/refunds/api-guide` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/payments', `${BASE}/${version}/banking/service-initiation/open-api/payments`),
              apiRef('GET', '/payments/{PaymentId}', `${BASE}/${version}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef('GET', '/payment-consents/{ConsentId}/refund', `${BASE}/${version}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
            ],
          },
          fieldMapItems(`${BASE}/${version}/banking/service-initiation`, SERVICE_INITIATION_FIELD_MAP),
        ],
      },
      {
        text: 'Confirmation of Payee',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/banking/confirmation-of-payee/` },
          { text: 'Requirements', link: `${BASE}/${version}/banking/confirmation-of-payee/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/banking/confirmation-of-payee/user-journeys` },
          { text: 'API Guide', link: `${BASE}/${version}/banking/confirmation-of-payee/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('POST', '/customers/action/cop-query', `${BASE}/${version}/banking/confirmation-of-payee/open-api/cop-query`),
            ],
          },
        ],
      },
      {
        text: 'Products & Leads',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/banking/products-and-leads/` },
          { text: 'Requirements', link: `${BASE}/${version}/banking/products-and-leads/requirements` },
          { text: 'API Guide', link: `${BASE}/${version}/banking/products-and-leads/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/products', `${BASE}/${version}/banking/products-and-leads/open-api/products`),
              apiRef('POST', '/leads', `${BASE}/${version}/banking/products-and-leads/open-api/leads`),
            ],
          },
          fieldMapItems(`${BASE}/${version}/banking/products-and-leads`, PRODUCTS_LEADS_FIELD_MAP),
        ],
      },
      {
        text: 'ATMs',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/banking/atms/` },
          { text: 'Requirements', link: `${BASE}/${version}/banking/atms/requirements` },
          { text: 'API Guide', link: `${BASE}/${version}/banking/atms/api-guide` },
          {
            text: 'API Reference',
            collapsed: true,
            items: [
              apiRef('GET', '/atm', `${BASE}/${version}/banking/atms/open-api/atm`),
            ],
          },
          fieldMapItems(`${BASE}/${version}/banking/atms`, ATMS_FIELD_MAP),
        ],
      },
    ],
  },


  {
    text: 'Ozone Connect | Insurance',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${version}/insurance/` },
      {
        text: 'Data Sharing',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/insurance/data-sharing/` },
          { text: 'Requirements', link: `${BASE}/${version}/insurance/data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/insurance/data-sharing/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview', link: `${BASE}/${version}/insurance/data-sharing/api-guide/` },
              { text: 'Encrypted Premiums', link: `${BASE}/${version}/insurance/data-sharing/api-guide/premiums` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: insuranceApiRef(`${BASE}/${version}/insurance/data-sharing/open-api`),
          },
        ],
      },
      {
        text: 'Quotation',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/insurance/quotation/` },
          { text: 'Requirements', link: `${BASE}/${version}/insurance/quotation/requirements` },
          { text: 'Quote Types (New / Renewal / Switch)', link: `${BASE}/${version}/insurance/quotation/quote-types` },
          { text: 'User Journeys', link: `${BASE}/${version}/insurance/quotation/user-journeys` },
          {
            text: 'API Guide',
            collapsed: true,
            items: [
              { text: 'Overview & Status Events', link: `${BASE}/${version}/insurance/quotation/api-guide/` },
              { text: 'LFI-Led Flow', link: `${BASE}/${version}/insurance/quotation/api-guide/lfi-led` },
              { text: 'TPP-Led Flow', link: `${BASE}/${version}/insurance/quotation/api-guide/tpp-led` },
            ],
          },
          {
            text: 'API Reference',
            collapsed: true,
            items: insuranceQuotationApiRef(`${BASE}/${version}/insurance/quotation/open-api`),
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
          { text: 'Overview', link: `${BASE}/${version}/consent-journey/authentication` },
          { text: 'Requirements', link: `${BASE}/${version}/consent-journey/authentication/requirements` },
          { text: 'Strong Customer Authentication', link: `${BASE}/${version}/consent-journey/authentication/sca` },
          { text: 'Implementation Guide', link: `${BASE}/${version}/consent-journey/authentication/implementation` },
        ],
      },
      {
        text: 'Authorization',
        collapsed: true,
        items: [
          { text: 'Overview', link: `${BASE}/${version}/consent-journey/authorization` },
          { text: 'Requirements', link: `${BASE}/${version}/consent-journey/authorization/requirements` },
        ],
      },
      { text: 'Opening the Return Redirect', link: `${BASE}/${version}/consent-journey/opening-the-redirect` },
      { text: 'API Guide', link: `${BASE}/${version}/consent-journey/api-guide` },
    ],
  },

  {
    text: 'Consent Management Interface',
    collapsed: true,
    items: [
      { text: 'Overview', link: `${BASE}/${version}/consent-management-interface/` },
      {
        text: 'Bank Data Sharing',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${version}/consent-management-interface/bank-data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/consent-management-interface/bank-data-sharing/user-experience` },
        ],
      },
      {
        text: 'Bank Service Initiation',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${version}/consent-management-interface/bank-service-initiation/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/consent-management-interface/bank-service-initiation/user-experience` },
        ],
      },
      {
        text: 'Insurance Data Sharing',
        collapsed: true,
        items: [
          { text: 'Requirements', link: `${BASE}/${version}/consent-management-interface/insurance-data-sharing/requirements` },
          { text: 'User Experience', link: `${BASE}/${version}/consent-management-interface/insurance-data-sharing/user-experience` },
        ],
      },
      { text: 'API Guide', link: `${BASE}/${version}/consent-management-interface/api-guide` },
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
              {
                text: 'Domestic Payments',
                collapsed: true,
                items: [
                  { text: 'Single Instant Payment', link: `${BASE}/production/testing-certification/functional/single-instant-payment` },
                  { text: 'Variable On-Demand', link: `${BASE}/production/testing-certification/functional/variable-on-demand` },
                  { text: 'Fixed On-Demand', link: `${BASE}/production/testing-certification/functional/fixed-on-demand` },
                  { text: 'Variable Periodic Schedule', link: `${BASE}/production/testing-certification/functional/variable-periodic-schedule` },
                  { text: 'Fixed Periodic Schedule', link: `${BASE}/production/testing-certification/functional/fixed-periodic-schedule` },
                  { text: 'Variable Defined Schedule', link: `${BASE}/production/testing-certification/functional/variable-defined-schedule` },
                  { text: 'Fixed Defined Schedule', link: `${BASE}/production/testing-certification/functional/fixed-defined-schedule` },
                  { text: 'Delegated SCA', link: `${BASE}/production/testing-certification/functional/delegated-sca` },
                ],
              },
              { text: 'Confirmation of Payee', link: `${BASE}/production/testing-certification/functional/confirmation-of-payee` },
              { text: 'Insurance Data Sharing', link: `${BASE}/production/testing-certification/functional/insurance-data-sharing` },
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
      { text: 'Overview', link: `${BASE}/${version}/caap/` },
      { text: 'User Experience', link: `${BASE}/${version}/caap/user-experience` },
      { text: 'API Guide', link: `${BASE}/${version}/caap/api-guide` },
      { text: 'Pricing', link: `${BASE}/${version}/caap/pricing` },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          {
            text: 'User Verification',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/challenge/initialize', `${BASE}/${version}/caap/open-api/users-challenge-initialize`),
              apiRef('POST', '/users/actions/challenge/query', `${BASE}/${version}/caap/open-api/users-challenge-query`),
              apiRef('POST', '/users/actions/challenge/complete', `${BASE}/${version}/caap/open-api/users-challenge-complete`),
            ],
          },
          {
            text: 'User Registration',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/register/initialize', `${BASE}/${version}/caap/open-api/users-register-initialize`),
              apiRef('POST', '/users/actions/register/complete', `${BASE}/${version}/caap/open-api/users-register-complete`),
              apiRef('POST', '/users/actions/deregister', `${BASE}/${version}/caap/open-api/users-deregister`),
            ],
          },
          {
            text: 'PII Decryption',
            collapsed: true,
            items: [
              apiRef('POST', '/users/actions/pii/decrypt', `${BASE}/${version}/caap/open-api/users-pii-decrypt`),
            ],
          },
          {
            text: 'Consent',
            collapsed: true,
            items: [
              apiRef('POST', '/consent/actions/validate', `${BASE}/${version}/caap/open-api/consent-actions-validate`),
            ],
          },
          {
            text: 'Accounts',
            collapsed: true,
            items: [
              apiRef('GET', '/accounts', `${BASE}/${version}/caap/open-api/accounts`),
              apiRef('GET', '/accounts/{accountId}', `${BASE}/${version}/caap/open-api/accounts-accountId`),
            ],
          },
          {
            text: 'Insurance Policies',
            collapsed: true,
            items: [
              apiRef('GET', '/employment-insurance-policies', `${BASE}/${version}/caap/open-api/employment-insurance-policies`),
              apiRef('GET', '/health-insurance-policies', `${BASE}/${version}/caap/open-api/health-insurance-policies`),
              apiRef('GET', '/home-insurance-policies', `${BASE}/${version}/caap/open-api/home-insurance-policies`),
              apiRef('GET', '/life-insurance-policies', `${BASE}/${version}/caap/open-api/life-insurance-policies`),
              apiRef('GET', '/motor-insurance-policies', `${BASE}/${version}/caap/open-api/motor-insurance-policies`),
              apiRef('GET', '/renters-insurance-policies', `${BASE}/${version}/caap/open-api/renters-insurance-policies`),
              apiRef('GET', '/travel-insurance-policies', `${BASE}/${version}/caap/open-api/travel-insurance-policies`),
            ],
          },
        ],
      },
    ],
  },

]

/**
 * Reactive LFI Guide sidebar that follows the selected version. Unversioned
 * entries (trust framework, registration, security, certification) are shared
 * across versions and carry no version segment.
 */
export function useLfiSidebar(): ComputedRef<SidebarItem[]> {
  const { selectedVersion } = useSelectedVersion()
  return computed(() => buildLfiSidebar(selectedVersion.value))
}
