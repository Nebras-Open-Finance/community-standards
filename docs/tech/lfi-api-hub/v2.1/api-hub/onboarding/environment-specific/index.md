---
next: false
prev: false
aside: false
---

🕒 **9 minute read**

# Environment Specific Configuration

Each API Hub instance requires environment-specific configuration that is exchanged between the LFI and Ozone during onboarding. This configuration MUST be completed **separately for each environment**:

- **Pre-production** — certificates from the **Sandbox** Trust Framework
- **Production** — certificates from the **Production** Trust Framework

The configuration is submitted via a **Service Desk ticket**. This page describes all the information that is exchanged.

::: warning One form per environment
You MUST complete this process twice — once for pre-production and once for production. All certificates referenced in the pre-production form MUST be created in the Sandbox Trust Framework. All certificates referenced in the production form MUST be created in the Production Trust Framework.
:::

For a full understanding of how each certificate fits into the API Hub network architecture, see [API Hub Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/).


## 1. LFI Information

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| **LFI Legal Name** | LFI | Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production). |
| **LFI Organisation ID** | LFI | Your organisation ID from the Trust Framework organisation page. |


## 2. Domain Names & URLs

### Domain names allocated by Ozone

Ozone allocates domain names for each API Hub instance based on the LFI Code provided during [prerequisites onboarding](/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites).

| Field | Convention (Pre-production) | Convention (Production) |
|-------|----------------------------|------------------------|
| **TPP-facing domain** | `as1.{lfiCode}.preprod.apihub.openfinance.ae` | `as1.{lfiCode}.apihub.openfinance.ae` |
| **TPP-facing resource server** | `rs1.{lfiCode}.preprod.apihub.openfinance.ae` | `rs1.{lfiCode}.apihub.openfinance.ae` |
| **Headless Heimdall** | `hh.{lfiCode}.preprod.apihub.openfinance.ae` | `hh.{lfiCode}.apihub.openfinance.ae` |
| **Consent Manager** | `cm.{lfiCode}.preprod.apihub.openfinance.ae` | `cm.{lfiCode}.apihub.openfinance.ae` |
| **Admin Portal** | `admin.{lfiCode}.preprod.apihub.openfinance.ae` | `admin.{lfiCode}.apihub.openfinance.ae` |

### LFI-specific discovery document

Your API Hub's well-known discovery document will be available at:

```
Pre-production: https://auth1.{lfiCode}.preprod.apihub.openfinance.ae/.well-known/openid-configuration
Production:     https://auth1.{lfiCode}.apihub.openfinance.ae/.well-known/openid-configuration
```

This document exposes your `authorization_endpoint`, `token_endpoint`, `jwks_uri`, and supported parameters. TPPs use it to discover where to redirect their users.

### URLs provided by the LFI

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| **Ozone Connect Base URL** | LFI | The base URL on which your Ozone Connect endpoints are hosted. See [Ozone Connect Base URL](./ozone-connect-url) for details. |
| **Authorisation URL** | LFI | The OIDC authorisation URL for your institution. See [Authorization Endpoint](./auth-endpoint) for details. |

### Values provided by Ozone

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| **Admin Portal URL** | Ozone | The URL to your Admin Portal for this environment. |
| **IP Address** | Ozone | The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints. |

### Optional API family base paths

The onboarding form includes optional base path fields for each API family. If provided, the path is inserted between your [Ozone Connect Base URL](./ozone-connect-url) and the API endpoint — allowing the LFI to route different API families to different path prefixes on the same server.

| API Family | Example Endpoints | Path Effect |
|------------|-------------------|-------------|
| **[Data Sharing](/tech/lfi-api-hub/v2.1/banking/data-sharing/)** | `/accounts`, `/balances`, `/transactions` | `OzoneConnectURL/<path>/accounts` |
| **[Service Initiation](/tech/lfi-api-hub/v2.1/banking/service-initiation/)** | `/domestic-payments`, `/multi-payments` | `OzoneConnectURL/<path>/domestic-payments` |
| **[Products](/tech/lfi-api-hub/v2.1/banking/products-and-leads/)** | `/products`, `/leads` | `OzoneConnectURL/<path>/products` |
| **Consent Events & Notifications** | `/event-notifications` | `OzoneConnectURL/<path>/event-notifications` |
| **[Health Check](/tech/lfi-api-hub/v2.1/health-check/)** | `/hello`, `/hello-mtls`, `/echo-cert` | `OzoneConnectURL/<path>/echo-cert` |

All fields are optional. For any API families without a path specified — either because the field was left blank or because the family does not appear in the form — the API Hub sends requests directly to `OzoneConnectURL/<endpoint>`.

::: tip Example
If the LFI sets the Data Sharing base path to `/retail/data` and their Ozone Connect Base URL is `https://openapi.example.com`, a TPP request for accounts will be forwarded to:

```
https://openapi.example.com/retail/data/accounts
```
:::


## 3. Ozone-Held Transport & Signing Certificates

These are certificates where **Ozone holds the private key**. Ozone generates the private key and CSR. The LFI's role depends on where the certificate is stored:

- **S1, S3, Sig2** — stored in the LFI's Trust Framework organisation. Ozone provides the CSR; the LFI uploads it to their organisation to generate the certificate, then returns the JWKS URL and KID.
- **C4, Sig3** — stored in Ozone's Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI.

### S1 — Transport Server Certificate

Deployed onto the API Hub servers to identify the LFI's API Hub instance to TPPs.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| CSR | Ozone | Ozone provides the CSR for the LFI to upload to their Trust Framework organisation. |
| JWKS URL | LFI | The organisation transport JWKS URL from the Trust Framework after generating the certificate. |
| KID | LFI | The Key ID assigned to this certificate by the Trust Framework. |

**LFI action:** Navigate to your organisation in the Trust Framework → Organisation Certificates → + New Certificate → select **Server Transport** → upload the CSR provided by Ozone → record the KID and JWKS URL. See [Certificate Walkthroughs](./certificate-walkthroughs) for a step-by-step example.

### S3 — Transport Server Certificate

Used by the Consent Manager and Headless Heimdall Auth Server to identify themselves to the LFI.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| CSR | Ozone | Ozone provides the CSR for the LFI to upload. |
| JWKS URL | LFI | The organisation transport JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Same process as S1 — upload the CSR under Organisation Certificates → **Server Transport**.

### C4 — Transport Client Certificate

Used by the API Hub to identify itself to the LFI when calling Ozone Connect endpoints.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| JWKS URL | Ozone | Ozone provides the JWKS URL from their Trust Framework organisation. |
| KID | Ozone | Ozone provides the KID. |

**LFI action:** None — this certificate is in Ozone's organisation. Record the JWKS URL and KID provided by Ozone for your mTLS validation configuration. See [Configuring Inbound mTLS](../configuring-authentication/mtls-server#_3b-pin-to-the-api-hub-s-c4-client) for guidance on pinning your Ozone Connect server to the API Hub's C4 client certificate.

### Sig2 — Signing Certificate

Used by the API Hub to sign responses sent to the TPP, including signed messages from the resource server and the signature on the `id_token`. TPPs verify using the public key in the JWKS.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| CSR | Ozone | Ozone provides the CSR for the LFI to upload. |
| JWKS URL | LFI | The organisation application JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Navigate to Organisation Certificates → + New Certificate → select **Server Signing** → upload the CSR → record the KID and JWKS URL.

### Sig3 — Signing Certificate (JWT Auth only)

Used by the API Hub to sign JWT Auth headers on:
- Ozone Connect requests
- Headless Heimdall responses
- Consent Manager responses

::: info
Sig3 is only required when [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth) is selected as the application layer authentication method.
:::

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| JWKS URL | Ozone | Ozone provides the JWKS URL from their Trust Framework organisation. |
| KID | Ozone | Ozone provides the KID. |

**LFI action:** None — this certificate is in Ozone's organisation.


## 4. LFI-Held Transport & Signing Certificates

These are certificates where the **LFI holds the private key**. The LFI generates the private key and CSR, creates the certificate in the Trust Framework, and provides the JWKS URL and KID to Ozone.

### C3 — Transport Client Certificate

Used by the API Hub to recognise the LFI when the LFI calls the Consent Manager and Headless Heimdall Auth Server.

::: warning Application required
Before creating the C3 certificate, you MUST create the `C3-hh-cm-client` application in the Trust Framework. See [Creating the C3-hh-cm-client Application](/tech/lfi-api-hub/trust-framework/creating-c3-application).
:::

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| Application ID | LFI | The Client ID of the `C3-hh-cm-client` application. |
| JWKS URL | LFI | The application transport JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Create the `C3-hh-cm-client` application (if not already created) → generate a private key and CSR → navigate to the application's App Certificates → + New Certificate → select **Client Transport** → upload the CSR → record the Application ID, KID, and JWKS URL. See [Keys & Certificates](/tech/lfi-api-hub/trust-framework/certificates/) for detailed steps.

### S4 — Transport Server Certificate

Used by the LFI to identify its Ozone Connect server to the API Hub.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| JWKS URL | LFI | The organisation transport JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select **Server Transport** → upload the CSR → record the KID and JWKS URL. See [Certificate Walkthroughs](./certificate-walkthroughs) for a step-by-step example.

### Sig4 — Signing Certificate (JWT Auth only)

Used by the LFI to sign JWT Auth headers on:
- Ozone Connect responses
- Headless Heimdall requests
- Consent Manager requests

::: info
Sig4 is only required when [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth) is selected as the application layer authentication method.
:::

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| JWKS URL | LFI | The application signing JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Generate a private key and CSR → navigate to the `C3-hh-cm-client` application's App Certificates → + New Certificate → select **Client Signing** → upload the CSR → record the KID and JWKS URL.

::: tip Sig4 placement
Sig4 MAY be created either within the `C3-hh-cm-client` application or at the organisation level — this is at the LFI's discretion.
:::


## 5. LFI-Held Encryption Certificate

### Enc1 — Encryption Key

Used by the TPP to encrypt Personally Identifiable Information (PII) sent to the API Hub. The PII payloads are encrypted using the LFI's public key from the JWKS. Only the LFI can decrypt using its private key.

| Field | Provided By | Description |
|-------|:-----------:|-------------|
| JWKS URL | LFI | The organisation application JWKS URL from the Trust Framework. |
| KID | LFI | The Key ID assigned to this certificate. |

**LFI action:** Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select **Server Encryption** → upload the CSR → record the KID and JWKS URL.

::: tip Recommended certificate type
When creating the Enc1 certificate, select the **Server ENCKEY** certificate type. This type does not expire, avoiding the need for periodic rotation of your encryption key.
:::


## Certificate Summary

For a complete overview of all certificates and how they fit into the API Hub network architecture, see [API Hub Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/).

| Certificate | Type | Private Key | LFI Action | TF Location |
|-------------|------|:-----------:|------------|-------------|
| **S1** | Server Transport | Ozone | Upload CSR, return JWKS + KID | Organisation |
| **S3** | Server Transport | Ozone | Upload CSR, return JWKS + KID | Organisation |
| **C4** | Client Transport | Ozone | None — receive JWKS + KID | Ozone's organisation |
| **Sig2** | Server Signing | Ozone | Upload CSR, return JWKS + KID | Organisation |
| **Sig3** | Signing (JWT Auth) | Ozone | None — receive JWKS + KID | Ozone's organisation |
| **C3** | Client Transport | LFI | Generate, create in `C3-hh-cm-client` app | Application |
| **S4** | Server Transport | LFI | Generate, create in organisation | Organisation |
| **Sig4** | Signing (JWT Auth) | LFI | Generate, create in app or organisation | Application or Organisation |
| **Enc1** | Server Encryption | LFI | Generate, create in organisation | Organisation |

::: tip Certificate reuse across brands
If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates.
:::



## Connectivity Validation

Once all certificates have been created and the required details have been added to the Service Desk ticket, Ozone will perform **end-to-end connectivity validation** in both directions:

1. **API Hub to LFI** — The API Hub will make requests to your Ozone Connect endpoints (e.g. the [health check endpoints](/tech/lfi-api-hub/v2.1/health-check/) `/hello`, `/hello-mtls`, `/echo-cert`) to verify that transport certificates, network routing, and application layer authentication are correctly configured.
2. **LFI to API Hub** — Your integration will make requests to the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints to verify that mTLS and application layer authentication are correctly configured in the reverse direction.

::: warning Ticket closure
The environment-specific onboarding ticket will only be closed once connectivity has been successfully established in **both directions**. If validation fails, the Service Desk ticket will remain open and the support team will work with you to resolve any issues.
:::
