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
        title: "Quote Creation",
        html: "Receive a quote request from a TPP on behalf of a customer and return one or more quotes for the named insurance sector. Quotes are sector-specific (Motor, Health, Home, Life, Employment, Renters, Travel) and carry a <code>QuoteId</code> the LFI mints and persists."
      },
      {
        title: "New, Renewal &amp; Switch",
        html: 'Each quote request specifies a <code>QuoteType</code> of <code>New</code>, <code>Renewal</code> (the customer is renewing an existing policy with you), or <code>Switch</code> (the customer is moving from an incumbent insurer). See <a href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types">Quote Types</a> for the per-type validation differences.'
      },
      {
        title: "LFI-Led or TPP-Led",
        html: "On accept, declare <code>PolicyIssuanceAllowed</code> &mdash; the steps you permit the TPP to handle. In <strong>LFI-Led</strong> mode you host customer verification, payment, and documents. In <strong>TPP-Led</strong> mode the TPP collects KYC and surfaces an LFI-hosted payment URL to the customer."
      },
      {
        title: "Status Updates via Quote Log",
        html: 'Emit status events through <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>PATCH /insurance-quote-log/{logId}</code></a> for every transition &mdash; <code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PolicyIssued</code>, <code>Completed</code>, or any terminal state. The Hub records and (where the TPP subscribed) fans out to webhooks.'
      },
      {
        title: "No Customer Consent",
        html: "Insurance Quotation runs on the Client Credentials Grant. There is no per-customer consent journey on the Hub &mdash; the TPP authenticates as itself, and customer authorisation is gathered out-of-band by the TPP or via your hosted screens."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-7eb530ce><section class="ed-landing__hero" data-v-7eb530ce><div class="ed-landing__inner" data-v-7eb530ce><div class="ed-landing__eyebrow" data-v-7eb530ce><span class="ed-landing__eyebrow-dash" data-v-7eb530ce></span> Insurance · LFI capability </div><h1 class="ed-landing__title" data-v-7eb530ce> Insurance Quotation <span class="ed-landing__read" data-v-7eb530ce>3 min read</span></h1><p class="ed-landing__lede" data-v-7eb530ce> The Insurance Quotation capability lets TPPs request quotes, drive the application through to policy issuance, and receive real-time status updates — for every insurance sector your LFI underwrites. Your Ozone Connect endpoints execute the quote and policy lifecycle; the Hub mediates and fans status events out to subscribed TPPs. </p></div></section><section class="ed-landing__role" data-v-7eb530ce><div class="ed-landing__inner" data-v-7eb530ce><div class="ed-landing__role-card" data-v-7eb530ce><div class="ed-landing__role-meta" data-v-7eb530ce><span class="ed-landing__role-tag" data-v-7eb530ce>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-7eb530ce><span class="ed-landing__role-chip" data-v-7eb530ce>ISP</span><h2 class="ed-landing__role-title" data-v-7eb530ce>Insurance Service Provider</h2></div><p class="ed-landing__role-body" data-v-7eb530ce> Access to the Insurance Quotation APIs requires TPPs to hold the <strong data-v-7eb530ce>ISP</strong> role. The API Hub validates the role on every request before proxying to your Ozone Connect endpoints. Unlike Insurance Data Sharing, there is <strong data-v-7eb530ce>no per-customer consent</strong> — TPPs authenticate with the Client Credentials Grant and act as themselves. </p></div><div class="ed-landing__caps-head" data-v-7eb530ce><div class="ed-landing__caps-eyebrow" data-v-7eb530ce><span class="ed-landing__eyebrow-dash" data-v-7eb530ce></span> What your Ozone Connect endpoints expose </div></div><div class="ed-caps" data-v-7eb530ce><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<div class="ed-cap" data-v-7eb530ce><h3 class="ed-cap__title" data-v-7eb530ce>${cap.title ?? ""}</h3><p class="ed-cap__body" data-v-7eb530ce>${cap.html ?? ""}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__coverage" data-v-7eb530ce><div class="ed-landing__inner" data-v-7eb530ce><div class="ed-landing__contents-head" data-v-7eb530ce><div class="ed-landing__contents-eyebrow" data-v-7eb530ce><span class="ed-landing__eyebrow-dash" data-v-7eb530ce></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-7eb530ce>Insurance types covered</h2><p class="ed-landing__contents-sub" data-v-7eb530ce> Implement the quote and policy endpoints for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. </p></div><div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance quotation endpoint coverage" data-v-7eb530ce><div class="ed-cov__row ed-cov__row--head" role="row" data-v-7eb530ce><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-7eb530ce>Insurance Type</div><div class="ed-cov__cell" role="columnheader" data-v-7eb530ce>Create Quote</div><div class="ed-cov__cell" role="columnheader" data-v-7eb530ce>Retrieve / Accept Quote</div><div class="ed-cov__cell" role="columnheader" data-v-7eb530ce>Create Policy</div></div><!--[-->`);
      ssrRenderList(insuranceTypes, (t) => {
        _push(`<div class="ed-cov__row" role="row" data-v-7eb530ce><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-7eb530ce><strong data-v-7eb530ce>${ssrInterpolate(t)}</strong><code class="ed-cov__path" data-v-7eb530ce>/${ssrInterpolate(t.toLowerCase())}-insurance-quotes</code></div><div class="ed-cov__cell" role="cell" data-v-7eb530ce><span class="ed-cov__mark is-yes" data-v-7eb530ce>POST</span></div><div class="ed-cov__cell" role="cell" data-v-7eb530ce><span class="ed-cov__mark is-yes" data-v-7eb530ce>GET / PATCH</span></div><div class="ed-cov__cell" role="cell" data-v-7eb530ce><span class="ed-cov__mark is-yes" data-v-7eb530ce>POST</span></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__contents" data-v-7eb530ce><div class="ed-landing__inner" data-v-7eb530ce><div class="ed-landing__contents-head" data-v-7eb530ce><div class="ed-landing__contents-eyebrow" data-v-7eb530ce><span class="ed-landing__eyebrow-dash" data-v-7eb530ce></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-7eb530ce>Browse this section</h2><p class="ed-landing__contents-sub" data-v-7eb530ce> The full set of pages for the Insurance Quotation API on the LFI side. </p></div><div class="ed-landing__contents-grid" data-v-7eb530ce><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-7eb530ce><span class="ed-link-card__top" data-v-7eb530ce></span><div class="ed-link-card__meta" data-v-7eb530ce><span class="ed-link-card__cat" data-v-7eb530ce>Requirements</span></div><h3 class="ed-link-card__title" data-v-7eb530ce>Insurance Quotation — Requirements</h3><p class="ed-link-card__desc" data-v-7eb530ce> Validation rules and behaviour your Ozone Connect endpoints must follow across the quote, accept, and policy creation steps. </p><div class="ed-link-card__foot" data-v-7eb530ce><span class="ed-link-card__cta" data-v-7eb530ce>Open</span><span class="ed-link-card__arrow" data-v-7eb530ce>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" style="${ssrRenderStyle({ "--card-color": "var(--at-violet, #6d28d9)" })}" data-v-7eb530ce><span class="ed-link-card__top" data-v-7eb530ce></span><div class="ed-link-card__meta" data-v-7eb530ce><span class="ed-link-card__cat" data-v-7eb530ce>Quote Types</span></div><h3 class="ed-link-card__title" data-v-7eb530ce>New, Renewal &amp; Switch</h3><p class="ed-link-card__desc" data-v-7eb530ce> The semantic differences between the three <code data-v-7eb530ce>QuoteType</code> values and the per-type field requirements. Shared explainer referenced from the TPP standards as well. </p><div class="ed-link-card__foot" data-v-7eb530ce><span class="ed-link-card__cta" data-v-7eb530ce>Open</span><span class="ed-link-card__arrow" data-v-7eb530ce>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-7eb530ce><span class="ed-link-card__top" data-v-7eb530ce></span><div class="ed-link-card__meta" data-v-7eb530ce><span class="ed-link-card__cat" data-v-7eb530ce>API Guide</span></div><h3 class="ed-link-card__title" data-v-7eb530ce>Insurance Quotation — API Guide</h3><p class="ed-link-card__desc" data-v-7eb530ce> End-to-end walkthrough of the LFI-Led and TPP-Led flows, status emission via the quote-log, and the mapping from each PATCH to the event the Hub fans out. </p><div class="ed-link-card__foot" data-v-7eb530ce><span class="ed-link-card__cta" data-v-7eb530ce>Open</span><span class="ed-link-card__arrow" data-v-7eb530ce>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-7eb530ce><span class="ed-link-card__top" data-v-7eb530ce></span><div class="ed-link-card__meta" data-v-7eb530ce><span class="ed-link-card__cat" data-v-7eb530ce>User Journeys</span></div><h3 class="ed-link-card__title" data-v-7eb530ce>Insurance Quotation — User Journeys</h3><p class="ed-link-card__desc" data-v-7eb530ce> The hosted screens your LFI presents in LFI-Led mode (quote summary, customer verification, payment, documents) and the hosted payment URL handed back to the TPP in TPP-Led mode. </p><div class="ed-link-card__foot" data-v-7eb530ce><span class="ed-link-card__cta" data-v-7eb530ce>Open</span><span class="ed-link-card__arrow" data-v-7eb530ce>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/quotation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7eb530ce"]]);
export {
  index as default
};
