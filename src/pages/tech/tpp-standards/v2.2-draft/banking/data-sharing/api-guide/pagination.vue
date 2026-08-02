<route lang="yaml">
meta:
  title: Bank Data Sharing — Pagination
</route>

<script setup lang="ts">
const loopNode = `import crypto from 'node:crypto'

async function fetchAllTransactions(accountId: string, fromBookingDateTime: string) {
  const transactions: unknown[] = []

  // Initial request — no page parameters, the Hub paginates via Links
  let nextUrl: string | undefined =
    \`\${LFI_API_BASE}/open-finance/v2.2/accounts/\${accountId}/transactions\` +
    \`?fromBookingDateTime=\${encodeURIComponent(fromBookingDateTime)}\`

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization:                \`Bearer \${access_token}\`,
        'x-fapi-interaction-id':      crypto.randomUUID(),
        'x-fapi-auth-date':           lastCustomerAuthDate,
        'x-fapi-customer-ip-address': customerIpAddress,
      },
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    })

    const body = await response.json()
    transactions.push(...body.Data.Transaction)

    // Stop when the server does not return a Next link — works for both
    // paginated (last page reached) and unpaginated (single response) cases
    nextUrl = body.Links.Next
  }

  return transactions
}
`

const loopPython = `import uuid

def fetch_all_transactions(account_id: str, from_booking_date_time: str) -> list:
    transactions = []

    # Initial request — no page parameters, the Hub paginates via Links
    next_url = (
        f"{LFI_API_BASE}/open-finance/v2.2/accounts/{account_id}/transactions"
        f"?fromBookingDateTime={from_booking_date_time}"
    )

    while next_url:
        response = httpx.get(
            next_url,
            headers={
                "Authorization":                f"Bearer {access_token}",
                "x-fapi-interaction-id":        str(uuid.uuid4()),
                "x-fapi-auth-date":             last_customer_auth_date,
                "x-fapi-customer-ip-address":   customer_ip_address,
            },
            # cert=("transport.crt", "transport.key"),
        )

        body = response.json()
        transactions.extend(body["Data"]["Transaction"])

        # Stop when the server does not return a Next link — works for both
        # paginated (last page reached) and unpaginated (single response) cases
        next_url = body["Links"].get("Next")

    return transactions
`

const initialReq = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z
`

const page1Json = `{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... 100 items ... */ ]
  },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Next":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`

const page3Json = `{
  "Data": { "AccountId": "acc-001", "Transaction": [ /* ... last slice ... */ ] },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Prev":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`

const unpaginatedJson = `{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... every matching transaction ... */ ]
  },
  "Links": {
    "Self": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z"
  },
  "Meta": {
    "TotalPages":             1,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`

const loopTabs = [
  { label: 'Node.js', lang: 'typescript', code: loopNode },
  { label: 'Python',  lang: 'python',     code: loopPython },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Bank Data Sharing
        </div>
        <h1 class="ed-doc__title">
          Pagination
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          List endpoints on the Bank Data Sharing API return pagination information in the response body.
          The TPP walks through a paginated result set by following the URLs in the <code>Links</code>
          object &mdash; there are no <code>page</code> or <code>page-size</code> query parameters to set
          on the request.
        </p>
        <p class="ed-doc__lede">
          For the end-to-end picture &mdash; including how the API Hub converts LFI <code>meta</code> into
          the TPP <code>Links</code> envelope &mdash; see
          <a href="/knowledge-base/articles/pagination">Pagination &mdash; LFI <code>meta</code> to TPP
          <code>Links</code></a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="response-shapes"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two response shapes to handle"
      title="Paginated and unpaginated, one loop"
      tone="cream"
    >
      <EdProse>
        Pagination is ultimately driven by the LFI. The UAE Open Finance standard <strong>requires</strong>
        LFIs to paginate <code>/accounts/{AccountId}/transactions</code> and
        <code>/accounts/{AccountId}/statements</code>, but during rollout not every LFI will have
        implemented it on day one. A TPP SHOULD therefore be ready for either of the following:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Paginated</strong> &mdash; the LFI returned a page of the filtered result set.
          <code>Meta.TotalPages &gt; 1</code> and <code>Links.Next</code> is populated while more pages
          remain.
        </li>
        <li>
          <strong>Unpaginated</strong> &mdash; the LFI returned the full result set in a single response.
          <code>Meta.TotalPages</code> is <code>1</code> (or <code>0</code> for an empty result) and
          <code>Links</code> contains only <code>Self</code>.
        </li>
      </EdBullets>

      <EdProse>
        The loop pattern below &mdash; follow <code>Links.Next</code> until it is absent &mdash; handles
        both cases without branching. A TPP that only supports the paginated shape will appear to work
        correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate
        to the first page once the LFI enables pagination. Using <code>Links.Next</code> as the stop
        condition avoids that regression.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="which-paginate"
      num="02"
      color="var(--at-gold)"
      eyebrow="Which endpoints paginate"
      title="Required vs optional pagination"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Pagination</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/transactions</code></span></td><td><strong>Required</strong></td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/statements</code></span></td><td><strong>Required</strong></td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/balances</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/beneficiaries</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/direct-debits</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/scheduled-payments</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/standing-orders</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/product</code></span></td><td>Optional</td></tr>
            <tr><td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/parties</code></span></td><td>Optional</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Transactions and statements span long history (at least two years) and routinely produce large
        result sets. For other list endpoints the full result set is usually returned in one response,
        but TPPs SHOULD still follow <code>Links.Next</code> defensively in case an LFI chooses to
        paginate them.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="links-envelope"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="The Links envelope"
      title="What each Links field means"
      tone="cream"
    >
      <EdProse>
        Every paginated response includes a <code>Links</code> object alongside <code>Data</code>:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Self</code></td><td>Yes</td><td>The URL that produced this response</td></tr>
            <tr><td><code>First</code></td><td>No</td><td>Link to the first page. Omitted when the response is unpaginated</td></tr>
            <tr><td><code>Prev</code></td><td>No</td><td>Link to the previous page. Omitted on the first page</td></tr>
            <tr><td><code>Next</code></td><td>No</td><td>Link to the next page. <strong>Omitted on the last page and when the response is unpaginated</strong></td></tr>
            <tr><td><code>Last</code></td><td>No</td><td>Link to the last page. Omitted when the response is unpaginated</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The URLs in <code>Links</code> are opaque &mdash; treat them as strings to fetch, not as
        templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in
        these URLs without breaking your client.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="meta-object"
      num="04"
      color="var(--at-navy)"
      eyebrow="The Meta object"
      title="Counts and history boundaries"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Applies to</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>TotalPages</code></td><td>All list endpoints</td><td>Total number of pages in the filtered result set. <code>1</code> when the response is unpaginated, <code>0</code> for an empty result set</td></tr>
            <tr><td><code>FirstAvailableDateTime</code></td><td>Transactions, statements</td><td>ISO 8601 timestamp of the earliest record the LFI holds for this account</td></tr>
            <tr><td><code>LastAvailableDateTime</code></td><td>Transactions, statements</td><td>ISO 8601 timestamp of the most recent record the LFI holds for this account</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <code>FirstAvailableDateTime</code> and <code>LastAvailableDateTime</code> reflect the full
        history the LFI holds, not the slice returned by the current query. They are useful for
        narrowing follow-up requests with <code>fromBookingDateTime</code> /
        <code>toBookingDateTime</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="follow-next"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Following Links.Next"
      title="The canonical fetch loop"
      tone="cream"
    >
      <EdProse>
        The canonical pattern is a loop that fetches <code>Links.Next</code> until the field is absent.
        The same logic terminates correctly whether the LFI paginated the result or returned it in a
        single response.
      </EdProse>

      <EdCodeGroup :tabs="loopTabs" />

      <EdNote type="tip" title="Reuse the access token across pages">
        <p>
          The access token is valid for the same 10-minute window used elsewhere. For very large result
          sets, refresh proactively using the refresh token flow in
          <a href="/tech/tpp-standards/v2.2-draft/banking/data-sharing/api-guide/#step-10-refreshing-the-access-token">Step
          10 &mdash; Refreshing the Access Token</a> rather than waiting for a <code>401</code>
          mid-loop.
        </p>
      </EdNote>

      <EdNote type="warning" title="Rate limits and bounded retries">
        <p>
          Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and
          respect any <code>429 Too Many Requests</code> backoff the API Hub returns &mdash; do not
          retry <code>Links.Next</code> in a tight loop.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="06"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="Walking pages end-to-end"
      tone="surface"
    >
      <EdProse>
        The diagram below traces a three-page transactions query through the API Hub. The TPP makes a
        single unparameterised request and then follows <code>Links.Next</code> on each response; the
        Hub translates each call into the corresponding <code>page</code> / <code>page-size</code>
        request to the LFI and converts the LFI's <code>meta</code> back into the <code>Links</code>
        envelope.
      </EdProse>

      <APIFlowViewer title="Pagination API Flow">
        <APIFlowsPagination />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="example-3-pages"
      num="07"
      color="var(--at-teal)"
      eyebrow="Worked example — transactions, 3-page result"
      title="Walking three pages of transactions"
      tone="cream"
    >
      <EdProse>Initial request:</EdProse>
      <EdCode :code="initialReq" lang="http" filename="initial request" />

      <EdProse>Response &mdash; page 1 of 3:</EdProse>
      <EdCode :code="page1Json" lang="json" filename="page 1 response" />

      <EdProse>
        The TPP follows <code>Links.Next</code>. On page 3, the response has no <code>Next</code>
        field:
      </EdProse>
      <EdCode :code="page3Json" lang="json" filename="page 3 response" />

      <EdProse>The loop terminates on the absence of <code>Links.Next</code>.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-unpaginated"
      num="08"
      color="var(--at-gold)"
      eyebrow="Worked example — LFI returns everything in one response"
      title="Unpaginated response handled by the same loop"
      tone="surface"
    >
      <EdProse>
        When the LFI has not enabled pagination, the same request returns the full result set in one
        response:
      </EdProse>
      <EdCode :code="unpaginatedJson" lang="json" filename="unpaginated response" />

      <EdProse>
        <code>Links.Next</code> is absent, so the loop exits after the first iteration. No TPP-side
        branching is required.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="empty-results"
      num="09"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Empty result sets"
      title="No matches is a 200, not a 404"
      tone="cream"
    >
      <EdProse>
        A query that matches no records returns <code>200</code> with an empty <code>Data</code> array,
        <code>Meta.TotalPages: 0</code>, and <code>Links</code> containing only <code>Self</code>. Do
        not treat this as an error &mdash; <code>404</code> is not returned for empty filtered results.
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
