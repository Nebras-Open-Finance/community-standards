<template>
  <h3>Debtor Account Selection</h3>

  <EdProse>The presence or absence of <code>Initiation.DebtorAccount</code> in <code>domestic_payment_pii</code> determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.</EdProse>

  <EdNote type="tip">
    <p>Passing a <code>DebtorAccount</code> reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.</p>
  </EdNote>

  <h3>Payment Control Parameters</h3>

  <EdProse>Control parameters define the spending rules for the consent and are displayed in the <strong>Payment rules</strong> card on both the TPP Consent Page and the LFI Authorisation Page.</EdProse>

  <EdProse>There are two groups of control parameters: <strong>overall limits</strong> that apply across the full lifetime of the consent, and the <strong>payment schedule</strong> that defines each individual payment.</EdProse>

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

  <EdProse><strong>Payment schedule</strong> (set at <code>ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule</code>):</EdProse>

  <EdProse>Unlike periodic schedule types, a Defined Schedule specifies each payment individually. Each entry in the <code>Schedule</code> array defines exactly one payment:</EdProse>

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
          <td><code>PaymentExecutionDate</code></td>
          <td><em>Date</em></td>
          <td>The specific date on which this payment may be executed. Each date must be unique across the schedule.</td>
        </tr>
        <tr>
          <td><code>MaximumIndividualAmount</code></td>
          <td><em>Max per Payment</em></td>
          <td>The maximum amount allowed for this scheduled payment. Always shown.</td>
        </tr>
        <tr>
          <td><em>(implicit)</em></td>
          <td><em>Payments per Date</em></td>
          <td>Only 1 payment is allowed per <code>PaymentExecutionDate</code>. Always enforced.</td>
        </tr>
      </tbody>
    </table>
  </EdRefTable>

  <EdProse>Each schedule entry is shown as a row in the <strong>Payment schedule</strong> section of the UI, displaying the date on the left and the maximum amount on the right.</EdProse>

  <EdNote type="tip">
    <p>If an optional parameter is not provided in the API request, it must be <strong>omitted entirely from the User Experience</strong> &mdash; it must <strong>not</strong> be displayed as <code>null</code> or <code>0</code>.</p>
    <p><strong>Correct</strong> &mdash; optional row not shown when parameter is absent:</p>
    <pre><code>Payment rules

Payment schedule
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
Date                             01/08/2026
Max Payment Amount                   500.00
Date                             02/09/2026
Max Payment Amount                  1200.00

Total Number of Payments allowed         3
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</code></pre>
    <p><strong>Incorrect</strong> &mdash; optional row shown with a null or zero value:</p>
    <pre><code>Payment rules
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
Date                             01/08/2026
Max Payment Amount                   500.00
Date                             02/09/2026
Max Payment Amount                  1200.00

Total Number of Payments allowed         3
Total Value allowed                      0
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

  <EdProse>The table below describes the text shown to users on the Consent Page.</EdProse>

  <ServiceInitiationPermissionText />
</template>
