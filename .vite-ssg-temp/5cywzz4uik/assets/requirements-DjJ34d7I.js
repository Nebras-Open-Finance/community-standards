import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Bank Data Sharing — Requirements",
  version: "v2.1",
  readTime: "15 min",
  lede: 'The validation rules that apply to Bank Data Sharing. The <strong>Validated by</strong> column on each table indicates where each rule is enforced. Read alongside the <a href="/tech/tpp-standards/v2.1/consent/requirements">Consent requirements</a> and the <a href="./user-journeys">User Journeys</a>.',
  preconditions: 'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BDSP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: "post-par",
      num: "01",
      method: "POST",
      path: "/par",
      title: "Consent Creation",
      intro: 'The consent is submitted inside a signed <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> sent to the Authorization Server. The <code>consent.*</code> fields referenced below are nested as <code>authorization_details[0].consent</code> within that JWT. The POST body must also include a <a href="/tech/tpp-standards/security/tokens/client-assertion">client assertion</a> to authenticate the TPP application.',
      rules: [
        { field: "Request JWT", rule: 'Must conform to the <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT requirements</a> — correct <code>aud</code>, signing algorithm (<code>PS256</code>), and expiry window.', validatedBy: "API Hub" },
        { field: "<code>client_assertion</code>", rule: 'Must be included in the POST body (<code>client_assertion_type</code>: <code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>). Authenticates the TPP application — see <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a>.', validatedBy: "API Hub" },
        { field: "<code>scope</code> (in Request JWT)", rule: "Must be <code>accounts openid</code>.", validatedBy: "API Hub" },
        { field: "<code>authorization_details[0].type</code> (in Request JWT)", rule: "Must be <code>urn:openfinanceuae:account-access-consent:v2.1</code>.", validatedBy: "API Hub" },
        { field: "API version supported", rule: 'The consent version in <code>authorization_details[0].type</code> (e.g. <code>urn:openfinanceuae:account-access-consent:v2.1</code>) restricts the version of the Account Information endpoints the consent can be used to call (specified in the path, e.g. <code>/open-finance/v2.1/accounts</code>). It MUST resolve to an <code>ApiVersion</code> the LFI has published in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a> for the Account Information API family.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "OpenAPI schema", rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/consent/open-api/par">POST <code>/par</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "API Hub" },
        { field: "<code>consent.AccountType</code>", rule: `Must be a value supported by the LFI. Supported account types are discoverable via the <code>AccountTypes</code> flag on the LFI's authorisation server entry in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a>.`, validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.AccountSubType</code>", rule: `If provided, each value must be a sub-type supported by the LFI. Supported sub-types are discoverable via the <code>AccountSubTypes</code> metadata on the LFI's authorisation server entry in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a>.`, validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.Permissions</code>", rule: "If any of <code>ReadBalances</code>, <code>ReadBeneficiariesBasic</code>, <code>ReadBeneficiariesDetail</code>, <code>ReadTransactionsBasic</code>, <code>ReadTransactionsDetail</code>, <code>ReadProduct</code>, <code>ReadScheduledPaymentsBasic</code>, <code>ReadScheduledPaymentsDetail</code>, <code>ReadDirectDebits</code>, <code>ReadStandingOrdersBasic</code>, <code>ReadStandingOrdersDetail</code>, <code>ReadStatements</code>, or <code>ReadProductFinanceRates</code> are included, at least one of <code>ReadAccountsBasic</code> or <code>ReadAccountsDetail</code> must also be present.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code> — <code>ReadProductFinanceRates</code>", rule: '<code>ReadProductFinanceRates</code> MUST only be requested by TPPs that hold the <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">Access Encrypted Resource Data</a> optional certification with Nebras. An uncertified TPP MUST NOT include this permission in <code>authorization_details</code>; if it does, the API Hub rejects the consent. Only certified TPPs are permitted to receive product finance rates, whether the LFI returns them in cleartext or as an encrypted JWE.', validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code> (unsupported)", rule: "If the provided Permissions include permissions not supported by the LFI (e.g. the LFI does not have the endpoint <code>/accounts/{AccountId}/standing-orders</code> published to the Trust Framework yet the consent request includes <code>ReadStandingOrdersBasic</code> or <code>ReadStandingOrdersDetail</code>), the consent validation will fail.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.BaseConsentId</code>", rule: "If provided, must reference a previous consent belonging to the <strong>same end user</strong>. If the original consent in the chain already had a <code>BaseConsentId</code>, the TPP must reuse that same <code>BaseConsentId</code> rather than the immediate prior <code>ConsentId</code>.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.ExpirationDateTime</code>", rule: "Must not be in the past. Must be less than one year in the future.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" }
      ]
    },
    {
      id: "authorization",
      num: "02",
      title: "Authorization — Account Selection",
      rules: [
        { field: "Eligible accounts", rule: "If the authenticated customer does not hold any accounts matching the requested consent parameters (e.g. <code>AccountType</code>, <code>AccountSubType</code>, or the permissions requested), the consent will be set to <code>Rejected</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-accounts",
      num: "03",
      method: "GET",
      path: "/accounts",
      title: "List Accounts",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token issued with the <code>accounts openid</code> scope. The consent bound to the token must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.", validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path (e.g. <code>v2.1</code> in <code>/open-finance/account-information/v2.1/accounts</code>) must match the version in the consent's <code>authorization_details[0].type</code> (<code>urn:openfinanceuae:account-access-consent:v2.1</code>).", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadAccountsBasic</code> or <code>ReadAccountsDetail</code>.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. <code>Tue, 11 Sep 2012 19:43:31 UTC</code>.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, <code>Mortgage</code>.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-accountid",
      num: "04",
      method: "GET",
      path: "/accounts/{AccountId}",
      title: "Get Account",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token issued with the <code>accounts openid</code> scope. The consent bound to the token must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.", validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path must match the version in the consent's <code>authorization_details[0].type</code>.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadAccountsBasic</code> or <code>ReadAccountsDetail</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231).", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, <code>Mortgage</code>.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-balances",
      num: "05",
      method: "GET",
      path: "/accounts/{AccountId}/balances",
      title: "Get Balances",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token issued with the <code>accounts openid</code> scope. The consent bound to the token must be in <code>Authorized</code> status and not expired.", validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadBalances</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, <code>Mortgage</code>.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-beneficiaries",
      num: "06",
      method: "GET",
      path: "/accounts/{AccountId}/beneficiaries",
      title: "Get Beneficiaries",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadBeneficiariesBasic</code> or <code>ReadBeneficiariesDetail</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts. Not available for <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code> accounts.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-direct-debits",
      num: "07",
      method: "GET",
      path: "/accounts/{AccountId}/direct-debits",
      title: "Get Direct Debits",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadDirectDebits</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-product",
      num: "08",
      method: "GET",
      path: "/accounts/{AccountId}/product",
      title: "Get Product",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: 'The consent must include <code>ReadProduct</code>. <code>ReadProductFinanceRates</code> is required for finance rate data to be included in the response, and is only available to TPPs holding the <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">Access Encrypted Resource Data</a> certification — see <a href="#post-par">Consent Creation</a>.', validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "Customer-present session", rule: "When the consent includes <code>ReadProductFinanceRates</code>, the TPP MUST only call this endpoint from an active customer-facing session — the customer must be using the TPP application at the time of the call. Background or scheduled calls are not permitted on a consent that carries <code>ReadProductFinanceRates</code>, because the encrypted-rate flow requires the customer to receive and enter the one-time code in real time. Consequently <code>x-fapi-customer-ip-address</code> and <code>x-fapi-auth-date</code> MUST be set on every such call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call. MUST be sent on every call when the consent carries <code>ReadProductFinanceRates</code>, because such calls are always customer-present.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call. MUST be sent on every call when the consent carries <code>ReadProductFinanceRates</code>, because such calls are always customer-present.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes.", validatedBy: "LFI" },
        { field: "<code>FinanceRates</code> — key request", rule: "If <code>FinanceRates</code> is returned as a JWE, the TPP must prompt the User to enter the encryption key delivered to them by the LFI (e.g. via SMS or push notification) before decryption can proceed.", validatedBy: "TPP" },
        { field: "<code>FinanceRates</code> — local decryption", rule: "Decryption of the JWE must be performed locally on the User's device. The decrypted data must not be transmitted to the TPP's servers or persisted in any storage accessible to the TPP's application.", validatedBy: "TPP" },
        { field: "<code>FinanceRates</code> — data usage", rule: "The decrypted data must only be used to display the rates to the User within the active session. The TPP must not store, transmit, or otherwise process the unencrypted data.", validatedBy: "TPP" },
        { field: "<code>FinanceRates</code> — expiry", rule: "The TPP must observe the <code>exp</code> value in the JWE header and discard any decrypted data once the expiry threshold has passed. If the data is still required, the TPP must repeat the API operation to retrieve a fresh response — the original consent must still be valid for this to succeed.", validatedBy: "TPP" },
        { field: "<code>FinanceRates</code> — session discard", rule: "The TPP must discard all decrypted data from memory when the User closes their session, regardless of whether <code>exp</code> has been reached.", validatedBy: "TPP" }
      ]
    },
    {
      id: "get-scheduled-payments",
      num: "09",
      method: "GET",
      path: "/accounts/{AccountId}/scheduled-payments",
      title: "Get Scheduled Payments",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadScheduledPaymentsBasic</code> or <code>ReadScheduledPaymentsDetail</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-standing-orders",
      num: "10",
      method: "GET",
      path: "/accounts/{AccountId}/standing-orders",
      title: "Get Standing Orders",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadStandingOrdersBasic</code> or <code>ReadStandingOrdersDetail</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-transactions",
      num: "11",
      method: "GET",
      path: "/accounts/{AccountId}/transactions",
      title: "Get Transactions",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadTransactionsBasic</code> or <code>ReadTransactionsDetail</code>. <code>ReadFXTransactionsBasic</code>, <code>ReadFXTransactionsDetail</code>, or <code>ReadFXRemittanceCharges</code> are required for FX transaction data to be included.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>fromBookingDateTime</code>", rule: "If provided, must be a valid ISO 8601 date-time (time component optional, defaults to <code>00:00:00</code>) and must not be after <code>toBookingDateTime</code>. A contradictory range is rejected with <code>400</code> <code>Resource.InvalidFormat</code>. Any timezone offset is ignored when filtering.", validatedBy: "API Hub" },
        { field: "<code>toBookingDateTime</code>", rule: "If provided, must be a valid ISO 8601 date-time (time component optional, defaults to <code>00:00:00</code>) and must not be in the future. A future <code>toBookingDateTime</code> is rejected with <code>400</code> <code>Resource.InvalidFormat</code>. Any timezone offset is ignored when filtering.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-statements",
      num: "12",
      method: "GET",
      path: "/accounts/{AccountId}/statements",
      title: "Get Statements",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadStatements</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>fromStatementDate</code>", rule: "If provided, must be a valid ISO 8601 date and must not be after <code>toStatementDate</code>. A contradictory range is rejected with <code>400</code> <code>Resource.InvalidFormat</code>. Filtering is open-ended if not provided.", validatedBy: "API Hub" },
        { field: "<code>toStatementDate</code>", rule: "If provided, must be a valid ISO 8601 date and must not be in the future. A future <code>toStatementDate</code> is rejected with <code>400</code> <code>Resource.InvalidFormat</code>. Filtering is open-ended if not provided.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-account-parties",
      num: "13",
      method: "GET",
      path: "/accounts/{AccountId}/parties",
      title: "Get Account Parties",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadParty</code>, <code>ReadPartyUser</code>, or <code>ReadPartyUserIdentity</code>.", validatedBy: "API Hub" },
        { field: "<code>AccountId</code>", rule: 'Must be a valid account ID shared by the customer — i.e. returned by <code>GET /accounts</code> under the same consent. See <a href="#account-access">Account Access Validation</a> for the response when the customer does not hold the account.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-parties",
      num: "14",
      method: "GET",
      path: "/parties",
      title: "Get Parties",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent.", validatedBy: "API Hub" },
        { field: "URL version", rule: "Must match the consent version.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The consent must include <code>ReadParty</code>, <code>ReadPartyUser</code>, or <code>ReadPartyUserIdentity</code>.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" },
        { field: "<code>AccountSubType</code>", rule: "Supported for all account subtypes.", validatedBy: "LFI" }
      ]
    },
    {
      id: "account-access",
      num: "15",
      title: "Account Access Validation",
      intro: "Before returning data on any endpoint under <code>/accounts/{AccountId}</code> or <code>/accounts/{AccountId}/&hellip;</code>, the LFI verifies that the account in the path is held by the customer who authorized the consent. If the TPP supplies an <code>AccountId</code> that was not returned by <code>GET /accounts</code> under the same consent, or that the customer no longer holds, the LFI returns <code>403</code> according to the table below. The TPP MUST handle this response and surface a suitable message to the User.",
      table: {
        headers: ["Scenario", "Response"],
        rows: [
          { cells: ["<code>AccountId</code> is not held by the customer who authorized the consent", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] }
        ]
      },
      aside: "<code>GET /accounts</code> and <code>GET /parties</code> are exempt — they are not scoped to a specific account in the URL. TPPs SHOULD only call <code>/accounts/{AccountId}/&hellip;</code> endpoints with <code>AccountId</code> values returned by <code>GET /accounts</code> under the same consent."
    },
    {
      id: "account-status",
      num: "16",
      title: "Account Status Handling",
      intro: "Before returning data on any endpoint under <code>/accounts/{AccountId}/…</code>, the LFI checks the account's <code>Status</code>. If the account is not readable, the TPP will receive <code>403</code> according to the table below. The TPP MUST handle these responses and surface a suitable message to the User.",
      table: {
        headers: ["Status", "Response"],
        rows: [
          { cells: ["<code>Active</code>, <code>Inactive</code>, <code>Dormant</code>", "Data is returned normally."] },
          { cells: ["<code>Suspended</code>", "<code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is temporarily blocked.</code>"] },
          { cells: ["<code>Unclaimed</code>, <code>Deceased</code>, <code>Closed</code>", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] }
        ]
      },
      aside: "<code>GET /accounts</code> is exempt from this mapping — it returns all consented accounts regardless of status, with the <code>Status</code> field populated on each account. TPPs should observe <code>Status</code> from <code>GET /accounts</code> before making subsequent calls."
    }
  ]
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "requirements",
  __ssrInlineRender: true,
  setup(__props) {
    function validatorClass(v) {
      if (v === "API Hub") return "ed-req-validator--hub";
      if (v === "TPP") return "ed-req-validator--tpp";
      if (v === "N/A") return "ed-req-validator--none";
      if (v.startsWith("LFI")) return "ed-req-validator--lfi";
      return "ed-req-validator--lfi";
    }
    function splitValidator(v) {
      const m = v.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
      if (m && m[1] && m[2]) return { label: m[1].trim(), detail: m[2].trim() };
      return { label: v, detail: null };
    }
    function methodClass(m) {
      return m ? `http-${m.toLowerCase()}` : "";
    }
    function genericGridTemplate(headers) {
      var _a;
      const tracks = [];
      for (let i = 0; i < headers.length; i++) {
        const h = ((_a = headers[i]) == null ? void 0 : _a.trim()) ?? "";
        const isFirst = i === 0;
        const isLast = i === headers.length - 1;
        if (isFirst && h === "#") tracks.push("2.5rem");
        else if (isLast) tracks.push("minmax(0, 2.4fr)");
        else tracks.push("minmax(11rem, 1fr)");
      }
      return tracks.join(" ");
    }
    const eyebrow = computed(() => data.eyebrow ?? "Validate · Enforce · Trust");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-04f9232e><section class="ed-req-hero" data-v-04f9232e><div class="ed-req-hero__inner" data-v-04f9232e><div class="ed-req-hero__label" data-v-04f9232e><span class="ed-req-hero__label-dash" data-v-04f9232e></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-04f9232e>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-04f9232e>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-04f9232e>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-04f9232e>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-04f9232e>${unref(data).preconditions ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><!--[-->`);
      ssrRenderList(unref(data).sections, (s, i) => {
        _push(ssrRenderComponent(_component_EdSectionBand, {
          id: s.id,
          key: s.id,
          num: s.num,
          tone: i % 2 === 0 ? "cream" : "surface",
          eyebrow: s.method && s.path ? "Endpoint" : "Section",
          title: s.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (s.method && s.path) {
                _push2(`<div class="ed-req-endpoint" data-v-04f9232e${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-04f9232e${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-04f9232e${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-04f9232e${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-04f9232e${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-04f9232e${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-04f9232e${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-04f9232e${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-04f9232e${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-04f9232e${_scopeId}>${c ?? ""}</div>`);
                    });
                    _push2(`<!--]--></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (s.rules && s.rules.length) {
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-04f9232e${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-04f9232e${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-04f9232e${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-04f9232e${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-04f9232e${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-04f9232e${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-04f9232e${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-04f9232e${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-04f9232e${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-04f9232e${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-04f9232e${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-04f9232e${_scopeId}><span class="ed-req-validator__label" data-v-04f9232e${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-04f9232e${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</span></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (s.table) {
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-04f9232e${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-04f9232e${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-04f9232e${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-04f9232e${_scopeId}><h3 class="ed-req-sub__heading" data-v-04f9232e${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-04f9232e${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-04f9232e${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-04f9232e${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-04f9232e${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-04f9232e${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-04f9232e${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-04f9232e${_scopeId}>${c ?? ""}</div>`);
                      });
                      _push2(`<!--]--></div>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.subsections || [], (sub2, s2i) => {
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-04f9232e${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-04f9232e${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-04f9232e${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-04f9232e${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-04f9232e${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-04f9232e${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-04f9232e${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-04f9232e${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-04f9232e${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-04f9232e${_scopeId}>${c ?? ""}</div>`);
                        });
                        _push2(`<!--]--></div>`);
                      });
                      _push2(`<!--]--></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                s.method && s.path ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ed-req-endpoint"
                }, [
                  createVNode("span", {
                    class: ["http-badge", methodClass(s.method)]
                  }, toDisplayString(s.method), 3),
                  createVNode("code", { class: "ed-req-endpoint__path" }, toDisplayString(s.path), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.callouts || [], (c, ci) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-callout-${ci}`,
                    class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                  }, [
                    c.title ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ed-req-callout__title"
                    }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "ed-req-callout__body",
                      innerHTML: c.html
                    }, null, 8, ["innerHTML"])
                  ], 2);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(s.blocks || [], (b, bi) => {
                  return openBlock(), createBlock(Fragment, {
                    key: `${s.id}-blk-${bi}`
                  }, [
                    b.kind === "prose" ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "ed-req-intro",
                      innerHTML: b.html
                    }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "ed-req-table ed-req-table--generic",
                      role: "table",
                      "aria-label": s.title,
                      style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                    }, [
                      createVNode("div", {
                        class: "ed-req-row ed-req-row--head",
                        role: "row"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-blk-${bi}-h-${hi}`,
                            class: "ed-req-cell",
                            role: "columnheader"
                          }, toDisplayString(h), 1);
                        }), 128))
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-blk-${bi}-r-${ri}`,
                          class: "ed-req-row",
                          role: "row"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-blk-${bi}-r-${ri}-c-${ci}`,
                              class: "ed-req-cell ed-req-cell--generic",
                              role: "cell",
                              innerHTML: c
                            }, null, 8, ["innerHTML"]);
                          }), 128))
                        ]);
                      }), 128))
                    ], 12, ["aria-label"])) : createCommentVNode("", true)
                  ], 64);
                }), 128)),
                s.rules && s.rules.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "ed-req-table",
                  role: "table",
                  "aria-label": s.title
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--num",
                      role: "columnheader"
                    }, "#"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--field",
                      role: "columnheader"
                    }, "Field"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--rule",
                      role: "columnheader"
                    }, "Rule"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--validator",
                      role: "columnheader"
                    }, "Validated by")
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.rules, (r, idx) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-rule-${idx}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--num",
                        role: "cell"
                      }, toDisplayString(idx + 1), 1),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--field",
                        role: "cell",
                        innerHTML: r.field
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--rule",
                        role: "cell",
                        innerHTML: r.rule
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--validator",
                        role: "cell"
                      }, [
                        createVNode("span", {
                          class: ["ed-req-validator", validatorClass(r.validatedBy)]
                        }, [
                          createVNode("span", { class: "ed-req-validator__label" }, toDisplayString(splitValidator(r.validatedBy).label), 1),
                          splitValidator(r.validatedBy).detail ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ed-req-validator__detail"
                          }, toDisplayString(splitValidator(r.validatedBy).detail), 1)) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ]);
                  }), 128))
                ], 8, ["aria-label"])) : createCommentVNode("", true),
                s.table ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "ed-req-table ed-req-table--generic",
                  role: "table",
                  "aria-label": s.title,
                  style: { gridTemplateColumns: genericGridTemplate(s.table.headers) }
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(s.table.headers, (h, hi) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-h-${hi}`,
                        class: "ed-req-cell",
                        role: "columnheader"
                      }, toDisplayString(h), 1);
                    }), 128))
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.table.rows, (r, ri) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-r-${ri}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-r-${ri}-c-${ci}`,
                          class: "ed-req-cell ed-req-cell--generic",
                          role: "cell",
                          innerHTML: c
                        }, null, 8, ["innerHTML"]);
                      }), 128))
                    ]);
                  }), 128))
                ], 12, ["aria-label"])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.subsections || [], (sub, si) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-sub-${si}`,
                    class: "ed-req-sub"
                  }, [
                    createVNode("h3", { class: "ed-req-sub__heading" }, toDisplayString(sub.heading), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.callouts || [], (c, ci) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-callout-${ci}`,
                        class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                      }, [
                        c.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ed-req-callout__title"
                        }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "ed-req-callout__body",
                          innerHTML: c.html
                        }, null, 8, ["innerHTML"])
                      ], 2);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.blocks || [], (b, bi) => {
                      return openBlock(), createBlock(Fragment, {
                        key: `${s.id}-sub-${si}-blk-${bi}`
                      }, [
                        b.kind === "prose" ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "ed-req-sub__intro",
                          innerHTML: b.html
                        }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                          role: "table",
                          "aria-label": sub.heading,
                          style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                        }, [
                          createVNode("div", {
                            class: "ed-req-row ed-req-row--head",
                            role: "row"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                              return openBlock(), createBlock("div", {
                                key: `${s.id}-sub-${si}-blk-${bi}-h-${hi}`,
                                class: "ed-req-cell",
                                role: "columnheader"
                              }, toDisplayString(h), 1);
                            }), 128))
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}`,
                              class: "ed-req-row",
                              role: "row"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}-c-${ci}`,
                                  class: "ed-req-cell ed-req-cell--generic",
                                  role: "cell",
                                  innerHTML: c
                                }, null, 8, ["innerHTML"]);
                              }), 128))
                            ]);
                          }), 128))
                        ], 12, ["aria-label"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.subsections || [], (sub2, s2i) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-sub2-${s2i}`,
                        class: "ed-req-sub ed-req-sub--nested"
                      }, [
                        createVNode("h4", { class: "ed-req-sub__heading ed-req-sub__heading--nested" }, toDisplayString(sub2.heading), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.callouts || [], (c, ci) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-callout-${ci}`,
                            class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                          }, [
                            c.title ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "ed-req-callout__title"
                            }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                            createVNode("div", {
                              class: "ed-req-callout__body",
                              innerHTML: c.html
                            }, null, 8, ["innerHTML"])
                          ], 2);
                        }), 128)),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.blocks || [], (b, bi) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}`
                          }, [
                            b.kind === "prose" ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "ed-req-sub__intro",
                              innerHTML: b.html
                            }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                              role: "table",
                              "aria-label": sub2.heading,
                              style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                            }, [
                              createVNode("div", {
                                class: "ed-req-row ed-req-row--head",
                                role: "row"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                                  return openBlock(), createBlock("div", {
                                    key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-h-${hi}`,
                                    class: "ed-req-cell",
                                    role: "columnheader"
                                  }, toDisplayString(h), 1);
                                }), 128))
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}`,
                                  class: "ed-req-row",
                                  role: "row"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                    return openBlock(), createBlock("div", {
                                      key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}-c-${ci}`,
                                      class: "ed-req-cell ed-req-cell--generic",
                                      role: "cell",
                                      innerHTML: c
                                    }, null, 8, ["innerHTML"]);
                                  }), 128))
                                ]);
                              }), 128))
                            ], 12, ["aria-label"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/data-sharing/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04f9232e"]]);
export {
  requirements as default
};
