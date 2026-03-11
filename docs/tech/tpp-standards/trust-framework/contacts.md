---
next: false
prev: false
aside: false
---

# Contacts

Organisation Contacts allow Organisations to register specific personnel contact information within the Al Tareq Trust Framework, ensuring that participants from other Organisations can easily reach the appropriate departments of your organisation when needed.

::: warning
The contact details registered here are visible to other participants outside your organisation.
:::

## Contact Types

Each contact must be assigned one of the following types:

| Type | Purpose |
|------|---------|
| **Security** | Security incidents, vulnerability disclosures, and certificate issues |
| **Billing** | Commercial and billing enquiries |
| **Incident** | Operational incidents and service disruptions |
| **Technical** | Technical integration and API support |
| **Business** | General business and partnership enquiries |

Each contact requires an **email address** and a **phone number**.

## Adding an Organisation Contact

1. Log in to the Trust Framework and navigate to your organisation.
2. Navigate to the **Contacts** section of your organisation.
3. Click **+ New Contact**.
4. Select the Contact Type and enter the email address and phone number of the contact.
5. Save the contact.

 <ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>

  
<script setup>
const images1 =  [
  {
    src: new URL('/images/raidiam/add-contact/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Contacts Section'
  },
  {
    src: new URL('/images/raidiam/add-contact/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Add Contact'
  },
]
</script>