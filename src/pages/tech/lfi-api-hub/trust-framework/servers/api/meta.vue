<route lang="yaml">
meta:
  title: Trust Framework — API Resource Meta Data
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-api/15.png', import.meta.url).href, alt: 'Step 1', title: 'Click the actions menu and select Configure API Metadata' },
  { src: new URL('/images/raidiam/add-api/16.png', import.meta.url).href, alt: 'Step 2', title: 'Enter the metadata fields for the API family | The example shown is account-information with Account Sub Types set to CurrentAccount Savings CreditCard' },
]

const aiExample = `{
  "AccountSubType": ["CurrentAccount", "Savings", "CreditCard"],
  "OverLimitFees": "0.50"
}`

const paymentExample = `{
  "SingleInstantPayment": {
    "Supported": true
  },
  "FixedDefinedSchedule": {
    "Supported": true
  },
  "VariableDefinedSchedule": {
    "Supported": false
  },
  "FixedPeriodicSchedule": {
    "Supported": true
  },
  "VariablePeriodicSchedule": {
    "Supported": false
  },
  "FixedOnDemand": {
    "Supported": true
  },
  "VariableOnDemand": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": true,
    "OpenBeneficiariesSupported": false
  },
  "DelegatedAuthentication": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": false,
    "OpenBeneficiariesSupported": false
  }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Servers · API Resources
        </div>
        <h1 class="ed-doc__title">
          Meta Data
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Each API resource registered in the Trust Framework carries a metadata schema specific to its
          API family. These metadata fields are surfaced in the directory and via
          <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint"><span class="http-method http-method--get">GET</span><code>/participants</code></a>,
          allowing TPPs to discover your institution's capabilities and configuration.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The metadata schemas described below correspond to version <strong>2.1</strong> of the Open
          Finance UAE standards. The full schema definitions can be retrieved programmatically via
          <a href="/tech/lfi-api-hub/trust-framework/api/api-families" class="endpoint"><span class="http-method http-method--get">GET</span><code>/references/apifamilies</code></a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="configuring"
      num="01"
      color="var(--at-teal)"
      eyebrow="Configuring Metadata"
      title="Where to enter values in the directory"
      tone="cream"
    >
      <ol class="ed-doc__substeps">
        <li>Click the actions menu on the API resource and select <strong>Configure API Metadata</strong>.</li>
        <li>Enter the metadata fields for the API family. The required fields vary per family &mdash; see the sections below for details.</li>
      </ol>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>
    </EdSectionBand>

    <EdSectionBand
      id="account-information"
      num="02"
      color="var(--at-gold)"
      eyebrow="account-information"
      title="Banking data sharing metadata"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AccountSubType</strong></td>
              <td>Yes</td>
              <td><code>array</code></td>
              <td>Account sub-types supported for data sharing. One or more of: <code>CurrentAccount</code>, <code>Savings</code>, <code>CreditCard</code>, <code>Mortgage</code>, <code>Finance</code></td>
            </tr>
            <tr>
              <td><strong>OverLimitFees</strong></td>
              <td>Optional</td>
              <td><code>string</code></td>
              <td>The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. <code>0.50</code>)</td>
            </tr>
            <tr>
              <td><strong>DeprecationDate</strong></td>
              <td>Optional</td>
              <td><code>string</code></td>
              <td>The date (<code>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td>
            </tr>
            <tr>
              <td><strong>RetirementDate</strong></td>
              <td>Optional</td>
              <td><code>string</code></td>
              <td>The date (<code>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Example</h3>
      <EdCode :code="aiExample" lang="json" filename="account-information metadata" />
    </EdSectionBand>

    <EdSectionBand
      id="payment"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="payment"
      title="Payment Initiation metadata — declare supported types and consent models"
      tone="cream"
    >
      <EdProse>
        The <code>payment</code> family declares which payment types and consent models your institution
        supports. <strong>All payment type fields are required</strong> &mdash; set <code>Supported</code>
        to <code>false</code> for payment types you do not support.
      </EdProse>

      <h3>Simple payment types</h3>
      <EdProse>These payment types require a single <code>Supported</code> boolean:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>SingleInstantPayment.Supported</strong></td><td>Yes</td><td><code>true</code> if single instant payments are supported</td></tr>
            <tr><td><strong>FixedDefinedSchedule.Supported</strong></td><td>Yes</td><td><code>true</code> if fixed amount payments on a defined schedule are supported</td></tr>
            <tr><td><strong>VariableDefinedSchedule.Supported</strong></td><td>Yes</td><td><code>true</code> if variable amount payments on a defined schedule are supported</td></tr>
            <tr><td><strong>FixedPeriodicSchedule.Supported</strong></td><td>Yes</td><td><code>true</code> if fixed amount periodic payments are supported</td></tr>
            <tr><td><strong>VariablePeriodicSchedule.Supported</strong></td><td>Yes</td><td><code>true</code> if variable amount periodic payments are supported</td></tr>
            <tr><td><strong>FixedOnDemand.Supported</strong></td><td>Yes</td><td><code>true</code> if fixed amount on-demand payments are supported</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Beneficiary-aware payment types</h3>
      <EdProse>
        These payment types require additional detail about which beneficiary models are supported:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>VariableOnDemand.SingleBeneficiarySupported</strong></td><td>Yes</td><td><code>true</code> if variable on-demand consents support a single beneficiary</td></tr>
            <tr><td><strong>VariableOnDemand.MultipleBeneficiariesSupported</strong></td><td>Yes</td><td><code>true</code> if variable on-demand consents support multiple beneficiaries (2&ndash;10)</td></tr>
            <tr><td><strong>VariableOnDemand.OpenBeneficiariesSupported</strong></td><td>Yes</td><td><code>true</code> if variable on-demand consents support unrestricted beneficiaries defined at the point of payment</td></tr>
            <tr><td><strong>DelegatedAuthentication.SingleBeneficiarySupported</strong></td><td>Yes</td><td><code>true</code> if delegated authentication consents support a single beneficiary</td></tr>
            <tr><td><strong>DelegatedAuthentication.MultipleBeneficiariesSupported</strong></td><td>Yes</td><td><code>true</code> if delegated authentication consents support multiple beneficiaries (2&ndash;10)</td></tr>
            <tr><td><strong>DelegatedAuthentication.OpenBeneficiariesSupported</strong></td><td>Yes</td><td><code>true</code> if delegated authentication consents support unrestricted beneficiaries defined at the point of payment</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Lifecycle fields</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeprecationDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr>
            <tr><td><strong>RetirementDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Example</h3>
      <EdCode :code="paymentExample" lang="json" filename="payment metadata" />
    </EdSectionBand>

    <EdSectionBand
      id="confirmation"
      num="04"
      color="var(--at-navy)"
      eyebrow="confirmation"
      title="Confirmation of Payee metadata — lifecycle fields only"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeprecationDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr>
            <tr><td><strong>RetirementDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="atm"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="atm"
      title="ATM metadata — lifecycle fields only"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeprecationDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr>
            <tr><td><strong>RetirementDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="product"
      num="06"
      color="var(--at-gold)"
      eyebrow="product"
      title="Products & Leads metadata — lifecycle fields only"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeprecationDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr>
            <tr><td><strong>RetirementDate</strong></td><td>Optional</td><td><code>string</code></td><td>The date (<code>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__substeps { font-family: var(--at-sans); font-size: 1rem; line-height: 1.7; margin: 0.5rem 0 1rem 1.4rem; padding: 0; color: var(--at-mute-2); }
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong), .ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
