import type { RequirementsPageData } from './types'

export const data: RequirementsPageData = {
  title: 'Insurance Data Sharing — Requirements',
  version: 'v2.1',
  readTime: '10 min',
  lede:
    'The validation rules that apply to Insurance Data Sharing. The <strong>Validated by</strong> column on each table indicates where each rule is enforced. Read alongside the <a href="/tech/tpp-standards/v2.1/consent/requirements">Consent requirements</a> and the <a href="./user-journeys">User Journeys</a>.',
  preconditions:
    'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>ISP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing, and — when requesting <code>ReadInsurancePremium</code> — an active <a href="/tech/tpp-standards/trust-framework/certificates">encryption key</a> for decrypting the <code>Premium</code> JWE on the customer device.',
  sections: [
    {
      id: 'post-par',
      num: '01',
      method: 'POST',
      path: '/par',
      title: 'Consent Creation',
      intro:
        'The consent is submitted inside a signed <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> sent to the Authorization Server. The <code>consent.*</code> fields referenced below are nested as <code>authorization_details[0].consent</code> within that JWT. The POST body must also include a <a href="/tech/tpp-standards/security/tokens/client-assertion">client assertion</a> to authenticate the TPP application.',
      rules: [
        { field: 'Request JWT', rule: 'Must conform to the <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT requirements</a> — correct <code>aud</code>, signing algorithm (<code>PS256</code>), and expiry window.', validatedBy: 'API Hub' },
        { field: '<code>client_assertion</code>', rule: 'Must be included in the POST body (<code>client_assertion_type</code>: <code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>). Authenticates the TPP application — see <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a>.', validatedBy: 'API Hub' },
        { field: '<code>scope</code> (in Request JWT)', rule: 'Must be <code>openid insurance</code>.', validatedBy: 'API Hub' },
        { field: '<code>authorization_details[0].type</code> (in Request JWT)', rule: 'Must be <code>urn:openfinanceuae:insurance-consent:v2.1</code>.', validatedBy: 'API Hub' },
        { field: 'API version supported', rule: 'The consent version in <code>authorization_details[0].type</code> (e.g. <code>urn:openfinanceuae:insurance-consent:v2.1</code>) restricts the version of the Insurance endpoints the consent can be used to call (specified in the path, e.g. <code>/open-finance/insurance/v2.1/motor-insurance-policies</code>). It MUST resolve to an <code>ApiVersion</code> the LFI has published in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a> for the Insurance API family.', validatedBy: 'LFI (/consent/action/validate)' },
        { field: 'OpenAPI schema', rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/consent/open-api/par">POST <code>/par</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions</code> structure', rule: 'Must be a non-empty array. Each entry is a per-sector block of the form <code>{ InsuranceType, Permissions[] }</code>. There MUST be at least one block, and each block MUST contain at least one permission code.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions[*].InsuranceType</code>', rule: 'Each value must be one of: <code>Employment</code>, <code>Health</code>, <code>Home</code>, <code>Life</code>, <code>Motor</code>, <code>Renters</code>, <code>Travel</code>. Each sector may appear at most once in the array. The sector must also be one the LFI underwrites — if the LFI does not offer the requested sector, the validate hook will reject the consent.', validatedBy: 'LFI (/consent/action/validate)' },
        { field: '<code>consent.Permissions[*].Permissions</code>', rule: 'Within each per-sector block, <code>ReadInsurancePolicies</code> MUST be present — it is the base permission that gates list and detail access for the sector. Other permissions (<code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, <code>ReadCustomerPaymentDetails</code>, <code>ReadInsuranceProduct</code>, <code>ReadCustomerClaims</code>, <code>ReadInsurancePremium</code>) MAY be included and unlock the corresponding field sets on the policy response.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions[*].Permissions</code> — <code>ReadInsurancePremium</code>', rule: '<code>ReadInsurancePremium</code> MUST only be requested by TPPs that hold the <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">Access Encrypted Resource Data</a> optional certification with Nebras. An uncertified TPP MUST NOT include this permission in any per-sector block; if it does, the API Hub rejects the consent. Only certified TPPs are permitted to receive insurance premium data, whether the LFI returns it in cleartext or as an encrypted JWE.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions</code> (unsupported)', rule: 'If a per-sector block requests a permission the LFI does not expose for that sector (e.g. <code>ReadCustomerClaims</code> for a sector the LFI does not surface claims on), the consent validation will fail.', validatedBy: 'LFI (/consent/action/validate)' },
        { field: '<code>consent.BaseConsentId</code>', rule: 'If provided, must reference a previous consent belonging to the <strong>same end user</strong> and must be an Insurance Data Sharing consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:insurance-consent:*</code>). If the original consent in the chain already had a <code>BaseConsentId</code>, the TPP must reuse that same <code>BaseConsentId</code> rather than the immediate prior <code>ConsentId</code>.', validatedBy: 'LFI (/consent/action/validate)' },
        { field: '<code>consent.ExpirationDateTime</code>', rule: 'Must not be in the past. Must be less than one year in the future.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
    {
      id: 'authorization',
      num: '02',
      title: 'Authorization — Policy Selection',
      intro:
        'The LFI presents the policies the PSU can share against the consent. Policies are selectable up to <strong>five years</strong> back regardless of current <code>PolicyStatus</code> — see <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements">LFI Insurance Data Sharing Requirements</a> for the producer-side rule. TPPs should expect historical policies (Lapsed, Expired, Cancelled, etc.) in the consented set and render them with their <code>PolicyStatus</code>.',
      rules: [
        { field: 'Eligible policies', rule: 'If the authenticated PSU does not hold any policies in any of the consented <code>InsuranceType</code> sectors, the consent will be set to <code>Rejected</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_policies</code>.', validatedBy: 'LFI' },
        { field: 'Selection breadth', rule: 'The selection screen must allow the customer to choose any subset of policies surfaced. A consent with no policies selected must not be authorised.', validatedBy: 'LFI' },
      ],
    },
    {
      id: 'get-policies',
      num: '03',
      method: 'GET',
      path: '/{type}-insurance-policies',
      title: 'List Policies',
      intro:
        'Substitute <code>{type}</code> with one of the seven sector slugs: <code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, <code>travel</code>. Call once per sector the consent grants. The response returns every consented policy in the sector — there is no pagination.',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token issued with the <code>openid insurance</code> scope. The consent bound to the token must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.', validatedBy: 'API Hub' },
        { field: 'URL version', rule: 'The version in the request URL path (e.g. <code>v2.1</code> in <code>/open-finance/insurance/v2.1/motor-insurance-policies</code>) must match the version in the consent’s <code>authorization_details[0].type</code> (<code>urn:openfinanceuae:insurance-consent:v2.1</code>).', validatedBy: 'API Hub' },
        { field: '<code>{type}</code> path segment', rule: 'Must match an <code>InsuranceType</code> present in <code>consent.Permissions</code>. A call to a sector the consent does not grant returns <code>403</code>.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions</code>', rule: 'The per-sector block for the requested <code>InsuranceType</code> must include <code>ReadInsurancePolicies</code>.', validatedBy: 'API Hub' },
        { field: 'Pagination', rule: 'Not applicable. The endpoint returns the full set of consented policies for the sector in a single response — there is no <code>page</code> query parameter, and <code>Meta</code> does not include <code>TotalPages</code> or <code>TotalRecords</code>.', validatedBy: 'N/A' },
        { field: 'Historical policies', rule: 'The response includes every policy the customer authorised within the last <strong>five years</strong>, regardless of current <code>PolicyStatus</code>. TPPs MUST be prepared to receive policies in any of the <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies">AEInsurancePolicyStatusCodes</a> states (<code>New</code>, <code>Renewed</code>, <code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>PaidUp</code>, <code>Converted</code>, <code>Surrendered</code>, <code>DeathClaim</code>, <code>RiderClaim</code>) and render them with their current status.', validatedBy: 'LFI' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
        { field: '<code>x-fapi-auth-date</code>', rule: 'Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. <code>Tue, 11 Sep 2012 19:43:31 UTC</code>.', validatedBy: 'TPP' },
        { field: '<code>x-fapi-customer-ip-address</code>', rule: 'Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address.', validatedBy: 'TPP' },
        { field: '<code>x-customer-user-agent</code>', rule: 'Should be sent when the customer is actively present. Should reflect the user-agent of the customer’s browser or device.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'get-policy',
      num: '04',
      method: 'GET',
      path: '/{type}-insurance-policies/{InsurancePolicyId}',
      title: 'Get a Policy',
      intro:
        'Fetch the detailed view of a single policy. The <code>InsurancePolicyId</code> must be one returned by the corresponding list endpoint under the same consent. The policy is returned regardless of current <code>PolicyStatus</code> within the five-year retention window.',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token bound to an <code>Authorized</code> consent that has not expired.', validatedBy: 'API Hub' },
        { field: 'URL version', rule: 'The version in the request URL path must match the version in the consent’s <code>authorization_details[0].type</code>.', validatedBy: 'API Hub' },
        { field: '<code>{type}</code> path segment', rule: 'Must match an <code>InsuranceType</code> present in <code>consent.Permissions</code>.', validatedBy: 'API Hub' },
        { field: '<code>consent.Permissions</code>', rule: 'The per-sector block for the requested <code>InsuranceType</code> must include <code>ReadInsurancePolicies</code>. The field sets returned on the policy depend on the additional permissions in the block (<code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, <code>ReadCustomerPaymentDetails</code>, <code>ReadInsuranceProduct</code>, <code>ReadCustomerClaims</code>, <code>ReadInsurancePremium</code>).', validatedBy: 'API Hub' },
        { field: '<code>InsurancePolicyId</code>', rule: 'Must be a valid policy ID shared by the customer — i.e. returned by <code>GET /{type}-insurance-policies</code> under the same consent. See <a href="#policy-access">Policy Access Validation</a> for the response when the policy is not part of the consented set.', validatedBy: 'LFI' },
        { field: 'Historical policies', rule: 'The endpoint returns the policy regardless of current <code>PolicyStatus</code> within the five-year window — there is no status-based <code>403</code>. TPPs MUST render the policy according to its <code>PolicyStatus</code> rather than assume it is active.', validatedBy: 'LFI' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be a valid UUID (RFC 4122).', validatedBy: 'N/A' },
        { field: '<code>x-fapi-auth-date</code>', rule: 'Must be sent when the customer is authenticated at the time of the call.', validatedBy: 'TPP' },
        { field: '<code>x-fapi-customer-ip-address</code>', rule: 'Must be sent when the customer is actively present at the time of the call.', validatedBy: 'TPP' },
        { field: '<code>x-customer-user-agent</code>', rule: 'Should be sent when the customer is actively present.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'premium',
      num: '05',
      title: 'Premium Handling',
      intro:
        'When the consent includes <code>ReadInsurancePremium</code> for a sector, the <code>Premium</code> field on the policy response is returned as <code>anyOf</code> a structured object or a compact JWE string. The LFI chooses, per policy, which shape to return. A TPP that requests <code>ReadInsurancePremium</code> MUST be ready for either shape on every call and MUST follow the rules below when handling a JWE. See <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a> for the end-to-end walkthrough.',
      rules: [
        { field: '<code>Premium</code> — key request', rule: 'If <code>Premium</code> is returned as a JWE, the TPP must prompt the User to enter the encryption key delivered to them by the LFI (e.g. via SMS or push notification) before decryption can proceed.', validatedBy: 'TPP' },
        { field: '<code>Premium</code> — local decryption', rule: 'Decryption of the JWE must be performed locally on the User’s device. The decrypted data must not be transmitted to the TPP’s servers or persisted in any storage accessible to the TPP’s application.', validatedBy: 'TPP' },
        { field: '<code>Premium</code> — data usage', rule: 'The decrypted data must only be used to display the premium to the User within the active session. The TPP must not store, transmit, or otherwise process the unencrypted data.', validatedBy: 'TPP' },
        { field: '<code>Premium</code> — expiry', rule: 'The TPP must observe the <code>exp</code> value in the JWE header and discard any decrypted data once the expiry threshold has passed. If the data is still required, the TPP must repeat the API operation to retrieve a fresh response — the original consent must still be valid for this to succeed.', validatedBy: 'TPP' },
        { field: '<code>Premium</code> — session discard', rule: 'The TPP must discard all decrypted data from memory when the User closes their session, regardless of whether <code>exp</code> has been reached.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'policy-access',
      num: '06',
      title: 'Policy Access Validation',
      intro:
        'Before returning data on <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code>, the LFI verifies that the policy is part of the set the customer authorised at consent time. If the TPP supplies an <code>InsurancePolicyId</code> that was not returned by <code>GET /{type}-insurance-policies</code> under the same consent, the LFI returns <code>403</code> per the table below. The TPP MUST handle this response and surface a suitable message to the User.',
      table: {
        headers: ['Scenario', 'Response'],
        rows: [
          { cells: ['<code>InsurancePolicyId</code> is not part of the consented set for the sector', '<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code> and <code>errorMessage</code>: <code>The policy is permanently inaccessible.</code>'] },
        ],
      },
      aside: '<code>GET /{type}-insurance-policies</code> is exempt — it is not scoped to a specific policy in the URL and naturally returns only the consented set. TPPs SHOULD only call <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code> with <code>InsurancePolicyId</code> values returned by the list endpoint under the same consent.',
    },
  ],
}
