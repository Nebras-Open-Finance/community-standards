---
next: false
prev: false
aside: false
---

🕒 **5 minute read**



# Walkthrough – Creating the C3-hh-cm-client Application



### Step 1 – Navigate to '+ New Application'

1. Navigate to your organisation.
2. Open the **Applications** section.
3. Click **+ New Application**.

<ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>

### Step 2 – Select the application roles

::: danger LFI role only
Assign the **LFI role only** to this client. It must not be assigned any TPP roles.
:::

1. Select the **LFI role**. This client is used solely to make requests to the API Hub on behalf of your LFI and must not be assigned TPP roles.

<ClientOnly>
    <Carousel :images="images2" />
  </ClientOnly>

### Step 3 – Provide the Client Details

1. **Client Name** — enter a clear name that identifies this client as your C3-hh-cm-client (e.g. `C3-hh-cm-client`).
2. **Software Version** — enter a version for your software (e.g. `1.0.0`).
3. **Logo** — a logo is required by the form. Because this client is never used in a user-facing redirect flow, the logo will not be displayed to end users; any valid image will suffice.
4. **Federation** — we recommend setting **Federation** to **Enabled** and **Federation Entity Management Type** to **Managed**. This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so the API Hub can discover and validate your client without manual configuration.

<ClientOnly>
    <Carousel :images="images3" />
  </ClientOnly>


### Step 4 – Provide the Redirect URI

1. A redirect URI is required by the form. Because this client is never used in an authorisation flow with an end user, it will not be called; any valid HTTPS URI will suffice (e.g. `https://localhost/callback`).

<ClientOnly>
    <Carousel :images="images4" />
  </ClientOnly>


### Step 5 – Finish creating the application

1. Click through to **Create** and register the application.

## Your Client ID

Once your application is created, the Trust Framework assigns it a **Client ID** — a UUID that permanently identifies this application. You will use this value as `client_id`, `iss`, and `sub` in every JWT keep a note of it.

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
    src: new URL('/images/raidiam/add-application/lfi-role.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the LFI role',
    tagline: 'Assign the LFI role only. Roles available are inherited from the organisation.'
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
    title: 'Provide a redirect URI',
    tagline: 'A value is required but will not be used — any valid HTTPS URI is acceptable.'
  }
  ]

</script>
