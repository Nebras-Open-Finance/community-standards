import { computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { a as _imports_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { g as getAuthPaymentPermissionText, a as getPurposeDescription, _ as __unplugin_components_0 } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { f as formatDate } from "./formatDate-CaaKrjgT.js";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = {
  __name: "AuthorizationPeriodicSchedule",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState, consentData } = useSharedState();
    const merchantName = computed(() => {
      var _a, _b, _c, _d, _e;
      return (_e = (_d = (_c = (_b = (_a = sharedState.value) == null ? void 0 : _a.pii) == null ? void 0 : _b.Risk) == null ? void 0 : _c.CreditorIndicators) == null ? void 0 : _d.MerchantDetails) == null ? void 0 : _e.MerchantName;
    });
    const selected = ref(null);
    const benefListOpen = ref(true);
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
    const periodicSchedule = computed(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = consentData.value) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.ConsentSchedule) == null ? void 0 : _c.MultiPayment) == null ? void 0 : _d.PeriodicSchedule;
    });
    const primaryAmountLabel = computed(() => {
      var _a;
      return ((_a = periodicSchedule.value) == null ? void 0 : _a.MaximumIndividualAmount) ? "Max per Payment" : "Amount";
    });
    const primaryAmount = computed(() => {
      var _a, _b, _c, _d;
      return ((_b = (_a = periodicSchedule.value) == null ? void 0 : _a.MaximumIndividualAmount) == null ? void 0 : _b.Amount) ?? ((_d = (_c = periodicSchedule.value) == null ? void 0 : _c.Amount) == null ? void 0 : _d.Amount);
    });
    const authPermissionText = computed(
      () => {
        var _a;
        return getAuthPaymentPermissionText((_a = consentData.value) == null ? void 0 : _a.Permissions);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page-frame" }, _attrs))} data-v-a8db8828><div class="auth-page-header" data-v-a8db8828><div class="auth-page-screen-name" data-v-a8db8828><div class="auth-page-tpp-text" data-v-a8db8828> LFI </div><svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-a8db8828></path></svg><div class="auth-page-rectangle" data-v-a8db8828></div></div><div class="auth-page-contents" data-v-a8db8828><img class="auth-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-a8db8828><div class="auth-page-progress" data-v-a8db8828><div class="auth-page-progress-1" data-v-a8db8828><div class="auth-page-progress-icon-active" data-v-a8db8828><svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-a8db8828></path></svg></div><div class="auth-page-progress-text" data-v-a8db8828> Consent </div></div><div class="auth-page-progress-2" data-v-a8db8828><div class="auth-page-progress-icon-active" data-v-a8db8828><div class="auth-page-progress-icon-text-active" data-v-a8db8828> 2 </div></div><div class="auth-page-progress-text" data-v-a8db8828> Authorize </div></div><div class="auth-page-progress-3" data-v-a8db8828><div class="auth-page-progress-icon" data-v-a8db8828><div class="auth-page-progress-icon-text" data-v-a8db8828> 3 </div></div><div class="auth-page-progress-text" data-v-a8db8828> Complete </div></div><svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-a8db8828></path><path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" data-v-a8db8828></path></svg></div></div></div>`);
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-text-frame" data-v-a8db8828><div class="auth-page-text-inner-frame" data-v-a8db8828><div class="auth-page-text-header" data-v-a8db8828> Flexi-Pay Setup `);
        if ((_d = (_c = (_b = (_a = unref(sharedState)) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.Creditor) == null ? void 0 : _d.length) {
          _push(`<div class="auth-page-text-header-sub" data-v-a8db8828> [TPP trading name] needs your permission `);
          if (merchantName.value) {
            _push(`<!--[--> on-behalf of ${ssrInterpolate(merchantName.value)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` to make payment(s) from your account within the payment rules below: </div>`);
        } else {
          _push(`<div class="auth-page-text-header-sub" data-v-a8db8828> [TPP trading name] needs your permission `);
          if (merchantName.value) {
            _push(`<!--[--> on-behalf of ${ssrInterpolate(merchantName.value)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` to make payments from your account under the rules below. They will process payments in line with your agreement and are responsible for selecting the beneficiaries. </div>`);
        }
        _push(`</div><div class="auth-page-accounts-section" data-v-a8db8828><div class="auth-page-account-card" data-v-a8db8828>`);
        if ((_h = (_g = (_f = (_e = unref(sharedState)) == null ? void 0 : _e.pii) == null ? void 0 : _f.Initiation) == null ? void 0 : _g.Creditor) == null ? void 0 : _h.length) {
          _push(`<div class="auth-page-account-header-2" data-v-a8db8828>Who you’re paying</div>`);
        } else {
          _push(`<div class="auth-page-account-header-2" data-v-a8db8828>Payment Details</div>`);
        }
        _push(`<div class="auth-page-account-subtext-container" data-v-a8db8828>`);
        if ((((_l = (_k = (_j = (_i = unref(sharedState)) == null ? void 0 : _i.pii) == null ? void 0 : _j.Initiation) == null ? void 0 : _k.Creditor) == null ? void 0 : _l.length) ?? 0) === 1) {
          _push(`<!--[--><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Payee Name</div><div class="auth-page-account-amount-container" data-v-a8db8828><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate(((_r = (_q = (_p = (_o = (_n = (_m = unref(sharedState)) == null ? void 0 : _m.pii) == null ? void 0 : _n.Initiation) == null ? void 0 : _o.Creditor) == null ? void 0 : _p[0]) == null ? void 0 : _q.Creditor) == null ? void 0 : _r.Name) || ((_y = (_x = (_w = (_v = (_u = (_t = (_s = unref(sharedState)) == null ? void 0 : _s.pii) == null ? void 0 : _t.Initiation) == null ? void 0 : _u.Creditor) == null ? void 0 : _v[0]) == null ? void 0 : _w.CreditorAccount) == null ? void 0 : _x.Name) == null ? void 0 : _y.en) || ((_F = (_E = (_D = (_C = (_B = (_A = (_z = unref(sharedState)) == null ? void 0 : _z.pii) == null ? void 0 : _A.Initiation) == null ? void 0 : _B.Creditor) == null ? void 0 : _C[0]) == null ? void 0 : _D.CreditorAccount) == null ? void 0 : _E.Name) == null ? void 0 : _F.ar))}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>IBAN</div><div class="auth-page-account-amount-container" data-v-a8db8828><div class="auth-page-account-amount-iban" data-v-a8db8828>${ssrInterpolate((_N = (_M = (_L = (_K = (_J = (_I = (_H = (_G = unref(sharedState)) == null ? void 0 : _G.pii) == null ? void 0 : _H.Initiation) == null ? void 0 : _I.Creditor) == null ? void 0 : _J[0]) == null ? void 0 : _K.CreditorAccount) == null ? void 0 : _L.Identification) == null ? void 0 : _M.match(/.{1,4}/g)) == null ? void 0 : _N.join(" "))}</div></div></div><!--]-->`);
        } else if ((((_R = (_Q = (_P = (_O = unref(sharedState)) == null ? void 0 : _O.pii) == null ? void 0 : _P.Initiation) == null ? void 0 : _Q.Creditor) == null ? void 0 : _R.length) ?? 0) > 1) {
          _push(`<div class="benef-drop" data-v-a8db8828><div class="benef-card" data-v-a8db8828><div class="benef-drop-header" data-v-a8db8828><span class="benef-drop-label" data-v-a8db8828>Beneficiary List</span><svg class="${ssrRenderClass([{ "benef-drop-arrow-collapsed": !benefListOpen.value }, "benef-drop-arrow"])}" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-a8db8828><path d="M1 1L7 6.5L1 12" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-a8db8828></path></svg></div>`);
          if (benefListOpen.value) {
            _push(`<div class="benef-drop-items" data-v-a8db8828><!--[-->`);
            ssrRenderList((_U = (_T = (_S = unref(sharedState)) == null ? void 0 : _S.pii) == null ? void 0 : _T.Initiation) == null ? void 0 : _U.Creditor, (creditor, idx) => {
              var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
              _push(`<div class="benef-item" data-v-a8db8828><div class="benef-text-line benef-text-line-center" data-v-a8db8828><span class="benef-name" data-v-a8db8828>${ssrInterpolate(((_a2 = creditor == null ? void 0 : creditor.Creditor) == null ? void 0 : _a2.Name) || ((_c2 = (_b2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _b2.Name) == null ? void 0 : _c2.en) || ((_e2 = (_d2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _d2.Name) == null ? void 0 : _e2.ar))}</span></div><div class="benef-text-line" data-v-a8db8828><span class="benef-iban-label" data-v-a8db8828>IBAN</span><span class="benef-iban" data-v-a8db8828>${ssrInterpolate((_h2 = (_g2 = (_f2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _f2.Identification) == null ? void 0 : _g2.match(/.{1,4}/g)) == null ? void 0 : _h2.join(" "))}</span></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Payment Reference</div><div class="auth-page-account-amount-container" data-v-a8db8828><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate((_V = unref(consentData)) == null ? void 0 : _V.DebtorReference)}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Payment Purpose</div><div class="auth-page-account-amount-container" data-v-a8db8828><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate(unref(getPurposeDescription)((_W = unref(consentData)) == null ? void 0 : _W.PaymentPurposeCode))}</div></div></div></div></div><div class="auth-page-account-card" data-v-a8db8828><div class="auth-page-account-header-2" data-v-a8db8828>Payment rules</div><div class="auth-page-account-subtext-container" data-v-a8db8828><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>${ssrInterpolate(primaryAmountLabel.value)}</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
        _push(ssrRenderComponent(DirhamAmount, { amount: primaryAmount.value }, null, _parent));
        _push(`</div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>First Payment Date</div><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate(unref(formatDate)((_$ = (__ = (_Z = (_Y = (_X = unref(consentData)) == null ? void 0 : _X.ControlParameters) == null ? void 0 : _Y.ConsentSchedule) == null ? void 0 : _Z.MultiPayment) == null ? void 0 : __.PeriodicSchedule) == null ? void 0 : _$.PeriodStartDate))}</div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Payments Repeat every</div><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate((_ea = (_da = (_ca = (_ba = (_aa = unref(consentData)) == null ? void 0 : _aa.ControlParameters) == null ? void 0 : _ba.ConsentSchedule) == null ? void 0 : _ca.MultiPayment) == null ? void 0 : _da.PeriodicSchedule) == null ? void 0 : _ea.PeriodType)}</div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Stop Payments on</div><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate(unref(formatDate)((_fa = unref(consentData)) == null ? void 0 : _fa.ExpirationDateTime))}</div></div>`);
        if ((_ja = (_ia = (_ha = (_ga = unref(consentData)) == null ? void 0 : _ga.ControlParameters) == null ? void 0 : _ha.ConsentSchedule) == null ? void 0 : _ia.MultiPayment) == null ? void 0 : _ja.MaximumCumulativeNumberOfPayments) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Total Number of Payments allowed</div><div class="auth-page-account-amount-container" data-v-a8db8828><div class="auth-page-account-amount" data-v-a8db8828>${ssrInterpolate((_na = (_ma = (_la = (_ka = unref(consentData)) == null ? void 0 : _ka.ControlParameters) == null ? void 0 : _la.ConsentSchedule) == null ? void 0 : _ma.MultiPayment) == null ? void 0 : _na.MaximumCumulativeNumberOfPayments)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ra = (_qa = (_pa = (_oa = unref(consentData)) == null ? void 0 : _oa.ControlParameters) == null ? void 0 : _pa.ConsentSchedule) == null ? void 0 : _qa.MultiPayment) == null ? void 0 : _ra.MaximumCumulativeValueOfPayments) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Total Value allowed</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: (_wa = (_va = (_ua = (_ta = (_sa = unref(consentData)) == null ? void 0 : _sa.ControlParameters) == null ? void 0 : _ta.ConsentSchedule) == null ? void 0 : _ua.MultiPayment) == null ? void 0 : _va.MaximumCumulativeValueOfPayments) == null ? void 0 : _wa.Amount
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (debtorMismatch.value) {
        _push(`<div class="auth-page-text-frame" data-v-a8db8828><div class="auth-page-text-inner-frame" data-v-a8db8828><div class="auth-page-text-header" data-v-a8db8828> Something went wrong </div><div class="auth-page-error-image-container" data-v-a8db8828><svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-a8db8828></path><path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-a8db8828></path><path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-a8db8828></path><path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-a8db8828></path></svg></div><div class="auth-page-text" data-v-a8db8828> The account specified by ${ssrInterpolate(((_za = (_ya = (_xa = unref(sharedState)) == null ? void 0 : _xa.consent) == null ? void 0 : _ya.OnBehalfOf) == null ? void 0 : _za.TradingName) || "[TPP Trading Name]")} doesn&#39;t match any of your accounts. Please go back and try again. </div></div></div>`);
      } else {
        _push(`<div class="auth-page-text-frame" data-v-a8db8828><div class="auth-page-text-inner-frame" data-v-a8db8828><div class="auth-page-text-header" data-v-a8db8828>${ssrInterpolate(matchedDebtorAccount.value ? "Account selected for the payment" : "Please select the account to pay from")}</div><div class="auth-page-accounts-section" data-v-a8db8828>`);
        if (matchedDebtorAccount.value) {
          _push(`<div class="auth-page-account-card" data-v-a8db8828><div class="auth-page-account-title" data-v-a8db8828><div class="auth-page-account-title-text" data-v-a8db8828>${ssrInterpolate(TYPE_LABELS[matchedDebtorAccount.value.type])}</div></div><div class="auth-page-account-subtext-container" data-v-a8db8828><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext" data-v-a8db8828>${ssrInterpolate(formatIban(matchedDebtorAccount.value.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Balance</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: matchedDebtorAccount.value.balance
          }, null, _parent));
          _push(`</div></div>`);
          if (matchedDebtorAccount.value.type === "CurrentAccount") {
            _push(`<div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Overdraft</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
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
            _push(`<div class="auth-page-account-card" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-a8db8828><div class="auth-page-account-title" data-v-a8db8828><div class="auth-page-account-title-text" data-v-a8db8828>${ssrInterpolate(TYPE_LABELS[account.type])}</div><div class="auth-page-account-checkbox-2" data-v-a8db8828><div class="${ssrRenderClass([{ "is-active": selected.value === account.id }, "auth-page-account-checkbox-inactive-2"])}" data-v-a8db8828><div class="auth-page-account-checkbox-selected" data-v-a8db8828></div></div></div></div><div class="auth-page-account-subtext-container" data-v-a8db8828><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext" data-v-a8db8828>${ssrInterpolate(formatIban(account.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Balance</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
            _push(ssrRenderComponent(DirhamAmount, {
              amount: account.balance
            }, null, _parent));
            _push(`</div></div>`);
            if (account.type === "CurrentAccount") {
              _push(`<div class="auth-page-account-subtext-container-2" data-v-a8db8828><div class="auth-page-account-subtext-part" data-v-a8db8828>Overdraft</div><div class="auth-page-account-amount-container" data-v-a8db8828>`);
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
      if (!debtorMismatch.value && authPermissionText.value) {
        _push(`<div class="auth-page-text-frame-2" data-v-a8db8828><div class="auth-page-text-bottom" data-v-a8db8828>${ssrInterpolate(authPermissionText.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-button-with-description" data-v-a8db8828><div class="auth-page-button" data-v-a8db8828><div class="auth-page-button-text-section" data-v-a8db8828><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-a8db8828></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-a8db8828></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-a8db8828></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-a8db8828></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-a8db8828></path><defs data-v-a8db8828><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#4083E1" data-v-a8db8828></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-a8db8828></stop><stop offset="0.48" stop-color="#36B1CC" data-v-a8db8828></stop><stop offset="0.8" stop-color="#31C9C1" data-v-a8db8828></stop><stop offset="1" stop-color="#30D2BE" data-v-a8db8828></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#80ACEB" data-v-a8db8828></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-a8db8828></stop><stop offset="0.73" stop-color="#76D8D7" data-v-a8db8828></stop><stop offset="1" stop-color="#75E1D4" data-v-a8db8828></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#BFD6F5" data-v-a8db8828></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-a8db8828></stop><stop offset="1" stop-color="#BAF0E9" data-v-a8db8828></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#40E0C7" data-v-a8db8828></stop><stop offset="0.304248" stop-color="#0050C8" data-v-a8db8828></stop><stop offset="0.623256" stop-color="white" data-v-a8db8828></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-a8db8828> Authorize using AlTareq </div></div></div><div class="auth-page-button-cancel" data-v-a8db8828><div class="auth-page-button-cancel-text" data-v-a8db8828> Cancel </div></div></div>`);
      } else {
        _push(`<div class="auth-page-button-with-description auth-page-button-with-description--error" data-v-a8db8828><div class="auth-page-button" data-v-a8db8828><div class="auth-page-button-text-section" data-v-a8db8828><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a8db8828><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-a8db8828></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-a8db8828></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-a8db8828></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-a8db8828></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-a8db8828></path><defs data-v-a8db8828><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#4083E1" data-v-a8db8828></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-a8db8828></stop><stop offset="0.48" stop-color="#36B1CC" data-v-a8db8828></stop><stop offset="0.8" stop-color="#31C9C1" data-v-a8db8828></stop><stop offset="1" stop-color="#30D2BE" data-v-a8db8828></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#80ACEB" data-v-a8db8828></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-a8db8828></stop><stop offset="0.73" stop-color="#76D8D7" data-v-a8db8828></stop><stop offset="1" stop-color="#75E1D4" data-v-a8db8828></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#BFD6F5" data-v-a8db8828></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-a8db8828></stop><stop offset="1" stop-color="#BAF0E9" data-v-a8db8828></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-a8db8828><stop stop-color="#40E0C7" data-v-a8db8828></stop><stop offset="0.304248" stop-color="#0050C8" data-v-a8db8828></stop><stop offset="0.623256" stop-color="white" data-v-a8db8828></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-a8db8828> Close </div></div></div><div class="auth-page-button-description" data-v-a8db8828> By pressing Close you will be returned to ${ssrInterpolate(((_Ca = (_Ba = (_Aa = unref(sharedState)) == null ? void 0 : _Aa.consent) == null ? void 0 : _Ba.OnBehalfOf) == null ? void 0 : _Ca.TradingName) || "[TPP Trading Name]")}. No data will be shared. </div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/authorization-ui/AuthorizationPeriodicSchedule.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a8db8828"]]);
const _sfc_main = {
  __name: "ConsentPeriodicSchedule",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState, consentData } = useSharedState();
    const show_payment_setup = ref(true);
    const show_payment_rules = ref(true);
    const show_from_account = ref(true);
    const show_to_account = ref(true);
    const show_terms = ref(false);
    const periodicSchedule = computed(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = consentData.value) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.ConsentSchedule) == null ? void 0 : _c.MultiPayment) == null ? void 0 : _d.PeriodicSchedule;
    });
    const primaryAmountLabel = computed(() => {
      var _a;
      return ((_a = periodicSchedule.value) == null ? void 0 : _a.MaximumIndividualAmount) ? "Max per Payment" : "Amount";
    });
    const primaryAmount = computed(() => {
      var _a, _b, _c, _d;
      return ((_b = (_a = periodicSchedule.value) == null ? void 0 : _a.MaximumIndividualAmount) == null ? void 0 : _b.Amount) ?? ((_d = (_c = periodicSchedule.value) == null ? void 0 : _c.Amount) == null ? void 0 : _d.Amount);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb;
      const _component_PaymentConsentPermissionsText = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consent-page-frame" }, _attrs))} data-v-19ea6e71><div class="consent-page-header" data-v-19ea6e71><div class="consent-page-screen-name" data-v-19ea6e71><div class="consent-page-tpp-text" data-v-19ea6e71> TPP </div><svg class="consent-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-19ea6e71></path></svg><div class="consent-page-rectangle" data-v-19ea6e71></div></div><div class="consent-page-contents" data-v-19ea6e71><img class="consent-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-19ea6e71><div class="consent-page-progress" data-v-19ea6e71><div class="consent-page-progress-1" data-v-19ea6e71><div class="consent-page-progress-icon-active" data-v-19ea6e71><div class="consent-page-progress-icon-text-active" data-v-19ea6e71> 1 </div></div><div class="consent-page-progress-text" data-v-19ea6e71> Consent </div></div><div class="consent-page-progress-2" data-v-19ea6e71><div class="consent-page-progress-icon" data-v-19ea6e71><div class="consent-page-progress-icon-text" data-v-19ea6e71> 2 </div></div><div class="consent-page-progress-text" data-v-19ea6e71> Authorize </div></div><div class="consent-page-progress-3" data-v-19ea6e71><div class="consent-page-progress-icon" data-v-19ea6e71><div class="consent-page-progress-icon-text" data-v-19ea6e71> 3 </div></div><div class="consent-page-progress-text" data-v-19ea6e71> Complete </div></div><svg class="consent-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-19ea6e71></path><path d="M0.5 1H53.5" stroke="#00C8AF" stroke-width="2" data-v-19ea6e71></path></svg></div></div></div><div class="consent-page-text-frame" data-v-19ea6e71><div class="consent-page-text-inner-frame" data-v-19ea6e71><div class="consent-page-text-header" data-v-19ea6e71> Permission to make payment(s) </div><div class="consent-page-text-section" data-v-19ea6e71><div class="consent-page-text" data-v-19ea6e71> To make payments from your bank, we need your permission to securely initiate the payment(s) </div><div class="consent-page-text-inner-frame-2" data-v-19ea6e71><div class="consent-page-text-mini-header-section" data-v-19ea6e71><div class="consent-page-text-mini-header-section-header" data-v-19ea6e71><div class="consent-page-text-min-header-section-header-text" data-v-19ea6e71> Payment setup </div><svg class="${ssrRenderClass([{ "is-open": show_payment_setup.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-19ea6e71></path></svg></div></div>`);
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Payment to</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(((_f = (_e = (_d = (_c = (_b = (_a = unref(sharedState)) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.Creditor) == null ? void 0 : _d[0]) == null ? void 0 : _e.Creditor) == null ? void 0 : _f.Name) || ((_m = (_l = (_k = (_j = (_i = (_h = (_g = unref(sharedState)) == null ? void 0 : _g.pii) == null ? void 0 : _h.Initiation) == null ? void 0 : _i.Creditor) == null ? void 0 : _j[0]) == null ? void 0 : _k.CreditorAccount) == null ? void 0 : _l.Name) == null ? void 0 : _m.en) || ((_t = (_s = (_r = (_q = (_p = (_o = (_n = unref(sharedState)) == null ? void 0 : _n.pii) == null ? void 0 : _o.Initiation) == null ? void 0 : _p.Creditor) == null ? void 0 : _q[0]) == null ? void 0 : _r.CreditorAccount) == null ? void 0 : _s.Name) == null ? void 0 : _t.ar))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Reference</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate((_u = unref(consentData)) == null ? void 0 : _u.DebtorReference)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Payment Purpose</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(unref(getPurposeDescription)((_v = unref(consentData)) == null ? void 0 : _v.PaymentPurposeCode))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-19ea6e71><div class="consent-page-text-mini-header-section" data-v-19ea6e71><div class="consent-page-text-mini-header-section-header" data-v-19ea6e71><div class="consent-page-text-min-header-section-header-text" data-v-19ea6e71> Payment rules </div><svg class="${ssrRenderClass([{ "is-open": show_payment_rules.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-19ea6e71></path></svg></div></div>`);
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>${ssrInterpolate(primaryAmountLabel.value)}</div>`);
        _push(ssrRenderComponent(DirhamAmount, {
          style: { "font-weight": "300" },
          amount: primaryAmount.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>First Payment Date</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(unref(formatDate)((_A = (_z = (_y = (_x = (_w = unref(consentData)) == null ? void 0 : _w.ControlParameters) == null ? void 0 : _x.ConsentSchedule) == null ? void 0 : _y.MultiPayment) == null ? void 0 : _z.PeriodicSchedule) == null ? void 0 : _A.PeriodStartDate))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Payments Repeat every</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate((_F = (_E = (_D = (_C = (_B = unref(consentData)) == null ? void 0 : _B.ControlParameters) == null ? void 0 : _C.ConsentSchedule) == null ? void 0 : _D.MultiPayment) == null ? void 0 : _E.PeriodicSchedule) == null ? void 0 : _F.PeriodType)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Expiry Date</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(unref(formatDate)((_G = unref(consentData)) == null ? void 0 : _G.ExpirationDateTime))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_K = (_J = (_I = (_H = unref(consentData)) == null ? void 0 : _H.ControlParameters) == null ? void 0 : _I.ConsentSchedule) == null ? void 0 : _J.MultiPayment) == null ? void 0 : _K.MaximumCumulativeNumberOfPayments)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Total Number of Payments allowed</div><div class="consent-page-account-amount-container" data-v-19ea6e71><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate((_O = (_N = (_M = (_L = unref(consentData)) == null ? void 0 : _L.ControlParameters) == null ? void 0 : _M.ConsentSchedule) == null ? void 0 : _N.MultiPayment) == null ? void 0 : _O.MaximumCumulativeNumberOfPayments)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_S = (_R = (_Q = (_P = unref(consentData)) == null ? void 0 : _P.ControlParameters) == null ? void 0 : _Q.ConsentSchedule) == null ? void 0 : _R.MultiPayment) == null ? void 0 : _S.MaximumCumulativeValueOfPayments)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Total Value allowed</div>`);
        _push(ssrRenderComponent(DirhamAmount, {
          style: { "font-weight": "300" },
          amount: (_X = (_W = (_V = (_U = (_T = unref(consentData)) == null ? void 0 : _T.ControlParameters) == null ? void 0 : _U.ConsentSchedule) == null ? void 0 : _V.MultiPayment) == null ? void 0 : _W.MaximumCumulativeValueOfPayments) == null ? void 0 : _X.Amount
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-19ea6e71><div class="consent-page-text-mini-header-section" data-v-19ea6e71><div class="consent-page-text-mini-header-section-header" data-v-19ea6e71><div class="consent-page-text-min-header-section-header-text" data-v-19ea6e71> From account </div><svg class="${ssrRenderClass([{ "is-open": show_from_account.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-19ea6e71></path></svg></div></div>`);
      if (show_from_account.value) {
        _push(`<!--[--><div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Bank</div><div class="consent-page-account-amount" data-v-19ea6e71> [Your LFI] </div></div>`);
        if (((_aa = (_$ = (__ = (_Z = (_Y = unref(sharedState)) == null ? void 0 : _Y.pii) == null ? void 0 : _Z.Initiation) == null ? void 0 : __.DebtorAccount) == null ? void 0 : _$.Name) == null ? void 0 : _aa.en) || ((_fa = (_ea = (_da = (_ca = (_ba = unref(sharedState)) == null ? void 0 : _ba.pii) == null ? void 0 : _ca.Initiation) == null ? void 0 : _da.DebtorAccount) == null ? void 0 : _ea.Name) == null ? void 0 : _fa.ar)) {
          _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Payer Name</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(((_ka = (_ja = (_ia = (_ha = (_ga = unref(sharedState)) == null ? void 0 : _ga.pii) == null ? void 0 : _ha.Initiation) == null ? void 0 : _ia.DebtorAccount) == null ? void 0 : _ja.Name) == null ? void 0 : _ka.en) || ((_pa = (_oa = (_na = (_ma = (_la = unref(sharedState)) == null ? void 0 : _la.pii) == null ? void 0 : _ma.Initiation) == null ? void 0 : _na.DebtorAccount) == null ? void 0 : _oa.Name) == null ? void 0 : _pa.ar))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ta = (_sa = (_ra = (_qa = unref(sharedState)) == null ? void 0 : _qa.pii) == null ? void 0 : _ra.Initiation) == null ? void 0 : _sa.DebtorAccount) == null ? void 0 : _ta.Identification) {
          _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>IBAN</div><div class="consent-page-account-amount-iban" data-v-19ea6e71>${ssrInterpolate((_za = (_ya = (_xa = (_wa = (_va = (_ua = unref(sharedState)) == null ? void 0 : _ua.pii) == null ? void 0 : _va.Initiation) == null ? void 0 : _wa.DebtorAccount) == null ? void 0 : _xa.Identification) == null ? void 0 : _ya.match(/.{1,4}/g)) == null ? void 0 : _za.join(" "))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-19ea6e71><div class="consent-page-text-mini-header-section" data-v-19ea6e71><div class="consent-page-text-mini-header-section-header" data-v-19ea6e71><div class="consent-page-text-min-header-section-header-text" data-v-19ea6e71> To account </div><svg class="${ssrRenderClass([{ "is-open": show_to_account.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-19ea6e71></path></svg></div></div>`);
      if (show_to_account.value && (((_Da = (_Ca = (_Ba = (_Aa = unref(sharedState)) == null ? void 0 : _Aa.pii) == null ? void 0 : _Ba.Initiation) == null ? void 0 : _Ca.Creditor) == null ? void 0 : _Da.length) ?? 0) === 1) {
        _push(`<!--[--><div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>Payee Name</div><div class="consent-page-account-amount" data-v-19ea6e71>${ssrInterpolate(((_Ja = (_Ia = (_Ha = (_Ga = (_Fa = (_Ea = unref(sharedState)) == null ? void 0 : _Ea.pii) == null ? void 0 : _Fa.Initiation) == null ? void 0 : _Ga.Creditor) == null ? void 0 : _Ha[0]) == null ? void 0 : _Ia.Creditor) == null ? void 0 : _Ja.Name) || ((_Qa = (_Pa = (_Oa = (_Na = (_Ma = (_La = (_Ka = unref(sharedState)) == null ? void 0 : _Ka.pii) == null ? void 0 : _La.Initiation) == null ? void 0 : _Ma.Creditor) == null ? void 0 : _Na[0]) == null ? void 0 : _Oa.CreditorAccount) == null ? void 0 : _Pa.Name) == null ? void 0 : _Qa.en) || ((_Xa = (_Wa = (_Va = (_Ua = (_Ta = (_Sa = (_Ra = unref(sharedState)) == null ? void 0 : _Ra.pii) == null ? void 0 : _Sa.Initiation) == null ? void 0 : _Ta.Creditor) == null ? void 0 : _Ua[0]) == null ? void 0 : _Va.CreditorAccount) == null ? void 0 : _Wa.Name) == null ? void 0 : _Xa.ar))}</div></div><div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>IBAN</div><div class="consent-page-account-amount-iban" data-v-19ea6e71>${ssrInterpolate((_db = (_cb = (_bb = (_ab = (_$a = (__a = (_Za = (_Ya = unref(sharedState)) == null ? void 0 : _Ya.pii) == null ? void 0 : _Za.Initiation) == null ? void 0 : __a.Creditor) == null ? void 0 : _$a[0]) == null ? void 0 : _ab.CreditorAccount) == null ? void 0 : _bb.Identification) == null ? void 0 : _cb.match(/.{1,4}/g)) == null ? void 0 : _db.join(" "))}</div></div><!--]-->`);
      } else if (show_to_account.value && (((_hb = (_gb = (_fb = (_eb = unref(sharedState)) == null ? void 0 : _eb.pii) == null ? void 0 : _fb.Initiation) == null ? void 0 : _gb.Creditor) == null ? void 0 : _hb.length) ?? 0) > 1) {
        _push(`<!--[-->`);
        ssrRenderList((_kb = (_jb = (_ib = unref(sharedState)) == null ? void 0 : _ib.pii) == null ? void 0 : _jb.Initiation) == null ? void 0 : _kb.Creditor, (creditor, idx) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
          _push(`<div class="consent-page-account-subtext-container-2" style="${ssrRenderStyle({ "flex-direction": "column", "align-items": "flex-start", "gap": "4px", "padding-bottom": "8px" })}" data-v-19ea6e71><div style="${ssrRenderStyle({ "font-size": "12px", "color": "#1a202c" })}" data-v-19ea6e71>${ssrInterpolate(((_a2 = creditor == null ? void 0 : creditor.Creditor) == null ? void 0 : _a2.Name) || ((_c2 = (_b2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _b2.Name) == null ? void 0 : _c2.en) || ((_e2 = (_d2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _d2.Name) == null ? void 0 : _e2.ar))}</div><div class="consent-page-account-subtext-container-2" style="${ssrRenderStyle({ "width": "100%", "margin-top": "2px" })}" data-v-19ea6e71><div class="consent-page-account-subtext-part" data-v-19ea6e71>IBAN</div><div class="consent-page-account-amount-iban" data-v-19ea6e71>${ssrInterpolate((_h2 = (_g2 = (_f2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _f2.Identification) == null ? void 0 : _g2.match(/.{1,4}/g)) == null ? void 0 : _h2.join(" "))}</div></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-19ea6e71><div class="consent-page-text-mini-header-section" data-v-19ea6e71><div class="consent-page-text-mini-header-section-header" data-v-19ea6e71><div class="consent-page-text-min-header-section-header-text" data-v-19ea6e71> Terms </div><svg class="${ssrRenderClass([{ "is-open": show_terms.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-19ea6e71></path></svg></div></div>`);
      if (show_terms.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-19ea6e71><div class="consent-page-account-subtext-part" style="${ssrRenderStyle({ "height": "auto", "width": "292px" })}" data-v-19ea6e71>The terms vary by the Third Party Provider (TPP) and their use case. The terms govern their access to your account.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_PaymentConsentPermissionsText, null, null, _parent));
      _push(`<div class="consent-page-button-with-description" data-v-19ea6e71><div class="consent-page-button" data-v-19ea6e71><div class="consent-page-button-text-section" data-v-19ea6e71><svg class="consent-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-19ea6e71><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-19ea6e71></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-19ea6e71></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-19ea6e71></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-19ea6e71></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-19ea6e71></path><defs data-v-19ea6e71><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-19ea6e71><stop stop-color="#4083E1" data-v-19ea6e71></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-19ea6e71></stop><stop offset="0.48" stop-color="#36B1CC" data-v-19ea6e71></stop><stop offset="0.8" stop-color="#31C9C1" data-v-19ea6e71></stop><stop offset="1" stop-color="#30D2BE" data-v-19ea6e71></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-19ea6e71><stop stop-color="#80ACEB" data-v-19ea6e71></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-19ea6e71></stop><stop offset="0.73" stop-color="#76D8D7" data-v-19ea6e71></stop><stop offset="1" stop-color="#75E1D4" data-v-19ea6e71></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-19ea6e71><stop stop-color="#BFD6F5" data-v-19ea6e71></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-19ea6e71></stop><stop offset="1" stop-color="#BAF0E9" data-v-19ea6e71></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-19ea6e71><stop stop-color="#40E0C7" data-v-19ea6e71></stop><stop offset="0.304248" stop-color="#0050C8" data-v-19ea6e71></stop><stop offset="0.623256" stop-color="white" data-v-19ea6e71></stop></radialGradient></defs></svg><div class="consent-page-button-text" data-v-19ea6e71> Authorize using AlTareq </div></div></div><div class="consent-page-button-description" data-v-19ea6e71> We will securely transfer you to [YOUR LFI] to authorize and set up the payment </div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentPeriodicSchedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19ea6e71"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_1 as a
};
