import { defineComponent, computed, ref, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { c as changelogVersions, a as changesFor, s as specUrl, b as anchorFor } from "./version-changes-registry-C1NeaTDH.js";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import { useRoute } from "vue-router";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[version]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const versionParam = computed(() => {
      const raw = route.params.version;
      if (typeof raw === "string") return raw;
      if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
      return "";
    });
    const versionExists = computed(() => changelogVersions.includes(versionParam.value));
    const version = computed(() => versionParam.value);
    const availableVersionsLabel = computed(() => changelogVersions.join(", "));
    const versionChanges = computed(() => changesFor(versionParam.value));
    const fromVersion = computed(() => {
      var _a;
      return ((_a = versionChanges.value[0]) == null ? void 0 : _a.fromVersion) ?? CURRENT_VERSION;
    });
    const specLinks = computed(() => {
      const out = {};
      for (const c of versionChanges.value) {
        for (const sp of c.specs ?? []) {
          if (!(sp in out)) out[sp] = specUrl(sp, c.toVersion);
        }
      }
      return out;
    });
    const areaCountTotal = computed(
      () => new Set(versionChanges.value.flatMap((c) => c.areas)).size
    );
    const AUDIENCE_OPTIONS = ["TPP", "LFI", "Both"];
    const CATEGORY_OPTIONS = [
      "Version uplift",
      "New capability",
      "Behaviour change",
      "No change"
    ];
    const audienceFilter = ref(null);
    const categoryFilter = ref(/* @__PURE__ */ new Set());
    const areaFilter = ref(/* @__PURE__ */ new Set());
    const query = ref("");
    const availableAreas = computed(
      () => [...new Set(versionChanges.value.flatMap((c) => c.areas))].sort()
    );
    function matchesAudience(c) {
      if (!audienceFilter.value) return true;
      return c.audience === audienceFilter.value || c.audience === "Both";
    }
    function matchesCategory(c) {
      return categoryFilter.value.size === 0 || categoryFilter.value.has(c.category);
    }
    function matchesArea(c) {
      if (areaFilter.value.size === 0) return true;
      return c.areas.some((a) => areaFilter.value.has(a));
    }
    function haystack(c) {
      return [
        c.title,
        c.summary,
        c.description,
        c.category,
        ...c.areas,
        ...c.specs ?? [],
        ...(c.endpoints ?? []).map((e) => e.label)
      ].join(" ").toLowerCase();
    }
    function matchesQuery(c) {
      const q = query.value.trim().toLowerCase();
      if (!q) return true;
      return haystack(c).includes(q);
    }
    const filteredChanges = computed(
      () => versionChanges.value.filter(
        (c) => matchesAudience(c) && matchesCategory(c) && matchesArea(c) && matchesQuery(c)
      )
    );
    function countWith(pred) {
      return versionChanges.value.filter(
        (c) => pred(c) && matchesQuery(c)
      ).length;
    }
    function audienceCount(a) {
      return countWith((c) => (c.audience === a || c.audience === "Both") && matchesCategory(c) && matchesArea(c));
    }
    function categoryCount(cat) {
      return countWith((c) => c.category === cat && matchesAudience(c) && matchesArea(c));
    }
    function areaCount(area) {
      return countWith((c) => c.areas.includes(area) && matchesAudience(c) && matchesCategory(c));
    }
    const anyFilterActive = computed(
      () => audienceFilter.value !== null || categoryFilter.value.size > 0 || areaFilter.value.size > 0 || query.value.trim() !== ""
    );
    function escapeHtml(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function escapeRegExp(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function highlight(text) {
      const safe = escapeHtml(text);
      const q = query.value.trim();
      if (!q) return safe;
      return safe.replace(new RegExp(`(${escapeRegExp(escapeHtml(q))})`, "gi"), "<mark>$1</mark>");
    }
    function toParagraphs(text) {
      return text.split("\n\n").map((p) => p.trim()).filter(Boolean);
    }
    function renderProse(text) {
      return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
    }
    const LABEL_INITIALISMS = {
      api: "API",
      atm: "ATM",
      cmi: "CMI",
      fx: "FX",
      lfi: "LFI",
      psu: "PSU",
      tpp: "TPP"
    };
    function labelWord(word) {
      const initialism = LABEL_INITIALISMS[word.toLowerCase()];
      if (initialism) return initialism;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    function shortLabel(path) {
      const segs = path.split("/").filter(Boolean);
      const rest = segs.slice(3);
      if (rest.length === 0) return segs[1] === "tpp-standards" ? "TPP Standards" : "LFI Guide";
      return rest.map((s) => s.split("-").map(labelWord).join(" ")).join(" · ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(versionExists)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-cl ed-cl--missing" }, _attrs))} data-v-c4bd7fda><section class="ed-cl-hero" data-v-c4bd7fda><div class="ed-cl-hero__inner" data-v-c4bd7fda><div class="ed-cl-hero__label" data-v-c4bd7fda><span class="ed-cl-hero__label-dash" data-v-c4bd7fda></span> Changelog not found </div><h1 class="ed-cl-hero__title" data-v-c4bd7fda>No changelog for “${ssrInterpolate(unref(versionParam))}”</h1><p class="ed-cl-hero__sub" data-v-c4bd7fda> A changelog exists only for versions that introduce changes against a prior version. Try one of: ${ssrInterpolate(unref(availableVersionsLabel))}. </p><p class="ed-cl-hero__sub" data-v-c4bd7fda><a href="/tech/release-notes-and-erratas/" class="ed-cl-back" data-v-c4bd7fda> ← Back to Release Notes &amp; Erratas </a></p></div></section></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-cl" }, _attrs))} data-v-c4bd7fda><section class="ed-cl-hero" data-v-c4bd7fda><div class="ed-cl-hero__inner" data-v-c4bd7fda><div class="ed-cl-hero__label" data-v-c4bd7fda><span class="ed-cl-hero__label-dash" data-v-c4bd7fda></span> Changes between versions · ${ssrInterpolate(unref(fromVersion))} → ${ssrInterpolate(unref(version))}</div><h1 class="ed-cl-hero__title" data-v-c4bd7fda>Version Changelog</h1><p class="ed-cl-hero__sub" data-v-c4bd7fda> Every change made between <strong data-v-c4bd7fda>${ssrInterpolate(unref(fromVersion))}</strong> and <strong data-v-c4bd7fda>${ssrInterpolate(unref(version))}</strong> — across the TPP Standards, the LFI Integration Guide, and the OpenAPI specifications. Each entry records what changed and who it affects. </p><div class="ed-cl-stats" data-v-c4bd7fda><div class="ed-cl-stat" data-v-c4bd7fda><span class="ed-cl-stat__num" data-v-c4bd7fda>${ssrInterpolate(unref(versionChanges).length)}</span><span class="ed-cl-stat__label" data-v-c4bd7fda>${ssrInterpolate(unref(versionChanges).length === 1 ? "change" : "changes")}</span></div><div class="ed-cl-stat" data-v-c4bd7fda><span class="ed-cl-stat__num" data-v-c4bd7fda>${ssrInterpolate(unref(areaCountTotal))}</span><span class="ed-cl-stat__label" data-v-c4bd7fda>areas touched</span></div></div></div></section><section class="ed-cl-search" data-v-c4bd7fda><div class="ed-cl-search__inner" data-v-c4bd7fda><div class="ed-cl-search__head" data-v-c4bd7fda><div class="ed-cl-search__eyebrow" data-v-c4bd7fda><span class="ed-cl-search__eyebrow-dash" data-v-c4bd7fda></span> Filter the changelog </div><h2 class="ed-cl-search__title" data-v-c4bd7fda>Find a change</h2><p class="ed-cl-search__lede" data-v-c4bd7fda> Narrow by <strong data-v-c4bd7fda>audience</strong>, <strong data-v-c4bd7fda>type of change</strong>, or <strong data-v-c4bd7fda>functional area</strong>. Add a keyword to refine further. Click an area chip on a result to open the page the change applies to. </p></div><div class="ed-cl-facet" data-v-c4bd7fda><div class="ed-cl-facet__label" data-v-c4bd7fda>Audience</div><div class="ed-cl-facet__pills" data-v-c4bd7fda><!--[-->`);
        ssrRenderList(AUDIENCE_OPTIONS, (opt) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-cl-pill--active": unref(audienceFilter) === opt,
            "ed-cl-pill--disabled": audienceCount(opt) === 0
          }, "ed-cl-pill"])}"${ssrIncludeBooleanAttr(audienceCount(opt) === 0 && unref(audienceFilter) !== opt) ? " disabled" : ""} data-v-c4bd7fda><span class="ed-cl-pill__text" data-v-c4bd7fda>${ssrInterpolate(opt)}</span><span class="ed-cl-pill__count" data-v-c4bd7fda>${ssrInterpolate(audienceCount(opt))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-cl-facet" data-v-c4bd7fda><div class="ed-cl-facet__label" data-v-c4bd7fda>Type of change</div><div class="ed-cl-facet__pills" data-v-c4bd7fda><!--[-->`);
        ssrRenderList(CATEGORY_OPTIONS, (cat) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-cl-pill--active": unref(categoryFilter).has(cat),
            "ed-cl-pill--disabled": categoryCount(cat) === 0
          }, "ed-cl-pill"])}"${ssrIncludeBooleanAttr(categoryCount(cat) === 0 && !unref(categoryFilter).has(cat)) ? " disabled" : ""} data-v-c4bd7fda><span class="ed-cl-pill__text" data-v-c4bd7fda>${ssrInterpolate(cat)}</span><span class="ed-cl-pill__count" data-v-c4bd7fda>${ssrInterpolate(categoryCount(cat))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-cl-facet" data-v-c4bd7fda><div class="ed-cl-facet__label" data-v-c4bd7fda>Functional area</div><div class="ed-cl-facet__pills" data-v-c4bd7fda><!--[-->`);
        ssrRenderList(unref(availableAreas), (area) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-cl-pill--active": unref(areaFilter).has(area),
            "ed-cl-pill--disabled": areaCount(area) === 0
          }, "ed-cl-pill"])}"${ssrIncludeBooleanAttr(areaCount(area) === 0 && !unref(areaFilter).has(area)) ? " disabled" : ""} data-v-c4bd7fda><span class="ed-cl-pill__text" data-v-c4bd7fda>${ssrInterpolate(area)}</span><span class="ed-cl-pill__count" data-v-c4bd7fda>${ssrInterpolate(areaCount(area))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-cl-facet ed-cl-facet--keyword" data-v-c4bd7fda><div class="ed-cl-facet__label" data-v-c4bd7fda>Keyword</div><div class="ed-cl-input" data-v-c4bd7fda><svg class="ed-cl-input__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c4bd7fda><circle cx="11" cy="11" r="7" data-v-c4bd7fda></circle><path d="m20 20-3.5-3.5" data-v-c4bd7fda></path></svg><input${ssrRenderAttr("value", unref(query))} type="search" class="ed-cl-input__field" placeholder="Search title, summary, description, spec, or endpoint" autocomplete="off" spellcheck="false" data-v-c4bd7fda>`);
        if (unref(query)) {
          _push(`<button class="ed-cl-input__clear" type="button" aria-label="Clear keyword" data-v-c4bd7fda>×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="ed-cl-meter" data-v-c4bd7fda><span class="ed-cl-meter__count" data-v-c4bd7fda><strong data-v-c4bd7fda>${ssrInterpolate(unref(filteredChanges).length)}</strong> of ${ssrInterpolate(unref(versionChanges).length)} ${ssrInterpolate(unref(versionChanges).length === 1 ? "change" : "changes")}</span>`);
        if (unref(anyFilterActive)) {
          _push(`<button type="button" class="ed-cl-meter__reset" data-v-c4bd7fda>Reset filters ×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filteredChanges).length === 0) {
          _push(`<div class="ed-cl-empty" data-v-c4bd7fda><div class="ed-cl-empty__title" data-v-c4bd7fda>No changes match the current filters</div><p class="ed-cl-empty__body" data-v-c4bd7fda> Try removing a filter or clearing the keyword. The pill counts above show how many changes each filter would surface on its own. </p><button class="ed-cl-empty__btn" data-v-c4bd7fda>Reset filters</button></div>`);
        } else {
          _push(`<div class="ed-cl-rows" data-v-c4bd7fda><!--[-->`);
          ssrRenderList(unref(filteredChanges), (c) => {
            _push(`<article${ssrRenderAttr("id", unref(anchorFor)(c))} class="ed-cl-row" data-v-c4bd7fda><div class="ed-cl-row__num" data-v-c4bd7fda>§${ssrInterpolate(c.number)}</div><div class="ed-cl-row__body" data-v-c4bd7fda><div class="ed-cl-row__tags" data-v-c4bd7fda><span class="ed-cl-tag ed-cl-tag--cat" data-v-c4bd7fda>${ssrInterpolate(c.category)}</span><span class="ed-cl-tag ed-cl-tag--aud" data-v-c4bd7fda>${ssrInterpolate(c.audience)}</span></div><h3 class="ed-cl-row__title" data-v-c4bd7fda>${highlight(c.title) ?? ""}</h3><div class="ed-cl-row__summary" data-v-c4bd7fda>${highlight(c.summary) ?? ""}</div><div class="ed-cl-row__section" data-v-c4bd7fda><div class="ed-cl-row__section-label" data-v-c4bd7fda>What changed</div><!--[-->`);
            ssrRenderList(toParagraphs(c.description), (p, i) => {
              _push(`<p class="ed-cl-row__prose" data-v-c4bd7fda>${renderProse(p) ?? ""}</p>`);
            });
            _push(`<!--]--></div><!--[-->`);
            ssrRenderList(c.docsPaths || [], (d) => {
              _push(`<a${ssrRenderAttr("href", d.path)} class="ed-cl-row__spec" data-v-c4bd7fda><span class="ed-cl-row__spec-label" data-v-c4bd7fda>${ssrInterpolate(d.label)}</span><span class="ed-cl-row__spec-link" data-v-c4bd7fda>${ssrInterpolate(shortLabel(d.path))} →</span></a>`);
            });
            _push(`<!--]--><div class="ed-cl-row__chips" data-v-c4bd7fda><!--[-->`);
            ssrRenderList(c.affectedPaths, (p) => {
              _push(`<a${ssrRenderAttr("href", p)} class="ed-cl-chip ed-cl-chip--sec"${ssrRenderAttr("title", `Open ${shortLabel(p)}`)} data-v-c4bd7fda>${ssrInterpolate(shortLabel(p))} →</a>`);
            });
            _push(`<!--]--><!--[-->`);
            ssrRenderList(c.endpoints || [], (ep) => {
              _push(`<button class="ed-cl-chip ed-cl-chip--ep" type="button"${ssrRenderAttr("title", `Search keyword: ${ep.label}`)} data-v-c4bd7fda>${ssrInterpolate(ep.label)}</button>`);
            });
            _push(`<!--]--><!--[-->`);
            ssrRenderList(c.specs || [], (sp) => {
              _push(`<!--[-->`);
              if (unref(specLinks)[sp]) {
                _push(`<a${ssrRenderAttr("href", unref(specLinks)[sp])} class="ed-cl-chip ed-cl-chip--sc"${ssrRenderAttr("title", `Open the ${sp} API reference`)} data-v-c4bd7fda>${ssrInterpolate(sp)} →</a>`);
              } else {
                _push(`<button class="ed-cl-chip ed-cl-chip--sc" type="button"${ssrRenderAttr("title", `Search keyword: ${sp}`)} data-v-c4bd7fda>${ssrInterpolate(sp)}</button>`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div></div></article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></section><section class="ed-cl-ref" data-v-c4bd7fda><div class="ed-cl-ref__inner" data-v-c4bd7fda><div class="ed-cl-ref__head" data-v-c4bd7fda><div class="ed-cl-ref__eyebrow" data-v-c4bd7fda><span class="ed-cl-ref__eyebrow-dash" data-v-c4bd7fda></span> Governance </div><h2 class="ed-cl-ref__title" data-v-c4bd7fda>How this register works</h2><p class="ed-cl-ref__lede" data-v-c4bd7fda> The changelog records differences <strong data-v-c4bd7fda>between</strong> versions. Corrections made to a version <strong data-v-c4bd7fda>after</strong> it was published belong in the Errata register instead — the two are kept separate so that “what changed in the new version” never blurs into “what we got wrong in the old one”. </p></div><div class="ed-cl-ref__grid" data-v-c4bd7fda><a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/erratas/${unref(CURRENT_VERSION)}/`)} class="ed-cl-ref__tile" data-v-c4bd7fda><div class="ed-cl-ref__tile-meta" data-v-c4bd7fda><span class="ed-cl-ref__tile-meta-dash" data-v-c4bd7fda></span> Register </div><h3 class="ed-cl-ref__tile-title" data-v-c4bd7fda>Erratas</h3><p class="ed-cl-ref__tile-body" data-v-c4bd7fda> Corrections to published documentation against a released version. </p></a><a href="/policy/version-management" class="ed-cl-ref__tile" data-v-c4bd7fda><div class="ed-cl-ref__tile-meta" data-v-c4bd7fda><span class="ed-cl-ref__tile-meta-dash" data-v-c4bd7fda></span> Policy </div><h3 class="ed-cl-ref__tile-title" data-v-c4bd7fda>Version Management</h3><p class="ed-cl-ref__tile-body" data-v-c4bd7fda> How versions are numbered, and how Standards, API Hub, and Ozone Connect versions relate. </p></a></div></div></section></div>`);
      }
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/release-notes-and-erratas/changelog/[version].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _version_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4bd7fda"]]);
export {
  _version_ as default
};
