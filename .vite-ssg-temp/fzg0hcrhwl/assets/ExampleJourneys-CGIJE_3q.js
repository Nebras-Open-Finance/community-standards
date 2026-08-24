import { _ as __unplugin_components_2, a as __unplugin_components_1 } from "./ConsentBankDataSharing-Dh6olf2f.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { mergeProps, withCtx, createVNode, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_1$1 } from "./AccountEditor-CP6oAJ9S.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_1$2 } from "./PermissionsReference-CYEmgELB.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_ConsentAuthLayout = __unplugin_components_0;
  const _component_ConsentBankDataSharing = __unplugin_components_1;
  const _component_AuthorizationBankDataSharing = __unplugin_components_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-9c99797b>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentBankDataSharing, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentBankDataSharing)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationBankDataSharing, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationBankDataSharing)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/_shared/WireframePreview.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-9c99797b"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_AccountEditor = __unplugin_components_1$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Configure the mock accounts the authenticated user holds at their bank. `);
      } else {
        return [
          createTextVNode(" Configure the mock accounts the authenticated user holds at their bank. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_AccountEditor, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/_shared/AccountSetup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AccountSetup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_PermissionsReference = __unplugin_components_1$2;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  _push(`<!--[--><h3>Permissions and Data Access</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The table below outlines the text displayed to users on the Consent Page when they expand each data category associated with the consent permissions.`);
      } else {
        return [
          createTextVNode("The table below outlines the text displayed to users on the Consent Page when they expand each data category associated with the consent permissions.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_PermissionsReference, null, null, _parent));
  _push(`<h3>Account Sub Type Filtering</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`The <code${_scopeId}>AccountSubType</code> field in <code${_scopeId}>authorization_details</code> acts as a filter, controlling which of the user&#39;s accounts are presented for selection on the LFI Authorisation Page.`);
      } else {
        return [
          createTextVNode("The "),
          createVNode("code", null, "AccountSubType"),
          createTextVNode(" field in "),
          createVNode("code", null, "authorization_details"),
          createTextVNode(" acts as a filter, controlling which of the user's accounts are presented for selection on the LFI Authorisation Page.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}><code${_scopeId}>AccountSubType</code></th><th${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Provided</strong></td><td${_scopeId}>Only accounts whose sub-type matches one of the specified values are shown. If the user holds no accounts of the requested sub-type, the LFI returns an error and the authorisation flow cannot proceed.</td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Not provided</strong></td><td${_scopeId}>All of the user&#39;s available accounts are shown for selection, regardless of account type.</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, [
                  createVNode("code", null, "AccountSubType")
                ]),
                createVNode("th", null, "LFI Authorisation Page Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Provided")
                ]),
                createVNode("td", null, "Only accounts whose sub-type matches one of the specified values are shown. If the user holds no accounts of the requested sub-type, the LFI returns an error and the authorisation flow cannot proceed.")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Not provided")
                ]),
                createVNode("td", null, "All of the user's available accounts are shown for selection, regardless of account type.")
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
        _push2(`<p${_scopeId}>Use <code${_scopeId}>AccountSubType</code> to restrict access to specific account types (e.g. <code${_scopeId}>Mortgage</code>). Omit it to allow selection from all account types.</p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode("Use "),
            createVNode("code", null, "AccountSubType"),
            createTextVNode(" to restrict access to specific account types (e.g. "),
            createVNode("code", null, "Mortgage"),
            createTextVNode("). Omit it to allow selection from all account types.")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3>On Behalf Of</h3>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), <code${_scopeId}>OnBehalfOf.TradingName</code> can be passed to identify the entity to the user on the LFI Authorisation Page.`);
      } else {
        return [
          createTextVNode("When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), "),
          createVNode("code", null, "OnBehalfOf.TradingName"),
          createTextVNode(" can be passed to identify the entity to the user on the LFI Authorisation Page.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdRefTable, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}><code${_scopeId}>OnBehalfOf.TradingName</code></th><th${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Provided</strong></td><td${_scopeId}>The trading name is displayed within the Authorisation Page so the user clearly understands which entity they are sharing data with.</td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Not provided</strong></td><td${_scopeId}>The TPP&#39;s name is displayed in place of the trading name.</td></tr></tbody></table>`);
      } else {
        return [
          createVNode("table", null, [
            createVNode("thead", null, [
              createVNode("tr", null, [
                createVNode("th", null, [
                  createVNode("code", null, "OnBehalfOf.TradingName")
                ]),
                createVNode("th", null, "LFI Authorisation Page Behaviour")
              ])
            ]),
            createVNode("tbody", null, [
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Provided")
                ]),
                createVNode("td", null, "The trading name is displayed within the Authorisation Page so the user clearly understands which entity they are sharing data with.")
              ]),
              createVNode("tr", null, [
                createVNode("td", null, [
                  createVNode("strong", null, "Not provided")
                ]),
                createVNode("td", null, "The TPP's name is displayed in place of the trading name.")
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
        _push2(`<p${_scopeId}>Always populate <code${_scopeId}>OnBehalfOf.TradingName</code> so users see a recognisable name rather than a blank or placeholder on the Authorisation Page.</p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode("Always populate "),
            createVNode("code", null, "OnBehalfOf.TradingName"),
            createTextVNode(" so users see a recognisable name rather than a blank or placeholder on the Authorisation Page.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/_shared/UIBehaviour.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UIBehaviour = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageViewer = ImageViewer;
  _push(`<!--[--><h3>Example 1 — Current and Savings Account</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/data-sharing/1.png",
    alt: "bank-data-sharing-journey"
  }, null, _parent));
  _push(`<h3>Example 2 — Current Account, Savings Account, Credit Card, Mortgage &amp; Auto Finance</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/data-sharing/2.png",
    alt: "bank-data-sharing-journey"
  }, null, _parent));
  _push(`<h3>Example 3 — Current Account, Current Account (USD) &amp; Current Account (INR)</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/data-sharing/3.png",
    alt: "bank-data-sharing-journey"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/_shared/ExampleJourneys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExampleJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AccountSetup as A,
  ExampleJourneys as E,
  UIBehaviour as U,
  WireframePreview as W
};
