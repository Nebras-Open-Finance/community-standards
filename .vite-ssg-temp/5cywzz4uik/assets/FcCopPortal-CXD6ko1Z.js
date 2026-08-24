import { _ as __unplugin_components_2, i as emptyCopFormState, j as emptyCopScenarioState, c as __unplugin_components_0$1, d as __unplugin_components_1, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, mergeProps, unref, useSSRContext, reactive, ref, watch, onMounted, computed, withCtx, openBlock, createBlock, createTextVNode, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc, V as VERSIONS } from "../main.mjs";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcCopScenario",
  __ssrInlineRender: true,
  props: {
    segment: {},
    outcome: {},
    state: {},
    captureResponseName: { type: Boolean },
    confirmationUrl: {},
    complete: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const isBusiness = props.segment.nameType === "business";
    const nameLabel = isBusiness ? "Business name" : "Full name";
    const uid = `${props.segment.key}-${props.outcome.key}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcFileInput = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cop-sc" }, _attrs))} data-v-519210b5><div class="cop-sc__head" data-v-519210b5><span class="cop-sc__seg" data-v-519210b5>${ssrInterpolate(__props.segment.key)}</span><span class="cop-sc__outcome" data-v-519210b5>${ssrInterpolate(__props.outcome.label)}</span>`);
      if (__props.outcome.indicator) {
        _push(`<code class="cop-sc__ind" data-v-519210b5>${ssrInterpolate(__props.outcome.indicator)}</code>`);
      } else {
        _push(`<code class="cop-sc__ind cop-sc__ind--muted" data-v-519210b5>HTTP 204 — no body</code>`);
      }
      _push(`<span class="${ssrRenderClass([__props.complete ? "cop-sc__status--ok" : "cop-sc__status--todo", "cop-sc__status"])}" data-v-519210b5>${ssrInterpolate(__props.complete ? "✓ Complete" : "Incomplete")}</span></div><p class="cop-sc__guidance" data-v-519210b5>${ssrInterpolate(__props.outcome.guidance)}</p><div class="cop-sc__group" data-v-519210b5><span class="cop-sc__group-label" data-v-519210b5>Confirmation request — name &amp; IBAN you asked as</span><div class="cop-sc__grid" data-v-519210b5><label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>${ssrInterpolate(unref(nameLabel))}</span><input${ssrRenderAttr("value", __props.state.reqName)} type="text" class="cop-sc__input"${ssrRenderAttr("placeholder", isBusiness ? "e.g. Nebras Trading LLC" : "e.g. Ahmed Ali Al Mansoori")} data-v-519210b5></label>`);
      if (!isBusiness) {
        _push(`<label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>First name <span class="cop-sc__opt" data-v-519210b5>(optional)</span></span><input${ssrRenderAttr("value", __props.state.reqFirstName)} type="text" class="cop-sc__input" placeholder="e.g. Ahmed" data-v-519210b5></label>`);
      } else {
        _push(`<!---->`);
      }
      if (!isBusiness) {
        _push(`<label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>Last name <span class="cop-sc__opt" data-v-519210b5>(optional)</span></span><input${ssrRenderAttr("value", __props.state.reqLastName)} type="text" class="cop-sc__input" placeholder="e.g. Al Mansoori" data-v-519210b5></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>IBAN</span><input${ssrRenderAttr("value", __props.state.reqIban)} type="text" class="cop-sc__input cop-sc__input--mono" placeholder="AE070331234567890123456" data-v-519210b5></label></div></div>`);
      if (__props.captureResponseName) {
        _push(`<!--[-->`);
        if (__props.outcome.returnsName) {
          _push(`<div class="cop-sc__group" data-v-519210b5><span class="cop-sc__group-label" data-v-519210b5>cop-query response — name you returned as the LFI</span><div class="cop-sc__grid" data-v-519210b5><label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>${ssrInterpolate(unref(nameLabel))}</span><input${ssrRenderAttr("value", __props.state.resName)} type="text" class="cop-sc__input"${ssrRenderAttr("placeholder", isBusiness ? "e.g. Nebras Trading LLC" : "e.g. Ahmed Ali Al Mansoori")} data-v-519210b5></label>`);
          if (!isBusiness) {
            _push(`<label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>First name <span class="cop-sc__opt" data-v-519210b5>(optional)</span></span><input${ssrRenderAttr("value", __props.state.resFirstName)} type="text" class="cop-sc__input" placeholder="e.g. Ahmed" data-v-519210b5></label>`);
          } else {
            _push(`<!---->`);
          }
          if (!isBusiness) {
            _push(`<label class="cop-sc__field" data-v-519210b5><span class="cop-sc__flabel" data-v-519210b5>Last name <span class="cop-sc__opt" data-v-519210b5>(optional)</span></span><input${ssrRenderAttr("value", __props.state.resLastName)} type="text" class="cop-sc__input" placeholder="e.g. Al Mansoori" data-v-519210b5></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<label class="cop-sc__confirm" data-v-519210b5><input${ssrIncludeBooleanAttr(Array.isArray(__props.state.confirmedEmpty) ? ssrLooseContain(__props.state.confirmedEmpty, null) : __props.state.confirmedEmpty) ? " checked" : ""} type="checkbox" data-v-519210b5><span data-v-519210b5>I confirm my cop-query returned HTTP 200 with an empty <code data-v-519210b5>data</code> object for this IBAN, and the TPP-facing <code data-v-519210b5>/confirmation</code> call returned HTTP 204.</span></label>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="cop-sc__tpp" data-v-519210b5><span class="cop-sc__group-label" data-v-519210b5>TPP-facing verdict</span><code class="cop-sc__url" data-v-519210b5>POST ${ssrInterpolate(__props.confirmationUrl)}</code></p>`);
      _push(ssrRenderComponent(_component_FcFileInput, {
        modelValue: __props.state.postman,
        "onUpdate:modelValue": ($event) => __props.state.postman = $event,
        label: `Postman screenshot — ${__props.outcome.label}`,
        accept: "image/png,image/jpeg,image/webp",
        hint: __props.outcome.indicator ? `Screenshot from the Postman collection showing the /confirmation response with NameMatchIndicator ${__props.outcome.indicator}.` : "Screenshot from the Postman collection showing the /confirmation call returning HTTP 204 for the unrecognised IBAN."
      }, null, _parent));
      _push(`<label class="cop-sc__flabel cop-sc__flabel--block"${ssrRenderAttr("for", `cop-notes-${uid}`)} data-v-519210b5>Notes <span class="cop-sc__opt" data-v-519210b5>(optional)</span></label><textarea${ssrRenderAttr("id", `cop-notes-${uid}`)} class="cop-sc__textarea" placeholder="Anything relevant to this scenario — e.g. how the partial match was constructed." data-v-519210b5>${ssrInterpolate(__props.state.notes)}</textarea></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcCopScenario.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-519210b5"]]);
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcCopPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyCopFormState());
    const scenarioKey = (segKey, outcomeKey) => `${segKey}__${outcomeKey}`;
    const scenarioStates = reactive(
      Object.fromEntries(
        props.area.segments.flatMap(
          (s) => props.area.outcomes.map((o) => [scenarioKey(s.key, o.key), emptyCopScenarioState()])
        )
      )
    );
    const stateFor = (segKey, outcomeKey) => scenarioStates[scenarioKey(segKey, outcomeKey)];
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const STEPS = ["Your details", "Segments & version", "Evidence", "Review & generate"];
    const currentStep = ref(1);
    const generating = ref(false);
    const genError = ref("");
    const redirecting = ref(false);
    onMounted(async () => {
      await loadMe();
      if (typeof window === "undefined") return;
      if (auth.value.authenticated) {
        window.sessionStorage.removeItem(LOGIN_MARKER);
        return;
      }
      const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER) || 0);
      if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
        window.sessionStorage.removeItem(LOGIN_MARKER);
        return;
      }
      window.sessionStorage.setItem(LOGIN_MARKER, String(Date.now()));
      redirecting.value = true;
      signIn();
    });
    const org = computed(
      () => auth.value.orgs.filter((o) => selectedOrgIds.value.includes(o.id)).map((o) => o.name).join(", ")
    );
    const identityName = computed(() => auth.value.name ?? auth.value.email ?? "");
    const baseUrl = computed(() => props.area.baseUrlTemplate.replace("{VERSION}", form.version));
    const confirmationUrl = computed(() => {
      var _a;
      return `${baseUrl.value}${((_a = props.area.tppEndpoints[0]) == null ? void 0 : _a.path) ?? "/confirmation"}`;
    });
    const outcomeLabels = computed(() => props.area.outcomes.map((o) => o.label).join(", "));
    const selectedSegments = computed(() => props.area.segments.filter((s) => form.segment.includes(s.key)));
    const scenarios = computed(
      () => selectedSegments.value.flatMap(
        (segment) => props.area.outcomes.map((outcome) => ({
          segment,
          outcome,
          state: stateFor(segment.key, outcome.key)
        }))
      )
    );
    function scenarioComplete(s) {
      const st = s.state;
      if (!st.reqName.trim() || !st.reqIban.trim()) return false;
      if (!st.postman) return false;
      if (props.area.captureResponseName) {
        if (s.outcome.returnsName && !st.resName.trim()) return false;
        if (!s.outcome.returnsName && !st.confirmedEmpty) return false;
      }
      return true;
    }
    const completeCount = computed(() => scenarios.value.filter(scenarioComplete).length);
    const allEvidenceComplete = computed(
      () => scenarios.value.length > 0 && completeCount.value === scenarios.value.length && (!props.area.requiresTestingTool || !!form.testingTool)
    );
    function canLeave(step) {
      if (step === 2) return form.segment.length > 0;
      if (step === 3) return allEvidenceComplete.value;
      return true;
    }
    const canAdvance = computed(() => canLeave(currentStep.value));
    function goTo(n) {
      if (n <= currentStep.value) currentStep.value = n;
    }
    watch(currentStep, () => {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const canGenerate = computed(() => scenarios.value.length > 0 && !generating.value);
    function slugify(s) {
      return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    }
    computed(() => {
      const who = slugify(org.value) || "submission";
      return `functional-certification-${props.area.key}-${who}.zip`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcStepper = __unplugin_components_0$1;
      const _component_FcIdentity = __unplugin_components_1;
      const _component_EdNote = __unplugin_components_7;
      const _component_FcFileInput = __unplugin_components_2;
      const _component_FcCopScenario = __unplugin_components_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-2e472a8f>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-2e472a8f> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-2e472a8f><h2 class="fc__h2" data-v-2e472a8f>Your details</h2><p class="fc__lede" data-v-2e472a8f> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your ${ssrInterpolate(__props.area.role === "lfi" ? "LFI" : "organisation")}. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-2e472a8f><h2 class="fc__h2" data-v-2e472a8f>Segments &amp; version</h2><p class="fc__lede" data-v-2e472a8f> Choose the standards version and the segments you are certifying. Each segment is evidenced against every match outcome on the next step — Retail with a personal name, SME and Corporate with a business name. </p><div class="fc__controls" data-v-2e472a8f><div class="fc__ctrl" data-v-2e472a8f><label class="fc__label" for="cop-version" data-v-2e472a8f>API version</label><select id="cop-version" class="fc__select"${ssrRenderAttr("value", form.version)} data-v-2e472a8f><!--[-->`);
        ssrRenderList(unref(VERSIONS), (v) => {
          _push(`<option${ssrRenderAttr("value", v)} data-v-2e472a8f>${ssrInterpolate(v)}</option>`);
        });
        _push(`<!--]--></select></div><div class="fc__ctrl" data-v-2e472a8f><label class="fc__label" data-v-2e472a8f>Segments <span class="fc__opt" data-v-2e472a8f>select all that apply</span></label><div class="fc__seg" data-v-2e472a8f><!--[-->`);
        ssrRenderList(__props.area.segments, (s) => {
          _push(`<button type="button" class="${ssrRenderClass([{ on: form.segment.includes(s.key) }, "fc__seg-btn"])}"${ssrRenderAttr("aria-pressed", form.segment.includes(s.key))} data-v-2e472a8f>${ssrInterpolate(s.key)} <span class="fc__seg-type" data-v-2e472a8f>${ssrInterpolate(s.nameType === "business" ? "business name" : "personal name")}</span></button>`);
        });
        _push(`<!--]--></div></div></div>`);
        _push(ssrRenderComponent(_component_EdNote, {
          type: "note",
          title: "The API Hub computes the verdict"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.area.role === "lfi") {
                _push2(`<p data-v-2e472a8f${_scopeId}> Confirmation of Payee has a single Ozone Connect endpoint, <code data-v-2e472a8f${_scopeId}>${ssrInterpolate(__props.area.ozoneEndpoint.method)} ${ssrInterpolate(__props.area.ozoneEndpoint.path)}</code>. The API Hub computes the name-match verdict, so you evidence each outcome — ${ssrInterpolate(outcomeLabels.value)} — for every segment above. </p>`);
              } else {
                _push2(`<p data-v-2e472a8f${_scopeId}> You retrieve a Confirmation of Payee verdict from the sandbox Model Bank: call <code data-v-2e472a8f${_scopeId}>POST /discovery</code> to resolve the LFI, then <code data-v-2e472a8f${_scopeId}>POST /confirmation</code> to get the name-match result. Evidence each outcome — ${ssrInterpolate(outcomeLabels.value)} — for every segment above. </p>`);
              }
            } else {
              return [
                __props.area.role === "lfi" ? (openBlock(), createBlock("p", { key: 0 }, [
                  createTextVNode(" Confirmation of Payee has a single Ozone Connect endpoint, "),
                  createVNode("code", null, toDisplayString(__props.area.ozoneEndpoint.method) + " " + toDisplayString(__props.area.ozoneEndpoint.path), 1),
                  createTextVNode(". The API Hub computes the name-match verdict, so you evidence each outcome — " + toDisplayString(outcomeLabels.value) + " — for every segment above. ", 1)
                ])) : (openBlock(), createBlock("p", { key: 1 }, [
                  createTextVNode(" You retrieve a Confirmation of Payee verdict from the sandbox Model Bank: call "),
                  createVNode("code", null, "POST /discovery"),
                  createTextVNode(" to resolve the LFI, then "),
                  createVNode("code", null, "POST /confirmation"),
                  createTextVNode(" to get the name-match result. Evidence each outcome — " + toDisplayString(outcomeLabels.value) + " — for every segment above. ", 1)
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-2e472a8f><h2 class="fc__h2" data-v-2e472a8f>Evidence</h2><p class="fc__lede" data-v-2e472a8f>`);
        if (__props.area.requiresTestingTool) {
          _push(`<!--[-->Attach one Testing Tool report for your cop-query endpoint, then evidence each match outcome per segment.<!--]-->`);
        } else {
          _push(`<!--[-->Evidence each match outcome per segment with a Postman screenshot of the <code data-v-2e472a8f>/confirmation</code> verdict.<!--]-->`);
        }
        if (__props.area.role === "lfi") {
          _push(`<!--[-->All evidence must come from your own <strong data-v-2e472a8f>pre-production environment</strong>.<!--]-->`);
        } else {
          _push(`<!--[-->All evidence must come from the <a${ssrRenderAttr("href", __props.area.sandboxEvidenceHref)} data-v-2e472a8f>AlTareq Model Bank</a> sandbox.<!--]-->`);
        }
        _push(`</p>`);
        if (__props.area.wellKnownUrl) {
          _push(`<p class="fc__wellknown" data-v-2e472a8f><span class="fc__id-label" data-v-2e472a8f>Model Bank .well-known</span><code data-v-2e472a8f>${ssrInterpolate(__props.area.wellKnownUrl)}</code></p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.area.requiresTestingTool) {
          _push(ssrRenderComponent(_component_FcFileInput, {
            modelValue: form.testingTool,
            "onUpdate:modelValue": ($event) => form.testingTool = $event,
            label: "Testing Tool output (cop-query)",
            accept: ".html,.htm,text/html",
            hint: `HTML report from the Testing Tool for your Ozone Connect ${__props.area.ozoneEndpoint.method} ${__props.area.ozoneEndpoint.path} endpoint.`
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (scenarios.value.length === 0) {
          _push(`<div class="fc__empty" data-v-2e472a8f> You haven’t selected any segments yet. <button type="button" class="fc__link" data-v-2e472a8f>Go back to choose segments</button>. </div>`);
        } else {
          _push(`<!--[--><div class="${ssrRenderClass([{ "fc__progress-note--done": allEvidenceComplete.value }, "fc__progress-note"])}" data-v-2e472a8f>${ssrInterpolate(completeCount.value)} of ${ssrInterpolate(scenarios.value.length)} scenarios complete`);
          if (__props.area.requiresTestingTool && !form.testingTool) {
            _push(`<!--[--> · Testing Tool report required<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`${ssrInterpolate(allEvidenceComplete.value ? " — you can continue." : ".")}</div><!--[-->`);
          ssrRenderList(selectedSegments.value, (seg) => {
            _push(`<!--[--><h3 class="fc__seg-heading" data-v-2e472a8f>${ssrInterpolate(seg.key)}</h3><!--[-->`);
            ssrRenderList(__props.area.outcomes, (o) => {
              _push(ssrRenderComponent(_component_FcCopScenario, {
                key: `${seg.key}-${o.key}`,
                segment: seg,
                outcome: o,
                state: stateFor(seg.key, o.key),
                "capture-response-name": __props.area.captureResponseName,
                "confirmation-url": confirmationUrl.value,
                complete: scenarioComplete({ outcome: o, state: stateFor(seg.key, o.key) })
              }, null, _parent));
            });
            _push(`<!--]--><!--]-->`);
          });
          _push(`<!--]--><!--]-->`);
        }
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-2e472a8f><h2 class="fc__h2" data-v-2e472a8f>Review &amp; generate</h2><p class="fc__lede" data-v-2e472a8f> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-2e472a8f>summary.html</code>${ssrInterpolate(__props.area.requiresTestingTool ? ", your Testing Tool report," : "")} and every screenshot — attach it to your <strong data-v-2e472a8f>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-2e472a8f><div data-v-2e472a8f><dt data-v-2e472a8f>Organisation</dt><dd data-v-2e472a8f>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-2e472a8f><dt data-v-2e472a8f>Submitted by</dt><dd data-v-2e472a8f>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-2e472a8f><dt data-v-2e472a8f>Version</dt><dd data-v-2e472a8f>${ssrInterpolate(form.version.toUpperCase())}</dd></div><div data-v-2e472a8f><dt data-v-2e472a8f>Segments</dt><dd data-v-2e472a8f>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div><div data-v-2e472a8f><dt data-v-2e472a8f>Scenarios in scope</dt><dd data-v-2e472a8f>${ssrInterpolate(scenarios.value.length)}</dd></div></dl><div class="fc-comment" data-v-2e472a8f><label class="fc-comment__label" for="fc-comments" data-v-2e472a8f>Comments <span class="fc__opt" data-v-2e472a8f>(optional)</span></label><textarea id="fc-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-2e472a8f>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-2e472a8f>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-2e472a8f><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-2e472a8f>Back</button><span class="fc__nav-pos" data-v-2e472a8f>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""}${ssrRenderAttr("title", !canAdvance.value && currentStep.value === 3 ? "Attach the Testing Tool report and complete every scenario first" : "")} data-v-2e472a8f> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-2e472a8f>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcCopPortal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e472a8f"]]);
export {
  __unplugin_components_0 as _
};
