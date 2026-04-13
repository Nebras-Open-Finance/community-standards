---
next: false
prev: false
aside: false
---

# JWT Auth — Technical Detail

This page describes how to construct and validate JWT Auth tokens used for application layer authentication between the LFI and the API Hub. See [Application Layer Authentication](./application-layer-auth) for an overview of all available methods.

JWT Auth is used in two directions:

- **LFI as Server** — receiving and validating tokens sent by the API Hub to your Ozone Connect endpoints.
- **LFI as Client** — constructing and sending tokens to the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints (optional, enabled per LFI configuration).


## LFI as Client (Sending a Token)

When your authorisation server calls API Hub endpoints (Consent Manager or Headless Heimdall Auth Server), you MUST construct a JWT Auth token and include it as a Bearer token in the `Authorization` HTTP header. The request MUST also be made over mutual TLS.

### Publishing Signing Keys on a JWKS

1. Create an Application in your Trust Framework Organisation labelled `C3-hh-cm-client`.
2. Create both the **C3** transport client certificate and **Sig4** signing certificate in this Application using the code snippets provided in the Trust Framework.
3. The Trust Framework will create a unique `kid` and host the JWKS.
4. When publishing a new key, wait **10 minutes** before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh.

### Constructing the Token

1. Ensure the machine generating the signature uses **NTP** to synchronise its clock.
2. Construct the JWT header and payload as specified in the [Claims Reference](#jwt-auth-claims-reference) below.
3. Sign the JWT using the **PS256** algorithm with a private signing key from the `C3-hh-cm-client` application.
4. Include the JWT as a `Bearer` token in the `Authorization` HTTP header.
5. The HTTPS request MUST be made over mutual TLS. The **C3** client certificate MUST be used to initiate the mTLS session, and MUST have a `DN` and `OU` that match the values placed in the JWT signature claims.


## LFI as Server (Receiving a Token)

When the API Hub sends requests to your Ozone Connect endpoints, it includes a JWT Auth token in the `Authorization` header. Your server MUST validate this token.

### Validating the Token

1. Ensure the machine verifying the signature uses **NTP** to synchronise its clock.
2. Verify that the request was received over a **mutual TLS** connection.
3. Extract the JWT Auth token from the `Authorization` HTTP header.
4. Verify the signature on the JWT using the `kid` specified in the JWS header.
5. Derive the JWKS URI from the requestor's client certificate subject. The `OU` and `CN` values are substituted as follows:

   **Template:**
   ```
   Sandbox:    https://keystore.sandbox.directory.openfinance.ae/${OU}/${CN}/application.jwks
   Production: https://keystore.directory.openfinance.ae/${OU}/${CN}/application.jwks
   ```

   **Example:**
   For a requestor client certificate subject `CN=ABC, OU=XYZ, O=Organisation Name, C=AE`:
   ```
   https://keystore.sandbox.directory.openfinance.ae/XYZ/ABC/application.jwks
   ```

6. The JWKS MAY be cached for up to **10 minutes**.
7. Verify each claim in the JWT against the expected values specified in the [Claims Reference](#jwt-auth-claims-reference) below.


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
