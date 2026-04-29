<route lang="yaml">
meta:
  title: Preparing the Request JWT
</route>

<script setup lang="ts">
const headerJson = `{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}`

const pkceTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import crypto from 'node:crypto'

// Generate a cryptographically random code_verifier (43–128 chars, URL-safe)
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url')
}

// Derive the code_challenge (S256 = SHA-256 of the verifier, base64url-encoded)
export function deriveCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256').update(verifier).digest('base64url')
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import secrets
import hashlib
import base64

def generate_code_verifier() -> str:
    """Generate a cryptographically random code_verifier (43–128 chars, URL-safe)."""
    return base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode()

def derive_code_challenge(verifier: str) -> str:
    """Derive the code_challenge (S256 = SHA-256 of the verifier, base64url-encoded)."""
    digest = hashlib.sha256(verifier.encode()).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode()`,
  },
] as const

const buildJwtTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'
import crypto from 'node:crypto'

const ALGORITHM   = 'PS256'
const KEY_ID      = process.env.SIGNING_KEY_ID!
const CLIENT_ID   = process.env.CLIENT_ID!
const ISSUER      = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known
const REDIRECT_URI = process.env.REDIRECT_URI!

const privateKey = await importPKCS8(
  readFileSync('./certificates/signing.key', 'utf8'),
  ALGORITHM
)

interface RequestJWTOptions {
  scope: string
  codeChallenge: string
  authorizationDetails: unknown[]
  maxAge?: number
}

export async function buildRequestJWT({
  scope,
  codeChallenge,
  authorizationDetails,
  maxAge = 3600,
}: RequestJWTOptions): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    // Authorization Server identity
    aud: ISSUER,

    // Client identity
    iss: CLIENT_ID,
    client_id: CLIENT_ID,

    // Authorization parameters
    scope,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',

    // PKCE
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,

    // Security
    nonce: crypto.randomUUID(),
    state: crypto.randomUUID(),
    max_age: maxAge,

    // Consent
    authorization_details: authorizationDetails,

    // Timing
    iat: now,
    nbf: now - 10,
    exp: now + 300,  // 5-minute expiry
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import os
import time
import uuid
import jwt
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID = os.environ["SIGNING_KEY_ID"]
CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER = os.environ["AUTHORIZATION_SERVER_ISSUER"]  # from .well-known
REDIRECT_URI = os.environ["REDIRECT_URI"]

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def build_request_jwt(
    scope: str,
    code_challenge: str,
    authorization_details: list,
    max_age: int = 3600,
) -> str:
    now = int(time.time())
    payload = {
        # Authorization Server identity
        "aud": ISSUER,

        # Client identity
        "iss": CLIENT_ID,
        "client_id": CLIENT_ID,

        # Authorization parameters
        "scope": scope,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",

        # PKCE
        "code_challenge_method": "S256",
        "code_challenge": code_challenge,

        # Security
        "nonce": str(uuid.uuid4()),
        "state": str(uuid.uuid4()),
        "max_age": max_age,

        # Consent
        "authorization_details": authorization_details,

        # Timing
        "iat": now,
        "nbf": now - 10,
        "exp": now + 300,  # 5-minute expiry
    }
    return jwt.encode(
        payload,
        private_key,
        algorithm=ALGORITHM,
        headers={"alg": ALGORITHM, "kid": KEY_ID},
    )`,
  },
] as const

const fullExampleTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

// 1. Generate PKCE pair
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Build the authorization_details (example: bank data sharing consent)
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:account-access-consent:v2.1',
    consent: {
      ConsentId: crypto.randomUUID(),
      ExpirationDateTime: new Date(Date.now() + 364 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadBalances', 'ReadTransactionsBasic'],
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose: 'AccountAggregation',
      },
    },
  },
]

// 3. Build and sign the Request JWT
const requestJWT = await buildRequestJWT({
  scope: 'accounts openid',
  codeChallenge,
  authorizationDetails,
})

// 4. Send to /par
// Endpoints are read from .well-known/openid-configuration —
// not constructed from the issuer URL (they live on different hosts).
const response = await fetch(discoveryDoc.pushed_authorization_request_endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ request: requestJWT }),
})
const { request_uri, expires_in } = await response.json()

// 5. Redirect the user
const authorizeUrl = new URL(discoveryDoc.authorization_endpoint)
authorizeUrl.searchParams.set('client_id', CLIENT_ID)
authorizeUrl.searchParams.set('request_uri', request_uri)
window.location.href = authorizeUrl.toString()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import os
import uuid
import requests
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

CLIENT_ID = os.environ["CLIENT_ID"]

# 1. Generate PKCE pair
code_verifier = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

# 2. Build the authorization_details (example: bank data sharing consent)
expires_at = datetime.now(timezone.utc) + timedelta(days=364)
authorization_details = [
    {
        "type": "urn:openfinanceuae:account-access-consent:v2.1",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "ExpirationDateTime": expires_at.isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadBalances", "ReadTransactionsBasic"],
            "OpenFinanceBilling": {
                "UserType": "Retail",
                "Purpose": "AccountAggregation",
            },
        },
    }
]

# 3. Build and sign the Request JWT
request_jwt = build_request_jwt(
    scope="accounts openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)

# 4. Send to /par
# Endpoints are read from .well-known/openid-configuration —
# not constructed from the issuer URL (they live on different hosts).
response = requests.post(
    discovery_doc["pushed_authorization_request_endpoint"],
    headers={"Content-Type": "application/x-www-form-urlencoded"},
    data={"request": request_jwt},
)
request_uri = response.json()["request_uri"]

# 5. Redirect the user
authorize_url = (
    discovery_doc["authorization_endpoint"]
    + "?" + urlencode({"client_id": CLIENT_ID, "request_uri": request_uri})
)
# In a web framework, redirect to authorize_url`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · /par
        </div>
        <h1 class="ed-doc__title">
          Preparing the Request JWT
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          To send a <a href="/tech/tpp-standards/v2.1/consent/open-api/par">/par</a> request, you must first
          construct a signed <strong>Request JWT</strong> (also called a Request Object or JAR &mdash; JWT
          Authorization Request). This JWT is a signed package of all authorization parameters, proving they
          came from your registered application and haven't been tampered with.
        </p>
        <div class="ed-doc__hero-image">
          <ImageViewer
            src="/images/journeys/par_spotlight-request.png"
            alt="Request JWT highlighted in the PAR flow"
          />
        </div>
        <EdNote type="tip" title="Strict claim rules">
          <p>
            For a precise per-claim reference covering <code>aud</code>, <code>exp</code>/<code>nbf</code>
            lifetime windows, clock skew, and the difference between the Request Object and Client Assertion,
            see <a href="/knowledge-base/articles/jwt-claims">JWT Claim Rules</a>.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="header"
      num="01"
      color="var(--at-teal)"
      eyebrow="Header"
      title="JOSE header — algorithm and signing key"
      tone="cream"
    >
      <EdCode :code="headerJson" lang="json" filename="JOSE header" />

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alg</code></td>
              <td><code>PS256</code></td>
              <td>Signing algorithm &mdash; RSA-PSS with SHA-256</td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>string</td>
              <td>Key ID of your signing certificate, as registered in the Trust Framework</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payload"
      num="02"
      color="var(--at-gold)"
      eyebrow="Payload Claims"
      title="Authorization parameters carried inside the signed JWT"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aud</code></td>
              <td>string</td>
              <td>✓</td>
              <td>The <code>issuer</code> of the Authorization Server &mdash; found via <a href="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</a></td>
              <td><code>https://auth1.[LFICode].apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Issued At Unix timestamp &mdash; when the JWT was created</td>
              <td><code>1713196113</code></td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Expiry as a Unix timestamp. Must be shortly after <code>nbf</code> &mdash; maximum <strong>5 minutes</strong></td>
              <td><code>1713196423</code></td>
            </tr>
            <tr>
              <td><code>iss</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Your application's Client ID from the Trust Framework</td>
              <td><code>your-client-id</code></td>
            </tr>
            <tr>
              <td><code>client_id</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Your application's Client ID (same as <code>iss</code>)</td>
              <td><code>your-client-id</code></td>
            </tr>
            <tr>
              <td><code>redirect_uri</code></td>
              <td>string</td>
              <td>✓</td>
              <td>The callback URI registered in your Trust Framework application</td>
              <td><code>https://yourapp.com/callback</code></td>
            </tr>
            <tr>
              <td><code>scope</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Space-separated <a href="/tech/tpp-standards/security/fapi/scopes">OAuth 2.0 scopes</a></td>
              <td><code>accounts openid</code></td>
            </tr>
            <tr>
              <td><code>nonce</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Random UUID &mdash; prevents replay attacks by binding the ID token to this request</td>
              <td><code>a1b2c3d4-...</code></td>
            </tr>
            <tr>
              <td><code>state</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Random UUID &mdash; returned in the redirect; prevents CSRF attacks</td>
              <td><code>e5f6g7h8-...</code></td>
            </tr>
            <tr>
              <td><code>nbf</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Not Before Unix timestamp. Set slightly before <code>iat</code> (e.g. <code>iat - 10</code>) to allow for clock skew</td>
              <td><code>1713196103</code></td>
            </tr>
            <tr>
              <td><code>response_type</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Must be <code>code</code></td>
              <td><code>code</code></td>
            </tr>
            <tr>
              <td><code>code_challenge_method</code></td>
              <td>string</td>
              <td>✓</td>
              <td>PKCE method &mdash; only <code>S256</code> is supported</td>
              <td><code>S256</code></td>
            </tr>
            <tr>
              <td><code>code_challenge</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Base64url-encoded SHA-256 hash of your <code>code_verifier</code></td>
              <td><code>E9Melhoa2Ow...</code></td>
            </tr>
            <tr>
              <td><code>max_age</code></td>
              <td>number</td>
              <td></td>
              <td>Maximum age (seconds) of the user's existing authentication session. Capped at <code>3600</code></td>
              <td><code>3600</code></td>
            </tr>
            <tr>
              <td><code>authorization_details</code></td>
              <td>array</td>
              <td>✓</td>
              <td>Describes what the user is consenting to &mdash; see <a href="/tech/tpp-standards/v2.1/consent/api-guide">Consent</a></td>
              <td><code>[{...}]</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="pkce"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="PKCE"
      title="Generating a PKCE code challenge"
      tone="cream"
    >
      <EdProse>
        Before building the JWT, generate a <code>code_verifier</code> and derive the
        <code>code_challenge</code> from it:
      </EdProse>

      <EdCodeGroup :tabs="pkceTabs" />

      <EdProse>
        Store the <code>code_verifier</code> securely &mdash; you'll need it when exchanging the
        authorization code for tokens.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="build"
      num="04"
      color="var(--at-navy)"
      eyebrow="Building the Request JWT"
      title="Assemble and sign the JWT in code"
      tone="surface"
    >
      <EdCodeGroup :tabs="buildJwtTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="full-example"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Full Example"
      title="End-to-end PAR submission and redirect"
      tone="cream"
    >
      <EdCodeGroup :tabs="fullExampleTabs" />

      <EdNote type="tip">
        <p>
          Store <code>codeVerifier</code> in your session &mdash; you'll need it at the
          <a href="/tech/tpp-standards/security/tokens/open-api/token">/token</a> endpoint to exchange the
          authorization code for access tokens.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="encrypting-pii"
      num="06"
      color="var(--at-gold)"
      eyebrow="Encrypting Payment PII"
      title="The pii field inside payment consents is itself a JWE"
      tone="surface"
    >
      <EdProse>
        For payment consents, the consent's PII payload (creditor and debtor names, account numbers, and
        related personal data) must be encrypted with the LFI's public encryption key and carried as a JWE
        in the consent's <code>pii</code> field &mdash; nested inside <code>authorization_details</code>
        within this Request JWT. The Request JWT itself is signed (JWS) but is <strong>not</strong> wrapped
        in a JWE; only the <code>pii</code> field is.
      </EdProse>
      <EdProse>
        This keeps the PII end-to-end encrypted: the API Hub routes the consent without being able to read
        the personal data, and only the LFI &mdash; holder of the private key &mdash; can decrypt and validate
        it. See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for how
        to produce the JWE, and <a href="/knowledge-base/articles/pii-encryption">Payment PII Encryption</a>
        for the rationale and validation responsibilities.
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
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-doc__hero-image {
  max-width: min(100%, 56rem);
  margin: 1.75rem 0 0;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
