---
next: false
prev: false
aside: false
---

# JWT Auth — Client-side (LFI Sending a Token)

This page describes how your authorisation server constructs and sends JWT Auth tokens when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints. See [Application Layer Authentication](../application-layer-auth) for an overview of all available methods and when to select JWT Auth.

::: info Optional
Sending JWT Auth from the LFI to the API Hub is optional even when JWT Auth is selected. It is configured separately from the API Hub → LFI direction — indicate your preference on the onboarding Service Desk ticket.
:::

When your authorisation server calls API Hub endpoints (Consent Manager or Headless Heimdall Auth Server), you MUST construct a JWT Auth token and include it as a Bearer token in the `Authorization` HTTP header. The request MUST also be made over mutual TLS — see [Configuring Outbound mTLS](./mtls-client).


## Publishing Signing Keys on a JWKS

1. Create an Application in your Trust Framework Organisation labelled `C3-hh-cm-client`.
2. Create both the **C3** transport client certificate and **Sig4** signing certificate in this Application using the code snippets provided in the Trust Framework.
3. The Trust Framework will create a unique `kid` and host the JWKS.
4. When publishing a new key, wait **10 minutes** before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh.


## Constructing the Token

1. Ensure the machine generating the signature uses **NTP** to synchronise its clock.
2. Construct the JWT header and payload as specified in the [Claims Reference](#jwt-auth-claims-reference) below.
3. Sign the JWT using the **PS256** algorithm with a private signing key from the `C3-hh-cm-client` application.
4. Include the JWT as a `Bearer` token in the `Authorization` HTTP header.
5. The HTTPS request MUST be made over mutual TLS. The **C3** client certificate MUST be used to initiate the mTLS session, and MUST have a `DN` and `OU` that match the values placed in the JWT signature claims.


## JWT Auth Claims Reference

### Header

| Claim | Expected Value | Mandatory | Notes |
|-------|---------------|:---------:|-------|
| `alg` | `PS256` | Yes | |
| `typ` | `JOSE` | Yes | |
| `cty` | `json` | Yes | |
| `kid` | The key ID of the keypair used to sign the message, as published on the JWKS. | Yes | Other means of identifying the key (e.g. `x5c`, `x5u`) are not supported. |

### Body

| Claim | Expected Value | Mandatory | Notes |
|-------|---------------|:---------:|-------|
| `iss` | The organisation `O` value from the TLS certificate Subject used in the transport layer. | Yes | For a certificate with Subject `CN=ABC, OU=XYZ, O=Acme Bank, C=AE`, this would be `Acme Bank`. |
| `sub` | The organisation unit `OU` value from the TLS certificate Subject used in the transport layer. | Yes | For the same certificate, this would be `XYZ`. |
| `aud` | Identifier for the party receiving the JWT. | Yes | This MUST be set to the `PROVIDER_ID` specified during configuration. |
| `exp` | Time when the JWT will expire, in UTC seconds since epoch. | Yes | Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value. |
| `iat` | Time when the JWT was issued, in UTC seconds since epoch. | Yes | When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value. |
| `nbf` | Time before which the JWT is invalid, in UTC seconds since epoch. | No | When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified). |
| `jti` | A unique identifier for the JWT. | Yes | Recommended: populate with a UUIDv4 to increase entropy. |
