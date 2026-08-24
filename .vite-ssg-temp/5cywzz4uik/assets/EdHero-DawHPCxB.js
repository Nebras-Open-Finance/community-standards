import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EdMeta",
  __ssrInlineRender: true,
  props: {
    items: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-meta" }, _attrs))} data-v-d99098eb><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<span class="ed-meta__item" data-v-d99098eb><span class="ed-meta__label" data-v-d99098eb>${ssrInterpolate(item.label)}</span><span class="ed-meta__value" data-v-d99098eb>${ssrInterpolate(item.value)}</span></span>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdMeta.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d99098eb"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EdKeyNums",
  __ssrInlineRender: true,
  props: {
    items: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.items && __props.items.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-keynums" }, _attrs))} data-v-07be6e03><!--[-->`);
        ssrRenderList(__props.items, (k, i) => {
          _push(`<div class="ed-keynum" data-v-07be6e03><span class="ed-keynum__value" data-v-07be6e03>${ssrInterpolate(k.value)}`);
          if (k.unit) {
            _push(`<span class="ed-keynum__unit" data-v-07be6e03>${ssrInterpolate(k.unit)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span class="ed-keynum__label" data-v-07be6e03>${ssrInterpolate(k.label)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdKeyNums.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-07be6e03"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdHero",
  __ssrInlineRender: true,
  props: {
    eyebrow: { default: "" },
    eyebrowColor: { default: "var(--at-teal)" },
    title: {},
    meta: { default: () => [] },
    lede: { default: "" },
    keyNums: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ed-hero" }, _attrs))} data-v-c5775e33><div class="ed-hero__inner" data-v-c5775e33>`);
      if (__props.eyebrow) {
        _push(`<div class="ed-hero__eyebrow" style="${ssrRenderStyle({ color: __props.eyebrowColor })}" data-v-c5775e33><span class="ed-hero__eyebrow-dash" data-v-c5775e33></span> ${ssrInterpolate(__props.eyebrow)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="ed-hero__title" data-v-c5775e33>${ssrInterpolate(__props.title)}</h1>`);
      if (__props.meta && __props.meta.length) {
        _push(ssrRenderComponent(__unplugin_components_1, {
          items: __props.meta,
          class: "ed-hero__meta"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.lede) {
        _push(`<p class="ed-hero__lede" data-v-c5775e33>${__props.lede ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "lede", {}, null, _push, _parent);
      if (__props.keyNums && __props.keyNums.length) {
        _push(ssrRenderComponent(__unplugin_components_2, {
          items: __props.keyNums,
          class: "ed-hero__keynums"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5775e33"]]);
export {
  __unplugin_components_0 as _,
  __unplugin_components_1 as a,
  __unplugin_components_2 as b
};
