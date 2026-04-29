<route lang="yaml">
meta:
  title: Trust Framework — Overview & Organisations
  isIndex: true
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/organizations/all.png', import.meta.url).href, alt: 'Step 1', title: 'All organizations within the Trust Framework can be viewed in the directory.' },
  { src: new URL('/images/raidiam/organizations/lfi.png', import.meta.url).href, alt: 'Step 2', title: 'By selecting an organization, you can see whether it is designated as an LFI.' },
  { src: new URL('/images/raidiam/organizations/tpp.png', import.meta.url).href, alt: 'Step 3', title: 'Alternatively, the organization may be designated as a TPP.' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Directory
        </div>
        <h1 class="ed-doc__title">
          Trust Framework
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Trust Framework facilitates secure data sharing between Licensed Financial Institutions
          (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client
          onboarding, and client authentication.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="endpoints"
      num="01"
      color="var(--at-teal)"
      eyebrow="Trust Framework Environments"
      title="Sandbox and Production endpoints"
      tone="cream"
    >
      <h3>Sandbox Trust Framework</h3>
      <EdBullets>
        <li>Web Application: <a href="https://web.sandbox.directory.openfinance.ae/">https://web.sandbox.directory.openfinance.ae/</a></li>
        <li>OIDC Discovery API: <a href="https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration">https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration</a></li>
      </EdBullets>

      <h3>Production Trust Framework</h3>
      <EdBullets>
        <li>Web Application: <a href="https://web.directory.openfinance.ae/">https://web.directory.openfinance.ae/</a></li>
        <li>OIDC Discovery API: <a href="https://auth.directory.openfinance.ae/.well-known/openid-configuration">https://auth.directory.openfinance.ae/.well-known/openid-configuration</a></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="core-functions"
      num="02"
      color="var(--at-gold)"
      eyebrow="Core Functions"
      title="What the Trust Framework provides"
      tone="surface"
    >
      <h3>Trust Anchors</h3>
      <EdProse>
        Maintain a registry of authorized participants, defining their roles and scopes of access within
        the ecosystem.
      </EdProse>

      <h3>API Portal for Discovery</h3>
      <EdProse>
        Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem.
      </EdProse>

      <h3>Keystore</h3>
      <EdProse>
        Manage a registry of active cryptographic keys for each participant. These keys are used to
        validate identities, enabling mutual trust &mdash; an essential foundation for secure data sharing.
      </EdProse>

      <h3>Public Key Infrastructure (PKI)</h3>
      <EdProse>
        Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for
        verifying certificates generated within the platform.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="organisations"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Organisations"
      title="LFIs, TPPs, and how they coexist in the directory"
      tone="cream"
    >
      <EdProse>
        All organisations participating in Open Finance operate within the Trust Framework. Upon successful
        onboarding, participants are registered within the Framework and gain visibility of other
        authorised organisations in the ecosystem.
      </EdProse>

      <EdProse>Organisations are classified according to their role:</EdProse>

      <EdProse>
        <strong>Licensed Financial Institutions (LFIs)</strong> provide capabilities into the Open Finance
        ecosystem. For example, an institution such as ADCB may expose payment initiation services or
        account information APIs for consumption by authorised participants.
      </EdProse>

      <EdProse>
        <strong>Third Party Providers (TPPs)</strong> consume the capabilities made available through Open
        Finance. For example, a fintech organisation such as Spare Technologies may access payment or data
        services provided by LFIs to deliver customer-facing solutions.
      </EdProse>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>

      <EdProse>
        Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In
        such cases, the organisation retains its LFI classification within the Trust Framework while
        exercising TPP capabilities.
      </EdProse>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
