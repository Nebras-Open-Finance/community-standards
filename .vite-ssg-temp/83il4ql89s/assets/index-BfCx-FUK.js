import { defineComponent, watch, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { u as usePiiReport, R as ReportPanel } from "./ReportPanel-XGgRzEMe.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "PII report" });
    const {
      env,
      busy,
      error,
      done,
      loginUrl,
      redirecting,
      loopDetected,
      downloadCsv,
      reset,
      resume,
      retry
    } = usePiiReport();
    watch(env, reset);
    onMounted(resume);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ReportPanel, mergeProps({
        title: "PII Report",
        description: "Select an environment and download the pooled directory emails as CSV.",
        "file-label": "PII report file",
        env: unref(env),
        busy: unref(busy),
        error: unref(error),
        done: unref(done),
        "login-url": unref(loginUrl),
        redirecting: unref(redirecting),
        "loop-detected": unref(loopDetected),
        "done-message": "PII report generated.",
        "onUpdate:env": ($event) => env.value = $event,
        onDownload: unref(downloadCsv),
        onRetry: unref(retry)
      }, _attrs), {
        options: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="pii__warn" data-v-843b61db${_scopeId}><strong data-v-843b61db${_scopeId}>Contains personal data.</strong> This export lists directory users&#39; email addresses. If you are not already signed in, you will be sent to the Trust Framework to do so, and the export is recorded against your account. Handle the file accordingly and delete it when you are done. </p>`);
          } else {
            return [
              createVNode("p", { class: "pii__warn" }, [
                createVNode("strong", null, "Contains personal data."),
                createTextVNode(" This export lists directory users' email addresses. If you are not already signed in, you will be sent to the Trust Framework to do so, and the export is recorded against your account. Handle the file accordingly and delete it when you are done. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/pages/pii-report/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-843b61db"]]);
export {
  index as default
};
