import { defineComponent, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
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
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(["product"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-87fee929><section class="ed-landing__hero" data-v-87fee929><div class="ed-landing__inner" data-v-87fee929><div class="ed-landing__eyebrow" data-v-87fee929><span class="ed-landing__eyebrow-dash" data-v-87fee929></span> Banking · TPP capability </div><h1 class="ed-landing__title" data-v-87fee929> Products &amp; Leads <span class="ed-landing__read" data-v-87fee929>2 min read</span></h1><p class="ed-landing__lede" data-v-87fee929>The Products &amp; Leads API lets a TPP fetch the banking product catalogues published by LFIs and forward customer leads back to them. Products are aggregated across LFIs and presented to the user; leads are submitted on demand when the user requests follow-up.</p></div></section><section class="ed-landing__role" data-v-87fee929><div class="ed-landing__inner" data-v-87fee929><div class="ed-landing__role-card" data-v-87fee929><div class="ed-landing__role-meta" data-v-87fee929><span class="ed-landing__role-tag" data-v-87fee929>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-87fee929><span class="ed-landing__role-chip" data-v-87fee929>BDSP</span><h2 class="ed-landing__role-title" data-v-87fee929>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-87fee929>Access to the Products &amp; Leads API requires the <strong data-v-87fee929>BDSP</strong> role. This role must be assigned to your application in the Trust Framework before calling the endpoints. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-87fee929>Roles</a> for the full list of scopes and grant types this role permits.</p></div><div class="ed-landing__caps-head" data-v-87fee929><div class="ed-landing__caps-eyebrow" data-v-87fee929><span class="ed-landing__eyebrow-dash" data-v-87fee929></span> How it works </div></div><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}" data-v-87fee929>The TPP fetches products from each LFI in parallel. The results are aggregated and presented to the user together. Once a user selects a product, they have two options:</p><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "0.85rem" })}" data-v-87fee929><strong data-v-87fee929>Apply Now</strong> — the TPP directs the user to apply using whichever channel the LFI has configured: a redirect URI, a phone number, an email address, or a written description of the application process.</p><p class="ed-landing__role-body" data-v-87fee929><strong data-v-87fee929>Request contact from bank</strong> — the TPP submits a <span class="endpoint" data-v-87fee929><span class="http-method http-method--post" data-v-87fee929>POST</span><code data-v-87fee929>/leads</code></span> with the user&#39;s contact details. The API Hub forwards the lead to the LFI and does not retain the data. The LFI is expected to follow up within 30 days.</p></div></section><section class="ed-landing__live" data-v-87fee929><div class="ed-landing__inner" data-v-87fee929><div class="ed-landing__live-head" data-v-87fee929><div class="ed-landing__live-eyebrow" data-v-87fee929><span class="ed-landing__eyebrow-dash" data-v-87fee929></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-87fee929>Which LFIs are live for Products &amp; Leads</h2><p class="ed-landing__live-sub" data-v-87fee929>LFIs currently publishing product catalogues across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-87fee929${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-87fee929${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-87fee929${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live?family=product" data-v-87fee929${_scopeId}><div class="ed-landing__tpp-logo" data-v-87fee929${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-87fee929${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-87fee929${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-87fee929${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=product"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-87fee929${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-87fee929${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-87fee929${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-87fee929${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-87fee929${_scopeId}>No LFIs are currently active for this capability.</p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?family=product" data-v-87fee929${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-87fee929${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-87fee929${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-87fee929${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?family=product"
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
                  href: "/program/whats-live?family=product",
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
                href: "/program/whats-live?family=product"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-87fee929><div class="ed-landing__inner" data-v-87fee929><div class="ed-landing__contents-head" data-v-87fee929><div class="ed-landing__contents-eyebrow" data-v-87fee929><span class="ed-landing__eyebrow-dash" data-v-87fee929></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-87fee929>Browse this section</h2><p class="ed-landing__contents-sub" data-v-87fee929>The full set of pages for the Products &amp; Leads API.</p></div><div class="ed-landing__contents-grid" data-v-87fee929><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/products-leads/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-87fee929><span class="ed-link-card__top" data-v-87fee929></span><div class="ed-link-card__meta" data-v-87fee929><span class="ed-link-card__cat" data-v-87fee929>Requirements</span></div><h3 class="ed-link-card__title" data-v-87fee929>Products &amp; Leads — Requirements</h3><p class="ed-link-card__desc" data-v-87fee929>Validation rules and behaviour every Products &amp; Leads request must follow.</p><div class="ed-link-card__foot" data-v-87fee929><span class="ed-link-card__cta" data-v-87fee929>Open</span><span class="ed-link-card__arrow" data-v-87fee929>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/products-leads/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-87fee929><span class="ed-link-card__top" data-v-87fee929></span><div class="ed-link-card__meta" data-v-87fee929><span class="ed-link-card__cat" data-v-87fee929>API Guide</span></div><h3 class="ed-link-card__title" data-v-87fee929>Products &amp; Leads — API Guide</h3><p class="ed-link-card__desc" data-v-87fee929>Implementation notes, payload structure, and worked examples.</p><div class="ed-link-card__foot" data-v-87fee929><span class="ed-link-card__cta" data-v-87fee929>Open</span><span class="ed-link-card__arrow" data-v-87fee929>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/products-leads/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-87fee929><span class="ed-link-card__top" data-v-87fee929></span><div class="ed-link-card__meta" data-v-87fee929><span class="ed-link-card__cat" data-v-87fee929>User Journeys</span></div><h3 class="ed-link-card__title" data-v-87fee929>Products &amp; Leads — User Journeys</h3><p class="ed-link-card__desc" data-v-87fee929>How users browse products and submit leads through your application.</p><div class="ed-link-card__foot" data-v-87fee929><span class="ed-link-card__cta" data-v-87fee929>Open</span><span class="ed-link-card__arrow" data-v-87fee929>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/products-leads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-87fee929"]]);
export {
  index as default
};
