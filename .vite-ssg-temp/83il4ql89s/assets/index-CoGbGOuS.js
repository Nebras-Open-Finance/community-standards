import { defineComponent, ref, onMounted, computed, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useUrlSearchParam } from "./useUrlSearchParam-CAJ_AAT-.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const DOCS_API = "https://docs.nebras-open-finance.com";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CATEGORY_ORDER = ["LFI", "TPP"];
    const CATEGORY_COLORS = {
      LFI: "var(--at-teal)",
      TPP: "var(--at-gold)",
      Authority: "var(--at-blue-deep)"
    };
    const CATEGORY_TAG_BG = {
      LFI: "rgba(0, 194, 169, 0.10)",
      TPP: "rgba(179, 120, 25, 0.10)",
      Authority: "rgba(0, 67, 166, 0.10)"
    };
    const TYPE_LABEL = {
      LFI: "LFI",
      TPP: "TPP",
      Authority: "Authority"
    };
    const ALL_CATEGORY_IDS = ["all", "LFI", "TPP", "Authority"];
    const organisations = ref([]);
    const loading = ref(true);
    const error = ref("");
    const queryParam = useUrlSearchParam("q", "");
    const categoryParam = useUrlSearchParam("type", "all", {
      allowed: ALL_CATEGORY_IDS
    });
    const query = queryParam.value;
    const activeCategory = categoryParam.value;
    function isCategoryId(s) {
      return s === "LFI" || s === "TPP" || s === "Authority";
    }
    function toCard(o) {
      if (!o.id || !o.name || !o.legalName || !o.type || !isCategoryId(o.type)) return null;
      const tags = [o.type];
      if (o.type === "LFI" && o.tppGoLiveDate) tags.push("TPP");
      return {
        id: o.id,
        name: o.name,
        legalName: o.legalName,
        logo: o.logoUri || "",
        type: o.type,
        tags,
        lfiGoLiveDate: o.lfiGoLiveDate || "",
        tppGoLiveDate: o.tppGoLiveDate || "",
        link: `/doc-repository/${o.id}/`
      };
    }
    onMounted(async () => {
      try {
        const res = await fetch(`${DOCS_API}/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        organisations.value = list.filter((o) => o.isProduction === true).map(toCard).filter((o) => o !== null).sort((a, b) => a.name.localeCompare(b.name));
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
      } finally {
        loading.value = false;
      }
    });
    const categories = computed(() => {
      const counts = {};
      for (const o of organisations.value) {
        counts[o.type] = (counts[o.type] ?? 0) + 1;
      }
      const ordered = CATEGORY_ORDER.filter((id) => (counts[id] ?? 0) > 0).map((id) => ({
        id,
        label: TYPE_LABEL[id],
        count: counts[id] ?? 0,
        color: CATEGORY_COLORS[id]
      }));
      return [
        {
          id: "all",
          label: "All",
          count: organisations.value.length,
          color: "var(--at-navy)"
        },
        ...ordered
      ];
    });
    const filteredOrgs = computed(() => {
      const q = query.value.trim().toLowerCase();
      return organisations.value.filter((o) => {
        if (activeCategory.value !== "all" && o.type !== activeCategory.value) return false;
        if (!q) return true;
        return o.name.toLowerCase().includes(q) || o.legalName.toLowerCase().includes(q) || o.tags.some((t) => t.toLowerCase().includes(q));
      });
    });
    const activeColor = computed(() => {
      const hit = categories.value.find((c) => c.id === activeCategory.value);
      return hit ? hit.color : "var(--at-navy)";
    });
    function colorFor(type) {
      return CATEGORY_COLORS[type];
    }
    function tagBackground(type) {
      return CATEGORY_TAG_BG[type];
    }
    function typeLabel(type) {
      return TYPE_LABEL[type];
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
    function formatGoLive(iso) {
      if (!iso) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    }
    function earliestGoLive(org) {
      const dates = [org.lfiGoLiveDate, org.tppGoLiveDate].filter(Boolean).sort();
      return dates[0] || "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-kb" }, _attrs))} data-v-1e0fecaf><section class="ed-kb-hero" data-v-1e0fecaf><div class="ed-kb-hero__inner" data-v-1e0fecaf><div class="ed-kb-hero__label" data-v-1e0fecaf><span class="ed-kb-hero__label-dash" data-v-1e0fecaf></span> Directory · Participants · Documents </div><h1 class="ed-kb-hero__title" data-v-1e0fecaf>Document Repository</h1><p class="ed-kb-hero__sub" data-v-1e0fecaf> Public documentation from Licensed Financial Institutions and Third-Party Providers participating in UAE Open Finance. </p>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/doc-repository/how-to-access",
        class: "ed-kb-hero__guide"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` How Accessing the Document Repository works <span class="ed-kb-hero__guide-arrow" data-v-1e0fecaf${_scopeId}>→</span>`);
          } else {
            return [
              createTextVNode(" How Accessing the Document Repository works "),
              createVNode("span", { class: "ed-kb-hero__guide-arrow" }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ed-kb-search" data-v-1e0fecaf><svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-1e0fecaf><circle cx="11" cy="11" r="8" data-v-1e0fecaf></circle><path d="m21 21-4.35-4.35" data-v-1e0fecaf></path></svg><input${ssrRenderAttr("value", unref(query))} class="ed-kb-search__input" type="search" placeholder="Search organisations…" aria-label="Search organisations" data-v-1e0fecaf>`);
      if (unref(query)) {
        _push(`<button class="ed-kb-search__clear" aria-label="Clear search" data-v-1e0fecaf>×</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="ed-kb-filter" data-v-1e0fecaf><div class="ed-kb-filter__inner" data-v-1e0fecaf><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([{ "ed-kb-chip--active": unref(activeCategory) === cat.id }, "ed-kb-chip"])}" style="${ssrRenderStyle(unref(activeCategory) === cat.id ? { background: cat.color, borderColor: cat.color, color: "var(--at-bg-cream)" } : { borderColor: "var(--at-grid-line)", color: "var(--at-navy)" })}" data-v-1e0fecaf>${ssrInterpolate(cat.label)} · ${ssrInterpolate(cat.count)}</button>`);
      });
      _push(`<!--]--></div></section><section class="ed-kb-articles" data-v-1e0fecaf><div class="ed-kb-articles__inner" data-v-1e0fecaf>`);
      if (unref(loading)) {
        _push(`<div class="ed-kb-empty" data-v-1e0fecaf><div class="ed-kb-empty__icon" data-v-1e0fecaf>⧖</div><h3 class="ed-kb-empty__title" data-v-1e0fecaf>Loading organisations…</h3></div>`);
      } else if (unref(error)) {
        _push(`<div class="ed-kb-empty" data-v-1e0fecaf><div class="ed-kb-empty__icon" data-v-1e0fecaf>⚠</div><h3 class="ed-kb-empty__title" data-v-1e0fecaf>Could not load organisations</h3><p class="ed-kb-empty__sub" data-v-1e0fecaf><strong data-v-1e0fecaf>${ssrInterpolate(unref(error))}</strong></p></div>`);
      } else {
        _push(`<!--[--><div class="ed-kb-count" style="${ssrRenderStyle({ color: unref(activeColor) })}" data-v-1e0fecaf>${ssrInterpolate(unref(filteredOrgs).length)} ${ssrInterpolate(unref(filteredOrgs).length === 1 ? "Organisation" : "Organisations")} `);
        if (unref(query)) {
          _push(`<!--[-->· Search: &quot;${ssrInterpolate(unref(query))}&quot;<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filteredOrgs).length > 0) {
          _push(`<div class="ed-kb-grid" data-v-1e0fecaf><!--[-->`);
          ssrRenderList(unref(filteredOrgs), (org) => {
            _push(ssrRenderComponent(_component_router_link, {
              key: org.id,
              to: org.link,
              class: "ed-kb-card",
              style: { "--kb-card-color": colorFor(org.type) }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="ed-kb-card__top" style="${ssrRenderStyle({ background: colorFor(org.type) })}" data-v-1e0fecaf${_scopeId}></span><div class="ed-kb-card__meta" data-v-1e0fecaf${_scopeId}><span class="ed-kb-card__cat" style="${ssrRenderStyle({ color: colorFor(org.type) })}" data-v-1e0fecaf${_scopeId}>${ssrInterpolate(typeLabel(org.type))}</span></div><div class="ed-kb-card__head" data-v-1e0fecaf${_scopeId}>`);
                  if (org.logo) {
                    _push2(`<img${ssrRenderAttr("src", org.logo)}${ssrRenderAttr("alt", org.name)} class="ed-kb-card__logo" data-v-1e0fecaf${_scopeId}>`);
                  } else {
                    _push2(`<div class="ed-kb-card__logo ed-kb-card__logo--placeholder" data-v-1e0fecaf${_scopeId}>${ssrInterpolate(org.name.charAt(0))}</div>`);
                  }
                  _push2(`<h3 class="ed-kb-card__title" data-v-1e0fecaf${_scopeId}>${ssrInterpolate(org.name)}</h3></div><p class="ed-kb-card__desc" data-v-1e0fecaf${_scopeId}>${ssrInterpolate(org.legalName)}</p>`);
                  if (org.tags.length) {
                    _push2(`<div class="ed-kb-card__tags" data-v-1e0fecaf${_scopeId}><!--[-->`);
                    ssrRenderList(org.tags, (tag) => {
                      _push2(`<span class="ed-kb-card__tag" style="${ssrRenderStyle({
                        background: tagBackground(org.type),
                        color: colorFor(org.type)
                      })}" data-v-1e0fecaf${_scopeId}>${ssrInterpolate(tag)}</span>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-kb-card__foot" data-v-1e0fecaf${_scopeId}>`);
                  if (earliestGoLive(org)) {
                    _push2(`<span class="ed-kb-card__updated" data-v-1e0fecaf${_scopeId}> Live since ${ssrInterpolate(formatGoLive(earliestGoLive(org)))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="ed-kb-card__arrow" style="${ssrRenderStyle({ color: colorFor(org.type) })}" data-v-1e0fecaf${_scopeId}>→</span></div>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "ed-kb-card__top",
                      style: { background: colorFor(org.type) }
                    }, null, 4),
                    createVNode("div", { class: "ed-kb-card__meta" }, [
                      createVNode("span", {
                        class: "ed-kb-card__cat",
                        style: { color: colorFor(org.type) }
                      }, toDisplayString(typeLabel(org.type)), 5)
                    ]),
                    createVNode("div", { class: "ed-kb-card__head" }, [
                      org.logo ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: org.logo,
                        alt: org.name,
                        class: "ed-kb-card__logo"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "ed-kb-card__logo ed-kb-card__logo--placeholder"
                      }, toDisplayString(org.name.charAt(0)), 1)),
                      createVNode("h3", { class: "ed-kb-card__title" }, toDisplayString(org.name), 1)
                    ]),
                    createVNode("p", { class: "ed-kb-card__desc" }, toDisplayString(org.legalName), 1),
                    org.tags.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ed-kb-card__tags"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(org.tags, (tag) => {
                        return openBlock(), createBlock("span", {
                          key: tag,
                          class: "ed-kb-card__tag",
                          style: {
                            background: tagBackground(org.type),
                            color: colorFor(org.type)
                          }
                        }, toDisplayString(tag), 5);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "ed-kb-card__foot" }, [
                      earliestGoLive(org) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "ed-kb-card__updated"
                      }, " Live since " + toDisplayString(formatGoLive(earliestGoLive(org))), 1)) : createCommentVNode("", true),
                      createVNode("span", {
                        class: "ed-kb-card__arrow",
                        style: { color: colorFor(org.type) }
                      }, "→", 4)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="ed-kb-empty" data-v-1e0fecaf><div class="ed-kb-empty__icon" data-v-1e0fecaf>⌕</div><h3 class="ed-kb-empty__title" data-v-1e0fecaf>No organisations found</h3><p class="ed-kb-empty__sub" data-v-1e0fecaf>`);
          if (unref(query)) {
            _push(`<!--[-->No matches for <strong data-v-1e0fecaf>&quot;${ssrInterpolate(unref(query))}&quot;</strong>. <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` Try adjusting your search or filter criteria. </p></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/doc-repository/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e0fecaf"]]);
export {
  index as default
};
