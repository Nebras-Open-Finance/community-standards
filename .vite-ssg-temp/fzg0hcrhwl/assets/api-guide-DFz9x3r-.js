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
const piiDecryptNode = `import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

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
const piiDecryptPython = `import json, base64
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
const consentPiiJson = `{
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
      },
      {
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE630260001015123456701",
          "Name": { "en": "Omar Al Marri" }
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
    "MerchantCategoryCode": "5732"
  },
  "iat": 1745020800,
  "exp": 1745021100,
  "iss": "tpp-client-id"
}
`;
const creditorValidateNode = `function isValidUaeIban(iban: string): boolean {
  // UAE IBAN: AE + 21 digits = 23 chars
  if (!/^AE\\d{21}$/.test(iban)) return false
  // ISO 13616 mod-97 check
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

async function validateCreditorList(
  creditor: Array<CreditorEntry> | undefined,
  supported: {
    singleBeneficiary: boolean
    multipleBeneficiaries: boolean
    openBeneficiaries: boolean
  }
): Promise<InvalidResponse | null> {
  // Open beneficiaries — creditor omitted
  if (creditor === undefined) {
    return supported.openBeneficiaries
      ? null
      : invalid('PaymentTypeNotSupported',
          'LFI does not support open beneficiaries for Variable On Demand.')
  }

  // 1. Cardinality
  if (!Array.isArray(creditor) || creditor.length < 1 || creditor.length > 10) {
    return invalid('InvalidCreditor',
      'Initiation.Creditor must contain between 1 and 10 entries.')
  }
  if (creditor.length === 1 && !supported.singleBeneficiary) {
    return invalid('PaymentTypeNotSupported',
      'LFI does not support single-beneficiary Variable On Demand.')
  }
  if (creditor.length > 1 && !supported.multipleBeneficiaries) {
    return invalid('PaymentTypeNotSupported',
      'LFI does not support multiple-beneficiary Variable On Demand.')
  }

  // 2-4. Validate each entry
  for (const [i, c] of creditor.entries()) {
    const err = await validateSingleCreditor(c, i)
    if (err) return err
  }
  return null
}

async function validateSingleCreditor(
  c: CreditorEntry,
  index: number
): Promise<InvalidResponse | null> {
  const at = \`Initiation.Creditor[\${index}]\`

  // 2. Mandatory fields
  if (c.CreditorAccount.SchemeName !== 'IBAN') {
    return invalid('InvalidCreditor',
      \`\${at}.CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.\`)
  }
  if (!isValidUaeIban(c.CreditorAccount.Identification)) {
    return invalid('InvalidCreditor',
      \`\${at}.CreditorAccount.Identification is not a valid UAE IBAN.\`)
  }
  if (!c.CreditorAccount.Name?.en && !c.CreditorAccount.Name?.ar) {
    return invalid('InvalidCreditor',
      \`\${at}.CreditorAccount.Name MUST include at least one of "en" or "ar".\`)
  }

  // 3. BIC consistency
  const derivedBic = deriveBicFromIban(c.CreditorAccount.Identification)
  if (c.CreditorAgent?.Identification && c.CreditorAgent.Identification !== derivedBic) {
    return invalid('InvalidCreditor',
      \`\${at}.CreditorAgent.Identification does not match the BIC derived from the IBAN.\`)
  }

  // 4. Domestic rail reachability + receiving account state
  const r = await lookupRailReachability(derivedBic)
  if (!r.reachableOnAani && !r.reachableOnUaefts) {
    return invalid('UnreachableCreditorAccount',
      \`\${at}: creditor bank is not reachable on AANI or UAEFTS.\`)
  }
  if (r.canDetermineAccountState && !r.accountCanReceive) {
    return invalid('UnreachableCreditorAccount',
      \`\${at}: creditor account cannot currently receive payments.\`)
  }

  return null
}

interface CreditorEntry {
  CreditorAccount: {
    SchemeName: string
    Identification: string
    Name?: { en?: string; ar?: string }
  }
  CreditorAgent?: { SchemeName: string; Identification: string }
}

const invalid = (code: string, description: string): InvalidResponse =>
  ({ status: 'invalid', code, description })
`;
const creditorValidatePython = `import re

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


def validate_creditor_list(creditor, supported):
    # Open beneficiaries — creditor omitted
    if creditor is None:
        return None if supported["open_beneficiaries"] else _invalid(
            "PaymentTypeNotSupported",
            "LFI does not support open beneficiaries for Variable On Demand.")

    # 1. Cardinality
    if not isinstance(creditor, list) or not (1 <= len(creditor) <= 10):
        return _invalid("InvalidCreditor",
            "Initiation.Creditor must contain between 1 and 10 entries.")
    if len(creditor) == 1 and not supported["single_beneficiary"]:
        return _invalid("PaymentTypeNotSupported",
            "LFI does not support single-beneficiary Variable On Demand.")
    if len(creditor) > 1 and not supported["multiple_beneficiaries"]:
        return _invalid("PaymentTypeNotSupported",
            "LFI does not support multiple-beneficiary Variable On Demand.")

    # 2-4. Validate each entry
    for i, c in enumerate(creditor):
        err = validate_single_creditor(c, i)
        if err:
            return err
    return None


def validate_single_creditor(c, index):
    at = f"Initiation.Creditor[{index}]"
    acc = c["CreditorAccount"]

    # 2. Mandatory fields
    if acc["SchemeName"] != "IBAN":
        return _invalid("InvalidCreditor",
            f'{at}.CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.')
    if not is_valid_uae_iban(acc["Identification"]):
        return _invalid("InvalidCreditor",
            f"{at}.CreditorAccount.Identification is not a valid UAE IBAN.")
    name = acc.get("Name") or {}
    if not name.get("en") and not name.get("ar"):
        return _invalid("InvalidCreditor",
            f'{at}.CreditorAccount.Name MUST include at least one of "en" or "ar".')

    # 3. BIC consistency
    derived_bic = derive_bic_from_iban(acc["Identification"])
    agent_bic = (c.get("CreditorAgent") or {}).get("Identification")
    if agent_bic and agent_bic != derived_bic:
        return _invalid("InvalidCreditor",
            f"{at}.CreditorAgent.Identification does not match the BIC derived from the IBAN.")

    # 4. Domestic rail reachability + receiving account state
    r = lookup_rail_reachability(derived_bic)
    if not r.reachable_on_aani and not r.reachable_on_uaefts:
        return _invalid("UnreachableCreditorAccount",
            f"{at}: creditor bank is not reachable on AANI or UAEFTS.")
    if r.can_determine_account_state and not r.account_can_receive:
        return _invalid("UnreachableCreditorAccount",
            f"{at}: creditor account cannot currently receive payments.")

    return None
`;
const invalidResponseJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Initiation.Creditor[3].CreditorAccount.Identification is not a valid UAE IBAN."
  },
  "meta": {}
}
`;
const piiPaymentNode = `async function decryptAndValidatePaymentPII(piiJwe: string) {
  const pii = await decryptPii(piiJwe) // shared decrypt helper
  validatePaymentPiiSchema(pii)         // AEDomesticPaymentPIIProperties
  return pii
}
`;
const piiPaymentPython = `def decrypt_and_validate_payment_pii(pii_jwe: str) -> dict:
    pii = decrypt_pii(pii_jwe)              # shared decrypt helper
    validate_payment_pii_schema(pii)        # AEDomesticPaymentPIIProperties
    return pii
`;
const paymentPiiJson = `{
  "Initiation": {
    "Creditor": {
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
  },
  "Risk": {
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5732"
  },
  "iat": 1745020800,
  "exp": 1745021100,
  "iss": "tpp-client-id"
}
`;
const matchPiiNode = `async function matchPaymentCreditorToConsent(
  consentId: string,
  paymentPii: { Initiation: { Creditor: CreditorEntry } }
): Promise<void> {
  const stored = await consentStore.getConsentContext(consentId)
  if (!stored) {
    throw httpError(400, 'Consent.Invalid', \`No stored consent for \${consentId}.\`)
  }

  // Open beneficiaries — no list to match against; validate fresh instead.
  if (stored.beneficiaryModel === 'open') {
    await validateOpenBeneficiaryCreditor(paymentPii.Initiation.Creditor)
    return
  }

  // Fixed list (1-10 entries) — the payment creditor must match exactly one.
  const matched = stored.creditorList.some(c =>
    isExactMatch(c, paymentPii.Initiation.Creditor)
  )
  if (!matched) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'Payment creditor does not match any creditor authorised on the consent.')
  }
}

function isExactMatch(consentCreditor: any, paymentCreditor: any): boolean {
  // Compare every field that was authorised — case-sensitive.
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
const matchPiiPython = `def match_payment_creditor_to_consent(consent_id: str, payment_pii: dict) -> None:
    stored = consent_store.get_consent_context(consent_id)
    if stored is None:
        raise HttpError(400, "Consent.Invalid",
            f"No stored consent for {consent_id}.")

    # Open beneficiaries — no list to match against; validate fresh instead.
    if stored.beneficiary_model == "open":
        validate_open_beneficiary_creditor(payment_pii["Initiation"]["Creditor"])
        return

    # Fixed list (1-10 entries) — the payment creditor must match exactly one.
    payment_creditor = payment_pii["Initiation"]["Creditor"]
    if not any(is_exact_match(c, payment_creditor) for c in stored.creditor_list):
        raise HttpError(400, "Consent.FailsControlParameters",
            "Payment creditor does not match any creditor authorised on the consent.")


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
const openBeneficiaryNode = `async function validateOpenBeneficiaryCreditor(
  creditor: CreditorEntry
): Promise<void> {
  if (creditor.CreditorAccount.SchemeName !== 'IBAN') {
    throw httpError(400, 'Consent.FailsControlParameters',
      'CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.')
  }
  if (!isValidUaeIban(creditor.CreditorAccount.Identification)) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'CreditorAccount.Identification is not a valid UAE IBAN.')
  }
  if (!creditor.CreditorAccount.Name?.en && !creditor.CreditorAccount.Name?.ar) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'CreditorAccount.Name MUST include at least one of "en" or "ar".')
  }

  const derivedBic = deriveBicFromIban(creditor.CreditorAccount.Identification)
  if (creditor.CreditorAgent?.Identification && creditor.CreditorAgent.Identification !== derivedBic) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'CreditorAgent.Identification does not match the BIC derived from the IBAN.')
  }

  const r = await lookupRailReachability(derivedBic)
  if (!r.reachableOnAani && !r.reachableOnUaefts) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'Creditor bank is not reachable on AANI or UAEFTS.')
  }
  if (r.canDetermineAccountState && !r.accountCanReceive) {
    throw httpError(400, 'Consent.FailsControlParameters',
      'Creditor account cannot currently receive payments.')
  }
}
`;
const openBeneficiaryPython = `def validate_open_beneficiary_creditor(creditor: dict) -> None:
    acc = creditor["CreditorAccount"]

    if acc["SchemeName"] != "IBAN":
        raise HttpError(400, "Consent.FailsControlParameters",
            'CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.')
    if not is_valid_uae_iban(acc["Identification"]):
        raise HttpError(400, "Consent.FailsControlParameters",
            "CreditorAccount.Identification is not a valid UAE IBAN.")
    name = acc.get("Name") or {}
    if not name.get("en") and not name.get("ar"):
        raise HttpError(400, "Consent.FailsControlParameters",
            'CreditorAccount.Name MUST include at least one of "en" or "ar".')

    derived_bic = derive_bic_from_iban(acc["Identification"])
    agent_bic = (creditor.get("CreditorAgent") or {}).get("Identification")
    if agent_bic and agent_bic != derived_bic:
        raise HttpError(400, "Consent.FailsControlParameters",
            "CreditorAgent.Identification does not match the BIC derived from the IBAN.")

    r = lookup_rail_reachability(derived_bic)
    if not r.reachable_on_aani and not r.reachable_on_uaefts:
        raise HttpError(400, "Consent.FailsControlParameters",
            "Creditor bank is not reachable on AANI or UAEFTS.")
    if r.can_determine_account_state and not r.account_can_receive:
        raise HttpError(400, "Consent.FailsControlParameters",
            "Creditor account cannot currently receive payments.")
`;
const dupCheckNode = `async function rejectIfDuplicateInFlight(
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
const dupCheckPython = `def reject_if_duplicate_in_flight(consent_id: str, payment_creditor: dict, amount: dict) -> None:
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
const paymentRequestJson = `{
  "requestUrl": "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/payments",
  "paymentType": "cbuae-payment",
  "request": {
    "Data": {
      "ConsentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
      "Instruction": {
        "Amount": { "Amount": "125.50", "Currency": "AED" }
      },
      "PaymentPurposeCode": "GDDS",
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
    "x-fapi-auth-date": "Fri, 18 Apr 2026 10:14:05 GMT",
    "x-fapi-customer-ip-address": "203.0.113.42",
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
const paymentSuccessJson = `{
  "data": {
    "id": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "status": "Pending",
    "statusUpdateDateTime": "2026-04-18T10:14:23Z",
    "creationDateTime": "2026-04-18T10:14:23Z",
    "instruction": {
      "Amount": { "amount": "125.50", "currency": "AED" }
    },
    "paymentPurposeCode": "GDDS",
    "openFinanceBilling": { "Type": "Collection" }
  },
  "meta": {}
}
`;
const paymentErrorJson = `{
  "errorCode": "Consent.FailsControlParameters",
  "errorMessage": "Payment creditor does not match any creditor authorised on the consent."
}
`;
const patchSettleJson = `{
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27"
}
`;
const patchRailRejectJson = `{
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
const patchScreeningRejectJson = `{
  "paymentResponse.status": "Rejected",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "LFI.ScreeningRejected",
      "Message": "Payment rejected by LFI screening controls."
    }
  ]
}
`;
const getPaymentJson = `{
  "data": {
    "id": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
    "status": "AcceptedSettlementCompleted",
    "statusUpdateDateTime": "2026-04-18T10:14:31Z",
    "creationDateTime": "2026-04-18T10:14:23Z",
    "instruction": {
      "Amount": { "amount": "125.50", "currency": "AED" }
    },
    "paymentPurposeCode": "GDDS",
    "openFinanceBilling": { "Type": "Collection" }
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const piiDecryptTabs = [{ label: "Node.js", lang: "typescript", code: piiDecryptNode }, { label: "Python", lang: "python", code: piiDecryptPython }];
    const creditorValidateTabs = [{ label: "Node.js", lang: "typescript", code: creditorValidateNode }, { label: "Python", lang: "python", code: creditorValidatePython }];
    const piiPaymentTabs = [{ label: "Node.js", lang: "typescript", code: piiPaymentNode }, { label: "Python", lang: "python", code: piiPaymentPython }];
    const matchPiiTabs = [{ label: "Node.js", lang: "typescript", code: matchPiiNode }, { label: "Python", lang: "python", code: matchPiiPython }];
    const openBeneficiaryTabs = [{ label: "Node.js", lang: "typescript", code: openBeneficiaryNode }, { label: "Python", lang: "python", code: openBeneficiaryPython }];
    const dupCheckTabs = [{ label: "Node.js", lang: "typescript", code: dupCheckNode }, { label: "Python", lang: "python", code: dupCheckPython }];
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b7f31bc4><section class="ed-doc__hero" data-v-b7f31bc4><div class="ed-doc__inner" data-v-b7f31bc4><div class="ed-doc__eyebrow" data-v-b7f31bc4><span class="ed-doc__eyebrow-dash" data-v-b7f31bc4></span> LFI · Banking · Service Initiation · Multi-Payments · Variable On Demand </div><h1 class="ed-doc__title" data-v-b7f31bc4> Variable On Demand — API Guide <span class="ed-doc__read" data-v-b7f31bc4>17 min read</span></h1><p class="ed-doc__lede" data-v-b7f31bc4> Variable On Demand lets a TPP initiate <strong data-v-b7f31bc4>multiple</strong> domestic payments at a <strong data-v-b7f31bc4>variable amount</strong> from a customer&#39;s account at your LFI via the API Hub. The customer authorises the consent once — approving the per-payment maximum and periodic spend limits — and the TPP can then submit individual payments on-demand, each with its own amount, without re-authorisation. The consent may fix a list of up to ten allowed creditors or leave the creditor list open (the &quot;open beneficiaries&quot; model), in which case the TPP supplies the creditor fresh on each payment. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval. </p><p class="ed-doc__lede" data-v-b7f31bc4> The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the <a href="./requirements" data-v-b7f31bc4>Variable On Demand Requirements</a>. This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor list (or confirming it is open), matching the payment-time PII against the consent, and applying the duplicate-in-flight check that is specific to on-demand consent types. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What must be in place before you implement",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before implementing Variable On Demand, ensure the following are in place:`);
                } else {
                  return [
                    createTextVNode("Before implementing Variable On Demand, ensure the following are in place:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>API Hub onboarded</strong> — Your API Hub instance is provisioned and your <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-b7f31bc4${_scopeId2}>environment-specific configuration</a> is complete. </li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Enc1 key pair generated and registered</strong> — The TPP encrypts PII to your LFI&#39;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" data-v-b7f31bc4${_scopeId2}>Enc1 public key</a>. Your LFI MUST hold the corresponding private key and be able to look it up by <code data-v-b7f31bc4${_scopeId2}>kid</code>. </li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Consent Journey implemented</strong> — The <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-b7f31bc4${_scopeId2}>Consent Journey API Guide</a> MUST be implemented first. A payment cannot be initiated without an authorized consent. </li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Ozone Connect connectivity verified</strong> — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" data-v-b7f31bc4${_scopeId2}>Connectivity &amp; Certificates</a>. </li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Variable On Demand beneficiary models advertised</strong> — For each beneficiary model you support, the corresponding flag MUST be set to <code data-v-b7f31bc4${_scopeId2}>true</code> on your authorisation server entry in the Trust Framework: <code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.SingleBeneficiarySupported</code> (consents carrying exactly 1 creditor), <code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported</code> (consents carrying 2–10 creditors), and/or <code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported</code> (consents that omit <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code>). A consent for a model the LFI has not advertised MUST be rejected at consent validation. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub onboarded"),
                      createTextVNode(" — Your API Hub instance is provisioned and your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                      createTextVNode(" is complete. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Enc1 key pair generated and registered"),
                      createTextVNode(" — The TPP encrypts PII to your LFI's "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1 public key"),
                      createTextVNode(". Your LFI MUST hold the corresponding private key and be able to look it up by "),
                      createVNode("code", null, "kid"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent Journey implemented"),
                      createTextVNode(" — The "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                      createTextVNode(" MUST be implemented first. A payment cannot be initiated without an authorized consent. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Ozone Connect connectivity verified"),
                      createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Variable On Demand beneficiary models advertised"),
                      createTextVNode(" — For each beneficiary model you support, the corresponding flag MUST be set to "),
                      createVNode("code", null, "true"),
                      createTextVNode(" on your authorisation server entry in the Trust Framework: "),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.SingleBeneficiarySupported"),
                      createTextVNode(" (consents carrying exactly 1 creditor), "),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported"),
                      createTextVNode(" (consents carrying 2–10 creditors), and/or "),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported"),
                      createTextVNode(" (consents that omit "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode("). A consent for a model the LFI has not advertised MUST be rejected at consent validation. ")
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
                  createTextVNode("Before implementing Variable On Demand, ensure the following are in place:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub onboarded"),
                    createTextVNode(" — Your API Hub instance is provisioned and your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                    createTextVNode(" is complete. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Enc1 key pair generated and registered"),
                    createTextVNode(" — The TPP encrypts PII to your LFI's "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1 public key"),
                    createTextVNode(". Your LFI MUST hold the corresponding private key and be able to look it up by "),
                    createVNode("code", null, "kid"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent Journey implemented"),
                    createTextVNode(" — The "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(" MUST be implemented first. A payment cannot be initiated without an authorized consent. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Ozone Connect connectivity verified"),
                    createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Variable On Demand beneficiary models advertised"),
                    createTextVNode(" — For each beneficiary model you support, the corresponding flag MUST be set to "),
                    createVNode("code", null, "true"),
                    createTextVNode(" on your authorisation server entry in the Trust Framework: "),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.SingleBeneficiarySupported"),
                    createTextVNode(" (consents carrying exactly 1 creditor), "),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported"),
                    createTextVNode(" (consents carrying 2–10 creditors), and/or "),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported"),
                    createTextVNode(" (consents that omit "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode("). A consent for a model the LFI has not advertised MUST be rejected at consent validation. ")
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
        eyebrow: "API Sequence Flow",
        title: "End-to-end Variable On Demand",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Variable On Demand API Flow" }, {
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
              createVNode(_component_APIFlowViewer, { title: "Variable On Demand API Flow" }, {
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
                  _push3(` When a TPP creates a payment consent, the API Hub calls your <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/consent/action/validate</code></a> endpoint <strong data-v-b7f31bc4${_scopeId2}>before</strong> the consent is created. Your LFI MUST validate the consent and respond with <code data-v-b7f31bc4${_scopeId2}>data.status: &quot;valid&quot;</code> or <code data-v-b7f31bc4${_scopeId2}>data.status: &quot;invalid&quot;</code>. An <code data-v-b7f31bc4${_scopeId2}>invalid</code> response prevents the consent being created and the TPP receives an error. `);
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
                  _push3(` The full set of validation rules — <code data-v-b7f31bc4${_scopeId2}>standardVersion</code>, <code data-v-b7f31bc4${_scopeId2}>Initiation.DebtorAccount</code>, <code data-v-b7f31bc4${_scopeId2}>BaseConsentId</code>, <code data-v-b7f31bc4${_scopeId2}>CurrencyRequest</code>, beneficiary-model support, PII conformance, creditor checks — is enumerated in <a href="./requirements#consent-validation" data-v-b7f31bc4${_scopeId2}>Variable On Demand Requirements — Consent Validation</a>. The two parts that need a code walkthrough are <strong data-v-b7f31bc4${_scopeId2}>decrypting the PII</strong> and <strong data-v-b7f31bc4${_scopeId2}>validating the creditor list</strong>; both are covered below. `);
                } else {
                  return [
                    createTextVNode(" The full set of validation rules — "),
                    createVNode("code", null, "standardVersion"),
                    createTextVNode(", "),
                    createVNode("code", null, "Initiation.DebtorAccount"),
                    createTextVNode(", "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(", "),
                    createVNode("code", null, "CurrencyRequest"),
                    createTextVNode(", beneficiary-model support, PII conformance, creditor checks — is enumerated in "),
                    createVNode("a", { href: "./requirements#consent-validation" }, "Variable On Demand Requirements — Consent Validation"),
                    createTextVNode(". The two parts that need a code walkthrough are "),
                    createVNode("strong", null, "decrypting the PII"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "validating the creditor list"),
                    createTextVNode("; both are covered below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Decrypting and validating the PII</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-b7f31bc4${_scopeId2}>consent.PersonalIdentifiableInformation</code> field arrives as a JWE compact string encrypted by the TPP to your LFI&#39;s Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                    createTextVNode(" field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The end-to-end flow is:`);
                } else {
                  return [
                    createTextVNode("The end-to-end flow is:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b7f31bc4${_scopeId2}>Read the <code data-v-b7f31bc4${_scopeId2}>kid</code> from the JWE protected header and look up the matching Enc1 private key</li><li data-v-b7f31bc4${_scopeId2}>Decrypt the JWE → recover the inner JWS</li><li data-v-b7f31bc4${_scopeId2}>Decode the JWS payload (signature verification is <strong data-v-b7f31bc4${_scopeId2}>optional</strong> — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit)</li><li data-v-b7f31bc4${_scopeId2}>Validate the decoded payload against the consent-time PII schema — <code data-v-b7f31bc4${_scopeId2}>AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII</code> in <code data-v-b7f31bc4${_scopeId2}>uae-api-hub-consent-manager-openapi.yaml</code>. <code data-v-b7f31bc4${_scopeId2}>additionalProperties: false</code> is set at every level, so any unexpected field fails validation</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Read the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" from the JWE protected header and look up the matching Enc1 private key")
                    ]),
                    createVNode("li", null, "Decrypt the JWE → recover the inner JWS"),
                    createVNode("li", null, [
                      createTextVNode("Decode the JWS payload (signature verification is "),
                      createVNode("strong", null, "optional"),
                      createTextVNode(" — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit)")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Validate the decoded payload against the consent-time PII schema — "),
                      createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"),
                      createTextVNode(" in "),
                      createVNode("code", null, "uae-api-hub-consent-manager-openapi.yaml"),
                      createTextVNode(". "),
                      createVNode("code", null, "additionalProperties: false"),
                      createTextVNode(" is set at every level, so any unexpected field fails validation")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Happy-path snippet:`);
                } else {
                  return [
                    createTextVNode("Happy-path snippet:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: piiDecryptTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the per-step deep dive — <code data-v-b7f31bc4${_scopeId2}>kid</code> lookup conventions, key import options, the optional JWS signature verification, building the <code data-v-b7f31bc4${_scopeId2}>ajv</code> / <code data-v-b7f31bc4${_scopeId2}>jsonschema</code> validator with all <code data-v-b7f31bc4${_scopeId2}>$ref</code> schemas registered — see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" data-v-b7f31bc4${_scopeId2}>How to Decrypt PII</a>. `);
                } else {
                  return [
                    createTextVNode(" For the per-step deep dive — "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" lookup conventions, key import options, the optional JWS signature verification, building the "),
                    createVNode("code", null, "ajv"),
                    createTextVNode(" / "),
                    createVNode("code", null, "jsonschema"),
                    createTextVNode(" validator with all "),
                    createVNode("code", null, "$ref"),
                    createTextVNode(" schemas registered — see "),
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
                  _push3(` The decrypted consent-time PII for a Variable On Demand consent — shown here in the 2-creditor &quot;multiple beneficiaries&quot; shape — looks like: `);
                } else {
                  return [
                    createTextVNode(' The decrypted consent-time PII for a Variable On Demand consent — shown here in the 2-creditor "multiple beneficiaries" shape — looks like: ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: consentPiiJson,
              lang: "json",
              filename: "decrypted consent-time PII"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In the &quot;open beneficiaries&quot; shape, <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code> is omitted entirely and the creditor is supplied fresh on each payment at <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span> time. `);
                } else {
                  return [
                    createTextVNode(' In the "open beneficiaries" shape, '),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" is omitted entirely and the creditor is supplied fresh on each payment at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" time. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If decryption fails, schema validation fails, or any required field is missing, respond with <code data-v-b7f31bc4${_scopeId2}>invalid</code> per <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent" data-v-b7f31bc4${_scopeId2}>Rejecting an invalid consent</a>. `);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Validating the Creditor list</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For Variable On Demand the creditor shape depends on the beneficiary model the TPP chose: `);
                } else {
                  return [
                    createTextVNode(" For Variable On Demand the creditor shape depends on the beneficiary model the TPP chose: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Single beneficiary</strong> — <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code> is an array of exactly <strong data-v-b7f31bc4${_scopeId2}>1</strong> entry (<code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.SingleBeneficiarySupported</code>)</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Multiple beneficiaries</strong> — <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code> is an array of <strong data-v-b7f31bc4${_scopeId2}>2–10</strong> entries (<code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported</code>)</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Open beneficiaries</strong> — <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code> is <strong data-v-b7f31bc4${_scopeId2}>omitted</strong> entirely (<code data-v-b7f31bc4${_scopeId2}>ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported</code>). The creditor is supplied and validated at payment time — see <a href="#open-beneficiary" data-v-b7f31bc4${_scopeId2}>Validating an open-beneficiary creditor at payment time</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Single beneficiary"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" is an array of exactly "),
                      createVNode("strong", null, "1"),
                      createTextVNode(" entry ("),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.SingleBeneficiarySupported"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Multiple beneficiaries"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" is an array of "),
                      createVNode("strong", null, "2–10"),
                      createTextVNode(" entries ("),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Open beneficiaries"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" is "),
                      createVNode("strong", null, "omitted"),
                      createTextVNode(" entirely ("),
                      createVNode("code", null, "ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported"),
                      createTextVNode("). The creditor is supplied and validated at payment time — see "),
                      createVNode("a", { href: "#open-beneficiary" }, "Validating an open-beneficiary creditor at payment time")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full Creditor rules — cardinality, mandatory fields, BIC derivation — are in <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-b7f31bc4${_scopeId2}>Creditor</a>. This section walks through the consent-time validation in code. Each entry in the list is checked independently against the same four-part rule: `);
                } else {
                  return [
                    createTextVNode(" The full Creditor rules — cardinality, mandatory fields, BIC derivation — are in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(". This section walks through the consent-time validation in code. Each entry in the list is checked independently against the same four-part rule: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Cardinality</strong> — 1–10 entries if present; if absent, the beneficiary model is &quot;open&quot; and per-entry validation is deferred to payment time</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Mandatory fields</strong> — <code data-v-b7f31bc4${_scopeId2}>CreditorAccount.SchemeName == &quot;IBAN&quot;</code>, <code data-v-b7f31bc4${_scopeId2}>Identification</code> is a syntactically valid UAE IBAN, at least one of <code data-v-b7f31bc4${_scopeId2}>Name.en</code> or <code data-v-b7f31bc4${_scopeId2}>Name.ar</code> is present</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>BIC consistency</strong> — derive the BIC from the IBAN; if <code data-v-b7f31bc4${_scopeId2}>CreditorAgent.Identification</code> was supplied it MUST match</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Domestic rail reachability</strong> — the receiving bank is reachable on AANI or UAEFTS, and (where the LFI can determine it) the receiving account is in a state that can accept a payment</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cardinality"),
                      createTextVNode(' — 1–10 entries if present; if absent, the beneficiary model is "open" and per-entry validation is deferred to payment time')
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Mandatory fields"),
                      createTextVNode(" — "),
                      createVNode("code", null, 'CreditorAccount.SchemeName == "IBAN"'),
                      createTextVNode(", "),
                      createVNode("code", null, "Identification"),
                      createTextVNode(" is a syntactically valid UAE IBAN, at least one of "),
                      createVNode("code", null, "Name.en"),
                      createTextVNode(" or "),
                      createVNode("code", null, "Name.ar"),
                      createTextVNode(" is present")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "BIC consistency"),
                      createTextVNode(" — derive the BIC from the IBAN; if "),
                      createVNode("code", null, "CreditorAgent.Identification"),
                      createTextVNode(" was supplied it MUST match")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Domestic rail reachability"),
                      createTextVNode(" — the receiving bank is reachable on AANI or UAEFTS, and (where the LFI can determine it) the receiving account is in a state that can accept a payment")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Steps 2–4 are universal; step 1 depends on the advertised beneficiary model. The snippet below covers all three models. `);
                } else {
                  return [
                    createTextVNode(" Steps 2–4 are universal; step 1 depends on the advertised beneficiary model. The snippet below covers all three models. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: creditorValidateTabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Validating the DebtorAccount</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the TPP supplied <code data-v-b7f31bc4${_scopeId2}>Initiation.DebtorAccount</code> in the consent PII, your LFI MUST also validate it before approving the consent: <code data-v-b7f31bc4${_scopeId2}>SchemeName</code> is <code data-v-b7f31bc4${_scopeId2}>IBAN</code>, the IBAN corresponds to an account held at this LFI and reachable through this API Hub integration, and the account is in a state that permits payment initiation (not blocked, dormant, or closed). Customer ownership of the account is <strong data-v-b7f31bc4${_scopeId2}>not</strong> checked here — it is checked later during the authorisation journey, once the customer has authenticated. `);
                } else {
                  return [
                    createTextVNode(" If the TPP supplied "),
                    createVNode("code", null, "Initiation.DebtorAccount"),
                    createTextVNode(" in the consent PII, your LFI MUST also validate it before approving the consent: "),
                    createVNode("code", null, "SchemeName"),
                    createTextVNode(" is "),
                    createVNode("code", null, "IBAN"),
                    createTextVNode(", the IBAN corresponds to an account held at this LFI and reachable through this API Hub integration, and the account is in a state that permits payment initiation (not blocked, dormant, or closed). Customer ownership of the account is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" checked here — it is checked later during the authorisation journey, once the customer has authenticated. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full check list and the <code data-v-b7f31bc4${_scopeId2}>invalid</code> response shape (with <code data-v-b7f31bc4${_scopeId2}>code: InvalidDebtorAccount</code>) are in <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" data-v-b7f31bc4${_scopeId2}>Debtor Account</a>. `);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Returning the validate response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If <code data-v-b7f31bc4${_scopeId2}>validateCreditorList</code> (or the DebtorAccount checks) returns a non-null result, return it inside <code data-v-b7f31bc4${_scopeId2}>data</code> on the validate response: `);
                } else {
                  return [
                    createTextVNode(" If "),
                    createVNode("code", null, "validateCreditorList"),
                    createTextVNode(" (or the DebtorAccount checks) returns a non-null result, return it inside "),
                    createVNode("code", null, "data"),
                    createTextVNode(" on the validate response: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: invalidResponseJson,
              lang: "json",
              filename: "invalid validate response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide#validate-post-consent-action-validate" data-v-b7f31bc4${_scopeId2}>Consent Events &amp; Actions — API Guide</a> for the full validate request and response schema. `);
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
                  createTextVNode(" The full set of validation rules — "),
                  createVNode("code", null, "standardVersion"),
                  createTextVNode(", "),
                  createVNode("code", null, "Initiation.DebtorAccount"),
                  createTextVNode(", "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(", "),
                  createVNode("code", null, "CurrencyRequest"),
                  createTextVNode(", beneficiary-model support, PII conformance, creditor checks — is enumerated in "),
                  createVNode("a", { href: "./requirements#consent-validation" }, "Variable On Demand Requirements — Consent Validation"),
                  createTextVNode(". The two parts that need a code walkthrough are "),
                  createVNode("strong", null, "decrypting the PII"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "validating the creditor list"),
                  createTextVNode("; both are covered below. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Decrypting and validating the PII"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "consent.PersonalIdentifiableInformation"),
                  createTextVNode(" field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The end-to-end flow is:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Read the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" from the JWE protected header and look up the matching Enc1 private key")
                  ]),
                  createVNode("li", null, "Decrypt the JWE → recover the inner JWS"),
                  createVNode("li", null, [
                    createTextVNode("Decode the JWS payload (signature verification is "),
                    createVNode("strong", null, "optional"),
                    createTextVNode(" — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit)")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Validate the decoded payload against the consent-time PII schema — "),
                    createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"),
                    createTextVNode(" in "),
                    createVNode("code", null, "uae-api-hub-consent-manager-openapi.yaml"),
                    createTextVNode(". "),
                    createVNode("code", null, "additionalProperties: false"),
                    createTextVNode(" is set at every level, so any unexpected field fails validation")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Happy-path snippet:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: piiDecryptTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the per-step deep dive — "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" lookup conventions, key import options, the optional JWS signature verification, building the "),
                  createVNode("code", null, "ajv"),
                  createTextVNode(" / "),
                  createVNode("code", null, "jsonschema"),
                  createTextVNode(" validator with all "),
                  createVNode("code", null, "$ref"),
                  createTextVNode(" schemas registered — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" }, "How to Decrypt PII"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(' The decrypted consent-time PII for a Variable On Demand consent — shown here in the 2-creditor "multiple beneficiaries" shape — looks like: ')
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: consentPiiJson,
                lang: "json",
                filename: "decrypted consent-time PII"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(' In the "open beneficiaries" shape, '),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(" is omitted entirely and the creditor is supplied fresh on each payment at "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" time. ")
                ]),
                _: 1
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
              createVNode("h3", { class: "ed-doc__subhead" }, "Validating the Creditor list"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For Variable On Demand the creditor shape depends on the beneficiary model the TPP chose: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Single beneficiary"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" is an array of exactly "),
                    createVNode("strong", null, "1"),
                    createTextVNode(" entry ("),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.SingleBeneficiarySupported"),
                    createTextVNode(")")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Multiple beneficiaries"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" is an array of "),
                    createVNode("strong", null, "2–10"),
                    createTextVNode(" entries ("),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported"),
                    createTextVNode(")")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Open beneficiaries"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" is "),
                    createVNode("strong", null, "omitted"),
                    createTextVNode(" entirely ("),
                    createVNode("code", null, "ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported"),
                    createTextVNode("). The creditor is supplied and validated at payment time — see "),
                    createVNode("a", { href: "#open-beneficiary" }, "Validating an open-beneficiary creditor at payment time")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full Creditor rules — cardinality, mandatory fields, BIC derivation — are in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                  createTextVNode(". This section walks through the consent-time validation in code. Each entry in the list is checked independently against the same four-part rule: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cardinality"),
                    createTextVNode(' — 1–10 entries if present; if absent, the beneficiary model is "open" and per-entry validation is deferred to payment time')
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Mandatory fields"),
                    createTextVNode(" — "),
                    createVNode("code", null, 'CreditorAccount.SchemeName == "IBAN"'),
                    createTextVNode(", "),
                    createVNode("code", null, "Identification"),
                    createTextVNode(" is a syntactically valid UAE IBAN, at least one of "),
                    createVNode("code", null, "Name.en"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Name.ar"),
                    createTextVNode(" is present")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "BIC consistency"),
                    createTextVNode(" — derive the BIC from the IBAN; if "),
                    createVNode("code", null, "CreditorAgent.Identification"),
                    createTextVNode(" was supplied it MUST match")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Domestic rail reachability"),
                    createTextVNode(" — the receiving bank is reachable on AANI or UAEFTS, and (where the LFI can determine it) the receiving account is in a state that can accept a payment")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Steps 2–4 are universal; step 1 depends on the advertised beneficiary model. The snippet below covers all three models. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: creditorValidateTabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Validating the DebtorAccount"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the TPP supplied "),
                  createVNode("code", null, "Initiation.DebtorAccount"),
                  createTextVNode(" in the consent PII, your LFI MUST also validate it before approving the consent: "),
                  createVNode("code", null, "SchemeName"),
                  createTextVNode(" is "),
                  createVNode("code", null, "IBAN"),
                  createTextVNode(", the IBAN corresponds to an account held at this LFI and reachable through this API Hub integration, and the account is in a state that permits payment initiation (not blocked, dormant, or closed). Customer ownership of the account is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" checked here — it is checked later during the authorisation journey, once the customer has authenticated. ")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If "),
                  createVNode("code", null, "validateCreditorList"),
                  createTextVNode(" (or the DebtorAccount checks) returns a non-null result, return it inside "),
                  createVNode("code", null, "data"),
                  createTextVNode(" on the validate response: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: invalidResponseJson,
                lang: "json",
                filename: "invalid validate response"
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
        title: "Authorize the customer once at your LFI",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After consent creation passes validation, the TPP redirects the customer to your LFI&#39;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-b7f31bc4${_scopeId2}>authorization endpoint</a> and your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, present the debtor account selection screen subject to the rules in <a href="./requirements#authorization-account-selection" data-v-b7f31bc4${_scopeId2}>Authorization — Account Selection</a>, patch the selected debtor account and customer identifier onto the consent, and redirect back to the Hub. `);
                } else {
                  return [
                    createTextVNode(" After consent creation passes validation, the TPP redirects the customer to your LFI's "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "authorization endpoint"),
                    createTextVNode(" and your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, present the debtor account selection screen subject to the rules in "),
                    createVNode("a", { href: "./requirements#authorization-account-selection" }, "Authorization — Account Selection"),
                    createTextVNode(", patch the selected debtor account and customer identifier onto the consent, and redirect back to the Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The endpoints your LFI implements against the API Hub for this flow are:`);
                } else {
                  return [
                    createTextVNode("The endpoints your LFI implements against the API Hub for this flow are:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Endpoint</th><th data-v-b7f31bc4${_scopeId2}>Direction</th><th data-v-b7f31bc4${_scopeId2}>Purpose</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/auth</code></a></td><td data-v-b7f31bc4${_scopeId2}>LFI → API Hub</td><td data-v-b7f31bc4${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-b7f31bc4${_scopeId2}>LFI → API Hub</td><td data-v-b7f31bc4${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--patch" data-v-b7f31bc4${_scopeId2}>PATCH</span><code data-v-b7f31bc4${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-b7f31bc4${_scopeId2}>LFI → API Hub</td><td data-v-b7f31bc4${_scopeId2}>Update consent status, customer identifiers, and the selected debtor account</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-b7f31bc4${_scopeId2}>LFI → API Hub</td><td data-v-b7f31bc4${_scopeId2}>Complete the interaction and redirect back to the TPP successfully</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-b7f31bc4${_scopeId2}>LFI → API Hub</td><td data-v-b7f31bc4${_scopeId2}>Complete the interaction and redirect back to the TPP with a failure</td></tr></tbody></table>`);
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
                          createVNode("td", null, "Complete the interaction and redirect back to the TPP successfully")
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
                          createVNode("td", null, "Complete the interaction and redirect back to the TPP with a failure")
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
                  _push3(` Full details are in the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-b7f31bc4${_scopeId2}>Consent Journey API Guide</a>. `);
                } else {
                  return [
                    createTextVNode(" Full details are in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>After the consent is authorized</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the TPP submits a payment instruction to the API Hub&#39;s resource server, the API Hub validates the access token, checks the consent is <code data-v-b7f31bc4${_scopeId2}>Authorised</code>, checks the instructed amount is within the consent&#39;s control parameters (per-payment maximum, per-period cumulative limits, per-period count), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></a> endpoint covered in the next section. `);
                } else {
                  return [
                    createTextVNode(" When the TPP submits a payment instruction to the API Hub's resource server, the API Hub validates the access token, checks the consent is "),
                    createVNode("code", null, "Authorised"),
                    createTextVNode(", checks the instructed amount is within the consent's control parameters (per-payment maximum, per-period cumulative limits, per-period count), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect "),
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
                  _push3(` The Hub does <strong data-v-b7f31bc4${_scopeId2}>not</strong> decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time are the LFI&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" The Hub does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time are the LFI's responsibility. ")
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
                  createTextVNode(" and your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, present the debtor account selection screen subject to the rules in "),
                  createVNode("a", { href: "./requirements#authorization-account-selection" }, "Authorization — Account Selection"),
                  createTextVNode(", patch the selected debtor account and customer identifier onto the consent, and redirect back to the Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The endpoints your LFI implements against the API Hub for this flow are:")
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
                        createVNode("td", null, "Complete the interaction and redirect back to the TPP successfully")
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
                        createVNode("td", null, "Complete the interaction and redirect back to the TPP with a failure")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Full details are in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "After the consent is authorized"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the TPP submits a payment instruction to the API Hub's resource server, the API Hub validates the access token, checks the consent is "),
                  createVNode("code", null, "Authorised"),
                  createTextVNode(", checks the instructed amount is within the consent's control parameters (per-payment maximum, per-period cumulative limits, per-period count), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect "),
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
                  createTextVNode(" decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time are the LFI's responsibility. ")
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
        eyebrow: "Endpoint",
        title: "POST /payments",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-b7f31bc4${_scopeId}><span class="http-badge http-post" data-v-b7f31bc4${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-b7f31bc4${_scopeId}>/payments</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span> is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Variable On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent&#39;s creditor list (or validate the freshly-supplied creditor for open-beneficiary consents), run the synchronous validations listed in <a href="./requirements#post-payments-payment-execution" data-v-b7f31bc4${_scopeId2}>POST <code data-v-b7f31bc4${_scopeId2}>/payments</code> Requirements</a> — including the duplicate-in-flight check that is specific to on-demand consent types — create the payment record, and return <code data-v-b7f31bc4${_scopeId2}>201</code> with the assigned <code data-v-b7f31bc4${_scopeId2}>PaymentId</code>. `);
                } else {
                  return [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Variable On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent's creditor list (or validate the freshly-supplied creditor for open-beneficiary consents), run the synchronous validations listed in "),
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Screening, rail submission, and status propagation happen <strong data-v-b7f31bc4${_scopeId2}>after</strong> the <code data-v-b7f31bc4${_scopeId2}>201</code> response — see <a href="#after-201" data-v-b7f31bc4${_scopeId2}>After returning 201</a>. `);
                } else {
                  return [
                    createTextVNode(" Screening, rail submission, and status propagation happen "),
                    createVNode("strong", null, "after"),
                    createTextVNode(" the "),
                    createVNode("code", null, "201"),
                    createTextVNode(" response — see "),
                    createVNode("a", { href: "#after-201" }, "After returning 201"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="common-request-headers" class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Common request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Header</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-provider-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-aspsp-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes <em data-v-b7f31bc4${_scopeId2}>(deprecated)</em></td><td data-v-b7f31bc4${_scopeId2}>Deprecated alias for <code data-v-b7f31bc4${_scopeId2}>o3-provider-id</code>. Will be removed in a future version — use <code data-v-b7f31bc4${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-org-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-client-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-api-uri</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-api-operation</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The HTTP method of the operation carried out by the TPP (<code data-v-b7f31bc4${_scopeId2}>POST</code>)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-b7f31bc4${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-consent-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The <code data-v-b7f31bc4${_scopeId2}>consentId</code> for which this call is being made — the lookup key for the stored consent context (see <a href="#match-pii" data-v-b7f31bc4${_scopeId2}>Matching the PII against the consent</a>)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-psu-identifier</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Base64-encoded customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
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
                            createVNode("code", null, "o3-provider-id"),
                            createTextVNode(". Will be removed in a future version — use "),
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
                            createTextVNode("The HTTP method of the operation carried out by the TPP ("),
                            createVNode("code", null, "POST"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-ozone-interaction-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Hub-generated interaction ID. Equals "),
                            createVNode("code", null, "o3-caller-interaction-id"),
                            createTextVNode(" if the TPP provided one")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-consent-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "consentId"),
                            createTextVNode(" for which this call is being made — the lookup key for the stored consent context (see "),
                            createVNode("a", { href: "#match-pii" }, "Matching the PII against the consent"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-psu-identifier")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Base64-encoded customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization")
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
                  _push3(`<p data-v-b7f31bc4${_scopeId2}> The headers the TPP set on its original call to the API Hub — including <code data-v-b7f31bc4${_scopeId2}>x-fapi-interaction-id</code>, <code data-v-b7f31bc4${_scopeId2}>x-fapi-auth-date</code>, <code data-v-b7f31bc4${_scopeId2}>x-customer-user-agent</code>, and <code data-v-b7f31bc4${_scopeId2}>x-idempotency-key</code> — are forwarded to your LFI <strong data-v-b7f31bc4${_scopeId2}>inside the request body</strong> as <code data-v-b7f31bc4${_scopeId2}>requestHeaders</code>, not on the HTTP headers of the API Hub → LFI call. On-demand consent types do <strong data-v-b7f31bc4${_scopeId2}>not</strong> require <code data-v-b7f31bc4${_scopeId2}>x-fapi-customer-ip-address</code> on every payment — the customer may not be present when the TPP triggers an on-demand payment. </p>`);
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
                      createTextVNode(", not on the HTTP headers of the API Hub → LFI call. On-demand consent types do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" require "),
                      createVNode("code", null, "x-fapi-customer-ip-address"),
                      createTextVNode(" on every payment — the customer may not be present when the TPP triggers an on-demand payment. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>Content-Type: application/json</code>. The Hub sends a plain JSON payload (not a JWS) containing the payment details, the headers the TPP supplied, and the TPP&#39;s directory record. `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". The Hub sends a plain JSON payload (not a JWS) containing the payment details, the headers the TPP supplied, and the TPP's directory record. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Top-level fields</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Field</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>requestUrl</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>The TPP-facing resource URL the TPP called, e.g. <code data-v-b7f31bc4${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/payments</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentType</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The payment type. MUST be <code data-v-b7f31bc4${_scopeId2}>cbuae-payment</code> for domestic Variable On Demand</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>request.Data</code></td><td data-v-b7f31bc4${_scopeId2}>object</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The payment payload — see <code data-v-b7f31bc4${_scopeId2}>request.Data</code> below</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>requestHeaders</code></td><td data-v-b7f31bc4${_scopeId2}>object</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The complete set of HTTP headers the TPP sent to the API Hub. The TPP&#39;s FAPI headers live here</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>tpp</code></td><td data-v-b7f31bc4${_scopeId2}>object</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The TPP&#39;s directory record (<code data-v-b7f31bc4${_scopeId2}>clientId</code>, <code data-v-b7f31bc4${_scopeId2}>orgId</code>, <code data-v-b7f31bc4${_scopeId2}>tppId</code>, <code data-v-b7f31bc4${_scopeId2}>tppName</code>, <code data-v-b7f31bc4${_scopeId2}>softwareStatementId</code>, <code data-v-b7f31bc4${_scopeId2}>decodedSsa</code>, optional <code data-v-b7f31bc4${_scopeId2}>directoryRecord</code>)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>supplementaryInformation</code></td><td data-v-b7f31bc4${_scopeId2}>object</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Free-form pass-through context. The LFI MUST safely ignore unrecognised properties</td></tr></tbody></table>`);
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
                          createVNode("td", null, [
                            createTextVNode("The TPP-facing resource URL the TPP called, e.g. "),
                            createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentType")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The payment type. MUST be "),
                            createVNode("code", null, "cbuae-payment"),
                            createTextVNode(" for domestic Variable On Demand")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "request.Data")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The payment payload — see "),
                            createVNode("code", null, "request.Data"),
                            createTextVNode(" below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "requestHeaders")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The complete set of HTTP headers the TPP sent to the API Hub. The TPP's FAPI headers live here")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "tpp")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The TPP's directory record ("),
                            createVNode("code", null, "clientId"),
                            createTextVNode(", "),
                            createVNode("code", null, "orgId"),
                            createTextVNode(", "),
                            createVNode("code", null, "tppId"),
                            createTextVNode(", "),
                            createVNode("code", null, "tppName"),
                            createTextVNode(", "),
                            createVNode("code", null, "softwareStatementId"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa"),
                            createTextVNode(", optional "),
                            createVNode("code", null, "directoryRecord"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "supplementaryInformation")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Free-form pass-through context. The LFI MUST safely ignore unrecognised properties")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>request.Data</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Field</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>ConsentId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The consent the payment is being executed under. MUST equal the <code data-v-b7f31bc4${_scopeId2}>o3-consent-id</code> header</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Instruction.Amount.Amount</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Decimal amount with two fraction digits, e.g. <code data-v-b7f31bc4${_scopeId2}>125.50</code>. The Hub has already enforced it is within the consent&#39;s per-payment maximum and periodic limits before forwarding</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Instruction.Amount.Currency</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>ISO-4217 currency code. MUST be <code data-v-b7f31bc4${_scopeId2}>AED</code> for domestic payments</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>PaymentPurposeCode</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>3-letter ISO 20022 purpose code, e.g. <code data-v-b7f31bc4${_scopeId2}>GDDS</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>PersonalIdentifiableInformation</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Encrypted PII payload as a JWE compact string. Carries the creditor — required whether the consent fixed a list or left beneficiaries open — see <a href="#read-pii" data-v-b7f31bc4${_scopeId2}>Reading the PII at payment time</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>DebtorReference</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Reference shown on the debtor&#39;s statement</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>CreditorReference</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Reference shown on the creditor&#39;s statement</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>OpenFinanceBilling.Type</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Billing type, e.g. <code data-v-b7f31bc4${_scopeId2}>Collection</code>, <code data-v-b7f31bc4${_scopeId2}>PushP2P</code>, <code data-v-b7f31bc4${_scopeId2}>PullP2P</code>, <code data-v-b7f31bc4${_scopeId2}>Me2Me</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>OpenFinanceBilling.MerchantId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Optional merchant identifier</td></tr></tbody></table>`);
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
                            createTextVNode("The consent the payment is being executed under. MUST equal the "),
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
                            createTextVNode("Decimal amount with two fraction digits, e.g. "),
                            createVNode("code", null, "125.50"),
                            createTextVNode(". The Hub has already enforced it is within the consent's per-payment maximum and periodic limits before forwarding")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Instruction.Amount.Currency")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("ISO-4217 currency code. MUST be "),
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
                            createVNode("code", null, "GDDS")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PersonalIdentifiableInformation")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Encrypted PII payload as a JWE compact string. Carries the creditor — required whether the consent fixed a list or left beneficiaries open — see "),
                            createVNode("a", { href: "#read-pii" }, "Reading the PII at payment time")
                          ])
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
                          createVNode("td", null, [
                            createTextVNode("Billing type, e.g. "),
                            createVNode("code", null, "Collection"),
                            createTextVNode(", "),
                            createVNode("code", null, "PushP2P"),
                            createTextVNode(", "),
                            createVNode("code", null, "PullP2P"),
                            createTextVNode(", "),
                            createVNode("code", null, "Me2Me")
                          ])
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the full schema — including <code data-v-b7f31bc4${_scopeId2}>tpp</code> and <code data-v-b7f31bc4${_scopeId2}>decodedSsa</code> field-by-field — see the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" data-v-b7f31bc4${_scopeId2}>POST <code data-v-b7f31bc4${_scopeId2}>/payments</code> API Reference</a>. `);
                } else {
                  return [
                    createTextVNode(" For the full schema — including "),
                    createVNode("code", null, "tpp"),
                    createTextVNode(" and "),
                    createVNode("code", null, "decodedSsa"),
                    createTextVNode(" field-by-field — see the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Request example</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentRequestJson,
              lang: "json",
              filename: "POST /payments request"
            }, null, _parent2, _scopeId));
            _push2(`<h3 id="read-pii" class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Reading the PII at payment time</h3>`);
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
                  _push3(`<li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code> is a single object</strong>, not an array — each payment pays exactly one creditor, whether or not a list was fixed at consent time</li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>DebtorAccount</code> is absent</strong> — the debtor was selected and pinned during consent authorisation</li><li data-v-b7f31bc4${_scopeId2}>The schema to validate against is <code data-v-b7f31bc4${_scopeId2}>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code> in <code data-v-b7f31bc4${_scopeId2}>uae-ozone-connect-bank-service-initiation-openapi.yaml</code> — <strong data-v-b7f31bc4${_scopeId2}>not</strong> the consent-time schema</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "Initiation.Creditor"),
                        createTextVNode(" is a single object")
                      ]),
                      createTextVNode(", not an array — each payment pays exactly one creditor, whether or not a list was fixed at consent time")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "DebtorAccount"),
                        createTextVNode(" is absent")
                      ]),
                      createTextVNode(" — the debtor was selected and pinned during consent authorisation")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The schema to validate against is "),
                      createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                      createTextVNode(" in "),
                      createVNode("code", null, "uae-ozone-connect-bank-service-initiation-openapi.yaml"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" the consent-time schema")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The decrypt + decode flow is identical to consent time — read the <code data-v-b7f31bc4${_scopeId2}>kid</code>, decrypt with the matching Enc1 private key, decode the JWS payload. Re-use the helper from <a href="#consent-validation" data-v-b7f31bc4${_scopeId2}>Decrypting and validating the PII</a>; only swap the schema: `);
                } else {
                  return [
                    createTextVNode(" The decrypt + decode flow is identical to consent time — read the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(", decrypt with the matching Enc1 private key, decode the JWS payload. Re-use the helper from "),
                    createVNode("a", { href: "#consent-validation" }, "Decrypting and validating the PII"),
                    createTextVNode("; only swap the schema: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: piiPaymentTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If decryption fails, reject with <code data-v-b7f31bc4${_scopeId2}>400 JWE.DecryptionError</code>. If schema validation fails (missing required field, wrong type, or additional property), reject with <code data-v-b7f31bc4${_scopeId2}>400 Body.InvalidFormat</code>. `);
                } else {
                  return [
                    createTextVNode(" If decryption fails, reject with "),
                    createVNode("code", null, "400 JWE.DecryptionError"),
                    createTextVNode(". If schema validation fails (missing required field, wrong type, or additional property), reject with "),
                    createVNode("code", null, "400 Body.InvalidFormat"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A decrypted payment-time PII for Variable On Demand looks like:`);
                } else {
                  return [
                    createTextVNode("A decrypted payment-time PII for Variable On Demand looks like:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentPiiJson,
              lang: "json",
              filename: "decrypted payment-time PII"
            }, null, _parent2, _scopeId));
            _push2(`<h3 id="match-pii" class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Matching the PII against the consent</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Per <a href="./requirements#post-payments-payment-execution" data-v-b7f31bc4${_scopeId2}>POST <code data-v-b7f31bc4${_scopeId2}>/payments</code> Requirements</a> rule 2, Variable On Demand splits into two flows at payment time depending on whether the consent fixed a list of creditors or left beneficiaries open: `);
                } else {
                  return [
                    createTextVNode(" Per "),
                    createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" Requirements")
                    ]),
                    createTextVNode(" rule 2, Variable On Demand splits into two flows at payment time depending on whether the consent fixed a list of creditors or left beneficiaries open: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Consent fixed a creditor list (1–10 entries)</strong> — the submitted creditor MUST exactly match <strong data-v-b7f31bc4${_scopeId2}>one</strong> of the consent-time entries. Mismatch → <code data-v-b7f31bc4${_scopeId2}>400 Consent.FailsControlParameters</code></li><li data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Consent left beneficiaries open</strong> — there is nothing to match against; the deferred creditor validation runs here instead. A failed check → <code data-v-b7f31bc4${_scopeId2}>400 Consent.FailsControlParameters</code></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent fixed a creditor list (1–10 entries)"),
                      createTextVNode(" — the submitted creditor MUST exactly match "),
                      createVNode("strong", null, "one"),
                      createTextVNode(" of the consent-time entries. Mismatch → "),
                      createVNode("code", null, "400 Consent.FailsControlParameters")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent left beneficiaries open"),
                      createTextVNode(" — there is nothing to match against; the deferred creditor validation runs here instead. A failed check → "),
                      createVNode("code", null, "400 Consent.FailsControlParameters")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The link between the payment and the consent is the <code data-v-b7f31bc4${_scopeId2}>o3-consent-id</code> request header (also surfaced as <code data-v-b7f31bc4${_scopeId2}>request.Data.ConsentId</code> in the body). The fixed-list flow has two implementation patterns; the open-beneficiaries flow is a single path covered in the next subsection. `);
                } else {
                  return [
                    createTextVNode(" The link between the payment and the consent is the "),
                    createVNode("code", null, "o3-consent-id"),
                    createTextVNode(" request header (also surfaced as "),
                    createVNode("code", null, "request.Data.ConsentId"),
                    createTextVNode(" in the body). The fixed-list flow has two implementation patterns; the open-beneficiaries flow is a single path covered in the next subsection. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Pattern A — LFI persisted the decrypted creditor list at consent time</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The most common pattern. At consent validation, after you decrypted and validated the consent-time PII, you persisted the creditor list keyed by <code data-v-b7f31bc4${_scopeId2}>consentId</code>. At payment time you fetch it and search for an exact match against the payment-time creditor. `);
                } else {
                  return [
                    createTextVNode(" The most common pattern. At consent validation, after you decrypted and validated the consent-time PII, you persisted the creditor list keyed by "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(". At payment time you fetch it and search for an exact match against the payment-time creditor. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: matchPiiTabs }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Pattern B — LFI did not persist the consent-time PII</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your LFI did not persist the decrypted PII at consent time, fetch the consent from the API Hub via <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/consents/{consentId}</code></a>, decrypt the consent&#39;s <code data-v-b7f31bc4${_scopeId2}>PersonalIdentifiableInformation</code> field, and run the same matching logic: for a fixed list, <code data-v-b7f31bc4${_scopeId2}>some(isExactMatch, paymentCreditor)</code> against <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code>; for an open-beneficiary consent (the field is absent), fall through to the open-beneficiary validation below. `);
                } else {
                  return [
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
                    createTextVNode(" field, and run the same matching logic: for a fixed list, "),
                    createVNode("code", null, "some(isExactMatch, paymentCreditor)"),
                    createTextVNode(" against "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode("; for an open-beneficiary consent (the field is absent), fall through to the open-beneficiary validation below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Pattern B trades stored state for a network round-trip and a second decryption on every payment. Choose Pattern A unless persistence is not an option for your LFI. `);
                } else {
                  return [
                    createTextVNode(" Pattern B trades stored state for a network round-trip and a second decryption on every payment. Choose Pattern A unless persistence is not an option for your LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="open-beneficiary" class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Validating an open-beneficiary creditor at payment time</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the consent omitted <code data-v-b7f31bc4${_scopeId2}>Initiation.Creditor</code>, the creditor validation that would normally run at consent-validate time is deferred to <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span>. The checks are the same four-part rule from consent validation — mandatory fields, BIC consistency, domestic rail reachability. The only differences are the error shape (HTTP <code data-v-b7f31bc4${_scopeId2}>400</code> with <code data-v-b7f31bc4${_scopeId2}>errorCode: Consent.FailsControlParameters</code>, rather than the <code data-v-b7f31bc4${_scopeId2}>invalid</code> JSON body) and the fact that only a single creditor is being checked. `);
                } else {
                  return [
                    createTextVNode(" When the consent omitted "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(", the creditor validation that would normally run at consent-validate time is deferred to "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(". The checks are the same four-part rule from consent validation — mandatory fields, BIC consistency, domestic rail reachability. The only differences are the error shape (HTTP "),
                    createVNode("code", null, "400"),
                    createTextVNode(" with "),
                    createVNode("code", null, "errorCode: Consent.FailsControlParameters"),
                    createTextVNode(", rather than the "),
                    createVNode("code", null, "invalid"),
                    createTextVNode(" JSON body) and the fact that only a single creditor is being checked. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: openBeneficiaryTabs }, null, _parent2, _scopeId));
            _push2(`<h3 id="duplicate-in-flight" class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Duplicate-in-flight check</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Per <a href="./requirements#post-payments-payment-execution" data-v-b7f31bc4${_scopeId2}>POST <code data-v-b7f31bc4${_scopeId2}>/payments</code> Requirements</a> rule 5, Variable On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in <code data-v-b7f31bc4${_scopeId2}>Pending</code> status. If so, reject the new request with <code data-v-b7f31bc4${_scopeId2}>409 Payment.DuplicateInFlight</code>. `);
                } else {
                  return [
                    createTextVNode(" Per "),
                    createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" Requirements")
                    ]),
                    createTextVNode(" rule 5, Variable On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in "),
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
                  _push3(` This is distinct from <code data-v-b7f31bc4${_scopeId2}>x-idempotency-key</code> handling: the idempotency key catches TPP retries of the same HTTP request, while this rule catches genuinely separate payment intents that happen to duplicate a still-in-flight one. `);
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
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: dupCheckTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the prior payment has left <code data-v-b7f31bc4${_scopeId2}>Pending</code> (reached <code data-v-b7f31bc4${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedWithoutPosting</code>, or <code data-v-b7f31bc4${_scopeId2}>Rejected</code>), a subsequent identical payment is permitted. `);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>Content-Type: application/json</code>. Return <code data-v-b7f31bc4${_scopeId2}>201</code> on successful payment record creation. `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". Return "),
                    createVNode("code", null, "201"),
                    createTextVNode(" on successful payment record creation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Field</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.id</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The LFI-assigned <code data-v-b7f31bc4${_scopeId2}>PaymentId</code>. MUST be unique within your payment system, MUST NOT be reassigned, and MUST resolve to the same payment for the full 1-year <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code></span> sustain window</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.consentId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>The consent under which the payment was created</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.paymentTransactionId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>End-to-end identifier from the rail. Omit until AANI/UAEFTS has assigned one — do not return an empty string</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.status</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>One of <code data-v-b7f31bc4${_scopeId2}>Pending</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-b7f31bc4${_scopeId2}>Rejected</code>, <code data-v-b7f31bc4${_scopeId2}>Received</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.statusUpdateDateTime</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>ISO 8601 timestamp of the last status update</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.creationDateTime</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>ISO 8601 timestamp the payment record was created</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.instruction.Amount.amount</code> / <code data-v-b7f31bc4${_scopeId2}>Amount.currency</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>The payment amount and currency</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.paymentPurposeCode</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The purpose code from the request</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>data.openFinanceBilling.Type</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The billing type from the request</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>meta</code></td><td data-v-b7f31bc4${_scopeId2}>object</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Free-form metadata</td></tr></tbody></table>`);
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
                            createVNode("code", null, "PaymentId"),
                            createTextVNode(". MUST be unique within your payment system, MUST NOT be reassigned, and MUST resolve to the same payment for the full 1-year "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/payments/{paymentId}")
                            ]),
                            createTextVNode(" sustain window")
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
                          createVNode("td", null, "End-to-end identifier from the rail. Omit until AANI/UAEFTS has assigned one — do not return an empty string")
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
                          createVNode("td", null, "ISO 8601 timestamp of the last status update")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.creationDateTime")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "ISO 8601 timestamp the payment record was created")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "data.instruction.Amount.amount"),
                            createTextVNode(" / "),
                            createVNode("code", null, "Amount.currency")
                          ]),
                          createVNode("td", null, "string"),
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
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "meta")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Free-form metadata")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Example — successful initiation</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentSuccessJson,
              lang: "json",
              filename: "POST /payments 201 response"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Error responses</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Only return an error when the request is invalid or a server condition prevents you from responding. All error bodies MUST include <code data-v-b7f31bc4${_scopeId2}>errorCode</code> and <code data-v-b7f31bc4${_scopeId2}>errorMessage</code>. The <code data-v-b7f31bc4${_scopeId2}>errorCode</code> values are drawn from the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" data-v-b7f31bc4${_scopeId2}>POST <code data-v-b7f31bc4${_scopeId2}>/payments</code> OpenAPI schema</a><code data-v-b7f31bc4${_scopeId2}>Error400</code> / <code data-v-b7f31bc4${_scopeId2}>Error403</code> / <code data-v-b7f31bc4${_scopeId2}>Error409</code> enums. `);
                } else {
                  return [
                    createTextVNode(" Only return an error when the request is invalid or a server condition prevents you from responding. All error bodies MUST include "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" and "),
                    createVNode("code", null, "errorMessage"),
                    createTextVNode(". The "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" values are drawn from the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                      createTextVNode("POST "),
                      createVNode("code", null, "/payments"),
                      createTextVNode(" OpenAPI schema")
                    ]),
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
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}><code data-v-b7f31bc4${_scopeId}>400</code> — Bad request</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>errorCode</code></th><th data-v-b7f31bc4${_scopeId2}>When to use</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Body.InvalidFormat</code></td><td data-v-b7f31bc4${_scopeId2}>Body is absent, not valid JSON, or fails schema validation — including missing <code data-v-b7f31bc4${_scopeId2}>Risk.DebtorIndicators.Authentication</code>, <code data-v-b7f31bc4${_scopeId2}>x-fapi-auth-date</code>, or <code data-v-b7f31bc4${_scopeId2}>x-fapi-customer-ip-address</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Resource.InvalidFormat</code></td><td data-v-b7f31bc4${_scopeId2}>A field is present but not syntactically valid</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.Invalid</code></td><td data-v-b7f31bc4${_scopeId2}>The consent referenced by <code data-v-b7f31bc4${_scopeId2}>o3-consent-id</code> is unknown to the LFI or has been revoked</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.FailsControlParameters</code></td><td data-v-b7f31bc4${_scopeId2}>The payment-time creditor does not match any entry on a fixed-list consent, or fails open-beneficiary creditor validation</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.BusinessRuleViolation</code></td><td data-v-b7f31bc4${_scopeId2}>An LFI-side business rule blocks the payment</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>JWE.DecryptionError</code></td><td data-v-b7f31bc4${_scopeId2}>PII JWE cannot be decrypted with any registered Enc1 key</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>JWE.InvalidHeader</code></td><td data-v-b7f31bc4${_scopeId2}>PII JWE header is malformed</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>JWS.InvalidSignature</code> / <code data-v-b7f31bc4${_scopeId2}>JWS.Malformed</code> / <code data-v-b7f31bc4${_scopeId2}>JWS.InvalidClaim</code> / <code data-v-b7f31bc4${_scopeId2}>JWS.InvalidHeader</code></td><td data-v-b7f31bc4${_scopeId2}>PII inner JWS fails verification (only relevant if you have opted in to verifying the TPP&#39;s signature)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>GenericRecoverableError</code></td><td data-v-b7f31bc4${_scopeId2}>Recoverable validation error not covered above — Hub may retry</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>GenericError</code></td><td data-v-b7f31bc4${_scopeId2}>Unrecoverable validation error not covered above (including insufficient funds — see requirements rule 3)</td></tr></tbody></table>`);
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
                          createVNode("td", null, [
                            createTextVNode("Body is absent, not valid JSON, or fails schema validation — including missing "),
                            createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                            createTextVNode(", "),
                            createVNode("code", null, "x-fapi-auth-date"),
                            createTextVNode(", or "),
                            createVNode("code", null, "x-fapi-customer-ip-address")
                          ])
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
                          createVNode("td", null, [
                            createTextVNode("The consent referenced by "),
                            createVNode("code", null, "o3-consent-id"),
                            createTextVNode(" is unknown to the LFI or has been revoked")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.FailsControlParameters")
                          ]),
                          createVNode("td", null, "The payment-time creditor does not match any entry on a fixed-list consent, or fails open-beneficiary creditor validation")
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
                          createVNode("td", null, "PII inner JWS fails verification (only relevant if you have opted in to verifying the TPP's signature)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError")
                          ]),
                          createVNode("td", null, "Recoverable validation error not covered above — Hub may retry")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Unrecoverable validation error not covered above (including insufficient funds — see requirements rule 3)")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}><code data-v-b7f31bc4${_scopeId}>403</code> — Forbidden</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>errorCode</code></th><th data-v-b7f31bc4${_scopeId2}>When to use</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>AccessToken.InvalidScope</code></td><td data-v-b7f31bc4${_scopeId2}>The Hub&#39;s token does not include the required scope</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-b7f31bc4${_scopeId2}>Debtor account is <code data-v-b7f31bc4${_scopeId2}>Inactive</code>, <code data-v-b7f31bc4${_scopeId2}>Dormant</code>, or <code data-v-b7f31bc4${_scopeId2}>Suspended</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-b7f31bc4${_scopeId2}>Debtor account is <code data-v-b7f31bc4${_scopeId2}>Closed</code>, <code data-v-b7f31bc4${_scopeId2}>Deceased</code>, or <code data-v-b7f31bc4${_scopeId2}>Unclaimed</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.TransientAccountAccessFailure</code></td><td data-v-b7f31bc4${_scopeId2}>Debtor account temporarily inaccessible — Hub may retry after a delay</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>GenericRecoverableError</code> / <code data-v-b7f31bc4${_scopeId2}>GenericError</code></td><td data-v-b7f31bc4${_scopeId2}>Other forbidden conditions</td></tr></tbody></table>`);
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
                          createVNode("td", null, "Debtor account temporarily inaccessible — Hub may retry after a delay")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError"),
                            createTextVNode(" / "),
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Other forbidden conditions")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}><code data-v-b7f31bc4${_scopeId}>409</code> — Conflict</h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>errorCode</code></th><th data-v-b7f31bc4${_scopeId2}>When to use</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Payment.DuplicateInFlight</code></td><td data-v-b7f31bc4${_scopeId2}>Another payment with the same creditor and amount under the same consent is still <code data-v-b7f31bc4${_scopeId2}>Pending</code> — see <a href="#duplicate-in-flight" data-v-b7f31bc4${_scopeId2}>Duplicate-in-flight check</a></td></tr></tbody></table>`);
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
                            createVNode("code", null, "Pending"),
                            createTextVNode(" — see "),
                            createVNode("a", { href: "#duplicate-in-flight" }, "Duplicate-in-flight check")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}><code data-v-b7f31bc4${_scopeId}>500</code></h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>500</code> for transient/unrecoverable server errors. Use <code data-v-b7f31bc4${_scopeId2}>GenericRecoverableError</code> if the Hub may retry, <code data-v-b7f31bc4${_scopeId2}>GenericError</code> otherwise. `);
                } else {
                  return [
                    createVNode("code", null, "500"),
                    createTextVNode(" for transient/unrecoverable server errors. Use "),
                    createVNode("code", null, "GenericRecoverableError"),
                    createTextVNode(" if the Hub may retry, "),
                    createVNode("code", null, "GenericError"),
                    createTextVNode(" otherwise. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Example error response</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentErrorJson,
              lang: "json",
              filename: "error response"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payments")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Variable On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent's creditor list (or validate the freshly-supplied creditor for open-beneficiary consents), run the synchronous validations listed in "),
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
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Screening, rail submission, and status propagation happen "),
                  createVNode("strong", null, "after"),
                  createTextVNode(" the "),
                  createVNode("code", null, "201"),
                  createTextVNode(" response — see "),
                  createVNode("a", { href: "#after-201" }, "After returning 201"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "common-request-headers",
                class: "ed-doc__subhead"
              }, "Common request headers"),
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
                          createVNode("code", null, "o3-provider-id"),
                          createTextVNode(". Will be removed in a future version — use "),
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
                          createTextVNode("The HTTP method of the operation carried out by the TPP ("),
                          createVNode("code", null, "POST"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-ozone-interaction-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Hub-generated interaction ID. Equals "),
                          createVNode("code", null, "o3-caller-interaction-id"),
                          createTextVNode(" if the TPP provided one")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-consent-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "consentId"),
                          createTextVNode(" for which this call is being made — the lookup key for the stored consent context (see "),
                          createVNode("a", { href: "#match-pii" }, "Matching the PII against the consent"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-psu-identifier")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Base64-encoded customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization")
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
                    createTextVNode(", not on the HTTP headers of the API Hub → LFI call. On-demand consent types do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" require "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" on every payment — the customer may not be present when the TPP triggers an on-demand payment. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". The Hub sends a plain JSON payload (not a JWS) containing the payment details, the headers the TPP supplied, and the TPP's directory record. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Top-level fields"),
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
                        createVNode("td", null, [
                          createTextVNode("The TPP-facing resource URL the TPP called, e.g. "),
                          createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentType")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The payment type. MUST be "),
                          createVNode("code", null, "cbuae-payment"),
                          createTextVNode(" for domestic Variable On Demand")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "request.Data")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The payment payload — see "),
                          createVNode("code", null, "request.Data"),
                          createTextVNode(" below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "requestHeaders")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The complete set of HTTP headers the TPP sent to the API Hub. The TPP's FAPI headers live here")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "tpp")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The TPP's directory record ("),
                          createVNode("code", null, "clientId"),
                          createTextVNode(", "),
                          createVNode("code", null, "orgId"),
                          createTextVNode(", "),
                          createVNode("code", null, "tppId"),
                          createTextVNode(", "),
                          createVNode("code", null, "tppName"),
                          createTextVNode(", "),
                          createVNode("code", null, "softwareStatementId"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa"),
                          createTextVNode(", optional "),
                          createVNode("code", null, "directoryRecord"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "supplementaryInformation")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Free-form pass-through context. The LFI MUST safely ignore unrecognised properties")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "request.Data"),
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
                          createTextVNode("The consent the payment is being executed under. MUST equal the "),
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
                          createTextVNode("Decimal amount with two fraction digits, e.g. "),
                          createVNode("code", null, "125.50"),
                          createTextVNode(". The Hub has already enforced it is within the consent's per-payment maximum and periodic limits before forwarding")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Instruction.Amount.Currency")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("ISO-4217 currency code. MUST be "),
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
                          createVNode("code", null, "GDDS")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PersonalIdentifiableInformation")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Encrypted PII payload as a JWE compact string. Carries the creditor — required whether the consent fixed a list or left beneficiaries open — see "),
                          createVNode("a", { href: "#read-pii" }, "Reading the PII at payment time")
                        ])
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
                        createVNode("td", null, [
                          createTextVNode("Billing type, e.g. "),
                          createVNode("code", null, "Collection"),
                          createTextVNode(", "),
                          createVNode("code", null, "PushP2P"),
                          createTextVNode(", "),
                          createVNode("code", null, "PullP2P"),
                          createTextVNode(", "),
                          createVNode("code", null, "Me2Me")
                        ])
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the full schema — including "),
                  createVNode("code", null, "tpp"),
                  createTextVNode(" and "),
                  createVNode("code", null, "decodedSsa"),
                  createTextVNode(" field-by-field — see the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Request example"),
              createVNode(_component_EdCode, {
                code: paymentRequestJson,
                lang: "json",
                filename: "POST /payments request"
              }),
              createVNode("h3", {
                id: "read-pii",
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
                    createTextVNode(", not an array — each payment pays exactly one creditor, whether or not a list was fixed at consent time")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "DebtorAccount"),
                      createTextVNode(" is absent")
                    ]),
                    createTextVNode(" — the debtor was selected and pinned during consent authorisation")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The schema to validate against is "),
                    createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
                    createTextVNode(" in "),
                    createVNode("code", null, "uae-ozone-connect-bank-service-initiation-openapi.yaml"),
                    createTextVNode(" — "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" the consent-time schema")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The decrypt + decode flow is identical to consent time — read the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(", decrypt with the matching Enc1 private key, decode the JWS payload. Re-use the helper from "),
                  createVNode("a", { href: "#consent-validation" }, "Decrypting and validating the PII"),
                  createTextVNode("; only swap the schema: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: piiPaymentTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If decryption fails, reject with "),
                  createVNode("code", null, "400 JWE.DecryptionError"),
                  createTextVNode(". If schema validation fails (missing required field, wrong type, or additional property), reject with "),
                  createVNode("code", null, "400 Body.InvalidFormat"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A decrypted payment-time PII for Variable On Demand looks like:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: paymentPiiJson,
                lang: "json",
                filename: "decrypted payment-time PII"
              }),
              createVNode("h3", {
                id: "match-pii",
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
                  createTextVNode(" rule 2, Variable On Demand splits into two flows at payment time depending on whether the consent fixed a list of creditors or left beneficiaries open: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent fixed a creditor list (1–10 entries)"),
                    createTextVNode(" — the submitted creditor MUST exactly match "),
                    createVNode("strong", null, "one"),
                    createTextVNode(" of the consent-time entries. Mismatch → "),
                    createVNode("code", null, "400 Consent.FailsControlParameters")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent left beneficiaries open"),
                    createTextVNode(" — there is nothing to match against; the deferred creditor validation runs here instead. A failed check → "),
                    createVNode("code", null, "400 Consent.FailsControlParameters")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The link between the payment and the consent is the "),
                  createVNode("code", null, "o3-consent-id"),
                  createTextVNode(" request header (also surfaced as "),
                  createVNode("code", null, "request.Data.ConsentId"),
                  createTextVNode(" in the body). The fixed-list flow has two implementation patterns; the open-beneficiaries flow is a single path covered in the next subsection. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Pattern A — LFI persisted the decrypted creditor list at consent time"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The most common pattern. At consent validation, after you decrypted and validated the consent-time PII, you persisted the creditor list keyed by "),
                  createVNode("code", null, "consentId"),
                  createTextVNode(". At payment time you fetch it and search for an exact match against the payment-time creditor. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: matchPiiTabs }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Pattern B — LFI did not persist the consent-time PII"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
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
                  createTextVNode(" field, and run the same matching logic: for a fixed list, "),
                  createVNode("code", null, "some(isExactMatch, paymentCreditor)"),
                  createTextVNode(" against "),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode("; for an open-beneficiary consent (the field is absent), fall through to the open-beneficiary validation below. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Pattern B trades stored state for a network round-trip and a second decryption on every payment. Choose Pattern A unless persistence is not an option for your LFI. ")
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "open-beneficiary",
                class: "ed-doc__subhead"
              }, "Validating an open-beneficiary creditor at payment time"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the consent omitted "),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(", the creditor validation that would normally run at consent-validate time is deferred to "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(". The checks are the same four-part rule from consent validation — mandatory fields, BIC consistency, domestic rail reachability. The only differences are the error shape (HTTP "),
                  createVNode("code", null, "400"),
                  createTextVNode(" with "),
                  createVNode("code", null, "errorCode: Consent.FailsControlParameters"),
                  createTextVNode(", rather than the "),
                  createVNode("code", null, "invalid"),
                  createTextVNode(" JSON body) and the fact that only a single creditor is being checked. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: openBeneficiaryTabs }),
              createVNode("h3", {
                id: "duplicate-in-flight",
                class: "ed-doc__subhead"
              }, "Duplicate-in-flight check"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Per "),
                  createVNode("a", { href: "./requirements#post-payments-payment-execution" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" Requirements")
                  ]),
                  createTextVNode(" rule 5, Variable On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in "),
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
              createVNode(_component_EdCodeGroup, { tabs: dupCheckTabs }),
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
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". Return "),
                  createVNode("code", null, "201"),
                  createTextVNode(" on successful payment record creation. ")
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
                          createVNode("code", null, "PaymentId"),
                          createTextVNode(". MUST be unique within your payment system, MUST NOT be reassigned, and MUST resolve to the same payment for the full 1-year "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/payments/{paymentId}")
                          ]),
                          createTextVNode(" sustain window")
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
                        createVNode("td", null, "End-to-end identifier from the rail. Omit until AANI/UAEFTS has assigned one — do not return an empty string")
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
                        createVNode("td", null, "ISO 8601 timestamp of the last status update")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.creationDateTime")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "ISO 8601 timestamp the payment record was created")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "data.instruction.Amount.amount"),
                          createTextVNode(" / "),
                          createVNode("code", null, "Amount.currency")
                        ]),
                        createVNode("td", null, "string"),
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
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "meta")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Free-form metadata")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Example — successful initiation"),
              createVNode(_component_EdCode, {
                code: paymentSuccessJson,
                lang: "json",
                filename: "POST /payments 201 response"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Only return an error when the request is invalid or a server condition prevents you from responding. All error bodies MUST include "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" and "),
                  createVNode("code", null, "errorMessage"),
                  createTextVNode(". The "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" values are drawn from the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, [
                    createTextVNode("POST "),
                    createVNode("code", null, "/payments"),
                    createTextVNode(" OpenAPI schema")
                  ]),
                  createVNode("code", null, "Error400"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Error403"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Error409"),
                  createTextVNode(" enums. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
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
                        createVNode("td", null, [
                          createTextVNode("Body is absent, not valid JSON, or fails schema validation — including missing "),
                          createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                          createTextVNode(", "),
                          createVNode("code", null, "x-fapi-auth-date"),
                          createTextVNode(", or "),
                          createVNode("code", null, "x-fapi-customer-ip-address")
                        ])
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
                        createVNode("td", null, [
                          createTextVNode("The consent referenced by "),
                          createVNode("code", null, "o3-consent-id"),
                          createTextVNode(" is unknown to the LFI or has been revoked")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.FailsControlParameters")
                        ]),
                        createVNode("td", null, "The payment-time creditor does not match any entry on a fixed-list consent, or fails open-beneficiary creditor validation")
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
                        createVNode("td", null, "PII inner JWS fails verification (only relevant if you have opted in to verifying the TPP's signature)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError")
                        ]),
                        createVNode("td", null, "Recoverable validation error not covered above — Hub may retry")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Unrecoverable validation error not covered above (including insufficient funds — see requirements rule 3)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
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
                        createVNode("td", null, "Debtor account temporarily inaccessible — Hub may retry after a delay")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError"),
                          createTextVNode(" / "),
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Other forbidden conditions")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
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
                          createVNode("code", null, "Pending"),
                          createTextVNode(" — see "),
                          createVNode("a", { href: "#duplicate-in-flight" }, "Duplicate-in-flight check")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
                createVNode("code", null, "500")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "500"),
                  createTextVNode(" for transient/unrecoverable server errors. Use "),
                  createVNode("code", null, "GenericRecoverableError"),
                  createTextVNode(" if the Hub may retry, "),
                  createVNode("code", null, "GenericError"),
                  createTextVNode(" otherwise. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Example error response"),
              createVNode(_component_EdCode, {
                code: paymentErrorJson,
                lang: "json",
                filename: "error response"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "after-201",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "After returning 201",
        title: "Asynchronous lifecycle is the LFI's responsibility",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-b7f31bc4${_scopeId2}>201</code> returned to the API Hub means the payment record exists at your LFI; it does <strong data-v-b7f31bc4${_scopeId2}>not</strong> mean the payment has settled. The lifecycle from here is asynchronous and is the LFI&#39;s responsibility: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "201"),
                    createTextVNode(" returned to the API Hub means the payment record exists at your LFI; it does "),
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
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Stage</th><th data-v-b7f31bc4${_scopeId2}>LFI behaviour</th><th data-v-b7f31bc4${_scopeId2}>Reference</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>Screening</td><td data-v-b7f31bc4${_scopeId2}>Run the LFI&#39;s standard fraud / sanctions / AML controls on the payment record. SHOULD complete within 3 seconds. On a screening failure, immediately PATCH the payment to <code data-v-b7f31bc4${_scopeId2}>Rejected</code> with an <code data-v-b7f31bc4${_scopeId2}>LFI.</code>-namespaced reject reason</td><td data-v-b7f31bc4${_scopeId2}><a href="./requirements#screening-checks" data-v-b7f31bc4${_scopeId2}>Screening Checks</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>Rail submission</td><td data-v-b7f31bc4${_scopeId2}>Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable or the receiving bank cannot receive via AANI — no TPP/customer intervention</td><td data-v-b7f31bc4${_scopeId2}><a href="./requirements#rail-submission" data-v-b7f31bc4${_scopeId2}>Rail Submission</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>Status propagation</td><td data-v-b7f31bc4${_scopeId2}>On every rail status change that maps to an Open Finance status, call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--patch" data-v-b7f31bc4${_scopeId2}>PATCH</span><code data-v-b7f31bc4${_scopeId2}>/payment-log/{id}</code></a> on the API Hub Consent Manager. Once AANI/UAEFTS assigns the end-to-end identifier, include it as <code data-v-b7f31bc4${_scopeId2}>paymentTransactionId</code> on the next PATCH</td><td data-v-b7f31bc4${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" data-v-b7f31bc4${_scopeId2}>Payment Status</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>Rail rejection</td><td data-v-b7f31bc4${_scopeId2}>If the rail rejects the payment, PATCH <code data-v-b7f31bc4${_scopeId2}>paymentResponse.status: Rejected</code> with <code data-v-b7f31bc4${_scopeId2}>RejectReasonCode.Code</code> namespaced as <code data-v-b7f31bc4${_scopeId2}>AANI.</code> or <code data-v-b7f31bc4${_scopeId2}>FTS.</code> and a sanitised <code data-v-b7f31bc4${_scopeId2}>Message</code> for relay to the TPP</td><td data-v-b7f31bc4${_scopeId2}><a href="./requirements#rail-submission" data-v-b7f31bc4${_scopeId2}>Rail Submission</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>Status retrieval</td><td data-v-b7f31bc4${_scopeId2}>Continue serving <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code></a> for at least 1 year, with <code data-v-b7f31bc4${_scopeId2}>Status</code> and <code data-v-b7f31bc4${_scopeId2}>paymentTransactionId</code> consistent with the most recent PATCH</td><td data-v-b7f31bc4${_scopeId2}><a href="#get-payments-paymentid" data-v-b7f31bc4${_scopeId2}>GET <code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code> rules below</a></td></tr></tbody></table>`);
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
                            createTextVNode("Run the LFI's standard fraud / sanctions / AML controls on the payment record. SHOULD complete within 3 seconds. On a screening failure, immediately PATCH the payment to "),
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
                          createVNode("td", null, "Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable or the receiving bank cannot receive via AANI — no TPP/customer intervention"),
                          createVNode("td", null, [
                            createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Status propagation"),
                          createVNode("td", null, [
                            createTextVNode("On every rail status change that maps to an Open Finance status, call "),
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/payment-log/{id}")
                            ]),
                            createTextVNode(" on the API Hub Consent Manager. Once AANI/UAEFTS assigns the end-to-end identifier, include it as "),
                            createVNode("code", null, "paymentTransactionId"),
                            createTextVNode(" on the next PATCH")
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
                            createVNode("code", null, "RejectReasonCode.Code"),
                            createTextVNode(" namespaced as "),
                            createVNode("code", null, "AANI."),
                            createTextVNode(" or "),
                            createVNode("code", null, "FTS."),
                            createTextVNode(" and a sanitised "),
                            createVNode("code", null, "Message"),
                            createTextVNode(" for relay to the TPP")
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
                            createTextVNode(" for at least 1 year, with "),
                            createVNode("code", null, "Status"),
                            createTextVNode(" and "),
                            createVNode("code", null, "paymentTransactionId"),
                            createTextVNode(" consistent with the most recent PATCH")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "#get-payments-paymentid" }, [
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` PATCH delivery is durable: retry transient <code data-v-b7f31bc4${_scopeId2}>5xx</code>/timeout failures with exponential backoff; raise <code data-v-b7f31bc4${_scopeId2}>4xx</code> failures for operational investigation rather than retrying. `);
                } else {
                  return [
                    createTextVNode(" PATCH delivery is durable: retry transient "),
                    createVNode("code", null, "5xx"),
                    createTextVNode("/timeout failures with exponential backoff; raise "),
                    createVNode("code", null, "4xx"),
                    createTextVNode(" failures for operational investigation rather than retrying. ")
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
                  createVNode("code", null, "201"),
                  createTextVNode(" returned to the API Hub means the payment record exists at your LFI; it does "),
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
                          createTextVNode("Run the LFI's standard fraud / sanctions / AML controls on the payment record. SHOULD complete within 3 seconds. On a screening failure, immediately PATCH the payment to "),
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
                        createVNode("td", null, "Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable or the receiving bank cannot receive via AANI — no TPP/customer intervention"),
                        createVNode("td", null, [
                          createVNode("a", { href: "./requirements#rail-submission" }, "Rail Submission")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Status propagation"),
                        createVNode("td", null, [
                          createTextVNode("On every rail status change that maps to an Open Finance status, call "),
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/payment-log/{id}")
                          ]),
                          createTextVNode(" on the API Hub Consent Manager. Once AANI/UAEFTS assigns the end-to-end identifier, include it as "),
                          createVNode("code", null, "paymentTransactionId"),
                          createTextVNode(" on the next PATCH")
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
                          createVNode("code", null, "RejectReasonCode.Code"),
                          createTextVNode(" namespaced as "),
                          createVNode("code", null, "AANI."),
                          createTextVNode(" or "),
                          createVNode("code", null, "FTS."),
                          createTextVNode(" and a sanitised "),
                          createVNode("code", null, "Message"),
                          createTextVNode(" for relay to the TPP")
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
                          createTextVNode(" for at least 1 year, with "),
                          createVNode("code", null, "Status"),
                          createTextVNode(" and "),
                          createVNode("code", null, "paymentTransactionId"),
                          createTextVNode(" consistent with the most recent PATCH")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "#get-payments-paymentid" }, [
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
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" PATCH delivery is durable: retry transient "),
                  createVNode("code", null, "5xx"),
                  createTextVNode("/timeout failures with exponential backoff; raise "),
                  createVNode("code", null, "4xx"),
                  createTextVNode(" failures for operational investigation rather than retrying. ")
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
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Endpoint",
        title: "PATCH /payment-log/{id}",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-b7f31bc4${_scopeId}><span class="http-badge http-patch" data-v-b7f31bc4${_scopeId}>PATCH</span><code class="ed-doc__endpoint-path" data-v-b7f31bc4${_scopeId}>/payment-log/{id}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This endpoint updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. The LFI calls it for every Open Finance-relevant status transition after the <code data-v-b7f31bc4${_scopeId2}>201</code> has been returned to the Hub on <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span>. `);
                } else {
                  return [
                    createTextVNode(" This endpoint updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. The LFI calls it for every Open Finance-relevant status transition after the "),
                    createVNode("code", null, "201"),
                    createTextVNode(" has been returned to the Hub on "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Header</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-provider-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-org-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-client-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-api-uri</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-api-operation</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The HTTP method of the operation carried out by the TPP (<code data-v-b7f31bc4${_scopeId2}>PATCH</code>)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-b7f31bc4${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-consent-id</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>The consent backing this payment</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-psu-identifier</code></td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}>Base64-encoded psuIdentifier JSON object</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
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
                            createTextVNode("The HTTP method of the operation carried out by the TPP ("),
                            createVNode("code", null, "PATCH"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-ozone-interaction-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Hub-generated interaction ID. Equals "),
                            createVNode("code", null, "o3-caller-interaction-id"),
                            createTextVNode(" if the TPP provided one")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-consent-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The consent backing this payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-psu-identifier")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Base64-encoded psuIdentifier JSON object")
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Parameter</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>id</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Identifier of the payment log entry being updated — the <code data-v-b7f31bc4${_scopeId2}>data.id</code> returned from <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("Identifier of the payment log entry being updated — the "),
                            createVNode("code", null, "data.id"),
                            createTextVNode(" returned from "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/payments")
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>Content-Type: application/json</code>. The PATCH body uses literal flat-key JSON (the dots are part of the key, not nested objects): `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". The PATCH body uses literal flat-key JSON (the dots are part of the key, not nested objects): ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Field</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Required</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.status</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes</td><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Pending</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedCreditSettlementCompleted</code>, <code data-v-b7f31bc4${_scopeId2}>AcceptedWithoutPosting</code>, or <code data-v-b7f31bc4${_scopeId2}>Rejected</code>. See <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" data-v-b7f31bc4${_scopeId2}>Payment Status</a></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.paymentTransactionId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Conditional</td><td data-v-b7f31bc4${_scopeId2}>The end-to-end identifier assigned by the rail (AANI or UAEFTS). Set on the first PATCH that carries it; once set, MUST NOT change</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions</code></td><td data-v-b7f31bc4${_scopeId2}>integer</td><td data-v-b7f31bc4${_scopeId2}>No</td><td data-v-b7f31bc4${_scopeId2}>Number of successful transactions (typically <code data-v-b7f31bc4${_scopeId2}>1</code> per payment)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.RejectReasonCode[]</code></td><td data-v-b7f31bc4${_scopeId2}>array</td><td data-v-b7f31bc4${_scopeId2}>Conditional</td><td data-v-b7f31bc4${_scopeId2}>Required when <code data-v-b7f31bc4${_scopeId2}>paymentResponse.status</code> is <code data-v-b7f31bc4${_scopeId2}>Rejected</code>. Append new reasons rather than replacing — preserves history</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.RejectReasonCode[].Code</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes (in array)</td><td data-v-b7f31bc4${_scopeId2}>Namespaced rejection code: <code data-v-b7f31bc4${_scopeId2}>LFI.…</code> for an LFI-side rejection (e.g. screening), <code data-v-b7f31bc4${_scopeId2}>AANI.…</code> or <code data-v-b7f31bc4${_scopeId2}>FTS.…</code> for a rail rejection. Pattern: <code data-v-b7f31bc4${_scopeId2}>^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$</code></td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentResponse.RejectReasonCode[].Message</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>Yes (in array)</td><td data-v-b7f31bc4${_scopeId2}>Sanitised, customer-relayable description. MUST NOT reveal detection logic, sanctions matches, or internal case identifiers</td></tr></tbody></table>`);
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
                            createVNode("code", null, "Rejected"),
                            createTextVNode(". See "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Status")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.paymentTransactionId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Conditional"),
                          createVNode("td", null, "The end-to-end identifier assigned by the rail (AANI or UAEFTS). Set on the first PATCH that carries it; once set, MUST NOT change")
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
                            createTextVNode("Required when "),
                            createVNode("code", null, "paymentResponse.status"),
                            createTextVNode(" is "),
                            createVNode("code", null, "Rejected"),
                            createTextVNode(". Append new reasons rather than replacing — preserves history")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.RejectReasonCode[].Code")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes (in array)"),
                          createVNode("td", null, [
                            createTextVNode("Namespaced rejection code: "),
                            createVNode("code", null, "LFI.…"),
                            createTextVNode(" for an LFI-side rejection (e.g. screening), "),
                            createVNode("code", null, "AANI.…"),
                            createTextVNode(" or "),
                            createVNode("code", null, "FTS.…"),
                            createTextVNode(" for a rail rejection. Pattern: "),
                            createVNode("code", null, "^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentResponse.RejectReasonCode[].Message")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes (in array)"),
                          createVNode("td", null, "Sanitised, customer-relayable description. MUST NOT reveal detection logic, sanctions matches, or internal case identifiers")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Example — successful settlement</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchSettleJson,
              lang: "json",
              filename: "PATCH /payment-log/{id} — settled"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Example — rail rejection</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchRailRejectJson,
              lang: "json",
              filename: "PATCH /payment-log/{id} — rail rejection"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-b7f31bc4${_scopeId}>Example — LFI screening rejection</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchScreeningRejectJson,
              lang: "json",
              filename: "PATCH /payment-log/{id} — screening rejection"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>Content-Type: application/json</code>. A successful PATCH returns <code data-v-b7f31bc4${_scopeId2}>204 No Content</code> with no body. See the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" data-v-b7f31bc4${_scopeId2}>PATCH <code data-v-b7f31bc4${_scopeId2}>/payment-log/:id</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". A successful PATCH returns "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode(" with no body. See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" }, [
                      createTextVNode("PATCH "),
                      createVNode("code", null, "/payment-log/:id"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-patch" }, "PATCH"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payment-log/{id}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This endpoint updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. The LFI calls it for every Open Finance-relevant status transition after the "),
                  createVNode("code", null, "201"),
                  createTextVNode(" has been returned to the Hub on "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
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
                          createTextVNode("The HTTP method of the operation carried out by the TPP ("),
                          createVNode("code", null, "PATCH"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-ozone-interaction-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Hub-generated interaction ID. Equals "),
                          createVNode("code", null, "o3-caller-interaction-id"),
                          createTextVNode(" if the TPP provided one")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-consent-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The consent backing this payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-psu-identifier")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Base64-encoded psuIdentifier JSON object")
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
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("Identifier of the payment log entry being updated — the "),
                          createVNode("code", null, "data.id"),
                          createTextVNode(" returned from "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/payments")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". The PATCH body uses literal flat-key JSON (the dots are part of the key, not nested objects): ")
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
                          createVNode("code", null, "Rejected"),
                          createTextVNode(". See "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Status")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.paymentTransactionId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Conditional"),
                        createVNode("td", null, "The end-to-end identifier assigned by the rail (AANI or UAEFTS). Set on the first PATCH that carries it; once set, MUST NOT change")
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
                          createTextVNode("Required when "),
                          createVNode("code", null, "paymentResponse.status"),
                          createTextVNode(" is "),
                          createVNode("code", null, "Rejected"),
                          createTextVNode(". Append new reasons rather than replacing — preserves history")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.RejectReasonCode[].Code")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes (in array)"),
                        createVNode("td", null, [
                          createTextVNode("Namespaced rejection code: "),
                          createVNode("code", null, "LFI.…"),
                          createTextVNode(" for an LFI-side rejection (e.g. screening), "),
                          createVNode("code", null, "AANI.…"),
                          createTextVNode(" or "),
                          createVNode("code", null, "FTS.…"),
                          createTextVNode(" for a rail rejection. Pattern: "),
                          createVNode("code", null, "^(LFI|AANI|FTS)\\.[A-Za-z0-9]+$")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentResponse.RejectReasonCode[].Message")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes (in array)"),
                        createVNode("td", null, "Sanitised, customer-relayable description. MUST NOT reveal detection logic, sanctions matches, or internal case identifiers")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Example — successful settlement"),
              createVNode(_component_EdCode, {
                code: patchSettleJson,
                lang: "json",
                filename: "PATCH /payment-log/{id} — settled"
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Example — rail rejection"),
              createVNode(_component_EdCode, {
                code: patchRailRejectJson,
                lang: "json",
                filename: "PATCH /payment-log/{id} — rail rejection"
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, "Example — LFI screening rejection"),
              createVNode(_component_EdCode, {
                code: patchScreeningRejectJson,
                lang: "json",
                filename: "PATCH /payment-log/{id} — screening rejection"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". A successful PATCH returns "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode(" with no body. See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" }, [
                    createTextVNode("PATCH "),
                    createVNode("code", null, "/payment-log/:id"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
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
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Endpoint",
        title: "GET /payments/{paymentId}",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-b7f31bc4${_scopeId}><span class="http-badge http-get" data-v-b7f31bc4${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-b7f31bc4${_scopeId}>/payments/{paymentId}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-b7f31bc4${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.2/payments/{PaymentId}</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.2/payments/{PaymentId}"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the current state of a payment your LFI created via <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span>. The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection. `);
                } else {
                  return [
                    createTextVNode(" Returns the current state of a payment your LFI created via "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(". The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-b7f31bc4${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Parameter</th><th data-v-b7f31bc4${_scopeId2}>Type</th><th data-v-b7f31bc4${_scopeId2}>Description</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentId</code></td><td data-v-b7f31bc4${_scopeId2}>string</td><td data-v-b7f31bc4${_scopeId2}>The <code data-v-b7f31bc4${_scopeId2}>PaymentId</code> your LFI returned from <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paymentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "PaymentId"),
                            createTextVNode(" your LFI returned from "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/payments")
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
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-b7f31bc4${_scopeId2}>Content-Type: application/json</code>. The response shape mirrors the <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--post" data-v-b7f31bc4${_scopeId2}>POST</span><code data-v-b7f31bc4${_scopeId2}>/payments</code></span><code data-v-b7f31bc4${_scopeId2}>201</code> response — same <code data-v-b7f31bc4${_scopeId2}>data</code> envelope, with the current <code data-v-b7f31bc4${_scopeId2}>Status</code>, <code data-v-b7f31bc4${_scopeId2}>paymentTransactionId</code> (once assigned by the rail), and any rejection details. `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". The response shape mirrors the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createVNode("code", null, "201"),
                    createTextVNode(" response — same "),
                    createVNode("code", null, "data"),
                    createTextVNode(" envelope, with the current "),
                    createVNode("code", null, "Status"),
                    createTextVNode(", "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode(" (once assigned by the rail), and any rejection details. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: getPaymentJson,
              lang: "json",
              filename: "GET /payments/{paymentId} response"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Behavioural rules</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Per <a href="./requirements#get-payments-paymentid-payment-status-retrieval" data-v-b7f31bc4${_scopeId2}>GET <code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code> Requirements</a>: `);
                } else {
                  return [
                    createTextVNode(" Per "),
                    createVNode("a", { href: "./requirements#get-payments-paymentid-payment-status-retrieval" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/payments/{paymentId}"),
                      createTextVNode(" Requirements")
                    ]),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>#</th><th data-v-b7f31bc4${_scopeId2}>Rule</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>1</td><td data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Sustain period</strong> — Serve <span class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--get" data-v-b7f31bc4${_scopeId2}>GET</span><code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code></span> for at least <strong data-v-b7f31bc4${_scopeId2}>1 year from the payment&#39;s creation date</strong>. Within this window, the response MUST reflect the current status, including any later screening, rail, or reversal outcomes</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>2</td><td data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}>Status consistency with the API Hub</strong> — The <code data-v-b7f31bc4${_scopeId2}>Status</code> returned MUST exactly match the most recent value PATCHed to the API Hub Consent Manager via <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="endpoint" data-v-b7f31bc4${_scopeId2}><span class="http-method http-method--patch" data-v-b7f31bc4${_scopeId2}>PATCH</span><code data-v-b7f31bc4${_scopeId2}>/payment-log/{id}</code></a>. Any change in the LFI&#39;s systems MUST be reflected on both surfaces before it becomes observable to the TPP</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}>3</td><td data-v-b7f31bc4${_scopeId2}><strong data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>paymentTransactionId</code> consistency</strong> — Once the rail has assigned the end-to-end identifier and the LFI has PATCHed it to the Consent Manager, this endpoint MUST return the same value. Before assignment, omit the field entirely — do not return an empty string</td></tr></tbody></table>`);
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
                            createVNode("strong", null, "1 year from the payment's creation date"),
                            createTextVNode(". Within this window, the response MUST reflect the current status, including any later screening, rail, or reversal outcomes")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "2"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Status consistency with the API Hub"),
                            createTextVNode(" — The "),
                            createVNode("code", null, "Status"),
                            createTextVNode(" returned MUST exactly match the most recent value PATCHed to the API Hub Consent Manager via "),
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/payment-log/{id}")
                            ]),
                            createTextVNode(". Any change in the LFI's systems MUST be reflected on both surfaces before it becomes observable to the TPP")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "3"),
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("code", null, "paymentTransactionId"),
                              createTextVNode(" consistency")
                            ]),
                            createTextVNode(" — Once the rail has assigned the end-to-end identifier and the LFI has PATCHed it to the Consent Manager, this endpoint MUST return the same value. Before assignment, omit the field entirely — do not return an empty string")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b7f31bc4${_scopeId}>Errors</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b7f31bc4${_scopeId2}><thead data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><th data-v-b7f31bc4${_scopeId2}>Status</th><th data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>errorCode</code></th><th data-v-b7f31bc4${_scopeId2}>When to use</th></tr></thead><tbody data-v-b7f31bc4${_scopeId2}><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>404</code></td><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Resource.NotFound</code></td><td data-v-b7f31bc4${_scopeId2}>No payment exists for the supplied <code data-v-b7f31bc4${_scopeId2}>paymentId</code> (or the payment exists but belongs to a different consent)</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>403</code></td><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>Consent.AccountTemporarilyBlocked</code> / <code data-v-b7f31bc4${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-b7f31bc4${_scopeId2}>The debtor account has become inaccessible since the payment was created</td></tr><tr data-v-b7f31bc4${_scopeId2}><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>500</code></td><td data-v-b7f31bc4${_scopeId2}><code data-v-b7f31bc4${_scopeId2}>GenericRecoverableError</code> / <code data-v-b7f31bc4${_scopeId2}>GenericError</code></td><td data-v-b7f31bc4${_scopeId2}>Transient or unrecoverable server error</td></tr></tbody></table>`);
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
                            createVNode("code", null, "paymentId"),
                            createTextVNode(" (or the payment exists but belongs to a different consent)")
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
                          createVNode("td", null, "The debtor account has become inaccessible since the payment was created")
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" data-v-b7f31bc4${_scopeId2}>GET <code data-v-b7f31bc4${_scopeId2}>/payments/{paymentId}</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/payments/{paymentId}"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payments/{paymentId}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.2/payments/{PaymentId}"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the current state of a payment your LFI created via "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(". The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paymentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "PaymentId"),
                          createTextVNode(" your LFI returned from "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/payments")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". The response shape mirrors the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createVNode("code", null, "201"),
                  createTextVNode(" response — same "),
                  createVNode("code", null, "data"),
                  createTextVNode(" envelope, with the current "),
                  createVNode("code", null, "Status"),
                  createTextVNode(", "),
                  createVNode("code", null, "paymentTransactionId"),
                  createTextVNode(" (once assigned by the rail), and any rejection details. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: getPaymentJson,
                lang: "json",
                filename: "GET /payments/{paymentId} response"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Behavioural rules"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Per "),
                  createVNode("a", { href: "./requirements#get-payments-paymentid-payment-status-retrieval" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/payments/{paymentId}"),
                    createTextVNode(" Requirements")
                  ]),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
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
                          createVNode("strong", null, "1 year from the payment's creation date"),
                          createTextVNode(". Within this window, the response MUST reflect the current status, including any later screening, rail, or reversal outcomes")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "2"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Status consistency with the API Hub"),
                          createTextVNode(" — The "),
                          createVNode("code", null, "Status"),
                          createTextVNode(" returned MUST exactly match the most recent value PATCHed to the API Hub Consent Manager via "),
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/payment-log/{id}")
                          ]),
                          createTextVNode(". Any change in the LFI's systems MUST be reflected on both surfaces before it becomes observable to the TPP")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "3"),
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("code", null, "paymentTransactionId"),
                            createTextVNode(" consistency")
                          ]),
                          createTextVNode(" — Once the rail has assigned the end-to-end identifier and the LFI has PATCHed it to the Consent Manager, this endpoint MUST return the same value. Before assignment, omit the field entirely — do not return an empty string")
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
                          createVNode("code", null, "paymentId"),
                          createTextVNode(" (or the payment exists but belongs to a different consent)")
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
                        createVNode("td", null, "The debtor account has become inaccessible since the payment was created")
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
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/payments/{paymentId}"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7f31bc4"]]);
export {
  apiGuide as default
};
