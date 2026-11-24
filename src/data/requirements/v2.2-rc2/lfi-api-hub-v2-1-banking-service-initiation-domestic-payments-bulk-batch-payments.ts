import type { RequirementsPageData } from '../types'

// Bulk/Batch Payments (OFP-001), LFI side, v2.2 only. Rules come from the
// v2.2-rc2 Ozone Connect and Consent Manager documents, or carry over from the
// rules for every domestic payment. Not covered yet, by decision: the
// PATCH /payment-log/{id} updates for each payment, and the submission timing.
// Open points are tracked in supporting/internal_helpers/todo.md.

const LFI = '/tech/lfi-api-hub/v2.2-rc2'
const SI = `${LFI}/banking/service-initiation`
const BULK = `${SI}/domestic-payments/bulk-batch-payments`
const TPP_SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation'

export const data: RequirementsPageData = {
  title: 'Bulk and Batch Payments — Requirements',
  version: 'v2.2-rc2',
  readTime: '7 min',
  lede: `The <a href="${LFI}/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="${LFI}/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.`,
  preconditions: 'The tables below list the rules that apply to Bulk and Batch Payments. All request validation of the TPP\'s credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoint is called. The rules below cover what your Ozone Connect endpoint must validate and how it must treat each payment in a batch.',
  sections: [
    {
      id: 'consent-validation',
      num: '01',
      title: 'Consent Validation',
      blocks: [
        { kind: 'prose', html: `When a TPP creates a Bulk and Batch consent, the API Hub calls your <a href="${LFI}/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage.` },
        { kind: 'prose', html: 'A Bulk and Batch consent is identified by its <code>ControlParameters.ConsentSchedule</code> carrying <code>BulkBatchPayment</code>: the reason for the batch (<code>Description</code>), the number of payments (<code>NumberOfTransactions</code>, at most 500) and their total (<code>TotalValueOfPayments</code>). The API Hub has already validated the consent against the Bulk and Batch consent shape, which carries no <code>Permissions</code>, <code>CurrencyRequest</code>, <code>PaymentPurposeCode</code>, <code>DebtorReference</code> or <code>CreditorReference</code>.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Unsupported <code>standardVersion</code>', 'The consent\'s <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent payment initiation requests. If you do not support that version for the Payment Initiation API family, respond with <code>invalid</code>. Bulk and Batch Payments exist from <code>v2.2</code>.'] },
            { cells: ['2', '<code>consent.PersonalIdentifiableInformation</code>', 'The decrypted PII payload must conform exactly to the Bulk and Batch Payment PII (<code>AEBankServiceInitiationRichAuthorizationRequests.AEBulkBatchPaymentPII</code> in <code>uae-api-hub-consent-manager-openapi.yaml</code>). It carries only the Bulk and Batch Risk block (<code>AEBulkBatchPaymentRisk</code>). Respond with <code>invalid</code> if decryption fails, if any property is of the wrong type, or if the payload contains additional or undocumented properties (<code>additionalProperties: false</code>).'] },
            { cells: ['3', 'No Debtor Account or Creditor', 'The consent carries no Debtor Account and no Creditor. Each payment names its own, on <code>POST /bulk-payments</code>, and they are validated there — see <a href="#payment-execution">Payment Execution</a>. There is nothing to check for them at consent time.'] },
            { cells: ['4', 'Invalid <code>BaseConsentId</code>', 'If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI.</li><li>The referenced consent is a Service Initiation consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:service-initiation-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — the <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>.'] },
          ],
        } },
      ],
    },
    {
      id: 'authorization',
      num: '02',
      title: 'Authorization',
      blocks: [
        { kind: 'prose', html: `The generic <a href="${LFI}/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey, including patching the customer identifier onto the consent — it is returned on every <code>POST /bulk-payments</code> as <code>o3-psu-identifier</code>, and is how you tie each payment in a batch to the User who authorized it. The rules below cover what is specific to Bulk and Batch Payments.` },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', '<code>BulkBatchPayment</code>', 'The Authorization Page MUST show the batch the User is authorizing: <code>Description</code> as the reason for the payment, <code>NumberOfTransactions</code>, and <code>TotalValueOfPayments</code> with its currency, alongside the standard confirm-payment details. If <code>OnBehalfOf</code> is present, name the party the TPP is acting on behalf of. No payment file is rendered. See <a href="./user-journeys">User Experience</a>.'] },
            { cells: ['2', 'No account selection', 'Do not present an account selection screen. The consent names no Debtor Account: each payment in the batch names its own Debtor Account on <code>POST /bulk-payments</code>.'] },
            { cells: ['3', '<code>consent.IsSingleAuthorization</code>', `If <code>true</code>, the User must be able to authorize the payments without subsequent approvers. If <code>false</code> or not provided (default), subsequent authorizers must approve the consent before it reaches <code>Authorized</code> status and the batch can be executed. See <a href="${TPP_SI}/multi-authorization">Multi-Authorization</a>.`] },
            { cells: ['4', 'No eligible accounts', `If the authenticated customer does not hold any account eligible to make the payments under this consent (including the <code>IsSingleAuthorization</code> constraint above), PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>. See <a href="${LFI}/consent-journey/authorization/requirements">Authorization requirements</a>.`] },
          ],
        } },
      ],
    },
    {
      id: 'payment-execution',
      num: '03',
      method: 'POST',
      path: '/bulk-payments',
      title: 'Payment Execution',
      blocks: [
        { kind: 'prose', html: `When the TPP submits a Bulk/Batch Payment under an authorized consent, the API Hub validates the access token, the consent status and the OpenAPI schema, and validates the <code>Instructions</code> array — at most 500 payments — against the consent: the number of payments against <code>NumberOfTransactions</code>, every currency against <code>TotalValueOfPayments.Currency</code> (<code>AED</code>), and their total against <code>TotalValueOfPayments.Amount</code> — before calling your Ozone Connect <a href="${BULK}/open-api/bulk-payments"><code>POST /bulk-payments</code></a> endpoint, the Bulk and Batch counterpart of <code>POST /payments</code>. The rules below cover what your Ozone Connect endpoint must validate on receipt and return. Error responses MUST conform to the <a href="${BULK}/open-api/bulk-payments">POST <code>/bulk-payments</code> OpenAPI schema</a>, which returns the same error responses as <code>POST /payments</code>.` },
        { kind: 'prose', html: 'The rules apply at two levels. A failure in the batch as a whole — the consent, the idempotency key or the batch-level PII — rejects the whole request, and no payment is created. A failure in one payment — its PII, Debtor Account, Creditor, funds or any other error — rejects <strong>that payment only</strong>: it is <code>Rejected</code> with a <code>RejectReasonCode</code>, and the LFI MUST continue to process the other payments in the batch.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Repeated <code>x-idempotency-key</code>', 'This check runs before every other rule in this table. The key identifies the whole batch. The LFI MUST record each batch it accepts against the <code>x-idempotency-key</code> in <code>requestHeaders</code>, the <code>tpp.clientId</code>, and the <code>o3-consent-id</code> header, and MUST keep that record for at least 24 hours after the request was first received. <ul><li><strong>Same key, same batch.</strong> If a request matches a batch already accepted, the LFI MUST NOT execute any of its payments again and MUST return HTTP <code>201</code> with the original <code>data.id</code> and <code>paymentId</code>s and each payment\'s current <code>status</code>. If the earlier request is still being processed when the repeat arrives, the LFI MUST NOT start a second batch.</li><li><strong>Same key, different batch.</strong> If <code>request.Data</code> differs from the batch recorded against the key, the LFI MUST NOT execute the request and MUST reject it with HTTP <code>409</code> <code>errorCode</code>: <code>GenericRecoverableError</code> and <code>errorMessage</code>: <code>Idempotency key mismatch: Request parameters differ from original.</code> Compare every <code>PersonalIdentifiableInformation</code> after decryption, because the encrypted values change each time the TPP re-signs a retry.</li></ul> See <a href="/knowledge-base/articles/payment-idempotency">Payment Idempotency</a>.'] },
            { cells: ['2', 'Consent', 'The consent referenced by <code>o3-consent-id</code> (and <code>request.Data.ConsentId</code>) must be a Bulk and Batch consent known to the LFI. If it is unknown or has been revoked, reject the whole request with HTTP <code>400</code> <code>errorCode</code>: <code>Consent.Invalid</code>.'] },
            { cells: ['3', '<code>Data.PersonalIdentifiableInformation</code> (batch)', 'The batch-level PII carries only the Bulk and Batch Risk block, once for the whole batch. The decrypted payload must conform exactly to the File Payment Risk PII Schema Object (<code>AEBankServiceInitiation.AEFilePaymentRiskPIIProperties</code>). Reject the whole request with HTTP <code>400</code> and:<ul><li><code>errorCode</code>: <code>JWE.DecryptionError</code> — if decryption fails.</li><li><code>errorCode</code>: <code>Body.InvalidFormat</code> — if any property is of the wrong type, or the payload contains additional or undocumented properties.</li></ul>'] },
            { cells: ['4', '<code>Data.Instructions[].PersonalIdentifiableInformation</code>', 'Each payment carries its own PII, encrypted separately. The decrypted payload must conform exactly to the File Payment PII Schema Object (<code>AEBankServiceInitiation.AEFilePaymentPIIProperties</code>): <code>Initiation.DebtorAccount</code> and <code>Initiation.CreditorAccount</code> are required, <code>Initiation.Creditor</code> and <code>Initiation.CreditorAgent</code> are optional, and it carries no <code>Risk</code> and no Confirmation of Payee. If decryption or schema validation fails for a payment, that payment MUST be <code>Rejected</code>.'] },
            { cells: ['5', '<code>Initiation.DebtorAccount</code>', 'The payments in a batch may be made from different accounts. Each payment\'s Debtor Account MUST be a UAE IBAN held at this LFI by the User who authorized the consent (identified by <code>o3-psu-identifier</code>), eligible under <code>consent.IsSingleAuthorization</code>, and in a state that permits payment initiation (not blocked, dormant, or closed). If it is not, that payment MUST be <code>Rejected</code>.'] },
            { cells: ['6', '<code>Initiation.CreditorAccount</code>', `Each payment's creditor MUST be a valid UAE domestic creditor — the account is reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the state of the receiving account can be determined, able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply — see <a href="${SI}/personal-identifiable-information/creditor">Creditor</a>. If a creditor fails these checks, that payment MUST be <code>Rejected</code>.`] },
            { cells: ['7', 'Sufficient funds', 'Each payment\'s Debtor Account must have sufficient available funds to cover that payment\'s <code>Amount</code> when it is processed, taking into account any holds, pending transactions, and overdraft limits applied by the LFI. If it does not, that payment MUST be <code>Rejected</code>.'] },
            { cells: ['8', 'Rejecting one payment', 'A payment that fails any check for that payment alone — rules 4 to 7 or any other error — MUST be <code>Rejected</code> with a <code>rejectReasonCode</code> stating why, on its element of <code>data.instructions</code> in the response. The LFI MUST NOT reject the rest of the batch because of it, and MUST continue to process the other payments.'] },
            { cells: ['9', 'Identifier generation', 'The LFI MUST generate a unique identifier for the Bulk/Batch Payment (<code>data.id</code>, the TPP\'s <code>BulkPaymentId</code>) and a unique <code>paymentId</code> for each payment within it, unique within the LFI\'s payment system. Once issued, an identifier MUST NOT be reassigned. Each <code>paymentId</code> can also be used with <code>GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}</code> and <code>GET /payments/{paymentId}</code>.'] },
          ],
        } },
        { kind: 'prose', html: `If the batch as a whole passes, the LFI MUST return HTTP <code>201</code> with <code>AEFilePaymentIdResponse</code> per the <a href="${BULK}/open-api/bulk-payments">POST <code>/bulk-payments</code> OpenAPI schema</a>: <code>data.id</code>, <code>data.consentId</code>, <code>data.creationDateTime</code>, and <code>data.instructions</code> with one element per request instruction, <strong>in the same order</strong>. Each element carries that payment's <code>paymentId</code>, <code>status</code>, <code>statusUpdateDateTime</code>, <code>amount</code> and <code>paymentPurposeCode</code>, and where available its <code>paymentTransactionId</code>, <code>paymentRail</code>, <code>rejectReasonCode</code>, <code>debtorReference</code> and <code>creditorReference</code>. The batch has no status of its own. Full response handling is covered in the <a href="./api-guide">API Guide</a>.` },
      ],
    },
    {
      id: 'screening-and-settlement',
      num: '04',
      title: 'Screening and Settlement',
      blocks: [
        { kind: 'prose', html: `Each payment in a batch is screened, routed and settled on its own. The LFI's fraud screening, transaction monitoring, and AML controls are the LFI's responsibility and follow the LFI's own policies and regulatory obligations.` },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Screening each payment', 'The LFI MUST apply its fraud screening, transaction monitoring, and AML controls to each payment before it is submitted to a rail. A payment that fails screening MUST be <code>Rejected</code>; the other payments in the batch are not affected. The <code>RejectReasonCode</code> message MUST be sanitised for onward relay to the TPP — it MUST NOT reveal detection logic, sanctions list matches, or internal case identifiers.'] },
            { cells: ['2', 'Rail per payment', `Each payment is routed and settled over its own rail — AANI, UAEFTS, or the LFI's own ledger where the debtor and creditor accounts are both held at the LFI — and its <code>paymentRail</code> is reported on that payment's element of <code>data.instructions</code>. The rail also sets the namespace of a payment's <code>rejectReasonCode</code>. The domestic rail and status rules apply to each payment as for a single payment — see <a href="${SI}/domestic-payments/overview/payment-status">Payment Rails and Status</a>.`] },
          ],
        } },
      ],
    },
    {
      id: 'payment-status-retrieval',
      num: '05',
      method: 'GET',
      path: '/bulk-payments/{bulkPaymentId}',
      title: 'Payment Status Retrieval',
      blocks: [
        { kind: 'prose', html: `The TPP may retrieve the status of every payment in a batch, or of one payment within it. The API Hub validates the access token and consent, then calls your Ozone Connect <a href="${BULK}/open-api/bulk-payments-bulkPaymentId"><code>GET /bulk-payments/{bulkPaymentId}</code></a>, <a href="${BULK}/open-api/bulk-payments-bulkPaymentId-payments-paymentId"><code>GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}</code></a> or <a href="${SI}/open-api/payments-PaymentId"><code>GET /payments/{paymentId}</code></a> endpoint. The TPP's lookup by idempotency key (<code>GET /bulk-payments</code>) has no Ozone Connect counterpart: the API Hub answers it itself.` },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', '<code>GET /bulk-payments/{bulkPaymentId}</code>', 'MUST return the same body as the <code>201</code> to <code>POST /bulk-payments</code> (<code>AEFilePaymentIdResponse</code>), with the <strong>current</strong> <code>status</code> of each payment in <code>data.instructions</code>, in the original request order, reflecting any state change since the batch was received (screening outcome, rail settlement, rejection).'] },
            { cells: ['2', '<code>GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}</code>', 'MUST return one payment within the batch, by the <code>paymentId</code> you assigned it in the <code>POST /bulk-payments</code> response, as <code>AEFilePaymentInstructionIdResponse</code>: its <code>data</code> is that payment\'s element of <code>data.instructions</code>, exactly as <code>GET /bulk-payments/{bulkPaymentId}</code> returns it. If <code>paymentId</code> is not a payment within the Bulk/Batch Payment identified by <code>bulkPaymentId</code>, return an error response; the TPP receives <code>404</code>.'] },
            { cells: ['3', '<code>GET /payments/{paymentId}</code> for a payment in a batch', 'MUST return that payment, by the <code>paymentId</code> you assigned it in the <code>POST /bulk-payments</code> response, in the single-payment shape (<code>AEPaymentIdResponse</code>): <code>instruction</code>, <code>paymentPurposeCode</code> and <code>debtorReference</code> are those of that payment, <code>consentId</code> is the Bulk/Batch consent, and <code>openFinanceBilling</code>, <code>currencyRequest</code> and <code>exchangeRate</code> are absent, as a Bulk/Batch Payment carries none.'] },
            { cells: ['4', 'Status consistency', 'A payment\'s <code>status</code>, <code>statusUpdateDateTime</code> and <code>paymentTransactionId</code> MUST be the same on <code>GET /bulk-payments/{bulkPaymentId}</code>, <code>GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}</code> and <code>GET /payments/{paymentId}</code>.'] },
            { cells: ['5', '<code>paymentTransactionId</code>', 'MUST be omitted for a payment until it has been set, rather than returned as an empty string. Once set, it MUST NOT change.'] },
          ],
        } },
      ],
    },
    {
      id: 'parity-and-constraints',
      num: '06',
      title: 'Parity and Treatment Constraints',
      blocks: [
        { kind: 'prose', html: 'These requirements govern how the LFI may treat Open Finance initiated payments relative to its own banking channels. They apply alongside &mdash; and do not override &mdash; the LFI\'s standard fraud, sanctions, and AML controls, which remain the LFI\'s responsibility (see <a href="#screening-and-settlement">Screening and Settlement</a>).' },
        { kind: 'table', table: {
          headers: ['#', 'Requirement', 'Detail'],
          rows: [
            { cells: ['1', 'No timing constraints', 'The LFI MUST NOT impose timing constraints on Open Finance initiated payments. Cooling-off periods for new beneficiaries with reduced transactional limits, or other constraints related to the number or value of payment transactions, MUST NOT be applied to Open Finance initiated payments.'] },
            { cells: ['2', 'Parity with other digital channels', 'Transaction limits and other constraints applied to Open Finance services MUST NOT be more restrictive than those applied across the LFI\'s other commonly used banking digital channels. This establishes parity, ensuring the customer experience is consistent regardless of the digital channel used.'] },
          ],
        } },
      ],
    },
  ],
}
