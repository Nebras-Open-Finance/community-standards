import { defineComponent, computed, ref, reactive, onMounted, watch, resolveComponent, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { A as API_HUB_RELEASES, y as yearOf, a as latestTrustFrameworkYear, b as anchorFor } from "./release-notes-years-g5sqBxpI.js";
import { c as useSelectedVersion, C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
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
    const { selectedVersion } = useSelectedVersion();
    const yearEntries = computed(
      () => API_HUB_RELEASES.filter((e) => yearOf(e.release) === year.value).slice().sort((a, b) => {
        if (a.release !== b.release) return b.release.localeCompare(a.release);
        return a.number - b.number;
      })
    );
    const releases = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const e of yearEntries.value) {
        if (!map.has(e.release)) map.set(e.release, e.effectiveDate);
      }
      return [...map.entries()].map(([release, effectiveDate]) => ({ release, effectiveDate }));
    });
    const areaCountTotal = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const e of yearEntries.value) for (const a of e.areas) seen.add(a);
      return seen.size;
    });
    const AUDIENCE_OPTIONS = ["TPP", "LFI"];
    const query = ref("");
    const audienceFilter = ref(null);
    const areaFilter = reactive(/* @__PURE__ */ new Set());
    const sectionFilter = reactive(/* @__PURE__ */ new Set());
    ref(null);
    function sectionsOf(entry) {
      return (entry.sections ?? []).map((s) => s.label);
    }
    function haystack(entry) {
      const parts = [
        entry.title,
        entry.summary,
        entry.description,
        entry.impact,
        entry.release,
        ...entry.areas,
        ...sectionsOf(entry),
        ...(entry.endpoints ?? []).flatMap((e) => [e.label, e.path])
      ];
      return parts.join(" \n ").toLowerCase();
    }
    function matchesAudience(entry, audience) {
      if (!audience) return true;
      return entry.audience === audience || entry.audience === "Both";
    }
    function matchesAreas(entry, areas) {
      if (areas.size === 0) return true;
      return entry.areas.some((a) => areas.has(a));
    }
    function matchesSections(entry, sections) {
      if (sections.size === 0) return true;
      return sectionsOf(entry).some((s) => sections.has(s));
    }
    function matchesQuery(entry, q) {
      if (!q) return true;
      return haystack(entry).includes(q);
    }
    const filteredEntries = computed(() => {
      const q = query.value.trim().toLowerCase();
      return yearEntries.value.filter(
        (e) => matchesAudience(e, audienceFilter.value) && matchesAreas(e, areaFilter) && matchesSections(e, sectionFilter) && matchesQuery(e, q)
      );
    });
    const groupedResults = computed(() => {
      const groups = /* @__PURE__ */ new Map();
      for (const e of filteredEntries.value) {
        let g = groups.get(e.release);
        if (!g) {
          g = { release: e.release, effectiveDate: e.effectiveDate, entries: [] };
          groups.set(e.release, g);
        }
        g.entries.push(e);
      }
      return [...groups.values()];
    });
    function countWith(overrides) {
      const q = (overrides.query !== void 0 ? overrides.query : query.value).trim().toLowerCase();
      const audience = overrides.audience !== void 0 ? overrides.audience : audienceFilter.value;
      const areas = overrides.areas !== void 0 ? overrides.areas : areaFilter;
      const sections = overrides.sections !== void 0 ? overrides.sections : sectionFilter;
      return yearEntries.value.filter(
        (e) => matchesAudience(e, audience) && matchesAreas(e, areas) && matchesSections(e, sections) && matchesQuery(e, q)
      ).length;
    }
    function audienceCount(value) {
      return countWith({ audience: value });
    }
    function areaCount(area) {
      const next = new Set(areaFilter);
      next.add(area);
      return countWith({ areas: next });
    }
    function sectionPillCount(sec) {
      const next = new Set(sectionFilter);
      next.add(sec);
      return countWith({ sections: next });
    }
    const availableAreas = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const e of yearEntries.value) for (const a of e.areas) seen.add(a);
      return [...seen].sort();
    });
    const availableSections = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const e of yearEntries.value) for (const s of sectionsOf(e)) seen.add(s);
      return [...seen].sort();
    });
    const anyFilterActive = computed(
      () => !!query.value || !!audienceFilter.value || areaFilter.size > 0 || sectionFilter.size > 0
    );
    function sectionUrl(ref2) {
      const target = ref2.target === "lfi" ? "lfi-api-hub" : "tpp-standards";
      const versionSegment = ref2.versioned === false ? "" : `${selectedVersion.value}/`;
      return `/tech/${target}/${versionSegment}${ref2.path}`;
    }
    function anchorFor$1(entry) {
      return anchorFor(entry);
    }
    function hasChips(entry) {
      return entry.areas.length > 0 || entry.sections !== void 0 && entry.sections.length > 0 || entry.endpoints !== void 0 && entry.endpoints.length > 0;
    }
    function paragraphsOf(text) {
      return String(text || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    }
    function formatDate(iso) {
      if (!iso) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
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
      return safe.replace(re, '<mark class="ed-ahr-mark">$1</mark>');
    }
    function isAudience(value) {
      return value === "TPP" || value === "LFI";
    }
    function readFromUrl() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) query.value = q;
      const aud = params.get("audience");
      if (aud && isAudience(aud)) audienceFilter.value = aud;
      const areas = params.get("area");
      if (areas) for (const a of areas.split(",").filter(Boolean)) areaFilter.add(a);
      const secs = params.get("section");
      if (secs) for (const s of secs.split(",").filter(Boolean)) sectionFilter.add(s);
    }
    function writeToUrl() {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const sp = url.searchParams;
      if (query.value) sp.set("q", query.value);
      else sp.delete("q");
      if (audienceFilter.value) sp.set("audience", audienceFilter.value);
      else sp.delete("audience");
      if (areaFilter.size) sp.set("area", [...areaFilter].join(","));
      else sp.delete("area");
      if (sectionFilter.size) sp.set("section", [...sectionFilter].join(","));
      else sp.delete("section");
      window.history.replaceState({}, "", url.toString());
    }
    onMounted(() => readFromUrl());
    watch([query, audienceFilter, () => [...areaFilter], () => [...sectionFilter]], writeToUrl);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      if (unref(yearEntries).length === 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-ahr" }, _attrs))} data-v-752bb05f><section class="ed-ahr-hero" data-v-752bb05f><div class="ed-ahr-hero__inner" data-v-752bb05f><h1 class="ed-ahr-hero__title" data-v-752bb05f>No releases recorded for ${ssrInterpolate(unref(year))}</h1><p class="ed-ahr-hero__sub" data-v-752bb05f> The API Hub release-notes register has no entries for <strong data-v-752bb05f>${ssrInterpolate(unref(year))}</strong>. `);
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-ahr" }, _attrs))} data-v-752bb05f><section class="ed-ahr-hero" data-v-752bb05f><div class="ed-ahr-hero__inner" data-v-752bb05f><div class="ed-ahr-hero__label" data-v-752bb05f><span class="ed-ahr-hero__label-dash" data-v-752bb05f></span> Operational deployments · ${ssrInterpolate(unref(year))}</div><h1 class="ed-ahr-hero__title" data-v-752bb05f>API Hub Release Notes — ${ssrInterpolate(unref(year))}</h1><p class="ed-ahr-hero__sub" data-v-752bb05f> Changes deployed to the <strong data-v-752bb05f>API Hub platform</strong> during ${ssrInterpolate(unref(year))} — the OIDC authorization server, Consent Manager, gateway, and resource server that fronts every LFI. Each entry records what was deployed, when it became effective, and the impact on TPPs and LFIs. </p><div class="ed-ahr-stats" data-v-752bb05f><div class="ed-ahr-stat" data-v-752bb05f><span class="ed-ahr-stat__num" data-v-752bb05f>${ssrInterpolate(unref(yearEntries).length)}</span><span class="ed-ahr-stat__label" data-v-752bb05f>${ssrInterpolate(unref(yearEntries).length === 1 ? "change" : "changes")}</span></div><div class="ed-ahr-stat" data-v-752bb05f><span class="ed-ahr-stat__num" data-v-752bb05f>${ssrInterpolate(unref(releases).length)}</span><span class="ed-ahr-stat__label" data-v-752bb05f>${ssrInterpolate(unref(releases).length === 1 ? "release" : "releases")}</span></div><div class="ed-ahr-stat" data-v-752bb05f><span class="ed-ahr-stat__num" data-v-752bb05f>${ssrInterpolate(unref(areaCountTotal))}</span><span class="ed-ahr-stat__label" data-v-752bb05f>functional areas</span></div></div></div></section><section class="ed-ahr-search" data-v-752bb05f><div class="ed-ahr-search__inner" data-v-752bb05f><div class="ed-ahr-search__head" data-v-752bb05f><div class="ed-ahr-search__eyebrow" data-v-752bb05f><span class="ed-ahr-search__eyebrow-dash" data-v-752bb05f></span> Filter the register </div><h2 class="ed-ahr-search__title" data-v-752bb05f>Find a change</h2><p class="ed-ahr-search__lede" data-v-752bb05f> Narrow by <strong data-v-752bb05f>audience</strong>, <strong data-v-752bb05f>functional area</strong>, or <strong data-v-752bb05f>documentation section</strong>. Add a keyword to refine further. </p></div><div class="ed-ahr-facet" data-v-752bb05f><div class="ed-ahr-facet__label" data-v-752bb05f>Audience</div><div class="ed-ahr-facet__pills" data-v-752bb05f><!--[-->`);
        ssrRenderList(AUDIENCE_OPTIONS, (opt) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-ahr-pill--active": unref(audienceFilter) === opt,
            "ed-ahr-pill--disabled": audienceCount(opt) === 0
          }, "ed-ahr-pill"])}"${ssrIncludeBooleanAttr(audienceCount(opt) === 0 && unref(audienceFilter) !== opt) ? " disabled" : ""} data-v-752bb05f><span class="ed-ahr-pill__text" data-v-752bb05f>${ssrInterpolate(opt)}</span><span class="ed-ahr-pill__count" data-v-752bb05f>${ssrInterpolate(audienceCount(opt))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-ahr-facet" data-v-752bb05f><div class="ed-ahr-facet__label" data-v-752bb05f>Functional area</div><div class="ed-ahr-facet__pills" data-v-752bb05f><!--[-->`);
        ssrRenderList(unref(availableAreas), (area) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-ahr-pill--active": unref(areaFilter).has(area),
            "ed-ahr-pill--disabled": areaCount(area) === 0
          }, "ed-ahr-pill"])}"${ssrIncludeBooleanAttr(areaCount(area) === 0 && !unref(areaFilter).has(area)) ? " disabled" : ""} data-v-752bb05f><span class="ed-ahr-pill__text" data-v-752bb05f>${ssrInterpolate(area)}</span><span class="ed-ahr-pill__count" data-v-752bb05f>${ssrInterpolate(areaCount(area))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-ahr-facet" data-v-752bb05f><div class="ed-ahr-facet__label" data-v-752bb05f>Section</div><div class="ed-ahr-facet__pills" data-v-752bb05f><!--[-->`);
        ssrRenderList(unref(availableSections), (sec) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-ahr-pill--active": unref(sectionFilter).has(sec),
            "ed-ahr-pill--disabled": sectionPillCount(sec) === 0
          }, "ed-ahr-pill"])}"${ssrIncludeBooleanAttr(sectionPillCount(sec) === 0 && !unref(sectionFilter).has(sec)) ? " disabled" : ""} data-v-752bb05f><span class="ed-ahr-pill__text" data-v-752bb05f>${ssrInterpolate(sec)}</span><span class="ed-ahr-pill__count" data-v-752bb05f>${ssrInterpolate(sectionPillCount(sec))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-ahr-facet ed-ahr-facet--keyword" data-v-752bb05f><div class="ed-ahr-facet__label" data-v-752bb05f>Keyword</div><div class="ed-ahr-input" data-v-752bb05f><svg class="ed-ahr-input__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-752bb05f><circle cx="11" cy="11" r="7" data-v-752bb05f></circle><path d="m20 20-3.5-3.5" data-v-752bb05f></path></svg><input${ssrRenderAttr("value", unref(query))} type="search" class="ed-ahr-input__field" placeholder="Search title, summary, description, endpoint, or impact" autocomplete="off" spellcheck="false" data-v-752bb05f>`);
        if (unref(query)) {
          _push(`<button class="ed-ahr-input__clear" type="button" aria-label="Clear keyword" data-v-752bb05f>×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="ed-ahr-meter" data-v-752bb05f><span class="ed-ahr-meter__count" data-v-752bb05f><strong data-v-752bb05f>${ssrInterpolate(unref(filteredEntries).length)}</strong> of ${ssrInterpolate(unref(yearEntries).length)} ${ssrInterpolate(unref(yearEntries).length === 1 ? "change" : "changes")}</span>`);
        if (unref(anyFilterActive)) {
          _push(`<button type="button" class="ed-ahr-meter__reset" data-v-752bb05f>Reset filters ×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filteredEntries).length === 0) {
          _push(`<div class="ed-ahr-empty" data-v-752bb05f><div class="ed-ahr-empty__title" data-v-752bb05f>No changes match the current filters</div><p class="ed-ahr-empty__body" data-v-752bb05f> Try removing a filter or clearing the keyword. The pill counts above show how many entries each filter would surface on its own. </p><button class="ed-ahr-empty__btn" data-v-752bb05f>Reset filters</button></div>`);
        } else {
          _push(`<div class="ed-ahr-groups" data-v-752bb05f><!--[-->`);
          ssrRenderList(unref(groupedResults), (group) => {
            _push(`<div class="ed-ahr-group" data-v-752bb05f><div class="ed-ahr-group__head" data-v-752bb05f><div class="ed-ahr-group__main" data-v-752bb05f><div class="ed-ahr-group__tag" data-v-752bb05f>Release</div><div class="ed-ahr-group__id" data-v-752bb05f>${ssrInterpolate(group.release)}</div><div class="ed-ahr-group__date" data-v-752bb05f>${ssrInterpolate(formatDate(group.effectiveDate))}</div></div><div class="ed-ahr-group__count" data-v-752bb05f>${ssrInterpolate(group.entries.length)} ${ssrInterpolate(group.entries.length === 1 ? "change" : "changes")}</div></div><!--[-->`);
            ssrRenderList(group.entries, (entry) => {
              _push(`<article${ssrRenderAttr("id", anchorFor$1(entry))} class="ed-ahr-card" data-v-752bb05f><header class="ed-ahr-card__head" data-v-752bb05f><div class="ed-ahr-card__num" data-v-752bb05f>§${ssrInterpolate(entry.number)}</div><div class="ed-ahr-card__heading" data-v-752bb05f><h3 class="ed-ahr-card__title" data-v-752bb05f>${highlight(entry.title) ?? ""}</h3><p class="ed-ahr-card__summary" data-v-752bb05f>${highlight(entry.summary) ?? ""}</p></div><div class="ed-ahr-card__aud" data-v-752bb05f><span class="${ssrRenderClass([`ed-ahr-aud--${entry.audience.toLowerCase()}`, "ed-ahr-aud"])}" data-v-752bb05f>${ssrInterpolate(entry.audience)}</span></div></header><div class="ed-ahr-card__body" data-v-752bb05f><!--[-->`);
              ssrRenderList(paragraphsOf(entry.description), (para, i) => {
                _push(`<p class="ed-ahr-card__para" data-v-752bb05f>${highlight(para) ?? ""}</p>`);
              });
              _push(`<!--]--><div class="ed-ahr-impact" data-v-752bb05f><span class="ed-ahr-impact__label" data-v-752bb05f>Impact</span><span class="ed-ahr-impact__body" data-v-752bb05f>${highlight(entry.impact) ?? ""}</span></div></div>`);
              if (hasChips(entry)) {
                _push(`<footer class="ed-ahr-card__foot" data-v-752bb05f>`);
                if (entry.areas.length) {
                  _push(`<div class="ed-ahr-chiprow" data-v-752bb05f><span class="ed-ahr-chiprow__label" data-v-752bb05f>Areas</span><!--[-->`);
                  ssrRenderList(entry.areas, (area) => {
                    _push(`<button class="${ssrRenderClass([{ "ed-ahr-chip--on": unref(areaFilter).has(area) }, "ed-ahr-chip ed-ahr-chip--area"])}" type="button"${ssrRenderAttr("title", `Toggle filter: ${area}`)} data-v-752bb05f>${ssrInterpolate(area)}</button>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                if (entry.sections && entry.sections.length) {
                  _push(`<div class="ed-ahr-chiprow" data-v-752bb05f><span class="ed-ahr-chiprow__label" data-v-752bb05f>Docs</span><!--[-->`);
                  ssrRenderList(entry.sections, (sec, si) => {
                    _push(`<a${ssrRenderAttr("href", sectionUrl(sec))} class="ed-ahr-chip ed-ahr-chip--section"${ssrRenderAttr("title", `Open ${sec.label}`)} data-v-752bb05f>${ssrInterpolate(sec.label)} →</a>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                if (entry.endpoints && entry.endpoints.length) {
                  _push(`<div class="ed-ahr-chiprow" data-v-752bb05f><span class="ed-ahr-chiprow__label" data-v-752bb05f>APIs</span><!--[-->`);
                  ssrRenderList(entry.endpoints, (ep, ei) => {
                    _push(`<a${ssrRenderAttr("href", sectionUrl(ep))} class="ed-ahr-chip ed-ahr-chip--ep"${ssrRenderAttr("title", `Open ${ep.label}`)} data-v-752bb05f>${ssrInterpolate(ep.label)}</a>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</footer>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</article>`);
            });
            _push(`<!--]--></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></section><section class="ed-ahr-cross" data-v-752bb05f><div class="ed-ahr-cross__inner" data-v-752bb05f><div class="ed-ahr-cross__eyebrow" data-v-752bb05f><span class="ed-ahr-cross__eyebrow-dash" data-v-752bb05f></span> Related registers </div><p class="ed-ahr-cross__body" data-v-752bb05f> For corrections to <strong data-v-752bb05f>published documentation</strong> rather than platform deployments, see <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/erratas/${unref(CURRENT_VERSION)}/`)} data-v-752bb05f>Erratas</a>. For Trust Framework directory releases, see <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/release-notes/trust-framework/${unref(latestTrustFrameworkYear)}`)} data-v-752bb05f> Trust Framework Release Notes</a>. </p></div></section></div>`);
      }
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/release-notes-and-erratas/release-notes/api-hub/[year].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _year_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-752bb05f"]]);
export {
  _year_ as default
};
