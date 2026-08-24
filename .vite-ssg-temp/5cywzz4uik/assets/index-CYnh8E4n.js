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
      ["insurance"],
      4
    );
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const capabilities = [
      {
        href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/",
        cat: "Insurance Data Sharing",
        color: "var(--at-teal)",
        title: "Insurance Data Sharing",
        body: "Consented access to a customer&rsquo;s insurance policies across seven sectors &mdash; Employment, Health, Home, Life, Motor, Renters, and Travel. Permissions such as <code>ReadInsurancePolicies</code>, <code>ReadCustomerBasic</code>, and <code>ReadInsurancePremium</code> control which fields are returned. Premium data is encrypted in transit (JWE) when the customer has consented to <code>ReadInsurancePremium</code>.",
        highlights: ["Policy information across 7 sectors", "Customer &amp; payment-method data", "Encrypted premium values", "Coverage, riders &amp; claims history"]
      },
      {
        href: "/tech/tpp-standards/v2.2-rc1/insurance/quotation/",
        cat: "Insurance Quotation",
        color: "var(--at-gold, #b08800)",
        title: "Insurance Quotation",
        body: "Request quotes from one or more LFIs for a single customer, accept on the customer’s behalf, and drive the application through to policy issuance &mdash; across the same seven sectors. Runs on the Client Credentials Grant with no per-customer consent. Subscribe to webhook events on PATCH Accept to receive real-time status updates without polling. Choose <strong>LFI-Led</strong> (the LFI hosts the customer) or <strong>TPP-Led</strong> (you collect KYC and redirect to an LFI-hosted payment URL).",
        highlights: ["Quote across 7 sectors", "New, Renewal &amp; Switch quote types", "LFI-Led &amp; TPP-Led modes", "Webhook-driven event delivery"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-1ba0e925><section class="ed-landing__hero" data-v-1ba0e925><div class="ed-landing__inner" data-v-1ba0e925><div class="ed-landing__eyebrow" data-v-1ba0e925><span class="ed-landing__eyebrow-dash" data-v-1ba0e925></span> TPP Standards · v2.2-rc1 · Insurance </div><h1 class="ed-landing__title" data-v-1ba0e925> Insurance <span class="ed-landing__read" data-v-1ba0e925>2 min read</span></h1><p class="ed-landing__lede" data-v-1ba0e925> The Open Finance Insurance capabilities enable secure, consent-driven access to a customer’s insurance policy data across the UAE’s major insurance sectors. These services empower licensed third-party providers (TPPs) to deliver policy aggregation, switching, advisory, and value-added digital insurance services. </p><p class="ed-landing__lede ed-landing__lede--tight" data-v-1ba0e925> All services are provided with strict consent management, granular permission scopes, and full auditability. </p></div></section><section class="ed-landing__live" data-v-1ba0e925><div class="ed-landing__inner" data-v-1ba0e925><div class="ed-landing__live-head" data-v-1ba0e925><div class="ed-landing__live-eyebrow" data-v-1ba0e925><span class="ed-landing__eyebrow-dash" data-v-1ba0e925></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-1ba0e925>Which LFIs are live for Insurance</h2><p class="ed-landing__live-sub" data-v-1ba0e925> LFIs currently exposing any Insurance API resource in the Open Finance directory. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-1ba0e925${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-1ba0e925${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-1ba0e925${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live" data-v-1ba0e925${_scopeId}><div class="ed-landing__tpp-logo" data-v-1ba0e925${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-1ba0e925${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-1ba0e925${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-1ba0e925${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-1ba0e925${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-1ba0e925${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-1ba0e925${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-1ba0e925${_scopeId}> Live data is currently unavailable. </p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-1ba0e925${_scopeId}> No LFIs are currently exposing Insurance APIs in the directory. </p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live" data-v-1ba0e925${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-1ba0e925${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-1ba0e925${_scopeId}> View in the live ecosystem dashboard </span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-1ba0e925${_scopeId}>→</span></a>`);
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
      _push(`</div></section><section class="ed-landing__contents" data-v-1ba0e925><div class="ed-landing__inner" data-v-1ba0e925><div class="ed-landing__contents-head" data-v-1ba0e925><div class="ed-landing__contents-eyebrow" data-v-1ba0e925><span class="ed-landing__eyebrow-dash" data-v-1ba0e925></span> Capabilities </div><h2 class="ed-landing__contents-title" data-v-1ba0e925>Browse the Insurance capabilities</h2><p class="ed-landing__contents-sub" data-v-1ba0e925> The full set of capability areas covered by the TPP Insurance standards. </p></div><div class="ed-landing__contents-grid ed-landing__contents-grid--lg" data-v-1ba0e925><!--[-->`);
      ssrRenderList(capabilities, (cap) => {
        _push(`<a class="ed-link-card ed-link-card--lg"${ssrRenderAttr("href", cap.href)} style="${ssrRenderStyle({ "--card-color": cap.color })}" data-v-1ba0e925><span class="ed-link-card__top" data-v-1ba0e925></span><div class="ed-link-card__meta" data-v-1ba0e925><span class="ed-link-card__cat" data-v-1ba0e925>${ssrInterpolate(cap.cat)}</span></div><h3 class="ed-link-card__title" data-v-1ba0e925>${ssrInterpolate(cap.title)}</h3><p class="ed-link-card__desc" data-v-1ba0e925>${cap.body ?? ""}</p><ul class="ed-link-card__highlights" data-v-1ba0e925><!--[-->`);
        ssrRenderList(cap.highlights, (h) => {
          _push(`<li data-v-1ba0e925>${h ?? ""}</li>`);
        });
        _push(`<!--]--></ul><div class="ed-link-card__foot" data-v-1ba0e925><span class="ed-link-card__cta" data-v-1ba0e925>Open</span><span class="ed-link-card__arrow" data-v-1ba0e925>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ba0e925"]]);
export {
  index as default
};
