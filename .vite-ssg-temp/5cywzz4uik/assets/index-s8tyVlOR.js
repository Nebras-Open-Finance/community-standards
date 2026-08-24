import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const capabilities = [
      {
        href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/",
        cat: "Insurance Data Sharing",
        color: "var(--at-teal)",
        title: "Insurance Data Sharing",
        body: "Expose a customer&rsquo;s insurance policies to consented TPPs across seven sectors &mdash; Employment, Health, Home, Life, Motor, Renters, and Travel. Permissions such as <code>ReadInsurancePolicies</code>, <code>ReadCustomerBasic</code>, and <code>ReadInsurancePremium</code> control which fields are returned. When the customer grants <code>ReadInsurancePremium</code>, your Ozone Connect endpoints return the <code>Premium</code> field as an encrypted JWE.",
        highlights: ["Policy information across 7 sectors", "Customer &amp; payment-method data", "Encrypted premium values", "Coverage, riders &amp; claims history"]
      },
      {
        href: "/tech/lfi-api-hub/v2.1/insurance/quotation/",
        cat: "Insurance Quotation",
        color: "var(--at-gold, #b08800)",
        title: "Insurance Quotation",
        body: "Receive quote requests, accept, and issue policies through your Ozone Connect endpoints across the same seven sectors. Choose between <strong>LFI-Led</strong> (your LFI hosts the customer end-to-end) and <strong>TPP-Led</strong> (the TPP collects KYC and surfaces an LFI-hosted payment URL). Status events flow back to subscribed TPPs through <code>PATCH /insurance-quote-log/{logId}</code>.",
        highlights: ["Quotes across 7 sectors", "New, Renewal &amp; Switch quote types", "LFI-Led &amp; TPP-Led modes", "Webhook-driven status events"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-1221655e><section class="ed-landing__hero" data-v-1221655e><div class="ed-landing__inner" data-v-1221655e><div class="ed-landing__eyebrow" data-v-1221655e><span class="ed-landing__eyebrow-dash" data-v-1221655e></span> LFI Standards · v2.1 · Insurance </div><h1 class="ed-landing__title" data-v-1221655e> Insurance <span class="ed-landing__read" data-v-1221655e>2 min read</span></h1><p class="ed-landing__lede" data-v-1221655e> The Open Finance Insurance capabilities enable secure and efficient sharing of insurance policy data — empowering third-party providers (TPPs) with the tools they need to deliver policy aggregation, switching, broking, and value-added digital insurance services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-1221655e> All services operate under strict consent management and granular data access permissions, mediated and validated by the API Hub. </p></div></section><section class="ed-landing__contents" data-v-1221655e><div class="ed-landing__inner" data-v-1221655e><div class="ed-landing__contents-head" data-v-1221655e><div class="ed-landing__contents-eyebrow" data-v-1221655e><span class="ed-landing__eyebrow-dash" data-v-1221655e></span> Capabilities </div><h2 class="ed-landing__contents-title" data-v-1221655e>Browse the Insurance capabilities</h2><p class="ed-landing__contents-sub" data-v-1221655e>The full set of capability areas covered by the LFI Insurance standards.</p></div><div class="ed-landing__contents-grid ed-landing__contents-grid--lg" data-v-1221655e><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<a class="ed-link-card ed-link-card--lg"${ssrRenderAttr("href", cap.href)} style="${ssrRenderStyle({ "--card-color": cap.color })}" data-v-1221655e><span class="ed-link-card__top" data-v-1221655e></span><div class="ed-link-card__meta" data-v-1221655e><span class="ed-link-card__cat" data-v-1221655e>${ssrInterpolate(cap.cat)}</span></div><h3 class="ed-link-card__title" data-v-1221655e>${ssrInterpolate(cap.title)}</h3><p class="ed-link-card__desc" data-v-1221655e>${cap.body ?? ""}</p><ul class="ed-link-card__highlights" data-v-1221655e><!--[-->`);
        ssrRenderList(cap.highlights, (h) => {
          _push(`<li data-v-1221655e>${h ?? ""}</li>`);
        });
        _push(`<!--]--></ul><div class="ed-link-card__foot" data-v-1221655e><span class="ed-link-card__cta" data-v-1221655e>Open</span><span class="ed-link-card__arrow" data-v-1221655e>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1221655e"]]);
export {
  index as default
};
