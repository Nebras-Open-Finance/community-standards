import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcCertLanding",
  __ssrInlineRender: true,
  props: {
    audience: {},
    title: {},
    lede: {},
    cards: {}
  },
  setup(__props) {
    const props = __props;
    const PALETTE = [
      "var(--at-teal)",
      "var(--at-gold)",
      "var(--at-blue, #2563eb)",
      "var(--at-navy)",
      "var(--at-blue-deep, #1d4ed8)",
      "var(--at-teal-deep)",
      "var(--at-navy-deep)"
    ];
    const decorated = computed(
      () => props.cards.map((card, i) => ({ ...card, color: PALETTE[i % PALETTE.length] ?? PALETTE[0] }))
    );
    function withAlpha(cssVar, alpha) {
      return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-landing" }, _attrs))} data-v-8510619d><section class="fc-landing-hero" data-v-8510619d><div class="fc-landing-hero__inner" data-v-8510619d><div class="fc-landing-hero__label" data-v-8510619d><span class="fc-landing-hero__label-dash" data-v-8510619d></span> Testing &amp; Certification </div><h1 class="fc-landing-hero__title" data-v-8510619d>${ssrInterpolate(__props.title)} <span class="fc-landing-hero__badge" data-v-8510619d>${ssrInterpolate(__props.audience)}</span></h1><p class="fc-landing-hero__sub" data-v-8510619d>${__props.lede ?? ""}</p><p class="fc-landing-hero__note" data-v-8510619d> Each area is certified separately — pick the one you are submitting evidence for and follow the guidance, then attach the ZIP the portal builds to its own Service Desk ticket. </p></div></section><section class="fc-landing-sections" data-v-8510619d><div class="fc-landing-sections__inner" data-v-8510619d><div class="fc-landing-grid" data-v-8510619d><!--[-->`);
      ssrRenderList(unref(decorated), (card) => {
        _push(`<!--[-->`);
        if (!card.subItems) {
          _push(`<a${ssrRenderAttr("href", card.url)} class="fc-landing-card" style="${ssrRenderStyle({ "--card-color": card.color })}" data-v-8510619d><span class="fc-landing-card__top" style="${ssrRenderStyle({ background: card.color })}" data-v-8510619d></span><div class="fc-landing-card__meta" data-v-8510619d><span class="fc-landing-card__cat" style="${ssrRenderStyle({ color: card.color })}" data-v-8510619d>${ssrInterpolate(card.category)}</span></div><h3 class="fc-landing-card__title" data-v-8510619d>${card.title ?? ""}</h3><p class="fc-landing-card__desc" data-v-8510619d>${card.desc ?? ""}</p>`);
          if (card.tags && card.tags.length) {
            _push(`<div class="fc-landing-card__tags" data-v-8510619d><!--[-->`);
            ssrRenderList(card.tags, (tag) => {
              _push(`<span class="fc-landing-card__tag" style="${ssrRenderStyle({ background: withAlpha(card.color, 0.1), color: card.color })}" data-v-8510619d>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="fc-landing-card__foot" data-v-8510619d><span class="fc-landing-card__cta" data-v-8510619d>Open guide</span><span class="fc-landing-card__arrow" style="${ssrRenderStyle({ color: card.color })}" data-v-8510619d>→</span></div></a>`);
        } else {
          _push(`<div class="fc-landing-card fc-landing-card--split" style="${ssrRenderStyle({ "--card-color": card.color })}" data-v-8510619d><span class="fc-landing-card__top" style="${ssrRenderStyle({ background: card.color })}" data-v-8510619d></span><a${ssrRenderAttr("href", card.url)} class="fc-landing-card__head" data-v-8510619d><div class="fc-landing-card__meta" data-v-8510619d><span class="fc-landing-card__cat" style="${ssrRenderStyle({ color: card.color })}" data-v-8510619d>${ssrInterpolate(card.category)}</span></div><h3 class="fc-landing-card__title" data-v-8510619d>${card.title ?? ""}</h3><p class="fc-landing-card__desc" data-v-8510619d>${card.desc ?? ""}</p></a><ul class="fc-landing-card__subs" data-v-8510619d><!--[-->`);
          ssrRenderList(card.subItems, (sub) => {
            _push(`<li data-v-8510619d><a${ssrRenderAttr("href", sub.url)} class="fc-landing-card__sub" data-v-8510619d><span class="fc-landing-card__sub-marker" style="${ssrRenderStyle({ background: card.color })}" data-v-8510619d></span><span class="fc-landing-card__sub-body" data-v-8510619d><span class="fc-landing-card__sub-label" data-v-8510619d>${sub.label ?? ""}</span>`);
            if (sub.hint) {
              _push(`<span class="fc-landing-card__sub-hint" data-v-8510619d>${sub.hint ?? ""}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span><span class="fc-landing-card__sub-arrow" style="${ssrRenderStyle({ color: card.color })}" data-v-8510619d>→</span></a></li>`);
          });
          _push(`<!--]--></ul></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcCertLanding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8510619d"]]);
export {
  __unplugin_components_0 as _
};
