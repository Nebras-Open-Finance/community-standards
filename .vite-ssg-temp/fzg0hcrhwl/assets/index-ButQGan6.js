import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { h as useInternalPages, j as appPageSlugs, p as prettifySlug, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Internal" });
    useRouter();
    const { drafts, committedSlugs } = useInternalPages();
    const PUBLISHED_FILTER = /* @__PURE__ */ new Set(["example"]);
    const publishedContent = computed(() => committedSlugs.filter((s) => !PUBLISHED_FILTER.has(s)));
    const topLevelTools = appPageSlugs.filter((s) => !s.includes("/"));
    const CERT_LABELS = {
      "lfi-certificate": "LFI certificate",
      "tpp-certificate": "TPP certificate"
    };
    const certTools = computed(() => topLevelTools.filter((s) => s in CERT_LABELS));
    const otherTools = computed(() => topLevelTools.filter((s) => !(s in CERT_LABELS)));
    function toolLabel(s) {
      return CERT_LABELS[s] ?? prettifySlug(s);
    }
    function formatDate(ts) {
      try {
        return new Date(ts).toLocaleString();
      } catch {
        return "";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "int-home" }, _attrs))} data-v-f5142204><section class="int-home__hero" data-v-f5142204><div class="int-home__eyebrow" data-v-f5142204><span class="int-home__dash" data-v-f5142204></span> Internal </div><h1 class="int-home__title" data-v-f5142204>Internal pages</h1><p class="int-home__lede" data-v-f5142204> A private space for drafting documentation. Open the example page, duplicate it to create a new draft, then edit the Markdown directly with a preview toggle. Drafts are stored only in this browser until you publish them to the repository. </p></section><section class="int-card int-card--policies" data-v-f5142204><h2 class="int-card__heading" data-v-f5142204>Policies</h2><p class="int-card__hint" data-v-f5142204> Nebras’s internal corporate governance policies — governance, risk, security, conduct, and people frameworks — transcribed from the Restricted source documents into browsable pages, grouped by theme. </p><a class="int-cta" href="/internal/policies/" data-v-f5142204>Open the policies space →</a></section><section class="int-card int-card--example" data-v-f5142204><h2 class="int-card__heading" data-v-f5142204>Start a new draft</h2><p class="int-card__hint" data-v-f5142204> The example page demonstrates every block element you can use on an internal page. Open it and use the duplicate widget at the top to seed a fresh draft. </p><a class="int-cta" href="/internal/example" data-v-f5142204>Open the example page →</a></section>`);
      if (unref(topLevelTools).length) {
        _push(`<section class="int-card" data-v-f5142204><h2 class="int-card__heading" data-v-f5142204>Tools</h2><p class="int-card__hint" data-v-f5142204> Interactive pages built as Vue components. They sit behind the same password gate but are applications rather than documents, so they have no Markdown/Preview toggle. </p>`);
        if (unref(otherTools).length) {
          _push(`<ul class="int-list" data-v-f5142204><!--[-->`);
          ssrRenderList(unref(otherTools), (s) => {
            _push(`<li class="int-list__item" data-v-f5142204><a class="int-list__main"${ssrRenderAttr("href", "/internal/pages/" + s)} data-v-f5142204><span class="int-list__name" data-v-f5142204>${ssrInterpolate(unref(prettifySlug)(s))}</span><span class="int-list__meta" data-v-f5142204><code data-v-f5142204>/internal/pages/${ssrInterpolate(s)}</code></span></a></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(certTools).length) {
          _push(`<!--[--><h3 class="int-card__subheading" data-v-f5142204>Commercial Go-Live Certificates</h3><ul class="int-list" data-v-f5142204><!--[-->`);
          ssrRenderList(unref(certTools), (s) => {
            _push(`<li class="int-list__item" data-v-f5142204><a class="int-list__main"${ssrRenderAttr("href", "/internal/pages/" + s)} data-v-f5142204><span class="int-list__name" data-v-f5142204>${ssrInterpolate(toolLabel(s))}</span><span class="int-list__meta" data-v-f5142204><code data-v-f5142204>/internal/pages/${ssrInterpolate(s)}</code></span></a></li>`);
          });
          _push(`<!--]--></ul><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="int-card" data-v-f5142204><h2 class="int-card__heading" data-v-f5142204>Drafts in this browser</h2><p class="int-card__hint" data-v-f5142204> Work in progress. These are not visible to anyone else and are lost if you clear browser data. </p>`);
      if (unref(drafts).length) {
        _push(`<ul class="int-list" data-v-f5142204><!--[-->`);
        ssrRenderList(unref(drafts), (d) => {
          _push(`<li class="int-list__item" data-v-f5142204><button type="button" class="int-list__main" data-v-f5142204><span class="int-list__name" data-v-f5142204>${ssrInterpolate(d.title || unref(prettifySlug)(d.slug))}</span><span class="int-list__meta" data-v-f5142204><code data-v-f5142204>${ssrInterpolate(d.slug)}</code> · edited ${ssrInterpolate(formatDate(d.updatedAt))}</span></button><button type="button" class="int-list__del" data-v-f5142204>Delete</button></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p class="int-empty" data-v-f5142204>No drafts yet — duplicate the example page to get started.</p>`);
      }
      _push(`</section><section class="int-card" data-v-f5142204><h2 class="int-card__heading" data-v-f5142204>Published pages</h2><p class="int-card__hint" data-v-f5142204> Markdown pages that have been committed to the repository and deployed. </p>`);
      if (unref(publishedContent).length) {
        _push(`<ul class="int-list" data-v-f5142204><!--[-->`);
        ssrRenderList(unref(publishedContent), (s) => {
          _push(`<li class="int-list__item" data-v-f5142204><a class="int-list__main"${ssrRenderAttr("href", "/internal/" + s)} data-v-f5142204><span class="int-list__name" data-v-f5142204>${ssrInterpolate(unref(prettifySlug)(s))}</span><span class="int-list__meta" data-v-f5142204><code data-v-f5142204>/internal/${ssrInterpolate(s)}</code></span></a></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p class="int-empty" data-v-f5142204>No pages have been published yet.</p>`);
      }
      _push(`</section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5142204"]]);
export {
  index as default
};
