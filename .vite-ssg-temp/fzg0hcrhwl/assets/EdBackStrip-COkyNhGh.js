import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderSlot, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-330cc3b3><span class="ed-relcard__top" data-v-330cc3b3></span>`);
      if (__props.category) {
        _push(`<span class="ed-relcard__cat" data-v-330cc3b3>${ssrInterpolate(__props.category)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="ed-relcard__title" data-v-330cc3b3>${ssrInterpolate(__props.title)}</h3>`);
      if (__props.desc) {
        _push(`<p class="ed-relcard__desc" data-v-330cc3b3>${ssrInterpolate(__props.desc)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="ed-relcard__arrow" data-v-330cc3b3>→</span></a>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdRelatedCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-330cc3b3"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EdRelatedCards",
  __ssrInlineRender: true,
  props: {
    eyebrow: { default: "Read alongside" },
    title: { default: "Related policies" },
    eyebrowColor: { default: "var(--at-teal)" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ed-related" }, _attrs))} data-v-e5415c87><div class="ed-related__inner" data-v-e5415c87><div class="ed-related__head" data-v-e5415c87><div class="ed-related__eyebrow" style="${ssrRenderStyle({ color: __props.eyebrowColor })}" data-v-e5415c87><span class="ed-related__eyebrow-dash" data-v-e5415c87></span> ${ssrInterpolate(__props.eyebrow)}</div><h2 class="ed-related__title" data-v-e5415c87>${ssrInterpolate(__props.title)}</h2></div><div class="ed-related__grid" data-v-e5415c87>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdRelatedCards.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e5415c87"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-1852b812><div class="ed-inpage__inner" data-v-1852b812><span class="ed-inpage__label" data-v-1852b812>${ssrInterpolate(__props.label)}</span><!--[-->`);
      ssrRenderList(__props.sections, (s) => {
        _push(`<a${ssrRenderAttr("href", `#${s.id}`)} class="ed-inpage__link" data-v-1852b812>${ssrInterpolate(s.label)}</a>`);
      });
      _push(`<!--]--></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdInPageNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1852b812"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdBackStrip",
  __ssrInlineRender: true,
  props: {
    href: {},
    text: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ed-backstrip" }, _attrs))} data-v-0e452f9e><div class="ed-backstrip__inner" data-v-0e452f9e><a${ssrRenderAttr("href", __props.href)} class="ed-backstrip__link" data-v-0e452f9e><span class="ed-backstrip__arrow" data-v-0e452f9e>←</span><span class="ed-backstrip__text" data-v-0e452f9e>${ssrInterpolate(__props.text)}</span></a></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdBackStrip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e452f9e"]]);
export {
  __unplugin_components_0 as _,
  __unplugin_components_2 as a,
  __unplugin_components_6 as b,
  __unplugin_components_7 as c
};
