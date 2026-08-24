import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { i as internalPolicyThemes, f as internalPolicies, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Policies · Internal" });
    const query = ref("");
    const filteredThemes = computed(() => {
      const q = query.value.trim().toLowerCase();
      if (!q) return internalPolicyThemes;
      return internalPolicyThemes.map((t) => ({
        ...t,
        policies: t.policies.filter(
          (p) => p.title.toLowerCase().includes(q) || p.purpose.toLowerCase().includes(q) || t.label.toLowerCase().includes(q) || p.appliesToShort.some((a) => a.toLowerCase().includes(q))
        )
      })).filter((t) => t.policies.length > 0);
    });
    const matchCount = computed(
      () => filteredThemes.value.reduce((n, t) => n + t.policies.length, 0)
    );
    function tagBackground(color) {
      return `color-mix(in srgb, ${color} 10%, transparent)`;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-kb" }, _attrs))} data-v-0fbff70f><section class="ed-kb-hero" data-v-0fbff70f><div class="ed-kb-hero__inner" data-v-0fbff70f><div class="ed-kb-hero__label" data-v-0fbff70f><span class="ed-kb-hero__label-dash" data-v-0fbff70f></span> Internal · Restricted </div><h1 class="ed-kb-hero__title" data-v-0fbff70f>Policies</h1><p class="ed-kb-hero__sub" data-v-0fbff70f> Nebras’s internal corporate governance policies — the governance, risk, security, conduct, and people frameworks that direct how Nebras Open Finance operates. These documents are classified <strong data-v-0fbff70f>Restricted</strong> and are for internal reference only. </p><div class="ed-kb-search" data-v-0fbff70f><svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-0fbff70f><circle cx="11" cy="11" r="8" data-v-0fbff70f></circle><path d="m21 21-4.35-4.35" data-v-0fbff70f></path></svg><input${ssrRenderAttr("value", unref(query))} class="ed-kb-search__input" type="search" placeholder="Search policies…" aria-label="Search policies" data-v-0fbff70f>`);
      if (unref(query)) {
        _push(`<button class="ed-kb-search__clear" aria-label="Clear search" data-v-0fbff70f>×</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="ed-kb-articles" data-v-0fbff70f><div class="ed-kb-articles__inner" data-v-0fbff70f><div class="ed-kb-count" data-v-0fbff70f>${ssrInterpolate(unref(matchCount))} ${ssrInterpolate(unref(matchCount) === 1 ? "Policy" : "Policies")} `);
      if (unref(query)) {
        _push(`<!--[-->· Search: &quot;${ssrInterpolate(unref(query))}&quot;<!--]-->`);
      } else {
        _push(`<!--[-->· ${ssrInterpolate(unref(internalPolicies).length)} across ${ssrInterpolate(unref(internalPolicyThemes).length)} themes<!--]-->`);
      }
      _push(`</div>`);
      if (unref(matchCount) > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(filteredThemes), (theme) => {
          _push(`<div class="pol-theme" data-v-0fbff70f><h2 class="pol-theme__head" style="${ssrRenderStyle({ color: theme.color })}" data-v-0fbff70f><span class="pol-theme__dash" style="${ssrRenderStyle({ background: theme.color })}" data-v-0fbff70f></span> ${ssrInterpolate(theme.label)} <span class="pol-theme__count" data-v-0fbff70f>${ssrInterpolate(theme.policies.length)}</span></h2><div class="ed-kb-grid" data-v-0fbff70f><!--[-->`);
          ssrRenderList(theme.policies, (policy) => {
            _push(`<a${ssrRenderAttr("href", `/internal/policies/${policy.slug}`)} class="ed-kb-card" style="${ssrRenderStyle({ "--kb-card-color": theme.color })}" data-v-0fbff70f><span class="ed-kb-card__top" style="${ssrRenderStyle({ background: theme.color })}" data-v-0fbff70f></span><div class="ed-kb-card__meta" data-v-0fbff70f><span class="ed-kb-card__cat" style="${ssrRenderStyle({ color: theme.color })}" data-v-0fbff70f>${ssrInterpolate(policy.classification)}</span><span class="ed-kb-card__dot" data-v-0fbff70f>·</span><span class="ed-kb-card__read" data-v-0fbff70f>${ssrInterpolate(policy.readTime)}</span></div><h3 class="ed-kb-card__title" data-v-0fbff70f>${ssrInterpolate(policy.title)}</h3><p class="ed-kb-card__desc" data-v-0fbff70f>${ssrInterpolate(policy.purpose)}</p>`);
            if (policy.appliesToShort.length) {
              _push(`<div class="ed-kb-card__tags" data-v-0fbff70f><!--[-->`);
              ssrRenderList(policy.appliesToShort, (tag) => {
                _push(`<span class="ed-kb-card__tag" style="${ssrRenderStyle({ background: tagBackground(theme.color), color: theme.color })}" data-v-0fbff70f>${ssrInterpolate(tag)}</span>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="ed-kb-card__foot" data-v-0fbff70f>`);
            if (policy.updated) {
              _push(`<span class="ed-kb-card__updated" data-v-0fbff70f> Updated ${ssrInterpolate(formatUpdated(policy.updated))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span class="ed-kb-card__arrow" style="${ssrRenderStyle({ color: theme.color })}" data-v-0fbff70f>→</span></div></a>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="ed-kb-empty" data-v-0fbff70f><div class="ed-kb-empty__icon" data-v-0fbff70f>⌕</div><h3 class="ed-kb-empty__title" data-v-0fbff70f>No policies found</h3><p class="ed-kb-empty__sub" data-v-0fbff70f>`);
        if (unref(query)) {
          _push(`<!--[-->No matches for <strong data-v-0fbff70f>&quot;${ssrInterpolate(unref(query))}&quot;</strong>. <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(` Try adjusting your search. </p></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0fbff70f"]]);
export {
  index as default
};
