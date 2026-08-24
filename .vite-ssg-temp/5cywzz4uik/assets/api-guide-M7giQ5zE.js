import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as _sfc_main$1 } from "./APIFlowsATMs-DUJH6uNc.js";
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
const ISSUER    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
})
`;
const step1Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
})
`;
const step2Node = `const TOKEN_ENDPOINT = process.env.LFI_TOKEN_ENDPOINT!

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'atm',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
`;
const step2Python = `import httpx, os

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "atm",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`;
const step3Node = `import crypto from 'node:crypto'

const API_BASE = process.env.LFI_API_BASE!

const response = await fetch(\`\${API_BASE}/open-finance/atm/v2.1/atms\`, {
  method: 'GET',
  headers: {
    'Authorization':         \`Bearer \${access_token}\`,
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data, Meta } = await response.json()
// Data — array of ATM records
// Meta.TotalRecords — total count
// Meta.LastUpdatedDateTime — when the data was last refreshed
`;
const step3Python = `import httpx, uuid, os

api_base = os.environ["LFI_API_BASE"]

response = httpx.get(
    f"{api_base}/open-finance/atm/v2.1/atms",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

payload      = response.json()
atms         = payload["Data"]
total        = payload["Meta"]["TotalRecords"]
last_updated = payload["Meta"]["LastUpdatedDateTime"]
`;
const responseJson = `{
  "Data": [
    {
      "ATMId": "ATM-001",
      "LFIId": "ADCB",
      "LFIBrandId": "ADCB",
      "SupportedCurrencies": ["AED"],
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "MinimumPossibleAmount": { "Amount": "20.00", "Currency": "AED" },
      "MaximumPossibleAmount": { "Amount": "5000.00", "Currency": "AED" },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "StreetName": "Corniche Road",
          "TownName": "Abu Dhabi",
          "CountrySubDivision": "AbuDhabi",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "24.4539",
          "Longitude": "54.3773"
        }
      }
    }
  ],
  "Meta": {
    "TotalRecords": 1,
    "LastUpdatedDateTime": "2025-03-21T08:00:00Z"
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
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
    const step3Tabs = [
      { label: "Node.js", lang: "typescript", code: step3Node },
      { label: "Python", lang: "python", code: step3Python }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsATMs = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-f930d286><section class="ed-doc__hero" data-v-f930d286><div class="ed-doc__inner" data-v-f930d286><div class="ed-doc__eyebrow" data-v-f930d286><span class="ed-doc__eyebrow-dash" data-v-f930d286></span> TPP · Banking · ATMs </div><h1 class="ed-doc__title" data-v-f930d286> ATMs — API Guide <span class="ed-doc__read" data-v-f930d286>2 min read</span></h1><p class="ed-doc__lede" data-v-f930d286> The ATM API exposes a single endpoint — <span class="endpoint" data-v-f930d286><span class="http-method http-method--get" data-v-f930d286>GET</span><code data-v-f930d286>/atms</code></span> — that returns the details of all ATMs managed by the LFI. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before calling the ATM API",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before calling the ATM API, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before calling the ATM API, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f930d286${_scopeId2}><strong data-v-f930d286${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-f930d286${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-f930d286${_scopeId2}>BDSP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-f930d286${_scopeId2}>Roles</a>. </li><li data-v-f930d286${_scopeId2}><strong data-v-f930d286${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-f930d286${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-f930d286${_scopeId2}>mTLS communication</strong> with the LFI. </li><li data-v-f930d286${_scopeId2}><strong data-v-f930d286${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-f930d286${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework for client authentication. </li><li data-v-f930d286${_scopeId2}><strong data-v-f930d286${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/tokens/" data-v-f930d286${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how client authentication works with <code data-v-f930d286${_scopeId2}>private_key_jwt</code> before calling the token endpoint. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "BDSP role"),
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
                      createTextVNode(" with the LFI. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                      ]),
                      createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework for client authentication. ")
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
                  createTextVNode("Before calling the ATM API, ensure the following requirements are met:")
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
                    createVNode("strong", null, "BDSP role"),
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
                    createTextVNode(" with the LFI. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                    ]),
                    createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework for client authentication. ")
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
        title: "End-to-end ATM request",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "ATM API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsATMs, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsATMs)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "ATM API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsATMs)
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
                  _push3(` The ATM API uses the OAuth 2.0 <strong data-v-f930d286${_scopeId2}>client credentials</strong> grant with <code data-v-f930d286${_scopeId2}>scope=atm</code>. `);
                } else {
                  return [
                    createTextVNode(" The ATM API uses the OAuth 2.0 "),
                    createVNode("strong", null, "client credentials"),
                    createTextVNode(" grant with "),
                    createVNode("code", null, "scope=atm"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-f930d286${_scopeId2}><code data-v-f930d286${_scopeId2}>signJWT()</code></a> helper to build a client assertion proving your application&#39;s identity: `);
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
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-f930d286${_scopeId2}>Client Assertion</a> for the full claims reference. `);
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
                  createTextVNode(" The ATM API uses the OAuth 2.0 "),
                  createVNode("strong", null, "client credentials"),
                  createTextVNode(" grant with "),
                  createVNode("code", null, "scope=atm"),
                  createTextVNode(". ")
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
                  _push3(` POST to the LFI&#39;s token endpoint with <code data-v-f930d286${_scopeId2}>scope=atm</code>: `);
                } else {
                  return [
                    createTextVNode(" POST to the LFI's token endpoint with "),
                    createVNode("code", null, "scope=atm"),
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
                  createVNode("code", null, "scope=atm"),
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
        id: "step-3-get-atms",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3 — GET /atms",
        title: "Retrieve the ATM directory",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-f930d286${_scopeId}><span class="http-badge http-get" data-v-f930d286${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-f930d286${_scopeId}>/atms</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Call the endpoint with the access token. Include <code data-v-f930d286${_scopeId2}>x-fapi-interaction-id</code> on every request. See <a href="/tech/tpp-standards/security/request-headers" data-v-f930d286${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Call the endpoint with the access token. Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" on every request. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-f930d286${_scopeId2}>x-fapi-customer-ip-address</code> is <strong data-v-f930d286${_scopeId2}>not</strong> required for ATMs — the data is static and public, so no customer is involved in the call. `);
                } else {
                  return [
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" required for ATMs — the data is static and public, so no customer is involved in the call. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-f930d286${_scopeId2}>LFI_API_BASE</code> is the LFI&#39;s API Hub resource server — <code data-v-f930d286${_scopeId2}>https://rs1.&lt;lfiCode&gt;.apihub.openfinance.ae</code> (production) or <code data-v-f930d286${_scopeId2}>https://rs1.&lt;lfiCode&gt;.sandbox.apihub.openfinance.ae</code> (sandbox). Resolve the <code data-v-f930d286${_scopeId2}>&lt;lfiCode&gt;</code> from the <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-f930d286${_scopeId2}>Trust Framework Directory</a>. See <a href="/tech/tpp-standards/trust-framework/api-resources" data-v-f930d286${_scopeId2}>API Resources</a> for the full endpoint format. `);
                } else {
                  return [
                    createVNode("code", null, "LFI_API_BASE"),
                    createTextVNode(" is the LFI's API Hub resource server — "),
                    createVNode("code", null, "https://rs1.<lfiCode>.apihub.openfinance.ae"),
                    createTextVNode(" (production) or "),
                    createVNode("code", null, "https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae"),
                    createTextVNode(" (sandbox). Resolve the "),
                    createVNode("code", null, "<lfiCode>"),
                    createTextVNode(" from the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "Trust Framework Directory"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                    createTextVNode(" for the full endpoint format. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-f930d286${_scopeId}>Response structure</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: responseJson,
              lang: "json",
              filename: "response body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="./open-api/atms" data-v-f930d286${_scopeId2}>GET /atms</a> API reference for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "./open-api/atms" }, "GET /atms"),
                    createTextVNode(" API reference for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/atms")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Call the endpoint with the access token. Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" on every request. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(" is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" required for ATMs — the data is static and public, so no customer is involved in the call. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "LFI_API_BASE"),
                  createTextVNode(" is the LFI's API Hub resource server — "),
                  createVNode("code", null, "https://rs1.<lfiCode>.apihub.openfinance.ae"),
                  createTextVNode(" (production) or "),
                  createVNode("code", null, "https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae"),
                  createTextVNode(" (sandbox). Resolve the "),
                  createVNode("code", null, "<lfiCode>"),
                  createTextVNode(" from the "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "Trust Framework Directory"),
                  createTextVNode(". See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                  createTextVNode(" for the full endpoint format. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response structure"),
              createVNode(_component_EdCode, {
                code: responseJson,
                lang: "json",
                filename: "response body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "./open-api/atms" }, "GET /atms"),
                  createTextVNode(" API reference for the full response schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/atms/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f930d286"]]);
export {
  apiGuide as default
};
