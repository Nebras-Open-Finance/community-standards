import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const requestJwtSample = `{
  "aud": "https://auth1.[LFICode].apihub.openfinance.ae",
  "iss": "your-client-id",
  "client_id": "your-client-id",
  "scope": "accounts openid",
  "redirect_uri": "https://yourapp.com/callback",
  "response_type": "code",
  "code_challenge_method": "S256",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:account-access-consent:v2.1",
      "consent": { "..." : "..." }
    }
  ]
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scopes",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-f48b1c5d><section class="ed-doc__hero" data-v-f48b1c5d><div class="ed-doc__inner" data-v-f48b1c5d><div class="ed-doc__eyebrow" data-v-f48b1c5d><span class="ed-doc__eyebrow-dash" data-v-f48b1c5d></span> Security · OAuth 2.0 · Scopes </div><h1 class="ed-doc__title" data-v-f48b1c5d> OAuth 2.0 Scopes <span class="ed-doc__read" data-v-f48b1c5d>2 min read</span></h1><p class="ed-doc__lede" data-v-f48b1c5d> Scopes define what your application is requesting permission to do on behalf of the user. They are declared in the <code data-v-f48b1c5d>scope</code> field of your <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-f48b1c5d>Request JWT</a> and echoed back in the access token issued by the Authorization Server. </p><p class="ed-doc__lede" data-v-f48b1c5d> In UAE Open Finance, scopes are <strong data-v-f48b1c5d>consent-bound</strong> — the scope alone does not grant access. The <code data-v-f48b1c5d>authorization_details</code> in your request object describes the specific consent (account access permissions, payment details, etc.), and the scope indicates which API family the consent belongs to. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "available-scopes",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Available Scopes",
        title: "The four scopes recognised by the Authorization Server",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f48b1c5d${_scopeId2}><thead data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><th data-v-f48b1c5d${_scopeId2}>Scope</th><th data-v-f48b1c5d${_scopeId2}>API</th><th data-v-f48b1c5d${_scopeId2}>Description</th></tr></thead><tbody data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>openid</code></td><td data-v-f48b1c5d${_scopeId2}>All</td><td data-v-f48b1c5d${_scopeId2}>Activates OpenID Connect support. Required on every request — enables the Authorization Server to return an ID Token alongside the access token</td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>accounts</code></td><td data-v-f48b1c5d${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" data-v-f48b1c5d${_scopeId2}>Bank Data Sharing</a></td><td data-v-f48b1c5d${_scopeId2}>Grants access to account information APIs (<code data-v-f48b1c5d${_scopeId2}>/accounts</code>, <code data-v-f48b1c5d${_scopeId2}>/balances</code>, <code data-v-f48b1c5d${_scopeId2}>/transactions</code>, etc.). The access token is bound to the <code data-v-f48b1c5d${_scopeId2}>account-access-consent</code> from <code data-v-f48b1c5d${_scopeId2}>authorization_details</code></td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>payments</code></td><td data-v-f48b1c5d${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" data-v-f48b1c5d${_scopeId2}>Service Initiation</a></td><td data-v-f48b1c5d${_scopeId2}>Grants access to payment initiation APIs (<code data-v-f48b1c5d${_scopeId2}>/payments</code>). The access token is bound to the payment consent from <code data-v-f48b1c5d${_scopeId2}>authorization_details</code>. Also grants read access to account information required for payment context</td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>products</code></td><td data-v-f48b1c5d${_scopeId2}>Products &amp; Leads</td><td data-v-f48b1c5d${_scopeId2}>Grants access to product discovery and leads APIs. Does not require a user consent flow</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Scope"),
                          createVNode("th", null, "API"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "openid")
                          ]),
                          createVNode("td", null, "All"),
                          createVNode("td", null, "Activates OpenID Connect support. Required on every request — enables the Authorization Server to return an ID Token alongside the access token")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accounts")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Grants access to account information APIs ("),
                            createVNode("code", null, "/accounts"),
                            createTextVNode(", "),
                            createVNode("code", null, "/balances"),
                            createTextVNode(", "),
                            createVNode("code", null, "/transactions"),
                            createTextVNode(", etc.). The access token is bound to the "),
                            createVNode("code", null, "account-access-consent"),
                            createTextVNode(" from "),
                            createVNode("code", null, "authorization_details")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "payments")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Service Initiation")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Grants access to payment initiation APIs ("),
                            createVNode("code", null, "/payments"),
                            createTextVNode("). The access token is bound to the payment consent from "),
                            createVNode("code", null, "authorization_details"),
                            createTextVNode(". Also grants read access to account information required for payment context")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "products")
                          ]),
                          createVNode("td", null, "Products & Leads"),
                          createVNode("td", null, "Grants access to product discovery and leads APIs. Does not require a user consent flow")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Scope"),
                        createVNode("th", null, "API"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "openid")
                        ]),
                        createVNode("td", null, "All"),
                        createVNode("td", null, "Activates OpenID Connect support. Required on every request — enables the Authorization Server to return an ID Token alongside the access token")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accounts")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Grants access to account information APIs ("),
                          createVNode("code", null, "/accounts"),
                          createTextVNode(", "),
                          createVNode("code", null, "/balances"),
                          createTextVNode(", "),
                          createVNode("code", null, "/transactions"),
                          createTextVNode(", etc.). The access token is bound to the "),
                          createVNode("code", null, "account-access-consent"),
                          createTextVNode(" from "),
                          createVNode("code", null, "authorization_details")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "payments")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Service Initiation")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Grants access to payment initiation APIs ("),
                          createVNode("code", null, "/payments"),
                          createTextVNode("). The access token is bound to the payment consent from "),
                          createVNode("code", null, "authorization_details"),
                          createTextVNode(". Also grants read access to account information required for payment context")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "products")
                        ]),
                        createVNode("td", null, "Products & Leads"),
                        createVNode("td", null, "Grants access to product discovery and leads APIs. Does not require a user consent flow")
                      ])
                    ])
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
        id: "combining-scopes",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Combining Scopes",
        title: "Space-separated values in the scope field",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Scopes are space-separated in the <code data-v-f48b1c5d${_scopeId2}>scope</code> field. Always include <code data-v-f48b1c5d${_scopeId2}>openid</code>. `);
                } else {
                  return [
                    createTextVNode(" Scopes are space-separated in the "),
                    createVNode("code", null, "scope"),
                    createTextVNode(" field. Always include "),
                    createVNode("code", null, "openid"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f48b1c5d${_scopeId2}><thead data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><th data-v-f48b1c5d${_scopeId2}>Use Case</th><th data-v-f48b1c5d${_scopeId2}>Scope Value</th></tr></thead><tbody data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}>Bank Data Sharing</td><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>accounts openid</code></td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}>Payment Initiation</td><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>payments openid</code></td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}>Products (public data)</td><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>products openid</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Use Case"),
                          createVNode("th", null, "Scope Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Data Sharing"),
                          createVNode("td", null, [
                            createVNode("code", null, "accounts openid")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Payment Initiation"),
                          createVNode("td", null, [
                            createVNode("code", null, "payments openid")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Products (public data)"),
                          createVNode("td", null, [
                            createVNode("code", null, "products openid")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Consent-bound access tokens"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-f48b1c5d${_scopeId2}> For <code data-v-f48b1c5d${_scopeId2}>accounts</code> and <code data-v-f48b1c5d${_scopeId2}>payments</code>, the access token issued by the Authorization Server is cryptographically bound to the specific consent created in your <code data-v-f48b1c5d${_scopeId2}>authorization_details</code>. The token cannot be used to access resources outside that consent&#39;s permissions. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" For "),
                      createVNode("code", null, "accounts"),
                      createTextVNode(" and "),
                      createVNode("code", null, "payments"),
                      createTextVNode(", the access token issued by the Authorization Server is cryptographically bound to the specific consent created in your "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(". The token cannot be used to access resources outside that consent's permissions. ")
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
                  createTextVNode(" Scopes are space-separated in the "),
                  createVNode("code", null, "scope"),
                  createTextVNode(" field. Always include "),
                  createVNode("code", null, "openid"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Use Case"),
                        createVNode("th", null, "Scope Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Data Sharing"),
                        createVNode("td", null, [
                          createVNode("code", null, "accounts openid")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Payment Initiation"),
                        createVNode("td", null, [
                          createVNode("code", null, "payments openid")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Products (public data)"),
                        createVNode("td", null, [
                          createVNode("code", null, "products openid")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Consent-bound access tokens"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" For "),
                    createVNode("code", null, "accounts"),
                    createTextVNode(" and "),
                    createVNode("code", null, "payments"),
                    createTextVNode(", the access token issued by the Authorization Server is cryptographically bound to the specific consent created in your "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(". The token cannot be used to access resources outside that consent's permissions. ")
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
        id: "using-scopes",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Using Scopes in the Request JWT",
        title: "Declared in the scope claim of the JWT payload",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: requestJwtSample,
              lang: "json",
              filename: "Request JWT (excerpt)"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: requestJwtSample,
                lang: "json",
                filename: "Request JWT (excerpt)"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "validation-errors",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Scope Validation Errors",
        title: "Errors returned when a scope is unknown or inconsistent",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the <code data-v-f48b1c5d${_scopeId2}>authorization_details</code> type, the Authorization Server will reject the request with: `);
                } else {
                  return [
                    createTextVNode(" If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" type, the Authorization Server will reject the request with: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f48b1c5d${_scopeId2}><thead data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><th data-v-f48b1c5d${_scopeId2}>Error</th><th data-v-f48b1c5d${_scopeId2}>Description</th></tr></thead><tbody data-v-f48b1c5d${_scopeId2}><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>invalid_scope</code></td><td data-v-f48b1c5d${_scopeId2}>The requested scope is unknown or not supported by this Authorization Server</td></tr><tr data-v-f48b1c5d${_scopeId2}><td data-v-f48b1c5d${_scopeId2}><code data-v-f48b1c5d${_scopeId2}>AccessToken.InvalidScope</code></td><td data-v-f48b1c5d${_scopeId2}>The access token presented to a resource endpoint does not have the scope required for that operation</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Error"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "invalid_scope")
                          ]),
                          createVNode("td", null, "The requested scope is unknown or not supported by this Authorization Server")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AccessToken.InvalidScope")
                          ]),
                          createVNode("td", null, "The access token presented to a resource endpoint does not have the scope required for that operation")
                        ])
                      ])
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
                  createTextVNode(" If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" type, the Authorization Server will reject the request with: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Error"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "invalid_scope")
                        ]),
                        createVNode("td", null, "The requested scope is unknown or not supported by this Authorization Server")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AccessToken.InvalidScope")
                        ]),
                        createVNode("td", null, "The access token presented to a resource endpoint does not have the scope required for that operation")
                      ])
                    ])
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
        id: "parameterized-scopes",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Parameterized Scopes",
        title: "Tokens internally encode the consent they were granted against",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-f48b1c5d${_scopeId2}>accounts</code> and <code data-v-f48b1c5d${_scopeId2}>payments</code> scopes are described in the OpenAPI specifications as <em data-v-f48b1c5d${_scopeId2}>parameterized with the ConsentId</em>. This means the issued access token internally encodes the consent it was granted against. When presenting the token to a resource endpoint, the server validates that the requested resource falls within the permissions of the bound consent — this is handled automatically by the Authorization Server and is transparent to your application. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "accounts"),
                    createTextVNode(" and "),
                    createVNode("code", null, "payments"),
                    createTextVNode(" scopes are described in the OpenAPI specifications as "),
                    createVNode("em", null, "parameterized with the ConsentId"),
                    createTextVNode(". This means the issued access token internally encodes the consent it was granted against. When presenting the token to a resource endpoint, the server validates that the requested resource falls within the permissions of the bound consent — this is handled automatically by the Authorization Server and is transparent to your application. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "accounts"),
                  createTextVNode(" and "),
                  createVNode("code", null, "payments"),
                  createTextVNode(" scopes are described in the OpenAPI specifications as "),
                  createVNode("em", null, "parameterized with the ConsentId"),
                  createTextVNode(". This means the issued access token internally encodes the consent it was granted against. When presenting the token to a resource endpoint, the server validates that the requested resource falls within the permissions of the bound consent — this is handled automatically by the Authorization Server and is transparent to your application. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/scopes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scopes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f48b1c5d"]]);
export {
  scopes as default
};
