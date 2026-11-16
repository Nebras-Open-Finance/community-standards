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
  { id: 'request-sign', label: 'BPIP signs' },
  { id: 'request-encrypt', label: 'BPIP encrypts' },
  { id: 'forward', label: 'API Hub forwards' },
  { id: 'request-open', label: 'LFI decrypts' },
  { id: 'response-sign', label: 'LFI signs' },
  { id: 'response-encrypt', label: 'LFI encrypts' },
  { id: 'response-open', label: 'BPIP decrypts' },
  { id: 'open-items', label: 'Open items' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Audience', value: 'LFI · BPIP' },
  { label: 'Version', value: '0.1' },
]

// ── Overview ────────────────────────────────────────────────────────────────
const structure = `POST /instrument-query — request body (application/jwt)
└─ JWE  — encrypted by the BPIP to the LFI
   ├─ protected header   { "alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": "lfi-enc-1", "cty": "JWT" }
   └─ ciphertext — decrypts to:

      JWS  — signed by the BPIP
      ├─ protected header   { "alg": "PS256", "kid": "bpip-sig-1" }
      ├─ payload            iss, aud, iat, nbf, exp, jti,
      │                     message.Data: UaeKycId, IcpToken, InstructedAmount,
      │                     MerchantId, TerminalId, AcquirerId, MerchantName
      └─ signature          PS256, with the BPIP's signing key

200 OK — response body (application/jwt)
└─ JWE  — encrypted by the LFI to the BPIP
   ├─ protected header   { "alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": "bpip-enc-1", "cty": "JWT" }
   └─ ciphertext — decrypts to:

      JWS  — signed by the LFI
      ├─ protected header   { "alg": "PS256", "kid": "lfi-sign-1" }
      ├─ payload            iss, azp, iat, nbf, exp,
      │                     message.Data: the request values, PaymentToken, Instruments
      └─ signature          PS256, with the LFI's response signing key`

// ── Keys ────────────────────────────────────────────────────────────────────
const lfiJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{LFI OrganisationId}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{LFI OrganisationId}/application.jwks`

const bpipJwksTemplate = `Production: https://keystore.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{o3-caller-org-id}/{o3-caller-software-statement-id}/application.jwks`

// ── Step 1 — BPIP signs ─────────────────────────────────────────────────────
const requestSignTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt' // Message Signing: adds iat, nbf and exp, signs with PS256

type Amount = { Amount: string; Currency: string }
type InstrumentQueryData = {
  UaeKycId: string
  IcpToken: string
  InstructedAmount: Amount
  MerchantId: string
  TerminalId: string
  AcquirerId: string
  MerchantName: string
}

async function signInstrumentQuery(
  data: InstrumentQueryData,
  issuer: string, // the LFI's authorisation server issuer, from its .well-known
): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    aud: issuer,
    jti: crypto.randomUUID(),
    message: { Data: data },
  })
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import uuid
from sign_jwt import sign_jwt  # Message Signing: adds iat, nbf and exp, signs with PS256

def sign_instrument_query(data: dict, issuer: str) -> str:
    # data:   UaeKycId, IcpToken, InstructedAmount, MerchantId, TerminalId, AcquirerId, MerchantName
    # issuer: the LFI's authorisation server issuer, from its .well-known
    return sign_jwt({
        "iss": CLIENT_ID,
        "aud": issuer,
        "jti": str(uuid.uuid4()),
        "message": {"Data": data},
    })`,
  },
] as const

const requestClaims = `{
  "iss": "[CLIENT_ID]",
  "aud": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "iat": 1792059302,
  "nbf": 1792059292,
  "exp": 1792059602,
  "jti": "0b6f3c2e-8d41-4a7b-9e25-6c1d0f3a8b94",
  "message": {
    "Data": {
      "UaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
      "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "MerchantId": "100000000000731",
      "TerminalId": "T0000042",
      "AcquirerId": "123456",
      "MerchantName": "Example Grocers"
    }
  }
}`

// ── Step 2 — BPIP encrypts ──────────────────────────────────────────────────
const requestEncryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import crypto from 'node:crypto'
import { CompactEncrypt, importJWK } from 'jose'
// getJwks: the cached keystore fetch from Message Encryption

async function encryptToLfi(signedRequest: string, lfiOrganisationId: string): Promise<string> {
  // 1. The LFI's organisation JWKS (cached)
  const keys = await getJwks(
    \`https://keystore.directory.openfinance.ae/\${lfiOrganisationId}/application.jwks\`,
  )

  // 2. Select its encryption key
  const encKeyJwk = keys.find((k) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) in the LFI JWKS')

  // 3. Encrypt the signed request into a compact JWE
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  return new CompactEncrypt(new TextEncoder().encode(signedRequest))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', kid: encKeyJwk.kid, cty: 'JWT' })
    .encrypt(encKey)
}

// 4. Send the JWE as the whole request body
const body = await encryptToLfi(await signInstrumentQuery(data, issuer), lfiOrganisationId)
const response = await fetch(
  \`\${resourceServerUrl}/open-finance/biometric-payments/v2.2/instrument-query\`,
  {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
      'Content-Type': 'application/jwt',
      Accept: 'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  },
)`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json, uuid
import requests
from jwcrypto import jwe, jwk
# get_jwks: the cached keystore fetch from Message Encryption

def encrypt_to_lfi(signed_request: str, lfi_organisation_id: str) -> str:
    # 1. The LFI's organisation JWKS (cached)
    keys = get_jwks(f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks")

    # 2. Select its encryption key
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if enc_key is None:
        raise ValueError("No encryption key (use: enc) in the LFI JWKS")

    # 3. Encrypt the signed request into a compact JWE
    token = jwe.JWE(
        signed_request.encode(),
        protected=json.dumps(
            {"alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": enc_key["kid"], "cty": "JWT"}
        ),
    )
    token.add_recipient(jwk.JWK.from_json(json.dumps(enc_key)))
    return token.serialize(compact=True)

# 4. Send the JWE as the whole request body
body = encrypt_to_lfi(sign_instrument_query(data, issuer), lfi_organisation_id)
response = requests.post(
    f"{resource_server_url}/open-finance/biometric-payments/v2.2/instrument-query",
    headers={
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/jwt",
        "Accept": "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    data=body,
    cert=(transport_cert_path, transport_key_path),
)`,
  },
] as const

const queryRequest = `POST /open-finance/biometric-payments/v2.2/instrument-query HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
Content-Type: application/jwt
Accept: application/jwt
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoibGZpLWVuYy0xIiwiY3R5IjoiSldUIn0...`

// ── Step 4 — LFI decrypts and verifies ──────────────────────────────────────
const requestOpenTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, createRemoteJWKSet, errors, importPKCS8, jwtVerify } from 'jose'

class RequestRejected extends Error {} // its message is the errorCode of a 400

// One resolver per BPIP application, created once and reused.
const bpipResolvers = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

function bpipJwks(orgId: string, softwareStatementId: string) {
  // Built from the o3-* headers the API Hub sets, never from the iss in the JWS
  const url = \`https://keystore.directory.openfinance.ae/\${orgId}/\${softwareStatementId}/application.jwks\`
  let jwks = bpipResolvers.get(url)
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(url), {
      cacheMaxAge: 300_000, cooldownDuration: 60_000, timeoutDuration: 5_000,
    })
    bpipResolvers.set(url, jwks)
  }
  return jwks
}

async function openInstrumentQuery(
  body: string, // the request body, forwarded unchanged by the API Hub
  headers: {
    'o3-caller-org-id': string
    'o3-caller-client-id': string
    'o3-caller-software-statement-id': string
  },
) {
  // 1. Decrypt with your Enc1 private key, selected by the kid in the JWE header
  let signedRequest: string
  try {
    const [headerB64] = body.split('.')
    const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
    const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')
    const { plaintext } = await compactDecrypt(body, privateKey, {
      keyManagementAlgorithms: ['RSA-OAEP-256'],
      contentEncryptionAlgorithms: ['A256GCM'],
    })
    signedRequest = new TextDecoder().decode(plaintext)
  } catch {
    throw new RequestRejected('JWE.DecryptionError')
  }

  // 2. Verify the BPIP's signature and claims
  let payload
  try {
    ;({ payload } = await jwtVerify(
      signedRequest,
      bpipJwks(headers['o3-caller-org-id'], headers['o3-caller-software-statement-id']),
      {
        algorithms: ['PS256'],
        issuer: headers['o3-caller-client-id'],
        audience: myIssuer, // your authorisation server issuer on the API Hub
        requiredClaims: ['exp', 'nbf'],
      },
    ))
  } catch (e) {
    if (e instanceof errors.JWTClaimValidationFailed || e instanceof errors.JWTExpired) {
      throw new RequestRejected('JWS.InvalidClaim')
    }
    throw new RequestRejected('JWS.InvalidSignature')
  }

  // 3. message.Data, for the schema check, then the ICP token and the payment token
  const data = (payload.message as { Data?: unknown } | undefined)?.Data
  if (!isInstrumentQueryData(data)) throw new RequestRejected('Body.InvalidFormat')
  return data
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwe, jwk, jwt

class RequestRejected(Exception):
    """Its message is the errorCode of a 400."""

def open_instrument_query(body: str, headers: dict) -> dict:
    # body:    the request body, forwarded unchanged by the API Hub
    # headers: the o3-* headers the API Hub sets

    # 1. Decrypt with your Enc1 private key, selected by the kid in the JWE header
    try:
        kid = json.loads(base64.urlsafe_b64decode(body.split(".")[0] + "=="))["kid"]
        token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
        token.deserialize(body, key=my_key_store.get_private_key(kid))
        signed_request = token.payload.decode()
    except Exception:
        raise RequestRejected("JWE.DecryptionError")

    # 2. Verify the BPIP's signature and claims, against the JWKS built from the
    #    o3-* headers — never from the iss in the JWS (get_jwks is a cached fetch)
    org_id = headers["o3-caller-org-id"]
    ssa_id = headers["o3-caller-software-statement-id"]
    bpip_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(
        f"https://keystore.directory.openfinance.ae/{org_id}/{ssa_id}/application.jwks"
    )}))
    try:
        verified = jwt.JWT(
            key=bpip_keys,
            jwt=signed_request,
            algs=["PS256"],
            check_claims={
                "iss": headers["o3-caller-client-id"],
                "aud": my_issuer,  # your authorisation server issuer on the API Hub
                "exp": None,
                "nbf": None,
            },
        )
    except (jwt.JWTExpired, jwt.JWTNotYetValid, jwt.JWTInvalidClaimValue, jwt.JWTMissingClaim):
        raise RequestRejected("JWS.InvalidClaim")
    except Exception:
        raise RequestRejected("JWS.InvalidSignature")

    # 3. message.Data, for the schema check, then the ICP token and the payment token
    data = json.loads(verified.claims).get("message", {}).get("Data")
    if not is_instrument_query_data(data):
        raise RequestRejected("Body.InvalidFormat")
    return data`,
  },
] as const

// ── Step 5 — LFI signs ──────────────────────────────────────────────────────
const responseSignTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'

type Instrument =
  | { SchemeName: 'IBAN'; Identification: string }
  | { SchemeName: 'PAN'; Identification: string; ExpiryDate: string }

// The private key behind your response signing certificate. Never Sig2.
const signingKey = await importPKCS8(myKeyStore.getPrivateKeyPem(responseSigningKid), 'PS256')

async function signInstrumentQueryResponse(
  data: InstrumentQueryData, // message.Data of the request, after the ICP token is validated
  paymentToken: string,      // from issuePaymentToken — see Payment Token
  exp: number,               // the payment token's expiry: 30 seconds after issue
  instruments: Instrument[], // the customer's instruments for ICP Pay
  callerOrgId: string,       // o3-caller-org-id on the proxied instrument query
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  return new SignJWT({
    azp: callerOrgId,
    message: {
      Data: { ...data, PaymentToken: paymentToken, Instruments: instruments }, // request values unchanged
    },
  })
    .setProtectedHeader({ alg: 'PS256', kid: responseSigningKid })
    .setIssuer(myOrganisationId)
    .setIssuedAt(now)
    .setNotBefore(now)
    .setExpirationTime(exp)
    .sign(signingKey)
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import time
from jwcrypto import jwk, jwt

# The private key behind your response signing certificate. Never Sig2.
signing_key = jwk.JWK.from_pem(my_key_store.get_private_key_pem(response_signing_kid))

def sign_instrument_query_response(
    data: dict,          # message.Data of the request, after the ICP token is validated
    payment_token: str,  # from issue_payment_token — see Payment Token
    exp: int,            # the payment token's expiry: 30 seconds after issue
    instruments: list,   # the customer's instruments for ICP Pay
    caller_org_id: str,  # o3-caller-org-id on the proxied instrument query
) -> str:
    now = int(time.time())
    claims = {
        "iss": my_organisation_id,
        "azp": caller_org_id,
        "iat": now,
        "nbf": now,
        "exp": exp,
        "message": {
            "Data": {**data, "PaymentToken": payment_token, "Instruments": instruments},
        },
    }
    token = jwt.JWT(header={"alg": "PS256", "kid": response_signing_kid}, claims=claims)
    token.make_signed_token(signing_key)
    return token.serialize()`,
  },
] as const

const responseClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "nbf": 1792059303,
  "exp": 1792059333,
  "message": {
    "Data": {
      "UaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
      "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "MerchantId": "100000000000731",
      "TerminalId": "T0000042",
      "AcquirerId": "123456",
      "MerchantName": "Example Grocers",
      "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
      "Instruments": [
        { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" }
      ]
    }
  }
}`

// ── Step 6 — LFI encrypts ───────────────────────────────────────────────────
const responseEncryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { CompactEncrypt, importJWK } from 'jose'
// getJwks: the cached keystore fetch from Message Encryption

async function encryptToBpip(
  signedResponse: string,            // the JWS from Step 5
  callerOrgId: string,               // o3-caller-org-id on the proxied instrument query
  callerSoftwareStatementId: string, // o3-caller-software-statement-id
): Promise<string> {
  // 1. The calling BPIP's application JWKS (cached)
  const keys = await getJwks(
    \`https://keystore.directory.openfinance.ae/\${callerOrgId}/\${callerSoftwareStatementId}/application.jwks\`,
  )

  // 2. Select its encryption key
  const encKeyJwk = keys.find((k) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) in the BPIP JWKS')

  // 3. Encrypt the signed response into a compact JWE
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  return new CompactEncrypt(new TextEncoder().encode(signedResponse))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', kid: encKeyJwk.kid, cty: 'JWT' })
    .encrypt(encKey)
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json
from jwcrypto import jwe, jwk
# get_jwks: the cached keystore fetch from Message Encryption

def encrypt_to_bpip(
    signed_response: str,              # the JWS from Step 5
    caller_org_id: str,                # o3-caller-org-id on the proxied instrument query
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

    # 3. Encrypt the signed response into a compact JWE
    token = jwe.JWE(
        signed_response.encode(),
        protected=json.dumps(
            {"alg": "RSA-OAEP-256", "enc": "A256GCM", "kid": enc_key["kid"], "cty": "JWT"}
        ),
    )
    token.add_recipient(jwk.JWK.from_json(json.dumps(enc_key)))
    return token.serialize(compact=True)`,
  },
] as const

const ozoneConnectResponse = `HTTP/1.1 200 OK
Content-Type: application/jwt

eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSIsImN0eSI6IkpXVCJ9...`

// ── Step 7 — BPIP decrypts and verifies ─────────────────────────────────────
const responseOpenTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, createRemoteJWKSet, importPKCS8, jwtVerify } from 'jose'

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

async function openInstrumentQueryResponse(
  body: string,              // the 200 response body
  lfiOrganisationId: string, // the LFI you called, from the Directory
  sent: InstrumentQueryData, // message.Data you sent
) {
  // 1. Select your private key by the kid in the JWE header
  const [headerB64] = body.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')

  // 2. Decrypt the JWE: a JWS signed by the LFI
  const { plaintext } = await compactDecrypt(body, privateKey, {
    keyManagementAlgorithms: ['RSA-OAEP-256'],
    contentEncryptionAlgorithms: ['A256GCM'],
  })

  // 3. Verify the LFI's signature, iss, exp and nbf
  const { payload } = await jwtVerify(new TextDecoder().decode(plaintext), lfiJwks(lfiOrganisationId), {
    issuer: lfiOrganisationId,
    algorithms: ['PS256'],
    requiredClaims: ['exp', 'nbf'],
  })

  // 4. Issued to you, for what you sent
  if (payload.azp !== myOrganisationId) throw new Error('Response was not issued to this BPIP')
  const data = (payload.message as { Data: Record<string, unknown> }).Data
  const echoed: (keyof InstrumentQueryData)[] = ['UaeKycId', 'IcpToken', 'MerchantId', 'TerminalId', 'AcquirerId', 'MerchantName']
  for (const field of echoed) {
    if (data[field] !== sent[field]) throw new Error('Response is not for the ' + field + ' you sent')
  }
  const amount = data.InstructedAmount as Amount
  if (amount.Amount !== sent.InstructedAmount.Amount || amount.Currency !== sent.InstructedAmount.Currency) {
    throw new Error('Response is not for the amount you sent')
  }

  // Present data.PaymentToken within 30 seconds. Hold card details in memory
  // only. Never log or persist them.
  return data
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwe, jwk, jwt

def open_instrument_query_response(body: str, lfi_organisation_id: str, sent: dict) -> dict:
    # body:                the 200 response body
    # lfi_organisation_id: the LFI you called, from the Directory
    # sent:                message.Data you sent

    # 1. Select your private key by the kid in the JWE header
    kid = json.loads(base64.urlsafe_b64decode(body.split(".")[0] + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE: a JWS signed by the LFI
    token = jwe.JWE(algs=["RSA-OAEP-256", "A256GCM"])
    token.deserialize(body, key=private_key)

    # 3. Verify the LFI's signature, iss, exp and nbf, against the JWKS of the
    #    LFI you called — never one taken from the iss in the JWS
    lfi_keys = jwk.JWKSet.from_json(json.dumps({"keys": get_jwks(
        f"https://keystore.directory.openfinance.ae/{lfi_organisation_id}/application.jwks"
    )}))
    verified = jwt.JWT(
        key=lfi_keys,
        jwt=token.payload.decode(),
        algs=["PS256"],
        check_claims={"iss": lfi_organisation_id, "exp": None, "nbf": None},
    )
    claims = json.loads(verified.claims)

    # 4. Issued to you, for what you sent
    if claims["azp"] != my_organisation_id:
        raise ValueError("Response was not issued to this BPIP")
    data = claims["message"]["Data"]
    for field in ("UaeKycId", "IcpToken", "InstructedAmount", "MerchantId",
                  "TerminalId", "AcquirerId", "MerchantName"):
        if data[field] != sent[field]:
            raise ValueError(f"Response is not for the {field} you sent")

    # Present data["PaymentToken"] within 30 seconds. Hold card details in
    # memory only. Never log or persist them.
    return data`,
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
      lede="How the instrument query is protected in both directions. The BPIP signs the request and encrypts it to the LFI; the LFI signs the response and encrypts it to the BPIP. The API Hub forwards both unread. Each direction is the sign-then-encrypt Nested JWT that Open Finance uses for payment PII &mdash; the request exactly as for PII, the response with the roles reversed. <strong>Everything here is draft</strong> &mdash; keys, claims and checks are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal-deep)"
      eyebrow="Overview"
      title="Signed by the sender, encrypted to the recipient"
      tone="surface"
    >
      <EdProse>
        <p>
          <RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink>
          carries the customer&rsquo;s <code>UaeKycId</code> and ICP token in the request, and their
          IBAN or card details in the response. Both are protected twice, the same way:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-teal-deep)">
        <li>
          <strong>Signed by the sender (JWS).</strong> The BPIP signs the request; the LFI signs the
          response. The signature proves to the recipient who sent the message and that nobody has
          changed it.
        </li>
        <li>
          <strong>Encrypted to the recipient (JWE).</strong> The BPIP encrypts the signed request
          to the LFI; the LFI encrypts the signed response to the BPIP. Only the recipient can read
          it, although it passes through the API Hub. The Hub never sees the instrument or card
          data in the clear, which keeps it out of PCI DSS scope.
        </li>
      </EdBullets>
      <EdProse>
        <p>
          The JWE is the <strong>whole body</strong> in each direction, sent as
          <code>Content-Type: application/jwt</code>. Sending either message signed but unencrypted
          is prohibited. The sender signs first and then encrypts the signed JWS &mdash; a Nested
          JWT, with the JWS inside the JWE:
        </p>
      </EdProse>
      <EdCode :code="structure" lang="text" filename="Structure of the request and response bodies" />

      <h3 class="bp-sub">The same pattern as payment PII</h3>
      <EdProse>
        <p>
          Open Finance already uses this construction for
          <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/">payment
          PII</RouterLink>: the TPP signs the PII and encrypts it to the LFI, and the API Hub
          proxies it unread. The BioPay request is built the same way. The response uses the same
          algorithms and steps, with the LFI as sender and the BPIP as recipient.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th></th><th>Open Finance payment PII</th><th>BioPay request</th><th>BioPay response</th></tr>
          </thead>
          <tbody>
            <tr><td>Signed by</td><td>TPP, with its signing key</td><td>BPIP, with its signing key</td><td>LFI, with its response signing key</td></tr>
            <tr><td>Encrypted to</td><td>The LFI&rsquo;s Enc1 key</td><td>The LFI&rsquo;s Enc1 key</td><td>The BPIP&rsquo;s encryption key</td></tr>
            <tr><td>Algorithms</td><td><code>PS256</code>; <code>RSA-OAEP-256</code> / <code>A256GCM</code></td><td><code>PS256</code>; <code>RSA-OAEP-256</code> / <code>A256GCM</code></td><td><code>PS256</code>; <code>RSA-OAEP-256</code> / <code>A256GCM</code></td></tr>
            <tr><td>Decrypted by</td><td>LFI &mdash; see <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii">How to Decrypt PII</RouterLink></td><td>LFI &mdash; <a href="#request-open">Step 4</a></td><td>BPIP &mdash; <a href="#response-open">Step 7</a></td></tr>
            <tr><td>Lifetime</td><td>As long as the consent</td><td>5 minutes (<code>exp</code>)</td><td>30 seconds, the life of the payment token</td></tr>
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
            <tr><td><a href="#request-sign">1</a></td><td>BPIP</td><td>Signs the request as a JWS.</td><td>BPIP signing key (private)</td></tr>
            <tr><td><a href="#request-encrypt">2</a></td><td>BPIP</td><td>Encrypts the JWS as a JWE to the LFI, and sends it as the request body.</td><td>LFI Enc1 key (public)</td></tr>
            <tr><td><a href="#forward">3</a></td><td>API Hub</td><td>Forwards the request unchanged to the LFI&rsquo;s Ozone Connect, and the response unread to the BPIP.</td><td>&mdash;</td></tr>
            <tr><td><a href="#request-open">4</a></td><td>LFI</td><td>Decrypts the request and verifies the BPIP&rsquo;s signature and claims.</td><td>LFI Enc1 key (private); BPIP signing key (public)</td></tr>
            <tr><td><a href="#response-sign">5</a></td><td>LFI</td><td>Validates the ICP token, issues the payment token, and signs the response as a JWS.</td><td>LFI response signing key (private)</td></tr>
            <tr><td><a href="#response-encrypt">6</a></td><td>LFI</td><td>Encrypts the JWS as a JWE to the calling BPIP, and returns it as the response body.</td><td>BPIP encryption key (public)</td></tr>
            <tr><td><a href="#response-open">7</a></td><td>BPIP</td><td>Decrypts the response and verifies the LFI&rsquo;s signature and claims.</td><td>BPIP encryption key (private); LFI response signing key (public)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="info" title="What this page covers">
        <p>
          BPIPs implement Steps 1, 2 and 7. LFIs implement Steps 4, 5 and 6. How the payment token is
          generated, presented and checked is on
          <RouterLink to="/biopay/payment/api-guide/payment-token">Payment Token</RouterLink>. The
          other signed objects in a BioPay payment follow existing patterns: the client assertion
          and the <code>x-jws-signature</code> on <code>POST /biometric-payments</code> are signed
          by the BPIP as in
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
      title="Four keys, two in each direction"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Key</th><th>Private key held by</th><th>Public key published at</th><th>Used in</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>BPIP signing key</strong> &mdash; the Signing certificate on the BPIP&rsquo;s application</td>
              <td>BPIP</td>
              <td>The BPIP&rsquo;s application JWKS: <code>&hellip;/{OrganisationId}/{SoftwareStatementId}/application.jwks</code></td>
              <td>Step 1 (sign), Step 4 (LFI verifies)</td>
            </tr>
            <tr>
              <td><strong>LFI encryption key</strong> &mdash; <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#enc1-encryption-key">Enc1</RouterLink>, in the LFI&rsquo;s Trust Framework organisation</td>
              <td>LFI</td>
              <td>The LFI&rsquo;s organisation JWKS: <code>&hellip;/{LFI OrganisationId}/application.jwks</code></td>
              <td>Step 2 (encrypt), Step 4 (decrypt)</td>
            </tr>
            <tr>
              <td><strong>LFI response signing key</strong> &mdash; a Server Signing certificate in the LFI&rsquo;s Trust Framework organisation</td>
              <td>LFI</td>
              <td>The LFI&rsquo;s organisation JWKS: <code>&hellip;/{LFI OrganisationId}/application.jwks</code></td>
              <td>Step 5 (sign), Step 7 (BPIP verifies)</td>
            </tr>
            <tr>
              <td><strong>BPIP encryption key</strong> &mdash; the Encryption certificate on the BPIP&rsquo;s application</td>
              <td>BPIP</td>
              <td>The BPIP&rsquo;s application JWKS: <code>&hellip;/{OrganisationId}/{SoftwareStatementId}/application.jwks</code></td>
              <td>Step 6 (encrypt), Step 7 (decrypt)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="lfiJwksTemplate" lang="text" filename="LFI organisation JWKS" />
      <EdCode :code="bpipJwksTemplate" lang="text" filename="BPIP application JWKS" />

      <h3 class="bp-sub">BPIP &mdash; signing and encryption certificates</h3>
      <EdBullets accent="var(--at-gold)">
        <li>
          The signing key is the one you already use for your client assertion &mdash; see
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>.
        </li>
        <li>
          Every BPIP MUST register an
          <RouterLink to="/tech/tpp-standards/trust-framework/certificates/client-encryption">Encryption
          certificate</RouterLink> on its application &mdash; see
          <RouterLink to="/biopay/directory">Directory</RouterLink>. It is published in the
          application JWKS with <code>"use": "enc"</code>, and the same key decrypts payment status
          events.
        </li>
        <li>
          When you replace the encryption key, keep the retired private key available for at least
          10 minutes after removing it from the JWKS. An LFI may encrypt to a cached copy of your
          JWKS for that long &mdash; see
          <RouterLink to="/tech/tpp-standards/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
        </li>
      </EdBullets>

      <h3 class="bp-sub">LFI &mdash; Enc1 and the response signing certificate</h3>
      <EdProse>
        <p>
          Enc1 is the encryption key you already hold for payment PII; BPIPs encrypt the instrument
          query to it. For the response, create a signing certificate. <strong>LFI action:</strong>
          Generate a private key and CSR &rarr; navigate to Organisation Certificates &rarr; + New
          Certificate &rarr; select <strong>Server Signing</strong> &rarr; upload the CSR &rarr;
          record the KID. See
          <RouterLink to="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</RouterLink>
          for how to generate the key and CSR. The certificate is published in your organisation
          JWKS.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-gold)">
        <li>
          The LFI MUST generate and hold the private key itself, and MUST NOT sign responses with
          <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#ozone-held-certs">Sig2</RouterLink>.
          Sig2 is created from a CSR Ozone provides, so its private key is held for the API Hub. A
          response signed with it would not prove that the LFI issued it.
        </li>
        <li>
          The LFI SHOULD use a dedicated key for instrument query responses, and not share it with
          Sig4 or any other purpose.
        </li>
        <li>
          After publishing a new key, the LFI MUST wait at least 10 minutes before signing with it.
          A BPIP may hold the previous copy of your JWKS for that long &mdash; see
          <RouterLink to="/tech/lfi-api-hub/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
        </li>
        <li>
          When you retire a key, keep it in your organisation JWKS until every response it signed
          has expired &mdash; 30 seconds plus clock skew &mdash; so that a BPIP can still verify
          them in <a href="#response-open">Step 7</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="request-sign"
      num="03"
      color="var(--at-navy)"
      eyebrow="Step 1 — BPIP"
      title="Sign the request"
      tone="surface"
    >
      <EdProse>
        <p>
          Put the request fields under <code>message.Data</code> and sign the claims as a JWS with
          your signing key. The claims around <code>message</code> follow the
          <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/confirmation-of-payee/api-guide">Confirmation
          of Payee</RouterLink> signed request. The specification requires <code>iss</code>,
          <code>exp</code> and <code>nbf</code>.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Your client ID. The LFI checks it against <code>o3-caller-client-id</code>.</td></tr>
            <tr><td><code>aud</code></td><td>The LFI&rsquo;s authorisation server issuer, from its <code>.well-known</code> &mdash; e.g. <code>https://auth1.[LFICODE].apihub.openfinance.ae</code>.</td></tr>
            <tr><td><code>iat</code></td><td>The time of signing, in seconds since the epoch.</td></tr>
            <tr><td><code>nbf</code></td><td>Slightly before <code>iat</code>, for clock skew &mdash; e.g. <code>iat - 10</code>.</td></tr>
            <tr><td><code>exp</code></td><td>Short-lived &mdash; <code>iat + 300</code>.</td></tr>
            <tr><td><code>jti</code></td><td>A unique identifier for this request &mdash; a UUID.</td></tr>
            <tr><td><code>message.Data</code></td><td><code>UaeKycId</code>, <code>IcpToken</code>, <code>InstructedAmount</code>, <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code> and <code>MerchantName</code> &mdash; see the <RouterLink to="/biopay/payment/api-guide/#query">API Guide</RouterLink>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>JWS header</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>PS256</code> &mdash; the only signing algorithm in the UAE Open Finance FAPI profile</td></tr>
            <tr><td><code>kid</code></td><td>The KID of your signing certificate. Identify the key by <code>kid</code> only &mdash; not <code>x5c</code>, <code>x5u</code> or <code>jku</code>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="requestSignTabs" />
      <EdCode :code="requestClaims" lang="json" filename="Signed request claims" />
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="request-encrypt"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Step 2 — BPIP"
      title="Encrypt the request to the LFI"
    >
      <EdProse>
        <p>
          Encrypt the signed JWS to the LFI ICP returned as the customer&rsquo;s default. Find that
          LFI&rsquo;s organisation ID in the Directory participants list (see
          <RouterLink to="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</RouterLink>),
          and take the key with <code>"use": "enc"</code> from its organisation JWKS &mdash; its
          Enc1 key, as for
          <RouterLink to="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption
          (JWE)</RouterLink>.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-blue-deep)">
        <li>Select the key with <code>"use": "enc"</code>. Never encrypt with a signing key (<code>"use": "sig"</code>).</li>
        <li>
          Encrypt only to the LFI you are calling. The request carries the customer&rsquo;s
          <code>UaeKycId</code> and ICP token; a JWE encrypted to any other key exposes them to
          whoever holds it, and the LFI you call cannot decrypt it.
        </li>
        <li>
          Cache the JWKS &mdash; see
          <RouterLink to="/tech/tpp-standards/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
          The instrument query is on the payment&rsquo;s critical path at the till: refresh the cache
          ahead of expiry rather than fetching the JWKS inside the payment.
        </li>
      </EdBullets>

      <h3 class="bp-sub">JWE header</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Value</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>RSA-OAEP-256</code></td><td>Wraps the content encryption key with the LFI&rsquo;s RSA public key</td></tr>
            <tr><td><code>enc</code></td><td><code>A256GCM</code></td><td>Encrypts the JWS with AES-256-GCM</td></tr>
            <tr><td><code>kid</code></td><td>string</td><td>The KID of the LFI&rsquo;s encryption key, from its JWKS</td></tr>
            <tr><td><code>cty</code></td><td><code>JWT</code></td><td>The content is itself a JWT &mdash; a Nested JWT (RFC 7519, section 5.2)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="requestEncryptTabs" />
      <EdProse>
        <p>
          The compact JWE is the whole request body. Sending the signed JWS without encryption is
          prohibited.
        </p>
      </EdProse>
      <EdCode :code="queryRequest" lang="http" filename="POST /instrument-query" />
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="forward"
      num="05"
      color="var(--at-gold)"
      eyebrow="Step 3 — API Hub"
      title="Forward both messages unread"
      tone="surface"
    >
      <EdProse>
        <p>
          The API Hub authenticates the BPIP over mTLS, and checks its access token and the
          <code>biometric-payments</code> scope. It does not hold the LFI&rsquo;s Enc1 private key,
          so it cannot read the request: it forwards the body unchanged to the LFI&rsquo;s Ozone
          Connect
          <RouterLink to="/biopay/payment/api-reference/ozone-connect/instrument-query"><code>POST /customers/action/instrument-query</code></RouterLink>,
          as <code>application/jwt</code>.
        </p>
        <p>
          The Hub identifies the BPIP in the <code>o3-*</code> headers it sets on every proxied
          request. The instrument query is not made under a consent, so no
          <code>o3-consent-id</code> is sent:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Identifies</th><th>The LFI uses it for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-caller-org-id</code></td><td>The BPIP&rsquo;s Directory organisation ID</td><td>The BPIP&rsquo;s JWKS URL (Steps 4 and 6), and <code>azp</code> on the response (Step 5)</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>The BPIP&rsquo;s software statement ID</td><td>The BPIP&rsquo;s JWKS URL (Steps 4 and 6)</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>The BPIP&rsquo;s client ID</td><td>Checking <code>iss</code> on the request (Step 4)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          The Hub forwards the LFI&rsquo;s <code>200</code> response to the BPIP unread: it does not
          hold the BPIP&rsquo;s private key either, so it cannot see the payment token or the
          instruments. Error responses from the LFI are mapped to the standard, as for any proxied
          request.
        </p>
      </EdProse>
      <EdNote type="info" title="Mediation is unchanged">
        <p>
          Encryption does not open a channel around the API Hub. Both JWEs travel inside the normal
          request and response, BPIP &rarr; API Hub &rarr; LFI &rarr; API Hub &rarr; BPIP, and the
          BPIP never connects to the LFI. Encryption only means that the Hub carries the customer&rsquo;s
          identifier, ICP token and instrument without being able to read them.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="request-open"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Step 4 — LFI"
      title="Decrypt the request and verify the BPIP’s signature"
    >
      <EdProse>
        <p>
          Check the request in this order, and reject it with a <code>400</code> and the first
          error code that applies. Do not call ICP until the request has passed every check.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Check</th><th>On failure (<code>400</code>)</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>The JWE header names one of your Enc1 keys by <code>kid</code>, with <code>RSA-OAEP-256</code> and <code>A256GCM</code>.</td><td><code>JWE.InvalidHeader</code></td></tr>
            <tr><td>2</td><td>The JWE decrypts with that private key.</td><td><code>JWE.DecryptionError</code></td></tr>
            <tr><td>3</td><td>The decrypted content is a compact JWS with a <code>PS256</code> header and a <code>kid</code>.</td><td><code>JWS.Malformed</code>, <code>JWS.InvalidHeader</code></td></tr>
            <tr><td>4</td><td>The signature verifies against the BPIP&rsquo;s application JWKS, built from <code>o3-caller-org-id</code> and <code>o3-caller-software-statement-id</code>.</td><td><code>JWS.InvalidSignature</code></td></tr>
            <tr><td>5</td><td><code>iss</code> equals <code>o3-caller-client-id</code>; <code>aud</code> is your authorisation server issuer; <code>exp</code> has not passed; <code>nbf</code> has.</td><td><code>JWS.InvalidClaim</code></td></tr>
            <tr><td>6</td><td><code>message.Data</code> matches the schema.</td><td><code>Body.InvalidFormat</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Build the JWKS URL from the API Hub’s headers, not from iss">
        <p>
          <code>iss</code> is unverified until the signature is. Your Enc1 key is public, so anyone
          can build a JWE that decrypts cleanly for you. If you took the signing keys from
          <code>iss</code>, a JWS could name its own signer. Resolve the keys from the BPIP the API
          Hub identified in the <code>o3-*</code> headers, then check that <code>iss</code> matches.
        </p>
      </EdNote>
      <EdCodeGroup :tabs="requestOpenTabs" />
      <EdProse>
        <p>
          Once the request passes, validate <code>message.Data.IcpToken</code> with ICP&rsquo;s token
          validation endpoint, and find the customer&rsquo;s instrument for ICP Pay. If no
          instrument can be matched from the request, return <code>400</code> with
          <code>Query.UnmatchedInstrument</code>. Otherwise issue the payment token &mdash; see
          <RouterLink to="/biopay/payment/api-guide/payment-token#issue">Payment Token</RouterLink>.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 07 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="response-sign"
      num="07"
      color="var(--at-navy)"
      eyebrow="Step 5 — LFI"
      title="Sign the response"
      tone="surface"
    >
      <EdProse>
        <p>
          Sign the response with your response signing key. <code>message.Data</code> carries the
          payment token, the values from the request unchanged, and the customer&rsquo;s
          instruments. The claims are <code>AEInstrumentQueryResponseSigned</code> in the
          specification &mdash; see
          <RouterLink to="/biopay/payment/api-reference/ozone-connect/instrument-query"><code>POST /customers/action/instrument-query</code></RouterLink>.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Value</th><th>Taken from</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Your Directory organisation ID</td><td>&mdash;</td></tr>
            <tr><td><code>azp</code></td><td>The BPIP&rsquo;s Directory organisation ID. Required.</td><td><code>o3-caller-org-id</code></td></tr>
            <tr><td><code>iat</code>, <code>nbf</code></td><td>The time of signing, in seconds since the epoch</td><td>&mdash;</td></tr>
            <tr><td><code>exp</code></td><td>The payment token&rsquo;s expiry: <code>iat + 30</code></td><td>Your payment token register</td></tr>
            <tr><td><code>message.Data.UaeKycId</code>, <code>IcpToken</code>, <code>InstructedAmount</code>, <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code>, <code>MerchantName</code></td><td>Unchanged</td><td><code>message.Data</code> of the request</td></tr>
            <tr><td><code>message.Data.PaymentToken</code></td><td>The payment token: a 36-character UUID</td><td><RouterLink to="/biopay/payment/api-guide/payment-token#issue">Payment Token</RouterLink></td></tr>
            <tr><td><code>message.Data.Instruments</code></td><td>The customer&rsquo;s instruments, each selected by <code>SchemeName</code>: <code>IBAN</code> with <code>Identification</code>, or <code>PAN</code> with <code>Identification</code> and <code>ExpiryDate</code></td><td>The instrument the customer designated for ICP Pay</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>JWS header</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>PS256</code></td></tr>
            <tr><td><code>kid</code></td><td>The KID of your response signing certificate. Identify the key by <code>kid</code> only.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="responseSignTabs" />
      <EdCode :code="responseClaims" lang="json" filename="Signed response claims — IBAN" />
      <EdNote type="tip" title="Your record, not your signature, is what you pay from">
        <p>
          The signature on the response is for the BPIP: it proves to them that you issued it. You
          never see the JWS again. When the payment token comes back, you pay from the record in your
          payment token register &mdash; see
          <RouterLink to="/biopay/payment/api-guide/payment-token#check">Payment Token</RouterLink>.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 08 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="response-encrypt"
      num="08"
      color="var(--at-blue-deep)"
      eyebrow="Step 6 — LFI"
      title="Encrypt the response to the BPIP"
    >
      <EdProse>
        <p>
          Find the calling BPIP&rsquo;s application JWKS from the <code>o3-caller-org-id</code> and
          <code>o3-caller-software-statement-id</code> headers, and encrypt the signed JWS to its
          <code>"use": "enc"</code> key, with the same JWE header as Step 2.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-blue-deep)">
        <li>Select the key with <code>"use": "enc"</code>. Never encrypt with a signing key.</li>
        <li>
          Encrypt only to the BPIP that called. The response carries the customer&rsquo;s IBAN or
          card details; a JWE encrypted to any other key exposes them to whoever holds it.
        </li>
        <li>
          Cache the JWKS, keyed by its URL &mdash; see
          <RouterLink to="/tech/lfi-api-hub/trust-framework/#keystore-caching">Keystore Caching</RouterLink>.
          Every second you spend here comes out of the payment token&rsquo;s 30 seconds: refresh the
          cache ahead of expiry rather than fetching the JWKS inside the request.
        </li>
      </EdBullets>
      <EdCodeGroup :tabs="responseEncryptTabs" />
      <EdProse>
        <p>
          Return the compact JWE as the whole response body, with
          <code>Content-Type: application/jwt</code>. Returning the signed JWS without encryption is
          prohibited.
        </p>
      </EdProse>
      <EdCode :code="ozoneConnectResponse" lang="http" filename="200 OK — from Ozone Connect" />
      <EdNote type="warning" title="Error responses are not encrypted">
        <p>
          Errors are returned as <code>application/json</code> with <code>errorCode</code> and
          <code>errorMessage</code>, as the Ozone Connect specification defines. Put no customer
          data in <code>errorMessage</code>.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 09 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="response-open"
      num="09"
      color="var(--at-teal-deep)"
      eyebrow="Step 7 — BPIP"
      title="Decrypt the response and verify the LFI’s signature"
      tone="surface"
    >
      <h3 class="bp-sub">1. Decrypt</h3>
      <EdProse>
        <p>
          The JWE protected header names the encryption key the LFI used. Select your private key by
          <code>kid</code>, not by assuming your current key &mdash; after a rotation the LFI may
          still be encrypting to the previous one. Accept only <code>RSA-OAEP-256</code> and
          <code>A256GCM</code>, whatever the header proposes. The result is a compact JWS signed by
          the LFI.
        </p>
      </EdProse>

      <h3 class="bp-sub">2. Verify the LFI&rsquo;s signature</h3>
      <EdProse>
        <p>
          Verify against the organisation JWKS of the LFI you called &mdash; the default LFI ICP
          returned &mdash; and pin <code>PS256</code>. Published JWKS entries carry no
          <code>alg</code>, so do not accept whatever the JWS header proposes. If the
          <code>kid</code> is not in your cached copy, refetch at most once a minute before rejecting
          the response.
        </p>
      </EdProse>
      <EdNote type="warning" title="Build the URL from the LFI you called, not from iss">
        <p>
          <code>iss</code> is unverified until the signature is. Your encryption key is public, so
          anyone can build a JWE that decrypts cleanly for you. Resolve the keys from the LFI you
          addressed, then check that <code>iss</code> matches.
        </p>
      </EdNote>

      <h3 class="bp-sub">3. Check the claims</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Check</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Equals the organisation ID of the LFI you called.</td></tr>
            <tr><td><code>azp</code></td><td>Equals your own organisation ID.</td></tr>
            <tr><td><code>exp</code>, <code>nbf</code></td><td><code>exp</code> has not passed &mdash; it is also when the payment token expires &mdash; and <code>nbf</code> has.</td></tr>
            <tr><td><code>message.Data</code> request values</td><td><code>UaeKycId</code>, <code>IcpToken</code>, <code>InstructedAmount</code>, <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code> and <code>MerchantName</code> equal what you sent.</td></tr>
            <tr><td><code>message.Data.Instruments</code></td><td>Present. Route the payment on the instrument&rsquo;s <code>SchemeName</code> &mdash; see <RouterLink to="/biopay/payment/api-guide/#route">Route on the scheme name</RouterLink>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="responseOpenTabs" />
      <EdProse>
        <p>
          If any check fails, do not present the payment token and do not make the payment. Offer
          another payment method. Otherwise present the payment token as set out on
          <RouterLink to="/biopay/payment/api-guide/payment-token#present">Payment Token</RouterLink>.
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
          <strong>Algorithms.</strong> This page uses <code>RSA-OAEP-256</code> and
          <code>A256GCM</code>, as Open Finance does for payment PII. The JWE examples in the
          specification carry <code>RSA-OAEP</code>. Which key management algorithm is required is
          to be confirmed.
        </p>
        <p>
          <strong>Request claims.</strong> The specification requires <code>iss</code>,
          <code>exp</code> and <code>nbf</code>. The values of <code>iss</code>, <code>aud</code>
          and <code>jti</code> here follow the Confirmation of Payee signed request, and are to be
          confirmed.
        </p>
        <p>
          <strong>Distinguishing the response signing key from Sig2.</strong> The LFI&rsquo;s
          organisation JWKS also carries Sig2, and in Step 7 the BPIP cannot tell the two keys
          apart, so a response signed with Sig2 would verify. How the BPIP should identify the
          LFI&rsquo;s response signing key is to be agreed &mdash; for example, a <code>kid</code>
          each LFI declares.
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
