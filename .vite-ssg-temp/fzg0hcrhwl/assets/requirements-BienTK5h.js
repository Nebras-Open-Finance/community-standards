import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "requirements",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-41ea13f6><section class="ed-doc__hero" data-v-41ea13f6><div class="ed-doc__inner" data-v-41ea13f6><div class="ed-doc__eyebrow" data-v-41ea13f6><span class="ed-doc__eyebrow-dash" data-v-41ea13f6></span> TPP Standards · v2.2-rc1 · Consent · Requirements </div><h1 class="ed-doc__title" data-v-41ea13f6> Consent Requirements <span class="ed-doc__read" data-v-41ea13f6>2 min read</span></h1><p class="ed-doc__lede" data-v-41ea13f6> These requirements apply to all TPPs operating within UAE Open Finance, regardless of the service type. They are assessed as part of the <a href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing" data-v-41ea13f6>Functional Certification</a> certification process. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "minimal-scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Only what you need",
        title: "Minimal scope",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A consent must be <strong data-v-41ea13f6${_scopeId2}>minimally scoped</strong> — it may only request the permissions genuinely necessary to deliver the service being offered to the user at the time of authorisation. `);
                } else {
                  return [
                    createTextVNode(" A consent must be "),
                    createVNode("strong", null, "minimally scoped"),
                    createTextVNode(" — it may only request the permissions genuinely necessary to deliver the service being offered to the user at the time of authorisation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Requesting permissions speculatively, in anticipation of future features, or as a blanket grant is not permitted. If a TPP&#39;s service requires only account balances, it must not also request transaction history or beneficiary data. `);
                } else {
                  return [
                    createTextVNode(" Requesting permissions speculatively, in anticipation of future features, or as a blanket grant is not permitted. If a TPP's service requires only account balances, it must not also request transaction history or beneficiary data. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-41ea13f6${_scopeId2}> LFIs may reject a consent at the <code data-v-41ea13f6${_scopeId2}>/par</code> stage if the <code data-v-41ea13f6${_scopeId2}>authorization_details</code> object contains values that are unsupported or disproportionate to the service offered and described via the <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-41ea13f6${_scopeId2}><code data-v-41ea13f6${_scopeId2}>/participants</code> endpoint</a>. This includes: </p><ul data-v-41ea13f6${_scopeId2}><li data-v-41ea13f6${_scopeId2}>A <code data-v-41ea13f6${_scopeId2}>Permissions</code> set broader than the service the LFI supports</li><li data-v-41ea13f6${_scopeId2}> Field values the LFI does not support — for example, requesting <code data-v-41ea13f6${_scopeId2}>AccountSubType: CreditCard</code> at an LFI that only supports <code data-v-41ea13f6${_scopeId2}>CurrentAccount</code> and <code data-v-41ea13f6${_scopeId2}>Savings</code></li></ul>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" LFIs may reject a consent at the "),
                      createVNode("code", null, "/par"),
                      createTextVNode(" stage if the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" object contains values that are unsupported or disproportionate to the service offered and described via the "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, [
                        createVNode("code", null, "/participants"),
                        createTextVNode(" endpoint")
                      ]),
                      createTextVNode(". This includes: ")
                    ]),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createTextVNode("A "),
                        createVNode("code", null, "Permissions"),
                        createTextVNode(" set broader than the service the LFI supports")
                      ]),
                      createVNode("li", null, [
                        createTextVNode(" Field values the LFI does not support — for example, requesting "),
                        createVNode("code", null, "AccountSubType: CreditCard"),
                        createTextVNode(" at an LFI that only supports "),
                        createVNode("code", null, "CurrentAccount"),
                        createTextVNode(" and "),
                        createVNode("code", null, "Savings")
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
                  createTextVNode(" A consent must be "),
                  createVNode("strong", null, "minimally scoped"),
                  createTextVNode(" — it may only request the permissions genuinely necessary to deliver the service being offered to the user at the time of authorisation. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Requesting permissions speculatively, in anticipation of future features, or as a blanket grant is not permitted. If a TPP's service requires only account balances, it must not also request transaction history or beneficiary data. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" LFIs may reject a consent at the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" stage if the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" object contains values that are unsupported or disproportionate to the service offered and described via the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, [
                      createVNode("code", null, "/participants"),
                      createTextVNode(" endpoint")
                    ]),
                    createTextVNode(". This includes: ")
                  ]),
                  createVNode("ul", null, [
                    createVNode("li", null, [
                      createTextVNode("A "),
                      createVNode("code", null, "Permissions"),
                      createTextVNode(" set broader than the service the LFI supports")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Field values the LFI does not support — for example, requesting "),
                      createVNode("code", null, "AccountSubType: CreditCard"),
                      createTextVNode(" at an LFI that only supports "),
                      createVNode("code", null, "CurrentAccount"),
                      createTextVNode(" and "),
                      createVNode("code", null, "Savings")
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
        id: "consent-duration",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Bounded lifetimes",
        title: "Consent duration",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A consent&#39;s <code data-v-41ea13f6${_scopeId2}>ExpirationDateTime</code> must not exceed <strong data-v-41ea13f6${_scopeId2}>one year</strong> from the date of consent creation. Consents submitted with an expiry beyond this limit will be rejected by the API Hub. `);
                } else {
                  return [
                    createTextVNode(" A consent's "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" must not exceed "),
                    createVNode("strong", null, "one year"),
                    createTextVNode(" from the date of consent creation. Consents submitted with an expiry beyond this limit will be rejected by the API Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-41ea13f6${_scopeId2}>ExpirationDateTime</code> must reflect the minimum period required for the service. A consent must not be issued with an unnecessarily long expiry when the underlying service covers a shorter, defined period. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" must reflect the minimum period required for the service. A consent must not be issued with an unnecessarily long expiry when the underlying service covers a shorter, defined period. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A consent's "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(" must not exceed "),
                  createVNode("strong", null, "one year"),
                  createTextVNode(" from the date of consent creation. Consents submitted with an expiry beyond this limit will be rejected by the API Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(" must reflect the minimum period required for the service. A consent must not be issued with an unnecessarily long expiry when the underlying service covers a shorter, defined period. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "explicit-user-consent",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Affirmative action required",
        title: "Explicit user consent",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before any protected resource is accessed, the user must be presented with a clear, accurate consent screen at the LFI and must take an affirmative action to approve it. `);
                } else {
                  return [
                    createTextVNode(" Before any protected resource is accessed, the user must be presented with a clear, accurate consent screen at the LFI and must take an affirmative action to approve it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The consent screen is rendered by the LFI during the authorization flow and is driven directly by the <code data-v-41ea13f6${_scopeId2}>authorization_details</code> submitted in the <code data-v-41ea13f6${_scopeId2}>/par</code> request — the permissions, account scope, and expiry the user sees must <strong data-v-41ea13f6${_scopeId2}>exactly match</strong> what the TPP requested. TPPs must not present users with a pre-consent screen that describes a different scope than what is ultimately submitted to <code data-v-41ea13f6${_scopeId2}>/par</code>. `);
                } else {
                  return [
                    createTextVNode(" The consent screen is rendered by the LFI during the authorization flow and is driven directly by the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" submitted in the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request — the permissions, account scope, and expiry the user sees must "),
                    createVNode("strong", null, "exactly match"),
                    createTextVNode(" what the TPP requested. TPPs must not present users with a pre-consent screen that describes a different scope than what is ultimately submitted to "),
                    createVNode("code", null, "/par"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each service type has a defined user experience standard that governs what must be shown to the user. The consent and authorisation screens for each service type are documented in the corresponding User Experience pages, e.g. <a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/user-journeys" data-v-41ea13f6${_scopeId2}>Bank Data Sharing User Experience</a>. `);
                } else {
                  return [
                    createTextVNode(" Each service type has a defined user experience standard that governs what must be shown to the user. The consent and authorisation screens for each service type are documented in the corresponding User Experience pages, e.g. "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/user-journeys" }, "Bank Data Sharing User Experience"),
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
                  createTextVNode(" Before any protected resource is accessed, the user must be presented with a clear, accurate consent screen at the LFI and must take an affirmative action to approve it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The consent screen is rendered by the LFI during the authorization flow and is driven directly by the "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" submitted in the "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request — the permissions, account scope, and expiry the user sees must "),
                  createVNode("strong", null, "exactly match"),
                  createTextVNode(" what the TPP requested. TPPs must not present users with a pre-consent screen that describes a different scope than what is ultimately submitted to "),
                  createVNode("code", null, "/par"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each service type has a defined user experience standard that governs what must be shown to the user. The consent and authorisation screens for each service type are documented in the corresponding User Experience pages, e.g. "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/user-journeys" }, "Bank Data Sharing User Experience"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "maintaining-state",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "Stay in sync with the LFI",
        title: "Maintaining consent state accuracy",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A TPP must maintain an accurate and up-to-date record of every consent it holds in its own systems. The state of a consent can change at any time — the user may revoke it directly at the LFI, the LFI may suspend it, or it may expire — without the TPP initiating the change. `);
                } else {
                  return [
                    createTextVNode(" A TPP must maintain an accurate and up-to-date record of every consent it holds in its own systems. The state of a consent can change at any time — the user may revoke it directly at the LFI, the LFI may suspend it, or it may expire — without the TPP initiating the change. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This record must be kept current and must be accurately reflected in the <a href="/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/" data-v-41ea13f6${_scopeId2}>Consent Management Interface</a> the TPP exposes to its users, so that users can always see exactly what they have consented to and take action to revoke or amend it. `);
                } else {
                  return [
                    createTextVNode(" This record must be kept current and must be accurately reflected in the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/" }, "Consent Management Interface"),
                    createTextVNode(" the TPP exposes to its users, so that users can always see exactly what they have consented to and take action to revoke or amend it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs have two mechanisms to keep their records in sync with the LFI: `);
                } else {
                  return [
                    createTextVNode(" TPPs have two mechanisms to keep their records in sync with the LFI: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__methods" data-v-41ea13f6${_scopeId}><article class="ed-doc__method" data-v-41ea13f6${_scopeId}><header class="ed-doc__method-head" data-v-41ea13f6${_scopeId}><span class="ed-doc__method-tag" data-v-41ea13f6${_scopeId}>Mechanism A</span><h3 class="ed-doc__method-title" data-v-41ea13f6${_scopeId}>Polling</h3></header><p class="ed-doc__method-body" data-v-41ea13f6${_scopeId}> The TPP periodically calls the consent status endpoint to check the current state: </p><ul class="ed-doc__method-list" data-v-41ea13f6${_scopeId}><li data-v-41ea13f6${_scopeId}><span class="endpoint" data-v-41ea13f6${_scopeId}><span class="http-method http-method--get" data-v-41ea13f6${_scopeId}>GET</span><code data-v-41ea13f6${_scopeId}>/account-access-consents/{ConsentId}</code></span> for Bank Data Sharing consents </li><li data-v-41ea13f6${_scopeId}><span class="endpoint" data-v-41ea13f6${_scopeId}><span class="http-method http-method--get" data-v-41ea13f6${_scopeId}>GET</span><code data-v-41ea13f6${_scopeId}>/payment-consents/{ConsentId}</code></span> for Bank Service Initiation consents </li></ul><p class="ed-doc__method-body" data-v-41ea13f6${_scopeId}> Polling should be performed at a reasonable interval. Excessive polling rates are subject to rate limiting by LFIs. </p></article><article class="ed-doc__method ed-doc__method--recommended" data-v-41ea13f6${_scopeId}><header class="ed-doc__method-head" data-v-41ea13f6${_scopeId}><span class="ed-doc__method-tag" data-v-41ea13f6${_scopeId}>Mechanism B</span><h3 class="ed-doc__method-title" data-v-41ea13f6${_scopeId}> Webhooks <span class="ed-doc__method-sub" data-v-41ea13f6${_scopeId}>Event Subscriptions</span></h3></header><p class="ed-doc__method-body" data-v-41ea13f6${_scopeId}> The TPP subscribes to consent status events and is notified by the API Hub whenever a consent transitions between states (e.g. <code data-v-41ea13f6${_scopeId}>Authorized</code>, <code data-v-41ea13f6${_scopeId}>Revoked</code>, <code data-v-41ea13f6${_scopeId}>Expired</code>). This avoids the latency and overhead of polling. See <a href="/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" data-v-41ea13f6${_scopeId}>Consent Status Event</a> for the event payload and subscription model. </p></article></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A TPP must maintain an accurate and up-to-date record of every consent it holds in its own systems. The state of a consent can change at any time — the user may revoke it directly at the LFI, the LFI may suspend it, or it may expire — without the TPP initiating the change. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This record must be kept current and must be accurately reflected in the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/" }, "Consent Management Interface"),
                  createTextVNode(" the TPP exposes to its users, so that users can always see exactly what they have consented to and take action to revoke or amend it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs have two mechanisms to keep their records in sync with the LFI: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__methods" }, [
                createVNode("article", { class: "ed-doc__method" }, [
                  createVNode("header", { class: "ed-doc__method-head" }, [
                    createVNode("span", { class: "ed-doc__method-tag" }, "Mechanism A"),
                    createVNode("h3", { class: "ed-doc__method-title" }, "Polling")
                  ]),
                  createVNode("p", { class: "ed-doc__method-body" }, " The TPP periodically calls the consent status endpoint to check the current state: "),
                  createVNode("ul", { class: "ed-doc__method-list" }, [
                    createVNode("li", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/account-access-consents/{ConsentId}")
                      ]),
                      createTextVNode(" for Bank Data Sharing consents ")
                    ]),
                    createVNode("li", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payment-consents/{ConsentId}")
                      ]),
                      createTextVNode(" for Bank Service Initiation consents ")
                    ])
                  ]),
                  createVNode("p", { class: "ed-doc__method-body" }, " Polling should be performed at a reasonable interval. Excessive polling rates are subject to rate limiting by LFIs. ")
                ]),
                createVNode("article", { class: "ed-doc__method ed-doc__method--recommended" }, [
                  createVNode("header", { class: "ed-doc__method-head" }, [
                    createVNode("span", { class: "ed-doc__method-tag" }, "Mechanism B"),
                    createVNode("h3", { class: "ed-doc__method-title" }, [
                      createTextVNode(" Webhooks "),
                      createVNode("span", { class: "ed-doc__method-sub" }, "Event Subscriptions")
                    ])
                  ]),
                  createVNode("p", { class: "ed-doc__method-body" }, [
                    createTextVNode(" The TPP subscribes to consent status events and is notified by the API Hub whenever a consent transitions between states (e.g. "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(", "),
                    createVNode("code", null, "Revoked"),
                    createTextVNode(", "),
                    createVNode("code", null, "Expired"),
                    createTextVNode("). This avoids the latency and overhead of polling. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" }, "Consent Status Event"),
                    createTextVNode(" for the event payload and subscription model. ")
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/consent/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41ea13f6"]]);
export {
  requirements as default
};
