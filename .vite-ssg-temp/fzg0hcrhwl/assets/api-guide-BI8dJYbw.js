import { _ as _sfc_main$8, a as __unplugin_components_18 } from "./ApiGuideStepTokenRefresh-BLZ3qAft.js";
import { _ as _sfc_main$7 } from "./ApiGuideStepPaymentEncryptPii-D9AduadJ.js";
import { _ as __unplugin_components_8$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5, e as _sfc_main$6 } from "./ApiGuideStepRequestJwtScopeNote-CrOzrs1j.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5$1 } from "./ApiGuideStepEncryptPii-BY0gAfGW.js";
import { _ as _sfc_main$1 } from "./APIFlowsDefinedSchedule-CSWJmkS2.js";
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
            // "MaximumCumulativeValueOfPayments": { "Amount": "6000.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 12,

            "PeriodicSchedule": {
              "Type": "FixedDefinedSchedule",
              "Schedule": [
                {
                  "PaymentExecutionDate": "2026-08-01",
                  "Amount": { "Amount": "500.00", "Currency": "AED" }
                },
                {
                  "PaymentExecutionDate": "2026-09-02",
                  "Amount": { "Amount": "1200.00", "Currency": "AED" }
                },
                {
                  "PaymentExecutionDate": "2026-10-11",
                  "Amount": { "Amount": "300.00", "Currency": "AED" }
                }
              ]
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 2026-08",
      "CreditorReference": "Invoice 2026-08"
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
            // MaximumCumulativeValueOfPayments: { Amount: '6000.00', Currency: 'AED' },
            // MaximumCumulativeNumberOfPayments: 12,
            PeriodicSchedule: {
              Type: 'FixedDefinedSchedule',
              Schedule: [
                { PaymentExecutionDate: '2026-08-01', Amount: { Amount: '500.00',  Currency: 'AED' } },
                { PaymentExecutionDate: '2026-09-02', Amount: { Amount: '1200.00', Currency: 'AED' } },
                { PaymentExecutionDate: '2026-10-11', Amount: { Amount: '300.00',  Currency: 'AED' } },
              ],
            },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Invoice 2026-08',
      CreditorReference: 'Invoice 2026-08',
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
                        # "MaximumCumulativeValueOfPayments": {"Amount": "6000.00", "Currency": "AED"},
                        # "MaximumCumulativeNumberOfPayments": 12,
                        "PeriodicSchedule": {
                            "Type": "FixedDefinedSchedule",
                            "Schedule": [
                                {"PaymentExecutionDate": "2026-08-01", "Amount": {"Amount": "500.00",  "Currency": "AED"}},
                                {"PaymentExecutionDate": "2026-09-02", "Amount": {"Amount": "1200.00", "Currency": "AED"}},
                                {"PaymentExecutionDate": "2026-10-11", "Amount": {"Amount": "300.00",  "Currency": "AED"}},
                            ],
                        },
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Invoice 2026-08",
            "CreditorReference": "Invoice 2026-08",
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

async function initiateFixedSchedulePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // must match the Amount defined for this PaymentExecutionDate
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
        DebtorReference:    'Invoice 2026-08',
        CreditorReference:  'Invoice 2026-08',
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

// Payment on 2026-08-01 — scheduled AED 500.00
const { PaymentId: aug } = await initiateFixedSchedulePayment(accessToken, consentId, '500.00', paymentEncryptedPII, crypto.randomUUID())

// Payment on 2026-09-02 — scheduled AED 1200.00 (using a refreshed access token)
const { PaymentId: sep } = await initiateFixedSchedulePayment(refreshedToken, consentId, '1200.00', paymentEncryptedPII, crypto.randomUUID())
`;
const step9Python = `import time
from jose import jwt as jose_jwt

def initiate_fixed_schedule_payment(
    access_token: str,
    consent_id: str,
    amount: str,          # must match the Amount defined for this PaymentExecutionDate
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
                "DebtorReference":    "Invoice 2026-08",
                "CreditorReference":  "Invoice 2026-08",
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


# Payment on 2026-08-01 — scheduled AED 500.00
aug_pay = initiate_fixed_schedule_payment(access_token, consent_id, "500.00", payment_encrypted_pii, str(uuid.uuid4()))

# Payment on 2026-09-02 — scheduled AED 1200.00 (using a refreshed access token)
sep_pay = initiate_fixed_schedule_payment(refreshed_token, consent_id, "1200.00", payment_encrypted_pii, str(uuid.uuid4()))
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
      const _component_APIFlowsDefinedSchedule = _sfc_main$1;
      const _component_ApiGuideStepEncryptPii = __unplugin_components_5$1;
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
      const _component_ApiGuideStepPaymentEncryptPii = _sfc_main$7;
      const _component_ApiGuideStepTokenRefresh = _sfc_main$8;
      const _component_ApiGuideStepPaymentResponse = __unplugin_components_18;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3e519dc7><section class="ed-doc__hero" data-v-3e519dc7><div class="ed-doc__inner" data-v-3e519dc7><div class="ed-doc__eyebrow" data-v-3e519dc7><span class="ed-doc__eyebrow-dash" data-v-3e519dc7></span> TPP · Banking · Service Initiation · Fixed Defined Schedule </div><h1 class="ed-doc__title" data-v-3e519dc7> Fixed Defined Schedule — API Guide <span class="ed-doc__read" data-v-3e519dc7>5 min read</span></h1><p class="ed-doc__lede" data-v-3e519dc7> A Fixed Defined Schedule consent authorises a TPP to initiate payments on a <strong data-v-3e519dc7>pre-agreed set of specific dates</strong>, each with a <strong data-v-3e519dc7>fixed exact amount</strong>. Rather than a recurring period, the TPP supplies an explicit schedule at consent time — listing each <code data-v-3e519dc7>PaymentExecutionDate</code> alongside the precise amount to be collected on that date. The user authorises once, approving the full schedule, and the TPP submits one payment per scheduled date without requiring re-authorisation. </p><p class="ed-doc__lede" data-v-3e519dc7> Common use cases include fixed instalment plans, structured loan repayments, and membership or subscription billing where both the dates and exact amounts are known upfront. </p><p class="ed-doc__lede" data-v-3e519dc7> Fixed Defined Schedule is the <strong data-v-3e519dc7>locked-amount variant</strong> of <a href="../variable-defined-schedule/api-guide" data-v-3e519dc7>Variable Defined Schedule</a> — same schedule shape, but each entry carries an exact <code data-v-3e519dc7>Amount</code> rather than a <code data-v-3e519dc7>MaximumIndividualAmount</code> ceiling. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before initiating a Fixed Defined Schedule payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before initiating a Fixed Defined Schedule payment, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before initiating a Fixed Defined Schedule payment, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-3e519dc7${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-3e519dc7${_scopeId2}>BSIP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-3e519dc7${_scopeId2}>Roles</a>. </li><li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-3e519dc7${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-3e519dc7${_scopeId2}>mTLS communication</strong>. </li><li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-3e519dc7${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. </li><li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide" data-v-3e519dc7${_scopeId2}>API Hub (Authorisation Server)</a></strong> — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. </li><li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Understanding of the <a href="/tech/tpp-standards/security/fapi/" data-v-3e519dc7${_scopeId2}>FAPI Security Profile</a></strong> and <strong data-v-3e519dc7${_scopeId2}><a href="/tech/tpp-standards/security/tokens/" data-v-3e519dc7${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. </li><li data-v-3e519dc7${_scopeId2}><strong data-v-3e519dc7${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-3e519dc7${_scopeId2}>Message Encryption</a></strong> — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI&#39;s public encryption key from their JWKS. </li>`);
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
                  createTextVNode("Before initiating a Fixed Defined Schedule payment, ensure the following requirements are met:")
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
        title: "End-to-end Fixed Defined Schedule",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Fixed Defined Schedule API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsDefinedSchedule, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsDefinedSchedule)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Fixed Defined Schedule API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsDefinedSchedule)
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
            _push2(`<div class="ed-doc__endpoint" data-v-3e519dc7${_scopeId}><span class="http-badge http-post" data-v-3e519dc7${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-3e519dc7${_scopeId}>/par</code></div>`);
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
                  _push3(` With the encrypted PII ready, construct the <code data-v-3e519dc7${_scopeId2}>authorization_details</code> of type <code data-v-3e519dc7${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code>. Set <code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Type</code> to <code data-v-3e519dc7${_scopeId2}>&quot;FixedDefinedSchedule&quot;</code>. Unlike a Periodic Schedule, there is no recurring period — instead, the <code data-v-3e519dc7${_scopeId2}>Schedule</code> array lists each specific <code data-v-3e519dc7${_scopeId2}>PaymentExecutionDate</code> alongside the exact amount to be collected on that date. The TPP submits one <span class="endpoint" data-v-3e519dc7${_scopeId2}><span class="http-method http-method--post" data-v-3e519dc7${_scopeId2}>POST</span><code data-v-3e519dc7${_scopeId2}>/payments</code></span> per scheduled entry for exactly the amount defined in the schedule. `);
                } else {
                  return [
                    createTextVNode(" With the encrypted PII ready, construct the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" of type "),
                    createVNode("code", null, "urn:openfinanceuae:service-initiation-consent:v2.2"),
                    createTextVNode(". Set "),
                    createVNode("code", null, "PeriodicSchedule.Type"),
                    createTextVNode(" to "),
                    createVNode("code", null, '"FixedDefinedSchedule"'),
                    createTextVNode(". Unlike a Periodic Schedule, there is no recurring period — instead, the "),
                    createVNode("code", null, "Schedule"),
                    createTextVNode(" array lists each specific "),
                    createVNode("code", null, "PaymentExecutionDate"),
                    createTextVNode(" alongside the exact amount to be collected on that date. The TPP submits one "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" per scheduled entry for exactly the amount defined in the schedule. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-3e519dc7${_scopeId}>authorization_details</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-3e519dc7${_scopeId2}><thead data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><th data-v-3e519dc7${_scopeId2}>Field</th><th data-v-3e519dc7${_scopeId2}>Type</th><th data-v-3e519dc7${_scopeId2}>Description</th><th data-v-3e519dc7${_scopeId2}>Example</th></tr></thead><tbody data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>type</code>*</td><td data-v-3e519dc7${_scopeId2}>enum</td><td data-v-3e519dc7${_scopeId2}>Must be <code data-v-3e519dc7${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>urn:openfinanceuae:service-initiation-consent:v2.2</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>consent</code>*</td><td data-v-3e519dc7${_scopeId2}>object</td><td data-v-3e519dc7${_scopeId2}>Consent properties agreed by the User with the TPP. <em data-v-3e519dc7${_scopeId2}>Described below.</em></td><td data-v-3e519dc7${_scopeId2}>—</td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>subscription</code></td><td data-v-3e519dc7${_scopeId2}>object</td><td data-v-3e519dc7${_scopeId2}>Optional subscription to Event Notifications via Webhook. <em data-v-3e519dc7${_scopeId2}>Described below.</em></td><td data-v-3e519dc7${_scopeId2}>—</td></tr></tbody></table>`);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-3e519dc7${_scopeId}>consent (Required) | <code data-v-3e519dc7${_scopeId}>authorization_details.consent</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-3e519dc7${_scopeId2}><thead data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><th data-v-3e519dc7${_scopeId2}>Field</th><th data-v-3e519dc7${_scopeId2}>Type</th><th data-v-3e519dc7${_scopeId2}>Description</th><th data-v-3e519dc7${_scopeId2}>Example</th></tr></thead><tbody data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>ConsentId</code>*</td><td data-v-3e519dc7${_scopeId2}>string (uuid)</td><td data-v-3e519dc7${_scopeId2}>Unique ID assigned by the TPP (1–128 chars)</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>b8f42378-10ac-46a1-8d20-4e020484216d</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>IsSingleAuthorization</code>*</td><td data-v-3e519dc7${_scopeId2}>boolean</td><td data-v-3e519dc7${_scopeId2}>Whether the payment requires only one authorizing party</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>true</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>ExpirationDateTime</code>*</td><td data-v-3e519dc7${_scopeId2}>date-time</td><td data-v-3e519dc7${_scopeId2}>Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value.</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>2027-03-02T00:00:00+00:00</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>AuthorizationExpirationDateTime</code></td><td data-v-3e519dc7${_scopeId2}>date-time</td><td data-v-3e519dc7${_scopeId2}>Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when <code data-v-3e519dc7${_scopeId2}>IsSingleAuthorization</code> is <code data-v-3e519dc7${_scopeId2}>false</code>; SHOULD NOT be set when <code data-v-3e519dc7${_scopeId2}>IsSingleAuthorization</code> is <code data-v-3e519dc7${_scopeId2}>true</code>. MUST NOT be after <code data-v-3e519dc7${_scopeId2}>ExpirationDateTime</code>.</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>2026-03-03T10:00:00+00:00</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>BaseConsentId</code></td><td data-v-3e519dc7${_scopeId2}>string (uuid)</td><td data-v-3e519dc7${_scopeId2}>Links to prior consent if renewing — see <a href="/knowledge-base/articles/base-consent-id" data-v-3e519dc7${_scopeId2}>Base Consent ID</a></td><td data-v-3e519dc7${_scopeId2}>—</td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>Permissions</code></td><td data-v-3e519dc7${_scopeId2}>array&lt;enum&gt;</td><td data-v-3e519dc7${_scopeId2}>Optional access permissions granted alongside the payment consent</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>ReadAccountsBasic</code>, <code data-v-3e519dc7${_scopeId2}>ReadBalances</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>ControlParameters</code>*</td><td data-v-3e519dc7${_scopeId2}>object</td><td data-v-3e519dc7${_scopeId2}>Payment controls — <strong data-v-3e519dc7${_scopeId2}>see below</strong></td><td data-v-3e519dc7${_scopeId2}>—</td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PersonalIdentifiableInformation</code>*</td><td data-v-3e519dc7${_scopeId2}>string (JWE)</td><td data-v-3e519dc7${_scopeId2}>Encrypted creditor and risk data — the <code data-v-3e519dc7${_scopeId2}>encryptedPII</code> string from Step 1</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>eyJhbGci...</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PaymentPurposeCode</code>*</td><td data-v-3e519dc7${_scopeId2}>string (3 chars)</td><td data-v-3e519dc7${_scopeId2}>AANI payment purpose code</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>ACM</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>DebtorReference</code></td><td data-v-3e519dc7${_scopeId2}>string</td><td data-v-3e519dc7${_scopeId2}>Reference shown on the debtor&#39;s statement</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>Invoice 2026-08</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>CreditorReference</code></td><td data-v-3e519dc7${_scopeId2}>string</td><td data-v-3e519dc7${_scopeId2}>Reference shown on the creditor&#39;s statement</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>Invoice 2026-08</code></td></tr></tbody></table>`);
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
                          createVNode("td", null, "Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value."),
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
                            createVNode("code", null, "Invoice 2026-08")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Reference shown on the creditor's statement"),
                          createVNode("td", null, [
                            createVNode("code", null, "Invoice 2026-08")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-3e519dc7${_scopeId}>ControlParameters — Fixed Defined Schedule</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-3e519dc7${_scopeId2}>ControlParameters.ConsentSchedule.MultiPayment</code> carries the control definition. Set <code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Type</code> to <code data-v-3e519dc7${_scopeId2}>&quot;FixedDefinedSchedule&quot;</code>. The <code data-v-3e519dc7${_scopeId2}>Schedule</code> array defines every execution date and its exact payment amount — the TPP submits a payment on each date for precisely the <code data-v-3e519dc7${_scopeId2}>Amount</code> specified in that entry. `);
                } else {
                  return [
                    createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                    createTextVNode(" carries the control definition. Set "),
                    createVNode("code", null, "PeriodicSchedule.Type"),
                    createTextVNode(" to "),
                    createVNode("code", null, '"FixedDefinedSchedule"'),
                    createTextVNode(". The "),
                    createVNode("code", null, "Schedule"),
                    createTextVNode(" array defines every execution date and its exact payment amount — the TPP submits a payment on each date for precisely the "),
                    createVNode("code", null, "Amount"),
                    createTextVNode(" specified in that entry. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-3e519dc7${_scopeId2}>Cumulative Control Parameters</strong> — apply across the entire consent lifetime: `);
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
                  _push3(`<table data-v-3e519dc7${_scopeId2}><thead data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><th data-v-3e519dc7${_scopeId2}>Field</th><th data-v-3e519dc7${_scopeId2}>Required</th><th data-v-3e519dc7${_scopeId2}>Description</th><th data-v-3e519dc7${_scopeId2}>Example</th></tr></thead><tbody data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>MaximumCumulativeValueOfPayments.Amount</code></td><td data-v-3e519dc7${_scopeId2}>No</td><td data-v-3e519dc7${_scopeId2}>Maximum total value of all payments over the consent lifetime</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>6000.00</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>MaximumCumulativeValueOfPayments.Currency</code></td><td data-v-3e519dc7${_scopeId2}>No</td><td data-v-3e519dc7${_scopeId2}>ISO 4217 currency code</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>AED</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>MaximumCumulativeNumberOfPayments</code></td><td data-v-3e519dc7${_scopeId2}>No</td><td data-v-3e519dc7${_scopeId2}>Maximum total number of payments over the consent lifetime</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>12</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "6000.00")
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
                            createVNode("code", null, "12")
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
                  _push3(`<strong data-v-3e519dc7${_scopeId2}>Schedule Parameters</strong> — the explicit list of execution dates, set inside <code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Schedule</code>: `);
                } else {
                  return [
                    createVNode("strong", null, "Schedule Parameters"),
                    createTextVNode(" — the explicit list of execution dates, set inside "),
                    createVNode("code", null, "PeriodicSchedule.Schedule"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-3e519dc7${_scopeId2}><thead data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><th data-v-3e519dc7${_scopeId2}>Field</th><th data-v-3e519dc7${_scopeId2}>Required</th><th data-v-3e519dc7${_scopeId2}>Description</th><th data-v-3e519dc7${_scopeId2}>Example</th></tr></thead><tbody data-v-3e519dc7${_scopeId2}><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Type</code></td><td data-v-3e519dc7${_scopeId2}>Yes</td><td data-v-3e519dc7${_scopeId2}>Must be <code data-v-3e519dc7${_scopeId2}>&quot;FixedDefinedSchedule&quot;</code></td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>FixedDefinedSchedule</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Schedule</code></td><td data-v-3e519dc7${_scopeId2}>Yes</td><td data-v-3e519dc7${_scopeId2}>Array of schedule entries. Must be non-empty.</td><td data-v-3e519dc7${_scopeId2}>—</td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Schedule[*].PaymentExecutionDate</code></td><td data-v-3e519dc7${_scopeId2}>Yes</td><td data-v-3e519dc7${_scopeId2}>The date on which the TPP intends to submit a payment. Must be unique within the schedule, today or in the future, and before <code data-v-3e519dc7${_scopeId2}>ExpirationDateTime</code>.</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>2026-08-01</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Schedule[*].Amount.Amount</code></td><td data-v-3e519dc7${_scopeId2}>Yes</td><td data-v-3e519dc7${_scopeId2}>The exact amount to be collected on this date. The <span class="endpoint" data-v-3e519dc7${_scopeId2}><span class="http-method http-method--post" data-v-3e519dc7${_scopeId2}>POST</span><code data-v-3e519dc7${_scopeId2}>/payments</code></span> call must use this exact value.</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>500.00</code></td></tr><tr data-v-3e519dc7${_scopeId2}><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>PeriodicSchedule.Schedule[*].Amount.Currency</code></td><td data-v-3e519dc7${_scopeId2}>Yes</td><td data-v-3e519dc7${_scopeId2}>ISO 4217 currency code</td><td data-v-3e519dc7${_scopeId2}><code data-v-3e519dc7${_scopeId2}>AED</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "PeriodicSchedule.Type")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, '"FixedDefinedSchedule"')
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "FixedDefinedSchedule")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Schedule")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Array of schedule entries. Must be non-empty."),
                          createVNode("td", null, "—")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Schedule[*].PaymentExecutionDate")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The date on which the TPP intends to submit a payment. Must be unique within the schedule, today or in the future, and before "),
                            createVNode("code", null, "ExpirationDateTime"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "2026-08-01")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Schedule[*].Amount.Amount")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The exact amount to be collected on this date. The "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/payments")
                            ]),
                            createTextVNode(" call must use this exact value.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "500.00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PeriodicSchedule.Schedule[*].Amount.Currency")
                          ]),
                          createVNode("td", null, "Yes"),
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
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "One payment per scheduled date"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3e519dc7${_scopeId2}> Each entry in the <code data-v-3e519dc7${_scopeId2}>Schedule</code> array corresponds to exactly one <span class="endpoint" data-v-3e519dc7${_scopeId2}><span class="http-method http-method--post" data-v-3e519dc7${_scopeId2}>POST</span><code data-v-3e519dc7${_scopeId2}>/payments</code></span> call. Once a payment has been submitted for a given <code data-v-3e519dc7${_scopeId2}>PaymentExecutionDate</code>, the LFI will reject further payments for that date. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Each entry in the "),
                      createVNode("code", null, "Schedule"),
                      createTextVNode(" array corresponds to exactly one "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" call. Once a payment has been submitted for a given "),
                      createVNode("code", null, "PaymentExecutionDate"),
                      createTextVNode(", the LFI will reject further payments for that date. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-3e519dc7${_scopeId}>Example request</h3>`);
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
                  createTextVNode(". Set "),
                  createVNode("code", null, "PeriodicSchedule.Type"),
                  createTextVNode(" to "),
                  createVNode("code", null, '"FixedDefinedSchedule"'),
                  createTextVNode(". Unlike a Periodic Schedule, there is no recurring period — instead, the "),
                  createVNode("code", null, "Schedule"),
                  createTextVNode(" array lists each specific "),
                  createVNode("code", null, "PaymentExecutionDate"),
                  createTextVNode(" alongside the exact amount to be collected on that date. The TPP submits one "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" per scheduled entry for exactly the amount defined in the schedule. ")
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
                        createVNode("td", null, "Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value."),
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
                          createVNode("code", null, "Invoice 2026-08")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Reference shown on the creditor's statement"),
                        createVNode("td", null, [
                          createVNode("code", null, "Invoice 2026-08")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "ControlParameters — Fixed Defined Schedule"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                  createTextVNode(" carries the control definition. Set "),
                  createVNode("code", null, "PeriodicSchedule.Type"),
                  createTextVNode(" to "),
                  createVNode("code", null, '"FixedDefinedSchedule"'),
                  createTextVNode(". The "),
                  createVNode("code", null, "Schedule"),
                  createTextVNode(" array defines every execution date and its exact payment amount — the TPP submits a payment on each date for precisely the "),
                  createVNode("code", null, "Amount"),
                  createTextVNode(" specified in that entry. ")
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
                          createVNode("code", null, "6000.00")
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
                          createVNode("code", null, "12")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Schedule Parameters"),
                  createTextVNode(" — the explicit list of execution dates, set inside "),
                  createVNode("code", null, "PeriodicSchedule.Schedule"),
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
                          createVNode("code", null, "PeriodicSchedule.Type")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, '"FixedDefinedSchedule"')
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "FixedDefinedSchedule")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Schedule")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Array of schedule entries. Must be non-empty."),
                        createVNode("td", null, "—")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Schedule[*].PaymentExecutionDate")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The date on which the TPP intends to submit a payment. Must be unique within the schedule, today or in the future, and before "),
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "2026-08-01")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Schedule[*].Amount.Amount")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The exact amount to be collected on this date. The "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/payments")
                          ]),
                          createTextVNode(" call must use this exact value.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "500.00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PeriodicSchedule.Schedule[*].Amount.Currency")
                        ]),
                        createVNode("td", null, "Yes"),
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
              createVNode(_component_EdNote, {
                type: "info",
                title: "One payment per scheduled date"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Each entry in the "),
                    createVNode("code", null, "Schedule"),
                    createTextVNode(" array corresponds to exactly one "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" call. Once a payment has been submitted for a given "),
                    createVNode("code", null, "PaymentExecutionDate"),
                    createTextVNode(", the LFI will reject further payments for that date. ")
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
                  _push3(`<p data-v-3e519dc7${_scopeId2}> Save <code data-v-3e519dc7${_scopeId2}>codeVerifier</code> in your server-side session or an <code data-v-3e519dc7${_scopeId2}>httpOnly</code> cookie — you will need it in <a href="#step-8-post-token-authorization-code" data-v-3e519dc7${_scopeId2}>Step 8</a> to exchange the authorization code for tokens. </p>`);
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
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-3e519dc7${_scopeId2}>Preparing the Request JWT</a> for the full JWT claim reference and PKCE helpers. `);
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
                  _push3(` The <code data-v-3e519dc7${_scopeId2}>authorization_endpoint</code> is found in the LFI&#39;s <code data-v-3e519dc7${_scopeId2}>.well-known/openid-configuration</code> — not constructed from the issuer URL directly. `);
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
                  _push3(`<li data-v-3e519dc7${_scopeId2}>The TPP name and purpose.</li><li data-v-3e519dc7${_scopeId2}>The full payment schedule — each date alongside its exact amount.</li><li data-v-3e519dc7${_scopeId2}>Any lifetime cumulative caps.</li><li data-v-3e519dc7${_scopeId2}>The consent expiry date.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The TPP name and purpose."),
                    createVNode("li", null, "The full payment schedule — each date alongside its exact amount."),
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
                  _push3(`<p data-v-3e519dc7${_scopeId2}> See <a href="./user-journeys" data-v-3e519dc7${_scopeId2}>User Experience</a> for screen mockups of the Fixed Defined Schedule <strong data-v-3e519dc7${_scopeId2}>Consent</strong> and <strong data-v-3e519dc7${_scopeId2}>Authorization</strong> pages the user sees at the bank. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "./user-journeys" }, "User Experience"),
                      createTextVNode(" for screen mockups of the Fixed Defined Schedule "),
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
                  createVNode("li", null, "The full payment schedule — each date alongside its exact amount."),
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
                    createTextVNode(" for screen mockups of the Fixed Defined Schedule "),
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
            _push2(`<div class="ed-doc__endpoint" data-v-3e519dc7${_scopeId}><span class="http-badge http-post" data-v-3e519dc7${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-3e519dc7${_scopeId}>/token</code></div>`);
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
        eyebrow: "Initiating Payments on the Defined Schedule · Encrypt PII for Payment Initiation",
        title: "Re-encrypt the creditor PII for each payment",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ApiGuideStepPaymentEncryptPii, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ApiGuideStepPaymentEncryptPii)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-9-post-payments",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Initiating Payments on the Defined Schedule · Step 9 — POST /payments",
        title: "Submit one payment per scheduled date",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-3e519dc7${_scopeId}><span class="http-badge http-post" data-v-3e519dc7${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-3e519dc7${_scopeId}>/payments</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-3e519dc7${_scopeId2}>x-fapi-interaction-id</code> and <code data-v-3e519dc7${_scopeId2}>x-idempotency-key</code>. If the customer is present at this point in the flow, also send <code data-v-3e519dc7${_scopeId2}>x-fapi-customer-ip-address</code>, <code data-v-3e519dc7${_scopeId2}>x-customer-user-agent</code> and <code data-v-3e519dc7${_scopeId2}>x-fapi-auth-date</code> if the customer has been authenticated. See <a href="/tech/tpp-standards/security/request-headers" data-v-3e519dc7${_scopeId2}>Request Headers</a>. `);
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
                  _push3(` Submit <strong data-v-3e519dc7${_scopeId2}>one payment per scheduled date</strong> under this consent. On or around each <code data-v-3e519dc7${_scopeId2}>PaymentExecutionDate</code>, call <span class="endpoint" data-v-3e519dc7${_scopeId2}><span class="http-method http-method--post" data-v-3e519dc7${_scopeId2}>POST</span><code data-v-3e519dc7${_scopeId2}>/payments</code></span> with the amount defined for that entry in the schedule. The API Hub will reject any payment that does not match the scheduled amount, duplicates a date already paid, or is submitted after the consent has expired. `);
                } else {
                  return [
                    createTextVNode(" Submit "),
                    createVNode("strong", null, "one payment per scheduled date"),
                    createTextVNode(" under this consent. On or around each "),
                    createVNode("code", null, "PaymentExecutionDate"),
                    createTextVNode(", call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" with the amount defined for that entry in the schedule. The API Hub will reject any payment that does not match the scheduled amount, duplicates a date already paid, or is submitted after the consent has expired. ")
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
                  _push3(`<p data-v-3e519dc7${_scopeId2}> Unlike Single Instant Payment, multi-payment consents do not require <code data-v-3e519dc7${_scopeId2}>PaymentPurposeCode</code>, <code data-v-3e519dc7${_scopeId2}>DebtorReference</code>, <code data-v-3e519dc7${_scopeId2}>CreditorReference</code>, or <code data-v-3e519dc7${_scopeId2}>OpenFinanceBilling</code> to match the consent exactly. Only <code data-v-3e519dc7${_scopeId2}>ConsentId</code> must match the authorized consent. <code data-v-3e519dc7${_scopeId2}>Instruction.Amount</code> must be within the parameters the consent allows for this payment type. </p>`);
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
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "One payment per scheduled date"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3e519dc7${_scopeId2}> Each <code data-v-3e519dc7${_scopeId2}>PaymentExecutionDate</code> in the schedule may only be used for a single <span class="endpoint" data-v-3e519dc7${_scopeId2}><span class="http-method http-method--post" data-v-3e519dc7${_scopeId2}>POST</span><code data-v-3e519dc7${_scopeId2}>/payments</code></span> call. Submitting a second payment for the same date will be rejected, regardless of the amount. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Each "),
                      createVNode("code", null, "PaymentExecutionDate"),
                      createTextVNode(" in the schedule may only be used for a single "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" call. Submitting a second payment for the same date will be rejected, regardless of the amount. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step9Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Amount enforcement"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3e519dc7${_scopeId2}> The API Hub will reject a payment if <code data-v-3e519dc7${_scopeId2}>Instruction.Amount</code> does not match the <code data-v-3e519dc7${_scopeId2}>Amount</code> defined for the corresponding <code data-v-3e519dc7${_scopeId2}>PaymentExecutionDate</code> in the schedule, if that date has already been paid, or if any lifetime cumulative cap has been reached. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The API Hub will reject a payment if "),
                      createVNode("code", null, "Instruction.Amount"),
                      createTextVNode(" does not match the "),
                      createVNode("code", null, "Amount"),
                      createTextVNode(" defined for the corresponding "),
                      createVNode("code", null, "PaymentExecutionDate"),
                      createTextVNode(" in the schedule, if that date has already been paid, or if any lifetime cumulative cap has been reached. ")
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
                  createTextVNode(" Submit "),
                  createVNode("strong", null, "one payment per scheduled date"),
                  createTextVNode(" under this consent. On or around each "),
                  createVNode("code", null, "PaymentExecutionDate"),
                  createTextVNode(", call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" with the amount defined for that entry in the schedule. The API Hub will reject any payment that does not match the scheduled amount, duplicates a date already paid, or is submitted after the consent has expired. ")
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
              createVNode(_component_EdNote, {
                type: "warning",
                title: "One payment per scheduled date"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Each "),
                    createVNode("code", null, "PaymentExecutionDate"),
                    createTextVNode(" in the schedule may only be used for a single "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" call. Submitting a second payment for the same date will be rejected, regardless of the amount. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step9Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Amount enforcement"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The API Hub will reject a payment if "),
                    createVNode("code", null, "Instruction.Amount"),
                    createTextVNode(" does not match the "),
                    createVNode("code", null, "Amount"),
                    createTextVNode(" defined for the corresponding "),
                    createVNode("code", null, "PaymentExecutionDate"),
                    createTextVNode(" in the schedule, if that date has already been paid, or if any lifetime cumulative cap has been reached. ")
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
              title: "Consent stays Authorized between payments"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3e519dc7${_scopeId2}> After each successful payment, the consent remains in the <code data-v-3e519dc7${_scopeId2}>Authorized</code> state. You do <strong data-v-3e519dc7${_scopeId2}>not</strong> need to re-initiate the authorization flow between scheduled dates — use the token refresh flow to maintain a valid access token. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" After each successful payment, the consent remains in the "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" state. You do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" need to re-initiate the authorization flow between scheduled dates — use the token refresh flow to maintain a valid access token. ")
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
                title: "Consent stays Authorized between payments"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" After each successful payment, the consent remains in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" state. You do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" need to re-initiate the authorization flow between scheduled dates — use the token refresh flow to maintain a valid access token. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e519dc7"]]);
export {
  apiGuide as default
};
