import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const stripNewlines = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`;
const piiBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}",
        "Initiation": {
            "Creditor": [
                {
                    "CreditorAgent": {
                        "SchemeName": "BICFI",
                        "Identification": "10000109010101",
                        "Name": "Mario International",
                        "PostalAddress": [{ "AddressType": "Business", "Country": "AE" }]
                    },
                    "Creditor": { "Name": "Mario International" },
                    "CreditorAccount": {
                        "SchemeName": "AccountNumber",
                        "Identification": "10000109010101",
                        "Name": { "en": "Mario International" }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": { "UserName": { "en": "Mohammed Al Rashidi" } },
            "CreditorIndicators": {
                "AccountType": "Retail",
                "IsCreditorConfirmed": true,
                "IsCreditorPrePopulated": true,
                "TradingName": "Mario International"
            }
        }
    },
    "signingKeyPEM": "{{pem-local}}",
    "jwksUrl": "{{jwksUrl}}"
}`;
const piiTest = `pm.environment.set('encryptedPII', responseBody)`;
const parBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`;
const parPre = `pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`;
const parTest = `pm.environment.set('private_key_jwt', responseBody)`;
const tokenBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`;
const runOrder = `1.  O3 Util: Prepare Encrypted PII              → saves {{encryptedPII}}
2.  O3 Util: Prepare private key JWT for PAR    → saves {{private_key_jwt}}  (client assertion)
3.  O3 Util: Prepare request object JWT for PAR → saves {{requestObject}}     (signed request object)
4.  POST /par                                    → uses {{requestObject}} + {{private_key_jwt}}
5.  Redirect user to bank → receive auth code
6.  O3 Util: Prepare private key JWT            → saves fresh {{private_key_jwt}}
7.  POST /token                                 → exchange auth code for tokens`;
const PM_ENCRYPTED_PII = "{{encryptedPII}}";
const PM_PRIVATE_KEY_JWT = "{{private_key_jwt}}";
const PM_GUID = "{{$guid}}";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "o3-utils",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "problems", label: "Problems" },
      { id: "env", label: "Env vars" },
      { id: "pii", label: "Encrypted PII" },
      { id: "par-jwt", label: "PAR JWT" },
      { id: "token-jwt", label: "Token JWT" },
      { id: "order", label: "Run order" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Sandbox", "Tooling", "JWT"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-30c9c989>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "O3 Sandbox Utilities — Signing and Encryption Helpers",
        meta,
        lede: "The sandbox exposes a small set of <strong>O3 Utility endpoints</strong> that perform JWT signing and PII encryption on your behalf. Supply your private key (and a JWKS URL for encryption) in the request body, and the utility returns the finished token. Lets you verify your key material and payload structure at each stage of the flow — independently of your application code."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-30c9c989${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-30c9c989${_scopeId}>${ssrInterpolate(t)}</span>`);
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
      _push(ssrRenderComponent(_component_EdNote, {
        type: "danger",
        title: "Sandbox only — never use in production"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-30c9c989${_scopeId}>These endpoints accept raw private key material. They exist <strong data-v-30c9c989${_scopeId}>exclusively in the sandbox</strong> environment and are <strong data-v-30c9c989${_scopeId}>not available in production</strong>. Never send a production private key to any external service.</p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode("These endpoints accept raw private key material. They exist "),
                createVNode("strong", null, "exclusively in the sandbox"),
                createTextVNode(" environment and are "),
                createVNode("strong", null, "not available in production"),
                createTextVNode(". Never send a production private key to any external service.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "problems",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What problems do they solve?",
        title: "Isolating each cryptographic step",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Setting up JWT signing and JWE encryption from scratch involves several independent components — certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at <code data-v-30c9c989${_scopeId2}>/par</code> or <code data-v-30c9c989${_scopeId2}>/token</code> with little indication of which step failed.`);
                } else {
                  return [
                    createTextVNode("Setting up JWT signing and JWE encryption from scratch involves several independent components — certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" or "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" with little indication of which step failed.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The O3 Utils let you isolate and validate each component individually before wiring them together:`);
                } else {
                  return [
                    createTextVNode("The O3 Utils let you isolate and validate each component individually before wiring them together:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-30c9c989${_scopeId2}><thead data-v-30c9c989${_scopeId2}><tr data-v-30c9c989${_scopeId2}><th data-v-30c9c989${_scopeId2}>If you&#39;re unsure whether…</th><th data-v-30c9c989${_scopeId2}>Use…</th></tr></thead><tbody data-v-30c9c989${_scopeId2}><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}>Your private key and <code data-v-30c9c989${_scopeId2}>kid</code> are correctly configured</td><td data-v-30c9c989${_scopeId2}><strong data-v-30c9c989${_scopeId2}>Prepare private key JWT</strong></td></tr><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}>Your client assertion claims are correct</td><td data-v-30c9c989${_scopeId2}><strong data-v-30c9c989${_scopeId2}>Prepare private key JWT for PAR end-point</strong></td></tr><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}>Your PII payload structure and encryption key are working</td><td data-v-30c9c989${_scopeId2}><strong data-v-30c9c989${_scopeId2}>Prepare Encrypted PII</strong></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "If you're unsure whether…"),
                          createVNode("th", null, "Use…")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Your private key and "),
                            createVNode("code", null, "kid"),
                            createTextVNode(" are correctly configured")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Prepare private key JWT")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Your client assertion claims are correct"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Prepare private key JWT for PAR end-point")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Your PII payload structure and encryption key are working"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Prepare Encrypted PII")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Setting up JWT signing and JWE encryption from scratch involves several independent components — certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" or "),
                  createVNode("code", null, "/token"),
                  createTextVNode(" with little indication of which step failed.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The O3 Utils let you isolate and validate each component individually before wiring them together:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "If you're unsure whether…"),
                        createVNode("th", null, "Use…")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Your private key and "),
                          createVNode("code", null, "kid"),
                          createTextVNode(" are correctly configured")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Prepare private key JWT")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Your client assertion claims are correct"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Prepare private key JWT for PAR end-point")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Your PII payload structure and encryption key are working"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Prepare Encrypted PII")
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
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "env",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Postman environment",
        title: "Required variables",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-30c9c989${_scopeId2}><thead data-v-30c9c989${_scopeId2}><tr data-v-30c9c989${_scopeId2}><th data-v-30c9c989${_scopeId2}>Variable</th><th data-v-30c9c989${_scopeId2}>Description</th></tr></thead><tbody data-v-30c9c989${_scopeId2}><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}><code data-v-30c9c989${_scopeId2}>kid-local</code></td><td data-v-30c9c989${_scopeId2}>The <code data-v-30c9c989${_scopeId2}>kid</code> of your signing certificate from the Trust Framework</td></tr><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}><code data-v-30c9c989${_scopeId2}>pem-local</code></td><td data-v-30c9c989${_scopeId2}>Your signing private key in PEM format, with <code data-v-30c9c989${_scopeId2}>\\n</code> replacing literal newlines</td></tr><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}><code data-v-30c9c989${_scopeId2}>_clientId</code></td><td data-v-30c9c989${_scopeId2}>Your application&#39;s <code data-v-30c9c989${_scopeId2}>client_id</code> from the Trust Framework</td></tr><tr data-v-30c9c989${_scopeId2}><td data-v-30c9c989${_scopeId2}><code data-v-30c9c989${_scopeId2}>jwksUrl</code></td><td data-v-30c9c989${_scopeId2}>The LFI&#39;s JWKS URI — required for encryption only</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Variable"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid-local")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "kid"),
                            createTextVNode(" of your signing certificate from the Trust Framework")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "pem-local")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your signing private key in PEM format, with "),
                            createVNode("code", null, "\\n"),
                            createTextVNode(" replacing literal newlines")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "_clientId")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(" from the Trust Framework")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jwksUrl")
                          ]),
                          createVNode("td", null, "The LFI's JWKS URI — required for encryption only")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Stripping newlines from a PEM key"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-30c9c989${_scopeId2}>Postman environment variables cannot contain literal newlines. Convert your key with:</p>`);
                } else {
                  return [
                    createVNode("p", null, "Postman environment variables cannot contain literal newlines. Convert your key with:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: stripNewlines,
              lang: "bash"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Variable"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid-local")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "kid"),
                          createTextVNode(" of your signing certificate from the Trust Framework")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "pem-local")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your signing private key in PEM format, with "),
                          createVNode("code", null, "\\n"),
                          createTextVNode(" replacing literal newlines")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "_clientId")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(" from the Trust Framework")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jwksUrl")
                        ]),
                        createVNode("td", null, "The LFI's JWKS URI — required for encryption only")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Stripping newlines from a PEM key"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Postman environment variables cannot contain literal newlines. Convert your key with:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: stripNewlines,
                lang: "bash"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "pii",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Prepare Encrypted PII",
        title: "GET /o3/v1.0/message-encryption",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-30c9c989${_scopeId2}>Saves to:</strong> <code data-v-30c9c989${_scopeId2}>${ssrInterpolate(PM_ENCRYPTED_PII)}</code>`);
                } else {
                  return [
                    createVNode("strong", null, "Saves to:"),
                    createTextVNode(),
                    createVNode("code", null, toDisplayString(PM_ENCRYPTED_PII))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI&#39;s public encryption key (fetched from <code data-v-30c9c989${_scopeId2}>jwksUrl</code>). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into <code data-v-30c9c989${_scopeId2}>PersonalIdentifiableInformation</code> inside <code data-v-30c9c989${_scopeId2}>authorization_details</code>.`);
                } else {
                  return [
                    createTextVNode("Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI's public encryption key (fetched from "),
                    createVNode("code", null, "jwksUrl"),
                    createTextVNode("). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" inside "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-30c9c989${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: piiBody,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-30c9c989${_scopeId}>Test script</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: piiTest,
              lang: "javascript"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-30c9c989${_scopeId2}>Message Encryption</a> for how to produce this token in your own code.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(" for how to produce this token in your own code.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Saves to:"),
                  createTextVNode(),
                  createVNode("code", null, toDisplayString(PM_ENCRYPTED_PII))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI's public encryption key (fetched from "),
                  createVNode("code", null, "jwksUrl"),
                  createTextVNode("). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into "),
                  createVNode("code", null, "PersonalIdentifiableInformation"),
                  createTextVNode(" inside "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Request body"),
              createVNode(_component_EdCode, {
                code: piiBody,
                lang: "json"
              }),
              createVNode("h3", null, "Test script"),
              createVNode(_component_EdCode, {
                code: piiTest,
                lang: "javascript"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(" for how to produce this token in your own code.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "par-jwt",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "PAR client assertion",
        title: "GET /o3/v1.0/message-signature (PAR variant)",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-30c9c989${_scopeId2}>Saves to:</strong> <code data-v-30c9c989${_scopeId2}>${ssrInterpolate(PM_PRIVATE_KEY_JWT)}</code>`);
                } else {
                  return [
                    createVNode("strong", null, "Saves to:"),
                    createTextVNode(),
                    createVNode("code", null, toDisplayString(PM_PRIVATE_KEY_JWT))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Produces a <strong data-v-30c9c989${_scopeId2}>client assertion JWT</strong> for authenticating at <code data-v-30c9c989${_scopeId2}>/par</code>. The assertion contains your <code data-v-30c9c989${_scopeId2}>client_id</code> as both <code data-v-30c9c989${_scopeId2}>iss</code> and <code data-v-30c9c989${_scopeId2}>sub</code>, a short <code data-v-30c9c989${_scopeId2}>exp</code>, and a unique <code data-v-30c9c989${_scopeId2}>jti</code>. The Authorization Server verifies it using your public key from the Trust Framework JWKS.`);
                } else {
                  return [
                    createTextVNode("Produces a "),
                    createVNode("strong", null, "client assertion JWT"),
                    createTextVNode(" for authenticating at "),
                    createVNode("code", null, "/par"),
                    createTextVNode(". The assertion contains your "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(" as both "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(", a short "),
                    createVNode("code", null, "exp"),
                    createTextVNode(", and a unique "),
                    createVNode("code", null, "jti"),
                    createTextVNode(". The Authorization Server verifies it using your public key from the Trust Framework JWKS.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Use this as the <code data-v-30c9c989${_scopeId2}>client_assertion</code> parameter when calling <code data-v-30c9c989${_scopeId2}>/par</code>.`);
                } else {
                  return [
                    createTextVNode("Use this as the "),
                    createVNode("code", null, "client_assertion"),
                    createTextVNode(" parameter when calling "),
                    createVNode("code", null, "/par"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-30c9c989${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: parBody,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-30c9c989${_scopeId}>Pre-request script</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: parPre,
              lang: "javascript"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-30c9c989${_scopeId}>Test script</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: parTest,
              lang: "javascript"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-30c9c989${_scopeId2}>Client Assertion</a> for the full claim set.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the full claim set.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Saves to:"),
                  createTextVNode(),
                  createVNode("code", null, toDisplayString(PM_PRIVATE_KEY_JWT))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Produces a "),
                  createVNode("strong", null, "client assertion JWT"),
                  createTextVNode(" for authenticating at "),
                  createVNode("code", null, "/par"),
                  createTextVNode(". The assertion contains your "),
                  createVNode("code", null, "client_id"),
                  createTextVNode(" as both "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" and "),
                  createVNode("code", null, "sub"),
                  createTextVNode(", a short "),
                  createVNode("code", null, "exp"),
                  createTextVNode(", and a unique "),
                  createVNode("code", null, "jti"),
                  createTextVNode(". The Authorization Server verifies it using your public key from the Trust Framework JWKS.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Use this as the "),
                  createVNode("code", null, "client_assertion"),
                  createTextVNode(" parameter when calling "),
                  createVNode("code", null, "/par"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Request body"),
              createVNode(_component_EdCode, {
                code: parBody,
                lang: "json"
              }),
              createVNode("h3", null, "Pre-request script"),
              createVNode(_component_EdCode, {
                code: parPre,
                lang: "javascript"
              }),
              createVNode("h3", null, "Test script"),
              createVNode(_component_EdCode, {
                code: parTest,
                lang: "javascript"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the full claim set.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "token-jwt",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Token client assertion",
        title: "GET /o3/v1.0/message-signature (/token variant)",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-30c9c989${_scopeId2}>Saves to:</strong> <code data-v-30c9c989${_scopeId2}>${ssrInterpolate(PM_PRIVATE_KEY_JWT)}</code>`);
                } else {
                  return [
                    createVNode("strong", null, "Saves to:"),
                    createTextVNode(),
                    createVNode("code", null, toDisplayString(PM_PRIVATE_KEY_JWT))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Identical request body and output to the PAR variant above. Use this to generate a <strong data-v-30c9c989${_scopeId2}>fresh client assertion for <code data-v-30c9c989${_scopeId2}>/token</code></strong> — for example when exchanging an authorization code for tokens or refreshing an access token.`);
                } else {
                  return [
                    createTextVNode("Identical request body and output to the PAR variant above. Use this to generate a "),
                    createVNode("strong", null, [
                      createTextVNode("fresh client assertion for "),
                      createVNode("code", null, "/token")
                    ]),
                    createTextVNode(" — for example when exchanging an authorization code for tokens or refreshing an access token.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A new assertion with a unique <code data-v-30c9c989${_scopeId2}>jti</code> must be generated for every request. The Authorization Server tracks seen <code data-v-30c9c989${_scopeId2}>jti</code> values and will reject replayed assertions.`);
                } else {
                  return [
                    createTextVNode("A new assertion with a unique "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" must be generated for every request. The Authorization Server tracks seen "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" values and will reject replayed assertions.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tokenBody,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Postman&#39;s <code data-v-30c9c989${_scopeId2}>${ssrInterpolate(PM_GUID)}</code> generates a new UUID on every request, so replays are avoided automatically.`);
                } else {
                  return [
                    createTextVNode("Postman's "),
                    createVNode("code", null, toDisplayString(PM_GUID)),
                    createTextVNode(" generates a new UUID on every request, so replays are avoided automatically.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Saves to:"),
                  createTextVNode(),
                  createVNode("code", null, toDisplayString(PM_PRIVATE_KEY_JWT))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Identical request body and output to the PAR variant above. Use this to generate a "),
                  createVNode("strong", null, [
                    createTextVNode("fresh client assertion for "),
                    createVNode("code", null, "/token")
                  ]),
                  createTextVNode(" — for example when exchanging an authorization code for tokens or refreshing an access token.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A new assertion with a unique "),
                  createVNode("code", null, "jti"),
                  createTextVNode(" must be generated for every request. The Authorization Server tracks seen "),
                  createVNode("code", null, "jti"),
                  createTextVNode(" values and will reject replayed assertions.")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: tokenBody,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Postman's "),
                  createVNode("code", null, toDisplayString(PM_GUID)),
                  createTextVNode(" generates a new UUID on every request, so replays are avoided automatically.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "order",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Recommended run order",
        title: "A complete service initiation flow",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: runOrder,
              lang: "text",
              filename: "Postman run order"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: runOrder,
                lang: "text",
                filename: "Postman run order"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Further reading",
        title: "Related references"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/o3-utils",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "O3 Sandbox Utilities — full reference",
              desc: "Complete request bodies, scripts, and flow diagrams for all four utility endpoints."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/message-signing",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Message Signing (JWS)",
              desc: "How to sign JWTs in your own code."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/message-encryption",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Message Encryption (JWE)",
              desc: "How to produce encrypted PII in your own code."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/tokens/client-assertion",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Client Assertion",
              desc: "Claim structure and signing requirements."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/o3-utils",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "O3 Sandbox Utilities — full reference",
                desc: "Complete request bodies, scripts, and flow diagrams for all four utility endpoints."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/message-signing",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Message Signing (JWS)",
                desc: "How to sign JWTs in your own code."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/message-encryption",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Message Encryption (JWE)",
                desc: "How to produce encrypted PII in your own code."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/tokens/client-assertion",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Client Assertion",
                desc: "Claim structure and signing requirements."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/o3-utils.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const o3Utils = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-30c9c989"]]);
export {
  o3Utils as default
};
