import { defineComponent, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, resolveDynamicComponent, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { u as useLiveLfis } from "./useLiveLfis-BJ8PJRrF.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./liveEcosystem-DBW_tnF2.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const SI_BASE = "/tech/tpp-standards/v2.1/banking/service-initiation";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(["payment"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    function paymentSubs(slug) {
      const base = `${SI_BASE}/domestic-payments/${slug}`;
      return [
        { title: "Requirements", hint: "Validation rules and field-level constraints", url: `${base}/requirements` },
        { title: "User Experience", hint: "Step-by-step customer journey", url: `${base}/user-journeys` },
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
        desc: "Refund initiation against a previously-executed payment consent.",
        url: null,
        subs: [
          { title: "Requirements", hint: "Validation rules and field-level constraints", url: `${SI_BASE}/refunds/requirements` },
          { title: "API Guide", hint: "End-to-end implementation walk-through", url: `${SI_BASE}/refunds/api-guide` }
        ]
      },
      {
        tone: "navy",
        category: "Sensitive data",
        title: "Personal Identifiable Information",
        desc: "How creditor and debtor PII is presented and validated across payment consents — encryption, payload structure, and per-LFI validation.",
        url: `${SI_BASE}/personal-identifiable-information/`,
        subs: []
      },
      {
        tone: "violet",
        category: "Approval flow",
        title: "Multi-Authorization",
        desc: "Subsequent-authoriser flows for payments requiring approval from more than one customer.",
        url: `${SI_BASE}/multi-authorization`,
        subs: []
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-3903f74d><section class="ed-landing__hero" data-v-3903f74d><div class="ed-landing__inner" data-v-3903f74d><div class="ed-landing__eyebrow" data-v-3903f74d><span class="ed-landing__eyebrow-dash" data-v-3903f74d></span> Banking · TPP capability </div><h1 class="ed-landing__title" data-v-3903f74d> Payments (Service Initiation) <span class="ed-landing__read" data-v-3903f74d>2 min read</span></h1><p class="ed-landing__lede" data-v-3903f74d>The Open Finance Payment Service Initiation capabilities enable TPPs to initiate payments on behalf of customers under explicit, consent-driven authorisation.</p><p class="ed-landing__lede ed-landing__lede--tight" data-v-3903f74d>All payment initiations operate under explicit customer consent. The TPP requests the consent, the customer authorises it at their LFI, and the TPP may then submit payments within the bounds of what was authorised.</p></div></section><section class="ed-landing__role" data-v-3903f74d><div class="ed-landing__inner" data-v-3903f74d><div class="ed-landing__role-card" data-v-3903f74d><div class="ed-landing__role-meta" data-v-3903f74d><span class="ed-landing__role-tag" data-v-3903f74d>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-3903f74d><span class="ed-landing__role-chip" data-v-3903f74d>BSIP</span><h2 class="ed-landing__role-title" data-v-3903f74d>Bank Service Initiation Provider</h2></div><p class="ed-landing__role-body" data-v-3903f74d>Access to the Payment Service Initiation APIs requires the <strong data-v-3903f74d>BSIP</strong> role. This role must be assigned to your application in the Trust Framework before making any payment requests. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-3903f74d>Roles</a> for the full list of scopes and grant types this role permits. <br data-v-3903f74d><br data-v-3903f74d> Note — within payments there is the ability to receive a small amount of data sharing permissions. If your consent includes <code data-v-3903f74d>ReadAccountsBasic</code>, <code data-v-3903f74d>ReadAccountsDetail</code>, or <code data-v-3903f74d>ReadBalances</code>, in order to access this functionality you will also need the <strong data-v-3903f74d>BDSP</strong> role.</p></div><div class="ed-landing__caps-head" data-v-3903f74d><div class="ed-landing__caps-eyebrow" data-v-3903f74d><span class="ed-landing__eyebrow-dash" data-v-3903f74d></span> What&#39;s included </div></div><h3 class="ed-landing__role-h3" data-v-3903f74d>Single Instant Payment</h3><p class="ed-landing__role-body" data-v-3903f74d>A one-time payment initiated immediately upon consent authorisation. The TPP specifies a fixed creditor account and amount at consent time; the customer authorises and the payment is submitted in a single flow. Suitable for checkout payments, bill settlement, and any scenario where a single, known amount is being paid to a known recipient.</p><h3 class="ed-landing__role-h3" data-v-3903f74d>Multi-Payment Consents</h3><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}" data-v-3903f74d>Multi-payment consents allow a TPP to initiate a series of payments over time under a single customer authorisation. The customer authorises the consent once; the TPP can then submit payments as needed within the rules defined at consent time. There are several variants, each suited to different use cases:</p><div class="ed-cov" role="table" style="${ssrRenderStyle({ "grid-template-columns": "minmax(12rem, 16rem) repeat(3, 1fr)", "margin-bottom": "1rem" })}" data-v-3903f74d><div class="ed-cov__row ed-cov__row--head" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" data-v-3903f74d>Consent Type</div><div class="ed-cov__cell" data-v-3903f74d>Amount</div><div class="ed-cov__cell" data-v-3903f74d>Timing</div><div class="ed-cov__cell" data-v-3903f74d>Creditor</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Variable On Demand</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Variable, within limits</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>On demand</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1–10 defined, or undefined</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Fixed On Demand</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Fixed per-payment</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>On demand</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1 defined</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Variable Periodic Schedule</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Variable per payment</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Fixed schedule (1 per period)</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1 defined</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Fixed Periodic Schedule</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Fixed per payment</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Fixed schedule (1 per period)</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1 defined</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Variable Defined Schedule</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Variable per payment</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Defined dates</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1 defined</div></div><div class="ed-cov__row" role="row" data-v-3903f74d><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d><strong data-v-3903f74d>Fixed Defined Schedule</strong></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Fixed per payment</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>Defined dates</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-3903f74d>1 defined</div></div></div><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "0.85rem" })}" data-v-3903f74d><strong data-v-3903f74d>On Demand</strong> types let the TPP trigger payments at any time within the consent&#39;s period and limits, making them suitable for subscription billing, wallet top-ups, and discretionary recurring charges.</p><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "0.85rem" })}" data-v-3903f74d><strong data-v-3903f74d>Periodic Schedule</strong> types enforce exactly one payment per calendar period (e.g. weekly, monthly), making them well suited to regular bills and standing payment arrangements.</p><p class="ed-landing__role-body" data-v-3903f74d><strong data-v-3903f74d>Defined Schedule</strong> types lock payments to specific future dates set at consent time, which is ideal for instalment plans and known future obligations.</p><h3 class="ed-landing__role-h3" data-v-3903f74d>Delegated SCA</h3><p class="ed-landing__role-body" data-v-3903f74d>Delegated SCA is a variant of multi-payment consent where Strong Customer Authentication is performed by the TPP rather than the LFI. This enables a frictionless in-app payment experience — the customer authenticates once within the TPP&#39;s interface, and the LFI accepts that authentication for subsequent payments. Delegated SCA requires the TPP to hold an explicit delegation from the LFI and is subject to additional requirements. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements" data-v-3903f74d>Delegated SCA</a> for details.</p></div></section><section class="ed-landing__live" data-v-3903f74d><div class="ed-landing__inner" data-v-3903f74d><div class="ed-landing__live-head" data-v-3903f74d><div class="ed-landing__live-eyebrow" data-v-3903f74d><span class="ed-landing__eyebrow-dash" data-v-3903f74d></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-3903f74d>Which LFIs are live for Payment Initiation</h2><p class="ed-landing__live-sub" data-v-3903f74d>LFIs currently accepting payment consents across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-3903f74d${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-3903f74d${_scopeId}></div>`);
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
            if (unref(liveLfis).length) {
              _push2(`<div class="ed-landing__live-grid" data-v-3903f74d${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live?family=payment" data-v-3903f74d${_scopeId}><div class="ed-landing__tpp-logo" data-v-3903f74d${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-3903f74d${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-3903f74d${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-3903f74d${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=payment"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-3903f74d${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-3903f74d${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-3903f74d${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-3903f74d${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-3903f74d${_scopeId}>No LFIs are currently active for this capability.</p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?family=payment" data-v-3903f74d${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-3903f74d${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-3903f74d${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-3903f74d${_scopeId}>→</span></a>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(liveLfis).length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "ed-landing__live-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(liveLfis), (lfi) => {
                  return openBlock(), createBlock("a", {
                    key: lfi.key,
                    class: "ed-landing__tpp",
                    title: lfi.legalName,
                    href: "/program/whats-live?family=payment"
                  }, [
                    createVNode("div", { class: "ed-landing__tpp-logo" }, [
                      lfi.logoUri ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: lfi.logoUri,
                        alt: lfi.legalName
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "ed-landing__tpp-initials"
                      }, toDisplayString(initials(lfi.name)), 1))
                    ]),
                    createVNode("div", { class: "ed-landing__tpp-name" }, toDisplayString(lfi.name), 1)
                  ], 8, ["title"]);
                }), 128)),
                unref(totalLfiCount) > unref(liveLfis).length ? (openBlock(), createBlock("a", {
                  key: 0,
                  class: "ed-landing__tpp ed-landing__tpp--more",
                  href: "/program/whats-live?family=payment",
                  title: `See all ${unref(totalLfiCount)} LFIs`
                }, [
                  createVNode("span", { class: "ed-landing__tpp-more-dots" }, "…"),
                  createVNode("span", { class: "ed-landing__tpp-more-label" }, "+" + toDisplayString(unref(totalLfiCount) - unref(liveLfis).length) + " more", 1)
                ], 8, ["title"])) : createCommentVNode("", true)
              ])) : unref(loadError) ? (openBlock(), createBlock("p", {
                key: 1,
                class: "ed-landing__live-empty"
              }, "Live data is currently unavailable.")) : (openBlock(), createBlock("p", {
                key: 2,
                class: "ed-landing__live-empty"
              }, "No LFIs are currently active for this capability.")),
              unref(totalLfiCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live?family=payment"
              }, [
                unref(totalLfiCount) > unref(liveLfis).length ? (openBlock(), createBlock("span", { key: 0 }, " See all " + toDisplayString(unref(totalLfiCount)) + " LFIs in the live ecosystem ", 1)) : (openBlock(), createBlock("span", { key: 1 }, "View in the live ecosystem dashboard")),
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
      _push(`</div></section><section class="ed-landing__contents" data-v-3903f74d><div class="ed-landing__inner" data-v-3903f74d><div class="ed-landing__contents-head" data-v-3903f74d><div class="ed-landing__contents-eyebrow" data-v-3903f74d><span class="ed-landing__eyebrow-dash" data-v-3903f74d></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-3903f74d>Browse this section</h2><p class="ed-landing__contents-sub" data-v-3903f74d>The full set of pages for the Payments (Service Initiation) API.</p></div><div class="ed-cap-grid" data-v-3903f74d><!--[-->`);
      ssrRenderList(cards, (card) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(card.url ? "a" : "div"), {
          key: card.title,
          href: card.url || void 0,
          class: ["ed-cap-card", `ed-cap-card--${card.tone}`]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="ed-cap-card__top" data-v-3903f74d${_scopeId}></span><div class="ed-cap-card__head" data-v-3903f74d${_scopeId}><div class="ed-cap-card__meta" data-v-3903f74d${_scopeId}><span class="ed-cap-card__meta-dot" data-v-3903f74d${_scopeId}></span> ${ssrInterpolate(card.category)}</div><h3 class="ed-cap-card__title" data-v-3903f74d${_scopeId}>${ssrInterpolate(card.title)}</h3><p class="ed-cap-card__desc" data-v-3903f74d${_scopeId}>${ssrInterpolate(card.desc)}</p></div>`);
              if (card.subs.length) {
                _push2(`<ul class="ed-cap-card__subs" data-v-3903f74d${_scopeId}><!--[-->`);
                ssrRenderList(card.subs, (sub) => {
                  _push2(`<li data-v-3903f74d${_scopeId}><a${ssrRenderAttr("href", sub.url)} class="ed-cap-card__sub" data-v-3903f74d${_scopeId}><span class="ed-cap-card__sub-marker" data-v-3903f74d${_scopeId}></span><span class="ed-cap-card__sub-main" data-v-3903f74d${_scopeId}><span class="ed-cap-card__sub-title" data-v-3903f74d${_scopeId}>${ssrInterpolate(sub.title)}</span><span class="ed-cap-card__sub-hint" data-v-3903f74d${_scopeId}>${ssrInterpolate(sub.hint)}</span></span><span class="ed-cap-card__sub-arrow" aria-hidden="true" data-v-3903f74d${_scopeId}>→</span></a></li>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3903f74d"]]);
export {
  index as default
};
