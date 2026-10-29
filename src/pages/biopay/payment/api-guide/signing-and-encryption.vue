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
  { id: 'sign', label: 'LFI signs' },
  { id: 'encrypt', label: 'LFI encrypts' },
  { id: 'proxy', label: 'API Hub proxies' },
  { id: 'decrypt', label: 'BPIP decrypts' },
  { id: 'verify', label: 'BPIP verifies' },
  { id: 'return', label: 'BPIP sends back' },
  { id: 'validate', label: 'LFI validates' },
  { id: 'open-items', label: 'Open items' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Audience', value: 'LFI · BPIP' },
  { label: 'Version', value: '0.1' },
]

// ── Overview ────────────────────────────────────────────────────────────────
const nestedStructure = `JWE  — Data in the POST /instrument-lookup response, encrypted to the BPIP
├─ protected header   { "alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": "bpip-enc-1", "cty": "JWT" }
└─ ciphertext — decrypts to:

   JWS  — the payment token, signed by the LFI
   ├─ protected header   { "alg": "PS256", "kid": "lfi-sign-1" }
   ├─ payload            iss, azp, iat, exp, jti, uaeKycId, IcpToken, InstructedAmount,
   │                     InstrumentType, and DebtorAccount or CardDetails
   └─ signature          PS256, with the LFI's payment token signing key`

// ── Keys ────────────────────────────────────────────────────────────────────
const lfiJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{LFI OrganisationId}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{LFI OrganisationId}/application.jwks`

const bpipJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks`

// ── Step 1 — LFI signs ──────────────────────────────────────────────────────
const signTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'
import { randomUUID } from 'node:crypto'

type Amount = { Amount: string; Currency: string }
type LookupData = { uaeKycId: string; IcpToken: string; TransactionAmount: Amount }
type Instrument =
  | { InstrumentType: 'ACCOUNT'; DebtorAccount: { SchemeName: 'IBAN'; Identification: string } }
  | { InstrumentType: 'CARD'; CardDetails: { CardNumber: string; ExpiryDate: string } }

const PAYMENT_TOKEN_LIFETIME = 120 // seconds

// The private key behind your payment token signing certificate. Never Sig2.
const signingKey = await importPKCS8(myKeyStore.getPrivateKeyPem(paymentTokenKid), 'PS256')

async function signPaymentToken(
  data: LookupData,       // Data from the lookup, after the ICP token is validated
  callerOrgId: string,    // o3-caller-org-id on the proxied lookup
  instrument: Instrument, // from your BioPay registration for data.uaeKycId
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  return new SignJWT({
    azp: callerOrgId,
    uaeKycId: data.uaeKycId,
    IcpToken: data.IcpToken,                  // unchanged
    InstructedAmount: data.TransactionAmount, // unchanged
    ...instrument,
  })
    .setProtectedHeader({ alg: 'PS256', kid: paymentTokenKid })
    .setIssuer(myOrganisationId)
    .setIssuedAt(now)
    .setExpirationTime(now + PAYMENT_TOKEN_LIFETIME)
    .setJti(\`pt-\${randomUUID()}\`)
    .sign(signingKey)
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import time, uuid
from jwcrypto import jwk, jwt

PAYMENT_TOKEN_LIFETIME = 120  # seconds

# The private key behind your payment token signing certificate. Never Sig2.
signing_key = jwk.JWK.from_pem(my_key_store.get_private_key_pem(payment_token_kid))

def sign_payment_token(data: dict, caller_org_id: str, instrument: dict) -> str:
    # data:          Data from the lookup, after the ICP token is validated
    # caller_org_id: o3-caller-org-id on the proxied lookup
    # instrument:    from your BioPay registration for data["uaeKycId"] —
    #                {"InstrumentType": "ACCOUNT", "DebtorAccount": {...}}
    #                or {"InstrumentType": "CARD", "CardDetails": {...}}
    now = int(time.time())
    claims = {
        "iss": my_organisation_id,
        "azp": caller_org_id,
        "iat": now,
        "exp": now + PAYMENT_TOKEN_LIFETIME,
        "jti": f"pt-{uuid.uuid4()}",
        "uaeKycId": data["uaeKycId"],
        "IcpToken": data["IcpToken"],                   # unchanged
        "InstructedAmount": data["TransactionAmount"],  # unchanged
        **instrument,
    }
    token = jwt.JWT(header={"alg": "PS256", "kid": payment_token_kid}, claims=claims)
    token.make_signed_token(signing_key)
    return token.serialize()`,
  },
] as const

const accountTokenClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "exp": 1792059423,
  "jti": "pt-3c9a7e21-5b84-4f0d-9e62-1a7b8c9d0e1f",
  "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
  "IcpToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ...",
  "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
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
  paymentToken: string,              // the JWS from Step 1
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
  return new CompactEncrypt(new TextEncoder().encode(paymentToken))
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
    payment_token: str,                # the JWS from Step 1
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
        payment_token.encode(),
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
  "Data": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSIsImN0eSI6IkpXVCJ9..."
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

const encryptedToken = lookupResponse.Data
const kid = getJweKid(encryptedToken)
const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

encrypted_token = lookup_response["Data"]
kid = get_jwe_kid(encrypted_token)
private_key = my_key_store.get_private_key(kid)`,
  },
] as const

const decryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(encryptedToken, privateKey, {
  keyManagementAlgorithms: ['RSA-OAEP-256'],
  contentEncryptionAlgorithms: ['A256GCM'],
})
const paymentToken = new TextDecoder().decode(plaintext) // the LFI's JWS`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `from jwcrypto import jwe

token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
token.deserialize(encrypted_token, key=private_key)
payment_token = token.payload.decode()  # the LFI's JWS`,
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
    // Built from the LFI you called, never from the iss in the token
    jwks = createRemoteJWKSet(
      new URL(\`https://keystore.directory.openfinance.ae/\${lfiOrganisationId}/application.jwks\`),
      { cacheMaxAge: 300_000, cooldownDuration: 60_000, timeoutDuration: 5_000 },
    )
    lfiResolvers.set(lfiOrganisationId, jwks)
  }
  return jwks
}

const { payload } = await jwtVerify(paymentToken, lfiJwks(lfiOrganisationId), {
  issuer: lfiOrganisationId,
  algorithms: ['PS256'],
})

// Check it was issued to you, for the ICP token and amount you sent on the lookup
if (payload.azp !== myOrganisationId) {
  throw new Error('Payment token was not issued to this BPIP')
}
if (payload.IcpToken !== icpToken) {
  throw new Error('Payment token was not issued for this ICP token')
}
const amount = payload.InstructedAmount as { Amount: string; Currency: string } | undefined
if (amount?.Amount !== transactionAmount.Amount || amount?.Currency !== transactionAmount.Currency) {
  throw new Error('Payment token is not for the amount you sent')
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json
from jwcrypto import jwk, jwt

# Built from the LFI you called, never from the iss in the token.
# get_jwks is a cached keystore fetch, as in Step 2.
lfi_jwks_uri = f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks"
lfi_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(lfi_jwks_uri)}))

verified = jwt.JWT(
    key=lfi_keys,
    jwt=payment_token,
    algs=["PS256"],
    check_claims={"iss": lfi_organisation_id, "exp": None},
)
claims = json.loads(verified.claims)

# Check it was issued to you, for the ICP token and amount you sent on the lookup
if claims["azp"] != my_organisation_id:
    raise ValueError("Payment token was not issued to this BPIP")
if claims["IcpToken"] != icp_token:
    raise ValueError("Payment token was not issued for this ICP token")
if claims["InstructedAmount"] != transaction_amount:
    raise ValueError("Payment token is not for the amount you sent")`,
  },
] as const

const fullBpipTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8, jwtVerify } from 'jose'

async function openPaymentToken(
  encryptedToken: string,    // Data from the lookup response
  lfiOrganisationId: string, // the LFI you called, from the Directory
  icpToken: string,          // Data.IcpToken you sent on the lookup
  transactionAmount: { Amount: string; Currency: string }, // Data.TransactionAmount you sent
) {
  // 1. Select your private key by the kid in the JWE header
  const [headerB64] = encryptedToken.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')

  // 2. Decrypt the JWE → the payment token, a JWS signed by the LFI
  const { plaintext } = await compactDecrypt(encryptedToken, privateKey, {
    keyManagementAlgorithms: ['RSA-OAEP-256'],
    contentEncryptionAlgorithms: ['A256GCM'],
  })
  const paymentToken = new TextDecoder().decode(plaintext)

  // 3. Verify the LFI's signature, iss and exp (lfiJwks as in Step 5)
  const { payload } = await jwtVerify(paymentToken, lfiJwks(lfiOrganisationId), {
    issuer: lfiOrganisationId,
    algorithms: ['PS256'],
  })

  // 4. Check it was issued to you, for the ICP token and amount you sent
  if (payload.azp !== myOrganisationId) {
    throw new Error('Payment token was not issued to this BPIP')
  }
  if (payload.IcpToken !== icpToken) {
    throw new Error('Payment token was not issued for this ICP token')
  }
  const amount = payload.InstructedAmount as { Amount: string; Currency: string } | undefined
  if (amount?.Amount !== transactionAmount.Amount || amount?.Currency !== transactionAmount.Currency) {
    throw new Error('Payment token is not for the amount you sent')
  }

  // Keep the JWS to send back at the point of payment. Hold card details in
  // memory only. Never log or persist them.
  return { paymentToken, claims: payload }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwe, jwk, jwt

def open_payment_token(
    encrypted_token: str,      # Data from the lookup response
    lfi_organisation_id: str,  # the LFI you called, from the Directory
    icp_token: str,            # Data.IcpToken you sent on the lookup
    transaction_amount: dict,  # Data.TransactionAmount you sent on the lookup
) -> tuple[str, dict]:
    # 1. Select your private key by the kid in the JWE header
    header_b64 = encrypted_token.split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → the payment token, a JWS signed by the LFI
    token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
    token.deserialize(encrypted_token, key=private_key)
    payment_token = token.payload.decode()

    # 3. Verify the LFI's signature, iss and exp (get_jwks as in Step 2)
    lfi_jwks_uri = f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks"
    lfi_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(lfi_jwks_uri)}))
    verified = jwt.JWT(
        key=lfi_keys,
        jwt=payment_token,
        algs=["PS256"],
        check_claims={"iss": lfi_organisation_id, "exp": None},
    )
    claims = json.loads(verified.claims)

    # 4. Check it was issued to you, for the ICP token and amount you sent
    if claims["azp"] != my_organisation_id:
        raise ValueError("Payment token was not issued to this BPIP")
    if claims["IcpToken"] != icp_token:
        raise ValueError("Payment token was not issued for this ICP token")
    if claims["InstructedAmount"] != transaction_amount:
        raise ValueError("Payment token is not for the amount you sent")

    # Keep the JWS to send back at the point of payment. Hold card details in
    # memory only. Never log or persist them.
    return payment_token, claims`,
  },
] as const

// ── Step 6 — BPIP sends the JWS back ────────────────────────────────────────
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
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImxmaS1zaWduLTEifQ...",
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE220331234567890876543"
    },
    "PaymentPurposeCode": "ACM"
  },
  "Risk": {}
}`

// ── Step 7 — LFI validates ──────────────────────────────────────────────────
const validateTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { importSPKI, jwtVerify, type JWTPayload } from 'jose'

class PaymentTokenRejected extends Error {} // its message is the ErrorCode

// Your payment token signing keys, by kid: the current key, and a retired key
// until every token it signed has expired. No other key in your organisation
// JWKS, such as Sig2, can sign a payment token.
async function ownKey(kid: string | undefined) {
  const pem = kid ? myKeyStore.getPaymentTokenPublicKeyPem(kid) : undefined
  if (!pem) throw new PaymentTokenRejected('PaymentToken.InvalidSignature')
  return importSPKI(pem, 'PS256')
}

async function validatePaymentToken(
  paymentToken: string, // Data.PaymentToken, as proxied by the API Hub
  callerOrgId: string,  // o3-caller-org-id on the proxied payment
): Promise<JWTPayload> {
  // 1. Your own signature, iss and exp
  let payload: JWTPayload
  try {
    ;({ payload } = await jwtVerify(paymentToken, (header) => ownKey(header.kid), {
      issuer: myOrganisationId,
      algorithms: ['PS256'],
      clockTolerance: 10,
    }))
  } catch (e) {
    if (e instanceof PaymentTokenRejected) throw e
    const expired = (e as { code?: string }).code === 'ERR_JWT_EXPIRED'
    throw new PaymentTokenRejected(expired ? 'PaymentToken.Expired' : 'PaymentToken.InvalidSignature')
  }

  // 2. The instrument type, and the BPIP it was issued to
  if (payload.InstrumentType !== 'ACCOUNT') {
    throw new PaymentTokenRejected('PaymentToken.WrongInstrumentType')
  }
  if (payload.azp !== callerOrgId) {
    throw new PaymentTokenRejected('PaymentToken.BindingMismatch')
  }

  // 3. Single use. The unique jti you record with the payment is the final guard.
  if (await usedJtis.has(payload.jti!)) {
    throw new PaymentTokenRejected('PaymentToken.AlreadyUsed')
  }

  // 4. The debtor account is still the one registered for BioPay
  const registered = await registrations.debtorAccount(payload.uaeKycId as string)
  const debtor = payload.DebtorAccount as { Identification: string }
  if (registered?.Identification !== debtor.Identification) {
    throw new PaymentTokenRejected('Account.DebtorAccountMismatch')
  }

  return payload
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwk, jwt
from jwcrypto.jwt import JWTExpired

class PaymentTokenRejected(Exception):
    """Its message is the ErrorCode."""

def own_key(payment_token: str) -> jwk.JWK:
    # Your payment token signing keys, by kid: the current key, and a retired key
    # until every token it signed has expired. No other key in your organisation
    # JWKS, such as Sig2, can sign a payment token.
    header = json.loads(base64.urlsafe_b64decode(payment_token.split(".")[0] + "=="))
    pem = my_key_store.get_payment_token_public_key_pem(header.get("kid"))
    if pem is None:
        raise PaymentTokenRejected("PaymentToken.InvalidSignature")
    return jwk.JWK.from_pem(pem)

def validate_payment_token(payment_token: str, caller_org_id: str) -> dict:
    # payment_token: Data.PaymentToken, as proxied by the API Hub
    # caller_org_id: o3-caller-org-id on the proxied payment

    # 1. Your own signature, iss and exp
    token = jwt.JWT(algs=["PS256"], check_claims={"iss": my_organisation_id, "exp": None})
    token.leeway = 10
    try:
        token.deserialize(payment_token, key=own_key(payment_token))
    except PaymentTokenRejected:
        raise
    except JWTExpired:
        raise PaymentTokenRejected("PaymentToken.Expired")
    except Exception:
        raise PaymentTokenRejected("PaymentToken.InvalidSignature")
    claims = json.loads(token.claims)

    # 2. The instrument type, and the BPIP it was issued to
    if claims["InstrumentType"] != "ACCOUNT":
        raise PaymentTokenRejected("PaymentToken.WrongInstrumentType")
    if claims["azp"] != caller_org_id:
        raise PaymentTokenRejected("PaymentToken.BindingMismatch")

    # 3. Single use. The unique jti you record with the payment is the final guard.
    if used_jtis.contains(claims["jti"]):
        raise PaymentTokenRejected("PaymentToken.AlreadyUsed")

    # 4. The debtor account is still the one registered for BioPay
    registered = registrations.debtor_account(claims["uaeKycId"])
    if registered is None or registered["Identification"] != claims["DebtorAccount"]["Identification"]:
        raise PaymentTokenRejected("Account.DebtorAccountMismatch")

    return claims`,
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
      lede="How the payment token is protected from end to end. The LFI signs it and encrypts it to the BPIP. The API Hub proxies it unread. The BPIP decrypts it and verifies the LFI&rsquo;s signature, then sends it back. The LFI validates its own token before it pays. The pattern is the sign-then-encrypt Nested JWT that Open Finance uses for payment PII, with the roles reversed. <strong>Everything here is draft</strong> &mdash; keys, claims and checks are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal-deep)"
      eyebrow="Overview"
      title="One token, signed then encrypted"
      tone="surface"
    >
      <EdProse>
        <p>
          The payment token the LFI returns on
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>
          carries the customer&rsquo;s IBAN or card details, so it is protected twice:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-teal-deep)">
        <li>
          <strong>Signed by the LFI (JWS).</strong> The signature proves the LFI issued the token
          and that nobody has changed it. This is what lets the LFI rely on the token when it
          comes back at the point of payment, and what lets the BPIP trust what it carries.
        </li>
        <li>
          <strong>Encrypted to the BPIP (JWE).</strong> Only the BPIP can read the token, although
          the response passes through the API Hub. The Hub never sees card data in the clear, which
          keeps it out of PCI DSS scope.
        </li>
      </EdBullets>
      <EdProse>
        <p>
          The LFI signs first and then encrypts the signed token &mdash; a Nested JWT, with the JWS
          inside the JWE:
        </p>
      </EdProse>
      <EdCode :code="nestedStructure" lang="text" filename="Structure of Data in the lookup response" />

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
            <tr><th></th><th>Open Finance payment PII</th><th>BioPay payment token</th></tr>
          </thead>
          <tbody>
            <tr><td>Signed by</td><td>TPP, with its signing key (<code>PS256</code>)</td><td>LFI, with its payment token signing key (<code>PS256</code>)</td></tr>
            <tr><td>Encrypted to</td><td>The LFI&rsquo;s Enc1 key</td><td>The BPIP&rsquo;s encryption key</td></tr>
            <tr><td>Algorithms</td><td><code>RSA-OAEP-256</code> / <code>A256GCM</code></td><td><code>RSA-OAEP-256</code> / <code>A256GCM</code></td></tr>
            <tr><td>Carried in</td><td>The <code>/par</code> request and <code>POST /payments</code></td><td>The <code>POST /instrument-lookup</code> response</td></tr>
            <tr><td>Decrypted by</td><td>LFI &mdash; see <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii">How to Decrypt PII</RouterLink></td><td>BPIP &mdash; <a href="#decrypt">Step 4</a></td></tr>
            <tr><td>Lifetime</td><td>As long as the consent</td><td>120 seconds, single use</td></tr>
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
            <tr><td><a href="#sign">1</a></td><td>LFI</td><td>Builds the payment token and signs it as a JWS.</td><td>LFI payment token signing key (private)</td></tr>
            <tr><td><a href="#encrypt">2</a></td><td>LFI</td><td>Encrypts the JWS as a JWE to the calling BPIP, and returns it in the lookup response.</td><td>BPIP encryption key (public)</td></tr>
            <tr><td><a href="#proxy">3</a></td><td>API Hub</td><td>Proxies the JWE to the BPIP, unread.</td><td>&mdash;</td></tr>
            <tr><td><a href="#decrypt">4</a></td><td>BPIP</td><td>Decrypts the JWE to recover the JWS.</td><td>BPIP encryption key (private)</td></tr>
            <tr><td><a href="#verify">5</a></td><td>BPIP</td><td>Verifies the LFI&rsquo;s signature and the claims.</td><td>LFI payment token signing key (public)</td></tr>
            <tr><td><a href="#return">6</a></td><td>BPIP</td><td>Sends the JWS back: on <code>POST /biometric-payments</code> for an <code>ACCOUNT</code>, or in the card authorisation for a <code>CARD</code>.</td><td>BPIP signing key, for <code>x-jws-signature</code></td></tr>
            <tr><td><a href="#validate">7</a></td><td>LFI</td><td>Verifies its own signature and the claims, and marks the token used.</td><td>LFI payment token signing key (public)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="info" title="What this page covers">
        <p>
          LFIs implement Steps 1, 2 and 7. BPIPs implement Steps 4, 5 and 6. The other signed objects
          in a BioPay payment follow existing patterns: the ICP token is signed by ICP and validated
          by the LFI at ICP&rsquo;s token validation endpoint; the client assertion and
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
              <td><strong>Payment token signing key</strong> &mdash; a Server Signing certificate in the LFI&rsquo;s Trust Framework organisation</td>
              <td>LFI</td>
              <td>The LFI&rsquo;s organisation JWKS: <code>&hellip;/{LFI OrganisationId}/application.jwks</code></td>
              <td>Step 1 (sign), Step 5 (BPIP verifies), Step 7 (LFI verifies)</td>
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

      <h3 class="bp-sub">LFI &mdash; create the payment token signing certificate</h3>
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
          The LFI MUST generate and hold the private key itself, and MUST NOT sign payment tokens
          with <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#ozone-held-certs">Sig2</RouterLink>.
          Sig2 is created from a CSR Ozone provides, so its private key is held for the API Hub. A
          token signed with it would not prove that the LFI issued it.
        </li>
        <li>
          The LFI SHOULD use a dedicated key for payment tokens, and not share it with Sig4 or any
          other purpose.
        </li>
        <li>
          After publishing a new key, the LFI MUST wait at least 10 minutes before signing with it.
          A BPIP may hold the previous copy of your JWKS for that long &mdash; see
          <RouterLink to="/tech/lfi-api-hub/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
        </li>
        <li>
          When you retire a key, keep its public key in the set you verify against in
          <a href="#validate">Step 7</a> until every token it signed has expired &mdash; 120 seconds
          plus clock skew.
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
      title="Build and sign the payment token"
      tone="surface"
    >
      <EdProse>
        <p>
          Build the payment token only once the ICP token in the lookup is valid: ICP&rsquo;s token
          validation endpoint has confirmed it, <code>azp</code> is the calling BPIP,
          <code>sub</code> equals <code>Data.uaeKycId</code>, and <code>txn</code> equals the hash of
          <code>Data.TransactionAmount</code>. Otherwise reject the lookup with the matching
          <code>403</code> from the
          <RouterLink to="/biopay/payment/api-guide/#lookup-errors">lookup errors</RouterLink>, and
          issue no token.
        </p>
      </EdProse>

      <h3 class="bp-sub">Claims</h3>
      <EdProse>
        <p>
          The claims are <code>AEPaymentToken</code> in the draft specification &mdash; see
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
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
            <tr><td><code>exp</code></td><td><code>iat</code> + 120</td><td>&mdash;</td></tr>
            <tr><td><code>jti</code></td><td>Unique per token, up to 40 characters &mdash; for example <code>pt-</code> followed by a UUID</td><td>&mdash;</td></tr>
            <tr><td><code>uaeKycId</code></td><td>The customer&rsquo;s identifier</td><td><code>Data.uaeKycId</code></td></tr>
            <tr><td><code>IcpToken</code></td><td>The ICP token, unchanged</td><td><code>Data.IcpToken</code></td></tr>
            <tr><td><code>InstructedAmount</code></td><td>The amount, unchanged</td><td><code>Data.TransactionAmount</code></td></tr>
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
            <tr><td><code>kid</code></td><td>The KID of your payment token signing certificate. Identify the key by <code>kid</code> only &mdash; not <code>x5c</code>, <code>x5u</code> or <code>jku</code>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="signTabs" />
      <EdCode :code="accountTokenClaims" lang="json" filename="Signed claims — ACCOUNT" />
      <EdNote type="tip" title="No state at issue">
        <p>
          You do not need to store the token when you issue it &mdash; your signature is the record.
          The only state the payment token needs is the set of <code>jti</code> values already used,
          which you write in <a href="#validate">Step 7</a>.
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
          Encrypt only to the BPIP that called. The token carries the customer&rsquo;s IBAN or card
          details; a JWE encrypted to any other key exposes them to whoever holds it.
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
        <p>Return the compact JWE as <code>Data</code>, and nothing else:</p>
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
      title="Proxy the response unread"
      tone="surface"
    >
      <EdProse>
        <p>
          The API Hub validates the lookup response against its schema and proxies it to the BPIP.
          It does not hold the BPIP&rsquo;s private key, so it cannot decrypt <code>Data</code>, and
          it does not verify the payment token. Errors from the LFI &mdash; the <code>403</code>
          <code>IcpToken.*</code> codes and <code>404</code> &mdash; are mapped to the standard as for
          any proxied request.
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
          proposes. The result is the payment token: a compact JWS signed by the LFI.
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
          <code>iss</code>, a token could name its own signer, and it would verify against keys of
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
          The active JWKS is enough. The token is at most 120 seconds old, so the LFI cannot have
          retired the signing key in between, as in Pattern A of
          <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns">How
          to Decrypt PII</RouterLink>. If the <code>kid</code> is not in your cached copy, refetch at
          most once a minute before rejecting the token.
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
            <tr><td><code>IcpToken</code></td><td>Equals the ICP token you sent as <code>Data.IcpToken</code>.</td></tr>
            <tr><td><code>InstructedAmount</code></td><td>Equals the <code>Data.TransactionAmount</code> you sent.</td></tr>
            <tr><td><code>InstrumentType</code></td><td>Present. Route the payment on it &mdash; see <RouterLink to="/biopay/payment/api-guide/#payment-token">Route on the instrument type</RouterLink>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="verifyTabs" />
      <EdProse>
        <p>
          If any check fails, do not present the token and do not make the payment. Offer another
          payment method.
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
      title="Send the JWS back to the LFI"
    >
      <EdProse>
        <p>
          The payment token replaces the ICP token at the point of payment. Send the
          <strong>JWS</strong> &mdash; what you decrypted in Step 4 &mdash; not the JWE: the JWE is
          encrypted to you, so the LFI cannot read it. Send it unchanged, once, before it expires.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>InstrumentType</code></th><th>Send the JWS in</th><th>Route to the LFI</th></tr>
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
          This signature is yours and covers the whole body; the LFI&rsquo;s signature inside
          <code>PaymentToken</code> is carried unchanged. The full request is described in
          <RouterLink to="/biopay/payment/api-guide/#payment">Make the account payment</RouterLink>.
        </p>
      </EdProse>
      <EdNote type="info" title="The JWS is signed, not encrypted">
        <p>
          On the way back, the API Hub can read the payment token: it records the biometric assurance
          from the ICP token embedded in it once the LFI accepts the payment. Only a
          <code>CARD</code> token keeps its details away from the Hub, because a card payment does not
          return through it.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 09 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="validate"
      num="09"
      color="var(--at-teal-deep)"
      eyebrow="Step 7 — LFI"
      title="Validate the payment token"
      tone="surface"
    >
      <EdProse>
        <p>
          The API Hub proxies <code>POST /biometric-payments</code> to your Ozone Connect without
          verifying the payment token. You MUST validate it before you create the payment, in this
          order, and reject the request with the first check that fails:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Check</th><th>On failure (<code>403</code>)</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>The JWS header has <code>alg: PS256</code> and the <code>kid</code> of one of <strong>your own payment token signing keys</strong>, and the signature verifies against it.</td><td><code>PaymentToken.InvalidSignature</code></td></tr>
            <tr><td>2</td><td><code>iss</code> is your organisation ID.</td><td><code>PaymentToken.InvalidSignature</code></td></tr>
            <tr><td>3</td><td><code>exp</code> has not passed, allowing no more than 10 seconds of clock skew.</td><td><code>PaymentToken.Expired</code></td></tr>
            <tr><td>4</td><td><code>InstrumentType</code> is <code>ACCOUNT</code>.</td><td><code>PaymentToken.WrongInstrumentType</code></td></tr>
            <tr><td>5</td><td><code>azp</code> equals <code>o3-caller-org-id</code> on the proxied payment.</td><td><code>PaymentToken.BindingMismatch</code></td></tr>
            <tr><td>6</td><td><code>jti</code> has not been used.</td><td><code>PaymentToken.AlreadyUsed</code></td></tr>
            <tr><td>7</td><td><code>DebtorAccount</code> is still the account registered for BioPay against <code>uaeKycId</code>.</td><td><code>Account.DebtorAccountMismatch</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="important" title="Verify against your own keys only">
        <p>
          You issued the token, so you need no keystore fetch: verify against the public keys of your
          payment token signing certificates, held locally. Do not verify against your organisation
          JWKS. It also contains Sig2, whose private key you do not hold, and a token signed with
          Sig2 is not one you issued.
        </p>
      </EdNote>
      <EdCodeGroup :tabs="validateTabs" />

      <h3 class="bp-sub">Mark the token used</h3>
      <EdBullets accent="var(--at-teal-deep)">
        <li>
          Record the <code>jti</code> in the same transaction that creates the payment, under a
          uniqueness constraint. Two requests carrying the same token then cannot both create a
          payment, even if both pass check 6 at the same moment.
        </li>
        <li>
          If you return an error, no payment exists and the <code>jti</code> is not recorded: the
          token stays usable until it expires.
        </li>
        <li>
          Keep each used <code>jti</code> until at least its <code>exp</code> plus clock skew. After
          that, check 3 rejects the token anyway.
        </li>
        <li>
          A retry with the same <code>x-idempotency-key</code> and identical body is answered by the
          API Hub with the original payment, and does not reach you.
        </li>
      </EdBullets>
      <EdProse>
        <p>
          Then debit <code>DebtorAccount</code> for <code>InstructedAmount</code> &mdash; both from
          the token, not from the request &mdash; and credit <code>Data.CreditorAccount</code>.
        </p>
      </EdProse>

      <h3 class="bp-sub">When the token arrives in a card authorisation</h3>
      <EdNote type="info" title="Coming soon — Jaywan specification">
        <p>
          How the payment token is carried in the card authorisation will come from the Jaywan
          specification.
        </p>
      </EdNote>
      <EdProse>
        <p>
          As issuer, run the same signature, <code>iss</code> and <code>exp</code> checks (1&ndash;3)
          and the single-use check (6). In place of checks 4, 5 and 7, check that
          <code>InstrumentType</code> is <code>CARD</code> and that the card and amount in the
          authorisation match <code>CardDetails</code> and <code>InstructedAmount</code>. Mark the
          <code>jti</code> used when you approve.
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
          <strong>Distinguishing the payment token key from Sig2.</strong> The LFI&rsquo;s
          organisation JWKS also carries Sig2. In Step 7 the LFI accepts only its own payment token
          keys, so a token it did not sign is rejected there. In Step 5, the BPIP cannot tell the two
          keys apart. How the BPIP should identify the LFI&rsquo;s payment token key is to be agreed
          &mdash; for example, a <code>kid</code> each LFI declares.
        </p>
        <p>
          <strong>The debtor account on the account payment.</strong> On <code>ACCOUNT</code>
          payments, the JWS, including <code>DebtorAccount</code>, passes through the API Hub
          readable, and
          <RouterLink to="/biopay/payment/api-reference/biometric-payments-payment-id"><code>GET /biometric-payments/{PaymentId}</code></RouterLink>
          returns it. This is to be reconciled with the
          <RouterLink to="/biopay/payment/technical-architecture#who">API Sequence Flow</RouterLink>,
          which says the Hub stores no account number.
        </p>
        <p>
          <strong>Card carriage.</strong> Each card scheme must carry the payment token in its
          authorisation message through to the issuing LFI. To be agreed with each scheme.
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
