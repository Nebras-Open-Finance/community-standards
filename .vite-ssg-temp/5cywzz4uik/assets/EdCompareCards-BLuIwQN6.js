import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EdCompareCard",
  __ssrInlineRender: true,
  props: {
    accent: { default: "var(--at-navy)" },
    kicker: {},
    example: { default: "" },
    cadence: { default: "" },
    cadenceLabel: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: "ed-cmpcard",
        style: { "--card-accent": __props.accent }
      }, _attrs))} data-v-aa8ac388><div class="ed-cmpcard__top" data-v-aa8ac388></div><div class="ed-cmpcard__head" data-v-aa8ac388><span class="ed-cmpcard__kicker" data-v-aa8ac388>${ssrInterpolate(__props.kicker)}</span>`);
      if (__props.example) {
        _push(`<span class="ed-cmpcard__example" data-v-aa8ac388>${ssrInterpolate(__props.example)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.cadence) {
        _push(`<div class="ed-cmpcard__cadence" data-v-aa8ac388><span class="ed-cmpcard__cadence-num" data-v-aa8ac388>${ssrInterpolate(__props.cadence)}</span>`);
        if (__props.cadenceLabel) {
          _push(`<span class="ed-cmpcard__cadence-label" data-v-aa8ac388>${ssrInterpolate(__props.cadenceLabel)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ed-cmpcard__body" data-v-aa8ac388>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdCompareCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-aa8ac388"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-compare" }, _attrs))} data-v-96540945>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdCompareCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-96540945"]]);
export {
  __unplugin_components_7 as _,
  __unplugin_components_8 as a
};
