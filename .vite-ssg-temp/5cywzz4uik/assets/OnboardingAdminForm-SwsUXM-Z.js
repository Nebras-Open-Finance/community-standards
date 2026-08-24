import { defineComponent, useId, ref, computed, watch, mergeProps, unref, useSSRContext, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_0$1 } from "./FormInput-BzoE1TtY.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FormInputPhoneNumber",
  __ssrInlineRender: true,
  props: {
    input: { default: () => ({ country_code: "AE", phone_number: "" }) },
    countryCode: { default: "AE" },
    error: { type: Boolean, default: false },
    placeholder: { default: "Enter your mobile number" }
  },
  emits: ["output"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const props = __props;
    const emit = __emit;
    const COUNTRIES = [
      { iso: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪" },
      { iso: "SA", name: "Saudi Arabia", dial: "966", flag: "🇸🇦" },
      { iso: "BH", name: "Bahrain", dial: "973", flag: "🇧🇭" },
      { iso: "KW", name: "Kuwait", dial: "965", flag: "🇰🇼" },
      { iso: "OM", name: "Oman", dial: "968", flag: "🇴🇲" },
      { iso: "QA", name: "Qatar", dial: "974", flag: "🇶🇦" },
      { iso: "EG", name: "Egypt", dial: "20", flag: "🇪🇬" },
      { iso: "JO", name: "Jordan", dial: "962", flag: "🇯🇴" },
      { iso: "LB", name: "Lebanon", dial: "961", flag: "🇱🇧" },
      { iso: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧" },
      { iso: "US", name: "United States", dial: "1", flag: "🇺🇸" },
      { iso: "CA", name: "Canada", dial: "1", flag: "🇨🇦" },
      { iso: "DE", name: "Germany", dial: "49", flag: "🇩🇪" },
      { iso: "FR", name: "France", dial: "33", flag: "🇫🇷" },
      { iso: "NL", name: "Netherlands", dial: "31", flag: "🇳🇱" },
      { iso: "IE", name: "Ireland", dial: "353", flag: "🇮🇪" },
      { iso: "IT", name: "Italy", dial: "39", flag: "🇮🇹" },
      { iso: "ES", name: "Spain", dial: "34", flag: "🇪🇸" },
      { iso: "SE", name: "Sweden", dial: "46", flag: "🇸🇪" },
      { iso: "CH", name: "Switzerland", dial: "41", flag: "🇨🇭" },
      { iso: "IN", name: "India", dial: "91", flag: "🇮🇳" },
      { iso: "PK", name: "Pakistan", dial: "92", flag: "🇵🇰" },
      { iso: "BD", name: "Bangladesh", dial: "880", flag: "🇧🇩" },
      { iso: "PH", name: "Philippines", dial: "63", flag: "🇵🇭" },
      { iso: "LK", name: "Sri Lanka", dial: "94", flag: "🇱🇰" },
      { iso: "NP", name: "Nepal", dial: "977", flag: "🇳🇵" },
      { iso: "SG", name: "Singapore", dial: "65", flag: "🇸🇬" },
      { iso: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾" },
      { iso: "AU", name: "Australia", dial: "61", flag: "🇦🇺" },
      { iso: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿" },
      { iso: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦" },
      { iso: "TR", name: "Türkiye", dial: "90", flag: "🇹🇷" }
    ];
    function findByIso(iso) {
      return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
    }
    const inputId = useId();
    const selectedIso = ref(((_a = props.input) == null ? void 0 : _a.country_code) || props.countryCode || "AE");
    const phoneNumber = ref(((_b = props.input) == null ? void 0 : _b.phone_number) ?? "");
    const selectedCountry = computed(() => findByIso(selectedIso.value));
    const isFocused = ref(false);
    watch(() => props.input, (v) => {
      if ((v == null ? void 0 : v.country_code) && v.country_code !== selectedIso.value) selectedIso.value = v.country_code;
      phoneNumber.value = (v == null ? void 0 : v.phone_number) ?? "";
    });
    function emitOutput() {
      emit("output", {
        data: phoneNumber.value || void 0,
        meta: { countryCallingCode: selectedCountry.value.dial, iso: selectedCountry.value.iso }
      });
    }
    watch(phoneNumber, emitOutput);
    watch(selectedIso, emitOutput);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["fip", {
          "fip--has-value": !!phoneNumber.value,
          "fip--focused": isFocused.value,
          "fip--error": __props.error
        }]
      }, _attrs))} data-v-31761a37><div class="fip__shell" data-v-31761a37><select class="fip__country"${ssrRenderAttr("aria-label", "Country dialling code")} data-v-31761a37><!--[-->`);
      ssrRenderList(COUNTRIES, (c) => {
        _push(`<option${ssrRenderAttr("value", c.iso)} data-v-31761a37${ssrIncludeBooleanAttr(Array.isArray(selectedIso.value) ? ssrLooseContain(selectedIso.value, c.iso) : ssrLooseEqual(selectedIso.value, c.iso)) ? " selected" : ""}>${ssrInterpolate(c.flag)} ${ssrInterpolate(c.name)} (+${ssrInterpolate(c.dial)}) </option>`);
      });
      _push(`<!--]--></select><span class="fip__divider" aria-hidden="true" data-v-31761a37></span><span class="fip__dial" data-v-31761a37>+${ssrInterpolate(selectedCountry.value.dial)}</span><input${ssrRenderAttr("id", unref(inputId))}${ssrRenderAttr("value", phoneNumber.value)} type="tel" inputmode="tel" autocomplete="tel-national" class="fip__number" data-v-31761a37><label${ssrRenderAttr("for", unref(inputId))} class="fip__label" data-v-31761a37>${ssrInterpolate(__props.placeholder)}</label></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/FormInputPhoneNumber.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-31761a37"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OnboardingAdminForm",
  __ssrInlineRender: true,
  setup(__props) {
    const EMIRATES_ID_REGEX = /^784-\d{4}-\d{7}-\d$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const FIELDS = ["firstName", "lastName", "emiratesId", "email", "mobile"];
    const form = reactive({
      firstName: "",
      lastName: "",
      emiratesId: "",
      email: "",
      mobile: "",
      mobileDialCode: "+971"
    });
    const submitted = ref(false);
    function setField(field, value) {
      form[field] = value ?? "";
    }
    function onMobileOutput(payload) {
      var _a;
      setField("mobile", payload.data);
      const cc = (_a = payload.meta) == null ? void 0 : _a["countryCallingCode"];
      if (typeof cc === "string") form.mobileDialCode = "+" + cc;
    }
    const errors = computed(() => {
      const e = {};
      for (const f of FIELDS) {
        const v = String(form[f] ?? "").trim();
        if (!submitted.value) {
          e[f] = "";
          continue;
        }
        if (!v) {
          e[f] = "Field is required.";
          continue;
        }
        if (f === "emiratesId" && !EMIRATES_ID_REGEX.test(v)) {
          e[f] = "Must match format: 784-YYYY-XXXXXXX-C (e.g. 784-1990-1234567-1)";
          continue;
        }
        if (f === "email" && !EMAIL_REGEX.test(v)) {
          e[f] = "Must be a valid email address.";
          continue;
        }
        e[f] = "";
      }
      return e;
    });
    computed(() => FIELDS.some((f) => !!errors.value[f]));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInput = __unplugin_components_0$1;
      const _component_FormInputPhoneNumber = __unplugin_components_1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "oaf" }, _attrs))} data-v-cb2e7fe9><div class="oaf__row oaf__row--two" data-v-cb2e7fe9><div class="oaf__field" data-v-cb2e7fe9>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "First name",
        name: "admin_first_name",
        input: form.firstName,
        error: !!errors.value.firstName,
        onOutput: (v) => setField("firstName", v.data)
      }, null, _parent));
      _push(`<p class="oaf__error" aria-live="polite" data-v-cb2e7fe9>${ssrInterpolate(errors.value.firstName)}</p></div><div class="oaf__field" data-v-cb2e7fe9>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Last name",
        name: "admin_last_name",
        input: form.lastName,
        error: !!errors.value.lastName,
        onOutput: (v) => setField("lastName", v.data)
      }, null, _parent));
      _push(`<p class="oaf__error" aria-live="polite" data-v-cb2e7fe9>${ssrInterpolate(errors.value.lastName)}</p></div></div><div class="oaf__field" data-v-cb2e7fe9>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Emirates ID (e.g. 784-1990-1234567-1)",
        name: "admin_emirates_id",
        input: form.emiratesId,
        error: !!errors.value.emiratesId,
        onOutput: (v) => setField("emiratesId", v.data)
      }, null, _parent));
      _push(`<p class="oaf__error" aria-live="polite" data-v-cb2e7fe9>${ssrInterpolate(errors.value.emiratesId)}</p></div><div class="oaf__field" data-v-cb2e7fe9>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Work email address",
        name: "admin_email",
        type: "email",
        input: form.email,
        error: !!errors.value.email,
        onOutput: (v) => setField("email", v.data)
      }, null, _parent));
      _push(`<p class="oaf__error" aria-live="polite" data-v-cb2e7fe9>${ssrInterpolate(errors.value.email)}</p></div><div class="oaf__field" data-v-cb2e7fe9>`);
      _push(ssrRenderComponent(_component_FormInputPhoneNumber, {
        placeholder: "Mobile number",
        "country-code": "AE",
        input: { country_code: "AE", phone_number: form.mobile },
        error: !!errors.value.mobile,
        onOutput: onMobileOutput
      }, null, _parent));
      _push(`<p class="oaf__error" aria-live="polite" data-v-cb2e7fe9>${ssrInterpolate(errors.value.mobile)}</p></div><div class="oaf__actions" data-v-cb2e7fe9><button type="submit" class="oaf-cta" data-v-cb2e7fe9><svg class="oaf-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-cb2e7fe9><polyline points="6 9 6 2 18 2 18 9" data-v-cb2e7fe9></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" data-v-cb2e7fe9></path><rect x="6" y="14" width="12" height="8" data-v-cb2e7fe9></rect></svg> Print / Save as PDF </button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/OnboardingAdminForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb2e7fe9"]]);
export {
  __unplugin_components_0 as _
};
