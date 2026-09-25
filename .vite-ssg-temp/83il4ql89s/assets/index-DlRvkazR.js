import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const insuranceTypes = [
      "Employment",
      "Health",
      "Home",
      "Life",
      "Motor",
      "Renters",
      "Travel"
    ];
    const capabilities = [
      {
        title: "Quote Comparison &amp; Aggregation",
        html: "Request quotes from one or more LFIs for a single customer and surface them side-by-side. Each LFI returns one or more quotes, each carrying its own <code>QuoteId</code> for downstream acceptance."
      },
      {
        title: "New, Renewal &amp; Switch",
        html: 'Specify <code>QuoteType</code> on the request: <code>New</code> for first-time policies, <code>Renewal</code> for continuing with the same insurer, <code>Switch</code> for moving from an incumbent. See <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types">Quote Types</a> for the per-type field requirements.'
      },
      {
        title: "LFI-Led or TPP-Led",
        html: "On accept, the LFI returns <code>PolicyIssuanceAllowed</code> declaring which steps you may perform. In <strong>LFI-Led</strong> mode the LFI hosts everything; in <strong>TPP-Led</strong> mode you collect KYC and redirect the customer to an LFI-hosted payment URL."
      },
      {
        title: "Real-time Status via Webhooks",
        html: "Subscribe to status events by attaching a <code>Subscription.Webhook</code> object to the PATCH Accept Quote request. The Hub fans <code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PolicyIssued</code>, <code>Completed</code>, and terminal events to your endpoint. Polling is the alternative if you prefer not to operate a webhook."
      },
      {
        title: "No Customer Consent",
        html: "Insurance Quotation runs on the Client Credentials Grant. There is no per-customer consent journey on the Hub &mdash; your TPP authenticates as itself, and customer authorisation is gathered in your own UI or on the LFI's hosted screens."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-77e9bfcf><section class="ed-landing__hero" data-v-77e9bfcf><div class="ed-landing__inner" data-v-77e9bfcf><div class="ed-landing__eyebrow" data-v-77e9bfcf><span class="ed-landing__eyebrow-dash" data-v-77e9bfcf></span> Insurance · TPP capability </div><h1 class="ed-landing__title" data-v-77e9bfcf> Insurance Quotation <span class="ed-landing__read" data-v-77e9bfcf>3 min read</span></h1><p class="ed-landing__lede" data-v-77e9bfcf> The Insurance Quotation capabilities let TPPs request quotes from LFIs on behalf of customers, drive the application through to policy issuance, and receive real-time status updates — across all seven major insurance sectors. The flow runs on the Client Credentials Grant: no per-customer consent is required at the Hub. </p></div></section><section class="ed-landing__role" data-v-77e9bfcf><div class="ed-landing__inner" data-v-77e9bfcf><div class="ed-landing__role-card" data-v-77e9bfcf><div class="ed-landing__role-meta" data-v-77e9bfcf><span class="ed-landing__role-tag" data-v-77e9bfcf>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-77e9bfcf><span class="ed-landing__role-chip" data-v-77e9bfcf>ISP</span><h2 class="ed-landing__role-title" data-v-77e9bfcf>Insurance Service Provider</h2></div><p class="ed-landing__role-body" data-v-77e9bfcf> Access to the Insurance Quotation APIs requires the <strong data-v-77e9bfcf>ISP</strong> role. This role must be assigned to your application in the Trust Framework before making any quote requests. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-77e9bfcf>Roles</a> for the full list of scopes and grant types this role permits. </p></div><div class="ed-landing__caps-head" data-v-77e9bfcf><div class="ed-landing__caps-eyebrow" data-v-77e9bfcf><span class="ed-landing__eyebrow-dash" data-v-77e9bfcf></span> What Insurance Quotation covers </div></div><div class="ed-caps" data-v-77e9bfcf><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<div class="ed-cap" data-v-77e9bfcf><h3 class="ed-cap__title" data-v-77e9bfcf>${cap.title ?? ""}</h3><p class="ed-cap__body" data-v-77e9bfcf>${cap.html ?? ""}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__coverage" data-v-77e9bfcf><div class="ed-landing__inner" data-v-77e9bfcf><div class="ed-landing__contents-head" data-v-77e9bfcf><div class="ed-landing__contents-eyebrow" data-v-77e9bfcf><span class="ed-landing__eyebrow-dash" data-v-77e9bfcf></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-77e9bfcf>Insurance types covered</h2><p class="ed-landing__contents-sub" data-v-77e9bfcf> All seven insurance sectors expose the same four endpoints. Where an LFI does not underwrite a given sector, the Hub returns <code data-v-77e9bfcf>404</code> for that path. </p></div><div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance quotation endpoint coverage" data-v-77e9bfcf><div class="ed-cov__row ed-cov__row--head" role="row" data-v-77e9bfcf><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-77e9bfcf>Insurance Type</div><div class="ed-cov__cell" role="columnheader" data-v-77e9bfcf>Create Quote</div><div class="ed-cov__cell" role="columnheader" data-v-77e9bfcf>Retrieve / Accept Quote</div><div class="ed-cov__cell" role="columnheader" data-v-77e9bfcf>Create Policy</div></div><!--[-->`);
      ssrRenderList(insuranceTypes, (t) => {
        _push(`<div class="ed-cov__row" role="row" data-v-77e9bfcf><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-77e9bfcf><strong data-v-77e9bfcf>${ssrInterpolate(t)}</strong><code class="ed-cov__path" data-v-77e9bfcf>/${ssrInterpolate(t.toLowerCase())}-insurance-quotes</code></div><div class="ed-cov__cell" role="cell" data-v-77e9bfcf><span class="ed-cov__mark is-yes" data-v-77e9bfcf>POST</span></div><div class="ed-cov__cell" role="cell" data-v-77e9bfcf><span class="ed-cov__mark is-yes" data-v-77e9bfcf>GET / PATCH</span></div><div class="ed-cov__cell" role="cell" data-v-77e9bfcf><span class="ed-cov__mark is-yes" data-v-77e9bfcf>POST</span></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__contents" data-v-77e9bfcf><div class="ed-landing__inner" data-v-77e9bfcf><div class="ed-landing__contents-head" data-v-77e9bfcf><div class="ed-landing__contents-eyebrow" data-v-77e9bfcf><span class="ed-landing__eyebrow-dash" data-v-77e9bfcf></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-77e9bfcf>Browse this section</h2><p class="ed-landing__contents-sub" data-v-77e9bfcf> The full set of pages for the Insurance Quotation API on the TPP side. </p></div><div class="ed-landing__contents-grid" data-v-77e9bfcf><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/insurance/quotation/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-77e9bfcf><span class="ed-link-card__top" data-v-77e9bfcf></span><div class="ed-link-card__meta" data-v-77e9bfcf><span class="ed-link-card__cat" data-v-77e9bfcf>Requirements</span></div><h3 class="ed-link-card__title" data-v-77e9bfcf>Insurance Quotation — Requirements</h3><p class="ed-link-card__desc" data-v-77e9bfcf> Validation rules your TPP must follow when creating quotes, accepting, submitting KYC, subscribing to events, and creating policies. </p><div class="ed-link-card__foot" data-v-77e9bfcf><span class="ed-link-card__cta" data-v-77e9bfcf>Open</span><span class="ed-link-card__arrow" data-v-77e9bfcf>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types" style="${ssrRenderStyle({ "--card-color": "var(--at-violet, #6d28d9)" })}" data-v-77e9bfcf><span class="ed-link-card__top" data-v-77e9bfcf></span><div class="ed-link-card__meta" data-v-77e9bfcf><span class="ed-link-card__cat" data-v-77e9bfcf>Quote Types</span></div><h3 class="ed-link-card__title" data-v-77e9bfcf>New, Renewal &amp; Switch</h3><p class="ed-link-card__desc" data-v-77e9bfcf> The semantic differences between the three <code data-v-77e9bfcf>QuoteType</code> values and the per-type field requirements. Shared explainer linked from both LFI and TPP guides. </p><div class="ed-link-card__foot" data-v-77e9bfcf><span class="ed-link-card__cta" data-v-77e9bfcf>Open</span><span class="ed-link-card__arrow" data-v-77e9bfcf>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-77e9bfcf><span class="ed-link-card__top" data-v-77e9bfcf></span><div class="ed-link-card__meta" data-v-77e9bfcf><span class="ed-link-card__cat" data-v-77e9bfcf>API Guide</span></div><h3 class="ed-link-card__title" data-v-77e9bfcf>Insurance Quotation — API Guide</h3><p class="ed-link-card__desc" data-v-77e9bfcf> End-to-end walkthrough of the LFI-Led and TPP-Led flows, the webhook subscription mechanism, and the full Insurance Quote Event schema you receive on status changes. </p><div class="ed-link-card__foot" data-v-77e9bfcf><span class="ed-link-card__cta" data-v-77e9bfcf>Open</span><span class="ed-link-card__arrow" data-v-77e9bfcf>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/insurance/quotation/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-77e9bfcf><span class="ed-link-card__top" data-v-77e9bfcf></span><div class="ed-link-card__meta" data-v-77e9bfcf><span class="ed-link-card__cat" data-v-77e9bfcf>User Journeys</span></div><h3 class="ed-link-card__title" data-v-77e9bfcf>Insurance Quotation — User Journeys</h3><p class="ed-link-card__desc" data-v-77e9bfcf> The end-to-end customer flow in your TPP app — quote selection, KYC collection (TPP-Led), payment redirect, and policy document presentation. </p><div class="ed-link-card__foot" data-v-77e9bfcf><span class="ed-link-card__cta" data-v-77e9bfcf>Open</span><span class="ed-link-card__arrow" data-v-77e9bfcf>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/quotation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77e9bfcf"]]);
export {
  index as default
};
