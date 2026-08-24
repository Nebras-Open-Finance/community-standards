import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_10 } from "./EdLifetime-CLJ-d84N.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const joseHeader = `{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}`;
const audExamples = `✅  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/token"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/par"`;
const subExamples = `✅  iss: "a1b2c3d4-...", sub: "a1b2c3d4-..."   (same client_id)
❌  iss: "a1b2c3d4-...", sub: ""               (empty)
❌  sub omitted entirely`;
const jtiExamples = `✅  jti: crypto.randomUUID()    ← fresh UUID every time
❌  jti: "fixed-string"         ← rejected on second use
❌  jti omitted`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "jwt-claims",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "two-jwts", label: "Two JWTs" },
      { id: "jose", label: "JOSE header" },
      { id: "request", label: "Request Object" },
      { id: "assertion", label: "Client Assertion" },
      { id: "comparison", label: "Comparison" },
      { id: "rejections", label: "Rejections" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "12 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["JWT", "FAPI", "PAR"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdLifetime = __unplugin_components_10;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-9623dc61>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "JWT Claim Rules — Request Object and Client Assertion",
        meta,
        lede: "UAE Open Finance requires <strong>two distinct signed JWTs</strong> in every authorization flow. Their claim rules differ in ways that are easy to confuse. This page is the single authoritative reference for both."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-9623dc61${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-9623dc61${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "two-jwts",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Two JWTs",
        title: "Same endpoint, two different JWTs",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>JWT</th><th data-v-9623dc61${_scopeId2}>Sent to</th><th data-v-9623dc61${_scopeId2}>Purpose</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>Request Object</strong> (JAR)</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>/par</code> as <code data-v-9623dc61${_scopeId2}>request=</code></td><td data-v-9623dc61${_scopeId2}>Carries all authorization parameters in a tamper-proof, signed envelope</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>Client Assertion</strong></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>/par</code> and <code data-v-9623dc61${_scopeId2}>/token</code> as <code data-v-9623dc61${_scopeId2}>client_assertion=</code></td><td data-v-9623dc61${_scopeId2}>Proves your application&#39;s identity to the Authorization Server — replaces a client secret</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "JWT"),
                          createVNode("th", null, "Sent to"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Request Object"),
                            createTextVNode(" (JAR)")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/par"),
                            createTextVNode(" as "),
                            createVNode("code", null, "request=")
                          ]),
                          createVNode("td", null, "Carries all authorization parameters in a tamper-proof, signed envelope")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Client Assertion")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/par"),
                            createTextVNode(" and "),
                            createVNode("code", null, "/token"),
                            createTextVNode(" as "),
                            createVNode("code", null, "client_assertion=")
                          ]),
                          createVNode("td", null, "Proves your application's identity to the Authorization Server — replaces a client secret")
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
              title: "Same endpoint, two different JWTs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9623dc61${_scopeId2}> Both JWTs are sent to <code data-v-9623dc61${_scopeId2}>/par</code> in the same request, but they serve entirely separate purposes. Mixing up their claim rules — particularly <code data-v-9623dc61${_scopeId2}>jti</code> and <code data-v-9623dc61${_scopeId2}>sub</code> — is the most common source of <code data-v-9623dc61${_scopeId2}>400 Bad Request</code> errors. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Both JWTs are sent to "),
                      createVNode("code", null, "/par"),
                      createTextVNode(" in the same request, but they serve entirely separate purposes. Mixing up their claim rules — particularly "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" and "),
                      createVNode("code", null, "sub"),
                      createTextVNode(" — is the most common source of "),
                      createVNode("code", null, "400 Bad Request"),
                      createTextVNode(" errors. ")
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
                        createVNode("th", null, "JWT"),
                        createVNode("th", null, "Sent to"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Request Object"),
                          createTextVNode(" (JAR)")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/par"),
                          createTextVNode(" as "),
                          createVNode("code", null, "request=")
                        ]),
                        createVNode("td", null, "Carries all authorization parameters in a tamper-proof, signed envelope")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Client Assertion")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/par"),
                          createTextVNode(" and "),
                          createVNode("code", null, "/token"),
                          createTextVNode(" as "),
                          createVNode("code", null, "client_assertion=")
                        ]),
                        createVNode("td", null, "Proves your application's identity to the Authorization Server — replaces a client secret")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Same endpoint, two different JWTs"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Both JWTs are sent to "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" in the same request, but they serve entirely separate purposes. Mixing up their claim rules — particularly "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" — is the most common source of "),
                    createVNode("code", null, "400 Bad Request"),
                    createTextVNode(" errors. ")
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
        id: "jose",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "JOSE Header",
        title: "The header is identical for both JWTs",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: joseHeader,
              lang: "json",
              filename: "JOSE header"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>Field</th><th data-v-9623dc61${_scopeId2}>Rule</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>alg</code></td><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>Must be <code data-v-9623dc61${_scopeId2}>PS256</code></strong> — the only algorithm accepted in the UAE Open Finance FAPI profile</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>kid</code></td><td data-v-9623dc61${_scopeId2}>The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>typ</code></td><td data-v-9623dc61${_scopeId2}>Optional. Not required by the profile</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Rule")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "alg")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createTextVNode("Must be "),
                              createVNode("code", null, "PS256")
                            ]),
                            createTextVNode(" — the only algorithm accepted in the UAE Open Finance FAPI profile")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid")
                          ]),
                          createVNode("td", null, "The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "typ")
                          ]),
                          createVNode("td", null, "Optional. Not required by the profile")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "No algorithm flexibility"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9623dc61${_scopeId2}> ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be rejected. </p>`);
                } else {
                  return [
                    createVNode("p", null, " ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be rejected. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: joseHeader,
                lang: "json",
                filename: "JOSE header"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Rule")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "alg")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "PS256")
                          ]),
                          createTextVNode(" — the only algorithm accepted in the UAE Open Finance FAPI profile")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid")
                        ]),
                        createVNode("td", null, "The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "typ")
                        ]),
                        createVNode("td", null, "Optional. Not required by the profile")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "No algorithm flexibility"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be rejected. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "request",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Request Object (JAR)",
        title: "Claims for the request= JWT",
        lede: "The Request Object is a signed JWT whose payload contains all <code>/par</code> authorization parameters. It is sent as the <code>request</code> form parameter.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9623dc61${_scopeId}>Claims</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>Claim</th><th data-v-9623dc61${_scopeId2}>Type</th><th data-v-9623dc61${_scopeId2}>Required</th><th data-v-9623dc61${_scopeId2}>Rule</th><th data-v-9623dc61${_scopeId2}>Example</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>aud</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>The Authorization Server&#39;s <code data-v-9623dc61${_scopeId2}>issuer</code> value</strong> — from the LFI&#39;s <code data-v-9623dc61${_scopeId2}>.well-known/openid-configuration</code>. This is not the token endpoint URL.</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>iss</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Your application&#39;s <code data-v-9623dc61${_scopeId2}>client_id</code> from the Trust Framework</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>a1b2c3d4-5678-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>client_id</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Same value as <code data-v-9623dc61${_scopeId2}>iss</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>a1b2c3d4-5678-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>iat</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Issued At Unix timestamp — when the JWT was created</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196113</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>exp</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Unix timestamp. Must be <strong data-v-9623dc61${_scopeId2}>no more than 10 minutes after <code data-v-9623dc61${_scopeId2}>nbf</code></strong>. Recommended: <code data-v-9623dc61${_scopeId2}>nbf + 300</code> (5 minutes)</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196423</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nbf</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Unix timestamp. Must be <strong data-v-9623dc61${_scopeId2}>no more than 10 minutes in the past</strong> at the time the AS processes the request. Recommended: <code data-v-9623dc61${_scopeId2}>iat - 10</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196103</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>response_type</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Must be <code data-v-9623dc61${_scopeId2}>code</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>code</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>scope</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Space-separated OAuth 2.0 scopes — see <a href="/tech/tpp-standards/security/fapi/scopes" data-v-9623dc61${_scopeId2}>Scopes</a></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>payments openid</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>redirect_uri</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Must exactly match a URI registered in the Trust Framework</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>https://yourapp.com/callback</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nonce</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>A fresh UUID for every request. Bound to the ID token — prevents ID token replay</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>f47ac10b-58cc-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>state</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>A fresh UUID for every request. Returned in the redirect — prevents CSRF</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>e5f6g7h8-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>code_challenge</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Base64url-encoded SHA-256 hash of your <code data-v-9623dc61${_scopeId2}>code_verifier</code> (PKCE)</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>E9Melhoa2Ow...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>code_challenge_method</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Must be <code data-v-9623dc61${_scopeId2}>S256</code> — only PKCE method supported</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>S256</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>authorization_details</code></td><td data-v-9623dc61${_scopeId2}>array</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>RAR object describing the consent — see <a href="/tech/tpp-standards/v2.1/consent/api-guide" data-v-9623dc61${_scopeId2}>Consent API Guide</a></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>[{...}]</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>max_age</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}></td><td data-v-9623dc61${_scopeId2}>Maximum authentication age in seconds. Capped at <code data-v-9623dc61${_scopeId2}>3600</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>3600</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>jti</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}></td><td data-v-9623dc61${_scopeId2}>Not required in the Request Object. Use <code data-v-9623dc61${_scopeId2}>nonce</code> for replay prevention instead</td><td data-v-9623dc61${_scopeId2}>—</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createTextVNode("The Authorization Server's "),
                              createVNode("code", null, "issuer"),
                              createTextVNode(" value")
                            ]),
                            createTextVNode(" — from the LFI's "),
                            createVNode("code", null, ".well-known/openid-configuration"),
                            createTextVNode(". This is not the token endpoint URL.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(" from the Trust Framework")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-5678-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Same value as "),
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-5678-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Issued At Unix timestamp — when the JWT was created"),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196113")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Unix timestamp. Must be "),
                            createVNode("strong", null, [
                              createTextVNode("no more than 10 minutes after "),
                              createVNode("code", null, "nbf")
                            ]),
                            createTextVNode(". Recommended: "),
                            createVNode("code", null, "nbf + 300"),
                            createTextVNode(" (5 minutes)")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196423")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Unix timestamp. Must be "),
                            createVNode("strong", null, "no more than 10 minutes in the past"),
                            createTextVNode(" at the time the AS processes the request. Recommended: "),
                            createVNode("code", null, "iat - 10")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196103")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "response_type")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "code")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "code")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "scope")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Space-separated OAuth 2.0 scopes — see "),
                            createVNode("a", { href: "/tech/tpp-standards/security/fapi/scopes" }, "Scopes")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "payments openid")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "redirect_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Must exactly match a URI registered in the Trust Framework"),
                          createVNode("td", null, [
                            createVNode("code", null, "https://yourapp.com/callback")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nonce")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "A fresh UUID for every request. Bound to the ID token — prevents ID token replay"),
                          createVNode("td", null, [
                            createVNode("code", null, "f47ac10b-58cc-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "state")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "A fresh UUID for every request. Returned in the redirect — prevents CSRF"),
                          createVNode("td", null, [
                            createVNode("code", null, "e5f6g7h8-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "code_challenge")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Base64url-encoded SHA-256 hash of your "),
                            createVNode("code", null, "code_verifier"),
                            createTextVNode(" (PKCE)")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "E9Melhoa2Ow...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "code_challenge_method")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "S256"),
                            createTextVNode(" — only PKCE method supported")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "S256")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_details")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("RAR object describing the consent — see "),
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent API Guide")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "[{...}]")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "max_age")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td"),
                          createVNode("td", null, [
                            createTextVNode("Maximum authentication age in seconds. Capped at "),
                            createVNode("code", null, "3600")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "3600")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td"),
                          createVNode("td", null, [
                            createTextVNode("Not required in the Request Object. Use "),
                            createVNode("code", null, "nonce"),
                            createTextVNode(" for replay prevention instead")
                          ]),
                          createVNode("td", null, "—")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}><code data-v-9623dc61${_scopeId}>aud</code> — issuer, not token endpoint</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-9623dc61${_scopeId2}>aud</code> claim must be the Authorization Server&#39;s <strong data-v-9623dc61${_scopeId2}>issuer identifier</strong>, not the token endpoint URL.`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, "aud"),
                    createTextVNode(" claim must be the Authorization Server's "),
                    createVNode("strong", null, "issuer identifier"),
                    createTextVNode(", not the token endpoint URL.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: audExamples,
              lang: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Find the correct value from the LFI&#39;s <code data-v-9623dc61${_scopeId2}>.well-known/openid-configuration</code> under the <code data-v-9623dc61${_scopeId2}>issuer</code> key. `);
                } else {
                  return [
                    createTextVNode(" Find the correct value from the LFI's "),
                    createVNode("code", null, ".well-known/openid-configuration"),
                    createTextVNode(" under the "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(" key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}>Lifetime window</h3>`);
            _push2(ssrRenderComponent(_component_EdLifetime, {
              from: "nbf",
              to: "exp",
              duration: "max 10 minutes",
              recommended: "recommended 5 minutes",
              color: "var(--at-blue)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Authorization Server checks that:`);
                } else {
                  return [
                    createTextVNode("The Authorization Server checks that:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nbf</code> is no more than <strong data-v-9623dc61${_scopeId2}>10 minutes in the past</strong></li><li data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>exp</code> is no more than <strong data-v-9623dc61${_scopeId2}>10 minutes after <code data-v-9623dc61${_scopeId2}>nbf</code></strong></li><li data-v-9623dc61${_scopeId2}>The current time falls between <code data-v-9623dc61${_scopeId2}>nbf</code> and <code data-v-9623dc61${_scopeId2}>exp</code></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "nbf"),
                      createTextVNode(" is no more than "),
                      createVNode("strong", null, "10 minutes in the past")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "exp"),
                      createTextVNode(" is no more than "),
                      createVNode("strong", null, [
                        createTextVNode("10 minutes after "),
                        createVNode("code", null, "nbf")
                      ])
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The current time falls between "),
                      createVNode("code", null, "nbf"),
                      createTextVNode(" and "),
                      createVNode("code", null, "exp")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Clock skew between your server and the Authorization Server can cause rejections. Always set <code data-v-9623dc61${_scopeId2}>nbf</code> slightly in the past (<code data-v-9623dc61${_scopeId2}>iat - 10</code>) to absorb up to 10 seconds of drift. `);
                } else {
                  return [
                    createTextVNode(" Clock skew between your server and the Authorization Server can cause rejections. Always set "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" slightly in the past ("),
                    createVNode("code", null, "iat - 10"),
                    createTextVNode(") to absorb up to 10 seconds of drift. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Claims"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createTextVNode("The Authorization Server's "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" value")
                          ]),
                          createTextVNode(" — from the LFI's "),
                          createVNode("code", null, ".well-known/openid-configuration"),
                          createTextVNode(". This is not the token endpoint URL.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(" from the Trust Framework")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-5678-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Same value as "),
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-5678-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Issued At Unix timestamp — when the JWT was created"),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196113")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Unix timestamp. Must be "),
                          createVNode("strong", null, [
                            createTextVNode("no more than 10 minutes after "),
                            createVNode("code", null, "nbf")
                          ]),
                          createTextVNode(". Recommended: "),
                          createVNode("code", null, "nbf + 300"),
                          createTextVNode(" (5 minutes)")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196423")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Unix timestamp. Must be "),
                          createVNode("strong", null, "no more than 10 minutes in the past"),
                          createTextVNode(" at the time the AS processes the request. Recommended: "),
                          createVNode("code", null, "iat - 10")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196103")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "response_type")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "code")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "code")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "scope")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Space-separated OAuth 2.0 scopes — see "),
                          createVNode("a", { href: "/tech/tpp-standards/security/fapi/scopes" }, "Scopes")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "payments openid")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "redirect_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Must exactly match a URI registered in the Trust Framework"),
                        createVNode("td", null, [
                          createVNode("code", null, "https://yourapp.com/callback")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nonce")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "A fresh UUID for every request. Bound to the ID token — prevents ID token replay"),
                        createVNode("td", null, [
                          createVNode("code", null, "f47ac10b-58cc-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "state")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "A fresh UUID for every request. Returned in the redirect — prevents CSRF"),
                        createVNode("td", null, [
                          createVNode("code", null, "e5f6g7h8-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "code_challenge")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Base64url-encoded SHA-256 hash of your "),
                          createVNode("code", null, "code_verifier"),
                          createTextVNode(" (PKCE)")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "E9Melhoa2Ow...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "code_challenge_method")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "S256"),
                          createTextVNode(" — only PKCE method supported")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "S256")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_details")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("RAR object describing the consent — see "),
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent API Guide")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "[{...}]")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "max_age")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createTextVNode("Maximum authentication age in seconds. Capped at "),
                          createVNode("code", null, "3600")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "3600")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createTextVNode("Not required in the Request Object. Use "),
                          createVNode("code", null, "nonce"),
                          createTextVNode(" for replay prevention instead")
                        ]),
                        createVNode("td", null, "—")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "aud"),
                createTextVNode(" — issuer, not token endpoint")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, "aud"),
                  createTextVNode(" claim must be the Authorization Server's "),
                  createVNode("strong", null, "issuer identifier"),
                  createTextVNode(", not the token endpoint URL.")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: audExamples,
                lang: "text"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Find the correct value from the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" under the "),
                  createVNode("code", null, "issuer"),
                  createTextVNode(" key. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Lifetime window"),
              createVNode(_component_EdLifetime, {
                from: "nbf",
                to: "exp",
                duration: "max 10 minutes",
                recommended: "recommended 5 minutes",
                color: "var(--at-blue)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Authorization Server checks that:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "nbf"),
                    createTextVNode(" is no more than "),
                    createVNode("strong", null, "10 minutes in the past")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "exp"),
                    createTextVNode(" is no more than "),
                    createVNode("strong", null, [
                      createTextVNode("10 minutes after "),
                      createVNode("code", null, "nbf")
                    ])
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The current time falls between "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" and "),
                    createVNode("code", null, "exp")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Clock skew between your server and the Authorization Server can cause rejections. Always set "),
                  createVNode("code", null, "nbf"),
                  createTextVNode(" slightly in the past ("),
                  createVNode("code", null, "iat - 10"),
                  createTextVNode(") to absorb up to 10 seconds of drift. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "assertion",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Client Assertion",
        title: "Claims for the client_assertion= JWT",
        lede: "The Client Assertion proves your application's identity to the Authorization Server. It is sent as <code>client_assertion</code> with <code>client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Fresh per request"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9623dc61${_scopeId2}> The Client Assertion must be sent to <strong data-v-9623dc61${_scopeId2}>both <code data-v-9623dc61${_scopeId2}>/par</code> and <code data-v-9623dc61${_scopeId2}>/token</code></strong>. A <strong data-v-9623dc61${_scopeId2}>fresh assertion with a new <code data-v-9623dc61${_scopeId2}>jti</code> must be generated for every request</strong> — the same assertion cannot be reused. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Client Assertion must be sent to "),
                      createVNode("strong", null, [
                        createTextVNode("both "),
                        createVNode("code", null, "/par"),
                        createTextVNode(" and "),
                        createVNode("code", null, "/token")
                      ]),
                      createTextVNode(". A "),
                      createVNode("strong", null, [
                        createTextVNode("fresh assertion with a new "),
                        createVNode("code", null, "jti"),
                        createTextVNode(" must be generated for every request")
                      ]),
                      createTextVNode(" — the same assertion cannot be reused. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}>Claims</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>Claim</th><th data-v-9623dc61${_scopeId2}>Type</th><th data-v-9623dc61${_scopeId2}>Required</th><th data-v-9623dc61${_scopeId2}>Rule</th><th data-v-9623dc61${_scopeId2}>Example</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>aud</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>The Authorization Server&#39;s <code data-v-9623dc61${_scopeId2}>issuer</code> value</strong> — same source as the Request Object <code data-v-9623dc61${_scopeId2}>aud</code>. Not the token endpoint URL</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>iss</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Your application&#39;s <code data-v-9623dc61${_scopeId2}>client_id</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>a1b2c3d4-5678-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>sub</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Your application&#39;s <code data-v-9623dc61${_scopeId2}>client_id</code> — <strong data-v-9623dc61${_scopeId2}>must equal <code data-v-9623dc61${_scopeId2}>iss</code></strong></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>a1b2c3d4-5678-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>iat</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Unix timestamp of issuance</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196113</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>exp</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>Unix timestamp. Keep short-lived — <strong data-v-9623dc61${_scopeId2}>maximum 5 minutes</strong> after <code data-v-9623dc61${_scopeId2}>iat</code>. Recommended: <code data-v-9623dc61${_scopeId2}>iat + 300</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196413</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>jti</code></td><td data-v-9623dc61${_scopeId2}>string</td><td data-v-9623dc61${_scopeId2}>✓</td><td data-v-9623dc61${_scopeId2}>A unique identifier (UUID) for <strong data-v-9623dc61${_scopeId2}>this specific assertion</strong>. The Authorization Server records seen <code data-v-9623dc61${_scopeId2}>jti</code> values and will reject any reuse. Generate a fresh UUID for every request</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>c770aef3-6784-...</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nbf</code></td><td data-v-9623dc61${_scopeId2}>number</td><td data-v-9623dc61${_scopeId2}></td><td data-v-9623dc61${_scopeId2}>Not Before. If provided, set to <code data-v-9623dc61${_scopeId2}>iat - 10</code> to absorb clock skew</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>1713196103</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createTextVNode("The Authorization Server's "),
                              createVNode("code", null, "issuer"),
                              createTextVNode(" value")
                            ]),
                            createTextVNode(" — same source as the Request Object "),
                            createVNode("code", null, "aud"),
                            createTextVNode(". Not the token endpoint URL")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-5678-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sub")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(" — "),
                            createVNode("strong", null, [
                              createTextVNode("must equal "),
                              createVNode("code", null, "iss")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-5678-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Unix timestamp of issuance"),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196113")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Unix timestamp. Keep short-lived — "),
                            createVNode("strong", null, "maximum 5 minutes"),
                            createTextVNode(" after "),
                            createVNode("code", null, "iat"),
                            createTextVNode(". Recommended: "),
                            createVNode("code", null, "iat + 300")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196413")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("A unique identifier (UUID) for "),
                            createVNode("strong", null, "this specific assertion"),
                            createTextVNode(". The Authorization Server records seen "),
                            createVNode("code", null, "jti"),
                            createTextVNode(" values and will reject any reuse. Generate a fresh UUID for every request")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "c770aef3-6784-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td"),
                          createVNode("td", null, [
                            createTextVNode("Not Before. If provided, set to "),
                            createVNode("code", null, "iat - 10"),
                            createTextVNode(" to absorb clock skew")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196103")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}><code data-v-9623dc61${_scopeId}>sub</code> must equal <code data-v-9623dc61${_scopeId}>iss</code></h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subExamples,
              lang: "text"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}><code data-v-9623dc61${_scopeId}>jti</code> replay prevention</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-9623dc61${_scopeId2}>jti</code> must be a UUID that has never been used before with this Authorization Server. Reusing a <code data-v-9623dc61${_scopeId2}>jti</code> — even from seconds earlier — will result in a <code data-v-9623dc61${_scopeId2}>400</code> or <code data-v-9623dc61${_scopeId2}>401</code> rejection. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" must be a UUID that has never been used before with this Authorization Server. Reusing a "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" — even from seconds earlier — will result in a "),
                    createVNode("code", null, "400"),
                    createTextVNode(" or "),
                    createVNode("code", null, "401"),
                    createTextVNode(" rejection. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jtiExamples,
              lang: "text"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-9623dc61${_scopeId}>Lifetime window</h3>`);
            _push2(ssrRenderComponent(_component_EdLifetime, {
              from: "iat",
              to: "exp",
              duration: "max 5 minutes",
              color: "var(--at-blue-deep)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Unlike the Request Object, there is no <code data-v-9623dc61${_scopeId2}>nbf</code> requirement for the Client Assertion, but keeping <code data-v-9623dc61${_scopeId2}>exp</code> short-lived (5 minutes maximum) limits exposure if intercepted. `);
                } else {
                  return [
                    createTextVNode(" Unlike the Request Object, there is no "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" requirement for the Client Assertion, but keeping "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" short-lived (5 minutes maximum) limits exposure if intercepted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, {
                type: "important",
                title: "Fresh per request"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Client Assertion must be sent to "),
                    createVNode("strong", null, [
                      createTextVNode("both "),
                      createVNode("code", null, "/par"),
                      createTextVNode(" and "),
                      createVNode("code", null, "/token")
                    ]),
                    createTextVNode(". A "),
                    createVNode("strong", null, [
                      createTextVNode("fresh assertion with a new "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" must be generated for every request")
                    ]),
                    createTextVNode(" — the same assertion cannot be reused. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Claims"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createTextVNode("The Authorization Server's "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" value")
                          ]),
                          createTextVNode(" — same source as the Request Object "),
                          createVNode("code", null, "aud"),
                          createTextVNode(". Not the token endpoint URL")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-5678-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sub")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(" — "),
                          createVNode("strong", null, [
                            createTextVNode("must equal "),
                            createVNode("code", null, "iss")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-5678-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Unix timestamp of issuance"),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196113")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Unix timestamp. Keep short-lived — "),
                          createVNode("strong", null, "maximum 5 minutes"),
                          createTextVNode(" after "),
                          createVNode("code", null, "iat"),
                          createTextVNode(". Recommended: "),
                          createVNode("code", null, "iat + 300")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196413")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("A unique identifier (UUID) for "),
                          createVNode("strong", null, "this specific assertion"),
                          createTextVNode(". The Authorization Server records seen "),
                          createVNode("code", null, "jti"),
                          createTextVNode(" values and will reject any reuse. Generate a fresh UUID for every request")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "c770aef3-6784-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createTextVNode("Not Before. If provided, set to "),
                          createVNode("code", null, "iat - 10"),
                          createTextVNode(" to absorb clock skew")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196103")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "sub"),
                createTextVNode(" must equal "),
                createVNode("code", null, "iss")
              ]),
              createVNode(_component_EdCode, {
                code: subExamples,
                lang: "text"
              }),
              createVNode("h3", null, [
                createVNode("code", null, "jti"),
                createTextVNode(" replay prevention")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "jti"),
                  createTextVNode(" must be a UUID that has never been used before with this Authorization Server. Reusing a "),
                  createVNode("code", null, "jti"),
                  createTextVNode(" — even from seconds earlier — will result in a "),
                  createVNode("code", null, "400"),
                  createTextVNode(" or "),
                  createVNode("code", null, "401"),
                  createTextVNode(" rejection. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jtiExamples,
                lang: "text"
              }),
              createVNode("h3", null, "Lifetime window"),
              createVNode(_component_EdLifetime, {
                from: "iat",
                to: "exp",
                duration: "max 5 minutes",
                color: "var(--at-blue-deep)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Unlike the Request Object, there is no "),
                  createVNode("code", null, "nbf"),
                  createTextVNode(" requirement for the Client Assertion, but keeping "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" short-lived (5 minutes maximum) limits exposure if intercepted. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "comparison",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Side-by-side comparison",
        title: "The differences at a glance",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>Claim</th><th data-v-9623dc61${_scopeId2}>Request Object</th><th data-v-9623dc61${_scopeId2}>Client Assertion</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>aud</code></td><td data-v-9623dc61${_scopeId2}>AS issuer URL</td><td data-v-9623dc61${_scopeId2}>AS issuer URL</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>iss</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>client_id</code></td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>client_id</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>sub</code></td><td data-v-9623dc61${_scopeId2}>Not used</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>client_id</code> (must equal <code data-v-9623dc61${_scopeId2}>iss</code>)</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>exp</code> max</td><td data-v-9623dc61${_scopeId2}>10 min after <code data-v-9623dc61${_scopeId2}>nbf</code></td><td data-v-9623dc61${_scopeId2}>5 min after <code data-v-9623dc61${_scopeId2}>iat</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nbf</code></td><td data-v-9623dc61${_scopeId2}>Required</td><td data-v-9623dc61${_scopeId2}>Optional (recommended)</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>jti</code></td><td data-v-9623dc61${_scopeId2}>Not required</td><td data-v-9623dc61${_scopeId2}><strong data-v-9623dc61${_scopeId2}>Required — must be unique per request</strong></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>nonce</code></td><td data-v-9623dc61${_scopeId2}>Required</td><td data-v-9623dc61${_scopeId2}>Not used</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>state</code></td><td data-v-9623dc61${_scopeId2}>Required</td><td data-v-9623dc61${_scopeId2}>Not used</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>client_id</code></td><td data-v-9623dc61${_scopeId2}>Required</td><td data-v-9623dc61${_scopeId2}>Not used</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Request Object"),
                          createVNode("th", null, "Client Assertion")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, "AS issuer URL"),
                          createVNode("td", null, "AS issuer URL")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "client_id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sub")
                          ]),
                          createVNode("td", null, "Not used"),
                          createVNode("td", null, [
                            createVNode("code", null, "client_id"),
                            createTextVNode(" (must equal "),
                            createVNode("code", null, "iss"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp"),
                            createTextVNode(" max")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("10 min after "),
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("5 min after "),
                            createVNode("code", null, "iat")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, "Required"),
                          createVNode("td", null, "Optional (recommended)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, "Not required"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Required — must be unique per request")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nonce")
                          ]),
                          createVNode("td", null, "Required"),
                          createVNode("td", null, "Not used")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "state")
                          ]),
                          createVNode("td", null, "Required"),
                          createVNode("td", null, "Not used")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, "Required"),
                          createVNode("td", null, "Not used")
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
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Request Object"),
                        createVNode("th", null, "Client Assertion")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, "AS issuer URL"),
                        createVNode("td", null, "AS issuer URL")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "client_id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sub")
                        ]),
                        createVNode("td", null, "Not used"),
                        createVNode("td", null, [
                          createVNode("code", null, "client_id"),
                          createTextVNode(" (must equal "),
                          createVNode("code", null, "iss"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp"),
                          createTextVNode(" max")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("10 min after "),
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("5 min after "),
                          createVNode("code", null, "iat")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, "Required"),
                        createVNode("td", null, "Optional (recommended)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, "Not required"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Required — must be unique per request")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nonce")
                        ]),
                        createVNode("td", null, "Required"),
                        createVNode("td", null, "Not used")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "state")
                        ]),
                        createVNode("td", null, "Required"),
                        createVNode("td", null, "Not used")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, "Required"),
                        createVNode("td", null, "Not used")
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
        id: "rejections",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Common rejection causes",
        title: "Most likely cause for each error",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9623dc61${_scopeId2}><thead data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><th data-v-9623dc61${_scopeId2}>Error</th><th data-v-9623dc61${_scopeId2}>Likely cause</th></tr></thead><tbody data-v-9623dc61${_scopeId2}><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>aud</code> rejected</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>aud</code> set to token endpoint URL instead of issuer</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>jti</code> already used</td><td data-v-9623dc61${_scopeId2}>Client Assertion <code data-v-9623dc61${_scopeId2}>jti</code> reused across requests</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>sub</code> missing</td><td data-v-9623dc61${_scopeId2}>Client Assertion sent without <code data-v-9623dc61${_scopeId2}>sub</code> claim</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}>Token expired</td><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>exp</code> too short or clock skew — set <code data-v-9623dc61${_scopeId2}>nbf</code> to <code data-v-9623dc61${_scopeId2}>iat - 10</code></td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}>Wrong algorithm</td><td data-v-9623dc61${_scopeId2}>Non-PS256 algorithm used in JOSE header</td></tr><tr data-v-9623dc61${_scopeId2}><td data-v-9623dc61${_scopeId2}><code data-v-9623dc61${_scopeId2}>kid</code> not found</td><td data-v-9623dc61${_scopeId2}>Signing certificate not yet registered or wrong <code data-v-9623dc61${_scopeId2}>kid</code> value</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Error"),
                          createVNode("th", null, "Likely cause")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud"),
                            createTextVNode(" rejected")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "aud"),
                            createTextVNode(" set to token endpoint URL instead of issuer")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti"),
                            createTextVNode(" already used")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Client Assertion "),
                            createVNode("code", null, "jti"),
                            createTextVNode(" reused across requests")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sub"),
                            createTextVNode(" missing")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Client Assertion sent without "),
                            createVNode("code", null, "sub"),
                            createTextVNode(" claim")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Token expired"),
                          createVNode("td", null, [
                            createVNode("code", null, "exp"),
                            createTextVNode(" too short or clock skew — set "),
                            createVNode("code", null, "nbf"),
                            createTextVNode(" to "),
                            createVNode("code", null, "iat - 10")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Wrong algorithm"),
                          createVNode("td", null, "Non-PS256 algorithm used in JOSE header")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid"),
                            createTextVNode(" not found")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Signing certificate not yet registered or wrong "),
                            createVNode("code", null, "kid"),
                            createTextVNode(" value")
                          ])
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
                        createVNode("th", null, "Error"),
                        createVNode("th", null, "Likely cause")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud"),
                          createTextVNode(" rejected")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "aud"),
                          createTextVNode(" set to token endpoint URL instead of issuer")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti"),
                          createTextVNode(" already used")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Client Assertion "),
                          createVNode("code", null, "jti"),
                          createTextVNode(" reused across requests")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sub"),
                          createTextVNode(" missing")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Client Assertion sent without "),
                          createVNode("code", null, "sub"),
                          createTextVNode(" claim")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Token expired"),
                        createVNode("td", null, [
                          createVNode("code", null, "exp"),
                          createTextVNode(" too short or clock skew — set "),
                          createVNode("code", null, "nbf"),
                          createTextVNode(" to "),
                          createVNode("code", null, "iat - 10")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Wrong algorithm"),
                        createVNode("td", null, "Non-PS256 algorithm used in JOSE header")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid"),
                          createTextVNode(" not found")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Signing certificate not yet registered or wrong "),
                          createVNode("code", null, "kid"),
                          createTextVNode(" value")
                        ])
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
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related pages",
        title: "See also"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/message-signing",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Message Signing",
              desc: "How to sign a JWT with PS256."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/request-jwt",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Request JWT",
              desc: "Full code example for building the Request Object."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/tokens/client-assertion",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Client Assertion",
              desc: "Full code example for building the Client Assertion."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/trust-framework/api-discovery",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "API Discovery",
              desc: "Where to find the issuer value."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/message-signing",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Message Signing",
                desc: "How to sign a JWT with PS256."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/request-jwt",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Request JWT",
                desc: "Full code example for building the Request Object."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/tokens/client-assertion",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Client Assertion",
                desc: "Full code example for building the Client Assertion."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/trust-framework/api-discovery",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "API Discovery",
                desc: "Where to find the issuer value."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/jwt-claims.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const jwtClaims = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9623dc61"]]);
export {
  jwtClaims as default
};
