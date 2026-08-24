import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { a as _imports_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { g as getAuthPaymentPermissionText, a as getPurposeDescription, _ as __unplugin_components_0 } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = {
  __name: "AuthorizationSingleInstantPayment",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState, consentData } = useSharedState();
    const selected = ref(null);
    const selected_add_to_trusted = ref(false);
    const TYPE_LABELS = {
      CurrentAccount: "Current Account",
      Savings: "Savings"
    };
    function normalizeIban(s) {
      return (s || "").replace(/\s+/g, "").toUpperCase();
    }
    function formatIban(s) {
      var _a;
      return ((_a = (s || "").replace(/\s+/g, "").match(/.{1,4}/g)) == null ? void 0 : _a.join(" ")) || "";
    }
    const paymentAccounts = computed(() => {
      var _a;
      const all = Array.isArray((_a = sharedState.value) == null ? void 0 : _a.accounts) ? sharedState.value.accounts : [];
      return all.filter((a) => a.type === "CurrentAccount" || a.type === "Savings");
    });
    const debtorIdentification = computed(
      () => {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = sharedState.value) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.DebtorAccount) == null ? void 0 : _d.Identification;
      }
    );
    const matchedDebtorAccount = computed(() => {
      const ident = normalizeIban(debtorIdentification.value);
      if (!ident) return null;
      return paymentAccounts.value.find((a) => normalizeIban(a.iban) === ident) || null;
    });
    const debtorMismatch = computed(
      () => !!debtorIdentification.value && !matchedDebtorAccount.value
    );
    const selectedAccount = computed(() => {
      if (matchedDebtorAccount.value) return matchedDebtorAccount.value;
      return paymentAccounts.value.find((a) => a.id === selected.value) || null;
    });
    const authPermissionText = computed(
      () => {
        var _a;
        return getAuthPaymentPermissionText((_a = consentData.value) == null ? void 0 : _a.Permissions);
      }
    );
    const trustedPayeeText = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      const type = (_f = (_e = (_d = (_c = (_b = (_a = sharedState.value) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.Creditor) == null ? void 0 : _d[0]) == null ? void 0 : _e.CreditorAccount) == null ? void 0 : _f.Type;
      const nounByType = {
        Individual: "person",
        Merchant: "merchant",
        Business: "business",
        Charity: "charity",
        GovernmentBody: "government body"
      };
      const noun = nounByType[type];
      return noun ? `Add ${noun} to my list of Trusted Payees` : "Add to my list of Trusted Payees";
    });
    const isOverdraft = computed(() => {
      var _a, _b, _c, _d, _e;
      const amount = parseFloat(((_e = (_d = (_c = (_b = (_a = consentData.value) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.ConsentSchedule) == null ? void 0 : _c.SinglePayment) == null ? void 0 : _d.Amount) == null ? void 0 : _e.Amount) || 0);
      const account = selectedAccount.value;
      if (!account) return false;
      return amount > (account.balance || 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page-frame" }, _attrs))} data-v-5b25a90f><div class="auth-page-header" data-v-5b25a90f><div class="auth-page-screen-name" data-v-5b25a90f><div class="auth-page-tpp-text" data-v-5b25a90f> LFI </div><svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-5b25a90f></path></svg><div class="auth-page-rectangle" data-v-5b25a90f></div></div><div class="auth-page-contents" data-v-5b25a90f><img class="auth-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-5b25a90f><div class="auth-page-progress" data-v-5b25a90f><div class="auth-page-progress-1" data-v-5b25a90f><div class="auth-page-progress-icon-active" data-v-5b25a90f><svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-5b25a90f></path></svg></div><div class="auth-page-progress-text" data-v-5b25a90f> Consent </div></div><div class="auth-page-progress-2" data-v-5b25a90f><div class="auth-page-progress-icon-active" data-v-5b25a90f><div class="auth-page-progress-icon-text-active" data-v-5b25a90f> 2 </div></div><div class="auth-page-progress-text" data-v-5b25a90f> Authorize </div></div><div class="auth-page-progress-3" data-v-5b25a90f><div class="auth-page-progress-icon" data-v-5b25a90f><div class="auth-page-progress-icon-text" data-v-5b25a90f> 3 </div></div><div class="auth-page-progress-text" data-v-5b25a90f> Complete </div></div><svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-5b25a90f></path><path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" data-v-5b25a90f></path></svg></div></div></div>`);
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-text-frame" data-v-5b25a90f><div class="auth-page-text-inner-frame" data-v-5b25a90f><div class="auth-page-text-header" data-v-5b25a90f> Confirm Payment Details <div class="auth-page-text-header-sub" data-v-5b25a90f> [TPP trading name] needs your permission `);
        if ((_e = (_d = (_c = (_b = (_a = unref(sharedState)) == null ? void 0 : _a.pii) == null ? void 0 : _b.Risk) == null ? void 0 : _c.CreditorIndicators) == null ? void 0 : _d.MerchantDetails) == null ? void 0 : _e.MerchantName) {
          _push(`<!--[--> on-behalf of ${ssrInterpolate(unref(sharedState).pii.Risk.CreditorIndicators.MerchantDetails.MerchantName)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(` to make the payment below: </div></div><div class="auth-page-accounts-section" data-v-5b25a90f><div class="auth-page-account-card" data-v-5b25a90f><div class="auth-page-account-subtext-container" data-v-5b25a90f><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Amount</div><div class="auth-page-account-amount-container" data-v-5b25a90f>`);
        _push(ssrRenderComponent(DirhamAmount, {
          amount: (_j = (_i = (_h = (_g = (_f = unref(consentData)) == null ? void 0 : _f.ControlParameters) == null ? void 0 : _g.ConsentSchedule) == null ? void 0 : _h.SinglePayment) == null ? void 0 : _i.Amount) == null ? void 0 : _j.Amount
        }, null, _parent));
        _push(`</div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Payee Name</div><div class="auth-page-account-amount-container" data-v-5b25a90f><div class="auth-page-account-amount" data-v-5b25a90f>${ssrInterpolate(((_p = (_o = (_n = (_m = (_l = (_k = unref(sharedState)) == null ? void 0 : _k.pii) == null ? void 0 : _l.Initiation) == null ? void 0 : _m.Creditor) == null ? void 0 : _n[0]) == null ? void 0 : _o.Creditor) == null ? void 0 : _p.Name) || ((_w = (_v = (_u = (_t = (_s = (_r = (_q = unref(sharedState)) == null ? void 0 : _q.pii) == null ? void 0 : _r.Initiation) == null ? void 0 : _s.Creditor) == null ? void 0 : _t[0]) == null ? void 0 : _u.CreditorAccount) == null ? void 0 : _v.Name) == null ? void 0 : _w.en) || ((_D = (_C = (_B = (_A = (_z = (_y = (_x = unref(sharedState)) == null ? void 0 : _x.pii) == null ? void 0 : _y.Initiation) == null ? void 0 : _z.Creditor) == null ? void 0 : _A[0]) == null ? void 0 : _B.CreditorAccount) == null ? void 0 : _C.Name) == null ? void 0 : _D.ar))}</div>`);
        ssrRenderSlot(_ctx.$slots, "cop-icon", {}, null, _push, _parent);
        _push(`</div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>IBAN</div><div class="auth-page-account-amount-container" data-v-5b25a90f><div class="auth-page-account-amount" data-v-5b25a90f>${ssrInterpolate((_L = (_K = (_J = (_I = (_H = (_G = (_F = (_E = unref(sharedState)) == null ? void 0 : _E.pii) == null ? void 0 : _F.Initiation) == null ? void 0 : _G.Creditor) == null ? void 0 : _H[0]) == null ? void 0 : _I.CreditorAccount) == null ? void 0 : _J.Identification) == null ? void 0 : _K.match(/.{1,4}/g)) == null ? void 0 : _L.join(" "))}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Payment Reference</div><div class="auth-page-account-amount-container" data-v-5b25a90f><div class="auth-page-account-amount" data-v-5b25a90f>${ssrInterpolate((_M = unref(consentData)) == null ? void 0 : _M.DebtorReference)}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Payment Purpose</div><div class="auth-page-account-amount-container" data-v-5b25a90f><div class="auth-page-account-amount" style="${ssrRenderStyle({ "width": "140px", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" })}" data-v-5b25a90f>${ssrInterpolate(unref(getPurposeDescription)((_N = unref(consentData)) == null ? void 0 : _N.PaymentPurposeCode))}</div></div></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value) {
        ssrRenderSlot(_ctx.$slots, "cop-warning", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      if (debtorMismatch.value) {
        _push(`<div class="auth-page-text-frame" data-v-5b25a90f><div class="auth-page-text-inner-frame" data-v-5b25a90f><div class="auth-page-text-header" data-v-5b25a90f> Something went wrong </div><div class="auth-page-error-image-container" data-v-5b25a90f><svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path></svg></div><div class="auth-page-text" data-v-5b25a90f> The account specified by ${ssrInterpolate(((_Q = (_P = (_O = unref(sharedState)) == null ? void 0 : _O.consent) == null ? void 0 : _P.OnBehalfOf) == null ? void 0 : _Q.TradingName) || "[TPP Trading Name]")} doesn&#39;t match any of your accounts. Please go back and try again. </div></div></div>`);
      } else {
        _push(`<div class="auth-page-text-frame" data-v-5b25a90f><div class="auth-page-text-inner-frame" data-v-5b25a90f><div class="auth-page-text-header" data-v-5b25a90f>${ssrInterpolate(matchedDebtorAccount.value ? "Account selected for the payment" : "Please select the account to pay from")}</div><div class="auth-page-accounts-section" data-v-5b25a90f>`);
        if (matchedDebtorAccount.value) {
          _push(`<div class="auth-page-account-card" data-v-5b25a90f><div class="auth-page-account-title" data-v-5b25a90f><div class="auth-page-account-title-text" data-v-5b25a90f>${ssrInterpolate(TYPE_LABELS[matchedDebtorAccount.value.type])}</div></div><div class="auth-page-account-subtext-container" data-v-5b25a90f><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext" data-v-5b25a90f>${ssrInterpolate(formatIban(matchedDebtorAccount.value.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Balance</div><div class="auth-page-account-amount-container" data-v-5b25a90f>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: matchedDebtorAccount.value.balance
          }, null, _parent));
          _push(`</div></div>`);
          if (matchedDebtorAccount.value.type === "CurrentAccount") {
            _push(`<div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Overdraft</div><div class="auth-page-account-amount-container" data-v-5b25a90f>`);
            _push(ssrRenderComponent(DirhamAmount, {
              amount: matchedDebtorAccount.value.secondary || 0
            }, null, _parent));
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(paymentAccounts.value, (account) => {
            _push(`<div class="auth-page-account-card" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-5b25a90f><div class="auth-page-account-title" data-v-5b25a90f><div class="auth-page-account-title-text" data-v-5b25a90f>${ssrInterpolate(TYPE_LABELS[account.type])}</div><div class="auth-page-account-checkbox-2" data-v-5b25a90f><div class="${ssrRenderClass([{ "is-active": selected.value === account.id }, "auth-page-account-checkbox-inactive-2"])}" data-v-5b25a90f><div class="auth-page-account-checkbox-selected" data-v-5b25a90f></div></div></div></div><div class="auth-page-account-subtext-container" data-v-5b25a90f><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext" data-v-5b25a90f>${ssrInterpolate(formatIban(account.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Balance</div><div class="auth-page-account-amount-container" data-v-5b25a90f>`);
            _push(ssrRenderComponent(DirhamAmount, {
              amount: account.balance
            }, null, _parent));
            _push(`</div></div>`);
            if (account.type === "CurrentAccount") {
              _push(`<div class="auth-page-account-subtext-container-2" data-v-5b25a90f><div class="auth-page-account-subtext-part" data-v-5b25a90f>Overdraft</div><div class="auth-page-account-amount-container" data-v-5b25a90f>`);
              _push(ssrRenderComponent(DirhamAmount, {
                amount: account.secondary || 0
              }, null, _parent));
              _push(`</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div></div></div>`);
      }
      if (!debtorMismatch.value && !((_S = (_R = unref(sharedState)) == null ? void 0 : _R.simulatedBehaviour) == null ? void 0 : _S.alreadyTrustedPayee)) {
        _push(`<div class="auth-page-text-frame-2" data-v-5b25a90f><div class="auth-page-text-bottom" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer" })}" data-v-5b25a90f><div class="auth-page-account-checkbox" data-v-5b25a90f><div class="${ssrRenderClass([{ "is-active": selected_add_to_trusted.value }, "auth-page-account-checkbox-inactive"])}" data-v-5b25a90f><svg class="auth-page-account-checkbox-check" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white" data-v-5b25a90f></path></svg></div></div> ${ssrInterpolate(trustedPayeeText.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value && isOverdraft.value && !((_U = (_T = unref(sharedState)) == null ? void 0 : _T.simulatedBehaviour) == null ? void 0 : _U.paymentLimitExceeded)) {
        _push(`<div class="auth-page-warning" data-v-5b25a90f><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M12 7.75V13" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M12 16.2V16.2999" stroke="#FD6436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path></svg><div class="auth-page-warning-text" data-v-5b25a90f> This payment will take your selected account into an overdraft/unarranged overdraft. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value && ((_W = (_V = unref(sharedState)) == null ? void 0 : _V.simulatedBehaviour) == null ? void 0 : _W.duplicatePaymentAlert) && !isOverdraft.value && !((_Y = (_X = unref(sharedState)) == null ? void 0 : _X.simulatedBehaviour) == null ? void 0 : _Y.paymentLimitExceeded)) {
        _push(`<div class="auth-page-warning" data-v-5b25a90f><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M12 7.75V13" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M12 16.2V16.2999" stroke="#FD6436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path></svg><div class="auth-page-warning-text" data-v-5b25a90f> Duplicate Payment Alert <br data-v-5b25a90f><br data-v-5b25a90f> Our systems indicate that you have already made a payment of the same amount to this beneficiary in the last 24 hours. Please check and ensure that you are not making a duplicate payment. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value && ((__ = (_Z = unref(sharedState)) == null ? void 0 : _Z.simulatedBehaviour) == null ? void 0 : __.paymentLimitExceeded)) {
        _push(`<div class="auth-page-warning" data-v-5b25a90f><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M12 7.75V13" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#FD6436" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path><path d="M12 16.2V16.2999" stroke="#FD6436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5b25a90f></path></svg><div class="auth-page-warning-text" data-v-5b25a90f> Payment limit exceeded <br data-v-5b25a90f><br data-v-5b25a90f> The amount exceeds the payment limit you&#39;ve set on your account. You may need to change your settings or try a smaller amount. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value && authPermissionText.value) {
        _push(`<div class="auth-page-text-frame-2" data-v-5b25a90f><div class="auth-page-text-bottom" data-v-5b25a90f>${ssrInterpolate(authPermissionText.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-button-with-description" data-v-5b25a90f><div class="auth-page-button" data-v-5b25a90f><div class="auth-page-button-text-section" data-v-5b25a90f><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-5b25a90f></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-5b25a90f></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-5b25a90f></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-5b25a90f></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-5b25a90f></path><defs data-v-5b25a90f><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#4083E1" data-v-5b25a90f></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-5b25a90f></stop><stop offset="0.48" stop-color="#36B1CC" data-v-5b25a90f></stop><stop offset="0.8" stop-color="#31C9C1" data-v-5b25a90f></stop><stop offset="1" stop-color="#30D2BE" data-v-5b25a90f></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#80ACEB" data-v-5b25a90f></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-5b25a90f></stop><stop offset="0.73" stop-color="#76D8D7" data-v-5b25a90f></stop><stop offset="1" stop-color="#75E1D4" data-v-5b25a90f></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#BFD6F5" data-v-5b25a90f></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-5b25a90f></stop><stop offset="1" stop-color="#BAF0E9" data-v-5b25a90f></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#40E0C7" data-v-5b25a90f></stop><stop offset="0.304248" stop-color="#0050C8" data-v-5b25a90f></stop><stop offset="0.623256" stop-color="white" data-v-5b25a90f></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-5b25a90f> Pay using AlTareq </div></div></div><div class="auth-page-button-cancel" data-v-5b25a90f><div class="auth-page-button-cancel-text" data-v-5b25a90f> Cancel </div></div></div>`);
      } else {
        _push(`<div class="auth-page-button-with-description auth-page-button-with-description--error" data-v-5b25a90f><div class="auth-page-button" data-v-5b25a90f><div class="auth-page-button-text-section" data-v-5b25a90f><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5b25a90f><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-5b25a90f></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-5b25a90f></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-5b25a90f></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-5b25a90f></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-5b25a90f></path><defs data-v-5b25a90f><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#4083E1" data-v-5b25a90f></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-5b25a90f></stop><stop offset="0.48" stop-color="#36B1CC" data-v-5b25a90f></stop><stop offset="0.8" stop-color="#31C9C1" data-v-5b25a90f></stop><stop offset="1" stop-color="#30D2BE" data-v-5b25a90f></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#80ACEB" data-v-5b25a90f></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-5b25a90f></stop><stop offset="0.73" stop-color="#76D8D7" data-v-5b25a90f></stop><stop offset="1" stop-color="#75E1D4" data-v-5b25a90f></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#BFD6F5" data-v-5b25a90f></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-5b25a90f></stop><stop offset="1" stop-color="#BAF0E9" data-v-5b25a90f></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-5b25a90f><stop stop-color="#40E0C7" data-v-5b25a90f></stop><stop offset="0.304248" stop-color="#0050C8" data-v-5b25a90f></stop><stop offset="0.623256" stop-color="white" data-v-5b25a90f></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-5b25a90f> Close </div></div></div><div class="auth-page-button-description" data-v-5b25a90f> By pressing Close you will be returned to ${ssrInterpolate(((_ba = (_aa = (_$ = unref(sharedState)) == null ? void 0 : _$.consent) == null ? void 0 : _aa.OnBehalfOf) == null ? void 0 : _ba.TradingName) || "[TPP Trading Name]")}. No data will be shared. </div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/authorization-ui/AuthorizationSingleInstantPayment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5b25a90f"]]);
const _sfc_main = {
  __name: "ConsentSingleInstantPayment",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState, consentData } = useSharedState();
    const show_payee_information = ref(true);
    const show_payer_information = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa;
      const _component_PaymentConsentPermissionsText = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consent-page-frame" }, _attrs))} data-v-fe198f39><div class="consent-page-header" data-v-fe198f39><div class="consent-page-screen-name" data-v-fe198f39><div class="consent-page-tpp-text" data-v-fe198f39> TPP </div><svg class="consent-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-fe198f39></path></svg><div class="consent-page-rectangle" data-v-fe198f39></div></div><div class="consent-page-contents" data-v-fe198f39><img class="consent-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-fe198f39><div class="consent-page-progress" data-v-fe198f39><div class="consent-page-progress-1" data-v-fe198f39><div class="consent-page-progress-icon-active" data-v-fe198f39><div class="consent-page-progress-icon-text-active" data-v-fe198f39> 1 </div></div><div class="consent-page-progress-text" data-v-fe198f39> Consent </div></div><div class="consent-page-progress-2" data-v-fe198f39><div class="consent-page-progress-icon" data-v-fe198f39><div class="consent-page-progress-icon-text" data-v-fe198f39> 2 </div></div><div class="consent-page-progress-text" data-v-fe198f39> Authorize </div></div><div class="consent-page-progress-3" data-v-fe198f39><div class="consent-page-progress-icon" data-v-fe198f39><div class="consent-page-progress-icon-text" data-v-fe198f39> 3 </div></div><div class="consent-page-progress-text" data-v-fe198f39> Complete </div></div><svg class="consent-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-fe198f39></path><path d="M0.5 1H53.5" stroke="#00C8AF" stroke-width="2" data-v-fe198f39></path></svg></div></div></div><div class="consent-page-text-frame" data-v-fe198f39><div class="consent-page-text-inner-frame" data-v-fe198f39><div class="consent-page-text-header" data-v-fe198f39> Permission to make a payment </div><div class="consent-page-text-section" data-v-fe198f39><div class="consent-page-text" data-v-fe198f39> To make a payment from your bank, we need your permission to securely initiate the payment </div><div class="consent-page-accounts-section" data-v-fe198f39><div class="consent-page-account-card" data-v-fe198f39><div class="consent-page-account-title" data-v-fe198f39><div class="consent-page-account-title-icon" data-v-fe198f39><div class="consent-page-account-title-icon-2" data-v-fe198f39><svg class="consent-page-account-title-icon-3" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.19393H10.6V2.39393H1.2V14.1939H18V10.3739H19.2V15.3939H0V1.19393ZM18 2.39393H13.143V1.19393H19.2V6.24563H18V2.39393Z" fill="white" data-v-fe198f39></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.6661 5.0243H3.53262V3.8243H18.6661V5.0243Z" fill="white" data-v-fe198f39></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2702 0L15.0882 3.94519L14.1118 4.64268L11.9298 1.58787L6.40232 4.8122L5.79768 3.77567L12.2702 0Z" fill="white" data-v-fe198f39></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 6.19393H20.2V11.3939H10V6.19393ZM11.2 7.39393V10.1939H19V7.39393H11.2Z" fill="white" data-v-fe198f39></path><path d="M13.2455 8.86667C13.2455 9.18298 12.989 9.4394 12.6727 9.4394C12.3564 9.4394 12.1 9.18298 12.1 8.86667C12.1 8.55035 12.3564 8.29393 12.6727 8.29393C12.989 8.29393 13.2455 8.55035 13.2455 8.86667Z" fill="white" data-v-fe198f39></path></svg></div><div class="consent-page-account-title-elipse" data-v-fe198f39></div><div class="consent-page-account-title-text" data-v-fe198f39> Payment Total </div><div class="consent-page-title-text-2" data-v-fe198f39>`);
      _push(ssrRenderComponent(DirhamAmount, {
        style: { "font-weight": "300" },
        iconColor: "#0C1441",
        amount: (_e = (_d = (_c = (_b = (_a = unref(consentData)) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.ConsentSchedule) == null ? void 0 : _c.SinglePayment) == null ? void 0 : _d.Amount) == null ? void 0 : _e.Amount
      }, null, _parent));
      _push(`</div></div></div><div class="consent-page-account-subtext-container" data-v-fe198f39><div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>Payment Reference</div><div class="consent-page-account-amount" data-v-fe198f39>${ssrInterpolate((_f = unref(consentData)) == null ? void 0 : _f.DebtorReference)}</div></div><div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>Payment Purpose</div><div class="consent-page-account-amount" data-v-fe198f39>${ssrInterpolate(unref(getPurposeDescription)((_g = unref(consentData)) == null ? void 0 : _g.PaymentPurposeCode))}</div></div></div></div></div><div class="consent-page-text-inner-frame-2" data-v-fe198f39><div class="consent-page-text-mini-header-section" data-v-fe198f39><div class="consent-page-text-mini-header-section-header" data-v-fe198f39><div class="consent-page-text-min-header-section-header-text" data-v-fe198f39> Payer Information </div><svg class="${ssrRenderClass([{ "is-open": show_payer_information.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-fe198f39></path></svg></div></div>`);
      if (show_payer_information.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>Bank</div><div class="consent-page-account-amount" data-v-fe198f39> [Your LFI] </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payer_information.value && ((_k = (_j = (_i = (_h = unref(sharedState)) == null ? void 0 : _h.pii) == null ? void 0 : _i.Initiation) == null ? void 0 : _j.DebtorAccount) == null ? void 0 : _k.Identification)) {
        _push(`<!--[--><div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>Name</div><div class="consent-page-account-amount" data-v-fe198f39>${ssrInterpolate(((_p = (_o = (_n = (_m = (_l = unref(sharedState)) == null ? void 0 : _l.pii) == null ? void 0 : _m.Initiation) == null ? void 0 : _n.DebtorAccount) == null ? void 0 : _o.Name) == null ? void 0 : _p.en) || ((_u = (_t = (_s = (_r = (_q = unref(sharedState)) == null ? void 0 : _q.pii) == null ? void 0 : _r.Initiation) == null ? void 0 : _s.DebtorAccount) == null ? void 0 : _t.Name) == null ? void 0 : _u.ar))}</div></div><div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>IBAN</div><div class="consent-page-account-amount-iban" data-v-fe198f39>${ssrInterpolate((_A = (_z = (_y = (_x = (_w = (_v = unref(sharedState)) == null ? void 0 : _v.pii) == null ? void 0 : _w.Initiation) == null ? void 0 : _x.DebtorAccount) == null ? void 0 : _y.Identification) == null ? void 0 : _z.match(/.{1,4}/g)) == null ? void 0 : _A.join(" "))}</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-fe198f39><div class="consent-page-text-mini-header-section" data-v-fe198f39><div class="consent-page-text-mini-header-section-header" data-v-fe198f39><div class="consent-page-text-min-header-section-header-text" data-v-fe198f39> Payee Information </div><svg class="${ssrRenderClass([{ "is-open": show_payee_information.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-fe198f39></path></svg></div></div>`);
      if (show_payee_information.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>Payee Name</div><div class="consent-page-account-amount" data-v-fe198f39>${ssrInterpolate(((_G = (_F = (_E = (_D = (_C = (_B = unref(sharedState)) == null ? void 0 : _B.pii) == null ? void 0 : _C.Initiation) == null ? void 0 : _D.Creditor) == null ? void 0 : _E[0]) == null ? void 0 : _F.Creditor) == null ? void 0 : _G.Name) || ((_N = (_M = (_L = (_K = (_J = (_I = (_H = unref(sharedState)) == null ? void 0 : _H.pii) == null ? void 0 : _I.Initiation) == null ? void 0 : _J.Creditor) == null ? void 0 : _K[0]) == null ? void 0 : _L.CreditorAccount) == null ? void 0 : _M.Name) == null ? void 0 : _N.en) || ((_U = (_T = (_S = (_R = (_Q = (_P = (_O = unref(sharedState)) == null ? void 0 : _O.pii) == null ? void 0 : _P.Initiation) == null ? void 0 : _Q.Creditor) == null ? void 0 : _R[0]) == null ? void 0 : _S.CreditorAccount) == null ? void 0 : _T.Name) == null ? void 0 : _U.ar))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payee_information.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-fe198f39><div class="consent-page-account-subtext-part" data-v-fe198f39>IBAN</div><div class="consent-page-account-amount-iban" data-v-fe198f39>${ssrInterpolate((_aa = (_$ = (__ = (_Z = (_Y = (_X = (_W = (_V = unref(sharedState)) == null ? void 0 : _V.pii) == null ? void 0 : _W.Initiation) == null ? void 0 : _X.Creditor) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.CreditorAccount) == null ? void 0 : __.Identification) == null ? void 0 : _$.match(/.{1,4}/g)) == null ? void 0 : _aa.join(" "))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "cop-result", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_PaymentConsentPermissionsText, null, null, _parent));
      _push(`<div class="consent-page-button-with-description" data-v-fe198f39><div class="consent-page-button" data-v-fe198f39><div class="consent-page-button-text-section" data-v-fe198f39><svg class="consent-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fe198f39><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-fe198f39></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-fe198f39></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-fe198f39></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-fe198f39></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-fe198f39></path><defs data-v-fe198f39><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-fe198f39><stop stop-color="#4083E1" data-v-fe198f39></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-fe198f39></stop><stop offset="0.48" stop-color="#36B1CC" data-v-fe198f39></stop><stop offset="0.8" stop-color="#31C9C1" data-v-fe198f39></stop><stop offset="1" stop-color="#30D2BE" data-v-fe198f39></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-fe198f39><stop stop-color="#80ACEB" data-v-fe198f39></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-fe198f39></stop><stop offset="0.73" stop-color="#76D8D7" data-v-fe198f39></stop><stop offset="1" stop-color="#75E1D4" data-v-fe198f39></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-fe198f39><stop stop-color="#BFD6F5" data-v-fe198f39></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-fe198f39></stop><stop offset="1" stop-color="#BAF0E9" data-v-fe198f39></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-fe198f39><stop stop-color="#40E0C7" data-v-fe198f39></stop><stop offset="0.304248" stop-color="#0050C8" data-v-fe198f39></stop><stop offset="0.623256" stop-color="white" data-v-fe198f39></stop></radialGradient></defs></svg><div class="consent-page-button-text" data-v-fe198f39> Pay using AlTareq </div></div></div><div class="consent-page-button-description" data-v-fe198f39> We will securely transfer you to [YOUR LFI] to authorize and set up the payment </div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentSingleInstantPayment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe198f39"]]);
export {
  __unplugin_components_4 as _,
  __unplugin_components_3 as a
};
