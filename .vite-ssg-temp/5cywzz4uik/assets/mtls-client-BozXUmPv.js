import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-393e53ee><section class="ed-doc__hero" data-v-393e53ee><div class="ed-doc__inner" data-v-393e53ee><div class="ed-doc__eyebrow" data-v-393e53ee><span class="ed-doc__eyebrow-dash" data-v-393e53ee></span> LFI · API Hub · Onboarding · Configuring Auth </div><h1 class="ed-doc__title" data-v-393e53ee> Configuring Outbound mTLS <span class="ed-doc__read" data-v-393e53ee>3 min read</span></h1><p class="ed-doc__lede" data-v-393e53ee> This page describes how the LFI MUST configure outbound mutual TLS (mTLS) when its authorisation server calls the API Hub&#39;s Consent Manager and Headless Heimdall Auth Server endpoints during consent and authorisation flows. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "why-outbound-mtls",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Why the LFI must configure outbound mTLS",
    title: "Every CM and HH call is mutual TLS with C3",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Every request from the LFI to the API Hub&#39;s Consent Manager or Headless Heimdall Auth Server is a mutual TLS connection in which the LFI presents the <strong data-v-393e53ee${_scopeId2}>C3</strong> transport client certificate. The API Hub rejects any call to these endpoints that does not present a valid C3 certificate. `);
            } else {
              return [
                createTextVNode(" Every request from the LFI to the API Hub's Consent Manager or Headless Heimdall Auth Server is a mutual TLS connection in which the LFI presents the "),
                createVNode("strong", null, "C3"),
                createTextVNode(" transport client certificate. The API Hub rejects any call to these endpoints that does not present a valid C3 certificate. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI&#39;s outbound HTTP client — typically the authorisation server application that orchestrates consent — MUST be configured to: `);
            } else {
              return [
                createTextVNode(" The LFI's outbound HTTP client — typically the authorisation server application that orchestrates consent — MUST be configured to: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Present</strong> the C3 client certificate and its private key on every outbound connection, and</li><li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Trust</strong> the API Hub&#39;s server certificate chain so the TLS handshake succeeds.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Present"),
                  createTextVNode(" the C3 client certificate and its private key on every outbound connection, and")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Trust"),
                  createTextVNode(" the API Hub's server certificate chain so the TLS handshake succeeds.")
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
              createTextVNode(" Every request from the LFI to the API Hub's Consent Manager or Headless Heimdall Auth Server is a mutual TLS connection in which the LFI presents the "),
              createVNode("strong", null, "C3"),
              createTextVNode(" transport client certificate. The API Hub rejects any call to these endpoints that does not present a valid C3 certificate. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The LFI's outbound HTTP client — typically the authorisation server application that orchestrates consent — MUST be configured to: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Present"),
                createTextVNode(" the C3 client certificate and its private key on every outbound connection, and")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Trust"),
                createTextVNode(" the API Hub's server certificate chain so the TLS handshake succeeds.")
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
    id: "trust-framework-cas",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Trust Framework certificate authorities",
    title: "Same PKI as the inbound direction",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment pairs with a distinct Trust Framework: `);
            } else {
              return [
                createTextVNode(" Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment pairs with a distinct Trust Framework: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Production</strong> API Hub → <strong data-v-393e53ee${_scopeId2}>Production</strong> Trust Framework</li><li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Pre-production</strong> API Hub → <strong data-v-393e53ee${_scopeId2}>Sandbox</strong> Trust Framework</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Production"),
                  createTextVNode(" API Hub → "),
                  createVNode("strong", null, "Production"),
                  createTextVNode(" Trust Framework")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Pre-production"),
                  createTextVNode(" API Hub → "),
                  createVNode("strong", null, "Sandbox"),
                  createTextVNode(" Trust Framework")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Root and Issuing CA details for each environment are documented on <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-framework-cas" data-v-393e53ee${_scopeId2}>Configuring Inbound mTLS — Section 2</a>. The same CA bundle assembled for inbound mTLS is re-used on the outbound direction. `);
            } else {
              return [
                createTextVNode(" The Root and Issuing CA details for each environment are documented on "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-framework-cas" }, "Configuring Inbound mTLS — Section 2"),
                createTextVNode(". The same CA bundle assembled for inbound mTLS is re-used on the outbound direction. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment pairs with a distinct Trust Framework: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Production"),
                createTextVNode(" API Hub → "),
                createVNode("strong", null, "Production"),
                createTextVNode(" Trust Framework")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Pre-production"),
                createTextVNode(" API Hub → "),
                createVNode("strong", null, "Sandbox"),
                createTextVNode(" Trust Framework")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Root and Issuing CA details for each environment are documented on "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-framework-cas" }, "Configuring Inbound mTLS — Section 2"),
              createTextVNode(". The same CA bundle assembled for inbound mTLS is re-used on the outbound direction. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "configuring-client",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Configuring your outbound HTTP client",
    title: "Present the C3 cert, trust the API Hub server chain",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Outbound mTLS configuration has two parts:`);
            } else {
              return [
                createTextVNode("Outbound mTLS configuration has two parts:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Present the C3 client certificate</strong> so the API Hub accepts the TLS handshake and can identify your organisation.</li><li data-v-393e53ee${_scopeId2}><strong data-v-393e53ee${_scopeId2}>Trust the API Hub&#39;s server chain</strong> so the handshake completes and your client does not fall back to an untrusted state.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Present the C3 client certificate"),
                  createTextVNode(" so the API Hub accepts the TLS handshake and can identify your organisation.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Trust the API Hub's server chain"),
                  createTextVNode(" so the handshake completes and your client does not fall back to an untrusted state.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-393e53ee${_scopeId}>3a. Present the C3 client certificate</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The C3 transport client certificate is created inside the <code data-v-393e53ee${_scopeId2}>C3-hh-cm-client</code> Application in your Trust Framework Organisation. The same Application also holds the <strong data-v-393e53ee${_scopeId2}>Sig4</strong> signing certificate used for <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" data-v-393e53ee${_scopeId2}>JWT Auth — Client-side</a> when JWT Auth is enabled on the LFI → Hub direction. `);
            } else {
              return [
                createTextVNode(" The C3 transport client certificate is created inside the "),
                createVNode("code", null, "C3-hh-cm-client"),
                createTextVNode(" Application in your Trust Framework Organisation. The same Application also holds the "),
                createVNode("strong", null, "Sig4"),
                createTextVNode(" signing certificate used for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
                createTextVNode(" when JWT Auth is enabled on the LFI → Hub direction. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-393e53ee${_scopeId2}>In your Trust Framework Organisation, open the <strong data-v-393e53ee${_scopeId2}><code data-v-393e53ee${_scopeId2}>C3-hh-cm-client</code></strong> Application.</li><li data-v-393e53ee${_scopeId2}>Create (or reuse) the <strong data-v-393e53ee${_scopeId2}>C3</strong> transport client certificate, following the code snippets provided in the Trust Framework.</li><li data-v-393e53ee${_scopeId2}>Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12).</li><li data-v-393e53ee${_scopeId2}>Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub&#39;s Consent Manager and Headless Heimdall Auth Server endpoints.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("In your Trust Framework Organisation, open the "),
                  createVNode("strong", null, [
                    createVNode("code", null, "C3-hh-cm-client")
                  ]),
                  createTextVNode(" Application.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Create (or reuse) the "),
                  createVNode("strong", null, "C3"),
                  createTextVNode(" transport client certificate, following the code snippets provided in the Trust Framework.")
                ]),
                createVNode("li", null, "Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12)."),
                createVNode("li", null, "Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Per-environment certificates"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-393e53ee${_scopeId2}> The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework. Do not share key material between environments. </p>`);
            } else {
              return [
                createVNode("p", null, " The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework. Do not share key material between environments. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The C3 certificate subject — specifically its <code data-v-393e53ee${_scopeId2}>OU</code> and <code data-v-393e53ee${_scopeId2}>O</code> — also determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" data-v-393e53ee${_scopeId2}>JWT Auth — Client-side</a> for how the subject binds the transport and application layers. `);
            } else {
              return [
                createTextVNode(" The C3 certificate subject — specifically its "),
                createVNode("code", null, "OU"),
                createTextVNode(" and "),
                createVNode("code", null, "O"),
                createTextVNode(" — also determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
                createTextVNode(" for how the subject binds the transport and application layers. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-393e53ee${_scopeId}>3b. Trust the API Hub&#39;s server chain</h3>`);
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Open question"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-393e53ee${_scopeId2}> This section depends on whether the API Hub&#39;s Consent Manager and Headless Heimdall endpoints present a Trust Framework-issued server certificate or a commercial (public Web PKI) certificate. Confirm with Ozone before finalising. </p>`);
            } else {
              return [
                createVNode("p", null, " This section depends on whether the API Hub's Consent Manager and Headless Heimdall endpoints present a Trust Framework-issued server certificate or a commercial (public Web PKI) certificate. Confirm with Ozone before finalising. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If the API Hub presents a <strong data-v-393e53ee${_scopeId2}>Trust Framework-issued</strong> server certificate, the LFI&#39;s outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust anchor. This is the same bundle assembled for <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-ca-bundle" data-v-393e53ee${_scopeId2}>Configuring Inbound mTLS — Section 3a</a>. `);
            } else {
              return [
                createTextVNode(" If the API Hub presents a "),
                createVNode("strong", null, "Trust Framework-issued"),
                createTextVNode(" server certificate, the LFI's outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust anchor. This is the same bundle assembled for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-ca-bundle" }, "Configuring Inbound mTLS — Section 3a"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If the API Hub presents a <strong data-v-393e53ee${_scopeId2}>commercial</strong> server certificate, most HTTP clients will validate it against the operating-system trust store without any LFI-side configuration. In that case no additional trust setup is required beyond ensuring the OS trust store is up to date. `);
            } else {
              return [
                createTextVNode(" If the API Hub presents a "),
                createVNode("strong", null, "commercial"),
                createTextVNode(" server certificate, most HTTP clients will validate it against the operating-system trust store without any LFI-side configuration. In that case no additional trust setup is required beyond ensuring the OS trust store is up to date. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Outbound mTLS configuration has two parts:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Present the C3 client certificate"),
                createTextVNode(" so the API Hub accepts the TLS handshake and can identify your organisation.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Trust the API Hub's server chain"),
                createTextVNode(" so the handshake completes and your client does not fall back to an untrusted state.")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "3a. Present the C3 client certificate"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The C3 transport client certificate is created inside the "),
              createVNode("code", null, "C3-hh-cm-client"),
              createTextVNode(" Application in your Trust Framework Organisation. The same Application also holds the "),
              createVNode("strong", null, "Sig4"),
              createTextVNode(" signing certificate used for "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
              createTextVNode(" when JWT Auth is enabled on the LFI → Hub direction. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("In your Trust Framework Organisation, open the "),
                createVNode("strong", null, [
                  createVNode("code", null, "C3-hh-cm-client")
                ]),
                createTextVNode(" Application.")
              ]),
              createVNode("li", null, [
                createTextVNode("Create (or reuse) the "),
                createVNode("strong", null, "C3"),
                createTextVNode(" transport client certificate, following the code snippets provided in the Trust Framework.")
              ]),
              createVNode("li", null, "Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12)."),
              createVNode("li", null, "Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints.")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Per-environment certificates"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework. Do not share key material between environments. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The C3 certificate subject — specifically its "),
              createVNode("code", null, "OU"),
              createTextVNode(" and "),
              createVNode("code", null, "O"),
              createTextVNode(" — also determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled. See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
              createTextVNode(" for how the subject binds the transport and application layers. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "3b. Trust the API Hub's server chain"),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Open question"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " This section depends on whether the API Hub's Consent Manager and Headless Heimdall endpoints present a Trust Framework-issued server certificate or a commercial (public Web PKI) certificate. Confirm with Ozone before finalising. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If the API Hub presents a "),
              createVNode("strong", null, "Trust Framework-issued"),
              createTextVNode(" server certificate, the LFI's outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust anchor. This is the same bundle assembled for "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-ca-bundle" }, "Configuring Inbound mTLS — Section 3a"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If the API Hub presents a "),
              createVNode("strong", null, "commercial"),
              createTextVNode(" server certificate, most HTTP clients will validate it against the operating-system trust store without any LFI-side configuration. In that case no additional trust setup is required beyond ensuring the OS trust store is up to date. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "verification",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Verification",
    title: "Ozone verifies outbound mTLS during onboarding",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is only considered set up for an environment once your authorisation server can successfully: `);
            } else {
              return [
                createTextVNode(" Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is only considered set up for an environment once your authorisation server can successfully: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-393e53ee${_scopeId2}>Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and</li><li data-v-393e53ee${_scopeId2}>Establish a mutual TLS session with the Headless Heimdall Auth Server presenting the same C3 certificate.</li>`);
            } else {
              return [
                createVNode("li", null, "Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and"),
                createVNode("li", null, "Establish a mutual TLS session with the Headless Heimdall Auth Server presenting the same C3 certificate.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. `);
            } else {
              return [
                createTextVNode(" If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is only considered set up for an environment once your authorisation server can successfully: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and"),
              createVNode("li", null, "Establish a mutual TLS session with the Headless Heimdall Auth Server presenting the same C3 certificate.")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-client.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mtlsClient = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-393e53ee"]]);
export {
  mtlsClient as default
};
