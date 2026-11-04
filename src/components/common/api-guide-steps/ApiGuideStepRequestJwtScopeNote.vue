<script setup lang="ts">
import { computed } from 'vue'
import { useRouteVersion } from '@/composables/useSelectedVersion'

// The permissions that need the `accounts` scope on a payment consent. v2.2 adds
// ReadPartyIdentity, which is served by GET /parties under the same scope.
const { docsVersion } = useRouteVersion()
const scopePermissions = computed(() =>
  docsVersion.value === 'v2.1'
    ? ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances']
    : ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances', 'ReadPartyIdentity'],
)

function separator(i: number): string {
  const last = scopePermissions.value.length - 1
  if (i === last) return ''
  return i === last - 1 ? ', or ' : ', '
}
</script>

<template>
  <div class="ag-step">
    <EdProse>
      With your <code>authorization_details</code> ready, generate a PKCE code pair then use the
      <a href="/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt"><code>buildRequestJWT()</code></a>
      helper, passing <code>payments openid</code> as the scope.
    </EdProse>

    <EdNote type="warning" title="Scope change required when using Permissions">
      <p>
        If your consent includes
        <template v-for="(perm, i) in scopePermissions" :key="perm"><code>{{ perm }}</code>{{ separator(i) }}</template>,
        you must change the scope to
        <code>accounts payments openid</code>. Without the <code>accounts</code> scope the issued token
        will not grant access to the account endpoints. You will also need the <strong>BDSP</strong>
        role. See
        <a href="/knowledge-base/articles/payment-account-permissions">Account Permissions in a Payment
        Consent</a>.
      </p>
    </EdNote>
  </div>
</template>
