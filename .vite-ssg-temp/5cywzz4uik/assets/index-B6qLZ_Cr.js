import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const parPayloadSample = `{
  "Initiation": {
    "DebtorAccount": { ... },       // optional — see Debtor Account
    "Creditor": [                   // array of creditor entries — see Creditor
      {
        "CreditorAgent": { ... },
        "Creditor": { "Name": "..." },
        "CreditorAccount": { ... },
        "ConfirmationOfPayeeResponse": "..."
      }
      // ... up to 10 entries; omit array entirely for open beneficiary
    ]
  },
  "Risk": { ... }                   // required — see Risk
}`;
const paymentsPayloadSample = `{
  "Initiation": {
    "CreditorAgent": { ... },               // flat on Initiation — not inside an array
    "Creditor": { "Name": "..." },
    "CreditorAccount": { ... },
    "ConfirmationOfPayeeResponse": "..."
  },
  "Risk": { ... }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const encryptPiiTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { SignJWT, importJWK, CompactEncrypt } from 'jose'
import { v4 as uuidv4 } from 'uuid'

async function encryptPII(
  piiPayload: Record<string, unknown>,
  signingKey: KeyLike,
  signingKeyId: string,
  signingAlg: string,
  clientId: string,
  audience: string,
  jwksUri: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // 1. Sign the PII payload
  const jws = await new SignJWT(piiPayload)
    .setProtectedHeader({ alg: signingAlg, kid: signingKeyId })
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .setJti(uuidv4())
    .setIssuer(clientId)
    .setSubject(clientId)
    .setAudience(audience)
    .sign(signingKey)

  // 2. Fetch the LFI's JWKS and find the encryption key
  const response = await fetch(jwksUri)
  const { keys } = await response.json()
  const encKeyJwk = keys.find((k: any) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Encrypt the signed JWS into a JWE
  const publicKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  const jwe = await new CompactEncrypt(new TextEncoder().encode(jws))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(publicKey)

  return jwe // → place this string in PersonalIdentifiableInformation
}`
      },
      {
        label: "Python (python-jose)",
        lang: "python",
        code: `from jose import jws, jwe
import requests
import json
import uuid
import time

def encrypt_pii(
    pii_payload: dict,
    signing_key: str,
    signing_key_id: str,
    signing_alg: str,
    client_id: str,
    audience: str,
    jwks_uri: str,
) -> str:
    now = int(time.time())

    # 1. Sign the PII payload
    claims = {
        **pii_payload,
        "iat": now,
        "exp": now + 300,
        "jti": str(uuid.uuid4()),
        "iss": client_id,
        "sub": client_id,
        "aud": audience,
    }
    signed_jwt = jws.sign(
        json.dumps(claims).encode(),
        signing_key,
        algorithm=signing_alg,
        headers={"kid": signing_key_id},
    )

    # 2. Fetch the LFI's JWKS and find the encryption key
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt the signed JWS into a JWE
    return jwe.encrypt(
        signed_jwt.encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()  # → place this string in PersonalIdentifiableInformation`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cfe41ff2><section class="ed-doc__hero" data-v-cfe41ff2><div class="ed-doc__inner" data-v-cfe41ff2><div class="ed-doc__eyebrow" data-v-cfe41ff2><span class="ed-doc__eyebrow-dash" data-v-cfe41ff2></span> Service Initiation · PII </div><h1 class="ed-doc__title" data-v-cfe41ff2> Personal Identifiable Information (PII) <span class="ed-doc__read" data-v-cfe41ff2>3 min read</span></h1><p class="ed-doc__lede" data-v-cfe41ff2> Every payment instruction carries sensitive data about who is paying and who is receiving the funds. This data — the creditor account details, optional debtor account, and risk indicators — is collectively referred to as <strong data-v-cfe41ff2>Personal Identifiable Information (PII)</strong>. </p><p class="ed-doc__lede" data-v-cfe41ff2> PII is encrypted and embedded at <strong data-v-cfe41ff2>two points</strong> in the payment lifecycle: </p>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-cfe41ff2${_scopeId}><thead data-v-cfe41ff2${_scopeId}><tr data-v-cfe41ff2${_scopeId}><th data-v-cfe41ff2${_scopeId}>Stage</th><th data-v-cfe41ff2${_scopeId}>Endpoint</th><th data-v-cfe41ff2${_scopeId}>PII form</th></tr></thead><tbody data-v-cfe41ff2${_scopeId}><tr data-v-cfe41ff2${_scopeId}><td data-v-cfe41ff2${_scopeId}>Consent staging</td><td data-v-cfe41ff2${_scopeId}><span class="endpoint" data-v-cfe41ff2${_scopeId}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId}>POST</span><code data-v-cfe41ff2${_scopeId}>/par</code></span></td><td data-v-cfe41ff2${_scopeId}>Embedded in <code data-v-cfe41ff2${_scopeId}>consent.PersonalIdentifiableInformation</code></td></tr><tr data-v-cfe41ff2${_scopeId}><td data-v-cfe41ff2${_scopeId}>Payment creation</td><td data-v-cfe41ff2${_scopeId}><span class="endpoint" data-v-cfe41ff2${_scopeId}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId}>POST</span><code data-v-cfe41ff2${_scopeId}>/payments</code></span></td><td data-v-cfe41ff2${_scopeId}>Embedded in <code data-v-cfe41ff2${_scopeId}>payment.PersonalIdentifiableInformation</code></td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Stage"),
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "PII form")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Consent staging"),
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Embedded in "),
                      createVNode("code", null, "consent.PersonalIdentifiableInformation")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Payment creation"),
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Embedded in "),
                      createVNode("code", null, "payment.PersonalIdentifiableInformation")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="ed-doc__lede" data-v-cfe41ff2> The <code data-v-cfe41ff2>Risk</code> structure is the same at both stages. <code data-v-cfe41ff2>DebtorAccount</code> is <strong data-v-cfe41ff2>only present at <span class="endpoint" data-v-cfe41ff2><span class="http-method http-method--post" data-v-cfe41ff2>POST</span><code data-v-cfe41ff2>/par</code></span></strong> — by the time <span class="endpoint" data-v-cfe41ff2><span class="http-method http-method--post" data-v-cfe41ff2>POST</span><code data-v-cfe41ff2>/payments</code></span> is called, the debtor account has already been fixed through the consent authorisation flow. The creditor data also differs between stages — both in structure and cardinality. See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-cfe41ff2>Creditor</a> for the full breakdown. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why-encrypted",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Why PII is encrypted",
        title: "End-to-end encryption between TPP and LFI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Payment consents are stored centrally at <strong data-v-cfe41ff2${_scopeId2}>Nebras</strong>, the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details. `);
                } else {
                  return [
                    createTextVNode(" Payment consents are stored centrally at "),
                    createVNode("strong", null, "Nebras"),
                    createTextVNode(", the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The encryption uses the destination LFI&#39;s public key (see <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-cfe41ff2${_scopeId2}>Message Encryption</a> for full cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised. `);
                } else {
                  return [
                    createTextVNode(" The encryption uses the destination LFI's public key (see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(" for full cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Payment consents are stored centrally at "),
                  createVNode("strong", null, "Nebras"),
                  createTextVNode(", the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The encryption uses the destination LFI's public key (see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(" for full cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "encrypt-steps",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Steps to encrypt PII",
        title: "Sign, then encrypt — Nested JWT (JWS inside JWE)",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-cfe41ff2${_scopeId2}>PersonalIdentifiableInformation</code> field MUST be sent as a compact JWE — a signed-then-encrypted token (Nested JWT). The process is: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" field MUST be sent as a compact JWE — a signed-then-encrypted token (Nested JWT). The process is: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Build the PII JSON</strong> — construct the PII object for the stage you are at (<span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/par</code></span> or <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/payments</code></span>). See <a href="#payload-structure" data-v-cfe41ff2${_scopeId2}>The PII payload structure</a> below.</li><li data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Sign</strong> — sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims (<code data-v-cfe41ff2${_scopeId2}>iat</code>, <code data-v-cfe41ff2${_scopeId2}>exp</code>, <code data-v-cfe41ff2${_scopeId2}>jti</code>, <code data-v-cfe41ff2${_scopeId2}>iss</code>, <code data-v-cfe41ff2${_scopeId2}>sub</code>, <code data-v-cfe41ff2${_scopeId2}>aud</code>).</li><li data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Fetch the LFI&#39;s encryption key</strong> — retrieve the LFI&#39;s JWKS and select the key where <code data-v-cfe41ff2${_scopeId2}>&quot;use&quot;: &quot;enc&quot;</code>.</li><li data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Encrypt</strong> — encrypt the signed JWS into a compact JWE using <code data-v-cfe41ff2${_scopeId2}>RSA-OAEP-256</code> / <code data-v-cfe41ff2${_scopeId2}>A256GCM</code>.</li><li data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Embed</strong> — place the resulting JWE string in the <code data-v-cfe41ff2${_scopeId2}>PersonalIdentifiableInformation</code> field of your request.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Build the PII JSON"),
                      createTextVNode(" — construct the PII object for the stage you are at ("),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(" or "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode("). See "),
                      createVNode("a", { href: "#payload-structure" }, "The PII payload structure"),
                      createTextVNode(" below.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Sign"),
                      createTextVNode(" — sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims ("),
                      createVNode("code", null, "iat"),
                      createTextVNode(", "),
                      createVNode("code", null, "exp"),
                      createTextVNode(", "),
                      createVNode("code", null, "jti"),
                      createTextVNode(", "),
                      createVNode("code", null, "iss"),
                      createTextVNode(", "),
                      createVNode("code", null, "sub"),
                      createTextVNode(", "),
                      createVNode("code", null, "aud"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Fetch the LFI's encryption key"),
                      createTextVNode(" — retrieve the LFI's JWKS and select the key where "),
                      createVNode("code", null, '"use": "enc"'),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encrypt"),
                      createTextVNode(" — encrypt the signed JWS into a compact JWE using "),
                      createVNode("code", null, "RSA-OAEP-256"),
                      createTextVNode(" / "),
                      createVNode("code", null, "A256GCM"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Embed"),
                      createTextVNode(" — place the resulting JWE string in the "),
                      createVNode("code", null, "PersonalIdentifiableInformation"),
                      createTextVNode(" field of your request.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-cfe41ff2${_scopeId}>Example</h3>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: encryptPiiTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the full breakdown of JWKS discovery, key selection, and JWE structure, see <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-cfe41ff2${_scopeId2}>Message Encryption</a>. `);
                } else {
                  return [
                    createTextVNode(" For the full breakdown of JWKS discovery, key selection, and JWE structure, see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Testing on the sandbox"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cfe41ff2${_scopeId2}> The sandbox provides an <strong data-v-cfe41ff2${_scopeId2}>O3 Utility endpoint</strong> that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See <a href="/tech/tpp-standards/security/fapi/o3-utils#example-1" data-v-cfe41ff2${_scopeId2}>O3 Sandbox Utilities</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The sandbox provides an "),
                      createVNode("strong", null, "O3 Utility endpoint"),
                      createTextVNode(" that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-1" }, "O3 Sandbox Utilities"),
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
                  createTextVNode(" The "),
                  createVNode("code", null, "PersonalIdentifiableInformation"),
                  createTextVNode(" field MUST be sent as a compact JWE — a signed-then-encrypted token (Nested JWT). The process is: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Build the PII JSON"),
                    createTextVNode(" — construct the PII object for the stage you are at ("),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" or "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode("). See "),
                    createVNode("a", { href: "#payload-structure" }, "The PII payload structure"),
                    createTextVNode(" below.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Sign"),
                    createTextVNode(" — sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims ("),
                    createVNode("code", null, "iat"),
                    createTextVNode(", "),
                    createVNode("code", null, "exp"),
                    createTextVNode(", "),
                    createVNode("code", null, "jti"),
                    createTextVNode(", "),
                    createVNode("code", null, "iss"),
                    createTextVNode(", "),
                    createVNode("code", null, "sub"),
                    createTextVNode(", "),
                    createVNode("code", null, "aud"),
                    createTextVNode(").")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Fetch the LFI's encryption key"),
                    createTextVNode(" — retrieve the LFI's JWKS and select the key where "),
                    createVNode("code", null, '"use": "enc"'),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encrypt"),
                    createTextVNode(" — encrypt the signed JWS into a compact JWE using "),
                    createVNode("code", null, "RSA-OAEP-256"),
                    createTextVNode(" / "),
                    createVNode("code", null, "A256GCM"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Embed"),
                    createTextVNode(" — place the resulting JWE string in the "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" field of your request.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Example"),
              createVNode(_component_EdCodeGroup, { tabs: encryptPiiTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the full breakdown of JWKS discovery, key selection, and JWE structure, see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Testing on the sandbox"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The sandbox provides an "),
                    createVNode("strong", null, "O3 Utility endpoint"),
                    createTextVNode(" that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-1" }, "O3 Sandbox Utilities"),
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
        id: "object-structure",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Structure of the PII object",
        title: "oneOf — three variants, one form sent in requests",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-cfe41ff2${_scopeId2}>PersonalIdentifiableInformation</code> field is defined as a <code data-v-cfe41ff2${_scopeId2}>oneOf</code>: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" field is defined as a "),
                    createVNode("code", null, "oneOf"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cfe41ff2${_scopeId2}><thead data-v-cfe41ff2${_scopeId2}><tr data-v-cfe41ff2${_scopeId2}><th data-v-cfe41ff2${_scopeId2}>Variant</th><th data-v-cfe41ff2${_scopeId2}>Form</th><th data-v-cfe41ff2${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cfe41ff2${_scopeId2}><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Domestic Payment PII Schema Object</strong></td><td data-v-cfe41ff2${_scopeId2}>object</td><td data-v-cfe41ff2${_scopeId2}>Unencrypted reference form for domestic payments</td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>International Payment PII Schema Object</strong></td><td data-v-cfe41ff2${_scopeId2}>object</td><td data-v-cfe41ff2${_scopeId2}>Unencrypted reference form for international payments</td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Encrypted PII Object</strong> (<code data-v-cfe41ff2${_scopeId2}>AEJWEPaymentPII</code>)</td><td data-v-cfe41ff2${_scopeId2}>string (compact JWE)</td><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>The form that MUST be sent</strong> at both <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/par</code></span> and <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/payments</code></span></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Variant"),
                          createVNode("th", null, "Form"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Domestic Payment PII Schema Object")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Unencrypted reference form for domestic payments")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "International Payment PII Schema Object")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Unencrypted reference form for international payments")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Encrypted PII Object"),
                            createTextVNode(" ("),
                            createVNode("code", null, "AEJWEPaymentPII"),
                            createTextVNode(")")
                          ]),
                          createVNode("td", null, "string (compact JWE)"),
                          createVNode("td", null, [
                            createVNode("strong", null, "The form that MUST be sent"),
                            createTextVNode(" at both "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/par")
                            ]),
                            createTextVNode(" and "),
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/payments")
                            ])
                          ])
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
                  _push3(` The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — <code data-v-cfe41ff2${_scopeId2}>AEJWEPaymentPII</code> — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON. `);
                } else {
                  return [
                    createTextVNode(" The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — "),
                    createVNode("code", null, "AEJWEPaymentPII"),
                    createTextVNode(" — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON. ")
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
                  createVNode("code", null, "PersonalIdentifiableInformation"),
                  createTextVNode(" field is defined as a "),
                  createVNode("code", null, "oneOf"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Variant"),
                        createVNode("th", null, "Form"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Domestic Payment PII Schema Object")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Unencrypted reference form for domestic payments")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "International Payment PII Schema Object")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Unencrypted reference form for international payments")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Encrypted PII Object"),
                          createTextVNode(" ("),
                          createVNode("code", null, "AEJWEPaymentPII"),
                          createTextVNode(")")
                        ]),
                        createVNode("td", null, "string (compact JWE)"),
                        createVNode("td", null, [
                          createVNode("strong", null, "The form that MUST be sent"),
                          createTextVNode(" at both "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/par")
                          ]),
                          createTextVNode(" and "),
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/payments")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — "),
                  createVNode("code", null, "AEJWEPaymentPII"),
                  createTextVNode(" — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payload-structure",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "The PII payload structure",
        title: "Different shape at consent staging vs. payment creation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The structure of the unencrypted PII differs between the two stages. `);
                } else {
                  return [
                    createTextVNode(" The structure of the unencrypted PII differs between the two stages. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-cfe41ff2${_scopeId}>At <span class="endpoint" data-v-cfe41ff2${_scopeId}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId}>POST</span><code data-v-cfe41ff2${_scopeId}>/par</code></span> (consent staging)</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: parPayloadSample,
              lang: "json",
              filename: "PII payload — POST /par"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-cfe41ff2${_scopeId}>At <span class="endpoint" data-v-cfe41ff2${_scopeId}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId}>POST</span><code data-v-cfe41ff2${_scopeId}>/payments</code></span> (payment creation)</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentsPayloadSample,
              lang: "json",
              filename: "PII payload — POST /payments"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The key difference: at <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/par</code></span> the creditor data is inside an <code data-v-cfe41ff2${_scopeId2}>Initiation.Creditor[]</code> array (allowing 1–10 entries, or omitted for open beneficiary). At <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/payments</code></span> the same fields sit directly on <code data-v-cfe41ff2${_scopeId2}>Initiation</code> as a single creditor. `);
                } else {
                  return [
                    createTextVNode(" The key difference: at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" the creditor data is inside an "),
                    createVNode("code", null, "Initiation.Creditor[]"),
                    createTextVNode(" array (allowing 1–10 entries, or omitted for open beneficiary). At "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" the same fields sit directly on "),
                    createVNode("code", null, "Initiation"),
                    createTextVNode(" as a single creditor. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cfe41ff2${_scopeId2}><thead data-v-cfe41ff2${_scopeId2}><tr data-v-cfe41ff2${_scopeId2}><th data-v-cfe41ff2${_scopeId2}>Property</th><th data-v-cfe41ff2${_scopeId2}>POST /par</th><th data-v-cfe41ff2${_scopeId2}>POST /payments</th></tr></thead><tbody data-v-cfe41ff2${_scopeId2}><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Initiation.DebtorAccount</code></td><td data-v-cfe41ff2${_scopeId2}>Optional object</td><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Not present</strong> — debtor account is fixed by consent</td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Initiation.Creditor</code></td><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Array</strong> of creditor entry objects (0–10)</td><td data-v-cfe41ff2${_scopeId2}><strong data-v-cfe41ff2${_scopeId2}>Object</strong> — the party name/address (<code data-v-cfe41ff2${_scopeId2}>{ Name, PostalAddress }</code>)</td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Initiation.CreditorAccount</code></td><td data-v-cfe41ff2${_scopeId2}>Nested inside each <code data-v-cfe41ff2${_scopeId2}>Creditor[]</code> entry</td><td data-v-cfe41ff2${_scopeId2}>Direct field on <code data-v-cfe41ff2${_scopeId2}>Initiation</code></td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Initiation.CreditorAgent</code></td><td data-v-cfe41ff2${_scopeId2}>Nested inside each <code data-v-cfe41ff2${_scopeId2}>Creditor[]</code> entry</td><td data-v-cfe41ff2${_scopeId2}>Direct field on <code data-v-cfe41ff2${_scopeId2}>Initiation</code></td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Initiation.ConfirmationOfPayeeResponse</code></td><td data-v-cfe41ff2${_scopeId2}>Nested inside each <code data-v-cfe41ff2${_scopeId2}>Creditor[]</code> entry</td><td data-v-cfe41ff2${_scopeId2}>Direct field on <code data-v-cfe41ff2${_scopeId2}>Initiation</code></td></tr><tr data-v-cfe41ff2${_scopeId2}><td data-v-cfe41ff2${_scopeId2}><code data-v-cfe41ff2${_scopeId2}>Risk</code></td><td data-v-cfe41ff2${_scopeId2}>Required object</td><td data-v-cfe41ff2${_scopeId2}>Required object</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Property"),
                          createVNode("th", null, "POST /par"),
                          createVNode("th", null, "POST /payments")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.DebtorAccount")
                          ]),
                          createVNode("td", null, "Optional object"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Not present"),
                            createTextVNode(" — debtor account is fixed by consent")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.Creditor")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Array"),
                            createTextVNode(" of creditor entry objects (0–10)")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Object"),
                            createTextVNode(" — the party name/address ("),
                            createVNode("code", null, "{ Name, PostalAddress }"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.CreditorAccount")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Nested inside each "),
                            createVNode("code", null, "Creditor[]"),
                            createTextVNode(" entry")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Direct field on "),
                            createVNode("code", null, "Initiation")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.CreditorAgent")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Nested inside each "),
                            createVNode("code", null, "Creditor[]"),
                            createTextVNode(" entry")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Direct field on "),
                            createVNode("code", null, "Initiation")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.ConfirmationOfPayeeResponse")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Nested inside each "),
                            createVNode("code", null, "Creditor[]"),
                            createTextVNode(" entry")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Direct field on "),
                            createVNode("code", null, "Initiation")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Risk")
                          ]),
                          createVNode("td", null, "Required object"),
                          createVNode("td", null, "Required object")
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
                  _push3(`See the sub-pages for full schema and rules:`);
                } else {
                  return [
                    createTextVNode("See the sub-pages for full schema and rules:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cfe41ff2${_scopeId2}><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" data-v-cfe41ff2${_scopeId2}>Debtor Account</a> — optional at <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/par</code></span> only; not part of the <span class="endpoint" data-v-cfe41ff2${_scopeId2}><span class="http-method http-method--post" data-v-cfe41ff2${_scopeId2}>POST</span><code data-v-cfe41ff2${_scopeId2}>/payments</code></span> PII</li><li data-v-cfe41ff2${_scopeId2}><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-cfe41ff2${_scopeId2}>Creditor</a> — consent-time models (single/multiple/open), payment-time structure, and match requirements</li><li data-v-cfe41ff2${_scopeId2}><a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk" data-v-cfe41ff2${_scopeId2}>Risk</a> — debtor and creditor risk indicators</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                      createTextVNode(" — optional at "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(" only; not part of the "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" PII")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                      createTextVNode(" — consent-time models (single/multiple/open), payment-time structure, and match requirements")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk" }, "Risk"),
                      createTextVNode(" — debtor and creditor risk indicators")
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
                  createTextVNode(" The structure of the unencrypted PII differs between the two stages. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("At "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/par")
                ]),
                createTextVNode(" (consent staging)")
              ]),
              createVNode(_component_EdCode, {
                code: parPayloadSample,
                lang: "json",
                filename: "PII payload — POST /par"
              }),
              createVNode("h3", null, [
                createTextVNode("At "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/payments")
                ]),
                createTextVNode(" (payment creation)")
              ]),
              createVNode(_component_EdCode, {
                code: paymentsPayloadSample,
                lang: "json",
                filename: "PII payload — POST /payments"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The key difference: at "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(" the creditor data is inside an "),
                  createVNode("code", null, "Initiation.Creditor[]"),
                  createTextVNode(" array (allowing 1–10 entries, or omitted for open beneficiary). At "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" the same fields sit directly on "),
                  createVNode("code", null, "Initiation"),
                  createTextVNode(" as a single creditor. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Property"),
                        createVNode("th", null, "POST /par"),
                        createVNode("th", null, "POST /payments")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.DebtorAccount")
                        ]),
                        createVNode("td", null, "Optional object"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Not present"),
                          createTextVNode(" — debtor account is fixed by consent")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.Creditor")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Array"),
                          createTextVNode(" of creditor entry objects (0–10)")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Object"),
                          createTextVNode(" — the party name/address ("),
                          createVNode("code", null, "{ Name, PostalAddress }"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.CreditorAccount")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Nested inside each "),
                          createVNode("code", null, "Creditor[]"),
                          createTextVNode(" entry")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Direct field on "),
                          createVNode("code", null, "Initiation")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.CreditorAgent")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Nested inside each "),
                          createVNode("code", null, "Creditor[]"),
                          createTextVNode(" entry")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Direct field on "),
                          createVNode("code", null, "Initiation")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.ConfirmationOfPayeeResponse")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Nested inside each "),
                          createVNode("code", null, "Creditor[]"),
                          createTextVNode(" entry")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Direct field on "),
                          createVNode("code", null, "Initiation")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Risk")
                        ]),
                        createVNode("td", null, "Required object"),
                        createVNode("td", null, "Required object")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See the sub-pages for full schema and rules:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                    createTextVNode(" — optional at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" only; not part of the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" PII")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(" — consent-time models (single/multiple/open), payment-time structure, and match requirements")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk" }, "Risk"),
                    createTextVNode(" — debtor and creditor risk indicators")
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
        id: "decentralised-validation",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Decentralised validation",
        title: "Each LFI validates PII independently after decryption",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because PII is encrypted using the LFI&#39;s public key, <strong data-v-cfe41ff2${_scopeId2}>Nebras cannot decrypt or validate it</strong>. The LFI is solely responsible for decrypting and validating the PII — at consent time and at payment time. `);
                } else {
                  return [
                    createTextVNode(" Because PII is encrypted using the LFI's public key, "),
                    createVNode("strong", null, "Nebras cannot decrypt or validate it"),
                    createTextVNode(". The LFI is solely responsible for decrypting and validating the PII — at consent time and at payment time. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Validation is therefore performed independently by each LFI rather than centrally. The standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent or processing a payment. `);
                } else {
                  return [
                    createTextVNode(" Validation is therefore performed independently by each LFI rather than centrally. The standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent or processing a payment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "TPPs must understand LFI validation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cfe41ff2${_scopeId2}> A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed. </p><p data-v-cfe41ff2${_scopeId2}> See <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-cfe41ff2${_scopeId2}>Creditor</a> for the specific validation rules that LFIs apply to the <code data-v-cfe41ff2${_scopeId2}>Creditor</code> array for domestic payments. </p>`);
                } else {
                  return [
                    createVNode("p", null, " A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed. "),
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                      createTextVNode(" for the specific validation rules that LFIs apply to the "),
                      createVNode("code", null, "Creditor"),
                      createTextVNode(" array for domestic payments. ")
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
                  createTextVNode(" Because PII is encrypted using the LFI's public key, "),
                  createVNode("strong", null, "Nebras cannot decrypt or validate it"),
                  createTextVNode(". The LFI is solely responsible for decrypting and validating the PII — at consent time and at payment time. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Validation is therefore performed independently by each LFI rather than centrally. The standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent or processing a payment. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "TPPs must understand LFI validation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed. "),
                  createVNode("p", null, [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(" for the specific validation rules that LFIs apply to the "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" array for domestic payments. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfe41ff2"]]);
export {
  index as default
};
