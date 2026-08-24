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
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(["confirmation"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "ozone-connect" && e.sectionSlug === "confirmation-of-payee" && e.version === docsVersion.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-e5435d6d><section class="ed-landing__hero" data-v-e5435d6d><div class="ed-landing__inner" data-v-e5435d6d><div class="ed-landing__eyebrow" data-v-e5435d6d><span class="ed-landing__eyebrow-dash" data-v-e5435d6d></span> Banking · LFI capability </div><h1 class="ed-landing__title" data-v-e5435d6d> Confirmation of Payee <span class="ed-landing__read" data-v-e5435d6d>2 min read</span></h1><p class="ed-landing__lede" data-v-e5435d6d>Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time.</p></div></section><section class="ed-landing__role" data-v-e5435d6d><div class="ed-landing__inner" data-v-e5435d6d><div class="ed-landing__role-card" data-v-e5435d6d><div class="ed-landing__role-meta" data-v-e5435d6d><span class="ed-landing__role-tag" data-v-e5435d6d>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-e5435d6d><span class="ed-landing__role-chip" data-v-e5435d6d>BSIP</span><h2 class="ed-landing__role-title" data-v-e5435d6d>Bank Service Initiation Provider</h2></div><p class="ed-landing__role-body" data-v-e5435d6d>Access to the Confirmation of Payee API requires TPPs to hold the <strong data-v-e5435d6d>BSIP</strong> role. The API Hub validates the role on every request before proxying it to the LFI.</p></div></div></section><section class="ed-landing__live" data-v-e5435d6d><div class="ed-landing__inner" data-v-e5435d6d><div class="ed-landing__live-head" data-v-e5435d6d><div class="ed-landing__live-eyebrow" data-v-e5435d6d><span class="ed-landing__eyebrow-dash" data-v-e5435d6d></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-e5435d6d>Who&#39;s using Confirmation of Payee</h2><p class="ed-landing__live-sub" data-v-e5435d6d>TPPs currently calling the Confirmation of Payee API across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-e5435d6d${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-e5435d6d${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-e5435d6d${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp&amp;family=confirmation" data-v-e5435d6d${_scopeId}><div class="ed-landing__tpp-logo" data-v-e5435d6d${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-e5435d6d${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-e5435d6d${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-e5435d6d${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&amp;family=confirmation"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-e5435d6d${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-e5435d6d${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-e5435d6d${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-e5435d6d${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-e5435d6d${_scopeId}>No TPPs are currently active for this capability.</p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp&amp;family=confirmation" data-v-e5435d6d${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-e5435d6d${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-e5435d6d${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-e5435d6d${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?type=tpp&family=confirmation"
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
                  href: "/program/whats-live?type=tpp&family=confirmation",
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
                href: "/program/whats-live?type=tpp&family=confirmation"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-e5435d6d><div class="ed-landing__inner" data-v-e5435d6d><div class="ed-landing__contents-head" data-v-e5435d6d><div class="ed-landing__contents-eyebrow" data-v-e5435d6d><span class="ed-landing__eyebrow-dash" data-v-e5435d6d></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-e5435d6d>Browse this section</h2><p class="ed-landing__contents-sub" data-v-e5435d6d>The full set of pages for the Confirmation of Payee API.</p></div><div class="ed-landing__contents-grid" data-v-e5435d6d><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-e5435d6d><span class="ed-link-card__top" data-v-e5435d6d></span><div class="ed-link-card__meta" data-v-e5435d6d><span class="ed-link-card__cat" data-v-e5435d6d>Requirements</span></div><h3 class="ed-link-card__title" data-v-e5435d6d>Confirmation of Payee — Requirements</h3><p class="ed-link-card__desc" data-v-e5435d6d>Validation rules and behaviour your Ozone Connect CoP endpoint must follow.</p><div class="ed-link-card__foot" data-v-e5435d6d><span class="ed-link-card__cta" data-v-e5435d6d>Open</span><span class="ed-link-card__arrow" data-v-e5435d6d>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-e5435d6d><span class="ed-link-card__top" data-v-e5435d6d></span><div class="ed-link-card__meta" data-v-e5435d6d><span class="ed-link-card__cat" data-v-e5435d6d>API Guide</span></div><h3 class="ed-link-card__title" data-v-e5435d6d>Confirmation of Payee — API Guide</h3><p class="ed-link-card__desc" data-v-e5435d6d>Implementation notes, payload structure, and worked examples.</p><div class="ed-link-card__foot" data-v-e5435d6d><span class="ed-link-card__cta" data-v-e5435d6d>Open</span><span class="ed-link-card__arrow" data-v-e5435d6d>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-e5435d6d><span class="ed-link-card__top" data-v-e5435d6d></span><div class="ed-link-card__meta" data-v-e5435d6d><span class="ed-link-card__cat" data-v-e5435d6d>User Journeys</span></div><h3 class="ed-link-card__title" data-v-e5435d6d>Confirmation of Payee — User Journeys</h3><p class="ed-link-card__desc" data-v-e5435d6d>The end-to-end flows your customer experiences when CoP runs against your account data.</p><div class="ed-link-card__foot" data-v-e5435d6d><span class="ed-link-card__cta" data-v-e5435d6d>Open</span><span class="ed-link-card__arrow" data-v-e5435d6d>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-e5435d6d><span class="ed-link-card__top" data-v-e5435d6d></span><div class="ed-link-card__meta" data-v-e5435d6d><span class="ed-link-card__cat" data-v-e5435d6d>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-e5435d6d>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-e5435d6d>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-e5435d6d>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-e5435d6d>OpenAPI reference for the <code data-v-e5435d6d>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint.</p><div class="ed-link-card__foot" data-v-e5435d6d><span class="ed-link-card__cta" data-v-e5435d6d>Open spec</span><span class="ed-link-card__arrow" data-v-e5435d6d>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5435d6d"]]);
export {
  index as default
};
