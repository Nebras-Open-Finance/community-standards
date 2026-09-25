import { _ as __unplugin_components_0$1 } from "./FormInput-BzoE1TtY.js";
import { defineComponent, reactive, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OnboardingOrganisationForm",
  __ssrInlineRender: true,
  setup(__props) {
    const FIELDS = ["name", "legalName", "registrationNumber", "registeredName", "address", "city"];
    const form = reactive({
      name: "",
      legalName: "",
      registrationNumber: "",
      registeredName: "",
      address: "",
      city: ""
    });
    const submitted = ref(false);
    function setField(field, value) {
      form[field] = value ?? "";
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
        e[f] = "";
      }
      return e;
    });
    computed(() => FIELDS.some((f) => !!errors.value[f]));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInput = __unplugin_components_0$1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "oof" }, _attrs))} data-v-3e265665><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Organisation name",
        name: "org_name",
        input: form.name,
        error: !!errors.value.name,
        onOutput: (v) => setField("name", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.name)}</p></div><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Organisation legal name",
        name: "org_legal_name",
        input: form.legalName,
        error: !!errors.value.legalName,
        onOutput: (v) => setField("legalName", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.legalName)}</p></div><div class="oof__row oof__row--two" data-v-3e265665><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Organisation registration number",
        name: "org_reg_number",
        input: form.registrationNumber,
        error: !!errors.value.registrationNumber,
        onOutput: (v) => setField("registrationNumber", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.registrationNumber)}</p></div><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Organisation registered name",
        name: "org_reg_name",
        input: form.registeredName,
        error: !!errors.value.registeredName,
        onOutput: (v) => setField("registeredName", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.registeredName)}</p></div></div><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Address line 1",
        name: "org_address",
        input: form.address,
        error: !!errors.value.address,
        onOutput: (v) => setField("address", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.address)}</p></div><div class="oof__row oof__row--two" data-v-3e265665><div class="oof__field" data-v-3e265665>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "City",
        name: "org_city",
        input: form.city,
        error: !!errors.value.city,
        onOutput: (v) => setField("city", v.data)
      }, null, _parent));
      _push(`<p class="oof__error" aria-live="polite" data-v-3e265665>${ssrInterpolate(errors.value.city)}</p></div><div class="oof__field" data-v-3e265665><div class="oof-locked" data-v-3e265665><span class="oof-locked__value" data-v-3e265665>UAE</span><span class="oof-locked__label" data-v-3e265665>Country</span><svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-3e265665><rect x="5" y="11" width="14" height="9" rx="1" data-v-3e265665></rect><path d="M8 11V8a4 4 0 0 1 8 0v3" data-v-3e265665></path></svg></div></div></div><div class="oof__row oof__row--two" data-v-3e265665><div class="oof__field" data-v-3e265665><div class="oof-locked" data-v-3e265665><span class="oof-locked__value" data-v-3e265665>TPP</span><span class="oof-locked__label" data-v-3e265665>Organisation type</span><svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-3e265665><rect x="5" y="11" width="14" height="9" rx="1" data-v-3e265665></rect><path d="M8 11V8a4 4 0 0 1 8 0v3" data-v-3e265665></path></svg></div></div><div class="oof__field" data-v-3e265665><div class="oof-locked" data-v-3e265665><span class="oof-locked__value" data-v-3e265665>TPP</span><span class="oof-locked__label" data-v-3e265665>Organisation category</span><svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-3e265665><rect x="5" y="11" width="14" height="9" rx="1" data-v-3e265665></rect><path d="M8 11V8a4 4 0 0 1 8 0v3" data-v-3e265665></path></svg></div></div></div><div class="oof__row oof__row--two" data-v-3e265665><div class="oof__field" data-v-3e265665><div class="oof-locked" data-v-3e265665><span class="oof-locked__value" data-v-3e265665>Sandbox</span><span class="oof-locked__label" data-v-3e265665>Environment</span><svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-3e265665><rect x="5" y="11" width="14" height="9" rx="1" data-v-3e265665></rect><path d="M8 11V8a4 4 0 0 1 8 0v3" data-v-3e265665></path></svg></div></div><div class="oof__field" data-v-3e265665></div></div><div class="oof__actions" data-v-3e265665><button type="submit" class="oof-cta" data-v-3e265665><svg class="oof-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-3e265665><polyline points="6 9 6 2 18 2 18 9" data-v-3e265665></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" data-v-3e265665></path><rect x="6" y="14" width="12" height="8" data-v-3e265665></rect></svg> Print / Save as PDF </button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/OnboardingOrganisationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e265665"]]);
export {
  __unplugin_components_0 as _
};
