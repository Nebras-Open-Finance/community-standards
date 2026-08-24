<route lang="yaml">
meta:
  title: CAAP - API Guide
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · CAAP · API Guide
        </div>
        <h1 class="ed-doc__title">
          CAAP Operations API Guide
          <span class="ed-doc__read">10 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When an LFI adopts CAAP, the end user&apos;s authentication and consent authorisation experience is
          delivered by CAAP rather than by the LFI. CAAP drives that experience by calling endpoints on
          the LFI&apos;s Ozone Connect server. This guide walks the end-to-end flow and focuses on what
          is different about the CAAP path &mdash; from the redirect into CAAP, through registration and
          account or policy selection, to the final redirect back to the TPP.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="endpoints"
      num="01"
      color="var(--at-teal)"
      eyebrow="Endpoints in scope"
      title="CAAP Operations endpoints the LFI MUST implement"
      tone="cream"
    >
      <EdProse>
        These endpoints are called on the LFI&apos;s Ozone Connect server. They use the same base URL,
        mTLS, and (where configured) JWT authentication as the LFI&apos;s other Ozone Connect surfaces &mdash;
        see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</a>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Direction</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/consent-actions-validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/actions/validate</code></a></td>
              <td>API Hub &rarr; LFI</td>
              <td>LFI validates the consent at PAR time; gates whether the consent is created and the <code>request_uri</code> is returned to the TPP.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-initialize" class="endpoint"><span class="http-method http-method--post">POST</span><code>/users/actions/register/initialize</code></a></td>
              <td>CAAP &rarr; LFI</td>
              <td>Identify the end user at the LFI from an encrypted Emirates ID; return the end user&apos;s LFI userId.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-complete" class="endpoint"><span class="http-method http-method--post">POST</span><code>/users/actions/register/complete</code></a></td>
              <td>CAAP &rarr; LFI</td>
              <td>Complete registration after the end user has answered the LFI&apos;s OTP challenge.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a></td>
              <td>CAAP &rarr; LFI</td>
              <td>Return every account the end user can share or initiate from, depending on the use case.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/employment-insurance-policies" class="endpoint"><span class="http-method http-method--get">GET</span><code>/{type}-insurance-policies</code></a></td>
              <td>CAAP &rarr; LFI</td>
              <td>Return every insurance policy of the given type the end user can share.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Hub-side endpoints CAAP calls">
        <p>
          CAAP also calls the API Hub&apos;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/">Headless Heimdall</a>
          and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/">Consent Manager</a> at the end of the
          journey to patch the consent and complete the interaction. The LFI does not implement those &mdash;
          the API Hub does &mdash; but they appear in the sequence flow below for completeness.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="sequence"
      num="02"
      color="var(--at-gold)"
      eyebrow="API sequence flow"
      title="End-to-end flow diagram"
      tone="surface"
    >
      <APIFlowViewer title="CAAP Consent Flow">
        <APIFlowsCAAPConsent />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="par"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — Consent creation"
      title="POST /par"
      tone="cream"
    >
      <EdProse>
        The journey begins with the standard
        <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/par" class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></a>
        flow &mdash; including the API Hub&apos;s gating call to
        <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/consent-actions-validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/actions/validate</code></a>
        on the LFI before the consent is created. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide">Consent Journey &mdash; API Guide</a>
        for the full mechanics; nothing about this step changes for CAAP-adopting LFIs.
      </EdProse>

      <EdProse>
        Once the TPP has the <code>request_uri</code>, it redirects the end user to the API Hub&apos;s
        authorize URL. The API Hub recognises that this LFI is configured for CAAP and redirects the
        end user on to CAAP rather than to an LFI-operated authorization endpoint &mdash; this is the
        first point at which CAAP differs from the LFI-operated flow.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="psu-auth"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 — Authentication"
      title="End user authenticates at CAAP via EFR or UAE Pass"
      tone="surface"
    >
      <EdProse>
        CAAP authenticates the end user using <strong>EFR</strong> or <strong>UAE Pass</strong>. This step
        does not involve the LFI &mdash; CAAP integrates with the national identity rails directly.
        The end user&apos;s Emirates ID is established as a result.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="register-initialize"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — Register the end user"
      title="POST /users/actions/register/initialize"
      tone="cream"
    >
      <EdProse>
        Once CAAP has the end user&apos;s Emirates ID, it calls
        <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-initialize" class="endpoint"><span class="http-method http-method--post">POST</span><code>/users/actions/register/initialize</code></a>
        on the LFI&apos;s Ozone Connect server. The request body carries the Emirates ID
        <strong>encrypted</strong> &mdash; never in cleartext.
      </EdProse>

      <h3>Encryption with the LFI&apos;s ENC1 key</h3>
      <EdProse>
        CAAP encrypts the Emirates ID using the LFI&apos;s <strong>ENC1</strong> public key &mdash; the
        same server-side encryption key referenced in
        <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>. The LFI
        MUST decrypt the payload using the corresponding ENC1 private key.
      </EdProse>

      <h3>The LFI MUST return providerUserIdentifier.userId on the initial response</h3>
      <EdProse>
        Regardless of whether the LFI subsequently issues a challenge, the response to
        <code>register/initialize</code> MUST contain the LFI&apos;s identifier for the end user on
        <code>data.providerUserIdentifier.userId</code>. CAAP uses this identifier from that point on,
        including the <code>psuIdentifiers.userId</code> it patches onto the consent at the end of the
        journey &mdash; it MUST be identical across all of those uses, and MUST satisfy the opacity
        rules described in
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#identifier-requirements">Consent Journey &mdash; Identifier requirements</a>.
      </EdProse>

      <EdNote type="danger" title="userId MUST be opaque and non-sensitive">
        <p>
          The <code>userId</code> the LFI returns is stored centrally by the API Hub. It MUST be
          opaque, non-sensitive, and LFI-defined &mdash; <strong>never</strong> an Emirates ID,
          passport number, email, phone number, CIF, account number, or any other PII. Use an
          internal customer reference, a UUID, or another opaque token.
        </p>
      </EdNote>

      <h3>Optional challenge</h3>
      <EdProse>
        The LFI may choose to issue its own challenge before registration is final &mdash; typically an
        OTP sent over the LFI&apos;s usual SCA channel. To do so, the LFI responds with
        <code>registrationStatus</code> set to <code>AwaitingChallengeResponse</code> and a
        <code>challengeId</code> alongside the <code>providerUserIdentifier.userId</code>.
        CAAP collects the OTP from the end user and calls
        <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-complete" class="endpoint"><span class="http-method http-method--post">POST</span><code>/users/actions/register/complete</code></a>.
      </EdProse>

      <EdProse>
        If the LFI does not need to challenge the end user, it responds to the initial
        <code>register/initialize</code> call directly with
        <code>registrationStatus: Complete</code> alongside <code>providerUserIdentifier.userId</code> &mdash;
        CAAP skips the complete step entirely.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="register-complete"
      num="06"
      color="var(--at-gold)"
      eyebrow="Step 4 — Complete registration"
      title="POST /users/actions/register/complete (challenged journeys only)"
      tone="surface"
    >
      <EdProse>
        Where the LFI issued a challenge, CAAP submits the end user&apos;s response via
        <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-complete" class="endpoint"><span class="http-method http-method--post">POST</span><code>/users/actions/register/complete</code></a>.
        The LFI verifies the response and returns
        <code>registrationStatus: Complete</code>. Registration is now finalised and CAAP proceeds to
        build the authorization page.
      </EdProse>

      <EdNote type="warning" title="Failed challenge responses are not HTTP errors">
        <p>
          Per the CAAP Operations spec, an incorrect challenge response MUST be returned as an HTTP
          200 with a result indicator in the payload &mdash; not as a 4xx. Reserve non-2xx status
          codes for genuine error conditions (malformed requests, internal failures).
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="build-auth-page"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 5 — Build the authorization page"
      title="Fetch the accounts or policies the end user can select from"
      tone="cream"
    >
      <EdProse>
        With the end user registered, CAAP retrieves the data needed to render the authorization page. The
        endpoint called depends on the consent type, and CAAP signals the use case via the
        <code>o3-caap-consent-use-case</code> header on the accounts endpoint.
      </EdProse>

      <EdProse>
        In all three cases, the LFI MUST return <strong>every</strong> item the end user can choose from &mdash;
        do not pre-filter to a subset. CAAP renders the full list and the end user picks from it on the
        authorization page.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Consent type</th>
              <th>CAAP calls</th>
              <th>LFI returns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Data Sharing</td>
              <td>
                <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a>
                with <code>o3-caap-consent-use-case: accounts</code>
              </td>
              <td>Every account the end user is permitted to share for data sharing.</td>
            </tr>
            <tr>
              <td>Bank Service Initiation</td>
              <td>
                <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a>
                with <code>o3-caap-consent-use-case: payments</code>
              </td>
              <td>Every account the end user is permitted to initiate the requested payment from.</td>
            </tr>
            <tr>
              <td>Insurance Data Sharing</td>
              <td>
                <a href="/tech/lfi-api-hub/v2.2-rc1/caap/open-api/employment-insurance-policies" class="endpoint"><span class="http-method http-method--get">GET</span><code>/{type}-insurance-policies</code></a>,
                once per insurance type in the consent permissions
              </td>
              <td>Every policy of that type the end user is permitted to share.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="authorize"
      num="08"
      color="var(--at-teal-deep)"
      eyebrow="Step 6 — Authorize and redirect"
      title="CAAP completes the journey on the API Hub"
      tone="surface"
    >
      <EdProse>
        CAAP renders the authorization page per the
        <a href="/tech/lfi-api-hub/v2.2-rc1/caap/user-experience#end-to-end">User Experience</a>
        (which shows the end-to-end end user journey screen by screen), displaying the consent details
        and the accounts or policies the end user can select. After the end user clicks
        <strong>Authorize</strong>, CAAP completes the journey in the same way an LFI-operated
        authorization server would &mdash; against the API Hub, not against the LFI:
      </EdProse>

      <EdBullets>
        <li>
          <strong>PATCH the consent.</strong> CAAP calls
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a>
          on the API Hub Consent Manager, setting status to <code>Authorized</code> and including the
          <code>psuIdentifiers.userId</code> returned by the LFI on <code>register/initialize</code>,
          plus either <code>accountIds</code> (Bank Data Sharing, Bank Service Initiation) or
          <code>insurancePolicyIds</code> (Insurance Data Sharing) for the items the end user selected.
        </li>
        <li>
          <strong>Complete the interaction.</strong> CAAP calls
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a>
          on Headless Heimdall, which issues a redirect back to the TPP&apos;s callback URI with the
          authorization <code>code</code> and <code>state</code>.
        </li>
        <li>
          <strong>Follow the redirect.</strong> CAAP forwards the redirect to the end user&apos;s browser,
          returning the end user to the TPP. The TPP exchanges the code for tokens on
          <a href="/tech/tpp-standards/security/tokens/open-api/token" class="endpoint"><span class="http-method http-method--post">POST</span><code>/token</code></a>
          and the consent is now <code>Authorized</code>.
        </li>
      </EdBullets>

      <EdNote type="info" title="The LFI is no longer on the path">
        <p>
          From this point onwards the consent is live and runtime data and payment calls flow through
          the API Hub to the LFI&apos;s Ozone Connect endpoints (<a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/">Bank Data Sharing</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/">Bank Service Initiation</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/">Insurance Data Sharing</a>) as normal.
          CAAP is not involved in those calls.
        </p>
      </EdNote>
    </EdSectionBand>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
@media (max-width: 720px) { .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; } }
</style>
