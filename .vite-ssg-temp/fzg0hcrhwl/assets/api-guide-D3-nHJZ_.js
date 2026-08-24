import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as _sfc_main$1 } from "./APIFlowsConsentFlow-BEf4Z_Mx.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const psuRedirectUrl = "https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&request_uri={request_uri}";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const validateTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// Example: handling POST /consent/action/validate on your Ozone Connect server
app.post('/consent/action/validate', (req, res) => {
  const consent = req.body

  // Perform your validation logic
  const isSupported = validateConsentIsSupported(consent)

  res.status(200).json({
    data: {
      status: isSupported ? 'valid' : 'invalid',
      code: isSupported ? undefined : 'UNSUPPORTED_CONSENT',
      description: isSupported ? undefined : 'The requested consent type is not supported',
    },
    meta: {},
  })
})`
      },
      {
        label: "Python",
        lang: "python",
        code: `# Example: handling POST /consent/action/validate on your Ozone Connect server
@app.post("/consent/action/validate")
def validate_consent(request):
    consent = request.json()

    # Perform your validation logic
    is_supported = validate_consent_is_supported(consent)

    return {
        "data": {
            "status": "valid" if is_supported else "invalid",
            "code": None if is_supported else "UNSUPPORTED_CONSENT",
            "description": None if is_supported else "The requested consent type is not supported",
        },
        "meta": {},
    }, 200`
      }
    ];
    const eventTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// Example: handling POST /consent/event/:operation on your Ozone Connect server
app.post('/consent/event/:operation', (req, res) => {
  const { operation } = req.params  // 'post' for creation, 'patch' for updates
  const consent = req.body

  // Store or log the consent event for your records
  logConsentEvent(operation, consent)

  res.status(204).send()
})`
      },
      {
        label: "Python",
        lang: "python",
        code: `# Example: handling POST /consent/event/{operation} on your Ozone Connect server
@app.post("/consent/event/{operation}")
def consent_event(operation: str, request):
    consent = request.json()

    # Store or log the consent event for your records
    log_consent_event(operation, consent)

    return None, 204`
      }
    ];
    const getAuthTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const HH_BASE = process.env.HEADLESS_HEIMDALL_BASE_URL!
// e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

// Pass through all query parameters received at your authorization endpoint
const queryString = new URLSearchParams({
  client_id: req.query.client_id,
  response_type: req.query.response_type,
  request_uri: req.query.request_uri,
}).toString()

const authResponse = await fetch(\`\${HH_BASE}/auth?\${queryString}\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // mTLS with C3 transport certificate
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})

if (authResponse.status === 303) {
  // Redirectable failure — redirect the end user to the URI in the Location header without modification
  return res.redirect(authResponse.headers.get('location'))
}

if (authResponse.status === 400) {
  // Non-redirectable failure — render an error page to the end user
  return res.status(400).render('auth-error')
}

const authData = await authResponse.json()

// Extract the interactionId and consentId — store both for subsequent calls
const interactionId = authData.interaction.interactionId
const consentId = authData.interaction.consentIdsList[0]`
      },
      {
        label: "Python",
        lang: "python",
        code: `import httpx

HH_BASE = os.environ["HEADLESS_HEIMDALL_BASE_URL"]
# e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

# Pass through all query parameters received at your authorization endpoint
auth_response = httpx.get(
    f"{HH_BASE}/auth",
    params={
        "client_id": request.args["client_id"],
        "response_type": request.args["response_type"],
        "request_uri": request.args["request_uri"],
    },
    # cert=("c3-transport.crt", "c3-transport.key"),  # mTLS with C3 certificate
    follow_redirects=False,
)

if auth_response.status_code == 303:
    # Redirectable failure — redirect the end user without modification
    return redirect(auth_response.headers["location"])

if auth_response.status_code == 400:
    # Non-redirectable failure — render an error page
    return render_template("auth-error.html"), 400

auth_data = auth_response.json()

# Extract the interactionId and consentId — store both for subsequent calls
interaction_id = auth_data["interaction"]["interactionId"]
consent_id = auth_data["interaction"]["consentIdsList"][0]`
      }
    ];
    const getConsentTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const CM_BASE = process.env.CONSENT_MANAGER_BASE_URL!
// e.g. 'https://cm.{lfiCode}.preprod.apihub.openfinance.ae'

const consentResponse = await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // mTLS with C3 transport certificate
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})

const consent = await consentResponse.json()

// The consent object contains the full consent details:
// - consent.data.consentBody.Data.Permissions (for data sharing)
// - consent.data.consentBody.Data.ExpirationDateTime
// - consent.data.consentBody.Data.PersonalIdentifiableInformation (if encrypted PII is present)`
      },
      {
        label: "Python",
        lang: "python",
        code: `CM_BASE = os.environ["CONSENT_MANAGER_BASE_URL"]
# e.g. 'https://cm.{lfiCode}.preprod.apihub.openfinance.ae'

consent_response = httpx.get(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)

consent = consent_response.json()

# The consent object contains the full consent details:
# - consent["data"]["consentBody"]["Data"]["Permissions"] (for data sharing)
# - consent["data"]["consentBody"]["Data"]["ExpirationDateTime"]
# - consent["data"]["consentBody"]["Data"]["PersonalIdentifiableInformation"] (if encrypted PII)`
      }
    ];
    const patchAuthorizedTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// PATCH /consents/{consentId} — authorize the consent
await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Authorized',
    psuIdentifiers: {
      // Your internal end user identifier — the structure is flexible,
      // use whatever fields your institution uses to identify the customer
      userId: authenticatedUser.id,
    },
    accountIds: [
      // Account IDs the end user selected for this consent
      // For Bank Data Sharing: one or more accounts
      // For Bank Service Initiation: exactly one debtor account
      // For Insurance Data Sharing: omit accountIds — use insurancePolicyIds instead
      'account-id-1',
      'account-id-2',
    ],
    authorizationChannel: 'App', // 'App' or 'Web'
  }),
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})`
      },
      {
        label: "Python",
        lang: "python",
        code: `# PATCH /consents/{consentId} — authorize the consent
httpx.patch(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    json={
        "status": "Authorized",
        "psuIdentifiers": {
            # Your internal end user identifier — the structure is flexible,
            # use whatever fields your institution uses to identify the customer
            "userId": authenticated_user.id,
        },
        "accountIds": [
            # Account IDs the end user selected for this consent
            # For Bank Data Sharing: one or more accounts
            # For Bank Service Initiation: exactly one debtor account
            # For Insurance Data Sharing: omit accountIds — use insurancePolicyIds instead
            "account-id-1",
            "account-id-2",
        ],
        "authorizationChannel": "App",  # 'App' or 'Web'
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)`
      }
    ];
    const doConfirmTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// POST /auth/{interactionId}/doConfirm — complete the authorization
const confirmResponse = await fetch(
  \`\${HH_BASE}/auth/\${interactionId}/doConfirm\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual', // capture the 303 redirect
    // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
  }
)

// The API Hub responds with a 303 redirect back to the TPP
const redirectUri = confirmResponse.headers.get('location')

// Redirect the end user to the TPP — journey complete
res.redirect(redirectUri)`
      },
      {
        label: "Python",
        lang: "python",
        code: `# POST /auth/{interactionId}/doConfirm — complete the authorization
confirm_response = httpx.post(
    f"{HH_BASE}/auth/{interaction_id}/doConfirm",
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
    follow_redirects=False,
    # cert=("c3-transport.crt", "c3-transport.key"),
)

# The API Hub responds with a 303 redirect back to the TPP
redirect_uri = confirm_response.headers["location"]

# Redirect the end user to the TPP — journey complete
return redirect(redirect_uri)`
      }
    ];
    const patchRejectedTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// PATCH /consents/{consentId} — reject the consent
await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Rejected',
    psuIdentifiers: {
      userId: authenticatedUser.id,
    },
    // Do NOT include accountIds for rejected consents
    authorizationChannel: 'App', // 'App' or 'Web'
  }),
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})`
      },
      {
        label: "Python",
        lang: "python",
        code: `# PATCH /consents/{consentId} — reject the consent
httpx.patch(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    json={
        "status": "Rejected",
        "psuIdentifiers": {
            "userId": authenticated_user.id,
        },
        # Do NOT include accountIds for rejected consents
        "authorizationChannel": "App",  # 'App' or 'Web'
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)`
      }
    ];
    const doFailTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `// POST /auth/{interactionId}/doFail — end the authorization with a failure
const failResponse = await fetch(
  \`\${HH_BASE}/auth/\${interactionId}/doFail\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      error: 'access_denied',
      error_description: 'The user rejected the consent',
    }),
    redirect: 'manual', // capture the 303 redirect
    // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
  }
)

// The API Hub responds with a 303 redirect back to the TPP with error parameters
const redirectUri = failResponse.headers.get('location')

// Redirect the end user to the TPP — journey ended
res.redirect(redirectUri)`
      },
      {
        label: "Python",
        lang: "python",
        code: `# POST /auth/{interactionId}/doFail — end the authorization with a failure
fail_response = httpx.post(
    f"{HH_BASE}/auth/{interaction_id}/doFail",
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data={
        "error": "access_denied",
        "error_description": "The user rejected the consent",
    },
    follow_redirects=False,
    # cert=("c3-transport.crt", "c3-transport.key"),
)

# The API Hub responds with a 303 redirect back to the TPP with error parameters
redirect_uri = fail_response.headers["location"]

# Redirect the end user to the TPP — journey ended
return redirect(redirect_uri)`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsConsentFlow = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fb2d43d1><section class="ed-doc__hero" data-v-fb2d43d1><div class="ed-doc__inner" data-v-fb2d43d1><div class="ed-doc__eyebrow" data-v-fb2d43d1><span class="ed-doc__eyebrow-dash" data-v-fb2d43d1></span> LFI · Consent Journey · API Guide </div><h1 class="ed-doc__title" data-v-fb2d43d1> Consent Journey — API Guide <span class="ed-doc__read" data-v-fb2d43d1>6 min read</span></h1><p class="ed-doc__lede" data-v-fb2d43d1> End-to-end implementation guide for the consent authorization journey: from the TPP&#39;s <span class="endpoint" data-v-fb2d43d1><span class="http-method http-method--post" data-v-fb2d43d1>POST</span><code data-v-fb2d43d1>/par</code></span> through your Authorization Endpoint, the Headless Heimdall and Consent Manager API calls, and the final <code data-v-fb2d43d1>doConfirm</code>/<code data-v-fb2d43d1>doFail</code> redirect back to the TPP. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What must be in place before you start",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before implementing the consent journey, ensure the following are in place:`);
                } else {
                  return [
                    createTextVNode("Before implementing the consent journey, ensure the following are in place:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>API Hub onboarded</strong> — Your API Hub instance is provisioned and your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-fb2d43d1${_scopeId2}>environment-specific configuration</a> is complete </li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>C3-hh-cm-client application created</strong> — Registered in the Trust Framework with mTLS connectivity established in both directions. See <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-fb2d43d1${_scopeId2}>Creating the C3-hh-cm-client Application</a></li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>Connectivity verified</strong> — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. Use <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/hello-mtls</code></span> on both the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-fb2d43d1${_scopeId2}>Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-fb2d43d1${_scopeId2}>Consent Manager</a> base URLs to verify. See <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-fb2d43d1${_scopeId2}>Connectivity &amp; Certificates</a></li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>Authorization Endpoint registered</strong> — Your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-fb2d43d1${_scopeId2}>Authorization Endpoint</a> is configured in the API Hub to receive TPP user redirects </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub onboarded"),
                      createTextVNode(" — Your API Hub instance is provisioned and your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                      createTextVNode(" is complete ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "C3-hh-cm-client application created"),
                      createTextVNode(" — Registered in the Trust Framework with mTLS connectivity established in both directions. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Connectivity verified"),
                      createTextVNode(" — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. Use "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/hello-mtls")
                      ]),
                      createTextVNode(" on both the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                      createTextVNode(" and "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                      createTextVNode(" base URLs to verify. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Authorization Endpoint registered"),
                      createTextVNode(" — Your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                      createTextVNode(" is configured in the API Hub to receive TPP user redirects ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Required API implementations</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`You MUST implement the following endpoints:`);
                } else {
                  return [
                    createTextVNode("You MUST implement the following endpoints:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Endpoint</th><th data-v-fb2d43d1${_scopeId2}>Direction</th><th data-v-fb2d43d1${_scopeId2}>Purpose</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></a></td><td data-v-fb2d43d1${_scopeId2}>LFI → API Hub</td><td data-v-fb2d43d1${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-fb2d43d1${_scopeId2}>LFI → API Hub</td><td data-v-fb2d43d1${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--patch" data-v-fb2d43d1${_scopeId2}>PATCH</span><code data-v-fb2d43d1${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-fb2d43d1${_scopeId2}>LFI → API Hub</td><td data-v-fb2d43d1${_scopeId2}>Update consent status, end user identifiers, and account IDs</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-fb2d43d1${_scopeId2}>LFI → API Hub</td><td data-v-fb2d43d1${_scopeId2}>Complete the authorization interaction and redirect back to TPP successfully</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-fb2d43d1${_scopeId2}>LFI → API Hub</td><td data-v-fb2d43d1${_scopeId2}>Complete the authorization interaction and redirect back to TPP with a failure</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Direction"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/auth")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Initiate the authorization interaction")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/consents/{consentId}")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Retrieve the full consent details")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/consents/{consentId}")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Update consent status, end user identifiers, and account IDs")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doConfirm")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the authorization interaction and redirect back to TPP successfully")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doFail")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the authorization interaction and redirect back to TPP with a failure")
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
                  createTextVNode("Before implementing the consent journey, ensure the following are in place:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub onboarded"),
                    createTextVNode(" — Your API Hub instance is provisioned and your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                    createTextVNode(" is complete ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "C3-hh-cm-client application created"),
                    createTextVNode(" — Registered in the Trust Framework with mTLS connectivity established in both directions. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Connectivity verified"),
                    createTextVNode(" — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. Use "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/hello-mtls")
                    ]),
                    createTextVNode(" on both the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                    createTextVNode(" and "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                    createTextVNode(" base URLs to verify. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Authorization Endpoint registered"),
                    createTextVNode(" — Your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                    createTextVNode(" is configured in the API Hub to receive TPP user redirects ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Required API implementations"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("You MUST implement the following endpoints:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Direction"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/auth")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Initiate the authorization interaction")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/consents/{consentId}")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Retrieve the full consent details")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/consents/{consentId}")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Update consent status, end user identifiers, and account IDs")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doConfirm")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the authorization interaction and redirect back to TPP successfully")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doFail")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the authorization interaction and redirect back to TPP with a failure")
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
        eyebrow: "API sequence flow",
        title: "End-to-end flow diagram",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Consent Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsConsentFlow, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsConsentFlow)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-creation",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Consent creation",
        title: "Steps 1–3 — TPP /par, optional validate, optional event",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 1 — TPP creates the consent via <code data-v-fb2d43d1${_scopeId}>/par</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The consent journey begins when a TPP sends a Pushed Authorization Request (<span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/par</code></span>) to the API Hub. The TPP embeds the consent definition inside a signed Request JWT. See the <a href="/tech/tpp-standards/v2.1/consent/api-guide" data-v-fb2d43d1${_scopeId2}>TPP Consent API Guide</a> for the TPP&#39;s API Guide and <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/par</code></a> for the full <code data-v-fb2d43d1${_scopeId2}>/par</code> request structure. `);
                } else {
                  return [
                    createTextVNode(" The consent journey begins when a TPP sends a Pushed Authorization Request ("),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(") to the API Hub. The TPP embeds the consent definition inside a signed Request JWT. See the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "TPP Consent API Guide"),
                    createTextVNode(" for the TPP's API Guide and "),
                    createVNode("a", {
                      href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" for the full "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request structure. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At this point your LFI systems are not yet involved — the API Hub receives the request and begins processing the consent. `);
                } else {
                  return [
                    createTextVNode(" At this point your LFI systems are not yet involved — the API Hub receives the request and begins processing the consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 2 — (Optional) Validate the consent</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your LFI has configured the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/consent/action/validate</code></a> endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent payload <strong data-v-fb2d43d1${_scopeId2}>before</strong> the consent is created. `);
                } else {
                  return [
                    createTextVNode(" If your LFI has configured the "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent payload "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" the consent is created. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This gives your LFI the opportunity to inspect the consent and determine whether it is one you support — for example, validating that a debtor account exists in your systems, or that the requested permissions are supported. `);
                } else {
                  return [
                    createTextVNode(" This gives your LFI the opportunity to inspect the consent and determine whether it is one you support — for example, validating that a debtor account exists in your systems, or that the requested permissions are supported. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Your LFI MUST return <code data-v-fb2d43d1${_scopeId2}>data.status</code> set to one of:`);
                } else {
                  return [
                    createTextVNode("Your LFI MUST return "),
                    createVNode("code", null, "data.status"),
                    createTextVNode(" set to one of:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Status</th><th data-v-fb2d43d1${_scopeId2}>Effect</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>valid</code></td><td data-v-fb2d43d1${_scopeId2}>The consent is created and processing continues</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>invalid</code></td><td data-v-fb2d43d1${_scopeId2}>The consent is rejected and an error is returned to the TPP</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Status"),
                          createVNode("th", null, "Effect")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "valid")
                          ]),
                          createVNode("td", null, "The consent is created and processing continues")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "invalid")
                          ]),
                          createVNode("td", null, "The consent is rejected and an error is returned to the TPP")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: validateTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Not configured?"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-fb2d43d1${_scopeId2}> If you have not configured the <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/consent/action/validate</code></span> endpoint, the API Hub assumes all consents are valid and creates them immediately. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If you have not configured the "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/action/validate")
                      ]),
                      createTextVNode(" endpoint, the API Hub assumes all consents are valid and creates them immediately. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" data-v-fb2d43d1${_scopeId2}>Validate Consent API Reference</a> for the full request and response schemas. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" }, "Validate Consent API Reference"),
                    createTextVNode(" for the full request and response schemas. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 3 — (Optional) Receive the consent event</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your LFI has configured the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op" class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/consent/event/{operation}</code></a> endpoint, the API Hub will call <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/consent/event/post</code></span> on your Ozone Connect server once the consent has been successfully created. `);
                } else {
                  return [
                    createTextVNode(" If your LFI has configured the "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/event/{operation}")
                    ]),
                    createTextVNode(" endpoint, the API Hub will call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/event/post")
                    ]),
                    createTextVNode(" on your Ozone Connect server once the consent has been successfully created. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This is an informational notification — the API Hub does not expect a response body. Return <code data-v-fb2d43d1${_scopeId2}>204 No Content</code> to acknowledge receipt. `);
                } else {
                  return [
                    createTextVNode(" This is an informational notification — the API Hub does not expect a response body. Return "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode(" to acknowledge receipt. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: eventTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, [
                createTextVNode("Step 1 — TPP creates the consent via "),
                createVNode("code", null, "/par")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The consent journey begins when a TPP sends a Pushed Authorization Request ("),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(") to the API Hub. The TPP embeds the consent definition inside a signed Request JWT. See the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "TPP Consent API Guide"),
                  createTextVNode(" for the TPP's API Guide and "),
                  createVNode("a", {
                    href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(" for the full "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request structure. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At this point your LFI systems are not yet involved — the API Hub receives the request and begins processing the consent. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 2 — (Optional) Validate the consent"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If your LFI has configured the "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent payload "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" the consent is created. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This gives your LFI the opportunity to inspect the consent and determine whether it is one you support — for example, validating that a debtor account exists in your systems, or that the requested permissions are supported. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Your LFI MUST return "),
                  createVNode("code", null, "data.status"),
                  createTextVNode(" set to one of:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Effect")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "valid")
                        ]),
                        createVNode("td", null, "The consent is created and processing continues")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "invalid")
                        ]),
                        createVNode("td", null, "The consent is rejected and an error is returned to the TPP")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: validateTabs }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Not configured?"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If you have not configured the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" endpoint, the API Hub assumes all consents are valid and creates them immediately. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" }, "Validate Consent API Reference"),
                  createTextVNode(" for the full request and response schemas. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 3 — (Optional) Receive the consent event"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If your LFI has configured the "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/event/{operation}")
                  ]),
                  createTextVNode(" endpoint, the API Hub will call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/event/post")
                  ]),
                  createTextVNode(" on your Ozone Connect server once the consent has been successfully created. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This is an informational notification — the API Hub does not expect a response body. Return "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode(" to acknowledge receipt. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: eventTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "psu-redirect",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "End user redirect and authorization interaction",
        title: "Steps 4–6 — receive redirect, GET /auth, GET /consents",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 4 — End user is redirected to your Authorization Endpoint</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After the consent is created via <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/par</code></span>, the TPP redirects the end user to your <strong data-v-fb2d43d1${_scopeId2}>Authorization Endpoint</strong> with the following query parameters: `);
                } else {
                  return [
                    createTextVNode(" After the consent is created via "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(", the TPP redirects the end user to your "),
                    createVNode("strong", null, "Authorization Endpoint"),
                    createTextVNode(" with the following query parameters: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "text",
              code: psuRedirectUrl
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where <code data-v-fb2d43d1${_scopeId2}>request_uri</code> is the value returned from the <code data-v-fb2d43d1${_scopeId2}>/par</code> response. Your Authorization Endpoint is the URL you registered during <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-fb2d43d1${_scopeId2}>environment-specific configuration</a>. `);
                } else {
                  return [
                    createTextVNode(" Where "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(" is the value returned from the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" response. Your Authorization Endpoint is the URL you registered during "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "environment-specific configuration"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Don't validate the inbound URL — ignore unknown parameters"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-fb2d43d1${_scopeId2}> Your Authorization Endpoint MUST NOT reject the redirect based on the query parameters it receives. If a TPP appends additional parameters beyond <code data-v-fb2d43d1${_scopeId2}>client_id</code>, <code data-v-fb2d43d1${_scopeId2}>response_type</code>, and <code data-v-fb2d43d1${_scopeId2}>request_uri</code>, simply ignore them — do not treat the redirect as malformed. </p><p data-v-fb2d43d1${_scopeId2}> The authoritative authorization request is the signed Request JWT referenced by <code data-v-fb2d43d1${_scopeId2}>request_uri</code>; the API Hub validates it when you call <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></span> in Step 5. Forward whatever you receive and let Headless Heimdall be the source of truth. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Your Authorization Endpoint MUST NOT reject the redirect based on the query parameters it receives. If a TPP appends additional parameters beyond "),
                      createVNode("code", null, "client_id"),
                      createTextVNode(", "),
                      createVNode("code", null, "response_type"),
                      createTextVNode(", and "),
                      createVNode("code", null, "request_uri"),
                      createTextVNode(", simply ignore them — do not treat the redirect as malformed. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The authoritative authorization request is the signed Request JWT referenced by "),
                      createVNode("code", null, "request_uri"),
                      createTextVNode("; the API Hub validates it when you call "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ]),
                      createTextVNode(" in Step 5. Forward whatever you receive and let Headless Heimdall be the source of truth. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 5 — Call <span class="endpoint" data-v-fb2d43d1${_scopeId}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId}>GET</span><code data-v-fb2d43d1${_scopeId}>/auth</code></span></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Upon receiving the end user redirect, your authorization server MUST immediately call <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></span> on the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-fb2d43d1${_scopeId2}>Headless Heimdall</a> base URL, passing through <strong data-v-fb2d43d1${_scopeId2}>all</strong> the query parameters received from the redirect. `);
                } else {
                  return [
                    createTextVNode(" Upon receiving the end user redirect, your authorization server MUST immediately call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" on the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                    createTextVNode(" base URL, passing through "),
                    createVNode("strong", null, "all"),
                    createTextVNode(" the query parameters received from the redirect. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: getAuthTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-fb2d43d1${_scopeId2}>200</code> response contains:`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, "200"),
                    createTextVNode(" response contains:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Field</th><th data-v-fb2d43d1${_scopeId2}>Description</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>interaction.interactionId</code></td><td data-v-fb2d43d1${_scopeId2}>Unique identifier for this authorization interaction — required for <code data-v-fb2d43d1${_scopeId2}>doConfirm</code> and <code data-v-fb2d43d1${_scopeId2}>doFail</code></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>interaction.consentIdsList</code></td><td data-v-fb2d43d1${_scopeId2}>Array of consent IDs associated with this interaction (currently one element)</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>tpp</code></td><td data-v-fb2d43d1${_scopeId2}>TPP details including <code data-v-fb2d43d1${_scopeId2}>clientId</code>, <code data-v-fb2d43d1${_scopeId2}>tppName</code>, <code data-v-fb2d43d1${_scopeId2}>orgId</code>, and directory record</td></tr></tbody></table>`);
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
                            createVNode("code", null, "interaction.interactionId")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Unique identifier for this authorization interaction — required for "),
                            createVNode("code", null, "doConfirm"),
                            createTextVNode(" and "),
                            createVNode("code", null, "doFail")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "interaction.consentIdsList")
                          ]),
                          createVNode("td", null, "Array of consent IDs associated with this interaction (currently one element)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "tpp")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("TPP details including "),
                            createVNode("code", null, "clientId"),
                            createTextVNode(", "),
                            createVNode("code", null, "tppName"),
                            createTextVNode(", "),
                            createVNode("code", null, "orgId"),
                            createTextVNode(", and directory record")
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
              title: "Handle all response codes"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></span> can return three outcomes:</p><ul data-v-fb2d43d1${_scopeId2}><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>200</code></strong> — Success. Continue with the authorization journey.</li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>303</code></strong> — Redirectable failure. The OIDC client was valid but the authorization request parameters failed validation. You MUST redirect the end user to the URI in the <code data-v-fb2d43d1${_scopeId2}>Location</code> header <strong data-v-fb2d43d1${_scopeId2}>without modification</strong>.</li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>400</code></strong> — Non-redirectable failure. The OIDC client could not be verified. You MUST render an error page and MUST NOT redirect back to the TPP.</li></ul>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ]),
                      createTextVNode(" can return three outcomes:")
                    ]),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createVNode("code", null, "200")
                        ]),
                        createTextVNode(" — Success. Continue with the authorization journey.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createVNode("code", null, "303")
                        ]),
                        createTextVNode(" — Redirectable failure. The OIDC client was valid but the authorization request parameters failed validation. You MUST redirect the end user to the URI in the "),
                        createVNode("code", null, "Location"),
                        createTextVNode(" header "),
                        createVNode("strong", null, "without modification"),
                        createTextVNode(".")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, [
                          createVNode("code", null, "400")
                        ]),
                        createTextVNode(" — Non-redirectable failure. The OIDC client could not be verified. You MUST render an error page and MUST NOT redirect back to the TPP.")
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
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></span> API Reference</a> for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" }, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ]),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 6 — Retrieve the consent details</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Using the <code data-v-fb2d43d1${_scopeId2}>consentId</code> from the <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/auth</code></span> response, call <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/consents/{consentId}</code></span> on the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-fb2d43d1${_scopeId2}>Consent Manager</a> to retrieve the full consent object. `);
                } else {
                  return [
                    createTextVNode(" Using the "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(" from the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" response, call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(" on the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                    createTextVNode(" to retrieve the full consent object. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: getConsentTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Encrypted PII"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-fb2d43d1${_scopeId2}> Some consent types include encrypted personally identifiable information (PII) — for example, debtor or creditor details on payment consents. If the consent contains encrypted PII fields, your LFI MUST decrypt the data and validate that the decrypted values align exactly with the Open Finance API specification. See <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" data-v-fb2d43d1${_scopeId2}>Personal Identifiable Information</a> for decryption and validation details. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Some consent types include encrypted personally identifiable information (PII) — for example, debtor or creditor details on payment consents. If the consent contains encrypted PII fields, your LFI MUST decrypt the data and validate that the decrypted values align exactly with the Open Finance API specification. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                      createTextVNode(" for decryption and validation details. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/consents/{consentId}</code></span> API Reference</a> for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" }, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}")
                      ]),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Step 4 — End user is redirected to your Authorization Endpoint"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After the consent is created via "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(", the TPP redirects the end user to your "),
                  createVNode("strong", null, "Authorization Endpoint"),
                  createTextVNode(" with the following query parameters: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "text",
                code: psuRedirectUrl
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(" is the value returned from the "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" response. Your Authorization Endpoint is the URL you registered during "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "environment-specific configuration"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Don't validate the inbound URL — ignore unknown parameters"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Your Authorization Endpoint MUST NOT reject the redirect based on the query parameters it receives. If a TPP appends additional parameters beyond "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(", "),
                    createVNode("code", null, "response_type"),
                    createTextVNode(", and "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(", simply ignore them — do not treat the redirect as malformed. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" The authoritative authorization request is the signed Request JWT referenced by "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode("; the API Hub validates it when you call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" in Step 5. Forward whatever you receive and let Headless Heimdall be the source of truth. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("Step 5 — Call "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/auth")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Upon receiving the end user redirect, your authorization server MUST immediately call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(" on the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                  createTextVNode(" base URL, passing through "),
                  createVNode("strong", null, "all"),
                  createTextVNode(" the query parameters received from the redirect. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: getAuthTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, "200"),
                  createTextVNode(" response contains:")
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
                          createVNode("code", null, "interaction.interactionId")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Unique identifier for this authorization interaction — required for "),
                          createVNode("code", null, "doConfirm"),
                          createTextVNode(" and "),
                          createVNode("code", null, "doFail")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "interaction.consentIdsList")
                        ]),
                        createVNode("td", null, "Array of consent IDs associated with this interaction (currently one element)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "tpp")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("TPP details including "),
                          createVNode("code", null, "clientId"),
                          createTextVNode(", "),
                          createVNode("code", null, "tppName"),
                          createTextVNode(", "),
                          createVNode("code", null, "orgId"),
                          createTextVNode(", and directory record")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Handle all response codes"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" can return three outcomes:")
                  ]),
                  createVNode("ul", null, [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "200")
                      ]),
                      createTextVNode(" — Success. Continue with the authorization journey.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "303")
                      ]),
                      createTextVNode(" — Redirectable failure. The OIDC client was valid but the authorization request parameters failed validation. You MUST redirect the end user to the URI in the "),
                      createVNode("code", null, "Location"),
                      createTextVNode(" header "),
                      createVNode("strong", null, "without modification"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "400")
                      ]),
                      createTextVNode(" — Non-redirectable failure. The OIDC client could not be verified. You MUST render an error page and MUST NOT redirect back to the TPP.")
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" }, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full response schema. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 6 — Retrieve the consent details"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Using the "),
                  createVNode("code", null, "consentId"),
                  createTextVNode(" from the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(" response, call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/consents/{consentId}")
                  ]),
                  createTextVNode(" on the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                  createTextVNode(" to retrieve the full consent object. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: getConsentTabs }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Encrypted PII"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Some consent types include encrypted personally identifiable information (PII) — for example, debtor or creditor details on payment consents. If the consent contains encrypted PII fields, your LFI MUST decrypt the data and validate that the decrypted values align exactly with the Open Finance API specification. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                    createTextVNode(" for decryption and validation details. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" }, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "psu-authentication",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "End user authentication",
        title: "Step 7 — authenticate the end user",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your LFI MUST authenticate the end user using your standard authentication mechanisms. The authentication MUST satisfy the requirements defined in the <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements" data-v-fb2d43d1${_scopeId2}>Authentication Requirements</a>. `);
                } else {
                  return [
                    createTextVNode(" Your LFI MUST authenticate the end user using your standard authentication mechanisms. The authentication MUST satisfy the requirements defined in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements" }, "Authentication Requirements"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your LFI MUST authenticate the end user using your standard authentication mechanisms. The authentication MUST satisfy the requirements defined in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements" }, "Authentication Requirements"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-authorization",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Consent authorization",
        title: "Steps 8–9 — present, then PATCH + doConfirm/doFail",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 8 — Present the authorization page</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After the end user has authenticated, present the consent details for the user to review and authorize. The authorization page layout varies by consent type. For example, a bank data sharing consent displays the requested permissions and account selection, while a payment consent displays the payment details. `);
                } else {
                  return [
                    createTextVNode(" After the end user has authenticated, present the consent details for the user to review and authorize. The authorization page layout varies by consent type. For example, a bank data sharing consent displays the requested permissions and account selection, while a payment consent displays the payment details. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the User Experience pages for each consent type for the expected authorization page layouts: `);
                } else {
                  return [
                    createTextVNode(" See the User Experience pages for each consent type for the expected authorization page layouts: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Consent Type</th><th data-v-fb2d43d1${_scopeId2}>User Experience</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Bank Data Sharing</td><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys" data-v-fb2d43d1${_scopeId2}>User Experience</a></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Single Instant Payment</td><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" data-v-fb2d43d1${_scopeId2}>User Experience</a></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Insurance Data Sharing</td><td data-v-fb2d43d1${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys" data-v-fb2d43d1${_scopeId2}>User Experience</a></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Consent Type"),
                          createVNode("th", null, "User Experience")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Data Sharing"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys" }, "User Experience")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Single Instant Payment"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "User Experience")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Insurance Data Sharing"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys" }, "User Experience")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 9a — end user authorizes: PATCH consent and doConfirm</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If the end user approves the consent, your LFI MUST:`);
                } else {
                  return [
                    createTextVNode("If the end user approves the consent, your LFI MUST:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>PATCH the consent</strong> to <code data-v-fb2d43d1${_scopeId2}>Authorized</code> status, providing the end user identifiers, account IDs, and authorization channel</li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>Call <code data-v-fb2d43d1${_scopeId2}>doConfirm</code></strong> to complete the interaction and redirect the end user back to the TPP</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "PATCH the consent"),
                      createTextVNode(" to "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" status, providing the end user identifiers, account IDs, and authorization channel")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Call "),
                        createVNode("code", null, "doConfirm")
                      ]),
                      createTextVNode(" to complete the interaction and redirect the end user back to the TPP")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-fb2d43d1${_scopeId}>PATCH the consent</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: patchAuthorizedTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-fb2d43d1${_scopeId2}>PATCH</code> returns <code data-v-fb2d43d1${_scopeId2}>204 No Content</code> on success.`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, "PATCH"),
                    createTextVNode(" returns "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode(" on success.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Required</th><th data-v-fb2d43d1${_scopeId2}>Description</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>status</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Yes</td><td data-v-fb2d43d1${_scopeId2}>Set to <code data-v-fb2d43d1${_scopeId2}>Authorized</code></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>psuIdentifiers</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Yes</td><td data-v-fb2d43d1${_scopeId2}>Object containing your internal end user identifier fields</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>accountIds</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Yes (Bank consents)</td><td data-v-fb2d43d1${_scopeId2}>Array of account IDs the end user selected. For Bank Data Sharing, one or more accounts. For Bank Service Initiation, exactly one debtor account. Not patched for Insurance Data Sharing — use <code data-v-fb2d43d1${_scopeId2}>insurancePolicyIds</code> instead</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>insurancePolicyIds</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Yes (Insurance Data Sharing)</td><td data-v-fb2d43d1${_scopeId2}>Array of <code data-v-fb2d43d1${_scopeId2}>InsurancePolicyId</code> values the end user selected. The Consent Manager mirrors this into <code data-v-fb2d43d1${_scopeId2}>accountIds</code> automatically so downstream identifier handling stays uniform across consent types</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>authorizationChannel</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fb2d43d1${_scopeId2}>Yes</td><td data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>App</code> or <code data-v-fb2d43d1${_scopeId2}>Web</code> — the channel on which the end user authorized the consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "status")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Set to "),
                            createVNode("code", null, "Authorized")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "psuIdentifiers")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                          createVNode("td", null, "Object containing your internal end user identifier fields")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountIds")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Yes (Bank consents)"),
                          createVNode("td", null, [
                            createTextVNode("Array of account IDs the end user selected. For Bank Data Sharing, one or more accounts. For Bank Service Initiation, exactly one debtor account. Not patched for Insurance Data Sharing — use "),
                            createVNode("code", null, "insurancePolicyIds"),
                            createTextVNode(" instead")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "insurancePolicyIds")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Yes (Insurance Data Sharing)"),
                          createVNode("td", null, [
                            createTextVNode("Array of "),
                            createVNode("code", null, "InsurancePolicyId"),
                            createTextVNode(" values the end user selected. The Consent Manager mirrors this into "),
                            createVNode("code", null, "accountIds"),
                            createTextVNode(" automatically so downstream identifier handling stays uniform across consent types")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorizationChannel")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "App"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Web"),
                            createTextVNode(" — the channel on which the end user authorized the consent")
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
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--patch" data-v-fb2d43d1${_scopeId2}>PATCH</span><code data-v-fb2d43d1${_scopeId2}>/consents/{consentId}</code></span> API Reference</a> for the full request schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" }, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/consents/{consentId}")
                      ]),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full request schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-fb2d43d1${_scopeId}>Call doConfirm</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: doConfirmTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub responds with a <strong data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>303 See Other</code></strong> containing the redirect URI back to the TPP. Your LFI MUST redirect the end user to this URI to complete the journey. `);
                } else {
                  return [
                    createTextVNode(" The API Hub responds with a "),
                    createVNode("strong", null, [
                      createVNode("code", null, "303 See Other")
                    ]),
                    createTextVNode(" containing the redirect URI back to the TPP. Your LFI MUST redirect the end user to this URI to complete the journey. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/auth/{interactionId}/doConfirm</code></span> API Reference</a> for the full specification. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doConfirm")
                      ]),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full specification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}>Step 9b — end user rejects: PATCH consent and doFail</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If the end user declines the consent or authentication fails, your LFI MUST:`);
                } else {
                  return [
                    createTextVNode("If the end user declines the consent or authentication fails, your LFI MUST:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>PATCH the consent</strong> to <code data-v-fb2d43d1${_scopeId2}>Rejected</code> status, providing the end user identifiers (but <strong data-v-fb2d43d1${_scopeId2}>not</strong> account IDs)</li><li data-v-fb2d43d1${_scopeId2}><strong data-v-fb2d43d1${_scopeId2}>Call <code data-v-fb2d43d1${_scopeId2}>doFail</code></strong> to complete the interaction and redirect the end user back to the TPP with an error</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "PATCH the consent"),
                      createTextVNode(" to "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(" status, providing the end user identifiers (but "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" account IDs)")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Call "),
                        createVNode("code", null, "doFail")
                      ]),
                      createTextVNode(" to complete the interaction and redirect the end user back to the TPP with an error")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-fb2d43d1${_scopeId}>PATCH the consent</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: patchRejectedTabs }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-fb2d43d1${_scopeId}>Call doFail</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: doFailTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub responds with a <strong data-v-fb2d43d1${_scopeId2}><code data-v-fb2d43d1${_scopeId2}>303 See Other</code></strong> containing the redirect URI back to the TPP with OAuth 2.0 error parameters. Your LFI MUST redirect the end user to this URI. If you omit <code data-v-fb2d43d1${_scopeId2}>error</code> and <code data-v-fb2d43d1${_scopeId2}>error_description</code>, the API Hub will return default error values. `);
                } else {
                  return [
                    createTextVNode(" The API Hub responds with a "),
                    createVNode("strong", null, [
                      createVNode("code", null, "303 See Other")
                    ]),
                    createTextVNode(" containing the redirect URI back to the TPP with OAuth 2.0 error parameters. Your LFI MUST redirect the end user to this URI. If you omit "),
                    createVNode("code", null, "error"),
                    createTextVNode(" and "),
                    createVNode("code", null, "error_description"),
                    createTextVNode(", the API Hub will return default error values. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" data-v-fb2d43d1${_scopeId2}><span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--post" data-v-fb2d43d1${_scopeId2}>POST</span><code data-v-fb2d43d1${_scopeId2}>/auth/{interactionId}/doFail</code></span> API Reference</a> for the full specification. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doFail")
                      ]),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full specification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Step 8 — Present the authorization page"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After the end user has authenticated, present the consent details for the user to review and authorize. The authorization page layout varies by consent type. For example, a bank data sharing consent displays the requested permissions and account selection, while a payment consent displays the payment details. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the User Experience pages for each consent type for the expected authorization page layouts: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Consent Type"),
                        createVNode("th", null, "User Experience")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Data Sharing"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys" }, "User Experience")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Single Instant Payment"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "User Experience")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Insurance Data Sharing"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys" }, "User Experience")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 9a — end user authorizes: PATCH consent and doConfirm"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If the end user approves the consent, your LFI MUST:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "PATCH the consent"),
                    createTextVNode(" to "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" status, providing the end user identifiers, account IDs, and authorization channel")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Call "),
                      createVNode("code", null, "doConfirm")
                    ]),
                    createTextVNode(" to complete the interaction and redirect the end user back to the TPP")
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", null, "PATCH the consent"),
              createVNode(_component_EdCodeGroup, { tabs: patchAuthorizedTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, "PATCH"),
                  createTextVNode(" returns "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode(" on success.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "status")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Set to "),
                          createVNode("code", null, "Authorized")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "psuIdentifiers")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                        createVNode("td", null, "Object containing your internal end user identifier fields")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountIds")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Yes (Bank consents)"),
                        createVNode("td", null, [
                          createTextVNode("Array of account IDs the end user selected. For Bank Data Sharing, one or more accounts. For Bank Service Initiation, exactly one debtor account. Not patched for Insurance Data Sharing — use "),
                          createVNode("code", null, "insurancePolicyIds"),
                          createTextVNode(" instead")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "insurancePolicyIds")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Yes (Insurance Data Sharing)"),
                        createVNode("td", null, [
                          createTextVNode("Array of "),
                          createVNode("code", null, "InsurancePolicyId"),
                          createTextVNode(" values the end user selected. The Consent Manager mirrors this into "),
                          createVNode("code", null, "accountIds"),
                          createTextVNode(" automatically so downstream identifier handling stays uniform across consent types")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorizationChannel")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "App"),
                          createTextVNode(" or "),
                          createVNode("code", null, "Web"),
                          createTextVNode(" — the channel on which the end user authorized the consent")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" }, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full request schema. ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Call doConfirm"),
              createVNode(_component_EdCodeGroup, { tabs: doConfirmTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub responds with a "),
                  createVNode("strong", null, [
                    createVNode("code", null, "303 See Other")
                  ]),
                  createTextVNode(" containing the redirect URI back to the TPP. Your LFI MUST redirect the end user to this URI to complete the journey. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doConfirm")
                    ]),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full specification. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 9b — end user rejects: PATCH consent and doFail"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If the end user declines the consent or authentication fails, your LFI MUST:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "PATCH the consent"),
                    createTextVNode(" to "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" status, providing the end user identifiers (but "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" account IDs)")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Call "),
                      createVNode("code", null, "doFail")
                    ]),
                    createTextVNode(" to complete the interaction and redirect the end user back to the TPP with an error")
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", null, "PATCH the consent"),
              createVNode(_component_EdCodeGroup, { tabs: patchRejectedTabs }),
              createVNode("h4", null, "Call doFail"),
              createVNode(_component_EdCodeGroup, { tabs: doFailTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub responds with a "),
                  createVNode("strong", null, [
                    createVNode("code", null, "303 See Other")
                  ]),
                  createTextVNode(" containing the redirect URI back to the TPP with OAuth 2.0 error parameters. Your LFI MUST redirect the end user to this URI. If you omit "),
                  createVNode("code", null, "error"),
                  createTextVNode(" and "),
                  createVNode("code", null, "error_description"),
                  createTextVNode(", the API Hub will return default error values. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doFail")
                    ]),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full specification. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "identifier-requirements",
        num: "07",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Identifier requirements",
        title: "psuIdentifiers and accountIds MUST be opaque",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The values the LFI patches onto the consent — <code data-v-fb2d43d1${_scopeId2}>psuIdentifiers</code> and <code data-v-fb2d43d1${_scopeId2}>accountIds</code> — are stored centrally in the API Hub. They MUST be <strong data-v-fb2d43d1${_scopeId2}>opaque, non-sensitive, LFI-defined references</strong>. `);
                } else {
                  return [
                    createTextVNode(" The values the LFI patches onto the consent — "),
                    createVNode("code", null, "psuIdentifiers"),
                    createTextVNode(" and "),
                    createVNode("code", null, "accountIds"),
                    createTextVNode(" — are stored centrally in the API Hub. They MUST be "),
                    createVNode("strong", null, "opaque, non-sensitive, LFI-defined references"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "No sensitive values on the consent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-fb2d43d1${_scopeId2}> The LFI MUST NOT use Emirates ID, passport number, name, email, phone number, IBAN, account number, card number, CIF, or any other value that on its own identifies a natural person or a real-world account. </p><p data-v-fb2d43d1${_scopeId2}> See <a href="/knowledge-base/articles/consent-identifiers" data-v-fb2d43d1${_scopeId2}>Consent Identifiers</a> for the full rationale. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The LFI MUST NOT use Emirates ID, passport number, name, email, phone number, IBAN, account number, card number, CIF, or any other value that on its own identifies a natural person or a real-world account. "),
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "/knowledge-base/articles/consent-identifiers" }, "Consent Identifiers"),
                      createTextVNode(" for the full rationale. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}><code data-v-fb2d43d1${_scopeId}>psuIdentifiers.userId</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Rule</th><th data-v-fb2d43d1${_scopeId2}>Requirement</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Type</td><td data-v-fb2d43d1${_scopeId2}>String (required field on <code data-v-fb2d43d1${_scopeId2}>psuIdentifiers</code>)</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Pattern</td><td data-v-fb2d43d1${_scopeId2}>LFI-defined opaque string. UUID (v4) recommended</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Uniqueness</td><td data-v-fb2d43d1${_scopeId2}>MUST uniquely identify a single end user within the LFI</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Stability</td><td data-v-fb2d43d1${_scopeId2}>MUST be the same value for the same end user across every consent they authorise — used by <span class="endpoint" data-v-fb2d43d1${_scopeId2}><span class="http-method http-method--get" data-v-fb2d43d1${_scopeId2}>GET</span><code data-v-fb2d43d1${_scopeId2}>/psu/{userId}/consents</code></span></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Sensitive values</td><td data-v-fb2d43d1${_scopeId2}>MUST NOT be an Emirates ID, email, phone, CIF, or any other PII</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Requirement")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Type"),
                          createVNode("td", null, [
                            createTextVNode("String (required field on "),
                            createVNode("code", null, "psuIdentifiers"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Pattern"),
                          createVNode("td", null, "LFI-defined opaque string. UUID (v4) recommended")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Uniqueness"),
                          createVNode("td", null, "MUST uniquely identify a single end user within the LFI")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Stability"),
                          createVNode("td", null, [
                            createTextVNode("MUST be the same value for the same end user across every consent they authorise — used by "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/psu/{userId}/consents")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Sensitive values"),
                          createVNode("td", null, "MUST NOT be an Emirates ID, email, phone, CIF, or any other PII")
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
                  _push3(` Additional custom fields on <code data-v-fb2d43d1${_scopeId2}>psuIdentifiers</code> are permitted but MUST follow the same non-sensitive rule. `);
                } else {
                  return [
                    createTextVNode(" Additional custom fields on "),
                    createVNode("code", null, "psuIdentifiers"),
                    createTextVNode(" are permitted but MUST follow the same non-sensitive rule. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-fb2d43d1${_scopeId}><code data-v-fb2d43d1${_scopeId}>accountIds[]</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-fb2d43d1${_scopeId2}><thead data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><th data-v-fb2d43d1${_scopeId2}>Rule</th><th data-v-fb2d43d1${_scopeId2}>Requirement</th></tr></thead><tbody data-v-fb2d43d1${_scopeId2}><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Type</td><td data-v-fb2d43d1${_scopeId2}>Array of strings, <code data-v-fb2d43d1${_scopeId2}>minItems: 1</code></td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Item format</td><td data-v-fb2d43d1${_scopeId2}>String, 1–40 characters. UUID (v4) recommended</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Value</td><td data-v-fb2d43d1${_scopeId2}>MUST match the <code data-v-fb2d43d1${_scopeId2}>AccountId</code> the LFI returns from its own <code data-v-fb2d43d1${_scopeId2}>/accounts</code> APIs — the API Hub uses it to enrich downstream TPP requests</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Immutability</td><td data-v-fb2d43d1${_scopeId2}>Once issued, the <code data-v-fb2d43d1${_scopeId2}>AccountId</code> for an account MUST NOT change</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Uniqueness</td><td data-v-fb2d43d1${_scopeId2}>MUST uniquely identify a single account within the LFI</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Sensitive values</td><td data-v-fb2d43d1${_scopeId2}>MUST NOT be an IBAN, account number, card number, or any externally-meaningful account identifier</td></tr><tr data-v-fb2d43d1${_scopeId2}><td data-v-fb2d43d1${_scopeId2}>Cardinality</td><td data-v-fb2d43d1${_scopeId2}>Bank Service Initiation: exactly one (the debtor account). Bank Data Sharing: one or more selected accounts. Insurance Data Sharing: not patched directly — the Consent Manager mirrors <code data-v-fb2d43d1${_scopeId2}>insurancePolicyIds</code> into <code data-v-fb2d43d1${_scopeId2}>accountIds</code> via trigger</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Requirement")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Type"),
                          createVNode("td", null, [
                            createTextVNode("Array of strings, "),
                            createVNode("code", null, "minItems: 1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Item format"),
                          createVNode("td", null, "String, 1–40 characters. UUID (v4) recommended")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Value"),
                          createVNode("td", null, [
                            createTextVNode("MUST match the "),
                            createVNode("code", null, "AccountId"),
                            createTextVNode(" the LFI returns from its own "),
                            createVNode("code", null, "/accounts"),
                            createTextVNode(" APIs — the API Hub uses it to enrich downstream TPP requests")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Immutability"),
                          createVNode("td", null, [
                            createTextVNode("Once issued, the "),
                            createVNode("code", null, "AccountId"),
                            createTextVNode(" for an account MUST NOT change")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Uniqueness"),
                          createVNode("td", null, "MUST uniquely identify a single account within the LFI")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Sensitive values"),
                          createVNode("td", null, "MUST NOT be an IBAN, account number, card number, or any externally-meaningful account identifier")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Cardinality"),
                          createVNode("td", null, [
                            createTextVNode("Bank Service Initiation: exactly one (the debtor account). Bank Data Sharing: one or more selected accounts. Insurance Data Sharing: not patched directly — the Consent Manager mirrors "),
                            createVNode("code", null, "insurancePolicyIds"),
                            createTextVNode(" into "),
                            createVNode("code", null, "accountIds"),
                            createTextVNode(" via trigger")
                          ])
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
                  createTextVNode(" The values the LFI patches onto the consent — "),
                  createVNode("code", null, "psuIdentifiers"),
                  createTextVNode(" and "),
                  createVNode("code", null, "accountIds"),
                  createTextVNode(" — are stored centrally in the API Hub. They MUST be "),
                  createVNode("strong", null, "opaque, non-sensitive, LFI-defined references"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "No sensitive values on the consent"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The LFI MUST NOT use Emirates ID, passport number, name, email, phone number, IBAN, account number, card number, CIF, or any other value that on its own identifies a natural person or a real-world account. "),
                  createVNode("p", null, [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/knowledge-base/articles/consent-identifiers" }, "Consent Identifiers"),
                    createTextVNode(" for the full rationale. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "psuIdentifiers.userId")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Requirement")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Type"),
                        createVNode("td", null, [
                          createTextVNode("String (required field on "),
                          createVNode("code", null, "psuIdentifiers"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Pattern"),
                        createVNode("td", null, "LFI-defined opaque string. UUID (v4) recommended")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Uniqueness"),
                        createVNode("td", null, "MUST uniquely identify a single end user within the LFI")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Stability"),
                        createVNode("td", null, [
                          createTextVNode("MUST be the same value for the same end user across every consent they authorise — used by "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/psu/{userId}/consents")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Sensitive values"),
                        createVNode("td", null, "MUST NOT be an Emirates ID, email, phone, CIF, or any other PII")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Additional custom fields on "),
                  createVNode("code", null, "psuIdentifiers"),
                  createTextVNode(" are permitted but MUST follow the same non-sensitive rule. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "accountIds[]")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Requirement")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Type"),
                        createVNode("td", null, [
                          createTextVNode("Array of strings, "),
                          createVNode("code", null, "minItems: 1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Item format"),
                        createVNode("td", null, "String, 1–40 characters. UUID (v4) recommended")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Value"),
                        createVNode("td", null, [
                          createTextVNode("MUST match the "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(" the LFI returns from its own "),
                          createVNode("code", null, "/accounts"),
                          createTextVNode(" APIs — the API Hub uses it to enrich downstream TPP requests")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Immutability"),
                        createVNode("td", null, [
                          createTextVNode("Once issued, the "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(" for an account MUST NOT change")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Uniqueness"),
                        createVNode("td", null, "MUST uniquely identify a single account within the LFI")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Sensitive values"),
                        createVNode("td", null, "MUST NOT be an IBAN, account number, card number, or any externally-meaningful account identifier")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Cardinality"),
                        createVNode("td", null, [
                          createTextVNode("Bank Service Initiation: exactly one (the debtor account). Bank Data Sharing: one or more selected accounts. Insurance Data Sharing: not patched directly — the Consent Manager mirrors "),
                          createVNode("code", null, "insurancePolicyIds"),
                          createTextVNode(" into "),
                          createVNode("code", null, "accountIds"),
                          createTextVNode(" via trigger")
                        ])
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
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/consent-journey/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb2d43d1"]]);
export {
  apiGuide as default
};
