import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdSeverityTable",
  __ssrInlineRender: true,
  props: {
    rows: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-sev" }, _attrs))} data-v-7075b476><div class="ed-sev__head" data-v-7075b476><span data-v-7075b476>Severity</span><span data-v-7075b476>Description</span></div><!--[-->`);
      ssrRenderList(__props.rows, (row) => {
        _push(`<div class="ed-sev__row" style="${ssrRenderStyle({ "--sev-color": row.color || "var(--at-navy)" })}" data-v-7075b476><span class="ed-sev__sev" data-v-7075b476><span class="ed-sev__chip" data-v-7075b476>${ssrInterpolate(row.severity)}</span></span><span class="ed-sev__desc" data-v-7075b476>${row.description ?? ""}</span></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdSeverityTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_9 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7075b476"]]);
export {
  __unplugin_components_9 as _
};
