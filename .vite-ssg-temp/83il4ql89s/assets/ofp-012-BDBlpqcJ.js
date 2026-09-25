import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, unref, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-OrQM97fB.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-CQUj3a-B.js";
import { P as PvStatusPill } from "./PvStatusPill-L5QlvutR.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-DW7wSzQt.js";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "OFP-012 · Return transactions and statements newest-first";
const OG_DESCRIPTION = "Neither specification says which end of history a transactions or statements response starts from. This proposal makes descending date order — newest first — a requirement on both endpoints at V2.2, for every LFI including those already live, and asks whether TPPs need to request ascending order later.";
const todayExample = `# Today — neither specification constrains the order

# TPP-facing (uae-account-information-openapi.yaml)
GET /accounts/{AccountId}/transactions?fromBookingDateTime=...&toBookingDateTime=...
GET /accounts/{AccountId}/statements?fromStatementDate=...&toStatementDate=...

# Ozone Connect (uae-ozone-connect-bank-data-sharing-openapi.yaml)
GET /accounts/{accountId}/transactions?fromBookingDateTime=...&page=1&page-size=100
  "Return all transactions for the account, filtered on date range parameters
   as required."

# No sort parameter. No ordering statement. A TPP holding page 1 has no way to
# know whether it is this month's activity or activity from two years ago — and
# no way to ask for the other one.`;
const proposedExample = `# Proposed — one direction, defined for both endpoints

GET /accounts/{accountId}/transactions
  order by  bookingDateTime  DESC   # MUST   — newest first
            transactionId    DESC   # SHOULD — stable tiebreaker

GET /accounts/{accountId}/statements
  order by  openingDate      DESC   # MUST   — newest first
            statementId      DESC   # SHOULD — stable tiebreaker

# Applied to the FILTERED result set, before it is paged. Page 1 therefore
# always carries the most recent records the query matched.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ofp-012",
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
      id: "OFP-012",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "8 Sep 2026",
      closes: "23 Sep 2026",
      priority: "medium",
      version: "V2.2"
    };
    const questions = [
      {
        who: "LFIs already live with transactions",
        q: "Would newest-first ordering change your implementation, and what work would it involve?",
        why: "This is the question that decides whether the requirement is a one-line sort clause or a change to how a feed is built. If a meaningful number of live LFIs answer that it is structural, the transition treatment below is the part to revisit."
      },
      {
        who: "TPPs",
        q: "Does newest-first work for your use cases, or do you need to request ascending order?",
        why: "Descending suits the common case — showing recent activity. Reconciliation and running-balance reconstruction read oldest-first, and under pagination that means collecting every page before processing. We need to know whether that cost is real for anyone."
      },
      {
        who: "LFIs",
        q: "Could you support a TPP-requested asc/desc sort control, or is a fixed descending order materially easier?",
        why: "A control is only worth specifying if LFIs can implement it. If descending-only is materially easier, that settles it — and the answers to the TPP question tell us what we are asking TPPs to give up."
      }
    ];
    const pros = [
      "TPPs can rely on the order for the first time. “Show me this customer’s recent activity” becomes the first page of the response rather than a full pull-and-sort of the filtered set.",
      "Removes a silent interop difference. Ordering is the kind of assumption a TPP makes against one LFI in the sandbox and only discovers is wrong against another in production — where it surfaces as a mis-ordered account view, not an error.",
      "Newest-first matches how account activity is read almost everywhere else — banking apps, card statements, the account views TPPs are building. It is the direction the common case wants.",
      "Cheapest to fix now. Ordering is set by the query that already serves these endpoints, so for most LFIs this is a sort clause and a regression test — and only a handful of LFIs are live to change.",
      "Tightens pagination stability at the same time. The tiebreaker guidance addresses a real failure: rows sharing a date can shuffle between page requests, so a record appears twice on one page and never on another.",
      "Makes conformance testable. A functional check can assert newest-first across a multi-page query; “deterministic” alone is hard to test meaningfully."
    ];
    const cons = [
      "It is a behaviour change for any LFI already live that returns oldest-first, and this proposal gives them no grace period — they conform at V2.2 with everyone else.",
      "Consumers that read forwards — reconciliation, ledger replay, reconstructing a running balance — must reverse the order themselves, and under pagination that means collecting the whole filtered set before they can start. The cost of the choice lands on that use case.",
      "If the consultation says a sort control is wanted, LFIs implement ordering twice: a fixed descending order now, and a direction control in a later version.",
      "The statement ordering key is less self-evident than the transaction one. An LFI that thinks of a statement by its issue date (StatementDate) rather than the start of its period (OpeningDate) has a mapping to make, even though the date filters already act on OpeningDate.",
      "It settles direction without settling choice. A TPP that wants ascending has no way to ask for it until a later proposal, and this one deliberately does not answer that."
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
        title: "Return transactions and statements newest-first",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-c77b8d5c><section class="ofp-hero" data-v-c77b8d5c><div class="ofp-hero__inner" data-v-c77b8d5c>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-c77b8d5c${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-c77b8d5c><span class="ofp__id" data-v-c77b8d5c>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-c77b8d5c></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-c77b8d5c>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-c77b8d5c>Return transactions and statements newest-first</h1><p class="ofp__summary" data-v-c77b8d5c> Neither specification says which end of history a transactions or statements response starts from. A TPP holding page 1 cannot tell whether it is this month’s activity or activity from two years ago, and has no way to ask for the other one. This proposal makes <strong data-v-c77b8d5c>descending date order — newest first — a requirement</strong> on both endpoints at V2.2, for every LFI including those already live. Whether TPPs should later be able to request ascending order is asked, not answered. </p><div class="ofp__strip" data-v-c77b8d5c><div class="ofp__strip-item" data-v-c77b8d5c><div class="ofp__strip-key" data-v-c77b8d5c>Proposed by</div><div class="ofp__strip-val" data-v-c77b8d5c>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-c77b8d5c><div class="ofp__strip-key" data-v-c77b8d5c>Author</div><div class="ofp__strip-val" data-v-c77b8d5c>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-c77b8d5c><div class="ofp__strip-key" data-v-c77b8d5c>Target</div><div class="ofp__strip-val" data-v-c77b8d5c>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-c77b8d5c><div class="ofp__strip-key" data-v-c77b8d5c>Opened</div><div class="ofp__strip-val" data-v-c77b8d5c>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-c77b8d5c><div class="ofp__strip-key" data-v-c77b8d5c>Closes</div><div class="ofp__strip-val" data-v-c77b8d5c>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-c77b8d5c${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-c77b8d5c${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. <strong data-v-c77b8d5c${_scopeId}>Three questions are attached to this vote</strong> — set out in section 06 below — and the answers matter more than the tally: they decide whether the transition treatment holds and whether a sort control follows in a later version. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-c77b8d5c${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-c77b8d5c${_scopeId}><div class="ofp-vote-cover__card" data-v-c77b8d5c${_scopeId}><div class="ofp-vote-cover__label" data-v-c77b8d5c${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-c77b8d5c${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                      createTextVNode(" — set out in section 06 below — and the answers matter more than the tally: they decide whether the transition treatment holds and whether a sort control follows in a later version. ")
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-c77b8d5c${_scopeId}><span class="ofp-seam-label" data-v-c77b8d5c${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>Nothing says which end of history a page starts from</h2></div><div class="ofp-prose" data-v-c77b8d5c${_scopeId}><p data-v-c77b8d5c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-c77b8d5c${_scopeId2}>GET /accounts/{AccountId}/transactions</code>`);
                } else {
                  return [
                    createVNode("code", null, "GET /accounts/{AccountId}/transactions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` and `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-c77b8d5c${_scopeId2}>GET /accounts/{AccountId}/statements</code>`);
                } else {
                  return [
                    createVNode("code", null, "GET /accounts/{AccountId}/statements")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` both return a list that can run to thousands of records across a mandated two years of history. Neither the TPP-facing standard nor the Ozone Connect specification says what order that list arrives in, and neither offers a parameter to ask for one. </p><div class="ofp-code" data-v-c77b8d5c${_scopeId}><div class="ofp-code__label" data-v-c77b8d5c${_scopeId}>Today — the order is whatever each LFI’s query happens to produce</div><pre class="ofp-code__pre" data-v-c77b8d5c${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><p data-v-c77b8d5c${_scopeId}> The only ordering rule that exists anywhere is ours, not the specification’s: the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/knowledge-base/articles/pagination" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Pagination`);
                } else {
                  return [
                    createTextVNode("Pagination")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` article requires an LFI to return records in a <strong data-v-c77b8d5c${_scopeId}>deterministic</strong> order so that paging is stable across successive page requests. Deterministic is not a direction. An LFI returning oldest-first and an LFI returning newest-first are both conformant today, and a TPP integrating with both gets two different answers to the same question. </p><p data-v-c77b8d5c${_scopeId}> The consequences land entirely on the TPP, and they are not small. It cannot treat page 1 as recent activity, so the common case — showing a customer what has just happened on their account — requires pulling <em data-v-c77b8d5c${_scopeId}>every</em> page of the filtered set and sorting client-side before anything can be displayed. It cannot bound work by asking for the last fifty transactions. And because the difference is invisible until it meets a second LFI, it is the kind of assumption that survives the sandbox and fails in production — surfacing as a mis-ordered account view rather than an error anyone can catch. </p><p data-v-c77b8d5c${_scopeId}> The related weakness is <strong data-v-c77b8d5c${_scopeId}>stability</strong>. Both endpoints filter on a date field that is not unique: transactions share a <code data-v-c77b8d5c${_scopeId}>bookingDateTime</code> routinely, and statements carry an <code data-v-c77b8d5c${_scopeId}>OpeningDate</code> that is a date, not a timestamp. If an LFI orders on that field alone, two records that tie can be returned in either order on either request — so walking pages can hand a TPP the same record twice and never show it another. That is permitted by “deterministic” only on a generous reading of it. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>Newest first, on both endpoints, from V2.2</h2></div><div class="ofp-prose" data-v-c77b8d5c${_scopeId}><p data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>Transactions and statements MUST be returned in descending date order — newest first.</strong> The ordering applies to the filtered result set and is applied before pagination, so the first page always carries the most recent records the query matched. </p><div class="ofp-code" data-v-c77b8d5c${_scopeId}><div class="ofp-code__label" data-v-c77b8d5c${_scopeId}>Proposed — the rule, stated once, for both endpoints</div><pre class="ofp-code__pre" data-v-c77b8d5c${_scopeId}>${ssrInterpolate(proposedExample)}</pre></div><p data-v-c77b8d5c${_scopeId}> Descending is chosen because it serves the common case without a client-side pass. Account aggregation, spending views, notifications, and the “what happened recently” question that most TPP journeys open with all read backwards from today — and it is the direction a customer already sees in every banking app they use. Under pagination the direction decides which page holds the answer: newest-first puts it on page 1, oldest-first puts it on the last page the TPP can only reach by fetching all of them. </p><p data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>The requirement applies to every LFI at V2.2, including those already live.</strong> No grace period is proposed. Ordering is a property of the query that already serves these endpoints rather than of the data model, so for most implementations this is a sort clause and a regression test — and the cost of leaving it unspecified compounds with every LFI and TPP that joins. Whether that reading holds for LFIs who have already built is the first question attached to this vote, and a clear answer to the contrary is the thing that would reopen it. </p><p data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>This proposal does not introduce a way to request ascending order.</strong> A direction control — a request header or query parameter carrying <code data-v-c77b8d5c${_scopeId}>asc</code> / <code data-v-c77b8d5c${_scopeId}>desc</code> — is a reasonable thing to want and a different thing to specify: it doubles what an LFI must implement and test, and it is only worth defining if LFIs can support it and TPPs would use it. Both are asked in section 06. If the answers point that way, a control follows as its own proposal against a later version, with descending remaining the default. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 03 · Scope and behaviour</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>What “newest first” means, precisely</h2><p class="ofp-band__lede" data-v-c77b8d5c${_scopeId}> An ordering rule is only worth having if two LFIs reading it independently produce the same sequence, so the key, the tiebreaker, and the interaction with filtering and paging all have to be pinned down. </p></div><div class="ofp-prose" data-v-c77b8d5c${_scopeId}><div class="ofp-rules" data-v-c77b8d5c${_scopeId}><div class="ofp-rules__label" data-v-c77b8d5c${_scopeId}>Proposed rules</div><ul class="ofp-rules__list" data-v-c77b8d5c${_scopeId}><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>Transactions MUST be ordered by <code data-v-c77b8d5c${_scopeId}>bookingDateTime</code>, descending.</strong> This is the field the existing <code data-v-c77b8d5c${_scopeId}>fromBookingDateTime</code> / <code data-v-c77b8d5c${_scopeId}>toBookingDateTime</code> filters already act on, so filtering, ordering, and paging all address the same value. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>Statements MUST be ordered by <code data-v-c77b8d5c${_scopeId}>OpeningDate</code>, descending</strong> — the start of the statement period. Again this is the field the <code data-v-c77b8d5c${_scopeId}>fromStatementDate</code> / <code data-v-c77b8d5c${_scopeId}>toStatementDate</code> filters act on. <code data-v-c77b8d5c${_scopeId}>StatementDate</code> (when the statement was issued) and <code data-v-c77b8d5c${_scopeId}>ClosingDate</code> are deliberately not used: ordering on a field the filters do not use would let a statement fall inside the requested range and outside the expected position. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>A stable, unique tiebreaker SHOULD be applied</strong> — <code data-v-c77b8d5c${_scopeId}>transactionId</code> for transactions, <code data-v-c77b8d5c${_scopeId}>StatementId</code> for statements — so that records sharing a date hold a fixed relative position across requests. Without one, ties can be returned in either order on either request, and walking pages can duplicate a record on one page while dropping it from another. It is a SHOULD rather than a MUST because an LFI whose ledger already guarantees a total order by other means satisfies the intent; what matters is that ties never move. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>Ordering is applied to the filtered result set, before pagination.</strong> This extends the existing rule that filtering is applied first and pagination to the filtered set; ordering sits between them. <code data-v-c77b8d5c${_scopeId}>totalRecords</code> and <code data-v-c77b8d5c${_scopeId}>totalPages</code> are unaffected. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>The order does not vary with the request.</strong> Date filters, <code data-v-c77b8d5c${_scopeId}>page</code>, <code data-v-c77b8d5c${_scopeId}>page-size</code>, and the <code data-v-c77b8d5c${_scopeId}>o3-fx-transactions</code> header narrow <em data-v-c77b8d5c${_scopeId}>which</em> records are returned; none of them change the direction they are returned in. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>The API Hub passes the LFI’s order through unchanged.</strong> It converts the LFI’s <code data-v-c77b8d5c${_scopeId}>meta</code> into the TPP-facing <code data-v-c77b8d5c${_scopeId}>Links</code> envelope and does not re-sort, so the order the TPP observes is the order Ozone Connect produced. The requirement therefore has to be met at the LFI; there is no Hub-side correction. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>No sort control is introduced.</strong> Neither specification gains a sort parameter or header under this proposal. The order is fixed, and a TPP that needs ascending reverses it itself. </li><li data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>Other list endpoints are out of scope.</strong><code data-v-c77b8d5c${_scopeId}>/beneficiaries</code>, <code data-v-c77b8d5c${_scopeId}>/direct-debits</code>, <code data-v-c77b8d5c${_scopeId}>/scheduled-payments</code>, <code data-v-c77b8d5c${_scopeId}>/standing-orders</code>, <code data-v-c77b8d5c${_scopeId}>/products</code>, <code data-v-c77b8d5c${_scopeId}>/accounts</code> and <code data-v-c77b8d5c${_scopeId}>/accounts/{accountId}/customer</code> are unaffected and remain subject only to the existing deterministic-order rule. They are small, optionally paginated, and mostly carry no obvious date to sort on. </li></ul></div><p data-v-c77b8d5c${_scopeId}> Insurance Data Sharing is not covered by this proposal. If the ecosystem wants the same treatment for policy-level history, it should be raised separately rather than folded in here, where the endpoints, filters, and pagination behaviour are different. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 04 · Technical changes</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>What changes</h2><p class="ofp-band__lede" data-v-c77b8d5c${_scopeId}> No schema changes, no new fields, no new parameters. Four endpoint descriptions, the documentation that describes them, and a conformance check. </p></div><div class="ofp-changes" data-v-c77b8d5c${_scopeId}><div class="ofp-change" data-v-c77b8d5c${_scopeId}><div class="ofp-change__label" data-v-c77b8d5c${_scopeId}>01 · Ozone Connect specification</div><p data-v-c77b8d5c${_scopeId}> In the bank data sharing specification, state the ordering requirement on <code data-v-c77b8d5c${_scopeId}>GET /accounts/{accountId}/transactions</code> and <code data-v-c77b8d5c${_scopeId}>GET /accounts/{accountId}/statements</code> — the key, the direction, the tiebreaker, and that ordering precedes pagination. This is the normative home of the rule, because this is the surface the LFI implements. Targets <strong data-v-c77b8d5c${_scopeId}>V2.2</strong>. </p></div><div class="ofp-change" data-v-c77b8d5c${_scopeId}><div class="ofp-change__label" data-v-c77b8d5c${_scopeId}>02 · Standards specification</div><p data-v-c77b8d5c${_scopeId}> Mirror the statement on the TPP-facing <code data-v-c77b8d5c${_scopeId}>GET /accounts/{AccountId}/transactions</code> and <code data-v-c77b8d5c${_scopeId}>GET /accounts/{AccountId}/statements</code> in the account information specification, so a TPP reading only the standard knows what it can rely on without inferring it from the LFI-facing spec. No request or response schema changes. </p></div><div class="ofp-change" data-v-c77b8d5c${_scopeId}><div class="ofp-change__label" data-v-c77b8d5c${_scopeId}>03 · Documentation</div><p data-v-c77b8d5c${_scopeId}> Tighten the ordering line in the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/knowledge-base/articles/pagination" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Pagination`);
                } else {
                  return [
                    createTextVNode("Pagination")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` article and the LFI `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Bank Data Sharing — Pagination`);
                } else {
                  return [
                    createTextVNode("Bank Data Sharing — Pagination")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` guide from “deterministic” to “deterministic and descending”, with the tiebreaker and the duplicate-record failure it prevents spelled out. Add the guarantee to the TPP Data Sharing API guide so it is stated where TPPs read, and record the change as an errata entry. </p></div><div class="ofp-change" data-v-c77b8d5c${_scopeId}><div class="ofp-change__label" data-v-c77b8d5c${_scopeId}>04 · Functional certification</div><p data-v-c77b8d5c${_scopeId}> Add a Data Sharing check that walks a multi-page transactions query and asserts the order is descending across the page boundary, and that re-requesting a page returns the same records in the same positions. This is what makes the requirement enforceable rather than aspirational — and it is a check that “deterministic” on its own could never support. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 05 · What this costs to build</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>A sort clause for most LFIs — but not, necessarily, for all</h2></div><div class="ofp-prose" data-v-c77b8d5c${_scopeId}><p data-v-c77b8d5c${_scopeId}> For an LFI serving these endpoints from a query against a ledger or transaction store, this is an <code data-v-c77b8d5c${_scopeId}>ORDER BY</code>, a tiebreaker column, and a regression test that walks two pages. That is the expectation this proposal is written on, and it is why no grace period is offered. </p><p data-v-c77b8d5c${_scopeId}> It is not universally true. An LFI serving transactions from a cache, a materialised feed, or an event log built forwards in time may find that reversing the order means reversing how that feed is built or indexed — a different size of change, and one that has to be scheduled rather than absorbed. An LFI whose statement records are keyed by issue date rather than <code data-v-c77b8d5c${_scopeId}>OpeningDate</code> has a mapping to make on top. <strong data-v-c77b8d5c${_scopeId}>Nobody outside those LFIs can size this, which is exactly why it is the first question attached to the vote.</strong></p><p data-v-c77b8d5c${_scopeId}> For a TPP, conforming costs nothing — the guarantee only adds something to rely on. The cost falls on the TPP that wanted the other direction: reconciliation and running-balance work reads forwards, and reversing a paginated response means holding the whole filtered set before processing can start. That is a real cost, and section 06 asks who carries it. </p><p data-v-c77b8d5c${_scopeId}> A vote in favour is a statement that your institution would <em data-v-c77b8d5c${_scopeId}>conform to</em> this — an LFI that it would return newest-first at V2.2 without a transition period, a TPP that it would build against a fixed descending order. Answering the questions matters more than the tally: a For vote with “this is a two-line change for us” and a For vote with “this rebuilds our feed” mean different things, and the second is what would change the proposal. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 06 · Questions</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>Three questions, asked with the vote</h2><p class="ofp-band__lede" data-v-c77b8d5c${_scopeId}> These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees all three. The vote decides descending order; these answers decide whether the transition holds and whether a direction control follows. </p></div><div class="ofp-prose" data-v-c77b8d5c${_scopeId}><div class="ofp-changes" data-v-c77b8d5c${_scopeId}><!--[-->`);
            ssrRenderList(questions, (item, i) => {
              _push2(`<div class="ofp-change" data-v-c77b8d5c${_scopeId}><div class="ofp-change__label" data-v-c77b8d5c${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))} · ${ssrInterpolate(item.who)}</div><p data-v-c77b8d5c${_scopeId}><strong data-v-c77b8d5c${_scopeId}>${ssrInterpolate(item.q)}</strong></p><p data-v-c77b8d5c${_scopeId}>${ssrInterpolate(item.why)}</p></div>`);
            });
            _push2(`<!--]--></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 07 · Pros</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>What a defined order buys</h2></div><ul class="ofp-pros" data-v-c77b8d5c${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-c77b8d5c${_scopeId}><span class="ofp-pros__glyph" data-v-c77b8d5c${_scopeId}>✓</span><span data-v-c77b8d5c${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-c77b8d5c${_scopeId}><div class="ofp-band__inner" data-v-c77b8d5c${_scopeId}><div class="ofp-band__head" data-v-c77b8d5c${_scopeId}><div class="ofp-band__eyebrow" data-v-c77b8d5c${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-c77b8d5c${_scopeId}></span> 08 · Cons</div><h2 class="ofp-band__title" data-v-c77b8d5c${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-c77b8d5c${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-c77b8d5c${_scopeId}><span class="ofp-cons__glyph" data-v-c77b8d5c${_scopeId}>×</span><span data-v-c77b8d5c${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "Nothing says which end of history a page starts from")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "GET /accounts/{AccountId}/transactions")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" and "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "GET /accounts/{AccountId}/statements")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" both return a list that can run to thousands of records across a mandated two years of history. Neither the TPP-facing standard nor the Ozone Connect specification says what order that list arrives in, and neither offers a parameter to ask for one. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the order is whatever each LFI’s query happens to produce"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The only ordering rule that exists anywhere is ours, not the specification’s: the "),
                      createVNode(_component_RouterLink, { to: "/knowledge-base/articles/pagination" }, {
                        default: withCtx(() => [
                          createTextVNode("Pagination")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" article requires an LFI to return records in a "),
                      createVNode("strong", null, "deterministic"),
                      createTextVNode(" order so that paging is stable across successive page requests. Deterministic is not a direction. An LFI returning oldest-first and an LFI returning newest-first are both conformant today, and a TPP integrating with both gets two different answers to the same question. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The consequences land entirely on the TPP, and they are not small. It cannot treat page 1 as recent activity, so the common case — showing a customer what has just happened on their account — requires pulling "),
                      createVNode("em", null, "every"),
                      createTextVNode(" page of the filtered set and sorting client-side before anything can be displayed. It cannot bound work by asking for the last fifty transactions. And because the difference is invisible until it meets a second LFI, it is the kind of assumption that survives the sandbox and fails in production — surfacing as a mis-ordered account view rather than an error anyone can catch. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The related weakness is "),
                      createVNode("strong", null, "stability"),
                      createTextVNode(". Both endpoints filter on a date field that is not unique: transactions share a "),
                      createVNode("code", null, "bookingDateTime"),
                      createTextVNode(" routinely, and statements carry an "),
                      createVNode("code", null, "OpeningDate"),
                      createTextVNode(" that is a date, not a timestamp. If an LFI orders on that field alone, two records that tie can be returned in either order on either request — so walking pages can hand a TPP the same record twice and never show it another. That is permitted by “deterministic” only on a generous reading of it. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Newest first, on both endpoints, from V2.2")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Transactions and statements MUST be returned in descending date order — newest first."),
                      createTextVNode(" The ordering applies to the filtered result set and is applied before pagination, so the first page always carries the most recent records the query matched. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — the rule, stated once, for both endpoints"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(proposedExample))
                    ]),
                    createVNode("p", null, " Descending is chosen because it serves the common case without a client-side pass. Account aggregation, spending views, notifications, and the “what happened recently” question that most TPP journeys open with all read backwards from today — and it is the direction a customer already sees in every banking app they use. Under pagination the direction decides which page holds the answer: newest-first puts it on page 1, oldest-first puts it on the last page the TPP can only reach by fetching all of them. "),
                    createVNode("p", null, [
                      createVNode("strong", null, "The requirement applies to every LFI at V2.2, including those already live."),
                      createTextVNode(" No grace period is proposed. Ordering is a property of the query that already serves these endpoints rather than of the data model, so for most implementations this is a sort clause and a regression test — and the cost of leaving it unspecified compounds with every LFI and TPP that joins. Whether that reading holds for LFIs who have already built is the first question attached to this vote, and a clear answer to the contrary is the thing that would reopen it. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "This proposal does not introduce a way to request ascending order."),
                      createTextVNode(" A direction control — a request header or query parameter carrying "),
                      createVNode("code", null, "asc"),
                      createTextVNode(" / "),
                      createVNode("code", null, "desc"),
                      createTextVNode(" — is a reasonable thing to want and a different thing to specify: it doubles what an LFI must implement and test, and it is only worth defining if LFIs can support it and TPPs would use it. Both are asked in section 06. If the answers point that way, a control follows as its own proposal against a later version, with descending remaining the default. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 03 · Scope and behaviour")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What “newest first” means, precisely"),
                    createVNode("p", { class: "ofp-band__lede" }, " An ordering rule is only worth having if two LFIs reading it independently produce the same sequence, so the key, the tiebreaker, and the interaction with filtering and paging all have to be pinned down. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Proposed rules"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("Transactions MUST be ordered by "),
                            createVNode("code", null, "bookingDateTime"),
                            createTextVNode(", descending.")
                          ]),
                          createTextVNode(" This is the field the existing "),
                          createVNode("code", null, "fromBookingDateTime"),
                          createTextVNode(" / "),
                          createVNode("code", null, "toBookingDateTime"),
                          createTextVNode(" filters already act on, so filtering, ordering, and paging all address the same value. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("Statements MUST be ordered by "),
                            createVNode("code", null, "OpeningDate"),
                            createTextVNode(", descending")
                          ]),
                          createTextVNode(" — the start of the statement period. Again this is the field the "),
                          createVNode("code", null, "fromStatementDate"),
                          createTextVNode(" / "),
                          createVNode("code", null, "toStatementDate"),
                          createTextVNode(" filters act on. "),
                          createVNode("code", null, "StatementDate"),
                          createTextVNode(" (when the statement was issued) and "),
                          createVNode("code", null, "ClosingDate"),
                          createTextVNode(" are deliberately not used: ordering on a field the filters do not use would let a statement fall inside the requested range and outside the expected position. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "A stable, unique tiebreaker SHOULD be applied"),
                          createTextVNode(" — "),
                          createVNode("code", null, "transactionId"),
                          createTextVNode(" for transactions, "),
                          createVNode("code", null, "StatementId"),
                          createTextVNode(" for statements — so that records sharing a date hold a fixed relative position across requests. Without one, ties can be returned in either order on either request, and walking pages can duplicate a record on one page while dropping it from another. It is a SHOULD rather than a MUST because an LFI whose ledger already guarantees a total order by other means satisfies the intent; what matters is that ties never move. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Ordering is applied to the filtered result set, before pagination."),
                          createTextVNode(" This extends the existing rule that filtering is applied first and pagination to the filtered set; ordering sits between them. "),
                          createVNode("code", null, "totalRecords"),
                          createTextVNode(" and "),
                          createVNode("code", null, "totalPages"),
                          createTextVNode(" are unaffected. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The order does not vary with the request."),
                          createTextVNode(" Date filters, "),
                          createVNode("code", null, "page"),
                          createTextVNode(", "),
                          createVNode("code", null, "page-size"),
                          createTextVNode(", and the "),
                          createVNode("code", null, "o3-fx-transactions"),
                          createTextVNode(" header narrow "),
                          createVNode("em", null, "which"),
                          createTextVNode(" records are returned; none of them change the direction they are returned in. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The API Hub passes the LFI’s order through unchanged."),
                          createTextVNode(" It converts the LFI’s "),
                          createVNode("code", null, "meta"),
                          createTextVNode(" into the TPP-facing "),
                          createVNode("code", null, "Links"),
                          createTextVNode(" envelope and does not re-sort, so the order the TPP observes is the order Ozone Connect produced. The requirement therefore has to be met at the LFI; there is no Hub-side correction. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "No sort control is introduced."),
                          createTextVNode(" Neither specification gains a sort parameter or header under this proposal. The order is fixed, and a TPP that needs ascending reverses it itself. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Other list endpoints are out of scope."),
                          createVNode("code", null, "/beneficiaries"),
                          createTextVNode(", "),
                          createVNode("code", null, "/direct-debits"),
                          createTextVNode(", "),
                          createVNode("code", null, "/scheduled-payments"),
                          createTextVNode(", "),
                          createVNode("code", null, "/standing-orders"),
                          createTextVNode(", "),
                          createVNode("code", null, "/products"),
                          createTextVNode(", "),
                          createVNode("code", null, "/accounts"),
                          createTextVNode(" and "),
                          createVNode("code", null, "/accounts/{accountId}/customer"),
                          createTextVNode(" are unaffected and remain subject only to the existing deterministic-order rule. They are small, optionally paginated, and mostly carry no obvious date to sort on. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, " Insurance Data Sharing is not covered by this proposal. If the ecosystem wants the same treatment for policy-level history, it should be raised separately rather than folded in here, where the endpoints, filters, and pagination behaviour are different. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What changes"),
                    createVNode("p", { class: "ofp-band__lede" }, " No schema changes, no new fields, no new parameters. Four endpoint descriptions, the documentation that describes them, and a conformance check. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Ozone Connect specification"),
                      createVNode("p", null, [
                        createTextVNode(" In the bank data sharing specification, state the ordering requirement on "),
                        createVNode("code", null, "GET /accounts/{accountId}/transactions"),
                        createTextVNode(" and "),
                        createVNode("code", null, "GET /accounts/{accountId}/statements"),
                        createTextVNode(" — the key, the direction, the tiebreaker, and that ordering precedes pagination. This is the normative home of the rule, because this is the surface the LFI implements. Targets "),
                        createVNode("strong", null, "V2.2"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Standards specification"),
                      createVNode("p", null, [
                        createTextVNode(" Mirror the statement on the TPP-facing "),
                        createVNode("code", null, "GET /accounts/{AccountId}/transactions"),
                        createTextVNode(" and "),
                        createVNode("code", null, "GET /accounts/{AccountId}/statements"),
                        createTextVNode(" in the account information specification, so a TPP reading only the standard knows what it can rely on without inferring it from the LFI-facing spec. No request or response schema changes. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Documentation"),
                      createVNode("p", null, [
                        createTextVNode(" Tighten the ordering line in the "),
                        createVNode(_component_RouterLink, { to: "/knowledge-base/articles/pagination" }, {
                          default: withCtx(() => [
                            createTextVNode("Pagination")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" article and the LFI "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination" }, {
                          default: withCtx(() => [
                            createTextVNode("Bank Data Sharing — Pagination")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" guide from “deterministic” to “deterministic and descending”, with the tiebreaker and the duplicate-record failure it prevents spelled out. Add the guarantee to the TPP Data Sharing API guide so it is stated where TPPs read, and record the change as an errata entry. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Functional certification"),
                      createVNode("p", null, " Add a Data Sharing check that walks a multi-page transactions query and asserts the order is descending across the page boundary, and that re-requesting a page returns the same records in the same positions. This is what makes the requirement enforceable rather than aspirational — and it is a check that “deterministic” on its own could never support. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 05 · What this costs to build")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A sort clause for most LFIs — but not, necessarily, for all")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" For an LFI serving these endpoints from a query against a ledger or transaction store, this is an "),
                      createVNode("code", null, "ORDER BY"),
                      createTextVNode(", a tiebreaker column, and a regression test that walks two pages. That is the expectation this proposal is written on, and it is why no grace period is offered. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" It is not universally true. An LFI serving transactions from a cache, a materialised feed, or an event log built forwards in time may find that reversing the order means reversing how that feed is built or indexed — a different size of change, and one that has to be scheduled rather than absorbed. An LFI whose statement records are keyed by issue date rather than "),
                      createVNode("code", null, "OpeningDate"),
                      createTextVNode(" has a mapping to make on top. "),
                      createVNode("strong", null, "Nobody outside those LFIs can size this, which is exactly why it is the first question attached to the vote.")
                    ]),
                    createVNode("p", null, " For a TPP, conforming costs nothing — the guarantee only adds something to rely on. The cost falls on the TPP that wanted the other direction: reconciliation and running-balance work reads forwards, and reversing a paginated response means holding the whole filtered set before processing can start. That is a real cost, and section 06 asks who carries it. "),
                    createVNode("p", null, [
                      createTextVNode(" A vote in favour is a statement that your institution would "),
                      createVNode("em", null, "conform to"),
                      createTextVNode(" this — an LFI that it would return newest-first at V2.2 without a transition period, a TPP that it would build against a fixed descending order. Answering the questions matters more than the tally: a For vote with “this is a two-line change for us” and a For vote with “this rebuilds our feed” mean different things, and the second is what would change the proposal. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Questions")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Three questions, asked with the vote"),
                    createVNode("p", { class: "ofp-band__lede" }, " These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees all three. The vote decides descending order; these answers decide whether the transition holds and whether a direction control follows. ")
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
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 07 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What a defined order buys")
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
                      createTextVNode(" 08 · Cons")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-012.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ofp012 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c77b8d5c"]]);
export {
  ofp012 as default
};
