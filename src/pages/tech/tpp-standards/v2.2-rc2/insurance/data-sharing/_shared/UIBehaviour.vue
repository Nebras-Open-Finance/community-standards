<template>
  <h3>Permissions and Data Access</h3>

  <EdProse>
    For Insurance Data Sharing, the <code>Permissions</code> field is an array of
    <code>{ InsuranceType, Permissions[] }</code> objects &mdash; permissions are scoped to a specific
    insurance type, so a TPP can request different data clusters per type in a single consent.
  </EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Permission code</th>
          <th>What the user sees on both the Consent and Authorisation pages</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in insurancePermissionGroups" :key="row.permission">
          <td><code>{{ row.permission }}</code></td>
          <td>
            <strong>{{ row.label }}</strong>
            <span> &mdash; {{ insurancePermissionDescriptions[row.permission] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>Insurance Type Filtering</h3>

  <EdProse>
    Each entry in <code>Permissions</code> nominates an <code>InsuranceType</code>. The LFI Authorisation
    Page only shows policies whose type appears in the consent &mdash; this acts as the equivalent of
    Banking&rsquo;s <code>AccountSubType</code> filter.
  </EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>Permissions[].InsuranceType</code></th>
          <th>LFI Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>One or more types</strong></td>
          <td>
            Only policies whose <code>InsuranceType</code> matches one of the requested values are shown for
            selection. If the user holds no policies of any requested type, the LFI returns the
            no-matching-policies error and the authorisation flow cannot proceed.
          </td>
        </tr>
        <tr>
          <td><strong>None / empty</strong></td>
          <td>
            Invalid &mdash; <code>Permissions</code> must contain at least one entry and each entry must
            declare an <code>InsuranceType</code>. The consent is rejected before authorisation begins.
          </td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdNote type="tip">
    <p>
      Only request the insurance types your service genuinely needs. Listing extra types forces the user
      to scan irrelevant policies and is flagged during CX certification.
    </p>
  </EdNote>

  <h3>Policy Status Grouping</h3>

  <EdProse>
    Policies are grouped on the Authorisation Page by their <code>Status</code> field
    (<code>AEInsurancePolicyStatusCodes</code>). Currently active statuses are presented first and
    selectable by default; end-state statuses are bucketed into a collapsible <strong>Inactive
    Policies</strong> group so the user can see what is in scope but cannot select policies whose data
    can&rsquo;t be shared.
  </EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Status group</th>
          <th>Statuses included</th>
          <th>Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Active</strong></td>
          <td><code>New</code>, <code>Renewed</code>, <code>InForce</code>, <code>PaidUp</code></td>
          <td>Shown first, with a green tick header. Selectable by default.</td>
        </tr>
        <tr>
          <td><strong>Inactive</strong></td>
          <td>
            <code>Expired</code>, <code>Lapsed</code>, <code>Cancelled</code>, <code>Surrendered</code>,
            <code>Converted</code>, <code>DeathClaim</code>, <code>RiderClaim</code>
          </td>
          <td>
            Collapsed by default behind an amber clock header. The policy&rsquo;s end-state status is shown
            below the insurance type so the user understands why the policy is not selectable.
          </td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>On Behalf Of</h3>

  <EdProse>
    When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading
    name), <code>OnBehalfOf.TradingName</code> identifies the entity to the user on both the Consent and
    Authorisation pages.
  </EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>OnBehalfOf.TradingName</code></th>
          <th>Consent / Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Provided</strong></td>
          <td>The trading name is displayed in the page copy so the user clearly understands which entity they are sharing data with.</td>
        </tr>
        <tr>
          <td><strong>Not provided</strong></td>
          <td>The TPP&rsquo;s registered name is displayed in place of the trading name.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdNote type="tip">
    <p>Always populate <code>OnBehalfOf.TradingName</code> so users see a recognisable name rather than a blank or placeholder.</p>
  </EdNote>
</template>

<script setup lang="ts">
import {
  insurancePermissionDescriptions,
  insurancePermissionGroups,
} from '@/components/common/composables/insurancePermissionDescriptions.ts'
</script>
