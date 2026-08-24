import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { c as STATUS } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PvStatusPill",
  __ssrInlineRender: true,
  props: {
    status: {},
    size: { default: "md" }
  },
  setup(__props) {
    const props = __props;
    const meta = computed(() => STATUS[props.status] ?? STATUS.open);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["pv-status", `pv-status--${__props.size}`],
        style: { color: meta.value.fg, background: meta.value.bg }
      }, _attrs))} data-v-9b234156><span class="pv-status__dot" style="${ssrRenderStyle({ background: meta.value.fg })}" data-v-9b234156></span> ${ssrInterpolate(meta.value.label)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvStatusPill.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PvStatusPill = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b234156"]]);
export {
  PvStatusPill as P
};
