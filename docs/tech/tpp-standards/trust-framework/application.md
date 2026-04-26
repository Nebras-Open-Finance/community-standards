---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

<!--@include: ./_shared/application.md-->

## Application Details

Each application must include the following details:

| Feature | Description | Example |
|---------|-------------|---------|
| **Roles** | Functional roles assigned to the application, inherited from the parent organisation's registered roles. | `BSIP`, `BDSP` |
| **Client Name** | The public-facing name of the application as registered in the Trust Framework. | `MyApp v1` |
| **Version** | The current version of the application or software statement. | `1.0.3` |
| **Federation Entity Management Type** | Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). | `federation-managed` |
| **Logo** | A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. | `logo.png` |
| **Redirect URI** | Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication.<br><br>More information on Mobile app [Redirect URIs](../trust-framework/redirect-uri) | `https://app.example.com/callback` |