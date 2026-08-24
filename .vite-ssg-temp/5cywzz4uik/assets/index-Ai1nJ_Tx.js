import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, watch, onMounted, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, resolveDynamicComponent, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import { t as tallyOf, u as useProposals, P as PRIORITY, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import { useHead } from "@unhead/vue";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "./PvVoteBar-BySHaSon.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "outcome",
  __ssrInlineRender: true,
  setup(__props) {
    const { voterTotal } = useProposals();
    const record = {
      id: "OFP-004",
      ref: "DR-2026-004",
      verdict: "approved",
      title: "Enforce a minimum ExpirationDateTime for consents",
      category: "Consent · Validation",
      decisionDate: "22 Jul 2026",
      // A label (or date) for when the decision takes effect; '' to omit the pill.
      effective: "V2.1 errata",
      summary: "Approved as proposed, and unanimously — 12 votes in favour, none against, none abstaining. A 15-minute minimum is introduced for both the consent expiry and the multi-authorisation expiry. Today a consent can be created with an ExpirationDateTime only seconds in the future. While technically valid, such a consent can expire before a customer has completed the authorisation journey — being redirected to the LFI, authenticating, reviewing and approving the consent, returning to the TPP, and allowing the TPP to exchange the authorisation code and make its first API call."
    };
    const counts = computed(() => tallyOf(record.id).counts);
    const pct = computed(
      () => counts.value.total ? Math.round(counts.value.for / counts.value.total * 100) : 0
    );
    const turnout = computed(
      () => voterTotal ? Math.round(counts.value.total / voterTotal * 100) : 0
    );
    const approved = computed(() => record.verdict === "approved");
    const seal = computed(() => approved.value ? "var(--at-teal-deep, #008B78)" : "#A6391F");
    const sealTint = computed(
      () => approved.value ? "rgba(0, 194, 169, 0.12)" : "rgba(166, 57, 31, 0.08)"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "po",
        style: { "--seal": seal.value, "--seal-tint": sealTint.value }
      }, _attrs))} data-v-6f9f6743><div class="po__inner" data-v-6f9f6743><div class="po-sheet" data-v-6f9f6743><div class="po-sheet__head" data-v-6f9f6743><div class="po-eyebrow" data-v-6f9f6743><span class="po-eyebrow__k" data-v-6f9f6743>Decision record · ${ssrInterpolate(record.ref)}</span><span class="po-eyebrow__dot" data-v-6f9f6743></span><span class="po-eyebrow__k" data-v-6f9f6743>${ssrInterpolate(record.category)}</span><span class="po-eyebrow__dot" data-v-6f9f6743></span><span class="po-eyebrow__k" data-v-6f9f6743>Voting closed ${ssrInterpolate(record.decisionDate)}</span></div><div class="po-verdict" data-v-6f9f6743><div class="${ssrRenderClass([{ "po-seal--approved": approved.value }, "po-seal"])}" data-v-6f9f6743><span class="po-seal__glyph" data-v-6f9f6743>${ssrInterpolate(approved.value ? "✓" : "✕")}</span></div><div class="po-verdict__text" data-v-6f9f6743><div class="po-verdict__label" data-v-6f9f6743>${ssrInterpolate(approved.value ? "Approved" : "Rejected")} `);
      if (approved.value) {
        _push(`<span class="po-verdict__chip" data-v-6f9f6743>Ratified</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="po-verdict__sub" data-v-6f9f6743>${ssrInterpolate(pct.value)}% in favour · ${ssrInterpolate(counts.value.for)}–${ssrInterpolate(counts.value.against)}–${ssrInterpolate(counts.value.abstain)}</div></div></div><div class="po-sheet__title" data-v-6f9f6743><span class="po-pid" data-v-6f9f6743>${ssrInterpolate(record.id)}</span><h2 data-v-6f9f6743>${ssrInterpolate(record.title)}</h2></div></div><div class="po-metrics" data-v-6f9f6743><div class="po-metrics__cell po-metrics__cell--hl" data-v-6f9f6743><div class="po-metrics__bar" data-v-6f9f6743></div><div class="po-badge" data-v-6f9f6743><span class="po-badge__g" data-v-6f9f6743>${ssrInterpolate(approved.value ? "✓" : "✕")}</span><span class="po-badge__w" data-v-6f9f6743>${ssrInterpolate(approved.value ? "Approved" : "Rejected")}</span></div><div class="po-metrics__cap" data-v-6f9f6743>Final decision</div></div><div class="po-metrics__cell" data-v-6f9f6743><div class="po-metrics__bar" data-v-6f9f6743></div><div class="po-metrics__num" data-v-6f9f6743>${ssrInterpolate(pct.value)}%</div><div class="po-metrics__cap" data-v-6f9f6743>In favour</div></div><div class="po-metrics__cell" data-v-6f9f6743><div class="po-metrics__bar" data-v-6f9f6743></div><div class="po-metrics__num" data-v-6f9f6743>${ssrInterpolate(counts.value.total)}<span class="po-metrics__denom" data-v-6f9f6743>/${ssrInterpolate(unref(voterTotal))}</span></div><div class="po-metrics__cap" data-v-6f9f6743>Total votes</div></div><div class="po-metrics__cell" data-v-6f9f6743><div class="po-metrics__bar" data-v-6f9f6743></div><div class="po-metrics__num" data-v-6f9f6743>${ssrInterpolate(turnout.value)}%</div><div class="po-metrics__cap" data-v-6f9f6743>Participation</div></div></div></div><div class="po-body" data-v-6f9f6743><div data-v-6f9f6743><div class="po-seclabel" data-v-6f9f6743>§ Decision summary</div><p class="po-summary" data-v-6f9f6743>${ssrInterpolate(record.summary)}</p><div class="po-detail" data-v-6f9f6743><p data-v-6f9f6743> The approved set therefore introduces a <strong data-v-6f9f6743>15-minute minimum</strong> on <code data-v-6f9f6743>ExpirationDateTime</code>, in addition to the existing requirements that the value be in the future and no more than one year ahead. A value below the minimum is rejected at consent creation as a standard request-validation error. </p><p data-v-6f9f6743> For Bank Service Initiation consents that require multiple authorisers, the same minimum is applied to <code data-v-6f9f6743>AuthorizationExpirationDateTime</code>. Participants agreed that subsequent authorisers must also be given a realistic window in which to complete their approvals, and that deadlines measured in seconds or a few minutes provide no practical opportunity to do so. </p><p data-v-6f9f6743> The change is <strong data-v-6f9f6743>validation-only</strong>. The consent lifecycle, the consent status model, and the API Hub&#39;s handling of unauthorised consents remain unchanged. </p></div><div class="po-note" data-v-6f9f6743><div class="po-note__k" data-v-6f9f6743>How this will be enforced</div><p class="po-note__p" data-v-6f9f6743> Both minimums are enforced centrally by the <strong data-v-6f9f6743>API Hub</strong> at consent creation — no LFI-side change is required. The check will be introduced in a <strong data-v-6f9f6743>future API Hub deployment</strong> and written into the standards as <strong data-v-6f9f6743>V2.1 errata</strong>, alongside the existing “must be in the future” and one-year-maximum bounds. </p></div><div class="po-spec" data-v-6f9f6743><h3 class="po-h" data-v-6f9f6743> The change in the rules `);
      {
        _push(`<span class="po-next__eff" data-v-6f9f6743>This change will be made in ${ssrInterpolate(record.effective)}</span>`);
      }
      _push(`</h3><p class="po-spec__lede" data-v-6f9f6743> No new fields, endpoints, or schemas — two additional lower bounds validated at the API Hub, applied where each field appears. <code data-v-6f9f6743>ExpirationDateTime</code> is carried by every consent type; <code data-v-6f9f6743>AuthorizationExpirationDateTime</code> exists for multi-authorisation payments only. </p><div class="po-rules" data-v-6f9f6743><div class="po-rules__label" data-v-6f9f6743>Final validation rules · enforced at the API Hub</div><ul class="po-rules__list" data-v-6f9f6743><li data-v-6f9f6743><code data-v-6f9f6743>ExpirationDateTime</code> (consent expiry) — more than <strong data-v-6f9f6743>15 minutes</strong> and no more than <strong data-v-6f9f6743>one year</strong> in the future. </li><li data-v-6f9f6743><code data-v-6f9f6743>AuthorizationExpirationDateTime</code> (multi-authorisation deadline, payments only) — more than <strong data-v-6f9f6743>15 minutes</strong> in the future and <strong data-v-6f9f6743>on or before</strong> the consent&#39;s <code data-v-6f9f6743>ExpirationDateTime</code>. </li></ul></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-004/outcome.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const outcome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6f9f6743"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outcome
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props) {
    const themes = [
      {
        k: "01",
        title: "Unanimous, with no dissent",
        body: "Every vote was in favour — 12 for, none against, none abstaining — across a broad cross-section of the ecosystem, LFIs and TPPs alike. No amendment was requested and no objection was raised to the 15-minute floor or to applying it to both expiry fields."
      },
      {
        k: "02",
        title: "The field confirms dead-on-arrival consents",
        body: "The one detailed endorsement came from an LFI that had directly observed the problem the proposal describes — consents created with only seconds or minutes of headroom, lapsing before the customer can finish authorising. They also backed extending the same floor to AuthorizationExpirationDateTime for multi-authorisation payments, calling the whole change a simple validation-and-documentation fix with minimal impact on legitimate short-lived consents.",
        quote: {
          text: "We’ve observed consents being created with an ExpirationDateTime only seconds/minutes ahead, which can expire before the customer completes the redirect + authentication + authorization/approval flow and the TPP makes the first call. These consents are effectively dead on arrival.",
          who: "An LFI · For"
        }
      },
      {
        k: "03",
        title: "Reassurance that the lifecycle is untouched",
        body: "The main risk flagged during drafting was whether this touched the consent status model. Another LFI’s vote answered it directly: their only note was that the change is safe precisely because it does not affect the consent lifecycle — which matches the decision, a validation-only bound that leaves the status model and the Hub’s handling of unauthorised consents unchanged.",
        quote: {
          text: "I have no concerns with this change, as it does not affect the consent lifecycle.",
          who: "An LFI · For"
        }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fb" }, _attrs))} data-v-e84ac18b><div class="fb__inner" data-v-e84ac18b><div class="fb__head" data-v-e84ac18b><div class="fb__eyebrow" data-v-e84ac18b><span class="fb__eyebrow-dash" data-v-e84ac18b></span> Feedback · themes from the vote</div><h2 class="fb__title" data-v-e84ac18b>What the ecosystem told us</h2><p class="fb__lede" data-v-e84ac18b> A short synthesis of the votes and comments behind the tally above. Support was unanimous and largely wordless — two voters left a comment; the rest recorded a plain “For”. The full per-organisation votes are listed in the panel. </p></div><div class="fb__grid" data-v-e84ac18b><!--[-->`);
      ssrRenderList(themes, (t) => {
        _push(`<article class="fb-card" data-v-e84ac18b><div class="fb-card__k" data-v-e84ac18b>${ssrInterpolate(t.k)}</div><h3 class="fb-card__title" data-v-e84ac18b>${ssrInterpolate(t.title)}</h3><p class="fb-card__body" data-v-e84ac18b>${ssrInterpolate(t.body)}</p>`);
        if (t.quote) {
          _push(`<blockquote class="fb-card__quote" data-v-e84ac18b><p class="fb-card__quote-text" data-v-e84ac18b>“${ssrInterpolate(t.quote.text)}”</p><footer class="fb-card__quote-who" data-v-e84ac18b>${ssrInterpolate(t.quote.who)}</footer></blockquote>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-004/feedback.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e84ac18b"]]);
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: feedback
}, Symbol.toStringTag, { value: "Module" }));
const OG_TITLE = "OFP-004 · Enforce a minimum ExpirationDateTime for consents";
const OG_DESCRIPTION = "A consent can be created today that expires in seconds — long before the customer can authenticate at the LFI. Add a minimum ExpirationDateTime at consent creation so a consent is never born already doomed to expire mid-journey.";
const evidenceAccepted = `# PAR validation TODAY — the only rule enforced is "must be in the future"
ExpirationDateTime     PAR result
past (-1 hour)         400   "The ExpirationDateTime value must be in the future."
now + 30 seconds       201   accepted   <-- expires mid-journey: dead on arrival
now + 2 minutes        201   accepted
now + 2 hours          201   accepted
now + 364 days         201   accepted
now + > 1 year               rejected (documented maximum)`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    useHead({
      title: OG_TITLE,
      meta: [
        { property: "og:title", content: `${OG_TITLE} | UAE Open Finance` },
        { property: "og:description", content: OG_DESCRIPTION },
        { name: "twitter:description", content: OG_DESCRIPTION }
      ]
    });
    const meta = {
      id: "OFP-004",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "1 Jul 2026",
      closes: "22 Jul 2026",
      priority: "medium",
      version: "V2.1-errata"
    };
    const pros = [
      "Eliminates dead-on-arrival consents — a consent can no longer be created that expires before the customer has time to authenticate at the LFI and the TPP to make its first call.",
      "Ties the minimum to the real constraint — the authorisation journey — a stable, real-world value rather than an internal platform setting that might change.",
      "Preserves data minimisation: a TPP can still create a short-lived, single-use consent (e.g. a one-off balance or verification check) rather than holding a long-lived grant it does not need.",
      "Small and additive — one extra bound on ExpirationDateTime at the API Hub, alongside the existing “must be in the future” rule and the documented one-year maximum.",
      "Purely a validation change — no new fields, endpoints, or schemas, and no change to the consent status model, which the API Hub handles independently.",
      "Cheap for TPPs to adopt — any sensible ExpirationDateTime already clears a 15-minute floor, so only absurd values are rejected.",
      "Extends cleanly to multi-authorisation payments — the same floor guards AuthorizationExpirationDateTime, so a subsequent-authoriser deadline can no longer be set too tight to meet, without inventing a second rule."
    ];
    const cons = [
      "The exact floor (15 minutes) is a judgement call; an unusually slow authentication journey could in theory still outrun a minimum-length consent, so the margin must be chosen with comfort to spare.",
      "Rejects the most extreme short-lived consents outright: a TPP that deliberately wanted a sub-15-minute grant can no longer create one, however niche that case is.",
      "Introduces a new request-validation rejection at consent creation, so any TPP tooling that today sends very short ExpirationDateTime values (test harnesses, automation) must be updated to clear the floor."
    ];
    const { myVotes, setVote, submitVote, hydrate, loadOne, loadMe, metaById } = useProposals();
    const apiMeta = computed(() => metaById.value[meta.id]);
    const closesIn = ref("");
    const status = ref("open");
    const priority = ref(meta.priority);
    const openedDisplay = ref(meta.opened);
    const closesDisplay = ref(meta.closes);
    const versionDisplay = ref(meta.version);
    const priorityLabel = computed(() => {
      var _a2;
      return ((_a2 = PRIORITY[priority.value]) == null ? void 0 : _a2.label) ?? PRIORITY.medium.label;
    });
    const isClosed = computed(() => status.value === "closed");
    const outcomeMods = /* @__PURE__ */ Object.assign({ "./outcome.vue": __vite_glob_0_0 });
    const feedbackMods = /* @__PURE__ */ Object.assign({ "./feedback.vue": __vite_glob_1_0 });
    const OutcomePartial = ((_a = Object.values(outcomeMods)[0]) == null ? void 0 : _a.default) ?? null;
    const FeedbackPartial = ((_b = Object.values(feedbackMods)[0]) == null ? void 0 : _b.default) ?? null;
    const showTabs = computed(() => isClosed.value && !!OutcomePartial);
    const proposal = computed(() => {
      var _a2;
      return {
        id: meta.id,
        title: "Enforce a minimum ExpirationDateTime for consents",
        summary: "",
        category: "",
        priority: priority.value,
        status: status.value,
        author: { org: meta.proposedBy, person: meta.author },
        opened: openedDisplay.value,
        closes: closesDisplay.value,
        closesIn: closesIn.value,
        body: [],
        questions: ((_a2 = apiMeta.value) == null ? void 0 : _a2.questions) ?? [],
        version: versionDisplay.value
      };
    });
    const myVote = computed(() => myVotes.value[meta.id]);
    const submitError = ref("");
    function onVote(stance) {
      submitError.value = "";
      setVote(meta.id, stance);
    }
    async function onSubmit(detail) {
      if (!myVote.value) return;
      submitError.value = "";
      const result = await submitVote(meta.id, { stance: myVote.value.stance, comment: detail.comment, answers: detail.answers });
      if (!result.ok) submitError.value = result.message ?? "Could not record your vote.";
    }
    function toISO(display) {
      const d = new Date(display);
      return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
    }
    function daysLeft(iso) {
      if (!iso) return "";
      const days = Math.ceil(((/* @__PURE__ */ new Date(`${iso}T23:59:59Z`)).getTime() - Date.now()) / 864e5);
      if (days < 0) return "Closed";
      if (days === 0) return "Closing today";
      if (days === 1) return "1 day left";
      return `${days} days left`;
    }
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function fmtDate(iso) {
      const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
      if (Number.isNaN(d.getTime())) return iso;
      return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    }
    function syncFromApi() {
      const m = apiMeta.value;
      const openedISO = (m == null ? void 0 : m.opened) || toISO(meta.opened);
      const closesISO = (m == null ? void 0 : m.closes) || toISO(meta.closes);
      status.value = deriveStatus(openedISO, closesISO);
      closesIn.value = daysLeft(closesISO);
      priority.value = (m == null ? void 0 : m.priority) || meta.priority;
      openedDisplay.value = (m == null ? void 0 : m.opened) ? fmtDate(m.opened) : meta.opened;
      closesDisplay.value = (m == null ? void 0 : m.closes) ? fmtDate(m.closes) : meta.closes;
      versionDisplay.value = (m == null ? void 0 : m.version) || meta.version;
    }
    watch(apiMeta, syncFromApi);
    onMounted(() => {
      hydrate();
      void loadOne(meta.id);
      void loadMe();
      syncFromApi();
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-9e3b8970><section class="ofp-hero" data-v-9e3b8970><div class="ofp-hero__inner" data-v-9e3b8970>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-9e3b8970${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-9e3b8970><span class="ofp__id" data-v-9e3b8970>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-9e3b8970></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-9e3b8970>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-9e3b8970>Enforce a minimum ExpirationDateTime for consents</h1><p class="ofp__summary" data-v-9e3b8970> A consent can be created today that expires in seconds — long before the customer can be redirected to the LFI, authenticate, and authorise it. Add a minimum <code data-v-9e3b8970>ExpirationDateTime</code> at consent creation so a consent is never born already doomed to expire mid-journey. </p><div class="ofp__strip" data-v-9e3b8970><div class="ofp__strip-item" data-v-9e3b8970><div class="ofp__strip-key" data-v-9e3b8970>Proposed by</div><div class="ofp__strip-val" data-v-9e3b8970>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-9e3b8970><div class="ofp__strip-key" data-v-9e3b8970>Author</div><div class="ofp__strip-val" data-v-9e3b8970>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-9e3b8970><div class="ofp__strip-key" data-v-9e3b8970>Target version</div><div class="ofp__strip-val" data-v-9e3b8970>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-9e3b8970><div class="ofp__strip-key" data-v-9e3b8970>Opened</div><div class="ofp__strip-val" data-v-9e3b8970>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-9e3b8970><div class="ofp__strip-key" data-v-9e3b8970>Closes</div><div class="ofp__strip-val" data-v-9e3b8970>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
      _push(ssrRenderComponent(PvProposalTabs, { tabbed: showTabs.value }, {
        outcome: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(OutcomePartial)), null, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(unref(OutcomePartial))))
            ];
          }
        }),
        votes: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-9e3b8970${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-9e3b8970${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-9e3b8970${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-9e3b8970${_scopeId}><div class="ofp-vote-cover__card" data-v-9e3b8970${_scopeId}><div class="ofp-vote-cover__label" data-v-9e3b8970${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-9e3b8970${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
            if (unref(FeedbackPartial) && isClosed.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(FeedbackPartial)), null, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("section", { class: "ofp-band ofp-band--white ofp-vote-wrap" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" Decision")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, toDisplayString(isClosed.value ? "Voting is now closed" : "Cast your vote"), 1),
                    isClosed.value ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "ofp-band__lede"
                    }, " The voting period has ended. The votes cast are shown below. ")) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "ofp-band__lede"
                    }, " Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. "))
                  ]),
                  createVNode(PvVotePanel, {
                    proposal: proposal.value,
                    "my-vote": myVote.value,
                    onVote,
                    onSubmit
                  }, null, 8, ["proposal", "my-vote"]),
                  submitError.value && status.value === "open" ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "ofp-vote-error",
                    role: "alert"
                  }, toDisplayString(submitError.value), 1)) : createCommentVNode("", true)
                ]),
                status.value === "draft" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ofp-vote-cover",
                  "aria-hidden": "false"
                }, [
                  createVNode("div", { class: "ofp-vote-cover__card" }, [
                    createVNode("div", { class: "ofp-vote-cover__label" }, "Voting not yet open"),
                    createVNode("div", { class: "ofp-vote-cover__msg" }, "Voting opens " + toDisplayString(openedDisplay.value), 1)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              unref(FeedbackPartial) && isClosed.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(FeedbackPartial)), { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        proposal: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-9e3b8970${_scopeId}><span class="ofp-seam-label" data-v-9e3b8970${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>A consent that expires before it can be used</h2></div><div class="ofp-prose" data-v-9e3b8970${_scopeId}><p data-v-9e3b8970${_scopeId}> Every consent — whatever its type — carries an <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code>, the <code data-v-9e3b8970${_scopeId}>AEPushedAuthorizationRequests.AEConsentExpirationDateTime</code> field set by the TPP in the consent request, that fixes the date and time the consent will expire. Today the API Hub applies a <strong data-v-9e3b8970${_scopeId}>single</strong> rule to it at consent creation: it must be in the future. There is no minimum. A past value is rejected; everything else is accepted. The behaviour described here is the same for <strong data-v-9e3b8970${_scopeId}>all consent types</strong>; the figures below were measured on the Model Bank sandbox, and the lifecycle and validation they reveal are shared across every type. </p><p data-v-9e3b8970${_scopeId}> We tested this directly against the Model Bank sandbox. A consent set to expire <strong data-v-9e3b8970${_scopeId}>30 seconds</strong> in the future is accepted just as readily as one a year out: </p><div class="ofp-code" data-v-9e3b8970${_scopeId}><div class="ofp-code__label" data-v-9e3b8970${_scopeId}>Observed — PAR acceptance by ExpirationDateTime</div><pre class="ofp-code__pre" data-v-9e3b8970${_scopeId}>${ssrInterpolate(evidenceAccepted)}</pre></div><p data-v-9e3b8970${_scopeId}> That is the problem. Authorising a consent is not instant: the customer is redirected to the LFI, authenticates, reviews and approves the consent, is redirected back, and only then does the TPP exchange the code for a token and make its first call. That journey takes <strong data-v-9e3b8970${_scopeId}>minutes</strong>. A consent whose <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> falls inside that window is <strong data-v-9e3b8970${_scopeId}>dead on arrival</strong> — it lapses before anyone can finish using it. A one-second expiry is not a hypothetical: the platform accepts it. </p><p data-v-9e3b8970${_scopeId}> (Separately, the API Hub cleans up consents that are never authorised. That is independent of the <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> the TPP sets, and this proposal is solely about that value — the consent’s usable lifetime.) </p></div></div></section><section class="ofp-band ofp-band--white" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>A journey-based minimum, set to 15 minutes</h2></div><div class="ofp-prose" data-v-9e3b8970${_scopeId}><p data-v-9e3b8970${_scopeId}><strong data-v-9e3b8970${_scopeId}>Reject, at consent creation, any <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> less than 15 minutes in the future.</strong> The check sits alongside the two bounds already in place — “must be in the future” and the one-year maximum — and fails with the same kind of request-validation <code data-v-9e3b8970${_scopeId}>400</code> a past value gets today. Fifteen minutes is comfortably longer than the authorisation journey (redirect, customer authentication, approval, return, token exchange, and a first call), while still short enough that a TPP can keep a single-use consent tight. </p><p data-v-9e3b8970${_scopeId}> The minimum is anchored to the <strong data-v-9e3b8970${_scopeId}>journey</strong> — the time a customer needs to be redirected, authenticate, approve, and return — which is a stable, real-world constraint. Fifteen minutes clears it comfortably while still letting a TPP keep a single-use consent tight. </p><p data-v-9e3b8970${_scopeId}> This proposal changes validation only. It does not touch the consent status model or how the API Hub cleans up consents that are never authorised. A TPP sets <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> in the consent request for every type; the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Data Sharing API guide`);
                } else {
                  return [
                    createTextVNode("Data Sharing API guide")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` shows one example. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 03 · Authorisation expiration</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>The same floor applies to multi-authorisation payments</h2></div><div class="ofp-prose" data-v-9e3b8970${_scopeId}><p data-v-9e3b8970${_scopeId}> One consent type carries a <strong data-v-9e3b8970${_scopeId}>second</strong> expiry. When a TPP creates a Bank Service Initiation (payment) consent and sets <code data-v-9e3b8970${_scopeId}>IsSingleAuthorization</code> to <code data-v-9e3b8970${_scopeId}>false</code>, it also sets <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> in the Rich Authorization Request — the <code data-v-9e3b8970${_scopeId}>AEBankServiceInitiationRichAuthorizationRequests.AuthorizationExpirationDateTime</code> field — being the date and time by which every remaining authoriser must have acted for the consent to reach <code data-v-9e3b8970${_scopeId}>Authorized</code>. This field exists <strong data-v-9e3b8970${_scopeId}>only for payments</strong>: the <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> above is carried by every consent type, but this second deadline is specific to multi-authorisation, which is why it is treated separately here. </p><p data-v-9e3b8970${_scopeId}> Multi-authorisation covers payments that need more than one person to approve. The first customer goes through the OAuth flow and authorises the consent at the LFI as usual; the consent then stays in <code data-v-9e3b8970${_scopeId}>AwaitingAuthorization</code> while the subsequent authorisers each approve in turn. <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> is the clock on those subsequent authorisers — if the consent has not reached <code data-v-9e3b8970${_scopeId}>Authorized</code> by then, it will not proceed. See the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Multi-Authorization guide`);
                } else {
                  return [
                    createTextVNode("Multi-Authorization guide")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` for the full journey. </p><p data-v-9e3b8970${_scopeId}> The reasoning is essentially the same as for the consent expiry. Today the only bound on <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> is that it MUST NOT be after <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> — an upper bound. There is no lower bound, so a value seconds or minutes in the future is accepted, and the subsequent authorisers then have no realistic chance to act before it lapses. A multi-authorisation deadline set too tight is <strong data-v-9e3b8970${_scopeId}>dead on arrival</strong> for exactly the reason a consent expiry is. </p><p data-v-9e3b8970${_scopeId}><strong data-v-9e3b8970${_scopeId}>Apply the same 15-minute floor.</strong> Reject, at consent creation, any <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> less than 15 minutes in the future — the subsequent authorisers need at least as much time as a single customer does to complete their step. The existing upper bound (no later than <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code>) is unchanged. </p><div class="ofp-rules" data-v-9e3b8970${_scopeId}><div class="ofp-rules__label" data-v-9e3b8970${_scopeId}>Just to confirm — the final validation rules</div><ul class="ofp-rules__list" data-v-9e3b8970${_scopeId}><li data-v-9e3b8970${_scopeId}><code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> (consent expiry) — more than <strong data-v-9e3b8970${_scopeId}>15 minutes</strong> and no more than <strong data-v-9e3b8970${_scopeId}>one year</strong> in the future. </li><li data-v-9e3b8970${_scopeId}><code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> (multi-authorisation deadline, payments only) — more than <strong data-v-9e3b8970${_scopeId}>15 minutes</strong> in the future and <strong data-v-9e3b8970${_scopeId}>on or before</strong> the consent&#39;s <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code>. </li></ul></div></div></div></section><section class="ofp-band ofp-band--white" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 04 · Technical changes</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-9e3b8970${_scopeId}> Two new validation bounds and a documentation note — no new fields, endpoints, or schemas, and no change to the consent status model. </p></div><div class="ofp-changes" data-v-9e3b8970${_scopeId}><div class="ofp-change" data-v-9e3b8970${_scopeId}><div class="ofp-change__label" data-v-9e3b8970${_scopeId}>01 · Minimum on <code data-v-9e3b8970${_scopeId}>AEConsentExpirationDateTime</code></div><p data-v-9e3b8970${_scopeId}> At the API Hub, validate that <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> is at least <strong data-v-9e3b8970${_scopeId}>15 minutes</strong> in the future at consent creation (PAR), in addition to the existing “must be in the future” check and the documented one-year maximum. A value below the floor is rejected as a standard request-validation error — not silently clamped. This is a Hub-side validation rule; the field definition itself is unchanged. </p></div><div class="ofp-change" data-v-9e3b8970${_scopeId}><div class="ofp-change__label" data-v-9e3b8970${_scopeId}>02 · Minimum on <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code></div><p data-v-9e3b8970${_scopeId}> For Bank Service Initiation (payment) consents, validate that <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code> — when present, i.e. when <code data-v-9e3b8970${_scopeId}>IsSingleAuthorization</code> is <code data-v-9e3b8970${_scopeId}>false</code> — is at least <strong data-v-9e3b8970${_scopeId}>15 minutes</strong> in the future at consent creation, in addition to the existing upper bound that it MUST NOT be after <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code>. A value below the floor is rejected as a standard request-validation error. This applies only to payments, where the field exists. </p></div><div class="ofp-change" data-v-9e3b8970${_scopeId}><div class="ofp-change__label" data-v-9e3b8970${_scopeId}>03 · Documentation — the minimums</div><p data-v-9e3b8970${_scopeId}> Document the new 15-minute minimum on the consent lifecycle pages and the per-type API guides, alongside the existing “must be in the future” and one-year-maximum bounds, so TPPs size <code data-v-9e3b8970${_scopeId}>ExpirationDateTime</code> against the authorisation journey. Update the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Multi-Authorization guide`);
                } else {
                  return [
                    createTextVNode("Multi-Authorization guide")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` to state the matching floor on <code data-v-9e3b8970${_scopeId}>AuthorizationExpirationDateTime</code>. The consent-expiry rule applies to every consent type; the authorisation-expiry rule applies to payments only. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 05 · Pros</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>What a journey-based minimum buys</h2></div><ul class="ofp-pros" data-v-9e3b8970${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-9e3b8970${_scopeId}><span class="ofp-pros__glyph" data-v-9e3b8970${_scopeId}>✓</span><span data-v-9e3b8970${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-9e3b8970${_scopeId}><div class="ofp-band__inner" data-v-9e3b8970${_scopeId}><div class="ofp-band__head" data-v-9e3b8970${_scopeId}><div class="ofp-band__eyebrow" data-v-9e3b8970${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9e3b8970${_scopeId}></span> 06 · Cons</div><h2 class="ofp-band__title" data-v-9e3b8970${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-9e3b8970${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-9e3b8970${_scopeId}><span class="ofp-cons__glyph" data-v-9e3b8970${_scopeId}>×</span><span data-v-9e3b8970${_scopeId}>${ssrInterpolate(c)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section>`);
          } else {
            return [
              createVNode("section", { class: "ofp-band ofp-band--cream ofp-band--seam" }, [
                createVNode("span", { class: "ofp-seam-label" }, "The proposal"),
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 01 · Background")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A consent that expires before it can be used")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Every consent — whatever its type — carries an "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(", the "),
                      createVNode("code", null, "AEPushedAuthorizationRequests.AEConsentExpirationDateTime"),
                      createTextVNode(" field set by the TPP in the consent request, that fixes the date and time the consent will expire. Today the API Hub applies a "),
                      createVNode("strong", null, "single"),
                      createTextVNode(" rule to it at consent creation: it must be in the future. There is no minimum. A past value is rejected; everything else is accepted. The behaviour described here is the same for "),
                      createVNode("strong", null, "all consent types"),
                      createTextVNode("; the figures below were measured on the Model Bank sandbox, and the lifecycle and validation they reveal are shared across every type. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" We tested this directly against the Model Bank sandbox. A consent set to expire "),
                      createVNode("strong", null, "30 seconds"),
                      createTextVNode(" in the future is accepted just as readily as one a year out: ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Observed — PAR acceptance by ExpirationDateTime"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(evidenceAccepted))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" That is the problem. Authorising a consent is not instant: the customer is redirected to the LFI, authenticates, reviews and approves the consent, is redirected back, and only then does the TPP exchange the code for a token and make its first call. That journey takes "),
                      createVNode("strong", null, "minutes"),
                      createTextVNode(". A consent whose "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" falls inside that window is "),
                      createVNode("strong", null, "dead on arrival"),
                      createTextVNode(" — it lapses before anyone can finish using it. A one-second expiry is not a hypothetical: the platform accepts it. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" (Separately, the API Hub cleans up consents that are never authorised. That is independent of the "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" the TPP sets, and this proposal is solely about that value — the consent’s usable lifetime.) ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 02 · Recommendation")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A journey-based minimum, set to 15 minutes")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("Reject, at consent creation, any "),
                        createVNode("code", null, "ExpirationDateTime"),
                        createTextVNode(" less than 15 minutes in the future.")
                      ]),
                      createTextVNode(" The check sits alongside the two bounds already in place — “must be in the future” and the one-year maximum — and fails with the same kind of request-validation "),
                      createVNode("code", null, "400"),
                      createTextVNode(" a past value gets today. Fifteen minutes is comfortably longer than the authorisation journey (redirect, customer authentication, approval, return, token exchange, and a first call), while still short enough that a TPP can keep a single-use consent tight. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The minimum is anchored to the "),
                      createVNode("strong", null, "journey"),
                      createTextVNode(" — the time a customer needs to be redirected, authenticate, approve, and return — which is a stable, real-world constraint. Fifteen minutes clears it comfortably while still letting a TPP keep a single-use consent tight. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This proposal changes validation only. It does not touch the consent status model or how the API Hub cleans up consents that are never authorised. A TPP sets "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" in the consent request for every type; the "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, {
                        default: withCtx(() => [
                          createTextVNode("Data Sharing API guide")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" shows one example. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 03 · Authorisation expiration")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "The same floor applies to multi-authorisation payments")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" One consent type carries a "),
                      createVNode("strong", null, "second"),
                      createTextVNode(" expiry. When a TPP creates a Bank Service Initiation (payment) consent and sets "),
                      createVNode("code", null, "IsSingleAuthorization"),
                      createTextVNode(" to "),
                      createVNode("code", null, "false"),
                      createTextVNode(", it also sets "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" in the Rich Authorization Request — the "),
                      createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AuthorizationExpirationDateTime"),
                      createTextVNode(" field — being the date and time by which every remaining authoriser must have acted for the consent to reach "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(". This field exists "),
                      createVNode("strong", null, "only for payments"),
                      createTextVNode(": the "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" above is carried by every consent type, but this second deadline is specific to multi-authorisation, which is why it is treated separately here. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Multi-authorisation covers payments that need more than one person to approve. The first customer goes through the OAuth flow and authorises the consent at the LFI as usual; the consent then stays in "),
                      createVNode("code", null, "AwaitingAuthorization"),
                      createTextVNode(" while the subsequent authorisers each approve in turn. "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" is the clock on those subsequent authorisers — if the consent has not reached "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" by then, it will not proceed. See the "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization" }, {
                        default: withCtx(() => [
                          createTextVNode("Multi-Authorization guide")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" for the full journey. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The reasoning is essentially the same as for the consent expiry. Today the only bound on "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" is that it MUST NOT be after "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" — an upper bound. There is no lower bound, so a value seconds or minutes in the future is accepted, and the subsequent authorisers then have no realistic chance to act before it lapses. A multi-authorisation deadline set too tight is "),
                      createVNode("strong", null, "dead on arrival"),
                      createTextVNode(" for exactly the reason a consent expiry is. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Apply the same 15-minute floor."),
                      createTextVNode(" Reject, at consent creation, any "),
                      createVNode("code", null, "AuthorizationExpirationDateTime"),
                      createTextVNode(" less than 15 minutes in the future — the subsequent authorisers need at least as much time as a single customer does to complete their step. The existing upper bound (no later than "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(") is unchanged. ")
                    ]),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Just to confirm — the final validation rules"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode(" (consent expiry) — more than "),
                          createVNode("strong", null, "15 minutes"),
                          createTextVNode(" and no more than "),
                          createVNode("strong", null, "one year"),
                          createTextVNode(" in the future. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("code", null, "AuthorizationExpirationDateTime"),
                          createTextVNode(" (multi-authorisation deadline, payments only) — more than "),
                          createVNode("strong", null, "15 minutes"),
                          createTextVNode(" in the future and "),
                          createVNode("strong", null, "on or before"),
                          createTextVNode(" the consent's "),
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode(". ")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Technical changes")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What changes in the spec"),
                    createVNode("p", { class: "ofp-band__lede" }, " Two new validation bounds and a documentation note — no new fields, endpoints, or schemas, and no change to the consent status model. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, [
                        createTextVNode("01 · Minimum on "),
                        createVNode("code", null, "AEConsentExpirationDateTime")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" At the API Hub, validate that "),
                        createVNode("code", null, "ExpirationDateTime"),
                        createTextVNode(" is at least "),
                        createVNode("strong", null, "15 minutes"),
                        createTextVNode(" in the future at consent creation (PAR), in addition to the existing “must be in the future” check and the documented one-year maximum. A value below the floor is rejected as a standard request-validation error — not silently clamped. This is a Hub-side validation rule; the field definition itself is unchanged. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, [
                        createTextVNode("02 · Minimum on "),
                        createVNode("code", null, "AuthorizationExpirationDateTime")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" For Bank Service Initiation (payment) consents, validate that "),
                        createVNode("code", null, "AuthorizationExpirationDateTime"),
                        createTextVNode(" — when present, i.e. when "),
                        createVNode("code", null, "IsSingleAuthorization"),
                        createTextVNode(" is "),
                        createVNode("code", null, "false"),
                        createTextVNode(" — is at least "),
                        createVNode("strong", null, "15 minutes"),
                        createTextVNode(" in the future at consent creation, in addition to the existing upper bound that it MUST NOT be after "),
                        createVNode("code", null, "ExpirationDateTime"),
                        createTextVNode(". A value below the floor is rejected as a standard request-validation error. This applies only to payments, where the field exists. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Documentation — the minimums"),
                      createVNode("p", null, [
                        createTextVNode(" Document the new 15-minute minimum on the consent lifecycle pages and the per-type API guides, alongside the existing “must be in the future” and one-year-maximum bounds, so TPPs size "),
                        createVNode("code", null, "ExpirationDateTime"),
                        createTextVNode(" against the authorisation journey. Update the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization" }, {
                          default: withCtx(() => [
                            createTextVNode("Multi-Authorization guide")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" to state the matching floor on "),
                        createVNode("code", null, "AuthorizationExpirationDateTime"),
                        createTextVNode(". The consent-expiry rule applies to every consent type; the authorisation-expiry rule applies to payments only. ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 05 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What a journey-based minimum buys")
                  ]),
                  createVNode("ul", { class: "ofp-pros" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(pros, (p, i) => {
                      return createVNode("li", {
                        key: i,
                        class: "ofp-pros__item"
                      }, [
                        createVNode("span", { class: "ofp-pros__glyph" }, "✓"),
                        createVNode("span", null, toDisplayString(p), 1)
                      ]);
                    }), 64))
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Cons")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What it costs")
                  ]),
                  createVNode("ul", { class: "ofp-cons" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(cons, (c, i) => {
                      return createVNode("li", {
                        key: i,
                        class: "ofp-cons__item"
                      }, [
                        createVNode("span", { class: "ofp-cons__glyph" }, "×"),
                        createVNode("span", null, toDisplayString(c), 1)
                      ]);
                    }), 64))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-004/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e3b8970"]]);
export {
  index as default
};
