import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const exampleCleartextResponse = `{
  "Data": {
    "Policy": {
      "InsurancePolicyId": "policy-001",
      "PolicyNumber": "MTR-2025-000123",
      "PolicyStatus": "Active",
      "Insurer": { "Name": "Example Insurance LLC" },
      "Premium": {
        "PremiumAmountExcludingVAT": "950.00",
        "PremiumVATAmount": "47.50",
        "TotalPremiumAmount": "997.50",
        "Currency": "AED",
        "PremiumFrequency": "Annually"
      }
    }
  },
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/v2.2/motor-insurance-policies/policy-001"
  },
  "Meta": {}
}
`;
const exampleEncryptedResponse = `{
  "Data": {
    "Policy": {
      "InsurancePolicyId": "policy-001",
      "PolicyNumber": "MTR-2025-000123",
      "PolicyStatus": "Active",
      "Insurer": { "Name": "Example Insurance LLC" },
      "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIiwicDJzIjoiNGtBWG..."
    }
  },
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/v2.2/motor-insurance-policies/policy-001"
  },
  "Meta": {}
}
`;
const step1Node = `import crypto from 'node:crypto'

// insurancePolicyId comes from a prior GET /{type}-insurance-policies call —
// see Step 8 of the API Guide.
const response = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/\${insurancePolicyId}\`,
  {
    headers: {
      Authorization:                \`Bearer \${access_token}\`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Policy: policy } } = await response.json()
`;
const step1Python = `import uuid, httpx

# insurance_policy_id comes from a prior GET /{type}-insurance-policies call —
# see Step 8 of the API Guide.
response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/{insurance_policy_id}",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,
        "x-fapi-customer-ip-address":   customer_ip_address,
    },
    # cert=("transport.crt", "transport.key"),
)

policy = response.json()["Data"]["Policy"]
`;
const step2Node = `// Premium is anyOf { object | string } per the OpenAPI spec.
// A string value is a compact JWE that must be decrypted on the customer's device.
const premium     = policy.Premium
const isEncrypted = typeof premium === 'string'

if (isEncrypted) {
  // Forward the opaque JWE to the browser. Do not parse, log, or persist it.
  forwardToBrowser({ policyId: policy.InsurancePolicyId, premiumJwe: premium })
} else {
  // Cleartext path — render the premium directly from the structured object
  renderPremium({ policyId: policy.InsurancePolicyId, premium })
}
`;
const step2Python = `# Premium is anyOf { object | string } per the OpenAPI spec.
# A string value is a compact JWE that must be decrypted on the customer's device.
premium      = policy.get("Premium")
is_encrypted = isinstance(premium, str)

if is_encrypted:
    # Forward the opaque JWE to the browser. Do not parse, log, or persist it.
    forward_to_browser(policy_id=policy["InsurancePolicyId"], premium_jwe=premium)
else:
    # Cleartext path — render the premium directly from the structured object
    render_premium(policy_id=policy["InsurancePolicyId"], premium=premium)
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "premiums",
  __ssrInlineRender: true,
  setup(__props) {
    const step1Tabs = [
      { label: "Node.js", lang: "typescript", code: step1Node },
      { label: "Python", lang: "python", code: step1Python }
    ];
    const step2Tabs = [
      { label: "Node.js", lang: "typescript", code: step2Node },
      { label: "Python", lang: "python", code: step2Python }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-036c68a0><section class="ed-doc__hero" data-v-036c68a0><div class="ed-doc__inner" data-v-036c68a0><div class="ed-doc__eyebrow" data-v-036c68a0><span class="ed-doc__eyebrow-dash" data-v-036c68a0></span> TPP · Insurance · Data Sharing · API Guide </div><h1 class="ed-doc__title" data-v-036c68a0> Encrypted Premiums <span class="ed-doc__read" data-v-036c68a0>5 min read</span></h1><p class="ed-doc__lede" data-v-036c68a0> When a TPP holds the <code data-v-036c68a0>ReadInsurancePremium</code> permission and calls any <code data-v-036c68a0>/{type}-insurance-policies</code> endpoint, the LFI MAY return the <code data-v-036c68a0>Premium</code> field as an encrypted JWE rather than a structured object. The TPP MUST present the premium to the customer without the unencrypted value ever reaching or being stored on its servers — decryption happens locally on the customer’s device. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when-this-applies",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When this applies",
        title: "Encrypted premiums are an LFI-side choice",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-036c68a0${_scopeId2}>Premium</code> field on every insurance policy response is defined as <code data-v-036c68a0${_scopeId2}>anyOf</code> a structured <code data-v-036c68a0${_scopeId2}>AEInsuranceDataSharingPremiumProperties</code> object or an <code data-v-036c68a0${_scopeId2}>AEInsurancePremiumJWE</code> compact string. Each LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. A TPP holding <code data-v-036c68a0${_scopeId2}>ReadInsurancePremium</code> MUST therefore be ready for either shape on every call. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field on every insurance policy response is defined as "),
                    createVNode("code", null, "anyOf"),
                    createTextVNode(" a structured "),
                    createVNode("code", null, "AEInsuranceDataSharingPremiumProperties"),
                    createTextVNode(" object or an "),
                    createVNode("code", null, "AEInsurancePremiumJWE"),
                    createTextVNode(" compact string. Each LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. A TPP holding "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(" MUST therefore be ready for either shape on every call. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-036c68a0${_scopeId2}><strong data-v-036c68a0${_scopeId2}>Cleartext</strong> — <code data-v-036c68a0${_scopeId2}>Premium</code> is a JSON object containing <code data-v-036c68a0${_scopeId2}>PremiumAmountExcludingVAT</code>, <code data-v-036c68a0${_scopeId2}>PremiumVATAmount</code>, <code data-v-036c68a0${_scopeId2}>TotalPremiumAmount</code>, <code data-v-036c68a0${_scopeId2}>Currency</code>, and <code data-v-036c68a0${_scopeId2}>PremiumFrequency</code>. Render directly. No special handling required. </li><li data-v-036c68a0${_scopeId2}><strong data-v-036c68a0${_scopeId2}>Encrypted (JWE)</strong> — <code data-v-036c68a0${_scopeId2}>Premium</code> is a compact JWE string. The TPP server MUST forward this opaque string to the customer’s device without inspecting, logging, or persisting it. Decryption happens in the browser or mobile app using key material tied to the customer’s authenticated session. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cleartext"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" is a JSON object containing "),
                      createVNode("code", null, "PremiumAmountExcludingVAT"),
                      createTextVNode(", "),
                      createVNode("code", null, "PremiumVATAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "TotalPremiumAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "Currency"),
                      createTextVNode(", and "),
                      createVNode("code", null, "PremiumFrequency"),
                      createTextVNode(". Render directly. No special handling required. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encrypted (JWE)"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" is a compact JWE string. The TPP server MUST forward this opaque string to the customer’s device without inspecting, logging, or persisting it. Decryption happens in the browser or mobile app using key material tied to the customer’s authenticated session. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Why both shapes exist"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-036c68a0${_scopeId2}> Some insurers treat the premium as commercially sensitive — in particular for switching and quote-comparison use cases where premium parity is a competitive lever. The encrypted JWE shape lets the premium flow through the TPP to the customer’s screen without the TPP ever holding the cleartext value. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Some insurers treat the premium as commercially sensitive — in particular for switching and quote-comparison use cases where premium parity is a competitive lever. The encrypted JWE shape lets the premium flow through the TPP to the customer’s screen without the TPP ever holding the cleartext value. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" field on every insurance policy response is defined as "),
                  createVNode("code", null, "anyOf"),
                  createTextVNode(" a structured "),
                  createVNode("code", null, "AEInsuranceDataSharingPremiumProperties"),
                  createTextVNode(" object or an "),
                  createVNode("code", null, "AEInsurancePremiumJWE"),
                  createTextVNode(" compact string. Each LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. A TPP holding "),
                  createVNode("code", null, "ReadInsurancePremium"),
                  createTextVNode(" MUST therefore be ready for either shape on every call. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cleartext"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" is a JSON object containing "),
                    createVNode("code", null, "PremiumAmountExcludingVAT"),
                    createTextVNode(", "),
                    createVNode("code", null, "PremiumVATAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "TotalPremiumAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "Currency"),
                    createTextVNode(", and "),
                    createVNode("code", null, "PremiumFrequency"),
                    createTextVNode(". Render directly. No special handling required. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encrypted (JWE)"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" is a compact JWE string. The TPP server MUST forward this opaque string to the customer’s device without inspecting, logging, or persisting it. Decryption happens in the browser or mobile app using key material tied to the customer’s authenticated session. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Why both shapes exist"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Some insurers treat the premium as commercially sensitive — in particular for switching and quote-comparison use cases where premium parity is a competitive lever. The encrypted JWE shape lets the premium flow through the TPP to the customer’s screen without the TPP ever holding the cleartext value. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Prerequisites",
        title: "What you need before calling these endpoints",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-036c68a0${_scopeId2}><strong data-v-036c68a0${_scopeId2}>A consent that includes <code data-v-036c68a0${_scopeId2}>ReadInsurancePremium</code></strong> for the relevant <code data-v-036c68a0${_scopeId2}>InsuranceType</code> — this permission MUST be present in the per-sector block of <code data-v-036c68a0${_scopeId2}>authorization_details.consent.Permissions</code> when the TPP creates the consent. See <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#authorization-details" data-v-036c68a0${_scopeId2}> Constructing Authorization Details</a>. </li><li data-v-036c68a0${_scopeId2}><strong data-v-036c68a0${_scopeId2}>The <em data-v-036c68a0${_scopeId2}>Access Encrypted Resource Data</em> optional certification</strong> — before requesting <code data-v-036c68a0${_scopeId2}>ReadInsurancePremium</code> on a live LFI, the TPP MUST hold this certification with Nebras. See <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-036c68a0${_scopeId2}> Access Encrypted Resource Data</a>. </li><li data-v-036c68a0${_scopeId2}><strong data-v-036c68a0${_scopeId2}>A valid access token and the standard FAPI headers</strong> — <code data-v-036c68a0${_scopeId2}>x-fapi-interaction-id</code>, <code data-v-036c68a0${_scopeId2}>x-fapi-auth-date</code>, and <code data-v-036c68a0${_scopeId2}>x-fapi-customer-ip-address</code>. See <a href="/tech/tpp-standards/security/request-headers" data-v-036c68a0${_scopeId2}>Request Headers</a>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("A consent that includes "),
                        createVNode("code", null, "ReadInsurancePremium")
                      ]),
                      createTextVNode(" for the relevant "),
                      createVNode("code", null, "InsuranceType"),
                      createTextVNode(" — this permission MUST be present in the per-sector block of "),
                      createVNode("code", null, "authorization_details.consent.Permissions"),
                      createTextVNode(" when the TPP creates the consent. See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#authorization-details" }, " Constructing Authorization Details"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("The "),
                        createVNode("em", null, "Access Encrypted Resource Data"),
                        createTextVNode(" optional certification")
                      ]),
                      createTextVNode(" — before requesting "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(" on a live LFI, the TPP MUST hold this certification with Nebras. See "),
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "A valid access token and the standard FAPI headers"),
                      createTextVNode(" — "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(", "),
                      createVNode("code", null, "x-fapi-auth-date"),
                      createTextVNode(", and "),
                      createVNode("code", null, "x-fapi-customer-ip-address"),
                      createTextVNode(". See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("A consent that includes "),
                      createVNode("code", null, "ReadInsurancePremium")
                    ]),
                    createTextVNode(" for the relevant "),
                    createVNode("code", null, "InsuranceType"),
                    createTextVNode(" — this permission MUST be present in the per-sector block of "),
                    createVNode("code", null, "authorization_details.consent.Permissions"),
                    createTextVNode(" when the TPP creates the consent. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#authorization-details" }, " Constructing Authorization Details"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("The "),
                      createVNode("em", null, "Access Encrypted Resource Data"),
                      createTextVNode(" optional certification")
                    ]),
                    createTextVNode(" — before requesting "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(" on a live LFI, the TPP MUST hold this certification with Nebras. See "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "A valid access token and the standard FAPI headers"),
                    createTextVNode(" — "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(", and "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-call-policy",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1 — GET /{type}-insurance-policies/{InsurancePolicyId}",
        title: "Fetch the policy detail as normal",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-036c68a0${_scopeId}><span class="http-badge http-get" data-v-036c68a0${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-036c68a0${_scopeId}>/{type}-insurance-policies/{InsurancePolicyId}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Premium values are returned on the per-policy detail endpoint. Use an <code data-v-036c68a0${_scopeId2}>InsurancePolicyId</code> obtained from a prior <code data-v-036c68a0${_scopeId2}>GET /{type}-insurance-policies</code> call (Step 8 of the <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#step-8-get-policies" data-v-036c68a0${_scopeId2}>API Guide</a>) and request the detailed policy. `);
                } else {
                  return [
                    createTextVNode(" Premium values are returned on the per-policy detail endpoint. Use an "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" obtained from a prior "),
                    createVNode("code", null, "GET /{type}-insurance-policies"),
                    createTextVNode(" call (Step 8 of the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#step-8-get-policies" }, "API Guide"),
                    createTextVNode(") and request the detailed policy. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whether the LFI returns cleartext or an encrypted JWE for <code data-v-036c68a0${_scopeId2}>Premium</code>, the request itself is unchanged. Make the call as you would for any other Insurance Data Sharing endpoint: `);
                } else {
                  return [
                    createTextVNode(" Whether the LFI returns cleartext or an encrypted JWE for "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(", the request itself is unchanged. Make the call as you would for any other Insurance Data Sharing endpoint: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step1Tabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-036c68a0${_scopeId}>Example response — cleartext</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleCleartextResponse,
              lang: "json",
              filename: "cleartext Premium"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-036c68a0${_scopeId}>Example response — encrypted JWE</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleEncryptedResponse,
              lang: "json",
              filename: "encrypted Premium"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Apart from <code data-v-036c68a0${_scopeId2}>Premium</code>, every other field on the policy is returned in cleartext in both shapes — <code data-v-036c68a0${_scopeId2}>PolicyNumber</code>, <code data-v-036c68a0${_scopeId2}>PolicyStatus</code>, <code data-v-036c68a0${_scopeId2}>Insurer</code>, dates, coverage, riders, and so on. Only <code data-v-036c68a0${_scopeId2}>Premium</code> is ever encrypted. `);
                } else {
                  return [
                    createTextVNode(" Apart from "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(", every other field on the policy is returned in cleartext in both shapes — "),
                    createVNode("code", null, "PolicyNumber"),
                    createTextVNode(", "),
                    createVNode("code", null, "PolicyStatus"),
                    createTextVNode(", "),
                    createVNode("code", null, "Insurer"),
                    createTextVNode(", dates, coverage, riders, and so on. Only "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" is ever encrypted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/{type}-insurance-policies/{InsurancePolicyId}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Premium values are returned on the per-policy detail endpoint. Use an "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" obtained from a prior "),
                  createVNode("code", null, "GET /{type}-insurance-policies"),
                  createTextVNode(" call (Step 8 of the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/#step-8-get-policies" }, "API Guide"),
                  createTextVNode(") and request the detailed policy. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whether the LFI returns cleartext or an encrypted JWE for "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(", the request itself is unchanged. Make the call as you would for any other Insurance Data Sharing endpoint: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step1Tabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response — cleartext"),
              createVNode(_component_EdCode, {
                code: exampleCleartextResponse,
                lang: "json",
                filename: "cleartext Premium"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response — encrypted JWE"),
              createVNode(_component_EdCode, {
                code: exampleEncryptedResponse,
                lang: "json",
                filename: "encrypted Premium"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Apart from "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(", every other field on the policy is returned in cleartext in both shapes — "),
                  createVNode("code", null, "PolicyNumber"),
                  createTextVNode(", "),
                  createVNode("code", null, "PolicyStatus"),
                  createTextVNode(", "),
                  createVNode("code", null, "Insurer"),
                  createTextVNode(", dates, coverage, riders, and so on. Only "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" is ever encrypted. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-detect-jwe",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2 — Detect the response shape",
        title: "Branch on whether Premium is a string",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If <code data-v-036c68a0${_scopeId2}>Premium</code> is a JSON object, render its fields directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer’s browser or mobile app. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. `);
                } else {
                  return [
                    createTextVNode(" If "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" is a JSON object, render its fields directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer’s browser or mobile app. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Forward, do not store"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-036c68a0${_scopeId2}> The encrypted JWE is opaque to the TPP. Pass it through to the customer device and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-data handling requirements documented in <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-036c68a0${_scopeId2}> Access Encrypted Resource Data</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The encrypted JWE is opaque to the TPP. Pass it through to the customer device and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-data handling requirements documented in "),
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" is a JSON object, render its fields directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer’s browser or mobile app. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Forward, do not store"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The encrypted JWE is opaque to the TPP. Pass it through to the customer device and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-data handling requirements documented in "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-decrypt-device",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3 — Decrypt locally on the customer device",
        title: "The decrypted premium never leaves the device",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decryption MUST run on the customer’s device — the cleartext premium MUST NOT be sent to the TPP server or any third party. The mechanism mirrors the Bank Data Sharing encrypted-rate flow described in <a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" data-v-036c68a0${_scopeId2}>Encrypted FinanceRates</a>; use the same JOSE-library pattern, keep the OTP/key material in browser memory only, and discard the decrypted premium when the customer navigates away. `);
                } else {
                  return [
                    createTextVNode(" Decryption MUST run on the customer’s device — the cleartext premium MUST NOT be sent to the TPP server or any third party. The mechanism mirrors the Bank Data Sharing encrypted-rate flow described in "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                    createTextVNode("; use the same JOSE-library pattern, keep the OTP/key material in browser memory only, and discard the decrypted premium when the customer navigates away. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Never round-trip the cleartext premium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-036c68a0${_scopeId2}> The decrypted <code data-v-036c68a0${_scopeId2}>Premium</code> object MUST stay inside the page’s JavaScript scope. Do not POST it back to your server for “processing”, do not include it in analytics events, and do not echo it back into a form that submits to your domain. The same rule applies to any key material used to unlock the JWE. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The decrypted "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" object MUST stay inside the page’s JavaScript scope. Do not POST it back to your server for “processing”, do not include it in analytics events, and do not echo it back into a form that submits to your domain. The same rule applies to any key material used to unlock the JWE. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Decryption MUST run on the customer’s device — the cleartext premium MUST NOT be sent to the TPP server or any third party. The mechanism mirrors the Bank Data Sharing encrypted-rate flow described in "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                  createTextVNode("; use the same JOSE-library pattern, keep the OTP/key material in browser memory only, and discard the decrypted premium when the customer navigates away. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Never round-trip the cleartext premium"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The decrypted "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" object MUST stay inside the page’s JavaScript scope. Do not POST it back to your server for “processing”, do not include it in analytics events, and do not echo it back into a form that submits to your domain. The same rule applies to any key material used to unlock the JWE. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "related",
        num: "06",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Related",
        title: "See also",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-036c68a0${_scopeId2}><a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" data-v-036c68a0${_scopeId2}>Encrypted FinanceRates</a> — the Bank Data Sharing equivalent. Insurance follows the same mechanism, only the field name and consented permission differ. </li><li data-v-036c68a0${_scopeId2}><a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-036c68a0${_scopeId2}> Access Encrypted Resource Data</a> — the optional certification a TPP must hold before requesting any encrypted resource field, including <code data-v-036c68a0${_scopeId2}>Premium</code>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                      createTextVNode(" — the Bank Data Sharing equivalent. Insurance follows the same mechanism, only the field name and consented permission differ. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(" — the optional certification a TPP must hold before requesting any encrypted resource field, including "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                    createTextVNode(" — the Bank Data Sharing equivalent. Insurance follows the same mechanism, only the field name and consented permission differ. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(" — the optional certification a TPP must hold before requesting any encrypted resource field, including "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const premiums = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-036c68a0"]]);
export {
  premiums as default
};
