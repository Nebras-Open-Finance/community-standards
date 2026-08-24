import { defineComponent, computed, ref, watch, mergeProps, useSSRContext, inject, unref, provide, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { p as permissionDescriptions } from "./permissionDescriptions-WkI-8pYN.js";
import { f as formatDate } from "./formatDate-CaaKrjgT.js";
const MAX_CONSENTS = 12;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ConsentConnectionsEditor",
  __ssrInlineRender: true,
  props: {
    mode: { default: "all" }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const isLfi = computed(() => (route.path ?? "").includes("/lfi-api-hub"));
    const entityLabel = computed(() => isLfi.value ? "TPP" : "LFI");
    const { updateField } = useSharedState();
    const ALL_CONSENT_STATUSES = [
      "AwaitingAuthorization",
      "Authorized",
      "Rejected",
      "Suspended",
      "Paused",
      "Consumed",
      "Expired",
      "Revoked"
    ];
    const CONSENT_STATUSES = computed(() => {
      let statuses = isLfi.value ? ALL_CONSENT_STATUSES.filter((s) => s !== "Paused") : ALL_CONSENT_STATUSES;
      if (props.mode === "data-sharing") statuses = statuses.filter((s) => s !== "Consumed");
      return statuses;
    });
    const ALL_CONSENT_TYPES = [
      "Data Sharing",
      "Single Instant Payment",
      "Multi Payment (VariableOnDemand)",
      "Multi Payment (FixedOnDemand)",
      "Multi Payment (VariablePeriodicSchedule)",
      "Multi Payment (FixedPeriodicSchedule)",
      "Multi Payment (VariableDefinedSchedule)",
      "Multi Payment (FixedDefinedSchedule)",
      "Multi Payment (DelegatedSCA)"
    ];
    const CONSENT_TYPES = computed(() => {
      if (props.mode === "data-sharing") return ALL_CONSENT_TYPES.filter((t) => t === "Data Sharing");
      if (props.mode === "payments") return ALL_CONSENT_TYPES.filter((t) => t !== "Data Sharing");
      return ALL_CONSENT_TYPES;
    });
    const PAYMENT_STATUSES = [
      "Pending",
      "AcceptedSettlementCompleted",
      "AcceptedCreditSettlementCompleted",
      "AcceptedWithoutPosting",
      "Rejected"
    ];
    const BENEFICIARY_MODELS = [
      { value: "single", label: "Single Beneficiary" },
      { value: "multiple", label: "Multiple Beneficiaries" },
      { value: "open", label: "Open Beneficiary" }
    ];
    const MULTI_BENEFICIARY_TYPES = /* @__PURE__ */ new Set([
      "Multi Payment (VariableOnDemand)",
      "Multi Payment (DelegatedSCA)"
    ]);
    function supportsBeneficiaryModel(type) {
      return MULTI_BENEFICIARY_TYPES.has(type);
    }
    const LFI_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function randomLfiDigit() {
      return Math.floor(Math.random() * 9) + 1;
    }
    function isSingleInstantPayment(type) {
      return type === "Single Instant Payment";
    }
    function isMultiPayment(type) {
      return type.startsWith("Multi Payment");
    }
    function isConsumedDisabled(type) {
      return type === "Data Sharing" || type === "Multi Payment (DelegatedSCA)";
    }
    function isStatusDisabled(consentType, status) {
      if (isSingleInstantPayment(consentType) && (status === "Authorized" || status === "Paused")) return true;
      if (isConsumedDisabled(consentType) && status === "Consumed") return true;
      return false;
    }
    function getFallbackStatusForType(type) {
      if (isSingleInstantPayment(type)) return "AwaitingAuthorization";
      return "Authorized";
    }
    function normalizeStatusForType(type, status) {
      if (isLfi.value && status === "Paused") return "Authorized";
      if (isSingleInstantPayment(type) && (status === "Authorized" || status === "Paused")) return getFallbackStatusForType(type);
      if (isConsumedDisabled(type) && status === "Consumed") return "Authorized";
      return status;
    }
    function needsPaymentStatus(consent) {
      return isSingleInstantPayment(consent.type) && consent.status === "Consumed";
    }
    function generateMaskedIban(seed) {
      const suffix = String(seed).padStart(6, "0").slice(-6);
      return `AE** **** **** **** ${suffix.slice(0, 3)} ${suffix.slice(3)}`;
    }
    function ensureMaskedIban(consent) {
      if (isSingleInstantPayment(consent.type) || isMultiPayment(consent.type)) {
        if (!consent.maskedIban) consent.maskedIban = generateMaskedIban(consent.id ?? Math.random() * 999999);
      } else {
        consent.maskedIban = void 0;
      }
    }
    function ensureBeneficiary(consent) {
      if (!supportsBeneficiaryModel(consent.type)) {
        consent.beneficiary = void 0;
        return;
      }
      if (!BENEFICIARY_MODELS.some((m) => m.value === consent.beneficiary)) {
        consent.beneficiary = "single";
      }
    }
    const ALL_SEED_CONSENTS = [
      { id: 1, status: "Authorized", lfiDigit: 9, type: "Data Sharing", baseConsentId: 3 },
      { id: 2, status: "Revoked", lfiDigit: randomLfiDigit(), type: "Data Sharing", baseConsentId: "" },
      { id: 3, status: "Expired", lfiDigit: 9, type: "Data Sharing", baseConsentId: "" },
      { id: 4, status: "Authorized", lfiDigit: 5, type: "Data Sharing", baseConsentId: "" },
      { id: 5, status: "Suspended", lfiDigit: 2, type: "Data Sharing", baseConsentId: "" },
      { id: 6, status: "Paused", lfiDigit: 7, type: "Data Sharing", baseConsentId: "" },
      { id: 7, status: "Rejected", lfiDigit: 1, type: "Data Sharing", baseConsentId: "" },
      { id: 8, status: "AwaitingAuthorization", lfiDigit: randomLfiDigit(), type: "Single Instant Payment", maskedIban: generateMaskedIban(8), baseConsentId: "" },
      { id: 9, status: "Consumed", lfiDigit: randomLfiDigit(), type: "Single Instant Payment", maskedIban: generateMaskedIban(9), paymentStatus: "AcceptedWithoutPosting", baseConsentId: "" },
      { id: 10, status: "Consumed", lfiDigit: randomLfiDigit(), type: "Single Instant Payment", maskedIban: generateMaskedIban(10), paymentStatus: "Rejected", baseConsentId: "" },
      { id: 11, status: "Rejected", lfiDigit: randomLfiDigit(), type: "Single Instant Payment", maskedIban: generateMaskedIban(11), baseConsentId: "" },
      { id: 12, status: "Authorized", lfiDigit: 4, type: "Multi Payment (VariableOnDemand)", maskedIban: generateMaskedIban(12), beneficiary: "multiple", baseConsentId: 15 },
      { id: 13, status: "Suspended", lfiDigit: randomLfiDigit(), type: "Multi Payment (FixedOnDemand)", maskedIban: generateMaskedIban(13), baseConsentId: "" },
      { id: 14, status: "Authorized", lfiDigit: 6, type: "Multi Payment (VariablePeriodicSchedule)", maskedIban: generateMaskedIban(14), baseConsentId: "" },
      { id: 15, status: "Revoked", lfiDigit: 4, type: "Multi Payment (VariableOnDemand)", maskedIban: generateMaskedIban(12), beneficiary: "multiple", baseConsentId: "" },
      { id: 16, status: "Expired", lfiDigit: 3, type: "Multi Payment (FixedDefinedSchedule)", maskedIban: generateMaskedIban(16), baseConsentId: "" },
      { id: 17, status: "Authorized", lfiDigit: 8, type: "Multi Payment (DelegatedSCA)", maskedIban: generateMaskedIban(17), beneficiary: "open", baseConsentId: "" }
    ];
    function seedConsents() {
      if (props.mode === "data-sharing") return ALL_SEED_CONSENTS.filter((c) => c.type === "Data Sharing");
      if (props.mode === "payments") return ALL_SEED_CONSENTS.filter((c) => c.type !== "Data Sharing");
      return ALL_SEED_CONSENTS;
    }
    ALL_SEED_CONSENTS.reduce((m, c) => Math.max(m, c.id), 0) + 1;
    const consents = ref(seedConsents());
    watch(
      consents,
      (val) => {
        for (const consent of val) {
          consent.status = normalizeStatusForType(consent.type, consent.status);
          ensureMaskedIban(consent);
          ensureBeneficiary(consent);
          if (isSingleInstantPayment(consent.type) && consent.status === "Consumed") {
            if (!consent.paymentStatus) consent.paymentStatus = "Pending";
          } else {
            consent.paymentStatus = void 0;
          }
        }
        const payload = val.map((item) => ({
          id: item.id,
          status: item.status,
          lfiDigit: Number(item.lfiDigit),
          type: item.type,
          maskedIban: item.maskedIban,
          paymentStatus: item.paymentStatus,
          beneficiary: item.beneficiary,
          baseConsentId: item.baseConsentId || void 0
        }));
        updateField("consentConnections", JSON.stringify(payload));
      },
      { deep: true, immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "cce" }, _attrs))} data-v-b884c0c2><header class="cce__header" data-v-b884c0c2><span class="cce__eyebrow" data-v-b884c0c2><span class="cce__eyebrow-dash" data-v-b884c0c2></span> Simulated consents </span><span class="cce__subtitle" data-v-b884c0c2>Configure the consents shown on the Consent Management screen</span></header><div class="cce__rows" data-v-b884c0c2><!--[-->`);
      ssrRenderList(consents.value, (consent) => {
        _push(`<div class="cce__row" data-v-b884c0c2><div class="cce__field cce__field--status" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>Status</label><select class="cce__control" data-v-b884c0c2><!--[-->`);
        ssrRenderList(CONSENT_STATUSES.value, (status) => {
          _push(`<option${ssrRenderAttr("value", status)}${ssrIncludeBooleanAttr(isStatusDisabled(consent.type, status)) ? " disabled" : ""} data-v-b884c0c2${ssrIncludeBooleanAttr(Array.isArray(consent.status) ? ssrLooseContain(consent.status, status) : ssrLooseEqual(consent.status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
        });
        _push(`<!--]--></select></div><div class="cce__field cce__field--lfi" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>${ssrInterpolate(entityLabel.value)}</label><select class="cce__control" data-v-b884c0c2><!--[-->`);
        ssrRenderList(LFI_DIGITS, (digit) => {
          _push(`<option${ssrRenderAttr("value", digit)} data-v-b884c0c2${ssrIncludeBooleanAttr(Array.isArray(consent.lfiDigit) ? ssrLooseContain(consent.lfiDigit, digit) : ssrLooseEqual(consent.lfiDigit, digit)) ? " selected" : ""}>${ssrInterpolate(digit)}</option>`);
        });
        _push(`<!--]--></select></div><div class="cce__field cce__field--type" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>Type</label><select class="cce__control" data-v-b884c0c2><!--[-->`);
        ssrRenderList(CONSENT_TYPES.value, (type) => {
          _push(`<option${ssrRenderAttr("value", type)} data-v-b884c0c2${ssrIncludeBooleanAttr(Array.isArray(consent.type) ? ssrLooseContain(consent.type, type) : ssrLooseEqual(consent.type, type)) ? " selected" : ""}>${ssrInterpolate(type)}</option>`);
        });
        _push(`<!--]--></select></div>`);
        if (supportsBeneficiaryModel(consent.type)) {
          _push(`<div class="cce__field cce__field--beneficiary" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>Beneficiary</label><select class="cce__control" data-v-b884c0c2><!--[-->`);
          ssrRenderList(BENEFICIARY_MODELS, (model) => {
            _push(`<option${ssrRenderAttr("value", model.value)} data-v-b884c0c2${ssrIncludeBooleanAttr(Array.isArray(consent.beneficiary) ? ssrLooseContain(consent.beneficiary, model.value) : ssrLooseEqual(consent.beneficiary, model.value)) ? " selected" : ""}>${ssrInterpolate(model.label)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else {
          _push(`<!---->`);
        }
        if (needsPaymentStatus(consent)) {
          _push(`<div class="cce__field cce__field--payment" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>Payment status</label><select class="cce__control" data-v-b884c0c2><!--[-->`);
          ssrRenderList(PAYMENT_STATUSES, (ps) => {
            _push(`<option${ssrRenderAttr("value", ps)} data-v-b884c0c2${ssrIncludeBooleanAttr(Array.isArray(consent.paymentStatus) ? ssrLooseContain(consent.paymentStatus, ps) : ssrLooseEqual(consent.paymentStatus, ps)) ? " selected" : ""}>${ssrInterpolate(ps)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="cce__field cce__field--base" data-v-b884c0c2><label class="cce__label" data-v-b884c0c2>BaseConsentId</label><input class="cce__control" type="text"${ssrRenderAttr("value", consent.baseConsentId)} placeholder="Optional" data-v-b884c0c2></div><button type="button" class="cce__remove"${ssrIncludeBooleanAttr(consents.value.length <= 1) ? " disabled" : ""} title="Remove consent" aria-label="Remove consent" data-v-b884c0c2><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-b884c0c2><path d="M3 6h18" data-v-b884c0c2></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-b884c0c2></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" data-v-b884c0c2></path><line x1="10" y1="11" x2="10" y2="17" data-v-b884c0c2></line><line x1="14" y1="11" x2="14" y2="17" data-v-b884c0c2></line></svg></button></div>`);
      });
      _push(`<!--]--></div><footer class="cce__footer" data-v-b884c0c2><button type="button" class="cce__add"${ssrIncludeBooleanAttr(consents.value.length >= MAX_CONSENTS) ? " disabled" : ""} data-v-b884c0c2>+ Add consent</button><span class="cce__count" data-v-b884c0c2>${ssrInterpolate(consents.value.length)} / ${ssrInterpolate(MAX_CONSENTS)}</span></footer></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/editors/ConsentConnectionsEditor.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b884c0c2"]]);
const dataSharingState = {
  Permissions: [
    "ReadAccountsDetail",
    "ReadBalances",
    "ReadTransactionsDetail",
    "ReadStatements",
    "ReadBeneficiariesDetail",
    "ReadDirectDebits",
    "ReadStandingOrdersDetail",
    "ReadScheduledPaymentsDetail",
    "ReadPartyUser",
    "ReadProduct",
    "ReadProductFinanceRates"
  ],
  ExpirationDateTime: "2026-03-31T00:00:00Z",
  OnBehalfOf: { TradingName: "AlTareq" }
};
const paymentState = {
  Permissions: ["ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
  ExpirationDateTime: "2026-03-31T00:00:00Z"
};
const CONSENT_EXAMPLE_STATE = {
  "Data Sharing": dataSharingState,
  "Single Instant Payment": paymentState,
  "Multi Payment (VariableOnDemand)": paymentState,
  "Multi Payment (FixedOnDemand)": paymentState,
  "Multi Payment (VariablePeriodicSchedule)": paymentState,
  "Multi Payment (FixedPeriodicSchedule)": paymentState,
  "Multi Payment (VariableDefinedSchedule)": paymentState,
  "Multi Payment (FixedDefinedSchedule)": paymentState,
  "Multi Payment (DelegatedSCA)": paymentState
};
const _sfc_main$3 = {
  __name: "ConsentDataSharingPermissions",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState } = useSharedState();
    const detailConsent = inject("detailConsent", null);
    const consent = computed(() => {
      var _a;
      return (detailConsent == null ? void 0 : detailConsent.value) ?? ((_a = sharedState == null ? void 0 : sharedState.value) == null ? void 0 : _a.consent);
    });
    const show_account_details = ref(false);
    const show_regular_payments = ref(false);
    const show_account_trans = ref(false);
    const show_account_statements = ref(false);
    const show_product_info = ref(false);
    const show_parties = ref(false);
    const show_finance_rates = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consent-page-text-frame-2" }, _attrs))} data-v-9b7609e5><div class="consent-page-text-inner-frame" data-v-9b7609e5><div class="consent-page-text-inner-frame-2" data-v-9b7609e5><div class="consent-page-text-mini-header-section" data-v-9b7609e5><div class="consent-page-text-mini-header-section-header" data-v-9b7609e5> Data we can access </div></div><div class="consent-page-text-section" data-v-9b7609e5>`);
      if ((_b = (_a = consent.value) == null ? void 0 : _a.Permissions) == null ? void 0 : _b.some((item) => ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Account Details</div></div><svg class="${ssrRenderClass([{ "is-open": show_account_details.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_account_details.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5><div class="consent-page-dropdown-subtext" data-v-9b7609e5>`);
          if ((_d = (_c = consent.value) == null ? void 0 : _c.Permissions) == null ? void 0 : _d.includes("ReadAccountsDetail")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadAccountsDetail"])}</div>`);
          } else if ((_f = (_e = consent.value) == null ? void 0 : _e.Permissions) == null ? void 0 : _f.includes("ReadAccountsBasic")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadAccountsBasic"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((_h = (_g = consent.value) == null ? void 0 : _g.Permissions) == null ? void 0 : _h.includes("ReadBalances")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadBalances"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_j = (_i = consent.value) == null ? void 0 : _i.Permissions) == null ? void 0 : _j.some((item) => ["ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadStandingOrdersBasic", "ReadStandingOrdersDetail", "ReadDirectDebits", "ReadScheduledPaymentsBasic", "ReadScheduledPaymentsDetail"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M12 6V18" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Regular Payments</div></div><svg class="${ssrRenderClass([{ "is-open": show_regular_payments.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_regular_payments.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5><div class="consent-page-dropdown-subtext" data-v-9b7609e5>`);
          if ((_l = (_k = consent.value) == null ? void 0 : _k.Permissions) == null ? void 0 : _l.includes("ReadBeneficiariesDetail")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadBeneficiariesDetail"])}</div>`);
          } else if ((_n = (_m = consent.value) == null ? void 0 : _m.Permissions) == null ? void 0 : _n.includes("ReadBeneficiariesBasic")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadBeneficiariesBasic"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((_p = (_o = consent.value) == null ? void 0 : _o.Permissions) == null ? void 0 : _p.includes("ReadStandingOrdersDetail")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadStandingOrdersDetail"])}</div>`);
          } else if ((_r = (_q = consent.value) == null ? void 0 : _q.Permissions) == null ? void 0 : _r.includes("ReadStandingOrdersBasic")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadStandingOrdersBasic"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((_t = (_s = consent.value) == null ? void 0 : _s.Permissions) == null ? void 0 : _t.includes("ReadScheduledPaymentsDetail")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadScheduledPaymentsDetail"])}</div>`);
          } else if ((_v = (_u = consent.value) == null ? void 0 : _u.Permissions) == null ? void 0 : _v.includes("ReadScheduledPaymentsBasic")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadScheduledPaymentsBasic"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((_x = (_w = consent.value) == null ? void 0 : _w.Permissions) == null ? void 0 : _x.includes("ReadDirectDebits")) {
            _push(`<div data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadDirectDebits"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_z = (_y = consent.value) == null ? void 0 : _y.Permissions) == null ? void 0 : _z.some((item) => ["ReadTransactionsBasic", "ReadTransactionsDetail"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M13 9H7" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M22 10.97V13.03C22 13.58 21.56 14.03 21 14.05H19.04C17.96 14.05 16.97 13.26 16.88 12.18C16.82 11.55 17.06 10.96 17.48 10.55C17.85 10.17 18.36 9.95001 18.92 9.95001H21C21.56 9.97001 22 10.42 22 10.97Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Account Transactions</div></div><svg class="${ssrRenderClass([{ "is-open": show_account_trans.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_account_trans.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5>`);
          if ((_B = (_A = consent.value) == null ? void 0 : _A.Permissions) == null ? void 0 : _B.includes("ReadTransactionsDetail")) {
            _push(`<div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadTransactionsDetail"])}</div>`);
          } else if ((_D = (_C = consent.value) == null ? void 0 : _C.Permissions) == null ? void 0 : _D.includes("ReadTransactionsBasic")) {
            _push(`<div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadTransactionsBasic"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_F = (_E = consent.value) == null ? void 0 : _E.Permissions) == null ? void 0 : _F.some((item) => ["ReadStatements"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M8 7H16" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M9 11H15" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M18.211 14.7703L14.671 18.3103C14.531 18.4503 14.401 18.7103 14.371 18.9003L14.181 20.2503C14.111 20.7403 14.451 21.0803 14.941 21.0103L16.291 20.8203C16.481 20.7903 16.751 20.6603 16.881 20.5203L20.421 16.9803C21.031 16.3703 21.321 15.6603 20.421 14.7603C19.531 13.8703 18.821 14.1603 18.211 14.7703Z" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M17.6992 15.2803C17.9992 16.3603 18.8392 17.2003 19.9192 17.5003" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Account Statements</div></div><svg class="${ssrRenderClass([{ "is-open": show_account_statements.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_account_statements.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5><div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadStatements"])}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_H = (_G = consent.value) == null ? void 0 : _G.Permissions) == null ? void 0 : _H.some((item) => ["ReadProduct"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M15.9965 12H16.0054" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M11.9955 12H12.0045" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M7.99451 12H8.00349" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Product Information</div></div><svg class="${ssrRenderClass([{ "is-open": show_product_info.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_product_info.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5><div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadProduct"])}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_J = (_I = consent.value) == null ? void 0 : _I.Permissions) == null ? void 0 : _J.some((item) => ["ReadPartyUser", "ReadPartyUserIdentity", "ReadParty"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M15 15.5H21" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" data-v-9b7609e5></path><path d="M15 19.5H21" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Contact and Party Details</div></div><svg class="${ssrRenderClass([{ "is-open": show_parties.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_parties.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5>`);
          if ((_L = (_K = consent.value) == null ? void 0 : _K.Permissions) == null ? void 0 : _L.includes("ReadPartyUserIdentity")) {
            _push(`<div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadPartyUserIdentity"])}</div>`);
          } else if ((_N = (_M = consent.value) == null ? void 0 : _M.Permissions) == null ? void 0 : _N.includes("ReadPartyUser")) {
            _push(`<div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadPartyUser"])}</div>`);
          } else if ((_P = (_O = consent.value) == null ? void 0 : _O.Permissions) == null ? void 0 : _P.includes("ReadParty")) {
            _push(`<div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadParty"])}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_R = (_Q = consent.value) == null ? void 0 : _Q.Permissions) == null ? void 0 : _R.some((item) => ["ReadProductFinanceRates"].includes(item))) {
        _push(`<div class="consent-page-dropdown-container" data-v-9b7609e5><div class="consent-page-dropdown" data-v-9b7609e5><div class="consent-page-dropdown-text-section" data-v-9b7609e5><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M8.57007 15.27L15.11 8.72998" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-9b7609e5></path></svg><div class="consent-page-dropdown-text" data-v-9b7609e5> Your Finance Rates</div></div><svg class="${ssrRenderClass([{ "is-open": show_finance_rates.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9b7609e5><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-9b7609e5></path></svg></div>`);
        if (show_finance_rates.value) {
          _push(`<div class="consent-page-dropdown-subtext-section" data-v-9b7609e5><div class="consent-page-dropdown-subtext" data-v-9b7609e5>${ssrInterpolate(unref(permissionDescriptions)["ReadProductFinanceRates"])}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentDataSharingPermissions.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ConsentDataSharingPermissions = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-9b7609e5"]]);
const _sfc_main$2 = {
  __name: "ConsentPaymentPermissions",
  __ssrInlineRender: true,
  setup(__props) {
    const detailConsent = inject("detailConsent", null);
    const detailConnection = inject("detailConnection", null);
    const paymentHistory = inject("paymentHistory", []);
    const activeTab = ref("rules");
    const expiryDate = computed(() => {
      var _a;
      return formatDate((_a = detailConsent == null ? void 0 : detailConsent.value) == null ? void 0 : _a.ExpirationDateTime);
    });
    const connectionType = computed(() => {
      var _a;
      return ((_a = detailConnection == null ? void 0 : detailConnection.value) == null ? void 0 : _a.type) ?? "";
    });
    const isDefined = computed(() => connectionType.value.includes("DefinedSchedule"));
    const isDelegated = computed(() => connectionType.value.includes("DelegatedSCA"));
    const EXAMPLE_RULES = {
      OnDemand: {
        firstPaymentDate: "01/12/2026",
        maxPerPayment: "200.00",
        amount: "200.00",
        totalPayments: "5",
        totalValue: "900.00",
        maxPaymentsPerPeriod: "2",
        maxValuePerPeriod: "200.00"
      },
      PeriodicSchedule: {
        firstPaymentDate: "01/01/2026",
        frequency: "Monthly",
        maxPerPayment: "200.00",
        amount: "200.00",
        totalPayments: "6",
        totalValue: "1200.00"
      },
      // DefinedSchedule: each entry carries date, amount and an outcome status.
      // Entries before today have a result; future entries are Upcoming.
      DefinedSchedule: {
        entries: [
          { date: "01/01/2026", amount: "150.00", status: "Successful" },
          { date: "01/02/2026", amount: "150.00", status: "Successful" },
          { date: "01/03/2026", amount: "200.00", status: "Failed" },
          { date: "01/04/2026", amount: "150.00", status: "Upcoming" },
          { date: "01/05/2026", amount: "150.00", status: "Upcoming" }
        ]
      },
      DelegatedSCA: {
        firstPaymentDate: "01/12/2026",
        maxPerPayment: "200.00",
        totalPayments: "2",
        totalValue: "500.00"
      }
    };
    const scheduleEntries = computed(() => EXAMPLE_RULES.DefinedSchedule.entries);
    function getRulesData(type) {
      if (type.includes("OnDemand")) return EXAMPLE_RULES.OnDemand;
      if (type.includes("PeriodicSchedule")) return EXAMPLE_RULES.PeriodicSchedule;
      if (type.includes("DelegatedSCA")) return EXAMPLE_RULES.DelegatedSCA;
      return EXAMPLE_RULES.OnDemand;
    }
    function getPaymentRulesConfig(type, expiry) {
      const fixed = type.includes("Fixed");
      const isOnD = type.includes("OnDemand");
      const isPer = type.includes("PeriodicSchedule");
      const data = getRulesData(type);
      const rows = [];
      rows.push(
        fixed ? { kind: "amount", label: "Amount", amount: data.amount } : { kind: "amount", label: "Max per Payment", amount: data.maxPerPayment }
      );
      if (data.firstPaymentDate) {
        rows.push({ kind: "scalar", label: "First Payment Date", value: data.firstPaymentDate });
      }
      if (isPer && data.frequency) {
        rows.push({ kind: "scalar", label: "Payments repeat every", value: data.frequency });
      }
      rows.push({ kind: "scalar", label: "Expiry Date", value: expiry });
      if (data.totalPayments) rows.push({ kind: "scalar", label: "Total Payments allowed", value: data.totalPayments });
      if (data.totalValue) rows.push({ kind: "amount", label: "Total Value allowed", amount: data.totalValue });
      if (isOnD) {
        if (data.maxPaymentsPerPeriod) rows.push({ kind: "scalar", label: "Max Payments per Week", value: data.maxPaymentsPerPeriod });
        if (data.maxValuePerPeriod) rows.push({ kind: "amount", label: "Max Value per Week", amount: data.maxValuePerPeriod });
      }
      return rows;
    }
    const rulesConfig = computed(() => getPaymentRulesConfig(connectionType.value, expiryDate.value));
    function paymentStatusClass(status) {
      if (status === "Successful") return "cpd-badge-successful";
      if (status === "Failed") return "cpd-badge-failed";
      if (status === "Upcoming") return "cpd-badge-upcoming";
      return "cpd-badge-pending";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cpd-frame" }, _attrs))} data-v-f060f650>`);
      if (isDefined.value) {
        _push(`<div class="cpd-tab-content" data-v-f060f650><div class="cpd-section-title" data-v-f060f650>Payment schedule</div><div class="cpd-rows" data-v-f060f650><!--[-->`);
        ssrRenderList(scheduleEntries.value, (entry, i) => {
          _push(`<div class="${ssrRenderClass([{ "cpd-payment-entry-bordered": i < scheduleEntries.value.length - 1 }, "cpd-payment-entry"])}" data-v-f060f650><div class="cpd-payment-top" data-v-f060f650><span class="cpd-payment-datetime" data-v-f060f650>${ssrInterpolate(entry.date)}</span><div class="${ssrRenderClass([paymentStatusClass(entry.status), "cpd-badge"])}" data-v-f060f650>${ssrInterpolate(entry.status)}</div></div><div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>Amount</span>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: entry.amount,
            class: "cpd-amount"
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!--[--><div class="cpd-tabs" data-v-f060f650><button type="button" class="${ssrRenderClass([{ "cpd-tab-active": activeTab.value === "rules" }, "cpd-tab"])}" data-v-f060f650>Payment rules</button><button type="button" class="${ssrRenderClass([{ "cpd-tab-active": activeTab.value === "history" }, "cpd-tab"])}" data-v-f060f650>Payment history</button></div>`);
        if (activeTab.value === "rules") {
          _push(`<div class="cpd-tab-content" data-v-f060f650>`);
          if (isDelegated.value) {
            _push(`<!--[--><p class="cpd-delegated-text" data-v-f060f650>This consent allows us to request payments of varying amounts.</p><p class="cpd-delegated-text" data-v-f060f650>We will ask you to authenticate and approve each payment before it is initiated.</p><p class="cpd-delegated-text" data-v-f060f650>We cannot take any payment without your authorisation.</p><p class="cpd-delegated-text" data-v-f060f650>No payments will be taken automatically.</p><!--]-->`);
          } else {
            _push(`<div class="cpd-rows" data-v-f060f650><!--[-->`);
            ssrRenderList(rulesConfig.value, (row, i) => {
              _push(`<!--[-->`);
              if (row.kind === "amount") {
                _push(`<div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>${ssrInterpolate(row.label)}</span>`);
                _push(ssrRenderComponent(DirhamAmount, {
                  amount: row.amount,
                  class: "cpd-amount"
                }, null, _parent));
                _push(`</div>`);
              } else {
                _push(`<div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>${ssrInterpolate(row.label)}</span><span class="cpd-value" data-v-f060f650>${ssrInterpolate(row.value)}</span></div>`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="cpd-tab-content" data-v-f060f650><!--[-->`);
          ssrRenderList(unref(paymentHistory), (payment, index) => {
            _push(`<div class="${ssrRenderClass([{ "cpd-payment-entry-bordered": index < unref(paymentHistory).length - 1 }, "cpd-payment-entry"])}" data-v-f060f650><div class="cpd-payment-top" data-v-f060f650><span class="cpd-payment-datetime" data-v-f060f650>${ssrInterpolate(payment.dateTime)}</span><div class="${ssrRenderClass([paymentStatusClass(payment.status), "cpd-badge"])}" data-v-f060f650>${ssrInterpolate(payment.status)}</div></div><div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>Amount</span>`);
            _push(ssrRenderComponent(DirhamAmount, {
              amount: payment.amount.toFixed(2),
              class: "cpd-amount"
            }, null, _parent));
            _push(`</div><div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>Purpose</span><span class="cpd-value" data-v-f060f650>${ssrInterpolate(payment.purpose)}</span></div><div class="cpd-row" data-v-f060f650><span class="cpd-label" data-v-f060f650>Reference</span><span class="cpd-value" data-v-f060f650>${ssrInterpolate(payment.reference)}</span></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(paymentHistory).length === 0) {
            _push(`<div class="cpd-empty" data-v-f060f650> No payment history yet. </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentPaymentPermissions.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ConsentPaymentPermissions = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f060f650"]]);
const CONSENT_ID = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
const _sfc_main$1 = {
  __name: "ConsentManagementDetail",
  __ssrInlineRender: true,
  props: {
    connection: { type: Object, required: true },
    allConnections: { type: Array, default: () => [] },
    perspective: { type: String, default: "tpp" },
    headerColor: { type: String, default: "" }
  },
  emits: ["back", "navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useSharedState();
    const isLfi = computed(() => props.perspective === "lfi");
    const barTitle = computed(() => isLfi.value ? "LFI" : "TPP");
    const entityLabel = computed(() => isLfi.value ? "TPP" : "LFI");
    const truncatedConsentId = `${CONSENT_ID.slice(0, 8)}...${CONSENT_ID.slice(-4)}`;
    const copied = ref(false);
    const EXAMPLE_ACCOUNTS = [
      { name: "Current Account", iban: "AE07 0331 2345 6123 4567 890" },
      { name: "Savings Account", iban: "AE07 0331 2345 6123 4567 891" }
    ];
    function extractDate(value) {
      const match = String(value ?? "").match(/(\d{2}\/\d{2}\/\d{4})/);
      return (match == null ? void 0 : match[1]) ?? "--/--/----";
    }
    function parseExpiryToISO(expiry) {
      const match = String(expiry ?? "").match(/(\d{2})\/(\d{2})\/(\d{4})/);
      if (!match) return "2026-03-31T00:00:00Z";
      const [, dd, mm, yyyy] = match;
      return `${yyyy}-${mm}-${dd}T00:00:00Z`;
    }
    const STATUS_LABELS = {
      "Authorized": "Active",
      "Revoked": "Cancelled",
      "AwaitingAuthorization": "Pending"
    };
    const ACCEPTED_PAYMENT_STATUSES = /* @__PURE__ */ new Set([
      "AcceptedSettlementCompleted",
      "AcceptedCreditSettlementCompleted",
      "AcceptedWithoutPosting"
    ]);
    const isDataSharing = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.type) === "Data Sharing";
    });
    function unmaskIban(masked) {
      if (!masked) return "AE07 0331 2345 6789 0123 456";
      let i = 0;
      const fillers = ["0331", "2345", "6789"];
      return masked.replace(/\*{2}/g, "07").replace(/\*{4}/g, () => fillers[i++] ?? "0000");
    }
    const isMultiPayment = computed(() => {
      var _a, _b;
      return (_b = (_a = props.connection) == null ? void 0 : _a.type) == null ? void 0 : _b.startsWith("Multi Payment");
    });
    const isSinglePayment = computed(() => !isDataSharing.value && !isMultiPayment.value);
    const beneficiaryModel = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.beneficiary) ?? "single";
    });
    const isMultiBeneficiary = computed(() => beneficiaryModel.value === "multiple");
    const isOpenBeneficiary = computed(() => beneficiaryModel.value === "open");
    const EXAMPLE_BENEFICIARIES = [
      { name: "Ivan England", iban: "AE07 0331 2345 6789 0123 456" },
      { name: "Al Noor Trading LLC", iban: "AE32 0260 0012 3456 7890 123" },
      { name: "Emirates Telecommunications Group", iban: "AE98 0350 0000 0987 6543 210" }
    ];
    const benefListOpen = ref(true);
    const toAccountHeader = computed(() => isMultiBeneficiary.value ? "To accounts" : "To account");
    const openBeneficiaryText = computed(() => {
      var _a;
      return isLfi.value ? `No payee was fixed when this permission was given. [${entityLabel.value} ${(_a = props.connection) == null ? void 0 : _a.lfiDigit}] chooses who to pay for each payment, within the payment rules.` : "You did not choose a payee when you gave this permission. We choose who to pay for each payment, within the payment rules.";
    });
    const SIP_EXAMPLE = {
      amount: "500.00",
      reference: "INV-2025-00142",
      purpose: "Agency Commission (ACM)"
    };
    const EXAMPLE_PAYMENT_HISTORY = [
      { dateTime: "15/02/2025 14:22", amount: 200, purpose: "Agency Commission (ACM)", reference: "Test Purchase", status: "Successful" },
      { dateTime: "01/02/2025 09:15", amount: 150, purpose: "Agency Commission (ACM)", reference: "Test Purchase", status: "Successful" },
      { dateTime: "15/01/2025 11:45", amount: 50, purpose: "Agency Commission (ACM)", reference: "Test Purchase", status: "Failed" }
    ];
    const paymentHistoryTotal = EXAMPLE_PAYMENT_HISTORY.filter((p) => p.status === "Successful").reduce((sum, p) => sum + p.amount, 0);
    const formattedPaymentAmount = computed(() => paymentHistoryTotal.toFixed(2));
    provide("paymentHistory", EXAMPLE_PAYMENT_HISTORY);
    const lastDataReceivedDate = computed(() => {
      var _a;
      return extractDate((_a = props.connection) == null ? void 0 : _a.lastDataReceived);
    });
    const firstConnectedDate = computed(() => {
      var _a;
      const dateStr = extractDate((_a = props.connection) == null ? void 0 : _a.lastDataReceived);
      if (dateStr === "--/--/----") return dateStr;
      const [dd, mm, yyyy] = dateStr.split("/");
      return formatDate(`${yyyy}-${mm}-${dd}T00:00:00Z`);
    });
    const DISCONNECT_STATUSES = /* @__PURE__ */ new Set(["AwaitingAuthorization", "Authorized", "Suspended", "Paused"]);
    const showDisconnect = computed(() => {
      var _a;
      return DISCONNECT_STATUSES.has((_a = props.connection) == null ? void 0 : _a.status);
    });
    const showPause = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.status) === "Authorized" && !isSinglePayment.value && !isLfi.value;
    });
    const showReactivate = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.status) === "Paused" && !isLfi.value;
    });
    const disconnectLabel = computed(() => isDataSharing.value ? "Stop Sharing" : "Cancel Permission");
    const showUpdates = ref(false);
    const relatedConsents = computed(() => {
      var _a, _b;
      const myBaseId = (_a = props.connection) == null ? void 0 : _a.baseConsentId;
      if (!myBaseId) return [];
      const myId = (_b = props.connection) == null ? void 0 : _b.id;
      return props.allConnections.filter((c) => {
        if (c.id != null && c.id == myId) return false;
        return c.baseConsentId == myBaseId || c.id == myBaseId;
      });
    });
    const confirmAction = ref(null);
    const confirmTitle = computed(() => {
      if (confirmAction.value === "pause") {
        return isDataSharing.value ? "Pause data sharing" : "Pause payment permission";
      }
      if (confirmAction.value === "reactivate") {
        return isDataSharing.value ? "Resume data sharing" : "Resume payment permission";
      }
      return isDataSharing.value ? "Stop sharing" : "Cancel payment permission";
    });
    const confirmButtonLabel = computed(() => {
      if (confirmAction.value === "pause") return "Confirm pause";
      if (confirmAction.value === "reactivate") return "Confirm reactivation";
      return isDataSharing.value ? "Confirm stop sharing" : "Confirm cancellation";
    });
    const confirmImpactText = computed(() => {
      if (confirmAction.value === "pause") {
        return isDataSharing.value ? "[Placeholder] This text is set by the TPP and should explain to the customer what pausing this data sharing consent will mean for their experience — for example, which features or services will be temporarily unavailable and how they can resume access." : "[Placeholder] This text is set by the TPP and should explain to the customer what pausing this payment permission will mean for their experience — for example, which upcoming payments will be affected and how they can resume the permission.";
      }
      if (confirmAction.value === "reactivate") {
        return isDataSharing.value ? "[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this data sharing consent will mean for their experience — for example, which features or services will become available again and any considerations for data that may have changed during the pause." : "[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this payment permission will mean for their experience — for example, when the next payment will be taken and any upcoming payment dates that apply.";
      }
      return isDataSharing.value ? "[Placeholder] This text is set by the TPP and should explain to the customer what stopping this data sharing consent will mean for their experience — for example, which features or services will stop working and what steps they would need to take to reconnect." : "[Placeholder] This text is set by the TPP and should explain to the customer what cancelling this payment permission will mean for their experience — for example, which scheduled or future payments will not be processed and what they would need to do to set up a new permission.";
    });
    const displayStatus = computed(() => {
      const c = props.connection;
      if ((c == null ? void 0 : c.type) === "Single Instant Payment" && (c == null ? void 0 : c.status) === "Consumed" && (c == null ? void 0 : c.paymentStatus)) {
        if (c.paymentStatus === "Rejected") return "Failed";
        if (ACCEPTED_PAYMENT_STATUSES.has(c.paymentStatus)) return "Successful";
      }
      return STATUS_LABELS[c == null ? void 0 : c.status] ?? (c == null ? void 0 : c.status);
    });
    const statusClass = computed(() => {
      const c = props.connection;
      if ((c == null ? void 0 : c.type) === "Single Instant Payment" && (c == null ? void 0 : c.status) === "Consumed" && (c == null ? void 0 : c.paymentStatus)) {
        if (c.paymentStatus === "Rejected") return "cmd-status-rejected";
        if (ACCEPTED_PAYMENT_STATUSES.has(c.paymentStatus)) return "cmd-status-authorized";
      }
      const s = c == null ? void 0 : c.status;
      if (s === "Authorized") return "cmd-status-authorized";
      if (s === "AwaitingAuthorization") return "cmd-status-awaiting";
      if (s === "Suspended") return "cmd-status-suspended";
      if (s === "Paused") return "cmd-status-paused";
      if (s === "Expired") return "cmd-status-expired";
      if (s === "Rejected" || s === "Revoked") return "cmd-status-rejected";
      if (s === "Consumed") return "cmd-status-consumed";
      return "cmd-status-awaiting";
    });
    const consentState = computed(() => {
      var _a, _b;
      const base = CONSENT_EXAMPLE_STATE[(_a = props.connection) == null ? void 0 : _a.type] ?? CONSENT_EXAMPLE_STATE["Data Sharing"];
      return { ...base, ExpirationDateTime: parseExpiryToISO((_b = props.connection) == null ? void 0 : _b.expiry) };
    });
    provide("detailConsent", consentState);
    provide("detailConnection", computed(() => props.connection));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["cmd-frame", { "cmd-lfi": isLfi.value }],
        style: props.headerColor ? { "--cmi-header-color": props.headerColor } : void 0
      }, _attrs))} data-v-76fefcd0><div class="cmd-screen-name" data-v-76fefcd0><div class="cmd-screen-bar" data-v-76fefcd0></div><button type="button" class="cmd-back-button" aria-label="Back" data-v-76fefcd0><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-76fefcd0><path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg></button><div class="cmd-screen-title" data-v-76fefcd0>${ssrInterpolate(barTitle.value)}</div></div>`);
      if (confirmAction.value === null && !showUpdates.value) {
        _push(`<!--[--><div class="cmd-card-shell" data-v-76fefcd0><div class="cmd-meta-card" data-v-76fefcd0><div class="cmd-meta-header" data-v-76fefcd0><div class="cmd-meta-lfi" data-v-76fefcd0>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(__props.connection.lfiDigit)}]</div><div class="${ssrRenderClass([statusClass.value, "cmd-status"])}" data-v-76fefcd0>${ssrInterpolate(displayStatus.value)}</div></div><div class="cmd-meta-rows" data-v-76fefcd0>`);
        if (isDataSharing.value) {
          _push(`<div class="cmd-meta-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Consent type</span><span class="cmd-meta-row-value" data-v-76fefcd0>Data Sharing</span></div>`);
        } else if (isMultiPayment.value) {
          _push(`<div class="cmd-meta-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Consent type</span><span class="cmd-meta-row-value" data-v-76fefcd0>Flexi Pay</span></div>`);
        } else {
          _push(`<div class="cmd-meta-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Consent type</span><span class="cmd-meta-row-value" data-v-76fefcd0>Single Payment</span></div>`);
        }
        _push(`<button type="button" class="${ssrRenderClass([{ "is-copied": copied.value }, "cmd-meta-row cmd-consent-id"])}"${ssrRenderAttr("aria-label", `Consent ID: ${CONSENT_ID}. Click to copy.`)} data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Consent ID</span><span class="cmd-consent-id-right" data-v-76fefcd0><span class="cmd-consent-id-action" data-v-76fefcd0>${ssrInterpolate(copied.value ? "Copied!" : "Copy")}</span><span class="cmd-consent-id-value" data-v-76fefcd0>${ssrInterpolate(truncatedConsentId)}</span></span></button>`);
        if (isDataSharing.value) {
          _push(`<div class="cmd-meta-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Last data received</span><span class="cmd-meta-row-value" data-v-76fefcd0>${ssrInterpolate(lastDataReceivedDate.value)}</span></div>`);
        } else if (isMultiPayment.value) {
          _push(`<div class="cmd-meta-row cmd-meta-amount-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Total paid to date</span>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: formattedPaymentAmount.value,
            class: "cmd-meta-dirham"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (isDataSharing.value) {
          _push(`<div class="cmd-accounts-card" data-v-76fefcd0><div class="cmd-accounts-header-section" data-v-76fefcd0><div class="cmd-accounts-header-text" data-v-76fefcd0>Accounts</div></div><div class="cmd-accounts-list" data-v-76fefcd0><!--[-->`);
          ssrRenderList(EXAMPLE_ACCOUNTS, (account) => {
            _push(`<div class="cmd-account-card" data-v-76fefcd0><div class="cmd-account-title-text" data-v-76fefcd0>${ssrInterpolate(account.name)}</div><div class="cmd-account-subtext" data-v-76fefcd0>${ssrInterpolate(account.iban)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isSinglePayment.value) {
          _push(`<div class="cmd-accounts-card" data-v-76fefcd0><div class="cmd-accounts-header-section" data-v-76fefcd0><div class="cmd-accounts-header-text" data-v-76fefcd0>Payment details</div></div><div class="cmd-detail-rows" data-v-76fefcd0><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Amount</span>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: SIP_EXAMPLE.amount,
            class: "cmd-sip-amount"
          }, null, _parent));
          _push(`</div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Reference</span><span class="cmd-meta-row-value" data-v-76fefcd0>${ssrInterpolate(SIP_EXAMPLE.reference)}</span></div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Payment purpose</span><span class="cmd-meta-row-value" data-v-76fefcd0>${ssrInterpolate(SIP_EXAMPLE.purpose)}</span></div>`);
          if (__props.connection.status === "Authorized") {
            _push(`<div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Status</span><div class="cmd-sip-badge cmd-sip-badge-authorized" data-v-76fefcd0>Authorized</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isDataSharing.value) {
          _push(`<div class="cmd-accounts-card" data-v-76fefcd0><div class="cmd-accounts-header-section" data-v-76fefcd0><div class="cmd-accounts-header-text" data-v-76fefcd0>From account</div></div><div class="cmd-detail-rows" data-v-76fefcd0><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Bank</span><span class="cmd-meta-row-value" data-v-76fefcd0>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(__props.connection.lfiDigit)}]</span></div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Payer Name</span><span class="cmd-meta-row-value" data-v-76fefcd0>Mohammed Al Rashidi</span></div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>IBAN</span><span class="cmd-meta-row-value cmd-iban-value" data-v-76fefcd0>${ssrInterpolate(unmaskIban(__props.connection.maskedIban))}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isDataSharing.value) {
          _push(`<div class="cmd-accounts-card" data-v-76fefcd0>`);
          if (!isOpenBeneficiary.value) {
            _push(`<div class="cmd-accounts-header-section" data-v-76fefcd0><div class="cmd-accounts-header-text" data-v-76fefcd0>${ssrInterpolate(toAccountHeader.value)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (isOpenBeneficiary.value) {
            _push(`<div class="cmd-detail-rows" data-v-76fefcd0><p class="cmd-open-benef-text" data-v-76fefcd0>${ssrInterpolate(openBeneficiaryText.value)}</p></div>`);
          } else if (isMultiBeneficiary.value) {
            _push(`<div class="cmd-benef-card" data-v-76fefcd0><button type="button" class="cmd-benef-header"${ssrRenderAttr("aria-expanded", benefListOpen.value)} data-v-76fefcd0><span class="cmd-benef-label" data-v-76fefcd0>Beneficiary List</span><svg class="${ssrRenderClass([{ "cmd-benef-arrow-collapsed": !benefListOpen.value }, "cmd-benef-arrow"])}" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-76fefcd0><path d="M1 1L7 6.5L1 12" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg></button>`);
            if (benefListOpen.value) {
              _push(`<div class="cmd-benef-items" data-v-76fefcd0><!--[-->`);
              ssrRenderList(EXAMPLE_BENEFICIARIES, (benef) => {
                _push(`<div class="cmd-benef-item" data-v-76fefcd0><div class="cmd-benef-name" data-v-76fefcd0>${ssrInterpolate(benef.name)}</div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>IBAN</span><span class="cmd-meta-row-value cmd-iban-value" data-v-76fefcd0>${ssrInterpolate(benef.iban)}</span></div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<div class="cmd-detail-rows" data-v-76fefcd0><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>Payee Name</span><span class="cmd-meta-row-value" data-v-76fefcd0>${ssrInterpolate(EXAMPLE_BENEFICIARIES[0].name)}</span></div><div class="cmd-detail-row" data-v-76fefcd0><span class="cmd-meta-row-label" data-v-76fefcd0>IBAN</span><span class="cmd-meta-row-value cmd-iban-value" data-v-76fefcd0>${ssrInterpolate(EXAMPLE_BENEFICIARIES[0].iban)}</span></div></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (isDataSharing.value) {
          _push(ssrRenderComponent(ConsentDataSharingPermissions, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (isDataSharing.value && !isLfi.value && __props.connection.status !== "Rejected") {
          _push(`<div class="cmd-usage-card" data-v-76fefcd0><div class="cmd-usage-header" data-v-76fefcd0><div class="cmd-usage-title" data-v-76fefcd0>${ssrInterpolate(__props.connection.status === "Revoked" ? "You cancelled this connection" : "How we are using your data")}</div><div class="cmd-usage-subtitle" data-v-76fefcd0>[Detail purpose for which data will be used].</div></div><div class="cmd-usage-dates" data-v-76fefcd0><div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 9.13411H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 11.1341H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 9.13411H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 11.1341H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 9.13411H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 11.1341H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>First Connected</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(firstConnectedDate.value)}</div></div><div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 9.13411H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 11.1341H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 9.13411H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 11.1341H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 9.13411H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 11.1341H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>${ssrInterpolate(__props.connection.status === "Expired" ? "Connection Expired" : "Connection Expires")}</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(unref(formatDate)((_a = consentState.value) == null ? void 0 : _a.ExpirationDateTime))}</div></div>`);
          if (__props.connection.baseConsentId) {
            _push(`<div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><rect x="1.33301" y="1.33203" width="13.334" height="13.334" rx="2" stroke="#36BFD4" stroke-width="1.5" data-v-76fefcd0></rect><path d="M10.167 6.16536C9.667 5.33203 8.667 4.66536 7.5 4.83203C6.167 5.0487 5.167 6.16536 5.0003 7.4987C4.8003 9.16536 6.0003 10.6654 7.6003 10.832C8.667 10.9487 9.6003 10.4987 10.167 9.83203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.5 4.5V6.5H8.5" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>Last Updated</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(lastDataReceivedDate.value)}</div><div class="cmd-usage-updates-link" data-v-76fefcd0>List of Updates</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else if (isMultiPayment.value) {
          _push(ssrRenderComponent(ConsentPaymentPermissions, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (isMultiPayment.value && __props.connection.status !== "Rejected") {
          _push(`<div class="cmd-usage-card" data-v-76fefcd0><div class="cmd-usage-dates" data-v-76fefcd0><div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 9.13411H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 11.1341H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 9.13411H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 11.1341H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 9.13411H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 11.1341H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>You started this permission</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(firstConnectedDate.value)}</div></div><div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 9.13411H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.4635 11.1341H10.4694" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 9.13411H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M7.99666 11.1341H8.00265" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 9.13411H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M5.52987 11.1341H5.53585" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>${ssrInterpolate(__props.connection.status === "Expired" ? "Payments expired" : __props.connection.status === "Revoked" ? "You cancelled payments on" : "We will make these payments until")}</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(unref(formatDate)((_b = consentState.value) == null ? void 0 : _b.ExpirationDateTime))}</div></div>`);
          if (__props.connection.baseConsentId) {
            _push(`<div class="cmd-usage-date-block" data-v-76fefcd0><div class="cmd-usage-date-row" data-v-76fefcd0><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-76fefcd0><rect x="1.33301" y="1.33203" width="13.334" height="13.334" rx="2" stroke="#36BFD4" stroke-width="1.5" data-v-76fefcd0></rect><path d="M10.167 6.16536C9.667 5.33203 8.667 4.66536 7.5 4.83203C6.167 5.0487 5.167 6.16536 5.0003 7.4987C4.8003 9.16536 6.0003 10.6654 7.6003 10.832C8.667 10.9487 9.6003 10.4987 10.167 9.83203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path><path d="M10.5 4.5V6.5H8.5" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-76fefcd0></path></svg><span class="cmd-usage-date-label" data-v-76fefcd0>Last Updated</span></div><div class="cmd-usage-date-value" data-v-76fefcd0>${ssrInterpolate(lastDataReceivedDate.value)}</div><div class="cmd-usage-updates-link" data-v-76fefcd0>List of Updates</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (showDisconnect.value || showReactivate.value) {
          _push(`<div class="cmd-footer" data-v-76fefcd0>`);
          if (showReactivate.value) {
            _push(`<button type="button" class="cmd-reactivate-btn" data-v-76fefcd0>Reactivate</button>`);
          } else {
            _push(`<!---->`);
          }
          if (showPause.value) {
            _push(`<button type="button" class="cmd-pause-btn" data-v-76fefcd0>Pause</button>`);
          } else {
            _push(`<!---->`);
          }
          if (showDisconnect.value) {
            _push(`<button type="button" class="cmd-revoke-btn" data-v-76fefcd0>${ssrInterpolate(disconnectLabel.value)}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (showUpdates.value) {
        _push(`<div class="cmd-card-shell" data-v-76fefcd0><div class="cmd-updates-card" data-v-76fefcd0><div class="cmd-updates-inner" data-v-76fefcd0><div class="cmd-updates-title" data-v-76fefcd0>List of Updates</div><div class="cmd-updates-subtitle" data-v-76fefcd0>List of all changes that you made to this connection since first authorization.</div></div></div><div class="cmd-updates-list" data-v-76fefcd0><!--[-->`);
        ssrRenderList(relatedConsents.value, (related, idx) => {
          _push(`<div class="cmd-updates-item" role="button" tabindex="0" data-v-76fefcd0><div class="cmd-updates-item-name" data-v-76fefcd0>${ssrInterpolate(extractDate(related.lastDataReceived))}</div><div class="cmd-updates-item-count" data-v-76fefcd0>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(related.lfiDigit)}]</div><div class="cmd-updates-item-meta cmd-updates-item-meta-row" data-v-76fefcd0><span class="cmd-updates-item-meta-label" data-v-76fefcd0>Consent Type:</span><span class="cmd-updates-item-meta-value" data-v-76fefcd0>${ssrInterpolate(related.type)}</span></div><div class="cmd-updates-item-meta cmd-updates-item-meta-row" data-v-76fefcd0><span class="cmd-updates-item-meta-label" data-v-76fefcd0>Last data received:</span><span class="cmd-updates-item-meta-value" data-v-76fefcd0>${ssrInterpolate(extractDate(related.lastDataReceived))}</span></div><div class="cmd-updates-item-meta cmd-updates-item-meta-row" data-v-76fefcd0><span class="cmd-updates-item-meta-label" data-v-76fefcd0>Connection expires:</span><span class="cmd-updates-item-meta-value" data-v-76fefcd0>${ssrInterpolate(extractDate(related.expiry))}</span></div><svg class="cmd-updates-chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-76fefcd0><path d="M9 18l6-6-6-6" data-v-76fefcd0></path></svg></div>`);
        });
        _push(`<!--]--></div>`);
        if (relatedConsents.value.length === 0) {
          _push(`<div class="cmd-updates-empty" data-v-76fefcd0> No related updates found. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><div class="cmd-confirm-card cmd-confirm-title-card" data-v-76fefcd0><div class="cmd-confirm-title" data-v-76fefcd0>${ssrInterpolate(confirmTitle.value)}</div><div class="cmd-confirm-subtitle" data-v-76fefcd0>Are you sure you want to proceed?</div></div><div class="cmd-confirm-card" data-v-76fefcd0><div class="cmd-confirm-impact-header" data-v-76fefcd0>What this will mean</div><p class="cmd-confirm-impact-text" data-v-76fefcd0>${ssrInterpolate(confirmImpactText.value)}</p></div><div class="cmd-confirm-footer" data-v-76fefcd0><button type="button" class="${ssrRenderClass([confirmAction.value === "pause" ? "cmd-confirm-btn-pause" : confirmAction.value === "reactivate" ? "cmd-confirm-btn-reactivate" : "cmd-confirm-btn-revoke", "cmd-confirm-btn"])}" data-v-76fefcd0>${ssrInterpolate(confirmButtonLabel.value)}</button><button type="button" class="cmd-confirm-back-btn" data-v-76fefcd0>Go back</button></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentManagementDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConsentManagementDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-76fefcd0"]]);
const EMPTY_DATE = "--/--/----";
const _sfc_main = {
  __name: "ConsentManagementConnections",
  __ssrInlineRender: true,
  props: {
    mode: {
      type: String,
      default: "all"
      // 'all' | 'data-sharing' | 'payments'
    },
    perspective: {
      type: String,
      default: "tpp"
      // 'tpp' | 'lfi'
    },
    headerColor: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const { sharedState } = useSharedState();
    const isLfi = computed(() => props.perspective === "lfi");
    const barTitle = computed(() => isLfi.value ? "LFI" : "TPP");
    const entityLabel = computed(() => isLfi.value ? "TPP" : "LFI");
    const filterEntityLabel = computed(() => isLfi.value ? "TPP Name" : "LFI Name");
    const selectedKey = ref(null);
    const activeTab = ref("current");
    const isFilterPanelOpen = ref(false);
    const filters = reactive({
      lfiName: "All",
      consentType: "All",
      consentState: "All"
    });
    const HISTORY_STATUSES = /* @__PURE__ */ new Set([
      "Rejected",
      "Consumed",
      "Expired",
      "Revoked"
    ]);
    const VALID_CONSENT_STATUSES = [
      "AwaitingAuthorization",
      "Authorized",
      "Rejected",
      "Suspended",
      "Paused",
      "Consumed",
      "Expired",
      "Revoked"
    ];
    const VALID_TYPES = [
      "Data Sharing",
      "Single Instant Payment",
      "Multi Payment",
      "Multi Payment (VariableOnDemand)",
      "Multi Payment (FixedOnDemand)",
      "Multi Payment (VariablePeriodicSchedule)",
      "Multi Payment (FixedPeriodicSchedule)",
      "Multi Payment (VariableDefinedSchedule)",
      "Multi Payment (FixedDefinedSchedule)",
      "Multi Payment (DelegatedSCA)"
    ];
    const VALID_PAYMENT_STATUSES = [
      "Pending",
      "AcceptedSettlementCompleted",
      "AcceptedCreditSettlementCompleted",
      "AcceptedWithoutPosting",
      "Rejected"
    ];
    const VALID_BENEFICIARY_MODELS = ["single", "multiple", "open"];
    const MULTI_BENEFICIARY_TYPES = /* @__PURE__ */ new Set([
      "Multi Payment (VariableOnDemand)",
      "Multi Payment (DelegatedSCA)"
    ]);
    const defaultConnections = [
      {
        lfiDigit: 1,
        connectedAccountNumber: 2,
        maskedIban: "AE** **** **** **** 0123 456",
        type: "Data Sharing",
        lastDataReceived: "Last data received 30/09/2024",
        expiry: "Connection expires 30/03/2025",
        status: "Authorized",
        paymentDate: "30/09/2024",
        paymentAmount: 0
      },
      {
        lfiDigit: 2,
        connectedAccountNumber: 1,
        maskedIban: "AE** **** **** **** 9876 543",
        type: "Single Instant Payment",
        lastDataReceived: "Last data received 16/12/2024",
        expiry: "Connection expires 15/12/2025",
        status: "AwaitingAuthorization",
        paymentDate: "16/12/2024",
        paymentAmount: 1
      }
    ];
    function normalizeDate(value, fallback = EMPTY_DATE) {
      if (typeof value !== "string") return fallback;
      const directDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (directDatePattern.test(value)) return value;
      const extractedDate = value.match(/(\d{2}\/\d{2}\/\d{4})/);
      return (extractedDate == null ? void 0 : extractedDate[1]) ?? fallback;
    }
    function normalizeAmount(value, fallback = 0) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) return fallback;
      return numericValue;
    }
    function formatAmount(value) {
      const rounded = Math.round(value * 100) / 100;
      return rounded.toFixed(2);
    }
    function isMultiPaymentType(type) {
      return typeof type === "string" && type.startsWith("Multi Payment");
    }
    function requiresZeroPaymentAmount(status) {
      return status === "AwaitingAuthorization";
    }
    function requiresPositivePaymentAmount(type, status) {
      if (isMultiPaymentType(type)) return true;
      return type === "Single Instant Payment" && status === "Consumed";
    }
    function ensurePositivePaymentAmount(amount) {
      return amount > 0 ? amount : 0.01;
    }
    function normalizeConnection(connection, fallback) {
      const numericLfi = Number(connection == null ? void 0 : connection.lfiDigit);
      const numericConnectedAccountNumber = Number(connection == null ? void 0 : connection.connectedAccountNumber);
      const lfiDigit = Number.isInteger(numericLfi) && numericLfi >= 1 && numericLfi <= 9 ? numericLfi : fallback.lfiDigit;
      const connectedAccountNumber = Number.isInteger(numericConnectedAccountNumber) && numericConnectedAccountNumber >= 1 ? numericConnectedAccountNumber : fallback.connectedAccountNumber;
      const status = VALID_CONSENT_STATUSES.includes(connection == null ? void 0 : connection.status) ? connection.status : fallback.status;
      const type = VALID_TYPES.includes(connection == null ? void 0 : connection.type) ? connection.type : fallback.type;
      const fallbackPaymentDate = normalizeDate((fallback == null ? void 0 : fallback.paymentDate) ?? (fallback == null ? void 0 : fallback.lastDataReceived));
      const paymentDate = normalizeDate(
        (connection == null ? void 0 : connection.paymentDate) ?? (connection == null ? void 0 : connection.payment_date) ?? (connection == null ? void 0 : connection.date) ?? (connection == null ? void 0 : connection.lastDataReceived),
        fallbackPaymentDate
      );
      const paymentAmount = normalizeAmount(
        (connection == null ? void 0 : connection.paymentAmount) ?? (connection == null ? void 0 : connection.payment_amount) ?? (connection == null ? void 0 : connection.amount) ?? (connection == null ? void 0 : connection.totalPaidToDate) ?? (connection == null ? void 0 : connection.total_paid_to_date),
        normalizeAmount(fallback == null ? void 0 : fallback.paymentAmount, 0)
      );
      const normalizedPaymentAmount = requiresZeroPaymentAmount(status) ? 0 : requiresPositivePaymentAmount(type, status) ? ensurePositivePaymentAmount(paymentAmount) : paymentAmount;
      const lastDataReceived = typeof (connection == null ? void 0 : connection.lastDataReceived) === "string" ? connection.lastDataReceived : fallback.lastDataReceived;
      const expiry = typeof (connection == null ? void 0 : connection.expiry) === "string" ? connection.expiry : fallback.expiry;
      const maskedIban = typeof (connection == null ? void 0 : connection.maskedIban) === "string" ? connection.maskedIban : fallback.maskedIban;
      const paymentStatus = VALID_PAYMENT_STATUSES.includes(connection == null ? void 0 : connection.paymentStatus) ? connection.paymentStatus : status === "Consumed" && type === "Single Instant Payment" ? VALID_PAYMENT_STATUSES.includes(fallback == null ? void 0 : fallback.paymentStatus) ? fallback.paymentStatus : void 0 : void 0;
      const beneficiary = MULTI_BENEFICIARY_TYPES.has(type) ? VALID_BENEFICIARY_MODELS.includes(connection == null ? void 0 : connection.beneficiary) ? connection.beneficiary : "single" : "single";
      const id = (connection == null ? void 0 : connection.id) ?? (fallback == null ? void 0 : fallback.id) ?? void 0;
      const baseConsentId = (connection == null ? void 0 : connection.baseConsentId) ?? (fallback == null ? void 0 : fallback.baseConsentId) ?? void 0;
      return {
        id,
        lfiDigit,
        connectedAccountNumber,
        status,
        type,
        lastDataReceived,
        expiry,
        paymentDate,
        paymentAmount: normalizedPaymentAmount,
        maskedIban,
        paymentStatus,
        beneficiary,
        baseConsentId
      };
    }
    const connectionSubtitle = computed(() => {
      if (isLfi.value) {
        if (props.mode === "data-sharing") return "These are the third party providers connected to your accounts for data sharing";
        if (props.mode === "payments") return "These are the payment permissions you have given to third party providers";
        return "These are the third party providers connected to your accounts for data sharing and payments";
      }
      if (props.mode === "data-sharing") return "These are the account providers we are connected to for data sharing";
      if (props.mode === "payments") return "These are the payment permissions you have given to us";
      return "These are the account providers we are connected to for data sharing and payments";
    });
    const tooltipText = computed(() => {
      if (isLfi.value) {
        if (props.mode === "data-sharing") return {
          p1: "This page gives you an overview of the data-sharing permissions you have given to third party providers.",
          p2: "They will continue to access data on your behalf until the permission ends or you cancel."
        };
        if (props.mode === "payments") return {
          p1: "This page gives you an overview of the payment permissions you have given to third party providers.",
          p2: "They will continue to make payments on your behalf, where applicable, until the permission ends or you cancel."
        };
        return {
          p1: "This page gives you an overview of all the data-sharing and payment permissions you have given to third party providers.",
          p2: "They will continue to access data and make payments on your behalf, where applicable, until the permission ends or you cancel."
        };
      }
      if (props.mode === "data-sharing") return {
        p1: "This page gives you an overview of the data-sharing permissions you have given to us.",
        p2: "We will continue to share data on your behalf until the permission ends or you cancel."
      };
      if (props.mode === "payments") return {
        p1: "This page gives you an overview of the payment permissions you have given to us.",
        p2: "We will continue to make payments on your behalf, where applicable, until the permission ends or you cancel."
      };
      return {
        p1: "This page gives you an overview of all the data-sharing and payment permissions you have given to us.",
        p2: "We will continue to share data and make payments on your behalf, where applicable, until the permission ends or you cancel."
      };
    });
    const resolvedConnections = computed(() => {
      var _a;
      const configuredConnections = (_a = sharedState.value) == null ? void 0 : _a.consentConnections;
      const normalized = !Array.isArray(configuredConnections) || configuredConnections.length === 0 ? defaultConnections : configuredConnections.map(
        (connection, index) => normalizeConnection(connection, defaultConnections[index % defaultConnections.length])
      );
      if (props.mode === "data-sharing") {
        return normalized.filter((c) => c.type === "Data Sharing");
      }
      if (props.mode === "payments") {
        return normalized.filter((c) => c.type !== "Data Sharing");
      }
      return normalized;
    });
    const selectedConnection = computed(() => {
      const key = selectedKey.value;
      if (!key) return null;
      if (key.id != null) return resolvedConnections.value.find((c) => c.id === key.id) ?? null;
      return resolvedConnections.value[key.index] ?? null;
    });
    function selectConnection(connection) {
      if (!connection) {
        selectedKey.value = null;
        return;
      }
      if (connection.id != null) {
        selectedKey.value = { id: connection.id };
        return;
      }
      const index = resolvedConnections.value.indexOf(connection);
      selectedKey.value = index >= 0 ? { index } : null;
    }
    const currentConnections = computed(
      () => resolvedConnections.value.filter((connection) => !HISTORY_STATUSES.has(connection.status))
    );
    const historyConnections = computed(
      () => resolvedConnections.value.filter((connection) => HISTORY_STATUSES.has(connection.status))
    );
    const displayedConnections = computed(
      () => (activeTab.value === "history" ? historyConnections.value : currentConnections.value).filter((connection) => {
        if (filters.lfiName !== "All" && `${entityLabel.value} ${connection.lfiDigit}` !== filters.lfiName) return false;
        if (filters.consentType !== "All" && connection.type !== filters.consentType) return false;
        if (filters.consentState !== "All" && connection.status !== filters.consentState) return false;
        return true;
      })
    );
    const appliedFilters = computed(() => {
      const entries = [
        { key: "lfiName", value: filters.lfiName },
        { key: "consentType", value: filters.consentType },
        { key: "consentState", value: filters.consentState }
      ];
      return entries.filter((entry) => entry.value !== "All").map((entry) => ({
        key: entry.key,
        value: String(entry.value)
      }));
    });
    const lfiOptions = computed(() => {
      const prefix = entityLabel.value;
      const values = Array.from(new Set(resolvedConnections.value.map((connection) => `${prefix} ${connection.lfiDigit}`))).sort((a, b) => Number(a.replace(`${prefix} `, "")) - Number(b.replace(`${prefix} `, "")));
      return ["All", ...values];
    });
    const consentTypeOptions = computed(() => {
      const values = Array.from(new Set(resolvedConnections.value.map((connection) => connection.type)));
      return ["All", ...values];
    });
    const consentStateOptions = computed(() => {
      const values = Array.from(new Set(resolvedConnections.value.map((connection) => connection.status)));
      return ["All", ...values];
    });
    function accountCountLabel(count) {
      return count === 1 ? "1 Account Connected" : `${count} Accounts Connected`;
    }
    function isPaymentType(type) {
      if (type === "Single Instant Payment") return true;
      return isMultiPaymentType(type);
    }
    function connectionCountLabel(connection) {
      if (isPaymentType(connection.type)) {
        if (connection.status === "AwaitingAuthorization") return null;
        if (connection.maskedIban) return connection.maskedIban;
        return null;
      }
      return accountCountLabel(connection.connectedAccountNumber);
    }
    function connectionMetaLines(connection) {
      if (connection.type === "Single Instant Payment") {
        const lines = [
          { type: "labelValue", label: "Consent Type", value: "Single Payment" },
          { type: "labelValue", label: "Payment Date", value: normalizeDate(connection.paymentDate) },
          { type: "amount", label: "Payment Amount", amount: connection.paymentAmount }
        ];
        return lines;
      }
      if (isMultiPaymentType(connection.type)) {
        return [
          { type: "labelValue", label: "Consent Type", value: "Flexi Pay" },
          { type: "amount", label: "Total paid to date", amount: 350 },
          { type: "labelValue", label: "Connection expires", value: normalizeDate(connection.expiry) }
        ];
      }
      return [
        { type: "labelValue", label: "Consent Type", value: connection.type },
        { type: "labelValue", label: "Last data received", value: normalizeDate(connection.lastDataReceived) },
        { type: "labelValue", label: "Connection expires", value: normalizeDate(connection.expiry) }
      ];
    }
    const ACCEPTED_PAYMENT_STATUSES = /* @__PURE__ */ new Set([
      "AcceptedSettlementCompleted",
      "AcceptedCreditSettlementCompleted",
      "AcceptedWithoutPosting"
    ]);
    function statusClass(status) {
      if (status === "Authorized") return "consent-management-status-authorized";
      if (status === "AwaitingAuthorization") return "consent-management-status-awaiting";
      if (status === "Suspended") return "consent-management-status-suspended";
      if (status === "Paused") return "consent-management-status-paused";
      if (status === "Consumed") return "consent-management-status-consumed";
      if (status === "Expired") return "consent-management-status-expired";
      if (status === "Rejected" || status === "Revoked") return "consent-management-status-rejected";
      return "consent-management-status-awaiting";
    }
    const STATUS_LABELS = {
      "Authorized": "Active",
      "Revoked": "Cancelled",
      "AwaitingAuthorization": "Pending"
    };
    function displayStatus(connection) {
      if (connection.type === "Single Instant Payment" && connection.status === "Consumed" && connection.paymentStatus) {
        if (connection.paymentStatus === "Rejected") return "Failed";
        if (ACCEPTED_PAYMENT_STATUSES.has(connection.paymentStatus)) return "Successful";
      }
      return STATUS_LABELS[connection.status] ?? connection.status;
    }
    function displayStatusClass(connection) {
      if (connection.type === "Single Instant Payment" && connection.status === "Consumed" && connection.paymentStatus) {
        if (connection.paymentStatus === "Rejected") return "consent-management-status-rejected";
        if (ACCEPTED_PAYMENT_STATUSES.has(connection.paymentStatus)) return "consent-management-status-authorized";
      }
      return statusClass(connection.status);
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (selectedConnection.value) {
        _push(ssrRenderComponent(ConsentManagementDetail, mergeProps({
          connection: selectedConnection.value,
          "all-connections": resolvedConnections.value,
          perspective: __props.perspective,
          "header-color": __props.headerColor,
          onBack: ($event) => selectConnection(null),
          onNavigate: ($event) => selectConnection($event)
        }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["consent-management-frame", { "consent-management-lfi": isLfi.value }],
          style: __props.headerColor ? { "--cmi-header-color": __props.headerColor } : void 0
        }, _attrs))} data-v-5e7d9c74><div class="consent-management-screen-name" data-v-5e7d9c74><div class="consent-management-screen-bar" data-v-5e7d9c74></div><svg class="consent-management-arrow-left" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-5e7d9c74><path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5e7d9c74></path></svg><div class="consent-management-screen-title" data-v-5e7d9c74>${ssrInterpolate(barTitle.value)}</div></div><div class="consent-management-card-shell" data-v-5e7d9c74><div class="consent-management-card" data-v-5e7d9c74><div class="consent-management-header" data-v-5e7d9c74><div class="consent-management-main-title" data-v-5e7d9c74>AlTareq Connections</div><div class="consent-management-subtitle" data-v-5e7d9c74>${ssrInterpolate(connectionSubtitle.value)}</div></div><div class="consent-management-manage-hint" data-v-5e7d9c74><span data-v-5e7d9c74>Tap Manage to view, update or disconnect</span><div class="consent-management-info-trigger" data-v-5e7d9c74><button type="button" class="consent-management-info-button" aria-describedby="consent-management-info-tooltip" data-v-5e7d9c74><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-5e7d9c74><circle cx="8" cy="8" r="6.75" stroke="#0C1441" stroke-width="1.25" data-v-5e7d9c74></circle><path d="M8 4.5V4.7" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" data-v-5e7d9c74></path><path d="M8 7V11" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" data-v-5e7d9c74></path></svg></button><div id="consent-management-info-tooltip" class="consent-management-info-message" role="tooltip" data-v-5e7d9c74><p data-v-5e7d9c74>${ssrInterpolate(tooltipText.value.p1)}</p><p data-v-5e7d9c74>${ssrInterpolate(tooltipText.value.p2)}</p></div></div></div><div class="consent-management-controls" data-v-5e7d9c74><div class="consent-management-filter" data-v-5e7d9c74><div class="consent-management-filter-row" data-v-5e7d9c74><button type="button" class="consent-management-filter-toggle"${ssrRenderAttr("aria-expanded", isFilterPanelOpen.value)} data-v-5e7d9c74><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-5e7d9c74><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="#36BFD4" fill-opacity="0.12" stroke="#36BFD4" data-v-5e7d9c74></rect><path d="M7.5 8H16.5L12.5 12V16L11 15.25V12L7.5 8Z" fill="#36BFD4" data-v-5e7d9c74></path></svg><span data-v-5e7d9c74>Filter</span></button></div>`);
        if (isFilterPanelOpen.value) {
          _push(`<div class="consent-management-filter-fields" data-v-5e7d9c74><label class="consent-management-filter-field" data-v-5e7d9c74><span class="consent-management-filter-field-label" data-v-5e7d9c74>${ssrInterpolate(filterEntityLabel.value)}</span><select class="consent-management-filter-select" data-v-5e7d9c74><!--[-->`);
          ssrRenderList(lfiOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-5e7d9c74${ssrIncludeBooleanAttr(Array.isArray(filters.lfiName) ? ssrLooseContain(filters.lfiName, option) : ssrLooseEqual(filters.lfiName, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label><label class="consent-management-filter-field" data-v-5e7d9c74><span class="consent-management-filter-field-label" data-v-5e7d9c74>Consent Type</span><select class="consent-management-filter-select" data-v-5e7d9c74><!--[-->`);
          ssrRenderList(consentTypeOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-5e7d9c74${ssrIncludeBooleanAttr(Array.isArray(filters.consentType) ? ssrLooseContain(filters.consentType, option) : ssrLooseEqual(filters.consentType, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label><label class="consent-management-filter-field" data-v-5e7d9c74><span class="consent-management-filter-field-label" data-v-5e7d9c74>Consent State</span><select class="consent-management-filter-select" data-v-5e7d9c74><!--[-->`);
          ssrRenderList(consentStateOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-5e7d9c74${ssrIncludeBooleanAttr(Array.isArray(filters.consentState) ? ssrLooseContain(filters.consentState, option) : ssrLooseEqual(filters.consentState, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label></div>`);
        } else {
          _push(`<!---->`);
        }
        if (appliedFilters.value.length > 0) {
          _push(`<div class="consent-management-applied-filters" data-v-5e7d9c74><div class="consent-management-chips" data-v-5e7d9c74><div class="consent-management-chips-row" data-v-5e7d9c74><!--[-->`);
          ssrRenderList(appliedFilters.value, (filter) => {
            _push(`<button type="button" class="consent-management-chip" data-v-5e7d9c74><span class="consent-management-chip-text" data-v-5e7d9c74>${ssrInterpolate(filter.value)}</span><svg class="consent-management-chip-remove" width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-5e7d9c74><path d="M1 1L5 5" data-v-5e7d9c74></path><path d="M5 1L1 5" data-v-5e7d9c74></path></svg></button>`);
          });
          _push(`<!--]--><button type="button" class="consent-management-chip consent-management-chip-clear" data-v-5e7d9c74><span class="consent-management-chip-text" data-v-5e7d9c74>Clear</span></button></div><div class="consent-management-results" data-v-5e7d9c74>Results: ${ssrInterpolate(displayedConnections.value.length)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="consent-management-divider" data-v-5e7d9c74></div><div class="consent-management-tabs" data-v-5e7d9c74><button type="button" class="${ssrRenderClass([{ "consent-management-tab-active": activeTab.value === "current" }, "consent-management-tab"])}" data-v-5e7d9c74> Current </button><button type="button" class="${ssrRenderClass([{ "consent-management-tab-active": activeTab.value === "history" }, "consent-management-tab"])}" data-v-5e7d9c74> History </button></div><div class="consent-management-connection-list" data-v-5e7d9c74><!--[-->`);
        ssrRenderList(displayedConnections.value, (connection, index) => {
          _push(`<div class="consent-management-connection" role="button" tabindex="0" data-v-5e7d9c74><div class="consent-management-connection-header" data-v-5e7d9c74><div class="consent-management-connection-name" data-v-5e7d9c74>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(connection.lfiDigit)}]</div><div class="${ssrRenderClass([displayStatusClass(connection), "consent-management-status"])}" data-v-5e7d9c74>${ssrInterpolate(displayStatus(connection))}</div></div>`);
          if (connectionCountLabel(connection)) {
            _push(`<div class="consent-management-connection-count" data-v-5e7d9c74>${ssrInterpolate(connectionCountLabel(connection))}</div>`);
          } else {
            _push(`<div class="consent-management-connection-gap" data-v-5e7d9c74></div>`);
          }
          _push(`<!--[-->`);
          ssrRenderList(connectionMetaLines(connection), (line, lineIndex) => {
            _push(`<div class="${ssrRenderClass([
              "consent-management-connection-meta",
              { "consent-management-connection-meta-row": line.type !== "text" }
            ])}" data-v-5e7d9c74>`);
            if (line.type === "amount") {
              _push(`<!--[--><span class="consent-management-connection-meta-label" data-v-5e7d9c74>${ssrInterpolate(line.label)}</span>`);
              _push(ssrRenderComponent(DirhamAmount, {
                amount: formatAmount(line.amount)
              }, null, _parent));
              _push(`<!--]-->`);
            } else if (line.type === "labelValue") {
              _push(`<!--[--><span class="consent-management-connection-meta-label" data-v-5e7d9c74>${ssrInterpolate(line.label)}:</span><span class="consent-management-connection-meta-value" data-v-5e7d9c74>${ssrInterpolate(line.value)}</span><!--]-->`);
            } else {
              _push(`<!--[-->${ssrInterpolate(line.text)}<!--]-->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--><svg class="consent-management-chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5e7d9c74><path d="M9 18l6-6-6-6" data-v-5e7d9c74></path></svg></div>`);
        });
        _push(`<!--]-->`);
        if (displayedConnections.value.length === 0) {
          _push(`<div class="consent-management-empty-state" data-v-5e7d9c74>`);
          if (isLfi.value) {
            _push(`<!--[--> No connections yet <br data-v-5e7d9c74> <br data-v-5e7d9c74> You do not have any AlTareq connections in this tab. <!--]-->`);
          } else {
            _push(`<!--[--> No connections yet <br data-v-5e7d9c74> <br data-v-5e7d9c74> You don’t have any consents in this tab. <br data-v-5e7d9c74> <br data-v-5e7d9c74> Connect an account to get started. <!--]-->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        if (!isLfi.value) {
          _push(`<div class="consent-management-footer" data-v-5e7d9c74><button type="button" class="consent-management-cta" data-v-5e7d9c74>Connect another account</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentManagementConnections.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e7d9c74"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_3 as a
};
