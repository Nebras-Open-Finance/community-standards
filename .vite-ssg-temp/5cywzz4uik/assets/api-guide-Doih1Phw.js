import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as _sfc_main$1 } from "./APIFlowsRefunds-ILpIjHAl.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const step1Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const issuer    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
})
`;
const step1Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
issuer    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
`;
const step2Node = `const tokenEndpoint = process.env.LFI_TOKEN_ENDPOINT!   // from the LFI's .well-known/openid-configuration

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'payments',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(tokenEndpoint, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
`;
const step2Python = `import httpx

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]   # from the LFI's .well-known/openid-configuration

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "payments",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`;
const step3Node = `const RESOURCE_SERVER_URL = process.env.LFI_RESOURCE_SERVER_URL!
const CONSENT_ID          = process.env.CONSENT_ID!

const refundResponse = await fetch(
  \`\${RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.2/payment-consents/\${CONSENT_ID}/refund\`,
  {
    method:  'GET',
    headers: {
      'Authorization':         \`Bearer \${access_token}\`,
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt    = await refundResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result         = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())

const { ConsentId, RefundAccount } = result.message.Data
`;
const step3Python = `import httpx, base64, json

RESOURCE_SERVER_URL = os.environ["LFI_RESOURCE_SERVER_URL"]
CONSENT_ID          = os.environ["CONSENT_ID"]

refund_response = httpx.get(
    f"{RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.2/payment-consents/{CONSENT_ID}/refund",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt = refund_response.text
payload_b64  = response_jwt.split(".")[1]
result       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

consent_id     = result["message"]["Data"]["ConsentId"]
refund_account = result["message"]["Data"]["RefundAccount"]
`;
const exampleResponse = `{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "ConsentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
      "RefundAccount": {
        "SchemeName": "IBAN",
        "Identification": "AE070331234567890123456",
        "Name": {
          "en": "Ibrahim Al Suwaidi"
        }
      }
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/bank-service-initiation/v2.2/payment-consents/con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c/refund"
    },
    "Meta": {}
  }
}
`;
const jwsCompact = `<header>.<payload>.<signature>
`;
const decodeJwsNode = `function decodeJwsPayload(jws: string) {
  const [, payloadB64] = jws.split('.')
  const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(json)
}
`;
const decodeJwsPython = `import base64, json

def decode_jws_payload(jws: str) -> dict:
    payload_b64 = jws.split(".")[1]
    # Pad to a multiple of 4 chars so urlsafe_b64decode accepts it
    padded = payload_b64 + "=" * (-len(payload_b64) % 4)
    return json.loads(base64.urlsafe_b64decode(padded))
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const step1Tabs = [{ label: "Node.js", lang: "typescript", code: step1Node }, { label: "Python", lang: "python", code: step1Python }];
    const step2Tabs = [{ label: "Node.js", lang: "typescript", code: step2Node }, { label: "Python", lang: "python", code: step2Python }];
    const step3Tabs = [{ label: "Node.js", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const decodeJwsTabs = [{ label: "Node.js", lang: "typescript", code: decodeJwsNode }, { label: "Python", lang: "python", code: decodeJwsPython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsRefunds = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-91a80430><section class="ed-doc__hero" data-v-91a80430><div class="ed-doc__inner" data-v-91a80430><div class="ed-doc__eyebrow" data-v-91a80430><span class="ed-doc__eyebrow-dash" data-v-91a80430></span> TPP · Banking · Service Initiation · Refunds </div><h1 class="ed-doc__title" data-v-91a80430> Payment Refunds — API Guide <span class="ed-doc__read" data-v-91a80430>2 min read</span></h1><p class="ed-doc__lede" data-v-91a80430> The Refunds API lets a TPP retrieve the debtor&#39;s payment account details from the LFI after a payment has been made, so a merchant can initiate a refund back to the original payer. This guide starts <strong data-v-91a80430>after a payment consent has been created</strong> with the <code data-v-91a80430>ReadRefundAccount</code> permission and the underlying payment has been authorised. </p><p class="ed-doc__lede" data-v-91a80430> Unlike the payment consent flow, retrieving refund details does <strong data-v-91a80430>not</strong> require a user redirect — the TPP authenticates directly using a client credentials grant. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before retrieving refund details",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before calling the Refunds API, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before calling the Refunds API, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>Completed payment consent with <code data-v-91a80430${_scopeId2}>ReadRefundAccount</code> permission</strong> — the original payment consent must have been created with <code data-v-91a80430${_scopeId2}>ReadRefundAccount</code> in the <code data-v-91a80430${_scopeId2}>Permissions</code> array, and the payment must have been authorised by the user. See the <a href="/tech/tpp-standards/v2.2-rc1/consent/api-guide" data-v-91a80430${_scopeId2}>Payment Consent API Guide</a>. </li><li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-91a80430${_scopeId2}>Application</a></strong> — the application must be assigned the <strong data-v-91a80430${_scopeId2}>BSIP role</strong> in the Trust Framework. See <a href="/tech/tpp-standards/trust-framework/roles" data-v-91a80430${_scopeId2}>Roles</a>. </li><li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-91a80430${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate for mTLS communication with the LFI. </li><li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-91a80430${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate for signing client assertions. </li><li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>LFI token endpoint</strong> — you should already hold the LFI&#39;s <code data-v-91a80430${_scopeId2}>token_endpoint</code> and <code data-v-91a80430${_scopeId2}>ResourceServerUrl</code> from the original payment consent flow. If not, fetch the LFI&#39;s <code data-v-91a80430${_scopeId2}>.well-known/openid-configuration</code> to resolve them. </li><li data-v-91a80430${_scopeId2}><strong data-v-91a80430${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/tokens/" data-v-91a80430${_scopeId2}>Tokens &amp; Assertions</a></strong> — familiarise yourself with <code data-v-91a80430${_scopeId2}>private_key_jwt</code> client authentication before calling the token endpoint. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Completed payment consent with "),
                        createVNode("code", null, "ReadRefundAccount"),
                        createTextVNode(" permission")
                      ]),
                      createTextVNode(" — the original payment consent must have been created with "),
                      createVNode("code", null, "ReadRefundAccount"),
                      createTextVNode(" in the "),
                      createVNode("code", null, "Permissions"),
                      createTextVNode(" array, and the payment must have been authorised by the user. See the "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/api-guide" }, "Payment Consent API Guide"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be assigned the "),
                      createVNode("strong", null, "BSIP role"),
                      createTextVNode(" in the Trust Framework. See "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate for mTLS communication with the LFI. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                      ]),
                      createTextVNode(" — an active signing certificate for signing client assertions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "LFI token endpoint"),
                      createTextVNode(" — you should already hold the LFI's "),
                      createVNode("code", null, "token_endpoint"),
                      createTextVNode(" and "),
                      createVNode("code", null, "ResourceServerUrl"),
                      createTextVNode(" from the original payment consent flow. If not, fetch the LFI's "),
                      createVNode("code", null, ".well-known/openid-configuration"),
                      createTextVNode(" to resolve them. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of "),
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                      ]),
                      createTextVNode(" — familiarise yourself with "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" client authentication before calling the token endpoint. ")
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
                  createTextVNode("Before calling the Refunds API, ensure the following requirements are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Completed payment consent with "),
                      createVNode("code", null, "ReadRefundAccount"),
                      createTextVNode(" permission")
                    ]),
                    createTextVNode(" — the original payment consent must have been created with "),
                    createVNode("code", null, "ReadRefundAccount"),
                    createTextVNode(" in the "),
                    createVNode("code", null, "Permissions"),
                    createTextVNode(" array, and the payment must have been authorised by the user. See the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/api-guide" }, "Payment Consent API Guide"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be assigned the "),
                    createVNode("strong", null, "BSIP role"),
                    createTextVNode(" in the Trust Framework. See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate for mTLS communication with the LFI. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                    ]),
                    createTextVNode(" — an active signing certificate for signing client assertions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "LFI token endpoint"),
                    createTextVNode(" — you should already hold the LFI's "),
                    createVNode("code", null, "token_endpoint"),
                    createTextVNode(" and "),
                    createVNode("code", null, "ResourceServerUrl"),
                    createTextVNode(" from the original payment consent flow. If not, fetch the LFI's "),
                    createVNode("code", null, ".well-known/openid-configuration"),
                    createTextVNode(" to resolve them. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of "),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                    ]),
                    createTextVNode(" — familiarise yourself with "),
                    createVNode("code", null, "private_key_jwt"),
                    createTextVNode(" client authentication before calling the token endpoint. ")
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
        id: "sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end refund account retrieval",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Payment Refunds API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsRefunds, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsRefunds)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Payment Refunds API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsRefunds)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-client-assertion",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1 — Build a Client Assertion",
        title: "Prove your application's identity",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Retrieving refund details uses the OAuth 2.0 <strong data-v-91a80430${_scopeId2}>client credentials</strong> grant — no user consent or redirect is required. `);
                } else {
                  return [
                    createTextVNode(" Retrieving refund details uses the OAuth 2.0 "),
                    createVNode("strong", null, "client credentials"),
                    createTextVNode(" grant — no user consent or redirect is required. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>signJWT()</code></a> helper to build a client assertion proving your application&#39;s identity: `);
                } else {
                  return [
                    createTextVNode(" Use the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                      createVNode("code", null, "signJWT()")
                    ]),
                    createTextVNode(" helper to build a client assertion proving your application's identity: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step1Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-91a80430${_scopeId2}>Client Assertion</a> for the full claims reference. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the full claims reference. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Retrieving refund details uses the OAuth 2.0 "),
                  createVNode("strong", null, "client credentials"),
                  createTextVNode(" grant — no user consent or redirect is required. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                    createVNode("code", null, "signJWT()")
                  ]),
                  createTextVNode(" helper to build a client assertion proving your application's identity: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step1Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the full claims reference. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-token-request",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2 — Token Request",
        title: "Exchange the assertion for an access token",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` POST to the LFI&#39;s token endpoint with <code data-v-91a80430${_scopeId2}>scope=payments</code>: `);
                } else {
                  return [
                    createTextVNode(" POST to the LFI's token endpoint with "),
                    createVNode("code", null, "scope=payments"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" POST to the LFI's token endpoint with "),
                  createVNode("code", null, "scope=payments"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-retrieve-refund-account",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3 — Retrieve the Refund Account",
        title: "GET /payment-consents/{ConsentId}/refund",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-91a80430${_scopeId}><span class="http-badge http-get" data-v-91a80430${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-91a80430${_scopeId}>/payment-consents/{ConsentId}/refund</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Call the LFI&#39;s refund endpoint using the <code data-v-91a80430${_scopeId2}>ConsentId</code> from the original payment consent. Include <code data-v-91a80430${_scopeId2}>x-fapi-interaction-id</code> on every request. See <a href="/tech/tpp-standards/security/request-headers" data-v-91a80430${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Call the LFI's refund endpoint using the "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" from the original payment consent. Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" on every request. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-91a80430${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The response is a signed JWT. Decode the payload to read the refund account details:`);
                } else {
                  return [
                    createTextVNode("The response is a signed JWT. Decode the payload to read the refund account details:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-91a80430${_scopeId2}><thead data-v-91a80430${_scopeId2}><tr data-v-91a80430${_scopeId2}><th data-v-91a80430${_scopeId2}>Field</th><th data-v-91a80430${_scopeId2}>Type</th><th data-v-91a80430${_scopeId2}>Description</th></tr></thead><tbody data-v-91a80430${_scopeId2}><tr data-v-91a80430${_scopeId2}><td data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>Data.ConsentId</code></td><td data-v-91a80430${_scopeId2}>string</td><td data-v-91a80430${_scopeId2}>The ConsentId of the original payment consent</td></tr><tr data-v-91a80430${_scopeId2}><td data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>Data.BaseConsentId</code></td><td data-v-91a80430${_scopeId2}>string</td><td data-v-91a80430${_scopeId2}>The BaseConsentId, if the consent was part of a multi-payment arrangement</td></tr><tr data-v-91a80430${_scopeId2}><td data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>Data.RefundAccount.SchemeName</code></td><td data-v-91a80430${_scopeId2}>enum</td><td data-v-91a80430${_scopeId2}>Account identifier type — always <code data-v-91a80430${_scopeId2}>IBAN</code></td></tr><tr data-v-91a80430${_scopeId2}><td data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>Data.RefundAccount.Identification</code></td><td data-v-91a80430${_scopeId2}>string</td><td data-v-91a80430${_scopeId2}>The debtor&#39;s IBAN</td></tr><tr data-v-91a80430${_scopeId2}><td data-v-91a80430${_scopeId2}><code data-v-91a80430${_scopeId2}>Data.RefundAccount.Name</code></td><td data-v-91a80430${_scopeId2}>object</td><td data-v-91a80430${_scopeId2}>The debtor&#39;s account name</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.ConsentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The ConsentId of the original payment consent")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.BaseConsentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The BaseConsentId, if the consent was part of a multi-payment arrangement")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.RefundAccount.SchemeName")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Account identifier type — always "),
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.RefundAccount.Identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The debtor's IBAN")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.RefundAccount.Name")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "The debtor's account name")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-91a80430${_scopeId}>Example decoded payload</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "decoded payload"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-91a80430${_scopeId}>Decoding the JWS</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response body is a compact JWS — three base64url-encoded segments separated by <code data-v-91a80430${_scopeId2}>.</code>: `);
                } else {
                  return [
                    createTextVNode(" The response body is a compact JWS — three base64url-encoded segments separated by "),
                    createVNode("code", null, "."),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jwsCompact,
              lang: "plaintext",
              filename: "JWS compact form"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Verify the signature using the LFI&#39;s public key (from their JWKS endpoint), then base64url-decode the payload: `);
                } else {
                  return [
                    createTextVNode(" Verify the signature using the LFI's public key (from their JWKS endpoint), then base64url-decode the payload: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: decodeJwsTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="../open-api/payment-consents-ConsentId-refund" data-v-91a80430${_scopeId2}>GET /payment-consents/{ConsentId}/refund</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "../open-api/payment-consents-ConsentId-refund" }, "GET /payment-consents/{ConsentId}/refund"),
                    createTextVNode(" API reference for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payment-consents/{ConsentId}/refund")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Call the LFI's refund endpoint using the "),
                  createVNode("code", null, "ConsentId"),
                  createTextVNode(" from the original payment consent. Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" on every request. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The response is a signed JWT. Decode the payload to read the refund account details:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.ConsentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The ConsentId of the original payment consent")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.BaseConsentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The BaseConsentId, if the consent was part of a multi-payment arrangement")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.RefundAccount.SchemeName")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Account identifier type — always "),
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.RefundAccount.Identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The debtor's IBAN")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.RefundAccount.Name")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "The debtor's account name")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example decoded payload"),
              createVNode(_component_EdCode, {
                code: exampleResponse,
                lang: "json",
                filename: "decoded payload"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Decoding the JWS"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response body is a compact JWS — three base64url-encoded segments separated by "),
                  createVNode("code", null, "."),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jwsCompact,
                lang: "plaintext",
                filename: "JWS compact form"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Verify the signature using the LFI's public key (from their JWKS endpoint), then base64url-decode the payload: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: decodeJwsTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "../open-api/payment-consents-ConsentId-refund" }, "GET /payment-consents/{ConsentId}/refund"),
                  createTextVNode(" API reference for the full request and response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "initiate-refund",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Using the Refund Account to Initiate a Refund",
        title: "Reuse the debtor's account as the creditor",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once you have the debtor&#39;s <code data-v-91a80430${_scopeId2}>RefundAccount</code> details, use the returned IBAN and name as the <strong data-v-91a80430${_scopeId2}>creditor</strong> in a new payment consent to initiate the refund. The refund payment follows the same initiation flow as any other payment. `);
                } else {
                  return [
                    createTextVNode(" Once you have the debtor's "),
                    createVNode("code", null, "RefundAccount"),
                    createTextVNode(" details, use the returned IBAN and name as the "),
                    createVNode("strong", null, "creditor"),
                    createTextVNode(" in a new payment consent to initiate the refund. The refund payment follows the same initiation flow as any other payment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-91a80430${_scopeId2}>Creditor PII</a> for how to populate the creditor fields using the retrieved account details. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor PII"),
                    createTextVNode(" for how to populate the creditor fields using the retrieved account details. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once you have the debtor's "),
                  createVNode("code", null, "RefundAccount"),
                  createTextVNode(" details, use the returned IBAN and name as the "),
                  createVNode("strong", null, "creditor"),
                  createTextVNode(" in a new payment consent to initiate the refund. The refund payment follows the same initiation flow as any other payment. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor PII"),
                  createTextVNode(" for how to populate the creditor fields using the retrieved account details. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/refunds/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91a80430"]]);
export {
  apiGuide as default
};
