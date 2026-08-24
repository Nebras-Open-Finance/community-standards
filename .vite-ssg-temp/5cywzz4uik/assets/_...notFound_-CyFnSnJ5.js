import { _ as __unplugin_components_0 } from "./EdHero-DawHPCxB.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...notFound]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const SECTION_PREFIXES = [
      { prefix: "/tech/tpp-standards/", href: "/tech/tpp-standards/", label: "TPP Standards" },
      { prefix: "/tech/lfi-api-hub/", href: "/tech/lfi-api-hub/", label: "LFI Integration Guide" },
      { prefix: "/tech/release-notes-and-erratas/", href: "/tech/release-notes-and-erratas/", label: "Release Notes & Erratas" },
      { prefix: "/policy/", href: "/policy/", label: "Policies" },
      { prefix: "/knowledge-base/", href: "/knowledge-base/", label: "Knowledge Base" },
      { prefix: "/doc-repository/", href: "/doc-repository/", label: "Documentation Repository" },
      { prefix: "/program/", href: "/program/", label: "Programme" },
      { prefix: "/pricing/", href: "/pricing/", label: "Pricing" }
    ];
    const HOME_TARGET = { href: "/", label: "Home" };
    const backTarget = computed(() => {
      const path = typeof route.path === "string" ? route.path : "";
      for (const entry of SECTION_PREFIXES) {
        if (path.startsWith(entry.prefix)) {
          return { href: entry.href, label: entry.label };
        }
      }
      return HOME_TARGET;
    });
    const requestedPath = computed(
      () => typeof route.path === "string" ? route.path : ""
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdHero = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-not-found" }, _attrs))} data-v-b282e3b3>`);
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "404",
        title: "Page not found",
        lede: `We couldn't find a page at <code>${unref(requestedPath)}</code>. The link may be
        out of date, or the page may have been moved or renamed. Use the link below to
        head back to a known section.`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-not-found__back" data-v-b282e3b3${_scopeId}><a${ssrRenderAttr("href", unref(backTarget).href)} class="ed-not-found__back-link" data-v-b282e3b3${_scopeId}><span class="ed-not-found__back-arrow" data-v-b282e3b3${_scopeId}>←</span> Back to ${ssrInterpolate(unref(backTarget).label)}</a></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-not-found__back" }, [
                createVNode("a", {
                  href: unref(backTarget).href,
                  class: "ed-not-found__back-link"
                }, [
                  createVNode("span", { class: "ed-not-found__back-arrow" }, "←"),
                  createTextVNode(" Back to " + toDisplayString(unref(backTarget).label), 1)
                ], 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/[...notFound].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____notFound_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b282e3b3"]]);
export {
  ____notFound_ as default
};
