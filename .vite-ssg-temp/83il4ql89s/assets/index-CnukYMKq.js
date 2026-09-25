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
    const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(["account-information"], 4);
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => {
        var _a;
        return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
      }).join("");
    }
    const sectionEndpoints = computed(
      () => allEndpoints.filter(
        (e) => e.surface === "ozone-connect" && e.sectionSlug === "data-sharing" && e.version === docsVersion.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-landing" }, _attrs))} data-v-57c88bb6><section class="ed-landing__hero" data-v-57c88bb6><div class="ed-landing__inner" data-v-57c88bb6><div class="ed-landing__eyebrow" data-v-57c88bb6><span class="ed-landing__eyebrow-dash" data-v-57c88bb6></span> Banking · LFI capability </div><h1 class="ed-landing__title" data-v-57c88bb6> Bank Data Sharing <span class="ed-landing__read" data-v-57c88bb6>2 min read</span></h1><p class="ed-landing__lede" data-v-57c88bb6>The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services.</p></div></section><section class="ed-landing__role" data-v-57c88bb6><div class="ed-landing__inner" data-v-57c88bb6><div class="ed-landing__role-card" data-v-57c88bb6><div class="ed-landing__role-meta" data-v-57c88bb6><span class="ed-landing__role-tag" data-v-57c88bb6>Access control</span> Required role </div><div class="ed-landing__role-head" data-v-57c88bb6><span class="ed-landing__role-chip" data-v-57c88bb6>BDSP</span><h2 class="ed-landing__role-title" data-v-57c88bb6>Bank Data Sharing Provider</h2></div><p class="ed-landing__role-body" data-v-57c88bb6>Access to the Bank Data Sharing APIs requires TPPs to hold the <strong data-v-57c88bb6>BDSP</strong> role. The API Hub validates the role on every request before proxying it to the LFI.</p></div></div></section><section class="ed-landing__coverage" data-v-57c88bb6><div class="ed-landing__inner" data-v-57c88bb6><div class="ed-landing__contents-head" data-v-57c88bb6><div class="ed-landing__contents-eyebrow" data-v-57c88bb6><span class="ed-landing__eyebrow-dash" data-v-57c88bb6></span> Coverage matrix </div><h2 class="ed-landing__contents-title" data-v-57c88bb6>Endpoint &amp; account type coverage</h2><p class="ed-landing__contents-sub" data-v-57c88bb6> Not all endpoints are expected to be delivered for every account subtype, and not all account subtypes are available for every account type. </p></div><h3 class="ed-cov__h3" data-v-57c88bb6>Account subtypes by account type</h3><div class="ed-cov" role="table" data-v-57c88bb6><div class="ed-cov__row ed-cov__row--head" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6>AccountSubType</div><div class="ed-cov__cell" data-v-57c88bb6>Retail</div><div class="ed-cov__cell" data-v-57c88bb6>SME</div><div class="ed-cov__cell" data-v-57c88bb6>Corporate</div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><code data-v-57c88bb6>CurrentAccount</code></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><code data-v-57c88bb6>Savings</code></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><code data-v-57c88bb6>CreditCard</code></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><code data-v-57c88bb6>Finance</code></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><code data-v-57c88bb6>Mortgage</code></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div></div><h3 class="ed-cov__h3" data-v-57c88bb6>Endpoints by account subtype</h3><div class="ed-cov ed-cov--endpoints" role="table" data-v-57c88bb6><div class="ed-cov__row ed-cov__row--head" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6>Endpoint</div><div class="ed-cov__cell" data-v-57c88bb6>CurrentAccount</div><div class="ed-cov__cell" data-v-57c88bb6>Savings</div><div class="ed-cov__cell" data-v-57c88bb6>CreditCard</div><div class="ed-cov__cell" data-v-57c88bb6>Finance</div><div class="ed-cov__cell" data-v-57c88bb6>Mortgage</div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/balances</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/transactions</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/statements</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/products</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/customer</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/customer</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/beneficiaries</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/direct-debits</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/scheduled-payments</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div><div class="ed-cov__row" role="row" data-v-57c88bb6><div class="ed-cov__cell ed-cov__cell--label" data-v-57c88bb6><span class="endpoint" data-v-57c88bb6><span class="http-method http-method--get" data-v-57c88bb6>GET</span><code data-v-57c88bb6>/accounts/{AccountId}/standing-orders</code></span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-yes" data-v-57c88bb6>✓</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div><div class="ed-cov__cell" data-v-57c88bb6><span class="ed-cov__mark is-no" data-v-57c88bb6>—</span></div></div></div></div></section><section class="ed-landing__live" data-v-57c88bb6><div class="ed-landing__inner" data-v-57c88bb6><div class="ed-landing__live-head" data-v-57c88bb6><div class="ed-landing__live-eyebrow" data-v-57c88bb6><span class="ed-landing__eyebrow-dash" data-v-57c88bb6></span> Live ecosystem </div><h2 class="ed-landing__live-title" data-v-57c88bb6>Who&#39;s consuming Account Information</h2><p class="ed-landing__live-sub" data-v-57c88bb6>TPPs currently consuming Account Information data across UAE Open Finance.</p></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-landing__live-grid" data-v-57c88bb6${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="ed-landing__tpp ed-landing__tpp--skel" data-v-57c88bb6${_scopeId}></div>`);
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
              _push2(`<div class="ed-landing__live-grid" data-v-57c88bb6${_scopeId}><!--[-->`);
              ssrRenderList(unref(liveTpps), (tpp) => {
                _push2(`<a class="ed-landing__tpp"${ssrRenderAttr("title", tpp.legalName)} href="/program/whats-live?type=tpp&amp;family=account-information" data-v-57c88bb6${_scopeId}><div class="ed-landing__tpp-logo" data-v-57c88bb6${_scopeId}>`);
                if (tpp.logoUri) {
                  _push2(`<img${ssrRenderAttr("src", tpp.logoUri)}${ssrRenderAttr("alt", tpp.legalName)} data-v-57c88bb6${_scopeId}>`);
                } else {
                  _push2(`<span class="ed-landing__tpp-initials" data-v-57c88bb6${_scopeId}>${ssrInterpolate(initials(tpp.name))}</span>`);
                }
                _push2(`</div><div class="ed-landing__tpp-name" data-v-57c88bb6${_scopeId}>${ssrInterpolate(tpp.name)}</div></a>`);
              });
              _push2(`<!--]-->`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<a class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&amp;family=account-information"${ssrRenderAttr("title", `See all ${unref(totalTppCount)} TPPs`)} data-v-57c88bb6${_scopeId}><span class="ed-landing__tpp-more-dots" data-v-57c88bb6${_scopeId}>…</span><span class="ed-landing__tpp-more-label" data-v-57c88bb6${_scopeId}>+${ssrInterpolate(unref(totalTppCount) - unref(liveTpps).length)} more</span></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(loadError)) {
              _push2(`<p class="ed-landing__live-empty" data-v-57c88bb6${_scopeId}>Live data is currently unavailable.</p>`);
            } else {
              _push2(`<p class="ed-landing__live-empty" data-v-57c88bb6${_scopeId}>No TPPs are currently active for this capability.</p>`);
            }
            if (unref(totalTppCount) > 0) {
              _push2(`<a class="ed-landing__live-cta" href="/program/whats-live?type=tpp&amp;family=account-information" data-v-57c88bb6${_scopeId}>`);
              if (unref(totalTppCount) > unref(liveTpps).length) {
                _push2(`<span data-v-57c88bb6${_scopeId}> See all ${ssrInterpolate(unref(totalTppCount))} TPPs in the live ecosystem </span>`);
              } else {
                _push2(`<span data-v-57c88bb6${_scopeId}>View in the live ecosystem dashboard</span>`);
              }
              _push2(`<span class="ed-landing__live-cta-arrow" aria-hidden="true" data-v-57c88bb6${_scopeId}>→</span></a>`);
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
                    href: "/program/whats-live?type=tpp&family=account-information"
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
                  href: "/program/whats-live?type=tpp&family=account-information",
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
                href: "/program/whats-live?type=tpp&family=account-information"
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
      _push(`</div></section><section class="ed-landing__contents" data-v-57c88bb6><div class="ed-landing__inner" data-v-57c88bb6><div class="ed-landing__contents-head" data-v-57c88bb6><div class="ed-landing__contents-eyebrow" data-v-57c88bb6><span class="ed-landing__eyebrow-dash" data-v-57c88bb6></span> Section contents </div><h2 class="ed-landing__contents-title" data-v-57c88bb6>Browse this section</h2><p class="ed-landing__contents-sub" data-v-57c88bb6>The full set of pages for the Bank Data Sharing API.</p></div><div class="ed-landing__contents-grid" data-v-57c88bb6><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-57c88bb6><span class="ed-link-card__top" data-v-57c88bb6></span><div class="ed-link-card__meta" data-v-57c88bb6><span class="ed-link-card__cat" data-v-57c88bb6>Requirements</span></div><h3 class="ed-link-card__title" data-v-57c88bb6>Bank Data Sharing — Requirements</h3><p class="ed-link-card__desc" data-v-57c88bb6>Validation rules and behaviour your Ozone Connect Bank Data Sharing endpoints must follow.</p><div class="ed-link-card__foot" data-v-57c88bb6><span class="ed-link-card__cta" data-v-57c88bb6>Open</span><span class="ed-link-card__arrow" data-v-57c88bb6>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-57c88bb6><span class="ed-link-card__top" data-v-57c88bb6></span><div class="ed-link-card__meta" data-v-57c88bb6><span class="ed-link-card__cat" data-v-57c88bb6>API Guide</span></div><h3 class="ed-link-card__title" data-v-57c88bb6>Bank Data Sharing — API Guide</h3><p class="ed-link-card__desc" data-v-57c88bb6>Implementation notes, payload structure, pagination, and worked examples.</p><div class="ed-link-card__foot" data-v-57c88bb6><span class="ed-link-card__cta" data-v-57c88bb6>Open</span><span class="ed-link-card__arrow" data-v-57c88bb6>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-57c88bb6><span class="ed-link-card__top" data-v-57c88bb6></span><div class="ed-link-card__meta" data-v-57c88bb6><span class="ed-link-card__cat" data-v-57c88bb6>User Journeys</span></div><h3 class="ed-link-card__title" data-v-57c88bb6>Bank Data Sharing — User Journeys</h3><p class="ed-link-card__desc" data-v-57c88bb6>The end-to-end flows your customer experiences when sharing data through a TPP.</p><div class="ed-link-card__foot" data-v-57c88bb6><span class="ed-link-card__cta" data-v-57c88bb6>Open</span><span class="ed-link-card__arrow" data-v-57c88bb6>→</span></div></a><!--[-->`);
      ssrRenderList(unref(sectionEndpoints), (ep) => {
        _push(`<a class="ed-link-card"${ssrRenderAttr("href", unref(endpointUrl)(ep))} style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-57c88bb6><span class="ed-link-card__top" data-v-57c88bb6></span><div class="ed-link-card__meta" data-v-57c88bb6><span class="ed-link-card__cat" data-v-57c88bb6>Endpoint</span><span class="${ssrRenderClass([`http-${ep.method.toLowerCase()}`, "http-badge"])}" data-v-57c88bb6>${ssrInterpolate(ep.method)}</span><code class="ed-link-card__path" data-v-57c88bb6>${ssrInterpolate(ep.path)}</code></div><h3 class="ed-link-card__title" data-v-57c88bb6>${ssrInterpolate(ep.title)}</h3><p class="ed-link-card__desc" data-v-57c88bb6>OpenAPI reference for the <code data-v-57c88bb6>${ssrInterpolate(ep.method)} ${ssrInterpolate(ep.path)}</code> endpoint.</p><div class="ed-link-card__foot" data-v-57c88bb6><span class="ed-link-card__cta" data-v-57c88bb6>Open spec</span><span class="ed-link-card__arrow" data-v-57c88bb6>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57c88bb6"]]);
export {
  index as default
};
