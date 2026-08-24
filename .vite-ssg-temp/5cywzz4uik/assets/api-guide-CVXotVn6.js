import { _ as __unplugin_components_8$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5, e as _sfc_main$6 } from "./ApiGuideStepRequestJwtScopeNote-CrOzrs1j.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5$1 } from "./ApiGuideStepEncryptPii-BY0gAfGW.js";
import { _ as _sfc_main$1 } from "./APIFlowsSingleInstantPayment-DdR-uW2v.js";
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
const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      // Multi-authorization only: deadline for all authorizers to act.
      // SHOULD NOT be set when IsSingleAuthorization is true.
      // "AuthorizationExpirationDateTime": "2026-05-03T16:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadRefundAccount"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "SinglePayment": {
            "Type": "SingleInstantPayment",
            "Amount": {
              "Amount": "100.00",
              "Currency": "AED"
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 1234",
      "CreditorReference": "Invoice 1234"
    }
  }
]
`;
const step3Node = `import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:service-initiation-consent:v2.2',
    consent: {
      ConsentId: crypto.randomUUID(),
      IsSingleAuthorization: true,
      ExpirationDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'],
      ControlParameters: {
        ConsentSchedule: {
          SinglePayment: {
            Type: 'SingleInstantPayment',
            Amount: { Amount: '100.00', Currency: 'AED' },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Invoice 1234',
      CreditorReference: 'Invoice 1234',
    },
  },
]

const requestJWT = await buildRequestJWT({
  scope: 'payments openid',
  codeChallenge,
  authorizationDetails,
})
`;
const step3Python = `import uuid
from datetime import datetime, timezone, timedelta
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

code_verifier  = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

authorization_details = [
    {
        "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "IsSingleAuthorization": True,
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
            "ControlParameters": {
                "ConsentSchedule": {
                    "SinglePayment": {
                        "Type": "SingleInstantPayment",
                        "Amount": {"Amount": "100.00", "Currency": "AED"},
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Invoice 1234",
            "CreditorReference": "Invoice 1234",
        },
    }
]

request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`;
const step9Node = `import { SignJWT, importJWK, CompactEncrypt } from 'jose'

/**
 * Sign PII as a JWT and encrypt it as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string, signingKey: CryptoKey, signingKeyId: string): Promise<string> {
  // 1. Sign the PII as a JWT
  const signedPII = await new SignJWT(pii as Record<string, unknown>)
    .setProtectedHeader({ alg: 'PS256', kid: signingKeyId })
    .sign(signingKey)

  // 2. Fetch the LFI's encryption key
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 3. Encrypt the signed JWT
  return new CompactEncrypt(new TextEncoder().encode(signedPII))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
  "Initiation": {
    "Creditor": {
      "Name": "Ivan England"
    },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ivan David England"
      }
    }
  }
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// encryptedPII is a compact JWE string — embed it in authorization_details below
`;
const step9Python = `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    keys = requests.get(jwks_uri).json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()

pii = {
  "Initiation": {
    "Creditor": {
      "Name": "Ivan England"
    },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ivan David England"
      }
    }
  }
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
`;
const step10Node = `import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

// Build the payment payload — wrapped in \`message\` per AEPaymentRequestSigned
const paymentPayload = {
  message: {
    Data: {
      ConsentId: consentId,                        // must exactly match the authorized consent
      Instruction: {
        Amount: {
          Amount:   '100.00',                      // must exactly match SinglePayment.Amount.Amount
          Currency: 'AED',                         // must exactly match SinglePayment.Amount.Currency
        },
      },
      PersonalIdentifiableInformation: paymentEncryptedPII,  // from Step 9a
      PaymentPurposeCode: 'ACM',                   // must exactly match consent.PaymentPurposeCode
      DebtorReference:    'Invoice 1234',          // must exactly match consent.DebtorReference
      CreditorReference:  'Invoice 1234',          // must exactly match consent.CreditorReference
      OpenFinanceBilling: {
        Type: 'PushP2P',                           // must exactly match consent.OpenFinanceBilling.Type
      },
    },
  },
}

// Sign the payload as a JWT using your private signing key
// AUTHORIZATION_SERVER_ISSUER is the \`issuer\` value from the LFI's .well-known/openid-configuration
const signedPayment = await new SignJWT(paymentPayload)
  .setProtectedHeader({ alg: 'PS256', kid: SIGNING_KEY_ID, typ: 'JWT' })
  .setIssuedAt()
  .setIssuer(CLIENT_ID)
  .setAudience(AUTHORIZATION_SERVER_ISSUER)
  .setExpirationTime('5m')
  .sign(signingKey)

const paymentResponse = await fetch(\`\${LFI_API_BASE}/open-finance/payment/v2.2/payments\`, {
  method: 'POST',
  headers: {
    'Authorization':               \`Bearer \${access_token}\`,
    'Content-Type':                'application/jwt',
    'x-idempotency-key':           idempotencyKey,       // stable per payment attempt; reuse on retry
    'x-fapi-interaction-id':       crypto.randomUUID(),
    'x-fapi-auth-date':            lastCustomerAuthDate,
    'x-fapi-customer-ip-address':  customerIpAddress,
  },
  body: signedPayment,
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data: { PaymentId, Status } } = await paymentResponse.json()
// Store PaymentId to poll for status
`;
const step10Python = `import uuid
import time
from jose import jwt as jose_jwt

LFI_API_BASE = os.environ["LFI_API_BASE_URL"]

# Build the payment payload — wrapped in \`message\` per AEPaymentRequestSigned
payment_payload = {
    "message": {
        "Data": {
            "ConsentId":   consent_id,               # must exactly match the authorized consent
            "Instruction": {
                "Amount": {
                    "Amount":   "100.00",            # must exactly match SinglePayment.Amount.Amount
                    "Currency": "AED",               # must exactly match SinglePayment.Amount.Currency
                }
            },
            "PersonalIdentifiableInformation": payment_encrypted_pii,  # from Step 9a
            "PaymentPurposeCode": "ACM",             # must exactly match consent.PaymentPurposeCode
            "DebtorReference":    "Invoice 1234",    # must exactly match consent.DebtorReference
            "CreditorReference":  "Invoice 1234",    # must exactly match consent.CreditorReference
            "OpenFinanceBilling": {
                "Type": "PushP2P",                   # must exactly match consent.OpenFinanceBilling.Type
            },
        }
    }
}

# Sign the payload as a JWT using your private signing key
# AUTHORIZATION_SERVER_ISSUER is the \`issuer\` value from the LFI's .well-known/openid-configuration
now = int(time.time())
signed_payment = jose_jwt.encode(
    {
        **payment_payload,
        "iss": CLIENT_ID,
        "aud": AUTHORIZATION_SERVER_ISSUER,
        "iat": now,
        "exp": now + 300,
    },
    signing_key,
    algorithm="PS256",
    headers={"kid": SIGNING_KEY_ID, "typ": "JWT"},
)

payment_response = httpx.post(
    f"{LFI_API_BASE}/open-finance/payment/v2.2/payments",
    headers={
        "Authorization":               f"Bearer {access_token}",
        "Content-Type":                "application/jwt",
        "x-idempotency-key":           idempotency_key,   # stable per payment attempt; reuse on retry
        "x-fapi-interaction-id":       str(uuid.uuid4()),
        "x-fapi-auth-date":            last_customer_auth_date,
        "x-fapi-customer-ip-address":  customer_ip_address,
    },
    content=signed_payment,
    # cert=("transport.crt", "transport.key"),
)

data       = payment_response.json()["Data"]
payment_id = data["PaymentId"]
status     = data["Status"]
`;
const successResponseJson = `{
  "message": {
    "Data": {
      "PaymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
      "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
      "Status": "Pending",
      "StatusUpdateDateTime": "2026-05-03T15:46:01+00:00",
      "CreationDateTime": "2026-05-03T15:46:01+00:00",
      "Instruction": {
        "Amount": {
          "Amount": "100.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 1234",
      "OpenFinanceBilling": {
        "Type": "PushP2P"
      }
    },
    "Links": {
      "Self": "https://api.lfi.example/open-finance/payment/v2.2/payments/83b47199-90c2-4c05-9ef1-aeae68b0fc7c"
    }
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const step3Tabs = [{ label: "Node.js", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const step9Tabs = [{ label: "Node.js", lang: "typescript", code: step9Node }, { label: "Python", lang: "python", code: step9Python }];
    const step10Tabs = [{ label: "Node.js", lang: "typescript", code: step10Node }, { label: "Python", lang: "python", code: step10Python }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsSingleInstantPayment = _sfc_main$1;
      const _component_ApiGuideStepEncryptPii = __unplugin_components_5$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_ApiGuideStepRequestJwtScopeNote = __unplugin_components_8$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_ApiGuideStepClientAssertion = _sfc_main$2;
      const _component_ApiGuideStepParRequest = _sfc_main$3;
      const _component_ApiGuideStepRedirectCode = _sfc_main$4;
      const _component_ApiGuideStepCallback = _sfc_main$5;
      const _component_ApiGuideStepTokenExchange = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-170fb85d><section class="ed-doc__hero" data-v-170fb85d><div class="ed-doc__inner" data-v-170fb85d><div class="ed-doc__eyebrow" data-v-170fb85d><span class="ed-doc__eyebrow-dash" data-v-170fb85d></span> TPP · Banking · Service Initiation · Single Instant Payment </div><h1 class="ed-doc__title" data-v-170fb85d> Single Instant Payment — API Guide <span class="ed-doc__read" data-v-170fb85d>5 min read</span></h1><p class="ed-doc__lede" data-v-170fb85d> A Single Instant Payment is a one-time, immediate domestic payment initiated by the TPP on behalf of the user. The payment amount and destination are fixed at the point of consent — the user approves once, and the payment executes immediately after authorization. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before initiating a Single Instant Payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before initiating a Single Instant Payment, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before initiating a Single Instant Payment, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-170fb85d${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-170fb85d${_scopeId2}>BSIP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-170fb85d${_scopeId2}>Roles</a>. </li><li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-170fb85d${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-170fb85d${_scopeId2}>mTLS communication</strong>. </li><li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-170fb85d${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. </li><li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide" data-v-170fb85d${_scopeId2}>API Hub (Authorisation Server)</a></strong> — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. </li><li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Understanding of the <a href="/tech/tpp-standards/security/fapi/" data-v-170fb85d${_scopeId2}>FAPI Security Profile</a></strong> and <strong data-v-170fb85d${_scopeId2}><a href="/tech/tpp-standards/security/tokens/" data-v-170fb85d${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. </li><li data-v-170fb85d${_scopeId2}><strong data-v-170fb85d${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-170fb85d${_scopeId2}>Message Encryption</a></strong> — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI&#39;s public encryption key from their JWKS. </li>`);
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
                      createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registration with the relevant "),
                        createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                      ]),
                      createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of the "),
                        createVNode("a", { href: "/tech/tpp-standards/security/fapi/" }, "FAPI Security Profile")
                      ]),
                      createTextVNode(" and "),
                      createVNode("strong", null, [
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                      ]),
                      createTextVNode(" — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of "),
                        createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption")
                      ]),
                      createTextVNode(" — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. ")
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
                  createTextVNode("Before initiating a Single Instant Payment, ensure the following requirements are met:")
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
                    createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registration with the relevant "),
                      createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                    ]),
                    createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of the "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/" }, "FAPI Security Profile")
                    ]),
                    createTextVNode(" and "),
                    createVNode("strong", null, [
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                    ]),
                    createTextVNode(" — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption")
                    ]),
                    createTextVNode(" — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. ")
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
        title: "End-to-end Single Instant Payment",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Single Instant Payment API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsSingleInstantPayment, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsSingleInstantPayment)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Single Instant Payment API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsSingleInstantPayment)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-encrypt-pii",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "POST /par · Step 1 — Encrypting PII",
        title: "Sign and encrypt the consent PII",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-170fb85d${_scopeId}><span class="http-badge http-post" data-v-170fb85d${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-170fb85d${_scopeId}>/par</code></div>`);
            _push2(ssrRenderComponent(_component_ApiGuideStepEncryptPii, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/par")
              ]),
              createVNode(_component_ApiGuideStepEncryptPii)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-authorization-details",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "POST /par · Step 2 — Constructing Authorization Details",
        title: "Build the consent payload",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With the encrypted PII ready, construct the <code data-v-170fb85d${_scopeId2}>authorization_details</code> of type <code data-v-170fb85d${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code>. The encrypted PII is embedded as <code data-v-170fb85d${_scopeId2}>consent.PersonalIdentifiableInformation</code>. `);
                } else {
                  return [
                    createTextVNode(" With the encrypted PII ready, construct the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" of type "),
                    createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2"),
                    createTextVNode(". The encrypted PII is embedded as "),
                    createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-170fb85d${_scopeId}>authorization_details</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-170fb85d${_scopeId2}><thead data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><th data-v-170fb85d${_scopeId2}>Field</th><th data-v-170fb85d${_scopeId2}>Type</th><th data-v-170fb85d${_scopeId2}>Description</th><th data-v-170fb85d${_scopeId2}>Example</th></tr></thead><tbody data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>type</code>*</td><td data-v-170fb85d${_scopeId2}>enum</td><td data-v-170fb85d${_scopeId2}>Must be <code data-v-170fb85d${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent</code>*</td><td data-v-170fb85d${_scopeId2}>object</td><td data-v-170fb85d${_scopeId2}>Consent properties agreed by the User with the TPP. <em data-v-170fb85d${_scopeId2}>Described below.</em></td><td data-v-170fb85d${_scopeId2}>—</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>subscription</code></td><td data-v-170fb85d${_scopeId2}>object</td><td data-v-170fb85d${_scopeId2}>Optional subscription to Event Notifications via Webhook. <em data-v-170fb85d${_scopeId2}>Described below.</em></td><td data-v-170fb85d${_scopeId2}>—</td></tr></tbody></table>`);
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
                            createVNode("code", null, "type"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "consent"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Consent properties agreed by the User with the TPP. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, "—")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "subscription")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Optional subscription to Event Notifications via Webhook. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, "—")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-170fb85d${_scopeId}>consent (Required) | <code data-v-170fb85d${_scopeId}>authorization_details.consent</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-170fb85d${_scopeId2}><thead data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><th data-v-170fb85d${_scopeId2}>Field</th><th data-v-170fb85d${_scopeId2}>Type</th><th data-v-170fb85d${_scopeId2}>Description</th><th data-v-170fb85d${_scopeId2}>Example</th></tr></thead><tbody data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ConsentId</code>*</td><td data-v-170fb85d${_scopeId2}>string (uuid)</td><td data-v-170fb85d${_scopeId2}>Unique ID assigned by the TPP (1–128 chars)</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>b8f42378-10ac-46a1-8d20-4e020484216d</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>IsSingleAuthorization</code>*</td><td data-v-170fb85d${_scopeId2}>boolean</td><td data-v-170fb85d${_scopeId2}>Whether the payment requires only one authorizing party</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>true</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ExpirationDateTime</code>*</td><td data-v-170fb85d${_scopeId2}>date-time</td><td data-v-170fb85d${_scopeId2}>Consent expiry (ISO 8601 with timezone, max 1 year)</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>2026-05-03T15:46:00+00:00</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>AuthorizationExpirationDateTime</code></td><td data-v-170fb85d${_scopeId2}>date-time</td><td data-v-170fb85d${_scopeId2}>Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when <code data-v-170fb85d${_scopeId2}>IsSingleAuthorization</code> is <code data-v-170fb85d${_scopeId2}>false</code>; SHOULD NOT be set when <code data-v-170fb85d${_scopeId2}>IsSingleAuthorization</code> is <code data-v-170fb85d${_scopeId2}>true</code>. MUST NOT be after <code data-v-170fb85d${_scopeId2}>ExpirationDateTime</code>.</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>2026-05-03T16:00:00+00:00</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>BaseConsentId</code></td><td data-v-170fb85d${_scopeId2}>string (uuid)</td><td data-v-170fb85d${_scopeId2}>Used when amending or renewing an existing consent</td><td data-v-170fb85d${_scopeId2}>—</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Permissions</code></td><td data-v-170fb85d${_scopeId2}>array&lt;enum&gt;</td><td data-v-170fb85d${_scopeId2}>Optional access permissions granted alongside the payment consent</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ReadAccountsBasic</code>, <code data-v-170fb85d${_scopeId2}>ReadBalances</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ControlParameters</code>*</td><td data-v-170fb85d${_scopeId2}>object</td><td data-v-170fb85d${_scopeId2}>Payment schedule and amount. <em data-v-170fb85d${_scopeId2}>Described below.</em></td><td data-v-170fb85d${_scopeId2}>—</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PersonalIdentifiableInformation</code>*</td><td data-v-170fb85d${_scopeId2}>string (JWE)</td><td data-v-170fb85d${_scopeId2}>Encrypted creditor and risk data — the <code data-v-170fb85d${_scopeId2}>encryptedPII</code> string from Step 1</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>eyJhbGci...</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PaymentPurposeCode</code>*</td><td data-v-170fb85d${_scopeId2}>string (3 chars)</td><td data-v-170fb85d${_scopeId2}>AANI payment purpose code</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ACM</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>DebtorReference</code></td><td data-v-170fb85d${_scopeId2}>string</td><td data-v-170fb85d${_scopeId2}>Reference shown on the debtor&#39;s statement</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Test Purchase</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>CreditorReference</code></td><td data-v-170fb85d${_scopeId2}>string</td><td data-v-170fb85d${_scopeId2}>Reference shown on the creditor&#39;s statement</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Test Purchase</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "ConsentId"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string (uuid)"),
                          createVNode("td", null, "Unique ID assigned by the TPP (1–128 chars)"),
                          createVNode("td", null, [
                            createVNode("code", null, "b8f42378-10ac-46a1-8d20-4e020484216d")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsSingleAuthorization"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether the payment requires only one authorizing party"),
                          createVNode("td", null, [
                            createVNode("code", null, "true")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ExpirationDateTime"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "Consent expiry (ISO 8601 with timezone, max 1 year)"),
                          createVNode("td", null, [
                            createVNode("code", null, "2026-05-03T15:46:00+00:00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AuthorizationExpirationDateTime")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, [
                            createTextVNode("Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when "),
                            createVNode("code", null, "IsSingleAuthorization"),
                            createTextVNode(" is "),
                            createVNode("code", null, "false"),
                            createTextVNode("; SHOULD NOT be set when "),
                            createVNode("code", null, "IsSingleAuthorization"),
                            createTextVNode(" is "),
                            createVNode("code", null, "true"),
                            createTextVNode(". MUST NOT be after "),
                            createVNode("code", null, "ExpirationDateTime"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "2026-05-03T16:00:00+00:00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BaseConsentId")
                          ]),
                          createVNode("td", null, "string (uuid)"),
                          createVNode("td", null, "Used when amending or renewing an existing consent"),
                          createVNode("td", null, "—")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Permissions")
                          ]),
                          createVNode("td", null, "array<enum>"),
                          createVNode("td", null, "Optional access permissions granted alongside the payment consent"),
                          createVNode("td", null, [
                            createVNode("code", null, "ReadAccountsBasic"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadBalances")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ControlParameters"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Payment schedule and amount. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, "—")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PersonalIdentifiableInformation"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string (JWE)"),
                          createVNode("td", null, [
                            createTextVNode("Encrypted creditor and risk data — the "),
                            createVNode("code", null, "encryptedPII"),
                            createTextVNode(" string from Step 1")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "eyJhbGci...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentPurposeCode"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string (3 chars)"),
                          createVNode("td", null, "AANI payment purpose code"),
                          createVNode("td", null, [
                            createVNode("code", null, "ACM")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Reference shown on the debtor's statement"),
                          createVNode("td", null, [
                            createVNode("code", null, "Test Purchase")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Reference shown on the creditor's statement"),
                          createVNode("td", null, [
                            createVNode("code", null, "Test Purchase")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-170fb85d${_scopeId}>ControlParameters.ConsentSchedule.SinglePayment (Required)</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-170fb85d${_scopeId2}><thead data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><th data-v-170fb85d${_scopeId2}>Field</th><th data-v-170fb85d${_scopeId2}>Type</th><th data-v-170fb85d${_scopeId2}>Description</th><th data-v-170fb85d${_scopeId2}>Example</th></tr></thead><tbody data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Type</code>*</td><td data-v-170fb85d${_scopeId2}>enum</td><td data-v-170fb85d${_scopeId2}>Must be <code data-v-170fb85d${_scopeId2}>SingleInstantPayment</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>SingleInstantPayment</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Amount.Amount</code>*</td><td data-v-170fb85d${_scopeId2}>string</td><td data-v-170fb85d${_scopeId2}>Payment amount (decimal, max 2 d.p.)</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>100.00</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Amount.Currency</code>*</td><td data-v-170fb85d${_scopeId2}>string</td><td data-v-170fb85d${_scopeId2}>ISO 4217 currency code</td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>AED</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "Type"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "SingleInstantPayment")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "SingleInstantPayment")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Amount.Amount"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Payment amount (decimal, max 2 d.p.)"),
                          createVNode("td", null, [
                            createVNode("code", null, "100.00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Amount.Currency"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "ISO 4217 currency code"),
                          createVNode("td", null, [
                            createVNode("code", null, "AED")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-170fb85d${_scopeId}>Example request</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleAuthDetails,
              lang: "json",
              filename: "authorization_details"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With the encrypted PII ready, construct the "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" of type "),
                  createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2"),
                  createTextVNode(". The encrypted PII is embedded as "),
                  createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "authorization_details"),
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
                          createVNode("code", null, "type"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "consent"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Consent properties agreed by the User with the TPP. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, "—")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "subscription")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Optional subscription to Event Notifications via Webhook. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, "—")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("consent (Required) | "),
                createVNode("code", null, "authorization_details.consent")
              ]),
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
                          createVNode("code", null, "ConsentId"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string (uuid)"),
                        createVNode("td", null, "Unique ID assigned by the TPP (1–128 chars)"),
                        createVNode("td", null, [
                          createVNode("code", null, "b8f42378-10ac-46a1-8d20-4e020484216d")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsSingleAuthorization"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether the payment requires only one authorizing party"),
                        createVNode("td", null, [
                          createVNode("code", null, "true")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "Consent expiry (ISO 8601 with timezone, max 1 year)"),
                        createVNode("td", null, [
                          createVNode("code", null, "2026-05-03T15:46:00+00:00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AuthorizationExpirationDateTime")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, [
                          createTextVNode("Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when "),
                          createVNode("code", null, "IsSingleAuthorization"),
                          createTextVNode(" is "),
                          createVNode("code", null, "false"),
                          createTextVNode("; SHOULD NOT be set when "),
                          createVNode("code", null, "IsSingleAuthorization"),
                          createTextVNode(" is "),
                          createVNode("code", null, "true"),
                          createTextVNode(". MUST NOT be after "),
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "2026-05-03T16:00:00+00:00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BaseConsentId")
                        ]),
                        createVNode("td", null, "string (uuid)"),
                        createVNode("td", null, "Used when amending or renewing an existing consent"),
                        createVNode("td", null, "—")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Permissions")
                        ]),
                        createVNode("td", null, "array<enum>"),
                        createVNode("td", null, "Optional access permissions granted alongside the payment consent"),
                        createVNode("td", null, [
                          createVNode("code", null, "ReadAccountsBasic"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadBalances")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ControlParameters"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Payment schedule and amount. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, "—")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PersonalIdentifiableInformation"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string (JWE)"),
                        createVNode("td", null, [
                          createTextVNode("Encrypted creditor and risk data — the "),
                          createVNode("code", null, "encryptedPII"),
                          createTextVNode(" string from Step 1")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "eyJhbGci...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentPurposeCode"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string (3 chars)"),
                        createVNode("td", null, "AANI payment purpose code"),
                        createVNode("td", null, [
                          createVNode("code", null, "ACM")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Reference shown on the debtor's statement"),
                        createVNode("td", null, [
                          createVNode("code", null, "Test Purchase")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Reference shown on the creditor's statement"),
                        createVNode("td", null, [
                          createVNode("code", null, "Test Purchase")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "ControlParameters.ConsentSchedule.SinglePayment (Required)"),
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
                          createVNode("code", null, "Type"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "SingleInstantPayment")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "SingleInstantPayment")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Amount.Amount"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Payment amount (decimal, max 2 d.p.)"),
                        createVNode("td", null, [
                          createVNode("code", null, "100.00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Amount.Currency"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "ISO 4217 currency code"),
                        createVNode("td", null, [
                          createVNode("code", null, "AED")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example request"),
              createVNode(_component_EdCode, {
                code: exampleAuthDetails,
                lang: "json",
                filename: "authorization_details"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-request-jwt",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "POST /par · Step 3 — Constructing the Request JWT",
        title: "Bind PKCE and authorization details into a signed JWT",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepRequestJwtScopeNote, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Store the code_verifier"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-170fb85d${_scopeId2}> Save <code data-v-170fb85d${_scopeId2}>codeVerifier</code> in your server-side session or an <code data-v-170fb85d${_scopeId2}>httpOnly</code> cookie — you will need it in <a href="#step-8-post-token-authorization-code" data-v-170fb85d${_scopeId2}>Step 8</a> to exchange the authorization code for tokens. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Save "),
                      createVNode("code", null, "codeVerifier"),
                      createTextVNode(" in your server-side session or an "),
                      createVNode("code", null, "httpOnly"),
                      createTextVNode(" cookie — you will need it in "),
                      createVNode("a", { href: "#step-8-post-token-authorization-code" }, "Step 8"),
                      createTextVNode(" to exchange the authorization code for tokens. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-170fb85d${_scopeId2}>Preparing the Request JWT</a> for the full JWT claim reference and PKCE helpers. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                    createTextVNode(" for the full JWT claim reference and PKCE helpers. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepRequestJwtScopeNote),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Store the code_verifier"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Save "),
                    createVNode("code", null, "codeVerifier"),
                    createTextVNode(" in your server-side session or an "),
                    createVNode("code", null, "httpOnly"),
                    createTextVNode(" cookie — you will need it in "),
                    createVNode("a", { href: "#step-8-post-token-authorization-code" }, "Step 8"),
                    createTextVNode(" to exchange the authorization code for tokens. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                  createTextVNode(" for the full JWT claim reference and PKCE helpers. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-client-assertion",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "POST /par · Step 4 — Creating a Client Assertion",
        title: "Prove the application's identity to the API Hub",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepClientAssertion, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepClientAssertion)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-5-par-request",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "POST /par · Step 5 — Sending the /par Request",
        title: "Push the request to the API Hub",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepParRequest, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepParRequest)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-6-authorization-url",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Redirecting the User · Step 6 — Building the Authorization URL",
        title: "Send the user to the LFI to authenticate",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-170fb85d${_scopeId2}>authorization_endpoint</code> is found in the LFI&#39;s <code data-v-170fb85d${_scopeId2}>.well-known/openid-configuration</code> — not constructed from the issuer URL directly. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(" is found in the LFI's "),
                    createVNode("code", null, ".well-known/openid-configuration"),
                    createTextVNode(" — not constructed from the issuer URL directly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ApiGuideStepRedirectCode, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "User Experience"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-170fb85d${_scopeId2}> See <a href="./user-journeys" data-v-170fb85d${_scopeId2}>User Experience</a> for screen mockups of the <strong data-v-170fb85d${_scopeId2}>Consent</strong> and <strong data-v-170fb85d${_scopeId2}>Authorization</strong> pages the user sees at the bank, including an interactive form where you can edit the consent JSON and PII and preview the resulting UI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "./user-journeys" }, "User Experience"),
                      createTextVNode(" for screen mockups of the "),
                      createVNode("strong", null, "Consent"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Authorization"),
                      createTextVNode(" pages the user sees at the bank, including an interactive form where you can edit the consent JSON and PII and preview the resulting UI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`After redirecting, the user will:`);
                } else {
                  return [
                    createTextVNode("After redirecting, the user will:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-170fb85d${_scopeId2}>Authenticate with their bank.</li><li data-v-170fb85d${_scopeId2}>Review the payment details — amount, recipient, and purpose — on the bank&#39;s authorization screen.</li><li data-v-170fb85d${_scopeId2}>Approve or decline.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Authenticate with their bank."),
                    createVNode("li", null, "Review the payment details — amount, recipient, and purpose — on the bank's authorization screen."),
                    createVNode("li", null, "Approve or decline.")
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
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(" is found in the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" — not constructed from the issuer URL directly. ")
                ]),
                _: 1
              }),
              createVNode(_component_ApiGuideStepRedirectCode),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "User Experience"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" See "),
                    createVNode("a", { href: "./user-journeys" }, "User Experience"),
                    createTextVNode(" for screen mockups of the "),
                    createVNode("strong", null, "Consent"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Authorization"),
                    createTextVNode(" pages the user sees at the bank, including an interactive form where you can edit the consent JSON and PII and preview the resulting UI. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("After redirecting, the user will:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Authenticate with their bank."),
                  createVNode("li", null, "Review the payment details — amount, recipient, and purpose — on the bank's authorization screen."),
                  createVNode("li", null, "Approve or decline.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-7-callback",
        num: "09",
        color: "var(--at-navy)",
        eyebrow: "Handling the Callback · Step 7 — Extracting the Authorization Code",
        title: "Validate state and issuer on the redirect",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepCallback, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepCallback)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-8-post-token-authorization-code",
        num: "10",
        color: "var(--at-teal-deep)",
        eyebrow: "Exchanging the Code for Tokens · Step 8 — POST /token (Authorization Code)",
        title: "Swap the auth code for an access and refresh token",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-170fb85d${_scopeId}><span class="http-badge http-post" data-v-170fb85d${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-170fb85d${_scopeId}>/token</code></div>`);
            _push2(ssrRenderComponent(_component_ApiGuideStepTokenExchange, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/token")
              ]),
              createVNode(_component_ApiGuideStepTokenExchange)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-9-encrypt-pii-payment",
        num: "11",
        color: "var(--at-teal)",
        eyebrow: "Creating the Payment · Step 9 — Encrypt PII for Payment Initiation",
        title: "Re-encrypt the creditor PII for the payment request",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before constructing the payment request, you must encrypt a fresh PII token specifically for the payment. This follows the <strong data-v-170fb85d${_scopeId2}>Domestic Payment PII Schema Object</strong> (<code data-v-170fb85d${_scopeId2}>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code>) — the same JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the <code data-v-170fb85d${_scopeId2}>/par</code> consent. `);
                } else {
                  return [
                    createTextVNode(" Before constructing the payment request, you must encrypt a fresh PII token specifically for the payment. This follows the "),
                    createVNode("strong", null, "Domestic Payment PII Schema Object"),
                    createTextVNode(" ("),
                    createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                    createTextVNode(") — the same JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Creditor must exactly match the consent PII"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-170fb85d${_scopeId2}> The <code data-v-170fb85d${_scopeId2}>Creditor</code> object inside the payment PII — including <code data-v-170fb85d${_scopeId2}>CreditorAccount.SchemeName</code>, <code data-v-170fb85d${_scopeId2}>CreditorAccount.Identification</code>, <code data-v-170fb85d${_scopeId2}>CreditorAccount.Name</code>, and any <code data-v-170fb85d${_scopeId2}>Creditor.Name</code> or <code data-v-170fb85d${_scopeId2}>CreditorAgent</code> fields — <strong data-v-170fb85d${_scopeId2}>must be byte-for-byte identical</strong> to the Creditor you encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any discrepancy can result in rejection. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "Creditor"),
                      createTextVNode(" object inside the payment PII — including "),
                      createVNode("code", null, "CreditorAccount.SchemeName"),
                      createTextVNode(", "),
                      createVNode("code", null, "CreditorAccount.Identification"),
                      createTextVNode(", "),
                      createVNode("code", null, "CreditorAccount.Name"),
                      createTextVNode(", and any "),
                      createVNode("code", null, "Creditor.Name"),
                      createTextVNode(" or "),
                      createVNode("code", null, "CreditorAgent"),
                      createTextVNode(" fields — "),
                      createVNode("strong", null, "must be byte-for-byte identical"),
                      createTextVNode(" to the Creditor you encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any discrepancy can result in rejection. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Build the PII object according to the schema, then encrypt it using the same <code data-v-170fb85d${_scopeId2}>encryptPII</code> helper from Step 1: `);
                } else {
                  return [
                    createTextVNode(" Build the PII object according to the schema, then encrypt it using the same "),
                    createVNode("code", null, "encryptPII"),
                    createTextVNode(" helper from Step 1: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step9Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/" data-v-170fb85d${_scopeId2}>Personal Identifiable Information</a> for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                    createTextVNode(" for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-170fb85d${_scopeId2}>Message Encryption</a> for details on fetching the LFI&#39;s JWKS and selecting the correct encryption key. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(" for details on fetching the LFI's JWKS and selecting the correct encryption key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before constructing the payment request, you must encrypt a fresh PII token specifically for the payment. This follows the "),
                  createVNode("strong", null, "Domestic Payment PII Schema Object"),
                  createTextVNode(" ("),
                  createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                  createTextVNode(") — the same JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Creditor must exactly match the consent PII"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" object inside the payment PII — including "),
                    createVNode("code", null, "CreditorAccount.SchemeName"),
                    createTextVNode(", "),
                    createVNode("code", null, "CreditorAccount.Identification"),
                    createTextVNode(", "),
                    createVNode("code", null, "CreditorAccount.Name"),
                    createTextVNode(", and any "),
                    createVNode("code", null, "Creditor.Name"),
                    createTextVNode(" or "),
                    createVNode("code", null, "CreditorAgent"),
                    createTextVNode(" fields — "),
                    createVNode("strong", null, "must be byte-for-byte identical"),
                    createTextVNode(" to the Creditor you encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any discrepancy can result in rejection. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Build the PII object according to the schema, then encrypt it using the same "),
                  createVNode("code", null, "encryptPII"),
                  createTextVNode(" helper from Step 1: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step9Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                  createTextVNode(" for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(" for details on fetching the LFI's JWKS and selecting the correct encryption key. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-10-submit-payment",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Creating the Payment · Step 10 — Sign and Submit the Payment Request",
        title: "POST /payments — signed JWT submission",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-170fb85d${_scopeId}><span class="http-badge http-post" data-v-170fb85d${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-170fb85d${_scopeId}>/payments</code></div>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Submit the payment without undue delay"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-170fb85d${_scopeId2}> For a <code data-v-170fb85d${_scopeId2}>SingleInstantPayment</code>, the TPP MUST submit <code data-v-170fb85d${_scopeId2}>POST /payments</code> without undue delay after completing the token exchange in <a href="#step-8-post-token-authorization-code" data-v-170fb85d${_scopeId2}>Step 8</a>. Although the access token is valid for 10 minutes, the User has just authorized the payment at the LFI and is waiting for the TPP to confirm the outcome — avoidable delay creates uncertainty about whether the payment has been initiated and degrades the User experience. </p><p data-v-170fb85d${_scopeId2}> Where practicable, prepare work that can be done before the callback (PII encryption, JWT signing key loading) in advance so the call to <code data-v-170fb85d${_scopeId2}>POST /payments</code> can fire as soon as the access token is returned. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" For a "),
                      createVNode("code", null, "SingleInstantPayment"),
                      createTextVNode(", the TPP MUST submit "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" without undue delay after completing the token exchange in "),
                      createVNode("a", { href: "#step-8-post-token-authorization-code" }, "Step 8"),
                      createTextVNode(". Although the access token is valid for 10 minutes, the User has just authorized the payment at the LFI and is waiting for the TPP to confirm the outcome — avoidable delay creates uncertainty about whether the payment has been initiated and degrades the User experience. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Where practicable, prepare work that can be done before the callback (PII encryption, JWT signing key loading) in advance so the call to "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" can fire as soon as the access token is returned. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-170fb85d${_scopeId2}>x-fapi-interaction-id</code> and <code data-v-170fb85d${_scopeId2}>x-idempotency-key</code>. As the customer is present at this point in the flow, also send <code data-v-170fb85d${_scopeId2}>x-fapi-customer-ip-address</code>, <code data-v-170fb85d${_scopeId2}>x-customer-user-agent</code> and <code data-v-170fb85d${_scopeId2}>x-fapi-auth-date</code> if the customer has been authenticated. See <a href="/tech/tpp-standards/security/request-headers" data-v-170fb85d${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(". As the customer is present at this point in the flow, also send "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-customer-user-agent"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(" if the customer has been authenticated. See "),
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
                  _push3(` The POST /payments body is sent as <code data-v-170fb85d${_scopeId2}>Content-Type: application/jwt</code> — the payment payload is wrapped in a signed JWT (<code data-v-170fb85d${_scopeId2}>AEPaymentRequestSigned</code>) using your private signing key. The LFI verifies the signature before processing the payment. `);
                } else {
                  return [
                    createTextVNode(" The POST /payments body is sent as "),
                    createVNode("code", null, "Content-Type: application/jwt"),
                    createTextVNode(" — the payment payload is wrapped in a signed JWT ("),
                    createVNode("code", null, "AEPaymentRequestSigned"),
                    createTextVNode(") using your private signing key. The LFI verifies the signature before processing the payment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every field in the request <strong data-v-170fb85d${_scopeId2}>must exactly match</strong> the corresponding value from the authorized consent: `);
                } else {
                  return [
                    createTextVNode(" Every field in the request "),
                    createVNode("strong", null, "must exactly match"),
                    createTextVNode(" the corresponding value from the authorized consent: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-170fb85d${_scopeId2}><thead data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><th data-v-170fb85d${_scopeId2}>Field</th><th data-v-170fb85d${_scopeId2}>Must match</th></tr></thead><tbody data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ConsentId</code></td><td data-v-170fb85d${_scopeId2}>The <code data-v-170fb85d${_scopeId2}>ConsentId</code> from the authorized consent</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Instruction.Amount.Amount</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Instruction.Amount.Currency</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PaymentPurposeCode</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.PaymentPurposeCode</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>OpenFinanceBilling</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.OpenFinanceBilling</code> (including <code data-v-170fb85d${_scopeId2}>Type</code> and, if present, <code data-v-170fb85d${_scopeId2}>MerchantId</code>)</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>DebtorReference</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.DebtorReference</code></td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>CreditorReference</code></td><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>consent.CreditorReference</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Must match")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConsentId")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "ConsentId"),
                            createTextVNode(" from the authorized consent")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount.Amount")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount.Currency")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentPurposeCode")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.PaymentPurposeCode")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OpenFinanceBilling")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.OpenFinanceBilling"),
                            createTextVNode(" (including "),
                            createVNode("code", null, "Type"),
                            createTextVNode(" and, if present, "),
                            createVNode("code", null, "MerchantId"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorReference")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.DebtorReference")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorReference")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "consent.CreditorReference")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step10Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Consent replay validation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-170fb85d${_scopeId2}> The payment request is validated at two points. The API Hub checks that <code data-v-170fb85d${_scopeId2}>ConsentId</code>, <code data-v-170fb85d${_scopeId2}>Instruction.Amount</code>, <code data-v-170fb85d${_scopeId2}>PaymentPurposeCode</code>, <code data-v-170fb85d${_scopeId2}>DebtorReference</code>, <code data-v-170fb85d${_scopeId2}>CreditorReference</code>, and <code data-v-170fb85d${_scopeId2}>OpenFinanceBilling</code> exactly match the authorized consent — a mismatch returns <code data-v-170fb85d${_scopeId2}>400</code> before the request reaches the LFI. The LFI then decrypts the payment PII and verifies that all creditor fields match the PII from the consent. Either validation failure results in rejection. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The payment request is validated at two points. The API Hub checks that "),
                      createVNode("code", null, "ConsentId"),
                      createTextVNode(", "),
                      createVNode("code", null, "Instruction.Amount"),
                      createTextVNode(", "),
                      createVNode("code", null, "PaymentPurposeCode"),
                      createTextVNode(", "),
                      createVNode("code", null, "DebtorReference"),
                      createTextVNode(", "),
                      createVNode("code", null, "CreditorReference"),
                      createTextVNode(", and "),
                      createVNode("code", null, "OpenFinanceBilling"),
                      createTextVNode(" exactly match the authorized consent — a mismatch returns "),
                      createVNode("code", null, "400"),
                      createTextVNode(" before the request reaches the LFI. The LFI then decrypts the payment PII and verifies that all creditor fields match the PII from the consent. Either validation failure results in rejection. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-170fb85d${_scopeId}>A successful POST /payments</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A <code data-v-170fb85d${_scopeId2}>201 Created</code> response is returned as a signed JWT (<code data-v-170fb85d${_scopeId2}>application/jwt</code>). The verified JWT body is a <code data-v-170fb85d${_scopeId2}>message</code> envelope wrapping <code data-v-170fb85d${_scopeId2}>Data</code> and <code data-v-170fb85d${_scopeId2}>Links</code> per <code data-v-170fb85d${_scopeId2}>AEPaymentIdResponseSigned</code>. `);
                } else {
                  return [
                    createTextVNode(" A "),
                    createVNode("code", null, "201 Created"),
                    createTextVNode(" response is returned as a signed JWT ("),
                    createVNode("code", null, "application/jwt"),
                    createTextVNode("). The verified JWT body is a "),
                    createVNode("code", null, "message"),
                    createTextVNode(" envelope wrapping "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" per "),
                    createVNode("code", null, "AEPaymentIdResponseSigned"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-170fb85d${_scopeId}>Response body — <code data-v-170fb85d${_scopeId}>Data</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-170fb85d${_scopeId2}><thead data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><th data-v-170fb85d${_scopeId2}>Field</th><th data-v-170fb85d${_scopeId2}>Required</th><th data-v-170fb85d${_scopeId2}>Description</th></tr></thead><tbody data-v-170fb85d${_scopeId2}><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PaymentId</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>LFI-assigned unique identifier for this payment resource (use this to poll for status)</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>ConsentId</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>The consent this payment is bound to</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Status</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>Current payment status — see status lifecycle below</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>StatusUpdateDateTime</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>ISO 8601 datetime of the last status change</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>CreationDateTime</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>ISO 8601 datetime when the payment resource was created</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>Instruction.Amount</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>Echoes back the amount and currency from the request</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PaymentPurposeCode</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>Echoes back the payment purpose code</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>OpenFinanceBilling</code></td><td data-v-170fb85d${_scopeId2}>Yes</td><td data-v-170fb85d${_scopeId2}>Echoes back the billing parameters</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>PaymentTransactionId</code></td><td data-v-170fb85d${_scopeId2}>No</td><td data-v-170fb85d${_scopeId2}>End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at <code data-v-170fb85d${_scopeId2}>Pending</code>.</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>DebtorReference</code></td><td data-v-170fb85d${_scopeId2}>No</td><td data-v-170fb85d${_scopeId2}>Echoes back the debtor reference if provided</td></tr><tr data-v-170fb85d${_scopeId2}><td data-v-170fb85d${_scopeId2}><code data-v-170fb85d${_scopeId2}>RejectReasonCode</code></td><td data-v-170fb85d${_scopeId2}>No</td><td data-v-170fb85d${_scopeId2}>Array of <code data-v-170fb85d${_scopeId2}>{ Code, Message }</code> objects — present only when <code data-v-170fb85d${_scopeId2}>Status</code> is <code data-v-170fb85d${_scopeId2}>Rejected</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "LFI-assigned unique identifier for this payment resource (use this to poll for status)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConsentId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The consent this payment is bound to")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Status")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Current payment status — see status lifecycle below")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "StatusUpdateDateTime")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "ISO 8601 datetime of the last status change")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreationDateTime")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "ISO 8601 datetime when the payment resource was created")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Echoes back the amount and currency from the request")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentPurposeCode")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Echoes back the payment purpose code")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OpenFinanceBilling")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Echoes back the billing parameters")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentTransactionId")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at "),
                            createVNode("code", null, "Pending"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorReference")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Echoes back the debtor reference if provided")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "RejectReasonCode")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Array of "),
                            createVNode("code", null, "{ Code, Message }"),
                            createTextVNode(" objects — present only when "),
                            createVNode("code", null, "Status"),
                            createTextVNode(" is "),
                            createVNode("code", null, "Rejected")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: successResponseJson,
              lang: "json",
              filename: "201 Created — decoded JWT body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments" data-v-170fb85d${_scopeId2}>POST /payments</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments" }, "POST /payments"),
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
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payments")
              ]),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Submit the payment without undue delay"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" For a "),
                    createVNode("code", null, "SingleInstantPayment"),
                    createTextVNode(", the TPP MUST submit "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" without undue delay after completing the token exchange in "),
                    createVNode("a", { href: "#step-8-post-token-authorization-code" }, "Step 8"),
                    createTextVNode(". Although the access token is valid for 10 minutes, the User has just authorized the payment at the LFI and is waiting for the TPP to confirm the outcome — avoidable delay creates uncertainty about whether the payment has been initiated and degrades the User experience. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" Where practicable, prepare work that can be done before the callback (PII encryption, JWT signing key loading) in advance so the call to "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" can fire as soon as the access token is returned. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x-idempotency-key"),
                  createTextVNode(". As the customer is present at this point in the flow, also send "),
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(", "),
                  createVNode("code", null, "x-customer-user-agent"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x-fapi-auth-date"),
                  createTextVNode(" if the customer has been authenticated. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The POST /payments body is sent as "),
                  createVNode("code", null, "Content-Type: application/jwt"),
                  createTextVNode(" — the payment payload is wrapped in a signed JWT ("),
                  createVNode("code", null, "AEPaymentRequestSigned"),
                  createTextVNode(") using your private signing key. The LFI verifies the signature before processing the payment. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every field in the request "),
                  createVNode("strong", null, "must exactly match"),
                  createTextVNode(" the corresponding value from the authorized consent: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Must match")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConsentId")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "ConsentId"),
                          createTextVNode(" from the authorized consent")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount.Amount")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount.Currency")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentPurposeCode")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.PaymentPurposeCode")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OpenFinanceBilling")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.OpenFinanceBilling"),
                          createTextVNode(" (including "),
                          createVNode("code", null, "Type"),
                          createTextVNode(" and, if present, "),
                          createVNode("code", null, "MerchantId"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorReference")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.DebtorReference")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorReference")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "consent.CreditorReference")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step10Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Consent replay validation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The payment request is validated at two points. The API Hub checks that "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(", "),
                    createVNode("code", null, "Instruction.Amount"),
                    createTextVNode(", "),
                    createVNode("code", null, "PaymentPurposeCode"),
                    createTextVNode(", "),
                    createVNode("code", null, "DebtorReference"),
                    createTextVNode(", "),
                    createVNode("code", null, "CreditorReference"),
                    createTextVNode(", and "),
                    createVNode("code", null, "OpenFinanceBilling"),
                    createTextVNode(" exactly match the authorized consent — a mismatch returns "),
                    createVNode("code", null, "400"),
                    createTextVNode(" before the request reaches the LFI. The LFI then decrypts the payment PII and verifies that all creditor fields match the PII from the consent. Either validation failure results in rejection. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "A successful POST /payments"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A "),
                  createVNode("code", null, "201 Created"),
                  createTextVNode(" response is returned as a signed JWT ("),
                  createVNode("code", null, "application/jwt"),
                  createTextVNode("). The verified JWT body is a "),
                  createVNode("code", null, "message"),
                  createTextVNode(" envelope wrapping "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" per "),
                  createVNode("code", null, "AEPaymentIdResponseSigned"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createTextVNode("Response body — "),
                createVNode("code", null, "Data")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "LFI-assigned unique identifier for this payment resource (use this to poll for status)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConsentId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The consent this payment is bound to")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Status")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Current payment status — see status lifecycle below")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "StatusUpdateDateTime")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "ISO 8601 datetime of the last status change")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreationDateTime")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "ISO 8601 datetime when the payment resource was created")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Echoes back the amount and currency from the request")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentPurposeCode")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Echoes back the payment purpose code")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OpenFinanceBilling")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Echoes back the billing parameters")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentTransactionId")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at "),
                          createVNode("code", null, "Pending"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorReference")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Echoes back the debtor reference if provided")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "RejectReasonCode")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Array of "),
                          createVNode("code", null, "{ Code, Message }"),
                          createTextVNode(" objects — present only when "),
                          createVNode("code", null, "Status"),
                          createTextVNode(" is "),
                          createVNode("code", null, "Rejected")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: successResponseJson,
                lang: "json",
                filename: "201 Created — decoded JWT body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments" }, "POST /payments"),
                  createTextVNode(" API reference for the full request and response schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-170fb85d"]]);
export {
  apiGuide as default
};
