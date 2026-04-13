---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

<!--@include: ../../tpp-standards/trust-framework/_shared/application.md-->




## Applications you will need

As an LFI you will need at least two applications registered in the Trust Framework.

### C3-hh-cm-client

This is the client your LFI uses to make requests to the API Hub's [Headless Heimdall Auth Server](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall) and [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/) — for example to call [`GET /auth`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth), [`POST /auth/{interactionId}/doConfirm`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm), or [`PATCH /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId). It must be assigned the **LFI role only**. Because this client is used solely to communicate with the API Hub and never redirects end users, the redirect URI and logo are not significant.

<ImageViewer
  src="/images/ozone/hub/c3.png"
  alt="C3"
/>

### TPP test client

This is a separate application that acts as a TPP, allowing you to test end-to-end flows and make requests to the API Hub as a TPP would.

::: info
This section covers the **C3-hh-cm-client** only. For guidance on creating your TPP test client, see the TPP Standards documentation:
- [Creating an Application](/tech/tpp-standards/trust-framework/creating-an-application)
- [Getting Started](/tech/tpp-standards/v2.1/getting-started/)
:::


## Application Details

Each application must include the following details:

| Feature | Description | C3-hh-cm-client Example | TPP Test Client Example |
|---------|-------------|------------------------|------------------------|
| **Roles** | Functional roles assigned to the application, inherited from the parent organisation's registered roles. | `LFI` | `BDSP`, `BSIP` |
| **Client Name** | The public-facing name of the application as registered in the Trust Framework. | `c3-hh-cm-client` | `My LFI Test TPP` |
| **Version** | The current version of the application or software statement. | `1.0.0` | `1.0.0` |
| **Federation Entity Management Type** | Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). | `federation-managed` | `federation-managed` |
| **Logo** | A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. | Not used can be set to anything | Displayed to the PSU during consent authorization |
| **Redirect URI** | Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication.<br><br>More information on Mobile app [Redirect URIs](../trust-framework/redirect-uri) | Not used can be set to anything | Required — e.g. `https://testapp.example.com/callback` |