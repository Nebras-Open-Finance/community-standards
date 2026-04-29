<route lang="yaml">
meta:
  title: Trust Framework — Certificates with a SAN
  isIndex: true
</route>

<script setup lang="ts">
const opensslSan = `openssl req -new -newkey rsa:2048 -nodes \\
-out ...-opf_uae_server_transport.csr \\
-keyout ...-opf_uae_server_transport.key \\
-subj "/C=AE/O=Organisation Name/OU=b345..." \\
-sha256 \\
-addext "subjectAltName=DNS:some.hostname.com"`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Certificates
        </div>
        <h1 class="ed-doc__title">
          Certificates with a SAN
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Subject Alternative Name (SAN) extension is required on server-side certificates &mdash;
          specifically the transport certificates LFIs present at their API Hub endpoints.
        </p>

        <EdNote type="info" title="This page applies to LFI server certificates">
          <p>
            The Subject Alternative Name (SAN) extension is required on <strong>server-side</strong>
            certificates &mdash; specifically the transport certificates LFIs present at their API Hub
            endpoints. TPPs generating client certificates (transport, signing, or encryption) do
            <strong>not</strong> add a SAN; they set the <code>CN</code> to their application's Client ID
            instead. See <a href="/tech/tpp-standards/trust-framework/certificates/">Keys and Certificates</a>
            for client certificate requirements.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="adding-san"
      num="01"
      color="var(--at-teal)"
      eyebrow="Adding a Subject Alternative Name (SAN)"
      title="Inline -addext on the CSR"
      tone="cream"
    >
      <EdProse>
        Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for
        hostname validation on server certificates. Instead, they require the Subject Alternative Name
        (SAN) extension specifying the DNS hostnames the certificate is valid for &mdash; in this context,
        the API Hub instance the LFI operates.
      </EdProse>

      <EdProse>
        To include a SAN directly in the CSR without needing a separate config file, you can use the
        <code>-addext</code> option:
      </EdProse>

      <EdCode :code="opensslSan" lang="bash" filename="openssl with SAN" />

      <EdProse>
        In this example, <code>some.hostname.com</code> will appear in the SAN extension of the CSR.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="why-san"
      num="02"
      color="var(--at-gold)"
      eyebrow="Why SAN Instead of CN"
      title="Server certificates rely on SAN, not CN, for hostname validation"
      tone="surface"
    >
      <EdProse>
        Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname.
        However:
      </EdProse>

      <EdBullets>
        <li><strong>CN is deprecated</strong> &mdash; as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates.</li>
        <li><strong>SAN is mandatory</strong> &mdash; the Subject Alternative Name is now the authoritative field for hostname checking.</li>
        <li><strong>Multiple hostnames</strong> &mdash; SAN supports multiple DNS names (and IP addresses), whereas CN supports only one.</li>
      </EdBullets>

      <EdProse>For server certificates, modern CSRs omit CN and rely solely on SAN.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="openssl-version"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="OpenSSL Version Support"
      title="-addext requires OpenSSL 1.1.1 or newer"
      tone="cream"
    >
      <EdProse>
        The <code>-addext</code> option was introduced in OpenSSL 1.1.1 (released September 2018).
        If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above.
      </EdProse>

      <EdProse>
        On older versions of OpenSSL, you will need to use an external configuration file
        (<code>openssl.cnf</code>) to include SANs.
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
