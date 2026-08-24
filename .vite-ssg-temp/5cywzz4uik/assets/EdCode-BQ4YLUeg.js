import { defineComponent, ref, onMounted, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdCode",
  __ssrInlineRender: true,
  props: {
    code: {},
    lang: { default: "plaintext" },
    filename: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const html = ref("");
    const ready = ref(false);
    const copied = ref(false);
    const ESC = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki");
        html.value = await codeToHtml(props.code, {
          lang: props.lang,
          themes: {
            light: "github-light",
            dark: "github-dark"
          },
          defaultColor: "light"
        });
      } catch {
        html.value = `<pre class="ed-code__plain"><code>${ESC(props.code)}</code></pre>`;
      }
      ready.value = true;
    }
    onMounted(highlight);
    watch(() => [props.code, props.lang], highlight);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-code" }, _attrs))} data-v-dbc572e7><div class="ed-code__head" data-v-dbc572e7>`);
      if (__props.filename) {
        _push(`<span class="ed-code__filename" data-v-dbc572e7>${ssrInterpolate(__props.filename)}</span>`);
      } else {
        _push(`<span class="ed-code__filename ed-code__filename--placeholder" data-v-dbc572e7></span>`);
      }
      if (__props.lang !== "plaintext") {
        _push(`<span class="ed-code__lang" data-v-dbc572e7>${ssrInterpolate(__props.lang)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="${ssrRenderClass([{ "is-copied": copied.value }, "ed-code__copy"])}"${ssrRenderAttr("aria-label", copied.value ? "Copied" : "Copy code")}${ssrRenderAttr("title", copied.value ? "Copied" : "Copy code")} data-v-dbc572e7>`);
      if (!copied.value) {
        _push(`<svg class="ed-code__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-dbc572e7><rect x="9" y="9" width="13" height="13" rx="1" data-v-dbc572e7></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-v-dbc572e7></path></svg>`);
      } else {
        _push(`<svg class="ed-code__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-dbc572e7><polyline points="20 6 9 17 4 12" data-v-dbc572e7></polyline></svg>`);
      }
      _push(`<span class="ed-code__copy-label" data-v-dbc572e7>${ssrInterpolate(copied.value ? "Copied" : "Copy")}</span></button></div>`);
      if (ready.value) {
        _push(`<div class="ed-code__body" data-v-dbc572e7>${html.value ?? ""}</div>`);
      } else {
        _push(`<pre class="ed-code__plain" data-v-dbc572e7><code data-v-dbc572e7>${ssrInterpolate(__props.code)}</code></pre>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EdCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbc572e7"]]);
export {
  EdCode as E
};
