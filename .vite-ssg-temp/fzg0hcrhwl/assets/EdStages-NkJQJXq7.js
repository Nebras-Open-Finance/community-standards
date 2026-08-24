import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EdStage",
  __ssrInlineRender: true,
  props: {
    num: {},
    title: {},
    numColor: { default: "var(--at-navy)" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-stage" }, _attrs))} data-v-5140102f><span class="ed-stage__num" style="${ssrRenderStyle({ color: __props.numColor })}" data-v-5140102f>${ssrInterpolate(__props.num)}</span><div class="ed-stage__body" data-v-5140102f><h3 class="ed-stage__title" data-v-5140102f>${ssrInterpolate(__props.title)}</h3>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdStage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5140102f"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-stages" }, _attrs))} data-v-50ae7fd3>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdStages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-50ae7fd3"]]);
export {
  __unplugin_components_7 as _,
  __unplugin_components_8 as a
};
