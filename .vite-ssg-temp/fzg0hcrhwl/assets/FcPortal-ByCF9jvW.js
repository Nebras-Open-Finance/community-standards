import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_2, w as emptyFormState, x as emptyEndpointState, b as emptyConsentOpState, c as __unplugin_components_0$1, d as __unplugin_components_1, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, computed, mergeProps, withCtx, createVNode, useSSRContext, reactive, ref, watch, onMounted, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, V as VERSIONS } from "../main.mjs";
import { _ as __unplugin_components_3 } from "./FcConsentOpEvidence-CYqMLIqZ.js";
import { _ as __unplugin_components_2$1 } from "./FcEndpointSelector-Bb7O11rk.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcEndpointEvidence",
  __ssrInlineRender: true,
  props: {
    endpoint: {},
    state: {},
    tppBaseUrl: {},
    complete: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const tppUrl = computed(
      () => props.endpoint.tppPath ? `${props.tppBaseUrl}${props.endpoint.tppPath}` : ""
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcFileInput = __unplugin_components_2;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-ev" }, _attrs))} data-v-a54b806c><div class="fc-ev__head" data-v-a54b806c><span class="fc-ev__method" data-v-a54b806c>${ssrInterpolate(__props.endpoint.method)}</span><code class="fc-ev__path" data-v-a54b806c>${ssrInterpolate(__props.endpoint.ozonePath)}</code><span class="${ssrRenderClass([__props.complete ? "fc-ev__status--ok" : "fc-ev__status--todo", "fc-ev__status"])}" data-v-a54b806c>${ssrInterpolate(__props.complete ? "✓ Complete" : "Incomplete")}</span></div><p class="fc-ev__perms" data-v-a54b806c><span class="fc-ev__perms-label" data-v-a54b806c>Permission(s)</span><!--[-->`);
      ssrRenderList(__props.endpoint.permissions, (p) => {
        _push(`<code class="fc-ev__perm" data-v-a54b806c>${ssrInterpolate(p)}</code>`);
      });
      _push(`<!--]--></p>`);
      _push(ssrRenderComponent(_component_FcFileInput, {
        modelValue: __props.state.testLog,
        "onUpdate:modelValue": ($event) => __props.state.testLog = $event,
        label: "Testing Tool output (Ozone Connect)",
        accept: ".html,.htm,text/html",
        hint: `HTML report from the Testing Tool for your Ozone Connect ${__props.endpoint.method} ${__props.endpoint.ozonePath} endpoint.`
      }, null, _parent));
      _push(`<div class="fc-ev__outcome" data-v-a54b806c><span class="fc-ev__label" data-v-a54b806c>Test outcome</span><label class="fc-ev__radio" data-v-a54b806c><input${ssrIncludeBooleanAttr(ssrLooseEqual(__props.state.outcome, "all-pass")) ? " checked" : ""} type="radio" value="all-pass" data-v-a54b806c> All tests passed </label><label class="fc-ev__radio" data-v-a54b806c><input${ssrIncludeBooleanAttr(ssrLooseEqual(__props.state.outcome, "issues")) ? " checked" : ""} type="radio" value="issues" data-v-a54b806c> Some tests failed or were skipped </label></div>`);
      if (__props.state.outcome === "issues") {
        _push(`<div class="fc-ev__notes" data-v-a54b806c><label class="fc-ev__label"${ssrRenderAttr("for", `notes-${__props.endpoint.slug}`)} data-v-a54b806c> Explain why tests failed or were skipped </label><textarea${ssrRenderAttr("id", `notes-${__props.endpoint.slug}`)} class="fc-ev__textarea" placeholder="Describe each failed or skipped test and why — e.g. an optional field your product does not populate, or a scenario not applicable to your proposition." data-v-a54b806c>${ssrInterpolate(__props.state.notes)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.endpoint.tppPath) {
        _push(`<!--[--><p class="fc-ev__tpp" data-v-a54b806c><span class="fc-ev__perms-label" data-v-a54b806c>TPP-facing equivalent</span><code class="fc-ev__tppurl" data-v-a54b806c>${ssrInterpolate(tppUrl.value)}</code></p>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: __props.state.postman,
          "onUpdate:modelValue": ($event) => __props.state.postman = $event,
          label: "Postman success screenshot (TPP-facing)",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot from the Postman collection showing a successful response for the TPP-facing equivalent endpoint."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: __props.state.responseJson,
          "onUpdate:modelValue": ($event) => __props.state.responseJson = $event,
          label: "Full JSON response (TPP-facing)",
          accept: ".json,application/json",
          hint: "The complete JSON response body returned by the TPP-facing equivalent endpoint."
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_EdNote, {
          type: "note",
          title: "No TPP-facing equivalent"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p data-v-a54b806c${_scopeId}> This Ozone Connect endpoint has no direct TPP-facing equivalent on the Account Information resource server, so only the Testing Tool output is required. If your proposition reaches this data another way, describe it in the notes above. </p>`);
            } else {
              return [
                createVNode("p", null, " This Ozone Connect endpoint has no direct TPP-facing equivalent on the Account Information resource server, so only the Testing Tool output is required. If your proposition reaches this data another way, describe it in the notes above. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcEndpointEvidence.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a54b806c"]]);
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyFormState());
    const endpointStates = reactive(
      Object.fromEntries(props.area.endpoints.map((e) => [e.slug, emptyEndpointState()]))
    );
    const stateFor = (slug) => endpointStates[slug];
    const consentOps = computed(() => props.area.consentOps ?? []);
    const consentOpStates = reactive(
      Object.fromEntries((props.area.consentOps ?? []).map((o) => [o.slug, emptyConsentOpState()]))
    );
    const consentStateFor = (slug) => consentOpStates[slug];
    function consentOpComplete(op) {
      const st = consentStateFor(op.slug);
      if (!st.postman) return false;
      if (op.captureErrorDetails && (!st.error.trim() || !st.errorDescription.trim())) return false;
      return true;
    }
    const consentOpsComplete = computed(() => consentOps.value.every(consentOpComplete));
    const consentCompleteCount = computed(() => consentOps.value.filter(consentOpComplete).length);
    function setVersion(v) {
      form.version = v;
    }
    function toggleSegment(s) {
      form.segment = form.segment.includes(s) ? form.segment.filter((x) => x !== s) : [...form.segment, s];
    }
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Select endpoints", "Evidence", "Review & generate"];
    const currentStep = ref(1);
    const generating = ref(false);
    const genError = ref("");
    const redirecting = ref(false);
    onMounted(async () => {
      await loadMe();
      if (typeof window === "undefined") return;
      if (auth.value.authenticated) {
        window.sessionStorage.removeItem(LOGIN_MARKER);
        return;
      }
      const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER) || 0);
      if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
        window.sessionStorage.removeItem(LOGIN_MARKER);
        return;
      }
      window.sessionStorage.setItem(LOGIN_MARKER, String(Date.now()));
      redirecting.value = true;
      signIn();
    });
    const org = computed(
      () => auth.value.orgs.filter((o) => selectedOrgIds.value.includes(o.id)).map((o) => o.name).join(", ")
    );
    const identityName = computed(() => auth.value.name ?? auth.value.email ?? "");
    const tppBaseUrl = computed(() => props.area.tppBaseUrlTemplate.replace("{VERSION}", form.version));
    const selectedEndpoints = computed(() => props.area.endpoints.filter((e) => stateFor(e.slug).selected));
    const endpointItems = computed(
      () => props.area.endpoints.map((e) => ({
        slug: e.slug,
        name: e.title,
        method: e.method,
        path: e.ozonePath,
        selected: stateFor(e.slug).selected
      }))
    );
    function toggleEndpoint(slug) {
      const s = stateFor(slug);
      s.selected = !s.selected;
    }
    function selectAllEndpoints() {
      props.area.endpoints.forEach((e) => stateFor(e.slug).selected = true);
    }
    function clearEndpoints() {
      props.area.endpoints.forEach((e) => stateFor(e.slug).selected = false);
    }
    function endpointComplete(e) {
      const st = stateFor(e.slug);
      if (!st.testLog) return false;
      if (!st.outcome) return false;
      if (st.outcome === "issues" && !st.notes.trim()) return false;
      if (e.tppPath && (!st.postman || !st.responseJson)) return false;
      return true;
    }
    const completeCount = computed(() => selectedEndpoints.value.filter(endpointComplete).length);
    const allEvidenceComplete = computed(
      () => selectedEndpoints.value.length > 0 && completeCount.value === selectedEndpoints.value.length && consentOpsComplete.value
    );
    function canLeave(step) {
      var _a;
      if (step === 2) {
        return selectedEndpoints.value.length > 0 && (!((_a = props.area.segments) == null ? void 0 : _a.length) || form.segment.length > 0);
      }
      if (step === 3) return allEvidenceComplete.value;
      return true;
    }
    const canAdvance = computed(() => canLeave(currentStep.value));
    function goTo(n) {
      if (n <= currentStep.value) currentStep.value = n;
    }
    watch(currentStep, () => {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const canGenerate = computed(() => selectedEndpoints.value.length > 0 && !generating.value);
    function slugify(s) {
      return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    }
    computed(() => {
      const who = slugify(org.value) || "submission";
      return `functional-certification-${props.area.key}-${who}.zip`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcStepper = __unplugin_components_0$1;
      const _component_FcIdentity = __unplugin_components_1;
      const _component_FcEndpointSelector = __unplugin_components_2$1;
      const _component_FcConsentOpEvidence = __unplugin_components_3;
      const _component_FcEndpointEvidence = __unplugin_components_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-cc45cd17>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-cc45cd17> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-cc45cd17><h2 class="fc__h2" data-v-cc45cd17>Your details</h2><p class="fc__lede" data-v-cc45cd17> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your LFI. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-cc45cd17><h2 class="fc__h2" data-v-cc45cd17>Select endpoints</h2><p class="fc__lede" data-v-cc45cd17> Choose the version and segment you are certifying, then tick every ${ssrInterpolate(__props.area.label)} endpoint your Ozone Connect implementation exposes. You will attach evidence for each on the next step. </p>`);
        _push(ssrRenderComponent(_component_FcEndpointSelector, {
          title: __props.area.label,
          items: endpointItems.value,
          version: form.version,
          versions: unref(VERSIONS),
          segment: form.segment,
          segments: __props.area.segments,
          "onUpdate:version": setVersion,
          onToggleSegment: toggleSegment,
          onToggle: toggleEndpoint,
          onSelectAll: selectAllEndpoints,
          onClear: clearEndpoints
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-cc45cd17><h2 class="fc__h2" data-v-cc45cd17>Evidence</h2><p class="fc__lede" data-v-cc45cd17> Attach the evidence for each endpoint you selected. Evidence must come from your own <strong data-v-cc45cd17>pre-production environment</strong>. All items are required before you can continue. </p>`);
        if (consentOps.value.length) {
          _push(`<!--[--><h3 class="fc__h3" data-v-cc45cd17>Consent management</h3><p class="fc__sub" data-v-cc45cd17> These consent-lifecycle operations are certified for every LFI, whichever endpoints you selected. Each is a call your Ozone Connect implementation makes to the API Hub Consent Manager — except the cancelled-authorization scenario, which you drive on Headless Heimdall. Attach a Postman screenshot of a successful call for each. </p><div class="${ssrRenderClass([{ "fc__progress-note--done": consentOpsComplete.value }, "fc__progress-note"])}" data-v-cc45cd17>${ssrInterpolate(consentCompleteCount.value)} of ${ssrInterpolate(consentOps.value.length)} consent operations complete. </div><!--[-->`);
          ssrRenderList(consentOps.value, (op) => {
            _push(ssrRenderComponent(_component_FcConsentOpEvidence, {
              key: op.slug,
              op,
              state: consentStateFor(op.slug),
              version: form.version,
              complete: consentOpComplete(op)
            }, null, _parent));
          });
          _push(`<!--]--><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="fc__h3" data-v-cc45cd17>Endpoint evidence</h3>`);
        if (selectedEndpoints.value.length === 0) {
          _push(`<div class="fc__empty" data-v-cc45cd17> You haven’t selected any endpoints yet. <button type="button" class="fc__link" data-v-cc45cd17>Go back to select endpoints</button>. </div>`);
        } else {
          _push(`<!--[--><div class="${ssrRenderClass([{ "fc__progress-note--done": allEvidenceComplete.value }, "fc__progress-note"])}" data-v-cc45cd17>${ssrInterpolate(completeCount.value)} of ${ssrInterpolate(selectedEndpoints.value.length)} endpoints complete${ssrInterpolate(allEvidenceComplete.value ? " — you can continue." : ".")}</div><!--[-->`);
          ssrRenderList(selectedEndpoints.value, (e) => {
            _push(ssrRenderComponent(_component_FcEndpointEvidence, {
              key: e.slug,
              endpoint: e,
              state: stateFor(e.slug),
              "tpp-base-url": tppBaseUrl.value,
              complete: endpointComplete(e)
            }, null, _parent));
          });
          _push(`<!--]--><!--]-->`);
        }
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-cc45cd17><h2 class="fc__h2" data-v-cc45cd17>Review &amp; generate</h2><p class="fc__lede" data-v-cc45cd17> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-cc45cd17>summary.html</code> plus every evidence file — attach it to your <strong data-v-cc45cd17>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-cc45cd17><div data-v-cc45cd17><dt data-v-cc45cd17>Organisation</dt><dd data-v-cc45cd17>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-cc45cd17><dt data-v-cc45cd17>Submitted by</dt><dd data-v-cc45cd17>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-cc45cd17><dt data-v-cc45cd17>Version</dt><dd data-v-cc45cd17>${ssrInterpolate(form.version.toUpperCase())}</dd></div>`);
        if (__props.area.segments && __props.area.segments.length) {
          _push(`<div data-v-cc45cd17><dt data-v-cc45cd17>Segment</dt><dd data-v-cc45cd17>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-cc45cd17><dt data-v-cc45cd17>Endpoints in scope</dt><dd data-v-cc45cd17>${ssrInterpolate(selectedEndpoints.value.length)}</dd></div>`);
        if (consentOps.value.length) {
          _push(`<div data-v-cc45cd17><dt data-v-cc45cd17>Consent operations</dt><dd data-v-cc45cd17>${ssrInterpolate(consentOps.value.length)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</dl><div class="fc-comment" data-v-cc45cd17><label class="fc-comment__label" for="fc-comments" data-v-cc45cd17>Comments <span class="fc__opt" data-v-cc45cd17>(optional)</span></label><textarea id="fc-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-cc45cd17>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-cc45cd17>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-cc45cd17><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-cc45cd17>Back</button><span class="fc__nav-pos" data-v-cc45cd17>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""}${ssrRenderAttr("title", !canAdvance.value && currentStep.value === 3 ? "Attach all required evidence for each endpoint first" : "")} data-v-cc45cd17> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-cc45cd17>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcPortal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc45cd17"]]);
export {
  __unplugin_components_0 as _
};
