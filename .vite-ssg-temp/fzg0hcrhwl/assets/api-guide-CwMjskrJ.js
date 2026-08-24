import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as _sfc_main$1 } from "./APIFlowsProductsLeads-B9f6D-MN.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const tokenLoopTabs = [
      { label: "Node.js", lang: "typescript", code: tokenLoopNode },
      { label: "Python", lang: "python", code: tokenLoopPython }
    ];
    const productsTabs = [
      { label: "Node.js", lang: "typescript", code: productsNode },
      { label: "Python", lang: "python", code: productsPython }
    ];
    const leadTabs = [
      { label: "Node.js", lang: "typescript", code: leadNode },
      { label: "Python", lang: "python", code: leadPython }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsProductsLeads = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cc24cb8f><section class="ed-doc__hero" data-v-cc24cb8f><div class="ed-doc__inner" data-v-cc24cb8f><div class="ed-doc__eyebrow" data-v-cc24cb8f><span class="ed-doc__eyebrow-dash" data-v-cc24cb8f></span> TPP · Banking · Products &amp; Leads </div><h1 class="ed-doc__title" data-v-cc24cb8f> Products &amp; Leads — API Guide <span class="ed-doc__read" data-v-cc24cb8f>3 min read</span></h1><p class="ed-doc__lede" data-v-cc24cb8f> The Products &amp; Leads API lets a TPP retrieve publicly available banking products from participating LFIs and present them to a user. Products are fetched from each LFI individually and aggregated for display. No user consent or redirect is required — the TPP authenticates directly with a client credentials grant. </p><p class="ed-doc__lede" data-v-cc24cb8f> Once the user selects a product they have two options: <strong data-v-cc24cb8f>Apply Now</strong>, which directs them to the LFI using whichever application channel the LFI has configured, or <strong data-v-cc24cb8f>Request contact from bank</strong>, which submits a lead to the LFI on the user&#39;s behalf. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before calling the Products & Leads API",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before calling the Products &amp; Leads API, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before calling the Products & Leads API, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cc24cb8f${_scopeId2}><strong data-v-cc24cb8f${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-cc24cb8f${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-cc24cb8f${_scopeId2}>BDSP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-cc24cb8f${_scopeId2}>Roles</a>. </li><li data-v-cc24cb8f${_scopeId2}><strong data-v-cc24cb8f${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-cc24cb8f${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-cc24cb8f${_scopeId2}>mTLS communication</strong>. </li><li data-v-cc24cb8f${_scopeId2}><strong data-v-cc24cb8f${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-cc24cb8f${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework for client authentication. </li><li data-v-cc24cb8f${_scopeId2}><strong data-v-cc24cb8f${_scopeId2}>Understanding of <a href="/tech/tpp-standards/security/tokens/" data-v-cc24cb8f${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how client authentication works with <code data-v-cc24cb8f${_scopeId2}>private_key_jwt</code> before calling the token endpoint. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "BDSP role"),
                      createTextVNode(" as defined in "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                      createVNode("strong", null, "mTLS communication"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                      ]),
                      createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework for client authentication. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of "),
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                      ]),
                      createTextVNode(" — you should understand how client authentication works with "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" before calling the token endpoint. ")
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
                  createTextVNode("Before calling the Products & Leads API, ensure the following requirements are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                    createVNode("strong", null, "BDSP role"),
                    createTextVNode(" as defined in "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                    createVNode("strong", null, "mTLS communication"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                    ]),
                    createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework for client authentication. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of "),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                    ]),
                    createTextVNode(" — you should understand how client authentication works with "),
                    createVNode("code", null, "private_key_jwt"),
                    createTextVNode(" before calling the token endpoint. ")
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
        id: "sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end Products & Leads",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Products & Leads API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsProductsLeads, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsProductsLeads)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Products & Leads API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsProductsLeads)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "steps-1-2-token-per-lfi",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Steps 1 & 2 — Token request per LFI (in parallel)",
        title: "Get an access token from every LFI you intend to query",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each LFI has its own authorisation server, so the TPP must obtain a separate access token for every LFI it intends to query. Because the token endpoint and <code data-v-cc24cb8f${_scopeId2}>aud</code> claim differ per LFI, a new client assertion must also be built for each one. `);
                } else {
                  return [
                    createTextVNode(" Each LFI has its own authorisation server, so the TPP must obtain a separate access token for every LFI it intends to query. Because the token endpoint and "),
                    createVNode("code", null, "aud"),
                    createTextVNode(" claim differ per LFI, a new client assertion must also be built for each one. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` These calls should all be made in parallel — do not wait for one LFI&#39;s token before requesting the next. `);
                } else {
                  return [
                    createTextVNode(" These calls should all be made in parallel — do not wait for one LFI's token before requesting the next. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: tokenLoopTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-cc24cb8f${_scopeId2}>Client Assertion</a> for the full claims reference. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the full claims reference. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each LFI has its own authorisation server, so the TPP must obtain a separate access token for every LFI it intends to query. Because the token endpoint and "),
                  createVNode("code", null, "aud"),
                  createTextVNode(" claim differ per LFI, a new client assertion must also be built for each one. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" These calls should all be made in parallel — do not wait for one LFI's token before requesting the next. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: tokenLoopTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the full claims reference. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-get-products",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 3 — GET /products per LFI (in parallel)",
        title: "Aggregate the LFI catalogues for display",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-cc24cb8f${_scopeId}><span class="http-badge http-get" data-v-cc24cb8f${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-cc24cb8f${_scopeId}>/products</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With a token for each LFI, call <span class="endpoint" data-v-cc24cb8f${_scopeId2}><span class="http-method http-method--get" data-v-cc24cb8f${_scopeId2}>GET</span><code data-v-cc24cb8f${_scopeId2}>/products</code></span> for all of them simultaneously. Aggregate the results into a single list before presenting them to the user. `);
                } else {
                  return [
                    createTextVNode(" With a token for each LFI, call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/products")
                    ]),
                    createTextVNode(" for all of them simultaneously. Aggregate the results into a single list before presenting them to the user. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-cc24cb8f${_scopeId2}>x-fapi-interaction-id</code> and <code data-v-cc24cb8f${_scopeId2}>x-fapi-customer-ip-address</code> on every request. The <code data-v-cc24cb8f${_scopeId2}>x-fapi-customer-ip-address</code> header is required because <span class="endpoint" data-v-cc24cb8f${_scopeId2}><span class="http-method http-method--get" data-v-cc24cb8f${_scopeId2}>GET</span><code data-v-cc24cb8f${_scopeId2}>/products</code></span> can only be called while a customer is in a live session with the TPP. See <a href="/tech/tpp-standards/security/request-headers" data-v-cc24cb8f${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" on every request. The "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" header is required because "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/products")
                    ]),
                    createTextVNode(" can only be called while a customer is in a live session with the TPP. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each LFI&#39;s <code data-v-cc24cb8f${_scopeId2}>apiBase</code> is its API Hub resource server — <code data-v-cc24cb8f${_scopeId2}>https://rs1.&lt;lfiCode&gt;.apihub.openfinance.ae</code> (production) or <code data-v-cc24cb8f${_scopeId2}>https://rs1.&lt;lfiCode&gt;.sandbox.apihub.openfinance.ae</code> (sandbox). Resolve the <code data-v-cc24cb8f${_scopeId2}>&lt;lfiCode&gt;</code> from the <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-cc24cb8f${_scopeId2}>Trust Framework Directory</a>. See <a href="/tech/tpp-standards/trust-framework/api-resources" data-v-cc24cb8f${_scopeId2}>API Resources</a> for the full endpoint format. `);
                } else {
                  return [
                    createTextVNode(" Each LFI's "),
                    createVNode("code", null, "apiBase"),
                    createTextVNode(" is its API Hub resource server — "),
                    createVNode("code", null, "https://rs1.<lfiCode>.apihub.openfinance.ae"),
                    createTextVNode(" (production) or "),
                    createVNode("code", null, "https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae"),
                    createTextVNode(" (sandbox). Resolve the "),
                    createVNode("code", null, "<lfiCode>"),
                    createTextVNode(" from the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "Trust Framework Directory"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                    createTextVNode(" for the full endpoint format. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-cc24cb8f${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cc24cb8f${_scopeId2}><thead data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><th data-v-cc24cb8f${_scopeId2}>Parameter</th><th data-v-cc24cb8f${_scopeId2}>Type</th><th data-v-cc24cb8f${_scopeId2}>Description</th></tr></thead><tbody data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ProductCategory</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}>Filter by category — <code data-v-cc24cb8f${_scopeId2}>SavingsAccount</code>, <code data-v-cc24cb8f${_scopeId2}>CurrentAccount</code>, <code data-v-cc24cb8f${_scopeId2}>CreditCard</code>, <code data-v-cc24cb8f${_scopeId2}>Finance</code>, or <code data-v-cc24cb8f${_scopeId2}>Mortgage</code></td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>IsShariaCompliant</code></td><td data-v-cc24cb8f${_scopeId2}>boolean</td><td data-v-cc24cb8f${_scopeId2}>Filter to Sharia-compliant products only</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>LastUpdatedDateTime</code></td><td data-v-cc24cb8f${_scopeId2}>date-time</td><td data-v-cc24cb8f${_scopeId2}>Return only products updated after this timestamp</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>SortField</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}>Sort by <code data-v-cc24cb8f${_scopeId2}>LastUpdatedDateTime</code> (default) or <code data-v-cc24cb8f${_scopeId2}>ProductId</code></td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>SortOrder</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>asc</code> (default) or <code data-v-cc24cb8f${_scopeId2}>desc</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ProductCategory")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("Filter by category — "),
                            createVNode("code", null, "SavingsAccount"),
                            createTextVNode(", "),
                            createVNode("code", null, "CurrentAccount"),
                            createTextVNode(", "),
                            createVNode("code", null, "CreditCard"),
                            createTextVNode(", "),
                            createVNode("code", null, "Finance"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Mortgage")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsShariaCompliant")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Filter to Sharia-compliant products only")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LastUpdatedDateTime")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "Return only products updated after this timestamp")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SortField")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("Sort by "),
                            createVNode("code", null, "LastUpdatedDateTime"),
                            createTextVNode(" (default) or "),
                            createVNode("code", null, "ProductId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SortOrder")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createVNode("code", null, "asc"),
                            createTextVNode(" (default) or "),
                            createVNode("code", null, "desc")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: productsTabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-cc24cb8f${_scopeId}>Response structure</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Products are returned grouped by LFI. The <code data-v-cc24cb8f${_scopeId2}>Data</code> array groups products by <code data-v-cc24cb8f${_scopeId2}>LFIId</code>: `);
                } else {
                  return [
                    createTextVNode(" Products are returned grouped by LFI. The "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" array groups products by "),
                    createVNode("code", null, "LFIId"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: productsResponse,
              lang: "json",
              filename: "response body"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-cc24cb8f${_scopeId}>Application fields</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At least one of the following fields <strong data-v-cc24cb8f${_scopeId2}>must</strong> be returned by the LFI for every product. This determines how the TPP presents the page for the end user to apply for their selected product: `);
                } else {
                  return [
                    createTextVNode(" At least one of the following fields "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" be returned by the LFI for every product. This determines how the TPP presents the page for the end user to apply for their selected product: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cc24cb8f${_scopeId2}><thead data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><th data-v-cc24cb8f${_scopeId2}>Field</th><th data-v-cc24cb8f${_scopeId2}>Type</th><th data-v-cc24cb8f${_scopeId2}>Description</th></tr></thead><tbody data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationUri</code></td><td data-v-cc24cb8f${_scopeId2}>string &lt;uri&gt;</td><td data-v-cc24cb8f${_scopeId2}>A link to apply for the product.</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationPhoneNumber</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}>A phone number to apply for the product.</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationEmail</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}>An email address to apply for the product.</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationDescription</code></td><td data-v-cc24cb8f${_scopeId2}>string</td><td data-v-cc24cb8f${_scopeId2}>A free text description of the application process for the product, with ways to contact the LFI if applicable.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationUri")
                          ]),
                          createVNode("td", null, "string <uri>"),
                          createVNode("td", null, "A link to apply for the product.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationPhoneNumber")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "A phone number to apply for the product.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationEmail")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "An email address to apply for the product.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationDescription")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "A free text description of the application process for the product, with ways to contact the LFI if applicable.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Step 4 below covers how the TPP should respond to each of these fields when the user chooses to apply. `);
                } else {
                  return [
                    createTextVNode(" Step 4 below covers how the TPP should respond to each of these fields when the user chooses to apply. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Displaying products"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cc24cb8f${_scopeId2}> Use the LFI&#39;s logo and brand name from the Trust Framework Directory. Do not rank or order products based on commercial agreements with specific LFIs — ordering must reflect the user&#39;s own preferences. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Use the LFI's logo and brand name from the Trust Framework Directory. Do not rank or order products based on commercial agreements with specific LFIs — ordering must reflect the user's own preferences. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="./open-api/products" data-v-cc24cb8f${_scopeId2}>GET /products</a> API reference for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "./open-api/products" }, "GET /products"),
                    createTextVNode(" API reference for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/products")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With a token for each LFI, call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/products")
                  ]),
                  createTextVNode(" for all of them simultaneously. Aggregate the results into a single list before presenting them to the user. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(" on every request. The "),
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(" header is required because "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/products")
                  ]),
                  createTextVNode(" can only be called while a customer is in a live session with the TPP. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each LFI's "),
                  createVNode("code", null, "apiBase"),
                  createTextVNode(" is its API Hub resource server — "),
                  createVNode("code", null, "https://rs1.<lfiCode>.apihub.openfinance.ae"),
                  createTextVNode(" (production) or "),
                  createVNode("code", null, "https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae"),
                  createTextVNode(" (sandbox). Resolve the "),
                  createVNode("code", null, "<lfiCode>"),
                  createTextVNode(" from the "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "Trust Framework Directory"),
                  createTextVNode(". See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                  createTextVNode(" for the full endpoint format. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ProductCategory")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("Filter by category — "),
                          createVNode("code", null, "SavingsAccount"),
                          createTextVNode(", "),
                          createVNode("code", null, "CurrentAccount"),
                          createTextVNode(", "),
                          createVNode("code", null, "CreditCard"),
                          createTextVNode(", "),
                          createVNode("code", null, "Finance"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Mortgage")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsShariaCompliant")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Filter to Sharia-compliant products only")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LastUpdatedDateTime")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "Return only products updated after this timestamp")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SortField")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("Sort by "),
                          createVNode("code", null, "LastUpdatedDateTime"),
                          createTextVNode(" (default) or "),
                          createVNode("code", null, "ProductId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SortOrder")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createVNode("code", null, "asc"),
                          createTextVNode(" (default) or "),
                          createVNode("code", null, "desc")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: productsTabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response structure"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Products are returned grouped by LFI. The "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" array groups products by "),
                  createVNode("code", null, "LFIId"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: productsResponse,
                lang: "json",
                filename: "response body"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Application fields"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At least one of the following fields "),
                  createVNode("strong", null, "must"),
                  createTextVNode(" be returned by the LFI for every product. This determines how the TPP presents the page for the end user to apply for their selected product: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationUri")
                        ]),
                        createVNode("td", null, "string <uri>"),
                        createVNode("td", null, "A link to apply for the product.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationPhoneNumber")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "A phone number to apply for the product.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationEmail")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "An email address to apply for the product.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationDescription")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "A free text description of the application process for the product, with ways to contact the LFI if applicable.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Step 4 below covers how the TPP should respond to each of these fields when the user chooses to apply. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Displaying products"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Use the LFI's logo and brand name from the Trust Framework Directory. Do not rank or order products based on commercial agreements with specific LFIs — ordering must reflect the user's own preferences. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "./open-api/products" }, "GET /products"),
                  createTextVNode(" API reference for the full response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-apply-now",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 4 — Apply Now",
        title: "Channel the user to the LFI's application",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When a user selects a product and chooses to apply, the action depends on which application fields the LFI has populated. Check the fields in priority order: `);
                } else {
                  return [
                    createTextVNode(" When a user selects a product and chooses to apply, the action depends on which application fields the LFI has populated. Check the fields in priority order: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cc24cb8f${_scopeId2}><thead data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><th data-v-cc24cb8f${_scopeId2}>Field</th><th data-v-cc24cb8f${_scopeId2}>Present</th><th data-v-cc24cb8f${_scopeId2}>Action</th></tr></thead><tbody data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationUri</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>Redirect the user to this URL to complete the application on the LFI&#39;s own platform</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationPhoneNumber</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>Display the phone number for the user to call the LFI</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationEmail</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>Display the email address for the user to contact the LFI</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ApplicationDescription</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>Display the free-text description of the LFI&#39;s application process</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Present"),
                          createVNode("th", null, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationUri")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Redirect the user to this URL to complete the application on the LFI's own platform")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationPhoneNumber")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Display the phone number for the user to call the LFI")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationEmail")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Display the email address for the user to contact the LFI")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ApplicationDescription")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Display the free-text description of the LFI's application process")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` An LFI may provide more than one of these fields. <code data-v-cc24cb8f${_scopeId2}>ApplicationUri</code> is the preferred channel where available; the others provide fallback options for LFIs that do not have a direct online application. `);
                } else {
                  return [
                    createTextVNode(" An LFI may provide more than one of these fields. "),
                    createVNode("code", null, "ApplicationUri"),
                    createTextVNode(" is the preferred channel where available; the others provide fallback options for LFIs that do not have a direct online application. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When a user selects a product and chooses to apply, the action depends on which application fields the LFI has populated. Check the fields in priority order: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Present"),
                        createVNode("th", null, "Action")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationUri")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Redirect the user to this URL to complete the application on the LFI's own platform")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationPhoneNumber")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Display the phone number for the user to call the LFI")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationEmail")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Display the email address for the user to contact the LFI")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ApplicationDescription")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Display the free-text description of the LFI's application process")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" An LFI may provide more than one of these fields. "),
                  createVNode("code", null, "ApplicationUri"),
                  createTextVNode(" is the preferred channel where available; the others provide fallback options for LFIs that do not have a direct online application. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-5-post-leads",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Step 5 — POST /leads",
        title: "Submit a lead on the user's behalf",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-cc24cb8f${_scopeId}><span class="http-badge http-post" data-v-cc24cb8f${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-cc24cb8f${_scopeId}>/leads</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the user instead chooses to request that the LFI contact them, the TPP submits a lead. The API Hub forwards it to the LFI and does <strong data-v-cc24cb8f${_scopeId2}>not</strong> retain the data. `);
                } else {
                  return [
                    createTextVNode(" If the user instead chooses to request that the LFI contact them, the TPP submits a lead. The API Hub forwards it to the LFI and does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" retain the data. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` As with <span class="endpoint" data-v-cc24cb8f${_scopeId2}><span class="http-method http-method--get" data-v-cc24cb8f${_scopeId2}>GET</span><code data-v-cc24cb8f${_scopeId2}>/products</code></span>, include <code data-v-cc24cb8f${_scopeId2}>x-fapi-customer-ip-address</code> on every request — leads can only be submitted while a customer is in a live session with the TPP. `);
                } else {
                  return [
                    createTextVNode(" As with "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/products")
                    ]),
                    createTextVNode(", include "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(" on every request — leads can only be submitted while a customer is in a live session with the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: leadTabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-cc24cb8f${_scopeId}>Lead request fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cc24cb8f${_scopeId2}><thead data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><th data-v-cc24cb8f${_scopeId2}>Field</th><th data-v-cc24cb8f${_scopeId2}>Required</th><th data-v-cc24cb8f${_scopeId2}>Description</th></tr></thead><tbody data-v-cc24cb8f${_scopeId2}><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>Email</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>User&#39;s email address</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>EmiratesId</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>UAE Emirates ID number</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>MarketingOptOut</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>Whether the user has opted out of marketing communications</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ProductCategories</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>One or more product categories the user is interested in</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>Name</code></td><td data-v-cc24cb8f${_scopeId2}>Yes</td><td data-v-cc24cb8f${_scopeId2}>User&#39;s name — <code data-v-cc24cb8f${_scopeId2}>GivenName</code> + <code data-v-cc24cb8f${_scopeId2}>LastName</code>, <code data-v-cc24cb8f${_scopeId2}>FullName</code>, or <code data-v-cc24cb8f${_scopeId2}>BusinessName</code> for business accounts</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>PhoneNumber</code></td><td data-v-cc24cb8f${_scopeId2}>No</td><td data-v-cc24cb8f${_scopeId2}>E.164 format, e.g. <code data-v-cc24cb8f${_scopeId2}>+971501234567</code></td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>Nationality</code></td><td data-v-cc24cb8f${_scopeId2}>No</td><td data-v-cc24cb8f${_scopeId2}>ISO 3166-1 alpha-2 country code</td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>ResidentialAddress</code></td><td data-v-cc24cb8f${_scopeId2}>No</td><td data-v-cc24cb8f${_scopeId2}>Structured address including <code data-v-cc24cb8f${_scopeId2}>AddressLine</code>, <code data-v-cc24cb8f${_scopeId2}>Country</code>, and optionally UAE <code data-v-cc24cb8f${_scopeId2}>CountrySubDivision</code></td></tr><tr data-v-cc24cb8f${_scopeId2}><td data-v-cc24cb8f${_scopeId2}><code data-v-cc24cb8f${_scopeId2}>LeadInformation</code></td><td data-v-cc24cb8f${_scopeId2}>No</td><td data-v-cc24cb8f${_scopeId2}>Free-text notes about the lead</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Email")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "User's email address")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "EmiratesId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "UAE Emirates ID number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MarketingOptOut")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Whether the user has opted out of marketing communications")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ProductCategories")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "One or more product categories the user is interested in")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Name")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("User's name — "),
                            createVNode("code", null, "GivenName"),
                            createTextVNode(" + "),
                            createVNode("code", null, "LastName"),
                            createTextVNode(", "),
                            createVNode("code", null, "FullName"),
                            createTextVNode(", or "),
                            createVNode("code", null, "BusinessName"),
                            createTextVNode(" for business accounts")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PhoneNumber")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("E.164 format, e.g. "),
                            createVNode("code", null, "+971501234567")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Nationality")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "ISO 3166-1 alpha-2 country code")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ResidentialAddress")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Structured address including "),
                            createVNode("code", null, "AddressLine"),
                            createTextVNode(", "),
                            createVNode("code", null, "Country"),
                            createTextVNode(", and optionally UAE "),
                            createVNode("code", null, "CountrySubDivision")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LeadInformation")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Free-text notes about the lead")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "User consent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cc24cb8f${_scopeId2}> Only submit a lead when the user has explicitly opted in to being contacted by the LFI. The <code data-v-cc24cb8f${_scopeId2}>MarketingOptOut</code> field must accurately reflect the user&#39;s marketing preferences. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Only submit a lead when the user has explicitly opted in to being contacted by the LFI. The "),
                      createVNode("code", null, "MarketingOptOut"),
                      createTextVNode(" field must accurately reflect the user's marketing preferences. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="./open-api/leads" data-v-cc24cb8f${_scopeId2}>POST /leads</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "./open-api/leads" }, "POST /leads"),
                    createTextVNode(" API reference for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/leads")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the user instead chooses to request that the LFI contact them, the TPP submits a lead. The API Hub forwards it to the LFI and does "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" retain the data. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" As with "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/products")
                  ]),
                  createTextVNode(", include "),
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(" on every request — leads can only be submitted while a customer is in a live session with the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: leadTabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Lead request fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Email")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "User's email address")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "EmiratesId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "UAE Emirates ID number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MarketingOptOut")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Whether the user has opted out of marketing communications")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ProductCategories")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "One or more product categories the user is interested in")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Name")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("User's name — "),
                          createVNode("code", null, "GivenName"),
                          createTextVNode(" + "),
                          createVNode("code", null, "LastName"),
                          createTextVNode(", "),
                          createVNode("code", null, "FullName"),
                          createTextVNode(", or "),
                          createVNode("code", null, "BusinessName"),
                          createTextVNode(" for business accounts")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PhoneNumber")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("E.164 format, e.g. "),
                          createVNode("code", null, "+971501234567")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Nationality")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "ISO 3166-1 alpha-2 country code")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ResidentialAddress")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Structured address including "),
                          createVNode("code", null, "AddressLine"),
                          createTextVNode(", "),
                          createVNode("code", null, "Country"),
                          createTextVNode(", and optionally UAE "),
                          createVNode("code", null, "CountrySubDivision")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LeadInformation")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Free-text notes about the lead")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "User consent"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Only submit a lead when the user has explicitly opted in to being contacted by the LFI. The "),
                    createVNode("code", null, "MarketingOptOut"),
                    createTextVNode(" field must accurately reflect the user's marketing preferences. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "./open-api/leads" }, "POST /leads"),
                  createTextVNode(" API reference for the full request and response schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/products-leads/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc24cb8f"]]);
export {
  apiGuide as default
};
