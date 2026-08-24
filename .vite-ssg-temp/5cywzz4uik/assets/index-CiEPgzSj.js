import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { r as routes, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
function readArticleMeta(meta) {
  if (!meta || typeof meta !== "object") return null;
  const m = meta;
  if (m["isIndex"] === true) return null;
  const title = typeof m["title"] === "string" ? m["title"] : "";
  const description = typeof m["description"] === "string" ? m["description"] : "";
  const category = typeof m["category"] === "string" ? m["category"] : "";
  const readTime = typeof m["readTime"] === "string" ? m["readTime"] : "";
  const updated = typeof m["updated"] === "string" ? m["updated"] : "";
  const tagsRaw = m["tags"];
  const tags = Array.isArray(tagsRaw) ? tagsRaw.filter((x) => typeof x === "string") : [];
  if (!title) return null;
  return { title, description, category, readTime, updated, tags };
}
function slugFromPath(path) {
  const trimmed = path.replace(/\/+$/, "");
  const idx = trimmed.lastIndexOf("/");
  return idx >= 0 ? trimmed.slice(idx + 1) : trimmed;
}
function buildArticle(route, meta) {
  const slug = slugFromPath(route.path);
  return {
    slug,
    url: `/knowledge-base/articles/${slug}`,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    readTime: meta.readTime,
    updated: meta.updated,
    tags: meta.tags
  };
}
function flatten(routes2) {
  const out = [];
  for (const r of routes2) {
    out.push(r);
    if (r.children && r.children.length > 0) out.push(...flatten(r.children));
  }
  return out;
}
const ARTICLE_DETAIL_PATH = /^\/knowledge-base\/articles\/[^/]+\/?$/;
const articles = flatten(routes).filter((r) => ARTICLE_DETAIL_PATH.test(r.path)).map((r) => {
  const meta = readArticleMeta(r.meta);
  return meta ? buildArticle(r, meta) : null;
}).filter((a) => a !== null).sort((a, b) => a.title.localeCompare(b.title));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CATEGORY_ORDER = ["Consents", "Payments", "Security", "Integration"];
    const CATEGORY_COLORS = {
      Consents: "var(--at-teal)",
      Payments: "var(--at-gold)",
      Security: "var(--at-blue)",
      Integration: "var(--at-blue-deep)"
    };
    const CATEGORY_TAG_BG = {
      Consents: "rgba(0, 194, 169, 0.10)",
      Payments: "rgba(179, 120, 25, 0.10)",
      Security: "rgba(0, 139, 228, 0.10)",
      Integration: "rgba(0, 67, 166, 0.10)"
    };
    const query = ref("");
    const activeCategory = ref("all");
    const categories = computed(() => {
      const counts = {};
      for (const a of articles) {
        if (!a.category) continue;
        counts[a.category] = (counts[a.category] ?? 0) + 1;
      }
      const ordered = CATEGORY_ORDER.filter((name) => (counts[name] ?? 0) > 0).map((name) => ({
        id: name,
        label: name,
        count: counts[name] ?? 0,
        color: CATEGORY_COLORS[name] ?? "var(--at-navy)"
      }));
      return [
        { id: "all", label: "All Topics", count: articles.length, color: "var(--at-navy)" },
        ...ordered
      ];
    });
    const filteredArticles = computed(() => {
      const q = query.value.trim().toLowerCase();
      return articles.filter((a) => {
        if (activeCategory.value !== "all" && a.category !== activeCategory.value) return false;
        if (!q) return true;
        return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || (a.category || "").toLowerCase().includes(q) || (a.tags || []).some((t) => t.toLowerCase().includes(q));
      });
    });
    const activeColor = computed(() => {
      const hit = categories.value.find((c) => c.id === activeCategory.value);
      return hit ? hit.color : "var(--at-navy)";
    });
    function colorFor(category) {
      return CATEGORY_COLORS[category] ?? "var(--at-navy)";
    }
    function tagBackground(category) {
      return CATEGORY_TAG_BG[category] ?? "rgba(0, 39, 127, 0.06)";
    }
    const MONTH_SHORT = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function formatUpdated(iso) {
      if (!iso) return "";
      const parts = iso.split("-");
      if (parts.length !== 3) return iso;
      const [y, m, d] = parts;
      if (!y || !m || !d) return iso;
      const monthIdx = parseInt(m, 10) - 1;
      const mm = MONTH_SHORT[monthIdx] ?? m;
      return `${parseInt(d, 10)} ${mm} ${y}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-kb" }, _attrs))} data-v-8e627cb2><section class="ed-kb-hero" data-v-8e627cb2><div class="ed-kb-hero__inner" data-v-8e627cb2><div class="ed-kb-hero__label" data-v-8e627cb2><span class="ed-kb-hero__label-dash" data-v-8e627cb2></span> Learn · Understand · Build </div><h1 class="ed-kb-hero__title" data-v-8e627cb2>Knowledge Base</h1><p class="ed-kb-hero__sub" data-v-8e627cb2> Guides, explainers, and deep-dives into Open Finance concepts, technical standards, and integration patterns. Built by the community, for the community. </p><div class="ed-kb-search" data-v-8e627cb2><svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8e627cb2><circle cx="11" cy="11" r="8" data-v-8e627cb2></circle><path d="m21 21-4.35-4.35" data-v-8e627cb2></path></svg><input${ssrRenderAttr("value", unref(query))} class="ed-kb-search__input" type="search" placeholder="Search articles, guides, topics…" aria-label="Search knowledge base articles" data-v-8e627cb2>`);
      if (unref(query)) {
        _push(`<button class="ed-kb-search__clear" aria-label="Clear search" data-v-8e627cb2>×</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="ed-kb-filter" data-v-8e627cb2><div class="ed-kb-filter__inner" data-v-8e627cb2><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([{ "ed-kb-chip--active": unref(activeCategory) === cat.id }, "ed-kb-chip"])}" style="${ssrRenderStyle(unref(activeCategory) === cat.id ? { background: cat.color, borderColor: cat.color, color: "var(--at-bg-cream)" } : { borderColor: "var(--at-grid-line)", color: "var(--at-navy)" })}" data-v-8e627cb2>${ssrInterpolate(cat.label)} · ${ssrInterpolate(cat.count)}</button>`);
      });
      _push(`<!--]--></div></section><section class="ed-kb-articles" data-v-8e627cb2><div class="ed-kb-articles__inner" data-v-8e627cb2><div class="ed-kb-count" style="${ssrRenderStyle({ color: unref(activeColor) })}" data-v-8e627cb2>${ssrInterpolate(unref(filteredArticles).length)} ${ssrInterpolate(unref(filteredArticles).length === 1 ? "Article" : "Articles")} `);
      if (unref(query)) {
        _push(`<!--[-->· Search: &quot;${ssrInterpolate(unref(query))}&quot;<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(filteredArticles).length > 0) {
        _push(`<div class="ed-kb-grid" data-v-8e627cb2><!--[-->`);
        ssrRenderList(unref(filteredArticles), (article) => {
          _push(`<a${ssrRenderAttr("href", article.url)} class="ed-kb-card" style="${ssrRenderStyle({ "--kb-card-color": colorFor(article.category) })}" data-v-8e627cb2><span class="ed-kb-card__top" style="${ssrRenderStyle({ background: colorFor(article.category) })}" data-v-8e627cb2></span><div class="ed-kb-card__meta" data-v-8e627cb2><span class="ed-kb-card__cat" style="${ssrRenderStyle({ color: colorFor(article.category) })}" data-v-8e627cb2>${ssrInterpolate(article.category || "Uncategorised")}</span>`);
          if (article.readTime) {
            _push(`<span class="ed-kb-card__dot" data-v-8e627cb2>·</span>`);
          } else {
            _push(`<!---->`);
          }
          if (article.readTime) {
            _push(`<span class="ed-kb-card__read" data-v-8e627cb2>${ssrInterpolate(article.readTime)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><h3 class="ed-kb-card__title" data-v-8e627cb2>${ssrInterpolate(article.title)}</h3><p class="ed-kb-card__desc" data-v-8e627cb2>${ssrInterpolate(article.description)}</p>`);
          if (article.tags && article.tags.length) {
            _push(`<div class="ed-kb-card__tags" data-v-8e627cb2><!--[-->`);
            ssrRenderList(article.tags, (tag) => {
              _push(`<span class="ed-kb-card__tag" style="${ssrRenderStyle({
                background: tagBackground(article.category),
                color: colorFor(article.category)
              })}" data-v-8e627cb2>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-kb-card__foot" data-v-8e627cb2>`);
          if (article.updated) {
            _push(`<span class="ed-kb-card__updated" data-v-8e627cb2> Updated ${ssrInterpolate(formatUpdated(article.updated))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="ed-kb-card__arrow" style="${ssrRenderStyle({ color: colorFor(article.category) })}" data-v-8e627cb2>→</span></div></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="ed-kb-empty" data-v-8e627cb2><div class="ed-kb-empty__icon" data-v-8e627cb2>⌕</div><h3 class="ed-kb-empty__title" data-v-8e627cb2>No articles found</h3><p class="ed-kb-empty__sub" data-v-8e627cb2>`);
        if (unref(query)) {
          _push(`<!--[-->No matches for <strong data-v-8e627cb2>&quot;${ssrInterpolate(unref(query))}&quot;</strong>. <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(` Try adjusting your search or filter criteria. </p></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8e627cb2"]]);
export {
  index as default
};
