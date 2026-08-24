import { k as emptyMultiPaymentFormState, l as emptyConsentScenarioState, m as emptyBeneficiaryModelState, c as __unplugin_components_0$1, d as __unplugin_components_1, _ as __unplugin_components_2, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, reactive, computed, ref, watch, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { V as VERSIONS, _ as _export_sfc } from "../main.mjs";
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcMultiPaymentPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyMultiPaymentFormState());
    const scenarioStates = reactive(
      Object.fromEntries(props.area.scenarios.map((s) => [s.key, emptyConsentScenarioState()]))
    );
    const beneficiaryModels = computed(() => props.area.beneficiaryModels ?? []);
    const beneficiaryStates = reactive(
      Object.fromEntries((props.area.beneficiaryModels ?? []).map((m) => [m.key, emptyBeneficiaryModelState()]))
    );
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Scope & SIP ticket", "Consent scenarios", "Review & generate"];
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
    const stateFor = (key) => scenarioStates[key];
    function scenarioComplete(s) {
      const st = stateFor(s.key);
      return !!st.consentId.trim() && !!st.consentDetails.trim() && !!st.authScreenshot;
    }
    const completeCount = computed(() => props.area.scenarios.filter(scenarioComplete).length);
    const scenariosComplete = computed(() => completeCount.value === props.area.scenarios.length);
    const beneficiaryStateFor = (key) => beneficiaryStates[key];
    function beneficiaryComplete(m) {
      const st = beneficiaryStateFor(m.key);
      return !!st.consentId.trim() && !!st.authScreenshot && (!m.collectsCreditorArray || !!st.creditorArray.trim());
    }
    const beneficiariesComplete = computed(() => beneficiaryModels.value.every(beneficiaryComplete));
    const evidenceComplete = computed(() => scenariosComplete.value && beneficiariesComplete.value);
    const scopeComplete = computed(() => form.segment.length > 0 && !!form.sipJiraTicket.trim());
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-287b6e3b>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-287b6e3b> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-287b6e3b><h2 class="fc__h2" data-v-287b6e3b>Your details</h2><p class="fc__lede" data-v-287b6e3b> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your LFI. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-287b6e3b><h2 class="fc__h2" data-v-287b6e3b>Scope &amp; Single Instant Payment ticket</h2><p class="fc__lede" data-v-287b6e3b> Choose the standards version and segments, and give the JIRA ticket for your completed <strong data-v-287b6e3b>Single Instant Payment</strong> certification — ${ssrInterpolate(__props.area.label)} builds on it, so that certification must be in place first. </p><div class="fc__controls" data-v-287b6e3b><div class="fc__ctrl" data-v-287b6e3b><label class="fc__label" for="mp-version" data-v-287b6e3b>API version</label><select id="mp-version" class="fc__select"${ssrRenderAttr("value", form.version)} data-v-287b6e3b><!--[-->`);
        ssrRenderList(unref(VERSIONS), (v) => {
          _push(`<option${ssrRenderAttr("value", v)} data-v-287b6e3b>${ssrInterpolate(v)}</option>`);
        });
        _push(`<!--]--></select></div><div class="fc__ctrl" data-v-287b6e3b><label class="fc__label" data-v-287b6e3b>Segments <span class="fc__opt" data-v-287b6e3b>select all that apply</span></label><div class="fc__seg" data-v-287b6e3b><!--[-->`);
        ssrRenderList(__props.area.segments, (s) => {
          _push(`<button type="button" class="${ssrRenderClass([{ on: form.segment.includes(s) }, "fc__seg-btn"])}"${ssrRenderAttr("aria-pressed", form.segment.includes(s))} data-v-287b6e3b>${ssrInterpolate(s)}</button>`);
        });
        _push(`<!--]--></div></div></div><div class="fc__ctrl" style="${ssrRenderStyle({ "max-width": "24rem" })}" data-v-287b6e3b><label class="fc__label" for="mp-jira" data-v-287b6e3b>Single Instant Payment JIRA ticket</label><input id="mp-jira"${ssrRenderAttr("value", form.sipJiraTicket)} class="fc__input fc__input--mono" placeholder="e.g. OF-612" spellcheck="false" data-v-287b6e3b></div><div class="fc__controlnote" data-v-287b6e3b><p class="fc__controlnote-h" data-v-287b6e3b>Control parameters for ${ssrInterpolate(__props.area.label)}</p><p data-v-287b6e3b><strong data-v-287b6e3b>Required:</strong> ${ssrInterpolate(__props.area.requiredControls.join(", "))}</p><p data-v-287b6e3b><strong data-v-287b6e3b>Optional:</strong> ${ssrInterpolate(__props.area.optionalControls.join(", "))}</p><p class="fc__controlnote-doc" data-v-287b6e3b> See the <a${ssrRenderAttr("href", __props.area.docHref)} target="_blank" rel="noopener" data-v-287b6e3b>${ssrInterpolate(__props.area.label)} API guide ↗</a> for the full ControlParameters model. </p></div></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-287b6e3b><h2 class="fc__h2" data-v-287b6e3b>Consent evidence</h2><p class="fc__lede" data-v-287b6e3b> Evidence two pre-production ${ssrInterpolate(__props.area.label)} consents — one with every optional control parameter set, one with only the required minimum. For each, share the ConsentId, paste the consent details, and attach the authorization screen linked to it.`);
        if (beneficiaryModels.value.length) {
          _push(`<!--[--> Then evidence one consent for each beneficiary model below.<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(` All evidence must come from your own <strong data-v-287b6e3b>pre-production environment</strong>. </p><div class="${ssrRenderClass([{ "fc__progress-note--done": evidenceComplete.value }, "fc__progress-note"])}" data-v-287b6e3b>${ssrInterpolate(completeCount.value)} of ${ssrInterpolate(__props.area.scenarios.length)} control-parameter scenarios complete${ssrInterpolate(beneficiaryModels.value.length ? `, ${beneficiaryModels.value.filter(beneficiaryComplete).length} of ${beneficiaryModels.value.length} beneficiary models` : "")}${ssrInterpolate(evidenceComplete.value ? " — you can continue." : ".")}</div><div class="fc__group" data-v-287b6e3b><h3 class="fc__group-h" data-v-287b6e3b>Testing Tool output <span class="fc__opt" data-v-287b6e3b>optional</span></h3><p class="fc__hint" data-v-287b6e3b> Optionally attach the Testing Tool HTML report for your Ozone Connect payment endpoints. This is not required for ${ssrInterpolate(__props.area.label)} — the certification is consent-focused — but you may include it as supporting evidence. </p>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.testingTool,
          "onUpdate:modelValue": ($event) => form.testingTool = $event,
          label: "Testing Tool report (optional)",
          accept: ".html,.htm,text/html",
          hint: "HTML report from the Testing Tool for your Ozone Connect payment endpoints."
        }, null, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList(__props.area.scenarios, (s) => {
          _push(`<div class="${ssrRenderClass([{ "fc__group--done": scenarioComplete(s) }, "fc__group"])}" data-v-287b6e3b><h3 class="fc__group-h" data-v-287b6e3b>${ssrInterpolate(s.label)}</h3><p class="fc__hint" data-v-287b6e3b>${ssrInterpolate(s.guidance)}</p><details class="fc__example" data-v-287b6e3b><summary data-v-287b6e3b>Reference — example ControlParameters</summary><pre data-v-287b6e3b>${ssrInterpolate(s.example)}</pre></details><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin": "0.85rem 0" })}" data-v-287b6e3b><span class="fc__flabel" data-v-287b6e3b>Pre-production ConsentId</span><input${ssrRenderAttr("value", stateFor(s.key).consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-287b6e3b></label><label class="fc__flabel fc__flabel--block"${ssrRenderAttr("for", `mp-details-${s.key}`)} data-v-287b6e3b>Consent details <span class="fc__opt" data-v-287b6e3b>paste the ControlParameters / authorization_details for this consent</span></label><textarea${ssrRenderAttr("id", `mp-details-${s.key}`)} class="fc__textarea fc__textarea--code" placeholder="Paste the consent (ControlParameters / authorization_details) exactly as created for this ConsentId." data-v-287b6e3b>${ssrInterpolate(stateFor(s.key).consentDetails)}</textarea>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: stateFor(s.key).authScreenshot,
            "onUpdate:modelValue": ($event) => stateFor(s.key).authScreenshot = $event,
            label: "Authorization screen",
            accept: "image/png,image/jpeg,image/webp",
            hint: "Screenshot of the authorization screen the customer saw for this consent, showing the control parameters above."
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (beneficiaryModels.value.length) {
          _push(`<!--[--><h3 class="fc__subhead" data-v-287b6e3b>Beneficiary models</h3><p class="fc__hint" data-v-287b6e3b> Variable On-Demand accepts more than a single beneficiary. Evidence one consent for each beneficiary model — the shape is fixed by the decrypted PII&#39;s <code data-v-287b6e3b>Initiation.Creditor</code>. You must advertise support for each model on your Trust Framework authorisation-server entry. See the <a${ssrRenderAttr("href", __props.area.creditorDocHref)} target="_blank" rel="noopener" data-v-287b6e3b>Creditor PII page ↗</a> for the model definitions. </p><!--[-->`);
          ssrRenderList(beneficiaryModels.value, (m) => {
            _push(`<div class="${ssrRenderClass([{ "fc__group--done": beneficiaryComplete(m) }, "fc__group"])}" data-v-287b6e3b><h3 class="fc__group-h" data-v-287b6e3b>${ssrInterpolate(m.label)}</h3><p class="fc__hint" data-v-287b6e3b>${ssrInterpolate(m.description)}</p><p class="fc__hint" data-v-287b6e3b> Advertise via <code data-v-287b6e3b>${ssrInterpolate(m.trustFrameworkFlag)}</code>. </p><details class="fc__example" data-v-287b6e3b><summary data-v-287b6e3b>Reference — decrypted PersonalIdentifiableInformation</summary><pre data-v-287b6e3b>${ssrInterpolate(m.referencePii)}</pre></details><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin": "0.85rem 0" })}" data-v-287b6e3b><span class="fc__flabel" data-v-287b6e3b>Pre-production ConsentId</span><input${ssrRenderAttr("value", beneficiaryStateFor(m.key).consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-287b6e3b></label>`);
            if (m.collectsCreditorArray) {
              _push(`<!--[--><label class="fc__flabel fc__flabel--block"${ssrRenderAttr("for", `bf-creditors-${m.key}`)} data-v-287b6e3b>Consent <code data-v-287b6e3b>Initiation.Creditor</code> array <span class="fc__opt" data-v-287b6e3b>paste the 2–10 creditor entries from your consent</span></label><textarea${ssrRenderAttr("id", `bf-creditors-${m.key}`)} class="fc__textarea fc__textarea--code" placeholder="Paste the Initiation.Creditor array (2–10 entries) exactly as carried on this consent." data-v-287b6e3b>${ssrInterpolate(beneficiaryStateFor(m.key).creditorArray)}</textarea><!--]-->`);
            } else {
              _push(`<div class="fc__opennote" data-v-287b6e3b><strong data-v-287b6e3b>No creditor to submit.</strong> For Open Beneficiaries the consent carries no <code data-v-287b6e3b>Initiation.Creditor</code> — see the reference PII above, where the array is absent. Your authorization screen should reflect that the TPP selects the beneficiaries. </div>`);
            }
            _push(ssrRenderComponent(_component_FcFileInput, {
              modelValue: beneficiaryStateFor(m.key).authScreenshot,
              "onUpdate:modelValue": ($event) => beneficiaryStateFor(m.key).authScreenshot = $event,
              label: "Authorization screen",
              accept: "image/png,image/jpeg,image/webp",
              hint: m.collectsCreditorArray ? "Screenshot of the authorization screen the customer saw for this consent, showing the list of beneficiaries." : "Screenshot of the authorization screen the customer saw for this consent, showing that no fixed beneficiary is set and the TPP selects the beneficiaries."
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-287b6e3b><h2 class="fc__h2" data-v-287b6e3b>Review &amp; generate</h2><p class="fc__lede" data-v-287b6e3b> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-287b6e3b>summary.html</code> and every authorization-screen screenshot — attach it to your <strong data-v-287b6e3b>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-287b6e3b><div data-v-287b6e3b><dt data-v-287b6e3b>Organisation</dt><dd data-v-287b6e3b>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-287b6e3b><dt data-v-287b6e3b>Submitted by</dt><dd data-v-287b6e3b>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-287b6e3b><dt data-v-287b6e3b>Version</dt><dd data-v-287b6e3b>${ssrInterpolate(form.version.toUpperCase())}</dd></div><div data-v-287b6e3b><dt data-v-287b6e3b>Payment type</dt><dd data-v-287b6e3b>${ssrInterpolate(__props.area.paymentType)}</dd></div><div data-v-287b6e3b><dt data-v-287b6e3b>Segments</dt><dd data-v-287b6e3b>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div><div data-v-287b6e3b><dt data-v-287b6e3b>SIP JIRA ticket</dt><dd data-v-287b6e3b>${ssrInterpolate(form.sipJiraTicket || "—")}</dd></div></dl><div class="fc-comment" data-v-287b6e3b><label class="fc-comment__label" for="mp-comments" data-v-287b6e3b>Comments <span class="fc__opt" data-v-287b6e3b>(optional)</span></label><textarea id="mp-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-287b6e3b>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-287b6e3b>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-287b6e3b><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-287b6e3b>Back</button><span class="fc__nav-pos" data-v-287b6e3b>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""}${ssrRenderAttr("title", !canAdvance.value && currentStep.value === 3 ? "Complete the consent evidence first" : "")} data-v-287b6e3b> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-287b6e3b>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcMultiPaymentPortal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-287b6e3b"]]);
export {
  __unplugin_components_0 as _
};
