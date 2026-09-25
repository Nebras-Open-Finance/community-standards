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
const SPEC = "/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "get-payment-consents-ConsentId-attestations",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0;
      const _component_RedocWrapper = _sfc_main$1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: "TPP · Consent · Data Deletion Confirmation",
        title: "List Bank Service Initiation Attestation Events",
        version: "v2.2-rc1",
        method: "GET",
        path: "/payment-consents/{ConsentId}/attestations"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_RedocWrapper, {
              spec: SPEC,
              filterPath: "/payment-consents/{ConsentId}/attestations",
              filterMethod: "GET"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_RedocWrapper, {
                spec: SPEC,
                filterPath: "/payment-consents/{ConsentId}/attestations",
                filterMethod: "GET"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/get-payment-consents-ConsentId-attestations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
