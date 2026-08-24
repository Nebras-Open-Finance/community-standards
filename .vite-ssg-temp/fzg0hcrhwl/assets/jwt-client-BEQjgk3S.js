import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdNote = __unplugin_components_7;
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-6e13ebf9><section class="ed-doc__hero" data-v-6e13ebf9><div class="ed-doc__inner" data-v-6e13ebf9><div class="ed-doc__eyebrow" data-v-6e13ebf9><span class="ed-doc__eyebrow-dash" data-v-6e13ebf9></span> LFI · API Hub · Onboarding · Configuring Auth </div><h1 class="ed-doc__title" data-v-6e13ebf9> JWT Auth — Client-side (LFI Sending a Token) <span class="ed-doc__read" data-v-6e13ebf9>2 min read</span></h1><p class="ed-doc__lede" data-v-6e13ebf9> This page describes how your authorisation server constructs and sends JWT Auth tokens when calling the API Hub&#39;s Consent Manager and Headless Heimdall Auth Server endpoints. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth" data-v-6e13ebf9>Application Layer Authentication</a> for an overview of all available methods and when to select JWT Auth. </p>`);
  _push(ssrRenderComponent(_component_EdNote, {
    type: "info",
    title: "Optional"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-6e13ebf9${_scopeId}> Sending JWT Auth from the LFI to the API Hub is optional even when JWT Auth is selected. It is configured separately from the API Hub → LFI direction — indicate your preference on the onboarding Service Desk ticket. </p>`);
      } else {
        return [
          createVNode("p", null, " Sending JWT Auth from the LFI to the API Hub is optional even when JWT Auth is selected. It is configured separately from the API Hub → LFI direction — indicate your preference on the onboarding Service Desk ticket. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="ed-doc__lede ed-doc__lede--tight" data-v-6e13ebf9> When your authorisation server calls API Hub endpoints (Consent Manager or Headless Heimdall Auth Server), you MUST construct a JWT Auth token and include it as a Bearer token in the <code data-v-6e13ebf9>Authorization</code> HTTP header. The request MUST also be made over mutual TLS — see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-client" data-v-6e13ebf9>Configuring Outbound mTLS</a>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "publishing-keys",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Publishing signing keys on a JWKS",
    title: "Set up the C3-hh-cm-client application",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-6e13ebf9${_scopeId2}>Create an Application in your Trust Framework Organisation labelled <code data-v-6e13ebf9${_scopeId2}>C3-hh-cm-client</code>.</li><li data-v-6e13ebf9${_scopeId2}>Create both the <strong data-v-6e13ebf9${_scopeId2}>C3</strong> transport client certificate and <strong data-v-6e13ebf9${_scopeId2}>Sig4</strong> signing certificate in this Application using the code snippets provided in the Trust Framework.</li><li data-v-6e13ebf9${_scopeId2}>The Trust Framework will create a unique <code data-v-6e13ebf9${_scopeId2}>kid</code> and host the JWKS.</li><li data-v-6e13ebf9${_scopeId2}>When publishing a new key, wait <strong data-v-6e13ebf9${_scopeId2}>10 minutes</strong> before issuing a message signed with that key. This allows the receiver&#39;s JWKS cache to refresh.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Create an Application in your Trust Framework Organisation labelled "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, [
                  createTextVNode("Create both the "),
                  createVNode("strong", null, "C3"),
                  createTextVNode(" transport client certificate and "),
                  createVNode("strong", null, "Sig4"),
                  createTextVNode(" signing certificate in this Application using the code snippets provided in the Trust Framework.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The Trust Framework will create a unique "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" and host the JWKS.")
                ]),
                createVNode("li", null, [
                  createTextVNode("When publishing a new key, wait "),
                  createVNode("strong", null, "10 minutes"),
                  createTextVNode(" before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh.")
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
                createTextVNode("Create an Application in your Trust Framework Organisation labelled "),
                createVNode("code", null, "C3-hh-cm-client"),
                createTextVNode(".")
              ]),
              createVNode("li", null, [
                createTextVNode("Create both the "),
                createVNode("strong", null, "C3"),
                createTextVNode(" transport client certificate and "),
                createVNode("strong", null, "Sig4"),
                createTextVNode(" signing certificate in this Application using the code snippets provided in the Trust Framework.")
              ]),
              createVNode("li", null, [
                createTextVNode("The Trust Framework will create a unique "),
                createVNode("code", null, "kid"),
                createTextVNode(" and host the JWKS.")
              ]),
              createVNode("li", null, [
                createTextVNode("When publishing a new key, wait "),
                createVNode("strong", null, "10 minutes"),
                createTextVNode(" before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh.")
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
    id: "constructing-token",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Constructing the token",
    title: "Sign with PS256 over mTLS",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-6e13ebf9${_scopeId2}>Ensure the machine generating the signature uses <strong data-v-6e13ebf9${_scopeId2}>NTP</strong> to synchronise its clock.</li><li data-v-6e13ebf9${_scopeId2}>Construct the JWT header and payload as specified in the <a href="#claims-reference" data-v-6e13ebf9${_scopeId2}>Claims Reference</a> below.</li><li data-v-6e13ebf9${_scopeId2}>Sign the JWT using the <strong data-v-6e13ebf9${_scopeId2}>PS256</strong> algorithm with a private signing key from the <code data-v-6e13ebf9${_scopeId2}>C3-hh-cm-client</code> application.</li><li data-v-6e13ebf9${_scopeId2}>Include the JWT as a <code data-v-6e13ebf9${_scopeId2}>Bearer</code> token in the <code data-v-6e13ebf9${_scopeId2}>Authorization</code> HTTP header.</li><li data-v-6e13ebf9${_scopeId2}>The HTTPS request MUST be made over mutual TLS. The <strong data-v-6e13ebf9${_scopeId2}>C3</strong> client certificate MUST be used to initiate the mTLS session, and MUST have a <code data-v-6e13ebf9${_scopeId2}>DN</code> and <code data-v-6e13ebf9${_scopeId2}>OU</code> that match the values placed in the JWT signature claims.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Ensure the machine generating the signature uses "),
                  createVNode("strong", null, "NTP"),
                  createTextVNode(" to synchronise its clock.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Construct the JWT header and payload as specified in the "),
                  createVNode("a", { href: "#claims-reference" }, "Claims Reference"),
                  createTextVNode(" below.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Sign the JWT using the "),
                  createVNode("strong", null, "PS256"),
                  createTextVNode(" algorithm with a private signing key from the "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(" application.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Include the JWT as a "),
                  createVNode("code", null, "Bearer"),
                  createTextVNode(" token in the "),
                  createVNode("code", null, "Authorization"),
                  createTextVNode(" HTTP header.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The HTTPS request MUST be made over mutual TLS. The "),
                  createVNode("strong", null, "C3"),
                  createTextVNode(" client certificate MUST be used to initiate the mTLS session, and MUST have a "),
                  createVNode("code", null, "DN"),
                  createTextVNode(" and "),
                  createVNode("code", null, "OU"),
                  createTextVNode(" that match the values placed in the JWT signature claims.")
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
                createTextVNode("Ensure the machine generating the signature uses "),
                createVNode("strong", null, "NTP"),
                createTextVNode(" to synchronise its clock.")
              ]),
              createVNode("li", null, [
                createTextVNode("Construct the JWT header and payload as specified in the "),
                createVNode("a", { href: "#claims-reference" }, "Claims Reference"),
                createTextVNode(" below.")
              ]),
              createVNode("li", null, [
                createTextVNode("Sign the JWT using the "),
                createVNode("strong", null, "PS256"),
                createTextVNode(" algorithm with a private signing key from the "),
                createVNode("code", null, "C3-hh-cm-client"),
                createTextVNode(" application.")
              ]),
              createVNode("li", null, [
                createTextVNode("Include the JWT as a "),
                createVNode("code", null, "Bearer"),
                createTextVNode(" token in the "),
                createVNode("code", null, "Authorization"),
                createTextVNode(" HTTP header.")
              ]),
              createVNode("li", null, [
                createTextVNode("The HTTPS request MUST be made over mutual TLS. The "),
                createVNode("strong", null, "C3"),
                createTextVNode(" client certificate MUST be used to initiate the mTLS session, and MUST have a "),
                createVNode("code", null, "DN"),
                createTextVNode(" and "),
                createVNode("code", null, "OU"),
                createTextVNode(" that match the values placed in the JWT signature claims.")
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
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "JWT Auth claims reference",
    title: "Header and body claims",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-6e13ebf9${_scopeId}>Header</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-6e13ebf9${_scopeId2}><thead data-v-6e13ebf9${_scopeId2}><tr data-v-6e13ebf9${_scopeId2}><th data-v-6e13ebf9${_scopeId2}>Claim</th><th data-v-6e13ebf9${_scopeId2}>Expected Value</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Mandatory</th><th data-v-6e13ebf9${_scopeId2}>Notes</th></tr></thead><tbody data-v-6e13ebf9${_scopeId2}><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>alg</code></td><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>PS256</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}></td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>typ</code></td><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>JOSE</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}></td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>cty</code></td><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>json</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}></td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>kid</code></td><td data-v-6e13ebf9${_scopeId2}>The key ID of the keypair used to sign the message, as published on the JWKS.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>Other means of identifying the key (e.g. <code data-v-6e13ebf9${_scopeId2}>x5c</code>, <code data-v-6e13ebf9${_scopeId2}>x5u</code>) are not supported.</td></tr></tbody></table>`);
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
        _push2(`<h3 data-v-6e13ebf9${_scopeId}>Body</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-6e13ebf9${_scopeId2}><thead data-v-6e13ebf9${_scopeId2}><tr data-v-6e13ebf9${_scopeId2}><th data-v-6e13ebf9${_scopeId2}>Claim</th><th data-v-6e13ebf9${_scopeId2}>Expected Value</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Mandatory</th><th data-v-6e13ebf9${_scopeId2}>Notes</th></tr></thead><tbody data-v-6e13ebf9${_scopeId2}><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>iss</code></td><td data-v-6e13ebf9${_scopeId2}>The organisation <code data-v-6e13ebf9${_scopeId2}>O</code> value from the TLS certificate Subject used in the transport layer.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>For a certificate with Subject <code data-v-6e13ebf9${_scopeId2}>CN=ABC, OU=XYZ, O=Acme Bank, C=AE</code>, this would be <code data-v-6e13ebf9${_scopeId2}>Acme Bank</code>.</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>sub</code></td><td data-v-6e13ebf9${_scopeId2}>The organisation unit <code data-v-6e13ebf9${_scopeId2}>OU</code> value from the TLS certificate Subject used in the transport layer.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>For the same certificate, this would be <code data-v-6e13ebf9${_scopeId2}>XYZ</code>.</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>aud</code></td><td data-v-6e13ebf9${_scopeId2}>Identifier for the party receiving the JWT.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>This MUST be set to the <code data-v-6e13ebf9${_scopeId2}>PROVIDER_ID</code> specified during configuration.</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>exp</code></td><td data-v-6e13ebf9${_scopeId2}>Time when the JWT will expire, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value.</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>iat</code></td><td data-v-6e13ebf9${_scopeId2}>Time when the JWT was issued, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value.</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>nbf</code></td><td data-v-6e13ebf9${_scopeId2}>Time before which the JWT is invalid, in UTC seconds since epoch.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>No</td><td data-v-6e13ebf9${_scopeId2}>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified).</td></tr><tr data-v-6e13ebf9${_scopeId2}><td data-v-6e13ebf9${_scopeId2}><code data-v-6e13ebf9${_scopeId2}>jti</code></td><td data-v-6e13ebf9${_scopeId2}>A unique identifier for the JWT.</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-6e13ebf9${_scopeId2}>Yes</td><td data-v-6e13ebf9${_scopeId2}>Recommended: populate with a UUIDv4 to increase entropy.</td></tr></tbody></table>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const jwtClient = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6e13ebf9"]]);
export {
  jwtClient as default
};
