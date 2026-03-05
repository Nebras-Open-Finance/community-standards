<template>
  <table class="perm-ref-table">
    <thead>
      <tr>
        <th><code>Initiation.DebtorAccount</code></th>
        <th>LFI Authorisation Page Behaviour</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Passed in</strong></td>
        <td>Account is pre-selected and shown to the user — no account selection step at the LFI.</td>
      </tr>
      <tr>
        <td><strong>Not passed in</strong></td>
        <td>The LFI presents an account selection step so the user can choose which account to debit.</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.perm-ref-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.perm-ref-table th {
  text-align: left;
  padding: 0.45rem 0.75rem;
  background: rgba(0, 39, 127, 0.04);
  border: 1px solid rgba(0, 39, 127, 0.1);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0, 39, 127, 0.6);
}

.perm-ref-table td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.5;
}

.perm-ref-table tr:nth-child(even) td {
  background: #fafafa;
}
</style>
