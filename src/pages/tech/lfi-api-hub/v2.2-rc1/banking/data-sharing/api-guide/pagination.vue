<route lang="yaml">
meta:
  title: Bank Data Sharing — Pagination
</route>

<script setup lang="ts">
const exampleRequest = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2&page-size=100
`

const exampleResponse = `{
  "data": [
    { "accountId": "acc-001", "transactionId": "txn-900234", "...": "..." }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}
`

const emptyResponse = `{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Banking &middot; Bank Data Sharing
        </div>
        <h1 class="ed-doc__title">
          Pagination
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Pagination for Bank Data Sharing endpoints is <strong>page-based</strong> on the LFI
          (Ozone Connect) side. The API Hub converts the LFI's page/meta response into the
          <code>Links</code> envelope returned to the TPP.
        </p>
        <p class="ed-doc__lede">
          For the end-to-end picture &mdash; including how the Hub converts LFI <code>meta</code> into
          TPP <code>Links</code> &mdash; see
          <a href="/knowledge-base/articles/pagination">Pagination &mdash; LFI <code>meta</code> to TPP
          <code>Links</code></a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="which-paginate"
      num="01"
      color="var(--at-teal)"
      eyebrow="Which endpoints require pagination"
      title="Required vs optional pagination"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Pagination</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/transactions</code></span></td><td><strong>Required</strong></td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/statements</code></span></td><td><strong>Required</strong></td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/balances</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/beneficiaries</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/direct-debits</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/scheduled-payments</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/standing-orders</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/products</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/customer</code></span></td><td>Optional</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Transactions and statements span long history (at least two years) and routinely produce large
        result sets &mdash; pagination is required so responses remain bounded. For other list
        endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in
        a single response.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="request"
      num="02"
      color="var(--at-gold)"
      eyebrow="Request"
      title="page / page-size"
      tone="surface"
    >
      <EdProse>
        The Hub sends <code>page</code> and <code>page-size</code> as query parameters on every
        paginated request:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>integer</td><td><code>1</code></td><td>1-indexed page number</td></tr>
            <tr><td><code>page-size</code></td><td>integer</td><td><code>100</code></td><td>Number of records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The LFI MUST return the slice of the result set that corresponds to <code>page</code> and
        <code>page-size</code>. Filtering (e.g. <code>fromBookingDateTime</code> /
        <code>toBookingDateTime</code> for transactions) is applied <strong>first</strong>;
        pagination is applied to the filtered result set.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="response-meta"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Response"
      title="meta — paginated, totalPages, totalRecords"
      tone="cream"
    >
      <EdProse>
        The LFI indicates the pagination state in the response <code>meta</code> object:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>paginated</code></td><td>boolean</td><td><code>true</code> if the response is paginated. <code>false</code> or omitted if the full result set is returned in a single response</td></tr>
            <tr><td><code>totalPages</code></td><td>integer</td><td>The total number of pages in the full result set, given the current <code>page-size</code></td></tr>
            <tr><td><code>totalRecords</code></td><td>integer</td><td>The total number of records in the full result set across all pages</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <code>totalPages</code> and <code>totalRecords</code> MUST reflect the <strong>filtered</strong>
        result set &mdash; not the whole table. If a transaction query filters by date range,
        <code>totalRecords</code> is the count of transactions in that range, and
        <code>totalPages</code> is <code>ceil(totalRecords / page-size)</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Example &mdash; transactions, page 2 of 12</h3>
      <EdProse>Request:</EdProse>
      <EdCode :code="exampleRequest" lang="http" filename="request" />

      <EdProse>Response:</EdProse>
      <EdCode :code="exampleResponse" lang="json" filename="response" />

      <EdProse>
        The Hub uses <code>totalPages</code> to construct <code>Links.First</code>,
        <code>Links.Prev</code>, <code>Links.Next</code>, and <code>Links.Last</code> on the
        TPP-facing response, and surfaces <code>totalPages</code> in the TPP's <code>Meta</code>. See
        the <a href="/knowledge-base/articles/pagination">Pagination KB article</a> for the full
        conversion.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="04"
      color="var(--at-teal)"
      eyebrow="API Sequence Flow"
      title="Walking pages end-to-end"
      tone="surface"
    >
      <EdProse>
        The diagram below traces a three-page transactions query between the TPP, Hub, and your
        Ozone Connect endpoint. The TPP makes a single unparameterised request and follows
        <code>Links.Next</code> on each response; the Hub translates each call into a
        <code>page</code> / <code>page-size</code> request sent to your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{accountId}/transactions</code></a>
        endpoint and converts your <code>meta</code> back into the TPP's <code>Links</code> envelope.
      </EdProse>

      <APIFlowViewer title="Pagination API Flow">
        <APIFlowsPagination />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="empty-results"
      num="05"
      color="var(--at-navy)"
      eyebrow="Empty result sets"
      title="Empty matches return 200, not 404"
      tone="cream"
    >
      <EdProse>
        If filtering yields no records, return <code>200</code> with an empty <code>data</code> array
        and:
      </EdProse>

      <EdCode :code="emptyResponse" lang="json" filename="empty response" />

      <EdProse>Do not return <code>404</code> for an empty filtered result.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="ordering"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Ordering and stability"
      title="Deterministic order across pages"
      tone="cream"
    >
      <EdProse>
        The LFI MUST return records in a <strong>deterministic order</strong> so that pagination is
        stable across successive page requests. For transactions and statements, newest-first
        (descending <code>bookingDateTime</code> / <code>statementDate</code>) is recommended. If new
        records arrive between page requests, the LFI SHOULD ensure the same record is not returned
        on two different pages of the same logical query.
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
