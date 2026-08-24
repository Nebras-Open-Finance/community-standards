import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdLifetime",
  __ssrInlineRender: true,
  props: {
    from: {},
    to: {},
    duration: {},
    recommended: { default: "" },
    color: { default: "var(--at-navy-deep)" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "ed-lifetime",
        style: { "--lt-accent": __props.color }
      }, _attrs))} data-v-71a54722><div class="ed-lifetime__rail" data-v-71a54722><div class="ed-lifetime__endpoint" data-v-71a54722><span class="ed-lifetime__dot" data-v-71a54722></span><span class="ed-lifetime__label" data-v-71a54722>${ssrInterpolate(__props.from)}</span></div><div class="ed-lifetime__span" data-v-71a54722><span class="ed-lifetime__duration" data-v-71a54722>${ssrInterpolate(__props.duration)}</span><span class="ed-lifetime__line" data-v-71a54722></span>`);
      if (__props.recommended) {
        _push(`<span class="ed-lifetime__recommended" data-v-71a54722>${ssrInterpolate(__props.recommended)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ed-lifetime__endpoint" data-v-71a54722><span class="ed-lifetime__dot" data-v-71a54722></span><span class="ed-lifetime__label" data-v-71a54722>${ssrInterpolate(__props.to)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdLifetime.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_10 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71a54722"]]);
export {
  __unplugin_components_10 as _
};
