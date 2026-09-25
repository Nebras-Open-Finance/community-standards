import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { _ as __unplugin_components_0 } from "./EndpointPage-BtLubFvo.js";
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { B as BIOPAY_SPEC } from "./biopay-spec-BZHDJ9ve.js";
import { b as block0 } from "../main.mjs";
import "./useChartTheme-DtmiKid7.js";
import "@unhead/vue";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "biometrics-payment-log",
  __ssrInlineRender: true,
  setup(__props) {
    const servers = [
      { url: "https://cm.[LFICODE].apihub.openfinance.ae" },
      { url: "https://cm.[LFICODE].preprod.apihub.openfinance.ae" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0;
      const _component_RedocWrapper = _sfc_main$1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: "BioPay · Payment · Draft",
        title: "Report the outcome of a biometric payment",
        version: "Draft · 0.1",
        method: "PATCH",
        path: "/biometrics-payment-log/{id}",
        description: "The call an LFI makes to set the status the API Hub holds for a biometric payment. It is what moves a payment out of Pending, what triggers the payment status event, and what the initiator's polling reads."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_RedocWrapper, {
              "spec-text": unref(BIOPAY_SPEC),
              "filter-path": "/biometrics-payment-log/{id}",
              "filter-method": "patch",
              "display-path": "/biometrics-payment-log/{id}",
              "override-servers": servers,
              "container-id": "redoc-biopay-payment-log-patch"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_RedocWrapper, {
                "spec-text": unref(BIOPAY_SPEC),
                "filter-path": "/biometrics-payment-log/{id}",
                "filter-method": "patch",
                "display-path": "/biometrics-payment-log/{id}",
                "override-servers": servers,
                "container-id": "redoc-biopay-payment-log-patch"
              }, null, 8, ["spec-text"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/payment/api-reference/biometrics-payment-log.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
