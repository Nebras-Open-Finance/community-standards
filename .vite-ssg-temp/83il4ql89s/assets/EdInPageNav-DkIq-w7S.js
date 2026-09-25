import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdInPageNav",
  __ssrInlineRender: true,
  props: {
    sections: {},
    label: { default: "On this page" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "ed-inpage",
        "aria-label": __props.label
      }, _attrs))} data-v-78e6fd57><div class="ed-inpage__inner" data-v-78e6fd57><span class="ed-inpage__label" data-v-78e6fd57>${ssrInterpolate(__props.label)}</span><!--[-->`);
      ssrRenderList(__props.sections, (s) => {
        _push(`<a${ssrRenderAttr("href", `#${s.id}`)} class="ed-inpage__link" data-v-78e6fd57>${ssrInterpolate(s.label)}</a>`);
      });
      _push(`<!--]--></div></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdInPageNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78e6fd57"]]);
export {
  __unplugin_components_2 as _
};
