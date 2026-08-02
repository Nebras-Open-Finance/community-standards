import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Insurance Data Sharing — Requirements',
  version: 'v2.2-draft',
  readTime: '10 min',
  lede: 'The <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: 'The tables below list the rules that apply to Insurance Data Sharing. All request validation of the TPP\'s credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoints are called. The rules below cover what your Ozone Connect endpoints must validate and what they must return. The cross-cutting <a href="#policy-access-validation">Policy Access Validation</a> check applies to <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code>. <strong>Insurance has a five-year data retention floor</strong> — your Ozone Connect endpoints MUST return policies from the last five years regardless of current <code>PolicyStatus</code>; there is no status-based <code>403</code>.',
  sections: [
    {
      id: 'consent-validation',
      num: '01',
      title: 'Consent Validation',
      blocks: [
        { kind: 'prose', html: 'When a TPP creates an insurance consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-draft/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil. The field names in the rules below match the Ozone Connect <code>newConsent</code> payload the Hub delivers — <code>consentType</code> is <code>cbuae-insurance-consents</code>, <code>standardVersion</code> sits at the top level of the consent object, and <code>Permissions</code> sits under <code>consentBody.Data</code> as an array of <code>{ InsuranceType, Permissions[] }</code> blocks.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Unsupported <code>standardVersion</code>', 'The consent\'s <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent insurance requests. If you do not support that version for the Insurance API family, respond with <code>invalid</code>. <br><br> Where you are dual-running multiple versions during a deprecation window (see <a href="/policy/lfi-deprecation">Major Version Deprecation</a>) — for example <code>v2.0</code> alongside <code>v3.1</code> — you MUST respond <code>valid</code> for every version you serve. <br><br> Minor versions are backward compatible (see <a href="/policy/version-management">Version Management</a>), so prior minors within each major you run are also valid (e.g. running <code>v2.0</code> and <code>v3.1</code> means <code>v2.0</code>, <code>v3.0</code>, and <code>v3.1</code> all resolve to <code>valid</code>).'] },
            { cells: ['2', 'Unsupported <code>InsuranceType</code>', 'If any per-sector block in <code>consent.Permissions</code> references an <code>InsuranceType</code> the LFI does not underwrite (e.g. the LFI does not offer <code>Renters</code> products but the consent requests <code>Renters</code>), respond with <code>invalid</code>. Validate against the sectors you have onboarded with Nebras.'] },
            { cells: ['3', 'Unsupported permissions', 'If a per-sector block requests a permission the LFI does not surface for that sector (e.g. the consent includes <code>ReadCustomerClaims</code> for <code>Motor</code> but the LFI does not yet expose claims for Motor policies), respond with <code>invalid</code>.'] },
            { cells: ['4', '<code>ReadInsurancePolicies</code> required per sector', 'Every per-sector block MUST contain <code>ReadInsurancePolicies</code> — it is the base permission that gates list and detail access. If a block omits it, respond with <code>invalid</code>.'] },
            { cells: ['5', 'Invalid <code>BaseConsentId</code>', 'If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI.</li><li>The referenced consent is an Insurance Data Sharing consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:insurance-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>.'] },
          ],
        } },
      ],
    },
    {
      id: 'authorization-policy-selection',
      num: '02',
      title: 'Authorization — Policy Selection',
      blocks: [
        { kind: 'prose', html: 'The generic <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey. The rules below cover the additional policy selection logic specific to Insurance Data Sharing. During the consent authorization journey, the customer selects which of their policies to share with the TPP, scoped to the sectors the consent grants.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', '<code>consent.Permissions[*].InsuranceType</code>', 'Only present policies of sectors listed in <code>consent.Permissions</code>. A consent that grants <code>Motor</code> and <code>Home</code> only surfaces policies in those two sectors — Travel and Health policies the customer may also hold MUST NOT appear.'] },
            { cells: ['2', 'Five-year selection window', 'Within each consented sector, present every policy the customer holds or has held in the last <strong>five years</strong>, regardless of current <code>PolicyStatus</code>. Historical policies (<code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>Surrendered</code>, etc.) MUST be selectable so the customer can share historical insurance history for switching, broking, and advisory use cases. Each row MUST clearly label the policy\'s current <code>PolicyStatus</code> so the customer is not misled into thinking a lapsed policy is still active.'] },
            { cells: ['3', 'No eligible policies', 'If the authenticated customer does not hold any policies within the five-year window across any of the consented sectors, PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_policies</code>. See <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a> for details.'] },
            { cells: ['4', 'Multiple selection', 'The policy selection screen must allow the customer to select more than one policy and to select policies across different sectors in a single consent. A consent with no policies selected must not be authorised.'] },
            { cells: ['5', '<code>insurancePolicyIds</code> patch', 'On successful authorization, PATCH the consent with <code>insurancePolicyIds</code> set to the array of <code>InsurancePolicyId</code> values the customer selected. This array is the authoritative consented set used by every subsequent data sharing request — see <a href="#policy-access-validation">Policy Access Validation</a>.'] },
          ],
        } },
      ],
    },
    {
      id: 'list-policies',
      num: '03',
      method: 'GET',
      path: '/{type}-insurance-policies',
      title: 'List Policies (per sector)',
      blocks: [
        { kind: 'prose', html: 'The Hub calls this endpoint with the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>) baked into the path and passes <code>InsurancePolicyIds</code> as a query parameter listing the IDs the consent authorised for that sector.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', '<code>InsurancePolicyIds</code>', 'Return the policies whose <code>InsurancePolicyId</code> matches one of the values in the <code>InsurancePolicyIds</code> query parameter and whose sector matches the URL path. Populate the <code>PolicyStatus</code> field on each policy so the TPP can see the current state.'] },
            { cells: ['2', 'Five-year retention', 'Return every consented policy from the last <strong>five years</strong> regardless of current <code>PolicyStatus</code>. This is a minimum availability floor, not a query limit — the endpoint MAY return policies older than five years where it holds them. A <code>PolicyStatus</code> of <code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>Surrendered</code>, etc. MUST NOT cause the policy to be omitted from the response within the retention window.'] },
            { cells: ['3', 'Data completeness', 'All fields that exist or are derivable from your systems must be populated on each policy. All fields marked as required in the OpenAPI spec must be present, including <code>InsurancePolicyId</code>, <code>PolicyNumber</code>, <code>PolicyStatus</code>, <code>Insurer</code>, and the sector-specific identifiers.'] },
            { cells: ['4', '<code>Premium</code>', 'If the consent for this sector includes <code>ReadInsurancePremium</code>, populate the <code>Premium</code> field on each policy in either the cleartext or JWE shape per <a href="#premium-encryption">Premium Encryption</a>. If the consent does not include <code>ReadInsurancePremium</code>, omit the <code>Premium</code> field entirely — do not return an empty object or a placeholder.'] },
            { cells: ['5', 'Permission-scoped fields', 'Populate optional field sets only when the matching permission is granted in the per-sector block: <code>ReadCustomerBasic</code> / <code>ReadCustomerDetail</code> for policy-holder identity; <code>ReadCustomerPaymentDetails</code> for payment methods; <code>ReadInsuranceProduct</code> for underwritten product detail; <code>ReadCustomerClaims</code> for claims history. Fields the consent does not unlock MUST be omitted.'] },
            { cells: ['6', 'No pagination', 'Return every matching policy in a single response. There is no <code>page</code> query parameter on the TPP-facing API, and <code>Meta</code> MUST NOT include <code>TotalPages</code> or <code>TotalRecords</code>. The full consented set for the sector MUST fit in one payload.'] },
            { cells: ['7', 'Empty result', 'If the customer holds no policies in the sector within the five-year window, return <code>200</code> with an empty <code>Policy</code> array. Do not return <code>404</code>.'] },
            { cells: ['8', 'Policy access', 'For every <code>InsurancePolicyId</code> in the <code>InsurancePolicyIds</code> query parameter, validate that the policy is held — or was held within the five-year window — by the customer resolved from <code>o3-psu-identifier</code>. If any requested policy is not held by the customer, return <code>403</code> per <a href="#policy-access-validation">Policy Access Validation</a>.'] },
          ],
        } },
      ],
    },
    {
      id: 'get-policy',
      num: '04',
      method: 'GET',
      path: '/{type}-insurance-policies/{InsurancePolicyId}',
      title: 'Get a Policy',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', '<code>policy</code>', 'Return the single policy whose <code>InsurancePolicyId</code> matches the value in the path parameter and whose sector matches the URL path.'] },
            { cells: ['2', 'Five-year retention', 'Return the policy regardless of current <code>PolicyStatus</code>, provided its end date (or last activity date) is within the last <strong>five years</strong>. There is no status-based <code>403</code> on this endpoint — the policy is the artifact, and the customer has consented to share it.'] },
            { cells: ['3', 'Data completeness', 'All fields that exist or are derivable from your systems must be populated, consistent with what is returned by the list endpoint for the same policy. All fields marked as required in the OpenAPI spec must be present.'] },
            { cells: ['4', '<code>Premium</code>', 'If the consent includes <code>ReadInsurancePremium</code>, populate <code>Premium</code> in either the cleartext or JWE shape per <a href="#premium-encryption">Premium Encryption</a>. Otherwise omit the field.'] },
            { cells: ['5', 'Permission-scoped fields', 'Populate optional field sets only when the matching permission is granted in the per-sector block. Fields the consent does not unlock MUST be omitted from the detail response, the same way as on the list response.'] },
            { cells: ['6', 'Policy access', 'Validate that the <code>InsurancePolicyId</code> in the path parameter is part of the consented set held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#policy-access-validation">Policy Access Validation</a> check before returning — an ID outside the consented set MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code>.'] },
          ],
        } },
      ],
    },
    {
      id: 'premium-encryption',
      num: '05',
      title: 'Premium Encryption',
      blocks: [
        { kind: 'prose', html: 'The <code>Premium</code> field on every insurance policy response is defined as <code>anyOf</code> a structured <code>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> object or an <code>AEInsurance.AEInsurancePremiumJWE</code> compact string. Your LFI decides, per policy, which shape to return. The rules below cover both shapes. See the <a href="/tech/lfi-api-hub/v2.2-draft/insurance/data-sharing/api-guide/premiums">producer-side walkthrough</a> for end-to-end detail.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', 'Permission gating', 'Only populate <code>Premium</code> when the per-sector block in <code>consent.Permissions</code> includes <code>ReadInsurancePremium</code>. If the permission is absent, omit the field entirely.'] },
            { cells: ['2', '<code>Premium</code> format', '<code>Premium</code> may be returned as either a cleartext <code>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> JSON object or as a JWE compact serialisation string. Encryption is at the LFI\'s discretion per policy.'] },
            { cells: ['3', '<code>Premium</code> — JWE', 'If encrypting <code>Premium</code>, generate an ephemeral symmetric encryption key per response (must not be reused). Encrypt the structured premium payload as a JWE using the content encryption algorithm required by the Security Profile. Set <code>exp</code> to 30 minutes from the time of the response and set <code>kid</code> to the value of <code>x-fapi-interaction-id</code>. Transmit the encryption key to the User via an existing LFI channel (e.g. SMS or push notification) — do not include it in the API response.'] },
            { cells: ['4', 'Shape exclusivity', 'A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE.'] },
          ],
        } },
      ],
    },
    {
      id: 'policy-access-validation',
      num: '06',
      title: 'Policy Access Validation',
      blocks: [
        { kind: 'prose', html: 'Every endpoint that takes a policy identifier — whether as the <code>InsurancePolicyId</code> path parameter on <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code> or as values in the <code>InsurancePolicyIds</code> query parameter on <code>GET /{type}-insurance-policies</code> — MUST validate that each policy is part of the consented set held by the customer resolved from the <code>o3-psu-identifier</code> header before applying the per-endpoint rules above. Policy ownership is authoritative on the LFI side — the Hub stores the <code>insurancePolicyIds</code> patched onto the consent at authorization, but the LFI is the source of truth for which policies the customer actually holds or has held.' },
        { kind: 'prose', html: 'If any requested policy is not part of the consented set, return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code> and <code>errorMessage</code>: <code>The policy is permanently inaccessible.</code> This check applies uniformly regardless of <code>PolicyStatus</code> — a policy that is <code>Lapsed</code> or <code>Expired</code> is still readable provided it is in the consented set; a policy that is <code>Active</code> but outside the consented set MUST NOT be returned.' },
      ],
    },
  ],
}
