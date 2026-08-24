import { defineComponent, ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { S as STANCE, u as useProposals, t as tallyOf, i as isDecided, a as PROPOSALS_CONFIG, b as STANCE_ORDER } from "./useProposals-BAvc6Ljz.js";
import { P as PvVoteBar } from "./PvVoteBar-BySHaSon.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PvVoteAttribForm",
  __ssrInlineRender: true,
  props: {
    stance: {},
    submitted: { type: Boolean },
    questions: { default: () => [] }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { auth } = useProposals();
    const comment = ref("");
    const answers = ref([]);
    function syncAnswers() {
      answers.value = (props.questions ?? []).map((_, i) => answers.value[i] ?? "");
    }
    watch(() => props.questions, syncAnswers, { immediate: true, deep: true });
    const meta = computed(() => STANCE[props.stance]);
    const stanceLabel = computed(() => meta.value.label);
    const showForm = computed(() => !props.submitted);
    const org = computed(() => auth.value.orgs.map((o) => o.name).join(", "));
    const voterName = computed(() => auth.value.name ?? auth.value.email ?? "");
    const ineligibleReason = computed(() => {
      if (!auth.value.authenticated || auth.value.canVote) return "";
      return "Your Trust Framework account is not an active member of any organisation, so it cannot vote.";
    });
    watch(
      () => props.stance,
      () => {
        comment.value = "";
        answers.value = (props.questions ?? []).map(() => "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (!showForm.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "pv-attrib pv-attrib--done",
          style: {
            background: `color-mix(in srgb, ${meta.value.ink} 9%, white)`,
            borderLeftColor: meta.value.ink
          }
        }, _attrs))} data-v-b6392a57><div class="pv-attrib__done-title" style="${ssrRenderStyle({ color: meta.value.ink })}" data-v-b6392a57> ✓ Submitted · ${ssrInterpolate(stanceLabel.value)}</div><div class="pv-attrib__done-text" data-v-b6392a57> Recorded for <strong data-v-b6392a57>${ssrInterpolate(org.value)}</strong>${ssrInterpolate(voterName.value ? ` · ${voterName.value}` : "")}. </div></div>`);
      } else if (unref(auth).loaded && !unref(auth).authenticated) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "pv-attrib pv-attrib--auth",
          style: { borderLeftColor: meta.value.ink }
        }, _attrs))} data-v-b6392a57><div class="pv-attrib__title" style="${ssrRenderStyle({ color: meta.value.ink })}" data-v-b6392a57> Sign in with the Sandbox Trust Framework to record your ${ssrInterpolate(stanceLabel.value)} vote </div><button type="button" class="pv-attrib__submit pv-attrib__signin" style="${ssrRenderStyle({ background: meta.value.ink })}" data-v-b6392a57> Vote </button></div>`);
      } else if (unref(auth).loaded && unref(auth).authenticated && !unref(auth).canVote) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "pv-attrib pv-attrib--auth",
          style: { borderLeftColor: "#a6391f" }
        }, _attrs))} data-v-b6392a57><div class="pv-attrib__title" style="${ssrRenderStyle({ color: "#a6391f" })}" data-v-b6392a57>Can&#39;t vote with this account</div><div class="pv-attrib__auth-text" data-v-b6392a57>${ssrInterpolate(ineligibleReason.value)}</div></div>`);
      } else if (unref(auth).loaded) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "pv-attrib",
          style: { borderLeftColor: meta.value.ink }
        }, _attrs))} data-v-b6392a57><div class="pv-attrib__title" style="${ssrRenderStyle({ color: meta.value.ink })}" data-v-b6392a57> Confirm your ${ssrInterpolate(stanceLabel.value)} vote </div><div class="pv-attrib__identity" data-v-b6392a57><span class="pv-attrib__identity-label" data-v-b6392a57>Voting as</span><span class="pv-attrib__identity-val" data-v-b6392a57><strong data-v-b6392a57>${ssrInterpolate(org.value)}</strong>${ssrInterpolate(voterName.value ? ` · ${voterName.value}` : "")}</span></div><!--[-->`);
        ssrRenderList(__props.questions, (question, i) => {
          _push(`<div class="pv-attrib__q" data-v-b6392a57><label class="pv-attrib__label" data-v-b6392a57>${ssrInterpolate(question)} <span class="pv-attrib__opt" data-v-b6392a57>(optional)</span></label><textarea class="pv-attrib__field pv-attrib__textarea pv-attrib__qfield" placeholder="Your answer…" data-v-b6392a57>${ssrInterpolate(answers.value[i])}</textarea></div>`);
        });
        _push(`<!--]--><div data-v-b6392a57><label class="pv-attrib__label" data-v-b6392a57>Comment <span class="pv-attrib__opt" data-v-b6392a57>(optional)</span></label><textarea class="pv-attrib__field pv-attrib__textarea"${ssrRenderAttr("placeholder", `Set out in detail why you are voting ${stanceLabel.value.toLowerCase()} — context, concerns, conditions, anything the working group should weigh.`)} data-v-b6392a57>${ssrInterpolate(comment.value)}</textarea></div><div class="pv-attrib__actions" data-v-b6392a57><button type="button" class="pv-attrib__submit" style="${ssrRenderStyle({ background: meta.value.ink })}" data-v-b6392a57> Submit ${ssrInterpolate(stanceLabel.value)} vote </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvVoteAttribForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PvVoteAttribForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b6392a57"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PvVotePanel",
  __ssrInlineRender: true,
  props: {
    proposal: {},
    myVote: {}
  },
  emits: ["vote", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const config = PROPOSALS_CONFIG;
    const tally = computed(() => tallyOf(props.proposal.id, props.myVote));
    const decided = computed(() => isDecided(props.proposal.status));
    const reveal = computed(
      () => config.resultsVisibility === "always"
    );
    const leading = computed(() => {
      const { for: f, against: a } = tally.value.counts;
      if (f === a) return null;
      return f > a ? "for" : "against";
    });
    const favourPct = computed(() => {
      const { for: f, total } = tally.value.counts;
      return total ? Math.round(f / total * 100) : 0;
    });
    const favourColor = computed(
      () => leading.value === "for" ? STANCE.for.ink : leading.value === "against" ? STANCE.against.ink : "var(--at-navy-deep)"
    );
    const stanceGlyph = { for: "✓", against: "✕", abstain: "–" };
    const stances = STANCE_ORDER;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pv-cast" }, _attrs))} data-v-176b1fb8><div class="pv-cast__bar" data-v-176b1fb8><span class="pv-cast__bar-label" data-v-176b1fb8>§ ${ssrInterpolate(decided.value ? "Result" : "Ballot")}</span><span class="pv-cast__bar-div" data-v-176b1fb8></span><span class="pv-cast__bar-note" data-v-176b1fb8>${ssrInterpolate(__props.proposal.id)}</span><span class="${ssrRenderClass([{ "pv-cast__bar-closes--decided": decided.value }, "pv-cast__bar-closes"])}" data-v-176b1fb8>${ssrInterpolate(decided.value ? "Voting closed" : `Closes ${__props.proposal.closes} · ${__props.proposal.closesIn}`)}</span></div><div class="pv-cast__grid" data-v-176b1fb8><div class="pv-cast__controls" data-v-176b1fb8><div class="pv-cast__prompt" data-v-176b1fb8>${ssrInterpolate(decided.value ? "Voting has closed for this proposal" : "Where do you stand?")}</div><div class="pv-cast__buttons" data-v-176b1fb8><!--[-->`);
      ssrRenderList(unref(stances), (stance) => {
        var _a, _b, _c, _d;
        _push(`<button type="button" class="pv-cast__btn"${ssrIncludeBooleanAttr(decided.value) ? " disabled" : ""} style="${ssrRenderStyle({
          background: ((_a = __props.myVote) == null ? void 0 : _a.stance) === stance ? unref(STANCE)[stance].ink : "var(--at-surface)",
          borderColor: ((_b = __props.myVote) == null ? void 0 : _b.stance) === stance ? unref(STANCE)[stance].ink : "var(--at-grid-line)",
          color: ((_c = __props.myVote) == null ? void 0 : _c.stance) === stance ? "#fff" : unref(STANCE)[stance].ink,
          opacity: decided.value && ((_d = __props.myVote) == null ? void 0 : _d.stance) !== stance ? 0.4 : 1
        })}" data-v-176b1fb8><span class="pv-cast__btn-glyph" data-v-176b1fb8>${ssrInterpolate(stanceGlyph[stance])}</span> ${ssrInterpolate(unref(STANCE)[stance].label)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (!__props.myVote && !decided.value) {
        _push(`<div class="pv-cast__pick" data-v-176b1fb8> Pick a stance to add your name &amp; a comment. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pv-cast__results" data-v-176b1fb8>`);
      if (reveal.value) {
        _push(`<!--[--><div class="pv-cast__results-head" data-v-176b1fb8><div data-v-176b1fb8><span class="pv-cast__pct" style="${ssrRenderStyle({ color: favourColor.value })}" data-v-176b1fb8>${ssrInterpolate(favourPct.value)}%</span><div class="pv-cast__pct-label" data-v-176b1fb8>in favour</div></div><div class="pv-cast__orgs" data-v-176b1fb8><span class="pv-cast__orgs-num" data-v-176b1fb8>${ssrInterpolate(tally.value.counts.total)}</span><div class="pv-cast__orgs-label" data-v-176b1fb8>votes cast</div></div></div>`);
        _push(ssrRenderComponent(PvVoteBar, {
          counts: tally.value.counts,
          bare: ""
        }, null, _parent));
        _push(`<div class="pv-cast__tiles" data-v-176b1fb8><!--[-->`);
        ssrRenderList(unref(stances), (stance) => {
          _push(`<div class="pv-cast__tile" style="${ssrRenderStyle({ borderTopColor: unref(STANCE)[stance].bar })}" data-v-176b1fb8><div class="pv-cast__tile-num" style="${ssrRenderStyle({ color: unref(STANCE)[stance].ink })}" data-v-176b1fb8>${ssrInterpolate(tally.value.counts[stance])}</div><div class="pv-cast__tile-label" data-v-176b1fb8>${ssrInterpolate(unref(STANCE)[stance].label)}</div></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<div class="pv-cast__hidden" data-v-176b1fb8><div class="pv-cast__hidden-glyph" data-v-176b1fb8>▢</div><div class="pv-cast__hidden-text" data-v-176b1fb8>Results are hidden until you cast your vote.</div></div>`);
      }
      _push(`</div></div>`);
      if (__props.myVote && !decided.value) {
        _push(ssrRenderComponent(PvVoteAttribForm, {
          stance: __props.myVote.stance,
          submitted: __props.myVote.submitted,
          questions: __props.proposal.questions ?? [],
          onSubmit: ($event) => emit("submit", $event)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvVotePanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PvVotePanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-176b1fb8"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PvProposalTabs",
  __ssrInlineRender: true,
  props: {
    tabbed: { type: Boolean }
  },
  setup(__props) {
    const TABS = [
      { key: "outcome", label: "Outcome of Proposal" },
      { key: "votes", label: "Votes Received & Feedback" },
      { key: "proposal", label: "Original Proposal" }
    ];
    const active = ref("outcome");
    const regionRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.tabbed) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          ref_key: "regionRef",
          ref: regionRef,
          class: "pv-ptabs"
        }, _attrs))} data-v-1dba5902><div class="pv-ptabs__bar" role="tablist" aria-label="Proposal sections" data-v-1dba5902><div class="pv-ptabs__bar-inner" data-v-1dba5902><!--[-->`);
        ssrRenderList(TABS, (t) => {
          _push(`<button type="button" role="tab"${ssrRenderAttr("aria-selected", active.value === t.key)} class="${ssrRenderClass([{ "pv-ptabs__tab--active": active.value === t.key }, "pv-ptabs__tab"])}" data-v-1dba5902>${ssrInterpolate(t.label)}</button>`);
        });
        _push(`<!--]--></div></div><div class="pv-ptabs__panels" data-v-1dba5902><div role="tabpanel" style="${ssrRenderStyle(active.value === "outcome" ? null : { display: "none" })}" data-v-1dba5902>`);
        ssrRenderSlot(_ctx.$slots, "outcome", {}, null, _push, _parent);
        _push(`</div><div role="tabpanel" style="${ssrRenderStyle(active.value === "votes" ? null : { display: "none" })}" data-v-1dba5902>`);
        ssrRenderSlot(_ctx.$slots, "votes", {}, null, _push, _parent);
        _push(`</div><div role="tabpanel" style="${ssrRenderStyle(active.value === "proposal" ? null : { display: "none" })}" data-v-1dba5902>`);
        ssrRenderSlot(_ctx.$slots, "proposal", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderSlot(_ctx.$slots, "votes", {}, null, _push, _parent);
        ssrRenderSlot(_ctx.$slots, "proposal", {}, null, _push, _parent);
        _push(`<!--]-->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/proposals/PvProposalTabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PvProposalTabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1dba5902"]]);
export {
  PvProposalTabs as P,
  PvVotePanel as a
};
