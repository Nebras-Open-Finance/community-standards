import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const step1Node = `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(piiJweString)
const privateKey = myKeyStore.getPrivateKey(kid)
`;
const step1Python = `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(pii_jwe_string)
private_key = my_key_store.get_private_key(kid)
`;
const step2Node = `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(piiJweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)
`;
const step2Python = `from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(pii_jwe_string, key=private_key)
jws_string = token.payload.decode()
`;
const step3Node = `import { decodeJwt } from 'jose'

const piiPayload = decodeJwt(jwsString)
// piiPayload now contains { Initiation: { ... }, Risk: { ... }, iat, exp, iss, ... }
`;
const step3Python = `import json, base64

def decode_jws_payload(jws_string: str) -> dict:
    payload_b64 = jws_string.split(".")[1]
    return json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

pii_payload = decode_jws_payload(jws_string)
# pii_payload now contains { "Initiation": { ... }, "Risk": { ... }, "iat": ..., "exp": ..., "iss": ..., ... }
`;
const validateNode = `import Ajv from 'ajv'
import { load } from 'js-yaml'
import { readFileSync } from 'fs'

// 1. Load the OpenAPI spec and extract the PII schema
const spec = load(
  readFileSync('uae-api-hub-consent-manager-openapi.yaml', 'utf-8')
) as Record<string, any>

const piiSchema =
  spec.components.schemas[
    'AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII'
  ]

// 2. Build a validator — register all component schemas so $ref resolves
const ajv = new Ajv({ allErrors: true, strict: false })

for (const [name, schema] of Object.entries(spec.components.schemas)) {
  ajv.addSchema(schema as object, \`#/components/schemas/\${name}\`)
}

const validate = ajv.compile(piiSchema)

// 3. Validate the decrypted PII payload
function validatePIISchema(piiPayload: Record<string, unknown>): void {
  const valid = validate(piiPayload)
  if (!valid) {
    const errors = validate.errors?.map(e => \`\${e.instancePath} \${e.message}\`)
    throw new Error(\`PII schema validation failed:\\n\${errors?.join('\\n')}\`)
  }
}
`;
const validatePython = `import yaml
from jsonschema import validate, ValidationError, RefResolver

# 1. Load the OpenAPI spec and extract the PII schema
with open("uae-api-hub-consent-manager-openapi.yaml") as f:
    spec = yaml.safe_load(f)

pii_schema = spec["components"]["schemas"][
    "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
]

# 2. Build a resolver so $ref pointers resolve against the full spec
schema_store = {
    f"#/components/schemas/{name}": schema
    for name, schema in spec["components"]["schemas"].items()
}
resolver = RefResolver.from_schema(spec, store=schema_store)

# 3. Validate the decrypted PII payload
def validate_pii_schema(pii_payload: dict) -> None:
    try:
        validate(instance=pii_payload, schema=pii_schema, resolver=resolver)
    except ValidationError as e:
        raise ValueError(f"PII schema validation failed: {e.message}") from e
`;
const fullExampleNode = `import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

async function decryptAndValidatePII(
  piiJweString: string,
  kid: string
): Promise<Record<string, unknown>> {
  // 1. Load the Enc1 private key matching the kid
  const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
  const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

  // 2. Decrypt the JWE → inner JWS
  const { plaintext } = await compactDecrypt(piiJweString, privateKey)
  const jwsString = new TextDecoder().decode(plaintext)

  // 3. Decode the JWS payload (signature verification is optional — see note above)
  const piiPayload = decodeJwt(jwsString)

  // 4. Validate against the OpenAPI schema
  validatePIISchema(piiPayload)

  return piiPayload
}
`;
const fullExamplePython = `from jwcrypto import jwe as jwecrypto
import json, base64

def decrypt_and_validate_pii(pii_jwe_string: str, private_key) -> dict:
    # 1. Decrypt the JWE → inner JWS
    token = jwecrypto.JWE()
    token.deserialize(pii_jwe_string, key=private_key)
    jws_string = token.payload.decode()

    # 2. Decode the JWS payload (signature verification is optional — see note above)
    payload_b64 = jws_string.split(".")[1]
    pii_payload = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

    # 3. Validate against the OpenAPI schema
    validate_pii_schema(pii_payload)

    return pii_payload
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "decrypt-pii",
  __ssrInlineRender: true,
  setup(__props) {
    const step1Tabs = [{ label: "Node.js", lang: "typescript", code: step1Node }, { label: "Python", lang: "python", code: step1Python }];
    const step2Tabs = [{ label: "Node.js (jose)", lang: "typescript", code: step2Node }, { label: "Python (jwcrypto)", lang: "python", code: step2Python }];
    const step3Tabs = [{ label: "Node.js (jose)", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const validateTabs = [{ label: "Node.js (ajv + yaml)", lang: "typescript", code: validateNode }, { label: "Python (jsonschema + pyyaml)", lang: "python", code: validatePython }];
    const fullExampleTabs = [{ label: "Node.js (jose + ajv)", lang: "typescript", code: fullExampleNode }, { label: "Python (jwcrypto + jsonschema)", lang: "python", code: fullExamplePython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-97528a10><section class="ed-doc__hero" data-v-97528a10><div class="ed-doc__inner" data-v-97528a10><div class="ed-doc__eyebrow" data-v-97528a10><span class="ed-doc__eyebrow-dash" data-v-97528a10></span> LFI · Banking · Service Initiation · PII · API Guide </div><h1 class="ed-doc__title" data-v-97528a10> How to Decrypt PII <span class="ed-doc__read" data-v-97528a10>3 min read</span></h1><p class="ed-doc__lede" data-v-97528a10> The <code data-v-97528a10>PersonalIdentifiableInformation</code> field is a compact JWE (JSON Web Encryption) string. It was encrypted by the TPP using your LFI&#39;s public encryption key (<a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key" data-v-97528a10>Enc1</a>). To decrypt it, you need the corresponding <strong data-v-97528a10>Enc1 private key</strong>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-read-kid",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Step 1",
        title: "Read the kid from the JWE header",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE protected header contains the <code data-v-97528a10${_scopeId2}>kid</code> (Key ID) of the encryption key that was used. Decode the first segment of the JWE to identify which private key to use: `);
                } else {
                  return [
                    createTextVNode(" The JWE protected header contains the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" (Key ID) of the encryption key that was used. Decode the first segment of the JWE to identify which private key to use: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step1Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE protected header contains the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" (Key ID) of the encryption key that was used. Decode the first segment of the JWE to identify which private key to use: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step1Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-decrypt-jwe",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Step 2",
        title: "Decrypt the JWE",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT): `);
                } else {
                  return [
                    createTextVNode(" Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT): ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT): ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-decode-jws",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 3",
        title: "Decode the JWS payload",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII fields: `);
                } else {
                  return [
                    createTextVNode(" The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII fields: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Optional — Verify the TPP's JWS signature"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-97528a10${_scopeId2}> The JWS is signed by the TPP. You may optionally verify this signature against the TPP&#39;s public signing key. However, this is <strong data-v-97528a10${_scopeId2}>not required</strong> — the entire request containing the PII field is itself sent as a JWS that the API Hub has already verified was signed by the TPP. The PII therefore cannot have been tampered with in transit. </p><p data-v-97528a10${_scopeId2}> If you choose to implement JWS verification for defence-in-depth, see <a href="./verify-tpp-signature" data-v-97528a10${_scopeId2}>Verify TPP Signature (Optional)</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The JWS is signed by the TPP. You may optionally verify this signature against the TPP's public signing key. However, this is "),
                      createVNode("strong", null, "not required"),
                      createTextVNode(" — the entire request containing the PII field is itself sent as a JWS that the API Hub has already verified was signed by the TPP. The PII therefore cannot have been tampered with in transit. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" If you choose to implement JWS verification for defence-in-depth, see "),
                      createVNode("a", { href: "./verify-tpp-signature" }, "Verify TPP Signature (Optional)"),
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
                  createTextVNode(" The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII fields: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Optional — Verify the TPP's JWS signature"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The JWS is signed by the TPP. You may optionally verify this signature against the TPP's public signing key. However, this is "),
                    createVNode("strong", null, "not required"),
                    createTextVNode(" — the entire request containing the PII field is itself sent as a JWS that the API Hub has already verified was signed by the TPP. The PII therefore cannot have been tampered with in transit. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" If you choose to implement JWS verification for defence-in-depth, see "),
                    createVNode("a", { href: "./verify-tpp-signature" }, "Verify TPP Signature (Optional)"),
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
        id: "step-4-validate-schema",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 4",
        title: "Validate the PII against the OpenAPI schema",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema. The PII has not been validated by the API Hub — schema validation is the LFI&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema. The PII has not been validated by the API Hub — schema validation is the LFI's responsibility. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-97528a10${_scopeId2}><thead data-v-97528a10${_scopeId2}><tr data-v-97528a10${_scopeId2}><th data-v-97528a10${_scopeId2}>Stage</th><th data-v-97528a10${_scopeId2}>Spec file</th><th data-v-97528a10${_scopeId2}>Schema</th></tr></thead><tbody data-v-97528a10${_scopeId2}><tr data-v-97528a10${_scopeId2}><td data-v-97528a10${_scopeId2}>Consent</td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>uae-api-hub-consent-manager-openapi.yaml</code></td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII</code></td></tr><tr data-v-97528a10${_scopeId2}><td data-v-97528a10${_scopeId2}>Payment</td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Stage"),
                          createVNode("th", null, "Spec file"),
                          createVNode("th", null, "Schema")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent"),
                          createVNode("td", null, [
                            createVNode("code", null, "uae-api-hub-consent-manager-openapi.yaml")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Payment"),
                          createVNode("td", null, [
                            createVNode("code", null, "uae-ozone-connect-bank-service-initiation-openapi.yaml")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-97528a10${_scopeId}>Obtaining the OpenAPI specification</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the canonical specification repository: `);
                } else {
                  return [
                    createTextVNode(" The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the canonical specification repository: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-97528a10${_scopeId}><a href="https://github.com/Nebras-Open-Finance/api-specs" target="_blank" rel="noopener" class="ed-doc__github-link" data-v-97528a10${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" data-v-97528a10${_scopeId}><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" data-v-97528a10${_scopeId}></path></svg> Nebras-Open-Finance/api-specs </a></p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Spec files are located under <code data-v-97528a10${_scopeId2}>dist/</code> by category:`);
                } else {
                  return [
                    createTextVNode("Spec files are located under "),
                    createVNode("code", null, "dist/"),
                    createTextVNode(" by category:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-97528a10${_scopeId2}><thead data-v-97528a10${_scopeId2}><tr data-v-97528a10${_scopeId2}><th data-v-97528a10${_scopeId2}>Stage</th><th data-v-97528a10${_scopeId2}>Path</th></tr></thead><tbody data-v-97528a10${_scopeId2}><tr data-v-97528a10${_scopeId2}><td data-v-97528a10${_scopeId2}>Consent</td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml</code></td></tr><tr data-v-97528a10${_scopeId2}><td data-v-97528a10${_scopeId2}>Payment</td><td data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Stage"),
                          createVNode("th", null, "Path")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent"),
                          createVNode("td", null, [
                            createVNode("code", null, "dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Payment"),
                          createVNode("td", null, [
                            createVNode("code", null, "dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Errata versions"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-97528a10${_scopeId2}> Specifications may have errata releases (e.g. <code data-v-97528a10${_scopeId2}>v2.1.x-errata1</code>) that contain targeted corrections. When multiple version folders exist for the same major.minor version, use the <strong data-v-97528a10${_scopeId2}>highest errata</strong> that contains the file you need. If a file is not present in an errata folder, fall back to the base version. Always check for errata before bundling a spec into your service. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Specifications may have errata releases (e.g. "),
                      createVNode("code", null, "v2.1.x-errata1"),
                      createTextVNode(") that contain targeted corrections. When multiple version folders exist for the same major.minor version, use the "),
                      createVNode("strong", null, "highest errata"),
                      createTextVNode(" that contains the file you need. If a file is not present in an errata folder, fall back to the base version. Always check for errata before bundling a spec into your service. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-97528a10${_scopeId}>Validating against the schema</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Extract the relevant <code data-v-97528a10${_scopeId2}>components/schemas</code> entry from the YAML file and validate the decrypted PII payload against it. The PII schemas in the OpenAPI specification already declare the constraints needed for validation: `);
                } else {
                  return [
                    createTextVNode(" Extract the relevant "),
                    createVNode("code", null, "components/schemas"),
                    createTextVNode(" entry from the YAML file and validate the decrypted PII payload against it. The PII schemas in the OpenAPI specification already declare the constraints needed for validation: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-97528a10${_scopeId2}><strong data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>additionalProperties: false</code></strong> is set at every level of the PII schema — any unexpected fields will cause validation to fail.</li><li data-v-97528a10${_scopeId2}><strong data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>required</code> arrays</strong> are declared on sub-schemas (e.g. <code data-v-97528a10${_scopeId2}>CreditorAccount</code> is required on each creditor entry, <code data-v-97528a10${_scopeId2}>SchemeName</code> and <code data-v-97528a10${_scopeId2}>Identification</code> are required on account objects) — missing mandatory fields will cause validation to fail.</li><li data-v-97528a10${_scopeId2}><strong data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>enum</code> constraints</strong> restrict values to allowed options (e.g. <code data-v-97528a10${_scopeId2}>SchemeName</code> must be <code data-v-97528a10${_scopeId2}>IBAN</code>).</li><li data-v-97528a10${_scopeId2}><strong data-v-97528a10${_scopeId2}><code data-v-97528a10${_scopeId2}>$ref</code> pointers</strong> link to nested schemas (creditor, debtor, risk). For validation to work correctly, all <code data-v-97528a10${_scopeId2}>components/schemas</code> entries from the spec MUST be registered with the validator so that <code data-v-97528a10${_scopeId2}>$ref</code> pointers resolve.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "additionalProperties: false")
                      ]),
                      createTextVNode(" is set at every level of the PII schema — any unexpected fields will cause validation to fail.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "required"),
                        createTextVNode(" arrays")
                      ]),
                      createTextVNode(" are declared on sub-schemas (e.g. "),
                      createVNode("code", null, "CreditorAccount"),
                      createTextVNode(" is required on each creditor entry, "),
                      createVNode("code", null, "SchemeName"),
                      createTextVNode(" and "),
                      createVNode("code", null, "Identification"),
                      createTextVNode(" are required on account objects) — missing mandatory fields will cause validation to fail.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "enum"),
                        createTextVNode(" constraints")
                      ]),
                      createTextVNode(" restrict values to allowed options (e.g. "),
                      createVNode("code", null, "SchemeName"),
                      createTextVNode(" must be "),
                      createVNode("code", null, "IBAN"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "$ref"),
                        createTextVNode(" pointers")
                      ]),
                      createTextVNode(" link to nested schemas (creditor, debtor, risk). For validation to work correctly, all "),
                      createVNode("code", null, "components/schemas"),
                      createTextVNode(" entries from the spec MUST be registered with the validator so that "),
                      createVNode("code", null, "$ref"),
                      createTextVNode(" pointers resolve.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When you register the full set of component schemas and compile the PII schema, standard JSON Schema validators (<code data-v-97528a10${_scopeId2}>ajv</code> for Node.js, <code data-v-97528a10${_scopeId2}>jsonschema</code> for Python) will enforce all of these constraints automatically. No custom validation logic is needed for schema conformance — the OpenAPI spec is the single source of truth. `);
                } else {
                  return [
                    createTextVNode(" When you register the full set of component schemas and compile the PII schema, standard JSON Schema validators ("),
                    createVNode("code", null, "ajv"),
                    createTextVNode(" for Node.js, "),
                    createVNode("code", null, "jsonschema"),
                    createTextVNode(" for Python) will enforce all of these constraints automatically. No custom validation logic is needed for schema conformance — the OpenAPI spec is the single source of truth. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The following example shows how to validate a domestic payment PII at consent time:`);
                } else {
                  return [
                    createTextVNode("The following example shows how to validate a domestic payment PII at consent time:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: validateTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Reject invalid PII"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-97528a10${_scopeId2}> If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment. Do not attempt to process a payment with malformed PII — return an appropriate error response. See <a href="../" data-v-97528a10${_scopeId2}>Personal Identifiable Information</a> for the full set of validation rules. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment. Do not attempt to process a payment with malformed PII — return an appropriate error response. See "),
                      createVNode("a", { href: "../" }, "Personal Identifiable Information"),
                      createTextVNode(" for the full set of validation rules. ")
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
                  createTextVNode(" After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema. The PII has not been validated by the API Hub — schema validation is the LFI's responsibility. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Stage"),
                        createVNode("th", null, "Spec file"),
                        createVNode("th", null, "Schema")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent"),
                        createVNode("td", null, [
                          createVNode("code", null, "uae-api-hub-consent-manager-openapi.yaml")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Payment"),
                        createVNode("td", null, [
                          createVNode("code", null, "uae-ozone-connect-bank-service-initiation-openapi.yaml")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Obtaining the OpenAPI specification"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the canonical specification repository: ")
                ]),
                _: 1
              }),
              createVNode("p", null, [
                createVNode("a", {
                  href: "https://github.com/Nebras-Open-Finance/api-specs",
                  target: "_blank",
                  rel: "noopener",
                  class: "ed-doc__github-link"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 16 16",
                    width: "18",
                    height: "18",
                    "aria-hidden": "true"
                  }, [
                    createVNode("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" })
                  ])),
                  createTextVNode(" Nebras-Open-Finance/api-specs ")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Spec files are located under "),
                  createVNode("code", null, "dist/"),
                  createTextVNode(" by category:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Stage"),
                        createVNode("th", null, "Path")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent"),
                        createVNode("td", null, [
                          createVNode("code", null, "dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Payment"),
                        createVNode("td", null, [
                          createVNode("code", null, "dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Errata versions"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Specifications may have errata releases (e.g. "),
                    createVNode("code", null, "v2.1.x-errata1"),
                    createTextVNode(") that contain targeted corrections. When multiple version folders exist for the same major.minor version, use the "),
                    createVNode("strong", null, "highest errata"),
                    createTextVNode(" that contains the file you need. If a file is not present in an errata folder, fall back to the base version. Always check for errata before bundling a spec into your service. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Validating against the schema"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Extract the relevant "),
                  createVNode("code", null, "components/schemas"),
                  createTextVNode(" entry from the YAML file and validate the decrypted PII payload against it. The PII schemas in the OpenAPI specification already declare the constraints needed for validation: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "additionalProperties: false")
                    ]),
                    createTextVNode(" is set at every level of the PII schema — any unexpected fields will cause validation to fail.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "required"),
                      createTextVNode(" arrays")
                    ]),
                    createTextVNode(" are declared on sub-schemas (e.g. "),
                    createVNode("code", null, "CreditorAccount"),
                    createTextVNode(" is required on each creditor entry, "),
                    createVNode("code", null, "SchemeName"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Identification"),
                    createTextVNode(" are required on account objects) — missing mandatory fields will cause validation to fail.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "enum"),
                      createTextVNode(" constraints")
                    ]),
                    createTextVNode(" restrict values to allowed options (e.g. "),
                    createVNode("code", null, "SchemeName"),
                    createTextVNode(" must be "),
                    createVNode("code", null, "IBAN"),
                    createTextVNode(").")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "$ref"),
                      createTextVNode(" pointers")
                    ]),
                    createTextVNode(" link to nested schemas (creditor, debtor, risk). For validation to work correctly, all "),
                    createVNode("code", null, "components/schemas"),
                    createTextVNode(" entries from the spec MUST be registered with the validator so that "),
                    createVNode("code", null, "$ref"),
                    createTextVNode(" pointers resolve.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you register the full set of component schemas and compile the PII schema, standard JSON Schema validators ("),
                  createVNode("code", null, "ajv"),
                  createTextVNode(" for Node.js, "),
                  createVNode("code", null, "jsonschema"),
                  createTextVNode(" for Python) will enforce all of these constraints automatically. No custom validation logic is needed for schema conformance — the OpenAPI spec is the single source of truth. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The following example shows how to validate a domestic payment PII at consent time:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: validateTabs }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Reject invalid PII"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment. Do not attempt to process a payment with malformed PII — return an appropriate error response. See "),
                    createVNode("a", { href: "../" }, "Personal Identifiable Information"),
                    createTextVNode(" for the full set of validation rules. ")
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
        id: "full-example",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Full example",
        title: "Decryption and validation, end-to-end",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: fullExampleTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCodeGroup, { tabs: fullExampleTabs })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const decryptPii = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97528a10"]]);
export {
  decryptPii as default
};
