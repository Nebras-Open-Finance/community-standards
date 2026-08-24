<route lang="yaml">
meta:
  title: Configuring Inbound mTLS
</route>

<script setup lang="ts">
const bundlePreprodCmd = `curl -sSL https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem  > trust-framework-preprod.pem
curl -sSL https://crl.sandbox.pki.openfinance.ae/root-ca.pem   >> trust-framework-preprod.pem`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Configuring Auth
        </div>
        <h1 class="ed-doc__title">
          Configuring Inbound mTLS
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page describes how the LFI MUST configure inbound mutual TLS (mTLS) on its Ozone Connect
          server so that calls from the API Hub are authenticated and all other calls are rejected.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="why-mtls"
      num="01"
      color="var(--at-teal)"
      eyebrow="Why the LFI must configure inbound mTLS"
      title="The Hub does not terminate TLS for you"
      tone="cream"
    >
      <EdProse>
        Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub
        presents the <strong>C4</strong> transport client certificate. The LFI's Ozone Connect server
        &mdash; or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF,
        API gateway) &mdash; MUST be configured to:
      </EdProse>

      <EdBullets>
        <li><strong>Require</strong> a client certificate on every inbound connection, and</li>
        <li><strong>Trust</strong> certificates signed by the Trust Framework Issuing CA for the relevant environment.</li>
      </EdBullets>

      <EdProse>Without this:</EdProse>
      <EdBullets>
        <li>If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints &mdash; a critical security failure.</li>
        <li>If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and <strong>every</strong> API Hub call is rejected at the handshake.</li>
      </EdBullets>

      <EdNote type="warning" title="This is the LFI's responsibility">
        <p>
          The API Hub does not terminate TLS on the LFI's behalf for the API Hub &rarr; Ozone Connect
          leg. Ozone Connect is the party that validates the API Hub's C4 client certificate. LFIs
          sometimes assume the Hub handles all mTLS &mdash; it does not.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="trust-framework-cas"
      num="02"
      color="var(--at-gold)"
      eyebrow="Trust Framework certificate authorities"
      title="Production and Pre-production CAs"
      tone="surface"
    >
      <EdProse>Each API Hub environment pairs with a distinct Trust Framework PKI:</EdProse>

      <EdBullets>
        <li><strong>Production</strong> API Hub &rarr; <strong>Production</strong> Trust Framework</li>
        <li><strong>Pre-production</strong> API Hub &rarr; <strong>Sandbox</strong> Trust Framework</li>
      </EdBullets>

      <EdProse>
        To validate the API Hub's C4 client certificate, the LFI MUST configure its Ozone Connect server
        with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in
        use.
      </EdProse>

      <h3>Production</h3>
      <EdProse>
        The Production API Hub uses certificates issued by the <strong>Production Trust Framework</strong>.
        Its CAs are below.
      </EdProse>

      <h4>Root CA</h4>
      <EdProse>The self-signed root of trust for the Production Trust Framework PKI.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Distinguished Name</strong></td>
              <td><code>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1</code></td>
            </tr>
            <tr>
              <td><strong>PEM</strong></td>
              <td><a href="https://crl.pki.openfinance.ae/root-ca.pem"><code>https://crl.pki.openfinance.ae/root-ca.pem</code></a></td>
            </tr>
            <tr>
              <td><strong>Algorithm</strong></td>
              <td>RSA 2048, signed with <code>sha512WithRSAEncryption</code></td>
            </tr>
            <tr>
              <td><strong>Valid from</strong></td>
              <td>2024-10-01</td>
            </tr>
            <tr>
              <td><strong>Valid until</strong></td>
              <td>2039-09-28</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4>Issuing CA</h4>
      <EdProse>
        The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4,
        Sig1&ndash;Sig4, Enc1, Enc2).
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Distinguished Name</strong></td>
              <td><code>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1</code></td>
            </tr>
            <tr>
              <td><strong>Issued by</strong></td>
              <td>Al Tareq Production Trust Framework Root CA - G1</td>
            </tr>
            <tr>
              <td><strong>PEM</strong></td>
              <td><a href="https://crl.pki.openfinance.ae/issuer-ca.pem"><code>https://crl.pki.openfinance.ae/issuer-ca.pem</code></a></td>
            </tr>
            <tr>
              <td><strong>OCSP responder</strong></td>
              <td><code>http://ocsp.pki.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>CRL distribution point</strong></td>
              <td><code>http://crl.pki.openfinance.ae/issuer.crl</code></td>
            </tr>
            <tr>
              <td><strong>Algorithm</strong></td>
              <td>RSA 2048, signed with <code>sha512WithRSAEncryption</code></td>
            </tr>
            <tr>
              <td><strong>Valid from</strong></td>
              <td>2024-10-01</td>
            </tr>
            <tr>
              <td><strong>Valid until</strong></td>
              <td>2034-09-29</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Pre-production</h3>

      <h4>Root CA</h4>
      <EdProse>The self-signed root of trust for the Pre-production PKI.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Distinguished Name</strong></td>
              <td><code>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1</code></td>
            </tr>
            <tr>
              <td><strong>PEM</strong></td>
              <td><a href="https://crl.sandbox.pki.openfinance.ae/root-ca.pem"><code>https://crl.sandbox.pki.openfinance.ae/root-ca.pem</code></a></td>
            </tr>
            <tr>
              <td><strong>Algorithm</strong></td>
              <td>RSA 2048, signed with <code>sha512WithRSAEncryption</code></td>
            </tr>
            <tr>
              <td><strong>Valid from</strong></td>
              <td>2024-08-22</td>
            </tr>
            <tr>
              <td><strong>Valid until</strong></td>
              <td>2039-08-19</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4>Issuing CA</h4>
      <EdProse>The subordinate CA that signs all participant certificates on Pre-production.</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Distinguished Name</strong></td>
              <td><code>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1</code></td>
            </tr>
            <tr>
              <td><strong>Issued by</strong></td>
              <td>Al Tareq Sandbox Trust Framework Root CA - G1</td>
            </tr>
            <tr>
              <td><strong>PEM</strong></td>
              <td><a href="https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem"><code>https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem</code></a></td>
            </tr>
            <tr>
              <td><strong>OCSP responder</strong></td>
              <td><code>http://ocsp.sandbox.pki.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><strong>CRL distribution point</strong></td>
              <td><code>http://crl.sandbox.pki.openfinance.ae/issuer.crl</code></td>
            </tr>
            <tr>
              <td><strong>Algorithm</strong></td>
              <td>RSA 2048, signed with <code>sha512WithRSAEncryption</code></td>
            </tr>
            <tr>
              <td><strong>Valid from</strong></td>
              <td>2024-08-22</td>
            </tr>
            <tr>
              <td><strong>Valid until</strong></td>
              <td>2034-08-20</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="configuring-server"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Configuring your Ozone Connect server"
      title="Trust the CA bundle, pin to the API Hub's C4 OU"
      tone="cream"
    >
      <EdProse>Inbound mTLS configuration has two parts:</EdProse>
      <EdBullets>
        <li><strong>Trust the Trust Framework CA bundle</strong> so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework.</li>
        <li><strong>Pin the connection to the API Hub's C4 client</strong> so that a certificate signed by the same Trust Framework &mdash; but belonging to a different participant &mdash; cannot reach your endpoints.</li>
      </EdBullets>

      <h3 id="trust-ca-bundle">3a. Trust the CA bundle</h3>
      <EdProse>
        Assemble a single PEM bundle containing the <strong>Issuing CA</strong> first, then the
        <strong>Root CA</strong>. This bundle is what your TLS-terminating component loads as its trusted
        client-CA file.
      </EdProse>

      <EdNote type="tip" title="Bundle for Pre-production">
        <EdCode lang="bash" :code="bundlePreprodCmd" />
        <p>For Production, fetch the equivalent files from <code>https://crl.pki.openfinance.ae/</code>.</p>
      </EdNote>

      <EdProse>
        Configure the component that terminates TLS in front of Ozone Connect to <strong>require</strong>
        a client certificate and to validate it against this bundle. The LFI is responsible for mapping
        the requirement to their own infrastructure &mdash; common patterns include:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Configuration surface</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>nginx</strong></td>
              <td><code>ssl_client_certificate</code> (path to the bundle) and <code>ssl_verify_client on</code></td>
            </tr>
            <tr>
              <td><strong>AWS Network Load Balancer / API Gateway</strong></td>
              <td>Trust store referencing the bundle, with <code>MutualAuthentication = verify</code></td>
            </tr>
            <tr>
              <td><strong>Google Cloud Load Balancing</strong></td>
              <td>Backend service client TLS policy with a server-side TLS trust configuration</td>
            </tr>
            <tr>
              <td><strong>Azure Application Gateway</strong></td>
              <td>Trusted client CA certificate on the listener, with client-authentication enabled</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Do not rely on the system trust store">
        <p>
          The Trust Framework roots are <strong>private</strong> &mdash; they are not present in
          operating-system or browser trust stores. Your component MUST be configured with the Trust
          Framework bundle explicitly.
        </p>
      </EdNote>

      <EdProse>
        Once the bundle is in place, the API Hub's C4 certificate will validate on every inbound call.
        The handshake will now also validate <strong>any</strong> other Trust Framework participant's
        certificate &mdash; which is what section 3b addresses.
      </EdProse>

      <h3>3b. Pin to the API Hub's C4 client</h3>
      <EdProse>
        Trusting the Trust Framework CA means that every TPP, every other LFI, and every client
        certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API
        Hub &mdash; and specifically your own API Hub instance's egress &mdash; can reach your Ozone
        Connect endpoints, the LFI SHOULD additionally pin the connection to the API Hub's C4 client
        subject <code>OU</code>.
      </EdProse>

      <EdProse>
        The subject of the C4 certificate contains the Ozone organisation's identifier in its
        <code>OU</code>. Ozone provides this identifier as part of
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#c4-transport-client-certificate">environment-specific onboarding</a>
        &mdash; the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of
        the certificate in that keystore is the value to pin against.
      </EdProse>

      <EdProse>
        Most reverse proxies expose the client-certificate subject as a variable during the request
        &mdash; for example, nginx exposes <code>$ssl_client_s_dn</code>. The LFI rejects any request
        whose client certificate subject <code>OU</code> does not equal the documented Ozone
        organisation OU.
      </EdProse>

      <EdProse>
        Pinning by the C4 leaf certificate's SHA-256 fingerprint is <strong>not</strong> required. The
        OU pin above is sufficient and survives C4 rotation without any LFI-side configuration change.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="verification"
      num="04"
      color="var(--at-navy)"
      eyebrow="Verification"
      title="Both layers must pass connectivity validation"
      tone="surface"
    >
      <EdProse>
        Ozone verifies both layers of your inbound mTLS configuration end-to-end as part of
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#connectivity-validation">Connectivity Validation</a>.
        The API Hub is only considered set up for an environment once <strong>both</strong> of the
        following are exercised successfully:
      </EdProse>

      <EdBullets>
        <li>The CA-trust layer rejects any connection that does not present a Trust Framework-issued client certificate (section 3a).</li>
        <li>The pinning layer rejects any Trust Framework-issued certificate whose subject OU does not match the API Hub's C4 organisation OU, and accepts the legitimate C4 certificate (section 3b).</li>
      </EdBullets>

      <EdProse>
        If either case fails, the environment-specific onboarding ticket remains open until the
        configuration is corrected.
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
