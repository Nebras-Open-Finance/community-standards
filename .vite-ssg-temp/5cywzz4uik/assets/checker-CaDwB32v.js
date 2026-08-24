import { defineComponent, ref, onUnmounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checker",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Redirect checker" });
    const input = ref("");
    const loading = ref(false);
    const error = ref(null);
    const result = ref(null);
    const checkedInput = ref("");
    function probesOf(v) {
      const rows = [
        { label: "Android", file: "/.well-known/assetlinks.json", probe: v.android, optional: false },
        { label: "iOS", file: "/.well-known/apple-app-site-association", probe: v.ios, optional: false }
      ];
      if (v.huawei) {
        rows.push({ label: "Huawei", file: "/.well-known/applinking.json", probe: v.huawei, optional: true });
      }
      return rows;
    }
    function toneOf(row) {
      if (row.optional && row.probe.verdict === "fail") return "na";
      return row.probe.verdict;
    }
    function labelOf(row) {
      return toneOf(row) === "na" ? "n/a" : row.probe.verdict;
    }
    function noteOf(row) {
      if (toneOf(row) === "na") {
        return "HarmonyOS App Linking not configured — optional; Huawei users use the browser fallback.";
      }
      return row.probe.note;
    }
    function worstOf(v) {
      if (!v) return null;
      if (v.android.verdict === "fail" || v.ios.verdict === "fail") return "fail";
      if (v.android.verdict === "warn" || v.ios.verdict === "warn") return "warn";
      return "pass";
    }
    const verdictLabel = {
      pass: "Passes deep-link verification",
      warn: "Reachable, with a warning",
      fail: "Does not pass"
    };
    const copied = ref(false);
    let copyTimer;
    onUnmounted(() => clearTimeout(copyTimer));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chk" }, _attrs))} data-v-736ad22a><section class="chk__hero" data-v-736ad22a><div class="chk__eyebrow" data-v-736ad22a><span class="chk__dash" data-v-736ad22a></span> Internal · Redirect testing </div><h1 class="chk__title" data-v-736ad22a>Redirect checker</h1><p class="chk__lede" data-v-736ad22a> Paste any authorisation endpoint, redirect URI or origin. This probes the deep-link verification files at that origin: </p><ul class="chk__criteria" data-v-736ad22a><li data-v-736ad22a><strong class="chk__c chk__c--pass" data-v-736ad22a>Pass</strong> — a <code data-v-736ad22a>200</code> serving valid JSON as <code data-v-736ad22a>application/json</code>. </li><li data-v-736ad22a><strong class="chk__c chk__c--warn" data-v-736ad22a>Warn</strong> — a wrong <code data-v-736ad22a>Content-Type</code>. </li><li data-v-736ad22a><strong class="chk__c chk__c--fail" data-v-736ad22a>Fail</strong> — a redirect, non-200, non-JSON body or network error. </li><li data-v-736ad22a><strong class="chk__c chk__c--na" data-v-736ad22a>n/a</strong> — Huawei <code data-v-736ad22a>applinking.json</code> (HarmonyOS App Linking) only. This file is <strong data-v-736ad22a>not required</strong>, so an absent one is informational, not a failure, and never affects the headline verdict. </li></ul><p class="chk__lede" data-v-736ad22a> These are the same rules as the <a href="/internal/pages/redirect-testing" data-v-736ad22a>redirect testing page</a> (built to check published production <code data-v-736ad22a>authorization_endpoint</code>s). </p></section><form class="chk__form" data-v-736ad22a><input${ssrRenderAttr("value", unref(input))} type="text" class="chk__input" placeholder="https://auth1.examplebank.apihub.openfinance.ae/…" autocomplete="off" spellcheck="false" inputmode="url" data-v-736ad22a><button type="submit" class="chk__btn"${ssrIncludeBooleanAttr(unref(loading) || !unref(input).trim()) ? " disabled" : ""} data-v-736ad22a>${ssrInterpolate(unref(loading) ? "Checking…" : "Check")}</button></form>`);
      if (unref(error)) {
        _push(`<p class="chk__error" data-v-736ad22a>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(result)) {
        _push(`<section class="chk__result" data-v-736ad22a><div class="chk__result-head" data-v-736ad22a>`);
        if (worstOf(unref(result))) {
          _push(`<span class="${ssrRenderClass([`chk__verdict--${worstOf(unref(result))}`, "chk__verdict chk__verdict--lg"])}" data-v-736ad22a>${ssrInterpolate(worstOf(unref(result)))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="chk__result-ident" data-v-736ad22a><div class="chk__result-verdict" data-v-736ad22a>${ssrInterpolate(verdictLabel[worstOf(unref(result))])}</div><a class="chk__origin-link"${ssrRenderAttr("href", unref(result).origin)} target="_blank" rel="noreferrer" data-v-736ad22a>${ssrInterpolate(unref(result).origin)}</a></div></div><div class="chk__probes" data-v-736ad22a><!--[-->`);
        ssrRenderList(probesOf(unref(result)), (p) => {
          _push(`<div class="${ssrRenderClass([`chk__probe--${toneOf(p)}`, "chk__probe"])}" data-v-736ad22a><span class="${ssrRenderClass([`chk__verdict--${toneOf(p)}`, "chk__verdict"])}" data-v-736ad22a>${ssrInterpolate(labelOf(p))}</span><div class="chk__probe-body" data-v-736ad22a><div class="chk__probe-top" data-v-736ad22a><strong class="chk__probe-plat" data-v-736ad22a>${ssrInterpolate(p.label)}</strong>`);
          if (p.optional) {
            _push(`<span class="chk__probe-opt" data-v-736ad22a>informational</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<a class="chk__probe-file"${ssrRenderAttr("href", unref(result).origin + p.file)} target="_blank" rel="noreferrer" data-v-736ad22a><code data-v-736ad22a>${ssrInterpolate(p.file)}</code></a></div><div class="chk__probe-meta" data-v-736ad22a>${ssrInterpolate(p.probe.status ?? "network error")} · ${ssrInterpolate(p.probe.contentType || "no Content-Type")} · ${ssrInterpolate(p.probe.jsonValid ? "valid JSON" : "not JSON")}</div>`);
          if (noteOf(p)) {
            _push(`<div class="chk__probe-note" data-v-736ad22a>${ssrInterpolate(noteOf(p))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><div class="chk__foot" data-v-736ad22a><span class="chk__foot-hint" data-v-736ad22a>Checked <code data-v-736ad22a>${ssrInterpolate(unref(checkedInput))}</code></span><button type="button" class="${ssrRenderClass([{ "chk__copy--done": unref(copied) }, "chk__copy"])}" data-v-736ad22a>${ssrInterpolate(unref(copied) ? "Copied" : "Copy curl")}</button></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/pages/redirect-testing/checker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-736ad22a"]]);
export {
  checker as default
};
