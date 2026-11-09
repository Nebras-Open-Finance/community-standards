<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Signing and Encryption
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Payment — Signing and Encryption · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'keys', label: 'Keys' },
  { id: 'sign', label: 'LFI issues' },
  { id: 'encrypt', label: 'LFI encrypts' },
  { id: 'proxy', label: 'API Hub proxies' },
  { id: 'decrypt', label: 'BPIP decrypts' },
  { id: 'verify', label: 'BPIP verifies' },
  { id: 'return', label: 'BPIP sends back' },
  { id: 'validate', label: 'LFI looks up' },
  { id: 'open-items', label: 'Open items' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Audience', value: 'LFI · BPIP' },
  { label: 'Version', value: '0.1' },
]

// ── Overview ────────────────────────────────────────────────────────────────
const lookupStructure = `Data in the POST /instrument-lookup response
├─ PaymentToken        the payment token — 22 characters, not encrypted, sent back at payment
└─ InstrumentDetails   JWE, encrypted to the BPIP
   ├─ protected header   { "alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": "bpip-enc-1", "cty": "JWT" }
   └─ ciphertext — decrypts to:

      JWS  — the instrument details, signed by the LFI
      ├─ protected header   { "alg": "PS256", "kid": "lfi-sign-1" }
      ├─ payload            iss, azp, iat, exp, PaymentToken, uaeKycId, IcpToken,
      │                     InstructedAmount, MerchantId, TerminalId, AcquirerId,
      │                     MerchantName, InstrumentType, and DebtorAccount or CardDetails
      └─ signature          PS256, with the LFI's instrument details signing key`

// ── Keys ────────────────────────────────────────────────────────────────────
const lfiJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{LFI OrganisationId}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{LFI OrganisationId}/application.jwks`

const bpipJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks`

// ── Step 1 — LFI issues ─────────────────────────────────────────────────────
const signTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'
import { randomBytes } from 'node:crypto'

type Amount = { Amount: string; Currency: string }
type LookupData = {
  uaeKycId: string
  IcpToken: string
  TransactionAmount: Amount
  MerchantId: string
  TerminalId: string
  AcquirerId: string
  MerchantName: string
}
type Instrument =
  | { InstrumentType: 'ACCOUNT'; DebtorAccount: { SchemeName: 'IBAN'; Identification: string } }
  | { InstrumentType: 'CARD'; CardDetails: { CardNumber: string; ExpiryDate: string } }

const PAYMENT_TOKEN_LIFETIME = 120 // seconds

// The private key behind your instrument details signing certificate. Never Sig2.
const signingKey = await importPKCS8(myKeyStore.getPrivateKeyPem(instrumentDetailsKid), 'PS256')

async function issuePaymentToken(
  data: LookupData,       // Data from the lookup, after the ICP token is validated
  callerOrgId: string,    // o3-caller-org-id on the proxied lookup
  instrument: Instrument, // from your BioPay registration for data.uaeKycId
): Promise<{ paymentToken: string; instrumentDetails: string }> {
  const now = Math.floor(Date.now() / 1000)
  const paymentToken = randomBytes(16).toString('base64url') // 128 bits, 22 characters

  const issued = {
    azp: callerOrgId,
    exp: now + PAYMENT_TOKEN_LIFETIME,
    uaeKycId: data.uaeKycId,
    IcpToken: data.IcpToken,                  // unchanged
    InstructedAmount: data.TransactionAmount, // unchanged
    MerchantId: data.MerchantId,              // unchanged
    TerminalId: data.TerminalId,              // unchanged
    AcquirerId: data.AcquirerId,              // unchanged
    MerchantName: data.MerchantName,          // unchanged
    ...instrument,
  }

  // Store what the payment token stands for before you return it. A unique
  // key on paymentToken rejects the vanishingly unlikely collision.
  await paymentTokens.insert({ paymentToken, ...issued, usedAt: null })

  const instrumentDetails = await new SignJWT({ ...issued, PaymentToken: paymentToken })
    .setProtectedHeader({ alg: 'PS256', kid: instrumentDetailsKid })
    .setIssuer(myOrganisationId)
    .setIssuedAt(now)
    .sign(signingKey)

  return { paymentToken, instrumentDetails }
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import secrets, time
from jwcrypto import jwk, jwt

PAYMENT_TOKEN_LIFETIME = 120  # seconds

# The private key behind your instrument details signing certificate. Never Sig2.
signing_key = jwk.JWK.from_pem(my_key_store.get_private_key_pem(instrument_details_kid))

def issue_payment_token(data: dict, caller_org_id: str, instrument: dict) -> tuple[str, str]:
    # data:          Data from the lookup, after the ICP token is validated
    # caller_org_id: o3-caller-org-id on the proxied lookup
    # instrument:    from your BioPay registration for data["uaeKycId"] —
    #                {"InstrumentType": "ACCOUNT", "DebtorAccount": {...}}
    #                or {"InstrumentType": "CARD", "CardDetails": {...}}
    now = int(time.time())
    payment_token = secrets.token_urlsafe(16)  # 128 bits, 22 characters

    issued = {
        "azp": caller_org_id,
        "exp": now + PAYMENT_TOKEN_LIFETIME,
        "uaeKycId": data["uaeKycId"],
        "IcpToken": data["IcpToken"],                   # unchanged
        "InstructedAmount": data["TransactionAmount"],  # unchanged
        "MerchantId": data["MerchantId"],               # unchanged
        "TerminalId": data["TerminalId"],               # unchanged
        "AcquirerId": data["AcquirerId"],               # unchanged
        "MerchantName": data["MerchantName"],           # unchanged
        **instrument,
    }

    # Store what the payment token stands for before you return it. A unique
    # key on payment_token rejects the vanishingly unlikely collision.
    payment_tokens.insert({"payment_token": payment_token, **issued, "used_at": None})

    claims = {"iss": my_organisation_id, "iat": now, "PaymentToken": payment_token, **issued}
    token = jwt.JWT(header={"alg": "PS256", "kid": instrument_details_kid}, claims=claims)
    token.make_signed_token(signing_key)
    return payment_token, token.serialize()`,
  },
] as const

const accountDetailsClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "exp": 1792059423,
  "PaymentToken": "O0ctDv_PYRnrTqp9ijXB6g",
  "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
  "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
  "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
  "MerchantId": "100000000000731",
  "TerminalId": "T0000042",
  "AcquirerId": "123456",
  "MerchantName": "Example Grocers",
  "InstrumentType": "ACCOUNT",
  "DebtorAccount": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" }
}`

// ── Step 2 — LFI encrypts ───────────────────────────────────────────────────
const encryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { CompactEncrypt, importJWK, type JWK } from 'jose'

const JWKS_TTL_MS = 300_000 // the keystore serves max-age=300
const jwksCache = new Map<string, { keys: JWK[]; fetchedAt: number }>()

async function getJwks(jwksUri: string): Promise<JWK[]> {
  const cached = jwksCache.get(jwksUri)
  if (cached && Date.now() - cached.fetchedAt < JWKS_TTL_MS) return cached.keys

  const response = await fetch(jwksUri, { signal: AbortSignal.timeout(5_000) })
  if (!response.ok) throw new Error(\`JWKS fetch failed: \${response.status}\`)
  const { keys } = (await response.json()) as { keys: JWK[] }
  jwksCache.set(jwksUri, { keys, fetchedAt: Date.now() })
  return keys
}

async function encryptToBpip(
  instrumentDetails: string,         // the JWS from Step 1
  callerOrgId: string,               // o3-caller-org-id on the proxied lookup
  callerSoftwareStatementId: string, // o3-caller-software-statement-id
): Promise<string> {
  // 1. The calling BPIP's application JWKS (cached)
  const keys = await getJwks(
    \`https://keystore.directory.openfinance.ae/\${callerOrgId}/\${callerSoftwareStatementId}/application.jwks\`,
  )

  // 2. Select its encryption key
  const encKeyJwk = keys.find((k) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) in the BPIP JWKS')

  // 3. Encrypt the signed JWS into a compact JWE
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  return new CompactEncrypt(new TextEncoder().encode(instrumentDetails))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', kid: encKeyJwk.kid, cty: 'JWT' })
    .encrypt(encKey)
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json, time
import requests
from jwcrypto import jwe, jwk

JWKS_TTL_SECONDS = 300  # the keystore serves max-age=300
_jwks_cache: dict[str, tuple[float, list]] = {}

def get_jwks(jwks_uri: str) -> list:
    cached = _jwks_cache.get(jwks_uri)
    if cached and time.monotonic() - cached[0] < JWKS_TTL_SECONDS:
        return cached[1]
    response = requests.get(jwks_uri, timeout=5)
    response.raise_for_status()
    keys = response.json()["keys"]
    _jwks_cache[jwks_uri] = (time.monotonic(), keys)
    return keys

def encrypt_to_bpip(
    instrument_details: str,           # the JWS from Step 1
    caller_org_id: str,                # o3-caller-org-id on the proxied lookup
    caller_software_statement_id: str, # o3-caller-software-statement-id
) -> str:
    # 1. The calling BPIP's application JWKS (cached)
    keys = get_jwks(
        f"https://keystore.directory.openfinance.ae/{caller_org_id}/{caller_software_statement_id}/application.jwks"
    )

    # 2. Select its encryption key
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if enc_key is None:
        raise ValueError("No encryption key (use: enc) in the BPIP JWKS")

    # 3. Encrypt the signed JWS into a compact JWE
    token = jwe.JWE(
        instrument_details.encode(),
        protected=json.dumps(
            {"alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": enc_key["kid"], "cty": "JWT"}
        ),
    )
    token.add_recipient(jwk.JWK.from_json(json.dumps(enc_key)))
    return token.serialize(compact=True)`,
  },
] as const

const lookupResponse = `HTTP/1.1 200 OK
Content-Type: application/json
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

{
  "Data": {
    "PaymentToken": "O0ctDv_PYRnrTqp9ijXB6g",
    "InstrumentDetails": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSIsImN0eSI6IkpXVCJ9..."
  }
}`

// ── Step 4 — BPIP decrypts ──────────────────────────────────────────────────
const readKidTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const encryptedDetails = lookupResponse.Data.InstrumentDetails
const kid = getJweKid(encryptedDetails)
const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

encrypted_details = lookup_response["Data"]["InstrumentDetails"]
kid = get_jwe_kid(encrypted_details)
private_key = my_key_store.get_private_key(kid)`,
  },
] as const

const decryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(encryptedDetails, privateKey, {
  keyManagementAlgorithms: ['RSA-OAEP-256'],
  contentEncryptionAlgorithms: ['A256GCM'],
})
const instrumentDetails = new TextDecoder().decode(plaintext) // the LFI's JWS`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `from jwcrypto import jwe

token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
token.deserialize(encrypted_details, key=private_key)
instrument_details = token.payload.decode()  # the LFI's JWS`,
  },
] as const

// ── Step 5 — BPIP verifies ──────────────────────────────────────────────────
const verifyTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { createRemoteJWKSet, jwtVerify } from 'jose'

// One resolver per LFI, created once and reused. It caches the JWKS and
// refetches it when it meets a kid it does not know.
const lfiResolvers = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

function lfiJwks(lfiOrganisationId: string) {
  let jwks = lfiResolvers.get(lfiOrganisationId)
  if (!jwks) {
    // Built from the LFI you called, never from the iss in the JWS
    jwks = createRemoteJWKSet(
      new URL(\`https://keystore.directory.openfinance.ae/\${lfiOrganisationId}/application.jwks\`),
      { cacheMaxAge: 300_000, cooldownDuration: 60_000, timeoutDuration: 5_000 },
    )
    lfiResolvers.set(lfiOrganisationId, jwks)
  }
  return jwks
}

const { payload } = await jwtVerify(instrumentDetails, lfiJwks(lfiOrganisationId), {
  issuer: lfiOrganisationId,
  algorithms: ['PS256'],
})

// Check they were issued to you, for the payment token returned alongside, and
// for the ICP token and amount you sent on the lookup
if (payload.azp !== myOrganisationId) {
  throw new Error('Instrument details were not issued to this BPIP')
}
if (payload.PaymentToken !== lookupResponse.Data.PaymentToken) {
  throw new Error('Instrument details are not for this payment token')
}
if (payload.IcpToken !== icpToken) {
  throw new Error('Instrument details are not for this ICP token')
}
const amount = payload.InstructedAmount as { Amount: string; Currency: string } | undefined
if (amount?.Amount !== transactionAmount.Amount || amount?.Currency !== transactionAmount.Currency) {
  throw new Error('Instrument details are not for the amount you sent')
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json
from jwcrypto import jwk, jwt

# Built from the LFI you called, never from the iss in the JWS.
# get_jwks is a cached keystore fetch, as in Step 2.
lfi_jwks_uri = f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks"
lfi_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(lfi_jwks_uri)}))

verified = jwt.JWT(
    key=lfi_keys,
    jwt=instrument_details,
    algs=["PS256"],
    check_claims={"iss": lfi_organisation_id, "exp": None},
)
claims = json.loads(verified.claims)

# Check they were issued to you, for the payment token returned alongside, and
# for the ICP token and amount you sent on the lookup
if claims["azp"] != my_organisation_id:
    raise ValueError("Instrument details were not issued to this BPIP")
if claims["PaymentToken"] != lookup_response["Data"]["PaymentToken"]:
    raise ValueError("Instrument details are not for this payment token")
if claims["IcpToken"] != icp_token:
    raise ValueError("Instrument details are not for this ICP token")
if claims["InstructedAmount"] != transaction_amount:
    raise ValueError("Instrument details are not for the amount you sent")`,
  },
] as const

const fullBpipTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8, jwtVerify } from 'jose'

async function openLookupResponse(
  data: { PaymentToken: string; InstrumentDetails: string }, // Data from the lookup response
  lfiOrganisationId: string, // the LFI you called, from the Directory
  icpToken: string,          // Data.IcpToken you sent on the lookup
  transactionAmount: { Amount: string; Currency: string }, // Data.TransactionAmount you sent
) {
  // 1. Select your private key by the kid in the JWE header
  const [headerB64] = data.InstrumentDetails.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')

  // 2. Decrypt the JWE → the instrument details, a JWS signed by the LFI
  const { plaintext } = await compactDecrypt(data.InstrumentDetails, privateKey, {
    keyManagementAlgorithms: ['RSA-OAEP-256'],
    contentEncryptionAlgorithms: ['A256GCM'],
  })
  const instrumentDetails = new TextDecoder().decode(plaintext)

  // 3. Verify the LFI's signature, iss and exp (lfiJwks as in Step 5)
  const { payload } = await jwtVerify(instrumentDetails, lfiJwks(lfiOrganisationId), {
    issuer: lfiOrganisationId,
    algorithms: ['PS256'],
  })

  // 4. Check they were issued to you, for this payment token, ICP token and amount
  if (payload.azp !== myOrganisationId) {
    throw new Error('Instrument details were not issued to this BPIP')
  }
  if (payload.PaymentToken !== data.PaymentToken) {
    throw new Error('Instrument details are not for this payment token')
  }
  if (payload.IcpToken !== icpToken) {
    throw new Error('Instrument details are not for this ICP token')
  }
  const amount = payload.InstructedAmount as { Amount: string; Currency: string } | undefined
  if (amount?.Amount !== transactionAmount.Amount || amount?.Currency !== transactionAmount.Currency) {
    throw new Error('Instrument details are not for the amount you sent')
  }

  // Send data.PaymentToken back at the point of payment. Hold card details in
  // memory only. Never log or persist them.
  return { paymentToken: data.PaymentToken, claims: payload }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwe, jwk, jwt

def open_lookup_response(
    data: dict,                # Data from the lookup response
    lfi_organisation_id: str,  # the LFI you called, from the Directory
    icp_token: str,            # Data.IcpToken you sent on the lookup
    transaction_amount: dict,  # Data.TransactionAmount you sent on the lookup
) -> tuple[str, dict]:
    # 1. Select your private key by the kid in the JWE header
    header_b64 = data["InstrumentDetails"].split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → the instrument details, a JWS signed by the LFI
    token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
    token.deserialize(data["InstrumentDetails"], key=private_key)
    instrument_details = token.payload.decode()

    # 3. Verify the LFI's signature, iss and exp (get_jwks as in Step 2)
    lfi_jwks_uri = f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks"
    lfi_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(lfi_jwks_uri)}))
    verified = jwt.JWT(
        key=lfi_keys,
        jwt=instrument_details,
        algs=["PS256"],
        check_claims={"iss": lfi_organisation_id, "exp": None},
    )
    claims = json.loads(verified.claims)

    # 4. Check they were issued to you, for this payment token, ICP token and amount
    if claims["azp"] != my_organisation_id:
        raise ValueError("Instrument details were not issued to this BPIP")
    if claims["PaymentToken"] != data["PaymentToken"]:
        raise ValueError("Instrument details are not for this payment token")
    if claims["IcpToken"] != icp_token:
        raise ValueError("Instrument details are not for this ICP token")
    if claims["InstructedAmount"] != transaction_amount:
        raise ValueError("Instrument details are not for the amount you sent")

    # Send data["PaymentToken"] back at the point of payment. Hold card details
    # in memory only. Never log or persist them.
    return data["PaymentToken"], claims`,
  },
] as const

// ── Step 6 — BPIP sends the payment token back ──────────────────────────────
const paymentRequest = `POST /open-finance/biometric-payments/v1/biometric-payments HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
Content-Type: application/json
x-idempotency-key: 6f1d2a0c-9b43-4e7a-8d15-2c3b4a5e6f70
x-fapi-interaction-id: 1f0e9c2a-77d4-4b8e-a3f1-5d2c6b7e8a90
x-fapi-auth-date: Thu, 15 Oct 2026 10:15:02 GMT
x-jws-signature: eyJhbGciOiJQUzI1NiIsImtpZCI6...

{
  "Data": {
    "PaymentToken": "O0ctDv_PYRnrTqp9ijXB6g",
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE220331234567890876543"
    },
    "PaymentPurposeCode": "ACM"
  },
  "Risk": {}
}`

// ── Step 7 — LFI looks up ───────────────────────────────────────────────────
const validateTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `class PaymentTokenRejected extends Error {} // its message is the ErrorCode

interface PaymentTokenRecord {
  azp: string
  exp: number
  uaeKycId: string
  IcpToken: string
  InstructedAmount: { Amount: string; Currency: string }
  InstrumentType: 'ACCOUNT' | 'CARD'
  DebtorAccount?: { SchemeName: 'IBAN'; Identification: string }
  usedAt: Date | null
  // … and the merchant fields and CardDetails, as stored in Step 1
}

async function checkPaymentToken(
  paymentToken: string, // Data.PaymentToken, as proxied by the API Hub
  callerOrgId: string,  // o3-caller-org-id on the proxied payment
): Promise<PaymentTokenRecord> {
  // 1. You issued it
  const record: PaymentTokenRecord | null = await paymentTokens.get(paymentToken)
  if (!record) throw new PaymentTokenRejected('PaymentToken.Invalid')

  // 2. It has not expired
  if (Date.now() / 1000 > record.exp) throw new PaymentTokenRejected('PaymentToken.Expired')

  // 3. The instrument type, and 4. the BPIP it was issued to
  if (record.InstrumentType !== 'ACCOUNT') {
    throw new PaymentTokenRejected('PaymentToken.WrongInstrumentType')
  }
  if (record.azp !== callerOrgId) {
    throw new PaymentTokenRejected('PaymentToken.BindingMismatch')
  }

  // 5. Single use. Marking it used with the payment is the final guard.
  if (record.usedAt) throw new PaymentTokenRejected('PaymentToken.AlreadyUsed')

  // 6. The debtor account is still the one registered for BioPay
  const registered = await registrations.debtorAccount(record.uaeKycId)
  if (registered?.Identification !== record.DebtorAccount?.Identification) {
    throw new PaymentTokenRejected('Account.DebtorAccountMismatch')
  }

  return record
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import time

class PaymentTokenRejected(Exception):
    """Its message is the ErrorCode."""

def check_payment_token(payment_token: str, caller_org_id: str) -> dict:
    # payment_token: Data.PaymentToken, as proxied by the API Hub
    # caller_org_id: o3-caller-org-id on the proxied payment

    # 1. You issued it
    record = payment_tokens.get(payment_token)
    if record is None:
        raise PaymentTokenRejected("PaymentToken.Invalid")

    # 2. It has not expired
    if time.time() > record["exp"]:
        raise PaymentTokenRejected("PaymentToken.Expired")

    # 3. The instrument type, and 4. the BPIP it was issued to
    if record["InstrumentType"] != "ACCOUNT":
        raise PaymentTokenRejected("PaymentToken.WrongInstrumentType")
    if record["azp"] != caller_org_id:
        raise PaymentTokenRejected("PaymentToken.BindingMismatch")

    # 5. Single use. Marking it used with the payment is the final guard.
    if record["used_at"] is not None:
        raise PaymentTokenRejected("PaymentToken.AlreadyUsed")

    # 6. The debtor account is still the one registered for BioPay
    registered = registrations.debtor_account(record["uaeKycId"])
    if registered is None or registered["Identification"] != record["DebtorAccount"]["Identification"]:
        raise PaymentTokenRejected("Account.DebtorAccountMismatch")

    return record`,
  },
] as const
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/payment/api-guide/" text="Payment API Guide" />

    <EdHero
      eyebrow="BioPay · Payment · API Guide · Draft"
      eyebrow-color="var(--at-teal-deep)"
      title="Signing and Encryption"
      :meta="meta"
      lede="How the payment token is issued and the instrument details are protected. The LFI issues the payment token &mdash; an opaque reference &mdash; and signs the instrument details it stands for, encrypted to the BPIP. The API Hub proxies the details unread. The BPIP decrypts them and verifies the LFI&rsquo;s signature, then sends back only the payment token, which the LFI looks up before it pays. The instrument details use the sign-then-encrypt Nested JWT that Open Finance uses for payment PII, with the roles reversed. <strong>Everything here is draft</strong> &mdash; keys, claims and checks are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal-deep)"
      eyebrow="Overview"
      title="A reference to send back, and details signed then encrypted"
      tone="surface"
    >
      <EdProse>
        <p>
          The LFI answers
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>
          with two things:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-teal-deep)">
        <li>
          <strong>The payment token.</strong> An opaque, single-use, 22-character reference. It
          carries no data: the LFI stores, against it, everything it issued it for. It is the only
          thing the BPIP sends back at the point of payment, short enough to fit a card
          authorisation, and the LFI looks it up to make the payment. It needs no signature or
          encryption, because it means nothing to anyone but the LFI that stored it.
        </li>
        <li>
          <strong>The instrument details.</strong> What the payment token was issued for,
          including the customer&rsquo;s IBAN or card details, so they are protected twice. They are
          <strong>signed by the LFI (JWS)</strong>, which proves to the BPIP that the LFI issued
          them and that nobody has changed them. They are <strong>encrypted to the BPIP
          (JWE)</strong>, so only the BPIP can read them although the response passes through the
          API Hub. The Hub never sees card data in the clear, which keeps it out of PCI DSS scope.
        </li>
      </EdBullets>
      <EdProse>
        <p>
          For the instrument details, the LFI signs first and then encrypts the signed JWS &mdash; a
          Nested JWT, with the JWS inside the JWE:
        </p>
      </EdProse>
      <EdCode :code="lookupStructure" lang="text" filename="Structure of Data in the lookup response" />

      <h3 class="bp-sub">The same pattern as payment PII, reversed</h3>
      <EdProse>
        <p>
          Open Finance already uses this construction for
          <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/">payment
          PII</RouterLink>: the TPP signs the PII and encrypts it to the LFI, and the API Hub proxies
          it unread. BioPay uses the same algorithms and the same steps, with the LFI as sender and the
          BPIP as recipient.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th></th><th>Open Finance payment PII</th><th>BioPay instrument details</th></tr>
          </thead>
          <tbody>
            <tr><td>Signed by</td><td>TPP, with its signing key (<code>PS256</code>)</td><td>LFI, with its instrument details signing key (<code>PS256</code>)</td></tr>
            <tr><td>Encrypted to</td><td>The LFI&rsquo;s Enc1 key</td><td>The BPIP&rsquo;s encryption key</td></tr>
            <tr><td>Algorithms</td><td><code>RSA-OAEP-256</code> / <code>A256GCM</code></td><td><code>RSA-OAEP-256</code> / <code>A256GCM</code></td></tr>
            <tr><td>Carried in</td><td>The <code>/par</code> request and <code>POST /payments</code></td><td>The <code>POST /instrument-lookup</code> response</td></tr>
            <tr><td>Decrypted by</td><td>LFI &mdash; see <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii">How to Decrypt PII</RouterLink></td><td>BPIP &mdash; <a href="#decrypt">Step 4</a></td></tr>
            <tr><td>Lifetime</td><td>As long as the consent</td><td>120 seconds, the life of the payment token</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="bp-sub">Seven steps, three parties</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Step</th><th>Who</th><th>What</th><th>Key used</th></tr>
          </thead>
          <tbody>
            <tr><td><a href="#sign">1</a></td><td>LFI</td><td>Issues the payment token, stores what it stands for, and signs the instrument details as a JWS.</td><td>LFI instrument details signing key (private)</td></tr>
            <tr><td><a href="#encrypt">2</a></td><td>LFI</td><td>Encrypts the JWS as a JWE to the calling BPIP, and returns it with the payment token in the lookup response.</td><td>BPIP encryption key (public)</td></tr>
            <tr><td><a href="#proxy">3</a></td><td>API Hub</td><td>Records the payment token against the lookup, and proxies the JWE to the BPIP unread.</td><td>&mdash;</td></tr>
            <tr><td><a href="#decrypt">4</a></td><td>BPIP</td><td>Decrypts the JWE to recover the JWS.</td><td>BPIP encryption key (private)</td></tr>
            <tr><td><a href="#verify">5</a></td><td>BPIP</td><td>Verifies the LFI&rsquo;s signature and the claims.</td><td>LFI instrument details signing key (public)</td></tr>
            <tr><td><a href="#return">6</a></td><td>BPIP</td><td>Sends the payment token back: on <code>POST /biometric-payments</code> for an <code>ACCOUNT</code>, or in the card authorisation for a <code>CARD</code>.</td><td>BPIP signing key, for <code>x-jws-signature</code></td></tr>
            <tr><td><a href="#validate">7</a></td><td>LFI</td><td>Looks up the payment token, checks it, and marks it used.</td><td>&mdash;</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="info" title="What this page covers">
        <p>
          LFIs implement Steps 1, 2 and 7. BPIPs implement Steps 4, 5 and 6. The other tokens and
          signed objects in a BioPay payment follow existing patterns: the ICP token is an opaque
          identifier, validated by the LFI at ICP&rsquo;s token validation endpoint; the client
          assertion and
          <code>x-jws-signature</code> are signed by the BPIP as in
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>;
          and payment status events are signed by the API Hub and encrypted to the BPIP as in
          <RouterLink to="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event
          Notifications</RouterLink>.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="keys"
      num="02"
      color="var(--at-gold)"
      eyebrow="Keys"
      title="Two key pairs, one in each direction"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Key</th><th>Private key held by</th><th>Public key published at</th><th>Used in</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Instrument details signing key</strong> &mdash; a Server Signing certificate in the LFI&rsquo;s Trust Framework organisation</td>
              <td>LFI</td>
              <td>The LFI&rsquo;s organisation JWKS: <code>&hellip;/{LFI OrganisationId}/application.jwks</code></td>
              <td>Step 1 (sign), Step 5 (BPIP verifies)</td>
            </tr>
            <tr>
              <td><strong>Encryption key</strong> &mdash; the Encryption certificate on the BPIP&rsquo;s application</td>
              <td>BPIP</td>
              <td>The BPIP&rsquo;s application JWKS: <code>&hellip;/{OrganisationId}/{SoftwareStatementId}/application.jwks</code></td>
              <td>Step 2 (encrypt), Step 4 (decrypt)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="bp-sub">LFI &mdash; create the instrument details signing certificate</h3>
      <EdProse>
        <p>
          <strong>LFI action:</strong> Generate a private key and CSR &rarr; navigate to Organisation
          Certificates &rarr; + New Certificate &rarr; select <strong>Server Signing</strong> &rarr;
          upload the CSR &rarr; record the KID. See
          <RouterLink to="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</RouterLink>
          for how to generate the key and CSR. The certificate is published in your organisation
          JWKS &mdash; the URL the Directory participants list gives as
          <code>PayloadSigningCertLocationUri</code> on your authorisation server:
        </p>
      </EdProse>
      <EdCode :code="lfiJwksTemplate" lang="text" filename="LFI organisation JWKS" />
      <EdBullets accent="var(--at-gold)">
        <li>
          The LFI MUST generate and hold the private key itself, and MUST NOT sign instrument
          details with <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#ozone-held-certs">Sig2</RouterLink>.
          Sig2 is created from a CSR Ozone provides, so its private key is held for the API Hub.
          Instrument details signed with it would not prove that the LFI issued them.
        </li>
        <li>
          The LFI SHOULD use a dedicated key for instrument details, and not share it with Sig4 or
          any other purpose.
        </li>
        <li>
          After publishing a new key, the LFI MUST wait at least 10 minutes before signing with it.
          A BPIP may hold the previous copy of your JWKS for that long &mdash; see
          <RouterLink to="/tech/lfi-api-hub/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
        </li>
        <li>
          When you retire a key, keep it in your organisation JWKS until all the instrument details
          it signed have expired &mdash; 120 seconds plus clock skew &mdash; so that a BPIP can still
          verify them in <a href="#verify">Step 5</a>.
        </li>
      </EdBullets>

      <h3 class="bp-sub">BPIP &mdash; register an encryption certificate</h3>
      <EdProse>
        <p>
          Every BPIP MUST register an
          <RouterLink to="/tech/tpp-standards/trust-framework/certificates/client-encryption">Encryption
          certificate</RouterLink> on its application &mdash; see
          <RouterLink to="/biopay/directory">Directory</RouterLink>. It is published in the
          application JWKS with <code>"use": "enc"</code>, and the same key decrypts payment status
          events.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-gold)">
        <li>
          When you replace the key, keep the retired private key available for at least 10 minutes
          after removing it from the JWKS. An LFI may encrypt to a cached copy of your JWKS for that
          long &mdash; see
          <RouterLink to="/tech/tpp-standards/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
        </li>
        <li>Always select the private key by the <code>kid</code> in the JWE header &mdash; never assume the current one.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="sign"
      num="03"
      color="var(--at-navy)"
      eyebrow="Step 1 — LFI"
      title="Issue the payment token and sign the instrument details"
      tone="surface"
    >
      <EdProse>
        <p>
          Issue a payment token only once ICP&rsquo;s token validation endpoint has confirmed the
          ICP token in the lookup: that ICP issued it to the calling BPIP for
          <code>Data.uaeKycId</code>, and that it has not expired or been used. Otherwise reject the
          lookup with the matching <code>403</code> from the
          <RouterLink to="/biopay/payment/api-guide/#lookup-errors">lookup errors</RouterLink>, and
          issue nothing.
        </p>
      </EdProse>

      <h3 class="bp-sub">Generate and store the payment token</h3>
      <EdBullets accent="var(--at-navy)">
        <li>
          Generate it from 128 bits of a cryptographically secure random source, base64url-encoded
          without padding: 22 characters. Do not derive it from anything else &mdash; an account
          number, a counter or a timestamp &mdash; and do not put meaning in it.
        </li>
        <li>
          Store against it, under a unique key, everything you issued it for: the calling BPIP
          (<code>azp</code>), the expiry (<code>exp</code>), the <code>uaeKycId</code>, the ICP
          token, the amount, the merchant, terminal and acquirer identifiers, the
          <code>InstrumentType</code> and the <code>DebtorAccount</code> or
          <code>CardDetails</code> &mdash; and that it is unused.
        </li>
        <li>
          Write the record before you return the lookup response. If the write fails, return an
          error and issue nothing: a payment token you cannot look up cannot be used.
        </li>
        <li>
          Keep each record, used or not, until at least its expiry. After that, a payment token is
          rejected whether or not you still hold it.
        </li>
      </EdBullets>

      <h3 class="bp-sub">Instrument details claims</h3>
      <EdProse>
        <p>
          The claims of the instrument details are <code>AEInstrumentDetails</code> in the draft
          specification &mdash; see
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
          They are what you stored, with <code>iss</code>, <code>iat</code> and the payment token.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Value</th><th>Taken from</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Your Directory organisation ID</td><td>&mdash;</td></tr>
            <tr><td><code>azp</code></td><td>The BPIP&rsquo;s Directory organisation ID</td><td><code>o3-caller-org-id</code> on the proxied lookup</td></tr>
            <tr><td><code>iat</code></td><td>The time of signing, in seconds since the epoch</td><td>&mdash;</td></tr>
            <tr><td><code>exp</code></td><td><code>iat</code> + 120 &mdash; when the payment token expires</td><td>&mdash;</td></tr>
            <tr><td><code>PaymentToken</code></td><td>The payment token, as returned in <code>Data.PaymentToken</code></td><td>&mdash;</td></tr>
            <tr><td><code>uaeKycId</code></td><td>The customer&rsquo;s identifier</td><td><code>Data.uaeKycId</code></td></tr>
            <tr><td><code>IcpToken</code></td><td>The ICP token, unchanged</td><td><code>Data.IcpToken</code></td></tr>
            <tr><td><code>InstructedAmount</code></td><td>The amount, unchanged</td><td><code>Data.TransactionAmount</code></td></tr>
            <tr><td><code>MerchantId</code></td><td>The merchant&rsquo;s identification code (DE42), unchanged</td><td><code>Data.MerchantId</code></td></tr>
            <tr><td><code>TerminalId</code></td><td>The terminal&rsquo;s identification code (DE41), unchanged</td><td><code>Data.TerminalId</code></td></tr>
            <tr><td><code>AcquirerId</code></td><td>The acquiring bank&rsquo;s identification code (DE32), unchanged</td><td><code>Data.AcquirerId</code></td></tr>
            <tr><td><code>MerchantName</code></td><td>The merchant&rsquo;s name (DE43), unchanged</td><td><code>Data.MerchantName</code></td></tr>
            <tr><td><code>InstrumentType</code></td><td><code>ACCOUNT</code> or <code>CARD</code></td><td>Your BioPay registration for the <code>uaeKycId</code></td></tr>
            <tr><td><code>DebtorAccount</code></td><td><code>ACCOUNT</code> only. The registered IBAN.</td><td>Your BioPay registration</td></tr>
            <tr><td><code>CardDetails</code></td><td><code>CARD</code> only. <code>CardNumber</code> and <code>ExpiryDate</code>.</td><td>Your BioPay registration</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="bp-sub">JWS header</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>PS256</code> &mdash; the only signing algorithm in the UAE Open Finance FAPI profile</td></tr>
            <tr><td><code>kid</code></td><td>The KID of your instrument details signing certificate. Identify the key by <code>kid</code> only &mdash; not <code>x5c</code>, <code>x5u</code> or <code>jku</code>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="signTabs" />
      <EdCode :code="accountDetailsClaims" lang="json" filename="Signed claims — ACCOUNT" />
      <EdNote type="tip" title="Your record, not your signature, is what you pay from">
        <p>
          The signature on the instrument details is for the BPIP: it proves to them that you issued
          the details. You never see the JWS again. When the payment token comes back in
          <a href="#validate">Step 7</a>, you pay from the record you stored here.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="encrypt"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Step 2 — LFI"
      title="Encrypt the payment token to the BPIP"
    >
      <EdProse>
        <p>
          The API Hub identifies the BPIP on every request it proxies to your Ozone Connect
          endpoints. Use those headers to find the calling BPIP&rsquo;s application JWKS:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Identifies</th><th>Used for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-caller-org-id</code></td><td>The BPIP&rsquo;s Directory organisation ID</td><td>The JWKS URL, and <code>azp</code> in Step 1</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>The BPIP&rsquo;s software statement ID</td><td>The JWKS URL</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="bpipJwksTemplate" lang="text" filename="BPIP application JWKS" />
      <EdBullets accent="var(--at-blue-deep)">
        <li>Select the key with <code>"use": "enc"</code>. Never encrypt with a signing key (<code>"use": "sig"</code>).</li>
        <li>
          Encrypt only to the BPIP that called. The instrument details carry the customer&rsquo;s
          IBAN or card details; a JWE encrypted to any other key exposes them to whoever holds it.
        </li>
        <li>
          Cache the JWKS, keyed by its URL &mdash; see
          <RouterLink to="/tech/lfi-api-hub/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
          The lookup sits on the payment&rsquo;s critical path at the till: refresh the cache ahead
          of expiry rather than fetching the JWKS inside the request.
        </li>
      </EdBullets>

      <h3 class="bp-sub">JWE header</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Value</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>RSA-OAEP-256</code></td><td>Wraps the content encryption key with the BPIP&rsquo;s RSA public key</td></tr>
            <tr><td><code>enc</code></td><td><code>A256GCM</code></td><td>Encrypts the JWS with AES-256-GCM</td></tr>
            <tr><td><code>kid</code></td><td>string</td><td>The KID of the BPIP&rsquo;s encryption key, from its JWKS</td></tr>
            <tr><td><code>cty</code></td><td><code>JWT</code></td><td>The content is itself a JWT &mdash; a Nested JWT (RFC 7519, section 5.2)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="encryptTabs" />
      <EdProse>
        <p>
          Return the compact JWE as <code>Data.InstrumentDetails</code>, and the payment token,
          unencrypted, as <code>Data.PaymentToken</code>:
        </p>
      </EdProse>
      <EdCode :code="lookupResponse" lang="http" filename="200 OK" />
      <EdProse>
        <p>
          The structure of a compact JWE, and how the PII equivalent is built, are on
          <RouterLink to="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption
          (JWE)</RouterLink>.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="proxy"
      num="05"
      color="var(--at-gold)"
      eyebrow="Step 3 — API Hub"
      title="Record the payment token, proxy the details unread"
      tone="surface"
    >
      <EdProse>
        <p>
          The API Hub validates the lookup response against its schema and proxies it to the BPIP.
          It does not hold the BPIP&rsquo;s private key, so it cannot decrypt
          <code>Data.InstrumentDetails</code>. Errors from the LFI &mdash; the <code>403</code>
          <code>IcpToken.*</code> codes and <code>404</code> &mdash; are mapped to the standard as for
          any proxied request.
        </p>
        <p>
          The Hub reads <code>Data.PaymentToken</code>, which is not encrypted, and records it with
          the ICP token and <code>x-fapi-auth-date</code> of the lookup request. When an
          <code>ACCOUNT</code> payment arrives with that payment token and the LFI creates it, the
          Hub attaches the biometric assurance to the payment. The Hub does not check the payment
          token, and does not reject a payment it cannot link to a lookup: only the LFI accepts or
          rejects a payment token.
        </p>
      </EdProse>
      <EdNote type="info" title="Mediation is unchanged">
        <p>
          Encrypting to the BPIP does not open a channel around the API Hub. The JWE travels inside
          the normal response, BPIP &rarr; API Hub &rarr; LFI &rarr; API Hub &rarr; BPIP, and the
          BPIP never connects to the LFI. Encryption only means that the Hub carries the IBAN or card
          details without being able to read them.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="decrypt"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Step 4 — BPIP"
      title="Decrypt the JWE"
    >
      <h3 class="bp-sub">1. Read the <code>kid</code> and select your private key</h3>
      <EdProse>
        <p>
          The JWE protected header names the encryption key the LFI used. Select your private key by
          <code>kid</code>, not by assuming your current key &mdash; after a rotation the LFI may
          still be encrypting to the previous one.
        </p>
      </EdProse>
      <EdCodeGroup :tabs="readKidTabs" />

      <h3 class="bp-sub">2. Decrypt the JWE</h3>
      <EdProse>
        <p>
          Accept only <code>RSA-OAEP-256</code> and <code>A256GCM</code>, whatever the header
          proposes. The result is the instrument details: a compact JWS signed by the LFI.
        </p>
      </EdProse>
      <EdCodeGroup :tabs="decryptTabs" />
    </EdSectionBand>

    <!-- 07 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="verify"
      num="07"
      color="var(--at-navy)"
      eyebrow="Step 5 — BPIP"
      title="Verify the LFI’s signature and the bindings"
      tone="surface"
    >
      <h3 class="bp-sub">1. Resolve the LFI&rsquo;s signing keys</h3>
      <EdProse>
        <p>
          Find the organisation ID of the LFI you called &mdash; the default LFI ICP returned
          &mdash; in the Directory participants list (see
          <RouterLink to="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</RouterLink>),
          and verify against that organisation&rsquo;s JWKS:
        </p>
      </EdProse>
      <EdCode :code="lfiJwksTemplate" lang="text" filename="LFI organisation JWKS" />
      <EdNote type="warning" title="Build the URL from the LFI you called, not from iss">
        <p>
          <code>iss</code> is unverified until the signature is. Your encryption key is public, so
          anyone can build a JWE that decrypts cleanly for you. If you took the JWKS URL from
          <code>iss</code>, a JWS could name its own signer, and it would verify against keys of
          its own choosing. Resolve the keys from the LFI you addressed, then check that
          <code>iss</code> matches.
        </p>
      </EdNote>
      <EdBullets accent="var(--at-navy)">
        <li>
          Pin <code>PS256</code>. Published JWKS entries carry no <code>alg</code>, so do not accept
          whatever the JWS header proposes.
        </li>
        <li>
          The active JWKS is enough. The instrument details are at most 120 seconds old, so the LFI
          cannot have retired the signing key in between, as in Pattern A of
          <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns">How
          to Decrypt PII</RouterLink>. If the <code>kid</code> is not in your cached copy, refetch at
          most once a minute before rejecting them.
        </li>
      </EdBullets>

      <h3 class="bp-sub">2. Check the claims</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Check</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Equals the organisation ID of the LFI you called.</td></tr>
            <tr><td><code>azp</code></td><td>Equals your own organisation ID.</td></tr>
            <tr><td><code>exp</code></td><td>Has not passed.</td></tr>
            <tr><td><code>PaymentToken</code></td><td>Equals <code>Data.PaymentToken</code> in the same lookup response.</td></tr>
            <tr><td><code>IcpToken</code></td><td>Equals the ICP token you sent as <code>Data.IcpToken</code>.</td></tr>
            <tr><td><code>InstructedAmount</code></td><td>Equals the <code>Data.TransactionAmount</code> you sent.</td></tr>
            <tr><td><code>InstrumentType</code></td><td>Present. Route the payment on it &mdash; see <RouterLink to="/biopay/payment/api-guide/#payment-token">Route on the instrument type</RouterLink>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="verifyTabs" />
      <EdProse>
        <p>
          If any check fails, do not present the payment token and do not make the payment. Offer
          another payment method.
        </p>
      </EdProse>

      <h3 class="bp-sub">Decrypt and verify, end to end</h3>
      <EdCodeGroup :tabs="fullBpipTabs" />
    </EdSectionBand>

    <!-- 08 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="return"
      num="08"
      color="var(--at-blue-deep)"
      eyebrow="Step 6 — BPIP"
      title="Send the payment token back to the LFI"
    >
      <EdProse>
        <p>
          The payment token replaces the ICP token at the point of payment. Send
          <code>Data.PaymentToken</code> from the lookup response &mdash; not the instrument details,
          in either form: they stay with you. Send it unchanged, once, before it expires.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>InstrumentType</code></th><th>Send the payment token in</th><th>Route to the LFI</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ACCOUNT</code></td>
              <td><code>Data.PaymentToken</code> on <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink></td>
              <td>Through the API Hub, which proxies it to the LFI&rsquo;s Ozone Connect</td>
            </tr>
            <tr>
              <td><code>CARD</code></td>
              <td>The card authorisation &mdash; field mapping to be agreed with the scheme</td>
              <td>Through the card scheme (e.g. Jaywan), which carries it to the LFI as issuer</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="paymentRequest" lang="http" filename="POST /biometric-payments" />
      <EdProse>
        <p>
          Sign the request body with <code>x-jws-signature</code> using your signing key, as for every
          BioPay request &mdash; see
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>.
          This signature is yours and covers the whole body, including <code>PaymentToken</code>.
          The full request is described in
          <RouterLink to="/biopay/payment/api-guide/#payment">Make the account payment</RouterLink>.
        </p>
      </EdProse>
      <EdNote type="info" title="Nothing on the way back to read">
        <p>
          The payment token carries no data, so neither the API Hub nor the card scheme learns the
          customer&rsquo;s account or card from it. The Hub uses it only to find the lookup it
          recorded in Step 3, and attaches that biometric assurance once the LFI accepts the
          payment.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 09 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="validate"
      num="09"
      color="var(--at-teal-deep)"
      eyebrow="Step 7 — LFI"
      title="Look up the payment token"
      tone="surface"
    >
      <EdProse>
        <p>
          The API Hub proxies <code>POST /biometric-payments</code> to your Ozone Connect without
          checking the payment token. Look it up in the records you stored in
          <a href="#sign">Step 1</a>, and check it before you create the payment, in this order,
          rejecting the request with the first check that fails:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Check</th><th>On failure (<code>403</code>)</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>You hold a record for the payment token &mdash; you issued it.</td><td><code>PaymentToken.Invalid</code></td></tr>
            <tr><td>2</td><td>Its <code>exp</code> has not passed.</td><td><code>PaymentToken.Expired</code></td></tr>
            <tr><td>3</td><td>It was issued for an <code>ACCOUNT</code>.</td><td><code>PaymentToken.WrongInstrumentType</code></td></tr>
            <tr><td>4</td><td>Its <code>azp</code> equals <code>o3-caller-org-id</code> on the proxied payment.</td><td><code>PaymentToken.BindingMismatch</code></td></tr>
            <tr><td>5</td><td>It has not been used.</td><td><code>PaymentToken.AlreadyUsed</code></td></tr>
            <tr><td>6</td><td>Its <code>DebtorAccount</code> is still the account registered for BioPay against its <code>uaeKycId</code>.</td><td><code>Account.DebtorAccountMismatch</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="important" title="Look it up; never read it">
        <p>
          The payment token is only a key to your record. Match it exactly, and take nothing from its
          value. Everything you pay from &mdash; the debtor account, the amount, the BPIP &mdash; comes
          from the record, never from the request.
        </p>
      </EdNote>
      <EdCodeGroup :tabs="validateTabs" />

      <h3 class="bp-sub">Mark the payment token used</h3>
      <EdBullets accent="var(--at-teal-deep)">
        <li>
          Mark it used in the same transaction that creates the payment, with an update that
          succeeds only while it is still unused. Two requests carrying the same payment token then
          cannot both create a payment, even if both pass check 5 at the same moment.
        </li>
        <li>
          If you return an error, no payment exists and the payment token is not marked: it stays
          usable until it expires.
        </li>
        <li>
          A retry with the same <code>x-idempotency-key</code> and identical body is answered by the
          API Hub with the original payment, and does not reach you.
        </li>
      </EdBullets>
      <EdProse>
        <p>
          Then debit the stored <code>DebtorAccount</code> for the stored
          <code>InstructedAmount</code> &mdash; both from the record, not from the request &mdash; and
          credit <code>Data.CreditorAccount</code>.
        </p>
      </EdProse>

      <h3 class="bp-sub">When the payment token arrives in a card authorisation</h3>
      <EdNote type="info" title="Coming soon — Jaywan specification">
        <p>
          How the payment token is carried in the card authorisation will come from the Jaywan
          specification.
        </p>
      </EdNote>
      <EdProse>
        <p>
          As issuer, look the payment token up and run the same record, expiry and single-use checks
          (1, 2 and 5). In place of checks 3, 4 and 6, check that it was issued for a
          <code>CARD</code>; that the card and amount in the authorisation match the stored
          <code>CardDetails</code> and <code>InstructedAmount</code>; and that the card acceptor
          identification code (DE42), card acceptor terminal identification (DE41) and acquiring
          institution identification code (DE32) in the authorisation match the stored
          <code>MerchantId</code>, <code>TerminalId</code> and <code>AcquirerId</code>. Decline the
          authorisation if any check fails. Mark the payment token used when you approve.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 10 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="open-items"
      num="10"
      color="var(--at-gold)"
      eyebrow="Open items"
      title="To be agreed"
    >
      <EdNote type="warning" title="Open items">
        <p>
          <strong>Distinguishing the instrument details key from Sig2.</strong> The LFI&rsquo;s
          organisation JWKS also carries Sig2, and in Step 5 the BPIP cannot tell the two keys
          apart, so instrument details signed with Sig2 would verify. How the BPIP should identify
          the LFI&rsquo;s instrument details key is to be agreed &mdash; for example, a
          <code>kid</code> each LFI declares.
        </p>
        <p>
          <strong>Card carriage.</strong> Each card scheme must carry the payment token in its
          authorisation message through to the issuing LFI, and its 22-character base64url format
          must be confirmed against the field it travels in. To be agreed with each scheme.
        </p>
        <p>
          <strong>The ICP token.</strong> Its format; the interface of ICP&rsquo;s token validation
          endpoint; and whether ICP binds the amount to the token, so that a change to the amount
          after the biometric gesture needs a new gesture.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band. */
.bp-sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--at-grid-line);
}
</style>
