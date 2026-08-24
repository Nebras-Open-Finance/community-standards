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
const OG_TITLE = "OFP-011 · Replace certification testing windows with a Nebras-operated conformance portal";
const OG_DESCRIPTION = "Nebras registers as a TPP and operates a portal that drives certification scenarios against an LFI’s implementation — in pre-production for functional certification, and in production in place of waiting for a buddy TPP. LFIs click through scenarios instead of running a containerised harness and Postman collections, and the ecosystem gains a standing, published record of how each LFI actually behaves.";
const todayExample = `# Today — proving an implementation

PRE-PRODUCTION
  LFI stands up the containerised conformance tool locally
  LFI walks the Postman collection for each certification area
  LFI captures results, collates evidence by hand
  LFI raises a Service Desk ticket per area and attaches it

PRODUCTION
  LFI waits for a buddy TPP to be available and willing
  Buddy TPP integrates and exercises the LFI's production implementation
  ... which is the testing window this proposal is trying to remove`;
const proposedExample = `# Proposed — the conformance portal

PRE-PRODUCTION
  LFI registers in the portal and selects its certification areas
  Portal presents the scenarios for those areas
  LFI clicks through; Nebras drives the traffic as a registered TPP
  Portal generates the evidence pack
  LFI raises the Service Desk ticket and attaches it   # unchanged

PRODUCTION
  Portal is open to volunteers — connect an account, make a payment
  Volunteer sees their own data; the session is also an observation
  Observations accumulate into a published per-LFI implementation record
  No buddy TPP required`;
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
        { name: "twitter:description", content: OG_DESCRIPTION },
        // Unlinked, internal-only page — keep it out of search indexes.
        { name: "robots", content: "noindex, nofollow" }
      ]
    });
    const meta = {
      id: "OFP-011",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "14 Aug 2026",
      closes: "4 Sep 2026",
      priority: "high",
      // Not a specification change — nothing in the OpenAPI specs moves. Delivery is
      // an API Hub / portal release, so there is no target standards version.
      version: "Process change"
    };
    const stepsPre = [
      {
        n: "01",
        title: "LFI registers and claims its areas",
        text: "The LFI signs in to the portal and selects the certification areas it is claiming — bank data sharing, domestic payments, confirmation of payee. The portal presents only the scenarios relevant to those areas."
      },
      {
        n: "02",
        title: "The portal presents scenarios, not requests",
        text: "Each scenario is expressed in the terms of the journey it proves — “retrieve twelve months of transactions for a current account”, “initiate a domestic payment and refund it” — rather than as a sequence of HTTP calls the LFI has to assemble and fire itself."
      },
      {
        n: "03",
        title: "The LFI clicks through",
        text: "Nebras drives the traffic as a registered TPP: portal to API Hub, API Hub to the LFI’s pre-production Ozone Connect, and back. The LFI authenticates and authorises the consent in its own application exactly as a customer would, so the journey under test is the real one."
      },
      {
        n: "04",
        title: "The portal records the outcome and the behaviour",
        text: "Pass or fail against the scenario, plus what the implementation actually did — which optional fields were populated, which validations rejected what, which error codes came back, how long each call took."
      },
      {
        n: "05",
        title: "The evidence pack is generated, not assembled",
        text: "The LFI raises its Service Desk ticket when it believes it is ready, as today. What it attaches is portal output rather than screenshots, exports, and hand-collated harness logs. Nebras review and sign-off are unchanged."
      }
    ];
    const stepsProd = [
      {
        n: "01",
        title: "A volunteer opens the portal",
        text: "The production portal is open to anyone. A volunteer picks an LFI, gives consent, and authenticates at that LFI in the usual way. No buddy TPP has to be found, scheduled, or persuaded."
      },
      {
        n: "02",
        title: "They see their own data",
        text: "The portal shows the volunteer what Open Finance returned for them — their accounts, their transactions, the payment they initiated. The session is useful to the person taking part, which is what makes volunteering worth doing."
      },
      {
        n: "03",
        title: "The session doubles as an observation",
        text: "Behind the volunteer’s view, the portal records how that LFI behaved: what it shared, what it withheld, what it validated, and where its responses differ from the standard or from its peers."
      },
      {
        n: "04",
        title: "The record feeds the ecosystem view",
        text: "Observations accumulate into a standing, published picture of each LFI’s implementation — visible to every TPP, so integration behaviour is read rather than rediscovered."
      }
    ];
    const pros = [
      "Removes the scheduling dependency that creates the testing window. An LFI’s production proving no longer waits on a buddy TPP being available and willing — the portal is always there, so two LFIs ready in the same week no longer compete for the same scarce attention.",
      "Certification evidence becomes generated rather than assembled. No containerised harness to stand up locally, no Postman collection walked request by request, no screenshots collated by hand — the artefact comes out of the tool that ran the test.",
      "Scenarios are expressed as journeys, so the thing being proved is legible to the people signing it off. An LFI can see what it is being asked to demonstrate without first reading a collection of HTTP requests.",
      "Re-proving a functional change becomes cheap. An LFI that adjusts its implementation after certification can re-run the affected scenarios rather than reassembling a full evidence pack, which makes small corrections worth making.",
      "TPPs stop paying the discovery cost individually. Today each TPP learns how an LFI behaves — which optional fields it populates, which validations it applies — by integrating and finding out. Publishing that record once shortens onboarding for every TPP.",
      "Nebras gains standing visibility of production conformance. Deviation from the standard is currently observed at a point in time during certification; this makes it observable continuously, which is what turns standardisation from an assertion into something we can see.",
      "One implementation of the scenarios, rather than one per LFI. Where a harness is run locally, differences in how it is run become differences in what was proved. A hosted portal removes that variance."
    ];
    const cons = [
      "Nebras becomes a registered participant in the market it operates and whose standard it authors. The limitation to testing is a published policy commitment rather than a technical control, so it rests on Nebras’s conduct and on being seen to hold to it.",
      "Production conformance depends on volunteers. Real people have to connect real accounts and, for payments, move real money. If volunteers do not come forward for a given LFI, that LFI’s production picture is thin — and this is the part of the design with the least certainty behind it.",
      "Real money moves in production scenarios. A payment initiated in a conformance session is a genuine payment, with genuine consequences if it fails or is misdirected. That is a materially different risk profile from a pre-production harness.",
      "The health view ages between windows. Nebras’s access to a given LFI is granted around a functional change, not held permanently — so the published record describes what was last observed, which may be some time ago, and must be presented as such rather than as a live reading.",
      "It concentrates a shared dependency. Where the harness and collections were artefacts each LFI ran for itself, certification would now route through one Nebras-operated service. Its availability becomes every LFI’s availability.",
      "A scenario portal proves what its scenarios cover, and no more. A gap in the scenario set is a gap in what certification asserts — and unlike a collection an LFI can extend locally, closing it depends on Nebras shipping it.",
      "Building it is a real programme, not a tooling change: a customer-facing production application, a scenario engine, an evidence generator, and a published data surface, all under the obligations that attach to holding a TPP registration."
    ];
    const dataKeep = [
      { ref: "Fields an LFI populates", note: "Which optional fields are present, which are absent, across every scenario run" },
      { ref: "Validations it applies", note: "What it rejects, on what grounds, and with which error code" },
      { ref: "Response shapes and codes", note: "How the implementation answers, including its edge and failure behaviour" },
      { ref: "Timings", note: "Per-call latency against the response-time policy" },
      { ref: "Scenario outcomes", note: "Pass / fail per scenario, and the certification evidence derived from it" }
    ];
    const dataDiscard = [
      { ref: "Balances and transactions", note: "Held for the session and any live investigation, then discarded on a short cycle" },
      { ref: "Names and identifiers", note: "Volunteer identity, account names, Emirates ID — never part of the published record" },
      { ref: "IBANs and account numbers", note: "Evaluated against the scenario, not retained beyond the working window" },
      { ref: "Payment details", note: "Amounts, creditors, references — retained only as long as a payment can be disputed" },
      { ref: "Anything customer-identifying", note: "Excluded from the ecosystem view by construction, not by redaction after the fact" }
    ];
    const asks = [
      {
        n: "Q1",
        text: "Volunteer supply is the load the whole production half of this rests on. Production conformance only produces a picture if real people connect real accounts, and for payments, move real money. Is a public volunteer pool realistic, or does this in practice run on LFI and Nebras staff? If the latter, is the observation still representative enough to replace a buddy TPP?"
      },
      {
        n: "Q2",
        text: "Windowed access versus a current picture. Nebras’s ability to call a given LFI is granted around a functional change, not held permanently — which means production observation stops between windows while the published view stays up. Is an explicitly dated “last observed” record acceptable to TPPs, or does the view need a standing low-volume window to stay useful?"
      },
      {
        n: "Q3",
        text: "How much of an LFI’s implementation record should be public? The value to TPPs comes from the differences being visible — but the same record makes an LFI’s gaps visible to its competitors. Where is the line between transparency that shortens onboarding and exposure an LFI would reasonably object to?"
      },
      {
        n: "Q4",
        text: "Is a policy commitment sufficient for Nebras holding a production TPP registration? Nebras would be the operator of the API Hub, the author of the standard, and a registered participant at the same time. The recommendation is an ordinary registration limited by published policy rather than a restricted role in the trust framework. Does that need a technical control, a regulatory notification, or both?"
      },
      {
        n: "Q5",
        text: "Who carries a failed or misdirected production payment made in a conformance session? The volunteer initiated it, Nebras drove it, and the LFI executed it. This needs an answer before the payments scenarios go live, not after."
      },
      {
        n: "Q6",
        text: "What is the route for closing a scenario gap? Certification would assert exactly what the scenario set covers. When production observation shows something the scenarios miss, how quickly can a scenario be added, and does adding one re-open certifications already granted under the old set?"
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
        title: "Replace certification testing windows with a Nebras-operated conformance portal",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-173ee6b8><section class="ofp-hero" data-v-173ee6b8><div class="ofp-hero__inner" data-v-173ee6b8>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/internal/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-173ee6b8${_scopeId}>←</span> Internal proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" Internal proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-173ee6b8><span class="ofp__id" data-v-173ee6b8>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-173ee6b8></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-173ee6b8>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-173ee6b8>Replace certification testing windows with a Nebras-operated conformance portal</h1><p class="ofp__summary" data-v-173ee6b8> Nebras registers as a TPP and operates a portal that drives certification scenarios against an LFI’s implementation — in <strong data-v-173ee6b8>pre-production</strong> for functional certification, and in <strong data-v-173ee6b8>production</strong> in place of waiting for a buddy TPP. LFIs click through scenarios instead of standing up a containerised harness and walking Postman collections, and the ecosystem gains a standing, published record of how each LFI actually behaves. </p><div class="ofp__strip" data-v-173ee6b8><div class="ofp__strip-item" data-v-173ee6b8><div class="ofp__strip-key" data-v-173ee6b8>Proposed by</div><div class="ofp__strip-val" data-v-173ee6b8>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-173ee6b8><div class="ofp__strip-key" data-v-173ee6b8>Author</div><div class="ofp__strip-val" data-v-173ee6b8>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-173ee6b8><div class="ofp__strip-key" data-v-173ee6b8>Change type</div><div class="ofp__strip-val" data-v-173ee6b8>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-173ee6b8><div class="ofp__strip-key" data-v-173ee6b8>Opened</div><div class="ofp__strip-val" data-v-173ee6b8>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-173ee6b8><div class="ofp__strip-key" data-v-173ee6b8>Closes</div><div class="ofp__strip-val" data-v-173ee6b8>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-173ee6b8${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-173ee6b8${_scopeId}><div class="ofp-vote-cover__card" data-v-173ee6b8${_scopeId}><div class="ofp-vote-cover__label" data-v-173ee6b8${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-173ee6b8${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="${ssrRenderClass([{ "ofp-band--seam": !showTabs.value }, "ofp-band ofp-band--cream"])}" data-v-173ee6b8${_scopeId}>`);
            if (!showTabs.value) {
              _push2(`<span class="ofp-seam-label" data-v-173ee6b8${_scopeId}>The proposal</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Certification is gated by scheduling, not by readiness</h2></div><div class="ofp-prose" data-v-173ee6b8${_scopeId}><p data-v-173ee6b8${_scopeId}> An LFI proving it has implemented the standard correctly assembles its own evidence. It stands up a containerised conformance tool against its pre-production `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/getting-started/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Ozone Connect`);
                } else {
                  return [
                    createTextVNode("Ozone Connect")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` implementation, walks a Postman collection request by request, captures what came back, and collates it into a submission — `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`once for each certification area`);
                } else {
                  return [
                    createTextVNode("once for each certification area")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. Bank data sharing, confirmation of payee, insurance, and each payment type are separate exercises with separate evidence. </p><p data-v-173ee6b8${_scopeId}> That is laborious, but it is not the part that creates a <em data-v-173ee6b8${_scopeId}>window</em>. The window appears in production. An LFI’s production implementation can only be exercised by a real TPP, so `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/tpp-buddying" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`TPP buddying`);
                } else {
                  return [
                    createTextVNode("TPP buddying")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` pairs the LFI with a TPP that has to be available, willing, and far enough along its own `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/production/live-proving" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`live proving`);
                } else {
                  return [
                    createTextVNode("live proving")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` to be useful. Two LFIs ready in the same week compete for the same scarce attention. An LFI that makes a small functional change after certification has no cheap way to re-prove it, so small corrections do not get made. </p><p data-v-173ee6b8${_scopeId}> There is a second cost that nobody currently pays visibly. The evidence an LFI produces is seen by the LFI and its reviewer, and then it is filed. A TPP integrating across the ecosystem discovers how each LFI <em data-v-173ee6b8${_scopeId}>actually</em> behaves — which optional fields it populates, which validations it applies, how it answers an edge case — by integrating and finding out. Every TPP pays that discovery cost independently, for every LFI, and none of what they learn is written down anywhere the next TPP can read it. </p><p data-v-173ee6b8${_scopeId}> Nebras also has no continuous view of production conformance. Deviation from the standard is observed at a point in time, during certification, against a pre-production environment. After that, the first signal that an implementation has drifted is usually a TPP raising a ticket. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Nebras builds the portal, and registers as a TPP to drive it</h2></div><div class="ofp-prose" data-v-173ee6b8${_scopeId}><p data-v-173ee6b8${_scopeId}> Nebras builds and operates a <strong data-v-173ee6b8${_scopeId}>conformance portal</strong>, and registers as a TPP so the portal can drive genuine Open Finance traffic through the API Hub against an LFI’s implementation. Architecturally nothing unusual happens: the portal is a TPP, it calls the API Hub, and the API Hub proxies to Ozone Connect. What changes is who does the work of proving. </p><p data-v-173ee6b8${_scopeId}> In <strong data-v-173ee6b8${_scopeId}>pre-production</strong>, an LFI registers, selects the areas it is claiming, and works through the scenarios in a browser. The evidence pack is generated by the portal rather than assembled by the LFI. </p><p data-v-173ee6b8${_scopeId}> In <strong data-v-173ee6b8${_scopeId}>production</strong>, the portal is open to volunteers. Anyone can connect their own accounts or make a payment and see their own data come back — and that session doubles as a conformance observation. No buddy TPP has to be found. The observations accumulate into a published, per-LFI record of implementation behaviour that any TPP can read before it starts integrating. </p><p data-v-173ee6b8${_scopeId}> This is a <strong data-v-173ee6b8${_scopeId}>process change, not a specification change</strong>. No OpenAPI field, endpoint, or schema moves. What changes is how conformance to those specifications is demonstrated, and who can see the result. </p></div><div class="ofp-code" data-v-173ee6b8${_scopeId}><div class="ofp-code__label" data-v-173ee6b8${_scopeId}>Today — proving an implementation</div><pre class="ofp-code__pre" data-v-173ee6b8${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><div class="ofp-code" data-v-173ee6b8${_scopeId}><div class="ofp-code__label" data-v-173ee6b8${_scopeId}>Proposed — the conformance portal</div><pre class="ofp-code__pre" data-v-173ee6b8${_scopeId}>${ssrInterpolate(proposedExample)}</pre></div></div></section><section class="ofp-band ofp-band--cream" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 03 · Pre-production</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Functional certification, click by click</h2><p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> The LFI still decides when it is ready and still raises the ticket. What it no longer does is build the evidence by hand. </p></div><div class="ofp-changes" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(stepsPre, (s) => {
              _push2(`<div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>${ssrInterpolate(s.n)} · ${ssrInterpolate(s.title)}</div><p data-v-173ee6b8${_scopeId}>${ssrInterpolate(s.text)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="ofp-band ofp-band--white" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 04 · Production</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Volunteers in place of a buddy TPP</h2><p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> The portal is useful to the person using it, which is the only durable reason anyone would take part. The conformance record is a by-product of that usefulness. </p></div><div class="ofp-changes" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(stepsProd, (s) => {
              _push2(`<div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>${ssrInterpolate(s.n)} · ${ssrInterpolate(s.title)}</div><p data-v-173ee6b8${_scopeId}>${ssrInterpolate(s.text)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="ofp-band ofp-band--cream" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 05 · The Nebras TPP role</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>A registration limited by policy, and by access</h2><p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> Nebras holding a production TPP registration is the part of this proposal that most deserves scrutiny. It is set out here in full rather than left implicit. </p></div><div class="ofp-changes" data-v-173ee6b8${_scopeId}><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>01 · Ordinary registration, limited by published policy</div><p data-v-173ee6b8${_scopeId}> Nebras registers as a TPP in the normal way — no new role and no change to the trust framework. The limitation to certification and conformance testing is a <strong data-v-173ee6b8${_scopeId}>published policy commitment</strong>: Nebras will not launch a product, will not onboard customers for any purpose other than testing, and will not use the registration commercially. This is a commitment, not a technical control, and <a href="#asks" data-v-173ee6b8${_scopeId}>Q4</a> asks whether that is sufficient. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>02 · Per-LFI authorisation</div><p data-v-173ee6b8${_scopeId}> Nebras may only exercise an LFI that has explicitly registered for the portal and authorised testing against itself. The registration does not confer a standing right to call the whole ecosystem. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>03 · Time-boxed access</div><p data-v-173ee6b8${_scopeId}> Access to a given LFI is granted for a <strong data-v-173ee6b8${_scopeId}>window around a functional change</strong> and lapses afterwards. This is functional certification, not perpetual monitoring — Nebras should not hold open-ended production access to an LFI that is not changing anything. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>04 · The record outlives the window</div><p data-v-173ee6b8${_scopeId}> When a window closes, Nebras loses access but the ecosystem does not lose the picture. What was learned about that LFI’s implementation — what it returns, what it validates — stays published and stays readable. It is presented as an observation with a date, not as a live reading. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>05 · The portal itself is always on</div><p data-v-173ee6b8${_scopeId}> The public view of ecosystem health never goes dark, even between windows. What is windowed is Nebras’s ability to generate <em data-v-173ee6b8${_scopeId}>new</em> observations against a particular LFI. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>06 · Informational first, compliance second</div><p data-v-173ee6b8${_scopeId}> The portal reports; it does not adjudicate. A minor deviation is surfaced to the LFI and shown in the record. Where a deviation is significant, Nebras picks it up through the existing compliance route as a failure to meet the LFI’s standardisation obligations — the portal is the evidence, not the enforcement. </p></div></div></div></section><section class="ofp-band ofp-band--white" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 06 · Data handling</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Keep the behaviour, discard the customer</h2><p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> Two classes of data pass through the portal and they get opposite treatment. The published record describes how an implementation behaves; it never describes a person. </p></div><div class="ofp-ex" data-v-173ee6b8${_scopeId}><div class="ofp-ex__col ofp-ex__col--ok" data-v-173ee6b8${_scopeId}><div class="ofp-ex__head" data-v-173ee6b8${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--ok" data-v-173ee6b8${_scopeId}>✓</span> Persisted — implementation behaviour </div><ul class="ofp-ex__list" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(dataKeep, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-173ee6b8${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-173ee6b8${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-173ee6b8${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div><div class="ofp-ex__col ofp-ex__col--no" data-v-173ee6b8${_scopeId}><div class="ofp-ex__head" data-v-173ee6b8${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--no" data-v-173ee6b8${_scopeId}>×</span> Short-lived — customer data </div><ul class="ofp-ex__list" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(dataDiscard, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-173ee6b8${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-173ee6b8${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-173ee6b8${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></div><p class="ofp-ex__foot" data-v-173ee6b8${_scopeId}> A volunteer sees their own retrieved data during their session — that is the point of taking part. What survives the session is the left-hand column: an account of how the LFI answered, carrying nothing that identifies the person who asked. </p></div></section><section class="ofp-band ofp-band--cream" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 07 · What changes</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>What the portal replaces, and what stays exactly as it is</h2></div><div class="ofp-changes" data-v-173ee6b8${_scopeId}><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Retired · The containerised conformance tool</div><p data-v-173ee6b8${_scopeId}> LFIs no longer stand up a local harness against their own pre-production environment. The scenarios run in the portal, hosted and identical for everyone, which also removes the variance that comes from differences in how a local harness was run. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Retired · Postman collections as the evidence route</div><p data-v-173ee6b8${_scopeId}> The collections stop being the required path to certification evidence. They remain available as an optional developer aid for day-to-day integration work — this retires their role in certification, not the collections themselves. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Retired · Waiting for a buddy TPP</div><p data-v-173ee6b8${_scopeId}> The scheduling dependency at the heart of the production testing window goes away. An LFI proves against the portal instead of waiting for a TPP to become available. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Unchanged · The Service Desk ticket</div><p data-v-173ee6b8${_scopeId}> Functional certification is still requested by ticket, raised by the LFI when it believes it is ready, one per certification area. What is attached to it changes almost entirely to portal output — the submission route does not. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Unchanged · Nebras review and sign-off</div><p data-v-173ee6b8${_scopeId}> The portal generates evidence; it does not grant certification. A person at Nebras still reviews the pack and signs off, with the same judgement applied to the same standard. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>Unchanged · The standards themselves</div><p data-v-173ee6b8${_scopeId}> No OpenAPI change, no version target. Everything an LFI must implement stays exactly as specified — only the demonstration of it changes. </p></div></div></div></section><section class="ofp-band ofp-band--white" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 08 · Rollout</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>Three areas first, existing routes stay open for the rest</h2></div><div class="ofp-prose" data-v-173ee6b8${_scopeId}><p data-v-173ee6b8${_scopeId}>The initial release covers three certification areas:</p></div><div class="ofp-changes" data-v-173ee6b8${_scopeId}><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>01 · Bank data sharing</div><p data-v-173ee6b8${_scopeId}> The highest-volume area and the one where implementation differences between LFIs cost TPPs the most to discover — so it is also where a published behaviour record earns the most immediately. `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Current certification route`);
                } else {
                  return [
                    createTextVNode("Current certification route")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>02 · Bank service initiation — domestic payments, including refunds</div><p data-v-173ee6b8${_scopeId}> Single instant domestic payments and the refund path. Payments are where a production scenario carries real consequence, so starting with the simplest, most-used payment type keeps the risk proportionate while the model is proved. `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Current certification route`);
                } else {
                  return [
                    createTextVNode("Current certification route")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>03 · Confirmation of payee</div><p data-v-173ee6b8${_scopeId}> Small surface, sharply defined behaviour, and a validation-heavy area where LFI-to-LFI differences are exactly what the record is good at capturing. `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Current certification route`);
                } else {
                  return [
                    createTextVNode("Current certification route")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. </p></div><div class="ofp-change" data-v-173ee6b8${_scopeId}><div class="ofp-change__label" data-v-173ee6b8${_scopeId}>04 · Everything else keeps its current route</div><p data-v-173ee6b8${_scopeId}> Insurance data sharing, the remaining payment types — on-demand, periodic schedule, and defined schedule in both fixed and variable forms — and delegated SCA continue to certify exactly as they do today until the portal covers them. Nothing is withdrawn before its replacement exists. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 09 · Pros</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>What the portal buys</h2></div><ul class="ofp-pros" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-173ee6b8${_scopeId}><span class="ofp-pros__glyph" data-v-173ee6b8${_scopeId}>✓</span><span data-v-173ee6b8${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 10 · Cons</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-173ee6b8${_scopeId}><span class="ofp-cons__glyph" data-v-173ee6b8${_scopeId}>×</span><span data-v-173ee6b8${_scopeId}>${ssrInterpolate(c)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section id="asks" class="ofp-band ofp-band--cream" data-v-173ee6b8${_scopeId}><div class="ofp-band__inner" data-v-173ee6b8${_scopeId}><div class="ofp-band__head" data-v-173ee6b8${_scopeId}><div class="ofp-band__eyebrow" data-v-173ee6b8${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-173ee6b8${_scopeId}></span> 11 · Open questions</div><h2 class="ofp-band__title" data-v-173ee6b8${_scopeId}>What has to be settled before this is built</h2><p class="ofp-band__lede" data-v-173ee6b8${_scopeId}> Two of these — volunteer supply and payment liability — could change the shape of the production half of the proposal, so they are worth answering first. </p></div><ul class="ofp-asks" data-v-173ee6b8${_scopeId}><!--[-->`);
            ssrRenderList(asks, (a) => {
              _push2(`<li class="ofp-ask" data-v-173ee6b8${_scopeId}><span class="ofp-ask__num" data-v-173ee6b8${_scopeId}>${ssrInterpolate(a.n)}</span><div class="ofp-ask__text" data-v-173ee6b8${_scopeId}>${ssrInterpolate(a.text)}</div></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "Certification is gated by scheduling, not by readiness")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" An LFI proving it has implemented the standard correctly assembles its own evidence. It stands up a containerised conformance tool against its pre-production "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/getting-started/" }, {
                        default: withCtx(() => [
                          createTextVNode("Ozone Connect")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" implementation, walks a Postman collection request by request, captures what came back, and collates it into a submission — "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/" }, {
                        default: withCtx(() => [
                          createTextVNode("once for each certification area")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". Bank data sharing, confirmation of payee, insurance, and each payment type are separate exercises with separate evidence. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" That is laborious, but it is not the part that creates a "),
                      createVNode("em", null, "window"),
                      createTextVNode(". The window appears in production. An LFI’s production implementation can only be exercised by a real TPP, so "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/tpp-buddying" }, {
                        default: withCtx(() => [
                          createTextVNode("TPP buddying")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" pairs the LFI with a TPP that has to be available, willing, and far enough along its own "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/production/live-proving" }, {
                        default: withCtx(() => [
                          createTextVNode("live proving")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" to be useful. Two LFIs ready in the same week compete for the same scarce attention. An LFI that makes a small functional change after certification has no cheap way to re-prove it, so small corrections do not get made. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" There is a second cost that nobody currently pays visibly. The evidence an LFI produces is seen by the LFI and its reviewer, and then it is filed. A TPP integrating across the ecosystem discovers how each LFI "),
                      createVNode("em", null, "actually"),
                      createTextVNode(" behaves — which optional fields it populates, which validations it applies, how it answers an edge case — by integrating and finding out. Every TPP pays that discovery cost independently, for every LFI, and none of what they learn is written down anywhere the next TPP can read it. ")
                    ]),
                    createVNode("p", null, " Nebras also has no continuous view of production conformance. Deviation from the standard is observed at a point in time, during certification, against a pre-production environment. After that, the first signal that an implementation has drifted is usually a TPP raising a ticket. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Nebras builds the portal, and registers as a TPP to drive it")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Nebras builds and operates a "),
                      createVNode("strong", null, "conformance portal"),
                      createTextVNode(", and registers as a TPP so the portal can drive genuine Open Finance traffic through the API Hub against an LFI’s implementation. Architecturally nothing unusual happens: the portal is a TPP, it calls the API Hub, and the API Hub proxies to Ozone Connect. What changes is who does the work of proving. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" In "),
                      createVNode("strong", null, "pre-production"),
                      createTextVNode(", an LFI registers, selects the areas it is claiming, and works through the scenarios in a browser. The evidence pack is generated by the portal rather than assembled by the LFI. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" In "),
                      createVNode("strong", null, "production"),
                      createTextVNode(", the portal is open to volunteers. Anyone can connect their own accounts or make a payment and see their own data come back — and that session doubles as a conformance observation. No buddy TPP has to be found. The observations accumulate into a published, per-LFI record of implementation behaviour that any TPP can read before it starts integrating. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This is a "),
                      createVNode("strong", null, "process change, not a specification change"),
                      createTextVNode(". No OpenAPI field, endpoint, or schema moves. What changes is how conformance to those specifications is demonstrated, and who can see the result. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — proving an implementation"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — the conformance portal"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(proposedExample))
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 03 · Pre-production")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Functional certification, click by click"),
                    createVNode("p", { class: "ofp-band__lede" }, " The LFI still decides when it is ready and still raises the ticket. What it no longer does is build the evidence by hand. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(stepsPre, (s) => {
                      return createVNode("div", {
                        key: s.n,
                        class: "ofp-change"
                      }, [
                        createVNode("div", { class: "ofp-change__label" }, toDisplayString(s.n) + " · " + toDisplayString(s.title), 1),
                        createVNode("p", null, toDisplayString(s.text), 1)
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
                      createTextVNode(" 04 · Production")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Volunteers in place of a buddy TPP"),
                    createVNode("p", { class: "ofp-band__lede" }, " The portal is useful to the person using it, which is the only durable reason anyone would take part. The conformance record is a by-product of that usefulness. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(stepsProd, (s) => {
                      return createVNode("div", {
                        key: s.n,
                        class: "ofp-change"
                      }, [
                        createVNode("div", { class: "ofp-change__label" }, toDisplayString(s.n) + " · " + toDisplayString(s.title), 1),
                        createVNode("p", null, toDisplayString(s.text), 1)
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
                      createTextVNode(" 05 · The Nebras TPP role")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A registration limited by policy, and by access"),
                    createVNode("p", { class: "ofp-band__lede" }, " Nebras holding a production TPP registration is the part of this proposal that most deserves scrutiny. It is set out here in full rather than left implicit. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Ordinary registration, limited by published policy"),
                      createVNode("p", null, [
                        createTextVNode(" Nebras registers as a TPP in the normal way — no new role and no change to the trust framework. The limitation to certification and conformance testing is a "),
                        createVNode("strong", null, "published policy commitment"),
                        createTextVNode(": Nebras will not launch a product, will not onboard customers for any purpose other than testing, and will not use the registration commercially. This is a commitment, not a technical control, and "),
                        createVNode("a", { href: "#asks" }, "Q4"),
                        createTextVNode(" asks whether that is sufficient. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Per-LFI authorisation"),
                      createVNode("p", null, " Nebras may only exercise an LFI that has explicitly registered for the portal and authorised testing against itself. The registration does not confer a standing right to call the whole ecosystem. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Time-boxed access"),
                      createVNode("p", null, [
                        createTextVNode(" Access to a given LFI is granted for a "),
                        createVNode("strong", null, "window around a functional change"),
                        createTextVNode(" and lapses afterwards. This is functional certification, not perpetual monitoring — Nebras should not hold open-ended production access to an LFI that is not changing anything. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · The record outlives the window"),
                      createVNode("p", null, " When a window closes, Nebras loses access but the ecosystem does not lose the picture. What was learned about that LFI’s implementation — what it returns, what it validates — stays published and stays readable. It is presented as an observation with a date, not as a live reading. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "05 · The portal itself is always on"),
                      createVNode("p", null, [
                        createTextVNode(" The public view of ecosystem health never goes dark, even between windows. What is windowed is Nebras’s ability to generate "),
                        createVNode("em", null, "new"),
                        createTextVNode(" observations against a particular LFI. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "06 · Informational first, compliance second"),
                      createVNode("p", null, " The portal reports; it does not adjudicate. A minor deviation is surfaced to the LFI and shown in the record. Where a deviation is significant, Nebras picks it up through the existing compliance route as a failure to meet the LFI’s standardisation obligations — the portal is the evidence, not the enforcement. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Data handling")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Keep the behaviour, discard the customer"),
                    createVNode("p", { class: "ofp-band__lede" }, " Two classes of data pass through the portal and they get opposite treatment. The published record describes how an implementation behaves; it never describes a person. ")
                  ]),
                  createVNode("div", { class: "ofp-ex" }, [
                    createVNode("div", { class: "ofp-ex__col ofp-ex__col--ok" }, [
                      createVNode("div", { class: "ofp-ex__head" }, [
                        createVNode("span", { class: "ofp-ex__glyph ofp-ex__glyph--ok" }, "✓"),
                        createTextVNode(" Persisted — implementation behaviour ")
                      ]),
                      createVNode("ul", { class: "ofp-ex__list" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(dataKeep, (e, i) => {
                          return createVNode("li", {
                            key: `keep-${i}`,
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
                        createTextVNode(" Short-lived — customer data ")
                      ]),
                      createVNode("ul", { class: "ofp-ex__list" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(dataDiscard, (e, i) => {
                          return createVNode("li", {
                            key: `drop-${i}`,
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
                  createVNode("p", { class: "ofp-ex__foot" }, " A volunteer sees their own retrieved data during their session — that is the point of taking part. What survives the session is the left-hand column: an account of how the LFI answered, carrying nothing that identifies the person who asked. ")
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 07 · What changes")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What the portal replaces, and what stays exactly as it is")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Retired · The containerised conformance tool"),
                      createVNode("p", null, " LFIs no longer stand up a local harness against their own pre-production environment. The scenarios run in the portal, hosted and identical for everyone, which also removes the variance that comes from differences in how a local harness was run. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Retired · Postman collections as the evidence route"),
                      createVNode("p", null, " The collections stop being the required path to certification evidence. They remain available as an optional developer aid for day-to-day integration work — this retires their role in certification, not the collections themselves. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Retired · Waiting for a buddy TPP"),
                      createVNode("p", null, " The scheduling dependency at the heart of the production testing window goes away. An LFI proves against the portal instead of waiting for a TPP to become available. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Unchanged · The Service Desk ticket"),
                      createVNode("p", null, " Functional certification is still requested by ticket, raised by the LFI when it believes it is ready, one per certification area. What is attached to it changes almost entirely to portal output — the submission route does not. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Unchanged · Nebras review and sign-off"),
                      createVNode("p", null, " The portal generates evidence; it does not grant certification. A person at Nebras still reviews the pack and signs off, with the same judgement applied to the same standard. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "Unchanged · The standards themselves"),
                      createVNode("p", null, " No OpenAPI change, no version target. Everything an LFI must implement stays exactly as specified — only the demonstration of it changes. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 08 · Rollout")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Three areas first, existing routes stay open for the rest")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, "The initial release covers three certification areas:")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Bank data sharing"),
                      createVNode("p", null, [
                        createTextVNode(" The highest-volume area and the one where implementation differences between LFIs cost TPPs the most to discover — so it is also where a published behaviour record earns the most immediately. "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/" }, {
                          default: withCtx(() => [
                            createTextVNode("Current certification route")
                          ]),
                          _: 1
                        }),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Bank service initiation — domestic payments, including refunds"),
                      createVNode("p", null, [
                        createTextVNode(" Single instant domestic payments and the refund path. Payments are where a production scenario carries real consequence, so starting with the simplest, most-used payment type keeps the risk proportionate while the model is proved. "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/" }, {
                          default: withCtx(() => [
                            createTextVNode("Current certification route")
                          ]),
                          _: 1
                        }),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Confirmation of payee"),
                      createVNode("p", null, [
                        createTextVNode(" Small surface, sharply defined behaviour, and a validation-heavy area where LFI-to-LFI differences are exactly what the record is good at capturing. "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/" }, {
                          default: withCtx(() => [
                            createTextVNode("Current certification route")
                          ]),
                          _: 1
                        }),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Everything else keeps its current route"),
                      createVNode("p", null, " Insurance data sharing, the remaining payment types — on-demand, periodic schedule, and defined schedule in both fixed and variable forms — and delegated SCA continue to certify exactly as they do today until the portal covers them. Nothing is withdrawn before its replacement exists. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the portal buys")
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
              ]),
              createVNode("section", {
                id: "asks",
                class: "ofp-band ofp-band--cream"
              }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 11 · Open questions")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What has to be settled before this is built"),
                    createVNode("p", { class: "ofp-band__lede" }, " Two of these — volunteer supply and payment liability — could change the shape of the production half of the proposal, so they are worth answering first. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/proposals/ofp-011/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-173ee6b8"]]);
export {
  index as default
};
