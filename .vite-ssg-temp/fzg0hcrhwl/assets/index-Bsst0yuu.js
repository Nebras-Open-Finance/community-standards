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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-bd17b6c5><section class="ed-doc__hero" data-v-bd17b6c5><div class="ed-doc__inner" data-v-bd17b6c5><div class="ed-doc__eyebrow" data-v-bd17b6c5><span class="ed-doc__eyebrow-dash" data-v-bd17b6c5></span> Webhooks · Push notifications </div><h1 class="ed-doc__title" data-v-bd17b6c5> Webhooks — Event Notifications <span class="ed-doc__read" data-v-bd17b6c5>2 min read</span></h1><p class="ed-doc__lede" data-v-bd17b6c5> Rather than requiring TPPs to poll for status changes, UAE Open Finance supports <strong data-v-bd17b6c5>push-based event notifications</strong>. When a relevant event occurs — such as a consent being authorized or revoked, or a payment status changing — the API Hub can deliver a notification directly to your registered webhook endpoint. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "how-delivered",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "How Events Are Delivered",
    title: "HTTP POST of an encrypted, signed payload",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Events are delivered as an HTTP <code data-v-bd17b6c5${_scopeId2}>POST</code> to the webhook URL you provide along with the consent. The request body is a <strong data-v-bd17b6c5${_scopeId2}>JWE compact serialisation</strong> encrypted using the public <strong data-v-bd17b6c5${_scopeId2}>Encryption Certificate</strong> registered in the Trust Framework and in the Application that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload. `);
            } else {
              return [
                createTextVNode(" Events are delivered as an HTTP "),
                createVNode("code", null, "POST"),
                createTextVNode(" to the webhook URL you provide along with the consent. The request body is a "),
                createVNode("strong", null, "JWE compact serialisation"),
                createTextVNode(" encrypted using the public "),
                createVNode("strong", null, "Encryption Certificate"),
                createTextVNode(" registered in the Trust Framework and in the Application that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You must respond with <code data-v-bd17b6c5${_scopeId2}>202 Accepted</code> and an empty body immediately upon receipt. Decrypt and process the payload asynchronously — the Hub may retry delivery if it does not receive a timely acknowledgement. `);
            } else {
              return [
                createTextVNode(" You must respond with "),
                createVNode("code", null, "202 Accepted"),
                createTextVNode(" and an empty body immediately upon receipt. Decrypt and process the payload asynchronously — the Hub may retry delivery if it does not receive a timely acknowledgement. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/tpp-standards/security/fapi/receiving-events" data-v-bd17b6c5${_scopeId2}>Receiving Event Notifications</a> for the full decryption, signature-verification, and FAPI-required claim-validation flow — including how to use the <code data-v-bd17b6c5${_scopeId2}>kid</code> in the JWE header to select the correct private key. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                createTextVNode(" for the full decryption, signature-verification, and FAPI-required claim-validation flow — including how to use the "),
                createVNode("code", null, "kid"),
                createTextVNode(" in the JWE header to select the correct private key. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Events are delivered as an HTTP "),
              createVNode("code", null, "POST"),
              createTextVNode(" to the webhook URL you provide along with the consent. The request body is a "),
              createVNode("strong", null, "JWE compact serialisation"),
              createTextVNode(" encrypted using the public "),
              createVNode("strong", null, "Encryption Certificate"),
              createTextVNode(" registered in the Trust Framework and in the Application that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" You must respond with "),
              createVNode("code", null, "202 Accepted"),
              createTextVNode(" and an empty body immediately upon receipt. Decrypt and process the payload asynchronously — the Hub may retry delivery if it does not receive a timely acknowledgement. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
              createTextVNode(" for the full decryption, signature-verification, and FAPI-required claim-validation flow — including how to use the "),
              createVNode("code", null, "kid"),
              createTextVNode(" in the JWE header to select the correct private key. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "requirements",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Requirements",
    title: "What you need before events can be delivered",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-bd17b6c5${_scopeId2}>A webhook URL registered on your <strong data-v-bd17b6c5${_scopeId2}>Application</strong> in the Trust Framework</li><li data-v-bd17b6c5${_scopeId2}>A valid <strong data-v-bd17b6c5${_scopeId2}>Encryption Certificate</strong> on your Application — events cannot be delivered without one</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("A webhook URL registered on your "),
                  createVNode("strong", null, "Application"),
                  createTextVNode(" in the Trust Framework")
                ]),
                createVNode("li", null, [
                  createTextVNode("A valid "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(" on your Application — events cannot be delivered without one")
                ])
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
                createTextVNode("A webhook URL registered on your "),
                createVNode("strong", null, "Application"),
                createTextVNode(" in the Trust Framework")
              ]),
              createVNode("li", null, [
                createTextVNode("A valid "),
                createVNode("strong", null, "Encryption Certificate"),
                createTextVNode(" on your Application — events cannot be delivered without one")
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
    id: "available-events",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Available Events",
    title: "What the API Hub will push to you",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-bd17b6c5${_scopeId2}><thead data-v-bd17b6c5${_scopeId2}><tr data-v-bd17b6c5${_scopeId2}><th data-v-bd17b6c5${_scopeId2}>Event</th><th data-v-bd17b6c5${_scopeId2}>Trigger</th><th data-v-bd17b6c5${_scopeId2}>Guide</th></tr></thead><tbody data-v-bd17b6c5${_scopeId2}><tr data-v-bd17b6c5${_scopeId2}><td data-v-bd17b6c5${_scopeId2}>Consent Status</td><td data-v-bd17b6c5${_scopeId2}>Any consent status change (<code data-v-bd17b6c5${_scopeId2}>Authorized</code>, <code data-v-bd17b6c5${_scopeId2}>Revoked</code>, <code data-v-bd17b6c5${_scopeId2}>Expired</code>, etc.)</td><td data-v-bd17b6c5${_scopeId2}><a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" data-v-bd17b6c5${_scopeId2}>Consent Status Event</a></td></tr><tr data-v-bd17b6c5${_scopeId2}><td data-v-bd17b6c5${_scopeId2}>Payment Status</td><td data-v-bd17b6c5${_scopeId2}>Payment status update on a consent with <code data-v-bd17b6c5${_scopeId2}>subscription.Webhook.IsActive: true</code></td><td data-v-bd17b6c5${_scopeId2}><a href="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" data-v-bd17b6c5${_scopeId2}>Payment Status Event</a></td></tr><tr data-v-bd17b6c5${_scopeId2}><td data-v-bd17b6c5${_scopeId2}>Insurance Quote Status</td><td data-v-bd17b6c5${_scopeId2}>Quote lifecycle event on a quote with <code data-v-bd17b6c5${_scopeId2}>Subscription.Webhook.IsActive: true</code> (<code data-v-bd17b6c5${_scopeId2}>ApplicationPending</code>, <code data-v-bd17b6c5${_scopeId2}>ApplicationApproved</code>, <code data-v-bd17b6c5${_scopeId2}>PolicyIssued</code>, <code data-v-bd17b6c5${_scopeId2}>Completed</code>, terminal states)</td><td data-v-bd17b6c5${_scopeId2}><a href="/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" data-v-bd17b6c5${_scopeId2}>Insurance Quote Status Event</a></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Event"),
                      createVNode("th", null, "Trigger"),
                      createVNode("th", null, "Guide")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Consent Status"),
                      createVNode("td", null, [
                        createTextVNode("Any consent status change ("),
                        createVNode("code", null, "Authorized"),
                        createTextVNode(", "),
                        createVNode("code", null, "Revoked"),
                        createTextVNode(", "),
                        createVNode("code", null, "Expired"),
                        createTextVNode(", etc.)")
                      ]),
                      createVNode("td", null, [
                        createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, "Consent Status Event")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Payment Status"),
                      createVNode("td", null, [
                        createTextVNode("Payment status update on a consent with "),
                        createVNode("code", null, "subscription.Webhook.IsActive: true")
                      ]),
                      createVNode("td", null, [
                        createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, "Payment Status Event")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Insurance Quote Status"),
                      createVNode("td", null, [
                        createTextVNode("Quote lifecycle event on a quote with "),
                        createVNode("code", null, "Subscription.Webhook.IsActive: true"),
                        createTextVNode(" ("),
                        createVNode("code", null, "ApplicationPending"),
                        createTextVNode(", "),
                        createVNode("code", null, "ApplicationApproved"),
                        createTextVNode(", "),
                        createVNode("code", null, "PolicyIssued"),
                        createTextVNode(", "),
                        createVNode("code", null, "Completed"),
                        createTextVNode(", terminal states)")
                      ]),
                      createVNode("td", null, [
                        createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" }, "Insurance Quote Status Event")
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
                    createVNode("th", null, "Event"),
                    createVNode("th", null, "Trigger"),
                    createVNode("th", null, "Guide")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Consent Status"),
                    createVNode("td", null, [
                      createTextVNode("Any consent status change ("),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(", "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", etc.)")
                    ]),
                    createVNode("td", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, "Consent Status Event")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Payment Status"),
                    createVNode("td", null, [
                      createTextVNode("Payment status update on a consent with "),
                      createVNode("code", null, "subscription.Webhook.IsActive: true")
                    ]),
                    createVNode("td", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, "Payment Status Event")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Insurance Quote Status"),
                    createVNode("td", null, [
                      createTextVNode("Quote lifecycle event on a quote with "),
                      createVNode("code", null, "Subscription.Webhook.IsActive: true"),
                      createTextVNode(" ("),
                      createVNode("code", null, "ApplicationPending"),
                      createTextVNode(", "),
                      createVNode("code", null, "ApplicationApproved"),
                      createTextVNode(", "),
                      createVNode("code", null, "PolicyIssued"),
                      createTextVNode(", "),
                      createVNode("code", null, "Completed"),
                      createTextVNode(", terminal states)")
                    ]),
                    createVNode("td", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" }, "Insurance Quote Status Event")
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
  _push(`<section class="ed-doc__contents" data-v-bd17b6c5><div class="ed-doc__inner" data-v-bd17b6c5><div class="ed-doc__contents-head" data-v-bd17b6c5><div class="ed-doc__contents-eyebrow" data-v-bd17b6c5><span class="ed-doc__eyebrow-dash" data-v-bd17b6c5></span> Section contents </div><h2 class="ed-doc__contents-title" data-v-bd17b6c5>Browse this section</h2><p class="ed-doc__contents-sub" data-v-bd17b6c5>The full set of pages covering event notifications and webhooks in UAE Open Finance.</p></div><div class="ed-doc__contents-grid" data-v-bd17b6c5><a class="ed-link-card" href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-bd17b6c5><span class="ed-link-card__top" data-v-bd17b6c5></span><div class="ed-link-card__meta" data-v-bd17b6c5><span class="ed-link-card__cat" data-v-bd17b6c5>Sub-section</span></div><h3 class="ed-link-card__title" data-v-bd17b6c5>Consent Status</h3><p class="ed-link-card__desc" data-v-bd17b6c5>How consent state changes (<code data-v-bd17b6c5>Authorized</code>, <code data-v-bd17b6c5>Revoked</code>, <code data-v-bd17b6c5>Expired</code>) are pushed to your webhook.</p><div class="ed-link-card__foot" data-v-bd17b6c5><span class="ed-link-card__cta" data-v-bd17b6c5>Open</span><span class="ed-link-card__arrow" data-v-bd17b6c5>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-bd17b6c5><span class="ed-link-card__top" data-v-bd17b6c5></span><div class="ed-link-card__meta" data-v-bd17b6c5><span class="ed-link-card__cat" data-v-bd17b6c5>Sub-section</span></div><h3 class="ed-link-card__title" data-v-bd17b6c5>Payment Status</h3><p class="ed-link-card__desc" data-v-bd17b6c5>Per-payment status updates on consents that opted into webhook delivery.</p><div class="ed-link-card__foot" data-v-bd17b6c5><span class="ed-link-card__cta" data-v-bd17b6c5>Open</span><span class="ed-link-card__arrow" data-v-bd17b6c5>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-violet, #6d28d9)" })}" data-v-bd17b6c5><span class="ed-link-card__top" data-v-bd17b6c5></span><div class="ed-link-card__meta" data-v-bd17b6c5><span class="ed-link-card__cat" data-v-bd17b6c5>Sub-section</span></div><h3 class="ed-link-card__title" data-v-bd17b6c5>Insurance Quote Status</h3><p class="ed-link-card__desc" data-v-bd17b6c5>Quote lifecycle updates delivered when a TPP attaches a <code data-v-bd17b6c5>Subscription.Webhook</code> to an accepted insurance quote.</p><div class="ed-link-card__foot" data-v-bd17b6c5><span class="ed-link-card__cta" data-v-bd17b6c5>Open</span><span class="ed-link-card__arrow" data-v-bd17b6c5>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/security/fapi/receiving-events" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-bd17b6c5><span class="ed-link-card__top" data-v-bd17b6c5></span><div class="ed-link-card__meta" data-v-bd17b6c5><span class="ed-link-card__cat" data-v-bd17b6c5>Reference</span></div><h3 class="ed-link-card__title" data-v-bd17b6c5>Receiving Event Notifications</h3><p class="ed-link-card__desc" data-v-bd17b6c5>FAPI-aligned decryption, signature verification, and replay protection for inbound JWE events.</p><div class="ed-link-card__foot" data-v-bd17b6c5><span class="ed-link-card__cta" data-v-bd17b6c5>Open</span><span class="ed-link-card__arrow" data-v-bd17b6c5>→</span></div></a></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/webhooks/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bd17b6c5"]]);
export {
  index as default
};
