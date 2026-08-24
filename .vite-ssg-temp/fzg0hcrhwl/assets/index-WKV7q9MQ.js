import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-2e3ec873><section class="ed-doc__hero" data-v-2e3ec873><div class="ed-doc__inner" data-v-2e3ec873><div class="ed-doc__eyebrow" data-v-2e3ec873><span class="ed-doc__eyebrow-dash" data-v-2e3ec873></span> Security · OAuth 2.0 · OpenID Connect </div><h1 class="ed-doc__title" data-v-2e3ec873> FAPI Security Profile <span class="ed-doc__read" data-v-2e3ec873>2 min read</span></h1><p class="ed-doc__lede" data-v-2e3ec873> UAE Open Finance mandates the <strong data-v-2e3ec873>FAPI 2.0 Security Profile</strong> (<a href="https://openid.net/specs/fapi/2.0/fapi-2_0-security-profile-03.html" data-v-2e3ec873>Financial-grade API</a>) as the security foundation for all API interactions. FAPI 2.0 is an extension of OAuth 2.0 and OpenID Connect designed specifically for high-value financial APIs, where the consequences of a security breach are significant. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "mechanisms",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Key Security Mechanisms",
    title: "The four pillars of FAPI 2.0 in UAE Open Finance",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-2e3ec873${_scopeId}>Pushed Authorization Requests (PAR)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Rather than passing authorization parameters directly in a browser redirect URL (where they&#39;re visible and potentially manipulable), consent parameters are first sent server-to-server to the <code data-v-2e3ec873${_scopeId2}>/par</code> endpoint. The Authorization Server returns a short-lived <code data-v-2e3ec873${_scopeId2}>request_uri</code> which is the only thing passed in the browser redirect. `);
            } else {
              return [
                createTextVNode(" Rather than passing authorization parameters directly in a browser redirect URL (where they're visible and potentially manipulable), consent parameters are first sent server-to-server to the "),
                createVNode("code", null, "/par"),
                createTextVNode(" endpoint. The Authorization Server returns a short-lived "),
                createVNode("code", null, "request_uri"),
                createTextVNode(" which is the only thing passed in the browser redirect. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This ensures authorization parameters are never exposed in browser history or server logs. `);
            } else {
              return [
                createTextVNode(" This ensures authorization parameters are never exposed in browser history or server logs. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-2e3ec873${_scopeId}>Signed Request Objects (JAR)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The body of the <code data-v-2e3ec873${_scopeId2}>/par</code> request must be a signed JWT — a <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-2e3ec873${_scopeId2}>JSON Web Signature (JWS)</a>. This is a cryptographically signed package of claims that proves: `);
            } else {
              return [
                createTextVNode(" The body of the "),
                createVNode("code", null, "/par"),
                createTextVNode(" request must be a signed JWT — a "),
                createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "JSON Web Signature (JWS)"),
                createTextVNode(". This is a cryptographically signed package of claims that proves: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-2e3ec873${_scopeId2}><strong data-v-2e3ec873${_scopeId2}>Authenticity</strong> — the request genuinely came from your registered application</li><li data-v-2e3ec873${_scopeId2}><strong data-v-2e3ec873${_scopeId2}>Integrity</strong> — no parameter was modified in transit</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Authenticity"),
                  createTextVNode(" — the request genuinely came from your registered application")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Integrity"),
                  createTextVNode(" — no parameter was modified in transit")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-2e3ec873${_scopeId2}>Preparing the Request JWT</a> for the full structure. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                createTextVNode(" for the full structure. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-2e3ec873${_scopeId}>PKCE (Proof Key for Code Exchange)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Every authorization request includes a <code data-v-2e3ec873${_scopeId2}>code_challenge</code> derived from a secret <code data-v-2e3ec873${_scopeId2}>code_verifier</code>. When the authorization code is later exchanged for tokens, the <code data-v-2e3ec873${_scopeId2}>code_verifier</code> must be provided. This prevents authorization code interception attacks. `);
            } else {
              return [
                createTextVNode(" Every authorization request includes a "),
                createVNode("code", null, "code_challenge"),
                createTextVNode(" derived from a secret "),
                createVNode("code", null, "code_verifier"),
                createTextVNode(". When the authorization code is later exchanged for tokens, the "),
                createVNode("code", null, "code_verifier"),
                createTextVNode(" must be provided. This prevents authorization code interception attacks. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The only supported method is <code data-v-2e3ec873${_scopeId2}>S256</code> (SHA-256 hash of the verifier). `);
            } else {
              return [
                createTextVNode(" The only supported method is "),
                createVNode("code", null, "S256"),
                createTextVNode(" (SHA-256 hash of the verifier). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-2e3ec873${_scopeId}>mTLS (Mutual TLS)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All API requests use <strong data-v-2e3ec873${_scopeId2}>mutual TLS</strong> — both client and server present certificates during the TLS handshake. Your application must present its <strong data-v-2e3ec873${_scopeId2}>transport certificate</strong> (issued by the Trust Framework) to authenticate at the network level. `);
            } else {
              return [
                createTextVNode(" All API requests use "),
                createVNode("strong", null, "mutual TLS"),
                createTextVNode(" — both client and server present certificates during the TLS handshake. Your application must present its "),
                createVNode("strong", null, "transport certificate"),
                createTextVNode(" (issued by the Trust Framework) to authenticate at the network level. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This ensures that even a stolen access token cannot be used without the corresponding private key. `);
            } else {
              return [
                createTextVNode(" This ensures that even a stolen access token cannot be used without the corresponding private key. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Pushed Authorization Requests (PAR)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Rather than passing authorization parameters directly in a browser redirect URL (where they're visible and potentially manipulable), consent parameters are first sent server-to-server to the "),
              createVNode("code", null, "/par"),
              createTextVNode(" endpoint. The Authorization Server returns a short-lived "),
              createVNode("code", null, "request_uri"),
              createTextVNode(" which is the only thing passed in the browser redirect. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This ensures authorization parameters are never exposed in browser history or server logs. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Signed Request Objects (JAR)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The body of the "),
              createVNode("code", null, "/par"),
              createTextVNode(" request must be a signed JWT — a "),
              createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "JSON Web Signature (JWS)"),
              createTextVNode(". This is a cryptographically signed package of claims that proves: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Authenticity"),
                createTextVNode(" — the request genuinely came from your registered application")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Integrity"),
                createTextVNode(" — no parameter was modified in transit")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
              createTextVNode(" for the full structure. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "PKCE (Proof Key for Code Exchange)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Every authorization request includes a "),
              createVNode("code", null, "code_challenge"),
              createTextVNode(" derived from a secret "),
              createVNode("code", null, "code_verifier"),
              createTextVNode(". When the authorization code is later exchanged for tokens, the "),
              createVNode("code", null, "code_verifier"),
              createTextVNode(" must be provided. This prevents authorization code interception attacks. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The only supported method is "),
              createVNode("code", null, "S256"),
              createTextVNode(" (SHA-256 hash of the verifier). ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "mTLS (Mutual TLS)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All API requests use "),
              createVNode("strong", null, "mutual TLS"),
              createTextVNode(" — both client and server present certificates during the TLS handshake. Your application must present its "),
              createVNode("strong", null, "transport certificate"),
              createTextVNode(" (issued by the Trust Framework) to authenticate at the network level. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This ensures that even a stolen access token cannot be used without the corresponding private key. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "crypto",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Cryptographic Requirements",
    title: "Algorithms and key sizes mandated by the profile",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-2e3ec873${_scopeId2}><thead data-v-2e3ec873${_scopeId2}><tr data-v-2e3ec873${_scopeId2}><th data-v-2e3ec873${_scopeId2}>Requirement</th><th data-v-2e3ec873${_scopeId2}>Value</th></tr></thead><tbody data-v-2e3ec873${_scopeId2}><tr data-v-2e3ec873${_scopeId2}><td data-v-2e3ec873${_scopeId2}>Signing algorithm</td><td data-v-2e3ec873${_scopeId2}><code data-v-2e3ec873${_scopeId2}>PS256</code> (RSA-PSS with SHA-256)</td></tr><tr data-v-2e3ec873${_scopeId2}><td data-v-2e3ec873${_scopeId2}>Minimum RSA key size</td><td data-v-2e3ec873${_scopeId2}>2048 bits</td></tr><tr data-v-2e3ec873${_scopeId2}><td data-v-2e3ec873${_scopeId2}>Token endpoint auth method</td><td data-v-2e3ec873${_scopeId2}><code data-v-2e3ec873${_scopeId2}>private_key_jwt</code></td></tr><tr data-v-2e3ec873${_scopeId2}><td data-v-2e3ec873${_scopeId2}>Request object signing</td><td data-v-2e3ec873${_scopeId2}>Required for <code data-v-2e3ec873${_scopeId2}>/par</code></td></tr><tr data-v-2e3ec873${_scopeId2}><td data-v-2e3ec873${_scopeId2}>Encryption</td><td data-v-2e3ec873${_scopeId2}>Optional (see <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-2e3ec873${_scopeId2}>Message Encryption</a>)</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Requirement"),
                      createVNode("th", null, "Value")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Signing algorithm"),
                      createVNode("td", null, [
                        createVNode("code", null, "PS256"),
                        createTextVNode(" (RSA-PSS with SHA-256)")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Minimum RSA key size"),
                      createVNode("td", null, "2048 bits")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Token endpoint auth method"),
                      createVNode("td", null, [
                        createVNode("code", null, "private_key_jwt")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Request object signing"),
                      createVNode("td", null, [
                        createTextVNode("Required for "),
                        createVNode("code", null, "/par")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Encryption"),
                      createVNode("td", null, [
                        createTextVNode("Optional (see "),
                        createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                        createTextVNode(")")
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
                    createVNode("th", null, "Requirement"),
                    createVNode("th", null, "Value")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Signing algorithm"),
                    createVNode("td", null, [
                      createVNode("code", null, "PS256"),
                      createTextVNode(" (RSA-PSS with SHA-256)")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Minimum RSA key size"),
                    createVNode("td", null, "2048 bits")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Token endpoint auth method"),
                    createVNode("td", null, [
                      createVNode("code", null, "private_key_jwt")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Request object signing"),
                    createVNode("td", null, [
                      createTextVNode("Required for "),
                      createVNode("code", null, "/par")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Encryption"),
                    createVNode("td", null, [
                      createTextVNode("Optional (see "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                      createTextVNode(")")
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
  _push(`<section class="ed-doc__contents" data-v-2e3ec873><div class="ed-doc__inner" data-v-2e3ec873><div class="ed-doc__contents-head" data-v-2e3ec873><div class="ed-doc__contents-eyebrow" data-v-2e3ec873><span class="ed-doc__eyebrow-dash" data-v-2e3ec873></span> Section contents </div><h2 class="ed-doc__contents-title" data-v-2e3ec873>Browse this section</h2><p class="ed-doc__contents-sub" data-v-2e3ec873>The full set of pages covering the FAPI 2.0 Security Profile in UAE Open Finance.</p></div><div class="ed-doc__contents-grid" data-v-2e3ec873><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/request-jwt" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Page</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>Preparing the Request JWT</h3><p class="ed-link-card__desc" data-v-2e3ec873>Full structure of the signed JWT sent to <code data-v-2e3ec873>/par</code>.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/message-signing" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Page</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>Message Signing</h3><p class="ed-link-card__desc" data-v-2e3ec873>How to sign JWTs using PS256 — used for request objects and client assertions.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/message-encryption" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Page</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>Message Encryption</h3><p class="ed-link-card__desc" data-v-2e3ec873>How to encrypt a request object using the LFI&#39;s public key.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/receiving-events" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Page</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>Receiving Event Notifications</h3><p class="ed-link-card__desc" data-v-2e3ec873>How to decrypt inbound JWEs, verify signatures, and apply FAPI-required security checks on webhook events.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a><a class="ed-link-card" href="/knowledge-base/articles/jwt-claims" style="${ssrRenderStyle({ "--card-color": "#5b21b6" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Knowledge base</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>JWT Claim Rules</h3><p class="ed-link-card__desc" data-v-2e3ec873>Strict per-claim reference for both the Request Object and Client Assertion — <code data-v-2e3ec873>aud</code>, <code data-v-2e3ec873>jti</code>, lifetime windows, and common rejection causes.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/scopes" style="${ssrRenderStyle({ "--card-color": "var(--at-teal-deep)" })}" data-v-2e3ec873><span class="ed-link-card__top" data-v-2e3ec873></span><div class="ed-link-card__meta" data-v-2e3ec873><span class="ed-link-card__cat" data-v-2e3ec873>Page</span></div><h3 class="ed-link-card__title" data-v-2e3ec873>Scopes</h3><p class="ed-link-card__desc" data-v-2e3ec873>All OAuth 2.0 scopes available in UAE Open Finance.</p><div class="ed-link-card__foot" data-v-2e3ec873><span class="ed-link-card__cta" data-v-2e3ec873>Open</span><span class="ed-link-card__arrow" data-v-2e3ec873>→</span></div></a></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2e3ec873"]]);
export {
  index as default
};
