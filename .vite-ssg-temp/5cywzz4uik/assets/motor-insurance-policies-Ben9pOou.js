import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { _ as __unplugin_components_0 } from "./EndpointPage-BtLubFvo.js";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./useChartTheme-DtmiKid7.js";
import "@unhead/vue";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EndpointPage = __unplugin_components_0;
  const _component_RedocWrapper = _sfc_main$1;
  _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
    eyebrow: "LFI · CAAP · Insurance Policies",
    title: "Retrieve Motor Insurance Policies (CAAP)",
    version: "v2.1",
    method: "GET",
    path: "/motor-insurance-policies"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_RedocWrapper, {
          spec: "/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml",
          filterPath: "/motor-insurance-policies",
          overrideServers: [{ url: "https://[Ozone_Connect_API]" }]
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_RedocWrapper, {
            spec: "/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml",
            filterPath: "/motor-insurance-policies",
            overrideServers: [{ url: "https://[Ozone_Connect_API]" }]
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/caap/open-api/motor-insurance-policies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const motorInsurancePolicies = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  motorInsurancePolicies as default
};
