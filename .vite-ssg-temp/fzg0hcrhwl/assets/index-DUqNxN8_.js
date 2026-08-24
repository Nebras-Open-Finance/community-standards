import { defineComponent, onMounted, computed, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { u as useProposals, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalRow } from "./PvProposalRow-B5kfZvrJ.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Proposals & Voting" });
    const { proposalList, myVotes, hydrate, loadAll } = useProposals();
    onMounted(() => {
      hydrate();
      void loadAll();
    });
    const externalList = computed(() => proposalList.value.filter((p) => !p.internal));
    const statusOf = (p) => deriveStatus(p.opened, p.closes);
    const FILTERS = [
      { key: "open", label: "Open" },
      { key: "draft", label: "Draft" },
      { key: "closed", label: "Closed" }
    ];
    const filter = ref("open");
    const stats = computed(() => ({
      open: externalList.value.filter((p) => statusOf(p) === "open").length,
      draft: externalList.value.filter((p) => statusOf(p) === "draft").length,
      closed: externalList.value.filter((p) => statusOf(p) === "closed").length
    }));
    const shown = computed(() => externalList.value.filter((p) => statusOf(p) === filter.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pv" }, _attrs))} data-v-d1f58965><section class="pv-hero" data-v-d1f58965><div class="pv-hero__inner" data-v-d1f58965><div class="pv-hero__label" data-v-d1f58965><span class="pv-hero__label-dash" data-v-d1f58965></span> Community · Decided together </div><h1 class="pv-hero__title" data-v-d1f58965> Proposals &amp; Voting <span class="pv-hero__badge" data-v-d1f58965>${ssrInterpolate(stats.value.open)} open</span></h1><p class="pv-hero__sub" data-v-d1f58965> Nebras puts changes to the standards up for a vote. Cast a single vote — <strong data-v-d1f58965>For</strong>, <strong data-v-d1f58965>Against</strong>, or <strong data-v-d1f58965>Abstain</strong> — and add your reasoning, recorded in the open so every decision can be understood later. </p><div class="pv-hero__links" data-v-d1f58965>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/support-service-desk/",
        class: "pv-hero__link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pv-hero__link-label" data-v-d1f58965${_scopeId}>Idea?</span><span class="pv-hero__link-text" data-v-d1f58965${_scopeId}>Raise a proposal via the Service Desk</span><span class="pv-hero__link-arrow" data-v-d1f58965${_scopeId}>→</span>`);
          } else {
            return [
              createVNode("span", { class: "pv-hero__link-label" }, "Idea?"),
              createVNode("span", { class: "pv-hero__link-text" }, "Raise a proposal via the Service Desk"),
              createVNode("span", { class: "pv-hero__link-arrow" }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="pv-band" data-v-d1f58965><div class="pv-band__inner" data-v-d1f58965><div class="pv-band__head" data-v-d1f58965><div class="pv-band__eyebrow" data-v-d1f58965><span class="pv-band__eyebrow-dash" data-v-d1f58965></span> Open votes </div><h2 class="pv-band__title" data-v-d1f58965>Proposals</h2><p class="pv-band__lede" data-v-d1f58965> Scan every proposal and see how its vote is trending, then open any one to read the idea and cast your vote. </p></div><div class="pv__stats" data-v-d1f58965><div class="pv__stat" data-v-d1f58965><span class="pv__stat-bar" style="${ssrRenderStyle({ "background": "var(--at-blue)" })}" data-v-d1f58965></span><div class="pv__stat-num" data-v-d1f58965>${ssrInterpolate(stats.value.open)}</div><div class="pv__stat-label" data-v-d1f58965>Open for voting</div></div><div class="pv__stat" data-v-d1f58965><span class="pv__stat-bar" style="${ssrRenderStyle({ "background": "var(--at-gold)" })}" data-v-d1f58965></span><div class="pv__stat-num" data-v-d1f58965>${ssrInterpolate(stats.value.draft)}</div><div class="pv__stat-label" data-v-d1f58965>Draft</div></div><div class="pv__stat" data-v-d1f58965><span class="pv__stat-bar" style="${ssrRenderStyle({ "background": "var(--at-teal)" })}" data-v-d1f58965></span><div class="pv__stat-num" data-v-d1f58965>${ssrInterpolate(stats.value.closed)}</div><div class="pv__stat-label" data-v-d1f58965>Closed</div></div></div><div class="pv__tabs" data-v-d1f58965><!--[-->`);
      ssrRenderList(FILTERS, (f) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "pv__tab--active": filter.value === f.key }, "pv__tab"])}" data-v-d1f58965>${ssrInterpolate(f.label)}</button>`);
      });
      _push(`<!--]--></div><div class="pv__colhead" data-v-d1f58965><div data-v-d1f58965>ID</div><div data-v-d1f58965>Proposal</div><div data-v-d1f58965>Target version</div><div data-v-d1f58965>How it&#39;s going</div><div class="pv__colhead-right" data-v-d1f58965>Closes</div></div><div class="pv__rows" data-v-d1f58965><!--[-->`);
      ssrRenderList(shown.value, (p) => {
        _push(ssrRenderComponent(PvProposalRow, {
          key: p.id,
          proposal: p,
          "my-vote": unref(myVotes)[p.id]
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (shown.value.length === 0) {
        _push(`<div class="pv__empty" data-v-d1f58965>No proposals in this view.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1f58965"]]);
export {
  index as default
};
