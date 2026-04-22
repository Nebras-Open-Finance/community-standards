---
next: false
prev: false
aside: false
---

# Trust Framework Certificate Authorities

The Open Finance UAE Trust Framework operates two separate Public Key Infrastructures — one for each environment — that issue the transport and signing certificates used across the ecosystem. This page documents the Certificate Authorities (CAs) of each PKI and how the LFI MUST configure inbound mTLS on its Ozone Connect server to trust them.

For how each certificate named below (C4, S4, etc.) fits into the overall network architecture, see [API Hub Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/).

::: info On-the-wire naming
Trust Framework CA certificates use the **"Al Tareq"** brand in their `CN` and `OU` — this is the legacy name of the Nebras Open Finance Company and remains in the currently deployed certificate chain across both environments. Certificate chains presented to your Ozone Connect server will display `Al Tareq {Environment} Trust Framework ...` rather than `Open Finance UAE ...`. This is expected.
:::


## 1. Why the LFI MUST configure inbound mTLS

Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the **C4** transport client certificate. The LFI's Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to:

1. **Require** a client certificate on every inbound connection, and
2. **Trust** certificates signed by the Trust Framework Issuing CA for the relevant environment.

Without this:

- If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure.
- If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and **every** API Hub call is rejected at the handshake.

::: warning This is the LFI's responsibility
The API Hub does not terminate TLS on the LFI's behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not.
:::


## 2. Production Trust Framework CAs

### Root CA

The self-signed root of trust for the Production PKI.

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1` |
| **PEM** | [`https://crl.pki.openfinance.ae/root-ca.pem`](https://crl.pki.openfinance.ae/root-ca.pem) |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-10-01 |
| **Valid until** | 2039-09-28 |

### Issuing CA

The subordinate CA that signs all participant certificates (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2).

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1` |
| **Issued by** | Al Tareq Production Trust Framework Root CA - G1 |
| **PEM** | [`https://crl.pki.openfinance.ae/issuer-ca.pem`](https://crl.pki.openfinance.ae/issuer-ca.pem) |
| **OCSP responder** | `http://ocsp.pki.openfinance.ae` |
| **CRL distribution point** | `http://crl.pki.openfinance.ae/issuer.crl` |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-10-01 |
| **Valid until** | 2034-09-29 |


## 3. Sandbox Trust Framework CAs

### Root CA

The self-signed root of trust for the Sandbox PKI. Used for all pre-production certificates.

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1` |
| **PEM** | [`https://crl.sandbox.pki.openfinance.ae/root-ca.pem`](https://crl.sandbox.pki.openfinance.ae/root-ca.pem) |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-08-22 |
| **Valid until** | 2039-08-19 |

### Issuing CA

The subordinate CA that signs all Sandbox participant certificates.

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1` |
| **Issued by** | Al Tareq Sandbox Trust Framework Root CA - G1 |
| **PEM** | [`https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem`](https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem) |
| **OCSP responder** | `http://ocsp.sandbox.pki.openfinance.ae` |
| **CRL distribution point** | `http://crl.sandbox.pki.openfinance.ae/issuer.crl` |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-08-22 |
| **Valid until** | 2034-08-20 |


## 4. Configuring your Ozone Connect server

Inbound mTLS configuration has two parts:

1. **Trust the Trust Framework CA bundle** so the handshake accepts C4 and is rejected for anything else signed outside the Trust Framework.
2. **Pin the connection to the API Hub's C4 client** so that a certificate signed by the same Trust Framework — but belonging to a different participant — cannot reach your endpoints.

### 4a. Trust the Trust Framework CA bundle

Assemble a single PEM bundle containing the **Issuing CA** first, then the **Root CA**. This bundle is what your TLS-terminating component loads as its trusted client-CA file.

::: tip Bundle for the Sandbox environment
```bash
curl -sSL https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem  > trust-framework-sandbox.pem
curl -sSL https://crl.sandbox.pki.openfinance.ae/root-ca.pem   >> trust-framework-sandbox.pem
```

For Production, fetch the equivalent files from `https://crl.pki.openfinance.ae/`.
:::

Configure the component that terminates TLS in front of Ozone Connect to **require** a client certificate and to validate it against this bundle. The LFI is responsible for mapping the requirement to their own infrastructure — common patterns include:

| Platform | Configuration surface |
|----------|------------------------|
| **nginx** | `ssl_client_certificate` (path to the bundle) and `ssl_verify_client on` |
| **AWS Network Load Balancer / API Gateway** | Trust store referencing the bundle, with `MutualAuthentication = verify` |
| **Google Cloud Load Balancing** | Backend service client TLS policy with a server-side TLS trust configuration |
| **Azure Application Gateway** | Trusted client CA certificate on the listener, with client-authentication enabled |

::: warning Do not rely on the system trust store
The Trust Framework roots are **private** — they are not present in operating-system or browser trust stores. Your component MUST be configured with the Trust Framework bundle explicitly.
:::

Once the bundle is in place, the API Hub's C4 certificate will validate on every inbound call. The handshake will now also validate **any** other Trust Framework participant's certificate — which is what section 4b addresses.

### 4b. Pin the connection to the API Hub's C4 client

Trusting the Trust Framework CA means that every TPP, every other LFI, and every client certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API Hub — and specifically your own API Hub instance's egress — can call your Ozone Connect endpoints, the LFI SHOULD additionally pin the connection to the C4 client certificate.

There are two ways to do this.

#### By certificate subject OU (recommended)

The subject of the C4 certificate contains the Ozone organisation's identifier in its `OU`. Ozone provides this identifier as part of [environment-specific onboarding](./#c4-transport-client-certificate) (the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of the certificate in that keystore is what you pin against).

Most reverse proxies expose the client-certificate subject as a variable during the request — for example, nginx exposes `$ssl_client_s_dn`. The LFI rejects any request whose client certificate subject OU does not equal the documented Ozone organisation OU.

::: tip Prefer the OU approach
OU-based pinning survives C4 certificate rotation — when Ozone rotates the C4 leaf (for instance at scheduled renewal) the OU remains the same, so no LFI-side configuration change is needed. This is the lower-maintenance option and matches the pattern used by the Nebras reference implementation.
:::

#### By certificate thumbprint

Alternatively, pin the **SHA-256 fingerprint** of the C4 leaf certificate. This is more precise — it excludes any future certificate in the same organisation — but the fingerprint changes whenever the C4 certificate rotates, and the LFI MUST coordinate the cutover with Ozone each time. Choose this option only if your security policy requires leaf-level pinning.

::: warning Production and Sandbox C4 certificates are different
The C4 certificate is issued separately in each environment. **OU values and fingerprints from Sandbox will not match Production.** Configure each environment against the values Ozone has provided you for **that** environment, and do not assume a value carried from pre-production will work in production.
:::


## Related pages

- [API Hub Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/) — the certificate model across the full ecosystem
- [Environment Specific Configuration](./) — all information exchanged during onboarding, including the C4 JWKS URL and KID
- [Certificate Walkthroughs](./certificate-walkthroughs) — step-by-step examples of creating S1 and S4
- [Keys & Certificates](/tech/lfi-api-hub/trust-framework/certificates/) — how to generate keys and upload CSRs in the Trust Framework
