import { _ as __unplugin_components_2, a as __unplugin_components_1, b as __unplugin_components_1$1 } from "./PolicyEditor-DUDwNaB2.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { mergeProps, withCtx, createVNode, useSSRContext, createTextVNode, defineComponent, unref, openBlock, createBlock, Fragment, renderList, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { a as insurancePermissionGroups, b as insurancePermissionDescriptions } from "./insurancePolicyStatus-7keZa3ks.js";
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_ConsentAuthLayout = __unplugin_components_0;
  const _component_ConsentInsuranceDataSharing = __unplugin_components_1;
  const _component_AuthorizationInsuranceDataSharing = __unplugin_components_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-1e9a0294>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentInsuranceDataSharing, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentInsuranceDataSharing)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationInsuranceDataSharing, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationInsuranceDataSharing)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/data-sharing/_shared/WireframePreview.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1e9a0294"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_PolicyEditor = __unplugin_components_1$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Configure the mock insurance policies the authenticated user holds at their LFI. Flipping a policy&#39;s <strong${_scopeId}>Status</strong> moves it between the Active and Inactive groups on the wireframe. `);
      } else {
        return [
          createTextVNode(" Configure the mock insurance policies the authenticated user holds at their LFI. Flipping a policy's "),
          createVNode("strong", null, "Status"),
          createTextVNode(" moves it between the Active and Inactive groups on the wireframe. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_PolicyEditor, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/data-sharing/_shared/PolicySetup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PolicySetup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UIBehaviour",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<!--[--><h3>Permissions and Data Access</h3>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` For Insurance Data Sharing, the <code${_scopeId}>Permissions</code> field is an array of <code${_scopeId}>{ InsuranceType, Permissions[] }</code> objects — permissions are scoped to a specific insurance type, so a TPP can request different data clusters per type in a single consent. `);
          } else {
            return [
              createTextVNode(" For Insurance Data Sharing, the "),
              createVNode("code", null, "Permissions"),
              createTextVNode(" field is an array of "),
              createVNode("code", null, "{ InsuranceType, Permissions[] }"),
              createTextVNode(" objects — permissions are scoped to a specific insurance type, so a TPP can request different data clusters per type in a single consent. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Permission code</th><th${_scopeId}>What the user sees on both the Consent and Authorisation pages</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(insurancePermissionGroups), (row) => {
              _push2(`<tr${_scopeId}><td${_scopeId}><code${_scopeId}>${ssrInterpolate(row.permission)}</code></td><td${_scopeId}><strong${_scopeId}>${ssrInterpolate(row.label)}</strong><span${_scopeId}> — ${ssrInterpolate(unref(insurancePermissionDescriptions)[row.permission])}</span></td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Permission code"),
                    createVNode("th", null, "What the user sees on both the Consent and Authorisation pages")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(insurancePermissionGroups), (row) => {
                    return openBlock(), createBlock("tr", {
                      key: row.permission
                    }, [
                      createVNode("td", null, [
                        createVNode("code", null, toDisplayString(row.permission), 1)
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, toDisplayString(row.label), 1),
                        createVNode("span", null, " — " + toDisplayString(unref(insurancePermissionDescriptions)[row.permission]), 1)
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h3>Insurance Type Filtering</h3>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Each entry in <code${_scopeId}>Permissions</code> nominates an <code${_scopeId}>InsuranceType</code>. The LFI Authorisation Page only shows policies whose type appears in the consent — this acts as the equivalent of Banking’s <code${_scopeId}>AccountSubType</code> filter. `);
          } else {
            return [
              createTextVNode(" Each entry in "),
              createVNode("code", null, "Permissions"),
              createTextVNode(" nominates an "),
              createVNode("code", null, "InsuranceType"),
              createTextVNode(". The LFI Authorisation Page only shows policies whose type appears in the consent — this acts as the equivalent of Banking’s "),
              createVNode("code", null, "AccountSubType"),
              createTextVNode(" filter. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}><code${_scopeId}>Permissions[].InsuranceType</code></th><th${_scopeId}>LFI Authorisation Page Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>One or more types</strong></td><td${_scopeId}> Only policies whose <code${_scopeId}>InsuranceType</code> matches one of the requested values are shown for selection. If the user holds no policies of any requested type, the LFI returns the no-matching-policies error and the authorisation flow cannot proceed. </td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>None / empty</strong></td><td${_scopeId}> Invalid — <code${_scopeId}>Permissions</code> must contain at least one entry and each entry must declare an <code${_scopeId}>InsuranceType</code>. The consent is rejected before authorisation begins. </td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("code", null, "Permissions[].InsuranceType")
                    ]),
                    createVNode("th", null, "LFI Authorisation Page Behaviour")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "One or more types")
                    ]),
                    createVNode("td", null, [
                      createTextVNode(" Only policies whose "),
                      createVNode("code", null, "InsuranceType"),
                      createTextVNode(" matches one of the requested values are shown for selection. If the user holds no policies of any requested type, the LFI returns the no-matching-policies error and the authorisation flow cannot proceed. ")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "None / empty")
                    ]),
                    createVNode("td", null, [
                      createTextVNode(" Invalid — "),
                      createVNode("code", null, "Permissions"),
                      createTextVNode(" must contain at least one entry and each entry must declare an "),
                      createVNode("code", null, "InsuranceType"),
                      createTextVNode(". The consent is rejected before authorisation begins. ")
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
            _push2(`<p${_scopeId}> Only request the insurance types your service genuinely needs. Listing extra types forces the user to scan irrelevant policies and is flagged during CX certification. </p>`);
          } else {
            return [
              createVNode("p", null, " Only request the insurance types your service genuinely needs. Listing extra types forces the user to scan irrelevant policies and is flagged during CX certification. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h3>Policy Status Grouping</h3>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Policies are grouped on the Authorisation Page by their <code${_scopeId}>Status</code> field (<code${_scopeId}>AEInsurancePolicyStatusCodes</code>). Currently active statuses are presented first and selectable by default; end-state statuses are bucketed into a collapsible <strong${_scopeId}>Inactive Policies</strong> group so the user can see what is in scope but cannot select policies whose data can’t be shared. `);
          } else {
            return [
              createTextVNode(" Policies are grouped on the Authorisation Page by their "),
              createVNode("code", null, "Status"),
              createTextVNode(" field ("),
              createVNode("code", null, "AEInsurancePolicyStatusCodes"),
              createTextVNode("). Currently active statuses are presented first and selectable by default; end-state statuses are bucketed into a collapsible "),
              createVNode("strong", null, "Inactive Policies"),
              createTextVNode(" group so the user can see what is in scope but cannot select policies whose data can’t be shared. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Status group</th><th${_scopeId}>Statuses included</th><th${_scopeId}>Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Active</strong></td><td${_scopeId}><code${_scopeId}>New</code>, <code${_scopeId}>Renewed</code>, <code${_scopeId}>InForce</code>, <code${_scopeId}>PaidUp</code></td><td${_scopeId}>Shown first, with a green tick header. Selectable by default.</td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Inactive</strong></td><td${_scopeId}><code${_scopeId}>Expired</code>, <code${_scopeId}>Lapsed</code>, <code${_scopeId}>Cancelled</code>, <code${_scopeId}>Surrendered</code>, <code${_scopeId}>Converted</code>, <code${_scopeId}>DeathClaim</code>, <code${_scopeId}>RiderClaim</code></td><td${_scopeId}> Collapsed by default behind an amber clock header. The policy’s end-state status is shown below the insurance type so the user understands why the policy is not selectable. </td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Status group"),
                    createVNode("th", null, "Statuses included"),
                    createVNode("th", null, "Behaviour")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Active")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "New"),
                      createTextVNode(", "),
                      createVNode("code", null, "Renewed"),
                      createTextVNode(", "),
                      createVNode("code", null, "InForce"),
                      createTextVNode(", "),
                      createVNode("code", null, "PaidUp")
                    ]),
                    createVNode("td", null, "Shown first, with a green tick header. Selectable by default.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Inactive")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "Expired"),
                      createTextVNode(", "),
                      createVNode("code", null, "Lapsed"),
                      createTextVNode(", "),
                      createVNode("code", null, "Cancelled"),
                      createTextVNode(", "),
                      createVNode("code", null, "Surrendered"),
                      createTextVNode(", "),
                      createVNode("code", null, "Converted"),
                      createTextVNode(", "),
                      createVNode("code", null, "DeathClaim"),
                      createTextVNode(", "),
                      createVNode("code", null, "RiderClaim")
                    ]),
                    createVNode("td", null, " Collapsed by default behind an amber clock header. The policy’s end-state status is shown below the insurance type so the user understands why the policy is not selectable. ")
                  ])
                ])
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
            _push2(` When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), <code${_scopeId}>OnBehalfOf.TradingName</code> identifies the entity to the user on both the Consent and Authorisation pages. `);
          } else {
            return [
              createTextVNode(" When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), "),
              createVNode("code", null, "OnBehalfOf.TradingName"),
              createTextVNode(" identifies the entity to the user on both the Consent and Authorisation pages. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}><code${_scopeId}>OnBehalfOf.TradingName</code></th><th${_scopeId}>Consent / Authorisation Page Behaviour</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Provided</strong></td><td${_scopeId}>The trading name is displayed in the page copy so the user clearly understands which entity they are sharing data with.</td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Not provided</strong></td><td${_scopeId}>The TPP’s registered name is displayed in place of the trading name.</td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("code", null, "OnBehalfOf.TradingName")
                    ]),
                    createVNode("th", null, "Consent / Authorisation Page Behaviour")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Provided")
                    ]),
                    createVNode("td", null, "The trading name is displayed in the page copy so the user clearly understands which entity they are sharing data with.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Not provided")
                    ]),
                    createVNode("td", null, "The TPP’s registered name is displayed in place of the trading name.")
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
            _push2(`<p${_scopeId}>Always populate <code${_scopeId}>OnBehalfOf.TradingName</code> so users see a recognisable name rather than a blank or placeholder.</p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode("Always populate "),
                createVNode("code", null, "OnBehalfOf.TradingName"),
                createTextVNode(" so users see a recognisable name rather than a blank or placeholder.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/data-sharing/_shared/UIBehaviour.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  PolicySetup as P,
  WireframePreview as W,
  _sfc_main as _
};
