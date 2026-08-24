import { defineComponent, computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
const MAX_ACCOUNTS = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountEditor",
  __ssrInlineRender: true,
  props: {
    allowedTypes: { default: () => ["CurrentAccount", "Savings", "CreditCard", "Mortgage", "Finance"] },
    allowedCurrencies: { default: () => ["AED", "USD", "EUR", "GBP", "INR", "SAR"] }
  },
  setup(__props) {
    const props = __props;
    const { updateField } = useSharedState();
    const ACCOUNT_TYPES = computed(() => props.allowedTypes);
    const CURRENCIES = computed(() => props.allowedCurrencies);
    const TYPE_LABELS = {
      CurrentAccount: "Current Account",
      Savings: "Savings",
      CreditCard: "Credit Card",
      Mortgage: "Mortgage",
      Finance: "Finance"
    };
    function genIban(n) {
      return "AE07 0331 2345 6789 0123 4" + String(56 + n).padStart(2, "0");
    }
    function balanceLabel(account) {
      const curr = account.currency || "AED";
      if (account.type === "Mortgage" || account.type === "Finance" || account.type === "CreditCard") return `Outstanding (${curr})`;
      return `Balance (${curr})`;
    }
    function secondaryLabel(account) {
      const curr = account.currency || "AED";
      if (account.type === "CurrentAccount") return `Overdraft (${curr})`;
      if (account.type === "CreditCard") return `Available (${curr})`;
      return null;
    }
    const accounts = ref([
      { id: 1, type: "CurrentAccount", iban: genIban(0), balance: 5e3, secondary: 1500, currency: "AED" },
      { id: 2, type: "Savings", iban: genIban(1), balance: 25e3, secondary: null, currency: "AED" }
    ]);
    watch(accounts, (val) => updateField("accounts", JSON.stringify(val)), { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ae" }, _attrs))} data-v-9527b5e2><header class="ae__header" data-v-9527b5e2><span class="ae__eyebrow" data-v-9527b5e2><span class="ae__eyebrow-dash" data-v-9527b5e2></span> Simulated user accounts </span><span class="ae__subtitle" data-v-9527b5e2>Accounts the authenticated user holds at their bank</span></header><div class="ae__rows" data-v-9527b5e2><!--[-->`);
      ssrRenderList(accounts.value, (account) => {
        _push(`<div class="ae__row" data-v-9527b5e2><div class="ae__field ae__field--type" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Type</label>`);
        if (ACCOUNT_TYPES.value.length > 1) {
          _push(`<select class="ae__control"${ssrRenderAttr("value", account.type)} data-v-9527b5e2><!--[-->`);
          ssrRenderList(ACCOUNT_TYPES.value, (t) => {
            _push(`<option${ssrRenderAttr("value", t)} data-v-9527b5e2>${ssrInterpolate(TYPE_LABELS[t])}</option>`);
          });
          _push(`<!--]--></select>`);
        } else {
          _push(`<input class="ae__control"${ssrRenderAttr("value", TYPE_LABELS[account.type])} readonly data-v-9527b5e2>`);
        }
        _push(`</div>`);
        if (account.type === "CurrentAccount" || account.type === "Savings") {
          _push(`<!--[--><div class="ae__field ae__field--ref" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>IBAN</label><input class="ae__control ae__control--mono"${ssrRenderAttr("value", account.iban)} readonly data-v-9527b5e2></div><div class="ae__field ae__field--currency" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Currency</label>`);
          if (CURRENCIES.value.length > 1) {
            _push(`<select class="ae__control" data-v-9527b5e2><!--[-->`);
            ssrRenderList(CURRENCIES.value, (c) => {
              _push(`<option${ssrRenderAttr("value", c)} data-v-9527b5e2${ssrIncludeBooleanAttr(Array.isArray(account.currency) ? ssrLooseContain(account.currency, c) : ssrLooseEqual(account.currency, c)) ? " selected" : ""}>${ssrInterpolate(c)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<input class="ae__control"${ssrRenderAttr("value", account.currency)} readonly data-v-9527b5e2>`);
          }
          _push(`</div><!--]-->`);
        } else if (account.type === "CreditCard") {
          _push(`<!--[--><div class="ae__field ae__field--ref" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Masked PAN</label><input class="ae__control ae__control--mono"${ssrRenderAttr("value", account.maskedPan)} readonly data-v-9527b5e2></div><div class="ae__field ae__field--name" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Card name</label><input class="ae__control"${ssrRenderAttr("value", account.cardName)} placeholder="e.g. Platinum Card" data-v-9527b5e2></div><!--]-->`);
        } else if (account.type === "Mortgage") {
          _push(`<div class="ae__field ae__field--ref" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Mortgage ref</label><input class="ae__control ae__control--mono"${ssrRenderAttr("value", account.mortgageRef)} data-v-9527b5e2></div>`);
        } else if (account.type === "Finance") {
          _push(`<div class="ae__field ae__field--ref" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>Finance ref</label><input class="ae__control ae__control--mono"${ssrRenderAttr("value", account.financeRef)} data-v-9527b5e2></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="ae__field ae__field--amount" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>${ssrInterpolate(balanceLabel(account))}</label><input class="ae__control" type="number"${ssrRenderAttr("value", account.balance)} min="0" step="100" data-v-9527b5e2></div>`);
        if (secondaryLabel(account)) {
          _push(`<div class="ae__field ae__field--amount" data-v-9527b5e2><label class="ae__label" data-v-9527b5e2>${ssrInterpolate(secondaryLabel(account))}</label><input class="ae__control" type="number"${ssrRenderAttr("value", account.secondary)} min="0" step="100" data-v-9527b5e2></div>`);
        } else {
          _push(`<div class="ae__field ae__field--amount ae__field--ghost" data-v-9527b5e2></div>`);
        }
        _push(`<button type="button" class="ae__remove"${ssrIncludeBooleanAttr(accounts.value.length <= 1) ? " disabled" : ""} title="Remove account" aria-label="Remove account" data-v-9527b5e2><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-9527b5e2><path d="M3 6h18" data-v-9527b5e2></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-9527b5e2></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" data-v-9527b5e2></path><line x1="10" y1="11" x2="10" y2="17" data-v-9527b5e2></line><line x1="14" y1="11" x2="14" y2="17" data-v-9527b5e2></line></svg></button></div>`);
      });
      _push(`<!--]--></div><footer class="ae__footer" data-v-9527b5e2><button type="button" class="ae__add"${ssrIncludeBooleanAttr(accounts.value.length >= MAX_ACCOUNTS) ? " disabled" : ""} data-v-9527b5e2>+ Add account</button><span class="ae__count" data-v-9527b5e2>${ssrInterpolate(accounts.value.length)} / ${ssrInterpolate(MAX_ACCOUNTS)}</span></footer></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/editors/AccountEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9527b5e2"]]);
export {
  __unplugin_components_1 as _
};
