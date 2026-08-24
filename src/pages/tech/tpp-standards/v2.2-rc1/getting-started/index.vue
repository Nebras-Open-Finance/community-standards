<route lang="yaml">
meta:
  title: Getting Started for TPPs (Sandbox)
  isIndex: true
</route>

<script setup lang="ts">
import { useModelBankCredentials } from '@/components/common/composables/useModelBankCredentials'

const { currentVersion, currentCredentials: creds } = useModelBankCredentials()

interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/postman/postman_1_spotlight.png', import.meta.url).href, alt: 'Step 1', title: 'Import' },
  { src: new URL('/images/postman/post_spotlight.png', import.meta.url).href, alt: 'Step 2', title: 'Import' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/postman/postman_2_spotlight.png', import.meta.url).href, alt: 'Step 1', title: 'Settings' },
  { src: new URL('/images/postman/postman_3_spotlight.png', import.meta.url).href, alt: 'Step 2', title: 'Certificates' },
  { src: new URL('/images/postman/postman_4_spotlight.png', import.meta.url).href, alt: 'Step 3', title: 'Add Certificate' },
  { src: new URL('/images/postman/postman_5_spotlight.png', import.meta.url).href, alt: 'Step 3', title: 'Host, Client Transport CRT (.pem), Client Transport KEY (.key)' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/postman/first-flow-sip/1.png', import.meta.url).href, alt: 'Step 1', title: 'Navigate to Single Instant Payment → Auth Flow and send O3 Util: Prepare Encrypted PII' },
  { src: new URL('/images/postman/first-flow-sip/2.png', import.meta.url).href, alt: 'Step 2', title: 'Send O3 Util: Prepare Request Object JWT' },
  { src: new URL('/images/postman/first-flow-sip/3.png', import.meta.url).href, alt: 'Step 3', title: 'Send O3 Util: Prepare Private Key JWT' },
]

const images4: CarouselImage[] = [
  { src: new URL('/images/postman/first-flow-sip/4.png', import.meta.url).href, alt: 'Step 1', title: 'Send POST /par to stage the payment consent' },
  { src: new URL('/images/postman/first-flow-sip/5_spotlight.png', import.meta.url).href, alt: 'Step 2', title: 'Click Visualize to render the /par response as a redirect link' },
  { src: new URL('/images/postman/first-flow-sip/6.png', import.meta.url).href, alt: 'Step 3', title: 'Copy the link and open it in a browser to redirect the user to the LFI' },
]

const images5: CarouselImage[] = [
  { src: new URL('/images/postman/first-flow-sip/7.png', import.meta.url).href, alt: 'Step 1', title: 'Authenticate with the LFI' },
  { src: new URL('/images/postman/first-flow-sip/8.png', import.meta.url).href, alt: 'Step 2', title: 'Select the account to debit for the payment' },
  { src: new URL('/images/postman/first-flow-sip/9.png', import.meta.url).href, alt: 'Step 3', title: 'Authorize the payment consent' },
]

const images6: CarouselImage[] = [
  { src: new URL('/images/postman/first-flow-sip/10.png', import.meta.url).href, alt: 'Step 1', title: 'Copy the `code` parameter from the redirect URL' },
  { src: new URL('/images/postman/first-flow-sip/11.png', import.meta.url).href, alt: 'Step 2', title: 'Set the `authorizationCode` collection variable in Postman' },
  { src: new URL('/images/postman/first-flow-sip/12.png', import.meta.url).href, alt: 'Step 3', title: 'Send the token request to exchange the code for an access token' },
]

const images7: CarouselImage[] = [
  { src: new URL('/images/postman/first-flow-sip/13.png', import.meta.url).href, alt: 'Step 1', title: 'Navigate to the Payments folder and send O3 Util: Prepare Encrypted PII' },
  { src: new URL('/images/postman/first-flow-sip/14.png', import.meta.url).href, alt: 'Step 2', title: 'Send O3 Util: Prepare Request Object JWT for SIP' },
  { src: new URL('/images/postman/first-flow-sip/15.png', import.meta.url).href, alt: 'Step 3', title: 'Send POST /payments — a 201 confirms the payment was initiated' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Getting Started · Sandbox
        </div>
        <h1 class="ed-doc__title">
          Getting Started for TPPs (Sandbox)
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A guided walkthrough that takes you from a freshly onboarded sandbox application to a successful
          end-to-end payment, using the Postman collection and the included O3 sandbox utilities.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="Before you start"
      tone="cream"
    >
      <EdBullets>
        <li>
          You are onboarded to the sandbox Trust Framework. If not, see
          <a href="/tech/tpp-standards/trust-framework/onboarding">Trust Framework Onboarding</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="postman-collection"
      num="02"
      color="var(--at-gold)"
      eyebrow="Postman Collection (Sandbox)"
      title="Generate a personalised Postman script"
      tone="surface"
    >
      <EdProse>
        Fill in the values below using an Application (Client) you have created in the
        <strong>Sandbox Trust Framework</strong>.
      </EdProse>
      <TPPPostmanScriptBuilder />
    </EdSectionBand>

    <EdSectionBand
      id="setting-up-postman"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Setting Up Postman"
      title="Install, import, and configure mTLS"
      tone="cream"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Install Postman</h3>
          <EdProse>
            Download Postman from
            <a href="https://www.postman.com/downloads/">postman.com/downloads</a>. Launch Postman and
            sign in (or create a free account).
          </EdProse>
        </li>

        <li>
          <h3>Import the collection</h3>
          <EdBullets>
            <li>In Postman, click <strong>Import</strong> (top left).</li>
            <li>Select the downloaded <code>.json</code> file.</li>
            <li>The collection will appear in your Collections sidebar.</li>
          </EdBullets>
          <ClientOnly>
            <Carousel :images="images1" />
          </ClientOnly>
        </li>

        <li>
          <h3>Configure mTLS certificates in Postman</h3>
          <EdBullets>
            <li>Open Postman settings: gear icon (top right) &rarr; <strong>Settings</strong> &rarr; <strong>Certificates</strong> tab.</li>
            <li>Click <strong>Add Certificate</strong>.</li>
            <li>
              Enter the host of the LFI Discovery URL, e.g. <code>*.altareq1.sandbox.apihub.openfinance.ae</code>
              or <code>*.[LFI CODE].preprod.apihub.openfinance.ae</code>. Leave port blank (defaults to 443).
            </li>
            <li>Attach <strong>CRT</strong>: <code>client_transport.pem</code>.</li>
            <li>Attach <strong>KEY</strong>: <code>client_transport.key</code>.</li>
            <li>Save the certificate entry.</li>
          </EdBullets>

          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>

          <h4>Test by registering</h4>
          <EdProse>
            Send a request to the TPP's registration endpoint. A <code>204 (No Content)</code> response
            confirms the certificate is correctly attached.
          </EdProse>

          <ImageViewer
            src="/images/postman/register_spotlight.png"
            alt="Postman Registration Request"
          />

          <EdProse class="ed-doc__note">
            <em>Note: if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host
            in the Add Certificate step.</em>
          </EdProse>
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="first-requests"
      num="04"
      color="var(--at-navy)"
      eyebrow="Your First Open Finance Requests"
      title="An end-to-end Single Instant Payment in the sandbox"
      tone="surface"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Prepare the requests for /par</h3>
          <EdProse>
            Navigate to the <strong>Auth Flow</strong> folder within <strong>Single Instant Payment</strong>
            and run the three
            <a href="/tech/tpp-standards/security/fapi/o3-utils">O3 utility requests</a> in order:
          </EdProse>
          <ol class="ed-doc__substeps">
            <li>Send <strong>O3 Util: Prepare Encrypted PII</strong> &mdash; encrypts the <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/">PII payload</a> required for the consent.</li>
            <li>Send <strong>O3 Util: Prepare Request Object JWT</strong> &mdash; builds the <a href="/tech/tpp-standards/security/fapi/request-jwt">signed request object</a> for the <code>/par</code> call.</li>
            <li>Send <strong>O3 Util: Prepare Private Key JWT</strong> &mdash; creates the client assertion used for authentication.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images3" />
          </ClientOnly>
        </li>

        <li>
          <h3>Stage the consent and redirect to the LFI</h3>
          <ol class="ed-doc__substeps">
            <li>Send the <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/par" class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></a> request to stage the payment consent.</li>
            <li>Click <strong>Visualize</strong> in the Postman response panel &mdash; this renders the response as a clickable redirect link.</li>
            <li>Copy the link and open it in a browser to start the authorization redirect to the LFI.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images4" />
          </ClientOnly>
        </li>

        <li>
          <h3>Authenticate and authorize</h3>
          <ol class="ed-doc__substeps">
            <li>Authenticate with the LFI.</li>
          </ol>

          <EdNote v-if="creds" type="tip" :title="`Model Bank Credentials (${currentVersion})`">
            <p>
              If you are using the <a href="/tech/tpp-standards/sandbox/model-bank">Model Bank</a>, the
              sandbox credentials are:
            </p>
            <table class="ed-doc__creds">
              <thead><tr><th>Username</th><th>Password</th></tr></thead>
              <tbody>
                <tr>
                  <td><code>{{ creds.username }}</code></td>
                  <td><code>{{ creds.password }}</code></td>
                </tr>
              </tbody>
            </table>
          </EdNote>

          <ol class="ed-doc__substeps" start="2">
            <li>Select the account to debit and authorize the payment consent.</li>
          </ol>

          <ClientOnly>
            <Carousel :images="images5" />
          </ClientOnly>
        </li>

        <li>
          <h3>Exchange the authorization code for a token</h3>
          <EdProse>
            After the LFI redirects back to your <code>redirect_uri</code>, the URL will contain a
            <code>code</code> query parameter.
          </EdProse>
          <ol class="ed-doc__substeps">
            <li>Copy the <code>code</code> value from the redirect URL.</li>
            <li>Set it as the <code>authorizationCode</code> <a href="/tech/tpp-standards/security/tokens/">collection variable</a> in Postman.</li>
            <li>Send the <strong>token request</strong> to exchange the code for an access token.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images6" />
          </ClientOnly>
        </li>

        <li>
          <h3>Initiate the payment</h3>
          <EdProse>
            Navigate to the <strong>Payments</strong> folder and run the O3 utility requests, then submit
            the payment:
          </EdProse>
          <ol class="ed-doc__substeps">
            <li>Send <strong>O3 Util: Prepare Encrypted PII</strong> &mdash; encrypts the <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/">payment PII</a>.</li>
            <li>Send <strong>O3 Util: Prepare Request Object JWT for SIP</strong> &mdash; builds the signed request object for the payment.</li>
            <li>Send <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>.</li>
          </ol>
          <EdProse>A <code>201</code> response confirms the payment was successfully initiated.</EdProse>
          <ClientOnly>
            <Carousel :images="images7" />
          </ClientOnly>
        </li>

        <li>
          <h3>Retrieve the Payment ID and status</h3>
          <EdProse>
            Decode the <a href="/knowledge-base/articles/jwt-claims">JWT</a> received in the
            <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> response to retrieve the <code>PaymentId</code> and
            <code>Status</code>. The status will typically start as <code>Pending</code>.
          </EdProse>
          <ImageViewer
            src="/images/postman/first-flow-sip/16.png"
            alt="Decoded payment response JWT showing PaymentId and Status"
          />
        </li>
      </ol>
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

/* Numbered top-level steps within a section band — ordered list with a
   square mono badge instead of the default decimal marker. */
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
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0.25rem 0 1rem;
  line-height: 1.25;
}
.ed-doc__steps > li > h4 {
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 1.5rem 0 0.5rem;
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
.ed-doc__substeps :deep(code),
.ed-doc__substeps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__substeps :deep(strong),
.ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__substeps :deep(a),
.ed-doc__substeps a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__creds {
  border-collapse: collapse;
  margin: 0.5rem 0;
  font-family: var(--at-sans);
}
.ed-doc__creds th,
.ed-doc__creds td {
  border: 1px solid var(--at-grid-line);
  padding: 0.5rem 0.85rem;
  font-size: 0.92rem;
}
.ed-doc__creds th {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
}
.ed-doc__creds code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  color: var(--at-navy-deep);
}

.ed-doc__note { font-size: 0.92rem; color: var(--at-mute); margin-top: 1rem; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
}
</style>
