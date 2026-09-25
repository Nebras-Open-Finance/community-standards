import { defineComponent, ref, computed, watch, watchEffect, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import YAML from "yaml";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditableJson",
  __ssrInlineRender: true,
  props: {
    spec: {},
    schemaName: { default: "AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties" },
    initialData: { default: () => ({}) },
    excludedFields: { default: () => [] },
    customValidator: { type: Function, default: () => null },
    stateField: { default: "value" },
    label: { default: "Editable JSON" },
    description: { default: "" },
    endpointHref: { default: "" },
    endpointLabel: { default: "View endpoint" },
    scenarios: { default: () => [] },
    scenariosLabel: { default: "Scenarios" }
  },
  emits: ["update:json"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { updateField } = useSharedState();
    const spec = ref(null);
    const rootSchema = ref(null);
    const form = ref({});
    const jsonInput = ref("");
    const toastMessage = ref("");
    const toastShowing = ref(false);
    let toastTimer = null;
    function addError(msg) {
      toastMessage.value = msg;
      toastShowing.value = true;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastShowing.value = false;
      }, 2400);
    }
    const copied = ref(false);
    const lineCount = computed(() => jsonInput.value.split("\n").length);
    const charCount = computed(() => jsonInput.value.length);
    function resolveSchema(schema) {
      var _a, _b, _c;
      if (!schema) return schema;
      if (schema.$ref) {
        const refName = schema.$ref.split("/").pop() ?? "";
        const refSchema = (_c = (_b = (_a = spec.value) == null ? void 0 : _a.components) == null ? void 0 : _b.schemas) == null ? void 0 : _c[refName];
        return resolveSchema(refSchema);
      }
      return schema;
    }
    function fullResolveSchema(schema) {
      var _a;
      let resolved = resolveSchema(schema) ?? {};
      resolved = JSON.parse(JSON.stringify(resolved));
      if (resolved.allOf) {
        const hasLocalShape = !!resolved.properties || !!((_a = resolved.required) == null ? void 0 : _a.length) || resolved.additionalProperties !== void 0;
        if (resolved.allOf.length === 1 && !hasLocalShape) {
          return fullResolveSchema(resolved.allOf[0]);
        }
        const merged = {
          type: "object",
          properties: {},
          required: [...resolved.required ?? []]
        };
        if (resolved.description) merged.description = resolved.description;
        if (resolved.additionalProperties !== void 0) {
          merged.additionalProperties = resolved.additionalProperties;
        }
        for (const [k, sub] of Object.entries(resolved.properties ?? {})) {
          merged.properties[k] = fullResolveSchema(sub);
        }
        resolved.allOf.forEach((sub) => {
          const subMerged = fullResolveSchema(sub);
          Object.assign(merged.properties, subMerged.properties);
          if (subMerged.required) merged.required = [.../* @__PURE__ */ new Set([...merged.required ?? [], ...subMerged.required])];
        });
        return merged;
      }
      if (resolved.anyOf) resolved.anyOf = resolved.anyOf.map(fullResolveSchema);
      if (resolved.oneOf) resolved.oneOf = resolved.oneOf.map(fullResolveSchema);
      if (resolved.properties) {
        for (const k of Object.keys(resolved.properties)) {
          resolved.properties[k] = fullResolveSchema(resolved.properties[k]);
        }
      }
      if (resolved.items) resolved.items = fullResolveSchema(resolved.items);
      return resolved;
    }
    function removeProperties(schema, paths) {
      paths.forEach((pathStr) => {
        const parts = pathStr.split(".");
        let current = schema;
        for (let i = 0; i < parts.length - 1; i++) {
          if (current.type !== "object" || !current.properties) {
            addError(`Cannot traverse non-object at ${parts.slice(0, i + 1).join(".")}`);
            return;
          }
          const next = current.properties[parts[i]];
          if (!next) return;
          current = next;
        }
        if (current.type !== "object" || !current.properties) {
          addError(`Cannot remove from non-object at ${pathStr}`);
          return;
        }
        const last = parts[parts.length - 1];
        delete current.properties[last];
        if (current.required) current.required = current.required.filter((r) => r !== last);
      });
    }
    function initFormValue(schema) {
      const resolved = schema;
      if (resolved.allOf) {
        const merged = {};
        resolved.allOf.forEach((sub) => Object.assign(merged, initFormValue(sub)));
        return merged;
      }
      if (resolved.anyOf || resolved.oneOf) {
        const variants = resolved.anyOf || resolved.oneOf || [];
        return variants.length > 0 ? initFormValue(variants[0]) : null;
      }
      if (resolved.type === "object") {
        const obj = {};
        const properties = resolved.properties || {};
        const required = new Set(resolved.required || []);
        for (const [key, sub] of Object.entries(properties)) {
          if (required.has(key)) obj[key] = initFormValue(sub);
        }
        return obj;
      }
      if (resolved.type === "array") return [];
      if (resolved.enum) return resolved.enum[0] ?? "";
      if (resolved.type === "boolean") return false;
      if (resolved.type === "number" || resolved.type === "integer") return 0;
      return "";
    }
    function deepMerge(target, source) {
      if (typeof target !== "object" || target === null || typeof source !== "object" || source === null) return source;
      if (Array.isArray(target) && Array.isArray(source)) return source;
      const merged = { ...target };
      for (const key of Object.keys(source)) {
        const s = source[key];
        if (key in merged) merged[key] = deepMerge(merged[key], s);
        else merged[key] = s;
      }
      return merged;
    }
    function validateAgainstSchema(value, schema, path = "") {
      const resolved = schema;
      if (resolved.allOf) {
        for (const sub of resolved.allOf) {
          const err = validateAgainstSchema(value, sub, path);
          if (err) return err;
        }
        return null;
      }
      if (resolved.anyOf) {
        for (const sub of resolved.anyOf) if (!validateAgainstSchema(value, sub, path)) return null;
        return `Doesn't match any schema at ${path}`;
      }
      if (resolved.oneOf) {
        let matches = 0;
        for (const sub of resolved.oneOf) if (!validateAgainstSchema(value, sub, path)) matches++;
        if (matches === 0) return `Doesn't match any schema at ${path}`;
        if (matches > 1) return `Matches more than one schema at ${path}`;
        return null;
      }
      if (resolved.type === "object") {
        if (typeof value !== "object" || value === null || Array.isArray(value)) return `Expected object at ${path}`;
        const properties = resolved.properties || {};
        for (const req of resolved.required || []) if (!(req in value)) return `Missing required field: ${req} at ${path}`;
        for (const [key, val] of Object.entries(value)) {
          if (!(key in properties) && resolved.additionalProperties === false) return `Unexpected field: ${key} at ${path}`;
          if (key in properties) {
            const err = validateAgainstSchema(val, properties[key], `${path ? path + "." : ""}${key}`);
            if (err) return err;
          }
        }
        return null;
      }
      if (resolved.type === "array") {
        if (!Array.isArray(value)) return `Expected array at ${path}`;
        for (let i = 0; i < value.length; i++) {
          const err = validateAgainstSchema(value[i], resolved.items, `${path}[${i}]`);
          if (err) return err;
        }
        if (resolved.minItems && value.length < resolved.minItems) return `Array too short (min ${resolved.minItems}) at ${path}`;
        if (resolved.maxItems && value.length > resolved.maxItems) return `Array too long (max ${resolved.maxItems}) at ${path}`;
        return null;
      }
      if (resolved.type === "string") {
        if (typeof value !== "string") return `Expected string at ${path}`;
        if (resolved.enum && !resolved.enum.includes(value)) return `Invalid enum value: ${value} at ${path}`;
        if (resolved.pattern && !new RegExp(resolved.pattern).test(value)) return `Does not match pattern at ${path}`;
        if (resolved.minLength && value.length < resolved.minLength) return `String too short at ${path}`;
        if (resolved.maxLength && value.length > resolved.maxLength) return `String too long at ${path}`;
        if (resolved.format === "uuid" && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) return `Invalid UUID at ${path}`;
        if (resolved.format === "date-time" && isNaN(Date.parse(value))) return `Invalid date-time at ${path}`;
        if (resolved.format === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Invalid date at ${path}`;
        return null;
      }
      if (resolved.type === "number" || resolved.type === "integer") {
        if (typeof value !== "number") return `Expected ${resolved.type} at ${path}`;
        if (resolved.type === "integer" && !Number.isInteger(value)) return `Expected integer at ${path}`;
        if (resolved.minimum !== void 0 && value < resolved.minimum) return `Value too small at ${path}`;
        if (resolved.maximum !== void 0 && value > resolved.maximum) return `Value too large at ${path}`;
        return null;
      }
      if (resolved.type === "boolean") {
        if (typeof value !== "boolean") return `Expected boolean at ${path}`;
        return null;
      }
      return `Unknown schema type at ${path}`;
    }
    const schemaDefaults = ref({});
    const resolvedScenarios = computed(
      () => props.scenarios.map((scenario) => ({
        ...scenario,
        json: JSON.stringify(deepMerge(schemaDefaults.value, scenario.data), null, 2)
      }))
    );
    const activeScenarioId = computed(
      () => {
        var _a;
        return ((_a = resolvedScenarios.value.find((s) => s.json === jsonInput.value)) == null ? void 0 : _a.id) ?? null;
      }
    );
    async function loadSpec() {
      var _a, _b, _c;
      try {
        const response = await fetch(props.spec);
        const text = await response.text();
        spec.value = YAML.parse(text);
        const maybeSchema = (_c = (_b = (_a = spec.value) == null ? void 0 : _a.components) == null ? void 0 : _b.schemas) == null ? void 0 : _c[props.schemaName];
        if (!maybeSchema) {
          addError(`Schema ${props.schemaName} not found`);
          return;
        }
        rootSchema.value = fullResolveSchema(maybeSchema);
        removeProperties(rootSchema.value, props.excludedFields);
        const defaults = initFormValue(rootSchema.value);
        schemaDefaults.value = defaults;
        const merged = deepMerge(defaults, props.initialData);
        const validationError = validateAgainstSchema(merged, rootSchema.value);
        const customError = props.customValidator(merged);
        if (validationError || customError) {
          addError(`Initial data invalid: ${validationError || customError}. Using defaults.`);
          form.value = defaults;
        } else {
          form.value = merged;
        }
      } catch (err) {
        addError(String(err));
      }
    }
    watch(form, () => {
      jsonInput.value = JSON.stringify(form.value, null, 2);
      emit("update:json", jsonInput.value);
    }, { deep: true });
    watch(jsonInput, (newValue) => {
      try {
        updateField(props.stateField, newValue);
      } catch {
      }
    });
    watchEffect(() => {
      loadSpec();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ej" }, _attrs))} data-v-9784a1c9><header class="ej__header" data-v-9784a1c9><div class="ej__header-left" data-v-9784a1c9><span class="ej__eyebrow" data-v-9784a1c9><span class="ej__eyebrow-dash" data-v-9784a1c9></span> ${ssrInterpolate(__props.label)}</span>`);
      if (__props.description) {
        _push(`<span class="ej__description" data-v-9784a1c9>${ssrInterpolate(__props.description)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ej__header-right" data-v-9784a1c9><span class="ej__schema" data-v-9784a1c9>${ssrInterpolate(__props.schemaName)}</span>`);
      if (__props.endpointHref) {
        _push(`<a${ssrRenderAttr("href", __props.endpointHref)} class="ej__endpoint" data-v-9784a1c9>${ssrInterpolate(__props.endpointLabel)} ↗</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="ej__canvas" data-v-9784a1c9><textarea spellcheck="false" class="ej__textarea" data-v-9784a1c9>${ssrInterpolate(jsonInput.value)}</textarea>`);
      if (resolvedScenarios.value.length) {
        _push(`<aside class="ej__scenarios" data-v-9784a1c9><span class="ej__scenarios-title" data-v-9784a1c9>${ssrInterpolate(__props.scenariosLabel)}</span><!--[-->`);
        ssrRenderList(resolvedScenarios.value, (scenario) => {
          _push(`<button type="button" class="${ssrRenderClass([{ "ej__scenario--active": scenario.id === activeScenarioId.value }, "ej__scenario"])}"${ssrRenderAttr("aria-pressed", scenario.id === activeScenarioId.value)} data-v-9784a1c9><span class="ej__scenario-label" data-v-9784a1c9>${ssrInterpolate(scenario.label)}</span>`);
          if (scenario.description) {
            _push(`<span class="ej__scenario-desc" data-v-9784a1c9>${ssrInterpolate(scenario.description)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></aside>`);
      } else {
        _push(`<!---->`);
      }
      if (toastShowing.value) {
        _push(`<div class="ej__toast" role="status" data-v-9784a1c9>${ssrInterpolate(toastMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><footer class="ej__footer" data-v-9784a1c9><span class="ej__stat" data-v-9784a1c9>${ssrInterpolate(lineCount.value)} lines</span><span class="ej__stat" data-v-9784a1c9>${ssrInterpolate(charCount.value)} chars</span><span class="ej__hint" data-v-9784a1c9>Edits commit on blur — invalid JSON reverts.</span><button type="button" class="${ssrRenderClass([{ "ej__copy--ok": copied.value }, "ej__copy"])}"${ssrRenderAttr("title", copied.value ? "Copied" : "Copy JSON")}${ssrRenderAttr("aria-label", copied.value ? "JSON copied to clipboard" : "Copy JSON to clipboard")} data-v-9784a1c9>`);
      if (!copied.value) {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-9784a1c9><rect x="9" y="9" width="13" height="13" rx="2" ry="2" data-v-9784a1c9></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-v-9784a1c9></path></svg>`);
      } else {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-9784a1c9><polyline points="20 6 9 17 4 12" data-v-9784a1c9></polyline></svg>`);
      }
      _push(`<span class="ej__copy-label" data-v-9784a1c9>${ssrInterpolate(copied.value ? "Copied" : "Copy")}</span></button></footer></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/editors/EditableJson.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9784a1c9"]]);
export {
  __unplugin_components_2 as _
};
