import { n as emptyPaymentFormState, o as emptyPaymentRailState, p as emptyPaymentTimingState, q as emptyPaymentAaniRejectState, r as emptyPaymentCreditorRiskState, s as emptyPaymentDataSharingState, t as emptyPaymentRefundState, v as emptyPaymentAuthScenarioState, c as __unplugin_components_0$1, d as __unplugin_components_1, _ as __unplugin_components_2, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, reactive, computed, ref, watch, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { V as VERSIONS, _ as _export_sfc, b as block0 } from "../main.mjs";
import { s as singleInstantPaymentArea } from "./single-instant-payment-DviEf-zD.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcPaymentPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyPaymentFormState());
    const railStates = reactive(
      Object.fromEntries(props.area.rails.map((r) => [r.key, emptyPaymentRailState()]))
    );
    const timing = reactive(emptyPaymentTimingState());
    const aaniReject = reactive(emptyPaymentAaniRejectState());
    const creditorRisk = reactive(emptyPaymentCreditorRiskState());
    const dataSharing = reactive(emptyPaymentDataSharingState());
    const refund = reactive(emptyPaymentRefundState());
    const authScreens = reactive(
      Object.fromEntries(props.area.authScreenScenarios.map((s) => [s.key, emptyPaymentAuthScenarioState()]))
    );
    const aaniRail = props.area.rails.find((r) => r.timed);
    const aaniSupported = computed(() => {
      var _a;
      return aaniRail ? !!((_a = railStates[aaniRail.key]) == null ? void 0 : _a.supported) : false;
    });
    const supportedRails = computed(() => props.area.rails.filter((r) => {
      var _a;
      return (_a = railStates[r.key]) == null ? void 0 : _a.supported;
    }));
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Scope & rails", "Evidence", "Review & generate"];
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
    const accountInfoBaseUrl = computed(
      () => props.area.accountInfoBaseUrlTemplate.replace("{VERSION}", form.version).replace("{LFICODE}", "LFICODE")
    );
    const scopeComplete = computed(
      () => form.segment.length > 0 && supportedRails.value.length > 0 && !!form.paymentLimit.trim()
    );
    const coreComplete = computed(() => !!form.testingTool && !!form.postPaymentsPostman);
    const railsComplete = computed(() => supportedRails.value.every((r) => {
      var _a;
      return !!((_a = railStates[r.key]) == null ? void 0 : _a.postman);
    }));
    const timingComplete = computed(() => {
      if (!aaniSupported.value) return true;
      return !!timing.postTimestamp.trim() && !!timing.railSubmitTimestamp.trim() && !!timing.railSubmitScreenshot && !!timing.terminalPatchTimestamp.trim() && !!timing.terminalPatchScreenshot && !!timing.creditorReference.trim() && !!timing.creditorRefScreenshot;
    });
    const aaniRejectComplete = computed(() => {
      if (!aaniSupported.value) return true;
      return !!aaniReject.rejectCode.trim() && !!aaniReject.postman;
    });
    const creditorRiskComplete = computed(
      () => !!creditorRisk.decryptScreenshot && !!creditorRisk.creditorScreenshot && !!creditorRisk.creditorValidationText.trim() && !!creditorRisk.riskScreenshot && !!creditorRisk.riskValidationText.trim()
    );
    const dataSharingComplete = computed(
      () => !!dataSharing.consentId.trim() && !!dataSharing.accountsPostman && !!dataSharing.balancesPostman && !!dataSharing.postPaymentsPostman && !!dataSharing.authScreenshot
    );
    const refundComplete = computed(
      () => !!refund.consentId.trim() && !!refund.postPaymentsPostman && !!refund.refundPostman && !!refund.authScreenshot
    );
    const authScreensComplete = computed(
      () => props.area.authScreenScenarios.every(
        (s) => {
          var _a, _b;
          return !!((_a = authScreens[s.key]) == null ? void 0 : _a.consentId.trim()) && !!((_b = authScreens[s.key]) == null ? void 0 : _b.screenshot);
        }
      )
    );
    const evidenceComplete = computed(
      () => coreComplete.value && railsComplete.value && timingComplete.value && aaniRejectComplete.value && creditorRiskComplete.value && dataSharingComplete.value && refundComplete.value && authScreensComplete.value
    );
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-690c754e>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-690c754e> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-690c754e><h2 class="fc__h2" data-v-690c754e>Your details</h2><p class="fc__lede" data-v-690c754e> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your LFI. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-690c754e><h2 class="fc__h2" data-v-690c754e>Scope &amp; rails</h2><p class="fc__lede" data-v-690c754e> Choose the standards version and segments, declare the rails your LFI supports for ${ssrInterpolate(__props.area.label)}, and state the payment limit you apply. Each rail you declare is evidenced against its terminal status on the next step. </p><div class="fc__controls" data-v-690c754e><div class="fc__ctrl" data-v-690c754e><label class="fc__label" for="pay-version" data-v-690c754e>API version</label><select id="pay-version" class="fc__select"${ssrRenderAttr("value", form.version)} data-v-690c754e><!--[-->`);
        ssrRenderList(unref(VERSIONS), (v) => {
          _push(`<option${ssrRenderAttr("value", v)} data-v-690c754e>${ssrInterpolate(v)}</option>`);
        });
        _push(`<!--]--></select></div><div class="fc__ctrl" data-v-690c754e><label class="fc__label" data-v-690c754e>Segments <span class="fc__opt" data-v-690c754e>select all that apply</span></label><div class="fc__seg" data-v-690c754e><!--[-->`);
        ssrRenderList(__props.area.segments, (s) => {
          _push(`<button type="button" class="${ssrRenderClass([{ on: form.segment.includes(s) }, "fc__seg-btn"])}"${ssrRenderAttr("aria-pressed", form.segment.includes(s))} data-v-690c754e>${ssrInterpolate(s)}</button>`);
        });
        _push(`<!--]--></div></div></div><label class="fc__label" style="${ssrRenderStyle({ "margin-top": "0.5rem" })}" data-v-690c754e>Payment rails supported</label><p class="fc__hint" data-v-690c754e> Select every execution mode your LFI supports for ${ssrInterpolate(__props.area.label)}. The terminal Open Finance status each reaches is fixed by the <a${ssrRenderAttr("href", __props.area.paymentStatusDocHref)} target="_blank" rel="noopener" data-v-690c754e>Payment Status</a> rules. </p><div class="fc__rails" data-v-690c754e><!--[-->`);
        ssrRenderList(__props.area.rails, (r) => {
          var _a, _b;
          _push(`<button type="button" class="${ssrRenderClass([{ on: (_a = railStates[r.key]) == null ? void 0 : _a.supported }, "fc__rail"])}"${ssrRenderAttr("aria-pressed", (_b = railStates[r.key]) == null ? void 0 : _b.supported)} data-v-690c754e><span class="fc__rail-name" data-v-690c754e>${ssrInterpolate(r.label)}</span><code class="fc__rail-status" data-v-690c754e>${ssrInterpolate(r.terminalStatus)}</code><span class="fc__rail-note" data-v-690c754e>${ssrInterpolate(r.note)}</span></button>`);
        });
        _push(`<!--]--></div><div class="fc__ctrl fc__limit" data-v-690c754e><label class="fc__label" for="pay-limit" data-v-690c754e>Payment limit (max AED)</label><input id="pay-limit"${ssrRenderAttr("value", form.paymentLimit)} class="fc__input" type="text" inputmode="decimal" placeholder="e.g. 50000.00" data-v-690c754e><p class="fc__hint" data-v-690c754e> The maximum amount a single payment can take through Open Finance on your LFI. This MUST NOT be more restrictive than your other digital channels. </p></div></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-690c754e><h2 class="fc__h2" data-v-690c754e>Evidence</h2><p class="fc__lede" data-v-690c754e> Attach the evidence below. All evidence must come from your own <strong data-v-690c754e>pre-production environment</strong>. </p><div class="${ssrRenderClass([{ "fc__progress-note--done": evidenceComplete.value }, "fc__progress-note"])}" data-v-690c754e>${ssrInterpolate(evidenceComplete.value ? "All evidence complete — you can continue." : "Some evidence is still outstanding.")}</div><div class="${ssrRenderClass([{ "fc__group--done": coreComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Core payment execution</h3>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.testingTool,
          "onUpdate:modelValue": ($event) => form.testingTool = $event,
          label: "Testing Tool output (POST /payments)",
          accept: ".html,.htm,text/html",
          hint: "HTML report from the Testing Tool for your Ozone Connect POST /payments endpoint."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.postPaymentsPostman,
          "onUpdate:modelValue": ($event) => form.postPaymentsPostman = $event,
          label: "Postman — POST /payments (201 Pending)",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot showing a successful POST /payments returning HTTP 201 with status Pending."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: form.limitScreenshot,
          "onUpdate:modelValue": ($event) => form.limitScreenshot = $event,
          label: "Payment limit exceeded (optional)",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Optional: a payment rejected for exceeding your stated AED limit."
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "fc__group--done": railsComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Terminal status per supported rail</h3>`);
        if (supportedRails.value.length === 0) {
          _push(`<p class="fc__empty" data-v-690c754e> You haven’t declared any rails yet. <button type="button" class="fc__link" data-v-690c754e>Go back to declare rails</button>. </p>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(supportedRails.value, (r) => {
            _push(`<div class="fc__rail-ev" data-v-690c754e><div class="fc__rail-ev-head" data-v-690c754e><span class="fc__rail-ev-name" data-v-690c754e>${ssrInterpolate(r.label)}</span><code class="fc__rail-ev-status" data-v-690c754e>${ssrInterpolate(r.terminalStatus)}</code></div><p class="fc__rail-ev-note" data-v-690c754e>${ssrInterpolate(r.note)}</p>`);
            _push(ssrRenderComponent(_component_FcFileInput, {
              modelValue: railStates[r.key].postman,
              "onUpdate:modelValue": ($event) => railStates[r.key].postman = $event,
              label: `Postman — ${r.label} terminal status`,
              accept: "image/png,image/jpeg,image/webp",
              hint: `Screenshot evidencing a payment on ${r.label} reaching ${r.terminalStatus} (e.g. GET /payments/{PaymentId} or the Payment Log PATCH).`
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
        if (aaniSupported.value) {
          _push(`<div class="${ssrRenderClass([{ "fc__group--done": timingComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>AANI timing</h3><p class="fc__hint" data-v-690c754e> Evidence the two delays for AANI, the primary instant rail: from POST /payments to rail submission, and from POST /payments to the terminal-status PATCH. Enter each timestamp as shown in Postman or your logs and attach the screenshot it comes from. </p><div class="fc__grid" data-v-690c754e><label class="fc__field" data-v-690c754e><span class="fc__flabel" data-v-690c754e>POST /payments timestamp</span><input${ssrRenderAttr("value", timing.postTimestamp)} class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:20.102Z" data-v-690c754e></label><label class="fc__field" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Submitted to AANI timestamp</span><input${ssrRenderAttr("value", timing.railSubmitTimestamp)} class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:21.540Z" data-v-690c754e></label></div>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: timing.railSubmitScreenshot,
            "onUpdate:modelValue": ($event) => timing.railSubmitScreenshot = $event,
            label: "Rail-submission screenshot",
            accept: "image/png,image/jpeg,image/webp",
            hint: "Screenshot evidencing submission to AANI and its timestamp."
          }, null, _parent));
          _push(`<div class="fc__grid" data-v-690c754e><label class="fc__field" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Terminal-status PATCH timestamp</span><input${ssrRenderAttr("value", timing.terminalPatchTimestamp)} class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:22.845Z" data-v-690c754e></label></div>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: timing.terminalPatchScreenshot,
            "onUpdate:modelValue": ($event) => timing.terminalPatchScreenshot = $event,
            label: "Terminal-PATCH screenshot",
            accept: "image/png,image/jpeg,image/webp",
            hint: "Screenshot evidencing the PATCH /payment-log/{paymentId} to AcceptedWithoutPosting and its timestamp."
          }, null, _parent));
          _push(`<p class="fc__hint" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-690c754e> Evidence that the <code data-v-690c754e>CreditorReference</code> received on <code data-v-690c754e>POST /payments</code> — the reconciliation reference for the Creditor / Creditor LFI — is carried into the AANI submission (pacs.008 remittance data) so it reaches the receiving bank. Use <code data-v-690c754e>CreditorReference</code>, not <code data-v-690c754e>DebtorReference</code> (the debtor&#39;s own statement narrative, which stays on the debtor side). </p><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin-bottom": "0.85rem" })}" data-v-690c754e><span class="fc__flabel" data-v-690c754e>CreditorReference sent on POST /payments</span><input${ssrRenderAttr("value", timing.creditorReference)} class="fc__input fc__input--mono" placeholder="e.g. INV-2026-04-8817" spellcheck="false" data-v-690c754e></label>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: timing.creditorRefScreenshot,
            "onUpdate:modelValue": ($event) => timing.creditorRefScreenshot = $event,
            label: "CreditorReference in AANI submission",
            accept: "image/png,image/jpeg,image/webp",
            hint: "Screenshot of the outbound AANI (pacs.008) submission showing the same CreditorReference value present in the remittance data sent to the receiving bank."
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (aaniSupported.value) {
          _push(`<div class="${ssrRenderClass([{ "fc__group--done": aaniRejectComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>AANI rejection example</h3><p class="fc__hint" data-v-690c754e> Evidence one payment rejected on AANI, mapped to the <code data-v-690c754e>Rejected</code> status with a correctly namespaced <code data-v-690c754e>AANI.&lt;code&gt;</code> reason (for example <code data-v-690c754e>AANI.AM04</code>). The rail code MUST NOT be transposed into the <code data-v-690c754e>LFI.</code> namespace. </p><label class="fc__field" style="${ssrRenderStyle({ "max-width": "20rem", "margin-bottom": "0.85rem" })}" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Reject reason code</span><input${ssrRenderAttr("value", aaniReject.rejectCode)} class="fc__input fc__input--mono" placeholder="AANI.AM04" spellcheck="false" data-v-690c754e></label>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: aaniReject.postman,
            "onUpdate:modelValue": ($event) => aaniReject.postman = $event,
            label: "Postman — PATCH /payment-log/{paymentId} (Rejected)",
            accept: "image/png,image/jpeg,image/webp",
            hint: "Screenshot of the PATCH /payment-log/{paymentId} call to the Consent Manager setting status Rejected with the AANI.<code> reject reason code."
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([{ "fc__group--done": creditorRiskComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Creditor validation &amp; Risk handling</h3><p class="fc__hint" data-v-690c754e> The Creditor account arrives inside the encrypted <code data-v-690c754e>PersonalIdentifiableInformation</code>, so evidence decrypting it and validating the creditor. The <code data-v-690c754e>Risk</code> object (AERisk) is cleartext — evidence that it is received and used in your fraud/screening. </p>`);
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
        _push(`<label class="fc__flabel fc__flabel--block" for="cr-creditor-text" data-v-690c754e>Creditor validation rules — beyond the OpenAPI spec</label><textarea id="cr-creditor-text" class="fc__textarea" placeholder="Describe the fields and validations you place on the TPP when validating the Creditor that go beyond the OpenAPI spec — e.g. always requiring the IBAN, name-match thresholds, or rejecting specific account types." data-v-690c754e>${ssrInterpolate(creditorRisk.creditorValidationText)}</textarea>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: creditorRisk.riskScreenshot,
          "onUpdate:modelValue": ($event) => creditorRisk.riskScreenshot = $event,
          label: "Risk object received & used",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot evidencing the Risk object is received and consumed in fraud/screening."
        }, null, _parent));
        _push(`<label class="fc__flabel fc__flabel--block" for="cr-risk-text" data-v-690c754e>Risk validation rules — beyond the OpenAPI spec</label><textarea id="cr-risk-text" class="fc__textarea" placeholder="Describe any validations you apply to the Risk object that go beyond what the OpenAPI spec defines — e.g. required indicators, cross-checks, or rejection conditions." data-v-690c754e>${ssrInterpolate(creditorRisk.riskValidationText)}</textarea></div><div class="${ssrRenderClass([{ "fc__group--done": dataSharingComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Account &amp; balance reads before the payment</h3><p class="fc__hint" data-v-690c754e> Evidence a payment consent carrying <code data-v-690c754e>ReadAccountsBasic</code> / <code data-v-690c754e>ReadAccountsDetail</code> and <code data-v-690c754e>ReadBalances</code> — a successful account read and balance read <a${ssrRenderAttr("href", __props.area.accountPermsDocHref)} target="_blank" rel="noopener" data-v-690c754e>before</a> a successful payment. Account reads are served from <code data-v-690c754e>${ssrInterpolate(accountInfoBaseUrl.value)}</code>. </p><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin-bottom": "0.85rem" })}" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Pre-production ConsentId</span><input${ssrRenderAttr("value", dataSharing.consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-690c754e></label>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: dataSharing.accountsPostman,
          "onUpdate:modelValue": ($event) => dataSharing.accountsPostman = $event,
          label: "Postman — GET /accounts",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of a successful GET /accounts on the payment consent."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: dataSharing.balancesPostman,
          "onUpdate:modelValue": ($event) => dataSharing.balancesPostman = $event,
          label: "Postman — GET /accounts/{AccountId}/balances",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of a successful GET /accounts/{AccountId}/balances on the payment consent."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: dataSharing.postPaymentsPostman,
          "onUpdate:modelValue": ($event) => dataSharing.postPaymentsPostman = $event,
          label: "Postman — subsequent POST /payments",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of the successful POST /payments made after the account and balance reads."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: dataSharing.authScreenshot,
          "onUpdate:modelValue": ($event) => dataSharing.authScreenshot = $event,
          label: "Authorisation page",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of your authorisation page where the customer authorised this payment consent."
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "fc__group--done": refundComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Refund-account read after the payment</h3><p class="fc__hint" data-v-690c754e> Evidence a payment consent carrying <code data-v-690c754e>ReadRefundAccount</code> — a successful <a${ssrRenderAttr("href", __props.area.refundsDocHref)} target="_blank" rel="noopener" data-v-690c754e>refund-account read</a> after a successful payment. </p><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin-bottom": "0.85rem" })}" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Pre-production ConsentId</span><input${ssrRenderAttr("value", refund.consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-690c754e></label>`);
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: refund.postPaymentsPostman,
          "onUpdate:modelValue": ($event) => refund.postPaymentsPostman = $event,
          label: "Postman — POST /payments",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of the successful POST /payments."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: refund.refundPostman,
          "onUpdate:modelValue": ($event) => refund.refundPostman = $event,
          label: "Postman — GET /payment-consents/{ConsentId}/refund",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of the successful refund-account read after the payment."
        }, null, _parent));
        _push(ssrRenderComponent(_component_FcFileInput, {
          modelValue: refund.authScreenshot,
          "onUpdate:modelValue": ($event) => refund.authScreenshot = $event,
          label: "Authorisation page",
          accept: "image/png,image/jpeg,image/webp",
          hint: "Screenshot of your authorisation page where the customer authorised this payment consent."
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "fc__group--done": authScreensComplete.value }, "fc__group"])}" data-v-690c754e><h3 class="fc__group-h" data-v-690c754e>Payment authorisation screen</h3><p class="fc__hint" data-v-690c754e> The customer authorises the payment consent on your own authorisation page, so these screenshots come from the LFI side: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee <code data-v-690c754e>NameMatchIndicator</code> (<code data-v-690c754e>ConfirmationOfPayee.Yes</code> / <code data-v-690c754e>ConfirmationOfPayee.Partial</code> / <code data-v-690c754e>ConfirmationOfPayee.No</code>) surfaced to the customer. Each scenario is its own pre-production consent. </p><!--[-->`);
        ssrRenderList(__props.area.authScreenScenarios, (s) => {
          _push(`<div class="fc__rail-ev" data-v-690c754e><div class="fc__rail-ev-head" data-v-690c754e><span class="fc__rail-ev-name" data-v-690c754e>${ssrInterpolate(s.label)}</span>`);
          if (s.indicator) {
            _push(`<code class="fc__rail-ev-status" data-v-690c754e>${ssrInterpolate(s.indicator)}</code>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="fc__rail-ev-note" data-v-690c754e>${ssrInterpolate(s.guidance)}</p><label class="fc__field" style="${ssrRenderStyle({ "max-width": "26rem", "margin-bottom": "0.85rem" })}" data-v-690c754e><span class="fc__flabel" data-v-690c754e>Pre-production ConsentId</span><input${ssrRenderAttr("value", authScreens[s.key].consentId)} class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" data-v-690c754e></label>`);
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: authScreens[s.key].screenshot,
            "onUpdate:modelValue": ($event) => authScreens[s.key].screenshot = $event,
            label: `Authorisation page — ${s.label}`,
            accept: "image/png,image/jpeg,image/webp",
            hint: `Screenshot of your authorisation page for this consent showing ${s.indicator ? s.indicator + " to the customer" : "the TPP-specified debtor account"}.`
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-690c754e><h2 class="fc__h2" data-v-690c754e>Review &amp; generate</h2><p class="fc__lede" data-v-690c754e> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-690c754e>summary.html</code>, your Testing Tool report, and every screenshot — attach it to your <strong data-v-690c754e>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-690c754e><div data-v-690c754e><dt data-v-690c754e>Organisation</dt><dd data-v-690c754e>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-690c754e><dt data-v-690c754e>Submitted by</dt><dd data-v-690c754e>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-690c754e><dt data-v-690c754e>Version</dt><dd data-v-690c754e>${ssrInterpolate(form.version.toUpperCase())}</dd></div><div data-v-690c754e><dt data-v-690c754e>Payment type</dt><dd data-v-690c754e>${ssrInterpolate(__props.area.paymentType)}</dd></div><div data-v-690c754e><dt data-v-690c754e>Segments</dt><dd data-v-690c754e>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div><div data-v-690c754e><dt data-v-690c754e>Rails</dt><dd data-v-690c754e>${ssrInterpolate(supportedRails.value.map((r) => r.label).join(", ") || "—")}</dd></div><div data-v-690c754e><dt data-v-690c754e>Payment limit</dt><dd data-v-690c754e>${ssrInterpolate(form.paymentLimit ? `${form.paymentLimit} AED` : "—")}</dd></div></dl><div class="fc-comment" data-v-690c754e><label class="fc-comment__label" for="pay-comments" data-v-690c754e>Comments <span class="fc__opt" data-v-690c754e>(optional)</span></label><textarea id="pay-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-690c754e>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-690c754e>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-690c754e><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-690c754e>Back</button><span class="fc__nav-pos" data-v-690c754e>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""}${ssrRenderAttr("title", !canAdvance.value && currentStep.value === 3 ? "Complete every evidence group first" : "")} data-v-690c754e> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-690c754e>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcPaymentPortal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-690c754e"]]);
const explainerPath = "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcPaymentPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3ce92832><section class="ed-doc__hero" data-v-3ce92832><div class="ed-doc__inner" data-v-3ce92832><div class="ed-doc__eyebrow" data-v-3ce92832><span class="ed-doc__eyebrow-dash" data-v-3ce92832></span> Functional Certification · Single Instant Payment </div><h1 class="ed-doc__title" data-v-3ce92832>Build your submission</h1><p class="ed-doc__lede" data-v-3ce92832> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-3ce92832>${ssrInterpolate(unref(singleInstantPaymentArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-3ce92832>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-3ce92832><div class="ed-doc__inner" data-v-3ce92832>`);
      _push(ssrRenderComponent(_component_FcPaymentPortal, { area: unref(singleInstantPaymentArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ce92832"]]);
export {
  submission as default
};
