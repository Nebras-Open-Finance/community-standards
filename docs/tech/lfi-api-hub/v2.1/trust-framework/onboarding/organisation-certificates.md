---
next: false
prev: false
---

# Organisation Certificates

LFIs must register two types of certificates at the organisation level within the Trust Framework:

| Certificate Type | Purpose |
|---|---|
| **Transport (mTLS)** | Secures the mutual TLS connection between the Hub and your API endpoints |
| **Signing** | Used to verify JWS signatures on messages sent by your organisation |

These certificates are published in the Trust Framework directory so that the Hub and other participants can discover and verify them via the JWKS endpoint.

## Certificate Requirements

- Must be issued by the **AlTareq-approved CA**
- Key algorithm: **RSA 2048-bit** minimum, or **EC P-256**
- Signing certificates must use algorithm `PS256`
- Certificates must include a **Subject Alternative Name (SAN)** with your organisation's domain

::: tip
See the TPP Standards guide on [Certificates with a SAN](/tech/tpp-standards/trust-framework/certificates-san) for the technical requirements that also apply to LFIs.
:::

## Uploading Certificates

1. Navigate to **Organisation → Certificates** in the Trust Framework portal.
2. Click **Add Certificate**.
3. Select the certificate type (Transport or Signing).
4. Paste or upload the PEM-encoded certificate.
5. Click **Save**.

The certificate will be published to your organisation's JWKS endpoint within a few minutes.

## Certificate Rotation

When a certificate is approaching expiry:

1. Upload the new certificate (the old one remains active until removed).
2. Update your API Hub application to use the new certificate (see [Keys and Certificates](./keys-certificates)).
3. Once traffic has migrated, remove the old certificate from the portal.

::: warning
Do not remove the old certificate before your application is configured with the new one — this will break mTLS connections.
:::
