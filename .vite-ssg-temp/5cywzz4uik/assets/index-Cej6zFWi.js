import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/caap/user-experience",
        cat: "User Experience",
        color: "var(--at-gold)",
        title: "User Experience",
        desc: "The end-to-end end user journey CAAP delivers &mdash; EFR / UAE Pass authentication, OTP, consent review, and the authorization page itself."
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/caap/api-guide",
        cat: "API Guide",
        color: "var(--at-teal)",
        title: "API Guide",
        desc: "Implementation guide for the CAAP Operations endpoints the LFI MUST build on Ozone Connect &mdash; registration, account and policy selection, and validation."
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/caap/pricing",
        cat: "Pricing",
        color: "var(--at-navy)",
        title: "Pricing",
        desc: "Commercial terms for adopting CAAP, including what is included in the service and what remains the LFI’s responsibility."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b7fb4b91><section class="ed-doc__hero" data-v-b7fb4b91><div class="ed-doc__inner" data-v-b7fb4b91><div class="ed-doc__eyebrow" data-v-b7fb4b91><span class="ed-doc__eyebrow-dash" data-v-b7fb4b91></span> LFI · CAAP </div><h1 class="ed-doc__title" data-v-b7fb4b91> Central Authentication and Authorization Platform <span class="ed-doc__read" data-v-b7fb4b91>3 min read</span></h1><p class="ed-doc__lede" data-v-b7fb4b91><strong data-v-b7fb4b91>CAAP</strong> is a Nebras-operated platform that handles the customer-facing authentication and consent authorisation experience on behalf of an LFI. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what-caap-is",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What CAAP is",
        title: "A Nebras-operated authentication and consent experience",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When a TPP creates a consent and the end user is redirected for authentication and authorisation, a CAAP-adopting LFI sends the end user to <strong data-v-b7fb4b91${_scopeId2}>CAAP</strong> rather than to an LFI-operated authorization endpoint. CAAP authenticates the end user (via EFR or UAE Pass), presents the consent for approval, and completes the interaction with the API Hub on the LFI&#39;s behalf. `);
                } else {
                  return [
                    createTextVNode(" When a TPP creates a consent and the end user is redirected for authentication and authorisation, a CAAP-adopting LFI sends the end user to "),
                    createVNode("strong", null, "CAAP"),
                    createTextVNode(" rather than to an LFI-operated authorization endpoint. CAAP authenticates the end user (via EFR or UAE Pass), presents the consent for approval, and completes the interaction with the API Hub on the LFI's behalf. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` CAAP also presents the consent management interface end users use to review and revoke their consents. The LFI does not build or operate either of these experiences. The LFI&#39;s integration with CAAP is server-to-server only: CAAP calls a set of CAAP Operations endpoints on the LFI&#39;s Ozone Connect server to drive identification, validation, and account / policy selection against the LFI&#39;s systems of record. `);
                } else {
                  return [
                    createTextVNode(" CAAP also presents the consent management interface end users use to review and revoke their consents. The LFI does not build or operate either of these experiences. The LFI's integration with CAAP is server-to-server only: CAAP calls a set of CAAP Operations endpoints on the LFI's Ozone Connect server to drive identification, validation, and account / policy selection against the LFI's systems of record. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When a TPP creates a consent and the end user is redirected for authentication and authorisation, a CAAP-adopting LFI sends the end user to "),
                  createVNode("strong", null, "CAAP"),
                  createTextVNode(" rather than to an LFI-operated authorization endpoint. CAAP authenticates the end user (via EFR or UAE Pass), presents the consent for approval, and completes the interaction with the API Hub on the LFI's behalf. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" CAAP also presents the consent management interface end users use to review and revoke their consents. The LFI does not build or operate either of these experiences. The LFI's integration with CAAP is server-to-server only: CAAP calls a set of CAAP Operations endpoints on the LFI's Ozone Connect server to drive identification, validation, and account / policy selection against the LFI's systems of record. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what-caap-replaces",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "What CAAP replaces",
        title: "The work an LFI no longer has to deliver",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Adopting CAAP removes two substantial pieces of Open Finance delivery from the LFI&#39;s scope. The documentation for these areas remains in this site for LFIs that operate their own implementations, but is <strong data-v-b7fb4b91${_scopeId2}>not applicable</strong> if you adopt CAAP: `);
                } else {
                  return [
                    createTextVNode(" Adopting CAAP removes two substantial pieces of Open Finance delivery from the LFI's scope. The documentation for these areas remains in this site for LFIs that operate their own implementations, but is "),
                    createVNode("strong", null, "not applicable"),
                    createTextVNode(" if you adopt CAAP: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7fb4b91${_scopeId2}><thead data-v-b7fb4b91${_scopeId2}><tr data-v-b7fb4b91${_scopeId2}><th data-v-b7fb4b91${_scopeId2}>Capability</th><th data-v-b7fb4b91${_scopeId2}>Who delivers it without CAAP</th><th data-v-b7fb4b91${_scopeId2}>Who delivers it with CAAP</th></tr></thead><tbody data-v-b7fb4b91${_scopeId2}><tr data-v-b7fb4b91${_scopeId2}><td data-v-b7fb4b91${_scopeId2}><strong data-v-b7fb4b91${_scopeId2}>Authentication and consent authorisation UX</strong></td><td data-v-b7fb4b91${_scopeId2}>LFI — see <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" data-v-b7fb4b91${_scopeId2}>Consent Journey → Authentication</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-b7fb4b91${_scopeId2}>Authorization Endpoint</a>.</td><td data-v-b7fb4b91${_scopeId2}>CAAP</td></tr><tr data-v-b7fb4b91${_scopeId2}><td data-v-b7fb4b91${_scopeId2}><strong data-v-b7fb4b91${_scopeId2}>Consent Management Interface</strong></td><td data-v-b7fb4b91${_scopeId2}>LFI — see <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" data-v-b7fb4b91${_scopeId2}>Consent Management Interface</a>.</td><td data-v-b7fb4b91${_scopeId2}>CAAP</td></tr><tr data-v-b7fb4b91${_scopeId2}><td data-v-b7fb4b91${_scopeId2}><strong data-v-b7fb4b91${_scopeId2}>Headless Heimdall and Consent Manager integration</strong></td><td data-v-b7fb4b91${_scopeId2}>LFI — see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" data-v-b7fb4b91${_scopeId2}>Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/" data-v-b7fb4b91${_scopeId2}>Consent Manager</a>.</td><td data-v-b7fb4b91${_scopeId2}>CAAP</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Capability"),
                          createVNode("th", null, "Who delivers it without CAAP"),
                          createVNode("th", null, "Who delivers it with CAAP")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Authentication and consent authorisation UX")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("LFI — see "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" }, "Consent Journey → Authentication"),
                            createTextVNode(" and "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, "CAAP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Consent Management Interface")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("LFI — see "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, "CAAP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Headless Heimdall and Consent Manager integration")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("LFI — see "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                            createTextVNode(" and "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/" }, "Consent Manager"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, "CAAP")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Still in scope for the LFI"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b7fb4b91${_scopeId2}> The LFI MUST still implement its Ozone Connect endpoints for <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/" data-v-b7fb4b91${_scopeId2}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/" data-v-b7fb4b91${_scopeId2}>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/" data-v-b7fb4b91${_scopeId2}>Insurance Data Sharing</a>, and the other Ozone Connect APIs. CAAP handles authentication and consent, not data and payments. In addition, the LFI MUST implement the CAAP Operations APIs documented in this section so that CAAP can drive end user verification, registration, PII decryption, and consent validation against the LFI&#39;s own systems of record. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The LFI MUST still implement its Ozone Connect endpoints for "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/" }, "Bank Data Sharing"),
                      createTextVNode(", "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/" }, "Bank Service Initiation"),
                      createTextVNode(", "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/insurance/" }, "Insurance Data Sharing"),
                      createTextVNode(", and the other Ozone Connect APIs. CAAP handles authentication and consent, not data and payments. In addition, the LFI MUST implement the CAAP Operations APIs documented in this section so that CAAP can drive end user verification, registration, PII decryption, and consent validation against the LFI's own systems of record. ")
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
                  createTextVNode(" Adopting CAAP removes two substantial pieces of Open Finance delivery from the LFI's scope. The documentation for these areas remains in this site for LFIs that operate their own implementations, but is "),
                  createVNode("strong", null, "not applicable"),
                  createTextVNode(" if you adopt CAAP: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Capability"),
                        createVNode("th", null, "Who delivers it without CAAP"),
                        createVNode("th", null, "Who delivers it with CAAP")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Authentication and consent authorisation UX")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("LFI — see "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" }, "Consent Journey → Authentication"),
                          createTextVNode(" and "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, "CAAP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Consent Management Interface")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("LFI — see "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, "CAAP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Headless Heimdall and Consent Manager integration")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("LFI — see "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                          createTextVNode(" and "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/" }, "Consent Manager"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, "CAAP")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Still in scope for the LFI"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The LFI MUST still implement its Ozone Connect endpoints for "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/" }, "Bank Data Sharing"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/" }, "Bank Service Initiation"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/insurance/" }, "Insurance Data Sharing"),
                    createTextVNode(", and the other Ozone Connect APIs. CAAP handles authentication and consent, not data and payments. In addition, the LFI MUST implement the CAAP Operations APIs documented in this section so that CAAP can drive end user verification, registration, PII decryption, and consent validation against the LFI's own systems of record. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="ed-doc__cards" data-v-b7fb4b91><div class="ed-doc__inner" data-v-b7fb4b91><div class="ed-doc__cards-head" data-v-b7fb4b91><div class="ed-doc__cards-eyebrow" data-v-b7fb4b91><span class="ed-doc__eyebrow-dash" data-v-b7fb4b91></span> Browse this section </div><h2 class="ed-doc__cards-title" data-v-b7fb4b91>Where to go next</h2></div><div class="ed-doc__cards-grid" data-v-b7fb4b91><!--[-->`);
      ssrRenderList(cards, (card) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", card.href)} style="${ssrRenderStyle({ "--card-color": card.color })}" data-v-b7fb4b91><span class="ed-link-card__top" data-v-b7fb4b91></span><div class="ed-link-card__meta" data-v-b7fb4b91><span class="ed-link-card__cat" data-v-b7fb4b91>${ssrInterpolate(card.cat)}</span></div><h3 class="ed-link-card__title" data-v-b7fb4b91>${ssrInterpolate(card.title)}</h3><p class="ed-link-card__desc" data-v-b7fb4b91>${card.desc ?? ""}</p><div class="ed-link-card__foot" data-v-b7fb4b91><span class="ed-link-card__cta" data-v-b7fb4b91>Open</span><span class="ed-link-card__arrow" data-v-b7fb4b91>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/caap/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7fb4b91"]]);
export {
  index as default
};
