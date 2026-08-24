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
  lede: 'The validation rules that apply to Insurance Quotation. The <strong>Validated by</strong> column on each table indicates where each rule is enforced. Insurance Quotation does not use a per-customer consent — TPPs authenticate with the Client Credentials Grant and act as themselves throughout the quote lifecycle. Read alongside the <a href="./api-guide/">API Guide</a> and <a href="./user-journeys">User Journeys</a>.',
  preconditions: 'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>ISP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing, and a <a href="/tech/tpp-standards/security/tokens/">client credentials access token</a> with the <code>insurance</code> scope.',
  sections: [
    {
      id: "post-quote",
      num: "01",
      method: "POST",
      path: "/{type}-insurance-quotes",
      title: "Create a Quote",
      intro: "The TPP requests one or more quotes for a single customer for the named insurance sector. The Hub validates schema and credentials, then proxies the request to the LFI. The response is a <code>data</code> array carrying one or more quotes, each with its own <code>QuoteId</code>.",
      rules: [
        { field: "Sector slug in path", rule: "Must be one of <code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>. The Hub returns <code>404</code> for any other value before the request reaches the LFI.", validatedBy: "API Hub" },
        { field: "<code>QuoteType</code>", rule: 'Must be one of <code>New</code>, <code>Renewal</code>, or <code>Switch</code>. See <a href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types">Quote Types</a> for the per-type field requirements (<code>Renewal</code> references the prior policy; <code>Switch</code> references the incumbent insurer).', validatedBy: "API Hub (schema) + LFI (logic)" },
        { field: "Quote request body", rule: 'Must conform exactly to the per-sector quote request schema in the <a href="./open-api/motor-insurance-quotes">OpenAPI spec</a>. Sector-specific identifiers (e.g. Vehicle for Motor, PropertyAddress for Home, TripDetails for Travel) are required.', validatedBy: "API Hub" },
        { field: "Customer identifiers", rule: "Customer identification fields (Emirates ID, date of birth, etc.) carried inline on the quote request are subject to the same data-minimisation rules as other Open Finance flows — only collect what is required to underwrite. There is no JWE encryption for Insurance Quotation PII.", validatedBy: "TPP discretion" },
        { field: "Access token", rule: "Must be a Client Credentials Grant token issued by the API Hub authorisation server with the <code>insurance</code> scope. Customer consent tokens (Authorization Code Grant) MUST NOT be used.", validatedBy: "API Hub" },
        { field: "Signed request", rule: "The request body MUST be sent as an <code>application/jwt</code> Request JWT signed with the TPP's signing key, per the FAPI security profile. Unsigned requests are rejected with <code>400</code>.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" },
        { field: "Response — <code>201</code>", rule: "The LFI returned one or more quotes. Each entry includes a <code>QuoteId</code> the TPP uses for retrieval, acceptance, and policy creation. The TPP MUST persist the <code>QuoteId</code> alongside the customer context.", validatedBy: "TPP" },
        { field: "Response — <code>204</code>", rule: "The LFI declined to quote (e.g. risk profile out of appetite). The TPP MUST surface the decline to the customer without retrying.", validatedBy: "TPP" }
      ]
    },
    {
      id: "get-quote",
      num: "02",
      method: "GET",
      path: "/{type}-insurance-quotes/{QuoteId}",
      title: "Retrieve a Quote",
      intro: "Used to look up the current state of a quote. Optional in the happy path — TPPs subscribed to webhooks receive status updates directly, while polling TPPs can use this endpoint between events.",
      rules: [
        { field: "<code>QuoteId</code>", rule: "Must be a <code>QuoteId</code> the TPP previously received from this LFI's <code>POST /{type}-insurance-quotes</code> response, in the matching sector. An unknown or cross-sector ID returns <code>404</code>.", validatedBy: "LFI" },
        { field: "Quote ownership", rule: "The LFI returns <code>404</code> rather than <code>403</code> if the <code>QuoteId</code> belongs to a different TPP, to prevent leakage of quote existence.", validatedBy: "LFI" }
      ]
    },
    {
      id: "patch-quote",
      num: "03",
      method: "PATCH",
      path: "/{type}-insurance-quotes/{QuoteId}",
      title: "Accept a Quote (and Subscribe to Events)",
      intro: "When the customer accepts a quote, the TPP PATCHes the quote with the accept body. This is also where the TPP registers its webhook subscription — if the TPP wants to receive event notifications instead of polling, the <code>Subscription</code> object on this request carries the webhook configuration. In TPP-Led mode, the same endpoint is used a second time to <strong>Submit KYC</strong> data after <code>ApplicationPending</code>.",
      rules: [
        { field: "<code>Data</code>", rule: "Carries the accept-quote properties for the sector (sector-specific fields such as policy start date, beneficiary list, etc.). Required when accepting the quote; may be omitted on subsequent PATCHes that only manage the webhook subscription.", validatedBy: "API Hub + LFI" },
        { field: "<code>Subscription.Webhook.Url</code>", rule: 'Optional. If the TPP wants to receive event notifications, set <code>Url</code> to an HTTPS endpoint the TPP controls. The URL MUST match <code>^https://.+</code>. The Hub will POST status events to this URL for the lifetime of the quote (see <a href="./api-guide/">API Guide</a>). If omitted, the TPP must poll via <code>GET /{type}-insurance-quotes/{QuoteId}</code>.', validatedBy: "API Hub" },
        { field: "<code>Subscription.Webhook.IsActive</code>", rule: "Required when <code>Subscription</code> is present. <code>true</code> activates webhook delivery; <code>false</code> pauses it without removing the registered URL. The TPP can PATCH later with <code>IsActive: false</code> to disable webhooks mid-lifecycle without altering the quote.", validatedBy: "API Hub" },
        { field: "Signed request", rule: "PATCH body MUST be sent as <code>application/jwt</code> signed with the TPP's signing key.", validatedBy: "API Hub" },
        { field: "Response — <code>200</code> (TPP-Led)", rule: "The LFI returns <code>data.PolicyIssuanceAllowed</code> declaring which steps the TPP may perform: <code>CustomerVerification</code>, <code>Payment</code>, <code>PolicyDocuments</code>. The TPP MUST honour these flags — only perform the steps the LFI has explicitly allowed.", validatedBy: "TPP" },
        { field: "Response — <code>204</code> (LFI-Led)", rule: "The LFI has accepted the quote and will drive the application internally. The TPP's next step is to wait for the <code>ApplicationPending</code> → <code>PolicyIssued</code> → <code>Completed</code> event sequence (via webhook or polling).", validatedBy: "TPP" }
      ]
    },
    {
      id: "submit-kyc",
      num: "04",
      method: "PATCH",
      path: "/{type}-insurance-quotes/{QuoteId}",
      title: "Submit KYC (TPP-Led only)",
      intro: "In TPP-Led mode, after the LFI emits <code>ApplicationPending</code> the TPP collects KYC data from the customer in its own UI and submits it via a second PATCH on the same endpoint. The LFI responds with <code>ApplicationApproved</code> on the quote-log (delivered to the TPP via webhook or polling) and emits a <code>BrokerInstructions.Url</code> — the LFI-hosted payment page — that the TPP redirects the customer to.",
      rules: [
        { field: "Eligibility", rule: "Submit KYC is only valid in TPP-Led mode (i.e. the Accept Quote response carried <code>PolicyIssuanceAllowed.CustomerVerification: true</code>). Calling it for an LFI-Led quote results in <code>409</code>.", validatedBy: "LFI" },
        { field: "KYC payload", rule: "Must conform to the sector's accept-quote / KYC request schema. The TPP is responsible for collecting valid customer identification (Emirates ID, etc.) and forwarding it verbatim.", validatedBy: "API Hub + LFI" },
        { field: "Customer presence", rule: "The TPP MUST collect the KYC data with the customer present and consenting — this submission acts as the customer's instruction to proceed with the application.", validatedBy: "TPP" }
      ]
    },
    {
      id: "event-subscription",
      num: "05",
      title: "Event Subscription and Handling",
      intro: 'Once the TPP has subscribed via the <code>Subscription</code> object on PATCH Accept Quote, the Hub delivers status events to the registered webhook URL whenever the LFI emits a quote-log update. The event payload conforms to the Insurance Quote Event schema documented in the <a href="./api-guide/">API Guide</a>.',
      rules: [
        { field: "Webhook endpoint", rule: "Must be reachable over HTTPS with a valid TLS certificate. The Hub will not deliver events to plaintext, self-signed, or expired endpoints.", validatedBy: "API Hub (delivery)" },
        { field: "Webhook authentication", rule: 'Events are signed by the Hub. The TPP MUST verify the signature on every received event before acting on it — see <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event Notifications</a>.', validatedBy: "TPP" },
        { field: "Idempotency", rule: "The Hub may redeliver an event after a transient delivery failure. The TPP MUST treat events as idempotent — apply the latest <code>QuoteStatus</code> rather than counting events. Tracking by <code>QuoteId</code> + <code>QuoteStatus</code> + event timestamp is sufficient.", validatedBy: "TPP" },
        { field: "Status vocabulary", rule: "Events carry one of three schemas: pending-completion (<code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PaymentRequired</code>, <code>PolicyIssued</code>), completed (<code>Completed</code>), or terminal (<code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>, <code>LFICancelled</code>). The TPP MUST handle all three.", validatedBy: "TPP" },
        { field: "<code>BrokerInstructions.Url</code>", rule: "When emitted on <code>ApplicationApproved</code> or <code>PaymentRequired</code>, this is the LFI-hosted URL the TPP MUST redirect the customer to in order to complete payment. The URL is single-use and time-bound. The TPP MUST NOT scrape, modify, or replay it.", validatedBy: "TPP" },
        { field: "<code>Documents</code>", rule: "When emitted on <code>PolicyIssued</code> in TPP-Led mode, the TPP MUST verify each document's SHA-256 <code>Hash</code> against the decoded <code>Content</code>, then make the documents available to the customer (download, email, in-app viewer). The TPP becomes the policy document delivery channel.", validatedBy: "TPP" },
        { field: "Polling fallback", rule: "TPPs without a webhook subscription MUST poll <code>GET /{type}-insurance-quotes/{QuoteId}</code> at a reasonable cadence (no more than once per minute under normal load). The Hub may rate-limit aggressive polling.", validatedBy: "TPP" }
      ]
    },
    {
      id: "create-policy",
      num: "06",
      method: "POST",
      path: "/{type}-insurance-policies",
      title: "Create a Policy",
      intro: "Once the application has reached a state that permits policy issuance (LFI-Led: any time after acceptance; TPP-Led: after <code>ApplicationApproved</code> and the customer has paid via the BrokerInstructions URL), the TPP calls POST to create the policy.",
      rules: [
        { field: "<code>QuoteId</code>", rule: "The body MUST reference a <code>QuoteId</code> the TPP previously accepted at this LFI, in the matching sector. A mismatched sector or unknown <code>QuoteId</code> returns <code>404</code>.", validatedBy: "LFI" },
        { field: "TPP-supplied data (TPP-Led)", rule: "For TPP-Led quotes where the TPP collected KYC, the body carries that KYC plus any additional data the LFI requires. For LFI-Led quotes the body may be empty beyond the <code>QuoteId</code>.", validatedBy: "LFI" },
        { field: "Signed request", rule: "POST body MUST be sent as <code>application/jwt</code> signed with the TPP's signing key.", validatedBy: "API Hub" },
        { field: "Idempotency", rule: "If the TPP retries POST Create Policy with the same <code>QuoteId</code> after a successful response, the LFI MUST return the same policy reference rather than minting a duplicate. The TPP SHOULD use the <code>x-fapi-interaction-id</code> to correlate retries.", validatedBy: "LFI" },
        { field: "Response — <code>201</code>", rule: "The LFI has accepted the policy creation request. The TPP awaits the <code>PolicyIssued</code> → <code>Completed</code> event sequence (or polls). The final <code>InsurancePolicyId</code> and the <code>Documents</code> arrive via the quote-log events, not in this response body.", validatedBy: "TPP" }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-c6ddb998><section class="ed-req-hero" data-v-c6ddb998><div class="ed-req-hero__inner" data-v-c6ddb998><div class="ed-req-hero__label" data-v-c6ddb998><span class="ed-req-hero__label-dash" data-v-c6ddb998></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-c6ddb998>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-c6ddb998>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-c6ddb998>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-c6ddb998>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-c6ddb998>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-c6ddb998${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-c6ddb998${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-c6ddb998${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c6ddb998${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-c6ddb998${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-c6ddb998${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-c6ddb998${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c6ddb998${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-c6ddb998${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c6ddb998${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-c6ddb998${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c6ddb998${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-c6ddb998${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-c6ddb998${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-c6ddb998${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-c6ddb998${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-c6ddb998${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-c6ddb998${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-c6ddb998${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-c6ddb998${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-c6ddb998${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-c6ddb998${_scopeId}><span class="ed-req-validator__label" data-v-c6ddb998${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-c6ddb998${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-c6ddb998${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-c6ddb998${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c6ddb998${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-c6ddb998${_scopeId}><h3 class="ed-req-sub__heading" data-v-c6ddb998${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c6ddb998${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-c6ddb998${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-c6ddb998${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-c6ddb998${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c6ddb998${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-c6ddb998${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c6ddb998${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-c6ddb998${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-c6ddb998${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c6ddb998${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-c6ddb998${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-c6ddb998${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-c6ddb998${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c6ddb998${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-c6ddb998${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-c6ddb998${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c6ddb998${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/quotation/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6ddb998"]]);
export {
  requirements as default
};
