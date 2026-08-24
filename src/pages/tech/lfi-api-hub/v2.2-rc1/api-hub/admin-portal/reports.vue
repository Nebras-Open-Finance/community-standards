<route lang="yaml">
meta:
  title: Reports
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Admin Portal · Reports
        </div>
        <h1 class="ed-doc__title">
          Reports
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Admin Portal provides a set of operational reports covering API performance, error rates,
          call volumes, payment activity, and consent statistics. All reports can be filtered by date
          range, sorted by any column, and exported to <strong>CSV</strong> for further analysis.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="performance"
      num="01"
      color="var(--at-teal)"
      eyebrow="Performance"
      title="Response time metrics across all endpoints"
      tone="cream"
    >
      <EdProse>
        The performance report aggregates API request data and provides response time metrics across all
        endpoints.
      </EdProse>

      <EdProse>Each row includes:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Column</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LFI Name</strong></td>
              <td>Your organisation name (always your LFI for your portal)</td>
            </tr>
            <tr>
              <td><strong>TPP Name</strong></td>
              <td>The TPP that made the request &mdash; blank for requests that do not involve a TPP (e.g. LFI-to-Hub calls)</td>
            </tr>
            <tr>
              <td><strong>Date</strong></td>
              <td>The date of the aggregated data</td>
            </tr>
            <tr>
              <td><strong>Endpoint</strong></td>
              <td>The API endpoint called (e.g. accounts, balances, beneficiaries, payments)</td>
            </tr>
            <tr>
              <td><strong>Response Code</strong></td>
              <td>The HTTP response status code</td>
            </tr>
            <tr>
              <td><strong>Max Response Time (ms)</strong></td>
              <td>The slowest response time for the endpoint in the period</td>
            </tr>
            <tr>
              <td><strong>Min Response Time (ms)</strong></td>
              <td>The fastest response time for the endpoint in the period</td>
            </tr>
            <tr>
              <td><strong>Average Response Time (ms)</strong></td>
              <td>The mean response time across all calls to the endpoint in the period</td>
            </tr>
            <tr>
              <td><strong>Number of Calls</strong></td>
              <td>Total number of requests to the endpoint in the period</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Response times represent the <strong>end-to-end request duration</strong> as observed by the API
        Hub &mdash; from receiving the inbound request to returning the response. This includes the LFI's
        response time.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/OFP-performance.png"
        alt="Performance report showing a table of endpoints with response time metrics, filtered by date range"
      />

      <h3>LFI performance</h3>
      <EdProse>
        A separate <strong>LFI Performance</strong> report isolates your response times by removing API
        Hub processing latency. This report shows only the time between the API Hub forwarding the request
        to your Ozone Connect endpoint and receiving your response &mdash; giving you a clear view of your
        own system's performance.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/LFI-performance.png"
        alt="LFI Performance report showing isolated LFI response times per endpoint"
      />
    </EdSectionBand>

    <EdSectionBand
      id="error-rates"
      num="02"
      color="var(--at-gold)"
      eyebrow="API error rates"
      title="Failed requests by endpoint, TPP, and error code"
      tone="surface"
    >
      <EdProse>
        The error rates report provides a breakdown of failed requests by endpoint, TPP, and error code.
        Use this to identify:
      </EdProse>

      <EdBullets>
        <li>Endpoints with elevated error rates</li>
        <li>TPPs that are consistently sending malformed requests</li>
        <li>Trends in error volumes over time</li>
      </EdBullets>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/API-error-rates.png"
        alt="API Error Rates report showing error breakdown by endpoint and response code"
      />
    </EdSectionBand>

    <EdSectionBand
      id="call-volumes"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="API call volumes"
      title="Total request counts by endpoint and TPP"
      tone="cream"
    >
      <EdProse>
        The call volumes report shows the total number of API requests over a given period, broken down
        by endpoint and TPP. This is useful for understanding traffic patterns and capacity usage.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/API-call-volume.png"
        alt="API Call Volumes report showing request counts by endpoint and TPP"
      />
    </EdSectionBand>

    <EdSectionBand
      id="payment-reports"
      num="04"
      color="var(--at-navy)"
      eyebrow="Payment reports"
      title="Payment values and volumes by type and TPP"
      tone="surface"
    >
      <h3>Payment values</h3>
      <EdProse>
        The payment values report shows the monetary value of payments processed through the API Hub,
        broken down by payment type, TPP, and time period.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/Payment-values.png"
        alt="Payment Values report showing total payment amounts by TPP and payment type"
      />

      <h3>Payment volumes</h3>
      <EdProse>
        The payment volumes report shows the number of payment transactions processed, broken down by
        payment type, TPP, status, and time period.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-statistics"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Consent statistics"
      title="Consents created, authorised, expired, revoked, consumed"
      tone="cream"
    >
      <EdProse>
        The consent statistics report provides an overview of consent activity &mdash; including consents
        created, authorised, expired, revoked, and consumed &mdash; broken down by consent type, TPP, and
        time period.
      </EdProse>

      <ImageViewer
        src="/images/ozone/admin-portal/logs-reports/Consent-statistics.png"
        alt="Consent Statistics report showing consent status breakdown by type and TPP"
      />
    </EdSectionBand>

    <EdSectionBand
      id="working-with-reports"
      num="06"
      color="var(--at-gold)"
      eyebrow="Working with reports"
      title="Common controls and CSV export"
      tone="surface"
    >
      <EdProse>All reports share common controls:</EdProse>

      <EdBullets>
        <li><strong>Date range filter</strong> &mdash; adjust the reporting period using the date picker</li>
        <li><strong>Column sorting</strong> &mdash; click any column header to sort ascending or descending</li>
        <li><strong>Column filters</strong> &mdash; filter rows by specific values (e.g. a specific TPP, endpoint, or response code)</li>
        <li><strong>Export</strong> &mdash; download the current report view as a <strong>CSV</strong> file for offline analysis in Excel or other tools</li>
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
