---
next: false
prev: false
---

# Application Keys and Certificates

Each application requires two certificates configured at the application level:

| Certificate | Purpose |
|---|---|
| **Transport certificate** | Used for mutual TLS (mTLS) between the Hub and your application endpoints |
| **Signing certificate** | Used to sign and verify JWS-protected messages |

These are separate from the organisation-level certificates — they are the credentials your specific application uses to communicate with the Hub.

## Generating a Key Pair

Before uploading a certificate, generate a key pair using your organisation's CA or a tool like OpenSSL:

```bash
# Generate an RSA 2048-bit private key
openssl genrsa -out transport.key 2048

# Generate a CSR (include your domain in the SAN)
openssl req -new -key transport.key -out transport.csr \
  -subj "/CN=api.yourbank.ae/O=Your Bank/C=AE"

# Submit the CSR to the AlTareq-approved CA to obtain the signed certificate
```

## Adding Keys to an Application

1. Open the application in the Trust Framework portal.
2. Navigate to the **Keys & Certificates** tab.
3. Click **Add Certificate**.
4. Select the certificate type (Transport or Signing).
5. Paste the PEM-encoded certificate.
6. Click **Save**.

The Hub will use the uploaded certificate for all connections from this application.

## JWKS Endpoint

Once certificates are configured, your application's public keys are automatically published at:

```
https://keystore.openfinance.ae/{organisationId}/{applicationId}/jwks.json
```

The Hub uses this URL to verify message signatures and to perform mTLS certificate validation. Ensure this endpoint is accessible from the Hub's IP ranges.
