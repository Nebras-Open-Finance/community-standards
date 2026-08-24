import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
const smsExample = `ALTAREQ BANK: You requested your Platinum Credit Card finance rate via BudgetBuddy. Your code is 482915. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`;
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
`;
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
`;
const step5DisplayPython = `# The JWE carries a 30-minute exp claim. Decryption still works past that
# point — the TPP MUST NOT display the rate once exp has passed. Track the
# expiry on the client so the UI can prompt for a fresh request proactively.
JWE_TTL_SECONDS = 30 * 60
expires_at = issued_at + JWE_TTL_SECONDS

if time.time() >= expires_at:
    # Re-fetch GET /accounts/{AccountId}/product to obtain a fresh JWE
    # (and a fresh OTP sent to the user's device). Honour the rate limit.
    pass
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "finance-rates",
  __ssrInlineRender: true,
  setup(__props) {
    const step1Tabs = [{ label: "Node.js", lang: "typescript", code: step1Node }, { label: "Python", lang: "python", code: step1Python }];
    const step2Tabs = [{ label: "Node.js", lang: "typescript", code: step2Node }, { label: "Python", lang: "python", code: step2Python }];
    const step5DisplayTabs = [{ label: "Node.js", lang: "typescript", code: step5DisplayNode }, { label: "Python", lang: "python", code: step5DisplayPython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      const _component_ImageViewer = ImageViewer;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-dd858dd1><section class="ed-doc__hero" data-v-dd858dd1><div class="ed-doc__inner" data-v-dd858dd1><div class="ed-doc__eyebrow" data-v-dd858dd1><span class="ed-doc__eyebrow-dash" data-v-dd858dd1></span> TPP · Banking · Bank Data Sharing · API Guide </div><h1 class="ed-doc__title" data-v-dd858dd1> Encrypted FinanceRates <span class="ed-doc__read" data-v-dd858dd1>6 min read</span></h1><p class="ed-doc__lede" data-v-dd858dd1> When a TPP holds the <code data-v-dd858dd1>ReadProductFinanceRates</code> permission and calls <code data-v-dd858dd1>GET /accounts/{AccountId}/product</code> for a credit card, finance, or mortgage account, the LFI MAY return the <code data-v-dd858dd1>FinanceRates</code> field as an encrypted JWE rather than a structured object. The TPP MUST present the rates to the customer without the unencrypted values ever reaching or being stored on its servers — decryption happens locally on the user&#39;s device using a one-time code sent to the customer by the LFI. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when-this-applies",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When this applies",
        title: "Encrypted finance rates are an LFI-side choice",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> field on <a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" data-v-dd858dd1${_scopeId2}><code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code></a> is defined as <code data-v-dd858dd1${_scopeId2}>anyOf</code> a structured <code data-v-dd858dd1${_scopeId2}>AEProductFinanceRates</code> object or an <code data-v-dd858dd1${_scopeId2}>AEJwe</code> compact string. Each LFI decides, per product, whether to return the rate in cleartext or as an encrypted JWE. A TPP holding <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code> MUST therefore be ready for either shape on every call. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" field on "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" }, [
                      createVNode("code", null, "GET /accounts/{AccountId}/product")
                    ]),
                    createTextVNode(" is defined as "),
                    createVNode("code", null, "anyOf"),
                    createTextVNode(" a structured "),
                    createVNode("code", null, "AEProductFinanceRates"),
                    createTextVNode(" object or an "),
                    createVNode("code", null, "AEJwe"),
                    createTextVNode(" compact string. Each LFI decides, per product, whether to return the rate in cleartext or as an encrypted JWE. A TPP holding "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" MUST therefore be ready for either shape on every call. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>Cleartext</strong> — <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> is a JSON object. Render the rates directly. No special handling required. </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>Encrypted (JWE)</strong> — <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> is a compact JWE string. The TPP server MUST forward this opaque string to the user&#39;s device without inspecting, logging, or persisting it. Decryption happens in the browser using a one-time code the LFI sends to the customer. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cleartext"),
                      createTextVNode(" — "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" is a JSON object. Render the rates directly. No special handling required. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encrypted (JWE)"),
                      createTextVNode(" — "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" is a compact JWE string. The TPP server MUST forward this opaque string to the user's device without inspecting, logging, or persisting it. Decryption happens in the browser using a one-time code the LFI sends to the customer. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Why both shapes exist"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}> Some LFIs treat product finance rates as commercially sensitive and require an additional customer-present authentication step before the rate can be revealed. The encrypted JWE shape lets the rate flow through the TPP to the customer&#39;s screen without the TPP ever holding the cleartext value. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Some LFIs treat product finance rates as commercially sensitive and require an additional customer-present authentication step before the rate can be revealed. The encrypted JWE shape lets the rate flow through the TPP to the customer's screen without the TPP ever holding the cleartext value. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" field on "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" }, [
                    createVNode("code", null, "GET /accounts/{AccountId}/product")
                  ]),
                  createTextVNode(" is defined as "),
                  createVNode("code", null, "anyOf"),
                  createTextVNode(" a structured "),
                  createVNode("code", null, "AEProductFinanceRates"),
                  createTextVNode(" object or an "),
                  createVNode("code", null, "AEJwe"),
                  createTextVNode(" compact string. Each LFI decides, per product, whether to return the rate in cleartext or as an encrypted JWE. A TPP holding "),
                  createVNode("code", null, "ReadProductFinanceRates"),
                  createTextVNode(" MUST therefore be ready for either shape on every call. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cleartext"),
                    createTextVNode(" — "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is a JSON object. Render the rates directly. No special handling required. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encrypted (JWE)"),
                    createTextVNode(" — "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is a compact JWE string. The TPP server MUST forward this opaque string to the user's device without inspecting, logging, or persisting it. Decryption happens in the browser using a one-time code the LFI sends to the customer. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Why both shapes exist"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Some LFIs treat product finance rates as commercially sensitive and require an additional customer-present authentication step before the rate can be revealed. The encrypted JWE shape lets the rate flow through the TPP to the customer's screen without the TPP ever holding the cleartext value. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Prerequisites",
        title: "What you need before calling this endpoint",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>The <em data-v-dd858dd1${_scopeId2}>Access Encrypted Resource Data</em> optional certification</strong> — the TPP MUST hold this certification with Nebras <em data-v-dd858dd1${_scopeId2}>before</em> it requests <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code> on any consent. An uncertified TPP MUST NOT include <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code> in the <code data-v-dd858dd1${_scopeId2}>authorization_details</code> at consent creation; the API Hub rejects the consent if it does. See <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-dd858dd1${_scopeId2}> Access Encrypted Resource Data</a>. </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>A consent that includes <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code></strong> — this permission MUST be requested in the <code data-v-dd858dd1${_scopeId2}>authorization_details</code> when the TPP creates the consent. See <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide#step-1-authorization-details" data-v-dd858dd1${_scopeId2}> Step 1 — Constructing Authorization Details</a>. </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>An active customer-present session</strong> — when the consent carries <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code>, the TPP MUST only call <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> while the customer is actively using the TPP application. Background or scheduled calls are not permitted on a consent that carries this permission, because the encrypted-rate flow requires the customer to receive and enter the one-time code in real time. </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>A valid access token and the FAPI headers for a customer-present call</strong> — <code data-v-dd858dd1${_scopeId2}>x-fapi-interaction-id</code>, <code data-v-dd858dd1${_scopeId2}>x-fapi-auth-date</code>, and <code data-v-dd858dd1${_scopeId2}>x-fapi-customer-ip-address</code>. Because the call is always customer-present (see above), <code data-v-dd858dd1${_scopeId2}>x-fapi-customer-ip-address</code> MUST be set to the customer&#39;s device IP on every request; omitting it is not permitted on this endpoint when the consent carries <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code>. See <a href="/tech/tpp-standards/security/request-headers" data-v-dd858dd1${_scopeId2}>Request Headers</a>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("The "),
                        createVNode("em", null, "Access Encrypted Resource Data"),
                        createTextVNode(" optional certification")
                      ]),
                      createTextVNode(" — the TPP MUST hold this certification with Nebras "),
                      createVNode("em", null, "before"),
                      createTextVNode(" it requests "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" on any consent. An uncertified TPP MUST NOT include "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" in the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" at consent creation; the API Hub rejects the consent if it does. See "),
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("A consent that includes "),
                        createVNode("code", null, "ReadProductFinanceRates")
                      ]),
                      createTextVNode(" — this permission MUST be requested in the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" when the TPP creates the consent. See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide#step-1-authorization-details" }, " Step 1 — Constructing Authorization Details"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "An active customer-present session"),
                      createTextVNode(" — when the consent carries "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(", the TPP MUST only call "),
                      createVNode("code", null, "GET /accounts/{AccountId}/product"),
                      createTextVNode(" while the customer is actively using the TPP application. Background or scheduled calls are not permitted on a consent that carries this permission, because the encrypted-rate flow requires the customer to receive and enter the one-time code in real time. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "A valid access token and the FAPI headers for a customer-present call"),
                      createTextVNode(" — "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(", "),
                      createVNode("code", null, "x-fapi-auth-date"),
                      createTextVNode(", and "),
                      createVNode("code", null, "x-fapi-customer-ip-address"),
                      createTextVNode(". Because the call is always customer-present (see above), "),
                      createVNode("code", null, "x-fapi-customer-ip-address"),
                      createTextVNode(" MUST be set to the customer's device IP on every request; omitting it is not permitted on this endpoint when the consent carries "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(". See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("The "),
                      createVNode("em", null, "Access Encrypted Resource Data"),
                      createTextVNode(" optional certification")
                    ]),
                    createTextVNode(" — the TPP MUST hold this certification with Nebras "),
                    createVNode("em", null, "before"),
                    createTextVNode(" it requests "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" on any consent. An uncertified TPP MUST NOT include "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" in the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" at consent creation; the API Hub rejects the consent if it does. See "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("A consent that includes "),
                      createVNode("code", null, "ReadProductFinanceRates")
                    ]),
                    createTextVNode(" — this permission MUST be requested in the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" when the TPP creates the consent. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide#step-1-authorization-details" }, " Step 1 — Constructing Authorization Details"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "An active customer-present session"),
                    createTextVNode(" — when the consent carries "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(", the TPP MUST only call "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" while the customer is actively using the TPP application. Background or scheduled calls are not permitted on a consent that carries this permission, because the encrypted-rate flow requires the customer to receive and enter the one-time code in real time. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "A valid access token and the FAPI headers for a customer-present call"),
                    createTextVNode(" — "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(", and "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(". Because the call is always customer-present (see above), "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" MUST be set to the customer's device IP on every request; omitting it is not permitted on this endpoint when the consent carries "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-call-product",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1 — GET /accounts/{AccountId}/product",
        title: "Call the product endpoint as normal",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-dd858dd1${_scopeId}><span class="http-badge http-get" data-v-dd858dd1${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-dd858dd1${_scopeId}>/accounts/{AccountId}/product</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whether the LFI returns cleartext or an encrypted JWE, the request itself is unchanged. Make the call as you would for any other Bank Data Sharing endpoint: `);
                } else {
                  return [
                    createTextVNode(" Whether the LFI returns cleartext or an encrypted JWE, the request itself is unchanged. Make the call as you would for any other Bank Data Sharing endpoint: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step1Tabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-dd858dd1${_scopeId}>Example response — cleartext</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleCleartextResponse,
              lang: "json",
              filename: "cleartext FinanceRates"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-dd858dd1${_scopeId}>Example response — encrypted JWE</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleEncryptedResponse,
              lang: "json",
              filename: "encrypted FinanceRates"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Apart from <code data-v-dd858dd1${_scopeId2}>FinanceRates</code>, every other field in the response is returned in cleartext in both shapes — <code data-v-dd858dd1${_scopeId2}>Charges</code>, <code data-v-dd858dd1${_scopeId2}>DepositRates</code>, <code data-v-dd858dd1${_scopeId2}>ProductName</code>, <code data-v-dd858dd1${_scopeId2}>Tenor</code>, and so on. Only <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> is ever encrypted. `);
                } else {
                  return [
                    createTextVNode(" Apart from "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(", every other field in the response is returned in cleartext in both shapes — "),
                    createVNode("code", null, "Charges"),
                    createTextVNode(", "),
                    createVNode("code", null, "DepositRates"),
                    createTextVNode(", "),
                    createVNode("code", null, "ProductName"),
                    createTextVNode(", "),
                    createVNode("code", null, "Tenor"),
                    createTextVNode(", and so on. Only "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is ever encrypted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{AccountId}/product")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whether the LFI returns cleartext or an encrypted JWE, the request itself is unchanged. Make the call as you would for any other Bank Data Sharing endpoint: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step1Tabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response — cleartext"),
              createVNode(_component_EdCode, {
                code: exampleCleartextResponse,
                lang: "json",
                filename: "cleartext FinanceRates"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response — encrypted JWE"),
              createVNode(_component_EdCode, {
                code: exampleEncryptedResponse,
                lang: "json",
                filename: "encrypted FinanceRates"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Apart from "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(", every other field in the response is returned in cleartext in both shapes — "),
                  createVNode("code", null, "Charges"),
                  createTextVNode(", "),
                  createVNode("code", null, "DepositRates"),
                  createTextVNode(", "),
                  createVNode("code", null, "ProductName"),
                  createTextVNode(", "),
                  createVNode("code", null, "Tenor"),
                  createTextVNode(", and so on. Only "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" is ever encrypted. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-detect-jwe",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2 — Detect the response shape",
        title: "Branch on whether FinanceRates is a string",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> is a JSON object, render its <code data-v-dd858dd1${_scopeId2}>ProductFinanceRateProperties</code> directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer&#39;s browser. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. `);
                } else {
                  return [
                    createTextVNode(" If "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is a JSON object, render its "),
                    createVNode("code", null, "ProductFinanceRateProperties"),
                    createTextVNode(" directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer's browser. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Forward, do not store"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}> The encrypted JWE is opaque to the TPP. Pass it through to the browser response and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-rate handling requirements documented in <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-dd858dd1${_scopeId2}> Access Encrypted Resource Data</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The encrypted JWE is opaque to the TPP. Pass it through to the browser response and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-rate handling requirements documented in "),
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" is a JSON object, render its "),
                  createVNode("code", null, "ProductFinanceRateProperties"),
                  createTextVNode(" directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer's browser. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Forward, do not store"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The encrypted JWE is opaque to the TPP. Pass it through to the browser response and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-rate handling requirements documented in "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-prompt-otp",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3 — Prompt the customer for the one-time code",
        title: "Render an OTP input on the user's device",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the LFI returns an encrypted <code data-v-dd858dd1${_scopeId2}>FinanceRates</code>, it also sends a one-time code to the customer directly, through a channel the LFI controls — an SMS, an email, or a push notification in the LFI&#39;s banking app. The TPP MUST display an input field where the customer can type that code, and a short explanation that matches the wording shown to the customer on the consent screen (“Your bank has sent you a one-time code — enter it below to see your finance rate”). `);
                } else {
                  return [
                    createTextVNode(" When the LFI returns an encrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(", it also sends a one-time code to the customer directly, through a channel the LFI controls — an SMS, an email, or a push notification in the LFI's banking app. The TPP MUST display an input field where the customer can type that code, and a short explanation that matches the wording shown to the customer on the consent screen (“Your bank has sent you a one-time code — enter it below to see your finance rate”). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/user-experience/read-finance-rates/image.webp",
              alt: "Read FinanceRates user journey — consent, redirection to LFI, authentication, and the final TPP screen prompting for a one-time code"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-dd858dd1${_scopeId}>What the customer receives</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI sends the code to the customer directly — the TPP never sees it. The message names the product, names your <code data-v-dd858dd1${_scopeId2}>TradingName</code> so the customer can tie it back to your application, and carries a 30-minute validity. Knowing the shape of the message helps you word your own prompt consistently with what the customer is reading on their phone: `);
                } else {
                  return [
                    createTextVNode(" The LFI sends the code to the customer directly — the TPP never sees it. The message names the product, names your "),
                    createVNode("code", null, "TradingName"),
                    createTextVNode(" so the customer can tie it back to your application, and carries a 30-minute validity. Knowing the shape of the message helps you word your own prompt consistently with what the customer is reading on their phone: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: smsExample,
              lang: "text",
              filename: "example SMS — as the customer receives it"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>Customer-present only</strong> — this flow only works when the customer is actively using the TPP. Do not call <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> on a schedule when you require the encrypted rate; there is no way to decrypt the JWE without the customer entering the OTP. </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>Display the rate types you are about to reveal</strong> — tell the customer which product the OTP unlocks (for example, “Platinum Credit Card — purchase APR”). </li><li data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>Offer to resend</strong> — if the customer does not receive the code, the TPP may re-call <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> to ask the LFI to issue a fresh code. Respect the rate limits described in <a href="#rate-limits" data-v-dd858dd1${_scopeId2}>Step 6 — Rate limits and retries</a>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Customer-present only"),
                      createTextVNode(" — this flow only works when the customer is actively using the TPP. Do not call "),
                      createVNode("code", null, "GET /accounts/{AccountId}/product"),
                      createTextVNode(" on a schedule when you require the encrypted rate; there is no way to decrypt the JWE without the customer entering the OTP. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Display the rate types you are about to reveal"),
                      createTextVNode(" — tell the customer which product the OTP unlocks (for example, “Platinum Credit Card — purchase APR”). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Offer to resend"),
                      createTextVNode(" — if the customer does not receive the code, the TPP may re-call "),
                      createVNode("code", null, "GET /accounts/{AccountId}/product"),
                      createTextVNode(" to ask the LFI to issue a fresh code. Respect the rate limits described in "),
                      createVNode("a", { href: "#rate-limits" }, "Step 6 — Rate limits and retries"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the LFI returns an encrypted "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(", it also sends a one-time code to the customer directly, through a channel the LFI controls — an SMS, an email, or a push notification in the LFI's banking app. The TPP MUST display an input field where the customer can type that code, and a short explanation that matches the wording shown to the customer on the consent screen (“Your bank has sent you a one-time code — enter it below to see your finance rate”). ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/user-experience/read-finance-rates/image.webp",
                alt: "Read FinanceRates user journey — consent, redirection to LFI, authentication, and the final TPP screen prompting for a one-time code"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "What the customer receives"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI sends the code to the customer directly — the TPP never sees it. The message names the product, names your "),
                  createVNode("code", null, "TradingName"),
                  createTextVNode(" so the customer can tie it back to your application, and carries a 30-minute validity. Knowing the shape of the message helps you word your own prompt consistently with what the customer is reading on their phone: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: smsExample,
                lang: "text",
                filename: "example SMS — as the customer receives it"
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Customer-present only"),
                    createTextVNode(" — this flow only works when the customer is actively using the TPP. Do not call "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" on a schedule when you require the encrypted rate; there is no way to decrypt the JWE without the customer entering the OTP. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Display the rate types you are about to reveal"),
                    createTextVNode(" — tell the customer which product the OTP unlocks (for example, “Platinum Credit Card — purchase APR”). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Offer to resend"),
                    createTextVNode(" — if the customer does not receive the code, the TPP may re-call "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" to ask the LFI to issue a fresh code. Respect the rate limits described in "),
                    createVNode("a", { href: "#rate-limits" }, "Step 6 — Rate limits and retries"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-decrypt-browser",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Step 4 — Decrypt locally in the browser",
        title: "Use the OTP as the PBES2 password",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE is encrypted with <strong data-v-dd858dd1${_scopeId2}>PBES2-HS512+A256KW</strong> for key wrapping and <strong data-v-dd858dd1${_scopeId2}>A256GCM</strong> for content encryption. The customer&#39;s one-time code is the PBES2 password; the JWE header carries the salt and iteration count, so the TPP does not need any additional material to decrypt. `);
                } else {
                  return [
                    createTextVNode(" The JWE is encrypted with "),
                    createVNode("strong", null, "PBES2-HS512+A256KW"),
                    createTextVNode(" for key wrapping and "),
                    createVNode("strong", null, "A256GCM"),
                    createTextVNode(" for content encryption. The customer's one-time code is the PBES2 password; the JWE header carries the salt and iteration count, so the TPP does not need any additional material to decrypt. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decryption MUST run on the customer&#39;s device — the OTP and the decrypted rate MUST NOT be sent to the TPP server. Use a JOSE library loaded directly into the page, and bind the form submit to a local handler: `);
                } else {
                  return [
                    createTextVNode(" Decryption MUST run on the customer's device — the OTP and the decrypted rate MUST NOT be sent to the TPP server. Use a JOSE library loaded directly into the page, and bind the form submit to a local handler: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: step4Browser,
              lang: "html",
              filename: "OTP form & decrypt — runs in the browser"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Never round-trip the OTP"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}> The OTP MUST be consumed in the browser. Do not POST it to your server for “server-side decryption”, do not include it in analytics events, and do not echo it back into a form field that submits to your domain. The same rule applies to the decrypted <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> object: keep it inside the page&#39;s JavaScript scope, render it into the DOM, and discard it when the customer navigates away. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The OTP MUST be consumed in the browser. Do not POST it to your server for “server-side decryption”, do not include it in analytics events, and do not echo it back into a form field that submits to your domain. The same rule applies to the decrypted "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" object: keep it inside the page's JavaScript scope, render it into the DOM, and discard it when the customer navigates away. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Python equivalents exist but are out of scope here"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}><code data-v-dd858dd1${_scopeId2}>jose</code> (Node.js, browser) and <code data-v-dd858dd1${_scopeId2}>jwcrypto</code> (Python) both support PBES2 JWE. However, decryption MUST happen on the user&#39;s device, which in practice means JavaScript loaded into the customer&#39;s browser or a native mobile SDK. Server-side Python/Node code paths are not appropriate for this step. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "jose"),
                      createTextVNode(" (Node.js, browser) and "),
                      createVNode("code", null, "jwcrypto"),
                      createTextVNode(" (Python) both support PBES2 JWE. However, decryption MUST happen on the user's device, which in practice means JavaScript loaded into the customer's browser or a native mobile SDK. Server-side Python/Node code paths are not appropriate for this step. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE is encrypted with "),
                  createVNode("strong", null, "PBES2-HS512+A256KW"),
                  createTextVNode(" for key wrapping and "),
                  createVNode("strong", null, "A256GCM"),
                  createTextVNode(" for content encryption. The customer's one-time code is the PBES2 password; the JWE header carries the salt and iteration count, so the TPP does not need any additional material to decrypt. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Decryption MUST run on the customer's device — the OTP and the decrypted rate MUST NOT be sent to the TPP server. Use a JOSE library loaded directly into the page, and bind the form submit to a local handler: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: step4Browser,
                lang: "html",
                filename: "OTP form & decrypt — runs in the browser"
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Never round-trip the OTP"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The OTP MUST be consumed in the browser. Do not POST it to your server for “server-side decryption”, do not include it in analytics events, and do not echo it back into a form field that submits to your domain. The same rule applies to the decrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" object: keep it inside the page's JavaScript scope, render it into the DOM, and discard it when the customer navigates away. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Python equivalents exist but are out of scope here"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "jose"),
                    createTextVNode(" (Node.js, browser) and "),
                    createVNode("code", null, "jwcrypto"),
                    createTextVNode(" (Python) both support PBES2 JWE. However, decryption MUST happen on the user's device, which in practice means JavaScript loaded into the customer's browser or a native mobile SDK. Server-side Python/Node code paths are not appropriate for this step. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-5-display-window",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Step 5 — Display until the JWE expires",
        title: "The 30-minute display window",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE carries a fixed 30-minute lifetime as an <code data-v-dd858dd1${_scopeId2}>exp</code> claim inside its plaintext, set by the LFI. Within that window the TPP MAY re-decrypt and re-render the rate as the customer navigates between screens, provided the OTP is still held in browser memory. `);
                } else {
                  return [
                    createTextVNode(" The JWE carries a fixed 30-minute lifetime as an "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" claim inside its plaintext, set by the LFI. Within that window the TPP MAY re-decrypt and re-render the rate as the customer navigates between screens, provided the OTP is still held in browser memory. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decryption does not stop working when the window closes — a JWE and its OTP can technically be decrypted at any later time, so the 30-minute limit is not enforced by the cryptography. The TPP MUST enforce it: after decrypting, the TPP MUST read the <code data-v-dd858dd1${_scopeId2}>exp</code> claim from the plaintext and MUST NOT display the rate, or re-decrypt it for display, once <code data-v-dd858dd1${_scopeId2}>exp</code> has passed. This obligation is part of the TPP&#39;s <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-dd858dd1${_scopeId2}> Access Encrypted Resource Data</a> certification. `);
                } else {
                  return [
                    createTextVNode(" Decryption does not stop working when the window closes — a JWE and its OTP can technically be decrypted at any later time, so the 30-minute limit is not enforced by the cryptography. The TPP MUST enforce it: after decrypting, the TPP MUST read the "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" claim from the plaintext and MUST NOT display the rate, or re-decrypt it for display, once "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" has passed. This obligation is part of the TPP's "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(" certification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step5DisplayTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Expiry is a TPP obligation, not a cryptographic guarantee"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}> The OTP keeps working after 30 minutes — nothing in the JWE itself prevents a late decryption. The window is held closed only by the TPP checking <code data-v-dd858dd1${_scopeId2}>exp</code> and by the certification commitments the TPP makes to Nebras. Treating <code data-v-dd858dd1${_scopeId2}>exp</code> as advisory, or relying on decryption to “just fail”, is a certification breach. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The OTP keeps working after 30 minutes — nothing in the JWE itself prevents a late decryption. The window is held closed only by the TPP checking "),
                      createVNode("code", null, "exp"),
                      createTextVNode(" and by the certification commitments the TPP makes to Nebras. Treating "),
                      createVNode("code", null, "exp"),
                      createTextVNode(" as advisory, or relying on decryption to “just fail”, is a certification breach. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the window closes mid-session, prompt the customer to request a fresh code via a new call to <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> rather than continuing to show a stale rate. The customer&#39;s consent is unaffected — only the 30-minute display window has expired. `);
                } else {
                  return [
                    createTextVNode(" When the window closes mid-session, prompt the customer to request a fresh code via a new call to "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" rather than continuing to show a stale rate. The customer's consent is unaffected — only the 30-minute display window has expired. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE carries a fixed 30-minute lifetime as an "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" claim inside its plaintext, set by the LFI. Within that window the TPP MAY re-decrypt and re-render the rate as the customer navigates between screens, provided the OTP is still held in browser memory. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Decryption does not stop working when the window closes — a JWE and its OTP can technically be decrypted at any later time, so the 30-minute limit is not enforced by the cryptography. The TPP MUST enforce it: after decrypting, the TPP MUST read the "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" claim from the plaintext and MUST NOT display the rate, or re-decrypt it for display, once "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" has passed. This obligation is part of the TPP's "),
                  createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                  createTextVNode(" certification. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step5DisplayTabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Expiry is a TPP obligation, not a cryptographic guarantee"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The OTP keeps working after 30 minutes — nothing in the JWE itself prevents a late decryption. The window is held closed only by the TPP checking "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" and by the certification commitments the TPP makes to Nebras. Treating "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" as advisory, or relying on decryption to “just fail”, is a certification breach. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the window closes mid-session, prompt the customer to request a fresh code via a new call to "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" rather than continuing to show a stale rate. The customer's consent is unaffected — only the 30-minute display window has expired. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "rate-limits",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 6 — Rate limits and retries",
        title: "LFI-enforced caps on encrypted-rate requests",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each call to <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> that returns an encrypted <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> triggers a fresh OTP to the customer. LFIs MUST rate-limit these requests per consent to prevent OTP spam, while leaving enough headroom for legitimate retries (a code not received, a typo, an expired window). `);
                } else {
                  return [
                    createTextVNode(" Each call to "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" that returns an encrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" triggers a fresh OTP to the customer. LFIs MUST rate-limit these requests per consent to prevent OTP spam, while leaving enough headroom for legitimate retries (a code not received, a typo, an expired window). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd858dd1${_scopeId2}><thead data-v-dd858dd1${_scopeId2}><tr data-v-dd858dd1${_scopeId2}><th data-v-dd858dd1${_scopeId2}>Rule</th><th data-v-dd858dd1${_scopeId2}>Limit</th><th data-v-dd858dd1${_scopeId2}>Rationale</th></tr></thead><tbody data-v-dd858dd1${_scopeId2}><tr data-v-dd858dd1${_scopeId2}><td data-v-dd858dd1${_scopeId2}>Minimum interval between requests</td><td data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>60 seconds</strong> per consent per account</td><td data-v-dd858dd1${_scopeId2}>Lets the customer ask for a fresh OTP if the first code is delayed, without enabling rapid-fire spam.</td></tr><tr data-v-dd858dd1${_scopeId2}><td data-v-dd858dd1${_scopeId2}>Daily cap</td><td data-v-dd858dd1${_scopeId2}><strong data-v-dd858dd1${_scopeId2}>12 fresh OTPs</strong> per consent per account per rolling 24 hours</td><td data-v-dd858dd1${_scopeId2}>Covers retries and repeated re-display across the day, and acts as a backstop against runaway message volume rather than a limit normal traffic should approach.</td></tr><tr data-v-dd858dd1${_scopeId2}><td data-v-dd858dd1${_scopeId2}>Decryption attempts</td><td data-v-dd858dd1${_scopeId2}>Unbounded within the 30-minute window of a single JWE</td><td data-v-dd858dd1${_scopeId2}>Re-decrypting an already-issued JWE in the customer&#39;s browser does not contact the LFI and so is not rate-limited.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Limit"),
                          createVNode("th", null, "Rationale")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Minimum interval between requests"),
                          createVNode("td", null, [
                            createVNode("strong", null, "60 seconds"),
                            createTextVNode(" per consent per account")
                          ]),
                          createVNode("td", null, "Lets the customer ask for a fresh OTP if the first code is delayed, without enabling rapid-fire spam.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Daily cap"),
                          createVNode("td", null, [
                            createVNode("strong", null, "12 fresh OTPs"),
                            createTextVNode(" per consent per account per rolling 24 hours")
                          ]),
                          createVNode("td", null, "Covers retries and repeated re-display across the day, and acts as a backstop against runaway message volume rather than a limit normal traffic should approach.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Decryption attempts"),
                          createVNode("td", null, "Unbounded within the 30-minute window of a single JWE"),
                          createVNode("td", null, "Re-decrypting an already-issued JWE in the customer's browser does not contact the LFI and so is not rate-limited.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-dd858dd1${_scopeId}>Handling the 429 response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When either limit is breached, the LFI rejects the entire <code data-v-dd858dd1${_scopeId2}>GET /accounts/{AccountId}/product</code> request with <code data-v-dd858dd1${_scopeId2}>429 Too Many Requests</code>. The API Hub forwards the response unchanged, so the TPP receives the same status and headers the LFI emitted — HTTP <code data-v-dd858dd1${_scopeId2}>429</code>, no response body, a <code data-v-dd858dd1${_scopeId2}>Retry-After</code> header containing the integer seconds until the next call would succeed, and the echoed <code data-v-dd858dd1${_scopeId2}>x-fapi-interaction-id</code> for correlation. `);
                } else {
                  return [
                    createTextVNode(" When either limit is breached, the LFI rejects the entire "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" request with "),
                    createVNode("code", null, "429 Too Many Requests"),
                    createTextVNode(". The API Hub forwards the response unchanged, so the TPP receives the same status and headers the LFI emitted — HTTP "),
                    createVNode("code", null, "429"),
                    createTextVNode(", no response body, a "),
                    createVNode("code", null, "Retry-After"),
                    createTextVNode(" header containing the integer seconds until the next call would succeed, and the echoed "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" for correlation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "http",
              filename: "429 response — as the TPP receives it",
              code: `HTTP/1.1 429 Too Many Requests
Retry-After: 60
x-fapi-interaction-id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd858dd1${_scopeId2}> Read <code data-v-dd858dd1${_scopeId2}>Retry-After</code> and surface a customer-facing message that includes the wait — &quot;Please wait about a minute and try again&quot; for short waits, &quot;You&#39;ve reached today&#39;s limit for viewing this rate — please try again later&quot; when the daily cap is the cause. </li><li data-v-dd858dd1${_scopeId2}> Do not auto-retry inside the wait window. The LFI will reject again and the customer will receive another code request that cannot succeed. </li><li data-v-dd858dd1${_scopeId2}> A <code data-v-dd858dd1${_scopeId2}>429</code> never means the consent is invalid — it means too many fresh OTPs have been requested in too short a window. Other Data Sharing endpoints continue to work normally for this consent during the wait. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" Read "),
                      createVNode("code", null, "Retry-After"),
                      createTextVNode(` and surface a customer-facing message that includes the wait — "Please wait about a minute and try again" for short waits, "You've reached today's limit for viewing this rate — please try again later" when the daily cap is the cause. `)
                    ]),
                    createVNode("li", null, " Do not auto-retry inside the wait window. The LFI will reject again and the customer will receive another code request that cannot succeed. "),
                    createVNode("li", null, [
                      createTextVNode(" A "),
                      createVNode("code", null, "429"),
                      createTextVNode(" never means the consent is invalid — it means too many fresh OTPs have been requested in too short a window. Other Data Sharing endpoints continue to work normally for this consent during the wait. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Distinguish 429 from permission absence"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd858dd1${_scopeId2}> If the TPP did not request <code data-v-dd858dd1${_scopeId2}>ReadProductFinanceRates</code> on the consent, the response is a normal <code data-v-dd858dd1${_scopeId2}>200</code> with the <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> field simply absent from the <code data-v-dd858dd1${_scopeId2}>Product</code> object — not a <code data-v-dd858dd1${_scopeId2}>429</code>, not a <code data-v-dd858dd1${_scopeId2}>403</code>. Treat these as two distinct conditions in your UI: permission-not-granted should prompt the customer to grant the permission on a new consent; <code data-v-dd858dd1${_scopeId2}>429</code> should prompt them to wait. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If the TPP did not request "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" on the consent, the response is a normal "),
                      createVNode("code", null, "200"),
                      createTextVNode(" with the "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" field simply absent from the "),
                      createVNode("code", null, "Product"),
                      createTextVNode(" object — not a "),
                      createVNode("code", null, "429"),
                      createTextVNode(", not a "),
                      createVNode("code", null, "403"),
                      createTextVNode(". Treat these as two distinct conditions in your UI: permission-not-granted should prompt the customer to grant the permission on a new consent; "),
                      createVNode("code", null, "429"),
                      createTextVNode(" should prompt them to wait. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each call to "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" that returns an encrypted "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" triggers a fresh OTP to the customer. LFIs MUST rate-limit these requests per consent to prevent OTP spam, while leaving enough headroom for legitimate retries (a code not received, a typo, an expired window). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Limit"),
                        createVNode("th", null, "Rationale")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Minimum interval between requests"),
                        createVNode("td", null, [
                          createVNode("strong", null, "60 seconds"),
                          createTextVNode(" per consent per account")
                        ]),
                        createVNode("td", null, "Lets the customer ask for a fresh OTP if the first code is delayed, without enabling rapid-fire spam.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Daily cap"),
                        createVNode("td", null, [
                          createVNode("strong", null, "12 fresh OTPs"),
                          createTextVNode(" per consent per account per rolling 24 hours")
                        ]),
                        createVNode("td", null, "Covers retries and repeated re-display across the day, and acts as a backstop against runaway message volume rather than a limit normal traffic should approach.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Decryption attempts"),
                        createVNode("td", null, "Unbounded within the 30-minute window of a single JWE"),
                        createVNode("td", null, "Re-decrypting an already-issued JWE in the customer's browser does not contact the LFI and so is not rate-limited.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Handling the 429 response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When either limit is breached, the LFI rejects the entire "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" request with "),
                  createVNode("code", null, "429 Too Many Requests"),
                  createTextVNode(". The API Hub forwards the response unchanged, so the TPP receives the same status and headers the LFI emitted — HTTP "),
                  createVNode("code", null, "429"),
                  createTextVNode(", no response body, a "),
                  createVNode("code", null, "Retry-After"),
                  createTextVNode(" header containing the integer seconds until the next call would succeed, and the echoed "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" for correlation. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "http",
                filename: "429 response — as the TPP receives it",
                code: `HTTP/1.1 429 Too Many Requests
Retry-After: 60
x-fapi-interaction-id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
`
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" Read "),
                    createVNode("code", null, "Retry-After"),
                    createTextVNode(` and surface a customer-facing message that includes the wait — "Please wait about a minute and try again" for short waits, "You've reached today's limit for viewing this rate — please try again later" when the daily cap is the cause. `)
                  ]),
                  createVNode("li", null, " Do not auto-retry inside the wait window. The LFI will reject again and the customer will receive another code request that cannot succeed. "),
                  createVNode("li", null, [
                    createTextVNode(" A "),
                    createVNode("code", null, "429"),
                    createTextVNode(" never means the consent is invalid — it means too many fresh OTPs have been requested in too short a window. Other Data Sharing endpoints continue to work normally for this consent during the wait. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Distinguish 429 from permission absence"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If the TPP did not request "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" on the consent, the response is a normal "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" field simply absent from the "),
                    createVNode("code", null, "Product"),
                    createTextVNode(" object — not a "),
                    createVNode("code", null, "429"),
                    createTextVNode(", not a "),
                    createVNode("code", null, "403"),
                    createTextVNode(". Treat these as two distinct conditions in your UI: permission-not-granted should prompt the customer to grant the permission on a new consent; "),
                    createVNode("code", null, "429"),
                    createTextVNode(" should prompt them to wait. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "tpp-responsibilities",
        num: "09",
        color: "var(--at-navy)",
        eyebrow: "TPP responsibilities",
        title: "Normative rules for handling encrypted FinanceRates",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd858dd1${_scopeId2}> The TPP MUST NOT transmit, store, log, or otherwise process the unencrypted <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> on its servers in any form or capacity. The decrypted value lives only in the customer&#39;s browser session. </li><li data-v-dd858dd1${_scopeId2}> The TPP MUST perform all decryption of <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> locally on the user&#39;s device, solely for the purpose of displaying the rate to the customer. </li><li data-v-dd858dd1${_scopeId2}> The TPP MUST NOT interact with the encrypted or unencrypted <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> in any manner other than as described in this guide. </li><li data-v-dd858dd1${_scopeId2}> The TPP MUST submit its architectural plan for decryption and display of <code data-v-dd858dd1${_scopeId2}>FinanceRates</code> — including the relevant browser-side source — to Nebras for inspection and approval as part of the <a href="/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" data-v-dd858dd1${_scopeId2}> Access Encrypted Resource Data</a> certification. Material changes to that process post go-live require Nebras sign-off before they are deployed. </li><li data-v-dd858dd1${_scopeId2}> The TPP MUST present the decrypted rate accurately and in context — for example, labelling a credit card APR as “purchase APR” rather than “interest rate” — so the customer sees the rate faithfully as the LFI provided it. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" The TPP MUST NOT transmit, store, log, or otherwise process the unencrypted "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" on its servers in any form or capacity. The decrypted value lives only in the customer's browser session. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" The TPP MUST perform all decryption of "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" locally on the user's device, solely for the purpose of displaying the rate to the customer. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" The TPP MUST NOT interact with the encrypted or unencrypted "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" in any manner other than as described in this guide. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" The TPP MUST submit its architectural plan for decryption and display of "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" — including the relevant browser-side source — to Nebras for inspection and approval as part of the "),
                      createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                      createTextVNode(" certification. Material changes to that process post go-live require Nebras sign-off before they are deployed. ")
                    ]),
                    createVNode("li", null, " The TPP MUST present the decrypted rate accurately and in context — for example, labelling a credit card APR as “purchase APR” rather than “interest rate” — so the customer sees the rate faithfully as the LFI provided it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" The TPP MUST NOT transmit, store, log, or otherwise process the unencrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" on its servers in any form or capacity. The decrypted value lives only in the customer's browser session. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" The TPP MUST perform all decryption of "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" locally on the user's device, solely for the purpose of displaying the rate to the customer. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" The TPP MUST NOT interact with the encrypted or unencrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" in any manner other than as described in this guide. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" The TPP MUST submit its architectural plan for decryption and display of "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" — including the relevant browser-side source — to Nebras for inspection and approval as part of the "),
                    createVNode("a", { href: "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data" }, " Access Encrypted Resource Data"),
                    createTextVNode(" certification. Material changes to that process post go-live require Nebras sign-off before they are deployed. ")
                  ]),
                  createVNode("li", null, " The TPP MUST present the decrypted rate accurately and in context — for example, labelling a credit card APR as “purchase APR” rather than “interest rate” — so the customer sees the rate faithfully as the LFI provided it. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const financeRates = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd858dd1"]]);
export {
  financeRates as default
};
