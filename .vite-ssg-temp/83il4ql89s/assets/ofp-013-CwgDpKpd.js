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
const OG_TITLE = "OFP-013 · Return every Confirmation of Payee endpoint a bank operates";
const OG_DESCRIPTION = 'An IBAN carries a bank code, not a segment. Banks run separate Retail, SME and Corporate instances, and /discovery can only name one of them — so a Confirmation of Payee check on a corporate IBAN reaches the retail estate and comes back "IBAN not recognised". This proposal makes the discovery response an array of every instance that can answer.';
const todayExample = `# Today — one bank code resolves to one instance

POST /discovery
  { "Data": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" } }

200
  { "Data": { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
              "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" } }

# The bank code resolved. The segment did not — an IBAN does not carry one — so
# the retail instance is returned, because a single-valued Data has no room for
# the alternative.

POST https://rs1.bank-retail.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation
204   # "IBAN is not recognised"

# The account exists on the business estate, which was not queried. The
# response is identical to the one returned for a mistyped IBAN.`;
const proposedExample = `# Proposed — one bank code resolves to every instance that can answer

200
  { "Data": [
      { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" },
      { "DiscoveryEndpointUrl": "https://auth1.bank-sme.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-sme.apihub.openfinance.ae" },
      { "DiscoveryEndpointUrl": "https://auth1.bank-corp.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-corp.apihub.openfinance.ae" }
    ],
    "Links": { "Self": "..." },
    "Meta":  { } }

# Which entries to call is the TPP's choice: one it has grounds to identify,
# the entries in turn, or all of them. What may be concluded is not:
#
#   200 from an entry      -> authoritative. The account was found. Stop.
#   204 from an entry      -> this instance does not hold the account.
#   204 from EVERY entry   -> the IBAN is not recognised.
#   204 from some entries  -> inconclusive. Report "could not verify",
#                             which is NOT the same as "not recognised".
#   4xx/5xx from an entry  -> that instance did not answer. Inconclusive on
#                             the same terms.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ofp-013",
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
      id: "OFP-013",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "16 Sep 2026",
      closes: "7 Oct 2026",
      priority: "high",
      version: "V2.2"
    };
    const questions = [
      {
        who: "TPPs using Confirmation of Payee",
        q: "When would you move to the V2.2 /discovery response shape, and would you attempt the returned endpoints one at a time or in parallel?",
        why: "Data changes from an object to an array. Both versions are served side by side, so nobody is forced to move on a date — but the fix only reaches payees once TPPs do move, and we need to know whether that is a sprint or a release cycle. The second half matters separately: fanning out in parallel multiplies both the load and the charges on every check."
      },
      {
        who: "TPPs and LFIs",
        q: "Should a 204 “IBAN not recognised” remain a chargeable Confirmation of Payee transaction once fan-out means most attempts return one?",
        why: "POST /confirmation is chargeable. Under fan-out a single payee check can produce three billed calls, two of which found nothing. This proposal does not change pricing — it asks the question, so the commercial decision is taken with the ecosystem’s answer in front of it."
      }
    ];
    const pros = [
      "Accounts held outside a bank’s retail estate become verifiable at all. A single-valued discovery response can only ever send the check to one instance, so an account held on any other one returns “not recognised” however correct the IBAN is.",
      "It removes a class of false negative. An account held outside the retail estate currently produces the same result as an IBAN that does not exist, so the payer is warned about an account that would have matched had the request reached the instance holding it.",
      "No LFI implementation effort. The Hub already holds every authorisation server and resource server in the directory, so this is a response-assembly change over data it has. That is precisely why the LFI-hosted alternative was deferred rather than built.",
      "It fixes every reason a bank code maps to more than one instance, not only segmentation. A digital-only brand alongside its parent, or an estate part-way through a migration, breaks discovery in exactly the same way and is fixed by the same change.",
      "“Not recognised” becomes a statement about the bank rather than about one instance. The TPP reports it only after every instance the Hub named has returned 204, instead of after the single instance the Hub happened to select.",
      "The IBAN stays the only input. No new field from the TPP, no new endpoint at the LFI, and no segment anyone has to ask for — which matters, because the payee is not the TPP’s customer and cannot be asked anything."
    ];
    const cons = [
      "It is a breaking change to a response shape every existing Confirmation of Payee integration is built against. Serving both versions side by side means no TPP is forced to move on a date, but it does leave the Hub maintaining two response shapes for as long as V2.1 is served.",
      "Fan-out has a price. A TPP that attempts every entry incurs up to one token exchange and one chargeable /confirmation call per instance for a single payee check, most of them returning 204 — and this proposal flags that cost rather than fixing it.",
      "The entries are untagged, so a TPP that does know something about the payee often cannot act on it. Nothing in the response says which entry is the corporate one, so unless the TPP recognises the instance from a previous check it is left attempting them in order and paying for the attempts that miss.",
      "The protocol fix does not deliver coverage on its own. Until the non-retail instances are CoP-enabled the array returns one entry and a corporate payee still fails — work this proposal identifies but does not schedule.",
      "It publishes how many estates each bank runs to every TPP that resolves an IBAN. The same topology is already visible in the directory, so this is a small exposure rather than a new one, but it stops being something a TPP has to go looking for.",
      "Because calling a single entry is permitted, the non-conformance is not in how many entries a TPP calls but in what it reports afterwards — and a TPP that reports “not recognised” off one 204 looks identical to a conformant one on every retail payee. Functional certification is the only place that would be caught."
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
        title: "Return every Confirmation of Payee endpoint a bank operates",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-de072985><section class="ofp-hero" data-v-de072985><div class="ofp-hero__inner" data-v-de072985>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-de072985${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-de072985><span class="ofp__id" data-v-de072985>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-de072985></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-de072985>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-de072985>Return every Confirmation of Payee endpoint a bank operates</h1><p class="ofp__summary" data-v-de072985> An IBAN carries a bank code, not a segment. Banks run separate Retail, SME and Corporate instances on the API Hub, and <code data-v-de072985>POST /discovery</code> can only name one of them — so a Confirmation of Payee check on a corporate IBAN is sent to the retail estate and comes back <strong data-v-de072985>“IBAN not recognised”</strong> for an account that is real, active, and verifiable. This proposal makes the discovery response <strong data-v-de072985>an array of every instance that can answer</strong>, and has the TPP try each until one does. </p><div class="ofp__strip" data-v-de072985><div class="ofp__strip-item" data-v-de072985><div class="ofp__strip-key" data-v-de072985>Proposed by</div><div class="ofp__strip-val" data-v-de072985>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-de072985><div class="ofp__strip-key" data-v-de072985>Author</div><div class="ofp__strip-val" data-v-de072985>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-de072985><div class="ofp__strip-key" data-v-de072985>Target</div><div class="ofp__strip-val" data-v-de072985>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-de072985><div class="ofp__strip-key" data-v-de072985>Opened</div><div class="ofp__strip-val" data-v-de072985>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-de072985><div class="ofp__strip-key" data-v-de072985>Closes</div><div class="ofp__strip-val" data-v-de072985>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-de072985${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-de072985${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. <strong data-v-de072985${_scopeId}>Two questions are attached to this vote</strong> — set out in section 07 below — and they carry as much weight as the tally: they decide whether a breaking change lands at V2.2, and what a fanned-out check should cost. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-de072985${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-de072985${_scopeId}><div class="ofp-vote-cover__card" data-v-de072985${_scopeId}><div class="ofp-vote-cover__label" data-v-de072985${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-de072985${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                      createVNode("strong", null, "Two questions are attached to this vote"),
                      createTextVNode(" — set out in section 07 below — and they carry as much weight as the tally: they decide whether a breaking change lands at V2.2, and what a fanned-out check should cost. ")
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-de072985${_scopeId}><span class="ofp-seam-label" data-v-de072985${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>An IBAN names a bank, not an estate</h2></div><div class="ofp-prose" data-v-de072985${_scopeId}><p data-v-de072985${_scopeId}> Confirmation of Payee is the one flow where the API Hub chooses the LFI on the TPP’s behalf. Everywhere else the customer picks their own institution and the consent is raised against the authorisation server they chose. Here the subject of the check is the <em data-v-de072985${_scopeId}>payee</em> — not the TPP’s customer, not present, and not able to be asked anything — so the only input is the destination IBAN, and `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-de072985${_scopeId2}>POST /discovery</code>`);
                } else {
                  return [
                    createVNode("code", null, "POST /discovery")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` exists to turn it into somewhere to send the request. </p><p data-v-de072985${_scopeId}> A UAE IBAN carries the bank code, and the Hub resolves it correctly. What the IBAN does not carry is the <strong data-v-de072985${_scopeId}>segment</strong> — whether the account sits on the bank’s retail, SME, or corporate estate — and those estates are separate Open Finance instances with their own <code data-v-de072985${_scopeId}>lfiCode</code>, their own authorisation server, and their own API Hub resource server. That separation is not an edge case — it is the ordinary way a bank with more than one customer base is onboarded: </p><div class="ofp-rules" data-v-de072985${_scopeId}><div class="ofp-rules__label" data-v-de072985${_scopeId}>How one bank code can map to several instances</div><ul class="ofp-rules__list" data-v-de072985${_scopeId}><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>A retail and a business estate.</strong> One instance (<code data-v-de072985${_scopeId}>bank-retail</code>) carries personal current and savings accounts; a second (<code data-v-de072985${_scopeId}>bank-sme</code>) carries the SME book. Two <code data-v-de072985${_scopeId}>lfiCode</code>s, two authorisation servers, one bank code in the IBAN. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>A three-way split.</strong> <code data-v-de072985${_scopeId}>bank-retail</code>, <code data-v-de072985${_scopeId}>bank-sme</code>, and <code data-v-de072985${_scopeId}>bank-corp</code> each onboarded separately, typically because each sits on a different core platform with its own release cycle. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>A split that has nothing to do with segment.</strong> A digital-only brand run alongside the parent bank, or an estate part-way through a migration, produces two instances under one bank code for reasons no segment field would describe. </li></ul></div><p data-v-de072985${_scopeId}><code data-v-de072985${_scopeId}>AEConfirmationDiscoveryResponse.Data</code> is a single object holding one <code data-v-de072985${_scopeId}>DiscoveryEndpointUrl</code> and one <code data-v-de072985${_scopeId}>ResourceServerUrl</code>. One bank code, one answer. With no segment to discriminate on and no room to return more than one, the Hub returns the retail instance — correct when the payee holds a retail account, and wrong in every other case. The TPP is given no way to tell which of the two it received. </p><div class="ofp-code" data-v-de072985${_scopeId}><div class="ofp-code__label" data-v-de072985${_scopeId}>Today — the corporate payee that cannot be found</div><pre class="ofp-code__pre" data-v-de072985${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><p data-v-de072985${_scopeId}> The outcome is not reported as an error. A `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-de072985${_scopeId2}>204</code>`);
                } else {
                  return [
                    createVNode("code", null, "204")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` is a valid CoP response meaning <em data-v-de072985${_scopeId}>the IBAN is not recognised</em>, so the request succeeds, no fault is raised, and neither the TPP nor the Hub has a signal that the check was sent to an instance that was never going to hold the account. The TPP reports to the payer that the account could not be verified, for an account that would have matched had the request reached the instance that holds it. </p><p data-v-de072985${_scopeId}> The result is a negative that is indistinguishable, to the TPP and to the payer, from a mistyped or fraudulent IBAN — which is the outcome Confirmation of Payee exists to identify. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>Return them all, and let the TPP ask each in turn</h2></div><div class="ofp-prose" data-v-de072985${_scopeId}><p data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}><code data-v-de072985${_scopeId}>Data</code> becomes an array.</strong> The Hub resolves the IBAN to a bank code as it does today, and returns <strong data-v-de072985${_scopeId}>every instance registered under that bank code that serves Confirmation of Payee</strong> — each as the same <code data-v-de072985${_scopeId}>DiscoveryEndpointUrl</code> and <code data-v-de072985${_scopeId}>ResourceServerUrl</code> pair the response already carries. A bank running one instance returns an array of one. A bank running retail, SME, and corporate returns three. </p><div class="ofp-code" data-v-de072985${_scopeId}><div class="ofp-code__label" data-v-de072985${_scopeId}>Proposed — the shape, and what the TPP does with it</div><pre class="ofp-code__pre" data-v-de072985${_scopeId}>${ssrInterpolate(proposedExample)}</pre></div><p data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>How many of the entries a TPP calls is the TPP’s choice.</strong> One that already knows where the payee’s account sits — from a previous successful check against the same IBAN, or from what it knows of the payee — may go straight to that entry. One with nothing to go on attempts the entries in turn, or attempts them all. </p><p data-v-de072985${_scopeId}> What the choice does not change is what may be concluded. A <code data-v-de072985${_scopeId}>200</code> carrying <code data-v-de072985${_scopeId}>ConfirmationOfPayee.Yes</code>, <code data-v-de072985${_scopeId}>Partial</code>, or <code data-v-de072985${_scopeId}>No</code> is authoritative, because the account was found and the submitted name was evaluated against it. A <code data-v-de072985${_scopeId}>204</code> means only that the instance queried does not hold the account. <strong data-v-de072985${_scopeId}>The IBAN may be reported as not recognised only once every entry in the array has returned <code data-v-de072985${_scopeId}>204</code></strong> — a TPP that called some of the entries and received <code data-v-de072985${_scopeId}>204</code> from each has an inconclusive result, not a negative one. </p><p data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>Nothing changes at the LFI.</strong> Ozone Connect keeps the same `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/open-api/cop-query" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-de072985${_scopeId2}>POST /customers/action/cop-query</code>`);
                } else {
                  return [
                    createVNode("code", null, "POST /customers/action/cop-query")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` contract, and each instance answers for the accounts it holds exactly as it does now. Both URLs in every entry are Hub-hosted — <code data-v-de072985${_scopeId}>auth1.{lfiCode}</code> and <code data-v-de072985${_scopeId}>rs1.{lfiCode}</code> — so this is the Hub returning more of what it already knows, from directory data it already holds. This is the reason for preferring this shape to the alternatives set out in section 06. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 03 · Scope and behaviour</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>What goes in the array, and what the TPP does with it</h2><p class="ofp-band__lede" data-v-de072985${_scopeId}> Returning more than one endpoint only helps if it is unambiguous which responses end the search, which ones continue it, and what the TPP is entitled to tell the payer at the end. </p></div><div class="ofp-prose" data-v-de072985${_scopeId}><div class="ofp-rules" data-v-de072985${_scopeId}><div class="ofp-rules__label" data-v-de072985${_scopeId}>Proposed rules</div><ul class="ofp-rules__list" data-v-de072985${_scopeId}><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}><code data-v-de072985${_scopeId}>Data</code> MUST be an array of one or more source objects.</strong> Each object keeps the current schema unchanged — <code data-v-de072985${_scopeId}>DiscoveryEndpointUrl</code> and <code data-v-de072985${_scopeId}>ResourceServerUrl</code>, both required. A bank with a single instance returns an array of one; there is no special case and no object form to fall back to. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>The Hub MUST include only instances that serve Confirmation of Payee.</strong> An instance that does not advertise the <code data-v-de072985${_scopeId}>confirmation</code> API family is left out, so a TPP is never sent to an endpoint that cannot answer the question it is being asked. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>The order MUST be stable for a given bank code</strong>, and the Hub SHOULD order entries by how likely each is to hold an arbitrary account — in practice retail first. Position carries no assertion about the payee: the first entry is the most likely instance, not the identified one. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>How many entries to call is the TPP’s choice.</strong> A TPP that has grounds to identify the instance holding the payee’s account MAY call that entry alone; a TPP without them MAY call the entries in turn or call them all. Nothing in this proposal requires a fixed number of attempts. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>A <code data-v-de072985${_scopeId}>200</code> is authoritative and ends the check.</strong> The account was found and the submitted name was evaluated against it, so <code data-v-de072985${_scopeId}>Yes</code>, <code data-v-de072985${_scopeId}>Partial</code>, and <code data-v-de072985${_scopeId}>No</code> are all final. The TPP MUST NOT continue to other entries looking for a better answer. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>A <code data-v-de072985${_scopeId}>204</code> MUST NOT be reported as “not recognised” unless every entry returned one.</strong> A <code data-v-de072985${_scopeId}>204</code> states only that the instance queried does not hold the account. Where the TPP called a subset, or where any entry answered <code data-v-de072985${_scopeId}>4xx</code> or <code data-v-de072985${_scopeId}>5xx</code>, the result is inconclusive and the outcome reported to the payer is <em data-v-de072985${_scopeId}>could not verify</em> — a different statement from <em data-v-de072985${_scopeId}>not recognised</em>, and the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`user journeys`);
                } else {
                  return [
                    createTextVNode("user journeys")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` must keep the two apart. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>Each entry is authenticated on its own terms.</strong> The access token for a <code data-v-de072985${_scopeId}>/confirmation</code> call comes from the token endpoint published at that entry’s <code data-v-de072985${_scopeId}>DiscoveryEndpointUrl</code>; a token issued by one instance is not valid at another. TPPs SHOULD cache tokens per instance and reuse them across checks rather than re-authenticating on every attempt. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>Where more than one entry is attempted, the attempts SHOULD be sequential.</strong> Calling every entry in parallel incurs a charge for each one and multiplies load across the ecosystem for a single payee check, whereas sequential attempts stop at the first <code data-v-de072985${_scopeId}>200</code>. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>The request is unchanged.</strong> <code data-v-de072985${_scopeId}>POST /discovery</code> still takes the IBAN alone — no segment hint, no account-type parameter. The TPP does not know the payee’s segment either, so asking it to declare one would only move the guess. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>No change to <code data-v-de072985${_scopeId}>/confirmation</code>, and none at the LFI.</strong> The confirmation request and response schemas, the match indicators, and the Ozone Connect <code data-v-de072985${_scopeId}>cop-query</code> contract are all untouched. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>Out of scope: every other flow.</strong> Data Sharing and Service Initiation select an authorisation server from the directory with the customer’s involvement, so segmentation is already handled there. Insurance is unaffected. </li></ul></div></div></div></section><section class="ofp-band ofp-band--white" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 04 · Technical changes</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>What changes</h2><p class="ofp-band__lede" data-v-de072985${_scopeId}> One schema field changes cardinality. The implementation work falls on the API Hub and on TPPs. <strong data-v-de072985${_scopeId}>No LFI changes anything.</strong></p></div><div class="ofp-rules" data-v-de072985${_scopeId}><div class="ofp-rules__label" data-v-de072985${_scopeId}>Who implements what</div><ul class="ofp-rules__list" data-v-de072985${_scopeId}><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>LFI — nothing.</strong> No new endpoint, no schema change, and no change to Ozone Connect. <code data-v-de072985${_scopeId}>POST /customers/action/cop-query</code> keeps its current contract, and each instance answers for the accounts it holds exactly as it does now. An LFI does not see this change: it never learns whether the Hub named it alone or alongside its other instances, because the array is assembled after the Hub has resolved the IBAN and before any LFI is called at all. Nothing is required of an LFI to be conformant at V2.2. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>API Hub — the response.</strong> The schema change, and assembling the array from directory data the Hub already holds. It calls no one it does not call today. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>TPP — parsing and reporting.</strong> Read an array rather than an object, decide which entries to call, and apply the reporting rule: “not recognised” only once every entry has returned <code data-v-de072985${_scopeId}>204</code>. </li></ul></div><div class="ofp-changes" data-v-de072985${_scopeId}><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>01 · Standards specification</div><p data-v-de072985${_scopeId}> In <code data-v-de072985${_scopeId}>uae-confirmation-of-payee-openapi.yaml</code>, change <code data-v-de072985${_scopeId}>AEConfirmationDiscoveryResponse.Data</code> from a <code data-v-de072985${_scopeId}>$ref</code> to <code data-v-de072985${_scopeId}>AEConfirmationSourceProperties</code> into an <code data-v-de072985${_scopeId}>array</code> of it, with <code data-v-de072985${_scopeId}>minItems: 1</code>. <code data-v-de072985${_scopeId}>AEConfirmationSourceProperties</code> itself is unchanged — both fields stay required, so each entry is exactly the object TPPs parse today. The request schema, <code data-v-de072985${_scopeId}>Links</code>, and <code data-v-de072985${_scopeId}>Meta</code> are untouched, and <code data-v-de072985${_scopeId}>/confirmation</code> does not move. Targets <strong data-v-de072985${_scopeId}>V2.2</strong>. </p></div><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>02 · API Hub</div><p data-v-de072985${_scopeId}> Assemble the response from every authorisation server registered under the resolved bank code whose instance advertises the <code data-v-de072985${_scopeId}>confirmation</code> API family, in a stable order with the retail instance first. The Hub holds all of this in the Trust Framework directory already — <code data-v-de072985${_scopeId}>lfiCode</code>, <code data-v-de072985${_scopeId}>issuer</code>, <code data-v-de072985${_scopeId}>discoveryUri</code>, <code data-v-de072985${_scopeId}>apiFamilies</code> — so the change is in how the response is built, not in what the Hub knows or who it has to ask. </p></div><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>03 · Documentation</div><p data-v-de072985${_scopeId}> Rewrite steps 5 to 10 of the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/api-guide" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Confirmation of Payee API Guide`);
                } else {
                  return [
                    createTextVNode("Confirmation of Payee API Guide")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` so discovery yields a list and the token-and-confirm sequence is shown as a loop over it, with the stop conditions from section 03 stated as code rather than prose. Update the CoP sequence diagram, the capability landing page, and the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`user journeys`);
                } else {
                  return [
                    createTextVNode("user journeys")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` so “not recognised” and “could not verify” are presented to the payer as the different outcomes they are. Record the change in the version changelog. </p></div><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>04 · Functional certification and Postman</div><p data-v-de072985${_scopeId}> Add a Confirmation of Payee scenario in which an IBAN belonging to a multi-instance bank resolves to an array of more than one entry, the first attempt returns <code data-v-de072985${_scopeId}>204</code>, and a later entry returns a match. The assertion is on what the TPP reports, not on how many entries it called: a single <code data-v-de072985${_scopeId}>204</code> must not be surfaced to the payer as “not recognised”. Update the CoP Postman collection to iterate the returned entries. </p></div><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>05 · Separate prerequisite — onboarding the non-retail instances</div><p data-v-de072985${_scopeId}> This one is not part of the change above, is not required for conformance at V2.2, and is not scheduled by this proposal — but without it the array returns nothing beyond the retail instance. For a corporate payee to be verifiable, the SME and corporate instances have to serve CoP, advertise the <code data-v-de072985${_scopeId}>confirmation</code> API family, and accept the <code data-v-de072985${_scopeId}>confirmation-of-payee</code> scope, and TPPs have to be able to authenticate against them. Where an LFI has not implemented <code data-v-de072985${_scopeId}>cop-query</code> on those instances, that is LFI work — but it is the work of extending an existing capability to another estate, not anything this proposal introduces. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 05 · Versioning and migration</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>A breaking change that is safe in a minor version</h2><p class="ofp-band__lede" data-v-de072985${_scopeId}> The change is breaking — <code data-v-de072985${_scopeId}>Data</code> stops being an object — so it is proposed for <strong data-v-de072985${_scopeId}>V2.2</strong>, at a version boundary, rather than as an erratum against V2.1. What makes a minor version sufficient is that nothing about this endpoint forces two participants to migrate together. </p></div><div class="ofp-prose" data-v-de072985${_scopeId}><div class="ofp-rules" data-v-de072985${_scopeId}><div class="ofp-rules__label" data-v-de072985${_scopeId}>Why the two versions can run side by side</div><ul class="ofp-rules__list" data-v-de072985${_scopeId}><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>The API Hub controls the endpoint end to end.</strong><code data-v-de072985${_scopeId}>POST /discovery</code> is answered by the Hub alone, from directory data, with no LFI in the path. The Hub can therefore serve <code data-v-de072985${_scopeId}>/open-finance/confirmation-of-payee/v2.1/discovery</code> and <code data-v-de072985${_scopeId}>/v2.2/discovery</code> concurrently, returning the single object at one and the array at the other. </li><li data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>The call is client credentials, not consented.</strong> There is no consent bound to a version, no authorisation journey, and no stored state that outlives the request. Each discovery call stands alone, so the version is a property of the request the TPP makes and of nothing else. </li></ul></div><p data-v-de072985${_scopeId}> Together these mean <strong data-v-de072985${_scopeId}>a TPP migrates when it chooses to</strong>. One that has not moved keeps calling the V2.1 path and keeps receiving the single-object response — including where the LFI holding the payee’s account has already migrated, because the LFI’s version has no bearing on the shape the Hub returns to a TPP. The V2.1 request and response examples stay correct for as long as V2.1 is served. </p><p data-v-de072985${_scopeId}> This is what separates it from a breaking change in Data Sharing or Service Initiation, where a consent is created at a version and held for its lifetime, so one participant’s migration pulls on the other’s. Here there is no such coupling: a TPP picks up the segment fix at the point it moves to V2.2, and until then behaves exactly as it does today. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 06 · Alternatives considered</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>Two other ways to find the right estate</h2><p class="ofp-band__lede" data-v-de072985${_scopeId}> Both resolve the segment more precisely than fan-out does. Both were set aside — the first deliberately rather than permanently. </p></div><div class="ofp-prose" data-v-de072985${_scopeId}><div class="ofp-changes" data-v-de072985${_scopeId}><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>01 · An LFI-hosted CoP discovery endpoint — deferred</div><p data-v-de072985${_scopeId}> The LFI exposes an endpoint that resolves one of its own IBANs to the estate that holds it, and the Hub calls it before answering <code data-v-de072985${_scopeId}>/discovery</code>. This is the accurate answer: one request, the correct instance, no fan-out, no wasted charges, and no <code data-v-de072985${_scopeId}>204</code> that has to be interpreted. </p><p data-v-de072985${_scopeId}> It was deferred on implementation effort. It puts a new endpoint into every LFI — specification, build, test, certification, and an operational dependency on the <code data-v-de072985${_scopeId}>/discovery</code> path for every bank in the ecosystem — to solve a problem the Hub can address on its own with data it already holds. Deferred, not rejected: if fan-out proves expensive in practice, this is the change that replaces it. </p></div><div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>02 · A segment hint in the discovery request</div><p data-v-de072985${_scopeId}> The TPP declares the expected account type and the Hub returns the matching instance. This requires the TPP to know the payee’s segment, which it has no basis for: the payee is not its customer, and a TPP paying an invoice holds a name and an IBAN, not an account type. The parameter would move the assumption from the Hub to the TPP without the retry that fan-out provides when the assumption is wrong. </p></div></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 07 · Questions</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>Two questions, asked with the vote</h2><p class="ofp-band__lede" data-v-de072985${_scopeId}> These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees both. The vote decides the response shape; these answers decide the version it lands at and what it costs to use. </p></div><div class="ofp-prose" data-v-de072985${_scopeId}><div class="ofp-changes" data-v-de072985${_scopeId}><!--[-->`);
            ssrRenderList(questions, (item, i) => {
              _push2(`<div class="ofp-change" data-v-de072985${_scopeId}><div class="ofp-change__label" data-v-de072985${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))} · ${ssrInterpolate(item.who)}</div><p data-v-de072985${_scopeId}><strong data-v-de072985${_scopeId}>${ssrInterpolate(item.q)}</strong></p><p data-v-de072985${_scopeId}>${ssrInterpolate(item.why)}</p></div>`);
            });
            _push2(`<!--]--></div></div></div></section><section class="ofp-band ofp-band--white" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 08 · Pros</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>What the array buys</h2></div><ul class="ofp-pros" data-v-de072985${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-de072985${_scopeId}><span class="ofp-pros__glyph" data-v-de072985${_scopeId}>✓</span><span data-v-de072985${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-de072985${_scopeId}><div class="ofp-band__inner" data-v-de072985${_scopeId}><div class="ofp-band__head" data-v-de072985${_scopeId}><div class="ofp-band__eyebrow" data-v-de072985${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-de072985${_scopeId}></span> 09 · Cons</div><h2 class="ofp-band__title" data-v-de072985${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-de072985${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-de072985${_scopeId}><span class="ofp-cons__glyph" data-v-de072985${_scopeId}>×</span><span data-v-de072985${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "An IBAN names a bank, not an estate")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Confirmation of Payee is the one flow where the API Hub chooses the LFI on the TPP’s behalf. Everywhere else the customer picks their own institution and the consent is raised against the authorisation server they chose. Here the subject of the check is the "),
                      createVNode("em", null, "payee"),
                      createTextVNode(" — not the TPP’s customer, not present, and not able to be asked anything — so the only input is the destination IBAN, and "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "POST /discovery")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" exists to turn it into somewhere to send the request. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A UAE IBAN carries the bank code, and the Hub resolves it correctly. What the IBAN does not carry is the "),
                      createVNode("strong", null, "segment"),
                      createTextVNode(" — whether the account sits on the bank’s retail, SME, or corporate estate — and those estates are separate Open Finance instances with their own "),
                      createVNode("code", null, "lfiCode"),
                      createTextVNode(", their own authorisation server, and their own API Hub resource server. That separation is not an edge case — it is the ordinary way a bank with more than one customer base is onboarded: ")
                    ]),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "How one bank code can map to several instances"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "A retail and a business estate."),
                          createTextVNode(" One instance ("),
                          createVNode("code", null, "bank-retail"),
                          createTextVNode(") carries personal current and savings accounts; a second ("),
                          createVNode("code", null, "bank-sme"),
                          createTextVNode(") carries the SME book. Two "),
                          createVNode("code", null, "lfiCode"),
                          createTextVNode("s, two authorisation servers, one bank code in the IBAN. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "A three-way split."),
                          createTextVNode(),
                          createVNode("code", null, "bank-retail"),
                          createTextVNode(", "),
                          createVNode("code", null, "bank-sme"),
                          createTextVNode(", and "),
                          createVNode("code", null, "bank-corp"),
                          createTextVNode(" each onboarded separately, typically because each sits on a different core platform with its own release cycle. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "A split that has nothing to do with segment."),
                          createTextVNode(" A digital-only brand run alongside the parent bank, or an estate part-way through a migration, produces two instances under one bank code for reasons no segment field would describe. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createVNode("code", null, "AEConfirmationDiscoveryResponse.Data"),
                      createTextVNode(" is a single object holding one "),
                      createVNode("code", null, "DiscoveryEndpointUrl"),
                      createTextVNode(" and one "),
                      createVNode("code", null, "ResourceServerUrl"),
                      createTextVNode(". One bank code, one answer. With no segment to discriminate on and no room to return more than one, the Hub returns the retail instance — correct when the payee holds a retail account, and wrong in every other case. The TPP is given no way to tell which of the two it received. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the corporate payee that cannot be found"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The outcome is not reported as an error. A "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "204")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" is a valid CoP response meaning "),
                      createVNode("em", null, "the IBAN is not recognised"),
                      createTextVNode(", so the request succeeds, no fault is raised, and neither the TPP nor the Hub has a signal that the check was sent to an instance that was never going to hold the account. The TPP reports to the payer that the account could not be verified, for an account that would have matched had the request reached the instance that holds it. ")
                    ]),
                    createVNode("p", null, " The result is a negative that is indistinguishable, to the TPP and to the payer, from a mistyped or fraudulent IBAN — which is the outcome Confirmation of Payee exists to identify. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Return them all, and let the TPP ask each in turn")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "Data"),
                        createTextVNode(" becomes an array.")
                      ]),
                      createTextVNode(" The Hub resolves the IBAN to a bank code as it does today, and returns "),
                      createVNode("strong", null, "every instance registered under that bank code that serves Confirmation of Payee"),
                      createTextVNode(" — each as the same "),
                      createVNode("code", null, "DiscoveryEndpointUrl"),
                      createTextVNode(" and "),
                      createVNode("code", null, "ResourceServerUrl"),
                      createTextVNode(" pair the response already carries. A bank running one instance returns an array of one. A bank running retail, SME, and corporate returns three. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — the shape, and what the TPP does with it"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(proposedExample))
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "How many of the entries a TPP calls is the TPP’s choice."),
                      createTextVNode(" One that already knows where the payee’s account sits — from a previous successful check against the same IBAN, or from what it knows of the payee — may go straight to that entry. One with nothing to go on attempts the entries in turn, or attempts them all. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" What the choice does not change is what may be concluded. A "),
                      createVNode("code", null, "200"),
                      createTextVNode(" carrying "),
                      createVNode("code", null, "ConfirmationOfPayee.Yes"),
                      createTextVNode(", "),
                      createVNode("code", null, "Partial"),
                      createTextVNode(", or "),
                      createVNode("code", null, "No"),
                      createTextVNode(" is authoritative, because the account was found and the submitted name was evaluated against it. A "),
                      createVNode("code", null, "204"),
                      createTextVNode(" means only that the instance queried does not hold the account. "),
                      createVNode("strong", null, [
                        createTextVNode("The IBAN may be reported as not recognised only once every entry in the array has returned "),
                        createVNode("code", null, "204")
                      ]),
                      createTextVNode(" — a TPP that called some of the entries and received "),
                      createVNode("code", null, "204"),
                      createTextVNode(" from each has an inconclusive result, not a negative one. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Nothing changes at the LFI."),
                      createTextVNode(" Ozone Connect keeps the same "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/open-api/cop-query" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "POST /customers/action/cop-query")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" contract, and each instance answers for the accounts it holds exactly as it does now. Both URLs in every entry are Hub-hosted — "),
                      createVNode("code", null, "auth1.{lfiCode}"),
                      createTextVNode(" and "),
                      createVNode("code", null, "rs1.{lfiCode}"),
                      createTextVNode(" — so this is the Hub returning more of what it already knows, from directory data it already holds. This is the reason for preferring this shape to the alternatives set out in section 06. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What goes in the array, and what the TPP does with it"),
                    createVNode("p", { class: "ofp-band__lede" }, " Returning more than one endpoint only helps if it is unambiguous which responses end the search, which ones continue it, and what the TPP is entitled to tell the payer at the end. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Proposed rules"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "Data"),
                            createTextVNode(" MUST be an array of one or more source objects.")
                          ]),
                          createTextVNode(" Each object keeps the current schema unchanged — "),
                          createVNode("code", null, "DiscoveryEndpointUrl"),
                          createTextVNode(" and "),
                          createVNode("code", null, "ResourceServerUrl"),
                          createTextVNode(", both required. A bank with a single instance returns an array of one; there is no special case and no object form to fall back to. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The Hub MUST include only instances that serve Confirmation of Payee."),
                          createTextVNode(" An instance that does not advertise the "),
                          createVNode("code", null, "confirmation"),
                          createTextVNode(" API family is left out, so a TPP is never sent to an endpoint that cannot answer the question it is being asked. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The order MUST be stable for a given bank code"),
                          createTextVNode(", and the Hub SHOULD order entries by how likely each is to hold an arbitrary account — in practice retail first. Position carries no assertion about the payee: the first entry is the most likely instance, not the identified one. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "How many entries to call is the TPP’s choice."),
                          createTextVNode(" A TPP that has grounds to identify the instance holding the payee’s account MAY call that entry alone; a TPP without them MAY call the entries in turn or call them all. Nothing in this proposal requires a fixed number of attempts. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("A "),
                            createVNode("code", null, "200"),
                            createTextVNode(" is authoritative and ends the check.")
                          ]),
                          createTextVNode(" The account was found and the submitted name was evaluated against it, so "),
                          createVNode("code", null, "Yes"),
                          createTextVNode(", "),
                          createVNode("code", null, "Partial"),
                          createTextVNode(", and "),
                          createVNode("code", null, "No"),
                          createTextVNode(" are all final. The TPP MUST NOT continue to other entries looking for a better answer. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("A "),
                            createVNode("code", null, "204"),
                            createTextVNode(" MUST NOT be reported as “not recognised” unless every entry returned one.")
                          ]),
                          createTextVNode(" A "),
                          createVNode("code", null, "204"),
                          createTextVNode(" states only that the instance queried does not hold the account. Where the TPP called a subset, or where any entry answered "),
                          createVNode("code", null, "4xx"),
                          createTextVNode(" or "),
                          createVNode("code", null, "5xx"),
                          createTextVNode(", the result is inconclusive and the outcome reported to the payer is "),
                          createVNode("em", null, "could not verify"),
                          createTextVNode(" — a different statement from "),
                          createVNode("em", null, "not recognised"),
                          createTextVNode(", and the "),
                          createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys" }, {
                            default: withCtx(() => [
                              createTextVNode("user journeys")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" must keep the two apart. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Each entry is authenticated on its own terms."),
                          createTextVNode(" The access token for a "),
                          createVNode("code", null, "/confirmation"),
                          createTextVNode(" call comes from the token endpoint published at that entry’s "),
                          createVNode("code", null, "DiscoveryEndpointUrl"),
                          createTextVNode("; a token issued by one instance is not valid at another. TPPs SHOULD cache tokens per instance and reuse them across checks rather than re-authenticating on every attempt. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Where more than one entry is attempted, the attempts SHOULD be sequential."),
                          createTextVNode(" Calling every entry in parallel incurs a charge for each one and multiplies load across the ecosystem for a single payee check, whereas sequential attempts stop at the first "),
                          createVNode("code", null, "200"),
                          createTextVNode(". ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The request is unchanged."),
                          createTextVNode(),
                          createVNode("code", null, "POST /discovery"),
                          createTextVNode(" still takes the IBAN alone — no segment hint, no account-type parameter. The TPP does not know the payee’s segment either, so asking it to declare one would only move the guess. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, [
                            createTextVNode("No change to "),
                            createVNode("code", null, "/confirmation"),
                            createTextVNode(", and none at the LFI.")
                          ]),
                          createTextVNode(" The confirmation request and response schemas, the match indicators, and the Ozone Connect "),
                          createVNode("code", null, "cop-query"),
                          createTextVNode(" contract are all untouched. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Out of scope: every other flow."),
                          createTextVNode(" Data Sharing and Service Initiation select an authorisation server from the directory with the customer’s involvement, so segmentation is already handled there. Insurance is unaffected. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What changes"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" One schema field changes cardinality. The implementation work falls on the API Hub and on TPPs. "),
                      createVNode("strong", null, "No LFI changes anything.")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-rules" }, [
                    createVNode("div", { class: "ofp-rules__label" }, "Who implements what"),
                    createVNode("ul", { class: "ofp-rules__list" }, [
                      createVNode("li", null, [
                        createVNode("strong", null, "LFI — nothing."),
                        createTextVNode(" No new endpoint, no schema change, and no change to Ozone Connect. "),
                        createVNode("code", null, "POST /customers/action/cop-query"),
                        createTextVNode(" keeps its current contract, and each instance answers for the accounts it holds exactly as it does now. An LFI does not see this change: it never learns whether the Hub named it alone or alongside its other instances, because the array is assembled after the Hub has resolved the IBAN and before any LFI is called at all. Nothing is required of an LFI to be conformant at V2.2. ")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "API Hub — the response."),
                        createTextVNode(" The schema change, and assembling the array from directory data the Hub already holds. It calls no one it does not call today. ")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "TPP — parsing and reporting."),
                        createTextVNode(" Read an array rather than an object, decide which entries to call, and apply the reporting rule: “not recognised” only once every entry has returned "),
                        createVNode("code", null, "204"),
                        createTextVNode(". ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Standards specification"),
                      createVNode("p", null, [
                        createTextVNode(" In "),
                        createVNode("code", null, "uae-confirmation-of-payee-openapi.yaml"),
                        createTextVNode(", change "),
                        createVNode("code", null, "AEConfirmationDiscoveryResponse.Data"),
                        createTextVNode(" from a "),
                        createVNode("code", null, "$ref"),
                        createTextVNode(" to "),
                        createVNode("code", null, "AEConfirmationSourceProperties"),
                        createTextVNode(" into an "),
                        createVNode("code", null, "array"),
                        createTextVNode(" of it, with "),
                        createVNode("code", null, "minItems: 1"),
                        createTextVNode(". "),
                        createVNode("code", null, "AEConfirmationSourceProperties"),
                        createTextVNode(" itself is unchanged — both fields stay required, so each entry is exactly the object TPPs parse today. The request schema, "),
                        createVNode("code", null, "Links"),
                        createTextVNode(", and "),
                        createVNode("code", null, "Meta"),
                        createTextVNode(" are untouched, and "),
                        createVNode("code", null, "/confirmation"),
                        createTextVNode(" does not move. Targets "),
                        createVNode("strong", null, "V2.2"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · API Hub"),
                      createVNode("p", null, [
                        createTextVNode(" Assemble the response from every authorisation server registered under the resolved bank code whose instance advertises the "),
                        createVNode("code", null, "confirmation"),
                        createTextVNode(" API family, in a stable order with the retail instance first. The Hub holds all of this in the Trust Framework directory already — "),
                        createVNode("code", null, "lfiCode"),
                        createTextVNode(", "),
                        createVNode("code", null, "issuer"),
                        createTextVNode(", "),
                        createVNode("code", null, "discoveryUri"),
                        createTextVNode(", "),
                        createVNode("code", null, "apiFamilies"),
                        createTextVNode(" — so the change is in how the response is built, not in what the Hub knows or who it has to ask. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Documentation"),
                      createVNode("p", null, [
                        createTextVNode(" Rewrite steps 5 to 10 of the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/api-guide" }, {
                          default: withCtx(() => [
                            createTextVNode("Confirmation of Payee API Guide")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" so discovery yields a list and the token-and-confirm sequence is shown as a loop over it, with the stop conditions from section 03 stated as code rather than prose. Update the CoP sequence diagram, the capability landing page, and the "),
                        createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys" }, {
                          default: withCtx(() => [
                            createTextVNode("user journeys")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" so “not recognised” and “could not verify” are presented to the payer as the different outcomes they are. Record the change in the version changelog. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Functional certification and Postman"),
                      createVNode("p", null, [
                        createTextVNode(" Add a Confirmation of Payee scenario in which an IBAN belonging to a multi-instance bank resolves to an array of more than one entry, the first attempt returns "),
                        createVNode("code", null, "204"),
                        createTextVNode(", and a later entry returns a match. The assertion is on what the TPP reports, not on how many entries it called: a single "),
                        createVNode("code", null, "204"),
                        createTextVNode(" must not be surfaced to the payer as “not recognised”. Update the CoP Postman collection to iterate the returned entries. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "05 · Separate prerequisite — onboarding the non-retail instances"),
                      createVNode("p", null, [
                        createTextVNode(" This one is not part of the change above, is not required for conformance at V2.2, and is not scheduled by this proposal — but without it the array returns nothing beyond the retail instance. For a corporate payee to be verifiable, the SME and corporate instances have to serve CoP, advertise the "),
                        createVNode("code", null, "confirmation"),
                        createTextVNode(" API family, and accept the "),
                        createVNode("code", null, "confirmation-of-payee"),
                        createTextVNode(" scope, and TPPs have to be able to authenticate against them. Where an LFI has not implemented "),
                        createVNode("code", null, "cop-query"),
                        createTextVNode(" on those instances, that is LFI work — but it is the work of extending an existing capability to another estate, not anything this proposal introduces. ")
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
                      createTextVNode(" 05 · Versioning and migration")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A breaking change that is safe in a minor version"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" The change is breaking — "),
                      createVNode("code", null, "Data"),
                      createTextVNode(" stops being an object — so it is proposed for "),
                      createVNode("strong", null, "V2.2"),
                      createTextVNode(", at a version boundary, rather than as an erratum against V2.1. What makes a minor version sufficient is that nothing about this endpoint forces two participants to migrate together. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Why the two versions can run side by side"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "The API Hub controls the endpoint end to end."),
                          createVNode("code", null, "POST /discovery"),
                          createTextVNode(" is answered by the Hub alone, from directory data, with no LFI in the path. The Hub can therefore serve "),
                          createVNode("code", null, "/open-finance/confirmation-of-payee/v2.1/discovery"),
                          createTextVNode(" and "),
                          createVNode("code", null, "/v2.2/discovery"),
                          createTextVNode(" concurrently, returning the single object at one and the array at the other. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The call is client credentials, not consented."),
                          createTextVNode(" There is no consent bound to a version, no authorisation journey, and no stored state that outlives the request. Each discovery call stands alone, so the version is a property of the request the TPP makes and of nothing else. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Together these mean "),
                      createVNode("strong", null, "a TPP migrates when it chooses to"),
                      createTextVNode(". One that has not moved keeps calling the V2.1 path and keeps receiving the single-object response — including where the LFI holding the payee’s account has already migrated, because the LFI’s version has no bearing on the shape the Hub returns to a TPP. The V2.1 request and response examples stay correct for as long as V2.1 is served. ")
                    ]),
                    createVNode("p", null, " This is what separates it from a breaking change in Data Sharing or Service Initiation, where a consent is created at a version and held for its lifetime, so one participant’s migration pulls on the other’s. Here there is no such coupling: a TPP picks up the segment fix at the point it moves to V2.2, and until then behaves exactly as it does today. ")
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Alternatives considered")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Two other ways to find the right estate"),
                    createVNode("p", { class: "ofp-band__lede" }, " Both resolve the segment more precisely than fan-out does. Both were set aside — the first deliberately rather than permanently. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-changes" }, [
                      createVNode("div", { class: "ofp-change" }, [
                        createVNode("div", { class: "ofp-change__label" }, "01 · An LFI-hosted CoP discovery endpoint — deferred"),
                        createVNode("p", null, [
                          createTextVNode(" The LFI exposes an endpoint that resolves one of its own IBANs to the estate that holds it, and the Hub calls it before answering "),
                          createVNode("code", null, "/discovery"),
                          createTextVNode(". This is the accurate answer: one request, the correct instance, no fan-out, no wasted charges, and no "),
                          createVNode("code", null, "204"),
                          createTextVNode(" that has to be interpreted. ")
                        ]),
                        createVNode("p", null, [
                          createTextVNode(" It was deferred on implementation effort. It puts a new endpoint into every LFI — specification, build, test, certification, and an operational dependency on the "),
                          createVNode("code", null, "/discovery"),
                          createTextVNode(" path for every bank in the ecosystem — to solve a problem the Hub can address on its own with data it already holds. Deferred, not rejected: if fan-out proves expensive in practice, this is the change that replaces it. ")
                        ])
                      ]),
                      createVNode("div", { class: "ofp-change" }, [
                        createVNode("div", { class: "ofp-change__label" }, "02 · A segment hint in the discovery request"),
                        createVNode("p", null, " The TPP declares the expected account type and the Hub returns the matching instance. This requires the TPP to know the payee’s segment, which it has no basis for: the payee is not its customer, and a TPP paying an invoice holds a name and an IBAN, not an account type. The parameter would move the assumption from the Hub to the TPP without the retry that fan-out provides when the assumption is wrong. ")
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
                      createTextVNode(" 07 · Questions")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Two questions, asked with the vote"),
                    createVNode("p", { class: "ofp-band__lede" }, " These appear as optional boxes when you confirm your vote. Answer the ones addressed to you — every voter sees both. The vote decides the response shape; these answers decide the version it lands at and what it costs to use. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the array buys")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-013.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ofp013 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de072985"]]);
export {
  ofp013 as default
};
