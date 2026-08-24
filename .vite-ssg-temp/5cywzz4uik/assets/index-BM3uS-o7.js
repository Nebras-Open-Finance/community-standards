import { defineComponent, computed, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
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
      ["insurance"],
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
        (e) => e.surface === "standards" && e.sectionSlug === "insurance-data-sharing" && e.version === docsVersion.value
      )
    );
    const insuranceTypes = [
      "Employment",
      "Health",
      "Home",
      "Life",
      "Motor",
      "Renters",
      "Travel"
    ];
    const capabilities = [
      {
        title: "Policy Information",
        html: "Provides consented access to a customer&rsquo;s insurance policy details &mdash; product, status, dates, sums insured, coverage, exclusions, and policy-holder information. Returned per insurance sector through dedicated <code>/{type}-insurance-policies</code> endpoints."
      },
      {
        title: "Customer &amp; Beneficiaries",
        html: "Returns identity, contact, and beneficiary information held on the policy &mdash; controlled by <code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, and <code>ReadCustomerPaymentDetails</code> permissions and subject to data-minimisation rules."
      },
      {
        title: "Premium &amp; Pricing",
        html: "Premium amounts, discounts, frequency, and VAT components for the policy. When the customer grants <code>ReadInsurancePremium</code>, premium values are returned as an encrypted JWE so they can only be decrypted on the customer&rsquo;s device."
      },
      {
        title: "Claims History",
        html: "When granted <code>ReadCustomerClaims</code>, exposes claims raised against the policy &mdash; status, dates, amounts, and the events that triggered them. Enables switching, broking, and risk-assessment use cases."
      },
      {
        title: "Product Information",
        html: "Structured product detail for the underwritten policy &mdash; cover type, features, terms, and add-ons. Returned under the <code>ReadInsuranceProduct</code> permission."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-b5d454cb><section class="ed-landing__hero" data-v-b5d454cb><div class="ed-landing__inner" data-v-b5d454cb><div class="ed-landing__eyebrow" data-v-b5d454cb><span class="ed-landing__eyebrow-dash" data-v-b5d454cb></span> Insurance · TPP capability </div><h1 class="ed-landing__title" data-v-b5d454cb> Insurance Data Sharing <span class="ed-landing__read" data-v-b5d454cb>2 min read</span></h1><p class="ed-landing__lede" data-v-b5d454cb> The Open Finance Insurance Data Sharing capabilities enable secure, consent-driven access to a customer’s insurance policy data across the UAE’s major sectors. These services empower licensed third-party providers (TPPs) to deliver policy aggregation, switching support, broking, claims assistance, and value-added digital insurance services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-b5d454cb> All data access operates under explicit customer consent, with granular permission scopes, strict expiry controls, and full auditability. </p></div></section><section class="ed-landing__role" data-v-b5d454cb><div class="ed-landing__inner" data-v-b5d454cb><div class="ed-landing__role-card" data-v-b5d454cb><div class="ed-landing__role-meta" data-v-b5d454cb><span class="ed-landing__role-tag" data-v-b5d454cb>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-b5d454cb><span class="ed-landing__role-chip" data-v-b5d454cb>ISP</span><h2 class="ed-landing__role-title" data-v-b5d454cb>Insurance Service Provider</h2></div><p class="ed-landing__role-body" data-v-b5d454cb> Access to the Insurance Data Sharing APIs requires the <strong data-v-b5d454cb>ISP</strong> role. This role must be assigned to your application in the Trust Framework before making any insurance policy requests. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-b5d454cb>Roles</a> for the full list of scopes and grant types this role permits. </p></div><div class="ed-landing__caps-head" data-v-b5d454cb><div class="ed-landing__caps-eyebrow" data-v-b5d454cb><span class="ed-landing__eyebrow-dash" data-v-b5d454cb></span> What Insurance Data Sharing covers </div></div><div class="ed-caps" data-v-b5d454cb><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<div class="ed-cap" data-v-b5d454cb><h3 class="ed-cap__title" data-v-b5d454cb>${cap.title ?? ""}</h3><p class="ed-cap__body" data-v-b5d454cb>${cap.html ?? ""}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__coverage" data-v-b5d454cb><div class="ed-landing__inner" data-v-b5d454cb><div class="ed-landing__contents-head" data-v-b5d454cb><div class="ed-landing__contents-eyebrow" data-v-b5d454cb><span class="ed-landing__eyebrow-dash" data-v-b5d454cb></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-b5d454cb>Insurance types covered</h2><p class="ed-landing__contents-sub" data-v-b5d454cb> Each insurance type has its own pair of endpoints — a list endpoint and a per-policy detail endpoint. An LFI exposes the endpoints for the types it underwrites. </p></div><div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance type endpoint coverage" data-v-b5d454cb><div class="ed-cov__row ed-cov__row--head" role="row" data-v-b5d454cb><div class="ed-cov__cell ed-cov__cell--label" role="columnheader" data-v-b5d454cb>Insurance Type</div><div class="ed-cov__cell" role="columnheader" data-v-b5d454cb>List policies</div><div class="ed-cov__cell" role="columnheader" data-v-b5d454cb>Get a policy</div></div><!--[-->`);
      ssrRenderList(insuranceTypes, (t) => {
        _push(`<div class="ed-cov__row" role="row" data-v-b5d454cb><div class="ed-cov__cell ed-cov__cell--label" role="cell" data-v-b5d454cb><strong data-v-b5d454cb>${ssrInterpolate(t)}</strong><code class="ed-cov__path" data-v-b5d454cb>/${ssrInterpolate(t.toLowerCase())}-insurance-policies</code></div><div class="ed-cov__cell" role="cell" data-v-b5d454cb><span class="ed-cov__mark is-yes" data-v-b5d454cb>GET</span></div><div class="ed-cov__cell" role="cell" data-v-b5d454cb><span class="ed-cov__mark is-yes" data-v-b5d454cb>GET</span></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-landing__live" data-v-b5d454cb><div class="ed-landing__inner" data-v-b5d454cb><div class="ed-landing__live-head" data-v-b5d454cb><div class="ed-landing__live-eyebrow" data-v-b5d454cb><span class="ed-landing__eyebrow-dash" data-v-b5d454cb></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-b5d454cb>Which LFIs are live for Insurance Data Sharing</h2><p class="ed-landing__live-sub" data-v-b5d454cb> LFIs currently exposing any Insurance API resource in the Open Finance directory. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-b5d454cb${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-b5d454cb${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-b5d454cb${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live" data-v-b5d454cb${_scopeId}><div class="ed-landing__tpp-logo" data-v-b5d454cb${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-b5d454cb${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-b5d454cb${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-b5d454cb${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-b5d454cb${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-b5d454cb${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-b5d454cb${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-b5d454cb${_scopeId}> Live data is currently unavailable. </p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-b5d454cb${_scopeId}> No LFIs are currently exposing Insurance APIs in the directory. </p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live" data-v-b5d454cb${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-b5d454cb${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-b5d454cb${_scopeId}> View in the live ecosystem dashboard </span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-b5d454cb${_scopeId}>→</span></a>`);
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
              }, " Live data is currently unavailable. ")) : (openBlock(), createBlock("p", {
                key: 2,
                class: "ed-landing__live-empty"
              }, " No LFIs are currently exposing Insurance APIs in the directory. ")),
              unref(totalLfiCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-b5d454cb><div class="ed-landing__inner" data-v-b5d454cb><div class="ed-landing__contents-head" data-v-b5d454cb><div class="ed-landing__contents-eyebrow" data-v-b5d454cb><span class="ed-landing__eyebrow-dash" data-v-b5d454cb></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-b5d454cb>Browse this section</h2><p class="ed-landing__contents-sub" data-v-b5d454cb> The full set of pages for the Insurance Data Sharing API. </p></div><div class="ed-landing__contents-grid" data-v-b5d454cb><a class="ed-link-card" href="/tech/tpp-standards/v2.1/insurance/data-sharing/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-b5d454cb><span class="ed-link-card__top" data-v-b5d454cb></span><div class="ed-link-card__meta" data-v-b5d454cb><span class="ed-link-card__cat" data-v-b5d454cb>Requirements</span></div><h3 class="ed-link-card__title" data-v-b5d454cb>Insurance Data Sharing — Requirements</h3><p class="ed-link-card__desc" data-v-b5d454cb> Validation rules and behaviour every Insurance Data Sharing endpoint must follow. </p><div class="ed-link-card__foot" data-v-b5d454cb><span class="ed-link-card__cta" data-v-b5d454cb>Open</span><span class="ed-link-card__arrow" data-v-b5d454cb>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-b5d454cb><span class="ed-link-card__top" data-v-b5d454cb></span><div class="ed-link-card__meta" data-v-b5d454cb><span class="ed-link-card__cat" data-v-b5d454cb>API Guide</span></div><h3 class="ed-link-card__title" data-v-b5d454cb>Insurance Data Sharing — API Guide</h3><p class="ed-link-card__desc" data-v-b5d454cb> Implementation walkthrough — consent, redirect, token exchange, calling the policy endpoints, and decrypting the premium JWE. </p><div class="ed-link-card__foot" data-v-b5d454cb><span class="ed-link-card__cta" data-v-b5d454cb>Open</span><span class="ed-link-card__arrow" data-v-b5d454cb>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.1/insurance/data-sharing/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-b5d454cb><span class="ed-link-card__top" data-v-b5d454cb></span><div class="ed-link-card__meta" data-v-b5d454cb><span class="ed-link-card__cat" data-v-b5d454cb>User Journeys</span></div><h3 class="ed-link-card__title" data-v-b5d454cb>Insurance Data Sharing — User Journeys</h3><p class="ed-link-card__desc" data-v-b5d454cb> The end-to-end flows your customer experiences when sharing insurance data through your application. </p><div class="ed-link-card__foot" data-v-b5d454cb><span class="ed-link-card__cta" data-v-b5d454cb>Open</span><span class="ed-link-card__arrow" data-v-b5d454cb>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-b5d454cb><span class="ed-link-card__top" data-v-b5d454cb></span><div class="ed-link-card__meta" data-v-b5d454cb><span class="ed-link-card__cat" data-v-b5d454cb>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-b5d454cb>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-b5d454cb>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-b5d454cb>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-b5d454cb> OpenAPI reference for the <code data-v-b5d454cb>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint. </p><div class="ed-link-card__foot" data-v-b5d454cb><span class="ed-link-card__cta" data-v-b5d454cb>Open spec</span><span class="ed-link-card__arrow" data-v-b5d454cb>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5d454cb"]]);
export {
  index as default
};
