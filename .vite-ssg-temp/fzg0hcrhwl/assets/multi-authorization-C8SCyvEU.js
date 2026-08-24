import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as _sfc_main$1 } from "./APIFlowsMultiAuthorization-BuhXTBC1.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const patchFirstAuthorizerExample = `{
  "psuIdentifiers": {
    "userId": "52738e3b-eacf-4a7c-a73b-da01caa45c3f"
  },
  "accountIds": [
    "100004000000000000000001",
    "100004000000000000000003",
    "100004000000000000000004"
  ],
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
`;
const patchOneApprovedExample = `{
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
`;
const patchFinalApprovalExample = `{
  "consentBody": {
    "Data": {
      "Status": "Authorized"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T08:10:02Z",
            "AuthorizationStatus": "Approved"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
`;
const patchRejectedExample = `{
  "consentBody": {
    "Data": {
      "Status": "Rejected"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Rejected"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multi-authorization",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsMultiAuthorization = _sfc_main$1;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-4b9658c2><section class="ed-doc__hero" data-v-4b9658c2><div class="ed-doc__inner" data-v-4b9658c2><div class="ed-doc__eyebrow" data-v-4b9658c2><span class="ed-doc__eyebrow-dash" data-v-4b9658c2></span> LFI · Banking · Service Initiation · Multi-Authorization </div><h1 class="ed-doc__title" data-v-4b9658c2> Multi-Authorization <span class="ed-doc__read" data-v-4b9658c2>2 min read</span></h1><p class="ed-doc__lede" data-v-4b9658c2> The Open Finance standards support payment journeys that require more than one authorizer. This guide explains how TPPs and LFIs must coordinate multi-authorization for payment consents and how the consent lifecycle is reflected in API calls and responses. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before initiating a multi-authorization payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before initiating a multi-authorization payment, ensure the following are in place:`);
                } else {
                  return [
                    createTextVNode("Before initiating a multi-authorization payment, ensure the following are in place:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>Registered <a href="/tech/lfi-api-hub/trust-framework/application" data-v-4b9658c2${_scopeId2}>Application</a></strong> — The application must be created within the Trust Framework and assigned the <strong data-v-4b9658c2${_scopeId2}>BSIP role</strong> as defined in <a href="/tech/lfi-api-hub/trust-framework/roles" data-v-4b9658c2${_scopeId2}>Roles</a>. </li><li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>An active payment consent</strong> — A payment consent must have been created through the relevant <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" data-v-4b9658c2${_scopeId2}>Service Initiation API Guide</a>. Multi-authorization applies after the first authorizer has completed their step. </li><li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>Understanding of the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-4b9658c2${_scopeId2}>Consent Journey</a></strong> — You should understand consent status transitions, including <code data-v-4b9658c2${_scopeId2}>AwaitingAuthorization</code>, <code data-v-4b9658c2${_scopeId2}>Authorized</code>, and <code data-v-4b9658c2${_scopeId2}>Rejected</code>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — The application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "BSIP role"),
                      createTextVNode(" as defined in "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "An active payment consent"),
                      createTextVNode(" — A payment consent must have been created through the relevant "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Service Initiation API Guide"),
                      createTextVNode(". Multi-authorization applies after the first authorizer has completed their step. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of the "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey")
                      ]),
                      createTextVNode(" — You should understand consent status transitions, including "),
                      createVNode("code", null, "AwaitingAuthorization"),
                      createTextVNode(", "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(", and "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Before initiating a multi-authorization payment, ensure the following are in place:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — The application must be created within the Trust Framework and assigned the "),
                    createVNode("strong", null, "BSIP role"),
                    createTextVNode(" as defined in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "An active payment consent"),
                    createTextVNode(" — A payment consent must have been created through the relevant "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Service Initiation API Guide"),
                    createTextVNode(". Multi-authorization applies after the first authorizer has completed their step. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey")
                    ]),
                    createTextVNode(" — You should understand consent status transitions, including "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(", and "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "api-sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Sequence Flow",
        title: "API sequence flow",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "Multi-Authorization",
              downloadUrl: "/images/consent-flows/uae-multi-auth-sequence-diagram.png"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsMultiAuthorization, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsMultiAuthorization)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, {
                title: "Multi-Authorization",
                downloadUrl: "/images/consent-flows/uae-multi-auth-sequence-diagram.png"
              }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsMultiAuthorization)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "indicating-multi-authorization-support",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "PAR Request",
        title: "Indicating multi-authorization support",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="ed-doc__subhead" data-v-4b9658c2${_scopeId}>Step 1 — Setting <code data-v-4b9658c2${_scopeId}>IsSingleAuthorization</code> and <code data-v-4b9658c2${_scopeId}>AuthorizationExpirationDateTime</code> in the PAR Request</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When submitting the Pushed Authorization Request (PAR), the TPP MUST set <code data-v-4b9658c2${_scopeId2}>IsSingleAuthorization</code> inside <code data-v-4b9658c2${_scopeId2}>authorization_details[].consent</code>: `);
                } else {
                  return [
                    createTextVNode(" When submitting the Pushed Authorization Request (PAR), the TPP MUST set "),
                    createVNode("code", null, "IsSingleAuthorization"),
                    createTextVNode(" inside "),
                    createVNode("code", null, "authorization_details[].consent"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}><code data-v-4b9658c2${_scopeId2}>true</code> — only a single authorizer is supported for the payment.</li><li data-v-4b9658c2${_scopeId2}><code data-v-4b9658c2${_scopeId2}>false</code> — multiple authorizers are supported (multi-authorization enabled).</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "true"),
                      createTextVNode(" — only a single authorizer is supported for the payment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "false"),
                      createTextVNode(" — multiple authorizers are supported (multi-authorization enabled).")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When <code data-v-4b9658c2${_scopeId2}>IsSingleAuthorization</code> is <code data-v-4b9658c2${_scopeId2}>false</code>, the TPP SHOULD also set <code data-v-4b9658c2${_scopeId2}>AuthorizationExpirationDateTime</code> inside <code data-v-4b9658c2${_scopeId2}>authorization_details[].consent</code>. This field represents the deadline by which <strong data-v-4b9658c2${_scopeId2}>all</strong> remaining authorizers must have acted — that is, the consent MUST reach <code data-v-4b9658c2${_scopeId2}>Status=Authorized</code> before this time, otherwise the consent transitions to rejected/expired. `);
                } else {
                  return [
                    createTextVNode(" When "),
                    createVNode("code", null, "IsSingleAuthorization"),
                    createTextVNode(" is "),
                    createVNode("code", null, "false"),
                    createTextVNode(", the TPP SHOULD also set "),
                    createVNode("code", null, "AuthorizationExpirationDateTime"),
                    createTextVNode(" inside "),
                    createVNode("code", null, "authorization_details[].consent"),
                    createTextVNode(". This field represents the deadline by which "),
                    createVNode("strong", null, "all"),
                    createTextVNode(" remaining authorizers must have acted — that is, the consent MUST reach "),
                    createVNode("code", null, "Status=Authorized"),
                    createTextVNode(" before this time, otherwise the consent transitions to rejected/expired. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}><code data-v-4b9658c2${_scopeId2}>AuthorizationExpirationDateTime</code> MUST NOT be after <code data-v-4b9658c2${_scopeId2}>ExpirationDateTime</code>.</li><li data-v-4b9658c2${_scopeId2}>When <code data-v-4b9658c2${_scopeId2}>IsSingleAuthorization</code> is <code data-v-4b9658c2${_scopeId2}>true</code>, TPPs SHOULD NOT include <code data-v-4b9658c2${_scopeId2}>AuthorizationExpirationDateTime</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" MUST NOT be after "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("When "),
                      createVNode("code", null, "IsSingleAuthorization"),
                      createTextVNode(" is "),
                      createVNode("code", null, "true"),
                      createTextVNode(", TPPs SHOULD NOT include "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4b9658c2${_scopeId2}> These fields are carried in the Rich Authorization Request (<code data-v-4b9658c2${_scopeId2}>authorization_details[].consent.IsSingleAuthorization</code>, <code data-v-4b9658c2${_scopeId2}>authorization_details[].consent.AuthorizationExpirationDateTime</code>). See the Authorization Endpoints OpenAPI for the full schema reference. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" These fields are carried in the Rich Authorization Request ("),
                      createVNode("code", null, "authorization_details[].consent.IsSingleAuthorization"),
                      createTextVNode(", "),
                      createVNode("code", null, "authorization_details[].consent.AuthorizationExpirationDateTime"),
                      createTextVNode("). See the Authorization Endpoints OpenAPI for the full schema reference. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("Step 1 — Setting "),
                createVNode("code", null, "IsSingleAuthorization"),
                createTextVNode(" and "),
                createVNode("code", null, "AuthorizationExpirationDateTime"),
                createTextVNode(" in the PAR Request")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When submitting the Pushed Authorization Request (PAR), the TPP MUST set "),
                  createVNode("code", null, "IsSingleAuthorization"),
                  createTextVNode(" inside "),
                  createVNode("code", null, "authorization_details[].consent"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "true"),
                    createTextVNode(" — only a single authorizer is supported for the payment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "false"),
                    createTextVNode(" — multiple authorizers are supported (multi-authorization enabled).")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When "),
                  createVNode("code", null, "IsSingleAuthorization"),
                  createTextVNode(" is "),
                  createVNode("code", null, "false"),
                  createTextVNode(", the TPP SHOULD also set "),
                  createVNode("code", null, "AuthorizationExpirationDateTime"),
                  createTextVNode(" inside "),
                  createVNode("code", null, "authorization_details[].consent"),
                  createTextVNode(". This field represents the deadline by which "),
                  createVNode("strong", null, "all"),
                  createTextVNode(" remaining authorizers must have acted — that is, the consent MUST reach "),
                  createVNode("code", null, "Status=Authorized"),
                  createTextVNode(" before this time, otherwise the consent transitions to rejected/expired. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "AuthorizationExpirationDateTime"),
                    createTextVNode(" MUST NOT be after "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("When "),
                    createVNode("code", null, "IsSingleAuthorization"),
                    createTextVNode(" is "),
                    createVNode("code", null, "true"),
                    createTextVNode(", TPPs SHOULD NOT include "),
                    createVNode("code", null, "AuthorizationExpirationDateTime"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" These fields are carried in the Rich Authorization Request ("),
                    createVNode("code", null, "authorization_details[].consent.IsSingleAuthorization"),
                    createTextVNode(", "),
                    createVNode("code", null, "authorization_details[].consent.AuthorizationExpirationDateTime"),
                    createTextVNode("). See the Authorization Endpoints OpenAPI for the full schema reference. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi-behavior",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "LFI Behaviour",
        title: "LFI behavior",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="ed-doc__subhead" data-v-4b9658c2${_scopeId}>Step 2 — Account selection based on authorization type</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before showing eligible accounts during the consent journey, the LFI checks <code data-v-4b9658c2${_scopeId2}>IsSingleAuthorization</code> from the PAR request: `);
                } else {
                  return [
                    createTextVNode(" Before showing eligible accounts during the consent journey, the LFI checks "),
                    createVNode("code", null, "IsSingleAuthorization"),
                    createTextVNode(" from the PAR request: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}>If <code data-v-4b9658c2${_scopeId2}>true</code>: allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error.</li><li data-v-4b9658c2${_scopeId2}>If <code data-v-4b9658c2${_scopeId2}>false</code>: allow selection from accounts that require either single or multiple authorizers.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("If "),
                      createVNode("code", null, "true"),
                      createTextVNode(": allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("If "),
                      createVNode("code", null, "false"),
                      createTextVNode(": allow selection from accounts that require either single or multiple authorizers.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-4b9658c2${_scopeId}>Step 3 — Managing the authorization flow</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`After the first user authorizes, the LFI must:`);
                } else {
                  return [
                    createTextVNode("After the first user authorizes, the LFI must:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>Inform OFH of required authorizers</strong> by PATCHing the consent to include <code data-v-4b9658c2${_scopeId2}>Meta.MultipleAuthorizers</code>.</li><li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>Keep consent status as <code data-v-4b9658c2${_scopeId2}>AwaitingAuthorization</code></strong> — do <strong data-v-4b9658c2${_scopeId2}>not</strong> set <code data-v-4b9658c2${_scopeId2}>Status=Authorized</code> yet.</li><li data-v-4b9658c2${_scopeId2}><strong data-v-4b9658c2${_scopeId2}>Redirect back to the TPP</strong> via <code data-v-4b9658c2${_scopeId2}>/doConfirm</code> once the PATCH is accepted.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Inform OFH of required authorizers"),
                      createTextVNode(" by PATCHing the consent to include "),
                      createVNode("code", null, "Meta.MultipleAuthorizers"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Keep consent status as "),
                        createVNode("code", null, "AwaitingAuthorization")
                      ]),
                      createTextVNode(" — do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" set "),
                      createVNode("code", null, "Status=Authorized"),
                      createTextVNode(" yet.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Redirect back to the TPP"),
                      createTextVNode(" via "),
                      createVNode("code", null, "/doConfirm"),
                      createTextVNode(" once the PATCH is accepted.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Example PATCH <code data-v-4b9658c2${_scopeId2}>consents/{consentId}</code> body after first authorizer (still awaiting others): `);
                } else {
                  return [
                    createTextVNode(" Example PATCH "),
                    createVNode("code", null, "consents/{consentId}"),
                    createTextVNode(" body after first authorizer (still awaiting others): ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchFirstAuthorizerExample,
              lang: "json",
              filename: "PATCH consents/{consentId}"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP receives the redirect/callback, exchanges the authorization code at <code data-v-4b9658c2${_scopeId2}>/token</code>, and receives an access token <strong data-v-4b9658c2${_scopeId2}>plus</strong> the consent object still marked <code data-v-4b9658c2${_scopeId2}>AwaitingAuthorization</code>, including the <code data-v-4b9658c2${_scopeId2}>Meta.MultipleAuthorizers</code> structure above. `);
                } else {
                  return [
                    createTextVNode(" The TPP receives the redirect/callback, exchanges the authorization code at "),
                    createVNode("code", null, "/token"),
                    createTextVNode(", and receives an access token "),
                    createVNode("strong", null, "plus"),
                    createTextVNode(" the consent object still marked "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", including the "),
                    createVNode("code", null, "Meta.MultipleAuthorizers"),
                    createTextVNode(" structure above. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 2 — Account selection based on authorization type"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before showing eligible accounts during the consent journey, the LFI checks "),
                  createVNode("code", null, "IsSingleAuthorization"),
                  createTextVNode(" from the PAR request: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("If "),
                    createVNode("code", null, "true"),
                    createTextVNode(": allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("If "),
                    createVNode("code", null, "false"),
                    createTextVNode(": allow selection from accounts that require either single or multiple authorizers.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 3 — Managing the authorization flow"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("After the first user authorizes, the LFI must:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Inform OFH of required authorizers"),
                    createTextVNode(" by PATCHing the consent to include "),
                    createVNode("code", null, "Meta.MultipleAuthorizers"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Keep consent status as "),
                      createVNode("code", null, "AwaitingAuthorization")
                    ]),
                    createTextVNode(" — do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" set "),
                    createVNode("code", null, "Status=Authorized"),
                    createTextVNode(" yet.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Redirect back to the TPP"),
                    createTextVNode(" via "),
                    createVNode("code", null, "/doConfirm"),
                    createTextVNode(" once the PATCH is accepted.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Example PATCH "),
                  createVNode("code", null, "consents/{consentId}"),
                  createTextVNode(" body after first authorizer (still awaiting others): ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: patchFirstAuthorizerExample,
                lang: "json",
                filename: "PATCH consents/{consentId}"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP receives the redirect/callback, exchanges the authorization code at "),
                  createVNode("code", null, "/token"),
                  createTextVNode(", and receives an access token "),
                  createVNode("strong", null, "plus"),
                  createTextVNode(" the consent object still marked "),
                  createVNode("code", null, "AwaitingAuthorization"),
                  createTextVNode(", including the "),
                  createVNode("code", null, "Meta.MultipleAuthorizers"),
                  createTextVNode(" structure above. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "tracking-additional-authorizations",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Tracking",
        title: "Tracking additional authorizations",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="ed-doc__subhead" data-v-4b9658c2${_scopeId}>Step 4 — Updating consent status after each authorization</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The LFI must PATCH the consent after each additional authorization to reflect progress:`);
                } else {
                  return [
                    createTextVNode("The LFI must PATCH the consent after each additional authorization to reflect progress:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}>If any required authorizer rejects → set <code data-v-4b9658c2${_scopeId2}>Status=Rejected</code>.</li><li data-v-4b9658c2${_scopeId2}>When all required authorizers approve → set <code data-v-4b9658c2${_scopeId2}>Status=Authorized</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("If any required authorizer rejects → set "),
                      createVNode("code", null, "Status=Rejected"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("When all required authorizers approve → set "),
                      createVNode("code", null, "Status=Authorized"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-4b9658c2${_scopeId}>Example: one authorizer approved, another still pending</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchOneApprovedExample,
              lang: "json",
              filename: "one approved, one pending"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-4b9658c2${_scopeId}>Example: final approval — consent becomes Authorized</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchFinalApprovalExample,
              lang: "json",
              filename: "final approval"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-4b9658c2${_scopeId}>Example: a required authorizer rejects — consent becomes Rejected</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchRejectedExample,
              lang: "json",
              filename: "authorizer rejects"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 4 — Updating consent status after each authorization"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The LFI must PATCH the consent after each additional authorization to reflect progress:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("If any required authorizer rejects → set "),
                    createVNode("code", null, "Status=Rejected"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("When all required authorizers approve → set "),
                    createVNode("code", null, "Status=Authorized"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example: one authorizer approved, another still pending"),
              createVNode(_component_EdCode, {
                code: patchOneApprovedExample,
                lang: "json",
                filename: "one approved, one pending"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example: final approval — consent becomes Authorized"),
              createVNode(_component_EdCode, {
                code: patchFinalApprovalExample,
                lang: "json",
                filename: "final approval"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example: a required authorizer rejects — consent becomes Rejected"),
              createVNode(_component_EdCode, {
                code: patchRejectedExample,
                lang: "json",
                filename: "authorizer rejects"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-status-and-payment-initiation",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Payment Initiation",
        title: "Consent status and payment initiation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="ed-doc__subhead" data-v-4b9658c2${_scopeId}>Step 5 — Initiating the payment</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4b9658c2${_scopeId2}>The TPP MAY initiate the payment only after <code data-v-4b9658c2${_scopeId2}>Status=Authorized</code>.</li><li data-v-4b9658c2${_scopeId2}>Additional authorizers must act before <code data-v-4b9658c2${_scopeId2}>AuthorizationExpirationDateTime</code> if set, otherwise before <code data-v-4b9658c2${_scopeId2}>ExpirationDateTime</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("The TPP MAY initiate the payment only after "),
                      createVNode("code", null, "Status=Authorized"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Additional authorizers must act before "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" if set, otherwise before "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Tracking consent status"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4b9658c2${_scopeId2}>TPPs can monitor progress by:</p><ul data-v-4b9658c2${_scopeId2}><li data-v-4b9658c2${_scopeId2}>Subscribing to event notifications; or</li><li data-v-4b9658c2${_scopeId2}> Polling <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint" data-v-4b9658c2${_scopeId2}><span class="http-method http-method--get" data-v-4b9658c2${_scopeId2}>GET</span><code data-v-4b9658c2${_scopeId2}>/payment-consents/{ConsentId}</code></a>. </li></ul>`);
                } else {
                  return [
                    createVNode("p", null, "TPPs can monitor progress by:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Subscribing to event notifications; or"),
                      createVNode("li", null, [
                        createTextVNode(" Polling "),
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payment-consents/{ConsentId}")
                        ]),
                        createTextVNode(". ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the consent is <code data-v-4b9658c2${_scopeId2}>Authorized</code>, the TPP can exchange the refresh token for a new access token via <a href="/tech/tpp-standards/security/tokens/" data-v-4b9658c2${_scopeId2}><code data-v-4b9658c2${_scopeId2}>/token</code></a> and proceed to initiate the payment. `);
                } else {
                  return [
                    createTextVNode(" Once the consent is "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(", the TPP can exchange the refresh token for a new access token via "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, [
                      createVNode("code", null, "/token")
                    ]),
                    createTextVNode(" and proceed to initiate the payment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 5 — Initiating the payment"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("The TPP MAY initiate the payment only after "),
                    createVNode("code", null, "Status=Authorized"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Additional authorizers must act before "),
                    createVNode("code", null, "AuthorizationExpirationDateTime"),
                    createTextVNode(" if set, otherwise before "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Tracking consent status"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "TPPs can monitor progress by:"),
                  createVNode("ul", null, [
                    createVNode("li", null, "Subscribing to event notifications; or"),
                    createVNode("li", null, [
                      createTextVNode(" Polling "),
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payment-consents/{ConsentId}")
                      ]),
                      createTextVNode(". ")
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the consent is "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(", the TPP can exchange the refresh token for a new access token via "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, [
                    createVNode("code", null, "/token")
                  ]),
                  createTextVNode(" and proceed to initiate the payment. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const multiAuthorization = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b9658c2"]]);
export {
  multiAuthorization as default
};
