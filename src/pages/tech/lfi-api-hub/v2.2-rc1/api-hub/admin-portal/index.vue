<route lang="yaml">
meta:
  title: Admin Portal
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Admin Portal
        </div>
        <h1 class="ed-doc__title">
          Admin Portal
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Each API Hub includes a dedicated <strong>Admin Portal</strong> &mdash; a web-based management
          interface where LFI teams can manage TPP access, investigate API traffic, and review operational
          reports.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The following key areas of the Admin Portal are covered in detail on their own pages:
        </p>
      </div>
    </section>

    <EdSectionBand
      id="key-areas"
      num="01"
      color="var(--at-teal)"
      eyebrow="Key areas"
      title="Dedicated pages for the most-used sections"
      tone="cream"
    >
      <EdBullets>
        <li>
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/tpp-activation"><strong>TPP Management</strong></a>
          &mdash; view, activate, and block TPPs, software statements, and clients
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/logs"><strong>Logs</strong></a>
          &mdash; audit logs and API request tracing
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/reports"><strong>Reports</strong></a>
          &mdash; performance metrics, call volumes, and consent statistics
        </li>
      </EdBullets>

      <EdProse>
        The remaining portal sections &mdash; Dashboard, Consent Management, and Planned Outages &mdash;
        are described below.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="environments"
      num="02"
      color="var(--at-gold)"
      eyebrow="Environments"
      title="One portal per Hub instance, per environment"
      tone="surface"
    >
      <EdProse>
        Every LFI receives one Admin Portal per API Hub instance, per environment:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>URL</th>
              <th>SSO Provider</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Production</strong></td>
              <td><code>https://admin.{lficode}.apihub.openfinance.ae</code></td>
              <td>Production Trust Framework</td>
            </tr>
            <tr>
              <td><strong>Pre-production</strong></td>
              <td><code>https://admin.{lficode}.preprod.apihub.openfinance.ae</code></td>
              <td>Sandbox Trust Framework</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Organisations with multiple API Hubs (e.g. separate hubs for retail and corporate banking) receive
        a portal per hub.
      </EdProse>

      <EdNote type="info" title="LFI Code">
        <p>
          <code>{lficode}</code> is the unique identifier assigned to your organisation. Your Nebras
          onboarding contact will confirm your LFI code.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="access"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Access &amp; authentication"
      title="Trust Framework SSO with role-based access"
      tone="cream"
    >
      <EdProse>
        Portal access is managed via <strong>Single Sign-On (SSO)</strong> from the Trust Framework. Users
        who hold the relevant roles in the Trust Framework &mdash; such as Primary Technical Contact (PTC),
        Primary Business Contact (PBC), or Secondary Technical Contact (STC) &mdash; are automatically
        granted access.
      </EdProse>

      <EdBullets>
        <li><strong>Production</strong> portal authenticates against the <strong>Production Trust Framework</strong></li>
        <li><strong>Pre-production</strong> portal authenticates against the <strong>Sandbox Trust Framework</strong></li>
      </EdBullets>

      <EdProse>
        There is no separate user management within the portal itself. To grant or revoke portal access,
        manage the user's roles in the Trust Framework. The portal's <strong>User Management</strong>
        section displays all users who currently have access and their roles.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/User-Management.png"
        alt="User Management page showing users with PTC, PBC, and STC roles"
      />
    </EdSectionBand>

    <EdSectionBand
      id="dashboard"
      num="04"
      color="var(--at-navy)"
      eyebrow="Dashboard"
      title="At-a-glance API Hub health"
      tone="surface"
    >
      <EdProse>
        The dashboard is the landing page after login. It provides a summary of API Hub health and request
        distribution. While useful for a quick overview, the <strong>Reports</strong> and
        <strong>Logs</strong> sections provide the detailed data needed for day-to-day operations and
        debugging.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/Admin-Portal.png"
        alt="Admin Portal dashboard showing performance overview and request distribution"
      />
    </EdSectionBand>

    <EdSectionBand
      id="consent-management"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Consent Management"
      title="Browse, filter, and inspect consents"
      tone="cream"
    >
      <EdProse>
        The consent management section lists all consents created against your API Hub. Each entry shows
        the consent ID, TPP name, consent type, status, and creation date.
      </EdProse>

      <EdProse>You can filter and sort consents by:</EdProse>
      <EdBullets>
        <li><strong>Consent type</strong> &mdash; data sharing or service initiation</li>
        <li><strong>Status</strong> &mdash; e.g. <code>Authorised</code>, <code>Rejected</code>, <code>Expired</code>, <code>Revoked</code>, <code>Consumed</code></li>
        <li><strong>Created date</strong> &mdash; ascending or descending</li>
      </EdBullets>

      <EdNote type="info" title="Ozone Health Probe">
        <p>
          You will see regular data-sharing consents created by the <strong>Ozone Health Probe</strong>
          client. This is an automated monitoring client that periodically creates consents (via PAR) to
          verify the health of your API Hub. These consents are never authorised and will expire
          automatically. When reviewing consent data, filter out the Ozone client to focus on real TPP
          activity.
        </p>
      </EdNote>

      <ImageViewer
        src="/images/ozone/admin-portal/Consent-Management.png"
        alt="Consent Management page showing consent list with filters"
      />
    </EdSectionBand>

    <EdSectionBand
      id="planned-outages"
      num="06"
      color="var(--at-gold)"
      eyebrow="Planned Outages"
      title="Register downtime windows so Nebras can notify TPPs"
      tone="surface"
    >
      <EdProse>
        The portal includes an <strong>Outage Management</strong> section where LFIs can register planned
        downtime windows. When you schedule maintenance that will affect API availability:
      </EdProse>

      <EdBullets>
        <li>Navigate to the outage management section</li>
        <li>Select your organisation</li>
        <li>Enter the date, time, duration, and description of the planned outage</li>
      </EdBullets>

      <EdProse>
        Nebras will be notified and will communicate the outage to affected TPPs. Errors during registered
        outage windows are treated sympathetically in performance reporting.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/Outage-Management.png"
        alt="Outage Management form showing date, time, and duration fields"
      />
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
