<route lang="yaml">
meta:
  title: Authorization Endpoint
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Environment-Specific
        </div>
        <h1 class="ed-doc__title">
          Authorization Endpoint
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Authorization Endpoint</strong> is the HTTPS URL to which the end user (customer) is
          redirected during consent authorisation flows. It is the entry point to the LFI's
          authentication and consent authorisation experience.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The TPP constructs the redirect URL and sends the end user there directly &mdash; the API Hub does
          not perform this redirect. The URL MUST therefore be a stable, publicly accessible HTTPS
          endpoint that works reliably across all devices and browsers.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-you-provide"
      num="01"
      color="var(--at-teal)"
      eyebrow="What you provide"
      title="One Authorization Endpoint per Hub instance, per environment"
      tone="cream"
    >
      <EdProse>You MUST provide one Authorization Endpoint URL per API Hub instance, per environment:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-production</td>
              <td><code>https://openbanking-uat.example.com/authorize</code></td>
            </tr>
            <tr>
              <td>Production</td>
              <td><code>https://openbanking.example.com/authorize</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>There is exactly <strong>one</strong> Authorization Endpoint URL per API Hub instance.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="how-it-is-used"
      num="02"
      color="var(--at-gold)"
      eyebrow="How it is used"
      title="The consent authorisation flow"
      tone="surface"
    >
      <EdProse>During the consent authorisation flow:</EdProse>

      <EdBullets>
        <li>A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub.</li>
        <li>The API Hub creates the consent and returns a <code>request_uri</code> to the TPP.</li>
        <li>The TPP constructs the authorization URL and redirects the end user to <strong>your Authorization Endpoint</strong>.</li>
        <li>
          Your system calls
          <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a>
          on the Headless Heimdall Auth Server, passing through the query parameters received from the
          redirect.
        </li>
        <li>Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details.</li>
        <li>Your system authenticates the end user and presents the consent for approval.</li>
        <li>Your system calls <code>doConfirm</code> or <code>doFail</code> on the Headless Heimdall Auth Server with the result.</li>
        <li>The end user is redirected back to the TPP.</li>
      </EdBullets>

      <EdNote type="info" title="FAPI 2.0 protocol handling">
        <p>
          The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall
          Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token
          binding, or OIDC protocol logic directly &mdash; these are handled when you call
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span>. Your endpoint's role is to receive the redirect, invoke
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span>, authenticate the end user, and complete the consent journey.
        </p>
        <p>
          For full details on the authorization flow, see the
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="url-format"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="URL format requirements"
      title="HTTPS, no query parameters, public, stable"
      tone="cream"
    >
      <EdProse>The Authorization Endpoint URL MUST:</EdProse>

      <EdBullets>
        <li>Use <strong>HTTPS</strong> &mdash; HTTP is not permitted</li>
        <li>Be a clean base URL with <strong>no query parameters</strong> &mdash; the TPP appends OIDC query parameters (<code>client_id</code>, <code>response_type</code>, <code>request_uri</code>) during the redirect</li>
        <li>Be accessible to end user browsers over the <strong>public internet</strong></li>
        <li>Resolve to infrastructure <strong>owned and operated by the LFI</strong></li>
        <li>Be stable &mdash; the URL MUST NOT change without coordinated reconfiguration of the API Hub instance</li>
      </EdBullets>

      <EdProse>The TPP constructs the full redirect URL in the following format:</EdProse>

      <EdCode lang="text" code="https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&request_uri={request_uri}" />

      <EdProse>
        Where <code>request_uri</code> is the value returned from the API Hub's <code>/par</code> response.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="deep-linking"
      num="04"
      color="var(--at-navy)"
      eyebrow="App invocation via deep linking"
      title="Universal Links and App Links — no custom schemes"
      tone="surface"
    >
      <EdProse>
        The Authorization Endpoint URL MUST be configured as a <strong>deep link</strong> that opens the
        LFI's native mobile app when it is installed on the end user's device. This is the primary
        authentication channel &mdash; most end users will authenticate via the LFI's mobile banking app.
      </EdProse>

      <h3>Required approach: Universal Links and App Links</h3>
      <EdProse>
        LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint
        URL with their native app:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Mechanism</th>
              <th>Verification file</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>iOS</strong></td>
              <td>Universal Links</td>
              <td><code>/.well-known/apple-app-site-association</code></td>
            </tr>
            <tr>
              <td><strong>Android</strong></td>
              <td>Android App Links</td>
              <td><code>/.well-known/assetlinks.json</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        These mechanisms allow the operating system to verify that the LFI owns both the domain and the
        app, and to open the app directly when the end user navigates to the URL &mdash; without showing an
        intermediate browser page or disambiguation dialog.
      </EdProse>

      <EdNote type="danger" title="Custom URL schemes are prohibited">
        <p>
          Custom URL schemes (e.g. <code>mybank://authorize</code>) MUST NOT be used. Custom schemes are
          not verified by the operating system, meaning any app can register to handle the scheme. This
          creates a redirect interception risk where a malicious app could capture the authorization
          request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted.
        </p>
      </EdNote>

      <h3>How verified deep linking works</h3>
      <EdProse>Both Universal Links (iOS) and App Links (Android) follow the same principle:</EdProse>

      <EdBullets>
        <li><strong>The LFI hosts a verification file</strong> on the Authorization Endpoint domain, proving ownership of both the domain and the app.</li>
        <li><strong>The LFI's mobile app declares</strong> that it handles URLs for the Authorization Endpoint domain.</li>
        <li><strong>The operating system verifies</strong> the association at app install time by fetching the verification file from the domain.</li>
        <li><strong>When the end user navigates to the URL</strong>, the OS opens the LFI app directly &mdash; no browser page is loaded, no disambiguation dialog is shown.</li>
      </EdBullets>

      <h4>iOS &mdash; Apple App Site Association</h4>
      <EdProse>
        The LFI MUST host an <code>apple-app-site-association</code> file at the root of the
        Authorization Endpoint domain:
      </EdProse>
      <EdCode lang="text" code="https://openbanking.example.com/.well-known/apple-app-site-association" />
      <EdProse>
        This JSON file declares which paths on the domain should open the app. It MUST be served over
        HTTPS without redirects, and MUST NOT require authentication.
      </EdProse>

      <h4>Android &mdash; Digital Asset Links</h4>
      <EdProse>
        The LFI MUST host an <code>assetlinks.json</code> file at the root of the Authorization Endpoint
        domain:
      </EdProse>
      <EdCode lang="text" code="https://openbanking.example.com/.well-known/assetlinks.json" />
      <EdProse>
        This JSON file establishes a cryptographic link between the domain and the app using the app's
        signing certificate fingerprint. The app's <code>AndroidManifest.xml</code> MUST declare an
        intent filter with <code>android:autoVerify="true"</code> for the Authorization Endpoint domain.
      </EdProse>

      <EdNote type="tip" title="Verification happens at install time">
        <p>
          The operating system fetches and verifies the association file when the app is installed or
          updated. If verification fails (e.g. the file is missing, malformed, or the certificate
          fingerprint doesn't match), the OS will fall back to opening the URL in the browser &mdash;
          which defeats the purpose of deep linking. LFIs MUST ensure the verification files are
          correctly configured and accessible <strong>before</strong> publishing the app.
        </p>
      </EdNote>

      <h3>Fallback when the app is not installed</h3>
      <EdProse>
        If the LFI app is not installed on the end user's device, the URL opens in the device's browser. In
        this case, the Authorization Endpoint MUST serve a <strong>mobile-optimised web page</strong>
        that allows the end user to complete authentication. See the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation#fallback-scenarios-when-the-app-is-not-available">Authentication Implementation Guide</a>
        for the detailed fallback flows, including browser-based authentication, app handoff via push
        notification, and QR code handoff from desktop.
      </EdProse>

      <EdProse>
        The same URL MUST work in both cases &mdash; app invocation and browser fallback &mdash; without
        requiring the TPP or end user to do anything differently.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="desktop-browser"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Desktop browser behaviour"
      title="QR handoff, push handoff, or browser-based auth"
      tone="cream"
    >
      <EdProse>
        When the end user is on a desktop device, the Authorization Endpoint URL opens in the desktop
        browser. There is no native app to deep link to. In this case, the endpoint MUST render a web
        page that enables the end user to complete the consent journey. Common approaches include:
      </EdProse>

      <EdBullets>
        <li><strong>QR code handoff</strong> &mdash; the page displays a QR code that the end user scans with their mobile device, opening the LFI app to complete authentication</li>
        <li><strong>Push notification handoff</strong> &mdash; the page collects identifying information and triggers a push notification to the end user's bound device</li>
        <li><strong>Browser-based authentication</strong> &mdash; if the LFI supports web-based authentication in its existing digital channels, the end user MUST be able to complete the entire journey in the desktop browser</li>
      </EdBullets>

      <EdProse>
        The desktop page MUST poll for completion and redirect the end user back to the TPP once the consent
        journey concludes.
      </EdProse>

      <EdProse>
        For implementation details, see the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation#desktop-browser--qr-code-or-push-notification">Authentication Implementation Guide</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="cross-device"
      num="06"
      color="var(--at-gold)"
      eyebrow="Cross-device and cross-browser compatibility"
      title="Works regardless of device, OS, browser, or TPP redirect method"
      tone="surface"
    >
      <EdProse>
        The Authorization Endpoint is invoked by a TPP that the LFI does not control. The LFI cannot
        predict which device, operating system, browser, or redirect method the TPP will use. The
        endpoint MUST therefore work reliably across all common combinations.
      </EdProse>

      <h3>What the LFI MUST support</h3>
      <EdProse>The Authorization Endpoint MUST function correctly:</EdProse>

      <EdBullets>
        <li><strong>Across mobile platforms</strong> &mdash; iOS and Android, including current and recent OS versions</li>
        <li><strong>Across mobile browsers</strong> &mdash; Safari, Chrome, Samsung Internet, Firefox, and any other browser with meaningful market share in the UAE. The deep link MUST open the app regardless of which browser the TPP is using. If the app is not installed, the browser fallback MUST render correctly in all of these browsers.</li>
        <li><strong>Across desktop browsers</strong> &mdash; Chrome, Safari, Edge, and Firefox on Windows, macOS, and common Linux distributions</li>
        <li><strong>Regardless of how the TPP opens the redirect</strong> &mdash; the endpoint MUST work whether the TPP opens the URL in the current browser tab, a new browser tab, or a system browser view (e.g. <code>SFSafariViewController</code> on iOS, Chrome Custom Tabs on Android). The behaviour MUST be seamless in all cases.</li>
        <li><strong>On both mobile and desktop</strong> &mdash; the same URL serves the appropriate experience based on the device context</li>
      </EdBullets>

      <h3>What the LFI MUST test</h3>
      <EdProse>
        LFIs are responsible for comprehensive testing of the Authorization Endpoint across the full
        range of devices, operating systems, and browsers their end users may use. This includes verifying
        that:
      </EdProse>

      <EdBullets>
        <li>Deep linking correctly opens the native app on both iOS and Android when the app is installed, across all major browsers</li>
        <li>The browser fallback renders and functions correctly on both iOS and Android when the app is not installed, across all major browsers</li>
        <li>The desktop experience works across all major desktop browsers</li>
        <li>The flow completes successfully regardless of whether the TPP opens the redirect in the current tab, a new tab, or a system browser view</li>
        <li>Navigation behaviour is sensible &mdash; for example, pressing the device back button during the flow does not leave the end user stranded on a blank page</li>
        <li>The flow works on devices with different screen sizes, orientations, and accessibility settings</li>
      </EdBullets>

      <EdNote type="warning" title="Compatibility failures block production certification">
        <p>
          Any failure of the Authorization Endpoint to function on a device or browser that end users
          commonly use will be treated as a <strong>certification failure</strong>. The LFI is
          responsible for ensuring broad compatibility. The CX certification process, managed by Nebras,
          will verify this as part of production readiness.
        </p>
      </EdNote>

      <h3>App disambiguation</h3>
      <EdProse>
        On Android, if multiple apps are registered to handle the same domain (for example, a production
        app and a development build), the OS may display a disambiguation dialog asking the end user to
        choose which app to open. This MUST NOT occur in production &mdash; it confuses the end user and
        undermines trust.
      </EdProse>

      <EdProse>
        LFIs MUST ensure that only the production app is verified against the production Authorization
        Endpoint domain. Development and staging builds MUST use separate domains (e.g.
        <code>openbanking-dev.example.com</code>) and MUST NOT be registered against the production
        domain's <code>assetlinks.json</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="summary"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Summary of requirements"
      title="The full checklist"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:3rem">#</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>HTTPS only &mdash; no HTTP, no custom URL schemes</td></tr>
            <tr><td>2</td><td>No query parameters in the base URL</td></tr>
            <tr><td>3</td><td>Publicly accessible over the internet</td></tr>
            <tr><td>4</td><td>Universal Links (iOS) and App Links (Android) configured for the domain</td></tr>
            <tr><td>5</td><td><code>apple-app-site-association</code> and <code>assetlinks.json</code> hosted and verified</td></tr>
            <tr><td>6</td><td>App opens directly when installed &mdash; no intermediate pages or disambiguation dialogs</td></tr>
            <tr><td>7</td><td>Mobile-optimised web fallback when app is not installed</td></tr>
            <tr><td>8</td><td>Desktop web experience with handoff to mobile app (QR, push) or browser-based auth</td></tr>
            <tr><td>9</td><td>Works across all major browsers on iOS, Android, and desktop</td></tr>
            <tr><td>10</td><td>Works regardless of TPP redirect method (current tab, new tab, system browser view)</td></tr>
            <tr><td>11</td><td>Production app disambiguation resolved &mdash; only one app handles the production domain</td></tr>
            <tr><td>12</td><td>CX certified by Nebras as part of production readiness</td></tr>
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
