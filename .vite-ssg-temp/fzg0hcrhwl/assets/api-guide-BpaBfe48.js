import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
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
const decryptNode = `import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

async function decryptAndValidateConsentPII(
  piiJwe: string
): Promise<Record<string, unknown>> {
  // 1. kid → private key
  const [headerB64] = piiJwe.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(
    enc1KeyStore.getPrivateKeyPem(kid),
    'RSA-OAEP-256'
  )

  // 2. JWE → JWS
  const { plaintext } = await compactDecrypt(piiJwe, privateKey)

  // 3. JWS → payload (signature verification is optional)
  const pii = decodeJwt(new TextDecoder().decode(plaintext))

  // 4. Schema validation against AEDomesticPaymentPII
  validateConsentPiiSchema(pii)

  return pii
}
`;
const decryptPython = `import json, base64
from jwcrypto import jwe as jwecrypto

def decrypt_and_validate_consent_pii(pii_jwe: str) -> dict:
    # 1. kid → private key
    header = json.loads(base64.urlsafe_b64decode(pii_jwe.split(".")[0] + "=="))
    private_key = enc1_key_store.get_private_key(header["kid"])

    # 2. JWE → JWS
    token = jwecrypto.JWE()
    token.deserialize(pii_jwe, key=private_key)
    jws = token.payload.decode()

    # 3. JWS → payload (signature verification is optional)
    payload_b64 = jws.split(".")[1]
    pii = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

    # 4. Schema validation against AEDomesticPaymentPII
    validate_consent_pii_schema(pii)

    return pii
`;
const decryptedPiiExample = `{
  "Initiation": {
    "Creditor": [
      {
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE220331234567890876543",
          "Name": { "en": "Fatima Al Zaabi" }
        },
        "CreditorAgent": {
          "SchemeName": "BICFI",
          "Identification": "BARBAEAAXXX"
        }
      }
    ],
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456"
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "4900"
  },
  "iat": 1745020800,
  "exp": 1745021100,
  "iss": "tpp-client-id"
}
`;
const validateCreditorNode = `function isValidUaeIban(iban: string): boolean {
  if (!/^AE\\d{21}$/.test(iban)) return false
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const numeric = rearranged
    .split('')
    .map(c => (/[A-Z]/.test(c) ? (c.charCodeAt(0) - 55).toString() : c))
    .join('')
  let remainder = 0
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97
  }
  return remainder === 1
}

function deriveBicFromIban(iban: string): string {
  // UAE IBAN positions 5-7 (0-indexed 4-6) carry the bank code.
  return bicDirectory.lookupByUaeBankCode(iban.slice(4, 7))
}

interface InvalidResponse { status: 'invalid'; code: string; description: string }

async function validateCreditor(
  creditor: Array<{
    CreditorAccount: {
      SchemeName: string
      Identification: string
      Name?: { en?: string; ar?: string }
    }
    CreditorAgent?: { SchemeName: string; Identification: string }
  }>
): Promise<InvalidResponse | null> {
  // 1. Cardinality
  if (!Array.isArray(creditor) || creditor.length !== 1) {
    return invalid('InvalidCreditor',
      'Fixed On Demand requires exactly one creditor entry.')
  }
  const c = creditor[0]

  // 2. Mandatory fields
  if (c.CreditorAccount.SchemeName !== 'IBAN') {
    return invalid('InvalidCreditor',
      'CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.')
  }
  if (!isValidUaeIban(c.CreditorAccount.Identification)) {
    return invalid('InvalidCreditor',
      'CreditorAccount.Identification is not a valid UAE IBAN.')
  }
  if (!c.CreditorAccount.Name?.en && !c.CreditorAccount.Name?.ar) {
    return invalid('InvalidCreditor',
      'CreditorAccount.Name MUST include at least one of \`en\` or \`ar\`.')
  }

  // 3. BIC consistency
  const derivedBic = deriveBicFromIban(c.CreditorAccount.Identification)
  if (c.CreditorAgent?.Identification && c.CreditorAgent.Identification !== derivedBic) {
    return invalid('InvalidCreditor',
      'CreditorAgent.Identification does not match the BIC derived from the IBAN.')
  }

  // 4. Domestic rail reachability + receiving account state
  const r = await lookupRailReachability(derivedBic)
  if (!r.reachableOnAani && !r.reachableOnUaefts) {
    return invalid('UnreachableCreditorAccount',
      'Creditor bank is not reachable on AANI or UAEFTS.')
  }
  if (r.canDetermineAccountState && !r.accountCanReceive) {
    return invalid('UnreachableCreditorAccount',
      'Creditor account cannot currently receive payments.')
  }

  return null
}

const invalid = (code: string, description: string): InvalidResponse =>
  ({ status: 'invalid', code, description })
`;
const validateCreditorPython = `import re

def is_valid_uae_iban(iban: str) -> bool:
    if not re.fullmatch(r"AE\\d{21}", iban):
        return False
    rearranged = iban[4:] + iban[:4]
    numeric = "".join(
        str(ord(c) - 55) if c.isalpha() else c for c in rearranged
    )
    return int(numeric) % 97 == 1


def derive_bic_from_iban(iban: str) -> str:
    return bic_directory.lookup_by_uae_bank_code(iban[4:7])


def _invalid(code, description):
    return {"status": "invalid", "code": code, "description": description}


def validate_creditor(creditor):
    # 1. Cardinality
    if not isinstance(creditor, list) or len(creditor) != 1:
        return _invalid("InvalidCreditor",
            "Fixed On Demand requires exactly one creditor entry.")
    c = creditor[0]
    acc = c["CreditorAccount"]

    # 2. Mandatory fields
    if acc["SchemeName"] != "IBAN":
        return _invalid("InvalidCreditor",
            'CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.')
    if not is_valid_uae_iban(acc["Identification"]):
        return _invalid("InvalidCreditor",
            "CreditorAccount.Identification is not a valid UAE IBAN.")
    name = acc.get("Name") or {}
    if not name.get("en") and not name.get("ar"):
        return _invalid("InvalidCreditor",
            "CreditorAccount.Name MUST include at least one of \`en\` or \`ar\`.")

    # 3. BIC consistency
    derived_bic = derive_bic_from_iban(acc["Identification"])
    agent_bic = (c.get("CreditorAgent") or {}).get("Identification")
    if agent_bic and agent_bic != derived_bic:
        return _invalid("InvalidCreditor",
            "CreditorAgent.Identification does not match the BIC derived from the IBAN.")

    # 4. Domestic rail reachability + receiving account state
    r = lookup_rail_reachability(derived_bic)
    if not r.reachable_on_aani and not r.reachable_on_uaefts:
        return _invalid("UnreachableCreditorAccount",
            "Creditor bank is not reachable on AANI or UAEFTS.")
    if r.can_determine_account_state and not r.account_can_receive:
        return _invalid("UnreachableCreditorAccount",
            "Creditor account cannot currently receive payments.")

    return None
`;
const validateResponseExample = `{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "CreditorAccount.Identification is not a valid UAE IBAN."
  },
  "meta": {}
}
`;
const decryptPaymentNode = `async function decryptAndValidatePaymentPII(piiJwe: string) {
  const pii = await decryptPii(piiJwe) // shared decrypt helper
  validatePaymentPiiSchema(pii)         // AEDomesticPaymentPIIProperties
  return pii
}
`;
const decryptPaymentPython = `def decrypt_and_validate_payment_pii(pii_jwe: str) -> dict:
    pii = decrypt_pii(pii_jwe)              # shared decrypt helper
    validate_payment_pii_schema(pii)        # AEDomesticPaymentPIIProperties
    return pii
`;
const matchPatternANode = `async function matchPaymentCreditorToConsent(
  consentId: string,
  paymentPii: { Initiation: { Creditor: ConsentTimeCreditor } }
): Promise<void> {
  const consentCreditor = await consentStore.getCreditor(consentId)
  if (!consentCreditor) {
    throw httpError(400, 'Consent.Invalid', \`No stored consent for \${consentId}.\`)
  }

  if (!isExactMatch(consentCreditor, paymentPii.Initiation.Creditor)) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'Payment creditor does not match the creditor authorised on the consent.')
  }
}

function isExactMatch(consentCreditor: any, paymentCreditor: any): boolean {
  return (
    consentCreditor.CreditorAccount.SchemeName === paymentCreditor.CreditorAccount.SchemeName &&
    consentCreditor.CreditorAccount.Identification === paymentCreditor.CreditorAccount.Identification &&
    consentCreditor.CreditorAccount.Name?.en === paymentCreditor.CreditorAccount.Name?.en &&
    consentCreditor.CreditorAccount.Name?.ar === paymentCreditor.CreditorAccount.Name?.ar &&
    consentCreditor.CreditorAgent?.SchemeName === paymentCreditor.CreditorAgent?.SchemeName &&
    consentCreditor.CreditorAgent?.Identification === paymentCreditor.CreditorAgent?.Identification
  )
}
`;
const matchPatternAPython = `def match_payment_creditor_to_consent(consent_id: str, payment_pii: dict) -> None:
    consent_creditor = consent_store.get_creditor(consent_id)
    if consent_creditor is None:
        raise HttpError(400, "Consent.Invalid",
            f"No stored consent for {consent_id}.")

    if not is_exact_match(consent_creditor, payment_pii["Initiation"]["Creditor"]):
        raise HttpError(400, "Consent.FailsControlParameters",
            "Payment creditor does not match the creditor authorised on the consent.")


def is_exact_match(consent_creditor: dict, payment_creditor: dict) -> bool:
    a, b = consent_creditor, payment_creditor
    return (
        a["CreditorAccount"]["SchemeName"] == b["CreditorAccount"]["SchemeName"]
        and a["CreditorAccount"]["Identification"] == b["CreditorAccount"]["Identification"]
        and (a["CreditorAccount"].get("Name") or {}).get("en") == (b["CreditorAccount"].get("Name") or {}).get("en")
        and (a["CreditorAccount"].get("Name") or {}).get("ar") == (b["CreditorAccount"].get("Name") or {}).get("ar")
        and (a.get("CreditorAgent") or {}).get("SchemeName") == (b.get("CreditorAgent") or {}).get("SchemeName")
        and (a.get("CreditorAgent") or {}).get("Identification") == (b.get("CreditorAgent") or {}).get("Identification")
    )
`;
const duplicateInFlightNode = `async function rejectIfDuplicateInFlight(
  consentId: string,
  paymentCreditor: any,
  amount: { Amount: string; Currency: string }
): Promise<void> {
  const inFlight = await paymentStore.findInFlight({
    consentId,
    status: 'Pending',
    creditorIban: paymentCreditor.CreditorAccount.Identification,
    amount: amount.Amount,
    currency: amount.Currency,
  })
  if (inFlight) {
    throw httpError(409, 'Payment.DuplicateInFlight',
      'A payment with the same creditor and amount is already in flight under this consent.')
  }
}
`;
const duplicateInFlightPython = `def reject_if_duplicate_in_flight(consent_id: str, payment_creditor: dict, amount: dict) -> None:
    in_flight = payment_store.find_in_flight(
        consent_id=consent_id,
        status="Pending",
        creditor_iban=payment_creditor["CreditorAccount"]["Identification"],
        amount=amount["Amount"],
        currency=amount["Currency"],
    )
    if in_flight:
        raise HttpError(409, "Payment.DuplicateInFlight",
            "A payment with the same creditor and amount is already in flight under this consent.")
`;
const postPaymentsRequestExample = `{
  "requestUrl": "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/payments",
  "paymentType": "cbuae-payment",
  "request": {
    "Data": {
      "ConsentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
      "Instruction": {
        "Amount": { "Amount": "49.00", "Currency": "AED" }
      },
      "PaymentPurposeCode": "SUBS",
      "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYi...",
      "OpenFinanceBilling": { "Type": "Collection" }
    }
  },
  "requestHeaders": {
    "o3-provider-id": "lfi-123",
    "o3-caller-org-id": "tpp-456",
    "o3-caller-client-id": "client-789",
    "o3-api-uri": "/open-finance/payment/v2.2/payments",
    "o3-api-operation": "POST",
    "o3-ozone-interaction-id": "ozone-xyz",
    "o3-consent-id": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "o3-psu-identifier": "eyJwczoi...",
    "x-fapi-interaction-id": "0f4d3a16-9e27-4f8d-9a5a-3a2f7e9c1b22",
    "x-fapi-auth-date": "Tue, 18 Apr 2026 10:14:22 GMT",
    "x-idempotency-key": "idem-2026-04-18-001"
  },
  "tpp": {
    "clientId": "1675793e-d6e3-4954-96c8-acb9aaa83c53",
    "orgId": "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
    "tppId": "fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00",
    "tppName": "Example TPP",
    "softwareStatementId": "XvAjPeeYZAdWwrFF..",
    "decodedSsa": {
      "client_id": "1675793e-d6e3-4954-96c8-acb9aaa83c53",
      "client_name": "Example TPP",
      "roles": ["BSIP"]
    }
  },
  "supplementaryInformation": {}
}
`;
const postPaymentsResponseExample = `{
  "data": {
    "id": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "status": "Pending",
    "statusUpdateDateTime": "2026-04-18T10:14:23Z",
    "creationDateTime": "2026-04-18T10:14:23Z",
    "instruction": {
      "Amount": { "amount": "49.00", "currency": "AED" }
    },
    "paymentPurposeCode": "SUBS",
    "openFinanceBilling": { "Type": "Collection" }
  },
  "meta": {}
}
`;
const errorResponseExample = `{
  "errorCode": "Payment.DuplicateInFlight",
  "errorMessage": "A payment with the same creditor and amount is already in flight under this consent."
}
`;
const patchSettlementExample = `{
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27"
}
`;
const patchRailRejectionExample = `{
  "paymentResponse.status": "Rejected",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "AANI.AM04",
      "Message": "Payment request cannot be executed as insufficient funds at debtor account."
    }
  ]
}
`;
const patchScreeningRejectionExample = `{
  "paymentResponse.status": "Rejected",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "LFI.ScreeningRejected",
      "Message": "Payment rejected by LFI screening controls."
    }
  ]
}
`;
const getPaymentResponseExample = `{
  "data": {
    "id": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
    "status": "AcceptedSettlementCompleted",
    "statusUpdateDateTime": "2026-04-18T10:14:31Z",
    "creationDateTime": "2026-04-18T10:14:23Z",
    "instruction": {
      "Amount": { "amount": "49.00", "currency": "AED" }
    },
    "paymentPurposeCode": "SUBS",
    "openFinanceBilling": { "Type": "Collection" }
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const decryptTabs = [
      { label: "Node.js (jose + ajv)", lang: "typescript", code: decryptNode },
      { label: "Python (jwcrypto + jsonschema)", lang: "python", code: decryptPython }
    ];
    const validateCreditorTabs = [
      { label: "Node.js", lang: "typescript", code: validateCreditorNode },
      { label: "Python", lang: "python", code: validateCreditorPython }
    ];
    const decryptPaymentTabs = [
      { label: "Node.js", lang: "typescript", code: decryptPaymentNode },
      { label: "Python", lang: "python", code: decryptPaymentPython }
    ];
    const matchPatternATabs = [
      { label: "Node.js", lang: "typescript", code: matchPatternANode },
      { label: "Python", lang: "python", code: matchPatternAPython }
    ];
    const duplicateInFlightTabs = [
      { label: "Node.js", lang: "typescript", code: duplicateInFlightNode },
      { label: "Python", lang: "python", code: duplicateInFlightPython }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsOnDemand = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c19a8094><section class="ed-doc__hero" data-v-c19a8094><div class="ed-doc__inner" data-v-c19a8094><div class="ed-doc__eyebrow" data-v-c19a8094><span class="ed-doc__eyebrow-dash" data-v-c19a8094></span> LFI · Banking · Service Initiation · Fixed On Demand </div><h1 class="ed-doc__title" data-v-c19a8094> Fixed On Demand — API Guide <span class="ed-doc__read" data-v-c19a8094>15 min read</span></h1><p class="ed-doc__lede" data-v-c19a8094> Fixed On Demand lets a TPP initiate <strong data-v-c19a8094>multiple</strong> domestic payments at a <strong data-v-c19a8094>fixed amount</strong> from a customer&#39;s account at your LFI via the API Hub. The customer authorises the consent once — approving a specific per-payment amount and periodic limits — and the TPP can then submit individual payments on-demand without re-authorisation. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval. </p><p class="ed-doc__lede" data-v-c19a8094> The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the <a href="./requirements" data-v-c19a8094>Fixed On Demand Requirements</a>. This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, matching the payment-time PII against the consent, and applying the duplicate-in-flight check that is specific to on-demand consent types. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before implementing Fixed On Demand",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before implementing Fixed On Demand, ensure the following are in place:`);
                } else {
                  return [
                    createTextVNode("Before implementing Fixed On Demand, ensure the following are in place:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>API Hub onboarded</strong> — Your API Hub instance is provisioned and your <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-c19a8094${_scopeId2}>environment-specific configuration</a> is complete.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Enc1 key pair generated and registered</strong> — The TPP encrypts PII to your LFI&#39;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" data-v-c19a8094${_scopeId2}>Enc1 public key</a>. Your LFI MUST hold the corresponding private key and be able to look it up by <code data-v-c19a8094${_scopeId2}>kid</code>.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Consent Journey implemented</strong> — The <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-c19a8094${_scopeId2}>Consent Journey API Guide</a> MUST be implemented first. A payment cannot be initiated without an authorized consent.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Ozone Connect connectivity verified</strong> — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" data-v-c19a8094${_scopeId2}>Connectivity &amp; Certificates</a>.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Fixed On Demand advertised</strong> — <code data-v-c19a8094${_scopeId2}>ApiMetadata.FixedOnDemand.Supported</code> is set to <code data-v-c19a8094${_scopeId2}>true</code> on your authorisation server entry in the Trust Framework.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub onboarded"),
                      createTextVNode(" — Your API Hub instance is provisioned and your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                      createTextVNode(" is complete.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Enc1 key pair generated and registered"),
                      createTextVNode(" — The TPP encrypts PII to your LFI's "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1 public key"),
                      createTextVNode(". Your LFI MUST hold the corresponding private key and be able to look it up by "),
                      createVNode("code", null, "kid"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent Journey implemented"),
                      createTextVNode(" — The "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                      createTextVNode(" MUST be implemented first. A payment cannot be initiated without an authorized consent.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Ozone Connect connectivity verified"),
                      createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Fixed On Demand advertised"),
                      createTextVNode(" — "),
                      createVNode("code", null, "ApiMetadata.FixedOnDemand.Supported"),
                      createTextVNode(" is set to "),
                      createVNode("code", null, "true"),
                      createTextVNode(" on your authorisation server entry in the Trust Framework.")
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
                  createTextVNode("Before implementing Fixed On Demand, ensure the following are in place:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub onboarded"),
                    createTextVNode(" — Your API Hub instance is provisioned and your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                    createTextVNode(" is complete.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Enc1 key pair generated and registered"),
                    createTextVNode(" — The TPP encrypts PII to your LFI's "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1 public key"),
                    createTextVNode(". Your LFI MUST hold the corresponding private key and be able to look it up by "),
                    createVNode("code", null, "kid"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent Journey implemented"),
                    createTextVNode(" — The "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(" MUST be implemented first. A payment cannot be initiated without an authorized consent.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Ozone Connect connectivity verified"),
                    createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Fixed On Demand advertised"),
                    createTextVNode(" — "),
                    createVNode("code", null, "ApiMetadata.FixedOnDemand.Supported"),
                    createTextVNode(" is set to "),
                    createVNode("code", null, "true"),
                    createTextVNode(" on your authorisation server entry in the Trust Framework.")
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
        title: "End-to-end Fixed On Demand",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Fixed On Demand API Flow" }, {
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
              createVNode(_component_APIFlowViewer, { title: "Fixed On Demand API Flow" }, {
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
        id: "consent-validation",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Consent Validation",
        title: "Validate the consent before it is created",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When a TPP creates a payment consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--post" data-v-c19a8094${_scopeId2}>POST</span><code data-v-c19a8094${_scopeId2}>/consent/action/validate</code></a> endpoint <strong data-v-c19a8094${_scopeId2}>before</strong> the consent is created. Your LFI MUST validate the consent and respond with <code data-v-c19a8094${_scopeId2}>data.status: &quot;valid&quot;</code> or <code data-v-c19a8094${_scopeId2}>data.status: &quot;invalid&quot;</code>. An <code data-v-c19a8094${_scopeId2}>invalid</code> response prevents the consent being created and the TPP receives an error. `);
                } else {
                  return [
                    createTextVNode(" When a TPP creates a payment consent, the API Hub calls your "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" endpoint "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" the consent is created. Your LFI MUST validate the consent and respond with "),
                    createVNode("code", null, 'data.status: "valid"'),
                    createTextVNode(" or "),
                    createVNode("code", null, 'data.status: "invalid"'),
                    createTextVNode(". An "),
                    createVNode("code", null, "invalid"),
                    createTextVNode(" response prevents the consent being created and the TPP receives an error. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full set of validation rules is enumerated in <a href="./requirements#consent-validation" data-v-c19a8094${_scopeId2}>Fixed On Demand Requirements — Consent Validation</a>. The two parts that need a code walkthrough are <strong data-v-c19a8094${_scopeId2}>decrypting the PII</strong> and <strong data-v-c19a8094${_scopeId2}>validating the creditor</strong>; both are covered below. `);
                } else {
                  return [
                    createTextVNode(" The full set of validation rules is enumerated in "),
                    createVNode("a", { href: "./requirements#consent-validation" }, "Fixed On Demand Requirements — Consent Validation"),
                    createTextVNode(". The two parts that need a code walkthrough are "),
                    createVNode("strong", null, "decrypting the PII"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "validating the creditor"),
                    createTextVNode("; both are covered below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Decrypting and validating the PII</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-c19a8094${_scopeId2}>consent.PersonalIdentifiableInformation</code> field arrives as a JWE compact string encrypted by the TPP to your LFI&#39;s Enc1 public key. Decryption, schema validation, and field-level checks are entirely the LFI&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                    createTextVNode(" field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c19a8094${_scopeId2}>Read the <code data-v-c19a8094${_scopeId2}>kid</code> from the JWE protected header and look up the matching Enc1 private key.</li><li data-v-c19a8094${_scopeId2}>Decrypt the JWE → recover the inner JWS.</li><li data-v-c19a8094${_scopeId2}>Decode the JWS payload (signature verification is <strong data-v-c19a8094${_scopeId2}>optional</strong>).</li><li data-v-c19a8094${_scopeId2}>Validate the decoded payload against the consent-time PII schema — <code data-v-c19a8094${_scopeId2}>AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Read the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" from the JWE protected header and look up the matching Enc1 private key.")
                    ]),
                    createVNode("li", null, "Decrypt the JWE → recover the inner JWS."),
                    createVNode("li", null, [
                      createTextVNode("Decode the JWS payload (signature verification is "),
                      createVNode("strong", null, "optional"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Validate the decoded payload against the consent-time PII schema — "),
                      createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: decryptTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the per-step deep dive see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" data-v-c19a8094${_scopeId2}>How to Decrypt PII</a>. `);
                } else {
                  return [
                    createTextVNode(" For the per-step deep dive see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" }, "How to Decrypt PII"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The decrypted consent-time PII for a Fixed On Demand consent looks like:`);
                } else {
                  return [
                    createTextVNode("The decrypted consent-time PII for a Fixed On Demand consent looks like:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: decryptedPiiExample,
              lang: "json",
              filename: "decrypted PII"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If decryption fails, schema validation fails, or any required field is missing, respond with <code data-v-c19a8094${_scopeId2}>invalid</code> per <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent" data-v-c19a8094${_scopeId2}>Rejecting an invalid consent</a>. `);
                } else {
                  return [
                    createTextVNode(" If decryption fails, schema validation fails, or any required field is missing, respond with "),
                    createVNode("code", null, "invalid"),
                    createTextVNode(" per "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent" }, "Rejecting an invalid consent"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Validating the Creditor</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For Fixed On Demand, <code data-v-c19a8094${_scopeId2}>Initiation.Creditor</code> MUST be an array of exactly <strong data-v-c19a8094${_scopeId2}>one</strong> entry — the single creditor that every payment under this consent will pay. The full Creditor rules are in <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-c19a8094${_scopeId2}>Creditor</a>. `);
                } else {
                  return [
                    createTextVNode(" For Fixed On Demand, "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" MUST be an array of exactly "),
                    createVNode("strong", null, "one"),
                    createTextVNode(" entry — the single creditor that every payment under this consent will pay. The full Creditor rules are in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Cardinality</strong> — exactly one entry.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Mandatory fields</strong> — <code data-v-c19a8094${_scopeId2}>CreditorAccount.SchemeName == &quot;IBAN&quot;</code>, valid UAE IBAN, at least one of <code data-v-c19a8094${_scopeId2}>Name.en</code> or <code data-v-c19a8094${_scopeId2}>Name.ar</code>.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>BIC consistency</strong> — derive the BIC from the IBAN; if <code data-v-c19a8094${_scopeId2}>CreditorAgent.Identification</code> was supplied it MUST match.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Domestic rail reachability</strong> — the receiving bank is reachable on AANI or UAEFTS.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cardinality"),
                      createTextVNode(" — exactly one entry.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Mandatory fields"),
                      createTextVNode(" — "),
                      createVNode("code", null, 'CreditorAccount.SchemeName == "IBAN"'),
                      createTextVNode(", valid UAE IBAN, at least one of "),
                      createVNode("code", null, "Name.en"),
                      createTextVNode(" or "),
                      createVNode("code", null, "Name.ar"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "BIC consistency"),
                      createTextVNode(" — derive the BIC from the IBAN; if "),
                      createVNode("code", null, "CreditorAgent.Identification"),
                      createTextVNode(" was supplied it MUST match.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Domestic rail reachability"),
                      createTextVNode(" — the receiving bank is reachable on AANI or UAEFTS.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: validateCreditorTabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Validating the DebtorAccount</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the TPP supplied <code data-v-c19a8094${_scopeId2}>Initiation.DebtorAccount</code> in the consent PII, your LFI MUST also validate it before approving the consent: <code data-v-c19a8094${_scopeId2}>SchemeName</code> is <code data-v-c19a8094${_scopeId2}>IBAN</code>, the IBAN corresponds to an account held at this LFI, and the account is in a state that permits payment initiation. Customer ownership is checked later during the authorisation journey. `);
                } else {
                  return [
                    createTextVNode(" If the TPP supplied "),
                    createVNode("code", null, "Initiation.DebtorAccount"),
                    createTextVNode(" in the consent PII, your LFI MUST also validate it before approving the consent: "),
                    createVNode("code", null, "SchemeName"),
                    createTextVNode(" is "),
                    createVNode("code", null, "IBAN"),
                    createTextVNode(", the IBAN corresponds to an account held at this LFI, and the account is in a state that permits payment initiation. Customer ownership is checked later during the authorisation journey. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full check list and the <code data-v-c19a8094${_scopeId2}>invalid</code> response shape (with <code data-v-c19a8094${_scopeId2}>code: InvalidDebtorAccount</code>) are in <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" data-v-c19a8094${_scopeId2}>Debtor Account</a>. `);
                } else {
                  return [
                    createTextVNode(" The full check list and the "),
                    createVNode("code", null, "invalid"),
                    createTextVNode(" response shape (with "),
                    createVNode("code", null, "code: InvalidDebtorAccount"),
                    createTextVNode(") are in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Returning the validate response</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: validateResponseExample,
              lang: "json",
              filename: "invalid response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide#validate-post-consent-action-validate" data-v-c19a8094${_scopeId2}>Consent Events &amp; Actions — API Guide</a> for the full validate request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide#validate-post-consent-action-validate" }, "Consent Events & Actions — API Guide"),
                    createTextVNode(" for the full validate request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When a TPP creates a payment consent, the API Hub calls your "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" endpoint "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" the consent is created. Your LFI MUST validate the consent and respond with "),
                  createVNode("code", null, 'data.status: "valid"'),
                  createTextVNode(" or "),
                  createVNode("code", null, 'data.status: "invalid"'),
                  createTextVNode(". An "),
                  createVNode("code", null, "invalid"),
                  createTextVNode(" response prevents the consent being created and the TPP receives an error. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full set of validation rules is enumerated in "),
                  createVNode("a", { href: "./requirements#consent-validation" }, "Fixed On Demand Requirements — Consent Validation"),
                  createTextVNode(". The two parts that need a code walkthrough are "),
                  createVNode("strong", null, "decrypting the PII"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "validating the creditor"),
                  createTextVNode("; both are covered below. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Decrypting and validating the PII"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                  createTextVNode(" field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Read the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" from the JWE protected header and look up the matching Enc1 private key.")
                  ]),
                  createVNode("li", null, "Decrypt the JWE → recover the inner JWS."),
                  createVNode("li", null, [
                    createTextVNode("Decode the JWS payload (signature verification is "),
                    createVNode("strong", null, "optional"),
                    createTextVNode(").")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Validate the decoded payload against the consent-time PII schema — "),
                    createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: decryptTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the per-step deep dive see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" }, "How to Decrypt PII"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The decrypted consent-time PII for a Fixed On Demand consent looks like:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: decryptedPiiExample,
                lang: "json",
                filename: "decrypted PII"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If decryption fails, schema validation fails, or any required field is missing, respond with "),
                  createVNode("code", null, "invalid"),
                  createTextVNode(" per "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent" }, "Rejecting an invalid consent"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Validating the Creditor"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For Fixed On Demand, "),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(" MUST be an array of exactly "),
                  createVNode("strong", null, "one"),
                  createTextVNode(" entry — the single creditor that every payment under this consent will pay. The full Creditor rules are in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cardinality"),
                    createTextVNode(" — exactly one entry.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Mandatory fields"),
                    createTextVNode(" — "),
                    createVNode("code", null, 'CreditorAccount.SchemeName == "IBAN"'),
                    createTextVNode(", valid UAE IBAN, at least one of "),
                    createVNode("code", null, "Name.en"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Name.ar"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "BIC consistency"),
                    createTextVNode(" — derive the BIC from the IBAN; if "),
                    createVNode("code", null, "CreditorAgent.Identification"),
                    createTextVNode(" was supplied it MUST match.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Domestic rail reachability"),
                    createTextVNode(" — the receiving bank is reachable on AANI or UAEFTS.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: validateCreditorTabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Validating the DebtorAccount"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the TPP supplied "),
                  createVNode("code", null, "Initiation.DebtorAccount"),
                  createTextVNode(" in the consent PII, your LFI MUST also validate it before approving the consent: "),
                  createVNode("code", null, "SchemeName"),
                  createTextVNode(" is "),
                  createVNode("code", null, "IBAN"),
                  createTextVNode(", the IBAN corresponds to an account held at this LFI, and the account is in a state that permits payment initiation. Customer ownership is checked later during the authorisation journey. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full check list and the "),
                  createVNode("code", null, "invalid"),
                  createTextVNode(" response shape (with "),
                  createVNode("code", null, "code: InvalidDebtorAccount"),
                  createTextVNode(") are in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Returning the validate response"),
              createVNode(_component_EdCode, {
                code: validateResponseExample,
                lang: "json",
                filename: "invalid response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide#validate-post-consent-action-validate" }, "Consent Events & Actions — API Guide"),
                  createTextVNode(" for the full validate request and response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-flow",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Consent Flow",
        title: "Authenticate the customer and pin the debtor account",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After consent creation passes validation, the TPP redirects the customer to your LFI&#39;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-c19a8094${_scopeId2}>authorization endpoint</a> and your LFI runs the standard consent journey. Full details are in the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-c19a8094${_scopeId2}>Consent Journey API Guide</a>. `);
                } else {
                  return [
                    createTextVNode(" After consent creation passes validation, the TPP redirects the customer to your LFI's "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "authorization endpoint"),
                    createTextVNode(" and your LFI runs the standard consent journey. Full details are in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Endpoint</th><th data-v-c19a8094${_scopeId2}>Direction</th><th data-v-c19a8094${_scopeId2}>Purpose</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--get" data-v-c19a8094${_scopeId2}>GET</span><code data-v-c19a8094${_scopeId2}>/auth</code></a></td><td data-v-c19a8094${_scopeId2}>LFI → API Hub</td><td data-v-c19a8094${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--get" data-v-c19a8094${_scopeId2}>GET</span><code data-v-c19a8094${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-c19a8094${_scopeId2}>LFI → API Hub</td><td data-v-c19a8094${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--patch" data-v-c19a8094${_scopeId2}>PATCH</span><code data-v-c19a8094${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-c19a8094${_scopeId2}>LFI → API Hub</td><td data-v-c19a8094${_scopeId2}>Update consent status, customer identifiers, and the selected debtor account</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--post" data-v-c19a8094${_scopeId2}>POST</span><code data-v-c19a8094${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-c19a8094${_scopeId2}>LFI → API Hub</td><td data-v-c19a8094${_scopeId2}>Complete the interaction successfully</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--post" data-v-c19a8094${_scopeId2}>POST</span><code data-v-c19a8094${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-c19a8094${_scopeId2}>LFI → API Hub</td><td data-v-c19a8094${_scopeId2}>Complete the interaction with a failure</td></tr></tbody></table>`);
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
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth",
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
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
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
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/consents/{consentId}")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Update consent status, customer identifiers, and the selected debtor account")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doConfirm")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the interaction successfully")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doFail")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the interaction with a failure")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>After the consent is authorized</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the TPP submits a payment instruction to the API Hub&#39;s resource server, the API Hub validates the access token, checks the consent is <code data-v-c19a8094${_scopeId2}>Authorised</code>, checks the amount/currency match the consent control parameters (for Fixed On Demand this means the instructed amount equals <code data-v-c19a8094${_scopeId2}>PeriodicSchedule.Amount</code> and the per-period count has not been exceeded), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--post" data-v-c19a8094${_scopeId2}>POST</span><code data-v-c19a8094${_scopeId2}>/payments</code></a> endpoint covered in the next section. `);
                } else {
                  return [
                    createTextVNode(" When the TPP submits a payment instruction to the API Hub's resource server, the API Hub validates the access token, checks the consent is "),
                    createVNode("code", null, "Authorised"),
                    createTextVNode(", checks the amount/currency match the consent control parameters (for Fixed On Demand this means the instructed amount equals "),
                    createVNode("code", null, "PeriodicSchedule.Amount"),
                    createTextVNode(" and the per-period count has not been exceeded), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" endpoint covered in the next section. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub does <strong data-v-c19a8094${_scopeId2}>not</strong> decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time is the LFI&#39;s responsibility, covered below. `);
                } else {
                  return [
                    createTextVNode(" The Hub does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time is the LFI's responsibility, covered below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After consent creation passes validation, the TPP redirects the customer to your LFI's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "authorization endpoint"),
                  createTextVNode(" and your LFI runs the standard consent journey. Full details are in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                  createTextVNode(". ")
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
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth",
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
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
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
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/consents/{consentId}")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Update consent status, customer identifiers, and the selected debtor account")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doConfirm")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the interaction successfully")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doFail")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the interaction with a failure")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "After the consent is authorized"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the TPP submits a payment instruction to the API Hub's resource server, the API Hub validates the access token, checks the consent is "),
                  createVNode("code", null, "Authorised"),
                  createTextVNode(", checks the amount/currency match the consent control parameters (for Fixed On Demand this means the instructed amount equals "),
                  createVNode("code", null, "PeriodicSchedule.Amount"),
                  createTextVNode(" and the per-period count has not been exceeded), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" endpoint covered in the next section. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub does "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time is the LFI's responsibility, covered below. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "post-payments",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "POST /payments",
        title: "Decrypt, validate, persist, return 201",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-c19a8094${_scopeId}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint" data-v-c19a8094${_scopeId}><span class="http-method http-method--post" data-v-c19a8094${_scopeId}>POST</span><code data-v-c19a8094${_scopeId}>/payments</code></a> is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Fixed On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent, run the synchronous validations listed in <a href="./requirements#post-payments-payment-execution" data-v-c19a8094${_scopeId}>POST <code data-v-c19a8094${_scopeId}>/payments</code> Requirements</a> — including the duplicate-in-flight check that is specific to on-demand consent types — create the payment record, and return <code data-v-c19a8094${_scopeId}>201</code> with the assigned <code data-v-c19a8094${_scopeId}>PaymentId</code>. </p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Screening, rail submission, and status propagation happen <strong data-v-c19a8094${_scopeId2}>after</strong> the <code data-v-c19a8094${_scopeId2}>201</code> response — see <a href="#after-returning-201" data-v-c19a8094${_scopeId2}>After returning 201</a>. `);
                } else {
                  return [
                    createTextVNode(" Screening, rail submission, and status propagation happen "),
                    createVNode("strong", null, "after"),
                    createTextVNode(" the "),
                    createVNode("code", null, "201"),
                    createTextVNode(" response — see "),
                    createVNode("a", { href: "#after-returning-201" }, "After returning 201"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Common request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Header</th><th data-v-c19a8094${_scopeId2}>Required</th><th data-v-c19a8094${_scopeId2}>Description</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-provider-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-aspsp-id</code></td><td data-v-c19a8094${_scopeId2}>Yes <em data-v-c19a8094${_scopeId2}>(deprecated)</em></td><td data-v-c19a8094${_scopeId2}>Deprecated alias for <code data-v-c19a8094${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-caller-org-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-caller-client-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-api-uri</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-api-operation</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The HTTP method (<code data-v-c19a8094${_scopeId2}>POST</code>)</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Hub-generated interaction ID</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-consent-id</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The <code data-v-c19a8094${_scopeId2}>consentId</code> for which this call is being made</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-psu-identifier</code></td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Base64-encoded customer identifier JSON object</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-provider-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Identifier for your LFI registered in the Hub")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-aspsp-id")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Yes "),
                            createVNode("em", null, "(deprecated)")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Deprecated alias for "),
                            createVNode("code", null, "o3-provider-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-org-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-client-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "OIDC client ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-software-statement-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Software statement ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-uri")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-operation")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The HTTP method ("),
                            createVNode("code", null, "POST"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-ozone-interaction-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Hub-generated interaction ID")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-consent-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "consentId"),
                            createTextVNode(" for which this call is being made")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-psu-identifier")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Base64-encoded customer identifier JSON object")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-interaction-id")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Interaction ID passed in by the TPP, if present")
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
              title: "Customer-set FAPI headers are inside the body, not the HTTP request"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c19a8094${_scopeId2}> The headers the TPP set on its original call to the API Hub — including <code data-v-c19a8094${_scopeId2}>x-fapi-interaction-id</code>, <code data-v-c19a8094${_scopeId2}>x-fapi-auth-date</code>, <code data-v-c19a8094${_scopeId2}>x-customer-user-agent</code>, and <code data-v-c19a8094${_scopeId2}>x-idempotency-key</code> — are forwarded to your LFI <strong data-v-c19a8094${_scopeId2}>inside the request body</strong> as <code data-v-c19a8094${_scopeId2}>requestHeaders</code>, not on the HTTP headers of the API Hub → LFI call. Unlike Single Instant Payment, Fixed On Demand does <strong data-v-c19a8094${_scopeId2}>not</strong> require <code data-v-c19a8094${_scopeId2}>x-fapi-customer-ip-address</code> — the customer may not be present at the time the TPP submits an on-demand payment. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The headers the TPP set on its original call to the API Hub — including "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(", "),
                      createVNode("code", null, "x-fapi-auth-date"),
                      createTextVNode(", "),
                      createVNode("code", null, "x-customer-user-agent"),
                      createTextVNode(", and "),
                      createVNode("code", null, "x-idempotency-key"),
                      createTextVNode(" — are forwarded to your LFI "),
                      createVNode("strong", null, "inside the request body"),
                      createTextVNode(" as "),
                      createVNode("code", null, "requestHeaders"),
                      createTextVNode(", not on the HTTP headers of the API Hub → LFI call. Unlike Single Instant Payment, Fixed On Demand does "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" require "),
                      createVNode("code", null, "x-fapi-customer-ip-address"),
                      createTextVNode(" — the customer may not be present at the time the TPP submits an on-demand payment. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-c19a8094${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Top-level fields</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Field</th><th data-v-c19a8094${_scopeId2}>Type</th><th data-v-c19a8094${_scopeId2}>Required</th><th data-v-c19a8094${_scopeId2}>Description</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>requestUrl</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>The TPP-facing resource URL the TPP called</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentType</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>MUST be <code data-v-c19a8094${_scopeId2}>cbuae-payment</code> for domestic Fixed On Demand</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>request.Data</code></td><td data-v-c19a8094${_scopeId2}>object</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The payment payload</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>requestHeaders</code></td><td data-v-c19a8094${_scopeId2}>object</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The complete set of HTTP headers the TPP sent to the API Hub</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>tpp</code></td><td data-v-c19a8094${_scopeId2}>object</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The TPP&#39;s directory record. See <a href="/knowledge-base/articles/tpp-context-block" data-v-c19a8094${_scopeId2}>The <code data-v-c19a8094${_scopeId2}>tpp</code> and <code data-v-c19a8094${_scopeId2}>decodedSsa</code> Context Blocks</a></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>supplementaryInformation</code></td><td data-v-c19a8094${_scopeId2}>object</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Free-form pass-through context</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "requestUrl")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "The TPP-facing resource URL the TPP called")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentType")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("MUST be "),
                            createVNode("code", null, "cbuae-payment"),
                            createTextVNode(" for domestic Fixed On Demand")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "request.Data")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The payment payload")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "requestHeaders")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The complete set of HTTP headers the TPP sent to the API Hub")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "tpp")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The TPP's directory record. See "),
                            createVNode("a", { href: "/knowledge-base/articles/tpp-context-block" }, [
                              createTextVNode("The "),
                              createVNode("code", null, "tpp"),
                              createTextVNode(" and "),
                              createVNode("code", null, "decodedSsa"),
                              createTextVNode(" Context Blocks")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "supplementaryInformation")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Free-form pass-through context")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}><code data-v-c19a8094${_scopeId}>request.Data</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Field</th><th data-v-c19a8094${_scopeId2}>Type</th><th data-v-c19a8094${_scopeId2}>Required</th><th data-v-c19a8094${_scopeId2}>Description</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>ConsentId</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>MUST equal the <code data-v-c19a8094${_scopeId2}>o3-consent-id</code> header</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Instruction.Amount.Amount</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>For Fixed On Demand this MUST equal the consent&#39;s <code data-v-c19a8094${_scopeId2}>PeriodicSchedule.Amount</code> — the Hub enforces this before forwarding</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Instruction.Amount.Currency</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>MUST be <code data-v-c19a8094${_scopeId2}>AED</code> for domestic payments</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>PaymentPurposeCode</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>3-letter ISO 20022 purpose code, e.g. <code data-v-c19a8094${_scopeId2}>SUBS</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>PersonalIdentifiableInformation</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Encrypted PII payload as a JWE compact string</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>DebtorReference</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Reference shown on the debtor&#39;s statement</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>CreditorReference</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Reference shown on the creditor&#39;s statement</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>OpenFinanceBilling.Type</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>Billing type</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>OpenFinanceBilling.MerchantId</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Optional merchant identifier</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConsentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("MUST equal the "),
                            createVNode("code", null, "o3-consent-id"),
                            createTextVNode(" header")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount.Amount")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("For Fixed On Demand this MUST equal the consent's "),
                            createVNode("code", null, "PeriodicSchedule.Amount"),
                            createTextVNode(" — the Hub enforces this before forwarding")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount.Currency")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("MUST be "),
                            createVNode("code", null, "AED"),
                            createTextVNode(" for domestic payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentPurposeCode")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("3-letter ISO 20022 purpose code, e.g. "),
                            createVNode("code", null, "SUBS")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PersonalIdentifiableInformation")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Encrypted PII payload as a JWE compact string")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Reference shown on the debtor's statement")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorReference")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Reference shown on the creditor's statement")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OpenFinanceBilling.Type")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Billing type")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OpenFinanceBilling.MerchantId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Optional merchant identifier")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Request example</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: postPaymentsRequestExample,
              lang: "json",
              filename: "POST /payments request body"
            }, null, _parent2, _scopeId));
            _push2(`<h3 id="reading-the-pii-at-payment-time" class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Reading the PII at payment time</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The payment-time PII follows a different shape from the consent-time PII:`);
                } else {
                  return [
                    createTextVNode("The payment-time PII follows a different shape from the consent-time PII:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Initiation.Creditor</code> is a single object</strong>, not an array.</li><li data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>DebtorAccount</code> is absent</strong>.</li><li data-v-c19a8094${_scopeId2}>The schema is <code data-v-c19a8094${_scopeId2}>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "Initiation.Creditor"),
                        createTextVNode(" is a single object")
                      ]),
                      createTextVNode(", not an array.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "DebtorAccount"),
                        createTextVNode(" is absent")
                      ]),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The schema is "),
                      createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: decryptPaymentTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If decryption fails, reject with <code data-v-c19a8094${_scopeId2}>400 JWE.DecryptionError</code>. If schema validation fails, reject with <code data-v-c19a8094${_scopeId2}>400 Body.InvalidFormat</code>. `);
                } else {
                  return [
                    createTextVNode(" If decryption fails, reject with "),
                    createVNode("code", null, "400 JWE.DecryptionError"),
                    createTextVNode(". If schema validation fails, reject with "),
                    createVNode("code", null, "400 Body.InvalidFormat"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="matching-the-pii-against-the-consent" class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Matching the PII against the consent</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Per <a href="./requirements#post-payments-payment-execution" data-v-c19a8094${_scopeId2}>POST <code data-v-c19a8094${_scopeId2}>/payments</code> Requirements</a> rule 2, the submitted creditor MUST exactly match the single creditor that was on the consent at consent time. Mismatch → <code data-v-c19a8094${_scopeId2}>400 Consent.FailsControlParameters</code>. `);
                } else {
                  return [
                    createTextVNode(" Per "),
                    createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" Requirements")
                    ]),
                    createTextVNode(" rule 2, the submitted creditor MUST exactly match the single creditor that was on the consent at consent time. Mismatch → "),
                    createVNode("code", null, "400 Consent.FailsControlParameters"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Pattern A — LFI persisted the decrypted creditor at consent time</h4>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: matchPatternATabs }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Pattern B — LFI did not persist the consent-time PII</h4><p data-v-c19a8094${_scopeId}> If your LFI did not persist the decrypted PII at consent time, fetch the consent from the API Hub via <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-c19a8094${_scopeId}><span class="http-method http-method--get" data-v-c19a8094${_scopeId}>GET</span><code data-v-c19a8094${_scopeId}>/consents/{consentId}</code></a>, decrypt the consent&#39;s <code data-v-c19a8094${_scopeId}>PersonalIdentifiableInformation</code> field, and run the same <code data-v-c19a8094${_scopeId}>isExactMatch</code> comparison against <code data-v-c19a8094${_scopeId}>Initiation.Creditor[0]</code>. </p><h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Duplicate-in-flight check</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Per <a href="./requirements#post-payments-payment-execution" data-v-c19a8094${_scopeId2}>POST <code data-v-c19a8094${_scopeId2}>/payments</code> Requirements</a> rule 6, Fixed On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in <code data-v-c19a8094${_scopeId2}>Pending</code> status. If so, reject the new request with <code data-v-c19a8094${_scopeId2}>409 Payment.DuplicateInFlight</code>. `);
                } else {
                  return [
                    createTextVNode(" Per "),
                    createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" Requirements")
                    ]),
                    createTextVNode(" rule 6, Fixed On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" status. If so, reject the new request with "),
                    createVNode("code", null, "409 Payment.DuplicateInFlight"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This is distinct from <code data-v-c19a8094${_scopeId2}>x-idempotency-key</code> handling: the idempotency key catches TPP retries of the same HTTP request, while this rule catches genuinely separate payment intents that happen to duplicate a still-in-flight one. `);
                } else {
                  return [
                    createTextVNode(" This is distinct from "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(" handling: the idempotency key catches TPP retries of the same HTTP request, while this rule catches genuinely separate payment intents that happen to duplicate a still-in-flight one. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: duplicateInFlightTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the prior payment has left <code data-v-c19a8094${_scopeId2}>Pending</code> (reached <code data-v-c19a8094${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedWithoutPosting</code>, or <code data-v-c19a8094${_scopeId2}>Rejected</code>), a subsequent identical payment is permitted. `);
                } else {
                  return [
                    createTextVNode(" Once the prior payment has left "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" (reached "),
                    createVNode("code", null, "AcceptedSettlementCompleted"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode("), a subsequent identical payment is permitted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-c19a8094${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Return <code data-v-c19a8094${_scopeId2}>201</code> on successful payment record creation.`);
                } else {
                  return [
                    createTextVNode("Return "),
                    createVNode("code", null, "201"),
                    createTextVNode(" on successful payment record creation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Field</th><th data-v-c19a8094${_scopeId2}>Type</th><th data-v-c19a8094${_scopeId2}>Required</th><th data-v-c19a8094${_scopeId2}>Description</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.id</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The LFI-assigned <code data-v-c19a8094${_scopeId2}>PaymentId</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.consentId</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>The consent under which the payment was created</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.paymentTransactionId</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>End-to-end identifier from the rail</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.status</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>One of <code data-v-c19a8094${_scopeId2}>Pending</code>, <code data-v-c19a8094${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-c19a8094${_scopeId2}>Rejected</code>, <code data-v-c19a8094${_scopeId2}>Received</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.statusUpdateDateTime</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>ISO 8601 timestamp</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.creationDateTime</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>ISO 8601 timestamp</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.instruction.Amount</code></td><td data-v-c19a8094${_scopeId2}>object</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>The payment amount and currency</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.paymentPurposeCode</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The purpose code from the request</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>data.openFinanceBilling.Type</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}>The billing type from the request</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The LFI-assigned "),
                            createVNode("code", null, "PaymentId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.consentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "The consent under which the payment was created")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.paymentTransactionId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "End-to-end identifier from the rail")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.status")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("One of "),
                            createVNode("code", null, "Pending"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedSettlementCompleted"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedWithoutPosting"),
                            createTextVNode(", "),
                            createVNode("code", null, "Rejected"),
                            createTextVNode(", "),
                            createVNode("code", null, "Received")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.statusUpdateDateTime")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "ISO 8601 timestamp")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.creationDateTime")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "ISO 8601 timestamp")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.instruction.Amount")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "The payment amount and currency")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.paymentPurposeCode")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The purpose code from the request")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.openFinanceBilling.Type")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The billing type from the request")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Example — successful initiation</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: postPaymentsResponseExample,
              lang: "json",
              filename: "201 Created"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Error responses</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Only return an error when the request is invalid. The <code data-v-c19a8094${_scopeId2}>errorCode</code> values are drawn from the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" data-v-c19a8094${_scopeId2}>POST <code data-v-c19a8094${_scopeId2}>/payments</code> OpenAPI schema</a> <code data-v-c19a8094${_scopeId2}>Error400</code> / <code data-v-c19a8094${_scopeId2}>Error403</code> / <code data-v-c19a8094${_scopeId2}>Error409</code> enums. `);
                } else {
                  return [
                    createTextVNode(" Only return an error when the request is invalid. The "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" values are drawn from the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" OpenAPI schema")
                    ]),
                    createTextVNode(),
                    createVNode("code", null, "Error400"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Error403"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Error409"),
                    createTextVNode(" enums. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}><code data-v-c19a8094${_scopeId}>400</code> — Bad request</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>errorCode</code></th><th data-v-c19a8094${_scopeId2}>When to use</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Body.InvalidFormat</code></td><td data-v-c19a8094${_scopeId2}>Body fails schema validation</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Resource.InvalidFormat</code></td><td data-v-c19a8094${_scopeId2}>A field is present but not syntactically valid</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.Invalid</code></td><td data-v-c19a8094${_scopeId2}>The consent referenced is unknown to the LFI or has been revoked</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.FailsControlParameters</code></td><td data-v-c19a8094${_scopeId2}>The payment-time creditor does not match the consent-time creditor</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.BusinessRuleViolation</code></td><td data-v-c19a8094${_scopeId2}>An LFI-side business rule blocks the payment</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>JWE.DecryptionError</code></td><td data-v-c19a8094${_scopeId2}>PII JWE cannot be decrypted with any registered Enc1 key</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>JWE.InvalidHeader</code></td><td data-v-c19a8094${_scopeId2}>PII JWE header is malformed</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>JWS.InvalidSignature</code> / <code data-v-c19a8094${_scopeId2}>JWS.Malformed</code> / <code data-v-c19a8094${_scopeId2}>JWS.InvalidClaim</code> / <code data-v-c19a8094${_scopeId2}>JWS.InvalidHeader</code></td><td data-v-c19a8094${_scopeId2}>PII inner JWS fails verification</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>GenericRecoverableError</code> / <code data-v-c19a8094${_scopeId2}>GenericError</code></td><td data-v-c19a8094${_scopeId2}>Other validation errors</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Body.InvalidFormat")
                          ]),
                          createVNode("td", null, "Body fails schema validation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Resource.InvalidFormat")
                          ]),
                          createVNode("td", null, "A field is present but not syntactically valid")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.Invalid")
                          ]),
                          createVNode("td", null, "The consent referenced is unknown to the LFI or has been revoked")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.FailsControlParameters")
                          ]),
                          createVNode("td", null, "The payment-time creditor does not match the consent-time creditor")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.BusinessRuleViolation")
                          ]),
                          createVNode("td", null, "An LFI-side business rule blocks the payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "JWE.DecryptionError")
                          ]),
                          createVNode("td", null, "PII JWE cannot be decrypted with any registered Enc1 key")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "JWE.InvalidHeader")
                          ]),
                          createVNode("td", null, "PII JWE header is malformed")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "JWS.InvalidSignature"),
                            createTextVNode(" / "),
                            createVNode("code", null, "JWS.Malformed"),
                            createTextVNode(" / "),
                            createVNode("code", null, "JWS.InvalidClaim"),
                            createTextVNode(" / "),
                            createVNode("code", null, "JWS.InvalidHeader")
                          ]),
                          createVNode("td", null, "PII inner JWS fails verification")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError"),
                            createTextVNode(" / "),
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Other validation errors")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}><code data-v-c19a8094${_scopeId}>403</code> — Forbidden</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>errorCode</code></th><th data-v-c19a8094${_scopeId2}>When to use</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>AccessToken.InvalidScope</code></td><td data-v-c19a8094${_scopeId2}>The Hub&#39;s token does not include the required scope</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-c19a8094${_scopeId2}>Debtor account is <code data-v-c19a8094${_scopeId2}>Inactive</code>, <code data-v-c19a8094${_scopeId2}>Dormant</code>, or <code data-v-c19a8094${_scopeId2}>Suspended</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-c19a8094${_scopeId2}>Debtor account is <code data-v-c19a8094${_scopeId2}>Closed</code>, <code data-v-c19a8094${_scopeId2}>Deceased</code>, or <code data-v-c19a8094${_scopeId2}>Unclaimed</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.TransientAccountAccessFailure</code></td><td data-v-c19a8094${_scopeId2}>Debtor account temporarily inaccessible</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AccessToken.InvalidScope")
                          ]),
                          createVNode("td", null, "The Hub's token does not include the required scope")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Debtor account is "),
                            createVNode("code", null, "Inactive"),
                            createTextVNode(", "),
                            createVNode("code", null, "Dormant"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Suspended")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Debtor account is "),
                            createVNode("code", null, "Closed"),
                            createTextVNode(", "),
                            createVNode("code", null, "Deceased"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Unclaimed")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.TransientAccountAccessFailure")
                          ]),
                          createVNode("td", null, "Debtor account temporarily inaccessible")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}><code data-v-c19a8094${_scopeId}>409</code> — Conflict</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>errorCode</code></th><th data-v-c19a8094${_scopeId2}>When to use</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Payment.DuplicateInFlight</code></td><td data-v-c19a8094${_scopeId2}>Another payment with the same creditor and amount under the same consent is still <code data-v-c19a8094${_scopeId2}>Pending</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Payment.DuplicateInFlight")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Another payment with the same creditor and amount under the same consent is still "),
                            createVNode("code", null, "Pending")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Example error response</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: errorResponseExample,
              lang: "json",
              filename: "error response"
            }, null, _parent2, _scopeId));
            _push2(`<h3 id="after-returning-201" class="ed-doc__subhead" data-v-c19a8094${_scopeId}>After returning 201</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-c19a8094${_scopeId2}>201</code> means the payment record exists at your LFI; it does <strong data-v-c19a8094${_scopeId2}>not</strong> mean the payment has settled. The lifecycle from here is asynchronous and is the LFI&#39;s responsibility: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "201"),
                    createTextVNode(" means the payment record exists at your LFI; it does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" mean the payment has settled. The lifecycle from here is asynchronous and is the LFI's responsibility: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Stage</th><th data-v-c19a8094${_scopeId2}>LFI behaviour</th><th data-v-c19a8094${_scopeId2}>Reference</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>Screening</td><td data-v-c19a8094${_scopeId2}>Run fraud / sanctions / AML controls. SHOULD complete within 3 seconds. On failure, PATCH the payment to <code data-v-c19a8094${_scopeId2}>Rejected</code> with an <code data-v-c19a8094${_scopeId2}>LFI.</code>-namespaced reject reason</td><td data-v-c19a8094${_scopeId2}><a href="./requirements#screening-checks" data-v-c19a8094${_scopeId2}>Screening Checks</a></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>Rail submission</td><td data-v-c19a8094${_scopeId2}>Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable</td><td data-v-c19a8094${_scopeId2}><a href="./requirements#rail-submission" data-v-c19a8094${_scopeId2}>Rail Submission</a></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>Status propagation</td><td data-v-c19a8094${_scopeId2}>On every rail status change, call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--patch" data-v-c19a8094${_scopeId2}>PATCH</span><code data-v-c19a8094${_scopeId2}>/payment-log/{id}</code></a></td><td data-v-c19a8094${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" data-v-c19a8094${_scopeId2}>Payment Status</a></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>Rail rejection</td><td data-v-c19a8094${_scopeId2}>If the rail rejects the payment, PATCH <code data-v-c19a8094${_scopeId2}>paymentResponse.status: Rejected</code> with <code data-v-c19a8094${_scopeId2}>RejectReasonCode</code> namespaced as <code data-v-c19a8094${_scopeId2}>AANI.</code> or <code data-v-c19a8094${_scopeId2}>FTS.</code></td><td data-v-c19a8094${_scopeId2}><a href="./requirements#rail-submission" data-v-c19a8094${_scopeId2}>Rail Submission</a></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>Status retrieval</td><td data-v-c19a8094${_scopeId2}>Continue serving <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--get" data-v-c19a8094${_scopeId2}>GET</span><code data-v-c19a8094${_scopeId2}>/payments/{paymentId}</code></a> for at least 1 year</td><td data-v-c19a8094${_scopeId2}><a href="#behavioural-rules" data-v-c19a8094${_scopeId2}>GET <code data-v-c19a8094${_scopeId2}>/payments/{paymentId}</code> rules below</a></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Stage"),
                          createVNode("th", null, "LFI behaviour"),
                          createVNode("th", null, "Reference")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Screening"),
                          createVNode("td", null, [
                            createTextVNode("Run fraud / sanctions / AML controls. SHOULD complete within 3 seconds. On failure, PATCH the payment to "),
                            createVNode("code", null, "Rejected"),
                            createTextVNode(" with an "),
                            createVNode("code", null, "LFI."),
                            createTextVNode("-namespaced reject reason")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "./requirements#screening-checks" }, "Screening Checks")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Rail submission"),
                          createVNode("td", null, "Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable"),
                          createVNode("td", null, [
                            createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Status propagation"),
                          createVNode("td", null, [
                            createTextVNode("On every rail status change, call "),
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/payment-log/{id}")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Status")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Rail rejection"),
                          createVNode("td", null, [
                            createTextVNode("If the rail rejects the payment, PATCH "),
                            createVNode("code", null, "paymentResponse.status: Rejected"),
                            createTextVNode(" with "),
                            createVNode("code", null, "RejectReasonCode"),
                            createTextVNode(" namespaced as "),
                            createVNode("code", null, "AANI."),
                            createTextVNode(" or "),
                            createVNode("code", null, "FTS.")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Status retrieval"),
                          createVNode("td", null, [
                            createTextVNode("Continue serving "),
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/payments/{paymentId}")
                            ]),
                            createTextVNode(" for at least 1 year")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "#behavioural-rules" }, [
                              createTextVNode("GET "),
                              createVNode("code", null, "/payments/{paymentId}"),
                              createTextVNode(" rules below")
                            ])
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
              createVNode("p", null, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/payments")
                ]),
                createTextVNode(" is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Fixed On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent, run the synchronous validations listed in "),
                createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                  createTextVNode("POST "),
                  createVNode("code", null, "/payments"),
                  createTextVNode(" Requirements")
                ]),
                createTextVNode(" — including the duplicate-in-flight check that is specific to on-demand consent types — create the payment record, and return "),
                createVNode("code", null, "201"),
                createTextVNode(" with the assigned "),
                createVNode("code", null, "PaymentId"),
                createTextVNode(". ")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Screening, rail submission, and status propagation happen "),
                  createVNode("strong", null, "after"),
                  createTextVNode(" the "),
                  createVNode("code", null, "201"),
                  createTextVNode(" response — see "),
                  createVNode("a", { href: "#after-returning-201" }, "After returning 201"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Common request headers"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-provider-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Identifier for your LFI registered in the Hub")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-aspsp-id")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Yes "),
                          createVNode("em", null, "(deprecated)")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Deprecated alias for "),
                          createVNode("code", null, "o3-provider-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-org-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-client-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "OIDC client ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-software-statement-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Software statement ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-uri")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-operation")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The HTTP method ("),
                          createVNode("code", null, "POST"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-ozone-interaction-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Hub-generated interaction ID")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-consent-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "consentId"),
                          createTextVNode(" for which this call is being made")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-psu-identifier")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Base64-encoded customer identifier JSON object")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-interaction-id")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Interaction ID passed in by the TPP, if present")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Customer-set FAPI headers are inside the body, not the HTTP request"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The headers the TPP set on its original call to the API Hub — including "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-customer-user-agent"),
                    createTextVNode(", and "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(" — are forwarded to your LFI "),
                    createVNode("strong", null, "inside the request body"),
                    createTextVNode(" as "),
                    createVNode("code", null, "requestHeaders"),
                    createTextVNode(", not on the HTTP headers of the API Hub → LFI call. Unlike Single Instant Payment, Fixed On Demand does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" require "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" — the customer may not be present at the time the TPP submits an on-demand payment. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Top-level fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "requestUrl")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "The TPP-facing resource URL the TPP called")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentType")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("MUST be "),
                          createVNode("code", null, "cbuae-payment"),
                          createTextVNode(" for domestic Fixed On Demand")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "request.Data")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The payment payload")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "requestHeaders")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The complete set of HTTP headers the TPP sent to the API Hub")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "tpp")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The TPP's directory record. See "),
                          createVNode("a", { href: "/knowledge-base/articles/tpp-context-block" }, [
                            createTextVNode("The "),
                            createVNode("code", null, "tpp"),
                            createTextVNode(" and "),
                            createVNode("code", null, "decodedSsa"),
                            createTextVNode(" Context Blocks")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "supplementaryInformation")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Free-form pass-through context")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "request.Data")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConsentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("MUST equal the "),
                          createVNode("code", null, "o3-consent-id"),
                          createTextVNode(" header")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount.Amount")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("For Fixed On Demand this MUST equal the consent's "),
                          createVNode("code", null, "PeriodicSchedule.Amount"),
                          createTextVNode(" — the Hub enforces this before forwarding")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount.Currency")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("MUST be "),
                          createVNode("code", null, "AED"),
                          createTextVNode(" for domestic payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentPurposeCode")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("3-letter ISO 20022 purpose code, e.g. "),
                          createVNode("code", null, "SUBS")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PersonalIdentifiableInformation")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Encrypted PII payload as a JWE compact string")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Reference shown on the debtor's statement")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorReference")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Reference shown on the creditor's statement")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OpenFinanceBilling.Type")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Billing type")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OpenFinanceBilling.MerchantId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Optional merchant identifier")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Request example"),
              createVNode(_component_EdCode, {
                code: postPaymentsRequestExample,
                lang: "json",
                filename: "POST /payments request body"
              }),
              createVNode("h3", {
                id: "reading-the-pii-at-payment-time",
                class: "ed-doc__subhead"
              }, "Reading the PII at payment time"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The payment-time PII follows a different shape from the consent-time PII:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" is a single object")
                    ]),
                    createTextVNode(", not an array.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "DebtorAccount"),
                      createTextVNode(" is absent")
                    ]),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The schema is "),
                    createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: decryptPaymentTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If decryption fails, reject with "),
                  createVNode("code", null, "400 JWE.DecryptionError"),
                  createTextVNode(". If schema validation fails, reject with "),
                  createVNode("code", null, "400 Body.InvalidFormat"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "matching-the-pii-against-the-consent",
                class: "ed-doc__subhead"
              }, "Matching the PII against the consent"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Per "),
                  createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" Requirements")
                  ]),
                  createTextVNode(" rule 2, the submitted creditor MUST exactly match the single creditor that was on the consent at consent time. Mismatch → "),
                  createVNode("code", null, "400 Consent.FailsControlParameters"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Pattern A — LFI persisted the decrypted creditor at consent time"),
              createVNode(_component_EdCodeGroup, { tabs: matchPatternATabs }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Pattern B — LFI did not persist the consent-time PII"),
              createVNode("p", null, [
                createTextVNode(" If your LFI did not persist the decrypted PII at consent time, fetch the consent from the API Hub via "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/consents/{consentId}")
                ]),
                createTextVNode(", decrypt the consent's "),
                createVNode("code", null, "PersonalIdentifiableInformation"),
                createTextVNode(" field, and run the same "),
                createVNode("code", null, "isExactMatch"),
                createTextVNode(" comparison against "),
                createVNode("code", null, "Initiation.Creditor[0]"),
                createTextVNode(". ")
              ]),
              createVNode("h3", { class: "ed-doc__subhead" }, "Duplicate-in-flight check"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Per "),
                  createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" Requirements")
                  ]),
                  createTextVNode(" rule 6, Fixed On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" status. If so, reject the new request with "),
                  createVNode("code", null, "409 Payment.DuplicateInFlight"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This is distinct from "),
                  createVNode("code", null, "x-idempotency-key"),
                  createTextVNode(" handling: the idempotency key catches TPP retries of the same HTTP request, while this rule catches genuinely separate payment intents that happen to duplicate a still-in-flight one. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: duplicateInFlightTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the prior payment has left "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" (reached "),
                  createVNode("code", null, "AcceptedSettlementCompleted"),
                  createTextVNode(", "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                  createTextVNode(", "),
                  createVNode("code", null, "AcceptedWithoutPosting"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode("), a subsequent identical payment is permitted. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Return "),
                  createVNode("code", null, "201"),
                  createTextVNode(" on successful payment record creation.")
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
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The LFI-assigned "),
                          createVNode("code", null, "PaymentId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.consentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "The consent under which the payment was created")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.paymentTransactionId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "End-to-end identifier from the rail")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.status")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("One of "),
                          createVNode("code", null, "Pending"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedSettlementCompleted"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedWithoutPosting"),
                          createTextVNode(", "),
                          createVNode("code", null, "Rejected"),
                          createTextVNode(", "),
                          createVNode("code", null, "Received")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.statusUpdateDateTime")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "ISO 8601 timestamp")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.creationDateTime")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "ISO 8601 timestamp")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.instruction.Amount")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "The payment amount and currency")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.paymentPurposeCode")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The purpose code from the request")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.openFinanceBilling.Type")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The billing type from the request")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — successful initiation"),
              createVNode(_component_EdCode, {
                code: postPaymentsResponseExample,
                lang: "json",
                filename: "201 Created"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Only return an error when the request is invalid. The "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" values are drawn from the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" OpenAPI schema")
                  ]),
                  createTextVNode(),
                  createVNode("code", null, "Error400"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Error403"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Error409"),
                  createTextVNode(" enums. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "400"),
                createTextVNode(" — Bad request")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Body.InvalidFormat")
                        ]),
                        createVNode("td", null, "Body fails schema validation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Resource.InvalidFormat")
                        ]),
                        createVNode("td", null, "A field is present but not syntactically valid")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.Invalid")
                        ]),
                        createVNode("td", null, "The consent referenced is unknown to the LFI or has been revoked")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.FailsControlParameters")
                        ]),
                        createVNode("td", null, "The payment-time creditor does not match the consent-time creditor")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.BusinessRuleViolation")
                        ]),
                        createVNode("td", null, "An LFI-side business rule blocks the payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "JWE.DecryptionError")
                        ]),
                        createVNode("td", null, "PII JWE cannot be decrypted with any registered Enc1 key")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "JWE.InvalidHeader")
                        ]),
                        createVNode("td", null, "PII JWE header is malformed")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "JWS.InvalidSignature"),
                          createTextVNode(" / "),
                          createVNode("code", null, "JWS.Malformed"),
                          createTextVNode(" / "),
                          createVNode("code", null, "JWS.InvalidClaim"),
                          createTextVNode(" / "),
                          createVNode("code", null, "JWS.InvalidHeader")
                        ]),
                        createVNode("td", null, "PII inner JWS fails verification")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError"),
                          createTextVNode(" / "),
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Other validation errors")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "403"),
                createTextVNode(" — Forbidden")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AccessToken.InvalidScope")
                        ]),
                        createVNode("td", null, "The Hub's token does not include the required scope")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Debtor account is "),
                          createVNode("code", null, "Inactive"),
                          createTextVNode(", "),
                          createVNode("code", null, "Dormant"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Suspended")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Debtor account is "),
                          createVNode("code", null, "Closed"),
                          createTextVNode(", "),
                          createVNode("code", null, "Deceased"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Unclaimed")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.TransientAccountAccessFailure")
                        ]),
                        createVNode("td", null, "Debtor account temporarily inaccessible")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "409"),
                createTextVNode(" — Conflict")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Payment.DuplicateInFlight")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Another payment with the same creditor and amount under the same consent is still "),
                          createVNode("code", null, "Pending")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example error response"),
              createVNode(_component_EdCode, {
                code: errorResponseExample,
                lang: "json",
                filename: "error response"
              }),
              createVNode("h3", {
                id: "after-returning-201",
                class: "ed-doc__subhead"
              }, "After returning 201"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "201"),
                  createTextVNode(" means the payment record exists at your LFI; it does "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" mean the payment has settled. The lifecycle from here is asynchronous and is the LFI's responsibility: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Stage"),
                        createVNode("th", null, "LFI behaviour"),
                        createVNode("th", null, "Reference")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Screening"),
                        createVNode("td", null, [
                          createTextVNode("Run fraud / sanctions / AML controls. SHOULD complete within 3 seconds. On failure, PATCH the payment to "),
                          createVNode("code", null, "Rejected"),
                          createTextVNode(" with an "),
                          createVNode("code", null, "LFI."),
                          createTextVNode("-namespaced reject reason")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "./requirements#screening-checks" }, "Screening Checks")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Rail submission"),
                        createVNode("td", null, "Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable"),
                        createVNode("td", null, [
                          createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Status propagation"),
                        createVNode("td", null, [
                          createTextVNode("On every rail status change, call "),
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/payment-log/{id}")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Status")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Rail rejection"),
                        createVNode("td", null, [
                          createTextVNode("If the rail rejects the payment, PATCH "),
                          createVNode("code", null, "paymentResponse.status: Rejected"),
                          createTextVNode(" with "),
                          createVNode("code", null, "RejectReasonCode"),
                          createTextVNode(" namespaced as "),
                          createVNode("code", null, "AANI."),
                          createTextVNode(" or "),
                          createVNode("code", null, "FTS.")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Status retrieval"),
                        createVNode("td", null, [
                          createTextVNode("Continue serving "),
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/payments/{paymentId}")
                          ]),
                          createTextVNode(" for at least 1 year")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "#behavioural-rules" }, [
                            createTextVNode("GET "),
                            createVNode("code", null, "/payments/{paymentId}"),
                            createTextVNode(" rules below")
                          ])
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
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "patch-payment-log",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "PATCH /payment-log/:id",
        title: "Update payment status on the API Hub",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-c19a8094${_scopeId}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="endpoint" data-v-c19a8094${_scopeId}><span class="http-method http-method--patch" data-v-c19a8094${_scopeId}>PATCH</span><code data-v-c19a8094${_scopeId}>/payment-log/:id</code></a> updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. </p><h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Uses literal flat-key JSON (the dots are part of the key, not nested objects): `);
                } else {
                  return [
                    createTextVNode(" Uses literal flat-key JSON (the dots are part of the key, not nested objects): ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Field</th><th data-v-c19a8094${_scopeId2}>Type</th><th data-v-c19a8094${_scopeId2}>Required</th><th data-v-c19a8094${_scopeId2}>Description</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.status</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes</td><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Pending</code>, <code data-v-c19a8094${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-c19a8094${_scopeId2}>AcceptedWithoutPosting</code>, or <code data-v-c19a8094${_scopeId2}>Rejected</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.paymentTransactionId</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Conditional</td><td data-v-c19a8094${_scopeId2}>The end-to-end identifier assigned by the rail. Once set, MUST NOT change</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions</code></td><td data-v-c19a8094${_scopeId2}>integer</td><td data-v-c19a8094${_scopeId2}>No</td><td data-v-c19a8094${_scopeId2}>Number of successful transactions (typically <code data-v-c19a8094${_scopeId2}>1</code> per payment)</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.RejectReasonCode[]</code></td><td data-v-c19a8094${_scopeId2}>array</td><td data-v-c19a8094${_scopeId2}>Conditional</td><td data-v-c19a8094${_scopeId2}>Required when status is <code data-v-c19a8094${_scopeId2}>Rejected</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.RejectReasonCode[].Code</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes (in array)</td><td data-v-c19a8094${_scopeId2}>Pattern: <code data-v-c19a8094${_scopeId2}>^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentResponse.RejectReasonCode[].Message</code></td><td data-v-c19a8094${_scopeId2}>string</td><td data-v-c19a8094${_scopeId2}>Yes (in array)</td><td data-v-c19a8094${_scopeId2}>Sanitised, customer-relayable description</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.status")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "Pending"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedSettlementCompleted"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                            createTextVNode(", "),
                            createVNode("code", null, "AcceptedWithoutPosting"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Rejected")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.paymentTransactionId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Conditional"),
                          createVNode("td", null, "The end-to-end identifier assigned by the rail. Once set, MUST NOT change")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Number of successful transactions (typically "),
                            createVNode("code", null, "1"),
                            createTextVNode(" per payment)")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.RejectReasonCode[]")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, "Conditional"),
                          createVNode("td", null, [
                            createTextVNode("Required when status is "),
                            createVNode("code", null, "Rejected")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.RejectReasonCode[].Code")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes (in array)"),
                          createVNode("td", null, [
                            createTextVNode("Pattern: "),
                            createVNode("code", null, "^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.RejectReasonCode[].Message")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes (in array)"),
                          createVNode("td", null, "Sanitised, customer-relayable description")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Example — successful settlement</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchSettlementExample,
              lang: "json",
              filename: "successful settlement"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Example — rail rejection</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchRailRejectionExample,
              lang: "json",
              filename: "rail rejection"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c19a8094${_scopeId}>Example — LFI screening rejection</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchScreeningRejectionExample,
              lang: "json",
              filename: "LFI screening rejection"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A successful PATCH returns <code data-v-c19a8094${_scopeId2}>204 No Content</code> with no body.`);
                } else {
                  return [
                    createTextVNode("A successful PATCH returns "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode(" with no body.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", null, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                  createVNode("code", null, "/payment-log/:id")
                ]),
                createTextVNode(" updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. ")
              ]),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Uses literal flat-key JSON (the dots are part of the key, not nested objects): ")
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
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.status")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "Pending"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedSettlementCompleted"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                          createTextVNode(", "),
                          createVNode("code", null, "AcceptedWithoutPosting"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Rejected")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.paymentTransactionId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Conditional"),
                        createVNode("td", null, "The end-to-end identifier assigned by the rail. Once set, MUST NOT change")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Number of successful transactions (typically "),
                          createVNode("code", null, "1"),
                          createTextVNode(" per payment)")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.RejectReasonCode[]")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, "Conditional"),
                        createVNode("td", null, [
                          createTextVNode("Required when status is "),
                          createVNode("code", null, "Rejected")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.RejectReasonCode[].Code")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes (in array)"),
                        createVNode("td", null, [
                          createTextVNode("Pattern: "),
                          createVNode("code", null, "^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.RejectReasonCode[].Message")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes (in array)"),
                        createVNode("td", null, "Sanitised, customer-relayable description")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — successful settlement"),
              createVNode(_component_EdCode, {
                code: patchSettlementExample,
                lang: "json",
                filename: "successful settlement"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — rail rejection"),
              createVNode(_component_EdCode, {
                code: patchRailRejectionExample,
                lang: "json",
                filename: "rail rejection"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — LFI screening rejection"),
              createVNode(_component_EdCode, {
                code: patchScreeningRejectionExample,
                lang: "json",
                filename: "LFI screening rejection"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A successful PATCH returns "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode(" with no body.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-payments-paymentid",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "GET /payments/:paymentId",
        title: "Serve payment status to the TPP",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-c19a8094${_scopeId}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-c19a8094${_scopeId}><span class="http-method http-method--get" data-v-c19a8094${_scopeId}>GET</span><code data-v-c19a8094${_scopeId}>/payments/:paymentId</code></a> backs the TPP request <code data-v-c19a8094${_scopeId}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.2/payments/{PaymentId}</code>. The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection. </p><h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response shape mirrors the <span class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--post" data-v-c19a8094${_scopeId2}>POST</span><code data-v-c19a8094${_scopeId2}>/payments</code></span> <code data-v-c19a8094${_scopeId2}>201</code> response. `);
                } else {
                  return [
                    createTextVNode(" The response shape mirrors the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(),
                    createVNode("code", null, "201"),
                    createTextVNode(" response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: getPaymentResponseExample,
              lang: "json",
              filename: "GET response"
            }, null, _parent2, _scopeId));
            _push2(`<h3 id="behavioural-rules" class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Behavioural rules</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>#</th><th data-v-c19a8094${_scopeId2}>Rule</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>1</td><td data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Sustain period</strong> — Serve <span class="endpoint" data-v-c19a8094${_scopeId2}><span class="http-method http-method--get" data-v-c19a8094${_scopeId2}>GET</span><code data-v-c19a8094${_scopeId2}>/payments/{paymentId}</code></span> for at least <strong data-v-c19a8094${_scopeId2}>1 year from the payment&#39;s creation date</strong></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>2</td><td data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}>Status consistency with the API Hub</strong> — The <code data-v-c19a8094${_scopeId2}>Status</code> returned MUST exactly match the most recent value PATCHed to the API Hub</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}>3</td><td data-v-c19a8094${_scopeId2}><strong data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>paymentTransactionId</code> consistency</strong> — Once the rail has assigned the end-to-end identifier, this endpoint MUST return the same value</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "Rule")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "1"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Sustain period"),
                            createTextVNode(" — Serve "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/payments/{paymentId}")
                            ]),
                            createTextVNode(" for at least "),
                            createVNode("strong", null, "1 year from the payment's creation date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "2"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Status consistency with the API Hub"),
                            createTextVNode(" — The "),
                            createVNode("code", null, "Status"),
                            createTextVNode(" returned MUST exactly match the most recent value PATCHed to the API Hub")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "3"),
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("code", null, "paymentTransactionId"),
                              createTextVNode(" consistency")
                            ]),
                            createTextVNode(" — Once the rail has assigned the end-to-end identifier, this endpoint MUST return the same value")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c19a8094${_scopeId}>Errors</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c19a8094${_scopeId2}><thead data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><th data-v-c19a8094${_scopeId2}>Status</th><th data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>errorCode</code></th><th data-v-c19a8094${_scopeId2}>When to use</th></tr></thead><tbody data-v-c19a8094${_scopeId2}><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>404</code></td><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Resource.NotFound</code></td><td data-v-c19a8094${_scopeId2}>No payment exists for the supplied <code data-v-c19a8094${_scopeId2}>paymentId</code></td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>403</code></td><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>Consent.AccountTemporarilyBlocked</code> / <code data-v-c19a8094${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-c19a8094${_scopeId2}>Debtor account inaccessible</td></tr><tr data-v-c19a8094${_scopeId2}><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>500</code></td><td data-v-c19a8094${_scopeId2}><code data-v-c19a8094${_scopeId2}>GenericRecoverableError</code> / <code data-v-c19a8094${_scopeId2}>GenericError</code></td><td data-v-c19a8094${_scopeId2}>Transient or unrecoverable server error</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Status"),
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "404")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Resource.NotFound")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("No payment exists for the supplied "),
                            createVNode("code", null, "paymentId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "403")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.AccountTemporarilyBlocked"),
                            createTextVNode(" / "),
                            createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                          ]),
                          createVNode("td", null, "Debtor account inaccessible")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "500")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError"),
                            createTextVNode(" / "),
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Transient or unrecoverable server error")
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
              createVNode("p", null, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/payments/:paymentId")
                ]),
                createTextVNode(" backs the TPP request "),
                createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.2/payments/{PaymentId}"),
                createTextVNode(". The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection. ")
              ]),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response shape mirrors the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(),
                  createVNode("code", null, "201"),
                  createTextVNode(" response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: getPaymentResponseExample,
                lang: "json",
                filename: "GET response"
              }),
              createVNode("h3", {
                id: "behavioural-rules",
                class: "ed-doc__subhead"
              }, "Behavioural rules"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "Rule")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "1"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Sustain period"),
                          createTextVNode(" — Serve "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/payments/{paymentId}")
                          ]),
                          createTextVNode(" for at least "),
                          createVNode("strong", null, "1 year from the payment's creation date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "2"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Status consistency with the API Hub"),
                          createTextVNode(" — The "),
                          createVNode("code", null, "Status"),
                          createTextVNode(" returned MUST exactly match the most recent value PATCHed to the API Hub")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "3"),
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "paymentTransactionId"),
                            createTextVNode(" consistency")
                          ]),
                          createTextVNode(" — Once the rail has assigned the end-to-end identifier, this endpoint MUST return the same value")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Errors"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Status"),
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "404")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Resource.NotFound")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("No payment exists for the supplied "),
                          createVNode("code", null, "paymentId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "403")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.AccountTemporarilyBlocked"),
                          createTextVNode(" / "),
                          createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                        ]),
                        createVNode("td", null, "Debtor account inaccessible")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "500")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError"),
                          createTextVNode(" / "),
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Transient or unrecoverable server error")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c19a8094"]]);
export {
  apiGuide as default
};
