import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as _sfc_main$1 } from "./APIFlowsCAAPConsent-cD1e31zR.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  const _component_APIFlowViewer = __unplugin_components_8;
  const _component_APIFlowsCAAPConsent = _sfc_main$1;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-268291da><section class="ed-doc__hero" data-v-268291da><div class="ed-doc__inner" data-v-268291da><div class="ed-doc__eyebrow" data-v-268291da><span class="ed-doc__eyebrow-dash" data-v-268291da></span> LFI · CAAP · API Guide </div><h1 class="ed-doc__title" data-v-268291da> CAAP Operations API Guide <span class="ed-doc__read" data-v-268291da>10 min read</span></h1><p class="ed-doc__lede" data-v-268291da> When an LFI adopts CAAP, the end user&#39;s authentication and consent authorisation experience is delivered by CAAP rather than by the LFI. CAAP drives that experience by calling endpoints on the LFI&#39;s Ozone Connect server. This guide walks the end-to-end flow and focuses on what is different about the CAAP path — from the redirect into CAAP, through registration and account or policy selection, to the final redirect back to the TPP. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "endpoints",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Endpoints in scope",
    title: "CAAP Operations endpoints the LFI MUST implement",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` These endpoints are called on the LFI&#39;s Ozone Connect server. They use the same base URL, mTLS, and (where configured) JWT authentication as the LFI&#39;s other Ozone Connect surfaces — see <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" data-v-268291da${_scopeId2}>Ozone Connect Base URL</a>. `);
            } else {
              return [
                createTextVNode(" These endpoints are called on the LFI's Ozone Connect server. They use the same base URL, mTLS, and (where configured) JWT authentication as the LFI's other Ozone Connect surfaces — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-268291da${_scopeId2}><thead data-v-268291da${_scopeId2}><tr data-v-268291da${_scopeId2}><th data-v-268291da${_scopeId2}>Endpoint</th><th data-v-268291da${_scopeId2}>Direction</th><th data-v-268291da${_scopeId2}>Purpose</th></tr></thead><tbody data-v-268291da${_scopeId2}><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/consent/actions/validate</code></a></td><td data-v-268291da${_scopeId2}>API Hub → LFI</td><td data-v-268291da${_scopeId2}>LFI validates the consent at PAR time; gates whether the consent is created and the <code data-v-268291da${_scopeId2}>request_uri</code> is returned to the TPP.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/users/actions/register/initialize</code></a></td><td data-v-268291da${_scopeId2}>CAAP → LFI</td><td data-v-268291da${_scopeId2}>Identify the end user at the LFI from an encrypted Emirates ID; return the end user&#39;s LFI userId.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/users/actions/register/complete</code></a></td><td data-v-268291da${_scopeId2}>CAAP → LFI</td><td data-v-268291da${_scopeId2}>Complete registration after the end user has answered the LFI&#39;s OTP challenge.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/accounts" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--get" data-v-268291da${_scopeId2}>GET</span><code data-v-268291da${_scopeId2}>/accounts</code></a></td><td data-v-268291da${_scopeId2}>CAAP → LFI</td><td data-v-268291da${_scopeId2}>Return every account the end user can share or initiate from, depending on the use case.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--get" data-v-268291da${_scopeId2}>GET</span><code data-v-268291da${_scopeId2}>/{type}-insurance-policies</code></a></td><td data-v-268291da${_scopeId2}>CAAP → LFI</td><td data-v-268291da${_scopeId2}>Return every insurance policy of the given type the end user can share.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Direction"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/actions/validate")
                        ])
                      ]),
                      createVNode("td", null, "API Hub → LFI"),
                      createVNode("td", null, [
                        createTextVNode("LFI validates the consent at PAR time; gates whether the consent is created and the "),
                        createVNode("code", null, "request_uri"),
                        createTextVNode(" is returned to the TPP.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/users/actions/register/initialize")
                        ])
                      ]),
                      createVNode("td", null, "CAAP → LFI"),
                      createVNode("td", null, "Identify the end user at the LFI from an encrypted Emirates ID; return the end user's LFI userId.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/users/actions/register/complete")
                        ])
                      ]),
                      createVNode("td", null, "CAAP → LFI"),
                      createVNode("td", null, "Complete registration after the end user has answered the LFI's OTP challenge.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ])
                      ]),
                      createVNode("td", null, "CAAP → LFI"),
                      createVNode("td", null, "Return every account the end user can share or initiate from, depending on the use case.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/{type}-insurance-policies")
                        ])
                      ]),
                      createVNode("td", null, "CAAP → LFI"),
                      createVNode("td", null, "Return every insurance policy of the given type the end user can share.")
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
          title: "Hub-side endpoints CAAP calls"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-268291da${_scopeId2}> CAAP also calls the API Hub&#39;s <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-268291da${_scopeId2}>Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-268291da${_scopeId2}>Consent Manager</a> at the end of the journey to patch the consent and complete the interaction. The LFI does not implement those — the API Hub does — but they appear in the sequence flow below for completeness. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" CAAP also calls the API Hub's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                  createTextVNode(" at the end of the journey to patch the consent and complete the interaction. The LFI does not implement those — the API Hub does — but they appear in the sequence flow below for completeness. ")
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
              createTextVNode(" These endpoints are called on the LFI's Ozone Connect server. They use the same base URL, mTLS, and (where configured) JWT authentication as the LFI's other Ozone Connect surfaces — see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Direction"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/actions/validate")
                      ])
                    ]),
                    createVNode("td", null, "API Hub → LFI"),
                    createVNode("td", null, [
                      createTextVNode("LFI validates the consent at PAR time; gates whether the consent is created and the "),
                      createVNode("code", null, "request_uri"),
                      createTextVNode(" is returned to the TPP.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/users/actions/register/initialize")
                      ])
                    ]),
                    createVNode("td", null, "CAAP → LFI"),
                    createVNode("td", null, "Identify the end user at the LFI from an encrypted Emirates ID; return the end user's LFI userId.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/users/actions/register/complete")
                      ])
                    ]),
                    createVNode("td", null, "CAAP → LFI"),
                    createVNode("td", null, "Complete registration after the end user has answered the LFI's OTP challenge.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ])
                    ]),
                    createVNode("td", null, "CAAP → LFI"),
                    createVNode("td", null, "Return every account the end user can share or initiate from, depending on the use case.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/{type}-insurance-policies")
                      ])
                    ]),
                    createVNode("td", null, "CAAP → LFI"),
                    createVNode("td", null, "Return every insurance policy of the given type the end user can share.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Hub-side endpoints CAAP calls"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" CAAP also calls the API Hub's "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                createTextVNode(" at the end of the journey to patch the consent and complete the interaction. The LFI does not implement those — the API Hub does — but they appear in the sequence flow below for completeness. ")
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
    id: "sequence",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "API sequence flow",
    title: "End-to-end flow diagram",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "CAAP Consent Flow" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsCAAPConsent, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsCAAPConsent)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_APIFlowViewer, { title: "CAAP Consent Flow" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsCAAPConsent)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "par",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Step 1 — Consent creation",
    title: "POST /par",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The journey begins with the standard <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/par</code></a> flow — including the API Hub&#39;s gating call to <a href="/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/consent/actions/validate</code></a> on the LFI before the consent is created. See <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-268291da${_scopeId2}>Consent Journey — API Guide</a> for the full mechanics; nothing about this step changes for CAAP-adopting LFIs. `);
            } else {
              return [
                createTextVNode(" The journey begins with the standard "),
                createVNode("a", {
                  href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/par")
                ]),
                createTextVNode(" flow — including the API Hub's gating call to "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/actions/validate")
                ]),
                createTextVNode(" on the LFI before the consent is created. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey — API Guide"),
                createTextVNode(" for the full mechanics; nothing about this step changes for CAAP-adopting LFIs. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the TPP has the <code data-v-268291da${_scopeId2}>request_uri</code>, it redirects the end user to the API Hub&#39;s authorize URL. The API Hub recognises that this LFI is configured for CAAP and redirects the end user on to CAAP rather than to an LFI-operated authorization endpoint — this is the first point at which CAAP differs from the LFI-operated flow. `);
            } else {
              return [
                createTextVNode(" Once the TPP has the "),
                createVNode("code", null, "request_uri"),
                createTextVNode(", it redirects the end user to the API Hub's authorize URL. The API Hub recognises that this LFI is configured for CAAP and redirects the end user on to CAAP rather than to an LFI-operated authorization endpoint — this is the first point at which CAAP differs from the LFI-operated flow. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The journey begins with the standard "),
              createVNode("a", {
                href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/par")
              ]),
              createTextVNode(" flow — including the API Hub's gating call to "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/actions/validate")
              ]),
              createTextVNode(" on the LFI before the consent is created. See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey — API Guide"),
              createTextVNode(" for the full mechanics; nothing about this step changes for CAAP-adopting LFIs. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once the TPP has the "),
              createVNode("code", null, "request_uri"),
              createTextVNode(", it redirects the end user to the API Hub's authorize URL. The API Hub recognises that this LFI is configured for CAAP and redirects the end user on to CAAP rather than to an LFI-operated authorization endpoint — this is the first point at which CAAP differs from the LFI-operated flow. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "psu-auth",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Step 2 — Authentication",
    title: "End user authenticates at CAAP via EFR or UAE Pass",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CAAP authenticates the end user using <strong data-v-268291da${_scopeId2}>EFR</strong> or <strong data-v-268291da${_scopeId2}>UAE Pass</strong>. This step does not involve the LFI — CAAP integrates with the national identity rails directly. The end user&#39;s Emirates ID is established as a result. `);
            } else {
              return [
                createTextVNode(" CAAP authenticates the end user using "),
                createVNode("strong", null, "EFR"),
                createTextVNode(" or "),
                createVNode("strong", null, "UAE Pass"),
                createTextVNode(". This step does not involve the LFI — CAAP integrates with the national identity rails directly. The end user's Emirates ID is established as a result. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" CAAP authenticates the end user using "),
              createVNode("strong", null, "EFR"),
              createTextVNode(" or "),
              createVNode("strong", null, "UAE Pass"),
              createTextVNode(". This step does not involve the LFI — CAAP integrates with the national identity rails directly. The end user's Emirates ID is established as a result. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "register-initialize",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Step 3 — Register the end user",
    title: "POST /users/actions/register/initialize",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once CAAP has the end user&#39;s Emirates ID, it calls <a href="/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/users/actions/register/initialize</code></a> on the LFI&#39;s Ozone Connect server. The request body carries the Emirates ID <strong data-v-268291da${_scopeId2}>encrypted</strong> — never in cleartext. `);
            } else {
              return [
                createTextVNode(" Once CAAP has the end user's Emirates ID, it calls "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/users/actions/register/initialize")
                ]),
                createTextVNode(" on the LFI's Ozone Connect server. The request body carries the Emirates ID "),
                createVNode("strong", null, "encrypted"),
                createTextVNode(" — never in cleartext. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-268291da${_scopeId}>Encryption with the LFI&#39;s ENC1 key</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CAAP encrypts the Emirates ID using the LFI&#39;s <strong data-v-268291da${_scopeId2}>ENC1</strong> public key — the same server-side encryption key referenced in <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-268291da${_scopeId2}>Keys &amp; Certificates</a>. The LFI MUST decrypt the payload using the corresponding ENC1 private key. `);
            } else {
              return [
                createTextVNode(" CAAP encrypts the Emirates ID using the LFI's "),
                createVNode("strong", null, "ENC1"),
                createTextVNode(" public key — the same server-side encryption key referenced in "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                createTextVNode(". The LFI MUST decrypt the payload using the corresponding ENC1 private key. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-268291da${_scopeId}>The LFI MUST return providerUserIdentifier.userId on the initial response</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Regardless of whether the LFI subsequently issues a challenge, the response to <code data-v-268291da${_scopeId2}>register/initialize</code> MUST contain the LFI&#39;s identifier for the end user on <code data-v-268291da${_scopeId2}>data.providerUserIdentifier.userId</code>. CAAP uses this identifier from that point on, including the <code data-v-268291da${_scopeId2}>psuIdentifiers.userId</code> it patches onto the consent at the end of the journey — it MUST be identical across all of those uses, and MUST satisfy the opacity rules described in <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide#identifier-requirements" data-v-268291da${_scopeId2}>Consent Journey — Identifier requirements</a>. `);
            } else {
              return [
                createTextVNode(" Regardless of whether the LFI subsequently issues a challenge, the response to "),
                createVNode("code", null, "register/initialize"),
                createTextVNode(" MUST contain the LFI's identifier for the end user on "),
                createVNode("code", null, "data.providerUserIdentifier.userId"),
                createTextVNode(". CAAP uses this identifier from that point on, including the "),
                createVNode("code", null, "psuIdentifiers.userId"),
                createTextVNode(" it patches onto the consent at the end of the journey — it MUST be identical across all of those uses, and MUST satisfy the opacity rules described in "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide#identifier-requirements" }, "Consent Journey — Identifier requirements"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "danger",
          title: "userId MUST be opaque and non-sensitive"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-268291da${_scopeId2}> The <code data-v-268291da${_scopeId2}>userId</code> the LFI returns is stored centrally by the API Hub. It MUST be opaque, non-sensitive, and LFI-defined — <strong data-v-268291da${_scopeId2}>never</strong> an Emirates ID, passport number, email, phone number, CIF, account number, or any other PII. Use an internal customer reference, a UUID, or another opaque token. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The "),
                  createVNode("code", null, "userId"),
                  createTextVNode(" the LFI returns is stored centrally by the API Hub. It MUST be opaque, non-sensitive, and LFI-defined — "),
                  createVNode("strong", null, "never"),
                  createTextVNode(" an Emirates ID, passport number, email, phone number, CIF, account number, or any other PII. Use an internal customer reference, a UUID, or another opaque token. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-268291da${_scopeId}>Optional challenge</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI may choose to issue its own challenge before registration is final — typically an OTP sent over the LFI&#39;s usual SCA channel. To do so, the LFI responds with <code data-v-268291da${_scopeId2}>registrationStatus</code> set to <code data-v-268291da${_scopeId2}>AwaitingChallengeResponse</code> and a <code data-v-268291da${_scopeId2}>challengeId</code> alongside the <code data-v-268291da${_scopeId2}>providerUserIdentifier.userId</code>. CAAP collects the OTP from the end user and calls <a href="/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/users/actions/register/complete</code></a>. `);
            } else {
              return [
                createTextVNode(" The LFI may choose to issue its own challenge before registration is final — typically an OTP sent over the LFI's usual SCA channel. To do so, the LFI responds with "),
                createVNode("code", null, "registrationStatus"),
                createTextVNode(" set to "),
                createVNode("code", null, "AwaitingChallengeResponse"),
                createTextVNode(" and a "),
                createVNode("code", null, "challengeId"),
                createTextVNode(" alongside the "),
                createVNode("code", null, "providerUserIdentifier.userId"),
                createTextVNode(". CAAP collects the OTP from the end user and calls "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/users/actions/register/complete")
                ]),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If the LFI does not need to challenge the end user, it responds to the initial <code data-v-268291da${_scopeId2}>register/initialize</code> call directly with <code data-v-268291da${_scopeId2}>registrationStatus: Complete</code> alongside <code data-v-268291da${_scopeId2}>providerUserIdentifier.userId</code> — CAAP skips the complete step entirely. `);
            } else {
              return [
                createTextVNode(" If the LFI does not need to challenge the end user, it responds to the initial "),
                createVNode("code", null, "register/initialize"),
                createTextVNode(" call directly with "),
                createVNode("code", null, "registrationStatus: Complete"),
                createTextVNode(" alongside "),
                createVNode("code", null, "providerUserIdentifier.userId"),
                createTextVNode(" — CAAP skips the complete step entirely. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once CAAP has the end user's Emirates ID, it calls "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/users/actions/register/initialize")
              ]),
              createTextVNode(" on the LFI's Ozone Connect server. The request body carries the Emirates ID "),
              createVNode("strong", null, "encrypted"),
              createTextVNode(" — never in cleartext. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Encryption with the LFI's ENC1 key"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" CAAP encrypts the Emirates ID using the LFI's "),
              createVNode("strong", null, "ENC1"),
              createTextVNode(" public key — the same server-side encryption key referenced in "),
              createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
              createTextVNode(". The LFI MUST decrypt the payload using the corresponding ENC1 private key. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "The LFI MUST return providerUserIdentifier.userId on the initial response"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Regardless of whether the LFI subsequently issues a challenge, the response to "),
              createVNode("code", null, "register/initialize"),
              createTextVNode(" MUST contain the LFI's identifier for the end user on "),
              createVNode("code", null, "data.providerUserIdentifier.userId"),
              createTextVNode(". CAAP uses this identifier from that point on, including the "),
              createVNode("code", null, "psuIdentifiers.userId"),
              createTextVNode(" it patches onto the consent at the end of the journey — it MUST be identical across all of those uses, and MUST satisfy the opacity rules described in "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide#identifier-requirements" }, "Consent Journey — Identifier requirements"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "danger",
            title: "userId MUST be opaque and non-sensitive"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The "),
                createVNode("code", null, "userId"),
                createTextVNode(" the LFI returns is stored centrally by the API Hub. It MUST be opaque, non-sensitive, and LFI-defined — "),
                createVNode("strong", null, "never"),
                createTextVNode(" an Emirates ID, passport number, email, phone number, CIF, account number, or any other PII. Use an internal customer reference, a UUID, or another opaque token. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Optional challenge"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The LFI may choose to issue its own challenge before registration is final — typically an OTP sent over the LFI's usual SCA channel. To do so, the LFI responds with "),
              createVNode("code", null, "registrationStatus"),
              createTextVNode(" set to "),
              createVNode("code", null, "AwaitingChallengeResponse"),
              createTextVNode(" and a "),
              createVNode("code", null, "challengeId"),
              createTextVNode(" alongside the "),
              createVNode("code", null, "providerUserIdentifier.userId"),
              createTextVNode(". CAAP collects the OTP from the end user and calls "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/users/actions/register/complete")
              ]),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If the LFI does not need to challenge the end user, it responds to the initial "),
              createVNode("code", null, "register/initialize"),
              createTextVNode(" call directly with "),
              createVNode("code", null, "registrationStatus: Complete"),
              createTextVNode(" alongside "),
              createVNode("code", null, "providerUserIdentifier.userId"),
              createTextVNode(" — CAAP skips the complete step entirely. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "register-complete",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Step 4 — Complete registration",
    title: "POST /users/actions/register/complete (challenged journeys only)",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Where the LFI issued a challenge, CAAP submits the end user&#39;s response via <a href="/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/users/actions/register/complete</code></a>. The LFI verifies the response and returns <code data-v-268291da${_scopeId2}>registrationStatus: Complete</code>. Registration is now finalised and CAAP proceeds to build the authorization page. `);
            } else {
              return [
                createTextVNode(" Where the LFI issued a challenge, CAAP submits the end user's response via "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/users/actions/register/complete")
                ]),
                createTextVNode(". The LFI verifies the response and returns "),
                createVNode("code", null, "registrationStatus: Complete"),
                createTextVNode(". Registration is now finalised and CAAP proceeds to build the authorization page. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Failed challenge responses are not HTTP errors"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-268291da${_scopeId2}> Per the CAAP Operations spec, an incorrect challenge response MUST be returned as an HTTP 200 with a result indicator in the payload — not as a 4xx. Reserve non-2xx status codes for genuine error conditions (malformed requests, internal failures). </p>`);
            } else {
              return [
                createVNode("p", null, " Per the CAAP Operations spec, an incorrect challenge response MUST be returned as an HTTP 200 with a result indicator in the payload — not as a 4xx. Reserve non-2xx status codes for genuine error conditions (malformed requests, internal failures). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Where the LFI issued a challenge, CAAP submits the end user's response via "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/users/actions/register/complete")
              ]),
              createTextVNode(". The LFI verifies the response and returns "),
              createVNode("code", null, "registrationStatus: Complete"),
              createTextVNode(". Registration is now finalised and CAAP proceeds to build the authorization page. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Failed challenge responses are not HTTP errors"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " Per the CAAP Operations spec, an incorrect challenge response MUST be returned as an HTTP 200 with a result indicator in the payload — not as a 4xx. Reserve non-2xx status codes for genuine error conditions (malformed requests, internal failures). ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "build-auth-page",
    num: "07",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Step 5 — Build the authorization page",
    title: "Fetch the accounts or policies the end user can select from",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` With the end user registered, CAAP retrieves the data needed to render the authorization page. The endpoint called depends on the consent type, and CAAP signals the use case via the <code data-v-268291da${_scopeId2}>o3-caap-consent-use-case</code> header on the accounts endpoint. `);
            } else {
              return [
                createTextVNode(" With the end user registered, CAAP retrieves the data needed to render the authorization page. The endpoint called depends on the consent type, and CAAP signals the use case via the "),
                createVNode("code", null, "o3-caap-consent-use-case"),
                createTextVNode(" header on the accounts endpoint. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` In all three cases, the LFI MUST return <strong data-v-268291da${_scopeId2}>every</strong> item the end user can choose from — do not pre-filter to a subset. CAAP renders the full list and the end user picks from it on the authorization page. `);
            } else {
              return [
                createTextVNode(" In all three cases, the LFI MUST return "),
                createVNode("strong", null, "every"),
                createTextVNode(" item the end user can choose from — do not pre-filter to a subset. CAAP renders the full list and the end user picks from it on the authorization page. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-268291da${_scopeId2}><thead data-v-268291da${_scopeId2}><tr data-v-268291da${_scopeId2}><th data-v-268291da${_scopeId2}>Consent type</th><th data-v-268291da${_scopeId2}>CAAP calls</th><th data-v-268291da${_scopeId2}>LFI returns</th></tr></thead><tbody data-v-268291da${_scopeId2}><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}>Bank Data Sharing</td><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/accounts" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--get" data-v-268291da${_scopeId2}>GET</span><code data-v-268291da${_scopeId2}>/accounts</code></a> with <code data-v-268291da${_scopeId2}>o3-caap-consent-use-case: accounts</code></td><td data-v-268291da${_scopeId2}>Every account the end user is permitted to share for data sharing.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}>Bank Service Initiation</td><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/accounts" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--get" data-v-268291da${_scopeId2}>GET</span><code data-v-268291da${_scopeId2}>/accounts</code></a> with <code data-v-268291da${_scopeId2}>o3-caap-consent-use-case: payments</code></td><td data-v-268291da${_scopeId2}>Every account the end user is permitted to initiate the requested payment from.</td></tr><tr data-v-268291da${_scopeId2}><td data-v-268291da${_scopeId2}>Insurance Data Sharing</td><td data-v-268291da${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--get" data-v-268291da${_scopeId2}>GET</span><code data-v-268291da${_scopeId2}>/{type}-insurance-policies</code></a>, once per insurance type in the consent permissions </td><td data-v-268291da${_scopeId2}>Every policy of that type the end user is permitted to share.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Consent type"),
                      createVNode("th", null, "CAAP calls"),
                      createVNode("th", null, "LFI returns")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Bank Data Sharing"),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ]),
                        createTextVNode(" with "),
                        createVNode("code", null, "o3-caap-consent-use-case: accounts")
                      ]),
                      createVNode("td", null, "Every account the end user is permitted to share for data sharing.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Bank Service Initiation"),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ]),
                        createTextVNode(" with "),
                        createVNode("code", null, "o3-caap-consent-use-case: payments")
                      ]),
                      createVNode("td", null, "Every account the end user is permitted to initiate the requested payment from.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Insurance Data Sharing"),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/{type}-insurance-policies")
                        ]),
                        createTextVNode(", once per insurance type in the consent permissions ")
                      ]),
                      createVNode("td", null, "Every policy of that type the end user is permitted to share.")
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
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" With the end user registered, CAAP retrieves the data needed to render the authorization page. The endpoint called depends on the consent type, and CAAP signals the use case via the "),
              createVNode("code", null, "o3-caap-consent-use-case"),
              createTextVNode(" header on the accounts endpoint. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" In all three cases, the LFI MUST return "),
              createVNode("strong", null, "every"),
              createTextVNode(" item the end user can choose from — do not pre-filter to a subset. CAAP renders the full list and the end user picks from it on the authorization page. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Consent type"),
                    createVNode("th", null, "CAAP calls"),
                    createVNode("th", null, "LFI returns")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Bank Data Sharing"),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ]),
                      createTextVNode(" with "),
                      createVNode("code", null, "o3-caap-consent-use-case: accounts")
                    ]),
                    createVNode("td", null, "Every account the end user is permitted to share for data sharing.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Bank Service Initiation"),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ]),
                      createTextVNode(" with "),
                      createVNode("code", null, "o3-caap-consent-use-case: payments")
                    ]),
                    createVNode("td", null, "Every account the end user is permitted to initiate the requested payment from.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Insurance Data Sharing"),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/{type}-insurance-policies")
                      ]),
                      createTextVNode(", once per insurance type in the consent permissions ")
                    ]),
                    createVNode("td", null, "Every policy of that type the end user is permitted to share.")
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "authorize",
    num: "08",
    color: "var(--at-teal-deep)",
    eyebrow: "Step 6 — Authorize and redirect",
    title: "CAAP completes the journey on the API Hub",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CAAP renders the authorization page per the <a href="/tech/lfi-api-hub/v2.1/caap/user-experience#end-to-end" data-v-268291da${_scopeId2}>User Experience</a> (which shows the end-to-end end user journey screen by screen), displaying the consent details and the accounts or policies the end user can select. After the end user clicks <strong data-v-268291da${_scopeId2}>Authorize</strong>, CAAP completes the journey in the same way an LFI-operated authorization server would — against the API Hub, not against the LFI: `);
            } else {
              return [
                createTextVNode(" CAAP renders the authorization page per the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/caap/user-experience#end-to-end" }, "User Experience"),
                createTextVNode(" (which shows the end-to-end end user journey screen by screen), displaying the consent details and the accounts or policies the end user can select. After the end user clicks "),
                createVNode("strong", null, "Authorize"),
                createTextVNode(", CAAP completes the journey in the same way an LFI-operated authorization server would — against the API Hub, not against the LFI: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-268291da${_scopeId2}><strong data-v-268291da${_scopeId2}>PATCH the consent.</strong> CAAP calls <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--patch" data-v-268291da${_scopeId2}>PATCH</span><code data-v-268291da${_scopeId2}>/consents/{consentId}</code></a> on the API Hub Consent Manager, setting status to <code data-v-268291da${_scopeId2}>Authorized</code> and including the <code data-v-268291da${_scopeId2}>psuIdentifiers.userId</code> returned by the LFI on <code data-v-268291da${_scopeId2}>register/initialize</code>, plus either <code data-v-268291da${_scopeId2}>accountIds</code> (Bank Data Sharing, Bank Service Initiation) or <code data-v-268291da${_scopeId2}>insurancePolicyIds</code> (Insurance Data Sharing) for the items the end user selected. </li><li data-v-268291da${_scopeId2}><strong data-v-268291da${_scopeId2}>Complete the interaction.</strong> CAAP calls <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/auth/{interactionId}/doConfirm</code></a> on Headless Heimdall, which issues a redirect back to the TPP&#39;s callback URI with the authorization <code data-v-268291da${_scopeId2}>code</code> and <code data-v-268291da${_scopeId2}>state</code>. </li><li data-v-268291da${_scopeId2}><strong data-v-268291da${_scopeId2}>Follow the redirect.</strong> CAAP forwards the redirect to the end user&#39;s browser, returning the end user to the TPP. The TPP exchanges the code for tokens on <a href="/tech/tpp-standards/security/tokens/open-api/token" class="endpoint" data-v-268291da${_scopeId2}><span class="http-method http-method--post" data-v-268291da${_scopeId2}>POST</span><code data-v-268291da${_scopeId2}>/token</code></a> and the consent is now <code data-v-268291da${_scopeId2}>Authorized</code>. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "PATCH the consent."),
                  createTextVNode(" CAAP calls "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                    createVNode("code", null, "/consents/{consentId}")
                  ]),
                  createTextVNode(" on the API Hub Consent Manager, setting status to "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" and including the "),
                  createVNode("code", null, "psuIdentifiers.userId"),
                  createTextVNode(" returned by the LFI on "),
                  createVNode("code", null, "register/initialize"),
                  createTextVNode(", plus either "),
                  createVNode("code", null, "accountIds"),
                  createTextVNode(" (Bank Data Sharing, Bank Service Initiation) or "),
                  createVNode("code", null, "insurancePolicyIds"),
                  createTextVNode(" (Insurance Data Sharing) for the items the end user selected. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Complete the interaction."),
                  createTextVNode(" CAAP calls "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/auth/{interactionId}/doConfirm")
                  ]),
                  createTextVNode(" on Headless Heimdall, which issues a redirect back to the TPP's callback URI with the authorization "),
                  createVNode("code", null, "code"),
                  createTextVNode(" and "),
                  createVNode("code", null, "state"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Follow the redirect."),
                  createTextVNode(" CAAP forwards the redirect to the end user's browser, returning the end user to the TPP. The TPP exchanges the code for tokens on "),
                  createVNode("a", {
                    href: "/tech/tpp-standards/security/tokens/open-api/token",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/token")
                  ]),
                  createTextVNode(" and the consent is now "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "The LFI is no longer on the path"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-268291da${_scopeId2}> From this point onwards the consent is live and runtime data and payment calls flow through the API Hub to the LFI&#39;s Ozone Connect endpoints (<a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" data-v-268291da${_scopeId2}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/" data-v-268291da${_scopeId2}>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.1/insurance/" data-v-268291da${_scopeId2}>Insurance Data Sharing</a>) as normal. CAAP is not involved in those calls. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" From this point onwards the consent is live and runtime data and payment calls flow through the API Hub to the LFI's Ozone Connect endpoints ("),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/" }, "Insurance Data Sharing"),
                  createTextVNode(") as normal. CAAP is not involved in those calls. ")
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
              createTextVNode(" CAAP renders the authorization page per the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/caap/user-experience#end-to-end" }, "User Experience"),
              createTextVNode(" (which shows the end-to-end end user journey screen by screen), displaying the consent details and the accounts or policies the end user can select. After the end user clicks "),
              createVNode("strong", null, "Authorize"),
              createTextVNode(", CAAP completes the journey in the same way an LFI-operated authorization server would — against the API Hub, not against the LFI: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "PATCH the consent."),
                createTextVNode(" CAAP calls "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                  createVNode("code", null, "/consents/{consentId}")
                ]),
                createTextVNode(" on the API Hub Consent Manager, setting status to "),
                createVNode("code", null, "Authorized"),
                createTextVNode(" and including the "),
                createVNode("code", null, "psuIdentifiers.userId"),
                createTextVNode(" returned by the LFI on "),
                createVNode("code", null, "register/initialize"),
                createTextVNode(", plus either "),
                createVNode("code", null, "accountIds"),
                createTextVNode(" (Bank Data Sharing, Bank Service Initiation) or "),
                createVNode("code", null, "insurancePolicyIds"),
                createTextVNode(" (Insurance Data Sharing) for the items the end user selected. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Complete the interaction."),
                createTextVNode(" CAAP calls "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/auth/{interactionId}/doConfirm")
                ]),
                createTextVNode(" on Headless Heimdall, which issues a redirect back to the TPP's callback URI with the authorization "),
                createVNode("code", null, "code"),
                createTextVNode(" and "),
                createVNode("code", null, "state"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Follow the redirect."),
                createTextVNode(" CAAP forwards the redirect to the end user's browser, returning the end user to the TPP. The TPP exchanges the code for tokens on "),
                createVNode("a", {
                  href: "/tech/tpp-standards/security/tokens/open-api/token",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/token")
                ]),
                createTextVNode(" and the consent is now "),
                createVNode("code", null, "Authorized"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "The LFI is no longer on the path"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" From this point onwards the consent is live and runtime data and payment calls flow through the API Hub to the LFI's Ozone Connect endpoints ("),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/" }, "Insurance Data Sharing"),
                createTextVNode(") as normal. CAAP is not involved in those calls. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/caap/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-268291da"]]);
export {
  apiGuide as default
};
