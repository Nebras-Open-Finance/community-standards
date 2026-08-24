import { defineComponent, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { d as deriveStatus, t as tallyOf, i as isDecided, a as PROPOSALS_CONFIG, S as STANCE } from "./useProposals-BAvc6Ljz.js";
import { P as PvVoteBar } from "./PvVoteBar-BySHaSon.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PvProposalRow",
  __ssrInlineRender: true,
  props: {
    proposal: {},
    myVote: {}
  },
  setup(__props) {
    const props = __props;
    const config = PROPOSALS_CONFIG;
    const status = computed(() => deriveStatus(props.proposal.opened, props.proposal.closes));
    const counts = computed(() => tallyOf(props.proposal.id).counts);
    const decided = computed(() => isDecided(status.value));
    const reveal = computed(
      () => config.resultsVisibility === "always"
    );
    const myStance = computed(() => {
      var _a;
      return (_a = props.myVote) == null ? void 0 : _a.stance;
    });
    const href = computed(() => {
      const slug = props.proposal.id.toLowerCase();
      return props.proposal.internal ? `/internal/proposals/${slug}` : `/proposals/${slug}`;
    });
    const closesLabel = computed(() => {
      if (decided.value) return "Closed";
      const closes = (/* @__PURE__ */ new Date(`${props.proposal.closes}T23:59:59Z`)).getTime();
      if (Number.isNaN(closes)) return props.proposal.closes;
      const days = Math.ceil((closes - Date.now()) / 864e5);
      if (days < 0) return "Closed";
      if (days === 0) return "Today";
      if (days === 1) return "1 day";
      return `${days} days`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(ssrRenderComponent(_component_RouterLink, mergeProps({
        to: href.value,
        class: "pv-row"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pv-row__id" data-v-612260a0${_scopeId}>${ssrInterpolate(__props.proposal.id)}</div><div class="pv-row__main" data-v-612260a0${_scopeId}><div class="pv-row__title" data-v-612260a0${_scopeId}>${ssrInterpolate(__props.proposal.title)}</div></div><div class="pv-row__version" data-v-612260a0${_scopeId}>${ssrInterpolate(__props.proposal.version || "—")}</div><div class="pv-row__going" data-v-612260a0${_scopeId}>`);
            if (reveal.value) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(PvVoteBar, {
                counts: counts.value,
                compact: ""
              }, null, _parent2, _scopeId));
              _push2(`<div class="pv-row__counts" data-v-612260a0${_scopeId}><span style="${ssrRenderStyle({ color: unref(STANCE).for.ink })}" data-v-612260a0${_scopeId}>${ssrInterpolate(counts.value.for)} for</span><span style="${ssrRenderStyle({ color: unref(STANCE).against.ink })}" data-v-612260a0${_scopeId}>${ssrInterpolate(counts.value.against)} against</span><span style="${ssrRenderStyle({ color: unref(STANCE).abstain.ink })}" data-v-612260a0${_scopeId}>${ssrInterpolate(counts.value.abstain)} abst</span></div><!--]-->`);
            } else {
              _push2(`<div class="pv-row__hidden" data-v-612260a0${_scopeId}>▢ Vote to reveal tally</div>`);
            }
            _push2(`</div><div class="pv-row__closes" data-v-612260a0${_scopeId}><div class="${ssrRenderClass([{ "pv-row__closes-in--decided": decided.value }, "pv-row__closes-in"])}" data-v-612260a0${_scopeId}>${ssrInterpolate(closesLabel.value)}</div>`);
            if (myStance.value) {
              _push2(`<div class="pv-row__you" style="${ssrRenderStyle({ color: unref(STANCE)[myStance.value].ink })}" data-v-612260a0${_scopeId}> ✓ You · ${ssrInterpolate(unref(STANCE)[myStance.value].label)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "pv-row__id" }, toDisplayString(__props.proposal.id), 1),
              createVNode("div", { class: "pv-row__main" }, [
                createVNode("div", { class: "pv-row__title" }, toDisplayString(__props.proposal.title), 1)
              ]),
              createVNode("div", { class: "pv-row__version" }, toDisplayString(__props.proposal.version || "—"), 1),
              createVNode("div", { class: "pv-row__going" }, [
                reveal.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode(PvVoteBar, {
                    counts: counts.value,
                    compact: ""
                  }, null, 8, ["counts"]),
                  createVNode("div", { class: "pv-row__counts" }, [
                    createVNode("span", {
                      style: { color: unref(STANCE).for.ink }
                    }, toDisplayString(counts.value.for) + " for", 5),
                    createVNode("span", {
                      style: { color: unref(STANCE).against.ink }
                    }, toDisplayString(counts.value.against) + " against", 5),
                    createVNode("span", {
                      style: { color: unref(STANCE).abstain.ink }
                    }, toDisplayString(counts.value.abstain) + " abst", 5)
                  ])
                ], 64)) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "pv-row__hidden"
                }, "▢ Vote to reveal tally"))
              ]),
              createVNode("div", { class: "pv-row__closes" }, [
                createVNode("div", {
                  class: ["pv-row__closes-in", { "pv-row__closes-in--decided": decided.value }]
                }, toDisplayString(closesLabel.value), 3),
                myStance.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pv-row__you",
                  style: { color: unref(STANCE)[myStance.value].ink }
                }, " ✓ You · " + toDisplayString(unref(STANCE)[myStance.value].label), 5)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvProposalRow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PvProposalRow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-612260a0"]]);
export {
  PvProposalRow as P
};
