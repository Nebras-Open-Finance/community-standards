<route lang="yaml">
meta:
  title: API Hub Onboarding
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding
        </div>
        <h1 class="ed-doc__title">
          API Hub Onboarding
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This section covers the end-to-end process for onboarding your institution to the
          <strong>API Hub</strong>. Onboarding is managed through the <strong>Nebras Service Desk</strong>
          and involves providing configuration details, exchanging certificates, and provisioning your API
          Hub instance.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="Trust Framework registration and a Primary Technical Contact"
      tone="cream"
    >
      <EdProse>
        Before you can begin API Hub onboarding, the following MUST be in place:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Trust Framework registration</strong> &mdash; Your organisation MUST be onboarded to the
          appropriate Trust Framework environment:
          <ul>
            <li><strong>Pre-production</strong> API Hub &rarr; <a href="https://web.sandbox.directory.openfinance.ae/">Sandbox Trust Framework</a></li>
            <li><strong>Production</strong> API Hub &rarr; <a href="https://web.directory.openfinance.ae/">Production Trust Framework</a></li>
          </ul>
          See <a href="/tech/lfi-api-hub/trust-framework/onboarding">Trust Framework Onboarding</a> for details.
        </li>
        <li>
          <strong>Primary Technical Contact (PTC)</strong> &mdash; A Primary Technical Contact MUST have
          been registered for your organisation so that applications, servers, and certificates can be
          created in the Trust Framework. The PTC is responsible for managing the technical connectivity
          between your institution and the API Hub.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="requesting-onboarding"
      num="02"
      color="var(--at-gold)"
      eyebrow="Requesting onboarding"
      title="Email Nebras Support to raise the tickets"
      tone="surface"
    >
      <EdProse>
        To begin onboarding, send the following email to
        <a href="mailto:support@nebrasopenfinance.ae">support@nebrasopenfinance.ae</a>:
      </EdProse>

      <EdNote type="info" title="Email template">
        <p>
          <strong>To:</strong>
          <a href="mailto:support@nebrasopenfinance.ae">support@nebrasopenfinance.ae</a>
        </p>
        <p><strong>Subject:</strong> API Hub Onboarding Request &mdash; [Your Organisation Name] &mdash; [Environment]</p>
        <hr>
        <p>Dear Nebras Support,</p>
        <p>I wish to begin API Hub onboarding for the following:</p>
        <ul>
          <li><strong>Organisation:</strong> [Your Organisation Name]</li>
          <li><strong>Environment:</strong> [Pre-production / Production]</li>
          <li><strong>Primary Technical Contact (PTC):</strong> [Name and email of the PTC who will manage the technical connectivity]</li>
        </ul>
        <p>Please raise the onboarding tickets and provide the next steps.</p>
      </EdNote>

      <EdProse>
        Once received, the Nebras support team will raise <strong>JIRA tickets</strong> to track each
        stage of the onboarding process.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="onboarding-steps"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Onboarding steps"
      title="Three stages tracked via Service Desk tickets"
      tone="cream"
    >
      <EdProse>
        API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service
        Desk ticket.
      </EdProse>

      <h3>1. Prerequisites Questionnaire</h3>
      <EdProse>
        You will be asked to provide organisational details, infrastructure information, and your
        preferred configuration options. This information is used to provision your API Hub instance.
      </EdProse>
      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites">Prerequisites</a>
        for the full list of fields.
      </EdProse>

      <h3>2. Application Layer Authentication</h3>
      <EdProse>
        You MUST select an application layer authentication method to secure communication between the API
        Hub and your Ozone Connect endpoints. The available methods are:
      </EdProse>
      <EdBullets>
        <li>mTLS Only</li>
        <li>API Key</li>
        <li>Client Credentials Grant</li>
        <li><strong>JWT Auth</strong> (recommended)</li>
      </EdBullets>
      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>
        for a comparison of methods, and
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server">Configuring Authentication</a>
        for implementation guidance on the mTLS and JWT Auth layers.
      </EdProse>

      <h3>3. Environment-Specific Configuration</h3>
      <EdProse>
        You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be
        completed <strong>separately for each environment</strong> (pre-production and production).
      </EdProse>
      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific Configuration</a>
        for the full list of fields and certificate details.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="after-onboarding"
      num="04"
      color="var(--at-navy)"
      eyebrow="After onboarding"
      title="Publish your server and implement your endpoints"
      tone="surface"
    >
      <EdProse>
        Once your API Hub is provisioned and configured, you will need to:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Publish your API Hub as a server</strong> in the Trust Framework so that TPPs can
          discover your institution. See
          <a href="/tech/lfi-api-hub/trust-framework/servers/creating">Creating a Server</a>.
        </li>
        <li><strong>Implement your Ozone Connect endpoints</strong></li>
      </EdBullets>
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
