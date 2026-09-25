import { defineComponent, computed, resolveComponent, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { u as useRouteVersion, a as allEndpoints, e as endpointUrl, _ as _export_sfc, b as block0 } from "../main.mjs";
import { u as useLiveTpps } from "./useLiveTpps-BmXvDuHY.js";
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
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(["product"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "ozone-connect" && e.sectionSlug === "products-and-leads" && e.version === docsVersion.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-78b039cb><section class="ed-landing__hero" data-v-78b039cb><div class="ed-landing__inner" data-v-78b039cb><div class="ed-landing__eyebrow" data-v-78b039cb><span class="ed-landing__eyebrow-dash" data-v-78b039cb></span> Banking · LFI capability </div><h1 class="ed-landing__title" data-v-78b039cb> Products &amp; Leads <span class="ed-landing__read" data-v-78b039cb>2 min read</span></h1><p class="ed-landing__lede" data-v-78b039cb>The Products &amp; Leads API allows LFIs to publish their banking product catalogue and to receive customer leads forwarded by TPPs. Customers browse products in the TPP application and either apply directly via a channel the LFI configures (redirect URI, phone, email, or written instructions), or request follow-up contact — in which case the API Hub forwards the lead and the LFI follows up within 30 days.</p></div></section><section class="ed-landing__role" data-v-78b039cb><div class="ed-landing__inner" data-v-78b039cb><div class="ed-landing__role-card" data-v-78b039cb><div class="ed-landing__role-meta" data-v-78b039cb><span class="ed-landing__role-tag" data-v-78b039cb>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-78b039cb><span class="ed-landing__role-chip" data-v-78b039cb>BDSP</span><h2 class="ed-landing__role-title" data-v-78b039cb>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-78b039cb>Access to the Products &amp; Leads API requires TPPs to hold the <strong data-v-78b039cb>BDSP</strong> role. The API Hub validates the role on every request before proxying it to the LFI.</p></div></div></section><section class="ed-landing__live" data-v-78b039cb><div class="ed-landing__inner" data-v-78b039cb><div class="ed-landing__live-head" data-v-78b039cb><div class="ed-landing__live-eyebrow" data-v-78b039cb><span class="ed-landing__eyebrow-dash" data-v-78b039cb></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-78b039cb>Who&#39;s consuming Products &amp; Leads</h2><p class="ed-landing__live-sub" data-v-78b039cb>TPPs currently calling the Products &amp; Leads API across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-78b039cb${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-78b039cb${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-78b039cb${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp&amp;family=product" data-v-78b039cb${_scopeId}><div class="ed-landing__tpp-logo" data-v-78b039cb${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-78b039cb${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-78b039cb${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-78b039cb${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&amp;family=product"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-78b039cb${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-78b039cb${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-78b039cb${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-78b039cb${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-78b039cb${_scopeId}>No TPPs are currently active for this capability.</p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp&amp;family=product" data-v-78b039cb${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-78b039cb${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-78b039cb${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-78b039cb${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?type=tpp&family=product"
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
                  href: "/program/whats-live?type=tpp&family=product",
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
                href: "/program/whats-live?type=tpp&family=product"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-78b039cb><div class="ed-landing__inner" data-v-78b039cb><div class="ed-landing__contents-head" data-v-78b039cb><div class="ed-landing__contents-eyebrow" data-v-78b039cb><span class="ed-landing__eyebrow-dash" data-v-78b039cb></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-78b039cb>Browse this section</h2><p class="ed-landing__contents-sub" data-v-78b039cb>The full set of pages for the Products &amp; Leads API.</p></div><div class="ed-landing__contents-grid" data-v-78b039cb><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-78b039cb><span class="ed-link-card__top" data-v-78b039cb></span><div class="ed-link-card__meta" data-v-78b039cb><span class="ed-link-card__cat" data-v-78b039cb>Requirements</span></div><h3 class="ed-link-card__title" data-v-78b039cb>Products &amp; Leads — Requirements</h3><p class="ed-link-card__desc" data-v-78b039cb>Validation rules and behaviour your Ozone Connect Products &amp; Leads endpoints must follow.</p><div class="ed-link-card__foot" data-v-78b039cb><span class="ed-link-card__cta" data-v-78b039cb>Open</span><span class="ed-link-card__arrow" data-v-78b039cb>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-78b039cb><span class="ed-link-card__top" data-v-78b039cb></span><div class="ed-link-card__meta" data-v-78b039cb><span class="ed-link-card__cat" data-v-78b039cb>API Guide</span></div><h3 class="ed-link-card__title" data-v-78b039cb>Products &amp; Leads — API Guide</h3><p class="ed-link-card__desc" data-v-78b039cb>Implementation notes, payload structure, and worked examples.</p><div class="ed-link-card__foot" data-v-78b039cb><span class="ed-link-card__cta" data-v-78b039cb>Open</span><span class="ed-link-card__arrow" data-v-78b039cb>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-78b039cb><span class="ed-link-card__top" data-v-78b039cb></span><div class="ed-link-card__meta" data-v-78b039cb><span class="ed-link-card__cat" data-v-78b039cb>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-78b039cb>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-78b039cb>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-78b039cb>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-78b039cb>OpenAPI reference for the <code data-v-78b039cb>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint.</p><div class="ed-link-card__foot" data-v-78b039cb><span class="ed-link-card__cta" data-v-78b039cb>Open spec</span><span class="ed-link-card__arrow" data-v-78b039cb>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/products-and-leads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78b039cb"]]);
export {
  index as default
};
