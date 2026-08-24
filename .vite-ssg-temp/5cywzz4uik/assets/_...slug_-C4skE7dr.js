import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { v as getEndpointBySlug, w as getSectionScope, s as sectionUrl, e as endpointUrl, _ as _export_sfc, b as block0 } from "../main.mjs";
import { useRoute } from "vue-router";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tail = computed(() => {
      const raw = route.params["slug"];
      if (Array.isArray(raw)) return raw.join("/");
      return typeof raw === "string" ? raw : "";
    });
    const endpoint = computed(() => getEndpointBySlug(tail.value));
    const scope = computed(() => endpoint.value ? void 0 : getSectionScope(tail.value));
    const SURFACE_EYEBROW = {
      standards: "TPP · Standards",
      "api-hub": "API Hub",
      "ozone-connect": "Ozone Connect"
    };
    const SURFACE_TITLE = {
      standards: "Open Finance Standards",
      "api-hub": "API Hub",
      "ozone-connect": "Ozone Connect"
    };
    const SURFACE_LEDE = {
      standards: "The APIs the API Hub exposes to TPPs — Trust Framework discovery, registration, token exchange, consent, bank data sharing, service initiation, Confirmation of Payee, ATMs, and event notifications.",
      "api-hub": "The APIs the API Hub exposes to LFIs during the authorization journey — Headless Heimdall (for delegating end user authentication) and the Consent Manager (for looking up and updating consents).",
      "ozone-connect": "The APIs LFIs must implement for the API Hub to call — health check, consent events, bank data sharing, service initiation, Confirmation of Payee, products & leads, and ATMs."
    };
    const heroEyebrow = computed(() => {
      const s = scope.value;
      if (!s) return "";
      if (s.kind === "surface") return "API Specifications";
      return SURFACE_EYEBROW[s.surface];
    });
    const heroTitle = computed(() => {
      const s = scope.value;
      if (!s) return "";
      if (s.kind === "surface") return SURFACE_TITLE[s.surface];
      return s.sectionLabel;
    });
    const heroLede = computed(() => {
      const s = scope.value;
      if (!s || s.kind !== "surface") return "";
      return SURFACE_LEDE[s.surface];
    });
    const groups = computed(() => {
      const s = scope.value;
      if (!s) return [];
      if (s.kind === "surface") {
        const order2 = [];
        const buckets2 = /* @__PURE__ */ new Map();
        for (const ep of s.endpoints) {
          const key = ep.sectionSlug;
          let bucket = buckets2.get(key);
          if (!bucket) {
            bucket = { label: ep.section, sectionSlug: ep.sectionSlug, endpoints: [] };
            buckets2.set(key, bucket);
            order2.push(key);
          }
          bucket.endpoints.push(ep);
        }
        return order2.map((key) => {
          const b = buckets2.get(key);
          return {
            label: b.label,
            url: sectionUrl(s.surface, s.version, b.sectionSlug),
            endpoints: b.endpoints
          };
        });
      }
      const hasSubsections = s.endpoints.some((e) => e.subsection);
      if (!hasSubsections) {
        return [{ label: s.sectionLabel, endpoints: s.endpoints }];
      }
      const order = [];
      const buckets = /* @__PURE__ */ new Map();
      for (const ep of s.endpoints) {
        const key = ep.subsection ?? "";
        const list = buckets.get(key);
        if (list) list.push(ep);
        else {
          buckets.set(key, [ep]);
          order.push(key);
        }
      }
      return order.map((key) => ({
        label: key === "" ? "General" : key,
        endpoints: buckets.get(key)
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RedocWrapper = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-api-endpoint" }, _attrs))} data-v-81526516>`);
      if (unref(endpoint)) {
        _push(`<!--[--><section class="ed-api-endpoint__hero" data-v-81526516><div class="ed-api-endpoint__hero-inner" data-v-81526516><div class="ed-api-endpoint__hero-label" data-v-81526516><span class="ed-api-endpoint__hero-label-dash" data-v-81526516></span> ${ssrInterpolate(SURFACE_EYEBROW[unref(endpoint).surface])} · ${ssrInterpolate(unref(endpoint).section)}</div><h1 class="ed-api-endpoint__hero-title" data-v-81526516>${ssrInterpolate(unref(endpoint).title)} <span class="ed-api-endpoint__hero-badge" data-v-81526516>${ssrInterpolate(unref(endpoint).version)}</span></h1><div class="ed-api-endpoint__hero-meta" data-v-81526516><span class="${ssrRenderClass(["http-badge", `http-${unref(endpoint).method.toLowerCase()}`])}" data-v-81526516>${ssrInterpolate(unref(endpoint).method)}</span><code class="ed-api-endpoint__hero-path" data-v-81526516>${ssrInterpolate(unref(endpoint).path)}</code></div></div></section><section class="ed-api-endpoint__body" data-v-81526516><div class="ed-api-endpoint__body-inner" data-v-81526516>`);
        _push(ssrRenderComponent(_component_RedocWrapper, unref(endpoint).redoc, null, _parent));
        _push(`</div></section><!--]-->`);
      } else if (unref(scope)) {
        _push(`<!--[--><section class="ed-api-listing__hero" data-v-81526516><div class="ed-api-listing__hero-inner" data-v-81526516><div class="ed-api-listing__hero-label" data-v-81526516><span class="ed-api-listing__hero-label-dash" data-v-81526516></span> ${ssrInterpolate(unref(heroEyebrow))}</div><h1 class="ed-api-listing__hero-title" data-v-81526516>${ssrInterpolate(unref(heroTitle))} <span class="ed-api-listing__hero-badge" data-v-81526516>${ssrInterpolate(unref(scope).version)}</span></h1>`);
        if (unref(heroLede)) {
          _push(`<p class="ed-api-listing__hero-sub" data-v-81526516>${ssrInterpolate(unref(heroLede))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section><section class="ed-api-listing__body" data-v-81526516><div class="ed-api-listing__body-inner" data-v-81526516><!--[-->`);
        ssrRenderList(unref(groups), (group) => {
          _push(`<div class="ed-api-listing__group" data-v-81526516><div class="ed-api-listing__group-head" data-v-81526516><h2 class="ed-api-listing__group-title" data-v-81526516>`);
          if (group.url) {
            _push(`<a${ssrRenderAttr("href", group.url)} class="ed-api-listing__group-link" data-v-81526516>${ssrInterpolate(group.label)} <span class="ed-api-listing__group-link-arrow" data-v-81526516>→</span></a>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(group.label)}<!--]-->`);
          }
          _push(`</h2><span class="ed-api-listing__group-count" data-v-81526516>${ssrInterpolate(group.endpoints.length)} endpoint${ssrInterpolate(group.endpoints.length === 1 ? "" : "s")}</span></div><div class="ed-api-listing__rows" data-v-81526516><!--[-->`);
          ssrRenderList(group.endpoints, (ep) => {
            _push(`<a${ssrRenderAttr("href", unref(endpointUrl)(ep))} class="ed-api-listing__row" data-v-81526516><span class="${ssrRenderClass(["http-badge", `http-${ep.method.toLowerCase()}`])}" data-v-81526516>${ssrInterpolate(ep.method)}</span><code class="ed-api-listing__row-path" data-v-81526516>${ssrInterpolate(ep.path)}</code><span class="ed-api-listing__row-title" data-v-81526516>${ssrInterpolate(ep.title)}</span><span class="ed-api-listing__row-arrow" data-v-81526516>→</span></a>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></section><!--]-->`);
      } else {
        _push(`<section class="ed-api-endpoint__missing" data-v-81526516><div class="ed-api-endpoint__missing-inner" data-v-81526516><h1 data-v-81526516>Endpoint not found</h1><p data-v-81526516> No registered API spec matches <code data-v-81526516>${ssrInterpolate(unref(tail))}</code>. </p>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/tech/api-specs/",
          class: "ed-api-endpoint__back"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← Back to API Specifications `);
            } else {
              return [
                createTextVNode(" ← Back to API Specifications ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      }
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/api-specs/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81526516"]]);
export {
  ____slug_ as default
};
