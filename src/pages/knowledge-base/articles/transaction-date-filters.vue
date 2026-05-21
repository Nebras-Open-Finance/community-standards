<route lang="yaml">
meta:
  title: "Date Filters — fromBookingDateTime & toBookingDateTime"
  description: "What the date-range filters on GET /accounts/{accountId}/transactions and /statements accept, what the API Hub rejects, and what an LFI's Ozone Connect implementation must do."
  category: Integration
  readTime: "3 min"
  updated: "2026-05-21"
  tags:
    - Data Sharing
    - Ozone Connect
    - Transactions
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'accepted', label: 'Accepted' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'lfi',      label: 'What the LFI does' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '3 min' },
  { label: 'Updated',  value: '21 May 2026' },
]

const tags: readonly string[] = ['Data Sharing', 'Ozone Connect', 'Transactions']

const exampleRequest = `GET /accounts/acc-001/transactions
  ?fromBookingDateTime=2025-01-01T00:00:00Z
  &toBookingDateTime=2025-12-31T23:59:59Z
  &page=1
  &page-size=100`

const emptyResponse = `HTTP/1.1 200 OK

{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}`

const rejectedResponse = `HTTP/1.1 400 Bad Request

{
  "code": "Resource.InvalidFormat",
  "message": "A query parameter has an invalid format."
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Date Filters — fromBookingDateTime & toBookingDateTime"
      :meta="meta"
      lede="The transaction and statement list endpoints accept an optional date range. This article is the short version: what the range accepts, the three cases the <strong>API Hub</strong> rejects, and what an LFI's Ozone Connect implementation has to do with the requests that reach it."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdProse class="ed-page__intro">
      Both list endpoints take an optional, open-ended date range.
      <code>GET /accounts/{accountId}/transactions</code> uses
      <code>fromBookingDateTime</code> / <code>toBookingDateTime</code>;
      <code>GET /accounts/{accountId}/statements</code> uses
      <code>fromStatementDate</code> / <code>toStatementDate</code>. The behaviour is identical &mdash;
      the examples below use transactions.
    </EdProse>

    <EdSectionBand
      id="accepted"
      num="01"
      color="var(--at-teal)"
      eyebrow="Accepted"
      title="What the range accepts"
      tone="cream"
    >
      <EdProse>
        Both parameters are optional. They narrow the result to transactions booked
        <strong>on or after</strong> <code>fromBookingDateTime</code> and
        <strong>on or before</strong> <code>toBookingDateTime</code>; omit either bound for an
        open-ended range. A well-formed range is always accepted &mdash; <strong>even when it matches
        nothing</strong>. In particular, the following are valid requests, not errors:
      </EdProse>

      <EdBullets>
        <li>a range reaching <strong>beyond two years</strong> into the past &mdash; the LFI returns the records it holds, and <strong>MAY</strong> return records older than two years where it has them;</li>
        <li>a <strong>quiet period</strong> with no activity;</li>
        <li>a <code>fromBookingDateTime</code> set <strong>in the future</strong> or later than any booked transaction &mdash; coherent, it simply matches nothing.</li>
      </EdBullets>

      <EdProse>
        In each of these cases the response is <code>200</code> with the matching subset in
        <code>data</code> &mdash; an empty array where nothing matches. A <code>404</code>
        <strong>MUST NOT</strong> be used to signal "no transactions in range".
      </EdProse>

      <EdCode :code="emptyResponse" lang="http" filename="200 — a valid empty result" />
    </EdSectionBand>

    <EdSectionBand
      id="rejected"
      num="02"
      color="var(--at-blue)"
      eyebrow="Rejected"
      title="Three cases the API Hub rejects"
      tone="surface"
      narrow
    >
      <EdProse>
        The <strong>API Hub</strong> validates the date range before proxying the request to the LFI.
        It returns <code>400</code> with <code>Resource.InvalidFormat</code> in three cases:
      </EdProse>

      <EdBullets>
        <li>a date-time parameter <strong>cannot be parsed</strong>;</li>
        <li>the range is <strong>contradictory</strong> &mdash; <code>fromBookingDateTime</code> is after <code>toBookingDateTime</code>;</li>
        <li><code>toBookingDateTime</code> is <strong>in the future</strong> &mdash; an upper bound on when a transaction was booked cannot lie past the current moment.</li>
      </EdBullets>

      <EdCode :code="rejectedResponse" lang="http" filename="A rejected date-range request" />

      <EdProse>
        Note the asymmetry: only the <strong>upper</strong> bound is checked against the clock. A
        future <code>fromBookingDateTime</code> is coherent &mdash; it just matches nothing &mdash; so
        it is accepted and returns <code>200</code>. The identical three checks apply to
        <code>fromStatementDate</code> / <code>toStatementDate</code> on the statements endpoint.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="lfi"
      num="03"
      color="var(--at-gold)"
      eyebrow="What the LFI does"
      title="What your Ozone Connect implementation must do"
      tone="cream"
    >
      <EdProse>
        Because the API Hub catches all three malformed cases, your Ozone Connect endpoints receive
        only parseable, non-contradictory ranges whose upper bound is not in the future. There is
        nothing to re-validate &mdash; the LFI's job is simply to filter and return:
      </EdProse>

      <EdBullets>
        <li><strong>Filter</strong> to transactions whose booking date-time falls within the supplied bounds, then apply pagination &mdash; so <code>meta.totalRecords</code> and <code>meta.totalPages</code> describe the filtered set.</li>
        <li><strong>Ignore any timezone offset</strong> on the supplied values &mdash; compare the wall-clock date-time as given.</li>
        <li>Make <strong>at least two years</strong> of history available; you <strong>MAY</strong> hold and return more. The two-year figure is a minimum availability floor, not a query limit.</li>
        <li>Return <code>200</code> with the matching subset &mdash; an <strong>empty <code>data</code> array</strong> where nothing matches. Never <code>404</code>.</li>
      </EdBullets>

      <EdCode :code="exampleRequest" lang="http" filename="A bounded request from the API Hub" />

      <EdNote type="info" title="An empty result is not a completeness signal">
        <p>
          A <code>200</code> with an empty <code>data</code> array means "no records matched" &mdash;
          it does <strong>not</strong> assert the customer had no activity. For any period beyond the
          two-year guarantee, an empty or partial result may simply reflect what the LFI retains.
          TPPs are told not to infer absence of activity past that window.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/pagination"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="Pagination — LFI meta to TPP Links"
        desc="How the filtered result set is paged from Ozone Connect through the API Hub."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/request-headers"
        category="Security"
        category-color="var(--at-blue)"
        title="FAPI Request Headers"
        desc="What x-fapi-interaction-id and the other FAPI headers are for."
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
