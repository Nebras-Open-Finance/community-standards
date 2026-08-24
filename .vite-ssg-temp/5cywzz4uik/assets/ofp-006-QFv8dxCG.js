import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext, ref, watch, onMounted, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, resolveDynamicComponent, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { t as tallyOf, u as useProposals, P as PRIORITY, d as deriveStatus } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import { useHead } from "@unhead/vue";
import { P as PvProposalTabs, a as PvVotePanel } from "./PvProposalTabs-Ccajgt7K.js";
import { P as PvStatusPill } from "./PvStatusPill-C5-9fFbH.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "./PvVoteBar-BySHaSon.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ofp-006.outcome",
  __ssrInlineRender: true,
  setup(__props) {
    const { voterTotal } = useProposals();
    const record = {
      id: "OFP-006",
      ref: "DR-2026-006",
      verdict: "deferred",
      title: "Carry the requested API version into the Ozone Connect path",
      category: "API Hub · Request routing",
      decisionDate: "10 Aug 2026",
      // When the decision will be re-tested; '' to omit the pill.
      revisit: "the next major version transition",
      summary: "Deferred. Every vote cast was in favour — 6 for, none against, none abstaining — but only 6 of 24 eligible voters took part, and the answers behind those votes described a problem LFIs expect to have rather than one they have. Only one LFI dual-runs concurrent versions today, and it has already built the header-parsing workaround this proposal would replace. Section 05 set the bar explicitly: a change on the API Hub request path only pays for itself if a significant part of the ecosystem would actually use it. The vote established consensus that the path is the right place to carry the version; it did not establish that the work is needed now. The engineering is therefore not being scheduled, and Nebras will bring the question back at the next major version transition, when concurrent dual-running becomes an obligation under the Major Version Deprecation Policy rather than a plan."
    };
    const counts = computed(() => tallyOf(record.id).counts);
    const pct = computed(
      () => counts.value.total ? Math.round(counts.value.for / counts.value.total * 100) : 0
    );
    const turnout = computed(
      () => voterTotal ? Math.round(counts.value.total / voterTotal * 100) : 0
    );
    const approved = computed(() => record.verdict === "approved");
    const deferred = computed(() => record.verdict === "deferred");
    const verdictLabel = computed(
      () => approved.value ? "Approved" : deferred.value ? "Deferred" : "Rejected"
    );
    const verdictGlyph = computed(() => approved.value ? "✓" : deferred.value ? "‖" : "✕");
    const seal = computed(
      () => approved.value ? "var(--at-teal-deep, #008B78)" : deferred.value ? "#B37819" : "#A6391F"
    );
    const sealTint = computed(
      () => approved.value ? "rgba(0, 194, 169, 0.12)" : deferred.value ? "rgba(179, 120, 25, 0.12)" : "rgba(166, 57, 31, 0.08)"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "po",
        style: { "--seal": seal.value, "--seal-tint": sealTint.value }
      }, _attrs))} data-v-8c5b01e6><div class="po__inner" data-v-8c5b01e6><div class="po-sheet" data-v-8c5b01e6><div class="po-sheet__head" data-v-8c5b01e6><div class="po-eyebrow" data-v-8c5b01e6><span class="po-eyebrow__k" data-v-8c5b01e6>Decision record · ${ssrInterpolate(record.ref)}</span><span class="po-eyebrow__dot" data-v-8c5b01e6></span><span class="po-eyebrow__k" data-v-8c5b01e6>${ssrInterpolate(record.category)}</span><span class="po-eyebrow__dot" data-v-8c5b01e6></span><span class="po-eyebrow__k" data-v-8c5b01e6>Voting closed ${ssrInterpolate(record.decisionDate)}</span></div><div class="po-verdict" data-v-8c5b01e6><div class="${ssrRenderClass([{ "po-seal--approved": approved.value }, "po-seal"])}" data-v-8c5b01e6><span class="po-seal__glyph" data-v-8c5b01e6>${ssrInterpolate(verdictGlyph.value)}</span></div><div class="po-verdict__text" data-v-8c5b01e6><div class="po-verdict__label" data-v-8c5b01e6>${ssrInterpolate(verdictLabel.value)} `);
      if (approved.value) {
        _push(`<span class="po-verdict__chip" data-v-8c5b01e6>Ratified</span>`);
      } else if (deferred.value) {
        _push(`<span class="po-verdict__chip" data-v-8c5b01e6>No decision taken</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="po-verdict__sub" data-v-8c5b01e6>${ssrInterpolate(pct.value)}% in favour · ${ssrInterpolate(counts.value.for)}–${ssrInterpolate(counts.value.against)}–${ssrInterpolate(counts.value.abstain)}</div></div></div><div class="po-sheet__title" data-v-8c5b01e6><span class="po-pid" data-v-8c5b01e6>${ssrInterpolate(record.id)}</span><h2 data-v-8c5b01e6>${ssrInterpolate(record.title)}</h2></div></div><div class="po-metrics" data-v-8c5b01e6><div class="po-metrics__cell po-metrics__cell--hl" data-v-8c5b01e6><div class="po-metrics__bar" data-v-8c5b01e6></div><div class="po-badge" data-v-8c5b01e6><span class="po-badge__g" data-v-8c5b01e6>${ssrInterpolate(verdictGlyph.value)}</span><span class="po-badge__w" data-v-8c5b01e6>${ssrInterpolate(verdictLabel.value)}</span></div><div class="po-metrics__cap" data-v-8c5b01e6>Final decision</div></div><div class="po-metrics__cell" data-v-8c5b01e6><div class="po-metrics__bar" data-v-8c5b01e6></div><div class="po-metrics__num" data-v-8c5b01e6>${ssrInterpolate(pct.value)}%</div><div class="po-metrics__cap" data-v-8c5b01e6>In favour · of votes cast</div></div><div class="po-metrics__cell" data-v-8c5b01e6><div class="po-metrics__bar" data-v-8c5b01e6></div><div class="po-metrics__num" data-v-8c5b01e6>${ssrInterpolate(counts.value.total)}<span class="po-metrics__denom" data-v-8c5b01e6>/${ssrInterpolate(unref(voterTotal))}</span></div><div class="po-metrics__cap" data-v-8c5b01e6>Total votes</div></div><div class="po-metrics__cell po-metrics__cell--hl" data-v-8c5b01e6><div class="po-metrics__bar" data-v-8c5b01e6></div><div class="po-metrics__num" data-v-8c5b01e6>${ssrInterpolate(turnout.value)}%</div><div class="po-metrics__cap" data-v-8c5b01e6>Participation</div></div></div></div><div class="po-body" data-v-8c5b01e6><div data-v-8c5b01e6><div class="po-seclabel" data-v-8c5b01e6>§ Decision summary</div><p class="po-summary" data-v-8c5b01e6>${ssrInterpolate(record.summary)}</p><div class="po-detail" data-v-8c5b01e6><p data-v-8c5b01e6><strong data-v-8c5b01e6>The vote was unanimous but shallow.</strong> Six LFIs voted, all in favour, and none asked for the proposal to be amended. Participation was the lowest of any proposal to date — a quarter of eligible voters — and two of the six answered neither question on the form. A proposal that asks the ecosystem to justify a build cannot treat silence as demand. </p><p data-v-8c5b01e6><strong data-v-8c5b01e6>Where voters did answer, the need was prospective.</strong> Two LFIs said they would adopt the token only for new versions; one said it is not running concurrent versions at all and would revisit when it does; another said its plan is a single implementation that stays backward compatible with the prior version rather than two deployments side by side. None of those positions is an argument against the mechanism. All of them describe a problem that begins at the next major version transition, not one that exists now. </p><p data-v-8c5b01e6><strong data-v-8c5b01e6>The one LFI that dual-runs today has already solved it.</strong> It intercepts <code data-v-8c5b01e6>o3-api-uri</code>, substitutes the version into its own internal path, and routes on that — precisely the workaround the proposal set out to remove, already built, in production, and working. That is the single most consequential answer in the vote. The proposal&#39;s premise is that the workaround is a cost LFIs are carrying; the only LFI actually carrying it has paid that cost once and is not asking to be relieved of it. </p><p data-v-8c5b01e6><strong data-v-8c5b01e6>Section 05 of the proposal committed Nebras to this outcome in advance.</strong> It stated that a vote in favour had to mean an institution would <em data-v-8c5b01e6>use</em> the token, not merely that it seemed like a good idea, and that if the answers showed LFIs would keep routing on the header, the work would not be scheduled. Holding to that is what makes the question worth asking. Reading six prospective yes votes as a mandate for a change on the hot path of every proxied request in the ecosystem would make the exercise decorative. </p><p data-v-8c5b01e6><strong data-v-8c5b01e6>Nothing changes for any LFI or TPP.</strong> The <code data-v-8c5b01e6>o3-api-uri</code> header remains the routing signal, the configured API family base path remains a static string, and the `);
      _push(ssrRenderComponent(_component_RouterLink, { to: "/policy/lfi-deprecation" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Major Version Deprecation Policy`);
          } else {
            return [
              createTextVNode("Major Version Deprecation Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` is unchanged — including the concurrent-running obligation it places on an LFI at each major version transition. No LFI needs to revise a design or a roadmap because of this decision. </p></div><div class="po-note" data-v-8c5b01e6><div class="po-note__k" data-v-8c5b01e6>What happens next</div><p class="po-note__p" data-v-8c5b01e6><strong data-v-8c5b01e6>There is no implementation timeline, because there is no implementation.</strong> One voter asked when the change would land if supported; the answer is that it has not been scheduled and will not appear in an API Hub release. Nebras will <strong data-v-8c5b01e6>bring OFP-006 back at the next major version transition</strong>, when dual-running stops being a plan and becomes an obligation — at that point LFIs will be answering from experience rather than from intention, and the evidence will mean something. The proposal is deferred on timing and evidence, <strong data-v-8c5b01e6>not rejected on merit</strong>: no voter argued against the mechanism, and Nebras expects to build it when the demand is real. </p></div><div class="po-spec" data-v-8c5b01e6><h3 class="po-h" data-v-8c5b01e6> Where this leaves dual-running `);
      {
        _push(`<span class="po-next__eff" data-v-8c5b01e6>Revisited at ${ssrInterpolate(record.revisit)}</span>`);
      }
      _push(`</h3><p class="po-spec__lede" data-v-8c5b01e6> No configuration, header, schema, or endpoint changes as a result of this decision. An LFI planning for a major version transition should design against the position below, which is the same position that applied before the proposal was raised. </p><div class="po-rules" data-v-8c5b01e6><div class="po-rules__label" data-v-8c5b01e6>The position today · unchanged by this decision</div><ul class="po-rules__list" data-v-8c5b01e6><li data-v-8c5b01e6><strong data-v-8c5b01e6>The version reaches Ozone Connect in the <code data-v-8c5b01e6>o3-api-uri</code> header</strong>, which carries the parameterised URL the TPP called. This remains the supported routing signal for an LFI serving concurrent versions. </li><li data-v-8c5b01e6><strong data-v-8c5b01e6>The API family base path stays a static string</strong>, configured per environment at `);
      _push(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`environment-specific onboarding`);
          } else {
            return [
              createTextVNode("environment-specific onboarding")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` and prepended verbatim to every request in that family. No substitution token is recognised. </li><li data-v-8c5b01e6><strong data-v-8c5b01e6>Parsing the header and substituting the version into an internal path is a valid pattern</strong>, and is what the one LFI dual-running in production does today. It is not a workaround Nebras intends to deprecate. </li><li data-v-8c5b01e6><strong data-v-8c5b01e6>The concurrent-running obligation is unchanged.</strong> An LFI going live with a new major version must still run the prior and new versions side by side for the whole deprecation window, routing each TPP request to the correct implementation. </li></ul></div><div class="po-rules po-rules--muted" data-v-8c5b01e6><div class="po-rules__label" data-v-8c5b01e6>What would change the answer</div><ul class="po-rules__list" data-v-8c5b01e6><li data-v-8c5b01e6><strong data-v-8c5b01e6>LFIs actually dual-running.</strong> The decisive weakness in the vote was that almost no one is. Once several LFIs are running two versions concurrently and answering from operational experience, the same two questions produce evidence rather than intention. </li><li data-v-8c5b01e6><strong data-v-8c5b01e6>A concrete case header routing cannot serve.</strong> No voter described one. An LFI that hits a dual-running problem it cannot solve by parsing <code data-v-8c5b01e6>o3-api-uri</code> should raise it through the Service Desk, and it will reopen this proposal on its own merits rather than waiting for the next transition. </li><li data-v-8c5b01e6><strong data-v-8c5b01e6>Adoption at scale rather than in principle.</strong> Two LFIs said they would use the token only for new versions and one said it would treat the header as informational. A material number of LFIs committing to route on the path — for versions they are already running — is what clears the bar Section 05 set. </li></ul></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-006.outcome.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ofp006_outcome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8c5b01e6"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ofp006_outcome
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ofp-006.feedback",
  __ssrInlineRender: true,
  setup(__props) {
    const themes = [
      {
        k: "01",
        title: "Unanimous, and thin",
        body: "Every vote was in favour — 6 for, none against, none abstaining — and no voter asked for the proposal to be amended or narrowed. But six votes is a quarter of the eligible electorate and the lowest turnout of any proposal to date, against thirteen on OFP-007. Two of the six answered neither question. On a proposal whose central section asked the ecosystem to justify a build, a light turnout is itself a finding: the LFIs who did not vote are not, on this evidence, waiting for it."
      },
      {
        k: "02",
        title: "Nobody disputed that the path is the right place",
        body: "On the mechanism there was no argument at all. Voters described path-based versioning as standard practice, and the most detailed answer set out benefits the proposal had not claimed — that carrying the version through to the internal integration API keeps code maintenance tractable, and that it allows an old version to be deprecated at the gateway rather than inside the application. The engineering judgement in the proposal was accepted. What the vote did not establish is that it needs to be built now.",
        quote: {
          text: "Relative path versioning is best as per industrial practice.",
          who: "An LFI · For"
        }
      },
      {
        k: "03",
        title: "Every yes was about a version that does not exist yet",
        body: 'The first question asked whether an LFI would route on the substituted path rather than the header, and whether it would move existing routing over or use the token only for new versions. Two answered "only for new versions" in almost identical words. A third said it is not running versions in parallel at all and would revisit when it does. Not one voter said it would migrate routing it operates today. The support is real, but it is entirely forward-looking — which places the earliest point at which it could be used at the next major version transition.',
        quote: {
          text: "We’re not currently running versions in parallel. When we do support multiple versions, we’d still keep API Hub as the decision point and route on the configured path, with o3-api-uri treated as informational/for logging rather than as the routing key.",
          who: "An LFI · For"
        }
      },
      {
        k: "04",
        title: "The one LFI that dual-runs has already built the workaround",
        body: "The second question asked who dual-runs today and what it costs to operate. One voter — the only one running concurrent versions end to end — described exactly the pattern the proposal set out to remove: intercept the header, substitute the version into the internal URI path, route on that. It is built, it is in production, and the answer named no operating cost. This is the most consequential answer in the vote. The proposal rests on the workaround being a burden LFIs are carrying; the only LFI carrying it has paid for it once and did not ask to be relieved of it.",
        quote: {
          text: "we do dual run versions in our api end to end. currently we are intercepting the header and form internal APIs by substituting version in the URI path",
          who: "An LFI · For"
        }
      },
      {
        k: "05",
        title: "Backward compatibility, not dual-running, is the prevailing plan",
        body: "Two voters described their approach to the next major version as a single implementation that stays compatible with the prior one — moving straight to the new version while remaining backward compatible with the version before it. If that is how most LFIs meet the concurrent-running obligation, there is little for a path-based router to route: one deployment answers both versions. That does not make the token wrong, but it narrows the population that would gain anything from it well below what a change on the API Hub request path needs to justify itself.",
        quote: {
          text: "We plan to run the latest version while remaining backwards compatible to earlier 1 version",
          who: "An LFI · For"
        }
      },
      {
        k: "06",
        title: "The only question asked back was about timing",
        body: "Three voters left a written comment, and the one question put back to Nebras was when the change would land if it were supported. It is answered directly in the Outcome tab: it has not been scheduled, it will not appear in an API Hub release, and there is no timeline to give. The proposal is deferred on evidence of demand rather than on merit, and Nebras will bring it back at the next major version transition — when the LFIs answering these two questions will be answering from operational experience instead of from intention.",
        quote: {
          text: "if the change would be supported, we would like to ask the possible implementation timelines.",
          who: "An LFI · For"
        }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fb" }, _attrs))} data-v-06392971><div class="fb__inner" data-v-06392971><div class="fb__head" data-v-06392971><div class="fb__eyebrow" data-v-06392971><span class="fb__eyebrow-dash" data-v-06392971></span> Feedback · themes from the vote</div><h2 class="fb__title" data-v-06392971>What the ecosystem told us</h2><p class="fb__lede" data-v-06392971> A short synthesis of the votes, comments, and question answers behind the tally above. Support was unanimous but the turnout was the lowest of any proposal so far, and the substance is in the two questions on the form, which four of the six voters answered. The full per-organisation votes are listed in the panel. </p></div><div class="fb__grid" data-v-06392971><!--[-->`);
      ssrRenderList(themes, (t) => {
        _push(`<article class="fb-card" data-v-06392971><div class="fb-card__k" data-v-06392971>${ssrInterpolate(t.k)}</div><h3 class="fb-card__title" data-v-06392971>${ssrInterpolate(t.title)}</h3><p class="fb-card__body" data-v-06392971>${ssrInterpolate(t.body)}</p>`);
        if (t.quote) {
          _push(`<blockquote class="fb-card__quote" data-v-06392971><p class="fb-card__quote-text" data-v-06392971>“${ssrInterpolate(t.quote.text)}”</p><footer class="fb-card__quote-who" data-v-06392971>${ssrInterpolate(t.quote.who)}</footer></blockquote>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-006.feedback.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ofp006_feedback = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-06392971"]]);
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ofp006_feedback
}, Symbol.toStringTag, { value: "Module" }));
const OG_TITLE = "OFP-006 · Carry the requested API version into the Ozone Connect path";
const OG_DESCRIPTION = "An LFI dual-running two versions can only tell them apart by parsing the o3-api-uri header. Let the LFI put a ${VERSION} token in the API family base path it configures at onboarding, and have the API Hub substitute the version the TPP requested at proxy time.";
const substitutionExample = `# Configured base path (environment-specific onboarding)
  /data-sharing/\${VERSION}

# Ozone Connect Base URL
  https://openapi.example.com

TPP requests                                        Forwarded to Ozone Connect
/open-finance/account-information/v2.0/parties  -->  https://openapi.example.com/data-sharing/v2.0/parties
/open-finance/account-information/v2.1/parties  -->  https://openapi.example.com/data-sharing/v2.1/parties

# A path with no token is unchanged — today's behaviour, exactly
  /data-sharing              -->  https://openapi.example.com/data-sharing/parties`;
const todayExample = `# TPP calls the API Hub
GET /open-finance/account-information/v2.1/parties

# API Hub forwards to Ozone Connect, using the STATIC configured base path
GET https://openapi.example.com/data-sharing/parties
  o3-api-uri: /open-finance/account-information/v2.1/parties   <-- the only signal
  o3-api-operation: GET
  o3-provider-id: ...

# The forwarded PATH is identical for v2.0 and v2.1. To route between two
# concurrent versions, the LFI must parse the version out of o3-api-uri.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ofp-006",
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
      id: "OFP-006",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "20 Jul 2026",
      closes: "10 Aug 2026",
      priority: "medium",
      version: "API Hub"
    };
    const pros = [
      "Puts version routing in the URL, where gateways, load balancers, service meshes, and reverse proxies already route — no application code needs to read a header to decide where a request goes.",
      "Removes the duplicated configuration or bespoke in-application routing an LFI needs today to serve two concurrent versions from one configured path.",
      "Directly eases the dual-running obligation in the Major Version Deprecation Policy, which every LFI must meet at each major version transition.",
      "Entirely opt-in and non-breaking — a configured path with no ${VERSION} token behaves exactly as it does today, so no LFI is affected unless it chooses to be.",
      "Configuration-only for the LFI: the token goes in the existing environment-specific onboarding field, with no change to the Ozone Connect contract, headers, schemas, or TPP-facing API.",
      "Per API family and per environment, because the base path already is — an LFI can adopt it for Data Sharing in pre-production alone and leave everything else untouched.",
      "The o3-api-uri header is unchanged and still carries the version, so an LFI can adopt the token, keep routing on the header, or use both during a migration."
    ];
    const cons = [
      "It is a meaningful piece of engineering in the API Hub, on the hot path for every proxied request — it must be specified, built, tested, and supported across every API family and environment, which is why the level of ecosystem demand matters before committing to it.",
      "It creates a second, LFI-selectable way to express the same fact. The version is then available in both the forwarded path and the o3-api-uri header, and an LFI must be clear which one it routes on.",
      "The exact substituted value becomes a contract. Once LFIs route on it, the format of the version segment (e.g. v2.1) cannot change without breaking their routing, so it must be pinned down in the specification.",
      "It shifts a routing decision from the LFI's code into Nebras-managed configuration, so a change to it becomes an onboarding/Service Desk change rather than a deployment the LFI controls end to end.",
      "Adoption is not automatic — an LFI still has to stand up per-version paths on its own infrastructure to get any benefit from the token."
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
    const outcomeMods = /* @__PURE__ */ Object.assign({ "./ofp-006.outcome.vue": __vite_glob_0_0 });
    const feedbackMods = /* @__PURE__ */ Object.assign({ "./ofp-006.feedback.vue": __vite_glob_1_0 });
    const OutcomePartial = ((_a = Object.values(outcomeMods)[0]) == null ? void 0 : _a.default) ?? null;
    const FeedbackPartial = ((_b = Object.values(feedbackMods)[0]) == null ? void 0 : _b.default) ?? null;
    const showTabs = computed(() => isClosed.value && !!OutcomePartial);
    const proposal = computed(() => {
      var _a2;
      return {
        id: meta.id,
        title: "Carry the requested API version into the Ozone Connect path",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-5c808645><section class="ofp-hero" data-v-5c808645><div class="ofp-hero__inner" data-v-5c808645>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-5c808645${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-5c808645><span class="ofp__id" data-v-5c808645>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-5c808645></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-5c808645>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-5c808645>Carry the requested API version into the Ozone Connect path</h1><p class="ofp__summary" data-v-5c808645> An LFI dual-running two versions can only tell them apart by parsing the <code data-v-5c808645>o3-api-uri</code> header, because the base path the API Hub prepends is a static string. Let the LFI place a <code data-v-5c808645>\${VERSION}</code> token in that path and have the API Hub substitute the version the TPP actually requested. </p><div class="ofp__strip" data-v-5c808645><div class="ofp__strip-item" data-v-5c808645><div class="ofp__strip-key" data-v-5c808645>Proposed by</div><div class="ofp__strip-val" data-v-5c808645>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-5c808645><div class="ofp__strip-key" data-v-5c808645>Author</div><div class="ofp__strip-val" data-v-5c808645>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-5c808645><div class="ofp__strip-key" data-v-5c808645>Target</div><div class="ofp__strip-val" data-v-5c808645>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-5c808645><div class="ofp__strip-key" data-v-5c808645>Opened</div><div class="ofp__strip-val" data-v-5c808645>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-5c808645><div class="ofp__strip-key" data-v-5c808645>Closes</div><div class="ofp__strip-val" data-v-5c808645>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-5c808645${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-5c808645${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Because this change carries a real engineering cost, the two questions on the form matter as much as the vote itself. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-5c808645${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-5c808645${_scopeId}><div class="ofp-vote-cover__card" data-v-5c808645${_scopeId}><div class="ofp-vote-cover__label" data-v-5c808645${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-5c808645${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                    }, " Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Because this change carries a real engineering cost, the two questions on the form matter as much as the vote itself. "))
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-5c808645${_scopeId}><span class="ofp-seam-label" data-v-5c808645${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>The forwarded path looks the same whatever version was asked for</h2></div><div class="ofp-prose" data-v-5c808645${_scopeId}><p data-v-5c808645${_scopeId}> When a TPP calls the API Hub, the Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to the LFI&#39;s `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Ozone Connect Base URL`);
                } else {
                  return [
                    createTextVNode("Ozone Connect Base URL")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. Between that base URL and the endpoint, the Hub inserts an optional <strong data-v-5c808645${_scopeId}>API family base path</strong> the LFI configures per environment during `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`environment-specific onboarding`);
                } else {
                  return [
                    createTextVNode("environment-specific onboarding")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` — one field each for Data Sharing, Service Initiation, Products, Consent Events, and Health Check — so an LFI can route different API families to different paths on the same server. </p><p data-v-5c808645${_scopeId}> That configured path is a <strong data-v-5c808645${_scopeId}>static string</strong>. It is prepended verbatim to every request in that family, whatever version the TPP asked for. </p><p data-v-5c808645${_scopeId}> The TPP, meanwhile, carries the version as a segment of the request URL — <code data-v-5c808645${_scopeId}>v2.1</code> in <code data-v-5c808645${_scopeId}>/open-finance/account-information/v2.1/parties</code>. The API Hub knows which version was requested; it is what the Hub routed and schema-validated on. But by the time the request reaches the LFI, the only place that fact survives is the <code data-v-5c808645${_scopeId}>o3-api-uri</code> header, which carries the parameterised URL the TPP called: </p><div class="ofp-code" data-v-5c808645${_scopeId}><div class="ofp-code__label" data-v-5c808645${_scopeId}>Today — the version reaches the LFI only in a header</div><pre class="ofp-code__pre" data-v-5c808645${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><p data-v-5c808645${_scopeId}> So an LFI wanting to serve two concurrent versions from one Ozone Connect deployment has to parse the version out of <code data-v-5c808645${_scopeId}>o3-api-uri</code> and branch on it — a routing decision taken inside the application, on a header, rather than at the edge where routing normally happens. The alternative is to duplicate configuration or stand up bespoke routing in front of the backend. </p><p data-v-5c808645${_scopeId}> This is not a hypothetical requirement. The `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/policy/lfi-deprecation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Major Version Deprecation Policy`);
                } else {
                  return [
                    createTextVNode("Major Version Deprecation Policy")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` requires an LFI going live with a new major version to run the prior and new versions <strong data-v-5c808645${_scopeId}>concurrently</strong> for the whole deprecation window — up to a 17-month transition envelope — routing each TPP request to the correct implementation, and keeping the two independently maintained with no cross-version dependencies. Every LFI will face this at every major version transition. Today the policy itself notes the routing signal is “currently via the <code data-v-5c808645${_scopeId}>o3-api-uri</code> header”, because that is all there is. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>A <code data-v-5c808645${_scopeId}>\${VERSION}</code> token in the configured path</h2></div><div class="ofp-prose" data-v-5c808645${_scopeId}><p data-v-5c808645${_scopeId}><strong data-v-5c808645${_scopeId}>Allow an LFI to include a substitution token — <code data-v-5c808645${_scopeId}>\${VERSION}</code> — in the API family base path it configures for an environment. At proxy time, the API Hub replaces the token with the version the TPP requested, parsed from the request URL path, before forwarding to Ozone Connect.</strong></p><div class="ofp-code" data-v-5c808645${_scopeId}><div class="ofp-code__label" data-v-5c808645${_scopeId}>Proposed — the same configured path serves both versions</div><pre class="ofp-code__pre" data-v-5c808645${_scopeId}>${ssrInterpolate(substitutionExample)}</pre></div><p data-v-5c808645${_scopeId}> The version then appears in the <strong data-v-5c808645${_scopeId}>URL</strong>, which is where gateways, load balancers, service meshes, and reverse proxies already route. An LFI can point <code data-v-5c808645${_scopeId}>/data-sharing/v2.0</code> and <code data-v-5c808645${_scopeId}>/data-sharing/v2.1</code> at two independent deployments using infrastructure it already runs, rather than reading a header in application code to decide where a request goes. </p><p data-v-5c808645${_scopeId}> This is deliberately <strong data-v-5c808645${_scopeId}>opt-in and non-breaking</strong>. The token is something an LFI chooses to put in a field it already fills in. A configured path with no <code data-v-5c808645${_scopeId}>\${VERSION}</code> in it behaves exactly as it does today — byte for byte — so no existing LFI is affected unless it decides to adopt this. Because the base path is already per API family and per environment, adoption is too: an LFI can use the token for Data Sharing in pre-production alone and leave everything else untouched. </p><p data-v-5c808645${_scopeId}> Nothing else changes. The <code data-v-5c808645${_scopeId}>o3-api-uri</code> header still carries the parameterised URL including the version, exactly as it does now. The Ozone Connect contract, the headers, the schemas, and the TPP-facing API are all unchanged. An LFI may adopt the token, keep routing on the header, or run both while it migrates. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 03 · Scope and behaviour</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>What the token means, precisely</h2><p class="ofp-band__lede" data-v-5c808645${_scopeId}> The substituted value becomes something LFIs route on, so it has to be pinned down rather than left to implementation. </p></div><div class="ofp-prose" data-v-5c808645${_scopeId}><div class="ofp-rules" data-v-5c808645${_scopeId}><div class="ofp-rules__label" data-v-5c808645${_scopeId}>Proposed rules</div><ul class="ofp-rules__list" data-v-5c808645${_scopeId}><li data-v-5c808645${_scopeId}> The token is <strong data-v-5c808645${_scopeId}>literal and case-sensitive</strong>: <code data-v-5c808645${_scopeId}>\${VERSION}</code>. Any other text in the configured path is passed through verbatim, as today. </li><li data-v-5c808645${_scopeId}> The substituted value is the version segment <strong data-v-5c808645${_scopeId}>exactly as it appears in the TPP&#39;s request path</strong> — e.g. <code data-v-5c808645${_scopeId}>v2.1</code>, including the leading <code data-v-5c808645${_scopeId}>v</code>. </li><li data-v-5c808645${_scopeId}> The token may appear <strong data-v-5c808645${_scopeId}>at most once</strong> in a configured path, and may sit at any position within it (<code data-v-5c808645${_scopeId}>/data-sharing/\${VERSION}</code> or <code data-v-5c808645${_scopeId}>/\${VERSION}/data-sharing</code>). </li><li data-v-5c808645${_scopeId}> It is available on <strong data-v-5c808645${_scopeId}>every API family</strong> that has a configurable base path, and is configured <strong data-v-5c808645${_scopeId}>independently per environment</strong>, like the path itself. </li><li data-v-5c808645${_scopeId}> A path containing <strong data-v-5c808645${_scopeId}>no token</strong> behaves exactly as it does today. This is the default and remains so. </li><li data-v-5c808645${_scopeId}> If a request has <strong data-v-5c808645${_scopeId}>no version segment</strong> to substitute, the API Hub rejects the configuration at onboarding rather than forwarding a malformed path at runtime — the token is only offered for families whose requests are versioned. </li></ul></div><p data-v-5c808645${_scopeId}> The version used is the one the API Hub itself resolved for the request — the same value it routed and schema-validated on, and the same one it writes into <code data-v-5c808645${_scopeId}>o3-api-uri</code>. The two can therefore never disagree. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 04 · Technical changes</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>What changes</h2><p class="ofp-band__lede" data-v-5c808645${_scopeId}> One change in the API Hub&#39;s proxy path, one in onboarding validation, and documentation. No change to the Ozone Connect contract, the headers, the schemas, or anything TPP-facing. </p></div><div class="ofp-changes" data-v-5c808645${_scopeId}><div class="ofp-change" data-v-5c808645${_scopeId}><div class="ofp-change__label" data-v-5c808645${_scopeId}>01 · Substitution at proxy time</div><p data-v-5c808645${_scopeId}> When constructing the forwarded URL, the API Hub substitutes <code data-v-5c808645${_scopeId}>\${VERSION}</code> in the configured API family base path with the resolved request version before appending the endpoint. Where no token is present the path is used verbatim, as today. This sits on the request path for every proxied call, so it must be a cheap, allocation-light string substitution. </p></div><div class="ofp-change" data-v-5c808645${_scopeId}><div class="ofp-change__label" data-v-5c808645${_scopeId}>02 · Onboarding validation</div><p data-v-5c808645${_scopeId}> Accept <code data-v-5c808645${_scopeId}>\${VERSION}</code> in the environment-specific base path fields, validating that it appears at most once, that the surrounding path is otherwise valid, and that the API family is one whose requests carry a version. A configuration that could not resolve at runtime is rejected at onboarding, not at proxy time. </p></div><div class="ofp-change" data-v-5c808645${_scopeId}><div class="ofp-change__label" data-v-5c808645${_scopeId}>03 · Documentation</div><p data-v-5c808645${_scopeId}> Document the token on the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Environment-Specific Configuration`);
                } else {
                  return [
                    createTextVNode("Environment-Specific Configuration")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` page alongside the existing optional API family base paths, with the worked example above. Update the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/policy/lfi-deprecation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Major Version Deprecation Policy`);
                } else {
                  return [
                    createTextVNode("Major Version Deprecation Policy")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` so that dual-running names both routing options — the <code data-v-5c808645${_scopeId}>o3-api-uri</code> header and, where the LFI has configured it, the version in the forwarded path. </p></div></div></div></section><section class="ofp-band ofp-band--cream" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 05 · What this costs to build</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>This only goes ahead if the ecosystem would genuinely use it</h2></div><div class="ofp-prose" data-v-5c808645${_scopeId}><p data-v-5c808645${_scopeId}> The proposal reads as a small idea — a token in a configuration field — and the change to any individual LFI is small. The change to the <strong data-v-5c808645${_scopeId}>API Hub is not</strong>. It touches request routing, which is on the hot path for every single proxied call in the ecosystem, and it makes a value that is currently fixed at configuration time into one resolved per request. That has to be specified, built, and then tested and supported across every API family, every environment, and every LFI configuration — including the overwhelming majority who will not use it and whose behaviour must be provably unchanged. </p><p data-v-5c808645${_scopeId}><strong data-v-5c808645${_scopeId}>This is a meaningful piece of engineering work, and Nebras would only commit to it if a significant part of the ecosystem would actually make use of it.</strong> A change of this size on the critical path is not worth making for one or two adopters, and it is not worth making at all if LFIs would continue to route on the <code data-v-5c808645${_scopeId}>o3-api-uri</code> header regardless because that is what they have already built. </p><p data-v-5c808645${_scopeId}> That is what this proposal is asking. A vote in favour is a statement that your institution would <em data-v-5c808645${_scopeId}>use</em> this, not merely that it seems like a good idea. The two questions on the vote form — whether you would route on the path instead of the header, and how you dual-run today — carry as much weight in the decision as the tally itself. If the answers show the ecosystem would keep using the header, that is a perfectly good outcome and the work will not be scheduled. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 06 · Pros</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>What the token buys</h2></div><ul class="ofp-pros" data-v-5c808645${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-5c808645${_scopeId}><span class="ofp-pros__glyph" data-v-5c808645${_scopeId}>✓</span><span data-v-5c808645${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-5c808645${_scopeId}><div class="ofp-band__inner" data-v-5c808645${_scopeId}><div class="ofp-band__head" data-v-5c808645${_scopeId}><div class="ofp-band__eyebrow" data-v-5c808645${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-5c808645${_scopeId}></span> 07 · Cons</div><h2 class="ofp-band__title" data-v-5c808645${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-5c808645${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-5c808645${_scopeId}><span class="ofp-cons__glyph" data-v-5c808645${_scopeId}>×</span><span data-v-5c808645${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "The forwarded path looks the same whatever version was asked for")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" When a TPP calls the API Hub, the Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to the LFI's "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, {
                        default: withCtx(() => [
                          createTextVNode("Ozone Connect Base URL")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". Between that base URL and the endpoint, the Hub inserts an optional "),
                      createVNode("strong", null, "API family base path"),
                      createTextVNode(" the LFI configures per environment during "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
                        default: withCtx(() => [
                          createTextVNode("environment-specific onboarding")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" — one field each for Data Sharing, Service Initiation, Products, Consent Events, and Health Check — so an LFI can route different API families to different paths on the same server. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" That configured path is a "),
                      createVNode("strong", null, "static string"),
                      createTextVNode(". It is prepended verbatim to every request in that family, whatever version the TPP asked for. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The TPP, meanwhile, carries the version as a segment of the request URL — "),
                      createVNode("code", null, "v2.1"),
                      createTextVNode(" in "),
                      createVNode("code", null, "/open-finance/account-information/v2.1/parties"),
                      createTextVNode(". The API Hub knows which version was requested; it is what the Hub routed and schema-validated on. But by the time the request reaches the LFI, the only place that fact survives is the "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" header, which carries the parameterised URL the TPP called: ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — the version reaches the LFI only in a header"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" So an LFI wanting to serve two concurrent versions from one Ozone Connect deployment has to parse the version out of "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" and branch on it — a routing decision taken inside the application, on a header, rather than at the edge where routing normally happens. The alternative is to duplicate configuration or stand up bespoke routing in front of the backend. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This is not a hypothetical requirement. The "),
                      createVNode(_component_RouterLink, { to: "/policy/lfi-deprecation" }, {
                        default: withCtx(() => [
                          createTextVNode("Major Version Deprecation Policy")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" requires an LFI going live with a new major version to run the prior and new versions "),
                      createVNode("strong", null, "concurrently"),
                      createTextVNode(" for the whole deprecation window — up to a 17-month transition envelope — routing each TPP request to the correct implementation, and keeping the two independently maintained with no cross-version dependencies. Every LFI will face this at every major version transition. Today the policy itself notes the routing signal is “currently via the "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" header”, because that is all there is. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, [
                      createTextVNode("A "),
                      createVNode("code", null, "${VERSION}"),
                      createTextVNode(" token in the configured path")
                    ])
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("Allow an LFI to include a substitution token — "),
                        createVNode("code", null, "${VERSION}"),
                        createTextVNode(" — in the API family base path it configures for an environment. At proxy time, the API Hub replaces the token with the version the TPP requested, parsed from the request URL path, before forwarding to Ozone Connect.")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — the same configured path serves both versions"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(substitutionExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The version then appears in the "),
                      createVNode("strong", null, "URL"),
                      createTextVNode(", which is where gateways, load balancers, service meshes, and reverse proxies already route. An LFI can point "),
                      createVNode("code", null, "/data-sharing/v2.0"),
                      createTextVNode(" and "),
                      createVNode("code", null, "/data-sharing/v2.1"),
                      createTextVNode(" at two independent deployments using infrastructure it already runs, rather than reading a header in application code to decide where a request goes. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This is deliberately "),
                      createVNode("strong", null, "opt-in and non-breaking"),
                      createTextVNode(". The token is something an LFI chooses to put in a field it already fills in. A configured path with no "),
                      createVNode("code", null, "${VERSION}"),
                      createTextVNode(" in it behaves exactly as it does today — byte for byte — so no existing LFI is affected unless it decides to adopt this. Because the base path is already per API family and per environment, adoption is too: an LFI can use the token for Data Sharing in pre-production alone and leave everything else untouched. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Nothing else changes. The "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" header still carries the parameterised URL including the version, exactly as it does now. The Ozone Connect contract, the headers, the schemas, and the TPP-facing API are all unchanged. An LFI may adopt the token, keep routing on the header, or run both while it migrates. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the token means, precisely"),
                    createVNode("p", { class: "ofp-band__lede" }, " The substituted value becomes something LFIs route on, so it has to be pinned down rather than left to implementation. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Proposed rules"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createTextVNode(" The token is "),
                          createVNode("strong", null, "literal and case-sensitive"),
                          createTextVNode(": "),
                          createVNode("code", null, "${VERSION}"),
                          createTextVNode(". Any other text in the configured path is passed through verbatim, as today. ")
                        ]),
                        createVNode("li", null, [
                          createTextVNode(" The substituted value is the version segment "),
                          createVNode("strong", null, "exactly as it appears in the TPP's request path"),
                          createTextVNode(" — e.g. "),
                          createVNode("code", null, "v2.1"),
                          createTextVNode(", including the leading "),
                          createVNode("code", null, "v"),
                          createTextVNode(". ")
                        ]),
                        createVNode("li", null, [
                          createTextVNode(" The token may appear "),
                          createVNode("strong", null, "at most once"),
                          createTextVNode(" in a configured path, and may sit at any position within it ("),
                          createVNode("code", null, "/data-sharing/${VERSION}"),
                          createTextVNode(" or "),
                          createVNode("code", null, "/${VERSION}/data-sharing"),
                          createTextVNode("). ")
                        ]),
                        createVNode("li", null, [
                          createTextVNode(" It is available on "),
                          createVNode("strong", null, "every API family"),
                          createTextVNode(" that has a configurable base path, and is configured "),
                          createVNode("strong", null, "independently per environment"),
                          createTextVNode(", like the path itself. ")
                        ]),
                        createVNode("li", null, [
                          createTextVNode(" A path containing "),
                          createVNode("strong", null, "no token"),
                          createTextVNode(" behaves exactly as it does today. This is the default and remains so. ")
                        ]),
                        createVNode("li", null, [
                          createTextVNode(" If a request has "),
                          createVNode("strong", null, "no version segment"),
                          createTextVNode(" to substitute, the API Hub rejects the configuration at onboarding rather than forwarding a malformed path at runtime — the token is only offered for families whose requests are versioned. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The version used is the one the API Hub itself resolved for the request — the same value it routed and schema-validated on, and the same one it writes into "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(". The two can therefore never disagree. ")
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
                    createVNode("p", { class: "ofp-band__lede" }, " One change in the API Hub's proxy path, one in onboarding validation, and documentation. No change to the Ozone Connect contract, the headers, the schemas, or anything TPP-facing. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Substitution at proxy time"),
                      createVNode("p", null, [
                        createTextVNode(" When constructing the forwarded URL, the API Hub substitutes "),
                        createVNode("code", null, "${VERSION}"),
                        createTextVNode(" in the configured API family base path with the resolved request version before appending the endpoint. Where no token is present the path is used verbatim, as today. This sits on the request path for every proxied call, so it must be a cheap, allocation-light string substitution. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Onboarding validation"),
                      createVNode("p", null, [
                        createTextVNode(" Accept "),
                        createVNode("code", null, "${VERSION}"),
                        createTextVNode(" in the environment-specific base path fields, validating that it appears at most once, that the surrounding path is otherwise valid, and that the API family is one whose requests carry a version. A configuration that could not resolve at runtime is rejected at onboarding, not at proxy time. ")
                      ])
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Documentation"),
                      createVNode("p", null, [
                        createTextVNode(" Document the token on the "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
                          default: withCtx(() => [
                            createTextVNode("Environment-Specific Configuration")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" page alongside the existing optional API family base paths, with the worked example above. Update the "),
                        createVNode(_component_RouterLink, { to: "/policy/lfi-deprecation" }, {
                          default: withCtx(() => [
                            createTextVNode("Major Version Deprecation Policy")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" so that dual-running names both routing options — the "),
                        createVNode("code", null, "o3-api-uri"),
                        createTextVNode(" header and, where the LFI has configured it, the version in the forwarded path. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "This only goes ahead if the ecosystem would genuinely use it")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" The proposal reads as a small idea — a token in a configuration field — and the change to any individual LFI is small. The change to the "),
                      createVNode("strong", null, "API Hub is not"),
                      createTextVNode(". It touches request routing, which is on the hot path for every single proxied call in the ecosystem, and it makes a value that is currently fixed at configuration time into one resolved per request. That has to be specified, built, and then tested and supported across every API family, every environment, and every LFI configuration — including the overwhelming majority who will not use it and whose behaviour must be provably unchanged. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "This is a meaningful piece of engineering work, and Nebras would only commit to it if a significant part of the ecosystem would actually make use of it."),
                      createTextVNode(" A change of this size on the critical path is not worth making for one or two adopters, and it is not worth making at all if LFIs would continue to route on the "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" header regardless because that is what they have already built. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" That is what this proposal is asking. A vote in favour is a statement that your institution would "),
                      createVNode("em", null, "use"),
                      createTextVNode(" this, not merely that it seems like a good idea. The two questions on the vote form — whether you would route on the path instead of the header, and how you dual-run today — carry as much weight in the decision as the tally itself. If the answers show the ecosystem would keep using the header, that is a perfectly good outcome and the work will not be scheduled. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "What the token buys")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-006.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ofp006 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c808645"]]);
export {
  ofp006 as default
};
