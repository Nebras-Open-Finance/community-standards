<template>
  <h3>Permissions and Data Access</h3>

  <EdProse>The table below outlines the text displayed to users on the Consent Page when they expand each data category associated with the consent permissions.</EdProse>

  <PermissionsReference />

  <h3>Account Sub Type Filtering</h3>

  <EdProse>The <code>AccountSubType</code> field in <code>authorization_details</code> acts as a filter, controlling which of the user's accounts are presented for selection on the LFI Authorisation Page.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>AccountSubType</code></th>
          <th>LFI Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Provided</strong></td>
          <td>Only accounts whose sub-type matches one of the specified values are shown. If the user holds no accounts of the requested sub-type, the LFI returns an error and the authorisation flow cannot proceed.</td>
        </tr>
        <tr>
          <td><strong>Not provided</strong></td>
          <td>All of the user's available accounts are shown for selection, regardless of account type.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdNote type="tip">
    <p>Use <code>AccountSubType</code> to restrict access to specific account types (e.g. <code>Mortgage</code>). Omit it to allow selection from all account types.</p>
  </EdNote>

  <h3>On Behalf Of</h3>

  <EdProse>When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), <code>OnBehalfOf.TradingName</code> can be passed to identify the entity to the user on the LFI Authorisation Page.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>OnBehalfOf.TradingName</code></th>
          <th>LFI Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Provided</strong></td>
          <td>The trading name is displayed within the Authorisation Page so the user clearly understands which entity they are sharing data with.</td>
        </tr>
        <tr>
          <td><strong>Not provided</strong></td>
          <td>The TPP's name is displayed in place of the trading name.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdNote type="tip">
    <p>Always populate <code>OnBehalfOf.TradingName</code> so users see a recognisable name rather than a blank or placeholder on the Authorisation Page.</p>
  </EdNote>
</template>
