---
next: false
prev: false
aside: false
---

# Certificate Walkthroughs

This page provides step-by-step walkthroughs for creating certificates required during [environment-specific onboarding](./).

Two representative examples are covered:
- **S1** — an Ozone-held certificate where the LFI uploads a CSR provided by Ozone
- **S4** — an LFI-held certificate where the LFI generates the key, CSR, and certificate

The same patterns apply to the other certificates listed in the [Environment Specific Configuration](./) — refer to that page to determine which process applies to each certificate.


## Walkthrough: S1 — Ozone-Held Server Transport Certificate

**S1** identifies the LFI's API Hub instance to TPPs. Ozone holds the private key and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate the certificate.

### Prerequisites

- You have received the S1 CSR file from Ozone (provided via the Service Desk ticket).
- You are signed in to the correct Trust Framework directory:
  - **Pre-production** → Sandbox Trust Framework (`web.sandbox.directory.openfinance.ae`)
  - **Production** → Production Trust Framework (`web.directory.openfinance.ae`)

### Steps

1. Navigate to your **Organisation** in the Trust Framework.
2. Open the **Organisation Certificates** section.
3. Click **+ New Certificate**.

<ClientOnly>
  <Carousel :images="images1" />
</ClientOnly>

4. Select **OPF UAE SERVER TRANSPORT** as the certificate type.
5. Set the description to **S1 - Ozone holds Private Key - TPP-APIHub** 
6. Skip the step to generate the private key and CSR.
7. Upload the CSR provided by Ozone.

<ClientOnly>
  <Carousel :images="images2" />
</ClientOnly>

6. The Trust Framework will generate the certificate. Once complete, the certificate detail page will display:
   - The **Key ID (KID)** — copy this value exactly as shown (it is case-sensitive).
   - The **JWKS URL** — this is your organisation's transport JWKS URL.
7. Provide the **KID** and **JWKS URL** back to Ozone via the Service Desk ticket.

<ClientOnly>
  <Carousel :images="images3" />
</ClientOnly>

::: tip Finding the JWKS URL
Your organisation's transport JWKS URL follows this pattern:
```
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{OrganisationId}/transport.jwks
Production: https://keystore.directory.openfinance.ae/{OrganisationId}/transport.jwks
```
You can also find it on the Organisation Certificates page in the Trust Framework.
:::

### What happens next

Ozone will install the certificate (paired with the private key they hold) onto the API Hub servers. TPPs connecting to your API Hub instance will see this certificate during the TLS handshake.


## Walkthrough: S4 — LFI-Held Server Transport Certificate

**S4** identifies the LFI's Ozone Connect server to the API Hub. The LFI holds the private key and is responsible for generating the key, CSR, and certificate.

### Prerequisites

- You have your organisation's **Legal Name** and **Organisation ID** from the Trust Framework.
- You are signed in to the correct Trust Framework directory:
  - **Pre-production** → Sandbox Trust Framework (`web.sandbox.directory.openfinance.ae`)
  - **Production** → Production Trust Framework (`web.directory.openfinance.ae`)

### Step 1 — Generate the private key and CSR

Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match your Trust Framework organisation details:

```bash
openssl req -new -newkey rsa:2048 -nodes \
  -keyout s4.key \
  -out s4.csr \
  -subj "/C=AE/O=<LegalName>/OU=<OrganisationId>/CN=<OrganisationId>" \
  -sha256
```

Replace:
- `<LegalName>` with your organisation's legal name as it appears in the Trust Framework
- `<OrganisationId>` with your organisation's ID from the Trust Framework

::: warning Production environments
The OpenSSL command shown is for demonstration. In production, private key generation and CSR creation MUST be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies.
:::

Store the `.key` file securely — it MUST never be shared. See [Secure Management](/policy/secure-management) for requirements.

### Step 2 — Upload the CSR to the Trust Framework

1. Navigate to your **Organisation** in the Trust Framework.
2. Open the **Organisation Certificates** section.
3. Click **+ New Certificate**.

<ClientOnly>
  <Carousel :images="images1" />
</ClientOnly>

4. Select **OPF UAE SERVER TRANSPORT** as the certificate type.
5. Set the description to **S4 - I hold Private Key - APIHub-OzoneConnect**
6. Click **Next**.
7. Upload the `.csr` file generated in Step 1.

<ClientOnly>
  <Carousel :images="images2a" />
</ClientOnly>

### Step 3 — Record the KID and JWKS URL

Once the Trust Framework processes the CSR:

1. The certificate detail page will display the **Key ID (KID)** — copy this value exactly (case-sensitive).
2. Note your organisation's **transport JWKS URL**.
3. Provide the **KID** and **JWKS URL** to Ozone via the Service Desk ticket.

<ClientOnly>
  <Carousel :images="images3" />
</ClientOnly>

::: tip Finding the JWKS URL
Your organisation's transport JWKS URL follows this pattern:
```
Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{OrganisationId}/transport.jwks
Production: https://keystore.directory.openfinance.ae/{OrganisationId}/transport.jwks
```
You can also find it on the Organisation Certificates page in the Trust Framework.
:::

### Step 4 — Deploy the certificate

Deploy the certificate (`.pem`) and private key (`.key`) to your Ozone Connect server infrastructure. The API Hub will validate this certificate during mTLS connections to your Ozone Connect endpoints.

For detailed guidance on generating keys and certificates in the Trust Framework, see [Keys & Certificates](/tech/lfi-api-hub/trust-framework/certificates/).



<script setup>

const images1 = [
  {
    src: new URL('/images/raidiam/s1/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/s1/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into organisation certificates'
  },
  {
    src: new URL('/images/raidiam/s1/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click + New Certificate'
  }]

 const images2 = [
  {
    src: new URL('/images/raidiam/s1/4.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the certificate type OPF UAE SERVER TRANSPORT'
  },
  {
    src: new URL('/images/raidiam/s1/5.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Set the description to "S1 - Ozone holds Private Key - TPP-APIHub"'
  },
  {
    src: new URL('/images/raidiam/s1/6.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'Click Next'
  },
  {
    src: new URL('/images/raidiam/s1/7.png', import.meta.url).href,
    alt: 'Step 7',
    title: 'Skip the section to generate the CSR and Private Key.'
  },
  {
    src: new URL('/images/raidiam/s1/8.png', import.meta.url).href,
    alt: 'Step 8',
    title: 'Upload the CSR provided by Ozone in the ticket and click Save'
  },
  ]

   const images2a = [
  {
    src: new URL('/images/raidiam/s1/4.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the certificate type OPF UAE SERVER TRANSPORT'
  },
  {
    src: new URL('/images/raidiam/s1/12.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Set the description to S4 - I hold Private Key - APIHub-OzoneConnect'
  },
  {
    src: new URL('/images/raidiam/s1/13.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'Click Next'
  },
  {
    src: new URL('/images/raidiam/s1/8.png', import.meta.url).href,
    alt: 'Step 8',
    title: 'Upload the CSR generated in step 1.'
  },
  ]

  const images3 = [
  {
    src: new URL('/images/raidiam/s1/9.png', import.meta.url).href,
    alt: 'Step 9',
    title: 'The KID (Key ID) can be found and copied here'
  },
  {
    src: new URL('/images/raidiam/s1/10.png', import.meta.url).href,
    alt: 'Step 10',
    title: 'You can navigate to the Keystore here'
  },
  {
    src: new URL('/images/raidiam/s1/11.png', import.meta.url).href,
    alt: 'Step 11',
    title: 'Add then copy the JWKs from the URL'
  },
  ]

</script>
