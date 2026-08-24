<route lang="yaml">
meta:
  title: Confirmation of Payee — API Guide
</route>

<script setup lang="ts">
// The whole request. The name the TPP submitted is not sent to the LFI — it has
// nothing to do with it, since the Hub does the matching.
const exampleRequest = `{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456"
    }
  }
}
`

const examplePersonalResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri",
        "fullNameAr": "أحمد المنصوري"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`

// The minimum a conformant response can be: fullName and nothing else. Shown
// because the optional fields read as expected unless it is stated that they
// are not.
const exampleMinimalResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`

const exampleJointResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri"
      }
    },
    {
      "id": "cust-002",
      "name": {
        "fullName": "Fatima Al Mansouri",
        "firstName": "Fatima",
        "lastName": "Al Mansouri"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 2
  }
}
`

const exampleBusinessResponse = `{
  "data": [
    {
      "id": "cust-003",
      "name": {
        "businessName": "Al Mansouri Trading LLC",
        "alsoKnownAs": ["Al Mansouri Trading"]
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`

const exampleNotFoundResponse = `{
  "data": [],
  "meta": {
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
          LFI · Banking · Confirmation of Payee
        </div>
        <h1 class="ed-doc__title">
          Confirmation of Payee &mdash; API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or
          business before initiating a payment.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="sequence-flow"
      num="01"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Confirmation of Payee"
      tone="cream"
    >
      <APIFlowViewer title="Confirmation of Payee API Flow">
        <APIFlowsConfirmationOfPayee version="v2.2-rc1" />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="post-cop-query"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="POST /customers/action/cop-query"
      title="Return the name(s) held against an IBAN"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/customers/action/cop-query</code>
      </div>

      <EdNote type="important" title="Migrating from v2.1">
        <p>
          Both bodies changed in v2.2. The request no longer carries
          <code>data.account.name</code> &mdash; drop it from your parser, and stop reading it if you
          used it to select which name to return. The response is flattened: replace
          <code>data[].verifiedClaims[].verification</code> and
          <code>data[].verifiedClaims[].claims</code> with a single
          <code>data[].name</code>, mapping <code>claims.fullName</code> to <code>name.fullName</code>,
          <code>givenName</code> to <code>firstName</code>, <code>familyName</code> to
          <code>lastName</code>, and <code>organisationClaims.name</code> to
          <code>name.businessName</code>. Everything else the envelope carried &mdash; trust framework,
          assurance evidence, and the wider customer fields such as <code>emiratesId</code>,
          <code>birthDate</code> and <code>salary</code> &mdash; is removed and MUST NOT be sent.
        </p>
        <p>
          Headers, query parameters, status codes and error codes are unchanged, so this is a rewrite
          of your request parser and response builder rather than a new integration.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Header</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-aspsp-id</code></td><td>Yes <em>(deprecated)</em></td><td>Deprecated alias for <code>o3-provider-id</code>. Will be removed in a future version &mdash; use <code>o3-provider-id</code></td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>Yes</td><td>Software statement ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (e.g. <code>POST</code>)</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number for paginated results</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Number of records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Request body</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        The Hub sends a plain JSON body &mdash; not a JWS. The body identifies a single account by
        IBAN, and carries nothing else. The name the TPP submitted is <strong>not</strong> sent to
        you: look the account up by IBAN and return the holders you have, and the Hub does the
        comparing.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>data.account</code></h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>schemeName</code></td><td>string</td><td>Yes</td><td>Always <code>IBAN</code></td></tr>
            <tr><td><code>identification</code></td><td>string</td><td>Yes</td><td>The IBAN to look up</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example</h4>
      <EdCode :code="exampleRequest" lang="json" filename="cop-query request" />

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        Return <code>200</code> in all lookup scenarios &mdash; whether the account is found or not.
        The Hub interprets the <code>data</code> array contents to determine the match result returned
        to the TPP.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>200</code> &mdash; Account found</h4>
      <EdProse>
        Return a <code>data</code> array containing <strong>one entry per account holder</strong>.
        <code>id</code> and <code>name</code> are the only required members of an entry.
      </EdProse>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Personal account</h5>
      <EdProse>
        <code>name.fullName</code> is mandatory and is the value the Hub matches on today. Every other
        field is <strong>optional</strong> &mdash; supply <code>firstName</code>,
        <code>middleName</code>, <code>lastName</code>, <code>fullNameAr</code> and
        <code>alsoKnownAs</code> where your systems hold them separately, so that improvements to the
        matching algorithm can use them without a further change to this contract. A response carrying
        only <code>fullName</code> is fully conformant.
      </EdProse>
      <EdCode :code="examplePersonalResponse" lang="json" filename="personal account response" />

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Personal account &mdash; minimum conformant response</h5>
      <EdCode :code="exampleMinimalResponse" lang="json" filename="minimum conformant response" />

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Joint account</h5>
      <EdProse>
        Return one entry per holder. The Hub evaluates <strong>every</strong> entry in
        <code>data</code>, so the order is not significant &mdash; do not attempt to place the most
        likely match first.
      </EdProse>
      <EdCode :code="exampleJointResponse" lang="json" filename="joint account response" />

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Business account</h5>
      <EdProse>
        Populate <code>name.businessName</code> with the registered business name on the account.
        <code>businessNameAr</code> and <code>alsoKnownAs</code> are optional.
      </EdProse>
      <EdCode :code="exampleBusinessResponse" lang="json" filename="business account response" />

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>200</code> &mdash; Account not found, opted out</h4>
      <EdProse>
        Return <code>200</code> with an empty <code>data</code> array where no account was found
        matching the IBAN, the account is under a bar, or the customer has opted out of CoP. Do
        <strong>not</strong> use <code>204</code>, <code>404</code>, <code>201</code> or
        <code>202</code> &mdash; the Hub expects <code>200</code> and treats an empty array as a
        no-result response.
      </EdProse>
      <EdProse>
        The three cases are deliberately indistinguishable to the TPP, so that a CoP query cannot be
        used to probe for the existence of an account.
      </EdProse>
      <EdCode :code="exampleNotFoundResponse" lang="json" filename="not found response" />

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Error responses</h4>
      <EdProse>All error bodies must include <code>errorCode</code> and <code>errorMessage</code>.</EdProse>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>403</code> &mdash; Forbidden</h5>
      <EdRefTable>
        <table>
          <thead><tr><th><code>errorCode</code></th><th><code>errorMessage</code></th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><code>Consent.AccountTemporarilyBlocked</code></td><td><code>The account is blocked from receiving payments.</code></td><td>The account is blocked from receiving payments for a temporary reason &mdash; e.g. account status is <code>Suspended</code></td></tr>
            <tr><td><code>Consent.PermanentAccountAccessFailure</code></td><td><code>The account is blocked from receiving payments.</code></td><td>The account is blocked from receiving payments permanently &mdash; e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
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

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead--small { font-size: 1.05rem; margin-top: 1.5rem; }
.ed-doc__subhead--xs { font-size: 0.95rem; margin-top: 1.25rem; font-family: var(--at-sans); font-weight: 600; }
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
