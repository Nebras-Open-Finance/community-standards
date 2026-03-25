---
next: false
prev: false
aside: false
---

🕒 **5 minute read**



# Walkthrough – Creating an Application



### Step 1 – Navigate to '+ New Application'

1. Navigate to your organisation.
2. Open the **Applications** section.
3. Click **+ New Application**.

<ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>

### Step 2 – Select the application roles

1. Select the roles for your application. Roles define what the application is permitted to do. You can assign multiple roles, but only roles that are already assigned to your organisation are available for selection.

<ClientOnly>
    <Carousel :images="images2" />
  </ClientOnly>

### Step 3 – Provide the Client Details

1. **Client Name** — enter a clear, human-readable name that identifies this application (e.g. `My TPP – Production`). This name may be visible to users during consent flows.
2. **Software Version** — enter the version of your software (e.g. `1.0.0`). Use a consistent versioning scheme so you can distinguish between releases in the directory.
3. **Logo** — upload a clear, recognisable logo. This image is shown to users on the redirect screen when returning from an LFI, so it should accurately represent the application to a User.
4. **Federation** — we recommend setting **Federation** to **Enabled** and **Federation Entity Management Type** to **Managed**. This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so LFIs can discover and validate your client without manual configuration.

<ClientOnly>
    <Carousel :images="images3" />
  </ClientOnly>


### Step 4 – Provide the Redirect URI

1. Enter the **Redirect URI** — the HTTPS endpoint(s) in your application that the LFI will redirect the user back to after authentication or authorisation. The `redirect_uri` sent in the [PAR request](/tech/tpp-standards/security/fapi/request-jwt#payload-claims) must exactly match one of the values registered here.

::: info
You can register multiple redirect URIs if your application requires them (e.g. separate URIs for different environments). See [Redirect URIs](/tech/tpp-standards/trust-framework/redirect-uri) for full guidance.
:::

<ClientOnly>
    <Carousel :images="images4" />
  </ClientOnly>


### Step 5 – Add Webhook URIs (optional)

If your application will receive event notifications via webhooks (e.g. consent or payment status updates), enter one or more **API Webhook URIs**. These work in the same way as redirect URIs — multiple values are allowed, and the `subscription.Webhook.Url` in each consent must exactly match one of the values registered here. If you are not using webhooks, leave this field blank. See [Webhooks](/tech/tpp-standards/v2.1/webhooks/) for full guidance.

<ClientOnly>
    <Carousel :images="images5" />
  </ClientOnly>


### Step 6 – Finish creating the application

1. Click through to **Create** and register the application.

## Your Client ID

Once your application is created, the Trust Framework assigns it a **Client ID** — a UUID that permanently identifies this application. You will use this value as `client_id`, `iss`, and `sub` in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it.

<ImageViewer
  src="/images/raidiam/client_id_spotlight.png"
  alt="Client ID location in the Trust Framework application detail page"
/>

::: tip Where to find it later
Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application.
:::



<script setup>

const images1 = [
  {
    src: new URL('/images/raidiam/add-application/click-org.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/add-application/click-app.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into applications'
  },
  {
    src: new URL('/images/raidiam/add-application/new-app.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click + New Application'
  }]

  const images2 = [
  {
    src: new URL('/images/raidiam/add-application/role.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the roles of the Application',
    tagline: 'Note roles that can be selected for an Application are inherited from the organisation.'
  },
  ]

  const images3 = [
  {
    src: new URL('/images/raidiam/add-application/client.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Provide the details of the client',
    tagline: 'Client Name, Client Logo & Software Version & Federation Entity Management Type'
  },
  ]

  const images4 = [
  {
    src: new URL('/images/raidiam/add-application/auth.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'Provide user authentication details',
    tagline: `More information on <a href="../trust-framework/redirect-uri/">Redirect URIs</a>`
  }
  ]

  const images5 = [
    {
    src: new URL('/images/raidiam/add-application/webhook.png', import.meta.url).href,
    alt: 'Step 7',
    title: 'Optional add an API Webhook URI',
    tagline: 'Note the Client ID, as it will be required for all requests made by this client.'
    }
]

</script>




