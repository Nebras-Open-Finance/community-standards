<route lang="yaml">
meta:
  title: Environment Specific Configuration
  isIndex: true
</route>

<script setup lang="ts">
const discoveryUrlTemplate = `Pre-production: https://auth1.{lfiCode}.preprod.apihub.openfinance.ae/.well-known/openid-configuration
Production:     https://auth1.{lfiCode}.apihub.openfinance.ae/.well-known/openid-configuration`

const exampleForwardedUrl = 'https://openapi.example.com/retail/data/accounts'
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
          Environment Specific Configuration
          <span class="ed-doc__read">9 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Each API Hub instance requires environment-specific configuration that is exchanged between the
          LFI and Ozone during onboarding. This configuration MUST be completed
          <strong>separately for each environment</strong>:
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          <strong>Pre-production</strong> &mdash; certificates from the <strong>Sandbox</strong> Trust
          Framework. <strong>Production</strong> &mdash; certificates from the <strong>Production</strong>
          Trust Framework.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The configuration is submitted via a <strong>Service Desk ticket</strong>. This page describes
          all the information that is exchanged.
        </p>
        <EdNote type="warning" title="One form per environment">
          <p>
            You MUST complete this process twice &mdash; once for pre-production and once for production.
            All certificates referenced in the pre-production form MUST be created in the Sandbox Trust
            Framework. All certificates referenced in the production form MUST be created in the
            Production Trust Framework.
          </p>
        </EdNote>
        <p class="ed-doc__lede ed-doc__lede--tight">
          For a full understanding of how each certificate fits into the API Hub network architecture, see
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/">API Hub Connectivity &amp; Certificates</a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="lfi-information"
      num="01"
      color="var(--at-teal)"
      eyebrow="LFI information"
      title="Legal name and organisation ID"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th style="text-align:center">Provided By</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LFI Legal Name</strong></td>
              <td style="text-align:center">LFI</td>
              <td>Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production).</td>
            </tr>
            <tr>
              <td><strong>LFI Organisation ID</strong></td>
              <td style="text-align:center">LFI</td>
              <td>Your organisation ID from the Trust Framework organisation page.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="domains-urls"
      num="02"
      color="var(--at-gold)"
      eyebrow="Domain names &amp; URLs"
      title="Allocated domains, discovery, and LFI-provided URLs"
      tone="surface"
    >
      <h3>Domain names allocated by Ozone</h3>
      <EdProse>
        Ozone allocates domain names for each API Hub instance based on the LFI Code provided during
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites">prerequisites onboarding</a>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Convention (Pre-production)</th>
              <th>Convention (Production)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>TPP-facing domain</strong></td>
              <td><code>as1.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
              <td><code>as1.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>TPP-facing resource server</strong></td>
              <td><code>rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
              <td><code>rs1.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>Headless Heimdall</strong></td>
              <td><code>hh.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
              <td><code>hh.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>Consent Manager</strong></td>
              <td><code>cm.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
              <td><code>cm.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>Admin Portal</strong></td>
              <td><code>admin.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
              <td><code>admin.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>LFI-specific discovery document</h3>
      <EdProse>Your API Hub's well-known discovery document will be available at:</EdProse>
      <EdCode lang="text" :code="discoveryUrlTemplate" />
      <EdProse>
        This document exposes your <code>authorization_endpoint</code>, <code>token_endpoint</code>,
        <code>jwks_uri</code>, and supported parameters. TPPs use it to discover where to redirect their
        users.
      </EdProse>

      <h3>URLs provided by the LFI</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th style="text-align:center">Provided By</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ozone Connect Base URL</strong></td>
              <td style="text-align:center">LFI</td>
              <td>The base URL on which your Ozone Connect endpoints are hosted. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</a> for details.</td>
            </tr>
            <tr>
              <td><strong>Authorisation URL</strong></td>
              <td style="text-align:center">LFI</td>
              <td>The OIDC authorisation URL for your institution. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</a> for details.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 id="values-provided-by-ozone">Values provided by Ozone</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th style="text-align:center">Provided By</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Admin Portal URL</strong></td>
              <td style="text-align:center">Ozone</td>
              <td>The URL to your Admin Portal for this environment.</td>
            </tr>
            <tr>
              <td><strong>IP Address</strong></td>
              <td style="text-align:center">Ozone</td>
              <td>The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Optional API family base paths</h3>
      <EdProse>
        The onboarding form includes optional base path fields for each API family. If provided, the path
        is inserted between your
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</a>
        and the API endpoint &mdash; allowing the LFI to route different API families to different path
        prefixes on the same server.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API Family</th>
              <th>Example Endpoints</th>
              <th>Path Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/">Data Sharing</a></strong></td>
              <td><code>/accounts</code>, <code>/balances</code>, <code>/transactions</code></td>
              <td><code>OzoneConnectURL/&lt;path&gt;/accounts</code></td>
            </tr>
            <tr>
              <td><strong><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/">Service Initiation</a></strong></td>
              <td><code>/domestic-payments</code>, <code>/multi-payments</code></td>
              <td><code>OzoneConnectURL/&lt;path&gt;/domestic-payments</code></td>
            </tr>
            <tr>
              <td><strong><a href="/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/">Products</a></strong></td>
              <td><code>/products</code>, <code>/leads</code></td>
              <td><code>OzoneConnectURL/&lt;path&gt;/products</code></td>
            </tr>
            <tr>
              <td><strong>Consent Events &amp; Notifications</strong></td>
              <td><code>/event-notifications</code></td>
              <td><code>OzoneConnectURL/&lt;path&gt;/event-notifications</code></td>
            </tr>
            <tr>
              <td><strong><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/">Health Check</a></strong></td>
              <td><code>/hello</code>, <code>/hello-mtls</code>, <code>/echo-cert</code></td>
              <td><code>OzoneConnectURL/&lt;path&gt;/echo-cert</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        All fields are optional. For any API families without a path specified &mdash; either because the
        field was left blank or because the family does not appear in the form &mdash; the API Hub sends
        requests directly to <code>OzoneConnectURL/&lt;endpoint&gt;</code>.
      </EdProse>

      <EdNote type="tip" title="Example">
        <p>
          If the LFI sets the Data Sharing base path to <code>/retail/data</code> and their Ozone Connect
          Base URL is <code>https://openapi.example.com</code>, a TPP request for accounts will be
          forwarded to:
        </p>
        <EdCode lang="text" :code="exampleForwardedUrl" />
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="ozone-held-certs"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Ozone-held transport &amp; signing certificates"
      title="Ozone holds the private key"
      tone="cream"
    >
      <EdProse>
        These are certificates where <strong>Ozone holds the private key</strong>. Ozone generates the
        private key and CSR. The LFI's role depends on where the certificate is stored:
      </EdProse>

      <EdBullets>
        <li><strong>S1, S3, Sig2</strong> &mdash; stored in the LFI's Trust Framework organisation. Ozone provides the CSR; the LFI uploads it to their organisation to generate the certificate, then returns the JWKS URL and KID.</li>
        <li><strong>C4, Sig3</strong> &mdash; stored in Ozone's Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI.</li>
      </EdBullets>

      <h3>S1 &mdash; Transport Server Certificate</h3>
      <EdProse>Deployed onto the API Hub servers to identify the LFI's API Hub instance to TPPs.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>CSR</td><td style="text-align:center">Ozone</td><td>Ozone provides the CSR for the LFI to upload to their Trust Framework organisation.</td></tr>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The organisation transport JWKS URL from the Trust Framework after generating the certificate.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate by the Trust Framework.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Navigate to your organisation in the Trust Framework &rarr;
        Organisation Certificates &rarr; + New Certificate &rarr; select <strong>Server Transport</strong>
        &rarr; upload the CSR provided by Ozone &rarr; record the KID and JWKS URL. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/certificate-walkthroughs">Certificate Walkthroughs</a>
        for a step-by-step example.
      </EdProse>

      <h3>S3 &mdash; Transport Server Certificate</h3>
      <EdProse>Used by the Consent Manager and Headless Heimdall Auth Server to identify themselves to the LFI.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>CSR</td><td style="text-align:center">Ozone</td><td>Ozone provides the CSR for the LFI to upload.</td></tr>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The organisation transport JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Same process as S1 &mdash; upload the CSR under Organisation
        Certificates &rarr; <strong>Server Transport</strong>.
      </EdProse>

      <h3 id="c4-transport-client-certificate">C4 &mdash; Transport Client Certificate</h3>
      <EdProse>Used by the API Hub to identify itself to the LFI when calling Ozone Connect endpoints.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>JWKS URL</td><td style="text-align:center">Ozone</td><td>Ozone provides the JWKS URL from their Trust Framework organisation.</td></tr>
            <tr><td>KID</td><td style="text-align:center">Ozone</td><td>Ozone provides the KID.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> None &mdash; this certificate is in Ozone's organisation. Record the
        JWKS URL and KID provided by Ozone for your mTLS validation configuration. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#3b-pin-to-the-api-hubs-c4-client">Configuring Inbound mTLS</a>
        for guidance on pinning your Ozone Connect server to the API Hub's C4 client certificate.
      </EdProse>

      <h3>Sig2 &mdash; Signing Certificate</h3>
      <EdProse>
        Used by the API Hub to sign responses sent to the TPP, including signed messages from the resource
        server and the signature on the <code>id_token</code>. TPPs verify using the public key in the
        JWKS.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>CSR</td><td style="text-align:center">Ozone</td><td>Ozone provides the CSR for the LFI to upload.</td></tr>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The organisation application JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Navigate to Organisation Certificates &rarr; + New Certificate &rarr;
        select <strong>Server Signing</strong> &rarr; upload the CSR &rarr; record the KID and JWKS URL.
      </EdProse>

      <h3>Sig3 &mdash; Signing Certificate (JWT Auth only)</h3>
      <EdProse>Used by the API Hub to sign JWT Auth headers on:</EdProse>
      <EdBullets>
        <li>Ozone Connect requests</li>
        <li>Headless Heimdall responses</li>
        <li>Consent Manager responses</li>
      </EdBullets>

      <EdNote type="info">
        <p>
          Sig3 is only required when
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth#jwt-auth">JWT Auth</a>
          is selected as the application layer authentication method.
        </p>
      </EdNote>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>JWKS URL</td><td style="text-align:center">Ozone</td><td>Ozone provides the JWKS URL from their Trust Framework organisation.</td></tr>
            <tr><td>KID</td><td style="text-align:center">Ozone</td><td>Ozone provides the KID.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse><strong>LFI action:</strong> None &mdash; this certificate is in Ozone's organisation.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-held-certs"
      num="04"
      color="var(--at-navy)"
      eyebrow="LFI-held transport &amp; signing certificates"
      title="LFI holds the private key"
      tone="surface"
    >
      <EdProse>
        These are certificates where the <strong>LFI holds the private key</strong>. The LFI generates the
        private key and CSR, creates the certificate in the Trust Framework, and provides the JWKS URL and
        KID to Ozone.
      </EdProse>

      <h3>C3 &mdash; Transport Client Certificate</h3>
      <EdProse>
        Used by the API Hub to recognise the LFI when the LFI calls the Consent Manager and Headless
        Heimdall Auth Server.
      </EdProse>
      <EdNote type="warning" title="Application required">
        <p>
          Before creating the C3 certificate, you MUST create the <code>C3-hh-cm-client</code>
          application in the Trust Framework. See
          <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">Creating the C3-hh-cm-client Application</a>.
        </p>
      </EdNote>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Application ID</td><td style="text-align:center">LFI</td><td>The Client ID of the <code>C3-hh-cm-client</code> application.</td></tr>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The application transport JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Create the <code>C3-hh-cm-client</code> application (if not already
        created) &rarr; generate a private key and CSR &rarr; navigate to the application's App
        Certificates &rarr; + New Certificate &rarr; select <strong>Client Transport</strong> &rarr;
        upload the CSR &rarr; record the Application ID, KID, and JWKS URL. See
        <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>
        for detailed steps.
      </EdProse>

      <h3>S4 &mdash; Transport Server Certificate</h3>
      <EdProse>Used by the LFI to identify its Ozone Connect server to the API Hub.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The organisation transport JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Generate a private key and CSR &rarr; navigate to Organisation
        Certificates &rarr; + New Certificate &rarr; select <strong>Server Transport</strong> &rarr;
        upload the CSR &rarr; record the KID and JWKS URL. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/certificate-walkthroughs">Certificate Walkthroughs</a>
        for a step-by-step example.
      </EdProse>

      <h3>Sig4 &mdash; Signing Certificate (JWT Auth only)</h3>
      <EdProse>Used by the LFI to sign JWT Auth headers on:</EdProse>
      <EdBullets>
        <li>Ozone Connect responses</li>
        <li>Headless Heimdall requests</li>
        <li>Consent Manager requests</li>
      </EdBullets>

      <EdNote type="info">
        <p>
          Sig4 is only required when
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth#jwt-auth">JWT Auth</a>
          is selected as the application layer authentication method.
        </p>
      </EdNote>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The application signing JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <strong>LFI action:</strong> Generate a private key and CSR &rarr; navigate to the
        <code>C3-hh-cm-client</code> application's App Certificates &rarr; + New Certificate &rarr;
        select <strong>Client Signing</strong> &rarr; upload the CSR &rarr; record the KID and JWKS URL.
      </EdProse>

      <EdNote type="tip" title="Sig4 placement">
        <p>
          Sig4 MAY be created either within the <code>C3-hh-cm-client</code> application or at the
          organisation level &mdash; this is at the LFI's discretion.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-held-encryption"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="LFI-held encryption certificate"
      title="Enc1 — encrypts PII sent to the API Hub"
      tone="cream"
    >
      <h3>Enc1 &mdash; Encryption Key</h3>
      <EdProse>
        Used by the TPP to encrypt Personally Identifiable Information (PII) sent to the API Hub. The PII
        payloads are encrypted using the LFI's public key from the JWKS. Only the LFI can decrypt using
        its private key.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th style="text-align:center">Provided By</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>JWKS URL</td><td style="text-align:center">LFI</td><td>The organisation application JWKS URL from the Trust Framework.</td></tr>
            <tr><td>KID</td><td style="text-align:center">LFI</td><td>The Key ID assigned to this certificate.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <strong>LFI action:</strong> Generate a private key and CSR &rarr; navigate to Organisation
        Certificates &rarr; + New Certificate &rarr; select <strong>Server Encryption</strong> &rarr;
        upload the CSR &rarr; record the KID and JWKS URL.
      </EdProse>

      <EdNote type="tip" title="Recommended certificate type">
        <p>
          When creating the Enc1 certificate, select the <strong>Server ENCKEY</strong> certificate type.
          This type does not expire, avoiding the need for periodic rotation of your encryption key.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="certificate-summary"
      num="06"
      color="var(--at-gold)"
      eyebrow="Certificate summary"
      title="At-a-glance overview"
      tone="surface"
    >
      <EdProse>
        For a complete overview of all certificates and how they fit into the API Hub network
        architecture, see
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/">API Hub Connectivity &amp; Certificates</a>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Certificate</th>
              <th>Type</th>
              <th style="text-align:center">Private Key</th>
              <th>LFI Action</th>
              <th>TF Location</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>S1</strong></td><td>Server Transport</td><td style="text-align:center">Ozone</td><td>Upload CSR, return JWKS + KID</td><td>Organisation</td></tr>
            <tr><td><strong>S3</strong></td><td>Server Transport</td><td style="text-align:center">Ozone</td><td>Upload CSR, return JWKS + KID</td><td>Organisation</td></tr>
            <tr><td><strong>C4</strong></td><td>Client Transport</td><td style="text-align:center">Ozone</td><td>None &mdash; receive JWKS + KID</td><td>Ozone's organisation</td></tr>
            <tr><td><strong>Sig2</strong></td><td>Server Signing</td><td style="text-align:center">Ozone</td><td>Upload CSR, return JWKS + KID</td><td>Organisation</td></tr>
            <tr><td><strong>Sig3</strong></td><td>Signing (JWT Auth)</td><td style="text-align:center">Ozone</td><td>None &mdash; receive JWKS + KID</td><td>Ozone's organisation</td></tr>
            <tr><td><strong>C3</strong></td><td>Client Transport</td><td style="text-align:center">LFI</td><td>Generate, create in <code>C3-hh-cm-client</code> app</td><td>Application</td></tr>
            <tr><td><strong>S4</strong></td><td>Server Transport</td><td style="text-align:center">LFI</td><td>Generate, create in organisation</td><td>Organisation</td></tr>
            <tr><td><strong>Sig4</strong></td><td>Signing (JWT Auth)</td><td style="text-align:center">LFI</td><td>Generate, create in app or organisation</td><td>Application or Organisation</td></tr>
            <tr><td><strong>Enc1</strong></td><td>Server Encryption</td><td style="text-align:center">LFI</td><td>Generate, create in organisation</td><td>Organisation</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Certificate reuse across brands">
        <p>
          If your institution operates multiple API Hub instances (e.g. for retail and business brands),
          LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still
          requires its own environment-specific onboarding form, but can reference the same certificates.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="connectivity-validation"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Connectivity validation"
      title="End-to-end validation in both directions"
      tone="cream"
    >
      <EdProse>
        Once all certificates have been created and the required details have been added to the Service
        Desk ticket, Ozone will perform <strong>end-to-end connectivity validation</strong> in both
        directions:
      </EdProse>

      <EdBullets>
        <li>
          <strong>API Hub to LFI</strong> &mdash; The API Hub will make requests to your Ozone Connect
          endpoints (e.g. the
          <a href="/tech/lfi-api-hub/v2.2-rc1/health-check/">health check endpoints</a>
          <code>/hello</code>, <code>/hello-mtls</code>, <code>/echo-cert</code>) to verify that
          transport certificates, network routing, and application layer authentication are correctly
          configured.
        </li>
        <li>
          <strong>LFI to API Hub</strong> &mdash; Your integration will make requests to the API Hub's
          Consent Manager and Headless Heimdall Auth Server endpoints to verify that mTLS and application
          layer authentication are correctly configured in the reverse direction.
        </li>
      </EdBullets>

      <EdNote type="warning" title="Ticket closure">
        <p>
          The environment-specific onboarding ticket will only be closed once connectivity has been
          successfully established in <strong>both directions</strong>. If validation fails, the Service
          Desk ticket will remain open and the support team will work with you to resolve any issues.
        </p>
      </EdNote>
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
