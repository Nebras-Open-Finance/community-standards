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
  version: "v2.1",
  readTime: "10 min",
  lede: 'The validation rules that apply to Insurance Data Sharing. The <strong>Validated by</strong> column on each table indicates where each rule is enforced. Read alongside the <a href="/tech/tpp-standards/v2.1/consent/requirements">Consent requirements</a> and the <a href="./user-journeys">User Journeys</a>.',
  preconditions: 'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>ISP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing, and — when requesting <code>ReadInsurancePremium</code> — an active <a href="/tech/tpp-standards/trust-framework/certificates">encryption key</a> for decrypting the <code>Premium</code> JWE on the customer device.',
  sections: [
    {
      id: "post-par",
      num: "01",
      method: "POST",
      path: "/par",
      title: "Consent Creation",
      intro: 'The consent is submitted inside a signed <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> sent to the Authorization Server. The <code>consent.*</code> fields referenced below are nested as <code>authorization_details[0].consent</code> within that JWT. The POST body must also include a <a href="/tech/tpp-standards/security/tokens/client-assertion">client assertion</a> to authenticate the TPP application.',
      rules: [
        { field: "Request JWT", rule: 'Must conform to the <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT requirements</a> — correct <code>aud</code>, signing algorithm (<code>PS256</code>), and expiry window.', validatedBy: "API Hub" },
        { field: "<code>client_assertion</code>", rule: 'Must be included in the POST body (<code>client_assertion_type</code>: <code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>). Authenticates the TPP application — see <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a>.', validatedBy: "API Hub" },
        { field: "<code>scope</code> (in Request JWT)", rule: "Must be <code>openid insurance</code>.", validatedBy: "API Hub" },
        { field: "<code>authorization_details[0].type</code> (in Request JWT)", rule: "Must be <code>urn:openfinanceuae:insurance-consent:v2.1</code>.", validatedBy: "API Hub" },
        { field: "API version supported", rule: 'The consent version in <code>authorization_details[0].type</code> (e.g. <code>urn:openfinanceuae:insurance-consent:v2.1</code>) restricts the version of the Insurance endpoints the consent can be used to call (specified in the path, e.g. <code>/open-finance/insurance/v2.1/motor-insurance-policies</code>). It MUST resolve to an <code>ApiVersion</code> the LFI has published in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a> for the Insurance API family.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "OpenAPI schema", rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/consent/open-api/par">POST <code>/par</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code> structure", rule: "Must be a non-empty array. Each entry is a per-sector block of the form <code>{ InsuranceType, Permissions[] }</code>. There MUST be at least one block, and each block MUST contain at least one permission code.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions[*].InsuranceType</code>", rule: "Each value must be one of: <code>Employment</code>, <code>Health</code>, <code>Home</code>, <code>Life</code>, <code>Motor</code>, <code>Renters</code>, <code>Travel</code>. Each sector may appear at most once in the array. The sector must also be one the LFI underwrites — if the LFI does not offer the requested sector, the validate hook will reject the consent.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.Permissions[*].Permissions</code>", rule: "Within each per-sector block, <code>ReadInsurancePolicies</code> MUST be present — it is the base permission that gates list and detail access for the sector. Other permissions (<code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, <code>ReadCustomerPaymentDetails</code>, <code>ReadInsuranceProduct</code>, <code>ReadCustomerClaims</code>, <code>ReadInsurancePremium</code>) MAY be included and unlock the corresponding field sets on the policy response.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions[*].Permissions</code> — <code>ReadInsurancePremium</code>", rule: '<code>ReadInsurancePremium</code> MUST only be requested by TPPs that hold the <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">Access Encrypted Resource Data</a> optional certification with Nebras. An uncertified TPP MUST NOT include this permission in any per-sector block; if it does, the API Hub rejects the consent. Only certified TPPs are permitted to receive insurance premium data, whether the LFI returns it in cleartext or as an encrypted JWE.', validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code> (unsupported)", rule: "If a per-sector block requests a permission the LFI does not expose for that sector (e.g. <code>ReadCustomerClaims</code> for a sector the LFI does not surface claims on), the consent validation will fail.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.BaseConsentId</code>", rule: "If provided, must reference a previous consent belonging to the <strong>same end user</strong> and must be an Insurance Data Sharing consent (<code>authorization_details[0].type</code> is <code>urn:openfinanceuae:insurance-consent:*</code>). If the original consent in the chain already had a <code>BaseConsentId</code>, the TPP must reuse that same <code>BaseConsentId</code> rather than the immediate prior <code>ConsentId</code>.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.ExpirationDateTime</code>", rule: "Must not be in the past. Must be less than one year in the future.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" }
      ]
    },
    {
      id: "authorization",
      num: "02",
      title: "Authorization — Policy Selection",
      intro: 'The LFI presents the policies the customer can share against the consent. Policies are selectable up to <strong>five years</strong> back regardless of current <code>PolicyStatus</code> — see <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements">LFI Insurance Data Sharing Requirements</a> for the producer-side rule. TPPs should expect historical policies (Lapsed, Expired, Cancelled, etc.) in the consented set and render them with their <code>PolicyStatus</code>.',
      rules: [
        { field: "Eligible policies", rule: "If the authenticated customer does not hold any policies in any of the consented <code>InsuranceType</code> sectors, the consent will be set to <code>Rejected</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_policies</code>.", validatedBy: "LFI" },
        { field: "Selection breadth", rule: "The selection screen must allow the customer to choose any subset of policies surfaced. A consent with no policies selected must not be authorised.", validatedBy: "LFI" }
      ]
    },
    {
      id: "get-policies",
      num: "03",
      method: "GET",
      path: "/{type}-insurance-policies",
      title: "List Policies",
      intro: "Substitute <code>{type}</code> with one of the seven sector slugs: <code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>, <code>motor</code>, <code>renters</code>, <code>travel</code>. Call once per sector the consent grants. The response returns every consented policy in the sector — there is no pagination.",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token issued with the <code>openid insurance</code> scope. The consent bound to the token must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.", validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path (e.g. <code>v2.1</code> in <code>/open-finance/insurance/v2.1/motor-insurance-policies</code>) must match the version in the consent’s <code>authorization_details[0].type</code> (<code>urn:openfinanceuae:insurance-consent:v2.1</code>).", validatedBy: "API Hub" },
        { field: "<code>{type}</code> path segment", rule: "Must match an <code>InsuranceType</code> present in <code>consent.Permissions</code>. A call to a sector the consent does not grant returns <code>403</code>.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The per-sector block for the requested <code>InsuranceType</code> must include <code>ReadInsurancePolicies</code>.", validatedBy: "API Hub" },
        { field: "Pagination", rule: "Not applicable. The endpoint returns the full set of consented policies for the sector in a single response — there is no <code>page</code> query parameter, and <code>Meta</code> does not include <code>TotalPages</code> or <code>TotalRecords</code>.", validatedBy: "N/A" },
        { field: "Historical policies", rule: 'The response includes every policy the customer authorised within the last <strong>five years</strong>, regardless of current <code>PolicyStatus</code>. TPPs MUST be prepared to receive policies in any of the <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies">AEInsurancePolicyStatusCodes</a> states (<code>New</code>, <code>Renewed</code>, <code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>PaidUp</code>, <code>Converted</code>, <code>Surrendered</code>, <code>DeathClaim</code>, <code>RiderClaim</code>) and render them with their current status.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. <code>Tue, 11 Sep 2012 19:43:31 UTC</code>.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present. Should reflect the user-agent of the customer’s browser or device.", validatedBy: "TPP" }
      ]
    },
    {
      id: "get-policy",
      num: "04",
      method: "GET",
      path: "/{type}-insurance-policies/{InsurancePolicyId}",
      title: "Get a Policy",
      intro: "Fetch the detailed view of a single policy. The <code>InsurancePolicyId</code> must be one returned by the corresponding list endpoint under the same consent. The policy is returned regardless of current <code>PolicyStatus</code> within the five-year retention window.",
      rules: [
        { field: "<code>Authorization</code>", rule: "Must contain a valid Bearer access token bound to an <code>Authorized</code> consent that has not expired.", validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path must match the version in the consent’s <code>authorization_details[0].type</code>.", validatedBy: "API Hub" },
        { field: "<code>{type}</code> path segment", rule: "Must match an <code>InsuranceType</code> present in <code>consent.Permissions</code>.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "The per-sector block for the requested <code>InsuranceType</code> must include <code>ReadInsurancePolicies</code>. The field sets returned on the policy depend on the additional permissions in the block (<code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, <code>ReadCustomerPaymentDetails</code>, <code>ReadInsuranceProduct</code>, <code>ReadCustomerClaims</code>, <code>ReadInsurancePremium</code>).", validatedBy: "API Hub" },
        { field: "<code>InsurancePolicyId</code>", rule: 'Must be a valid policy ID shared by the customer — i.e. returned by <code>GET /{type}-insurance-policies</code> under the same consent. See <a href="#policy-access">Policy Access Validation</a> for the response when the policy is not part of the consented set.', validatedBy: "LFI" },
        { field: "Historical policies", rule: "The endpoint returns the policy regardless of current <code>PolicyStatus</code> within the five-year window — there is no status-based <code>403</code>. TPPs MUST render the policy according to its <code>PolicyStatus</code> rather than assume it is active.", validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be a valid UUID (RFC 4122).", validatedBy: "N/A" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when the customer is authenticated at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent when the customer is actively present at the time of the call.", validatedBy: "TPP" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present.", validatedBy: "TPP" }
      ]
    },
    {
      id: "premium",
      num: "05",
      title: "Premium Handling",
      intro: 'When the consent includes <code>ReadInsurancePremium</code> for a sector, the <code>Premium</code> field on the policy response is returned as <code>anyOf</code> a structured object or a compact JWE string. The LFI chooses, per policy, which shape to return. A TPP that requests <code>ReadInsurancePremium</code> MUST be ready for either shape on every call and MUST follow the rules below when handling a JWE. See <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a> for the end-to-end walkthrough.',
      rules: [
        { field: "<code>Premium</code> — key request", rule: "If <code>Premium</code> is returned as a JWE, the TPP must prompt the User to enter the encryption key delivered to them by the LFI (e.g. via SMS or push notification) before decryption can proceed.", validatedBy: "TPP" },
        { field: "<code>Premium</code> — local decryption", rule: "Decryption of the JWE must be performed locally on the User’s device. The decrypted data must not be transmitted to the TPP’s servers or persisted in any storage accessible to the TPP’s application.", validatedBy: "TPP" },
        { field: "<code>Premium</code> — data usage", rule: "The decrypted data must only be used to display the premium to the User within the active session. The TPP must not store, transmit, or otherwise process the unencrypted data.", validatedBy: "TPP" },
        { field: "<code>Premium</code> — expiry", rule: "The TPP must observe the <code>exp</code> value in the JWE header and discard any decrypted data once the expiry threshold has passed. If the data is still required, the TPP must repeat the API operation to retrieve a fresh response — the original consent must still be valid for this to succeed.", validatedBy: "TPP" },
        { field: "<code>Premium</code> — session discard", rule: "The TPP must discard all decrypted data from memory when the User closes their session, regardless of whether <code>exp</code> has been reached.", validatedBy: "TPP" }
      ]
    },
    {
      id: "policy-access",
      num: "06",
      title: "Policy Access Validation",
      intro: "Before returning data on <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code>, the LFI verifies that the policy is part of the set the customer authorised at consent time. If the TPP supplies an <code>InsurancePolicyId</code> that was not returned by <code>GET /{type}-insurance-policies</code> under the same consent, the LFI returns <code>403</code> per the table below. The TPP MUST handle this response and surface a suitable message to the User.",
      table: {
        headers: ["Scenario", "Response"],
        rows: [
          { cells: ["<code>InsurancePolicyId</code> is not part of the consented set for the sector", "<code>403</code> with <code>errorCode</code>: <code>Consent.PermanentPolicyAccessFailure</code> and <code>errorMessage</code>: <code>The policy is permanently inaccessible.</code>"] }
        ]
      },
      aside: "<code>GET /{type}-insurance-policies</code> is exempt — it is not scoped to a specific policy in the URL and naturally returns only the consented set. TPPs SHOULD only call <code>GET /{type}-insurance-policies/{InsurancePolicyId}</code> with <code>InsurancePolicyId</code> values returned by the list endpoint under the same consent."
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-9f7a43b4><section class="ed-req-hero" data-v-9f7a43b4><div class="ed-req-hero__inner" data-v-9f7a43b4><div class="ed-req-hero__label" data-v-9f7a43b4><span class="ed-req-hero__label-dash" data-v-9f7a43b4></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-9f7a43b4>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-9f7a43b4>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-9f7a43b4>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-9f7a43b4>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-9f7a43b4>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-9f7a43b4${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-9f7a43b4${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-9f7a43b4${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-9f7a43b4${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-9f7a43b4${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-9f7a43b4${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-9f7a43b4${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-9f7a43b4${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-9f7a43b4${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-9f7a43b4${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-9f7a43b4${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-9f7a43b4${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-9f7a43b4${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-9f7a43b4${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-9f7a43b4${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-9f7a43b4${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-9f7a43b4${_scopeId}><span class="ed-req-validator__label" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-9f7a43b4${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-9f7a43b4${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-9f7a43b4${_scopeId}><h3 class="ed-req-sub__heading" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-9f7a43b4${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-9f7a43b4${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-9f7a43b4${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-9f7a43b4${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-9f7a43b4${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-9f7a43b4${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-9f7a43b4${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-9f7a43b4${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-9f7a43b4${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-9f7a43b4${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-9f7a43b4${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-9f7a43b4${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-9f7a43b4${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/data-sharing/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f7a43b4"]]);
export {
  requirements as default
};
