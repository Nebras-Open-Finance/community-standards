<template>
  <EdProse>
    Configure the mock accounts the authenticated user holds at their bank. The Authorisation Page will offer these accounts when the user picks a debtor account, or validate the <code>Initiation.DebtorAccount</code> against them when one is pre-selected by the TPP.
  </EdProse>

  <AccountEditor :allowed-types="['CurrentAccount', 'Savings']" :allowed-currencies="['AED']" />
</template>
