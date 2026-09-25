import { defineComponent, computed, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(["atm"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "standards" && e.sectionSlug === "atms" && e.version === docsVersion.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-69361b71><section class="ed-landing__hero" data-v-69361b71><div class="ed-landing__inner" data-v-69361b71><div class="ed-landing__eyebrow" data-v-69361b71><span class="ed-landing__eyebrow-dash" data-v-69361b71></span> Banking · TPP capability </div><h1 class="ed-landing__title" data-v-69361b71> ATMs <span class="ed-landing__read" data-v-69361b71>2 min read</span></h1><p class="ed-landing__lede" data-v-69361b71>The ATM API lets a TPP retrieve ATM location and service data published by LFIs. It is a read-only, public-data API — no user consent or redirect is required.</p></div></section><section class="ed-landing__role" data-v-69361b71><div class="ed-landing__inner" data-v-69361b71><div class="ed-landing__role-card" data-v-69361b71><div class="ed-landing__role-meta" data-v-69361b71><span class="ed-landing__role-tag" data-v-69361b71>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-69361b71><span class="ed-landing__role-chip" data-v-69361b71>BDSP</span><h2 class="ed-landing__role-title" data-v-69361b71>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-69361b71>Access to the ATM API requires the <strong data-v-69361b71>BDSP</strong> role. This role must be assigned to your application in the Trust Framework before calling the endpoint. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-69361b71>Roles</a> for the full list of scopes and grant types this role permits.</p></div><div class="ed-landing__caps-head" data-v-69361b71><div class="ed-landing__caps-eyebrow" data-v-69361b71><span class="ed-landing__eyebrow-dash" data-v-69361b71></span> What the API returns </div></div><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}" data-v-69361b71>A single <span class="endpoint" data-v-69361b71><span class="http-method http-method--get" data-v-69361b71>GET</span><code data-v-69361b71>/atms</code></span> call returns all ATMs published by an LFI. Each ATM record includes:</p><div class="ed-cov" role="table" style="${ssrRenderStyle({ "grid-template-columns": "minmax(14rem, 22rem) 1fr" })}" data-v-69361b71><div class="ed-cov__row ed-cov__row--head" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71>Field</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Description</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>ATMId</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Unique terminal identifier</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>LFIId</code> / <code data-v-69361b71>LFIBrandId</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Identifies the owning LFI and brand</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>Location</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Address and GPS coordinates</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>Services</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Supported transaction types (e.g. <code data-v-69361b71>CashWithdrawal</code>, <code data-v-69361b71>Balance</code>, <code data-v-69361b71>PINChange</code>)</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>Accessibility</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Accessibility features (e.g. <code data-v-69361b71>WheelchairAccess</code>, <code data-v-69361b71>AudioCashMachine</code>)</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>SupportedCurrencies</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>ISO 4217 currency codes accepted</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>Availability</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Operational status and opening hours</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>ATMFee</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Fee schedule for cross-bank and international transactions</div></div><div class="ed-cov__row" role="row" data-v-69361b71><div class="ed-cov__cell ed-cov__cell--label" data-v-69361b71><code data-v-69361b71>MinimumPossibleAmount</code> / <code data-v-69361b71>MaximumPossibleAmount</code></div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-69361b71>Withdrawal amount limits</div></div></div></div></section><section class="ed-landing__live" data-v-69361b71><div class="ed-landing__inner" data-v-69361b71><div class="ed-landing__live-head" data-v-69361b71><div class="ed-landing__live-eyebrow" data-v-69361b71><span class="ed-landing__eyebrow-dash" data-v-69361b71></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-69361b71>Which LFIs are live with ATM data</h2><p class="ed-landing__live-sub" data-v-69361b71>LFIs currently publishing ATM data across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-69361b71${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-69361b71${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-69361b71${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live?family=atm" data-v-69361b71${_scopeId}><div class="ed-landing__tpp-logo" data-v-69361b71${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-69361b71${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-69361b71${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-69361b71${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=atm"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-69361b71${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-69361b71${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-69361b71${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-69361b71${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-69361b71${_scopeId}>No LFIs are currently active for this capability.</p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?family=atm" data-v-69361b71${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-69361b71${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-69361b71${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-69361b71${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?family=atm"
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
                  href: "/program/whats-live?family=atm",
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
                href: "/program/whats-live?family=atm"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-69361b71><div class="ed-landing__inner" data-v-69361b71><div class="ed-landing__contents-head" data-v-69361b71><div class="ed-landing__contents-eyebrow" data-v-69361b71><span class="ed-landing__eyebrow-dash" data-v-69361b71></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-69361b71>Browse this section</h2><p class="ed-landing__contents-sub" data-v-69361b71>The full set of pages for the ATMs API.</p></div><div class="ed-landing__contents-grid" data-v-69361b71><a class="ed-link-card" href="/tech/tpp-standards/v2.1/banking/atms/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-69361b71><span class="ed-link-card__top" data-v-69361b71></span><div class="ed-link-card__meta" data-v-69361b71><span class="ed-link-card__cat" data-v-69361b71>Requirements</span></div><h3 class="ed-link-card__title" data-v-69361b71>ATMs — Requirements</h3><p class="ed-link-card__desc" data-v-69361b71>Validation rules and behaviour the ATM endpoint enforces.</p><div class="ed-link-card__foot" data-v-69361b71><span class="ed-link-card__cta" data-v-69361b71>Open</span><span class="ed-link-card__arrow" data-v-69361b71>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/banking/atms/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-69361b71><span class="ed-link-card__top" data-v-69361b71></span><div class="ed-link-card__meta" data-v-69361b71><span class="ed-link-card__cat" data-v-69361b71>API Guide</span></div><h3 class="ed-link-card__title" data-v-69361b71>ATMs — API Guide</h3><p class="ed-link-card__desc" data-v-69361b71>Implementation notes, payload structure, and worked examples.</p><div class="ed-link-card__foot" data-v-69361b71><span class="ed-link-card__cta" data-v-69361b71>Open</span><span class="ed-link-card__arrow" data-v-69361b71>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-69361b71><span class="ed-link-card__top" data-v-69361b71></span><div class="ed-link-card__meta" data-v-69361b71><span class="ed-link-card__cat" data-v-69361b71>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-69361b71>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-69361b71>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-69361b71>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-69361b71>OpenAPI reference for the <code data-v-69361b71>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint.</p><div class="ed-link-card__foot" data-v-69361b71><span class="ed-link-card__cta" data-v-69361b71>Open spec</span><span class="ed-link-card__arrow" data-v-69361b71>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/atms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69361b71"]]);
export {
  index as default
};
