import { mergeProps, useSSRContext, defineComponent } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-twocol" }, _attrs))} data-v-2b888bde>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdTwoCol.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_13 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2b888bde"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdPillList",
  __ssrInlineRender: true,
  props: {
    items: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "ed-pill-list" }, _attrs))} data-v-19379808><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<li class="ed-pill" data-v-19379808><span data-v-19379808>${ssrInterpolate(item)}</span></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdPillList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19379808"]]);
export {
  __unplugin_components_4 as _,
  __unplugin_components_13 as a
};
