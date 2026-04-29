<route lang="yaml">
meta:
  title: Trust Framework — Application
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Applications
        </div>
        <h1 class="ed-doc__title">
          Application
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Within the Trust Framework, an application performs two closely related roles:
          <strong>software statement</strong> and <strong>client</strong>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="software-statement"
      num="01"
      color="var(--at-teal)"
      eyebrow="As a Software Statement"
      title="The application's identity within the ecosystem"
      tone="cream"
    >
      <EdProse>
        As a software statement, the application contains the key information required to establish a
        trusted connection with other organisations. This includes:
      </EdProse>

      <EdBullets>
        <li>The roles it is permitted to perform (e.g. <strong>BDSP</strong>, <strong>BSIP</strong>)</li>
        <li>The organisation it belongs to</li>
        <li>Its approved capabilities and permissions</li>
      </EdBullets>

      <EdProse>
        In this role, it defines the identity and permissions of the application as authorised within the
        ecosystem.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="client"
      num="02"
      color="var(--at-gold)"
      eyebrow="As a Client"
      title="The active connection to other organisations"
      tone="surface"
    >
      <EdProse>
        As a client, the same application becomes the active connection to another organisation (such as
        the API Hub). In this role, it:
      </EdProse>

      <EdBullets>
        <li>Is issued credentials (such as a client ID and certificates)</li>
        <li>Uses those credentials to make API calls and perform transactions</li>
        <li>Is registered with the API Hub</li>
      </EdBullets>

      <EdProse>In simple terms:</EdProse>

      <EdProse>
        An application both <strong>defines what it is allowed to do</strong> and <strong>uses those
        permissions to interact with other participants</strong>, in line with the rules set by the Central
        Bank of the UAE.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="application-details"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Application Details"
      title="What every application must register"
      tone="cream"
    >
      <EdProse>Each application must include the following details:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Roles</strong></td>
              <td>Functional roles assigned to the application, inherited from the parent organisation's registered roles.</td>
              <td><code>BSIP</code>, <code>BDSP</code></td>
            </tr>
            <tr>
              <td><strong>Client Name</strong></td>
              <td>The public-facing name of the application as registered in the Trust Framework.</td>
              <td><code>MyApp v1</code></td>
            </tr>
            <tr>
              <td><strong>Version</strong></td>
              <td>The current version of the application or software statement.</td>
              <td><code>1.0.3</code></td>
            </tr>
            <tr>
              <td><strong>Federation Entity Management Type</strong></td>
              <td>Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated).</td>
              <td><code>federation-managed</code></td>
            </tr>
            <tr>
              <td><strong>Logo</strong></td>
              <td>A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens.</td>
              <td><code>logo.png</code></td>
            </tr>
            <tr>
              <td><strong>Redirect URI</strong></td>
              <td>
                Must be a valid HTTPS URI that complies with FAPI standards for redirection after
                authentication.<br><br>
                More information on Mobile app
                <a href="/tech/tpp-standards/trust-framework/redirect-uri">Redirect URIs</a>.
              </td>
              <td><code>https://app.example.com/callback</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
