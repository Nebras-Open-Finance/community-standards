<route lang="yaml">
meta:
  title: Bank Data Sharing — Encrypted FinanceRates
</route>

<script setup lang="ts">
const permissionCheckNode = `import type { Request } from 'express'

const HUB_CONSENT_MANAGER_BASE = process.env.HUB_CONSENT_MANAGER_BASE!
// e.g. 'https://cm.altareq1.apihub.openfinance.ae'

// Option A — read from your local consent store.
// You populated it via /consent/event/{operation} during the consent-events
// flow at authorization time.
function readPermissionsLocal(consentId: string): ReadonlyArray<string> {
  const consent = consentStore.get(consentId)
  return consent.Permissions
}

// Option B — fetch the consent from the Hub's Consent Manager.
// Authenticate using your LFI's Ozone Connect JWT credentials.
async function readPermissionsFromHub(consentId: string): Promise<ReadonlyArray<string>> {
  const response = await fetch(
    \`\${HUB_CONSENT_MANAGER_BASE}/consents/\${consentId}\`,
    {
      headers: {
        Authorization: \`Bearer \${await getOzoneConnectJwt()}\`,
      },
    },
  )
  if (!response.ok) {
    throw new Error(\`Hub /consents/\${consentId} failed: \${response.status}\`)
  }
  const consent = await response.json()
  return consent.Permissions
}

// Pick whichever fits your architecture; both are first-class.
const readPermissions = readPermissionsLocal  // or readPermissionsFromHub

async function buildFinanceRates(
  req: Request,
  product: Product,
): Promise<AEProductFinanceRates | EncryptedFinanceRates | undefined> {
  const consentId = req.header('o3-consent-id')
  if (!consentId) {
    // Defensive — the Hub always sets this on Ozone Connect calls under a
    // consent. A missing header is a misconfiguration, not a customer issue.
    throw new Error('o3-consent-id header missing on Ozone Connect request')
  }

  const permissions = await readPermissions(consentId)

  // Gate the entire FinanceRates field on this single permission.
  if (!permissions.includes('ReadProductFinanceRates')) {
    // Omit the field entirely. Do not generate an OTP, do not send an SMS,
    // do not build a JWE — and do not return an empty object placeholder.
    return undefined
  }

  // Permission is present — choose between cleartext and the encrypted path
  // based on LFI policy for this product type.
  return shouldEncrypt(product)
    ? encryptedFinanceRatesFor(product)
    : product.financeRates
}
`

const permissionCheckPython = `import os, httpx

HUB_CONSENT_MANAGER_BASE = os.environ["HUB_CONSENT_MANAGER_BASE"]
# e.g. 'https://cm.altareq1.apihub.openfinance.ae'


# Option A — read from your local consent store.
# You populated it via /consent/event/{operation} during the consent-events
# flow at authorization time.
def read_permissions_local(consent_id: str) -> list[str]:
    consent = consent_store.get(consent_id)
    return consent["Permissions"]


# Option B — fetch the consent from the Hub's Consent Manager.
# Authenticate using your LFI's Ozone Connect JWT credentials.
def read_permissions_from_hub(consent_id: str) -> list[str]:
    response = httpx.get(
        f"{HUB_CONSENT_MANAGER_BASE}/consents/{consent_id}",
        headers={"Authorization": f"Bearer {get_ozone_connect_jwt()}"},
    )
    response.raise_for_status()
    return response.json()["Permissions"]


# Pick whichever fits your architecture; both are first-class.
read_permissions = read_permissions_local  # or read_permissions_from_hub


def build_finance_rates(request, product):
    consent_id = request.headers.get("o3-consent-id")
    if not consent_id:
        # Defensive — the Hub always sets this on Ozone Connect calls under a
        # consent. A missing header is a misconfiguration, not a customer issue.
        raise RuntimeError("o3-consent-id header missing on Ozone Connect request")

    permissions = read_permissions(consent_id)

    # Gate the entire FinanceRates field on this single permission.
    if "ReadProductFinanceRates" not in permissions:
        # Omit the field entirely. Do not generate an OTP, do not send an SMS,
        # do not build a JWE — and do not return an empty object placeholder.
        return None

    # Permission is present — choose between cleartext and the encrypted path
    # based on LFI policy for this product type.
    return (
        encrypted_finance_rates_for(product)
        if should_encrypt(product)
        else product.finance_rates
    )
`

const errorResponseExample = `HTTP/1.1 429 Too Many Requests
Retry-After: 60
x-fapi-interaction-id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
`

const otpNode = `import crypto from 'node:crypto'

// 6-digit numeric OTP drawn from a cryptographically secure RNG.
// Range is [0, 999999]; pad to a fixed 6-character string so leading
// zeros are preserved when the customer reads the SMS.
function generateOtp(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
}
`

const otpPython = `import secrets

# 6-digit numeric OTP drawn from a cryptographically secure RNG.
# Range is [0, 999999]; format to a fixed 6-character string so leading
# zeros are preserved when the customer reads the SMS.
def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"
`

const smsTemplate = `{LFI_BRAND}: You requested your {PRODUCT_NAME} finance rate via {TPP_TRADING_NAME}. Your code is {OTP}. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`

const smsExample = `ALTAREQ BANK: You requested your Platinum Credit Card finance rate via BudgetBuddy. Your code is 482915. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`

const jweNode = `import { CompactEncrypt } from 'jose'

const JWE_TTL_SECONDS = 30 * 60  // 30 minutes — normative

async function encryptFinanceRates(
  rates: AEProductFinanceRates,
  otp: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // Wrap the cleartext rates with iat / exp so the TPP can show
  // a helpful "this code has expired" message after the window closes.
  const payload = JSON.stringify({
    FinanceRates: rates,
    iat: now,
    exp: now + JWE_TTL_SECONDS,
  })

  return await new CompactEncrypt(new TextEncoder().encode(payload))
    .setProtectedHeader({
      alg: 'PBES2-HS512+A256KW',  // key wrapping
      enc: 'A256GCM',              // content encryption
      p2c: 600_000,                // PBKDF2 iterations (OWASP 2023+ minimum for SHA-512)
      kid: 'OneTimeCode',          // signals to the TPP that the password is the OTP
    })
    .encrypt(new TextEncoder().encode(otp))
}
`

const jwePython = `import base64, json, time
from jwcrypto import jwe as jwecrypto, jwk

JWE_TTL_SECONDS = 30 * 60  # 30 minutes — normative

def encrypt_finance_rates(rates: dict, otp: str) -> str:
    now = int(time.time())

    # Wrap the cleartext rates with iat / exp so the TPP can show
    # a helpful "this code has expired" message after the window closes.
    payload = json.dumps({
        "FinanceRates": rates,
        "iat":          now,
        "exp":          now + JWE_TTL_SECONDS,
    }).encode()

    # PBES2 uses the password bytes directly as input key material.
    key = jwk.JWK(
        kty="oct",
        k=base64.urlsafe_b64encode(otp.encode()).rstrip(b"=").decode(),
    )

    token = jwecrypto.JWE(
        plaintext=payload,
        protected={
            "alg": "PBES2-HS512+A256KW",
            "enc": "A256GCM",
            "p2c": 600_000,
            "kid": "OneTimeCode",
        },
    )
    token.add_recipient(key)
    return token.serialize(compact=True)
`

const responseNode = `// Build the GET /accounts/{AccountId}/product response.
// Only the FinanceRates field is encrypted — every other field
// (Charges, DepositRates, Tenor, ProductName, ...) stays cleartext.
function buildProductResponse(
  account: Account,
  product: Product,
  encryptedFinanceRatesJwe: string | undefined,
) {
  return {
    Data: {
      Product: [
        {
          AccountId:     account.id,
          ProductId:     product.id,
          ProductType:   product.type,
          ProductName:   product.name,
          Charges:       product.charges,
          DepositRates:  product.depositRates,
          Tenor:         product.tenor,
          // FinanceRates is either the structured object (cleartext)
          // or the compact JWE string (encrypted). Never both, never null.
          FinanceRates:  encryptedFinanceRatesJwe ?? product.financeRates,
        },
      ],
    },
    Links: { Self: selfUrl(account, product) },
    Meta:  { TotalPages: 1 },
  }
}
`

const responsePython = `# Build the GET /accounts/{AccountId}/product response.
# Only the FinanceRates field is encrypted — every other field
# (Charges, DepositRates, Tenor, ProductName, ...) stays cleartext.
def build_product_response(account, product, encrypted_finance_rates_jwe):
    return {
        "Data": {
            "Product": [
                {
                    "AccountId":     account.id,
                    "ProductId":     product.id,
                    "ProductType":   product.type,
                    "ProductName":   product.name,
                    "Charges":       product.charges,
                    "DepositRates":  product.deposit_rates,
                    "Tenor":         product.tenor,
                    # FinanceRates is either the structured object (cleartext)
                    # or the compact JWE string (encrypted). Never both, never null.
                    "FinanceRates":  encrypted_finance_rates_jwe or product.finance_rates,
                },
            ],
        },
        "Links": { "Self": self_url(account, product) },
        "Meta":  { "TotalPages": 1 },
    }
`

const exampleProtectedHeader = `{
  "alg": "PBES2-HS512+A256KW",
  "enc": "A256GCM",
  "p2c": 600000,
  "p2s": "4kAX-NQVF8...",
  "kid": "OneTimeCode"
}
`

const permissionCheckTabs = [{ label: 'Node.js', lang: 'typescript', code: permissionCheckNode }, { label: 'Python', lang: 'python', code: permissionCheckPython }] as const
const otpTabs             = [{ label: 'Node.js', lang: 'typescript', code: otpNode },             { label: 'Python', lang: 'python', code: otpPython }] as const
const jweTabs             = [{ label: 'Node.js (jose)', lang: 'typescript', code: jweNode },      { label: 'Python (jwcrypto)', lang: 'python', code: jwePython }] as const
const responseTabs        = [{ label: 'Node.js', lang: 'typescript', code: responseNode },        { label: 'Python', lang: 'python', code: responsePython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Banking &middot; Bank Data Sharing &middot; API Guide
        </div>
        <h1 class="ed-doc__title">
          Encrypted FinanceRates
          <span class="ed-doc__read">7 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a TPP holds the <code>ReadProductFinanceRates</code> permission and calls
          <code>GET /accounts/{AccountId}/product</code> for a credit card, finance, or mortgage
          product, the LFI MAY return the <code>FinanceRates</code> field as a JWE rather than a
          cleartext object. This guide covers how to generate the one-time code, deliver it to the
          customer, build the JWE, and rate-limit the endpoint so the customer's encrypted rates
          remain protected end-to-end.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="when-to-encrypt"
      num="01"
      color="var(--at-teal)"
      eyebrow="When to encrypt"
      title="Encryption is an LFI choice, scoped to one field"
      tone="cream"
    >
      <EdProse>
        The <code>FinanceRates</code> field on
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products">
        <code>GET /accounts/{AccountId}/product</code></a> is defined as <code>anyOf</code> a
        structured <code>AEProductFinanceRates</code> object or an <code>AEJwe</code> compact
        string. LFIs MAY decide, per product, whether to return the rate in cleartext or as a JWE.
        Encryption is typically applied to credit cards, finance accounts, and mortgages where the
        finance rate is commercially sensitive; deposit account interest rates are returned in
        cleartext.
      </EdProse>

      <EdBullets>
        <li>
          The LFI MUST NOT encrypt any field other than <code>FinanceRates</code> on this endpoint.
          <code>Charges</code>, <code>DepositRates</code>, <code>ProductName</code>,
          <code>Tenor</code>, and every other property stay cleartext on both the encrypted and
          unencrypted shapes.
        </li>
        <li>
          The LFI MUST NOT encrypt any data from any other Open Finance endpoint &mdash; this
          mechanism exists solely for <code>FinanceRates</code> on
          <code>GET /accounts/{AccountId}/product</code>.
        </li>
        <li>
          A single LFI MAY choose to encrypt for some product types and not others. The TPP detects
          the shape at runtime by checking whether <code>FinanceRates</code> is an object or a
          string &mdash; the LFI does not need to advertise its choice ahead of time.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="flow-overview"
      num="02"
      color="var(--at-gold)"
      eyebrow="Flow overview"
      title="Three things happen on every encrypted call"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>Generate a one-time code (OTP)</strong> &mdash; a fresh, cryptographically random
          numeric code, scoped to this single call.
        </li>
        <li>
          <strong>Deliver the OTP to the customer</strong> &mdash; via SMS to the customer's
          registered mobile number, with email fallback if SMS delivery is unavailable.
        </li>
        <li>
          <strong>Encrypt the cleartext <code>FinanceRates</code> as a JWE with the OTP as the
          password</strong> and substitute the JWE string for the cleartext object in the response
          body. The cleartext rates never leave the LFI.
        </li>
      </EdBullets>

      <EdProse>
        Because the OTP is the decryption key, the customer reading the SMS on their phone and
        typing it into the TPP application is exactly what makes the rate visible. The TPP server
        never sees the OTP, and the LFI never sees the TPP's decryption code. The customer is the
        only party that holds both the JWE (via the TPP) and the key (via the SMS).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-permission"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — Check the consent permission first"
      title="No ReadProductFinanceRates → omit the field entirely"
      tone="cream"
    >
      <EdProse>
        Before doing anything else &mdash; before deciding to encrypt, before generating an OTP,
        before sending an SMS, before building a JWE &mdash; the LFI MUST check that the consent
        underlying this request includes <code>ReadProductFinanceRates</code>. If the permission
        is absent, the LFI MUST omit the <code>FinanceRates</code> field from the response
        entirely. The rest of the product payload (<code>Charges</code>, <code>DepositRates</code>,
        <code>ProductName</code>, etc.) is returned as usual.
      </EdProse>

      <h3 class="ed-doc__subhead">How to read the permission</h3>
      <EdProse>
        The API Hub sets the <code>o3-consent-id</code> header on every Ozone Connect call made
        under a consent. That ID identifies the consent the customer authorised; the LFI's job is
        to retrieve the consent, read the <code>Permissions</code> array off it, and check that
        <code>ReadProductFinanceRates</code> is present. The LFI does NOT re-validate the access
        token &mdash; that is the Hub's responsibility.
      </EdProse>

      <EdProse>
        There are two valid ways to obtain the consent record. Pick whichever fits your
        architecture; both are first-class:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Option</th><th>How it works</th><th>When to choose it</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>A &mdash; Local consent store</strong></td>
              <td>The LFI persists consent records locally as the Hub calls
                  <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide"><code>/consent/event/{operation}</code></a>
                  during the consent-events flow at authorization. At request time the LFI looks up the consent by ID
                  in its own store.</td>
              <td>You already maintain a consent table for revocation handling, account-list patching, or PSU
                  attribution. Lowest per-request latency.</td>
            </tr>
            <tr>
              <td><strong>B &mdash; Fetch from the Hub</strong></td>
              <td>The LFI calls
                  <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId">
                  <code>GET /consents/{consentId}</code></a> on the Hub's Consent Manager
                  (<code>https://cm.{LFICODE}.apihub.openfinance.ae</code>) to fetch the consent on demand. The
                  response includes the <code>Permissions</code> array.</td>
              <td>You do not maintain a local consent store, or you do but treat the Hub as the source of truth.
                  Adds one Hub round-trip per request unless you cache the response.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Whichever option you use, the check itself is the same:
        <code>permissions.includes('ReadProductFinanceRates')</code>. If false &mdash; omit
        <code>FinanceRates</code>. If true &mdash; proceed to the cleartext or encrypted path
        based on LFI policy for the product type.
      </EdProse>

      <EdNote type="tip" title="Caching the Hub response (Option B)">
        <p>
          The Hub's <code>GET /consents/{consentId}</code> response is safe to cache for the
          lifetime of the consent &mdash; the <code>Permissions</code> array is set at
          authorization and never mutates. Cache invalidation comes from the consent-events
          flow: when the Hub notifies your <code>/consent/event/{operation}</code> endpoint that
          a consent has been revoked or modified, drop the cached entry. A short positive TTL
          (e.g. 5 minutes) is a reasonable defence against missed events.
        </p>
      </EdNote>

      <EdBullets>
        <li>
          The check applies equally to the cleartext and encrypted paths. If
          <code>ReadProductFinanceRates</code> is missing, the LFI MUST NOT return cleartext rates
          and MUST NOT trigger the OTP/SMS/JWE flow.
        </li>
        <li>
          When the field is omitted, do not substitute <code>null</code>, an empty object, or a
          placeholder JWE. The <code>FinanceRates</code> key simply does not appear on the
          <code>Product</code> object.
        </li>
        <li>
          The same <code>o3-consent-id</code> header is used to attribute the call for logging,
          rate-limit accounting (<a href="#rate-limits">Step 6</a>), and audit. Read it once and
          carry it through the request handler.
        </li>
      </EdBullets>

      <EdCodeGroup :tabs="permissionCheckTabs" />

      <EdNote type="warning" title="SMS is expensive and customer-visible">
        <p>
          Sending an OTP SMS for a request that should not have received <code>FinanceRates</code>
          in the first place is both wasteful and confusing for the customer (they receive a code
          for a value the TPP cannot legitimately show). Putting the permission check first
          eliminates this class of bug entirely.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-otp"
      num="04"
      color="var(--at-teal-deep)"
      eyebrow="Step 2 — Generate the OTP"
      title="A fresh 6-digit code per request"
      tone="surface"
    >
      <EdProse>
        Each call to <code>GET /accounts/{AccountId}/product</code> that returns encrypted
        <code>FinanceRates</code> MUST mint a new OTP. The OTP is bound to a single JWE for the
        full 30-minute display window &mdash; the TPP MAY re-decrypt the same JWE multiple times
        with the same OTP within that window, but a new call to the endpoint MUST produce a fresh
        OTP and a fresh JWE.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Property</th><th>Requirement</th></tr>
          </thead>
          <tbody>
            <tr><td>Format</td><td>6 digits, numeric. Leading zeros MUST be preserved in transit.</td></tr>
            <tr><td>Source</td><td>Cryptographically secure RNG (e.g. <code>crypto.randomInt</code> in Node.js, <code>secrets.randbelow</code> in Python). MUST NOT use <code>Math.random</code>, the default <code>random</code> module, or any non-CSPRNG source.</td></tr>
            <tr><td>Reusability</td><td>The OTP is reusable for decryption attempts within the 30-minute JWE window. A new call to <code>GET /accounts/{AccountId}/product</code> MUST issue a fresh OTP, even if the previous JWE has not yet expired.</td></tr>
            <tr><td>Storage</td><td>The OTP MUST NOT be persisted in cleartext at the LFI after the JWE has been built. Hold it only long enough to use it as the PBES2 password and send the SMS, then discard.</td></tr>
            <tr><td>Logging</td><td>The OTP MUST NOT appear in application logs, audit trails, request traces, monitoring tools, or any other system the LFI operates.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="otpTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3-sms"
      num="05"
      color="var(--at-navy)"
      eyebrow="Step 3 — Deliver the OTP"
      title="SMS preferred, email fallback"
      tone="cream"
    >
      <EdProse>
        The LFI MUST attempt to deliver the OTP via SMS to the customer's registered mobile number.
        If the customer has no registered mobile number, or the SMS gateway reports a delivery
        failure within a reasonable window, the LFI MAY fall back to the customer's registered
        email. The LFI MUST NOT deliver the OTP through the TPP &mdash; the entire point is that
        the TPP never holds the decryption key.
      </EdProse>

      <h3 class="ed-doc__subhead">Message content requirements</h3>
      <EdBullets>
        <li>The OTP itself.</li>
        <li>The LFI's brand name as a recognisable sender or in the first line of the body, so the customer can identify who sent the message.</li>
        <li>The TPP's <code>TradingName</code> (from the consent), so the customer knows which app to enter the code into. This is the part of the message the customer uses to bridge the LFI-sent SMS with the TPP-presented form.</li>
        <li>The product name or a short product description, so the customer understands which rate they are about to view.</li>
        <li>An expiry indication &mdash; "Valid 30 min" is the canonical wording.</li>
        <li>An explicit anti-fraud line for the customer who did not start this journey &mdash; "<em>If you didn't request this, ignore this message and never share this rate.</em>" The wording matters: it tells an unsuspecting customer to disregard the message, and warns every customer never to read the code aloud to anyone &mdash; while leaving them free to type it into the TPP form themselves.</li>
      </EdBullets>

      <EdNote type="info" title="What the LFI MUST NOT include">
        <p>
          The SMS MUST NOT include the cleartext finance rate, any link the customer is expected to
          click (the customer's journey continues in the TPP application, not via an LFI link), or
          any other product data beyond the brand, code, TPP name, product description, and
          expiry.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">SMS template</h3>
      <EdProse>
        A recommended template the LFI substitutes from the request context &mdash; the
        <code>TPP_TRADING_NAME</code> comes from the consent's TPP organisation registration, the
        <code>PRODUCT_NAME</code> from the product the call is for, and <code>OTP</code>
        from <a href="#step-2-otp">Step 2</a>:
      </EdProse>
      <EdCode :code="smsTemplate" lang="text" filename="SMS template" />

      <h3 class="ed-doc__subhead">Example SMS as the customer receives it</h3>
      <EdCode :code="smsExample" lang="text" filename="example — ALTAREQ BANK to BudgetBuddy customer" />

      <EdProse>
        The wording is intentionally explicit about <em>where</em> the code is to be entered &mdash;
        the SMS arrives from the bank but the form sits inside the TPP application, and the
        customer needs to bridge those two contexts. Naming the TPP makes that connection.
      </EdProse>

      <EdNote type="tip" title="Localisation">
        <p>
          The example above is English. LFIs SHOULD localise the SMS to the customer's registered
          language preference; in practice this usually means English alongside Arabic. The
          content requirements above apply to every localised variant.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-build-jwe"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 4 — Build the JWE"
      title="PBES2-HS512+A256KW with the OTP as the password"
      tone="surface"
    >
      <EdProse>
        The cleartext <code>FinanceRates</code> object is encrypted as a JOSE compact JWE using
        <strong>PBES2-HS512+A256KW</strong> for key wrapping and <strong>A256GCM</strong> for
        content encryption. PBES2 takes the OTP as a password and derives the content-encryption
        key inside the JWE library; the LFI never needs to handle key material directly.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>JWE parameter</th><th>Value</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td><code>alg</code></td><td><code>PBES2-HS512+A256KW</code></td><td>Key wrapping. PBES2 is the JOSE-native way to use a password (the OTP) as the input.</td></tr>
            <tr><td><code>enc</code></td><td><code>A256GCM</code></td><td>AES-256-GCM content encryption with a 96-bit IV. Authenticated encryption &mdash; tampering is detected on decrypt.</td></tr>
            <tr><td><code>p2c</code></td><td><code>600000</code> (minimum)</td><td>PBKDF2 iteration count. OWASP recommends at least 600,000 iterations for HMAC-SHA-512 as of 2023. Higher is acceptable.</td></tr>
            <tr><td><code>p2s</code></td><td>Generated by the JWE library</td><td>PBKDF2 salt. The library generates a fresh 16-byte salt per call and emits it in the protected header.</td></tr>
            <tr><td><code>kid</code></td><td><code>OneTimeCode</code></td><td>Signals to the TPP that the PBES2 password is the OTP entered by the customer, not a static key.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Resulting protected header (decoded)</h3>
      <EdCode :code="exampleProtectedHeader" lang="json" filename="example protected header" />

      <h3 class="ed-doc__subhead">JWT-style expiry inside the JWE payload</h3>
      <EdProse>
        The JWE's PBES2 envelope does not itself express an expiry &mdash; we embed
        <code>iat</code> and <code>exp</code> inside the JSON plaintext alongside the
        <code>FinanceRates</code> object so the TPP can render a "this code has expired" message
        cleanly after the 30-minute window closes. The LFI MUST set <code>exp = iat + 1800</code>
        seconds exactly; longer windows are not permitted.
      </EdProse>

      <EdCodeGroup :tabs="jweTabs" />

      <EdNote type="warning" title="Never log the cleartext FinanceRates or the OTP">
        <p>
          The cleartext rate is the very thing this scheme exists to protect from accidental
          disclosure. Encryption MUST happen in process memory; the cleartext rate, the OTP, and
          the derived key material MUST NOT be written to logs, traces, dumps, or any storage
          tier. Treat them with the same hygiene as a customer's password.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-5-substitute"
      num="07"
      color="var(--at-gold)"
      eyebrow="Step 5 — Substitute FinanceRates in the response"
      title="Swap the structured object for the JWE string"
      tone="cream"
    >
      <EdProse>
        The OpenAPI schema makes the response trivial to assemble: <code>FinanceRates</code> is
        either an <code>AEProductFinanceRates</code> object or an <code>AEJwe</code> string.
        Replace the cleartext object with the compact JWE produced in
        <a href="#step-4-build-jwe">Step 4</a> and leave every other field untouched.
      </EdProse>

      <EdCodeGroup :tabs="responseTabs" />

      <EdProse>
        See the corresponding
        <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates">TPP API
        guide</a> for how the TPP detects the JWE shape, forwards it to the user's device, and
        decrypts using the OTP the customer types in.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rate-limits"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 6 — Rate limits and the 429 response"
      title="Reject the whole request when the limits are exceeded"
      tone="surface"
    >
      <EdProse>
        Every call to <code>GET /accounts/{AccountId}/product</code> that produces an encrypted
        <code>FinanceRates</code> mints a fresh OTP and triggers a customer-facing SMS. The LFI
        MUST rate-limit these calls per consent per account so an abusive or buggy TPP cannot spam
        the customer's mobile.
      </EdProse>

      <h3 class="ed-doc__subhead">The limits</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Rule</th><th>Limit</th><th>Behaviour when exceeded</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Minimum interval between fresh OTPs</td>
              <td><strong>60 seconds</strong> per (consent, account) pair</td>
              <td>Reject the whole request with <code>429 Too Many Requests</code>. The TPP surfaces a "please wait" message and lets the customer retry shortly.</td>
            </tr>
            <tr>
              <td>Rolling 24-hour cap</td>
              <td><strong>12 fresh OTPs</strong> per (consent, account) pair</td>
              <td>Reject the whole request with <code>429 Too Many Requests</code> until the rolling window admits a new call. Customer is told to try again later.</td>
            </tr>
            <tr>
              <td>Re-decryption of an existing JWE</td>
              <td>Not limited &mdash; decryption happens in the TPP browser and does not contact the LFI</td>
              <td>n/a</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        These limits are LFI-enforced and apply only to the <code>FinanceRates</code>-encryption
        path. Cleartext calls to <code>GET /accounts/{AccountId}/product</code> (for product types
        where the LFI does not encrypt) follow the standard rate limits documented elsewhere.
      </EdProse>

      <EdProse>
        The 60-second minimum interval is the limit that matters most in practice: an SMS OTP can
        take a little while to reach the customer, so the interval simply stops a fresh code being
        minted before the previous one has had a chance to arrive. The rolling 24-hour cap leaves
        headroom for a TPP with a genuine reason to read a customer's finance rates several times
        through the day, and is kept under review as real-world usage patterns emerge. LFIs SHOULD
        treat it as a backstop against runaway SMS volume rather than a constraint legitimate
        traffic is expected to approach.
      </EdProse>

      <EdNote type="tip" title="Counter key">
        <p>
          The counter is per (consent, account) pair, not per TPP and not per customer. A customer
          who holds multiple consents from different TPPs sees the limits applied independently
          per consent &mdash; one TPP's behaviour does not block another TPP's call. Within a
          single consent, a TPP that legitimately needs to read finance rates for several accounts
          gets a separate 24-hour budget per account.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">The 429 response</h3>
      <EdProse>
        When either limit would be breached, the LFI MUST <strong>reject the entire request</strong>
        rather than returning a partial response with <code>FinanceRates</code> omitted. The
        customer is on the TPP's screen expecting a complete product view; the 429 is the signal
        the TPP needs to render a clear, actionable error rather than a silently degraded payload.
      </EdProse>

      <EdProse>
        The response uses the same <code>429Error</code> envelope already defined for
        <code>GET /accounts/{AccountId}/product</code> in the
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products">
        OpenAPI specification</a> &mdash; HTTP <code>429</code>, no response body, two headers:
      </EdProse>

      <EdCode :code="errorResponseExample" lang="http" filename="429 response &mdash; LFI to API Hub" />

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Required</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Retry-After</code></td>
              <td>MUST</td>
              <td>Integer seconds until the next request would succeed. For the minimum-interval breach this is the seconds remaining in the 60-second cooldown; for the daily cap this is the seconds until the rolling window admits a new call.</td>
            </tr>
            <tr>
              <td><code>x-fapi-interaction-id</code></td>
              <td>MUST</td>
              <td>The same UUID the TPP sent on the request, echoed back so the TPP can correlate the rejection with its outbound call.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="The Hub passes 429 through unchanged">
        <p>
          The API Hub forwards the LFI's <code>429</code> response (status, <code>Retry-After</code>,
          and <code>x-fapi-interaction-id</code>) to the TPP without modification. There is no Hub-side
          translation step &mdash; the TPP receives the same response the LFI emitted. See the
          corresponding <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates#rate-limits">TPP API guide</a>
          for the customer-facing handling on the other end of the pipe.
        </p>
      </EdNote>

      <EdNote type="warning" title="Do not silently degrade">
        <p>
          When the limit is breached, the LFI MUST NOT return <code>200</code> with the
          <code>FinanceRates</code> field omitted, an empty object, or a stale JWE. The 429 is
          the contract that lets the TPP distinguish "you don't have this permission" from
          "you've called too often" &mdash; collapsing the two would mislead the TPP about why
          the customer can't see the rate.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="operational"
      num="08"
      color="var(--at-navy)"
      eyebrow="Operational requirements"
      title="Logging, monitoring, and incident response"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>No cleartext in logs</strong> &mdash; OTP, derived key material, and cleartext
          <code>FinanceRates</code> MUST be excluded from application logs, request traces, audit
          trails, monitoring dashboards, and crash dumps.
        </li>
        <li>
          <strong>Audit the metadata, not the secret</strong> &mdash; the LFI SHOULD log the fact
          that an encrypted-rate response was issued (timestamp, consent ID, account ID, product
          ID, SMS delivery channel) so abuse and operational issues are observable. The OTP and
          rate themselves MUST NOT be part of those records.
        </li>
        <li>
          <strong>SMS delivery monitoring</strong> &mdash; the LFI MUST monitor SMS delivery
          success rates separately from other customer-facing SMS traffic. A sustained dip in
          delivery to encrypted-rate customers degrades the entire product silently from the
          customer's point of view.
        </li>
        <li>
          <strong>Treat the OTP like a password</strong> &mdash; on incident response, OTP
          exposure is reportable. There is no recovery path other than waiting for the 30-minute
          JWE window to close, so even a single leaked OTP costs at most one customer's encrypted
          rate.
        </li>
      </EdBullets>
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
