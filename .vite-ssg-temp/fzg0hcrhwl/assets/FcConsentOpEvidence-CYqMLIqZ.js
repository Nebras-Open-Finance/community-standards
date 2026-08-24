import { _ as __unplugin_components_2 } from "./types-BEa3NRi5.js";
import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcConsentOpEvidence",
  __ssrInlineRender: true,
  props: {
    op: {},
    state: {},
    version: {},
    complete: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const url = computed(() => props.op.baseUrlTemplate.replace("{VERSION}", props.version) + props.op.path);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcFileInput = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-ev" }, _attrs))} data-v-a4b67783><div class="fc-ev__head" data-v-a4b67783><span class="fc-ev__method" data-v-a4b67783>${ssrInterpolate(__props.op.method)}</span><code class="fc-ev__path" data-v-a4b67783>${ssrInterpolate(__props.op.path)}</code><span class="${ssrRenderClass([__props.complete ? "fc-ev__status--ok" : "fc-ev__status--todo", "fc-ev__status"])}" data-v-a4b67783>${ssrInterpolate(__props.complete ? "✓ Complete" : "Incomplete")}</span></div><p class="fc-ev__title" data-v-a4b67783>${ssrInterpolate(__props.op.title)}</p><p class="fc-ev__scenario" data-v-a4b67783>${ssrInterpolate(__props.op.scenario)}</p><p class="fc-ev__url" data-v-a4b67783><span class="fc-ev__label" data-v-a4b67783>Call</span><code class="fc-ev__urlval" data-v-a4b67783>${ssrInterpolate(url.value)}</code></p>`);
      if (__props.op.docHref) {
        _push(`<p class="fc-ev__doc" data-v-a4b67783><a${ssrRenderAttr("href", __props.op.docHref)} target="_blank" rel="noopener" data-v-a4b67783>View the API reference for this operation ↗</a></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_FcFileInput, {
        modelValue: __props.state.postman,
        "onUpdate:modelValue": ($event) => __props.state.postman = $event,
        label: "Postman success screenshot",
        accept: "image/png,image/jpeg,image/webp",
        hint: "Screenshot from Postman showing a successful call for this operation."
      }, null, _parent));
      if (__props.op.captureErrorDetails) {
        _push(`<!--[--><div class="fc-ev__err" data-v-a4b67783><label class="fc-ev__label"${ssrRenderAttr("for", `err-${__props.op.slug}`)} data-v-a4b67783>error</label><input${ssrRenderAttr("id", `err-${__props.op.slug}`)}${ssrRenderAttr("value", __props.state.error)} class="fc-ev__input" type="text" placeholder="access_denied" spellcheck="false" data-v-a4b67783><p class="fc-ev__errhint" data-v-a4b67783> The OAuth2 / OIDC <code data-v-a4b67783>error</code> value you return when the customer cancels the authorization. The convention for a customer declining is <code data-v-a4b67783>access_denied</code>. </p></div><div class="fc-ev__err" data-v-a4b67783><label class="fc-ev__label"${ssrRenderAttr("for", `errd-${__props.op.slug}`)} data-v-a4b67783>error_description</label><input${ssrRenderAttr("id", `errd-${__props.op.slug}`)}${ssrRenderAttr("value", __props.state.errorDescription)} class="fc-ev__input" type="text" placeholder="The customer cancelled the authorization." data-v-a4b67783><p class="fc-ev__errhint" data-v-a4b67783>The human-readable description you return alongside the error.</p></div><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcConsentOpEvidence.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a4b67783"]]);
export {
  __unplugin_components_3 as _
};
