<route lang="yaml">
meta:
  title: Trust Framework — Keys and Certificates
  isIndex: true
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string; tagline?: string }

const opensslCommand = `openssl req -new -newkey rsa:2048 -nodes \\
  -keyout <UUID>.key \\
  -out <UUID>.csr \\
  -subj "/C=AE/O=<LegalName>/OU=<OrganizationId>/CN=<UUID>" \\
  -sha256`

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/generate-transport-certificate/1.png', import.meta.url).href, alt: 'Step 1', title: 'Within your application click App Certificates' },
  { src: new URL('/images/raidiam/generate-transport-certificate/2.png', import.meta.url).href, alt: 'Step 2', title: 'Click + New Certificate' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/generate-transport-certificate/3.png', import.meta.url).href, alt: 'Step 3', title: 'Select the certificate type', tagline: 'Transport, Signing or Encryption' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/raidiam/generate-transport-certificate/4.png', import.meta.url).href, alt: 'Step 4', title: 'Create a script to generate your private key (.key) and CSR' },
  { src: new URL('/images/raidiam/generate-transport-certificate/5.png', import.meta.url).href, alt: 'Step 5', title: 'Generate your CSR' },
  { src: new URL('/images/raidiam/generate-transport-certificate/6.png', import.meta.url).href, alt: 'Step 6', title: 'CSR generated successfully' },
]

const images4: CarouselImage[] = [
  { src: new URL('/images/raidiam/generate-transport-certificate/7.png', import.meta.url).href, alt: 'Step 7', title: 'Upload your CSR' },
  { src: new URL('/images/raidiam/generate-transport-certificate/8.png', import.meta.url).href, alt: 'Step 8', title: 'Select the .csr file to upload' },
]

const images5: CarouselImage[] = [
  { src: new URL('/images/raidiam/generate-transport-certificate/9.png', import.meta.url).href, alt: 'Step 9', title: 'Your certificate is generated and ready to be downloaded' },
  { src: new URL('/images/raidiam/generate-transport-certificate/10.png', import.meta.url).href, alt: 'Step 10', title: 'You now have the certificate (.pem) and key (.key) pair' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Keys & Certificates
        </div>
        <h1 class="ed-doc__title">
          Keys and Certificates
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          To operate within the ecosystem, your application must use certificates issued and stored within
          the Trust Framework. There are three types of certificates, each serving a distinct security
          function.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="cert-types"
      num="01"
      color="var(--at-teal)"
      eyebrow="Certificate Types"
      title="Transport and Signing — both required for LFI clients"
      tone="cream"
    >
      <EdProse>
        As an LFI, you are required to create two certificate types per application:
      </EdProse>

      <h3>1. Transport Certificate &mdash; Required</h3>
      <EdProse>
        Used for <strong>mutual TLS (mTLS)</strong> to authenticate your client (application) when making
        API requests.
      </EdProse>
      <EdBullets>
        <li><strong>Purpose:</strong> Secure transport and client authentication</li>
        <li><strong>Usage:</strong> mTLS handshake for all API calls</li>
        <li><strong>Presented to:</strong> API providers during connection</li>
      </EdBullets>

      <h3>2. Signing Certificate &mdash; Required</h3>
      <EdProse>
        Used to <strong>digitally sign JWTs</strong> your application sends &mdash; such as client
        assertions, request objects, etc.
      </EdProse>
      <EdBullets>
        <li><strong>Purpose:</strong> Proving integrity and authenticity of signed payloads</li>
        <li><strong>Usage:</strong> Signing the contents of JWTs</li>
      </EdBullets>

      <EdNote type="info" title="Encryption certificates">
        <p>
          The Trust Framework also supports an <strong>Encryption Certificate</strong>, but this is
          <strong>not required for LFI clients</strong>. Note that the encryption keys you may see on your
          organisation (e.g. ENC1) are server-side keys used by the platform &mdash; these are distinct
          from application-level encryption certificates. An application-level encryption certificate is
          only needed by TPPs that wish to receive encrypted webhook event notifications. See
          <a href="/tech/tpp-standards/v2.1/webhooks/">Webhooks</a> for more information.
        </p>
      </EdNote>

      <EdProse>
        Each certificate plays a critical role in securing communication and asserting identity. Once you
        understand the certificate types, you can generate the required keys and CSRs according to the
        Trust Framework specifications.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="key-requirements"
      num="02"
      color="var(--at-gold)"
      eyebrow="Key and Certificate Requirements"
      title="2048-bit RSA, SHA-256 CSR, and the required subject fields"
      tone="surface"
    >
      <EdProse>
        Keys and certificates within the Trust Framework (TF) must meet the following requirements:
      </EdProse>

      <EdBullets>
        <li><strong>2048-bit RSA private key (unencrypted)</strong></li>
        <li>A corresponding <strong>Certificate Signing Request (CSR)</strong> signed with <strong>SHA-256</strong></li>
        <li>
          CSR subject fields must include:
          <ul>
            <li><strong>C</strong> &rarr; Country &mdash; must be set to <code>AE</code> (United Arab Emirates)</li>
            <li><strong>O</strong> &rarr; Organization &mdash; must equal the Organization's legal name in the Trust Framework</li>
            <li><strong>OU</strong> &rarr; Organizational Unit &mdash; must equal the Organization's ID in the Trust Framework</li>
            <li><strong>CN</strong> &rarr; Common Name &mdash; must equal the application's <strong>Client ID</strong> (the UUID assigned by the Trust Framework when the application was created)</li>
          </ul>
        </li>
      </EdBullets>

      <h3>Generating the Private Key and CSR</h3>
      <EdProse>The Trust Framework provides an example using OpenSSL to generate:</EdProse>
      <EdBullets>
        <li>A private key file (<code>.key</code>)</li>
        <li>A Certificate Signing Request file (<code>.csr</code>)</li>
      </EdBullets>

      <EdProse>Example:</EdProse>

      <EdCode :code="opensslCommand" lang="bash" filename="openssl" />

      <EdProse>
        Replace <code>LegalName</code> and <code>OrganizationId</code> with your organisation's details
        from the Trust Framework. Replace <code>UUID</code> with your application's <strong>Client ID</strong>
        &mdash; the UUID assigned when the application was created (see
        <a href="/tech/lfi-api-hub/trust-framework/creating-an-application#your-client-id">Creating an Application</a>).
        Equivalent cryptographic tools may be used, provided all requirements above are met.
      </EdProse>

      <EdProse>
        The <code>.csr</code> file (Certificate Signing Request) must be uploaded to the Trust Framework.
        The <code>.key</code> file (Private Key) must be kept <em>secure and must never be shared</em>.
        More information on private key handling and security requirements can be found
        <a href="/policy/secure-management">here</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="walkthrough"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Walkthrough"
      title="Creating a certificate in the Trust Framework portal"
      tone="cream"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Navigate to App Certificates</h3>
          <ol class="ed-doc__substeps">
            <li>Open your application in the Trust Framework.</li>
            <li>Click <strong>App Certificates</strong>.</li>
            <li>Click <strong>+ New Certificate</strong>.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images1" />
          </ClientOnly>
        </li>

        <li>
          <h3>Select the certificate type</h3>
          <ol class="ed-doc__substeps">
            <li>Select <strong>Transport</strong> or <strong>Signing</strong>. You will need to repeat this process for each. Do not create an Encryption certificate for your LFI client.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>
        </li>

        <li>
          <h3>Generate the private key and CSR</h3>
          <ol class="ed-doc__substeps">
            <li>Generate your private key (<code>.key</code>) and Certificate Signing Request (<code>.csr</code>).</li>
            <li>Confirm that the CSR has been generated successfully before proceeding.</li>
          </ol>

          <EdNote type="warning" title="Production environments">
            <p>
              The OpenSSL command shown is intended for demonstration and testing only. In production,
              private key generation and CSR creation must be performed within your HSM or equivalent
              secure key management infrastructure, in accordance with your institution's security policies.
            </p>
          </EdNote>

          <ClientOnly>
            <Carousel :images="images3" />
          </ClientOnly>
        </li>

        <li>
          <h3>Upload the CSR</h3>
          <ol class="ed-doc__substeps">
            <li>Click <strong>Upload your CSR</strong> and select the <code>.csr</code> file generated in the previous step.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images4" />
          </ClientOnly>
        </li>

        <li>
          <h3>Download the certificate</h3>
          <ol class="ed-doc__substeps">
            <li>Once the Trust Framework processes the CSR, your certificate is ready. Download the <code>.pem</code> certificate file.</li>
            <li>You now have the <code>.pem</code> / <code>.key</code> pair. Store your private key securely &mdash; it must never be shared. See <a href="/policy/secure-management">Secure Management</a> for requirements.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images5" />
          </ClientOnly>
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="finding-your-key-id-kid"
      num="04"
      color="var(--at-navy)"
      eyebrow="Finding Your Key ID (kid)"
      title="The kid value used in every signed JWT"
      tone="surface"
    >
      <EdProse>
        Once your certificate is issued, the Trust Framework assigns it a <strong>Key ID (<code>kid</code>)</strong>.
        This value must be included in the <code>kid</code> header of every JWT signed with the
        corresponding private key.
      </EdProse>

      <ImageViewer
        src="/images/raidiam/generate-transport-certificate/11.png"
        alt="Key ID (kid) location on the certificate detail page in the Trust Framework"
      />

      <EdNote type="tip" title="Where to find it later">
        <p>
          Your <code>kid</code> is always visible on the certificate detail page. Navigate to your
          Application &rarr; App Certificates &rarr; select the certificate. Copy the Key ID exactly as
          shown &mdash; it is case-sensitive. See
          <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing</a> for how the
          <code>kid</code> value is used in the JWT header.
        </p>
      </EdNote>

      <EdProse>
        You will need a separate <code>kid</code> for each certificate (Transport and Signing). When
        signing JWTs, always use the <code>kid</code> of your <strong>Signing</strong> certificate.
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

.ed-doc__steps {
  list-style: none;
  counter-reset: ed-step;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.ed-doc__steps > li {
  counter-increment: ed-step;
  position: relative;
  padding-left: 3.5rem;
  min-height: 2.5rem;
}
.ed-doc__steps > li::before {
  content: counter(ed-step, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.ed-doc__steps > li > h3 {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0.25rem 0 0.85rem;
}

.ed-doc__substeps {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.5rem 0 1rem 1.4rem;
  padding: 0;
  color: var(--at-mute-2);
}
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong),
.ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__substeps :deep(code),
.ed-doc__substeps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__substeps :deep(a),
.ed-doc__substeps a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
}
</style>
