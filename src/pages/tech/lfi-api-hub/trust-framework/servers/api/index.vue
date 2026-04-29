<route lang="yaml">
meta:
  title: Trust Framework — API Resources
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Servers · API Resources
        </div>
        <h1 class="ed-doc__title">
          API Resources
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          <strong>API Resources</strong> are registered under your Authorisation Server and describe the
          specific API endpoints your organisation exposes to TPPs. Each API resource is associated with a
          set of scopes and a base URL, allowing TPPs to discover what you offer and how to reach it.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          TPPs can discover the endpoints you expose via
          <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint"><span class="http-method http-method--get">GET</span><code>/participants</code></a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-is-api-resource"
      num="01"
      color="var(--at-teal)"
      eyebrow="What is an API Resource?"
      title="The directory record TPPs use to find your endpoints"
      tone="cream"
    >
      <EdProse>An API resource entry in the Trust Framework directory tells TPPs:</EdProse>
      <EdBullets>
        <li><strong>Which API family</strong> you support (e.g. banking data sharing, payment initiation)</li>
        <li><strong>Where to send requests</strong> (the base URL for that API on your infrastructure)</li>
        <li><strong>Which scopes are applicable</strong> for that API family</li>
      </EdBullets>
      <EdProse>
        When a TPP dynamically registers with your authorisation server, it uses the API resource entries
        to understand which scopes to request and which base URL to call.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-families"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Families"
      title="Grouped sets of endpoints exposed by the API Hub"
      tone="surface"
    >
      <EdProse>
        The Open Finance UAE ecosystem organises APIs into <strong>API families</strong>. Each family
        groups a set of related endpoints that the <strong>API Hub exposes to TPPs</strong>. The Base URL
        for these TPP-facing endpoints is always your API Hub resource server:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Base URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-production</td>
              <td><code>https://rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td>Production</td>
              <td><code>https://rs1.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the
        corresponding endpoint on your <strong>Ozone Connect</strong> implementation. The tables below
        show each TPP-facing API resource and the Ozone Connect endpoint it maps to.
      </EdProse>

      <EdProse>
        The structure and schema of all available API families can be retrieved from the Trust Framework
        via
        <a href="/tech/lfi-api-hub/trust-framework/api/api-families" class="endpoint"><span class="http-method http-method--get">GET</span><code>/references/apifamilies</code></a>
        &mdash; this returns the family definitions, including their endpoint patterns and metadata
        schemas.
      </EdProse>

      <EdNote type="info" title="Publishing to production">
        <p>
          An LFI can only publish API resources to the <strong>production</strong> Trust Framework once
          they have completed
          <a href="/tech/lfi-api-hub/production/testing-certification/functional">Functional Certification</a>.
          API resources MAY be published to the <strong>sandbox</strong> Trust Framework at any time for
          development and testing.
        </p>
      </EdNote>

      <EdNote type="tip" title="API Hub default endpoints">
        <p>
          Endpoints marked <strong>API Hub default</strong> are delivered entirely by the API Hub &mdash;
          the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be
          included when publishing the API family.
        </p>
      </EdNote>

      <EdProse>The following families are available in version <strong>2.1</strong>.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="account-information"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Account Information"
      title="account-information"
      tone="cream"
    >
      <EdProse>
        Banking data sharing &mdash; account information, balances, transactions, beneficiaries, and
        related sub-resources.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Resource (TPP-facing)</th>
              <th>Ozone Connect Endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/balances</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/balances</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/transactions</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/transactions</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/beneficiaries</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/beneficiaries</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/direct-debits</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/direct-debits</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/standing-orders</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/standing-orders</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/scheduled-payments</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/scheduled-payments</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/statements</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/statements</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/product</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/products</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/parties</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/customer</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties" class="endpoint"><span class="http-method http-method--get">GET</span><code>/parties</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" class="endpoint"><span class="http-method http-method--get">GET</span><code>/customer</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents</code></a></td><td><strong>API Hub default</strong></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents/{ConsentId}</code></a></td><td><strong>API Hub default</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payment"
      num="04"
      color="var(--at-navy)"
      eyebrow="Payment Initiation"
      title="payment"
      tone="surface"
    >
      <EdProse>Payment initiation &mdash; domestic single payments and multi-payments.</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Resource (TPP-facing)</th>
              <th>Ozone Connect Endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{PaymentId}</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payment-consents/{ConsentId}/refund</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payment-consents/{consentId}/refund</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents</code></a></td><td><strong>API Hub default</strong></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}</code></a></td><td><strong>API Hub default</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="confirmation"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Confirmation of Payee"
      title="confirmation"
      tone="cream"
    >
      <EdProse>Confirmation of payee &mdash; payee name verification before initiating a payment.</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Resource (TPP-facing)</th>
              <th>Ozone Connect Endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation" class="endpoint"><span class="http-method http-method--post">POST</span><code>/confirmation</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query" class="endpoint"><span class="http-method http-method--post">POST</span><code>/customers/action/cop-query</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery" class="endpoint"><span class="http-method http-method--get">GET</span><code>/discovery</code></a></td><td><strong>API Hub default</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="atm"
      num="06"
      color="var(--at-gold)"
      eyebrow="ATM"
      title="atm"
      tone="surface"
    >
      <EdProse>ATM location data &mdash; publicly accessible, no consent required.</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Resource (TPP-facing)</th>
              <th>Ozone Connect Endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/atms/open-api/atms" class="endpoint"><span class="http-method http-method--get">GET</span><code>/atms</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm" class="endpoint"><span class="http-method http-method--get">GET</span><code>/atm</code></a></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="product"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Products & Leads"
      title="product"
      tone="cream"
    >
      <EdProse>Product catalogue and lead generation &mdash; publicly accessible product listings.</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Resource (TPP-facing)</th>
              <th>Ozone Connect Endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/products-leads/open-api/products" class="endpoint"><span class="http-method http-method--get">GET</span><code>/products</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products" class="endpoint"><span class="http-method http-method--get">GET</span><code>/products</code></a></td></tr>
            <tr><td><a href="/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads" class="endpoint"><span class="http-method http-method--post">POST</span><code>/leads</code></a></td><td><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads" class="endpoint"><span class="http-method http-method--post">POST</span><code>/leads</code></a></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="relationship-to-scopes"
      num="08"
      color="var(--at-navy)"
      eyebrow="Relationship to Scopes"
      title="API families carry defined OAuth 2.0 scopes"
      tone="surface"
    >
      <EdProse>
        Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the
        Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for
        a given scope will be directed to your server as the resource owner for that family.
      </EdProse>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Next Steps
          </div>
          <h2 class="ed-doc__contents-title">Add and configure API resources</h2>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/creating" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Walkthrough</span></div>
            <h3 class="ed-link-card__title">Creating an API Resource</h3>
            <p class="ed-link-card__desc">Step-by-step walkthrough of registering an API family on your server.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/meta" :style="{ '--card-color': 'var(--at-gold, #b08800)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Reference</span></div>
            <h3 class="ed-link-card__title">API Resource Meta Data</h3>
            <p class="ed-link-card__desc">Metadata schema fields each API family supports.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__contents-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0; color: var(--at-navy-deep); }
.ed-doc__contents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr)); gap: 1.25rem; }

.ed-link-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem 1.5rem; text-decoration: none; color: inherit; transition: border-color 0.2s ease, transform 0.2s ease; }
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; background: var(--card-color, var(--at-navy)); }
.ed-link-card__meta { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; flex-wrap: wrap; }
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title { font-family: var(--at-serif); font-size: 1.4rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; color: var(--at-navy-deep); margin: 0 0 0.85rem; }
.ed-link-card__desc { font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1; }
.ed-link-card__foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
