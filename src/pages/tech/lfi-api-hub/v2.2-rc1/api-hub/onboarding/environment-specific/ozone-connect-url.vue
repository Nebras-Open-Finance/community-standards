<route lang="yaml">
meta:
  title: Ozone Connect Base URL
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Environment-Specific
        </div>
        <h1 class="ed-doc__title">
          Ozone Connect Base URL
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Ozone Connect Base URL</strong> is the root URL of your Ozone Connect API endpoints
          &mdash; the server that the API Hub calls when proxying TPP requests to your institution.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          When a TPP makes a valid API request to the API Hub, the API Hub validates the token and
          consent, enforces the OpenAPI schema, enriches the request, and then forwards it to your Ozone
          Connect Base URL.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-you-provide"
      num="01"
      color="var(--at-teal)"
      eyebrow="What you provide"
      title="One base URL per environment"
      tone="cream"
    >
      <EdProse>You MUST provide a base URL for each environment:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-production</td>
              <td><code>https://openapi-uat.example.com</code></td>
            </tr>
            <tr>
              <td>Production</td>
              <td><code>https://openapi.example.com</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The API Hub appends the API path to your base URL. For example, if your base URL is
        <code>https://openapi.example.com</code>, a TPP request for account data will be forwarded to:
      </EdProse>

      <EdCode lang="text" code="https://openapi.example.com/accounts" />
    </EdSectionBand>

    <EdSectionBand
      id="requirements"
      num="02"
      color="var(--at-gold)"
      eyebrow="Requirements"
      title="HTTPS, reachable, no trailing slash"
      tone="surface"
    >
      <EdProse>The Ozone Connect Base URL MUST:</EdProse>

      <EdBullets>
        <li>Use <strong>HTTPS</strong></li>
        <li>
          Be reachable from the API Hub's egress IP addresses (provided during onboarding &mdash; see
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#values-provided-by-ozone">Environment Specific Configuration</a>)
        </li>
        <li><strong>Not</strong> include a trailing slash</li>
        <li><strong>Not</strong> include path segments beyond the root (e.g. <code>/v2.2</code> is not required &mdash; the API Hub manages versioned routing)</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="network-access"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Network access"
      title="Allowlist the API Hub's egress IPs"
      tone="cream"
    >
      <EdProse>
        You MUST allowlist the API Hub's outbound IP address(es) at your network or firewall level. These
        IPs are provided by Ozone as part of the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/">environment-specific onboarding</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="separate-urls"
      num="04"
      color="var(--at-navy)"
      eyebrow="Separate URLs per environment"
      title="UAT and live infrastructure are configured independently"
      tone="surface"
    >
      <EdProse>
        Your pre-production and production Ozone Connect Base URLs will typically point to different
        infrastructure (e.g. a UAT environment and a live environment). Each is configured independently
        via the environment-specific Service Desk ticket.
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
