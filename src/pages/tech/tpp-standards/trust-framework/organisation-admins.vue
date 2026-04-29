<route lang="yaml">
meta:
  title: Trust Framework — Organisation Admins
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-org-admin/1.png', import.meta.url).href, alt: 'Step 1', title: 'Adminstrators Section' },
  { src: new URL('/images/raidiam/add-org-admin/2.png', import.meta.url).href, alt: 'Step 2', title: 'New Organisation Administrator' },
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
          Organisation Admins
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is
          properly maintained. This includes ensuring all users have the correct access, that the
          Organisation's details are current and correct, and that assets such as logos are kept up to date.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The first Organisation Admin is the <strong>Primary Organisation Admin</strong> &mdash; nominated
          during the CBUAE licensing process and granted access when onboarding begins. The Primary
          Organisation Admin can add other Organisation Admins.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          For other user roles, see
          <a href="/tech/tpp-standards/trust-framework/adding-users">Adding Users</a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="responsibilities"
      num="01"
      color="var(--at-teal)"
      eyebrow="Responsibilities"
      title="What an Organisation Admin owns"
      tone="cream"
    >
      <EdProse>Organisation Admins are responsible for:</EdProse>

      <EdBullets>
        <li>Ensuring all users have the correct level of access</li>
        <li>Adding a <a href="/tech/tpp-standards/trust-framework/adding-users#primary-technical-contact-ptc">Primary Technical Contact (PTC)</a> &mdash; required before applications and certificates can be managed</li>
        <li>Keeping Organisation details current and accurate</li>
        <li>Keeping logos and branding assets up to date</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="inviting"
      num="02"
      color="var(--at-gold)"
      eyebrow="Inviting an Organisation Admin"
      title="Step-by-step in the Trust Framework portal"
      tone="surface"
    >
      <ol class="ed-doc__substeps">
        <li>Log in to the Trust Framework and navigate to your organisation.</li>
        <li>Navigate to the <strong>Administrators</strong> section of your Organisation.</li>
        <li>Click <strong>+ New Organisation Administrator</strong>.</li>
        <li>Enter the new Organisation Administrator's email address.</li>
      </ol>

      <EdProse>
        The invited Organisation Admin will receive an email with a registration link. They must use the
        same email address to complete registration. For a full walkthrough of what they must do next, see
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
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
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
