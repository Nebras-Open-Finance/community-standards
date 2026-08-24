import { _ as __unplugin_components_2, a as __unplugin_components_1 } from "./ConsentOnDemand-3pWZdhZX.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { mergeProps, withCtx, createVNode, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_1$1 } from "./AccountEditor-CP6oAJ9S.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./ServiceInitiationPermissionText-DAXAxMmQ.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_ConsentAuthLayout = __unplugin_components_0;
  const _component_ConsentOnDemand = __unplugin_components_1;
  const _component_AuthorizationOnDemand = __unplugin_components_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-92889b7c>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentOnDemand, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentOnDemand)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationOnDemand, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationOnDemand)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/_shared/WireframePreview.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-92889b7c"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_AccountEditor = __unplugin_components_1$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Configure the mock accounts the authenticated user holds at their bank. The Authorisation Page will offer these accounts when the user picks a debtor account, or validate the <code${_scopeId}>Initiation.DebtorAccount</code> against them when one is pre-selected by the TPP. `);
      } else {
        return [
          createTextVNode(" Configure the mock accounts the authenticated user holds at their bank. The Authorisation Page will offer these accounts when the user picks a debtor account, or validate the "),
          createVNode("code", null, "Initiation.DebtorAccount"),
          createTextVNode(" against them when one is pre-selected by the TPP. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_AccountEditor, {
    "allowed-types": ["CurrentAccount", "Savings"],
    "allowed-currencies": ["AED"]
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/_shared/AccountSetup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AccountSetup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_ServiceInitiationPermissionText = __unplugin_components_3;
  _push(`<!--[--><h3>Debtor Account Selection</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The presence or absence of <code${_scopeId}>Initiation.DebtorAccount</code> in <code${_scopeId}>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.`);
      } else {
        return [
          createTextVNode("The presence or absence of "),
          createVNode("code", null, "Initiation.DebtorAccount"),
          createTextVNode(" in "),
          createVNode("code", null, "domestic_payment_pii"),
          createTextVNode(" determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p${_scopeId}>Passing a <code${_scopeId}>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP&#39;s own interface, but removes the user&#39;s ability to choose a different account at the LFI.</p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode("Passing a "),
            createVNode("code", null, "DebtorAccount"),
            createTextVNode(" reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3>Payment Control Parameters</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Control parameters define the spending rules for the consent and are displayed in the <strong${_scopeId}>Payment rules</strong> card on both the TPP Consent Page and the LFI Authorisation Page.`);
      } else {
        return [
          createTextVNode("Control parameters define the spending rules for the consent and are displayed in the "),
          createVNode("strong", null, "Payment rules"),
          createTextVNode(" card on both the TPP Consent Page and the LFI Authorisation Page.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`There are two groups of control parameters: <strong${_scopeId}>overall limits</strong> that apply across the full lifetime of the consent, and <strong${_scopeId}>per-period limits</strong> that reset each period.`);
      } else {
        return [
          createTextVNode("There are two groups of control parameters: "),
          createVNode("strong", null, "overall limits"),
          createTextVNode(" that apply across the full lifetime of the consent, and "),
          createVNode("strong", null, "per-period limits"),
          createTextVNode(" that reset each period.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<strong${_scopeId}>Overall limits</strong> (set at <code${_scopeId}>ControlParameters.ConsentSchedule.MultiPayment</code>):`);
      } else {
        return [
          createVNode("strong", null, "Overall limits"),
          createTextVNode(" (set at "),
          createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
          createTextVNode("):")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Field</th><th${_scopeId}>UI Label</th><th${_scopeId}>Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><code${_scopeId}>MaximumCumulativeNumberOfPayments</code></td><td${_scopeId}><em${_scopeId}>Total Number of Payments allowed</em></td><td${_scopeId}>The maximum number of individual payments that can be made across the entire consent. Only shown when provided.</td></tr><tr${_scopeId}><td${_scopeId}><code${_scopeId}>MaximumCumulativeValueOfPayments</code></td><td${_scopeId}><em${_scopeId}>Total Value allowed</em></td><td${_scopeId}>The maximum total amount that can be paid across the entire consent. Only shown when provided.</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, "Field"),
                createVNode("th", null, "UI Label"),
                createVNode("th", null, "Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "MaximumCumulativeNumberOfPayments")
                ]),
                createVNode("td", null, [
                  createVNode("em", null, "Total Number of Payments allowed")
                ]),
                createVNode("td", null, "The maximum number of individual payments that can be made across the entire consent. Only shown when provided.")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "MaximumCumulativeValueOfPayments")
                ]),
                createVNode("td", null, [
                  createVNode("em", null, "Total Value allowed")
                ]),
                createVNode("td", null, "The maximum total amount that can be paid across the entire consent. Only shown when provided.")
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<strong${_scopeId}>Per-period limits</strong> (set at <code${_scopeId}>ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls</code>):`);
      } else {
        return [
          createVNode("strong", null, "Per-period limits"),
          createTextVNode(" (set at "),
          createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls"),
          createTextVNode("):")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Field</th><th${_scopeId}>UI Label</th><th${_scopeId}>Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><code${_scopeId}>MaximumIndividualAmount</code></td><td${_scopeId}><em${_scopeId}>Max per Payment</em></td><td${_scopeId}>The maximum amount allowed for a single payment. Always shown.</td></tr><tr${_scopeId}><td${_scopeId}><code${_scopeId}>MaximumCumulativeNumberOfPaymentsPerPeriod</code></td><td${_scopeId}><em${_scopeId}>Max Payments per {PeriodType}</em></td><td${_scopeId}>The maximum number of payments within a single period (e.g. per Week). The period type from <code${_scopeId}>PeriodType</code> is substituted into the label. Only shown when provided.</td></tr><tr${_scopeId}><td${_scopeId}><code${_scopeId}>MaximumCumulativeValueOfPaymentsPerPeriod</code></td><td${_scopeId}><em${_scopeId}>Max Value per {PeriodType}</em></td><td${_scopeId}>The maximum total value of payments within a single period. The period type from <code${_scopeId}>PeriodType</code> is substituted into the label. Only shown when provided.</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, "Field"),
                createVNode("th", null, "UI Label"),
                createVNode("th", null, "Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "MaximumIndividualAmount")
                ]),
                createVNode("td", null, [
                  createVNode("em", null, "Max per Payment")
                ]),
                createVNode("td", null, "The maximum amount allowed for a single payment. Always shown.")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod")
                ]),
                createVNode("td", null, [
                  createVNode("em", null, "Max Payments per {PeriodType}")
                ]),
                createVNode("td", null, [
                  createTextVNode("The maximum number of payments within a single period (e.g. per Week). The period type from "),
                  createVNode("code", null, "PeriodType"),
                  createTextVNode(" is substituted into the label. Only shown when provided.")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod")
                ]),
                createVNode("td", null, [
                  createVNode("em", null, "Max Value per {PeriodType}")
                ]),
                createVNode("td", null, [
                  createTextVNode("The maximum total value of payments within a single period. The period type from "),
                  createVNode("code", null, "PeriodType"),
                  createTextVNode(" is substituted into the label. Only shown when provided.")
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p${_scopeId}>If an optional parameter is not provided in the API request, it must be <strong${_scopeId}>omitted entirely from the User Experience</strong> — it must <strong${_scopeId}>not</strong> be displayed as <code${_scopeId}>null</code> or <code${_scopeId}>0</code>.</p><p${_scopeId}><strong${_scopeId}>Correct</strong> — row not shown when parameter is absent:</p><pre${_scopeId}><code${_scopeId}>Payment rules
───────────────────────────────────────────
Max per Payment                    AED 200
───────────────────────────────────────────</code></pre><p${_scopeId}><strong${_scopeId}>Incorrect</strong> — row shown with a null or zero value:</p><pre${_scopeId}><code${_scopeId}>Payment rules
───────────────────────────────────────────
Max per Payment                    AED 200
Total Number of Payments allowed         0
──────────────────────────────────────────</code></pre>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode("If an optional parameter is not provided in the API request, it must be "),
            createVNode("strong", null, "omitted entirely from the User Experience"),
            createTextVNode(" — it must "),
            createVNode("strong", null, "not"),
            createTextVNode(" be displayed as "),
            createVNode("code", null, "null"),
            createTextVNode(" or "),
            createVNode("code", null, "0"),
            createTextVNode(".")
          ]),
          createVNode("p", null, [
            createVNode("strong", null, "Correct"),
            createTextVNode(" — row not shown when parameter is absent:")
          ]),
          createVNode("pre", null, [
            createVNode("code", null, "Payment rules\n───────────────────────────────────────────\nMax per Payment                    AED 200\n───────────────────────────────────────────")
          ]),
          createVNode("p", null, [
            createVNode("strong", null, "Incorrect"),
            createTextVNode(" — row shown with a null or zero value:")
          ]),
          createVNode("pre", null, [
            createVNode("code", null, "Payment rules\n───────────────────────────────────────────\nMax per Payment                    AED 200\nTotal Number of Payments allowed         0\n──────────────────────────────────────────")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3>Creditor Configuration</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The presence or absence of creditors in <code${_scopeId}>Initiation.Creditor</code> in <code${_scopeId}>domestic_payment_pii</code> determines how the LFI presents payment recipient information to the user.`);
      } else {
        return [
          createTextVNode("The presence or absence of creditors in "),
          createVNode("code", null, "Initiation.Creditor"),
          createTextVNode(" in "),
          createVNode("code", null, "domestic_payment_pii"),
          createTextVNode(" determines how the LFI presents payment recipient information to the user.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}><code${_scopeId}>Initiation.Creditor</code></th><th${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>1 creditor</strong></td><td${_scopeId}>The single payee&#39;s name and account details are displayed under &quot;Who you&#39;re paying&quot;. <em${_scopeId}>(See Example 1)</em></td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>2–10 defined creditors</strong></td><td${_scopeId}>All specified payees are listed under &quot;Who you&#39;re paying&quot;. <em${_scopeId}>(See Examples 2, 3 &amp; 4)</em></td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Undefined</strong> (absent or empty)</td><td${_scopeId}>A general message informs the user that the TPP is responsible for selecting beneficiaries at payment time. <em${_scopeId}>(See Example 5)</em></td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, [
                  createVNode("code", null, "Initiation.Creditor")
                ]),
                createVNode("th", null, "LFI Authorisation Page Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "1 creditor")
                ]),
                createVNode("td", null, [
                  createTextVNode(`The single payee's name and account details are displayed under "Who you're paying". `),
                  createVNode("em", null, "(See Example 1)")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "2–10 defined creditors")
                ]),
                createVNode("td", null, [
                  createTextVNode(`All specified payees are listed under "Who you're paying". `),
                  createVNode("em", null, "(See Examples 2, 3 & 4)")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Undefined"),
                  createTextVNode(" (absent or empty)")
                ]),
                createVNode("td", null, [
                  createTextVNode("A general message informs the user that the TPP is responsible for selecting beneficiaries at payment time. "),
                  createVNode("em", null, "(See Example 5)")
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3>Permissions and Data Access</h3>`);
  _push(ssrRenderComponent(_component_ServiceInitiationPermissionText, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/_shared/UIBehaviour.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UIBehaviour = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageViewer = ImageViewer;
  _push(`<!--[--><h3>Example 1 — Account Selected at TPP</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/variable-on-demand/1.png",
    alt: "variable-on-demand"
  }, null, _parent));
  _push(`<h3>Example 2 — Account Selected at LFI</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/variable-on-demand/2.png",
    alt: "variable-on-demand"
  }, null, _parent));
  _push(`<h3>Example 3 — Account Selected at LFI (Less Control Parameters)</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/variable-on-demand/3.png",
    alt: "variable-on-demand"
  }, null, _parent));
  _push(`<h3>Example 4 — Three Creditors</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/variable-on-demand/4.png",
    alt: "variable-on-demand"
  }, null, _parent));
  _push(`<h3>Example 5 — Undefined Creditors</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/variable-on-demand/5.png",
    alt: "variable-on-demand"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/_shared/ExampleJourneys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExampleJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AccountSetup as A,
  ExampleJourneys as E,
  UIBehaviour as U,
  WireframePreview as W
};
