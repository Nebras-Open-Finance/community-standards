---
title: "O3 Sandbox Utilities — Signing and Encryption Helpers"
description: "What the O3 Util endpoints are, why they exist, and how to use them in Postman to test message signing, PII encryption, and client assertions without writing your own cryptographic code."
---

# O3 Sandbox Utilities — Signing and Encryption Helpers

The sandbox exposes a small set of **O3 Utility endpoints** that perform JWT signing and PII encryption on your behalf. You supply your private key (and a JWKS URL for encryption) in the request body, and the utility returns the finished token. This lets you verify your key material and payload structure at each stage of the flow — independently of your application code.

::: danger Sandbox only — never use in production
These endpoints accept raw private key material. They exist **exclusively in the sandbox** environment and are **not available in production**. Never send a production private key to any external service.
:::



## What Problems Do They Solve?

Setting up JWT signing and JWE encryption from scratch involves several independent components — certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at `/par` or `/token` with little indication of which step failed.

The O3 Utils let you isolate and validate each component individually before wiring them together:

| If you're unsure whether… | Use… |
|---------------------------|------|
| Your private key and `kid` are correctly configured | **Prepare private key JWT** |
| Your client assertion claims are correct | **Prepare private key JWT for PAR end-point** |
| Your PII payload structure and encryption key are working | **Prepare Encrypted PII** |



## Required Postman Environment Variables

| Variable | Description |
|----------|-------------|
| `kid-local` | The `kid` of your signing certificate from the Trust Framework |
| `pem-local` | Your signing private key in PEM format, with `\n` replacing literal newlines |
| `_clientId` | Your application's `client_id` from the Trust Framework |
| `jwksUrl` | The LFI's JWKS URI — required for encryption only |

::: tip Stripping newlines from a PEM key
Postman environment variables cannot contain literal newlines. Convert your key with:
```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' signing.key
```
:::



## O3 Util: Prepare Encrypted PII

**Endpoint:** `GET /o3/v1.0/message-encryption`
**Saves to:** `{{encryptedPII}}`

Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI's public encryption key (fetched from `jwksUrl`). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into `PersonalIdentifiableInformation` inside `authorization_details`.

**Request body:**
```json
{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}",
        "Initiation": {
            "Creditor": [
                {
                    "CreditorAgent": {
                        "SchemeName": "BICFI",
                        "Identification": "10000109010101",
                        "Name": "Mario International",
                        "PostalAddress": [{ "AddressType": "Business", "Country": "AE" }]
                    },
                    "Creditor": { "Name": "Mario International" },
                    "CreditorAccount": {
                        "SchemeName": "AccountNumber",
                        "Identification": "10000109010101",
                        "Name": { "en": "Mario International" }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": { "UserName": { "en": "Mohammed Al Rashidi" } },
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

**Test script:**
```js
pm.environment.set('encryptedPII', responseBody)
```

See [Message Encryption](../../tech/tpp-standards/security/fapi/message-encryption) for how to produce this token in your own code.



## O3 Util: Prepare private key JWT for PAR end-point

**Endpoint:** `GET /o3/v1.0/message-signature`
**Saves to:** `{{private_key_jwt}}`

Produces a **client assertion JWT** for authenticating at `/par`. The assertion contains your `client_id` as both `iss` and `sub`, a short `exp`, and a unique `jti`. The Authorization Server verifies it using your public key from the Trust Framework JWKS.

Use this as the `client_assertion` parameter when calling `/par`.

**Request body:**
```json
{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
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

**Pre-request script:**
```js
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
```

**Test script:**
```js
pm.environment.set('private_key_jwt', responseBody)
```

See [Client Assertion](../../tech/tpp-standards/security/tokens/client-assertion) for the full claim set.



## O3 Util: Prepare private key JWT

**Endpoint:** `GET /o3/v1.0/message-signature`
**Saves to:** `{{private_key_jwt}}`

Identical request body and output to the PAR variant above. Use this to generate a **fresh client assertion for `/token`** — for example when exchanging an authorization code for tokens or refreshing an access token.

A new assertion with a unique `jti` must be generated for every request. The Authorization Server tracks seen `jti` values and will reject replayed assertions.

```json
{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
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

Postman's `{{$guid}}` generates a new UUID on every request, so replays are avoided automatically.



## Recommended Run Order in Postman

For a complete service initiation flow, run the utilities in this sequence:

```
1.  O3 Util: Prepare Encrypted PII              → saves {{encryptedPII}}
2.  O3 Util: Prepare private key JWT for PAR    → saves {{private_key_jwt}}  (client assertion)
3.  O3 Util: Prepare request object JWT for PAR → saves {{requestObject}}     (signed request object)
4.  POST /par                                    → uses {{requestObject}} + {{private_key_jwt}}
5.  Redirect user to bank → receive auth code
6.  O3 Util: Prepare private key JWT            → saves fresh {{private_key_jwt}}
7.  POST /token                                 → exchange auth code for tokens
```



## Further Reading

- [O3 Sandbox Utilities — full reference](../../tech/tpp-standards/security/fapi/o3-utils) — complete request bodies, scripts, and flow diagrams for all four utility endpoints
- [Message Signing (JWS)](../../tech/tpp-standards/security/fapi/message-signing) — how to sign JWTs in your own code
- [Message Encryption (JWE)](../../tech/tpp-standards/security/fapi/message-encryption) — how to produce encrypted PII in your own code
- [Client Assertion](../../tech/tpp-standards/security/tokens/client-assertion) — claim structure and signing requirements
