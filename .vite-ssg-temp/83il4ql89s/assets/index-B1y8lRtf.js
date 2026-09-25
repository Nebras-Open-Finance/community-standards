import { defineComponent, onMounted, watch, computed, mergeProps, unref, createSlots, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { a as useTrustFrameworkReport, R as ReportPanel } from "./ReportPanel-XGgRzEMe.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Generate report" });
    const {
      env,
      busy,
      error,
      done,
      loginUrl,
      summary,
      summaryBusy,
      loadSummary,
      downloadWorkbook,
      reset
    } = useTrustFrameworkReport();
    onMounted(loadSummary);
    watch(env, () => {
      reset();
      loadSummary();
    });
    const totalRows = computed(
      () => summary.value ? summary.value.organisations + summary.value.authServers + summary.value.apiResources : null
    );
    const hint = computed(() => {
      if (summaryBusy.value) return "Counting rows…";
      if (totalRows.value === null) return "Three sheets: Organisations, Auth Servers, API Resources";
      return `${totalRows.value} rows across three sheets — Organisations, Auth Servers, API Resources`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ReportPanel, mergeProps({
        title: "Generate Report",
        description: "Select an environment and download the trust-framework report as an Excel workbook.",
        "file-label": "Report file",
        format: "XLSX",
        "file-hint": hint.value,
        env: unref(env),
        busy: unref(busy),
        error: unref(error),
        done: unref(done),
        "login-url": unref(loginUrl),
        "onUpdate:env": ($event) => env.value = $event,
        onDownload: unref(downloadWorkbook)
      }, _attrs), createSlots({ _: 2 }, [
        unref(summary) ? {
          name: "options",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<dl class="gr__counts" data-v-8fb36c88${_scopeId}><div data-v-8fb36c88${_scopeId}><dt data-v-8fb36c88${_scopeId}>Organisations</dt><dd data-v-8fb36c88${_scopeId}>${ssrInterpolate(unref(summary).organisations)}</dd></div><div data-v-8fb36c88${_scopeId}><dt data-v-8fb36c88${_scopeId}>Authorisation servers</dt><dd data-v-8fb36c88${_scopeId}>${ssrInterpolate(unref(summary).authServers)}</dd></div><div data-v-8fb36c88${_scopeId}><dt data-v-8fb36c88${_scopeId}>API resources</dt><dd data-v-8fb36c88${_scopeId}>${ssrInterpolate(unref(summary).apiResources)}</dd></div></dl>`);
            } else {
              return [
                createVNode("dl", { class: "gr__counts" }, [
                  createVNode("div", null, [
                    createVNode("dt", null, "Organisations"),
                    createVNode("dd", null, toDisplayString(unref(summary).organisations), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", null, "Authorisation servers"),
                    createVNode("dd", null, toDisplayString(unref(summary).authServers), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", null, "API resources"),
                    createVNode("dd", null, toDisplayString(unref(summary).apiResources), 1)
                  ])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/pages/generate-report/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8fb36c88"]]);
export {
  index as default
};
