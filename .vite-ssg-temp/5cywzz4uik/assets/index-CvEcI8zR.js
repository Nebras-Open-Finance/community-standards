import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const principles = [
      {
        num: 1,
        name: "LFIs authenticate",
        detail: `The end user MUST go through Multi-Factor Authentication (MFA) at their LFI. The API Hub
             does not perform end user authentication.`
      },
      {
        num: 2,
        name: "Parity of experience",
        detail: `The end user MUST be able to use the same authentication methods they use when accessing
             the LFI's own digital channels. Open Finance authentication MUST NOT be more
             obstructive, slower, or require more steps than the LFI's existing channels.`
      },
      {
        num: 3,
        name: "Single MFA ceremony",
        detail: `Unlike an LFI's online channels which may require authentication for login and again
             for sensitive actions, the Open Finance consent journey requires the end user to complete
             MFA <strong>once</strong> before authorization. The exception is
             <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca#step-up-authentication-for-payment-consents">step-up authentication for payment consents</a>.`
      },
      {
        num: 4,
        name: "No obstacles",
        detail: `LFIs MUST NOT introduce unnecessary delay or friction during authentication. This
             includes advertising, language that discourages TPP usage, or additional steps beyond
             what is required for authentication.`
      },
      {
        num: 5,
        name: "Immediate challenge",
        detail: `The authentication challenge MUST be presented immediately on app open or page load,
             with no preceding splash, welcome screen, or tap-to-continue. The end user arrives from
             the TPP having already expressed intent to authenticate; no further action MUST be
             required to initiate the challenge. This takes precedence over parity with the LFI's
             own channels.`
      },
      {
        num: 6,
        name: "CX certification",
        detail: `The authentication experience will be reviewed for customer experience (CX)
             compliance as part of production certification.`
      }
    ];
    const scenarios = [
      {
        scenario: "LFI app is installed",
        behaviour: `The Authorization Endpoint MUST open the LFI's native mobile app directly. No
                intermediate screens, browser pages, or app-store prompts may be shown before the
                app opens.`
      },
      {
        scenario: "LFI app is not installed",
        behaviour: `The Authorization Endpoint MUST open a mobile-optimised web page where the end user can
                complete authentication.`
      }
    ];
    const immediate = [
      {
        channel: "Native app — biometrics available",
        meaning: `The native biometric prompt (Face ID, Touch ID, fingerprint) MUST fire automatically
              as the app opens. A &ldquo;Log in with Face ID&rdquo; button that the end user must tap to
              invoke the prompt is <strong>NOT</strong> permitted.`
      },
      {
        channel: "Native app — biometrics unavailable",
        meaning: `Where the app falls back to a knowledge factor, the PIN or password entry screen
              MUST be shown immediately on app open.`
      },
      {
        channel: "Web page",
        meaning: `The credential entry form (e.g. username and password fields) MUST be the first
              screen rendered. A preceding page with a &ldquo;Log in&rdquo; button that navigates
              to the form is <strong>NOT</strong> permitted.`
      }
    ];
    const flowSteps = [
      { num: 1, text: "The TPP creates a consent and receives a redirect URI from the API Hub" },
      { num: 2, text: `The end user's device opens the LFI's <strong>Authorization Endpoint</strong>` },
      {
        num: 3,
        text: `<strong>The LFI authenticates the end user</strong> using Strong Customer Authentication (SCA)`
      },
      { num: 4, text: "The LFI presents the consent for authorization" },
      { num: 5, text: "The LFI completes the interaction and redirects back to the TPP" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_ImageViewer = ImageViewer;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c31b66e2><section class="ed-doc__hero" data-v-c31b66e2><div class="ed-doc__inner" data-v-c31b66e2><div class="ed-doc__eyebrow" data-v-c31b66e2><span class="ed-doc__eyebrow-dash" data-v-c31b66e2></span> LFI · Consent Journey · Authentication </div><h1 class="ed-doc__title" data-v-c31b66e2> Authentication <span class="ed-doc__read" data-v-c31b66e2>3 min read</span></h1><p class="ed-doc__lede" data-v-c31b66e2> When a TPP initiates a consent journey, the API Hub redirects the end user (Payment Services User) to the LFI&#39;s <strong data-v-c31b66e2>Authorization Endpoint</strong> so the end user can prove their identity. This is the <strong data-v-c31b66e2>authentication</strong> step — the end user demonstrates to the LFI that they are who they claim to be, using the same credentials and methods they use when accessing the LFI&#39;s own digital channels. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-c31b66e2> Authentication is distinct from <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/" data-v-c31b66e2>authorization</a>, which is the subsequent step where the authenticated end user reviews and approves the consent (e.g. selecting accounts, confirming a payment). </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "where-it-sits",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Step in the flow",
        title: "Where authentication sits in the consent flow",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/journeys/oauth-wireframe.png",
              alt: "OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
            }, null, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__flow" data-v-c31b66e2${_scopeId}><!--[-->`);
            ssrRenderList(flowSteps, (s) => {
              _push2(`<li data-v-c31b66e2${_scopeId}><span class="ed-doc__flow-num" data-v-c31b66e2${_scopeId}>${ssrInterpolate(s.num)}</span><span class="ed-doc__flow-text" data-v-c31b66e2${_scopeId}>${s.text ?? ""}</span></li>`);
            });
            _push2(`<!--]--></ol>`);
          } else {
            return [
              createVNode(_component_ImageViewer, {
                src: "/images/journeys/oauth-wireframe.png",
                alt: "OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
              }),
              createVNode("ol", { class: "ed-doc__flow" }, [
                (openBlock(), createBlock(Fragment, null, renderList(flowSteps, (s) => {
                  return createVNode("li", {
                    key: s.num
                  }, [
                    createVNode("span", { class: "ed-doc__flow-num" }, toDisplayString(s.num), 1),
                    createVNode("span", {
                      class: "ed-doc__flow-text",
                      innerHTML: s.text
                    }, null, 8, ["innerHTML"])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "principles",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Six rules",
        title: "Principles",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The following principles govern authentication in the Open Finance Framework: `);
                } else {
                  return [
                    createTextVNode(" The following principles govern authentication in the Open Finance Framework: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__principles" data-v-c31b66e2${_scopeId}><!--[-->`);
            ssrRenderList(principles, (p) => {
              _push2(`<li data-v-c31b66e2${_scopeId}><header class="ed-doc__principle-head" data-v-c31b66e2${_scopeId}><span class="ed-doc__principle-num" data-v-c31b66e2${_scopeId}>${ssrInterpolate(p.num.toString().padStart(2, "0"))}</span><h3 class="ed-doc__principle-name" data-v-c31b66e2${_scopeId}>${ssrInterpolate(p.name)}</h3></header><p class="ed-doc__principle-detail" data-v-c31b66e2${_scopeId}>${p.detail ?? ""}</p></li>`);
            });
            _push2(`<!--]--></ol>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The following principles govern authentication in the Open Finance Framework: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__principles" }, [
                (openBlock(), createBlock(Fragment, null, renderList(principles, (p) => {
                  return createVNode("li", {
                    key: p.num
                  }, [
                    createVNode("header", { class: "ed-doc__principle-head" }, [
                      createVNode("span", { class: "ed-doc__principle-num" }, toDisplayString(p.num.toString().padStart(2, "0")), 1),
                      createVNode("h3", { class: "ed-doc__principle-name" }, toDisplayString(p.name), 1)
                    ]),
                    createVNode("p", {
                      class: "ed-doc__principle-detail",
                      innerHTML: p.detail
                    }, null, 8, ["innerHTML"])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "app-invocation",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Native app or web",
        title: "App invocation",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI&#39;s <strong data-v-c31b66e2${_scopeId2}>Authorization Endpoint</strong> MUST support two scenarios based on the end user&#39;s device: `);
                } else {
                  return [
                    createTextVNode(" The LFI's "),
                    createVNode("strong", null, "Authorization Endpoint"),
                    createTextVNode(" MUST support two scenarios based on the end user's device: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c31b66e2${_scopeId2}><thead data-v-c31b66e2${_scopeId2}><tr data-v-c31b66e2${_scopeId2}><th data-v-c31b66e2${_scopeId2}>Scenario</th><th data-v-c31b66e2${_scopeId2}>Behaviour</th></tr></thead><tbody data-v-c31b66e2${_scopeId2}><!--[-->`);
                  ssrRenderList(scenarios, (s) => {
                    _push3(`<tr data-v-c31b66e2${_scopeId2}><td data-v-c31b66e2${_scopeId2}><strong data-v-c31b66e2${_scopeId2}>${ssrInterpolate(s.scenario)}</strong></td><td data-v-c31b66e2${_scopeId2}>${ssrInterpolate(s.behaviour)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Scenario"),
                          createVNode("th", null, "Behaviour")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(scenarios, (s) => {
                          return createVNode("tr", {
                            key: s.scenario
                          }, [
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(s.scenario), 1)
                            ]),
                            createVNode("td", null, toDisplayString(s.behaviour), 1)
                          ]);
                        }), 64))
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
                  _push3(` Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how end users typically interact with the LFI digitally. `);
                } else {
                  return [
                    createTextVNode(" Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how end users typically interact with the LFI digitally. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-c31b66e2${_scopeId}>Immediate authentication challenge</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whichever scenario applies, the authentication challenge MUST be the first thing the end user sees. No tap, button press, or intermediate screen may precede the challenge. Concretely: `);
                } else {
                  return [
                    createTextVNode(" Whichever scenario applies, the authentication challenge MUST be the first thing the end user sees. No tap, button press, or intermediate screen may precede the challenge. Concretely: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c31b66e2${_scopeId2}><thead data-v-c31b66e2${_scopeId2}><tr data-v-c31b66e2${_scopeId2}><th data-v-c31b66e2${_scopeId2}>Channel</th><th data-v-c31b66e2${_scopeId2}>What “immediate” means</th></tr></thead><tbody data-v-c31b66e2${_scopeId2}><!--[-->`);
                  ssrRenderList(immediate, (r) => {
                    _push3(`<tr data-v-c31b66e2${_scopeId2}><td data-v-c31b66e2${_scopeId2}><strong data-v-c31b66e2${_scopeId2}>${ssrInterpolate(r.channel)}</strong></td><td data-v-c31b66e2${_scopeId2}>${r.meaning ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Channel"),
                          createVNode("th", null, "What “immediate” means")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(immediate, (r) => {
                          return createVNode("tr", {
                            key: r.channel
                          }, [
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.channel), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: r.meaning
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
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
                  _push3(` This requirement takes precedence over parity with the LFI&#39;s own digital channels. If the LFI&#39;s own mobile app or website requires the user to tap a login button before the authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey — the end user has arrived from the TPP with explicit intent to authenticate and authorize, and any further action to initiate the challenge is redundant friction. `);
                } else {
                  return [
                    createTextVNode(" This requirement takes precedence over parity with the LFI's own digital channels. If the LFI's own mobile app or website requires the user to tap a login button before the authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey — the end user has arrived from the TPP with explicit intent to authenticate and authorize, and any further action to initiate the challenge is redundant friction. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI's "),
                  createVNode("strong", null, "Authorization Endpoint"),
                  createTextVNode(" MUST support two scenarios based on the end user's device: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Scenario"),
                        createVNode("th", null, "Behaviour")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(scenarios, (s) => {
                        return createVNode("tr", {
                          key: s.scenario
                        }, [
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(s.scenario), 1)
                          ]),
                          createVNode("td", null, toDisplayString(s.behaviour), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how end users typically interact with the LFI digitally. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Immediate authentication challenge"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whichever scenario applies, the authentication challenge MUST be the first thing the end user sees. No tap, button press, or intermediate screen may precede the challenge. Concretely: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Channel"),
                        createVNode("th", null, "What “immediate” means")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(immediate, (r) => {
                        return createVNode("tr", {
                          key: r.channel
                        }, [
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.channel), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: r.meaning
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This requirement takes precedence over parity with the LFI's own digital channels. If the LFI's own mobile app or website requires the user to tap a login button before the authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey — the end user has arrived from the TPP with explicit intent to authenticate and authorize, and any further action to initiate the challenge is redundant friction. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "whats-next",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "Continue reading",
        title: "What's next",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__nextcards" data-v-c31b66e2${_scopeId}><a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" class="ed-doc__nextcard" data-v-c31b66e2${_scopeId}><span class="ed-doc__nextcard-tag" data-v-c31b66e2${_scopeId}>Standards</span><h3 class="ed-doc__nextcard-title" data-v-c31b66e2${_scopeId}>Strong Customer Authentication</h3><p class="ed-doc__nextcard-desc" data-v-c31b66e2${_scopeId}> SCA requirements, prohibited methods, and CBUAE regulatory alignment. </p><span class="ed-doc__nextcard-arrow" data-v-c31b66e2${_scopeId}>→</span></a><a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation" class="ed-doc__nextcard" data-v-c31b66e2${_scopeId}><span class="ed-doc__nextcard-tag" data-v-c31b66e2${_scopeId}>Guide</span><h3 class="ed-doc__nextcard-title" data-v-c31b66e2${_scopeId}>Implementation Guide</h3><p class="ed-doc__nextcard-desc" data-v-c31b66e2${_scopeId}> Best-practice approaches for biometric authentication, device binding, and step-up flows. </p><span class="ed-doc__nextcard-arrow" data-v-c31b66e2${_scopeId}>→</span></a></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-doc__nextcards" }, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca",
                  class: "ed-doc__nextcard"
                }, [
                  createVNode("span", { class: "ed-doc__nextcard-tag" }, "Standards"),
                  createVNode("h3", { class: "ed-doc__nextcard-title" }, "Strong Customer Authentication"),
                  createVNode("p", { class: "ed-doc__nextcard-desc" }, " SCA requirements, prohibited methods, and CBUAE regulatory alignment. "),
                  createVNode("span", { class: "ed-doc__nextcard-arrow" }, "→")
                ]),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation",
                  class: "ed-doc__nextcard"
                }, [
                  createVNode("span", { class: "ed-doc__nextcard-tag" }, "Guide"),
                  createVNode("h3", { class: "ed-doc__nextcard-title" }, "Implementation Guide"),
                  createVNode("p", { class: "ed-doc__nextcard-desc" }, " Best-practice approaches for biometric authentication, device binding, and step-up flows. "),
                  createVNode("span", { class: "ed-doc__nextcard-arrow" }, "→")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/consent-journey/authentication/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c31b66e2"]]);
export {
  index as default
};
