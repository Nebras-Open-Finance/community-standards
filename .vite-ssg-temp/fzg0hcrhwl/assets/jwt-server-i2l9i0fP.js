import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdCode = EdCode;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-dffb76ac><section class="ed-doc__hero" data-v-dffb76ac><div class="ed-doc__inner" data-v-dffb76ac><div class="ed-doc__eyebrow" data-v-dffb76ac><span class="ed-doc__eyebrow-dash" data-v-dffb76ac></span> LFI · API Hub · Onboarding · Configuring Auth </div><h1 class="ed-doc__title" data-v-dffb76ac> JWT Auth — Server-side (LFI Receiving a Token) <span class="ed-doc__read" data-v-dffb76ac>2 min read</span></h1><p class="ed-doc__lede" data-v-dffb76ac> This page describes how your Ozone Connect server validates JWT Auth tokens sent by the API Hub. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth" data-v-dffb76ac>Application Layer Authentication</a> for an overview of all available methods and when to select JWT Auth. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-dffb76ac> When the API Hub sends requests to your Ozone Connect endpoints, it includes a JWT Auth token in the <code data-v-dffb76ac>Authorization</code> header. Your server MUST validate this token on every request. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "validating-token",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Validating the token",
    title: "Verify mTLS, signature, and claims on every request",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-dffb76ac${_scopeId2}>Ensure the machine verifying the signature uses <strong data-v-dffb76ac${_scopeId2}>NTP</strong> to synchronise its clock.</li><li data-v-dffb76ac${_scopeId2}>Verify that the request was received over a <strong data-v-dffb76ac${_scopeId2}>mutual TLS</strong> connection.</li><li data-v-dffb76ac${_scopeId2}>Extract the JWT Auth token from the <code data-v-dffb76ac${_scopeId2}>Authorization</code> HTTP header.</li><li data-v-dffb76ac${_scopeId2}>Verify the signature on the JWT using the <code data-v-dffb76ac${_scopeId2}>kid</code> specified in the JWS header.</li><li data-v-dffb76ac${_scopeId2}> Derive the JWKS URI from the requestor&#39;s client certificate subject. The <code data-v-dffb76ac${_scopeId2}>OU</code> and <code data-v-dffb76ac${_scopeId2}>CN</code> values are substituted as follows: </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Ensure the machine verifying the signature uses "),
                  createVNode("strong", null, "NTP"),
                  createTextVNode(" to synchronise its clock.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Verify that the request was received over a "),
                  createVNode("strong", null, "mutual TLS"),
                  createTextVNode(" connection.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Extract the JWT Auth token from the "),
                  createVNode("code", null, "Authorization"),
                  createTextVNode(" HTTP header.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Verify the signature on the JWT using the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" specified in the JWS header.")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Derive the JWKS URI from the requestor's client certificate subject. The "),
                  createVNode("code", null, "OU"),
                  createTextVNode(" and "),
                  createVNode("code", null, "CN"),
                  createTextVNode(" values are substituted as follows: ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-dffb76ac${_scopeId}>Template</h3>`);
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: `Sandbox:    https://keystore.sandbox.directory.openfinance.ae/\${OU}/\${CN}/application.jwks
Production: https://keystore.directory.openfinance.ae/\${OU}/\${CN}/application.jwks`
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-dffb76ac${_scopeId}>Example</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For a requestor client certificate subject <code data-v-dffb76ac${_scopeId2}>CN=ABC, OU=XYZ, O=Organisation Name, C=AE</code>: `);
            } else {
              return [
                createTextVNode(" For a requestor client certificate subject "),
                createVNode("code", null, "CN=ABC, OU=XYZ, O=Organisation Name, C=AE"),
                createTextVNode(": ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: "https://keystore.sandbox.directory.openfinance.ae/XYZ/ABC/application.jwks"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-dffb76ac${_scopeId2}>The JWKS MAY be cached for up to <strong data-v-dffb76ac${_scopeId2}>10 minutes</strong>.</li><li data-v-dffb76ac${_scopeId2}>Verify each claim in the JWT against the expected values specified in the <a href="#claims-reference" data-v-dffb76ac${_scopeId2}>Claims Reference</a> below.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("The JWKS MAY be cached for up to "),
                  createVNode("strong", null, "10 minutes"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, [
                  createTextVNode("Verify each claim in the JWT against the expected values specified in the "),
                  createVNode("a", { href: "#claims-reference" }, "Claims Reference"),
                  createTextVNode(" below.")
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
                createTextVNode("Ensure the machine verifying the signature uses "),
                createVNode("strong", null, "NTP"),
                createTextVNode(" to synchronise its clock.")
              ]),
              createVNode("li", null, [
                createTextVNode("Verify that the request was received over a "),
                createVNode("strong", null, "mutual TLS"),
                createTextVNode(" connection.")
              ]),
              createVNode("li", null, [
                createTextVNode("Extract the JWT Auth token from the "),
                createVNode("code", null, "Authorization"),
                createTextVNode(" HTTP header.")
              ]),
              createVNode("li", null, [
                createTextVNode("Verify the signature on the JWT using the "),
                createVNode("code", null, "kid"),
                createTextVNode(" specified in the JWS header.")
              ]),
              createVNode("li", null, [
                createTextVNode(" Derive the JWKS URI from the requestor's client certificate subject. The "),
                createVNode("code", null, "OU"),
                createTextVNode(" and "),
                createVNode("code", null, "CN"),
                createTextVNode(" values are substituted as follows: ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Template"),
          createVNode(_component_EdCode, {
            lang: "text",
            code: `Sandbox:    https://keystore.sandbox.directory.openfinance.ae/\${OU}/\${CN}/application.jwks
Production: https://keystore.directory.openfinance.ae/\${OU}/\${CN}/application.jwks`
          }),
          createVNode("h3", null, "Example"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For a requestor client certificate subject "),
              createVNode("code", null, "CN=ABC, OU=XYZ, O=Organisation Name, C=AE"),
              createTextVNode(": ")
            ]),
            _: 1
          }),
          createVNode(_component_EdCode, {
            lang: "text",
            code: "https://keystore.sandbox.directory.openfinance.ae/XYZ/ABC/application.jwks"
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("The JWKS MAY be cached for up to "),
                createVNode("strong", null, "10 minutes"),
                createTextVNode(".")
              ]),
              createVNode("li", null, [
                createTextVNode("Verify each claim in the JWT against the expected values specified in the "),
                createVNode("a", { href: "#claims-reference" }, "Claims Reference"),
                createTextVNode(" below.")
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
    id: "claims-reference",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "JWT Auth claims reference",
    title: "Header and body claims",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-dffb76ac${_scopeId}>Header</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-dffb76ac${_scopeId2}><thead data-v-dffb76ac${_scopeId2}><tr data-v-dffb76ac${_scopeId2}><th data-v-dffb76ac${_scopeId2}>Claim</th><th data-v-dffb76ac${_scopeId2}>Expected Value</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Mandatory</th><th data-v-dffb76ac${_scopeId2}>Notes</th></tr></thead><tbody data-v-dffb76ac${_scopeId2}><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>alg</code></td><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>PS256</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}></td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>typ</code></td><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>JOSE</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}></td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>cty</code></td><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>json</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}></td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>kid</code></td><td data-v-dffb76ac${_scopeId2}>The key ID of the keypair used to sign the message, as published on the JWKS.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>Other means of identifying the key (e.g. <code data-v-dffb76ac${_scopeId2}>x5c</code>, <code data-v-dffb76ac${_scopeId2}>x5u</code>) are not supported.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Claim"),
                      createVNode("th", null, "Expected Value"),
                      createVNode("th", { style: { "text-align": "center" } }, "Mandatory"),
                      createVNode("th", null, "Notes")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "alg")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "PS256")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "typ")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "JOSE")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "cty")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "json")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "kid")
                      ]),
                      createVNode("td", null, "The key ID of the keypair used to sign the message, as published on the JWKS."),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createTextVNode("Other means of identifying the key (e.g. "),
                        createVNode("code", null, "x5c"),
                        createTextVNode(", "),
                        createVNode("code", null, "x5u"),
                        createTextVNode(") are not supported.")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-dffb76ac${_scopeId}>Body</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-dffb76ac${_scopeId2}><thead data-v-dffb76ac${_scopeId2}><tr data-v-dffb76ac${_scopeId2}><th data-v-dffb76ac${_scopeId2}>Claim</th><th data-v-dffb76ac${_scopeId2}>Expected Value</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Mandatory</th><th data-v-dffb76ac${_scopeId2}>Notes</th></tr></thead><tbody data-v-dffb76ac${_scopeId2}><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>iss</code></td><td data-v-dffb76ac${_scopeId2}>The organisation <code data-v-dffb76ac${_scopeId2}>O</code> value from the TLS certificate Subject used in the transport layer.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>For a certificate with Subject <code data-v-dffb76ac${_scopeId2}>CN=ABC, OU=XYZ, O=Acme Bank, C=AE</code>, this would be <code data-v-dffb76ac${_scopeId2}>Acme Bank</code>.</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>sub</code></td><td data-v-dffb76ac${_scopeId2}>The organisation unit <code data-v-dffb76ac${_scopeId2}>OU</code> value from the TLS certificate Subject used in the transport layer.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>For the same certificate, this would be <code data-v-dffb76ac${_scopeId2}>XYZ</code>.</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>aud</code></td><td data-v-dffb76ac${_scopeId2}>Identifier for the party receiving the JWT.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>This MUST be set to the <code data-v-dffb76ac${_scopeId2}>PROVIDER_ID</code> specified during configuration.</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>exp</code></td><td data-v-dffb76ac${_scopeId2}>Time when the JWT will expire, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value.</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>iat</code></td><td data-v-dffb76ac${_scopeId2}>Time when the JWT was issued, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value.</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>nbf</code></td><td data-v-dffb76ac${_scopeId2}>Time before which the JWT is invalid, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>No</td><td data-v-dffb76ac${_scopeId2}>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified).</td></tr><tr data-v-dffb76ac${_scopeId2}><td data-v-dffb76ac${_scopeId2}><code data-v-dffb76ac${_scopeId2}>jti</code></td><td data-v-dffb76ac${_scopeId2}>A unique identifier for the JWT.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-dffb76ac${_scopeId2}>Yes</td><td data-v-dffb76ac${_scopeId2}>Recommended: populate with a UUIDv4 to increase entropy.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Claim"),
                      createVNode("th", null, "Expected Value"),
                      createVNode("th", { style: { "text-align": "center" } }, "Mandatory"),
                      createVNode("th", null, "Notes")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "iss")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The organisation "),
                        createVNode("code", null, "O"),
                        createTextVNode(" value from the TLS certificate Subject used in the transport layer.")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createTextVNode("For a certificate with Subject "),
                        createVNode("code", null, "CN=ABC, OU=XYZ, O=Acme Bank, C=AE"),
                        createTextVNode(", this would be "),
                        createVNode("code", null, "Acme Bank"),
                        createTextVNode(".")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "sub")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The organisation unit "),
                        createVNode("code", null, "OU"),
                        createTextVNode(" value from the TLS certificate Subject used in the transport layer.")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createTextVNode("For the same certificate, this would be "),
                        createVNode("code", null, "XYZ"),
                        createTextVNode(".")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "aud")
                      ]),
                      createVNode("td", null, "Identifier for the party receiving the JWT."),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createTextVNode("This MUST be set to the "),
                        createVNode("code", null, "PROVIDER_ID"),
                        createTextVNode(" specified during configuration.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "exp")
                      ]),
                      createVNode("td", null, "Time when the JWT will expire, in UTC seconds since epoch."),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, "Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "iat")
                      ]),
                      createVNode("td", null, "Time when the JWT was issued, in UTC seconds since epoch."),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, "When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "nbf")
                      ]),
                      createVNode("td", null, "Time before which the JWT is invalid, in UTC seconds since epoch."),
                      createVNode("td", { style: { "text-align": "center" } }, "No"),
                      createVNode("td", null, "When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified).")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "jti")
                      ]),
                      createVNode("td", null, "A unique identifier for the JWT."),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, "Recommended: populate with a UUIDv4 to increase entropy.")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Header"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Claim"),
                    createVNode("th", null, "Expected Value"),
                    createVNode("th", { style: { "text-align": "center" } }, "Mandatory"),
                    createVNode("th", null, "Notes")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "alg")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "PS256")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "typ")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "JOSE")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "cty")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "json")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "kid")
                    ]),
                    createVNode("td", null, "The key ID of the keypair used to sign the message, as published on the JWKS."),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createTextVNode("Other means of identifying the key (e.g. "),
                      createVNode("code", null, "x5c"),
                      createTextVNode(", "),
                      createVNode("code", null, "x5u"),
                      createTextVNode(") are not supported.")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Body"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Claim"),
                    createVNode("th", null, "Expected Value"),
                    createVNode("th", { style: { "text-align": "center" } }, "Mandatory"),
                    createVNode("th", null, "Notes")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "iss")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The organisation "),
                      createVNode("code", null, "O"),
                      createTextVNode(" value from the TLS certificate Subject used in the transport layer.")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createTextVNode("For a certificate with Subject "),
                      createVNode("code", null, "CN=ABC, OU=XYZ, O=Acme Bank, C=AE"),
                      createTextVNode(", this would be "),
                      createVNode("code", null, "Acme Bank"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "sub")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The organisation unit "),
                      createVNode("code", null, "OU"),
                      createTextVNode(" value from the TLS certificate Subject used in the transport layer.")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createTextVNode("For the same certificate, this would be "),
                      createVNode("code", null, "XYZ"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "aud")
                    ]),
                    createVNode("td", null, "Identifier for the party receiving the JWT."),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createTextVNode("This MUST be set to the "),
                      createVNode("code", null, "PROVIDER_ID"),
                      createTextVNode(" specified during configuration.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "exp")
                    ]),
                    createVNode("td", null, "Time when the JWT will expire, in UTC seconds since epoch."),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, "Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "iat")
                    ]),
                    createVNode("td", null, "Time when the JWT was issued, in UTC seconds since epoch."),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, "When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "nbf")
                    ]),
                    createVNode("td", null, "Time before which the JWT is invalid, in UTC seconds since epoch."),
                    createVNode("td", { style: { "text-align": "center" } }, "No"),
                    createVNode("td", null, "When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified).")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "jti")
                    ]),
                    createVNode("td", null, "A unique identifier for the JWT."),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, "Recommended: populate with a UUIDv4 to increase entropy.")
                  ])
                ])
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
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const jwtServer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dffb76ac"]]);
export {
  jwtServer as default
};
