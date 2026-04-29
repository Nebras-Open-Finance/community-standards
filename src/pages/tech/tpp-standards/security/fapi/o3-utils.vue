<route lang="yaml">
meta:
  title: O3 Sandbox Utilities
</route>

<script setup lang="ts">
const stripPemCmd = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`

// Postman variable references are written as `{{name}}`. Vue would
// interpret bare double-braces in a template as mustache interpolation, so
// these are bound to constants and rendered via `{{ pmVar... }}`.
const pmVarEncryptedPii = '{' + '{encryptedPII}' + '}'
const pmVarGuid = '{' + '{$guid}' + '}'

// Example 1 — Prepare Encrypted PII
const ex1PreRequest = `const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`

const ex1TestScript = `pm.environment.set('encryptedPII', responseBody)`

const ex1Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}",
        "Initiation": {
            // Optional — omit to allow the user to select their account at the LFI
            // "DebtorAccount": {
            //     "SchemeName": "IBAN",
            //     "Identification": "AE070331234567890123456",
            //     "Name": { "en": "Mohammed Al Rashidi" }
            // },
            "Creditor": [
                {
                    "CreditorAgent": {
                        "SchemeName": "BICFI",
                        "Identification": "10000109010101",
                        "Name": "Mario International",
                        "PostalAddress": [
                            { "AddressType": "Business", "Country": "AE" }
                        ]
                    },
                    "Creditor": {
                        "Name": "Mario International"
                    },
                    "CreditorAccount": {
                        "SchemeName": "AccountNumber",
                        "Identification": "10000109010101",
                        "Name": { "en": "Mario International" }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": {
                "UserName": { "en": "Mohammed Al Rashidi" }
            },
            "CreditorIndicators": {
                "AccountType": "Retail",
                "IsCreditorConfirmed": true,
                "IsCreditorPrePopulated": true,
                "TradingName": "Mario International"
            }
        }
    },
    "signingKeyPEM": "{{pem-local}}",
    "jwksUrl": "{{jwksUrl}}"
}`

// Example 2 — PAR client assertion
const ex2PreRequest = `pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`

const ex2TestScript = `pm.environment.set('private_key_jwt', responseBody)`

const ex2Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`

const ex2ParRequest = `POST /par
Content-Type: application/x-www-form-urlencoded

client_id={{_clientId}}
&request={{requestObject}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}`

// Example 3 — Token client assertion (same body as Example 2)
const ex3TokenRequest = `POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={{authorizationCode}}
&redirect_uri={{redirect_uri}}
&code_verifier={{code-verifier}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}`

// Example 4 — Signed Request Object for /par
const ex4PreRequest = `const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
pm.environment.set('today', new Date().toISOString().split('T')[0])`

const ex4TestScript = `pm.environment.set('requestObject', responseBody)

// Decode the payload to extract the consent ID
const parts = responseBody.split('.')
const payload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(parts[1])))
pm.environment.set('response_type', payload.response_type)
pm.environment.set('scope', payload.scope)
pm.environment.set('consentId', payload.authorization_details[0].consent.ConsentId)`

const ex4Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "scope": "payments openid",
        "redirect_uri": "https://docs.openfinance-hackathon.com/starter-kit/callback",
        "client_id": "{{_clientId}}",
        "nonce": "{{$guid}}",
        "state": "{{$guid}}",
        "nbf": "{{nbf}}",
        "response_type": "code",
        "code_challenge_method": "S256",
        "code_challenge": "{{code-challenge}}",
        "max_age": 3600,
        "authorization_details": [
            {
                "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
                "consent": {
                    "ConsentId": "{{$guid}}",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": "{{today}}T23:00:00.000Z",
                    "ControlParameters": {
                        "ConsentSchedule": {
                            "SinglePayment": {
                                "MaximumIndividualAmount": {
                                    "Amount": "500.00",
                                    "Currency": "AED"
                                }
                            }
                        }
                    },
                    "PersonalIdentifiableInformation": "{{encryptedPII}}",
                    "PaymentPurposeCode": "ACM",
                    "DebtorReference": "Invoice 2026-08",
                    "CreditorReference": "Invoice 2026-08"
                }
            }
        ]
    },
    "signingKeyPEM": "{{pem-local}}"
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security &middot; Sandbox &middot; O3 Utilities
        </div>
        <h1 class="ed-doc__title">
          O3 Sandbox Utilities
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Nebras Open Finance sandbox exposes a small set of <strong>O3 Utility endpoints</strong> to help
          you verify that your signing and encryption logic is correct before wiring everything together in
          your own application. You send a signing key (and, for encryption, a JWKS URL) in the request body,
          and the utility returns the signed or encrypted token directly &mdash; so you can validate output at
          any stage of the flow without having to build the full cryptographic pipeline first.
        </p>

        <EdNote type="danger" title="Sandbox only — never use in production">
          <p>
            These endpoints accept raw private key material in the request body. They exist
            <strong>exclusively for development and testing on the sandbox</strong>. They are <strong>not
            available in any production environment</strong>, and you should never send real private keys to
            any external service.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="Base URL and Postman environment variables"
      tone="cream"
    >
      <h3>Base URL</h3>
      <EdProse>
        All O3 Utility requests target the sandbox resource server:
      </EdProse>
      <EdCode code="https://rs1.altareq1.sandbox.apihub.openfinance.ae" lang="plaintext" />

      <h3>Required environment variables</h3>
      <EdProse>
        Each example below references Postman environment variables. Set these before running:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>kid-local</code></td>
              <td>The Key ID (<code>kid</code>) of your signing certificate, from the Trust Framework</td>
            </tr>
            <tr>
              <td><code>pem-local</code></td>
              <td>Your signing private key in PEM format (PKCS#8, stripped of newlines &mdash; see <a href="/tech/tpp-standards/security/fapi/message-signing#prerequisites">Message Signing</a>)</td>
            </tr>
            <tr>
              <td><code>_clientId</code></td>
              <td>Your application's <code>client_id</code>, from the Trust Framework</td>
            </tr>
            <tr>
              <td><code>jwksUrl</code></td>
              <td>The LFI's JWKS URI (required for encryption only) &mdash; e.g. <code>https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Stripping newlines from PEM keys">
        <p>Postman environment variables cannot contain literal newlines. Strip them with:</p>
        <EdCode :code="stripPemCmd" lang="bash" />
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="example-1"
      num="02"
      color="var(--at-gold)"
      eyebrow="Example 1"
      title="Prepare Encrypted PII"
      tone="surface"
    >
      <p class="o3-endpoint">
        <strong>Endpoint:</strong>
        <span class="endpoint">
          <span class="http-method http-method--get">GET</span><code>/o3/v1.0/message-encryption</code>
        </span>
      </p>

      <EdProse>
        Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The
        output is stored in <code>encryptedPII</code> and is used directly as the
        <code>PersonalIdentifiableInformation</code> field in a consent's <code>authorization_details</code>.
      </EdProse>
      <EdProse>
        This utility signs the PII payload with your private key and then encrypts it using the LFI's public
        encryption key (fetched from <code>jwksUrl</code>), producing a Nested JWT (JWS wrapped inside a JWE)
        &mdash; exactly as described in
        <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a>.
      </EdProse>

      <h4>Pre-request script</h4>
      <EdProse>Generates a PKCE code pair and sets timing claims:</EdProse>
      <EdCode :code="ex1PreRequest" lang="javascript" filename="Pre-request script" />

      <h4>Test script</h4>
      <EdProse>Saves the encrypted PII for use in subsequent requests:</EdProse>
      <EdCode :code="ex1TestScript" lang="javascript" filename="Test script" />

      <h4>Request body</h4>
      <EdCode :code="ex1Body" lang="json" filename="Request body" />

      <EdProse>
        <strong>Output:</strong> A compact JWE string (five base64url-encoded segments separated by
        <code>.</code>). Use the saved <code>{{ pmVarEncryptedPii }}</code> variable as
        <code>PersonalIdentifiableInformation</code> in your consent's <code>authorization_details</code>.
      </EdProse>
      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for a full
        explanation of the JWE structure, algorithm choices, and how to produce this token in your own code.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-2"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Example 2"
      title="Prepare private key JWT for PAR endpoint"
      tone="cream"
    >
      <p class="o3-endpoint">
        <strong>Endpoint:</strong>
        <span class="endpoint">
          <span class="http-method http-method--get">GET</span><code>/o3/v1.0/message-signature</code>
        </span>
      </p>

      <EdProse>
        Produces a <strong>Client Assertion JWT</strong> for use as <code>client_assertion</code> when calling
        <code>/par</code>. The client assertion proves your application's identity to the Authorization Server
        without a shared secret &mdash; it is signed with your private key and verified by the LFI using your
        public key from the Trust Framework JWKS.
      </EdProse>

      <h4>Pre-request script</h4>
      <EdProse>Sets timing claims:</EdProse>
      <EdCode :code="ex2PreRequest" lang="javascript" filename="Pre-request script" />

      <h4>Test script</h4>
      <EdProse>Saves the client assertion for use in the PAR request:</EdProse>
      <EdCode :code="ex2TestScript" lang="javascript" filename="Test script" />

      <h4>Request body</h4>
      <EdCode :code="ex2Body" lang="json" filename="Request body" />

      <EdProse>
        <strong>Output:</strong> A compact JWS string. Pass it as <code>client_assertion</code> in your
        <code>/par</code> request body, alongside
        <code>client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>.
      </EdProse>
      <EdCode :code="ex2ParRequest" lang="http" filename="POST /par" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the full
        claim set requirements and <a href="/tech/tpp-standards/security/fapi/message-signing">Message
        Signing</a> for how to produce this token in your own code.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-3"
      num="04"
      color="var(--at-navy)"
      eyebrow="Example 3"
      title="Prepare private key JWT for /token"
      tone="surface"
    >
      <p class="o3-endpoint">
        <strong>Endpoint:</strong>
        <span class="endpoint">
          <span class="http-method http-method--get">GET</span><code>/o3/v1.0/message-signature</code>
        </span>
      </p>

      <EdProse>
        Produces the same <strong>Client Assertion JWT</strong> as Example 2, but intended for use at the
        <code>/token</code> endpoint &mdash; for exchanging an authorization code for tokens, refreshing an
        access token, or obtaining a client credentials token. A fresh assertion with a new <code>jti</code>
        must be generated for every request.
      </EdProse>

      <h4>Pre-request script</h4>
      <EdCode :code="ex2PreRequest" lang="javascript" filename="Pre-request script" />

      <h4>Test script</h4>
      <EdCode :code="ex2TestScript" lang="javascript" filename="Test script" />

      <h4>Request body</h4>
      <EdCode :code="ex2Body" lang="json" filename="Request body" />

      <EdProse>
        <strong>Output:</strong> A compact JWS string. Pass it as <code>client_assertion</code> in your
        <code>/token</code> request body:
      </EdProse>
      <EdCode :code="ex3TokenRequest" lang="http" filename="POST /token" />

      <EdNote type="info" title="One assertion per request">
        <p>
          The <code>jti</code> claim must be a fresh UUID on every call. The Authorization Server tracks seen
          <code>jti</code> values and will reject replayed assertions. Postman's
          <code>{{ pmVarGuid }}</code> variable generates a new UUID on each request automatically.
        </p>
      </EdNote>

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the full
        claim set and <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing</a> for code
        examples.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-4"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Example 4"
      title="Prepare request object JWT for PAR endpoint"
      tone="cream"
    >
      <p class="o3-endpoint">
        <strong>Endpoint:</strong>
        <span class="endpoint">
          <span class="http-method http-method--get">GET</span><code>/o3/v1.0/message-signature</code>
        </span>
      </p>

      <EdProse>
        Produces a <strong>signed Request Object JWT</strong> (JWS) for use as the <code>request</code>
        parameter in a <code>/par</code> call. The request object contains the full authorization intent
        &mdash; scope, PKCE code challenge, <code>redirect_uri</code>, and <code>authorization_details</code>
        &mdash; signed with your private key so the Authorization Server can verify it has not been tampered
        with.
      </EdProse>

      <h4>Pre-request script</h4>
      <EdProse>Generates a PKCE pair and timestamps:</EdProse>
      <EdCode :code="ex4PreRequest" lang="javascript" filename="Pre-request script" />

      <h4>Test script</h4>
      <EdProse>Saves the signed request object and extracts the consent ID:</EdProse>
      <EdCode :code="ex4TestScript" lang="javascript" filename="Test script" />

      <h4>Request body</h4>
      <EdProse>
        Service initiation example &mdash; adapt <code>authorization_details</code> for your consent type:
      </EdProse>
      <EdCode :code="ex4Body" lang="json" filename="Request body" />

      <EdProse>
        <strong>Output:</strong> A compact JWS string. Pass it as <code>request</code> in your
        <code>/par</code> request body.
      </EdProse>

      <EdNote type="tip" title="Run in order">
        <p>For a complete payment flow, run the utilities in this order:</p>
        <ol>
          <li><strong>Example 1</strong> &mdash; Prepare Encrypted PII &rarr; saves <code>encryptedPII</code></li>
          <li><strong>Example 2</strong> &mdash; Prepare private key JWT for PAR &rarr; saves <code>private_key_jwt</code> (client assertion)</li>
          <li><strong>Example 4</strong> &mdash; Prepare request object JWT for PAR &rarr; saves <code>requestObject</code> (using <code>encryptedPII</code>)</li>
          <li><strong>POST /par</strong> &mdash; using <code>requestObject</code> and <code>private_key_jwt</code></li>
          <li>Redirect user to bank &rarr; receive authorization code</li>
          <li><strong>Example 3</strong> &mdash; Prepare private key JWT &rarr; saves fresh <code>private_key_jwt</code> for <code>/token</code></li>
          <li><strong>POST /token</strong> &mdash; exchange authorization code for tokens</li>
        </ol>
      </EdNote>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing</a> for how to produce
        signed JWTs in your own code.
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

.o3-endpoint {
  font-family: var(--at-sans);
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
