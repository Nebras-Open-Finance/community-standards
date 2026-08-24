<route lang="yaml">
meta:
  title: API Hub Connectivity & Certificates
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Connectivity
        </div>
        <h1 class="ed-doc__title">
          API Hub Connectivity &amp; Certificates
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page describes the network architecture of the API Hub and the certificates that secure
          communication between all parties in the ecosystem.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="network-architecture"
      num="01"
      color="var(--at-teal)"
      eyebrow="Network architecture"
      title="Connectivity between TPPs, Hub, and LFI"
      tone="cream"
    >
      <EdProse>
        The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI's
        infrastructure.
      </EdProse>

      <ImageViewer
        src="/images/ozone/hub/connectivity.png"
        alt="API Hub connectivity diagram showing certificate placement across TPP, API Hub, and LFI networks"
      />

      <EdProse>
        All connections between the API Hub and external parties use <strong>mutual TLS (mTLS)</strong>.
        Each certificate has a specific role in securing a particular connection path. The certificates are
        created and stored within the Trust Framework, and the private keys are held by the party
        responsible for that connection.
      </EdProse>

      <EdProse>
        The sequence diagram below shows which certificate secures each direction of traffic between the
        TPP, the API Hub, and the LFI's Ozone Connect backend.
      </EdProse>

      <APIFlowViewer title="Certificates per connection">
        <APIFlowsConnectivityCertificates />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="connection-paths"
      num="02"
      color="var(--at-gold)"
      eyebrow="Connection paths"
      title="Certificate roles by direction"
      tone="surface"
    >
      <h3>TPP to API Hub</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Connection</th>
              <th>Certificate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TPP &rarr; API Hub</td>
              <td><strong>C1</strong> (TPP client cert)</td>
              <td>The TPP presents its client certificate to identify itself to the API Hub.</td>
            </tr>
            <tr>
              <td>API Hub &rarr; TPP</td>
              <td><strong>S1</strong> (API Hub server cert)</td>
              <td>The API Hub presents this server certificate to identify the LFI's API Hub instance to the TPP.</td>
            </tr>
            <tr>
              <td>Request signing</td>
              <td><strong>Sig1</strong></td>
              <td>The TPP signs request JWTs (e.g. PAR request objects and <code>private_key_jwt</code> client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP's JWKS.</td>
            </tr>
            <tr>
              <td>Response signing</td>
              <td><strong>Sig2</strong></td>
              <td>The API Hub signs responses and <code>id_token</code> payloads sent to the TPP. The TPP verifies using the public key in the JWKS.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>API Hub to LFI (Ozone Connect)</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Connection</th>
              <th>Certificate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>API Hub &rarr; LFI</td>
              <td><strong>C4</strong> (API Hub client cert)</td>
              <td>The API Hub presents this client certificate when calling the LFI's Ozone Connect endpoints.</td>
            </tr>
            <tr>
              <td>LFI &rarr; API Hub</td>
              <td><strong>S4</strong> (LFI server cert)</td>
              <td>The LFI's Ozone Connect server presents this certificate to identify itself to the API Hub.</td>
            </tr>
            <tr>
              <td>Request signing (JWT Auth)</td>
              <td><strong>Sig3</strong></td>
              <td>
                The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when
                <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth#jwt-auth">JWT Auth</a>
                is selected.
              </td>
            </tr>
            <tr>
              <td>Response signing (JWT Auth)</td>
              <td><strong>Sig4</strong></td>
              <td>The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>LFI to API Hub (Consent Manager &amp; Headless Heimdall)</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Connection</th>
              <th>Certificate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LFI &rarr; API Hub</td>
              <td><strong>C3</strong> (LFI client cert)</td>
              <td>The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server.</td>
            </tr>
            <tr>
              <td>API Hub &rarr; LFI</td>
              <td><strong>S3</strong> (API Hub server cert)</td>
              <td>The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI.</td>
            </tr>
            <tr>
              <td>Request signing (JWT Auth)</td>
              <td><strong>Sig4</strong></td>
              <td>The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected.</td>
            </tr>
            <tr>
              <td>Response signing (JWT Auth)</td>
              <td><strong>Sig3</strong></td>
              <td>The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payload-encryption"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Payload encryption"
      title="JWE encryption keys for sensitive payloads"
      tone="cream"
    >
      <EdProse>
        Payload encryption is separate from transport: <strong>Enc1</strong> and <strong>Enc2</strong> are
        JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each
        one is used.
      </EdProse>

      <APIFlowViewer title="Payload encryption flows">
        <APIFlowsConnectivityEncryption />
      </APIFlowViewer>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Certificate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Enc1</strong> (LFI encryption key)</td>
              <td>Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key.</td>
            </tr>
            <tr>
              <td><strong>Enc2</strong> (TPP encryption key)</td>
              <td>Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="certificate-summary"
      num="04"
      color="var(--at-navy)"
      eyebrow="Certificate summary"
      title="Who holds each private key, and where it is created"
      tone="surface"
    >
      <EdProse>
        The table below summarises all certificates, who holds the private key, and where the certificate
        is created in the Trust Framework.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Certificate</th>
              <th>Type</th>
              <th>Private Key Held By</th>
              <th>Trust Framework Location</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>S1</strong></td>
              <td>Server Transport</td>
              <td>Ozone</td>
              <td>LFI's organisation</td>
              <td>Identifies the LFI's API Hub instance to TPPs</td>
            </tr>
            <tr>
              <td><strong>S3</strong></td>
              <td>Server Transport</td>
              <td>Ozone</td>
              <td>LFI's organisation</td>
              <td>Identifies the CM &amp; HH servers to the LFI</td>
            </tr>
            <tr>
              <td><strong>S4</strong></td>
              <td>Server Transport</td>
              <td>LFI</td>
              <td>LFI's organisation</td>
              <td>Identifies the LFI's Ozone Connect server to the API Hub</td>
            </tr>
            <tr>
              <td><strong>C1</strong></td>
              <td>Client Transport</td>
              <td>TPP</td>
              <td>TPP's organisation</td>
              <td>Identifies the TPP when calling the API Hub</td>
            </tr>
            <tr>
              <td><strong>C3</strong></td>
              <td>Client Transport</td>
              <td>LFI</td>
              <td>LFI's organisation (<code>C3-hh-cm-client</code> application)</td>
              <td>Identifies the LFI when calling CM &amp; HH</td>
            </tr>
            <tr>
              <td><strong>C4</strong></td>
              <td>Client Transport</td>
              <td>Ozone</td>
              <td>Ozone's organisation</td>
              <td>Identifies the API Hub when calling Ozone Connect</td>
            </tr>
            <tr>
              <td><strong>Sig1</strong></td>
              <td>Signing</td>
              <td>TPP</td>
              <td>TPP's organisation</td>
              <td>Signs TPP request JWTs (e.g. PAR request objects, <code>private_key_jwt</code>)</td>
            </tr>
            <tr>
              <td><strong>Sig2</strong></td>
              <td>Signing</td>
              <td>Ozone</td>
              <td>LFI's organisation</td>
              <td>Signs API Hub responses and <code>id_token</code> sent to TPPs</td>
            </tr>
            <tr>
              <td><strong>Sig3</strong></td>
              <td>Signing</td>
              <td>Ozone</td>
              <td>Ozone's organisation</td>
              <td>Signs JWT Auth headers on API Hub requests/responses to the LFI</td>
            </tr>
            <tr>
              <td><strong>Sig4</strong></td>
              <td>Signing</td>
              <td>LFI</td>
              <td>LFI's organisation (<code>C3-hh-cm-client</code> application)</td>
              <td>Signs JWT Auth headers on LFI requests/responses to the API Hub</td>
            </tr>
            <tr>
              <td><strong>Enc1</strong></td>
              <td>Server Encryption</td>
              <td>LFI</td>
              <td>LFI's organisation</td>
              <td>Encrypts PII &mdash; only the LFI can decrypt</td>
            </tr>
            <tr>
              <td><strong>Enc2</strong></td>
              <td>Client Encryption</td>
              <td>TPP</td>
              <td>TPP's organisation</td>
              <td>Encrypts webhook event payloads &mdash; only the TPP can decrypt</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Trust Framework certificate types">
        <p>When creating these certificates in the Trust Framework, select the following types:</p>
        <ul>
          <li><strong>C1, C3, C4</strong> &mdash; <code>OPF UAE CLIENT TRANSPORT</code></li>
          <li><strong>S1, S3, S4</strong> &mdash; <code>OPF UAE SERVER TRANSPORT</code></li>
          <li><strong>Sig1, Sig2, Sig3, Sig4</strong> &mdash; <code>OPF UAE CLIENT SIGNING</code></li>
          <li><strong>Enc1</strong> &mdash; <code>SERVER ENCKEY</code></li>
          <li><strong>Enc2</strong> &mdash; <code>OPF UAE CLIENT ENCRYPTION</code></li>
        </ul>
      </EdNote>

      <EdNote type="info" title="Sig3 and Sig4">
        <p>
          The <strong>Sig3</strong> and <strong>Sig4</strong> certificates are only required when
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth#jwt-auth">JWT Auth</a>
          is selected as the application layer authentication method.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="who-does-what"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Who does what"
      title="Certificate generation responsibilities"
      tone="cream"
    >
      <h3>Ozone-held certificates (S1, S3, Sig2, C4, Sig3)</h3>
      <EdProse>
        For certificates where <strong>Ozone holds the private key</strong>, the process is:
      </EdProse>
      <EdBullets>
        <li>Ozone generates the private key and a Certificate Signing Request (CSR).</li>
        <li><strong>For S1, S3, and Sig2:</strong> Ozone provides the CSR to the LFI. The LFI uploads the CSR to their own organisation in the Trust Framework to generate the certificate, then provides the JWKS URL and KID back to Ozone.</li>
        <li><strong>For C4 and Sig3:</strong> These certificates are in Ozone's own Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI for these certificates.</li>
      </EdBullets>

      <h3>LFI-held certificates (C3, S4, Sig4, Enc1)</h3>
      <EdProse>
        For certificates where the <strong>LFI holds the private key</strong>, the process is:
      </EdProse>
      <EdBullets>
        <li>The LFI generates the private key and CSR.</li>
        <li>
          <strong>For C3 and Sig4:</strong> The LFI creates the certificate in the
          <code>C3-hh-cm-client</code> application in the Trust Framework. See
          <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">Creating the C3-hh-cm-client Application</a>
          and
          <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>.
        </li>
        <li><strong>For S4 and Enc1:</strong> The LFI creates the certificate under Organisation Certificates in the Trust Framework.</li>
        <li>The LFI provides the JWKS URL and KID to Ozone.</li>
      </EdBullets>

      <EdNote type="tip" title="Certificate reuse across brands">
        <p>
          If your institution operates multiple API Hub instances (e.g. for retail and business brands),
          LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires
          its own environment-specific onboarding form, but can reference the same certificates if
          appropriate.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="next-steps"
      num="06"
      color="var(--at-gold)"
      eyebrow="Next steps"
      title="Where to go next"
      tone="surface"
    >
      <EdBullets>
        <li>
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/">Environment Specific Configuration</a>
          &mdash; the onboarding form where all certificate details are exchanged
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>
          &mdash; choose your application layer authentication method (determines whether Sig3/Sig4 are required)
        </li>
        <li>
          <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>
          &mdash; how to generate keys and upload CSRs in the Trust Framework
        </li>
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
