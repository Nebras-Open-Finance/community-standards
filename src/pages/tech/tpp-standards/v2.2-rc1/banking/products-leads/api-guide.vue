<route lang="yaml">
meta:
  title: Products & Leads — API Guide
</route>

<script setup lang="ts">
const tokenLoopNode = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!

// lfis — list of { lfiId, issuer, tokenEndpoint } from the Trust Framework Directory
const tokens = await Promise.all(
  lfis.map(async lfi => {
    const clientAssertion = await signJWT({
      iss: CLIENT_ID,
      sub: CLIENT_ID,
      aud: lfi.issuer,
      jti: crypto.randomUUID(),
    })

    const res = await fetch(lfi.tokenEndpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:            'client_credentials',
        scope:                 'products',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion:      clientAssertion,
      }).toString(),
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    })

    const { access_token } = await res.json()
    return { lfiId: lfi.lfiId, apiBase: lfi.apiBase, access_token }
  })
)
`

const tokenLoopPython = `import httpx, uuid, asyncio
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]

# lfis — list of { lfi_id, issuer, token_endpoint, api_base } from the Trust Framework Directory
async def fetch_token(client, lfi):
    client_assertion = sign_jwt({
        "iss": CLIENT_ID,
        "sub": CLIENT_ID,
        "aud": lfi["issuer"],
        "jti": str(uuid.uuid4()),
    })
    res = await client.post(
        lfi["token_endpoint"],
        data={
            "grant_type":            "client_credentials",
            "scope":                 "products",
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion":      client_assertion,
        },
    )
    return { **lfi, "access_token": res.json()["access_token"] }

async def get_tokens(lfis):
    async with httpx.AsyncClient() as client:
        return await asyncio.gather(*[fetch_token(client, lfi) for lfi in lfis])
`

const productsNode = `import crypto from 'node:crypto'

// tokens — output from Steps 1 & 2: [{ lfiId, apiBase, access_token }]
const results = await Promise.all(
  tokens.map(lfi =>
    fetch(\`\${lfi.apiBase}/open-finance/product/v2.2/products\`, {
      headers: {
        'Authorization':              \`Bearer \${lfi.access_token}\`,
        'x-fapi-interaction-id':      crypto.randomUUID(),
        'x-fapi-customer-ip-address': customerIpAddress,
      },
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    }).then(r => r.json())
  )
)

// Flatten all LFI product lists into a single array for display
const allProducts = results.flatMap(r => r.Data ?? [])
`

const productsPython = `import httpx, uuid, asyncio

# tokens — output from Steps 1 & 2: [{ lfi_id, api_base, access_token }]
async def fetch_products(client, lfi):
    res = await client.get(
        f"{lfi['api_base']}/open-finance/product/v2.2/products",
        headers={
            "Authorization":              f"Bearer {lfi['access_token']}",
            "x-fapi-interaction-id":      str(uuid.uuid4()),
            "x-fapi-customer-ip-address": customer_ip_address,
        },
    )
    return res.json()

async def get_all_products(tokens):
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*[fetch_products(client, lfi) for lfi in tokens])
    # Flatten all LFI product lists into a single array for display
    return [item for r in results for item in (r.get("Data") or [])]
`

const productsResponse = `{
  "Data": [
    {
      "LFIId": "ADCB",
      "LFIBrandId": "ADCB",
      "Products": [
        {
          "ProductId": "SAV-001",
          "ProductName": "Personal Savings Account",
          "ProductCategory": "SavingsAccount",
          "IsShariaCompliant": false,
          "Description": "An everyday savings account with competitive rates.",
          "DenominationCurrency": "AED",
          "ApplicationUri": "https://www.adcb.com/apply/savings",
          "KfsUri": "https://www.adcb.com/docs/savings-kfs.pdf",
          "Eligibility": {
            "ResidenceStatus": ["UaeResident"],
            "CustomerType": ["Retail"],
            "Age": [{ "Type": "MinimumAge", "Value": 18 }]
          }
        },
        {
          "ProductId": "SAV-002",
          "ProductName": "Al Hilal Savings",
          "ProductCategory": "SavingsAccount",
          "IsShariaCompliant": true,
          "ShariaStructure": "Murabaha",
          "AlternativeBrandName": "Al Hilal Savings",
          "Description": "A Sharia-compliant savings account.",
          "DenominationCurrency": "AED"
        }
      ]
    }
  ],
  "Links": { "Self": "https://api.lfi.ae/open-finance/product/v2.2/products" },
  "Meta": { "TotalPages": 1 }
}
`

const leadNode = `import crypto from 'node:crypto'

const leadResponse = await fetch(
  \`\${API_BASE}/open-finance/product/v2.2/leads\`,
  {
    method:  'POST',
    headers: {
      'Authorization':              \`Bearer \${access_token}\`,
      'Content-Type':               'application/json',
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    body: JSON.stringify({
      Data: {
        Email:             'user@example.com',
        EmiratesId:        '784-1990-1234567-1',
        PhoneNumber:       '+971501234567',
        MarketingOptOut:   false,
        ProductCategories: ['SavingsAccount'],
        Name: {
          GivenName: 'Ibrahim',
          LastName:  'Al Suwaidi',
        },
      },
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { LeadId } } = await leadResponse.json()  // HTTP 201
`

const leadPython = `import httpx, uuid, os

lead_response = httpx.post(
    f"{api_base}/open-finance/product/v2.2/leads",
    headers={
        "Authorization":              f"Bearer {access_token}",
        "Content-Type":               "application/json",
        "x-fapi-interaction-id":      str(uuid.uuid4()),
        "x-fapi-customer-ip-address": customer_ip_address,
    },
    json={
        "Data": {
            "Email":             "user@example.com",
            "EmiratesId":        "784-1990-1234567-1",
            "PhoneNumber":       "+971501234567",
            "MarketingOptOut":   False,
            "ProductCategories": ["SavingsAccount"],
            "Name": {
                "GivenName": "Ibrahim",
                "LastName":  "Al Suwaidi",
            },
        },
    },
    # cert=("transport.crt", "transport.key"),
)

lead_id = lead_response.json()["Data"]["LeadId"]  # HTTP 201
`

const tokenLoopTabs = [
  { label: 'Node.js', lang: 'typescript', code: tokenLoopNode },
  { label: 'Python',  lang: 'python',     code: tokenLoopPython },
] as const

const productsTabs = [
  { label: 'Node.js', lang: 'typescript', code: productsNode },
  { label: 'Python',  lang: 'python',     code: productsPython },
] as const

const leadTabs = [
  { label: 'Node.js', lang: 'typescript', code: leadNode },
  { label: 'Python',  lang: 'python',     code: leadPython },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Products &amp; Leads
        </div>
        <h1 class="ed-doc__title">
          Products &amp; Leads &mdash; API Guide
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Products &amp; Leads API lets a TPP retrieve publicly available banking products from
          participating LFIs and present them to a user. Products are fetched from each LFI individually
          and aggregated for display. No user consent or redirect is required &mdash; the TPP authenticates
          directly with a client credentials grant.
        </p>
        <p class="ed-doc__lede">
          Once the user selects a product they have two options: <strong>Apply Now</strong>, which directs
          them to the LFI using whichever application channel the LFI has configured, or <strong>Request
          contact from bank</strong>, which submits a lead to the LFI on the user's behalf.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before calling the Products & Leads API"
      tone="cream"
    >
      <EdProse>Before calling the Products &amp; Leads API, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BDSP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework to
          establish secure <strong>mTLS communication</strong>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Signing Certificate</a></strong>
          &mdash; an active signing certificate must be issued and registered in the Trust Framework for
          client authentication.
        </li>
        <li>
          <strong>Understanding of <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a></strong>
          &mdash; you should understand how client authentication works with <code>private_key_jwt</code>
          before calling the token endpoint.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Products & Leads"
      tone="surface"
    >
      <APIFlowViewer title="Products & Leads API Flow">
        <APIFlowsProductsLeads />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="steps-1-2-token-per-lfi"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Steps 1 & 2 — Token request per LFI (in parallel)"
      title="Get an access token from every LFI you intend to query"
      tone="cream"
    >
      <EdProse>
        Each LFI has its own authorisation server, so the TPP must obtain a separate access token for
        every LFI it intends to query. Because the token endpoint and <code>aud</code> claim differ per
        LFI, a new client assertion must also be built for each one.
      </EdProse>

      <EdProse>
        These calls should all be made in parallel &mdash; do not wait for one LFI's token before
        requesting the next.
      </EdProse>

      <EdCodeGroup :tabs="tokenLoopTabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the
        full claims reference.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-3-get-products"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 3 — GET /products per LFI (in parallel)"
      title="Aggregate the LFI catalogues for display"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/products</code>
      </div>

      <EdProse>
        With a token for each LFI, call <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/products</code></span> for all of them simultaneously.
        Aggregate the results into a single list before presenting them to the user.
      </EdProse>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> and <code>x-fapi-customer-ip-address</code> on every
        request. The <code>x-fapi-customer-ip-address</code> header is required because
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/products</code></span> can only be called while a customer is in a live session with the
        TPP. See <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdProse>
        Each LFI's <code>apiBase</code> is its API Hub resource server &mdash;
        <code>https://rs1.&lt;lfiCode&gt;.apihub.openfinance.ae</code> (production) or
        <code>https://rs1.&lt;lfiCode&gt;.sandbox.apihub.openfinance.ae</code> (sandbox). Resolve the
        <code>&lt;lfiCode&gt;</code> from the
        <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework Directory</a>. See
        <a href="/tech/tpp-standards/trust-framework/api-resources">API Resources</a> for the full
        endpoint format.
      </EdProse>

      <h3 class="ed-doc__subhead">Query parameters</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ProductCategory</code></td>
              <td>string</td>
              <td>Filter by category &mdash; <code>SavingsAccount</code>, <code>CurrentAccount</code>, <code>CreditCard</code>, <code>Finance</code>, or <code>Mortgage</code></td>
            </tr>
            <tr>
              <td><code>IsShariaCompliant</code></td>
              <td>boolean</td>
              <td>Filter to Sharia-compliant products only</td>
            </tr>
            <tr>
              <td><code>LastUpdatedDateTime</code></td>
              <td>date-time</td>
              <td>Return only products updated after this timestamp</td>
            </tr>
            <tr>
              <td><code>SortField</code></td>
              <td>string</td>
              <td>Sort by <code>LastUpdatedDateTime</code> (default) or <code>ProductId</code></td>
            </tr>
            <tr>
              <td><code>SortOrder</code></td>
              <td>string</td>
              <td><code>asc</code> (default) or <code>desc</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="productsTabs" />

      <h3 class="ed-doc__subhead">Response structure</h3>
      <EdProse>
        Products are returned grouped by LFI. The <code>Data</code> array groups products by
        <code>LFIId</code>:
      </EdProse>

      <EdCode :code="productsResponse" lang="json" filename="response body" />

      <h3 class="ed-doc__subhead">Application fields</h3>
      <EdProse>
        At least one of the following fields <strong>must</strong> be returned by the LFI for every
        product. This determines how the TPP presents the page for the end user to apply for their
        selected product:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ApplicationUri</code></td>
              <td>string &lt;uri&gt;</td>
              <td>A link to apply for the product.</td>
            </tr>
            <tr>
              <td><code>ApplicationPhoneNumber</code></td>
              <td>string</td>
              <td>A phone number to apply for the product.</td>
            </tr>
            <tr>
              <td><code>ApplicationEmail</code></td>
              <td>string</td>
              <td>An email address to apply for the product.</td>
            </tr>
            <tr>
              <td><code>ApplicationDescription</code></td>
              <td>string</td>
              <td>A free text description of the application process for the product, with ways to contact the LFI if applicable.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Step 4 below covers how the TPP should respond to each of these fields when the user chooses to
        apply.
      </EdProse>

      <EdNote type="tip" title="Displaying products">
        <p>
          Use the LFI's logo and brand name from the Trust Framework Directory. Do not rank or order
          products based on commercial agreements with specific LFIs &mdash; ordering must reflect the
          user's own preferences.
        </p>
      </EdNote>

      <EdProse>
        See the <a href="./open-api/products">GET /products</a> API reference for the full response
        schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-apply-now"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 4 — Apply Now"
      title="Channel the user to the LFI's application"
      tone="cream"
    >
      <EdProse>
        When a user selects a product and chooses to apply, the action depends on which application
        fields the LFI has populated. Check the fields in priority order:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Present</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ApplicationUri</code></td>
              <td>Yes</td>
              <td>Redirect the user to this URL to complete the application on the LFI's own platform</td>
            </tr>
            <tr>
              <td><code>ApplicationPhoneNumber</code></td>
              <td>Yes</td>
              <td>Display the phone number for the user to call the LFI</td>
            </tr>
            <tr>
              <td><code>ApplicationEmail</code></td>
              <td>Yes</td>
              <td>Display the email address for the user to contact the LFI</td>
            </tr>
            <tr>
              <td><code>ApplicationDescription</code></td>
              <td>Yes</td>
              <td>Display the free-text description of the LFI's application process</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        An LFI may provide more than one of these fields. <code>ApplicationUri</code> is the preferred
        channel where available; the others provide fallback options for LFIs that do not have a direct
        online application.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-5-post-leads"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 5 — POST /leads"
      title="Submit a lead on the user's behalf"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/leads</code>
      </div>

      <EdProse>
        If the user instead chooses to request that the LFI contact them, the TPP submits a lead. The
        API Hub forwards it to the LFI and does <strong>not</strong> retain the data.
      </EdProse>

      <EdProse>
        As with <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/products</code></span>, include <code>x-fapi-customer-ip-address</code> on every
        request &mdash; leads can only be submitted while a customer is in a live session with the TPP.
      </EdProse>

      <EdCodeGroup :tabs="leadTabs" />

      <h3 class="ed-doc__subhead">Lead request fields</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Email</code></td><td>Yes</td><td>User's email address</td></tr>
            <tr><td><code>EmiratesId</code></td><td>Yes</td><td>UAE Emirates ID number</td></tr>
            <tr><td><code>MarketingOptOut</code></td><td>Yes</td><td>Whether the user has opted out of marketing communications</td></tr>
            <tr><td><code>ProductCategories</code></td><td>Yes</td><td>One or more product categories the user is interested in</td></tr>
            <tr><td><code>Name</code></td><td>Yes</td><td>User's name &mdash; <code>GivenName</code> + <code>LastName</code>, <code>FullName</code>, or <code>BusinessName</code> for business accounts</td></tr>
            <tr><td><code>PhoneNumber</code></td><td>No</td><td>E.164 format, e.g. <code>+971501234567</code></td></tr>
            <tr><td><code>Nationality</code></td><td>No</td><td>ISO 3166-1 alpha-2 country code</td></tr>
            <tr><td><code>ResidentialAddress</code></td><td>No</td><td>Structured address including <code>AddressLine</code>, <code>Country</code>, and optionally UAE <code>CountrySubDivision</code></td></tr>
            <tr><td><code>LeadInformation</code></td><td>No</td><td>Free-text notes about the lead</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="User consent">
        <p>
          Only submit a lead when the user has explicitly opted in to being contacted by the LFI. The
          <code>MarketingOptOut</code> field must accurately reflect the user's marketing preferences.
        </p>
      </EdNote>

      <EdProse>
        See the <a href="./open-api/leads">POST /leads</a> API reference for the full request and
        response schema.
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
