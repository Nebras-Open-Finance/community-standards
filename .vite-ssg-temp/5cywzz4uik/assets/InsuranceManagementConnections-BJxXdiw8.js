import { defineComponent, computed, ref, watch, mergeProps, useSSRContext, unref, createVNode, resolveDynamicComponent, h, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
import { i as insuranceTypeLabels, a as insurancePermissionGroups, b as insurancePermissionDescriptions, c as insurancePolicyStatusGroup } from "./insurancePolicyStatus-7keZa3ks.js";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { f as formatDate } from "./formatDate-CaaKrjgT.js";
const MAX_CONSENTS = 12;
const MAX_TYPES_PER_CONSENT = 4;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InsuranceConnectionsEditor",
  __ssrInlineRender: true,
  setup(__props) {
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
      "Expired",
      "Revoked"
    ];
    const CONSENT_STATUSES = computed(
      () => isLfi.value ? ALL_CONSENT_STATUSES.filter((s) => s !== "Paused") : ALL_CONSENT_STATUSES
    );
    const INSURANCE_TYPES = [
      "Motor",
      "Health",
      "Home",
      "Life",
      "Travel",
      "Renters",
      "Employment"
    ];
    const ALL_PERMISSIONS = [
      "ReadInsurancePolicies",
      "ReadCustomerBasic",
      "ReadCustomerDetail",
      "ReadInsuranceProduct",
      "ReadInsurancePremium",
      "ReadCustomerPaymentDetails",
      "ReadCustomerClaims"
    ];
    const PERMISSION_SHORT_LABELS = {
      ReadInsurancePolicies: "Policy",
      ReadCustomerBasic: "Basic",
      ReadCustomerDetail: "Detail",
      ReadInsuranceProduct: "Product",
      ReadInsurancePremium: "Premium",
      ReadCustomerPaymentDetails: "Payment",
      ReadCustomerClaims: "Claims"
    };
    const LFI_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function randomLfiDigit() {
      return Math.floor(Math.random() * 9) + 1;
    }
    let nextTypeId = 100;
    function newTypeEntry(type, permissions) {
      return { id: nextTypeId++, type, permissions: [...permissions] };
    }
    const ALL_PERMS = [...ALL_PERMISSIONS];
    const ALL_SEED_CONSENTS = [
      {
        id: 1,
        status: "Authorized",
        lfiDigit: 3,
        baseConsentId: 2,
        types: [newTypeEntry("Motor", ALL_PERMS)]
      },
      {
        id: 2,
        status: "Revoked",
        lfiDigit: 3,
        baseConsentId: "",
        types: [newTypeEntry("Motor", ALL_PERMS)]
      },
      {
        id: 3,
        status: "Authorized",
        lfiDigit: 7,
        baseConsentId: "",
        types: [
          newTypeEntry("Health", ["ReadInsurancePolicies", "ReadInsurancePremium", "ReadCustomerPaymentDetails"]),
          newTypeEntry("Life", ["ReadInsurancePolicies", "ReadCustomerClaims"])
        ]
      },
      {
        id: 4,
        status: "Authorized",
        lfiDigit: 5,
        baseConsentId: "",
        types: [newTypeEntry("Life", ["ReadInsurancePolicies", "ReadInsurancePremium", "ReadCustomerClaims"])]
      },
      {
        id: 5,
        status: "AwaitingAuthorization",
        lfiDigit: randomLfiDigit(),
        baseConsentId: "",
        types: [newTypeEntry("Home", ALL_PERMS)]
      },
      {
        id: 6,
        status: "Suspended",
        lfiDigit: 2,
        baseConsentId: "",
        types: [newTypeEntry("Travel", ["ReadInsurancePolicies"])]
      },
      {
        id: 7,
        status: "Paused",
        lfiDigit: 6,
        baseConsentId: "",
        types: [
          newTypeEntry("Motor", ["ReadInsurancePolicies"]),
          newTypeEntry("Home", ["ReadInsurancePolicies", "ReadInsurancePremium"])
        ]
      },
      {
        id: 8,
        status: "Expired",
        lfiDigit: 6,
        baseConsentId: "",
        types: [newTypeEntry("Employment", ["ReadInsurancePolicies", "ReadCustomerBasic", "ReadCustomerDetail"])]
      },
      {
        id: 9,
        status: "Rejected",
        lfiDigit: 1,
        baseConsentId: "",
        types: [newTypeEntry("Travel", ["ReadInsurancePolicies"])]
      }
    ];
    ALL_SEED_CONSENTS.reduce((m, c) => Math.max(m, c.id), 0) + 1;
    const consents = ref(JSON.parse(JSON.stringify(ALL_SEED_CONSENTS)));
    function normalizeStatus(consent) {
      if (isLfi.value && consent.status === "Paused") return "Authorized";
      return consent.status;
    }
    watch(
      consents,
      (val) => {
        for (const consent of val) {
          consent.status = normalizeStatus(consent);
        }
        const payload = val.map((item) => ({
          id: item.id,
          status: item.status,
          lfiDigit: Number(item.lfiDigit),
          types: item.types.map((t) => ({ type: t.type, permissions: [...t.permissions] })),
          baseConsentId: item.baseConsentId || void 0
        }));
        updateField("insuranceConsentConnections", JSON.stringify(payload));
      },
      { deep: true, immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ice" }, _attrs))} data-v-f88f96c1><header class="ice__header" data-v-f88f96c1><span class="ice__eyebrow" data-v-f88f96c1><span class="ice__eyebrow-dash" data-v-f88f96c1></span> Simulated consents </span><span class="ice__subtitle" data-v-f88f96c1>Insurance consents may carry multiple insurance types, each with its own permissions</span></header><div class="ice__rows" data-v-f88f96c1><!--[-->`);
      ssrRenderList(consents.value, (consent) => {
        _push(`<div class="ice__consent" data-v-f88f96c1><div class="ice__row ice__row--main" data-v-f88f96c1><div class="ice__field ice__field--status" data-v-f88f96c1><label class="ice__label" data-v-f88f96c1>Status</label><select class="ice__control" data-v-f88f96c1><!--[-->`);
        ssrRenderList(CONSENT_STATUSES.value, (status) => {
          _push(`<option${ssrRenderAttr("value", status)} data-v-f88f96c1${ssrIncludeBooleanAttr(Array.isArray(consent.status) ? ssrLooseContain(consent.status, status) : ssrLooseEqual(consent.status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
        });
        _push(`<!--]--></select></div><div class="ice__field ice__field--lfi" data-v-f88f96c1><label class="ice__label" data-v-f88f96c1>${ssrInterpolate(entityLabel.value)}</label><select class="ice__control" data-v-f88f96c1><!--[-->`);
        ssrRenderList(LFI_DIGITS, (digit) => {
          _push(`<option${ssrRenderAttr("value", digit)} data-v-f88f96c1${ssrIncludeBooleanAttr(Array.isArray(consent.lfiDigit) ? ssrLooseContain(consent.lfiDigit, digit) : ssrLooseEqual(consent.lfiDigit, digit)) ? " selected" : ""}>${ssrInterpolate(digit)}</option>`);
        });
        _push(`<!--]--></select></div><div class="ice__field ice__field--base" data-v-f88f96c1><label class="ice__label" data-v-f88f96c1>BaseConsentId</label><input class="ice__control" type="text"${ssrRenderAttr("value", consent.baseConsentId)} placeholder="Optional" data-v-f88f96c1></div><button type="button" class="ice__remove"${ssrIncludeBooleanAttr(consents.value.length <= 1) ? " disabled" : ""} title="Remove consent" aria-label="Remove consent" data-v-f88f96c1><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-f88f96c1><path d="M3 6h18" data-v-f88f96c1></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-f88f96c1></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" data-v-f88f96c1></path><line x1="10" y1="11" x2="10" y2="17" data-v-f88f96c1></line><line x1="14" y1="11" x2="14" y2="17" data-v-f88f96c1></line></svg></button></div><div class="ice__types" data-v-f88f96c1><div class="ice__types-label" data-v-f88f96c1>Insurance types &amp; permissions</div><!--[-->`);
        ssrRenderList(consent.types, (entry) => {
          _push(`<div class="ice__type-row" data-v-f88f96c1><select class="ice__control ice__type-select" data-v-f88f96c1><!--[-->`);
          ssrRenderList(INSURANCE_TYPES, (t) => {
            _push(`<option${ssrRenderAttr("value", t)} data-v-f88f96c1${ssrIncludeBooleanAttr(Array.isArray(entry.type) ? ssrLooseContain(entry.type, t) : ssrLooseEqual(entry.type, t)) ? " selected" : ""}>${ssrInterpolate(t)}</option>`);
          });
          _push(`<!--]--></select><div class="ice__perm-checks" data-v-f88f96c1><!--[-->`);
          ssrRenderList(ALL_PERMISSIONS, (perm) => {
            _push(`<label class="ice__perm-check"${ssrRenderAttr("title", perm)} data-v-f88f96c1><input type="checkbox"${ssrIncludeBooleanAttr(entry.permissions.includes(perm)) ? " checked" : ""} data-v-f88f96c1><span data-v-f88f96c1>${ssrInterpolate(PERMISSION_SHORT_LABELS[perm])}</span></label>`);
          });
          _push(`<!--]--></div><button type="button" class="ice__type-remove"${ssrIncludeBooleanAttr(consent.types.length <= 1) ? " disabled" : ""} title="Remove insurance type" aria-label="Remove insurance type" data-v-f88f96c1>×</button></div>`);
        });
        _push(`<!--]--><button type="button" class="ice__type-add"${ssrIncludeBooleanAttr(consent.types.length >= MAX_TYPES_PER_CONSENT) ? " disabled" : ""} data-v-f88f96c1>+ Add insurance type</button></div></div>`);
      });
      _push(`<!--]--></div><footer class="ice__footer" data-v-f88f96c1><button type="button" class="ice__add"${ssrIncludeBooleanAttr(consents.value.length >= MAX_CONSENTS) ? " disabled" : ""} data-v-f88f96c1>+ Add consent</button><span class="ice__count" data-v-f88f96c1>${ssrInterpolate(consents.value.length)} / ${ssrInterpolate(MAX_CONSENTS)}</span></footer></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/editors/InsuranceConnectionsEditor.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f88f96c1"]]);
const TYPE_PREFIX = {
  Motor: "MOT",
  Health: "HLT",
  Home: "HOM",
  Life: "LIF",
  Travel: "TRV",
  Renters: "RNT",
  Employment: "EMP"
};
const ACTIVE_STATUSES = ["New", "Renewed", "InForce", "PaidUp"];
function hashString(str) {
  let h2 = 0;
  for (let i = 0; i < str.length; i++) h2 = h2 * 31 + str.charCodeAt(i) | 0;
  return h2 >>> 0;
}
function mulberry32(seed) {
  let a = seed;
  return () => {
    a = a + 1831565813 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function generateConsentPolicies(consent) {
  const types = Array.isArray(consent == null ? void 0 : consent.types) ? consent.types : [];
  const consentId = String((consent == null ? void 0 : consent.id) ?? "consent");
  const out = [];
  for (const entry of types) {
    const type = entry == null ? void 0 : entry.type;
    if (!type) continue;
    const rng = mulberry32(hashString(`${consentId}::${type}`));
    const count = rng() < 0.5 ? 1 : 2;
    const prefix = TYPE_PREFIX[type] || type.slice(0, 3).toUpperCase();
    for (let i = 0; i < count; i++) {
      const seq = String(Math.floor(rng() * 9e3) + 1e3).padStart(4, "0");
      const premium = (Math.floor(rng() * 80) + 5) * 100;
      const status = ACTIVE_STATUSES[Math.floor(rng() * ACTIVE_STATUSES.length)] ?? "InForce";
      out.push({
        id: `${consentId}-${type}-${i}`,
        insuranceType: type,
        status,
        policyNumber: `${prefix}-2026-${seq}`,
        premium
      });
    }
  }
  return out;
}
const CONSENT_ID = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
const EXPIRATION_ISO = "2026-03-31T00:00:00Z";
const LAST_DATA_RECEIVED = "30/09/2024";
const _sfc_main$1 = {
  __name: "InsuranceManagementDetail",
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
    const isLfi = computed(() => props.perspective === "lfi");
    const barTitle = computed(() => isLfi.value ? "LFI" : "TPP");
    const entityLabel = computed(() => isLfi.value ? "TPP" : "LFI");
    const truncatedConsentId = `${CONSENT_ID.slice(0, 8)}...${CONSENT_ID.slice(-4)}`;
    const copied = ref(false);
    const CONSENT_STATUS_LABELS = {
      "Authorized": "Active",
      "Revoked": "Cancelled",
      "AwaitingAuthorization": "Pending"
    };
    const displayStatus = computed(() => {
      var _a, _b;
      return CONSENT_STATUS_LABELS[(_a = props.connection) == null ? void 0 : _a.status] ?? ((_b = props.connection) == null ? void 0 : _b.status);
    });
    const statusClass = computed(() => {
      var _a;
      const s = (_a = props.connection) == null ? void 0 : _a.status;
      if (s === "Authorized") return "imd-status-authorized";
      if (s === "AwaitingAuthorization") return "imd-status-awaiting";
      if (s === "Suspended") return "imd-status-suspended";
      if (s === "Paused") return "imd-status-paused";
      if (s === "Expired") return "imd-status-expired";
      if (s === "Rejected" || s === "Revoked") return "imd-status-rejected";
      return "imd-status-awaiting";
    });
    const DISCONNECT_STATUSES = /* @__PURE__ */ new Set(["AwaitingAuthorization", "Authorized", "Suspended", "Paused"]);
    const showDisconnect = computed(() => {
      var _a;
      return DISCONNECT_STATUSES.has((_a = props.connection) == null ? void 0 : _a.status);
    });
    const showPause = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.status) === "Authorized" && !isLfi.value;
    });
    const showReactivate = computed(() => {
      var _a;
      return ((_a = props.connection) == null ? void 0 : _a.status) === "Paused" && !isLfi.value;
    });
    const consentTypes = computed(() => {
      var _a;
      const raw = (_a = props.connection) == null ? void 0 : _a.types;
      return Array.isArray(raw) ? raw : [];
    });
    const generatedPolicies = computed(() => generateConsentPolicies(props.connection));
    const policyGroups = computed(
      () => consentTypes.value.map((entry) => ({
        type: entry.type,
        label: insuranceTypeLabels[entry.type] || `${entry.type} Insurance`,
        policies: generatedPolicies.value.filter((p) => p.insuranceType === entry.type)
      })).filter((group) => group.policies.length > 0)
    );
    const totalPolicies = computed(
      () => policyGroups.value.reduce((sum, g) => sum + g.policies.length, 0)
    );
    function policyIsActive(policy) {
      return insurancePolicyStatusGroup(policy == null ? void 0 : policy.status) === "active";
    }
    const openPermissions = ref({});
    function permKey(type, permission) {
      return `${type}::${permission}`;
    }
    function isOpen(type, permission) {
      return !!openPermissions.value[permKey(type, permission)];
    }
    const iconBase = (paths) => () => h(
      "svg",
      { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      paths.map(
        (p) => h("path", {
          ...p,
          stroke: "#0C1441",
          "stroke-width": p["stroke-width"] || 1.5,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: "none"
        })
      )
    );
    const permissionIcons = {
      ReadInsurancePolicies: iconBase([
        { d: "M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H15C16.1 2.5 17 3.4 17 4.5V20L14.5 18.5L12 20L9.5 18.5L7 20L4.5 18.5L2 20V4.5C2 3.4 2.9 2.5 4 2.5" },
        { d: "M8 7H13" },
        { d: "M9 11H12" },
        { d: "M19.2 14.8L15.7 18.3C15.6 18.5 15.5 18.7 15.4 18.9L15.2 20.3C15.1 20.7 15.5 21.1 16 21L17.3 20.8C17.5 20.8 17.8 20.7 17.9 20.5L21.4 17C22 16.4 22.3 15.7 21.4 14.8C20.5 13.9 19.8 14.2 19.2 14.8Z" }
      ]),
      ReadCustomerBasic: iconBase([
        { d: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" },
        { d: "M19 21C19 17.13 15.87 14 12 14C8.13 14 5 17.13 5 21" }
      ]),
      ReadCustomerDetail: iconBase([
        { d: "M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" },
        { d: "M22 10H18C15 10 14 9 14 6V2L22 10Z" },
        { d: "M8 13H13" },
        { d: "M8 17H11" }
      ]),
      ReadInsuranceProduct: iconBase([
        { d: "M18 9.5H16C14 9.5 14 8.5 14 7.5V5.5C14 3.5 15 2.5 17 2.5H21C22 2.5 22 3.5 22 5.5V7.5C22 8.5 22 9.5 21 9.5H18Z" },
        { d: "M6 9.5H8C10 9.5 10 8.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H3C2 2.5 2 3.5 2 5.5V7.5C2 8.5 2 9.5 3 9.5H6Z" },
        { d: "M6 21.5H8C10 21.5 10 20.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H3C2 14.5 2 15.5 2 17.5V19.5C2 20.5 2 21.5 3 21.5H6Z" },
        { d: "M14 17.5H21" },
        { d: "M14 20.5H21" }
      ]),
      ReadInsurancePremium: iconBase([
        { d: "M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" },
        { d: "M12 6V18" },
        { d: "M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z" }
      ]),
      ReadCustomerPaymentDetails: iconBase([
        { d: "M7 11H14" },
        { d: "M18 14.5H17C16 14.5 15 13.7 15 12.5C15 11.4 15.9 10.5 17 10.5H18C19.1 10.5 20 11.4 20 12.5C20 13.7 19.1 14.5 18 14.5Z" },
        { d: "M20 10.5V13.5C20 17.5 18 19.5 14 19.5H8C4 19.5 2 17.5 2 13.5V7.5C2 4 4 2 7.5 2H14C18 2 20 4 20 8" }
      ]),
      ReadCustomerClaims: iconBase([
        { d: "M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" },
        { d: "M15.9965 12H16.0054", "stroke-width": 2 },
        { d: "M11.9955 12H12.0045", "stroke-width": 2 },
        { d: "M7.99451 12H8.00349", "stroke-width": 2 }
      ])
    };
    function permissionIcon(permission) {
      return permissionIcons[permission] || permissionIcons.ReadInsurancePolicies;
    }
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
    function relatedTypesLabel(related) {
      const types = Array.isArray(related == null ? void 0 : related.types) ? related.types : [];
      return types.map((t) => insuranceTypeLabels[t.type] || t.type).join(", ");
    }
    const confirmAction = ref(null);
    const confirmTitle = computed(() => {
      if (confirmAction.value === "pause") return "Pause data sharing";
      if (confirmAction.value === "reactivate") return "Resume data sharing";
      return "Stop sharing";
    });
    const confirmButtonLabel = computed(() => {
      if (confirmAction.value === "pause") return "Confirm pause";
      if (confirmAction.value === "reactivate") return "Confirm reactivation";
      return "Confirm stop sharing";
    });
    const confirmImpactText = computed(() => {
      if (confirmAction.value === "pause") {
        return "[Placeholder] This text is set by the TPP and should explain to the customer what pausing this insurance data sharing consent will mean for their experience — for example, which features or services will be temporarily unavailable and how they can resume access.";
      }
      if (confirmAction.value === "reactivate") {
        return "[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this insurance data sharing consent will mean for their experience — for example, which features or services will become available again.";
      }
      return "[Placeholder] This text is set by the TPP and should explain to the customer what stopping this insurance data sharing consent will mean for their experience — for example, which features or services will stop working and what steps they would need to take to reconnect.";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["imd-frame", { "imd-lfi": isLfi.value }],
        style: props.headerColor ? { "--cmi-header-color": props.headerColor } : void 0
      }, _attrs))} data-v-13a1d92e><div class="imd-screen-name" data-v-13a1d92e><div class="imd-screen-bar" data-v-13a1d92e></div><button type="button" class="imd-back-button" aria-label="Back" data-v-13a1d92e><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-13a1d92e><path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path></svg></button><div class="imd-screen-title" data-v-13a1d92e>${ssrInterpolate(barTitle.value)}</div></div>`);
      if (confirmAction.value === null && !showUpdates.value) {
        _push(`<!--[--><div class="imd-card-shell" data-v-13a1d92e><div class="imd-meta-card" data-v-13a1d92e><div class="imd-meta-header" data-v-13a1d92e><div class="imd-meta-lfi" data-v-13a1d92e>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(__props.connection.lfiDigit)}]</div><div class="${ssrRenderClass([statusClass.value, "imd-status"])}" data-v-13a1d92e>${ssrInterpolate(displayStatus.value)}</div></div><div class="imd-meta-rows" data-v-13a1d92e><button type="button" class="${ssrRenderClass([{ "is-copied": copied.value }, "imd-meta-row imd-consent-id"])}"${ssrRenderAttr("aria-label", `Consent ID: ${CONSENT_ID}. Click to copy.`)} data-v-13a1d92e><span class="imd-meta-row-label" data-v-13a1d92e>Consent ID</span><span class="imd-consent-id-right" data-v-13a1d92e><span class="imd-consent-id-action" data-v-13a1d92e>${ssrInterpolate(copied.value ? "Copied!" : "Copy")}</span><span class="imd-consent-id-value" data-v-13a1d92e>${ssrInterpolate(truncatedConsentId)}</span></span></button><div class="imd-meta-row" data-v-13a1d92e><span class="imd-meta-row-label" data-v-13a1d92e>Last data received</span><span class="imd-meta-row-value" data-v-13a1d92e>${ssrInterpolate(LAST_DATA_RECEIVED)}</span></div></div></div><div class="imd-section-card" data-v-13a1d92e><div class="imd-section-header" data-v-13a1d92e><div class="imd-section-title" data-v-13a1d92e>Policies</div></div>`);
        if (totalPolicies.value > 0) {
          _push(`<div class="imd-policies-list" data-v-13a1d92e><!--[-->`);
          ssrRenderList(policyGroups.value, (group) => {
            _push(`<!--[--><!--[-->`);
            ssrRenderList(group.policies, (policy) => {
              _push(`<div class="${ssrRenderClass([{ "imd-policy-card--inactive": !policyIsActive(policy) }, "imd-policy-card"])}" data-v-13a1d92e><span class="imd-policy-status-icon"${ssrRenderAttr("title", policyIsActive(policy) ? "Active policy" : "Inactive policy")} data-v-13a1d92e>`);
              if (policyIsActive(policy)) {
                _push(`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-13a1d92e><circle cx="8.5" cy="8.5" r="6.95" fill="#22A35D" fill-opacity="0.4" data-v-13a1d92e></circle><path d="M5.5 8.7L7.7 10.9L11.7 6.5" stroke="#22A35D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" data-v-13a1d92e></path></svg>`);
              } else {
                _push(`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-13a1d92e><circle cx="8.5" cy="8.5" r="6.95" fill="#FDAA35" fill-opacity="0.4" data-v-13a1d92e></circle><path d="M8.5 5.2V8.5L10.3 9.7" stroke="#FDAA35" stroke-width="1.4" stroke-linecap="round" fill="none" data-v-13a1d92e></path></svg>`);
              }
              _push(`</span><div class="imd-policy-body" data-v-13a1d92e><div class="imd-policy-title-text" data-v-13a1d92e>${ssrInterpolate(group.label)}</div><div class="imd-policy-subtext" data-v-13a1d92e>${ssrInterpolate(policy.policyNumber)}</div><div class="imd-policy-row" data-v-13a1d92e><span class="imd-policy-row-label" data-v-13a1d92e>Premium</span>`);
              _push(ssrRenderComponent(DirhamAmount, {
                class: "imd-policy-row-value",
                amount: Number(policy.premium ?? 0).toLocaleString()
              }, null, _parent));
              _push(`</div></div></div>`);
            });
            _push(`<!--]--><!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="imd-policies-empty" data-v-13a1d92e> No linked policies for this consent. </div>`);
        }
        _push(`</div><div class="imd-section-card" data-v-13a1d92e>`);
        if (consentTypes.value.length === 1) {
          _push(`<div class="imd-section-header" data-v-13a1d92e><div class="imd-section-title" data-v-13a1d92e>Data we can access</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="imd-type-sections" data-v-13a1d92e><!--[-->`);
        ssrRenderList(consentTypes.value, (entry) => {
          _push(`<div class="imd-type-section" data-v-13a1d92e>`);
          if (consentTypes.value.length > 1) {
            _push(`<div class="imd-section-title" data-v-13a1d92e>${ssrInterpolate(unref(insuranceTypeLabels)[entry.type] || `${entry.type} Insurance`)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="imd-permissions-list" data-v-13a1d92e><!--[-->`);
          ssrRenderList(unref(insurancePermissionGroups), (row) => {
            _push(`<!--[-->`);
            if (entry.permissions.includes(row.permission)) {
              _push(`<div class="imd-permission-row" data-v-13a1d92e><button type="button" class="imd-permission-toggle"${ssrRenderAttr("aria-expanded", isOpen(entry.type, row.permission))} data-v-13a1d92e><span class="imd-permission-label-section" data-v-13a1d92e>`);
              ssrRenderVNode(_push, createVNode(resolveDynamicComponent(permissionIcon(row.permission)), { class: "imd-permission-icon" }, null), _parent);
              _push(`<span class="imd-permission-label" data-v-13a1d92e>${ssrInterpolate(row.label)}</span></span><svg class="${ssrRenderClass([{ "is-open": isOpen(entry.type, row.permission) }, "imd-permission-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-13a1d92e><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-13a1d92e></path></svg></button>`);
              if (isOpen(entry.type, row.permission)) {
                _push(`<div class="imd-permission-description" data-v-13a1d92e>${ssrInterpolate(unref(insurancePermissionDescriptions)[row.permission])}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></div>`);
        if (!isLfi.value && __props.connection.status !== "Rejected") {
          _push(`<div class="imd-usage-card" data-v-13a1d92e><div class="imd-usage-header" data-v-13a1d92e><div class="imd-usage-title" data-v-13a1d92e>${ssrInterpolate(__props.connection.status === "Revoked" ? "You cancelled this connection" : "How we are using your data")}</div><div class="imd-usage-subtitle" data-v-13a1d92e>[Detail purpose for which insurance data will be used].</div></div><div class="imd-usage-dates" data-v-13a1d92e><div class="imd-usage-date-block" data-v-13a1d92e><div class="imd-usage-date-row" data-v-13a1d92e><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-13a1d92e><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path></svg><span class="imd-usage-date-label" data-v-13a1d92e>First Connected</span></div><div class="imd-usage-date-value" data-v-13a1d92e>${ssrInterpolate(LAST_DATA_RECEIVED)}</div></div><div class="imd-usage-date-block" data-v-13a1d92e><div class="imd-usage-date-row" data-v-13a1d92e><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-13a1d92e><path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path></svg><span class="imd-usage-date-label" data-v-13a1d92e>${ssrInterpolate(__props.connection.status === "Expired" ? "Connection Expired" : "Connection Expires")}</span></div><div class="imd-usage-date-value" data-v-13a1d92e>${ssrInterpolate(unref(formatDate)(EXPIRATION_ISO))}</div></div>`);
          if (__props.connection.baseConsentId) {
            _push(`<div class="imd-usage-date-block" data-v-13a1d92e><div class="imd-usage-date-row" data-v-13a1d92e><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="${ssrRenderStyle({ "flex-shrink": "0" })}" data-v-13a1d92e><rect x="1.33301" y="1.33203" width="13.334" height="13.334" rx="2" stroke="#36BFD4" stroke-width="1.5" data-v-13a1d92e></rect><path d="M10.167 6.16536C9.667 5.33203 8.667 4.66536 7.5 4.83203C6.167 5.0487 5.167 6.16536 5.0003 7.4987C4.8003 9.16536 6.0003 10.6654 7.6003 10.832C8.667 10.9487 9.6003 10.4987 10.167 9.83203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path><path d="M10.5 4.5V6.5H8.5" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-13a1d92e></path></svg><span class="imd-usage-date-label" data-v-13a1d92e>Last Updated</span></div><div class="imd-usage-date-value" data-v-13a1d92e>${ssrInterpolate(LAST_DATA_RECEIVED)}</div><div class="imd-usage-updates-link" data-v-13a1d92e>List of Updates</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (showDisconnect.value || showReactivate.value) {
          _push(`<div class="imd-footer" data-v-13a1d92e>`);
          if (showReactivate.value) {
            _push(`<button type="button" class="imd-reactivate-btn" data-v-13a1d92e>Reactivate</button>`);
          } else {
            _push(`<!---->`);
          }
          if (showPause.value) {
            _push(`<button type="button" class="imd-pause-btn" data-v-13a1d92e>Pause</button>`);
          } else {
            _push(`<!---->`);
          }
          if (showDisconnect.value) {
            _push(`<button type="button" class="imd-revoke-btn" data-v-13a1d92e>Stop Sharing</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (showUpdates.value) {
        _push(`<div class="imd-card-shell" data-v-13a1d92e><div class="imd-section-card" data-v-13a1d92e><div class="imd-section-header" data-v-13a1d92e><div class="imd-section-title" data-v-13a1d92e>List of Updates</div></div><div class="imd-updates-subtitle" data-v-13a1d92e>List of all changes that you made to this connection since first authorization.</div></div>`);
        if (relatedConsents.value.length > 0) {
          _push(`<div class="imd-updates-list" data-v-13a1d92e><!--[-->`);
          ssrRenderList(relatedConsents.value, (related, idx) => {
            _push(`<div class="imd-updates-item" role="button" tabindex="0" data-v-13a1d92e><div class="imd-updates-item-name" data-v-13a1d92e>${ssrInterpolate(LAST_DATA_RECEIVED)}</div><div class="imd-updates-item-count" data-v-13a1d92e>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(related.lfiDigit)}]</div><div class="imd-updates-item-meta imd-updates-item-meta-row" data-v-13a1d92e><span class="imd-updates-item-meta-label" data-v-13a1d92e>Insurance Type:</span><span class="imd-updates-item-meta-value" data-v-13a1d92e>${ssrInterpolate(relatedTypesLabel(related))}</span></div><svg class="imd-updates-chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-13a1d92e><path d="M9 18l6-6-6-6" data-v-13a1d92e></path></svg></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="imd-updates-empty" data-v-13a1d92e>No related updates found.</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><div class="imd-confirm-card imd-confirm-title-card" data-v-13a1d92e><div class="imd-confirm-title" data-v-13a1d92e>${ssrInterpolate(confirmTitle.value)}</div><div class="imd-confirm-subtitle" data-v-13a1d92e>Are you sure you want to proceed?</div></div><div class="imd-confirm-card" data-v-13a1d92e><div class="imd-confirm-impact-header" data-v-13a1d92e>What this will mean</div><p class="imd-confirm-impact-text" data-v-13a1d92e>${ssrInterpolate(confirmImpactText.value)}</p></div><div class="imd-confirm-footer" data-v-13a1d92e><button type="button" class="${ssrRenderClass([confirmAction.value === "pause" ? "imd-confirm-btn-pause" : confirmAction.value === "reactivate" ? "imd-confirm-btn-reactivate" : "imd-confirm-btn-revoke", "imd-confirm-btn"])}" data-v-13a1d92e>${ssrInterpolate(confirmButtonLabel.value)}</button><button type="button" class="imd-confirm-back-btn" data-v-13a1d92e>Go back</button></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/InsuranceManagementDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const InsuranceManagementDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-13a1d92e"]]);
const lastDataReceived = "30/09/2024";
const expiryDate = "30/03/2025";
const _sfc_main = {
  __name: "InsuranceManagementConnections",
  __ssrInlineRender: true,
  props: {
    perspective: { type: String, default: "tpp" },
    headerColor: { type: String, default: "" }
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
      insuranceType: "All",
      consentState: "All"
    });
    const HISTORY_STATUSES = /* @__PURE__ */ new Set(["Rejected", "Expired", "Revoked"]);
    const VALID_CONSENT_STATUSES = [
      "AwaitingAuthorization",
      "Authorized",
      "Rejected",
      "Suspended",
      "Paused",
      "Expired",
      "Revoked"
    ];
    const VALID_INSURANCE_TYPES = ["Motor", "Health", "Home", "Life", "Travel", "Renters", "Employment"];
    const defaultConnections = [
      {
        id: 1,
        lfiDigit: 3,
        status: "Authorized",
        baseConsentId: 2,
        types: [{ type: "Motor", permissions: ["ReadInsurancePolicies"] }]
      },
      {
        id: 2,
        lfiDigit: 7,
        status: "Authorized",
        baseConsentId: "",
        types: [
          { type: "Health", permissions: ["ReadInsurancePolicies", "ReadInsurancePremium"] },
          { type: "Life", permissions: ["ReadInsurancePolicies"] }
        ]
      }
    ];
    function normalizeTypeEntry(entry) {
      const type = VALID_INSURANCE_TYPES.includes(entry == null ? void 0 : entry.type) ? entry.type : "Motor";
      const permissions = Array.isArray(entry == null ? void 0 : entry.permissions) ? entry.permissions : [];
      return { type, permissions };
    }
    function normalizeConnection(connection, fallback) {
      const numericLfi = Number(connection == null ? void 0 : connection.lfiDigit);
      const lfiDigit = Number.isInteger(numericLfi) && numericLfi >= 1 && numericLfi <= 9 ? numericLfi : fallback.lfiDigit;
      const status = VALID_CONSENT_STATUSES.includes(connection == null ? void 0 : connection.status) ? connection.status : fallback.status;
      const rawTypes = Array.isArray(connection == null ? void 0 : connection.types) && connection.types.length > 0 ? connection.types : fallback.types;
      const types = rawTypes.map(normalizeTypeEntry);
      const id = connection == null ? void 0 : connection.id;
      const baseConsentId = (connection == null ? void 0 : connection.baseConsentId) || void 0;
      return { id, lfiDigit, status, types, baseConsentId };
    }
    const resolvedConnections = computed(() => {
      var _a;
      const configured = (_a = sharedState.value) == null ? void 0 : _a.insuranceConsentConnections;
      if (!Array.isArray(configured) || configured.length === 0) return defaultConnections;
      return configured.map(
        (connection, index) => normalizeConnection(connection, defaultConnections[index % defaultConnections.length])
      );
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
      () => resolvedConnections.value.filter((c) => !HISTORY_STATUSES.has(c.status))
    );
    const historyConnections = computed(
      () => resolvedConnections.value.filter((c) => HISTORY_STATUSES.has(c.status))
    );
    function connectionTypes(connection) {
      return Array.isArray(connection == null ? void 0 : connection.types) ? connection.types.map((t) => t.type) : [];
    }
    const displayedConnections = computed(
      () => (activeTab.value === "history" ? historyConnections.value : currentConnections.value).filter((connection) => {
        if (filters.lfiName !== "All" && `${entityLabel.value} ${connection.lfiDigit}` !== filters.lfiName) return false;
        if (filters.insuranceType !== "All" && !connectionTypes(connection).includes(filters.insuranceType)) return false;
        if (filters.consentState !== "All" && connection.status !== filters.consentState) return false;
        return true;
      })
    );
    const appliedFilters = computed(() => {
      return [
        { key: "lfiName", value: filters.lfiName },
        { key: "insuranceType", value: filters.insuranceType },
        { key: "consentState", value: filters.consentState }
      ].filter((e) => e.value !== "All").map((e) => ({ key: e.key, value: String(e.value) }));
    });
    const lfiOptions = computed(() => {
      const prefix = entityLabel.value;
      const values = Array.from(new Set(resolvedConnections.value.map((c) => `${prefix} ${c.lfiDigit}`))).sort((a, b) => Number(a.replace(`${prefix} `, "")) - Number(b.replace(`${prefix} `, "")));
      return ["All", ...values];
    });
    const insuranceTypeOptions = computed(() => {
      const values = /* @__PURE__ */ new Set();
      for (const c of resolvedConnections.value) {
        for (const t of connectionTypes(c)) values.add(t);
      }
      return ["All", ...Array.from(values)];
    });
    const consentStateOptions = computed(() => {
      const values = Array.from(new Set(resolvedConnections.value.map((c) => c.status)));
      return ["All", ...values];
    });
    function policyCountLabel(connection) {
      const count = generateConsentPolicies(connection).length;
      return count === 1 ? "1 Policy Connected" : `${count} Policies Connected`;
    }
    function insuranceTypeListLabel(connection) {
      return connectionTypes(connection).map((t) => insuranceTypeLabels[t] || t).join(", ");
    }
    function statusClass(status) {
      if (status === "Authorized") return "insurance-management-status-authorized";
      if (status === "AwaitingAuthorization") return "insurance-management-status-awaiting";
      if (status === "Suspended") return "insurance-management-status-suspended";
      if (status === "Paused") return "insurance-management-status-paused";
      if (status === "Expired") return "insurance-management-status-expired";
      if (status === "Rejected" || status === "Revoked") return "insurance-management-status-rejected";
      return "insurance-management-status-awaiting";
    }
    const STATUS_LABELS = {
      "Authorized": "Active",
      "Revoked": "Cancelled",
      "AwaitingAuthorization": "Pending"
    };
    function displayStatus(status) {
      return STATUS_LABELS[status] ?? status;
    }
    const connectionSubtitle = computed(() => {
      if (isLfi.value) return "These are the third party providers connected to your insurance policies";
      return "These are the insurance providers we are connected to for data sharing";
    });
    const tooltipText = computed(() => {
      if (isLfi.value) return {
        p1: "This page gives you an overview of the insurance data-sharing permissions you have given to third party providers.",
        p2: "They will continue to access your policy data on your behalf until the permission ends or you cancel."
      };
      return {
        p1: "This page gives you an overview of the insurance data-sharing permissions you have given to us.",
        p2: "We will continue to access your policy data on your behalf until the permission ends or you cancel."
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (selectedConnection.value) {
        _push(ssrRenderComponent(InsuranceManagementDetail, mergeProps({
          connection: selectedConnection.value,
          "all-connections": resolvedConnections.value,
          perspective: __props.perspective,
          "header-color": __props.headerColor,
          onBack: ($event) => selectConnection(null),
          onNavigate: ($event) => selectConnection($event)
        }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["insurance-management-frame", { "insurance-management-lfi": isLfi.value }],
          style: __props.headerColor ? { "--cmi-header-color": __props.headerColor } : void 0
        }, _attrs))} data-v-f211d64c><div class="insurance-management-screen-name" data-v-f211d64c><div class="insurance-management-screen-bar" data-v-f211d64c></div><svg class="insurance-management-arrow-left" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-f211d64c><path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-f211d64c></path></svg><div class="insurance-management-screen-title" data-v-f211d64c>${ssrInterpolate(barTitle.value)}</div></div><div class="insurance-management-card-shell" data-v-f211d64c><div class="insurance-management-card" data-v-f211d64c><div class="insurance-management-header" data-v-f211d64c><div class="insurance-management-main-title" data-v-f211d64c>AlTareq Connections</div><div class="insurance-management-subtitle" data-v-f211d64c>${ssrInterpolate(connectionSubtitle.value)}</div></div><div class="insurance-management-manage-hint" data-v-f211d64c><span data-v-f211d64c>Tap Manage to view, update or disconnect</span><div class="insurance-management-info-trigger" data-v-f211d64c><button type="button" class="insurance-management-info-button" aria-describedby="insurance-management-info-tooltip" data-v-f211d64c><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-f211d64c><circle cx="8" cy="8" r="6.75" stroke="#0C1441" stroke-width="1.25" data-v-f211d64c></circle><path d="M8 4.5V4.7" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" data-v-f211d64c></path><path d="M8 7V11" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" data-v-f211d64c></path></svg></button><div id="insurance-management-info-tooltip" class="insurance-management-info-message" role="tooltip" data-v-f211d64c><p data-v-f211d64c>${ssrInterpolate(tooltipText.value.p1)}</p><p data-v-f211d64c>${ssrInterpolate(tooltipText.value.p2)}</p></div></div></div><div class="insurance-management-controls" data-v-f211d64c><div class="insurance-management-filter" data-v-f211d64c><div class="insurance-management-filter-row" data-v-f211d64c><button type="button" class="insurance-management-filter-toggle"${ssrRenderAttr("aria-expanded", isFilterPanelOpen.value)} data-v-f211d64c><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-f211d64c><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="#36BFD4" fill-opacity="0.12" stroke="#36BFD4" data-v-f211d64c></rect><path d="M7.5 8H16.5L12.5 12V16L11 15.25V12L7.5 8Z" fill="#36BFD4" data-v-f211d64c></path></svg><span data-v-f211d64c>Filter</span></button></div>`);
        if (isFilterPanelOpen.value) {
          _push(`<div class="insurance-management-filter-fields" data-v-f211d64c><label class="insurance-management-filter-field" data-v-f211d64c><span class="insurance-management-filter-field-label" data-v-f211d64c>${ssrInterpolate(filterEntityLabel.value)}</span><select class="insurance-management-filter-select" data-v-f211d64c><!--[-->`);
          ssrRenderList(lfiOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-f211d64c${ssrIncludeBooleanAttr(Array.isArray(filters.lfiName) ? ssrLooseContain(filters.lfiName, option) : ssrLooseEqual(filters.lfiName, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label><label class="insurance-management-filter-field" data-v-f211d64c><span class="insurance-management-filter-field-label" data-v-f211d64c>Insurance Type</span><select class="insurance-management-filter-select" data-v-f211d64c><!--[-->`);
          ssrRenderList(insuranceTypeOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-f211d64c${ssrIncludeBooleanAttr(Array.isArray(filters.insuranceType) ? ssrLooseContain(filters.insuranceType, option) : ssrLooseEqual(filters.insuranceType, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label><label class="insurance-management-filter-field" data-v-f211d64c><span class="insurance-management-filter-field-label" data-v-f211d64c>Consent State</span><select class="insurance-management-filter-select" data-v-f211d64c><!--[-->`);
          ssrRenderList(consentStateOptions.value, (option) => {
            _push(`<option${ssrRenderAttr("value", option)} data-v-f211d64c${ssrIncludeBooleanAttr(Array.isArray(filters.consentState) ? ssrLooseContain(filters.consentState, option) : ssrLooseEqual(filters.consentState, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
          });
          _push(`<!--]--></select></label></div>`);
        } else {
          _push(`<!---->`);
        }
        if (appliedFilters.value.length > 0) {
          _push(`<div class="insurance-management-applied-filters" data-v-f211d64c><div class="insurance-management-chips" data-v-f211d64c><div class="insurance-management-chips-row" data-v-f211d64c><!--[-->`);
          ssrRenderList(appliedFilters.value, (filter) => {
            _push(`<button type="button" class="insurance-management-chip" data-v-f211d64c><span class="insurance-management-chip-text" data-v-f211d64c>${ssrInterpolate(filter.value)}</span><svg class="insurance-management-chip-remove" width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-f211d64c><path d="M1 1L5 5" data-v-f211d64c></path><path d="M5 1L1 5" data-v-f211d64c></path></svg></button>`);
          });
          _push(`<!--]--><button type="button" class="insurance-management-chip insurance-management-chip-clear" data-v-f211d64c><span class="insurance-management-chip-text" data-v-f211d64c>Clear</span></button></div><div class="insurance-management-results" data-v-f211d64c>Results: ${ssrInterpolate(displayedConnections.value.length)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="insurance-management-divider" data-v-f211d64c></div><div class="insurance-management-tabs" data-v-f211d64c><button type="button" class="${ssrRenderClass([{ "insurance-management-tab-active": activeTab.value === "current" }, "insurance-management-tab"])}" data-v-f211d64c> Current </button><button type="button" class="${ssrRenderClass([{ "insurance-management-tab-active": activeTab.value === "history" }, "insurance-management-tab"])}" data-v-f211d64c> History </button></div><div class="insurance-management-connection-list" data-v-f211d64c><!--[-->`);
        ssrRenderList(displayedConnections.value, (connection, index) => {
          _push(`<div class="insurance-management-connection" role="button" tabindex="0" data-v-f211d64c><div class="insurance-management-connection-header" data-v-f211d64c><div class="insurance-management-connection-name" data-v-f211d64c>[${ssrInterpolate(entityLabel.value)} ${ssrInterpolate(connection.lfiDigit)}]</div><div class="${ssrRenderClass([statusClass(connection.status), "insurance-management-status"])}" data-v-f211d64c>${ssrInterpolate(displayStatus(connection.status))}</div></div><div class="insurance-management-connection-count" data-v-f211d64c>${ssrInterpolate(policyCountLabel(connection))}</div><div class="insurance-management-connection-meta insurance-management-connection-meta-row" data-v-f211d64c><span class="insurance-management-connection-meta-label" data-v-f211d64c>${ssrInterpolate(connectionTypes(connection).length > 1 ? "Insurance Types:" : "Insurance Type:")}</span><span class="insurance-management-connection-meta-value" data-v-f211d64c>${ssrInterpolate(insuranceTypeListLabel(connection))}</span></div><div class="insurance-management-connection-meta insurance-management-connection-meta-row" data-v-f211d64c><span class="insurance-management-connection-meta-label" data-v-f211d64c>Last data received:</span><span class="insurance-management-connection-meta-value" data-v-f211d64c>${ssrInterpolate(lastDataReceived)}</span></div><div class="insurance-management-connection-meta insurance-management-connection-meta-row" data-v-f211d64c><span class="insurance-management-connection-meta-label" data-v-f211d64c>Connection expires:</span><span class="insurance-management-connection-meta-value" data-v-f211d64c>${ssrInterpolate(expiryDate)}</span></div><svg class="insurance-management-chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-f211d64c><path d="M9 18l6-6-6-6" data-v-f211d64c></path></svg></div>`);
        });
        _push(`<!--]-->`);
        if (displayedConnections.value.length === 0) {
          _push(`<div class="insurance-management-empty-state" data-v-f211d64c>`);
          if (isLfi.value) {
            _push(`<!--[--> No connections yet <br data-v-f211d64c> <br data-v-f211d64c> You do not have any AlTareq connections in this tab. <!--]-->`);
          } else {
            _push(`<!--[--> No connections yet <br data-v-f211d64c> <br data-v-f211d64c> You don’t have any consents in this tab. <br data-v-f211d64c> <br data-v-f211d64c> Connect a policy to get started. <!--]-->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        if (!isLfi.value) {
          _push(`<div class="insurance-management-footer" data-v-f211d64c><button type="button" class="insurance-management-cta" data-v-f211d64c>Connect another policy</button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/InsuranceManagementConnections.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f211d64c"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_3 as a
};
