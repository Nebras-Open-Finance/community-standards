import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const ticketUrl = "https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/37";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CertificationTicketBanner",
  __ssrInlineRender: true,
  props: {
    certType: {}
  },
  setup(__props) {
    const props = __props;
    const allCertTypes = [
      "TPP Functional Certification Evidence",
      "TPP FAPI Certification Evidence",
      "TPP CX Certification Evidence",
      "Penetration Test Results"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "cert-banner" }, _attrs))} data-v-a1deb78d><div class="cert-banner__rail" data-v-a1deb78d></div><div class="cert-banner__body" data-v-a1deb78d><div class="cert-banner__eyebrow" data-v-a1deb78d>Service Desk · Providing certification evidence</div>`);
      if (props.certType) {
        _push(`<p class="cert-banner__lede" data-v-a1deb78d> Submit this evidence by raising a Service Desk ticket. In the <strong data-v-a1deb78d>Certification Type</strong> field, select <strong data-v-a1deb78d>“${ssrInterpolate(props.certType)}”</strong>, then attach your evidence to the ticket. </p>`);
      } else {
        _push(`<p class="cert-banner__lede" data-v-a1deb78d> Each certification area is submitted as its own Service Desk ticket. The link below opens the same request type each time — raise one ticket per area, and in the <strong data-v-a1deb78d>Certification Type</strong> field, pick the option that matches the evidence you are attaching: </p>`);
      }
      if (!props.certType) {
        _push(`<ul class="cert-banner__types" data-v-a1deb78d><!--[-->`);
        ssrRenderList(allCertTypes, (t) => {
          _push(`<li data-v-a1deb78d>${ssrInterpolate(t)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cert-banner__actions" data-v-a1deb78d><a class="cert-banner__primary"${ssrRenderAttr("href", ticketUrl)} target="_blank" rel="noopener" data-v-a1deb78d> Raise a certification evidence ticket <span class="cert-banner__arrow" data-v-a1deb78d>↗</span></a><a class="cert-banner__secondary" href="/support-service-desk" data-v-a1deb78d> Service Desk access &amp; alternatives </a></div></div></aside>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/certification/CertificationTicketBanner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1deb78d"]]);
export {
  __unplugin_components_0 as _
};
