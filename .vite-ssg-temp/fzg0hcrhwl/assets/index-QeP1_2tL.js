import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, watch, onMounted, resolveComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import { t as tallyOf, u as useProposals, P as PRIORITY, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import { useHead } from "@unhead/vue";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "./PvVoteBar-BySHaSon.js";
const __vite_glob_0_0$1 = `# OFP-003 — Debtor & Creditor Reference schemas, character set applied (V2.1 errata)
#
# OUTCOME of OFP-003. The Debtor and Creditor References stay free text
# (minLength 1, maxLength 35), but a character-set \`pattern\` is added so every
# LFI knows exactly which characters it must accept and store.
#
# The approved set is the ISO 20022 / SWIFT "x" set ONLY:
#     A-Z  a-z  0-9  space  and  / - ? : ( ) . , ' +
#     pattern: ^[A-Za-z0-9 /?:().,'+-]+$
#
# The Arabic block (U+0600-U+06FF) proposed alongside it is NOT included. LFIs
# and TPPs reported that Arabic cannot be carried end-to-end today — SWIFT MT/MX,
# the UAEFTS rail (CB SSM rules), and several core banking systems neither accept
# nor store it, and where a customer enters Arabic it is transliterated to Latin
# before submission. Survivability beyond the SWIFT set is addressed through the
# Structured Reference guidance (which characters to prefer / avoid), NOT by
# narrowing the validated set further.
#
# The identical pattern applies everywhere the v2.1 free-text reference is
# defined, so validation is uniform across PAR, Bank Service Initiation, Consent
# Manager, Consent Events, and Ozone Connect:
#   - Standards      · uae-bank-initiation-openapi.yaml
#                        AECreditorReference / AEDebtorReference
#                        AEBankServiceInitiation.AECreditorReference / .AEDebtorReference
#                    · uae-authorization-endpoints-openapi.yaml (PAR)
#                        AEBankServiceInitiation.AECreditorReference / .AEDebtorReference
#   - Ozone Connect  · uae-ozone-connect-bank-service-initiation-openapi.yaml
#                        AECreditorReference / AEDebtorReference (plain string, no anyOf)
#                    · uae-ozone-connect-consent-events-actions-openapi.yaml
#                        AEServiceInitiationCreditorReference / …DebtorReference
#                        (the current-version branch of the anyOf only)
#   - Consent Mgr    · uae-api-hub-consent-manager-openapi.yaml
#                        AEServiceInitiationCreditorReference / …DebtorReference
#                        (the current-version branch of the anyOf only)
#
# The 35-character limit is counted in Unicode characters; the API Hub normalises
# to Unicode NFC before validating. The deprecated structured (120-char) variants
# retained for older versions are NOT touched.
#
# Source of truth is api-specs (dist/). This excerpt shows only the changed
# schemas; unchanged surrounding definitions are omitted.

components:
  schemas:
    # ── Standards (TPP-facing) ───────────────────────────────────────────────
    AECreditorReference:
      description: A Creditor Reference is a note for a given Creditor or Creditor LFI that supports reconciliation of
        a given payment instruction.
      type: string
      minLength: 1
      maxLength: 35
      pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set

    AEDebtorReference:
      description: A Debtor Reference is a note is for the reference of a given User that may be available as
        additional information in relation to a given payment instruction.
      type: string
      minLength: 1
      maxLength: 35
      pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set

    AEBankServiceInitiation.AECreditorReference:
      type: string
      minLength: 1
      maxLength: 35
      pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set
      description: >-
        A Creditor Reference is a note for a given Creditor or Creditor LFI that supports reconciliation of a given
        payment instruction.

    AEBankServiceInitiation.AEDebtorReference:
      type: string
      minLength: 1
      maxLength: 35
      pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set
      description: >-
        A Debtor Reference is a note is for the reference of a given User that may be available as additional
        information in relation to a given payment instruction.

    # ── Ozone Connect · bank-service-initiation (LFI-facing) ─────────────────
    # This spec uses the SAME plain-string schemas as the Standards side —
    # AECreditorReference / AEDebtorReference (no anyOf) — so the pattern is
    # added identically to those shown above. Not repeated here to avoid
    # duplicate schema keys in this excerpt.

    # ── Consent Events (Ozone Connect) / Consent Manager (api-hub) ───────────
    # These carry the deprecated structured variant, so the schema is an anyOf.
    # The pattern is added to the CURRENT (free-text, 35-char) branch ONLY; the
    # deprecated structured 120-char branch is unchanged.
    AEServiceInitiationCreditorReference:
      anyOf:
        - description: "**DEPRECATED AT v2.1** — structured 120-char Creditor reference. UNCHANGED (see published spec)."
          type: string
          minLength: 1
          maxLength: 120
          pattern: ^TPP=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12},BIC=[A-Z0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}([A-Z0-9]{3}){0,1}($|,.+$)
          deprecated: true
        - description: |-
            A Creditor Reference is a note for a given Creditor or Creditor LFI that supports reconciliation of
            a given payment instruction.
          type: string
          minLength: 1
          maxLength: 35
          pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set

    AEServiceInitiationDebtorReference:
      anyOf:
        - description: "**DEPRECATED AT v2.1** — structured 120-char Debtor reference. UNCHANGED (see published spec)."
          type: string
          minLength: 1
          maxLength: 120
          pattern: ^TPP=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12},(Merchant=[A-Z0-9]{3}-[A-Z]{4}-TL.+-[0-9]{4}|),BIC=[A-Z0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}([A-Z0-9]{3}){0,1}($|,.+$)
          deprecated: true
        - description: |-
            A Debtor Reference is a note is for the reference of a given User that may be available as
            additional information in relation to a given payment instruction.
          type: string
          minLength: 1
          maxLength: 35
          pattern: "^[A-Za-z0-9 /?:().,'+-]+$"   # ADDED — SWIFT "x" set
`;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "outcome",
  __ssrInlineRender: true,
  setup(__props) {
    const { voterTotal } = useProposals();
    const specSources = /* @__PURE__ */ Object.assign({
      "./reference-schema.yaml": __vite_glob_0_0$1
    });
    const spec = specSources["./reference-schema.yaml"] ?? "";
    const record = {
      id: "OFP-003",
      ref: "DR-2026-003",
      verdict: "approved",
      title: "Define an allowed character set for Debtor and Creditor References",
      category: "Payments · Schema",
      decisionDate: "1 Jul 2026",
      // A label (or date) for when the decision takes effect; '' to omit the pill.
      effective: "V2.1 errata",
      summary: "Approved with one amendment: the Debtor and Creditor References are constrained to a single, uniform character set — so no LFI is left guessing which characters it must accept and store — but the Arabic block (U+0600–U+06FF) from the original proposal is removed. LFIs and TPPs reported that Arabic cannot be carried end-to-end today: SWIFT MT/MX, the UAEFTS rail (CB SSM rules), and several core banking systems neither accept nor store it, and where a customer enters Arabic it is transliterated to Latin before submission. The approved set is therefore the ISO 20022 / SWIFT “x” set only — Latin letters, digits, space, and / - ? : ( ) . , ’ + — validated centrally at the API Hub, identically across PAR, Bank Service Initiation, Consent Manager, Consent Events, and Ozone Connect."
    };
    const counts = computed(() => tallyOf(record.id).counts);
    const pct = computed(
      () => counts.value.total ? Math.round(counts.value.for / counts.value.total * 100) : 0
    );
    const turnout = computed(
      () => voterTotal ? Math.round(counts.value.total / voterTotal * 100) : 0
    );
    const approved = computed(() => record.verdict === "approved");
    const seal = computed(() => approved.value ? "var(--at-teal-deep, #008B78)" : "#A6391F");
    const sealTint = computed(
      () => approved.value ? "rgba(0, 194, 169, 0.12)" : "rgba(166, 57, 31, 0.08)"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "po",
        style: { "--seal": seal.value, "--seal-tint": sealTint.value }
      }, _attrs))} data-v-65dbaf66><div class="po__inner" data-v-65dbaf66><div class="po-sheet" data-v-65dbaf66><div class="po-sheet__head" data-v-65dbaf66><div class="po-eyebrow" data-v-65dbaf66><span class="po-eyebrow__k" data-v-65dbaf66>Decision record · ${ssrInterpolate(record.ref)}</span><span class="po-eyebrow__dot" data-v-65dbaf66></span><span class="po-eyebrow__k" data-v-65dbaf66>${ssrInterpolate(record.category)}</span><span class="po-eyebrow__dot" data-v-65dbaf66></span><span class="po-eyebrow__k" data-v-65dbaf66>Voting closed ${ssrInterpolate(record.decisionDate)}</span></div><div class="po-verdict" data-v-65dbaf66><div class="${ssrRenderClass([{ "po-seal--approved": approved.value }, "po-seal"])}" data-v-65dbaf66><span class="po-seal__glyph" data-v-65dbaf66>${ssrInterpolate(approved.value ? "✓" : "✕")}</span></div><div class="po-verdict__text" data-v-65dbaf66><div class="po-verdict__label" data-v-65dbaf66>${ssrInterpolate(approved.value ? "Approved" : "Rejected")} `);
      if (approved.value) {
        _push(`<span class="po-verdict__chip" data-v-65dbaf66>Ratified</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="po-verdict__sub" data-v-65dbaf66>${ssrInterpolate(pct.value)}% in favour · ${ssrInterpolate(counts.value.for)}–${ssrInterpolate(counts.value.against)}–${ssrInterpolate(counts.value.abstain)}</div></div></div><div class="po-sheet__title" data-v-65dbaf66><span class="po-pid" data-v-65dbaf66>${ssrInterpolate(record.id)}</span><h2 data-v-65dbaf66>${ssrInterpolate(record.title)}</h2></div></div><div class="po-metrics" data-v-65dbaf66><div class="po-metrics__cell po-metrics__cell--hl" data-v-65dbaf66><div class="po-metrics__bar" data-v-65dbaf66></div><div class="po-badge" data-v-65dbaf66><span class="po-badge__g" data-v-65dbaf66>${ssrInterpolate(approved.value ? "✓" : "✕")}</span><span class="po-badge__w" data-v-65dbaf66>${ssrInterpolate(approved.value ? "Approved" : "Rejected")}</span></div><div class="po-metrics__cap" data-v-65dbaf66>Final decision</div></div><div class="po-metrics__cell" data-v-65dbaf66><div class="po-metrics__bar" data-v-65dbaf66></div><div class="po-metrics__num" data-v-65dbaf66>${ssrInterpolate(pct.value)}%</div><div class="po-metrics__cap" data-v-65dbaf66>In favour</div></div><div class="po-metrics__cell" data-v-65dbaf66><div class="po-metrics__bar" data-v-65dbaf66></div><div class="po-metrics__num" data-v-65dbaf66>${ssrInterpolate(counts.value.total)}<span class="po-metrics__denom" data-v-65dbaf66>/${ssrInterpolate(unref(voterTotal))}</span></div><div class="po-metrics__cap" data-v-65dbaf66>Total votes</div></div><div class="po-metrics__cell" data-v-65dbaf66><div class="po-metrics__bar" data-v-65dbaf66></div><div class="po-metrics__num" data-v-65dbaf66>${ssrInterpolate(turnout.value)}%</div><div class="po-metrics__cap" data-v-65dbaf66>Participation</div></div></div></div><div class="po-body" data-v-65dbaf66><div data-v-65dbaf66><div class="po-seclabel" data-v-65dbaf66>§ Decision summary</div><p class="po-summary" data-v-65dbaf66>${ssrInterpolate(record.summary)}</p><div class="po-note" data-v-65dbaf66><div class="po-note__k" data-v-65dbaf66>On rail survivability</div><p class="po-note__p" data-v-65dbaf66> Some LFIs asked us to go further than SWIFT — trimming the set to a stricter subset (e.g. <code data-v-65dbaf66>A–Z 0–9 space - /</code>) to guarantee a reference survives every core and rail intact. We acknowledge that concern, but we do not think the answer is to technically limit the field further in Open Finance. Narrowing the validated set would reject ordinary references such as <code data-v-65dbaf66>Salary (June)</code> or <code data-v-65dbaf66>Ref: 9981, paid</code> for everyone. Instead, survivability is best handled through the <strong data-v-65dbaf66>Structured Reference</strong> guidance — helping TPPs choose which characters to prefer and which to avoid — while the enforced validation stays at the full ISO 20022 / SWIFT “x” set. </p></div><div class="po-spec" data-v-65dbaf66><h3 class="po-h" data-v-65dbaf66> The change in the spec `);
      {
        _push(`<span class="po-next__eff" data-v-65dbaf66>This change will be made in ${ssrInterpolate(record.effective)}</span>`);
      }
      _push(`</h3><p class="po-spec__lede" data-v-65dbaf66> A single, additive change — a character-set <code data-v-65dbaf66>pattern</code> on the current free-text reference schemas — applied identically wherever the reference appears. The 35-character limit and free-text-first shape are unchanged; the deprecated structured variants are not touched. </p><div class="po-code" data-v-65dbaf66><div class="po-code__label" data-v-65dbaf66>reference-schema.yaml · ISO 20022 / SWIFT “x” set applied</div><pre class="po-code__pre" data-v-65dbaf66>${ssrInterpolate(unref(spec))}</pre></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-003/outcome.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const outcome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-65dbaf66"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outcome
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props) {
    const themes = [
      {
        k: "01",
        title: "A uniform character set is wanted",
        body: "Support was broad (14 of 18 in favour). The recurring reason was consistency: LFIs and TPPs want one set that every institution accepts and stores, so a reference that validates at the API Hub is not rejected or altered downstream.",
        quote: {
          text: "Keep uniformity across all LFIs which will ease the integration and understanding of debtor and creditor references. Easy to process the reference using open APIs.",
          who: "George Kirubaharan Devathomas · ADIB · For"
        }
      },
      {
        k: "02",
        title: "Arabic cannot be carried end-to-end today",
        body: "The decisive theme, and the reason for the amendment. Both remaining objections to the character set itself — and several For-voters — reported that Arabic is not supported across SWIFT, the UAEFTS rail, and core banking systems. Where a customer enters Arabic, TPPs transliterate it to Latin before submission.",
        quote: {
          text: "Our core systems do not support Arabic characters by default… From a SWIFT perspective, MT messages do not support Arabic characters. FTS — Arabic chars are not allowed in remittance info as per CB SSM.",
          who: "Pradeepkumar Rayapati · FAB · Against"
        }
      },
      {
        k: "03",
        title: "The SWIFT “x” set is the safe baseline",
        body: "The Latin baseline was independently confirmed as workable. FAB reported its core supports exactly A–Z, a–z, 0–9 and ' ( ) + , - . : / — the ISO 20022 / SWIFT “x” set — and other TPPs said they already validate against the approved SWIFT characters. This is the set the decision adopts.",
        quote: {
          text: "Most payments, especially those that travel on SWIFT networks, can only be sent using the English character set… we always validate against approved SWIFT characters.",
          who: "Mike Nagavalli · GrowX · For"
        }
      },
      {
        k: "04",
        title: "One ask to go narrower — handled via guidance",
        body: "A single voter asked for a stricter subset (A–Z 0–9 space - /, avoiding + ’ : ?) to guarantee survivability across every rail. We acknowledge the concern but did not narrow the enforced set — that would reject ordinary references for everyone. Survivability is instead steered through the Structured Reference guidance.",
        quote: {
          text: "If we aim to guarantee survivability across AANI / IPP / UAEFTS, banks are recommended to use a stricter practical subset… prefer a structured format: INV-123456, REF-202406-ABC.",
          who: "Aishwarya Venugopal · Mashreq · For"
        }
      },
      {
        k: "05",
        title: "A separate ask on length",
        body: "One objection was not about characters at all: a request to widen the 35-character limit toward the 140-character SWIFT/AEP remittance field, chiefly for B2B reconciliation. That is a length question outside this proposal’s scope; it is recorded for separate consideration and did not affect this decision.",
        quote: {
          text: "Limiting this field to only 35 characters will raise RFIs for banks. This is more important for B2B customers, where they supply extensive information in this field for reconciliation.",
          who: "AQ Mohammed · DIB · Against"
        }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fb" }, _attrs))} data-v-c48a911b><div class="fb__inner" data-v-c48a911b><div class="fb__head" data-v-c48a911b><div class="fb__eyebrow" data-v-c48a911b><span class="fb__eyebrow-dash" data-v-c48a911b></span> Feedback · themes from the vote</div><h2 class="fb__title" data-v-c48a911b>What the ecosystem told us</h2><p class="fb__lede" data-v-c48a911b> A short synthesis of the comments and question answers behind the tally above. The full per-organisation votes are listed in the panel; these are the themes that shaped the outcome. </p></div><div class="fb__grid" data-v-c48a911b><!--[-->`);
      ssrRenderList(themes, (t) => {
        _push(`<article class="fb-card" data-v-c48a911b><div class="fb-card__k" data-v-c48a911b>${ssrInterpolate(t.k)}</div><h3 class="fb-card__title" data-v-c48a911b>${ssrInterpolate(t.title)}</h3><p class="fb-card__body" data-v-c48a911b>${ssrInterpolate(t.body)}</p>`);
        if (t.quote) {
          _push(`<blockquote class="fb-card__quote" data-v-c48a911b><p class="fb-card__quote-text" data-v-c48a911b>“${ssrInterpolate(t.quote.text)}”</p><footer class="fb-card__quote-who" data-v-c48a911b>${ssrInterpolate(t.quote.who)}</footer></blockquote>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-003/feedback.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c48a911b"]]);
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: feedback
}, Symbol.toStringTag, { value: "Module" }));
const OG_TITLE = "OFP-003 · Define an allowed character set for Debtor and Creditor References";
const OG_DESCRIPTION = "Keep payment references free-text, but constrain them to a single agreed character set — uniform across the ecosystem — so every LFI knows exactly which characters it must accept and store.";
const exampleToday = `# v2.1 today — free text, no character validation
AECreditorReference:
  type: string
  minLength: 1
  maxLength: 35
  # any UTF-8 character is accepted; each LFI is left to guess
  # what its own systems can store and reconcile`;
const exampleProposed = `# Proposed — free text, one agreed character set (Latin + Arabic)
AECreditorReference:
  type: string
  minLength: 1
  maxLength: 35                                      # counted in Unicode characters
  pattern: "^[A-Za-z0-9 /?:().,'+\\u0600-\\u06FF-]+$"   # SWIFT "x" set + Arabic block
  description: >-
    A Creditor Reference is a note for a given Creditor or Creditor LFI
    that supports reconciliation of a payment instruction. Characters are
    limited to the Open Finance reference set — the Latin "x" set plus the
    Arabic block (U+0600–U+06FF) — so every LFI can accept and store it.`;
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
      id: "OFP-003",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "16 Jun 2026",
      closes: "1 Jul 2026",
      priority: "medium",
      version: "V2.1-errata"
    };
    const pros = [
      "Every LFI knows exactly which characters it must accept and store — no per-institution guesswork about an unbounded UTF-8 string.",
      "One uniform rule across PAR, Bank Service Initiation, Consent Manager, Consent Events, and Ozone Connect — a reference that validates at the API Hub will not be rejected downstream by an LFI.",
      "Still free text: the customer’s reference comes first and is not squeezed behind a machine prefix, so the v1.2/v2.0 truncation problem does not return.",
      "Supports Arabic as well as Latin, so a customer can use a reference in their own script rather than a transliteration.",
      "A known character set removes a class of encoding, storage, and injection edge cases that an unrestricted string invites.",
      "Validation is enforced centrally at the API Hub, so a malformed reference is rejected before it ever reaches an LFI."
    ];
    const cons = [
      "TPPs must sanitise or transliterate customer input to the agreed set before submitting.",
      "Arabic characters are two bytes each in UTF-8, so an all-Arabic 35-character reference is roughly 70 bytes — LFI cores that size this field in bytes rather than characters must allow for it.",
      "Reintroducing a pattern is a validation change every implementer must adopt, even though the field’s shape and length are unchanged."
    ];
    const validRefs = [
      { ref: "Invoice 12345", note: "plain Latin free text" },
      { ref: "Rent-Jun/2026", note: "dash and slash" },
      { ref: "Salary (June)", note: "parentheses and space" },
      { ref: "Ref: 9981, paid", note: "colon and comma" },
      { ref: "Ahmed-ENBD-Lean", note: "structured: text – bank – TPP" },
      { ref: "فاتورة ٢٠٢٦", note: "Arabic letters with Arabic-Indic digits" },
      { ref: "دفعة Lean", note: "mixed Arabic and Latin" }
    ];
    const invalidRefs = [
      { ref: "Pay @ Ahmed", note: "“@” is outside the set" },
      { ref: "Order #4471", note: "“#” is outside the set" },
      { ref: "100% deposit", note: "“%” is outside the set" },
      { ref: "A/C <12345>", note: "“<” and “>” are outside the set" },
      { ref: "Note; DROP", note: "“;” is outside the set" },
      { ref: "Café Milano", note: "accented “é” is not in the Latin set" },
      { ref: "Заказ 12", note: "Cyrillic script is not included" },
      { ref: "Tip 😀", note: "emoji are not included" }
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
      return ((_a2 = PRIORITY[priority.value]) == null ? void 0 : _a2.label) ?? PRIORITY.medium.label;
    });
    const isClosed = computed(() => status.value === "closed");
    const outcomeMods = /* @__PURE__ */ Object.assign({ "./outcome.vue": __vite_glob_0_0 });
    const feedbackMods = /* @__PURE__ */ Object.assign({ "./feedback.vue": __vite_glob_1_0 });
    const OutcomePartial = ((_a = Object.values(outcomeMods)[0]) == null ? void 0 : _a.default) ?? null;
    const FeedbackPartial = ((_b = Object.values(feedbackMods)[0]) == null ? void 0 : _b.default) ?? null;
    const showTabs = computed(() => isClosed.value && !!OutcomePartial);
    const proposal = computed(() => {
      var _a2;
      return {
        id: meta.id,
        title: "Define an allowed character set for Debtor and Creditor References",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-9fd9bf80><section class="ofp-hero" data-v-9fd9bf80><div class="ofp-hero__inner" data-v-9fd9bf80>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-9fd9bf80${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-9fd9bf80><span class="ofp__id" data-v-9fd9bf80>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-9fd9bf80></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-9fd9bf80>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-9fd9bf80>Define an allowed character set for Debtor and Creditor References</h1><p class="ofp__summary" data-v-9fd9bf80> Keep the payment references free-text, but constrain them to a single agreed character set — uniform across the ecosystem — so every LFI knows exactly which characters it must accept and store. </p><div class="ofp__strip" data-v-9fd9bf80><div class="ofp__strip-item" data-v-9fd9bf80><div class="ofp__strip-key" data-v-9fd9bf80>Proposed by</div><div class="ofp__strip-val" data-v-9fd9bf80>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-9fd9bf80><div class="ofp__strip-key" data-v-9fd9bf80>Author</div><div class="ofp__strip-val" data-v-9fd9bf80>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-9fd9bf80><div class="ofp__strip-key" data-v-9fd9bf80>Target version</div><div class="ofp__strip-val" data-v-9fd9bf80>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-9fd9bf80><div class="ofp__strip-key" data-v-9fd9bf80>Opened</div><div class="ofp__strip-val" data-v-9fd9bf80>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-9fd9bf80><div class="ofp__strip-key" data-v-9fd9bf80>Closes</div><div class="ofp__strip-val" data-v-9fd9bf80>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-9fd9bf80${_scopeId}><div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-9fd9bf80${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-9fd9bf80${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-9fd9bf80${_scopeId}><div class="ofp-vote-cover__card" data-v-9fd9bf80${_scopeId}><div class="ofp-vote-cover__label" data-v-9fd9bf80${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-9fd9bf80${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
            _push2(`<section class="${ssrRenderClass([{ "ofp-band--seam": !showTabs.value }, "ofp-band ofp-band--cream"])}" data-v-9fd9bf80${_scopeId}>`);
            if (!showTabs.value) {
              _push2(`<span class="ofp-seam-label" data-v-9fd9bf80${_scopeId}>The proposal</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>The references that didn’t fit</h2></div><div class="ofp-prose" data-v-9fd9bf80${_scopeId}><p data-v-9fd9bf80${_scopeId}> Every payment instruction carries two free-form notes — a <strong data-v-9fd9bf80${_scopeId}>Debtor Reference</strong> and a <strong data-v-9fd9bf80${_scopeId}>Creditor Reference</strong> — that travel with the payment to support reconciliation and to give the customer something recognisable against the transaction. In v1.2 and v2.0 these were not free text at all: they were defined by a tightly prescribed regular expression (<code data-v-9fd9bf80${_scopeId}>AEStructuredDebtorReference</code> / <code data-v-9fd9bf80${_scopeId}>AEStructuredCreditorReference</code>) that required a fixed machine prefix — the TPP’s Trust Framework ID, the account BIC, and, for merchant payments, a merchant identifier — with the human-readable text appended <strong data-v-9fd9bf80${_scopeId}>at the end</strong>, up to a combined 120 characters. </p><p data-v-9fd9bf80${_scopeId}> That shape did not meet the needs of TPPs. The part a customer actually reads — the free-text reference — sat behind roughly 50–60 characters of identifiers. LFI core banking systems carry a narrower reference field than 120 characters and truncate from the right, so the machine prefix survived intact while the meaningful free text was clipped or lost entirely. The rigid pattern also rejected legitimate references outright, leaving TPPs no room to pass the information their use case required. </p><p data-v-9fd9bf80${_scopeId}> In <strong data-v-9fd9bf80${_scopeId}>version 2.1 we relaxed the schema</strong>: the Debtor and Creditor References became a plain free-text string (<code data-v-9fd9bf80${_scopeId}>minLength 1</code>, <code data-v-9fd9bf80${_scopeId}>maxLength 35</code>, no enforced pattern), so the text the customer relies on comes first and is no longer squeezed behind a fixed prefix. Alongside that, we moved the structuring guidance out of the schema and into a business rule — <strong data-v-9fd9bf80${_scopeId}>CRG-5.3</strong> — that TPPs SHOULD follow where a payments use case does not dictate otherwise, putting the free-text reference first and the bank / merchant / TPP names after it, within the 35-character budget. Structure became a recommended convention, not a validation gate. </p><p data-v-9fd9bf80${_scopeId}> Since that change, LFIs have asked that the references not be left <strong data-v-9fd9bf80${_scopeId}>completely open to any character</strong>. Relaxing the structural pattern was right — but with no validation at all, an LFI cannot know in advance which characters it will be handed, and each institution is left to guess what its own systems can accept and store. The ask is for a defined set of permitted characters: not as prescriptive as the old structured pattern, but a single, <strong data-v-9fd9bf80${_scopeId}>uniform character-set validation</strong> applied consistently across the entire Open Finance ecosystem, so that every LFI knows exactly what it must accept and every TPP knows exactly what it may send. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-9fd9bf80${_scopeId}><div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>Constrain the characters, not the structure</h2></div><div class="ofp-prose" data-v-9fd9bf80${_scopeId}><p data-v-9fd9bf80${_scopeId}><strong data-v-9fd9bf80${_scopeId}>Keep the references free-text and 35 characters long, but reintroduce a single pattern that validates the <em data-v-9fd9bf80${_scopeId}>characters</em>, not the <em data-v-9fd9bf80${_scopeId}>structure</em>.</strong> The pattern defines an allowed character set — nothing about where the bank name or TPP name must sit. That ordering stays a recommendation in the TPP standards (linked below), not a validation rule. </p><p data-v-9fd9bf80${_scopeId}> We propose a set in <strong data-v-9fd9bf80${_scopeId}>two groups</strong>: a conservative <strong data-v-9fd9bf80${_scopeId}>Latin baseline</strong> — the ISO 20022 / SWIFT “x” set (Latin letters, digits, space, and <code data-v-9fd9bf80${_scopeId}>/ - ? : ( ) . , ’ +</code>) that LFI cores, the SWIFT-heritage UAEFTS rail, and ISO 20022 AANI all store reliably — plus the <strong data-v-9fd9bf80${_scopeId}>Arabic block</strong> (<code data-v-9fd9bf80${_scopeId}>U+0600–U+06FF</code>), so a customer can write a genuinely Arabic reference, names included. As one regular expression, with length still capped at 35: </p><p class="ofp-regex" data-v-9fd9bf80${_scopeId}><code data-v-9fd9bf80${_scopeId}>^[A-Za-z0-9 /?:().,&#39;+\\\\u0600-\\\\u06FF-]+$</code></p><p data-v-9fd9bf80${_scopeId}> The Arabic block covers Arabic letters, Arabic-Indic digits (٠–٩) and Arabic punctuation, but the set deliberately stops there — no presentation-form ligatures, rare extended letters, or bidirectional control characters, which add only ambiguity and spoofing risk. This is <strong data-v-9fd9bf80${_scopeId}>not</strong> framed as “the AANI set”: AANI imposes no character class of its own (it length-checks the field and passes the value through), so the constraint exists to give LFI core systems one predictable set. The same pattern applies wherever the current v2.1 free-text reference is defined, so validation is identical across PAR, Bank Service Initiation, Consent Manager, Consent Events, and Ozone Connect. The 35-character limit is counted in Unicode characters, and the API Hub normalises to Unicode NFC before validating. </p><p data-v-9fd9bf80${_scopeId}> The structuring convention is defined in the TPP standards as a requirement — it is not restated here. See the <strong data-v-9fd9bf80${_scopeId}>Structured Reference</strong> requirement under `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements#consent-creation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Single Instant Payment → Consent Creation`);
                } else {
                  return [
                    createTextVNode("Single Instant Payment → Consent Creation")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` (the same requirement applies to each multi-payment type). In short: where a use case does not dictate the reference, the TPP puts the User’s free-text reference first (to a maximum of 22 characters), then the Creditor LFI bank name, an optional Merchant name, and the TPP name — to a maximum of 35 characters in total. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-9fd9bf80${_scopeId}><div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> 03 · Technical changes</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>What changes in the spec</h2><p class="ofp-band__lede" data-v-9fd9bf80${_scopeId}> A single, additive change — a character-set pattern on the current reference definition — applied identically everywhere the references appear. </p></div><div class="ofp-changes" data-v-9fd9bf80${_scopeId}><div class="ofp-change" data-v-9fd9bf80${_scopeId}><div class="ofp-change__label" data-v-9fd9bf80${_scopeId}>01 · Reference schemas (current v2.1 definition)</div><p data-v-9fd9bf80${_scopeId}> Add a <code data-v-9fd9bf80${_scopeId}>pattern</code> that defines the allowed character set to the plain-string Debtor and Creditor reference schemas — <code data-v-9fd9bf80${_scopeId}>AEBankServiceInitiation.AEDebtorReference</code> / <code data-v-9fd9bf80${_scopeId}>AECreditorReference</code> in the standards, the same plain <code data-v-9fd9bf80${_scopeId}>AEDebtorReference</code> / <code data-v-9fd9bf80${_scopeId}>AECreditorReference</code> in Ozone Connect, and the current-version branch of the <code data-v-9fd9bf80${_scopeId}>AEServiceInitiationDebtorReference</code> / <code data-v-9fd9bf80${_scopeId}>AEServiceInitiationCreditorReference</code> anyOf in Consent Manager and Consent Events. <code data-v-9fd9bf80${_scopeId}>minLength 1</code>, <code data-v-9fd9bf80${_scopeId}>maxLength 35</code>, and free-text-first all stay. The deprecated structured variants retained for older versions are not touched. </p></div><div class="ofp-change" data-v-9fd9bf80${_scopeId}><div class="ofp-change__label" data-v-9fd9bf80${_scopeId}>02 · Structured Reference requirement</div><p data-v-9fd9bf80${_scopeId}> Unchanged. The Structured Reference requirement in the TPP standards remains the convention for <em data-v-9fd9bf80${_scopeId}>structuring</em> the reference — free text first, then bank / merchant / TPP names. This proposal adds the character-set validation underneath it; it does not reinstate a structural pattern. </p></div><div class="ofp-change" data-v-9fd9bf80${_scopeId}><div class="ofp-change__label" data-v-9fd9bf80${_scopeId}>03 · Validation &amp; error handling</div><p data-v-9fd9bf80${_scopeId}> A reference containing a character outside the agreed set fails schema validation at the <strong data-v-9fd9bf80${_scopeId}>API Hub</strong> and is rejected before the request reaches the LFI — returned as a standard request-validation error, not silently sanitised on the TPP’s behalf. </p></div></div><div class="ofp-code" data-v-9fd9bf80${_scopeId}><div class="ofp-code__label" data-v-9fd9bf80${_scopeId}>Today — free text, no character validation</div><pre class="ofp-code__pre" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(exampleToday)}</pre></div><div class="ofp-code" data-v-9fd9bf80${_scopeId}><div class="ofp-code__label" data-v-9fd9bf80${_scopeId}>Proposed — free text, one agreed character set</div><pre class="ofp-code__pre" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(exampleProposed)}</pre></div><div class="ofp-ex" data-v-9fd9bf80${_scopeId}><div class="ofp-ex__col ofp-ex__col--ok" data-v-9fd9bf80${_scopeId}><div class="ofp-ex__head" data-v-9fd9bf80${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--ok" data-v-9fd9bf80${_scopeId}>✓</span> Valid </div><ul class="ofp-ex__list" data-v-9fd9bf80${_scopeId}><!--[-->`);
            ssrRenderList(validRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-9fd9bf80${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div><div class="ofp-ex__col ofp-ex__col--no" data-v-9fd9bf80${_scopeId}><div class="ofp-ex__head" data-v-9fd9bf80${_scopeId}><span class="ofp-ex__glyph ofp-ex__glyph--no" data-v-9fd9bf80${_scopeId}>×</span> Invalid </div><ul class="ofp-ex__list" data-v-9fd9bf80${_scopeId}><!--[-->`);
            ssrRenderList(invalidRefs, (e, i) => {
              _push2(`<li class="ofp-ex__item" data-v-9fd9bf80${_scopeId}><code class="ofp-ex__ref" dir="auto" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(e.ref)}</code><span class="ofp-ex__note" data-v-9fd9bf80${_scopeId}>${ssrInterpolate(e.note)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></div><p class="ofp-ex__foot" data-v-9fd9bf80${_scopeId}> Length is enforced separately — a reference over 35 characters fails on <code data-v-9fd9bf80${_scopeId}>maxLength</code>, not on the pattern. </p></div></section><section class="ofp-band ofp-band--white" data-v-9fd9bf80${_scopeId}><div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> 04 · Pros</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>What a uniform character set buys</h2></div><ul class="ofp-pros" data-v-9fd9bf80${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-9fd9bf80${_scopeId}><span class="ofp-pros__glyph" data-v-9fd9bf80${_scopeId}>✓</span><span data-v-9fd9bf80${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-9fd9bf80${_scopeId}><div class="ofp-band__inner" data-v-9fd9bf80${_scopeId}><div class="ofp-band__head" data-v-9fd9bf80${_scopeId}><div class="ofp-band__eyebrow" data-v-9fd9bf80${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-9fd9bf80${_scopeId}></span> 05 · Cons</div><h2 class="ofp-band__title" data-v-9fd9bf80${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-9fd9bf80${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-9fd9bf80${_scopeId}><span class="ofp-cons__glyph" data-v-9fd9bf80${_scopeId}>×</span><span data-v-9fd9bf80${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "The references that didn’t fit")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" Every payment instruction carries two free-form notes — a "),
                      createVNode("strong", null, "Debtor Reference"),
                      createTextVNode(" and a "),
                      createVNode("strong", null, "Creditor Reference"),
                      createTextVNode(" — that travel with the payment to support reconciliation and to give the customer something recognisable against the transaction. In v1.2 and v2.0 these were not free text at all: they were defined by a tightly prescribed regular expression ("),
                      createVNode("code", null, "AEStructuredDebtorReference"),
                      createTextVNode(" / "),
                      createVNode("code", null, "AEStructuredCreditorReference"),
                      createTextVNode(") that required a fixed machine prefix — the TPP’s Trust Framework ID, the account BIC, and, for merchant payments, a merchant identifier — with the human-readable text appended "),
                      createVNode("strong", null, "at the end"),
                      createTextVNode(", up to a combined 120 characters. ")
                    ]),
                    createVNode("p", null, " That shape did not meet the needs of TPPs. The part a customer actually reads — the free-text reference — sat behind roughly 50–60 characters of identifiers. LFI core banking systems carry a narrower reference field than 120 characters and truncate from the right, so the machine prefix survived intact while the meaningful free text was clipped or lost entirely. The rigid pattern also rejected legitimate references outright, leaving TPPs no room to pass the information their use case required. "),
                    createVNode("p", null, [
                      createTextVNode(" In "),
                      createVNode("strong", null, "version 2.1 we relaxed the schema"),
                      createTextVNode(": the Debtor and Creditor References became a plain free-text string ("),
                      createVNode("code", null, "minLength 1"),
                      createTextVNode(", "),
                      createVNode("code", null, "maxLength 35"),
                      createTextVNode(", no enforced pattern), so the text the customer relies on comes first and is no longer squeezed behind a fixed prefix. Alongside that, we moved the structuring guidance out of the schema and into a business rule — "),
                      createVNode("strong", null, "CRG-5.3"),
                      createTextVNode(" — that TPPs SHOULD follow where a payments use case does not dictate otherwise, putting the free-text reference first and the bank / merchant / TPP names after it, within the 35-character budget. Structure became a recommended convention, not a validation gate. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Since that change, LFIs have asked that the references not be left "),
                      createVNode("strong", null, "completely open to any character"),
                      createTextVNode(". Relaxing the structural pattern was right — but with no validation at all, an LFI cannot know in advance which characters it will be handed, and each institution is left to guess what its own systems can accept and store. The ask is for a defined set of permitted characters: not as prescriptive as the old structured pattern, but a single, "),
                      createVNode("strong", null, "uniform character-set validation"),
                      createTextVNode(" applied consistently across the entire Open Finance ecosystem, so that every LFI knows exactly what it must accept and every TPP knows exactly what it may send. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "Constrain the characters, not the structure")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("Keep the references free-text and 35 characters long, but reintroduce a single pattern that validates the "),
                        createVNode("em", null, "characters"),
                        createTextVNode(", not the "),
                        createVNode("em", null, "structure"),
                        createTextVNode(".")
                      ]),
                      createTextVNode(" The pattern defines an allowed character set — nothing about where the bank name or TPP name must sit. That ordering stays a recommendation in the TPP standards (linked below), not a validation rule. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" We propose a set in "),
                      createVNode("strong", null, "two groups"),
                      createTextVNode(": a conservative "),
                      createVNode("strong", null, "Latin baseline"),
                      createTextVNode(" — the ISO 20022 / SWIFT “x” set (Latin letters, digits, space, and "),
                      createVNode("code", null, "/ - ? : ( ) . , ’ +"),
                      createTextVNode(") that LFI cores, the SWIFT-heritage UAEFTS rail, and ISO 20022 AANI all store reliably — plus the "),
                      createVNode("strong", null, "Arabic block"),
                      createTextVNode(" ("),
                      createVNode("code", null, "U+0600–U+06FF"),
                      createTextVNode("), so a customer can write a genuinely Arabic reference, names included. As one regular expression, with length still capped at 35: ")
                    ]),
                    createVNode("p", { class: "ofp-regex" }, [
                      createVNode("code", null, "^[A-Za-z0-9 /?:().,'+\\\\u0600-\\\\u06FF-]+$")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The Arabic block covers Arabic letters, Arabic-Indic digits (٠–٩) and Arabic punctuation, but the set deliberately stops there — no presentation-form ligatures, rare extended letters, or bidirectional control characters, which add only ambiguity and spoofing risk. This is "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" framed as “the AANI set”: AANI imposes no character class of its own (it length-checks the field and passes the value through), so the constraint exists to give LFI core systems one predictable set. The same pattern applies wherever the current v2.1 free-text reference is defined, so validation is identical across PAR, Bank Service Initiation, Consent Manager, Consent Events, and Ozone Connect. The 35-character limit is counted in Unicode characters, and the API Hub normalises to Unicode NFC before validating. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The structuring convention is defined in the TPP standards as a requirement — it is not restated here. See the "),
                      createVNode("strong", null, "Structured Reference"),
                      createTextVNode(" requirement under "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements#consent-creation" }, {
                        default: withCtx(() => [
                          createTextVNode("Single Instant Payment → Consent Creation")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" (the same requirement applies to each multi-payment type). In short: where a use case does not dictate the reference, the TPP puts the User’s free-text reference first (to a maximum of 22 characters), then the Creditor LFI bank name, an optional Merchant name, and the TPP name — to a maximum of 35 characters in total. ")
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
                    createVNode("p", { class: "ofp-band__lede" }, " A single, additive change — a character-set pattern on the current reference definition — applied identically everywhere the references appear. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Reference schemas (current v2.1 definition)"),
                      createVNode("p", null, [
                        createTextVNode(" Add a "),
                        createVNode("code", null, "pattern"),
                        createTextVNode(" that defines the allowed character set to the plain-string Debtor and Creditor reference schemas — "),
                        createVNode("code", null, "AEBankServiceInitiation.AEDebtorReference"),
                        createTextVNode(" / "),
                        createVNode("code", null, "AECreditorReference"),
                        createTextVNode(" in the standards, the same plain "),
                        createVNode("code", null, "AEDebtorReference"),
                        createTextVNode(" / "),
                        createVNode("code", null, "AECreditorReference"),
                        createTextVNode(" in Ozone Connect, and the current-version branch of the "),
                        createVNode("code", null, "AEServiceInitiationDebtorReference"),
                        createTextVNode(" / "),
                        createVNode("code", null, "AEServiceInitiationCreditorReference"),
                        createTextVNode(" anyOf in Consent Manager and Consent Events. "),
                        createVNode("code", null, "minLength 1"),
                        createTextVNode(", "),
                        createVNode("code", null, "maxLength 35"),
                        createTextVNode(", and free-text-first all stay. The deprecated structured variants retained for older versions are not touched. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Structured Reference requirement"),
                      createVNode("p", null, [
                        createTextVNode(" Unchanged. The Structured Reference requirement in the TPP standards remains the convention for "),
                        createVNode("em", null, "structuring"),
                        createTextVNode(" the reference — free text first, then bank / merchant / TPP names. This proposal adds the character-set validation underneath it; it does not reinstate a structural pattern. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Validation & error handling"),
                      createVNode("p", null, [
                        createTextVNode(" A reference containing a character outside the agreed set fails schema validation at the "),
                        createVNode("strong", null, "API Hub"),
                        createTextVNode(" and is rejected before the request reaches the LFI — returned as a standard request-validation error, not silently sanitised on the TPP’s behalf. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Today — free text, no character validation"),
                    createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(exampleToday))
                  ]),
                  createVNode("div", { class: "ofp-code" }, [
                    createVNode("div", { class: "ofp-code__label" }, "Proposed — free text, one agreed character set"),
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
                    createTextVNode(" Length is enforced separately — a reference over 35 characters fails on "),
                    createVNode("code", null, "maxLength"),
                    createTextVNode(", not on the pattern. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What a uniform character set buys")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-003/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fd9bf80"]]);
export {
  index as default
};
