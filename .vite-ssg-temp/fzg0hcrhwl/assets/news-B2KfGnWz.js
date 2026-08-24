import { k as countByKind, A as ARTICLE_KINDS, m as ARTICLE_KIND_LABELS, n as articles, q as __unplugin_components_0, _ as _export_sfc, b as block0 } from "../main.mjs";
import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const PAGE_SIZE = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "news",
  __ssrInlineRender: true,
  setup(__props) {
    const kindLabels = ARTICLE_KIND_LABELS;
    const activeFilter = ref("all");
    const sortOrder = ref("newest");
    const currentPage = ref(1);
    const counts = countByKind();
    const filters = computed(() => [
      { key: "all", label: "All articles", count: counts.all },
      ...ARTICLE_KINDS.filter((k) => (counts[k] || 0) > 0).map((k) => ({
        key: k,
        label: ARTICLE_KIND_LABELS[k],
        count: counts[k]
      }))
    ]);
    const activeFilterLabel = computed(
      () => {
        var _a;
        return ((_a = filters.value.find((f) => f.key === activeFilter.value)) == null ? void 0 : _a.label) || "All";
      }
    );
    watch(sortOrder, () => {
      currentPage.value = 1;
    });
    const filtered = computed(() => {
      const base = activeFilter.value === "all" ? articles : articles.filter((a) => a.kind === activeFilter.value);
      const sorted = [...base];
      if (sortOrder.value === "oldest")
        sorted.sort((a, b) => a.date.localeCompare(b.date));
      else if (sortOrder.value === "source")
        sorted.sort((a, b) => (a.source || "").localeCompare(b.source || ""));
      else sorted.sort((a, b) => b.date.localeCompare(a.date));
      return sorted;
    });
    const featured = computed(
      () => sortOrder.value === "newest" && activeFilter.value === "all" ? filtered.value[0] ?? null : null
    );
    const paginatableArticles = computed(
      () => featured.value ? filtered.value.slice(1) : filtered.value
    );
    const pageCount = computed(
      () => Math.max(1, Math.ceil(paginatableArticles.value.length / PAGE_SIZE))
    );
    const remaining = computed(() => {
      const start = (currentPage.value - 1) * PAGE_SIZE;
      return paginatableArticles.value.slice(start, start + PAGE_SIZE);
    });
    const pageNumbers = computed(() => {
      const total = pageCount.value;
      const cur = currentPage.value;
      const windowSet = /* @__PURE__ */ new Set([1, total, cur - 1, cur, cur + 1]);
      const pages = [...windowSet].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
      const out = [];
      let prev = 0;
      for (const p of pages) {
        if (prev && p - prev > 1)
          out.push({ key: `gap-${prev}`, type: "gap", label: "…" });
        out.push({
          key: `p-${p}`,
          type: "page",
          page: p,
          label: String(p).padStart(2, "0")
        });
        prev = p;
      }
      return out;
    });
    const monthLabel = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric"
    }).toUpperCase();
    const issueNumber = (() => {
      const start = (/* @__PURE__ */ new Date("2025-01-01T00:00:00Z")).getTime();
      const week = Math.floor((Date.now() - start) / (7 * 24 * 3600 * 1e3));
      return String(week).padStart(2, "0");
    })();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleLink = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-news" }, _attrs))} data-v-f5298bc8><section class="ed-news-masthead" data-v-f5298bc8><div class="ed-news-masthead__inner" data-v-f5298bc8><div class="ed-news-masthead__meta" data-v-f5298bc8><div class="ed-news-masthead__label" data-v-f5298bc8><span class="ed-news-masthead__label-dash" data-v-f5298bc8></span> Section · Articles </div><div class="ed-news-masthead__issue" data-v-f5298bc8>ISSUE ${ssrInterpolate(unref(issueNumber))} · ${ssrInterpolate(unref(monthLabel))}</div></div><h1 class="ed-news-masthead__title" data-v-f5298bc8> Articles <span class="ed-news-masthead__amp" data-v-f5298bc8>&amp;</span> press. </h1><div class="ed-news-masthead__count" data-v-f5298bc8>${ssrInterpolate(unref(articles).length)} entries<br data-v-f5298bc8>indexed </div></div><p class="ed-news-masthead__sub" data-v-f5298bc8> A running log of industry coverage, regulatory milestones and press releases tracking the UAE Open Finance programme — and the global Open Banking scene it’s measured against. </p></section><section class="ed-news-controls" data-v-f5298bc8><div class="ed-news-controls__inner" data-v-f5298bc8><nav class="ed-filter-rail" aria-label="Filter by category" data-v-f5298bc8><!--[-->`);
      ssrRenderList(unref(filters), (f) => {
        _push(`<button class="${ssrRenderClass([{ "is-active": unref(activeFilter) === f.key }, "ed-filter-rail__btn"])}" data-v-f5298bc8>${ssrInterpolate(f.label)} <span class="ed-filter-rail__count" data-v-f5298bc8>${ssrInterpolate(f.count)}</span></button>`);
      });
      _push(`<!--]--></nav><label class="ed-sort" data-v-f5298bc8><span class="ed-sort__label" data-v-f5298bc8>Sort</span><select class="ed-sort__select" data-v-f5298bc8><option value="newest" data-v-f5298bc8${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "newest") : ssrLooseEqual(unref(sortOrder), "newest")) ? " selected" : ""}>Newest first</option><option value="oldest" data-v-f5298bc8${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "oldest") : ssrLooseEqual(unref(sortOrder), "oldest")) ? " selected" : ""}>Oldest first</option><option value="source" data-v-f5298bc8${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "source") : ssrLooseEqual(unref(sortOrder), "source")) ? " selected" : ""}>By source (A–Z)</option></select></label></div></section><section class="ed-news-body" data-v-f5298bc8><div class="ed-news-body__inner" data-v-f5298bc8>`);
      if (unref(featured) && unref(currentPage) === 1) {
        _push(`<div class="ed-news-body__featured" data-v-f5298bc8>`);
        _push(ssrRenderComponent(_component_ArticleLink, {
          variant: "feature",
          link: unref(featured).link,
          title: unref(featured).title,
          date: unref(featured).dateLabel,
          text: unref(featured).text,
          "image-src": unref(featured).imageSrc,
          kind: unref(kindLabels)[unref(featured).kind],
          source: unref(featured).source
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(remaining).length) {
        _push(`<div class="ed-news-body__grid" data-v-f5298bc8><!--[-->`);
        ssrRenderList(unref(remaining), (a) => {
          _push(ssrRenderComponent(_component_ArticleLink, {
            key: a.id,
            link: a.link,
            title: a.title,
            date: a.dateLabel,
            text: a.text,
            "image-src": a.imageSrc,
            kind: unref(kindLabels)[a.kind],
            source: a.source
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="ed-news-body__empty" data-v-f5298bc8><span class="ed-news-body__empty-kicker" data-v-f5298bc8>No match</span><h3 data-v-f5298bc8>Nothing yet in “${ssrInterpolate(unref(activeFilterLabel))}”</h3><p data-v-f5298bc8>Try a different category or clear the filter.</p><button class="ed-more-link" data-v-f5298bc8>Clear filter →</button></div>`);
      }
      if (unref(pageCount) > 1) {
        _push(`<nav class="ed-pager" aria-label="Pagination" data-v-f5298bc8><button class="ed-pager__btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} data-v-f5298bc8>← Previous</button><span class="ed-pager__pages" data-v-f5298bc8><!--[-->`);
        ssrRenderList(unref(pageNumbers), (n) => {
          _push(`<button class="${ssrRenderClass(["ed-pager__page", { "is-active": n.type === "page" && n.page === unref(currentPage), "is-gap": n.type === "gap" }])}"${ssrIncludeBooleanAttr(n.type === "gap") ? " disabled" : ""} data-v-f5298bc8>${ssrInterpolate(n.label)}</button>`);
        });
        _push(`<!--]--></span><button class="ed-pager__btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(pageCount)) ? " disabled" : ""} data-v-f5298bc8>Next →</button></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5298bc8"]]);
export {
  news as default
};
