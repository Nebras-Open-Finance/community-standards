import { _ as _sfc_main$8, a as __unplugin_components_18 } from "./ApiGuideStepTokenRefresh-BLZ3qAft.js";
import { _ as __unplugin_components_5$1, a as _sfc_main$7 } from "./ApiGuideStepEncryptPiiVariable-Bx0fewUJ.js";
import { _ as __unplugin_components_8$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5, e as _sfc_main$6 } from "./ApiGuideStepRequestJwtScopeNote-CrOzrs1j.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsOnDemand-Ciqgw0dj.js";
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
      "ExpirationDateTime": "2027-03-02T00:00:00+00:00",

      // Multi-authorization only: deadline for all authorizers to act.
      // SHOULD NOT be set when IsSingleAuthorization is true.
      // "AuthorizationExpirationDateTime": "2026-03-03T10:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "MultiPayment": {
            // Optional consent-lifetime cumulative caps:
            // "MaximumCumulativeValueOfPayments": { "Amount": "10000.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 50,

            "PeriodicSchedule": {
              "Type": "VariableOnDemand",
              "PeriodType": "Month",
              "PeriodStartDate": "2027-01-01",
              "Controls": {
                // At least ONE of the following three must be provided:
                "MaximumIndividualAmount": { "Amount": "500.00", "Currency": "AED" }
                // Optional per-period caps:
                // "MaximumCumulativeValueOfPaymentsPerPeriod": { "Amount": "2000.00", "Currency": "AED" },
                // "MaximumCumulativeNumberOfPaymentsPerPeriod": 5
              }
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Subscription",
      "CreditorReference": "Subscription"
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
      ExpirationDateTime: new Date(Date.now() + 364 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
      ControlParameters: {
        ConsentSchedule: {
          MultiPayment: {
            PeriodicSchedule: {
              Type: 'VariableOnDemand',
              PeriodType: 'Month',
              PeriodStartDate: '2027-01-01',
              Controls: {
                MaximumIndividualAmount: { Amount: '500.00', Currency: 'AED' },
                // MaximumCumulativeValueOfPaymentsPerPeriod: { Amount: '2000.00', Currency: 'AED' },
                // MaximumCumulativeNumberOfPaymentsPerPeriod: 5,
              },
            },
            // MaximumCumulativeValueOfPayments: { Amount: '10000.00', Currency: 'AED' },
            // MaximumCumulativeNumberOfPayments: 50,
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Subscription',
      CreditorReference: 'Subscription',
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
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(days=364)).isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances"],
            "ControlParameters": {
                "ConsentSchedule": {
                    "MultiPayment": {
                        "PeriodicSchedule": {
                            "Type": "VariableOnDemand",
                            "PeriodType": "Month",
                            "PeriodStartDate": "2027-01-01",
                            "Controls": {
                                "MaximumIndividualAmount": {"Amount": "500.00", "Currency": "AED"},
                                # "MaximumCumulativeValueOfPaymentsPerPeriod": {"Amount": "2000.00", "Currency": "AED"},
                                # "MaximumCumulativeNumberOfPaymentsPerPeriod": 5,
                            },
                        },
                        # "MaximumCumulativeValueOfPayments": {"Amount": "10000.00", "Currency": "AED"},
                        # "MaximumCumulativeNumberOfPayments": 50,
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Subscription",
            "CreditorReference": "Subscription",
        },
    }
]

request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`;
const step9Node = `import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateVariablePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // must satisfy the control parameters on the consent
  paymentEncryptedPII: string,  // from the PII step above
  idempotencyKey: string,
) {
  // Wrapped in \`message\` per AEPaymentRequestSigned
  const paymentPayload = {
    message: {
      Data: {
        ConsentId: consentId,                    // must match the authorized consent
        Instruction: {
          Amount: {
            Amount:   amount,                  // must be within consent parameters
            Currency: 'AED',
          },
        },
        PersonalIdentifiableInformation: paymentEncryptedPII,
        PaymentPurposeCode: 'ACM',
        DebtorReference:    'Subscription',
        CreditorReference:  'Subscription',
        OpenFinanceBilling: {
          Type: 'PushP2P',
        },
      },
    },
  }

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
      Authorization:                \`Bearer \${accessToken}\`,
      'Content-Type':               'application/jwt',
      'x-idempotency-key':          idempotencyKey,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    body: signedPayment,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  const { Data: { PaymentId, Status } } = await paymentResponse.json()
  return { PaymentId, Status }
}

// First payment
const { PaymentId: pay1 } = await initiateVariablePayment(access_token, consentId, '149.99', paymentEncryptedPII, crypto.randomUUID())

// Second payment (days/weeks later using a refreshed access token)
const { PaymentId: pay2 } = await initiateVariablePayment(refreshedToken, consentId, '89.00', paymentEncryptedPII, crypto.randomUUID())
`;
const step9Python = `import time
from jose import jwt as jose_jwt

def initiate_variable_payment(
    access_token: str,
    consent_id: str,
    amount: str,          # must satisfy the control parameters on the consent
    payment_encrypted_pii: str,  # from the PII step above
    idempotency_key: str,
) -> dict:
    # Wrapped in \`message\` per AEPaymentRequestSigned
    payment_payload = {
        "message": {
            "Data": {
                "ConsentId":   consent_id,               # must match the authorized consent
                "Instruction": {
                    "Amount": {
                        "Amount":   amount,            # must be within consent parameters
                        "Currency": "AED",
                    }
                },
                "PersonalIdentifiableInformation": payment_encrypted_pii,
                "PaymentPurposeCode": "ACM",
                "DebtorReference":    "Subscription",
                "CreditorReference":  "Subscription",
                "OpenFinanceBilling": {
                    "Type": "PushP2P",
                },
            }
        }
    }

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

    response = httpx.post(
        f"{LFI_API_BASE}/open-finance/payment/v2.2/payments",
        headers={
            "Authorization":               f"Bearer {access_token}",
            "Content-Type":                "application/jwt",
            "x-idempotency-key":           idempotency_key,
            "x-fapi-interaction-id":       str(uuid.uuid4()),
            "x-fapi-auth-date":            last_customer_auth_date,
            "x-fapi-customer-ip-address":  customer_ip_address,
        },
        content=signed_payment,
        # cert=("transport.crt", "transport.key"),
    )
    data = response.json()["Data"]
    return {"payment_id": data["PaymentId"], "status": data["Status"]}


# First payment
pay1 = initiate_variable_payment(access_token, consent_id, "149.99", payment_encrypted_pii, str(uuid.uuid4()))

# Second payment (days/weeks later using a refreshed access token)
pay2 = initiate_variable_payment(refreshed_token, consent_id, "89.00", payment_encrypted_pii, str(uuid.uuid4()))
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const step3Tabs = [{ label: "Node.js", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const step9Tabs = [{ label: "Node.js", lang: "typescript", code: step9Node }, { label: "Python", lang: "python", code: step9Python }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsOnDemand = _sfc_main$1;
      const _component_ApiGuideStepEncryptPiiVariable = __unplugin_components_5$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_ApiGuideStepRequestJwtScopeNote = __unplugin_components_8$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_ApiGuideStepClientAssertion = _sfc_main$2;
      const _component_ApiGuideStepParRequest = _sfc_main$3;
      const _component_ApiGuideStepRedirectCode = _sfc_main$4;
      const _component_ApiGuideStepCallback = _sfc_main$5;
      const _component_ApiGuideStepTokenExchange = _sfc_main$6;
      const _component_ApiGuideStepPaymentEncryptPiiVariable = _sfc_main$7;
      const _component_ApiGuideStepTokenRefresh = _sfc_main$8;
      const _component_ApiGuideStepPaymentResponse = __unplugin_components_18;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-93091a78><section class="ed-doc__hero" data-v-93091a78><div class="ed-doc__inner" data-v-93091a78><div class="ed-doc__eyebrow" data-v-93091a78><span class="ed-doc__eyebrow-dash" data-v-93091a78></span> TPP · Banking · Service Initiation · Variable On-Demand </div><h1 class="ed-doc__title" data-v-93091a78> Variable On-Demand — API Guide <span class="ed-doc__read" data-v-93091a78>5 min read</span></h1><p class="ed-doc__lede" data-v-93091a78> A Variable On-Demand consent authorises a TPP to initiate <strong data-v-93091a78>multiple payments</strong> at variable amounts over the lifetime of the consent. The user authorises once — setting a ceiling on individual payments and optional period-based limits — and the TPP can then submit individual payments on-demand without requiring re-authorisation for each one. </p><p class="ed-doc__lede" data-v-93091a78> Common use cases include subscription billing with variable charges, metered service payments, and TPP-managed savings top-ups. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before initiating a Variable On-Demand payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before initiating a Variable On-Demand payment, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before initiating a Variable On-Demand payment, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-93091a78${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-93091a78${_scopeId2}>BSIP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-93091a78${_scopeId2}>Roles</a>. </li><li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-93091a78${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-93091a78${_scopeId2}>mTLS communication</strong>. </li><li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-93091a78${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. </li><li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide" data-v-93091a78${_scopeId2}>API Hub (Authorisation Server)</a></strong> — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. </li><li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Understanding of the <a href="/tech/tpp-standards/security/fapi/" data-v-93091a78${_scopeId2}>FAPI Security Profile</a></strong> and <strong data-v-93091a78${_scopeId2}><a href="/tech/tpp-standards/security/tokens/" data-v-93091a78${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. </li><li data-v-93091a78${_scopeId2}><strong data-v-93091a78${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-93091a78${_scopeId2}>Message Encryption</a></strong> — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI&#39;s public encryption key from their JWKS. </li>`);
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
                  createTextVNode("Before initiating a Variable On-Demand payment, ensure the following requirements are met:")
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
        title: "End-to-end Variable On-Demand",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Variable On-Demand API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsOnDemand, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsOnDemand)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Variable On-Demand API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsOnDemand)
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
            _push2(`<div class="ed-doc__endpoint" data-v-93091a78${_scopeId}><span class="http-badge http-post" data-v-93091a78${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-93091a78${_scopeId}>/par</code></div>`);
            _push2(ssrRenderComponent(_component_ApiGuideStepEncryptPiiVariable, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/par")
              ]),
              createVNode(_component_ApiGuideStepEncryptPiiVariable)
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
                  _push3(` With the encrypted PII ready, construct the <code data-v-93091a78${_scopeId2}>authorization_details</code> of type <code data-v-93091a78${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code>. The critical difference from Single Instant Payment is that <code data-v-93091a78${_scopeId2}>ControlParameters</code> uses <code data-v-93091a78${_scopeId2}>MultiPayment</code> with <code data-v-93091a78${_scopeId2}>Type: &quot;VariableOnDemand&quot;</code> — no fixed amount is set at consent time. Instead, limits are defined via cumulative caps and periodic controls. `);
                } else {
                  return [
                    createTextVNode(" With the encrypted PII ready, construct the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" of type "),
                    createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2"),
                    createTextVNode(". The critical difference from Single Instant Payment is that "),
                    createVNode("code", null, "ControlParameters"),
                    createTextVNode(" uses "),
                    createVNode("code", null, "MultiPayment"),
                    createTextVNode(" with "),
                    createVNode("code", null, 'Type: "VariableOnDemand"'),
                    createTextVNode(" — no fixed amount is set at consent time. Instead, limits are defined via cumulative caps and periodic controls. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-93091a78${_scopeId}>authorization_details</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-93091a78${_scopeId2}><thead data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><th data-v-93091a78${_scopeId2}>Field</th><th data-v-93091a78${_scopeId2}>Type</th><th data-v-93091a78${_scopeId2}>Description</th><th data-v-93091a78${_scopeId2}>Example</th></tr></thead><tbody data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>type</code>*</td><td data-v-93091a78${_scopeId2}>enum</td><td data-v-93091a78${_scopeId2}>Must be <code data-v-93091a78${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>consent</code>*</td><td data-v-93091a78${_scopeId2}>object</td><td data-v-93091a78${_scopeId2}>Consent properties agreed by the User with the TPP. <em data-v-93091a78${_scopeId2}>Described below.</em></td><td data-v-93091a78${_scopeId2}>—</td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>subscription</code></td><td data-v-93091a78${_scopeId2}>object</td><td data-v-93091a78${_scopeId2}>Optional subscription to Event Notifications via Webhook. <em data-v-93091a78${_scopeId2}>Described below.</em></td><td data-v-93091a78${_scopeId2}>—</td></tr></tbody></table>`);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-93091a78${_scopeId}>consent (Required) | <code data-v-93091a78${_scopeId}>authorization_details.consent</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-93091a78${_scopeId2}><thead data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><th data-v-93091a78${_scopeId2}>Field</th><th data-v-93091a78${_scopeId2}>Type</th><th data-v-93091a78${_scopeId2}>Description</th><th data-v-93091a78${_scopeId2}>Example</th></tr></thead><tbody data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>ConsentId</code>*</td><td data-v-93091a78${_scopeId2}>string (uuid)</td><td data-v-93091a78${_scopeId2}>Unique ID assigned by the TPP (1–128 chars)</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>b8f42378-10ac-46a1-8d20-4e020484216d</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>IsSingleAuthorization</code>*</td><td data-v-93091a78${_scopeId2}>boolean</td><td data-v-93091a78${_scopeId2}>Whether the payment requires only one authorizing party</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>true</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>ExpirationDateTime</code>*</td><td data-v-93091a78${_scopeId2}>date-time</td><td data-v-93091a78${_scopeId2}>Consent expiry (ISO 8601 with timezone, max 1 year)</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>2027-03-02T00:00:00+00:00</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>AuthorizationExpirationDateTime</code></td><td data-v-93091a78${_scopeId2}>date-time</td><td data-v-93091a78${_scopeId2}>Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when <code data-v-93091a78${_scopeId2}>IsSingleAuthorization</code> is <code data-v-93091a78${_scopeId2}>false</code>; SHOULD NOT be set when <code data-v-93091a78${_scopeId2}>IsSingleAuthorization</code> is <code data-v-93091a78${_scopeId2}>true</code>. MUST NOT be after <code data-v-93091a78${_scopeId2}>ExpirationDateTime</code>.</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>2026-03-03T10:00:00+00:00</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>BaseConsentId</code></td><td data-v-93091a78${_scopeId2}>string (uuid)</td><td data-v-93091a78${_scopeId2}>Links to prior consent if renewing — see <a href="/knowledge-base/articles/base-consent-id" data-v-93091a78${_scopeId2}>Base Consent ID</a></td><td data-v-93091a78${_scopeId2}>—</td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>Permissions</code></td><td data-v-93091a78${_scopeId2}>array&lt;enum&gt;</td><td data-v-93091a78${_scopeId2}>Optional access permissions granted alongside the payment consent</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>ReadAccountsBasic</code>, <code data-v-93091a78${_scopeId2}>ReadBalances</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>ControlParameters</code>*</td><td data-v-93091a78${_scopeId2}>object</td><td data-v-93091a78${_scopeId2}>Payment controls — <strong data-v-93091a78${_scopeId2}>see below</strong></td><td data-v-93091a78${_scopeId2}>—</td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PersonalIdentifiableInformation</code>*</td><td data-v-93091a78${_scopeId2}>string (JWE)</td><td data-v-93091a78${_scopeId2}>Encrypted creditor and risk data — the <code data-v-93091a78${_scopeId2}>encryptedPII</code> string from Step 1</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>eyJhbGci...</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PaymentPurposeCode</code>*</td><td data-v-93091a78${_scopeId2}>string (3 chars)</td><td data-v-93091a78${_scopeId2}>AANI payment purpose code</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>ACM</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>DebtorReference</code></td><td data-v-93091a78${_scopeId2}>string</td><td data-v-93091a78${_scopeId2}>Reference shown on the debtor&#39;s statement</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>Subscription</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>CreditorReference</code></td><td data-v-93091a78${_scopeId2}>string</td><td data-v-93091a78${_scopeId2}>Reference shown on the creditor&#39;s statement</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>Subscription</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "2027-03-02T00:00:00+00:00")
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
                            createVNode("code", null, "2026-03-03T10:00:00+00:00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BaseConsentId")
                          ]),
                          createVNode("td", null, "string (uuid)"),
                          createVNode("td", null, [
                            createTextVNode("Links to prior consent if renewing — see "),
                            createVNode("a", { href: "/knowledge-base/articles/base-consent-id" }, "Base Consent ID")
                          ]),
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
                            createTextVNode("Payment controls — "),
                            createVNode("strong", null, "see below")
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
                            createVNode("code", null, "Subscription")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Reference shown on the creditor's statement"),
                          createVNode("td", null, [
                            createVNode("code", null, "Subscription")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-93091a78${_scopeId}>ControlParameters — Variable On-Demand</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-93091a78${_scopeId2}>ControlParameters.ConsentSchedule.MultiPayment</code> carries the control definition. Set <code data-v-93091a78${_scopeId2}>PeriodicSchedule.Type</code> to <code data-v-93091a78${_scopeId2}>&quot;VariableOnDemand&quot;</code>. The amount is <strong data-v-93091a78${_scopeId2}>not fixed at consent time</strong> — each <span class="endpoint" data-v-93091a78${_scopeId2}><span class="http-method http-method--post" data-v-93091a78${_scopeId2}>POST</span><code data-v-93091a78${_scopeId2}>/payments</code></span> call specifies its own amount, subject to the controls below. `);
                } else {
                  return [
                    createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                    createTextVNode(" carries the control definition. Set "),
                    createVNode("code", null, "PeriodicSchedule.Type"),
                    createTextVNode(" to "),
                    createVNode("code", null, '"VariableOnDemand"'),
                    createTextVNode(". The amount is "),
                    createVNode("strong", null, "not fixed at consent time"),
                    createTextVNode(" — each "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" call specifies its own amount, subject to the controls below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-93091a78${_scopeId2}>Cumulative Control Parameters</strong> — apply across the entire consent lifetime: `);
                } else {
                  return [
                    createVNode("strong", null, "Cumulative Control Parameters"),
                    createTextVNode(" — apply across the entire consent lifetime: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-93091a78${_scopeId2}><thead data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><th data-v-93091a78${_scopeId2}>Field</th><th data-v-93091a78${_scopeId2}>Required</th><th data-v-93091a78${_scopeId2}>Description</th><th data-v-93091a78${_scopeId2}>Example</th></tr></thead><tbody data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPayments.Amount</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>Maximum total value of all payments over the consent lifetime</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>10000.00</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPayments.Currency</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>ISO 4217 currency code</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>AED</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPayments</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>Maximum total number of payments over the consent lifetime</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>50</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MaximumCumulativeValueOfPayments.Amount")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Maximum total value of all payments over the consent lifetime"),
                          createVNode("td", null, [
                            createVNode("code", null, "10000.00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MaximumCumulativeValueOfPayments.Currency")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "ISO 4217 currency code"),
                          createVNode("td", null, [
                            createVNode("code", null, "AED")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MaximumCumulativeNumberOfPayments")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Maximum total number of payments over the consent lifetime"),
                          createVNode("td", null, [
                            createVNode("code", null, "50")
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
              type: "info",
              title: "How PeriodType governs the periodic controls"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.PeriodType</code> sets the <strong data-v-93091a78${_scopeId2}>unit</strong> for the periodic controls — change it from <code data-v-93091a78${_scopeId2}>&quot;Month&quot;</code> to <code data-v-93091a78${_scopeId2}>&quot;Week&quot;</code>, <code data-v-93091a78${_scopeId2}>&quot;Day&quot;</code>, or <code data-v-93091a78${_scopeId2}>&quot;Year&quot;</code> and the per-period caps (<code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPaymentsPerPeriod</code>, <code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPaymentsPerPeriod</code>) rescope to that unit. For example, with <code data-v-93091a78${_scopeId2}>PeriodType: &quot;Month&quot;</code> and <code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPaymentsPerPeriod: 3</code>, the TPP may submit at most 3 payments in any calendar month under this consent. </p><p data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodType</code> <strong data-v-93091a78${_scopeId2}>does not schedule payments</strong> — the TPP still triggers each <span class="endpoint" data-v-93091a78${_scopeId2}><span class="http-method http-method--post" data-v-93091a78${_scopeId2}>POST</span><code data-v-93091a78${_scopeId2}>/payments</code></span> on-demand. This differs from the periodic variants (<a href="../fixed-periodic-schedule/api-guide" data-v-93091a78${_scopeId2}>FixedPeriodicSchedule</a>, <a href="../variable-periodic-schedule/api-guide" data-v-93091a78${_scopeId2}>VariablePeriodicSchedule</a>) and the defined variants (<a href="../fixed-defined-schedule/api-guide" data-v-93091a78${_scopeId2}>FixedDefinedSchedule</a>, <a href="../variable-defined-schedule/api-guide" data-v-93091a78${_scopeId2}>VariableDefinedSchedule</a>), where the schedule itself governs when payments may be submitted. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "PeriodicSchedule.PeriodType"),
                      createTextVNode(" sets the "),
                      createVNode("strong", null, "unit"),
                      createTextVNode(" for the periodic controls — change it from "),
                      createVNode("code", null, '"Month"'),
                      createTextVNode(" to "),
                      createVNode("code", null, '"Week"'),
                      createTextVNode(", "),
                      createVNode("code", null, '"Day"'),
                      createTextVNode(", or "),
                      createVNode("code", null, '"Year"'),
                      createTextVNode(" and the per-period caps ("),
                      createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                      createTextVNode(", "),
                      createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                      createTextVNode(") rescope to that unit. For example, with "),
                      createVNode("code", null, 'PeriodType: "Month"'),
                      createTextVNode(" and "),
                      createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod: 3"),
                      createTextVNode(", the TPP may submit at most 3 payments in any calendar month under this consent. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("code", null, "PeriodType"),
                      createTextVNode(),
                      createVNode("strong", null, "does not schedule payments"),
                      createTextVNode(" — the TPP still triggers each "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" on-demand. This differs from the periodic variants ("),
                      createVNode("a", { href: "../fixed-periodic-schedule/api-guide" }, "FixedPeriodicSchedule"),
                      createTextVNode(", "),
                      createVNode("a", { href: "../variable-periodic-schedule/api-guide" }, "VariablePeriodicSchedule"),
                      createTextVNode(") and the defined variants ("),
                      createVNode("a", { href: "../fixed-defined-schedule/api-guide" }, "FixedDefinedSchedule"),
                      createTextVNode(", "),
                      createVNode("a", { href: "../variable-defined-schedule/api-guide" }, "VariableDefinedSchedule"),
                      createTextVNode("), where the schedule itself governs when payments may be submitted. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-93091a78${_scopeId2}>Periodic Control Parameters</strong> — apply per recurring period, defined inside <code data-v-93091a78${_scopeId2}>PeriodicSchedule</code>: `);
                } else {
                  return [
                    createVNode("strong", null, "Periodic Control Parameters"),
                    createTextVNode(" — apply per recurring period, defined inside "),
                    createVNode("code", null, "PeriodicSchedule"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-93091a78${_scopeId2}><thead data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><th data-v-93091a78${_scopeId2}>Field</th><th data-v-93091a78${_scopeId2}>Required</th><th data-v-93091a78${_scopeId2}>Description</th><th data-v-93091a78${_scopeId2}>Example</th></tr></thead><tbody data-v-93091a78${_scopeId2}><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.PeriodType</code></td><td data-v-93091a78${_scopeId2}>Yes</td><td data-v-93091a78${_scopeId2}>The period length: <code data-v-93091a78${_scopeId2}>Day</code>, <code data-v-93091a78${_scopeId2}>Week</code>, <code data-v-93091a78${_scopeId2}>Month</code>, or <code data-v-93091a78${_scopeId2}>Year</code></td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>Month</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.PeriodStartDate</code></td><td data-v-93091a78${_scopeId2}>Yes</td><td data-v-93091a78${_scopeId2}>The date from which the period starts. For <code data-v-93091a78${_scopeId2}>Day</code> and <code data-v-93091a78${_scopeId2}>Year</code>, this is when payments may begin. Must not be in the past (today is accepted) and must be before <code data-v-93091a78${_scopeId2}>ExpirationDateTime</code></td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>2027-01-01</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls.MaximumIndividualAmount.Amount</code></td><td data-v-93091a78${_scopeId2}>At least one of three</td><td data-v-93091a78${_scopeId2}>Maximum amount permitted per individual payment</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>500.00</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls.MaximumIndividualAmount.Currency</code></td><td data-v-93091a78${_scopeId2}>At least one of three</td><td data-v-93091a78${_scopeId2}>ISO 4217 currency code</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>AED</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Amount</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>Maximum cumulative value of payments within the period. Must be greater than <code data-v-93091a78${_scopeId2}>MaximumIndividualAmount</code> when both are provided</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>2000.00</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Currency</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>ISO 4217 currency code</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>AED</code></td></tr><tr data-v-93091a78${_scopeId2}><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls.MaximumCumulativeNumberOfPaymentsPerPeriod</code></td><td data-v-93091a78${_scopeId2}>No</td><td data-v-93091a78${_scopeId2}>Maximum number of payments within the period</td><td data-v-93091a78${_scopeId2}><code data-v-93091a78${_scopeId2}>5</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.PeriodType")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The period length: "),
                            createVNode("code", null, "Day"),
                            createTextVNode(", "),
                            createVNode("code", null, "Week"),
                            createTextVNode(", "),
                            createVNode("code", null, "Month"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Year")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Month")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.PeriodStartDate")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The date from which the period starts. For "),
                            createVNode("code", null, "Day"),
                            createTextVNode(" and "),
                            createVNode("code", null, "Year"),
                            createTextVNode(", this is when payments may begin. Must not be in the past (today is accepted) and must be before "),
                            createVNode("code", null, "ExpirationDateTime")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "2027-01-01")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Controls.MaximumIndividualAmount.Amount")
                          ]),
                          createVNode("td", null, "At least one of three"),
                          createVNode("td", null, "Maximum amount permitted per individual payment"),
                          createVNode("td", null, [
                            createVNode("code", null, "500.00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Controls.MaximumIndividualAmount.Currency")
                          ]),
                          createVNode("td", null, "At least one of three"),
                          createVNode("td", null, "ISO 4217 currency code"),
                          createVNode("td", null, [
                            createVNode("code", null, "AED")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Amount")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Maximum cumulative value of payments within the period. Must be greater than "),
                            createVNode("code", null, "MaximumIndividualAmount"),
                            createTextVNode(" when both are provided")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "2000.00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Currency")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "ISO 4217 currency code"),
                          createVNode("td", null, [
                            createVNode("code", null, "AED")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeNumberOfPaymentsPerPeriod")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Maximum number of payments within the period"),
                          createVNode("td", null, [
                            createVNode("code", null, "5")
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
              title: "At least one periodic control must be provided"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}> At least one of <code data-v-93091a78${_scopeId2}>MaximumIndividualAmount</code>, <code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPaymentsPerPeriod</code>, or <code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPaymentsPerPeriod</code> must be present inside <code data-v-93091a78${_scopeId2}>PeriodicSchedule.Controls</code>. The cumulative and lifetime caps are independent of each other. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" At least one of "),
                      createVNode("code", null, "MaximumIndividualAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                      createTextVNode(", or "),
                      createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                      createTextVNode(" must be present inside "),
                      createVNode("code", null, "PeriodicSchedule.Controls"),
                      createTextVNode(". The cumulative and lifetime caps are independent of each other. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-93091a78${_scopeId}>Example request</h3>`);
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
                  createTextVNode(". The critical difference from Single Instant Payment is that "),
                  createVNode("code", null, "ControlParameters"),
                  createTextVNode(" uses "),
                  createVNode("code", null, "MultiPayment"),
                  createTextVNode(" with "),
                  createVNode("code", null, 'Type: "VariableOnDemand"'),
                  createTextVNode(" — no fixed amount is set at consent time. Instead, limits are defined via cumulative caps and periodic controls. ")
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
                          createVNode("code", null, "2027-03-02T00:00:00+00:00")
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
                          createVNode("code", null, "2026-03-03T10:00:00+00:00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BaseConsentId")
                        ]),
                        createVNode("td", null, "string (uuid)"),
                        createVNode("td", null, [
                          createTextVNode("Links to prior consent if renewing — see "),
                          createVNode("a", { href: "/knowledge-base/articles/base-consent-id" }, "Base Consent ID")
                        ]),
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
                          createTextVNode("Payment controls — "),
                          createVNode("strong", null, "see below")
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
                          createVNode("code", null, "Subscription")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Reference shown on the creditor's statement"),
                        createVNode("td", null, [
                          createVNode("code", null, "Subscription")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "ControlParameters — Variable On-Demand"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                  createTextVNode(" carries the control definition. Set "),
                  createVNode("code", null, "PeriodicSchedule.Type"),
                  createTextVNode(" to "),
                  createVNode("code", null, '"VariableOnDemand"'),
                  createTextVNode(". The amount is "),
                  createVNode("strong", null, "not fixed at consent time"),
                  createTextVNode(" — each "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" call specifies its own amount, subject to the controls below. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Cumulative Control Parameters"),
                  createTextVNode(" — apply across the entire consent lifetime: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MaximumCumulativeValueOfPayments.Amount")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Maximum total value of all payments over the consent lifetime"),
                        createVNode("td", null, [
                          createVNode("code", null, "10000.00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MaximumCumulativeValueOfPayments.Currency")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "ISO 4217 currency code"),
                        createVNode("td", null, [
                          createVNode("code", null, "AED")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MaximumCumulativeNumberOfPayments")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Maximum total number of payments over the consent lifetime"),
                        createVNode("td", null, [
                          createVNode("code", null, "50")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "How PeriodType governs the periodic controls"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "PeriodicSchedule.PeriodType"),
                    createTextVNode(" sets the "),
                    createVNode("strong", null, "unit"),
                    createTextVNode(" for the periodic controls — change it from "),
                    createVNode("code", null, '"Month"'),
                    createTextVNode(" to "),
                    createVNode("code", null, '"Week"'),
                    createTextVNode(", "),
                    createVNode("code", null, '"Day"'),
                    createTextVNode(", or "),
                    createVNode("code", null, '"Year"'),
                    createTextVNode(" and the per-period caps ("),
                    createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                    createTextVNode(", "),
                    createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                    createTextVNode(") rescope to that unit. For example, with "),
                    createVNode("code", null, 'PeriodType: "Month"'),
                    createTextVNode(" and "),
                    createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod: 3"),
                    createTextVNode(", the TPP may submit at most 3 payments in any calendar month under this consent. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("code", null, "PeriodType"),
                    createTextVNode(),
                    createVNode("strong", null, "does not schedule payments"),
                    createTextVNode(" — the TPP still triggers each "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" on-demand. This differs from the periodic variants ("),
                    createVNode("a", { href: "../fixed-periodic-schedule/api-guide" }, "FixedPeriodicSchedule"),
                    createTextVNode(", "),
                    createVNode("a", { href: "../variable-periodic-schedule/api-guide" }, "VariablePeriodicSchedule"),
                    createTextVNode(") and the defined variants ("),
                    createVNode("a", { href: "../fixed-defined-schedule/api-guide" }, "FixedDefinedSchedule"),
                    createTextVNode(", "),
                    createVNode("a", { href: "../variable-defined-schedule/api-guide" }, "VariableDefinedSchedule"),
                    createTextVNode("), where the schedule itself governs when payments may be submitted. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Periodic Control Parameters"),
                  createTextVNode(" — apply per recurring period, defined inside "),
                  createVNode("code", null, "PeriodicSchedule"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.PeriodType")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The period length: "),
                          createVNode("code", null, "Day"),
                          createTextVNode(", "),
                          createVNode("code", null, "Week"),
                          createTextVNode(", "),
                          createVNode("code", null, "Month"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Year")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Month")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.PeriodStartDate")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The date from which the period starts. For "),
                          createVNode("code", null, "Day"),
                          createTextVNode(" and "),
                          createVNode("code", null, "Year"),
                          createTextVNode(", this is when payments may begin. Must not be in the past (today is accepted) and must be before "),
                          createVNode("code", null, "ExpirationDateTime")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "2027-01-01")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Controls.MaximumIndividualAmount.Amount")
                        ]),
                        createVNode("td", null, "At least one of three"),
                        createVNode("td", null, "Maximum amount permitted per individual payment"),
                        createVNode("td", null, [
                          createVNode("code", null, "500.00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Controls.MaximumIndividualAmount.Currency")
                        ]),
                        createVNode("td", null, "At least one of three"),
                        createVNode("td", null, "ISO 4217 currency code"),
                        createVNode("td", null, [
                          createVNode("code", null, "AED")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Amount")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Maximum cumulative value of payments within the period. Must be greater than "),
                          createVNode("code", null, "MaximumIndividualAmount"),
                          createTextVNode(" when both are provided")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "2000.00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Currency")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "ISO 4217 currency code"),
                        createVNode("td", null, [
                          createVNode("code", null, "AED")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Controls.MaximumCumulativeNumberOfPaymentsPerPeriod")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Maximum number of payments within the period"),
                        createVNode("td", null, [
                          createVNode("code", null, "5")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "At least one periodic control must be provided"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" At least one of "),
                    createVNode("code", null, "MaximumIndividualAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                    createTextVNode(", or "),
                    createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                    createTextVNode(" must be present inside "),
                    createVNode("code", null, "PeriodicSchedule.Controls"),
                    createTextVNode(". The cumulative and lifetime caps are independent of each other. ")
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
                  _push3(`<p data-v-93091a78${_scopeId2}> Save <code data-v-93091a78${_scopeId2}>codeVerifier</code> in your server-side session or an <code data-v-93091a78${_scopeId2}>httpOnly</code> cookie — you will need it in <a href="#step-8-post-token-authorization-code" data-v-93091a78${_scopeId2}>Step 8</a> to exchange the authorization code for tokens. </p>`);
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
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-93091a78${_scopeId2}>Preparing the Request JWT</a> for the full JWT claim reference and PKCE helpers. `);
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
                  _push3(` The <code data-v-93091a78${_scopeId2}>authorization_endpoint</code> is found in the LFI&#39;s <code data-v-93091a78${_scopeId2}>.well-known/openid-configuration</code> — not constructed from the issuer URL directly. `);
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`After redirecting, the user will see the bank&#39;s authorization screen showing:`);
                } else {
                  return [
                    createTextVNode("After redirecting, the user will see the bank's authorization screen showing:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-93091a78${_scopeId2}>The TPP name and purpose.</li><li data-v-93091a78${_scopeId2}>The active periodic controls (e.g. &quot;up to AED 500.00 per payment&quot; if <code data-v-93091a78${_scopeId2}>MaximumIndividualAmount</code> is set, per-period value and count limits if set).</li><li data-v-93091a78${_scopeId2}>Any lifetime cumulative caps.</li><li data-v-93091a78${_scopeId2}>The consent expiry date.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The TPP name and purpose."),
                    createVNode("li", null, [
                      createTextVNode('The active periodic controls (e.g. "up to AED 500.00 per payment" if '),
                      createVNode("code", null, "MaximumIndividualAmount"),
                      createTextVNode(" is set, per-period value and count limits if set).")
                    ]),
                    createVNode("li", null, "Any lifetime cumulative caps."),
                    createVNode("li", null, "The consent expiry date.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "User Experience"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}> See <a href="./user-journeys" data-v-93091a78${_scopeId2}>User Experience</a> for screen mockups of the Variable On-Demand <strong data-v-93091a78${_scopeId2}>Consent</strong> and <strong data-v-93091a78${_scopeId2}>Authorization</strong> pages the user sees at the bank. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "./user-journeys" }, "User Experience"),
                      createTextVNode(" for screen mockups of the Variable On-Demand "),
                      createVNode("strong", null, "Consent"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Authorization"),
                      createTextVNode(" pages the user sees at the bank. ")
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
                  createTextVNode(" The "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(" is found in the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" — not constructed from the issuer URL directly. ")
                ]),
                _: 1
              }),
              createVNode(_component_ApiGuideStepRedirectCode),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("After redirecting, the user will see the bank's authorization screen showing:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The TPP name and purpose."),
                  createVNode("li", null, [
                    createTextVNode('The active periodic controls (e.g. "up to AED 500.00 per payment" if '),
                    createVNode("code", null, "MaximumIndividualAmount"),
                    createTextVNode(" is set, per-period value and count limits if set).")
                  ]),
                  createVNode("li", null, "Any lifetime cumulative caps."),
                  createVNode("li", null, "The consent expiry date.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "User Experience"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" See "),
                    createVNode("a", { href: "./user-journeys" }, "User Experience"),
                    createTextVNode(" for screen mockups of the Variable On-Demand "),
                    createVNode("strong", null, "Consent"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Authorization"),
                    createTextVNode(" pages the user sees at the bank. ")
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
            _push2(`<div class="ed-doc__endpoint" data-v-93091a78${_scopeId}><span class="http-badge http-post" data-v-93091a78${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-93091a78${_scopeId}>/token</code></div>`);
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
        id: "payment-encrypt-pii",
        num: "11",
        color: "var(--at-teal)",
        eyebrow: "Initiating Payments On-Demand · Encrypt PII for Payment Initiation",
        title: "Re-encrypt the creditor PII for each payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepPaymentEncryptPiiVariable, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepPaymentEncryptPiiVariable)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-9-post-payments",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Initiating Payments On-Demand · Step 9 — POST /payments",
        title: "Submit each payment under the consent",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-93091a78${_scopeId}><span class="http-badge http-post" data-v-93091a78${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-93091a78${_scopeId}>/payments</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-93091a78${_scopeId2}>x-fapi-interaction-id</code> and <code data-v-93091a78${_scopeId2}>x-idempotency-key</code>. If the customer is present at this point in the flow, also send <code data-v-93091a78${_scopeId2}>x-fapi-customer-ip-address</code>, <code data-v-93091a78${_scopeId2}>x-customer-user-agent</code> and <code data-v-93091a78${_scopeId2}>x-fapi-auth-date</code> if the customer has been authenticated. See <a href="/tech/tpp-standards/security/request-headers" data-v-93091a78${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(". If the customer is present at this point in the flow, also send "),
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
                  _push3(` Unlike Single Instant Payment, this step can be called <strong data-v-93091a78${_scopeId2}>multiple times</strong> under the same consent. Each call specifies the actual amount for that payment — it must satisfy whichever control parameters exist on the consent (<code data-v-93091a78${_scopeId2}>MaximumIndividualAmount</code>, <code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPaymentsPerPeriod</code>, and/or <code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPaymentsPerPeriod</code>), as well as any lifetime cumulative caps. `);
                } else {
                  return [
                    createTextVNode(" Unlike Single Instant Payment, this step can be called "),
                    createVNode("strong", null, "multiple times"),
                    createTextVNode(" under the same consent. Each call specifies the actual amount for that payment — it must satisfy whichever control parameters exist on the consent ("),
                    createVNode("code", null, "MaximumIndividualAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                    createTextVNode(", and/or "),
                    createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                    createTextVNode("), as well as any lifetime cumulative caps. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Fields that can vary per payment"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}> Unlike Single Instant Payment, multi-payment consents do not require <code data-v-93091a78${_scopeId2}>PaymentPurposeCode</code>, <code data-v-93091a78${_scopeId2}>DebtorReference</code>, <code data-v-93091a78${_scopeId2}>CreditorReference</code>, or <code data-v-93091a78${_scopeId2}>OpenFinanceBilling</code> to match the consent exactly. Only <code data-v-93091a78${_scopeId2}>ConsentId</code> must match the authorized consent. <code data-v-93091a78${_scopeId2}>Instruction.Amount</code> must be within the parameters the consent allows for this payment type. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Unlike Single Instant Payment, multi-payment consents do not require "),
                      createVNode("code", null, "PaymentPurposeCode"),
                      createTextVNode(", "),
                      createVNode("code", null, "DebtorReference"),
                      createTextVNode(", "),
                      createVNode("code", null, "CreditorReference"),
                      createTextVNode(", or "),
                      createVNode("code", null, "OpenFinanceBilling"),
                      createTextVNode(" to match the consent exactly. Only "),
                      createVNode("code", null, "ConsentId"),
                      createTextVNode(" must match the authorized consent. "),
                      createVNode("code", null, "Instruction.Amount"),
                      createTextVNode(" must be within the parameters the consent allows for this payment type. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step9Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Amount validation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}> The API Hub will reject a payment if <code data-v-93091a78${_scopeId2}>Instruction.Amount</code> violates any control parameter present on the consent — whether <code data-v-93091a78${_scopeId2}>MaximumIndividualAmount</code>, <code data-v-93091a78${_scopeId2}>MaximumCumulativeValueOfPaymentsPerPeriod</code>, <code data-v-93091a78${_scopeId2}>MaximumCumulativeNumberOfPaymentsPerPeriod</code>, or any lifetime cumulative cap. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The API Hub will reject a payment if "),
                      createVNode("code", null, "Instruction.Amount"),
                      createTextVNode(" violates any control parameter present on the consent — whether "),
                      createVNode("code", null, "MaximumIndividualAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                      createTextVNode(", "),
                      createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                      createTextVNode(", or any lifetime cumulative cap. ")
                    ])
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x-idempotency-key"),
                  createTextVNode(". If the customer is present at this point in the flow, also send "),
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
                  createTextVNode(" Unlike Single Instant Payment, this step can be called "),
                  createVNode("strong", null, "multiple times"),
                  createTextVNode(" under the same consent. Each call specifies the actual amount for that payment — it must satisfy whichever control parameters exist on the consent ("),
                  createVNode("code", null, "MaximumIndividualAmount"),
                  createTextVNode(", "),
                  createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                  createTextVNode(", and/or "),
                  createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                  createTextVNode("), as well as any lifetime cumulative caps. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Fields that can vary per payment"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Unlike Single Instant Payment, multi-payment consents do not require "),
                    createVNode("code", null, "PaymentPurposeCode"),
                    createTextVNode(", "),
                    createVNode("code", null, "DebtorReference"),
                    createTextVNode(", "),
                    createVNode("code", null, "CreditorReference"),
                    createTextVNode(", or "),
                    createVNode("code", null, "OpenFinanceBilling"),
                    createTextVNode(" to match the consent exactly. Only "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" must match the authorized consent. "),
                    createVNode("code", null, "Instruction.Amount"),
                    createTextVNode(" must be within the parameters the consent allows for this payment type. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step9Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Amount validation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The API Hub will reject a payment if "),
                    createVNode("code", null, "Instruction.Amount"),
                    createTextVNode(" violates any control parameter present on the consent — whether "),
                    createVNode("code", null, "MaximumIndividualAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "MaximumCumulativeValueOfPaymentsPerPeriod"),
                    createTextVNode(", "),
                    createVNode("code", null, "MaximumCumulativeNumberOfPaymentsPerPeriod"),
                    createTextVNode(", or any lifetime cumulative cap. ")
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
        id: "token-refresh",
        num: "13",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Token refresh for subsequent payments",
        title: "Use the refresh_token to keep the session alive",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepTokenRefresh, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepTokenRefresh)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payment-response",
        num: "14",
        color: "var(--at-navy)",
        eyebrow: "A successful POST /payments",
        title: "201 Created — signed JWT response",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepPaymentResponse, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Consent stays Authorized"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-93091a78${_scopeId2}> After each successful payment, the consent remains in the <code data-v-93091a78${_scopeId2}>Authorized</code> state (unless cumulative caps are reached or the consent expires). You do <strong data-v-93091a78${_scopeId2}>not</strong> need to re-initiate the authorization flow. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" After each successful payment, the consent remains in the "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" state (unless cumulative caps are reached or the consent expires). You do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" need to re-initiate the authorization flow. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepPaymentResponse),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Consent stays Authorized"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" After each successful payment, the consent remains in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" state (unless cumulative caps are reached or the consent expires). You do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" need to re-initiate the authorization flow. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93091a78"]]);
export {
  apiGuide as default
};
