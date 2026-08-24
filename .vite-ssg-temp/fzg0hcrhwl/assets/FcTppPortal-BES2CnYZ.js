import { _ as __unplugin_components_2, e as emptyTppFormState, a as emptyTppEndpointState, b as emptyConsentOpState, c as __unplugin_components_0$1, d as __unplugin_components_1, u as useSandboxAuth } from "./types-BEa3NRi5.js";
import { defineComponent, computed, mergeProps, useSSRContext, reactive, ref, watch, onMounted, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { _ as _export_sfc, V as VERSIONS } from "../main.mjs";
import { _ as __unplugin_components_3 } from "./FcConsentOpEvidence-CYqMLIqZ.js";
import { _ as __unplugin_components_2$2 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_2$1 } from "./FcEndpointSelector-Bb7O11rk.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcTppEndpointEvidence",
  __ssrInlineRender: true,
  props: {
    endpoint: {},
    state: {},
    baseUrl: {},
    sandboxName: { default: "AlTareq Model Bank" },
    complete: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const retrieveUrl = computed(
      () => props.endpoint.tppPath ? `${props.baseUrl}${props.endpoint.tppPath}` : ""
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcFileInput = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc-ev" }, _attrs))} data-v-2d4c6b4d><div class="fc-ev__head" data-v-2d4c6b4d><span class="fc-ev__method" data-v-2d4c6b4d>${ssrInterpolate(__props.endpoint.method)}</span><code class="fc-ev__path" data-v-2d4c6b4d>${ssrInterpolate(__props.endpoint.tppPath || __props.endpoint.ozonePath)}</code><span class="${ssrRenderClass([__props.complete ? "fc-ev__status--ok" : "fc-ev__status--todo", "fc-ev__status"])}" data-v-2d4c6b4d>${ssrInterpolate(__props.complete ? "✓ Complete" : "Incomplete")}</span></div><p class="fc-ev__perms" data-v-2d4c6b4d><span class="fc-ev__perms-label" data-v-2d4c6b4d>Permission(s)</span><!--[-->`);
      ssrRenderList(__props.endpoint.permissions, (p) => {
        _push(`<code class="fc-ev__perm" data-v-2d4c6b4d>${ssrInterpolate(p)}</code>`);
      });
      _push(`<!--]--></p>`);
      if (retrieveUrl.value) {
        _push(`<p class="fc-ev__url" data-v-2d4c6b4d><span class="fc-ev__perms-label" data-v-2d4c6b4d>Retrieve from</span><code class="fc-ev__urlval" data-v-2d4c6b4d>${ssrInterpolate(retrieveUrl.value)}</code></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_FcFileInput, {
        modelValue: __props.state.postman,
        "onUpdate:modelValue": ($event) => __props.state.postman = $event,
        label: `Postman evidence (${__props.sandboxName})`,
        accept: "image/png,image/jpeg,image/webp",
        hint: `Screenshot from Postman showing you successfully retrieved this data from the sandbox ${__props.sandboxName}.`
      }, null, _parent));
      _push(`<div class="fc-ev__notes" data-v-2d4c6b4d><label class="fc-ev__label"${ssrRenderAttr("for", `tpp-notes-${__props.endpoint.slug}`)} data-v-2d4c6b4d>Notes <span class="fc-ev__opt" data-v-2d4c6b4d>(optional)</span></label><textarea${ssrRenderAttr("id", `tpp-notes-${__props.endpoint.slug}`)} class="fc-ev__textarea"${ssrRenderAttr("placeholder", `Anything worth noting about this call — e.g. which ${__props.sandboxName} account or consent you used.`)} data-v-2d4c6b4d>${ssrInterpolate(__props.state.notes)}</textarea></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcTppEndpointEvidence.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2d4c6b4d"]]);
const LOGIN_MARKER = "fc_login_attempt";
const LOGIN_COOLDOWN_MS = 2e4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcTppPortal",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const { auth, loadMe, signIn } = useSandboxAuth();
    const form = reactive(emptyTppFormState());
    const endpointStates = reactive(
      Object.fromEntries(props.area.endpoints.map((e) => [e.slug, emptyTppEndpointState()]))
    );
    const stateFor = (slug) => endpointStates[slug];
    const consentOps = computed(() => props.area.consentOps ?? []);
    const consentOpStates = reactive(
      Object.fromEntries((props.area.consentOps ?? []).map((o) => [o.slug, emptyConsentOpState()]))
    );
    const consentStateFor = (slug) => consentOpStates[slug];
    function consentOpComplete(op) {
      const st = consentStateFor(op.slug);
      if (!st.postman) return false;
      if (op.captureErrorDetails && (!st.error.trim() || !st.errorDescription.trim())) return false;
      return true;
    }
    const consentOpsComplete = computed(() => consentOps.value.every(consentOpComplete));
    const consentCompleteCount = computed(() => consentOps.value.filter(consentOpComplete).length);
    function setVersion(v) {
      form.version = v;
    }
    function toggleSegment(s) {
      form.segment = form.segment.includes(s) ? form.segment.filter((x) => x !== s) : [...form.segment, s];
    }
    const selectedOrgIds = ref([]);
    watch(
      () => auth.value.orgs,
      (orgs) => {
        if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id);
      },
      { immediate: true }
    );
    const consumable = computed(() => props.area.endpoints.filter((e) => e.tppPath));
    const STEPS = ["Your details", "Proposition & consent", "Evidence", "Review & generate"];
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
    const baseUrl = computed(() => props.area.tppBaseUrlTemplate.replace("{VERSION}", form.version));
    const sandboxName = computed(() => props.area.sandboxName ?? "AlTareq Model Bank");
    const selectedEndpoints = computed(() => consumable.value.filter((e) => stateFor(e.slug).selected));
    const permissionsInScope = computed(() => {
      const set = /* @__PURE__ */ new Set();
      for (const e of selectedEndpoints.value) e.permissions.forEach((p) => set.add(p));
      return [...set].sort();
    });
    const endpointItems = computed(
      () => consumable.value.map((e) => ({
        slug: e.slug,
        name: e.title,
        method: e.method,
        path: e.tppPath,
        selected: stateFor(e.slug).selected
      }))
    );
    function toggleEndpoint(slug) {
      const s = stateFor(slug);
      s.selected = !s.selected;
    }
    function selectAllEndpoints() {
      consumable.value.forEach((e) => stateFor(e.slug).selected = true);
    }
    function clearEndpoints() {
      consumable.value.forEach((e) => stateFor(e.slug).selected = false);
    }
    function endpointComplete(e) {
      return !!stateFor(e.slug).postman;
    }
    const completeCount = computed(() => selectedEndpoints.value.filter(endpointComplete).length);
    const allEvidenceComplete = computed(
      () => selectedEndpoints.value.length > 0 && completeCount.value === selectedEndpoints.value.length && consentOpsComplete.value
    );
    function canLeave(step) {
      var _a;
      if (step === 2) {
        return form.useCase.trim().length > 0 && selectedEndpoints.value.length > 0 && (!((_a = props.area.segments) == null ? void 0 : _a.length) || form.segment.length > 0) && form.rarObject.trim().length > 0 && form.alignmentConfirmed;
      }
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
    const canGenerate = computed(() => selectedEndpoints.value.length > 0 && !generating.value);
    function slugify(s) {
      return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    }
    computed(() => {
      const who = slugify(org.value) || "submission";
      return `functional-certification-tpp-${props.area.key}-${who}.zip`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcStepper = __unplugin_components_0$1;
      const _component_FcIdentity = __unplugin_components_1;
      const _component_FcEndpointSelector = __unplugin_components_2$1;
      const _component_EditableJson = __unplugin_components_2$2;
      const _component_FcConsentOpEvidence = __unplugin_components_3;
      const _component_FcTppEndpointEvidence = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fc" }, _attrs))} data-v-e8107f76>`);
      if (redirecting.value) {
        _push(`<div class="fc__redirect" data-v-e8107f76> Redirecting you to the Sandbox Trust Framework to sign in… </div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_FcStepper, {
          steps: STEPS,
          current: currentStep.value,
          onGo: goTo
        }, null, _parent));
        _push(`<section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}" data-v-e8107f76><h2 class="fc__h2" data-v-e8107f76>Your details</h2><p class="fc__lede" data-v-e8107f76> Your organisation and name are taken from your Sandbox Trust Framework session — the same sign-in used across the portal. Sign in so your submission is attributed to your organisation. </p>`);
        _push(ssrRenderComponent(_component_FcIdentity, {
          selected: selectedOrgIds.value,
          "onUpdate:selected": ($event) => selectedOrgIds.value = $event
        }, null, _parent));
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}" data-v-e8107f76><h2 class="fc__h2" data-v-e8107f76>Proposition &amp; consent</h2><p class="fc__lede" data-v-e8107f76> Tell us briefly why you consume Bank Data Sharing, pick the version and endpoints you consume, and provide the consent you request. </p><label class="fc__label" for="fc-usecase" data-v-e8107f76>Use case</label><p class="fc__hint" data-v-e8107f76>A sentence or two on what you use this data for — for example, powering a retail personal finance management (PFM) product with the customer’s balances and transactions.</p><textarea id="fc-usecase" class="fc__textarea fc__textarea--sm" placeholder="e.g. We aggregate the customer’s current-account balances and transactions to power a retail PFM dashboard and spending insights." data-v-e8107f76>${ssrInterpolate(form.useCase)}</textarea><label class="fc__label" data-v-e8107f76>Endpoints you consume</label>`);
        _push(ssrRenderComponent(_component_FcEndpointSelector, {
          title: __props.area.label,
          items: endpointItems.value,
          version: form.version,
          versions: unref(VERSIONS),
          segment: form.segment,
          segments: __props.area.segments,
          "onUpdate:version": setVersion,
          onToggleSegment: toggleSegment,
          onToggle: toggleEndpoint,
          onSelectAll: selectAllEndpoints,
          onClear: clearEndpoints
        }, null, _parent));
        _push(`<label class="fc__label" for="fc-rar" data-v-e8107f76>Consent — authorization_details (RAR object)</label><p class="fc__hint" data-v-e8107f76> Edit the <code data-v-e8107f76>authorization_details</code> entry below to match your consent request. This is the <strong data-v-e8107f76>Rich Authorization Requests (RAR)</strong> object defined by <a href="https://datatracker.ietf.org/doc/html/rfc9396" target="_blank" rel="noopener" data-v-e8107f76>RFC 9396</a>: the entry you send at <code data-v-e8107f76>/par</code> that declares the permissions and scope of the consent. It is validated against the OpenAPI schema — edits commit on blur, and anything that does not match the schema reverts. </p>`);
        if (__props.area.rarEditor) {
          _push(ssrRenderComponent(_component_EditableJson, {
            spec: __props.area.rarEditor.spec,
            "schema-name": __props.area.rarEditor.schemaName,
            "initial-data": __props.area.rarEditor.initialData,
            "state-field": "fcRarObject",
            label: "authorization_details",
            description: "PAR request body entry",
            "onUpdate:json": ($event) => form.rarObject = $event
          }, null, _parent));
        } else {
          _push(`<textarea id="fc-rar" class="fc__textarea fc__textarea--mono" spellcheck="false" placeholder="{ &quot;type&quot;: &quot;urn:openfinanceuae:account-access-consent:v2.1&quot;, &quot;consent&quot;: { &quot;Permissions&quot;: [ … ] } }" data-v-e8107f76>${ssrInterpolate(form.rarObject)}</textarea>`);
        }
        if (permissionsInScope.value.length) {
          _push(`<p class="fc__perms-note" data-v-e8107f76><span class="fc__id-label" data-v-e8107f76>Permissions your selected endpoints require</span><!--[-->`);
          ssrRenderList(permissionsInScope.value, (p) => {
            _push(`<code class="fc__perm" data-v-e8107f76>${ssrInterpolate(p)}</code>`);
          });
          _push(`<!--]--></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="fc__confirm" data-v-e8107f76><input${ssrIncludeBooleanAttr(Array.isArray(form.alignmentConfirmed) ? ssrLooseContain(form.alignmentConfirmed, null) : form.alignmentConfirmed) ? " checked" : ""} type="checkbox" data-v-e8107f76><span data-v-e8107f76>I confirm the permissions in my <code data-v-e8107f76>authorization_details</code> object align to the endpoints selected above — I request no permission I do not consume, and consume no endpoint I have not requested.</span></label></section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}" data-v-e8107f76><h2 class="fc__h2" data-v-e8107f76>Evidence</h2><p class="fc__lede" data-v-e8107f76> For each endpoint, attach a Postman screenshot showing you successfully retrieved the data from the sandbox <a${ssrRenderAttr("href", __props.area.sandboxEvidenceHref)} data-v-e8107f76>${ssrInterpolate(sandboxName.value)}</a>. Start from its discovery endpoint: </p>`);
        if (__props.area.wellKnownUrl) {
          _push(`<p class="fc__wellknown" data-v-e8107f76><span class="fc__id-label" data-v-e8107f76>${ssrInterpolate(sandboxName.value)} .well-known</span><code data-v-e8107f76>${ssrInterpolate(__props.area.wellKnownUrl)}</code></p>`);
        } else {
          _push(`<!---->`);
        }
        if (consentOps.value.length) {
          _push(`<!--[--><h3 class="fc__h3" data-v-e8107f76>Consent management</h3><p class="fc__sub" data-v-e8107f76> These consent-lifecycle operations are certified for every TPP, whichever endpoints you consume. Retrieve and revoke a consent you staged against the sandbox ${ssrInterpolate(sandboxName.value)}, and attach a Postman screenshot of a successful call for each. </p><div class="${ssrRenderClass([{ "fc__progress-note--done": consentOpsComplete.value }, "fc__progress-note"])}" data-v-e8107f76>${ssrInterpolate(consentCompleteCount.value)} of ${ssrInterpolate(consentOps.value.length)} consent operations complete. </div><!--[-->`);
          ssrRenderList(consentOps.value, (op) => {
            _push(ssrRenderComponent(_component_FcConsentOpEvidence, {
              key: op.slug,
              op,
              state: consentStateFor(op.slug),
              version: form.version,
              complete: consentOpComplete(op)
            }, null, _parent));
          });
          _push(`<!--]--><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="fc__h3" data-v-e8107f76>Endpoint evidence</h3>`);
        if (selectedEndpoints.value.length === 0) {
          _push(`<div class="fc__empty" data-v-e8107f76> You haven’t selected any endpoints yet. <button type="button" class="fc__link" data-v-e8107f76>Go back to select endpoints</button>. </div>`);
        } else {
          _push(`<!--[--><div class="${ssrRenderClass([{ "fc__progress-note--done": allEvidenceComplete.value }, "fc__progress-note"])}" data-v-e8107f76>${ssrInterpolate(completeCount.value)} of ${ssrInterpolate(selectedEndpoints.value.length)} endpoints complete${ssrInterpolate(allEvidenceComplete.value ? " — you can continue." : ".")}</div><!--[-->`);
          ssrRenderList(selectedEndpoints.value, (e) => {
            _push(ssrRenderComponent(_component_FcTppEndpointEvidence, {
              key: e.slug,
              endpoint: e,
              state: stateFor(e.slug),
              "base-url": baseUrl.value,
              "sandbox-name": sandboxName.value,
              complete: endpointComplete(e)
            }, null, _parent));
          });
          _push(`<!--]--><!--]-->`);
        }
        _push(`</section><section class="fc__panel" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}" data-v-e8107f76><h2 class="fc__h2" data-v-e8107f76>Review &amp; generate</h2><p class="fc__lede" data-v-e8107f76> Review the summary below, add any comments, then download your submission. The ZIP contains a <code data-v-e8107f76>summary.html</code> plus every screenshot — attach it to your <strong data-v-e8107f76>${ssrInterpolate(__props.area.certType)}</strong> Service Desk ticket. </p><dl class="fc__review" data-v-e8107f76><div data-v-e8107f76><dt data-v-e8107f76>Organisation</dt><dd data-v-e8107f76>${ssrInterpolate(org.value || "—")}</dd></div><div data-v-e8107f76><dt data-v-e8107f76>Submitted by</dt><dd data-v-e8107f76>${ssrInterpolate(identityName.value || "—")}</dd></div><div data-v-e8107f76><dt data-v-e8107f76>Version</dt><dd data-v-e8107f76>${ssrInterpolate(form.version.toUpperCase())}</dd></div>`);
        if (__props.area.segments && __props.area.segments.length) {
          _push(`<div data-v-e8107f76><dt data-v-e8107f76>Segment</dt><dd data-v-e8107f76>${ssrInterpolate(form.segment.join(", ") || "—")}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-e8107f76><dt data-v-e8107f76>Endpoints consumed</dt><dd data-v-e8107f76>${ssrInterpolate(selectedEndpoints.value.length)}</dd></div>`);
        if (consentOps.value.length) {
          _push(`<div data-v-e8107f76><dt data-v-e8107f76>Consent operations</dt><dd data-v-e8107f76>${ssrInterpolate(consentOps.value.length)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-e8107f76><dt data-v-e8107f76>Permissions aligned</dt><dd data-v-e8107f76>${ssrInterpolate(form.alignmentConfirmed ? "Confirmed" : "Not confirmed")}</dd></div></dl><div class="fc-comment" data-v-e8107f76><label class="fc-comment__label" for="fc-comments" data-v-e8107f76>Comments <span class="fc__opt" data-v-e8107f76>(optional)</span></label><textarea id="fc-comments" class="fc-comment__field" placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above." data-v-e8107f76>${ssrInterpolate(form.comments)}</textarea></div>`);
        if (genError.value) {
          _push(`<p class="fc__error" data-v-e8107f76>Could not build the submission: ${ssrInterpolate(genError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><div class="fc__nav" data-v-e8107f76><button type="button" class="fc__btn"${ssrIncludeBooleanAttr(currentStep.value === 1) ? " disabled" : ""} data-v-e8107f76>Back</button><span class="fc__nav-pos" data-v-e8107f76>Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(STEPS.length)}</span>`);
        if (currentStep.value < STEPS.length) {
          _push(`<button type="button" class="fc__btn"${ssrIncludeBooleanAttr(!canAdvance.value) ? " disabled" : ""} data-v-e8107f76> Next </button>`);
        } else {
          _push(`<button type="button" class="fc__btn fc__btn--primary"${ssrIncludeBooleanAttr(!canGenerate.value) ? " disabled" : ""} data-v-e8107f76>${ssrInterpolate(generating.value ? "Building…" : "Download Functional Certification Submission")}</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcTppPortal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e8107f76"]]);
export {
  __unplugin_components_0 as _
};
