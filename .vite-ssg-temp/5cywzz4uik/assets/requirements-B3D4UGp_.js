import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Insurance Quotation — Requirements",
  version: "v2.1",
  readTime: "12 min",
  lede: "The Insurance Quotation flow runs on the Client Credentials Grant — there is no per-customer consent. TPPs authenticate as themselves, request a quote, and (where the customer accepts) drive the application through to policy issuance. Your Ozone Connect endpoints execute the quote and policy lifecycle; status updates flow back to subscribed TPPs through the Hub.",
  preconditions: `The tables below list the rules that apply to Insurance Quotation. All request validation of the TPP's credentials, access token, and OpenAPI schema is performed by the Hub before your Ozone Connect endpoints are called. The rules below cover what your Ozone Connect endpoints must validate and what they must return, and what your LFI must emit through the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>PATCH /insurance-quote-log/{logId}</code></a> callback to keep the Hub and any subscribed TPP webhooks in sync.`,
  sections: [
    {
      id: "create-quote",
      num: "01",
      method: "POST",
      path: "/{type}-insurance-quotes",
      title: "Create Quote",
      blocks: [
        { kind: "prose", html: "When a TPP requests a quote, the Hub validates the access token and OpenAPI schema, then proxies the request to your Ozone Connect <code>POST /{type}-insurance-quotes</code> endpoint with the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>) baked into the path. Your endpoint receives the customer's quote request and either returns one-or-more quotes (<code>201</code>) or declines to quote (<code>204</code>)." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Sector support", "The sector slug in the URL path indicates which insurance type the TPP is requesting. If your LFI does not underwrite the requested sector, return <code>404</code>. Only mount endpoints for sectors you actually offer; the Hub will not route requests for unmounted sectors."] },
            { cells: ["2", "Quote Type", 'The request body carries a <code>QuoteType</code> of <code>New</code>, <code>Renewal</code>, or <code>Switch</code>. See <a href="./quote-types">Quote Types</a> for the per-type validation differences (e.g. <code>Renewal</code> references a prior policy, <code>Switch</code> references an incumbent insurer). If the requested <code>QuoteType</code> cannot be supported for the sector (e.g. the LFI does not support switching for Travel), return <code>204</code> with an empty body.'] },
            { cells: ["3", "Multi-quote response", "The <code>201</code> response carries a <code>data</code> array of one-or-more quotes. Each entry must include a unique <code>QuoteId</code> the LFI generates and persists — the TPP uses this ID to retrieve, accept, or reject the quote. Populate every field marked required by the per-sector quote schema."] },
            { cells: ["4", "Decline to quote", "If your underwriting rules cannot produce any quote that meets the request (e.g. risk profile out of appetite, vehicle/property out of supported scope), return <code>204</code> with an empty body. Do not return a <code>201</code> with an empty <code>data</code> array."] },
            { cells: ["5", "Quote validity window", 'Each <code>QuoteId</code> MUST remain retrievable and acceptable for the validity period the LFI advertises on the quote (typically 14–30 days). After expiry, retrievals MUST still return the quote in a <code>Expired</code> terminal state via the <a href="#status-updates">quote-log</a> rather than <code>404</code> — TPPs need to be able to display an expiry reason.'] },
            { cells: ["6", "No subscription handling", "The <code>Subscription</code> object on the request body is the TPP's webhook configuration. It is consumed by the Hub for event delivery — the LFI MUST NOT act on it. The LFI's only obligation is to emit status events via <code>PATCH /insurance-quote-log/{logId}</code>; the Hub fans those out to any subscribed TPP webhook."] }
          ]
        } }
      ]
    },
    {
      id: "retrieve-quote",
      num: "02",
      method: "GET",
      path: "/{type}-insurance-quotes/{QuoteId}",
      title: "Retrieve Quote",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Quote ownership", "Return the quote only if the <code>QuoteId</code> was created in response to a request from the same TPP (identified by the Hub via <code>o3-caller-client-id</code>). If the quote belongs to a different TPP, return <code>404</code> — do not leak quote existence across TPPs."] },
            { cells: ["2", "Sector match", "The sector slug in the URL path MUST match the sector the quote was created under. A motor <code>QuoteId</code> requested via <code>/home-insurance-quotes/{QuoteId}</code> MUST return <code>404</code>."] },
            { cells: ["3", "Current state", 'Return the quote in its current state. If the quote has progressed past <code>Accepted</code> into the application lifecycle, include the latest <code>QuoteStatus</code> drawn from the same vocabulary the LFI emits on the quote-log (see <a href="#status-updates">Status Updates</a>).'] }
          ]
        } }
      ]
    },
    {
      id: "accept-quote",
      num: "03",
      method: "PATCH",
      path: "/{type}-insurance-quotes/{QuoteId}",
      title: "Accept Quote",
      blocks: [
        { kind: "prose", html: "The TPP calls PATCH on the quote to indicate the customer has accepted, kicking off the application lifecycle. The response declares <code>PolicyIssuanceAllowed</code> — the steps the LFI permits the TPP to handle (TPP-Led mode) or retains for itself (LFI-Led mode). This declaration drives whether the TPP collects KYC, hosts payment, and issues policy documents, or whether your LFI does." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Quote ownership", "Accept the PATCH only if the <code>QuoteId</code> was created in response to a request from the same TPP. Reject with <code>404</code> otherwise — do not return <code>403</code> (which would confirm the quote exists)."] },
            { cells: ["2", "Quote validity", "If the quote has expired or has already been progressed past <code>Accepted</code>, reject with <code>409</code>. The TPP should retrieve the quote to see its current state."] },
            { cells: ["3", "PolicyIssuanceAllowed — LFI-Led", "For LFI-Led quotes (your LFI hosts customer verification, payment, and documents), return <code>204</code> with no body. The TPP knows the quote has been accepted and will await status updates emitted through the quote-log."] },
            { cells: ["4", "PolicyIssuanceAllowed — TPP-Led", 'For TPP-Led quotes, return <code>200</code> with <code>data.PolicyIssuanceAllowed</code> set to the steps the TPP may perform: <code>CustomerVerification</code>, <code>Payment</code>, and <code>PolicyDocuments</code>. All three booleans are required. Where the TPP hosts payment, the LFI MUST emit a <code>PaymentRequired</code> or <code>ApplicationApproved</code> event with a <code>BrokerInstructions[].Url</code> that the TPP redirects the customer to (see <a href="#status-updates">Status Updates</a>).'] },
            { cells: ["5", "Subscription not consumed by LFI", "The <code>Subscription</code> object is the TPP's webhook registration for the Hub's event delivery. The Hub stores it; the LFI MUST NOT act on it. Your only obligation is to emit status events through <code>PATCH /insurance-quote-log/{logId}</code> and the Hub fans them out."] },
            { cells: ["6", "Implicit ApplicationPending", "Immediately after responding <code>200</code> or <code>204</code> to the PATCH, the LFI MUST PATCH the quote-log with <code>QuoteStatus: ApplicationPending</code> so the TPP — whether polling or subscribed — sees a consistent first status. This is the entry point to the application lifecycle."] }
          ]
        } }
      ]
    },
    {
      id: "create-policy",
      num: "04",
      method: "POST",
      path: "/{type}-insurance-policies",
      title: "Create Policy",
      blocks: [
        { kind: "prose", html: "After the application has been progressed (KYC collected, payment confirmed where the TPP hosts it), the TPP calls <code>POST /{type}-insurance-policies</code> with the originating <code>QuoteId</code> and any data the LFI requires to finalise issuance. The LFI runs its BAU policy creation flow." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "<code>QuoteId</code> binding", "The request body MUST reference a <code>QuoteId</code> that this TPP previously accepted at this LFI under the same sector. If the quote is not in a state that permits policy issuance (e.g. application has not reached <code>ApplicationApproved</code> on TPP-Led, or the quote is terminal), reject with <code>409</code>."] },
            { cells: ["2", "Quote sector match", "The sector slug in the URL path MUST match the sector the quote was issued under. A mismatch MUST return <code>404</code>."] },
            { cells: ["3", "TPP-supplied data", "For TPP-Led quotes, the request body carries the KYC data the TPP collected. Validate it against the same rules your LFI applies internally. If any field fails (Emirates ID mismatch, prohibited customer, etc.) reject with <code>400</code> and explain via <code>errorCode</code> / <code>errorMessage</code>."] },
            { cells: ["4", "Idempotency", "If a previous <code>POST /{type}-insurance-policies</code> against the same <code>QuoteId</code> has already produced a policy, return the existing policy reference rather than minting a new one. Repeated calls with the same payload MUST be safe."] },
            { cells: ["5", "Status emission", 'On successful policy issuance, the LFI MUST PATCH the quote-log to <code>PolicyIssued</code> with the issued <code>InsurancePolicyId</code> (LFI-Led) or with <code>Documents</code> attached (TPP-Led) — and then to <code>Completed</code> once any post-issuance work has settled. See <a href="#status-updates">Status Updates</a>.'] }
          ]
        } }
      ]
    },
    {
      id: "status-updates",
      num: "05",
      method: "PATCH",
      path: "/insurance-quote-log/{logId}",
      title: "Status Updates (Quote Log)",
      blocks: [
        { kind: "prose", html: `The quote lifecycle is observable to TPPs through events the LFI emits to the Hub. The LFI PATCHes <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>/insurance-quote-log/{logId}</code></a> with the new <code>QuoteStatus</code>; the Hub records it and, where the TPP has subscribed via the <code>Subscription</code> object on the original PATCH Accept Quote, delivers an event to the TPP's webhook. <code>logId</code> is the same value as the <code>QuoteId</code>. The event body conforms to one of three schemas drawn from the Hub spec — terminal, pending-completion, or completed.` },
        { kind: "table", table: {
          headers: ["#", "Status", "When the LFI emits it"],
          rows: [
            { cells: ["1", "<code>ApplicationPending</code>", "Immediately after the LFI responds to PATCH Accept Quote. Signals that the application has been registered and is awaiting next steps (KYC for TPP-Led, internal processing for LFI-Led)."] },
            { cells: ["2", "<code>ApplicationApproved</code>", "<strong>TPP-Led only.</strong> The LFI has approved the application based on TPP-supplied KYC and is ready for the customer to pay. The event MUST include a <code>BrokerInstructions</code> array containing a <code>Url</code> (the LFI-hosted payment page) for the TPP to redirect the customer to."] },
            { cells: ["3", "<code>PaymentRequired</code>", "Used where payment hand-off occurs outside the standard ApplicationApproved transition (e.g. mid-flow premium adjustment). Carries <code>BrokerInstructions</code> with the payment URL."] },
            { cells: ["4", "<code>PolicyIssued</code>", "The LFI has issued the policy. On LFI-Led, attach the <code>InsurancePolicyId</code>. On TPP-Led, attach the policy <code>Documents</code> (Policy Booklet, Terms & Conditions, etc.) as base64 with SHA-256 hashes so the TPP can verify integrity and surface them to the customer."] },
            { cells: ["5", "<code>Completed</code>", "Final terminal state for a successful flow. Carries the finalised <code>Premium</code> breakdown, <code>PolicyTerm</code>, <code>PolicyStartDate</code>/<code>PolicyEndDate</code>, <code>CustomerPaidInFull</code>, <code>PolicyCountrySubDivision</code>, and (where applicable) the <code>Commission</code> due to the TPP. No further events follow."] },
            { cells: ["6", "<code>Expired</code> / <code>Rejected</code> / <code>CustomerCancelled</code> / <code>LFICancelled</code>", "Negative terminal states. Emit when the quote times out, the LFI declines to proceed, the customer abandons, or the LFI cancels mid-flow. Include a free-text <code>Reason</code> where possible. No further events follow."] }
          ]
        } },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Status ordering", "The LFI MUST NOT emit a later status before an earlier one. The valid forward sequence is: <code>ApplicationPending</code> → (optional <code>ApplicationApproved</code> / <code>PaymentRequired</code>) → <code>PolicyIssued</code> → <code>Completed</code>. Any negative terminal status (<code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>, <code>LFICancelled</code>) may be emitted from any non-terminal state."] },
            { cells: ["2", "No status regression", "Once a terminal status (<code>Completed</code> or any negative terminal) has been emitted, the LFI MUST NOT emit any further events for that <code>logId</code>. Subsequent PATCHes will be rejected by the Hub with <code>400</code>."] },
            { cells: ["3", "BrokerInstructions URL", "When emitting <code>ApplicationApproved</code> or <code>PaymentRequired</code> in TPP-Led mode where the TPP is to host the customer through payment, the <code>BrokerInstructions[].Url</code> MUST be an HTTPS URL the customer can be redirected to. The URL is single-use and tied to the application; the LFI MUST invalidate it after first redemption or after a reasonable session window."] },
            { cells: ["4", "Document delivery", "When emitting <code>PolicyIssued</code> in TPP-Led mode, all documents that would normally be delivered to the customer (Policy Booklet, Terms & Conditions, IPID, etc.) MUST be attached as base64-encoded <code>Documents</code> entries with matching SHA-256 hashes. The TPP becomes the document delivery channel — the LFI MUST NOT email or post them separately."] },
            { cells: ["5", "Reliability", "The Hub treats <code>PATCH /insurance-quote-log/{logId}</code> as fire-and-forget from the LFI's perspective once a <code>204</code> is returned. If the Hub responds with <code>4xx</code> or <code>5xx</code>, the LFI MUST retry with exponential backoff. Lost events leave subscribed TPPs blind to the lifecycle and MUST NOT be tolerated."] }
          ]
        } }
      ]
    },
    {
      id: "quote-id-stewardship",
      num: "06",
      title: "QuoteId Stewardship",
      blocks: [
        { kind: "prose", html: "The <code>QuoteId</code> is the single identifier that threads the entire lifecycle — quote retrieval, acceptance, policy creation, and every status update emitted to the quote-log. The LFI is the sole authority for minting <code>QuoteId</code> values." },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Uniqueness", "Each <code>QuoteId</code> MUST be globally unique within the LFI. UUIDv4 is recommended."] },
            { cells: ["2", "Persistence", "The LFI MUST persist the <code>QuoteId</code> for the policy retention period applicable to the sector (typically aligned with the five-year retention floor that applies to issued policies). The <code>QuoteId</code> MUST remain retrievable via <code>GET /{type}-insurance-quotes/{QuoteId}</code> even in terminal states for the lifetime of any policy that may have been issued from it."] },
            { cells: ["3", "Cross-sector isolation", "A <code>QuoteId</code> belongs to a single sector and is not transferable. The same UUID MUST NOT be re-issued for a different sector."] },
            { cells: ["4", "TPP scoping", "A <code>QuoteId</code> belongs to the TPP that created it. Any GET, PATCH, or POST referencing it MUST verify ownership via <code>o3-caller-client-id</code> before responding."] }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-678d1b70><section class="ed-req-hero" data-v-678d1b70><div class="ed-req-hero__inner" data-v-678d1b70><div class="ed-req-hero__label" data-v-678d1b70><span class="ed-req-hero__label-dash" data-v-678d1b70></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-678d1b70>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-678d1b70>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-678d1b70>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-678d1b70>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-678d1b70>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-678d1b70${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-678d1b70${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-678d1b70${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-678d1b70${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-678d1b70${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-678d1b70${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-678d1b70${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-678d1b70${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-678d1b70${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-678d1b70${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-678d1b70${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-678d1b70${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-678d1b70${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-678d1b70${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-678d1b70${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-678d1b70${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-678d1b70${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-678d1b70${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-678d1b70${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-678d1b70${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-678d1b70${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-678d1b70${_scopeId}><span class="ed-req-validator__label" data-v-678d1b70${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-678d1b70${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-678d1b70${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-678d1b70${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-678d1b70${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-678d1b70${_scopeId}><h3 class="ed-req-sub__heading" data-v-678d1b70${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-678d1b70${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-678d1b70${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-678d1b70${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-678d1b70${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-678d1b70${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-678d1b70${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-678d1b70${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-678d1b70${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-678d1b70${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-678d1b70${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-678d1b70${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-678d1b70${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-678d1b70${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-678d1b70${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-678d1b70${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-678d1b70${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-678d1b70${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/quotation/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-678d1b70"]]);
export {
  requirements as default
};
