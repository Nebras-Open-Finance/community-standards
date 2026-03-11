---
next: false
prev: false
aside: false
---

# Client Encryption Certificate

The **Encryption Certificate** is used to **encrypt data** sent to your application — such as event notifications — ensuring only your application can read it.

- **Purpose**: Ensuring only your application can read sensitive data
- **Usage**: Decrypting encrypted responses and event payloads
- **Required**: Optional — required if your application subscribes to receive encrypted events

When an LFI or the platform sends an encrypted payload, it encrypts it using the public key from this certificate. Your application uses the corresponding private key to decrypt it.

## Generating Your Encryption Certificate

Follow the [Keys & Certificates](../certificates/) guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.

When selecting the certificate type during generation, choose **Encryption**.

::: tip
Keep your encryption private key stored securely. If it is lost, you will be unable to decrypt any events received during the period the certificate was active. See [Secure Management of Keys and Credentials](/policy/secure-management) for guidance.
:::
