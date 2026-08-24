import { defineComponent, computed, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { u as useRouteVersion, a as allEndpoints, e as endpointUrl, _ as _export_sfc, b as block0 } from "../main.mjs";
import { u as useLiveLfis } from "./useLiveLfis-BJ8PJRrF.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
import "./liveEcosystem-DBW_tnF2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { docsVersion } = useRouteVersion();
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(
      ["account-information"],
      4
    );
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "standards" && e.sectionSlug === "data-sharing" && e.version === docsVersion.value
      )
    );
    const subtypeByType = [
      { sub: "CurrentAccount", retail: true, sme: true, corp: true },
      { sub: "Savings", retail: true, sme: true, corp: true },
      { sub: "CreditCard", retail: true, sme: false, corp: false },
      { sub: "Finance", retail: true, sme: false, corp: false },
      { sub: "Mortgage", retail: true, sme: false, corp: false }
    ];
    const coverageRows = [
      { label: "GET /accounts", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/balances", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/transactions", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/statements", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/product", values: [true, true, true, true, true] },
      { label: "GET /parties", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/parties", values: [true, true, true, true, true] },
      { label: "GET /accounts/{AccountId}/beneficiaries", values: [true, true, false, false, false] },
      { label: "GET /accounts/{AccountId}/direct-debits", values: [true, true, false, false, false] },
      { label: "GET /accounts/{AccountId}/scheduled-payments", values: [true, true, false, false, false] },
      { label: "GET /accounts/{AccountId}/standing-orders", values: [true, true, false, false, false] }
    ];
    const subtypes = ["CurrentAccount", "Savings", "CreditCard", "Finance", "Mortgage"];
    const capabilities = [
      {
        title: "Account & Balance Information",
        html: "Provides consented access to core account data, including account identifiers, account types, currency, and status. Enables retrieval of real-time and available balances, overdraft limits, and related account details."
      },
      {
        title: "Historical Transaction & Statement Data",
        html: "Provides access to transaction and statement history, including debit and credit entries, references, amounts, running balances, booking and value dates, and associated metadata where available. Supports filtering by consented date ranges and statement periods."
      },
      {
        title: "Party & Account Holder Information",
        html: "Allows access to verified account holder details, including name, Emirates ID (where permitted), contact information, and KYC verification status. Data sharing is subject to explicit consent scope and regulatory data minimisation principles."
      },
      {
        title: "Regular Payments",
        html: "Provides access to configured payment instructions and beneficiaries, including beneficiary details, standing orders, direct debits, and scheduled and recurring payments. Enables visibility into existing payment commitments and setup information."
      },
      {
        title: "Product Information",
        html: "Provides structured information on banking products associated with the account, including fees, charges, rewards, benefits, eligibility criteria, and key product features. Supports transparency and comparison of product terms under customer consent."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-c94eb54d><section class="ed-landing__hero" data-v-c94eb54d><div class="ed-landing__inner" data-v-c94eb54d><div class="ed-landing__eyebrow" data-v-c94eb54d><span class="ed-landing__eyebrow-dash" data-v-c94eb54d></span> Banking · TPP capability </div><h1 class="ed-landing__title" data-v-c94eb54d> Bank Data Sharing <span class="ed-landing__read" data-v-c94eb54d>2 min read</span></h1><p class="ed-landing__lede" data-v-c94eb54d> The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-c94eb54d> All data access operates under explicit customer consent, with granular permission scopes, strict expiry controls, and full auditability. </p></div></section><section class="ed-landing__role" data-v-c94eb54d><div class="ed-landing__inner" data-v-c94eb54d><div class="ed-landing__role-card" data-v-c94eb54d><div class="ed-landing__role-meta" data-v-c94eb54d><span class="ed-landing__role-tag" data-v-c94eb54d>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-c94eb54d><span class="ed-landing__role-chip" data-v-c94eb54d>BDSP</span><h2 class="ed-landing__role-title" data-v-c94eb54d>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-c94eb54d> Access to the Bank Data Sharing APIs requires the <strong data-v-c94eb54d>BDSP</strong> role. This role must be assigned to your application in the Trust Framework before making any account information requests. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-c94eb54d>Roles</a> for the full list of scopes and grant types this role permits. </p></div><div class="ed-landing__caps-head" data-v-c94eb54d><div class="ed-landing__caps-eyebrow" data-v-c94eb54d><span class="ed-landing__eyebrow-dash" data-v-c94eb54d></span> What Bank Data Sharing covers </div></div><div class="ed-caps" data-v-c94eb54d><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<div class="ed-cap" data-v-c94eb54d><h3 class="ed-cap__title" data-v-c94eb54d>${ssrInterpolate(cap.title)}</h3><p class="ed-cap__body" data-v-c94eb54d>${cap.html ?? ""}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__coverage" data-v-c94eb54d><div class="ed-landing__inner" data-v-c94eb54d><div class="ed-landing__contents-head" data-v-c94eb54d><div class="ed-landing__contents-eyebrow" data-v-c94eb54d><span class="ed-landing__eyebrow-dash" data-v-c94eb54d></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-c94eb54d>Endpoint &amp; account type coverage</h2><p class="ed-landing__contents-sub" data-v-c94eb54d> Not all endpoints are available for every account subtype, and not all account subtypes are available for every account type. </p></div><h3 class="ed-cov__h3" data-v-c94eb54d>Account subtypes by account type</h3><div class="ed-cov" role="table" aria-label="Account subtypes by account type" data-v-c94eb54d><div class="ed-cov__row ed-cov__row--head" role="row" data-v-c94eb54d><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-c94eb54d>AccountSubType</div><div class="ed-cov__cell" role="columnheader" data-v-c94eb54d>Retail</div><div class="ed-cov__cell" role="columnheader" data-v-c94eb54d>SME</div><div class="ed-cov__cell" role="columnheader" data-v-c94eb54d>Corporate</div></div><!--[-->`);
      ssrRenderList(subtypeByType, (r) => {
        _push(`<div class="ed-cov__row" role="row" data-v-c94eb54d><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-c94eb54d><code data-v-c94eb54d>${ssrInterpolate(r.sub)}</code></div><div class="ed-cov__cell" role="cell" data-v-c94eb54d><span class="${ssrRenderClass(["ed-cov__mark", r.retail ? "is-yes" : "is-no"])}" data-v-c94eb54d>${ssrInterpolate(r.retail ? "✓" : "—")}</span></div><div class="ed-cov__cell" role="cell" data-v-c94eb54d><span class="${ssrRenderClass(["ed-cov__mark", r.sme ? "is-yes" : "is-no"])}" data-v-c94eb54d>${ssrInterpolate(r.sme ? "✓" : "—")}</span></div><div class="ed-cov__cell" role="cell" data-v-c94eb54d><span class="${ssrRenderClass(["ed-cov__mark", r.corp ? "is-yes" : "is-no"])}" data-v-c94eb54d>${ssrInterpolate(r.corp ? "✓" : "—")}</span></div></div>`);
      });
      _push(`<!--]--></div><h3 class="ed-cov__h3" data-v-c94eb54d>Endpoints by account subtype</h3><div class="ed-cov ed-cov--endpoints" role="table" aria-label="Endpoints by account subtype" data-v-c94eb54d><div class="ed-cov__row ed-cov__row--head" role="row" data-v-c94eb54d><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-c94eb54d>Endpoint</div><!--[-->`);
      ssrRenderList(subtypes, (s) => {
        _push(`<div class="ed-cov__cell" role="columnheader" data-v-c94eb54d>${ssrInterpolate(s)}</div>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(coverageRows, (r) => {
        _push(`<div class="ed-cov__row" role="row" data-v-c94eb54d><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-c94eb54d><code data-v-c94eb54d>${ssrInterpolate(r.label)}</code></div><!--[-->`);
        ssrRenderList(r.values, (v, i) => {
          _push(`<div class="ed-cov__cell" role="cell" data-v-c94eb54d><span class="${ssrRenderClass(["ed-cov__mark", v ? "is-yes" : "is-no"])}" data-v-c94eb54d>${ssrInterpolate(v ? "✓" : "—")}</span></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__live" data-v-c94eb54d><div class="ed-landing__inner" data-v-c94eb54d><div class="ed-landing__live-head" data-v-c94eb54d><div class="ed-landing__live-eyebrow" data-v-c94eb54d><span class="ed-landing__eyebrow-dash" data-v-c94eb54d></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-c94eb54d>Which LFIs are live for Account Information</h2><p class="ed-landing__live-sub" data-v-c94eb54d> LFIs currently serving Account Information requests across UAE Open Finance. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-c94eb54d${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-c94eb54d${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-c94eb54d${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live?family=account-information" data-v-c94eb54d${_scopeId}><div class="ed-landing__tpp-logo" data-v-c94eb54d${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-c94eb54d${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-c94eb54d${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-c94eb54d${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=account-information"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-c94eb54d${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-c94eb54d${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-c94eb54d${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-c94eb54d${_scopeId}> Live data is currently unavailable. </p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-c94eb54d${_scopeId}> No LFIs are currently serving Account Information requests. </p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?family=account-information" data-v-c94eb54d${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-c94eb54d${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-c94eb54d${_scopeId}> View in the live ecosystem dashboard </span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-c94eb54d${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?family=account-information"
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
                  href: "/program/whats-live?family=account-information",
                  title: `See all ${unref(totalLfiCount)} LFIs`
                }, [
                  createVNode("span", { class: "ed-landing__tpp-more-dots" }, "…"),
                  createVNode("span", { class: "ed-landing__tpp-more-label" }, "+" + toDisplayString(unref(totalLfiCount) - unref(liveLfis).length) + " more", 1)
                ], 8, ["title"])) : createCommentVNode("", true)
              ])) : unref(loadError) ? (openBlock(), createBlock("p", {
                key: 1,
                class: "ed-landing__live-empty"
              }, " Live data is currently unavailable. ")) : (openBlock(), createBlock("p", {
                key: 2,
                class: "ed-landing__live-empty"
              }, " No LFIs are currently serving Account Information requests. ")),
              unref(totalLfiCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live?family=account-information"
              }, [
                unref(totalLfiCount) > unref(liveLfis).length ? (openBlock(), createBlock("span", { key: 0 }, " See all " + toDisplayString(unref(totalLfiCount)) + " LFIs in the live ecosystem ", 1)) : (openBlock(), createBlock("span", { key: 1 }, " View in the live ecosystem dashboard ")),
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
      _push(`</div></section><section class="ed-landing__contents" data-v-c94eb54d><div class="ed-landing__inner" data-v-c94eb54d><div class="ed-landing__contents-head" data-v-c94eb54d><div class="ed-landing__contents-eyebrow" data-v-c94eb54d><span class="ed-landing__eyebrow-dash" data-v-c94eb54d></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-c94eb54d>Browse this section</h2><p class="ed-landing__contents-sub" data-v-c94eb54d> The full set of pages for the Bank Data Sharing API. </p></div><div class="ed-landing__contents-grid" data-v-c94eb54d><a class="ed-link-card" href="/tech/tpp-standards/v2.1/banking/data-sharing/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-c94eb54d><span class="ed-link-card__top" data-v-c94eb54d></span><div class="ed-link-card__meta" data-v-c94eb54d><span class="ed-link-card__cat" data-v-c94eb54d>Requirements</span></div><h3 class="ed-link-card__title" data-v-c94eb54d>Bank Data Sharing — Requirements</h3><p class="ed-link-card__desc" data-v-c94eb54d> Validation rules and behaviour every Bank Data Sharing endpoint must follow. </p><div class="ed-link-card__foot" data-v-c94eb54d><span class="ed-link-card__cta" data-v-c94eb54d>Open</span><span class="ed-link-card__arrow" data-v-c94eb54d>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-c94eb54d><span class="ed-link-card__top" data-v-c94eb54d></span><div class="ed-link-card__meta" data-v-c94eb54d><span class="ed-link-card__cat" data-v-c94eb54d>API Guide</span></div><h3 class="ed-link-card__title" data-v-c94eb54d>Bank Data Sharing — API Guide</h3><p class="ed-link-card__desc" data-v-c94eb54d> Implementation notes, payload structure, pagination, and worked examples. </p><div class="ed-link-card__foot" data-v-c94eb54d><span class="ed-link-card__cta" data-v-c94eb54d>Open</span><span class="ed-link-card__arrow" data-v-c94eb54d>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/banking/data-sharing/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-c94eb54d><span class="ed-link-card__top" data-v-c94eb54d></span><div class="ed-link-card__meta" data-v-c94eb54d><span class="ed-link-card__cat" data-v-c94eb54d>User Journeys</span></div><h3 class="ed-link-card__title" data-v-c94eb54d>Bank Data Sharing — User Journeys</h3><p class="ed-link-card__desc" data-v-c94eb54d> The end-to-end flows your customer experiences when sharing data through your application. </p><div class="ed-link-card__foot" data-v-c94eb54d><span class="ed-link-card__cta" data-v-c94eb54d>Open</span><span class="ed-link-card__arrow" data-v-c94eb54d>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-c94eb54d><span class="ed-link-card__top" data-v-c94eb54d></span><div class="ed-link-card__meta" data-v-c94eb54d><span class="ed-link-card__cat" data-v-c94eb54d>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-c94eb54d>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-c94eb54d>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-c94eb54d>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-c94eb54d> OpenAPI reference for the <code data-v-c94eb54d>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint. </p><div class="ed-link-card__foot" data-v-c94eb54d><span class="ed-link-card__cta" data-v-c94eb54d>Open spec</span><span class="ed-link-card__arrow" data-v-c94eb54d>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c94eb54d"]]);
export {
  index as default
};
