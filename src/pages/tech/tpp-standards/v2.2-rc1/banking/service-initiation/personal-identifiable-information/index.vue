<route lang="yaml">
meta:
  title: Personal Identifiable Information (PII)
  isIndex: true
</route>

<script setup lang="ts">
const encryptPiiTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importJWK, CompactEncrypt } from 'jose'
import { v4 as uuidv4 } from 'uuid'

async function encryptPII(
  piiPayload: Record<string, unknown>,
  signingKey: KeyLike,
  signingKeyId: string,
  signingAlg: string,
  clientId: string,
  audience: string,
  jwksUri: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // 1. Sign the PII payload
  const jws = await new SignJWT(piiPayload)
    .setProtectedHeader({ alg: signingAlg, kid: signingKeyId })
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .setJti(uuidv4())
    .setIssuer(clientId)
    .setSubject(clientId)
    .setAudience(audience)
    .sign(signingKey)

  // 2. Fetch the LFI's JWKS and find the encryption key
  const response = await fetch(jwksUri)
  const { keys } = await response.json()
  const encKeyJwk = keys.find((k: any) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Encrypt the signed JWS into a JWE
  const publicKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  const jwe = await new CompactEncrypt(new TextEncoder().encode(jws))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(publicKey)

  return jwe // → place this string in PersonalIdentifiableInformation
}`,
  },
  {
    label: 'Python (python-jose)',
    lang: 'python',
    code: `from jose import jws, jwe
import requests
import json
import uuid
import time

def encrypt_pii(
    pii_payload: dict,
    signing_key: str,
    signing_key_id: str,
    signing_alg: str,
    client_id: str,
    audience: str,
    jwks_uri: str,
) -> str:
    now = int(time.time())

    # 1. Sign the PII payload
    claims = {
        **pii_payload,
        "iat": now,
        "exp": now + 300,
        "jti": str(uuid.uuid4()),
        "iss": client_id,
        "sub": client_id,
        "aud": audience,
    }
    signed_jwt = jws.sign(
        json.dumps(claims).encode(),
        signing_key,
        algorithm=signing_alg,
        headers={"kid": signing_key_id},
    )

    # 2. Fetch the LFI's JWKS and find the encryption key
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt the signed JWS into a JWE
    return jwe.encrypt(
        signed_jwt.encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()  # → place this string in PersonalIdentifiableInformation`,
  },
] as const

const parPayloadSample = `{
  "Initiation": {
    "DebtorAccount": { ... },       // optional — see Debtor Account
    "Creditor": [                   // array of creditor entries — see Creditor
      {
        "CreditorAgent": { ... },
        "Creditor": { "Name": "..." },
        "CreditorAccount": { ... },
        "ConfirmationOfPayeeResponse": "..."
      }
      // ... up to 10 entries; omit array entirely for open beneficiary
    ]
  },
  "Risk": { ... }                   // required — see Risk
}`

const paymentsPayloadSample = `{
  "Initiation": {
    "CreditorAgent": { ... },               // flat on Initiation — not inside an array
    "Creditor": { "Name": "..." },
    "CreditorAccount": { ... },
    "ConfirmationOfPayeeResponse": "..."
  },
  "Risk": { ... }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation &middot; PII
        </div>
        <h1 class="ed-doc__title">
          Personal Identifiable Information (PII)
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every payment instruction carries sensitive data about who is paying and who is receiving the funds.
          This data &mdash; the creditor account details, optional debtor account, and risk indicators &mdash;
          is collectively referred to as <strong>Personal Identifiable Information (PII)</strong>.
        </p>
        <p class="ed-doc__lede">
          PII is encrypted and embedded at <strong>two points</strong> in the payment lifecycle:
        </p>

        <EdRefTable>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Endpoint</th>
                <th>PII form</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consent staging</td>
                <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span></td>
                <td>Embedded in <code>consent.PersonalIdentifiableInformation</code></td>
              </tr>
              <tr>
                <td>Payment creation</td>
                <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></td>
                <td>Embedded in <code>payment.PersonalIdentifiableInformation</code></td>
              </tr>
            </tbody>
          </table>
        </EdRefTable>

        <p class="ed-doc__lede">
          The <code>Risk</code> structure is the same at both stages.
          <code>DebtorAccount</code> is <strong>only present at
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span></strong>
          &mdash; by the time
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
          is called, the debtor account has already been fixed through the consent authorisation flow. The
          creditor data also differs between stages &mdash; both in structure and cardinality. See
          <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a> for the full breakdown.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="why-encrypted"
      num="01"
      color="var(--at-teal)"
      eyebrow="Why PII is encrypted"
      title="End-to-end encryption between TPP and LFI"
      tone="cream"
    >
      <EdProse>
        Payment consents are stored centrally at <strong>Nebras</strong>, the UAE Open Finance Hub. Because
        Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the
        TPP &mdash; ensuring that Nebras, and any other party in transit, cannot read the sensitive payment
        details.
      </EdProse>
      <EdProse>
        The encryption uses the destination LFI's public key (see
        <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for full
        cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through
        without inspection &mdash; all PII validation is performed by the LFI after the consent is authorised.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="encrypt-steps"
      num="02"
      color="var(--at-gold)"
      eyebrow="Steps to encrypt PII"
      title="Sign, then encrypt — Nested JWT (JWS inside JWE)"
      tone="surface"
    >
      <EdProse>
        The <code>PersonalIdentifiableInformation</code> field MUST be sent as a compact JWE &mdash; a
        signed-then-encrypted token (Nested JWT). The process is:
      </EdProse>

      <EdBullets>
        <li><strong>Build the PII JSON</strong> &mdash; construct the PII object for the stage you are at (<span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> or <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>). See <a href="#payload-structure">The PII payload structure</a> below.</li>
        <li><strong>Sign</strong> &mdash; sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims (<code>iat</code>, <code>exp</code>, <code>jti</code>, <code>iss</code>, <code>sub</code>, <code>aud</code>).</li>
        <li><strong>Fetch the LFI's encryption key</strong> &mdash; retrieve the LFI's JWKS and select the key where <code>"use": "enc"</code>.</li>
        <li><strong>Encrypt</strong> &mdash; encrypt the signed JWS into a compact JWE using <code>RSA-OAEP-256</code> / <code>A256GCM</code>.</li>
        <li><strong>Embed</strong> &mdash; place the resulting JWE string in the <code>PersonalIdentifiableInformation</code> field of your request.</li>
      </EdBullets>

      <h3>Example</h3>
      <EdCodeGroup :tabs="encryptPiiTabs" />

      <EdProse>
        For the full breakdown of JWKS discovery, key selection, and JWE structure, see
        <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a>.
      </EdProse>

      <EdNote type="tip" title="Testing on the sandbox">
        <p>
          The sandbox provides an <strong>O3 Utility endpoint</strong> that accepts your private key and JWKS
          URL and returns a ready-made encrypted PII token &mdash; useful for validating your payload structure
          before writing your own encryption code. See
          <a href="/tech/tpp-standards/security/fapi/o3-utils#example-1">O3 Sandbox Utilities</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="object-structure"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Structure of the PII object"
      title="oneOf — three variants, one form sent in requests"
      tone="cream"
    >
      <EdProse>
        The <code>PersonalIdentifiableInformation</code> field is defined as a <code>oneOf</code>:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Variant</th>
              <th>Form</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Domestic Payment PII Schema Object</strong></td>
              <td>object</td>
              <td>Unencrypted reference form for domestic payments</td>
            </tr>
            <tr>
              <td><strong>International Payment PII Schema Object</strong></td>
              <td>object</td>
              <td>Unencrypted reference form for international payments</td>
            </tr>
            <tr>
              <td><strong>Encrypted PII Object</strong> (<code>AEJWEPaymentPII</code>)</td>
              <td>string (compact JWE)</td>
              <td><strong>The form that MUST be sent</strong> at both <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> and <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The two object variants document the structure implementers MUST follow when constructing the PII
        payload before encryption. The encrypted form &mdash; <code>AEJWEPaymentPII</code> &mdash; is a compact
        JWE string wrapping a signed JWS containing the serialised PII JSON.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payload-structure"
      num="04"
      color="var(--at-navy)"
      eyebrow="The PII payload structure"
      title="Different shape at consent staging vs. payment creation"
      tone="surface"
    >
      <EdProse>
        The structure of the unencrypted PII differs between the two stages.
      </EdProse>

      <h3>At <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> (consent staging)</h3>
      <EdCode :code="parPayloadSample" lang="json" filename="PII payload — POST /par" />

      <h3>At <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> (payment creation)</h3>
      <EdCode :code="paymentsPayloadSample" lang="json" filename="PII payload — POST /payments" />

      <EdProse>
        The key difference: at
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>
        the creditor data is inside an <code>Initiation.Creditor[]</code> array (allowing 1&ndash;10 entries, or
        omitted for open beneficiary). At
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        the same fields sit directly on <code>Initiation</code> as a single creditor.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>POST /par</th>
              <th>POST /payments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Initiation.DebtorAccount</code></td>
              <td>Optional object</td>
              <td><strong>Not present</strong> &mdash; debtor account is fixed by consent</td>
            </tr>
            <tr>
              <td><code>Initiation.Creditor</code></td>
              <td><strong>Array</strong> of creditor entry objects (0&ndash;10)</td>
              <td><strong>Object</strong> &mdash; the party name/address (<code>{ Name, PostalAddress }</code>)</td>
            </tr>
            <tr>
              <td><code>Initiation.CreditorAccount</code></td>
              <td>Nested inside each <code>Creditor[]</code> entry</td>
              <td>Direct field on <code>Initiation</code></td>
            </tr>
            <tr>
              <td><code>Initiation.CreditorAgent</code></td>
              <td>Nested inside each <code>Creditor[]</code> entry</td>
              <td>Direct field on <code>Initiation</code></td>
            </tr>
            <tr>
              <td><code>Initiation.ConfirmationOfPayeeResponse</code></td>
              <td>Nested inside each <code>Creditor[]</code> entry</td>
              <td>Direct field on <code>Initiation</code></td>
            </tr>
            <tr>
              <td><code>Risk</code></td>
              <td>Required object</td>
              <td>Required object</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>See the sub-pages for full schema and rules:</EdProse>
      <EdBullets>
        <li><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account">Debtor Account</a> &mdash; optional at <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> only; not part of the <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> PII</li>
        <li><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a> &mdash; consent-time models (single/multiple/open), payment-time structure, and match requirements</li>
        <li><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk">Risk</a> &mdash; debtor and creditor risk indicators</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="decentralised-validation"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Decentralised validation"
      title="Each LFI validates PII independently after decryption"
      tone="cream"
    >
      <EdProse>
        Because PII is encrypted using the LFI's public key, <strong>Nebras cannot decrypt or validate
        it</strong>. The LFI is solely responsible for decrypting and validating the PII &mdash; at consent
        time and at payment time.
      </EdProse>
      <EdProse>
        Validation is therefore performed independently by each LFI rather than centrally. The standards place
        explicit validation requirements on every LFI &mdash; each LFI must validate the decrypted PII against
        the schema before accepting a consent or processing a payment.
      </EdProse>

      <EdNote type="warning" title="TPPs must understand LFI validation">
        <p>
          A consent that is accepted by one LFI may be rejected by another if the PII does not meet the
          required format. TPPs should ensure that the PII they construct is strictly valid according to the
          schema for the payment type being instructed.
        </p>
        <p>
          See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a> for the specific validation rules that LFIs apply to the
          <code>Creditor</code> array for domestic payments.
        </p>
      </EdNote>
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
