---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Walkthrough – Creating an API Resource

This walkthrough covers registering an API resource under your server. You must have an [server already created](../creating) before following these steps.


## Step 1 – Navigate to your Authorisation Server

1. Sign in to the Trust Framework directory.
2. Navigate to your **Organisation**.
3. Click into the Server we are adding the APIs to
4. Open the **API Resources** section.
5. Click **+ New API Resource**.

<ClientOnly>
    <Carousel :images="images1" />
</ClientOnly>


## Step 2 – Create the API Resource

1. From the **API Family** dropdown, select the family that corresponds to the API you are registering. The following API families are available:
   - **Account Information** (`account-information`) — banking data sharing
   - **Payment Initiation** (`payment`) — domestic single and multi-payments
   - **Confirmation of Payee** (`confirmation`) — payee name verification
   - **ATM** (`atm`) — ATM location data
   - **Products & Leads** (`product`) — product catalogue and lead generation

   For full details on what each family contains, including the endpoints and their mappings, see the [API Resources Overview](./).

2. Set the **API Version** (e.g. `2.1`).
3. Click **Save**. The resource now appears in your **Active API Resources** list.

<ClientOnly>
    <Carousel :images="images2" />
</ClientOnly>

If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–2 for each family. Each family MUST be registered as a separate API resource.


## Step 3 – Add API Discovery Endpoints

Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can discover and call your APIs.

1. Click the actions menu on the API resource and select **+ Add API Discovery Endpoints**.
2. Enter the **API Base URL**. The format is always your API Hub resource server:

   | Environment | Base URL |
   |-------------|----------|
   | Pre-production | `https://rs1.{LFICODE}.preprod.apihub.openfinance.ae` |
   | Production | `https://rs1.{LFICODE}.apihub.openfinance.ae` |

   Replace `{LFICODE}` with your institution's LFI code.

3. Click **Generate Endpoints**. The system will populate the list of available endpoints for this API family.
4. Tick all the endpoints you support. Check all endpoints are correct, then click **Save**.

::: info API Hub Default Endpoints
Some endpoints are served directly by the API Hub and do not call your Ozone Connect server — for example, `/account-information/v2.1/account-access-consents`. These endpoints MUST always remain ticked. See the [API Resources Overview](./) for which endpoints are marked as **API Hub default**.
:::

<ClientOnly>
    <Carousel :images="images3" />
</ClientOnly>

The endpoints are now published to your server entry in the Trust Framework. TPPs can discover them via the [API Discovery](/tech/tpp-standards/trust-framework/api-discovery) process.


## Verifying Registration

You can verify that your API resource is correctly registered by calling the Trust Framework API:

[`GET /organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources`](/tech/lfi-api-hub/trust-framework/api/api-resources)

This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory.

<script setup>
const images1 = [
  {
    src: new URL('/images/raidiam/add-api/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/add-api/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into Servers'
  },
  {
    src: new URL('/images/raidiam/add-api/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click into the Server we are adding the APIs to'
  },
  {
    src: new URL('/images/raidiam/add-api/4.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Click API Resources'
  },
  {
    src: new URL('/images/raidiam/add-api/5.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Click + New API Resource'
  },
]

const images2 = [
  {
    src: new URL('/images/raidiam/add-api/6.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Select API Family'
  },
  {
    src: new URL('/images/raidiam/add-api/7.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Set API Version'
  },
  {
    src: new URL('/images/raidiam/add-api/8.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click Save — the resource appears in Active API Resources'
  },
]

const images3 = [
  {
    src: new URL('/images/raidiam/add-api/10.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click the actions menu and select Add API Discovery Endpoints'
  },
  {
    src: new URL('/images/raidiam/add-api/11.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Enter the API Base URL and click Generate Endpoints'
  },
  {
    src: new URL('/images/raidiam/add-api/12.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'API Base URL format — https://rs1.{LFICODE}.apihub.openfinance.ae'
  },
  {
    src: new URL('/images/raidiam/add-api/14.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Tick all supported endpoints | he example shown is v2.1 account-information with all endpoints ticked'
  },
  {
    src: new URL('/images/raidiam/add-api/13.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Confirm all endpoints are correct and click Save'
  },
]
</script>
