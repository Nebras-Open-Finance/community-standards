---
next: false
prev: false
aside: false
---


🕒 **3 minute read**

# TPP Management & Activation

The **TPP Management** section of the Admin Portal is where you manage all TPPs that have registered with your API Hub. It contains three sub-sections: **TPP List**, **Software Statements**, and **Clients**.

All three levels — TPP, software statement, and client — MUST be active for a TPP to make API requests. If any one of the three is blocked, the TPP's requests will be rejected.

## Viewing registered TPPs

The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry represents an organisation from the Trust Framework. A single TPP organisation may have multiple software statements (applications) and multiple clients.

<!-- TODO: Add screenshot of the TPP List page -->
::: tip Image placeholder
*Screenshot: TPP Management > TPP List showing registered TPP organisations and their status*
:::

::: info Ozone Health Probe
You will see **Ozone** listed as an active TPP. This is an automated health monitoring client that periodically tests your API Hub. It SHOULD remain active. If the health probe's requests are causing any issues, contact Nebras before blocking the client.
:::

## Activating a TPP

After a TPP has registered with you — after the `/tpp-registration` endpoint is called successfully (for detail on how a TPP registers, see [Registration API Guide](/tpp/tech-standards/registration/api-guide)) — the TPP is not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access to be granted.

The activation is done in three steps and **MUST be performed in this order.**

### Step 1 - Activate the TPP

 <ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>



### Step 2 - Activate the Software Statement

<ClientOnly>
    <Carousel :images="images2" />
  </ClientOnly>



### Step 3 - Activate the Client

<ClientOnly>
    <Carousel :images="images3" />
  </ClientOnly>




## Blocking a TPP

In certain circumstances, Nebras may instruct an LFI to block a TPP — for example, if a TPP is consistently sending malformed requests and is unresponsive to communications. Blocking can be applied at any of the three levels:

- **Block the client** — immediately stops requests from that specific client
- **Block the software statement** — stops all clients under that software statement
- **Block the TPP** — stops all software statements and clients for the entire TPP organisation

To block, navigate to the relevant entity (TPP, software statement, or client), open its detail page, and click **Block**.

To restore access, open the blocked entity and click **Activate**.

::: warning Do not block without instruction
Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If you observe issues with a specific TPP's traffic, raise it with Nebras first. In cases where the Central Bank revokes a TPP's licence, Nebras will remove the TPP from the ecosystem centrally — no LFI action is required.
:::

<!-- TODO: Add screenshot of the Block confirmation dialog -->
::: tip Image placeholder
*Screenshot: Client detail page showing the Block button and confirmation dialog*
:::

<script setup>
const images1 =  [
  {
    src: new URL('/images/ozone/admin-portal/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Go to TPP Management > TPP List > Click on the TPP name'
  },
   {
    src: new URL('/images/ozone/admin-portal/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click on the Activate TPP button'
  },
   {
    src: new URL('/images/ozone/admin-portal/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click on Activate TPP to confirm'
  },
]

const images2 =  [
  {
    src: new URL('/images/ozone/admin-portal/4.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Go to TPP Management > Software Statement > Click on the Software Statement name'
  },
   {
    src: new URL('/images/ozone/admin-portal/5.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click on the Activate button'
  },
   {
    src: new URL('/images/ozone/admin-portal/6.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click on Activate to confirm'
  },
]

const images3 =  [
  {
    src: new URL('/images/ozone/admin-portal/7.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Go to TPP Management > Clients > Click on the Client name'
  },
   {
    src: new URL('/images/ozone/admin-portal/8.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click on the Activate button'
  },
   {
    src: new URL('/images/ozone/admin-portal/9.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click on Activate to confirm'
  },
]
</script>
