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
const exampleToday = `# 1 - Upload the payment file: any format the LFI happens to accept
POST /payment-consents/{ConsentId}/file
Content-Type: */*               # CSV, ISO 20022 XML, fixed-width...

# 2 - Reference the file by hash on the consent instruction
"Instruction": {
  "FileType": "UK.OBIE.pain.001.001.08",
  "FileHash": "OErCwePj...",     # base64 SHA-256 of the bytes above
  "FileReference": "payroll-2026-06",
  "NumberOfTransactions": 250,
  "ControlSum": "125000.00"
}`;
const exampleProposed = `POST /file-payments
Content-Type: application/jwt          # signed JWS, exactly like POST /payments

{
  "Data": {
    "ConsentId": "pcon_8821",
    "PaymentPurposeCode": "SALA",
    "OpenFinanceBilling": { ... },      # unchanged from POST /payments
    "Instructions": [
      {
        "Amount": { "Amount": "1000.00", "Currency": "AED" },
        "PersonalIdentifiableInformation": "eyJhbGciOiJSU0Et...",   # JWE: creditor account + PII
        "DebtorReference": "payroll-jun26",
        "CreditorReference": "emp-001"
      },
      {
        "Amount": { "Amount": "750.00", "Currency": "AED" },
        "PersonalIdentifiableInformation": "eyJhbGciOiJSU0Et...",
        "DebtorReference": "payroll-jun26",
        "CreditorReference": "emp-002"
      }
    ]
  }
}
# API Hub validates the array against the consent:
#   Instructions.length  ==  NumberOfTransactions
#   sum(Amount)          ==  ControlSum`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    useHead({ title: "OFP-001 · Replace file-based Bulk/Batch Payments with a JSON array" });
    const meta = {
      id: "OFP-001",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "12 Jun 2026",
      closes: "24 Jul 2026",
      priority: "high",
      version: "V2.2"
    };
    const pros = [
      "No CSV parsing, character-encoding, or line-ending handling.",
      "No partial or corrupted uploads — and no single malformed record that fails an entire file.",
      "No malware scanning of uploaded bytes.",
      "No additional encryption layer to protect the PII held at rest in a file.",
      'No "wrong file format" error class to specify, return, and handle.',
      "No ecosystem-wide negotiation of which file formats each LFI accepts.",
      "The API Hub can validate the array’s count and total against NumberOfTransactions and ControlSum centrally — each LFI no longer has to build that check itself.",
      "Reuses the established single-payment shape — nothing new for implementers to learn.",
      "Adjacent areas (error-code mapping, the risk block) change incrementally, not structurally."
    ];
    const cons = [
      "Existing back-office files (ISO 20022 pain.001, CSV) the file model accepted as-is must now be mapped to JSON at the TPP boundary.",
      "A file upload can stream; a single JSON request is held in memory and bounded by request-size limits."
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
        title: "Replace file-based Bulk/Batch Payments with a JSON array",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-247eb1de><section class="ofp-hero" data-v-247eb1de><div class="ofp-hero__inner" data-v-247eb1de>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-247eb1de${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-247eb1de><span class="ofp__id" data-v-247eb1de>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-247eb1de></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-247eb1de>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-247eb1de>Replace file-based Bulk/Batch Payments with a JSON array</h1><p class="ofp__summary" data-v-247eb1de> Deprecate the unused file-upload model for Bulk/Batch Payments and carry the individual payments as a JSON array in a single signed request. </p><div class="ofp__strip" data-v-247eb1de><div class="ofp__strip-item" data-v-247eb1de><div class="ofp__strip-key" data-v-247eb1de>Proposed by</div><div class="ofp__strip-val" data-v-247eb1de>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-247eb1de><div class="ofp__strip-key" data-v-247eb1de>Author</div><div class="ofp__strip-val" data-v-247eb1de>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-247eb1de><div class="ofp__strip-key" data-v-247eb1de>Target version</div><div class="ofp__strip-val" data-v-247eb1de>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-247eb1de><div class="ofp__strip-key" data-v-247eb1de>Opened</div><div class="ofp__strip-val" data-v-247eb1de>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-247eb1de><div class="ofp__strip-key" data-v-247eb1de>Closes</div><div class="ofp__strip-val" data-v-247eb1de>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-247eb1de${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-247eb1de${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-247eb1de${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-247eb1de${_scopeId}><div class="ofp-vote-cover__card" data-v-247eb1de${_scopeId}><div class="ofp-vote-cover__label" data-v-247eb1de${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-247eb1de${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-247eb1de${_scopeId}><span class="ofp-seam-label" data-v-247eb1de${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>A file model nobody has built</h2></div><div class="ofp-prose" data-v-247eb1de${_scopeId}><p data-v-247eb1de${_scopeId}> File-based Bulk/Batch Payments — referred to in the standard as <strong data-v-247eb1de${_scopeId}>File Payments</strong> — have been part of the specification since v1.2. They are defined as a file <strong data-v-247eb1de${_scopeId}>upload</strong> model: a TPP uploads a payment file in an LFI-specific format to <code data-v-247eb1de${_scopeId}>POST /payment-consents/{ConsentId}/file</code>, declares its <code data-v-247eb1de${_scopeId}>FileType</code>, <code data-v-247eb1de${_scopeId}>FileHash</code>, <code data-v-247eb1de${_scopeId}>NumberOfTransactions</code> and <code data-v-247eb1de${_scopeId}>ControlSum</code> on the consent, then creates the batch with <code data-v-247eb1de${_scopeId}>POST /file-payments</code>. The execution report is returned as a file as well. </p><p data-v-247eb1de${_scopeId}> In practice, <strong data-v-247eb1de${_scopeId}>no LFI in the ecosystem has implemented these endpoints.</strong> There is not a single live File Payment integration — which means there is nothing to migrate, and the model can be revised at effectively zero cost <em data-v-247eb1de${_scopeId}>before</em> banks begin building file-parsing and malware-scanning pipelines to support it. </p><p data-v-247eb1de${_scopeId}> Beyond being unbuilt, the file model is under-specified: an LFI could not implement it today without a round of clarifications. A few examples — not an exhaustive list — are below: </p><ul class="ofp-gaps" data-v-247eb1de${_scopeId}><li data-v-247eb1de${_scopeId}> The file holds PII, but the specification defines no encryption element to protect it. </li><li data-v-247eb1de${_scopeId}> The specification does not cover how uploaded files are scanned. </li><li data-v-247eb1de${_scopeId}> It does not define the required file structures, which file types must be supported, or how a TPP discovers which file types each LFI accepts. </li></ul></div></div></section><section class="ofp-band ofp-band--white" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>Carry the payments as a JSON array</h2></div><div class="ofp-prose" data-v-247eb1de${_scopeId}><p data-v-247eb1de${_scopeId}><strong data-v-247eb1de${_scopeId}>Deprecate the file-upload mechanism and carry the payments inline instead.</strong> The Bulk/Batch create request — <code data-v-247eb1de${_scopeId}>POST /file-payments</code> today — would carry the individual payments as a <strong data-v-247eb1de${_scopeId}>JSON array in a single signed request</strong>, one array element per transaction, in place of a reference to an uploaded file. (Whether the endpoint and schemas keep the <code data-v-247eb1de${_scopeId}>file-payments</code> name is an open question for the ecosystem — see the asks below.) </p><p data-v-247eb1de${_scopeId}> Each element of <code data-v-247eb1de${_scopeId}>Instructions[]</code> is assembled from the <strong data-v-247eb1de${_scopeId}>single-payment fields the standard already defines</strong> (amount, creditor account, references). The request is signed end-to-end exactly like <code data-v-247eb1de${_scopeId}>POST /payments</code>, so the same validation, signing, and idempotency rules apply to a batch as to a single payment. The <code data-v-247eb1de${_scopeId}>NumberOfTransactions</code> and <code data-v-247eb1de${_scopeId}>ControlSum</code> integrity checks are retained — now computed over the array rather than a file. </p><p data-v-247eb1de${_scopeId}> A TPP can still collect a file from the customer — for example, an Excel sheet of ten payments. The difference is where it is converted: the <strong data-v-247eb1de${_scopeId}>TPP</strong> maps that file into the JSON array per its own specification and passes the result to the LFI, who processes the payments from the array. There is little customer impact — the same file is still the customer’s starting point. What moves is the conversion: the TPP turns the file into JSON-format payments rather than the LFI parsing the file itself. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-247eb1de${_scopeId}> Three concrete changes — to the consent, the authorization experience, and the payment-creation request. </p></div><div class="ofp-changes" data-v-247eb1de${_scopeId}><div class="ofp-change" data-v-247eb1de${_scopeId}><div class="ofp-change__label" data-v-247eb1de${_scopeId}>01 · Consent (PAR) — File Payment object</div><p data-v-247eb1de${_scopeId}> Remove <code data-v-247eb1de${_scopeId}>FileType</code>, <code data-v-247eb1de${_scopeId}>FileHash</code>, and <code data-v-247eb1de${_scopeId}>FileReference</code> — there is no file to type, hash, or reference. Add <code data-v-247eb1de${_scopeId}>Description</code>: the reason the LFI shows the customer at authorization (for example, <em data-v-247eb1de${_scopeId}>“Payroll June 2026”</em>). <code data-v-247eb1de${_scopeId}>NumberOfTransactions</code>, <code data-v-247eb1de${_scopeId}>ControlSum</code>, and <code data-v-247eb1de${_scopeId}>RequestedExecutionDate</code> stay — the LFI validates the JSON array’s count and total against <code data-v-247eb1de${_scopeId}>NumberOfTransactions</code> and <code data-v-247eb1de${_scopeId}>ControlSum</code>. </p></div><div class="ofp-change" data-v-247eb1de${_scopeId}><div class="ofp-change__label" data-v-247eb1de${_scopeId}>02 · Authorization page</div><p data-v-247eb1de${_scopeId}> The authorization page no longer renders an uploaded file. It shows the standard confirm-payment details, with <code data-v-247eb1de${_scopeId}>Description</code> as the stated reason. The change for the customer is minimal — the consent confirmation looks like any other payment. </p></div><div class="ofp-change" data-v-247eb1de${_scopeId}><div class="ofp-change__label" data-v-247eb1de${_scopeId}>03 · <code data-v-247eb1de${_scopeId}>POST /file-payments</code> body</div><p data-v-247eb1de${_scopeId}> The create request carries everything <code data-v-247eb1de${_scopeId}>POST /payments</code> carries, with two structural changes: the payments become an <code data-v-247eb1de${_scopeId}>Instructions[]</code> array — one element per transaction — and <code data-v-247eb1de${_scopeId}>PersonalIdentifiableInformation</code>, <code data-v-247eb1de${_scopeId}>DebtorReference</code>, and <code data-v-247eb1de${_scopeId}>CreditorReference</code> move <strong data-v-247eb1de${_scopeId}>inside each element</strong>, so every instruction is self-contained. <code data-v-247eb1de${_scopeId}>CurrencyRequest</code> is dropped to remove complexity. <code data-v-247eb1de${_scopeId}>ConsentId</code>, <code data-v-247eb1de${_scopeId}>PaymentPurposeCode</code>, and <code data-v-247eb1de${_scopeId}>OpenFinanceBilling</code> stay at the batch level. The request is a signed JWS end-to-end, exactly like <code data-v-247eb1de${_scopeId}>POST /payments</code>. </p></div></div><div class="ofp-code" data-v-247eb1de${_scopeId}><div class="ofp-code__label" data-v-247eb1de${_scopeId}>Today — file upload + reference (2 steps)</div><pre class="ofp-code__pre" data-v-247eb1de${_scopeId}>${ssrInterpolate(exampleToday)}</pre></div><div class="ofp-code" data-v-247eb1de${_scopeId}><div class="ofp-code__label" data-v-247eb1de${_scopeId}>Proposed — JSON array in one signed request</div><pre class="ofp-code__pre" data-v-247eb1de${_scopeId}>${ssrInterpolate(exampleProposed)}</pre></div></div></section><section class="ofp-band ofp-band--white" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 04 · Draft schema</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>The array model, written out</h2><p class="ofp-band__lede" data-v-247eb1de${_scopeId}> Two working drafts attached to this proposal — the revised PAR consent object and the JSON-array create request — each opens in the same rendered view as the published API specs. Schemas the proposal changes are defined in full; schemas unchanged from the published spec are shown as stubs marked “unchanged”. </p></div><div class="ofp-cards" data-v-247eb1de${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/proposals/ofp-001/par-schema",
              class: "ofp-card",
              style: { "--card-color": "#0043A6" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ofp-card__top" style="${ssrRenderStyle({ background: "#0043A6" })}" data-v-247eb1de${_scopeId2}></span><div class="ofp-card__meta" data-v-247eb1de${_scopeId2}><span class="ofp-card__cat" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-247eb1de${_scopeId2}>PAR consent</span></div><h3 class="ofp-card__title" data-v-247eb1de${_scopeId2}>par-file-payment-schema.yaml</h3><p class="ofp-card__desc" data-v-247eb1de${_scopeId2}>File Payment control parameters — file fields removed, a customer-facing Description added.</p><div class="ofp-card__foot" data-v-247eb1de${_scopeId2}><span class="ofp-card__cta" data-v-247eb1de${_scopeId2}>Open rendered schema</span><span class="ofp-card__arrow" style="${ssrRenderStyle({ color: "#0043A6" })}" data-v-247eb1de${_scopeId2}>→</span></div>`);
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
                      }, "PAR consent")
                    ]),
                    createVNode("h3", { class: "ofp-card__title" }, "par-file-payment-schema.yaml"),
                    createVNode("p", { class: "ofp-card__desc" }, "File Payment control parameters — file fields removed, a customer-facing Description added."),
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
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/proposals/ofp-001/schema",
              class: "ofp-card",
              style: { "--card-color": "#008B78" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="ofp-card__top" style="${ssrRenderStyle({ background: "#008B78" })}" data-v-247eb1de${_scopeId2}></span><div class="ofp-card__meta" data-v-247eb1de${_scopeId2}><span class="ofp-card__cat" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-247eb1de${_scopeId2}>Bulk / Batch</span></div><h3 class="ofp-card__title" data-v-247eb1de${_scopeId2}>bulk-payment-schema.yaml</h3><p class="ofp-card__desc" data-v-247eb1de${_scopeId2}>Payments carried as a JSON Instructions[] array in one signed request.</p><div class="ofp-card__foot" data-v-247eb1de${_scopeId2}><span class="ofp-card__cta" data-v-247eb1de${_scopeId2}>Open rendered schema</span><span class="ofp-card__arrow" style="${ssrRenderStyle({ color: "#008B78" })}" data-v-247eb1de${_scopeId2}>→</span></div>`);
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
                      }, "Bulk / Batch")
                    ]),
                    createVNode("h3", { class: "ofp-card__title" }, "bulk-payment-schema.yaml"),
                    createVNode("p", { class: "ofp-card__desc" }, "Payments carried as a JSON Instructions[] array in one signed request."),
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
            _push2(`</div></div></section><section class="ofp-band ofp-band--cream" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 05 · Pros</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>What moving to JSON removes</h2></div><ul class="ofp-pros" data-v-247eb1de${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-247eb1de${_scopeId}><span class="ofp-pros__glyph" data-v-247eb1de${_scopeId}>✓</span><span data-v-247eb1de${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--white" data-v-247eb1de${_scopeId}><div class="ofp-band__inner" data-v-247eb1de${_scopeId}><div class="ofp-band__head" data-v-247eb1de${_scopeId}><div class="ofp-band__eyebrow" data-v-247eb1de${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-247eb1de${_scopeId}></span> 06 · Cons</div><h2 class="ofp-band__title" data-v-247eb1de${_scopeId}>What moving to JSON costs</h2></div><ul class="ofp-cons" data-v-247eb1de${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-247eb1de${_scopeId}><span class="ofp-cons__glyph" data-v-247eb1de${_scopeId}>×</span><span data-v-247eb1de${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "A file model nobody has built")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" File-based Bulk/Batch Payments — referred to in the standard as "),
                      createVNode("strong", null, "File Payments"),
                      createTextVNode(" — have been part of the specification since v1.2. They are defined as a file "),
                      createVNode("strong", null, "upload"),
                      createTextVNode(" model: a TPP uploads a payment file in an LFI-specific format to "),
                      createVNode("code", null, "POST /payment-consents/{ConsentId}/file"),
                      createTextVNode(", declares its "),
                      createVNode("code", null, "FileType"),
                      createTextVNode(", "),
                      createVNode("code", null, "FileHash"),
                      createTextVNode(", "),
                      createVNode("code", null, "NumberOfTransactions"),
                      createTextVNode(" and "),
                      createVNode("code", null, "ControlSum"),
                      createTextVNode(" on the consent, then creates the batch with "),
                      createVNode("code", null, "POST /file-payments"),
                      createTextVNode(". The execution report is returned as a file as well. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" In practice, "),
                      createVNode("strong", null, "no LFI in the ecosystem has implemented these endpoints."),
                      createTextVNode(" There is not a single live File Payment integration — which means there is nothing to migrate, and the model can be revised at effectively zero cost "),
                      createVNode("em", null, "before"),
                      createTextVNode(" banks begin building file-parsing and malware-scanning pipelines to support it. ")
                    ]),
                    createVNode("p", null, " Beyond being unbuilt, the file model is under-specified: an LFI could not implement it today without a round of clarifications. A few examples — not an exhaustive list — are below: "),
                    createVNode("ul", { class: "ofp-gaps" }, [
                      createVNode("li", null, " The file holds PII, but the specification defines no encryption element to protect it. "),
                      createVNode("li", null, " The specification does not cover how uploaded files are scanned. "),
                      createVNode("li", null, " It does not define the required file structures, which file types must be supported, or how a TPP discovers which file types each LFI accepts. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Carry the payments as a JSON array")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Deprecate the file-upload mechanism and carry the payments inline instead."),
                      createTextVNode(" The Bulk/Batch create request — "),
                      createVNode("code", null, "POST /file-payments"),
                      createTextVNode(" today — would carry the individual payments as a "),
                      createVNode("strong", null, "JSON array in a single signed request"),
                      createTextVNode(", one array element per transaction, in place of a reference to an uploaded file. (Whether the endpoint and schemas keep the "),
                      createVNode("code", null, "file-payments"),
                      createTextVNode(" name is an open question for the ecosystem — see the asks below.) ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Each element of "),
                      createVNode("code", null, "Instructions[]"),
                      createTextVNode(" is assembled from the "),
                      createVNode("strong", null, "single-payment fields the standard already defines"),
                      createTextVNode(" (amount, creditor account, references). The request is signed end-to-end exactly like "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", so the same validation, signing, and idempotency rules apply to a batch as to a single payment. The "),
                      createVNode("code", null, "NumberOfTransactions"),
                      createTextVNode(" and "),
                      createVNode("code", null, "ControlSum"),
                      createTextVNode(" integrity checks are retained — now computed over the array rather than a file. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A TPP can still collect a file from the customer — for example, an Excel sheet of ten payments. The difference is where it is converted: the "),
                      createVNode("strong", null, "TPP"),
                      createTextVNode(" maps that file into the JSON array per its own specification and passes the result to the LFI, who processes the payments from the array. There is little customer impact — the same file is still the customer’s starting point. What moves is the conversion: the TPP turns the file into JSON-format payments rather than the LFI parsing the file itself. ")
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
                    createVNode("p", { class: "ofp-band__lede" }, " Three concrete changes — to the consent, the authorization experience, and the payment-creation request. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Consent (PAR) — File Payment object"),
                      createVNode("p", null, [
                        createTextVNode(" Remove "),
                        createVNode("code", null, "FileType"),
                        createTextVNode(", "),
                        createVNode("code", null, "FileHash"),
                        createTextVNode(", and "),
                        createVNode("code", null, "FileReference"),
                        createTextVNode(" — there is no file to type, hash, or reference. Add "),
                        createVNode("code", null, "Description"),
                        createTextVNode(": the reason the LFI shows the customer at authorization (for example, "),
                        createVNode("em", null, "“Payroll June 2026”"),
                        createTextVNode("). "),
                        createVNode("code", null, "NumberOfTransactions"),
                        createTextVNode(", "),
                        createVNode("code", null, "ControlSum"),
                        createTextVNode(", and "),
                        createVNode("code", null, "RequestedExecutionDate"),
                        createTextVNode(" stay — the LFI validates the JSON array’s count and total against "),
                        createVNode("code", null, "NumberOfTransactions"),
                        createTextVNode(" and "),
                        createVNode("code", null, "ControlSum"),
                        createTextVNode(". ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Authorization page"),
                      createVNode("p", null, [
                        createTextVNode(" The authorization page no longer renders an uploaded file. It shows the standard confirm-payment details, with "),
                        createVNode("code", null, "Description"),
                        createTextVNode(" as the stated reason. The change for the customer is minimal — the consent confirmation looks like any other payment. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, [
                        createTextVNode("03 · "),
                        createVNode("code", null, "POST /file-payments"),
                        createTextVNode(" body")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" The create request carries everything "),
                        createVNode("code", null, "POST /payments"),
                        createTextVNode(" carries, with two structural changes: the payments become an "),
                        createVNode("code", null, "Instructions[]"),
                        createTextVNode(" array — one element per transaction — and "),
                        createVNode("code", null, "PersonalIdentifiableInformation"),
                        createTextVNode(", "),
                        createVNode("code", null, "DebtorReference"),
                        createTextVNode(", and "),
                        createVNode("code", null, "CreditorReference"),
                        createTextVNode(" move "),
                        createVNode("strong", null, "inside each element"),
                        createTextVNode(", so every instruction is self-contained. "),
                        createVNode("code", null, "CurrencyRequest"),
                        createTextVNode(" is dropped to remove complexity. "),
                        createVNode("code", null, "ConsentId"),
                        createTextVNode(", "),
                        createVNode("code", null, "PaymentPurposeCode"),
                        createTextVNode(", and "),
                        createVNode("code", null, "OpenFinanceBilling"),
                        createTextVNode(" stay at the batch level. The request is a signed JWS end-to-end, exactly like "),
                        createVNode("code", null, "POST /payments"),
                        createTextVNode(". ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — file upload + reference (2 steps)"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleToday))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — JSON array in one signed request"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleProposed))
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Draft schema")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "The array model, written out"),
                    createVNode("p", { class: "ofp-band__lede" }, " Two working drafts attached to this proposal — the revised PAR consent object and the JSON-array create request — each opens in the same rendered view as the published API specs. Schemas the proposal changes are defined in full; schemas unchanged from the published spec are shown as stubs marked “unchanged”. ")
                  ]),
                  createVNode("div", { class: "ofp-cards" }, [
                    createVNode(_component_RouterLink, {
                      to: "/proposals/ofp-001/par-schema",
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
                          }, "PAR consent")
                        ]),
                        createVNode("h3", { class: "ofp-card__title" }, "par-file-payment-schema.yaml"),
                        createVNode("p", { class: "ofp-card__desc" }, "File Payment control parameters — file fields removed, a customer-facing Description added."),
                        createVNode("div", { class: "ofp-card__foot" }, [
                          createVNode("span", { class: "ofp-card__cta" }, "Open rendered schema"),
                          createVNode("span", {
                            class: "ofp-card__arrow",
                            style: { color: "#0043A6" }
                          }, "→")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_RouterLink, {
                      to: "/proposals/ofp-001/schema",
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
                          }, "Bulk / Batch")
                        ]),
                        createVNode("h3", { class: "ofp-card__title" }, "bulk-payment-schema.yaml"),
                        createVNode("p", { class: "ofp-card__desc" }, "Payments carried as a JSON Instructions[] array in one signed request."),
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
                    createVNode("h2", { class: "ofp-band__title" }, "What moving to JSON removes")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What moving to JSON costs")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-001/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-247eb1de"]]);
export {
  index as default
};
