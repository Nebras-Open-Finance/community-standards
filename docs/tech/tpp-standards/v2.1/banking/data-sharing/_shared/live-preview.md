Configure the mock accounts the authenticated user holds at their bank. Only accounts whose type matches the `AccountSubType` filter in `authorization_details` above will appear on the Authorisation Page.

<AccountEditor />

### Live UI Preview

Changes made above are immediately reflected in both panels.

<ConsentAuthLayout>
  <template #consent>
    <ConsentBankDataSharing />
  </template>
  <template #auth>
    <AuthorizationBankDataSharing />
  </template>
</ConsentAuthLayout>