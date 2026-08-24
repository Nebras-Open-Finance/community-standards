import { f as emptyPaymentTppFormState, g as emptyTppPaymentCapabilityState, c as __unplugin_components_0$1, d as __unplugin_components_1, _ as __unplugin_components_2$2, u as useSandboxAuth, h as emptyTppPaymentTypeState } from "./types-BEa3NRi5.js";
import { _ as __unplugin_components_2$1 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_2 } from "./FcEndpointSelector-Bb7O11rk.js";
import { defineComponent, reactive, ref, watch, onMounted, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { V as VERSIONS, _ as _export_sfc, b as block0 } from "../main.mjs";
import { d as domesticPaymentsTppArea } from "./domestic-payments-tpp-CFrB98WF.js";
import "yaml";
import "./useSharedState-qc0PNim7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcPaymentTppPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyPaymentTppFormState());
    const typeStates = reactive(
      Object.fromEntries(
        props.area.types.map((t) => {
          const st = emptyTppPaymentTypeState();
          st.consentJson = JSON.stringify(t.consentSeed, null, 2);
          st.riskJson = JSON.stringify(t.riskSeed, null, 2);
          return [t.key, st];
        })
      )
    );
    const typeState = (key) => typeStates[key];
    const capStates = reactive(
      Object.fromEntries(props.area.capabilities.map((c) => [c.key, emptyTppPaymentCapabilityState()]))
    );
    const capState = (key) => capStates[key];
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Payment types", "Consent, Risk & evidence", "Review & generate"];
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
    computed(() => props.area.tppBaseUrlTemplate.replace("{VERSION}", form.version));
    const selectedTypes = computed(() => props.area.types.filter((t) => typeState(t.key).selected));
    const usedCapabilities = computed(() => props.area.capabilities.filter((c) => capState(c.key).used));
    const typeItems = computed(
      () => props.area.types.map((t) => ({
        slug: t.key,
        name: t.label,
        method: "",
        path: t.summary,
        selected: typeState(t.key).selected
      }))
    );
    function toggleType(key) {
      typeState(key).selected = !typeState(key).selected;
    }
    function selectAllTypes() {
      props.area.types.forEach((t) => typeState(t.key).selected = true);
    }
    function clearTypes() {
      props.area.types.forEach((t) => typeState(t.key).selected = false);
    }
    function setVersion(v) {
      form.version = v;
    }
    function typeComplete(t) {
      const st = typeState(t.key);
      if (!st.paymentPostman) return false;
      if (t.isDelegatedSca && (!st.authScreenshot || !st.authExplanation.trim())) return false;
      return true;
    }
    function capComplete(c) {
      return !!capState(c.key).postman;
    }
    const typeCompleteCount = computed(() => selectedTypes.value.filter(typeComplete).length);
    const allEvidenceComplete = computed(
      () => selectedTypes.value.length > 0 && selectedTypes.value.every(typeComplete) && usedCapabilities.value.every(capComplete)
    );
    function canLeave(step) {
      if (step === 2) return form.useCase.trim().length > 0 && selectedTypes.value.length > 0;
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
    const canGenerate = computed(() => selectedTypes.value.length > 0 && !generating.value);
    function slugify(s) {
      return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    }
    computed(() => {
      const who = slugify(org.value) || "submission";
      return `functional-certification-tpp-domestic-payments-${who}.zip`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcStepper = __unplugin_components_0$1;
      const _component_FcIdentity = __unplugin_components_1;
      const _component_FcEndpointSelector = __unplugin_components_2;
      const _component_EditableJson = __unplugin_components_2$1;
      const _component_FcFileInput = __unplugin_components_2$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-1d3aef6e>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-1d3aef6e> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-1d3aef6e><h2 class="fc__h2" data-v-1d3aef6e>Your details</h2><p class="fc__lede" data-v-1d3aef6e> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your organisation. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-1d3aef6e><h2 class="fc__h2" data-v-1d3aef6e>Payment types</h2><p class="fc__lede" data-v-1d3aef6e> Tell us briefly why you offer domestic payments, pick the standards version, then tick every payment type you offer. For each one you will provide the Consent and Risk objects you construct, and a Postman example of a payment made against it on the Model Bank. </p><label class="fc__label" for="fc-usecase" data-v-1d3aef6e>Use case</label><p class="fc__hint" data-v-1d3aef6e> A sentence or two on what you use domestic payments for — for example, letting customers settle a merchant checkout, or move money between their own accounts. </p><textarea id="fc-usecase" class="fc__textarea fc__textarea--sm" placeholder="e.g. We let customers pay an e-commerce basket at checkout by initiating a single instant payment straight from their bank account." data-v-1d3aef6e>${ssrInterpolate(form.useCase)}</textarea><label class="fc__label" data-v-1d3aef6e>Payment types you offer</label>`);
        _push(ssrRenderComponent(_component_FcEndpointSelector, {
          title: "Domestic Payments",
          items: typeItems.value,
          version: form.version,
          versions: unref(VERSIONS),
          onToggle: toggleType,
          onSelectAll: selectAllTypes,
          onClear: clearTypes,
          "onUpdate:version": setVersion
        }, null, _parent));
        _push(`<label class="fc__label" data-v-1d3aef6e>Optional capabilities</label><p class="fc__hint" data-v-1d3aef6e> Beyond initiating payments, a payment consent can carry account and balance reads, and a refund-account read. Tick anything your proposition uses — you will evidence a balance read <strong data-v-1d3aef6e>before</strong> the payment and a refund read <strong data-v-1d3aef6e>after</strong> it. </p><div class="fc__caps" data-v-1d3aef6e><!--[-->`);
        ssrRenderList(__props.area.capabilities, (c) => {
          _push(`<div class="${ssrRenderClass([{ on: capState(c.key).used }, "fc__caps-item"])}" role="checkbox"${ssrRenderAttr("aria-checked", capState(c.key).used)} tabindex="0" data-v-1d3aef6e><span class="fc__caps-box" data-v-1d3aef6e>${ssrInterpolate(capState(c.key).used ? "✓" : "")}</span><span class="fc__caps-info" data-v-1d3aef6e><span class="fc__caps-name" data-v-1d3aef6e>${ssrInterpolate(c.label)} <span class="fc__cap-when" data-v-1d3aef6e>${ssrInterpolate(c.timing === "before" ? "before payment" : "after payment")}</span></span><span class="fc__caps-desc" data-v-1d3aef6e>${ssrInterpolate(c.description)}</span></span></div>`);
        });
        _push(`<!--]--></div></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-1d3aef6e><h2 class="fc__h2" data-v-1d3aef6e>Consent, Risk &amp; evidence</h2><p class="fc__lede" data-v-1d3aef6e> For each type, edit the <strong data-v-1d3aef6e>Consent</strong> (<code data-v-1d3aef6e>authorization_details</code>) and <strong data-v-1d3aef6e>Risk</strong> (<code data-v-1d3aef6e>AERisk</code>) objects to match what you send. The objects validate against the OpenAPI schema — edits commit on blur, and anything that does not match reverts. Your evidence is produced by <strong data-v-1d3aef6e>making a payment against a consent of each type on the sandbox <a${ssrRenderAttr("href", __props.area.sandboxEvidenceHref)} data-v-1d3aef6e>AlTareq Model Bank</a></strong> using the <a${ssrRenderAttr("href", __props.area.postmanGuideHref)} data-v-1d3aef6e>Postman collection</a>, and attaching the Postman screenshot of that payment. </p>`);
        if (selectedTypes.value.length === 0) {
          _push(`<div class="fc__empty" data-v-1d3aef6e> You haven’t selected any payment types yet. <button type="button" class="fc__link" data-v-1d3aef6e>Go back to select types</button>. </div>`);
        } else {
          _push(`<!--[--><div class="${ssrRenderClass([{ "fc__progress-note--done": allEvidenceComplete.value }, "fc__progress-note"])}" data-v-1d3aef6e>${ssrInterpolate(typeCompleteCount.value)} of ${ssrInterpolate(selectedTypes.value.length)} payment types complete${ssrInterpolate(allEvidenceComplete.value ? " — you can continue." : ".")}</div><!--[-->`);
          ssrRenderList(selectedTypes.value, (t) => {
            _push(`<div class="fc__type-block" data-v-1d3aef6e><h3 class="fc__h3" data-v-1d3aef6e>${ssrInterpolate(t.label)} <span class="fc__type-tag" data-v-1d3aef6e>${ssrInterpolate(t.paymentType)}</span>`);
            if (typeComplete(t)) {
              _push(`<span class="fc__done-tag" data-v-1d3aef6e>✓ complete</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</h3><p class="fc__sub" data-v-1d3aef6e>${ssrInterpolate(t.summary)} See the <a${ssrRenderAttr("href", t.docHref)} data-v-1d3aef6e>${ssrInterpolate(t.label)} API guide</a>. </p>`);
            _push(ssrRenderComponent(_component_EditableJson, {
              spec: __props.area.consentEditor.spec,
              "schema-name": __props.area.consentEditor.schemaName,
              "initial-data": t.consentSeed,
              "state-field": `payment-consent-${t.key}`,
              label: "Consent — authorization_details",
              description: "The RAR object you send at /par",
              "onUpdate:json": ($event) => typeState(t.key).consentJson = $event
            }, null, _parent));
            _push(ssrRenderComponent(_component_EditableJson, {
              spec: __props.area.riskEditor.spec,
              "schema-name": __props.area.riskEditor.schemaName,
              "initial-data": t.riskSeed,
              "state-field": `payment-risk-${t.key}`,
              label: "Risk object (AERisk)",
              description: "The Risk object you send for fraud scoring",
              "onUpdate:json": ($event) => typeState(t.key).riskJson = $event
            }, null, _parent));
            _push(ssrRenderComponent(_component_FcFileInput, {
              "model-value": typeState(t.key).paymentPostman,
              "onUpdate:modelValue": ($event) => typeState(t.key).paymentPostman = $event,
              label: "Payment against this consent (Postman)",
              accept: "image/*,.pdf",
              hint: `Postman screenshot of a payment initiated against a ${t.label} consent on the Model Bank.`
            }, null, _parent));
            if (t.isDelegatedSca) {
              _push(`<div class="fc__delegated" data-v-1d3aef6e><p class="fc__sub" data-v-1d3aef6e><strong data-v-1d3aef6e>Delegated SCA:</strong> you perform the customer authentication yourself before each payment. Evidence that authentication and describe how it populates the <code data-v-1d3aef6e>Authentication</code> section of the Risk object above. </p>`);
              _push(ssrRenderComponent(_component_FcFileInput, {
                "model-value": typeState(t.key).authScreenshot,
                "onUpdate:modelValue": ($event) => typeState(t.key).authScreenshot = $event,
                label: "Authentication performed before the payment",
                accept: "image/*,.pdf",
                hint: "Screenshot of the SCA challenge your app performs before initiating a Delegated SCA payment."
              }, null, _parent));
              _push(`<label class="fc__label"${ssrRenderAttr("for", `fc-auth-${t.key}`)} data-v-1d3aef6e> How this maps to <code data-v-1d3aef6e>Risk.DebtorIndicators.Authentication</code></label><textarea${ssrRenderAttr("id", `fc-auth-${t.key}`)} class="fc__textarea fc__textarea--sm" placeholder="e.g. A passkey (PossessionFactor) plus face recognition (InherenceFactor) is performed in-app; the pass/fail result is sent as ChallengeOutcome, with AuthenticationFlow: MFA and AuthenticationChannel: App." data-v-1d3aef6e>${ssrInterpolate(typeState(t.key).authExplanation)}</textarea></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
          if (usedCapabilities.value.length) {
            _push(`<!--[--><h3 class="fc__h3" data-v-1d3aef6e>Optional capabilities</h3><p class="fc__sub" data-v-1d3aef6e> Attach a Postman screenshot evidencing each capability you declared — a balance read before the payment, a refund read after it. </p><!--[-->`);
            ssrRenderList(usedCapabilities.value, (c) => {
              _push(`<div class="fc__type-block" data-v-1d3aef6e><h4 class="fc__h4" data-v-1d3aef6e>${ssrInterpolate(c.label)} <span class="fc__cap-when" data-v-1d3aef6e>${ssrInterpolate(c.timing === "before" ? "before payment" : "after payment")}</span>`);
              if (capComplete(c)) {
                _push(`<span class="fc__done-tag" data-v-1d3aef6e>✓ complete</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</h4><p class="fc__sub" data-v-1d3aef6e>${ssrInterpolate(c.description)} See the <a${ssrRenderAttr("href", c.docHref)} data-v-1d3aef6e>API guide</a>.</p><p class="fc__perms-note" data-v-1d3aef6e><!--[-->`);
              ssrRenderList(c.endpoints, (e) => {
                _push(`<span class="fc__perm" data-v-1d3aef6e><code data-v-1d3aef6e>${ssrInterpolate(e.method)}</code> ${ssrInterpolate(e.path)} — ${ssrInterpolate(e.permission)}</span>`);
              });
              _push(`<!--]--></p>`);
              _push(ssrRenderComponent(_component_FcFileInput, {
                "model-value": capState(c.key).postman,
                "onUpdate:modelValue": ($event) => capState(c.key).postman = $event,
                label: "Capability evidence (Postman)",
                accept: "image/*,.pdf",
                hint: `Postman screenshot of a successful ${c.label} call ${c.timing === "before" ? "before" : "after"} the payment.`
              }, null, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-1d3aef6e><h2 class="fc__h2" data-v-1d3aef6e>Review &amp; generate</h2><p class="fc__lede" data-v-1d3aef6e> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-1d3aef6e>summary.html</code>, the Consent and Risk JSON for each type, and every screenshot — attach it to your <strong data-v-1d3aef6e>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-1d3aef6e><div data-v-1d3aef6e><dt data-v-1d3aef6e>Organisation</dt><dd data-v-1d3aef6e>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-1d3aef6e><dt data-v-1d3aef6e>Submitted by</dt><dd data-v-1d3aef6e>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-1d3aef6e><dt data-v-1d3aef6e>Version</dt><dd data-v-1d3aef6e>${ssrInterpolate(form.version.toUpperCase())}</dd></div><div data-v-1d3aef6e><dt data-v-1d3aef6e>Payment types</dt><dd data-v-1d3aef6e>${ssrInterpolate(selectedTypes.value.map((t) => t.label).join(", ") || "—")}</dd></div><div data-v-1d3aef6e><dt data-v-1d3aef6e>Capabilities</dt><dd data-v-1d3aef6e>${ssrInterpolate(usedCapabilities.value.map((c) => c.label).join(", ") || "None")}</dd></div></dl><div class="fc-comment" data-v-1d3aef6e><label class="fc-comment__label" for="fc-comments" data-v-1d3aef6e>Comments <span class="fc__opt" data-v-1d3aef6e>(optional)</span></label><textarea id="fc-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-1d3aef6e>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-1d3aef6e>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-1d3aef6e><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-1d3aef6e>Back</button><span class="fc__nav-pos" data-v-1d3aef6e>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""} data-v-1d3aef6e> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-1d3aef6e>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcPaymentTppPortal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1d3aef6e"]]);
const explainerPath = "/tech/tpp-standards/production/testing-certification/functional/domestic-payments";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcPaymentTppPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fab70ba3><section class="ed-doc__hero" data-v-fab70ba3><div class="ed-doc__inner" data-v-fab70ba3><div class="ed-doc__eyebrow" data-v-fab70ba3><span class="ed-doc__eyebrow-dash" data-v-fab70ba3></span> Functional Certification · Domestic Payments </div><h1 class="ed-doc__title" data-v-fab70ba3>Build your submission</h1><p class="ed-doc__lede" data-v-fab70ba3> Complete each step, provide the Consent and Risk objects for every payment type you offer, and download a ZIP to attach to your <strong data-v-fab70ba3>${ssrInterpolate(unref(domesticPaymentsTppArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-fab70ba3>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-fab70ba3><div class="ed-doc__inner" data-v-fab70ba3>`);
      _push(ssrRenderComponent(_component_FcPaymentTppPortal, { area: unref(domesticPaymentsTppArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fab70ba3"]]);
export {
  submission as default
};
