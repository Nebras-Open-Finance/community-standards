---
next: false
prev: false
aside: false
---

# Adding Users

Organisation Administrators can onboard Users.

## User Types

The following user types are supported on the Trust Framework:

| User Type | Access Scope |
|-----------|-------------|
| **Primary Technical Contact (PTC)** | Can manage all technical resources of an Organisation — Applications and Certificates. |
| **Secondary Technical Contact (STC)** | Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates. |
| **Primary Business Contact (PBC)** | Can manage Contacts in the Organisation. Cannot manage Technical Resources. |
| **Secondary Business Contact (SBC)** | Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework. |

::: info Sandbox only
Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox TrustFramework (https://web.sandbox.directory.openfinance.ae/). Is recommended if the user only needs access to the Nebras Jira Service Desk  via Trust Framework SSO.
:::

## Primary Technical Contact (PTC)

The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications.

This includes:

- Creating and configuring applications
- Managing certificates (Transport, Signing, and Encryption) for each application
- Keeping keys and certificates current and renewing them before expiry
- Ensuring applications have the correct roles and redirect URIs configured

See [Applications](./application) for more on creating and managing applications, and [Keys & Certificates](./certificates/) for certificate management.

## Inviting a User

1. Log in to the Trust Framework and navigate to the **Roles** section within your organisation.
2. Select any TPP role — **BSIP**, **BDSP**, or **IDSP**.

::: tip
Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role.
:::

3. Navigate to the **Domain Users** tab.
4. Click **+ New Domain User**.
5. Select the System as **AlTareq Trust Framework** and select the relevant user role — **PTC**, **PBC**, **STC**, or **SBC**.
6. Enter the new user's email address and confirm.

The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see [Sign Up](./user-sign-up).

::: tip
If a user does not receive the invitation email, ask them to check their spam folder.
:::


 <ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>

  
<script setup>
const images1 =  [
  {
    src: new URL('/images/raidiam/add-user/roles.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Roles Section'
  },
   {
    src: new URL('/images/raidiam/add-user/roles-2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Roles Section'
  },
    {
    src: new URL('/images/raidiam/add-user/role-bsip.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Role BSIP'
  },
  {
    src: new URL('/images/raidiam/add-user/role-bsip-2.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Role BSIP (Domain Users)'
  },
   {
    src: new URL('/images/raidiam/add-user/role-bsip-new-user.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'New Domain User'
  }
]
</script>