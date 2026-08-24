import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdExample",
  __ssrInlineRender: true,
  props: {
    label: { default: "Example" },
    color: { default: "var(--at-blue-deep)" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "ed-example",
        style: { "--ex-accent": __props.color }
      }, _attrs))} data-v-c7c0f091><div class="ed-example__label" data-v-c7c0f091>${ssrInterpolate(__props.label)}</div><div class="ed-example__body" data-v-c7c0f091>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdExample.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7c0f091"]]);
export {
  __unplugin_components_6 as _
};
