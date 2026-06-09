<route lang="yaml">
meta:
  title: Trust Framework — API
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · API
        </div>
        <h1 class="ed-doc__title">
          API
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Several things that you can do in the Trust Framework portal can also be done via API &mdash;
          managing organisations, software statements, authorisation servers, certificates, and contacts.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The API uses <strong>mTLS</strong> for all authenticated requests. A valid transport certificate
          registered in the Trust Framework is required.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="endpoints"
      num="01"
      color="var(--at-teal)"
      eyebrow="Endpoints"
      title="Production and Sandbox base URLs"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Production</th>
              <th>Sandbox</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Well Known</strong></td>
              <td><a href="https://auth.directory.openfinance.ae/.well-known/openid-configuration"><code>auth.directory.openfinance.ae/.well-known/openid-configuration</code></a></td>
              <td><a href="https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration"><code>auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration</code></a></td>
            </tr>
            <tr>
              <td><strong>Auth</strong></td>
              <td><code>https://matls-auth.directory.openfinance.ae</code></td>
              <td><code>https://matls-auth.sandbox.directory.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>API</strong></td>
              <td><code>https://matls-api.directory.openfinance.ae</code></td>
              <td><code>https://matls-api.sandbox.directory.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        As per the Trust Framework, the API is powered by <strong>Raidiam</strong> and the official
        documentation can be found at
        <a href="https://www.raidiam.com/developers/docs/apis">raidiam.com/developers/docs/apis</a>.
      </EdProse>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-doc__contents-title">Browse this section</h2>
          <p class="ed-doc__contents-sub">The full set of pages covering the Trust Framework API.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-guide" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">API Guide</h3>
            <p class="ed-link-card__desc">Implementation notes, signing helpers, and worked examples for calling the Trust Framework API.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/token" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-post">POST</span>
              <code class="ed-link-card__path">/token</code>
            </div>
            <h3 class="ed-link-card__title">Create a token</h3>
            <p class="ed-link-card__desc">OpenAPI reference for the Trust Framework <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/token</code></span> endpoint.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/organisations" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">/organisations</code>
            </div>
            <h3 class="ed-link-card__title">Get organisations</h3>
            <p class="ed-link-card__desc">OpenAPI reference for fetching organisations from the Trust Framework Directory.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/software-statements" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">.../{OrganisationId}/softwarestatements</code>
            </div>
            <h3 class="ed-link-card__title">Get software statements</h3>
            <p class="ed-link-card__desc">OpenAPI reference for fetching software statements registered for an organisation.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/contacts" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">.../{OrganisationId}/contacts</code>
            </div>
            <h3 class="ed-link-card__title">Get contacts</h3>
            <p class="ed-link-card__desc">OpenAPI reference for fetching the contacts registered for an organisation.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/auth-servers" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">.../{OrganisationId}/authorisationservers</code>
            </div>
            <h3 class="ed-link-card__title">Get authorisation servers</h3>
            <p class="ed-link-card__desc">OpenAPI reference for fetching authorisation servers under an organisation.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-resources" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">.../{AuthorisationServerId}/apiresources</code>
            </div>
            <h3 class="ed-link-card__title">Get API resources</h3>
            <p class="ed-link-card__desc">OpenAPI reference for fetching API resources registered on an authorisation server.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-families" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-get">GET</span>
              <code class="ed-link-card__path">/references/apifamilies</code>
            </div>
            <h3 class="ed-link-card__title">Get API families</h3>
            <p class="ed-link-card__desc">OpenAPI reference for retrieving the full set of API family definitions and metadata schemas.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
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

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__contents-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep); }
.ed-doc__contents-sub { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); margin: 0; }
.ed-doc__contents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr)); gap: 1.25rem; }

.ed-link-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem 1.5rem; text-decoration: none; color: inherit; transition: border-color 0.2s ease, transform 0.2s ease; }
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; background: var(--card-color, var(--at-navy)); }
.ed-link-card__meta { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; flex-wrap: wrap; }
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__path { font-family: var(--at-mono); font-size: 0.7rem; font-weight: 500; letter-spacing: -0.005em; text-transform: none; color: var(--at-navy-deep); background: none; padding: 0; }
.ed-link-card__title { font-family: var(--at-serif); font-size: 1.4rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; color: var(--at-navy-deep); margin: 0 0 0.85rem; }
.ed-link-card__desc { font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1; }
.ed-link-card__desc :deep(code), .ed-link-card__desc code { font-family: var(--at-mono); font-size: 0.82em; background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep); }
.ed-link-card__foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
