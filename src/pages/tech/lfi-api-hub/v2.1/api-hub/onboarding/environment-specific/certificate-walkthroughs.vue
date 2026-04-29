<route lang="yaml">
meta:
  title: Certificate Walkthroughs
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/s1/1.png', import.meta.url).href, alt: 'Step 1', title: 'Click into your organisation' },
  { src: new URL('/images/raidiam/s1/2.png', import.meta.url).href, alt: 'Step 2', title: 'Click into organisation certificates' },
  { src: new URL('/images/raidiam/s1/3.png', import.meta.url).href, alt: 'Step 3', title: 'Click + New Certificate' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/s1/4.png', import.meta.url).href, alt: 'Step 4', title: 'Select the certificate type OPF UAE SERVER TRANSPORT' },
  { src: new URL('/images/raidiam/s1/5.png', import.meta.url).href, alt: 'Step 5', title: 'Set the description to "S1 - Ozone holds Private Key - TPP-APIHub"' },
  { src: new URL('/images/raidiam/s1/6.png', import.meta.url).href, alt: 'Step 6', title: 'Click Next' },
  { src: new URL('/images/raidiam/s1/7.png', import.meta.url).href, alt: 'Step 7', title: 'Skip the section to generate the CSR and Private Key.' },
  { src: new URL('/images/raidiam/s1/8.png', import.meta.url).href, alt: 'Step 8', title: 'Upload the CSR provided by Ozone in the ticket and click Save' },
]

const images2a: CarouselImage[] = [
  { src: new URL('/images/raidiam/s1/4.png', import.meta.url).href, alt: 'Step 4', title: 'Select the certificate type OPF UAE SERVER TRANSPORT' },
  { src: new URL('/images/raidiam/s1/12.png', import.meta.url).href, alt: 'Step 5', title: 'Set the description to S4 - I hold Private Key - APIHub-OzoneConnect' },
  { src: new URL('/images/raidiam/s1/13.png', import.meta.url).href, alt: 'Step 6', title: 'Click Next' },
  { src: new URL('/images/raidiam/s1/8.png', import.meta.url).href, alt: 'Step 8', title: 'Upload the CSR generated in step 1.' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/raidiam/s1/9.png', import.meta.url).href, alt: 'Step 9', title: 'The KID (Key ID) can be found and copied here' },
  { src: new URL('/images/raidiam/s1/10.png', import.meta.url).href, alt: 'Step 10', title: 'You can navigate to the Keystore here' },
  { src: new URL('/images/raidiam/s1/11.png', import.meta.url).href, alt: 'Step 11', title: 'Add then copy the JWKs from the URL' },
]

const opensslCmd = `openssl req -new -newkey rsa:2048 -nodes \\
  -keyout s4.key \\
  -out s4.csr \\
  -subj "/C=AE/O=<LegalName>/OU=<OrganisationId>/CN=<OrganisationId>" \\
  -sha256`

const jwksUrlTemplate = `Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{OrganisationId}/transport.jwks
Production: https://keystore.directory.openfinance.ae/{OrganisationId}/transport.jwks`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Environment-Specific
        </div>
        <h1 class="ed-doc__title">
          Certificate Walkthroughs
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page provides step-by-step walkthroughs for creating certificates required during
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding</a>.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">Two representative examples are covered:</p>
      </div>
    </section>

    <EdSectionBand
      id="examples-overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Examples covered"
      title="One Ozone-held and one LFI-held certificate"
      tone="cream"
    >
      <EdBullets>
        <li><strong>S1</strong> &mdash; an Ozone-held certificate where the LFI uploads a CSR provided by Ozone</li>
        <li><strong>S4</strong> &mdash; an LFI-held certificate where the LFI generates the key, CSR, and certificate</li>
      </EdBullets>

      <EdProse>
        The same patterns apply to the other certificates listed in the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment Specific Configuration</a>
        &mdash; refer to that page to determine which process applies to each certificate.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="walkthrough-s1"
      num="02"
      color="var(--at-gold)"
      eyebrow="Walkthrough: S1"
      title="Ozone-held server transport certificate"
      tone="surface"
    >
      <EdProse>
        <strong>S1</strong> identifies the LFI's API Hub instance to TPPs. Ozone holds the private key
        and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate
        the certificate.
      </EdProse>

      <h3>Prerequisites</h3>
      <EdBullets>
        <li>You have received the S1 CSR file from Ozone (provided via the Service Desk ticket).</li>
        <li>
          You are signed in to the correct Trust Framework directory:
          <ul>
            <li><strong>Pre-production</strong> &rarr; Sandbox Trust Framework (<code>web.sandbox.directory.openfinance.ae</code>)</li>
            <li><strong>Production</strong> &rarr; Production Trust Framework (<code>web.directory.openfinance.ae</code>)</li>
          </ul>
        </li>
      </EdBullets>

      <h3>Steps</h3>
      <EdBullets>
        <li>Navigate to your <strong>Organisation</strong> in the Trust Framework.</li>
        <li>Open the <strong>Organisation Certificates</strong> section.</li>
        <li>Click <strong>+ New Certificate</strong>.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>

      <EdBullets>
        <li>Select <strong>OPF UAE SERVER TRANSPORT</strong> as the certificate type.</li>
        <li>Set the description to <strong>S1 - Ozone holds Private Key - TPP-APIHub</strong></li>
        <li>Skip the step to generate the private key and CSR.</li>
        <li>Upload the CSR provided by Ozone.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images2" />
      </ClientOnly>

      <EdBullets>
        <li>
          The Trust Framework will generate the certificate. Once complete, the certificate detail page
          will display:
          <ul>
            <li>The <strong>Key ID (KID)</strong> &mdash; copy this value exactly as shown (it is case-sensitive).</li>
            <li>The <strong>JWKS URL</strong> &mdash; this is your organisation's transport JWKS URL.</li>
          </ul>
        </li>
        <li>Provide the <strong>KID</strong> and <strong>JWKS URL</strong> back to Ozone via the Service Desk ticket.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images3" />
      </ClientOnly>

      <EdNote type="tip" title="Finding the JWKS URL">
        <p>Your organisation's transport JWKS URL follows this pattern:</p>
        <EdCode lang="text" :code="jwksUrlTemplate" />
        <p>You can also find it on the Organisation Certificates page in the Trust Framework.</p>
      </EdNote>

      <h3>What happens next</h3>
      <EdProse>
        Ozone will install the certificate (paired with the private key they hold) onto the API Hub
        servers. TPPs connecting to your API Hub instance will see this certificate during the TLS
        handshake.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="walkthrough-s4"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Walkthrough: S4"
      title="LFI-held server transport certificate"
      tone="cream"
    >
      <EdProse>
        <strong>S4</strong> identifies the LFI's Ozone Connect server to the API Hub. The LFI holds the
        private key and is responsible for generating the key, CSR, and certificate.
      </EdProse>

      <h3>Prerequisites</h3>
      <EdBullets>
        <li>You have your organisation's <strong>Legal Name</strong> and <strong>Organisation ID</strong> from the Trust Framework.</li>
        <li>
          You are signed in to the correct Trust Framework directory:
          <ul>
            <li><strong>Pre-production</strong> &rarr; Sandbox Trust Framework (<code>web.sandbox.directory.openfinance.ae</code>)</li>
            <li><strong>Production</strong> &rarr; Production Trust Framework (<code>web.directory.openfinance.ae</code>)</li>
          </ul>
        </li>
      </EdBullets>

      <h3>Step 1 &mdash; Generate the private key and CSR</h3>
      <EdProse>
        Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match
        your Trust Framework organisation details:
      </EdProse>

      <EdCode lang="bash" :code="opensslCmd" />

      <EdProse>Replace:</EdProse>
      <EdBullets>
        <li><code>&lt;LegalName&gt;</code> with your organisation's legal name as it appears in the Trust Framework</li>
        <li><code>&lt;OrganisationId&gt;</code> with your organisation's ID from the Trust Framework</li>
      </EdBullets>

      <EdNote type="warning" title="Production environments">
        <p>
          The OpenSSL command shown is for demonstration. In production, private key generation and CSR
          creation MUST be performed within your HSM or equivalent secure key management infrastructure,
          in accordance with your institution's security policies.
        </p>
      </EdNote>

      <EdProse>
        Store the <code>.key</code> file securely &mdash; it MUST never be shared. See
        <a href="/policy/secure-management">Secure Management</a> for requirements.
      </EdProse>

      <h3>Step 2 &mdash; Upload the CSR to the Trust Framework</h3>
      <EdBullets>
        <li>Navigate to your <strong>Organisation</strong> in the Trust Framework.</li>
        <li>Open the <strong>Organisation Certificates</strong> section.</li>
        <li>Click <strong>+ New Certificate</strong>.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>

      <EdBullets>
        <li>Select <strong>OPF UAE SERVER TRANSPORT</strong> as the certificate type.</li>
        <li>Set the description to <strong>S4 - I hold Private Key - APIHub-OzoneConnect</strong></li>
        <li>Click <strong>Next</strong>.</li>
        <li>Upload the <code>.csr</code> file generated in Step 1.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images2a" />
      </ClientOnly>

      <h3>Step 3 &mdash; Record the KID and JWKS URL</h3>
      <EdProse>Once the Trust Framework processes the CSR:</EdProse>
      <EdBullets>
        <li>The certificate detail page will display the <strong>Key ID (KID)</strong> &mdash; copy this value exactly (case-sensitive).</li>
        <li>Note your organisation's <strong>transport JWKS URL</strong>.</li>
        <li>Provide the <strong>KID</strong> and <strong>JWKS URL</strong> to Ozone via the Service Desk ticket.</li>
      </EdBullets>

      <ClientOnly>
        <Carousel :images="images3" />
      </ClientOnly>

      <EdNote type="tip" title="Finding the JWKS URL">
        <p>Your organisation's transport JWKS URL follows this pattern:</p>
        <EdCode lang="text" :code="jwksUrlTemplate" />
        <p>You can also find it on the Organisation Certificates page in the Trust Framework.</p>
      </EdNote>

      <h3>Step 4 &mdash; Deploy the certificate</h3>
      <EdProse>
        Deploy the certificate (<code>.pem</code>) and private key (<code>.key</code>) to your Ozone
        Connect server infrastructure. The API Hub will validate this certificate during mTLS
        connections to your Ozone Connect endpoints.
      </EdProse>

      <EdProse>
        For detailed guidance on generating keys and certificates in the Trust Framework, see
        <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>.
      </EdProse>
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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
