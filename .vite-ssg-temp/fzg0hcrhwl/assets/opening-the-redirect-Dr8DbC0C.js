import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4$1 } from "./RedirectLaunchGuidance-BXIJ3Tdo.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
const redirectResponse = `HTTP/1.1 303 See Other
Location: https://tpp.example.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "opening-the-redirect",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_RedirectLaunchGuidance = __unplugin_components_4$1;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e8c07b22><section class="ed-doc__hero" data-v-e8c07b22><div class="ed-doc__inner" data-v-e8c07b22><div class="ed-doc__eyebrow" data-v-e8c07b22><span class="ed-doc__eyebrow-dash" data-v-e8c07b22></span> LFI · Consent Journey · Redirect </div><h1 class="ed-doc__title" data-v-e8c07b22> Opening the Return Redirect <span class="ed-doc__read" data-v-e8c07b22>4 min read</span></h1><p class="ed-doc__lede" data-v-e8c07b22> Once the customer has authenticated and made their decision, you complete the interaction by calling <code data-v-e8c07b22>doConfirm</code> or <code data-v-e8c07b22>doFail</code> on the Headless Heimdall Auth Server. The response returns the URL to send the customer <strong data-v-e8c07b22>back to the TPP</strong>. <strong data-v-e8c07b22>How</strong> your app opens that URL is security-critical — get it wrong and you break app-to-app redirection or expose the customer to credential theft. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "the-redirect",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What you are opening",
        title: "The URL returned by doConfirm / doFail",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After you post the customer&#39;s decision, Headless Heimdall responds with an HTTP <code data-v-e8c07b22${_scopeId2}>303</code> whose <code data-v-e8c07b22${_scopeId2}>Location</code> header carries the redirect URI — the URL that returns the authorization result (or error) to the TPP. Your app is responsible for opening it: `);
                } else {
                  return [
                    createTextVNode(" After you post the customer's decision, Headless Heimdall responds with an HTTP "),
                    createVNode("code", null, "303"),
                    createTextVNode(" whose "),
                    createVNode("code", null, "Location"),
                    createTextVNode(" header carries the redirect URI — the URL that returns the authorization result (or error) to the TPP. Your app is responsible for opening it: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: redirectResponse,
              lang: "http",
              filename: "doConfirm / doFail — 303 response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This URL is the TPP&#39;s registered <code data-v-e8c07b22${_scopeId2}>redirect_uri</code>. On mobile it may be a verified deep link into the TPP&#39;s app, so opening it correctly can hand the customer straight back into the app they started in. See the endpoint references for <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" data-v-e8c07b22${_scopeId2}><code data-v-e8c07b22${_scopeId2}>doConfirm</code></a> and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" data-v-e8c07b22${_scopeId2}><code data-v-e8c07b22${_scopeId2}>doFail</code></a>, and the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-e8c07b22${_scopeId2}>Consent Journey API Guide</a> for the full flow. `);
                } else {
                  return [
                    createTextVNode(" This URL is the TPP's registered "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(". On mobile it may be a verified deep link into the TPP's app, so opening it correctly can hand the customer straight back into the app they started in. See the endpoint references for "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                      createVNode("code", null, "doConfirm")
                    ]),
                    createTextVNode(" and "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                      createVNode("code", null, "doFail")
                    ]),
                    createTextVNode(", and the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(" for the full flow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Inbound vs outbound"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8c07b22${_scopeId2}> This page covers the <strong data-v-e8c07b22${_scopeId2}>outbound</strong> redirect — sending the customer from your app back to the TPP. For the <strong data-v-e8c07b22${_scopeId2}>inbound</strong> direction — how the customer&#39;s arrival at your Authorization Endpoint opens your own app — see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-e8c07b22${_scopeId2}>Authorization Endpoint</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" This page covers the "),
                      createVNode("strong", null, "outbound"),
                      createTextVNode(" redirect — sending the customer from your app back to the TPP. For the "),
                      createVNode("strong", null, "inbound"),
                      createTextVNode(" direction — how the customer's arrival at your Authorization Endpoint opens your own app — see "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
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
                  createTextVNode(" After you post the customer's decision, Headless Heimdall responds with an HTTP "),
                  createVNode("code", null, "303"),
                  createTextVNode(" whose "),
                  createVNode("code", null, "Location"),
                  createTextVNode(" header carries the redirect URI — the URL that returns the authorization result (or error) to the TPP. Your app is responsible for opening it: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: redirectResponse,
                lang: "http",
                filename: "doConfirm / doFail — 303 response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This URL is the TPP's registered "),
                  createVNode("code", null, "redirect_uri"),
                  createTextVNode(". On mobile it may be a verified deep link into the TPP's app, so opening it correctly can hand the customer straight back into the app they started in. See the endpoint references for "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                    createVNode("code", null, "doConfirm")
                  ]),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                    createVNode("code", null, "doFail")
                  ]),
                  createTextVNode(", and the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                  createTextVNode(" for the full flow. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Inbound vs outbound"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" This page covers the "),
                    createVNode("strong", null, "outbound"),
                    createTextVNode(" redirect — sending the customer from your app back to the TPP. For the "),
                    createVNode("strong", null, "inbound"),
                    createTextVNode(" direction — how the customer's arrival at your Authorization Endpoint opens your own app — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
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
      _push(ssrRenderComponent(_component_RedirectLaunchGuidance, {
        audience: "LFI",
        "target-app": "the TPP's mobile app",
        "redirect-name": "return redirect",
        "start-num": 2
      }, {
        "web-desktop": withCtx(({ num }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdSectionBand, {
              id: "opening-outside-app",
              num,
              color: "var(--at-navy)",
              eyebrow: "Opening the link outside a mobile app",
              title: "Web and desktop: follow the 303 as a full-page redirect",
              tone: "surface"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdProse, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` If the customer authenticated in a web browser — your desktop or mobile web channel — instead of your native app, opening the return redirect is simpler. Just follow the <code data-v-e8c07b22${_scopeId3}>doConfirm</code> / <code data-v-e8c07b22${_scopeId3}>doFail</code> <code data-v-e8c07b22${_scopeId3}>303</code> as a normal <strong data-v-e8c07b22${_scopeId3}>full-page browser redirect</strong> back to the TPP&#39;s <code data-v-e8c07b22${_scopeId3}>redirect_uri</code>. `);
                      } else {
                        return [
                          createTextVNode(" If the customer authenticated in a web browser — your desktop or mobile web channel — instead of your native app, opening the return redirect is simpler. Just follow the "),
                          createVNode("code", null, "doConfirm"),
                          createTextVNode(" / "),
                          createVNode("code", null, "doFail"),
                          createTextVNode(),
                          createVNode("code", null, "303"),
                          createTextVNode(" as a normal "),
                          createVNode("strong", null, "full-page browser redirect"),
                          createTextVNode(" back to the TPP's "),
                          createVNode("code", null, "redirect_uri"),
                          createTextVNode(". ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdBullets, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li data-v-e8c07b22${_scopeId3}><strong data-v-e8c07b22${_scopeId3}>Follow the <code data-v-e8c07b22${_scopeId3}>Location</code> header at the top level of the browser</strong> — a standard <code data-v-e8c07b22${_scopeId3}>303</code> redirect. Do not wrap the return in an <code data-v-e8c07b22${_scopeId3}>&lt;iframe&gt;</code> or embedded frame.</li><li data-v-e8c07b22${_scopeId3}><strong data-v-e8c07b22${_scopeId3}>Desktop cross-device journeys</strong> — where the customer started on a desktop browser and authenticated on their phone — complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" data-v-e8c07b22${_scopeId3}>Authorization Endpoint — Desktop browser behaviour</a>.</li>`);
                      } else {
                        return [
                          createVNode("li", null, [
                            createVNode("strong", null, [
                              createTextVNode("Follow the "),
                              createVNode("code", null, "Location"),
                              createTextVNode(" header at the top level of the browser")
                            ]),
                            createTextVNode(" — a standard "),
                            createVNode("code", null, "303"),
                            createTextVNode(" redirect. Do not wrap the return in an "),
                            createVNode("code", null, "<iframe>"),
                            createTextVNode(" or embedded frame.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Desktop cross-device journeys"),
                            createTextVNode(" — where the customer started on a desktop browser and authenticated on their phone — complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                            createTextVNode(".")
                          ])
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
                        _push4(`<p data-v-e8c07b22${_scopeId3}> UK Open Banking&#39;s redirection model is domain-to-domain and full-page in both directions — the outbound screen returns the customer from the LFI domain to the TPP domain — and never embeds one party&#39;s pages inside the other. Desktop customers who authenticate on a second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint. </p>`);
                      } else {
                        return [
                          createVNode("p", null, " UK Open Banking's redirection model is domain-to-domain and full-page in both directions — the outbound screen returns the customer from the LFI domain to the TPP domain — and never embeds one party's pages inside the other. Desktop customers who authenticate on a second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint. ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdProse, null, {
                      default: withCtx(() => [
                        createTextVNode(" If the customer authenticated in a web browser — your desktop or mobile web channel — instead of your native app, opening the return redirect is simpler. Just follow the "),
                        createVNode("code", null, "doConfirm"),
                        createTextVNode(" / "),
                        createVNode("code", null, "doFail"),
                        createTextVNode(),
                        createVNode("code", null, "303"),
                        createTextVNode(" as a normal "),
                        createVNode("strong", null, "full-page browser redirect"),
                        createTextVNode(" back to the TPP's "),
                        createVNode("code", null, "redirect_uri"),
                        createTextVNode(". ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdBullets, null, {
                      default: withCtx(() => [
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("Follow the "),
                            createVNode("code", null, "Location"),
                            createTextVNode(" header at the top level of the browser")
                          ]),
                          createTextVNode(" — a standard "),
                          createVNode("code", null, "303"),
                          createTextVNode(" redirect. Do not wrap the return in an "),
                          createVNode("code", null, "<iframe>"),
                          createTextVNode(" or embedded frame.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Desktop cross-device journeys"),
                          createTextVNode(" — where the customer started on a desktop browser and authenticated on their phone — complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdNote, {
                      type: "info",
                      title: "Aligned with UK Open Banking"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, " UK Open Banking's redirection model is domain-to-domain and full-page in both directions — the outbound screen returns the customer from the LFI domain to the TPP domain — and never embeds one party's pages inside the other. Desktop customers who authenticate on a second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint. ")
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
                title: "Web and desktop: follow the 303 as a full-page redirect",
                tone: "surface"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" If the customer authenticated in a web browser — your desktop or mobile web channel — instead of your native app, opening the return redirect is simpler. Just follow the "),
                      createVNode("code", null, "doConfirm"),
                      createTextVNode(" / "),
                      createVNode("code", null, "doFail"),
                      createTextVNode(),
                      createVNode("code", null, "303"),
                      createTextVNode(" as a normal "),
                      createVNode("strong", null, "full-page browser redirect"),
                      createTextVNode(" back to the TPP's "),
                      createVNode("code", null, "redirect_uri"),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createTextVNode("Follow the "),
                          createVNode("code", null, "Location"),
                          createTextVNode(" header at the top level of the browser")
                        ]),
                        createTextVNode(" — a standard "),
                        createVNode("code", null, "303"),
                        createTextVNode(" redirect. Do not wrap the return in an "),
                        createVNode("code", null, "<iframe>"),
                        createTextVNode(" or embedded frame.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Desktop cross-device journeys"),
                        createTextVNode(" — where the customer started on a desktop browser and authenticated on their phone — complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser" }, "Authorization Endpoint — Desktop browser behaviour"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdNote, {
                    type: "info",
                    title: "Aligned with UK Open Banking"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, " UK Open Banking's redirection model is domain-to-domain and full-page in both directions — the outbound screen returns the customer from the LFI domain to the TPP domain — and never embeds one party's pages inside the other. Desktop customers who authenticate on a second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-journey/opening-the-redirect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const openingTheRedirect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e8c07b22"]]);
export {
  openingTheRedirect as default
};
