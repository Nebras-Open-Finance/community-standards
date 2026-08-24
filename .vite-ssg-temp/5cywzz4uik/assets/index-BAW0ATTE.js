import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { r as routes, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const SHORT_NAMES = {
  "Licensed Financial Institutions (LFIs)": "LFI",
  "Third-Party Providers (TPPs)": "TPP",
  "System Integrators and Technology Service Providers": "Integrators",
  Nebras: "Nebras",
  "Ozone (API Hub)": "Ozone",
  "Raidiam (Trust Framework)": "Raidiam"
};
const ORDER = [
  "version-management",
  "lfi-deprecation",
  "ozone-connect-availability",
  "api-response-time",
  "ozone-connect-data-quality",
  "changes-to-published-content",
  "secure-management",
  "open-license-contribution-agreement"
];
function shortName(actor) {
  const known = SHORT_NAMES[actor];
  if (known !== void 0) return known;
  const paren = /^(.+?)\s*\(/.exec(actor);
  if (paren && paren[1]) return paren[1].trim();
  return actor;
}
function readPolicyMeta(meta) {
  if (!meta || typeof meta !== "object") return null;
  const m = meta;
  if (m["isIndex"] === true) return null;
  const title = typeof m["title"] === "string" ? m["title"] : "";
  const purpose = typeof m["purpose"] === "string" ? m["purpose"] : "";
  const readTime = typeof m["readTime"] === "string" ? m["readTime"] : "";
  const updated = typeof m["updated"] === "string" ? m["updated"] : "";
  const appliesToRaw = m["appliesTo"];
  const appliesTo = Array.isArray(appliesToRaw) ? appliesToRaw.filter((x) => typeof x === "string") : [];
  if (!title) return null;
  return { title, purpose, readTime, updated, appliesTo };
}
function slugFromPath(path) {
  const trimmed = path.replace(/\/+$/, "");
  const idx = trimmed.lastIndexOf("/");
  return idx >= 0 ? trimmed.slice(idx + 1) : trimmed;
}
function buildPolicy(route, meta) {
  const path = route.path;
  const slug = slugFromPath(path);
  const appliesToShort = meta.appliesTo.map(shortName);
  const isNebrasOnly = appliesToShort.length > 0 && appliesToShort.every((a) => a === "Nebras");
  const category = appliesToShort.length === 0 ? "" : isNebrasOnly ? "Nebras" : "Participants";
  return {
    slug,
    url: `/policy/${slug}`,
    title: meta.title,
    appliesTo: meta.appliesTo,
    appliesToShort,
    category,
    purpose: meta.purpose,
    readTime: meta.readTime,
    updated: meta.updated
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
const POLICY_DETAIL_PATH = /^\/policy\/[^/]+\/?$/;
const policies = flatten(routes).filter((r) => POLICY_DETAIL_PATH.test(r.path)).map((r) => {
  const meta = readPolicyMeta(r.meta);
  return meta ? buildPolicy(r, meta) : null;
}).filter((p) => p !== null).sort((a, b) => {
  const ai = ORDER.indexOf(a.slug);
  const bi = ORDER.indexOf(b.slug);
  if (ai === -1 && bi === -1) return 0;
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CATEGORY_ORDER = ["Participants", "Nebras"];
    const CATEGORY_COLORS = {
      Participants: "var(--at-teal)",
      Nebras: "var(--at-navy)",
      "": "var(--at-navy)"
    };
    const CATEGORY_TAG_BG = {
      Participants: "rgba(0, 194, 169, 0.10)",
      Nebras: "rgba(0, 39, 127, 0.10)",
      "": "rgba(0, 39, 127, 0.06)"
    };
    const query = ref("");
    const activeCategory = ref("all");
    const categories = computed(() => {
      const counts = {};
      for (const p of policies) {
        if (!p.category) continue;
        counts[p.category] = (counts[p.category] ?? 0) + 1;
      }
      const ordered = CATEGORY_ORDER.filter((name) => (counts[name] ?? 0) > 0).map((name) => ({
        id: name,
        label: name,
        count: counts[name] ?? 0,
        color: CATEGORY_COLORS[name] ?? "var(--at-navy)"
      }));
      return [
        { id: "all", label: "All Policies", count: policies.length, color: "var(--at-navy)" },
        ...ordered
      ];
    });
    const filteredPolicies = computed(() => {
      const q = query.value.trim().toLowerCase();
      return policies.filter((p) => {
        if (activeCategory.value !== "all" && p.category !== activeCategory.value) return false;
        if (!q) return true;
        return p.title.toLowerCase().includes(q) || (p.purpose || "").toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q) || p.appliesToShort.some((t) => t.toLowerCase().includes(q)) || p.appliesTo.some((t) => t.toLowerCase().includes(q));
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-kb" }, _attrs))} data-v-9c26a4d5><section class="ed-kb-hero" data-v-9c26a4d5><div class="ed-kb-hero__inner" data-v-9c26a4d5><div class="ed-kb-hero__label" data-v-9c26a4d5><span class="ed-kb-hero__label-dash" data-v-9c26a4d5></span> Govern · Operate · Evolve </div><h1 class="ed-kb-hero__title" data-v-9c26a4d5>Policies</h1><p class="ed-kb-hero__sub" data-v-9c26a4d5> Governance and operational policies for participants in the UAE Open Finance ecosystem — Licensed Financial Institutions, Third-Party Providers, and the technology service providers that support them. </p><div class="ed-kb-search" data-v-9c26a4d5><svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9c26a4d5><circle cx="11" cy="11" r="8" data-v-9c26a4d5></circle><path d="m21 21-4.35-4.35" data-v-9c26a4d5></path></svg><input${ssrRenderAttr("value", unref(query))} class="ed-kb-search__input" type="search" placeholder="Search policies…" aria-label="Search policies" data-v-9c26a4d5>`);
      if (unref(query)) {
        _push(`<button class="ed-kb-search__clear" aria-label="Clear search" data-v-9c26a4d5>×</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="ed-kb-filter" data-v-9c26a4d5><div class="ed-kb-filter__inner" data-v-9c26a4d5><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([{ "ed-kb-chip--active": unref(activeCategory) === cat.id }, "ed-kb-chip"])}" style="${ssrRenderStyle(unref(activeCategory) === cat.id ? { background: cat.color, borderColor: cat.color, color: "var(--at-bg-cream)" } : { borderColor: "var(--at-grid-line)", color: "var(--at-navy)" })}" data-v-9c26a4d5>${ssrInterpolate(cat.label)} · ${ssrInterpolate(cat.count)}</button>`);
      });
      _push(`<!--]--></div></section><section class="ed-kb-articles" data-v-9c26a4d5><div class="ed-kb-articles__inner" data-v-9c26a4d5><div class="ed-kb-count" style="${ssrRenderStyle({ color: unref(activeColor) })}" data-v-9c26a4d5>${ssrInterpolate(unref(filteredPolicies).length)} ${ssrInterpolate(unref(filteredPolicies).length === 1 ? "Policy" : "Policies")} `);
      if (unref(query)) {
        _push(`<!--[-->· Search: &quot;${ssrInterpolate(unref(query))}&quot;<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(filteredPolicies).length > 0) {
        _push(`<div class="ed-kb-grid" data-v-9c26a4d5><!--[-->`);
        ssrRenderList(unref(filteredPolicies), (policy) => {
          _push(`<a${ssrRenderAttr("href", policy.url)} class="ed-kb-card" style="${ssrRenderStyle({ "--kb-card-color": colorFor(policy.category) })}" data-v-9c26a4d5><span class="ed-kb-card__top" style="${ssrRenderStyle({ background: colorFor(policy.category) })}" data-v-9c26a4d5></span><div class="ed-kb-card__meta" data-v-9c26a4d5><span class="ed-kb-card__cat" style="${ssrRenderStyle({ color: colorFor(policy.category) })}" data-v-9c26a4d5>${ssrInterpolate(policy.category || "Uncategorised")}</span>`);
          if (policy.readTime) {
            _push(`<span class="ed-kb-card__dot" data-v-9c26a4d5>·</span>`);
          } else {
            _push(`<!---->`);
          }
          if (policy.readTime) {
            _push(`<span class="ed-kb-card__read" data-v-9c26a4d5>${ssrInterpolate(policy.readTime)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><h3 class="ed-kb-card__title" data-v-9c26a4d5>${ssrInterpolate(policy.title)}</h3><p class="ed-kb-card__desc" data-v-9c26a4d5>${ssrInterpolate(policy.purpose)}</p>`);
          if (policy.appliesToShort && policy.appliesToShort.length) {
            _push(`<div class="ed-kb-card__tags" data-v-9c26a4d5><!--[-->`);
            ssrRenderList(policy.appliesToShort, (tag) => {
              _push(`<span class="ed-kb-card__tag" style="${ssrRenderStyle({
                background: tagBackground(policy.category),
                color: colorFor(policy.category)
              })}" data-v-9c26a4d5>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-kb-card__foot" data-v-9c26a4d5>`);
          if (policy.updated) {
            _push(`<span class="ed-kb-card__updated" data-v-9c26a4d5> Updated ${ssrInterpolate(formatUpdated(policy.updated))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="ed-kb-card__arrow" style="${ssrRenderStyle({ color: colorFor(policy.category) })}" data-v-9c26a4d5>→</span></div></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="ed-kb-empty" data-v-9c26a4d5><div class="ed-kb-empty__icon" data-v-9c26a4d5>⌕</div><h3 class="ed-kb-empty__title" data-v-9c26a4d5>No policies found</h3><p class="ed-kb-empty__sub" data-v-9c26a4d5>`);
        if (unref(query)) {
          _push(`<!--[-->No matches for <strong data-v-9c26a4d5>&quot;${ssrInterpolate(unref(query))}&quot;</strong>. <!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c26a4d5"]]);
export {
  index as default
};
