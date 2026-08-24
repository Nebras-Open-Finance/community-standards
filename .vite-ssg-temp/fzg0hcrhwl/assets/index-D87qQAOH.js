import { defineComponent, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { u as useLiveTpps } from "./useLiveTpps-BmXvDuHY.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./liveEcosystem-DBW_tnF2.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(
      ["account-information", "payment", "confirmation", "product", "atm"],
      6
    );
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const capabilities = [
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/",
        cat: "Bank Data Sharing",
        color: "var(--at-teal)",
        title: "Bank Data Sharing",
        body: "Expose account, balance, transaction, beneficiary, direct debit, standing order, scheduled payment, and party information to consented TPPs. Permissions such as <code>ReadAccountsBasic</code>, <code>ReadBalances</code>, and <code>ReadTransactionsDetail</code> control which fields are returned, with data filtered by consent expiry and date ranges.",
        highlights: ["Account & balance information", "Transaction & statement history", "Standing orders, direct debits, beneficiaries", "Party & product information"]
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/",
        cat: "Service Initiation",
        color: "var(--at-gold, #b08800)",
        title: "Service Initiation (Payments)",
        body: "Receive and execute domestic payments instructed by TPPs after the customer has authorised consent at your authorisation server. Covers single instant payments, multi-payment consents (fixed/variable on-demand, periodic schedule, defined schedule), Delegated SCA, and refund retrieval.",
        highlights: ["Single Instant Payments", "Multi-payment consents (6 variants)", "Delegated SCA", "Refunds & multi-authorisation"]
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/",
        cat: "Confirmation of Payee",
        color: "var(--at-blue-deep, #1d4ed8)",
        title: "Confirmation of Payee (CoP)",
        body: "Respond to TPP requests that verify whether a payee’s name matches the account holder before a payment executes. Implements both the discovery step (resolve LFI from an IBAN) and the confirmation step that returns Yes / Partial / No match indicators.",
        highlights: ["Discovery by IBAN", "Name match check", "Yes / Partial / No outcomes", "Reduces APP fraud risk"]
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/",
        cat: "Products & Leads",
        color: "var(--at-navy)",
        title: "Products & Leads",
        body: "Publish your product catalogue (savings, current accounts, credit cards, finance, mortgages) and receive customer leads forwarded by TPPs for product origination. Filter by Sharia compliance, product category, and last-updated date, with retail and business products both supported.",
        highlights: ["Public product catalogues", "Sharia compliance filter", "Receive leads from TPPs", "Retail & business products"]
      },
      {
        href: "/tech/lfi-api-hub/v2.2-rc1/banking/atms/",
        cat: "ATMs",
        color: "var(--at-teal-deep)",
        title: "ATMs",
        body: "Publish ATM location, service, accessibility, fee, and availability data to TPPs. Read-only and public &mdash; no customer consent or redirect required. Each ATM record includes location, supported services, accessibility features, fees, and withdrawal limits.",
        highlights: ["Locations & GPS coordinates", "Supported services & currencies", "Accessibility features", "Fees & withdrawal limits"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-361a482c><section class="ed-landing__hero" data-v-361a482c><div class="ed-landing__inner" data-v-361a482c><div class="ed-landing__eyebrow" data-v-361a482c><span class="ed-landing__eyebrow-dash" data-v-361a482c></span> LFI Standards · v2.2-rc1 · Banking </div><h1 class="ed-landing__title" data-v-361a482c> Banking <span class="ed-landing__read" data-v-361a482c>2 min read</span></h1><p class="ed-landing__lede" data-v-361a482c> The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification — empowering third-party providers (TPPs) with the tools they need to enhance user experience and financial services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-361a482c> All services operate under strict consent management and granular data access permissions, mediated and validated by the API Hub. </p></div></section><section class="ed-landing__live" data-v-361a482c><div class="ed-landing__inner" data-v-361a482c><div class="ed-landing__live-head" data-v-361a482c><div class="ed-landing__live-eyebrow" data-v-361a482c><span class="ed-landing__eyebrow-dash" data-v-361a482c></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-361a482c>Which TPPs are consuming Banking APIs</h2><p class="ed-landing__live-sub" data-v-361a482c> TPPs currently calling Banking endpoints — across data sharing, payments, CoP, products, and ATMs — in the last 30 days. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-361a482c${_scopeId}><!--[-->`);
            ssrRenderList(6, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-361a482c${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-landing__live-grid" }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
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
              _push2(`<div class="ed-landing__live-grid" data-v-361a482c${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp" data-v-361a482c${_scopeId}><div class="ed-landing__tpp-logo" data-v-361a482c${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-361a482c${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-361a482c${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-361a482c${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-361a482c${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-361a482c${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-361a482c${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-361a482c${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-361a482c${_scopeId}>No TPPs are currently consuming Banking APIs.</p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp" data-v-361a482c${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-361a482c${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-361a482c${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-361a482c${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?type=tpp"
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
                  href: "/program/whats-live?type=tpp",
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
              }, "No TPPs are currently consuming Banking APIs.")),
              unref(totalTppCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live?type=tpp"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-361a482c><div class="ed-landing__inner" data-v-361a482c><div class="ed-landing__contents-head" data-v-361a482c><div class="ed-landing__contents-eyebrow" data-v-361a482c><span class="ed-landing__eyebrow-dash" data-v-361a482c></span> Capabilities </div><h2 class="ed-landing__contents-title" data-v-361a482c>Browse the Banking capabilities</h2><p class="ed-landing__contents-sub" data-v-361a482c>The full set of capability areas an LFI implements as part of UAE Open Finance Banking.</p></div><div class="ed-landing__contents-grid ed-landing__contents-grid--lg" data-v-361a482c><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<a class="ed-link-card ed-link-card--lg"${ssrRenderAttr("href", cap.href)} style="${ssrRenderStyle({ "--card-color": cap.color })}" data-v-361a482c><span class="ed-link-card__top" data-v-361a482c></span><div class="ed-link-card__meta" data-v-361a482c><span class="ed-link-card__cat" data-v-361a482c>${ssrInterpolate(cap.cat)}</span></div><h3 class="ed-link-card__title" data-v-361a482c>${ssrInterpolate(cap.title)}</h3><p class="ed-link-card__desc" data-v-361a482c>${cap.body ?? ""}</p><ul class="ed-link-card__highlights" data-v-361a482c><!--[-->`);
        ssrRenderList(cap.highlights, (h) => {
          _push(`<li data-v-361a482c>${ssrInterpolate(h)}</li>`);
        });
        _push(`<!--]--></ul><div class="ed-link-card__foot" data-v-361a482c><span class="ed-link-card__cta" data-v-361a482c>Open</span><span class="ed-link-card__arrow" data-v-361a482c>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-361a482c"]]);
export {
  index as default
};
