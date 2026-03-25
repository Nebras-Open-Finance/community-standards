---
next: false
prev: false
aside: false
---

# Client Signing Certificate

The **Signing Certificate** is used to **digitally sign JWTs** that your application sends — including Client Assertions, PAR Request JWTs, and any other signed payloads.

- **Purpose**: Proving integrity and authenticity of signed payloads
- **Usage**: Signing the contents of JWTs
- **Required**: Yes

Every signed JWT must include a `kid` header referencing this certificate's Key ID, so that the receiving party can look up your public key in the Trust Framework and verify the signature.

## Generating Your Signing Certificate

Follow the [Keys & Certificates](../certificates/) guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.

When selecting the certificate type during generation, choose **Signing**.

## Using the Signing Key

The **Key ID (`kid`)** of your signing certificate must be included in the JWT header for every signed request. See [Finding Your Key ID](../certificates/#finding-your-key-id-kid) and [Message Signing](../../security/fapi/message-signing) for full details on how this value is used.
