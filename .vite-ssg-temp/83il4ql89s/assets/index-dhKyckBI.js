import { _ as __unplugin_components_0 } from "./FcMultiPaymentExplainer-DDrNaWLM.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { d as fixedDefinedScheduleArea } from "./multi-payments-BLEkBzPp.js";
import { b as block0 } from "../main.mjs";
import "./EdNote-61YjJPRT.js";
import "./EdBullets-gB3sPgIp.js";
import "./EdProse-D3vi_RS_.js";
import "./EdSectionBand-DD63-Oxz.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcMultiPaymentExplainer = __unplugin_components_0;
      _push(ssrRenderComponent(_component_FcMultiPaymentExplainer, mergeProps({ area: unref(fixedDefinedScheduleArea) }, _attrs), null, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
