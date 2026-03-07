---
next: false
prev: false
aside: false
---


🕒 **3 minute read**

# Activating a TPP

After a TPP has registered with an you after the `/tpp-registration` endpoint is called successfully (for detail how a TPP registers this please see [Registration API Guide](/tech/tpp-standards/registration/api-guide)).

The TPP is not automatically granted access. The LFI must activate the TPP within their API Hub Admin Portal for access to be granted. 

The activation is done in three steps and **has to be performed in this order.**

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
