import { _ as __unplugin_components_0 } from "./FcMultiPaymentExplainer-7pnxk2E9.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { f as fixedPeriodicScheduleArea } from "./multi-payments-BLEkBzPp.js";
import { b as block0 } from "../main.mjs";
import "./EdNote-BQLptLjy.js";
import "./EdBullets-DF2K09hg.js";
import "./EdProse-DgPVkafE.js";
import "./EdSectionBand-cb9ozyvX.js";
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
      _push(ssrRenderComponent(_component_FcMultiPaymentExplainer, mergeProps({ area: unref(fixedPeriodicScheduleArea) }, _attrs), null, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/fixed-periodic-schedule/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
