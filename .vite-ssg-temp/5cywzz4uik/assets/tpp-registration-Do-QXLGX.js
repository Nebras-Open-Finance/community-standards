import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { _ as __unplugin_components_0 } from "./EndpointPage-BtLubFvo.js";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as block0 } from "../main.mjs";
import "./useChartTheme-DtmiKid7.js";
import "@unhead/vue";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tpp-registration",
  __ssrInlineRender: true,
  setup(__props) {
    const overrideServers = [
      { url: "https://rs1.[LFICODE].apihub.openfinance.ae" },
      { url: "https://rs1.[LFICODE].preprod.apihub.openfinance.ae" },
      { url: "https://rs1.altareq1.sandbox.apihub.openfinance.ae" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0;
      const _component_RedocWrapper = _sfc_main$1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: "TPP · Registration",
        title: "Post Registration to Request Onboarding to an LFI",
        version: "v2.1",
        method: "POST",
        path: "/tpp-registration"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_RedocWrapper, {
              spec: "/openapi/v2.1/api-hub/uae-api-hub-tpp-onboarding-openapi.yaml",
              filterPath: "/tpp-registration",
              overrideServers
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_RedocWrapper, {
                spec: "/openapi/v2.1/api-hub/uae-api-hub-tpp-onboarding-openapi.yaml",
                filterPath: "/tpp-registration",
                overrideServers
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/registration/open-api/tpp-registration.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
