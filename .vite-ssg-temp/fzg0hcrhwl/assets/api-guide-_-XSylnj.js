import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsConfirmationOfPayee-Ccc7-ZyG.js";
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
const step2Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
})
`;
const step2Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
})
`;
const step3Node = `const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT!  // from the LFI's .well-known/openid-configuration

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'confirmation-of-payee',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token: accessToken } = await tokenResponse.json()
`;
const step3Python = `import httpx, os

TOKEN_ENDPOINT = os.environ["TOKEN_ENDPOINT"]  # from the LFI's .well-known/openid-configuration

token_response = httpx.post(
    TOKEN_ENDPOINT,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "confirmation-of-payee",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`;
const step4Node = `// CLIENT_ID and ISSUER already set in Step 2

const discoveryRequest = await signJWT({
  iss: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',   // IBAN to check
    },
  },
})
`;
const step4Python = `# CLIENT_ID and ISSUER already set in Step 2

discovery_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",   # IBAN to check
        }
    },
})
`;
const step5Node = `const LFI_BASE_URL = process.env.LFI_BASE_URL!  // base URL of the LFI you authenticated with in Step 3
// accessToken obtained in Step 3

const discoveryResponse = await fetch(
  \`\${LFI_BASE_URL}/open-finance/confirmation-of-payee/v2.1/discovery\`,
  {
    method:  'POST',
    headers: {
      'Authorization':         \`Bearer \${accessToken}\`,
      'Content-Type':          'application/jwt',
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: discoveryRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const discoveryJwt     = await discoveryResponse.text()
const [, discoveryB64] = discoveryJwt.split('.')
const { message }      = JSON.parse(Buffer.from(discoveryB64, 'base64url').toString())

const { DiscoveryEndpointUrl, ResourceServerUrl } = message.Data
`;
const step5Python = `import httpx, base64, json, os

LFI_BASE_URL = os.environ["LFI_BASE_URL"]  # base URL of the LFI you authenticated with in Step 3
# access_token obtained in Step 3

discovery_response = httpx.post(
    f"{LFI_BASE_URL}/open-finance/confirmation-of-payee/v2.1/discovery",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=discovery_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
discovery_jwt = discovery_response.text
payload_b64   = discovery_jwt.split(".")[1]
message       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))["message"]

discovery_endpoint_url = message["Data"]["DiscoveryEndpointUrl"]
resource_server_url    = message["Data"]["ResourceServerUrl"]
`;
const step6Node = `const oidcConfig    = await fetch(DiscoveryEndpointUrl).then(r => r.json())
const tokenEndpoint = oidcConfig.token_endpoint   // used in Step 8
const issuer        = oidcConfig.issuer           // used in Step 7
`;
const step6Python = `oidc_config    = httpx.get(discovery_endpoint_url).json()
token_endpoint = oidc_config["token_endpoint"]   # used in Step 8
issuer         = oidc_config["issuer"]           # used in Step 7
`;
const step7Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
// issuer resolved from DiscoveryEndpointUrl in Step 6

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
})
`;
const step7Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
# issuer resolved from discovery_endpoint_url in Step 6

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
`;
const step8Node = `// tokenEndpoint resolved from DiscoveryEndpointUrl in Step 6

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'confirmation-of-payee',
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
const step8Python = `import httpx

# token_endpoint resolved from discovery_endpoint_url in Step 6

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "confirmation-of-payee",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`;
const examplePayload = `{
  "Data": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": {
      "FullName": "Ibrahim Al Suwaidi",
      "GivenName": "Ibrahim",
      "LastName": "Al Suwaidi"
    }
  }
}
`;
const step9Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const signedRequest = await signJWT({
  iss: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',
      Name: {
        FullName:  'Ibrahim Al Suwaidi',
        GivenName: 'Ibrahim',
        LastName:  'Al Suwaidi',
      },
    },
  },
})
`;
const step9Python = `import uuid
from sign_jwt import sign_jwt

signed_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",
            "Name": {
                "FullName":  "Ibrahim Al Suwaidi",
                "GivenName": "Ibrahim",
                "LastName":  "Al Suwaidi",
            },
        }
    },
})
`;
const step10Node = `// ResourceServerUrl resolved from discovery in Step 5

const copResponse = await fetch(
  \`\${ResourceServerUrl}/open-finance/confirmation-of-payee/v2.1/confirmation\`,
  {
    method:  'POST',
    headers: {
      'Authorization':       \`Bearer \${access_token}\`,
      'Content-Type':        'application/jwt',
      'Accept':              'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: signedRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt   = await copResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
`;
const step10Python = `import httpx, base64, json

# resource_server_url resolved from discovery in Step 5

cop_response = httpx.post(
    f"{resource_server_url}/open-finance/confirmation-of-payee/v2.1/confirmation",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=signed_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt  = cop_response.text
payload_b64   = response_jwt.split(".")[1]
result        = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
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
const decodedPayload = `{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "nbf": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "NameMatchIndicator": "ConfirmationOfPayee.Partial",
      "MaskedName": "Ibrahim Al S*****"
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation"
    },
    "Meta": {}
  }
}
`;
const consentEmbedJson = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ibrahim Al Suwaidi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ibrahim Al Suwaidi" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."   // full JWS string from Step 10
      }
    ]
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const step2Tabs = [{ label: "Node.js", lang: "typescript", code: step2Node }, { label: "Python", lang: "python", code: step2Python }];
    const step3Tabs = [{ label: "Node.js", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const step4Tabs = [{ label: "Node.js", lang: "typescript", code: step4Node }, { label: "Python", lang: "python", code: step4Python }];
    const step5Tabs = [{ label: "Node.js", lang: "typescript", code: step5Node }, { label: "Python", lang: "python", code: step5Python }];
    const step6Tabs = [{ label: "Node.js", lang: "typescript", code: step6Node }, { label: "Python", lang: "python", code: step6Python }];
    const step7Tabs = [{ label: "Node.js", lang: "typescript", code: step7Node }, { label: "Python", lang: "python", code: step7Python }];
    const step8Tabs = [{ label: "Node.js", lang: "typescript", code: step8Node }, { label: "Python", lang: "python", code: step8Python }];
    const step9Tabs = [{ label: "Node.js", lang: "typescript", code: step9Node }, { label: "Python", lang: "python", code: step9Python }];
    const step10Tabs = [{ label: "Node.js", lang: "typescript", code: step10Node }, { label: "Python", lang: "python", code: step10Python }];
    const decodeJwsTabs = [{ label: "Node.js", lang: "typescript", code: decodeJwsNode }, { label: "Python", lang: "python", code: decodeJwsPython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsConfirmationOfPayee = _sfc_main$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e36bd85e><section class="ed-doc__hero" data-v-e36bd85e><div class="ed-doc__inner" data-v-e36bd85e><div class="ed-doc__eyebrow" data-v-e36bd85e><span class="ed-doc__eyebrow-dash" data-v-e36bd85e></span> TPP · Banking · Confirmation of Payee </div><h1 class="ed-doc__title" data-v-e36bd85e> Confirmation of Payee — API Guide <span class="ed-doc__read" data-v-e36bd85e>4 min read</span></h1><p class="ed-doc__lede" data-v-e36bd85e> Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. Unlike payment flows, CoP does <strong data-v-e36bd85e>not</strong> require user authorization — the TPP authenticates directly using a client credentials grant and the LFI responds with a match result in seconds. </p><p class="ed-doc__lede" data-v-e36bd85e> CoP is served by each participating LFI independently. Before calling an LFI directly, the TPP first calls the API Hub&#39;s <strong data-v-e36bd85e>discovery</strong> endpoint to identify which LFI holds the destination account and retrieve its endpoint URLs. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before calling the CoP API",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before calling the CoP API, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before calling the CoP API, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e36bd85e${_scopeId2}><strong data-v-e36bd85e${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-e36bd85e${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-e36bd85e${_scopeId2}>BSIP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-e36bd85e${_scopeId2}>Roles</a>. </li><li data-v-e36bd85e${_scopeId2}><strong data-v-e36bd85e${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e36bd85e${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-e36bd85e${_scopeId2}>mTLS communication</strong>. </li><li data-v-e36bd85e${_scopeId2}><strong data-v-e36bd85e${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e36bd85e${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign the confirmation request JWT and client assertions. </li><li data-v-e36bd85e${_scopeId2}><strong data-v-e36bd85e${_scopeId2}>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide" data-v-e36bd85e${_scopeId2}>API Hub (Authorisation Server)</a></strong> — the application must be registered with the API Hub (Server) of the LFI that holds the destination account. </li><li data-v-e36bd85e${_scopeId2}><strong data-v-e36bd85e${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/tokens/" data-v-e36bd85e${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how client authentication works with <code data-v-e36bd85e${_scopeId2}>private_key_jwt</code> before calling the token endpoint. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "BSIP role"),
                      createTextVNode(" as defined in "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                      createVNode("strong", null, "mTLS communication"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                      ]),
                      createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign the confirmation request JWT and client assertions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registration with the relevant "),
                        createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                      ]),
                      createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI that holds the destination account. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of "),
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                      ]),
                      createTextVNode(" — you should understand how client authentication works with "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" before calling the token endpoint. ")
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
                  createTextVNode("Before calling the CoP API, ensure the following requirements are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                    createVNode("strong", null, "BSIP role"),
                    createTextVNode(" as defined in "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                    createVNode("strong", null, "mTLS communication"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                    ]),
                    createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign the confirmation request JWT and client assertions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registration with the relevant "),
                      createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                    ]),
                    createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI that holds the destination account. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of "),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                    ]),
                    createTextVNode(" — you should understand how client authentication works with "),
                    createVNode("code", null, "private_key_jwt"),
                    createTextVNode(" before calling the token endpoint. ")
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
        title: "End-to-end Confirmation of Payee",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Confirmation of Payee API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Confirmation of Payee API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-discover-lfi",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1 — Discover the LFI",
        title: "Resolve the IBAN to a specific LFI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` CoP is served by individual LFIs — the <code data-v-e36bd85e${_scopeId2}>/discovery</code> endpoint resolves a payee IBAN to the correct LFI and returns two URLs you will need for the rest of the flow: `);
                } else {
                  return [
                    createTextVNode(" CoP is served by individual LFIs — the "),
                    createVNode("code", null, "/discovery"),
                    createTextVNode(" endpoint resolves a payee IBAN to the correct LFI and returns two URLs you will need for the rest of the flow: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36bd85e${_scopeId2}><thead data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><th data-v-e36bd85e${_scopeId2}>Field</th><th data-v-e36bd85e${_scopeId2}>Description</th></tr></thead><tbody data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>DiscoveryEndpointUrl</code></td><td data-v-e36bd85e${_scopeId2}>The <code data-v-e36bd85e${_scopeId2}>.well-known</code> endpoint for the LFI&#39;s Authorisation Server. Fetch this to obtain the <code data-v-e36bd85e${_scopeId2}>token_endpoint</code> and <code data-v-e36bd85e${_scopeId2}>issuer</code> used in later steps.</td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>ResourceServerUrl</code></td><td data-v-e36bd85e${_scopeId2}>The base URL of the LFI&#39;s API Hub resource server. Use this as the base URL when calling <code data-v-e36bd85e${_scopeId2}>/confirmation</code>.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DiscoveryEndpointUrl")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, ".well-known"),
                            createTextVNode(" endpoint for the LFI's Authorisation Server. Fetch this to obtain the "),
                            createVNode("code", null, "token_endpoint"),
                            createTextVNode(" and "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" used in later steps.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ResourceServerUrl")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The base URL of the LFI's API Hub resource server. Use this as the base URL when calling "),
                            createVNode("code", null, "/confirmation"),
                            createTextVNode(".")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before calling <code data-v-e36bd85e${_scopeId2}>/discovery</code> you must obtain an access token from any LFI you are registered with using a client credentials grant. The API Hub does not make any requests to the LFI when processing <code data-v-e36bd85e${_scopeId2}>/discovery</code> — it resolves the IBAN centrally — so the response is the same regardless of which LFI you authenticate with. You only need to perform discovery once, and the <span class="endpoint" data-v-e36bd85e${_scopeId2}><span class="http-method http-method--post" data-v-e36bd85e${_scopeId2}>POST</span><code data-v-e36bd85e${_scopeId2}>/discovery</code></span> request must be sent to the LFI whose token you are using. `);
                } else {
                  return [
                    createTextVNode(" Before calling "),
                    createVNode("code", null, "/discovery"),
                    createTextVNode(" you must obtain an access token from any LFI you are registered with using a client credentials grant. The API Hub does not make any requests to the LFI when processing "),
                    createVNode("code", null, "/discovery"),
                    createTextVNode(" — it resolves the IBAN centrally — so the response is the same regardless of which LFI you authenticate with. You only need to perform discovery once, and the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/discovery")
                    ]),
                    createTextVNode(" request must be sent to the LFI whose token you are using. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" CoP is served by individual LFIs — the "),
                  createVNode("code", null, "/discovery"),
                  createTextVNode(" endpoint resolves a payee IBAN to the correct LFI and returns two URLs you will need for the rest of the flow: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DiscoveryEndpointUrl")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, ".well-known"),
                          createTextVNode(" endpoint for the LFI's Authorisation Server. Fetch this to obtain the "),
                          createVNode("code", null, "token_endpoint"),
                          createTextVNode(" and "),
                          createVNode("code", null, "issuer"),
                          createTextVNode(" used in later steps.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ResourceServerUrl")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The base URL of the LFI's API Hub resource server. Use this as the base URL when calling "),
                          createVNode("code", null, "/confirmation"),
                          createTextVNode(".")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before calling "),
                  createVNode("code", null, "/discovery"),
                  createTextVNode(" you must obtain an access token from any LFI you are registered with using a client credentials grant. The API Hub does not make any requests to the LFI when processing "),
                  createVNode("code", null, "/discovery"),
                  createTextVNode(" — it resolves the IBAN centrally — so the response is the same regardless of which LFI you authenticate with. You only need to perform discovery once, and the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/discovery")
                  ]),
                  createTextVNode(" request must be sent to the LFI whose token you are using. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-client-assertion",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2 — Build a Client Assertion",
        title: "Prove your application's identity",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>signJWT()</code></a> helper to build a client assertion proving your application&#39;s identity: `);
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
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-e36bd85e${_scopeId2}>Client Assertion</a> for the full claims reference. `);
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
                  createTextVNode(" Use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                    createVNode("code", null, "signJWT()")
                  ]),
                  createTextVNode(" helper to build a client assertion proving your application's identity: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs }),
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
        id: "step-3-token-request",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3 — Token Request",
        title: "Exchange the assertion for an access token",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` POST to any LFI&#39;s token endpoint with <code data-v-e36bd85e${_scopeId2}>scope=confirmation-of-payee</code>: `);
                } else {
                  return [
                    createTextVNode(" POST to any LFI's token endpoint with "),
                    createVNode("code", null, "scope=confirmation-of-payee"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" POST to any LFI's token endpoint with "),
                  createVNode("code", null, "scope=confirmation-of-payee"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-discovery-request",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Step 4 — Build a signed discovery request",
        title: "Sign the IBAN-lookup payload",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The request body is a signed JWT containing the IBAN, signed with your signing key: `);
                } else {
                  return [
                    createTextVNode(" The request body is a signed JWT containing the IBAN, signed with your signing key: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step4Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The request body is a signed JWT containing the IBAN, signed with your signing key: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step4Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-5-post-discovery",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Step 5 — POST /discovery",
        title: "Resolve the LFI for an IBAN",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e36bd85e${_scopeId}><span class="http-badge http-post" data-v-e36bd85e${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e36bd85e${_scopeId}>/discovery</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-e36bd85e${_scopeId2}>x-fapi-interaction-id</code> on the request. See <a href="/tech/tpp-standards/security/request-headers" data-v-e36bd85e${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" on the request. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step5Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="./open-api/discovery" data-v-e36bd85e${_scopeId2}>POST /discovery</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "./open-api/discovery" }, "POST /discovery"),
                    createTextVNode(" API reference for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/discovery")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" on the request. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step5Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "./open-api/discovery" }, "POST /discovery"),
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
        id: "step-6-resolve-token-endpoint",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 6 — Resolve the LFI token endpoint",
        title: "Read the LFI's OpenID configuration",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Fetch the <code data-v-e36bd85e${_scopeId2}>DiscoveryEndpointUrl</code> directly to read the LFI&#39;s OpenID configuration. This gives you the <code data-v-e36bd85e${_scopeId2}>token_endpoint</code> and <code data-v-e36bd85e${_scopeId2}>issuer</code> needed for the next steps: `);
                } else {
                  return [
                    createTextVNode(" Fetch the "),
                    createVNode("code", null, "DiscoveryEndpointUrl"),
                    createTextVNode(" directly to read the LFI's OpenID configuration. This gives you the "),
                    createVNode("code", null, "token_endpoint"),
                    createTextVNode(" and "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(" needed for the next steps: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step6Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Fetch the "),
                  createVNode("code", null, "DiscoveryEndpointUrl"),
                  createTextVNode(" directly to read the LFI's OpenID configuration. This gives you the "),
                  createVNode("code", null, "token_endpoint"),
                  createTextVNode(" and "),
                  createVNode("code", null, "issuer"),
                  createTextVNode(" needed for the next steps: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step6Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-7-client-assertion",
        num: "09",
        color: "var(--at-navy)",
        eyebrow: "Step 7 — Build a Client Assertion",
        title: "Build a fresh assertion for the resolved LFI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>signJWT()</code></a> helper to build a client assertion proving your application&#39;s identity: `);
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
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step7Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-e36bd85e${_scopeId2}>Client Assertion</a> for the full claims reference. `);
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
                  createTextVNode(" Use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                    createVNode("code", null, "signJWT()")
                  ]),
                  createTextVNode(" helper to build a client assertion proving your application's identity: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step7Tabs }),
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
        id: "step-8-token-request",
        num: "10",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 8 — Token Request",
        title: "Get an access token from the resolved LFI",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` POST to the token endpoint (resolved in Step 6) with <code data-v-e36bd85e${_scopeId2}>scope=confirmation-of-payee</code>: `);
                } else {
                  return [
                    createTextVNode(" POST to the token endpoint (resolved in Step 6) with "),
                    createVNode("code", null, "scope=confirmation-of-payee"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step8Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" POST to the token endpoint (resolved in Step 6) with "),
                  createVNode("code", null, "scope=confirmation-of-payee"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step8Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-9-build-confirmation-request",
        num: "11",
        color: "var(--at-teal)",
        eyebrow: "Step 9 — Build and Sign the Confirmation Request",
        title: "POST /confirmation — request payload",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e36bd85e${_scopeId}><span class="http-badge http-post" data-v-e36bd85e${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e36bd85e${_scopeId}>/open-finance/confirmation-of-payee/v2.1/confirmation</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The confirmation request is sent as a <strong data-v-e36bd85e${_scopeId2}>signed JWT</strong> (<code data-v-e36bd85e${_scopeId2}>Content-Type: application/jwt</code>). Build the JWT payload containing the account details you want to verify, then sign it with your signing key. `);
                } else {
                  return [
                    createTextVNode(" The confirmation request is sent as a "),
                    createVNode("strong", null, "signed JWT"),
                    createTextVNode(" ("),
                    createVNode("code", null, "Content-Type: application/jwt"),
                    createTextVNode("). Build the JWT payload containing the account details you want to verify, then sign it with your signing key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36bd85e${_scopeId}>Request payload fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36bd85e${_scopeId2}><thead data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><th data-v-e36bd85e${_scopeId2}>Field</th><th data-v-e36bd85e${_scopeId2}>Type</th><th data-v-e36bd85e${_scopeId2}>Description</th><th data-v-e36bd85e${_scopeId2}>Example</th></tr></thead><tbody data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.SchemeName</code>*</td><td data-v-e36bd85e${_scopeId2}>enum</td><td data-v-e36bd85e${_scopeId2}>Account identifier type — always <code data-v-e36bd85e${_scopeId2}>IBAN</code></td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>IBAN</code></td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.Identification</code>*</td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>The IBAN to verify</td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>AE070331234567890123456</code></td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.Name.FullName</code>*</td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>Full name of the account holder</td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Ibrahim Al Suwaidi</code></td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.Name.GivenName</code></td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>Given (first) name — individual accounts</td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Ibrahim</code></td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.Name.LastName</code></td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>Family name — individual accounts</td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Al Suwaidi</code></td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.Name.BusinessName</code></td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>Registered business name — use instead of personal name fields for business accounts</td><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Business Inc.</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.SchemeName"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Account identifier type — always "),
                            createVNode("code", null, "IBAN")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.Identification"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The IBAN to verify"),
                          createVNode("td", null, [
                            createVNode("code", null, "AE070331234567890123456")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.Name.FullName"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Full name of the account holder"),
                          createVNode("td", null, [
                            createVNode("code", null, "Ibrahim Al Suwaidi")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.Name.GivenName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Given (first) name — individual accounts"),
                          createVNode("td", null, [
                            createVNode("code", null, "Ibrahim")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.Name.LastName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Family name — individual accounts"),
                          createVNode("td", null, [
                            createVNode("code", null, "Al Suwaidi")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.Name.BusinessName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Registered business name — use instead of personal name fields for business accounts"),
                          createVNode("td", null, [
                            createVNode("code", null, "Business Inc.")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Individual vs. Business"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e36bd85e${_scopeId2}> Provide <code data-v-e36bd85e${_scopeId2}>GivenName</code> + <code data-v-e36bd85e${_scopeId2}>LastName</code> for personal accounts, or <code data-v-e36bd85e${_scopeId2}>BusinessName</code> for business accounts. Do not mix both. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Provide "),
                      createVNode("code", null, "GivenName"),
                      createTextVNode(" + "),
                      createVNode("code", null, "LastName"),
                      createTextVNode(" for personal accounts, or "),
                      createVNode("code", null, "BusinessName"),
                      createTextVNode(" for business accounts. Do not mix both. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36bd85e${_scopeId}>Example payload (inside the JWT <code data-v-e36bd85e${_scopeId}>message</code> claim)</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: examplePayload,
              lang: "json",
              filename: "message claim"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36bd85e${_scopeId}>Signing the request</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>signJWT()</code></a> helper, wrapping the payload in a <code data-v-e36bd85e${_scopeId2}>message</code> claim: `);
                } else {
                  return [
                    createTextVNode(" Use the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                      createVNode("code", null, "signJWT()")
                    ]),
                    createTextVNode(" helper, wrapping the payload in a "),
                    createVNode("code", null, "message"),
                    createTextVNode(" claim: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step9Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/open-finance/confirmation-of-payee/v2.1/confirmation")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The confirmation request is sent as a "),
                  createVNode("strong", null, "signed JWT"),
                  createTextVNode(" ("),
                  createVNode("code", null, "Content-Type: application/jwt"),
                  createTextVNode("). Build the JWT payload containing the account details you want to verify, then sign it with your signing key. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request payload fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.SchemeName"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Account identifier type — always "),
                          createVNode("code", null, "IBAN")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.Identification"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The IBAN to verify"),
                        createVNode("td", null, [
                          createVNode("code", null, "AE070331234567890123456")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.Name.FullName"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Full name of the account holder"),
                        createVNode("td", null, [
                          createVNode("code", null, "Ibrahim Al Suwaidi")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.Name.GivenName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Given (first) name — individual accounts"),
                        createVNode("td", null, [
                          createVNode("code", null, "Ibrahim")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.Name.LastName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Family name — individual accounts"),
                        createVNode("td", null, [
                          createVNode("code", null, "Al Suwaidi")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.Name.BusinessName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Registered business name — use instead of personal name fields for business accounts"),
                        createVNode("td", null, [
                          createVNode("code", null, "Business Inc.")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Individual vs. Business"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Provide "),
                    createVNode("code", null, "GivenName"),
                    createTextVNode(" + "),
                    createVNode("code", null, "LastName"),
                    createTextVNode(" for personal accounts, or "),
                    createVNode("code", null, "BusinessName"),
                    createTextVNode(" for business accounts. Do not mix both. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("Example payload (inside the JWT "),
                createVNode("code", null, "message"),
                createTextVNode(" claim)")
              ]),
              createVNode(_component_EdCode, {
                code: examplePayload,
                lang: "json",
                filename: "message claim"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Signing the request"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                    createVNode("code", null, "signJWT()")
                  ]),
                  createTextVNode(" helper, wrapping the payload in a "),
                  createVNode("code", null, "message"),
                  createTextVNode(" claim: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step9Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-10-post-confirmation",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Step 10 — POST /confirmation",
        title: "Send the signed JWT and decode the response",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Send the signed JWT to the LFI&#39;s CoP endpoint using the <code data-v-e36bd85e${_scopeId2}>ResourceServerUrl</code> resolved in Step 5. Both the request body and the response are JWTs. Include <code data-v-e36bd85e${_scopeId2}>x-fapi-interaction-id</code> on every request. See <a href="/tech/tpp-standards/security/request-headers" data-v-e36bd85e${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Send the signed JWT to the LFI's CoP endpoint using the "),
                    createVNode("code", null, "ResourceServerUrl"),
                    createTextVNode(" resolved in Step 5. Both the request body and the response are JWTs. Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" on every request. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step10Tabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36bd85e${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The response is a signed JWT. Decode the payload to read the match result:`);
                } else {
                  return [
                    createTextVNode("The response is a signed JWT. Decode the payload to read the match result:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36bd85e${_scopeId2}><thead data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><th data-v-e36bd85e${_scopeId2}>Field</th><th data-v-e36bd85e${_scopeId2}>Type</th><th data-v-e36bd85e${_scopeId2}>Description</th></tr></thead><tbody data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.NameMatchIndicator</code></td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>The result of the name match check — see enum below</td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>Data.MaskedName</code></td><td data-v-e36bd85e${_scopeId2}>string</td><td data-v-e36bd85e${_scopeId2}>The account holder&#39;s name, partially masked. Returned on <code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.Partial</code> and <code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.No</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "Data.NameMatchIndicator")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The result of the name match check — see enum below")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Data.MaskedName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("The account holder's name, partially masked. Returned on "),
                            createVNode("code", null, "ConfirmationOfPayee.Partial"),
                            createTextVNode(" and "),
                            createVNode("code", null, "ConfirmationOfPayee.No")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36bd85e${_scopeId2}><thead data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><th data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>NameMatchIndicator</code></th><th data-v-e36bd85e${_scopeId2}>Meaning</th></tr></thead><tbody data-v-e36bd85e${_scopeId2}><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.Yes</code></td><td data-v-e36bd85e${_scopeId2}>Name and account match — safe to proceed</td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.Partial</code></td><td data-v-e36bd85e${_scopeId2}>Name partially matches — present the <code data-v-e36bd85e${_scopeId2}>MaskedName</code> to the payer</td></tr><tr data-v-e36bd85e${_scopeId2}><td data-v-e36bd85e${_scopeId2}><code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.No</code></td><td data-v-e36bd85e${_scopeId2}>Name does not match — present the <code data-v-e36bd85e${_scopeId2}>MaskedName</code> to the payer</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "NameMatchIndicator")
                          ]),
                          createVNode("th", null, "Meaning")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConfirmationOfPayee.Yes")
                          ]),
                          createVNode("td", null, "Name and account match — safe to proceed")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConfirmationOfPayee.Partial")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Name partially matches — present the "),
                            createVNode("code", null, "MaskedName"),
                            createTextVNode(" to the payer")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConfirmationOfPayee.No")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Name does not match — present the "),
                            createVNode("code", null, "MaskedName"),
                            createTextVNode(" to the payer")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Proceed with caution on non-Yes results"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e36bd85e${_scopeId2}> A <code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.Partial</code> or <code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayee.No</code> result must be surfaced to the payer — along with the <code data-v-e36bd85e${_scopeId2}>MaskedName</code> — before initiating a payment. Proceeding without informing the user may increase the risk of authorised push payment fraud. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A "),
                      createVNode("code", null, "ConfirmationOfPayee.Partial"),
                      createTextVNode(" or "),
                      createVNode("code", null, "ConfirmationOfPayee.No"),
                      createTextVNode(" result must be surfaced to the payer — along with the "),
                      createVNode("code", null, "MaskedName"),
                      createTextVNode(" — before initiating a payment. Proceeding without informing the user may increase the risk of authorised push payment fraud. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36bd85e${_scopeId}>Decoding the JWS</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-e36bd85e${_scopeId2}>/confirmation</code> response body is a compact JWS — three base64url-encoded segments separated by <code data-v-e36bd85e${_scopeId2}>.</code>: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "/confirmation"),
                    createTextVNode(" response body is a compact JWS — three base64url-encoded segments separated by "),
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
                  _push3(` Verify the signature using the LFI&#39;s public key, then base64url-decode the payload: `);
                } else {
                  return [
                    createTextVNode(" Verify the signature using the LFI's public key, then base64url-decode the payload: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: decodeJwsTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The decoded payload contains a <code data-v-e36bd85e${_scopeId2}>message</code> object with the CoP result under <code data-v-e36bd85e${_scopeId2}>message.Data</code>: `);
                } else {
                  return [
                    createTextVNode(" The decoded payload contains a "),
                    createVNode("code", null, "message"),
                    createTextVNode(" object with the CoP result under "),
                    createVNode("code", null, "message.Data"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: decodedPayload,
              lang: "json",
              filename: "decoded payload"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="./open-api/confirmation" data-v-e36bd85e${_scopeId2}>POST /confirmation</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "./open-api/confirmation" }, "POST /confirmation"),
                    createTextVNode(" API reference for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Send the signed JWT to the LFI's CoP endpoint using the "),
                  createVNode("code", null, "ResourceServerUrl"),
                  createTextVNode(" resolved in Step 5. Both the request body and the response are JWTs. Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" on every request. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step10Tabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The response is a signed JWT. Decode the payload to read the match result:")
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
                          createVNode("code", null, "Data.NameMatchIndicator")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The result of the name match check — see enum below")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Data.MaskedName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("The account holder's name, partially masked. Returned on "),
                          createVNode("code", null, "ConfirmationOfPayee.Partial"),
                          createTextVNode(" and "),
                          createVNode("code", null, "ConfirmationOfPayee.No")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "NameMatchIndicator")
                        ]),
                        createVNode("th", null, "Meaning")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConfirmationOfPayee.Yes")
                        ]),
                        createVNode("td", null, "Name and account match — safe to proceed")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConfirmationOfPayee.Partial")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Name partially matches — present the "),
                          createVNode("code", null, "MaskedName"),
                          createTextVNode(" to the payer")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConfirmationOfPayee.No")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Name does not match — present the "),
                          createVNode("code", null, "MaskedName"),
                          createTextVNode(" to the payer")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Proceed with caution on non-Yes results"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A "),
                    createVNode("code", null, "ConfirmationOfPayee.Partial"),
                    createTextVNode(" or "),
                    createVNode("code", null, "ConfirmationOfPayee.No"),
                    createTextVNode(" result must be surfaced to the payer — along with the "),
                    createVNode("code", null, "MaskedName"),
                    createTextVNode(" — before initiating a payment. Proceeding without informing the user may increase the risk of authorised push payment fraud. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Decoding the JWS"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "/confirmation"),
                  createTextVNode(" response body is a compact JWS — three base64url-encoded segments separated by "),
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
                  createTextVNode(" Verify the signature using the LFI's public key, then base64url-decode the payload: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: decodeJwsTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The decoded payload contains a "),
                  createVNode("code", null, "message"),
                  createTextVNode(" object with the CoP result under "),
                  createVNode("code", null, "message.Data"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: decodedPayload,
                lang: "json",
                filename: "decoded payload"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "./open-api/confirmation" }, "POST /confirmation"),
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
        id: "cop-in-payment-consent",
        num: "13",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Embedding the result",
        title: "Using the CoP Response in a Payment Consent",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where Confirmation of Payee has been performed for a creditor, include the <strong data-v-e36bd85e${_scopeId2}>full raw JWS response string</strong> returned by the <code data-v-e36bd85e${_scopeId2}>/confirmation</code> endpoint in the <code data-v-e36bd85e${_scopeId2}>ConfirmationOfPayeeResponse</code> field of the creditor entry inside the payment consent PII. `);
                } else {
                  return [
                    createTextVNode(" Where Confirmation of Payee has been performed for a creditor, include the "),
                    createVNode("strong", null, "full raw JWS response string"),
                    createTextVNode(" returned by the "),
                    createVNode("code", null, "/confirmation"),
                    createTextVNode(" endpoint in the "),
                    createVNode("code", null, "ConfirmationOfPayeeResponse"),
                    createTextVNode(" field of the creditor entry inside the payment consent PII. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: consentEmbedJson,
              lang: "json",
              filename: "payment consent excerpt"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This gives the LFI confidence that the creditor account details have been verified before the payment consent was created. The value must be the complete compact JWS string — do not decode it to an object before embedding. `);
                } else {
                  return [
                    createTextVNode(" This gives the LFI confidence that the creditor account details have been verified before the payment consent was created. The value must be the complete compact JWS string — do not decode it to an object before embedding. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" data-v-e36bd85e${_scopeId2}>Creditor</a> for the full PII creditor schema and the creditor models (single, multiple, and open beneficiary). `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(" for the full PII creditor schema and the creditor models (single, multiple, and open beneficiary). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys" data-v-e36bd85e${_scopeId2}>Confirmation of Payee — User Experience</a> for consent and authorisation page examples across different match results. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys" }, "Confirmation of Payee — User Experience"),
                    createTextVNode(" for consent and authorisation page examples across different match results. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where Confirmation of Payee has been performed for a creditor, include the "),
                  createVNode("strong", null, "full raw JWS response string"),
                  createTextVNode(" returned by the "),
                  createVNode("code", null, "/confirmation"),
                  createTextVNode(" endpoint in the "),
                  createVNode("code", null, "ConfirmationOfPayeeResponse"),
                  createTextVNode(" field of the creditor entry inside the payment consent PII. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: consentEmbedJson,
                lang: "json",
                filename: "payment consent excerpt"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This gives the LFI confidence that the creditor account details have been verified before the payment consent was created. The value must be the complete compact JWS string — do not decode it to an object before embedding. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                  createTextVNode(" for the full PII creditor schema and the creditor models (single, multiple, and open beneficiary). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys" }, "Confirmation of Payee — User Experience"),
                  createTextVNode(" for consent and authorisation page examples across different match results. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e36bd85e"]]);
export {
  apiGuide as default
};
