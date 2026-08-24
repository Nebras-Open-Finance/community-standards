import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdNote",
  __ssrInlineRender: true,
  props: {
    type: { default: "tip" },
    title: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const palette = {
      tip: { color: "var(--at-teal)", label: "Tip" },
      info: { color: "var(--at-blue-deep)", label: "Note" },
      note: { color: "var(--at-blue-deep)", label: "Note" },
      warning: { color: "var(--at-gold)", label: "Warning" },
      caution: { color: "var(--at-gold)", label: "Caution" },
      important: { color: "var(--at-gold)", label: "Important" },
      danger: { color: "#B33A3A", label: "Danger" }
    };
    const accent = computed(() => palette[props.type].color);
    const defaultLabel = computed(() => palette[props.type].label);
    const displayTitle = computed(() => props.title || defaultLabel.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "ed-note",
        style: { "--note-accent": accent.value }
      }, _attrs))} data-v-c6d70887><div class="ed-note__rail" data-v-c6d70887></div><div class="ed-note__body" data-v-c6d70887><div class="ed-note__title" data-v-c6d70887>${ssrInterpolate(displayTitle.value)}</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdNote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6d70887"]]);
export {
  __unplugin_components_7 as _
};
