# Trust Framework - Keys and Certificates

To operate within the ecosystem, your application must use certificates issued and stored within the Trust Framework. There are three types of certificates, each serving a distinct security function:

### 1. Transport Certificate - Required

Used for **mutual TLS (mTLS)** to authenticate your client (application) when making API requests.

- **Purpose**: Secure transport and client authentication
- **Usage**: mTLS handshake for all API calls
- **Presented to**: API providers during connection

### 2. Signing Certificate - Required

Used to **digitally sign JWTs** your application sends — such as client assertions, request objects, etc.

- **Purpose**: Proving integrity and authenticity of signed payloads
- **Usage**: Signing the contents of JWTs

### 3. Encryption Certificate - Optional (Required for participants subscribing to receive events)

Used to **encrypt data** such as an event.

- **Purpose**: Ensuring only your application can read sensitive data
- **Usage**: Decrypting encrypted responses

Each certificate plays a critical role in securing communication, asserting identity, and protecting data in transit. Once you understand the different certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications.

## Key and Certificate Requirements

Keys and certificates within the Trust Framework (TF) must meet the following requirements:

- **2048-bit RSA private key (unencrypted)**
- A corresponding **Certificate Signing Request (CSR)** signed with **SHA-256**
- CSR subject fields must include:
  - **C** → Country — must be set to `AE` (United Arab Emirates)
  - **O** → Organization — must equal the Organization's legal name in the Trust Framework
  - **OU** → Organizational Unit — must equal the Organization's ID in the Trust Framework
  - **CN** → Common Name — must equal the application's **Client ID** (the UUID assigned by the Trust Framework when the application was created)

### Generating the Private Key and CSR

The Trust Framework provides an example using OpenSSL to generate:

- A private key file (`.key`)
- A Certificate Signing Request file (`.csr`)

Example:

```bash
openssl req -new -newkey rsa:2048 -nodes \
  -keyout <UUID>.key \
  -out <UUID>.csr \
  -subj "/C=AE/O=<LegalName>/OU=<OrganizationId>/CN=<UUID>" \
  -sha256
```

Replace `LegalName` and `OrganizationId` with your organisation's details from the Trust Framework. Replace `UUID` with your application's **Client ID** — the UUID assigned when the application was created (see [Creating an Application](./application#your-client-id)). Equivalent cryptographic tools may be used, provided all requirements above are met.

The `.csr` file (Certificate Signing Request) must be uploaded to the Trust Framework.
The `.key` file (Private Key) must be kept *secure and must never be shared*. More information on private key handling and security requirements can be found [here](/policy/secure-management).

<ClientOnly>
  <Carousel :images="images" />
</ClientOnly>

## Finding Your Key ID (kid)

Once your certificate is issued, the Trust Framework assigns it a **Key ID (`kid`)**. This value must be included in the `kid` header of every JWT signed with the corresponding private key.

<ImageViewer
  src="/images/raidiam/generate-transport-certificate/11.png"
  alt="Key ID (kid) location on the certificate detail page in the Trust Framework"
/>

::: tip Where to find it later
Your `kid` is always visible on the certificate detail page. Navigate to your Application → App Certificates → select the certificate. Copy the Key ID exactly as shown — it is case-sensitive.
:::

You will need a separate `kid` for each certificate type (Transport, Signing, Encryption). When signing JWTs, always use the `kid` of your **Signing** certificate.
