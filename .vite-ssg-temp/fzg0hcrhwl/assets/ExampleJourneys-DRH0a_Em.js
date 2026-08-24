import { _ as __unplugin_components_4, a as __unplugin_components_3 } from "./ConsentSingleInstantPayment-BmbvVWg6.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { mergeProps, withCtx, createVNode, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_1 } from "./AccountEditor-CP6oAJ9S.js";
import { _ as __unplugin_components_4$1 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3$1 } from "./ServiceInitiationPermissionText-DAXAxMmQ.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_ConsentAuthLayout = __unplugin_components_0;
  const _component_ConsentSingleInstantPayment = __unplugin_components_3;
  const _component_AuthorizationSingleInstantPayment = __unplugin_components_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-09148e3d>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentSingleInstantPayment, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentSingleInstantPayment)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationSingleInstantPayment, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationSingleInstantPayment)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/_shared/WireframePreview.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-09148e3d"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4$1;
  const _component_AccountEditor = __unplugin_components_1;
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/_shared/AccountSetup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AccountSetup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4$1;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_ServiceInitiationPermissionText = __unplugin_components_3$1;
  _push(`<!--[--><h3 data-v-bc877436>Debtor Account Selection</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The presence or absence of <code data-v-bc877436${_scopeId}>Initiation.DebtorAccount</code> in <code data-v-bc877436${_scopeId}>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.`);
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
        _push2(`<p data-v-bc877436${_scopeId}>Passing a <code data-v-bc877436${_scopeId}>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP&#39;s own interface, but removes the user&#39;s ability to choose a different account at the LFI.</p>`);
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
  _push(`<h3 data-v-bc877436>Merchant Details</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`When a TPP processes payments on behalf of a merchant (e.g. a payment aggregator), <code data-v-bc877436${_scopeId}>Risk.CreditorIndicators.MerchantDetails.MerchantName</code> can be passed to identify the merchant to the user on the LFI Authorisation Page.`);
      } else {
        return [
          createTextVNode("When a TPP processes payments on behalf of a merchant (e.g. a payment aggregator), "),
          createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName"),
          createTextVNode(" can be passed to identify the merchant to the user on the LFI Authorisation Page.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table data-v-bc877436${_scopeId}><thead data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><th data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Risk.CreditorIndicators.MerchantDetails.MerchantName</code></th><th data-v-bc877436${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>Passed in</strong></td><td data-v-bc877436${_scopeId}>The merchant name is displayed on the Authorisation Page alongside the creditor details, indicating that the payment is being made on behalf of that merchant. <em data-v-bc877436${_scopeId}>(See Example 4)</em></td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>Not passed in</strong></td><td data-v-bc877436${_scopeId}>No merchant information is shown. Only the creditor details are displayed. <em data-v-bc877436${_scopeId}>(See Examples 1, 2 &amp; 3)</em></td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, [
                  createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName")
                ]),
                createVNode("th", null, "LFI Authorisation Page Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Passed in")
                ]),
                createVNode("td", null, [
                  createTextVNode("The merchant name is displayed on the Authorisation Page alongside the creditor details, indicating that the payment is being made on behalf of that merchant. "),
                  createVNode("em", null, "(See Example 4)")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Not passed in")
                ]),
                createVNode("td", null, [
                  createTextVNode("No merchant information is shown. Only the creditor details are displayed. "),
                  createVNode("em", null, "(See Examples 1, 2 & 3)")
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 data-v-bc877436>Creditor Configuration</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The presence or absence of creditors in <code data-v-bc877436${_scopeId}>Initiation.Creditor</code> in <code data-v-bc877436${_scopeId}>domestic_payment_pii</code> determines how the LFI presents payment recipient information to the user.`);
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
        _push2(`<table data-v-bc877436${_scopeId}><thead data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><th data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Initiation.Creditor</code></th><th data-v-bc877436${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>1 creditor</strong></td><td data-v-bc877436${_scopeId}>The single payee&#39;s name and account details are displayed under &quot;Who you&#39;re paying&quot;. <em data-v-bc877436${_scopeId}>(See Example 1)</em></td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>2–10 defined creditors</strong></td><td data-v-bc877436${_scopeId}>Not Supported</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>Undefined</strong> (absent or empty)</td><td data-v-bc877436${_scopeId}>Not Supported</td></tr></tbody></table>`);
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
                createVNode("td", null, "Not Supported")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Undefined"),
                  createTextVNode(" (absent or empty)")
                ]),
                createVNode("td", null, "Not Supported")
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 data-v-bc877436>Trusted Payees Wording</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The wording of the &quot;Add to my list of Trusted Payees&quot; checkbox is driven by <code data-v-bc877436${_scopeId}>Initiation.Creditor[].CreditorAccount.Type</code> in <code data-v-bc877436${_scopeId}>domestic_payment_pii</code>. Whether the checkbox is shown at all is a separate, account-driven behaviour — see Trusted Payees under <em data-v-bc877436${_scopeId}>UI Behaviour Driven by Account State</em>.`);
      } else {
        return [
          createTextVNode('The wording of the "Add to my list of Trusted Payees" checkbox is driven by '),
          createVNode("code", null, "Initiation.Creditor[].CreditorAccount.Type"),
          createTextVNode(" in "),
          createVNode("code", null, "domestic_payment_pii"),
          createTextVNode(". Whether the checkbox is shown at all is a separate, account-driven behaviour — see Trusted Payees under "),
          createVNode("em", null, "UI Behaviour Driven by Account State"),
          createTextVNode(".")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table data-v-bc877436${_scopeId}><thead data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><th data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>CreditorAccount.Type</code></th><th data-v-bc877436${_scopeId}>Checkbox Text</th></tr></thead><tbody data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Individual</code></td><td data-v-bc877436${_scopeId}>Add person to my list of Trusted Payees</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Merchant</code></td><td data-v-bc877436${_scopeId}>Add merchant to my list of Trusted Payees</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Business</code></td><td data-v-bc877436${_scopeId}>Add business to my list of Trusted Payees</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Charity</code></td><td data-v-bc877436${_scopeId}>Add charity to my list of Trusted Payees</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>GovernmentBody</code></td><td data-v-bc877436${_scopeId}>Add government body to my list of Trusted Payees</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><code data-v-bc877436${_scopeId}>Other</code> or not provided</td><td data-v-bc877436${_scopeId}>Add to my list of Trusted Payees</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, [
                  createVNode("code", null, "CreditorAccount.Type")
                ]),
                createVNode("th", null, "Checkbox Text")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "Individual")
                ]),
                createVNode("td", null, "Add person to my list of Trusted Payees")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "Merchant")
                ]),
                createVNode("td", null, "Add merchant to my list of Trusted Payees")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "Business")
                ]),
                createVNode("td", null, "Add business to my list of Trusted Payees")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "Charity")
                ]),
                createVNode("td", null, "Add charity to my list of Trusted Payees")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "GovernmentBody")
                ]),
                createVNode("td", null, "Add government body to my list of Trusted Payees")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("code", null, "Other"),
                  createTextVNode(" or not provided")
                ]),
                createVNode("td", null, "Add to my list of Trusted Payees")
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 data-v-bc877436>Permissions and Data Access</h3>`);
  _push(ssrRenderComponent(_component_ServiceInitiationPermissionText, null, null, _parent));
  _push(`<div class="ui-break" data-v-bc877436><span class="ui-break__eyebrow" data-v-bc877436>Account-Driven Behaviour</span><h3 class="ui-break__title" data-v-bc877436>UI Behaviour Driven by Account State</h3></div>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Some Authorisation Page behaviours are not driven by fields in the consent request — they are driven by the customer&#39;s account state or account-level settings at the LFI. The TPP cannot control these; the LFI determines them at the point of authorisation.`);
      } else {
        return [
          createTextVNode("Some Authorisation Page behaviours are not driven by fields in the consent request — they are driven by the customer's account state or account-level settings at the LFI. The TPP cannot control these; the LFI determines them at the point of authorisation.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Use the <strong data-v-bc877436${_scopeId}>Simulated Accounts Behaviour</strong> panel above to preview each state.`);
      } else {
        return [
          createTextVNode("Use the "),
          createVNode("strong", null, "Simulated Accounts Behaviour"),
          createTextVNode(" panel above to preview each state.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 data-v-bc877436>Warnings &amp; Priority</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The LFI may surface one of three warnings on the Authorisation Page based on the account and payment state. Only one warning is shown at a time, with the following priority order:`);
      } else {
        return [
          createTextVNode("The LFI may surface one of three warnings on the Authorisation Page based on the account and payment state. Only one warning is shown at a time, with the following priority order:")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table data-v-bc877436${_scopeId}><thead data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><th data-v-bc877436${_scopeId}>Priority</th><th data-v-bc877436${_scopeId}>Warning</th><th data-v-bc877436${_scopeId}>Warning Text</th></tr></thead><tbody data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>1 (highest)</strong></td><td data-v-bc877436${_scopeId}>Payment Limit Exceeded</td><td data-v-bc877436${_scopeId}><em data-v-bc877436${_scopeId}>Payment limit exceeded — The amount exceeds the payment limit you&#39;ve set on your account. You may need to change your settings or try a smaller amount.</em></td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>2</strong></td><td data-v-bc877436${_scopeId}>Overdraft</td><td data-v-bc877436${_scopeId}><em data-v-bc877436${_scopeId}>This payment will take your selected account into an overdraft/unarranged overdraft.</em></td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>3</strong></td><td data-v-bc877436${_scopeId}>Duplicate Payment Alert</td><td data-v-bc877436${_scopeId}><em data-v-bc877436${_scopeId}>Duplicate Payment Alert — Our systems indicate that you have already made a payment of the same amount to this beneficiary in the last 24 hours. Please check and ensure that you are not making a duplicate payment.</em></td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, "Priority"),
                createVNode("th", null, "Warning"),
                createVNode("th", null, "Warning Text")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "1 (highest)")
                ]),
                createVNode("td", null, "Payment Limit Exceeded"),
                createVNode("td", null, [
                  createVNode("em", null, "Payment limit exceeded — The amount exceeds the payment limit you've set on your account. You may need to change your settings or try a smaller amount.")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "2")
                ]),
                createVNode("td", null, "Overdraft"),
                createVNode("td", null, [
                  createVNode("em", null, "This payment will take your selected account into an overdraft/unarranged overdraft.")
                ])
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "3")
                ]),
                createVNode("td", null, "Duplicate Payment Alert"),
                createVNode("td", null, [
                  createVNode("em", null, "Duplicate Payment Alert — Our systems indicate that you have already made a payment of the same amount to this beneficiary in the last 24 hours. Please check and ensure that you are not making a duplicate payment.")
                ])
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
        _push2(`If a higher-priority warning applies, lower-priority warnings are suppressed. For example, if both a payment limit breach and a duplicate are detected, only the Payment Limit Exceeded warning is shown.`);
      } else {
        return [
          createTextVNode("If a higher-priority warning applies, lower-priority warnings are suppressed. For example, if both a payment limit breach and a duplicate are detected, only the Payment Limit Exceeded warning is shown.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 data-v-bc877436>Trusted Payees</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The LFI shows the &quot;Add to my list of Trusted Payees&quot; checkbox only if the creditor is not already a trusted payee on the customer&#39;s account. If the creditor is already a trusted payee, the checkbox is suppressed. The wording of the checkbox label is driven by an API field — see Trusted Payees Wording under <em data-v-bc877436${_scopeId}>UI Behaviour Driven by API Fields</em>.`);
      } else {
        return [
          createTextVNode(`The LFI shows the "Add to my list of Trusted Payees" checkbox only if the creditor is not already a trusted payee on the customer's account. If the creditor is already a trusted payee, the checkbox is suppressed. The wording of the checkbox label is driven by an API field — see Trusted Payees Wording under `),
          createVNode("em", null, "UI Behaviour Driven by API Fields"),
          createTextVNode(".")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table data-v-bc877436${_scopeId}><thead data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><th data-v-bc877436${_scopeId}>Creditor status on the customer&#39;s account</th><th data-v-bc877436${_scopeId}>Authorisation Page Behaviour</th></tr></thead><tbody data-v-bc877436${_scopeId}><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>Not</strong> already a trusted payee</td><td data-v-bc877436${_scopeId}>The checkbox is shown.</td></tr><tr data-v-bc877436${_scopeId}><td data-v-bc877436${_scopeId}><strong data-v-bc877436${_scopeId}>Already</strong> a trusted payee</td><td data-v-bc877436${_scopeId}>The checkbox is suppressed.</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, "Creditor status on the customer's account"),
                createVNode("th", null, "Authorisation Page Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Not"),
                  createTextVNode(" already a trusted payee")
                ]),
                createVNode("td", null, "The checkbox is shown.")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Already"),
                  createTextVNode(" a trusted payee")
                ]),
                createVNode("td", null, "The checkbox is suppressed.")
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/_shared/UIBehaviour.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UIBehaviour = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-bc877436"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageViewer = ImageViewer;
  _push(`<!--[--><h3>Example 1 — User selects account at LFI</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/single-instant-payment/1.png",
    alt: "single-instant-payment-journey"
  }, null, _parent));
  _push(`<h3>Example 2 — User selects account at TPP (duplicate payment warning)</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/single-instant-payment/2.png",
    alt: "single-instant-payment-journey"
  }, null, _parent));
  _push(`<h3>Example 3 — User selects account at TPP (overdraft warning)</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/single-instant-payment/3.png",
    alt: "single-instant-payment-journey"
  }, null, _parent));
  _push(`<h3>Example 4 — User selects account at LFI (merchant details passed in by TPP)</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/single-instant-payment/4.png",
    alt: "single-instant-payment-journey"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/_shared/ExampleJourneys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExampleJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AccountSetup as A,
  ExampleJourneys as E,
  UIBehaviour as U,
  WireframePreview as W
};
