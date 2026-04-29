<route lang="yaml">
meta:
  title: "FAPI Request Headers — Traceability, Context, and Safe Retries"
  description: "What the FAPI and Open Finance request headers are for, why x-fapi-interaction-id is the most important one to get right, and a one-line guide to each of the others."
  category: Security
  readTime: "7 min"
  updated: "2026-04-21"
  tags:
    - FAPI
    - Headers
    - Traceability
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'interaction', label: 'x-fapi-interaction-id' },
  { id: 'others',      label: 'Other headers' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['FAPI', 'Headers', 'Traceability']

const nodeUuid = `import { v4 as uuidv4 } from 'uuid'
const interactionId = uuidv4()
// e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`

const pythonUuid = `import uuid
interaction_id = str(uuid.uuid4())
# e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="FAPI Request Headers — Traceability, Context, and Safe Retries"
      :meta="meta"
      lede="Every API call in the UAE Open Finance ecosystem supports a set of HTTP headers defined by the <a href='https://openid.net/specs/fapi-2_0-security-profile.html'>FAPI 2.0 Security Profile</a> and the UAE Open Finance standard. They carry no business logic, but significantly affect how problems are diagnosed, how fraud controls operate, and how payment retries behave safely."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdProse class="ed-page__intro">
      The <a href="/tech/tpp-standards/security/request-headers">Request Headers reference</a> covers the full rules. This article explains the intent behind each one.
    </EdProse>

    <EdSectionBand
      id="interaction"
      num="01"
      color="var(--at-teal)"
      eyebrow="x-fapi-interaction-id"
      title="The most important header to get right"
      lede="A UUID you generate and attach to every outbound request. Acts as a correlation handle that follows the request through your system, through the API Hub, and into the LFI &mdash; and comes back to you in the response."
      tone="cream"
    >
      <EdProse>Every log line on every system that touched that request can be tagged with the same ID. Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes.</EdProse>

      <h3>How it works in practice</h3>
      <EdBullets>
        <li>Generate a fresh UUID v4 for each request &mdash; never reuse across requests.</li>
        <li>Send it as <code>x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c</code>.</li>
        <li>The API Hub echoes the exact value back in the <code>x-fapi-interaction-id</code> response header. If you omit it, the API Hub generates one for you &mdash; but you won't know what it is until you read the response header, and any log lines emitted <em>before</em> the response arrives will have no ID to correlate against.</li>
        <li>Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns.</li>
      </EdBullets>

      <EdProse><strong>When debugging:</strong> if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case &mdash; it is the single fastest way to get an end-to-end trace.</EdProse>

      <EdNote type="warning" title="Format must be UUID v4 — silent discard if invalid">
        <p>The API Hub validates the <code>x-fapi-interaction-id</code> value. If it is not a valid UUID v4, <strong>the request will not fail</strong> &mdash; but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID you logged will not match anything on the API Hub side, and end-to-end tracing becomes impossible.</p>
      </EdNote>

      <EdCode :code="nodeUuid" lang="javascript" filename="Node.js" />
      <EdCode :code="pythonUuid" lang="python" filename="Python" />

      <EdProse>Values that look similar but are not RFC 4122 UUID v4 will be discarded without any error response.</EdProse>

      <EdNote type="tip" title="Always send it">
        <p>The header is defined as <em>recommended</em> in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="others"
      num="02"
      color="var(--at-gold)"
      eyebrow="Other headers"
      title="Context, fraud controls, and idempotency"
      tone="surface"
    >
      <h3><code>x-fapi-customer-ip-address</code></h3>
      <EdProse>The IP address of the customer's device; send it whenever the customer is actively present in a session, so the LFI's fraud controls can see that the request originated from a real user rather than a background process.</EdProse>

      <h3><code>x-fapi-auth-date</code></h3>
      <EdProse>The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on PSU-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls.</EdProse>

      <h3><code>x-customer-user-agent</code></h3>
      <EdProse>The user-agent string of the customer's browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection.</EdProse>

      <h3><code>x-idempotency-key</code></h3>
      <EdProse>A stable, unique key you attach to every <code>POST /payments</code> request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing &mdash; always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment.</EdProse>

      <EdProse>See the <a href="/tech/tpp-standards/security/request-headers">Request Headers reference</a> for format rules, exact conditions, and validation requirements.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/jwt-claims"
        category="Security"
        category-color="var(--at-blue)"
        title="JWT Claim Rules"
        desc="Per-claim rules for the Request Object and Client Assertion sent to /par and /token."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/mtls-endpoint-aliases"
        category="Security"
        category-color="var(--at-blue)"
        title="mtls_endpoint_aliases"
        desc="The mTLS-bound endpoint set returned by .well-known/openid-configuration."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
.ed-page__intro { max-width: var(--at-page-max); margin: 1.5rem auto -1rem; padding: 0 2rem; }
</style>
