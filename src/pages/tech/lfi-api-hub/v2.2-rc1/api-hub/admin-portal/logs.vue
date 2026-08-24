<route lang="yaml">
meta:
  title: Logs
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Admin Portal · Logs
        </div>
        <h1 class="ed-doc__title">
          Logs
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Admin Portal provides two types of logs: <strong>Audit Logs</strong> that track all portal
          activity, and <strong>API Logs</strong> that trace every request processed by the API Hub.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="audit-logs"
      num="01"
      color="var(--at-teal)"
      eyebrow="Audit logs"
      title="Every action taken by every portal user"
      tone="cream"
    >
      <EdProse>
        The audit log records every action taken by every user within the Admin Portal. This includes
        reading consent data, viewing TPP details, activating or blocking TPPs, and any other portal
        interaction.
      </EdProse>

      <EdProse>Each audit log entry includes:</EdProse>
      <EdBullets>
        <li><strong>User</strong> &mdash; the portal user who performed the action</li>
        <li><strong>Action</strong> &mdash; the operation performed (e.g. read, update, activate, block)</li>
        <li><strong>Target</strong> &mdash; the resource affected (e.g. TPP, client, consent)</li>
        <li><strong>Timestamp</strong> &mdash; when the action occurred</li>
      </EdBullets>

      <EdProse>
        Audit logs are particularly important for tracking administrative changes. If a TPP is blocked or
        a configuration is changed, the audit log provides a complete record of who made the change and
        when.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/Audit-logs.png"
        alt="Audit Log showing a list of portal actions with user, action type, target, and timestamp"
      />
    </EdSectionBand>

    <EdSectionBand
      id="api-logs"
      num="02"
      color="var(--at-gold)"
      eyebrow="API logs"
      title="Granular trace of every request through the Hub"
      tone="surface"
    >
      <EdProse>
        API logs provide a complete, granular trace of every request that flows through the API Hub. This
        is the primary debugging tool for investigating API issues.
      </EdProse>

      <h3>Searching by interaction ID</h3>
      <EdProse>
        Every API request carries an <code>x-fapi-interaction-id</code> header. To trace a request, enter
        this interaction ID in the API logs search field. The portal will return <strong>every log
        entry</strong> associated with that request &mdash; typically hundreds of entries covering every
        stage of processing.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/API-logs.png"
        alt="API Log search field with an x-fapi-interaction-id entered"
      />

      <h3>What the logs show</h3>
      <EdProse>
        For a single interaction ID, the API logs show the complete lifecycle of the request through the
        API Hub:
      </EdProse>

      <EdBullets>
        <li><strong>Inbound request</strong> &mdash; the TPP's request arriving at the API Hub, including headers, certificate details, and the original URL</li>
        <li><strong>Validation and enrichment</strong> &mdash; each step of token validation, consent checking, schema enforcement, and request enrichment</li>
        <li><strong>Outbound request to LFI</strong> &mdash; the request forwarded to the LFI's Ozone Connect endpoint</li>
        <li><strong>LFI response</strong> &mdash; the response received from the LFI</li>
        <li><strong>Response processing</strong> &mdash; normalization, error mapping, and response construction</li>
        <li><strong>Outbound response to TPP</strong> &mdash; the final response returned to the TPP</li>
      </EdBullets>

      <EdProse>
        Each log entry contains detailed metadata. From the request headers alone you can identify:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Header / Field</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Host</strong></td>
              <td>Which API Hub endpoint received the request (resource server, authorization server, etc.)</td>
            </tr>
            <tr>
              <td><strong>X-Original-URL</strong></td>
              <td>The API path called, including the API version and resource (e.g. <code>/account-information/v1.2/accounts/{AccountId}/beneficiaries</code>)</td>
            </tr>
            <tr>
              <td><strong>X-Cert-DN</strong></td>
              <td>The certificate distinguished name, identifying which TPP made the request</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/API-logs-detail.png"
        alt="API Log detail view showing the sequence of log entries for a single x-fapi-interaction-id, including request headers and processing steps"
      />

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/Log-Entry.png"
        alt="Expanded log entry showing request headers with host, X-Original-URL, and X-Cert-DN fields"
      />
    </EdSectionBand>

    <EdSectionBand
      id="debugging"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Debugging with API logs"
      title="Common scenarios and practical tips"
      tone="cream"
    >
      <EdProse>
        The log entries follow the <strong>same pattern for every request</strong>. After reviewing a few
        traces, you will quickly learn which entries correspond to which stage of processing. Common
        debugging scenarios:
      </EdProse>

      <EdBullets>
        <li><strong>Unexpected error response</strong> &mdash; search by interaction ID, locate the LFI response entry, and inspect the status code and body returned by your Ozone Connect endpoint</li>
        <li><strong>Schema validation failure</strong> &mdash; the log will show the validation step that rejected the request or response, with the specific schema error</li>
        <li><strong>Consent or token issue</strong> &mdash; the validation entries will indicate whether consent or token checks failed, and why</li>
      </EdBullets>

      <EdNote type="tip" title="Practical tip">
        <p>
          When a TPP reports an issue, ask them for the <code>x-fapi-interaction-id</code> from the
          request. With this ID, you can trace the entire request lifecycle in the API logs and identify
          exactly where the issue occurred &mdash; whether in the API Hub's processing or in your LFI
          response.
        </p>
      </EdNote>

      <EdNote type="info" title="Scope of API logs">
        <p>
          API logs cover everything that happens <strong>within the API Hub</strong>. Once the request is
          forwarded to your Ozone Connect endpoint, any processing within your own systems is logged in
          your own infrastructure. The API logs show the request sent to you and the response received
          back.
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
