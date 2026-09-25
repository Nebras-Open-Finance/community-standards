import { defineComponent, ref, computed, reactive, mergeProps, unref, createVNode, resolveDynamicComponent, h, useSSRContext, watch } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderVNode, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { a as _imports_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { a as formatDateTime } from "./formatDate-CaaKrjgT.js";
import { c as insurancePolicyStatusGroup, i as insuranceTypeLabels, a as insurancePermissionGroups, b as insurancePermissionDescriptions, S as STATUS_LABELS, A as ALL_STATUSES } from "./insurancePolicyStatus-7keZa3ks.js";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AuthorizationInsuranceDataSharing",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState, consentData } = useSharedState();
    const show_inactive = ref(false);
    const show_information = ref(true);
    const openRows = ref({});
    const rowKey = (insuranceType, permission) => `${insuranceType}::${permission}`;
    const isOpen = (insuranceType, permission) => !!openRows.value[rowKey(insuranceType, permission)];
    const insuranceGroups = computed(() => {
      var _a;
      const raw = (_a = consentData.value) == null ? void 0 : _a.Permissions;
      if (!Array.isArray(raw)) return [];
      return raw.filter(
        (g) => g && typeof g === "object" && typeof g.InsuranceType === "string" && Array.isArray(g.Permissions)
      );
    });
    const DEFAULT_POLICIES = [
      { id: 1, insuranceType: "Motor", status: "New", policyNumber: "MOT-2026-0001", premium: 2400, startDate: "2025-11-26", endDate: "2026-11-26" },
      { id: 2, insuranceType: "Health", status: "Renewed", policyNumber: "HLT-2026-0001", premium: 6800, startDate: "2025-11-26", endDate: "2026-11-26" },
      { id: 3, insuranceType: "Travel", status: "Expired", policyNumber: "TRV-2026-0001", premium: 320, startDate: "2024-05-25", endDate: "2025-04-25" }
    ];
    const policies = computed(() => {
      var _a;
      return ((_a = sharedState.value) == null ? void 0 : _a.policies) ?? DEFAULT_POLICIES;
    });
    const requestedTypes = computed(() => {
      var _a;
      const groups = (_a = consentData.value) == null ? void 0 : _a.Permissions;
      if (!Array.isArray(groups)) return /* @__PURE__ */ new Set();
      return new Set(groups.map((g) => g == null ? void 0 : g.InsuranceType).filter((t) => typeof t === "string"));
    });
    const visiblePolicies = computed(
      () => policies.value.filter((p) => requestedTypes.value.has(p.insuranceType))
    );
    const activePolicies = computed(
      () => visiblePolicies.value.filter((p) => insurancePolicyStatusGroup(p.status) === "active")
    );
    const inactivePolicies = computed(
      () => visiblePolicies.value.filter((p) => insurancePolicyStatusGroup(p.status) === "inactive")
    );
    const selectedPolicies = reactive({});
    function policyTitle(policy) {
      return `${policy.insuranceType} Insurance`;
    }
    function statusLabel(status) {
      return STATUS_LABELS[status] ?? status;
    }
    function formatDateOnly(iso) {
      if (!iso) return "";
      const [y, m, d] = iso.split("-");
      if (!y || !m || !d) return iso;
      return `${d}/${m}/${y}`;
    }
    const iconBase = (paths) => () => h(
      "svg",
      { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
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
    const icons = {
      // receipt-edit
      ReadInsurancePolicies: iconBase([
        { d: "M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H15C16.1 2.5 17 3.4 17 4.5V20L14.5 18.5L12 20L9.5 18.5L7 20L4.5 18.5L2 20V4.5C2 3.4 2.9 2.5 4 2.5" },
        { d: "M8 7H13" },
        { d: "M9 11H12" },
        { d: "M19.2 14.8L15.7 18.3C15.6 18.5 15.5 18.7 15.4 18.9L15.2 20.3C15.1 20.7 15.5 21.1 16 21L17.3 20.8C17.5 20.8 17.8 20.7 17.9 20.5L21.4 17C22 16.4 22.3 15.7 21.4 14.8C20.5 13.9 19.8 14.2 19.2 14.8Z" }
      ]),
      // user
      ReadCustomerBasic: iconBase([
        { d: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" },
        { d: "M19 21C19 17.13 15.87 14 12 14C8.13 14 5 17.13 5 21" }
      ]),
      // document-text
      ReadCustomerDetail: iconBase([
        { d: "M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" },
        { d: "M22 10H18C15 10 14 9 14 6V2L22 10Z" },
        { d: "M8 13H13" },
        { d: "M8 17H11" }
      ]),
      // element-equal
      ReadInsuranceProduct: iconBase([
        { d: "M18 9.5H16C14 9.5 14 8.5 14 7.5V5.5C14 3.5 15 2.5 17 2.5H21C22 2.5 22 3.5 22 5.5V7.5C22 8.5 22 9.5 21 9.5H18Z" },
        { d: "M6 9.5H8C10 9.5 10 8.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H3C2 2.5 2 3.5 2 5.5V7.5C2 8.5 2 9.5 3 9.5H6Z" },
        { d: "M6 21.5H8C10 21.5 10 20.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H3C2 14.5 2 15.5 2 17.5V19.5C2 20.5 2 21.5 3 21.5H6Z" },
        { d: "M14 17.5H21" },
        { d: "M14 20.5H21" }
      ]),
      // dollar-circle
      ReadInsurancePremium: iconBase([
        { d: "M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" },
        { d: "M12 6V18" },
        { d: "M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z" }
      ]),
      // wallet-2
      ReadCustomerPaymentDetails: iconBase([
        { d: "M7 11H14" },
        { d: "M18 14.5H17C16 14.5 15 13.7 15 12.5C15 11.4 15.9 10.5 17 10.5H18C19.1 10.5 20 11.4 20 12.5C20 13.7 19.1 14.5 18 14.5Z" },
        { d: "M20 10.5V13.5C20 17.5 18 19.5 14 19.5H8C4 19.5 2 17.5 2 13.5V7.5C2 4 4 2 7.5 2H14C18 2 20 4 20 8" }
      ]),
      // more-circle
      ReadCustomerClaims: iconBase([
        { d: "M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" },
        { d: "M15.9965 12H16.0054", "stroke-width": 2 },
        { d: "M11.9955 12H12.0045", "stroke-width": 2 },
        { d: "M7.99451 12H8.00349", "stroke-width": 2 }
      ])
    };
    const permissionIcon = (permission) => icons[permission] || icons.ReadInsurancePolicies;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page-frame" }, _attrs))} data-v-e702d501><div class="auth-page-header" data-v-e702d501><div class="auth-page-screen-name" data-v-e702d501><div class="auth-page-tpp-text" data-v-e702d501>LFI</div><svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-e702d501></path></svg><div class="auth-page-rectangle" data-v-e702d501></div></div><div class="auth-page-contents" data-v-e702d501><img class="auth-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-e702d501><div class="auth-page-progress" data-v-e702d501><div class="auth-page-progress-1" data-v-e702d501><div class="auth-page-progress-icon-active" data-v-e702d501><svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-e702d501></path></svg></div><div class="auth-page-progress-text" data-v-e702d501>Consent</div></div><div class="auth-page-progress-2" data-v-e702d501><div class="auth-page-progress-icon-active" data-v-e702d501><div class="auth-page-progress-icon-text-active" data-v-e702d501>2</div></div><div class="auth-page-progress-text" data-v-e702d501>Authorize</div></div><div class="auth-page-progress-3" data-v-e702d501><div class="auth-page-progress-icon" data-v-e702d501><div class="auth-page-progress-icon-text" data-v-e702d501>3</div></div><div class="auth-page-progress-text" data-v-e702d501>Complete</div></div><svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-e702d501></path><path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" data-v-e702d501></path></svg></div></div></div>`);
      if (visiblePolicies.value.length > 0) {
        _push(`<div class="auth-page-text-frame" data-v-e702d501><div class="auth-page-text-inner-frame" data-v-e702d501><div class="auth-page-text-header" data-v-e702d501> Select policy(ies) to share information with ${ssrInterpolate(((_b = (_a = unref(consentData)) == null ? void 0 : _a.OnBehalfOf) == null ? void 0 : _b.TradingName) || "[TPP Trading Name]")}</div>`);
        if (activePolicies.value.length) {
          _push(`<div class="ins-status-group" data-v-e702d501><div class="ins-status-group-header" data-v-e702d501><div class="ins-status-group-head-left" data-v-e702d501><svg class="ins-status-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><circle cx="8.5" cy="8.5" r="6.95" fill="#22A35D" fill-opacity="0.4" data-v-e702d501></circle><path d="M5.5 8.7L7.7 10.9L11.7 6.5" stroke="#22A35D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" data-v-e702d501></path></svg><div class="ins-status-group-title" data-v-e702d501>Active Policies</div></div></div><div class="ins-policy-list" data-v-e702d501><!--[-->`);
          ssrRenderList(activePolicies.value, (policy) => {
            _push(`<div class="ins-policy-card" data-v-e702d501><div class="ins-policy-card-head" data-v-e702d501><div class="ins-policy-card-title" data-v-e702d501>${ssrInterpolate(policyTitle(policy))}</div><div class="${ssrRenderClass([{ "is-active": selectedPolicies[policy.id] }, "ins-policy-checkbox"])}" data-v-e702d501>`);
            if (selectedPolicies[policy.id]) {
              _push(`<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white" data-v-e702d501></path></svg>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="ins-policy-card-meta" data-v-e702d501><div class="ins-policy-card-row ins-policy-card-row--ref" data-v-e702d501>${ssrInterpolate(policy.policyNumber)}</div><div class="ins-policy-card-row" data-v-e702d501><span class="ins-policy-card-row-label" data-v-e702d501>Premium</span>`);
            _push(ssrRenderComponent(DirhamAmount, {
              class: "ins-policy-card-row-value",
              amount: policy.premium.toLocaleString()
            }, null, _parent));
            _push(`</div><div class="ins-policy-card-row" data-v-e702d501><span class="ins-policy-card-row-label" data-v-e702d501>Valid until</span><span class="ins-policy-card-row-value" data-v-e702d501>${ssrInterpolate(formatDateOnly(policy.endDate))}</span></div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (inactivePolicies.value.length) {
          _push(`<div class="ins-status-group" data-v-e702d501><div class="ins-status-group-header is-collapsible" data-v-e702d501><div class="ins-status-group-head-left" data-v-e702d501><svg class="ins-status-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><circle cx="8.5" cy="8.5" r="6.95" fill="#FDAA35" fill-opacity="0.4" data-v-e702d501></circle><path d="M8.5 5.2V8.5L10.3 9.7" stroke="#FDAA35" stroke-width="1.4" stroke-linecap="round" fill="none" data-v-e702d501></path></svg><div class="ins-status-group-title" data-v-e702d501>Inactive Policies</div></div><svg class="${ssrRenderClass([{ "is-open": show_inactive.value }, "ins-status-group-arrow"])}" width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z" fill="black" fill-opacity="0.4" data-v-e702d501></path></svg></div>`);
          if (show_inactive.value) {
            _push(`<div class="ins-policy-list" data-v-e702d501><!--[-->`);
            ssrRenderList(inactivePolicies.value, (policy) => {
              _push(`<div class="ins-policy-card ins-policy-card--inactive" data-v-e702d501><div class="ins-policy-card-head" data-v-e702d501><div class="ins-policy-card-title-section" data-v-e702d501><div class="ins-policy-card-title" data-v-e702d501>${ssrInterpolate(policyTitle(policy))}</div><div class="ins-policy-card-status" data-v-e702d501>${ssrInterpolate(statusLabel(policy.status))}</div></div><div class="${ssrRenderClass([{ "is-active": selectedPolicies[policy.id] }, "ins-policy-checkbox"])}" data-v-e702d501>`);
              if (selectedPolicies[policy.id]) {
                _push(`<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white" data-v-e702d501></path></svg>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div><div class="ins-policy-card-meta" data-v-e702d501><div class="ins-policy-card-row ins-policy-card-row--ref" data-v-e702d501>${ssrInterpolate(policy.policyNumber)}</div><div class="ins-policy-card-row" data-v-e702d501><span class="ins-policy-card-row-label" data-v-e702d501>Valid until</span><span class="ins-policy-card-row-value" data-v-e702d501>${ssrInterpolate(formatDateOnly(policy.endDate))}</span></div></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (insuranceGroups.value.length) {
          _push(`<div class="auth-page-text-inner-frame-2" data-v-e702d501><div class="auth-page-text-mini-header-section" data-v-e702d501><div class="auth-page-text-mini-header-section-header" data-v-e702d501><div class="auth-page-text-min-header-section-header-text" data-v-e702d501> Review the information you will share </div><svg class="${ssrRenderClass([{ "is-open": show_information.value }, "auth-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-e702d501></path></svg></div></div>`);
          if (show_information.value) {
            _push(`<div class="auth-page-text-section ins-auth-review" data-v-e702d501><!--[-->`);
            ssrRenderList(insuranceGroups.value, (group) => {
              _push(`<div class="ins-auth-type-section" data-v-e702d501><div class="ins-auth-type-heading" data-v-e702d501>${ssrInterpolate(unref(insuranceTypeLabels)[group.InsuranceType] || `${group.InsuranceType} Insurance`)}</div><!--[-->`);
              ssrRenderList(unref(insurancePermissionGroups), (row) => {
                var _a2;
                _push(`<!--[-->`);
                if ((_a2 = group.Permissions) == null ? void 0 : _a2.includes(row.permission)) {
                  _push(`<div class="auth-page-dropdown-container" data-v-e702d501><div class="auth-page-dropdown" data-v-e702d501><div class="auth-page-dropdown-text-section" data-v-e702d501>`);
                  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(permissionIcon(row.permission)), null, null), _parent);
                  _push(`<div class="auth-page-dropdown-text" data-v-e702d501>${ssrInterpolate(row.label)}</div></div><svg class="${ssrRenderClass([{ "is-open": isOpen(group.InsuranceType, row.permission) }, "auth-page-dropdown-arrow"])}" width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z" fill="black" fill-opacity="0.4" data-v-e702d501></path></svg></div>`);
                  if (isOpen(group.InsuranceType, row.permission)) {
                    _push(`<div class="auth-page-dropdown-subtext-section" data-v-e702d501><div class="auth-page-dropdown-subtext" data-v-e702d501>${ssrInterpolate(unref(insurancePermissionDescriptions)[row.permission])}</div></div>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`</div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<!--]-->`);
              });
              _push(`<!--]--></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="auth-page-date-range" data-v-e702d501><svg class="auth-page-divider" width="292" height="2" viewBox="0 0 292 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><rect width="292" height="2" fill="#D9D9D9" fill-opacity="0.1" data-v-e702d501></rect></svg><div class="auth-page-dropdown" style="${ssrRenderStyle({ "cursor": "default" })}" data-v-e702d501><div class="auth-page-date" data-v-e702d501><div class="auth-page-date-text" data-v-e702d501>We will share your data until</div><div class="auth-page-date-2" data-v-e702d501><div class="auth-page-date-3" data-v-e702d501><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M5.33301 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M10.667 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M2.33301 6.05859H13.6663" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path></svg><div class="auth-page-date-text" data-v-e702d501>${ssrInterpolate(unref(formatDateTime)((_c = unref(consentData)) == null ? void 0 : _c.ExpirationDateTime))}</div></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="auth-page-text-frame" data-v-e702d501><div class="auth-page-text-inner-frame" data-v-e702d501><div class="auth-page-text-header" data-v-e702d501>Something went wrong</div><div class="auth-page-error-image-container" data-v-e702d501><svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path><path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-e702d501></path></svg></div><div class="auth-page-text" data-v-e702d501> We couldn’t find any policies that match the insurance type(s) requested, so unfortunately we’re unable to share any information with ${ssrInterpolate(((_e = (_d = unref(consentData)) == null ? void 0 : _d.OnBehalfOf) == null ? void 0 : _e.TradingName) || "[TPP Trading Name]")}. </div></div></div>`);
      }
      _push(`<div class="${ssrRenderClass([{ "auth-page-button-with-description--error": visiblePolicies.value.length === 0 }, "auth-page-button-with-description"])}" data-v-e702d501><div class="auth-page-button" data-v-e702d501><div class="auth-page-button-text-section" data-v-e702d501><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e702d501><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-e702d501></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_ins_auth)" data-v-e702d501></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_ins_auth)" data-v-e702d501></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_ins_auth)" data-v-e702d501></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_ins_auth)" data-v-e702d501></path><defs data-v-e702d501><linearGradient id="paint0_linear_ins_auth" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-e702d501><stop stop-color="#4083E1" data-v-e702d501></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-e702d501></stop><stop offset="0.48" stop-color="#36B1CC" data-v-e702d501></stop><stop offset="0.8" stop-color="#31C9C1" data-v-e702d501></stop><stop offset="1" stop-color="#30D2BE" data-v-e702d501></stop></linearGradient><linearGradient id="paint1_linear_ins_auth" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-e702d501><stop stop-color="#80ACEB" data-v-e702d501></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-e702d501></stop><stop offset="0.73" stop-color="#76D8D7" data-v-e702d501></stop><stop offset="1" stop-color="#75E1D4" data-v-e702d501></stop></linearGradient><linearGradient id="paint2_linear_ins_auth" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-e702d501><stop stop-color="#BFD6F5" data-v-e702d501></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-e702d501></stop><stop offset="1" stop-color="#BAF0E9" data-v-e702d501></stop></linearGradient><radialGradient id="paint3_radial_ins_auth" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-e702d501><stop stop-color="#40E0C7" data-v-e702d501></stop><stop offset="0.304248" stop-color="#0050C8" data-v-e702d501></stop><stop offset="0.623256" stop-color="white" data-v-e702d501></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-e702d501>${ssrInterpolate(visiblePolicies.value.length > 0 ? "Authorize using AlTareq" : "Close")}</div></div></div>`);
      if (visiblePolicies.value.length > 0) {
        _push(`<div class="auth-page-button-cancel" data-v-e702d501><div class="auth-page-button-cancel-text" data-v-e702d501>Cancel</div></div>`);
      } else {
        _push(`<div class="auth-page-button-description" data-v-e702d501> By pressing Close you will be returned to ${ssrInterpolate(((_g = (_f = unref(consentData)) == null ? void 0 : _f.OnBehalfOf) == null ? void 0 : _g.TradingName) || "[TPP Trading Name]")}. No data will be shared. </div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/authorization-ui/AuthorizationInsuranceDataSharing.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e702d501"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ConsentInsuranceDataSharing",
  __ssrInlineRender: true,
  setup(__props) {
    const { consentData } = useSharedState();
    const show_tpp_why = ref(false);
    const openRows = ref({});
    const rowKey = (insuranceType, permission) => `${insuranceType}::${permission}`;
    const isOpen = (insuranceType, permission) => !!openRows.value[rowKey(insuranceType, permission)];
    const insuranceGroups = computed(() => {
      var _a;
      const raw = (_a = consentData.value) == null ? void 0 : _a.Permissions;
      if (!Array.isArray(raw)) return [];
      return raw.filter(
        (g) => g && typeof g === "object" && typeof g.InsuranceType === "string" && Array.isArray(g.Permissions)
      );
    });
    const iconBase = (paths) => () => h(
      "svg",
      { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
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
    const icons = {
      // receipt-edit
      ReadInsurancePolicies: iconBase([
        { d: "M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H15C16.1 2.5 17 3.4 17 4.5V20L14.5 18.5L12 20L9.5 18.5L7 20L4.5 18.5L2 20V4.5C2 3.4 2.9 2.5 4 2.5" },
        { d: "M8 7H13" },
        { d: "M9 11H12" },
        { d: "M19.2 14.8L15.7 18.3C15.6 18.5 15.5 18.7 15.4 18.9L15.2 20.3C15.1 20.7 15.5 21.1 16 21L17.3 20.8C17.5 20.8 17.8 20.7 17.9 20.5L21.4 17C22 16.4 22.3 15.7 21.4 14.8C20.5 13.9 19.8 14.2 19.2 14.8Z" }
      ]),
      // user
      ReadCustomerBasic: iconBase([
        { d: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" },
        { d: "M19 21C19 17.13 15.87 14 12 14C8.13 14 5 17.13 5 21" }
      ]),
      // document-text
      ReadCustomerDetail: iconBase([
        { d: "M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" },
        { d: "M22 10H18C15 10 14 9 14 6V2L22 10Z" },
        { d: "M8 13H13" },
        { d: "M8 17H11" }
      ]),
      // element-equal
      ReadInsuranceProduct: iconBase([
        { d: "M18 9.5H16C14 9.5 14 8.5 14 7.5V5.5C14 3.5 15 2.5 17 2.5H21C22 2.5 22 3.5 22 5.5V7.5C22 8.5 22 9.5 21 9.5H18Z" },
        { d: "M6 9.5H8C10 9.5 10 8.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H3C2 2.5 2 3.5 2 5.5V7.5C2 8.5 2 9.5 3 9.5H6Z" },
        { d: "M6 21.5H8C10 21.5 10 20.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H3C2 14.5 2 15.5 2 17.5V19.5C2 20.5 2 21.5 3 21.5H6Z" },
        { d: "M14 17.5H21" },
        { d: "M14 20.5H21" }
      ]),
      // dollar-circle
      ReadInsurancePremium: iconBase([
        { d: "M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" },
        { d: "M12 6V18" },
        { d: "M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z" }
      ]),
      // wallet-2
      ReadCustomerPaymentDetails: iconBase([
        { d: "M7 11H14" },
        { d: "M18 14.5H17C16 14.5 15 13.7 15 12.5C15 11.4 15.9 10.5 17 10.5H18C19.1 10.5 20 11.4 20 12.5C20 13.7 19.1 14.5 18 14.5Z" },
        { d: "M20 10.5V13.5C20 17.5 18 19.5 14 19.5H8C4 19.5 2 17.5 2 13.5V7.5C2 4 4 2 7.5 2H14C18 2 20 4 20 8" }
      ]),
      // more-circle
      ReadCustomerClaims: iconBase([
        { d: "M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" },
        { d: "M15.9965 12H16.0054", "stroke-width": 2 },
        { d: "M11.9955 12H12.0045", "stroke-width": 2 },
        { d: "M7.99451 12H8.00349", "stroke-width": 2 }
      ])
    };
    const permissionIcon = (permission) => icons[permission] || icons.ReadInsurancePolicies;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consent-page-frame" }, _attrs))} data-v-acfcb8c1><div class="consent-page-header" data-v-acfcb8c1><div class="consent-page-screen-name" data-v-acfcb8c1><div class="consent-page-tpp-text" data-v-acfcb8c1> TPP </div><svg class="consent-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-acfcb8c1></path></svg><div class="consent-page-rectangle" data-v-acfcb8c1></div></div><div class="consent-page-contents" data-v-acfcb8c1><img class="consent-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-acfcb8c1><div class="consent-page-progress" data-v-acfcb8c1><div class="consent-page-progress-1" data-v-acfcb8c1><div class="consent-page-progress-icon-active" data-v-acfcb8c1><div class="consent-page-progress-icon-text-active" data-v-acfcb8c1>1</div></div><div class="consent-page-progress-text" data-v-acfcb8c1>Consent</div></div><div class="consent-page-progress-2" data-v-acfcb8c1><div class="consent-page-progress-icon" data-v-acfcb8c1><div class="consent-page-progress-icon-text" data-v-acfcb8c1>2</div></div><div class="consent-page-progress-text" data-v-acfcb8c1>Authorize</div></div><div class="consent-page-progress-3" data-v-acfcb8c1><div class="consent-page-progress-icon" data-v-acfcb8c1><div class="consent-page-progress-icon-text" data-v-acfcb8c1>3</div></div><div class="consent-page-progress-text" data-v-acfcb8c1>Complete</div></div><svg class="consent-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-acfcb8c1></path><path d="M0.5 1H53.5" stroke="#00C8AF" stroke-width="2" data-v-acfcb8c1></path></svg></div></div></div><div class="consent-page-text-frame" data-v-acfcb8c1><div class="consent-page-text-inner-frame" data-v-acfcb8c1><div class="consent-page-text-header" data-v-acfcb8c1> Share your policy(ies) </div><div class="consent-page-text-section" data-v-acfcb8c1><div class="consent-page-text" data-v-acfcb8c1> For you to use this service, ${ssrInterpolate(((_b = (_a = unref(consentData)) == null ? void 0 : _a.OnBehalfOf) == null ? void 0 : _b.TradingName) || "[TPP Trading Name]")} need to access information from your insurance policy(ies). </div><div class="consent-page-dropdown-container" data-v-acfcb8c1><div class="consent-page-dropdown" data-v-acfcb8c1><div class="consent-page-why-text" data-v-acfcb8c1> Why we need you to share your data </div><svg class="${ssrRenderClass([{ "is-open": show_tpp_why.value }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-acfcb8c1></path></svg></div>`);
      if (show_tpp_why.value) {
        _push(`<div class="consent-page-dropdown-subtext-section" data-v-acfcb8c1><div class="consent-page-dropdown-subtext" data-v-acfcb8c1> These details will vary depending on the nature of the TPP’s service. It is the TPP’s responsibility to determine how best to describe why Insurance Data Sharing is required to deliver their service. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><!--[-->`);
      ssrRenderList(insuranceGroups.value, (group) => {
        _push(`<div class="consent-page-text-frame-2" data-v-acfcb8c1><div class="consent-page-text-inner-frame" data-v-acfcb8c1><div class="consent-page-text-inner-frame-2" data-v-acfcb8c1><div class="consent-page-text-sub-header" data-v-acfcb8c1>${ssrInterpolate(unref(insuranceTypeLabels)[group.InsuranceType] || `${group.InsuranceType} Insurance`)}</div><div class="consent-page-text-section" data-v-acfcb8c1><!--[-->`);
        ssrRenderList(unref(insurancePermissionGroups), (row) => {
          var _a2;
          _push(`<!--[-->`);
          if ((_a2 = group.Permissions) == null ? void 0 : _a2.includes(row.permission)) {
            _push(`<div class="consent-page-dropdown-container" data-v-acfcb8c1><div class="consent-page-dropdown" data-v-acfcb8c1><div class="consent-page-dropdown-text-section" data-v-acfcb8c1>`);
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(permissionIcon(row.permission)), null, null), _parent);
            _push(`<div class="consent-page-dropdown-text" data-v-acfcb8c1>${ssrInterpolate(row.label)}</div></div><svg class="${ssrRenderClass([{ "is-open": isOpen(group.InsuranceType, row.permission) }, "consent-page-dropdown-arrow"])}" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" data-v-acfcb8c1></path></svg></div>`);
            if (isOpen(group.InsuranceType, row.permission)) {
              _push(`<div class="consent-page-dropdown-subtext-section" data-v-acfcb8c1><div class="consent-page-dropdown-subtext" data-v-acfcb8c1>${ssrInterpolate(unref(insurancePermissionDescriptions)[row.permission])}</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div></div></div>`);
      });
      _push(`<!--]--><div class="consent-page-text-frame-2" data-v-acfcb8c1><div class="consent-page-text-inner-frame" data-v-acfcb8c1><div class="consent-page-date-range" data-v-acfcb8c1><div class="consent-page-dropdown" style="${ssrRenderStyle({ "cursor": "default" })}" data-v-acfcb8c1><div class="consent-page-date" data-v-acfcb8c1><svg width="292" height="16" viewBox="0 0 292 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M5.33331 1.33331V3.33331" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M10.6667 1.33331V3.33331" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M2.33331 6.06H13.6666" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M14 5.66665V11.3333C14 13.3333 13 14.6666 10.6667 14.6666H5.33333C3 14.6666 2 13.3333 2 11.3333V5.66665C2 3.66665 3 2.33331 5.33333 2.33331H10.6667C13 2.33331 14 3.66665 14 5.66665Z" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M10.4632 9.13332H10.4691" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M10.4632 11.1333H10.4691" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M7.99697 9.13332H8.00296" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M7.99697 11.1333H8.00296" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M5.52956 9.13332H5.53555" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M5.52956 11.1333H5.53555" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" data-v-acfcb8c1></path><path d="M37.136 3.612L34.76 12H33.824L31.712 4.848L29.552 12L28.64 12.012L26.312 3.612H27.212L29.132 10.968L31.28 3.612H32.216L34.304 10.968L36.236 3.612H37.136ZM44.2289 8.388C44.2289 8.676 44.2209 8.896 44.2049 9.048H38.7689C38.7929 9.544 38.9129 9.968 39.1289 10.32C39.3449 10.672 39.6289 10.94 39.9809 11.124C40.3329 11.3 40.7169 11.388 41.1329 11.388C41.6769 11.388 42.1329 11.256 42.5009 10.992C42.8769 10.728 43.1249 10.372 43.2449 9.924H44.1329C43.9729 10.564 43.6289 11.088 43.1009 11.496C42.5809 11.896 41.9249 12.096 41.1329 12.096C40.5169 12.096 39.9649 11.96 39.4769 11.688C38.9889 11.408 38.6049 11.016 38.3249 10.512C38.0529 10 37.9169 9.404 37.9169 8.724C37.9169 8.044 38.0529 7.448 38.3249 6.936C38.5969 6.424 38.9769 6.032 39.4649 5.76C39.9529 5.488 40.5089 5.352 41.1329 5.352C41.7569 5.352 42.3009 5.488 42.7649 5.76C43.2369 6.032 43.5969 6.4 43.8449 6.864C44.1009 7.32 44.2289 7.828 44.2289 8.388ZM43.3769 8.364C43.3849 7.876 43.2849 7.46 43.0769 7.116C42.8769 6.772 42.6009 6.512 42.2489 6.336C41.8969 6.16 41.5129 6.072 41.0969 6.072C40.4729 6.072 39.9409 6.272 39.5009 6.672C39.0609 7.072 38.8169 7.636 38.7689 8.364H43.3769ZM57.4587 5.448L55.4067 12H54.5667L52.7547 6.504L50.9427 12H50.0907L48.0387 5.448H48.8907L50.5227 11.148L52.3587 5.448H53.1987L55.0107 11.16L56.6307 5.448H57.4587ZM58.9039 4.212C58.7359 4.212 58.5919 4.152 58.4719 4.032C58.3519 3.912 58.2919 3.764 58.2919 3.588C58.2919 3.412 58.3519 3.268 58.4719 3.156C58.5919 3.036 58.7359 2.976 58.9039 2.976C59.0719 2.976 59.2159 3.036 59.3359 3.156C59.4559 3.268 59.5159 3.412 59.5159 3.588C59.5159 3.764 59.4559 3.912 59.3359 4.032C59.2159 4.152 59.0719 4.212 58.9039 4.212ZM59.3239 5.448V12H58.4839V5.448H59.3239ZM61.9461 3.12V12H61.1061V3.12H61.9461ZM64.5683 3.12V12H63.7283V3.12H64.5683ZM69.1394 8.712C69.1394 8.04 69.2714 7.452 69.5354 6.948C69.8074 6.436 70.1794 6.044 70.6514 5.772C71.1314 5.492 71.6714 5.352 72.2714 5.352C72.8954 5.352 73.4314 5.496 73.8794 5.784C74.3354 6.072 74.6634 6.44 74.8634 6.888V5.448H75.7034V12H74.8634V10.548C74.6554 10.996 74.3234 11.368 73.8674 11.664C73.4194 11.952 72.8834 12.096 72.2594 12.096C71.6674 12.096 71.1314 11.956 70.6514 11.676C70.1794 11.396 69.8074 11 69.5354 10.488C69.2714 9.976 69.1394 9.384 69.1394 8.712ZM74.8634 8.724C74.8634 8.196 74.7554 7.732 74.5394 7.332C74.3234 6.932 74.0274 6.624 73.6514 6.408C73.2834 6.192 72.8754 6.084 72.4274 6.084C71.9634 6.084 71.5474 6.188 71.1794 6.396C70.8114 6.604 70.5194 6.908 70.3034 7.308C70.0954 7.7 69.9914 8.168 69.9914 8.712C69.9914 9.248 70.0954 9.72 70.3034 10.128C70.5194 10.528 70.8114 10.836 71.1794 11.052C71.5474 11.26 71.9634 11.364 72.4274 11.364C72.8754 11.364 73.2834 11.256 73.6514 11.04C74.0274 10.824 74.3234 10.516 74.5394 10.116C74.7554 9.716 74.8634 9.252 74.8634 8.724ZM77.1171 8.724C77.1171 8.044 77.2531 7.452 77.5251 6.948C77.7971 6.436 78.1731 6.044 78.6531 5.772C79.1331 5.492 79.6811 5.352 80.2971 5.352C81.1051 5.352 81.7691 5.552 82.2891 5.952C82.8171 6.352 83.1571 6.896 83.3091 7.584H82.4091C82.2971 7.112 82.0531 6.744 81.6771 6.48C81.3091 6.208 80.8491 6.072 80.2971 6.072C79.8571 6.072 79.4611 6.172 79.1091 6.372C78.7571 6.572 78.4771 6.872 78.2691 7.272C78.0691 7.664 77.9691 8.148 77.9691 8.724C77.9691 9.3 78.0691 9.788 78.2691 10.188C78.4771 10.588 78.7571 10.888 79.1091 11.088C79.4611 11.288 79.8571 11.388 80.2971 11.388C80.8491 11.388 81.3091 11.256 81.6771 10.992C82.0531 10.72 82.2971 10.344 82.4091 9.864H83.3091C83.1571 10.536 82.8171 11.076 82.2891 11.484C81.7611 11.892 81.0971 12.096 80.2971 12.096C79.6811 12.096 79.1331 11.96 78.6531 11.688C78.1731 11.408 77.7971 11.016 77.5251 10.512C77.2531 10 77.1171 9.404 77.1171 8.724ZM84.3565 8.724C84.3565 8.044 84.4925 7.452 84.7645 6.948C85.0365 6.436 85.4125 6.044 85.8925 5.772C86.3725 5.492 86.9205 5.352 87.5365 5.352C88.3445 5.352 89.0085 5.552 89.5285 5.952C90.0565 6.352 90.3965 6.896 90.5485 7.584H89.6485C89.5365 7.112 89.2925 6.744 88.9165 6.48C88.5485 6.208 88.0885 6.072 87.5365 6.072C87.0965 6.072 86.7005 6.172 86.3485 6.372C85.9965 6.572 85.7165 6.872 85.5085 7.272C85.3085 7.664 85.2085 8.148 85.2085 8.724C85.2085 9.3 85.3085 9.788 85.5085 10.188C85.7165 10.588 85.9965 10.888 86.3485 11.088C86.7005 11.288 87.0965 11.388 87.5365 11.388C88.0885 11.388 88.5485 11.256 88.9165 10.992C89.2925 10.72 89.5365 10.344 89.6485 9.864H90.5485C90.3965 10.536 90.0565 11.076 89.5285 11.484C89.0005 11.892 88.3365 12.096 87.5365 12.096C86.9205 12.096 86.3725 11.96 85.8925 11.688C85.4125 11.408 85.0365 11.016 84.7645 10.512C84.4925 10 84.3565 9.404 84.3565 8.724ZM97.9078 8.388C97.9078 8.676 97.8998 8.896 97.8838 9.048H92.4478C92.4718 9.544 92.5918 9.968 92.8078 10.32C93.0238 10.672 93.3078 10.94 93.6598 11.124C94.0118 11.3 94.3958 11.388 94.8118 11.388C95.3558 11.388 95.8118 11.256 96.1798 10.992C96.5558 10.728 96.8038 10.372 96.9238 9.924H97.8118C97.6518 10.564 97.3078 11.088 96.7798 11.496C96.2598 11.896 95.6038 12.096 94.8118 12.096C94.1958 12.096 93.6438 11.96 93.1558 11.688C92.6678 11.408 92.2838 11.016 92.0038 10.512C91.7318 10 91.5958 9.404 91.5958 8.724C91.5958 8.044 91.7318 7.448 92.0038 6.936C92.2758 6.424 92.6558 6.032 93.1438 5.76C93.6318 5.488 94.1878 5.352 94.8118 5.352C95.4358 5.352 95.9798 5.488 96.4438 5.76C96.9158 6.032 97.2758 6.4 97.5238 6.864C97.7798 7.32 97.9078 7.828 97.9078 8.388ZM97.0558 8.364C97.0638 7.876 96.9638 7.46 96.7558 7.116C96.5558 6.772 96.2798 6.512 95.9278 6.336C95.5758 6.16 95.1918 6.072 94.7758 6.072C94.1518 6.072 93.6198 6.272 93.1798 6.672C92.7398 7.072 92.4958 7.636 92.4478 8.364H97.0558ZM101.581 12.096C100.829 12.096 100.213 11.924 99.7327 11.58C99.2607 11.228 98.9967 10.752 98.9407 10.152H99.8047C99.8447 10.52 100.017 10.82 100.321 11.052C100.633 11.276 101.049 11.388 101.569 11.388C102.025 11.388 102.381 11.28 102.637 11.064C102.901 10.848 103.033 10.58 103.033 10.26C103.033 10.036 102.961 9.852 102.817 9.708C102.673 9.564 102.489 9.452 102.265 9.372C102.049 9.284 101.753 9.192 101.377 9.096C100.889 8.968 100.493 8.84 100.189 8.712C99.8847 8.584 99.6247 8.396 99.4087 8.148C99.2007 7.892 99.0967 7.552 99.0967 7.128C99.0967 6.808 99.1927 6.512 99.3847 6.24C99.5767 5.968 99.8487 5.752 100.201 5.592C100.553 5.432 100.953 5.352 101.401 5.352C102.105 5.352 102.673 5.532 103.105 5.892C103.537 6.244 103.769 6.732 103.801 7.356H102.961C102.937 6.972 102.785 6.664 102.505 6.432C102.233 6.192 101.857 6.072 101.377 6.072C100.953 6.072 100.609 6.172 100.345 6.372C100.081 6.572 99.9487 6.82 99.9487 7.116C99.9487 7.372 100.025 7.584 100.177 7.752C100.337 7.912 100.533 8.04 100.765 8.136C100.997 8.224 101.309 8.324 101.701 8.436C102.173 8.564 102.549 8.688 102.829 8.808C103.109 8.928 103.349 9.104 103.549 9.336C103.749 9.568 103.853 9.876 103.861 10.26C103.861 10.612 103.765 10.928 103.573 11.208C103.381 11.48 103.113 11.696 102.769 11.856C102.425 12.016 102.029 12.096 101.581 12.096ZM107.578 12.096C106.826 12.096 106.21 11.924 105.73 11.58C105.258 11.228 104.994 10.752 104.938 10.152H105.802C105.842 10.52 106.014 10.82 106.318 11.052C106.63 11.276 107.046 11.388 107.566 11.388C108.022 11.388 108.378 11.28 108.634 11.064C108.898 10.848 109.03 10.58 109.03 10.26C109.03 10.036 108.958 9.852 108.814 9.708C108.67 9.564 108.486 9.452 108.262 9.372C108.046 9.284 107.75 9.192 107.374 9.096C106.886 8.968 106.49 8.84 106.186 8.712C105.882 8.584 105.622 8.396 105.406 8.148C105.198 7.892 105.094 7.552 105.094 7.128C105.094 6.808 105.19 6.512 105.382 6.24C105.574 5.968 105.846 5.752 106.198 5.592C106.55 5.432 106.95 5.352 107.398 5.352C108.102 5.352 108.67 5.532 109.102 5.892C109.534 6.244 109.766 6.732 109.798 7.356H108.958C108.934 6.972 108.782 6.664 108.502 6.432C108.23 6.192 107.854 6.072 107.374 6.072C106.95 6.072 106.606 6.172 106.342 6.372C106.078 6.572 105.946 6.82 105.946 7.116C105.946 7.372 106.022 7.584 106.174 7.752C106.334 7.912 106.53 8.04 106.762 8.136C106.994 8.224 107.306 8.324 107.698 8.436C108.17 8.564 108.546 8.688 108.826 8.808C109.106 8.928 109.346 9.104 109.546 9.336C109.746 9.568 109.85 9.876 109.858 10.26C109.858 10.612 109.762 10.928 109.57 11.208C109.378 11.48 109.11 11.696 108.766 11.856C108.422 12.016 108.026 12.096 107.578 12.096ZM119.892 5.448L116.004 15.084H115.128L116.4 11.964L113.712 5.448H114.636L116.868 11.04L119.028 5.448H119.892ZM123.779 12.096C123.163 12.096 122.607 11.96 122.111 11.688C121.623 11.408 121.235 11.016 120.947 10.512C120.667 10 120.527 9.404 120.527 8.724C120.527 8.044 120.671 7.452 120.959 6.948C121.247 6.436 121.639 6.044 122.135 5.772C122.631 5.492 123.187 5.352 123.803 5.352C124.419 5.352 124.975 5.492 125.471 5.772C125.975 6.044 126.367 6.436 126.647 6.948C126.935 7.452 127.079 8.044 127.079 8.724C127.079 9.396 126.935 9.988 126.647 10.5C126.359 11.012 125.963 11.408 125.459 11.688C124.955 11.96 124.395 12.096 123.779 12.096ZM123.779 11.364C124.211 11.364 124.611 11.268 124.979 11.076C125.347 10.876 125.643 10.58 125.867 10.188C126.099 9.788 126.215 9.3 126.215 8.724C126.215 8.148 126.103 7.664 125.879 7.272C125.655 6.872 125.359 6.576 124.991 6.384C124.623 6.184 124.223 6.084 123.791 6.084C123.359 6.084 122.959 6.184 122.591 6.384C122.223 6.576 121.927 6.872 121.703 7.272C121.487 7.664 121.379 8.148 121.379 8.724C121.379 9.3 121.487 9.788 121.703 10.188C121.927 10.58 122.219 10.876 122.579 11.076C122.947 11.268 123.347 11.364 123.779 11.364ZM134.166 5.448V12H133.326V10.848C133.134 11.256 132.838 11.568 132.438 11.784C132.038 12 131.59 12.108 131.094 12.108C130.31 12.108 129.67 11.868 129.174 11.388C128.678 10.9 128.43 10.196 128.43 9.276V5.448H129.258V9.18C129.258 9.892 129.434 10.436 129.786 10.812C130.146 11.188 130.634 11.376 131.25 11.376C131.882 11.376 132.386 11.176 132.762 10.776C133.138 10.376 133.326 9.788 133.326 9.012V5.448H134.166ZM136.804 6.612C136.988 6.204 137.268 5.888 137.644 5.664C138.028 5.44 138.496 5.328 139.048 5.328V6.204H138.82C138.212 6.204 137.724 6.368 137.356 6.696C136.988 7.024 136.804 7.572 136.804 8.34V12H135.964V5.448H136.804V6.612ZM142.981 8.712C142.981 8.04 143.117 7.452 143.389 6.948C143.661 6.436 144.033 6.044 144.505 5.772C144.985 5.492 145.525 5.352 146.125 5.352C146.701 5.352 147.221 5.492 147.685 5.772C148.149 6.052 148.489 6.416 148.705 6.864V3.12H149.545V12H148.705V10.536C148.505 10.992 148.177 11.368 147.721 11.664C147.265 11.952 146.729 12.096 146.113 12.096C145.513 12.096 144.973 11.956 144.493 11.676C144.021 11.396 143.649 11 143.377 10.488C143.113 9.976 142.981 9.384 142.981 8.712ZM148.705 8.724C148.705 8.196 148.597 7.732 148.381 7.332C148.165 6.932 147.869 6.624 147.493 6.408C147.125 6.192 146.717 6.084 146.269 6.084C145.805 6.084 145.389 6.188 145.021 6.396C144.653 6.604 144.361 6.908 144.145 7.308C143.937 7.7 143.833 8.168 143.833 8.712C143.833 9.248 143.937 9.72 144.145 10.128C144.361 10.528 144.653 10.836 145.021 11.052C145.389 11.26 145.805 11.364 146.269 11.364C146.717 11.364 147.125 11.256 147.493 11.04C147.869 10.824 148.165 10.516 148.381 10.116C148.597 9.716 148.705 9.252 148.705 8.724ZM150.958 8.712C150.958 8.04 151.09 7.452 151.354 6.948C151.626 6.436 151.998 6.044 152.47 5.772C152.95 5.492 153.49 5.352 154.09 5.352C154.714 5.352 155.25 5.496 155.698 5.784C156.154 6.072 156.482 6.44 156.682 6.888V5.448H157.522V12H156.682V10.548C156.474 10.996 156.142 11.368 155.686 11.664C155.238 11.952 154.702 12.096 154.078 12.096C153.486 12.096 152.95 11.956 152.47 11.676C151.998 11.396 151.626 11 151.354 10.488C151.09 9.976 150.958 9.384 150.958 8.712ZM156.682 8.724C156.682 8.196 156.574 7.732 156.358 7.332C156.142 6.932 155.846 6.624 155.47 6.408C155.102 6.192 154.694 6.084 154.246 6.084C153.782 6.084 153.366 6.188 152.998 6.396C152.63 6.604 152.338 6.908 152.122 7.308C151.914 7.7 151.81 8.168 151.81 8.712C151.81 9.248 151.914 9.72 152.122 10.128C152.338 10.528 152.63 10.836 152.998 11.052C153.366 11.26 153.782 11.364 154.246 11.364C154.694 11.364 155.102 11.256 155.47 11.04C155.846 10.824 156.142 10.516 156.358 10.116C156.574 9.716 156.682 9.252 156.682 8.724ZM160.412 6.156V10.224C160.412 10.624 160.488 10.9 160.64 11.052C160.792 11.204 161.06 11.28 161.444 11.28H162.212V12H161.312C160.72 12 160.28 11.864 159.992 11.592C159.704 11.312 159.56 10.856 159.56 10.224V6.156H158.648V5.448H159.56V3.804H160.412V5.448H162.212V6.156H160.412ZM163.093 8.712C163.093 8.04 163.225 7.452 163.489 6.948C163.761 6.436 164.133 6.044 164.605 5.772C165.085 5.492 165.625 5.352 166.225 5.352C166.849 5.352 167.385 5.496 167.833 5.784C168.289 6.072 168.617 6.44 168.817 6.888V5.448H169.657V12H168.817V10.548C168.609 10.996 168.277 11.368 167.821 11.664C167.373 11.952 166.837 12.096 166.213 12.096C165.621 12.096 165.085 11.956 164.605 11.676C164.133 11.396 163.761 11 163.489 10.488C163.225 9.976 163.093 9.384 163.093 8.712ZM168.817 8.724C168.817 8.196 168.709 7.732 168.493 7.332C168.277 6.932 167.981 6.624 167.605 6.408C167.237 6.192 166.829 6.084 166.381 6.084C165.917 6.084 165.501 6.188 165.133 6.396C164.765 6.604 164.473 6.908 164.257 7.308C164.049 7.7 163.945 8.168 163.945 8.712C163.945 9.248 164.049 9.72 164.257 10.128C164.473 10.528 164.765 10.836 165.133 11.052C165.501 11.26 165.917 11.364 166.381 11.364C166.829 11.364 167.237 11.256 167.605 11.04C167.981 10.824 168.277 10.516 168.493 10.116C168.709 9.716 168.817 9.252 168.817 8.724ZM180.304 5.448V12H179.464V10.848C179.272 11.256 178.976 11.568 178.576 11.784C178.176 12 177.728 12.108 177.232 12.108C176.448 12.108 175.808 11.868 175.312 11.388C174.816 10.9 174.568 10.196 174.568 9.276V5.448H175.396V9.18C175.396 9.892 175.572 10.436 175.924 10.812C176.284 11.188 176.772 11.376 177.388 11.376C178.02 11.376 178.524 11.176 178.9 10.776C179.276 10.376 179.464 9.788 179.464 9.012V5.448H180.304ZM185.174 5.328C185.958 5.328 186.598 5.572 187.094 6.06C187.59 6.54 187.838 7.24 187.838 8.16V12H187.01V8.256C187.01 7.544 186.83 7 186.47 6.624C186.118 6.248 185.634 6.06 185.018 6.06C184.386 6.06 183.882 6.26 183.506 6.66C183.13 7.06 182.942 7.648 182.942 8.424V12H182.102V5.448H182.942V6.564C183.15 6.164 183.45 5.86 183.842 5.652C184.234 5.436 184.678 5.328 185.174 5.328ZM190.667 6.156V10.224C190.667 10.624 190.743 10.9 190.895 11.052C191.047 11.204 191.315 11.28 191.699 11.28H192.467V12H191.567C190.975 12 190.535 11.864 190.247 11.592C189.959 11.312 189.815 10.856 189.815 10.224V6.156H188.903V5.448H189.815V3.804H190.667V5.448H192.467V6.156H190.667ZM194.153 4.212C193.985 4.212 193.841 4.152 193.721 4.032C193.601 3.912 193.541 3.764 193.541 3.588C193.541 3.412 193.601 3.268 193.721 3.156C193.841 3.036 193.985 2.976 194.153 2.976C194.321 2.976 194.465 3.036 194.585 3.156C194.705 3.268 194.765 3.412 194.765 3.588C194.765 3.764 194.705 3.912 194.585 4.032C194.465 4.152 194.321 4.212 194.153 4.212ZM194.573 5.448V12H193.733V5.448H194.573ZM197.195 3.12V12H196.355V3.12H197.195Z" fill="black" data-v-acfcb8c1></path></svg><div class="consent-page-date-2" data-v-acfcb8c1><div class="consent-page-date-text" data-v-acfcb8c1>${ssrInterpolate(unref(formatDateTime)((_c = unref(consentData)) == null ? void 0 : _c.ExpirationDateTime))}</div></div></div></div></div></div></div><div class="consent-page-button-with-description" data-v-acfcb8c1><div class="consent-page-button" data-v-acfcb8c1><div class="consent-page-button-text-section" data-v-acfcb8c1><svg class="consent-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-acfcb8c1><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-acfcb8c1></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_ins_2_496)" data-v-acfcb8c1></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_ins_2_496)" data-v-acfcb8c1></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_ins_2_496)" data-v-acfcb8c1></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_ins_2_496)" data-v-acfcb8c1></path><defs data-v-acfcb8c1><linearGradient id="paint0_linear_ins_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-acfcb8c1><stop stop-color="#4083E1" data-v-acfcb8c1></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-acfcb8c1></stop><stop offset="0.48" stop-color="#36B1CC" data-v-acfcb8c1></stop><stop offset="0.8" stop-color="#31C9C1" data-v-acfcb8c1></stop><stop offset="1" stop-color="#30D2BE" data-v-acfcb8c1></stop></linearGradient><linearGradient id="paint1_linear_ins_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-acfcb8c1><stop stop-color="#80ACEB" data-v-acfcb8c1></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-acfcb8c1></stop><stop offset="0.73" stop-color="#76D8D7" data-v-acfcb8c1></stop><stop offset="1" stop-color="#75E1D4" data-v-acfcb8c1></stop></linearGradient><linearGradient id="paint2_linear_ins_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-acfcb8c1><stop stop-color="#BFD6F5" data-v-acfcb8c1></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-acfcb8c1></stop><stop offset="1" stop-color="#BAF0E9" data-v-acfcb8c1></stop></linearGradient><radialGradient id="paint3_radial_ins_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-acfcb8c1><stop stop-color="#40E0C7" data-v-acfcb8c1></stop><stop offset="0.304248" stop-color="#0050C8" data-v-acfcb8c1></stop><stop offset="0.623256" stop-color="white" data-v-acfcb8c1></stop></radialGradient></defs></svg><div class="consent-page-button-text" data-v-acfcb8c1>Proceed using AlTareq</div></div></div><div class="consent-page-button-description" data-v-acfcb8c1> Continue to [YOUR LFI] to share the specified policy(ies) information </div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentInsuranceDataSharing.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-acfcb8c1"]]);
const MAX_POLICIES = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PolicyEditor",
  __ssrInlineRender: true,
  props: {
    allowedTypes: { default: () => ["Motor", "Health", "Home", "Life", "Travel", "Renters", "Employment"] },
    allowedStatuses: { default: () => ALL_STATUSES }
  },
  setup(__props) {
    const props = __props;
    const { updateField } = useSharedState();
    const INSURANCE_TYPES = computed(() => props.allowedTypes);
    const STATUSES = computed(() => props.allowedStatuses);
    const TYPE_LABELS = {
      Motor: "Motor",
      Health: "Health",
      Home: "Home",
      Life: "Life",
      Travel: "Travel",
      Renters: "Renters",
      Employment: "Employment"
    };
    const TYPE_PREFIX = {
      Motor: "MOT",
      Health: "HLT",
      Home: "HOM",
      Life: "LIF",
      Travel: "TRV",
      Renters: "RNT",
      Employment: "EMP"
    };
    function genPolicyNumber(type, n) {
      return `${TYPE_PREFIX[type]}-2026-${String(n + 1).padStart(4, "0")}`;
    }
    function isoDateOffset(daysAhead) {
      const d = /* @__PURE__ */ new Date();
      d.setUTCHours(0, 0, 0, 0);
      d.setUTCDate(d.getUTCDate() + daysAhead);
      return d.toISOString().slice(0, 10);
    }
    function defaultDatesFor(status) {
      if (status === "Expired" || status === "Lapsed" || status === "Cancelled" || status === "Surrendered" || status === "Converted" || status === "DeathClaim" || status === "RiderClaim") {
        return { startDate: isoDateOffset(-730), endDate: isoDateOffset(-30) };
      }
      return { startDate: isoDateOffset(-180), endDate: isoDateOffset(185) };
    }
    const INITIAL_POLICIES = [
      { id: 1, insuranceType: "Motor", status: "New", policyNumber: genPolicyNumber("Motor", 0), premium: 2400, ...defaultDatesFor("New") },
      { id: 2, insuranceType: "Motor", status: "Renewed", policyNumber: genPolicyNumber("Motor", 1), premium: 2100, ...defaultDatesFor("Renewed") },
      { id: 3, insuranceType: "Health", status: "Renewed", policyNumber: genPolicyNumber("Health", 0), premium: 6800, ...defaultDatesFor("Renewed") },
      { id: 4, insuranceType: "Health", status: "New", policyNumber: genPolicyNumber("Health", 1), premium: 4500, ...defaultDatesFor("New") },
      { id: 5, insuranceType: "Life", status: "InForce", policyNumber: genPolicyNumber("Life", 0), premium: 4200, ...defaultDatesFor("InForce") },
      { id: 6, insuranceType: "Life", status: "Surrendered", policyNumber: genPolicyNumber("Life", 1), premium: 3200, ...defaultDatesFor("Surrendered") },
      { id: 7, insuranceType: "Home", status: "PaidUp", policyNumber: genPolicyNumber("Home", 0), premium: 1800, ...defaultDatesFor("PaidUp") },
      { id: 8, insuranceType: "Travel", status: "Expired", policyNumber: genPolicyNumber("Travel", 0), premium: 320, ...defaultDatesFor("Expired") },
      { id: 9, insuranceType: "Renters", status: "Lapsed", policyNumber: genPolicyNumber("Renters", 0), premium: 900, ...defaultDatesFor("Lapsed") },
      { id: 10, insuranceType: "Employment", status: "Cancelled", policyNumber: genPolicyNumber("Employment", 0), premium: 1500, ...defaultDatesFor("Cancelled") }
    ];
    INITIAL_POLICIES.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    const policies = ref([...INITIAL_POLICIES]);
    watch(policies, (val) => updateField("policies", JSON.stringify(val)), { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "pe" }, _attrs))} data-v-431264ab><header class="pe__header" data-v-431264ab><span class="pe__eyebrow" data-v-431264ab><span class="pe__eyebrow-dash" data-v-431264ab></span> Simulated user policies </span><span class="pe__subtitle" data-v-431264ab>Insurance policies the authenticated user holds at their LFI</span></header><div class="pe__rows" data-v-431264ab><!--[-->`);
      ssrRenderList(policies.value, (policy) => {
        _push(`<div class="pe__row" data-v-431264ab><div class="pe__field pe__field--type" data-v-431264ab><label class="pe__label" data-v-431264ab>Insurance type</label><select class="pe__control"${ssrRenderAttr("value", policy.insuranceType)} data-v-431264ab><!--[-->`);
        ssrRenderList(INSURANCE_TYPES.value, (t) => {
          _push(`<option${ssrRenderAttr("value", t)} data-v-431264ab>${ssrInterpolate(TYPE_LABELS[t])}</option>`);
        });
        _push(`<!--]--></select></div><div class="pe__field pe__field--status" data-v-431264ab><label class="pe__label" data-v-431264ab>Status</label><select class="pe__control"${ssrRenderAttr("value", policy.status)} data-v-431264ab><!--[-->`);
        ssrRenderList(STATUSES.value, (s) => {
          _push(`<option${ssrRenderAttr("value", s)} data-v-431264ab>${ssrInterpolate(unref(STATUS_LABELS)[s])}</option>`);
        });
        _push(`<!--]--></select></div><div class="pe__field pe__field--ref" data-v-431264ab><label class="pe__label" data-v-431264ab>Policy number</label><input class="pe__control pe__control--mono"${ssrRenderAttr("value", policy.policyNumber)} data-v-431264ab></div><div class="pe__field pe__field--amount" data-v-431264ab><label class="pe__label" data-v-431264ab>Premium (AED)</label><input class="pe__control" type="number"${ssrRenderAttr("value", policy.premium)} min="0" step="50" data-v-431264ab></div><div class="pe__field pe__field--date" data-v-431264ab><label class="pe__label" data-v-431264ab>Start</label><input class="pe__control" type="date"${ssrRenderAttr("value", policy.startDate)} data-v-431264ab></div><div class="pe__field pe__field--date" data-v-431264ab><label class="pe__label" data-v-431264ab>End</label><input class="pe__control" type="date"${ssrRenderAttr("value", policy.endDate)} data-v-431264ab></div><button type="button" class="pe__remove"${ssrIncludeBooleanAttr(policies.value.length <= 1) ? " disabled" : ""} title="Remove policy" aria-label="Remove policy" data-v-431264ab><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-431264ab><path d="M3 6h18" data-v-431264ab></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-431264ab></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" data-v-431264ab></path><line x1="10" y1="11" x2="10" y2="17" data-v-431264ab></line><line x1="14" y1="11" x2="14" y2="17" data-v-431264ab></line></svg></button></div>`);
      });
      _push(`<!--]--></div><footer class="pe__footer" data-v-431264ab><button type="button" class="pe__add"${ssrIncludeBooleanAttr(policies.value.length >= MAX_POLICIES) ? " disabled" : ""} data-v-431264ab>+ Add policy</button><span class="pe__count" data-v-431264ab>${ssrInterpolate(policies.value.length)} / ${ssrInterpolate(MAX_POLICIES)}</span></footer></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/editors/PolicyEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-431264ab"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_1$1 as a,
  __unplugin_components_1 as b
};
