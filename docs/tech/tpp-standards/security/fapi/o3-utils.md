---
prev: false
next: false
aside: false
---

# O3 Sandbox Utilities

The Nebras Open Finance sandbox exposes a small set of **O3 Utility endpoints** to help you verify that your signing and encryption logic is correct before wiring everything together in your own application. You send a signing key (and, for encryption, a JWKS URL) in the request body, and the utility returns the signed or encrypted token directly — so you can validate output at any stage of the flow without having to build the full cryptographic pipeline first.

::: danger Sandbox only — never use in production
These endpoints accept raw private key material in the request body. They exist **exclusively for development and testing on the sandbox**. They are **not available in any production environment**, and you should never send real private keys to any external service.
:::

## Base URL

All O3 Utility requests target the sandbox resource server:

```
https://rs1.altareq1.sandbox.apihub.openfinance.ae
```

## Required Environment Variables

Each example below references Postman environment variables. Set these before running:

| Variable | Description |
|----------|-------------|
| `kid-local` | The Key ID (`kid`) of your signing certificate, from the Trust Framework |
| `pem-local` | Your signing private key in PEM format (PKCS#8, stripped of newlines — see [Message Signing](./message-signing#prerequisites)) |
| `_clientId` | Your application's `client_id`, from the Trust Framework |
| `jwksUrl` | The LFI's JWKS URI (required for encryption only) — e.g. `https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks` |

::: tip Stripping newlines from PEM keys
Postman environment variables cannot contain literal newlines. Strip them with:
```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' signing.key
```
:::



## Example 1 — O3 Util: Prepare Encrypted PII

**Endpoint:** `GET /o3/v1.0/message-encryption`

Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The output is stored in `encryptedPII` and is used directly as the `PersonalIdentifiableInformation` field in a consent's `authorization_details`.

This utility signs the PII payload with your private key and then encrypts it using the LFI's public encryption key (fetched from `jwksUrl`), producing a Nested JWT (JWS wrapped inside a JWE) — exactly as described in [Message Encryption](./message-encryption).

**Pre-request script** — generates PKCE code pair and sets timing claims:
```js
const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
```

**Test script** — saves the encrypted PII for use in subsequent requests:
```js
pm.environment.set('encryptedPII', responseBody)
```

**Request body:**
```json
{
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
}
```

**Output:** A compact JWE string (five base64url-encoded segments separated by `.`). Use the saved `{{encryptedPII}}` variable as `PersonalIdentifiableInformation` in your consent's `authorization_details`.

See [Message Encryption](./message-encryption) for a full explanation of the JWE structure, algorithm choices, and how to produce this token in your own code.



## Example 2 — O3 Util: Prepare private key JWT for PAR end-point

**Endpoint:** `GET /o3/v1.0/message-signature`

Produces a **Client Assertion JWT** for use as `client_assertion` when calling `/par`. The client assertion proves your application's identity to the Authorization Server without a shared secret — it is signed with your private key and verified by the LFI using your public key from the Trust Framework JWKS.

**Pre-request script** — sets timing claims:
```js
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
```

**Test script** — saves the client assertion for use in the PAR request:
```js
pm.environment.set('private_key_jwt', responseBody)
```

**Request body:**
```json
{
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
}
```

**Output:** A compact JWS string. Pass it as `client_assertion` in your `/par` request body, alongside `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

```
POST /par
Content-Type: application/x-www-form-urlencoded

client_id={{_clientId}}
&request={{requestObject}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}
```

See [Client Assertion](../tokens/client-assertion) for the full claim set requirements and [Message Signing](./message-signing) for how to produce this token in your own code.



## Example 3 — O3 Util: Prepare private key JWT

**Endpoint:** `GET /o3/v1.0/message-signature`

Produces the same **Client Assertion JWT** as Example 2, but intended for use at the `/token` endpoint — for exchanging an authorization code for tokens, refreshing an access token, or obtaining a client credentials token. A fresh assertion with a new `jti` must be generated for every request.

**Pre-request script:**
```js
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
```

**Test script:**
```js
pm.environment.set('private_key_jwt', responseBody)
```

**Request body:**
```json
{
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
}
```

**Output:** A compact JWS string. Pass it as `client_assertion` in your `/token` request body:

```
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={{authorizationCode}}
&redirect_uri={{redirect_uri}}
&code_verifier={{code-verifier}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}
```

::: info One assertion per request
The `jti` claim must be a fresh UUID on every call. The Authorization Server tracks seen `jti` values and will reject replayed assertions. Postman's `{{$guid}}` variable generates a new UUID on each request automatically.
:::

See [Client Assertion](../tokens/client-assertion) for the full claim set and [Message Signing](./message-signing) for code examples.



## Example 4 — O3 Util: Prepare request object JWT for PAR end-point

**Endpoint:** `GET /o3/v1.0/message-signature`

Produces a **signed Request Object JWT** (JWS) for use as the `request` parameter in a `/par` call. The request object contains the full authorization intent — scope, PKCE code challenge, `redirect_uri`, and `authorization_details` — signed with your private key so the Authorization Server can verify it has not been tampered with.

**Pre-request script** — generates a PKCE pair and timestamps:
```js
const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
pm.environment.set('today', new Date().toISOString().split('T')[0])
```

**Test script** — saves the signed request object and extracts the consent ID:
```js
pm.environment.set('requestObject', responseBody)

// Decode the payload to extract the consent ID
const parts = responseBody.split('.')
const payload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(parts[1])))
pm.environment.set('response_type', payload.response_type)
pm.environment.set('scope', payload.scope)
pm.environment.set('consentId', payload.authorization_details[0].consent.ConsentId)
```

**Request body** (service initiation example — adapt `authorization_details` for your consent type):
```json
{
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
}
```

**Output:** A compact JWS string. Pass it as `request` in your `/par` request body.

::: tip Run in order
For a complete payment flow, run the utilities in this order:
1. **Example 1** — Prepare Encrypted PII → saves `encryptedPII`
2. **Example 2** — Prepare private key JWT for PAR → saves `private_key_jwt` (client assertion)
3. **Example 4** — Prepare request object JWT for PAR → saves `requestObject` (using `encryptedPII`)
4. **POST /par** — using `requestObject` and `private_key_jwt`
5. Redirect user to bank → receive authorization code
6. **Example 3** — Prepare private key JWT → saves fresh `private_key_jwt` for `/token`
7. **POST /token** — exchange authorization code for tokens
:::

See [Message Signing](./message-signing) for how to produce signed JWTs in your own code.
