<template>
  <div class="ag-step">
    <EdProse>
      With your <code>authorization_details</code> ready, generate a PKCE code pair then use the
      <a href="/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt"><code>buildRequestJWT()</code></a>
      helper, passing <code>payments openid</code> as the scope.
    </EdProse>

    <EdNote type="warning" title="Scope change required when using Permissions">
      <p>
        If your consent includes <code>ReadAccountsBasic</code>, <code>ReadAccountsDetail</code>, or
        <code>ReadBalances</code>, you must change the scope to
        <code>accounts payments openid</code>. Without the <code>accounts</code> scope the issued token
        will not grant access to the account endpoints. You will also need the <strong>BDSP</strong>
        role. See
        <a href="/knowledge-base/articles/payment-account-permissions">Account Permissions in a Payment
        Consent</a>.
      </p>
    </EdNote>
  </div>
</template>
