---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Configuring Inbound mTLS

This page describes how the LFI MUST configure inbound mutual TLS (mTLS) on its Ozone Connect server so that calls from the API Hub are authenticated and all other calls are rejected.


## 1. Why the LFI MUST configure inbound mTLS

Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the **C4** transport client certificate. The LFI's Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to:

1. **Require** a client certificate on every inbound connection, and
2. **Trust** certificates signed by the Trust Framework Issuing CA for the relevant environment.

Without this:

- If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure.
- If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and **every** API Hub call is rejected at the handshake.

::: warning This is the LFI's responsibility
The API Hub does not terminate TLS on the LFI's behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the API Hub's C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not.
:::


## 2. Trust Framework Certificate Authorities

Each API Hub environment pairs with a distinct Trust Framework PKI:

- **Production** API Hub → **Production** Trust Framework
- **Pre-production** API Hub → **Sandbox** Trust Framework

To validate the API Hub's C4 client certificate, the LFI MUST configure its Ozone Connect server with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in use.

### Production

The Production API Hub uses certificates issued by the **Production Trust Framework**. Its CAs are below.

#### Root CA

The self-signed root of trust for the Production Trust Framework PKI.

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1` |
| **PEM** | [`https://crl.pki.openfinance.ae/root-ca.pem`](https://crl.pki.openfinance.ae/root-ca.pem) |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-10-01 |
| **Valid until** | 2039-09-28 |

#### Issuing CA

The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2).

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

### Pre-production

#### Root CA

The self-signed root of trust for the Pre-production PKI.

| Field | Value |
|-------|-------|
| **Distinguished Name** | `C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1` |
| **PEM** | [`https://crl.sandbox.pki.openfinance.ae/root-ca.pem`](https://crl.sandbox.pki.openfinance.ae/root-ca.pem) |
| **Algorithm** | RSA 2048, signed with `sha512WithRSAEncryption` |
| **Valid from** | 2024-08-22 |
| **Valid until** | 2039-08-19 |

#### Issuing CA

The subordinate CA that signs all participant certificates on Pre-production.

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


## 3. Configuring your Ozone Connect server

Inbound mTLS configuration has two parts:

1. **Trust the Trust Framework CA bundle** so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework.
2. **Pin the connection to the API Hub's C4 client** so that a certificate signed by the same Trust Framework — but belonging to a different participant — cannot reach your endpoints.

### 3a. Trust the CA bundle

Assemble a single PEM bundle containing the **Issuing CA** first, then the **Root CA**. This bundle is what your TLS-terminating component loads as its trusted client-CA file.

::: tip Bundle for Pre-production
```bash
curl -sSL https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem  > trust-framework-preprod.pem
curl -sSL https://crl.sandbox.pki.openfinance.ae/root-ca.pem   >> trust-framework-preprod.pem
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

Once the bundle is in place, the API Hub's C4 certificate will validate on every inbound call. The handshake will now also validate **any** other Trust Framework participant's certificate — which is what section 3b addresses.

### 3b. Pin to the API Hub's C4 client

Trusting the Trust Framework CA means that every TPP, every other LFI, and every client certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API Hub — and specifically your own API Hub instance's egress — can reach your Ozone Connect endpoints, the LFI SHOULD additionally pin the connection to the API Hub's C4 client subject `OU`.

The subject of the C4 certificate contains the Ozone organisation's identifier in its `OU`. Ozone provides this identifier as part of [environment-specific onboarding](../environment-specific/#c4-transport-client-certificate) — the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of the certificate in that keystore is the value to pin against.

Most reverse proxies expose the client-certificate subject as a variable during the request — for example, nginx exposes `$ssl_client_s_dn`. The LFI rejects any request whose client certificate subject `OU` does not equal the documented Ozone organisation OU.

Pinning by the C4 leaf certificate's SHA-256 fingerprint is **not** required. The OU pin above is sufficient and survives C4 rotation without any LFI-side configuration change.


## 4. Verification

Ozone verifies both layers of your inbound mTLS configuration end-to-end as part of [Connectivity Validation](../environment-specific/#connectivity-validation). The API Hub is only considered set up for an environment once **both** of the following are exercised successfully:

1. The CA-trust layer rejects any connection that does not present a Trust Framework-issued client certificate (section 3a).
2. The pinning layer rejects any Trust Framework-issued certificate whose subject OU does not match the API Hub's C4 organisation OU, and accepts the legitimate C4 certificate (section 3b).

If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected.
