<route lang="yaml">
meta:
  title: Trust Framework — Adding Users
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-user/roles.png', import.meta.url).href, alt: 'Step 1', title: 'Roles Section' },
  { src: new URL('/images/raidiam/add-user/roles-2.png', import.meta.url).href, alt: 'Step 2', title: 'Roles Section' },
  { src: new URL('/images/raidiam/add-user/role-bsip.png', import.meta.url).href, alt: 'Step 3', title: 'Role BSIP' },
  { src: new URL('/images/raidiam/add-user/role-bsip-2.png', import.meta.url).href, alt: 'Step 4', title: 'Role BSIP (Domain Users)' },
  { src: new URL('/images/raidiam/add-user/role-bsip-new-user.png', import.meta.url).href, alt: 'Step 5', title: 'New Domain User' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Onboarding
        </div>
        <h1 class="ed-doc__title">
          Adding Users
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">Organisation Administrators can onboard Users.</p>
      </div>
    </section>

    <EdSectionBand
      id="user-types"
      num="01"
      color="var(--at-teal)"
      eyebrow="User Types"
      title="Roles supported by the Trust Framework"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>User Type</th>
              <th>Access Scope</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Technical Contact (PTC)</strong></td>
              <td>Can manage all technical resources of an Organisation &mdash; Applications and Certificates.</td>
            </tr>
            <tr>
              <td><strong>Secondary Technical Contact (STC)</strong></td>
              <td>Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates.</td>
            </tr>
            <tr>
              <td><strong>Primary Business Contact (PBC)</strong></td>
              <td>Can manage Contacts in the Organisation. Cannot manage Technical Resources.</td>
            </tr>
            <tr>
              <td><strong>Secondary Business Contact (SBC)</strong></td>
              <td>Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Sandbox only">
        <p>
          Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework
          (<a href="https://web.sandbox.directory.openfinance.ae/">https://web.sandbox.directory.openfinance.ae/</a>)
          is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework
          SSO.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="primary-technical-contact-ptc"
      num="02"
      color="var(--at-gold)"
      eyebrow="Primary Technical Contact (PTC)"
      title="The technical owner for applications and certificates"
      tone="surface"
    >
      <EdProse>
        The Primary Technical Contact is the key technical owner within the organisation on the Trust
        Framework. The PTC is responsible for managing all applications and the keys and certificates
        within those applications.
      </EdProse>

      <EdProse>This includes:</EdProse>

      <EdBullets>
        <li>Creating and configuring applications</li>
        <li>Managing certificates (Transport, Signing, and Encryption) for each application</li>
        <li>Keeping keys and certificates current and renewing them before expiry</li>
        <li>Ensuring applications are correctly configured with the required roles and certificates</li>
      </EdBullets>

      <EdProse>
        See <a href="/tech/tpp-standards/trust-framework/application">Applications</a> for more on creating
        and managing applications, and
        <a href="/tech/tpp-standards/trust-framework/certificates/">Keys &amp; Certificates</a> for
        certificate management.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="inviting"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Inviting a User"
      title="Step-by-step in the Trust Framework portal"
      tone="cream"
    >
      <ol class="ed-doc__substeps">
        <li>Log in to the Trust Framework and navigate to the <strong>Roles</strong> section within your organisation.</li>
        <li>Navigate to a role within your organisation.</li>
      </ol>

      <EdNote type="tip">
        <p>Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role.</p>
      </EdNote>

      <ol class="ed-doc__substeps" start="3">
        <li>Navigate to the <strong>Domain Users</strong> section of your organisation.</li>
        <li>Click <strong>+ New Domain User</strong>.</li>
        <li>Select the System as <strong>AlTareq Trust Framework</strong> and select the relevant user role &mdash; <strong>PTC</strong>, <strong>PBC</strong>, <strong>STC</strong>, or <strong>SBC</strong>.</li>
        <li>Enter the new user's email address and confirm.</li>
      </ol>

      <EdProse>
        The invited user will receive an email with a registration link. They must use the same email
        address to complete registration. For a full walkthrough of what the user must do next, see
        <a href="/tech/tpp-standards/trust-framework/user-sign-up">Sign Up</a>.
      </EdProse>

      <EdNote type="tip">
        <p>If a user does not receive the invitation email, ask them to check their spam folder.</p>
      </EdNote>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}

.ed-doc__substeps {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.5rem 0 1rem 1.4rem;
  padding: 0;
  color: var(--at-mute-2);
}
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong),
.ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
