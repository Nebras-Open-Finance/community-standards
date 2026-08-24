import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as _sfc_main$1 } from "./APIFlowsConsentFlow-BEf4Z_Mx.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const callbackUrl = "https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const parTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// PAR endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const PAR_ENDPOINT = discoveryDoc.pushed_authorization_request_endpoint

const parResponse = await fetch(PAR_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    request:               requestJWT,           // signed Request JWT containing authorization_details
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri } = await parResponse.json()`
      },
      {
        label: "Python",
        lang: "python",
        code: `import httpx

# PAR endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
par_endpoint = discovery_doc["pushed_authorization_request_endpoint"]

par_response = httpx.post(
    par_endpoint,
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

request_uri = par_response.json()["request_uri"]`
      }
    ];
    const redirectTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// authorization_endpoint from .well-known/openid-configuration
// Each LFI sets its own path — there is no fixed structure
// e.g. on the altareq1 sandbox: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl = \`\${AUTHORIZATION_ENDPOINT}?client_id=\${CLIENT_ID}&response_type=code&request_uri=\${encodeURIComponent(request_uri)}\`

window.location.href = authCodeUrl
// or server-side: res.redirect(authCodeUrl)`
      },
      {
        label: "Python",
        lang: "python",
        code: `import urllib.parse

AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)`
      }
    ];
    const tokenTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token, refresh_token, expires_in } = await tokenResponse.json()`
      },
      {
        label: "Python",
        lang: "python",
        code: `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]`
      }
    ];
    const ccTokenTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'openid accounts',   // or 'openid payments' for service initiation
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      await buildClientAssertion(),
})

// Reuse the TOKEN_ENDPOINT discovered above (discoveryDoc.token_endpoint).
const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()`
      },
      {
        label: "Python",
        lang: "python",
        code: `# Reuse the token_endpoint discovered above (discovery_doc["token_endpoint"]).
token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "accounts",   # or "payments" for service initiation
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]`
      }
    ];
    const dataSharingPollTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const LFI_API_BASE = process.env.LFI_API_BASE_URL!

const consentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/account-access-consents/\${consentId}\`,
  {
    headers: { Authorization: \`Bearer \${access_token}\` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, Permissions, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(\`Consent not authorized: \${Status}\`)
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/account-access-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")`
      }
    ];
    const insurancePollTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const consentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/insurance-consents/\${consentId}\`,
  {
    headers: { Authorization: \`Bearer \${access_token}\` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, Permissions, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(\`Consent not authorized: \${Status}\`)
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/insurance-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")`
      }
    ];
    const serviceInitPollTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const consentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/payment-consents/\${consentId}\`,
  {
    headers: { Authorization: \`Bearer \${access_token}\` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, ControlParameters, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(\`Consent not authorized: \${Status}\`)
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payment-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsConsentFlow = _sfc_main$1;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e75676ce><section class="ed-doc__hero" data-v-e75676ce><div class="ed-doc__inner" data-v-e75676ce><div class="ed-doc__eyebrow" data-v-e75676ce><span class="ed-doc__eyebrow-dash" data-v-e75676ce></span> TPP Standards · v2.1 · Consent · API Guide </div><h1 class="ed-doc__title" data-v-e75676ce> Consent — API Guide <span class="ed-doc__read" data-v-e75676ce>3 min read</span></h1><p class="ed-doc__lede" data-v-e75676ce> In UAE Open Finance, a <strong data-v-e75676ce>Consent</strong> is a structured, user-authorized agreement that grants a TPP specific rights to access data or initiate payments on a user&#39;s behalf. All API access is consent-bound — you cannot call a resource endpoint without a valid, authorized consent. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-e75676ce> Consents are created through the <strong data-v-e75676ce>Pushed Authorization Request</strong> flow (<a href="/tech/tpp-standards/security/fapi/" data-v-e75676ce>FAPI 2.0 PAR</a>). Rather than creating a consent resource directly, the TPP embeds the consent definition inside a signed Request JWT and pushes it to the Authorization Server. The user then authenticates at the LFI and explicitly authorizes the consent. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-types",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Three flavours",
        title: "Consent types",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e75676ce${_scopeId2}><thead data-v-e75676ce${_scopeId2}><tr data-v-e75676ce${_scopeId2}><th data-v-e75676ce${_scopeId2}>Type</th><th data-v-e75676ce${_scopeId2}><code data-v-e75676ce${_scopeId2}>authorization_details.type</code></th><th data-v-e75676ce${_scopeId2}>Used for</th></tr></thead><tbody data-v-e75676ce${_scopeId2}><tr data-v-e75676ce${_scopeId2}><td data-v-e75676ce${_scopeId2}><strong data-v-e75676ce${_scopeId2}>Bank Data Sharing</strong></td><td data-v-e75676ce${_scopeId2}><code data-v-e75676ce${_scopeId2}>urn:openfinanceuae:account-access-consent:v2.1</code></td><td data-v-e75676ce${_scopeId2}>Reading account information, balances, transactions</td></tr><tr data-v-e75676ce${_scopeId2}><td data-v-e75676ce${_scopeId2}><strong data-v-e75676ce${_scopeId2}>Service Initiation</strong></td><td data-v-e75676ce${_scopeId2}><code data-v-e75676ce${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.1</code></td><td data-v-e75676ce${_scopeId2}>Initiating domestic payments</td></tr><tr data-v-e75676ce${_scopeId2}><td data-v-e75676ce${_scopeId2}><strong data-v-e75676ce${_scopeId2}>Insurance Data Sharing</strong></td><td data-v-e75676ce${_scopeId2}><code data-v-e75676ce${_scopeId2}>urn:openfinanceuae:insurance-consent:v2.1</code></td><td data-v-e75676ce${_scopeId2}>Reading insurance policy details</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Type"),
                          createVNode("th", null, [
                            createVNode("code", null, "authorization_details.type")
                          ]),
                          createVNode("th", null, "Used for")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Bank Data Sharing")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:openfinanceuae:account-access-consent:v2.1")
                          ]),
                          createVNode("td", null, "Reading account information, balances, transactions")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Service Initiation")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.1")
                          ]),
                          createVNode("td", null, "Initiating domestic payments")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Insurance Data Sharing")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.1")
                          ]),
                          createVNode("td", null, "Reading insurance policy details")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Type"),
                        createVNode("th", null, [
                          createVNode("code", null, "authorization_details.type")
                        ]),
                        createVNode("th", null, "Used for")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Bank Data Sharing")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:openfinanceuae:account-access-consent:v2.1")
                        ]),
                        createVNode("td", null, "Reading account information, balances, transactions")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Service Initiation")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.1")
                        ]),
                        createVNode("td", null, "Initiating domestic payments")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Insurance Data Sharing")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.1")
                        ]),
                        createVNode("td", null, "Reading insurance policy details")
                      ])
                    ])
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
        id: "api-sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "End-to-end",
        title: "API sequence flow",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowViewer, { title: "Consent Flow" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_APIFlowsConsentFlow, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_APIFlowsConsentFlow)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowViewer, { title: "Consent Flow" }, {
                      default: withCtx(() => [
                        createVNode(_component_APIFlowsConsentFlow)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowViewer, { title: "Consent Flow" }, {
                    default: withCtx(() => [
                      createVNode(_component_APIFlowsConsentFlow)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "post-par",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Stage the consent",
        title: "POST /par",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e75676ce${_scopeId}><span class="http-badge http-post" data-v-e75676ce${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e75676ce${_scopeId}>/par</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Push the signed Request JWT to the Authorization Server. The <code data-v-e75676ce${_scopeId2}>authorization_details</code> inside the JWT carries the full consent definition — account permissions, payment amounts, billing details, and (for payments) encrypted PII. `);
                } else {
                  return [
                    createTextVNode(" Push the signed Request JWT to the Authorization Server. The "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" inside the JWT carries the full consent definition — account permissions, payment amounts, billing details, and (for payments) encrypted PII. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: parTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the full construction of <code data-v-e75676ce${_scopeId2}>authorization_details</code> — including field tables, PII encryption, and code examples — see the specific API guides, for example: `);
                } else {
                  return [
                    createTextVNode(" For the full construction of "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" — including field tables, PII encryption, and code examples — see the specific API guides, for example: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e75676ce${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" data-v-e75676ce${_scopeId2}>Bank Data Sharing — API Guide</a></li><li data-v-e75676ce${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" data-v-e75676ce${_scopeId2}> Single Instant Payment — API Guide </a></li><li data-v-e75676ce${_scopeId2}><a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/" data-v-e75676ce${_scopeId2}>Insurance Data Sharing — API Guide</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing — API Guide")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, " Single Instant Payment — API Guide ")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/" }, "Insurance Data Sharing — API Guide")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-e75676ce${_scopeId2}>Preparing the Request JWT</a> for how to build and sign the Request JWT, and <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--post" data-v-e75676ce${_scopeId2}>POST</span><code data-v-e75676ce${_scopeId2}>/par</code></a> for the full API reference. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                    createTextVNode(" for how to build and sign the Request JWT, and "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" for the full API reference. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/par")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Push the signed Request JWT to the Authorization Server. The "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" inside the JWT carries the full consent definition — account permissions, payment amounts, billing details, and (for payments) encrypted PII. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: parTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the full construction of "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" — including field tables, PII encryption, and code examples — see the specific API guides, for example: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing — API Guide")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, " Single Instant Payment — API Guide ")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/" }, "Insurance Data Sharing — API Guide")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                  createTextVNode(" for how to build and sign the Request JWT, and "),
                  createVNode("a", {
                    href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(" for the full API reference. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "redirect-user",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "Hand off to the LFI",
        title: "Redirecting the user",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Build the authorization URL using the <code data-v-e75676ce${_scopeId2}>authorization_endpoint</code> from the LFI&#39;s <code data-v-e75676ce${_scopeId2}>.well-known/openid-configuration</code> and the <code data-v-e75676ce${_scopeId2}>request_uri</code> returned by <code data-v-e75676ce${_scopeId2}>/par</code>: `);
                } else {
                  return [
                    createTextVNode(" Build the authorization URL using the "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(" from the LFI's "),
                    createVNode("code", null, ".well-known/openid-configuration"),
                    createTextVNode(" and the "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(" returned by "),
                    createVNode("code", null, "/par"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: redirectTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The user will authenticate with their bank and authorize the consent on the LFI&#39;s authorization screen. `);
                } else {
                  return [
                    createTextVNode(" The user will authenticate with their bank and authorize the consent on the LFI's authorization screen. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Build the authorization URL using the "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(" from the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" and the "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(" returned by "),
                  createVNode("code", null, "/par"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: redirectTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The user will authenticate with their bank and authorize the consent on the LFI's authorization screen. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "callback",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "Back to the TPP",
        title: "Handling the callback",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After authorization, the LFI redirects the user back to your <code data-v-e75676ce${_scopeId2}>redirect_uri</code>: `);
                } else {
                  return [
                    createTextVNode(" After authorization, the LFI redirects the user back to your "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: callbackUrl,
              lang: "plaintext"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Always validate <code data-v-e75676ce${_scopeId2}>state</code> and <code data-v-e75676ce${_scopeId2}>iss</code> before proceeding. See <a href="/tech/tpp-standards/security/fapi/handling-callback" data-v-e75676ce${_scopeId2}>Handling Authorization Callbacks</a> for the full security guide. `);
                } else {
                  return [
                    createTextVNode(" Always validate "),
                    createVNode("code", null, "state"),
                    createTextVNode(" and "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" before proceeding. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                    createTextVNode(" for the full security guide. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After authorization, the LFI redirects the user back to your "),
                  createVNode("code", null, "redirect_uri"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: callbackUrl,
                lang: "plaintext"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Always validate "),
                  createVNode("code", null, "state"),
                  createTextVNode(" and "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" before proceeding. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                  createTextVNode(" for the full security guide. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "post-token",
        num: "06",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Exchange the code",
        title: "POST /token",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e75676ce${_scopeId}><span class="http-badge http-post" data-v-e75676ce${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e75676ce${_scopeId}>/token</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Exchange the authorization code for an access token and refresh token. The <code data-v-e75676ce${_scopeId2}>code_verifier</code> must match the <code data-v-e75676ce${_scopeId2}>code_challenge</code> sent in the Request JWT (PKCE). `);
                } else {
                  return [
                    createTextVNode(" Exchange the authorization code for an access token and refresh token. The "),
                    createVNode("code", null, "code_verifier"),
                    createTextVNode(" must match the "),
                    createVNode("code", null, "code_challenge"),
                    createTextVNode(" sent in the Request JWT (PKCE). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: tokenTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The access token is consent-bound — it carries the scope and <code data-v-e75676ce${_scopeId2}>ConsentId</code> granted during authorization. See <a href="/tech/tpp-standards/security/tokens/" data-v-e75676ce${_scopeId2}>Tokens &amp; Assertions</a> for token lifetimes and the refresh flow. `);
                } else {
                  return [
                    createTextVNode(" The access token is consent-bound — it carries the scope and "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" granted during authorization. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                    createTextVNode(" for token lifetimes and the refresh flow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When obtaining an access token you also receive the current state of the consent (including the status) to confirm it has moved to the <code data-v-e75676ce${_scopeId2}>Authorized</code> state before making resource API calls. `);
                } else {
                  return [
                    createTextVNode(" When obtaining an access token you also receive the current state of the consent (including the status) to confirm it has moved to the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" state before making resource API calls. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/token")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Exchange the authorization code for an access token and refresh token. The "),
                  createVNode("code", null, "code_verifier"),
                  createTextVNode(" must match the "),
                  createVNode("code", null, "code_challenge"),
                  createTextVNode(" sent in the Request JWT (PKCE). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: tokenTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The access token is consent-bound — it carries the scope and "),
                  createVNode("code", null, "ConsentId"),
                  createTextVNode(" granted during authorization. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                  createTextVNode(" for token lifetimes and the refresh flow. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When obtaining an access token you also receive the current state of the consent (including the status) to confirm it has moved to the "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" state before making resource API calls. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "maintaining-state",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Track changes over time",
        title: "Maintaining consent state",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After a consent is created, your application needs to track its status over time. There are two approaches: `);
                } else {
                  return [
                    createTextVNode(" After a consent is created, your application needs to track its status over time. There are two approaches: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__option" data-v-e75676ce${_scopeId}><header class="ed-doc__option-head" data-v-e75676ce${_scopeId}><span class="ed-doc__option-tag" data-v-e75676ce${_scopeId}>Option 1</span><h3 class="ed-doc__option-title" data-v-e75676ce${_scopeId}> Subscribe to webhook events <span class="ed-doc__option-rec" data-v-e75676ce${_scopeId}>Recommended</span></h3></header><p class="ed-doc__option-body" data-v-e75676ce${_scopeId}> When a consent is created with <code data-v-e75676ce${_scopeId}>subscription.Webhook.IsActive: true</code>, on every consent status change — for example, when a user revokes, or the consent expires — the API Hub delivers a <a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" data-v-e75676ce${_scopeId}>Consent Status Event</a> to your registered webhook URL. This avoids the need to poll and ensures your application reacts to status changes in real time. </p><p class="ed-doc__option-body" data-v-e75676ce${_scopeId}> Note: as Events are delivered as JWEs, this approach requires a valid <strong data-v-e75676ce${_scopeId}>Encryption Certificate</strong> on your <strong data-v-e75676ce${_scopeId}>Application</strong>. See the <a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" data-v-e75676ce${_scopeId}>Consent Status Event — API Guide</a> for the full flow. </p></div><div class="ed-doc__option" data-v-e75676ce${_scopeId}><header class="ed-doc__option-head" data-v-e75676ce${_scopeId}><span class="ed-doc__option-tag" data-v-e75676ce${_scopeId}>Option 2</span><h3 class="ed-doc__option-title" data-v-e75676ce${_scopeId}>Poll the consent endpoint</h3></header><p class="ed-doc__option-body" data-v-e75676ce${_scopeId}> If you need to check the current state of a consent on demand, call the consent endpoint directly. Both endpoints require a <strong data-v-e75676ce${_scopeId}>client credentials</strong> access token — not the user&#39;s consent-bound access token. </p><h4 class="ed-doc__sub-heading" data-v-e75676ce${_scopeId}>Obtaining a client credentials token</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: ccTokenTabs }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__sub-heading" data-v-e75676ce${_scopeId}>Bank Data Sharing</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: dataSharingPollTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/account-access-consents/{ConsentId}</code></a> for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/account-access-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You can also retrieve all consents created under a long-lived base consent by passing <code data-v-e75676ce${_scopeId2}>baseConsentId</code> as a query parameter to <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/account-access-consents</code></a>. `);
                } else {
                  return [
                    createTextVNode(" You can also retrieve all consents created under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/account-access-consents")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__sub-heading" data-v-e75676ce${_scopeId}>Service Initiation</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: serviceInitPollTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/payment-consents/{ConsentId}</code></a> for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/payment-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You can also retrieve all payment consents under a long-lived base consent by passing <code data-v-e75676ce${_scopeId2}>baseConsentId</code> as a query parameter to <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/payment-consents</code></a>. `);
                } else {
                  return [
                    createTextVNode(" You can also retrieve all payment consents under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/payment-consents")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__sub-heading" data-v-e75676ce${_scopeId}>Insurance Data Sharing</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: insurancePollTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/insurance-consents/{ConsentId}</code></a> for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/insurance-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You can also retrieve all insurance consents under a long-lived base consent by passing <code data-v-e75676ce${_scopeId2}>baseConsentId</code> as a query parameter to <a href="/tech/tpp-standards/v2.1/consent/open-api/insurance-consents" class="endpoint" data-v-e75676ce${_scopeId2}><span class="http-method http-method--get" data-v-e75676ce${_scopeId2}>GET</span><code data-v-e75676ce${_scopeId2}>/insurance-consents</code></a>. `);
                } else {
                  return [
                    createTextVNode(" You can also retrieve all insurance consents under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/insurance-consents")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Consent States"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e75676ce${_scopeId2}> A consent moves through a defined lifecycle — <code data-v-e75676ce${_scopeId2}>AwaitingAuthorization</code> → <code data-v-e75676ce${_scopeId2}>Authorized</code> → <code data-v-e75676ce${_scopeId2}>Consumed</code> / <code data-v-e75676ce${_scopeId2}>Expired</code> / <code data-v-e75676ce${_scopeId2}>Revoked</code>. See <a href="/tech/tpp-standards/v2.1/consent/" data-v-e75676ce${_scopeId2}>Consent Overview</a> for the full state machine and transition rules. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A consent moves through a defined lifecycle — "),
                      createVNode("code", null, "AwaitingAuthorization"),
                      createTextVNode(" → "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" → "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(" / "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(" / "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(". See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/" }, "Consent Overview"),
                      createTextVNode(" for the full state machine and transition rules. ")
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
                  createTextVNode(" After a consent is created, your application needs to track its status over time. There are two approaches: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__option" }, [
                createVNode("header", { class: "ed-doc__option-head" }, [
                  createVNode("span", { class: "ed-doc__option-tag" }, "Option 1"),
                  createVNode("h3", { class: "ed-doc__option-title" }, [
                    createTextVNode(" Subscribe to webhook events "),
                    createVNode("span", { class: "ed-doc__option-rec" }, "Recommended")
                  ])
                ]),
                createVNode("p", { class: "ed-doc__option-body" }, [
                  createTextVNode(" When a consent is created with "),
                  createVNode("code", null, "subscription.Webhook.IsActive: true"),
                  createTextVNode(", on every consent status change — for example, when a user revokes, or the consent expires — the API Hub delivers a "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, "Consent Status Event"),
                  createTextVNode(" to your registered webhook URL. This avoids the need to poll and ensures your application reacts to status changes in real time. ")
                ]),
                createVNode("p", { class: "ed-doc__option-body" }, [
                  createTextVNode(" Note: as Events are delivered as JWEs, this approach requires a valid "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(" on your "),
                  createVNode("strong", null, "Application"),
                  createTextVNode(". See the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide" }, "Consent Status Event — API Guide"),
                  createTextVNode(" for the full flow. ")
                ])
              ]),
              createVNode("div", { class: "ed-doc__option" }, [
                createVNode("header", { class: "ed-doc__option-head" }, [
                  createVNode("span", { class: "ed-doc__option-tag" }, "Option 2"),
                  createVNode("h3", { class: "ed-doc__option-title" }, "Poll the consent endpoint")
                ]),
                createVNode("p", { class: "ed-doc__option-body" }, [
                  createTextVNode(" If you need to check the current state of a consent on demand, call the consent endpoint directly. Both endpoints require a "),
                  createVNode("strong", null, "client credentials"),
                  createTextVNode(" access token — not the user's consent-bound access token. ")
                ]),
                createVNode("h4", { class: "ed-doc__sub-heading" }, "Obtaining a client credentials token"),
                createVNode(_component_EdCodeGroup, { tabs: ccTokenTabs }),
                createVNode("h4", { class: "ed-doc__sub-heading" }, "Bank Data Sharing"),
                createVNode(_component_EdCodeGroup, { tabs: dataSharingPollTabs }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/account-access-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ]),
                  _: 1
                }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" You can also retrieve all consents created under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/account-access-consents")
                    ]),
                    createTextVNode(". ")
                  ]),
                  _: 1
                }),
                createVNode("h4", { class: "ed-doc__sub-heading" }, "Service Initiation"),
                createVNode(_component_EdCodeGroup, { tabs: serviceInitPollTabs }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/payment-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ]),
                  _: 1
                }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" You can also retrieve all payment consents under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/payment-consents")
                    ]),
                    createTextVNode(". ")
                  ]),
                  _: 1
                }),
                createVNode("h4", { class: "ed-doc__sub-heading" }, "Insurance Data Sharing"),
                createVNode(_component_EdCodeGroup, { tabs: insurancePollTabs }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" See "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/insurance-consents/{ConsentId}")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ]),
                  _: 1
                }),
                createVNode(_component_EdProse, null, {
                  default: withCtx(() => [
                    createTextVNode(" You can also retrieve all insurance consents under a long-lived base consent by passing "),
                    createVNode("code", null, "baseConsentId"),
                    createTextVNode(" as a query parameter to "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/insurance-consents")
                    ]),
                    createTextVNode(". ")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Consent States"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A consent moves through a defined lifecycle — "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(" → "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" → "),
                    createVNode("code", null, "Consumed"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Expired"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Revoked"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/" }, "Consent Overview"),
                    createTextVNode(" for the full state machine and transition rules. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/consent/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e75676ce"]]);
export {
  apiGuide as default
};
