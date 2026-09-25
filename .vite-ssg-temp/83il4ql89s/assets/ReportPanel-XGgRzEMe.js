import { ref, computed, defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { c as clearSignInReturn, r as rememberSignInReturn, _ as _export_sfc } from "../main.mjs";
const API_BASE = "https://reports-api.nebras-open-finance.com".replace(/\/$/, "");
const LOGIN_COOLDOWN_MS = 12e4;
const RESUME_TTL_MS = 10 * 6e4;
const ENV_LABEL = {
  sandbox: "Sandbox",
  prod: "Production"
};
function filenameFrom(res, fallback) {
  const cd = res.headers.get("Content-Disposition") || "";
  const match = cd.match(/filename="?([^";]+)"?/i);
  return (match == null ? void 0 : match[1]) ?? fallback;
}
function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function withRedirect(raw) {
  if (typeof window === "undefined") return raw;
  try {
    const url = new URL(raw, window.location.origin);
    url.searchParams.set("redirect", window.location.href);
    return url.toString();
  } catch {
    return raw;
  }
}
function useDownloader(auth) {
  const env = ref("sandbox");
  const busy = ref(false);
  const error = ref(null);
  const done = ref(false);
  const loginUrl = ref(null);
  const redirecting = ref(false);
  const loopDetected = ref(false);
  const envLabel = computed(() => ENV_LABEL[env.value]);
  function reset() {
    error.value = null;
    done.value = false;
    loginUrl.value = null;
    loopDetected.value = false;
  }
  function startSignIn(target) {
    if (!auth || typeof window === "undefined") return false;
    let marker = 0;
    try {
      marker = Number(window.sessionStorage.getItem(auth.markerKey) || 0);
    } catch {
    }
    if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
      try {
        window.sessionStorage.removeItem(auth.markerKey);
      } catch {
      }
      loopDetected.value = true;
      return false;
    }
    try {
      window.sessionStorage.setItem(auth.markerKey, String(Date.now()));
      window.sessionStorage.setItem(
        auth.resumeKey,
        JSON.stringify({ t: Date.now(), env: env.value })
      );
    } catch {
    }
    rememberSignInReturn();
    redirecting.value = true;
    window.location.href = withRedirect(target);
    return true;
  }
  function clearMarker() {
    if (!auth || typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(auth.markerKey);
    } catch {
    }
    clearSignInReturn();
  }
  function retrySignIn(run) {
    clearMarker();
    loopDetected.value = false;
    void run();
  }
  function resumeAfterSignIn(run) {
    if (!auth || typeof window === "undefined") return;
    let raw = null;
    try {
      raw = window.sessionStorage.getItem(auth.resumeKey);
      if (raw) window.sessionStorage.removeItem(auth.resumeKey);
    } catch {
      return;
    }
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (!saved.t || Date.now() - saved.t > RESUME_TTL_MS) return;
      if (saved.env === "sandbox" || saved.env === "prod") env.value = saved.env;
    } catch {
      return;
    }
    void run();
  }
  async function download(path, fallbackName) {
    reset();
    busy.value = true;
    try {
      const res = await fetch(`${API_BASE}${path}`, { credentials: "include" });
      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const body = await res.json();
          if (body == null ? void 0 : body.error) message = body.error;
          if (body == null ? void 0 : body.login_url) loginUrl.value = body.login_url;
        } catch {
        }
        if (res.status === 401 && startSignIn(loginUrl.value ?? `${API_BASE}/login`)) return;
        error.value = message;
        return;
      }
      clearMarker();
      const blob = await res.blob();
      saveBlob(blob, filenameFrom(res, fallbackName));
      done.value = true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Network error";
    } finally {
      busy.value = false;
    }
  }
  return {
    env,
    envLabel,
    busy,
    error,
    done,
    loginUrl,
    redirecting,
    loopDetected,
    download,
    reset,
    retrySignIn,
    resumeAfterSignIn
  };
}
function useTrustFrameworkReport() {
  const base = useDownloader();
  const summary = ref(null);
  const summaryBusy = ref(false);
  async function loadSummary() {
    summary.value = null;
    summaryBusy.value = true;
    try {
      const res = await fetch(
        `${API_BASE}/reports/trust-framework/summary?env=${base.env.value}`,
        { credentials: "include" }
      );
      if (res.ok) summary.value = await res.json();
    } catch {
    } finally {
      summaryBusy.value = false;
    }
  }
  async function downloadWorkbook() {
    await base.download(
      `/reports/trust-framework?env=${base.env.value}`,
      `trustframework-${base.env.value}.xlsx`
    );
  }
  return { ...base, summary, summaryBusy, loadSummary, downloadWorkbook };
}
function usePiiReport() {
  const base = useDownloader({
    markerKey: "nebras_pii_report_login_attempt",
    resumeKey: "nebras_pii_report_resume"
  });
  async function downloadCsv() {
    await base.download(
      `/reports/pii?env=${base.env.value}`,
      `pii-${base.env.value}.csv`
    );
  }
  return {
    ...base,
    downloadCsv,
    /** Call from onMounted: continues a download interrupted by sign-in. */
    resume: () => base.resumeAfterSignIn(downloadCsv),
    /** Call from the retry button after a sign-in that did not take. */
    retry: () => base.retrySignIn(downloadCsv)
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReportPanel",
  __ssrInlineRender: true,
  props: {
    eyebrow: {},
    title: {},
    description: {},
    fileLabel: {},
    fileHint: {},
    format: {},
    env: {},
    busy: { type: Boolean },
    error: {},
    done: { type: Boolean },
    loginUrl: {},
    doneMessage: {},
    redirecting: { type: Boolean },
    loopDetected: { type: Boolean }
  },
  emits: ["update:env", "download", "retry"],
  setup(__props, { emit: __emit }) {
    const ENVS = ["sandbox", "prod"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rp" }, _attrs))} data-v-6788c180><div class="rp__eyebrow" data-v-6788c180>${ssrInterpolate(__props.eyebrow ?? "API Hub")}</div><h1 class="rp__title" data-v-6788c180>${ssrInterpolate(__props.title)}</h1><p class="rp__lede" data-v-6788c180>${ssrInterpolate(__props.description)}</p><div class="rp__card" data-v-6788c180><div data-v-6788c180><div class="rp__label" data-v-6788c180>Environment</div><div class="rp__envs" data-v-6788c180><!--[-->`);
      ssrRenderList(ENVS, (value) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "rp__env--on": __props.env === value }, "rp__env"])}"${ssrRenderAttr("aria-pressed", __props.env === value)} data-v-6788c180><span class="${ssrRenderClass([`rp__dot--${value}`, "rp__dot"])}" data-v-6788c180></span> ${ssrInterpolate(unref(ENV_LABEL)[value])}</button>`);
      });
      _push(`<!--]--></div></div>`);
      ssrRenderSlot(_ctx.$slots, "options", {}, null, _push, _parent);
      _push(`<div class="rp__rule" data-v-6788c180></div><div class="rp__row" data-v-6788c180><div data-v-6788c180><div class="rp__file" data-v-6788c180>${ssrInterpolate(__props.fileLabel)}</div><div class="rp__hint" data-v-6788c180>${ssrInterpolate(__props.fileHint ?? `${__props.format ?? "CSV"} — ${unref(ENV_LABEL)[__props.env]} environment`)}</div></div><button type="button" class="rp__go"${ssrIncludeBooleanAttr(__props.busy || __props.redirecting) ? " disabled" : ""} data-v-6788c180><svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" data-v-6788c180><path d="M10 3 V13 M10 13 L6 9 M10 13 L14 9" stroke="currentColor" stroke-width="1.8" fill="none" data-v-6788c180></path><path d="M4 15 V16.5 C4 17.3 4.7 18 5.5 18 H14.5 C15.3 18 16 17.3 16 16.5 V15" stroke="currentColor" stroke-width="1.8" fill="none" data-v-6788c180></path></svg> ${ssrInterpolate(__props.busy ? "Generating…" : `Download ${__props.format ?? "CSV"}`)}</button></div>`);
      if (__props.redirecting) {
        _push(`<p class="rp__note" data-v-6788c180> Taking you to the Trust Framework to sign in. The download continues when you come back. </p>`);
      } else if (__props.loopDetected) {
        _push(`<div class="rp__error" data-v-6788c180><p class="rp__errline" data-v-6788c180>Sign-in didn&#39;t complete.</p><p class="rp__errline" data-v-6788c180> We sent you to the Trust Framework but the session didn&#39;t stick. Try again, and if this keeps happening, check that third-party cookies are allowed for this site and that your directory account has access to this report. </p><button type="button" class="rp__retry" data-v-6788c180>Try again</button></div>`);
      } else if (__props.busy) {
        _push(`<p class="rp__note" data-v-6788c180> Building the report from the ${ssrInterpolate(unref(ENV_LABEL)[__props.env])} directory. This can take up to a minute. </p>`);
      } else if (__props.error) {
        _push(`<p class="rp__error" data-v-6788c180>${ssrInterpolate(__props.error)} `);
        if (__props.loginUrl) {
          _push(`<a${ssrRenderAttr("href", __props.loginUrl)} class="rp__signin" data-v-6788c180>Sign in and try again</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else if (__props.done) {
        _push(`<p class="rp__done" data-v-6788c180>${ssrInterpolate(__props.doneMessage ?? `Report generated for ${unref(ENV_LABEL)[__props.env]}.`)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/ReportPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ReportPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6788c180"]]);
export {
  ReportPanel as R,
  useTrustFrameworkReport as a,
  usePiiReport as u
};
