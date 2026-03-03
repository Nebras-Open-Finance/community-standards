---
next: false
prev: false
aside: false
---

🕒 **5 minute read**


# Trust Framework - Keys and Certificates

To operate within the ecosystem, your application must use certificates issued and stored within the Trust Framework. There are three types of certificates, each serving a distinct security function:

### 1. Transport Certificate - Required

Used for **mutual TLS (mTLS)** to authenticate your client (application) when making API requests.

- **Purpose**: Secure transport and client authentication
- **Usage**: mTLS handshake for all API calls
- **Presented to**: API providers during connection

### 2. Signing Certificate - Required

Used to **digitally sign JWTs** your application sends—such as client assertions, request objects, etc.

- **Purpose**: Proving integrity and authenticity of signed payloads
- **Usage**: Signing the contents of JWTs

### 3. Encryption Certificate - Optional (Required for TPPs subscribing to receive events)

Used to **encrypt data** such as an event.

- **Purpose**: Ensuring only your application can read sensitive data
- **Usage**: Decrypting encrypted responses

Each certificate plays a critical role in securing communication, asserting identity, and protecting user data in transit. Once you understand the different certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications.


 ## Key and Certificate

Key and Certificate Requirements

Keys and certificates within the Trust Framework (TF) must meet the following requirements:

- **2048-bit RSA private key (unencrypted)**
- A corresponding **Certificate Signing Request (CSR)** signed with **SHA-256**
- CSR subject fields must include:
  - **C** → Country — must be set to `AE` (United Arab Emirates)
  - **O** → Organization — must equal the Organization’s legal name in the Trust Framework
  - **OU** → Organizational Unit — must equal the Organization’s ID in the Trust Framework


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

Replace `LegalName`, `OrganizationId`, and `UUID` with the values of your organisation within the TrustFramework. Equivalent cryptographic tools may be used, provided all requirements above are met.

The .csr file (Certificate Signing Request) must be uploaded to the TF.
The .key file (Private Key) must be kept *secure and must never be shared*. More information on private key handling and security requirements can be found [here](/policy/secure-management)



  <ClientOnly>
    <Carousel :images="images" />
  </ClientOnly>

  

<script setup>
const images =  [
  {
    src: new URL('/images/raidiam/generate-transport-certificate/1.PNG', import.meta.url).href,
    alt: 'Step 1',
    title: 'Within your application click App Certificates'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/2.PNG', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click +New Certificate'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/3.PNG', import.meta.url).href,
    alt: 'Step 3',
    title: 'Select the Certificate you are intending to generate.',
    tagline: `Transport, Signing or Encryption`
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/4.PNG', import.meta.url).href,
    alt: 'Step 4',
    title: 'Create a script to generate your private key (.key) and CSR',
    tagline: `The OpenSSL script provided in this directory is intended for demonstration and testing purposes only. In production environments, private key generation and CSR creation are expected to be performed within the LFI’s Hardware Security Module (HSM) or an equivalent secure key management infrastructure, in accordance with the institution’s security policies.`
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/5.PNG', import.meta.url).href,
    alt: 'Step 5',
    title: 'Generate you CSR',
    tagline: `The OpenSSL script provided in this directory is intended for demonstration and testing purposes only. In production environments, private key generation and CSR creation are expected to be performed within the LFI’s Hardware Security Module (HSM) or an equivalent secure key management infrastructure, in accordance with the institution’s security policies.`
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/6.PNG', import.meta.url).href,
    alt: 'Step 6',
    title: 'CSR Generated'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/7.PNG', import.meta.url).href,
    alt: 'Step 7',
    title: 'Upload your CSR'
  },
      {
    src: new URL('/images/raidiam/generate-transport-certificate/8.PNG', import.meta.url).href,
    alt: 'Step 8',
    title: 'Upload the .CSR file'
  },
        {
    src: new URL('/images/raidiam/generate-transport-certificate/9.PNG', import.meta.url).href,
    alt: 'Step 9',
    title: 'Your certificate is generated and ready to be downloaded'
  },
  
  {
    src: new URL('/images/raidiam/generate-transport-certificate/10.PNG', import.meta.url).href,
    alt: 'Step 10',
    title: 'You now have the certificate (.PEM) and Key (.Key) pair',
  },
]
</script>
