import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
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
const discoveryDoc = `{
  "token_endpoint":                         "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
  "introspection_endpoint":                 "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
  "revocation_endpoint":                    "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
  "pushed_authorization_request_endpoint":  "https://as1.altareq1.sandbox.apihub.openfinance.ae/par",

  "tls_client_certificate_bound_access_tokens": true,

  "mtls_endpoint_aliases": {
    "token_endpoint":                        "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
    "introspection_endpoint":                "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
    "revocation_endpoint":                   "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
    "pushed_authorization_request_endpoint": "https://as1.altareq1.sandbox.apihub.openfinance.ae/par"
  }
}`;
const nodeSnippet = `// Prefer the mTLS alias when available, fall back to the top-level endpoint.
const PAR_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.pushed_authorization_request_endpoint
  ?? discoveryDoc.pushed_authorization_request_endpoint

const TOKEN_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.token_endpoint
  ?? discoveryDoc.token_endpoint`;
const pythonSnippet = `# Prefer the mTLS alias when available, fall back to the top-level endpoint.
mtls = discovery_doc.get("mtls_endpoint_aliases", {})

par_endpoint   = mtls.get("pushed_authorization_request_endpoint") \\
    or discovery_doc["pushed_authorization_request_endpoint"]

token_endpoint = mtls.get("token_endpoint") \\
    or discovery_doc["token_endpoint"]`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mtls-endpoint-aliases",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "discovery", label: "Discovery" },
      { id: "why", label: "Why" },
      { id: "today", label: "Today" },
      { id: "pattern", label: "Safe pattern" },
      { id: "no-need", label: "What you don't need" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "5 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["mTLS", "Discovery", "FAPI 2.0"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdCode = EdCode;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-85a2abd2>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "mtls_endpoint_aliases — What It Is and When It Matters",
        meta,
        lede: "An FYI explainer for the <code>mtls_endpoint_aliases</code> object returned by <code>.well-known/openid-configuration</code>. Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge — preferring the alias keeps your client future-proof."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-85a2abd2${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-85a2abd2${_scopeId}>${ssrInterpolate(t)}</span>`);
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
        type: "info",
        title: "Low priority — informational"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-85a2abd2${_scopeId}>This is an FYI article. On the current sandbox the values inside <code data-v-85a2abd2${_scopeId}>mtls_endpoint_aliases</code> are identical to the top-level endpoints, so a TPP that ignores this object will work today. The article exists so that the day an LFI separates the two, you already know what to look for.</p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode("This is an FYI article. On the current sandbox the values inside "),
                createVNode("code", null, "mtls_endpoint_aliases"),
                createTextVNode(" are identical to the top-level endpoints, so a TPP that ignores this object will work today. The article exists so that the day an LFI separates the two, you already know what to look for.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "discovery",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Discovery",
        title: "What discovery returns",
        lede: "The LFI's <code>.well-known/openid-configuration</code> includes both top-level endpoints and a parallel <code>mtls_endpoint_aliases</code> object:",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: discoveryDoc,
              lang: "json",
              filename: ".well-known/openid-configuration"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: discoveryDoc,
                lang: "json",
                filename: ".well-known/openid-configuration"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Why the aliases exist",
        title: "An operational option for splitting mTLS surfaces",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-85a2abd2${_scopeId2}>mtls_endpoint_aliases</code> comes from <a href="https://datatracker.ietf.org/doc/html/rfc8705#section-5" data-v-85a2abd2${_scopeId2}>RFC 8705 §5</a> — <em data-v-85a2abd2${_scopeId2}>OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens</em>.`);
                } else {
                  return [
                    createVNode("code", null, "mtls_endpoint_aliases"),
                    createTextVNode(" comes from "),
                    createVNode("a", { href: "https://datatracker.ietf.org/doc/html/rfc8705#section-5" }, "RFC 8705 §5"),
                    createTextVNode(" — "),
                    createVNode("em", null, "OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs — one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows.`);
                } else {
                  return [
                    createTextVNode("The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs — one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`When <code data-v-85a2abd2${_scopeId2}>tls_client_certificate_bound_access_tokens: true</code> is set (as it is in UAE Open Finance), all token-related calls — <code data-v-85a2abd2${_scopeId2}>/par</code>, <code data-v-85a2abd2${_scopeId2}>/token</code>, <code data-v-85a2abd2${_scopeId2}>/introspection</code>, <code data-v-85a2abd2${_scopeId2}>/revocation</code> — must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to.`);
                } else {
                  return [
                    createTextVNode("When "),
                    createVNode("code", null, "tls_client_certificate_bound_access_tokens: true"),
                    createTextVNode(" is set (as it is in UAE Open Finance), all token-related calls — "),
                    createVNode("code", null, "/par"),
                    createTextVNode(", "),
                    createVNode("code", null, "/token"),
                    createTextVNode(", "),
                    createVNode("code", null, "/introspection"),
                    createTextVNode(", "),
                    createVNode("code", null, "/revocation"),
                    createTextVNode(" — must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "mtls_endpoint_aliases"),
                  createTextVNode(" comes from "),
                  createVNode("a", { href: "https://datatracker.ietf.org/doc/html/rfc8705#section-5" }, "RFC 8705 §5"),
                  createTextVNode(" — "),
                  createVNode("em", null, "OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs — one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("When "),
                  createVNode("code", null, "tls_client_certificate_bound_access_tokens: true"),
                  createTextVNode(" is set (as it is in UAE Open Finance), all token-related calls — "),
                  createVNode("code", null, "/par"),
                  createTextVNode(", "),
                  createVNode("code", null, "/token"),
                  createTextVNode(", "),
                  createVNode("code", null, "/introspection"),
                  createTextVNode(", "),
                  createVNode("code", null, "/revocation"),
                  createTextVNode(" — must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "today",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Today",
        title: "Why this is currently a non-issue",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`In UAE Open Finance today, the values inside <code data-v-85a2abd2${_scopeId2}>mtls_endpoint_aliases</code> are <strong data-v-85a2abd2${_scopeId2}>identical</strong> to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token.`);
                } else {
                  return [
                    createTextVNode("In UAE Open Finance today, the values inside "),
                    createVNode("code", null, "mtls_endpoint_aliases"),
                    createTextVNode(" are "),
                    createVNode("strong", null, "identical"),
                    createTextVNode(" to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface — a configuration change that is not currently planned.`);
                } else {
                  return [
                    createTextVNode("The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface — a configuration change that is not currently planned.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("In UAE Open Finance today, the values inside "),
                  createVNode("code", null, "mtls_endpoint_aliases"),
                  createTextVNode(" are "),
                  createVNode("strong", null, "identical"),
                  createTextVNode(" to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface — a configuration change that is not currently planned.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "pattern",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Safe pattern",
        title: "Future-proof with an alias-fallback",
        lede: "If you want to be future-proof with no runtime cost, prefer the aliased endpoint when you have your client cert attached:",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: nodeSnippet,
              lang: "typescript",
              filename: "Node.js"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: pythonSnippet,
              lang: "python",
              filename: "Python"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The same pattern applies to <code data-v-85a2abd2${_scopeId2}>introspection_endpoint</code> and <code data-v-85a2abd2${_scopeId2}>revocation_endpoint</code>.`);
                } else {
                  return [
                    createTextVNode("The same pattern applies to "),
                    createVNode("code", null, "introspection_endpoint"),
                    createTextVNode(" and "),
                    createVNode("code", null, "revocation_endpoint"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: nodeSnippet,
                lang: "typescript",
                filename: "Node.js"
              }),
              createVNode(_component_EdCode, {
                code: pythonSnippet,
                lang: "python",
                filename: "Python"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The same pattern applies to "),
                  createVNode("code", null, "introspection_endpoint"),
                  createTextVNode(" and "),
                  createVNode("code", null, "revocation_endpoint"),
                  createTextVNode(".")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "no-need",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "What you don't need",
        title: "Where the aliases don't apply",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-85a2abd2${_scopeId2}>The <code data-v-85a2abd2${_scopeId2}>authorization_endpoint</code> is browser-driven (the end user is redirected there) — it is not an mTLS call and does not appear in <code data-v-85a2abd2${_scopeId2}>mtls_endpoint_aliases</code>. Always use the top-level value.</li><li data-v-85a2abd2${_scopeId2}>You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("The "),
                      createVNode("code", null, "authorization_endpoint"),
                      createTextVNode(" is browser-driven (the end user is redirected there) — it is not an mTLS call and does not appear in "),
                      createVNode("code", null, "mtls_endpoint_aliases"),
                      createTextVNode(". Always use the top-level value.")
                    ]),
                    createVNode("li", null, "You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("The "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(" is browser-driven (the end user is redirected there) — it is not an mTLS call and does not appear in "),
                    createVNode("code", null, "mtls_endpoint_aliases"),
                    createTextVNode(". Always use the top-level value.")
                  ]),
                  createVNode("li", null, "You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.")
                ]),
                _: 1
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
              href: "https://datatracker.ietf.org/doc/html/rfc8705#section-5",
              category: "RFC",
              "category-color": "var(--at-mute)",
              title: "RFC 8705 §5",
              desc: "Metadata for Mutual-TLS Endpoint Aliases."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/trust-framework/api-discovery",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "API Discovery",
              desc: "How to fetch and consume the LFI's well-known configuration."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/security/fapi/request-jwt",
              category: "TPP Standards",
              "category-color": "var(--at-blue)",
              title: "Preparing the Request JWT",
              desc: "Building the JAR sent to /par."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "https://datatracker.ietf.org/doc/html/rfc8705#section-5",
                category: "RFC",
                "category-color": "var(--at-mute)",
                title: "RFC 8705 §5",
                desc: "Metadata for Mutual-TLS Endpoint Aliases."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/trust-framework/api-discovery",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "API Discovery",
                desc: "How to fetch and consume the LFI's well-known configuration."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/security/fapi/request-jwt",
                category: "TPP Standards",
                "category-color": "var(--at-blue)",
                title: "Preparing the Request JWT",
                desc: "Building the JAR sent to /par."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/mtls-endpoint-aliases.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mtlsEndpointAliases = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85a2abd2"]]);
export {
  mtlsEndpointAliases as default
};
