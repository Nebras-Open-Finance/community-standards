<template>
  <h3>Debtor Account Selection</h3>

  <EdProse>The presence or absence of <code>Initiation.DebtorAccount</code> in <code>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.</EdProse>

  <EdNote type="tip">
    <p>Passing a <code>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.</p>
  </EdNote>

  <h3>Payment Control Parameters</h3>

  <EdProse>Control parameters define the spending rules for the consent and are displayed in the <strong>Payment rules</strong> card on both the TPP Consent Page and the LFI Authorisation Page.</EdProse>

  <EdProse>There are two groups of control parameters: <strong>overall limits</strong> that apply across the full lifetime of the consent, and <strong>per-period limits</strong> that reset each period.</EdProse>

  <EdProse><strong>Overall limits</strong> (set at <code>ControlParameters.ConsentSchedule.MultiPayment</code>):</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>UI Label</th>
          <th>Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>MaximumCumulativeNumberOfPayments</code></td>
          <td><em>Total Number of Payments allowed</em></td>
          <td>The maximum number of individual payments that can be made across the entire consent. Only shown when provided.</td>
        </tr>
        <tr>
          <td><code>MaximumCumulativeValueOfPayments</code></td>
          <td><em>Total Value allowed</em></td>
          <td>The maximum total amount that can be paid across the entire consent. Only shown when provided.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdProse><strong>Per-period limits</strong> (set at <code>ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls</code>):</EdProse>

  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>UI Label</th>
          <th>Behaviour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Amount</code></td>
          <td><em>Per Payment</em></td>
          <td>The amount allowed for a single payment. Always shown.</td>
        </tr>
        <tr>
          <td><code>MaximumCumulativeNumberOfPaymentsPerPeriod</code></td>
          <td><em>Max Payments per {PeriodType}</em></td>
          <td>The maximum number of payments within a single period (e.g. per Week). The period type from <code>PeriodType</code> is substituted into the label. Only shown when provided.</td>
        </tr>
        <tr>
          <td><code>MaximumCumulativeValueOfPaymentsPerPeriod</code></td>
          <td><em>Max Value per {PeriodType}</em></td>
          <td>The maximum total value of payments within a single period. The period type from <code>PeriodType</code> is substituted into the label. Only shown when provided.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdNote type="tip">
    <p>If an optional parameter is not provided in the API request, it must be <strong>omitted entirely from the User Experience</strong> &mdash; it must <strong>not</strong> be displayed as <code>null</code> or <code>0</code>.</p>
    <p><strong>Correct</strong> &mdash; row not shown when parameter is absent:</p>
    <pre><code>Payment rules
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
Amount                              AED 200
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</code></pre>
    <p><strong>Incorrect</strong> &mdash; row shown with a null or zero value:</p>
    <pre><code>Payment rules
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
Amount                              AED 200
Total Number of Payments allowed          0
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</code></pre>
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
          <td>Not Supported</td>
        </tr>
        <tr>
          <td><strong>Undefined</strong> (absent or empty)</td>
          <td>Not Supported</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <h3>Permissions and Data Access</h3>

  <ServiceInitiationPermissionText />
</template>
