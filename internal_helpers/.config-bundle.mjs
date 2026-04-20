// docs/.vitepress/config.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve as resolve4 } from "node:path";
import { defineConfig } from "vitepress";

// docs/.vitepress/config/sidebars/shared.ts
function apiRef(method, path, link) {
  return {
    text: `<span class="http-badge http-${method.toLowerCase()}">${method}</span> <span class="http-path">${path}</span>`,
    link
  };
}

// docs/.vitepress/config/sidebars/tpp.ts
var BASE = "/tech/tpp-standards";
var VERSION = "v2.1";
function multiPaymentItems(base) {
  return [
    { text: "Requirements", link: `${base}/requirements` },
    { text: "User Experience", link: `${base}/user-journeys` },
    { text: "API Guide", link: `${base}/api-guide` }
  ];
}
var tppSidebar = [
  {
    text: "Getting Started",
    collapsed: true,
    items: [
      { text: "Sandbox Quickstart", link: `${BASE}/${VERSION}/getting-started/` },
      { text: "Postman Guide", link: `${BASE}/${VERSION}/getting-started/postman` },
      { text: "Sandbox Model Bank", link: `${BASE}/sandbox/model-bank` }
    ]
  },
  {
    text: "Trust Framework (Directory)",
    collapsed: true,
    items: [
      { text: "Overview & Organisations", link: `${BASE}/trust-framework/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/onboarding/` },
          { text: "Organisation Admins", link: `${BASE}/trust-framework/organisation-admins` },
          { text: "Adding Users", link: `${BASE}/trust-framework/adding-users` },
          { text: "User/Admin Sign Up", link: `${BASE}/trust-framework/user-sign-up` }
        ]
      },
      { text: "Roles", link: `${BASE}/trust-framework/roles/` },
      {
        text: "Applications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/application` },
          { text: "Creating An Application", link: `${BASE}/trust-framework/creating-an-application` },
          { text: "Redirect URIs", link: `${BASE}/trust-framework/redirect-uri/` },
          {
            text: "Keys & Certificates",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/trust-framework/certificates/` },
              { text: "Client Transport", link: `${BASE}/trust-framework/certificates/client-transport` },
              { text: "Client Signing", link: `${BASE}/trust-framework/certificates/client-signing` },
              { text: "Client Encryption", link: `${BASE}/trust-framework/certificates/client-encryption` },
              { text: "Certificates with a SAN", link: `${BASE}/trust-framework/certificates-san/` }
            ]
          }
        ]
      },
      { text: "Contacts", link: `${BASE}/trust-framework/contacts` },
      {
        text: "LFI Discovery",
        collapsed: true,
        items: [
          { text: "Overview & /participants", link: `${BASE}/trust-framework/api-discovery/` },
          {
            text: "Authorisation Servers",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/trust-framework/authorisation-servers` },
              { text: "Discovery", link: `${BASE}/trust-framework/well-known/` }
            ]
          },
          { text: "API Resources", link: `${BASE}/trust-framework/api-resources` },
          { text: "Flags & Meta Data", link: `${BASE}/trust-framework/flags-metadata` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/participants", `${BASE}/trust-framework/open-api/participants`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Registration",
    collapsed: true,
    items: [
      { text: "Overview & API Guide", link: `${BASE}/registration/api-guide` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          apiRef("POST", "/tpp-registration", `${BASE}/registration/open-api/tpp-registration`)
        ]
      }
    ]
  },
  {
    text: "Security, Auth & Headers",
    collapsed: true,
    items: [
      {
        text: "FAPI Security Profile",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/security/fapi` },
          { text: "Preparing /par request JWT", link: `${BASE}/security/fapi/request-jwt` },
          { text: "Message Signing", link: `${BASE}/security/fapi/message-signing` },
          { text: "Message Encryption", link: `${BASE}/security/fapi/message-encryption` },
          { text: "Receiving Event Notifications", link: `${BASE}/security/fapi/receiving-events` },
          { text: "Handling Authorization Callbacks", link: `${BASE}/security/fapi/handling-callback` }
        ]
      },
      {
        text: "Tokens & Assertions",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/security/tokens` },
          { text: "Preparing Client Assertion", link: `${BASE}/security/tokens/client-assertion` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/token", `${BASE}/security/tokens/open-api/token`)
            ]
          }
        ]
      },
      { text: "Request Headers", link: `${BASE}/security/request-headers` }
    ]
  },
  {
    text: "Consent",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${VERSION}/consent/` },
      { text: "Requirements", link: `${BASE}/${VERSION}/consent/requirements` },
      { text: "API Guide", link: `${BASE}/${VERSION}/consent/api-guide` },
      {
        text: "Consent Management Interface",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/consent/consent-management-interface` },
          { text: "Requirements", link: `${BASE}/${VERSION}/consent/consent-management-interface/requirements` },
          { text: "User Experience", link: `${BASE}/${VERSION}/consent/consent-management-interface/user-experience` }
        ]
      },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          {
            text: "Create Consent",
            items: [
              apiRef("POST", "/par", `${BASE}/${VERSION}/consent/open-api/par`)
            ]
          },
          {
            text: "Bank Data Sharing",
            items: [
              apiRef("GET", "/account-access-consents", `${BASE}/${VERSION}/consent/open-api/account-access-consents`),
              apiRef("GET", "/account-access-consents/{ConsentId}", `${BASE}/${VERSION}/consent/open-api/account-access-consents-ConsentId`),
              apiRef("PATCH", "/account-access-consents/{ConsentId}", `${BASE}/${VERSION}/consent/open-api/patch-account-access-consents-ConsentId`)
            ]
          },
          {
            text: "Bank Service Initiation",
            items: [
              apiRef("GET", "/payment-consents", `${BASE}/${VERSION}/consent/open-api/payment-consents`),
              apiRef("GET", "/payment-consents/{ConsentId}", `${BASE}/${VERSION}/consent/open-api/payment-consents-ConsentId`),
              apiRef("PATCH", "/payment-consents/{ConsentId}", `${BASE}/${VERSION}/consent/open-api/patch-payment-consents-ConsentId`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Banking",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${VERSION}/banking` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/banking/data-sharing` },
          { text: "Requirements", link: `${BASE}/${VERSION}/banking/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE}/${VERSION}/banking/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${VERSION}/banking/data-sharing/api-guide` },
              { text: "Pagination", link: `${BASE}/${VERSION}/banking/data-sharing/api-guide/pagination` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/accounts", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts`),
              apiRef("GET", "/accounts/{AccountId}", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef("GET", "/accounts/{AccountId}/balances", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef("GET", "/parties", `${BASE}/${VERSION}/banking/data-sharing/open-api/parties`),
              apiRef("GET", "/accounts/{AccountId}/parties", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-parties`),
              apiRef("GET", "/accounts/{AccountId}/products", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-products`),
              apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef("GET", "/accounts/{AccountId}/statements", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE}/${VERSION}/banking/data-sharing/open-api/accounts-AccountId-transactions`)
            ]
          }
        ]
      },
      {
        text: "Payments (Service Initiation)",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/banking/service-initiation/` },
          {
            text: "Domestic Payments",
            collapsed: true,
            items: [
              {
                text: "Overview",
                collapsed: true,
                items: [
                  { text: "Payment Rails and Status", link: `${BASE}/${VERSION}/banking/service-initiation/domestic-payments/overview/payment-status` }
                ]
              },
              {
                text: "Single Instant Payment",
                collapsed: true,
                items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/single-instant-payment`)
              },
              {
                text: "Multi Payments",
                collapsed: true,
                items: [
                  { text: "Variable On Demand", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand`) },
                  { text: "Fixed On Demand", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: "Variable Periodic Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: "Fixed Periodic Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: "Variable Defined Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: "Fixed Defined Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                  { text: "Delegated SCA", collapsed: true, items: multiPaymentItems(`${BASE}/${VERSION}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) }
                ]
              }
            ]
          },
          {
            text: "Personal Identifiable Information",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/` },
              { text: "Debtor Account", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: "Creditor", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/creditor` },
              { text: "Risk", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/risk` },
              {
                text: "API Schemas",
                collapsed: true,
                items: [
                  { text: "PII (Post /par)", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: "PII (Post /payments)", link: `${BASE}/${VERSION}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` }
                ]
              }
            ]
          },
          {
            text: "Multi Authorization",
            link: `${BASE}/${VERSION}/banking/service-initiation//multi-authorization/`
          },
          {
            text: "Refunds",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE}/${VERSION}/banking/service-initiation/refunds/requirements` },
              { text: "API Guide", link: `${BASE}/${VERSION}/banking/service-initiation/refunds/api-guide` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/payments", `${BASE}/${VERSION}/banking/service-initiation/open-api/payments`),
              apiRef("GET", "/payments/{PaymentId}", `${BASE}/${VERSION}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef("GET", "/payments", `${BASE}/${VERSION}/banking/service-initiation/open-api/payments-idempotency`),
              apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE}/${VERSION}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`)
            ]
          }
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/banking/confirmation-of-payee` },
          { text: "Requirements", link: `${BASE}/${VERSION}/banking/confirmation-of-payee/requirements` },
          { text: "User Experience", link: `${BASE}/${VERSION}/banking/confirmation-of-payee/user-journeys` },
          { text: "API Guide", link: `${BASE}/${VERSION}/banking/confirmation-of-payee/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/discovery", `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/discovery`),
              apiRef("POST", "/confirmation", `${BASE}/${VERSION}/banking/confirmation-of-payee/open-api/confirmation`)
            ]
          }
        ]
      },
      {
        text: "Products and Leads",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/banking/products-leads/` },
          { text: "Requirements", link: `${BASE}/${VERSION}/banking/products-leads/requirements` },
          { text: "User Experience", link: `${BASE}/${VERSION}/banking/products-leads/user-journeys` },
          { text: "API Guide", link: `${BASE}/${VERSION}/banking/products-leads/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/products", `${BASE}/${VERSION}/banking/products-leads/open-api/products`),
              apiRef("POST", "/leads", `${BASE}/${VERSION}/banking/products-leads/open-api/leads `)
            ]
          }
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${VERSION}/banking/atms` },
          { text: "Requirements", link: `${BASE}/${VERSION}/banking/atms/requirements` },
          { text: "API Guide", link: `${BASE}/${VERSION}/banking/atms/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/atms", `${BASE}/${VERSION}/banking/atms/open-api/atms`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Event Notifications & Webhooks",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${VERSION}/webhooks/` },
      {
        text: "Consent Status",
        collapsed: true,
        items: [
          { text: "API Guide", link: `${BASE}/${VERSION}/webhooks/consent-status/api-guide` },
          {
            text: "API Referrence",
            collapsed: true,
            items: [
              apiRef("POST", "[consent status]", `${BASE}/${VERSION}/webhooks/consent-status/open-api`)
            ]
          }
        ]
      },
      {
        text: "Payment Status",
        collapsed: true,
        items: [
          { text: "API Guide", link: `${BASE}/${VERSION}/webhooks/payment-status/api-guide` },
          {
            text: "API Referrence",
            collapsed: true,
            items: [
              apiRef("POST", "[payment status]", `${BASE}/${VERSION}/webhooks/payment-status/open-api`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Testing & Certification",
    collapsed: true,
    items: [
      {
        text: "Required Certifications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/production/testing-certification/overview` },
          { text: "TrustFramework Checklist", link: `${BASE}/production/testing-certification/readiness-checklist` },
          {
            text: "Functional Evidence",
            collapsed: true,
            items: [
              { text: "Bank Data Sharing", link: `${BASE}/production/testing-certification/functional` }
            ]
          },
          { text: "User Experience Evidence", link: `${BASE}/production/testing-certification/user-experience` },
          { text: "FAPI Conformance", link: `${BASE}/production/testing-certification/fapi` },
          { text: "Security Validation", link: `${BASE}/production/testing-certification/security-validation` }
        ]
      },
      { text: "Production Live Proving", link: `${BASE}/production/live-proving` }
    ]
  }
];

// docs/.vitepress/config/sidebars/lfi.ts
var BASE2 = "/tech/lfi-api-hub";
var VERSION2 = "v2.1";
function multiPaymentItems2(base) {
  return [
    { text: "Requirements", link: `${base}/requirements` },
    { text: "User Experience", link: `${base}/user-journeys` },
    { text: "API Guide", link: `${base}/api-guide` }
  ];
}
var lfiSidebar = [
  {
    text: "Getting Started",
    collapsed: true,
    items: [
      { text: "LFI Integration Journey", link: `${BASE2}/getting-started/` },
      { text: "Recommended Bank Rollout Plan", link: `${BASE2}/getting-started/bank-rollout-plan` }
    ]
  },
  {
    text: "Trust Framework",
    collapsed: true,
    items: [
      { text: "Overview & Organisations", link: `${BASE2}/trust-framework/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/trust-framework/onboarding` },
          { text: "Organisation Admins", link: `${BASE2}/trust-framework/organisation-admins` },
          { text: "Adding Users", link: `${BASE2}/trust-framework/adding-users` },
          { text: "User/Admin Sign Up", link: `${BASE2}/trust-framework/user-sign-up` }
        ]
      },
      { text: "Roles", link: `${BASE2}/trust-framework/roles` },
      {
        text: "Servers",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/trust-framework/servers` },
          { text: "Creating a Server", link: `${BASE2}/trust-framework/servers/creating` },
          {
            text: "API Resources",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/trust-framework/servers/api` },
              { text: "Creating an API resource", link: `${BASE2}/trust-framework/servers/api/creating` },
              { text: "Meta Data", link: `${BASE2}/trust-framework/servers/api/meta` }
            ]
          }
        ]
      },
      {
        text: "Applications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/trust-framework/application` },
          { text: "Creating C3-hh-cm-client", link: `${BASE2}/trust-framework/creating-c3-application` },
          {
            text: "Keys & Certificates",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/trust-framework/certificates/` },
              { text: "Client Transport", link: `${BASE2}/trust-framework/certificates/client-transport` },
              { text: "Client Signing", link: `${BASE2}/trust-framework/certificates/client-signing` },
              { text: "Certificates with a SAN", link: `${BASE2}/trust-framework/certificates-san/` }
            ]
          }
        ]
      },
      { text: "Contacts", link: `${BASE2}/trust-framework/contacts` },
      {
        text: "Trust Framework APIs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/trust-framework/api/` },
          {
            text: "API Guide",
            link: `${BASE2}/trust-framework/api/api-guide`
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/token", `${BASE2}/trust-framework/api/token`),
              apiRef("GET", "/organisations", `${BASE2}/trust-framework/api/organisations`),
              apiRef("GET", ".../{OrganisationId}/softwarestatements", `${BASE2}/trust-framework/api/software-statements`),
              apiRef("GET", ".../{OrganisationId}/authorisationservers", `${BASE2}/trust-framework/api/auth-servers`),
              apiRef("GET", ".../{AuthorisationServerId}/apiresources", `${BASE2}/trust-framework/api/api-resources`),
              apiRef("GET", "/references/apifamilies", `${BASE2}/trust-framework/api/api-families`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "API Hub",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/` },
      { text: "Connectivity & Certificates", link: `${BASE2}/${VERSION2}/api-hub/connectivity/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/onboarding/` },
          { text: "Prerequisites Questionnaire", link: `${BASE2}/${VERSION2}/api-hub/onboarding/prerequisites` },
          {
            text: "Application Layer Authentication",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/onboarding/application-layer-auth` },
              { text: "JWT Auth", link: `${BASE2}/${VERSION2}/api-hub/onboarding/jwt-auth` }
            ]
          },
          {
            text: "Environment Specific",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/onboarding/environment-specific` },
              { text: "Certificate Walkthroughs", link: `${BASE2}/${VERSION2}/api-hub/onboarding/environment-specific/certificate-walkthroughs` },
              { text: "Ozone Connect Base URL", link: `${BASE2}/${VERSION2}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: "Authorization Endpoint", link: `${BASE2}/${VERSION2}/api-hub/onboarding/environment-specific/auth-endpoint` }
            ]
          }
        ]
      },
      {
        text: "Admin Portal",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/admin-portal/` },
          { text: "TPP Management & Activation", link: `${BASE2}/${VERSION2}/api-hub/admin-portal/tpp-activation` },
          { text: "Logs", link: `${BASE2}/${VERSION2}/api-hub/admin-portal/logs` },
          { text: "Reports", link: `${BASE2}/${VERSION2}/api-hub/admin-portal/reports` }
        ]
      },
      {
        text: "Headless Heimdall Auth Server",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/headless-heimdall` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              {
                text: "Health Check",
                items: [
                  apiRef("GET", "/hello-mtls", `${BASE2}/${VERSION2}/api-hub/headless-heimdall/open-api/hello-mtls`)
                ]
              },
              {
                text: "Authorization",
                items: [
                  apiRef("GET", "/auth", `${BASE2}/${VERSION2}/api-hub/headless-heimdall/open-api/auth`),
                  apiRef("POST", "/auth/{interactionId}/doConfirm", `${BASE2}/${VERSION2}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                  apiRef("POST", "/auth/{interactionId}/doFail", `${BASE2}/${VERSION2}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`)
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Consent Manager",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/api-hub/consent-manager/` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              {
                text: "Health Check",
                items: [
                  apiRef("GET", "/hello-mtls", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/hello-mtls`)
                ]
              },
              {
                text: "Consents",
                items: [
                  apiRef("GET", "/consents", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consents`),
                  apiRef("GET", "/consents/{consentId}", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consents-consentId`),
                  apiRef("PATCH", "/consents/{consentId}", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/patch-consents-consentId`),
                  apiRef("GET", "/consents/{consentId}/audit", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consents-consentId-audit`),
                  apiRef("GET", "/consent-groups/{consentGroupId}/consents", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
                  apiRef("GET", "/psu/{userId}/consents", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/psu-userId-consents`),
                  apiRef("GET", "/accounts/{accountId}/consents", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
                  apiRef("POST", "/consent-groups/{consentGroupId}/consents/action/revoke", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
                  apiRef("POST", "/consents/{consentId}/action/revoke", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`)
                ]
              },
              {
                text: "Payment Log",
                items: [
                  apiRef("GET", "/payment-log", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/payment-log`),
                  apiRef("PATCH", "/payment-log/{id}", `${BASE2}/${VERSION2}/api-hub/consent-manager/open-api/payment-log-id`)
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Deployments",
        collapsed: true,
        items: [
          { text: "2026", link: `${BASE2}/${VERSION2}/api-hub/deployments/2026` }
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Consent Events",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE2}/${VERSION2}/consent-events` },
      { text: "API Guide", link: `${BASE2}/${VERSION2}/consent-events/api-guide` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          apiRef("POST", "/consent/action/validate", `${BASE2}/${VERSION2}/consent-events/open-api/validate`),
          apiRef("POST", "/consent/event/{operation}", `${BASE2}/${VERSION2}/consent-events/open-api/event-op`)
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Banking",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE2}/${VERSION2}/banking` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/banking/data-sharing` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE2}/${VERSION2}/banking/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/${VERSION2}/banking/data-sharing/api-guide` },
              { text: "Pagination", link: `${BASE2}/${VERSION2}/banking/data-sharing/api-guide/pagination` },
              { text: "Encrypted FinanceRates", link: `${BASE2}/${VERSION2}/banking/data-sharing/api-guide/finance-rates` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/accounts", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts`),
              apiRef("GET", "/accounts/{AccountId}", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef("GET", "/accounts/{AccountId}/balances", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef("GET", "/customer", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/customer`),
              apiRef("GET", "/accounts/{AccountId}/customer", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-customer`),
              apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef("GET", "/accounts/{AccountId}/products", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-products`),
              apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef("GET", "/accounts/{AccountId}/statements", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE2}/${VERSION2}/banking/data-sharing/open-api/accounts-AccountId-transactions`)
            ]
          }
        ]
      },
      {
        text: "Payments (Service Initiation)",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/banking/service-initiation/` },
          {
            text: "Domestic Payments",
            collapsed: true,
            items: [
              {
                text: "Overview",
                collapsed: true,
                items: [
                  { text: "Payment Rails and Status", link: `${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/overview/payment-status` }
                ]
              },
              {
                text: "Single Instant Payment",
                collapsed: true,
                items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/single-instant-payment`)
              },
              {
                text: "Multi Payments",
                collapsed: true,
                items: [
                  {
                    text: "Variable On Demand",
                    collapsed: true,
                    items: [
                      { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements` },
                      { text: "User Experience", link: `${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys` },
                      { text: "API Guide", link: `${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide` }
                    ]
                  },
                  { text: "Fixed On Demand", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: "Variable Periodic Schedule", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: "Fixed Periodic Schedule", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: "Variable Defined Schedule", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: "Fixed Defined Schedule", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                  { text: "Delegated SCA", collapsed: true, items: multiPaymentItems2(`${BASE2}/${VERSION2}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) }
                ]
              }
            ]
          },
          {
            text: "Personal Identifiable Information",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/` },
              { text: "Debtor Account", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: "Creditor", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/creditor` },
              {
                text: "API Guide",
                collapsed: true,
                items: [
                  { text: "How to Decrypt PII", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii` },
                  { text: "Verify TPP Signature (Optional)", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature` }
                ]
              },
              {
                text: "API Schemas",
                collapsed: true,
                items: [
                  { text: "PII (Consent - Consent Manager)", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: "PII (Payments - Ozone Connect)", link: `${BASE2}/${VERSION2}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` }
                ]
              }
            ]
          },
          {
            text: "Multi Authorization",
            link: `${BASE2}/${VERSION2}/banking/service-initiation//multi-authorization/`
          },
          {
            text: "Refunds",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/service-initiation/refunds/requirements` },
              { text: "API Guide", link: `${BASE2}/${VERSION2}/banking/service-initiation/refunds/api-guide` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/payments", `${BASE2}/${VERSION2}/banking/service-initiation/open-api/payments`),
              apiRef("GET", "/payments/{PaymentId}", `${BASE2}/${VERSION2}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE2}/${VERSION2}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`)
            ]
          }
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/banking/confirmation-of-payee/` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/confirmation-of-payee/requirements` },
          { text: "User Experience", link: `${BASE2}/${VERSION2}/banking/confirmation-of-payee/user-journeys` },
          { text: "API Guide", link: `${BASE2}/${VERSION2}/banking/confirmation-of-payee/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/customers/action/cop-query", `${BASE2}//${VERSION2}/banking/confirmation-of-payee/open-api/cop-query`)
            ]
          }
        ]
      },
      {
        text: "Products & Leads",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/banking/products-and-leads/` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/products-and-leads/requirements` },
          { text: "API Guide", link: `${BASE2}/${VERSION2}/banking/products-and-leads/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/products", `${BASE2}/${VERSION2}/banking/products-and-leads/open-api/products`),
              apiRef("POST", "/leads", `${BASE2}/${VERSION2}/banking/products-and-leads/open-api/leads`)
            ]
          }
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/banking/atms/` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/banking/atms/requirements` },
          { text: "API Guide", link: `${BASE2}/${VERSION2}/banking/atms/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/atm", `${BASE2}/${VERSION2}/banking/atms/open-api/atm`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Consent Journey",
    collapsed: true,
    items: [
      {
        text: "Authentication",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/consent-journey/authentication` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/consent-journey/authentication/requirements` },
          { text: "Strong Customer Authentication", link: `${BASE2}/${VERSION2}/consent-journey/authentication/sca` },
          { text: "Implementation Guide", link: `${BASE2}/${VERSION2}/consent-journey/authentication/implementation` }
        ]
      },
      {
        text: "Authorization",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/${VERSION2}/consent-journey/authorization` },
          { text: "Requirements", link: `${BASE2}/${VERSION2}/consent-journey/authorization/requirements` }
        ]
      },
      { text: "API Guide", link: `${BASE2}/${VERSION2}/consent-journey/api-guide` }
    ]
  },
  {
    text: "Consent Management Interface",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE2}/${VERSION2}/consent-management-interface/` },
      { text: "Requirements", link: `${BASE2}/${VERSION2}/consent-management-interface/requirements` },
      { text: "User Experience", link: `${BASE2}/${VERSION2}/consent-management-interface/user-experience` },
      { text: "API Guide", link: `${BASE2}/${VERSION2}/consent-management-interface/api-guide` }
    ]
  },
  {
    text: "Testing & Certification",
    collapsed: true,
    items: [
      {
        text: "Required Certifications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE2}/production/testing-certification/overview` },
          {
            text: "Functional Evidence",
            collapsed: true,
            items: [
              { text: "Bank Data Sharing", link: `${BASE2}/production/testing-certification/functional` }
            ]
          },
          { text: "User Experience Evidence", link: `${BASE2}/production/testing-certification/user-experience` },
          { text: "Performance Testing", link: `${BASE2}/production/testing-certification/performance` },
          { text: "Security Validation", link: `${BASE2}/production/testing-certification/security-validation` }
        ]
      },
      {
        text: "Production Live Proving",
        collapsed: true,
        items: [
          { text: "Attestation & Self Testing", link: `${BASE2}/production/testing-certification/self-testing` },
          { text: "TPP Buddying", link: `${BASE2}/production/testing-certification/tpp-buddying` }
        ]
      }
    ]
  }
];

// docs/.vitepress/config/sidebars/policy.ts
var policySidebar = [
  { text: "Open License and Contribution Agreement", link: "/policy/open-license-contribution-agreement" },
  { text: "Secure Management of Keys and Credentials", link: "/policy/secure-management" },
  { text: "Version Management", link: "/policy/version-management" },
  { text: "Changes to Published Documentation", link: "/policy/changes-to-published-content" },
  { text: "Major Version Deprecation", link: "/policy/lfi-deprecation" }
];
var processesSidebar = [
  { text: "How To Disable TPP Access", link: "/processes/disabling-access" },
  { text: "Raising CAB Request", link: "/processes/raising-cab-request" }
];

// docs/.vitepress/config/sidebars/kb.ts
import { readdirSync } from "node:fs";
import { dirname, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
var BASE3 = "/knowledge-base";
var __dirname2 = dirname(fileURLToPath(import.meta.url));
var KB_DIR = resolve(__dirname2, "../../../knowledge-base");
var toTitle = (slug) => slug.split("-").filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
var getMarkdownFiles = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
};
var kbItems = getMarkdownFiles(KB_DIR).map((fullPath) => relative(KB_DIR, fullPath).replace(/\\/g, "/")).filter((relPath) => relPath.toLowerCase() !== "index.md").map((relPath) => relPath.replace(/\.md$/i, "")).sort((a, b) => a.localeCompare(b)).map((relPath) => ({
  text: toTitle(posix.basename(relPath)),
  link: `${BASE3}/${relPath}`
}));
var kbSidebar = [
  {
    text: "Knowledge Base",
    items: kbItems
  }
];

// docs/.vitepress/config/sidebars/erratas.ts
import { dirname as dirname2 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// docs/.vitepress/version.ts
var VERSIONS = ["v2.1"];
var CURRENT_VERSION = VERSIONS[VERSIONS.length - 1];

// docs/.vitepress/config/sidebars/erratas.ts
var BASE4 = `/tech/erratas/${CURRENT_VERSION}`;
var __dirname3 = dirname2(fileURLToPath2(import.meta.url));
var erratasSidebar = [
  {
    text: `Errata Items`,
    items: [
      { text: "No errata items" }
    ]
  }
];

// docs/.vitepress/config/sidebars/api-specs.ts
var BASE5 = `/tech/api-specs/${CURRENT_VERSION}`;
var apiSpecsSidebar = [
  {
    text: "TPP - Standards",
    link: `${BASE5}/tpp/`,
    items: [
      {
        text: "Trust Framework",
        collapsed: true,
        items: [
          apiRef("GET", "/participants", `${BASE5}/tpp/trust-framework/participants`)
        ]
      },
      {
        text: "Registration",
        collapsed: true,
        items: [
          apiRef("POST", "/tpp-registration", `${BASE5}/tpp/registration/tpp-registration`)
        ]
      },
      {
        text: "Token",
        collapsed: true,
        items: [
          apiRef("POST", "/token", `${BASE5}/tpp/token/token`)
        ]
      },
      {
        text: "Consent",
        collapsed: true,
        items: [
          {
            text: "Create Consent",
            items: [
              apiRef("POST", "/par", `${BASE5}/tpp/consent/par`)
            ]
          },
          {
            text: "Bank Data Sharing",
            items: [
              apiRef("GET", "/account-access-consents", `${BASE5}/tpp/consent/account-access-consents`),
              apiRef("GET", "/account-access-consents/{ConsentId}", `${BASE5}/tpp/consent/account-access-consents-ConsentId`),
              apiRef("PATCH", "/account-access-consents/{ConsentId}", `${BASE5}/tpp/consent/patch-account-access-consents-ConsentId`)
            ]
          },
          {
            text: "Bank Service Initiation",
            items: [
              apiRef("GET", "/payment-consents", `${BASE5}/tpp/consent/payment-consents`),
              apiRef("GET", "/payment-consents/{ConsentId}", `${BASE5}/tpp/consent/payment-consents-ConsentId`),
              apiRef("PATCH", "/payment-consents/{ConsentId}", `${BASE5}/tpp/consent/patch-payment-consents-ConsentId`)
            ]
          }
        ]
      },
      {
        text: "Bank Data Sharing",
        collapsed: true,
        items: [
          apiRef("GET", "/accounts", `${BASE5}/tpp/data-sharing/accounts`),
          apiRef("GET", "/accounts/{AccountId}", `${BASE5}/tpp/data-sharing/accounts-AccountId`),
          apiRef("GET", "/accounts/{AccountId}/balances", `${BASE5}/tpp/data-sharing/accounts-AccountId-balances`),
          apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE5}/tpp/data-sharing/accounts-AccountId-beneficiaries`),
          apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE5}/tpp/data-sharing/accounts-AccountId-direct-debits`),
          apiRef("GET", "/parties", `${BASE5}/tpp/data-sharing/parties`),
          apiRef("GET", "/accounts/{AccountId}/parties", `${BASE5}/tpp/data-sharing/accounts-AccountId-parties`),
          apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE5}/tpp/data-sharing/accounts-AccountId-scheduled-payments`),
          apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE5}/tpp/data-sharing/accounts-AccountId-standing-orders`),
          apiRef("GET", "/accounts/{AccountId}/statements", `${BASE5}/tpp/data-sharing/accounts-AccountId-statements`),
          apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE5}/tpp/data-sharing/accounts-AccountId-transactions`)
        ]
      },
      {
        text: "Bank Service Initiation",
        collapsed: true,
        items: [
          apiRef("POST", "/payments", `${BASE5}/tpp/service-initiation/payments`),
          apiRef("GET", "/payments/{PaymentId}", `${BASE5}/tpp/service-initiation/payments-PaymentId`),
          apiRef("GET", "/payments", `${BASE5}/tpp/service-initiation/payments-idempotency`),
          apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE5}/tpp/service-initiation/payment-consents-ConsentId-refund`)
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          apiRef("POST", "/discovery", `${BASE5}/tpp/confirmation-of-payee/discovery`),
          apiRef("POST", "/confirmation", `${BASE5}/tpp/confirmation-of-payee/confirmation`)
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          apiRef("GET", "/atms", `${BASE5}/tpp/atms/atms`)
        ]
      },
      {
        text: "Events & Webhooks",
        collapsed: true,
        items: [
          apiRef("POST", "[consent status]", `${BASE5}/tpp/webhooks/consent-status`),
          apiRef("POST", "[payment status]", `${BASE5}/tpp/webhooks/payment-status`)
        ]
      }
    ]
  },
  {
    text: "API Hub",
    link: `${BASE5}/api-hub/`,
    items: [
      {
        text: "Headless Heimdall Auth Server",
        collapsed: true,
        items: [
          {
            text: "Health Check",
            items: [
              apiRef("GET", "/hello-mtls", `${BASE5}/api-hub/headless-heimdall/open-api/hello-mtls`)
            ]
          },
          {
            text: "Authorization",
            items: [
              apiRef("GET", "/auth", `${BASE5}/api-hub/headless-heimdall/open-api/auth`),
              apiRef("POST", "/auth/{interactionId}/doConfirm", `${BASE5}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
              apiRef("POST", "/auth/{interactionId}/doFail", `${BASE5}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`)
            ]
          }
        ]
      },
      {
        text: "Consent Manager",
        collapsed: true,
        items: [
          {
            text: "Health Check",
            items: [
              apiRef("GET", "/hello-mtls", `${BASE5}/api-hub/consent-manager/open-api/hello-mtls`)
            ]
          },
          {
            text: "Consents",
            items: [
              apiRef("GET", "/consents", `${BASE5}/api-hub/consent-manager/open-api/consents`),
              apiRef("GET", "/consents/{consentId}", `${BASE5}/api-hub/consent-manager/open-api/consents-consentId`),
              apiRef("PATCH", "/consents/{consentId}", `${BASE5}/api-hub/consent-manager/open-api/patch-consents-consentId`),
              apiRef("GET", "/consents/{consentId}/audit", `${BASE5}/api-hub/consent-manager/open-api/consents-consentId-audit`),
              apiRef("GET", "/consent-groups/{consentGroupId}/consents", `${BASE5}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
              apiRef("GET", "/psu/{userId}/consents", `${BASE5}/api-hub/consent-manager/open-api/psu-userId-consents`),
              apiRef("GET", "/accounts/{accountId}/consents", `${BASE5}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
              apiRef("POST", "/consent-groups/{consentGroupId}/consents/action/revoke", `${BASE5}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
              apiRef("POST", "/consents/{consentId}/action/revoke", `${BASE5}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`)
            ]
          },
          {
            text: "Payment Log",
            items: [
              apiRef("GET", "/payment-log", `${BASE5}/api-hub/consent-manager/open-api/payment-log`),
              apiRef("PATCH", "/payment-log/{id}", `${BASE5}/api-hub/consent-manager/open-api/payment-log-id`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Ozone Connect",
    link: `${BASE5}/ozone-connect/`,
    items: [
      {
        text: "Consent Events",
        collapsed: true,
        items: [
          apiRef("POST", "/consent/action/validate", `${BASE5}/ozone-connect/consent-events/validate`),
          apiRef("POST", "/consent/event/{operation}", `${BASE5}/ozone-connect/consent-events/event-op`)
        ]
      },
      {
        text: "Bank Data Sharing",
        collapsed: true,
        items: [
          apiRef("GET", "/accounts", `${BASE5}/ozone-connect/data-sharing/accounts`),
          apiRef("GET", "/accounts/{AccountId}", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId`),
          apiRef("GET", "/accounts/{AccountId}/balances", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-balances`),
          apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-beneficiaries`),
          apiRef("GET", "/customer", `${BASE5}/ozone-connect/data-sharing/customer`),
          apiRef("GET", "/accounts/{AccountId}/customer", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-customer`),
          apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-direct-debits`),
          apiRef("GET", "/accounts/{AccountId}/products", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-products`),
          apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-scheduled-payments`),
          apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-standing-orders`),
          apiRef("GET", "/accounts/{AccountId}/statements", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-statements`),
          apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE5}/ozone-connect/data-sharing/accounts-AccountId-transactions`)
        ]
      },
      {
        text: "Bank Service Initiation",
        collapsed: true,
        items: [
          apiRef("POST", "/payments", `${BASE5}/ozone-connect/service-initiation/payments`),
          apiRef("GET", "/payments/{PaymentId}", `${BASE5}/ozone-connect/service-initiation/payments-PaymentId`),
          apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE5}/ozone-connect/service-initiation/payment-consents-ConsentId-refund`)
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          apiRef("POST", "/customers/action/cop-query", `${BASE5}/ozone-connect/confirmation-of-payee/cop-query`)
        ]
      },
      {
        text: "Products & Leads",
        collapsed: true,
        items: [
          apiRef("GET", "/products", `${BASE5}/ozone-connect/products-and-leads/products`),
          apiRef("POST", "/leads", `${BASE5}/ozone-connect/products-and-leads/leads`)
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          apiRef("GET", "/atm", `${BASE5}/ozone-connect/atms/atm`)
        ]
      }
    ]
  }
];

// docs/.vitepress/config/sidebars/doc-repository.ts
import { readFileSync } from "node:fs";
import { dirname as dirname3, resolve as resolve3 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
var __dirname4 = dirname3(fileURLToPath3(import.meta.url));
var TF_PATH = resolve3(__dirname4, "../../../public/api/trust-framework.json");
var BASE6 = "/doc-repository";
var data = JSON.parse(readFileSync(TF_PATH, "utf-8"));
var orgs = data.organisations.filter((o) => o.isProduction === true && o.Status === "Active").sort((a, b) => a.OrganisationName.localeCompare(b.OrganisationName));
var orgItems = orgs.map((o) => ({
  text: o.OrganisationName,
  collapsed: true,
  items: [
    { text: "Public Documents", link: `${BASE6}/${o.OrganisationId}/public` },
    { text: "Private Documents", link: `${BASE6}/${o.OrganisationId}/private` }
  ]
}));
var docRepositorySidebar = [
  {
    text: "Document Repository",
    items: orgItems
  }
];

// docs/.vitepress/config.ts
var SITE_URL = "https://nebras-open-finance.com";
var SITE_TITLE = "UAE Open Finance \u2014 Community Standards";
var SITE_DESCRIPTION = "Community-driven, experimental documentation for the UAE Open Finance standards (TPP, LFI, API Hub). Not the official source of truth.";
var SITE_OG_IMAGE = `${SITE_URL}/AlTareq.png`;
var MAX_META_DESCRIPTION = 160;
function stripInlineMarkdown(s) {
  return s.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/_([^_]+)_/g, "$1").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function extractFirstParagraph(filePath) {
  let src;
  try {
    src = readFileSync2(filePath, "utf8");
  } catch {
    return "";
  }
  const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const lines = body.split(/\r?\n/);
  const para = [];
  let inFence = false;
  let inContainer = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^:::/.test(line)) {
      inContainer += line === ":::" ? -1 : 1;
      continue;
    }
    if (inContainer > 0) continue;
    if (!line) {
      if (para.length) break;
      continue;
    }
    if (/^(#{1,6}\s|<|import\s|export\s|\||-\s|\*\s|\d+\.\s|>\s|<!--)/.test(line)) {
      if (para.length) break;
      continue;
    }
    para.push(line);
  }
  if (!para.length) return "";
  const cleaned = stripInlineMarkdown(para.join(" "));
  if (cleaned.length <= MAX_META_DESCRIPTION) return cleaned;
  const cut = cleaned.slice(0, MAX_META_DESCRIPTION - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}
function relativePathToUrlPath(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/\.md$/, "");
  if (normalized === "index") return "/";
  if (normalized.endsWith("/index")) return `/${normalized.slice(0, -"index".length)}`;
  return `/${normalized}`;
}
var wellKnownProxyPlugin = {
  name: "well-known-proxy",
  configureServer(server) {
    server.middlewares.use("/api/well-known-proxy", async (req, res) => {
      const targetUrl = new URL("http://localhost" + req.url).searchParams.get("url");
      if (!targetUrl) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Missing url parameter" }));
        return;
      }
      try {
        const upstream = await fetch(targetUrl);
        const text = await upstream.text();
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(text);
      } catch {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: "Upstream fetch failed" }));
      }
    });
  }
};
var config_default = defineConfig({
  markdown: {
    config(md) {
      md.core.ruler.push("version-badge", (state) => {
        const env = state.env;
        const filePath = (env?.relativePath ?? env?.path ?? "").replace(/\\/g, "/");
        const versionMatch = filePath.match(/\/v(\d+\.\d+)\//);
        if (!versionMatch) return;
        const version = `v${versionMatch[1]}`;
        for (let i = 0; i < state.tokens.length - 1; i++) {
          const tok = state.tokens[i];
          if (tok.type === "heading_open" && tok.tag === "h1") {
            const inline = state.tokens[i + 1];
            if (inline?.type === "inline" && !inline.content.includes("<Badge")) {
              inline.content += ` <Badge type="tip" text="${version}" />`;
              if (inline.children) {
                const badge = new state.Token("html_inline", "", 0);
                badge.content = ` <Badge type="tip" text="${version}" />`;
                inline.children.push(badge);
              }
            }
            break;
          }
        }
      });
    }
  },
  title: "UAE Open Finance",
  titleTemplate: ":title | UAE Open Finance",
  description: SITE_DESCRIPTION,
  lang: "en",
  appearance: false,
  cleanUrls: true,
  sitemap: {
    hostname: SITE_URL
  },
  head: [
    ["link", { rel: "icon", href: "/fav.ico" }],
    // Site-wide Open Graph (per-page og:title/og:description/og:url are emitted in transformPageData)
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: SITE_TITLE }],
    ["meta", { property: "og:image", content: SITE_OG_IMAGE }],
    // Site-wide Twitter (per-page twitter:title/twitter:description are emitted in transformPageData)
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: SITE_OG_IMAGE }]
  ],
  transformPageData(pageData, ctx) {
    const relPath = pageData.relativePath.replace(/\\/g, "/");
    const urlPath = relativePathToUrlPath(relPath);
    const canonicalUrl = `${SITE_URL}${urlPath}`;
    let description = pageData.frontmatter.description?.trim();
    if (!description) {
      const absPath = resolve4(ctx.siteConfig.srcDir, pageData.relativePath);
      description = extractFirstParagraph(absPath);
    }
    if (!description) description = SITE_DESCRIPTION;
    if (!pageData.frontmatter.description) {
      pageData.description = description;
    }
    const rawTitle = (pageData.title || "").trim();
    const ogTitle = !rawTitle || rawTitle === "UAE Open Finance" ? SITE_TITLE : `${rawTitle} | UAE Open Finance`;
    const versionMatch = relPath.match(/\/v(\d+\.\d+)\//);
    const isSupersededVersion = versionMatch && `v${versionMatch[1]}` !== CURRENT_VERSION;
    const managedKeys = /* @__PURE__ */ new Set([
      "rel:canonical",
      "property:og:title",
      "property:og:description",
      "property:og:url",
      "name:twitter:title",
      "name:twitter:description",
      "name:robots"
    ]);
    pageData.frontmatter.head = (pageData.frontmatter.head ?? []).filter(([, attrs]) => {
      const key = attrs?.rel ? `rel:${attrs.rel}` : attrs?.property ? `property:${attrs.property}` : attrs?.name ? `name:${attrs.name}` : "";
      return !managedKeys.has(key);
    });
    pageData.frontmatter.head.push(
      ["link", { rel: "canonical", href: canonicalUrl }],
      ["meta", { property: "og:title", content: ogTitle }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: canonicalUrl }],
      ["meta", { name: "twitter:title", content: ogTitle }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "robots", content: isSupersededVersion ? "noindex, follow" : "index, follow" }]
    );
  },
  // Maps source file paths → versioned URL paths.
  // e.g. docs/tech/tpp-standards/banking/index.md → /tech/tpp-standards/v2.1/banking/
  rewrites: {
    "tech/tpp-standards/:path(.*)": "tech/tpp-standards/:path",
    "tech/lfi-api-hub/:path(.*)": "tech/lfi-api-hub/:path"
  },
  vite: {
    plugins: [wellKnownProxyPlugin],
    resolve: {
      alias: {
        "@components": resolve4(__dirname, "../components")
      }
    },
    optimizeDeps: {
      include: ["vue3-tel-input", "mermaid", "dayjs"]
    }
  },
  themeConfig: {
    siteTitle: false,
    nav: [
      { text: "Policies", link: "/policy" },
      {
        text: "Developer Docs",
        items: [
          { text: "TPP \u2013 Open Finance Standards", link: "/tech/tpp-standards/" },
          { text: "LFI \u2013 Integration Guide", link: "/tech/lfi-api-hub/" },
          { text: "API Specs", link: `/tech/api-specs/${CURRENT_VERSION}` },
          { text: "Knowledge Base", link: "/knowledge-base/" },
          { text: "Erratas", link: `/tech/erratas/${CURRENT_VERSION}` }
        ]
      },
      { text: "Metrics & Monitoring", link: "/metrics" },
      { text: "Articles & News", link: "/news" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Nebras-Open-Finance/community-standards" }
    ],
    search: {
      provider: "local"
    },
    sidebar: {
      "/tech/overview": [
        { text: "TPP - Open Finance Standards", link: "/tech/tpp-standards/" },
        { text: "LFI - Integration Guide", link: "/tech/lfi-api-hub/" },
        { text: "API Specs", link: `/tech/api-specs/${CURRENT_VERSION}` },
        { text: "Knowledge Base", link: "/knowledge-base/" },
        { text: "Erratas", link: `/tech/erratas/${CURRENT_VERSION}` }
      ],
      "/tech/tpp-standards": tppSidebar,
      "/tech/lfi-api-hub": lfiSidebar,
      "/policy": policySidebar,
      "/processes": processesSidebar,
      "/tech/erratas": erratasSidebar,
      "/knowledge-base": kbSidebar,
      "/doc-repository": docRepositorySidebar,
      [`/tech/api-specs/${CURRENT_VERSION}`]: apiSpecsSidebar
    }
  }
});
export {
  config_default as default
};
