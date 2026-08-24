import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Insurance Quotation — Requirements',
  version: 'v2.2-rc1',
  readTime: '12 min',
  lede:
    'The validation rules that apply to Insurance Quotation. The <strong>Validated by</strong> column on each table indicates where each rule is enforced. Insurance Quotation does not use a per-customer consent — TPPs authenticate with the Client Credentials Grant and act as themselves throughout the quote lifecycle. Read alongside the <a href="./api-guide/">API Guide</a> and <a href="./user-journeys">User Journeys</a>.',
  preconditions:
    'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>ISP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing, and a <a href="/tech/tpp-standards/security/tokens/">client credentials access token</a> with the <code>insurance</code> scope.',
  sections: [
    {
      id: 'post-quote',
      num: '01',
      method: 'POST',
      path: '/{type}-insurance-quotes',
      title: 'Create a Quote',
      intro:
        'The TPP requests one or more quotes for a single customer for the named insurance sector. The Hub validates schema and credentials, then proxies the request to the LFI. The response is a <code>data</code> array carrying one or more quotes, each with its own <code>QuoteId</code>.',
      rules: [
        { field: 'Sector slug in path', rule: 'Must be one of <code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>. The Hub returns <code>404</code> for any other value before the request reaches the LFI.', validatedBy: 'API Hub' },
        { field: '<code>QuoteType</code>', rule: 'Must be one of <code>New</code>, <code>Renewal</code>, or <code>Switch</code>. See <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types">Quote Types</a> for the per-type field requirements (<code>Renewal</code> references the prior policy; <code>Switch</code> references the incumbent insurer).', validatedBy: 'API Hub (schema) + LFI (logic)' },
        { field: 'Quote request body', rule: 'Must conform exactly to the per-sector quote request schema in the <a href="./open-api/motor-insurance-quotes">OpenAPI spec</a>. Sector-specific identifiers (e.g. Vehicle for Motor, PropertyAddress for Home, TripDetails for Travel) are required.', validatedBy: 'API Hub' },
        { field: 'Customer identifiers', rule: 'Customer identification fields (Emirates ID, date of birth, etc.) carried inline on the quote request are subject to the same data-minimisation rules as other Open Finance flows — only collect what is required to underwrite. There is no JWE encryption for Insurance Quotation PII.', validatedBy: 'TPP discretion' },
        { field: 'Access token', rule: 'Must be a Client Credentials Grant token issued by the API Hub authorisation server with the <code>insurance</code> scope. Customer consent tokens (Authorization Code Grant) MUST NOT be used.', validatedBy: 'API Hub' },
        { field: 'Signed request', rule: 'The request body MUST be sent as an <code>application/jwt</code> Request JWT signed with the TPP\'s signing key, per the FAPI security profile. Unsigned requests are rejected with <code>400</code>.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
        { field: 'Response — <code>201</code>', rule: 'The LFI returned one or more quotes. Each entry includes a <code>QuoteId</code> the TPP uses for retrieval, acceptance, and policy creation. The TPP MUST persist the <code>QuoteId</code> alongside the customer context.', validatedBy: 'TPP' },
        { field: 'Response — <code>204</code>', rule: 'The LFI declined to quote (e.g. risk profile out of appetite). The TPP MUST surface the decline to the customer without retrying.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'get-quote',
      num: '02',
      method: 'GET',
      path: '/{type}-insurance-quotes/{QuoteId}',
      title: 'Retrieve a Quote',
      intro:
        'Used to look up the current state of a quote. Optional in the happy path — TPPs subscribed to webhooks receive status updates directly, while polling TPPs can use this endpoint between events.',
      rules: [
        { field: '<code>QuoteId</code>', rule: 'Must be a <code>QuoteId</code> the TPP previously received from this LFI\'s <code>POST /{type}-insurance-quotes</code> response, in the matching sector. An unknown or cross-sector ID returns <code>404</code>.', validatedBy: 'LFI' },
        { field: 'Quote ownership', rule: 'The LFI returns <code>404</code> rather than <code>403</code> if the <code>QuoteId</code> belongs to a different TPP, to prevent leakage of quote existence.', validatedBy: 'LFI' },
      ],
    },
    {
      id: 'patch-quote',
      num: '03',
      method: 'PATCH',
      path: '/{type}-insurance-quotes/{QuoteId}',
      title: 'Accept a Quote (and Subscribe to Events)',
      intro:
        'When the customer accepts a quote, the TPP PATCHes the quote with the accept body. This is also where the TPP registers its webhook subscription — if the TPP wants to receive event notifications instead of polling, the <code>Subscription</code> object on this request carries the webhook configuration. In TPP-Led mode, the same endpoint is used a second time to <strong>Submit KYC</strong> data after <code>ApplicationPending</code>.',
      rules: [
        { field: '<code>Data</code>', rule: 'Carries the accept-quote properties for the sector (sector-specific fields such as policy start date, beneficiary list, etc.). Required when accepting the quote; may be omitted on subsequent PATCHes that only manage the webhook subscription.', validatedBy: 'API Hub + LFI' },
        { field: '<code>Subscription.Webhook.Url</code>', rule: 'Optional. If the TPP wants to receive event notifications, set <code>Url</code> to an HTTPS endpoint the TPP controls. The URL MUST match <code>^https://.+</code>. The Hub will POST status events to this URL for the lifetime of the quote (see <a href="./api-guide/">API Guide</a>). If omitted, the TPP must poll via <code>GET /{type}-insurance-quotes/{QuoteId}</code>.', validatedBy: 'API Hub' },
        { field: '<code>Subscription.Webhook.IsActive</code>', rule: 'Required when <code>Subscription</code> is present. <code>true</code> activates webhook delivery; <code>false</code> pauses it without removing the registered URL. The TPP can PATCH later with <code>IsActive: false</code> to disable webhooks mid-lifecycle without altering the quote.', validatedBy: 'API Hub' },
        { field: 'Signed request', rule: 'PATCH body MUST be sent as <code>application/jwt</code> signed with the TPP\'s signing key.', validatedBy: 'API Hub' },
        { field: 'Response — <code>200</code> (TPP-Led)', rule: 'The LFI returns <code>data.PolicyIssuanceAllowed</code> declaring which steps the TPP may perform: <code>CustomerVerification</code>, <code>Payment</code>, <code>PolicyDocuments</code>. The TPP MUST honour these flags — only perform the steps the LFI has explicitly allowed.', validatedBy: 'TPP' },
        { field: 'Response — <code>204</code> (LFI-Led)', rule: 'The LFI has accepted the quote and will drive the application internally. The TPP\'s next step is to wait for the <code>ApplicationPending</code> → <code>PolicyIssued</code> → <code>Completed</code> event sequence (via webhook or polling).', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'submit-kyc',
      num: '04',
      method: 'PATCH',
      path: '/{type}-insurance-quotes/{QuoteId}',
      title: 'Submit KYC (TPP-Led only)',
      intro:
        'In TPP-Led mode, after the LFI emits <code>ApplicationPending</code> the TPP collects KYC data from the customer in its own UI and submits it via a second PATCH on the same endpoint. The LFI responds with <code>ApplicationApproved</code> on the quote-log (delivered to the TPP via webhook or polling) and emits a <code>BrokerInstructions.Url</code> — the LFI-hosted payment page — that the TPP redirects the customer to.',
      rules: [
        { field: 'Eligibility', rule: 'Submit KYC is only valid in TPP-Led mode (i.e. the Accept Quote response carried <code>PolicyIssuanceAllowed.CustomerVerification: true</code>). Calling it for an LFI-Led quote results in <code>409</code>.', validatedBy: 'LFI' },
        { field: 'KYC payload', rule: 'Must conform to the sector\'s accept-quote / KYC request schema. The TPP is responsible for collecting valid customer identification (Emirates ID, etc.) and forwarding it verbatim.', validatedBy: 'API Hub + LFI' },
        { field: 'Customer presence', rule: 'The TPP MUST collect the KYC data with the customer present and consenting — this submission acts as the customer\'s instruction to proceed with the application.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'event-subscription',
      num: '05',
      title: 'Event Subscription and Handling',
      intro:
        'Once the TPP has subscribed via the <code>Subscription</code> object on PATCH Accept Quote, the Hub delivers status events to the registered webhook URL whenever the LFI emits a quote-log update. The event payload conforms to the Insurance Quote Event schema documented in the <a href="./api-guide/">API Guide</a>.',
      rules: [
        { field: 'Webhook endpoint', rule: 'Must be reachable over HTTPS with a valid TLS certificate. The Hub will not deliver events to plaintext, self-signed, or expired endpoints.', validatedBy: 'API Hub (delivery)' },
        { field: 'Webhook authentication', rule: 'Events are signed by the Hub. The TPP MUST verify the signature on every received event before acting on it — see <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event Notifications</a>.', validatedBy: 'TPP' },
        { field: 'Idempotency', rule: 'The Hub may redeliver an event after a transient delivery failure. The TPP MUST treat events as idempotent — apply the latest <code>QuoteStatus</code> rather than counting events. Tracking by <code>QuoteId</code> + <code>QuoteStatus</code> + event timestamp is sufficient.', validatedBy: 'TPP' },
        { field: 'Status vocabulary', rule: 'Events carry one of three schemas: pending-completion (<code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PaymentRequired</code>, <code>PolicyIssued</code>), completed (<code>Completed</code>), or terminal (<code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>, <code>LFICancelled</code>). The TPP MUST handle all three.', validatedBy: 'TPP' },
        { field: '<code>BrokerInstructions.Url</code>', rule: 'When emitted on <code>ApplicationApproved</code> or <code>PaymentRequired</code>, this is the LFI-hosted URL the TPP MUST redirect the customer to in order to complete payment. The URL is single-use and time-bound. The TPP MUST NOT scrape, modify, or replay it.', validatedBy: 'TPP' },
        { field: '<code>Documents</code>', rule: 'When emitted on <code>PolicyIssued</code> in TPP-Led mode, the TPP MUST verify each document\'s SHA-256 <code>Hash</code> against the decoded <code>Content</code>, then make the documents available to the customer (download, email, in-app viewer). The TPP becomes the policy document delivery channel.', validatedBy: 'TPP' },
        { field: 'Polling fallback', rule: 'TPPs without a webhook subscription MUST poll <code>GET /{type}-insurance-quotes/{QuoteId}</code> at a reasonable cadence (no more than once per minute under normal load). The Hub may rate-limit aggressive polling.', validatedBy: 'TPP' },
      ],
    },
    {
      id: 'create-policy',
      num: '06',
      method: 'POST',
      path: '/{type}-insurance-policies',
      title: 'Create a Policy',
      intro:
        'Once the application has reached a state that permits policy issuance (LFI-Led: any time after acceptance; TPP-Led: after <code>ApplicationApproved</code> and the customer has paid via the BrokerInstructions URL), the TPP calls POST to create the policy.',
      rules: [
        { field: '<code>QuoteId</code>', rule: 'The body MUST reference a <code>QuoteId</code> the TPP previously accepted at this LFI, in the matching sector. A mismatched sector or unknown <code>QuoteId</code> returns <code>404</code>.', validatedBy: 'LFI' },
        { field: 'TPP-supplied data (TPP-Led)', rule: 'For TPP-Led quotes where the TPP collected KYC, the body carries that KYC plus any additional data the LFI requires. For LFI-Led quotes the body may be empty beyond the <code>QuoteId</code>.', validatedBy: 'LFI' },
        { field: 'Signed request', rule: 'POST body MUST be sent as <code>application/jwt</code> signed with the TPP\'s signing key.', validatedBy: 'API Hub' },
        { field: 'Idempotency', rule: 'If the TPP retries POST Create Policy with the same <code>QuoteId</code> after a successful response, the LFI MUST return the same policy reference rather than minting a duplicate. The TPP SHOULD use the <code>x-fapi-interaction-id</code> to correlate retries.', validatedBy: 'LFI' },
        { field: 'Response — <code>201</code>', rule: 'The LFI has accepted the policy creation request. The TPP awaits the <code>PolicyIssued</code> → <code>Completed</code> event sequence (or polls). The final <code>InsurancePolicyId</code> and the <code>Documents</code> arrive via the quote-log events, not in this response body.', validatedBy: 'TPP' },
      ],
    },
  ],
}
