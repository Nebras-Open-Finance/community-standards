import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EdRelatedCard",
  __ssrInlineRender: true,
  props: {
    href: {},
    category: { default: "" },
    categoryColor: { default: "var(--at-navy)" },
    title: {},
    desc: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.href,
        class: "ed-relcard",
        style: { "--cat-color": __props.categoryColor }
      }, _attrs))} data-v-c3fd1674><span class="ed-relcard__top" data-v-c3fd1674></span>`);
      if (__props.category) {
        _push(`<span class="ed-relcard__cat" data-v-c3fd1674>${ssrInterpolate(__props.category)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="ed-relcard__title" data-v-c3fd1674>${ssrInterpolate(__props.title)}</h3>`);
      if (__props.desc) {
        _push(`<p class="ed-relcard__desc" data-v-c3fd1674>${ssrInterpolate(__props.desc)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="ed-relcard__arrow" data-v-c3fd1674>→</span></a>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdRelatedCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c3fd1674"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdRelatedCards",
  __ssrInlineRender: true,
  props: {
    eyebrow: { default: "Read alongside" },
    title: { default: "Related policies" },
    eyebrowColor: { default: "var(--at-teal)" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ed-related" }, _attrs))} data-v-0387c9de><div class="ed-related__inner" data-v-0387c9de><div class="ed-related__head" data-v-0387c9de><div class="ed-related__eyebrow" style="${ssrRenderStyle({ color: __props.eyebrowColor })}" data-v-0387c9de><span class="ed-related__eyebrow-dash" data-v-0387c9de></span> ${ssrInterpolate(__props.eyebrow)}</div><h2 class="ed-related__title" data-v-0387c9de>${ssrInterpolate(__props.title)}</h2></div><div class="ed-related__grid" data-v-0387c9de>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdRelatedCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0387c9de"]]);
export {
  __unplugin_components_6 as _,
  __unplugin_components_7 as a
};
