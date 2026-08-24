import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Insurance Data Sharing — Requirements",
  version: "v2.2-rc1",
  readTime: "10 min",
  lede: 'The <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/requirements">Authentication requirements</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a>, and <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: `The tables below list the rules that apply to Insurance Data Sharing. All request validation of the TPP's credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoints are called. The rules below cover what your Ozone Connect endpoints must validate and what they must return. The cross-cutting <a href="#policy-access-validation">Policy Access Validation</a> check applies to <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code>. <strong>Insurance has a five-year data retention floor</strong> — your Ozone Connect endpoints MUST return policies from the last five years regardless of current <code>PolicyStatus</code>; there is no status-based <code>403</code>.`,
  sections: [
    {
      id: "consent-validation",
      num: "01",
      title: "Consent Validation",
      blocks: [
        { kind: "prose", html: 'When a TPP creates an insurance consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint before the consent is created. You MUST validate the consent and respond with <code>status: "valid"</code> or <code>status: "invalid"</code>. If you respond with <code>invalid</code>, the API Hub will not create the consent and the TPP will receive an error. This validation runs before the customer is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil. The field names in the rules below match the Ozone Connect <code>newConsent</code> payload the Hub delivers — <code>consentType</code> is <code>cbuae-insurance-consents</code>, <code>standardVersion</code> sits at the top level of the consent object, and <code>Permissions</code> sits under <code>consentBody.Data</code> as an array of <code>{ InsuranceType, Permissions[] }</code> blocks.' },
        { kind: "table", table: {
          headers: ["#", "Rule", "Detail"],
          rows: [
            { cells: ["1", "Unsupported <code>standardVersion</code>", `The consent's <code>standardVersion</code> (a top-level property on the consent object) is the URL path version the TPP will call on subsequent insurance requests. If you do not support that version for the Insurance API family, respond with <code>invalid</code>. <br><br> Where you are dual-running multiple versions during a deprecation window (see <a href="/policy/lfi-deprecation">Major Version Deprecation</a>) — for example <code>v2.0</code> alongside <code>v3.1</code> — you MUST respond <code>valid</code> for every version you serve. <br><br> Minor versions are backward compatible (see <a href="/policy/version-management">Version Management</a>), so prior minors within each major you run are also valid (e.g. running <code>v2.0</code> and <code>v3.1</code> means <code>v2.0</code>, <code>v3.0</code>, and <code>v3.1</code> all resolve to <code>valid</code>).`] },
            { cells: ["2", "Unsupported <code>InsuranceType</code>", "If any per-sector block in <code>consent.Permissions</code> references an <code>InsuranceType</code> the LFI does not underwrite (e.g. the LFI does not offer <code>Renters</code> products but the consent requests <code>Renters</code>), respond with <code>invalid</code>. Validate against the sectors you have onboarded with Nebras."] },
            { cells: ["3", "Unsupported permissions", "If a per-sector block requests a permission the LFI does not surface for that sector (e.g. the consent includes <code>ReadCustomerClaims</code> for <code>Motor</code> but the LFI does not yet expose claims for Motor policies), respond with <code>invalid</code>."] },
            { cells: ["4", "<code>ReadInsurancePolicies</code> required per sector", "Every per-sector block MUST contain <code>ReadInsurancePolicies</code> — it is the base permission that gates list and detail access. If a block omits it, respond with <code>invalid</code>."] },
            { cells: ["5", "Invalid <code>BaseConsentId</code>", "If the consent includes a <code>BaseConsentId</code>, validate that: <ul><li>The <code>BaseConsentId</code> references an existing consent known to the LFI.</li><li>The referenced consent is an Insurance Data Sharing consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:insurance-consent:*</code>).</li><li>The referenced consent does not itself have a <code>BaseConsentId</code> — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The <code>BaseConsentId</code> must always reference the original root consent.</li></ul> If any of these checks fail, respond with <code>invalid</code>."] }
          ]
        } }
      ]
    },
    {
      id: "authorization-policy-selection",
      num: "02",
      title: "Authorization — Policy Selection",
      blocks: [
        { kind: "prose", html: 'The generic <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a> apply to this journey. The rules below cover the additional policy selection logic specific to Insurance Data Sharing. During the consent authorization journey, the customer selects which of their policies to share with the TPP, scoped to the sectors the consent grants.' },
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>consent.Permissions[*].InsuranceType</code>", "Only present policies of sectors listed in <code>consent.Permissions</code>. A consent that grants <code>Motor</code> and <code>Home</code> only surfaces policies in those two sectors — Travel and Health policies the customer may also hold MUST NOT appear."] },
            { cells: ["2", "Five-year selection window", "Within each consented sector, present every policy the customer holds or has held in the last <strong>five years</strong>, regardless of current <code>PolicyStatus</code>. Historical policies (<code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>Surrendered</code>, etc.) MUST be selectable so the customer can share historical insurance history for switching, broking, and advisory use cases. Each row MUST clearly label the policy's current <code>PolicyStatus</code> so the customer is not misled into thinking a lapsed policy is still active."] },
            { cells: ["3", "No eligible policies", 'If the authenticated customer does not hold any policies within the five-year window across any of the consented sectors, PATCH the consent to <code>Rejected</code> and call <code>doFail</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_policies</code>. See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements">Authorization requirements</a> for details.'] },
            { cells: ["4", "Multiple selection", "The policy selection screen must allow the customer to select more than one policy and to select policies across different sectors in a single consent. A consent with no policies selected must not be authorised."] },
            { cells: ["5", "<code>insurancePolicyIds</code> patch", 'On successful authorization, PATCH the consent with <code>insurancePolicyIds</code> set to the array of <code>InsurancePolicyId</code> values the customer selected. This array is the authoritative consented set used by every subsequent data sharing request — see <a href="#policy-access-validation">Policy Access Validation</a>.'] }
          ]
        } }
      ]
    },
    {
      id: "list-policies",
      num: "03",
      method: "GET",
      path: "/{type}-insurance-policies",
      title: "List Policies (per sector)",
      blocks: [
        { kind: "prose", html: "The Hub calls this endpoint with the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, or <code>travel</code>) baked into the path and passes <code>InsurancePolicyIds</code> as a query parameter listing the IDs the consent authorised for that sector." },
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>InsurancePolicyIds</code>", "Return the policies whose <code>InsurancePolicyId</code> matches one of the values in the <code>InsurancePolicyIds</code> query parameter and whose sector matches the URL path. Populate the <code>PolicyStatus</code> field on each policy so the TPP can see the current state."] },
            { cells: ["2", "Five-year retention", "Return every consented policy from the last <strong>five years</strong> regardless of current <code>PolicyStatus</code>. This is a minimum availability floor, not a query limit — the endpoint MAY return policies older than five years where it holds them. A <code>PolicyStatus</code> of <code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>Surrendered</code>, etc. MUST NOT cause the policy to be omitted from the response within the retention window."] },
            { cells: ["3", "Data completeness", "All fields that exist or are derivable from your systems must be populated on each policy. All fields marked as required in the OpenAPI spec must be present, including <code>InsurancePolicyId</code>, <code>PolicyNumber</code>, <code>PolicyStatus</code>, <code>Insurer</code>, and the sector-specific identifiers."] },
            { cells: ["4", "<code>Premium</code>", 'If the consent for this sector includes <code>ReadInsurancePremium</code>, populate the <code>Premium</code> field on each policy in either the cleartext or JWE shape per <a href="#premium-encryption">Premium Encryption</a>. If the consent does not include <code>ReadInsurancePremium</code>, omit the <code>Premium</code> field entirely — do not return an empty object or a placeholder.'] },
            { cells: ["5", "Permission-scoped fields", "Populate optional field sets only when the matching permission is granted in the per-sector block: <code>ReadCustomerBasic</code> / <code>ReadCustomerDetail</code> for policy-holder identity; <code>ReadCustomerPaymentDetails</code> for payment methods; <code>ReadInsuranceProduct</code> for underwritten product detail; <code>ReadCustomerClaims</code> for claims history. Fields the consent does not unlock MUST be omitted."] },
            { cells: ["6", "No pagination", "Return every matching policy in a single response. There is no <code>page</code> query parameter on the TPP-facing API, and <code>Meta</code> MUST NOT include <code>TotalPages</code> or <code>TotalRecords</code>. The full consented set for the sector MUST fit in one payload."] },
            { cells: ["7", "Empty result", "If the customer holds no policies in the sector within the five-year window, return <code>200</code> with an empty <code>Policy</code> array. Do not return <code>404</code>."] },
            { cells: ["8", "Policy access", 'For every <code>InsurancePolicyId</code> in the <code>InsurancePolicyIds</code> query parameter, validate that the policy is held — or was held within the five-year window — by the customer resolved from <code>o3-psu-identifier</code>. If any requested policy is not held by the customer, return <code>403</code> per <a href="#policy-access-validation">Policy Access Validation</a>.'] }
          ]
        } }
      ]
    },
    {
      id: "get-policy",
      num: "04",
      method: "GET",
      path: "/{type}-insurance-policies/{InsurancePolicyId}",
      title: "Get a Policy",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "<code>policy</code>", "Return the single policy whose <code>InsurancePolicyId</code> matches the value in the path parameter and whose sector matches the URL path."] },
            { cells: ["2", "Five-year retention", "Return the policy regardless of current <code>PolicyStatus</code>, provided its end date (or last activity date) is within the last <strong>five years</strong>. There is no status-based <code>403</code> on this endpoint — the policy is the artifact, and the customer has consented to share it."] },
            { cells: ["3", "Data completeness", "All fields that exist or are derivable from your systems must be populated, consistent with what is returned by the list endpoint for the same policy. All fields marked as required in the OpenAPI spec must be present."] },
            { cells: ["4", "<code>Premium</code>", 'If the consent includes <code>ReadInsurancePremium</code>, populate <code>Premium</code> in either the cleartext or JWE shape per <a href="#premium-encryption">Premium Encryption</a>. Otherwise omit the field.'] },
            { cells: ["5", "Permission-scoped fields", "Populate optional field sets only when the matching permission is granted in the per-sector block. Fields the consent does not unlock MUST be omitted from the detail response, the same way as on the list response."] },
            { cells: ["6", "Policy access", 'Validate that the <code>InsurancePolicyId</code> in the path parameter is part of the consented set held by the customer resolved from <code>o3-psu-identifier</code>. Apply the <a href="#policy-access-validation">Policy Access Validation</a> check before returning — an ID outside the consented set MUST return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code>.'] }
          ]
        } }
      ]
    },
    {
      id: "premium-encryption",
      num: "05",
      title: "Premium Encryption",
      blocks: [
        { kind: "prose", html: 'The <code>Premium</code> field on every insurance policy response is defined as <code>anyOf</code> a structured <code>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> object or an <code>AEInsurance.AEInsurancePremiumJWE</code> compact string. Your LFI decides, per policy, which shape to return. The rules below cover both shapes. See the <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/api-guide/premiums">producer-side walkthrough</a> for end-to-end detail.' },
        { kind: "table", table: {
          headers: ["#", "Field", "Rule"],
          rows: [
            { cells: ["1", "Permission gating", "Only populate <code>Premium</code> when the per-sector block in <code>consent.Permissions</code> includes <code>ReadInsurancePremium</code>. If the permission is absent, omit the field entirely."] },
            { cells: ["2", "<code>Premium</code> format", "<code>Premium</code> may be returned as either a cleartext <code>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> JSON object or as a JWE compact serialisation string. Encryption is at the LFI's discretion per policy."] },
            { cells: ["3", "<code>Premium</code> — JWE", "If encrypting <code>Premium</code>, generate an ephemeral symmetric encryption key per response (must not be reused). Encrypt the structured premium payload as a JWE using the content encryption algorithm required by the Security Profile. Set <code>exp</code> to 30 minutes from the time of the response and set <code>kid</code> to the value of <code>x-fapi-interaction-id</code>. Transmit the encryption key to the User via an existing LFI channel (e.g. SMS or push notification) — do not include it in the API response."] },
            { cells: ["4", "Shape exclusivity", "A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE."] }
          ]
        } }
      ]
    },
    {
      id: "policy-access-validation",
      num: "06",
      title: "Policy Access Validation",
      blocks: [
        { kind: "prose", html: "Every endpoint that takes a policy identifier — whether as the <code>InsurancePolicyId</code> path parameter on <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code> or as values in the <code>InsurancePolicyIds</code> query parameter on <code>GET /{type}-insurance-policies</code> — MUST validate that each policy is part of the consented set held by the customer resolved from the <code>o3-psu-identifier</code> header before applying the per-endpoint rules above. Policy ownership is authoritative on the LFI side — the Hub stores the <code>insurancePolicyIds</code> patched onto the consent at authorization, but the LFI is the source of truth for which policies the customer actually holds or has held." },
        { kind: "prose", html: "If any requested policy is not part of the consented set, return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code> and <code>errorMessage</code>: <code>The policy is permanently inaccessible.</code> This check applies uniformly regardless of <code>PolicyStatus</code> — a policy that is <code>Lapsed</code> or <code>Expired</code> is still readable provided it is in the consented set; a policy that is <code>Active</code> but outside the consented set MUST NOT be returned." }
      ]
    }
  ]
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "requirements",
  __ssrInlineRender: true,
  setup(__props) {
    function validatorClass(v) {
      if (v === "API Hub") return "ed-req-validator--hub";
      if (v === "TPP") return "ed-req-validator--tpp";
      if (v === "N/A") return "ed-req-validator--none";
      if (v.startsWith("LFI")) return "ed-req-validator--lfi";
      return "ed-req-validator--lfi";
    }
    function splitValidator(v) {
      const m = v.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
      if (m && m[1] && m[2]) return { label: m[1].trim(), detail: m[2].trim() };
      return { label: v, detail: null };
    }
    function methodClass(m) {
      return m ? `http-${m.toLowerCase()}` : "";
    }
    function genericGridTemplate(headers) {
      var _a;
      const tracks = [];
      for (let i = 0; i < headers.length; i++) {
        const h = ((_a = headers[i]) == null ? void 0 : _a.trim()) ?? "";
        const isFirst = i === 0;
        const isLast = i === headers.length - 1;
        if (isFirst && h === "#") tracks.push("2.5rem");
        else if (isLast) tracks.push("minmax(0, 2.4fr)");
        else tracks.push("minmax(11rem, 1fr)");
      }
      return tracks.join(" ");
    }
    const eyebrow = computed(() => data.eyebrow ?? "Validate · Enforce · Trust");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-c419bde9><section class="ed-req-hero" data-v-c419bde9><div class="ed-req-hero__inner" data-v-c419bde9><div class="ed-req-hero__label" data-v-c419bde9><span class="ed-req-hero__label-dash" data-v-c419bde9></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-c419bde9>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-c419bde9>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-c419bde9>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-c419bde9>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-c419bde9>${unref(data).preconditions ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><!--[-->`);
      ssrRenderList(unref(data).sections, (s, i) => {
        _push(ssrRenderComponent(_component_EdSectionBand, {
          id: s.id,
          key: s.id,
          num: s.num,
          tone: i % 2 === 0 ? "cream" : "surface",
          eyebrow: s.method && s.path ? "Endpoint" : "Section",
          title: s.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (s.method && s.path) {
                _push2(`<div class="ed-req-endpoint" data-v-c419bde9${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-c419bde9${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-c419bde9${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c419bde9${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-c419bde9${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-c419bde9${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-c419bde9${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c419bde9${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-c419bde9${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c419bde9${_scopeId}>${c ?? ""}</div>`);
                    });
                    _push2(`<!--]--></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (s.rules && s.rules.length) {
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-c419bde9${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c419bde9${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-c419bde9${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-c419bde9${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-c419bde9${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-c419bde9${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-c419bde9${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-c419bde9${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-c419bde9${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-c419bde9${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-c419bde9${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-c419bde9${_scopeId}><span class="ed-req-validator__label" data-v-c419bde9${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-c419bde9${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</span></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (s.table) {
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-c419bde9${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-c419bde9${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c419bde9${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-c419bde9${_scopeId}><h3 class="ed-req-sub__heading" data-v-c419bde9${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c419bde9${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-c419bde9${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-c419bde9${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-c419bde9${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c419bde9${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-c419bde9${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c419bde9${_scopeId}>${c ?? ""}</div>`);
                      });
                      _push2(`<!--]--></div>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.subsections || [], (sub2, s2i) => {
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-c419bde9${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-c419bde9${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-c419bde9${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-c419bde9${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-c419bde9${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-c419bde9${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-c419bde9${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-c419bde9${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-c419bde9${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-c419bde9${_scopeId}>${c ?? ""}</div>`);
                        });
                        _push2(`<!--]--></div>`);
                      });
                      _push2(`<!--]--></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                s.method && s.path ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ed-req-endpoint"
                }, [
                  createVNode("span", {
                    class: ["http-badge", methodClass(s.method)]
                  }, toDisplayString(s.method), 3),
                  createVNode("code", { class: "ed-req-endpoint__path" }, toDisplayString(s.path), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.callouts || [], (c, ci) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-callout-${ci}`,
                    class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                  }, [
                    c.title ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ed-req-callout__title"
                    }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "ed-req-callout__body",
                      innerHTML: c.html
                    }, null, 8, ["innerHTML"])
                  ], 2);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(s.blocks || [], (b, bi) => {
                  return openBlock(), createBlock(Fragment, {
                    key: `${s.id}-blk-${bi}`
                  }, [
                    b.kind === "prose" ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "ed-req-intro",
                      innerHTML: b.html
                    }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "ed-req-table ed-req-table--generic",
                      role: "table",
                      "aria-label": s.title,
                      style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                    }, [
                      createVNode("div", {
                        class: "ed-req-row ed-req-row--head",
                        role: "row"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-blk-${bi}-h-${hi}`,
                            class: "ed-req-cell",
                            role: "columnheader"
                          }, toDisplayString(h), 1);
                        }), 128))
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-blk-${bi}-r-${ri}`,
                          class: "ed-req-row",
                          role: "row"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-blk-${bi}-r-${ri}-c-${ci}`,
                              class: "ed-req-cell ed-req-cell--generic",
                              role: "cell",
                              innerHTML: c
                            }, null, 8, ["innerHTML"]);
                          }), 128))
                        ]);
                      }), 128))
                    ], 12, ["aria-label"])) : createCommentVNode("", true)
                  ], 64);
                }), 128)),
                s.rules && s.rules.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "ed-req-table",
                  role: "table",
                  "aria-label": s.title
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--num",
                      role: "columnheader"
                    }, "#"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--field",
                      role: "columnheader"
                    }, "Field"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--rule",
                      role: "columnheader"
                    }, "Rule"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--validator",
                      role: "columnheader"
                    }, "Validated by")
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.rules, (r, idx) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-rule-${idx}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--num",
                        role: "cell"
                      }, toDisplayString(idx + 1), 1),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--field",
                        role: "cell",
                        innerHTML: r.field
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--rule",
                        role: "cell",
                        innerHTML: r.rule
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--validator",
                        role: "cell"
                      }, [
                        createVNode("span", {
                          class: ["ed-req-validator", validatorClass(r.validatedBy)]
                        }, [
                          createVNode("span", { class: "ed-req-validator__label" }, toDisplayString(splitValidator(r.validatedBy).label), 1),
                          splitValidator(r.validatedBy).detail ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ed-req-validator__detail"
                          }, toDisplayString(splitValidator(r.validatedBy).detail), 1)) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ]);
                  }), 128))
                ], 8, ["aria-label"])) : createCommentVNode("", true),
                s.table ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "ed-req-table ed-req-table--generic",
                  role: "table",
                  "aria-label": s.title,
                  style: { gridTemplateColumns: genericGridTemplate(s.table.headers) }
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(s.table.headers, (h, hi) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-h-${hi}`,
                        class: "ed-req-cell",
                        role: "columnheader"
                      }, toDisplayString(h), 1);
                    }), 128))
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.table.rows, (r, ri) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-r-${ri}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-r-${ri}-c-${ci}`,
                          class: "ed-req-cell ed-req-cell--generic",
                          role: "cell",
                          innerHTML: c
                        }, null, 8, ["innerHTML"]);
                      }), 128))
                    ]);
                  }), 128))
                ], 12, ["aria-label"])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.subsections || [], (sub, si) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-sub-${si}`,
                    class: "ed-req-sub"
                  }, [
                    createVNode("h3", { class: "ed-req-sub__heading" }, toDisplayString(sub.heading), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.callouts || [], (c, ci) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-callout-${ci}`,
                        class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                      }, [
                        c.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ed-req-callout__title"
                        }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "ed-req-callout__body",
                          innerHTML: c.html
                        }, null, 8, ["innerHTML"])
                      ], 2);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.blocks || [], (b, bi) => {
                      return openBlock(), createBlock(Fragment, {
                        key: `${s.id}-sub-${si}-blk-${bi}`
                      }, [
                        b.kind === "prose" ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "ed-req-sub__intro",
                          innerHTML: b.html
                        }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                          role: "table",
                          "aria-label": sub.heading,
                          style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                        }, [
                          createVNode("div", {
                            class: "ed-req-row ed-req-row--head",
                            role: "row"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                              return openBlock(), createBlock("div", {
                                key: `${s.id}-sub-${si}-blk-${bi}-h-${hi}`,
                                class: "ed-req-cell",
                                role: "columnheader"
                              }, toDisplayString(h), 1);
                            }), 128))
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}`,
                              class: "ed-req-row",
                              role: "row"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}-c-${ci}`,
                                  class: "ed-req-cell ed-req-cell--generic",
                                  role: "cell",
                                  innerHTML: c
                                }, null, 8, ["innerHTML"]);
                              }), 128))
                            ]);
                          }), 128))
                        ], 12, ["aria-label"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.subsections || [], (sub2, s2i) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-sub2-${s2i}`,
                        class: "ed-req-sub ed-req-sub--nested"
                      }, [
                        createVNode("h4", { class: "ed-req-sub__heading ed-req-sub__heading--nested" }, toDisplayString(sub2.heading), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.callouts || [], (c, ci) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-callout-${ci}`,
                            class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                          }, [
                            c.title ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "ed-req-callout__title"
                            }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                            createVNode("div", {
                              class: "ed-req-callout__body",
                              innerHTML: c.html
                            }, null, 8, ["innerHTML"])
                          ], 2);
                        }), 128)),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.blocks || [], (b, bi) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}`
                          }, [
                            b.kind === "prose" ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "ed-req-sub__intro",
                              innerHTML: b.html
                            }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                              role: "table",
                              "aria-label": sub2.heading,
                              style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                            }, [
                              createVNode("div", {
                                class: "ed-req-row ed-req-row--head",
                                role: "row"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                                  return openBlock(), createBlock("div", {
                                    key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-h-${hi}`,
                                    class: "ed-req-cell",
                                    role: "columnheader"
                                  }, toDisplayString(h), 1);
                                }), 128))
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}`,
                                  class: "ed-req-row",
                                  role: "row"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                    return openBlock(), createBlock("div", {
                                      key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}-c-${ci}`,
                                      class: "ed-req-cell ed-req-cell--generic",
                                      role: "cell",
                                      innerHTML: c
                                    }, null, 8, ["innerHTML"]);
                                  }), 128))
                                ]);
                              }), 128))
                            ], 12, ["aria-label"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c419bde9"]]);
export {
  requirements as default
};
