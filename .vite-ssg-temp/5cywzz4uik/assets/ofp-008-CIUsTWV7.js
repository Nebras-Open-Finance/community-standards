import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, unref, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "OFP-008 · Protect FinanceRates with an LFI-hosted display element";
const OG_DESCRIPTION = "Retire the encrypted-JWE protection for FinanceRates. Instead of handing the TPP an encrypted rate to decrypt locally, the LFI returns a reference to a surface it renders itself on its own origin — so the rate value is never received by the TPP at all. How that surface is presented to the customer is left to a proof of concept and an agreed CX.";
const todayExample = `# Today — the LFI returns FinanceRates as an encrypted JWE
GET /accounts/{AccountId}/product

"FinanceRates": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0..."

# The TPP forwards this compact JWE to the customer’s browser and decrypts it
# locally using a one-time code the LFI sent out of band. Once decrypted, the
# cleartext rate exists in a context the TPP controls — whether it is stored or
# leaves the device rests on the TPP behaving as it demonstrated at certification.`;
const proposedExample = `# Proposed — the LFI returns a reference to a surface it renders itself
GET /accounts/{AccountId}/product

"FinanceRates": {
  "DisplayUrl": "https://display.altareq1.example.ae/rates?rt=eyJhbGciOi...",
  "ExpiresAt": "2026-08-01T14:30:00Z"
}

# The customer is shown the rate by LFI-origin content loaded from DisplayUrl.
# Because that content is cross-origin to the TPP, the TPP’s own code cannot read
# it — and the rate value never reaches the TPP in any form, encrypted or
# cleartext. How the surface is presented to the customer is settled by the proof
# of concept and the agreed CX, not fixed by this proposal.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ofp-008",
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
      id: "OFP-008",
      proposedBy: "Nebras",
      author: "Nowaier AlQahtani",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "4 Aug 2026",
      closes: "25 Aug 2026",
      priority: "medium",
      version: "V2.2"
    };
    const pros = [
      "The rate never enters the TPP’s systems in any form — protection is structural (cross-origin isolation), not a matter of trusting the TPP’s conduct after a point-in-time certification.",
      "Removes the heaviest parts of the LFI build: JWE generation and the PBES2 / A256GCM crypto, per-call one-time-code minting and out-of-band delivery, and OTP-spam rate limiting.",
      "The LFI no longer has to read the consent’s permissions before it responds. It returns the rate it holds — cleartext or reference — and the API Hub withholds FinanceRates when ReadProductFinanceRates is absent, exactly as it does for every other permission-gated field. The JWE path forces the LFI to make that check itself, from a local consent store or a Consent Manager round-trip, before it mints an OTP.",
      "Expiry is enforced by the LFI server-side, eliminating today’s “the TPP must honour exp” weakness and the header-vs-plaintext ambiguity in the current design.",
      "Lets LFIs reuse existing 3DS / challenge infrastructure to authenticate the customer before revealing the rate, rather than build a bespoke encryption-and-OTP flow.",
      "Makes the certification meaningful and technically enforceable at consent creation — closing the gap where nothing today stops an uncertified TPP requesting ReadProductFinanceRates.",
      "Cleartext stays available for LFIs that do not consider a given rate sensitive, so no forced friction is added where none is wanted.",
      "No LFI has a live JWE implementation, so removing AEJwe affects no one — this is a clean introduction, not a migration, with no deprecation window to run."
    ];
    const cons = [
      "LFIs must expose a customer-facing web surface with token validation — more front-end responsibility than a pure API contract, even where it reuses existing customer channels.",
      "The customer experience is not designed yet. How the surface is presented, sized, dismissed, and returned from is left to a proof of concept and an agreed CX, so neither side can fully size the front-end work from this proposal alone.",
      "The rate presentation belongs to the LFI, not the TPP. Consistency of protection is bought at the price of TPP control over how the rate appears in its own journey.",
      "Viewing a protected rate now requires a live, customer-present context and an LFI round-trip — it is not a server-side or batch-friendly path. (This already applies to today’s JWE + OTP path, which is also customer-present.)"
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
        title: "Protect FinanceRates with an LFI-hosted display element",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-eb468d13><section class="ofp-hero" data-v-eb468d13><div class="ofp-hero__inner" data-v-eb468d13>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/internal/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-eb468d13${_scopeId}>←</span> Internal proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" Internal proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-eb468d13><span class="ofp__id" data-v-eb468d13>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-eb468d13></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-eb468d13>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-eb468d13>Protect FinanceRates with an LFI-hosted display element</h1><p class="ofp__summary" data-v-eb468d13> Retire the encrypted-JWE protection for <code data-v-eb468d13>FinanceRates</code>. Instead of handing the TPP an encrypted rate to decrypt on the device, the LFI returns a reference to a surface it <strong data-v-eb468d13>renders itself</strong>, on its own origin — so the rate value is never received by the TPP at all. How that surface is presented to the customer is left to a proof of concept and an agreed CX. </p><div class="ofp__strip" data-v-eb468d13><div class="ofp__strip-item" data-v-eb468d13><div class="ofp__strip-key" data-v-eb468d13>Proposed by</div><div class="ofp__strip-val" data-v-eb468d13>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-eb468d13><div class="ofp__strip-key" data-v-eb468d13>Author</div><div class="ofp__strip-val" data-v-eb468d13>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-eb468d13><div class="ofp__strip-key" data-v-eb468d13>Target</div><div class="ofp__strip-val" data-v-eb468d13>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-eb468d13><div class="ofp__strip-key" data-v-eb468d13>Opened</div><div class="ofp__strip-val" data-v-eb468d13>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-eb468d13><div class="ofp__strip-key" data-v-eb468d13>Closes</div><div class="ofp__strip-val" data-v-eb468d13>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-eb468d13${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-eb468d13${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. This changes how a protected rate reaches the customer for every LFI and TPP, so the reasoning you record carries as much weight as the tally itself. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-eb468d13${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-eb468d13${_scopeId}><div class="ofp-vote-cover__card" data-v-eb468d13${_scopeId}><div class="ofp-vote-cover__label" data-v-eb468d13${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-eb468d13${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                    }, " Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. This changes how a protected rate reaches the customer for every LFI and TPP, so the reasoning you record carries as much weight as the tally itself. "))
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-eb468d13${_scopeId}><span class="ofp-seam-label" data-v-eb468d13${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>The encrypted-rate design is heavy to build and thin on protection</h2></div><div class="ofp-prose" data-v-eb468d13${_scopeId}><p data-v-eb468d13${_scopeId}> When a TPP holds <code data-v-eb468d13${_scopeId}>ReadProductFinanceRates</code> and calls `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-eb468d13${_scopeId2}>GET /accounts/{AccountId}/product</code>`);
                } else {
                  return [
                    createVNode("code", null, "GET /accounts/{AccountId}/product")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`, the LFI MAY return the <code data-v-eb468d13${_scopeId}>FinanceRates</code> field as a compact JWE rather than a cleartext object. The TPP forwards that JWE to the customer’s browser and decrypts it locally, using a one-time code the LFI sends the customer out of band. The `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Encrypted FinanceRates`);
                } else {
                  return [
                    createTextVNode("Encrypted FinanceRates")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` guide documents the full flow. </p><div class="ofp-code" data-v-eb468d13${_scopeId}><div class="ofp-code__label" data-v-eb468d13${_scopeId}>Today — the rate is handed to the TPP encrypted, then decrypted on the device</div><pre class="ofp-code__pre" data-v-eb468d13${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><p data-v-eb468d13${_scopeId}> LFI feedback has surfaced two structural problems. First, it is <strong data-v-eb468d13${_scopeId}>heavy to implement for thin protection</strong>. The LFI must generate a per-call JWE (PBES2-HS512+A256KW / A256GCM), mint and deliver a one-time code on a channel it controls, and operate OTP-spam rate limits — a significant build. Yet once the browser decrypts the JWE, the cleartext rate exists in a context the TPP controls; whether it is stored or leaves the device rests on trusting the TPP to behave as it demonstrated at certification. </p><p data-v-eb468d13${_scopeId}> Second, that <strong data-v-eb468d13${_scopeId}>certification is a point-in-time check, and it is not technically required</strong>. The optional certification attests, once, that the TPP decrypts and displays locally and does not persist the rate — it cannot bind the TPP’s runtime behaviour thereafter. Separately, nothing in the API Hub currently prevents an <em data-v-eb468d13${_scopeId}>uncertified</em> TPP from requesting <code data-v-eb468d13${_scopeId}>ReadProductFinanceRates</code> when it creates a consent; the dependency is documented but not enforced. </p><p data-v-eb468d13${_scopeId}> The net effect is real engineering cost on the LFI side buying protection that still rests on trust, with an enforcement gap on top. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>Have the LFI show the rate itself, within the customer’s journey</h2></div><div class="ofp-prose" data-v-eb468d13${_scopeId}><p data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>On <code data-v-eb468d13${_scopeId}>GET /accounts/{AccountId}/product</code>, an LFI protecting a rate returns — in place of the rate value — a short-lived reference to an LFI-hosted display surface. The customer reaches that surface from within the TPP’s journey, and the LFI renders the rate itself.</strong> Because the surface is served from the LFI’s own origin, it is cross-origin to the TPP: the TPP’s code cannot read the rate out of it, script into it, or capture its content. </p><div class="ofp-code" data-v-eb468d13${_scopeId}><div class="ofp-code__label" data-v-eb468d13${_scopeId}>Proposed — the LFI returns a reference to a surface it renders itself</div><pre class="ofp-code__pre" data-v-eb468d13${_scopeId}>${ssrInterpolate(proposedExample)}</pre></div><p data-v-eb468d13${_scopeId}> This mirrors 3-D Secure in shape: the LFI is the issuer, the TPP is the merchant, and the sensitive interaction happens in an issuer-controlled context the merchant cannot see into. LFIs that already run 3DS challenge infrastructure can reuse that tooling to authenticate the customer before the rate is revealed, replacing the out-of-band OTP entirely. </p><p data-v-eb468d13${_scopeId}> The customer’s browser or app loads the LFI surface <strong data-v-eb468d13${_scopeId}>directly from the LFI origin</strong>, exactly as it already reaches the LFI when the customer authenticates during consent authorisation. Strict mediation is preserved — the invariant governs API and data traffic, and the rate value is never proxied to the TPP; only a reference is. </p><p data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>How the surface is presented to the customer is deliberately left open by this proposal</strong> — it is a placeholder pending a proof of concept and an agreed customer experience. What is being put to the vote is the security model: the rate is rendered by the LFI and the value never reaches the TPP. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 03 · Scope and behaviour</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>What the reference means, precisely</h2><p class="ofp-band__lede" data-v-eb468d13${_scopeId}> The reference and the surface behind it become something TPPs and LFIs build against, so the shape and the controls have to be pinned down rather than left to implementation. </p></div><div class="ofp-prose" data-v-eb468d13${_scopeId}><div class="ofp-rules" data-v-eb468d13${_scopeId}><div class="ofp-rules__label" data-v-eb468d13${_scopeId}>Proposed rules</div><ul class="ofp-rules__list" data-v-eb468d13${_scopeId}><li data-v-eb468d13${_scopeId}><code data-v-eb468d13${_scopeId}>FinanceRates</code> becomes <code data-v-eb468d13${_scopeId}>anyOf</code> a cleartext <code data-v-eb468d13${_scopeId}>AEProductFinanceRates</code> object <strong data-v-eb468d13${_scopeId}>or</strong> a new <code data-v-eb468d13${_scopeId}>AERateDisplayRef</code>. The <code data-v-eb468d13${_scopeId}>AEJwe</code> shape is <strong data-v-eb468d13${_scopeId}>removed</strong> from this field. </li><li data-v-eb468d13${_scopeId}><code data-v-eb468d13${_scopeId}>AERateDisplayRef</code> carries a <code data-v-eb468d13${_scopeId}>DisplayUrl</code> on the LFI’s customer-facing display origin — itself carrying a signed, single-use request token — and an <code data-v-eb468d13${_scopeId}>ExpiresAt</code>. </li><li data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>The reference is bound to one customer and one account.</strong> The token binds the consent, the <strong data-v-eb468d13${_scopeId}>customer</strong> that consent was authorised by, the <code data-v-eb468d13${_scopeId}>AccountId</code>, the <code data-v-eb468d13${_scopeId}>ProductId</code>, and the TPP’s client identity. The LFI MUST refuse to render unless the customer present at the surface is that same customer, and MUST NOT serve a rate for any account other than the bound <code data-v-eb468d13${_scopeId}>AccountId</code>. A <code data-v-eb468d13${_scopeId}>DisplayUrl</code> obtained for one customer or one account is useless for another. </li><li data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>Confidentiality comes from cross-origin isolation.</strong> Because the LFI content is served from the LFI’s origin, the TPP cannot read the rate out of it, script into it, or capture its content — whatever presentation the agreed CX settles on. </li><li data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>Access comes from the token.</strong> A valid <code data-v-eb468d13${_scopeId}>DisplayUrl</code> only ever reaches the legitimate TPP, because obtaining one requires an authenticated, consented call through the API Hub. The LFI validates the token before rendering anything. </li><li data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>Expiry is enforced by the LFI, server-side.</strong> After <code data-v-eb468d13${_scopeId}>ExpiresAt</code> the surface stops rendering the rate — it is no longer a TPP obligation to honour a display window. </li><li data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>The LFI does not check the consent’s permissions on this path.</strong> It returns whichever shape it holds for the product — cleartext object or reference — and the API Hub withholds <code data-v-eb468d13${_scopeId}>FinanceRates</code> from the TPP when the consent does not carry <code data-v-eb468d13${_scopeId}>ReadProductFinanceRates</code>, exactly as it does for every other permission-gated field. Under the JWE design the LFI MUST make that check itself before minting an OTP, because issuing one has a real cost and is visible to the customer; returning a reference has neither property. </li><li data-v-eb468d13${_scopeId}><code data-v-eb468d13${_scopeId}>ReadProductFinanceRates</code> is <strong data-v-eb468d13${_scopeId}>unchanged</strong>. It still gates whether the rate reaches the TPP at all; if the permission is absent, <code data-v-eb468d13${_scopeId}>FinanceRates</code> does not appear on the <code data-v-eb468d13${_scopeId}>Product</code> record the TPP receives. </li></ul></div><p data-v-eb468d13${_scopeId}><strong data-v-eb468d13${_scopeId}>The embedding and presentation profile is a placeholder.</strong> This proposal fixes the reference, its bindings, and the isolation property; it does not fix how the surface is launched, sized, dismissed, or returned from, nor the native / webview variant. Those are settled by a proof of concept run with LFIs and TPPs and by the customer experience agreed from it, and documented once agreed. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 04 · Technical changes</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>What changes</h2><p class="ofp-band__lede" data-v-eb468d13${_scopeId}> One schema change, a display surface on the LFI side, a repurposed certification the API Hub can enforce, and documentation. The consent, audit, and billing semantics are untouched. </p></div><div class="ofp-changes" data-v-eb468d13${_scopeId}><div class="ofp-change" data-v-eb468d13${_scopeId}><div class="ofp-change__label" data-v-eb468d13${_scopeId}>01 · Standards schema</div><p data-v-eb468d13${_scopeId}> In the account-information specification, change <code data-v-eb468d13${_scopeId}>FinanceRates</code> to <code data-v-eb468d13${_scopeId}>anyOf</code> <code data-v-eb468d13${_scopeId}>[ AEProductFinanceRates, AERateDisplayRef ]</code>, add the <code data-v-eb468d13${_scopeId}>AERateDisplayRef</code> schema, and <strong data-v-eb468d13${_scopeId}>remove <code data-v-eb468d13${_scopeId}>AEJwe</code></strong> from this field. Targets <strong data-v-eb468d13${_scopeId}>V2.2</strong>. Because no LFI has a live JWE implementation, the removal affects no one and needs no deprecation window. </p></div><div class="ofp-change" data-v-eb468d13${_scopeId}><div class="ofp-change__label" data-v-eb468d13${_scopeId}>02 · LFI display surface</div><p data-v-eb468d13${_scopeId}> A protecting LFI stands up (or reuses) a tokenised, customer-facing display surface that validates the request token, confirms the customer present is the one the token is bound to, authenticates them where it chooses to — reusing existing 3DS / challenge infrastructure — renders the rate, and enforces <code data-v-eb468d13${_scopeId}>ExpiresAt</code> server-side. In return it retires the JWE generation, the one-time-code minting and delivery, the OTP-spam rate limits, and the consent-permission lookup this endpoint requires today. </p></div><div class="ofp-change" data-v-eb468d13${_scopeId}><div class="ofp-change__label" data-v-eb468d13${_scopeId}>03 · Certification &amp; enforcement</div><p data-v-eb468d13${_scopeId}> Rename the optional <em data-v-eb468d13${_scopeId}>Access Encrypted Resource Data</em> certification — a misnomer once there is no encryption — to <strong data-v-eb468d13${_scopeId}>Rate Display Embedding</strong>, and repurpose it: the TPP demonstrates it can correctly present and operate the LFI display surface and does not attempt to defeat its isolation. The precise conformance criteria follow the agreed CX. The API Hub SHOULD then reject a consent requesting <code data-v-eb468d13${_scopeId}>ReadProductFinanceRates</code> from a TPP that does not hold the certification, using the trust-framework record it already holds — closing today’s enforcement gap. </p></div><div class="ofp-change" data-v-eb468d13${_scopeId}><div class="ofp-change__label" data-v-eb468d13${_scopeId}>04 · Documentation</div><p data-v-eb468d13${_scopeId}> Rewrite the two <em data-v-eb468d13${_scopeId}>Encrypted FinanceRates</em> guides (TPP and LFI) and the Data Sharing requirements tables around the display surface, update the certification page under its new name, and record the change as an errata. The presentation half of those guides waits on the proof of concept and the agreed CX. No new registration field is introduced. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 05 · What this costs to build</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>A different shape of work, not obviously less of it</h2></div><div class="ofp-prose" data-v-eb468d13${_scopeId}><p data-v-eb468d13${_scopeId}> This proposal trades one build for another. It retires the JWE crypto, the one-time-code delivery, the OTP rate limiting, and the consent-permission lookup — genuinely the heaviest parts of today’s LFI work — but in their place a protecting LFI has to expose a <strong data-v-eb468d13${_scopeId}>customer-facing display surface</strong> with token validation and, if it wants friction control, a challenge step. For an LFI that already runs 3DS this is largely reuse; for one that does not, it is new front-end responsibility. </p><p data-v-eb468d13${_scopeId}> The change is <strong data-v-eb468d13${_scopeId}>meaningful for TPPs too</strong>: they move from forwarding a JWE and decrypting in-browser to presenting and operating a surface the LFI renders. And it is a <strong data-v-eb468d13${_scopeId}>breaking schema change</strong> to <code data-v-eb468d13${_scopeId}>FinanceRates</code>, taken at V2.2. The one thing that makes it cheap right now is that <strong data-v-eb468d13${_scopeId}>no LFI has shipped the JWE path</strong>, so nothing has to be migrated — this is close to a clean start rather than a transition. </p><p data-v-eb468d13${_scopeId}> Both sides should read the front-end estimate as <strong data-v-eb468d13${_scopeId}>provisional</strong>: the presentation is a placeholder until the proof of concept and the agreed CX land, so the security model is what a vote is being cast on, not a finished integration design. </p><p data-v-eb468d13${_scopeId}> A vote in favour is a statement that your institution would <em data-v-eb468d13${_scopeId}>build to</em> this — an LFI that it would host the surface, a TPP that it would present it — not merely that it reads as more secure. If the ecosystem would rather keep the encrypted-rate design, or would not use the protected path at all, that is a perfectly good outcome and the work will not be scheduled. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 06 · Pros</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>What the display surface buys</h2></div><ul class="ofp-pros" data-v-eb468d13${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-eb468d13${_scopeId}><span class="ofp-pros__glyph" data-v-eb468d13${_scopeId}>✓</span><span data-v-eb468d13${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-eb468d13${_scopeId}><div class="ofp-band__inner" data-v-eb468d13${_scopeId}><div class="ofp-band__head" data-v-eb468d13${_scopeId}><div class="ofp-band__eyebrow" data-v-eb468d13${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-eb468d13${_scopeId}></span> 07 · Cons</div><h2 class="ofp-band__title" data-v-eb468d13${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-eb468d13${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-eb468d13${_scopeId}><span class="ofp-cons__glyph" data-v-eb468d13${_scopeId}>×</span><span data-v-eb468d13${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "The encrypted-rate design is heavy to build and thin on protection")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" When a TPP holds "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" and calls "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "GET /accounts/{AccountId}/product")
                        ]),
                        _: 1
                      }),
                      createTextVNode(", the LFI MAY return the "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" field as a compact JWE rather than a cleartext object. The TPP forwards that JWE to the customer’s browser and decrypts it locally, using a one-time code the LFI sends the customer out of band. The "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates" }, {
                        default: withCtx(() => [
                          createTextVNode("Encrypted FinanceRates")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" guide documents the full flow. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the rate is handed to the TPP encrypted, then decrypted on the device"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" LFI feedback has surfaced two structural problems. First, it is "),
                      createVNode("strong", null, "heavy to implement for thin protection"),
                      createTextVNode(". The LFI must generate a per-call JWE (PBES2-HS512+A256KW / A256GCM), mint and deliver a one-time code on a channel it controls, and operate OTP-spam rate limits — a significant build. Yet once the browser decrypts the JWE, the cleartext rate exists in a context the TPP controls; whether it is stored or leaves the device rests on trusting the TPP to behave as it demonstrated at certification. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Second, that "),
                      createVNode("strong", null, "certification is a point-in-time check, and it is not technically required"),
                      createTextVNode(". The optional certification attests, once, that the TPP decrypts and displays locally and does not persist the rate — it cannot bind the TPP’s runtime behaviour thereafter. Separately, nothing in the API Hub currently prevents an "),
                      createVNode("em", null, "uncertified"),
                      createTextVNode(" TPP from requesting "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" when it creates a consent; the dependency is documented but not enforced. ")
                    ]),
                    createVNode("p", null, " The net effect is real engineering cost on the LFI side buying protection that still rests on trust, with an enforcement gap on top. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Have the LFI show the rate itself, within the customer’s journey")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("On "),
                        createVNode("code", null, "GET /accounts/{AccountId}/product"),
                        createTextVNode(", an LFI protecting a rate returns — in place of the rate value — a short-lived reference to an LFI-hosted display surface. The customer reaches that surface from within the TPP’s journey, and the LFI renders the rate itself.")
                      ]),
                      createTextVNode(" Because the surface is served from the LFI’s own origin, it is cross-origin to the TPP: the TPP’s code cannot read the rate out of it, script into it, or capture its content. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — the LFI returns a reference to a surface it renders itself"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(proposedExample))
                    ]),
                    createVNode("p", null, " This mirrors 3-D Secure in shape: the LFI is the issuer, the TPP is the merchant, and the sensitive interaction happens in an issuer-controlled context the merchant cannot see into. LFIs that already run 3DS challenge infrastructure can reuse that tooling to authenticate the customer before the rate is revealed, replacing the out-of-band OTP entirely. "),
                    createVNode("p", null, [
                      createTextVNode(" The customer’s browser or app loads the LFI surface "),
                      createVNode("strong", null, "directly from the LFI origin"),
                      createTextVNode(", exactly as it already reaches the LFI when the customer authenticates during consent authorisation. Strict mediation is preserved — the invariant governs API and data traffic, and the rate value is never proxied to the TPP; only a reference is. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "How the surface is presented to the customer is deliberately left open by this proposal"),
                      createTextVNode(" — it is a placeholder pending a proof of concept and an agreed customer experience. What is being put to the vote is the security model: the rate is rendered by the LFI and the value never reaches the TPP. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the reference means, precisely"),
                    createVNode("p", { class: "ofp-band__lede" }, " The reference and the surface behind it become something TPPs and LFIs build against, so the shape and the controls have to be pinned down rather than left to implementation. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Proposed rules"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("code", null, "FinanceRates"),
                          createTextVNode(" becomes "),
                          createVNode("code", null, "anyOf"),
                          createTextVNode(" a cleartext "),
                          createVNode("code", null, "AEProductFinanceRates"),
                          createTextVNode(" object "),
                          createVNode("strong", null, "or"),
                          createTextVNode(" a new "),
                          createVNode("code", null, "AERateDisplayRef"),
                          createTextVNode(". The "),
                          createVNode("code", null, "AEJwe"),
                          createTextVNode(" shape is "),
                          createVNode("strong", null, "removed"),
                          createTextVNode(" from this field. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("code", null, "AERateDisplayRef"),
                          createTextVNode(" carries a "),
                          createVNode("code", null, "DisplayUrl"),
                          createTextVNode(" on the LFI’s customer-facing display origin — itself carrying a signed, single-use request token — and an "),
                          createVNode("code", null, "ExpiresAt"),
                          createTextVNode(". ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The reference is bound to one customer and one account."),
                          createTextVNode(" The token binds the consent, the "),
                          createVNode("strong", null, "customer"),
                          createTextVNode(" that consent was authorised by, the "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(", the "),
                          createVNode("code", null, "ProductId"),
                          createTextVNode(", and the TPP’s client identity. The LFI MUST refuse to render unless the customer present at the surface is that same customer, and MUST NOT serve a rate for any account other than the bound "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(". A "),
                          createVNode("code", null, "DisplayUrl"),
                          createTextVNode(" obtained for one customer or one account is useless for another. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Confidentiality comes from cross-origin isolation."),
                          createTextVNode(" Because the LFI content is served from the LFI’s origin, the TPP cannot read the rate out of it, script into it, or capture its content — whatever presentation the agreed CX settles on. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Access comes from the token."),
                          createTextVNode(" A valid "),
                          createVNode("code", null, "DisplayUrl"),
                          createTextVNode(" only ever reaches the legitimate TPP, because obtaining one requires an authenticated, consented call through the API Hub. The LFI validates the token before rendering anything. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Expiry is enforced by the LFI, server-side."),
                          createTextVNode(" After "),
                          createVNode("code", null, "ExpiresAt"),
                          createTextVNode(" the surface stops rendering the rate — it is no longer a TPP obligation to honour a display window. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "The LFI does not check the consent’s permissions on this path."),
                          createTextVNode(" It returns whichever shape it holds for the product — cleartext object or reference — and the API Hub withholds "),
                          createVNode("code", null, "FinanceRates"),
                          createTextVNode(" from the TPP when the consent does not carry "),
                          createVNode("code", null, "ReadProductFinanceRates"),
                          createTextVNode(", exactly as it does for every other permission-gated field. Under the JWE design the LFI MUST make that check itself before minting an OTP, because issuing one has a real cost and is visible to the customer; returning a reference has neither property. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("code", null, "ReadProductFinanceRates"),
                          createTextVNode(" is "),
                          createVNode("strong", null, "unchanged"),
                          createTextVNode(". It still gates whether the rate reaches the TPP at all; if the permission is absent, "),
                          createVNode("code", null, "FinanceRates"),
                          createTextVNode(" does not appear on the "),
                          createVNode("code", null, "Product"),
                          createTextVNode(" record the TPP receives. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "The embedding and presentation profile is a placeholder."),
                      createTextVNode(" This proposal fixes the reference, its bindings, and the isolation property; it does not fix how the surface is launched, sized, dismissed, or returned from, nor the native / webview variant. Those are settled by a proof of concept run with LFIs and TPPs and by the customer experience agreed from it, and documented once agreed. ")
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
                    createVNode("p", { class: "ofp-band__lede" }, " One schema change, a display surface on the LFI side, a repurposed certification the API Hub can enforce, and documentation. The consent, audit, and billing semantics are untouched. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Standards schema"),
                      createVNode("p", null, [
                        createTextVNode(" In the account-information specification, change "),
                        createVNode("code", null, "FinanceRates"),
                        createTextVNode(" to "),
                        createVNode("code", null, "anyOf"),
                        createTextVNode(),
                        createVNode("code", null, "[ AEProductFinanceRates, AERateDisplayRef ]"),
                        createTextVNode(", add the "),
                        createVNode("code", null, "AERateDisplayRef"),
                        createTextVNode(" schema, and "),
                        createVNode("strong", null, [
                          createTextVNode("remove "),
                          createVNode("code", null, "AEJwe")
                        ]),
                        createTextVNode(" from this field. Targets "),
                        createVNode("strong", null, "V2.2"),
                        createTextVNode(". Because no LFI has a live JWE implementation, the removal affects no one and needs no deprecation window. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · LFI display surface"),
                      createVNode("p", null, [
                        createTextVNode(" A protecting LFI stands up (or reuses) a tokenised, customer-facing display surface that validates the request token, confirms the customer present is the one the token is bound to, authenticates them where it chooses to — reusing existing 3DS / challenge infrastructure — renders the rate, and enforces "),
                        createVNode("code", null, "ExpiresAt"),
                        createTextVNode(" server-side. In return it retires the JWE generation, the one-time-code minting and delivery, the OTP-spam rate limits, and the consent-permission lookup this endpoint requires today. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Certification & enforcement"),
                      createVNode("p", null, [
                        createTextVNode(" Rename the optional "),
                        createVNode("em", null, "Access Encrypted Resource Data"),
                        createTextVNode(" certification — a misnomer once there is no encryption — to "),
                        createVNode("strong", null, "Rate Display Embedding"),
                        createTextVNode(", and repurpose it: the TPP demonstrates it can correctly present and operate the LFI display surface and does not attempt to defeat its isolation. The precise conformance criteria follow the agreed CX. The API Hub SHOULD then reject a consent requesting "),
                        createVNode("code", null, "ReadProductFinanceRates"),
                        createTextVNode(" from a TPP that does not hold the certification, using the trust-framework record it already holds — closing today’s enforcement gap. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Documentation"),
                      createVNode("p", null, [
                        createTextVNode(" Rewrite the two "),
                        createVNode("em", null, "Encrypted FinanceRates"),
                        createTextVNode(" guides (TPP and LFI) and the Data Sharing requirements tables around the display surface, update the certification page under its new name, and record the change as an errata. The presentation half of those guides waits on the proof of concept and the agreed CX. No new registration field is introduced. ")
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
                      createTextVNode(" 05 · What this costs to build")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "A different shape of work, not obviously less of it")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" This proposal trades one build for another. It retires the JWE crypto, the one-time-code delivery, the OTP rate limiting, and the consent-permission lookup — genuinely the heaviest parts of today’s LFI work — but in their place a protecting LFI has to expose a "),
                      createVNode("strong", null, "customer-facing display surface"),
                      createTextVNode(" with token validation and, if it wants friction control, a challenge step. For an LFI that already runs 3DS this is largely reuse; for one that does not, it is new front-end responsibility. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The change is "),
                      createVNode("strong", null, "meaningful for TPPs too"),
                      createTextVNode(": they move from forwarding a JWE and decrypting in-browser to presenting and operating a surface the LFI renders. And it is a "),
                      createVNode("strong", null, "breaking schema change"),
                      createTextVNode(" to "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(", taken at V2.2. The one thing that makes it cheap right now is that "),
                      createVNode("strong", null, "no LFI has shipped the JWE path"),
                      createTextVNode(", so nothing has to be migrated — this is close to a clean start rather than a transition. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Both sides should read the front-end estimate as "),
                      createVNode("strong", null, "provisional"),
                      createTextVNode(": the presentation is a placeholder until the proof of concept and the agreed CX land, so the security model is what a vote is being cast on, not a finished integration design. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A vote in favour is a statement that your institution would "),
                      createVNode("em", null, "build to"),
                      createTextVNode(" this — an LFI that it would host the surface, a TPP that it would present it — not merely that it reads as more secure. If the ecosystem would rather keep the encrypted-rate design, or would not use the protected path at all, that is a perfectly good outcome and the work will not be scheduled. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 06 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What the display surface buys")
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
                      createTextVNode(" 07 · Cons")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/proposals/ofp-008.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ofp008 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb468d13"]]);
export {
  ofp008 as default
};
