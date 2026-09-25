import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdBackStrip",
  __ssrInlineRender: true,
  props: {
    href: {},
    text: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ed-backstrip" }, _attrs))} data-v-7eb5faee><div class="ed-backstrip__inner" data-v-7eb5faee><a${ssrRenderAttr("href", __props.href)} class="ed-backstrip__link" data-v-7eb5faee><span class="ed-backstrip__arrow" data-v-7eb5faee>←</span><span class="ed-backstrip__text" data-v-7eb5faee>${ssrInterpolate(__props.text)}</span></a></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdBackStrip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7eb5faee"]]);
export {
  __unplugin_components_0 as _
};
