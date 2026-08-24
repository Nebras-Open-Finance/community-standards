import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Delegated SCA — Requirements",
  version: "v2.1",
  readTime: "6 min",
  lede: 'The <a href="/tech/tpp-standards/v2.1/consent/requirements">Consent requirements</a> and the <a href="./user-journeys">User Journeys</a> for this payment type also apply and must be adhered to.',
  preconditions: 'The tables below list the validation rules that apply to Delegated SCA. The <strong>Validated by</strong> column indicates where each rule is enforced. All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BSIP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: "consent-creation",
      num: "01",
      method: "POST",
      path: "/par",
      title: "Consent Creation",
      rules: [
        { field: "Request JWT", rule: 'Must conform to the <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT requirements</a> — correct <code>aud</code>, signing algorithm (<code>PS256</code>), and expiry window.', validatedBy: "API Hub" },
        { field: "<code>client_assertion</code>", rule: 'Must be included in the POST body (<code>client_assertion_type</code>: <code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>). Authenticates the TPP application — see <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a>.', validatedBy: "API Hub" },
        { field: "<code>scope</code> (in Request JWT)", rule: 'Must be <code>payments openid</code>. If <code>consent.Permissions</code> includes any of <code>ReadAccountsBasic</code>, <code>ReadAccountsDetail</code>, or <code>ReadBalances</code>, must be <code>accounts payments openid</code> — see <a href="/knowledge-base/articles/payment-account-permissions">Account Permissions in a Payment Consent</a>.', validatedBy: "API Hub" },
        { field: "<code>authorization_details[0].type</code> (in Request JWT)", rule: "Must be <code>urn:openfinanceuae:service-initiation-consent:v2.1</code>.", validatedBy: "API Hub" },
        { field: "API version supported", rule: 'The consent version in <code>authorization_details[0].type</code> (e.g. <code>urn:openfinanceuae:service-initiation-consent:v2.1</code>) restricts the version of the Payment Initiation endpoints the consent can be used to call (specified in the path, e.g. <code>/open-finance/payment/v2.1/payments</code>). It MUST resolve to an <code>ApiVersion</code> the LFI has published in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a> for the Payment Initiation API family.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "OpenAPI schema", rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/consent/open-api/par">POST <code>/par</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "API Hub" },
        { field: "<code>consent.PersonalIdentifiableInformation</code>", rule: 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/">PII schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.PersonalIdentifiableInformation.Risk</code>", rule: `The <code>Risk</code> block must be fully populated — every field that is known or derivable from the TPP's system must be included. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk">Risk</a>.`, validatedBy: "Monitored by Nebras" },
        { field: "<code>Initiation.DebtorAccount</code>", rule: "If provided, must reference a valid UAE IBAN held at the LFI and reachable through this API Hub. The account must be in a state that permits payment initiation (e.g. not blocked, dormant, or closed).", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>Initiation.Creditor</code>", rule: 'Optional. If provided, must contain 1–10 creditor entries. Each Creditor must be a valid UAE domestic creditor — the account must be reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the LFI can determine the state of the receiving account, in a state able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply to every entry — see <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement">creditor field validation requirements</a>.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.ControlParameters.IsDelegatedAuthentication</code>", rule: "Must be present and set to <code>true</code>.", validatedBy: "API Hub" },
        { field: "<code>consent.ControlParameters.ConsentSchedule</code>", rule: "Must be an empty object <code>{}</code>.", validatedBy: "API Hub" },
        { field: "Consent (unsupported)", rule: 'The LFI must advertise Delegated SCA as supported for the requested beneficiary model via the corresponding flag on its authorisation server entry in the <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework</a>: <code>ApiMetadata.DelegatedAuthentication.SingleBeneficiarySupported</code> (exactly 1 creditor entry), <code>ApiMetadata.DelegatedAuthentication.MultipleBeneficiariesSupported</code> (2–10 entries), or <code>ApiMetadata.DelegatedAuthentication.OpenBeneficiariesSupported</code> (<code>Initiation.Creditor</code> omitted). If the payment type is not supported for the requested beneficiary model, the consent validation will fail.', validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.BaseConsentId</code>", rule: "If provided, must reference a previous consent belonging to the <strong>same end user</strong>. If the original consent in the chain already had a <code>BaseConsentId</code>, the TPP must reuse that same <code>BaseConsentId</code> rather than the immediate prior <code>ConsentId</code>.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.IsSingleAuthorization</code>", rule: 'Optional; default is <code>false</code>. Omitting or setting to <code>false</code> asserts that the TPP supports the multi-authorization flow — the consent may remain pending while additional authorizers approve before reaching <code>Authorized</code>. Setting to <code>true</code> requests that only accounts solely authorizable by the authenticated customer be offered. The LFI must not reject the consent based on its own platform capability — this is a TPP-side assertion. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization">Multi-Authorization</a>.', validatedBy: "TPP" },
        { field: "<code>consent.AuthorizationExpirationDateTime</code>", rule: "If provided, must not be in the past. Must not be after <code>consent.ExpirationDateTime</code>.", validatedBy: "API Hub" },
        { field: "<code>consent.ExpirationDateTime</code>", rule: "Must not be in the past. Must be less than one year in the future.", validatedBy: "API Hub" },
        { field: "<code>consent.Permissions</code>", rule: "If <code>ReadBalances</code> is included, at least one of <code>ReadAccountsBasic</code> or <code>ReadAccountsDetail</code> must also be present.", validatedBy: "API Hub" },
        { field: "<code>consent.CurrencyRequest</code>", rule: "Must not be present. Domestic payments are denominated in AED only; <code>CurrencyRequest</code> is for non-local currency and international transfers.", validatedBy: "LFI (/consent/action/validate)" },
        { field: "<code>consent.PaymentPurposeCode</code>", rule: "If provided, must be a recognised AANI purpose code.", validatedBy: "API Hub" },
        { field: "<code>consent.DebtorReference</code>", rule: "The TPP SHOULD set the most meaningful <strong>Structured Reference</strong> for the consent. Where the reference is not dictated by the requirements of the payments use case, to a maximum of 35 characters: the User-provided free-text reference (to a maximum of 22 characters); a dash (<code>-</code>) separator; the Creditor LFI bank name (to a maximum of 8 characters) where the payment is not initiated on behalf of a Merchant; a dash; optionally the Merchant name (to a maximum of 8 characters) where the TPP initiates on behalf of a Merchant, followed by a dash; and the TPP name, as found in the Trust Framework or a recognisable alternative.", validatedBy: "TPP" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" }
      ],
      blocks: [
        { kind: "prose", html: 'The consent is submitted inside a signed <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> sent to the Authorization Server. The <code>consent.*</code> fields referenced in the table below are nested as <code>authorization_details[0].consent</code> within that JWT. The POST body must also include a <a href="/tech/tpp-standards/security/tokens/client-assertion">client assertion</a> to authenticate the TPP application.' }
      ]
    },
    {
      id: "authorization-account-selection",
      num: "02",
      title: "Authorization — Account Selection",
      rules: [
        { field: "<code>Initiation.DebtorAccount</code> ownership", rule: "If <code>Initiation.DebtorAccount</code> was provided on the consent and the authenticated customer does not hold that account, the consent will be set to <code>Rejected</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_does_not_own_debtor_account</code>.", validatedBy: "LFI" },
        { field: "<code>consent.IsSingleAuthorization</code>", rule: 'If <code>true</code>, only accounts that the authenticated customer can solely authorize (no subsequent approvers required) may be offered and selected. If <code>false</code> or not provided (default), accounts where the customer is one of multiple required authorizers may also be offered; subsequent authorizers must then approve the consent before the consent reaches <code>Authorized</code> status and any payment can be executed. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization">Multi-Authorization</a>.', validatedBy: "LFI" },
        { field: "Eligible payment accounts", rule: "If the authenticated customer does not hold any account eligible to initiate a payment under this consent, the consent will be set to <code>Rejected</code> with <code>error</code>: <code>invalid_request</code> and <code>error_description</code>: <code>user_lacks_eligible_accounts</code>. The eligible set is constrained by <code>consent.IsSingleAuthorization</code> as described above.", validatedBy: "LFI" }
      ]
    },
    {
      id: "payment-initiation",
      num: "03",
      method: "POST",
      path: "/payments",
      title: "Payment Initiation",
      rules: [
        { field: "<code>Authorization</code>", rule: 'Must contain a valid Bearer access token issued with the <code>payments openid</code> scope (or <code>accounts payments openid</code> where account permissions were included on the consent — see <a href="/knowledge-base/articles/payment-account-permissions">Account Permissions in a Payment Consent</a>). The consent bound to the token must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.', validatedBy: "API Hub" },
        { field: "URL version", rule: "The version in the request URL path (e.g. <code>v2.1</code> in <code>/open-finance/service-initiation/v2.1/payments</code>) must match the version in the consent's <code>authorization_details[0].type</code> (<code>urn:openfinanceuae:service-initiation-consent:v2.1</code>).", validatedBy: "API Hub" },
        { field: "<code>Data.ConsentId</code>", rule: "Must match the <code>ConsentId</code> bound to the access token. The Consent must be in <code>Authorized</code> status and the <code>ExpirationDateTime</code> of the Consent must be in the future.", validatedBy: "API Hub" },
        { field: "<code>Data.Instruction.Amount.Amount</code>", rule: "No amount cap is enforced by the consent. The TPP is responsible for ensuring the amount was explicitly approved by the user via their own SCA flow before initiating.", validatedBy: "TPP" },
        { field: "<code>Data.PaymentPurposeCode</code>", rule: "Can differ from <code>consent.PaymentPurposeCode</code>. If provided, must be a recognised AANI purpose code.", validatedBy: "API Hub" },
        { field: "<code>Data.DebtorReference</code>", rule: "Can differ from <code>consent.DebtorReference</code> — the TPP MAY set a per-payment Debtor Reference rather than reuse the consent value. Where it is not dictated by the requirements of the payments use case, it SHOULD still follow the <strong>Structured Reference</strong> convention described under Consent Creation.", validatedBy: "TPP" },
        { field: "OpenAPI schema", rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "API Hub" },
        { field: "<code>PersonalIdentifiableInformation</code>", rule: 'The decrypted PII payload must conform exactly to the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/">PII schema</a>. No additional or undocumented parameters are permitted.', validatedBy: "LFI" },
        { field: "<code>PersonalIdentifiableInformation.Risk</code>", rule: `The <code>Risk</code> block must be fully populated — every field that is known or derivable from the TPP's system must be included. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk">Risk</a>.`, validatedBy: "Monitored by Nebras" },
        { field: "<code>Risk.DebtorIndicators.Authentication</code>", rule: "Must demonstrate that the User was recently authenticated using SCA (at least two distinct factors). <code>ChallengeOutcome</code> must be <code>Pass</code>, <code>AuthenticationFlow</code> must be <code>MFA</code>, and at least two of <code>PossessionFactor.IsUsed</code>, <code>KnowledgeFactor.IsUsed</code>, or <code>InherenceFactor.IsUsed</code> must be <code>true</code> with a valid <code>Type</code> set on each. <code>ChallengeDateTime</code> must be recent relative to the payment request.", validatedBy: "LFI" },
        { field: "<code>PersonalIdentifiableInformation</code> (Creditor)", rule: 'Depends on the beneficiary model set at consent time. <strong>Single beneficiary</strong> (<code>Initiation.Creditor[]</code> had 1 entry at consent time): the submitted creditor must exactly match that consent-time entry. <strong>Multiple beneficiaries</strong> (2–10 entries): the submitted creditor must exactly match one entry from the pre-approved consent-time list. <strong>Open beneficiary</strong> (<code>Initiation.Creditor[]</code> omitted at consent): no consent-time match — the submitted creditor must independently satisfy the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement">creditor field validation requirements</a> (mandatory fields, valid UAE IBAN, and BIC derivation rules) and must be a valid UAE domestic creditor reachable on AANI or UAEFTS. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>.', validatedBy: "LFI" },
        { field: "<code>x-fapi-interaction-id</code>", rule: "Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.", validatedBy: "N/A" },
        { field: "<code>x-idempotency-key</code>", rule: "Must be included. Must be a stable, unique value per payment attempt — the same key must be reused on retries of the same payment.", validatedBy: "API Hub" },
        { field: "<code>x-fapi-auth-date</code>", rule: "Must be sent when as customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. <code>Tue, 11 Sep 2012 19:43:31 UTC</code>.", validatedBy: "LFI" },
        { field: "<code>x-fapi-customer-ip-address</code>", rule: "Must be sent as the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address.", validatedBy: "LFI" },
        { field: "<code>x-customer-user-agent</code>", rule: "Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device.", validatedBy: "TPP" }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-5018e13b><section class="ed-req-hero" data-v-5018e13b><div class="ed-req-hero__inner" data-v-5018e13b><div class="ed-req-hero__label" data-v-5018e13b><span class="ed-req-hero__label-dash" data-v-5018e13b></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-5018e13b>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-5018e13b>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-5018e13b>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-5018e13b>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-5018e13b>${unref(data).preconditions ?? ""}</p>`);
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
                _push2(`<div class="ed-req-endpoint" data-v-5018e13b${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-5018e13b${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-5018e13b${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-5018e13b${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-5018e13b${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-5018e13b${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-5018e13b${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-5018e13b${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-5018e13b${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-5018e13b${_scopeId}>${c ?? ""}</div>`);
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
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-5018e13b${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-5018e13b${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-5018e13b${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-5018e13b${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-5018e13b${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-5018e13b${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-5018e13b${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-5018e13b${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-5018e13b${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-5018e13b${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-5018e13b${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-5018e13b${_scopeId}><span class="ed-req-validator__label" data-v-5018e13b${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-5018e13b${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
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
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-5018e13b${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-5018e13b${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-5018e13b${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-5018e13b${_scopeId}><h3 class="ed-req-sub__heading" data-v-5018e13b${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-5018e13b${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-5018e13b${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-5018e13b${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-5018e13b${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-5018e13b${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-5018e13b${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-5018e13b${_scopeId}>${c ?? ""}</div>`);
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
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-5018e13b${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-5018e13b${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-5018e13b${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-5018e13b${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-5018e13b${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-5018e13b${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-5018e13b${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-5018e13b${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-5018e13b${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-5018e13b${_scopeId}>${c ?? ""}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5018e13b"]]);
export {
  requirements as default
};
