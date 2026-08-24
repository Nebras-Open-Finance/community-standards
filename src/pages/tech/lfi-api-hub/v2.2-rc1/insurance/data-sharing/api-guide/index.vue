<route lang="yaml">
meta:
  title: Insurance Data Sharing — API Guide
  isIndex: true
</route>

<script setup lang="ts">
const policiesListJson = `{
  "Data": {
    "Policy": [
      {
        "InsurancePolicyId": "policy-001",
        "PolicyNumber": "MTR-2025-000123",
        "PolicyStatus": "Active",
        "InceptionDate": "2025-01-15",
        "RenewalDate": "2026-01-14",
        "Insurer": { "Name": "Example Insurance LLC" },
        "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NN..."
      }
    ]
  },
  "Links": {
    "Self": "https://ozone-connect.example.ae/motor-insurance-policies"
  },
  "Meta": {}
}
`

const policyByIdJson = `{
  "Data": {
    "Policy": {
      "InsurancePolicyId": "policy-001",
      "PolicyNumber": "MTR-2025-000123",
      "PolicyStatus": "Active",
      "Insurer": { "Name": "Example Insurance LLC" },
      "Premium": {
        "PremiumAmountExcludingVAT": "950.00",
        "PremiumVATAmount": "47.50",
        "TotalPremiumAmount": "997.50",
        "Currency": "AED",
        "PremiumFrequency": "Annually"
      }
    }
  },
  "Meta": {}
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Insurance &middot; Data Sharing
        </div>
        <h1 class="ed-doc__title">
          Insurance Data Sharing &mdash; API Guide
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing
          requests proxied by the API Hub. The end-to-end flow &mdash; consent validation, authorisation,
          token issuance &mdash; is identical to Bank Data Sharing; this page focuses on the
          insurance-specific differences.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="positioning"
      num="01"
      color="var(--at-teal)"
      eyebrow="Where this fits"
      title="What you implement on Ozone Connect"
      tone="cream"
    >
      <EdProse>
        For Insurance Data Sharing, your LFI implements one pair of endpoints per insurance sector you
        underwrite on your Ozone Connect server:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--get">GET</span>
                  <code>/{type}-insurance-policies</code>
                </span>
              </td>
              <td>Return every policy of the named sector the consent grants access to.</td>
            </tr>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--get">GET</span>
                  <code>/{type}-insurance-policies/{InsurancePolicyId}</code>
                </span>
              </td>
              <td>Return the single policy identified by the path parameter, after checking it belongs to the consented customer.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Substitute the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>,
        <code>life</code>, <code>motor</code>, <code>renters</code>, <code>travel</code>) for
        <code>{type}</code>. Implement only the sectors your LFI underwrites &mdash; the API Hub will
        not route requests for unmounted sectors.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-validation"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Consent validation"
      title="Same validate hook as Bank Data Sharing"
      tone="surface"
    >
      <EdProse>
        During consent creation, if your LFI has configured the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint, the API Hub forwards the full insurance consent payload to your Ozone Connect server
        before the consent is created. For Insurance Data Sharing consents, <code>consentType</code> is
        <code>cbuae-insurance-consents</code>.
      </EdProse>

      <EdProse>
        The mechanics are identical to Bank Data Sharing &mdash; respond with <code>data.status:
        valid</code> to allow the consent, or <code>invalid</code> with an error if the requested
        permissions cannot be granted. See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#step-2-optional-validate-the-consent">Consent
        Journey API Guide &mdash; Validate the consent</a> for the request and response shapes.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="auth-flow"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent flow"
      title="Authorize the customer at your LFI"
      tone="cream"
    >
      <EdProse>
        Once the consent has been created, the TPP redirects the customer to your LFI&rsquo;s authorisation
        endpoint &mdash; the same URL you registered for Bank Data Sharing. From there, your LFI runs
        the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve
        or reject it, patch the customer identifier onto the consent, and redirect back to the Hub.
      </EdProse>

      <EdProse>
        The endpoints your LFI implements against the API Hub for this flow are the same as Bank Data
        Sharing &mdash; see
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#consent-flow">Bank Data Sharing &mdash; Consent flow</a>
        for the full list. The only difference for insurance is that there are no per-account
        identifiers to patch; the consent is granted at the policy-collection level per sector, and the
        Hub forwards each policy lookup directly to your endpoints.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="conventions"
      num="04"
      color="var(--at-teal-deep)"
      eyebrow="Ozone Connect Insurance responses"
      title="Shared conventions"
      tone="surface"
    >
      <h3 class="ed-doc__subhead">Field population</h3>
      <EdProse>
        Every field that <strong>exists</strong> on the LFI&rsquo;s systems, or is
        <strong>derivable</strong> from them, MUST be populated in the response. TPPs rely on this data
        to serve customer use cases end-to-end &mdash; a field omitted by the LFI is a feature the TPP
        cannot build.
      </EdProse>

      <h3 class="ed-doc__subhead">Common request headers</h3>
      <EdProse>
        Insurance endpoints receive the same set of <code>o3-*</code> headers from the API Hub as Bank
        Data Sharing. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#common-request-headers">Common
        request headers</a> for the full table.
      </EdProse>

      <h3 class="ed-doc__subhead">No pagination</h3>
      <EdProse>
        Insurance policy endpoints return the full set of consented policies for the named sector in a
        single response. There is no <code>page</code> query parameter, and <code>Meta</code> does not
        carry <code>TotalPages</code> or <code>TotalRecords</code>. If the consent grants access to
        twelve motor policies, your <code>/motor-insurance-policies</code> response MUST contain all
        twelve.
      </EdProse>

      <h3 class="ed-doc__subhead">Error responses</h3>
      <EdProse>
        Use the same UAE Open Finance error envelope and HTTP status codes as Bank Data Sharing.
        <code>404</code> for an <code>InsurancePolicyId</code> the consent does not grant access to.
        <code>403</code> if the policy exists but is not in a state your LFI surfaces (e.g. cancelled
        and outside the retention window). The Hub validates token, consent, and TPP role before the
        request reaches your endpoint; you do not re-validate any of those.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="list-policies"
      num="05"
      color="var(--at-teal)"
      eyebrow="GET /{type}-insurance-policies"
      title="Return all consented policies for a sector"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/{type}-insurance-policies</code>
      </div>

      <EdProse>
        Return every active policy of the named sector the consent grants access to. Each
        <code>Policy</code> entry MUST include the fields required by the OpenAPI spec for that sector,
        plus every optional field your LFI holds.
      </EdProse>

      <h3 class="ed-doc__subhead">Required permission</h3>
      <EdProse>
        The Hub only routes the request to your endpoint if the consent contains
        <code>ReadInsurancePolicies</code> for the named sector. You do not need to re-check the
        permission.
      </EdProse>

      <h3 class="ed-doc__subhead">Example response</h3>
      <EdCode :code="policiesListJson" lang="json" filename="GET /motor-insurance-policies" />
    </EdSectionBand>

    <EdSectionBand
      id="get-policy"
      num="06"
      color="var(--at-gold)"
      eyebrow="GET /{type}-insurance-policies/{InsurancePolicyId}"
      title="Return a single policy"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/{type}-insurance-policies/{InsurancePolicyId}</code>
      </div>

      <EdProse>
        Return the single policy identified by <code>InsurancePolicyId</code>. The
        <code>InsurancePolicyId</code> MUST belong to a policy your LFI underwrites for the customer
        identified by the <code>o3-psu-identifier</code> header &mdash; if it does not, respond with
        <code>404</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Example response</h3>
      <EdCode :code="policyByIdJson" lang="json" filename="GET /motor-insurance-policies/policy-001" />
    </EdSectionBand>

    <EdSectionBand
      id="premium-field"
      num="07"
      color="var(--at-navy)"
      eyebrow="Encrypted Premium"
      title="Returning the Premium field as a JWE"
      tone="cream"
    >
      <EdProse>
        The <code>Premium</code> field on every policy is defined as <code>anyOf</code> a structured
        <code>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> object or an
        <code>AEInsurance.AEInsurancePremiumJWE</code> compact string. Your LFI decides, per policy,
        whether to return the premium in cleartext or as an encrypted JWE.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Cleartext</strong> &mdash; populate the structured object with
          <code>PremiumAmountExcludingVAT</code>, <code>PremiumVATAmount</code>,
          <code>TotalPremiumAmount</code>, <code>Currency</code>, and <code>PremiumFrequency</code>.
        </li>
        <li>
          <strong>Encrypted (JWE)</strong> &mdash; encrypt the same structured object as a compact JWE
          using key material the customer&rsquo;s device can unwrap. The TPP MUST NOT decrypt the JWE
          on its server &mdash; this lets you surface premium values that are commercially sensitive
          without the TPP backend ever holding the cleartext.
        </li>
      </EdBullets>

      <EdProse>
        Whichever shape you choose, return it under the <code>Premium</code> key in the policy object.
        The TPP guide explains the customer-device decryption flow in detail at
        <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>.
      </EdProse>

      <EdNote type="info" title="Permission gating">
        <p>
          The Hub only routes the request with <code>Premium</code> in scope if the consent contains
          <code>ReadInsurancePremium</code> for the relevant sector. If the consent does not include
          this permission, omit the <code>Premium</code> field entirely from the response.
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
