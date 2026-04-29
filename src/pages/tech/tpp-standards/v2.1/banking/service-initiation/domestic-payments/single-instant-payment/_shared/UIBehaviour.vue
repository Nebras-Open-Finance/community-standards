<template>
  <h3>Debtor Account Selection</h3>

  <EdProse>The presence or absence of <code>Initiation.DebtorAccount</code> in <code>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.</EdProse>

  <EdNote type="tip">
    <p>Passing a <code>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.</p>
  </EdNote>

  <h3>Merchant Details</h3>

  <EdProse>When a TPP processes payments on behalf of a merchant (e.g. a payment aggregator), <code>Risk.CreditorIndicators.MerchantDetails.MerchantName</code> can be passed to identify the merchant to the user on the LFI Authorisation Page.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>Risk.CreditorIndicators.MerchantDetails.MerchantName</code></th>
          <th>LFI Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Passed in</strong></td>
          <td>The merchant name is displayed on the Authorisation Page alongside the creditor details, indicating that the payment is being made on behalf of that merchant. <em>(See Example 4)</em></td>
        </tr>
        <tr>
          <td><strong>Not passed in</strong></td>
          <td>No merchant information is shown. Only the creditor details are displayed. <em>(See Examples 1, 2 &amp; 3)</em></td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

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
          <td>Not Supported</td>
        </tr>
        <tr>
          <td><strong>Undefined</strong> (absent or empty)</td>
          <td>Not Supported</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>Trusted Payees Wording</h3>

  <EdProse>The wording of the "Add to my list of Trusted Payees" checkbox is driven by <code>Initiation.Creditor[].CreditorAccount.Type</code> in <code>domestic_payment_pii</code>. Whether the checkbox is shown at all is a separate, account-driven behaviour &mdash; see Trusted Payees under <em>UI Behaviour Driven by Account State</em>.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th><code>CreditorAccount.Type</code></th>
          <th>Checkbox Text</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Individual</code></td>
          <td>Add person to my list of Trusted Payees</td>
        </tr>
        <tr>
          <td><code>Merchant</code></td>
          <td>Add merchant to my list of Trusted Payees</td>
        </tr>
        <tr>
          <td><code>Business</code></td>
          <td>Add business to my list of Trusted Payees</td>
        </tr>
        <tr>
          <td><code>Charity</code></td>
          <td>Add charity to my list of Trusted Payees</td>
        </tr>
        <tr>
          <td><code>GovernmentBody</code></td>
          <td>Add government body to my list of Trusted Payees</td>
        </tr>
        <tr>
          <td><code>Other</code> or not provided</td>
          <td>Add to my list of Trusted Payees</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>Permissions and Data Access</h3>

  <EdProse>The table below describes the text shown to users on the Consent Page.</EdProse>

  <ServiceInitiationPermissionText />

  <div class="ui-break">
    <span class="ui-break__eyebrow">Account-Driven Behaviour</span>
    <h3 class="ui-break__title">UI Behaviour Driven by Account State</h3>
  </div>

  <EdProse>Some Authorisation Page behaviours are not driven by fields in the consent request &mdash; they are driven by the customer's account state or account-level settings at the LFI. The TPP cannot control these; the LFI determines them at the point of authorisation.</EdProse>

  <EdProse>Use the <strong>Simulated Accounts Behaviour</strong> panel above to preview each state.</EdProse>

  <h3>Warnings &amp; Priority</h3>

  <EdProse>The LFI may surface one of three warnings on the Authorisation Page based on the account and payment state. Only one warning is shown at a time, with the following priority order:</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Warning</th>
          <th>Warning Text</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1 (highest)</strong></td>
          <td>Payment Limit Exceeded</td>
          <td><em>Payment limit exceeded &mdash; The amount exceeds the payment limit you've set on your account. You may need to change your settings or try a smaller amount.</em></td>
        </tr>
        <tr>
          <td><strong>2</strong></td>
          <td>Overdraft</td>
          <td><em>This payment will take your selected account into an overdraft/unarranged overdraft.</em></td>
        </tr>
        <tr>
          <td><strong>3</strong></td>
          <td>Duplicate Payment Alert</td>
          <td><em>Duplicate Payment Alert &mdash; Our systems indicate that you have already made a payment of the same amount to this beneficiary in the last 24 hours. Please check and ensure that you are not making a duplicate payment.</em></td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdProse>If a higher-priority warning applies, lower-priority warnings are suppressed. For example, if both a payment limit breach and a duplicate are detected, only the Payment Limit Exceeded warning is shown.</EdProse>

  <h3>Trusted Payees</h3>

  <EdProse>The LFI shows the "Add to my list of Trusted Payees" checkbox only if the creditor is not already a trusted payee on the customer's account. If the creditor is already a trusted payee, the checkbox is suppressed. The wording of the checkbox label is driven by an API field &mdash; see Trusted Payees Wording under <em>UI Behaviour Driven by API Fields</em>.</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Creditor status on the customer's account</th>
          <th>Authorisation Page Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Not</strong> already a trusted payee</td>
          <td>The checkbox is shown.</td>
        </tr>
        <tr>
          <td><strong>Already</strong> a trusted payee</td>
          <td>The checkbox is suppressed.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>
</template>

<style scoped>
.ui-break {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--at-navy-deep);
}
.ui-break__eyebrow {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  margin-bottom: 0.7rem;
}
.ui-break__title {
  font-family: var(--at-serif);
  font-size: 1.65rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--at-navy-deep);
  margin: 0;
}
</style>

