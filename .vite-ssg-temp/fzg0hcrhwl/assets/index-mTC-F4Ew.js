import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const accessTokenRequest = `GET /open-finance/v2.1/accounts HTTP/1.1
Authorization: Bearer <access_token>`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a486c484><section class="ed-doc__hero" data-v-a486c484><div class="ed-doc__inner" data-v-a486c484><div class="ed-doc__eyebrow" data-v-a486c484><span class="ed-doc__eyebrow-dash" data-v-a486c484></span> Security · OAuth 2.0 · Bearer tokens </div><h1 class="ed-doc__title" data-v-a486c484> Tokens <span class="ed-doc__read" data-v-a486c484>2 min read</span></h1><p class="ed-doc__lede" data-v-a486c484> In UAE Open Finance, your application uses two types of OAuth 2.0 bearer tokens to make API calls on behalf of a consenting customer. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "At a glance",
        title: "Two tokens, two lifetimes",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-a486c484${_scopeId2}><thead data-v-a486c484${_scopeId2}><tr data-v-a486c484${_scopeId2}><th data-v-a486c484${_scopeId2}>Token</th><th data-v-a486c484${_scopeId2}>Purpose</th><th data-v-a486c484${_scopeId2}>Lifetime</th></tr></thead><tbody data-v-a486c484${_scopeId2}><tr data-v-a486c484${_scopeId2}><td data-v-a486c484${_scopeId2}><strong data-v-a486c484${_scopeId2}>Access token</strong></td><td data-v-a486c484${_scopeId2}>Authorises individual API requests</td><td data-v-a486c484${_scopeId2}>10 minutes</td></tr><tr data-v-a486c484${_scopeId2}><td data-v-a486c484${_scopeId2}><strong data-v-a486c484${_scopeId2}>Refresh token</strong></td><td data-v-a486c484${_scopeId2}>Obtains new access tokens without re-authorising the customer</td><td data-v-a486c484${_scopeId2}>Duration of the consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Token"),
                          createVNode("th", null, "Purpose"),
                          createVNode("th", null, "Lifetime")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Access token")
                          ]),
                          createVNode("td", null, "Authorises individual API requests"),
                          createVNode("td", null, "10 minutes")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Refresh token")
                          ]),
                          createVNode("td", null, "Obtains new access tokens without re-authorising the customer"),
                          createVNode("td", null, "Duration of the consent")
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
                        createVNode("th", null, "Token"),
                        createVNode("th", null, "Purpose"),
                        createVNode("th", null, "Lifetime")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Access token")
                        ]),
                        createVNode("td", null, "Authorises individual API requests"),
                        createVNode("td", null, "10 minutes")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Refresh token")
                        ]),
                        createVNode("td", null, "Obtains new access tokens without re-authorising the customer"),
                        createVNode("td", null, "Duration of the consent")
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
        id: "access-tokens",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Access Tokens",
        title: "Short-lived credentials presented on every API request",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` An <strong data-v-a486c484${_scopeId2}>access token</strong> is a short-lived credential that your application includes in the <code data-v-a486c484${_scopeId2}>Authorization</code> header of every protected API call: `);
                } else {
                  return [
                    createTextVNode(" An "),
                    createVNode("strong", null, "access token"),
                    createTextVNode(" is a short-lived credential that your application includes in the "),
                    createVNode("code", null, "Authorization"),
                    createTextVNode(" header of every protected API call: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: accessTokenRequest,
              lang: "http",
              filename: "HTTP request"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Access tokens expire after <strong data-v-a486c484${_scopeId2}>10 minutes</strong>. Once expired, any API call using that token will receive a <code data-v-a486c484${_scopeId2}>401 Unauthorized</code> response. Your application must silently refresh the access token using the refresh token before retrying. `);
                } else {
                  return [
                    createTextVNode(" Access tokens expire after "),
                    createVNode("strong", null, "10 minutes"),
                    createTextVNode(". Once expired, any API call using that token will receive a "),
                    createVNode("code", null, "401 Unauthorized"),
                    createTextVNode(" response. Your application must silently refresh the access token using the refresh token before retrying. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Token expiry handling"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-a486c484${_scopeId2}> Check the <code data-v-a486c484${_scopeId2}>expires_in</code> field returned by the <code data-v-a486c484${_scopeId2}>/token</code> endpoint (value: <code data-v-a486c484${_scopeId2}>600</code> seconds). Track the issue time and proactively refresh before the window closes rather than waiting for a 401. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Check the "),
                      createVNode("code", null, "expires_in"),
                      createTextVNode(" field returned by the "),
                      createVNode("code", null, "/token"),
                      createTextVNode(" endpoint (value: "),
                      createVNode("code", null, "600"),
                      createTextVNode(" seconds). Track the issue time and proactively refresh before the window closes rather than waiting for a 401. ")
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
                  createTextVNode(" An "),
                  createVNode("strong", null, "access token"),
                  createTextVNode(" is a short-lived credential that your application includes in the "),
                  createVNode("code", null, "Authorization"),
                  createTextVNode(" header of every protected API call: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: accessTokenRequest,
                lang: "http",
                filename: "HTTP request"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Access tokens expire after "),
                  createVNode("strong", null, "10 minutes"),
                  createTextVNode(". Once expired, any API call using that token will receive a "),
                  createVNode("code", null, "401 Unauthorized"),
                  createTextVNode(" response. Your application must silently refresh the access token using the refresh token before retrying. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Token expiry handling"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Check the "),
                    createVNode("code", null, "expires_in"),
                    createTextVNode(" field returned by the "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" endpoint (value: "),
                    createVNode("code", null, "600"),
                    createTextVNode(" seconds). Track the issue time and proactively refresh before the window closes rather than waiting for a 401. ")
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
        id: "refresh-tokens",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Refresh Tokens",
        title: "Renewing access without re-authorising the customer",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A <strong data-v-a486c484${_scopeId2}>refresh token</strong> allows your application to obtain a new access token without prompting the customer to re-authorise. It is issued alongside the access token during the authorisation code exchange. `);
                } else {
                  return [
                    createTextVNode(" A "),
                    createVNode("strong", null, "refresh token"),
                    createTextVNode(" allows your application to obtain a new access token without prompting the customer to re-authorise. It is issued alongside the access token during the authorisation code exchange. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The refresh token remains valid for the <strong data-v-a486c484${_scopeId2}>lifetime of the consent</strong>. Once the consent expires — determined by its <code data-v-a486c484${_scopeId2}>ExpirationDateTime</code> — the refresh token is also invalidated and the customer must re-authorise. `);
                } else {
                  return [
                    createTextVNode(" The refresh token remains valid for the "),
                    createVNode("strong", null, "lifetime of the consent"),
                    createTextVNode(". Once the consent expires — determined by its "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" — the refresh token is also invalidated and the customer must re-authorise. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Consent lifetime"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-a486c484${_scopeId2}> The <code data-v-a486c484${_scopeId2}>ExpirationDateTime</code> is set when the consent resource is created and returned in the consent response object. See the <a href="/tech/tpp-standards/v2.1/consent/api-guide" data-v-a486c484${_scopeId2}>Consent API Guide</a> for details on consent lifecycle and expiry. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" is set when the consent resource is created and returned in the consent response object. See the "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent API Guide"),
                      createTextVNode(" for details on consent lifecycle and expiry. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To exchange a refresh token for a new access token, POST to the <code data-v-a486c484${_scopeId2}>/token</code> endpoint with <code data-v-a486c484${_scopeId2}>grant_type=refresh_token</code> and a freshly signed <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-a486c484${_scopeId2}>client assertion</a>. `);
                } else {
                  return [
                    createTextVNode(" To exchange a refresh token for a new access token, POST to the "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" endpoint with "),
                    createVNode("code", null, "grant_type=refresh_token"),
                    createTextVNode(" and a freshly signed "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "client assertion"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/tpp-standards/security/tokens/open-api/token" data-v-a486c484${_scopeId2}>Token endpoint API Reference</a> for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "Token endpoint API Reference"),
                    createTextVNode(" for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A "),
                  createVNode("strong", null, "refresh token"),
                  createTextVNode(" allows your application to obtain a new access token without prompting the customer to re-authorise. It is issued alongside the access token during the authorisation code exchange. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The refresh token remains valid for the "),
                  createVNode("strong", null, "lifetime of the consent"),
                  createTextVNode(". Once the consent expires — determined by its "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(" — the refresh token is also invalidated and the customer must re-authorise. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Consent lifetime"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" is set when the consent resource is created and returned in the consent response object. See the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent API Guide"),
                    createTextVNode(" for details on consent lifecycle and expiry. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To exchange a refresh token for a new access token, POST to the "),
                  createVNode("code", null, "/token"),
                  createTextVNode(" endpoint with "),
                  createVNode("code", null, "grant_type=refresh_token"),
                  createTextVNode(" and a freshly signed "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "client assertion"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "Token endpoint API Reference"),
                  createTextVNode(" for the full request and response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="ed-doc__contents" data-v-a486c484><div class="ed-doc__inner" data-v-a486c484><div class="ed-doc__contents-head" data-v-a486c484><div class="ed-doc__contents-eyebrow" data-v-a486c484><span class="ed-doc__eyebrow-dash" data-v-a486c484></span> Section contents </div><h2 class="ed-doc__contents-title" data-v-a486c484>Browse this section</h2><p class="ed-doc__contents-sub" data-v-a486c484>The full set of pages covering tokens and client assertions in UAE Open Finance.</p></div><div class="ed-doc__contents-grid" data-v-a486c484><a class="ed-link-card" href="/tech/tpp-standards/security/tokens/client-assertion" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-a486c484><span class="ed-link-card__top" data-v-a486c484></span><div class="ed-link-card__meta" data-v-a486c484><span class="ed-link-card__cat" data-v-a486c484>Page</span></div><h3 class="ed-link-card__title" data-v-a486c484>Preparing Client Assertion</h3><p class="ed-link-card__desc" data-v-a486c484>How to construct and sign the JWT used to authenticate your application at <code data-v-a486c484>/par</code> and <code data-v-a486c484>/token</code>.</p><div class="ed-link-card__foot" data-v-a486c484><span class="ed-link-card__cta" data-v-a486c484>Open</span><span class="ed-link-card__arrow" data-v-a486c484>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/tokens/open-api/token" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-a486c484><span class="ed-link-card__top" data-v-a486c484></span><div class="ed-link-card__meta" data-v-a486c484><span class="ed-link-card__cat" data-v-a486c484>Endpoint</span><span class="http-badge http-post" data-v-a486c484>POST</span><code class="ed-link-card__path" data-v-a486c484>/token</code></div><h3 class="ed-link-card__title" data-v-a486c484>Create an Access Token</h3><p class="ed-link-card__desc" data-v-a486c484>OpenAPI reference for the <span class="endpoint" data-v-a486c484><span class="http-method http-method--post" data-v-a486c484>POST</span><code data-v-a486c484>/token</code></span> endpoint — authorization code exchange, refresh token grant, and the consent object returned in the response.</p><div class="ed-link-card__foot" data-v-a486c484><span class="ed-link-card__cta" data-v-a486c484>Open spec</span><span class="ed-link-card__arrow" data-v-a486c484>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/tokens/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a486c484"]]);
export {
  index as default
};
