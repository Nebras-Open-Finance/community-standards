<route lang="yaml">
meta:
  title: Variable On Demand — API Guide
</route>

<script setup lang="ts">
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
`

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
`

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
`

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
`

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
`

const invalidResponseJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Initiation.Creditor[3].CreditorAccount.Identification is not a valid UAE IBAN."
  },
  "meta": {}
}
`

const piiPaymentNode = `async function decryptAndValidatePaymentPII(piiJwe: string) {
  const pii = await decryptPii(piiJwe) // shared decrypt helper
  validatePaymentPiiSchema(pii)         // AEDomesticPaymentPIIProperties
  return pii
}
`

const piiPaymentPython = `def decrypt_and_validate_payment_pii(pii_jwe: str) -> dict:
    pii = decrypt_pii(pii_jwe)              # shared decrypt helper
    validate_payment_pii_schema(pii)        # AEDomesticPaymentPIIProperties
    return pii
`

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
`

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
`

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
`

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
`

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
`

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
`

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
`

const paymentRequestJson = `{
  "requestUrl": "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.1/payments",
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
    "o3-api-uri": "/open-finance/payment/v2.1/payments",
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
`

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
`

const paymentErrorJson = `{
  "errorCode": "Consent.FailsControlParameters",
  "errorMessage": "Payment creditor does not match any creditor authorised on the consent."
}
`

const patchSettleJson = `{
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27"
}
`

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
`

const patchScreeningRejectJson = `{
  "paymentResponse.status": "Rejected",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "LFI.ScreeningRejected",
      "Message": "Payment rejected by LFI screening controls."
    }
  ]
}
`

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
`

const piiDecryptTabs           = [{ label: 'Node.js', lang: 'typescript', code: piiDecryptNode },           { label: 'Python', lang: 'python', code: piiDecryptPython }] as const
const creditorValidateTabs     = [{ label: 'Node.js', lang: 'typescript', code: creditorValidateNode },     { label: 'Python', lang: 'python', code: creditorValidatePython }] as const
const piiPaymentTabs           = [{ label: 'Node.js', lang: 'typescript', code: piiPaymentNode },           { label: 'Python', lang: 'python', code: piiPaymentPython }] as const
const matchPiiTabs             = [{ label: 'Node.js', lang: 'typescript', code: matchPiiNode },             { label: 'Python', lang: 'python', code: matchPiiPython }] as const
const openBeneficiaryTabs      = [{ label: 'Node.js', lang: 'typescript', code: openBeneficiaryNode },      { label: 'Python', lang: 'python', code: openBeneficiaryPython }] as const
const dupCheckTabs             = [{ label: 'Node.js', lang: 'typescript', code: dupCheckNode },             { label: 'Python', lang: 'python', code: dupCheckPython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Banking &middot; Service Initiation &middot; Multi-Payments &middot; Variable On Demand
        </div>
        <h1 class="ed-doc__title">
          Variable On Demand &mdash; API Guide
          <span class="ed-doc__read">17 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Variable On Demand lets a TPP initiate <strong>multiple</strong> domestic payments at a
          <strong>variable amount</strong> from a customer's account at your LFI via the API Hub.
          The PSU authorises the consent once &mdash; approving the per-payment maximum and periodic
          spend limits &mdash; and the TPP can then submit individual payments on-demand, each with
          its own amount, without re-authorisation. The consent may fix a list of up to ten allowed
          creditors or leave the creditor list open (the "open beneficiaries" model), in which case
          the TPP supplies the creditor fresh on each payment. Payments run on AANI as the primary
          rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI
          MUST implement so the Hub can serve every payment under the consent from creation through
          to execution and status retrieval.
        </p>
        <p class="ed-doc__lede">
          The behavioural rules for each endpoint &mdash; validation conditions, error mappings,
          post-execution lifecycle &mdash; are in the
          <a href="./requirements">Variable On Demand Requirements</a>. This guide covers the
          request and response shape of each endpoint, with code walkthroughs for the parts that
          need them: decrypting the PII, validating the creditor list (or confirming it is open),
          matching the payment-time PII against the consent, and applying the duplicate-in-flight
          check that is specific to on-demand consent types.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What must be in place before you implement"
      tone="cream"
    >
      <EdProse>Before implementing Variable On Demand, ensure the following are in place:</EdProse>

      <EdBullets>
        <li>
          <strong>API Hub onboarded</strong> &mdash; Your API Hub instance is provisioned and your
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific configuration</a>
          is complete.
        </li>
        <li>
          <strong>Enc1 key pair generated and registered</strong> &mdash; The TPP encrypts PII to your
          LFI's
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key">Enc1 public key</a>.
          Your LFI MUST hold the corresponding private key and be able to look it up by <code>kid</code>.
        </li>
        <li>
          <strong>Consent Journey implemented</strong> &mdash; The
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>
          MUST be implemented first. A payment cannot be initiated without an authorized consent.
        </li>
        <li>
          <strong>Ozone Connect connectivity verified</strong> &mdash; Bidirectional mTLS connectivity is
          confirmed between the API Hub and your Ozone Connect base URL. See
          <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a>.
        </li>
        <li>
          <strong>Variable On Demand beneficiary models advertised</strong> &mdash; For each beneficiary
          model you support, the corresponding flag MUST be set to <code>true</code> on your
          authorisation server entry in the Trust Framework:
          <code>ApiMetadata.VariableOnDemand.SingleBeneficiarySupported</code> (consents
          carrying exactly 1 creditor),
          <code>ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported</code> (consents
          carrying 2&ndash;10 creditors), and/or
          <code>ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported</code> (consents that
          omit <code>Initiation.Creditor</code>). A consent for a model the LFI has not advertised
          MUST be rejected at consent validation.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Variable On Demand"
      tone="surface"
    >
      <APIFlowViewer title="Variable On Demand API Flow">
        <APIFlowsOnDemand />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="consent-validation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent Validation"
      title="Validate the consent before it is created"
      tone="cream"
    >
      <EdProse>
        When a TPP creates a payment consent, the API Hub calls your
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint <strong>before</strong> the consent is created. Your LFI MUST validate the consent and
        respond with <code>data.status: "valid"</code> or <code>data.status: "invalid"</code>. An
        <code>invalid</code> response prevents the consent being created and the TPP receives an error.
      </EdProse>
      <EdProse>
        The full set of validation rules &mdash; <code>standardVersion</code>,
        <code>Initiation.DebtorAccount</code>, <code>BaseConsentId</code>, <code>CurrencyRequest</code>,
        beneficiary-model support, PII conformance, creditor checks &mdash; is enumerated in
        <a href="./requirements#consent-validation">Variable On Demand Requirements &mdash; Consent Validation</a>.
        The two parts that need a code walkthrough are <strong>decrypting the PII</strong> and
        <strong>validating the creditor list</strong>; both are covered below.
      </EdProse>

      <h3 class="ed-doc__subhead">Decrypting and validating the PII</h3>
      <EdProse>
        The <code>consent.PersonalIdentifiableInformation</code> field arrives as a JWE compact string
        encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged
        &mdash; it cannot inspect the contents and has not validated them. Decryption, schema
        validation, and field-level checks are entirely the LFI's responsibility.
      </EdProse>

      <EdProse>The end-to-end flow is:</EdProse>
      <EdBullets>
        <li>Read the <code>kid</code> from the JWE protected header and look up the matching Enc1 private key</li>
        <li>Decrypt the JWE &rarr; recover the inner JWS</li>
        <li>Decode the JWS payload (signature verification is <strong>optional</strong> &mdash; the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit)</li>
        <li>Validate the decoded payload against the consent-time PII schema &mdash; <code>AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII</code> in <code>uae-api-hub-consent-manager-openapi.yaml</code>. <code>additionalProperties: false</code> is set at every level, so any unexpected field fails validation</li>
      </EdBullets>

      <EdProse>Happy-path snippet:</EdProse>
      <EdCodeGroup :tabs="piiDecryptTabs" />

      <EdProse>
        For the per-step deep dive &mdash; <code>kid</code> lookup conventions, key import options,
        the optional JWS signature verification, building the <code>ajv</code> /
        <code>jsonschema</code> validator with all <code>$ref</code> schemas registered &mdash; see
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii">How to Decrypt PII</a>.
      </EdProse>

      <EdProse>
        The decrypted consent-time PII for a Variable On Demand consent &mdash; shown here in the
        2-creditor "multiple beneficiaries" shape &mdash; looks like:
      </EdProse>
      <EdCode :code="consentPiiJson" lang="json" filename="decrypted consent-time PII" />

      <EdProse>
        In the "open beneficiaries" shape, <code>Initiation.Creditor</code> is omitted entirely and
        the creditor is supplied fresh on each payment at
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        time.
      </EdProse>
      <EdProse>
        If decryption fails, schema validation fails, or any required field is missing, respond with
        <code>invalid</code> per
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent">Rejecting an invalid consent</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Validating the Creditor list</h3>
      <EdProse>
        For Variable On Demand the creditor shape depends on the beneficiary model the TPP chose:
      </EdProse>
      <EdBullets>
        <li><strong>Single beneficiary</strong> &mdash; <code>Initiation.Creditor</code> is an array of exactly <strong>1</strong> entry (<code>ApiMetadata.VariableOnDemand.SingleBeneficiarySupported</code>)</li>
        <li><strong>Multiple beneficiaries</strong> &mdash; <code>Initiation.Creditor</code> is an array of <strong>2&ndash;10</strong> entries (<code>ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported</code>)</li>
        <li><strong>Open beneficiaries</strong> &mdash; <code>Initiation.Creditor</code> is <strong>omitted</strong> entirely (<code>ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported</code>). The creditor is supplied and validated at payment time &mdash; see <a href="#open-beneficiary">Validating an open-beneficiary creditor at payment time</a></li>
      </EdBullets>

      <EdProse>
        The full Creditor rules &mdash; cardinality, mandatory fields, BIC derivation &mdash; are in
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>.
        This section walks through the consent-time validation in code. Each entry in the list is
        checked independently against the same four-part rule:
      </EdProse>
      <EdBullets>
        <li><strong>Cardinality</strong> &mdash; 1&ndash;10 entries if present; if absent, the beneficiary model is "open" and per-entry validation is deferred to payment time</li>
        <li><strong>Mandatory fields</strong> &mdash; <code>CreditorAccount.SchemeName == "IBAN"</code>, <code>Identification</code> is a syntactically valid UAE IBAN, at least one of <code>Name.en</code> or <code>Name.ar</code> is present</li>
        <li><strong>BIC consistency</strong> &mdash; derive the BIC from the IBAN; if <code>CreditorAgent.Identification</code> was supplied it MUST match</li>
        <li><strong>Domestic rail reachability</strong> &mdash; the receiving bank is reachable on AANI or UAEFTS, and (where the LFI can determine it) the receiving account is in a state that can accept a payment</li>
      </EdBullets>

      <EdProse>
        Steps 2&ndash;4 are universal; step 1 depends on the advertised beneficiary model. The snippet
        below covers all three models.
      </EdProse>
      <EdCodeGroup :tabs="creditorValidateTabs" />

      <h3 class="ed-doc__subhead">Validating the DebtorAccount</h3>
      <EdProse>
        If the TPP supplied <code>Initiation.DebtorAccount</code> in the consent PII, your LFI MUST
        also validate it before approving the consent: <code>SchemeName</code> is <code>IBAN</code>,
        the IBAN corresponds to an account held at this LFI and reachable through this API Hub
        integration, and the account is in a state that permits payment initiation (not blocked,
        dormant, or closed). PSU ownership of the account is <strong>not</strong> checked here &mdash;
        it is checked later during the authorisation journey, once the PSU has authenticated.
      </EdProse>
      <EdProse>
        The full check list and the <code>invalid</code> response shape (with
        <code>code: InvalidDebtorAccount</code>) are in
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account">Debtor Account</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Returning the validate response</h3>
      <EdProse>
        If <code>validateCreditorList</code> (or the DebtorAccount checks) returns a non-null result,
        return it inside <code>data</code> on the validate response:
      </EdProse>
      <EdCode :code="invalidResponseJson" lang="json" filename="invalid validate response" />
      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide#validate-post-consent-action-validate">Consent Events &amp; Actions &mdash; API Guide</a>
        for the full validate request and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-flow"
      num="04"
      color="var(--at-navy)"
      eyebrow="Consent Flow"
      title="Authorize the PSU once at your LFI"
      tone="surface"
    >
      <EdProse>
        After consent creation passes validation, the TPP redirects the PSU to your LFI's
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint">authorization endpoint</a>
        and your LFI runs the standard consent journey: authenticate the PSU, retrieve the consent,
        present the debtor account selection screen subject to the rules in
        <a href="./requirements#authorization-account-selection">Authorization &mdash; Account Selection</a>,
        patch the selected debtor account and PSU identifier onto the consent, and redirect back to
        the Hub.
      </EdProse>

      <EdProse>The endpoints your LFI implements against the API Hub for this flow are:</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Direction</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a></td><td>LFI &rarr; API Hub</td><td>Initiate the authorization interaction</td></tr>
            <tr><td><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a></td><td>LFI &rarr; API Hub</td><td>Retrieve the full consent details</td></tr>
            <tr><td><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a></td><td>LFI &rarr; API Hub</td><td>Update consent status, PSU identifiers, and the selected debtor account</td></tr>
            <tr><td><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a></td><td>LFI &rarr; API Hub</td><td>Complete the interaction and redirect back to the TPP successfully</td></tr>
            <tr><td><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></a></td><td>LFI &rarr; API Hub</td><td>Complete the interaction and redirect back to the TPP with a failure</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Full details are in the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">After the consent is authorized</h3>
      <EdProse>
        When the TPP submits a payment instruction to the API Hub's resource server, the API Hub
        validates the access token, checks the consent is <code>Authorised</code>, checks the
        instructed amount is within the consent's control parameters (per-payment maximum, per-period
        cumulative limits, per-period count), and validates the request against the OpenAPI schema
        &mdash; all before forwarding to your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        endpoint covered in the next section.
      </EdProse>
      <EdProse>
        The Hub does <strong>not</strong> decrypt or inspect the PII. Re-validating the PII and
        matching it against the consent at payment time are the LFI's responsibility.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="post-payments"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Endpoint"
      title="POST /payments"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/payments</code>
      </div>

      <EdProse>
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        is the central endpoint your LFI implements for payment execution. The API Hub calls it each
        time the TPP submits a payment under an authorized Variable On Demand consent. Your LFI MUST
        decrypt and validate the PII, match it against the consent's creditor list (or validate the
        freshly-supplied creditor for open-beneficiary consents), run the synchronous validations
        listed in
        <a href="./requirements#post-payments-payment-execution">POST <code>/payments</code> Requirements</a>
        &mdash; including the duplicate-in-flight check that is specific to on-demand consent types
        &mdash; create the payment record, and return <code>201</code> with the assigned
        <code>PaymentId</code>.
      </EdProse>
      <EdProse>
        Screening, rail submission, and status propagation happen <strong>after</strong> the
        <code>201</code> response &mdash; see <a href="#after-201">After returning 201</a>.
      </EdProse>

      <h3 id="common-request-headers" class="ed-doc__subhead">Common request headers</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-aspsp-id</code></td><td>Yes <em>(deprecated)</em></td><td>Deprecated alias for <code>o3-provider-id</code>. Will be removed in a future version &mdash; use <code>o3-provider-id</code></td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>Yes</td><td>Software statement ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (<code>POST</code>)</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-consent-id</code></td><td>Yes</td><td>The <code>consentId</code> for which this call is being made &mdash; the lookup key for the stored consent context (see <a href="#match-pii">Matching the PII against the consent</a>)</td></tr>
            <tr><td><code>o3-psu-identifier</code></td><td>Yes</td><td>Base64-encoded PSU identifier JSON object &mdash; the opaque LFI-issued reference patched onto the consent at authorization</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Customer-set FAPI headers are inside the body, not the HTTP request">
        <p>
          The headers the TPP set on its original call to the API Hub &mdash; including
          <code>x-fapi-interaction-id</code>, <code>x-fapi-auth-date</code>,
          <code>x-customer-user-agent</code>, and <code>x-idempotency-key</code> &mdash; are
          forwarded to your LFI <strong>inside the request body</strong> as
          <code>requestHeaders</code>, not on the HTTP headers of the API Hub &rarr; LFI call.
          On-demand consent types do <strong>not</strong> require
          <code>x-fapi-customer-ip-address</code> on every payment &mdash; the PSU may not be
          present when the TPP triggers an on-demand payment.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Request body</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. The Hub sends a plain JSON payload (not a JWS)
        containing the payment details, the headers the TPP supplied, and the TPP's directory record.
      </EdProse>

      <h4 class="ed-doc__subhead-minor">Top-level fields</h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>requestUrl</code></td><td>string</td><td>No</td><td>The TPP-facing resource URL the TPP called, e.g. <code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.1/payments</code></td></tr>
            <tr><td><code>paymentType</code></td><td>string</td><td>Yes</td><td>The payment type. MUST be <code>cbuae-payment</code> for domestic Variable On Demand</td></tr>
            <tr><td><code>request.Data</code></td><td>object</td><td>Yes</td><td>The payment payload &mdash; see <code>request.Data</code> below</td></tr>
            <tr><td><code>requestHeaders</code></td><td>object</td><td>Yes</td><td>The complete set of HTTP headers the TPP sent to the API Hub. The TPP's FAPI headers live here</td></tr>
            <tr><td><code>tpp</code></td><td>object</td><td>Yes</td><td>The TPP's directory record (<code>clientId</code>, <code>orgId</code>, <code>tppId</code>, <code>tppName</code>, <code>softwareStatementId</code>, <code>decodedSsa</code>, optional <code>directoryRecord</code>)</td></tr>
            <tr><td><code>supplementaryInformation</code></td><td>object</td><td>No</td><td>Free-form pass-through context. The LFI MUST safely ignore unrecognised properties</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor">request.Data</h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code></td><td>string</td><td>Yes</td><td>The consent the payment is being executed under. MUST equal the <code>o3-consent-id</code> header</td></tr>
            <tr><td><code>Instruction.Amount.Amount</code></td><td>string</td><td>Yes</td><td>Decimal amount with two fraction digits, e.g. <code>125.50</code>. The Hub has already enforced it is within the consent's per-payment maximum and periodic limits before forwarding</td></tr>
            <tr><td><code>Instruction.Amount.Currency</code></td><td>string</td><td>Yes</td><td>ISO-4217 currency code. MUST be <code>AED</code> for domestic payments</td></tr>
            <tr><td><code>PaymentPurposeCode</code></td><td>string</td><td>Yes</td><td>3-letter ISO 20022 purpose code, e.g. <code>GDDS</code></td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code></td><td>string</td><td>Yes</td><td>Encrypted PII payload as a JWE compact string. Carries the creditor &mdash; required whether the consent fixed a list or left beneficiaries open &mdash; see <a href="#read-pii">Reading the PII at payment time</a></td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>No</td><td>Reference shown on the debtor's statement</td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>No</td><td>Reference shown on the creditor's statement</td></tr>
            <tr><td><code>OpenFinanceBilling.Type</code></td><td>string</td><td>Yes</td><td>Billing type, e.g. <code>Collection</code>, <code>PushP2P</code>, <code>PullP2P</code>, <code>Me2Me</code></td></tr>
            <tr><td><code>OpenFinanceBilling.MerchantId</code></td><td>string</td><td>No</td><td>Optional merchant identifier</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        For the full schema &mdash; including <code>tpp</code> and <code>decodedSsa</code>
        field-by-field &mdash; see the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments">POST <code>/payments</code> API Reference</a>.
      </EdProse>

      <h4 class="ed-doc__subhead-minor">Request example</h4>
      <EdCode :code="paymentRequestJson" lang="json" filename="POST /payments request" />

      <h3 id="read-pii" class="ed-doc__subhead">Reading the PII at payment time</h3>
      <EdProse>The payment-time PII follows a different shape from the consent-time PII:</EdProse>
      <EdBullets>
        <li><strong><code>Initiation.Creditor</code> is a single object</strong>, not an array &mdash; each payment pays exactly one creditor, whether or not a list was fixed at consent time</li>
        <li><strong><code>DebtorAccount</code> is absent</strong> &mdash; the debtor was selected and pinned during consent authorisation</li>
        <li>The schema to validate against is <code>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code> in <code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code> &mdash; <strong>not</strong> the consent-time schema</li>
      </EdBullets>

      <EdProse>
        The decrypt + decode flow is identical to consent time &mdash; read the <code>kid</code>,
        decrypt with the matching Enc1 private key, decode the JWS payload. Re-use the helper from
        <a href="#consent-validation">Decrypting and validating the PII</a>; only swap the schema:
      </EdProse>
      <EdCodeGroup :tabs="piiPaymentTabs" />

      <EdProse>
        If decryption fails, reject with <code>400 JWE.DecryptionError</code>. If schema validation
        fails (missing required field, wrong type, or additional property), reject with
        <code>400 Body.InvalidFormat</code>.
      </EdProse>

      <EdProse>A decrypted payment-time PII for Variable On Demand looks like:</EdProse>
      <EdCode :code="paymentPiiJson" lang="json" filename="decrypted payment-time PII" />

      <h3 id="match-pii" class="ed-doc__subhead">Matching the PII against the consent</h3>
      <EdProse>
        Per
        <a href="./requirements#post-payments-payment-execution">POST <code>/payments</code> Requirements</a>
        rule 2, Variable On Demand splits into two flows at payment time depending on whether the consent
        fixed a list of creditors or left beneficiaries open:
      </EdProse>
      <EdBullets>
        <li><strong>Consent fixed a creditor list (1&ndash;10 entries)</strong> &mdash; the submitted creditor MUST exactly match <strong>one</strong> of the consent-time entries. Mismatch &rarr; <code>400 Consent.FailsControlParameters</code></li>
        <li><strong>Consent left beneficiaries open</strong> &mdash; there is nothing to match against; the deferred creditor validation runs here instead. A failed check &rarr; <code>400 Consent.FailsControlParameters</code></li>
      </EdBullets>

      <EdProse>
        The link between the payment and the consent is the <code>o3-consent-id</code> request header
        (also surfaced as <code>request.Data.ConsentId</code> in the body). The fixed-list flow has
        two implementation patterns; the open-beneficiaries flow is a single path covered in the next
        subsection.
      </EdProse>

      <h4 class="ed-doc__subhead-minor">Pattern A &mdash; LFI persisted the decrypted creditor list at consent time</h4>
      <EdProse>
        The most common pattern. At consent validation, after you decrypted and validated the
        consent-time PII, you persisted the creditor list keyed by <code>consentId</code>. At payment
        time you fetch it and search for an exact match against the payment-time creditor.
      </EdProse>
      <EdCodeGroup :tabs="matchPiiTabs" />

      <h4 class="ed-doc__subhead-minor">Pattern B &mdash; LFI did not persist the consent-time PII</h4>
      <EdProse>
        If your LFI did not persist the decrypted PII at consent time, fetch the consent from the API
        Hub via
        <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a>,
        decrypt the consent's <code>PersonalIdentifiableInformation</code> field, and run the same
        matching logic: for a fixed list, <code>some(isExactMatch, paymentCreditor)</code> against
        <code>Initiation.Creditor</code>; for an open-beneficiary consent (the field is absent), fall
        through to the open-beneficiary validation below.
      </EdProse>
      <EdProse>
        Pattern B trades stored state for a network round-trip and a second decryption on every
        payment. Choose Pattern A unless persistence is not an option for your LFI.
      </EdProse>

      <h3 id="open-beneficiary" class="ed-doc__subhead">Validating an open-beneficiary creditor at payment time</h3>
      <EdProse>
        When the consent omitted <code>Initiation.Creditor</code>, the creditor validation that would
        normally run at consent-validate time is deferred to
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
        The checks are the same four-part rule from consent validation &mdash; mandatory fields, BIC
        consistency, domestic rail reachability. The only differences are the error shape (HTTP
        <code>400</code> with <code>errorCode: Consent.FailsControlParameters</code>, rather than the
        <code>invalid</code> JSON body) and the fact that only a single creditor is being checked.
      </EdProse>
      <EdCodeGroup :tabs="openBeneficiaryTabs" />

      <h3 id="duplicate-in-flight" class="ed-doc__subhead">Duplicate-in-flight check</h3>
      <EdProse>
        Per
        <a href="./requirements#post-payments-payment-execution">POST <code>/payments</code> Requirements</a>
        rule 5, Variable On Demand payments are subject to a duplicate-in-flight check that on-demand
        consent types carry but one-off and scheduled payments do not. Before the payment record is
        created, your LFI MUST check whether another payment under the same consent, with the same
        creditor and the same instructed amount, is currently in <code>Pending</code> status. If so,
        reject the new request with <code>409 Payment.DuplicateInFlight</code>.
      </EdProse>
      <EdProse>
        This is distinct from <code>x-idempotency-key</code> handling: the idempotency key catches
        TPP retries of the same HTTP request, while this rule catches genuinely separate payment
        intents that happen to duplicate a still-in-flight one.
      </EdProse>
      <EdCodeGroup :tabs="dupCheckTabs" />
      <EdProse>
        Once the prior payment has left <code>Pending</code> (reached
        <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>,
        <code>AcceptedWithoutPosting</code>, or <code>Rejected</code>), a subsequent identical payment
        is permitted.
      </EdProse>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. Return <code>201</code> on successful payment
        record creation.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>data.id</code></td><td>string</td><td>Yes</td><td>The LFI-assigned <code>PaymentId</code>. MUST be unique within your payment system, MUST NOT be reassigned, and MUST resolve to the same payment for the full 1-year <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></span> sustain window</td></tr>
            <tr><td><code>data.consentId</code></td><td>string</td><td>No</td><td>The consent under which the payment was created</td></tr>
            <tr><td><code>data.paymentTransactionId</code></td><td>string</td><td>No</td><td>End-to-end identifier from the rail. Omit until AANI/UAEFTS has assigned one &mdash; do not return an empty string</td></tr>
            <tr><td><code>data.status</code></td><td>string</td><td>Yes</td><td>One of <code>Pending</code>, <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code>, <code>Rejected</code>, <code>Received</code></td></tr>
            <tr><td><code>data.statusUpdateDateTime</code></td><td>string</td><td>Yes</td><td>ISO 8601 timestamp of the last status update</td></tr>
            <tr><td><code>data.creationDateTime</code></td><td>string</td><td>Yes</td><td>ISO 8601 timestamp the payment record was created</td></tr>
            <tr><td><code>data.instruction.Amount.amount</code> / <code>Amount.currency</code></td><td>string</td><td>No</td><td>The payment amount and currency</td></tr>
            <tr><td><code>data.paymentPurposeCode</code></td><td>string</td><td>Yes</td><td>The purpose code from the request</td></tr>
            <tr><td><code>data.openFinanceBilling.Type</code></td><td>string</td><td>Yes</td><td>The billing type from the request</td></tr>
            <tr><td><code>meta</code></td><td>object</td><td>No</td><td>Free-form metadata</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor">Example &mdash; successful initiation</h4>
      <EdCode :code="paymentSuccessJson" lang="json" filename="POST /payments 201 response" />

      <h3 class="ed-doc__subhead">Error responses</h3>
      <EdProse>
        Only return an error when the request is invalid or a server condition prevents you from
        responding. All error bodies MUST include <code>errorCode</code> and <code>errorMessage</code>.
        The <code>errorCode</code> values are drawn from the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments">POST <code>/payments</code> OpenAPI schema</a>
        <code>Error400</code> / <code>Error403</code> / <code>Error409</code> enums.
      </EdProse>

      <h4 class="ed-doc__subhead-minor"><code>400</code> &mdash; Bad request</h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>errorCode</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Body.InvalidFormat</code></td><td>Body is absent, not valid JSON, or fails schema validation &mdash; including missing <code>Risk.DebtorIndicators.Authentication</code>, <code>x-fapi-auth-date</code>, or <code>x-fapi-customer-ip-address</code></td></tr>
            <tr><td><code>Resource.InvalidFormat</code></td><td>A field is present but not syntactically valid</td></tr>
            <tr><td><code>Consent.Invalid</code></td><td>The consent referenced by <code>o3-consent-id</code> is unknown to the LFI or has been revoked</td></tr>
            <tr><td><code>Consent.FailsControlParameters</code></td><td>The payment-time creditor does not match any entry on a fixed-list consent, or fails open-beneficiary creditor validation</td></tr>
            <tr><td><code>Consent.BusinessRuleViolation</code></td><td>An LFI-side business rule blocks the payment</td></tr>
            <tr><td><code>JWE.DecryptionError</code></td><td>PII JWE cannot be decrypted with any registered Enc1 key</td></tr>
            <tr><td><code>JWE.InvalidHeader</code></td><td>PII JWE header is malformed</td></tr>
            <tr><td><code>JWS.InvalidSignature</code> / <code>JWS.Malformed</code> / <code>JWS.InvalidClaim</code> / <code>JWS.InvalidHeader</code></td><td>PII inner JWS fails verification (only relevant if you have opted in to verifying the TPP's signature)</td></tr>
            <tr><td><code>GenericRecoverableError</code></td><td>Recoverable validation error not covered above &mdash; Hub may retry</td></tr>
            <tr><td><code>GenericError</code></td><td>Unrecoverable validation error not covered above (including insufficient funds &mdash; see requirements rule 3)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor"><code>403</code> &mdash; Forbidden</h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>errorCode</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>AccessToken.InvalidScope</code></td><td>The Hub's token does not include the required scope</td></tr>
            <tr><td><code>Consent.AccountTemporarilyBlocked</code></td><td>Debtor account is <code>Inactive</code>, <code>Dormant</code>, or <code>Suspended</code></td></tr>
            <tr><td><code>Consent.PermanentAccountAccessFailure</code></td><td>Debtor account is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code></td></tr>
            <tr><td><code>Consent.TransientAccountAccessFailure</code></td><td>Debtor account temporarily inaccessible &mdash; Hub may retry after a delay</td></tr>
            <tr><td><code>GenericRecoverableError</code> / <code>GenericError</code></td><td>Other forbidden conditions</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor"><code>409</code> &mdash; Conflict</h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>errorCode</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Payment.DuplicateInFlight</code></td><td>Another payment with the same creditor and amount under the same consent is still <code>Pending</code> &mdash; see <a href="#duplicate-in-flight">Duplicate-in-flight check</a></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor"><code>500</code></h4>
      <EdProse>
        <code>500</code> for transient/unrecoverable server errors. Use
        <code>GenericRecoverableError</code> if the Hub may retry, <code>GenericError</code> otherwise.
      </EdProse>

      <h4 class="ed-doc__subhead-minor">Example error response</h4>
      <EdCode :code="paymentErrorJson" lang="json" filename="error response" />
    </EdSectionBand>

    <EdSectionBand
      id="after-201"
      num="06"
      color="var(--at-teal)"
      eyebrow="After returning 201"
      title="Asynchronous lifecycle is the LFI's responsibility"
      tone="surface"
    >
      <EdProse>
        The <code>201</code> returned to the API Hub means the payment record exists at your LFI; it
        does <strong>not</strong> mean the payment has settled. The lifecycle from here is asynchronous
        and is the LFI's responsibility:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Stage</th><th>LFI behaviour</th><th>Reference</th></tr>
          </thead>
          <tbody>
            <tr><td>Screening</td><td>Run the LFI's standard fraud / sanctions / AML controls on the payment record. SHOULD complete within 3 seconds. On a screening failure, immediately PATCH the payment to <code>Rejected</code> with an <code>LFI.</code>-namespaced reject reason</td><td><a href="./requirements#screening-checks">Screening Checks</a></td></tr>
            <tr><td>Rail submission</td><td>Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable or the receiving bank cannot receive via AANI &mdash; no TPP/PSU intervention</td><td><a href="./requirements#rail-submission">Rail Submission</a></td></tr>
            <tr><td>Status propagation</td><td>On every rail status change that maps to an Open Finance status, call <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></a> on the API Hub Consent Manager. Once AANI/UAEFTS assigns the end-to-end identifier, include it as <code>paymentTransactionId</code> on the next PATCH</td><td><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</a></td></tr>
            <tr><td>Rail rejection</td><td>If the rail rejects the payment, PATCH <code>paymentResponse.status: Rejected</code> with <code>RejectReasonCode.Code</code> namespaced as <code>AANI.</code> or <code>FTS.</code> and a sanitised <code>Message</code> for relay to the TPP</td><td><a href="./requirements#rail-submission">Rail Submission</a></td></tr>
            <tr><td>Status retrieval</td><td>Continue serving <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a> for at least 1 year, with <code>Status</code> and <code>paymentTransactionId</code> consistent with the most recent PATCH</td><td><a href="#get-payments-paymentid">GET <code>/payments/{paymentId}</code> rules below</a></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        PATCH delivery is durable: retry transient <code>5xx</code>/timeout failures with exponential
        backoff; raise <code>4xx</code> failures for operational investigation rather than retrying.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="patch-payment-log"
      num="07"
      color="var(--at-gold)"
      eyebrow="Endpoint"
      title="PATCH /payment-log/{id}"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-patch">PATCH</span>
        <code class="ed-doc__endpoint-path">/payment-log/{id}</code>
      </div>

      <EdProse>
        This endpoint updates the payment status on the API Hub. The Hub uses the update to send
        asynchronous notifications to TPPs and to maintain accurate state for billing and limit
        calculations. The LFI calls it for every Open Finance-relevant status transition after the
        <code>201</code> has been returned to the Hub on
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (<code>PATCH</code>)</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-consent-id</code></td><td>Yes</td><td>The consent backing this payment</td></tr>
            <tr><td><code>o3-psu-identifier</code></td><td>Yes</td><td>Base64-encoded psuIdentifier JSON object</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>id</code></td><td>string</td><td>Identifier of the payment log entry being updated &mdash; the <code>data.id</code> returned from <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Request body</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. The PATCH body uses literal flat-key JSON (the
        dots are part of the key, not nested objects):
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>paymentResponse.status</code></td><td>string</td><td>Yes</td><td><code>Pending</code>, <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code>, or <code>Rejected</code>. See <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</a></td></tr>
            <tr><td><code>paymentResponse.paymentTransactionId</code></td><td>string</td><td>Conditional</td><td>The end-to-end identifier assigned by the rail (AANI or UAEFTS). Set on the first PATCH that carries it; once set, MUST NOT change</td></tr>
            <tr><td><code>paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions</code></td><td>integer</td><td>No</td><td>Number of successful transactions (typically <code>1</code> per payment)</td></tr>
            <tr><td><code>paymentResponse.RejectReasonCode[]</code></td><td>array</td><td>Conditional</td><td>Required when <code>paymentResponse.status</code> is <code>Rejected</code>. Append new reasons rather than replacing &mdash; preserves history</td></tr>
            <tr><td><code>paymentResponse.RejectReasonCode[].Code</code></td><td>string</td><td>Yes (in array)</td><td>Namespaced rejection code: <code>LFI.&hellip;</code> for an LFI-side rejection (e.g. screening), <code>AANI.&hellip;</code> or <code>FTS.&hellip;</code> for a rail rejection. Pattern: <code>^(LFI|AANI|FTS)\.[A-Za-z0-9]+$</code></td></tr>
            <tr><td><code>paymentResponse.RejectReasonCode[].Message</code></td><td>string</td><td>Yes (in array)</td><td>Sanitised, customer-relayable description. MUST NOT reveal detection logic, sanctions matches, or internal case identifiers</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor">Example &mdash; successful settlement</h4>
      <EdCode :code="patchSettleJson" lang="json" filename="PATCH /payment-log/{id} — settled" />

      <h4 class="ed-doc__subhead-minor">Example &mdash; rail rejection</h4>
      <EdCode :code="patchRailRejectJson" lang="json" filename="PATCH /payment-log/{id} — rail rejection" />

      <h4 class="ed-doc__subhead-minor">Example &mdash; LFI screening rejection</h4>
      <EdCode :code="patchScreeningRejectJson" lang="json" filename="PATCH /payment-log/{id} — screening rejection" />

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. A successful PATCH returns <code>204 No Content</code>
        with no body. See the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log">PATCH <code>/payment-log/:id</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-payments-paymentid"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Endpoint"
      title="GET /payments/{paymentId}"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/payments/{paymentId}</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.1/payments/{PaymentId}</code>.
      </EdProse>
      <EdProse>
        Returns the current state of a payment your LFI created via
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
        The TPP polls this to observe screening outcomes, rail settlement, and any subsequent
        rejection.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>paymentId</code></td><td>string</td><td>The <code>PaymentId</code> your LFI returned from <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. The response shape mirrors the
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        <code>201</code> response &mdash; same <code>data</code> envelope, with the current
        <code>Status</code>, <code>paymentTransactionId</code> (once assigned by the rail), and any
        rejection details.
      </EdProse>
      <EdCode :code="getPaymentJson" lang="json" filename="GET /payments/{paymentId} response" />

      <h3 class="ed-doc__subhead">Behavioural rules</h3>
      <EdProse>
        Per
        <a href="./requirements#get-payments-paymentid-payment-status-retrieval">GET <code>/payments/{paymentId}</code> Requirements</a>:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Rule</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><strong>Sustain period</strong> &mdash; Serve <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></span> for at least <strong>1 year from the payment's creation date</strong>. Within this window, the response MUST reflect the current status, including any later screening, rail, or reversal outcomes</td></tr>
            <tr><td>2</td><td><strong>Status consistency with the API Hub</strong> &mdash; The <code>Status</code> returned MUST exactly match the most recent value PATCHed to the API Hub Consent Manager via <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></a>. Any change in the LFI's systems MUST be reflected on both surfaces before it becomes observable to the TPP</td></tr>
            <tr><td>3</td><td><strong><code>paymentTransactionId</code> consistency</strong> &mdash; Once the rail has assigned the end-to-end identifier and the LFI has PATCHed it to the Consent Manager, this endpoint MUST return the same value. Before assignment, omit the field entirely &mdash; do not return an empty string</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>errorCode</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>404</code></td><td><code>Resource.NotFound</code></td><td>No payment exists for the supplied <code>paymentId</code> (or the payment exists but belongs to a different consent)</td></tr>
            <tr><td><code>403</code></td><td><code>Consent.AccountTemporarilyBlocked</code> / <code>Consent.PermanentAccountAccessFailure</code></td><td>The debtor account has become inaccessible since the payment was created</td></tr>
            <tr><td><code>500</code></td><td><code>GenericRecoverableError</code> / <code>GenericError</code></td><td>Transient or unrecoverable server error</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId">GET <code>/payments/{paymentId}</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__subhead-minor {
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 1.25rem 0 0.65rem;
}
.ed-doc__subhead-minor :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
