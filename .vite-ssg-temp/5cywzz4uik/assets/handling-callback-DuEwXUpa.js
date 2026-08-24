import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`;
const tokenResponseExample = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5c",
  "token_type": "Bearer",
  "expires_in": 300,
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
      "consent": {
        "Data": {
            "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
            "IsSingleAuthorization": true,
            "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "AuthorizationExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "ControlParameters": {
               "ConsentSchedule": {
                  "MultiPayment": {
                      "PeriodicSchedule": {
                          "Type": "VariableOnDemand",
                          "PeriodType": "Week",
                          "PeriodStartDate": "2026-12-01",
                          "Controls": {
                              "MaximumIndividualAmount": {
                                  "Amount": "200.00",
                                  "Currency": "AED"
                              },
                          }
                      }
                  }
              }
          },
          "PaymentPurposeCode": "ACM",
          "DebtorReference": "Test Purchase",
          "CreditorReference": "Test Purchase"
        },
        "Links": {
          "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/v2.1/payment-consents/b8f42378-10ac-46a1-8d20-4e020484216d"
        },
      }
    }
  ],
  "scope": "payments openid",
  "state": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cC"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "handling-callback",
  __ssrInlineRender: true,
  setup(__props) {
    const stateTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const params = new URLSearchParams(window.location.search)
// or server-side: new URLSearchParams(req.url.split('?')[1])

const state = params.get('state')!

if (state !== storedState) {
  // Do not proceed — discard the code and show an error
  throw new Error('State mismatch — possible CSRF attack')
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
state  = params["state"][0]

if state != stored_state:
    # Do not proceed — discard the code and show an error
    raise ValueError("State mismatch — possible CSRF attack")`
      }
    ];
    const issuerTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const iss = params.get('iss')!

if (iss !== ISSUER) {
  throw new Error(\`Unexpected issuer in callback: \${iss}\`)
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `iss = params["iss"][0]

if iss != ISSUER:
    raise ValueError(f"Unexpected issuer in callback: {iss}")`
      }
    ];
    const fullExampleTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import { buildClientAssertion } from './client-assertion'

const ISSUER       = process.env.AUTHORIZATION_SERVER_ISSUER!
const REDIRECT_URI = process.env.REDIRECT_URI!

// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

export async function handleCallback(callbackUrl: string, session: {
  storedState: string
  codeVerifier: string
}) {
  const params = new URLSearchParams(callbackUrl.split('?')[1])

  const code  = params.get('code')
  const state = params.get('state')
  const iss   = params.get('iss')

  // 1. Validate state
  if (!state || state !== session.storedState) {
    throw new Error('State mismatch — possible CSRF attack')
  }

  // 2. Validate issuer
  if (!iss || iss !== ISSUER) {
    throw new Error(\`Unexpected issuer: \${iss}\`)
  }

  if (!code) {
    throw new Error('No authorization code in callback')
  }

  // 3. Exchange code for tokens immediately
  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:            'authorization_code',
      code,
      redirect_uri:          REDIRECT_URI,
      code_verifier:         session.codeVerifier,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      await buildClientAssertion(),
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  if (!tokenResponse.ok) {
    throw new Error(\`Token exchange failed: \${tokenResponse.status}\`)
  }

  const { access_token, refresh_token, expires_in } = await tokenResponse.json()

  // 4. Return tokens — caller is responsible for secure storage
  return { access_token, refresh_token, expires_in }
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `import os
import httpx
from urllib.parse import urlparse, parse_qs

ISSUER       = os.environ["AUTHORIZATION_SERVER_ISSUER"]
REDIRECT_URI = os.environ["REDIRECT_URI"]

# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
TOKEN_ENDPOINT = discovery_doc["token_endpoint"]

def handle_callback(callback_url: str, stored_state: str, code_verifier: str) -> dict:
    params = parse_qs(urlparse(callback_url).query)

    code  = params.get("code",  [None])[0]
    state = params.get("state", [None])[0]
    iss   = params.get("iss",   [None])[0]

    # 1. Validate state
    if not state or state != stored_state:
        raise ValueError("State mismatch — possible CSRF attack")

    # 2. Validate issuer
    if not iss or iss != ISSUER:
        raise ValueError(f"Unexpected issuer: {iss}")

    if not code:
        raise ValueError("No authorization code in callback")

    # 3. Exchange code for tokens immediately
    token_response = httpx.post(
        TOKEN_ENDPOINT,
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

    token_response.raise_for_status()
    tokens = token_response.json()

    # 4. Return tokens — caller is responsible for secure storage
    return {
        "access_token":  tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "expires_in":    tokens["expires_in"],
    }`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-52fde5be><section class="ed-doc__hero" data-v-52fde5be><div class="ed-doc__inner" data-v-52fde5be><div class="ed-doc__eyebrow" data-v-52fde5be><span class="ed-doc__eyebrow-dash" data-v-52fde5be></span> Security · FAPI · Callbacks </div><h1 class="ed-doc__title" data-v-52fde5be> Handling Authorization Callbacks <span class="ed-doc__read" data-v-52fde5be>2 min read</span></h1><p class="ed-doc__lede" data-v-52fde5be> After the user approves (or declines) consent at the LFI, the Authorization Server redirects them back to your registered <code data-v-52fde5be>redirect_uri</code>. How you handle this callback is security-critical — mistakes here can allow CSRF attacks, token theft, and authorization code replay. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "callback-url",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Callback URL Format",
        title: "What the Authorization Server sends back",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The callback URL will be of the form:`);
                } else {
                  return [
                    createTextVNode("The callback URL will be of the form:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: callbackUrl,
              lang: "plaintext",
              filename: "Redirect URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-52fde5be${_scopeId2}><thead data-v-52fde5be${_scopeId2}><tr data-v-52fde5be${_scopeId2}><th data-v-52fde5be${_scopeId2}>Parameter</th><th data-v-52fde5be${_scopeId2}>Description</th></tr></thead><tbody data-v-52fde5be${_scopeId2}><tr data-v-52fde5be${_scopeId2}><td data-v-52fde5be${_scopeId2}><code data-v-52fde5be${_scopeId2}>code</code></td><td data-v-52fde5be${_scopeId2}>The authorization code to exchange at <code data-v-52fde5be${_scopeId2}>/token</code>. Single-use and short-lived</td></tr><tr data-v-52fde5be${_scopeId2}><td data-v-52fde5be${_scopeId2}><code data-v-52fde5be${_scopeId2}>state</code></td><td data-v-52fde5be${_scopeId2}>The value you sent in the Request JWT — must match what you stored before redirecting</td></tr><tr data-v-52fde5be${_scopeId2}><td data-v-52fde5be${_scopeId2}><code data-v-52fde5be${_scopeId2}>iss</code></td><td data-v-52fde5be${_scopeId2}>The issuer of the Authorization Server that issued the code</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "code")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The authorization code to exchange at "),
                            createVNode("code", null, "/token"),
                            createTextVNode(". Single-use and short-lived")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "state")
                          ]),
                          createVNode("td", null, "The value you sent in the Request JWT — must match what you stored before redirecting")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, "The issuer of the Authorization Server that issued the code")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The callback URL will be of the form:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: callbackUrl,
                lang: "plaintext",
                filename: "Redirect URL"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "code")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The authorization code to exchange at "),
                          createVNode("code", null, "/token"),
                          createTextVNode(". Single-use and short-lived")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "state")
                        ]),
                        createVNode("td", null, "The value you sent in the Request JWT — must match what you stored before redirecting")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, "The issuer of the Authorization Server that issued the code")
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
        id: "validate-state",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Validate state",
        title: "Always confirm the state value matches",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm that the <code data-v-52fde5be${_scopeId2}>state</code> value returned in the callback matches the one you set in your <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-52fde5be${_scopeId2}>Request JWT</a>. This protects against CSRF (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization. `);
                } else {
                  return [
                    createTextVNode(" Confirm that the "),
                    createVNode("code", null, "state"),
                    createTextVNode(" value returned in the callback matches the one you set in your "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Request JWT"),
                    createTextVNode(". This protects against CSRF (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: stateTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Confirm that the "),
                  createVNode("code", null, "state"),
                  createTextVNode(" value returned in the callback matches the one you set in your "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Request JWT"),
                  createTextVNode(". This protects against CSRF (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: stateTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "verify-issuer",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Verify the iss (Issuer)",
        title: "Confirm the response came from the expected Authorization Server",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Check that the <code data-v-52fde5be${_scopeId2}>iss</code> parameter matches the Authorization Server you sent the <code data-v-52fde5be${_scopeId2}>/par</code> request to. This ensures the response comes from the expected LFI and not a confused deputy or misconfigured redirect. `);
                } else {
                  return [
                    createTextVNode(" Check that the "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" parameter matches the Authorization Server you sent the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request to. This ensures the response comes from the expected LFI and not a confused deputy or misconfigured redirect. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: issuerTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Check that the "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" parameter matches the Authorization Server you sent the "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request to. This ensures the response comes from the expected LFI and not a confused deputy or misconfigured redirect. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: issuerTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "time-limit",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Time-Limit Callback Validity",
        title: "Authorization codes are single-use and short-lived",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Authorization codes are single-use and short-lived — typically valid for only a few minutes. Exchange the code immediately upon receipt. `);
                } else {
                  return [
                    createTextVNode(" Authorization codes are single-use and short-lived — typically valid for only a few minutes. Exchange the code immediately upon receipt. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-52fde5be${_scopeId2}>Exchange the code at <code data-v-52fde5be${_scopeId2}>/token</code> within seconds of receiving it — do not queue or defer</li><li data-v-52fde5be${_scopeId2}>Do not accept callbacks that arrive long after the authorization request was initiated</li><li data-v-52fde5be${_scopeId2}>Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Exchange the code at "),
                      createVNode("code", null, "/token"),
                      createTextVNode(" within seconds of receiving it — do not queue or defer")
                    ]),
                    createVNode("li", null, "Do not accept callbacks that arrive long after the authorization request was initiated"),
                    createVNode("li", null, "Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Track request initiation time"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-52fde5be${_scopeId2}> Store a timestamp when you send the user to <code data-v-52fde5be${_scopeId2}>/par</code>. In your callback handler, reject any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes), even if <code data-v-52fde5be${_scopeId2}>state</code> is otherwise valid. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Store a timestamp when you send the user to "),
                      createVNode("code", null, "/par"),
                      createTextVNode(". In your callback handler, reject any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes), even if "),
                      createVNode("code", null, "state"),
                      createTextVNode(" is otherwise valid. ")
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
                  createTextVNode(" Authorization codes are single-use and short-lived — typically valid for only a few minutes. Exchange the code immediately upon receipt. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Exchange the code at "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" within seconds of receiving it — do not queue or defer")
                  ]),
                  createVNode("li", null, "Do not accept callbacks that arrive long after the authorization request was initiated"),
                  createVNode("li", null, "Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Track request initiation time"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Store a timestamp when you send the user to "),
                    createVNode("code", null, "/par"),
                    createTextVNode(". In your callback handler, reject any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes), even if "),
                    createVNode("code", null, "state"),
                    createTextVNode(" is otherwise valid. ")
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
        id: "minimal-logic",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Keep Callback Logic Minimal",
        title: "Do only what's required, then redirect",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`When handling the callback, execute only the minimum necessary logic:`);
                } else {
                  return [
                    createTextVNode("When handling the callback, execute only the minimum necessary logic:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__ol" data-v-52fde5be${_scopeId}><li data-v-52fde5be${_scopeId}>Validate <code data-v-52fde5be${_scopeId}>state</code> and <code data-v-52fde5be${_scopeId}>iss</code></li><li data-v-52fde5be${_scopeId}>Exchange the <code data-v-52fde5be${_scopeId}>code</code> for tokens at <code data-v-52fde5be${_scopeId}>/token</code></li><li data-v-52fde5be${_scopeId}>Store tokens securely</li><li data-v-52fde5be${_scopeId}>Redirect the user to the next step in your application flow</li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Avoid running complex business logic, sending external requests (other than <code data-v-52fde5be${_scopeId2}>/token</code>), or initiating sensitive operations at this stage. A failed or slow callback should not leave the user in an inconsistent state. `);
                } else {
                  return [
                    createTextVNode(" Avoid running complex business logic, sending external requests (other than "),
                    createVNode("code", null, "/token"),
                    createTextVNode("), or initiating sensitive operations at this stage. A failed or slow callback should not leave the user in an inconsistent state. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Error handling"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-52fde5be${_scopeId2}> If validation fails or the code exchange returns an error, show the user a clean error message and discard all parameters from the callback. Do not log authorization codes or tokens. </p>`);
                } else {
                  return [
                    createVNode("p", null, " If validation fails or the code exchange returns an error, show the user a clean error message and discard all parameters from the callback. Do not log authorization codes or tokens. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("When handling the callback, execute only the minimum necessary logic:")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__ol" }, [
                createVNode("li", null, [
                  createTextVNode("Validate "),
                  createVNode("code", null, "state"),
                  createTextVNode(" and "),
                  createVNode("code", null, "iss")
                ]),
                createVNode("li", null, [
                  createTextVNode("Exchange the "),
                  createVNode("code", null, "code"),
                  createTextVNode(" for tokens at "),
                  createVNode("code", null, "/token")
                ]),
                createVNode("li", null, "Store tokens securely"),
                createVNode("li", null, "Redirect the user to the next step in your application flow")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Avoid running complex business logic, sending external requests (other than "),
                  createVNode("code", null, "/token"),
                  createTextVNode("), or initiating sensitive operations at this stage. A failed or slow callback should not leave the user in an inconsistent state. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Error handling"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " If validation fails or the code exchange returns an error, show the user a clean error message and discard all parameters from the callback. Do not log authorization codes or tokens. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "full-example",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Complete Callback Handler",
        title: "End-to-end example combining every check",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: fullExampleTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCodeGroup, { tabs: fullExampleTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-status",
        num: "07",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Consent status in /token responses",
        title: "The token response carries the current consent state",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` On a successful <span class="endpoint" data-v-52fde5be${_scopeId2}><span class="http-method http-method--post" data-v-52fde5be${_scopeId2}>POST</span><code data-v-52fde5be${_scopeId2}>/token</code></span> (HTTP 200), the Authorization Server returns not only the <code data-v-52fde5be${_scopeId2}>access_token</code> and <code data-v-52fde5be${_scopeId2}>refresh_token</code> but also the Consent object, including its current <code data-v-52fde5be${_scopeId2}>Status</code>. See the token endpoint reference for details: <a href="/tech/tpp-standards/security/tokens/open-api/token" data-v-52fde5be${_scopeId2}>CreateAccessTokenRequestV21</a> (OpenAPI: <code data-v-52fde5be${_scopeId2}>docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml</code>, schema <code data-v-52fde5be${_scopeId2}>AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties</code>). `);
                } else {
                  return [
                    createTextVNode(" On a successful "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/token")
                    ]),
                    createTextVNode(" (HTTP 200), the Authorization Server returns not only the "),
                    createVNode("code", null, "access_token"),
                    createTextVNode(" and "),
                    createVNode("code", null, "refresh_token"),
                    createTextVNode(" but also the Consent object, including its current "),
                    createVNode("code", null, "Status"),
                    createTextVNode(". See the token endpoint reference for details: "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "CreateAccessTokenRequestV21"),
                    createTextVNode(" (OpenAPI: "),
                    createVNode("code", null, "docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"),
                    createTextVNode(", schema "),
                    createVNode("code", null, "AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Example response:`);
                } else {
                  return [
                    createTextVNode("Example response:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tokenResponseExample,
              lang: "json",
              filename: "200 OK — /token response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because access to resources requires both a valid access token <strong data-v-52fde5be${_scopeId2}>and</strong> an authorized consent, the TPP can determine from this response whether resource access is permitted. `);
                } else {
                  return [
                    createTextVNode(" Because access to resources requires both a valid access token "),
                    createVNode("strong", null, "and"),
                    createTextVNode(" an authorized consent, the TPP can determine from this response whether resource access is permitted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In most flows the consent status will be <code data-v-52fde5be${_scopeId2}>Authorized</code>. However, for payment (Bank Service Initiation) consents that support and require multi-authorization, the consent status may instead be <code data-v-52fde5be${_scopeId2}>AwaitingAuthorization</code>, indicating the first authorizer has approved but additional authorizers are still required before a payment can be made. `);
                } else {
                  return [
                    createTextVNode(" In most flows the consent status will be "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(". However, for payment (Bank Service Initiation) consents that support and require multi-authorization, the consent status may instead be "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", indicating the first authorizer has approved but additional authorizers are still required before a payment can be made. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" On a successful "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/token")
                  ]),
                  createTextVNode(" (HTTP 200), the Authorization Server returns not only the "),
                  createVNode("code", null, "access_token"),
                  createTextVNode(" and "),
                  createVNode("code", null, "refresh_token"),
                  createTextVNode(" but also the Consent object, including its current "),
                  createVNode("code", null, "Status"),
                  createTextVNode(". See the token endpoint reference for details: "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "CreateAccessTokenRequestV21"),
                  createTextVNode(" (OpenAPI: "),
                  createVNode("code", null, "docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"),
                  createTextVNode(", schema "),
                  createVNode("code", null, "AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties"),
                  createTextVNode("). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Example response:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: tokenResponseExample,
                lang: "json",
                filename: "200 OK — /token response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Because access to resources requires both a valid access token "),
                  createVNode("strong", null, "and"),
                  createTextVNode(" an authorized consent, the TPP can determine from this response whether resource access is permitted. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In most flows the consent status will be "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(". However, for payment (Bank Service Initiation) consents that support and require multi-authorization, the consent status may instead be "),
                  createVNode("code", null, "AwaitingAuthorization"),
                  createTextVNode(", indicating the first authorizer has approved but additional authorizers are still required before a payment can be made. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/handling-callback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const handlingCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52fde5be"]]);
export {
  handlingCallback as default
};
