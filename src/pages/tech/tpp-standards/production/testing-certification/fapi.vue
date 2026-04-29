<route lang="yaml">
meta:
  title: FAPI Conformance
</route>

<script setup lang="ts">
const certListUrl = 'https://openid.net/certification/certified-cbuae-fapi-2-0-rp-message-signing-id1/'
const conformanceSuiteUrl = 'https://www.certification.openid.net/'
const howToCertifyUrl = 'https://openid.net/how-to-certify-your-implementation/'
const feeScheduleUrl = 'https://openid.net/certification/fees/'
const joinOidfUrl = 'https://openid.net/foundation/join/'
const membershipUrl = 'https://openid.net/foundation/members/'
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; FAPI
        </div>
        <h1 class="ed-doc__title">
          FAPI Conformance
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every TPP must obtain a <strong>Relying Party (RP) certification</strong> for their application
          against the <strong>CBUAE FAPI 2.0 Message Signing Profile</strong> before being promoted to
          production. This certification is issued by the
          <a href="https://openid.net/" target="_blank" rel="noopener">OpenID Foundation (OIDF)</a>
          and is an exit criterion from the API Hub Sandbox.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner cert-type="TPP FAPI Certification Evidence" />

        <EdNote type="info" title="Test as a client (Relying Party)">
          <p>
            TPPs integrate as OAuth 2.0 clients &mdash; they consume the LFI's Authorization Server. The
            correct certification track is therefore the <strong>Relying Party (RP)</strong> test, not the
            Authorization Server (AS) test. Selecting the wrong track will produce results that are not
            accepted.
          </p>
        </EdNote>
      </div>
    </div>

    <EdSectionBand
      id="cert-required"
      num="01"
      color="var(--at-teal)"
      eyebrow="Certification Required"
      title="CBUAE FAPI 2.0 RP Message Signing ID1"
      tone="cream"
    >
      <EdProse>
        TPPs must achieve the <strong>CBUAE FAPI 2.0 RP Message Signing ID1</strong> certification. A
        public list of organisations that have already certified is available at:
      </EdProse>

      <EdProse>
        <a :href="certListUrl" target="_blank" rel="noopener">{{ certListUrl }}</a>
      </EdProse>

      <EdProse>Certification must be renewed for each major new version of the Standards.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="running-tests"
      num="02"
      color="var(--at-gold)"
      eyebrow="Running the Conformance Tests"
      title="Configure and run the OIDF test plan"
      tone="surface"
    >
      <h3>1. Access the Conformance Suite</h3>

      <EdProse>
        The OIDF conformance suite is available at
        <a :href="conformanceSuiteUrl" target="_blank" rel="noopener">www.certification.openid.net</a>.
        Log in with a Google or GitLab account to create and run test plans.
      </EdProse>

      <h3>2. Configure the Test Plan</h3>

      <EdProse>When scheduling a new test, use the following configuration exactly:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Setting</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Test Plan</strong></td><td><code>FAPI2-Message-Signing-ID1: Relying Party (client) test</code></td></tr>
            <tr><td><strong>Sender Constraining</strong></td><td><code>mtls</code></td></tr>
            <tr><td><strong>Client Authentication Type</strong></td><td><code>private_key_jwt</code></td></tr>
            <tr><td><strong>Authorization Request Type</strong></td><td><code>rar</code></td></tr>
            <tr><td><strong>Request Method</strong></td><td><code>signed_non_repudiation</code></td></tr>
            <tr><td><strong>FAPI Client Type</strong></td><td><code>oidc</code></td></tr>
            <tr><td><strong>FAPI Profile</strong></td><td><code>cbuae</code></td></tr>
            <tr><td><strong>FAPI Response Mode</strong></td><td><code>plain_response</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <ImageViewer
        src="/images/fapi/test-config.png"
        alt="OIDF Conformance Suite test configuration for CBUAE FAPI 2.0 RP Message Signing ID1"
      />

      <h3>3. Note on Test Data Visibility</h3>

      <EdNote type="warning" title="Test data becomes public">
        <p>
          After running the conformance tests, all data used &mdash; including public and private keys
          of certificates and client data from the test &mdash; will be made available in the ecosystem
          and visible to other participants. If you run the certification in a production environment,
          you must revoke the certificates used during the tests and obtain any required customer
          consent. It is strongly recommended to use dedicated test certificates.
        </p>
      </EdNote>

      <h3>4. Submit for Certification</h3>

      <EdProse>
        Once tests pass, submit your results to the OIDF for certification. Follow the submission
        instructions at:
      </EdProse>

      <EdProse>
        <a :href="howToCertifyUrl" target="_blank" rel="noopener">{{ howToCertifyUrl }}</a>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="notify-nebras"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Notifying Nebras"
      title="Inform Nebras as soon as the OIDF issues your certification"
      tone="cream"
    >
      <EdProse>
        TPPs must inform Nebras <strong>immediately</strong> upon receipt of their FAPI Certification
        from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox &mdash;
        production promotion will not proceed until this has been confirmed.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="fees"
      num="04"
      color="var(--at-navy)"
      eyebrow="Fees"
      title="Paid directly to the OIDF"
      tone="surface"
    >
      <EdProse>
        Certification fees are fixed and paid directly to the OIDF. The current fee schedule is
        available at:
      </EdProse>

      <EdProse>
        <a :href="feeScheduleUrl" target="_blank" rel="noopener">{{ feeScheduleUrl }}</a>
      </EdProse>

      <EdProse>
        Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple
        implementations or renew frequently may find OIDF membership cost-effective. Membership
        information and benefits:
      </EdProse>

      <EdBullets>
        <li><a :href="joinOidfUrl" target="_blank" rel="noopener">Join the OpenID Foundation</a></li>
        <li><a :href="membershipUrl" target="_blank" rel="noopener">Membership fee schedule</a></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="support"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Support"
      title="OIDF certification support"
      tone="cream"
    >
      <EdProse>
        For questions about running conformance tests or the certification process, contact the OIDF
        directly:
      </EdProse>

      <EdProse>
        <strong>Email:</strong> <a href="mailto:Certification@oidf.org">Certification@oidf.org</a>
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

.ed-doc__intro { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__intro .ed-doc__inner { padding: 2rem 2rem 2.5rem; }

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
