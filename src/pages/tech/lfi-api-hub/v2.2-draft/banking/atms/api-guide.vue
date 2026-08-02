<route lang="yaml">
meta:
  title: ATMs — API Guide
</route>

<script setup lang="ts">
const exampleResponse = `{
  "data": [
    {
      "LFIId": "lfi-001",
      "LFIBrandId": "First National Bank UAE",
      "ATMId": "atm-dxb-001",
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "SupportedCurrencies": ["AED"],
      "MinimumPossibleAmount": {
        "Amount": "20",
        "Currency": "AED"
      },
      "MaximumPossibleAmount": {
        "Amount": "5000",
        "Currency": "AED"
      },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "AddressLine": ["Sheikh Zayed Road", "Al Quoz"],
          "TownName": "Dubai",
          "CountrySubDivision": "Dubai",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "25.1972",
          "Longitude": "55.2796"
        }
      },
      "ATMFee": [
        {
          "Type": "CrossBankWithdrawal",
          "Amount": {
            "Amount": "2.00",
            "Currency": "AED"
          }
        }
      ]
    }
  ],
  "meta": {
    "LastUpdatedDateTime": "2025-03-01T08:00:00Z",
    "TotalRecords": 1
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
          LFI · Banking · ATMs
        </div>
        <h1 class="ed-doc__title">
          ATMs &mdash; API Guide
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The ATM API exposes a single endpoint that returns all ATM records published by the LFI. This
          is open data &mdash; no customer consent is required. The Hub calls your Ozone Connect
          <a href="/tech/lfi-api-hub/v2.2-draft/banking/atms/open-api/atm" class="endpoint"><span class="http-method http-method--get">GET</span><code>/atm</code></a> endpoint
          whenever a TPP or public consumer requests ATM data for your institution.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="sequence-flow"
      num="01"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end ATM request"
      tone="cream"
    >
      <APIFlowViewer title="ATM API Flow">
        <APIFlowsATMs />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="get-atm"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="GET /atm"
      title="Return all ATM records"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/atm</code>
      </div>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Header</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>Yes</td><td>Software statement ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (e.g. <code>GET</code>)</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        Return <code>200</code> with a <code>data</code> array containing one record per ATM. Return an
        empty array if no ATMs are registered &mdash; do not return <code>404</code>.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>data[]</code> &mdash; ATM record</h4>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Required fields</h5>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>LFIId</code></td><td>string</td><td>Your LFI identifier as registered in the Hub (1–36 characters)</td></tr>
            <tr><td><code>LFIBrandId</code></td><td>string</td><td>Brand identifier for the LFI (1–140 characters)</td></tr>
            <tr><td><code>ATMId</code></td><td>string</td><td>Unique identifier for the ATM (1–36 characters)</td></tr>
            <tr><td><code>SupportedCurrencies</code></td><td>string[]</td><td>ISO 4217 currency codes the ATM dispenses or accepts (at least one required)</td></tr>
            <tr><td><code>Location</code></td><td>object</td><td>Physical location of the ATM &mdash; see below</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>Location</code></h5>
      <EdProse>Both <code>PostalAddress</code> and <code>GeoLocation</code> are required.</EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>PostalAddress</code></td><td>object</td><td>Yes</td><td>Structured postal address &mdash; see below</td></tr>
            <tr><td><code>GeoLocation</code></td><td>object</td><td>Yes</td><td>GPS coordinates &mdash; see below</td></tr>
            <tr><td><code>LocationCategory</code></td><td>string[]</td><td>No</td><td>One or more of: <code>BranchExternal</code>, <code>BranchInternal</code>, <code>BranchLobby</code>, <code>RetailerOutlet</code>, <code>RemoteUnit</code>, <code>DriveThru</code>, <code>Other</code></td></tr>
            <tr><td><code>Site</code></td><td>object</td><td>No</td><td><code>Identification</code> and <code>Name</code> of the site</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>PostalAddress</code></h5>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>AddressLine</code></td><td>string[]</td><td>Yes</td><td>1&ndash;7 free-form address lines</td></tr>
            <tr><td><code>TownName</code></td><td>string</td><td>No</td><td>City or town</td></tr>
            <tr><td><code>CountrySubDivision</code></td><td>string</td><td>No</td><td>UAE emirate: <code>AbuDhabi</code>, <code>Dubai</code>, <code>Sharjah</code>, <code>Ajman</code>, <code>UmmAlQuwain</code>, <code>RasAlKhaimah</code>, <code>Fujairah</code></td></tr>
            <tr><td><code>Country</code></td><td>string</td><td>No</td><td>ISO 3166-1 alpha-2 country code (e.g. <code>AE</code>)</td></tr>
            <tr><td><code>StreetName</code></td><td>string</td><td>No</td><td>Street name</td></tr>
            <tr><td><code>BuildingNumber</code></td><td>string</td><td>No</td><td>Building number</td></tr>
            <tr><td><code>BuildingName</code></td><td>string</td><td>No</td><td>Building name</td></tr>
            <tr><td><code>Floor</code></td><td>string</td><td>No</td><td>Floor within the building</td></tr>
            <tr><td><code>DistrictName</code></td><td>string</td><td>No</td><td>District or neighbourhood</td></tr>
            <tr><td><code>PostBox</code></td><td>string</td><td>No</td><td>PO box</td></tr>
            <tr><td><code>AddressType</code></td><td>string</td><td>No</td><td><code>Business</code> or <code>Other</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>GeoLocation</code></h5>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>Latitude</code></td><td>string</td><td>Yes</td><td>Latitude of the ATM</td></tr>
            <tr><td><code>Longitude</code></td><td>string</td><td>Yes</td><td>Longitude of the ATM</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs">Optional fields</h5>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>SupportedLanguages</code></td><td>string[]</td><td>Languages supported on the ATM interface</td></tr>
            <tr><td><code>Services</code></td><td>string[]</td><td>Services available: <code>Balance</code>, <code>BillPayments</code>, <code>CashDeposits</code>, <code>CharityDonation</code>, <code>ChequeDeposits</code>, <code>CashWithdrawal</code>, <code>EnvelopeDeposit</code>, <code>FastCash</code>, <code>MobileBankingRegistration</code>, <code>MobilePaymentRegistration</code>, <code>MobilePhoneTopUp</code>, <code>OrderStatement</code>, <code>PINActivation</code>, <code>PINChange</code>, <code>PINUnblock</code>, <code>MiniStatement</code>, <code>Other</code>, or a namespaced extension value</td></tr>
            <tr><td><code>Accessibility</code></td><td>string[]</td><td>Accessibility features: <code>AudioCashMachine</code>, <code>AutomaticDoors</code>, <code>ExternalRamp</code>, <code>InductionLoop</code>, <code>InternalRamp</code>, <code>LevelAccess</code>, <code>LowerLevelCounter</code>, <code>WheelchairAccess</code>, <code>Other</code></td></tr>
            <tr><td><code>IsAccess24Hour</code></td><td>boolean</td><td>Whether the ATM is accessible 24 hours</td></tr>
            <tr><td><code>Availability</code></td><td>object</td><td><code>Status</code> (<code>Available</code>, <code>Unavailable</code>, <code>UnderMaintenance</code>) and <code>OperatingHours</code> (array of <code>Days</code>, <code>OpenTime</code>, <code>CloseTime</code>)</td></tr>
            <tr><td><code>MinimumPossibleAmount</code></td><td>object</td><td>Minimum transaction amount (<code>Amount</code> and <code>Currency</code>)</td></tr>
            <tr><td><code>MaximumPossibleAmount</code></td><td>object</td><td>Maximum transaction amount (<code>Amount</code> and <code>Currency</code>)</td></tr>
            <tr><td><code>Branch</code></td><td>object</td><td>Associated branch identifier (<code>SchemeName</code>: <code>BICFI</code> or <code>Other</code>, and <code>Identification</code>)</td></tr>
            <tr><td><code>ATMFee</code></td><td>array</td><td>Fee records &mdash; each requires <code>Type</code>; optionally includes <code>Amount</code>, <code>Percentage</code>, <code>ApplicableNetworks</code>, <code>Conditions</code></td></tr>
            <tr><td><code>Notes</code></td><td>string[]</td><td>Free-text notes about the ATM</td></tr>
            <tr><td><code>Links</code></td><td>object</td><td><code>FeesUri</code> &mdash; URL to a full fee schedule</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>ATMFee.Type</code> values</h5>
      <EdProse>
        <code>Withdrawal</code>, <code>BalanceInquiry</code>, <code>MiniStatement</code>,
        <code>PINChange</code>, <code>CashDeposit</code>, <code>CardlessWithdrawal</code>,
        <code>InternationalWithdrawal</code>, <code>CrossBankWithdrawal</code>,
        <code>OverLimit</code>, <code>DeclinedTransaction</code>,
        <code>EmergencyCashWithdrawal</code>, <code>ForeignATMUsage</code>,
        <code>ServiceDenial</code>, <code>FastCashWithdrawal</code>, <code>NetworkSurcharge</code>,
        <code>ForeignExchange</code>, <code>DomesticCrossBank</code>,
        <code>InternationalCrossBank</code>, <code>Other</code>
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>meta</code></h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>LastUpdatedDateTime</code></td><td>string (date-time)</td><td>Yes</td><td>Timestamp of the most recent update to the ATM data</td></tr>
            <tr><td><code>TotalRecords</code></td><td>integer</td><td>Yes</td><td>Total number of ATM records returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example response</h4>
      <EdCode :code="exampleResponse" lang="json" filename="200 OK" />

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Error responses</h4>
      <EdProse>
        Only return an error when the Hub's request itself is invalid or a server condition prevents
        you from responding. All error bodies must include <code>errorCode</code> and
        <code>errorMessage</code>.
      </EdProse>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>400</code> &mdash; Bad request</h5>
      <EdRefTable>
        <table>
          <thead><tr><th><code>errorCode</code></th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><code>Body.InvalidFormat</code></td><td>Request is malformed or does not match the schema</td></tr>
            <tr><td><code>Resource.InvalidFormat</code></td><td>A request parameter is present but syntactically invalid</td></tr>
            <tr><td><code>GenericRecoverableError</code></td><td>Recoverable validation error not covered above &mdash; Hub may retry</td></tr>
            <tr><td><code>GenericError</code></td><td>Unrecoverable validation error not covered above</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>403</code> &mdash; Forbidden</h5>
      <EdRefTable>
        <table>
          <thead><tr><th><code>errorCode</code></th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><code>AccessToken.InvalidScope</code></td><td>The Hub's token does not include the required scope</td></tr>
            <tr><td><code>GenericRecoverableError</code></td><td>Recoverable access failure not covered above</td></tr>
            <tr><td><code>GenericError</code></td><td>Unrecoverable access failure not covered above</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>500</code> &mdash; Internal server error</h5>
      <EdRefTable>
        <table>
          <thead><tr><th><code>errorCode</code></th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><code>GenericRecoverableError</code></td><td>Transient server error &mdash; Hub may retry after a delay</td></tr>
            <tr><td><code>GenericError</code></td><td>Unrecoverable server error</td></tr>
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
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
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
