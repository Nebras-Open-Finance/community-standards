Configure the mock accounts the authenticated user holds at their bank. The Authorisation Page will offer these accounts when the user picks a debtor account, or validate the `Initiation.DebtorAccount` against them when one is pre-selected by the TPP.

<AccountEditor :allowed-types="['CurrentAccount', 'Savings']" :allowed-currencies="['AED']" />

### Live UI Preview

Changes made above are immediately reflected in both panels.

<ConsentAuthLayout>
  <template #consent>
    <ConsentDefinedSchedule scheduleType="fixed" />
  </template>
  <template #auth>
    <AuthorizationDefinedSchedule scheduleType="fixed" />
  </template>
</ConsentAuthLayout>
