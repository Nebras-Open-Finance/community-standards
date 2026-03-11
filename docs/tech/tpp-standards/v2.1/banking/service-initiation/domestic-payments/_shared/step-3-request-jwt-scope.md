With your `authorization_details` ready, generate a PKCE code pair then use the [`buildRequestJWT()`](/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt) helper, passing `payments openid` as the scope.

::: warning Scope change required when using Permissions
If your consent includes `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances`, you must change the scope to `accounts payments openid`. Without the `accounts` scope the issued token will not grant access to the account endpoints. You will also need the **BDSP** role. See [Account Permissions in a Payment Consent](/knowledge-base/articles/payment-account-permissions).
:::
