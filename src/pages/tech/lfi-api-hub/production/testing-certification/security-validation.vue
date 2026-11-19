<route lang="yaml">
meta:
  title: Security Validation
</route>

<script setup lang="ts">
const transportTests = `# 1. No client certificate. The TLS handshake MUST fail.
curl -v https://openapi-uat.example.com/accounts

# 2. The Connectivity Check endpoint that worked without mTLS during onboarding.
#    The TLS handshake MUST now fail.
curl -v https://openapi-uat.example.com/hello

# 3. A path that is not an Ozone Connect endpoint, no client certificate.
#    The TLS handshake MUST still fail: mTLS covers the whole base URL.
curl -v https://openapi-uat.example.com/does-not-exist

# 4. A valid Trust Framework certificate that is not the API Hub's C4
#    (here, your own C3 transport client certificate).
#    The request MUST be rejected; see section 06.
curl -v --cert c3.pem --key c3.key https://openapi-uat.example.com/accounts`

const jwtHeader = `{
  "alg": "PS256",
  "typ": "JOSE",
  "cty": "json",
  "kid": "<kid of the API Hub's Sig3 signing key>"
}`

const jwtPayload = `{
  "iss": "<O value from the API Hub's C4 certificate subject>",
  "sub": "<OU value from the API Hub's C4 certificate subject>",
  "aud": "<your PROVIDER_ID>",
  "iat": 1794960000,
  "exp": 1794960030,
  "jti": "3f6c1a52-8d0e-4b7a-9c61-2e5f0d4b8a17"
}`

interface JwtTest { name: string; build: string; expect: string }

const jwtTests: JwtTest[] = [
  {
    name: 'Baseline',
    build: 'A genuine request from the API Hub, over the API Hub\'s C4 connection, with a valid JWT Auth token.',
    expect: 'Accepted.',
  },
  {
    name: 'Missing token',
    build: 'Remove the <code>Authorization</code> header.',
    expect: 'Rejected.',
  },
  {
    name: 'Unsigned token',
    build: 'Set <code>alg</code> to <code>none</code> and strip the signature.',
    expect: 'Rejected.',
  },
  {
    name: 'Algorithm substitution',
    build: 'Re-sign with <code>RS256</code>, or with <code>HS256</code> using the published public key as the HMAC secret.',
    expect: 'Rejected. Only <code>PS256</code> is accepted.',
  },
  {
    name: 'Tampered payload',
    build: 'Change any claim (for example <code>aud</code> or <code>exp</code>) and keep the original signature.',
    expect: 'Rejected.',
  },
  {
    name: 'Unknown key',
    build: 'Set <code>kid</code> to a value not published on the JWKS.',
    expect: 'JWKS refetched (no more than once a minute), then rejected.',
  },
  {
    name: 'Key-location injection',
    build: 'Add <code>jku</code>, <code>jwk</code>, <code>x5u</code> or <code>x5c</code> pointing at a key the tester controls, and sign with that key.',
    expect: 'Rejected. These parameters are not supported and MUST NOT be used to locate a key.',
  },
  {
    name: 'Expired token',
    build: 'Set <code>exp</code> more than 10 seconds in the past.',
    expect: 'Rejected.',
  },
  {
    name: 'Future-dated token',
    build: 'Set <code>iat</code>, or <code>nbf</code> if present, more than 10 seconds in the future.',
    expect: 'Rejected.',
  },
  {
    name: 'Wrong audience',
    build: 'Set <code>aud</code> to another LFI\'s <code>PROVIDER_ID</code>.',
    expect: 'Rejected.',
  },
  {
    name: 'Token not bound to the connection',
    build: 'Set <code>iss</code> or <code>sub</code> to values that do not match the subject of the client certificate on the connection.',
    expect: 'Rejected.',
  },
  {
    name: 'Another participant\'s valid token',
    build: 'Connect with a Trust Framework certificate that is not the API Hub\'s C4 (for example your own C3). Send a JWT signed with that participant\'s own key (for example your Sig4), with <code>iss</code> and <code>sub</code> matching that certificate and <code>aud</code> set to your <code>PROVIDER_ID</code>.',
    expect: 'Rejected. The signature and claims are valid, so only the caller restriction in section 06 stops this request.',
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; Security
        </div>
        <h1 class="ed-doc__title">
          Security Validation
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before an LFI is approved for production, it must submit the results of an independent
          penetration test to Nebras. The test must cover the LFI's consent journey, its consent
          management interface, and <strong>every endpoint its Ozone Connect server exposes</strong>.
        </p>
        <p class="ed-doc__lede">
          Ozone Connect has no public APIs. The only legitimate caller is the API Hub. The test must
          therefore show that mTLS is enforced across the whole Ozone Connect Base URL, that any
          application layer authentication works as intended, and that <strong>no party other than
          the API Hub</strong> can reach your Ozone Connect endpoints.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner audience="LFI" cert-type="Penetration Test Results" />
      </div>
    </div>

    <EdSectionBand
      id="tester"
      num="01"
      color="var(--at-teal)"
      eyebrow="Who carries out the test"
      title="A reputable, independent third party"
      tone="cream"
    >
      <EdProse>
        The penetration test MUST be carried out by a <strong>reputable independent third
        party</strong>, for example a CREST-accredited testing organisation. Internal security assessments and self-attested reviews do not satisfy this
        requirement. The testing organisation MUST have no material conflict of interest with the
        LFI, including with the vendor that built or hosts the LFI's Open Finance implementation.
      </EdProse>

      <EdProse>The testing organisation SHOULD have demonstrable expertise in:</EdProse>

      <EdBullets>
        <li>Financial-grade API (FAPI) security profiles</li>
        <li>OAuth 2.0 and OpenID Connect</li>
        <li>JSON Web Token (JWT) vulnerabilities and JWS signature validation</li>
        <li>Mutual TLS and public key infrastructure (PKI)</li>
        <li>The UAE regulatory landscape for Open Finance</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope"
      title="What the test must cover"
      tone="surface"
    >
      <EdProse>
        The test MUST cover every area in the table below that applies to your implementation.
        Testing a sample of endpoints or a subset of the journey is not sufficient.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Area</th><th>In scope</th><th>Section</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Consent journey</strong>: Authorization Endpoint, authentication, authorization, and the redirect back to the TPP</td>
              <td>Unless you have adopted CAAP</td>
              <td><a href="#consent-journey">03</a></td>
            </tr>
            <tr>
              <td><strong>Consent Management Interface</strong></td>
              <td>Unless you have adopted CAAP</td>
              <td><a href="#consent-journey">03</a></td>
            </tr>
            <tr>
              <td><strong>Ozone Connect endpoints</strong>: every endpoint you have delivered</td>
              <td>Always</td>
              <td><a href="#ozone-connect-endpoints">04</a></td>
            </tr>
            <tr>
              <td><strong>mTLS enforcement</strong> across the whole Ozone Connect Base URL</td>
              <td>Always</td>
              <td><a href="#mtls">05</a></td>
            </tr>
            <tr>
              <td><strong>Caller restriction</strong>: only the API Hub can call Ozone Connect</td>
              <td>Always</td>
              <td><a href="#caller-restriction">06</a></td>
            </tr>
            <tr>
              <td><strong>Application layer authentication</strong></td>
              <td>If you selected API Key, Client Credentials Grant or JWT Auth</td>
              <td><a href="#application-layer-auth">07</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="LFIs that have adopted CAAP">
        <p>
          With <a href="/tech/lfi-api-hub/v2.1/caap/">CAAP</a>, Nebras operates the consent journey and the consent
          management interface on your behalf, so neither is in scope of your test. Your
          <a href="/tech/lfi-api-hub/v2.1/caap/api-guide">CAAP Operations endpoints</a> remain in scope: they are
          Ozone Connect endpoints and are covered by sections 04 to 07 like any other.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="consent-journey"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent journey and Consent Management Interface"
      title="The customer-facing surfaces you operate"
      tone="cream"
    >
      <EdProse>
        This section applies only if you operate your own consent journey and consent management
        interface. Test them as deployed in your digital banking channels (mobile app and web, where
        both are offered).
      </EdProse>

      <h3>Consent journey</h3>

      <EdProse>
        The test MUST cover the journey described in the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>, including at least:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Inbound redirect handling.</strong> Your Authorization Endpoint forwards what it
          receives to Headless Heimdall and does not act on other query parameters. Testing MUST
          confirm that parameters on the inbound URL cannot inject content into the page (for example
          reflected cross-site scripting) or change where the customer is sent.
        </li>
        <li>
          <strong>Authentication.</strong> Strong customer authentication cannot be skipped or
          bypassed, for example by jumping straight to the authorization step. Brute-force and lockout
          controls match those of your digital banking channel. Sessions cannot be fixed, hijacked or
          reused across interactions.
        </li>
        <li>
          <strong>Authorization.</strong> The customer can select only accounts they hold. Account
          selections and consent decisions cannot be tampered with between the customer's device and
          your backend before you update the consent at the API Hub.
        </li>
        <li>
          <strong>Identifiers.</strong> The <code>psuIdentifiers</code> and <code>accountIds</code> you
          return are opaque and do not expose internal customer or account numbers.
        </li>
        <li>
          <strong>Redirect back to the TPP.</strong> The URL returned by <code>doConfirm</code> or
          <code>doFail</code> is the only redirect target, cannot be manipulated, and is opened as
          described in <a href="/tech/lfi-api-hub/v2.1/consent-journey/opening-the-redirect">Opening the Redirect</a>.
        </li>
        <li>
          <strong>Key protection.</strong> The private keys behind your C3 transport certificate, your
          signing key and your encryption key (used to decrypt encrypted PII) are stored and used
          securely and cannot be extracted.
        </li>
      </EdBullets>

      <h3>Consent Management Interface</h3>

      <EdProse>
        The test MUST cover your
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>, including at
        least:
      </EdProse>

      <EdBullets>
        <li>
          A customer can view and revoke <strong>only their own</strong> consents. Changing a consent
          identifier in a request MUST NOT expose or act on another customer's consent.
        </li>
        <li>
          A revocation reaches the API Hub. Once a customer revokes a consent, a TPP call that relies
          on that consent MUST fail.
        </li>
        <li>
          The interface applies the same authentication, session and authorisation controls as the
          rest of your digital banking channel.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="ozone-connect-endpoints"
      num="04"
      color="var(--at-navy)"
      eyebrow="Ozone Connect endpoints"
      title="Every endpoint you have delivered"
      tone="surface"
    >
      <EdProse>
        The test MUST cover <strong>every endpoint your Ozone Connect server exposes</strong>, across
        every API description you have implemented:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Ozone Connect API description</th><th>Documentation</th></tr>
          </thead>
          <tbody>
            <tr><td>Connectivity Check</td><td><a href="/tech/lfi-api-hub/v2.1/connectivity-check/">Connectivity Check</a></td></tr>
            <tr><td>Bank Data Sharing</td><td><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/">Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/">Confirmation of Payee</a></td></tr>
            <tr><td>Bank Service Initiation</td><td><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/">Service Initiation</a></td></tr>
            <tr><td>Bank Products Data</td><td><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/">Products &amp; Leads</a></td></tr>
            <tr><td>Bank Open Data</td><td><a href="/tech/lfi-api-hub/v2.1/banking/atms/">ATMs</a></td></tr>
            <tr><td>Insurance</td><td><a href="/tech/lfi-api-hub/v2.1/insurance/">Insurance</a></td></tr>
            <tr><td>Consent Events &amp; Actions</td><td><a href="/tech/lfi-api-hub/v2.1/consent-events/">Consent Events</a></td></tr>
            <tr><td>CAAP Operations (CAAP LFIs only)</td><td><a href="/tech/lfi-api-hub/v2.1/caap/api-guide">CAAP API Guide</a></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>For each endpoint, the test MUST cover at least:</EdProse>

      <EdBullets>
        <li>
          <strong>Input handling.</strong> Injection, malformed or oversized payloads, and unexpected
          types and values. The API Hub enforces the OpenAPI schemas before proxying, but your endpoints
          MUST NOT depend on that alone.
        </li>
        <li>
          <strong>Header handling.</strong> Malformed, oversized or unexpected <code>o3-*</code>
          headers, for example an <code>o3-psu-identifier</code> that is not valid Base64-encoded JSON.
        </li>
        <li>
          <strong>Data exposure.</strong> Responses contain only data for the customer and accounts
          identified in the request from the API Hub.
        </li>
        <li>
          <strong>Error handling.</strong> Errors follow the Ozone Connect API description and do not
          leak stack traces, internal hostnames or other implementation detail.
        </li>
        <li>
          <strong>Payment execution.</strong> Business-logic abuse of payment endpoints, including race
          conditions and duplicate submission.
        </li>
        <li>
          <strong>Unintended surface.</strong> The tester MUST enumerate the Ozone Connect Base URL for
          anything that is not a delivered Ozone Connect endpoint, such as admin consoles, API
          documentation pages, framework management endpoints or debug routes.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="mtls"
      num="05"
      color="var(--at-teal)"
      eyebrow="mTLS enforcement"
      title="The whole Ozone Connect Base URL is mTLS-only"
      tone="cream"
    >
      <EdProse>
        Ozone Connect serves no public APIs. Every request to the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</a>
        MUST require a valid Trust Framework client certificate <strong>at the TLS handshake</strong>,
        configured as described in
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server">Configuring Inbound mTLS</a>.
        This applies to every path under the base URL, not only the Open Finance endpoints, and to
        every hostname, IP address and port that serves it.
      </EdProse>

      <EdProse>The test MUST show that each of the following is rejected:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Test</th><th>Expected result</th></tr>
          </thead>
          <tbody>
            <tr><td>No client certificate, on a delivered endpoint</td><td>Handshake fails</td></tr>
            <tr><td>No client certificate, on <code>GET /hello</code></td><td>Handshake fails (see the note below)</td></tr>
            <tr><td>No client certificate, on the root path and on paths that are not Ozone Connect endpoints</td><td>Handshake fails</td></tr>
            <tr><td>Self-signed client certificate</td><td>Handshake fails</td></tr>
            <tr><td>Client certificate from a public certificate authority</td><td>Handshake fails</td></tr>
            <tr><td>Expired Trust Framework client certificate</td><td>Handshake fails</td></tr>
            <tr><td>Client certificate from the other environment's Trust Framework (Sandbox certificate against Production, and the reverse)</td><td>Handshake fails</td></tr>
            <tr><td>Plain HTTP on port 80 or any other port</td><td>No Ozone Connect content is served</td></tr>
            <tr><td>Direct access to the origin behind your load balancer, WAF or API gateway, bypassing the component that enforces mTLS</td><td>Not reachable, or mTLS is enforced there too</td></tr>
            <tr><td>Client-certificate headers supplied by the caller (for example <code>X-SSL-Client-Cert</code> or <code>X-SSL-Client-S-DN</code>), where TLS is terminated before your application</td><td>Ignored or stripped. Only the TLS-terminating component sets these values.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="GET /hello no longer responds, and that is expected">
        <p>
          <a href="/tech/lfi-api-hub/v2.1/connectivity-check/open-api/hello"><code>GET /hello</code></a>
          is the one <a href="/tech/lfi-api-hub/v2.1/connectivity-check/">Connectivity Check</a>
          endpoint that works without mTLS. It exists so that Ozone can confirm network routing to
          your Ozone Connect server early in onboarding, before mTLS is in place.
        </p>
        <p>
          The penetration test takes place well after connectivity has been established and verified
          (see <a href="#environment">section 08</a>). By then mTLS MUST be enforced across the whole
          base URL, so <code>GET /hello</code> fails at the handshake like every other request without
          a client certificate. This is the correct result, not a defect. Do not exempt
          <code>/hello</code> from mTLS to keep it working.
          <a href="/tech/lfi-api-hub/v2.1/connectivity-check/open-api/hello-mtls"><code>GET /hello-mtls</code></a>
          and
          <a href="/tech/lfi-api-hub/v2.1/connectivity-check/open-api/echo-cert"><code>GET /echo-cert</code></a>
          continue to work for the API Hub. Keep all three endpoints in place so that connectivity
          issues can be debugged quickly &mdash; see
          <a href="/tech/lfi-api-hub/v2.1/connectivity-check/#after-mtls">After mTLS enforcement</a>.
        </p>
      </EdNote>

      <EdCode lang="bash" :code="transportTests" filename="Example transport tests (Pre-production)" />
    </EdSectionBand>

    <EdSectionBand
      id="caller-restriction"
      num="06"
      color="var(--at-gold)"
      eyebrow="Caller restriction"
      title="Only the API Hub can call Ozone Connect"
      tone="surface"
    >
      <EdProse>
        mTLS on its own does not restrict callers to the API Hub. Your Ozone Connect server trusts the
        Trust Framework Issuing CA, and that CA signs certificates for <strong>every</strong>
        participant: every TPP and every other LFI. Any of them can complete the handshake.
      </EdProse>

      <EdProse>
        The LFI MUST ensure that the API Hub is the only party that can call its Ozone Connect
        endpoints. Whether your application layer authentication already does this depends on the
        method:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Method</th><th>Restricts callers to the API Hub?</th><th>Additional control needed?</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>mTLS Only (Off)</td>
              <td>No</td>
              <td><strong>Yes</strong>: use one of the controls below.</td>
            </tr>
            <tr>
              <td>API Key</td>
              <td>Yes, if the key is checked on every endpoint: only the API Hub holds it</td>
              <td>No. One of the controls below is RECOMMENDED as defence in depth.</td>
            </tr>
            <tr>
              <td>Client Credentials Grant</td>
              <td>Yes, if tokens are checked on every endpoint: your authorisation server issues them only to the API Hub's client</td>
              <td>No. One of the controls below is RECOMMENDED as defence in depth.</td>
            </tr>
            <tr>
              <td>JWT Auth</td>
              <td><strong>No</strong>: see the warning below</td>
              <td><strong>Yes</strong>: use one of the controls below.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="JWT Auth does not identify the API Hub on its own">
        <p>
          Your server finds the verification key from the caller's own client certificate, and
          <code>iss</code> and <code>sub</code> only have to match that certificate. Any participant
          can therefore sign a JWT that passes every signature and claim check, using its own
          certificate and its own signing key. With JWT Auth you need one of the controls below as
          well.
        </p>
      </EdNote>

      <h3>Controls that identify the API Hub</h3>

      <EdProse>
        You MAY use any of the following, or another control that achieves the same result. Nebras
        assesses the outcome, shown by the tests below, not the mechanism.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Certificate pinning.</strong> Accept only connections whose client certificate subject
          <code>OU</code> is the API Hub's C4 organisation <code>OU</code>, as described in
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server#configuring-server">Configuring Inbound mTLS, section 3b</a>.
          Ozone provides this value during
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#c4-transport-client-certificate">environment-specific onboarding</a>.
        </li>
        <li>
          <strong>JWT subject check.</strong> With JWT Auth, reject any token whose <code>sub</code> is
          not the API Hub's C4 organisation <code>OU</code>.
        </li>
        <li>
          <strong>Network restriction.</strong> Accept connections to your Ozone Connect Base URL only
          from the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url#network-access">API Hub's egress IP addresses</a>.
        </li>
      </EdBullets>

      <h3>How to test it</h3>

      <EdProse>
        You already hold a suitable test certificate: your own <strong>C3</strong> transport client
        certificate, which you use to call the API Hub. It is issued by the same Trust Framework
        Issuing CA as the API Hub's C4, so it completes the handshake, but it is not the API Hub. The
        test MUST show that:
      </EdProse>

      <EdBullets>
        <li>A request over a C3 connection is rejected on every Ozone Connect endpoint.</li>
        <li>
          If you use JWT Auth, a request over a C3 connection carrying a JWT signed with your own
          <strong>Sig4</strong> key, with <code>iss</code> and <code>sub</code> matching your C3
          certificate and <code>aud</code> set to your <code>PROVIDER_ID</code>, is rejected on every
          Ozone Connect endpoint.
        </li>
        <li>A genuine request from the API Hub, over its C4 connection, is accepted.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="application-layer-auth"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Application layer authentication"
      title="Test the method you selected"
      tone="cream"
    >
      <EdProse>
        If you selected an
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">application layer authentication</a>
        method, the test MUST show that it is enforced on <strong>every</strong> Ozone Connect
        endpoint. Run the negative cases against each endpoint, not against one representative
        endpoint: gateways often apply authentication route by route, and a single unprotected route
        is enough to bypass it.
      </EdProse>

      <h3>API Key</h3>
      <EdBullets>
        <li>Requests with a missing, invalid or previously rotated key are rejected.</li>
        <li>The key does not appear in logs, error responses or client-side code.</li>
      </EdBullets>

      <h3>Client Credentials Grant</h3>
      <EdBullets>
        <li>Your authorisation server's token endpoint is in scope of the test.</li>
        <li>Requests with a missing, expired, forged or tampered access token are rejected.</li>
        <li>Tokens issued to any client other than the API Hub's, or without the configured scope, are rejected.</li>
      </EdBullets>

      <h3>JWT Auth: worked example</h3>

      <EdProse>
        With JWT Auth, the API Hub sends a PS256-signed JWT in the <code>Authorization</code> header of
        each request, and your server validates it as described in
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server">JWT Auth &mdash; Server-side</a>.
        A genuine token decodes to a header and payload like these:
      </EdProse>

      <EdCode lang="json" :code="jwtHeader" filename="JWS header" />
      <EdCode lang="json" :code="jwtPayload" filename="Payload" />

      <EdProse>
        The tester starts from a genuine token and builds each variant below. Every variant except the
        baseline MUST be rejected on every endpoint, and the report MUST record the result of each.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Test</th><th>How the tester builds it</th><th>Expected result</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in jwtTests" :key="t.name">
              <td><strong>{{ t.name }}</strong></td>
              <td v-html="t.build" />
              <td v-html="t.expect" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Clock-based tests allow for the 10-second clock skew defined in the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server#claims-reference">claims reference</a>.
        A token just inside the skew is accepted. A token just outside it is rejected.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="environment"
      num="08"
      color="var(--at-navy)"
      eyebrow="Test environment"
      title="Test what will go live"
      tone="surface"
    >
      <EdProse>
        The test MUST take place well after connectivity between the API Hub and your Ozone Connect
        server has been established and verified through
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation">connectivity validation</a>.
        Testing an implementation that is still being connected or configured does not give
        assurance about what will go live.
      </EdProse>

      <EdProse>
        The test MUST have been completed within the <strong>3 months</strong> before you submit the
        report to Nebras.
      </EdProse>

      <EdProse>
        The test MUST be conducted against the build and configuration you intend to take live. It
        does not need to run against Production. A Pre-production environment is acceptable if it
        matches Production in architecture, configuration and behaviour.
      </EdProse>

      <EdProse>
        The tests in sections 05, 06 and 07 MUST run against the same TLS-terminating component,
        gateway rules and application layer authentication configuration that front Production. The
        only expected difference is the Trust Framework CA bundle: Pre-production trusts the Sandbox
        Trust Framework and Production trusts the Production Trust Framework.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="submission"
      num="09"
      color="var(--at-teal)"
      eyebrow="Report and submission"
      title="What the report must contain"
      tone="cream"
    >
      <EdProse>The penetration test report MUST include:</EdProse>

      <EdBullets>
        <li>The testing organisation's name and a statement of its independence from the LFI.</li>
        <li>The test dates, which MUST fall within the 3 months before submission, the environment tested, and the Ozone Connect Base URL tested.</li>
        <li>The application layer authentication method in use, and whether you have adopted CAAP.</li>
        <li>The scope covered, listing each in-scope area from section 02 and each Ozone Connect endpoint tested.</li>
        <li>A pass or fail result, with evidence, for each test in sections 05, 06 and 07.</li>
        <li>Every finding, with a severity rating and the rating methodology used (for example CVSS).</li>
        <li>The remediation status of each finding, with re-test evidence for any finding that has been fixed.</li>
      </EdBullets>

      <EdProse>
        Submit the report to Nebras through the Service Desk with the Certification Type
        <strong>Penetration Test Results</strong>, as shown at the top of this page. Nebras may ask for
        clarification, require findings to be remediated, or require a re-test before granting
        production access.
      </EdProse>

      <EdNote type="warning" title="Remediation before production">
        <p>
          Any <strong>critical</strong> or <strong>high</strong> severity finding MUST be remediated,
          and the fix evidenced by a re-test, before production access is granted. Medium and lower
          severity findings MUST be acknowledged with a documented remediation plan.
        </p>
        <p>
          Nebras treats a failed test in section 05 or 06 as <strong>critical</strong>, whatever
          severity the tester assigns: either failure exposes your Ozone Connect endpoints to parties
          other than the API Hub.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="ongoing"
      num="10"
      color="var(--at-gold)"
      eyebrow="Ongoing security responsibility"
      title="Security after go-live"
      tone="surface"
    >
      <EdProse>
        The penetration test is a point-in-time assessment required before go-live. It is not a
        substitute for a continuous security posture. Once live, the LFI is responsible for the ongoing
        security of its consent journey, its consent management interface and its Ozone Connect
        endpoints. It is critical that the LFI upholds this responsibility.
      </EdProse>

      <h3>Annual re-testing</h3>

      <EdProse>
        The LFI SHOULD repeat the penetration test, to the scope on this page, at least every
        <strong>12 months</strong>. These periodic re-tests are part of your own security assurance:
        you do not need to submit them to Nebras for certification.
      </EdProse>

      <h3>Material changes</h3>

      <EdProse>
        A material change to your implementation MUST be followed by a new penetration test, and the
        new report MUST be submitted to Nebras as described in <a href="#submission">section 09</a>.
        Material changes are expected to be rare. Examples include:
      </EdProse>

      <EdBullets>
        <li>Replacing or re-platforming your Ozone Connect server</li>
        <li>Replacing the component that enforces mTLS in front of Ozone Connect, or moving to different hosting</li>
        <li>A change of application layer authentication method</li>
        <li>A rebuild of your consent journey or consent management interface</li>
      </EdBullets>

      <EdProse>Nebras may ask to see evidence of your security assurance at any point after go-live.</EdProse>
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

.ed-doc__intro { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__intro .ed-doc__inner { padding: 2rem 2rem 2.5rem; }

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
  .ed-doc__intro .ed-doc__inner { padding: 1.5rem 1.25rem 2rem; }
}
</style>
