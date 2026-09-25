import { defineComponent, computed, ref, reactive, onMounted, watch, resolveComponent, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { e as errataVersions, E as ERRATA_SECTIONS, a as anchorFor, b as errataPageUrl } from "./erratas-registry-BXVJX5jN.js";
import { l as latestApiHubYear, a as latestTrustFrameworkYear } from "./release-notes-years-g5sqBxpI.js";
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
    const versionExists = computed(() => errataVersions.includes(versionParam.value));
    const version = computed(() => versionParam.value);
    const availableVersionsLabel = computed(() => errataVersions.join(", "));
    const AUDIENCE_OPTIONS = ["TPP", "LFI"];
    const SPEC_AREA = {
      "uae-account-information-openapi": "Data Sharing",
      "uae-authorization-endpoints-openapi": "Tokens & Authorization",
      "uae-confirmation-of-payee-openapi": "Confirmation of Payee",
      "uae-fx-service-initiation-openapi": "Service Initiation",
      "uae-insurance-openapi": "Insurance",
      "uae-webhook-template-openapi": "Webhooks",
      "uae-api-hub-consent-manager-openapi": "Consent Management",
      "uae-ozone-connect-bank-service-initiation-openapi": "Service Initiation",
      "uae-ozone-connect-consent-events-actions-openapi": "Consent Events",
      // Key is the spec name as published when the errata took effect; the label is the
      // spec's current name (renamed upstream 2026-05-26) so the facet matches the rest
      // of the site. See the naming note on v2.1-errata2 §6 in erratas-registry.ts.
      "uae-ozone-connect-user-operations-openapi": "CAAP Operations",
      "uae-ozone-connect-health-check-openapi": "Health Check"
    };
    function specsOf(s) {
      if (s.specs && s.specs.length) return s.specs;
      if (s.spec) return [s.spec];
      return [];
    }
    function audienceOf(s) {
      const specs = specsOf(s);
      if (specs.length === 0) return "TPP";
      let hasLfi = false;
      let hasTpp = false;
      for (const sp of specs) {
        if (sp.startsWith("uae-ozone-connect-") || sp.startsWith("uae-api-hub-")) hasLfi = true;
        else hasTpp = true;
      }
      if (hasLfi && hasTpp) return "Both";
      return hasLfi ? "LFI" : "TPP";
    }
    function areasOf(s) {
      const out = /* @__PURE__ */ new Set();
      for (const sp of specsOf(s)) {
        const area = SPEC_AREA[sp];
        if (area) out.add(area);
      }
      return [...out];
    }
    const SEGMENT_LABELS = {
      "consent": "Consent",
      "banking": "Banking",
      "data-sharing": "Data Sharing",
      "confirmation-of-payee": "Confirmation of Payee",
      "service-initiation": "Service Initiation",
      "webhooks": "Webhooks",
      "consent-status": "Consent Status",
      "payment-status": "Payment Status",
      "security": "Security",
      "tokens": "Tokens",
      "api-hub": "API Hub",
      "consent-manager": "Consent Manager",
      "consent-events": "Consent Events",
      "health-check": "Health Check",
      "atms": "ATMs",
      "products-leads": "Products & Leads",
      "registration": "Registration",
      "trust-framework": "Trust Framework"
    };
    function prettifySegment(seg) {
      if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg];
      return seg.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    function endpointLabelMap(s) {
      const map = /* @__PURE__ */ new Map();
      for (const ep of s.endpoints || []) {
        const trailing = ep.path.split("/").pop();
        if (trailing) map.set(trailing, ep.label);
      }
      return map;
    }
    function parseAffectedPath(path, epLabels) {
      const m = path.match(/^\/tech\/(tpp-standards|lfi-api-hub)\/(.+)$/);
      if (!m || !m[1] || !m[2]) return null;
      const audience = m[1] === "tpp-standards" ? "TPP" : "LFI";
      let segments = m[2].split("/").filter(Boolean);
      if (segments[0] && /^v\d+(?:\.\d+)*$/.test(segments[0])) segments = segments.slice(1);
      const oaIdx = segments.indexOf("open-api");
      let areaSegments;
      let endpointSlug;
      if (oaIdx === -1) {
        areaSegments = segments.slice(0, -1);
        endpointSlug = segments[segments.length - 1];
      } else {
        areaSegments = segments.slice(0, oaIdx);
        endpointSlug = segments.slice(oaIdx + 1).join("/");
      }
      const area = areaSegments.map(prettifySegment).join(" · ");
      const endpointLabel = endpointSlug ? epLabels.get(endpointSlug) || endpointSlug : null;
      const labelParts = [audience, area, endpointLabel].filter((p) => Boolean(p));
      return { label: labelParts.join(" · "), path };
    }
    function sectionsForErrata(s) {
      const epLabels = endpointLabelMap(s);
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const p of s.affectedPaths || []) {
        const parsed = parseAffectedPath(p, epLabels);
        if (!parsed) continue;
        if (seen.has(parsed.label)) continue;
        seen.add(parsed.label);
        out.push(parsed);
      }
      return out;
    }
    function haystack(s) {
      const parts = [
        s.title,
        s.summary,
        s.description,
        s.rationale,
        s.errataId,
        ...specsOf(s),
        ...sectionsForErrata(s).map((sec) => sec.label),
        ...s.schemas || [],
        ...(s.endpoints || []).flatMap((e) => [e.label, e.path]),
        ...(s.githubSources || []).map((g) => g.label),
        ...(s.relatedStandards || []).map((r) => r.label)
      ];
      return parts.join(" \n ").toLowerCase();
    }
    const query = ref("");
    const audienceFilter = ref(null);
    const areaFilter = reactive(/* @__PURE__ */ new Set());
    const sectionFilter = reactive(/* @__PURE__ */ new Set());
    ref(null);
    const versionSections = computed(
      () => ERRATA_SECTIONS.filter((s) => s.version === version.value).slice().sort((a, b) => {
        if (a.errataId !== b.errataId) return a.errataId.localeCompare(b.errataId);
        return a.number - b.number;
      })
    );
    const errataIds = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const s of versionSections.value) seen.add(s.errataId);
      return [...seen].sort();
    });
    const specCount = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const s of versionSections.value) {
        for (const sp of specsOf(s)) seen.add(sp);
      }
      return seen.size;
    });
    function matchesAudience(s, audience) {
      if (!audience) return true;
      const a = audienceOf(s);
      return a === audience || a === "Both";
    }
    function matchesAreas(s, areas) {
      if (areas.size === 0) return true;
      const sectionAreas = areasOf(s);
      return sectionAreas.some((a) => areas.has(a));
    }
    function matchesSections(s, sections) {
      if (sections.size === 0) return true;
      return sectionsForErrata(s).some((sec) => sections.has(sec.label));
    }
    function matchesQuery(s, q) {
      if (!q) return true;
      return haystack(s).includes(q);
    }
    const filteredSections = computed(() => {
      const q = query.value.trim().toLowerCase();
      return versionSections.value.filter(
        (s) => matchesAudience(s, audienceFilter.value) && matchesAreas(s, areaFilter) && matchesSections(s, sectionFilter) && matchesQuery(s, q)
      );
    });
    const groupedResults = computed(() => {
      const groups = /* @__PURE__ */ new Map();
      for (const s of filteredSections.value) {
        if (!groups.has(s.errataId)) groups.set(s.errataId, []);
        groups.get(s.errataId).push(s);
      }
      return [...groups.entries()].map(([errataId, sections]) => ({ errataId, sections }));
    });
    function countWith(overrides) {
      const q = (overrides.query !== void 0 ? overrides.query : query.value).trim().toLowerCase();
      const audience = overrides.audience !== void 0 ? overrides.audience : audienceFilter.value;
      const areas = overrides.areas !== void 0 ? overrides.areas : areaFilter;
      const sections = overrides.sections !== void 0 ? overrides.sections : sectionFilter;
      return versionSections.value.filter(
        (s) => matchesAudience(s, audience) && matchesAreas(s, areas) && matchesSections(s, sections) && matchesQuery(s, q)
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
    function sectionPillCount(label) {
      const next = new Set(sectionFilter);
      next.add(label);
      return countWith({ sections: next });
    }
    const availableAreas = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      for (const s of versionSections.value) for (const a of areasOf(s)) seen.add(a);
      return [...seen].sort();
    });
    const availableSections = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const s of versionSections.value) {
        for (const sec of sectionsForErrata(s)) {
          if (!map.has(sec.label)) map.set(sec.label, sec);
        }
      }
      return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
    });
    const anyFilterActive = computed(
      () => Boolean(query.value) || Boolean(audienceFilter.value) || areaFilter.size > 0 || sectionFilter.size > 0
    );
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
      return safe.replace(re, '<mark class="ed-er-mark">$1</mark>');
    }
    function readFromUrl() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) query.value = q;
      const aud = params.get("audience");
      if (aud === "TPP" || aud === "LFI") audienceFilter.value = aud;
      const areas = params.get("area");
      if (areas) for (const a of areas.split(",").filter(Boolean)) areaFilter.add(a);
      const sections = params.get("section");
      if (sections) for (const sec of sections.split("|").filter(Boolean)) sectionFilter.add(sec);
    }
    function writeToUrl() {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const sp = url.searchParams;
      query.value ? sp.set("q", query.value) : sp.delete("q");
      audienceFilter.value ? sp.set("audience", audienceFilter.value) : sp.delete("audience");
      areaFilter.size ? sp.set("area", [...areaFilter].join(",")) : sp.delete("area");
      sectionFilter.size ? sp.set("section", [...sectionFilter].join("|")) : sp.delete("section");
      window.history.replaceState({}, "", url.toString());
    }
    onMounted(() => readFromUrl());
    watch(
      [query, audienceFilter, () => [...areaFilter], () => [...sectionFilter]],
      writeToUrl
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      if (!unref(versionExists)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-er ed-er--missing" }, _attrs))} data-v-16b69a2c><section class="ed-er-hero" data-v-16b69a2c><div class="ed-er-hero__inner" data-v-16b69a2c><div class="ed-er-hero__label" data-v-16b69a2c><span class="ed-er-hero__label-dash" data-v-16b69a2c></span> Errata version not found </div><h1 class="ed-er-hero__title" data-v-16b69a2c>No errata register for “${ssrInterpolate(unref(versionParam))}”</h1><p class="ed-er-hero__sub" data-v-16b69a2c> The Errata register only exists for published versions that have received corrections. Try one of: ${ssrInterpolate(unref(availableVersionsLabel))}. </p><p class="ed-er-hero__sub" data-v-16b69a2c>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/tech/release-notes-and-erratas/erratas/${unref(CURRENT_VERSION)}/`,
          class: "ed-er-back"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← Back to current Erratas `);
            } else {
              return [
                createTextVNode(" ← Back to current Erratas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div></section></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-er" }, _attrs))} data-v-16b69a2c><section class="ed-er-hero" data-v-16b69a2c><div class="ed-er-hero__inner" data-v-16b69a2c><div class="ed-er-hero__label" data-v-16b69a2c><span class="ed-er-hero__label-dash" data-v-16b69a2c></span> Post-publication corrections · ${ssrInterpolate(unref(version))}</div><h1 class="ed-er-hero__title" data-v-16b69a2c>Erratas</h1><p class="ed-er-hero__sub" data-v-16b69a2c> The authoritative register of corrections to <strong data-v-16b69a2c>published documentation</strong> against <strong data-v-16b69a2c>${ssrInterpolate(unref(version))}</strong> — the TPP Standards, LFI Integration Guide, and OpenAPI specifications. Each entry records what was corrected, why the change was required, and the effective date. </p><div class="ed-er-stats" data-v-16b69a2c><div class="ed-er-stat" data-v-16b69a2c><span class="ed-er-stat__num" data-v-16b69a2c>${ssrInterpolate(unref(versionSections).length)}</span><span class="ed-er-stat__label" data-v-16b69a2c>corrections</span></div><div class="ed-er-stat" data-v-16b69a2c><span class="ed-er-stat__num" data-v-16b69a2c>${ssrInterpolate(unref(errataIds).length)}</span><span class="ed-er-stat__label" data-v-16b69a2c>errata ${ssrInterpolate(unref(errataIds).length === 1 ? "release" : "releases")}</span></div><div class="ed-er-stat" data-v-16b69a2c><span class="ed-er-stat__num" data-v-16b69a2c>${ssrInterpolate(unref(specCount))}</span><span class="ed-er-stat__label" data-v-16b69a2c>specs touched</span></div></div></div></section><section class="ed-er-search" data-v-16b69a2c><div class="ed-er-search__inner" data-v-16b69a2c><div class="ed-er-search__head" data-v-16b69a2c><div class="ed-er-search__eyebrow" data-v-16b69a2c><span class="ed-er-search__eyebrow-dash" data-v-16b69a2c></span> Filter the register </div><h2 class="ed-er-search__title" data-v-16b69a2c>Find a correction</h2><p class="ed-er-search__lede" data-v-16b69a2c> Narrow by <strong data-v-16b69a2c>audience</strong>, <strong data-v-16b69a2c>functional area</strong>, or <strong data-v-16b69a2c>section</strong>. Add a keyword to refine further. Click a section chip on a result row to open the page the correction applies to. </p></div><div class="ed-er-facet" data-v-16b69a2c><div class="ed-er-facet__label" data-v-16b69a2c>Audience</div><div class="ed-er-facet__pills" data-v-16b69a2c><!--[-->`);
        ssrRenderList(AUDIENCE_OPTIONS, (opt) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-er-pill--active": unref(audienceFilter) === opt,
            "ed-er-pill--disabled": audienceCount(opt) === 0
          }, "ed-er-pill"])}"${ssrIncludeBooleanAttr(audienceCount(opt) === 0 && unref(audienceFilter) !== opt) ? " disabled" : ""} data-v-16b69a2c><span class="ed-er-pill__text" data-v-16b69a2c>${ssrInterpolate(opt)}</span><span class="ed-er-pill__count" data-v-16b69a2c>${ssrInterpolate(audienceCount(opt))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-er-facet" data-v-16b69a2c><div class="ed-er-facet__label" data-v-16b69a2c>Functional area</div><div class="ed-er-facet__pills" data-v-16b69a2c><!--[-->`);
        ssrRenderList(unref(availableAreas), (area) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-er-pill--active": unref(areaFilter).has(area),
            "ed-er-pill--disabled": areaCount(area) === 0
          }, "ed-er-pill"])}"${ssrIncludeBooleanAttr(areaCount(area) === 0 && !unref(areaFilter).has(area)) ? " disabled" : ""} data-v-16b69a2c><span class="ed-er-pill__text" data-v-16b69a2c>${ssrInterpolate(area)}</span><span class="ed-er-pill__count" data-v-16b69a2c>${ssrInterpolate(areaCount(area))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-er-facet" data-v-16b69a2c><div class="ed-er-facet__label" data-v-16b69a2c>Section</div><div class="ed-er-facet__pills" data-v-16b69a2c><!--[-->`);
        ssrRenderList(unref(availableSections), (sec) => {
          _push(`<button type="button" class="${ssrRenderClass([{
            "ed-er-pill--active": unref(sectionFilter).has(sec.label),
            "ed-er-pill--disabled": sectionPillCount(sec.label) === 0
          }, "ed-er-pill"])}"${ssrIncludeBooleanAttr(sectionPillCount(sec.label) === 0 && !unref(sectionFilter).has(sec.label)) ? " disabled" : ""} data-v-16b69a2c><span class="ed-er-pill__text" data-v-16b69a2c>${ssrInterpolate(sec.label)}</span><span class="ed-er-pill__count" data-v-16b69a2c>${ssrInterpolate(sectionPillCount(sec.label))}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="ed-er-facet ed-er-facet--keyword" data-v-16b69a2c><div class="ed-er-facet__label" data-v-16b69a2c>Keyword</div><div class="ed-er-input" data-v-16b69a2c><svg class="ed-er-input__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-16b69a2c><circle cx="11" cy="11" r="7" data-v-16b69a2c></circle><path d="m20 20-3.5-3.5" data-v-16b69a2c></path></svg><input${ssrRenderAttr("value", unref(query))} type="search" class="ed-er-input__field" placeholder="Search title, summary, schema name, endpoint, or rationale" autocomplete="off" spellcheck="false" data-v-16b69a2c>`);
        if (unref(query)) {
          _push(`<button class="ed-er-input__clear" type="button" aria-label="Clear keyword" data-v-16b69a2c>×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="ed-er-meter" data-v-16b69a2c><span class="ed-er-meter__count" data-v-16b69a2c><strong data-v-16b69a2c>${ssrInterpolate(unref(filteredSections).length)}</strong> of ${ssrInterpolate(unref(versionSections).length)} ${ssrInterpolate(unref(versionSections).length === 1 ? "section" : "sections")}</span>`);
        if (unref(anyFilterActive)) {
          _push(`<button type="button" class="ed-er-meter__reset" data-v-16b69a2c>Reset filters ×</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filteredSections).length === 0) {
          _push(`<div class="ed-er-empty" data-v-16b69a2c><div class="ed-er-empty__title" data-v-16b69a2c>No corrections match the current filters</div><p class="ed-er-empty__body" data-v-16b69a2c> Try removing a filter or clearing the keyword. The pill counts above show how many sections each filter would surface on its own. </p><button class="ed-er-empty__btn" data-v-16b69a2c>Reset filters</button></div>`);
        } else {
          _push(`<div class="ed-er-groups" data-v-16b69a2c><!--[-->`);
          ssrRenderList(unref(groupedResults), (group) => {
            _push(`<div class="ed-er-group" data-v-16b69a2c><div class="ed-er-group__head" data-v-16b69a2c><div class="ed-er-group__id" data-v-16b69a2c>${ssrInterpolate(group.errataId)}</div><div class="ed-er-group__count" data-v-16b69a2c>${ssrInterpolate(group.sections.length)} ${ssrInterpolate(group.sections.length === 1 ? "correction" : "corrections")}</div></div><!--[-->`);
            ssrRenderList(group.sections, (s) => {
              _push(`<article${ssrRenderAttr("id", unref(anchorFor)(s))} class="ed-er-row" data-v-16b69a2c><div class="ed-er-row__num" data-v-16b69a2c>§${ssrInterpolate(s.number)}</div><div class="ed-er-row__body" data-v-16b69a2c><a${ssrRenderAttr("href", unref(errataPageUrl)(s))} class="ed-er-row__title-link" data-v-16b69a2c><span class="ed-er-row__title" data-v-16b69a2c>${highlight(s.title) ?? ""}</span></a><div class="ed-er-row__summary" data-v-16b69a2c>${highlight(s.summary) ?? ""}</div><div class="ed-er-row__chips" data-v-16b69a2c><!--[-->`);
              ssrRenderList(sectionsForErrata(s), (sec) => {
                _push(`<a${ssrRenderAttr("href", sec.path)} class="ed-er-chip ed-er-chip--sec"${ssrRenderAttr("title", `Open ${sec.label}`)} data-v-16b69a2c>${ssrInterpolate(sec.label)} →</a>`);
              });
              _push(`<!--]--><!--[-->`);
              ssrRenderList(s.endpoints || [], (ep) => {
                _push(`<button class="ed-er-chip ed-er-chip--ep" type="button"${ssrRenderAttr("title", `Search keyword: ${ep.label}`)} data-v-16b69a2c>${ssrInterpolate(ep.label)}</button>`);
              });
              _push(`<!--]--><!--[-->`);
              ssrRenderList(s.schemas || [], (schema) => {
                _push(`<button class="ed-er-chip ed-er-chip--sc" type="button"${ssrRenderAttr("title", `Search keyword: ${schema}`)} data-v-16b69a2c>${ssrInterpolate(schema)}</button>`);
              });
              _push(`<!--]--></div></div><a${ssrRenderAttr("href", unref(errataPageUrl)(s))} class="ed-er-row__arrow-link"${ssrRenderAttr("aria-label", `View errata details for §${s.number}`)} data-v-16b69a2c>→</a></article>`);
            });
            _push(`<!--]--></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></section><section class="ed-er-ref" data-v-16b69a2c><div class="ed-er-ref__inner" data-v-16b69a2c><div class="ed-er-ref__head" data-v-16b69a2c><div class="ed-er-ref__eyebrow" data-v-16b69a2c><span class="ed-er-ref__eyebrow-dash" data-v-16b69a2c></span> Governance </div><h2 class="ed-er-ref__title" data-v-16b69a2c>How this register works</h2><p class="ed-er-ref__lede" data-v-16b69a2c> The Errata register is bound by the policies that control how published content evolves. Once a version is published, its existing content <strong data-v-16b69a2c>MUST NOT</strong> be changed without an associated Errata record. </p></div><div class="ed-er-ref__grid" data-v-16b69a2c><a href="/policy/changes-to-published-content" class="ed-er-ref__tile" data-v-16b69a2c><div class="ed-er-ref__tile-meta" data-v-16b69a2c><span class="ed-er-ref__tile-meta-dash" data-v-16b69a2c></span> Policy </div><h3 class="ed-er-ref__tile-title" data-v-16b69a2c>Changes to Published Documentation</h3><p class="ed-er-ref__tile-body" data-v-16b69a2c> How published content may change after release — what requires an Errata, what does not, and how corrections are communicated. </p><div class="ed-er-ref__tile-foot" data-v-16b69a2c><span class="ed-er-ref__tile-cta" data-v-16b69a2c>Read policy</span><span class="ed-er-ref__tile-arrow" data-v-16b69a2c>→</span></div></a><a href="/policy/version-management" class="ed-er-ref__tile" data-v-16b69a2c><div class="ed-er-ref__tile-meta" data-v-16b69a2c><span class="ed-er-ref__tile-meta-dash" data-v-16b69a2c></span> Policy </div><h3 class="ed-er-ref__tile-title" data-v-16b69a2c>Version Management</h3><p class="ed-er-ref__tile-body" data-v-16b69a2c> How versions are numbered, when errata releases are cut, and how the relationship between Standards, API Hub, and Ozone Connect versions is maintained. </p><div class="ed-er-ref__tile-foot" data-v-16b69a2c><span class="ed-er-ref__tile-cta" data-v-16b69a2c>Read policy</span><span class="ed-er-ref__tile-arrow" data-v-16b69a2c>→</span></div></a></div><div class="ed-er-rules" data-v-16b69a2c><div class="ed-er-rules__label" data-v-16b69a2c>Operating rules</div><ul class="ed-er-rules__list" data-v-16b69a2c><li data-v-16b69a2c> Each entry has a unique identifier in the form <code data-v-16b69a2c>&lt;version&gt;-errata&lt;n&gt;</code> — for example, <code data-v-16b69a2c>v2.1-errata2</code>. </li><li data-v-16b69a2c> Each entry states the affected document(s) and section(s), what changed, why the change was required, and the effective date. </li><li data-v-16b69a2c> Existing published content <strong data-v-16b69a2c>MUST NOT</strong> be changed without an associated Errata record. </li><li data-v-16b69a2c> Pre-publication content (for example <code data-v-16b69a2c>-rc</code>, <code data-v-16b69a2c>-rc-final</code>) can be updated without an Errata. </li></ul></div><div class="ed-er-cross" data-v-16b69a2c> For changes to <strong data-v-16b69a2c>operational systems</strong> rather than documentation, see the Release Notes for <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/release-notes/api-hub/${unref(latestApiHubYear)}`)} data-v-16b69a2c>API Hub</a> or <a${ssrRenderAttr("href", `/tech/release-notes-and-erratas/release-notes/trust-framework/${unref(latestTrustFrameworkYear)}`)} data-v-16b69a2c>Trust Framework</a>. </div></div></section></div>`);
      }
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/release-notes-and-erratas/erratas/[version].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _version_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16b69a2c"]]);
export {
  _version_ as default
};
