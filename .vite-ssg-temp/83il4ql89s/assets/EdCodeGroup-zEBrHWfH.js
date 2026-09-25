import { defineComponent, ref, onMounted, watch, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EdCodeGroup",
  __ssrInlineRender: true,
  props: {
    tabs: {}
  },
  setup(__props) {
    const props = __props;
    const active = ref(0);
    const highlightedHtml = ref([]);
    const ready = ref(false);
    const copied = ref(false);
    const ESC = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    async function highlightAll() {
      try {
        const { codeToHtml } = await import("shiki");
        highlightedHtml.value = await Promise.all(
          props.tabs.map((t) => codeToHtml(t.code, {
            lang: t.lang,
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: "light"
          }))
        );
      } catch {
        highlightedHtml.value = props.tabs.map(
          (t) => `<pre class="ed-codegroup__plain"><code>${ESC(t.code)}</code></pre>`
        );
      }
      ready.value = true;
    }
    onMounted(highlightAll);
    watch(() => props.tabs.map((t) => `${t.lang}::${t.code}`).join("||"), highlightAll);
    watch(active, () => {
      copied.value = false;
    });
    const activeTab = computed(() => props.tabs[active.value]);
    const activeHtml = computed(() => highlightedHtml.value[active.value] ?? "");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-codegroup" }, _attrs))} data-v-00fb8355><div class="ed-codegroup__tabs" role="tablist" data-v-00fb8355><!--[-->`);
      ssrRenderList(__props.tabs, (t, i) => {
        _push(`<button type="button" role="tab" class="${ssrRenderClass([{ "is-active": i === active.value }, "ed-codegroup__tab"])}"${ssrRenderAttr("aria-selected", i === active.value)} data-v-00fb8355>${ssrInterpolate(t.label)}</button>`);
      });
      _push(`<!--]-->`);
      if (activeTab.value) {
        _push(`<span class="ed-codegroup__lang" data-v-00fb8355>${ssrInterpolate(activeTab.value.lang)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="${ssrRenderClass([{ "is-copied": copied.value }, "ed-codegroup__copy"])}"${ssrRenderAttr("aria-label", copied.value ? "Copied" : "Copy code")}${ssrRenderAttr("title", copied.value ? "Copied" : "Copy code")} data-v-00fb8355>`);
      if (!copied.value) {
        _push(`<svg class="ed-codegroup__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-00fb8355><rect x="9" y="9" width="13" height="13" rx="1" data-v-00fb8355></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-v-00fb8355></path></svg>`);
      } else {
        _push(`<svg class="ed-codegroup__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-00fb8355><polyline points="20 6 9 17 4 12" data-v-00fb8355></polyline></svg>`);
      }
      _push(`<span class="ed-codegroup__copy-label" data-v-00fb8355>${ssrInterpolate(copied.value ? "Copied" : "Copy")}</span></button></div>`);
      if (ready.value) {
        _push(`<div class="ed-codegroup__body" data-v-00fb8355>${activeHtml.value ?? ""}</div>`);
      } else {
        _push(`<pre class="ed-codegroup__plain" data-v-00fb8355><code data-v-00fb8355>${ssrInterpolate(((_a = activeTab.value) == null ? void 0 : _a.code) ?? "")}</code></pre>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdCodeGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_9 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00fb8355"]]);
export {
  __unplugin_components_9 as _
};
