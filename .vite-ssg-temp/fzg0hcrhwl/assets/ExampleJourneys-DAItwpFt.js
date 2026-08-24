import { _ as __unplugin_components_2, a as __unplugin_components_1 } from "./ConsentDelegatedSCA-DXh9QD2t.js";
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
  const _component_ConsentDelegatedSCA = __unplugin_components_1;
  const _component_AuthorizationDelegatedSCA = __unplugin_components_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-0efb7694>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentDelegatedSCA, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentDelegatedSCA)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationDelegatedSCA, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationDelegatedSCA)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/_shared/WireframePreview.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-0efb7694"]]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/_shared/AccountSetup.vue");
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/_shared/UIBehaviour.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UIBehaviour = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageViewer = ImageViewer;
  _push(`<!--[--><h3>Example 1 — Account Selected at TPP</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/delegated-sca/1.png",
    alt: "delegated-sca"
  }, null, _parent));
  _push(`<h3>Example 2 — Account Selected at LFI</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/delegated-sca/2.png",
    alt: "delegated-sca"
  }, null, _parent));
  _push(`<h3>Example 3 — Three Creditors</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/delegated-sca/3.png",
    alt: "delegated-sca"
  }, null, _parent));
  _push(`<h3>Example 4 — Undefined Creditors</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/delegated-sca/4.png",
    alt: "delegated-sca"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/_shared/ExampleJourneys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExampleJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AccountSetup as A,
  ExampleJourneys as E,
  UIBehaviour as U,
  WireframePreview as W
};
