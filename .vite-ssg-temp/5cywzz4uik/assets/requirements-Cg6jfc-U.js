import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Variable On Demand — Requirements",
  version: "v2.2-rc1",
  readTime: "10 min",
  lede: 'The <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: "The tables below list the rules that apply to Variable On Demand. All request validation of the TPP's credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoint is called. The rules below cover what your Ozone Connect endpoint must validate and what it must return.",
  sections: [
    {
      id: "consent-validation",
      num: "01",
      title: "Consent Validation",
      blocks: [
        { kind: "prose", html: 'When a TPP creates a consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil.' },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Unsupported <code>standardVersion</code>", `The consent's <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent payment initiation requests. If you do not support that version for the Payment Initiation API family, respond with <code>invalid</code>. <br><br> Where you are dual-running multiple versions during a deprecation window (see <a href="/policy/lfi-deprecation">Major Version Deprecation</a>) — for example <code>v2.0</code> alongside <code>v3.1</code> — you MUST respond <code>valid</code> for every version you serve. <br><br> Minor versions are backward compatible (see <a href="/policy/version-management">Version Management</a>), so prior minors within each major you run are also valid (e.g. running <code>v2.0</code> and <code>v3.1</code> means <code>v2.0</code>, <code>v3.0</code>, and <code>v3.1</code> all resolve to <code>valid</code>).`] },
            { cells: ["2", "<code>consent.PersonalIdentifiableInformation</code>", 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/">PII schema</a>. If decryption fails or the payload contains additional or undocumented parameters, respond with <code>invalid</code>.'] },
            { cells: ["3", "<code>Initiation.DebtorAccount</code>", "If provided, validate that the account is a UAE IBAN held at this LFI, reachable through this API Hub integration, and in a state that permits payment initiation (not blocked, dormant, or closed). If any check fails, respond with <code>invalid</code>."] },
            { cells: ["4", "<code>Initiation.Creditor</code>", '<code>Initiation.Creditor</code> is optional. If provided, it must contain 1–10 creditor entries. Validate that each creditor is a valid UAE domestic creditor — the account is reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the state of the receiving account can be determined, able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply to every entry — see <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>. If any check fails, respond with <code>invalid</code>.'] },
            { cells: ["5", "Payment type not supported", "Variable On Demand must be advertised as supported for the requested beneficiary model via the corresponding flag on your authorisation server entry in the Trust Framework: <code>ApiMetadata.VariableOnDemand.SingleBeneficiarySupported</code> (exactly 1 creditor entry), <code>ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported</code> (2–10 entries), or <code>ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported</code> (<code>Initiation.Creditor</code> omitted). If the LFI has not advertised support for the requested beneficiary model, respond with <code>invalid</code>."] },
            { cells: ["6", "Invalid <code>BaseConsentId</code>", "If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI and belonging to the same end user.</li><li>The referenced consent is a Service Initiation consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:service-initiation-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>."] },
            { cells: ["7", "<code>consent.CurrencyRequest</code>", "Must not be present. Domestic payments are denominated in AED only; <code>CurrencyRequest</code> is for non-local currency and international transfers. If present, respond with <code>invalid</code>."] }
          ]
        } }
      ]
    },
    {
      id: "authorization-account-selection",
      num: "02",
      title: "Authorization — Account Selection",
      blocks: [
        { kind: "prose", html: 'The generic <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey. The rules below cover the additional account selection logic specific to Variable On Demand. During the consent authorization journey, the customer selects the account to be debited for payments under this consent. The LFI is responsible for presenting only accounts eligible to initiate the payment and applying any constraints the TPP has specified in the consent.' },
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>Initiation.DebtorAccount</code>", "If <code>Initiation.DebtorAccount</code> was provided on the consent, only that account may be used — do not present an account selection screen. If the authenticated customer does not hold the specified account, PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_does_not_own_debtor_account</code>."] },
            { cells: ["2", "<code>consent.IsSingleAuthorization</code>", 'If <code>true</code>, only accounts the authenticated customer can solely authorize (no subsequent approvers required) may be offered and selected. If <code>false</code> or not provided (default), accounts where the customer is one of multiple required authorizers may also be offered; subsequent authorizers must then approve the consent before it reaches <code>Authorized</code> status and payments can be executed. See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/multi-authorization">Multi-Authorization</a>.'] },
            { cells: ["3", "No eligible accounts", 'If the authenticated customer does not hold any account eligible to initiate a payment under this consent (including the <code>IsSingleAuthorization</code> constraint above), PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>. See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a> for details.'] },
            { cells: ["4", "Single selection", "The account selection screen must allow the customer to select exactly one account to be debited. A consent with no account selected must not be authorised."] }
          ]
        } }
      ]
    },
    {
      id: "payment-execution",
      num: "03",
      method: "POST",
      path: "/payments",
      title: "Payment Execution",
      blocks: [
        { kind: "prose", html: 'When the TPP initiates a payment under an authorized consent, the API Hub validates the access token, consent status, amount/currency consistency with the consent, and OpenAPI schema before forwarding the request to your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments"><code>POST /payments</code></a> endpoint. The rules below cover what your Ozone Connect endpoint must validate on receipt. Error responses MUST conform to the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a> — the <code>errorCode</code> values referenced below are drawn from the error schema matching the returned HTTP status (<code>Error400</code>, <code>Error403</code>, or <code>Error409</code>).' },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "<code>PersonalIdentifiableInformation</code>", 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments">Domestic Payment PII Schema Object (<code>POST /payments</code>)</a>. Note that <code>DebtorAccount</code> is not part of the payment-time PII (the debtor is fixed by the consent) and <code>Initiation.Creditor</code> is a single object rather than an array. Reject with HTTP <code>400</code> and:<ul><li><code>errorCode</code>: <code>JWE.DecryptionError</code> — if decryption of the PII payload fails.</li><li><code>errorCode</code>: <code>Body.InvalidFormat</code> — if any required property is missing, of the wrong type, or the payload contains additional or undocumented properties (<code>additionalProperties: false</code>).</li></ul>'] },
            { cells: ["2", "<code>PersonalIdentifiableInformation</code> (Creditor)", 'Variable On Demand consents can carry 1–10 creditor entries, or omit <code>Initiation.Creditor</code> entirely (the "open beneficiaries" model). <br><br> <strong>If <code>Initiation.Creditor</code> was provided at consent time</strong>, the submitted creditor on the payment request MUST exactly match one of the 1–10 consent-time entries — see <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a> for the match rules. If it matches none of the entries, reject with HTTP <code>400</code> <code>errorCode</code>: <code>Consent.FailsControlParameters</code>. <br><br> <strong>If <code>Initiation.Creditor</code> was omitted at consent time</strong>, the creditor validation that would normally run at consent-validate MUST be performed here instead. The LFI MUST validate that the submitted creditor is a valid UAE domestic creditor — the account is reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the state of the receiving account can be determined, able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply. If any check fails, reject with HTTP <code>400</code> <code>errorCode</code>: <code>Consent.FailsControlParameters</code>.'] },
            { cells: ["3", "Sufficient funds", "The debtor account must have sufficient available funds to cover <code>Initiation.InstructedAmount</code> at the time the payment is received, taking into account any holds, pending transactions, and overdraft limits applied by the LFI. If the account has insufficient funds, reject with HTTP <code>400</code> <code>errorCode</code>: <code>GenericError</code> and <code>errorMessage</code>: <code>Payment rejected due to insufficient funds</code>."] },
            { cells: ["4", "Debtor account — temporarily unavailable", "The debtor account selected at consent authorization must still be in a state that permits payment initiation at the time the payment is received. If the account is <code>Inactive</code>, <code>Dormant</code>, or <code>Suspended</code>, reject with HTTP <code>403</code> <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is temporarily blocked.</code>"] },
            { cells: ["5", "Debtor account — permanently unavailable", "If the debtor account has become <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code> since consent authorization, reject with HTTP <code>403</code> <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is permanently inaccessible.</code>"] },
            { cells: ["6", "Duplicate payment in flight", "Before creating the payment record, the LFI MUST check whether another payment under the same consent with the same <code>Initiation.Creditor</code> and the same <code>Initiation.InstructedAmount</code> (currency and value) is currently in <code>Pending</code> status. If so, reject the new payment as a duplicate with HTTP <code>409</code> <code>errorCode</code>: <code>Payment.DuplicateInFlight</code> and <code>errorMessage</code>: <code>A payment with the same creditor and amount is already in flight under this consent.</code> Once the prior payment has left <code>Pending</code> (reached <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code>, or <code>Rejected</code>), a subsequent identical payment is permitted. <br><br> This check is distinct from <code>x-idempotency-key</code> handling — idempotency keys protect against network-retry of the same request, whereas this rule catches genuinely duplicate payment intents submitted under different keys."] }
          ]
        } },
        { kind: "prose", html: 'If all validations above pass, the LFI MUST create the payment record in its systems and return HTTP <code>201</code> with the generated <code>PaymentId</code> per the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a>. Full response handling is covered in the <a href="./api-guide">API Guide</a>.' }
      ]
    },
    {
      id: "screening-checks",
      num: "04",
      title: "Screening Checks",
      blocks: [
        { kind: "prose", html: `Once the payment record has been created, the LFI MUST apply its standard fraud, sanctions, and AML screening controls before the payment is submitted to the domestic rail. These checks are the LFI's responsibility and follow the LFI's own policies and regulatory obligations. Screening may result in the payment being held, rejected, or referred for manual review after the <code>201</code> response has been returned to the TPP. The outcome MUST be reflected in the payment's <code>Status</code> and surfaced via <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments"><code>GET /payments/{paymentId}</code></a> so the TPP can observe the final state.` },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Screening duration", "Screening checks SHOULD complete within <strong>3 seconds</strong> of the payment record being created. This is a target, not a hard cutoff — where the LFI's controls require longer (for example, referral for manual review), the payment remains in <code>Pending</code> and the final outcome is reflected when available. A payment MUST NOT be rejected solely because screening exceeded 3 seconds."] },
            { cells: ["2", "Screening failure — notify API Hub", `If a screening check fails, the LFI MUST immediately call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> on the API Hub Consent Manager with <code>paymentResponse.status</code>: <code>Rejected</code> and a <code>paymentResponse.RejectReasonCode</code> entry. The entry's <code>Code</code> MUST use the <code>LFI.</code> namespace (the check that failed is in the LFI's systems, not AANI or UAEFTS), matching the pattern <code>^LFI\\.[A-Za-z0-9]+$</code>. The <code>Message</code> MUST be sanitised for onward relay to the TPP — it MUST NOT reveal detection logic, sanctions list matches, or internal case identifiers. <br><br> <strong>Example:</strong> <br> <code>Code</code>: <code>LFI.ScreeningRejected</code> <br> <code>Message</code>: <code>Payment rejected by LFI screening controls.</code>`] }
          ]
        } }
      ]
    },
    {
      id: "rail-submission",
      num: "05",
      title: "Rail Submission",
      blocks: [
        { kind: "prose", html: "Once the payment has passed screening, the LFI MUST submit it to the domestic rails for processing. AANI is the primary rail for Variable On Demand payments; UAEFTS is the fallback." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Submit to AANI", "Once screening has passed, the LFI MUST immediately submit the payment to AANI for processing."] },
            { cells: ["2", "Fallback to UAEFTS", "If AANI is unavailable for any reason — including the AANI service being degraded or unreachable, or the receiving bank being unable to receive the payment via AANI — the LFI MUST fall back to UAEFTS and submit the payment there. The fallback decision MUST NOT require TPP or customer intervention."] },
            { cells: ["3", "Propagate status changes to the API Hub", `Whenever a rail status change at AANI or UAEFTS maps to a change in the payment's Open Finance status, the LFI MUST immediately call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> on the API Hub Consent Manager to update <code>paymentResponse.status</code> to the new Open Finance status. Rail statuses that are deliberately not mapped (see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</a>) do not require a PATCH; the mapping document is the source of truth for which rail transitions are reportable.`] },
            { cells: ["4", "<code>paymentTransactionId</code> propagation", 'Once AANI or UAEFTS assigns the end-to-end identifier for the payment (the IPP identifier for AANI, or the equivalent for UAEFTS), the LFI MUST include it as <code>paymentTransactionId</code> on the next <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a> — ideally on the same PATCH as the accompanying status transition. Once set, <code>paymentTransactionId</code> MUST NOT be changed. Note that <code>paymentTransactionId</code> identifies the payment instruction on the rail and is distinct from the Bank Data Sharing <code>transactionId</code> (which identifies a ledger entry).'] },
            { cells: ["5", "Rail rejection — reject reason code", "If the payment is rejected by AANI or UAEFTS, the LFI MUST populate <code>paymentResponse.RejectReasonCode</code> on the <code>PATCH /payment-log/{id}</code> call. The <code>Code</code> MUST use the namespace of the rail that rejected the payment (<code>AANI.</code> or <code>FTS.</code>, matching the spec pattern <code>^(AANI|FTS)\\.[A-Za-z0-9]+$</code>), with the specific reason code mapped directly from the rail's originating rejection code. The <code>Message</code> MUST be sanitised for onward relay to the TPP. <br><br> <strong>Example:</strong> <br> <code>Code</code>: <code>AANI.AM04</code> <br> <code>Message</code>: <code>Payment request cannot be executed as insufficient funds at debtor account.</code>"] },
            { cells: ["6", "<code>PATCH /payment-log/{id}</code> delivery", "The LFI MUST treat Consent Manager updates as durable — <code>status</code>, <code>paymentTransactionId</code>, and <code>RejectReasonCode</code> changes cannot be dropped. If a PATCH fails with a transient error (HTTP <code>5xx</code>, connection error, or timeout), the LFI MUST retry with exponential backoff until the update is accepted; updates that cannot be delivered immediately MUST be queued and retried rather than abandoned. A PATCH rejected with a <code>4xx</code> response indicates a client-side issue that retry will not fix — the LFI MUST NOT retry in this case and MUST raise the failure for operational investigation."] }
          ]
        } }
      ]
    },
    {
      id: "payment-status-retrieval",
      num: "06",
      method: "GET",
      path: "/payments/{paymentId}",
      title: "Payment Status Retrieval",
      blocks: [
        { kind: "prose", html: "The TPP may use <code>GET /payments/{paymentId}</code> to retrieve the current status of a payment it has initiated. The API Hub validates the access token and consent, then forwards the request to your Ozone Connect endpoint." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Sustain period", "The LFI MUST continue to serve <code>GET /payments/{paymentId}</code> for at least <strong>1 year from the creation date of the payment</strong>. Within this window, the endpoint MUST return the current <code>Status</code> of the payment, reflecting any subsequent state changes (e.g. screening outcomes, rail settlement, reversal)."] },
            { cells: ["2", "Status consistency with the API Hub", `The <code>Status</code> returned by <code>GET /payments/{paymentId}</code> MUST exactly match the status most recently PATCHed to the API Hub Consent Manager via <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a>. The LFI is responsible for keeping the two representations in lockstep — any status change in the LFI's systems MUST be reflected on both surfaces before the change is observable to the TPP.`] },
            { cells: ["3", "<code>paymentTransactionId</code> consistency", "Once the rail has assigned an end-to-end identifier and the LFI has PATCHed it to the Consent Manager, <code>GET /payments/{paymentId}</code> MUST return the same <code>paymentTransactionId</code>. Before the rail has assigned one, <code>paymentTransactionId</code> MUST be omitted from the response rather than returned as an empty string."] }
          ]
        } }
      ]
    },
    {
      id: "parity-and-constraints",
      num: "07",
      title: "Parity and Treatment Constraints",
      blocks: [
        { kind: "prose", html: `These requirements govern how the LFI may treat Open Finance initiated payments relative to its own banking channels. They apply alongside &mdash; and do not override &mdash; the LFI's standard fraud, sanctions, and AML controls, which remain the LFI's responsibility (see <a href="#screening-checks">Screening Checks</a>).` },
        { kind: "table", table: {
          headers: ["#", "Requirement", "Detail"],
          rows: [
            { cells: ["1", "No timing constraints", "The LFI MUST NOT impose timing constraints on Open Finance initiated payments. Cooling-off periods for new beneficiaries with reduced transactional limits, or other constraints related to the number or value of payment transactions, MUST NOT be applied to Open Finance initiated payments. <br><br> This does not restrict the LFI's own channels: if the customer subsequently attempts a payment through the LFI's own channels to a beneficiary that was saved during an Open Finance journey, the LFI MAY block or delay that payment under its existing cooling-off policy for that account."] },
            { cells: ["2", "Parity with other digital channels", "Transaction limits and other constraints applied to Open Finance services MUST NOT be more restrictive than those applied across the LFI's other commonly used banking digital channels. This establishes parity, ensuring the customer experience is consistent regardless of the digital channel used."] }
          ]
        } }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-792f6173><section class="ed-req-hero" data-v-792f6173><div class="ed-req-hero__inner" data-v-792f6173><div class="ed-req-hero__label" data-v-792f6173><span class="ed-req-hero__label-dash" data-v-792f6173></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-792f6173>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-792f6173>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-792f6173>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-792f6173>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-792f6173>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-792f6173${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-792f6173${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-792f6173${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-792f6173${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-792f6173${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-792f6173${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-792f6173${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-792f6173${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-792f6173${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-792f6173${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-792f6173${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-792f6173${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-792f6173${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-792f6173${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-792f6173${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-792f6173${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-792f6173${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-792f6173${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-792f6173${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-792f6173${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-792f6173${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-792f6173${_scopeId}><span class="ed-req-validator__label" data-v-792f6173${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-792f6173${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-792f6173${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-792f6173${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-792f6173${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-792f6173${_scopeId}><h3 class="ed-req-sub__heading" data-v-792f6173${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-792f6173${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-792f6173${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-792f6173${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-792f6173${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-792f6173${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-792f6173${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-792f6173${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-792f6173${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-792f6173${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-792f6173${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-792f6173${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-792f6173${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-792f6173${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-792f6173${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-792f6173${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-792f6173${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-792f6173${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-792f6173"]]);
export {
  requirements as default
};
