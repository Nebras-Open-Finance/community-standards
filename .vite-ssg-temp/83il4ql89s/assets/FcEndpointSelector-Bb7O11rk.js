import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcEndpointSelector",
  __ssrInlineRender: true,
  props: {
    title: {},
    items: {},
    version: {},
    versions: {},
    segment: {},
    segments: {}
  },
  emits: ["toggle", "select-all", "clear", "update:version", "toggle-segment"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    function segmentOn(s) {
      return !!props.segment && props.segment.includes(s);
    }
    const selectedCount = computed(() => props.items.filter((i) => i.selected).length);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ep-area" }, _attrs))} data-v-eb39aa32><div class="ep-area-head" data-v-eb39aa32><div data-v-eb39aa32><span class="ep-area-name" data-v-eb39aa32>${ssrInterpolate(__props.title)}</span><div class="ep-area-meta" data-v-eb39aa32>${ssrInterpolate(selectedCount.value)} of ${ssrInterpolate(__props.items.length)} selected</div></div><div class="ep-area-actions" data-v-eb39aa32><button type="button" class="mini-btn" data-v-eb39aa32>Select all</button><button type="button" class="mini-btn" data-v-eb39aa32>Clear</button></div></div><div class="ep-controls" data-v-eb39aa32><div class="ep-ctrl" data-v-eb39aa32><label class="ep-ctrl-label" data-v-eb39aa32>API version</label><div class="ep-select" data-v-eb39aa32><select${ssrRenderAttr("value", __props.version)} data-v-eb39aa32><!--[-->`);
      ssrRenderList(__props.versions, (v) => {
        _push(`<option${ssrRenderAttr("value", v)} data-v-eb39aa32>${ssrInterpolate(v)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      if (__props.segments && __props.segments.length) {
        _push(`<div class="ep-ctrl" data-v-eb39aa32><label class="ep-ctrl-label" data-v-eb39aa32>Segment <span class="ep-ctrl-hint" data-v-eb39aa32>select all that apply</span></label><div class="ep-seg" data-v-eb39aa32><!--[-->`);
        ssrRenderList(__props.segments, (s) => {
          _push(`<button type="button" class="${ssrRenderClass([{ on: segmentOn(s) }, "ep-seg-btn"])}"${ssrRenderAttr("aria-pressed", segmentOn(s))} data-v-eb39aa32>${ssrInterpolate(s)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ep-list" data-v-eb39aa32><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ on: item.selected }, "ep-item"])}" role="checkbox"${ssrRenderAttr("aria-checked", item.selected)} tabindex="0" data-v-eb39aa32><span class="ep-box" data-v-eb39aa32>${ssrInterpolate(item.selected ? "✓" : "")}</span><span class="ep-info" data-v-eb39aa32><span class="ep-name" data-v-eb39aa32>${ssrInterpolate(item.name)}</span><span class="ep-path" data-v-eb39aa32>${ssrInterpolate(item.method)} ${ssrInterpolate(item.path)}</span></span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcEndpointSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb39aa32"]]);
export {
  __unplugin_components_2 as _
};
