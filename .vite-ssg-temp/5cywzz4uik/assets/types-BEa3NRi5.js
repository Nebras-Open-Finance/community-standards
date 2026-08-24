import { defineComponent, computed, mergeProps, useSSRContext, ref, unref } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc, C as CURRENT_VERSION } from "../main.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FcFileInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    accept: {},
    hint: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const inputId = `fc-file-${Math.random().toString(36).slice(2, 9)}`;
    const sizeLabel = computed(() => {
      const f = props.modelValue;
      if (!f) return "";
      const mb = f.size / (1024 * 1024);
      if (mb >= 1) return `${mb.toFixed(1)} MB`;
      return `${Math.max(1, Math.round(f.size / 1024))} KB`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-file" }, _attrs))} data-v-c25f1404><div class="fc-file__head" data-v-c25f1404><label class="fc-file__title"${ssrRenderAttr("for", inputId)} data-v-c25f1404>${ssrInterpolate(__props.label)}</label>`);
      if (__props.hint) {
        _push(`<span class="fc-file__hint" data-v-c25f1404>${ssrInterpolate(__props.hint)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="fc-file__row" data-v-c25f1404><input${ssrRenderAttr("id", inputId)} type="file" class="fc-file__input"${ssrRenderAttr("accept", __props.accept)} data-v-c25f1404>`);
      if (__props.modelValue) {
        _push(`<div class="fc-file__chosen" data-v-c25f1404><span class="fc-file__tick" data-v-c25f1404>✓</span><span class="fc-file__name" data-v-c25f1404>${ssrInterpolate(__props.modelValue.name)}</span><span class="fc-file__size" data-v-c25f1404>${ssrInterpolate(sizeLabel.value)}</span><button type="button" class="fc-file__remove" data-v-c25f1404>Remove</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcFileInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c25f1404"]]);
const API_BASE = "https://proposals-api.nebras-open-finance.com".replace(/\/$/, "");
const auth = ref({ loaded: false, authenticated: false, blocked: false, orgs: [] });
function normaliseOrgs(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(
    (o) => typeof o === "string" ? { id: o, name: o } : { id: String((o == null ? void 0 : o.id) ?? (o == null ? void 0 : o.name) ?? ""), name: String((o == null ? void 0 : o.name) ?? (o == null ? void 0 : o.id) ?? "") }
  ).filter((o) => o.name);
}
async function loadMe() {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: "include" });
    if (!res.ok) {
      auth.value = { loaded: true, authenticated: false, blocked: false, orgs: [] };
      return;
    }
    const d = await res.json();
    auth.value = {
      loaded: true,
      authenticated: !!d.authenticated,
      blocked: !!d.blocked,
      name: d.name,
      email: d.email,
      orgs: normaliseOrgs(d.orgs)
    };
  } catch {
    auth.value = { loaded: true, authenticated: false, blocked: false, orgs: [] };
  }
}
function signIn() {
  if (typeof window === "undefined") return;
  const redirect = encodeURIComponent(window.location.href);
  window.location.href = `${API_BASE}/login?redirect=${redirect}`;
}
function useSandboxAuth() {
  return { auth, loadMe, signIn };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcIdentity",
  __ssrInlineRender: true,
  props: {
    selected: {}
  },
  emits: ["update:selected"],
  setup(__props, { emit: __emit }) {
    const { auth: auth2 } = useSandboxAuth();
    const identityName = computed(() => auth2.value.name ?? auth2.value.email ?? "");
    const orgs = computed(() => auth2.value.orgs);
    const multiOrg = computed(() => orgs.value.length > 1);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if (!unref(auth2).loaded) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-id fc-id--muted" }, _attrs))} data-v-465fff99>Checking your session…</div>`);
      } else if (unref(auth2).authenticated) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-id" }, _attrs))} data-v-465fff99><div class="fc-id__who" data-v-465fff99><span class="fc-id__label" data-v-465fff99>Signed in as</span><span class="fc-id__val" data-v-465fff99>${ssrInterpolate(identityName.value || "—")}</span></div>`);
        if (!multiOrg.value) {
          _push(`<div class="fc-id__who" data-v-465fff99><span class="fc-id__label" data-v-465fff99>Organisation</span><span class="fc-id__val" data-v-465fff99><strong data-v-465fff99>${ssrInterpolate(((_a = orgs.value[0]) == null ? void 0 : _a.name) || "—")}</strong></span></div>`);
        } else {
          _push(`<div class="fc-id__orgs" data-v-465fff99><span class="fc-id__label" data-v-465fff99>This certification is for</span><!--[-->`);
          ssrRenderList(orgs.value, (o) => {
            _push(`<label class="fc-id__org" data-v-465fff99><input type="checkbox"${ssrIncludeBooleanAttr(__props.selected.includes(o.id)) ? " checked" : ""} data-v-465fff99><span data-v-465fff99>${ssrInterpolate(o.name)}</span></label>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else if (unref(auth2).blocked) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-id fc-id--signin" }, _attrs))} data-v-465fff99><p data-v-465fff99>Your Trust Framework account is not permitted to use this service.</p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-id fc-id--signin" }, _attrs))} data-v-465fff99><p data-v-465fff99>You are not signed in.</p><button type="button" class="fc-id__btn" data-v-465fff99>Sign in with the Sandbox Trust Framework</button></div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcIdentity.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-465fff99"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcStepper",
  __ssrInlineRender: true,
  props: {
    steps: {},
    current: {}
  },
  emits: ["go"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fc-stepper" }, _attrs))} data-v-92880476><!--[-->`);
      ssrRenderList(__props.steps, (label, i) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "fc-step--active": __props.current === i + 1, "fc-step--done": __props.current > i + 1 }, "fc-step"])}"${ssrIncludeBooleanAttr(i + 1 > __props.current) ? " disabled" : ""} data-v-92880476><span class="fc-step__num" data-v-92880476>${ssrInterpolate(i + 1)}</span><span class="fc-step__txt" data-v-92880476><span class="fc-step__kicker" data-v-92880476>Step ${ssrInterpolate(i + 1)}</span><span class="fc-step__label" data-v-92880476>${ssrInterpolate(label)}</span></span></button>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcStepper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92880476"]]);
(() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
function emptyConsentOpState() {
  return { postman: null, error: "", errorDescription: "" };
}
function emptyEndpointState() {
  return { selected: false, testLog: null, outcome: "", notes: "", postman: null, responseJson: null };
}
function emptyFormState() {
  return { version: CURRENT_VERSION, segment: [], comments: "" };
}
function emptyTppEndpointState() {
  return { selected: false, postman: null, notes: "" };
}
function emptyTppFormState() {
  return { version: CURRENT_VERSION, segment: [], useCase: "", rarObject: "", alignmentConfirmed: false, comments: "" };
}
function emptyCopScenarioState() {
  return {
    reqName: "",
    reqFirstName: "",
    reqLastName: "",
    reqIban: "",
    resName: "",
    resFirstName: "",
    resLastName: "",
    postman: null,
    confirmedEmpty: false,
    notes: ""
  };
}
function emptyCopFormState() {
  return { version: CURRENT_VERSION, segment: [], testingTool: null, comments: "" };
}
function emptyPaymentRailState() {
  return { supported: false, postman: null };
}
function emptyPaymentTimingState() {
  return {
    postTimestamp: "",
    railSubmitTimestamp: "",
    railSubmitScreenshot: null,
    terminalPatchTimestamp: "",
    terminalPatchScreenshot: null,
    creditorReference: "",
    creditorRefScreenshot: null
  };
}
function emptyPaymentAaniRejectState() {
  return { rejectCode: "", postman: null };
}
function emptyPaymentCreditorRiskState() {
  return {
    decryptScreenshot: null,
    creditorScreenshot: null,
    creditorValidationText: "",
    riskScreenshot: null,
    riskValidationText: ""
  };
}
function emptyPaymentDataSharingState() {
  return {
    consentId: "",
    accountsPostman: null,
    balancesPostman: null,
    postPaymentsPostman: null,
    authScreenshot: null
  };
}
function emptyPaymentRefundState() {
  return { consentId: "", postPaymentsPostman: null, refundPostman: null, authScreenshot: null };
}
function emptyPaymentAuthScenarioState() {
  return { consentId: "", screenshot: null };
}
function emptyPaymentFormState() {
  return {
    version: CURRENT_VERSION,
    segment: [],
    paymentLimit: "",
    limitScreenshot: null,
    testingTool: null,
    postPaymentsPostman: null,
    comments: ""
  };
}
function emptyConsentScenarioState() {
  return { consentId: "", consentDetails: "", authScreenshot: null };
}
function emptyMultiPaymentFormState() {
  return { version: CURRENT_VERSION, segment: [], sipJiraTicket: "", testingTool: null, comments: "" };
}
function emptyBeneficiaryModelState() {
  return { consentId: "", creditorArray: "", authScreenshot: null };
}
function emptyDelegatedScaFormState() {
  return {
    version: CURRENT_VERSION,
    segment: [],
    paymentLimit: "",
    limitScreenshot: null,
    sipJiraTicket: "",
    testingTool: null,
    comments: ""
  };
}
function emptyTppPaymentTypeState() {
  return {
    selected: false,
    consentJson: "",
    riskJson: "",
    paymentPostman: null,
    authScreenshot: null,
    authExplanation: ""
  };
}
function emptyTppPaymentCapabilityState() {
  return { used: false, postman: null };
}
function emptyPaymentTppFormState() {
  return { version: CURRENT_VERSION, useCase: "", comments: "" };
}
export {
  __unplugin_components_2 as _,
  emptyTppEndpointState as a,
  emptyConsentOpState as b,
  __unplugin_components_0 as c,
  __unplugin_components_1 as d,
  emptyTppFormState as e,
  emptyPaymentTppFormState as f,
  emptyTppPaymentCapabilityState as g,
  emptyTppPaymentTypeState as h,
  emptyCopFormState as i,
  emptyCopScenarioState as j,
  emptyMultiPaymentFormState as k,
  emptyConsentScenarioState as l,
  emptyBeneficiaryModelState as m,
  emptyPaymentFormState as n,
  emptyPaymentRailState as o,
  emptyPaymentTimingState as p,
  emptyPaymentAaniRejectState as q,
  emptyPaymentCreditorRiskState as r,
  emptyPaymentDataSharingState as s,
  emptyPaymentRefundState as t,
  useSandboxAuth as u,
  emptyPaymentAuthScenarioState as v,
  emptyFormState as w,
  emptyEndpointState as x,
  emptyDelegatedScaFormState as y
};
