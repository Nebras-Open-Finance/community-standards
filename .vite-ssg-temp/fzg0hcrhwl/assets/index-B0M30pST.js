import { defineComponent, onMounted, computed, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { u as useProposals } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalRow } from "./PvProposalRow-B5kfZvrJ.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Internal proposals",
      // Unlinked, internal-only page — keep it out of search indexes.
      meta: [{ name: "robots", content: "noindex, nofollow" }]
    });
    const { proposalList, myVotes, hydrate, loadAll } = useProposals();
    onMounted(() => {
      hydrate();
      void loadAll();
    });
    const shown = computed(() => proposalList.value.filter((p) => p.internal));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pv" }, _attrs))} data-v-b7437c58><section class="pv-hero" data-v-b7437c58><div class="pv-hero__inner" data-v-b7437c58><div class="pv-hero__label" data-v-b7437c58><span class="pv-hero__label-dash" data-v-b7437c58></span> Community · Internal review </div><h1 class="pv-hero__title" data-v-b7437c58> Internal proposals `);
      _push(ssrRenderComponent(PvStatusPill, { status: "internal" }, null, _parent));
      _push(`</h1><p class="pv-hero__sub" data-v-b7437c58> Proposals still under <strong data-v-b7437c58>internal review</strong> — not yet on the public `);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "pv-hero__inline-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Proposals &amp; Voting`);
          } else {
            return [
              createTextVNode("Proposals & Voting")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` page. Each one lives behind the internal password gate until it is published. </p></div></section><section class="pv-band" data-v-b7437c58><div class="pv-band__inner" data-v-b7437c58><div class="pv-band__head" data-v-b7437c58><div class="pv-band__eyebrow" data-v-b7437c58><span class="pv-band__eyebrow-dash" data-v-b7437c58></span> Internal only </div><h2 class="pv-band__title" data-v-b7437c58>Proposals</h2><p class="pv-band__lede" data-v-b7437c58> Internal-only proposals. Open any one to read the idea; the layout mirrors the public proposal pages. </p></div><div class="pv__colhead" data-v-b7437c58><div data-v-b7437c58>ID</div><div data-v-b7437c58>Proposal</div><div data-v-b7437c58>Target version</div><div data-v-b7437c58>How it&#39;s going</div><div class="pv__colhead-right" data-v-b7437c58>Closes</div></div><div class="pv__rows" data-v-b7437c58><!--[-->`);
      ssrRenderList(shown.value, (p) => {
        _push(ssrRenderComponent(PvProposalRow, {
          key: p.id,
          proposal: p,
          "my-vote": unref(myVotes)[p.id]
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (shown.value.length === 0) {
        _push(`<div class="pv__empty" data-v-b7437c58>No internal proposals.</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/proposals/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7437c58"]]);
export {
  index as default
};
