import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = {
  __name: "DirhamAmount",
  __ssrInlineRender: true,
  props: {
    amount: {
      type: [String, Number],
      default: ""
    },
    iconColor: {
      type: String,
      default: "currentColor"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dirham-amount-container" }, _attrs))} data-v-59c1bde2><svg class="dirham-icon" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-59c1bde2><path d="M12.926 4.81517L12.8277 4.735C12.6689 4.60135 12.48 4.53454 12.2759 4.53454H11.2176C11.2327 4.6949 11.2403 4.85527 11.2403 5.02899C11.2403 5.20271 11.2327 5.36307 11.2176 5.53012H11.9357C12.48 5.53012 12.926 5.98448 12.926 6.55242V6.80633L12.8277 6.71947C12.6689 6.59251 12.48 6.5257 12.2759 6.5257H11.0588C10.4768 8.77749 8.44345 10.0002 5.23841 10.0002H1.1263C1.1263 10.0002 1.68566 9.61933 1.68566 8.34313V6.5257H0.997795C0.445983 6.5257 0 6.06466 0 5.50339V5.24949L0.105827 5.32967C0.257007 5.45662 0.445983 5.53012 0.650077 5.53012H1.68566V4.53454H0.997795C0.445983 4.53454 0 4.0735 0 3.51223V3.25833L0.105827 3.34519C0.257007 3.47214 0.445983 3.53896 0.650077 3.53896H1.68566V1.79502C1.68566 0.478721 1.1263 0.0644531 1.1263 0.0644531H5.23841C8.35274 0.0644531 10.439 1.27385 11.0513 3.53896H11.9357C12.48 3.53896 12.926 3.99332 12.926 4.56127V4.81517ZM5.08724 0.558902H3.37134V3.53896H9.13888C8.74581 1.46762 7.40786 0.558902 5.08724 0.558902ZM9.27494 5.02899C9.27494 4.85527 9.26738 4.6949 9.25982 4.53454H3.37134V5.53012H9.25982C9.26738 5.36307 9.27494 5.20271 9.27494 5.02899ZM3.37134 9.49907H5.10235C7.55904 9.44564 8.76849 8.40327 9.13888 6.5257H3.37134V9.49907Z"${ssrRenderAttr("fill", __props.iconColor)} data-v-59c1bde2></path></svg><div class="dirham-amount" data-v-59c1bde2>${ssrInterpolate(__props.amount)}</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/DirhamAmount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DirhamAmount = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-59c1bde2"]]);
export {
  DirhamAmount as D
};
