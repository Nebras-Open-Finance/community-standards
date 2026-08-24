import { defineComponent, computed, ref, watch, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, unref, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { P as PRIORITY, u as useProposals, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./PvVoteBar-BySHaSon.js";
import "vite-ssg";
import "axios";
import "vue-router";
const exampleToday = `# ONE shared schema for domestic AND international.
# Which one it is gets signalled only IMPLICITLY:
POST /payments
{
  "Data": {
    "ConsentId": "pcon_8821",
    "Instruction": { "Amount": { "Amount": "5000.00", "Currency": "AED" } },
    "CurrencyRequest": {                # optional — its PRESENCE means "international"
      "ExtendedPurpose": "Family support",
      "CurrencyOfTransfer": "GBP",
      "DestinationCountryCode": "GB"
    },
    "PersonalIdentifiableInformation": "<JWE>",   # anyOf[ Domestic | International ]
    "PaymentPurposeCode": "GDDS",
    "OpenFinanceBilling": { ... }
  }
}
# Domestic vs international is decided by (a) whether CurrencyRequest is present and
# (b) which PII shape happens to sit inside the encrypted blob — never stated outright.`;
const exampleProposed = `# TWO definitions, chosen at the TOP of the request.

# == DOMESTIC == today's shape, CurrencyRequest removed
POST /payments                         # Domestic
{
  "Data": {
    "ConsentId": "pcon_8821",
    "Instruction": { "Amount": { "Amount": "5000.00", "Currency": "AED" } },
    "PersonalIdentifiableInformation": "<JWE: domestic creditor (IBAN) + CoP>",
    "PaymentPurposeCode": "GDDS",
    "OpenFinanceBilling": { ... }
  }
}

# == INTERNATIONAL == banking cross-border (FX quoting is a separate spec)
POST /payments                         # International
{
  "Data": {
    "ConsentId": "pcon_9034",
    "Instruction": {                   # external (instructed) XOR internal (equivalent)
      "EquivalentAmount": {            # debtor pays 5,000 AED, converted to GBP
        "Amount": { "Amount": "5000.00", "Currency": "AED" },
        "CurrencyOfTransfer": "GBP"
      }
    },
    "ExchangeRateInformation": { "UnitCurrency": "AED", "RateType": "Indicative" },
    "ChargeBearer": "Shared",
    "DestinationCountryCode": "GB",
    "PaymentPurposeCode": "GDDS",      # external — ISO ExternalPurpose1Code, not Aani
    "ProprietaryPurposeCode": "FAMILY-SUPPORT",   # internal — bank/corridor code
    "ExtendedPurpose": "Family support",
    "EndToEndIdentification": "e2e-9034-jun26",
    "PersonalIdentifiableInformation": "<JWE: international creditor + agent — unchanged>",
    "OpenFinanceBilling": { ... }
  }
}
# International payment types: SingleInstantPayment and FixedPeriodicSchedule only.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    useHead({ title: "OFP-002 · Split the payment schema into Domestic and International definitions" });
    const meta = {
      id: "OFP-002",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "17 Jun 2026",
      closes: "28 Jul 2026",
      priority: "high",
      version: "V2.2"
    };
    const pros = [
      "Domestic vs international is read from the top of the request — not inferred from whether an optional object is present or from which shape happens to be inside the encrypted PII blob.",
      "The common case gets simpler: domestic no longer carries the international-only CurrencyRequest (FX) object at all.",
      "International gets its own schema that can be modelled to cross-border reality, so the fields LFIs need live in the standard instead of in bespoke per-LFI consent and authorization journeys.",
      "One standard international schema means one consistent customer experience across the ecosystem, rather than each LFI diverging.",
      "Validation becomes context-specific: the API Hub can require FX / currency-of-transfer only for international, and Confirmation of Payee only for domestic.",
      "Restricting international to Single Instant Payment and Fixed Periodic Schedule matches what is realistically supported cross-border and shrinks what each LFI must build."
    ];
    const cons = [
      "It is a breaking change to the consent (PAR) and payment-creation request that every implementer must adopt.",
      "The detailed international field set still has to be designed — this proposal makes the split and moves CurrencyRequest across; the field-by-field cross-border modelling is a follow-up worked through with LFIs."
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
      return ((_a2 = PRIORITY[priority.value]) == null ? void 0 : _a2.label) ?? PRIORITY.high.label;
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
        title: "Split the payment schema into Domestic and International definitions",
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
      status.value = deriveStatus(openedISO, closesISO, void 0, (m == null ? void 0 : m.internal) ?? false);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-53b15b50><section class="ofp-hero" data-v-53b15b50><div class="ofp-hero__inner" data-v-53b15b50>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/internal/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-53b15b50${_scopeId}>←</span> Internal proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" Internal proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-53b15b50><span class="ofp__id" data-v-53b15b50>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-53b15b50></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-53b15b50>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-53b15b50>Split the payment schema into Domestic and International definitions</h1><p class="ofp__summary" data-v-53b15b50> PAR and <code data-v-53b15b50>POST /payments</code> carry both domestic and international payments through one shared schema, where international is only signalled implicitly. Split them at the top into a Domestic definition (today’s shape, minus the FX object) and an International definition that can be modelled to cross-border reality. </p><div class="ofp__strip" data-v-53b15b50><div class="ofp__strip-item" data-v-53b15b50><div class="ofp__strip-key" data-v-53b15b50>Proposed by</div><div class="ofp__strip-val" data-v-53b15b50>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-53b15b50><div class="ofp__strip-key" data-v-53b15b50>Author</div><div class="ofp__strip-val" data-v-53b15b50>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-53b15b50><div class="ofp__strip-key" data-v-53b15b50>Target version</div><div class="ofp__strip-val" data-v-53b15b50>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-53b15b50><div class="ofp__strip-key" data-v-53b15b50>Opened</div><div class="ofp__strip-val" data-v-53b15b50>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-53b15b50><div class="ofp__strip-key" data-v-53b15b50>Closes</div><div class="ofp__strip-val" data-v-53b15b50>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-53b15b50${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-53b15b50${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-53b15b50${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft" || status.value === "internal") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-53b15b50${_scopeId}><div class="ofp-vote-cover__card" data-v-53b15b50${_scopeId}><div class="ofp-vote-cover__label" data-v-53b15b50${_scopeId}>${ssrInterpolate(status.value === "internal" ? "Internal proposal" : "Voting not yet open")}</div><div class="ofp-vote-cover__msg" data-v-53b15b50${_scopeId}>${ssrInterpolate(status.value === "internal" ? "This proposal is under internal review." : `Voting opens ${openedDisplay.value}`)}</div></div></div>`);
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
                status.value === "draft" || status.value === "internal" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ofp-vote-cover",
                  "aria-hidden": "false"
                }, [
                  createVNode("div", { class: "ofp-vote-cover__card" }, [
                    createVNode("div", { class: "ofp-vote-cover__label" }, toDisplayString(status.value === "internal" ? "Internal proposal" : "Voting not yet open"), 1),
                    createVNode("div", { class: "ofp-vote-cover__msg" }, toDisplayString(status.value === "internal" ? "This proposal is under internal review." : `Voting opens ${openedDisplay.value}`), 1)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              unref(FeedbackPartial) && isClosed.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(FeedbackPartial)), { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        proposal: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-53b15b50${_scopeId}><span class="ofp-seam-label" data-v-53b15b50${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>One schema asked to be two</h2></div><div class="ofp-prose" data-v-53b15b50${_scopeId}><p data-v-53b15b50${_scopeId}> PAR (<code data-v-53b15b50${_scopeId}>POST /par</code>) and <code data-v-53b15b50${_scopeId}>POST /payments</code> were designed to carry <strong data-v-53b15b50${_scopeId}>both</strong> domestic and international payments through a single payment schema. Nothing at the top of the request says which one is being made. The distinction is signalled only indirectly: by whether the optional <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> (FX) object is present, and by which shape — domestic or international — happens to sit inside the encrypted <code data-v-53b15b50${_scopeId}>PersonalIdentifiableInformation</code> blob, expressed as an <code data-v-53b15b50${_scopeId}>anyOf</code> rather than an explicit choice. </p><p data-v-53b15b50${_scopeId}> In practice the two have diverged sharply. <strong data-v-53b15b50${_scopeId}>Domestic payments have made real headway; international payments have not been delivered.</strong> Multiple LFIs have raised issues and asked for clarifications because the international fields have not mapped naturally to how a cross-border payment actually works — the international creditor shape is thin (a creditor account plus a single creditor agent), with none of the structure a SWIFT / ISO 20022 payment needs. </p><p data-v-53b15b50${_scopeId}> Because the international schema was not what it needed to be, <strong data-v-53b15b50${_scopeId}>LFIs have moved the fields they actually require out of the standard and into their own Open Finance international consent and authorization journeys.</strong> If the API is adopted as it stands, that leads to a <strong data-v-53b15b50${_scopeId}>varying customer experience across the ecosystem</strong> — the opposite of what a shared standard is meant to deliver. </p><p data-v-53b15b50${_scopeId}> The split is cheap to make now and expensive to defer. With little to no live international integration to migrate, separating the two definitions keeps the domestic schema free of international-only complexity and gives international its own home to be modelled properly. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>Make the split explicit at the top</h2></div><div class="ofp-prose" data-v-53b15b50${_scopeId}><p data-v-53b15b50${_scopeId}><strong data-v-53b15b50${_scopeId}>Replace the single shared payment schema with an explicit choice between a Domestic definition and an International definition</strong>, made at the top of both the PAR consent and <code data-v-53b15b50${_scopeId}>POST /payments</code> — in place of today’s implicit signalling through an <code data-v-53b15b50${_scopeId}>anyOf</code> PII and an optional <code data-v-53b15b50${_scopeId}>CurrencyRequest</code>. </p><p data-v-53b15b50${_scopeId}> The <strong data-v-53b15b50${_scopeId}>Domestic definition is today’s schema, unchanged, with one removal</strong>: the <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> object goes. A domestic payment is always a same-currency (AED → AED) transfer, so FX never applies; the domestic creditor (IBAN-only, with Confirmation of Payee) stays exactly as it is. </p><p data-v-53b15b50${_scopeId}> The <strong data-v-53b15b50${_scopeId}>International definition gets its own schema</strong>. As a first step it carries today’s international PII plus the <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> object — moved across and made a <strong data-v-53b15b50${_scopeId}>required, first-class part</strong> of the definition rather than an optional add-on. From there we realign its fields, field by field and with the LFIs, to cross-border SWIFT / ISO 20022 (pacs.008) practice. International is limited to <strong data-v-53b15b50${_scopeId}>two payment types</strong>: Single Instant Payment and Fixed Periodic Schedule. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-53b15b50${_scopeId}> One structural change — an explicit top-level split — and what each definition then looks like. </p></div><div class="ofp-changes" data-v-53b15b50${_scopeId}><div class="ofp-change" data-v-53b15b50${_scopeId}><div class="ofp-change__label" data-v-53b15b50${_scopeId}>01 · Top-level split (PAR + <code data-v-53b15b50${_scopeId}>POST /payments</code>)</div><p data-v-53b15b50${_scopeId}> Introduce an explicit Domestic / International choice at the top of the consent and the payment-creation request, replacing the <code data-v-53b15b50${_scopeId}>anyOf</code> over the two <code data-v-53b15b50${_scopeId}>PersonalIdentifiableInformation</code> shapes and the “is <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> present?” heuristic. The payment context is stated, not inferred. </p></div><div class="ofp-change" data-v-53b15b50${_scopeId}><div class="ofp-change__label" data-v-53b15b50${_scopeId}>02 · Domestic definition</div><p data-v-53b15b50${_scopeId}> Remove the <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> object — FX never applies to a same-currency domestic transfer. Everything else (the IBAN-only domestic creditor, Confirmation of Payee, the full payment-type taxonomy, references, billing) is unchanged. </p></div><div class="ofp-change" data-v-53b15b50${_scopeId}><div class="ofp-change__label" data-v-53b15b50${_scopeId}>03 · International definition — request body</div><p data-v-53b15b50${_scopeId}> The old <code data-v-53b15b50${_scopeId}>CurrencyRequest</code> object is unpacked onto the request. <strong data-v-53b15b50${_scopeId}>Amount becomes an explicit choice</strong>: <code data-v-53b15b50${_scopeId}>InstructedAmount</code> (the external / target amount the creditor receives, in the currency of transfer) or <code data-v-53b15b50${_scopeId}>EquivalentAmount</code> (the internal / source amount debited in the debtor’s currency, plus the currency it converts into) — both reusing the domestic <code data-v-53b15b50${_scopeId}>{ Amount, Currency }</code> shape. <strong data-v-53b15b50${_scopeId}>Purpose splits</strong> into an external <code data-v-53b15b50${_scopeId}>PaymentPurposeCode</code> (ISO 20022 <code data-v-53b15b50${_scopeId}>ExternalPurpose1Code</code>; the domestic Aani 3-letter list no longer applies) and a simple internal <code data-v-53b15b50${_scopeId}>ProprietaryPurposeCode</code>, alongside the free-text <code data-v-53b15b50${_scopeId}>ExtendedPurpose</code>. <code data-v-53b15b50${_scopeId}>ExchangeRateInformation</code>, <code data-v-53b15b50${_scopeId}>ChargeBearer</code>, <code data-v-53b15b50${_scopeId}>InstructionPriority</code> and <code data-v-53b15b50${_scopeId}>DestinationCountryCode</code> stay; <code data-v-53b15b50${_scopeId}>EndToEndIdentification</code> is added; and the exchange-house <code data-v-53b15b50${_scopeId}>FxQuoteId</code> is removed (FX quoting is the separate FX Service Initiation spec). Payment types are restricted to <code data-v-53b15b50${_scopeId}>SingleInstantPayment</code> and <code data-v-53b15b50${_scopeId}>FixedPeriodicSchedule</code>. </p></div><div class="ofp-change" data-v-53b15b50${_scopeId}><div class="ofp-change__label" data-v-53b15b50${_scopeId}>04 · International definition — creditor (next step)</div><p data-v-53b15b50${_scopeId}> The encrypted creditor block is <strong data-v-53b15b50${_scopeId}>unchanged in this draft</strong>. The cross-border additions LFIs need — intermediary agents, ultimate creditor / debtor, regulatory reporting, and structured remittance information, on top of the structured creditor address the schema already carries — are <strong data-v-53b15b50${_scopeId}>recommended as the next step</strong> and called out in the asks below, rather than modelled here yet. </p></div></div><div class="ofp-code" data-v-53b15b50${_scopeId}><div class="ofp-code__label" data-v-53b15b50${_scopeId}>Today — one shared schema, international signalled implicitly</div><pre class="ofp-code__pre" data-v-53b15b50${_scopeId}>${ssrInterpolate(exampleToday)}</pre></div><div class="ofp-code" data-v-53b15b50${_scopeId}><div class="ofp-code__label" data-v-53b15b50${_scopeId}>Proposed — Domestic and International, chosen at the top</div><pre class="ofp-code__pre" data-v-53b15b50${_scopeId}>${ssrInterpolate(exampleProposed)}</pre></div></div></section><section class="ofp-band ofp-band--white" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 04 · Draft schemas</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>The split, written out</h2><p class="ofp-band__lede" data-v-53b15b50${_scopeId}> Working drafts attached to this proposal — open each to read it in the same rendered view as the published API specs. Schemas the proposal changes are defined in full; schemas unchanged from the published spec are shown as stubs marked “unchanged”. The International draft restructures the cleartext request body (the instructed / equivalent amount choice, split purpose codes, <code data-v-53b15b50${_scopeId}>EndToEndIdentification</code>) while leaving today’s encrypted creditor block unchanged — the cross-border creditor fields are the next step. </p></div><div class="ofp-cards" data-v-53b15b50${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/internal/proposals/ofp-002/domestic-schema",
              class: "ofp-card",
              style: { "--card-color": "#008B78" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ofp-card__top" style="${ssrRenderStyle({ background: "#008B78" })}" data-v-53b15b50${_scopeId2}></span><div class="ofp-card__meta" data-v-53b15b50${_scopeId2}><span class="ofp-card__cat" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-53b15b50${_scopeId2}>Domestic</span></div><h3 class="ofp-card__title" data-v-53b15b50${_scopeId2}>domestic-payment-schema.yaml</h3><p class="ofp-card__desc" data-v-53b15b50${_scopeId2}>Today’s shape, with the CurrencyRequest object removed.</p><div class="ofp-card__foot" data-v-53b15b50${_scopeId2}><span class="ofp-card__cta" data-v-53b15b50${_scopeId2}>Open rendered schema</span><span class="ofp-card__arrow" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-53b15b50${_scopeId2}>→</span></div>`);
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
                      }, "Domestic")
                    ]),
                    createVNode("h3", { class: "ofp-card__title" }, "domestic-payment-schema.yaml"),
                    createVNode("p", { class: "ofp-card__desc" }, "Today’s shape, with the CurrencyRequest object removed."),
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
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/internal/proposals/ofp-002/international-schema",
              class: "ofp-card",
              style: { "--card-color": "#0043A6" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ofp-card__top" style="${ssrRenderStyle({ background: "#0043A6" })}" data-v-53b15b50${_scopeId2}></span><div class="ofp-card__meta" data-v-53b15b50${_scopeId2}><span class="ofp-card__cat" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-53b15b50${_scopeId2}>International</span></div><h3 class="ofp-card__title" data-v-53b15b50${_scopeId2}>international-payment-schema.yaml</h3><p class="ofp-card__desc" data-v-53b15b50${_scopeId2}>Banking cross-border request body, two payment types.</p><div class="ofp-card__foot" data-v-53b15b50${_scopeId2}><span class="ofp-card__cta" data-v-53b15b50${_scopeId2}>Open rendered schema</span><span class="ofp-card__arrow" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-53b15b50${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "ofp-card__top",
                      style: { background: "#0043A6" }
                    }),
                    createVNode("div", { class: "ofp-card__meta" }, [
                      createVNode("span", {
                        class: "ofp-card__cat",
                        style: { color: "#0043A6" }
                      }, "International")
                    ]),
                    createVNode("h3", { class: "ofp-card__title" }, "international-payment-schema.yaml"),
                    createVNode("p", { class: "ofp-card__desc" }, "Banking cross-border request body, two payment types."),
                    createVNode("div", { class: "ofp-card__foot" }, [
                      createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                      createVNode("span", {
                        class: "ofp-card__arrow",
                        style: { color: "#0043A6" }
                      }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section class="ofp-band ofp-band--cream" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 05 · Pros</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>What the split buys</h2></div><ul class="ofp-pros" data-v-53b15b50${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-53b15b50${_scopeId}><span class="ofp-pros__glyph" data-v-53b15b50${_scopeId}>✓</span><span data-v-53b15b50${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-53b15b50${_scopeId}><div class="ofp-band__inner" data-v-53b15b50${_scopeId}><div class="ofp-band__head" data-v-53b15b50${_scopeId}><div class="ofp-band__eyebrow" data-v-53b15b50${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-53b15b50${_scopeId}></span> 06 · Cons</div><h2 class="ofp-band__title" data-v-53b15b50${_scopeId}>What the split costs</h2></div><ul class="ofp-cons" data-v-53b15b50${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-53b15b50${_scopeId}><span class="ofp-cons__glyph" data-v-53b15b50${_scopeId}>×</span><span data-v-53b15b50${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "One schema asked to be two")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" PAR ("),
                      createVNode("code", null, "POST /par"),
                      createTextVNode(") and "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" were designed to carry "),
                      createVNode("strong", null, "both"),
                      createTextVNode(" domestic and international payments through a single payment schema. Nothing at the top of the request says which one is being made. The distinction is signalled only indirectly: by whether the optional "),
                      createVNode("code", null, "CurrencyRequest"),
                      createTextVNode(" (FX) object is present, and by which shape — domestic or international — happens to sit inside the encrypted "),
                      createVNode("code", null, "PersonalIdentifiableInformation"),
                      createTextVNode(" blob, expressed as an "),
                      createVNode("code", null, "anyOf"),
                      createTextVNode(" rather than an explicit choice. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" In practice the two have diverged sharply. "),
                      createVNode("strong", null, "Domestic payments have made real headway; international payments have not been delivered."),
                      createTextVNode(" Multiple LFIs have raised issues and asked for clarifications because the international fields have not mapped naturally to how a cross-border payment actually works — the international creditor shape is thin (a creditor account plus a single creditor agent), with none of the structure a SWIFT / ISO 20022 payment needs. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Because the international schema was not what it needed to be, "),
                      createVNode("strong", null, "LFIs have moved the fields they actually require out of the standard and into their own Open Finance international consent and authorization journeys."),
                      createTextVNode(" If the API is adopted as it stands, that leads to a "),
                      createVNode("strong", null, "varying customer experience across the ecosystem"),
                      createTextVNode(" — the opposite of what a shared standard is meant to deliver. ")
                    ]),
                    createVNode("p", null, " The split is cheap to make now and expensive to defer. With little to no live international integration to migrate, separating the two definitions keeps the domestic schema free of international-only complexity and gives international its own home to be modelled properly. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Make the split explicit at the top")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Replace the single shared payment schema with an explicit choice between a Domestic definition and an International definition"),
                      createTextVNode(", made at the top of both the PAR consent and "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" — in place of today’s implicit signalling through an "),
                      createVNode("code", null, "anyOf"),
                      createTextVNode(" PII and an optional "),
                      createVNode("code", null, "CurrencyRequest"),
                      createTextVNode(". ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("strong", null, "Domestic definition is today’s schema, unchanged, with one removal"),
                      createTextVNode(": the "),
                      createVNode("code", null, "CurrencyRequest"),
                      createTextVNode(" object goes. A domestic payment is always a same-currency (AED → AED) transfer, so FX never applies; the domestic creditor (IBAN-only, with Confirmation of Payee) stays exactly as it is. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("strong", null, "International definition gets its own schema"),
                      createTextVNode(". As a first step it carries today’s international PII plus the "),
                      createVNode("code", null, "CurrencyRequest"),
                      createTextVNode(" object — moved across and made a "),
                      createVNode("strong", null, "required, first-class part"),
                      createTextVNode(" of the definition rather than an optional add-on. From there we realign its fields, field by field and with the LFIs, to cross-border SWIFT / ISO 20022 (pacs.008) practice. International is limited to "),
                      createVNode("strong", null, "two payment types"),
                      createTextVNode(": Single Instant Payment and Fixed Periodic Schedule. ")
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
                    createVNode("p", { class: "ofp-band__lede" }, " One structural change — an explicit top-level split — and what each definition then looks like. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, [
                        createTextVNode("01 · Top-level split (PAR + "),
                        createVNode("code", null, "POST /payments"),
                        createTextVNode(")")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" Introduce an explicit Domestic / International choice at the top of the consent and the payment-creation request, replacing the "),
                        createVNode("code", null, "anyOf"),
                        createTextVNode(" over the two "),
                        createVNode("code", null, "PersonalIdentifiableInformation"),
                        createTextVNode(" shapes and the “is "),
                        createVNode("code", null, "CurrencyRequest"),
                        createTextVNode(" present?” heuristic. The payment context is stated, not inferred. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Domestic definition"),
                      createVNode("p", null, [
                        createTextVNode(" Remove the "),
                        createVNode("code", null, "CurrencyRequest"),
                        createTextVNode(" object — FX never applies to a same-currency domestic transfer. Everything else (the IBAN-only domestic creditor, Confirmation of Payee, the full payment-type taxonomy, references, billing) is unchanged. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · International definition — request body"),
                      createVNode("p", null, [
                        createTextVNode(" The old "),
                        createVNode("code", null, "CurrencyRequest"),
                        createTextVNode(" object is unpacked onto the request. "),
                        createVNode("strong", null, "Amount becomes an explicit choice"),
                        createTextVNode(": "),
                        createVNode("code", null, "InstructedAmount"),
                        createTextVNode(" (the external / target amount the creditor receives, in the currency of transfer) or "),
                        createVNode("code", null, "EquivalentAmount"),
                        createTextVNode(" (the internal / source amount debited in the debtor’s currency, plus the currency it converts into) — both reusing the domestic "),
                        createVNode("code", null, "{ Amount, Currency }"),
                        createTextVNode(" shape. "),
                        createVNode("strong", null, "Purpose splits"),
                        createTextVNode(" into an external "),
                        createVNode("code", null, "PaymentPurposeCode"),
                        createTextVNode(" (ISO 20022 "),
                        createVNode("code", null, "ExternalPurpose1Code"),
                        createTextVNode("; the domestic Aani 3-letter list no longer applies) and a simple internal "),
                        createVNode("code", null, "ProprietaryPurposeCode"),
                        createTextVNode(", alongside the free-text "),
                        createVNode("code", null, "ExtendedPurpose"),
                        createTextVNode(". "),
                        createVNode("code", null, "ExchangeRateInformation"),
                        createTextVNode(", "),
                        createVNode("code", null, "ChargeBearer"),
                        createTextVNode(", "),
                        createVNode("code", null, "InstructionPriority"),
                        createTextVNode(" and "),
                        createVNode("code", null, "DestinationCountryCode"),
                        createTextVNode(" stay; "),
                        createVNode("code", null, "EndToEndIdentification"),
                        createTextVNode(" is added; and the exchange-house "),
                        createVNode("code", null, "FxQuoteId"),
                        createTextVNode(" is removed (FX quoting is the separate FX Service Initiation spec). Payment types are restricted to "),
                        createVNode("code", null, "SingleInstantPayment"),
                        createTextVNode(" and "),
                        createVNode("code", null, "FixedPeriodicSchedule"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · International definition — creditor (next step)"),
                      createVNode("p", null, [
                        createTextVNode(" The encrypted creditor block is "),
                        createVNode("strong", null, "unchanged in this draft"),
                        createTextVNode(". The cross-border additions LFIs need — intermediary agents, ultimate creditor / debtor, regulatory reporting, and structured remittance information, on top of the structured creditor address the schema already carries — are "),
                        createVNode("strong", null, "recommended as the next step"),
                        createTextVNode(" and called out in the asks below, rather than modelled here yet. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — one shared schema, international signalled implicitly"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleToday))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — Domestic and International, chosen at the top"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleProposed))
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Draft schemas")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "The split, written out"),
                    createVNode("p", { class: "ofp-band__lede" }, [
                      createTextVNode(" Working drafts attached to this proposal — open each to read it in the same rendered view as the published API specs. Schemas the proposal changes are defined in full; schemas unchanged from the published spec are shown as stubs marked “unchanged”. The International draft restructures the cleartext request body (the instructed / equivalent amount choice, split purpose codes, "),
                      createVNode("code", null, "EndToEndIdentification"),
                      createTextVNode(") while leaving today’s encrypted creditor block unchanged — the cross-border creditor fields are the next step. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-cards" }, [
                    createVNode(_component_RouterLink, {
                      to: "/internal/proposals/ofp-002/domestic-schema",
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
                          }, "Domestic")
                        ]),
                        createVNode("h3", { class: "ofp-card__title" }, "domestic-payment-schema.yaml"),
                        createVNode("p", { class: "ofp-card__desc" }, "Today’s shape, with the CurrencyRequest object removed."),
                        createVNode("div", { class: "ofp-card__foot" }, [
                          createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                          createVNode("span", {
                            class: "ofp-card__arrow",
                            style: { color: "#008B78" }
                          }, "→")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_RouterLink, {
                      to: "/internal/proposals/ofp-002/international-schema",
                      class: "ofp-card",
                      style: { "--card-color": "#0043A6" }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "ofp-card__top",
                          style: { background: "#0043A6" }
                        }),
                        createVNode("div", { class: "ofp-card__meta" }, [
                          createVNode("span", {
                            class: "ofp-card__cat",
                            style: { color: "#0043A6" }
                          }, "International")
                        ]),
                        createVNode("h3", { class: "ofp-card__title" }, "international-payment-schema.yaml"),
                        createVNode("p", { class: "ofp-card__desc" }, "Banking cross-border request body, two payment types."),
                        createVNode("div", { class: "ofp-card__foot" }, [
                          createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                          createVNode("span", {
                            class: "ofp-card__arrow",
                            style: { color: "#0043A6" }
                          }, "→")
                        ])
                      ]),
                      _: 1
                    })
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the split buys")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the split costs")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/proposals/ofp-002/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53b15b50"]]);
export {
  index as default
};
