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
  readTime: "12 min",
  lede: 'The <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: `The tables below list the rules that apply to Bank Data Sharing. All request validation of the TPP's credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoints are called. The rules below cover what your Ozone Connect endpoints must validate and what they must return. Two cross-cutting checks apply to every endpoint under <code>/accounts/{accountId}</code> and <code>/accounts/{accountId}/&hellip;</code>: <a href="#account-access-validation">Account Access Validation</a> (the account is held by the resolved customer) and <a href="#account-status-handling">Account Status Handling</a> (the account is in a readable state).`,
  sections: [
    {
      id: "consent-validation",
      num: "01",
      title: "Consent Validation",
      blocks: [
        { kind: "prose", html: 'When a TPP creates a consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil. The field names in the rules below match the Ozone Connect <code>newConsent</code> payload the Hub delivers — <code>standardVersion</code> sits at the top level of the consent object; <code>BaseConsentId</code>, <code>AccountType</code>, <code>AccountSubType</code>, and <code>Permissions</code> sit under <code>consentBody.Data</code>.' },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Unsupported <code>standardVersion</code>", `The consent's <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent data sharing requests. If you do not support that version for the Account Information API family, respond with <code>invalid</code>. <br><br> Where you are dual-running multiple versions during a deprecation window (see <a href="/policy/lfi-deprecation">Major Version Deprecation</a>) — for example <code>v2.0</code> alongside <code>v3.1</code> — you MUST respond <code>valid</code> for every version you serve. <br><br> Minor versions are backward compatible (see <a href="/policy/version-management">Version Management</a>), so prior minors within each major you run are also valid (e.g. running <code>v2.0</code> and <code>v3.1</code> means <code>v2.0</code>, <code>v3.0</code>, and <code>v3.1</code> all resolve to <code>valid</code>).`] },
            { cells: ["2", "Unsupported <code>AccountType</code>", "If the consent's <code>AccountType</code> array contains a value that is not supported by the API Hub integration the consent was received on, respond with <code>invalid</code>. Each API Hub integration is scoped to a single segment (<code>Retail</code>, <code>SME</code>, or <code>Corporate</code>). If the LFI serves multiple segments, each segment MUST be configured as a separate API Hub integration because the API Hub has a single authorization endpoint. Validate that every requested <code>AccountType</code> is within scope of the integration that received the consent."] },
            { cells: ["3", "Unsupported <code>AccountSubType</code>", "If the consent's <code>AccountSubType</code> array contains a value not supported by this LFI, respond with <code>invalid</code>. For example, if the LFI does not offer <code>Mortgage</code> products but the consent requests <code>Mortgage</code>, the consent MUST be rejected at validation."] },
            { cells: ["4", "Unsupported permissions", "If the consent includes permissions that reference an endpoint the LFI has not yet delivered, respond with <code>invalid</code>. For example, if the consent includes <code>ReadStandingOrdersBasic</code> or <code>ReadStandingOrdersDetail</code> but <code>GET /accounts/{AccountId}/standing-orders</code> is not yet available, the consent MUST be rejected at validation."] },
            { cells: ["5", "Invalid <code>BaseConsentId</code>", "If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI.</li><li>The referenced consent is a Data Sharing consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:account-access-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>."] }
          ]
        } }
      ]
    },
    {
      id: "authorization-account-selection",
      num: "02",
      title: "Authorization — Account Selection",
      blocks: [
        { kind: "prose", html: 'The generic <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey. The rules below cover the additional account selection logic specific to Bank Data Sharing. During the consent authorization journey, the customer selects which of their accounts to share with the TPP. The LFI is responsible for presenting the eligible accounts and applying any filters the TPP has specified in the consent.' },
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>consent.AccountType</code>", "If the consent specifies <code>AccountType</code>, only present accounts whose type matches one of the specified values (<code>Retail</code>, <code>SME</code>, <code>Corporate</code>). If not specified, present accounts of all types supported by this API Hub integration."] },
            { cells: ["2", "<code>consent.AccountSubType</code>", "If the consent specifies <code>AccountSubType</code>, only present accounts whose subtype matches one of the specified values. If not specified, present accounts of all subtypes."] },
            { cells: ["3", "No eligible accounts", 'If the authenticated customer does not hold any accounts matching the requested consent parameters (e.g. <code>AccountType</code>, <code>AccountSubType</code>, or the permissions requested), PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>. See <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements">Authorization requirements</a> for details.'] },
            { cells: ["4", "Multiple selection", "The account selection screen must allow the customer to select more than one account. A consent with no accounts selected must not be authorised."] }
          ]
        } }
      ]
    },
    {
      id: "list-accounts",
      num: "03",
      method: "GET",
      path: "/accounts",
      title: "List Accounts",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>accountIds</code>", "Return the accounts whose <code>id</code> matches one of the values in the <code>accountIds</code> query parameter. Populate the <code>Status</code> field on each account so the TPP can see the current state."] },
            { cells: ["2", "Data completeness", "All fields that exist or are derivable from your systems must be populated on each account. All fields marked as required in the OpenAPI spec must be present. This includes <code>accountHolderName</code>, <code>status</code>, <code>currency</code>, <code>accountType</code>, and <code>accountSubType</code> where held."] },
            { cells: ["3", "<code>accountNumbers</code>", "Must contain at least one entry. <code>schemeName</code> and <code>identification</code> are required on each entry."] },
            { cells: ["4", "<code>accountNumbers.schemeName</code>", "Must reflect the account identifier type: <code>IBAN</code> for <code>CurrentAccount</code> and <code>Savings</code>; <code>MaskedPAN</code> for <code>CreditCard</code>; <code>MortgageReference</code> for <code>Mortgage</code>; <code>FinanceReference</code> for <code>Finance</code>."] },
            { cells: ["5", "<code>customers</code>", "For non-business accounts, <code>customers</code> must contain at least one entry. For business accounts, populate <code>businessCustomer</code> instead."] },
            { cells: ["6", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["7", "Account access", 'For every <code>accountId</code> in the <code>accountIds</code> query parameter, validate that the account is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before returning — if any of the requested accounts is not held by the customer, return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["8", "Account status", 'Return all consented accounts regardless of <code>Status</code>. Accounts that are <code>Inactive</code>, <code>Dormant</code>, <code>Suspended</code>, <code>Unclaimed</code>, <code>Deceased</code>, or <code>Closed</code> MUST still be included — the <code>Status</code> field on each account reflects the current state so the TPP can observe it. This endpoint is exempt from the <a href="#account-status-handling">Account Status Handling</a> mapping.'] }
          ]
        } }
      ]
    },
    {
      id: "get-account",
      num: "04",
      method: "GET",
      path: "/accounts/{accountId}",
      title: "Get Account",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Data completeness", "All fields that exist or are derivable from your systems must be populated, consistent with what is returned by <code>GET /accounts</code> for the same account. All fields marked as required in the OpenAPI spec must be present."] },
            { cells: ["3", "<code>accountNumbers</code>", "Must contain at least one entry. <code>schemeName</code> and <code>identification</code> are required on each entry."] },
            { cells: ["4", "<code>accountNumbers.schemeName</code>", "Must reflect the account identifier type: <code>IBAN</code> for <code>CurrentAccount</code> and <code>Savings</code>; <code>MaskedPAN</code> for <code>CreditCard</code>; <code>MortgageReference</code> for <code>Mortgage</code>; <code>FinanceReference</code> for <code>Finance</code>."] },
            { cells: ["5", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-balances",
      num: "05",
      method: "GET",
      path: "/accounts/{accountId}/balances",
      title: "List Balances",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the balances for the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Data completeness", "All balance types that exist for the account must be returned. All fields marked as required in the OpenAPI spec must be present on each record, including <code>accountId</code>, <code>balanceType</code>, <code>amount</code> (with <code>amount</code> and <code>currency</code>), <code>creditDebitIndicator</code>, and <code>timestamp</code>."] },
            { cells: ["3", "Multiple balance types", "Return one record per distinct balance type held for the account. More than one record per account is permitted and expected where multiple balance types exist. Include <code>creditLines</code> where applicable."] },
            { cells: ["4", "<code>InterimAvailable</code>", "For <code>CurrentAccount</code> and <code>Savings</code> accounts, a record with <code>balanceType: InterimAvailable</code> must always be included. This is the real-time available balance on the account."] },
            { cells: ["5", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-beneficiaries",
      num: "06",
      method: "GET",
      path: "/accounts/{accountId}/beneficiaries",
      title: "List Beneficiaries",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the beneficiaries linked to the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Required fields", "Every beneficiary record must include <code>accountId</code>, <code>beneficiaryId</code>, <code>beneficiaryType</code>, and <code>addedViaOF</code>."] },
            { cells: ["3", "Data completeness", "All fields that exist or are derivable must be populated, including <code>creditorAccount</code> (with <code>schemeName</code> and <code>identification</code>), <code>servicer</code>, and <code>reference</code> where held."] },
            { cells: ["4", "Empty result", "If the account holds no beneficiaries, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["5", "<code>AccountSubType</code>", "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts. Not available for <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code> accounts."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-direct-debits",
      num: "07",
      method: "GET",
      path: "/accounts/{accountId}/direct-debits",
      title: "List Direct Debits",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the direct debits linked to the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Required fields", "Every direct debit record must include <code>accountId</code>, <code>directDebitId</code>, <code>directDebitStatusCode</code>, <code>mandateIdentification</code>, <code>name</code>, and <code>frequency</code>."] },
            { cells: ["3", "Data completeness", "Include <code>previousPaymentDateTime</code> and <code>previousPaymentAmount</code> where available."] },
            { cells: ["4", "Empty result", "If the account holds no direct debits, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["5", "<code>AccountSubType</code>", "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts. Not available for <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code> accounts."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-scheduled-payments",
      num: "08",
      method: "GET",
      path: "/accounts/{accountId}/scheduled-payments",
      title: "List Scheduled Payments",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the scheduled payments linked to the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Required fields", "Every scheduled payment record must include <code>accountId</code>, <code>scheduledPaymentId</code>, <code>scheduledType</code>, <code>scheduledPaymentDateTime</code>, and <code>instructedAmount</code> (with <code>amount</code> and <code>currency</code>)."] },
            { cells: ["3", "Data completeness", "Include <code>creditorAccount</code> (with <code>schemeName</code> and <code>identification</code>), <code>creditorAgent</code>, <code>creditorReference</code>, and <code>debtorReference</code> where held."] },
            { cells: ["4", "Empty result", "If the account holds no scheduled payments, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["5", "<code>AccountSubType</code>", "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts. Not available for <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code> accounts."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-standing-orders",
      num: "09",
      method: "GET",
      path: "/accounts/{accountId}/standing-orders",
      title: "List Standing Orders",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the standing orders linked to the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Required fields", "Every standing order record must include <code>accountId</code>, <code>standingOrderId</code>, <code>frequency</code>, <code>firstPaymentDateTime</code>, <code>standingOrderStatusCode</code>, and <code>firstPaymentAmount</code> (with <code>amount</code> and <code>currency</code>)."] },
            { cells: ["3", "Data completeness", "Include <code>nextPaymentDateTime</code>, <code>nextPaymentAmount</code>, <code>lastPaymentDateTime</code>, <code>lastPaymentAmount</code>, <code>finalPaymentDateTime</code>, <code>finalPaymentAmount</code>, <code>numberOfPayments</code>, <code>creditorAccount</code>, <code>creditorAgent</code>, and <code>standingOrderType</code> where held."] },
            { cells: ["4", "Empty result", "If the account holds no standing orders, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["5", "<code>AccountSubType</code>", "Only supported for <code>CurrentAccount</code> and <code>Savings</code> accounts. Not available for <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code> accounts."] },
            { cells: ["6", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["7", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-statements",
      num: "10",
      method: "GET",
      path: "/accounts/{accountId}/statements",
      title: "List Statements",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the statements for the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "<code>fromStatementDate</code>", "If provided, return only statements with a statement date on or after this date. Filtering is open-ended (from the earliest available statement) if not provided."] },
            { cells: ["3", "<code>toStatementDate</code>", "If provided, return only statements with a statement date on or before this date. Filtering is open-ended (to the latest available statement) if not provided."] },
            { cells: ["4", "Required fields", "Every statement record must include <code>accountId</code>, <code>accountSubType</code>, <code>statementId</code>, <code>statementDate</code>, <code>openingDate</code>, <code>closingDate</code>, <code>openingBalance</code> (with <code>creditDebitIndicator</code>, <code>amount</code>, and <code>currency</code>), <code>closingBalance</code> (with <code>creditDebitIndicator</code>, <code>amount</code>, and <code>currency</code>), and <code>summary</code> (with <code>creditDebitIndicator</code>, <code>subTransactionType</code>, <code>amount</code>, and <code>count</code> per entry)."] },
            { cells: ["5", "Data completeness", "All fields that exist or are derivable for each statement must be returned, including <code>creditLine</code> where applicable."] },
            { cells: ["6", "Data retention", "The endpoint must support retrieval of at least the last two years of statements. This is a minimum availability floor, not a query limit — the endpoint MAY return statements older than two years where it holds them."] },
            { cells: ["7", "Range handling", "A request whose <code>fromStatementDate</code> or <code>toStatementDate</code> extends beyond two years into the past is well-formed and MUST NOT be rejected — return <code>200</code> with the matching subset (empty where none)."] },
            { cells: ["8", "Empty result", "If no statements exist within the requested range, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["9", "Invalid range", "The API Hub rejects malformed date-range requests before proxying — an unparseable date, a contradictory range (<code>fromStatementDate</code> after <code>toStatementDate</code>), or a <code>toStatementDate</code> in the future — returning <code>400</code> with <code>errorCode</code>: <code>Resource.InvalidFormat</code>. The endpoint therefore receives only well-formed ranges and does not re-validate them."] },
            { cells: ["10", "Pagination", "Pagination must be supported. <code>meta.paginated</code>, <code>meta.totalRecords</code>, and <code>meta.totalPages</code> must be accurate."] },
            { cells: ["11", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["12", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["13", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-transactions",
      num: "11",
      method: "GET",
      path: "/accounts/{accountId}/transactions",
      title: "List Transactions",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the transactions for the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "<code>fromBookingDateTime</code>", "If provided, return only transactions booked on or after this date-time. Filtering is open-ended if not provided."] },
            { cells: ["3", "<code>toBookingDateTime</code>", "If provided, return only transactions booked on or before this date-time. Filtering is open-ended if not provided."] },
            { cells: ["4", "Timezone", "Any timezone offset in <code>fromBookingDateTime</code> or <code>toBookingDateTime</code> must be ignored. Filter against local booking date-time only."] },
            { cells: ["5", "Required fields", "Every transaction record must include <code>accountId</code>, <code>transactionId</code>, <code>transactionDateTime</code>, <code>transactionType</code>, <code>subTransactionType</code>, <code>creditDebitIndicator</code>, <code>status</code>, <code>bookingDateTime</code>, and <code>amount</code> (with <code>amount</code> and <code>currency</code>)."] },
            { cells: ["6", "Data completeness", "All fields that exist or are derivable must be populated, including <code>balance</code> (with <code>creditDebitIndicator</code>, <code>balanceType</code>, and <code>amount</code>) where available, <code>merchantDetails</code>, <code>creditorAccount</code>, <code>debtorAccount</code>, <code>cardInstrument</code>, <code>currencyExchange</code>, <code>flags</code>, and <code>paymentPurposeCode</code> where held."] },
            { cells: ["7", "Transaction context", "<code>transactionInformation</code> and <code>transactionReference</code> must be provided where held to give the TPP meaningful context for the transaction."] },
            { cells: ["8", "Data retention", "The endpoint must support retrieval of at least the last two years of transactions. This is a minimum availability floor, not a query limit — the endpoint MAY return transactions older than two years where it holds them."] },
            { cells: ["9", "Range handling", "A request whose <code>fromBookingDateTime</code> or <code>toBookingDateTime</code> extends beyond two years into the past is well-formed and MUST NOT be rejected — return <code>200</code> with the matching subset (empty where none)."] },
            { cells: ["10", "Empty result", "If no transactions exist within the requested range, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["11", "Invalid range", "The API Hub rejects malformed date-range requests before proxying — an unparseable date-time, a contradictory range (<code>fromBookingDateTime</code> after <code>toBookingDateTime</code>), or a <code>toBookingDateTime</code> in the future — returning <code>400</code> with <code>errorCode</code>: <code>Resource.InvalidFormat</code>. The endpoint therefore receives only well-formed ranges and does not re-validate them."] },
            { cells: ["12", "Pagination", "Pagination must be supported. <code>meta.paginated</code>, <code>meta.totalRecords</code>, and <code>meta.totalPages</code> must be accurate."] },
            { cells: ["13", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["14", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["15", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-products",
      num: "12",
      method: "GET",
      path: "/accounts/{accountId}/products",
      title: "List Products",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the products associated with the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Data completeness", "All product data that exists or is derivable from your systems must be returned, including fees, charges, rates, rewards, benefits, and eligibility criteria where held. Every field other than <code>FinanceRates</code> is always returned in cleartext, regardless of which response shape is chosen for <code>FinanceRates</code> (see below)."] },
            { cells: ["3", "<code>FinanceRates</code> — permission gating", 'Only include the <code>FinanceRates</code> field on a <code>Product</code> record when the consent carries the <code>ReadProductFinanceRates</code> permission. If the permission is absent, omit the field entirely — do not substitute <code>null</code>, an empty object, or a placeholder JWE. See <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates#step-1-permission">Encrypted FinanceRates — Step 1</a> for the permission-check pattern.'] },
            { cells: ["4", "<code>FinanceRates</code> — response shape", "When <code>ReadProductFinanceRates</code> is present, the LFI MAY return <code>FinanceRates</code> as either a cleartext <code>AEProductFinanceRates</code> JSON object or as an <code>AEJwe</code> compact serialisation string. The choice is at the LFI's discretion, typically per product type (e.g. cleartext for deposit accounts, JWE for credit cards, finance accounts, and mortgages where the rate is commercially sensitive)."] },
            { cells: ["5", "<code>FinanceRates</code> — cleartext path", "If returning cleartext, serve the <code>AEProductFinanceRates</code> object alongside the rest of the <code>Product</code> record in the standard JSON response, exactly as every other field on this endpoint is served. No additional handling — no OTP, no encryption, no rate limits beyond the standard ones — applies."] },
            { cells: ["6", "<code>FinanceRates</code> — JWE path", 'If returning an encrypted JWE, the LFI MUST follow the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates">Encrypted FinanceRates</a> guide in full — generate a fresh one-time code per call, deliver it to the customer on a channel the LFI controls, encrypt the cleartext <code>AEProductFinanceRates</code> as a PBES2-HS512+A256KW / A256GCM JWE with the OTP as the password, embed a 30-minute <code>exp</code> in the plaintext, and enforce the per-(consent, account) rate limits (60-second interval, 12 fresh OTPs per rolling 24 hours) by rejecting breaches with <code>429 Too Many Requests</code> and a <code>Retry-After</code> header.'] },
            { cells: ["7", "Empty result", "If no product data exists for the account, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["8", "<code>AccountSubType</code>", "Supported for all account subtypes: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Finance</code>, and <code>Mortgage</code>."] },
            { cells: ["9", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["10", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "get-customer",
      num: "13",
      method: "GET",
      path: "/accounts/{accountId}/customer",
      title: "Get Customer",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>account</code>", "Return the customers associated with the account whose <code>id</code> matches the value in the <code>accountId</code> path parameter."] },
            { cells: ["2", "Multiple customers", "Return one record per customer associated with the account. Joint accounts must return a record for each joint holder."] },
            { cells: ["3", "Required fields", "Every customer record must include <code>id</code>, <code>claims</code> <code>verifiedClaims</code>, <code>customerType</code>, <code>customerCategory</code>, and <code>accountRole</code>."] },
            { cells: ["4", "Person claims", "For retail customers, <code>verifiedClaims[].claims</code> must include <code>identityType</code>, <code>fullName</code>, <code>givenName</code>, <code>familyName</code>, <code>emiratesId</code>, <code>emiratesIdExpiryDate</code>, and <code>residentialAddress</code>. Include all optional fields (<code>middleName</code>, <code>birthDate</code>, <code>mobileNumber</code>, <code>email</code>, <code>nationality</code>, etc.) where held."] },
            { cells: ["5", "Corporate claims", "For SME/Corporate customers, <code>verifiedClaims[].claims</code> must include <code>identityType</code>, <code>businessName</code>, and <code>tradeLicenceNumber</code>. Include all optional fields (<code>taxIdentificationNumber</code>, <code>dateOfIncorporation</code>, <code>countryOfIncorporation</code>, <code>corporateAddress</code>, etc.) where held."] },
            { cells: ["6", "Data completeness", "All fields that exist or are derivable from your systems must be populated on each customer record."] },
            { cells: ["7", "Empty result", "If no customer records are associated with the account, return <code>200</code> with an empty <code>data</code> array. Do not return <code>404</code>."] },
            { cells: ["8", "Account access", 'Validate that the account in the <code>accountId</code> path parameter is held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#account-access-validation">Account Access Validation</a> check before status handling — a non-held account MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code>.'] },
            { cells: ["9", "Account status", 'If the account is not <code>Active</code>, do not return the resource. Apply the <a href="#account-status-handling">Account Status Handling</a> mapping to return <code>403</code> with the corresponding <code>errorCode</code> and <code>errorMessage</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "get-customer",
      num: "14",
      method: "GET",
      path: "/customer",
      title: "Get Customer",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "Customer identification", "Identify the customer from the <code>o3-psu-identifier</code> header passed by the Hub."] },
            { cells: ["2", "Required fields", "The customer record must include <code>id</code>, <code>verifiedClaims</code>, and <code>customerCategory</code>."] },
            { cells: ["3", "Person claims", "For retail customers, <code>verifiedClaims[].claims</code> must include <code>identityType</code>, <code>fullName</code>, <code>givenName</code>, <code>familyName</code>, <code>emiratesId</code>, <code>emiratesIdExpiryDate</code>, and <code>residentialAddress</code>. Include all optional fields where held."] },
            { cells: ["4", "Corporate claims", "For SME/Corporate customers, <code>verifiedClaims[].claims</code> must include <code>identityType</code>, <code>businessName</code>, and <code>tradeLicenceNumber</code>. Include all optional fields where held."] },
            { cells: ["5", "Data completeness", "All fields that exist or are derivable from your systems must be populated."] }
          ]
        } }
      ]
    },
    {
      id: "account-access-validation",
      num: "15",
      title: "Account Access Validation",
      blocks: [
        { kind: "prose", html: "Every endpoint that takes an account identifier — whether as the <code>accountId</code> path parameter under <code>/accounts/{accountId}</code> and <code>/accounts/{accountId}/&hellip;</code>, or as values in the <code>accountIds</code> query parameter on <code>GET /accounts</code> — MUST validate that each account is held by the customer resolved from the <code>o3-psu-identifier</code> header before applying the per-endpoint rules above. Account ownership is authoritative on the LFI side — the Hub stores the <code>accountIds</code> patched onto the consent at authorization, but the LFI is the source of truth for which accounts the customer actually holds. If the patched set ever drifted from the customer's actual holdings, only the LFI can detect it." },
        { kind: "prose", html: 'If any requested account is not held by the resolved customer, return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code> Apply this check before the <a href="#account-status-handling">Account Status Handling</a> mapping — a non-held account MUST NOT leak status information.' },
        { kind: "prose", html: "<code>GET /customer</code> is exempt — it is resolved from <code>o3-psu-identifier</code> and not scoped to a specific account." }
      ]
    },
    {
      id: "account-status-handling",
      num: "16",
      title: "Account Status Handling",
      blocks: [
        { kind: "prose", html: 'The rules above assume the account is in a readable state. The table below summarises how each value of <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts#aeaccountstatuscode"><code>AEAccountStatusCode</code></a> maps to a response for endpoints under <code>/accounts/{accountId}</code>.' },
        { kind: "table", table: {
          headers: ["Status", "Readable", "Response if not readable"],
          rows: [
            { cells: ["<code>Active</code>", "✅", "—"] },
            { cells: ["<code>Inactive</code>", "✅", "—"] },
            { cells: ["<code>Dormant</code>", "✅", "—"] },
            { cells: ["<code>Suspended</code>", "❌", "<code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is temporarily blocked.</code>"] },
            { cells: ["<code>Unclaimed</code>", "❌", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] },
            { cells: ["<code>Deceased</code>", "❌", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] },
            { cells: ["<code>Closed</code>", "❌", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] }
          ]
        } },
        { kind: "prose", html: "<code>GET /accounts</code> is exempt from this mapping — it returns all consented accounts regardless of status, with the <code>Status</code> field populated so the TPP can see the current state." }
      ]
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-89df112f><section class="ed-req-hero" data-v-89df112f><div class="ed-req-hero__inner" data-v-89df112f><div class="ed-req-hero__label" data-v-89df112f><span class="ed-req-hero__label-dash" data-v-89df112f></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-89df112f>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-89df112f>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-89df112f>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-89df112f>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-89df112f>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-89df112f${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-89df112f${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-89df112f${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-89df112f${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-89df112f${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-89df112f${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-89df112f${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-89df112f${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-89df112f${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-89df112f${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-89df112f${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-89df112f${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-89df112f${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-89df112f${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-89df112f${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-89df112f${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-89df112f${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-89df112f${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-89df112f${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-89df112f${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-89df112f${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-89df112f${_scopeId}><span class="ed-req-validator__label" data-v-89df112f${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-89df112f${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-89df112f${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-89df112f${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-89df112f${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-89df112f${_scopeId}><h3 class="ed-req-sub__heading" data-v-89df112f${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-89df112f${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-89df112f${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-89df112f${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-89df112f${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-89df112f${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-89df112f${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-89df112f${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-89df112f${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-89df112f${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-89df112f${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-89df112f${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-89df112f${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-89df112f${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-89df112f${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-89df112f${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-89df112f${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-89df112f${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-89df112f"]]);
export {
  requirements as default
};
