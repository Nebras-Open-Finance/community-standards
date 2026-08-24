import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _export_sfc } from "../main.mjs";
const node$4 = `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,            // from Step 3
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token, refresh_token, expires_in } = await tokenResponse.json()
`;
const python$4 = `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,     # from Step 3
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
expires_in    = tokens["expires_in"]    # 600 — access token lasts 10 minutes
`;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepTokenExchange",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node$4 },
      { label: "Python", lang: "python", code: python$4 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "tip",
        title: "Token storage"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> Never store tokens in <code${_scopeId}>localStorage</code>. Use <code${_scopeId}>httpOnly</code> cookies or a server-side session store. See <a href="/tech/tpp-standards/security/tokens/"${_scopeId}>Tokens &amp; Assertions</a> for the full token lifecycle. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" Never store tokens in "),
                createVNode("code", null, "localStorage"),
                createTextVNode(". Use "),
                createVNode("code", null, "httpOnly"),
                createTextVNode(" cookies or a server-side session store. See "),
                createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                createTextVNode(" for the full token lifecycle. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepTokenExchange.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`;
const node$3 = `const params = new URLSearchParams(window.location.search)

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) throw new Error('State mismatch — possible CSRF attack')
if (iss !== ISSUER)        throw new Error(\`Unexpected issuer: \${iss}\`)
`;
const python$3 = `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state: raise ValueError("State mismatch — possible CSRF attack")
if iss != ISSUER:         raise ValueError(f"Unexpected issuer: {iss}")
`;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepCallback",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node$3 },
      { label: "Python", lang: "python", code: python$3 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`After the user approves, the bank redirects to your <code${_scopeId}>redirect_uri</code>:`);
          } else {
            return [
              createTextVNode("After the user approves, the bank redirects to your "),
              createVNode("code", null, "redirect_uri"),
              createTextVNode(":")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCode, {
        code: callbackUrl,
        lang: "plaintext",
        filename: "callback URL"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a href="/tech/tpp-standards/security/fapi/handling-callback"${_scopeId}>Handling Authorization Callbacks</a> for a full guide on state validation, issuer verification, and replay prevention. `);
          } else {
            return [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
              createTextVNode(" for a full guide on state validation, issuer verification, and replay prevention. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepCallback.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const node$2 = `// authorization_endpoint from .well-known/openid-configuration
// Each LFI sets its own path — there is no fixed structure
// e.g. on the altareq1 sandbox: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl = \`\${AUTHORIZATION_ENDPOINT}?client_id=\${CLIENT_ID}&response_type=code&scope=openid&request_uri=\${encodeURIComponent(request_uri)}\`

window.location.href = authCodeUrl
// or server-side: res.redirect(authCodeUrl)
`;
const python$2 = `import urllib.parse

AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
# redirect the user to auth_code_url
`;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepRedirectCode",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node$2 },
      { label: "Python", lang: "python", code: python$2 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(ssrRenderComponent(_component_EdCodeGroup, mergeProps({ tabs }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepRedirectCode.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const node$1 = `import crypto from 'node:crypto'

// PAR endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const PAR_ENDPOINT = discoveryDoc.pushed_authorization_request_endpoint

const parResponse = await fetch(PAR_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type':          'application/x-www-form-urlencoded',
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  body: new URLSearchParams({
    request:               requestJWT,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri, expires_in } = await parResponse.json()
`;
const python$1 = `import httpx, uuid

# PAR endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
par_endpoint = discovery_doc["pushed_authorization_request_endpoint"]

par_response = httpx.post(
    par_endpoint,
    headers={
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

data        = par_response.json()
request_uri = data["request_uri"]
expires_in  = data["expires_in"]
`;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepParRequest",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node$1 },
      { label: "Python", lang: "python", code: python$1 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Include <code${_scopeId}>x-fapi-interaction-id</code> on the request — the API Hub echoes it in the response for end-to-end traceability. See <a href="/tech/tpp-standards/security/request-headers"${_scopeId}>Request Headers</a>. `);
          } else {
            return [
              createTextVNode(" Include "),
              createVNode("code", null, "x-fapi-interaction-id"),
              createTextVNode(" on the request — the API Hub echoes it in the response for end-to-end traceability. See "),
              createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
              createTextVNode(". ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "mTLS transport certificate"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> You must present your <strong${_scopeId}>transport certificate</strong> on every connection to the API Hub and resource APIs. See <a href="/tech/tpp-standards/trust-framework/certificates"${_scopeId}>Certificates</a>. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" You must present your "),
                createVNode("strong", null, "transport certificate"),
                createTextVNode(" on every connection to the API Hub and resource APIs. See "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Certificates"),
                createTextVNode(". ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Field</th><th${_scopeId}>Description</th><th${_scopeId}>Example</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><code${_scopeId}>request_uri</code></td><td${_scopeId}>Single-use reference to your pushed authorization request</td><td${_scopeId}><code${_scopeId}>urn:ietf:params:oauth:request-uri:bwc4JDpSd7</code></td></tr><tr${_scopeId}><td${_scopeId}><code${_scopeId}>expires_in</code></td><td${_scopeId}>Seconds until the <code${_scopeId}>request_uri</code> expires — redirect the user before this window closes</td><td${_scopeId}><code${_scopeId}>90</code></td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Field"),
                    createVNode("th", null, "Description"),
                    createVNode("th", null, "Example")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "request_uri")
                    ]),
                    createVNode("td", null, "Single-use reference to your pushed authorization request"),
                    createVNode("td", null, [
                      createVNode("code", null, "urn:ietf:params:oauth:request-uri:bwc4JDpSd7")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "expires_in")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Seconds until the "),
                      createVNode("code", null, "request_uri"),
                      createTextVNode(" expires — redirect the user before this window closes")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "90")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepParRequest.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!

async function buildClientAssertion(): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ISSUER,
    jti: crypto.randomUUID(),
  })
}
`;
const python = `import os
import uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["AUTHORIZATION_SERVER_ISSUER"]

def build_client_assertion() -> str:
    return sign_jwt({
        "iss": CLIENT_ID,
        "sub": CLIENT_ID,
        "aud": ISSUER,
        "jti": str(uuid.uuid4()),
    })
`;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepClientAssertion",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node },
      { label: "Python", lang: "python", code: python }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"${_scopeId}><code${_scopeId}>signJWT()</code></a> helper to build a client assertion proving your application&#39;s identity: `);
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
      }, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a href="/tech/tpp-standards/security/tokens/client-assertion"${_scopeId}>Client Assertion</a> for the full claims reference. `);
          } else {
            return [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
              createTextVNode(" for the full claims reference. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepClientAssertion.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` With your <code${_scopeId}>authorization_details</code> ready, generate a PKCE code pair then use the <a href="/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt"${_scopeId}><code${_scopeId}>buildRequestJWT()</code></a> helper, passing <code${_scopeId}>payments openid</code> as the scope. `);
      } else {
        return [
          createTextVNode(" With your "),
          createVNode("code", null, "authorization_details"),
          createTextVNode(" ready, generate a PKCE code pair then use the "),
          createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt" }, [
            createVNode("code", null, "buildRequestJWT()")
          ]),
          createTextVNode(" helper, passing "),
          createVNode("code", null, "payments openid"),
          createTextVNode(" as the scope. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdNote, {
    type: "warning",
    title: "Scope change required when using Permissions"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p${_scopeId}> If your consent includes <code${_scopeId}>ReadAccountsBasic</code>, <code${_scopeId}>ReadAccountsDetail</code>, or <code${_scopeId}>ReadBalances</code>, you must change the scope to <code${_scopeId}>accounts payments openid</code>. Without the <code${_scopeId}>accounts</code> scope the issued token will not grant access to the account endpoints. You will also need the <strong${_scopeId}>BDSP</strong> role. See <a href="/knowledge-base/articles/payment-account-permissions"${_scopeId}>Account Permissions in a Payment Consent</a>. </p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode(" If your consent includes "),
            createVNode("code", null, "ReadAccountsBasic"),
            createTextVNode(", "),
            createVNode("code", null, "ReadAccountsDetail"),
            createTextVNode(", or "),
            createVNode("code", null, "ReadBalances"),
            createTextVNode(", you must change the scope to "),
            createVNode("code", null, "accounts payments openid"),
            createTextVNode(". Without the "),
            createVNode("code", null, "accounts"),
            createTextVNode(" scope the issued token will not grant access to the account endpoints. You will also need the "),
            createVNode("strong", null, "BDSP"),
            createTextVNode(" role. See "),
            createVNode("a", { href: "/knowledge-base/articles/payment-account-permissions" }, "Account Permissions in a Payment Consent"),
            createTextVNode(". ")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepRequestJwtScopeNote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_8 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __unplugin_components_8 as _,
  _sfc_main$1 as a,
  _sfc_main$2 as b,
  _sfc_main$3 as c,
  _sfc_main$4 as d,
  _sfc_main$5 as e
};
