import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, unref, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-OrQM97fB.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-CQUj3a-B.js";
import { P as PvStatusPill } from "./PvStatusPill-L5QlvutR.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-DW7wSzQt.js";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "OFP-014 · Define date-time semantics once, in a shared component";
const OG_DESCRIPTION = "Every date-time field in the specifications repeats the same description, and none of them says the value is an instant in time. That omission lets an implementation read a UTC value as local time and still consider itself conformant. This proposal introduces a shared AEDateTime component that states the semantics once, and has every date-time field reference it.";
const currentYaml = `# Today — one of ~20 near-identical definitions across the specifications

    AEConsentExpirationDateTime:
      description: |2-
            Specified date and time the consent will expire.

            All dates in the JSON payloads are represented in ISO 8601 date-time format.
            All date-time fields in responses must include the timezone. An example is :2023-04-05T10:43:07+00:00
      type: string
      format: date-time

# It describes the ENCODING. It never says the value identifies an INSTANT, and
# it never says that two encodings of the same instant are equivalent. An
# implementation that reads the date and time components as local time is not
# contradicted by anything above.`;
const sharedYaml = `    AEDateTime:
      title: AEDateTime
      description: |
        An instant in time, per ISO 8601 / RFC 3339, with a mandatory offset.

        Recipients MUST apply the offset, and MUST NOT read the date and time
        components as local time. Encodings of the same instant are equivalent and
        MUST behave identically: \`2027-07-22T00:00:00Z\` and \`2027-07-22T04:00:00+04:00\`
        are the same value.

        Producers SHOULD emit UTC (\`Z\` or \`+00:00\`), and MUST NOT use \`-00:00\`.
        Fractional seconds are optional.
      type: string
      format: date-time
      example: "2027-07-22T00:00:00Z"`;
const fieldYaml = `    AEConsentExpirationDateTime:
      allOf:
        - $ref: '#/components/schemas/AEDateTime'
        - description: Specified date and time the consent will expire.

# type and format are unchanged, so the wire format and schema validation are
# identical before and after. Every date-time field in every specification takes
# the same treatment, keeping its own field-specific description.`;
const patternYaml = `# Enforces the MUST NOT on -00:00, while permitting every other offset.
pattern: '^d{4}-d{2}-d{2}Td{2}:d{2}:d{2}(.d+)?(Z|+d{2}:d{2}|-(?:0[1-9]|1[0-2]):d{2})$'

# Verified behaviour:
#
#   2027-07-22T00:00:00Z              pass
#   2027-07-22T00:00:00.000Z          pass
#   2027-07-22T00:00:00+00:00         pass
#   2027-07-22T00:00:00.000+00:00     pass
#   2027-07-22T00:00:00.123456Z       pass
#   2027-07-22T04:00:00+04:00         pass
#   2027-07-22T00:00:00-05:00         pass
#   2027-07-22T00:00:00-00:00         REJECT
#   2027-07-22T00:00:00               REJECT
#   2027-07-22 00:00:00Z              REJECT
#   22/07/2027 00:00:00               REJECT`;
const strictYaml = `    AEDateTime:
      title: AEDateTime
      description: |
        An instant in time, per ISO 8601 / RFC 3339, expressed in UTC.

        Recipients MUST apply the offset, and MUST NOT read the date and time
        components as local time.

        Producers MUST emit UTC, using either \`Z\` or \`+00:00\`.
        Fractional seconds are optional.
      type: string
      format: date-time
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|\\+00:00)$'
      example: "2027-07-22T00:00:00Z"`;
const strictExamples = `# Accepted
2027-07-22T00:00:00Z              # UTC, whole seconds
2027-07-22T00:00:00.000Z          # UTC, milliseconds
2027-07-22T00:00:00.123456Z       # UTC, any fractional precision
2027-07-22T00:00:00+00:00         # the zero offset written out in full
2027-07-22T00:00:00.000+00:00     # zero offset, milliseconds

# No longer valid — but conformant under V2.1, and in use today
2027-07-22T04:00:00+04:00         # Gulf Standard Time
2027-07-22T00:00:00-05:00         # any other non-UTC offset

# Invalid today, and still invalid under this pattern
2027-07-22T00:00:00-00:00         # negative zero offset
2027-07-22T00:00:00               # no offset at all
2027-07-22 00:00:00Z              # space instead of T
22/07/2027 00:00:00               # not ISO 8601`;
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
      id: "OFP-014",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "16 Sep 2026",
      closes: "7 Oct 2026",
      priority: "medium",
      version: "V2.2"
    };
    const questions = [
      {
        who: "LFIs",
        q: "Does your implementation treat 2027-07-22T00:00:00Z and 2027-07-22T04:00:00+04:00 as the same moment today — and if not, what is involved in correcting it?",
        why: "These two strings are the same instant. The clarification makes any difference in behaviour between them a conformance failure, and it is the test certification would apply. The answer tells us whether this is a documentation change the ecosystem absorbs quietly or one that requires a remediation window — and it is worth running before voting, because it takes minutes and does not need any instrumentation."
      },
      {
        who: "TPPs and LFIs",
        q: "Should V2.2 also carry a pattern that prohibits -00:00 while continuing to permit non-UTC offsets, or should the schema stay unconstrained until a major version requires UTC outright?",
        why: "The pattern in section 04 makes the MUST NOT on -00:00 enforceable at close to zero migration cost, since almost nobody emits it deliberately. Requiring UTC by schema is breaking for every participant currently sending a non-UTC offset — all of whom are conformant today. This asks whether the first is worth landing now, rather than waiting for the second."
      },
      {
        who: "TPPs and LFIs",
        q: "Should V2.2 require UTC outright by schema — so that +04:00 and every other non-UTC offset is rejected — or should that wait for a major version?",
        why: "Section 06 sets out exactly what this would look like and which strings would stop being valid. It is the enforceable end state, and it would remove the equivalence class entirely rather than asking every participant to handle it. It is also breaking: any producer emitting a non-UTC offset is conformant today and would be rejected on the day it lands. This proposal defers it — the question asks whether the ecosystem would rather take it at V2.2 and absorb the migration in one step."
      }
    ];
    const pros = [
      'It states the semantics that are currently missing. The existing text describes the encoding — "ISO 8601 date-time format", "must include the timezone" — but never says the value identifies an instant, which is the one sentence that makes ignoring the offset non-conformant.',
      "It makes the defect testable. The equivalence example is itself a certification case: 2027-07-22T00:00:00Z and 2027-07-22T04:00:00+04:00 are the same moment, and any implementation that behaves differently for the two has a defect that can be demonstrated in a single call.",
      "It is not a breaking change. type and format are unchanged, so the change is wire-identical and validation-identical. Every implementation conformant today stays conformant, and no participant is required to do anything on a date.",
      "It collapses roughly twenty duplicated descriptions into one component. Today the same paragraph is restated per schema with minor variations, so it drifts and any correction has to be made in twenty places.",
      "It costs the central platform nothing. No API Hub behaviour changes, no normalisation is introduced into the request path, and no new validation is added at V2.2 — the entire change is specification text.",
      "It addresses a failure mode that does not announce itself. An implementation that ignores the offset is wrong by four hours in the UAE, which is invisible at a thirty-day horizon and severe at a one-hour one — so it reaches production and surfaces later as an unreproducible complaint."
    ];
    const cons = [
      "A description is not enforcement. A non-conforming implementation still passes schema validation at V2.2, because the constraint lives in prose. Only functional certification would catch it, and only if the case is added there.",
      "It touches every specification. The edit is mechanical but wide — roughly twenty schemas across data sharing, service initiation, confirmation of payee, insurance and the consent specs — and each site needs checking rather than a blind replace.",
      "The allOf + $ref construction makes each field three lines where it was two, and some code generators flatten allOf poorly, producing a less readable model than the inline description did.",
      "It does not repair implementations already in production. Participants who read the offset incorrectly today must still change their code; the clarification establishes that they are wrong, it does not fix them.",
      "It defers the constraint that would actually prevent the problem. Requiring UTC by schema is the enforceable version, and this proposal explicitly leaves that to a major version — so the ambiguity remains legal in the meantime."
    ];
    const { myVotes, setVote, submitVote, hydrate, loadOne, loadMe, metaById } = useProposals();
    const apiMeta = computed(() => metaById.value[meta.id]);
    const closesIn = ref("");
    const status = ref("draft");
    const priority = ref(meta.priority);
    const openedDisplay = ref(meta.opened);
    const closesDisplay = ref(meta.closes);
    const versionDisplay = ref(meta.version);
    const priorityLabel = computed(() => {
      var _a2;
      return ((_a2 = PRIORITY[priority.value]) == null ? void 0 : _a2.label) ?? PRIORITY.medium.label;
    });
    const isClosed = computed(() => status.value === "closed");
    const outcomeMods = /* @__PURE__ */ Object.assign({});
    const feedbackMods = /* @__PURE__ */ Object.assign({});
    const OutcomePartial = ((_a = Object.values(outcomeMods)[0]) == null ? void 0 : _a.default) ?? null;
    const FeedbackPartial = ((_b = Object.values(feedbackMods)[0]) == null ? void 0 : _b.default) ?? null;
    const showTabs = computed(() => isClosed.value && !!OutcomePartial);
    const proposal = computed(() => {
      var _a2;
      return {
        id: meta.id,
        title: "Define date-time semantics once, in a shared component",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-6fb6a883><section class="ofp-hero" data-v-6fb6a883><div class="ofp-hero__inner" data-v-6fb6a883>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-6fb6a883${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-6fb6a883><span class="ofp__id" data-v-6fb6a883>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-6fb6a883></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-6fb6a883>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-6fb6a883>Define date-time semantics once, in a shared component</h1><p class="ofp__summary" data-v-6fb6a883> Every date-time field in the specifications carries its own copy of the same description, and not one of them says that the value identifies <strong data-v-6fb6a883>an instant in time</strong>. The text describes the encoding and stops there — so an implementation that reads <code data-v-6fb6a883>2027-07-22T00:00:00Z</code> as local midnight is contradicted by nothing. In the UAE that is an error of <strong data-v-6fb6a883>four hours</strong>, invisible at a thirty-day horizon and fatal at a one-hour one. This proposal introduces a shared <strong data-v-6fb6a883><code data-v-6fb6a883>AEDateTime</code></strong> component that states the semantics once, and has every date-time field reference it. </p><div class="ofp__strip" data-v-6fb6a883><div class="ofp__strip-item" data-v-6fb6a883><div class="ofp__strip-key" data-v-6fb6a883>Proposed by</div><div class="ofp__strip-val" data-v-6fb6a883>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-6fb6a883><div class="ofp__strip-key" data-v-6fb6a883>Author</div><div class="ofp__strip-val" data-v-6fb6a883>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-6fb6a883><div class="ofp__strip-key" data-v-6fb6a883>Target</div><div class="ofp__strip-val" data-v-6fb6a883>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-6fb6a883><div class="ofp__strip-key" data-v-6fb6a883>Opened</div><div class="ofp__strip-val" data-v-6fb6a883>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-6fb6a883><div class="ofp__strip-key" data-v-6fb6a883>Closes</div><div class="ofp__strip-val" data-v-6fb6a883>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. <strong data-v-6fb6a883${_scopeId}>Three questions are attached to this vote</strong> — set out in section 07 below. The first takes minutes to answer and is worth running before you vote; the second decides how far V2.2 goes. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-6fb6a883${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-6fb6a883${_scopeId}><div class="ofp-vote-cover__card" data-v-6fb6a883${_scopeId}><div class="ofp-vote-cover__label" data-v-6fb6a883${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-6fb6a883${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                    }, [
                      createTextVNode(" Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. "),
                      createVNode("strong", null, "Three questions are attached to this vote"),
                      createTextVNode(" — set out in section 07 below. The first takes minutes to answer and is worth running before you vote; the second decides how far V2.2 goes. ")
                    ]))
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-6fb6a883${_scopeId}><span class="ofp-seam-label" data-v-6fb6a883${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>The specification describes the encoding, not the meaning</h2></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><p data-v-6fb6a883${_scopeId}> A date-time field appears in almost every payload in the standard — <code data-v-6fb6a883${_scopeId}>ExpirationDateTime</code>, <code data-v-6fb6a883${_scopeId}>CreationDateTime</code>, <code data-v-6fb6a883${_scopeId}>TransactionDateTime</code>, <code data-v-6fb6a883${_scopeId}>BookingDateTime</code>, <code data-v-6fb6a883${_scopeId}>ValueDateTime</code>, and many more. Each is defined as <code data-v-6fb6a883${_scopeId}>type: string</code>, <code data-v-6fb6a883${_scopeId}>format: date-time</code>, accompanied by a short description which is duplicated, with minor variations, across approximately twenty schema definitions. </p><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>Today — the definition, and what it leaves unsaid</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(currentYaml)}</pre></div><p data-v-6fb6a883${_scopeId}> Nowhere does the standard say that a date-time identifies an instant, or that two encodings of the same instant are equivalent and must behave identically. A developer who reads the date and time components and ignores the offset has not contradicted the specification. They have simply read it literally. </p><div class="ofp-rules" data-v-6fb6a883${_scopeId}><div class="ofp-rules__label" data-v-6fb6a883${_scopeId}>Why this is worth a proposal rather than a bug report</div><ul class="ofp-rules__list" data-v-6fb6a883${_scopeId}><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>The error is four hours, in the UAE, in the expiring direction.</strong> A value of <code data-v-6fb6a883${_scopeId}>2027-07-22T00:00:00Z</code> is <code data-v-6fb6a883${_scopeId}>04:00</code> Gulf time. Read as local, it resolves four hours early. On a consent with a thirty-day expiry nobody notices; on one set an hour ahead the consent is already expired when it arrives. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Nothing in the ecosystem catches it.</strong> The value is well formed, so schema validation passes. The API Hub stores and returns it unchanged. The receiving system records a time that is simply wrong, and no error is raised at any hop. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>It has already happened.</strong> This proposal follows a live integration in which a correctly-formed UTC consent expiry was interpreted as local time, causing short-window consents to fail on arrival. The reported symptom — “the LFI receives it without an offset” — was not what the wire showed. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Every participant carries the cost.</strong> Because the standard permits a range of encodings, each participant must implement normalisation for every counterparty it talks to. That is the same logic written many times over, and each implementation is an opportunity to get it wrong in a way nothing will flag. </li></ul></div></div></div></section><section class="ofp-band ofp-band--white" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>Say it once, in a component every field references</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> Introduce a single shared <code data-v-6fb6a883${_scopeId}>AEDateTime</code> schema carrying the semantics, and replace the duplicated description on every date-time field with a reference to it. The rules become normative, stated in one place, and correctable in one place. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><div class="ofp-rules" data-v-6fb6a883${_scopeId}><div class="ofp-rules__label" data-v-6fb6a883${_scopeId}>What the component establishes</div><ul class="ofp-rules__list" data-v-6fb6a883${_scopeId}><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>A date-time is an instant.</strong> The offset is part of the value. Recipients MUST apply it and MUST NOT read the date and time components as local time. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Equivalent encodings MUST behave identically.</strong><code data-v-6fb6a883${_scopeId}>2027-07-22T00:00:00Z</code> and <code data-v-6fb6a883${_scopeId}>2027-07-22T04:00:00+04:00</code> are the same value. This is the sentence that turns the defect above into a conformance failure. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Producers SHOULD emit UTC</strong> — <code data-v-6fb6a883${_scopeId}>Z</code> or <code data-v-6fb6a883${_scopeId}>+00:00</code> — which signals the direction of travel without requiring anyone to move at V2.2. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}><code data-v-6fb6a883${_scopeId}>-00:00</code> MUST NOT be used.</strong> ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it “local offset unknown” semantics, which is not what any producer in this ecosystem means. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Fractional seconds are optional</strong>, at unspecified precision — so recipients must accept their presence or absence, and must not compare these values as strings. </li></ul></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>One new schema, and a reference from every date-time field</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> Taking <code data-v-6fb6a883${_scopeId}>AEConsentExpirationDateTime</code> as the worked example. The same treatment applies to every date-time field across every specification. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>The shared component — added once</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(sharedYaml)}</pre></div><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>Each field — reference plus its own description</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(fieldYaml)}</pre></div><p data-v-6fb6a883${_scopeId}> A short normative section is added to each specification’s <code data-v-6fb6a883${_scopeId}>info.description</code> as well, so the rule is discoverable without reading a schema and certification has a single place to point at. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 04 · Enforcement</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>Whether to add a pattern</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> As drafted, the rules above are prose: a non-conforming value still passes schema validation. A <code data-v-6fb6a883${_scopeId}>pattern</code> would make one of them enforceable, at very little cost — but it would not reach the behaviour this proposal is chiefly concerned with. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>The candidate pattern, and its verified behaviour</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(patternYaml)}</pre></div><div class="ofp-rules" data-v-6fb6a883${_scopeId}><div class="ofp-rules__label" data-v-6fb6a883${_scopeId}>The distinction that matters</div><ul class="ofp-rules__list" data-v-6fb6a883${_scopeId}><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>It enforces only the <code data-v-6fb6a883${_scopeId}>-00:00</code> prohibition.</strong> Every other offset continues to validate, so the only producers affected are those emitting a negative zero offset — which ISO 8601 already prohibits and which essentially nobody emits deliberately. It converts a MUST NOT from advice into a rule at close to zero migration cost. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>Requiring UTC by schema is a different proposition, and is breaking.</strong> Any participant sending <code data-v-6fb6a883${_scopeId}>+04:00</code> today is conformant today and would be rejected the day it lands. That is a major-version change with a runway, not something to carry along with a clarification. </li><li data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>A pattern does not fix the actual defect.</strong> An implementation that ignores the offset on a perfectly valid <code data-v-6fb6a883${_scopeId}>Z</code> value passes it. Enforcement addresses what is <em data-v-6fb6a883${_scopeId}>sent</em>; the clarification in section 02 addresses how it is <em data-v-6fb6a883${_scopeId}>read</em>, and only certification tests the latter. </li></ul></div><p data-v-6fb6a883${_scopeId}> The recommendation is to signal UTC as a <code data-v-6fb6a883${_scopeId}>SHOULD</code> at V2.2, decide this pattern on the ecosystem’s answer to question 02, and defer any schema-enforced UTC requirement to a major version, with the runway sized by measured exposure rather than by assumption. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 05 · Publication</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>A knowledge base article published alongside</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> The specification states the rule; the knowledge base explains how to satisfy it. An article — <em data-v-6fb6a883${_scopeId}>Date &amp; Time Handling Across the Standard</em> — publishes with this change. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><div class="ed-tpp-grid" data-v-6fb6a883${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/proposals/ofp-014/knowledge-base-article",
              class: "ed-tpp-card",
              style: { "--card-color": "#0043A6" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ed-tpp-card__top" style="${ssrRenderStyle({ background: "#0043A6" })}" data-v-6fb6a883${_scopeId2}></span><div class="ed-tpp-card__meta" data-v-6fb6a883${_scopeId2}><span class="ed-tpp-card__cat" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-6fb6a883${_scopeId2}>Draft article</span></div><h3 class="ed-tpp-card__title" data-v-6fb6a883${_scopeId2}>Date &amp; Time Handling Across the Standard</h3><p class="ed-tpp-card__desc" data-v-6fb6a883${_scopeId2}> The guidance in full — the model, what TPPs send and read, what LFIs must apply, a two-minute self-test, and a table of test vectors. </p><div class="ed-tpp-card__tags" data-v-6fb6a883${_scopeId2}><!--[-->`);
                  ssrRenderList(["Data Sharing", "Consents", "Ozone Connect"], (tag) => {
                    _push3(`<span class="ed-tpp-card__tag" style="${ssrRenderStyle({ background: "rgba(0, 67, 166, 0.10)", color: "#0043A6" })}" data-v-6fb6a883${_scopeId2}>${ssrInterpolate(tag)}</span>`);
                  });
                  _push3(`<!--]--></div><div class="ed-tpp-card__foot" data-v-6fb6a883${_scopeId2}><span class="ed-tpp-card__cta" data-v-6fb6a883${_scopeId2}>Open article</span><span class="ed-tpp-card__arrow" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-6fb6a883${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "ed-tpp-card__top",
                      style: { background: "#0043A6" }
                    }),
                    createVNode("div", { class: "ed-tpp-card__meta" }, [
                      createVNode("span", {
                        class: "ed-tpp-card__cat",
                        style: { color: "#0043A6" }
                      }, "Draft article")
                    ]),
                    createVNode("h3", { class: "ed-tpp-card__title" }, "Date & Time Handling Across the Standard"),
                    createVNode("p", { class: "ed-tpp-card__desc" }, " The guidance in full — the model, what TPPs send and read, what LFIs must apply, a two-minute self-test, and a table of test vectors. "),
                    createVNode("div", { class: "ed-tpp-card__tags" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(["Data Sharing", "Consents", "Ozone Connect"], (tag) => {
                        return createVNode("span", {
                          key: tag,
                          class: "ed-tpp-card__tag",
                          style: { background: "rgba(0, 67, 166, 0.10)", color: "#0043A6" }
                        }, toDisplayString(tag), 1);
                      }), 64))
                    ]),
                    createVNode("div", { class: "ed-tpp-card__foot" }, [
                      createVNode("span", { class: "ed-tpp-card__cta" }, "Open article"),
                      createVNode("span", {
                        class: "ed-tpp-card__arrow",
                        style: { color: "#0043A6" }
                      }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></section><section class="ofp-band ofp-band--white" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 06 · Requiring UTC</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>Constraining the format so that UTC is required outright</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> The stricter option: rather than recommending UTC, require it by schema. This proposal does not include it — but it is where the standard should eventually arrive, and it is put to the ecosystem as question 03 rather than settled in advance. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><p data-v-6fb6a883${_scopeId}> The change is a single added <code data-v-6fb6a883${_scopeId}>pattern</code> on the shared component. Nothing else about <code data-v-6fb6a883${_scopeId}>AEDateTime</code> moves, and no field definition changes — which is the advantage of having consolidated them in the first place. </p><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>AEDateTime, with UTC required</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(strictYaml)}</pre></div><div class="ofp-code" data-v-6fb6a883${_scopeId}><div class="ofp-code__label" data-v-6fb6a883${_scopeId}>Which strings the pattern admits</div><pre class="ofp-code__pre" data-v-6fb6a883${_scopeId}>${ssrInterpolate(strictExamples)}</pre></div><p data-v-6fb6a883${_scopeId}> The recommendation remains to signal UTC as a <code data-v-6fb6a883${_scopeId}>SHOULD</code> at V2.2 and require it at the next major version, with the runway set by measured exposure. If the answers to question 03 show the ecosystem would rather absorb the change in one step, that recommendation should be revisited before V2.2 is finalised. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 07 · Questions</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>Three questions, asked with the vote</h2><p class="ofp-band__lede" data-v-6fb6a883${_scopeId}> These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees both. The first is worth running <em data-v-6fb6a883${_scopeId}>before</em> you vote: it takes minutes and needs no instrumentation. </p></div><div class="ofp-prose" data-v-6fb6a883${_scopeId}><div class="ofp-changes" data-v-6fb6a883${_scopeId}><!--[-->`);
            ssrRenderList(questions, (item, i) => {
              _push2(`<div class="ofp-change" data-v-6fb6a883${_scopeId}><div class="ofp-change__label" data-v-6fb6a883${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))} · ${ssrInterpolate(item.who)}</div><p data-v-6fb6a883${_scopeId}><strong data-v-6fb6a883${_scopeId}>${ssrInterpolate(item.q)}</strong></p><p data-v-6fb6a883${_scopeId}>${ssrInterpolate(item.why)}</p></div>`);
            });
            _push2(`<!--]--></div></div></div></section><section class="ofp-band ofp-band--white" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 08 · Pros</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>What the component buys</h2></div><ul class="ofp-pros" data-v-6fb6a883${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-6fb6a883${_scopeId}><span class="ofp-pros__glyph" data-v-6fb6a883${_scopeId}>✓</span><span data-v-6fb6a883${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-6fb6a883${_scopeId}><div class="ofp-band__inner" data-v-6fb6a883${_scopeId}><div class="ofp-band__head" data-v-6fb6a883${_scopeId}><div class="ofp-band__eyebrow" data-v-6fb6a883${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-6fb6a883${_scopeId}></span> 09 · Cons</div><h2 class="ofp-band__title" data-v-6fb6a883${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-6fb6a883${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-6fb6a883${_scopeId}><span class="ofp-cons__glyph" data-v-6fb6a883${_scopeId}>×</span><span data-v-6fb6a883${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "The specification describes the encoding, not the meaning")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" A date-time field appears in almost every payload in the standard — "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(", "),
                      createVNode("code", null, "CreationDateTime"),
                      createTextVNode(", "),
                      createVNode("code", null, "TransactionDateTime"),
                      createTextVNode(", "),
                      createVNode("code", null, "BookingDateTime"),
                      createTextVNode(", "),
                      createVNode("code", null, "ValueDateTime"),
                      createTextVNode(", and many more. Each is defined as "),
                      createVNode("code", null, "type: string"),
                      createTextVNode(", "),
                      createVNode("code", null, "format: date-time"),
                      createTextVNode(", accompanied by a short description which is duplicated, with minor variations, across approximately twenty schema definitions. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the definition, and what it leaves unsaid"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(currentYaml))
                    ]),
                    createVNode("p", null, " Nowhere does the standard say that a date-time identifies an instant, or that two encodings of the same instant are equivalent and must behave identically. A developer who reads the date and time components and ignores the offset has not contradicted the specification. They have simply read it literally. "),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Why this is worth a proposal rather than a bug report"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "The error is four hours, in the UAE, in the expiring direction."),
                          createTextVNode(" A value of "),
                          createVNode("code", null, "2027-07-22T00:00:00Z"),
                          createTextVNode(" is "),
                          createVNode("code", null, "04:00"),
                          createTextVNode(" Gulf time. Read as local, it resolves four hours early. On a consent with a thirty-day expiry nobody notices; on one set an hour ahead the consent is already expired when it arrives. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Nothing in the ecosystem catches it."),
                          createTextVNode(" The value is well formed, so schema validation passes. The API Hub stores and returns it unchanged. The receiving system records a time that is simply wrong, and no error is raised at any hop. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "It has already happened."),
                          createTextVNode(" This proposal follows a live integration in which a correctly-formed UTC consent expiry was interpreted as local time, causing short-window consents to fail on arrival. The reported symptom — “the LFI receives it without an offset” — was not what the wire showed. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Every participant carries the cost."),
                          createTextVNode(" Because the standard permits a range of encodings, each participant must implement normalisation for every counterparty it talks to. That is the same logic written many times over, and each implementation is an opportunity to get it wrong in a way nothing will flag. ")
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
                      createTextVNode(" 02 · Recommendation")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Say it once, in a component every field references"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" Introduce a single shared "),
                      createVNode("code", null, "AEDateTime"),
                      createTextVNode(" schema carrying the semantics, and replace the duplicated description on every date-time field with a reference to it. The rules become normative, stated in one place, and correctable in one place. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "What the component establishes"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "A date-time is an instant."),
                          createTextVNode(" The offset is part of the value. Recipients MUST apply it and MUST NOT read the date and time components as local time. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Equivalent encodings MUST behave identically."),
                          createVNode("code", null, "2027-07-22T00:00:00Z"),
                          createTextVNode(" and "),
                          createVNode("code", null, "2027-07-22T04:00:00+04:00"),
                          createTextVNode(" are the same value. This is the sentence that turns the defect above into a conformance failure. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Producers SHOULD emit UTC"),
                          createTextVNode(" — "),
                          createVNode("code", null, "Z"),
                          createTextVNode(" or "),
                          createVNode("code", null, "+00:00"),
                          createTextVNode(" — which signals the direction of travel without requiring anyone to move at V2.2. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "-00:00"),
                            createTextVNode(" MUST NOT be used.")
                          ]),
                          createTextVNode(" ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it “local offset unknown” semantics, which is not what any producer in this ecosystem means. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Fractional seconds are optional"),
                          createTextVNode(", at unspecified precision — so recipients must accept their presence or absence, and must not compare these values as strings. ")
                        ])
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
                      createTextVNode(" 03 · Technical changes")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "One new schema, and a reference from every date-time field"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" Taking "),
                      createVNode("code", null, "AEConsentExpirationDateTime"),
                      createTextVNode(" as the worked example. The same treatment applies to every date-time field across every specification. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "The shared component — added once"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(sharedYaml))
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Each field — reference plus its own description"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(fieldYaml))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A short normative section is added to each specification’s "),
                      createVNode("code", null, "info.description"),
                      createTextVNode(" as well, so the rule is discoverable without reading a schema and certification has a single place to point at. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Enforcement")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Whether to add a pattern"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" As drafted, the rules above are prose: a non-conforming value still passes schema validation. A "),
                      createVNode("code", null, "pattern"),
                      createTextVNode(" would make one of them enforceable, at very little cost — but it would not reach the behaviour this proposal is chiefly concerned with. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "The candidate pattern, and its verified behaviour"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(patternYaml))
                    ]),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "The distinction that matters"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("It enforces only the "),
                            createVNode("code", null, "-00:00"),
                            createTextVNode(" prohibition.")
                          ]),
                          createTextVNode(" Every other offset continues to validate, so the only producers affected are those emitting a negative zero offset — which ISO 8601 already prohibits and which essentially nobody emits deliberately. It converts a MUST NOT from advice into a rule at close to zero migration cost. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Requiring UTC by schema is a different proposition, and is breaking."),
                          createTextVNode(" Any participant sending "),
                          createVNode("code", null, "+04:00"),
                          createTextVNode(" today is conformant today and would be rejected the day it lands. That is a major-version change with a runway, not something to carry along with a clarification. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "A pattern does not fix the actual defect."),
                          createTextVNode(" An implementation that ignores the offset on a perfectly valid "),
                          createVNode("code", null, "Z"),
                          createTextVNode(" value passes it. Enforcement addresses what is "),
                          createVNode("em", null, "sent"),
                          createTextVNode("; the clarification in section 02 addresses how it is "),
                          createVNode("em", null, "read"),
                          createTextVNode(", and only certification tests the latter. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The recommendation is to signal UTC as a "),
                      createVNode("code", null, "SHOULD"),
                      createTextVNode(" at V2.2, decide this pattern on the ecosystem’s answer to question 02, and defer any schema-enforced UTC requirement to a major version, with the runway sized by measured exposure rather than by assumption. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 05 · Publication")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A knowledge base article published alongside"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" The specification states the rule; the knowledge base explains how to satisfy it. An article — "),
                      createVNode("em", null, "Date & Time Handling Across the Standard"),
                      createTextVNode(" — publishes with this change. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ed-tpp-grid" }, [
                      createVNode(_component_RouterLink, {
                        to: "/proposals/ofp-014/knowledge-base-article",
                        class: "ed-tpp-card",
                        style: { "--card-color": "#0043A6" }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            class: "ed-tpp-card__top",
                            style: { background: "#0043A6" }
                          }),
                          createVNode("div", { class: "ed-tpp-card__meta" }, [
                            createVNode("span", {
                              class: "ed-tpp-card__cat",
                              style: { color: "#0043A6" }
                            }, "Draft article")
                          ]),
                          createVNode("h3", { class: "ed-tpp-card__title" }, "Date & Time Handling Across the Standard"),
                          createVNode("p", { class: "ed-tpp-card__desc" }, " The guidance in full — the model, what TPPs send and read, what LFIs must apply, a two-minute self-test, and a table of test vectors. "),
                          createVNode("div", { class: "ed-tpp-card__tags" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(["Data Sharing", "Consents", "Ozone Connect"], (tag) => {
                              return createVNode("span", {
                                key: tag,
                                class: "ed-tpp-card__tag",
                                style: { background: "rgba(0, 67, 166, 0.10)", color: "#0043A6" }
                              }, toDisplayString(tag), 1);
                            }), 64))
                          ]),
                          createVNode("div", { class: "ed-tpp-card__foot" }, [
                            createVNode("span", { class: "ed-tpp-card__cta" }, "Open article"),
                            createVNode("span", {
                              class: "ed-tpp-card__arrow",
                              style: { color: "#0043A6" }
                            }, "→")
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Requiring UTC")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Constraining the format so that UTC is required outright"),
                    createVNode("p", { class: "ofp-band__lede" }, " The stricter option: rather than recommending UTC, require it by schema. This proposal does not include it — but it is where the standard should eventually arrive, and it is put to the ecosystem as question 03 rather than settled in advance. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" The change is a single added "),
                      createVNode("code", null, "pattern"),
                      createTextVNode(" on the shared component. Nothing else about "),
                      createVNode("code", null, "AEDateTime"),
                      createTextVNode(" moves, and no field definition changes — which is the advantage of having consolidated them in the first place. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "AEDateTime, with UTC required"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(strictYaml))
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Which strings the pattern admits"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(strictExamples))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The recommendation remains to signal UTC as a "),
                      createVNode("code", null, "SHOULD"),
                      createTextVNode(" at V2.2 and require it at the next major version, with the runway set by measured exposure. If the answers to question 03 show the ecosystem would rather absorb the change in one step, that recommendation should be revisited before V2.2 is finalised. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 07 · Questions")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Three questions, asked with the vote"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees both. The first is worth running "),
                      createVNode("em", null, "before"),
                      createTextVNode(" you vote: it takes minutes and needs no instrumentation. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-changes" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(questions, (item, i) => {
                        return createVNode("div", {
                          key: i,
                          class: "ofp-change"
                        }, [
                          createVNode("div", { class: "ofp-change__label" }, toDisplayString(String(i + 1).padStart(2, "0")) + " · " + toDisplayString(item.who), 1),
                          createVNode("p", null, [
                            createVNode("strong", null, toDisplayString(item.q), 1)
                          ]),
                          createVNode("p", null, toDisplayString(item.why), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 08 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What the component buys")
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
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 09 · Cons")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-014/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6fb6a883"]]);
export {
  index as default
};
