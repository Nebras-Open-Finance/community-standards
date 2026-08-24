import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdSectionBand",
  __ssrInlineRender: true,
  props: {
    id: { default: "" },
    num: { default: "" },
    color: { default: "var(--at-teal)" },
    eyebrow: { default: "" },
    title: {},
    lede: { default: "" },
    tone: { default: "cream" },
    narrow: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: __props.id || void 0,
        class: ["ed-band", [`ed-band--${__props.tone}`]]
      }, _attrs))} data-v-79509f75><div class="${ssrRenderClass([{ "ed-band__inner--narrow": __props.narrow }, "ed-band__inner"])}" data-v-79509f75><header class="ed-band__head" data-v-79509f75>`);
      if (__props.eyebrow) {
        _push(`<div class="ed-band__eyebrow" style="${ssrRenderStyle({ color: __props.color, "--eyebrow-tint": __props.color })}" data-v-79509f75>`);
        if (__props.num) {
          _push(`<span class="ed-band__num" data-v-79509f75>${ssrInterpolate(__props.num)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(__props.eyebrow)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="ed-band__title" data-v-79509f75>${ssrInterpolate(__props.title)}</h2>`);
      if (__props.lede) {
        _push(`<p class="ed-band__lede" data-v-79509f75>${__props.lede ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdSectionBand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79509f75"]]);
export {
  __unplugin_components_3 as _
};
