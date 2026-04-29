<route lang="yaml">
meta:
  title: Trust Framework — API Resources
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · LFI Discovery
        </div>
        <h1 class="ed-doc__title">
          API Resources
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The API resources hosted on an LFI's Authorisation Server represent the key resources that are
          exposed through various endpoints.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">The format of these endpoints is:</p>
        <ul class="ed-doc__bullets">
          <li><strong>Production:</strong> <code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]</code></li>
          <li><strong>Sandbox:</strong> <code>https://rs1.[LFICode].sandbox.apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]</code></li>
        </ul>
        <p class="ed-doc__lede ed-doc__lede--tight">
          These endpoints are organized into structured categories known as <strong>API families</strong>.
          Each API family groups together related functionality, making it easier for TPPs to understand
          the available services.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="payment"
      num="01"
      color="var(--at-teal)"
      eyebrow="API Family"
      title="payment"
      tone="cream"
    >
      <EdProse>This family includes endpoints related to initiating and managing payments.</EdProse>
      <EdBullets>
        <li>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/">Bank Service Initiation</a> functionality and associated with the <strong>BSIP</strong> role.</li>
        <li>Allowed API scopes: <code>openid payments</code></li>
      </EdBullets>

      <h3>Consent Endpoints</h3>
      <EdProse>These endpoints are used to create and manage payment consents.</EdProse>
      <EdBullets>
        <li>Supported grant type: <code>client_credentials</code></li>
      </EdBullets>
      <EdProse><em>Example endpoints:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}</code></li>
      </EdBullets>

      <h3>Resource Endpoints</h3>
      <EdProse>
        These endpoints are used to initiate and retrieve payments, including file-based payments.
      </EdProse>
      <EdBullets>
        <li>Supported grant types: <code>authorization_code</code>, <code>refresh_token</code></li>
      </EdBullets>
      <EdProse><em>Example endpoints:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments</code></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="account-information"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Family"
      title="account-information"
      tone="surface"
    >
      <EdProse>
        This family includes endpoints related to retrieving bank data e.g. accounts, balances,
        transactions, etc.
      </EdProse>
      <EdBullets>
        <li>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/data-sharing/">Bank Data Sharing</a> functionality and are associated with the <strong>BDSP</strong> role.</li>
        <li>Allowed API scopes: <code>openid accounts</code></li>
        <li>Supported grant types: <code>authorization_code</code>, <code>refresh_token</code></li>
      </EdBullets>

      <h3>Consent Endpoints</h3>
      <EdProse>These endpoints are used to create and manage account information consents.</EdProse>
      <EdBullets>
        <li>Supported grant type: <code>client_credentials</code></li>
      </EdBullets>
      <EdProse><em>Example endpoints:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}</code></li>
      </EdBullets>

      <h3>Resource Endpoints</h3>
      <EdProse>These endpoints are used to retrieve account information.</EdProse>
      <EdBullets>
        <li>Supported grant types: <code>authorization_code</code>, <code>refresh_token</code></li>
      </EdBullets>
      <EdProse><em>Example endpoints:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions</code></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="confirmation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="API Family"
      title="confirmation"
      tone="cream"
    >
      <EdProse>
        This family includes endpoints related to the discovery and confirmation of bank account details,
        such as verifying account ownership before initiating payments.
      </EdProse>
      <EdBullets>
        <li>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/">Confirmation of Payee</a> functionality and are associated with the <strong>BSIP</strong> role.</li>
        <li>Allowed API scopes: <code>openid payments</code></li>
        <li>Supported grant types: <code>client_credentials</code></li>
      </EdBullets>

      <EdProse><em>Resource Endpoint examples:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery</code></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="product"
      num="04"
      color="var(--at-navy)"
      eyebrow="API Family"
      title="product"
      tone="surface"
    >
      <EdProse>
        This family includes endpoints related to the discovery of banking products and posting a user who
        is interested in applying for a banking product.
      </EdProse>
      <EdBullets>
        <li>Associated with the <strong>BDSP</strong> role.</li>
        <li>Allowed API scopes: <code>openid accounts</code></li>
        <li>Supported grant types: <code>client_credentials</code></li>
      </EdBullets>

      <EdProse><em>Resource Endpoint examples:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products</code></li>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads</code></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="atm"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="API Family"
      title="atm"
      tone="cream"
    >
      <EdProse>
        This family includes endpoints related to the discovery of an LFI's ATM network &mdash; locations,
        services, and accessibility data.
      </EdProse>
      <EdBullets>
        <li>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/atms">ATMs</a> functionality and are associated with the <strong>BDSP</strong> role.</li>
        <li>Allowed API scopes: <code>atm</code></li>
        <li>Supported grant types: <code>client_credentials</code></li>
      </EdBullets>

      <EdProse><em>Resource Endpoint examples:</em></EdProse>
      <EdBullets>
        <li><code>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/atm/[Version]/atms</code></li>
      </EdBullets>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__bullets {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  margin: 0.85rem 0 0 1.2rem;
  padding: 0;
  max-width: 56rem;
  color: var(--at-mute-2);
}
.ed-doc__bullets li { margin: 0.3rem 0; word-break: break-all; }
.ed-doc__bullets strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__bullets code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
  word-break: break-all;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
