<route lang="yaml">
meta:
  title: "Account Permissions in a Payment Consent"
  description: "How to use ReadAccountsBasic, ReadAccountsDetail, and ReadBalances on a payment consent, which endpoints they unlock, and why they're useful during a payment flow."
  category: Payments
  readTime: "6 min"
  updated: "2026-04-21"
  tags:
    - Payments
    - Permissions
    - Account Data
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'why',          label: 'Why include' },
  { id: 'available',    label: 'Available perms' },
  { id: 'scope',        label: 'Scope impact' },
  { id: 'request',      label: 'Requesting' },
  { id: 'calling',      label: 'Calling endpoints' },
  { id: 'relationship', label: 'vs Data Sharing' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Payments' },
  { label: 'Read',     value: '6 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Payments', 'Permissions', 'Account Data']

const requestExample = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": { /* payment schedule */ },
      "PersonalIdentifiableInformation": "{{encryptedPII}}",
      "PaymentPurposeCode": "ACM"
    }
  }
]`

const scopeUpdateNode = `const requestJWT = await buildRequestJWT({
  scope: 'accounts payments openid',  // changed from 'payments openid'
  codeChallenge,
  authorizationDetails,
})`

const scopeUpdatePython = `request_jwt = build_request_jwt(
    scope="accounts payments openid",  # changed from "payments openid"
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)`

const accountsCallNode = `const { Data: { Account: accounts } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

const accountId = accounts[0].AccountId`

const accountsCallPython = `import httpx

accounts = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Account"]

account_id = accounts[0]["AccountId"]`

const accountDetailCallNode = `const { Data: { Account: [account] } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts/\${accountId}\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

// account.Account[0].Identification — the IBAN`

const accountDetailCallPython = `account = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Account"][0]

# account["Account"][0]["Identification"] — the IBAN`

const balancesCallNode = `const { Data: { Balance } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts/\${accountId}/balances\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

// Balance[0].Amount.Amount — available balance
// Balance[0].CreditDebitIndicator — 'Credit' or 'Debit'`

const balancesCallPython = `balance = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}/balances",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Balance"]

# balance[0]["Amount"]["Amount"] — available balance
# balance[0]["CreditDebitIndicator"] — 'Credit' or 'Debit'`

const scopeUpdateTabs        = [{ label: 'Node.js', lang: 'typescript', code: scopeUpdateNode },        { label: 'Python', lang: 'python', code: scopeUpdatePython }] as const
const accountsCallTabs       = [{ label: 'Node.js', lang: 'typescript', code: accountsCallNode },       { label: 'Python', lang: 'python', code: accountsCallPython }] as const
const accountDetailCallTabs  = [{ label: 'Node.js', lang: 'typescript', code: accountDetailCallNode },  { label: 'Python', lang: 'python', code: accountDetailCallPython }] as const
const balancesCallTabs       = [{ label: 'Node.js', lang: 'typescript', code: balancesCallNode },       { label: 'Python', lang: 'python', code: balancesCallPython }] as const
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Account Permissions in a Payment Consent"
      :meta="meta"
      lede="A payment consent can optionally include a small set of account-reading permissions. Allows a TPP to read the payer's account details and balance using the <strong>same access token</strong> issued for the payment &mdash; without creating a separate <a href='/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/'>Bank Data Sharing</a> consent."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="why"
      num="01"
      color="var(--at-teal)"
      eyebrow="Why include them"
      title="What account access enables during a payment flow"
      tone="cream"
    >
      <EdProse>During a payment flow the TPP typically needs to:</EdProse>
      <EdBullets>
        <li><strong>Display the payer's debit account</strong> &mdash; the user should be able to confirm which account they are paying from before authorizing.</li>
        <li><strong>Show the available balance</strong> &mdash; helps the user check they have sufficient funds before approving the payment.</li>
        <li><strong>Pre-fill the debit account</strong> &mdash; some UX patterns let the user pick an account; <code>ReadAccountsBasic</code> provides the list.</li>
      </EdBullets>
      <EdProse>Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment &mdash; it cannot call any account endpoints.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="available"
      num="02"
      color="var(--at-gold)"
      eyebrow="Available permissions"
      title="Three reads, one refund-routing extra"
      lede="These three permissions are the only account-reading permissions available on a payment consent. They are a <strong>small subset</strong> of the full set available in a Bank Data Sharing consent."
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Permission</th><th>Endpoint unlocked</th><th>What it returns</th></tr></thead>
          <tbody>
            <tr><td><code>ReadAccountsBasic</code></td><td><code>GET /accounts</code></td><td>List of accounts with basic metadata (account type, currency, nickname). Does <strong>not</strong> include the full account number or IBAN.</td></tr>
            <tr><td><code>ReadAccountsDetail</code></td><td><code>GET /accounts/{AccountId}</code></td><td>Full account record including the IBAN/account identification. Requires <code>ReadAccountsBasic</code> to first retrieve an <code>AccountId</code>.</td></tr>
            <tr><td><code>ReadBalances</code></td><td><code>GET /accounts/{AccountId}/balances</code></td><td>Current balance for a specific account (available balance, credit/debit indicator, and currency).</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse><code>ReadRefundAccount</code> is a fourth permission on a payment consent. It unlocks <code>GET /payment-consents/{ConsentId}/refund</code> and is used to retrieve account details for routing a refund &mdash; it is not an account-reading permission in the same sense.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="03"
      color="var(--at-blue)"
      eyebrow="Scope impact"
      title="The Request JWT scope changes"
      tone="cream"
    >
      <EdProse>Including any of the three permissions above <strong>changes the required scope</strong> in the <code>/par</code> Request JWT.</EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Consent includes</th><th>Scope in Request JWT</th></tr></thead>
          <tbody>
            <tr><td>Payment only (no account permissions)</td><td><code>payments openid</code></td></tr>
            <tr><td>Payment <strong>with</strong> <code>ReadAccountsBasic</code>, <code>ReadAccountsDetail</code>, or <code>ReadBalances</code></td><td><code>accounts payments openid</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning">
        <p>If account-reading permissions are present in <code>authorization_details</code> but <code>accounts</code> is omitted from the <code>scope</code>, the API Hub will reject the <code>/par</code> request.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="request"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Requesting the permissions"
      title="Add to authorization_details and update the scope"
      tone="surface"
    >
      <EdProse>Add the <code>Permissions</code> array to <code>authorization_details.consent</code> in your <code>/par</code> request alongside the payment fields:</EdProse>
      <EdCode :code="requestExample" lang="json" />
      <EdProse>And update the scope in your Request JWT:</EdProse>
      <EdCodeGroup :tabs="scopeUpdateTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="calling"
      num="05"
      color="var(--at-navy)"
      eyebrow="Calling the account endpoints"
      title="Use the same access token returned after the payment consent is authorized"
      tone="cream"
    >
      <h3>GET /accounts &mdash; requires <code>ReadAccountsBasic</code></h3>
      <EdCodeGroup :tabs="accountsCallTabs" />

      <h3>GET /accounts/{AccountId} &mdash; requires <code>ReadAccountsDetail</code></h3>
      <EdCodeGroup :tabs="accountDetailCallTabs" />

      <h3>GET /accounts/{AccountId}/balances &mdash; requires <code>ReadBalances</code></h3>
      <EdCodeGroup :tabs="balancesCallTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="relationship"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="vs Bank Data Sharing"
      title="Same model, scoped to the payment context"
      tone="surface"
      narrow
    >
      <EdProse>These permissions follow the same permission model as <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/">Bank Data Sharing</a> but are scoped to the payment context:</EdProse>
      <EdBullets>
        <li>Access <strong>expires when the payment consent expires</strong>.</li>
        <li>Access is <strong>limited to the accounts the user authorized</strong> at the LFI.</li>
        <li>Only these three account endpoints are available &mdash; no transactions, beneficiaries, statements, or other sub-resources.</li>
      </EdBullets>
      <EdProse>If you need access to the full range of account data, create a separate Bank Data Sharing consent.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/choosing-a-payment-type"
        category="Payments"
        category-color="var(--at-gold)"
        title="Choosing a Payment Type"
        desc="The seven payment shapes and how to pick the right one."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="Why PII in payment consents is encrypted end-to-end."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-gold) 14%, transparent); color: var(--at-gold); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
