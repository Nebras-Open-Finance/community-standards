import { defineComponent, computed, ref, reactive, onMounted, watch, resolveComponent, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { T as TRUST_FRAMEWORK_RELEASES, c as yearOf, d as TRUST_FRAMEWORK_CATEGORIES, l as latestApiHubYear, e as anchorFor } from "./release-notes-years-g5sqBxpI.js";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import { useRoute } from "vue-router";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[year]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const year = computed(() => {
      const raw = route.params["year"];
      return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] ?? "" : "";
    });
    const yearEntries = computed(
      () => TRUST_FRAMEWORK_RELEASES.filter((e) => yearOf(e) === year.value).slice().sort((a, b) => {
        if (a.release !== b.release) return b.release.localeCompare(a.release, void 0, { numeric: true });
        return a.number - b.number;
      })
    );
    const releases = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const e of yearEntries.value) {
        if (!map.has(e.release)) {
          map.set(e.release, { release: e.release, effectiveDate: e.effectiveDate, planned: !!e.planned });
        }
      }
      return [...map.values()];
    });
    const query = ref("");
    const categoryFilter = reactive(/* @__PURE__ */ new Set());
    ref(null);
    function haystack(entry) {
      const parts = [entry.title, entry.description ?? "", entry.release, entry.category];
      return parts.join(" \n ").toLowerCase();
    }
    function matchesCategories(entry, cats) {
      if (cats.size === 0) return true;
      return cats.has(entry.category);
    }
    function matchesQuery(entry, q) {
      if (!q) return true;
      return haystack(entry).includes(q);
    }
    const filteredEntries = computed(() => {
      const q = query.value.trim().toLowerCase();
      return yearEntries.value.filter(
        (e) => matchesCategories(e, categoryFilter) && matchesQuery(e, q)
      );
    });
    const groupedResults = computed(() => {
      const groups = /* @__PURE__ */ new Map();
      for (const e of filteredEntries.value) {
        let g = groups.get(e.release);
        if (!g) {
          g = { release: e.release, effectiveDate: e.effectiveDate, planned: !!e.planned, entries: [] };
          groups.set(e.release, g);
        }
        g.entries.push(e);
      }
      return [...groups.values()].map((g) => {
        const bucketMap = /* @__PURE__ */ new Map();
        for (const cat of TRUST_FRAMEWORK_CATEGORIES) bucketMap.set(cat, []);
        for (const e of g.entries) {
          const list = bucketMap.get(e.category);
          if (list) list.push(e);
          else bucketMap.set(e.category, [e]);
        }
        const buckets = [...bucketMap.entries()].filter(([, items]) => items.length > 0).map(([category, entries]) => ({ category, entries }));
        return { ...g, buckets };
      });
    });
    function countWith(overrides) {
      const q = (overrides.query !== void 0 ? overrides.query : query.value).trim().toLowerCase();
      const cats = overrides.categories !== void 0 ? overrides.categories : categoryFilter;
      return yearEntries.value.filter(
        (e) => matchesCategories(e, cats) && matchesQuery(e, q)
      ).length;
    }
    function categoryCount(cat) {
      const next = new Set(categoryFilter);
      next.add(cat);
      return countWith({ categories: next });
    }
    const anyFilterActive = computed(() => !!query.value || categoryFilter.size > 0);
    function anchorFor$1(entry) {
      return anchorFor(entry);
    }
    function paragraphsOf(text) {
      return String(text ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    }
    function formatDate(iso) {
      if (!iso) return "";
      if (/^\d{4}$/.test(iso)) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
    function toneOf(category) {
      if (category === "New Features") return "feature";
      if (category === "Enhancements") return "enhancement";
      return "bugfix";
    }
    function escapeHtml(str) {
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function highlight(text) {
      const safe = escapeHtml(text || "");
      const q = query.value.trim();
      if (!q) return safe;
      const re = new RegExp(`(${escapeRegex(q)})`, "ig");
      return safe.replace(re, '<mark class="ed-tfr-mark">$1</mark>');
    }
    function isCategory(value) {
      return TRUST_FRAMEWORK_CATEGORIES.includes(value);
    }
    function readFromUrl() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) query.value = q;
      const cats = params.get("category");
      if (cats) {
        for (const c of cats.split(",").filter(Boolean)) {
          if (isCategory(c)) categoryFilter.add(c);
        }
      }
    }
    function writeToUrl() {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const sp = url.searchParams;
      if (query.value) sp.set("q", query.value);
      else sp.delete("q");
      if (categoryFilter.size) sp.set("category", [...categoryFilter].join(","));
      else sp.delete("category");
      window.history.replaceState({}, "", url.toString());
    }
    onMounted(() => readFromUrl());
    watch([query, () => [...categoryFilter]], writeToUrl);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      if (unref(yearEntries).length === 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-tfr" }, _attrs))} data-v-3d5d1614><section class="ed-tfr-hero" data-v-3d5d1614><div class="ed-tfr-hero__inner" data-v-3d5d1614><h1 class="ed-tfr-hero__title" data-v-3d5d1614>No releases recorded for ${ssrInterpolate(unref(year))}</h1><p class="ed-tfr-hero__sub" data-v-3d5d1614> The Trust Framework release-notes register has no entries for <strong data-v-3d5d1614>${ssrInterpolate(unref(year))}</strong>. `);
        _push(ssrRenderComponent(_component_router_link, { to: "/tech/release-notes-and-erratas/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Release Notes &amp; Erratas`);
            } else {
              return [
                createTextVNode("Back to Release Notes & Erratas")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`. </p></div></section></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-tfr" }, _attrs))} data-v-3d5d1614><section class="ed-tfr-hero" data-v-3d5d1614><div class="ed-tfr-hero__inner" data-v-3d5d1614><div class="ed-tfr-hero__label" data-v-3d5d1614><span class="ed-tfr-hero__label-dash" data-v-3d5d1614></span> Directory deployments · ${ssrInterpolate(unref(year))}</div><h1 class="ed-tfr-hero__title" data-v-3d5d1614>Trust Framework Release Notes — ${ssrInterpolate(unref(year))}</h1><p class="ed-tfr-hero__sub" data-v-3d5d1614> Changes deployed to the <strong data-v-3d5d1614>Trust Framework directory</strong> during ${ssrInterpolate(unref(year))} — the Raidiam-operated directory, certificate authority, and role/scope reference data that underpins participant identity. Each entry records what was deployed, when it became effective, and its category. </p><div class="ed-tfr-hero__vendor" data-v-3d5d1614><span class="ed-tfr-hero__vendor-label" data-v-3d5d1614>Vendor</span><span class="ed-tfr-hero__vendor-body" data-v-3d5d1614> The directory is delivered by Raidiam. Full vendor release notes are at <a href="https://www.raidiam.com/developers/versioned-release-notes" target="_blank" rel="noopener" data-v-3d5d1614>raidiam.com/developers/versioned-release-notes</a>. </span></div><div class="ed-tfr-stats" data-v-3d5d1614><div class="ed-tfr-stat" data-v-3d5d1614><span class="ed-tfr-stat__num" data-v-3d5d1614>${ssrInterpolate(unref(yearEntries).length)}</span><span class="ed-tfr-stat__label" data-v-3d5d1614>${ssrInterpolate(unref(yearEntries).length === 1 ? "change" : "changes")}</span></div><div class="ed-tfr-stat" data-v-3d5d1614><span class="ed-tfr-stat__num" data-v-3d5d1614>${ssrInterpolate(unref(releases).length)}</span><span class="ed-tfr-stat__label" data-v-3d5d1614>${ssrInterpolate(unref(releases).length === 1 ? "release" : "releases")}</span></div><div class="ed-tfr-stat" data-v-3d5d1614><span class="ed-tfr-stat__num" data-v-3d5d1614>${ssrInterpolate(unref(TRUST_FRAMEWORK_CATEGORIES).length)}</span><span class="ed-tfr-stat__label" data-v-3d5d1614>categories</span></div></div></div></section><section class="ed-tfr-search" data-v-3d5d1614><div class="ed-tfr-search__inner" data-v-3d5d1614><div class="ed-tfr-search__head" data-v-3d5d1614><div class="ed-tfr-search__eyebrow" data-v-3d5d1614><span class="ed-tfr-search__eyebrow-dash" data-v-3d5d1614></span> Filter the register </div><h2 class="ed-tfr-search__title" data-v-3d5d1614>Find a change</h2><p class="ed-tfr-search__lede" data-v-3d5d1614> Narrow by <strong data-v-3d5d1614>category</strong> or add a keyword to search titles and descriptions. </p></div><div class="ed-tfr-facet" data-v-3d5d1614><div class="ed-tfr-facet__label" data-v-3d5d1614>Category</div><div class="ed-tfr-facet__pills" data-v-3d5d1614><!--[-->`);
        ssrRenderList(unref(TRUST_FRAMEWORK_CATEGORIES), (cat) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-tfr-pill--active": unref(categoryFilter).has(cat),
            "ed-tfr-pill--disabled": categoryCount(cat) === 0,
            [`ed-tfr-pill--${toneOf(cat)}`]: true
          }, "ed-tfr-pill"])}"${ssrIncludeBooleanAttr(categoryCount(cat) === 0 && !unref(categoryFilter).has(cat)) ? " disabled" : ""} data-v-3d5d1614><span class="ed-tfr-pill__text" data-v-3d5d1614>${ssrInterpolate(cat)}</span><span class="ed-tfr-pill__count" data-v-3d5d1614>${ssrInterpolate(categoryCount(cat))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-tfr-facet ed-tfr-facet--keyword" data-v-3d5d1614><div class="ed-tfr-facet__label" data-v-3d5d1614>Keyword</div><div class="ed-tfr-input" data-v-3d5d1614><svg class="ed-tfr-input__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3d5d1614><circle cx="11" cy="11" r="7" data-v-3d5d1614></circle><path d="m20 20-3.5-3.5" data-v-3d5d1614></path></svg><input${ssrRenderAttr("value", unref(query))} type="search" class="ed-tfr-input__field" placeholder="Search title or description" autocomplete="off" spellcheck="false" data-v-3d5d1614>`);
        if (unref(query)) {
          _push(`<button class="ed-tfr-input__clear" type="button" aria-label="Clear keyword" data-v-3d5d1614>×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="ed-tfr-meter" data-v-3d5d1614><span class="ed-tfr-meter__count" data-v-3d5d1614><strong data-v-3d5d1614>${ssrInterpolate(unref(filteredEntries).length)}</strong> of ${ssrInterpolate(unref(yearEntries).length)} ${ssrInterpolate(unref(yearEntries).length === 1 ? "change" : "changes")}</span>`);
        if (unref(anyFilterActive)) {
          _push(`<button type="button" class="ed-tfr-meter__reset" data-v-3d5d1614>Reset filters ×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filteredEntries).length === 0) {
          _push(`<div class="ed-tfr-empty" data-v-3d5d1614><div class="ed-tfr-empty__title" data-v-3d5d1614>No changes match the current filters</div><p class="ed-tfr-empty__body" data-v-3d5d1614> Try removing a filter or clearing the keyword. The pill counts above show how many entries each filter would surface on its own. </p><button class="ed-tfr-empty__btn" data-v-3d5d1614>Reset filters</button></div>`);
        } else {
          _push(`<div class="ed-tfr-groups" data-v-3d5d1614><!--[-->`);
          ssrRenderList(unref(groupedResults), (group) => {
            _push(`<div class="ed-tfr-group" data-v-3d5d1614><div class="ed-tfr-group__head" data-v-3d5d1614><div class="ed-tfr-group__main" data-v-3d5d1614><div class="ed-tfr-group__tag" data-v-3d5d1614>Release</div><div class="ed-tfr-group__id" data-v-3d5d1614>${ssrInterpolate(group.release)}</div><div class="ed-tfr-group__date" data-v-3d5d1614>${ssrInterpolate(formatDate(group.effectiveDate))} `);
            if (group.planned) {
              _push(`<span class="ed-tfr-group__planned" data-v-3d5d1614>Planned</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="ed-tfr-group__count" data-v-3d5d1614>${ssrInterpolate(group.entries.length)} ${ssrInterpolate(group.entries.length === 1 ? "change" : "changes")}</div></div><!--[-->`);
            ssrRenderList(group.buckets, (bucket) => {
              _push(`<div class="ed-tfr-bucket" data-v-3d5d1614><div class="${ssrRenderClass([`ed-tfr-bucket__head--${toneOf(bucket.category)}`, "ed-tfr-bucket__head"])}" data-v-3d5d1614><span class="ed-tfr-bucket__marker" data-v-3d5d1614></span><span class="ed-tfr-bucket__label" data-v-3d5d1614>${ssrInterpolate(bucket.category)}</span><span class="ed-tfr-bucket__count" data-v-3d5d1614>${ssrInterpolate(bucket.entries.length)}</span></div><!--[-->`);
              ssrRenderList(bucket.entries, (entry) => {
                _push(`<article${ssrRenderAttr("id", anchorFor$1(entry))} class="${ssrRenderClass([`ed-tfr-card--${toneOf(entry.category)}`, "ed-tfr-card"])}" data-v-3d5d1614><header class="ed-tfr-card__head" data-v-3d5d1614><div class="ed-tfr-card__num" data-v-3d5d1614>§${ssrInterpolate(entry.number)}</div><div class="ed-tfr-card__heading" data-v-3d5d1614><h3 class="ed-tfr-card__title" data-v-3d5d1614>${highlight(entry.title) ?? ""}</h3></div><div class="ed-tfr-card__cat" data-v-3d5d1614><span class="${ssrRenderClass([`ed-tfr-cat--${toneOf(entry.category)}`, "ed-tfr-cat"])}" data-v-3d5d1614>${ssrInterpolate(entry.category)}</span></div></header>`);
                if (entry.description) {
                  _push(`<div class="ed-tfr-card__body" data-v-3d5d1614><!--[-->`);
                  ssrRenderList(paragraphsOf(entry.description), (para, i) => {
                    _push(`<p class="ed-tfr-card__para" data-v-3d5d1614>${highlight(para) ?? ""}</p>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</article>`);
              });
              _push(`<!--]--></div>`);
            });
            _push(`<!--]--></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></section><section class="ed-tfr-cross" data-v-3d5d1614><div class="ed-tfr-cross__inner" data-v-3d5d1614><div class="ed-tfr-cross__eyebrow" data-v-3d5d1614><span class="ed-tfr-cross__eyebrow-dash" data-v-3d5d1614></span> Related registers </div><p class="ed-tfr-cross__body" data-v-3d5d1614> For changes deployed to the <strong data-v-3d5d1614>API Hub platform</strong> rather than the directory, see <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/release-notes/api-hub/${unref(latestApiHubYear)}`)} data-v-3d5d1614> API Hub Release Notes</a>. For corrections to <strong data-v-3d5d1614>published documentation</strong>, see <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/erratas/${unref(CURRENT_VERSION)}/`)} data-v-3d5d1614>Erratas</a>. </p></div></section></div>`);
      }
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/release-notes-and-erratas/release-notes/trust-framework/[year].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _year_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d5d1614"]]);
export {
  _year_ as default
};
