---
next: false
prev: false
aside: false
---


🕒 **4 minute read**

# Trust Framework

The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client onboarding, and client authentication.

The **Sandbox Trust Framework** can be accessed at the following link: 

- Web Application : https://web.sandbox.directory.openfinance.ae/  
- OIDC Discovery API : https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration

The **Production Trust Framework** can be accessed at the following link: 

- Web Application : https://web.directory.openfinance.ae/
- OIDC Discovery API :https://auth.directory.openfinance.ae/.well-known/openid-configuration

## Core Functions of the Trust Framework:

**Trust Anchors**
Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem.

**API Portal for Discovery**
Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem.

**Keystore**
Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust—an essential foundation for secure data sharing.

**Public Key Infrastructure (PKI)**
Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform.



## Organizations in the Trust Framework:

All organizations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorized organizations in the ecosystem.

Organizations are classified according to their role:

Licensed Financial Institutions (LFIs) provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorized participants.

Third Party Providers (TPPs) consume the capabilities made available through Open Finance. For example, a fintech organization such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions.


  <ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>


<script setup>

const images1 = [
  {
    src: new URL('/images/raidiam/organizations/all.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'All organizations within the Trust Framework can be viewed in the directory.'
  },
  {
    src: new URL('/images/raidiam/organizations/lfi.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'By selecting an organization, you can see whether it is designated as an LFI.'
  },
  {
    src: new URL('/images/raidiam/organizations/tpp.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Alternatively, the organization may be designated as a TPP.'
  }
]

</script>

Where permitted by their regulatory license, an LFI may also operate in the capacity of a TPP. In such cases, the organization retains its LFI classification within the Trust Framework while exercising TPP capabilities.