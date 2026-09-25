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
  __name: "event-notification",
  __ssrInlineRender: true,
  setup(__props) {
    const servers = [{ url: "https://[ICP_Event_Endpoint]" }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0;
      const _component_RedocWrapper = _sfc_main$1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: "BioPay · Registration · Draft",
        title: "Registration event notification",
        version: "Draft · 0.1",
        method: "POST",
        path: "/biometric-payment-registration-events",
        description: "The registration event the API Hub delivers to an authorised BioPay initiator once an LFI has registered a customer, structured as an Open Finance webhook: signed envelope, Data and Meta schema, event types and delivery expectations."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_RedocWrapper, {
              "spec-text": unref(BIOPAY_SPEC),
              "filter-path": "/biometric-payment-registration-events",
              "filter-method": "post",
              "display-path": "/biometric-payment-registration-events",
              "override-servers": servers,
              "container-id": "redoc-biopay-registration-event"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_RedocWrapper, {
                "spec-text": unref(BIOPAY_SPEC),
                "filter-path": "/biometric-payment-registration-events",
                "filter-method": "post",
                "display-path": "/biometric-payment-registration-events",
                "override-servers": servers,
                "container-id": "redoc-biopay-registration-event"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/registration/api-reference/event-notification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
