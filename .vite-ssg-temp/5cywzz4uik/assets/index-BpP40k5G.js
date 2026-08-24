import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, unref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "OFP-010 · Make the transaction narrative (TransactionInformation) a required field";
const OG_DESCRIPTION = "Make TransactionInformation — the transaction narrative — a required field on every transaction the API returns. The narrative is what powers categorisation, affordability, and underwriting; without it the dataset is close to meaningless. Codifies what Nebras already enforces for CASA into the spec, and asks the ecosystem whether it is achievable for every product.";
const exampleToday = `# GET /accounts/{AccountId}/transactions · AETransaction — today
required:
  - TransactionId
  - CreditDebitIndicator
  - Status
  - BookingDateTime
  - Amount
  - TransactionDateTime
  - TransactionType
  - SubTransactionType
  # TransactionInformation is DEFINED but not required:
properties:
  TransactionInformation:
    description: The transaction narrative — unstructured text.
    type: string
    minLength: 1
    maxLength: 500`;
const exampleProposed = `# GET /accounts/{AccountId}/transactions · AETransaction — proposed
required:
  - TransactionId
  - CreditDebitIndicator
  - Status
  - BookingDateTime
  - Amount
  - TransactionDateTime
  - TransactionType
  - SubTransactionType
  - TransactionInformation        # ← added; field bounds unchanged (1–500)`;
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
      id: "OFP-010",
      proposedBy: "Nebras",
      author: "Nowaier AlQahtani",
      // Fallbacks shown until the API responds (and during the static build).
      opened: "30 Jul 2026",
      closes: "19 Aug 2026",
      priority: "high",
      version: "V2.2"
    };
    const pros = [
      "The dataset gains its meaning. The narrative is what turns a row of amounts and dates into something a TPP can act on — categorisation, affordability assessment, and underwriting all read from it. Without it the payload is close to inert.",
      "Codifies a rule Nebras already enforces. Where CASA transaction data has arrived without narratives, Nebras has required remediation plans before functional sign-off. Making the field required turns that case-by-case remediation into a published, testable conformance rule.",
      "One consistent expectation across every LFI — the narrative can no longer be silently dropped by some institutions and populated by others, which is what makes cross-LFI data comparable.",
      "A missing narrative is caught at functional certification, before production, rather than surfacing as a data-quality gap once TPPs are live.",
      "Minimal, additive spec change: the field already exists and is already sized (1–500 characters). This only adds it to the transaction object’s required list — no new fields, no shape changes."
    ];
    const cons = [
      "The rule was shaped by CASA. Current and savings accounts reliably carry a narrative; credit cards, personal finance, mortgages, and SME / corporate accounts may source it differently — or, for some product cores, not populate it at all.",
      "An LFI whose core does not emit a narrative for a given product line would need a core or mapping change to comply — a real remediation cost, not just a schema toggle.",
      "A hard presence check guarantees the field is there, not that it is useful. It invites placeholder padding (“-”, “N/A”, “Transaction”) that passes validation while defeating the intent.",
      "The transaction object is a single shared schema — required is all-or-nothing across products. It cannot, as written, say “required for CASA, optional for mortgages”.",
      "Because this is a response field, strict runtime rejection is blunt: one transaction missing a narrative could fail validation for an entire page of results. Primary enforcement therefore sits at certification, not at every live call."
    ];
    const validRefs = [
      { ref: "CARREFOUR HYPERMARKET, DUBAI MALL", note: "Debit — merchant and location" },
      { ref: "SALARY — ACME TRADING LLC", note: "Credit — payer identified" },
      { ref: "ATM Withdrawal — ADCB, Sheikh Zayed Rd", note: "Cash — channel and site" },
      { ref: "Etisalat postpaid bill", note: "Bill payment — biller named" },
      { ref: "IB Transfer to A. Khan — rent", note: "Transfer — counterparty and reason" }
    ];
    const invalidRefs = [
      { ref: "(field omitted)", note: "Fails: the field is now required and absent" },
      { ref: "-", note: "Passes schema, defeats intent — placeholder padding" },
      { ref: "N/A", note: "Passes schema, defeats intent — no narrative" },
      { ref: "Transaction", note: "Passes schema, defeats intent — generic filler" },
      { ref: "TXN", note: "Passes schema, defeats intent — carries nothing" }
    ];
    const asks = [
      {
        n: "Q1",
        text: "Cross-product achievability — this is the central question. The narrative is dependable for CASA, but the transactions endpoint is shared across credit cards, personal finance, mortgages, and SME / corporate accounts. For each of those, can your core reliably supply a meaningful narrative for every transaction? Where it cannot today, what would remediation involve, and how long would it take? Making the field required binds every product at once — we need to know where that is not achievable before we commit."
      }
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
        title: "Make the transaction narrative a required field",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-2d1ea041><section class="ofp-hero" data-v-2d1ea041><div class="ofp-hero__inner" data-v-2d1ea041>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-2d1ea041${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-2d1ea041><span class="ofp__id" data-v-2d1ea041>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-2d1ea041></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-2d1ea041>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-2d1ea041>Make the transaction narrative a required field</h1><p class="ofp__summary" data-v-2d1ea041> Add <code data-v-2d1ea041>TransactionInformation</code> — the transaction narrative — to the required list on every transaction the data-sharing API returns. The narrative is what powers categorisation, affordability, and underwriting; without it the dataset is close to meaningless. This codifies what Nebras already enforces for CASA, and asks the ecosystem whether it is achievable for <em data-v-2d1ea041>every</em> product. </p><div class="ofp__strip" data-v-2d1ea041><div class="ofp__strip-item" data-v-2d1ea041><div class="ofp__strip-key" data-v-2d1ea041>Proposed by</div><div class="ofp__strip-val" data-v-2d1ea041>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-2d1ea041><div class="ofp__strip-key" data-v-2d1ea041>Author</div><div class="ofp__strip-val" data-v-2d1ea041>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-2d1ea041><div class="ofp__strip-key" data-v-2d1ea041>Target version</div><div class="ofp__strip-val" data-v-2d1ea041>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-2d1ea041><div class="ofp__strip-key" data-v-2d1ea041>Opened</div><div class="ofp__strip-val" data-v-2d1ea041>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-2d1ea041><div class="ofp__strip-key" data-v-2d1ea041>Closes</div><div class="ofp__strip-val" data-v-2d1ea041>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-2d1ea041${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-2d1ea041${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-2d1ea041${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-2d1ea041${_scopeId}><div class="ofp-vote-cover__card" data-v-2d1ea041${_scopeId}><div class="ofp-vote-cover__label" data-v-2d1ea041${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-2d1ea041${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="${ssrRenderClass([{ "ofp-band--seam": !showTabs.value }, "ofp-band ofp-band--cream"])}" data-v-2d1ea041${_scopeId}>`);
            if (!showTabs.value) {
              _push2(`<span class="ofp-seam-label" data-v-2d1ea041${_scopeId}>The proposal</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>The narrative is the value — and it is optional</h2></div><div class="ofp-prose" data-v-2d1ea041${_scopeId}><p data-v-2d1ea041${_scopeId}> A transaction returned from `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-2d1ea041${_scopeId2}>GET /accounts/{AccountId}/transactions</code>`);
                } else {
                  return [
                    createVNode("code", null, "GET /accounts/{AccountId}/transactions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` carries the structured essentials — an amount, a date, a credit/debit indicator, and a type. What tells a TPP what the transaction was actually <em data-v-2d1ea041${_scopeId}>for</em> is the narrative: the free-text <code data-v-2d1ea041${_scopeId}>TransactionInformation</code> field. It is an important input to many Open Finance use cases, including <strong data-v-2d1ea041${_scopeId}>categorisation</strong>, <strong data-v-2d1ea041${_scopeId}>affordability assessment</strong>, and <strong data-v-2d1ea041${_scopeId}>underwriting</strong>. Strip it out and a statement collapses into a column of amounts a TPP cannot reason about. </p><p data-v-2d1ea041${_scopeId}> Yet in the specification the field is <strong data-v-2d1ea041${_scopeId}>defined but not required</strong>. In the TPP Standards spec, <code data-v-2d1ea041${_scopeId}>TransactionInformation</code> is a <code data-v-2d1ea041${_scopeId}>string</code> of 1–500 characters described as “the transaction narrative, which is unstructured text”, but it does not appear in the <code data-v-2d1ea041${_scopeId}>AETransaction</code> required list. The picture is the same on the LFI side: the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ozone Connect`);
                } else {
                  return [
                    createTextVNode(" Ozone Connect")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` <code data-v-2d1ea041${_scopeId}>transactionInformation</code> field is optional on <code data-v-2d1ea041${_scopeId}>CbuaeTransaction</code> too. An LFI can therefore return a schema-valid transactions response with no narrative at all. </p><p data-v-2d1ea041${_scopeId}> In practice Nebras has not accepted that. Where an LFI’s <strong data-v-2d1ea041${_scopeId}>CASA</strong> transaction data has arrived without narratives, it has been treated as a functional-certification failure and a <strong data-v-2d1ea041${_scopeId}>remediation plan has been required</strong> before sign-off — because a dataset without the narrative is not a functioning dataset. This proposal asks that we stop enforcing that case by case and <strong data-v-2d1ea041${_scopeId}>write it into the standard</strong>. </p><p data-v-2d1ea041${_scopeId}> The complication is scope. The remediation practice grew up around CASA — current and savings accounts, where a narrative is dependable. But the transactions endpoint is a <strong data-v-2d1ea041${_scopeId}>single shared schema</strong> used for every product: credit cards, personal finance, mortgages, and SME / corporate accounts all report through it. We have not scrutinised the narrative for those products the way we have for CASA. Making the field technically required turns it on for all of them at once — so the honest question this proposal puts to the ecosystem is whether every LFI can actually supply it, for every product. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>Require it on the transaction object</h2></div><div class="ofp-prose" data-v-2d1ea041${_scopeId}><p data-v-2d1ea041${_scopeId}> Add <code data-v-2d1ea041${_scopeId}>TransactionInformation</code> to the <code data-v-2d1ea041${_scopeId}>required</code> list of the transaction object, on both sides of the Hub: <code data-v-2d1ea041${_scopeId}>AETransaction</code> in the TPP Standards spec and <code data-v-2d1ea041${_scopeId}>transactionInformation</code> on <code data-v-2d1ea041${_scopeId}>CbuaeTransaction</code> in the Ozone Connect spec. The field already exists and is already sized — this is a one-line addition to a required array, not a new field or a shape change. Field bounds (1–500 characters) do not move. </p><p data-v-2d1ea041${_scopeId}> Because the LFI is the producer of this data, the obligation binds the LFI. It is asserted <strong data-v-2d1ea041${_scopeId}>primarily at functional certification</strong> — exactly where Nebras already asserts it for CASA — so that a narrative-less transactions response fails sign-off before production rather than being remediated ad hoc afterwards. Writing it into the schema makes the rule <strong data-v-2d1ea041${_scopeId}>published and testable</strong> instead of discretionary. </p><p data-v-2d1ea041${_scopeId}> The proposal deliberately recommends the <strong data-v-2d1ea041${_scopeId}>uniform</strong> change — required across every product — because that is what a schema-level requirement means, and because a consistent narrative across LFIs is what makes the data comparable. But it does not assume every product can meet it. Whether that is achievable for credit cards, personal finance, mortgages, and SME accounts is the <strong data-v-2d1ea041${_scopeId}>central open question</strong> below, and the answer may move us toward a product-scoped rule enforced at certification rather than in the schema. We would rather surface that trade-off than legislate through it. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-2d1ea041${_scopeId}> A single field added to the transaction object’s <code data-v-2d1ea041${_scopeId}>required</code> list on each side — field definition and bounds unchanged. </p></div><div class="ofp-changes" data-v-2d1ea041${_scopeId}><div class="ofp-change" data-v-2d1ea041${_scopeId}><div class="ofp-change__label" data-v-2d1ea041${_scopeId}>01 · TPP Standards spec</div><p data-v-2d1ea041${_scopeId}> Add <code data-v-2d1ea041${_scopeId}>TransactionInformation</code> to <code data-v-2d1ea041${_scopeId}>AETransaction.required</code> in <code data-v-2d1ea041${_scopeId}>uae-account-information-openapi.yaml</code>. The field’s own definition (<code data-v-2d1ea041${_scopeId}>string</code>, <code data-v-2d1ea041${_scopeId}>minLength 1</code>, <code data-v-2d1ea041${_scopeId}>maxLength 500</code>) is untouched. </p></div><div class="ofp-change" data-v-2d1ea041${_scopeId}><div class="ofp-change__label" data-v-2d1ea041${_scopeId}>02 · Ozone Connect spec</div><p data-v-2d1ea041${_scopeId}> Add <code data-v-2d1ea041${_scopeId}>transactionInformation</code> to <code data-v-2d1ea041${_scopeId}>CbuaeTransaction.required</code> in <code data-v-2d1ea041${_scopeId}>uae-ozone-connect-bank-data-sharing-openapi.yaml</code>, so the obligation binds the LFI as the data producer and the two sides stay in step. </p></div><div class="ofp-change" data-v-2d1ea041${_scopeId}><div class="ofp-change__label" data-v-2d1ea041${_scopeId}>03 · Align the Ozone Connect bounds</div><p data-v-2d1ea041${_scopeId}> The Ozone Connect <code data-v-2d1ea041${_scopeId}>transactionInformation</code> currently declares no length bounds. Add <code data-v-2d1ea041${_scopeId}>minLength 1</code> / <code data-v-2d1ea041${_scopeId}>maxLength 500</code> so both sides agree on what a valid narrative is — otherwise a field that is “required” could still be an empty string. </p></div><div class="ofp-change" data-v-2d1ea041${_scopeId}><div class="ofp-change__label" data-v-2d1ea041${_scopeId}>04 · Where it is enforced</div><p data-v-2d1ea041${_scopeId}> Primarily at <strong data-v-2d1ea041${_scopeId}>functional certification</strong>, against the LFI’s pre-production environment — the same gate at which Nebras already requires CASA narratives. Formalising it in the schema turns today’s case-by-case remediation into a standing conformance rule. </p></div><div class="ofp-change" data-v-2d1ea041${_scopeId}><div class="ofp-change__label" data-v-2d1ea041${_scopeId}>05 · Runtime behaviour</div><p data-v-2d1ea041${_scopeId}> This is a <em data-v-2d1ea041${_scopeId}>response</em> field, so strict runtime rejection is blunt: a single narrative missing from an LFI response would otherwise fail schema validation for a whole page of transactions. Certification is therefore the primary control; any runtime handling at the API Hub should be decided deliberately rather than defaulting to a hard reject. </p></div></div><div class="ofp-code" data-v-2d1ea041${_scopeId}><div class="ofp-code__label" data-v-2d1ea041${_scopeId}>Today — defined, but not required</div><pre class="ofp-code__pre" data-v-2d1ea041${_scopeId}>${ssrInterpolate(exampleToday)}</pre></div><div class="ofp-code" data-v-2d1ea041${_scopeId}><div class="ofp-code__label" data-v-2d1ea041${_scopeId}>Proposed — one line added to required</div><pre class="ofp-code__pre" data-v-2d1ea041${_scopeId}>${ssrInterpolate(exampleProposed)}</pre></div><div class="ofp-ex" data-v-2d1ea041${_scopeId}><div class="ofp-ex__col ofp-ex__col--ok" data-v-2d1ea041${_scopeId}><div class="ofp-ex__head" data-v-2d1ea041${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--ok" data-v-2d1ea041${_scopeId}>✓</span> Meaningful </div><ul class="ofp-ex__list" data-v-2d1ea041${_scopeId}><!--[-->`);
            ssrRenderList(validRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-2d1ea041${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-2d1ea041${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-2d1ea041${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div><div class="ofp-ex__col ofp-ex__col--no" data-v-2d1ea041${_scopeId}><div class="ofp-ex__head" data-v-2d1ea041${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--no" data-v-2d1ea041${_scopeId}>×</span> Defeats the purpose </div><ul class="ofp-ex__list" data-v-2d1ea041${_scopeId}><!--[-->`);
            ssrRenderList(invalidRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-2d1ea041${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-2d1ea041${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-2d1ea041${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></div><p class="ofp-ex__foot" data-v-2d1ea041${_scopeId}> Only the first row on the right is caught by the schema (the field is now required and absent). The rest pass a presence check yet carry no narrative — which is precisely what the quality question below is about. </p></div></section><section class="ofp-band ofp-band--white" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 04 · Pros</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>What requiring the narrative buys</h2></div><ul class="ofp-pros" data-v-2d1ea041${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-2d1ea041${_scopeId}><span class="ofp-pros__glyph" data-v-2d1ea041${_scopeId}>✓</span><span data-v-2d1ea041${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 05 · Cons</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-2d1ea041${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-2d1ea041${_scopeId}><span class="ofp-cons__glyph" data-v-2d1ea041${_scopeId}>×</span><span data-v-2d1ea041${_scopeId}>${ssrInterpolate(c)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-2d1ea041${_scopeId}><div class="ofp-band__inner" data-v-2d1ea041${_scopeId}><div class="ofp-band__head" data-v-2d1ea041${_scopeId}><div class="ofp-band__eyebrow" data-v-2d1ea041${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-2d1ea041${_scopeId}></span> 06 · Open questions</div><h2 class="ofp-band__title" data-v-2d1ea041${_scopeId}>What we’re asking the ecosystem</h2><p class="ofp-band__lede" data-v-2d1ea041${_scopeId}> The recommendation is uniform on purpose — but whether it is achievable everywhere is genuinely open. Settle this and it folds into the change. </p></div><ul class="ofp-asks" data-v-2d1ea041${_scopeId}><!--[-->`);
            ssrRenderList(asks, (a) => {
              _push2(`<li class="ofp-ask" data-v-2d1ea041${_scopeId}><span class="ofp-ask__num" data-v-2d1ea041${_scopeId}>${ssrInterpolate(a.n)}</span><div class="ofp-ask__text" data-v-2d1ea041${_scopeId}>${ssrInterpolate(a.text)}</div></li>`);
            });
            _push2(`<!--]--></ul></div></section>`);
          } else {
            return [
              createVNode("section", {
                class: ["ofp-band ofp-band--cream", { "ofp-band--seam": !showTabs.value }]
              }, [
                !showTabs.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ofp-seam-label"
                }, "The proposal")) : createCommentVNode("", true),
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 01 · Background")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "The narrative is the value — and it is optional")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" A transaction returned from "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "GET /accounts/{AccountId}/transactions")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" carries the structured essentials — an amount, a date, a credit/debit indicator, and a type. What tells a TPP what the transaction was actually "),
                      createVNode("em", null, "for"),
                      createTextVNode(" is the narrative: the free-text "),
                      createVNode("code", null, "TransactionInformation"),
                      createTextVNode(" field. It is an important input to many Open Finance use cases, including "),
                      createVNode("strong", null, "categorisation"),
                      createTextVNode(", "),
                      createVNode("strong", null, "affordability assessment"),
                      createTextVNode(", and "),
                      createVNode("strong", null, "underwriting"),
                      createTextVNode(". Strip it out and a statement collapses into a column of amounts a TPP cannot reason about. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Yet in the specification the field is "),
                      createVNode("strong", null, "defined but not required"),
                      createTextVNode(". In the TPP Standards spec, "),
                      createVNode("code", null, "TransactionInformation"),
                      createTextVNode(" is a "),
                      createVNode("code", null, "string"),
                      createTextVNode(" of 1–500 characters described as “the transaction narrative, which is unstructured text”, but it does not appear in the "),
                      createVNode("code", null, "AETransaction"),
                      createTextVNode(" required list. The picture is the same on the LFI side: the "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
                        default: withCtx(() => [
                          createTextVNode(" Ozone Connect")
                        ]),
                        _: 1
                      }),
                      createTextVNode(),
                      createVNode("code", null, "transactionInformation"),
                      createTextVNode(" field is optional on "),
                      createVNode("code", null, "CbuaeTransaction"),
                      createTextVNode(" too. An LFI can therefore return a schema-valid transactions response with no narrative at all. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" In practice Nebras has not accepted that. Where an LFI’s "),
                      createVNode("strong", null, "CASA"),
                      createTextVNode(" transaction data has arrived without narratives, it has been treated as a functional-certification failure and a "),
                      createVNode("strong", null, "remediation plan has been required"),
                      createTextVNode(" before sign-off — because a dataset without the narrative is not a functioning dataset. This proposal asks that we stop enforcing that case by case and "),
                      createVNode("strong", null, "write it into the standard"),
                      createTextVNode(". ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The complication is scope. The remediation practice grew up around CASA — current and savings accounts, where a narrative is dependable. But the transactions endpoint is a "),
                      createVNode("strong", null, "single shared schema"),
                      createTextVNode(" used for every product: credit cards, personal finance, mortgages, and SME / corporate accounts all report through it. We have not scrutinised the narrative for those products the way we have for CASA. Making the field technically required turns it on for all of them at once — so the honest question this proposal puts to the ecosystem is whether every LFI can actually supply it, for every product. ")
                    ])
                  ])
                ])
              ], 2),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 02 · Recommendation")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Require it on the transaction object")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Add "),
                      createVNode("code", null, "TransactionInformation"),
                      createTextVNode(" to the "),
                      createVNode("code", null, "required"),
                      createTextVNode(" list of the transaction object, on both sides of the Hub: "),
                      createVNode("code", null, "AETransaction"),
                      createTextVNode(" in the TPP Standards spec and "),
                      createVNode("code", null, "transactionInformation"),
                      createTextVNode(" on "),
                      createVNode("code", null, "CbuaeTransaction"),
                      createTextVNode(" in the Ozone Connect spec. The field already exists and is already sized — this is a one-line addition to a required array, not a new field or a shape change. Field bounds (1–500 characters) do not move. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Because the LFI is the producer of this data, the obligation binds the LFI. It is asserted "),
                      createVNode("strong", null, "primarily at functional certification"),
                      createTextVNode(" — exactly where Nebras already asserts it for CASA — so that a narrative-less transactions response fails sign-off before production rather than being remediated ad hoc afterwards. Writing it into the schema makes the rule "),
                      createVNode("strong", null, "published and testable"),
                      createTextVNode(" instead of discretionary. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The proposal deliberately recommends the "),
                      createVNode("strong", null, "uniform"),
                      createTextVNode(" change — required across every product — because that is what a schema-level requirement means, and because a consistent narrative across LFIs is what makes the data comparable. But it does not assume every product can meet it. Whether that is achievable for credit cards, personal finance, mortgages, and SME accounts is the "),
                      createVNode("strong", null, "central open question"),
                      createTextVNode(" below, and the answer may move us toward a product-scoped rule enforced at certification rather than in the schema. We would rather surface that trade-off than legislate through it. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What changes in the spec"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" A single field added to the transaction object’s "),
                      createVNode("code", null, "required"),
                      createTextVNode(" list on each side — field definition and bounds unchanged. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · TPP Standards spec"),
                      createVNode("p", null, [
                        createTextVNode(" Add "),
                        createVNode("code", null, "TransactionInformation"),
                        createTextVNode(" to "),
                        createVNode("code", null, "AETransaction.required"),
                        createTextVNode(" in "),
                        createVNode("code", null, "uae-account-information-openapi.yaml"),
                        createTextVNode(". The field’s own definition ("),
                        createVNode("code", null, "string"),
                        createTextVNode(", "),
                        createVNode("code", null, "minLength 1"),
                        createTextVNode(", "),
                        createVNode("code", null, "maxLength 500"),
                        createTextVNode(") is untouched. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Ozone Connect spec"),
                      createVNode("p", null, [
                        createTextVNode(" Add "),
                        createVNode("code", null, "transactionInformation"),
                        createTextVNode(" to "),
                        createVNode("code", null, "CbuaeTransaction.required"),
                        createTextVNode(" in "),
                        createVNode("code", null, "uae-ozone-connect-bank-data-sharing-openapi.yaml"),
                        createTextVNode(", so the obligation binds the LFI as the data producer and the two sides stay in step. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Align the Ozone Connect bounds"),
                      createVNode("p", null, [
                        createTextVNode(" The Ozone Connect "),
                        createVNode("code", null, "transactionInformation"),
                        createTextVNode(" currently declares no length bounds. Add "),
                        createVNode("code", null, "minLength 1"),
                        createTextVNode(" / "),
                        createVNode("code", null, "maxLength 500"),
                        createTextVNode(" so both sides agree on what a valid narrative is — otherwise a field that is “required” could still be an empty string. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Where it is enforced"),
                      createVNode("p", null, [
                        createTextVNode(" Primarily at "),
                        createVNode("strong", null, "functional certification"),
                        createTextVNode(", against the LFI’s pre-production environment — the same gate at which Nebras already requires CASA narratives. Formalising it in the schema turns today’s case-by-case remediation into a standing conformance rule. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "05 · Runtime behaviour"),
                      createVNode("p", null, [
                        createTextVNode(" This is a "),
                        createVNode("em", null, "response"),
                        createTextVNode(" field, so strict runtime rejection is blunt: a single narrative missing from an LFI response would otherwise fail schema validation for a whole page of transactions. Certification is therefore the primary control; any runtime handling at the API Hub should be decided deliberately rather than defaulting to a hard reject. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — defined, but not required"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleToday))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — one line added to required"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleProposed))
                  ]),
                  createVNode("div", { class: "ofp-ex" }, [
                    createVNode("div", { class: "ofp-ex__col ofp-ex__col--ok" }, [
                      createVNode("div", { class: "ofp-ex__head" }, [
                        createVNode("span", { class: "ofp-ex__glyph ofp-ex__glyph--ok" }, "✓"),
                        createTextVNode(" Meaningful ")
                      ]),
                      createVNode("ul", { class: "ofp-ex__list" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(validRefs, (e, i) => {
                          return createVNode("li", {
                            key: `ok-${i}`,
                            class: "ofp-ex__item"
                          }, [
                            createVNode("code", {
                              class: "ofp-ex__ref",
                              dir: "auto"
                            }, toDisplayString(e.ref), 1),
                            createVNode("span", { class: "ofp-ex__note" }, toDisplayString(e.note), 1)
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "ofp-ex__col ofp-ex__col--no" }, [
                      createVNode("div", { class: "ofp-ex__head" }, [
                        createVNode("span", { class: "ofp-ex__glyph ofp-ex__glyph--no" }, "×"),
                        createTextVNode(" Defeats the purpose ")
                      ]),
                      createVNode("ul", { class: "ofp-ex__list" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(invalidRefs, (e, i) => {
                          return createVNode("li", {
                            key: `no-${i}`,
                            class: "ofp-ex__item"
                          }, [
                            createVNode("code", {
                              class: "ofp-ex__ref",
                              dir: "auto"
                            }, toDisplayString(e.ref), 1),
                            createVNode("span", { class: "ofp-ex__note" }, toDisplayString(e.note), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ]),
                  createVNode("p", { class: "ofp-ex__foot" }, " Only the first row on the right is caught by the schema (the field is now required and absent). The rest pass a presence check yet carry no narrative — which is precisely what the quality question below is about. ")
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What requiring the narrative buys")
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
                      createTextVNode(" 05 · Cons")
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
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Open questions")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What we’re asking the ecosystem"),
                    createVNode("p", { class: "ofp-band__lede" }, " The recommendation is uniform on purpose — but whether it is achievable everywhere is genuinely open. Settle this and it folds into the change. ")
                  ]),
                  createVNode("ul", { class: "ofp-asks" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(asks, (a) => {
                      return createVNode("li", {
                        key: a.n,
                        class: "ofp-ask"
                      }, [
                        createVNode("span", { class: "ofp-ask__num" }, toDisplayString(a.n), 1),
                        createVNode("div", { class: "ofp-ask__text" }, toDisplayString(a.text), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-010/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d1ea041"]]);
export {
  index as default
};
