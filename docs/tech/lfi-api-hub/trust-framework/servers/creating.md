---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Walkthrough – Creating a Server

This walkthrough covers publishing your API Hub as a server in the Trust Framework. You MUST complete this before registering API resources or being discoverable by TPPs.

::: info Prerequisites
Before creating a server:
- Your organisation MUST be onboarded to the Trust Framework with the necessary admin permissions. See [Onboarding](../onboarding) if you have not yet completed this step.
- Your API Hub MUST be provisioned and you MUST have received your [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/), including your well-known discovery document URI.
:::


## Step 1 – Obtain Your Issuer

Before creating the server entry, retrieve the `issuer` value from your API Hub's well-known discovery document. The discovery document URI is provided as part of your [environment-specific onboarding configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/).

Open the discovery document URI in a browser or HTTP client and locate the `issuer` field. You will need this value in Step 3.


## Step 2 – Navigate to your Organisation

1. Sign in to the Trust Framework directory.

::: warning Environment Mapping
Ensure you are creating the server in the correct Trust Framework environment:
- **Pre-production** API Hub → **Sandbox** Trust Framework (`web.sandbox.directory.openfinance.ae`)
- **Production** API Hub → **Production** Trust Framework (`web.directory.openfinance.ae`)
:::


2. Navigate to your **Organisation**.
3. Open the **Auth Servers** section.
4. Click **+ New Server**.

<ClientOnly>
    <Carousel :images="images1" />
</ClientOnly>




## Step 3 – Provide the Server Details

Fill in the required fields. These values are published in the directory and are visible to TPPs.

| Field | Guidance |
|-------|----------|
| **Customer Friendly Server Name** | A public-facing name that reflects the brand this API Hub supports (e.g. `Acme Bank Retail` or `Acme Bank Business`). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name. |
| **Issuer** | The `issuer` value from your API Hub's well-known discovery document, obtained in Step 1. |
| **Description** | A short description of the Open Finance service (e.g. `Open Finance APIs for Demo Bank's retail customers`). |

<ClientOnly>
    <Carousel :images="images2" />
</ClientOnly>

## Step 4 – Set the Account Type

Indicate the account type(s) supported by this server:

- **Retail** — personal and individual customer accounts
- **SME** — small and medium enterprise accounts
- **Corporate** — corporate and institutional accounts

This allows TPPs to identify which server to use when requesting access to a specific category of accounts.

<ImageViewer
  src="/images/raidiam/add-server/7.png"
  alt="accounttypes"
/>

## Step 5 – Upload the Logo

Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports.

If your institution has multiple API Hubs (e.g. one for retail and one for business), each server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs and PSUs during consent and authorisation journeys.

<ImageViewer
  src="/images/raidiam/add-server/8.png"
  alt="logo"
/>

## Step 6 – Save the Server

1. Skip Additional Details and Server Validity sections.
2. Click **Save** to register the server.
3. Your Server now appears in the Server section of your Organisation.

<ImageViewer
  src="/images/raidiam/add-server/9.png"
  alt="logo"
/>


::: tip Finding your Authorisation Server ID
After creation, your Authorisation Server ID is visible on the server detail page. It is also discoverable to TPPs via the [API Discovery](/tech/tpp-standards/trust-framework/api-discovery) process.
:::


## Next Steps

With your server published, you can now add API resources to describe the APIs your institution exposes:

- [API Resources – Overview](./api/)
- [Creating an API Resource](./api/creating)


<script setup>

const images1 = [
  {
    src: new URL('/images/raidiam/add-server/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/add-server/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into Servers'
  },
  {
    src: new URL('/images/raidiam/add-server/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click + New Server'
  },
]

const images2 = [
  {
    src: new URL('/images/raidiam/add-server/4.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Enter Customer Friendly Server Name'
  },
  {
    src: new URL('/images/raidiam/add-server/5.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Enter Issuer it will be formatted - https://auth1.{LFICODE}.apihub.openfinance.ae'
  },
  {
    src: new URL('/images/raidiam/add-server/6.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Enter the Description'
  },
]
</script>
