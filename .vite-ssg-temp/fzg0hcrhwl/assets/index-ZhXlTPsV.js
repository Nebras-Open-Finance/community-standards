import { defineComponent, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { u as useLiveLfis } from "./useLiveLfis-BJ8PJRrF.js";
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
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(
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
        href: "/tech/tpp-standards/v2.1/banking/data-sharing/",
        cat: "Bank Data Sharing",
        color: "var(--at-teal)",
        title: "Bank Data Sharing",
        body: "Consented access to account, balance, transaction, beneficiary, direct debit, standing order, scheduled payment, and party information. Permissions such as <code>ReadAccountsBasic</code>, <code>ReadBalances</code>, and <code>ReadTransactionsDetail</code> control which fields are returned, with data filtered by consent expiry and date ranges.",
        highlights: ["Account & balance information", "Transaction & statement history", "Standing orders, direct debits, beneficiaries", "Party & product information"]
      },
      {
        href: "/tech/tpp-standards/v2.1/banking/service-initiation/",
        cat: "Service Initiation",
        color: "var(--at-gold, #b08800)",
        title: "Service Initiation (Payments)",
        body: "Initiate domestic and international payments on behalf of users after obtaining explicit consent. Single one-shot payments and multi-payment consents — fixed or variable, on-demand, periodic schedule, or defined schedule — cover everything from checkout to subscription billing and instalment plans.",
        highlights: ["Single Instant Payments", "Multi-payment consents (6 variants)", "Delegated SCA", "Refunds & multi-authorisation"]
      },
      {
        href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/",
        cat: "Confirmation of Payee",
        color: "var(--at-blue-deep, #1d4ed8)",
        title: "Confirmation of Payee (CoP)",
        body: "Verify that a payee’s name matches the account holder before executing a payment, reducing misdirected payment risk. A two-step flow — discovery (resolve the LFI from the IBAN) followed by a confirmation request — returns Yes / Partial / No match indicators.",
        highlights: ["Discovery by IBAN", "Name match check", "Yes / Partial / No outcomes", "Reduces APP fraud risk"]
      },
      {
        href: "/tech/tpp-standards/v2.1/banking/products-leads/",
        cat: "Products & Leads",
        color: "var(--at-navy)",
        title: "Products & Leads",
        body: "Browse current product catalogues across LFIs (savings, current accounts, credit cards, finance, mortgages) and create leads for product origination. Filter by Sharia compliance, product category, last updated date, with retail and business banking products both supported.",
        highlights: ["Public product catalogues", "Sharia compliance filter", "Lead creation for origination", "Retail & business products"]
      },
      {
        href: "/tech/tpp-standards/v2.1/banking/atms/",
        cat: "ATMs",
        color: "var(--at-teal-deep)",
        title: "ATMs",
        body: "Retrieve ATM location and service data published by LFIs. A read-only, public-data API — no user consent or redirect required. Each ATM record includes location, supported services, accessibility features, fees, and withdrawal limits.",
        highlights: ["Locations & GPS coordinates", "Supported services & currencies", "Accessibility features", "Fees & withdrawal limits"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-9342e3ad><section class="ed-landing__hero" data-v-9342e3ad><div class="ed-landing__inner" data-v-9342e3ad><div class="ed-landing__eyebrow" data-v-9342e3ad><span class="ed-landing__eyebrow-dash" data-v-9342e3ad></span> TPP Standards · v2.1 · Banking </div><h1 class="ed-landing__title" data-v-9342e3ad> Banking <span class="ed-landing__read" data-v-9342e3ad>2 min read</span></h1><p class="ed-landing__lede" data-v-9342e3ad> The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification, empowering third-party providers (TPPs) with the necessary tools to enhance user experience and financial services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-9342e3ad> All services are provided with strict consent management and detailed data access permissions. </p></div></section><section class="ed-landing__live" data-v-9342e3ad><div class="ed-landing__inner" data-v-9342e3ad><div class="ed-landing__live-head" data-v-9342e3ad><div class="ed-landing__live-eyebrow" data-v-9342e3ad><span class="ed-landing__eyebrow-dash" data-v-9342e3ad></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-9342e3ad>Which LFIs are live on Open Finance Banking</h2><p class="ed-landing__live-sub" data-v-9342e3ad> LFIs currently serving Banking requests — across data sharing, payments, CoP, products, and ATMs — on UAE Open Finance. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-9342e3ad${_scopeId}><!--[-->`);
            ssrRenderList(6, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-9342e3ad${_scopeId}></div>`);
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
            if (unref(liveLfis).length) {
              _push2(`<div class="ed-landing__live-grid" data-v-9342e3ad${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live" data-v-9342e3ad${_scopeId}><div class="ed-landing__tpp-logo" data-v-9342e3ad${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-9342e3ad${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-9342e3ad${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-9342e3ad${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-9342e3ad${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-9342e3ad${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-9342e3ad${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-9342e3ad${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-9342e3ad${_scopeId}>No LFIs are currently live for Banking capabilities.</p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live" data-v-9342e3ad${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-9342e3ad${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-9342e3ad${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-9342e3ad${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live"
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
                  href: "/program/whats-live",
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
              }, "No LFIs are currently live for Banking capabilities.")),
              unref(totalLfiCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-9342e3ad><div class="ed-landing__inner" data-v-9342e3ad><div class="ed-landing__contents-head" data-v-9342e3ad><div class="ed-landing__contents-eyebrow" data-v-9342e3ad><span class="ed-landing__eyebrow-dash" data-v-9342e3ad></span> Capabilities </div><h2 class="ed-landing__contents-title" data-v-9342e3ad>Browse the Banking capabilities</h2><p class="ed-landing__contents-sub" data-v-9342e3ad>The full set of capability areas covered by the TPP Banking standards.</p></div><div class="ed-landing__contents-grid ed-landing__contents-grid--lg" data-v-9342e3ad><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<a class="ed-link-card ed-link-card--lg"${ssrRenderAttr("href", cap.href)} style="${ssrRenderStyle({ "--card-color": cap.color })}" data-v-9342e3ad><span class="ed-link-card__top" data-v-9342e3ad></span><div class="ed-link-card__meta" data-v-9342e3ad><span class="ed-link-card__cat" data-v-9342e3ad>${ssrInterpolate(cap.cat)}</span></div><h3 class="ed-link-card__title" data-v-9342e3ad>${ssrInterpolate(cap.title)}</h3><p class="ed-link-card__desc" data-v-9342e3ad>${cap.body ?? ""}</p><ul class="ed-link-card__highlights" data-v-9342e3ad><!--[-->`);
        ssrRenderList(cap.highlights, (h) => {
          _push(`<li data-v-9342e3ad>${ssrInterpolate(h)}</li>`);
        });
        _push(`<!--]--></ul><div class="ed-link-card__foot" data-v-9342e3ad><span class="ed-link-card__cta" data-v-9342e3ad>Open</span><span class="ed-link-card__arrow" data-v-9342e3ad>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9342e3ad"]]);
export {
  index as default
};
