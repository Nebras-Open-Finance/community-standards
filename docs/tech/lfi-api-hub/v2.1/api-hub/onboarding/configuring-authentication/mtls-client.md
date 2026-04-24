---
next: false
prev: false
aside: false
---

# Configuring Outbound mTLS

This page describes how the LFI MUST configure outbound mutual TLS (mTLS) when its authorisation server calls the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints during consent and authorisation flows.


## 1. Why the LFI MUST configure outbound mTLS

Every request from the LFI to the API Hub's Consent Manager or Headless Heimdall Auth Server is a mutual TLS connection in which the LFI presents the **C3** transport client certificate. The API Hub rejects any call to these endpoints that does not present a valid C3 certificate.

The LFI's outbound HTTP client — typically the authorisation server application that orchestrates consent — MUST be configured to:

1. **Present** the C3 client certificate and its private key on every outbound connection, and
2. **Trust** the API Hub's server certificate chain so the TLS handshake succeeds.


## 2. Trust Framework Certificate Authorities

Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment pairs with a distinct Trust Framework:

- **Production** API Hub → **Production** Trust Framework
- **Pre-production** API Hub → **Sandbox** Trust Framework

The Root and Issuing CA details for each environment are documented on [Configuring Inbound mTLS — Section 2](./mtls-server#_2-trust-framework-certificate-authorities). The same CA bundle assembled for inbound mTLS is re-used on the outbound direction.


## 3. Configuring your outbound HTTP client

Outbound mTLS configuration has two parts:

1. **Present the C3 client certificate** so the API Hub accepts the TLS handshake and can identify your organisation.
2. **Trust the API Hub's server chain** so the handshake completes and your client does not fall back to an untrusted state.

### 3a. Present the C3 client certificate

The C3 transport client certificate is created inside the `C3-hh-cm-client` Application in your Trust Framework Organisation. The same Application also holds the **Sig4** signing certificate used for [JWT Auth — Client-side](./jwt-client) when JWT Auth is enabled on the LFI → Hub direction.

1. In your Trust Framework Organisation, open the **`C3-hh-cm-client`** Application.
2. Create (or reuse) the **C3** transport client certificate, following the code snippets provided in the Trust Framework.
3. Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12).
4. Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints.

::: warning Per-environment certificates
The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework. Do not share key material between environments.
:::

The C3 certificate subject — specifically its `OU` and `O` — also determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled. See [JWT Auth — Client-side](./jwt-client) for how the subject binds the transport and application layers.

### 3b. Trust the API Hub's server chain

::: warning Open question
This section depends on whether the API Hub's Consent Manager and Headless Heimdall endpoints present a Trust Framework-issued server certificate or a commercial (public Web PKI) certificate. Confirm with Ozone before finalising.
:::

If the API Hub presents a **Trust Framework-issued** server certificate, the LFI's outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust anchor. This is the same bundle assembled for [Configuring Inbound mTLS — Section 3a](./mtls-server#_3a-trust-the-ca-bundle).

If the API Hub presents a **commercial** server certificate, most HTTP clients will validate it against the operating-system trust store without any LFI-side configuration. In that case no additional trust setup is required beyond ensuring the OS trust store is up to date.


## 4. Verification

Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is only considered set up for an environment once your authorisation server can successfully:

1. Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and
2. Establish a mutual TLS session with the Headless Heimdall Auth Server presenting the same C3 certificate.

If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected.
