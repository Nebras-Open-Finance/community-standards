import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
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
const permissionCheckNode = `import type { Request } from 'express'

const HUB_CONSENT_MANAGER_BASE = process.env.HUB_CONSENT_MANAGER_BASE!
// e.g. 'https://cm.altareq1.apihub.openfinance.ae'

// Option A — read from your local consent store.
// You populated it via /consent/event/{operation} during the consent-events
// flow at authorization time.
function readPermissionsLocal(consentId: string): ReadonlyArray<string> {
  const consent = consentStore.get(consentId)
  return consent.Permissions
}

// Option B — fetch the consent from the Hub's Consent Manager.
// Authenticate using your LFI's Ozone Connect JWT credentials.
async function readPermissionsFromHub(consentId: string): Promise<ReadonlyArray<string>> {
  const response = await fetch(
    \`\${HUB_CONSENT_MANAGER_BASE}/consents/\${consentId}\`,
    {
      headers: {
        Authorization: \`Bearer \${await getOzoneConnectJwt()}\`,
      },
    },
  )
  if (!response.ok) {
    throw new Error(\`Hub /consents/\${consentId} failed: \${response.status}\`)
  }
  const consent = await response.json()
  return consent.Permissions
}

// Pick whichever fits your architecture; both are first-class.
const readPermissions = readPermissionsLocal  // or readPermissionsFromHub

async function buildFinanceRates(
  req: Request,
  product: Product,
): Promise<AEProductFinanceRates | EncryptedFinanceRates | undefined> {
  const consentId = req.header('o3-consent-id')
  if (!consentId) {
    // Defensive — the Hub always sets this on Ozone Connect calls under a
    // consent. A missing header is a misconfiguration, not a customer issue.
    throw new Error('o3-consent-id header missing on Ozone Connect request')
  }

  const permissions = await readPermissions(consentId)

  // Gate the entire FinanceRates field on this single permission.
  if (!permissions.includes('ReadProductFinanceRates')) {
    // Omit the field entirely. Do not generate an OTP, do not deliver a code,
    // do not build a JWE — and do not return an empty object placeholder.
    return undefined
  }

  // Permission is present — choose between cleartext and the encrypted path
  // based on LFI policy for this product type.
  return shouldEncrypt(product)
    ? encryptedFinanceRatesFor(product)
    : product.financeRates
}
`;
const permissionCheckPython = `import os, httpx

HUB_CONSENT_MANAGER_BASE = os.environ["HUB_CONSENT_MANAGER_BASE"]
# e.g. 'https://cm.altareq1.apihub.openfinance.ae'


# Option A — read from your local consent store.
# You populated it via /consent/event/{operation} during the consent-events
# flow at authorization time.
def read_permissions_local(consent_id: str) -> list[str]:
    consent = consent_store.get(consent_id)
    return consent["Permissions"]


# Option B — fetch the consent from the Hub's Consent Manager.
# Authenticate using your LFI's Ozone Connect JWT credentials.
def read_permissions_from_hub(consent_id: str) -> list[str]:
    response = httpx.get(
        f"{HUB_CONSENT_MANAGER_BASE}/consents/{consent_id}",
        headers={"Authorization": f"Bearer {get_ozone_connect_jwt()}"},
    )
    response.raise_for_status()
    return response.json()["Permissions"]


# Pick whichever fits your architecture; both are first-class.
read_permissions = read_permissions_local  # or read_permissions_from_hub


def build_finance_rates(request, product):
    consent_id = request.headers.get("o3-consent-id")
    if not consent_id:
        # Defensive — the Hub always sets this on Ozone Connect calls under a
        # consent. A missing header is a misconfiguration, not a customer issue.
        raise RuntimeError("o3-consent-id header missing on Ozone Connect request")

    permissions = read_permissions(consent_id)

    # Gate the entire FinanceRates field on this single permission.
    if "ReadProductFinanceRates" not in permissions:
        # Omit the field entirely. Do not generate an OTP, do not deliver a code,
        # do not build a JWE — and do not return an empty object placeholder.
        return None

    # Permission is present — choose between cleartext and the encrypted path
    # based on LFI policy for this product type.
    return (
        encrypted_finance_rates_for(product)
        if should_encrypt(product)
        else product.finance_rates
    )
`;
const errorResponseExample = `HTTP/1.1 429 Too Many Requests
Retry-After: 60
x-fapi-interaction-id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
`;
const otpNode = `import crypto from 'node:crypto'

// 6-digit numeric OTP drawn from a cryptographically secure RNG.
// Range is [0, 999999]; pad to a fixed 6-character string so leading
// zeros are preserved when the customer reads the code.
function generateOtp(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
}
`;
const otpPython = `import secrets

# 6-digit numeric OTP drawn from a cryptographically secure RNG.
# Range is [0, 999999]; format to a fixed 6-character string so leading
# zeros are preserved when the customer reads the code.
def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"
`;
const smsTemplate = `{LFI_BRAND}: You requested your {PRODUCT_NAME} finance rate via {TPP_TRADING_NAME}. Your code is {OTP}. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`;
const smsExample = `ALTAREQ BANK: You requested your Platinum Credit Card finance rate via BudgetBuddy. Your code is 482915. Valid 30 min. If you didn't request this, ignore this message and never share this rate.
`;
const jweNode = `import { CompactEncrypt } from 'jose'

const JWE_TTL_SECONDS = 30 * 60  // 30 minutes — normative

async function encryptFinanceRates(
  rates: AEProductFinanceRates,
  otp: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // Wrap the cleartext rates with iat / exp so the TPP can show
  // a helpful "this code has expired" message after the window closes.
  const payload = JSON.stringify({
    FinanceRates: rates,
    iat: now,
    exp: now + JWE_TTL_SECONDS,
  })

  return await new CompactEncrypt(new TextEncoder().encode(payload))
    .setProtectedHeader({
      alg: 'PBES2-HS512+A256KW',  // key wrapping
      enc: 'A256GCM',              // content encryption
      p2c: 600_000,                // PBKDF2 iterations (OWASP 2023+ minimum for SHA-512)
      kid: 'OneTimeCode',          // signals to the TPP that the password is the OTP
    })
    .encrypt(new TextEncoder().encode(otp))
}
`;
const jwePython = `import base64, json, time
from jwcrypto import jwe as jwecrypto, jwk

JWE_TTL_SECONDS = 30 * 60  # 30 minutes — normative

def encrypt_finance_rates(rates: dict, otp: str) -> str:
    now = int(time.time())

    # Wrap the cleartext rates with iat / exp so the TPP can show
    # a helpful "this code has expired" message after the window closes.
    payload = json.dumps({
        "FinanceRates": rates,
        "iat":          now,
        "exp":          now + JWE_TTL_SECONDS,
    }).encode()

    # PBES2 uses the password bytes directly as input key material.
    key = jwk.JWK(
        kty="oct",
        k=base64.urlsafe_b64encode(otp.encode()).rstrip(b"=").decode(),
    )

    token = jwecrypto.JWE(
        plaintext=payload,
        protected={
            "alg": "PBES2-HS512+A256KW",
            "enc": "A256GCM",
            "p2c": 600_000,
            "kid": "OneTimeCode",
        },
    )
    token.add_recipient(key)
    return token.serialize(compact=True)
`;
const responseNode = `// Build the GET /accounts/{AccountId}/product response.
// Only the FinanceRates field is encrypted — every other field
// (Charges, DepositRates, Tenor, ProductName, ...) stays cleartext.
function buildProductResponse(
  account: Account,
  product: Product,
  encryptedFinanceRatesJwe: string | undefined,
) {
  return {
    Data: {
      Product: [
        {
          AccountId:     account.id,
          ProductId:     product.id,
          ProductType:   product.type,
          ProductName:   product.name,
          Charges:       product.charges,
          DepositRates:  product.depositRates,
          Tenor:         product.tenor,
          // FinanceRates is either the structured object (cleartext)
          // or the compact JWE string (encrypted). Never both, never null.
          FinanceRates:  encryptedFinanceRatesJwe ?? product.financeRates,
        },
      ],
    },
    Links: { Self: selfUrl(account, product) },
    Meta:  { TotalPages: 1 },
  }
}
`;
const responsePython = `# Build the GET /accounts/{AccountId}/product response.
# Only the FinanceRates field is encrypted — every other field
# (Charges, DepositRates, Tenor, ProductName, ...) stays cleartext.
def build_product_response(account, product, encrypted_finance_rates_jwe):
    return {
        "Data": {
            "Product": [
                {
                    "AccountId":     account.id,
                    "ProductId":     product.id,
                    "ProductType":   product.type,
                    "ProductName":   product.name,
                    "Charges":       product.charges,
                    "DepositRates":  product.deposit_rates,
                    "Tenor":         product.tenor,
                    # FinanceRates is either the structured object (cleartext)
                    # or the compact JWE string (encrypted). Never both, never null.
                    "FinanceRates":  encrypted_finance_rates_jwe or product.finance_rates,
                },
            ],
        },
        "Links": { "Self": self_url(account, product) },
        "Meta":  { "TotalPages": 1 },
    }
`;
const exampleProtectedHeader = `{
  "alg": "PBES2-HS512+A256KW",
  "enc": "A256GCM",
  "p2c": 600000,
  "p2s": "4kAX-NQVF8...",
  "kid": "OneTimeCode"
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "finance-rates",
  __ssrInlineRender: true,
  setup(__props) {
    const permissionCheckTabs = [{ label: "Node.js", lang: "typescript", code: permissionCheckNode }, { label: "Python", lang: "python", code: permissionCheckPython }];
    const otpTabs = [{ label: "Node.js", lang: "typescript", code: otpNode }, { label: "Python", lang: "python", code: otpPython }];
    const jweTabs = [{ label: "Node.js (jose)", lang: "typescript", code: jweNode }, { label: "Python (jwcrypto)", lang: "python", code: jwePython }];
    const responseTabs = [{ label: "Node.js", lang: "typescript", code: responseNode }, { label: "Python", lang: "python", code: responsePython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9279fdd4><section class="ed-doc__hero" data-v-9279fdd4><div class="ed-doc__inner" data-v-9279fdd4><div class="ed-doc__eyebrow" data-v-9279fdd4><span class="ed-doc__eyebrow-dash" data-v-9279fdd4></span> LFI · Banking · Bank Data Sharing · API Guide </div><h1 class="ed-doc__title" data-v-9279fdd4> Encrypted FinanceRates <span class="ed-doc__read" data-v-9279fdd4>7 min read</span></h1><p class="ed-doc__lede" data-v-9279fdd4> When a TPP holds the <code data-v-9279fdd4>ReadProductFinanceRates</code> permission and calls <code data-v-9279fdd4>GET /accounts/{AccountId}/product</code> for a credit card, finance, or mortgage product, the LFI MAY return the <code data-v-9279fdd4>FinanceRates</code> field as a JWE rather than a cleartext object. This guide covers how to generate the one-time code, deliver it to the customer, build the JWE, and rate-limit the endpoint so the customer&#39;s encrypted rates remain protected end-to-end. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when-to-encrypt",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When to encrypt",
        title: "Encryption is an LFI choice, scoped to one field",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> field on <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code></a> is defined as <code data-v-9279fdd4${_scopeId2}>anyOf</code> a structured <code data-v-9279fdd4${_scopeId2}>AEProductFinanceRates</code> object or an <code data-v-9279fdd4${_scopeId2}>AEJwe</code> compact string. LFIs MAY decide, per product, whether to return the rate in cleartext or as a JWE. Encryption is typically applied to credit cards, finance accounts, and mortgages where the finance rate is commercially sensitive; deposit account interest rates are returned in cleartext. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" field on "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" }, [
                      createVNode("code", null, "GET /accounts/{AccountId}/product")
                    ]),
                    createTextVNode(" is defined as "),
                    createVNode("code", null, "anyOf"),
                    createTextVNode(" a structured "),
                    createVNode("code", null, "AEProductFinanceRates"),
                    createTextVNode(" object or an "),
                    createVNode("code", null, "AEJwe"),
                    createTextVNode(" compact string. LFIs MAY decide, per product, whether to return the rate in cleartext or as a JWE. Encryption is typically applied to credit cards, finance accounts, and mortgages where the finance rate is commercially sensitive; deposit account interest rates are returned in cleartext. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9279fdd4${_scopeId2}> The LFI MUST NOT encrypt any field other than <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> on this endpoint. <code data-v-9279fdd4${_scopeId2}>Charges</code>, <code data-v-9279fdd4${_scopeId2}>DepositRates</code>, <code data-v-9279fdd4${_scopeId2}>ProductName</code>, <code data-v-9279fdd4${_scopeId2}>Tenor</code>, and every other property stay cleartext on both the encrypted and unencrypted shapes. </li><li data-v-9279fdd4${_scopeId2}> The LFI MUST NOT encrypt any data from any other Open Finance endpoint — this mechanism exists solely for <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> on <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code>. </li><li data-v-9279fdd4${_scopeId2}> A single LFI MAY choose to encrypt for some product types and not others. The TPP detects the shape at runtime by checking whether <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> is an object or a string — the LFI does not need to advertise its choice ahead of time. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" The LFI MUST NOT encrypt any field other than "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" on this endpoint. "),
                      createVNode("code", null, "Charges"),
                      createTextVNode(", "),
                      createVNode("code", null, "DepositRates"),
                      createTextVNode(", "),
                      createVNode("code", null, "ProductName"),
                      createTextVNode(", "),
                      createVNode("code", null, "Tenor"),
                      createTextVNode(", and every other property stay cleartext on both the encrypted and unencrypted shapes. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" The LFI MUST NOT encrypt any data from any other Open Finance endpoint — this mechanism exists solely for "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" on "),
                      createVNode("code", null, "GET /accounts/{AccountId}/product"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" A single LFI MAY choose to encrypt for some product types and not others. The TPP detects the shape at runtime by checking whether "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" is an object or a string — the LFI does not need to advertise its choice ahead of time. ")
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
                  createTextVNode(" The "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" field on "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" }, [
                    createVNode("code", null, "GET /accounts/{AccountId}/product")
                  ]),
                  createTextVNode(" is defined as "),
                  createVNode("code", null, "anyOf"),
                  createTextVNode(" a structured "),
                  createVNode("code", null, "AEProductFinanceRates"),
                  createTextVNode(" object or an "),
                  createVNode("code", null, "AEJwe"),
                  createTextVNode(" compact string. LFIs MAY decide, per product, whether to return the rate in cleartext or as a JWE. Encryption is typically applied to credit cards, finance accounts, and mortgages where the finance rate is commercially sensitive; deposit account interest rates are returned in cleartext. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" The LFI MUST NOT encrypt any field other than "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" on this endpoint. "),
                    createVNode("code", null, "Charges"),
                    createTextVNode(", "),
                    createVNode("code", null, "DepositRates"),
                    createTextVNode(", "),
                    createVNode("code", null, "ProductName"),
                    createTextVNode(", "),
                    createVNode("code", null, "Tenor"),
                    createTextVNode(", and every other property stay cleartext on both the encrypted and unencrypted shapes. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" The LFI MUST NOT encrypt any data from any other Open Finance endpoint — this mechanism exists solely for "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" on "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" A single LFI MAY choose to encrypt for some product types and not others. The TPP detects the shape at runtime by checking whether "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is an object or a string — the LFI does not need to advertise its choice ahead of time. ")
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
        id: "flow-overview",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Flow overview",
        title: "Three things happen on every encrypted call",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Generate a one-time code (OTP)</strong> — a fresh, cryptographically random numeric code, scoped to this single call. </li><li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Deliver the OTP to the customer</strong> — the LFI actively pushes the code to the customer on a channel it controls (SMS, email, or a push notification in the LFI&#39;s mobile banking app). The customer is sent the code; they never have to go and retrieve it. </li><li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Encrypt the cleartext <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> as a JWE with the OTP as the password</strong> and substitute the JWE string for the cleartext object in the response body. The cleartext rates never leave the LFI. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Generate a one-time code (OTP)"),
                      createTextVNode(" — a fresh, cryptographically random numeric code, scoped to this single call. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Deliver the OTP to the customer"),
                      createTextVNode(" — the LFI actively pushes the code to the customer on a channel it controls (SMS, email, or a push notification in the LFI's mobile banking app). The customer is sent the code; they never have to go and retrieve it. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Encrypt the cleartext "),
                        createVNode("code", null, "FinanceRates"),
                        createTextVNode(" as a JWE with the OTP as the password")
                      ]),
                      createTextVNode(" and substitute the JWE string for the cleartext object in the response body. The cleartext rates never leave the LFI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because the OTP is the decryption key, the customer reading the code the LFI sent them and typing it into the TPP application is exactly what makes the rate visible. The TPP server never sees the OTP, and the LFI never sees the TPP&#39;s decryption code. The customer is the only party that holds both the JWE (via the TPP) and the key (delivered by the LFI). `);
                } else {
                  return [
                    createTextVNode(" Because the OTP is the decryption key, the customer reading the code the LFI sent them and typing it into the TPP application is exactly what makes the rate visible. The TPP server never sees the OTP, and the LFI never sees the TPP's decryption code. The customer is the only party that holds both the JWE (via the TPP) and the key (delivered by the LFI). ")
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
                    createVNode("strong", null, "Generate a one-time code (OTP)"),
                    createTextVNode(" — a fresh, cryptographically random numeric code, scoped to this single call. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Deliver the OTP to the customer"),
                    createTextVNode(" — the LFI actively pushes the code to the customer on a channel it controls (SMS, email, or a push notification in the LFI's mobile banking app). The customer is sent the code; they never have to go and retrieve it. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Encrypt the cleartext "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" as a JWE with the OTP as the password")
                    ]),
                    createTextVNode(" and substitute the JWE string for the cleartext object in the response body. The cleartext rates never leave the LFI. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Because the OTP is the decryption key, the customer reading the code the LFI sent them and typing it into the TPP application is exactly what makes the rate visible. The TPP server never sees the OTP, and the LFI never sees the TPP's decryption code. The customer is the only party that holds both the JWE (via the TPP) and the key (delivered by the LFI). ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-permission",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1 — Check the consent permission first",
        title: "No ReadProductFinanceRates → omit the field entirely",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before doing anything else — before deciding to encrypt, before generating an OTP, before delivering the code, before building a JWE — the LFI MUST check that the consent underlying this request includes <code data-v-9279fdd4${_scopeId2}>ReadProductFinanceRates</code>. If the permission is absent, the LFI MUST omit the <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> field from the response entirely. The rest of the product payload (<code data-v-9279fdd4${_scopeId2}>Charges</code>, <code data-v-9279fdd4${_scopeId2}>DepositRates</code>, <code data-v-9279fdd4${_scopeId2}>ProductName</code>, etc.) is returned as usual. `);
                } else {
                  return [
                    createTextVNode(" Before doing anything else — before deciding to encrypt, before generating an OTP, before delivering the code, before building a JWE — the LFI MUST check that the consent underlying this request includes "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(". If the permission is absent, the LFI MUST omit the "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" field from the response entirely. The rest of the product payload ("),
                    createVNode("code", null, "Charges"),
                    createTextVNode(", "),
                    createVNode("code", null, "DepositRates"),
                    createTextVNode(", "),
                    createVNode("code", null, "ProductName"),
                    createTextVNode(", etc.) is returned as usual. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>How to read the permission</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub sets the <code data-v-9279fdd4${_scopeId2}>o3-consent-id</code> header on every Ozone Connect call made under a consent. That ID identifies the consent the customer authorised; the LFI&#39;s job is to retrieve the consent, read the <code data-v-9279fdd4${_scopeId2}>Permissions</code> array off it, and check that <code data-v-9279fdd4${_scopeId2}>ReadProductFinanceRates</code> is present. The LFI does NOT re-validate the access token — that is the Hub&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" The API Hub sets the "),
                    createVNode("code", null, "o3-consent-id"),
                    createTextVNode(" header on every Ozone Connect call made under a consent. That ID identifies the consent the customer authorised; the LFI's job is to retrieve the consent, read the "),
                    createVNode("code", null, "Permissions"),
                    createTextVNode(" array off it, and check that "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" is present. The LFI does NOT re-validate the access token — that is the Hub's responsibility. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` There are two valid ways to obtain the consent record. Pick whichever fits your architecture; both are first-class: `);
                } else {
                  return [
                    createTextVNode(" There are two valid ways to obtain the consent record. Pick whichever fits your architecture; both are first-class: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9279fdd4${_scopeId2}><thead data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><th data-v-9279fdd4${_scopeId2}>Option</th><th data-v-9279fdd4${_scopeId2}>How it works</th><th data-v-9279fdd4${_scopeId2}>When to choose it</th></tr></thead><tbody data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>A — Local consent store</strong></td><td data-v-9279fdd4${_scopeId2}>The LFI persists consent records locally as the Hub calls <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>/consent/event/{operation}</code></a> during the consent-events flow at authorization. At request time the LFI looks up the consent by ID in its own store.</td><td data-v-9279fdd4${_scopeId2}>You already maintain a consent table for revocation handling, account-list patching, or customer attribution. Lowest per-request latency.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>B — Fetch from the Hub</strong></td><td data-v-9279fdd4${_scopeId2}>The LFI calls <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>GET /consents/{consentId}</code></a> on the Hub&#39;s Consent Manager (<code data-v-9279fdd4${_scopeId2}>https://cm.{LFICODE}.apihub.openfinance.ae</code>) to fetch the consent on demand. The response includes the <code data-v-9279fdd4${_scopeId2}>Permissions</code> array.</td><td data-v-9279fdd4${_scopeId2}>You do not maintain a local consent store, or you do but treat the Hub as the source of truth. Adds one Hub round-trip per request unless you cache the response.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Option"),
                          createVNode("th", null, "How it works"),
                          createVNode("th", null, "When to choose it")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "A — Local consent store")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The LFI persists consent records locally as the Hub calls "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" }, [
                              createVNode("code", null, "/consent/event/{operation}")
                            ]),
                            createTextVNode(" during the consent-events flow at authorization. At request time the LFI looks up the consent by ID in its own store.")
                          ]),
                          createVNode("td", null, "You already maintain a consent table for revocation handling, account-list patching, or customer attribution. Lowest per-request latency.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "B — Fetch from the Hub")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The LFI calls "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" }, [
                              createVNode("code", null, "GET /consents/{consentId}")
                            ]),
                            createTextVNode(" on the Hub's Consent Manager ("),
                            createVNode("code", null, "https://cm.{LFICODE}.apihub.openfinance.ae"),
                            createTextVNode(") to fetch the consent on demand. The response includes the "),
                            createVNode("code", null, "Permissions"),
                            createTextVNode(" array.")
                          ]),
                          createVNode("td", null, "You do not maintain a local consent store, or you do but treat the Hub as the source of truth. Adds one Hub round-trip per request unless you cache the response.")
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
                  _push3(` Whichever option you use, the check itself is the same: <code data-v-9279fdd4${_scopeId2}>permissions.includes(&#39;ReadProductFinanceRates&#39;)</code>. If false — omit <code data-v-9279fdd4${_scopeId2}>FinanceRates</code>. If true — proceed to the cleartext or encrypted path based on LFI policy for the product type. `);
                } else {
                  return [
                    createTextVNode(" Whichever option you use, the check itself is the same: "),
                    createVNode("code", null, "permissions.includes('ReadProductFinanceRates')"),
                    createTextVNode(". If false — omit "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(". If true — proceed to the cleartext or encrypted path based on LFI policy for the product type. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Caching the Hub response (Option B)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The Hub&#39;s <code data-v-9279fdd4${_scopeId2}>GET /consents/{consentId}</code> response is safe to cache for the lifetime of the consent — the <code data-v-9279fdd4${_scopeId2}>Permissions</code> array is set at authorization and never mutates. Cache invalidation comes from the consent-events flow: when the Hub notifies your <code data-v-9279fdd4${_scopeId2}>/consent/event/{operation}</code> endpoint that a consent has been revoked or modified, drop the cached entry. A short positive TTL (e.g. 5 minutes) is a reasonable defence against missed events. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Hub's "),
                      createVNode("code", null, "GET /consents/{consentId}"),
                      createTextVNode(" response is safe to cache for the lifetime of the consent — the "),
                      createVNode("code", null, "Permissions"),
                      createTextVNode(" array is set at authorization and never mutates. Cache invalidation comes from the consent-events flow: when the Hub notifies your "),
                      createVNode("code", null, "/consent/event/{operation}"),
                      createTextVNode(" endpoint that a consent has been revoked or modified, drop the cached entry. A short positive TTL (e.g. 5 minutes) is a reasonable defence against missed events. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9279fdd4${_scopeId2}> The check applies equally to the cleartext and encrypted paths. If <code data-v-9279fdd4${_scopeId2}>ReadProductFinanceRates</code> is missing, the LFI MUST NOT return cleartext rates and MUST NOT trigger the code-generation, delivery, or JWE flow. </li><li data-v-9279fdd4${_scopeId2}> When the field is omitted, do not substitute <code data-v-9279fdd4${_scopeId2}>null</code>, an empty object, or a placeholder JWE. The <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> key simply does not appear on the <code data-v-9279fdd4${_scopeId2}>Product</code> object. </li><li data-v-9279fdd4${_scopeId2}> The same <code data-v-9279fdd4${_scopeId2}>o3-consent-id</code> header is used to attribute the call for logging, rate-limit accounting (<a href="#rate-limits" data-v-9279fdd4${_scopeId2}>Step 6</a>), and audit. Read it once and carry it through the request handler. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" The check applies equally to the cleartext and encrypted paths. If "),
                      createVNode("code", null, "ReadProductFinanceRates"),
                      createTextVNode(" is missing, the LFI MUST NOT return cleartext rates and MUST NOT trigger the code-generation, delivery, or JWE flow. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" When the field is omitted, do not substitute "),
                      createVNode("code", null, "null"),
                      createTextVNode(", an empty object, or a placeholder JWE. The "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" key simply does not appear on the "),
                      createVNode("code", null, "Product"),
                      createTextVNode(" object. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" The same "),
                      createVNode("code", null, "o3-consent-id"),
                      createTextVNode(" header is used to attribute the call for logging, rate-limit accounting ("),
                      createVNode("a", { href: "#rate-limits" }, "Step 6"),
                      createTextVNode("), and audit. Read it once and carry it through the request handler. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: permissionCheckTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Delivering a code is costly and customer-visible"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> Delivering an OTP for a request that should not have received <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> in the first place is both wasteful and confusing for the customer (they receive a code for a value the TPP cannot legitimately show). Putting the permission check first eliminates this class of bug entirely. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Delivering an OTP for a request that should not have received "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" in the first place is both wasteful and confusing for the customer (they receive a code for a value the TPP cannot legitimately show). Putting the permission check first eliminates this class of bug entirely. ")
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
                  createTextVNode(" Before doing anything else — before deciding to encrypt, before generating an OTP, before delivering the code, before building a JWE — the LFI MUST check that the consent underlying this request includes "),
                  createVNode("code", null, "ReadProductFinanceRates"),
                  createTextVNode(". If the permission is absent, the LFI MUST omit the "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" field from the response entirely. The rest of the product payload ("),
                  createVNode("code", null, "Charges"),
                  createTextVNode(", "),
                  createVNode("code", null, "DepositRates"),
                  createTextVNode(", "),
                  createVNode("code", null, "ProductName"),
                  createTextVNode(", etc.) is returned as usual. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "How to read the permission"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub sets the "),
                  createVNode("code", null, "o3-consent-id"),
                  createTextVNode(" header on every Ozone Connect call made under a consent. That ID identifies the consent the customer authorised; the LFI's job is to retrieve the consent, read the "),
                  createVNode("code", null, "Permissions"),
                  createTextVNode(" array off it, and check that "),
                  createVNode("code", null, "ReadProductFinanceRates"),
                  createTextVNode(" is present. The LFI does NOT re-validate the access token — that is the Hub's responsibility. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" There are two valid ways to obtain the consent record. Pick whichever fits your architecture; both are first-class: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Option"),
                        createVNode("th", null, "How it works"),
                        createVNode("th", null, "When to choose it")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "A — Local consent store")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The LFI persists consent records locally as the Hub calls "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" }, [
                            createVNode("code", null, "/consent/event/{operation}")
                          ]),
                          createTextVNode(" during the consent-events flow at authorization. At request time the LFI looks up the consent by ID in its own store.")
                        ]),
                        createVNode("td", null, "You already maintain a consent table for revocation handling, account-list patching, or customer attribution. Lowest per-request latency.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "B — Fetch from the Hub")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The LFI calls "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" }, [
                            createVNode("code", null, "GET /consents/{consentId}")
                          ]),
                          createTextVNode(" on the Hub's Consent Manager ("),
                          createVNode("code", null, "https://cm.{LFICODE}.apihub.openfinance.ae"),
                          createTextVNode(") to fetch the consent on demand. The response includes the "),
                          createVNode("code", null, "Permissions"),
                          createTextVNode(" array.")
                        ]),
                        createVNode("td", null, "You do not maintain a local consent store, or you do but treat the Hub as the source of truth. Adds one Hub round-trip per request unless you cache the response.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whichever option you use, the check itself is the same: "),
                  createVNode("code", null, "permissions.includes('ReadProductFinanceRates')"),
                  createTextVNode(". If false — omit "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(". If true — proceed to the cleartext or encrypted path based on LFI policy for the product type. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Caching the Hub response (Option B)"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Hub's "),
                    createVNode("code", null, "GET /consents/{consentId}"),
                    createTextVNode(" response is safe to cache for the lifetime of the consent — the "),
                    createVNode("code", null, "Permissions"),
                    createTextVNode(" array is set at authorization and never mutates. Cache invalidation comes from the consent-events flow: when the Hub notifies your "),
                    createVNode("code", null, "/consent/event/{operation}"),
                    createTextVNode(" endpoint that a consent has been revoked or modified, drop the cached entry. A short positive TTL (e.g. 5 minutes) is a reasonable defence against missed events. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" The check applies equally to the cleartext and encrypted paths. If "),
                    createVNode("code", null, "ReadProductFinanceRates"),
                    createTextVNode(" is missing, the LFI MUST NOT return cleartext rates and MUST NOT trigger the code-generation, delivery, or JWE flow. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" When the field is omitted, do not substitute "),
                    createVNode("code", null, "null"),
                    createTextVNode(", an empty object, or a placeholder JWE. The "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" key simply does not appear on the "),
                    createVNode("code", null, "Product"),
                    createTextVNode(" object. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" The same "),
                    createVNode("code", null, "o3-consent-id"),
                    createTextVNode(" header is used to attribute the call for logging, rate-limit accounting ("),
                    createVNode("a", { href: "#rate-limits" }, "Step 6"),
                    createTextVNode("), and audit. Read it once and carry it through the request handler. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: permissionCheckTabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Delivering a code is costly and customer-visible"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Delivering an OTP for a request that should not have received "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" in the first place is both wasteful and confusing for the customer (they receive a code for a value the TPP cannot legitimately show). Putting the permission check first eliminates this class of bug entirely. ")
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
        id: "step-2-otp",
        num: "04",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 2 — Generate the OTP",
        title: "A fresh 6-digit code per request",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each call to <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code> that returns encrypted <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> MUST mint a new OTP. The OTP is bound to a single JWE for the full 30-minute display window — the TPP MAY re-decrypt the same JWE multiple times with the same OTP within that window, but a new call to the endpoint MUST produce a fresh OTP and a fresh JWE. `);
                } else {
                  return [
                    createTextVNode(" Each call to "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" that returns encrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" MUST mint a new OTP. The OTP is bound to a single JWE for the full 30-minute display window — the TPP MAY re-decrypt the same JWE multiple times with the same OTP within that window, but a new call to the endpoint MUST produce a fresh OTP and a fresh JWE. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9279fdd4${_scopeId2}><thead data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><th data-v-9279fdd4${_scopeId2}>Property</th><th data-v-9279fdd4${_scopeId2}>Requirement</th></tr></thead><tbody data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Format</td><td data-v-9279fdd4${_scopeId2}>6 digits, numeric. Leading zeros MUST be preserved in transit.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Source</td><td data-v-9279fdd4${_scopeId2}>Cryptographically secure RNG (e.g. <code data-v-9279fdd4${_scopeId2}>crypto.randomInt</code> in Node.js, <code data-v-9279fdd4${_scopeId2}>secrets.randbelow</code> in Python). MUST NOT use <code data-v-9279fdd4${_scopeId2}>Math.random</code>, the default <code data-v-9279fdd4${_scopeId2}>random</code> module, or any non-CSPRNG source.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Reusability</td><td data-v-9279fdd4${_scopeId2}>The OTP is reusable for decryption attempts within the 30-minute JWE window. A new call to <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code> MUST issue a fresh OTP, even if the previous JWE has not yet expired.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Storage</td><td data-v-9279fdd4${_scopeId2}>The OTP MUST NOT be persisted in cleartext at the LFI after the JWE has been built. Hold it only long enough to use it as the PBES2 password and deliver it to the customer, then discard.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Logging</td><td data-v-9279fdd4${_scopeId2}>The OTP MUST NOT appear in application logs, audit trails, request traces, monitoring tools, or any other system the LFI operates.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Property"),
                          createVNode("th", null, "Requirement")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Format"),
                          createVNode("td", null, "6 digits, numeric. Leading zeros MUST be preserved in transit.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Source"),
                          createVNode("td", null, [
                            createTextVNode("Cryptographically secure RNG (e.g. "),
                            createVNode("code", null, "crypto.randomInt"),
                            createTextVNode(" in Node.js, "),
                            createVNode("code", null, "secrets.randbelow"),
                            createTextVNode(" in Python). MUST NOT use "),
                            createVNode("code", null, "Math.random"),
                            createTextVNode(", the default "),
                            createVNode("code", null, "random"),
                            createTextVNode(" module, or any non-CSPRNG source.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Reusability"),
                          createVNode("td", null, [
                            createTextVNode("The OTP is reusable for decryption attempts within the 30-minute JWE window. A new call to "),
                            createVNode("code", null, "GET /accounts/{AccountId}/product"),
                            createTextVNode(" MUST issue a fresh OTP, even if the previous JWE has not yet expired.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Storage"),
                          createVNode("td", null, "The OTP MUST NOT be persisted in cleartext at the LFI after the JWE has been built. Hold it only long enough to use it as the PBES2 password and deliver it to the customer, then discard.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Logging"),
                          createVNode("td", null, "The OTP MUST NOT appear in application logs, audit trails, request traces, monitoring tools, or any other system the LFI operates.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: otpTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each call to "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" that returns encrypted "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" MUST mint a new OTP. The OTP is bound to a single JWE for the full 30-minute display window — the TPP MAY re-decrypt the same JWE multiple times with the same OTP within that window, but a new call to the endpoint MUST produce a fresh OTP and a fresh JWE. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Property"),
                        createVNode("th", null, "Requirement")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Format"),
                        createVNode("td", null, "6 digits, numeric. Leading zeros MUST be preserved in transit.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Source"),
                        createVNode("td", null, [
                          createTextVNode("Cryptographically secure RNG (e.g. "),
                          createVNode("code", null, "crypto.randomInt"),
                          createTextVNode(" in Node.js, "),
                          createVNode("code", null, "secrets.randbelow"),
                          createTextVNode(" in Python). MUST NOT use "),
                          createVNode("code", null, "Math.random"),
                          createTextVNode(", the default "),
                          createVNode("code", null, "random"),
                          createTextVNode(" module, or any non-CSPRNG source.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Reusability"),
                        createVNode("td", null, [
                          createTextVNode("The OTP is reusable for decryption attempts within the 30-minute JWE window. A new call to "),
                          createVNode("code", null, "GET /accounts/{AccountId}/product"),
                          createTextVNode(" MUST issue a fresh OTP, even if the previous JWE has not yet expired.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Storage"),
                        createVNode("td", null, "The OTP MUST NOT be persisted in cleartext at the LFI after the JWE has been built. Hold it only long enough to use it as the PBES2 password and deliver it to the customer, then discard.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Logging"),
                        createVNode("td", null, "The OTP MUST NOT appear in application logs, audit trails, request traces, monitoring tools, or any other system the LFI operates.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: otpTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-sms",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Step 3 — Deliver the OTP",
        title: "The LFI delivers the code on a channel it controls",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI MUST deliver the OTP to the customer directly, through a channel the LFI controls and the customer can reach without involving the TPP. The LFI chooses the channel: an SMS to the customer&#39;s registered mobile number, an email to their registered address, or a push notification or message in the LFI&#39;s own mobile banking app are all acceptable. The LFI MUST NOT deliver the OTP through the TPP — the entire point is that the TPP never holds the decryption key. `);
                } else {
                  return [
                    createTextVNode(" The LFI MUST deliver the OTP to the customer directly, through a channel the LFI controls and the customer can reach without involving the TPP. The LFI chooses the channel: an SMS to the customer's registered mobile number, an email to their registered address, or a push notification or message in the LFI's own mobile banking app are all acceptable. The LFI MUST NOT deliver the OTP through the TPP — the entire point is that the TPP never holds the decryption key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whichever channel the LFI uses, it MUST <em data-v-9279fdd4${_scopeId2}>actively deliver</em> the code to the customer — the customer must be sent the code, not asked to go and find it. A push notification that surfaces the code, or that deep-links the customer straight to it, meets this bar; a design that requires the customer to independently open the banking app and hunt for the code does not. The LFI provides the code to the customer; the customer never has to retrieve it. `);
                } else {
                  return [
                    createTextVNode(" Whichever channel the LFI uses, it MUST "),
                    createVNode("em", null, "actively deliver"),
                    createTextVNode(" the code to the customer — the customer must be sent the code, not asked to go and find it. A push notification that surfaces the code, or that deep-links the customer straight to it, meets this bar; a design that requires the customer to independently open the banking app and hunt for the code does not. The LFI provides the code to the customer; the customer never has to retrieve it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Provide the code — do not make the customer fetch it"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The customer is mid-journey in the TPP application, waiting for a code to arrive. The delivery channel MUST push the code to them. A model where the customer must leave that journey, authenticate somewhere else, and locate the code themselves is not acceptable — it breaks the flow and the customer cannot reasonably complete it. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The customer is mid-journey in the TPP application, waiting for a code to arrive. The delivery channel MUST push the code to them. A model where the customer must leave that journey, authenticate somewhere else, and locate the code themselves is not acceptable — it breaks the flow and the customer cannot reasonably complete it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>Message content requirements</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9279fdd4${_scopeId2}>The OTP itself.</li><li data-v-9279fdd4${_scopeId2}>The LFI&#39;s brand name as a recognisable sender or in the first line of the body, so the customer can identify who sent the message.</li><li data-v-9279fdd4${_scopeId2}>The TPP&#39;s <code data-v-9279fdd4${_scopeId2}>TradingName</code> (from the consent), so the customer knows which app to enter the code into. This is the part of the message the customer uses to bridge the LFI-sent message with the TPP-presented form.</li><li data-v-9279fdd4${_scopeId2}>The product name or a short product description, so the customer understands which rate they are about to view.</li><li data-v-9279fdd4${_scopeId2}>An expiry indication — &quot;Valid 30 min&quot; is the canonical wording.</li><li data-v-9279fdd4${_scopeId2}>An explicit anti-fraud line for the customer who did not start this journey — &quot;<em data-v-9279fdd4${_scopeId2}>If you didn&#39;t request this, ignore this message and never share this rate.</em>&quot; The wording matters: it tells an unsuspecting customer to disregard the message, and warns every customer never to read the code aloud to anyone — while leaving them free to type it into the TPP form themselves.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The OTP itself."),
                    createVNode("li", null, "The LFI's brand name as a recognisable sender or in the first line of the body, so the customer can identify who sent the message."),
                    createVNode("li", null, [
                      createTextVNode("The TPP's "),
                      createVNode("code", null, "TradingName"),
                      createTextVNode(" (from the consent), so the customer knows which app to enter the code into. This is the part of the message the customer uses to bridge the LFI-sent message with the TPP-presented form.")
                    ]),
                    createVNode("li", null, "The product name or a short product description, so the customer understands which rate they are about to view."),
                    createVNode("li", null, 'An expiry indication — "Valid 30 min" is the canonical wording.'),
                    createVNode("li", null, [
                      createTextVNode('An explicit anti-fraud line for the customer who did not start this journey — "'),
                      createVNode("em", null, "If you didn't request this, ignore this message and never share this rate."),
                      createTextVNode('" The wording matters: it tells an unsuspecting customer to disregard the message, and warns every customer never to read the code aloud to anyone — while leaving them free to type it into the TPP form themselves.')
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "What the LFI MUST NOT include"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The message MUST NOT include the cleartext finance rate, any link inviting the customer to continue their journey somewhere other than the TPP application, or any other product data beyond the brand, code, TPP name, product description, and expiry. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The message MUST NOT include the cleartext finance rate, any link inviting the customer to continue their journey somewhere other than the TPP application, or any other product data beyond the brand, code, TPP name, product description, and expiry. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>Message template</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A recommended template the LFI substitutes from the request context — the <code data-v-9279fdd4${_scopeId2}>TPP_TRADING_NAME</code> comes from the consent&#39;s TPP organisation registration, the <code data-v-9279fdd4${_scopeId2}>PRODUCT_NAME</code> from the product the call is for, and <code data-v-9279fdd4${_scopeId2}>OTP</code> from <a href="#step-2-otp" data-v-9279fdd4${_scopeId2}>Step 2</a>. The example is written for SMS; the same content requirements apply whatever channel the LFI delivers on: `);
                } else {
                  return [
                    createTextVNode(" A recommended template the LFI substitutes from the request context — the "),
                    createVNode("code", null, "TPP_TRADING_NAME"),
                    createTextVNode(" comes from the consent's TPP organisation registration, the "),
                    createVNode("code", null, "PRODUCT_NAME"),
                    createTextVNode(" from the product the call is for, and "),
                    createVNode("code", null, "OTP"),
                    createTextVNode(" from "),
                    createVNode("a", { href: "#step-2-otp" }, "Step 2"),
                    createTextVNode(". The example is written for SMS; the same content requirements apply whatever channel the LFI delivers on: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: smsTemplate,
              lang: "text",
              filename: "SMS template"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>Example SMS as the customer receives it</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: smsExample,
              lang: "text",
              filename: "example — ALTAREQ BANK to BudgetBuddy customer"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The wording is intentionally explicit about <em data-v-9279fdd4${_scopeId2}>where</em> the code is to be entered — the message arrives from the bank but the form sits inside the TPP application, and the customer needs to bridge those two contexts. Naming the TPP makes that connection. `);
                } else {
                  return [
                    createTextVNode(" The wording is intentionally explicit about "),
                    createVNode("em", null, "where"),
                    createTextVNode(" the code is to be entered — the message arrives from the bank but the form sits inside the TPP application, and the customer needs to bridge those two contexts. Naming the TPP makes that connection. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Localisation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The example above is English. LFIs SHOULD localise the message to the customer&#39;s registered language preference; in practice this usually means English alongside Arabic. The content requirements above apply to every localised variant. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The example above is English. LFIs SHOULD localise the message to the customer's registered language preference; in practice this usually means English alongside Arabic. The content requirements above apply to every localised variant. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI MUST deliver the OTP to the customer directly, through a channel the LFI controls and the customer can reach without involving the TPP. The LFI chooses the channel: an SMS to the customer's registered mobile number, an email to their registered address, or a push notification or message in the LFI's own mobile banking app are all acceptable. The LFI MUST NOT deliver the OTP through the TPP — the entire point is that the TPP never holds the decryption key. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whichever channel the LFI uses, it MUST "),
                  createVNode("em", null, "actively deliver"),
                  createTextVNode(" the code to the customer — the customer must be sent the code, not asked to go and find it. A push notification that surfaces the code, or that deep-links the customer straight to it, meets this bar; a design that requires the customer to independently open the banking app and hunt for the code does not. The LFI provides the code to the customer; the customer never has to retrieve it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Provide the code — do not make the customer fetch it"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The customer is mid-journey in the TPP application, waiting for a code to arrive. The delivery channel MUST push the code to them. A model where the customer must leave that journey, authenticate somewhere else, and locate the code themselves is not acceptable — it breaks the flow and the customer cannot reasonably complete it. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Message content requirements"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The OTP itself."),
                  createVNode("li", null, "The LFI's brand name as a recognisable sender or in the first line of the body, so the customer can identify who sent the message."),
                  createVNode("li", null, [
                    createTextVNode("The TPP's "),
                    createVNode("code", null, "TradingName"),
                    createTextVNode(" (from the consent), so the customer knows which app to enter the code into. This is the part of the message the customer uses to bridge the LFI-sent message with the TPP-presented form.")
                  ]),
                  createVNode("li", null, "The product name or a short product description, so the customer understands which rate they are about to view."),
                  createVNode("li", null, 'An expiry indication — "Valid 30 min" is the canonical wording.'),
                  createVNode("li", null, [
                    createTextVNode('An explicit anti-fraud line for the customer who did not start this journey — "'),
                    createVNode("em", null, "If you didn't request this, ignore this message and never share this rate."),
                    createTextVNode('" The wording matters: it tells an unsuspecting customer to disregard the message, and warns every customer never to read the code aloud to anyone — while leaving them free to type it into the TPP form themselves.')
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "What the LFI MUST NOT include"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The message MUST NOT include the cleartext finance rate, any link inviting the customer to continue their journey somewhere other than the TPP application, or any other product data beyond the brand, code, TPP name, product description, and expiry. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Message template"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A recommended template the LFI substitutes from the request context — the "),
                  createVNode("code", null, "TPP_TRADING_NAME"),
                  createTextVNode(" comes from the consent's TPP organisation registration, the "),
                  createVNode("code", null, "PRODUCT_NAME"),
                  createTextVNode(" from the product the call is for, and "),
                  createVNode("code", null, "OTP"),
                  createTextVNode(" from "),
                  createVNode("a", { href: "#step-2-otp" }, "Step 2"),
                  createTextVNode(". The example is written for SMS; the same content requirements apply whatever channel the LFI delivers on: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: smsTemplate,
                lang: "text",
                filename: "SMS template"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example SMS as the customer receives it"),
              createVNode(_component_EdCode, {
                code: smsExample,
                lang: "text",
                filename: "example — ALTAREQ BANK to BudgetBuddy customer"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The wording is intentionally explicit about "),
                  createVNode("em", null, "where"),
                  createTextVNode(" the code is to be entered — the message arrives from the bank but the form sits inside the TPP application, and the customer needs to bridge those two contexts. Naming the TPP makes that connection. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Localisation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The example above is English. LFIs SHOULD localise the message to the customer's registered language preference; in practice this usually means English alongside Arabic. The content requirements above apply to every localised variant. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-build-jwe",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Step 4 — Build the JWE",
        title: "PBES2-HS512+A256KW with the OTP as the password",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The cleartext <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> object is encrypted as a JOSE compact JWE using <strong data-v-9279fdd4${_scopeId2}>PBES2-HS512+A256KW</strong> for key wrapping and <strong data-v-9279fdd4${_scopeId2}>A256GCM</strong> for content encryption. PBES2 takes the OTP as a password and derives the content-encryption key inside the JWE library; the LFI never needs to handle key material directly. `);
                } else {
                  return [
                    createTextVNode(" The cleartext "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" object is encrypted as a JOSE compact JWE using "),
                    createVNode("strong", null, "PBES2-HS512+A256KW"),
                    createTextVNode(" for key wrapping and "),
                    createVNode("strong", null, "A256GCM"),
                    createTextVNode(" for content encryption. PBES2 takes the OTP as a password and derives the content-encryption key inside the JWE library; the LFI never needs to handle key material directly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9279fdd4${_scopeId2}><thead data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><th data-v-9279fdd4${_scopeId2}>JWE parameter</th><th data-v-9279fdd4${_scopeId2}>Value</th><th data-v-9279fdd4${_scopeId2}>Notes</th></tr></thead><tbody data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>alg</code></td><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>PBES2-HS512+A256KW</code></td><td data-v-9279fdd4${_scopeId2}>Key wrapping. PBES2 is the JOSE-native way to use a password (the OTP) as the input.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>enc</code></td><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>A256GCM</code></td><td data-v-9279fdd4${_scopeId2}>AES-256-GCM content encryption with a 96-bit IV. Authenticated encryption — tampering is detected on decrypt.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>p2c</code></td><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>600000</code> (minimum)</td><td data-v-9279fdd4${_scopeId2}>PBKDF2 iteration count. OWASP recommends at least 600,000 iterations for HMAC-SHA-512 as of 2023. Higher is acceptable.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>p2s</code></td><td data-v-9279fdd4${_scopeId2}>Generated by the JWE library</td><td data-v-9279fdd4${_scopeId2}>PBKDF2 salt. The library generates a fresh 16-byte salt per call and emits it in the protected header.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>kid</code></td><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>OneTimeCode</code></td><td data-v-9279fdd4${_scopeId2}>Signals to the TPP that the PBES2 password is the OTP entered by the customer, not a static key.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "JWE parameter"),
                          createVNode("th", null, "Value"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "alg")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "PBES2-HS512+A256KW")
                          ]),
                          createVNode("td", null, "Key wrapping. PBES2 is the JOSE-native way to use a password (the OTP) as the input.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "enc")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "A256GCM")
                          ]),
                          createVNode("td", null, "AES-256-GCM content encryption with a 96-bit IV. Authenticated encryption — tampering is detected on decrypt.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "p2c")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "600000"),
                            createTextVNode(" (minimum)")
                          ]),
                          createVNode("td", null, "PBKDF2 iteration count. OWASP recommends at least 600,000 iterations for HMAC-SHA-512 as of 2023. Higher is acceptable.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "p2s")
                          ]),
                          createVNode("td", null, "Generated by the JWE library"),
                          createVNode("td", null, "PBKDF2 salt. The library generates a fresh 16-byte salt per call and emits it in the protected header.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OneTimeCode")
                          ]),
                          createVNode("td", null, "Signals to the TPP that the PBES2 password is the OTP entered by the customer, not a static key.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>Resulting protected header (decoded)</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleProtectedHeader,
              lang: "json",
              filename: "example protected header"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>JWT-style expiry inside the JWE payload</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE&#39;s PBES2 envelope does not itself express an expiry, and the OTP does not stop working once 30 minutes have passed — a JWE and its OTP can technically be decrypted at any later time. The 30-minute limit is therefore not enforced by the cryptography. It is enforced by the <code data-v-9279fdd4${_scopeId2}>exp</code> claim the LFI embeds in the plaintext, which the TPP MUST honour, backed by the TPP&#39;s <em data-v-9279fdd4${_scopeId2}>Access Encrypted Resource Data</em> certification obligations. The LFI embeds <code data-v-9279fdd4${_scopeId2}>iat</code> and <code data-v-9279fdd4${_scopeId2}>exp</code> inside the JSON plaintext alongside the <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> object — so the TPP can stop displaying the rate and show a &quot;this code has expired&quot; message once the window closes — and MUST set <code data-v-9279fdd4${_scopeId2}>exp = iat + 1800</code> seconds exactly; longer windows are not permitted. `);
                } else {
                  return [
                    createTextVNode(" The JWE's PBES2 envelope does not itself express an expiry, and the OTP does not stop working once 30 minutes have passed — a JWE and its OTP can technically be decrypted at any later time. The 30-minute limit is therefore not enforced by the cryptography. It is enforced by the "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" claim the LFI embeds in the plaintext, which the TPP MUST honour, backed by the TPP's "),
                    createVNode("em", null, "Access Encrypted Resource Data"),
                    createTextVNode(" certification obligations. The LFI embeds "),
                    createVNode("code", null, "iat"),
                    createTextVNode(" and "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" inside the JSON plaintext alongside the "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(' object — so the TPP can stop displaying the rate and show a "this code has expired" message once the window closes — and MUST set '),
                    createVNode("code", null, "exp = iat + 1800"),
                    createTextVNode(" seconds exactly; longer windows are not permitted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: jweTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Never log the cleartext FinanceRates or the OTP"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The cleartext rate is the very thing this scheme exists to protect from accidental disclosure. Encryption MUST happen in process memory; the cleartext rate, the OTP, and the derived key material MUST NOT be written to logs, traces, dumps, or any storage tier. Treat them with the same hygiene as a customer&#39;s password. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The cleartext rate is the very thing this scheme exists to protect from accidental disclosure. Encryption MUST happen in process memory; the cleartext rate, the OTP, and the derived key material MUST NOT be written to logs, traces, dumps, or any storage tier. Treat them with the same hygiene as a customer's password. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The cleartext "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" object is encrypted as a JOSE compact JWE using "),
                  createVNode("strong", null, "PBES2-HS512+A256KW"),
                  createTextVNode(" for key wrapping and "),
                  createVNode("strong", null, "A256GCM"),
                  createTextVNode(" for content encryption. PBES2 takes the OTP as a password and derives the content-encryption key inside the JWE library; the LFI never needs to handle key material directly. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "JWE parameter"),
                        createVNode("th", null, "Value"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "alg")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "PBES2-HS512+A256KW")
                        ]),
                        createVNode("td", null, "Key wrapping. PBES2 is the JOSE-native way to use a password (the OTP) as the input.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "enc")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "A256GCM")
                        ]),
                        createVNode("td", null, "AES-256-GCM content encryption with a 96-bit IV. Authenticated encryption — tampering is detected on decrypt.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "p2c")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "600000"),
                          createTextVNode(" (minimum)")
                        ]),
                        createVNode("td", null, "PBKDF2 iteration count. OWASP recommends at least 600,000 iterations for HMAC-SHA-512 as of 2023. Higher is acceptable.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "p2s")
                        ]),
                        createVNode("td", null, "Generated by the JWE library"),
                        createVNode("td", null, "PBKDF2 salt. The library generates a fresh 16-byte salt per call and emits it in the protected header.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OneTimeCode")
                        ]),
                        createVNode("td", null, "Signals to the TPP that the PBES2 password is the OTP entered by the customer, not a static key.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Resulting protected header (decoded)"),
              createVNode(_component_EdCode, {
                code: exampleProtectedHeader,
                lang: "json",
                filename: "example protected header"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "JWT-style expiry inside the JWE payload"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE's PBES2 envelope does not itself express an expiry, and the OTP does not stop working once 30 minutes have passed — a JWE and its OTP can technically be decrypted at any later time. The 30-minute limit is therefore not enforced by the cryptography. It is enforced by the "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" claim the LFI embeds in the plaintext, which the TPP MUST honour, backed by the TPP's "),
                  createVNode("em", null, "Access Encrypted Resource Data"),
                  createTextVNode(" certification obligations. The LFI embeds "),
                  createVNode("code", null, "iat"),
                  createTextVNode(" and "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" inside the JSON plaintext alongside the "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(' object — so the TPP can stop displaying the rate and show a "this code has expired" message once the window closes — and MUST set '),
                  createVNode("code", null, "exp = iat + 1800"),
                  createTextVNode(" seconds exactly; longer windows are not permitted. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: jweTabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Never log the cleartext FinanceRates or the OTP"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The cleartext rate is the very thing this scheme exists to protect from accidental disclosure. Encryption MUST happen in process memory; the cleartext rate, the OTP, and the derived key material MUST NOT be written to logs, traces, dumps, or any storage tier. Treat them with the same hygiene as a customer's password. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-5-substitute",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Step 5 — Substitute FinanceRates in the response",
        title: "Swap the structured object for the JWE string",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The OpenAPI schema makes the response trivial to assemble: <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> is either an <code data-v-9279fdd4${_scopeId2}>AEProductFinanceRates</code> object or an <code data-v-9279fdd4${_scopeId2}>AEJwe</code> string. Replace the cleartext object with the compact JWE produced in <a href="#step-4-build-jwe" data-v-9279fdd4${_scopeId2}>Step 4</a> and leave every other field untouched. `);
                } else {
                  return [
                    createTextVNode(" The OpenAPI schema makes the response trivial to assemble: "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" is either an "),
                    createVNode("code", null, "AEProductFinanceRates"),
                    createTextVNode(" object or an "),
                    createVNode("code", null, "AEJwe"),
                    createTextVNode(" string. Replace the cleartext object with the compact JWE produced in "),
                    createVNode("a", { href: "#step-4-build-jwe" }, "Step 4"),
                    createTextVNode(" and leave every other field untouched. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: responseTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the corresponding <a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" data-v-9279fdd4${_scopeId2}>TPP API guide</a> for how the TPP detects the JWE shape, forwards it to the user&#39;s device, and decrypts using the OTP the customer types in. `);
                } else {
                  return [
                    createTextVNode(" See the corresponding "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "TPP API guide"),
                    createTextVNode(" for how the TPP detects the JWE shape, forwards it to the user's device, and decrypts using the OTP the customer types in. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The OpenAPI schema makes the response trivial to assemble: "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" is either an "),
                  createVNode("code", null, "AEProductFinanceRates"),
                  createTextVNode(" object or an "),
                  createVNode("code", null, "AEJwe"),
                  createTextVNode(" string. Replace the cleartext object with the compact JWE produced in "),
                  createVNode("a", { href: "#step-4-build-jwe" }, "Step 4"),
                  createTextVNode(" and leave every other field untouched. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: responseTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the corresponding "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates" }, "TPP API guide"),
                  createTextVNode(" for how the TPP detects the JWE shape, forwards it to the user's device, and decrypts using the OTP the customer types in. ")
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
        eyebrow: "Step 6 — Rate limits and the 429 response",
        title: "Reject the whole request when the limits are exceeded",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every call to <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code> that produces an encrypted <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> mints a fresh OTP and triggers a customer-facing message. The LFI MUST rate-limit these calls per consent per account so an abusive or buggy TPP cannot spam the customer. `);
                } else {
                  return [
                    createTextVNode(" Every call to "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" that produces an encrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" mints a fresh OTP and triggers a customer-facing message. The LFI MUST rate-limit these calls per consent per account so an abusive or buggy TPP cannot spam the customer. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>The limits</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9279fdd4${_scopeId2}><thead data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><th data-v-9279fdd4${_scopeId2}>Rule</th><th data-v-9279fdd4${_scopeId2}>Limit</th><th data-v-9279fdd4${_scopeId2}>Behaviour when exceeded</th></tr></thead><tbody data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Minimum interval between fresh OTPs</td><td data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>60 seconds</strong> per (consent, account) pair</td><td data-v-9279fdd4${_scopeId2}>Reject the whole request with <code data-v-9279fdd4${_scopeId2}>429 Too Many Requests</code>. The TPP surfaces a &quot;please wait&quot; message and lets the customer retry shortly.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Rolling 24-hour cap</td><td data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>12 fresh OTPs</strong> per (consent, account) pair</td><td data-v-9279fdd4${_scopeId2}>Reject the whole request with <code data-v-9279fdd4${_scopeId2}>429 Too Many Requests</code> until the rolling window admits a new call. Customer is told to try again later.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}>Re-decryption of an existing JWE</td><td data-v-9279fdd4${_scopeId2}>Not limited — decryption happens in the TPP browser and does not contact the LFI</td><td data-v-9279fdd4${_scopeId2}>n/a</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Rule"),
                          createVNode("th", null, "Limit"),
                          createVNode("th", null, "Behaviour when exceeded")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Minimum interval between fresh OTPs"),
                          createVNode("td", null, [
                            createVNode("strong", null, "60 seconds"),
                            createTextVNode(" per (consent, account) pair")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Reject the whole request with "),
                            createVNode("code", null, "429 Too Many Requests"),
                            createTextVNode('. The TPP surfaces a "please wait" message and lets the customer retry shortly.')
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Rolling 24-hour cap"),
                          createVNode("td", null, [
                            createVNode("strong", null, "12 fresh OTPs"),
                            createTextVNode(" per (consent, account) pair")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Reject the whole request with "),
                            createVNode("code", null, "429 Too Many Requests"),
                            createTextVNode(" until the rolling window admits a new call. Customer is told to try again later.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Re-decryption of an existing JWE"),
                          createVNode("td", null, "Not limited — decryption happens in the TPP browser and does not contact the LFI"),
                          createVNode("td", null, "n/a")
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
                  _push3(` These limits are LFI-enforced and apply only to the <code data-v-9279fdd4${_scopeId2}>FinanceRates</code>-encryption path. Cleartext calls to <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code> (for product types where the LFI does not encrypt) follow the standard rate limits documented elsewhere. `);
                } else {
                  return [
                    createTextVNode(" These limits are LFI-enforced and apply only to the "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode("-encryption path. Cleartext calls to "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" (for product types where the LFI does not encrypt) follow the standard rate limits documented elsewhere. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The 60-second minimum interval is the limit that matters most in practice: a delivered OTP can take a little while to reach the customer, so the interval simply stops a fresh code being minted before the previous one has had a chance to arrive. The rolling 24-hour cap leaves headroom for a TPP with a genuine reason to read a customer&#39;s finance rates several times through the day, and is kept under review as real-world usage patterns emerge. LFIs SHOULD treat it as a backstop against runaway message volume rather than a constraint legitimate traffic is expected to approach. `);
                } else {
                  return [
                    createTextVNode(" The 60-second minimum interval is the limit that matters most in practice: a delivered OTP can take a little while to reach the customer, so the interval simply stops a fresh code being minted before the previous one has had a chance to arrive. The rolling 24-hour cap leaves headroom for a TPP with a genuine reason to read a customer's finance rates several times through the day, and is kept under review as real-world usage patterns emerge. LFIs SHOULD treat it as a backstop against runaway message volume rather than a constraint legitimate traffic is expected to approach. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Counter key"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The counter is per (consent, account) pair, not per TPP and not per customer. A customer who holds multiple consents from different TPPs sees the limits applied independently per consent — one TPP&#39;s behaviour does not block another TPP&#39;s call. Within a single consent, a TPP that legitimately needs to read finance rates for several accounts gets a separate 24-hour budget per account. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The counter is per (consent, account) pair, not per TPP and not per customer. A customer who holds multiple consents from different TPPs sees the limits applied independently per consent — one TPP's behaviour does not block another TPP's call. Within a single consent, a TPP that legitimately needs to read finance rates for several accounts gets a separate 24-hour budget per account. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-9279fdd4${_scopeId}>The 429 response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When either limit would be breached, the LFI MUST <strong data-v-9279fdd4${_scopeId2}>reject the entire request</strong> rather than returning a partial response with <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> omitted. The customer is on the TPP&#39;s screen expecting a complete product view; the 429 is the signal the TPP needs to render a clear, actionable error rather than a silently degraded payload. `);
                } else {
                  return [
                    createTextVNode(" When either limit would be breached, the LFI MUST "),
                    createVNode("strong", null, "reject the entire request"),
                    createTextVNode(" rather than returning a partial response with "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" omitted. The customer is on the TPP's screen expecting a complete product view; the 429 is the signal the TPP needs to render a clear, actionable error rather than a silently degraded payload. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response uses the same <code data-v-9279fdd4${_scopeId2}>429Error</code> envelope already defined for <code data-v-9279fdd4${_scopeId2}>GET /accounts/{AccountId}/product</code> in the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" data-v-9279fdd4${_scopeId2}> OpenAPI specification</a> — HTTP <code data-v-9279fdd4${_scopeId2}>429</code>, no response body, two headers: `);
                } else {
                  return [
                    createTextVNode(" The response uses the same "),
                    createVNode("code", null, "429Error"),
                    createTextVNode(" envelope already defined for "),
                    createVNode("code", null, "GET /accounts/{AccountId}/product"),
                    createTextVNode(" in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" }, " OpenAPI specification"),
                    createTextVNode(" — HTTP "),
                    createVNode("code", null, "429"),
                    createTextVNode(", no response body, two headers: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: errorResponseExample,
              lang: "http",
              filename: "429 response — LFI to API Hub"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9279fdd4${_scopeId2}><thead data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><th data-v-9279fdd4${_scopeId2}>Header</th><th data-v-9279fdd4${_scopeId2}>Required</th><th data-v-9279fdd4${_scopeId2}>Value</th></tr></thead><tbody data-v-9279fdd4${_scopeId2}><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>Retry-After</code></td><td data-v-9279fdd4${_scopeId2}>MUST</td><td data-v-9279fdd4${_scopeId2}>Integer seconds until the next request would succeed. For the minimum-interval breach this is the seconds remaining in the 60-second cooldown; for the daily cap this is the seconds until the rolling window admits a new call.</td></tr><tr data-v-9279fdd4${_scopeId2}><td data-v-9279fdd4${_scopeId2}><code data-v-9279fdd4${_scopeId2}>x-fapi-interaction-id</code></td><td data-v-9279fdd4${_scopeId2}>MUST</td><td data-v-9279fdd4${_scopeId2}>The same UUID the TPP sent on the request, echoed back so the TPP can correlate the rejection with its outbound call.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Retry-After")
                          ]),
                          createVNode("td", null, "MUST"),
                          createVNode("td", null, "Integer seconds until the next request would succeed. For the minimum-interval breach this is the seconds remaining in the 60-second cooldown; for the daily cap this is the seconds until the rolling window admits a new call.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-fapi-interaction-id")
                          ]),
                          createVNode("td", null, "MUST"),
                          createVNode("td", null, "The same UUID the TPP sent on the request, echoed back so the TPP can correlate the rejection with its outbound call.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "The Hub passes 429 through unchanged"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> The API Hub forwards the LFI&#39;s <code data-v-9279fdd4${_scopeId2}>429</code> response (status, <code data-v-9279fdd4${_scopeId2}>Retry-After</code>, and <code data-v-9279fdd4${_scopeId2}>x-fapi-interaction-id</code>) to the TPP without modification. There is no Hub-side translation step — the TPP receives the same response the LFI emitted. See the corresponding <a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates#rate-limits" data-v-9279fdd4${_scopeId2}>TPP API guide</a> for the customer-facing handling on the other end of the pipe. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The API Hub forwards the LFI's "),
                      createVNode("code", null, "429"),
                      createTextVNode(" response (status, "),
                      createVNode("code", null, "Retry-After"),
                      createTextVNode(", and "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(") to the TPP without modification. There is no Hub-side translation step — the TPP receives the same response the LFI emitted. See the corresponding "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates#rate-limits" }, "TPP API guide"),
                      createTextVNode(" for the customer-facing handling on the other end of the pipe. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not silently degrade"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9279fdd4${_scopeId2}> When the limit is breached, the LFI MUST NOT return <code data-v-9279fdd4${_scopeId2}>200</code> with the <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> field omitted, an empty object, or a stale JWE. The 429 is the contract that lets the TPP distinguish &quot;you don&#39;t have this permission&quot; from &quot;you&#39;ve called too often&quot; — collapsing the two would mislead the TPP about why the customer can&#39;t see the rate. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" When the limit is breached, the LFI MUST NOT return "),
                      createVNode("code", null, "200"),
                      createTextVNode(" with the "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(` field omitted, an empty object, or a stale JWE. The 429 is the contract that lets the TPP distinguish "you don't have this permission" from "you've called too often" — collapsing the two would mislead the TPP about why the customer can't see the rate. `)
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
                  createTextVNode(" Every call to "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" that produces an encrypted "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" mints a fresh OTP and triggers a customer-facing message. The LFI MUST rate-limit these calls per consent per account so an abusive or buggy TPP cannot spam the customer. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "The limits"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Rule"),
                        createVNode("th", null, "Limit"),
                        createVNode("th", null, "Behaviour when exceeded")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Minimum interval between fresh OTPs"),
                        createVNode("td", null, [
                          createVNode("strong", null, "60 seconds"),
                          createTextVNode(" per (consent, account) pair")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Reject the whole request with "),
                          createVNode("code", null, "429 Too Many Requests"),
                          createTextVNode('. The TPP surfaces a "please wait" message and lets the customer retry shortly.')
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Rolling 24-hour cap"),
                        createVNode("td", null, [
                          createVNode("strong", null, "12 fresh OTPs"),
                          createTextVNode(" per (consent, account) pair")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Reject the whole request with "),
                          createVNode("code", null, "429 Too Many Requests"),
                          createTextVNode(" until the rolling window admits a new call. Customer is told to try again later.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Re-decryption of an existing JWE"),
                        createVNode("td", null, "Not limited — decryption happens in the TPP browser and does not contact the LFI"),
                        createVNode("td", null, "n/a")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" These limits are LFI-enforced and apply only to the "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode("-encryption path. Cleartext calls to "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" (for product types where the LFI does not encrypt) follow the standard rate limits documented elsewhere. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The 60-second minimum interval is the limit that matters most in practice: a delivered OTP can take a little while to reach the customer, so the interval simply stops a fresh code being minted before the previous one has had a chance to arrive. The rolling 24-hour cap leaves headroom for a TPP with a genuine reason to read a customer's finance rates several times through the day, and is kept under review as real-world usage patterns emerge. LFIs SHOULD treat it as a backstop against runaway message volume rather than a constraint legitimate traffic is expected to approach. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Counter key"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The counter is per (consent, account) pair, not per TPP and not per customer. A customer who holds multiple consents from different TPPs sees the limits applied independently per consent — one TPP's behaviour does not block another TPP's call. Within a single consent, a TPP that legitimately needs to read finance rates for several accounts gets a separate 24-hour budget per account. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "The 429 response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When either limit would be breached, the LFI MUST "),
                  createVNode("strong", null, "reject the entire request"),
                  createTextVNode(" rather than returning a partial response with "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" omitted. The customer is on the TPP's screen expecting a complete product view; the 429 is the signal the TPP needs to render a clear, actionable error rather than a silently degraded payload. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response uses the same "),
                  createVNode("code", null, "429Error"),
                  createTextVNode(" envelope already defined for "),
                  createVNode("code", null, "GET /accounts/{AccountId}/product"),
                  createTextVNode(" in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products" }, " OpenAPI specification"),
                  createTextVNode(" — HTTP "),
                  createVNode("code", null, "429"),
                  createTextVNode(", no response body, two headers: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: errorResponseExample,
                lang: "http",
                filename: "429 response — LFI to API Hub"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Retry-After")
                        ]),
                        createVNode("td", null, "MUST"),
                        createVNode("td", null, "Integer seconds until the next request would succeed. For the minimum-interval breach this is the seconds remaining in the 60-second cooldown; for the daily cap this is the seconds until the rolling window admits a new call.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-fapi-interaction-id")
                        ]),
                        createVNode("td", null, "MUST"),
                        createVNode("td", null, "The same UUID the TPP sent on the request, echoed back so the TPP can correlate the rejection with its outbound call.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "The Hub passes 429 through unchanged"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The API Hub forwards the LFI's "),
                    createVNode("code", null, "429"),
                    createTextVNode(" response (status, "),
                    createVNode("code", null, "Retry-After"),
                    createTextVNode(", and "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(") to the TPP without modification. There is no Hub-side translation step — the TPP receives the same response the LFI emitted. See the corresponding "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates#rate-limits" }, "TPP API guide"),
                    createTextVNode(" for the customer-facing handling on the other end of the pipe. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not silently degrade"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" When the limit is breached, the LFI MUST NOT return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(` field omitted, an empty object, or a stale JWE. The 429 is the contract that lets the TPP distinguish "you don't have this permission" from "you've called too often" — collapsing the two would mislead the TPP about why the customer can't see the rate. `)
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
        id: "operational",
        num: "08",
        color: "var(--at-navy)",
        eyebrow: "Operational requirements",
        title: "Logging, monitoring, and incident response",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>No cleartext in logs</strong> — OTP, derived key material, and cleartext <code data-v-9279fdd4${_scopeId2}>FinanceRates</code> MUST be excluded from application logs, request traces, audit trails, monitoring dashboards, and crash dumps. </li><li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Audit the metadata, not the secret</strong> — the LFI SHOULD log the fact that an encrypted-rate response was issued (timestamp, consent ID, account ID, product ID, delivery channel) so abuse and operational issues are observable. The OTP and rate themselves MUST NOT be part of those records. </li><li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Delivery monitoring</strong> — the LFI MUST monitor delivery success rates for whichever channels it uses to send the code. A sustained dip in delivery to encrypted-rate customers degrades the entire product silently from the customer&#39;s point of view. </li><li data-v-9279fdd4${_scopeId2}><strong data-v-9279fdd4${_scopeId2}>Treat the OTP like a password</strong> — on incident response, OTP exposure is reportable. There is no recovery path other than waiting for the 30-minute JWE window to close, so even a single leaked OTP costs at most one customer&#39;s encrypted rate. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "No cleartext in logs"),
                      createTextVNode(" — OTP, derived key material, and cleartext "),
                      createVNode("code", null, "FinanceRates"),
                      createTextVNode(" MUST be excluded from application logs, request traces, audit trails, monitoring dashboards, and crash dumps. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Audit the metadata, not the secret"),
                      createTextVNode(" — the LFI SHOULD log the fact that an encrypted-rate response was issued (timestamp, consent ID, account ID, product ID, delivery channel) so abuse and operational issues are observable. The OTP and rate themselves MUST NOT be part of those records. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Delivery monitoring"),
                      createTextVNode(" — the LFI MUST monitor delivery success rates for whichever channels it uses to send the code. A sustained dip in delivery to encrypted-rate customers degrades the entire product silently from the customer's point of view. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Treat the OTP like a password"),
                      createTextVNode(" — on incident response, OTP exposure is reportable. There is no recovery path other than waiting for the 30-minute JWE window to close, so even a single leaked OTP costs at most one customer's encrypted rate. ")
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
                    createVNode("strong", null, "No cleartext in logs"),
                    createTextVNode(" — OTP, derived key material, and cleartext "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" MUST be excluded from application logs, request traces, audit trails, monitoring dashboards, and crash dumps. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Audit the metadata, not the secret"),
                    createTextVNode(" — the LFI SHOULD log the fact that an encrypted-rate response was issued (timestamp, consent ID, account ID, product ID, delivery channel) so abuse and operational issues are observable. The OTP and rate themselves MUST NOT be part of those records. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Delivery monitoring"),
                    createTextVNode(" — the LFI MUST monitor delivery success rates for whichever channels it uses to send the code. A sustained dip in delivery to encrypted-rate customers degrades the entire product silently from the customer's point of view. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Treat the OTP like a password"),
                    createTextVNode(" — on incident response, OTP exposure is reportable. There is no recovery path other than waiting for the 30-minute JWE window to close, so even a single leaked OTP costs at most one customer's encrypted rate. ")
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/finance-rates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const financeRates = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9279fdd4"]]);
export {
  financeRates as default
};
