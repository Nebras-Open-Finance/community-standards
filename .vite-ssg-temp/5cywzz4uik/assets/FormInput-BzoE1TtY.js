import { defineComponent, useId, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormInput",
  __ssrInlineRender: true,
  props: {
    name: { default: "" },
    input: { default: "" },
    placeholder: { default: "" },
    error: { type: Boolean, default: false },
    type: { default: "text" }
  },
  emits: ["output"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputId = useId();
    ref(null);
    const data = ref(props.input ?? "");
    watch(() => props.input, (v) => {
      data.value = v ?? "";
    });
    watch(data, (v) => emit("output", { data: v }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["fi", {
          "fi--has-value": data.value !== "" && data.value !== void 0 && data.value !== null,
          "fi--error": __props.error
        }]
      }, _attrs))} data-v-a9862ea7><input${ssrRenderAttr("id", unref(inputId))}${ssrRenderDynamicModel(__props.type, data.value, null)}${ssrRenderAttr("name", __props.name)}${ssrRenderAttr("type", __props.type)} class="fi__input" data-v-a9862ea7><label${ssrRenderAttr("for", unref(inputId))} class="fi__label" data-v-a9862ea7>${ssrInterpolate(__props.placeholder)}</label></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/FormInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9862ea7"]]);
export {
  __unplugin_components_0 as _
};
