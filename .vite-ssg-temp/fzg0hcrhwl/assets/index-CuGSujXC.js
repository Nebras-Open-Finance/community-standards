import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, unref, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "OFP-005 · Confirm data deletion when a consent is revoked";
const OG_DESCRIPTION = "When a consent is revoked, expires, or is consumed, the TPP must review and delete the data it no longer has a lawful basis to hold — but the API Hub, the consent source of truth, holds no confirmation that it happened. Add an append-only attestations sub-resource so a TPP can attest, per data category, what it deleted or lawfully retained — across every consent type, within 45 days, with no new state model.";
const exampleGap = `# A consent reaches a terminal status — Revoked (by the TPP, the LFI, or the
# customer), Expired, or Consumed (a payment consent, once fully used).
# The TPP must then review and delete the data it no longer has a lawful basis
# to hold. Today the Hub can record only the ending itself — e.g. a revocation:

PATCH /account-access-consents/{ConsentId}
{ "Data": { "Status": "Revoked", "RevokedBy": "TPP.InitiatedByUser" } }

# ...and on expiry or consumption the Hub moves the consent to its terminal
# status on its own. Either way, there is nowhere to confirm the TPP has acted
# on the data it holds.`;
const examplePost = `# PROPOSED — post an immutable Attestation Event to the consent
POST /account-access-consents/{ConsentId}/attestations   # Bank Data Sharing
POST /payment-consents/{ConsentId}/attestations          # Bank Service Initiation
POST /insurance-consents/{ConsentId}/attestations        # Insurance (all types)

{
  "Data": {
    "AttestationType": "DataRetentionDeletion",
    "AttestationStatusAppliedDateTime": "2026-07-08T17:30:00Z",
    "DataAccessCeasedDateTime": "2026-07-01T09:15:30Z",
    "ConsentRevocationDateTime": "2026-07-01T09:15:00Z",   # only if revoked at the TPP
    "DataActions": [
      { "AttestationType": "Deleted",
        "DataCategory": "AllConsentedData",
        "AttestationDate": "2026-07-08T17:00:00Z" }
    ]
  }
}
# 201 Created — a receipt, not a status transition. Authorised with the same
# client credentials token used to create/get the consent; no new auth, no state.`;
const exampleOutcomes = `# One event lists every data category the consent covers, and states what
# happened to each — deletion is not always the whole story.

"DataActions": [
  { "AttestationType": "Deleted",
    "DataCategory": "AllConsentedData",
    "AttestationDate": "2026-07-08T17:00:00Z" },

  # Retained under a lawful basis — reason, retained-until, and restriction required:
  { "AttestationType": "Retained",
    "DataCategory": "AuditRecords",
    "AttestationDate": "2026-07-08T17:01:00Z",
    "RetentionReason": "RegulatoryOrLegalObligation",
    "RetainedUntilDate": "2031-07-01",
    "AccessRestriction": "RestrictedUseOnly" },

  # Anonymised for analytics:
  { "AttestationType": "Anonymised",
    "DataCategory": "AnalyticsData",
    "AttestationDate": "2026-07-08T17:02:00Z",
    "RetentionReason": "AnonymisedOrAggregatedData",
    "RetainedUntilDate": "2027-07-01",
    "AccessRestriction": "NotRestricted" }
]`;
const exampleGet = `# The 201 response is a receipt — including whether the 45-day deadline was met:
{ "Data": {
    "AttestationId": "3f1c8b1e-9a2d-4c7e-bf10-1d2e3f4a5b6c",
    "AttestationReceivedDateTime": "2026-07-08T17:30:04Z",
    "RegulatoryDeadlineMetIndicator": true
} }

# GET the Attestation Events a TPP has posted against this consent:
GET /account-access-consents/{ConsentId}/attestations

{
  "Data": [
    {
      "Attestation": { "AttestationType": "DataRetentionDeletion", "...": "..." },
      "Receipt": {
        "AttestationId": "3f1c8b1e-9a2d-4c7e-bf10-1d2e3f4a5b6c",
        "AttestationReceivedDateTime": "2026-07-08T17:30:04Z",
        "RegulatoryDeadlineMetIndicator": true
      }
    }
  ]
}`;
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
      id: "OFP-005",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "16 Jul 2026",
      closes: "30 Jul 2026",
      priority: "medium",
      version: "V2.2"
    };
    const pros = [
      "Closes the compliance-evidence gap — the API Hub, the consent source of truth, gains a durable, timestamped attestation that the TPP met its data-deletion obligation. Today it holds a terminal consent but no such confirmation.",
      "Minimal build — an append-only sub-resource on the consent: no state model to maintain and no reconciliation between a separate event and the consent, because the attestation is the consent’s own child.",
      "Reuses the existing authorisation — the sub-resource is called with the same client credentials token a TPP already uses to create and get the consent (not the consent-bound token). There is no new auth flow to add, and the call works unchanged after the consent has ended.",
      "Captures the real picture, per category — one Attestation Event lists each data category and whether it was Deleted, Retained, Anonymised, or ArchivedRestricted, with the reason and retention period where kept — not a bare “done”.",
      "One shape for every ending — the same event serves Revoked, Expired, and Consumed, because an append-only POST never depends on the consent’s status.",
      "Uniform across every consent type — Bank Data Sharing, Bank Service Initiation, and every Insurance type get the same sub-resource and the same event shape.",
      "The deadline is visible in the response — the Hub returns RegulatoryDeadlineMetIndicator, so the TPP gets immediate confirmation it attested within the 45-day window.",
      "An extensible pattern — a future obligation to attest to something else against a consent is a new AttestationType, not a new API: the standard grows and the Consent Manager absorbs it.",
      "Non-breaking and stateless — it adds a sub-resource; the existing consent revoke (PATCH) flow is untouched, and there is no de-duplication or correction endpoint to build."
    ];
    const cons = [
      "It is a new operation — a sub-resource, not merely a field on an existing call — so there is some new surface to specify, build, and secure, even if far less than a standalone events API with reconciliation.",
      "A self-declaration, not proof — the attestation captures the TPP’s confirmation that it deleted (or lawfully retained) the data, not independently verified erasure.",
      "No state model means no enforcement in the consent layer — whether a required attestation was posted, and by when, is a reporting-layer concern the Hub must build separately (a deliberate trade to keep state out of the consent).",
      "The per-category model asks more of the TPP — listing every applicable DataCategory with its reason, retention date, and access restriction is richer than a single flag, and TPPs must map their data holdings onto the categories.",
      "A new obligation for TPPs — completing the review and attesting within 45 days is extra work and tooling, and non-attestation needs a defined consequence to be meaningful rather than cosmetic."
    ];
    const requestFields = [
      { path: "$.Data", req: "Yes", type: "object", desc: "The Attestation being submitted. The only permitted type today is DataRetentionDeletion." },
      { path: "$.Data.AttestationType", req: "Yes", type: "string", desc: "The attestation type. Value: DataRetentionDeletion." },
      { path: "$.Data.AttestationStatusAppliedDateTime", req: "Yes", type: "date-time", desc: "Date and time from which the attestation is valid. Must be in the past." },
      { path: "$.Data.DataAccessCeasedDateTime", req: "Yes", type: "date-time", desc: "Date and time at which the TPP’s data access ceased. Must be in the past." },
      { path: "$.Data.ConsentRevocationDateTime", req: "No", type: "date-time", desc: "Date and time the customer revoked consent at the TPP. Provided only where the consent was revoked at the TPP — not where it expired or was consumed." },
      { path: "$.Data.DataActions", req: "Yes", type: "array (≥1)", desc: "The action taken for each category of data held. Must list every category that applies to the consent." },
      { path: "$.Data.DataActions[*].AttestationType", req: "Yes", type: "string", desc: "Deleted, Retained, Anonymised, or ArchivedRestricted. Deleted attests the data is gone; the others attest it is retained in some form." },
      { path: "$.Data.DataActions[*].DataCategory", req: "Yes", type: "string", desc: "The category the action applies to: AllConsentedData, a Permission Code, AnalyticsData, or AuditRecords." },
      { path: "$.Data.DataActions[*].AttestationDate", req: "Yes", type: "date-time", desc: "Date and time the attestation for this category is made." },
      { path: "$.Data.DataActions[*].RetentionReason", req: "Conditional", type: "string", desc: "Why the data is retained. Required where the action is Retained, Anonymised, or ArchivedRestricted." },
      { path: "$.Data.DataActions[*].RetentionReasonDescription", req: "Conditional", type: "string (1–500)", desc: "Free-text reason. Required where RetentionReason is Other." },
      { path: "$.Data.DataActions[*].RetainedUntilDate", req: "Conditional", type: "date", desc: "The date until which the data is retained. Required where the action is Retained, Anonymised, or ArchivedRestricted; must be in the future." },
      { path: "$.Data.DataActions[*].AccessRestriction", req: "Conditional", type: "string", desc: "How access to retained data is restricted: NotRestricted, RestrictedUseOnly, or Other. Required where the action is Retained, Anonymised, or ArchivedRestricted." },
      { path: "$.Data.DataActions[*].AccessRestrictionDescription", req: "Conditional", type: "string (1–500)", desc: "Free-text description. Required where the action is ArchivedRestricted and AccessRestriction is Other." }
    ];
    const responseFields = [
      { path: "$.Data", req: "Yes", type: "object", desc: "Wrapper for the receipt recorded by the API Hub." },
      { path: "$.Data.AttestationId", req: "Yes", type: "uuid", desc: "Unique identifier the API Hub assigns to the Attestation Event." },
      { path: "$.Data.AttestationReceivedDateTime", req: "Yes", type: "date-time", desc: "Date and time at which the API Hub received the Attestation Event." },
      { path: "$.Data.RegulatoryDeadlineMetIndicator", req: "Yes", type: "boolean", desc: "Whether the API Hub received the event before the regulatory deadline — 45 days after the consent reached its terminal status." }
    ];
    function reqClass(req) {
      if (req === "Yes") return "is-yes";
      if (req === "Conditional") return "is-cond";
      return "is-no";
    }
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
    const outcomeMods = /* @__PURE__ */ Object.assign({});
    const feedbackMods = /* @__PURE__ */ Object.assign({});
    const OutcomePartial = ((_a = Object.values(outcomeMods)[0]) == null ? void 0 : _a.default) ?? null;
    const FeedbackPartial = ((_b = Object.values(feedbackMods)[0]) == null ? void 0 : _b.default) ?? null;
    const showTabs = computed(() => isClosed.value && !!OutcomePartial);
    const proposal = computed(() => {
      var _a2;
      return {
        id: meta.id,
        title: "Confirm data deletion when a consent is revoked",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-3f95542a><section class="ofp-hero" data-v-3f95542a><div class="ofp-hero__inner" data-v-3f95542a>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/internal/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-3f95542a${_scopeId}>←</span> Internal proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" Internal proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-3f95542a><span class="ofp__id" data-v-3f95542a>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-3f95542a></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-3f95542a>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-3f95542a>Confirm data deletion when a consent is revoked</h1><p class="ofp__summary" data-v-3f95542a> When a consent is <strong data-v-3f95542a>revoked</strong>, <strong data-v-3f95542a>expires</strong>, or is <strong data-v-3f95542a>consumed</strong>, the TPP must review and delete the data it no longer has a lawful basis to hold, but the API Hub, the consent <strong data-v-3f95542a>source of truth</strong>, holds no confirmation that it happened. Add an append-only <code data-v-3f95542a>attestations</code> sub-resource so a TPP can attest — per data category — what it deleted or lawfully retained, across every consent type and within 45 days, with no new state model. </p><div class="ofp__strip" data-v-3f95542a><div class="ofp__strip-item" data-v-3f95542a><div class="ofp__strip-key" data-v-3f95542a>Proposed by</div><div class="ofp__strip-val" data-v-3f95542a>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-3f95542a><div class="ofp__strip-key" data-v-3f95542a>Author</div><div class="ofp__strip-val" data-v-3f95542a>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-3f95542a><div class="ofp__strip-key" data-v-3f95542a>Target version</div><div class="ofp__strip-val" data-v-3f95542a>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-3f95542a><div class="ofp__strip-key" data-v-3f95542a>Opened</div><div class="ofp__strip-val" data-v-3f95542a>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-3f95542a><div class="ofp__strip-key" data-v-3f95542a>Closes</div><div class="ofp__strip-val" data-v-3f95542a>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-3f95542a${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-3f95542a${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-3f95542a${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-3f95542a${_scopeId}><div class="ofp-vote-cover__card" data-v-3f95542a${_scopeId}><div class="ofp-vote-cover__label" data-v-3f95542a${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-3f95542a${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-3f95542a${_scopeId}><span class="ofp-seam-label" data-v-3f95542a${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>Revocation ends access, but leaves the data</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}> A consent is the customer&#39;s permission for a TPP to hold and use their data. When that consent reaches a <strong data-v-3f95542a${_scopeId}>terminal status</strong> — <strong data-v-3f95542a${_scopeId}>revoked</strong> (by the TPP, the LFI, or the customer), <strong data-v-3f95542a${_scopeId}>expired</strong>, or <strong data-v-3f95542a${_scopeId}>consumed</strong> (a payment consent, once fully used) — the permission is gone, and the TPP must review and delete what it no longer has a lawful basis to hold. That is not always <em data-v-3f95542a${_scopeId}>everything</em>: a TPP may be required to retain certain records to meet other legal obligations, such as anti-money-laundering rules. Ending the consent stops <em data-v-3f95542a${_scopeId}>future</em> access at the gateway; it does nothing about the data the TPP has <em data-v-3f95542a${_scopeId}>already</em> pulled and stored. </p><p data-v-3f95542a${_scopeId}> The API Hub is the <strong data-v-3f95542a${_scopeId}>source of truth</strong> for consent: it creates, stores, and manages every consent, and validates it on every request. That makes it the natural place to hold the confirmation of what happened to the data afterwards — yet today it has none. When a consent ends the Hub records the ending itself — a revocation, or a move to <code data-v-3f95542a${_scopeId}>Expired</code> or <code data-v-3f95542a${_scopeId}>Consumed</code> — and nothing more: </p><div class="ofp-code" data-v-3f95542a${_scopeId}><div class="ofp-code__label" data-v-3f95542a${_scopeId}>Today — the Hub records the ending, not the deletion</div><pre class="ofp-code__pre" data-v-3f95542a${_scopeId}>${ssrInterpolate(exampleGap)}</pre></div><p data-v-3f95542a${_scopeId}> The requirement here is deliberately contained: give the TPP a way to <strong data-v-3f95542a${_scopeId}>attest that it has completed its data review and deletion</strong> — or lawful retention — in line with its statutory obligations, and let the Hub hold that attestation against the consent. It is not a request for a deletion workflow or a status model — just a durable, timestamped attestation, allied to the consent it concerns, submitted within a defined window. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>An append-only attestations sub-resource on the consent</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Add an <code data-v-3f95542a${_scopeId}>attestations</code> sub-resource to each consent.</strong> A TPP <code data-v-3f95542a${_scopeId}>POST</code>s an <strong data-v-3f95542a${_scopeId}>Attestation Event</strong> to confirm it has completed its data review and deletion once the consent ended, whether revoked, expired, or consumed. A TPP <code data-v-3f95542a${_scopeId}>GET</code>s the sub-resource to read the events it has posted. The event hangs off the consent it concerns, so the confirmation is allied to the consent with nothing to reconcile. </p><div class="ofp-code" data-v-3f95542a${_scopeId}><div class="ofp-code__label" data-v-3f95542a${_scopeId}>Proposed — POST an Attestation Event (append-only)</div><pre class="ofp-code__pre" data-v-3f95542a${_scopeId}>${ssrInterpolate(examplePost)}</pre></div><p data-v-3f95542a${_scopeId}> A TPP&#39;s answer is not a single flag: the same data was not necessarily all handled the same way. So the event carries a <code data-v-3f95542a${_scopeId}>DataActions</code> array with <strong data-v-3f95542a${_scopeId}>one entry per category of data</strong> — and an event must list every category the consent covers. Each entry states its <code data-v-3f95542a${_scopeId}>AttestationType</code>: <strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Deleted</code></strong> (the data is gone), or <strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Retained</code></strong> / <strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Anonymised</code></strong> / <strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>ArchivedRestricted</code></strong> (the data is kept in some form — a <code data-v-3f95542a${_scopeId}>RetentionReason</code>, a <code data-v-3f95542a${_scopeId}>RetainedUntilDate</code>, and an <code data-v-3f95542a${_scopeId}>AccessRestriction</code> are then required). The category is <code data-v-3f95542a${_scopeId}>AllConsentedData</code> where one action covers everything, or a specific Permission Code, <code data-v-3f95542a${_scopeId}>AnalyticsData</code>, or <code data-v-3f95542a${_scopeId}>AuditRecords</code> where it does not: </p><div class="ofp-code" data-v-3f95542a${_scopeId}><div class="ofp-code__label" data-v-3f95542a${_scopeId}>Proposed — per-category DataActions (deleted, retained, anonymised)</div><pre class="ofp-code__pre" data-v-3f95542a${_scopeId}>${ssrInterpolate(exampleOutcomes)}</pre></div><p data-v-3f95542a${_scopeId}> Each <code data-v-3f95542a${_scopeId}>POST</code> records a new, immutable event, treated as a <strong data-v-3f95542a${_scopeId}>single atomic event</strong> uncorrelated with any other. There is <strong data-v-3f95542a${_scopeId}>no state model</strong> and <strong data-v-3f95542a${_scopeId}>no correction endpoint</strong>: an <code data-v-3f95542a${_scopeId}>AttestationType</code> is data on the event, not a status the consent moves through, the Hub applies no de-duplication, and all successfully recorded events are stored. If a TPP posts more than once, it has still met its obligation; which event is surfaced in reporting — the earliest, the latest, or all — is a reporting-layer matter, not consent state. The event&#39;s top-level <code data-v-3f95542a${_scopeId}>AttestationType</code> is the extension point — <code data-v-3f95542a${_scopeId}>DataRetentionDeletion</code> is the only value defined today, and a future obligation to attest to something else against a consent becomes a new value, not a new API. The <code data-v-3f95542a${_scopeId}>201</code> response is a receipt, and a <code data-v-3f95542a${_scopeId}>GET</code> returns the list: </p><div class="ofp-code" data-v-3f95542a${_scopeId}><div class="ofp-code__label" data-v-3f95542a${_scopeId}>Proposed — the receipt, and GET the events for a consent</div><pre class="ofp-code__pre" data-v-3f95542a${_scopeId}>${ssrInterpolate(exampleGet)}</pre></div><p data-v-3f95542a${_scopeId}> The sub-resource is a child of the consent (nothing to reconcile) and append-only (no state model) — two properties the other shapes we looked at could not both offer, as <strong data-v-3f95542a${_scopeId}>Alternatives considered</strong> below sets out. <strong data-v-3f95542a${_scopeId}>Authorisation is the same as getting a consent</strong>: the sub-resource is called with the very `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/security/tokens/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`client credentials access token`);
                } else {
                  return [
                    createTextVNode("client credentials access token")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` a TPP already uses to create and retrieve the consent itself (for example <code data-v-3f95542a${_scopeId}>GET /account-access-consents</code>). So there is no new auth flow, and no dependence on a token that dies with the consent. The attestation obligation and its 45-day window are documented on the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/requirements" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`consent requirements`);
                } else {
                  return [
                    createTextVNode("consent requirements")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` page; whether every required attestation was posted is a reporting-layer question, kept out of the consent itself. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 03 · The 45-day rule</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>Attest within 45 days of the consent ending</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}> The obligation attaches only when a consent reaches one of three <strong data-v-3f95542a${_scopeId}>terminal statuses</strong>, and it carries a defined deadline. Within <strong data-v-3f95542a${_scopeId}>45 days</strong> of the consent reaching that status, the TPP <strong data-v-3f95542a${_scopeId}>MUST</strong> complete its data review and deletion (or record a lawful retention) and <code data-v-3f95542a${_scopeId}>POST</code> the Attestation Event. The receipt&#39;s <code data-v-3f95542a${_scopeId}>RegulatoryDeadlineMetIndicator</code> tells the TPP, there and then, whether it attested inside the window. </p><div class="ofp-rules" data-v-3f95542a${_scopeId}><div class="ofp-rules__label" data-v-3f95542a${_scopeId}>Terminal statuses in scope</div><ul class="ofp-rules__list" data-v-3f95542a${_scopeId}><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Revoked</code></strong> — the consent was withdrawn, by the TPP, the LFI, or the customer. </li><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Expired</code></strong> — the consent&#39;s <code data-v-3f95542a${_scopeId}>ExpirationDateTime</code> passed and the Hub moved it to <code data-v-3f95542a${_scopeId}>Expired</code>. </li><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}><code data-v-3f95542a${_scopeId}>Consumed</code></strong> — a payment consent that has been fully used. This is why Service Initiation is in scope (see below). </li></ul></div><p data-v-3f95542a${_scopeId}> No other terminal status is in scope for v2.2 — <code data-v-3f95542a${_scopeId}>Rejected</code>, for example, is not, because no data was shared under it. The requirement applies to consents created under Standards v2.2 or later, and to earlier consents that are still <code data-v-3f95542a${_scopeId}>Authorized</code> on the CBUAE-mandated v2.2 implementation date and subsequently become <code data-v-3f95542a${_scopeId}>Revoked</code>, <code data-v-3f95542a${_scopeId}>Expired</code>, or <code data-v-3f95542a${_scopeId}>Consumed</code>. Consents that were <em data-v-3f95542a${_scopeId}>already</em> terminal before that date are out of scope. </p><p data-v-3f95542a${_scopeId}> The clock and the deadline live in the <strong data-v-3f95542a${_scopeId}>reporting layer</strong>, not on the consent: the consent holds no deletion state, and the 45-day rule is enforced by monitoring which consents have a recorded attestation, not by a new consent status. This proposal deliberately leaves the monitoring, reminder, and escalation processes — and any correction process for a mistaken attestation — out of scope. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 04 · Alternatives considered</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>Why a sub-resource, and not the two obvious alternatives</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}> Two other shapes were worked through first. Both can be made to work; each carries a cost the sub-resource avoids. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>A field on the consent revoke (<code data-v-3f95542a${_scopeId}>PATCH</code>).</strong> The first instinct was to add a <code data-v-3f95542a${_scopeId}>DataDeletion</code> object to the existing consent PATCH body — a small <code data-v-3f95542a${_scopeId}>Status</code> (say <code data-v-3f95542a${_scopeId}>Completed</code>, <code data-v-3f95542a${_scopeId}>NotRequired</code>, <code data-v-3f95542a${_scopeId}>RetainedUnderLegalObligation</code>) and a timestamp — so the TPP confirms deletion in the same call it uses to revoke. It is appealingly small and needs no new operation. But it couples an <em data-v-3f95542a${_scopeId}>attestation</em> to a <em data-v-3f95542a${_scopeId}>status transition</em>, and the two do not share a lifetime. Once the consent has already ended — revoked at the LFI, or expired — which is exactly when the confirmation is needed, there is no transition left to make: the PATCH would have to be relaxed to accept a body with no status change, on a consent already in a terminal state. That is a carve-out in the revoke contract — and because the field would live on the consent itself, the consent now carries deletion state, the very thing the requirement does not ask it to hold. (An <code data-v-3f95542a${_scopeId}>AttestationType</code> on a separate, immutable Attestation Event, as recommended above, is different: it describes a single confirmation, and the consent holds no deletion state of its own.) </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>A standalone events API.</strong> The other option was a new top-level resource — a <code data-v-3f95542a${_scopeId}>/revocation-events</code> endpoint, say — that the TPP posts to. This cleanly separates the report from the consent, but it buys a new problem: every event must then be <em data-v-3f95542a${_scopeId}>reconciled</em> back to the consent it concerns, with its own rules for matching, ordering, and orphaned records. It is not the endpoint that is expensive so much as the reconciliation around it. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>The sub-resource takes the good part of each.</strong> Like the events API it is a distinct, append-only Attestation Event rather than a field bolted onto a status change — so it behaves identically whether the consent is active, revoked, expired, or consumed. Like the PATCH field it is allied to the consent — the event is a <em data-v-3f95542a${_scopeId}>child</em> of the consent, so there is nothing to reconcile. And because each post is an immutable event, there is no state model to build or enforce in the consent layer. Any enforcement that emerges later — checking a required attestation was posted by its deadline — sits in the reporting layer over these events, leaving the events themselves immutable and the consent stateless. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 05 · End of consent</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>One event shape, however the consent ends</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}> A consent reaches the end of its life in more than one way, and an append-only <code data-v-3f95542a${_scopeId}>POST</code> serves them all without special cases — because it never depends on the consent&#39;s status. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Path A — the TPP revokes.</strong> The TPP revokes the consent (<code data-v-3f95542a${_scopeId}>PATCH</code> to <code data-v-3f95542a${_scopeId}>Status: Revoked</code>) as it does today, deletes the data, and <code data-v-3f95542a${_scopeId}>POST</code>s an Attestation Event to the consent&#39;s <code data-v-3f95542a${_scopeId}>attestations</code> sub-resource. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Path B — the customer revokes at the LFI.</strong> The customer withdraws consent in their bank&#39;s or insurer&#39;s app. The LFI tells the Hub, the Hub sets the consent to <code data-v-3f95542a${_scopeId}>Revoked</code>, and the Hub notifies the TPP through the existing `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Consent Status Event`);
                } else {
                  return [
                    createTextVNode("Consent Status Event")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. The TPP deletes its data and <code data-v-3f95542a${_scopeId}>POST</code>s the same event. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Path C — the consent expires.</strong> No one revokes it: its <code data-v-3f95542a${_scopeId}>ExpirationDateTime</code> passes and the Hub moves it to <code data-v-3f95542a${_scopeId}>Expired</code> on its own, firing the same Consent Status Event. The TPP&#39;s basis to hold the data ends just as it does on revocation, so it deletes the data and <code data-v-3f95542a${_scopeId}>POST</code>s the same event. Expiry is a quiet case — there is no deliberate act by anyone to prompt the clean-up — which is exactly why it must be in scope. </p><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Path D — a payment consent is consumed.</strong> A Service Initiation consent that has been fully used moves to <code data-v-3f95542a${_scopeId}>Consumed</code>. Like expiry, it is a status the Hub sets on its own, firing the same Consent Status Event — and the payment consent still holds data (see the next section). The TPP deletes it and <code data-v-3f95542a${_scopeId}>POST</code>s the same event. </p><p data-v-3f95542a${_scopeId}> The one event shape carries all four because it is <em data-v-3f95542a${_scopeId}>appended</em>, not a status change: it does not matter that the consent is already <code data-v-3f95542a${_scopeId}>Revoked</code>, <code data-v-3f95542a${_scopeId}>Expired</code>, or <code data-v-3f95542a${_scopeId}>Consumed</code>, since there is no transition to fight — as there would be if the confirmation were a <code data-v-3f95542a${_scopeId}>PATCH</code> of the consent&#39;s status. And because the sub-resource is authorised with the same client credentials token used to create and get the consent — not a consent-bound token — it works the same way whether the consent is still active or already terminal: there is no token that expires with the consent, and no new authorisation flow to add. </p><p data-v-3f95542a${_scopeId}> The TPP learns the consent has ended either from the Consent Status Event webhook (Paths B, C, and D) or, where it has not subscribed, by checking the consent status on its own schedule. Either way, the absence of a webhook subscription does not remove the obligation to notice the terminal status and attest. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 06 · Every consent type</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>This applies to all consent types — including Service Initiation</h2></div><div class="ofp-prose" data-v-3f95542a${_scopeId}><p data-v-3f95542a${_scopeId}> Every consent type carries data the TPP may have retrieved and stored, so the sub-resource applies uniformly to all three: </p><div class="ofp-rules" data-v-3f95542a${_scopeId}><div class="ofp-rules__label" data-v-3f95542a${_scopeId}>The sub-resource, per consent type</div><ul class="ofp-rules__list" data-v-3f95542a${_scopeId}><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Bank Data Sharing</strong> — <code data-v-3f95542a${_scopeId}>POST /account-access-consents/{ConsentId}/attestations</code>. The obvious case: account, balance, transaction, and party data pulled under the consent. </li><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Bank Service Initiation</strong> — <code data-v-3f95542a${_scopeId}>POST /payment-consents/{ConsentId}/attestations</code>. See the call-out below — a payment consent is not empty. </li><li data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Insurance</strong> — <code data-v-3f95542a${_scopeId}>POST /insurance-consents/{ConsentId}/attestations</code>, across every insurance type (Motor, Health, Home, Life, Travel, and the rest), each carrying policy and claims data. </li></ul></div><p data-v-3f95542a${_scopeId}><strong data-v-3f95542a${_scopeId}>Service Initiation is the one to call out</strong>, because it is the easiest to wave through. It is filed under &quot;payments&quot;, not &quot;data sharing&quot;, so it is tempting to assume a payment consent holds nothing to delete once the money has moved. That is wrong. A Service Initiation consent carries data: the debtor and creditor account identifiers and names, the amounts, references, and the charge and exchange-rate information attached to the consent (<code data-v-3f95542a${_scopeId}>Charges</code>, <code data-v-3f95542a${_scopeId}>ExchangeRate</code>) — and any account data the TPP retrieved to set the payment up. That is personal and financial data held under a consent, and when the consent ends — revoked, expired, or consumed — it falls under the same deletion obligation as any Data Sharing consent. Excluding Service Initiation would leave exactly the data people assume is not there. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 07 · Technical changes</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-3f95542a${_scopeId}> A new sub-resource on each consent, a shared Attestation Event schema, and storage against the consent. No new top-level API, no change to the consent status model. </p></div><div class="ofp-changes" data-v-3f95542a${_scopeId}><div class="ofp-change" data-v-3f95542a${_scopeId}><div class="ofp-change__label" data-v-3f95542a${_scopeId}>01 · Add the <code data-v-3f95542a${_scopeId}>attestations</code> sub-resource</div><p data-v-3f95542a${_scopeId}> Add <code data-v-3f95542a${_scopeId}>POST</code> and <code data-v-3f95542a${_scopeId}>GET</code> on <code data-v-3f95542a${_scopeId}>/{consent}/attestations</code> to the three TPP-facing consent specs: Bank Data Sharing (<code data-v-3f95542a${_scopeId}>/account-access-consents</code>), Bank Service Initiation (<code data-v-3f95542a${_scopeId}>/payment-consents</code>), and Insurance (<code data-v-3f95542a${_scopeId}>/insurance-consents</code>). The <code data-v-3f95542a${_scopeId}>POST</code> records an Attestation Event; the <code data-v-3f95542a${_scopeId}>GET</code> lists them. No <code data-v-3f95542a${_scopeId}>PATCH</code> or <code data-v-3f95542a${_scopeId}>DELETE</code> — events are immutable. Authorisation is the same as the consent endpoints: the client credentials token used to create and get the consent (the <code data-v-3f95542a${_scopeId}>client_credentials</code> grant), with the same scope as the parent consent — not the consent-bound (<code data-v-3f95542a${_scopeId}>authorization_code</code>) token. </p></div><div class="ofp-change" data-v-3f95542a${_scopeId}><div class="ofp-change__label" data-v-3f95542a${_scopeId}>02 · Define the Attestation Event schema</div><p data-v-3f95542a${_scopeId}> A shared event: a top-level <code data-v-3f95542a${_scopeId}>AttestationType</code> (<code data-v-3f95542a${_scopeId}>DataRetentionDeletion</code> today, extensible), the envelope date-times (<code data-v-3f95542a${_scopeId}>AttestationStatusAppliedDateTime</code>, <code data-v-3f95542a${_scopeId}>DataAccessCeasedDateTime</code>, optional <code data-v-3f95542a${_scopeId}>ConsentRevocationDateTime</code>), and a <code data-v-3f95542a${_scopeId}>DataActions</code> array of one entry per <code data-v-3f95542a${_scopeId}>DataCategory</code>. Each action&#39;s <code data-v-3f95542a${_scopeId}>AttestationType</code> (<code data-v-3f95542a${_scopeId}>Deleted</code> / <code data-v-3f95542a${_scopeId}>Retained</code> / <code data-v-3f95542a${_scopeId}>Anonymised</code> / <code data-v-3f95542a${_scopeId}>ArchivedRestricted</code>) selects whether <code data-v-3f95542a${_scopeId}>RetentionReason</code>, <code data-v-3f95542a${_scopeId}>RetainedUntilDate</code>, and <code data-v-3f95542a${_scopeId}>AccessRestriction</code> are required. The Hub returns a receipt: <code data-v-3f95542a${_scopeId}>AttestationId</code>, <code data-v-3f95542a${_scopeId}>AttestationReceivedDateTime</code>, and <code data-v-3f95542a${_scopeId}>RegulatoryDeadlineMetIndicator</code>. </p></div><div class="ofp-change" data-v-3f95542a${_scopeId}><div class="ofp-change__label" data-v-3f95542a${_scopeId}>03 · Validate by schema first, rules second</div><p data-v-3f95542a${_scopeId}> Mandatory properties, enum values, and date-time formats are enforced by <strong data-v-3f95542a${_scopeId}>schema validation</strong> — not restated as technical rules. The rule layer covers only what schema cannot: the temporal ordering of the date-times and the conditional requirements. A rule failure returns <code data-v-3f95542a${_scopeId}>400</code> with <code data-v-3f95542a${_scopeId}>Attestation.ValidationError</code>. </p></div><div class="ofp-change" data-v-3f95542a${_scopeId}><div class="ofp-change__label" data-v-3f95542a${_scopeId}>04 · Store against the consent; keep state in reporting</div><p data-v-3f95542a${_scopeId}> The Consent Manager stores each Attestation Event against its <code data-v-3f95542a${_scopeId}>ConsentId</code>. All successfully recorded events are kept; the Hub applies no de-duplication and offers no correction endpoint. Whether a required attestation was posted, and within the 45 days, is derived in the reporting layer — not held as state on the consent — so the consent layer needs no new state machine. </p></div><div class="ofp-change" data-v-3f95542a${_scopeId}><div class="ofp-change__label" data-v-3f95542a${_scopeId}>05 · Documentation — the obligation and the flow</div><p data-v-3f95542a${_scopeId}> Document the obligation and its 45-day window on the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/requirements" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`consent requirements`);
                } else {
                  return [
                    createTextVNode("consent requirements")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` page, and add the attestation step to the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/api-guide" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`consent API guide`);
                } else {
                  return [
                    createTextVNode("consent API guide")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` and the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Consent Status Event`);
                } else {
                  return [
                    createTextVNode("Consent Status Event")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` guide (on receiving a revocation, expiry, or consumption event, delete and post an Attestation Event). </p></div></div></div></section><section class="ofp-band ofp-band--white" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 08 · Draft schema</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>The sub-resource, written out</h2><p class="ofp-band__lede" data-v-3f95542a${_scopeId}> A working draft attached to this proposal — the <code data-v-3f95542a${_scopeId}>attestations</code> sub-resource on all three consent types, with its shared Attestation Event schema. It opens in the same rendered view as the published API specs. </p></div><div class="ofp-cards" data-v-3f95542a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/internal/proposals/ofp-005/attestation-schema",
              class: "ofp-card",
              style: { "--card-color": "#008B78" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ofp-card__top" style="${ssrRenderStyle({ background: "#008B78" })}" data-v-3f95542a${_scopeId2}></span><div class="ofp-card__meta" data-v-3f95542a${_scopeId2}><span class="ofp-card__cat" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-3f95542a${_scopeId2}>Consent attestations</span></div><h3 class="ofp-card__title" data-v-3f95542a${_scopeId2}>attestation-schema.yaml</h3><p class="ofp-card__desc" data-v-3f95542a${_scopeId2}> The append-only <code data-v-3f95542a${_scopeId2}>attestations</code> sub-resource — POST and GET on <code data-v-3f95542a${_scopeId2}>/{consent}/attestations</code> across Bank Data Sharing, Bank Service Initiation, and Insurance. </p><div class="ofp-card__foot" data-v-3f95542a${_scopeId2}><span class="ofp-card__cta" data-v-3f95542a${_scopeId2}>Open rendered schema</span><span class="ofp-card__arrow" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-3f95542a${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "ofp-card__top",
                      style: { background: "#008B78" }
                    }),
                    createVNode("div", { class: "ofp-card__meta" }, [
                      createVNode("span", {
                        class: "ofp-card__cat",
                        style: { color: "#008B78" }
                      }, "Consent attestations")
                    ]),
                    createVNode("h3", { class: "ofp-card__title" }, "attestation-schema.yaml"),
                    createVNode("p", { class: "ofp-card__desc" }, [
                      createTextVNode(" The append-only "),
                      createVNode("code", null, "attestations"),
                      createTextVNode(" sub-resource — POST and GET on "),
                      createVNode("code", null, "/{consent}/attestations"),
                      createTextVNode(" across Bank Data Sharing, Bank Service Initiation, and Insurance. ")
                    ]),
                    createVNode("div", { class: "ofp-card__foot" }, [
                      createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                      createVNode("span", {
                        class: "ofp-card__arrow",
                        style: { color: "#008B78" }
                      }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="ofp-fields" data-v-3f95542a${_scopeId}><div class="ofp-fields__label" data-v-3f95542a${_scopeId}>Request payload — the Attestation Event</div><div class="ofp-fields__scroll" data-v-3f95542a${_scopeId}><table class="ofp-fields__table" data-v-3f95542a${_scopeId}><thead data-v-3f95542a${_scopeId}><tr data-v-3f95542a${_scopeId}><th scope="col" data-v-3f95542a${_scopeId}>Field</th><th scope="col" data-v-3f95542a${_scopeId}>Required</th><th scope="col" data-v-3f95542a${_scopeId}>Type</th><th scope="col" data-v-3f95542a${_scopeId}>Description</th></tr></thead><tbody data-v-3f95542a${_scopeId}><!--[-->`);
            ssrRenderList(requestFields, (f) => {
              _push2(`<tr data-v-3f95542a${_scopeId}><td class="ofp-fields__path" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.path)}</td><td class="ofp-fields__req" data-v-3f95542a${_scopeId}><span class="${ssrRenderClass([reqClass(f.req), "ofp-fields__pill"])}" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.req)}</span></td><td class="ofp-fields__type" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.type)}</td><td class="ofp-fields__desc" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.desc)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div><div class="ofp-fields" data-v-3f95542a${_scopeId}><div class="ofp-fields__label" data-v-3f95542a${_scopeId}>Response payload — the receipt (201)</div><div class="ofp-fields__scroll" data-v-3f95542a${_scopeId}><table class="ofp-fields__table" data-v-3f95542a${_scopeId}><thead data-v-3f95542a${_scopeId}><tr data-v-3f95542a${_scopeId}><th scope="col" data-v-3f95542a${_scopeId}>Field</th><th scope="col" data-v-3f95542a${_scopeId}>Required</th><th scope="col" data-v-3f95542a${_scopeId}>Type</th><th scope="col" data-v-3f95542a${_scopeId}>Description</th></tr></thead><tbody data-v-3f95542a${_scopeId}><!--[-->`);
            ssrRenderList(responseFields, (f) => {
              _push2(`<tr data-v-3f95542a${_scopeId}><td class="ofp-fields__path" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.path)}</td><td class="ofp-fields__req" data-v-3f95542a${_scopeId}><span class="${ssrRenderClass([reqClass(f.req), "ofp-fields__pill"])}" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.req)}</span></td><td class="ofp-fields__type" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.type)}</td><td class="ofp-fields__desc" data-v-3f95542a${_scopeId}>${ssrInterpolate(f.desc)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 09 · Pros</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>What an attestations sub-resource buys</h2></div><ul class="ofp-pros" data-v-3f95542a${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-3f95542a${_scopeId}><span class="ofp-pros__glyph" data-v-3f95542a${_scopeId}>✓</span><span data-v-3f95542a${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-3f95542a${_scopeId}><div class="ofp-band__inner" data-v-3f95542a${_scopeId}><div class="ofp-band__head" data-v-3f95542a${_scopeId}><div class="ofp-band__eyebrow" data-v-3f95542a${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3f95542a${_scopeId}></span> 10 · Cons</div><h2 class="ofp-band__title" data-v-3f95542a${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-3f95542a${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-3f95542a${_scopeId}><span class="ofp-cons__glyph" data-v-3f95542a${_scopeId}>×</span><span data-v-3f95542a${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "Revocation ends access, but leaves the data")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" A consent is the customer's permission for a TPP to hold and use their data. When that consent reaches a "),
                      createVNode("strong", null, "terminal status"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "revoked"),
                      createTextVNode(" (by the TPP, the LFI, or the customer), "),
                      createVNode("strong", null, "expired"),
                      createTextVNode(", or "),
                      createVNode("strong", null, "consumed"),
                      createTextVNode(" (a payment consent, once fully used) — the permission is gone, and the TPP must review and delete what it no longer has a lawful basis to hold. That is not always "),
                      createVNode("em", null, "everything"),
                      createTextVNode(": a TPP may be required to retain certain records to meet other legal obligations, such as anti-money-laundering rules. Ending the consent stops "),
                      createVNode("em", null, "future"),
                      createTextVNode(" access at the gateway; it does nothing about the data the TPP has "),
                      createVNode("em", null, "already"),
                      createTextVNode(" pulled and stored. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The API Hub is the "),
                      createVNode("strong", null, "source of truth"),
                      createTextVNode(" for consent: it creates, stores, and manages every consent, and validates it on every request. That makes it the natural place to hold the confirmation of what happened to the data afterwards — yet today it has none. When a consent ends the Hub records the ending itself — a revocation, or a move to "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(" or "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(" — and nothing more: ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the Hub records the ending, not the deletion"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleGap))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The requirement here is deliberately contained: give the TPP a way to "),
                      createVNode("strong", null, "attest that it has completed its data review and deletion"),
                      createTextVNode(" — or lawful retention — in line with its statutory obligations, and let the Hub hold that attestation against the consent. It is not a request for a deletion workflow or a status model — just a durable, timestamped attestation, allied to the consent it concerns, submitted within a defined window. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "An append-only attestations sub-resource on the consent")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("Add an "),
                        createVNode("code", null, "attestations"),
                        createTextVNode(" sub-resource to each consent.")
                      ]),
                      createTextVNode(" A TPP "),
                      createVNode("code", null, "POST"),
                      createTextVNode("s an "),
                      createVNode("strong", null, "Attestation Event"),
                      createTextVNode(" to confirm it has completed its data review and deletion once the consent ended, whether revoked, expired, or consumed. A TPP "),
                      createVNode("code", null, "GET"),
                      createTextVNode("s the sub-resource to read the events it has posted. The event hangs off the consent it concerns, so the confirmation is allied to the consent with nothing to reconcile. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — POST an Attestation Event (append-only)"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(examplePost))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A TPP's answer is not a single flag: the same data was not necessarily all handled the same way. So the event carries a "),
                      createVNode("code", null, "DataActions"),
                      createTextVNode(" array with "),
                      createVNode("strong", null, "one entry per category of data"),
                      createTextVNode(" — and an event must list every category the consent covers. Each entry states its "),
                      createVNode("code", null, "AttestationType"),
                      createTextVNode(": "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Deleted")
                      ]),
                      createTextVNode(" (the data is gone), or "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Retained")
                      ]),
                      createTextVNode(" / "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Anonymised")
                      ]),
                      createTextVNode(" / "),
                      createVNode("strong", null, [
                        createVNode("code", null, "ArchivedRestricted")
                      ]),
                      createTextVNode(" (the data is kept in some form — a "),
                      createVNode("code", null, "RetentionReason"),
                      createTextVNode(", a "),
                      createVNode("code", null, "RetainedUntilDate"),
                      createTextVNode(", and an "),
                      createVNode("code", null, "AccessRestriction"),
                      createTextVNode(" are then required). The category is "),
                      createVNode("code", null, "AllConsentedData"),
                      createTextVNode(" where one action covers everything, or a specific Permission Code, "),
                      createVNode("code", null, "AnalyticsData"),
                      createTextVNode(", or "),
                      createVNode("code", null, "AuditRecords"),
                      createTextVNode(" where it does not: ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — per-category DataActions (deleted, retained, anonymised)"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleOutcomes))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Each "),
                      createVNode("code", null, "POST"),
                      createTextVNode(" records a new, immutable event, treated as a "),
                      createVNode("strong", null, "single atomic event"),
                      createTextVNode(" uncorrelated with any other. There is "),
                      createVNode("strong", null, "no state model"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "no correction endpoint"),
                      createTextVNode(": an "),
                      createVNode("code", null, "AttestationType"),
                      createTextVNode(" is data on the event, not a status the consent moves through, the Hub applies no de-duplication, and all successfully recorded events are stored. If a TPP posts more than once, it has still met its obligation; which event is surfaced in reporting — the earliest, the latest, or all — is a reporting-layer matter, not consent state. The event's top-level "),
                      createVNode("code", null, "AttestationType"),
                      createTextVNode(" is the extension point — "),
                      createVNode("code", null, "DataRetentionDeletion"),
                      createTextVNode(" is the only value defined today, and a future obligation to attest to something else against a consent becomes a new value, not a new API. The "),
                      createVNode("code", null, "201"),
                      createTextVNode(" response is a receipt, and a "),
                      createVNode("code", null, "GET"),
                      createTextVNode(" returns the list: ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — the receipt, and GET the events for a consent"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleGet))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The sub-resource is a child of the consent (nothing to reconcile) and append-only (no state model) — two properties the other shapes we looked at could not both offer, as "),
                      createVNode("strong", null, "Alternatives considered"),
                      createTextVNode(" below sets out. "),
                      createVNode("strong", null, "Authorisation is the same as getting a consent"),
                      createTextVNode(": the sub-resource is called with the very "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/security/tokens/" }, {
                        default: withCtx(() => [
                          createTextVNode("client credentials access token")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" a TPP already uses to create and retrieve the consent itself (for example "),
                      createVNode("code", null, "GET /account-access-consents"),
                      createTextVNode("). So there is no new auth flow, and no dependence on a token that dies with the consent. The attestation obligation and its 45-day window are documented on the "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/requirements" }, {
                        default: withCtx(() => [
                          createTextVNode("consent requirements")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" page; whether every required attestation was posted is a reporting-layer question, kept out of the consent itself. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 03 · The 45-day rule")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Attest within 45 days of the consent ending")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" The obligation attaches only when a consent reaches one of three "),
                      createVNode("strong", null, "terminal statuses"),
                      createTextVNode(", and it carries a defined deadline. Within "),
                      createVNode("strong", null, "45 days"),
                      createTextVNode(" of the consent reaching that status, the TPP "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" complete its data review and deletion (or record a lawful retention) and "),
                      createVNode("code", null, "POST"),
                      createTextVNode(" the Attestation Event. The receipt's "),
                      createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                      createTextVNode(" tells the TPP, there and then, whether it attested inside the window. ")
                    ]),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Terminal statuses in scope"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "Revoked")
                          ]),
                          createTextVNode(" — the consent was withdrawn, by the TPP, the LFI, or the customer. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "Expired")
                          ]),
                          createTextVNode(" — the consent's "),
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode(" passed and the Hub moved it to "),
                          createVNode("code", null, "Expired"),
                          createTextVNode(". ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "Consumed")
                          ]),
                          createTextVNode(" — a payment consent that has been fully used. This is why Service Initiation is in scope (see below). ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" No other terminal status is in scope for v2.2 — "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(", for example, is not, because no data was shared under it. The requirement applies to consents created under Standards v2.2 or later, and to earlier consents that are still "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" on the CBUAE-mandated v2.2 implementation date and subsequently become "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", or "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(". Consents that were "),
                      createVNode("em", null, "already"),
                      createTextVNode(" terminal before that date are out of scope. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The clock and the deadline live in the "),
                      createVNode("strong", null, "reporting layer"),
                      createTextVNode(", not on the consent: the consent holds no deletion state, and the 45-day rule is enforced by monitoring which consents have a recorded attestation, not by a new consent status. This proposal deliberately leaves the monitoring, reminder, and escalation processes — and any correction process for a mistaken attestation — out of scope. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Alternatives considered")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Why a sub-resource, and not the two obvious alternatives")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, " Two other shapes were worked through first. Both can be made to work; each carries a cost the sub-resource avoids. "),
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("A field on the consent revoke ("),
                        createVNode("code", null, "PATCH"),
                        createTextVNode(").")
                      ]),
                      createTextVNode(" The first instinct was to add a "),
                      createVNode("code", null, "DataDeletion"),
                      createTextVNode(" object to the existing consent PATCH body — a small "),
                      createVNode("code", null, "Status"),
                      createTextVNode(" (say "),
                      createVNode("code", null, "Completed"),
                      createTextVNode(", "),
                      createVNode("code", null, "NotRequired"),
                      createTextVNode(", "),
                      createVNode("code", null, "RetainedUnderLegalObligation"),
                      createTextVNode(") and a timestamp — so the TPP confirms deletion in the same call it uses to revoke. It is appealingly small and needs no new operation. But it couples an "),
                      createVNode("em", null, "attestation"),
                      createTextVNode(" to a "),
                      createVNode("em", null, "status transition"),
                      createTextVNode(", and the two do not share a lifetime. Once the consent has already ended — revoked at the LFI, or expired — which is exactly when the confirmation is needed, there is no transition left to make: the PATCH would have to be relaxed to accept a body with no status change, on a consent already in a terminal state. That is a carve-out in the revoke contract — and because the field would live on the consent itself, the consent now carries deletion state, the very thing the requirement does not ask it to hold. (An "),
                      createVNode("code", null, "AttestationType"),
                      createTextVNode(" on a separate, immutable Attestation Event, as recommended above, is different: it describes a single confirmation, and the consent holds no deletion state of its own.) ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "A standalone events API."),
                      createTextVNode(" The other option was a new top-level resource — a "),
                      createVNode("code", null, "/revocation-events"),
                      createTextVNode(" endpoint, say — that the TPP posts to. This cleanly separates the report from the consent, but it buys a new problem: every event must then be "),
                      createVNode("em", null, "reconciled"),
                      createTextVNode(" back to the consent it concerns, with its own rules for matching, ordering, and orphaned records. It is not the endpoint that is expensive so much as the reconciliation around it. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "The sub-resource takes the good part of each."),
                      createTextVNode(" Like the events API it is a distinct, append-only Attestation Event rather than a field bolted onto a status change — so it behaves identically whether the consent is active, revoked, expired, or consumed. Like the PATCH field it is allied to the consent — the event is a "),
                      createVNode("em", null, "child"),
                      createTextVNode(" of the consent, so there is nothing to reconcile. And because each post is an immutable event, there is no state model to build or enforce in the consent layer. Any enforcement that emerges later — checking a required attestation was posted by its deadline — sits in the reporting layer over these events, leaving the events themselves immutable and the consent stateless. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 05 · End of consent")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "One event shape, however the consent ends")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" A consent reaches the end of its life in more than one way, and an append-only "),
                      createVNode("code", null, "POST"),
                      createTextVNode(" serves them all without special cases — because it never depends on the consent's status. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Path A — the TPP revokes."),
                      createTextVNode(" The TPP revokes the consent ("),
                      createVNode("code", null, "PATCH"),
                      createTextVNode(" to "),
                      createVNode("code", null, "Status: Revoked"),
                      createTextVNode(") as it does today, deletes the data, and "),
                      createVNode("code", null, "POST"),
                      createTextVNode("s an Attestation Event to the consent's "),
                      createVNode("code", null, "attestations"),
                      createTextVNode(" sub-resource. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Path B — the customer revokes at the LFI."),
                      createTextVNode(" The customer withdraws consent in their bank's or insurer's app. The LFI tells the Hub, the Hub sets the consent to "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", and the Hub notifies the TPP through the existing "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, {
                        default: withCtx(() => [
                          createTextVNode("Consent Status Event")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". The TPP deletes its data and "),
                      createVNode("code", null, "POST"),
                      createTextVNode("s the same event. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Path C — the consent expires."),
                      createTextVNode(" No one revokes it: its "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" passes and the Hub moves it to "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(" on its own, firing the same Consent Status Event. The TPP's basis to hold the data ends just as it does on revocation, so it deletes the data and "),
                      createVNode("code", null, "POST"),
                      createTextVNode("s the same event. Expiry is a quiet case — there is no deliberate act by anyone to prompt the clean-up — which is exactly why it must be in scope. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Path D — a payment consent is consumed."),
                      createTextVNode(" A Service Initiation consent that has been fully used moves to "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(". Like expiry, it is a status the Hub sets on its own, firing the same Consent Status Event — and the payment consent still holds data (see the next section). The TPP deletes it and "),
                      createVNode("code", null, "POST"),
                      createTextVNode("s the same event. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The one event shape carries all four because it is "),
                      createVNode("em", null, "appended"),
                      createTextVNode(", not a status change: it does not matter that the consent is already "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", or "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(", since there is no transition to fight — as there would be if the confirmation were a "),
                      createVNode("code", null, "PATCH"),
                      createTextVNode(" of the consent's status. And because the sub-resource is authorised with the same client credentials token used to create and get the consent — not a consent-bound token — it works the same way whether the consent is still active or already terminal: there is no token that expires with the consent, and no new authorisation flow to add. ")
                    ]),
                    createVNode("p", null, " The TPP learns the consent has ended either from the Consent Status Event webhook (Paths B, C, and D) or, where it has not subscribed, by checking the consent status on its own schedule. Either way, the absence of a webhook subscription does not remove the obligation to notice the terminal status and attest. ")
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Every consent type")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "This applies to all consent types — including Service Initiation")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, " Every consent type carries data the TPP may have retrieved and stored, so the sub-resource applies uniformly to all three: "),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "The sub-resource, per consent type"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Bank Data Sharing"),
                          createTextVNode(" — "),
                          createVNode("code", null, "POST /account-access-consents/{ConsentId}/attestations"),
                          createTextVNode(". The obvious case: account, balance, transaction, and party data pulled under the consent. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Bank Service Initiation"),
                          createTextVNode(" — "),
                          createVNode("code", null, "POST /payment-consents/{ConsentId}/attestations"),
                          createTextVNode(". See the call-out below — a payment consent is not empty. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Insurance"),
                          createTextVNode(" — "),
                          createVNode("code", null, "POST /insurance-consents/{ConsentId}/attestations"),
                          createTextVNode(", across every insurance type (Motor, Health, Home, Life, Travel, and the rest), each carrying policy and claims data. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Service Initiation is the one to call out"),
                      createTextVNode(', because it is the easiest to wave through. It is filed under "payments", not "data sharing", so it is tempting to assume a payment consent holds nothing to delete once the money has moved. That is wrong. A Service Initiation consent carries data: the debtor and creditor account identifiers and names, the amounts, references, and the charge and exchange-rate information attached to the consent ('),
                      createVNode("code", null, "Charges"),
                      createTextVNode(", "),
                      createVNode("code", null, "ExchangeRate"),
                      createTextVNode(") — and any account data the TPP retrieved to set the payment up. That is personal and financial data held under a consent, and when the consent ends — revoked, expired, or consumed — it falls under the same deletion obligation as any Data Sharing consent. Excluding Service Initiation would leave exactly the data people assume is not there. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 07 · Technical changes")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What changes in the spec"),
                    createVNode("p", { class: "ofp-band__lede" }, " A new sub-resource on each consent, a shared Attestation Event schema, and storage against the consent. No new top-level API, no change to the consent status model. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, [
                        createTextVNode("01 · Add the "),
                        createVNode("code", null, "attestations"),
                        createTextVNode(" sub-resource")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" Add "),
                        createVNode("code", null, "POST"),
                        createTextVNode(" and "),
                        createVNode("code", null, "GET"),
                        createTextVNode(" on "),
                        createVNode("code", null, "/{consent}/attestations"),
                        createTextVNode(" to the three TPP-facing consent specs: Bank Data Sharing ("),
                        createVNode("code", null, "/account-access-consents"),
                        createTextVNode("), Bank Service Initiation ("),
                        createVNode("code", null, "/payment-consents"),
                        createTextVNode("), and Insurance ("),
                        createVNode("code", null, "/insurance-consents"),
                        createTextVNode("). The "),
                        createVNode("code", null, "POST"),
                        createTextVNode(" records an Attestation Event; the "),
                        createVNode("code", null, "GET"),
                        createTextVNode(" lists them. No "),
                        createVNode("code", null, "PATCH"),
                        createTextVNode(" or "),
                        createVNode("code", null, "DELETE"),
                        createTextVNode(" — events are immutable. Authorisation is the same as the consent endpoints: the client credentials token used to create and get the consent (the "),
                        createVNode("code", null, "client_credentials"),
                        createTextVNode(" grant), with the same scope as the parent consent — not the consent-bound ("),
                        createVNode("code", null, "authorization_code"),
                        createTextVNode(") token. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Define the Attestation Event schema"),
                      createVNode("p", null, [
                        createTextVNode(" A shared event: a top-level "),
                        createVNode("code", null, "AttestationType"),
                        createTextVNode(" ("),
                        createVNode("code", null, "DataRetentionDeletion"),
                        createTextVNode(" today, extensible), the envelope date-times ("),
                        createVNode("code", null, "AttestationStatusAppliedDateTime"),
                        createTextVNode(", "),
                        createVNode("code", null, "DataAccessCeasedDateTime"),
                        createTextVNode(", optional "),
                        createVNode("code", null, "ConsentRevocationDateTime"),
                        createTextVNode("), and a "),
                        createVNode("code", null, "DataActions"),
                        createTextVNode(" array of one entry per "),
                        createVNode("code", null, "DataCategory"),
                        createTextVNode(". Each action's "),
                        createVNode("code", null, "AttestationType"),
                        createTextVNode(" ("),
                        createVNode("code", null, "Deleted"),
                        createTextVNode(" / "),
                        createVNode("code", null, "Retained"),
                        createTextVNode(" / "),
                        createVNode("code", null, "Anonymised"),
                        createTextVNode(" / "),
                        createVNode("code", null, "ArchivedRestricted"),
                        createTextVNode(") selects whether "),
                        createVNode("code", null, "RetentionReason"),
                        createTextVNode(", "),
                        createVNode("code", null, "RetainedUntilDate"),
                        createTextVNode(", and "),
                        createVNode("code", null, "AccessRestriction"),
                        createTextVNode(" are required. The Hub returns a receipt: "),
                        createVNode("code", null, "AttestationId"),
                        createTextVNode(", "),
                        createVNode("code", null, "AttestationReceivedDateTime"),
                        createTextVNode(", and "),
                        createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Validate by schema first, rules second"),
                      createVNode("p", null, [
                        createTextVNode(" Mandatory properties, enum values, and date-time formats are enforced by "),
                        createVNode("strong", null, "schema validation"),
                        createTextVNode(" — not restated as technical rules. The rule layer covers only what schema cannot: the temporal ordering of the date-times and the conditional requirements. A rule failure returns "),
                        createVNode("code", null, "400"),
                        createTextVNode(" with "),
                        createVNode("code", null, "Attestation.ValidationError"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Store against the consent; keep state in reporting"),
                      createVNode("p", null, [
                        createTextVNode(" The Consent Manager stores each Attestation Event against its "),
                        createVNode("code", null, "ConsentId"),
                        createTextVNode(". All successfully recorded events are kept; the Hub applies no de-duplication and offers no correction endpoint. Whether a required attestation was posted, and within the 45 days, is derived in the reporting layer — not held as state on the consent — so the consent layer needs no new state machine. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "05 · Documentation — the obligation and the flow"),
                      createVNode("p", null, [
                        createTextVNode(" Document the obligation and its 45-day window on the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/requirements" }, {
                          default: withCtx(() => [
                            createTextVNode("consent requirements")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" page, and add the attestation step to the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/consent/api-guide" }, {
                          default: withCtx(() => [
                            createTextVNode("consent API guide")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" and the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, {
                          default: withCtx(() => [
                            createTextVNode("Consent Status Event")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" guide (on receiving a revocation, expiry, or consumption event, delete and post an Attestation Event). ")
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
                      createTextVNode(" 08 · Draft schema")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "The sub-resource, written out"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" A working draft attached to this proposal — the "),
                      createVNode("code", null, "attestations"),
                      createTextVNode(" sub-resource on all three consent types, with its shared Attestation Event schema. It opens in the same rendered view as the published API specs. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-cards" }, [
                    createVNode(_component_RouterLink, {
                      to: "/internal/proposals/ofp-005/attestation-schema",
                      class: "ofp-card",
                      style: { "--card-color": "#008B78" }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "ofp-card__top",
                          style: { background: "#008B78" }
                        }),
                        createVNode("div", { class: "ofp-card__meta" }, [
                          createVNode("span", {
                            class: "ofp-card__cat",
                            style: { color: "#008B78" }
                          }, "Consent attestations")
                        ]),
                        createVNode("h3", { class: "ofp-card__title" }, "attestation-schema.yaml"),
                        createVNode("p", { class: "ofp-card__desc" }, [
                          createTextVNode(" The append-only "),
                          createVNode("code", null, "attestations"),
                          createTextVNode(" sub-resource — POST and GET on "),
                          createVNode("code", null, "/{consent}/attestations"),
                          createTextVNode(" across Bank Data Sharing, Bank Service Initiation, and Insurance. ")
                        ]),
                        createVNode("div", { class: "ofp-card__foot" }, [
                          createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                          createVNode("span", {
                            class: "ofp-card__arrow",
                            style: { color: "#008B78" }
                          }, "→")
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "ofp-fields" }, [
                    createVNode("div", { class: "ofp-fields__label" }, "Request payload — the Attestation Event"),
                    createVNode("div", { class: "ofp-fields__scroll" }, [
                      createVNode("table", { class: "ofp-fields__table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { scope: "col" }, "Field"),
                            createVNode("th", { scope: "col" }, "Required"),
                            createVNode("th", { scope: "col" }, "Type"),
                            createVNode("th", { scope: "col" }, "Description")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(), createBlock(Fragment, null, renderList(requestFields, (f) => {
                            return createVNode("tr", {
                              key: f.path
                            }, [
                              createVNode("td", { class: "ofp-fields__path" }, toDisplayString(f.path), 1),
                              createVNode("td", { class: "ofp-fields__req" }, [
                                createVNode("span", {
                                  class: ["ofp-fields__pill", reqClass(f.req)]
                                }, toDisplayString(f.req), 3)
                              ]),
                              createVNode("td", { class: "ofp-fields__type" }, toDisplayString(f.type), 1),
                              createVNode("td", { class: "ofp-fields__desc" }, toDisplayString(f.desc), 1)
                            ]);
                          }), 64))
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-fields" }, [
                    createVNode("div", { class: "ofp-fields__label" }, "Response payload — the receipt (201)"),
                    createVNode("div", { class: "ofp-fields__scroll" }, [
                      createVNode("table", { class: "ofp-fields__table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { scope: "col" }, "Field"),
                            createVNode("th", { scope: "col" }, "Required"),
                            createVNode("th", { scope: "col" }, "Type"),
                            createVNode("th", { scope: "col" }, "Description")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(), createBlock(Fragment, null, renderList(responseFields, (f) => {
                            return createVNode("tr", {
                              key: f.path
                            }, [
                              createVNode("td", { class: "ofp-fields__path" }, toDisplayString(f.path), 1),
                              createVNode("td", { class: "ofp-fields__req" }, [
                                createVNode("span", {
                                  class: ["ofp-fields__pill", reqClass(f.req)]
                                }, toDisplayString(f.req), 3)
                              ]),
                              createVNode("td", { class: "ofp-fields__type" }, toDisplayString(f.type), 1),
                              createVNode("td", { class: "ofp-fields__desc" }, toDisplayString(f.desc), 1)
                            ]);
                          }), 64))
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
                      createTextVNode(" 09 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What an attestations sub-resource buys")
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
                      createTextVNode(" 10 · Cons")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/proposals/ofp-005/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f95542a"]]);
export {
  index as default
};
