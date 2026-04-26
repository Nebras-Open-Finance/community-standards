---
next: false
prev: false
aside: false
---

🕒 **17 minute read**

# Variable On Demand - API Guide

Variable On Demand lets a TPP initiate **multiple** domestic payments at a **variable amount** from a customer's account at your LFI via the API Hub. The PSU authorises the consent once — approving the per-payment maximum and periodic spend limits — and the TPP can then submit individual payments on-demand, each with its own amount, without re-authorisation. The consent may fix a list of up to ten allowed creditors or leave the creditor list open (the "open beneficiaries" model), in which case the TPP supplies the creditor fresh on each payment. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval.

The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the [Variable On Demand Requirements](./requirements). This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor list (or confirming it is open), matching the payment-time PII against the consent, and applying the duplicate-in-flight check that is specific to on-demand consent types.

## Prerequisites

Before implementing Variable On Demand, ensure the following are in place:

1. **API Hub onboarded** — Your API Hub instance is provisioned and your [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/) is complete
2. **Enc1 key pair generated and registered** — The TPP encrypts PII to your LFI's [Enc1 public key](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key). Your LFI MUST hold the corresponding private key and be able to look it up by `kid`
3. **Consent Journey implemented** — The [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide) MUST be implemented first. A payment cannot be initiated without an authorized consent
4. **Ozone Connect connectivity verified** — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/)
5. **Variable On Demand beneficiary models advertised** — For each beneficiary model you support, the corresponding flag MUST be set to `true` on your authorisation server entry in the Trust Framework: `ApiMetadata.VariableOnDemand.SingleBeneficiarySupported` (consents carrying exactly 1 creditor), `ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported` (consents carrying 2–10 creditors), and/or `ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported` (consents that omit `Initiation.Creditor`). A consent for a model the LFI has not advertised MUST be rejected at consent validation

## API Sequence Flow

<APIFlowViewer title="Variable On Demand API Flow">
  <APIFlowsOnDemand/>
</APIFlowViewer>

## Consent Validation

When a TPP creates a payment consent, the API Hub calls your [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint **before** the consent is created. Your LFI MUST validate the consent and respond with `data.status: "valid"` or `data.status: "invalid"`. An `invalid` response prevents the consent being created and the TPP receives an error.

The full set of validation rules — `standardVersion`, `Initiation.DebtorAccount`, `BaseConsentId`, `CurrencyRequest`, beneficiary-model support, PII conformance, creditor checks — is enumerated in [Variable On Demand Requirements — Consent Validation](./requirements#consent-validation). The two parts that need a code walkthrough are **decrypting the PII** and **validating the creditor list**; both are covered below.

### Decrypting and validating the PII

The `consent.PersonalIdentifiableInformation` field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility.

The end-to-end flow is:

1. Read the `kid` from the JWE protected header and look up the matching Enc1 private key
2. Decrypt the JWE → recover the inner JWS
3. Decode the JWS payload (signature verification is **optional** — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit)
4. Validate the decoded payload against the consent-time PII schema — `AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII` in `uae-api-hub-consent-manager-openapi.yaml`. `additionalProperties: false` is set at every level, so any unexpected field fails validation

Happy-path snippet:

::: code-group

```typescript [Node.js (jose + ajv)]
import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

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
```

```python [Python (jwcrypto + jsonschema)]
import json, base64
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
```

:::

For the per-step deep dive — `kid` lookup conventions, key import options, the optional JWS signature verification, building the `ajv` / `jsonschema` validator with all `$ref` schemas registered — see [How to Decrypt PII](/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii).

The decrypted consent-time PII for a Variable On Demand consent — shown here in the 2-creditor "multiple beneficiaries" shape — looks like:

```json
{
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
```

In the "open beneficiaries" shape, `Initiation.Creditor` is omitted entirely and the creditor is supplied fresh on each payment at `POST /payments` time.

If decryption fails, schema validation fails, or any required field is missing, respond with `invalid` per [Rejecting an invalid consent](/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor#rejecting-an-invalid-consent).

### Validating the Creditor list

For Variable On Demand the creditor shape depends on the beneficiary model the TPP chose:

- **Single beneficiary** — `Initiation.Creditor` is an array of exactly **1** entry (`ApiMetadata.VariableOnDemand.SingleBeneficiarySupported`)
- **Multiple beneficiaries** — `Initiation.Creditor` is an array of **2–10** entries (`ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported`)
- **Open beneficiaries** — `Initiation.Creditor` is **omitted** entirely (`ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported`). The creditor is supplied and validated at payment time — see [Validating an open-beneficiary creditor at payment time](#validating-an-open-beneficiary-creditor-at-payment-time)

The full Creditor rules — cardinality, mandatory fields, BIC derivation — are in [Creditor](/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor). This section walks through the consent-time validation in code. Each entry in the list is checked independently against the same four-part rule:

1. **Cardinality** — 1–10 entries if present; if absent, the beneficiary model is "open" and per-entry validation is deferred to payment time
2. **Mandatory fields** — `CreditorAccount.SchemeName == "IBAN"`, `Identification` is a syntactically valid UAE IBAN, at least one of `Name.en` or `Name.ar` is present
3. **BIC consistency** — derive the BIC from the IBAN; if `CreditorAgent.Identification` was supplied it MUST match
4. **Domestic rail reachability** — the receiving bank is reachable on AANI or UAEFTS, and (where the LFI can determine it) the receiving account is in a state that can accept a payment

Steps 2–4 are universal; step 1 depends on the advertised beneficiary model. The snippet below covers all three models.

::: code-group

```typescript [Node.js]
function isValidUaeIban(iban: string): boolean {
  // UAE IBAN: AE + 21 digits = 23 chars
  if (!/^AE\d{21}$/.test(iban)) return false
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
  const at = `Initiation.Creditor[${index}]`

  // 2. Mandatory fields
  if (c.CreditorAccount.SchemeName !== 'IBAN') {
    return invalid('InvalidCreditor',
      `${at}.CreditorAccount.SchemeName MUST be "IBAN" for domestic payments.`)
  }
  if (!isValidUaeIban(c.CreditorAccount.Identification)) {
    return invalid('InvalidCreditor',
      `${at}.CreditorAccount.Identification is not a valid UAE IBAN.`)
  }
  if (!c.CreditorAccount.Name?.en && !c.CreditorAccount.Name?.ar) {
    return invalid('InvalidCreditor',
      `${at}.CreditorAccount.Name MUST include at least one of "en" or "ar".`)
  }

  // 3. BIC consistency
  const derivedBic = deriveBicFromIban(c.CreditorAccount.Identification)
  if (c.CreditorAgent?.Identification && c.CreditorAgent.Identification !== derivedBic) {
    return invalid('InvalidCreditor',
      `${at}.CreditorAgent.Identification does not match the BIC derived from the IBAN.`)
  }

  // 4. Domestic rail reachability + receiving account state
  const r = await lookupRailReachability(derivedBic)
  if (!r.reachableOnAani && !r.reachableOnUaefts) {
    return invalid('UnreachableCreditorAccount',
      `${at}: creditor bank is not reachable on AANI or UAEFTS.`)
  }
  if (r.canDetermineAccountState && !r.accountCanReceive) {
    return invalid('UnreachableCreditorAccount',
      `${at}: creditor account cannot currently receive payments.`)
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
```

```python [Python]
import re

def is_valid_uae_iban(iban: str) -> bool:
    if not re.fullmatch(r"AE\d{21}", iban):
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
```

:::

### Validating the DebtorAccount

If the TPP supplied `Initiation.DebtorAccount` in the consent PII, your LFI MUST also validate it before approving the consent: `SchemeName` is `IBAN`, the IBAN corresponds to an account held at this LFI and reachable through this API Hub integration, and the account is in a state that permits payment initiation (not blocked, dormant, or closed). PSU ownership of the account is **not** checked here — it is checked later during the authorisation journey, once the PSU has authenticated.

The full check list and the `invalid` response shape (with `code: InvalidDebtorAccount`) are in [Debtor Account](/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account).

### Returning the validate response

If `validateCreditorList` (or the DebtorAccount checks) returns a non-null result, return it inside `data` on the validate response:

```json
{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Initiation.Creditor[3].CreditorAccount.Identification is not a valid UAE IBAN."
  },
  "meta": {}
}
```

See [Consent Events & Actions — API Guide](/tech/lfi-api-hub/v2.1/consent-events/api-guide#validate-post-consent-action-validate) for the full validate request and response schema.

## Consent Flow

After consent creation passes validation, the TPP redirects the PSU to your LFI's [authorization endpoint](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint) and your LFI runs the standard consent journey: authenticate the PSU, retrieve the consent, present the debtor account selection screen subject to the rules in [Authorization — Account Selection](./requirements#authorization-account-selection), patch the selected debtor account and PSU identifier onto the consent, and redirect back to the Hub.

The endpoints your LFI implements against the API Hub for this flow are:

| Endpoint | Direction | Purpose |
|----------|-----------|---------|
| [`GET /auth`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth) | LFI → API Hub | Initiate the authorization interaction |
| [`GET /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) | LFI → API Hub | Retrieve the full consent details |
| [`PATCH /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) | LFI → API Hub | Update consent status, PSU identifiers, and the selected debtor account |
| [`POST /auth/{interactionId}/doConfirm`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm) | LFI → API Hub | Complete the interaction and redirect back to the TPP successfully |
| [`POST /auth/{interactionId}/doFail`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail) | LFI → API Hub | Complete the interaction and redirect back to the TPP with a failure |

Full details are in the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide).

### After the consent is authorized

When the TPP submits a payment instruction to the API Hub's resource server, the API Hub validates the access token, checks the consent is `Authorised`, checks the instructed amount is within the consent's control parameters (per-payment maximum, per-period cumulative limits, per-period count), and validates the request against the OpenAPI schema — all before forwarding to your Ozone Connect [`POST /payments`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) endpoint covered in the next section.

The Hub does **not** decrypt or inspect the PII. Re-validating the PII and matching it against the consent at payment time is the LFI's responsibility, covered below.

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/payments`

`POST /payments` is the central endpoint your LFI implements for payment execution. The API Hub calls it each time the TPP submits a payment under an authorized Variable On Demand consent. Your LFI MUST decrypt and validate the PII, match it against the consent's creditor list (or validate the freshly-supplied creditor for open-beneficiary consents), run the synchronous validations listed in [POST `/payments` Requirements](./requirements#post-payments-payment-execution) — including the duplicate-in-flight check that is specific to on-demand consent types — create the payment record, and return `201` with the assigned `PaymentId`.

Screening, rail submission, and status propagation happen **after** the `201` response — see [After returning 201](#after-returning-201).

### Common request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-aspsp-id` | Yes *(deprecated)* | Deprecated alias for `o3-provider-id`. Will be removed in a future version — use `o3-provider-id` |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (`POST`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-consent-id` | Yes | The `consentId` for which this call is being made — the lookup key for the stored consent context (see [Matching the PII against the consent](#matching-the-pii-against-the-consent)) |
| `o3-psu-identifier` | Yes | Base64-encoded PSU identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

::: warning Customer-set FAPI headers are inside the body, not the HTTP request
The headers the TPP set on its original call to the API Hub — including `x-fapi-interaction-id`, `x-fapi-auth-date`, `x-customer-user-agent`, and `x-idempotency-key` — are forwarded to your LFI **inside the request body** as `requestHeaders`, not on the HTTP headers of the API Hub → LFI call. Unlike Single Instant Payment, Variable On Demand does **not** require `x-fapi-customer-ip-address` — the PSU may not be present at the time the TPP submits an on-demand payment.
:::

### Request body

`Content-Type: application/json`

The Hub sends a plain JSON payload (not a JWS) containing the payment details, the headers the TPP supplied, and the TPP's directory record.

#### Top-level fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `requestUrl` | string | No | The TPP-facing resource URL the TPP called, e.g. `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.1/payments` |
| `paymentType` | string | Yes | The payment type. MUST be `cbuae-payment` for domestic Variable On Demand |
| `request.Data` | object | Yes | The payment payload — see `request.Data` below |
| `requestHeaders` | object | Yes | The complete set of HTTP headers the TPP sent to the API Hub. The TPP's FAPI headers live here |
| `tpp` | object | Yes | The TPP's directory record (`clientId`, `orgId`, `tppId`, `tppName`, `softwareStatementId`, `decodedSsa`, optional `directoryRecord`) |
| `supplementaryInformation` | object | No | Free-form pass-through context. The LFI MUST safely ignore unrecognised properties |

#### request.Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ConsentId` | string | Yes | The consent the payment is being executed under. MUST equal the `o3-consent-id` header |
| `Instruction.Amount.Amount` | string | Yes | Decimal amount with two fraction digits, e.g. `125.50`. For Variable On Demand the amount varies per payment — the Hub has already enforced it is within the consent's per-payment maximum and periodic limits before forwarding |
| `Instruction.Amount.Currency` | string | Yes | ISO-4217 currency code. MUST be `AED` for domestic payments |
| `PaymentPurposeCode` | string | Yes | 3-letter ISO 20022 purpose code, e.g. `GDDS` |
| `PersonalIdentifiableInformation` | string | Yes | Encrypted PII payload as a JWE compact string. Carries the creditor — required whether the consent fixed a list or left beneficiaries open — see [Reading the PII at payment time](#reading-the-pii-at-payment-time) |
| `DebtorReference` | string | No | Reference shown on the debtor's statement |
| `CreditorReference` | string | No | Reference shown on the creditor's statement |
| `OpenFinanceBilling.Type` | string | Yes | Billing type, e.g. `Collection`, `PushP2P`, `PullP2P`, `Me2Me` |
| `OpenFinanceBilling.MerchantId` | string | No | Optional merchant identifier |

For the full schema — including `tpp` and `decodedSsa` field-by-field — see the [POST `/payments` API Reference](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments).

#### Request example

```json
{
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
```

### Reading the PII at payment time

The payment-time PII follows a different shape from the consent-time PII:

- **`Initiation.Creditor` is a single object**, not an array — each payment pays exactly one creditor, whether or not a list was fixed at consent time
- **`DebtorAccount` is absent** — the debtor was selected and pinned during consent authorisation
- The schema to validate against is `AEBankServiceInitiation.AEDomesticPaymentPIIProperties` in `uae-ozone-connect-bank-service-initiation-openapi.yaml` — **not** the consent-time schema

The decrypt + decode flow is identical to consent time — read the `kid`, decrypt with the matching Enc1 private key, decode the JWS payload. Re-use the helper from [Decrypting and validating the PII](#decrypting-and-validating-the-pii); only swap the schema:

::: code-group

```typescript [Node.js]
async function decryptAndValidatePaymentPII(piiJwe: string) {
  const pii = await decryptPii(piiJwe) // shared decrypt helper
  validatePaymentPiiSchema(pii)         // AEDomesticPaymentPIIProperties
  return pii
}
```

```python [Python]
def decrypt_and_validate_payment_pii(pii_jwe: str) -> dict:
    pii = decrypt_pii(pii_jwe)              # shared decrypt helper
    validate_payment_pii_schema(pii)        # AEDomesticPaymentPIIProperties
    return pii
```

:::

If decryption fails, reject with `400 JWE.DecryptionError`. If schema validation fails (missing required field, wrong type, additional property), reject with `400 Body.InvalidFormat`.

### Matching the PII against the consent

Per [POST `/payments` Requirements](./requirements#post-payments-payment-execution) rule 2, Variable On Demand splits into two flows at payment time depending on whether the consent fixed a list of creditors or left beneficiaries open:

- **Consent fixed a creditor list (1–10 entries)** — the submitted creditor MUST exactly match **one** of the consent-time entries. Mismatch → `400 Consent.FailsControlParameters`
- **Consent left beneficiaries open** — there is nothing to match against; the deferred creditor validation runs here instead. A failed check → `400 Consent.FailsControlParameters`

The link between the payment and the consent is the `o3-consent-id` request header (also surfaced as `request.Data.ConsentId` in the body). The fixed-list flow has two implementation patterns; the open-beneficiaries flow is a single path covered in the next subsection.

#### Pattern A — LFI persisted the decrypted creditor list at consent time

The most common pattern. At consent validation, after you decrypted and validated the consent-time PII, you persisted the creditor list keyed by `consentId`. At payment time you fetch it and search for an exact match against the payment-time creditor.

::: code-group

```typescript [Node.js]
async function matchPaymentCreditorToConsent(
  consentId: string,
  paymentPii: { Initiation: { Creditor: CreditorEntry } }
): Promise<void> {
  const stored = await consentStore.getConsentContext(consentId)
  if (!stored) {
    throw httpError(400, 'Consent.Invalid', `No stored consent for ${consentId}.`)
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
```

```python [Python]
def match_payment_creditor_to_consent(consent_id: str, payment_pii: dict) -> None:
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
```

:::

#### Pattern B — LFI did not persist the consent-time PII

If your LFI did not persist the decrypted PII at consent time, fetch the consent from the API Hub via [`GET /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId), decrypt the consent's `PersonalIdentifiableInformation` field, and run the same matching logic: for a fixed list, `some(isExactMatch, paymentCreditor)` against `Initiation.Creditor`; for an open-beneficiary consent (the field is absent), fall through to the open-beneficiary validation below.

Pattern B trades stored state for a network round-trip and a second decryption on every payment. Choose Pattern A unless persistence is not an option for your LFI.

### Validating an open-beneficiary creditor at payment time

When the consent omitted `Initiation.Creditor`, the creditor validation that would normally run at consent-validate time is deferred to `POST /payments`. The checks are the same four-part rule from consent validation — mandatory fields, BIC consistency, domestic rail reachability. The only differences are the error shape (HTTP `400` with `errorCode: Consent.FailsControlParameters`, rather than the `invalid` JSON body) and the fact that only a single creditor is being checked.

::: code-group

```typescript [Node.js]
async function validateOpenBeneficiaryCreditor(
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
```

```python [Python]
def validate_open_beneficiary_creditor(creditor: dict) -> None:
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
```

:::

### Duplicate-in-flight check

Per [POST `/payments` Requirements](./requirements#post-payments-payment-execution) rule 6, Variable On Demand payments are subject to a duplicate-in-flight check that on-demand consent types carry but one-off and scheduled payments do not. Before the payment record is created, your LFI MUST check whether another payment under the same consent, with the same creditor and the same instructed amount, is currently in `Pending` status. If so, reject the new request with `409 Payment.DuplicateInFlight`.

This is distinct from `x-idempotency-key` handling: the idempotency key catches TPP retries of the same HTTP request, while this rule catches genuinely separate payment intents that happen to duplicate a still-in-flight one.

::: code-group

```typescript [Node.js]
async function rejectIfDuplicateInFlight(
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
```

```python [Python]
def reject_if_duplicate_in_flight(consent_id: str, payment_creditor: dict, amount: dict) -> None:
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
```

:::

Once the prior payment has left `Pending` (reached `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted`, `AcceptedWithoutPosting`, or `Rejected`), a subsequent identical payment is permitted.

### Response

`Content-Type: application/json`

Return `201` on successful payment record creation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data.id` | string | Yes | The LFI-assigned `PaymentId`. MUST be unique within your payment system, MUST NOT be reassigned, and MUST resolve to the same payment for the full 1-year `GET /payments/{paymentId}` sustain window |
| `data.consentId` | string | No | The consent under which the payment was created |
| `data.paymentTransactionId` | string | No | End-to-end identifier from the rail. Omit until AANI/UAEFTS has assigned one — do not return an empty string |
| `data.status` | string | Yes | One of `Pending`, `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted`, `AcceptedWithoutPosting`, `Rejected`, `Received` |
| `data.statusUpdateDateTime` | string | Yes | ISO 8601 timestamp of the last status update |
| `data.creationDateTime` | string | Yes | ISO 8601 timestamp the payment record was created |
| `data.instruction.Amount.amount` / `Amount.currency` | string | No | The payment amount and currency |
| `data.paymentPurposeCode` | string | Yes | The purpose code from the request |
| `data.openFinanceBilling.Type` | string | Yes | The billing type from the request |
| `meta` | object | No | Free-form metadata |

#### Example — successful initiation

```json
{
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
```

### Error responses

Only return an error when the request is invalid or a server condition prevents you from responding. All error bodies MUST include `errorCode` and `errorMessage`. The `errorCode` values are drawn from the [POST `/payments` OpenAPI schema](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) `Error400` / `Error403` / `Error409` enums.

#### `400` — Bad request

| `errorCode` | When to use |
|-------------|-------------|
| `Body.InvalidFormat` | Body is absent, not valid JSON, or fails schema validation |
| `Resource.InvalidFormat` | A field is present but not syntactically valid |
| `Consent.Invalid` | The consent referenced by `o3-consent-id` is unknown to the LFI or has been revoked |
| `Consent.FailsControlParameters` | The payment-time creditor does not match any entry on a fixed-list consent, or fails open-beneficiary creditor validation |
| `Consent.BusinessRuleViolation` | An LFI-side business rule blocks the payment |
| `JWE.DecryptionError` | PII JWE cannot be decrypted with any registered Enc1 key |
| `JWE.InvalidHeader` | PII JWE header is malformed |
| `JWS.InvalidSignature` / `JWS.Malformed` / `JWS.InvalidClaim` / `JWS.InvalidHeader` | PII inner JWS fails verification (only relevant if you have opted in to verifying the TPP's signature) |
| `GenericRecoverableError` | Recoverable validation error not covered above — Hub may retry |
| `GenericError` | Unrecoverable validation error not covered above (including insufficient funds — see requirements rule 3) |

#### `403` — Forbidden

| `errorCode` | When to use |
|-------------|-------------|
| `AccessToken.InvalidScope` | The Hub's token does not include the required scope |
| `Consent.AccountTemporarilyBlocked` | Debtor account is `Inactive`, `Dormant`, or `Suspended` |
| `Consent.PermanentAccountAccessFailure` | Debtor account is `Closed`, `Deceased`, or `Unclaimed` |
| `Consent.TransientAccountAccessFailure` | Debtor account temporarily inaccessible — Hub may retry after a delay |
| `GenericRecoverableError` / `GenericError` | Other forbidden conditions |

#### `409` — Conflict

| `errorCode` | When to use |
|-------------|-------------|
| `Payment.DuplicateInFlight` | Another payment with the same creditor and amount under the same consent is still `Pending` — see [Duplicate-in-flight check](#duplicate-in-flight-check) |

#### `500`

`500` for transient/unrecoverable server errors. Use `GenericRecoverableError` if the Hub may retry, `GenericError` otherwise.

#### Example error response

```json
{
  "errorCode": "Consent.FailsControlParameters",
  "errorMessage": "Payment creditor does not match any creditor authorised on the consent."
}
```

### After returning 201

The `201` returned to the API Hub means the payment record exists at your LFI; it does **not** mean the payment has settled. The lifecycle from here is asynchronous and is the LFI's responsibility:

| Stage | LFI behaviour | Reference |
|-------|---------------|-----------|
| Screening | Run the LFI's standard fraud / sanctions / AML controls on the payment record. SHOULD complete within 3 seconds. On a screening failure, immediately PATCH the payment to `Rejected` with an `LFI.`-namespaced reject reason | [Screening Checks](./requirements#screening-checks) |
| Rail submission | Submit to AANI as primary. Fall back to UAEFTS automatically if AANI is unavailable or the receiving bank cannot receive via AANI — no TPP/PSU intervention | [Rail Submission](./requirements#rail-submission) |
| Status propagation | On every rail status change that maps to an Open Finance status, call [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log) on the API Hub Consent Manager. Once AANI/UAEFTS assigns the end-to-end identifier, include it as `paymentTransactionId` on the next PATCH | [Payment Status](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status) |
| Rail rejection | If the rail rejects the payment, PATCH `paymentResponse.status: Rejected` with `RejectReasonCode.Code` namespaced as `AANI.` or `FTS.` and a sanitised `Message` for relay to the TPP | [Rail Submission](./requirements#rail-submission) |
| Status retrieval | Continue serving [`GET /payments/{paymentId}`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId) for at least 1 year, with `Status` and `paymentTransactionId` consistent with the most recent PATCH | [GET `/payments/{paymentId}` rules below](#behavioural-rules) |

PATCH delivery is durable: retry transient `5xx`/timeout failures with exponential backoff; raise `4xx` failures for operational investigation rather than retrying.

## <span style="color: #eab308; padding-right: 5px;">PATCH</span> `/payment-log/:id`

This endpoint updates the payment status on the API Hub. The Hub uses the update to send asynchronous notifications to TPPs and to maintain accurate state for billing and limit calculations. The LFI calls it for every Open Finance-relevant status transition after the `201` has been returned to the Hub on `POST /payments`.

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (`PATCH`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-consent-id` | Yes | The consent backing this payment |
| `o3-psu-identifier` | Yes | Base64-encoded psuIdentifier JSON object |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Identifier of the payment log entry being updated — the `data.id` returned from `POST /payments` |

### Request body

`Content-Type: application/json`

The PATCH body uses literal flat-key JSON (the dots are part of the key, not nested objects):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `paymentResponse.status` | string | Yes | `Pending`, `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted`, `AcceptedWithoutPosting`, or `Rejected`. See [Payment Status](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status) |
| `paymentResponse.paymentTransactionId` | string | Conditional | The end-to-end identifier assigned by the rail (AANI or UAEFTS). Set on the first PATCH that carries it; once set, MUST NOT change |
| `paymentResponse.OpenFinanceBilling.numberOfSuccessfulTransactions` | integer | No | Number of successful transactions (typically `1` per payment) |
| `paymentResponse.RejectReasonCode[]` | array | Conditional | Required when `paymentResponse.status` is `Rejected`. Append new reasons rather than replacing — preserves history |
| `paymentResponse.RejectReasonCode[].Code` | string | Yes (in array) | Namespaced rejection code: `LFI.…` for an LFI-side rejection (e.g. screening), `AANI.…` or `FTS.…` for a rail rejection. Pattern: `^(LFI\|AANI\|FTS)\.[A-Za-z0-9]+$` |
| `paymentResponse.RejectReasonCode[].Message` | string | Yes (in array) | Sanitised, customer-relayable description. MUST NOT reveal detection logic, sanctions matches, or internal case identifiers |

#### Example — successful settlement

```json
{
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27"
}
```

#### Example — rail rejection

```json
{
  "paymentResponse.status": "Rejected",
  "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "AANI.AM04",
      "Message": "Payment request cannot be executed as insufficient funds at debtor account."
    }
  ]
}
```

#### Example — LFI screening rejection

```json
{
  "paymentResponse.status": "Rejected",
  "paymentResponse.RejectReasonCode": [
    {
      "Code": "LFI.ScreeningRejected",
      "Message": "Payment rejected by LFI screening controls."
    }
  ]
}
```

### Response

`Content-Type: application/json`

A successful PATCH returns `204 No Content` with no body. See the [PATCH `/payment-log/:id` API Reference](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log) for the full schema.

## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/payments/:paymentId`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/payment/v2.1/payments/{PaymentId}`.

Returns the current state of a payment your LFI created via `POST /payments`. The TPP polls this to observe screening outcomes, rail settlement, and any subsequent rejection.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `paymentId` | string | The `PaymentId` your LFI returned from `POST /payments` |

### Response

`Content-Type: application/json`

The response shape mirrors the `POST /payments` `201` response — same `data` envelope, with the current `Status`, `paymentTransactionId` (once assigned by the rail), and any rejection details.

```json
{
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
```

### Behavioural rules

Per [GET `/payments/{paymentId}` Requirements](./requirements#get-payments-paymentid-payment-status-retrieval):

| # | Rule |
|---|------|
| 1 | **Sustain period** — Serve `GET /payments/{paymentId}` for at least **1 year from the payment's creation date**. Within this window, the response MUST reflect the current status, including any later screening, rail, or reversal outcomes |
| 2 | **Status consistency with the API Hub** — The `Status` returned MUST exactly match the most recent value PATCHed to the API Hub Consent Manager via [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log). Any change in the LFI's systems MUST be reflected on both surfaces before it becomes observable to the TPP |
| 3 | **`paymentTransactionId` consistency** — Once the rail has assigned the end-to-end identifier and the LFI has PATCHed it to the Consent Manager, this endpoint MUST return the same value. Before assignment, omit the field entirely — do not return an empty string |

### Errors

| Status | `errorCode` | When to use |
|--------|-------------|-------------|
| `404` | `Resource.NotFound` | No payment exists for the supplied `paymentId` (or the payment exists but belongs to a different consent) |
| `403` | `Consent.AccountTemporarilyBlocked` / `Consent.PermanentAccountAccessFailure` | The debtor account has become inaccessible since the payment was created |
| `500` | `GenericRecoverableError` / `GenericError` | Transient or unrecoverable server error |

See the [GET `/payments/{paymentId}` API Reference](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId) for the full schema.
