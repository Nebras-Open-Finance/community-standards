<route lang="yaml">
meta:
  title: "Pagination — LFI `meta` to TPP `Links`"
  description: "How page-based pagination flows from the LFI's Ozone Connect response through the API Hub, converted into the Links envelope consumed by the TPP."
  category: Integration
  readTime: "7 min"
  updated: "2026-04-21"
  tags:
    - Pagination
    - Ozone Connect
    - Data Sharing
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'lfi',    label: 'LFI side' },
  { id: 'hub',    label: 'Hub side' },
  { id: 'empty',  label: 'Empty results' },
  { id: 'why',    label: 'Why two models' },
  { id: 'others', label: 'Other endpoints' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Pagination', 'Ozone Connect', 'Data Sharing']

const lfiRequest = `GET /accounts/acc-001/transactions
  ?fromBookingDateTime=2026-01-01T00:00:00Z
  &page=2
  &page-size=100`

const lfiResponse = `{
  "data": [
    { "accountId": "acc-001", "transactionId": "txn-900234", "...": "..." }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}`

const tppRequest = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z`

const tppResponse = `{
  "Data": {
    "Transaction": [
      { "AccountId": "acc-001", "TransactionId": "txn-900234", "...": "..." }
    ]
  },
  "Links": {
    "Self":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2",
    "First": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Prev":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Next":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=3",
    "Last":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=12"
  },
  "Meta": {
    "TotalPages": 12
  }
}`

const emptyResponse = `{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Pagination — LFI meta to TPP Links"
      :meta="meta"
      lede="Bank Data Sharing list endpoints use two different pagination models: <strong>LFI &rarr; API Hub</strong> is page-based (<code>page</code> + <code>page-size</code> with a <code>meta</code> response); <strong>API Hub &rarr; TPP</strong> uses a Links envelope. The Hub bridges the two."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdProse class="ed-page__intro">
      This article uses <code>GET /accounts/{accountId}/transactions</code> as the worked example. The same behaviour applies to <code>GET /accounts/{accountId}/statements</code> &mdash; and to any other endpoint where the LFI chooses to paginate.
    </EdProse>

    <EdSectionBand
      id="lfi"
      num="01"
      color="var(--at-teal)"
      eyebrow="LFI side"
      title="Page-based requests, meta responses"
      tone="cream"
    >
      <h3>Request from the Hub</h3>
      <EdProse>The Hub issues one page-based request per TPP call:</EdProse>
      <EdCode :code="lfiRequest" lang="http" />
      <EdProse><code>page</code> is 1-indexed; <code>page-size</code> defaults to <code>100</code>. Filtering parameters (<code>fromBookingDateTime</code>, <code>toBookingDateTime</code>) are applied <strong>before</strong> pagination &mdash; <code>totalRecords</code> and <code>totalPages</code> reflect the filtered result set, not the whole table.</EdProse>

      <h3>Response to the Hub</h3>
      <EdProse>The LFI returns the slice for the requested page, plus a <code>meta</code> block describing the full filtered result set:</EdProse>
      <EdCode :code="lfiResponse" lang="json" />

      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>meta.paginated</code></td><td><code>true</code> if the response is a page of a larger result set. <code>false</code> or omitted if the LFI returned the full result set in a single response</td></tr>
            <tr><td><code>meta.totalPages</code></td><td><code>ceil(totalRecords / page-size)</code> &mdash; the last page number the Hub may request</td></tr>
            <tr><td><code>meta.totalRecords</code></td><td>The total number of records in the filtered result set across all pages</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>The LFI <strong>MUST</strong> return records in a deterministic order so pagination is stable across successive page requests.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="hub"
      num="02"
      color="var(--at-gold)"
      eyebrow="Hub side"
      title="Links envelope to TPP"
      lede="The Hub receives one TPP request, calls the LFI one or more times (often just once &mdash; it forwards the TPP's requested page through), and composes the TPP response. It uses the LFI's <code>meta</code> to generate the <code>Links</code> block."
      tone="surface"
    >
      <h3>Request from the TPP</h3>
      <EdCode :code="tppRequest" lang="http" />
      <EdProse>The TPP does not send <code>page</code> or <code>page-size</code>. Pagination is expressed through the Hub's URL parameters on the <code>Links</code> returned in the previous response.</EdProse>

      <h3>Response to the TPP</h3>
      <EdProse>The Hub converts the LFI's <code>meta</code> into <code>Meta</code> and <code>Links</code>:</EdProse>
      <EdCode :code="tppResponse" lang="json" />

      <EdProse>The Hub derives each link from the LFI's <code>meta.totalPages</code> and the current <code>page</code>:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>TPP field</th><th>Derived from</th></tr></thead>
          <tbody>
            <tr><td><code>Links.Self</code></td><td>The URL that produced this response</td></tr>
            <tr><td><code>Links.First</code></td><td>Current URL with <code>page=1</code></td></tr>
            <tr><td><code>Links.Prev</code></td><td>Current URL with <code>page = currentPage - 1</code>. Omitted on the first page</td></tr>
            <tr><td><code>Links.Next</code></td><td>Current URL with <code>page = currentPage + 1</code>. Omitted on the last page</td></tr>
            <tr><td><code>Links.Last</code></td><td>Current URL with <code>page = meta.totalPages</code></td></tr>
            <tr><td><code>Meta.TotalPages</code></td><td><code>meta.totalPages</code> from the LFI</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>When the LFI returns an unpaginated response</h3>
      <EdProse>If the LFI returns <code>meta.paginated: false</code> (or omits <code>paginated</code>), the full result set is in a single response. The Hub emits <code>Meta.TotalPages: 1</code>, a <code>Links.Self</code>, and no <code>First</code> / <code>Prev</code> / <code>Next</code> / <code>Last</code>.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="empty"
      num="03"
      color="var(--at-blue)"
      eyebrow="Empty results"
      title="A filtered query that yields nothing"
      tone="cream"
      narrow
    >
      <EdCode :code="emptyResponse" lang="json" />
      <EdProse>The Hub propagates this as an empty <code>Data</code> array with <code>Meta.TotalPages: 0</code>. <code>404</code> <strong>MUST NOT</strong> be returned.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="why"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Why two models"
      title="Forward-compatibility on the TPP side, simplicity on the LFI side"
      tone="surface"
      narrow
    >
      <EdProse>The TPP standards follow UK Open Banking conventions &mdash; opaque <code>Links</code> let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="others"
      num="05"
      color="var(--at-navy)"
      eyebrow="Other endpoints"
      title="The same pattern applies"
      tone="cream"
    >
      <EdProse><code>GET /accounts/{accountId}/statements</code> works identically: the LFI paginates by <code>page</code> / <code>page-size</code> and returns <code>meta.totalPages</code> / <code>meta.totalRecords</code>; the Hub emits <code>Links</code> and <code>Meta.TotalPages</code> on the TPP side.</EdProse>
      <EdProse>Other list endpoints (<code>/beneficiaries</code>, <code>/direct-debits</code>, <code>/scheduled-payments</code>, <code>/standing-orders</code>, <code>/products</code>, <code>/accounts/{accountId}/customer</code>) may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/request-headers"
        category="Security"
        category-color="var(--at-blue)"
        title="FAPI Request Headers"
        desc="What x-fapi-interaction-id and the other FAPI headers are for."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/identity-assurance-claims"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="Identity Assurance Claims"
        desc="The OIDC IDA envelope used for customer-returning endpoints."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
.ed-page__intro { max-width: var(--at-page-max); margin: 1.5rem auto -1rem; padding: 0 2rem; }
</style>
