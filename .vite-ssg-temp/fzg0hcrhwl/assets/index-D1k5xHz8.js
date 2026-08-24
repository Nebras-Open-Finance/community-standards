import { defineComponent, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, resolveDynamicComponent, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { u as useLiveTpps } from "./useLiveTpps-BmXvDuHY.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./liveEcosystem-DBW_tnF2.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const SI_BASE = "/tech/lfi-api-hub/v2.1/banking/service-initiation";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(["payment"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    function paymentSubs(slug) {
      const base = `${SI_BASE}/domestic-payments/${slug}`;
      return [
        { title: "Requirements", hint: "What your Ozone Connect endpoints must validate", url: `${base}/requirements` },
        { title: "User Experience", hint: "Step-by-step customer journey at the LFI", url: `${base}/user-journeys` },
        { title: "API Guide", hint: "End-to-end implementation walk-through", url: `${base}/api-guide` }
      ];
    }
    const cards = [
      {
        tone: "gold",
        category: "Domestic payment",
        title: "Single Instant Payment",
        desc: "A one-time payment authorised and submitted in a single flow. Suited to checkout, bill settlement, and any one-known-amount payment to a known recipient.",
        url: null,
        subs: paymentSubs("single-instant-payment")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · On Demand",
        title: "Variable On Demand",
        desc: "Variable amounts within agreed limits, triggered on demand. Suited to subscription billing, wallet top-ups, and discretionary recurring charges.",
        url: null,
        subs: paymentSubs("multi-payments/variable-on-demand")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · On Demand",
        title: "Fixed On Demand",
        desc: "Fixed per-payment amount, triggered on demand within the consent period.",
        url: null,
        subs: paymentSubs("multi-payments/fixed-on-demand")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · Periodic",
        title: "Variable Periodic Schedule",
        desc: "Exactly one payment per calendar period, variable amount per payment. Suited to regular bills.",
        url: null,
        subs: paymentSubs("multi-payments/variable-periodic-schedule")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · Periodic",
        title: "Fixed Periodic Schedule",
        desc: "Exactly one payment per calendar period at a fixed amount. Suited to standing payment arrangements.",
        url: null,
        subs: paymentSubs("multi-payments/fixed-periodic-schedule")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · Defined",
        title: "Variable Defined Schedule",
        desc: "Payments locked to specific future dates set at consent time, variable amount per payment.",
        url: null,
        subs: paymentSubs("multi-payments/variable-defined-schedule")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · Defined",
        title: "Fixed Defined Schedule",
        desc: "Payments locked to specific future dates at fixed amounts. Suited to instalment plans and known future obligations.",
        url: null,
        subs: paymentSubs("multi-payments/fixed-defined-schedule")
      },
      {
        tone: "gold",
        category: "Multi-payment consent · Delegated SCA",
        title: "Delegated SCA",
        desc: "Multi-payment flows where strong customer authentication is delegated to the TPP at consent time.",
        url: null,
        subs: paymentSubs("multi-payments/delegated-sca")
      },
      {
        tone: "teal",
        category: "Repayment",
        title: "Refunds",
        desc: "Refund initiation flow against a previously-executed payment consent.",
        url: null,
        subs: [
          { title: "Requirements", hint: "What your Ozone Connect endpoints must validate", url: `${SI_BASE}/refunds/requirements` },
          { title: "API Guide", hint: "End-to-end implementation walk-through", url: `${SI_BASE}/refunds/api-guide` }
        ]
      },
      {
        tone: "navy",
        category: "Sensitive data",
        title: "Personal Identifiable Information",
        desc: "How creditor and debtor PII is presented across payment consents — encryption, payload structure, and per-LFI validation.",
        url: `${SI_BASE}/personal-identifiable-information/`,
        subs: []
      },
      {
        tone: "violet",
        category: "Approval flow",
        title: "Multi-Authorization",
        desc: "Subsequent-authoriser flows for payments that require approval from more than one customer.",
        url: `${SI_BASE}/multi-authorization`,
        subs: []
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-3d8160a0><section class="ed-landing__hero" data-v-3d8160a0><div class="ed-landing__inner" data-v-3d8160a0><div class="ed-landing__eyebrow" data-v-3d8160a0><span class="ed-landing__eyebrow-dash" data-v-3d8160a0></span> Banking · LFI capability </div><h1 class="ed-landing__title" data-v-3d8160a0> Payments (Service Initiation) <span class="ed-landing__read" data-v-3d8160a0>2 min read</span></h1><p class="ed-landing__lede" data-v-3d8160a0>The Payment Service Initiation capabilities allow customers to authorise payments at their LFI which a TPP then submits within the bounds of that authorisation. Payment types range from one-time instant payments through to long-running multi-payment consents with variable amounts, schedules, or delegated authentication.</p></div></section><section class="ed-landing__role" data-v-3d8160a0><div class="ed-landing__inner" data-v-3d8160a0><div class="ed-landing__role-card" data-v-3d8160a0><div class="ed-landing__role-meta" data-v-3d8160a0><span class="ed-landing__role-tag" data-v-3d8160a0>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-3d8160a0><span class="ed-landing__role-chip" data-v-3d8160a0>BSIP</span><h2 class="ed-landing__role-title" data-v-3d8160a0>Bank Service Initiation Provider</h2></div><p class="ed-landing__role-body" data-v-3d8160a0>Access to the Payment Service Initiation APIs requires TPPs to hold the <strong data-v-3d8160a0>BSIP</strong> role. The API Hub validates the role on every request before proxying it to the LFI. If the consent also includes data-sharing permissions (<code data-v-3d8160a0>ReadAccountsBasic</code>, <code data-v-3d8160a0>ReadAccountsDetail</code>, <code data-v-3d8160a0>ReadBalances</code>), TPPs additionally require the <strong data-v-3d8160a0>BDSP</strong> role.</p></div></div></section><section class="ed-landing__live" data-v-3d8160a0><div class="ed-landing__inner" data-v-3d8160a0><div class="ed-landing__live-head" data-v-3d8160a0><div class="ed-landing__live-eyebrow" data-v-3d8160a0><span class="ed-landing__eyebrow-dash" data-v-3d8160a0></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-3d8160a0>Who&#39;s initiating Payments</h2><p class="ed-landing__live-sub" data-v-3d8160a0>TPPs currently submitting payments across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-3d8160a0${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-3d8160a0${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-landing__live-grid" }, [
                (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                  return createVNode("div", {
                    key: i,
                    class: "ed-landing__tpp ed-landing__tpp--skel"
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(liveTpps).length) {
              _push2(`<div class="ed-landing__live-grid" data-v-3d8160a0${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp&amp;family=payment" data-v-3d8160a0${_scopeId}><div class="ed-landing__tpp-logo" data-v-3d8160a0${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-3d8160a0${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-3d8160a0${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-3d8160a0${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&amp;family=payment"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-3d8160a0${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-3d8160a0${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-3d8160a0${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-3d8160a0${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-3d8160a0${_scopeId}>No TPPs are currently active for this capability.</p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp&amp;family=payment" data-v-3d8160a0${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-3d8160a0${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-3d8160a0${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-3d8160a0${_scopeId}>→</span></a>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(liveTpps).length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "ed-landing__live-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(liveTpps), (tpp) => {
                  return openBlock(), createBlock("a", {
                    key: tpp.name,
                    class: "ed-landing__tpp",
                    title: tpp.legalName,
                    href: "/program/whats-live?type=tpp&family=payment"
                  }, [
                    createVNode("div", { class: "ed-landing__tpp-logo" }, [
                      tpp.logoUri ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: tpp.logoUri,
                        alt: tpp.legalName
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "ed-landing__tpp-initials"
                      }, toDisplayString(initials(tpp.name)), 1))
                    ]),
                    createVNode("div", { class: "ed-landing__tpp-name" }, toDisplayString(tpp.name), 1)
                  ], 8, ["title"]);
                }), 128)),
                unref(totalTppCount) > unref(liveTpps).length ? (openBlock(), createBlock("a", {
                  key: 0,
                  class: "ed-landing__tpp ed-landing__tpp--more",
                  href: "/program/whats-live?type=tpp&family=payment",
                  title: `See all ${unref(totalTppCount)} TPPs`
                }, [
                  createVNode("span", { class: "ed-landing__tpp-more-dots" }, "…"),
                  createVNode("span", { class: "ed-landing__tpp-more-label" }, "+" + toDisplayString(unref(totalTppCount) - unref(liveTpps).length) + " more", 1)
                ], 8, ["title"])) : createCommentVNode("", true)
              ])) : unref(loadError) ? (openBlock(), createBlock("p", {
                key: 1,
                class: "ed-landing__live-empty"
              }, "Live data is currently unavailable.")) : (openBlock(), createBlock("p", {
                key: 2,
                class: "ed-landing__live-empty"
              }, "No TPPs are currently active for this capability.")),
              unref(totalTppCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live?type=tpp&family=payment"
              }, [
                unref(totalTppCount) > unref(liveTpps).length ? (openBlock(), createBlock("span", { key: 0 }, " See all " + toDisplayString(unref(totalTppCount)) + " TPPs in the live ecosystem ", 1)) : (openBlock(), createBlock("span", { key: 1 }, "View in the live ecosystem dashboard")),
                createVNode("span", {
                  class: "ed-landing__live-cta-arrow",
                  "aria-hidden": "true"
                }, "→")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="ed-landing__contents" data-v-3d8160a0><div class="ed-landing__inner" data-v-3d8160a0><div class="ed-landing__contents-head" data-v-3d8160a0><div class="ed-landing__contents-eyebrow" data-v-3d8160a0><span class="ed-landing__eyebrow-dash" data-v-3d8160a0></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-3d8160a0>Browse this section</h2><p class="ed-landing__contents-sub" data-v-3d8160a0>The full set of pages for the Payments (Service Initiation) API.</p></div><div class="ed-cap-grid" data-v-3d8160a0><!--[-->`);
      ssrRenderList(cards, (card) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(card.url ? "a" : "div"), {
          key: card.title,
          href: card.url || void 0,
          class: ["ed-cap-card", `ed-cap-card--${card.tone}`]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="ed-cap-card__top" data-v-3d8160a0${_scopeId}></span><div class="ed-cap-card__head" data-v-3d8160a0${_scopeId}><div class="ed-cap-card__meta" data-v-3d8160a0${_scopeId}><span class="ed-cap-card__meta-dot" data-v-3d8160a0${_scopeId}></span> ${ssrInterpolate(card.category)}</div><h3 class="ed-cap-card__title" data-v-3d8160a0${_scopeId}>${ssrInterpolate(card.title)}</h3><p class="ed-cap-card__desc" data-v-3d8160a0${_scopeId}>${ssrInterpolate(card.desc)}</p></div>`);
              if (card.subs.length) {
                _push2(`<ul class="ed-cap-card__subs" data-v-3d8160a0${_scopeId}><!--[-->`);
                ssrRenderList(card.subs, (sub) => {
                  _push2(`<li data-v-3d8160a0${_scopeId}><a${ssrRenderAttr("href", sub.url)} class="ed-cap-card__sub" data-v-3d8160a0${_scopeId}><span class="ed-cap-card__sub-marker" data-v-3d8160a0${_scopeId}></span><span class="ed-cap-card__sub-main" data-v-3d8160a0${_scopeId}><span class="ed-cap-card__sub-title" data-v-3d8160a0${_scopeId}>${ssrInterpolate(sub.title)}</span><span class="ed-cap-card__sub-hint" data-v-3d8160a0${_scopeId}>${ssrInterpolate(sub.hint)}</span></span><span class="ed-cap-card__sub-arrow" aria-hidden="true" data-v-3d8160a0${_scopeId}>→</span></a></li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "ed-cap-card__top" }),
                createVNode("div", { class: "ed-cap-card__head" }, [
                  createVNode("div", { class: "ed-cap-card__meta" }, [
                    createVNode("span", { class: "ed-cap-card__meta-dot" }),
                    createTextVNode(" " + toDisplayString(card.category), 1)
                  ]),
                  createVNode("h3", { class: "ed-cap-card__title" }, toDisplayString(card.title), 1),
                  createVNode("p", { class: "ed-cap-card__desc" }, toDisplayString(card.desc), 1)
                ]),
                card.subs.length ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "ed-cap-card__subs"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(card.subs, (sub) => {
                    return openBlock(), createBlock("li", {
                      key: sub.url
                    }, [
                      createVNode("a", {
                        href: sub.url,
                        class: "ed-cap-card__sub"
                      }, [
                        createVNode("span", { class: "ed-cap-card__sub-marker" }),
                        createVNode("span", { class: "ed-cap-card__sub-main" }, [
                          createVNode("span", { class: "ed-cap-card__sub-title" }, toDisplayString(sub.title), 1),
                          createVNode("span", { class: "ed-cap-card__sub-hint" }, toDisplayString(sub.hint), 1)
                        ]),
                        createVNode("span", {
                          class: "ed-cap-card__sub-arrow",
                          "aria-hidden": "true"
                        }, "→")
                      ], 8, ["href"])
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }), _parent);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d8160a0"]]);
export {
  index as default
};
