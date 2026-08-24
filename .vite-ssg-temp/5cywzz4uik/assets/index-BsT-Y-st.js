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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-f593f3b0><section class="ed-doc__hero" data-v-f593f3b0><div class="ed-doc__inner" data-v-f593f3b0><div class="ed-doc__eyebrow" data-v-f593f3b0><span class="ed-doc__eyebrow-dash" data-v-f593f3b0></span> LFI · API Hub · Onboarding </div><h1 class="ed-doc__title" data-v-f593f3b0> API Hub Onboarding <span class="ed-doc__read" data-v-f593f3b0>2 min read</span></h1><p class="ed-doc__lede" data-v-f593f3b0> This section covers the end-to-end process for onboarding your institution to the <strong data-v-f593f3b0>API Hub</strong>. Onboarding is managed through the <strong data-v-f593f3b0>Nebras Service Desk</strong> and involves providing configuration details, exchanging certificates, and provisioning your API Hub instance. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "prerequisites",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Prerequisites",
    title: "Trust Framework registration and a Primary Technical Contact",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Before you can begin API Hub onboarding, the following MUST be in place: `);
            } else {
              return [
                createTextVNode(" Before you can begin API Hub onboarding, the following MUST be in place: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Trust Framework registration</strong> — Your organisation MUST be onboarded to the appropriate Trust Framework environment: <ul data-v-f593f3b0${_scopeId2}><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Pre-production</strong> API Hub → <a href="https://web.sandbox.directory.openfinance.ae/" data-v-f593f3b0${_scopeId2}>Sandbox Trust Framework</a></li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Production</strong> API Hub → <a href="https://web.directory.openfinance.ae/" data-v-f593f3b0${_scopeId2}>Production Trust Framework</a></li></ul> See <a href="/tech/lfi-api-hub/trust-framework/onboarding" data-v-f593f3b0${_scopeId2}>Trust Framework Onboarding</a> for details. </li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Primary Technical Contact (PTC)</strong> — A Primary Technical Contact MUST have been registered for your organisation so that applications, servers, and certificates can be created in the Trust Framework. The PTC is responsible for managing the technical connectivity between your institution and the API Hub. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Trust Framework registration"),
                  createTextVNode(" — Your organisation MUST be onboarded to the appropriate Trust Framework environment: "),
                  createVNode("ul", null, [
                    createVNode("li", null, [
                      createVNode("strong", null, "Pre-production"),
                      createTextVNode(" API Hub → "),
                      createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "Sandbox Trust Framework")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Production"),
                      createTextVNode(" API Hub → "),
                      createVNode("a", { href: "https://web.directory.openfinance.ae/" }, "Production Trust Framework")
                    ])
                  ]),
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework Onboarding"),
                  createTextVNode(" for details. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Primary Technical Contact (PTC)"),
                  createTextVNode(" — A Primary Technical Contact MUST have been registered for your organisation so that applications, servers, and certificates can be created in the Trust Framework. The PTC is responsible for managing the technical connectivity between your institution and the API Hub. ")
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
              createTextVNode(" Before you can begin API Hub onboarding, the following MUST be in place: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Trust Framework registration"),
                createTextVNode(" — Your organisation MUST be onboarded to the appropriate Trust Framework environment: "),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createVNode("strong", null, "Pre-production"),
                    createTextVNode(" API Hub → "),
                    createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "Sandbox Trust Framework")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Production"),
                    createTextVNode(" API Hub → "),
                    createVNode("a", { href: "https://web.directory.openfinance.ae/" }, "Production Trust Framework")
                  ])
                ]),
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework Onboarding"),
                createTextVNode(" for details. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Primary Technical Contact (PTC)"),
                createTextVNode(" — A Primary Technical Contact MUST have been registered for your organisation so that applications, servers, and certificates can be created in the Trust Framework. The PTC is responsible for managing the technical connectivity between your institution and the API Hub. ")
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
    id: "requesting-onboarding",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Requesting onboarding",
    title: "Email Nebras Support to raise the tickets",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` To begin onboarding, send the following email to <a href="mailto:support@nebrasopenfinance.ae" data-v-f593f3b0${_scopeId2}>support@nebrasopenfinance.ae</a>: `);
            } else {
              return [
                createTextVNode(" To begin onboarding, send the following email to "),
                createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
                createTextVNode(": ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Email template"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>To:</strong><a href="mailto:support@nebrasopenfinance.ae" data-v-f593f3b0${_scopeId2}>support@nebrasopenfinance.ae</a></p><p data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Subject:</strong> API Hub Onboarding Request — [Your Organisation Name] — [Environment]</p><hr data-v-f593f3b0${_scopeId2}><p data-v-f593f3b0${_scopeId2}>Dear Nebras Support,</p><p data-v-f593f3b0${_scopeId2}>I wish to begin API Hub onboarding for the following:</p><ul data-v-f593f3b0${_scopeId2}><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Organisation:</strong> [Your Organisation Name]</li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Environment:</strong> [Pre-production / Production]</li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Primary Technical Contact (PTC):</strong> [Name and email of the PTC who will manage the technical connectivity]</li></ul><p data-v-f593f3b0${_scopeId2}>Please raise the onboarding tickets and provide the next steps.</p>`);
            } else {
              return [
                createVNode("p", null, [
                  createVNode("strong", null, "To:"),
                  createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae")
                ]),
                createVNode("p", null, [
                  createVNode("strong", null, "Subject:"),
                  createTextVNode(" API Hub Onboarding Request — [Your Organisation Name] — [Environment]")
                ]),
                createVNode("hr"),
                createVNode("p", null, "Dear Nebras Support,"),
                createVNode("p", null, "I wish to begin API Hub onboarding for the following:"),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createVNode("strong", null, "Organisation:"),
                    createTextVNode(" [Your Organisation Name]")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Environment:"),
                    createTextVNode(" [Pre-production / Production]")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Primary Technical Contact (PTC):"),
                    createTextVNode(" [Name and email of the PTC who will manage the technical connectivity]")
                  ])
                ]),
                createVNode("p", null, "Please raise the onboarding tickets and provide the next steps.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once received, the Nebras support team will raise <strong data-v-f593f3b0${_scopeId2}>JIRA tickets</strong> to track each stage of the onboarding process. `);
            } else {
              return [
                createTextVNode(" Once received, the Nebras support team will raise "),
                createVNode("strong", null, "JIRA tickets"),
                createTextVNode(" to track each stage of the onboarding process. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" To begin onboarding, send the following email to "),
              createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
              createTextVNode(": ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Email template"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createVNode("strong", null, "To:"),
                createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae")
              ]),
              createVNode("p", null, [
                createVNode("strong", null, "Subject:"),
                createTextVNode(" API Hub Onboarding Request — [Your Organisation Name] — [Environment]")
              ]),
              createVNode("hr"),
              createVNode("p", null, "Dear Nebras Support,"),
              createVNode("p", null, "I wish to begin API Hub onboarding for the following:"),
              createVNode("ul", null, [
                createVNode("li", null, [
                  createVNode("strong", null, "Organisation:"),
                  createTextVNode(" [Your Organisation Name]")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Environment:"),
                  createTextVNode(" [Pre-production / Production]")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Primary Technical Contact (PTC):"),
                  createTextVNode(" [Name and email of the PTC who will manage the technical connectivity]")
                ])
              ]),
              createVNode("p", null, "Please raise the onboarding tickets and provide the next steps.")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once received, the Nebras support team will raise "),
              createVNode("strong", null, "JIRA tickets"),
              createTextVNode(" to track each stage of the onboarding process. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "onboarding-steps",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Onboarding steps",
    title: "Three stages tracked via Service Desk tickets",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service Desk ticket. `);
            } else {
              return [
                createTextVNode(" API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service Desk ticket. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-f593f3b0${_scopeId}>1. Prerequisites Questionnaire</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You will be asked to provide organisational details, infrastructure information, and your preferred configuration options. This information is used to provision your API Hub instance. `);
            } else {
              return [
                createTextVNode(" You will be asked to provide organisational details, infrastructure information, and your preferred configuration options. This information is used to provision your API Hub instance. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites" data-v-f593f3b0${_scopeId2}>Prerequisites</a> for the full list of fields. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites" }, "Prerequisites"),
                createTextVNode(" for the full list of fields. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-f593f3b0${_scopeId}>2. Application Layer Authentication</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You MUST select an application layer authentication method to secure communication between the API Hub and your Ozone Connect endpoints. The available methods are: `);
            } else {
              return [
                createTextVNode(" You MUST select an application layer authentication method to secure communication between the API Hub and your Ozone Connect endpoints. The available methods are: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-f593f3b0${_scopeId2}>mTLS Only</li><li data-v-f593f3b0${_scopeId2}>API Key</li><li data-v-f593f3b0${_scopeId2}>Client Credentials Grant</li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>JWT Auth</strong> (recommended)</li>`);
            } else {
              return [
                createVNode("li", null, "mTLS Only"),
                createVNode("li", null, "API Key"),
                createVNode("li", null, "Client Credentials Grant"),
                createVNode("li", null, [
                  createVNode("strong", null, "JWT Auth"),
                  createTextVNode(" (recommended)")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth" data-v-f593f3b0${_scopeId2}>Application Layer Authentication</a> for a comparison of methods, and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server" data-v-f593f3b0${_scopeId2}>Configuring Authentication</a> for implementation guidance on the mTLS and JWT Auth layers. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(" for a comparison of methods, and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server" }, "Configuring Authentication"),
                createTextVNode(" for implementation guidance on the mTLS and JWT Auth layers. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-f593f3b0${_scopeId}>3. Environment-Specific Configuration</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be completed <strong data-v-f593f3b0${_scopeId2}>separately for each environment</strong> (pre-production and production). `);
            } else {
              return [
                createTextVNode(" You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be completed "),
                createVNode("strong", null, "separately for each environment"),
                createTextVNode(" (pre-production and production). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-f593f3b0${_scopeId2}>Environment-Specific Configuration</a> for the full list of fields and certificate details. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "Environment-Specific Configuration"),
                createTextVNode(" for the full list of fields and certificate details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service Desk ticket. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "1. Prerequisites Questionnaire"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" You will be asked to provide organisational details, infrastructure information, and your preferred configuration options. This information is used to provision your API Hub instance. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites" }, "Prerequisites"),
              createTextVNode(" for the full list of fields. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "2. Application Layer Authentication"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" You MUST select an application layer authentication method to secure communication between the API Hub and your Ozone Connect endpoints. The available methods are: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "mTLS Only"),
              createVNode("li", null, "API Key"),
              createVNode("li", null, "Client Credentials Grant"),
              createVNode("li", null, [
                createVNode("strong", null, "JWT Auth"),
                createTextVNode(" (recommended)")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
              createTextVNode(" for a comparison of methods, and "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server" }, "Configuring Authentication"),
              createTextVNode(" for implementation guidance on the mTLS and JWT Auth layers. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "3. Environment-Specific Configuration"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be completed "),
              createVNode("strong", null, "separately for each environment"),
              createTextVNode(" (pre-production and production). ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "Environment-Specific Configuration"),
              createTextVNode(" for the full list of fields and certificate details. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "after-onboarding",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "After onboarding",
    title: "Publish your server and implement your endpoints",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once your API Hub is provisioned and configured, you will need to: `);
            } else {
              return [
                createTextVNode(" Once your API Hub is provisioned and configured, you will need to: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Publish your API Hub as a server</strong> in the Trust Framework so that TPPs can discover your institution. See <a href="/tech/lfi-api-hub/trust-framework/servers/creating" data-v-f593f3b0${_scopeId2}>Creating a Server</a>. </li><li data-v-f593f3b0${_scopeId2}><strong data-v-f593f3b0${_scopeId2}>Implement your Ozone Connect endpoints</strong></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Publish your API Hub as a server"),
                  createTextVNode(" in the Trust Framework so that TPPs can discover your institution. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/creating" }, "Creating a Server"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Implement your Ozone Connect endpoints")
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
              createTextVNode(" Once your API Hub is provisioned and configured, you will need to: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Publish your API Hub as a server"),
                createTextVNode(" in the Trust Framework so that TPPs can discover your institution. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/creating" }, "Creating a Server"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Implement your Ozone Connect endpoints")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f593f3b0"]]);
export {
  index as default
};
