import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { b as STANCE_ORDER, S as STANCE } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PvVoteBar",
  __ssrInlineRender: true,
  props: {
    counts: {},
    compact: { type: Boolean, default: false },
    bare: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const total = computed(() => Math.max(props.counts.total, 1));
    const segments = computed(
      () => STANCE_ORDER.map((stance) => ({
        stance,
        value: props.counts[stance],
        label: STANCE[stance].label,
        bar: STANCE[stance].bar,
        pct: props.counts[stance] / total.value * 100
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pv-votebar" }, _attrs))} data-v-99c04b43><div class="${ssrRenderClass([{ "pv-votebar__track--compact": __props.compact, "pv-votebar__track--bare": __props.bare }, "pv-votebar__track"])}" data-v-99c04b43><!--[-->`);
      ssrRenderList(segments.value, (seg) => {
        _push(`<div class="pv-votebar__seg" style="${ssrRenderStyle({ width: seg.pct + "%", background: seg.bar })}"${ssrRenderAttr("title", `${seg.label}: ${seg.value}`)} data-v-99c04b43></div>`);
      });
      _push(`<!--]--></div>`);
      if (!__props.compact && !__props.bare) {
        _push(`<div class="pv-votebar__legend" data-v-99c04b43><!--[-->`);
        ssrRenderList(segments.value, (seg) => {
          _push(`<span class="pv-votebar__legend-item" data-v-99c04b43><span class="pv-votebar__swatch" style="${ssrRenderStyle({ background: seg.bar })}" data-v-99c04b43></span><span class="pv-votebar__count" data-v-99c04b43>${ssrInterpolate(seg.value)}</span><span class="pv-votebar__legend-label" data-v-99c04b43>${ssrInterpolate(seg.label)}</span></span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvVoteBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PvVoteBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99c04b43"]]);
export {
  PvVoteBar as P
};
