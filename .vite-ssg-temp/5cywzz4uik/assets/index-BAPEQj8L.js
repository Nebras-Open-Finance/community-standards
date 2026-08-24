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
const OG_TITLE = "OFP-009 · Define validation patterns for the Leads API personal-data fields";
const OG_DESCRIPTION = "Constrain the free-text PII on POST /leads — names, Emirates ID, and address lines — to defined, ISO-grounded patterns, reusing the validation the ecosystem already applies elsewhere, so LFIs receive predictable, well-formed lead data.";
const exampleToday = `# POST /leads · LeadRequest.Data — today
Name:                       # AEUserName (oneOf)
  GivenName:    { type: string, minLength: 1, maxLength: 70 }    # no pattern
  LastName:     { type: string, minLength: 1, maxLength: 70 }    # no pattern
  FullName:     { type: string, minLength: 1, maxLength: 140 }   # no pattern
  BusinessName: { type: string, minLength: 1, maxLength: 140 }   # no pattern
EmiratesId:     { type: string }                                # no validation at all
ResidentialAddress:                                             # AEResidentialAddress
  AddressLine:  [ { type: string, minLength: 1, maxLength: 70 } ] # no pattern`;
const exampleProposed = `# POST /leads · LeadRequest.Data — proposed (patterns added, lengths unchanged)
Name:
  GivenName:    { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  LastName:     { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  FullName:     { maxLength: 140, pattern: "^[A-Za-z '.\\-]+$" }
  BusinessName: { maxLength: 140, pattern: "^[A-Za-z0-9 &'.,\\-()/]+$" }
EmiratesId:
  pattern: "^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$"                 # 784 = ISO 3166-1 numeric (UAE)
ResidentialAddress:
  AddressLine:
    items: { maxLength: 70, pattern: "^[A-Za-z0-9 /?:().,'+\\-]+$" } # OFP-003 "x" set, minus Arabic`;
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
      id: "OFP-009",
      proposedBy: "Nebras",
      author: "Nowaier AlQahtani",
      // Fallbacks shown until the API responds (and during the static build).
      opened: "15 Aug 2026",
      closes: "29 Aug 2026",
      priority: "medium",
      version: "V2.2"
    };
    const pros = [
      "LFIs receive predictable, well-formed lead PII — no guessing what characters or shape a name, Emirates ID, or address line might arrive in.",
      "Reuses a pattern the ecosystem already defines — the Emirates ID pattern from the insurance specs — so validation is consistent, not invented here.",
      "Emirates ID gains real validation where today it has none: a malformed ID is rejected at the API Hub before it ever reaches an LFI.",
      "Grounded in ISO where a standard exists — ISO 3166-1 for the 784 prefix and ISO 20022 PostalAddress27 for address text — matching how PhoneNumber (E.164) and Country (ISO 3166-1) are already validated in this very schema.",
      "A defined boundary rejects a class of junk, encoding, and injection edge cases at the API Hub rather than leaving each LFI core to cope.",
      "Field shapes and length limits are unchanged — this is additive validation only."
    ];
    const cons = [
      "TPPs must sanitise or transliterate customer input — strip disallowed punctuation, transliterate names — before submitting a lead.",
      "The Latin-only baseline rejects Arabic and accented-Latin names outright, so a customer named “José” or “فاطمة” cannot be submitted verbatim until the Arabic question below is settled.",
      "Reintroducing patterns is a validation change every TPP integration must adopt, even though field shapes and lengths do not move.",
      "A regex cannot verify the Emirates ID check digit, so a shape-valid but non-existent ID still passes schema validation."
    ];
    const validRefs = [
      { ref: "Ahmed", note: "GivenName — letters only" },
      { ref: "Al-Maktoum", note: "LastName — hyphen allowed" },
      { ref: "O'Brien", note: "LastName — apostrophe allowed" },
      { ref: "Mohd.", note: "GivenName — trailing period" },
      { ref: "ACME Trading L.L.C.", note: "BusinessName — periods and spaces" },
      { ref: "Gulf & Co (Dubai)", note: "BusinessName — “&” and parentheses" },
      { ref: "Flat 5, Building 12", note: "AddressLine — digits and comma" },
      { ref: "784-1990-1234567-8", note: "EmiratesId — hyphenated 784 form" },
      { ref: "784199012345678", note: "EmiratesId — 15 digits, no hyphens" }
    ];
    const invalidRefs = [
      { ref: "Ahmed 3rd", note: "GivenName — digits are not allowed in person names" },
      { ref: "فاطمة", note: "GivenName — Arabic is excluded from the baseline (see open questions)" },
      { ref: "José", note: "GivenName — accented “é” is outside the Latin set" },
      { ref: "Flat #5", note: "AddressLine — “#” is outside the set" },
      { ref: "123-1990-1234567-8", note: "EmiratesId — must begin with 784" },
      { ref: "784-90-1234567-8", note: "EmiratesId — the year block must be 4 digits" }
    ];
    const asks = [
      {
        n: "Q1",
        text: "Arabic support — should any of these fields accept the Arabic block (U+0600–U+06FF)? OFP-003 rejected Arabic for payment references because they ride SWIFT/UAEFTS, which neither carry nor store it. Lead names and addresses are stored PII, not carried over the rails, so the trade-off genuinely differs. Do we add Arabic here — per field, or not at all?"
      },
      {
        n: "Q2",
        text: "Emirates ID harmonisation — this proposal patterns EmiratesId on POST /leads only. The same field is still an unvalidated string in Account Information, Account Opening, and FX Service Initiation, while the insurance specs already carry the 784 pattern. Should the pattern be applied uniformly wherever EmiratesId appears, in one place?"
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
        title: "Define validation patterns for the Leads API personal-data fields",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-3ea59461><section class="ofp-hero" data-v-3ea59461><div class="ofp-hero__inner" data-v-3ea59461>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-3ea59461${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-3ea59461><span class="ofp__id" data-v-3ea59461>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-3ea59461></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-3ea59461>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-3ea59461>Define validation patterns for the Leads API personal-data fields</h1><p class="ofp__summary" data-v-3ea59461> Constrain the free-text PII on <code data-v-3ea59461>POST /leads</code> — names, Emirates ID, and address lines — to defined, ISO-grounded patterns, reusing the validation the ecosystem already applies elsewhere, so every LFI receives predictable, well-formed lead data. </p><div class="ofp__strip" data-v-3ea59461><div class="ofp__strip-item" data-v-3ea59461><div class="ofp__strip-key" data-v-3ea59461>Proposed by</div><div class="ofp__strip-val" data-v-3ea59461>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-3ea59461><div class="ofp__strip-key" data-v-3ea59461>Author</div><div class="ofp__strip-val" data-v-3ea59461>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-3ea59461><div class="ofp__strip-key" data-v-3ea59461>Target version</div><div class="ofp__strip-val" data-v-3ea59461>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-3ea59461><div class="ofp__strip-key" data-v-3ea59461>Opened</div><div class="ofp__strip-val" data-v-3ea59461>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-3ea59461><div class="ofp__strip-key" data-v-3ea59461>Closes</div><div class="ofp__strip-val" data-v-3ea59461>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-3ea59461${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-3ea59461${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-3ea59461${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-3ea59461${_scopeId}><div class="ofp-vote-cover__card" data-v-3ea59461${_scopeId}><div class="ofp-vote-cover__label" data-v-3ea59461${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-3ea59461${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="${ssrRenderClass([{ "ofp-band--seam": !showTabs.value }, "ofp-band ofp-band--cream"])}" data-v-3ea59461${_scopeId}>`);
            if (!showTabs.value) {
              _push2(`<span class="ofp-seam-label" data-v-3ea59461${_scopeId}>The proposal</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>Lead data arrives unvalidated</h2></div><div class="ofp-prose" data-v-3ea59461${_scopeId}><p data-v-3ea59461${_scopeId}><code data-v-3ea59461${_scopeId}>POST /leads</code> lets a TPP hand an LFI a prospective customer — a name, an Emirates ID, a residential address, and the product categories they are interested in. Unlike a payment, this data is <strong data-v-3ea59461${_scopeId}>written into the LFI</strong>: it is stored, matched against existing records, and used to make contact. What the LFI can do with it depends entirely on it arriving in a shape the LFI can store and reconcile. </p><p data-v-3ea59461${_scopeId}> Today most of those fields carry no validation beyond a length limit. <code data-v-3ea59461${_scopeId}>GivenName</code>, <code data-v-3ea59461${_scopeId}>LastName</code>, <code data-v-3ea59461${_scopeId}>FullName</code>, <code data-v-3ea59461${_scopeId}>BusinessName</code> and each <code data-v-3ea59461${_scopeId}>AddressLine</code> are free-text strings with no pattern. And <code data-v-3ea59461${_scopeId}>EmiratesId</code> — the single most important identifier on the request — is a <strong data-v-3ea59461${_scopeId}>plain string with no pattern and no length at all</strong>: any value is accepted and passed straight through to the LFI. </p><p data-v-3ea59461${_scopeId}> This sits oddly next to the two fields in the <em data-v-3ea59461${_scopeId}>same</em> schema that are already validated to a standard: <code data-v-3ea59461${_scopeId}>PhoneNumber</code> is constrained to E.164 (<code data-v-3ea59461${_scopeId}>^\\+[1-9]\\d{1,14}$</code>) and <code data-v-3ea59461${_scopeId}>Country</code> to the ISO 3166-1 alpha-2 code (<code data-v-3ea59461${_scopeId}>^[A-Z]{2}$</code>). The discipline is already here — it simply has not been extended to the personal-data fields around them. </p><p data-v-3ea59461${_scopeId}> The most important of these has also <strong data-v-3ea59461${_scopeId}>already been solved elsewhere</strong>: the insurance specifications validate an Emirates ID with <code data-v-3ea59461${_scopeId}>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>. Yet the same <code data-v-3ea59461${_scopeId}>EmiratesId</code> is left unchecked in Account Information, Account Opening, FX, and here in Leads. The ask is to close the gap on the Leads fields by <strong data-v-3ea59461${_scopeId}>reusing what the ecosystem has already agreed</strong> where a pattern exists, and defining a purpose-built one where it does not. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>Reuse the patterns we already have, per field</h2></div><div class="ofp-prose" data-v-3ea59461${_scopeId}><p data-v-3ea59461${_scopeId}> Add a <code data-v-3ea59461${_scopeId}>pattern</code> to each Leads personal-data field, purpose-built for what that field actually holds, and — wherever a validation already exists in the ecosystem — <strong data-v-3ea59461${_scopeId}>reuse it verbatim</strong>. Lengths and field shapes do not change. </p><p data-v-3ea59461${_scopeId}><strong data-v-3ea59461${_scopeId}>Emirates ID</strong> — adopt the existing insurance-spec pattern. The leading <code data-v-3ea59461${_scopeId}>784</code> is the <strong data-v-3ea59461${_scopeId}>ISO 3166-1 numeric country code for the UAE</strong>; the final digit is a checksum (which a regex validates in shape but not in value):</p><p class="ofp-regex" data-v-3ea59461${_scopeId}><code data-v-3ea59461${_scopeId}>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code></p><p data-v-3ea59461${_scopeId}><strong data-v-3ea59461${_scopeId}>Names</strong> — a tight, Latin-only character set. Person names (<code data-v-3ea59461${_scopeId}>GivenName</code>, <code data-v-3ea59461${_scopeId}>LastName</code>, <code data-v-3ea59461${_scopeId}>FullName</code>) allow letters, space, apostrophe, period, and hyphen — enough for “Al-Maktoum”, “O’Brien”, “Mohd.” — but no digits. <code data-v-3ea59461${_scopeId}>BusinessName</code> additionally allows digits and business punctuation:</p><p class="ofp-regex" data-v-3ea59461${_scopeId}><code data-v-3ea59461${_scopeId}>person  ^[A-Za-z &#39;.\\-]+$ business ^[A-Za-z0-9 &amp;&#39;.,\\-()/]+$</code></p><p data-v-3ea59461${_scopeId}><strong data-v-3ea59461${_scopeId}>Address lines</strong> — the field already cites ISO 20022 <code data-v-3ea59461${_scopeId}>PostalAddress27</code>. Reuse the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/proposals/ofp-003/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`OFP-003`);
                } else {
                  return [
                    createTextVNode("OFP-003")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` approved “x” set — the ISO 20022 / SWIFT set of Latin letters, digits, space and <code data-v-3ea59461${_scopeId}>/ - ? : ( ) . , &#39; +</code>:</p><p class="ofp-regex" data-v-3ea59461${_scopeId}><code data-v-3ea59461${_scopeId}>^[A-Za-z0-9 /?:().,&#39;+\\-]+$</code></p><p data-v-3ea59461${_scopeId}> The baseline is deliberately <strong data-v-3ea59461${_scopeId}>Latin-only</strong>. OFP-003 originally proposed the Arabic block (<code data-v-3ea59461${_scopeId}>U+0600–U+06FF</code>) and it was <strong data-v-3ea59461${_scopeId}>removed on approval</strong>, because Arabic cannot be carried end-to-end over SWIFT/UAEFTS and is transliterated to Latin before submission. Whether that reasoning should hold for <em data-v-3ea59461${_scopeId}>stored</em> lead PII — names and addresses that never touch the rails — is a genuine question, and is put to the ecosystem below rather than assumed here. As in OFP-003, length is counted in Unicode characters, the API Hub normalises to Unicode NFC before validating, and validation is enforced centrally at the <strong data-v-3ea59461${_scopeId}>API Hub</strong> so a malformed lead is rejected before it reaches the LFI. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-3ea59461${_scopeId}> Additive <code data-v-3ea59461${_scopeId}>pattern</code> constraints on the existing Leads schemas — lengths and shapes unchanged. </p></div><div class="ofp-changes" data-v-3ea59461${_scopeId}><div class="ofp-change" data-v-3ea59461${_scopeId}><div class="ofp-change__label" data-v-3ea59461${_scopeId}>01 · Name schemas</div><p data-v-3ea59461${_scopeId}> Add the person-name pattern to <code data-v-3ea59461${_scopeId}>GivenName</code> / <code data-v-3ea59461${_scopeId}>LastName</code> (<code data-v-3ea59461${_scopeId}>AEPersonalAccountName</code>) and <code data-v-3ea59461${_scopeId}>FullName</code> (<code data-v-3ea59461${_scopeId}>AEPersonalAccountFullName</code>), and the business-name pattern to <code data-v-3ea59461${_scopeId}>BusinessName</code> (<code data-v-3ea59461${_scopeId}>AEBusinessAccountName</code>). </p></div><div class="ofp-change" data-v-3ea59461${_scopeId}><div class="ofp-change__label" data-v-3ea59461${_scopeId}>02 · Emirates ID</div><p data-v-3ea59461${_scopeId}> On <code data-v-3ea59461${_scopeId}>Data.EmiratesId</code>, add the <code data-v-3ea59461${_scopeId}>784</code> pattern. The same change applies to the Lead <em data-v-3ea59461${_scopeId}>response</em> object, which echoes the field. </p></div><div class="ofp-change" data-v-3ea59461${_scopeId}><div class="ofp-change__label" data-v-3ea59461${_scopeId}>03 · Address lines</div><p data-v-3ea59461${_scopeId}> Add the “x”-set pattern to the <code data-v-3ea59461${_scopeId}>AddressLine</code> items in <code data-v-3ea59461${_scopeId}>AEResidentialAddress</code>. <code data-v-3ea59461${_scopeId}>minItems 1</code>, <code data-v-3ea59461${_scopeId}>maxItems 7</code>, and the per-item <code data-v-3ea59461${_scopeId}>maxLength 70</code> are unchanged. </p></div><div class="ofp-change" data-v-3ea59461${_scopeId}><div class="ofp-change__label" data-v-3ea59461${_scopeId}>04 · Applied to Ozone Connect too</div><p data-v-3ea59461${_scopeId}><code data-v-3ea59461${_scopeId}>AEUserName</code> and <code data-v-3ea59461${_scopeId}>AEResidentialAddress</code> are shared by the TPP product specification and the Ozone Connect products-data specification, so the same patterns apply identically to both — a lead that validates at the API Hub will not be rejected downstream. </p></div><div class="ofp-change" data-v-3ea59461${_scopeId}><div class="ofp-change__label" data-v-3ea59461${_scopeId}>05 · Validation &amp; error handling</div><p data-v-3ea59461${_scopeId}> A field that does not match its pattern fails schema validation at the <strong data-v-3ea59461${_scopeId}>API Hub</strong> and is rejected before the request reaches the LFI — returned as a standard request-validation error, not silently sanitised on the TPP’s behalf. </p></div></div><div class="ofp-code" data-v-3ea59461${_scopeId}><div class="ofp-code__label" data-v-3ea59461${_scopeId}>Today — length limits only (Emirates ID unvalidated)</div><pre class="ofp-code__pre" data-v-3ea59461${_scopeId}>${ssrInterpolate(exampleToday)}</pre></div><div class="ofp-code" data-v-3ea59461${_scopeId}><div class="ofp-code__label" data-v-3ea59461${_scopeId}>Proposed — patterns added, lengths unchanged</div><pre class="ofp-code__pre" data-v-3ea59461${_scopeId}>${ssrInterpolate(exampleProposed)}</pre></div><div class="ofp-ex" data-v-3ea59461${_scopeId}><div class="ofp-ex__col ofp-ex__col--ok" data-v-3ea59461${_scopeId}><div class="ofp-ex__head" data-v-3ea59461${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--ok" data-v-3ea59461${_scopeId}>✓</span> Valid </div><ul class="ofp-ex__list" data-v-3ea59461${_scopeId}><!--[-->`);
            ssrRenderList(validRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-3ea59461${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-3ea59461${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-3ea59461${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div><div class="ofp-ex__col ofp-ex__col--no" data-v-3ea59461${_scopeId}><div class="ofp-ex__head" data-v-3ea59461${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--no" data-v-3ea59461${_scopeId}>×</span> Invalid </div><ul class="ofp-ex__list" data-v-3ea59461${_scopeId}><!--[-->`);
            ssrRenderList(invalidRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-3ea59461${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-3ea59461${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-3ea59461${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></div><p class="ofp-ex__foot" data-v-3ea59461${_scopeId}> Length is enforced separately — a value over its <code data-v-3ea59461${_scopeId}>maxLength</code> fails on length, not on the pattern. </p></div></section><section class="ofp-band ofp-band--white" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 04 · Pros</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>What validating the Leads fields buys</h2></div><ul class="ofp-pros" data-v-3ea59461${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-3ea59461${_scopeId}><span class="ofp-pros__glyph" data-v-3ea59461${_scopeId}>✓</span><span data-v-3ea59461${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 05 · Cons</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-3ea59461${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-3ea59461${_scopeId}><span class="ofp-cons__glyph" data-v-3ea59461${_scopeId}>×</span><span data-v-3ea59461${_scopeId}>${ssrInterpolate(c)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-3ea59461${_scopeId}><div class="ofp-band__inner" data-v-3ea59461${_scopeId}><div class="ofp-band__head" data-v-3ea59461${_scopeId}><div class="ofp-band__eyebrow" data-v-3ea59461${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-3ea59461${_scopeId}></span> 06 · Open questions</div><h2 class="ofp-band__title" data-v-3ea59461${_scopeId}>What we’re asking the ecosystem</h2><p class="ofp-band__lede" data-v-3ea59461${_scopeId}> Two points the baseline deliberately leaves open — settle these and they fold into the change. </p></div><ul class="ofp-asks" data-v-3ea59461${_scopeId}><!--[-->`);
            ssrRenderList(asks, (a) => {
              _push2(`<li class="ofp-ask" data-v-3ea59461${_scopeId}><span class="ofp-ask__num" data-v-3ea59461${_scopeId}>${ssrInterpolate(a.n)}</span><div class="ofp-ask__text" data-v-3ea59461${_scopeId}>${ssrInterpolate(a.text)}</div></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "Lead data arrives unvalidated")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("code", null, "POST /leads"),
                      createTextVNode(" lets a TPP hand an LFI a prospective customer — a name, an Emirates ID, a residential address, and the product categories they are interested in. Unlike a payment, this data is "),
                      createVNode("strong", null, "written into the LFI"),
                      createTextVNode(": it is stored, matched against existing records, and used to make contact. What the LFI can do with it depends entirely on it arriving in a shape the LFI can store and reconcile. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Today most of those fields carry no validation beyond a length limit. "),
                      createVNode("code", null, "GivenName"),
                      createTextVNode(", "),
                      createVNode("code", null, "LastName"),
                      createTextVNode(", "),
                      createVNode("code", null, "FullName"),
                      createTextVNode(", "),
                      createVNode("code", null, "BusinessName"),
                      createTextVNode(" and each "),
                      createVNode("code", null, "AddressLine"),
                      createTextVNode(" are free-text strings with no pattern. And "),
                      createVNode("code", null, "EmiratesId"),
                      createTextVNode(" — the single most important identifier on the request — is a "),
                      createVNode("strong", null, "plain string with no pattern and no length at all"),
                      createTextVNode(": any value is accepted and passed straight through to the LFI. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This sits oddly next to the two fields in the "),
                      createVNode("em", null, "same"),
                      createTextVNode(" schema that are already validated to a standard: "),
                      createVNode("code", null, "PhoneNumber"),
                      createTextVNode(" is constrained to E.164 ("),
                      createVNode("code", null, "^\\+[1-9]\\d{1,14}$"),
                      createTextVNode(") and "),
                      createVNode("code", null, "Country"),
                      createTextVNode(" to the ISO 3166-1 alpha-2 code ("),
                      createVNode("code", null, "^[A-Z]{2}$"),
                      createTextVNode("). The discipline is already here — it simply has not been extended to the personal-data fields around them. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The most important of these has also "),
                      createVNode("strong", null, "already been solved elsewhere"),
                      createTextVNode(": the insurance specifications validate an Emirates ID with "),
                      createVNode("code", null, "^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$"),
                      createTextVNode(". Yet the same "),
                      createVNode("code", null, "EmiratesId"),
                      createTextVNode(" is left unchecked in Account Information, Account Opening, FX, and here in Leads. The ask is to close the gap on the Leads fields by "),
                      createVNode("strong", null, "reusing what the ecosystem has already agreed"),
                      createTextVNode(" where a pattern exists, and defining a purpose-built one where it does not. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Reuse the patterns we already have, per field")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Add a "),
                      createVNode("code", null, "pattern"),
                      createTextVNode(" to each Leads personal-data field, purpose-built for what that field actually holds, and — wherever a validation already exists in the ecosystem — "),
                      createVNode("strong", null, "reuse it verbatim"),
                      createTextVNode(". Lengths and field shapes do not change. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Emirates ID"),
                      createTextVNode(" — adopt the existing insurance-spec pattern. The leading "),
                      createVNode("code", null, "784"),
                      createTextVNode(" is the "),
                      createVNode("strong", null, "ISO 3166-1 numeric country code for the UAE"),
                      createTextVNode("; the final digit is a checksum (which a regex validates in shape but not in value):")
                    ]),
                    createVNode("p", { class: "ofp-regex" }, [
                      createVNode("code", null, "^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Names"),
                      createTextVNode(" — a tight, Latin-only character set. Person names ("),
                      createVNode("code", null, "GivenName"),
                      createTextVNode(", "),
                      createVNode("code", null, "LastName"),
                      createTextVNode(", "),
                      createVNode("code", null, "FullName"),
                      createTextVNode(") allow letters, space, apostrophe, period, and hyphen — enough for “Al-Maktoum”, “O’Brien”, “Mohd.” — but no digits. "),
                      createVNode("code", null, "BusinessName"),
                      createTextVNode(" additionally allows digits and business punctuation:")
                    ]),
                    createVNode("p", { class: "ofp-regex" }, [
                      createVNode("code", null, "person  ^[A-Za-z '.\\-]+$ business ^[A-Za-z0-9 &'.,\\-()/]+$")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Address lines"),
                      createTextVNode(" — the field already cites ISO 20022 "),
                      createVNode("code", null, "PostalAddress27"),
                      createTextVNode(". Reuse the "),
                      createVNode(_component_RouterLink, { to: "/proposals/ofp-003/" }, {
                        default: withCtx(() => [
                          createTextVNode("OFP-003")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" approved “x” set — the ISO 20022 / SWIFT set of Latin letters, digits, space and "),
                      createVNode("code", null, "/ - ? : ( ) . , ' +"),
                      createTextVNode(":")
                    ]),
                    createVNode("p", { class: "ofp-regex" }, [
                      createVNode("code", null, "^[A-Za-z0-9 /?:().,'+\\-]+$")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The baseline is deliberately "),
                      createVNode("strong", null, "Latin-only"),
                      createTextVNode(". OFP-003 originally proposed the Arabic block ("),
                      createVNode("code", null, "U+0600–U+06FF"),
                      createTextVNode(") and it was "),
                      createVNode("strong", null, "removed on approval"),
                      createTextVNode(", because Arabic cannot be carried end-to-end over SWIFT/UAEFTS and is transliterated to Latin before submission. Whether that reasoning should hold for "),
                      createVNode("em", null, "stored"),
                      createTextVNode(" lead PII — names and addresses that never touch the rails — is a genuine question, and is put to the ecosystem below rather than assumed here. As in OFP-003, length is counted in Unicode characters, the API Hub normalises to Unicode NFC before validating, and validation is enforced centrally at the "),
                      createVNode("strong", null, "API Hub"),
                      createTextVNode(" so a malformed lead is rejected before it reaches the LFI. ")
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
                      createTextVNode(" Additive "),
                      createVNode("code", null, "pattern"),
                      createTextVNode(" constraints on the existing Leads schemas — lengths and shapes unchanged. ")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Name schemas"),
                      createVNode("p", null, [
                        createTextVNode(" Add the person-name pattern to "),
                        createVNode("code", null, "GivenName"),
                        createTextVNode(" / "),
                        createVNode("code", null, "LastName"),
                        createTextVNode(" ("),
                        createVNode("code", null, "AEPersonalAccountName"),
                        createTextVNode(") and "),
                        createVNode("code", null, "FullName"),
                        createTextVNode(" ("),
                        createVNode("code", null, "AEPersonalAccountFullName"),
                        createTextVNode("), and the business-name pattern to "),
                        createVNode("code", null, "BusinessName"),
                        createTextVNode(" ("),
                        createVNode("code", null, "AEBusinessAccountName"),
                        createTextVNode("). ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Emirates ID"),
                      createVNode("p", null, [
                        createTextVNode(" On "),
                        createVNode("code", null, "Data.EmiratesId"),
                        createTextVNode(", add the "),
                        createVNode("code", null, "784"),
                        createTextVNode(" pattern. The same change applies to the Lead "),
                        createVNode("em", null, "response"),
                        createTextVNode(" object, which echoes the field. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Address lines"),
                      createVNode("p", null, [
                        createTextVNode(" Add the “x”-set pattern to the "),
                        createVNode("code", null, "AddressLine"),
                        createTextVNode(" items in "),
                        createVNode("code", null, "AEResidentialAddress"),
                        createTextVNode(". "),
                        createVNode("code", null, "minItems 1"),
                        createTextVNode(", "),
                        createVNode("code", null, "maxItems 7"),
                        createTextVNode(", and the per-item "),
                        createVNode("code", null, "maxLength 70"),
                        createTextVNode(" are unchanged. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "04 · Applied to Ozone Connect too"),
                      createVNode("p", null, [
                        createVNode("code", null, "AEUserName"),
                        createTextVNode(" and "),
                        createVNode("code", null, "AEResidentialAddress"),
                        createTextVNode(" are shared by the TPP product specification and the Ozone Connect products-data specification, so the same patterns apply identically to both — a lead that validates at the API Hub will not be rejected downstream. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "05 · Validation & error handling"),
                      createVNode("p", null, [
                        createTextVNode(" A field that does not match its pattern fails schema validation at the "),
                        createVNode("strong", null, "API Hub"),
                        createTextVNode(" and is rejected before the request reaches the LFI — returned as a standard request-validation error, not silently sanitised on the TPP’s behalf. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — length limits only (Emirates ID unvalidated)"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleToday))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — patterns added, lengths unchanged"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleProposed))
                  ]),
                  createVNode("div", { class: "ofp-ex" }, [
                    createVNode("div", { class: "ofp-ex__col ofp-ex__col--ok" }, [
                      createVNode("div", { class: "ofp-ex__head" }, [
                        createVNode("span", { class: "ofp-ex__glyph ofp-ex__glyph--ok" }, "✓"),
                        createTextVNode(" Valid ")
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
                        createTextVNode(" Invalid ")
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
                  createVNode("p", { class: "ofp-ex__foot" }, [
                    createTextVNode(" Length is enforced separately — a value over its "),
                    createVNode("code", null, "maxLength"),
                    createTextVNode(" fails on length, not on the pattern. ")
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What validating the Leads fields buys")
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
                    createVNode("p", { class: "ofp-band__lede" }, " Two points the baseline deliberately leaves open — settle these and they fold into the change. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-009/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ea59461"]]);
export {
  index as default
};
