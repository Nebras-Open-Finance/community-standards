---
next: false
prev: false
aside: false
---

# Getting Started for TPPs (Sandbox)

This page is form-driven. Enter your Trust Framework and key details, then download a Postman bootstrap script generated for your TPP.

## Prerequisites

- You are onboarded to the sandbox Trust Framework: [Trust Framework Onboarding](/tech/tpp-standards/trust-framework/onboarding)

<ClientOnly>
  <TPPPostmanScriptBuilder />
</ClientOnly>

## What the Form Collects

| Input | Required | Source | Postman variable |
|---|---|---|---|
| `client_id` | Yes | Trust Framework application detail page | `tf_client_id` |
| Roles (`BDSP`, `BSIP`) | Yes | Trust Framework application roles | `tf_roles` |
| `redirect_uri` | Yes | Trust Framework application redirect URI | `tf_redirect_uri` |
| `client_transport.pem` | Yes | Your transport certificate file path | `tf_client_transport_pem_path` |
| `client_transport.key` | Yes | Your transport private key file path | `tf_client_transport_key_path` |
| `client_signing.key` | Yes | Your signing private key content | `tf_signing_key_pem` |
| Signing key ID (`kid`) | Yes | Trust Framework certificate detail page | `tf_signing_kid` |
| LFI discovery URL | Yes | LFI `.well-known` URL | `tf_discovery_url` |

Default Model Bank discovery URL:

`https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration`

## Run the Generated Script in Postman

1. Import `docs/public/postman/banking-v1.2-v2.0.postman_collection.json`.
2. Create request: `GET {{tf_discovery_url}}` (or paste the concrete URL).
3. Open the request `Tests` tab and paste the downloaded script.
4. Send the request once.
5. Confirm environment variables are set: `_clientId`, `issuer`, `par-endpoint`, `token-endpoint`, `registration-endpoint`, `rs`, `scope`.

## Register With the LFI

After bootstrap:

1. Call `POST {{registration-endpoint}}`.
2. Send header `x-fapi-interaction-id: {{$randomUUID}}`.
3. Send empty body.
4. Use mTLS with your transport cert and key.

Expected response: `204 No Content`.

## Security Constraints

- This form and generated script are for sandbox setup.
- In production, private keys must remain in your own secure key infrastructure (HSM/KMS).
- Never transmit production private keys to external utility endpoints.
