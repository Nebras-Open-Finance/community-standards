---
next: false
prev: false
aside: false
---

# Client Transport Certificate

The **Transport Certificate** is used for **mutual TLS (mTLS)** to authenticate your application when making API requests to LFIs.

- **Purpose**: Secure transport and client authentication
- **Usage**: mTLS handshake for all API calls
- **Presented to**: API providers during every connection
- **Required**: Yes

All API calls you make as a TPP must present this certificate. Without it, LFI endpoints will reject the connection before any request is processed.

## Generating Your Transport Certificate

Follow the [Keys & Certificates](../certificates/) guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.

When selecting the certificate type during generation, choose **Transport**.

::: tip Using the kid
Once issued, note the **Key ID (`kid`)** from the certificate detail page — you will need it when configuring your mTLS client. See [Finding Your Key ID](../certificates/#finding-your-key-id-kid).
:::
