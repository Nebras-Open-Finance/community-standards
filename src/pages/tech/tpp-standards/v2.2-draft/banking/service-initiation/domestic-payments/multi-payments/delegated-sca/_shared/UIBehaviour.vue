<template>
  <h3>Debtor Account Selection</h3>

  <EdProse>The presence or absence of <code>Initiation.DebtorAccount</code> in <code>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.</EdProse>

  <EdNote type="tip">
    <p>Passing a <code>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.</p>
  </EdNote>

  <h3>Creditor Configuration</h3>

  <EdProse>The presence or absence of creditors in <code>Initiation.Creditor</code> in <code>domestic_payment_pii</code> determines how the LFI presents payment recipient information to the user.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>Initiation.Creditor</code></th>
          <th>LFI Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1 creditor</strong></td>
          <td>The single payee's name and account details are displayed under "Who you're paying". <em>(See Example 1)</em></td>
        </tr>
        <tr>
          <td><strong>2&ndash;10 defined creditors</strong></td>
          <td>All specified payees are listed under "Who you're paying". <em>(See Examples 2, 3 &amp; 4)</em></td>
        </tr>
        <tr>
          <td><strong>Undefined</strong> (absent or empty)</td>
          <td>A general message informs the user that the TPP is responsible for selecting beneficiaries at payment time. <em>(See Example 5)</em></td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>Permissions and Data Access</h3>

  <ServiceInitiationPermissionText />
</template>
