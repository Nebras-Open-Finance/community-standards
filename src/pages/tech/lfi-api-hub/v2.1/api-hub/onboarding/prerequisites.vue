<route lang="yaml">
meta:
  title: Prerequisites
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Prerequisites
        </div>
        <h1 class="ed-doc__title">
          Prerequisites
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before your API Hub can be provisioned, you MUST complete the prerequisites questionnaire via a
          Service Desk ticket. This page describes the information you will need to provide and why it is
          required.
        </p>
        <EdNote type="info">
          <p>
            Ensure your organisation is registered in the Trust Framework before starting the
            prerequisites process. See
            <a href="/tech/lfi-api-hub/trust-framework/onboarding">Trust Framework Onboarding</a>
            for details.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="organisation-details"
      num="01"
      color="var(--at-teal)"
      eyebrow="Organisation details"
      title="Legal name, IBAN, and contacts"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LFI Legal Name</strong></td>
              <td>Your legal name as it appears on your Trust Framework organisation page.</td>
            </tr>
            <tr>
              <td><strong>IBAN Bank Code</strong></td>
              <td>The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers.</td>
            </tr>
            <tr>
              <td><strong>Primary Technical Contact (PTC)</strong></td>
              <td>Email address of the main technical contact for integration queries.</td>
            </tr>
            <tr>
              <td><strong>Primary Business Contact (PBC)</strong></td>
              <td>Email address of the main business contact.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-code"
      num="02"
      color="var(--at-gold)"
      eyebrow="LFI Code"
      title="Short identifier used in hostnames and headers"
      tone="surface"
    >
      <EdProse>
        Your <strong>LFI Code</strong> is the short identifier that represents your institution across the
        API Hub. It is used in two places:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Hostnames.</strong> It forms part of the URL for both the TPP-facing and LFI-facing
          domain names &mdash; including your API Hub's well-known discovery document URI. See
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment Specific Configuration</a>
          for the full list of <code>auth1.{lfiCode}.*</code>, <code>rs1.{lfiCode}.*</code>,
          <code>hh.{lfiCode}.*</code>, <code>cm.{lfiCode}.*</code>, and <code>admin.{lfiCode}.*</code>
          hostnames.
        </li>
        <li>
          <strong>The <code>o3-provider-id</code> request header.</strong> Every request the API Hub
          forwards to your Ozone Connect endpoints carries <code>o3-provider-id</code> set to your LFI
          Code, so Ozone Connect can identify which Hub the call originated from. This matters most for
          <a href="/knowledge-base/articles/multi-segment-api-hubs">multi-segment LFIs</a>.
        </li>
      </EdBullets>

      <h3>Choosing a value</h3>
      <EdProse>Pick a code that is:</EdProse>
      <EdBullets>
        <li><strong>Short</strong> &mdash; typically 3&ndash;8 characters. It will appear in every TPP integration and every URL.</li>
        <li><strong>Lowercase alphanumeric</strong> &mdash; no spaces, hyphens, underscores, or special characters (it must be DNS-safe).</li>
        <li><strong>Recognisable as your brand</strong> &mdash; usually an abbreviation of your legal or trading name.</li>
        <li><strong>Stable</strong> &mdash; once you go live, the LFI Code is effectively immutable. Changing it later means re-issuing every URL TPPs depend on, and is highly disruptive.</li>
      </EdBullets>

      <h3>Multi-brand institutions</h3>
      <EdProse>
        If your institution operates multiple brands (e.g. retail and business), each brand will have its
        own API Hub and its own LFI Code, and each brand is onboarded separately. The common convention is
        to take your single-brand short code and append the segment as a single lowercase token &mdash; for
        example, FAB uses <code>fabretail</code> for its retail Hub and <code>fabbusiness</code> for its
        business Hub. See
        <a href="/knowledge-base/articles/multi-segment-api-hubs">Multi-Segment LFIs</a>
        for the full deployment model.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="infrastructure"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Infrastructure"
      title="Hosting environment and digital channels"
      tone="cream"
    >
      <h3>Hosting Environment</h3>
      <EdProse>Indicate where your Ozone Connect endpoints will be hosted:</EdProse>
      <EdBullets>
        <li>Azure</li>
        <li>AWS</li>
        <li>OCI (Oracle Cloud Infrastructure)</li>
        <li>GCP (Google Cloud Platform)</li>
        <li>On-premises</li>
      </EdBullets>

      <h3>Digital Channels</h3>
      <EdProse>
        Indicate which digital channels you currently support for PSU authentication and consent journeys:
      </EdProse>
      <EdBullets>
        <li>Web</li>
        <li>Mobile</li>
        <li>Both</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="brands"
      num="04"
      color="var(--at-navy)"
      eyebrow="Brands"
      title="One Hub per business brand"
      tone="surface"
    >
      <EdProse>
        Indicate how many business brands you will be implementing. Each brand represents a separate API
        Hub instance &mdash; for example, a bank may have separate brands for retail and corporate, each
        requiring its own onboarding.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="supported-api-families"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Supported API Families"
      title="Which API families you plan to support"
      tone="cream"
    >
      <EdProse>Indicate which API families you plan to support. The available families are:</EdProse>

      <EdBullets>
        <li><strong>Bank Data Sharing</strong> &mdash; account information, balances, transactions, and related data</li>
        <li><strong>Bank &amp; FX Service Initiation</strong> &mdash; payment initiation, including domestic transfers</li>
        <li><strong>Consent Events &amp; Actions</strong> &mdash; consent lifecycle event notifications</li>
      </EdBullets>

      <EdNote type="info" title="Insurance">
        <p>Insurance API families (e.g. Health, Motor, Travel) will be covered in a future update to this documentation.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="health-check"
      num="06"
      color="var(--at-gold)"
      eyebrow="Health Check Endpoints"
      title="Three mandatory endpoints"
      tone="surface"
    >
      <EdProse>
        The following health check endpoints are <strong>mandatory</strong> for all LFI implementations:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.1/health-check/open-api/hello" class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello</code></a></td>
              <td>Basic connectivity check.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.1/health-check/open-api/hello-mtls" class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello-mtls</code></a></td>
              <td>Verifies mutual TLS is correctly configured.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert" class="endpoint"><span class="http-method http-method--get">GET</span><code>/echo-cert</code></a></td>
              <td>Returns the client certificate details received by your server, used to verify certificate propagation.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        These endpoints MUST be implemented and reachable before your integration can proceed to testing.
        See
        <a href="/tech/lfi-api-hub/v2.1/health-check/">Ozone Connect &mdash; Health Check</a>
        for full API reference and usage.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="optional-features"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Optional Features"
      title="Pre-validation, event notifications, augmentation"
      tone="cream"
    >
      <EdProse>
        During onboarding you will be asked which optional features you plan to implement. These are
        configured per API family.
      </EdProse>

      <h3>Consent Pre-Validation</h3>
      <EdProse>
        Allows your Ozone Connect implementation to validate a consent before it is created. When enabled,
        the API Hub calls your validation endpoint during consent creation.
      </EdProse>

      <EdNote type="warning" title="Strongly Recommended">
        <p>
          Consent Pre-Validation is <strong>strongly recommended</strong> for all LFI implementations.
          Implementing this feature allows you to catch invalid consent parameters early &mdash; before
          the PSU begins the authorization journey &mdash; resulting in a significantly better customer
          experience. This feature may become a <strong>mandatory requirement</strong> in a future
          version of the specification if adoption is insufficient.
        </p>
      </EdNote>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/consent-events/">Consent Events &amp; Actions</a>
        for details.
      </EdProse>

      <h3>Consent Event Notification</h3>
      <EdProse>
        Enables asynchronous notification of consent lifecycle events to your Ozone Connect
        implementation. When enabled, the API Hub sends event notifications when consents are created,
        authorized, revoked, or otherwise modified.
      </EdProse>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/consent-events/">Consent Events &amp; Actions</a>
        for details.
      </EdProse>

      <h3>Consent Augmentation</h3>
      <EdProse>
        Enables the <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/augment</code></span> endpoint on your Ozone Connect
        implementation, which the API Hub calls to request an augmented consent payload during consent
        creation.
      </EdProse>

      <EdNote type="warning" title="Not currently recommended">
        <p>
          LFIs SHOULD NOT enable Consent Augmentation. Select <strong>No</strong> on the onboarding form
          unless Nebras has specifically advised you to enable it. The feature may be revisited in a
          future version of the specification.
        </p>
      </EdNote>
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
