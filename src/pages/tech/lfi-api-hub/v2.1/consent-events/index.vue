<route lang="yaml">
meta:
  title: Consent Events & Actions
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Ozone Connect · Consent Events &amp; Actions
        </div>
        <h1 class="ed-doc__title">
          Consent Events &amp; Actions
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Consent Events &amp; Actions API</strong> is implemented by your LFI. Unlike the
          other APIs in the Ozone Connect specification where the API Hub calls your endpoints to retrieve
          data or execute payments, these endpoints allow the API Hub to notify you of consent lifecycle
          changes and request your input during consent creation.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="direction"
      num="01"
      color="var(--at-teal)"
      eyebrow="Direction of communication"
      title="API Hub → LFI, but informing rather than requesting data"
      tone="cream"
    >
      <EdProse>
        All other Ozone Connect APIs follow the pattern: <strong>API Hub &rarr; LFI</strong> (the Hub
        requests data or actions from you). The Consent Events &amp; Actions API follows the same
        direction &mdash; <strong>API Hub &rarr; LFI</strong> &mdash; but the purpose is reversed: the
        Hub is <em>informing</em> you or <em>asking</em> you, rather than requesting business data.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="endpoints"
      num="02"
      color="var(--at-gold)"
      eyebrow="Endpoints"
      title="One action and two events"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Type</th>
              <th>When the Hub calls it</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span></td>
              <td>Action</td>
              <td>During consent creation &mdash; before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported.</td>
              <td><strong>Highly recommended</strong> for all LFIs</td>
            </tr>
            <tr>
              <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/post</code></span></td>
              <td>Event</td>
              <td>After a consent is successfully created</td>
              <td>Recommended for LFIs that store consents locally</td>
            </tr>
            <tr>
              <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/patch</code></span></td>
              <td>Event</td>
              <td>Every time a consent changes &mdash; e.g. status transitions to <code>Authorized</code>, <code>Rejected</code>, <code>Expired</code>, or <code>Revoked</code></td>
              <td>Recommended for LFIs that store consents locally</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="validate"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="POST /consent/action/validate"
      title="LFI input gates consent creation"
      tone="cream"
    >
      <EdProse>
        The validate endpoint is called when a TPP submits a <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> request to the API
        Hub to create a new consent. <strong>Before</strong> the consent is stored, the Hub forwards the
        full consent payload to your LFI and waits for a response.
      </EdProse>

      <EdProse>
        Your LFI inspects the consent and determines whether it can be supported &mdash; for example:
      </EdProse>

      <EdBullets>
        <li>Does the consent version match what your LFI supports?</li>
        <li>Are the requested permissions within the scope of what your LFI offers?</li>
      </EdBullets>

      <EdProse>
        Each consent type defines its own specific validation rules in its <strong>Requirements</strong>
        page (e.g.
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements">Bank Data Sharing &mdash; Requirements</a>).
        Refer to the Requirements page for each consent type your LFI supports.
      </EdProse>

      <EdProse>
        Your LFI responds with a <code>data.status</code> of either <code>valid</code> or
        <code>invalid</code>:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Response</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>valid</code></td>
              <td>The consent is created in the API Hub and the authorization journey proceeds</td>
            </tr>
            <tr>
              <td><code>invalid</code></td>
              <td>The consent is <strong>not</strong> created. The API Hub returns an error to the TPP</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Highly recommended">
        <p>
          We <strong>highly recommend</strong> all LFIs implement the validate endpoint. It gives your
          institution early control over which consents enter the authorization journey, preventing
          unsupported consents from reaching your PSUs.
        </p>
      </EdNote>

      <EdNote type="info" title="Not configured?">
        <p>
          If your LFI has not configured the validate endpoint, the API Hub assumes all consents are
          valid and creates them immediately without LFI input.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="event-op"
      num="04"
      color="var(--at-navy)"
      eyebrow="POST /consent/event/{operation}"
      title="Consent lifecycle notifications"
      tone="surface"
    >
      <EdProse>
        The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes.
        The <code>{operation}</code> path parameter indicates the type of change:
      </EdProse>

      <h3><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/post</code></span> &mdash; Consent created</h3>
      <EdProse>
        Called immediately after a consent is successfully created (i.e. after validation passes, if
        configured). The request body contains the full consent object as stored in the API Hub's
        Consent Manager.
      </EdProse>

      <h3><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/patch</code></span> &mdash; Consent updated</h3>
      <EdProse>Called every time a consent's state changes. This includes transitions such as:</EdProse>
      <EdBullets>
        <li><code>AwaitingAuthorisation</code> &rarr; <code>Authorized</code> (PSU approved the consent)</li>
        <li><code>AwaitingAuthorisation</code> &rarr; <code>Rejected</code> (PSU declined the consent)</li>
        <li><code>Authorized</code> &rarr; <code>Revoked</code> (consent revoked by TPP, LFI, or PSU)</li>
        <li><code>Authorized</code> &rarr; <code>Expired</code> (consent reached its expiration date)</li>
      </EdBullets>
      <EdProse>The request body contains the full, updated consent object.</EdProse>

      <h3>Response</h3>
      <EdProse>
        For both operations, your LFI MUST return <code>204 No Content</code> to acknowledge receipt.
        The Hub does not retry failed notifications, and consent state changes are <strong>not</strong>
        rolled back if your endpoint returns an error.
      </EdProse>

      <EdNote type="tip" title="Recommended for LFIs storing consents locally">
        <p>
          If your LFI maintains a local copy of consents &mdash; for example, to power a Consent
          Management Interface or to support internal business logic &mdash; we
          <strong>recommend</strong> implementing the consent event endpoints. This ensures your local
          consent state stays aligned with the API Hub, which is the <strong>single source of
          truth</strong> for all consent data.
        </p>
        <p>
          Without these events, your local consent records may drift out of sync with the Hub,
          requiring you to poll the Consent Manager API to detect changes.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="api-reference"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="API Reference"
      title="Full request and response schemas"
      tone="cream"
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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
