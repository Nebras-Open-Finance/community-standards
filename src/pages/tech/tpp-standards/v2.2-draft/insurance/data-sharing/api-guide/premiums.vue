<route lang="yaml">
meta:
  title: Insurance Data Sharing — Encrypted Premiums
</route>

<script setup lang="ts">
const exampleCleartextResponse = `{
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
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/v2.2/motor-insurance-policies/policy-001"
  },
  "Meta": {}
}
`

const exampleEncryptedResponse = `{
  "Data": {
    "Policy": {
      "InsurancePolicyId": "policy-001",
      "PolicyNumber": "MTR-2025-000123",
      "PolicyStatus": "Active",
      "Insurer": { "Name": "Example Insurance LLC" },
      "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIiwicDJzIjoiNGtBWG..."
    }
  },
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/v2.2/motor-insurance-policies/policy-001"
  },
  "Meta": {}
}
`

const step1Node = `import crypto from 'node:crypto'

// insurancePolicyId comes from a prior GET /{type}-insurance-policies call —
// see Step 8 of the API Guide.
const response = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/\${insurancePolicyId}\`,
  {
    headers: {
      Authorization:                \`Bearer \${access_token}\`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Policy: policy } } = await response.json()
`

const step1Python = `import uuid, httpx

# insurance_policy_id comes from a prior GET /{type}-insurance-policies call —
# see Step 8 of the API Guide.
response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/{insurance_policy_id}",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,
        "x-fapi-customer-ip-address":   customer_ip_address,
    },
    # cert=("transport.crt", "transport.key"),
)

policy = response.json()["Data"]["Policy"]
`

const step2Node = `// Premium is anyOf { object | string } per the OpenAPI spec.
// A string value is a compact JWE that must be decrypted on the customer's device.
const premium     = policy.Premium
const isEncrypted = typeof premium === 'string'

if (isEncrypted) {
  // Forward the opaque JWE to the browser. Do not parse, log, or persist it.
  forwardToBrowser({ policyId: policy.InsurancePolicyId, premiumJwe: premium })
} else {
  // Cleartext path — render the premium directly from the structured object
  renderPremium({ policyId: policy.InsurancePolicyId, premium })
}
`

const step2Python = `# Premium is anyOf { object | string } per the OpenAPI spec.
# A string value is a compact JWE that must be decrypted on the customer's device.
premium      = policy.get("Premium")
is_encrypted = isinstance(premium, str)

if is_encrypted:
    # Forward the opaque JWE to the browser. Do not parse, log, or persist it.
    forward_to_browser(policy_id=policy["InsurancePolicyId"], premium_jwe=premium)
else:
    # Cleartext path — render the premium directly from the structured object
    render_premium(policy_id=policy["InsurancePolicyId"], premium=premium)
`

const step1Tabs = [
  { label: 'Node.js', lang: 'typescript', code: step1Node },
  { label: 'Python',  lang: 'python',     code: step1Python },
] as const

const step2Tabs = [
  { label: 'Node.js', lang: 'typescript', code: step2Node },
  { label: 'Python',  lang: 'python',     code: step2Python },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Insurance &middot; Data Sharing &middot; API Guide
        </div>
        <h1 class="ed-doc__title">
          Encrypted Premiums
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a TPP holds the <code>ReadInsurancePremium</code> permission and calls any
          <code>/{type}-insurance-policies</code> endpoint, the LFI MAY return the
          <code>Premium</code> field as an encrypted JWE rather than a structured object. The TPP MUST
          present the premium to the customer without the unencrypted value ever reaching or being
          stored on its servers &mdash; decryption happens locally on the customer&rsquo;s device.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="when-this-applies"
      num="01"
      color="var(--at-teal)"
      eyebrow="When this applies"
      title="Encrypted premiums are an LFI-side choice"
      tone="cream"
    >
      <EdProse>
        The <code>Premium</code> field on every insurance policy response is defined as
        <code>anyOf</code> a structured <code>AEInsuranceDataSharingPremiumProperties</code> object or
        an <code>AEInsurancePremiumJWE</code> compact string. Each LFI decides, per policy, whether to
        return the premium in cleartext or as an encrypted JWE. A TPP holding
        <code>ReadInsurancePremium</code> MUST therefore be ready for either shape on every call.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Cleartext</strong> &mdash; <code>Premium</code> is a JSON object containing
          <code>PremiumAmountExcludingVAT</code>, <code>PremiumVATAmount</code>,
          <code>TotalPremiumAmount</code>, <code>Currency</code>, and <code>PremiumFrequency</code>.
          Render directly. No special handling required.
        </li>
        <li>
          <strong>Encrypted (JWE)</strong> &mdash; <code>Premium</code> is a compact JWE string. The
          TPP server MUST forward this opaque string to the customer&rsquo;s device without inspecting,
          logging, or persisting it. Decryption happens in the browser or mobile app using key material
          tied to the customer&rsquo;s authenticated session.
        </li>
      </EdBullets>

      <EdNote type="info" title="Why both shapes exist">
        <p>
          Some insurers treat the premium as commercially sensitive &mdash; in particular for switching
          and quote-comparison use cases where premium parity is a competitive lever. The encrypted JWE
          shape lets the premium flow through the TPP to the customer&rsquo;s screen without the TPP
          ever holding the cleartext value.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="prerequisites"
      num="02"
      color="var(--at-gold)"
      eyebrow="Prerequisites"
      title="What you need before calling these endpoints"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>A consent that includes <code>ReadInsurancePremium</code></strong> for the relevant
          <code>InsuranceType</code> &mdash; this permission MUST be present in the per-sector block of
          <code>authorization_details.consent.Permissions</code> when the TPP creates the consent. See
          <a href="/tech/tpp-standards/v2.2-draft/insurance/data-sharing/api-guide/#authorization-details">
          Constructing Authorization Details</a>.
        </li>
        <li>
          <strong>The <em>Access Encrypted Resource Data</em> optional certification</strong> &mdash;
          before requesting <code>ReadInsurancePremium</code> on a live LFI, the TPP MUST hold this
          certification with Nebras. See
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a>.
        </li>
        <li>
          <strong>A valid access token and the standard FAPI headers</strong> &mdash;
          <code>x-fapi-interaction-id</code>, <code>x-fapi-auth-date</code>, and
          <code>x-fapi-customer-ip-address</code>. See
          <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-call-policy"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — GET /{type}-insurance-policies/{InsurancePolicyId}"
      title="Fetch the policy detail as normal"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/{type}-insurance-policies/{InsurancePolicyId}</code>
      </div>

      <EdProse>
        Premium values are returned on the per-policy detail endpoint. Use an
        <code>InsurancePolicyId</code> obtained from a prior
        <code>GET /{type}-insurance-policies</code> call (Step 8 of the
        <a href="/tech/tpp-standards/v2.2-draft/insurance/data-sharing/api-guide/#step-8-get-policies">API Guide</a>)
        and request the detailed policy.
      </EdProse>

      <EdProse>
        Whether the LFI returns cleartext or an encrypted JWE for <code>Premium</code>, the request
        itself is unchanged. Make the call as you would for any other Insurance Data Sharing endpoint:
      </EdProse>

      <EdCodeGroup :tabs="step1Tabs" />

      <h3 class="ed-doc__subhead">Example response &mdash; cleartext</h3>
      <EdCode :code="exampleCleartextResponse" lang="json" filename="cleartext Premium" />

      <h3 class="ed-doc__subhead">Example response &mdash; encrypted JWE</h3>
      <EdCode :code="exampleEncryptedResponse" lang="json" filename="encrypted Premium" />

      <EdProse>
        Apart from <code>Premium</code>, every other field on the policy is returned in cleartext in
        both shapes &mdash; <code>PolicyNumber</code>, <code>PolicyStatus</code>, <code>Insurer</code>,
        dates, coverage, riders, and so on. Only <code>Premium</code> is ever encrypted.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-detect-jwe"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 — Detect the response shape"
      title="Branch on whether Premium is a string"
      tone="surface"
    >
      <EdProse>
        If <code>Premium</code> is a JSON object, render its fields directly. If it is a string, treat
        it as an opaque compact JWE and forward it to the customer&rsquo;s browser or mobile app. The
        TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string
        type, log its contents, or persist it.
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />

      <EdNote type="warning" title="Forward, do not store">
        <p>
          The encrypted JWE is opaque to the TPP. Pass it through to the customer device and discard
          the server-side copy as soon as the response is sent. Do not write the JWE to application
          logs, request traces, or analytics pipelines &mdash; even though it is encrypted, persisting
          it would put the TPP in scope of the encrypted-data handling requirements documented in
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-3-decrypt-device"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — Decrypt locally on the customer device"
      title="The decrypted premium never leaves the device"
      tone="cream"
    >
      <EdProse>
        Decryption MUST run on the customer&rsquo;s device &mdash; the cleartext premium MUST NOT be
        sent to the TPP server or any third party. The mechanism mirrors the Bank Data Sharing
        encrypted-rate flow described in
        <a href="/tech/tpp-standards/v2.2-draft/banking/data-sharing/api-guide/finance-rates">Encrypted FinanceRates</a>;
        use the same JOSE-library pattern, keep the OTP/key material in browser memory only, and discard
        the decrypted premium when the customer navigates away.
      </EdProse>

      <EdNote type="danger" title="Never round-trip the cleartext premium">
        <p>
          The decrypted <code>Premium</code> object MUST stay inside the page&rsquo;s JavaScript scope.
          Do not POST it back to your server for &ldquo;processing&rdquo;, do not include it in
          analytics events, and do not echo it back into a form that submits to your domain. The same
          rule applies to any key material used to unlock the JWE.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="related"
      num="06"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Related"
      title="See also"
      tone="surface"
    >
      <EdBullets>
        <li>
          <a href="/tech/tpp-standards/v2.2-draft/banking/data-sharing/api-guide/finance-rates">Encrypted FinanceRates</a>
          &mdash; the Bank Data Sharing equivalent. Insurance follows the same mechanism, only the
          field name and consented permission differ.
        </li>
        <li>
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a> &mdash; the optional certification a TPP must hold before
          requesting any encrypted resource field, including <code>Premium</code>.
        </li>
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
