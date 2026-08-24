import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4$1 } from "./RedirectLaunchGuidance-BXIJ3Tdo.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./EdRefTable-B_zH_eaF.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const redirectUrl = `https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth?client_id={clientId}&response_type=code&request_uri={request_uri}`;
const webRedirectCode = `// Browser-based web app — top-level, full-page navigation.
// authorizationUrl = authorization_endpoint + client_id, response_type, request_uri
window.location.assign(authorizationUrl)

// Server-side equivalent (e.g. Express):
// res.redirect(303, authorizationUrl)`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "opening-the-redirect",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_RedirectLaunchGuidance = __unplugin_components_4$1;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-88b850db><section class="ed-doc__hero" data-v-88b850db><div class="ed-doc__inner" data-v-88b850db><div class="ed-doc__eyebrow" data-v-88b850db><span class="ed-doc__eyebrow-dash" data-v-88b850db></span> Security · FAPI · Redirect </div><h1 class="ed-doc__title" data-v-88b850db> Opening the Authorization Redirect <span class="ed-doc__read" data-v-88b850db>4 min read</span></h1><p class="ed-doc__lede" data-v-88b850db> After you submit a <code data-v-88b850db>/par</code> request, you construct the authorization URL and send the customer to the LFI&#39;s <strong data-v-88b850db>Authorization Endpoint</strong> to authenticate and authorise the consent. <strong data-v-88b850db>How</strong> your application opens that URL is security-critical — get it wrong and you break app-to-app redirection or expose the customer to credential theft. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "the-redirect",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What you are opening",
        title: "The authorization URL built from the /par response",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub returns a <code data-v-88b850db${_scopeId2}>request_uri</code> from your <a href="/tech/tpp-standards/v2.1/consent/api-guide" data-v-88b850db${_scopeId2}>PAR request</a>. You combine it with the LFI&#39;s <code data-v-88b850db${_scopeId2}>authorization_endpoint</code> (read from <a href="/tech/tpp-standards/trust-framework/well-known/" data-v-88b850db${_scopeId2}><code data-v-88b850db${_scopeId2}>.well-known/openid-configuration</code></a>) to build the redirect URL: `);
                } else {
                  return [
                    createTextVNode(" The API Hub returns a "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(" from your "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "PAR request"),
                    createTextVNode(". You combine it with the LFI's "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(" (read from "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known/" }, [
                      createVNode("code", null, ".well-known/openid-configuration")
                    ]),
                    createTextVNode(") to build the redirect URL: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: redirectUrl,
              lang: "plaintext",
              filename: "Authorization URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This URL is a stable, publicly accessible HTTPS endpoint owned by the LFI. On mobile it is configured as a verified deep link, so opening it correctly can hand the customer straight into the LFI&#39;s banking app. The guidance below covers how to open it from within your app; once the customer finishes at the LFI, they are redirected back to your <code data-v-88b850db${_scopeId2}>redirect_uri</code> — see <a href="/tech/tpp-standards/security/fapi/handling-callback" data-v-88b850db${_scopeId2}>Handling Authorization Callbacks</a>. `);
                } else {
                  return [
                    createTextVNode(" This URL is a stable, publicly accessible HTTPS endpoint owned by the LFI. On mobile it is configured as a verified deep link, so opening it correctly can hand the customer straight into the LFI's banking app. The guidance below covers how to open it from within your app; once the customer finishes at the LFI, they are redirected back to your "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(" — see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub returns a "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(" from your "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "PAR request"),
                  createTextVNode(". You combine it with the LFI's "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(" (read from "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known/" }, [
                    createVNode("code", null, ".well-known/openid-configuration")
                  ]),
                  createTextVNode(") to build the redirect URL: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: redirectUrl,
                lang: "plaintext",
                filename: "Authorization URL"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This URL is a stable, publicly accessible HTTPS endpoint owned by the LFI. On mobile it is configured as a verified deep link, so opening it correctly can hand the customer straight into the LFI's banking app. The guidance below covers how to open it from within your app; once the customer finishes at the LFI, they are redirected back to your "),
                  createVNode("code", null, "redirect_uri"),
                  createTextVNode(" — see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_RedirectLaunchGuidance, {
        audience: "TPP",
        "target-app": "the LFI's mobile banking app",
        "redirect-name": "authorization redirect",
        "start-num": 2
      }, {
        "web-desktop": withCtx(({ num }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdSectionBand, {
              id: "opening-outside-app",
              num,
              color: "var(--at-navy)",
              eyebrow: "Opening the link outside a mobile app",
              title: "Web and desktop: full-page redirect, never an iframe",
              tone: "surface"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdProse, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` If your app runs in a web browser instead of as a native mobile app — on desktop or mobile web — opening the redirect is simpler. Send the customer to the LFI&#39;s Authorization Endpoint with a normal <strong data-v-88b850db${_scopeId3}>full-page browser redirect</strong>. `);
                      } else {
                        return [
                          createTextVNode(" If your app runs in a web browser instead of as a native mobile app — on desktop or mobile web — opening the redirect is simpler. Send the customer to the LFI's Authorization Endpoint with a normal "),
                          createVNode("strong", null, "full-page browser redirect"),
                          createTextVNode(". ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCode, {
                    code: webRedirectCode,
                    lang: "typescript",
                    filename: "Full-page redirect"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdBullets, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li data-v-88b850db${_scopeId3}><strong data-v-88b850db${_scopeId3}>Navigate the whole page</strong> — <code data-v-88b850db${_scopeId3}>window.location.assign(url)</code> client-side, or a <code data-v-88b850db${_scopeId3}>302</code>/<code data-v-88b850db${_scopeId3}>303</code> from your server. The customer sees the LFI&#39;s real domain in the address bar, a key anti-phishing signal.</li><li data-v-88b850db${_scopeId3}><strong data-v-88b850db${_scopeId3}>Never render the LFI&#39;s authorization or authentication screens in an <code data-v-88b850db${_scopeId3}>&lt;iframe&gt;</code> or embedded frame</strong> (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition — the same RFC 8252 / FAPI rationale, plus clickjacking — and the LFI sends frame-busting headers that will block it regardless.</li><li data-v-88b850db${_scopeId3}><strong data-v-88b850db${_scopeId3}>Avoid popups and new tabs or windows</strong> — popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice.</li><li data-v-88b850db${_scopeId3}><strong data-v-88b850db${_scopeId3}>Preserve <code data-v-88b850db${_scopeId3}>state</code> and the PKCE <code data-v-88b850db${_scopeId3}>code_verifier</code></strong> in server-side session or secure storage so they survive the round-trip.</li>`);
                      } else {
                        return [
                          createVNode("li", null, [
                            createVNode("strong", null, "Navigate the whole page"),
                            createTextVNode(" — "),
                            createVNode("code", null, "window.location.assign(url)"),
                            createTextVNode(" client-side, or a "),
                            createVNode("code", null, "302"),
                            createTextVNode("/"),
                            createVNode("code", null, "303"),
                            createTextVNode(" from your server. The customer sees the LFI's real domain in the address bar, a key anti-phishing signal.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, [
                              createTextVNode("Never render the LFI's authorization or authentication screens in an "),
                              createVNode("code", null, "<iframe>"),
                              createTextVNode(" or embedded frame")
                            ]),
                            createTextVNode(" (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition — the same RFC 8252 / FAPI rationale, plus clickjacking — and the LFI sends frame-busting headers that will block it regardless.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Avoid popups and new tabs or windows"),
                            createTextVNode(" — popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, [
                              createTextVNode("Preserve "),
                              createVNode("code", null, "state"),
                              createTextVNode(" and the PKCE "),
                              createVNode("code", null, "code_verifier")
                            ]),
                            createTextVNode(" in server-side session or secure storage so they survive the round-trip.")
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdProse, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` On <strong data-v-88b850db${_scopeId3}>desktop</strong>, handing the customer to a mobile app is the LFI&#39;s responsibility once they land on the Authorization Endpoint — via QR scan, push-to-app, or browser-based authentication. Your job is only the full-page redirect. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" data-v-88b850db${_scopeId3}>Authorization Endpoint — Desktop browser behaviour</a>. `);
                      } else {
                        return [
                          createTextVNode(" On "),
                          createVNode("strong", null, "desktop"),
                          createTextVNode(", handing the customer to a mobile app is the LFI's responsibility once they land on the Authorization Endpoint — via QR scan, push-to-app, or browser-based authentication. Your job is only the full-page redirect. See "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                          createTextVNode(". ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdNote, {
                    type: "info",
                    title: "Aligned with UK Open Banking"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-88b850db${_scopeId3}> UK Open Banking&#39;s redirection model is always domain-to-domain and full-page — an inbound screen (TPP domain → LFI domain) and an outbound screen (LFI domain → TPP domain) — which explicitly excludes iframes and embedded webviews. Desktop customers who need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off. </p>`);
                      } else {
                        return [
                          createVNode("p", null, " UK Open Banking's redirection model is always domain-to-domain and full-page — an inbound screen (TPP domain → LFI domain) and an outbound screen (LFI domain → TPP domain) — which explicitly excludes iframes and embedded webviews. Desktop customers who need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off. ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdProse, null, {
                      default: withCtx(() => [
                        createTextVNode(" If your app runs in a web browser instead of as a native mobile app — on desktop or mobile web — opening the redirect is simpler. Send the customer to the LFI's Authorization Endpoint with a normal "),
                        createVNode("strong", null, "full-page browser redirect"),
                        createTextVNode(". ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCode, {
                      code: webRedirectCode,
                      lang: "typescript",
                      filename: "Full-page redirect"
                    }),
                    createVNode(_component_EdBullets, null, {
                      default: withCtx(() => [
                        createVNode("li", null, [
                          createVNode("strong", null, "Navigate the whole page"),
                          createTextVNode(" — "),
                          createVNode("code", null, "window.location.assign(url)"),
                          createTextVNode(" client-side, or a "),
                          createVNode("code", null, "302"),
                          createTextVNode("/"),
                          createVNode("code", null, "303"),
                          createTextVNode(" from your server. The customer sees the LFI's real domain in the address bar, a key anti-phishing signal.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("Never render the LFI's authorization or authentication screens in an "),
                            createVNode("code", null, "<iframe>"),
                            createTextVNode(" or embedded frame")
                          ]),
                          createTextVNode(" (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition — the same RFC 8252 / FAPI rationale, plus clickjacking — and the LFI sends frame-busting headers that will block it regardless.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Avoid popups and new tabs or windows"),
                          createTextVNode(" — popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("Preserve "),
                            createVNode("code", null, "state"),
                            createTextVNode(" and the PKCE "),
                            createVNode("code", null, "code_verifier")
                          ]),
                          createTextVNode(" in server-side session or secure storage so they survive the round-trip.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdProse, null, {
                      default: withCtx(() => [
                        createTextVNode(" On "),
                        createVNode("strong", null, "desktop"),
                        createTextVNode(", handing the customer to a mobile app is the LFI's responsibility once they land on the Authorization Endpoint — via QR scan, push-to-app, or browser-based authentication. Your job is only the full-page redirect. See "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                        createTextVNode(". ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdNote, {
                      type: "info",
                      title: "Aligned with UK Open Banking"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, " UK Open Banking's redirection model is always domain-to-domain and full-page — an inbound screen (TPP domain → LFI domain) and an outbound screen (LFI domain → TPP domain) — which explicitly excludes iframes and embedded webviews. Desktop customers who need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdSectionBand, {
                id: "opening-outside-app",
                num,
                color: "var(--at-navy)",
                eyebrow: "Opening the link outside a mobile app",
                title: "Web and desktop: full-page redirect, never an iframe",
                tone: "surface"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" If your app runs in a web browser instead of as a native mobile app — on desktop or mobile web — opening the redirect is simpler. Send the customer to the LFI's Authorization Endpoint with a normal "),
                      createVNode("strong", null, "full-page browser redirect"),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCode, {
                    code: webRedirectCode,
                    lang: "typescript",
                    filename: "Full-page redirect"
                  }),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createVNode("strong", null, "Navigate the whole page"),
                        createTextVNode(" — "),
                        createVNode("code", null, "window.location.assign(url)"),
                        createTextVNode(" client-side, or a "),
                        createVNode("code", null, "302"),
                        createTextVNode("/"),
                        createVNode("code", null, "303"),
                        createTextVNode(" from your server. The customer sees the LFI's real domain in the address bar, a key anti-phishing signal.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createTextVNode("Never render the LFI's authorization or authentication screens in an "),
                          createVNode("code", null, "<iframe>"),
                          createTextVNode(" or embedded frame")
                        ]),
                        createTextVNode(" (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition — the same RFC 8252 / FAPI rationale, plus clickjacking — and the LFI sends frame-busting headers that will block it regardless.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Avoid popups and new tabs or windows"),
                        createTextVNode(" — popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createTextVNode("Preserve "),
                          createVNode("code", null, "state"),
                          createTextVNode(" and the PKCE "),
                          createVNode("code", null, "code_verifier")
                        ]),
                        createTextVNode(" in server-side session or secure storage so they survive the round-trip.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" On "),
                      createVNode("strong", null, "desktop"),
                      createTextVNode(", handing the customer to a mobile app is the LFI's responsibility once they land on the Authorization Endpoint — via QR scan, push-to-app, or browser-based authentication. Your job is only the full-page redirect. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdNote, {
                    type: "info",
                    title: "Aligned with UK Open Banking"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, " UK Open Banking's redirection model is always domain-to-domain and full-page — an inbound screen (TPP domain → LFI domain) and an outbound screen (LFI domain → TPP domain) — which explicitly excludes iframes and embedded webviews. Desktop customers who need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["num"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/opening-the-redirect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const openingTheRedirect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-88b850db"]]);
export {
  openingTheRedirect as default
};
