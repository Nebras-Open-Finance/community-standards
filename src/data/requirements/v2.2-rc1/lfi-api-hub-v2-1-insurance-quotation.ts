import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Insurance Quotation — Requirements',
  version: 'v2.2-rc1',
  readTime: '12 min',
  lede: 'The Insurance Quotation flow runs on the Client Credentials Grant — there is no per-customer consent. TPPs authenticate as themselves, request a quote, and (where the customer accepts) drive the application through to policy issuance. Your Ozone Connect endpoints execute the quote and policy lifecycle; status updates flow back to subscribed TPPs through the Hub.',
  preconditions: 'The tables below list the rules that apply to Insurance Quotation. All request validation of the TPP\'s credentials, access token, and OpenAPI schema is performed by the Hub before your Ozone Connect endpoints are called. The rules below cover what your Ozone Connect endpoints must validate and what they must return, and what your LFI must emit through the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>PATCH /insurance-quote-log/{logId}</code></a> callback to keep the Hub and any subscribed TPP webhooks in sync.',
  sections: [
    {
      id: 'create-quote',
      num: '01',
      method: 'POST',
      path: '/{type}-insurance-quotes',
      title: 'Create Quote',
      blocks: [
        { kind: 'prose', html: 'When a TPP requests a quote, the Hub validates the access token and OpenAPI schema, then proxies the request to your Ozone Connect <code>POST /{type}-insurance-quotes</code> endpoint with the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>) baked into the path. Your endpoint receives the customer\'s quote request and either returns one-or-more quotes (<code>201</code>) or declines to quote (<code>204</code>).' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Sector support', 'The sector slug in the URL path indicates which insurance type the TPP is requesting. If your LFI does not underwrite the requested sector, return <code>404</code>. Only mount endpoints for sectors you actually offer; the Hub will not route requests for unmounted sectors.'] },
            { cells: ['2', 'Quote Type', 'The request body carries a <code>QuoteType</code> of <code>New</code>, <code>Renewal</code>, or <code>Switch</code>. See <a href="./quote-types">Quote Types</a> for the per-type validation differences (e.g. <code>Renewal</code> references a prior policy, <code>Switch</code> references an incumbent insurer). If the requested <code>QuoteType</code> cannot be supported for the sector (e.g. the LFI does not support switching for Travel), return <code>204</code> with an empty body.'] },
            { cells: ['3', 'Multi-quote response', 'The <code>201</code> response carries a <code>data</code> array of one-or-more quotes. Each entry must include a unique <code>QuoteId</code> the LFI generates and persists — the TPP uses this ID to retrieve, accept, or reject the quote. Populate every field marked required by the per-sector quote schema.'] },
            { cells: ['4', 'Decline to quote', 'If your underwriting rules cannot produce any quote that meets the request (e.g. risk profile out of appetite, vehicle/property out of supported scope), return <code>204</code> with an empty body. Do not return a <code>201</code> with an empty <code>data</code> array.'] },
            { cells: ['5', 'Quote validity window', 'Each <code>QuoteId</code> MUST remain retrievable and acceptable for the validity period the LFI advertises on the quote (typically 14–30 days). After expiry, retrievals MUST still return the quote in a <code>Expired</code> terminal state via the <a href="#status-updates">quote-log</a> rather than <code>404</code> — TPPs need to be able to display an expiry reason.'] },
            { cells: ['6', 'No subscription handling', 'The <code>Subscription</code> object on the request body is the TPP\'s webhook configuration. It is consumed by the Hub for event delivery — the LFI MUST NOT act on it. The LFI\'s only obligation is to emit status events via <code>PATCH /insurance-quote-log/{logId}</code>; the Hub fans those out to any subscribed TPP webhook.'] },
          ],
        } },
      ],
    },
    {
      id: 'retrieve-quote',
      num: '02',
      method: 'GET',
      path: '/{type}-insurance-quotes/{QuoteId}',
      title: 'Retrieve Quote',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Quote ownership', 'Return the quote only if the <code>QuoteId</code> was created in response to a request from the same TPP (identified by the Hub via <code>o3-caller-client-id</code>). If the quote belongs to a different TPP, return <code>404</code> — do not leak quote existence across TPPs.'] },
            { cells: ['2', 'Sector match', 'The sector slug in the URL path MUST match the sector the quote was created under. A motor <code>QuoteId</code> requested via <code>/home-insurance-quotes/{QuoteId}</code> MUST return <code>404</code>.'] },
            { cells: ['3', 'Current state', 'Return the quote in its current state. If the quote has progressed past <code>Accepted</code> into the application lifecycle, include the latest <code>QuoteStatus</code> drawn from the same vocabulary the LFI emits on the quote-log (see <a href="#status-updates">Status Updates</a>).'] },
          ],
        } },
      ],
    },
    {
      id: 'accept-quote',
      num: '03',
      method: 'PATCH',
      path: '/{type}-insurance-quotes/{QuoteId}',
      title: 'Accept Quote',
      blocks: [
        { kind: 'prose', html: 'The TPP calls PATCH on the quote to indicate the customer has accepted, kicking off the application lifecycle. The response declares <code>PolicyIssuanceAllowed</code> — the steps the LFI permits the TPP to handle (TPP-Led mode) or retains for itself (LFI-Led mode). This declaration drives whether the TPP collects KYC, hosts payment, and issues policy documents, or whether your LFI does.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Quote ownership', 'Accept the PATCH only if the <code>QuoteId</code> was created in response to a request from the same TPP. Reject with <code>404</code> otherwise — do not return <code>403</code> (which would confirm the quote exists).'] },
            { cells: ['2', 'Quote validity', 'If the quote has expired or has already been progressed past <code>Accepted</code>, reject with <code>409</code>. The TPP should retrieve the quote to see its current state.'] },
            { cells: ['3', 'PolicyIssuanceAllowed — LFI-Led', 'For LFI-Led quotes (your LFI hosts customer verification, payment, and documents), return <code>204</code> with no body. The TPP knows the quote has been accepted and will await status updates emitted through the quote-log.'] },
            { cells: ['4', 'PolicyIssuanceAllowed — TPP-Led', 'For TPP-Led quotes, return <code>200</code> with <code>data.PolicyIssuanceAllowed</code> set to the steps the TPP may perform: <code>CustomerVerification</code>, <code>Payment</code>, and <code>PolicyDocuments</code>. All three booleans are required. Where the TPP hosts payment, the LFI MUST emit a <code>PaymentRequired</code> or <code>ApplicationApproved</code> event with a <code>BrokerInstructions[].Url</code> that the TPP redirects the customer to (see <a href="#status-updates">Status Updates</a>).'] },
            { cells: ['5', 'Subscription not consumed by LFI', 'The <code>Subscription</code> object is the TPP\'s webhook registration for the Hub\'s event delivery. The Hub stores it; the LFI MUST NOT act on it. Your only obligation is to emit status events through <code>PATCH /insurance-quote-log/{logId}</code> and the Hub fans them out.'] },
            { cells: ['6', 'Implicit ApplicationPending', 'Immediately after responding <code>200</code> or <code>204</code> to the PATCH, the LFI MUST PATCH the quote-log with <code>QuoteStatus: ApplicationPending</code> so the TPP — whether polling or subscribed — sees a consistent first status. This is the entry point to the application lifecycle.'] },
          ],
        } },
      ],
    },
    {
      id: 'create-policy',
      num: '04',
      method: 'POST',
      path: '/{type}-insurance-policies',
      title: 'Create Policy',
      blocks: [
        { kind: 'prose', html: 'After the application has been progressed (KYC collected, payment confirmed where the TPP hosts it), the TPP calls <code>POST /{type}-insurance-policies</code> with the originating <code>QuoteId</code> and any data the LFI requires to finalise issuance. The LFI runs its BAU policy creation flow.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', '<code>QuoteId</code> binding', 'The request body MUST reference a <code>QuoteId</code> that this TPP previously accepted at this LFI under the same sector. If the quote is not in a state that permits policy issuance (e.g. application has not reached <code>ApplicationApproved</code> on TPP-Led, or the quote is terminal), reject with <code>409</code>.'] },
            { cells: ['2', 'Quote sector match', 'The sector slug in the URL path MUST match the sector the quote was issued under. A mismatch MUST return <code>404</code>.'] },
            { cells: ['3', 'TPP-supplied data', 'For TPP-Led quotes, the request body carries the KYC data the TPP collected. Validate it against the same rules your LFI applies internally. If any field fails (Emirates ID mismatch, prohibited customer, etc.) reject with <code>400</code> and explain via <code>errorCode</code> / <code>errorMessage</code>.'] },
            { cells: ['4', 'Idempotency', 'If a previous <code>POST /{type}-insurance-policies</code> against the same <code>QuoteId</code> has already produced a policy, return the existing policy reference rather than minting a new one. Repeated calls with the same payload MUST be safe.'] },
            { cells: ['5', 'Status emission', 'On successful policy issuance, the LFI MUST PATCH the quote-log to <code>PolicyIssued</code> with the issued <code>InsurancePolicyId</code> (LFI-Led) or with <code>Documents</code> attached (TPP-Led) — and then to <code>Completed</code> once any post-issuance work has settled. See <a href="#status-updates">Status Updates</a>.'] },
          ],
        } },
      ],
    },
    {
      id: 'status-updates',
      num: '05',
      method: 'PATCH',
      path: '/insurance-quote-log/{logId}',
      title: 'Status Updates (Quote Log)',
      blocks: [
        { kind: 'prose', html: 'The quote lifecycle is observable to TPPs through events the LFI emits to the Hub. The LFI PATCHes <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>/insurance-quote-log/{logId}</code></a> with the new <code>QuoteStatus</code>; the Hub records it and, where the TPP has subscribed via the <code>Subscription</code> object on the original PATCH Accept Quote, delivers an event to the TPP\'s webhook. <code>logId</code> is the same value as the <code>QuoteId</code>. The event body conforms to one of three schemas drawn from the Hub spec — terminal, pending-completion, or completed.' },
        { kind: 'table', table: {
          headers: ['#', 'Status', 'When the LFI emits it'],
          rows: [
            { cells: ['1', '<code>ApplicationPending</code>', 'Immediately after the LFI responds to PATCH Accept Quote. Signals that the application has been registered and is awaiting next steps (KYC for TPP-Led, internal processing for LFI-Led).'] },
            { cells: ['2', '<code>ApplicationApproved</code>', '<strong>TPP-Led only.</strong> The LFI has approved the application based on TPP-supplied KYC and is ready for the customer to pay. The event MUST include a <code>BrokerInstructions</code> array containing a <code>Url</code> (the LFI-hosted payment page) for the TPP to redirect the customer to.'] },
            { cells: ['3', '<code>PaymentRequired</code>', 'Used where payment hand-off occurs outside the standard ApplicationApproved transition (e.g. mid-flow premium adjustment). Carries <code>BrokerInstructions</code> with the payment URL.'] },
            { cells: ['4', '<code>PolicyIssued</code>', 'The LFI has issued the policy. On LFI-Led, attach the <code>InsurancePolicyId</code>. On TPP-Led, attach the policy <code>Documents</code> (Policy Booklet, Terms & Conditions, etc.) as base64 with SHA-256 hashes so the TPP can verify integrity and surface them to the customer.'] },
            { cells: ['5', '<code>Completed</code>', 'Final terminal state for a successful flow. Carries the finalised <code>Premium</code> breakdown, <code>PolicyTerm</code>, <code>PolicyStartDate</code>/<code>PolicyEndDate</code>, <code>CustomerPaidInFull</code>, <code>PolicyCountrySubDivision</code>, and (where applicable) the <code>Commission</code> due to the TPP. No further events follow.'] },
            { cells: ['6', '<code>Expired</code> / <code>Rejected</code> / <code>CustomerCancelled</code> / <code>LFICancelled</code>', 'Negative terminal states. Emit when the quote times out, the LFI declines to proceed, the customer abandons, or the LFI cancels mid-flow. Include a free-text <code>Reason</code> where possible. No further events follow.'] },
          ],
        } },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Status ordering', 'The LFI MUST NOT emit a later status before an earlier one. The valid forward sequence is: <code>ApplicationPending</code> → (optional <code>ApplicationApproved</code> / <code>PaymentRequired</code>) → <code>PolicyIssued</code> → <code>Completed</code>. Any negative terminal status (<code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>, <code>LFICancelled</code>) may be emitted from any non-terminal state.'] },
            { cells: ['2', 'No status regression', 'Once a terminal status (<code>Completed</code> or any negative terminal) has been emitted, the LFI MUST NOT emit any further events for that <code>logId</code>. Subsequent PATCHes will be rejected by the Hub with <code>400</code>.'] },
            { cells: ['3', 'BrokerInstructions URL', 'When emitting <code>ApplicationApproved</code> or <code>PaymentRequired</code> in TPP-Led mode where the TPP is to host the customer through payment, the <code>BrokerInstructions[].Url</code> MUST be an HTTPS URL the customer can be redirected to. The URL is single-use and tied to the application; the LFI MUST invalidate it after first redemption or after a reasonable session window.'] },
            { cells: ['4', 'Document delivery', 'When emitting <code>PolicyIssued</code> in TPP-Led mode, all documents that would normally be delivered to the customer (Policy Booklet, Terms & Conditions, IPID, etc.) MUST be attached as base64-encoded <code>Documents</code> entries with matching SHA-256 hashes. The TPP becomes the document delivery channel — the LFI MUST NOT email or post them separately.'] },
            { cells: ['5', 'Reliability', 'The Hub treats <code>PATCH /insurance-quote-log/{logId}</code> as fire-and-forget from the LFI\'s perspective once a <code>204</code> is returned. If the Hub responds with <code>4xx</code> or <code>5xx</code>, the LFI MUST retry with exponential backoff. Lost events leave subscribed TPPs blind to the lifecycle and MUST NOT be tolerated.'] },
          ],
        } },
      ],
    },
    {
      id: 'quote-id-stewardship',
      num: '06',
      title: 'QuoteId Stewardship',
      blocks: [
        { kind: 'prose', html: 'The <code>QuoteId</code> is the single identifier that threads the entire lifecycle — quote retrieval, acceptance, policy creation, and every status update emitted to the quote-log. The LFI is the sole authority for minting <code>QuoteId</code> values.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule', 'Detail'],
          rows: [
            { cells: ['1', 'Uniqueness', 'Each <code>QuoteId</code> MUST be globally unique within the LFI. UUIDv4 is recommended.'] },
            { cells: ['2', 'Persistence', 'The LFI MUST persist the <code>QuoteId</code> for the policy retention period applicable to the sector (typically aligned with the five-year retention floor that applies to issued policies). The <code>QuoteId</code> MUST remain retrievable via <code>GET /{type}-insurance-quotes/{QuoteId}</code> even in terminal states for the lifetime of any policy that may have been issued from it.'] },
            { cells: ['3', 'Cross-sector isolation', 'A <code>QuoteId</code> belongs to a single sector and is not transferable. The same UUID MUST NOT be re-issued for a different sector.'] },
            { cells: ['4', 'TPP scoping', 'A <code>QuoteId</code> belongs to the TPP that created it. Any GET, PATCH, or POST referencing it MUST verify ownership via <code>o3-caller-client-id</code> before responding.'] },
          ],
        } },
      ],
    },
  ],
}
