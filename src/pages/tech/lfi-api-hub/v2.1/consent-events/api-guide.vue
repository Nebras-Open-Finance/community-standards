<route lang="yaml">
meta:
  title: Consent Events & Actions — API Guide
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Ozone Connect · Consent Events &amp; Actions · API Guide
        </div>
        <h1 class="ed-doc__title">
          Consent Events &amp; Actions &mdash; API Guide
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This guide covers the implementation of the Consent Events &amp; Actions endpoints on your
          Ozone Connect server. These are endpoints <strong>your LFI exposes</strong> and the
          <strong>API Hub calls</strong>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What must already be in place"
      tone="cream"
    >
      <EdProse>
        Before implementing these endpoints, ensure the following are in place:
      </EdProse>

      <EdBullets>
        <li>
          <strong>API Hub onboarded</strong> &mdash; Your API Hub instance is provisioned and your
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific configuration</a>
          is complete
        </li>
        <li>
          <strong>Ozone Connect base URL configured</strong> &mdash; The API Hub knows the base URL of
          your Ozone Connect server. See
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</a>
        </li>
        <li>
          <strong>Connectivity verified</strong> &mdash; Bidirectional mTLS connectivity confirmed
          between your systems and the API Hub. See
          <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a>
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="validate"
      num="02"
      color="var(--at-gold)"
      eyebrow="Validate"
      title="POST /consent/action/validate"
      tone="surface"
    >
      <h3>API Sequence Flow</h3>
      <EdProse>
        The API Hub calls this endpoint during consent creation, <strong>before</strong> the consent is
        stored. The trigger is a TPP submitting a <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> request to the API Hub.
      </EdProse>

      <APIFlowViewer title="Consent Validation Flow">
        <APIFlowsConsentValidate />
      </APIFlowViewer>

      <h3>What to validate</h3>
      <EdProse>
        Your LFI SHOULD validate that the consent is one you can support. At a high level, typical
        checks include:
      </EdProse>

      <EdBullets>
        <li>Does the consent version match what your LFI supports?</li>
        <li>Are the requested permissions within the scope of what your LFI offers?</li>
      </EdBullets>

      <EdProse>
        Each consent type defines its own specific validation rules in its <strong>Requirements</strong>
        page (e.g.
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements">Bank Data Sharing &mdash; Requirements</a>).
        Refer to the Requirements page for each consent type your LFI supports to understand the full
        set of validation checks you MUST implement.
      </EdProse>

      <h3>Response schema</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th style="text-align:center">Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data.status</code></td>
              <td><code>string</code></td>
              <td style="text-align:center">Yes</td>
              <td><code>valid</code> or <code>invalid</code></td>
            </tr>
            <tr>
              <td><code>data.code</code></td>
              <td><code>string</code></td>
              <td style="text-align:center">No</td>
              <td>An error code &mdash; returned when status is <code>invalid</code></td>
            </tr>
            <tr>
              <td><code>data.description</code></td>
              <td><code>string</code></td>
              <td style="text-align:center">No</td>
              <td>A human-readable description of why the consent was rejected</td>
            </tr>
            <tr>
              <td><code>meta</code></td>
              <td><code>object</code></td>
              <td style="text-align:center">Yes</td>
              <td>Empty object <code>{}</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate"><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span> API Reference</a>
        for the full request and response schemas.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-events"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent events"
      title="POST /consent/event/{operation}"
      tone="cream"
    >
      <h3>API Sequence Flow</h3>
      <EdProse>
        The API Hub calls this endpoint to notify your LFI of consent lifecycle changes:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/post</code></span></td>
              <td>A consent has been <strong>created</strong> &mdash; i.e. after <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> succeeds (and after validation, if configured)</td>
            </tr>
            <tr>
              <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/patch</code></span></td>
              <td>A consent has been <strong>updated</strong> &mdash; e.g. status changed to <code>Authorized</code>, <code>Rejected</code>, <code>Revoked</code>, or <code>Expired</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <APIFlowViewer title="Consent Event Flow">
        <APIFlowsConsentEventLFI />
      </APIFlowViewer>

      <h3>What to do with the event</h3>
      <EdProse>
        If your LFI stores consents locally, use these events to keep your local state in sync with the
        API Hub:
      </EdProse>

      <EdBullets>
        <li><strong>On <code>post</code></strong> &mdash; Store the new consent in your local system</li>
        <li><strong>On <code>patch</code></strong> &mdash; Update your local consent record to reflect the latest state</li>
      </EdBullets>

      <EdProse>
        The request body contains the <strong>full consent object</strong> as stored in the API Hub's
        Consent Manager &mdash; not a diff. Your LFI can replace its local record entirely with the
        received payload.
      </EdProse>

      <EdNote type="warning" title="Source of truth">
        <p>
          The API Hub is the <strong>single source of truth</strong> for consent state. Your local copy
          is a convenience cache. If there is ever a discrepancy, the Hub's state takes precedence.
        </p>
      </EdNote>

      <h3>Response</h3>
      <EdProse>Your LFI MUST return <code>204 No Content</code> to acknowledge receipt.</EdProse>

      <EdNote type="info" title="No retry, no rollback">
        <p>
          If your endpoint returns an error (e.g. <code>400</code> or <code>500</code>), the API Hub
          will <strong>not</strong> retry the notification and will <strong>not</strong> roll back the
          consent change. The consent state in the Hub proceeds regardless.
        </p>
        <p>
          Because the Hub is the source of truth and your local copy is a cache, any missed event can
          be reconciled by reading from the Consent Manager:
        </p>
        <ul>
          <li>
            <strong>Handler received the payload but failed to process it</strong> &mdash; you have the
            <code>consentId</code>, so call
            <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a>
            to fetch the latest state.
          </li>
          <li>
            <strong>Your system was offline and never received the event</strong> &mdash; reconcile
            lazily at end user login by calling
            <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/psu/{userId}/consents</code></a>
            before rendering the CMI.
          </li>
        </ul>
        <p>
          LFIs that do not maintain a local consent cache do not need to reconcile &mdash; read from
          the Consent Manager on demand.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="api-reference"
      num="04"
      color="var(--at-navy)"
      eyebrow="API Reference"
      title="Full request and response schemas"
      tone="surface"
    >
      <EdBullets>
        <li><a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a> &mdash; Full request and response schema</li>
        <li><a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/{operation}</code></a> &mdash; Full request and response schema</li>
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
