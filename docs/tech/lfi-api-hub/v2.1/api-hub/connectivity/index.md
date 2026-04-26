---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# API Hub Connectivity & Certificates

This page describes the network architecture of the API Hub and the certificates that secure communication between all parties in the ecosystem.

## Network Architecture

The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI's infrastructure.

<ImageViewer
  src="/images/ozone/hub/connectivity.png"
  alt="API Hub connectivity diagram showing certificate placement across TPP, API Hub, and LFI networks"
/>

All connections between the API Hub and external parties use **mutual TLS (mTLS)**. Each certificate has a specific role in securing a particular connection path. The certificates are created and stored within the Trust Framework, and the private keys are held by the party responsible for that connection.

The sequence diagram below shows which certificate secures each direction of traffic between the TPP, the API Hub, and the LFI's Ozone Connect backend.

<APIFlowViewer title="Certificates per connection">
  <APIFlowsConnectivityCertificates/>
</APIFlowViewer>

## Connection Paths

### TPP to API Hub

| Connection | Certificate | Description |
|------------|-------------|-------------|
| TPP → API Hub | **C1** (TPP client cert) | The TPP presents its client certificate to identify itself to the API Hub. |
| API Hub → TPP | **S1** (API Hub server cert) | The API Hub presents this server certificate to identify the LFI's API Hub instance to the TPP. |
| Request signing | **Sig1** | The TPP signs request JWTs (e.g. PAR request objects and private_key_jwt client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP's JWKS. |
| Response signing | **Sig2** | The API Hub signs responses and `id_token` payloads sent to the TPP. The TPP verifies using the public key in the JWKS. |

### API Hub to LFI (Ozone Connect)

| Connection | Certificate | Description |
|------------|-------------|-------------|
| API Hub → LFI | **C4** (API Hub client cert) | The API Hub presents this client certificate when calling the LFI's Ozone Connect endpoints. |
| LFI → API Hub | **S4** (LFI server cert) | The LFI's Ozone Connect server presents this certificate to identify itself to the API Hub. |
| Request signing (JWT Auth) | **Sig3** | The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth) is selected. |
| Response signing (JWT Auth) | **Sig4** | The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected. |

### LFI to API Hub (Consent Manager & Headless Heimdall)

| Connection | Certificate | Description |
|------------|-------------|-------------|
| LFI → API Hub | **C3** (LFI client cert) | The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server. |
| API Hub → LFI | **S3** (API Hub server cert) | The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI. |
| Request signing (JWT Auth) | **Sig4** | The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected. |
| Response signing (JWT Auth) | **Sig3** | The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected. |

### Payload Encryption

Payload encryption is separate from transport: **Enc1** and **Enc2** are JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each one is used.

<APIFlowViewer title="Payload encryption flows">
  <APIFlowsConnectivityEncryption/>
</APIFlowViewer>

| Certificate | Description |
|-------------|-------------|
| **Enc1** (LFI encryption key) | Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key. |
| **Enc2** (TPP encryption key) | Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key. |

## Certificate Summary

The table below summarises all certificates, who holds the private key, and where the certificate is created in the Trust Framework.

| Certificate | Type | Private Key Held By | Trust Framework Location | Purpose |
|-------------|------|:-------------------:|--------------------------|---------|
| **S1** | Server Transport | Ozone | LFI's organisation | Identifies the LFI's API Hub instance to TPPs |
| **S3** | Server Transport | Ozone | LFI's organisation | Identifies the CM & HH servers to the LFI |
| **S4** | Server Transport | LFI | LFI's organisation | Identifies the LFI's Ozone Connect server to the API Hub |
| **C1** | Client Transport | TPP | TPP's organisation | Identifies the TPP when calling the API Hub |
| **C3** | Client Transport | LFI | LFI's organisation (`C3-hh-cm-client` application) | Identifies the LFI when calling CM & HH |
| **C4** | Client Transport | Ozone | Ozone's organisation | Identifies the API Hub when calling Ozone Connect |
| **Sig1** | Signing | TPP | TPP's organisation | Signs TPP request JWTs (e.g. PAR request objects, private_key_jwt) |
| **Sig2** | Signing | Ozone | LFI's organisation | Signs API Hub responses and `id_token` sent to TPPs |
| **Sig3** | Signing | Ozone | Ozone's organisation | Signs JWT Auth headers on API Hub requests/responses to the LFI |
| **Sig4** | Signing | LFI | LFI's organisation (`C3-hh-cm-client` application) | Signs JWT Auth headers on LFI requests/responses to the API Hub |
| **Enc1** | Server Encryption | LFI | LFI's organisation | Encrypts PII — only the LFI can decrypt |
| **Enc2** | Client Encryption | TPP | TPP's organisation | Encrypts webhook event payloads — only the TPP can decrypt |

::: info Trust Framework certificate types
When creating these certificates in the Trust Framework, select the following types:

- **C1, C3, C4** — `OPF UAE CLIENT TRANSPORT`
- **S1, S3, S4** — `OPF UAE SERVER TRANSPORT`
- **Sig1, Sig2, Sig3, Sig4** — `OPF UAE CLIENT SIGNING`
- **Enc1** — `SERVER ENCKEY`
- **Enc2** — `OPF UAE CLIENT ENCRYPTION`
:::

::: info Sig3 and Sig4
The **Sig3** and **Sig4** certificates are only required when [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth) is selected as the application layer authentication method.
:::

## Who Does What

### Ozone-held certificates (S1, S3, Sig2, C4, Sig3)

For certificates where **Ozone holds the private key**, the process is:

1. Ozone generates the private key and a Certificate Signing Request (CSR).
2. **For S1, S3, and Sig2**: Ozone provides the CSR to the LFI. The LFI uploads the CSR to their own organisation in the Trust Framework to generate the certificate, then provides the JWKS URL and KID back to Ozone.
3. **For C4 and Sig3**: These certificates are in Ozone's own Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI for these certificates.

### LFI-held certificates (C3, S4, Sig4, Enc1)

For certificates where the **LFI holds the private key**, the process is:

1. The LFI generates the private key and CSR.
2. **For C3 and Sig4**: The LFI creates the certificate in the `C3-hh-cm-client` application in the Trust Framework. See [Creating the C3-hh-cm-client Application](/tech/lfi-api-hub/trust-framework/creating-c3-application) and [Keys & Certificates](/tech/lfi-api-hub/trust-framework/certificates/).
3. **For S4 and Enc1**: The LFI creates the certificate under Organisation Certificates in the Trust Framework.
4. The LFI provides the JWKS URL and KID to Ozone.

::: tip Certificate reuse across brands
If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates if appropriate.
:::

## Next Steps

- [Environment Specific Configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/) — the onboarding form where all certificate details are exchanged
- [Application Layer Authentication](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth) — choose your application layer authentication method (determines whether Sig3/Sig4 are required)
- [Keys & Certificates](/tech/lfi-api-hub/trust-framework/certificates/) — how to generate keys and upload CSRs in the Trust Framework
