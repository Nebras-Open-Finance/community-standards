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
    const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(["confirmation"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "standards" && e.sectionSlug === "confirmation-of-payee" && e.version === docsVersion.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-8b9e79b6><section class="ed-landing__hero" data-v-8b9e79b6><div class="ed-landing__inner" data-v-8b9e79b6><div class="ed-landing__eyebrow" data-v-8b9e79b6><span class="ed-landing__eyebrow-dash" data-v-8b9e79b6></span> Banking · TPP capability </div><h1 class="ed-landing__title" data-v-8b9e79b6> Confirmation of Payee <span class="ed-landing__read" data-v-8b9e79b6>2 min read</span></h1><p class="ed-landing__lede" data-v-8b9e79b6>Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time.</p></div></section><section class="ed-landing__role" data-v-8b9e79b6><div class="ed-landing__inner" data-v-8b9e79b6><div class="ed-landing__role-card" data-v-8b9e79b6><div class="ed-landing__role-meta" data-v-8b9e79b6><span class="ed-landing__role-tag" data-v-8b9e79b6>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-8b9e79b6><span class="ed-landing__role-chip" data-v-8b9e79b6>BSIP</span><h2 class="ed-landing__role-title" data-v-8b9e79b6>Bank Service Initiation Provider</h2></div><p class="ed-landing__role-body" data-v-8b9e79b6>Access to the Confirmation of Payee API requires the <strong data-v-8b9e79b6>BSIP</strong> role. This role must be assigned to your application in the Trust Framework before calling either endpoint. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-8b9e79b6>Roles</a> for the full list of scopes and grant types this role permits.</p></div><div class="ed-landing__caps-head" data-v-8b9e79b6><div class="ed-landing__caps-eyebrow" data-v-8b9e79b6><span class="ed-landing__eyebrow-dash" data-v-8b9e79b6></span> How it works </div></div><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}" data-v-8b9e79b6>CoP is a two-call flow: discovery, then confirmation.</p><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "0.85rem" })}" data-v-8b9e79b6><strong data-v-8b9e79b6>Discovery</strong> is called against the API Hub. The TPP submits the destination IBAN; the Hub resolves which LFI holds the account and returns that LFI&#39;s discovery endpoint URL and resource server URL.</p><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}" data-v-8b9e79b6><strong data-v-8b9e79b6>Confirmation</strong> is called directly against the resolved LFI. The TPP authenticates using a client credentials grant (no user redirect), sends a signed request containing the IBAN and account holder name, and receives a signed response with the match result.</p><div class="ed-cov" role="table" style="${ssrRenderStyle({ "grid-template-columns": "minmax(7rem, 10rem) 1fr minmax(8rem, 12rem)" })}" data-v-8b9e79b6><div class="ed-cov__row ed-cov__row--head" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6>Step</div><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "border-left": "1px solid rgba(250, 250, 247, 0.18)", "border-right": "1px solid rgba(250, 250, 247, 0.18)" })}" data-v-8b9e79b6>Endpoint</div><div class="ed-cov__cell" data-v-8b9e79b6>Called against</div></div><div class="ed-cov__row" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6>Discovery</div><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6><span class="endpoint" data-v-8b9e79b6><span class="http-method http-method--post" data-v-8b9e79b6>POST</span><code data-v-8b9e79b6>/open-finance/confirmation-of-payee/v2.2/discovery</code></span></div><div class="ed-cov__cell" data-v-8b9e79b6>API Hub</div></div><div class="ed-cov__row" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6>Confirmation</div><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6><span class="endpoint" data-v-8b9e79b6><span class="http-method http-method--post" data-v-8b9e79b6>POST</span><code data-v-8b9e79b6>/open-finance/confirmation-of-payee/v1.2/confirmation</code></span></div><div class="ed-cov__cell" data-v-8b9e79b6>Resolved LFI</div></div></div><p class="ed-landing__role-body" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-8b9e79b6>Both request and response bodies are compact JWS strings (<code data-v-8b9e79b6>Content-Type: application/jwt</code>). The Hub discovery response carries <code data-v-8b9e79b6>DiscoveryEndpointUrl</code> and <code data-v-8b9e79b6>ResourceServerUrl</code>. The LFI confirmation response carries <code data-v-8b9e79b6>NameMatchIndicator</code> and, on non-Yes results, a <code data-v-8b9e79b6>MaskedName</code>.</p></div></section><section class="ed-landing__coverage" data-v-8b9e79b6><div class="ed-landing__inner" data-v-8b9e79b6><div class="ed-landing__contents-head" data-v-8b9e79b6><div class="ed-landing__contents-eyebrow" data-v-8b9e79b6><span class="ed-landing__eyebrow-dash" data-v-8b9e79b6></span> Reference </div><h2 class="ed-landing__contents-title" data-v-8b9e79b6>Match results</h2><p class="ed-landing__contents-sub" data-v-8b9e79b6> A <code data-v-8b9e79b6>Partial</code> or <code data-v-8b9e79b6>No</code> result must be disclosed to the user — see <a href="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys" data-v-8b9e79b6>User Journeys</a> for the required consent and authorisation page behaviour. </p></div><div class="ed-cov" role="table" style="${ssrRenderStyle({ "grid-template-columns": "minmax(15rem, 20rem) minmax(10rem, 14rem) 1fr" })}" data-v-8b9e79b6><div class="ed-cov__row ed-cov__row--head" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6>NameMatchIndicator</div><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "border-left": "1px solid rgba(250, 250, 247, 0.18)", "border-right": "1px solid rgba(250, 250, 247, 0.18)" })}" data-v-8b9e79b6>Meaning</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Required TPP action</div></div><div class="ed-cov__row" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6><code data-v-8b9e79b6>ConfirmationOfPayee.Yes</code></div><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Name and account match</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Proceed normally</div></div><div class="ed-cov__row" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6><code data-v-8b9e79b6>ConfirmationOfPayee.Partial</code></div><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Name partially matches</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Surface <code data-v-8b9e79b6>MaskedName</code> to the payer before proceeding</div></div><div class="ed-cov__row" role="row" data-v-8b9e79b6><div class="ed-cov__cell ed-cov__cell--label" data-v-8b9e79b6><code data-v-8b9e79b6>ConfirmationOfPayee.No</code></div><div class="ed-cov__cell ed-cov__cell--label" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Name does not match</div><div class="ed-cov__cell" style="${ssrRenderStyle({ "text-align": "left" })}" data-v-8b9e79b6>Surface <code data-v-8b9e79b6>MaskedName</code> to the payer before proceeding</div></div></div></div></section><section class="ed-landing__live" data-v-8b9e79b6><div class="ed-landing__inner" data-v-8b9e79b6><div class="ed-landing__live-head" data-v-8b9e79b6><div class="ed-landing__live-eyebrow" data-v-8b9e79b6><span class="ed-landing__eyebrow-dash" data-v-8b9e79b6></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-8b9e79b6>Which LFIs are live for Confirmation of Payee</h2><p class="ed-landing__live-sub" data-v-8b9e79b6>LFIs currently serving Confirmation of Payee requests across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-8b9e79b6${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-8b9e79b6${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-8b9e79b6${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveLfis), (lfi) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", lfi.legalName)} href="/program/whats-live?family=confirmation" data-v-8b9e79b6${_scopeId}><div class="ed-landing__tpp-logo" data-v-8b9e79b6${_scopeId}>`);
                if (lfi.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", lfi.logoUri)}${ssrRenderAttr("alt", lfi.legalName)} data-v-8b9e79b6${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-8b9e79b6${_scopeId}>${ssrInterpolate(initials(lfi.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-8b9e79b6${_scopeId}>${ssrInterpolate(lfi.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=confirmation"${ssrRenderAttr("title", `See all ${unref(totalLfiCount)} LFIs`)} data-v-8b9e79b6${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-8b9e79b6${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-8b9e79b6${_scopeId}>+${ssrInterpolate(unref(totalLfiCount) - unref(liveLfis).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-8b9e79b6${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-8b9e79b6${_scopeId}>No LFIs are currently active for this capability.</p>`);
            }
            if (unref(totalLfiCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?family=confirmation" data-v-8b9e79b6${_scopeId}>`);
              if (unref(totalLfiCount) > unref(liveLfis).length) {
                _push2(`<span data-v-8b9e79b6${_scopeId}> See all ${ssrInterpolate(unref(totalLfiCount))} LFIs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-8b9e79b6${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-8b9e79b6${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?family=confirmation"
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
                  href: "/program/whats-live?family=confirmation",
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
                href: "/program/whats-live?family=confirmation"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-8b9e79b6><div class="ed-landing__inner" data-v-8b9e79b6><div class="ed-landing__contents-head" data-v-8b9e79b6><div class="ed-landing__contents-eyebrow" data-v-8b9e79b6><span class="ed-landing__eyebrow-dash" data-v-8b9e79b6></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-8b9e79b6>Browse this section</h2><p class="ed-landing__contents-sub" data-v-8b9e79b6>The full set of pages for the Confirmation of Payee API.</p></div><div class="ed-landing__contents-grid" data-v-8b9e79b6><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-8b9e79b6><span class="ed-link-card__top" data-v-8b9e79b6></span><div class="ed-link-card__meta" data-v-8b9e79b6><span class="ed-link-card__cat" data-v-8b9e79b6>Requirements</span></div><h3 class="ed-link-card__title" data-v-8b9e79b6>Confirmation of Payee — Requirements</h3><p class="ed-link-card__desc" data-v-8b9e79b6>Validation rules and behaviour every CoP request must follow.</p><div class="ed-link-card__foot" data-v-8b9e79b6><span class="ed-link-card__cta" data-v-8b9e79b6>Open</span><span class="ed-link-card__arrow" data-v-8b9e79b6>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-8b9e79b6><span class="ed-link-card__top" data-v-8b9e79b6></span><div class="ed-link-card__meta" data-v-8b9e79b6><span class="ed-link-card__cat" data-v-8b9e79b6>API Guide</span></div><h3 class="ed-link-card__title" data-v-8b9e79b6>Confirmation of Payee — API Guide</h3><p class="ed-link-card__desc" data-v-8b9e79b6>Implementation notes for discovery, signed payloads, and confirmation responses.</p><div class="ed-link-card__foot" data-v-8b9e79b6><span class="ed-link-card__cta" data-v-8b9e79b6>Open</span><span class="ed-link-card__arrow" data-v-8b9e79b6>→</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-8b9e79b6><span class="ed-link-card__top" data-v-8b9e79b6></span><div class="ed-link-card__meta" data-v-8b9e79b6><span class="ed-link-card__cat" data-v-8b9e79b6>User Journeys</span></div><h3 class="ed-link-card__title" data-v-8b9e79b6>Confirmation of Payee — User Journeys</h3><p class="ed-link-card__desc" data-v-8b9e79b6>How match results must be surfaced to the payer across all scenarios.</p><div class="ed-link-card__foot" data-v-8b9e79b6><span class="ed-link-card__cta" data-v-8b9e79b6>Open</span><span class="ed-link-card__arrow" data-v-8b9e79b6>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-8b9e79b6><span class="ed-link-card__top" data-v-8b9e79b6></span><div class="ed-link-card__meta" data-v-8b9e79b6><span class="ed-link-card__cat" data-v-8b9e79b6>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-8b9e79b6>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-8b9e79b6>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-8b9e79b6>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-8b9e79b6>OpenAPI reference for the <code data-v-8b9e79b6>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint.</p><div class="ed-link-card__foot" data-v-8b9e79b6><span class="ed-link-card__cta" data-v-8b9e79b6>Open spec</span><span class="ed-link-card__arrow" data-v-8b9e79b6>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b9e79b6"]]);
export {
  index as default
};
