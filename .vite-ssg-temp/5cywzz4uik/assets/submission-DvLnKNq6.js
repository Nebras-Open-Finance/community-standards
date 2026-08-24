import { y as emptyDelegatedScaFormState, r as emptyPaymentCreditorRiskState, v as emptyPaymentAuthScenarioState, c as __unplugin_components_0$1, d as __unplugin_components_1, _ as __unplugin_components_2, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, reactive, ref, watch, onMounted, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { V as VERSIONS, _ as _export_sfc, b as block0 } from "../main.mjs";
import { d as delegatedScaArea } from "./delegated-sca-DeJVXqpQ.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcDelegatedScaPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyDelegatedScaFormState());
    const creditorRisk = reactive(emptyPaymentCreditorRiskState());
    const beneficiaryStates = reactive(
      Object.fromEntries(props.area.beneficiaries.map((b) => [b.key, emptyPaymentAuthScenarioState()]))
    );
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Scope & SIP ticket", "Evidence", "Review & generate"];
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
    computed(
      () => props.area.tppBaseUrlTemplate.replace("{VERSION}", form.version).replace("{LFICODE}", "LFICODE")
    );
    const beneficiaryStateFor = (key) => beneficiaryStates[key];
    function beneficiaryComplete(m) {
      const st = beneficiaryStateFor(m.key);
      return !!st.consentId.trim() && !!st.screenshot;
    }
    const beneficiariesComplete = computed(() => props.area.beneficiaries.every(beneficiaryComplete));
    const beneficiaryDoneCount = computed(() => props.area.beneficiaries.filter(beneficiaryComplete).length);
    const creditorRiskComplete = computed(
      () => !!creditorRisk.decryptScreenshot && !!creditorRisk.creditorScreenshot && !!creditorRisk.creditorValidationText.trim() && !!creditorRisk.riskScreenshot && !!creditorRisk.riskValidationText.trim()
    );
    const scopeComplete = computed(
      () => form.segment.length > 0 && !!form.paymentLimit.trim() && !!form.sipJiraTicket.trim()
    );
    const evidenceComplete = computed(() => creditorRiskComplete.value && beneficiariesComplete.value);
    function canLeave(step) {
      if (step === 2) return scopeComplete.value;
      if (step === 3) return evidenceComplete.value;
      return true;
    }
    const canAdvance = computed(() => canLeave(currentStep.value));
    function goTo(n) {
      if (n <= currentStep.value) currentStep.value = n;
    }
    watch(currentStep, () => {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const canGenerate = computed(() => evidenceComplete.value && !generating.value);
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
      const _component_FcFileInput = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-db4a4e8a>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-db4a4e8a> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-db4a4e8a><h2 class="fc__h2" data-v-db4a4e8a>Your details</h2><p class="fc__lede" data-v-db4a4e8a> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your LFI. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-db4a4e8a><h2 class="fc__h2" data-v-db4a4e8a>Scope &amp; Single Instant Payment ticket</h2><p class="fc__lede" data-v-db4a4e8a> Choose the standards version and segments, state the payment limit you enforce for <strong data-v-db4a4e8a>${ssrInterpolate(__props.area.label)}</strong>, and give the JIRA ticket for your completed <strong data-v-db4a4e8a>Single Instant Payment</strong> certification — ${ssrInterpolate(__props.area.label)} builds on it, so that certification must be in place first. </p><div class="fc__controls" data-v-db4a4e8a><div class="fc__ctrl" data-v-db4a4e8a><label class="fc__label" for="dsca-version" data-v-db4a4e8a>API version</label><select id="dsca-version" class="fc__select"${ssrRenderAttr("value", form.version)} data-v-db4a4e8a><!--[-->`);
        ssrRenderList(unref(VERSIONS), (v) => {
          _push(`<option${ssrRenderAttr("value", v)} data-v-db4a4e8a>${ssrInterpolate(v)}</option>`);
        });
        _push(`<!--]--></select></div><div class="fc__ctrl" data-v-db4a4e8a><label class="fc__label" data-v-db4a4e8a>Segments <span class="fc__opt" data-v-db4a4e8a>select all that apply</span></label><div class="fc__seg" data-v-db4a4e8a><!--[-->`);
        ssrRenderList(__props.area.segments, (s) => {
          _push(`<button type="button" class="${ssrRenderClass([{ on: form.segment.includes(s) }, "fc__seg-btn"])}"${ssrRenderAttr("aria-pressed", form.segment.includes(s))} data-v-db4a4e8a>${ssrInterpolate(s)}</button>`);
        });
        _push(`<!--]--></div></div></div><div class="fc__ctrl fc__limit" data-v-db4a4e8a><label class="fc__label" for="dsca-limit" data-v-db4a4e8a>Payment limit (max AED)</label><input id="dsca-limit"${ssrRenderAttr("value", form.paymentLimit)} class="fc__input" type="text" inputmode="decimal" placeholder="e.g. 50000.00" data-v-db4a4e8a><p class="fc__hint" data-v-db4a4e8a> The maximum amount a single Delegated SCA payment can take through Open Finance on your LFI. The TPP manages the consent controls, but your own institutional limit still applies — and it MUST NOT be more restrictive than your other digital channels. </p></div><div class="fc__ctrl" style="${ssrRenderStyle({ "max-width": "24rem", "margin-top": "0.5rem" })}" data-v-db4a4e8a><label class="fc__label" for="dsca-jira" data-v-db4a4e8a>Single Instant Payment JIRA ticket</label><input id="dsca-jira"${ssrRenderAttr("value", form.sipJiraTicket)} class="fc__input fc__input--mono" placeholder="e.g. OF-612" spellcheck="false" data-v-db4a4e8a></div><div class="fc__controlnote" data-v-db4a4e8a><p class="fc__controlnote-h" data-v-db4a4e8a>No control parameters for ${ssrInterpolate(__props.area.label)}</p><p data-v-db4a4e8a> A Delegated SCA consent carries <code data-v-db4a4e8a>IsDelegatedAuthentication: true</code> with an empty <code data-v-db4a4e8a>ConsentSchedule</code> — the TPP defines and manages the payment controls, so there are no <code data-v-db4a4e8a>ControlParameters</code> scenarios to evidence. You evidence Creditor / Risk handling and the three beneficiary models instead. </p><p class="fc__controlnote-doc" data-v-db4a4e8a> See the <a${ssrRenderAttr("href", __props.area.docHref)} target="_blank" rel="noopener" data-v-db4a4e8a>${ssrInterpolate(__props.area.label)} API guide ↗</a> for the delegated-authentication model. </p></div></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-db4a4e8a><h2 class="fc__h2" data-v-db4a4e8a>Evidence</h2><p class="fc__lede" data-v-db4a4e8a> Attach the evidence below. All evidence must come from your own <strong data-v-db4a4e8a>pre-production environment</strong>. </p><div class="${ssrRenderClass([{ "fc__progress-note--done": evidenceComplete.value }, "fc__progress-note"])}" data-v-db4a4e8a>${ssrInterpolate(creditorRiskComplete.value ? "Creditor & Risk complete" : "Creditor & Risk outstanding")}, ${ssrInterpolate(beneficiaryDoneCount.value)} of ${ssrInterpolate(__props.area.beneficiaries.length)} beneficiary models complete${ssrInterpolate(evidenceComplete.value ? " — you can continue." : ".")}</div><div class="fc__group" data-v-db4a4e8a><h3 class="fc__group-h" data-v-db4a4e8a>Testing Tool output <span class="fc__opt" data-v-db4a4e8a>optional</span></h3><p class="fc__hint" data-v-db4a4e8a> Optionally attach the Testing Tool HTML report for your Ozone Connect payment endpoints. This is not required for ${ssrInterpolate(__props.area.label)} — the certification is consent-focused — but you may include it as supporting evidence. </p>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.testingTool,
          "onUpdate:modelValue": ($event) => form.testingTool = $event,
          label: "Testing Tool report (optional)",
          accept: ".html,.htm,text/html",
          hint: "HTML report from the Testing Tool for your Ozone Connect payment endpoints."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.limitScreenshot,
          "onUpdate:modelValue": ($event) => form.limitScreenshot = $event,
          label: "Payment limit exceeded (optional)",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Optional: a payment rejected for exceeding your stated AED limit."
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "fc__group--done": creditorRiskComplete.value }, "fc__group"])}" data-v-db4a4e8a><h3 class="fc__group-h" data-v-db4a4e8a>Creditor validation &amp; Risk handling</h3><p class="fc__hint" data-v-db4a4e8a> The Creditor account arrives inside the encrypted <code data-v-db4a4e8a>PersonalIdentifiableInformation</code>, so evidence decrypting it and validating the creditor. The <code data-v-db4a4e8a>Risk</code> object (AERisk) is cleartext — evidence that it is received and used in your fraud/screening. Re-captured for ${ssrInterpolate(__props.area.label)} because your validation may differ slightly under delegated authentication. </p>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: creditorRisk.decryptScreenshot,
          "onUpdate:modelValue": ($event) => creditorRisk.decryptScreenshot = $event,
          label: "PII decryption",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot evidencing decryption of the payment PersonalIdentifiableInformation."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: creditorRisk.creditorScreenshot,
          "onUpdate:modelValue": ($event) => creditorRisk.creditorScreenshot = $event,
          label: "Creditor validation",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot evidencing Creditor account validation — reachability and/or validation of the Confirmation of Payee JWS the TPP carries in ConfirmationOfPayeeResponse, inside the creditor entry of the Initiation.Creditor array in the decrypted PII."
        }, null, _parent));
        _push(`<label class="fc__flabel fc__flabel--block" for="dsca-creditor-text" data-v-db4a4e8a>Creditor validation rules — beyond the OpenAPI spec</label><textarea id="dsca-creditor-text" class="fc__textarea" placeholder="Describe the fields and validations you place on the TPP when validating the Creditor that go beyond the OpenAPI spec — e.g. always requiring the IBAN, name-match thresholds, or rejecting specific account types." data-v-db4a4e8a>${ssrInterpolate(creditorRisk.creditorValidationText)}</textarea>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: creditorRisk.riskScreenshot,
          "onUpdate:modelValue": ($event) => creditorRisk.riskScreenshot = $event,
          label: "Risk object received & used",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot evidencing the Risk object is received and consumed in fraud/screening."
        }, null, _parent));
        _push(`<label class="fc__flabel fc__flabel--block" for="dsca-risk-text" data-v-db4a4e8a>Risk validation rules — beyond the OpenAPI spec</label><textarea id="dsca-risk-text" class="fc__textarea" placeholder="Describe any validations you apply to the Risk object that go beyond what the OpenAPI spec defines — e.g. required indicators, cross-checks, or rejection conditions." data-v-db4a4e8a>${ssrInterpolate(creditorRisk.riskValidationText)}</textarea></div><h3 class="fc__subhead" data-v-db4a4e8a>Beneficiary models</h3><p class="fc__hint" data-v-db4a4e8a> A Delegated SCA consent is authorised against a beneficiary model fixed by the shape of the decrypted PII&#39;s <code data-v-db4a4e8a>Initiation.Creditor</code>. Evidence one authorised pre-production consent for each model — <strong data-v-db4a4e8a>Single</strong> (one creditor), <strong data-v-db4a4e8a>Multiple</strong> (2–10 fixed creditors) and <strong data-v-db4a4e8a>Open</strong> (no creditor fixed at consent; the creditor is supplied at <code data-v-db4a4e8a>POST /payments</code>). You must advertise support for the Multiple and Open models on your Trust Framework authorisation-server entry. See the <a${ssrRenderAttr("href", __props.area.creditorDocHref)} target="_blank" rel="noopener" data-v-db4a4e8a>Creditor PII page ↗</a> for the model definitions. </p><!--[-->`);
        ssrRenderList(__props.area.beneficiaries, (m) => {
          _push(`<div class="${ssrRenderClass([{ "fc__group--done": beneficiaryComplete(m) }, "fc__group"])}" data-v-db4a4e8a><h3 class="fc__group-h" data-v-db4a4e8a>${ssrInterpolate(m.label)}</h3><p class="fc__hint" data-v-db4a4e8a>${ssrInterpolate(m.description)}</p>`);
          if (m.trustFrameworkFlag) {
            _push(`<p class="fc__hint" data-v-db4a4e8a> Advertise via <code data-v-db4a4e8a>${ssrInterpolate(m.trustFrameworkFlag)}</code>. </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<details class="fc__example" data-v-db4a4e8a><summary data-v-db4a4e8a>Reference — decrypted PersonalIdentifiableInformation</summary><pre data-v-db4a4e8a>${ssrInterpolate(m.referencePii)}</pre></details><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin": "0.85rem 0" })}" data-v-db4a4e8a><span class="fc__flabel" data-v-db4a4e8a>Pre-production ConsentId</span><input${ssrRenderAttr("value", beneficiaryStateFor(m.key).consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-db4a4e8a></label>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: beneficiaryStateFor(m.key).screenshot,
            "onUpdate:modelValue": ($event) => beneficiaryStateFor(m.key).screenshot = $event,
            label: "Authorization screen",
            accept: "image/png,image/jpeg,image/webp",
            hint: m.key === "open" ? "Screenshot of the authorization screen the customer saw for this consent, showing that no fixed beneficiary is set and the TPP selects the beneficiaries." : "Screenshot of the authorization screen the customer saw for this consent, showing the beneficiary/beneficiaries fixed on it."
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-db4a4e8a><h2 class="fc__h2" data-v-db4a4e8a>Review &amp; generate</h2><p class="fc__lede" data-v-db4a4e8a> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-db4a4e8a>summary.html</code> and every screenshot — attach it to your <strong data-v-db4a4e8a>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-db4a4e8a><div data-v-db4a4e8a><dt data-v-db4a4e8a>Organisation</dt><dd data-v-db4a4e8a>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>Submitted by</dt><dd data-v-db4a4e8a>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>Version</dt><dd data-v-db4a4e8a>${ssrInterpolate(form.version.toUpperCase())}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>Payment type</dt><dd data-v-db4a4e8a>${ssrInterpolate(__props.area.paymentType)}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>Segments</dt><dd data-v-db4a4e8a>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>Payment limit</dt><dd data-v-db4a4e8a>${ssrInterpolate(form.paymentLimit ? `${form.paymentLimit} AED` : "—")}</dd></div><div data-v-db4a4e8a><dt data-v-db4a4e8a>SIP JIRA ticket</dt><dd data-v-db4a4e8a>${ssrInterpolate(form.sipJiraTicket || "—")}</dd></div></dl><div class="fc-comment" data-v-db4a4e8a><label class="fc-comment__label" for="dsca-comments" data-v-db4a4e8a>Comments <span class="fc__opt" data-v-db4a4e8a>(optional)</span></label><textarea id="dsca-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-db4a4e8a>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-db4a4e8a>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-db4a4e8a><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-db4a4e8a>Back</button><span class="fc__nav-pos" data-v-db4a4e8a>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""}${ssrRenderAttr("title", !canAdvance.value && currentStep.value === 3 ? "Complete every evidence group first" : "")} data-v-db4a4e8a> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-db4a4e8a>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcDelegatedScaPortal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-db4a4e8a"]]);
const explainerPath = "/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcDelegatedScaPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c5ab249f><section class="ed-doc__hero" data-v-c5ab249f><div class="ed-doc__inner" data-v-c5ab249f><div class="ed-doc__eyebrow" data-v-c5ab249f><span class="ed-doc__eyebrow-dash" data-v-c5ab249f></span> Functional Certification · Delegated SCA </div><h1 class="ed-doc__title" data-v-c5ab249f>Build your submission</h1><p class="ed-doc__lede" data-v-c5ab249f> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-c5ab249f>${ssrInterpolate(unref(delegatedScaArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-c5ab249f>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-c5ab249f><div class="ed-doc__inner" data-v-c5ab249f>`);
      _push(ssrRenderComponent(_component_FcDelegatedScaPortal, { area: unref(delegatedScaArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5ab249f"]]);
export {
  submission as default
};
