import { computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { a as _imports_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { g as getAuthPaymentPermissionText, a as getPurposeDescription, _ as __unplugin_components_0 } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { f as formatDate } from "./formatDate-CaaKrjgT.js";
import { D as DirhamAmount } from "./DirhamAmount-BJSUbugi.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$1 = {
  __name: "AuthorizationOnDemand",
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
      var _a, _b;
      return ((_b = (_a = periodicSchedule.value) == null ? void 0 : _a.Controls) == null ? void 0 : _b.MaximumIndividualAmount) ? "Max per Payment" : "Amount";
    });
    const primaryAmount = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_c = (_b = (_a = periodicSchedule.value) == null ? void 0 : _a.Controls) == null ? void 0 : _b.MaximumIndividualAmount) == null ? void 0 : _c.Amount) ?? ((_e = (_d = periodicSchedule.value) == null ? void 0 : _d.Amount) == null ? void 0 : _e.Amount);
    });
    const authPermissionText = computed(
      () => {
        var _a;
        return getAuthPaymentPermissionText((_a = consentData.value) == null ? void 0 : _a.Permissions);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page-frame" }, _attrs))} data-v-4d2c9af2><div class="auth-page-header" data-v-4d2c9af2><div class="auth-page-screen-name" data-v-4d2c9af2><div class="auth-page-tpp-text" data-v-4d2c9af2> LFI </div><svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-4d2c9af2></path></svg><div class="auth-page-rectangle" data-v-4d2c9af2></div></div><div class="auth-page-contents" data-v-4d2c9af2><img class="auth-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-4d2c9af2><div class="auth-page-progress" data-v-4d2c9af2><div class="auth-page-progress-1" data-v-4d2c9af2><div class="auth-page-progress-icon-active" data-v-4d2c9af2><svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-4d2c9af2></path></svg></div><div class="auth-page-progress-text" data-v-4d2c9af2> Consent </div></div><div class="auth-page-progress-2" data-v-4d2c9af2><div class="auth-page-progress-icon-active" data-v-4d2c9af2><div class="auth-page-progress-icon-text-active" data-v-4d2c9af2> 2 </div></div><div class="auth-page-progress-text" data-v-4d2c9af2> Authorize </div></div><div class="auth-page-progress-3" data-v-4d2c9af2><div class="auth-page-progress-icon" data-v-4d2c9af2><div class="auth-page-progress-icon-text" data-v-4d2c9af2> 3 </div></div><div class="auth-page-progress-text" data-v-4d2c9af2> Complete </div></div><svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-4d2c9af2></path><path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" data-v-4d2c9af2></path></svg></div></div></div>`);
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-text-frame" data-v-4d2c9af2><div class="auth-page-text-inner-frame" data-v-4d2c9af2><div class="auth-page-text-header" data-v-4d2c9af2> Flexi-Pay Setup `);
        if ((_d = (_c = (_b = (_a = unref(sharedState)) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.Creditor) == null ? void 0 : _d.length) {
          _push(`<div class="auth-page-text-header-sub" data-v-4d2c9af2> [TPP trading name] needs your permission `);
          if (merchantName.value) {
            _push(`<!--[--> on-behalf of ${ssrInterpolate(merchantName.value)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` to make payment(s) from your account within the payment rules below: </div>`);
        } else {
          _push(`<div class="auth-page-text-header-sub" data-v-4d2c9af2> [TPP trading name] needs your permission `);
          if (merchantName.value) {
            _push(`<!--[--> on-behalf of ${ssrInterpolate(merchantName.value)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` to make payments from your account under the rules below. They will process payments in line with your agreement and are responsible for selecting the beneficiaries. </div>`);
        }
        _push(`</div><div class="auth-page-accounts-section" data-v-4d2c9af2><div class="auth-page-account-card" data-v-4d2c9af2>`);
        if ((_h = (_g = (_f = (_e = unref(sharedState)) == null ? void 0 : _e.pii) == null ? void 0 : _f.Initiation) == null ? void 0 : _g.Creditor) == null ? void 0 : _h.length) {
          _push(`<div class="auth-page-account-header-2" data-v-4d2c9af2>Who you’re paying</div>`);
        } else {
          _push(`<div class="auth-page-account-header-2" data-v-4d2c9af2>Payment Details</div>`);
        }
        _push(`<div class="auth-page-account-subtext-container" data-v-4d2c9af2>`);
        if ((((_l = (_k = (_j = (_i = unref(sharedState)) == null ? void 0 : _i.pii) == null ? void 0 : _j.Initiation) == null ? void 0 : _k.Creditor) == null ? void 0 : _l.length) ?? 0) === 1) {
          _push(`<!--[--><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Payee Name</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate(((_r = (_q = (_p = (_o = (_n = (_m = unref(sharedState)) == null ? void 0 : _m.pii) == null ? void 0 : _n.Initiation) == null ? void 0 : _o.Creditor) == null ? void 0 : _p[0]) == null ? void 0 : _q.Creditor) == null ? void 0 : _r.Name) || ((_y = (_x = (_w = (_v = (_u = (_t = (_s = unref(sharedState)) == null ? void 0 : _s.pii) == null ? void 0 : _t.Initiation) == null ? void 0 : _u.Creditor) == null ? void 0 : _v[0]) == null ? void 0 : _w.CreditorAccount) == null ? void 0 : _x.Name) == null ? void 0 : _y.en) || ((_F = (_E = (_D = (_C = (_B = (_A = (_z = unref(sharedState)) == null ? void 0 : _z.pii) == null ? void 0 : _A.Initiation) == null ? void 0 : _B.Creditor) == null ? void 0 : _C[0]) == null ? void 0 : _D.CreditorAccount) == null ? void 0 : _E.Name) == null ? void 0 : _F.ar))}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>IBAN</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount-iban" data-v-4d2c9af2>${ssrInterpolate((_N = (_M = (_L = (_K = (_J = (_I = (_H = (_G = unref(sharedState)) == null ? void 0 : _G.pii) == null ? void 0 : _H.Initiation) == null ? void 0 : _I.Creditor) == null ? void 0 : _J[0]) == null ? void 0 : _K.CreditorAccount) == null ? void 0 : _L.Identification) == null ? void 0 : _M.match(/.{1,4}/g)) == null ? void 0 : _N.join(" "))}</div></div></div><!--]-->`);
        } else if ((((_R = (_Q = (_P = (_O = unref(sharedState)) == null ? void 0 : _O.pii) == null ? void 0 : _P.Initiation) == null ? void 0 : _Q.Creditor) == null ? void 0 : _R.length) ?? 0) > 1) {
          _push(`<div class="benef-drop" data-v-4d2c9af2><div class="benef-card" data-v-4d2c9af2><div class="benef-drop-header" data-v-4d2c9af2><span class="benef-drop-label" data-v-4d2c9af2>Beneficiary List</span><svg class="${ssrRenderClass([{ "benef-drop-arrow-collapsed": !benefListOpen.value }, "benef-drop-arrow"])}" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-4d2c9af2><path d="M1 1L7 6.5L1 12" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-4d2c9af2></path></svg></div>`);
          if (benefListOpen.value) {
            _push(`<div class="benef-drop-items" data-v-4d2c9af2><!--[-->`);
            ssrRenderList((_U = (_T = (_S = unref(sharedState)) == null ? void 0 : _S.pii) == null ? void 0 : _T.Initiation) == null ? void 0 : _U.Creditor, (creditor, idx) => {
              var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
              _push(`<div class="benef-item" data-v-4d2c9af2><div class="benef-text-line benef-text-line-center" data-v-4d2c9af2><span class="benef-name" data-v-4d2c9af2>${ssrInterpolate(((_a2 = creditor == null ? void 0 : creditor.Creditor) == null ? void 0 : _a2.Name) || ((_c2 = (_b2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _b2.Name) == null ? void 0 : _c2.en) || ((_e2 = (_d2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _d2.Name) == null ? void 0 : _e2.ar))}</span></div><div class="benef-text-line" data-v-4d2c9af2><span class="benef-iban-label" data-v-4d2c9af2>IBAN</span><span class="benef-iban" data-v-4d2c9af2>${ssrInterpolate((_h2 = (_g2 = (_f2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _f2.Identification) == null ? void 0 : _g2.match(/.{1,4}/g)) == null ? void 0 : _h2.join(" "))}</span></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Payment Reference</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate((_V = unref(consentData)) == null ? void 0 : _V.DebtorReference)}</div></div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Payment Purpose</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate(unref(getPurposeDescription)((_W = unref(consentData)) == null ? void 0 : _W.PaymentPurposeCode))}</div></div></div></div></div><div class="auth-page-account-card" data-v-4d2c9af2><div class="auth-page-account-header-2" data-v-4d2c9af2>Payment rules</div><div class="auth-page-account-subtext-container" data-v-4d2c9af2><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>First Payment Date</div><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate(unref(formatDate)((_$ = (__ = (_Z = (_Y = (_X = unref(consentData)) == null ? void 0 : _X.ControlParameters) == null ? void 0 : _Y.ConsentSchedule) == null ? void 0 : _Z.MultiPayment) == null ? void 0 : __.PeriodicSchedule) == null ? void 0 : _$.PeriodStartDate))}</div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Expiry Date</div><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate(unref(formatDate)((_aa = unref(consentData)) == null ? void 0 : _aa.ExpirationDateTime))}</div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>${ssrInterpolate(primaryAmountLabel.value)}</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
        _push(ssrRenderComponent(DirhamAmount, { amount: primaryAmount.value }, null, _parent));
        _push(`</div></div>`);
        if ((_ea = (_da = (_ca = (_ba = unref(consentData)) == null ? void 0 : _ba.ControlParameters) == null ? void 0 : _ca.ConsentSchedule) == null ? void 0 : _da.MultiPayment) == null ? void 0 : _ea.MaximumCumulativeNumberOfPayments) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Total Number of Payments allowed</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate((_ia = (_ha = (_ga = (_fa = unref(consentData)) == null ? void 0 : _fa.ControlParameters) == null ? void 0 : _ga.ConsentSchedule) == null ? void 0 : _ha.MultiPayment) == null ? void 0 : _ia.MaximumCumulativeNumberOfPayments)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ma = (_la = (_ka = (_ja = unref(consentData)) == null ? void 0 : _ja.ControlParameters) == null ? void 0 : _ka.ConsentSchedule) == null ? void 0 : _la.MultiPayment) == null ? void 0 : _ma.MaximumCumulativeValueOfPayments) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Total Value allowed</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: (_ra = (_qa = (_pa = (_oa = (_na = unref(consentData)) == null ? void 0 : _na.ControlParameters) == null ? void 0 : _oa.ConsentSchedule) == null ? void 0 : _pa.MultiPayment) == null ? void 0 : _qa.MaximumCumulativeValueOfPayments) == null ? void 0 : _ra.Amount
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_xa = (_wa = (_va = (_ua = (_ta = (_sa = unref(consentData)) == null ? void 0 : _sa.ControlParameters) == null ? void 0 : _ta.ConsentSchedule) == null ? void 0 : _ua.MultiPayment) == null ? void 0 : _va.PeriodicSchedule) == null ? void 0 : _wa.Controls) == null ? void 0 : _xa.MaximumCumulativeNumberOfPaymentsPerPeriod) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Max Payments per ${ssrInterpolate((_Ca = (_Ba = (_Aa = (_za = (_ya = unref(consentData)) == null ? void 0 : _ya.ControlParameters) == null ? void 0 : _za.ConsentSchedule) == null ? void 0 : _Aa.MultiPayment) == null ? void 0 : _Ba.PeriodicSchedule) == null ? void 0 : _Ca.PeriodType)}</div><div class="auth-page-account-amount-container" data-v-4d2c9af2><div class="auth-page-account-amount" data-v-4d2c9af2>${ssrInterpolate((_Ia = (_Ha = (_Ga = (_Fa = (_Ea = (_Da = unref(consentData)) == null ? void 0 : _Da.ControlParameters) == null ? void 0 : _Ea.ConsentSchedule) == null ? void 0 : _Fa.MultiPayment) == null ? void 0 : _Ga.PeriodicSchedule) == null ? void 0 : _Ha.Controls) == null ? void 0 : _Ia.MaximumCumulativeNumberOfPaymentsPerPeriod)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_Pa = (_Oa = (_Na = (_Ma = (_La = (_Ka = (_Ja = unref(consentData)) == null ? void 0 : _Ja.ControlParameters) == null ? void 0 : _Ka.ConsentSchedule) == null ? void 0 : _La.MultiPayment) == null ? void 0 : _Ma.PeriodicSchedule) == null ? void 0 : _Na.Controls) == null ? void 0 : _Oa.MaximumCumulativeValueOfPaymentsPerPeriod) == null ? void 0 : _Pa.Amount) {
          _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Max Value per ${ssrInterpolate((_Ua = (_Ta = (_Sa = (_Ra = (_Qa = unref(consentData)) == null ? void 0 : _Qa.ControlParameters) == null ? void 0 : _Ra.ConsentSchedule) == null ? void 0 : _Sa.MultiPayment) == null ? void 0 : _Ta.PeriodicSchedule) == null ? void 0 : _Ua.PeriodType)}</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: (_$a = (__a = (_Za = (_Ya = (_Xa = (_Wa = (_Va = unref(consentData)) == null ? void 0 : _Va.ControlParameters) == null ? void 0 : _Wa.ConsentSchedule) == null ? void 0 : _Xa.MultiPayment) == null ? void 0 : _Ya.PeriodicSchedule) == null ? void 0 : _Za.Controls) == null ? void 0 : __a.MaximumCumulativeValueOfPaymentsPerPeriod) == null ? void 0 : _$a.Amount
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
        _push(`<div class="auth-page-text-frame" data-v-4d2c9af2><div class="auth-page-text-inner-frame" data-v-4d2c9af2><div class="auth-page-text-header" data-v-4d2c9af2> Something went wrong </div><div class="auth-page-error-image-container" data-v-4d2c9af2><svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-4d2c9af2></path><path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-4d2c9af2></path><path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-4d2c9af2></path><path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-v-4d2c9af2></path></svg></div><div class="auth-page-text" data-v-4d2c9af2> The account specified by ${ssrInterpolate(((_cb = (_bb = (_ab = unref(sharedState)) == null ? void 0 : _ab.consent) == null ? void 0 : _bb.OnBehalfOf) == null ? void 0 : _cb.TradingName) || "[TPP Trading Name]")} doesn&#39;t match any of your accounts. Please go back and try again. </div></div></div>`);
      } else {
        _push(`<div class="auth-page-text-frame" data-v-4d2c9af2><div class="auth-page-text-inner-frame" data-v-4d2c9af2><div class="auth-page-text-header" data-v-4d2c9af2>${ssrInterpolate(matchedDebtorAccount.value ? "Account selected for the payment" : "Please select the account to pay from")}</div><div class="auth-page-accounts-section" data-v-4d2c9af2>`);
        if (matchedDebtorAccount.value) {
          _push(`<div class="auth-page-account-card" data-v-4d2c9af2><div class="auth-page-account-title" data-v-4d2c9af2><div class="auth-page-account-title-text" data-v-4d2c9af2>${ssrInterpolate(TYPE_LABELS[matchedDebtorAccount.value.type])}</div></div><div class="auth-page-account-subtext-container" data-v-4d2c9af2><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext" data-v-4d2c9af2>${ssrInterpolate(formatIban(matchedDebtorAccount.value.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Balance</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
          _push(ssrRenderComponent(DirhamAmount, {
            amount: matchedDebtorAccount.value.balance
          }, null, _parent));
          _push(`</div></div>`);
          if (matchedDebtorAccount.value.type === "CurrentAccount") {
            _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Overdraft</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
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
            _push(`<div class="auth-page-account-card" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-4d2c9af2><div class="auth-page-account-title" data-v-4d2c9af2><div class="auth-page-account-title-text" data-v-4d2c9af2>${ssrInterpolate(TYPE_LABELS[account.type])}</div><div class="auth-page-account-checkbox-2" data-v-4d2c9af2><div class="${ssrRenderClass([{ "is-active": selected.value === account.id }, "auth-page-account-checkbox-inactive-2"])}" data-v-4d2c9af2><div class="auth-page-account-checkbox-selected" data-v-4d2c9af2></div></div></div></div><div class="auth-page-account-subtext-container" data-v-4d2c9af2><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext" data-v-4d2c9af2>${ssrInterpolate(formatIban(account.iban))}</div></div><div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Balance</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
            _push(ssrRenderComponent(DirhamAmount, {
              amount: account.balance
            }, null, _parent));
            _push(`</div></div>`);
            if (account.type === "CurrentAccount") {
              _push(`<div class="auth-page-account-subtext-container-2" data-v-4d2c9af2><div class="auth-page-account-subtext-part" data-v-4d2c9af2>Overdraft</div><div class="auth-page-account-amount-container" data-v-4d2c9af2>`);
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
        _push(`<div class="auth-page-text-frame-2" data-v-4d2c9af2><div class="auth-page-text-bottom" data-v-4d2c9af2>${ssrInterpolate(authPermissionText.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!debtorMismatch.value) {
        _push(`<div class="auth-page-button-with-description" data-v-4d2c9af2><div class="auth-page-button" data-v-4d2c9af2><div class="auth-page-button-text-section" data-v-4d2c9af2><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-4d2c9af2></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-4d2c9af2></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-4d2c9af2></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-4d2c9af2></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-4d2c9af2></path><defs data-v-4d2c9af2><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#4083E1" data-v-4d2c9af2></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-4d2c9af2></stop><stop offset="0.48" stop-color="#36B1CC" data-v-4d2c9af2></stop><stop offset="0.8" stop-color="#31C9C1" data-v-4d2c9af2></stop><stop offset="1" stop-color="#30D2BE" data-v-4d2c9af2></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#80ACEB" data-v-4d2c9af2></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-4d2c9af2></stop><stop offset="0.73" stop-color="#76D8D7" data-v-4d2c9af2></stop><stop offset="1" stop-color="#75E1D4" data-v-4d2c9af2></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#BFD6F5" data-v-4d2c9af2></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-4d2c9af2></stop><stop offset="1" stop-color="#BAF0E9" data-v-4d2c9af2></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#40E0C7" data-v-4d2c9af2></stop><stop offset="0.304248" stop-color="#0050C8" data-v-4d2c9af2></stop><stop offset="0.623256" stop-color="white" data-v-4d2c9af2></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-4d2c9af2> Authorize using AlTareq </div></div></div><div class="auth-page-button-cancel" data-v-4d2c9af2><div class="auth-page-button-cancel-text" data-v-4d2c9af2> Cancel </div></div></div>`);
      } else {
        _push(`<div class="auth-page-button-with-description auth-page-button-with-description--error" data-v-4d2c9af2><div class="auth-page-button" data-v-4d2c9af2><div class="auth-page-button-text-section" data-v-4d2c9af2><svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4d2c9af2><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-4d2c9af2></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-4d2c9af2></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-4d2c9af2></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-4d2c9af2></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-4d2c9af2></path><defs data-v-4d2c9af2><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#4083E1" data-v-4d2c9af2></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-4d2c9af2></stop><stop offset="0.48" stop-color="#36B1CC" data-v-4d2c9af2></stop><stop offset="0.8" stop-color="#31C9C1" data-v-4d2c9af2></stop><stop offset="1" stop-color="#30D2BE" data-v-4d2c9af2></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#80ACEB" data-v-4d2c9af2></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-4d2c9af2></stop><stop offset="0.73" stop-color="#76D8D7" data-v-4d2c9af2></stop><stop offset="1" stop-color="#75E1D4" data-v-4d2c9af2></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#BFD6F5" data-v-4d2c9af2></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-4d2c9af2></stop><stop offset="1" stop-color="#BAF0E9" data-v-4d2c9af2></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-4d2c9af2><stop stop-color="#40E0C7" data-v-4d2c9af2></stop><stop offset="0.304248" stop-color="#0050C8" data-v-4d2c9af2></stop><stop offset="0.623256" stop-color="white" data-v-4d2c9af2></stop></radialGradient></defs></svg><div class="auth-page-button-text" data-v-4d2c9af2> Close </div></div></div><div class="auth-page-button-description" data-v-4d2c9af2> By pressing Close you will be returned to ${ssrInterpolate(((_fb = (_eb = (_db = unref(sharedState)) == null ? void 0 : _db.consent) == null ? void 0 : _eb.OnBehalfOf) == null ? void 0 : _fb.TradingName) || "[TPP Trading Name]")}. No data will be shared. </div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/authorization-ui/AuthorizationOnDemand.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4d2c9af2"]]);
const _sfc_main = {
  __name: "ConsentOnDemand",
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
      var _a, _b;
      return ((_b = (_a = periodicSchedule.value) == null ? void 0 : _a.Controls) == null ? void 0 : _b.MaximumIndividualAmount) ? "Max per Payment" : "Amount";
    });
    const primaryAmount = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_c = (_b = (_a = periodicSchedule.value) == null ? void 0 : _a.Controls) == null ? void 0 : _b.MaximumIndividualAmount) == null ? void 0 : _c.Amount) ?? ((_e = (_d = periodicSchedule.value) == null ? void 0 : _d.Amount) == null ? void 0 : _e.Amount);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb;
      const _component_PaymentConsentPermissionsText = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consent-page-frame" }, _attrs))} data-v-9982be18><div class="consent-page-header" data-v-9982be18><div class="consent-page-screen-name" data-v-9982be18><div class="consent-page-tpp-text" data-v-9982be18> TPP </div><svg class="consent-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" data-v-9982be18></path></svg><div class="consent-page-rectangle" data-v-9982be18></div></div><div class="consent-page-contents" data-v-9982be18><img class="consent-page-logo"${ssrRenderAttr("src", _imports_0)} alt="AlTareq logo" data-v-9982be18><div class="consent-page-progress" data-v-9982be18><div class="consent-page-progress-1" data-v-9982be18><div class="consent-page-progress-icon-active" data-v-9982be18><div class="consent-page-progress-icon-text-active" data-v-9982be18> 1 </div></div><div class="consent-page-progress-text" data-v-9982be18> Consent </div></div><div class="consent-page-progress-2" data-v-9982be18><div class="consent-page-progress-icon" data-v-9982be18><div class="consent-page-progress-icon-text" data-v-9982be18> 2 </div></div><div class="consent-page-progress-text" data-v-9982be18> Authorize </div></div><div class="consent-page-progress-3" data-v-9982be18><div class="consent-page-progress-icon" data-v-9982be18><div class="consent-page-progress-icon-text" data-v-9982be18> 3 </div></div><div class="consent-page-progress-text" data-v-9982be18> Complete </div></div><svg class="consent-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" data-v-9982be18></path><path d="M0.5 1H53.5" stroke="#00C8AF" stroke-width="2" data-v-9982be18></path></svg></div></div></div><div class="consent-page-text-frame" data-v-9982be18><div class="consent-page-text-inner-frame" data-v-9982be18><div class="consent-page-text-header" data-v-9982be18> Permission to make payment(s) </div><div class="consent-page-text-section" data-v-9982be18><div class="consent-page-text" data-v-9982be18> To make payments from your bank, we need your permission to securely initiate the payment(s) </div><div class="consent-page-text-inner-frame-2" data-v-9982be18><div class="consent-page-text-mini-header-section" data-v-9982be18><div class="consent-page-text-mini-header-section-header" data-v-9982be18><div class="consent-page-text-min-header-section-header-text" data-v-9982be18> Payment setup </div><svg class="${ssrRenderClass([{ "is-open": show_payment_setup.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-9982be18></path></svg></div></div>`);
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Payment to</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(((_f = (_e = (_d = (_c = (_b = (_a = unref(sharedState)) == null ? void 0 : _a.pii) == null ? void 0 : _b.Initiation) == null ? void 0 : _c.Creditor) == null ? void 0 : _d[0]) == null ? void 0 : _e.Creditor) == null ? void 0 : _f.Name) || ((_m = (_l = (_k = (_j = (_i = (_h = (_g = unref(sharedState)) == null ? void 0 : _g.pii) == null ? void 0 : _h.Initiation) == null ? void 0 : _i.Creditor) == null ? void 0 : _j[0]) == null ? void 0 : _k.CreditorAccount) == null ? void 0 : _l.Name) == null ? void 0 : _m.en) || ((_t = (_s = (_r = (_q = (_p = (_o = (_n = unref(sharedState)) == null ? void 0 : _n.pii) == null ? void 0 : _o.Initiation) == null ? void 0 : _p.Creditor) == null ? void 0 : _q[0]) == null ? void 0 : _r.CreditorAccount) == null ? void 0 : _s.Name) == null ? void 0 : _t.ar))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Reference</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate((_u = unref(consentData)) == null ? void 0 : _u.DebtorReference)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_setup.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Payment Purpose</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(unref(getPurposeDescription)((_v = unref(consentData)) == null ? void 0 : _v.PaymentPurposeCode))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-9982be18><div class="consent-page-text-mini-header-section" data-v-9982be18><div class="consent-page-text-mini-header-section-header" data-v-9982be18><div class="consent-page-text-min-header-section-header-text" data-v-9982be18> Payment rules </div><svg class="${ssrRenderClass([{ "is-open": show_payment_rules.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-9982be18></path></svg></div></div>`);
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>First Payment Date</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(unref(formatDate)((_A = (_z = (_y = (_x = (_w = unref(consentData)) == null ? void 0 : _w.ControlParameters) == null ? void 0 : _x.ConsentSchedule) == null ? void 0 : _y.MultiPayment) == null ? void 0 : _z.PeriodicSchedule) == null ? void 0 : _A.PeriodStartDate))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Expiry Date</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(unref(formatDate)((_B = unref(consentData)) == null ? void 0 : _B.ExpirationDateTime))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>${ssrInterpolate(primaryAmountLabel.value)}</div>`);
        _push(ssrRenderComponent(DirhamAmount, {
          style: { "font-weight": "300" },
          amount: primaryAmount.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_F = (_E = (_D = (_C = unref(consentData)) == null ? void 0 : _C.ControlParameters) == null ? void 0 : _D.ConsentSchedule) == null ? void 0 : _E.MultiPayment) == null ? void 0 : _F.MaximumCumulativeNumberOfPayments)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Total Number of Payments allowed</div><div class="consent-page-account-amount-container" data-v-9982be18><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate((_J = (_I = (_H = (_G = unref(consentData)) == null ? void 0 : _G.ControlParameters) == null ? void 0 : _H.ConsentSchedule) == null ? void 0 : _I.MultiPayment) == null ? void 0 : _J.MaximumCumulativeNumberOfPayments)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_N = (_M = (_L = (_K = unref(consentData)) == null ? void 0 : _K.ControlParameters) == null ? void 0 : _L.ConsentSchedule) == null ? void 0 : _M.MultiPayment) == null ? void 0 : _N.MaximumCumulativeValueOfPayments)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Total Value allowed</div>`);
        _push(ssrRenderComponent(DirhamAmount, {
          style: { "font-weight": "300" },
          amount: (_S = (_R = (_Q = (_P = (_O = unref(consentData)) == null ? void 0 : _O.ControlParameters) == null ? void 0 : _P.ConsentSchedule) == null ? void 0 : _Q.MultiPayment) == null ? void 0 : _R.MaximumCumulativeValueOfPayments) == null ? void 0 : _S.Amount
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_Y = (_X = (_W = (_V = (_U = (_T = unref(consentData)) == null ? void 0 : _T.ControlParameters) == null ? void 0 : _U.ConsentSchedule) == null ? void 0 : _V.MultiPayment) == null ? void 0 : _W.PeriodicSchedule) == null ? void 0 : _X.Controls) == null ? void 0 : _Y.MaximumCumulativeNumberOfPaymentsPerPeriod)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Max Payments per ${ssrInterpolate((_ba = (_aa = (_$ = (__ = (_Z = unref(consentData)) == null ? void 0 : _Z.ControlParameters) == null ? void 0 : __.ConsentSchedule) == null ? void 0 : _$.MultiPayment) == null ? void 0 : _aa.PeriodicSchedule) == null ? void 0 : _ba.PeriodType)}</div><div class="consent-page-account-amount-container" data-v-9982be18><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate((_ha = (_ga = (_fa = (_ea = (_da = (_ca = unref(consentData)) == null ? void 0 : _ca.ControlParameters) == null ? void 0 : _da.ConsentSchedule) == null ? void 0 : _ea.MultiPayment) == null ? void 0 : _fa.PeriodicSchedule) == null ? void 0 : _ga.Controls) == null ? void 0 : _ha.MaximumCumulativeNumberOfPaymentsPerPeriod)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (show_payment_rules.value && ((_oa = (_na = (_ma = (_la = (_ka = (_ja = (_ia = unref(consentData)) == null ? void 0 : _ia.ControlParameters) == null ? void 0 : _ja.ConsentSchedule) == null ? void 0 : _ka.MultiPayment) == null ? void 0 : _la.PeriodicSchedule) == null ? void 0 : _ma.Controls) == null ? void 0 : _na.MaximumCumulativeValueOfPaymentsPerPeriod) == null ? void 0 : _oa.Amount)) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Max Value per ${ssrInterpolate((_ta = (_sa = (_ra = (_qa = (_pa = unref(consentData)) == null ? void 0 : _pa.ControlParameters) == null ? void 0 : _qa.ConsentSchedule) == null ? void 0 : _ra.MultiPayment) == null ? void 0 : _sa.PeriodicSchedule) == null ? void 0 : _ta.PeriodType)}</div>`);
        _push(ssrRenderComponent(DirhamAmount, {
          style: { "font-weight": "300" },
          amount: (_Aa = (_za = (_ya = (_xa = (_wa = (_va = (_ua = unref(consentData)) == null ? void 0 : _ua.ControlParameters) == null ? void 0 : _va.ConsentSchedule) == null ? void 0 : _wa.MultiPayment) == null ? void 0 : _xa.PeriodicSchedule) == null ? void 0 : _ya.Controls) == null ? void 0 : _za.MaximumCumulativeValueOfPaymentsPerPeriod) == null ? void 0 : _Aa.Amount
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="consent-page-text-inner-frame-2" data-v-9982be18><div class="consent-page-text-mini-header-section" data-v-9982be18><div class="consent-page-text-mini-header-section-header" data-v-9982be18><div class="consent-page-text-min-header-section-header-text" data-v-9982be18> From account </div><svg class="${ssrRenderClass([{ "is-open": show_from_account.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-9982be18></path></svg></div></div>`);
      if (show_from_account.value) {
        _push(`<!--[--><div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Bank</div><div class="consent-page-account-amount" data-v-9982be18> [Your LFI] </div></div>`);
        if (((_Fa = (_Ea = (_Da = (_Ca = (_Ba = unref(sharedState)) == null ? void 0 : _Ba.pii) == null ? void 0 : _Ca.Initiation) == null ? void 0 : _Da.DebtorAccount) == null ? void 0 : _Ea.Name) == null ? void 0 : _Fa.en) || ((_Ka = (_Ja = (_Ia = (_Ha = (_Ga = unref(sharedState)) == null ? void 0 : _Ga.pii) == null ? void 0 : _Ha.Initiation) == null ? void 0 : _Ia.DebtorAccount) == null ? void 0 : _Ja.Name) == null ? void 0 : _Ka.ar)) {
          _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Payer Name</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(((_Pa = (_Oa = (_Na = (_Ma = (_La = unref(sharedState)) == null ? void 0 : _La.pii) == null ? void 0 : _Ma.Initiation) == null ? void 0 : _Na.DebtorAccount) == null ? void 0 : _Oa.Name) == null ? void 0 : _Pa.en) || ((_Ua = (_Ta = (_Sa = (_Ra = (_Qa = unref(sharedState)) == null ? void 0 : _Qa.pii) == null ? void 0 : _Ra.Initiation) == null ? void 0 : _Sa.DebtorAccount) == null ? void 0 : _Ta.Name) == null ? void 0 : _Ua.ar))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_Ya = (_Xa = (_Wa = (_Va = unref(sharedState)) == null ? void 0 : _Va.pii) == null ? void 0 : _Wa.Initiation) == null ? void 0 : _Xa.DebtorAccount) == null ? void 0 : _Ya.Identification) {
          _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>IBAN</div><div class="consent-page-account-amount-iban" data-v-9982be18>${ssrInterpolate((_cb = (_bb = (_ab = (_$a = (__a = (_Za = unref(sharedState)) == null ? void 0 : _Za.pii) == null ? void 0 : __a.Initiation) == null ? void 0 : _$a.DebtorAccount) == null ? void 0 : _ab.Identification) == null ? void 0 : _bb.match(/.{1,4}/g)) == null ? void 0 : _cb.join(" "))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((((_gb = (_fb = (_eb = (_db = unref(sharedState)) == null ? void 0 : _db.pii) == null ? void 0 : _eb.Initiation) == null ? void 0 : _fb.Creditor) == null ? void 0 : _gb.length) ?? 0) > 0) {
        _push(`<div class="consent-page-text-inner-frame-2" data-v-9982be18><div class="consent-page-text-mini-header-section" data-v-9982be18><div class="consent-page-text-mini-header-section-header" data-v-9982be18><div class="consent-page-text-min-header-section-header-text" data-v-9982be18> To account </div><svg class="${ssrRenderClass([{ "is-open": show_to_account.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-9982be18></path></svg></div></div>`);
        if (show_to_account.value && (((_kb = (_jb = (_ib = (_hb = unref(sharedState)) == null ? void 0 : _hb.pii) == null ? void 0 : _ib.Initiation) == null ? void 0 : _jb.Creditor) == null ? void 0 : _kb.length) ?? 0) === 1) {
          _push(`<!--[--><div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>Payee Name</div><div class="consent-page-account-amount" data-v-9982be18>${ssrInterpolate(((_qb = (_pb = (_ob = (_nb = (_mb = (_lb = unref(sharedState)) == null ? void 0 : _lb.pii) == null ? void 0 : _mb.Initiation) == null ? void 0 : _nb.Creditor) == null ? void 0 : _ob[0]) == null ? void 0 : _pb.Creditor) == null ? void 0 : _qb.Name) || ((_xb = (_wb = (_vb = (_ub = (_tb = (_sb = (_rb = unref(sharedState)) == null ? void 0 : _rb.pii) == null ? void 0 : _sb.Initiation) == null ? void 0 : _tb.Creditor) == null ? void 0 : _ub[0]) == null ? void 0 : _vb.CreditorAccount) == null ? void 0 : _wb.Name) == null ? void 0 : _xb.en) || ((_Eb = (_Db = (_Cb = (_Bb = (_Ab = (_zb = (_yb = unref(sharedState)) == null ? void 0 : _yb.pii) == null ? void 0 : _zb.Initiation) == null ? void 0 : _Ab.Creditor) == null ? void 0 : _Bb[0]) == null ? void 0 : _Cb.CreditorAccount) == null ? void 0 : _Db.Name) == null ? void 0 : _Eb.ar))}</div></div><div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>IBAN</div><div class="consent-page-account-amount-iban" data-v-9982be18>${ssrInterpolate((_Mb = (_Lb = (_Kb = (_Jb = (_Ib = (_Hb = (_Gb = (_Fb = unref(sharedState)) == null ? void 0 : _Fb.pii) == null ? void 0 : _Gb.Initiation) == null ? void 0 : _Hb.Creditor) == null ? void 0 : _Ib[0]) == null ? void 0 : _Jb.CreditorAccount) == null ? void 0 : _Kb.Identification) == null ? void 0 : _Lb.match(/.{1,4}/g)) == null ? void 0 : _Mb.join(" "))}</div></div><!--]-->`);
        } else if (show_to_account.value && (((_Qb = (_Pb = (_Ob = (_Nb = unref(sharedState)) == null ? void 0 : _Nb.pii) == null ? void 0 : _Ob.Initiation) == null ? void 0 : _Pb.Creditor) == null ? void 0 : _Qb.length) ?? 0) > 1) {
          _push(`<!--[-->`);
          ssrRenderList((_Tb = (_Sb = (_Rb = unref(sharedState)) == null ? void 0 : _Rb.pii) == null ? void 0 : _Sb.Initiation) == null ? void 0 : _Tb.Creditor, (creditor, idx) => {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
            _push(`<div class="consent-page-account-subtext-container-2" style="${ssrRenderStyle({ "flex-direction": "column", "align-items": "flex-start", "gap": "4px", "padding-bottom": "8px" })}" data-v-9982be18><div style="${ssrRenderStyle({ "font-size": "12px", "color": "#1a202c" })}" data-v-9982be18>${ssrInterpolate(((_a2 = creditor == null ? void 0 : creditor.Creditor) == null ? void 0 : _a2.Name) || ((_c2 = (_b2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _b2.Name) == null ? void 0 : _c2.en) || ((_e2 = (_d2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _d2.Name) == null ? void 0 : _e2.ar))}</div><div class="consent-page-account-subtext-container-2" style="${ssrRenderStyle({ "width": "100%", "margin-top": "2px" })}" data-v-9982be18><div class="consent-page-account-subtext-part" data-v-9982be18>IBAN</div><div class="consent-page-account-amount-iban" data-v-9982be18>${ssrInterpolate((_h2 = (_g2 = (_f2 = creditor == null ? void 0 : creditor.CreditorAccount) == null ? void 0 : _f2.Identification) == null ? void 0 : _g2.match(/.{1,4}/g)) == null ? void 0 : _h2.join(" "))}</div></div></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="consent-page-text-inner-frame-2" data-v-9982be18><div class="consent-page-text-mini-header-section" data-v-9982be18><div class="consent-page-text-mini-header-section-header" data-v-9982be18><div class="consent-page-text-min-header-section-header-text" data-v-9982be18> Terms </div><svg class="${ssrRenderClass([{ "is-open": show_terms.value }, "consent-page-mini-header-icon"])}" width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z" fill="#36BFD4" data-v-9982be18></path></svg></div></div>`);
      if (show_terms.value) {
        _push(`<div class="consent-page-account-subtext-container-2" data-v-9982be18><div class="consent-page-account-subtext-part" style="${ssrRenderStyle({ "height": "auto", "width": "292px" })}" data-v-9982be18>The terms vary by the Third Party Provider (TPP) and their use case. The terms govern their access to your account.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_PaymentConsentPermissionsText, null, null, _parent));
      _push(`<div class="consent-page-button-with-description" data-v-9982be18><div class="consent-page-button" data-v-9982be18><div class="consent-page-button-text-section" data-v-9982be18><svg class="consent-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-9982be18><path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" data-v-9982be18></path><path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_2_496)" data-v-9982be18></path><path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_2_496)" data-v-9982be18></path><path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_2_496)" data-v-9982be18></path><path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_2_496)" data-v-9982be18></path><defs data-v-9982be18><linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse" data-v-9982be18><stop stop-color="#4083E1" data-v-9982be18></stop><stop offset="0.08" stop-color="#3E8BDD" data-v-9982be18></stop><stop offset="0.48" stop-color="#36B1CC" data-v-9982be18></stop><stop offset="0.8" stop-color="#31C9C1" data-v-9982be18></stop><stop offset="1" stop-color="#30D2BE" data-v-9982be18></stop></linearGradient><linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-9982be18><stop stop-color="#80ACEB" data-v-9982be18></stop><stop offset="0.3" stop-color="#7BC0E1" data-v-9982be18></stop><stop offset="0.73" stop-color="#76D8D7" data-v-9982be18></stop><stop offset="1" stop-color="#75E1D4" data-v-9982be18></stop></linearGradient><linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse" data-v-9982be18><stop stop-color="#BFD6F5" data-v-9982be18></stop><stop offset="0.55" stop-color="#BBE7ED" data-v-9982be18></stop><stop offset="1" stop-color="#BAF0E9" data-v-9982be18></stop></linearGradient><radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse" data-v-9982be18><stop stop-color="#40E0C7" data-v-9982be18></stop><stop offset="0.304248" stop-color="#0050C8" data-v-9982be18></stop><stop offset="0.623256" stop-color="white" data-v-9982be18></stop></radialGradient></defs></svg><div class="consent-page-button-text" data-v-9982be18> Authorize using AlTareq </div></div></div><div class="consent-page-button-description" data-v-9982be18> We will securely transfer you to [YOUR LFI] to authorize and set up the payment </div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentOnDemand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9982be18"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_1 as a
};
