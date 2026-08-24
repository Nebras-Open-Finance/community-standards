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
  __name: "outcome",
  __ssrInlineRender: true,
  setup(__props) {
    const { voterTotal } = useProposals();
    const record = {
      id: "OFP-007",
      ref: "DR-2026-007",
      verdict: "approved",
      title: "Show an LFI its own API Hub configuration in the Admin Portal",
      category: "Admin Portal · Transparency",
      decisionDate: "3 Aug 2026",
      // A label (or date) for when the decision takes effect; '' to omit the pill.
      effective: "a future API Hub release",
      summary: "Approved as proposed, and unanimously — 13 votes in favour, none against, none abstaining. A read-only Configuration section will be added to the Admin Portal, showing the effective connectivity and application layer authentication configuration the API Hub actually holds for that hub and environment, including the worked forwarded URL for each API family. Today that state exists only as a chain of Service Desk tickets an LFI has to find, order, and replay — where missing one gives a wrong answer that looks exactly like a right one. The proposal now passes to engineering for implementation."
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
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "po",
        style: { "--seal": seal.value, "--seal-tint": sealTint.value }
      }, _attrs))} data-v-21000fa1><div class="po__inner" data-v-21000fa1><div class="po-sheet" data-v-21000fa1><div class="po-sheet__head" data-v-21000fa1><div class="po-eyebrow" data-v-21000fa1><span class="po-eyebrow__k" data-v-21000fa1>Decision record · ${ssrInterpolate(record.ref)}</span><span class="po-eyebrow__dot" data-v-21000fa1></span><span class="po-eyebrow__k" data-v-21000fa1>${ssrInterpolate(record.category)}</span><span class="po-eyebrow__dot" data-v-21000fa1></span><span class="po-eyebrow__k" data-v-21000fa1>Voting closed ${ssrInterpolate(record.decisionDate)}</span></div><div class="po-verdict" data-v-21000fa1><div class="${ssrRenderClass([{ "po-seal--approved": approved.value }, "po-seal"])}" data-v-21000fa1><span class="po-seal__glyph" data-v-21000fa1>${ssrInterpolate(approved.value ? "✓" : "✕")}</span></div><div class="po-verdict__text" data-v-21000fa1><div class="po-verdict__label" data-v-21000fa1>${ssrInterpolate(approved.value ? "Approved" : "Rejected")} `);
      if (approved.value) {
        _push(`<span class="po-verdict__chip" data-v-21000fa1>Ratified</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="po-verdict__sub" data-v-21000fa1>${ssrInterpolate(pct.value)}% in favour · ${ssrInterpolate(counts.value.for)}–${ssrInterpolate(counts.value.against)}–${ssrInterpolate(counts.value.abstain)}</div></div></div><div class="po-sheet__title" data-v-21000fa1><span class="po-pid" data-v-21000fa1>${ssrInterpolate(record.id)}</span><h2 data-v-21000fa1>${ssrInterpolate(record.title)}</h2></div></div><div class="po-metrics" data-v-21000fa1><div class="po-metrics__cell po-metrics__cell--hl" data-v-21000fa1><div class="po-metrics__bar" data-v-21000fa1></div><div class="po-badge" data-v-21000fa1><span class="po-badge__g" data-v-21000fa1>${ssrInterpolate(approved.value ? "✓" : "✕")}</span><span class="po-badge__w" data-v-21000fa1>${ssrInterpolate(approved.value ? "Approved" : "Rejected")}</span></div><div class="po-metrics__cap" data-v-21000fa1>Final decision</div></div><div class="po-metrics__cell" data-v-21000fa1><div class="po-metrics__bar" data-v-21000fa1></div><div class="po-metrics__num" data-v-21000fa1>${ssrInterpolate(pct.value)}%</div><div class="po-metrics__cap" data-v-21000fa1>In favour</div></div><div class="po-metrics__cell" data-v-21000fa1><div class="po-metrics__bar" data-v-21000fa1></div><div class="po-metrics__num" data-v-21000fa1>${ssrInterpolate(counts.value.total)}<span class="po-metrics__denom" data-v-21000fa1>/${ssrInterpolate(unref(voterTotal))}</span></div><div class="po-metrics__cap" data-v-21000fa1>Total votes</div></div><div class="po-metrics__cell" data-v-21000fa1><div class="po-metrics__bar" data-v-21000fa1></div><div class="po-metrics__num" data-v-21000fa1>${ssrInterpolate(turnout.value)}%</div><div class="po-metrics__cap" data-v-21000fa1>Participation</div></div></div></div><div class="po-body" data-v-21000fa1><div data-v-21000fa1><div class="po-seclabel" data-v-21000fa1>§ Decision summary</div><p class="po-summary" data-v-21000fa1>${ssrInterpolate(record.summary)}</p><div class="po-detail" data-v-21000fa1><p data-v-21000fa1> The approved change adds a <strong data-v-21000fa1>Configuration section to the Admin Portal</strong>, scoped — as the portal already is — to <strong data-v-21000fa1>one API Hub and one environment</strong>. It is generated from the <strong data-v-21000fa1>live configuration the API Hub enforces</strong> at proxy time, not from a stored copy of the onboarding submission, so it cannot drift from the running configuration. A multi-brand LFI opens each brand&#39;s portal and sees that brand&#39;s values, which is precisely the distinction that is hardest to hold onto across ticket threads. </p><p data-v-21000fa1><strong data-v-21000fa1>No editing capability is introduced.</strong> Every value on the page is read-only. Configuration continues to be submitted and changed exactly as it is today, through the Service Desk, with Nebras&#39;s end-to-end connectivity validation unchanged. The vote showed clear appetite for editing some of these fields directly, and that will be taken forward as a <strong data-v-21000fa1>separate proposal</strong> with the roles, approval, and validation model worked through properly — it is not part of this decision. </p><p data-v-21000fa1> Nothing on the request path changes. The Ozone Connect contract, the headers, the schemas, the TPP-facing API, and the onboarding process are all untouched, and neither LFIs nor TPPs have anything to implement. Certificates remain out of scope: the Trust Framework is their system of record, and a second view of them would raise the question of which is authoritative. </p></div><div class="po-note" data-v-21000fa1><div class="po-note__k" data-v-21000fa1>What happens next</div><p class="po-note__p" data-v-21000fa1> The proposal is now <strong data-v-21000fa1>handed over to engineering for implementation</strong>. Delivery timings, and the detail of how the change is incorporated, will be communicated through the relevant <strong data-v-21000fa1>API Hub release notes</strong> — this page will not be updated with a schedule. No action is required from LFIs or TPPs in the meantime. </p></div><div class="po-spec" data-v-21000fa1><h3 class="po-h" data-v-21000fa1> The change `);
      {
        _push(`<span class="po-next__eff" data-v-21000fa1>This change will be made in ${ssrInterpolate(record.effective)}</span>`);
      }
      _push(`</h3><p class="po-spec__lede" data-v-21000fa1> No new fields, endpoints, or schemas — a read model over configuration the API Hub already holds, rendered in a portal an LFI already signs in to, behind Trust Framework SSO it already uses. Field names follow the `);
      _push(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`onboarding documentation`);
          } else {
            return [
              createTextVNode("onboarding documentation")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` so the two read as one thing. </p><div class="po-rules" data-v-21000fa1><div class="po-rules__label" data-v-21000fa1>Shown in the Admin Portal · read-only, per hub and per environment</div><ul class="po-rules__list" data-v-21000fa1><li data-v-21000fa1><strong data-v-21000fa1>Ozone Connect Base URL</strong> — the base URL the API Hub forwards to for this environment. </li><li data-v-21000fa1><strong data-v-21000fa1>Authorization Endpoint</strong> — the OIDC authorisation URL the customer is redirected to, or an explicit indication that the LFI has adopted <strong data-v-21000fa1>CAAP</strong> and therefore provides none. </li><li data-v-21000fa1><strong data-v-21000fa1>Application layer authentication method</strong> — mTLS only, API Key, Client Credentials Grant, or JWT Auth, with its configured sub-settings. </li><li data-v-21000fa1><strong data-v-21000fa1>API family base paths</strong> — one row per family, showing the configured path <em data-v-21000fa1>or</em> an explicit “not set”, and beside it the <strong data-v-21000fa1>effective forwarded URL</strong> worked through against the base URL. </li><li data-v-21000fa1><strong data-v-21000fa1>Instance identifiers and allocated values</strong> — LFI Code, LFI Organisation ID, the Ozone-allocated domains for the environment, and the API Hub egress IP addresses to allowlist. </li></ul></div><div class="po-rules po-rules--muted" data-v-21000fa1><div class="po-rules__label" data-v-21000fa1>Raised in the vote · carried forward separately</div><ul class="po-rules__list" data-v-21000fa1><li data-v-21000fa1><strong data-v-21000fa1>Restrict the section by role before release.</strong> Portal access is not role-differentiated today, so an LFI asked that backend URLs, internal paths, and egress IPs be limited to the technical roles. Carried into implementation as a requirement. </li><li data-v-21000fa1><strong data-v-21000fa1>Editing these values in the portal.</strong> Four of the five voters who answered the question wanted it, naming API family base paths, endpoint URLs, and the LFI redirect URL (C3) — every one of them conditioned on maker-checker or four-eyes approval, a restricted role, audit logging, and controlled promotion to production. To be brought forward as its own proposal. </li><li data-v-21000fa1><strong data-v-21000fa1>Log search by Interaction ID</strong>, with keyword search within a single request journey. Not configuration; recorded and taken up on its own merits. </li><li data-v-21000fa1><strong data-v-21000fa1>Replace the mock-bank placeholder</strong> with the LFI&#39;s own base URL wherever it appears. A documentation and portal-copy fix, handled outside this proposal. </li></ul></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-007/outcome.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const outcome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-21000fa1"]]);
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
        title: "Unanimous, with no dissent",
        body: "Every vote was in favour — 13 for, none against, none abstaining — across a broad cross-section of LFIs. No amendment was requested, and no voter argued that the information should stay where it is. The read-only scope was accepted as drawn; the disagreement, such as it was, is about what should come next rather than about this."
      },
      {
        k: "02",
        title: "Today the answer is reconstructed, not looked up",
        body: "The first question asked how an LFI finds out what its configuration is actually set to. The answers converge: keep a local record, search back through the onboarding and change tickets, and raise a ticket with Nebras when no confident answer can be found. Frequency ranged up to one or two checks a week, triggered by a forwarded request failing, a pre-production/production comparison, or onboarding a new engineer. One LFI named the failure mode precisely — a local record says what was intended, not what the Hub is enforcing.",
        quote: {
          text: "Our record and the Hub’s record are two separate things. Our infrastructure code tells us what we intended to configure; it does not tell us what the Hub is actually enforcing. Where those have diverged, we have no way to detect it.",
          who: "An LFI · For"
        }
      },
      {
        k: "03",
        title: "The resolved forwarded URL is the part that earns its keep",
        body: "Two voters singled out the worked forwarded URL per API family, rather than the raw base paths, as the thing that changes their day. Showing the URL the Hub will actually call turns a 404 on a proxied request from a Service Desk ticket into something the LFI can diagnose from the screen in front of it. The same voter set the scaling problem out plainly: moving from one API Hub to two for SME takes them from one configuration to four across brands and environments, each distinguishable today only by reading ticket history in the right order.",
        quote: {
          text: "Reconstructing those from ticket history is exactly the failure mode described, and the per-brand portal scoping solves it without anything for us to build. The resolved forwarded URL per API family would also materially shorten incident diagnosis.",
          who: "An LFI · For"
        }
      },
      {
        k: "04",
        title: "Read-only is enough for now — but editing has real appetite",
        body: "The second question asked whether LFIs would want to change these values themselves. Four of the five who answered said yes, and they named fields: the API family base paths and endpoint URLs, the LFI redirect URL (C3), and in one case every field on the page. Every one of them attached change control to the request — maker-checker or four-eyes approval, a restricted role modelled on PBC/PTC access in the Trust Framework, audit logging, and controlled promotion to production. None of them argued it should be folded into this proposal; the split the proposal drew was accepted, and editing will be brought forward separately.",
        quote: {
          text: "Read-only is good enough for this proposal … That said, edit capability would also be valuable, but it should be treated as a separate enhancement … provided appropriate governance and change controls are in place (for example, role-based access, maker-checker approval, audit logging, and controlled deployment to production).",
          who: "An LFI · For"
        }
      },
      {
        k: "05",
        title: "Restrict the page by role before it ships",
        body: "The one condition attached to a “for” vote goes to the cost the proposal itself flagged: portal access is not role-differentiated today, so backend base URLs, internal paths, and egress IP addresses would become visible to every user the Trust Framework grants portal access. The request is that the section be limited to the technical roles before it is released — a requirement carried into implementation rather than a reason to hold the decision.",
        quote: {
          text: "Portal access is not currently role-differentiated, so this section would expose backend URLs and internal paths to every user granted portal access. We would ask that it be restricted to the technical roles before it ships.",
          who: "An LFI · For"
        }
      },
      {
        k: "06",
        title: "Two adjacent asks, recorded but out of scope",
        body: "The third question — what else an LFI would want to see that it cannot see today — produced two requests that are not configuration and so fall outside this proposal. One is log search in the Admin Portal filtered first by Interaction ID, with a second-level keyword search within a single request journey. The other is replacing the mock-bank placeholder with the LFI's own base URL wherever it appears, which is a documentation and portal-copy fix rather than a new view. Both are recorded and will be taken up on their own merits."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fb" }, _attrs))} data-v-ffd6a374><div class="fb__inner" data-v-ffd6a374><div class="fb__head" data-v-ffd6a374><div class="fb__eyebrow" data-v-ffd6a374><span class="fb__eyebrow-dash" data-v-ffd6a374></span> Feedback · themes from the vote</div><h2 class="fb__title" data-v-ffd6a374>What the ecosystem told us</h2><p class="fb__lede" data-v-ffd6a374> A short synthesis of the votes, comments, and question answers behind the tally above. Support was unanimous; the substance is in the three questions on the form, which five voters answered. The full per-organisation votes are listed in the panel. </p></div><div class="fb__grid" data-v-ffd6a374><!--[-->`);
      ssrRenderList(themes, (t) => {
        _push(`<article class="fb-card" data-v-ffd6a374><div class="fb-card__k" data-v-ffd6a374>${ssrInterpolate(t.k)}</div><h3 class="fb-card__title" data-v-ffd6a374>${ssrInterpolate(t.title)}</h3><p class="fb-card__body" data-v-ffd6a374>${ssrInterpolate(t.body)}</p>`);
        if (t.quote) {
          _push(`<blockquote class="fb-card__quote" data-v-ffd6a374><p class="fb-card__quote-text" data-v-ffd6a374>“${ssrInterpolate(t.quote.text)}”</p><footer class="fb-card__quote-who" data-v-ffd6a374>${ssrInterpolate(t.quote.who)}</footer></blockquote>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-007/feedback.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ffd6a374"]]);
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: feedback
}, Symbol.toStringTag, { value: "Module" }));
const OG_TITLE = "OFP-007 · Show an LFI its own API Hub configuration in the Admin Portal";
const OG_DESCRIPTION = "An LFI's Ozone Connect Base URL, Authorization Endpoint, application layer authentication method, and API family base paths live across an onboarding ticket and every later ticket that changed one of them. Show the effective configuration, read-only, in the Admin Portal.";
const proposedView = `Admin Portal  ·  Configuration          admin.examplebank.preprod.apihub.openfinance.ae

CONNECTIVITY
  Ozone Connect Base URL        https://openapi-uat.example.com
  Authorization Endpoint        https://auth.example.com/openfinance/authorize

APPLICATION LAYER AUTHENTICATION
  Method                        JWT Auth  (PS256, keys via Trust Framework JWKS)
  JWT Auth on LFI -> Hub calls  Enabled   (Consent Manager, Headless Heimdall)

API FAMILY BASE PATHS                                   Effective forwarded URL
  Data Sharing        /openfinance/data-sharing         https://openapi-uat.example.com/openfinance/data-sharing/accounts
  Service Initiation  /openfinance/service-initiation   https://openapi-uat.example.com/openfinance/service-initiation/domestic-payments
  Products            (not set)                         https://openapi-uat.example.com/products
  Consent Events      (not set)                         https://openapi-uat.example.com/event-notifications
  Health Check        /openfinance/health               https://openapi-uat.example.com/openfinance/health/echo-cert

INSTANCE
  LFI Code                      examplebank
  LFI Organisation ID           b41f9c2e-...
  API Hub egress IPs            203.0.113.10, 203.0.113.11   (allowlist these)`;
const todayExample = `Q: "What is our Data Sharing base path in pre-production?"

  OF-1042   Environment-specific onboarding, pre-prod     = /openfinance/data
  OF-1361   Add a base path for Products                  untouched?
  OF-1590   Move the Authorization Endpoint               untouched?
  OF-1847   Correct the Data Sharing base path            = /openfinance/data-sharing
  OF-2033   Switch application layer auth to JWT Auth     untouched?

The answer is whatever the LAST ticket to touch that field said — so you have to
find them all, order them, and be sure none was missed. Miss one and the wrong
answer looks exactly like the right one.

Then repeat for production. Then repeat for every other brand.`;
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
      id: "OFP-007",
      proposedBy: "Nebras",
      author: "Thomas Catchpole",
      // Fallbacks shown until the API responds (and during the static build). The
      // live status/priority/dates are sourced from the API — see syncFromApi().
      opened: "20 Jul 2026",
      closes: "3 Aug 2026",
      priority: "medium",
      version: "API Hub"
    };
    const pros = [
      "Gives an LFI one current answer for its own connectivity configuration, held by the party that actually enforces it, instead of a state that has to be reconstructed by replaying every ticket that ever touched it.",
      "Removes a class of Service Desk ticket entirely — the ones that ask what a value is set to rather than asking to change it.",
      "Closes the gap that opens after every change ticket, where the newest value is known to whoever raised it and to nobody else.",
      'Makes forwarded-URL problems self-diagnosable. Seeing the resolved Ozone Connect URL per API family turns "why is the Hub calling a path that does not exist?" into something the LFI can answer in seconds.',
      "Makes pre-production and production drift visible, because each environment's portal shows its own values side by side with the same field names.",
      "Access control comes free too: Trust Framework SSO already gates the portal, so no new identity, credential, or permission model is introduced.",
      "It is a read model over configuration the API Hub already holds — no change to the Ozone Connect contract, the headers, the schemas, the onboarding process, or anything TPP-facing.",
      "Shortens onboarding handover. A new engineer joining an LFI's Open Finance team can read the live configuration instead of being walked through it."
    ];
    const cons = [
      "It is still a build — a read model over the Hub's live configuration, an API, a portal page, and documentation — for information an LFI could in principle keep its own copy of.",
      "It widens the audience for operational detail. Backend base URLs, internal paths, and egress IP addresses move from an onboarding ticket to a screen visible to everyone the Trust Framework grants portal access, so the access model has to be right before this ships.",
      "Read-only is the smaller half of the problem. It tells an LFI what is configured without letting it change anything, so a value that is wrong still costs a Service Desk ticket and a wait."
    ];
    const { myVotes, setVote, submitVote, hydrate, loadOne, loadMe, metaById } = useProposals();
    const apiMeta = computed(() => metaById.value[meta.id]);
    const closesIn = ref("");
    const status = ref("closed");
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
        title: "Show an LFI its own API Hub configuration in the Admin Portal",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ofp" }, _attrs))} data-v-e23f1972><section class="ofp-hero" data-v-e23f1972><div class="ofp-hero__inner" data-v-e23f1972>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/proposals/",
        class: "ofp__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ofp__back-arrow" data-v-e23f1972${_scopeId}>←</span> All proposals `);
          } else {
            return [
              createVNode("span", { class: "ofp__back-arrow" }, "←"),
              createTextVNode(" All proposals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ofp__meta-row" data-v-e23f1972><span class="ofp__id" data-v-e23f1972>${ssrInterpolate(meta.id)}</span><span class="ofp__divider" data-v-e23f1972></span>`);
      _push(ssrRenderComponent(PvStatusPill, { status: status.value }, null, _parent));
      _push(`<span class="ofp__tag ofp__tag--priority" data-v-e23f1972>${ssrInterpolate(priorityLabel.value)}</span></div><h1 class="ofp__title" data-v-e23f1972>Show an LFI its own API Hub configuration in the Admin Portal</h1><p class="ofp__summary" data-v-e23f1972> An LFI&#39;s Ozone Connect Base URL, Authorization Endpoint, application layer authentication method, and API family base paths are spread across an onboarding ticket and every later ticket that changed one of them. Nothing holds the current answer in one place. Surface the effective configuration, read-only, in the Admin Portal. </p><div class="ofp__strip" data-v-e23f1972><div class="ofp__strip-item" data-v-e23f1972><div class="ofp__strip-key" data-v-e23f1972>Proposed by</div><div class="ofp__strip-val" data-v-e23f1972>${ssrInterpolate(meta.proposedBy)}</div></div><div class="ofp__strip-item" data-v-e23f1972><div class="ofp__strip-key" data-v-e23f1972>Author</div><div class="ofp__strip-val" data-v-e23f1972>${ssrInterpolate(meta.author)}</div></div><div class="ofp__strip-item" data-v-e23f1972><div class="ofp__strip-key" data-v-e23f1972>Target</div><div class="ofp__strip-val" data-v-e23f1972>${ssrInterpolate(versionDisplay.value)}</div></div><div class="ofp__strip-item" data-v-e23f1972><div class="ofp__strip-key" data-v-e23f1972>Opened</div><div class="ofp__strip-val" data-v-e23f1972>${ssrInterpolate(openedDisplay.value)}</div></div><div class="ofp__strip-item" data-v-e23f1972><div class="ofp__strip-key" data-v-e23f1972>Closes</div><div class="ofp__strip-val" data-v-e23f1972>${ssrInterpolate(closesDisplay.value)}</div></div></div></div></section>`);
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
            _push2(`<section class="ofp-band ofp-band--white ofp-vote-wrap" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> Decision</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>${ssrInterpolate(isClosed.value ? "Voting is now closed" : "Cast your vote")}</h2>`);
            if (isClosed.value) {
              _push2(`<p class="ofp-band__lede" data-v-e23f1972${_scopeId}> The voting period has ended. The votes cast are shown below. </p>`);
            } else {
              _push2(`<p class="ofp-band__lede" data-v-e23f1972${_scopeId}> Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. The second question on the form — whether you would want to <em data-v-e23f1972${_scopeId}>edit</em> any of this configuration yourself — shapes a separate proposal, so please answer it even if you vote against this one. </p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PvVotePanel, {
              proposal: proposal.value,
              "my-vote": myVote.value,
              onVote,
              onSubmit
            }, null, _parent2, _scopeId));
            if (submitError.value && status.value === "open") {
              _push2(`<p class="ofp-vote-error" role="alert" data-v-e23f1972${_scopeId}>${ssrInterpolate(submitError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (status.value === "draft") {
              _push2(`<div class="ofp-vote-cover" aria-hidden="false" data-v-e23f1972${_scopeId}><div class="ofp-vote-cover__card" data-v-e23f1972${_scopeId}><div class="ofp-vote-cover__label" data-v-e23f1972${_scopeId}>Voting not yet open</div><div class="ofp-vote-cover__msg" data-v-e23f1972${_scopeId}>Voting opens ${ssrInterpolate(openedDisplay.value)}</div></div></div>`);
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
                      createTextVNode(" Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. The second question on the form — whether you would want to "),
                      createVNode("em", null, "edit"),
                      createTextVNode(" any of this configuration yourself — shapes a separate proposal, so please answer it even if you vote against this one. ")
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
            _push2(`<section class="ofp-band ofp-band--cream ofp-band--seam" data-v-e23f1972${_scopeId}><span class="ofp-seam-label" data-v-e23f1972${_scopeId}>The proposal</span><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 01 · Background</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>Knowable in principle, scattered across tickets in practice</h2></div><div class="ofp-prose" data-v-e23f1972${_scopeId}><p data-v-e23f1972${_scopeId}> During `);
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
            _push2(`, an LFI hands Nebras the details that define how the API Hub reaches its backend: the `);
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
            _push2(`, the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Authorization Endpoint`);
                } else {
                  return [
                    createTextVNode("Authorization Endpoint")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`, and an optional <strong data-v-e23f1972${_scopeId}>API family base path</strong> for each of Data Sharing, Service Initiation, Products, Consent Events &amp; Notifications, and Health Check. Earlier in onboarding it selects an `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`application layer authentication method`);
                } else {
                  return [
                    createTextVNode("application layer authentication method")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` — mTLS only, API Key, Client Credentials Grant, or JWT Auth — along with its sub-settings, such as the scopes used for Client Credentials or whether JWT Auth headers are also sent on the LFI&#39;s own calls to the Consent Manager and Headless Heimdall. </p><p data-v-e23f1972${_scopeId}> All of it is submitted on a <strong data-v-e23f1972${_scopeId}>Service Desk ticket</strong>. That is the documented process and it works: the ticket is raised, the values are exchanged, connectivity is validated in both directions, and the ticket is closed. </p><p data-v-e23f1972${_scopeId}> None of this is hidden from the LFI. The values are in the tickets, the tickets are searchable, and in principle everything can be recovered from them. The difficulty is that <strong data-v-e23f1972${_scopeId}>it is never one ticket</strong>. Onboarding creates the first record, and everything after it arrives as its own ticket, each raised to change one specific thing — a base path added when Products went live, a corrected path, a moved Authorization Endpoint, a switch from mTLS-only to JWT Auth. Each ticket is a <em data-v-e23f1972${_scopeId}>delta</em>, not a statement of the whole. </p><p data-v-e23f1972${_scopeId}> So working out what is configured <em data-v-e23f1972${_scopeId}>today</em> is not a lookup. It means finding every ticket that has ever touched the field, putting them in order, replaying them, and being confident none was missed — where missing one gives you a wrong answer that looks exactly like a right one. Then doing it again for the other environment, and again for each brand if the LFI runs more than one hub. </p><div class="ofp-code" data-v-e23f1972${_scopeId}><div class="ofp-code__label" data-v-e23f1972${_scopeId}>Today — reconstructing a value from the ticket history</div><pre class="ofp-code__pre" data-v-e23f1972${_scopeId}>${ssrInterpolate(todayExample)}</pre></div><p data-v-e23f1972${_scopeId}> Meanwhile the API Hub holds the answer as a <strong data-v-e23f1972${_scopeId}>single current value</strong>, because that is what it enforces on every proxied request. There is simply no way for the LFI to ask it. The one place an LFI already signs in to look at its own hub — the `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Admin Portal`);
                } else {
                  return [
                    createTextVNode("Admin Portal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` — shows TPP activation, consents, logs, reports, outages, and the users who hold access. It does not show a single one of the values above. </p><p data-v-e23f1972${_scopeId}> The cost of this is small each time and constant in aggregate. It lands hardest in the places where accuracy matters most: an incident where a forwarded request is 404ing and nobody can confirm the path the Hub is prepending; a suspected drift between pre-production and production that nobody can rule out; a multi-brand LFI running several hubs whose configurations must be told apart from ticket history; a new engineer joining the team with no way to read the current state of the integration they have inherited. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 02 · Recommendation</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>A Configuration section in the Admin Portal</h2></div><div class="ofp-prose" data-v-e23f1972${_scopeId}><p data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Add a read-only Configuration section to the Admin Portal that shows the effective onboarding configuration the API Hub actually holds for that instance and environment.</strong> Not a copy of the onboarding form — the live values the Hub enforces at proxy time. </p><div class="ofp-code" data-v-e23f1972${_scopeId}><div class="ofp-code__label" data-v-e23f1972${_scopeId}>Proposed — Admin Portal › Configuration (illustrative)</div><pre class="ofp-code__pre" data-v-e23f1972${_scopeId}>${ssrInterpolate(proposedView)}</pre></div><p data-v-e23f1972${_scopeId}> The scoping falls out of what already exists. The Admin Portal is provisioned <strong data-v-e23f1972${_scopeId}>one instance per API Hub, per environment</strong> — <code data-v-e23f1972${_scopeId}>admin.{lficode}.preprod.apihub.openfinance.ae</code> and <code data-v-e23f1972${_scopeId}>admin.{lficode}.apihub.openfinance.ae</code> — so a page inside it is already correctly scoped to one brand and one environment without anything new being built. A multi-brand LFI opens each brand&#39;s portal and sees that brand&#39;s configuration, which is exactly the distinction that is hardest to hold onto across ticket threads. </p><p data-v-e23f1972${_scopeId}> Access control falls out too. Portal access is already granted via Trust Framework SSO to users holding the relevant roles — PTC, PBC, STC — and revoked by managing those roles in the Trust Framework. This proposal introduces no new identity, credential, or permission model; the audience for the page is the audience the portal already has. </p><p data-v-e23f1972${_scopeId}> Nothing else changes. The Ozone Connect contract, the headers, the schemas, the TPP-facing API, and the onboarding process itself are all untouched. Configuration continues to be submitted and changed exactly as it is today. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 03 · What is shown</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>Connectivity and authentication, for this hub and this environment</h2><p class="ofp-band__lede" data-v-e23f1972${_scopeId}> The scope is the configuration an LFI provides or is allocated for connectivity. Certificates are deliberately excluded — see below. </p></div><div class="ofp-prose" data-v-e23f1972${_scopeId}><div class="ofp-rules" data-v-e23f1972${_scopeId}><div class="ofp-rules__label" data-v-e23f1972${_scopeId}>In scope</div><ul class="ofp-rules__list" data-v-e23f1972${_scopeId}><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Ozone Connect Base URL</strong> — the base URL the API Hub forwards to for this environment. </li><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Authorization Endpoint</strong> — the OIDC authorisation URL the customer is redirected to, or an explicit indication that the LFI has adopted <strong data-v-e23f1972${_scopeId}>CAAP</strong> and therefore provides none. </li><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Application layer authentication method</strong> — mTLS only, API Key, Client Credentials Grant, or JWT Auth, together with its configured sub-settings: the <code data-v-e23f1972${_scopeId}>scope</code> values agreed for Client Credentials, and whether JWT Auth headers are sent on the LFI&#39;s calls to the Consent Manager and Headless Heimdall Auth Server. </li><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Optional API family base paths</strong> — one row per family (Data Sharing, Service Initiation, Products, Consent Events &amp; Notifications, Health Check), showing the configured path <em data-v-e23f1972${_scopeId}>or</em> an explicit “not set”, and next to it the <strong data-v-e23f1972${_scopeId}>effective forwarded URL</strong> worked through against the base URL, so there is nothing left to infer. </li><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Instance identifiers and allocated values</strong> — LFI Code, LFI Organisation ID, the Ozone-allocated domains for the environment, and the API Hub egress IP addresses the LFI must allowlist. </li></ul></div><div class="ofp-rules" data-v-e23f1972${_scopeId}><div class="ofp-rules__label" data-v-e23f1972${_scopeId}>Out of scope</div><ul class="ofp-rules__list" data-v-e23f1972${_scopeId}><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Certificates.</strong> The certificate set (S1, S3, C4, Sig2, Sig3, C3, S4, Sig4, Enc1) and its JWKS URLs and KIDs are not included. They are held and managed in the Trust Framework, which is their system of record, and surfacing a second view of them raises questions about which one is authoritative. Keeping this proposal to connectivity and authentication keeps it small enough to be worth building; certificates can be taken up separately if the ecosystem wants them. </li><li data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Editing.</strong> Nothing on the page is changeable. See section 04. </li></ul></div><p data-v-e23f1972${_scopeId}> One requirement matters more than the rest: the page must be generated from the <strong data-v-e23f1972${_scopeId}>live configuration the API Hub enforces</strong>, not from a stored copy of what was written on the onboarding ticket. A page that can drift from the running configuration is worse than no page, because it would be trusted. </p></div></div></section><section class="ofp-band ofp-band--white" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 04 · Why view-only</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>Seeing and changing are different proposals</h2></div><div class="ofp-prose" data-v-e23f1972${_scopeId}><p data-v-e23f1972${_scopeId}> The obvious next question is whether an LFI should be able to <em data-v-e23f1972${_scopeId}>change</em> these values in the portal rather than raising a Service Desk ticket. This proposal deliberately does not ask for that, for three reasons. </p><p data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>The risk profiles are not comparable.</strong> Displaying a value the Hub already holds cannot break a live integration. Editing the Ozone Connect Base URL, the Authorization Endpoint, or a base path on a production hub can take an LFI&#39;s entire Open Finance estate offline in one click, and a wrong application layer authentication method breaks every call in both directions. Nebras&#39;s end-to-end connectivity validation exists precisely because these values are not safe to set unverified. </p><p data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Editing needs a change-control model that does not exist yet.</strong> The portal today documents no role-differentiated permissions — every user granted access sees the same thing. Before any of this becomes editable there has to be an answer on who may change what, whether approval is required, how a change is validated before it takes effect, how it is audited, and whether production is treated differently from pre-production. That is a substantial piece of design in its own right and it should not ride along on a display change. </p><p data-v-e23f1972${_scopeId}><strong data-v-e23f1972${_scopeId}>Read-only is worth having on its own.</strong> A meaningful share of the Service Desk traffic these fields generate is not “please change this” but “what is this set to?”. That question disappears entirely with a view, at a fraction of the cost. </p><p data-v-e23f1972${_scopeId}> That said, we want to know whether editing would be valuable to you, so <strong data-v-e23f1972${_scopeId}>the second question on the vote form asks exactly that</strong> — which fields you would want to change yourself, and what change control your institution would need around them. If the answers show real appetite, we will bring it forward as a separate proposal with the permissions and validation model worked through properly. Please answer it whichever way you vote on this one. </p></div></div></section><section class="ofp-band ofp-band--cream" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 05 · Technical changes</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>What changes</h2><p class="ofp-band__lede" data-v-e23f1972${_scopeId}> A read model, a portal page, and documentation. Nothing on the request path, and nothing that an LFI or TPP must implement. </p></div><div class="ofp-changes" data-v-e23f1972${_scopeId}><div class="ofp-change" data-v-e23f1972${_scopeId}><div class="ofp-change__label" data-v-e23f1972${_scopeId}>01 · Configuration read model</div><p data-v-e23f1972${_scopeId}> Expose the effective connectivity and application-layer-authentication configuration for an API Hub instance and environment, read from the configuration the Hub enforces rather than from a stored copy of the onboarding submission. Read-only: no write path is introduced. </p></div><div class="ofp-change" data-v-e23f1972${_scopeId}><div class="ofp-change__label" data-v-e23f1972${_scopeId}>02 · Admin Portal Configuration section</div><p data-v-e23f1972${_scopeId}> A new section in the portal rendering the values in section 03, using the same field names as the onboarding documentation so the two read as one thing. The API family table resolves each path against the base URL and shows the forwarded URL alongside it. Fields that are not set are shown explicitly as not set, with the resulting default path, rather than being omitted. </p></div><div class="ofp-change" data-v-e23f1972${_scopeId}><div class="ofp-change__label" data-v-e23f1972${_scopeId}>03 · Documentation</div><p data-v-e23f1972${_scopeId}> A new page under `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Admin Portal`);
                } else {
                  return [
                    createTextVNode("Admin Portal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` describing the section and each field it shows, cross-linked from `);
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
            _push2(`, `);
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
            _push2(`, `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Authorization Endpoint`);
                } else {
                  return [
                    createTextVNode("Authorization Endpoint")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`, and `);
            _push2(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Application Layer Authentication`);
                } else {
                  return [
                    createTextVNode("Application Layer Authentication")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`, each stating plainly that the configured value can be viewed in the portal and changed via the Service Desk. </p></div></div></div></section><section class="ofp-band ofp-band--white" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 06 · Pros</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>What the view buys</h2></div><ul class="ofp-pros" data-v-e23f1972${_scopeId}><!--[-->`);
            ssrRenderList(pros, (p, i) => {
              _push2(`<li class="ofp-pros__item" data-v-e23f1972${_scopeId}><span class="ofp-pros__glyph" data-v-e23f1972${_scopeId}>✓</span><span data-v-e23f1972${_scopeId}>${ssrInterpolate(p)}</span></li>`);
            });
            _push2(`<!--]--></ul></div></section><section class="ofp-band ofp-band--cream" data-v-e23f1972${_scopeId}><div class="ofp-band__inner" data-v-e23f1972${_scopeId}><div class="ofp-band__head" data-v-e23f1972${_scopeId}><div class="ofp-band__eyebrow" data-v-e23f1972${_scopeId}><span class="ofp-band__eyebrow-dash" data-v-e23f1972${_scopeId}></span> 07 · Cons</div><h2 class="ofp-band__title" data-v-e23f1972${_scopeId}>What it costs</h2></div><ul class="ofp-cons" data-v-e23f1972${_scopeId}><!--[-->`);
            ssrRenderList(cons, (c, i) => {
              _push2(`<li class="ofp-cons__item" data-v-e23f1972${_scopeId}><span class="ofp-cons__glyph" data-v-e23f1972${_scopeId}>×</span><span data-v-e23f1972${_scopeId}>${ssrInterpolate(c)}</span></li>`);
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
                    createVNode("h2", { class: "ofp-band__title" }, "Knowable in principle, scattered across tickets in practice")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" During "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
                        default: withCtx(() => [
                          createTextVNode("environment-specific onboarding")
                        ]),
                        _: 1
                      }),
                      createTextVNode(", an LFI hands Nebras the details that define how the API Hub reaches its backend: the "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, {
                        default: withCtx(() => [
                          createTextVNode("Ozone Connect Base URL")
                        ]),
                        _: 1
                      }),
                      createTextVNode(", the "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, {
                        default: withCtx(() => [
                          createTextVNode("Authorization Endpoint")
                        ]),
                        _: 1
                      }),
                      createTextVNode(", and an optional "),
                      createVNode("strong", null, "API family base path"),
                      createTextVNode(" for each of Data Sharing, Service Initiation, Products, Consent Events & Notifications, and Health Check. Earlier in onboarding it selects an "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, {
                        default: withCtx(() => [
                          createTextVNode("application layer authentication method")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" — mTLS only, API Key, Client Credentials Grant, or JWT Auth — along with its sub-settings, such as the scopes used for Client Credentials or whether JWT Auth headers are also sent on the LFI's own calls to the Consent Manager and Headless Heimdall. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" All of it is submitted on a "),
                      createVNode("strong", null, "Service Desk ticket"),
                      createTextVNode(". That is the documented process and it works: the ticket is raised, the values are exchanged, connectivity is validated in both directions, and the ticket is closed. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" None of this is hidden from the LFI. The values are in the tickets, the tickets are searchable, and in principle everything can be recovered from them. The difficulty is that "),
                      createVNode("strong", null, "it is never one ticket"),
                      createTextVNode(". Onboarding creates the first record, and everything after it arrives as its own ticket, each raised to change one specific thing — a base path added when Products went live, a corrected path, a moved Authorization Endpoint, a switch from mTLS-only to JWT Auth. Each ticket is a "),
                      createVNode("em", null, "delta"),
                      createTextVNode(", not a statement of the whole. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" So working out what is configured "),
                      createVNode("em", null, "today"),
                      createTextVNode(" is not a lookup. It means finding every ticket that has ever touched the field, putting them in order, replaying them, and being confident none was missed — where missing one gives you a wrong answer that looks exactly like a right one. Then doing it again for the other environment, and again for each brand if the LFI runs more than one hub. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Today — reconstructing a value from the ticket history"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(todayExample))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Meanwhile the API Hub holds the answer as a "),
                      createVNode("strong", null, "single current value"),
                      createTextVNode(", because that is what it enforces on every proxied request. There is simply no way for the LFI to ask it. The one place an LFI already signs in to look at its own hub — the "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, {
                        default: withCtx(() => [
                          createTextVNode("Admin Portal")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" — shows TPP activation, consents, logs, reports, outages, and the users who hold access. It does not show a single one of the values above. ")
                    ]),
                    createVNode("p", null, " The cost of this is small each time and constant in aggregate. It lands hardest in the places where accuracy matters most: an incident where a forwarded request is 404ing and nobody can confirm the path the Hub is prepending; a suspected drift between pre-production and production that nobody can rule out; a multi-brand LFI running several hubs whose configurations must be told apart from ticket history; a new engineer joining the team with no way to read the current state of the integration they have inherited. ")
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
                    createVNode("h2", { class: "ofp-band__title" }, "A Configuration section in the Admin Portal")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Add a read-only Configuration section to the Admin Portal that shows the effective onboarding configuration the API Hub actually holds for that instance and environment."),
                      createTextVNode(" Not a copy of the onboarding form — the live values the Hub enforces at proxy time. ")
                    ]),
                    createVNode("div", { class: "ofp-code" }, [
                      createVNode("div", { class: "ofp-code__label" }, "Proposed — Admin Portal › Configuration (illustrative)"),
                      createVNode("pre", { class: "ofp-code__pre" }, toDisplayString(proposedView))
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The scoping falls out of what already exists. The Admin Portal is provisioned "),
                      createVNode("strong", null, "one instance per API Hub, per environment"),
                      createTextVNode(" — "),
                      createVNode("code", null, "admin.{lficode}.preprod.apihub.openfinance.ae"),
                      createTextVNode(" and "),
                      createVNode("code", null, "admin.{lficode}.apihub.openfinance.ae"),
                      createTextVNode(" — so a page inside it is already correctly scoped to one brand and one environment without anything new being built. A multi-brand LFI opens each brand's portal and sees that brand's configuration, which is exactly the distinction that is hardest to hold onto across ticket threads. ")
                    ]),
                    createVNode("p", null, " Access control falls out too. Portal access is already granted via Trust Framework SSO to users holding the relevant roles — PTC, PBC, STC — and revoked by managing those roles in the Trust Framework. This proposal introduces no new identity, credential, or permission model; the audience for the page is the audience the portal already has. "),
                    createVNode("p", null, " Nothing else changes. The Ozone Connect contract, the headers, the schemas, the TPP-facing API, and the onboarding process itself are all untouched. Configuration continues to be submitted and changed exactly as it is today. ")
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 03 · What is shown")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Connectivity and authentication, for this hub and this environment"),
                    createVNode("p", { class: "ofp-band__lede" }, " The scope is the configuration an LFI provides or is allocated for connectivity. Certificates are deliberately excluded — see below. ")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "In scope"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Ozone Connect Base URL"),
                          createTextVNode(" — the base URL the API Hub forwards to for this environment. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Authorization Endpoint"),
                          createTextVNode(" — the OIDC authorisation URL the customer is redirected to, or an explicit indication that the LFI has adopted "),
                          createVNode("strong", null, "CAAP"),
                          createTextVNode(" and therefore provides none. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Application layer authentication method"),
                          createTextVNode(" — mTLS only, API Key, Client Credentials Grant, or JWT Auth, together with its configured sub-settings: the "),
                          createVNode("code", null, "scope"),
                          createTextVNode(" values agreed for Client Credentials, and whether JWT Auth headers are sent on the LFI's calls to the Consent Manager and Headless Heimdall Auth Server. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Optional API family base paths"),
                          createTextVNode(" — one row per family (Data Sharing, Service Initiation, Products, Consent Events & Notifications, Health Check), showing the configured path "),
                          createVNode("em", null, "or"),
                          createTextVNode(" an explicit “not set”, and next to it the "),
                          createVNode("strong", null, "effective forwarded URL"),
                          createTextVNode(" worked through against the base URL, so there is nothing left to infer. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Instance identifiers and allocated values"),
                          createTextVNode(" — LFI Code, LFI Organisation ID, the Ozone-allocated domains for the environment, and the API Hub egress IP addresses the LFI must allowlist. ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "ofp-rules" }, [
                      createVNode("div", { class: "ofp-rules__label" }, "Out of scope"),
                      createVNode("ul", { class: "ofp-rules__list" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Certificates."),
                          createTextVNode(" The certificate set (S1, S3, C4, Sig2, Sig3, C3, S4, Sig4, Enc1) and its JWKS URLs and KIDs are not included. They are held and managed in the Trust Framework, which is their system of record, and surfacing a second view of them raises questions about which one is authoritative. Keeping this proposal to connectivity and authentication keeps it small enough to be worth building; certificates can be taken up separately if the ecosystem wants them. ")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Editing."),
                          createTextVNode(" Nothing on the page is changeable. See section 04. ")
                        ])
                      ])
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" One requirement matters more than the rest: the page must be generated from the "),
                      createVNode("strong", null, "live configuration the API Hub enforces"),
                      createTextVNode(", not from a stored copy of what was written on the onboarding ticket. A page that can drift from the running configuration is worse than no page, because it would be trusted. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--white" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 04 · Why view-only")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "Seeing and changing are different proposals")
                  ]),
                  createVNode("div", { class: "ofp-prose" }, [
                    createVNode("p", null, [
                      createTextVNode(" The obvious next question is whether an LFI should be able to "),
                      createVNode("em", null, "change"),
                      createTextVNode(" these values in the portal rather than raising a Service Desk ticket. This proposal deliberately does not ask for that, for three reasons. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "The risk profiles are not comparable."),
                      createTextVNode(" Displaying a value the Hub already holds cannot break a live integration. Editing the Ozone Connect Base URL, the Authorization Endpoint, or a base path on a production hub can take an LFI's entire Open Finance estate offline in one click, and a wrong application layer authentication method breaks every call in both directions. Nebras's end-to-end connectivity validation exists precisely because these values are not safe to set unverified. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Editing needs a change-control model that does not exist yet."),
                      createTextVNode(" The portal today documents no role-differentiated permissions — every user granted access sees the same thing. Before any of this becomes editable there has to be an answer on who may change what, whether approval is required, how a change is validated before it takes effect, how it is audited, and whether production is treated differently from pre-production. That is a substantial piece of design in its own right and it should not ride along on a display change. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Read-only is worth having on its own."),
                      createTextVNode(" A meaningful share of the Service Desk traffic these fields generate is not “please change this” but “what is this set to?”. That question disappears entirely with a view, at a fraction of the cost. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" That said, we want to know whether editing would be valuable to you, so "),
                      createVNode("strong", null, "the second question on the vote form asks exactly that"),
                      createTextVNode(" — which fields you would want to change yourself, and what change control your institution would need around them. If the answers show real appetite, we will bring it forward as a separate proposal with the permissions and validation model worked through properly. Please answer it whichever way you vote on this one. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "ofp-band ofp-band--cream" }, [
                createVNode("div", { class: "ofp-band__inner" }, [
                  createVNode("div", { class: "ofp-band__head" }, [
                    createVNode("div", { class: "ofp-band__eyebrow" }, [
                      createVNode("span", { class: "ofp-band__eyebrow-dash" }),
                      createTextVNode(" 05 · Technical changes")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What changes"),
                    createVNode("p", { class: "ofp-band__lede" }, " A read model, a portal page, and documentation. Nothing on the request path, and nothing that an LFI or TPP must implement. ")
                  ]),
                  createVNode("div", { class: "ofp-changes" }, [
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "01 · Configuration read model"),
                      createVNode("p", null, " Expose the effective connectivity and application-layer-authentication configuration for an API Hub instance and environment, read from the configuration the Hub enforces rather than from a stored copy of the onboarding submission. Read-only: no write path is introduced. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "02 · Admin Portal Configuration section"),
                      createVNode("p", null, " A new section in the portal rendering the values in section 03, using the same field names as the onboarding documentation so the two read as one thing. The API family table resolves each path against the base URL and shows the forwarded URL alongside it. Fields that are not set are shown explicitly as not set, with the resulting default path, rather than being omitted. ")
                    ]),
                    createVNode("div", { class: "ofp-change" }, [
                      createVNode("div", { class: "ofp-change__label" }, "03 · Documentation"),
                      createVNode("p", null, [
                        createTextVNode(" A new page under "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, {
                          default: withCtx(() => [
                            createTextVNode("Admin Portal")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" describing the section and each field it shows, cross-linked from "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, {
                          default: withCtx(() => [
                            createTextVNode("Environment-Specific Configuration")
                          ]),
                          _: 1
                        }),
                        createTextVNode(", "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, {
                          default: withCtx(() => [
                            createTextVNode("Ozone Connect Base URL")
                          ]),
                          _: 1
                        }),
                        createTextVNode(", "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, {
                          default: withCtx(() => [
                            createTextVNode("Authorization Endpoint")
                          ]),
                          _: 1
                        }),
                        createTextVNode(", and "),
                        createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, {
                          default: withCtx(() => [
                            createTextVNode("Application Layer Authentication")
                          ]),
                          _: 1
                        }),
                        createTextVNode(", each stating plainly that the configured value can be viewed in the portal and changed via the Service Desk. ")
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
                      createTextVNode(" 06 · Pros")
                    ]),
                    createVNode("h2", { class: "ofp-band__title" }, "What the view buys")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-007/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e23f1972"]]);
export {
  index as default
};
