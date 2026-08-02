import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Single Instant Payment — Requirements',
  version: 'v2.2-draft',
  readTime: '9 min',
  lede: 'The <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: 'The tables below list the rules that apply to Single Instant Payment. All request validation of the TPP\'s credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoint is called. The rules below cover what your Ozone Connect endpoint must validate and what it must return.',
  sections: [
    {
      id: 'consent-validation',
      num: '01',
      title: 'Consent Validation',
      blocks: [
        { kind: 'prose', html: 'When a TPP creates a consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-draft/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Unsupported <code>standardVersion</code>', 'The consent\'s <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent payment initiation requests. If you do not support that version for the Payment Initiation API family, respond with <code>invalid</code>. <br><br> Where you are dual-running multiple versions during a deprecation window (see <a href="/policy/lfi-deprecation">Major Version Deprecation</a>) — for example <code>v2.0</code> alongside <code>v3.1</code> — you MUST respond <code>valid</code> for every version you serve. <br><br> Minor versions are backward compatible (see <a href="/policy/version-management">Version Management</a>), so prior minors within each major you run are also valid (e.g. running <code>v2.0</code> and <code>v3.1</code> means <code>v2.0</code>, <code>v3.0</code>, and <code>v3.1</code> all resolve to <code>valid</code>).'] },
            { cells: ['2', '<code>consent.PersonalIdentifiableInformation</code>', 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/personal-identifiable-information/api-schema/pii-par">Domestic Payment PII Schema Object (<code>POST /par</code>)</a>. Respond with <code>invalid</code> if decryption fails, if any required property is missing or of the wrong type, or if the payload contains additional or undocumented properties (<code>additionalProperties: false</code>).'] },
            { cells: ['3', '<code>Initiation.DebtorAccount</code>', 'If provided, validate that the account is a UAE IBAN held at this LFI, reachable through this API Hub integration, and in a state that permits payment initiation (not blocked, dormant, or closed). If any check fails, respond with <code>invalid</code>.'] },
            { cells: ['4', '<code>Initiation.Creditor</code>', '<code>Initiation.Creditor</code> must contain exactly one creditor entry. Validate that the creditor is a valid UAE domestic creditor — the account is reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the state of the receiving account can be determined, able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply — see <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>. If any check fails, respond with <code>invalid</code>.'] },
            { cells: ['5', 'Payment type not supported', 'Single Instant Payment must be advertised as supported via <code>ApiMetadata.SingleInstantPayment.Supported</code> on your authorisation server entry in the Trust Framework. If the LFI has not advertised support for this payment type, respond with <code>invalid</code>.'] },
            { cells: ['6', 'Invalid <code>BaseConsentId</code>', 'If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI and belonging to the same end user.</li><li>The referenced consent is a Service Initiation consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:service-initiation-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>.'] },
            { cells: ['7', '<code>consent.CurrencyRequest</code>', 'Must not be present. Domestic payments are denominated in AED only; <code>CurrencyRequest</code> is for non-local currency and international transfers. If present, respond with <code>invalid</code>.'] },
          ],
        } },
      ],
    },
    {
      id: 'authorization-account-selection',
      num: '02',
      title: 'Authorization — Account Selection',
      blocks: [
        { kind: 'prose', html: 'The generic <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey. The rules below cover the additional account selection logic specific to Single Instant Payment. During the consent authorization journey, the customer selects the account to be debited for the payment. The LFI is responsible for presenting only accounts eligible to initiate the payment and applying any constraints the TPP has specified in the consent.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', '<code>Initiation.DebtorAccount</code>', 'If <code>Initiation.DebtorAccount</code> was provided on the consent, only that account may be used — do not present an account selection screen. If the authenticated customer does not hold the specified account, PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_does_not_own_debtor_account</code>.'] },
            { cells: ['2', '<code>consent.IsSingleAuthorization</code>', 'If <code>true</code>, only accounts the authenticated customer can solely authorize (no subsequent approvers required) may be offered and selected. If <code>false</code> or not provided (default), accounts where the customer is one of multiple required authorizers may also be offered; subsequent authorizers must then approve the consent before it reaches <code>Authorized</code> status and the payment can be executed. See <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/multi-authorization">Multi-Authorization</a>.'] },
            { cells: ['3', 'No eligible accounts', 'If the authenticated customer does not hold any account eligible to initiate a payment under this consent (including the <code>IsSingleAuthorization</code> constraint above), PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>. See <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/requirements">Authorization requirements</a> for details.'] },
            { cells: ['4', 'Single selection', 'The account selection screen must allow the customer to select exactly one account to be debited. A consent with no account selected must not be authorised.'] },
          ],
        } },
      ],
    },
    {
      id: 'payment-execution',
      num: '03',
      method: 'POST',
      path: '/payments',
      title: 'Payment Execution',
      blocks: [
        { kind: 'prose', html: 'When the TPP initiates a payment under an authorized consent, the API Hub validates the access token, consent status, amount/currency consistency with the consent, and OpenAPI schema before forwarding the request to your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/open-api/payments"><code>POST /payments</code></a> endpoint. The rules below cover what your Ozone Connect endpoint must validate on receipt. Error responses MUST conform to the <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a> — the <code>errorCode</code> values referenced below are drawn from the <code>Error400</code> enum.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', '<code>PersonalIdentifiableInformation</code>', 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments">Domestic Payment PII Schema Object (<code>POST /payments</code>)</a>. Note that <code>DebtorAccount</code> is not part of the payment-time PII (the debtor is fixed by the consent) and <code>Initiation.Creditor</code> is a single object rather than an array. Reject with HTTP <code>400</code> and:<ul><li><code>errorCode</code>: <code>JWE.DecryptionError</code> — if decryption of the PII payload fails.</li><li><code>errorCode</code>: <code>Body.InvalidFormat</code> — if any required property is missing, of the wrong type, or the payload contains additional or undocumented properties (<code>additionalProperties: false</code>).</li></ul>'] },
            { cells: ['2', '<code>PersonalIdentifiableInformation</code> (Creditor)', '<code>Initiation.Creditor[]</code> had exactly 1 entry at consent time. The submitted creditor on the payment request must exactly match that consent-time entry — see <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>. If it does not match, reject with HTTP <code>400</code> <code>errorCode</code>: <code>Consent.FailsControlParameters</code>.'] },
            { cells: ['3', '<code>x-fapi-customer-ip-address</code>', 'Must be present on the request as the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. If missing or malformed, reject with HTTP <code>400</code> <code>errorCode</code>: <code>Body.InvalidFormat</code>.'] },
            { cells: ['4', 'Sufficient funds', 'The debtor account must have sufficient available funds to cover <code>Initiation.InstructedAmount</code> at the time the payment is received, taking into account any holds, pending transactions, and overdraft limits applied by the LFI. If the account has insufficient funds, reject with HTTP <code>400</code> <code>errorCode</code>: <code>GenericError</code> and <code>errorMessage</code>: <code>Payment rejected due to insufficient funds</code>.'] },
            { cells: ['5', 'Debtor account — temporarily unavailable', 'The debtor account selected at consent authorization must still be in a state that permits payment initiation at the time the payment is received. If the account is <code>Inactive</code>, <code>Dormant</code>, or <code>Suspended</code>, reject with HTTP <code>403</code> <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is temporarily blocked.</code>'] },
            { cells: ['6', 'Debtor account — permanently unavailable', 'If the debtor account has become <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code> since consent authorization, reject with HTTP <code>403</code> <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>'] },
            { cells: ['7', '<code>PaymentId</code> generation', 'The <code>PaymentId</code> returned in the <code>201</code> response MUST be generated by the LFI and MUST be unique within the LFI\'s payment system — no two payments may share the same <code>PaymentId</code>. Once issued, the <code>PaymentId</code> MUST NOT be reassigned to a different payment, and the same <code>PaymentId</code> MUST continue to resolve to the same payment for the entire 1-year <code>GET /payments/{paymentId}</code> sustain window (see below).'] },
          ],
        } },
        { kind: 'prose', html: 'If all validations above pass, the LFI MUST create the payment record in its systems and return HTTP <code>201</code> with the generated <code>PaymentId</code> per the <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a>. Full response handling is covered in the <a href="./api-guide">API Guide</a>.' },
      ],
    },
    {
      id: 'screening-checks',
      num: '04',
      title: 'Screening Checks',
      blocks: [
        { kind: 'prose', html: 'Once the payment record has been created, the LFI MUST apply its standard fraud, sanctions, and AML screening controls before the payment is submitted to the domestic rail. These checks are the LFI\'s responsibility and follow the LFI\'s own policies and regulatory obligations. Screening may result in the payment being held, rejected, or referred for manual review after the <code>201</code> response has been returned to the TPP. The outcome MUST be reflected in the payment\'s <code>Status</code> and surfaced via <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/open-api/payments"><code>GET /payments/{paymentId}</code></a> so the TPP can observe the final state.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Screening duration', 'Screening checks SHOULD complete within <strong>3 seconds</strong> of the payment record being created. This is a target, not a hard cutoff — where the LFI\'s controls require longer (for example, referral for manual review), the payment remains in <code>Pending</code> and the final outcome is reflected when available. A payment MUST NOT be rejected solely because screening exceeded 3 seconds.'] },
            { cells: ['2', 'Screening failure — notify API Hub', 'If a screening check fails, the LFI MUST immediately call <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> on the API Hub Consent Manager with <code>paymentResponse.status</code>: <code>Rejected</code> and a <code>paymentResponse.RejectReasonCode</code> entry. The entry\'s <code>Code</code> MUST use the <code>LFI.</code> namespace (the check that failed is in the LFI\'s systems, not AANI or UAEFTS), matching the pattern <code>^LFI\\.[A-Za-z0-9]+$</code>. The <code>Message</code> MUST be sanitised for onward relay to the TPP — it MUST NOT reveal detection logic, sanctions list matches, or internal case identifiers. <br><br> <strong>Example:</strong> <br> <code>Code</code>: <code>LFI.ScreeningRejected</code> <br> <code>Message</code>: <code>Payment rejected by LFI screening controls.</code>'] },
          ],
        } },
      ],
    },
    {
      id: 'rail-submission',
      num: '05',
      title: 'Rail Submission',
      blocks: [
        { kind: 'prose', html: 'Once the payment has passed screening, the LFI MUST submit it to the domestic rails for processing. AANI is the primary rail for Single Instant Payment; UAEFTS is the fallback.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Submit to AANI', 'Once screening has passed, the LFI MUST immediately submit the payment to AANI for processing.'] },
            { cells: ['2', 'Fallback to UAEFTS', 'If AANI is unavailable for any reason — including the AANI service being degraded or unreachable, or the receiving bank being unable to receive the payment via AANI — the LFI MUST fall back to UAEFTS and submit the payment there. The fallback decision MUST NOT require TPP or customer intervention.'] },
            { cells: ['3', 'Propagate status changes to the API Hub', 'Whenever a rail status change at AANI or UAEFTS maps to a change in the payment\'s Open Finance status, the LFI MUST immediately call <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> on the API Hub Consent Manager to update <code>paymentResponse.status</code> to the new Open Finance status. Rail statuses that are deliberately not mapped (see <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</a>) do not require a PATCH; the mapping document is the source of truth for which rail transitions are reportable.'] },
            { cells: ['4', '<code>paymentTransactionId</code> propagation', 'Once AANI or UAEFTS assigns the end-to-end identifier for the payment (the IPP identifier for AANI, or the equivalent for UAEFTS), the LFI MUST include it as <code>paymentTransactionId</code> on the next <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> — ideally on the same PATCH as the accompanying status transition. Once set, <code>paymentTransactionId</code> MUST NOT be changed. Note that <code>paymentTransactionId</code> identifies the payment instruction on the rail and is distinct from the Bank Data Sharing <code>transactionId</code> (which identifies a ledger entry).'] },
            { cells: ['5', 'Rail rejection — reject reason code', 'If the payment is rejected by AANI or UAEFTS, the LFI MUST populate <code>paymentResponse.RejectReasonCode</code> on the <code>PATCH /payment-log/{id}</code> call. The <code>Code</code> MUST use the namespace of the rail that rejected the payment (<code>AANI.</code> or <code>FTS.</code>, matching the spec pattern <code>^(AANI|FTS)\\.[A-Za-z0-9]+$</code>), with the specific reason code mapped directly from the rail\'s originating rejection code. The <code>Message</code> MUST be sanitised for onward relay to the TPP. <br><br> <strong>Example:</strong> <br> <code>Code</code>: <code>AANI.AM04</code> <br> <code>Message</code>: <code>Payment request cannot be executed as insufficient funds at debtor account.</code>'] },
            { cells: ['6', '<code>PATCH /payment-log/{id}</code> delivery', 'The LFI MUST treat Consent Manager updates as durable — <code>status</code>, <code>paymentTransactionId</code>, and <code>RejectReasonCode</code> changes cannot be dropped. If a PATCH fails with a transient error (HTTP <code>5xx</code>, connection error, or timeout), the LFI MUST retry with exponential backoff until the update is accepted; updates that cannot be delivered immediately MUST be queued and retried rather than abandoned. A PATCH rejected with a <code>4xx</code> response indicates a client-side issue that retry will not fix — the LFI MUST NOT retry in this case and MUST raise the failure for operational investigation.'] },
          ],
        } },
      ],
    },
    {
      id: 'payment-status-retrieval',
      num: '06',
      method: 'GET',
      path: '/payments/{paymentId}',
      title: 'Payment Status Retrieval',
      blocks: [
        { kind: 'prose', html: 'The TPP may use <code>GET /payments/{paymentId}</code> to retrieve the current status of a payment it has initiated. The API Hub validates the access token and consent, then forwards the request to your Ozone Connect endpoint.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Sustain period', 'The LFI MUST continue to serve <code>GET /payments/{paymentId}</code> for at least <strong>1 year from the creation date of the payment</strong>. Within this window, the endpoint MUST return the current <code>Status</code> of the payment, reflecting any subsequent state changes (e.g. screening outcomes, rail settlement, reversal).'] },
            { cells: ['2', 'Status consistency with the API Hub', 'The <code>Status</code> returned by <code>GET /payments/{paymentId}</code> MUST exactly match the status most recently PATCHed to the API Hub Consent Manager via <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a>. The LFI is responsible for keeping the two representations in lockstep — any status change in the LFI\'s systems MUST be reflected on both surfaces before the change is observable to the TPP.'] },
            { cells: ['3', '<code>paymentTransactionId</code> consistency', 'Once the rail has assigned an end-to-end identifier and the LFI has PATCHed it to the Consent Manager, <code>GET /payments/{paymentId}</code> MUST return the same <code>paymentTransactionId</code>. Before the rail has assigned one, <code>paymentTransactionId</code> MUST be omitted from the response rather than returned as an empty string.'] },
          ],
        } },
      ],
    },
    {
      id: 'parity-and-constraints',
      num: '07',
      title: 'Parity and Treatment Constraints',
      blocks: [
        { kind: 'prose', html: 'These requirements govern how the LFI may treat Open Finance initiated payments relative to its own banking channels. They apply alongside &mdash; and do not override &mdash; the LFI\'s standard fraud, sanctions, and AML controls, which remain the LFI\'s responsibility (see <a href="#screening-checks">Screening Checks</a>).' },
        { kind: 'table', table: {
          headers: ['#', 'Requirement', 'Detail'],
          rows: [
            { cells: ['1', 'No timing constraints', 'The LFI MUST NOT impose timing constraints on Open Finance initiated payments. Cooling-off periods for new beneficiaries with reduced transactional limits, or other constraints related to the number or value of payment transactions, MUST NOT be applied to Open Finance initiated payments. <br><br> This does not restrict the LFI\'s own channels: if the customer subsequently attempts a payment through the LFI\'s own channels to a beneficiary that was saved during an Open Finance journey, the LFI MAY block or delay that payment under its existing cooling-off policy for that account.'] },
            { cells: ['2', 'Parity with other digital channels', 'Transaction limits and other constraints applied to Open Finance services MUST NOT be more restrictive than those applied across the LFI\'s other commonly used banking digital channels. This establishes parity, ensuring the customer experience is consistent regardless of the digital channel used.'] },
          ],
        } },
      ],
    },
  ],
}
