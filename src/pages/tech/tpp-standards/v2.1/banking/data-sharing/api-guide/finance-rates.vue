<route lang="yaml">
meta:
  title: Bank Data Sharing — Encrypted FinanceRates
</route>

<script setup lang="ts">
const exampleCleartextResponse = `{
  "Data": {
    "Product": [
      {
        "AccountId": "acc-001",
        "ProductId": "credit-card-platinum",
        "ProductType": "CreditCard",
        "ProductName": "Platinum Credit Card",
        "FinanceRates": {
          "ProductFinanceRateProperties": [
            {
              "RateType": "PurchaseAPR",
              "Rate": "21.99",
              "RateApplication": "OnOutstandingBalance"
            }
          ]
        }
      }
    ]
  },
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/product"
  },
  "Meta": { "TotalPages": 1 }
}
`

const exampleEncryptedResponse = `{
  "Data": {
    "Product": [
      {
        "AccountId": "acc-001",
        "ProductId": "credit-card-platinum",
        "ProductType": "CreditCard",
        "ProductName": "Platinum Credit Card",
        "FinanceRates": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIiwicDJzIjoiNGtBWG..."
      }
    ]
  },
  "Links": {
    "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/product"
  },
  "Meta": { "TotalPages": 1 }
}
`

const step1Node = `import crypto from 'node:crypto'

const productResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts/\${accountId}/product\`,
  {
    headers: {
      Authorization:                \`Bearer \${access_token}\`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Product } } = await productResponse.json()
const product = Product[0]
`

const step1Python = `import uuid, httpx

product_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}/product",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,
        "x-fapi-customer-ip-address":   customer_ip_address,
    },
    # cert=("transport.crt", "transport.key"),
)

product = product_response.json()["Data"]["Product"][0]
`

const step2Node = `// FinanceRates is anyOf { object | string } per the OpenAPI spec.
// A string value is a compact JWE that must be decrypted on the user's device.
const financeRates = product.FinanceRates
const isEncrypted  = typeof financeRates === 'string'

if (isEncrypted) {
  // Forward the opaque JWE to the browser. Do not parse, log, or persist it.
  return res.json({ accountId, productId: product.ProductId, financeRatesJwe: financeRates })
}

// Cleartext path — render the rates directly from the structured object
return res.json({ accountId, productId: product.ProductId, financeRates })
`

const step2Python = `# FinanceRates is anyOf { object | string } per the OpenAPI spec.
# A string value is a compact JWE that must be decrypted on the user's device.
finance_rates = product.get("FinanceRates")
is_encrypted  = isinstance(finance_rates, str)

if is_encrypted:
    # Forward the opaque JWE to the browser. Do not parse, log, or persist it.
    return {
        "accountId":       account_id,
        "productId":       product["ProductId"],
        "financeRatesJwe": finance_rates,
    }

# Cleartext path — render the rates directly from the structured object
return {
    "accountId":    account_id,
    "productId":    product["ProductId"],
    "financeRates": finance_rates,
}
`

const smsExample = `ALTAREQ BANK: You requested your Platinum Credit Card finance rate via BudgetBuddy. Your code is 482915. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`

const step4Browser = `<!-- Run inside the user's browser. The OTP and the decrypted rate
     MUST NOT be transmitted back to your servers. -->
<script type="module">
  import { compactDecrypt } from 'https://esm.sh/jose@5'

  const form  = document.getElementById('otp-form')
  const input = document.getElementById('otp')
  const out   = document.getElementById('finance-rates')

  // financeRatesJwe was injected into the page by the server in Step 2
  const jwe = window.__FINANCE_RATES_JWE__

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const otp = input.value.trim()

    try {
      const { plaintext } = await compactDecrypt(
        jwe,
        new TextEncoder().encode(otp),
      )
      const rates = JSON.parse(new TextDecoder().decode(plaintext))
      renderRates(rates, out)
    } catch (err) {
      // PBES2 decryption failure → wrong OTP. An expired JWE still decrypts;
      // the TPP enforces the 30-minute window via the exp claim (see Step 5).
      showError('That code did not work. Request a new one and try again.')
    }
  })
<\/script>
`

const step5DisplayNode = `// The JWE carries a 30-minute exp claim. Decryption still works past that
// point — the TPP MUST NOT display the rate once exp has passed. Track the
// expiry on the client so the UI can prompt for a fresh request proactively.
//
// You can pass the issuance time alongside the JWE when you serve the page —
// the JWE itself does not carry a parseable claim because it is opaque to the
// TPP server. The 30-minute window is a normative LFI rule, not a value you
// negotiate.
const JWE_TTL_MS = 30 * 60 * 1000
const expiresAt  = issuedAt + JWE_TTL_MS

if (Date.now() >= expiresAt) {
  // Re-fetch GET /accounts/{AccountId}/product to obtain a fresh JWE
  // (and a fresh OTP sent to the user's device). Honour the rate limit.
}
`

const step5DisplayPython = `# The JWE carries a 30-minute exp claim. Decryption still works past that
# point — the TPP MUST NOT display the rate once exp has passed. Track the
# expiry on the client so the UI can prompt for a fresh request proactively.
JWE_TTL_SECONDS = 30 * 60
expires_at = issued_at + JWE_TTL_SECONDS

if time.time() >= expires_at:
    # Re-fetch GET /accounts/{AccountId}/product to obtain a fresh JWE
    # (and a fresh OTP sent to the user's device). Honour the rate limit.
    pass
`

const step1Tabs        = [{ label: 'Node.js', lang: 'typescript', code: step1Node },        { label: 'Python', lang: 'python', code: step1Python }] as const
const step2Tabs        = [{ label: 'Node.js', lang: 'typescript', code: step2Node },        { label: 'Python', lang: 'python', code: step2Python }] as const
const step5DisplayTabs = [{ label: 'Node.js', lang: 'typescript', code: step5DisplayNode }, { label: 'Python', lang: 'python', code: step5DisplayPython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Banking &middot; Bank Data Sharing &middot; API Guide
        </div>
        <h1 class="ed-doc__title">
          Encrypted FinanceRates
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a TPP holds the <code>ReadProductFinanceRates</code> permission and calls
          <code>GET /accounts/{AccountId}/product</code> for a credit card, finance, or mortgage
          account, the LFI MAY return the <code>FinanceRates</code> field as an encrypted JWE rather
          than a structured object. The TPP MUST present the rates to the customer without the
          unencrypted values ever reaching or being stored on its servers &mdash; decryption happens
          locally on the user's device using a one-time code sent to the customer by the LFI.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="when-this-applies"
      num="01"
      color="var(--at-teal)"
      eyebrow="When this applies"
      title="Encrypted finance rates are an LFI-side choice"
      tone="cream"
    >
      <EdProse>
        The <code>FinanceRates</code> field on
        <a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-products">
        <code>GET /accounts/{AccountId}/product</code></a> is defined as <code>anyOf</code> a
        structured <code>AEProductFinanceRates</code> object or an <code>AEJwe</code> compact string.
        Each LFI decides, per product, whether to return the rate in cleartext or as an encrypted
        JWE. A TPP holding <code>ReadProductFinanceRates</code> MUST therefore be ready for either
        shape on every call.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Cleartext</strong> &mdash; <code>FinanceRates</code> is a JSON object. Render the
          rates directly. No special handling required.
        </li>
        <li>
          <strong>Encrypted (JWE)</strong> &mdash; <code>FinanceRates</code> is a compact JWE string.
          The TPP server MUST forward this opaque string to the user's device without inspecting,
          logging, or persisting it. Decryption happens in the browser using a one-time code the
          LFI sends to the customer.
        </li>
      </EdBullets>

      <EdNote type="info" title="Why both shapes exist">
        <p>
          Some LFIs treat product finance rates as commercially sensitive and require an additional
          customer-present authentication step before the rate can be revealed. The encrypted JWE
          shape lets the rate flow through the TPP to the customer's screen without the TPP ever
          holding the cleartext value.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="prerequisites"
      num="02"
      color="var(--at-gold)"
      eyebrow="Prerequisites"
      title="What you need before calling this endpoint"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>A consent that includes <code>ReadProductFinanceRates</code></strong> &mdash; this
          permission MUST be requested in the <code>authorization_details</code> when the TPP creates
          the consent. See
          <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide#step-1-authorization-details">
          Step 1 &mdash; Constructing Authorization Details</a>.
        </li>
        <li>
          <strong>The <em>Access Encrypted Resource Data</em> optional certification</strong>
          &mdash; before requesting <code>ReadProductFinanceRates</code> on a live LFI, the TPP MUST
          hold this certification with Nebras. See
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a>.
        </li>
        <li>
          <strong>A valid access token and the same FAPI headers used elsewhere</strong> &mdash;
          <code>x-fapi-interaction-id</code>, <code>x-fapi-auth-date</code>, and
          <code>x-fapi-customer-ip-address</code>. See
          <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-call-product"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — GET /accounts/{AccountId}/product"
      title="Call the product endpoint as normal"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{AccountId}/product</code>
      </div>

      <EdProse>
        Whether the LFI returns cleartext or an encrypted JWE, the request itself is unchanged. Make
        the call as you would for any other Bank Data Sharing endpoint:
      </EdProse>

      <EdCodeGroup :tabs="step1Tabs" />

      <h3 class="ed-doc__subhead">Example response &mdash; cleartext</h3>
      <EdCode :code="exampleCleartextResponse" lang="json" filename="cleartext FinanceRates" />

      <h3 class="ed-doc__subhead">Example response &mdash; encrypted JWE</h3>
      <EdCode :code="exampleEncryptedResponse" lang="json" filename="encrypted FinanceRates" />

      <EdProse>
        Apart from <code>FinanceRates</code>, every other field in the response is returned in
        cleartext in both shapes &mdash; <code>Charges</code>, <code>DepositRates</code>,
        <code>ProductName</code>, <code>Tenor</code>, and so on. Only <code>FinanceRates</code> is
        ever encrypted.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-detect-jwe"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 — Detect the response shape"
      title="Branch on whether FinanceRates is a string"
      tone="surface"
    >
      <EdProse>
        If <code>FinanceRates</code> is a JSON object, render its <code>ProductFinanceRateProperties</code>
        directly. If it is a string, treat it as an opaque compact JWE and forward it to the
        customer's browser. The TPP server MUST NOT attempt to decrypt the JWE, parse its header
        beyond detecting the string type, log its contents, or persist it.
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />

      <EdNote type="warning" title="Forward, do not store">
        <p>
          The encrypted JWE is opaque to the TPP. Pass it through to the browser response and
          discard the server-side copy as soon as the response is sent. Do not write the JWE to
          application logs, request traces, or analytics pipelines &mdash; even though it is
          encrypted, persisting it would put the TPP in scope of the encrypted-rate handling
          requirements documented in
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-3-prompt-otp"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — Prompt the customer for the one-time code"
      title="Render an OTP input on the user's device"
      tone="cream"
    >
      <EdProse>
        When the LFI returns an encrypted <code>FinanceRates</code>, it also sends a one-time code
        to the customer directly, through a channel the LFI controls &mdash; an SMS, an email, or a
        push notification in the LFI's banking app. The TPP MUST display an input field where the
        customer can type that code, and a short explanation that matches the wording shown to the
        customer on the consent screen (&ldquo;Your bank has sent you a one-time code &mdash; enter
        it below to see your finance rate&rdquo;).
      </EdProse>

      <ImageViewer
        src="/images/user-experience/read-finance-rates/image.webp"
        alt="Read FinanceRates user journey — consent, redirection to LFI, authentication, and the final TPP screen prompting for a one-time code"
      />

      <h3 class="ed-doc__subhead">What the customer receives</h3>
      <EdProse>
        The LFI sends the code to the customer directly &mdash; the TPP never sees it. The message
        names the product, names your <code>TradingName</code> so the customer can tie it back to
        your application, and carries a 30-minute validity. Knowing the shape of the message helps
        you word your own prompt consistently with what the customer is reading on their phone:
      </EdProse>
      <EdCode :code="smsExample" lang="text" filename="example SMS — as the customer receives it" />

      <EdBullets>
        <li>
          <strong>Customer-present only</strong> &mdash; this flow only works when the customer is
          actively using the TPP. Do not call <code>GET /accounts/{AccountId}/product</code> on a
          schedule when you require the encrypted rate; there is no way to decrypt the JWE without
          the customer entering the OTP.
        </li>
        <li>
          <strong>Display the rate types you are about to reveal</strong> &mdash; tell the customer
          which product the OTP unlocks (for example, &ldquo;Platinum Credit Card &mdash; purchase
          APR&rdquo;).
        </li>
        <li>
          <strong>Offer to resend</strong> &mdash; if the customer does not receive the code, the TPP
          may re-call <code>GET /accounts/{AccountId}/product</code> to ask the LFI to issue a fresh
          code. Respect the rate limits described in
          <a href="#rate-limits">Step 6 &mdash; Rate limits and retries</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-decrypt-browser"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 4 — Decrypt locally in the browser"
      title="Use the OTP as the PBES2 password"
      tone="surface"
    >
      <EdProse>
        The JWE is encrypted with <strong>PBES2-HS512+A256KW</strong> for key wrapping and
        <strong>A256GCM</strong> for content encryption. The customer's one-time code is the PBES2
        password; the JWE header carries the salt and iteration count, so the TPP does not need any
        additional material to decrypt.
      </EdProse>

      <EdProse>
        Decryption MUST run on the customer's device &mdash; the OTP and the decrypted rate MUST
        NOT be sent to the TPP server. Use a JOSE library loaded directly into the page, and bind
        the form submit to a local handler:
      </EdProse>

      <EdCode :code="step4Browser" lang="html" filename="OTP form &amp; decrypt &mdash; runs in the browser" />

      <EdNote type="danger" title="Never round-trip the OTP">
        <p>
          The OTP MUST be consumed in the browser. Do not POST it to your server for &ldquo;server-side
          decryption&rdquo;, do not include it in analytics events, and do not echo it back into a
          form field that submits to your domain. The same rule applies to the decrypted
          <code>FinanceRates</code> object: keep it inside the page's JavaScript scope, render it
          into the DOM, and discard it when the customer navigates away.
        </p>
      </EdNote>

      <EdNote type="tip" title="Python equivalents exist but are out of scope here">
        <p>
          <code>jose</code> (Node.js, browser) and <code>jwcrypto</code> (Python) both support
          PBES2 JWE. However, decryption MUST happen on the user's device, which in practice means
          JavaScript loaded into the customer's browser or a native mobile SDK. Server-side
          Python/Node code paths are not appropriate for this step.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-5-display-window"
      num="07"
      color="var(--at-gold)"
      eyebrow="Step 5 — Display until the JWE expires"
      title="The 30-minute display window"
      tone="cream"
    >
      <EdProse>
        The JWE carries a fixed 30-minute lifetime as an <code>exp</code> claim inside its
        plaintext, set by the LFI. Within that window the TPP MAY re-decrypt and re-render the rate
        as the customer navigates between screens, provided the OTP is still held in browser
        memory.
      </EdProse>

      <EdProse>
        Decryption does not stop working when the window closes &mdash; a JWE and its OTP can
        technically be decrypted at any later time, so the 30-minute limit is not enforced by the
        cryptography. The TPP MUST enforce it: after decrypting, the TPP MUST read the
        <code>exp</code> claim from the plaintext and MUST NOT display the rate, or re-decrypt it
        for display, once <code>exp</code> has passed. This obligation is part of the TPP's
        <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
        Access Encrypted Resource Data</a> certification.
      </EdProse>

      <EdCodeGroup :tabs="step5DisplayTabs" />

      <EdNote type="warning" title="Expiry is a TPP obligation, not a cryptographic guarantee">
        <p>
          The OTP keeps working after 30 minutes &mdash; nothing in the JWE itself prevents a late
          decryption. The window is held closed only by the TPP checking <code>exp</code> and by
          the certification commitments the TPP makes to Nebras. Treating <code>exp</code> as
          advisory, or relying on decryption to &ldquo;just fail&rdquo;, is a certification breach.
        </p>
      </EdNote>

      <EdProse>
        When the window closes mid-session, prompt the customer to request a fresh code via a new
        call to <code>GET /accounts/{AccountId}/product</code> rather than continuing to show a
        stale rate. The customer's consent is unaffected &mdash; only the 30-minute display window
        has expired.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rate-limits"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 6 — Rate limits and retries"
      title="LFI-enforced caps on encrypted-rate requests"
      tone="surface"
    >
      <EdProse>
        Each call to <code>GET /accounts/{AccountId}/product</code> that returns an encrypted
        <code>FinanceRates</code> triggers a fresh OTP to the customer. LFIs MUST rate-limit these
        requests per consent to prevent OTP spam, while leaving enough headroom for legitimate
        retries (a code not received, a typo, an expired window).
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Rule</th><th>Limit</th><th>Rationale</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Minimum interval between requests</td>
              <td><strong>60 seconds</strong> per consent per account</td>
              <td>Lets the customer ask for a fresh OTP if the first code is delayed, without enabling rapid-fire spam.</td>
            </tr>
            <tr>
              <td>Daily cap</td>
              <td><strong>12 fresh OTPs</strong> per consent per account per rolling 24 hours</td>
              <td>Covers retries and repeated re-display across the day, and acts as a backstop against runaway message volume rather than a limit normal traffic should approach.</td>
            </tr>
            <tr>
              <td>Decryption attempts</td>
              <td>Unbounded within the 30-minute window of a single JWE</td>
              <td>Re-decrypting an already-issued JWE in the customer's browser does not contact the LFI and so is not rate-limited.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Handling the 429 response</h3>
      <EdProse>
        When either limit is breached, the LFI rejects the entire
        <code>GET /accounts/{AccountId}/product</code> request with <code>429 Too Many Requests</code>.
        The API Hub forwards the response unchanged, so the TPP receives the same status and
        headers the LFI emitted &mdash; HTTP <code>429</code>, no response body, a
        <code>Retry-After</code> header containing the integer seconds until the next call would
        succeed, and the echoed <code>x-fapi-interaction-id</code> for correlation.
      </EdProse>

      <EdCode lang="http" filename="429 response &mdash; as the TPP receives it" :code="`HTTP/1.1 429 Too Many Requests\nRetry-After: 60\nx-fapi-interaction-id: 7c9e6679-7425-40de-944b-e07fc1f90ae7\n`" />

      <EdBullets>
        <li>
          Read <code>Retry-After</code> and surface a customer-facing message that includes the
          wait &mdash; "Please wait about a minute and try again" for short waits, "You've reached
          today's limit for viewing this rate &mdash; please try again later" when the daily cap
          is the cause.
        </li>
        <li>
          Do not auto-retry inside the wait window. The LFI will reject again and the customer
          will receive another code request that cannot succeed.
        </li>
        <li>
          A <code>429</code> never means the consent is invalid &mdash; it means too many fresh
          OTPs have been requested in too short a window. Other Data Sharing endpoints continue
          to work normally for this consent during the wait.
        </li>
      </EdBullets>

      <EdNote type="warning" title="Distinguish 429 from permission absence">
        <p>
          If the TPP did not request <code>ReadProductFinanceRates</code> on the consent, the
          response is a normal <code>200</code> with the <code>FinanceRates</code> field simply
          absent from the <code>Product</code> object &mdash; not a <code>429</code>, not a
          <code>403</code>. Treat these as two distinct conditions in your UI: permission-not-granted
          should prompt the customer to grant the permission on a new consent; <code>429</code>
          should prompt them to wait.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="tpp-responsibilities"
      num="09"
      color="var(--at-navy)"
      eyebrow="TPP responsibilities"
      title="Normative rules for handling encrypted FinanceRates"
      tone="cream"
    >
      <EdBullets>
        <li>
          The TPP MUST NOT transmit, store, log, or otherwise process the unencrypted
          <code>FinanceRates</code> on its servers in any form or capacity. The decrypted value
          lives only in the customer's browser session.
        </li>
        <li>
          The TPP MUST perform all decryption of <code>FinanceRates</code> locally on the user's
          device, solely for the purpose of displaying the rate to the customer.
        </li>
        <li>
          The TPP MUST NOT interact with the encrypted or unencrypted <code>FinanceRates</code> in
          any manner other than as described in this guide.
        </li>
        <li>
          The TPP MUST submit its architectural plan for decryption and display of
          <code>FinanceRates</code> &mdash; including the relevant browser-side source &mdash; to
          Nebras for inspection and approval as part of the
          <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data">
          Access Encrypted Resource Data</a> certification. Material changes to that process post
          go-live require Nebras sign-off before they are deployed.
        </li>
        <li>
          The TPP MUST present the decrypted rate accurately and in context &mdash; for example,
          labelling a credit card APR as &ldquo;purchase APR&rdquo; rather than &ldquo;interest
          rate&rdquo; &mdash; so the customer sees the rate faithfully as the LFI provided it.
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
