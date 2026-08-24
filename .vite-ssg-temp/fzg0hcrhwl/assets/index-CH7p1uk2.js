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
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "ozone-connect" && e.sectionSlug === "atms" && e.version === docsVersion.value
      )
    );
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(["atm"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-3f9f5726><section class="ed-landing__hero" data-v-3f9f5726><div class="ed-landing__inner" data-v-3f9f5726><div class="ed-landing__eyebrow" data-v-3f9f5726><span class="ed-landing__eyebrow-dash" data-v-3f9f5726></span> Banking · LFI capability </div><h1 class="ed-landing__title" data-v-3f9f5726> ATMs <span class="ed-landing__read" data-v-3f9f5726>2 min read</span></h1><p class="ed-landing__lede" data-v-3f9f5726> The ATM API allows LFIs to publish ATM location and service data to TPPs. It is a read-only, public-data API — no consent or user redirect is required. </p></div></section><section class="ed-landing__role" data-v-3f9f5726><div class="ed-landing__inner" data-v-3f9f5726><div class="ed-landing__role-card" data-v-3f9f5726><div class="ed-landing__role-meta" data-v-3f9f5726><span class="ed-landing__role-tag" data-v-3f9f5726>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-3f9f5726><span class="ed-landing__role-chip" data-v-3f9f5726>BDSP</span><h2 class="ed-landing__role-title" data-v-3f9f5726>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-3f9f5726> Access to the ATM API requires TPPs to hold the <strong data-v-3f9f5726>BDSP</strong> role. The API Hub validates the role on every request before proxying it to the LFI. </p></div></div></section><section class="ed-landing__live" data-v-3f9f5726><div class="ed-landing__inner" data-v-3f9f5726><div class="ed-landing__live-head" data-v-3f9f5726><div class="ed-landing__live-eyebrow" data-v-3f9f5726><span class="ed-landing__eyebrow-dash" data-v-3f9f5726></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-3f9f5726>Who&#39;s consuming ATM data</h2><p class="ed-landing__live-sub" data-v-3f9f5726> TPPs currently calling the ATM API across UAE Open Finance. </p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-3f9f5726${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-3f9f5726${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-3f9f5726${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp&amp;family=atm" data-v-3f9f5726${_scopeId}><div class="ed-landing__tpp-logo" data-v-3f9f5726${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-3f9f5726${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-3f9f5726${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-3f9f5726${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&amp;family=atm"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-3f9f5726${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-3f9f5726${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-3f9f5726${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-3f9f5726${_scopeId}> Live data is currently unavailable. </p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-3f9f5726${_scopeId}> No TPPs are currently consuming the ATM API. </p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp&amp;family=atm" data-v-3f9f5726${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-3f9f5726${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-3f9f5726${_scopeId}> View in the live ecosystem dashboard </span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-3f9f5726${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?type=tpp&family=atm"
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
                  href: "/program/whats-live?type=tpp&family=atm",
                  title: `See all ${unref(totalTppCount)} TPPs`
                }, [
                  createVNode("span", { class: "ed-landing__tpp-more-dots" }, "…"),
                  createVNode("span", { class: "ed-landing__tpp-more-label" }, "+" + toDisplayString(unref(totalTppCount) - unref(liveTpps).length) + " more", 1)
                ], 8, ["title"])) : createCommentVNode("", true)
              ])) : unref(loadError) ? (openBlock(), createBlock("p", {
                key: 1,
                class: "ed-landing__live-empty"
              }, " Live data is currently unavailable. ")) : (openBlock(), createBlock("p", {
                key: 2,
                class: "ed-landing__live-empty"
              }, " No TPPs are currently consuming the ATM API. ")),
              unref(totalTppCount) > 0 ? (openBlock(), createBlock("a", {
                key: 3,
                class: "ed-landing__live-cta",
                href: "/program/whats-live?type=tpp&family=atm"
              }, [
                unref(totalTppCount) > unref(liveTpps).length ? (openBlock(), createBlock("span", { key: 0 }, " See all " + toDisplayString(unref(totalTppCount)) + " TPPs in the live ecosystem ", 1)) : (openBlock(), createBlock("span", { key: 1 }, " View in the live ecosystem dashboard ")),
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
      _push(`</div></section><section class="ed-landing__contents" data-v-3f9f5726><div class="ed-landing__inner" data-v-3f9f5726><div class="ed-landing__contents-head" data-v-3f9f5726><div class="ed-landing__contents-eyebrow" data-v-3f9f5726><span class="ed-landing__eyebrow-dash" data-v-3f9f5726></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-3f9f5726>Browse this section</h2><p class="ed-landing__contents-sub" data-v-3f9f5726> The full set of pages for the ATMs API. </p></div><div class="ed-landing__contents-grid" data-v-3f9f5726><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/banking/atms/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-3f9f5726><span class="ed-link-card__top" data-v-3f9f5726></span><div class="ed-link-card__meta" data-v-3f9f5726><span class="ed-link-card__cat" data-v-3f9f5726>Requirements</span></div><h3 class="ed-link-card__title" data-v-3f9f5726>ATMs — Requirements</h3><p class="ed-link-card__desc" data-v-3f9f5726> Validation rules and behaviour your Ozone Connect ATM endpoint must follow. </p><div class="ed-link-card__foot" data-v-3f9f5726><span class="ed-link-card__cta" data-v-3f9f5726>Open</span><span class="ed-link-card__arrow" data-v-3f9f5726>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.1/banking/atms/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-3f9f5726><span class="ed-link-card__top" data-v-3f9f5726></span><div class="ed-link-card__meta" data-v-3f9f5726><span class="ed-link-card__cat" data-v-3f9f5726>API Guide</span></div><h3 class="ed-link-card__title" data-v-3f9f5726>ATMs — API Guide</h3><p class="ed-link-card__desc" data-v-3f9f5726> Implementation notes, payload structure, and worked examples. </p><div class="ed-link-card__foot" data-v-3f9f5726><span class="ed-link-card__cta" data-v-3f9f5726>Open</span><span class="ed-link-card__arrow" data-v-3f9f5726>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-3f9f5726><span class="ed-link-card__top" data-v-3f9f5726></span><div class="ed-link-card__meta" data-v-3f9f5726><span class="ed-link-card__cat" data-v-3f9f5726>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-3f9f5726>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-3f9f5726>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-3f9f5726>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-3f9f5726> OpenAPI reference for the <code data-v-3f9f5726>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint. </p><div class="ed-link-card__foot" data-v-3f9f5726><span class="ed-link-card__cta" data-v-3f9f5726>Open spec</span><span class="ed-link-card__arrow" data-v-3f9f5726>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/atms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f9f5726"]]);
export {
  index as default
};
