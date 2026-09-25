import { _ as __unplugin_components_6$1 } from "./EdRefTable-DCHoNUfr.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-DdFAg-H5.js";
import { _ as __unplugin_components_6 } from "./EdBullets-gB3sPgIp.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_5 } from "./EdNote-61YjJPRT.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const jwksUriPlain = `https://keystore.directory.openfinance.ae/[software-statement-id]/application.jwks
`;
const verifyNode = `import { createRemoteJWKSet, jwtVerify } from 'jose'

async function verifyTPPSignature(
  jwsString: string,
  softwareStatementId: string
): Promise<Record<string, unknown>> {
  // 1. Build a JWKS resolver for the TPP's published keys
  const jwksUri = \`https://keystore.directory.openfinance.ae/\${softwareStatementId}/application.jwks\`
  const jwks = createRemoteJWKSet(new URL(jwksUri))

  // 2. Verify the signature and validate standard claims
  const { payload } = await jwtVerify(jwsString, jwks)

  return payload
}
`;
const verifyPython = `import json
import requests
from jwcrypto import jwt, jwk

def verify_tpp_signature(jws_string: str, software_statement_id: str) -> dict:
    # 1. Fetch the TPP's published keys
    jwks_uri = f"https://keystore.directory.openfinance.ae/{software_statement_id}/application.jwks"
    response = requests.get(jwks_uri)
    keyset = jwk.JWKSet.from_json(response.text)

    # 2. Verify the signature
    verified = jwt.JWT(key=keyset, jwt=jws_string)
    return json.loads(verified.claims)
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "verify-tpp-signature",
  __ssrInlineRender: true,
  setup(__props) {
    const verifyTabs = [{ label: "Node.js (jose)", lang: "typescript", code: verifyNode }, { label: "Python (jwcrypto)", lang: "python", code: verifyPython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_5;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_6;
      const _component_EdCode = EdCode;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdRefTable = __unplugin_components_6$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-13403ccc><section class="ed-doc__hero" data-v-13403ccc><div class="ed-doc__inner" data-v-13403ccc><div class="ed-doc__eyebrow" data-v-13403ccc><span class="ed-doc__eyebrow-dash" data-v-13403ccc></span> LFI · Banking · Service Initiation · PII · API Guide </div><h1 class="ed-doc__title" data-v-13403ccc> Verifying the TPP JWS Signature <span class="ed-doc__read" data-v-13403ccc>3 min read</span></h1>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "This step is optional"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-13403ccc${_scopeId}> The <code data-v-13403ccc${_scopeId}>PersonalIdentifiableInformation</code> field is embedded within a request that the API Hub has already verified was signed by the TPP. The outer JWS signature confirms that the PII was submitted by the authenticated TPP and has not been modified in transit. </p><p data-v-13403ccc${_scopeId}> Verifying the inner JWS signature on the PII payload is therefore <strong data-v-13403ccc${_scopeId}>not required</strong>, but LFIs may choose to implement it as a defence-in-depth measure. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" The "),
                createVNode("code", null, "PersonalIdentifiableInformation"),
                createTextVNode(" field is embedded within a request that the API Hub has already verified was signed by the TPP. The outer JWS signature confirms that the PII was submitted by the authenticated TPP and has not been modified in transit. ")
              ]),
              createVNode("p", null, [
                createTextVNode(" Verifying the inner JWS signature on the PII payload is therefore "),
                createVNode("strong", null, "not required"),
                createTextVNode(", but LFIs may choose to implement it as a defence-in-depth measure. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when-to-consider",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When to consider this",
        title: "Reasons to verify the inner JWS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`You may want to verify the TPP&#39;s JWS signature on the PII if:`);
                } else {
                  return [
                    createTextVNode("You may want to verify the TPP's JWS signature on the PII if:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-13403ccc${_scopeId2}>Your security policy requires independent verification of all signed payloads, regardless of upstream validation.</li><li data-v-13403ccc${_scopeId2}>You want to confirm the specific TPP identity that constructed the PII (available in the <code data-v-13403ccc${_scopeId2}>iss</code> and <code data-v-13403ccc${_scopeId2}>sub</code> claims).</li><li data-v-13403ccc${_scopeId2}>You are building an audit trail that requires cryptographic proof tied to the TPP&#39;s signing key.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Your security policy requires independent verification of all signed payloads, regardless of upstream validation."),
                    createVNode("li", null, [
                      createTextVNode("You want to confirm the specific TPP identity that constructed the PII (available in the "),
                      createVNode("code", null, "iss"),
                      createTextVNode(" and "),
                      createVNode("code", null, "sub"),
                      createTextVNode(" claims).")
                    ]),
                    createVNode("li", null, "You are building an audit trail that requires cryptographic proof tied to the TPP's signing key.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("You may want to verify the TPP's JWS signature on the PII if:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Your security policy requires independent verification of all signed payloads, regardless of upstream validation."),
                  createVNode("li", null, [
                    createTextVNode("You want to confirm the specific TPP identity that constructed the PII (available in the "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" claims).")
                  ]),
                  createVNode("li", null, "You are building an audit trail that requires cryptographic proof tied to the TPP's signing key.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "how-to-verify",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "How to verify",
        title: "Resolve the JWKS, verify the signature",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing key. The JWS header contains the <code data-v-13403ccc${_scopeId2}>kid</code> of the TPP&#39;s signing key, and the <code data-v-13403ccc${_scopeId2}>iss</code> / <code data-v-13403ccc${_scopeId2}>sub</code> claims identify the TPP&#39;s <code data-v-13403ccc${_scopeId2}>client_id</code>. `);
                } else {
                  return [
                    createTextVNode(" The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing key. The JWS header contains the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" of the TPP's signing key, and the "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" / "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" claims identify the TPP's "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-13403ccc${_scopeId}>Step 1 — Discover the TPP&#39;s JWKS</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP&#39;s public signing keys are published through the Trust Framework directory. You can resolve the TPP&#39;s JWKS URI using the <code data-v-13403ccc${_scopeId2}>o3-caller-software-statement-id</code> header from the inbound request: `);
                } else {
                  return [
                    createTextVNode(" The TPP's public signing keys are published through the Trust Framework directory. You can resolve the TPP's JWKS URI using the "),
                    createVNode("code", null, "o3-caller-software-statement-id"),
                    createTextVNode(" header from the inbound request: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jwksUriPlain,
              lang: "text",
              filename: "JWKS URI"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "This resolves active keys only"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-13403ccc${_scopeId2}> The URL above returns the TPP&#39;s <strong data-v-13403ccc${_scopeId2}>currently active</strong> keys. That is sufficient only if you verify at <code data-v-13403ccc${_scopeId2}>/consent/action/validate</code> or the <code data-v-13403ccc${_scopeId2}>post</code> consent event, where the signature is seconds old — <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" data-v-13403ccc${_scopeId2}>Pattern A</a> on the decryption guide. </p><p data-v-13403ccc${_scopeId2}> A TPP may rotate its signing key at any time, and a rotated <code data-v-13403ccc${_scopeId2}>kid</code> leaves the active set. If you verify during the authorisation journey, on <code data-v-13403ccc${_scopeId2}>/consent/event/patch</code>, or at <code data-v-13403ccc${_scopeId2}>POST /payments</code>, you MUST fall back to the parallel <code data-v-13403ccc${_scopeId2}>inactive/</code> JWKS when the <code data-v-13403ccc${_scopeId2}>kid</code> is not in the active set. See <a href="/knowledge-base/articles/pii-signature-verification" data-v-13403ccc${_scopeId2}>Verifying the PII Signature — Rotated Keys and the Inactive JWKS</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The URL above returns the TPP's "),
                      createVNode("strong", null, "currently active"),
                      createTextVNode(" keys. That is sufficient only if you verify at "),
                      createVNode("code", null, "/consent/action/validate"),
                      createTextVNode(" or the "),
                      createVNode("code", null, "post"),
                      createTextVNode(" consent event, where the signature is seconds old — "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" }, "Pattern A"),
                      createTextVNode(" on the decryption guide. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" A TPP may rotate its signing key at any time, and a rotated "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" leaves the active set. If you verify during the authorisation journey, on "),
                      createVNode("code", null, "/consent/event/patch"),
                      createTextVNode(", or at "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", you MUST fall back to the parallel "),
                      createVNode("code", null, "inactive/"),
                      createTextVNode(" JWKS when the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" is not in the active set. See "),
                      createVNode("a", { href: "/knowledge-base/articles/pii-signature-verification" }, "Verifying the PII Signature — Rotated Keys and the Inactive JWKS"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Pin PS256 yourself"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-13403ccc${_scopeId2}> Published JWKS entries carry <code data-v-13403ccc${_scopeId2}>kty</code>, <code data-v-13403ccc${_scopeId2}>use</code>, <code data-v-13403ccc${_scopeId2}>kid</code> and <code data-v-13403ccc${_scopeId2}>x5c</code>, but no <code data-v-13403ccc${_scopeId2}>alg</code>. Pin <strong data-v-13403ccc${_scopeId2}>PS256</strong> — the only signing algorithm in the UAE Open Finance FAPI profile — rather than accepting whatever the JWS header proposes. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Published JWKS entries carry "),
                      createVNode("code", null, "kty"),
                      createTextVNode(", "),
                      createVNode("code", null, "use"),
                      createTextVNode(", "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" and "),
                      createVNode("code", null, "x5c"),
                      createTextVNode(", but no "),
                      createVNode("code", null, "alg"),
                      createTextVNode(". Pin "),
                      createVNode("strong", null, "PS256"),
                      createTextVNode(" — the only signing algorithm in the UAE Open Finance FAPI profile — rather than accepting whatever the JWS header proposes. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-13403ccc${_scopeId}>Step 2 — Verify the JWS</h3>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: verifyTabs }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-13403ccc${_scopeId}>Claims to validate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If you verify the JWS, you SHOULD also validate the following claims:`);
                } else {
                  return [
                    createTextVNode("If you verify the JWS, you SHOULD also validate the following claims:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-13403ccc${_scopeId2}><thead data-v-13403ccc${_scopeId2}><tr data-v-13403ccc${_scopeId2}><th data-v-13403ccc${_scopeId2}>Claim</th><th data-v-13403ccc${_scopeId2}>Validation</th></tr></thead><tbody data-v-13403ccc${_scopeId2}><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>iss</code></td><td data-v-13403ccc${_scopeId2}>Must match the TPP&#39;s <code data-v-13403ccc${_scopeId2}>client_id</code> (available in the <code data-v-13403ccc${_scopeId2}>o3-caller-client-id</code> request header)</td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>sub</code></td><td data-v-13403ccc${_scopeId2}>Must match the TPP&#39;s <code data-v-13403ccc${_scopeId2}>client_id</code></td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>aud</code></td><td data-v-13403ccc${_scopeId2}>Must contain your LFI&#39;s issuer identifier</td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>exp</code></td><td data-v-13403ccc${_scopeId2}>Evaluate against the consent&#39;s <code data-v-13403ccc${_scopeId2}>CreationDateTime</code>, not the current time — see below</td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>nbf</code></td><td data-v-13403ccc${_scopeId2}>Evaluate against the consent&#39;s <code data-v-13403ccc${_scopeId2}>CreationDateTime</code>, not the current time — see below</td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>iat</code></td><td data-v-13403ccc${_scopeId2}>Must be in the past, and consistent with the consent&#39;s <code data-v-13403ccc${_scopeId2}>CreationDateTime</code></td></tr><tr data-v-13403ccc${_scopeId2}><td data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>jti</code></td><td data-v-13403ccc${_scopeId2}>Record for replay detection if required by your security policy</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Validation")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must match the TPP's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(" (available in the "),
                            createVNode("code", null, "o3-caller-client-id"),
                            createTextVNode(" request header)")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sub")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must match the TPP's "),
                            createVNode("code", null, "client_id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, "Must contain your LFI's issuer identifier")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Evaluate against the consent's "),
                            createVNode("code", null, "CreationDateTime"),
                            createTextVNode(", not the current time — see below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Evaluate against the consent's "),
                            createVNode("code", null, "CreationDateTime"),
                            createTextVNode(", not the current time — see below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must be in the past, and consistent with the consent's "),
                            createVNode("code", null, "CreationDateTime")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, "Record for replay detection if required by your security policy")
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
              title: "The timing claims are fixed at consent creation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>exp</code>, <code data-v-13403ccc${_scopeId2}>iat</code> and <code data-v-13403ccc${_scopeId2}>nbf</code> on the PII JWS are set by the TPP when it signs the PII, and they bound the <strong data-v-13403ccc${_scopeId2}>PAR submission window</strong> — not the moment you happen to be verifying. The same PII is replayed unchanged on every payment made under the consent, so on a long-lived consent those claims will normally have lapsed long before execution. </p><p data-v-13403ccc${_scopeId2}><code data-v-13403ccc${_scopeId2}>jwtVerify</code> and its equivalents enforce <code data-v-13403ccc${_scopeId2}>exp</code> and <code data-v-13403ccc${_scopeId2}>nbf</code> against the current time <strong data-v-13403ccc${_scopeId2}>by default</strong>. If you verify anywhere other than consent creation, evaluate them against the consent&#39;s <code data-v-13403ccc${_scopeId2}>CreationDateTime</code> or disable the check — otherwise valid PII will start failing verification as consents age. Whether the consent is still usable today is answered by the API Hub&#39;s consent validation on every request, not by a claim inside the PII. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "exp"),
                      createTextVNode(", "),
                      createVNode("code", null, "iat"),
                      createTextVNode(" and "),
                      createVNode("code", null, "nbf"),
                      createTextVNode(" on the PII JWS are set by the TPP when it signs the PII, and they bound the "),
                      createVNode("strong", null, "PAR submission window"),
                      createTextVNode(" — not the moment you happen to be verifying. The same PII is replayed unchanged on every payment made under the consent, so on a long-lived consent those claims will normally have lapsed long before execution. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("code", null, "jwtVerify"),
                      createTextVNode(" and its equivalents enforce "),
                      createVNode("code", null, "exp"),
                      createTextVNode(" and "),
                      createVNode("code", null, "nbf"),
                      createTextVNode(" against the current time "),
                      createVNode("strong", null, "by default"),
                      createTextVNode(". If you verify anywhere other than consent creation, evaluate them against the consent's "),
                      createVNode("code", null, "CreationDateTime"),
                      createTextVNode(" or disable the check — otherwise valid PII will start failing verification as consents age. Whether the consent is still usable today is answered by the API Hub's consent validation on every request, not by a claim inside the PII. ")
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
                  createTextVNode(" The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing key. The JWS header contains the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" of the TPP's signing key, and the "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" / "),
                  createVNode("code", null, "sub"),
                  createTextVNode(" claims identify the TPP's "),
                  createVNode("code", null, "client_id"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 1 — Discover the TPP's JWKS"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP's public signing keys are published through the Trust Framework directory. You can resolve the TPP's JWKS URI using the "),
                  createVNode("code", null, "o3-caller-software-statement-id"),
                  createTextVNode(" header from the inbound request: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jwksUriPlain,
                lang: "text",
                filename: "JWKS URI"
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "This resolves active keys only"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The URL above returns the TPP's "),
                    createVNode("strong", null, "currently active"),
                    createTextVNode(" keys. That is sufficient only if you verify at "),
                    createVNode("code", null, "/consent/action/validate"),
                    createTextVNode(" or the "),
                    createVNode("code", null, "post"),
                    createTextVNode(" consent event, where the signature is seconds old — "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" }, "Pattern A"),
                    createTextVNode(" on the decryption guide. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" A TPP may rotate its signing key at any time, and a rotated "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" leaves the active set. If you verify during the authorisation journey, on "),
                    createVNode("code", null, "/consent/event/patch"),
                    createTextVNode(", or at "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(", you MUST fall back to the parallel "),
                    createVNode("code", null, "inactive/"),
                    createTextVNode(" JWKS when the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" is not in the active set. See "),
                    createVNode("a", { href: "/knowledge-base/articles/pii-signature-verification" }, "Verifying the PII Signature — Rotated Keys and the Inactive JWKS"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "Pin PS256 yourself"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Published JWKS entries carry "),
                    createVNode("code", null, "kty"),
                    createTextVNode(", "),
                    createVNode("code", null, "use"),
                    createTextVNode(", "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x5c"),
                    createTextVNode(", but no "),
                    createVNode("code", null, "alg"),
                    createTextVNode(". Pin "),
                    createVNode("strong", null, "PS256"),
                    createTextVNode(" — the only signing algorithm in the UAE Open Finance FAPI profile — rather than accepting whatever the JWS header proposes. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Step 2 — Verify the JWS"),
              createVNode(_component_EdCodeGroup, { tabs: verifyTabs }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Claims to validate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If you verify the JWS, you SHOULD also validate the following claims:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Validation")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must match the TPP's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(" (available in the "),
                          createVNode("code", null, "o3-caller-client-id"),
                          createTextVNode(" request header)")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sub")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must match the TPP's "),
                          createVNode("code", null, "client_id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, "Must contain your LFI's issuer identifier")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Evaluate against the consent's "),
                          createVNode("code", null, "CreationDateTime"),
                          createTextVNode(", not the current time — see below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Evaluate against the consent's "),
                          createVNode("code", null, "CreationDateTime"),
                          createTextVNode(", not the current time — see below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must be in the past, and consistent with the consent's "),
                          createVNode("code", null, "CreationDateTime")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, "Record for replay detection if required by your security policy")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "The timing claims are fixed at consent creation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "exp"),
                    createTextVNode(", "),
                    createVNode("code", null, "iat"),
                    createTextVNode(" and "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" on the PII JWS are set by the TPP when it signs the PII, and they bound the "),
                    createVNode("strong", null, "PAR submission window"),
                    createTextVNode(" — not the moment you happen to be verifying. The same PII is replayed unchanged on every payment made under the consent, so on a long-lived consent those claims will normally have lapsed long before execution. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("code", null, "jwtVerify"),
                    createTextVNode(" and its equivalents enforce "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" and "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" against the current time "),
                    createVNode("strong", null, "by default"),
                    createTextVNode(". If you verify anywhere other than consent creation, evaluate them against the consent's "),
                    createVNode("code", null, "CreationDateTime"),
                    createTextVNode(" or disable the check — otherwise valid PII will start failing verification as consents age. Whether the consent is still usable today is answered by the API Hub's consent validation on every request, not by a claim inside the PII. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const verifyTppSignature = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-13403ccc"]]);
export {
  verifyTppSignature as default
};
