import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { u as useRouteVersion, a as allEndpoints, e as endpointUrl, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { docsVersion } = useRouteVersion();
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "ozone-connect" && e.sectionSlug === "insurance-data-sharing" && e.version === docsVersion.value
      )
    );
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
        title: "Policy Information",
        html: "Expose policy details &mdash; product, status, dates, sums insured, coverage, exclusions, and policy-holder information &mdash; through one pair of endpoints per insurance sector you underwrite."
      },
      {
        title: "Customer &amp; Beneficiaries",
        html: "Return identity, contact, and beneficiary information held on each policy when the TPP holds the matching <code>ReadCustomer*</code> permission, subject to data-minimisation rules."
      },
      {
        title: "Encrypted Premium",
        html: "When the TPP holds <code>ReadInsurancePremium</code>, the <code>Premium</code> field MUST be returned as a JWE so it is only decryptable on the customer&rsquo;s device. The cleartext premium never traverses the TPP backend."
      },
      {
        title: "Claims History",
        html: "When the TPP holds <code>ReadCustomerClaims</code>, expose claims raised against the policy &mdash; status, dates, amounts, and triggering events &mdash; to support switching, broking, and risk-assessment use cases."
      },
      {
        title: "Product Information",
        html: "Structured product detail for the underwritten policy &mdash; cover type, features, terms, and add-ons. Returned when the consent includes <code>ReadInsuranceProduct</code>."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-3ff97f97><section class="ed-landing__hero" data-v-3ff97f97><div class="ed-landing__inner" data-v-3ff97f97><div class="ed-landing__eyebrow" data-v-3ff97f97><span class="ed-landing__eyebrow-dash" data-v-3ff97f97></span> Insurance · LFI capability </div><h1 class="ed-landing__title" data-v-3ff97f97> Insurance Data Sharing <span class="ed-landing__read" data-v-3ff97f97>2 min read</span></h1><p class="ed-landing__lede" data-v-3ff97f97> The Open Finance Insurance Data Sharing capabilities let your LFI expose a customer’s policy data to consented TPPs across the UAE’s major insurance sectors. Implementation mirrors Bank Data Sharing: the API Hub validates consent, proxies requests to your Ozone Connect server, and returns the response to the TPP. </p></div></section><section class="ed-landing__role" data-v-3ff97f97><div class="ed-landing__inner" data-v-3ff97f97><div class="ed-landing__role-card" data-v-3ff97f97><div class="ed-landing__role-meta" data-v-3ff97f97><span class="ed-landing__role-tag" data-v-3ff97f97>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-3ff97f97><span class="ed-landing__role-chip" data-v-3ff97f97>ISP</span><h2 class="ed-landing__role-title" data-v-3ff97f97>Insurance Service Provider</h2></div><p class="ed-landing__role-body" data-v-3ff97f97> Access to the Insurance Data Sharing APIs requires TPPs to hold the <strong data-v-3ff97f97>ISP</strong> role. The API Hub validates the role on every request before proxying it to your Ozone Connect endpoints. </p></div><div class="ed-landing__caps-head" data-v-3ff97f97><div class="ed-landing__caps-eyebrow" data-v-3ff97f97><span class="ed-landing__eyebrow-dash" data-v-3ff97f97></span> What your Ozone Connect endpoints expose </div></div><div class="ed-caps" data-v-3ff97f97><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<div class="ed-cap" data-v-3ff97f97><h3 class="ed-cap__title" data-v-3ff97f97>${cap.title ?? ""}</h3><p class="ed-cap__body" data-v-3ff97f97>${cap.html ?? ""}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__coverage" data-v-3ff97f97><div class="ed-landing__inner" data-v-3ff97f97><div class="ed-landing__contents-head" data-v-3ff97f97><div class="ed-landing__contents-eyebrow" data-v-3ff97f97><span class="ed-landing__eyebrow-dash" data-v-3ff97f97></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-3ff97f97>Insurance types covered</h2><p class="ed-landing__contents-sub" data-v-3ff97f97> Implement the endpoint pair for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. </p></div><div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance type endpoint coverage" data-v-3ff97f97><div class="ed-cov__row ed-cov__row--head" role="row" data-v-3ff97f97><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-3ff97f97>Insurance Type</div><div class="ed-cov__cell" role="columnheader" data-v-3ff97f97>List policies</div><div class="ed-cov__cell" role="columnheader" data-v-3ff97f97>Get a policy</div></div><!--[-->`);
      ssrRenderList(insuranceTypes, (t) => {
        _push(`<div class="ed-cov__row" role="row" data-v-3ff97f97><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-3ff97f97><strong data-v-3ff97f97>${ssrInterpolate(t)}</strong><code class="ed-cov__path" data-v-3ff97f97>/${ssrInterpolate(t.toLowerCase())}-insurance-policies</code></div><div class="ed-cov__cell" role="cell" data-v-3ff97f97><span class="ed-cov__mark is-yes" data-v-3ff97f97>GET</span></div><div class="ed-cov__cell" role="cell" data-v-3ff97f97><span class="ed-cov__mark is-yes" data-v-3ff97f97>GET</span></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__contents" data-v-3ff97f97><div class="ed-landing__inner" data-v-3ff97f97><div class="ed-landing__contents-head" data-v-3ff97f97><div class="ed-landing__contents-eyebrow" data-v-3ff97f97><span class="ed-landing__eyebrow-dash" data-v-3ff97f97></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-3ff97f97>Browse this section</h2><p class="ed-landing__contents-sub" data-v-3ff97f97> The full set of pages for the Insurance Data Sharing API on the LFI side. </p></div><div class="ed-landing__contents-grid" data-v-3ff97f97><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-3ff97f97><span class="ed-link-card__top" data-v-3ff97f97></span><div class="ed-link-card__meta" data-v-3ff97f97><span class="ed-link-card__cat" data-v-3ff97f97>Requirements</span></div><h3 class="ed-link-card__title" data-v-3ff97f97>Insurance Data Sharing — Requirements</h3><p class="ed-link-card__desc" data-v-3ff97f97> Validation rules and behaviour your Ozone Connect endpoints must follow. </p><div class="ed-link-card__foot" data-v-3ff97f97><span class="ed-link-card__cta" data-v-3ff97f97>Open</span><span class="ed-link-card__arrow" data-v-3ff97f97>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-3ff97f97><span class="ed-link-card__top" data-v-3ff97f97></span><div class="ed-link-card__meta" data-v-3ff97f97><span class="ed-link-card__cat" data-v-3ff97f97>API Guide</span></div><h3 class="ed-link-card__title" data-v-3ff97f97>Insurance Data Sharing — API Guide</h3><p class="ed-link-card__desc" data-v-3ff97f97> How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing requests proxied by the API Hub. </p><div class="ed-link-card__foot" data-v-3ff97f97><span class="ed-link-card__cta" data-v-3ff97f97>Open</span><span class="ed-link-card__arrow" data-v-3ff97f97>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-3ff97f97><span class="ed-link-card__top" data-v-3ff97f97></span><div class="ed-link-card__meta" data-v-3ff97f97><span class="ed-link-card__cat" data-v-3ff97f97>User Journeys</span></div><h3 class="ed-link-card__title" data-v-3ff97f97>Insurance Data Sharing — User Journeys</h3><p class="ed-link-card__desc" data-v-3ff97f97> The end-to-end customer flow when sharing insurance data — from the TPP consent screen through your LFI’s authorisation pages and back. </p><div class="ed-link-card__foot" data-v-3ff97f97><span class="ed-link-card__cta" data-v-3ff97f97>Open</span><span class="ed-link-card__arrow" data-v-3ff97f97>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-3ff97f97><span class="ed-link-card__top" data-v-3ff97f97></span><div class="ed-link-card__meta" data-v-3ff97f97><span class="ed-link-card__cat" data-v-3ff97f97>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-3ff97f97>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-3ff97f97>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-3ff97f97>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-3ff97f97> OpenAPI reference for the <code data-v-3ff97f97>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> Ozone Connect endpoint. </p><div class="ed-link-card__foot" data-v-3ff97f97><span class="ed-link-card__cta" data-v-3ff97f97>Open spec</span><span class="ed-link-card__arrow" data-v-3ff97f97>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ff97f97"]]);
export {
  index as default
};
