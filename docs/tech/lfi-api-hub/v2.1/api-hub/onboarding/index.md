---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# API Hub Onboarding

This section covers the end-to-end process for onboarding your institution to the **API Hub**. Onboarding is managed through the **Nebras Service Desk** and involves providing configuration details, exchanging certificates, and provisioning your API Hub instance.

## Prerequisites

Before you can begin API Hub onboarding, the following MUST be in place:

1. **Trust Framework registration** — Your organisation MUST be onboarded to the appropriate Trust Framework environment:
   - **Pre-production** API Hub → [Sandbox Trust Framework](https://web.sandbox.directory.openfinance.ae/)
   - **Production** API Hub → [Production Trust Framework](https://web.directory.openfinance.ae/)

   See [Trust Framework Onboarding](/tech/lfi-api-hub/trust-framework/onboarding) for details.

2. **Primary Technical Contact (PTC)** — A Primary Technical Contact MUST have been registered for your organisation so that applications, servers, and certificates can be created in the Trust Framework. The PTC is responsible for managing the technical connectivity between your institution and the API Hub.

## Requesting API Hub Onboarding

To begin onboarding, send the following email to [support@nebrasopenfinance.ae](mailto:support@nebrasopenfinance.ae):

::: info Email template

**To:** [support@nebrasopenfinance.ae](mailto:support@nebrasopenfinance.ae)

**Subject:** API Hub Onboarding Request — [Your Organisation Name] — [Environment]

---

Dear Nebras Support,

I wish to begin API Hub onboarding for the following:

- **Organisation:** [Your Organisation Name]
- **Environment:** [Pre-production / Production]
- **Primary Technical Contact (PTC):** [Name and email of the PTC who will manage the technical connectivity]

Please raise the onboarding tickets and provide the next steps.

:::

Once received, the Nebras support team will raise **JIRA tickets** to track each stage of the onboarding process.

## Onboarding Steps

API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service Desk ticket.

### 1. Prerequisites Questionnaire

You will be asked to provide organisational details, infrastructure information, and your preferred configuration options. This information is used to provision your API Hub instance.

See [Prerequisites](./prerequisites) for the full list of fields.

### 2. Application Layer Authentication

You MUST select an application layer authentication method to secure communication between the API Hub and your Ozone Connect endpoints. The available methods are:

- mTLS Only
- API Key
- Client Credentials Grant
- **JWT Auth** (recommended)

See [Application Layer Authentication](./application-layer-auth) for a comparison of methods, and [Configuring Authentication](./configuring-authentication/mtls-server) for implementation guidance on the mTLS and JWT Auth layers.

### 3. Environment-Specific Configuration

You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be completed **separately for each environment** (pre-production and production).

See [Environment-Specific Configuration](./environment-specific/) for the full list of fields and certificate details.

## After Onboarding

Once your API Hub is provisioned and configured, you will need to:

1. **Publish your API Hub as a server** in the Trust Framework so that TPPs can discover your institution. See [Creating a Server](/tech/lfi-api-hub/trust-framework/servers/creating).
2. **Implement your Ozone Connect endpoints**
