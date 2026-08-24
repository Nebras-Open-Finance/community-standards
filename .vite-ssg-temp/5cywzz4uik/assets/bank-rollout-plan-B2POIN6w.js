import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdNote = __unplugin_components_7;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cbbfa969><section class="ed-doc__hero" data-v-cbbfa969><div class="ed-doc__inner" data-v-cbbfa969><div class="ed-doc__eyebrow" data-v-cbbfa969><span class="ed-doc__eyebrow-dash" data-v-cbbfa969></span> LFI · Getting Started · Rollout Plan </div><h1 class="ed-doc__title" data-v-cbbfa969> Recommended Bank Rollout Plan <span class="ed-doc__read" data-v-cbbfa969>6 min read</span></h1><p class="ed-doc__lede" data-v-cbbfa969> This page proposes a sensible delivery sequence for an LFI working through <a href="/tech/lfi-api-hub/getting-started/" data-v-cbbfa969>Step 3 of the LFI Integration Journey</a>. It is intended as a starting path that breaks the work into manageable increments — once you have completed Phase 1 you will be well-placed to decide the order of subsequent capabilities based on your own priorities and constraints. </p></div></section><section class="ed-doc__intro" data-v-cbbfa969><div class="ed-doc__inner" data-v-cbbfa969>`);
  _push(ssrRenderComponent(_component_EdNote, {
    type: "warning",
    title: "Guidance only"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-cbbfa969${_scopeId}> This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI&#39;s responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing. </p>`);
      } else {
        return [
          createVNode("p", null, " This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI's responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through <a href="/tech/lfi-api-hub/getting-started/#phase-a" data-v-cbbfa969${_scopeId}>Step 3 → Step 9</a> (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows. `);
      } else {
        return [
          createTextVNode(" Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through "),
          createVNode("a", { href: "/tech/lfi-api-hub/getting-started/#phase-a" }, "Step 3 → Step 9"),
          createTextVNode(" (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows. ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-1",
    num: "1",
    color: "var(--at-teal)",
    eyebrow: "Phase 1",
    title: "Foundations and Retail Core",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 1 establishes the foundational integration with the API Hub and delivers the first customer-facing capability (Retail Data Sharing) followed by the simplest payment journey. `);
            } else {
              return [
                createTextVNode(" Phase 1 establishes the foundational integration with the API Hub and delivers the first customer-facing capability (Retail Data Sharing) followed by the simplest payment journey. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The steps are ordered so each builds on the last — ordering within the phase is a recommendation, not a hard dependency graph, except where an API clearly depends on another being present (e.g. Refunds requires a completed payment). `);
            } else {
              return [
                createTextVNode(" The steps are ordered so each builds on the last — ordering within the phase is a recommendation, not a hard dependency graph, except where an API clearly depends on another being present (e.g. Refunds requires a completed payment). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>1. Consent Validate</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consent/action/validate</code></a> endpoint on your Ozone Connect server. `);
            } else {
              return [
                createTextVNode(" Implement the "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" endpoint on your Ozone Connect server. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This endpoint is called by the API Hub <strong data-v-cbbfa969${_scopeId2}>before</strong> a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven&#39;t yet implemented, and then expand the accepted set as each subsequent capability comes online. `);
            } else {
              return [
                createTextVNode(" This endpoint is called by the API Hub "),
                createVNode("strong", null, "before"),
                createTextVNode(" a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven't yet implemented, and then expand the accepted set as each subsequent capability comes online. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide" data-v-cbbfa969${_scopeId2}>Consent Events API Guide</a> for implementation details. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/api-guide" }, "Consent Events API Guide"),
                createTextVNode(" for implementation details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>2. Consent Journey</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through customer authentication, authorization, and return to TPP: `);
            } else {
              return [
                createTextVNode(" Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through customer authentication, authorization, and return to TPP: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Direction</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/auth</code></a></td><td data-v-cbbfa969${_scopeId2}>LFI → API Hub</td><td data-v-cbbfa969${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-cbbfa969${_scopeId2}>LFI → API Hub</td><td data-v-cbbfa969${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--patch" data-v-cbbfa969${_scopeId2}>PATCH</span><code data-v-cbbfa969${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-cbbfa969${_scopeId2}>LFI → API Hub</td><td data-v-cbbfa969${_scopeId2}>Update consent status, customer identifiers, and account IDs</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-cbbfa969${_scopeId2}>LFI → API Hub</td><td data-v-cbbfa969${_scopeId2}>Complete the authorization interaction and redirect back to TPP successfully</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-cbbfa969${_scopeId2}>LFI → API Hub</td><td data-v-cbbfa969${_scopeId2}>Complete the authorization interaction and redirect back to TPP with a failure</td></tr></tbody></table>`);
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
                          href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/auth")
                        ])
                      ]),
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, "Initiate the authorization interaction")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/consents/{consentId}")
                        ])
                      ]),
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, "Retrieve the full consent details")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                          createVNode("code", null, "/consents/{consentId}")
                        ])
                      ]),
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, "Update consent status, customer identifiers, and account IDs")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/auth/{interactionId}/doConfirm")
                        ])
                      ]),
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, "Complete the authorization interaction and redirect back to TPP successfully")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/auth/{interactionId}/doFail")
                        ])
                      ]),
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, "Complete the authorization interaction and redirect back to TPP with a failure")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-cbbfa969${_scopeId2}>Consent Journey API Guide</a> for the end-to-end sequence, including customer authentication requirements (<a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" data-v-cbbfa969${_scopeId2}>SCA</a>) and identifier rules. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                createTextVNode(" for the end-to-end sequence, including customer authentication requirements ("),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" }, "SCA"),
                createTextVNode(") and identifier rules. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>3. Retail Data Sharing — Current &amp; Savings Accounts</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" data-v-cbbfa969${_scopeId2}>Bank Data Sharing</a> for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first productised capability because it exercises the full consent journey end-to-end without the additional complexity of payment execution or encrypted PII. `);
            } else {
              return [
                createTextVNode(" Implement "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                createTextVNode(" for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first productised capability because it exercises the full consent journey end-to-end without the additional complexity of payment execution or encrypted PII. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Prioritise the following endpoints:`);
            } else {
              return [
                createTextVNode("Prioritise the following endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/accounts</code></a></td><td data-v-cbbfa969${_scopeId2}>List the accounts covered by the consent</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve details for a single account</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}/balances</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve balances for an account</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}/transactions</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve the transaction history for an account</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/customer</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve the customer details covered by the consent</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}/customer</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve customer details for a specific account</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ])
                      ]),
                      createVNode("td", null, "List the accounts covered by the consent")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve details for a single account")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/balances")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve balances for an account")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/transactions")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve the transaction history for an account")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/customer")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve the customer details covered by the consent")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/customer")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve customer details for a specific account")
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
              _push3(` See <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" data-v-cbbfa969${_scopeId2}>Data Sharing — Requirements</a> and the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" data-v-cbbfa969${_scopeId2}>Data Sharing API Guide</a>. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Data Sharing — Requirements"),
                createTextVNode(" and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" }, "Data Sharing API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once live, update the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consent/action/validate</code></a> response to accept Bank Data Sharing consents. `);
            } else {
              return [
                createTextVNode(" Once live, update the "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" response to accept Bank Data Sharing consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>4. Retail Domestic — Single Instant Payment</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" data-v-cbbfa969${_scopeId2}>Single Instant Payment</a> journey for retail customers. This introduces payment execution and the handling of encrypted PII on payment consents. `);
            } else {
              return [
                createTextVNode(" Implement the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" }, "Single Instant Payment"),
                createTextVNode(" journey for retail customers. This introduces payment execution and the handling of encrypted PII on payment consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Key endpoints:`);
            } else {
              return [
                createTextVNode("Key endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/payments</code></a></td><td data-v-cbbfa969${_scopeId2}>Execute an authorised payment</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/payments/{PaymentId}</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve the status of a payment</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payments")
                        ])
                      ]),
                      createVNode("td", null, "Execute an authorised payment")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payments/{PaymentId}")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve the status of a payment")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" data-v-cbbfa969${_scopeId2}>Single Instant Payment API Guide</a>, <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status" data-v-cbbfa969${_scopeId2}>Payment Rails and Status</a>, and the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" data-v-cbbfa969${_scopeId2}>Personal Identifiable Information</a> guide for PII decryption. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Single Instant Payment API Guide"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Rails and Status"),
                createTextVNode(", and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                createTextVNode(" guide for PII decryption. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Extend <span class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consent/action/validate</code></span> to accept Single Instant Payment consents. `);
            } else {
              return [
                createTextVNode(" Extend "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" to accept Single Instant Payment consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>5. Refunds</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" data-v-cbbfa969${_scopeId2}>Refunds</a> against completed payment consents. Refunds depend on the payment capability from the previous step being live. `);
            } else {
              return [
                createTextVNode(" Implement "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" }, "Refunds"),
                createTextVNode(" against completed payment consents. Refunds depend on the payment capability from the previous step being live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/payment-consents/{ConsentId}/refund</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve refund details for a payment consent</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payment-consents/{ConsentId}/refund")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve refund details for a payment consent")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide" data-v-cbbfa969${_scopeId2}>Refunds API Guide</a>. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide" }, "Refunds API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>6. Confirmation of Payee</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" data-v-cbbfa969${_scopeId2}>Confirmation of Payee</a> (CoP). CoP does not use the consent journey — it is a direct LFI-exposed API proxied via the Hub — so it can be delivered in parallel with the earlier payment and data sharing work if resourcing allows. `);
            } else {
              return [
                createTextVNode(" Implement "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" }, "Confirmation of Payee"),
                createTextVNode(" (CoP). CoP does not use the consent journey — it is a direct LFI-exposed API proxied via the Hub — so it can be delivered in parallel with the earlier payment and data sharing work if resourcing allows. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/customers/action/cop-query</code></a></td><td data-v-cbbfa969${_scopeId2}>Verify a payee&#39;s name against an account identifier</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/customers/action/cop-query")
                        ])
                      ]),
                      createVNode("td", null, "Verify a payee's name against an account identifier")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide" data-v-cbbfa969${_scopeId2}>CoP API Guide</a> and <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys" data-v-cbbfa969${_scopeId2}>user journeys</a>. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide" }, "CoP API Guide"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys" }, "user journeys"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>7. Consent Management Interface</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Provide a <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/" data-v-cbbfa969${_scopeId2}>Consent Management Interface</a> (CMI) in your retail banking channels so customers can view and revoke their active consents. `);
            } else {
              return [
                createTextVNode(" Provide a "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" (CMI) in your retail banking channels so customers can view and revoke their active consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The CMI is sequenced last in Phase 1 because it consumes consents created by the earlier capabilities. It is built against the Hub&#39;s Consent Manager APIs: `);
            } else {
              return [
                createTextVNode(" The CMI is sequenced last in Phase 1 because it consumes consents created by the earlier capabilities. It is built against the Hub's Consent Manager APIs: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-cbbfa969${_scopeId2}><thead data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><th data-v-cbbfa969${_scopeId2}>Endpoint</th><th data-v-cbbfa969${_scopeId2}>Purpose</th></tr></thead><tbody data-v-cbbfa969${_scopeId2}><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/psu/{userId}/consents</code></a></td><td data-v-cbbfa969${_scopeId2}>List all consents for a given customer</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--get" data-v-cbbfa969${_scopeId2}>GET</span><code data-v-cbbfa969${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-cbbfa969${_scopeId2}>Retrieve the full details of a consent</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consents/{consentId}/action/revoke</code></a></td><td data-v-cbbfa969${_scopeId2}>Revoke a specific consent</td></tr><tr data-v-cbbfa969${_scopeId2}><td data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke" class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consent-groups/{consentGroupId}/consents/action/revoke</code></a></td><td data-v-cbbfa969${_scopeId2}>Revoke a group of related consents</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/psu/{userId}/consents")
                        ])
                      ]),
                      createVNode("td", null, "List all consents for a given customer")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/consents/{consentId}")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve the full details of a consent")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consents/{consentId}/action/revoke")
                        ])
                      ]),
                      createVNode("td", null, "Revoke a specific consent")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent-groups/{consentGroupId}/consents/action/revoke")
                        ])
                      ]),
                      createVNode("td", null, "Revoke a group of related consents")
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
              _push3(` See <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements" data-v-cbbfa969${_scopeId2}>CMI — Bank Data Sharing Requirements</a>, <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements" data-v-cbbfa969${_scopeId2}>Bank Service Initiation Requirements</a>, the corresponding <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience" data-v-cbbfa969${_scopeId2}>User Experience</a> pages, and the <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" data-v-cbbfa969${_scopeId2}>CMI API Guide</a>. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements" }, "CMI — Bank Data Sharing Requirements"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation Requirements"),
                createTextVNode(", the corresponding "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience" }, "User Experience"),
                createTextVNode(" pages, and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" }, "CMI API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Phase 1 establishes the foundational integration with the API Hub and delivers the first customer-facing capability (Retail Data Sharing) followed by the simplest payment journey. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The steps are ordered so each builds on the last — ordering within the phase is a recommendation, not a hard dependency graph, except where an API clearly depends on another being present (e.g. Refunds requires a completed payment). ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "1. Consent Validate"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement the "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/validate")
              ]),
              createTextVNode(" endpoint on your Ozone Connect server. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This endpoint is called by the API Hub "),
              createVNode("strong", null, "before"),
              createTextVNode(" a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven't yet implemented, and then expand the accepted set as each subsequent capability comes online. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/api-guide" }, "Consent Events API Guide"),
              createTextVNode(" for implementation details. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "2. Consent Journey"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through customer authentication, authorization, and return to TPP: ")
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
                        href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ])
                    ]),
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, "Initiate the authorization interaction")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}")
                      ])
                    ]),
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, "Retrieve the full consent details")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/consents/{consentId}")
                      ])
                    ]),
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, "Update consent status, customer identifiers, and account IDs")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doConfirm")
                      ])
                    ]),
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, "Complete the authorization interaction and redirect back to TPP successfully")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doFail")
                      ])
                    ]),
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, "Complete the authorization interaction and redirect back to TPP with a failure")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
              createTextVNode(" for the end-to-end sequence, including customer authentication requirements ("),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" }, "SCA"),
              createTextVNode(") and identifier rules. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "3. Retail Data Sharing — Current & Savings Accounts"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
              createTextVNode(" for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first productised capability because it exercises the full consent journey end-to-end without the additional complexity of payment execution or encrypted PII. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Prioritise the following endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ])
                    ]),
                    createVNode("td", null, "List the accounts covered by the consent")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve details for a single account")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/balances")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve balances for an account")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/transactions")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve the transaction history for an account")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/customer")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve the customer details covered by the consent")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/customer")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve customer details for a specific account")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Data Sharing — Requirements"),
              createTextVNode(" and the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" }, "Data Sharing API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once live, update the "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/validate")
              ]),
              createTextVNode(" response to accept Bank Data Sharing consents. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "4. Retail Domestic — Single Instant Payment"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" }, "Single Instant Payment"),
              createTextVNode(" journey for retail customers. This introduces payment execution and the handling of encrypted PII on payment consents. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Key endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ]),
                    createVNode("td", null, "Execute an authorised payment")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payments/{PaymentId}")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve the status of a payment")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Single Instant Payment API Guide"),
              createTextVNode(", "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status" }, "Payment Rails and Status"),
              createTextVNode(", and the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
              createTextVNode(" guide for PII decryption. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Extend "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/validate")
              ]),
              createTextVNode(" to accept Single Instant Payment consents. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "5. Refunds"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" }, "Refunds"),
              createTextVNode(" against completed payment consents. Refunds depend on the payment capability from the previous step being live. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payment-consents/{ConsentId}/refund")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve refund details for a payment consent")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide" }, "Refunds API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "6. Confirmation of Payee"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" }, "Confirmation of Payee"),
              createTextVNode(" (CoP). CoP does not use the consent journey — it is a direct LFI-exposed API proxied via the Hub — so it can be delivered in parallel with the earlier payment and data sharing work if resourcing allows. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/customers/action/cop-query")
                      ])
                    ]),
                    createVNode("td", null, "Verify a payee's name against an account identifier")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide" }, "CoP API Guide"),
              createTextVNode(" and "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys" }, "user journeys"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "7. Consent Management Interface"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Provide a "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
              createTextVNode(" (CMI) in your retail banking channels so customers can view and revoke their active consents. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The CMI is sequenced last in Phase 1 because it consumes consents created by the earlier capabilities. It is built against the Hub's Consent Manager APIs: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/psu/{userId}/consents")
                      ])
                    ]),
                    createVNode("td", null, "List all consents for a given customer")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve the full details of a consent")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consents/{consentId}/action/revoke")
                      ])
                    ]),
                    createVNode("td", null, "Revoke a specific consent")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent-groups/{consentGroupId}/consents/action/revoke")
                      ])
                    ]),
                    createVNode("td", null, "Revoke a group of related consents")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements" }, "CMI — Bank Data Sharing Requirements"),
              createTextVNode(", "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation Requirements"),
              createTextVNode(", the corresponding "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience" }, "User Experience"),
              createTextVNode(" pages, and the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" }, "CMI API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-2",
    num: "2",
    color: "var(--at-gold)",
    eyebrow: "Phase 2",
    title: "Extend Retail",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 2 rounds out the retail offering with the more complex payment types and the discovery APIs. `);
            } else {
              return [
                createTextVNode(" Phase 2 rounds out the retail offering with the more complex payment types and the discovery APIs. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>Domestic Multi-Payments (all flavours)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Implement all remaining domestic payment types for retail customers:`);
            } else {
              return [
                createTextVNode("Implement all remaining domestic payment types for retail customers:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements" data-v-cbbfa969${_scopeId2}>Variable On-Demand</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements" data-v-cbbfa969${_scopeId2}>Fixed On-Demand</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements" data-v-cbbfa969${_scopeId2}>Variable Periodic Schedule</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements" data-v-cbbfa969${_scopeId2}>Fixed Periodic Schedule</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements" data-v-cbbfa969${_scopeId2}>Variable Defined Schedule</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements" data-v-cbbfa969${_scopeId2}>Fixed Defined Schedule</a></li><li data-v-cbbfa969${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements" data-v-cbbfa969${_scopeId2}>Delegated SCA</a></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements" }, "Variable On-Demand")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements" }, "Fixed On-Demand")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements" }, "Variable Periodic Schedule")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements" }, "Fixed Periodic Schedule")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements" }, "Variable Defined Schedule")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements" }, "Fixed Defined Schedule")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements" }, "Delegated SCA")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Extend <span class="endpoint" data-v-cbbfa969${_scopeId2}><span class="http-method http-method--post" data-v-cbbfa969${_scopeId2}>POST</span><code data-v-cbbfa969${_scopeId2}>/consent/action/validate</code></span> to accept each multi-payment consent type as you bring it live. `);
            } else {
              return [
                createTextVNode(" Extend "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" to accept each multi-payment consent type as you bring it live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>Products &amp; Leads</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement the <a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements" data-v-cbbfa969${_scopeId2}>Products &amp; Leads</a> APIs. See the <a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide" data-v-cbbfa969${_scopeId2}>Products &amp; Leads API Guide</a>. `);
            } else {
              return [
                createTextVNode(" Implement the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements" }, "Products & Leads"),
                createTextVNode(" APIs. See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide" }, "Products & Leads API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Phase 2 rounds out the retail offering with the more complex payment types and the discovery APIs. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Domestic Multi-Payments (all flavours)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Implement all remaining domestic payment types for retail customers:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements" }, "Variable On-Demand")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements" }, "Fixed On-Demand")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements" }, "Variable Periodic Schedule")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements" }, "Fixed Periodic Schedule")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements" }, "Variable Defined Schedule")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements" }, "Fixed Defined Schedule")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements" }, "Delegated SCA")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Extend "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/validate")
              ]),
              createTextVNode(" to accept each multi-payment consent type as you bring it live. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Products & Leads"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements" }, "Products & Leads"),
              createTextVNode(" APIs. See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide" }, "Products & Leads API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-3",
    num: "3",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Phase 3",
    title: "Data Sharing Breadth and SME Foundations",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 3 extends Data Sharing to additional product types and introduces the SME proposition. `);
            } else {
              return [
                createTextVNode(" Phase 3 extends Data Sharing to additional product types and introduces the SME proposition. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>Extended Retail Data Sharing</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Add Data Sharing for additional retail product categories:`);
            } else {
              return [
                createTextVNode("Add Data Sharing for additional retail product categories:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-cbbfa969${_scopeId2}><strong data-v-cbbfa969${_scopeId2}>Credit Card</strong> accounts</li><li data-v-cbbfa969${_scopeId2}><strong data-v-cbbfa969${_scopeId2}>Finance</strong> accounts</li><li data-v-cbbfa969${_scopeId2}><strong data-v-cbbfa969${_scopeId2}>Mortgage</strong> accounts</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Credit Card"),
                  createTextVNode(" accounts")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Finance"),
                  createTextVNode(" accounts")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Mortgage"),
                  createTextVNode(" accounts")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` These reuse the same Data Sharing endpoints delivered in Phase 1 — the additional work is in mapping your core banking product data into the Data Sharing schemas. `);
            } else {
              return [
                createTextVNode(" These reuse the same Data Sharing endpoints delivered in Phase 1 — the additional work is in mapping your core banking product data into the Data Sharing schemas. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Data Sharing — Current &amp; Savings Accounts</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Deliver <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" data-v-cbbfa969${_scopeId2}>Data Sharing</a> for SME Current Accounts and Savings Accounts, prioritising the same endpoints as retail in Phase 1 (<code data-v-cbbfa969${_scopeId2}>/accounts</code>, <code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}</code>, <code data-v-cbbfa969${_scopeId2}>/balances</code>, <code data-v-cbbfa969${_scopeId2}>/transactions</code>, <code data-v-cbbfa969${_scopeId2}>/customer</code>, <code data-v-cbbfa969${_scopeId2}>/accounts/{AccountId}/customer</code>). `);
            } else {
              return [
                createTextVNode(" Deliver "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Data Sharing"),
                createTextVNode(" for SME Current Accounts and Savings Accounts, prioritising the same endpoints as retail in Phase 1 ("),
                createVNode("code", null, "/accounts"),
                createTextVNode(", "),
                createVNode("code", null, "/accounts/{AccountId}"),
                createTextVNode(", "),
                createVNode("code", null, "/balances"),
                createTextVNode(", "),
                createVNode("code", null, "/transactions"),
                createTextVNode(", "),
                createVNode("code", null, "/customer"),
                createTextVNode(", "),
                createVNode("code", null, "/accounts/{AccountId}/customer"),
                createTextVNode("). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Single Instant Payment</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Deliver <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" data-v-cbbfa969${_scopeId2}>Single Instant Payment</a> for SME customers. `);
            } else {
              return [
                createTextVNode(" Deliver "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" }, "Single Instant Payment"),
                createTextVNode(" for SME customers. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Refunds</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Deliver <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" data-v-cbbfa969${_scopeId2}>Refunds</a> for SME payment consents. `);
            } else {
              return [
                createTextVNode(" Deliver "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" }, "Refunds"),
                createTextVNode(" for SME payment consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Confirmation of Payee</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Deliver <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" data-v-cbbfa969${_scopeId2}>CoP</a> for SME customers. `);
            } else {
              return [
                createTextVNode(" Deliver "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" }, "CoP"),
                createTextVNode(" for SME customers. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Consent Management Interface</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Provide a <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/" data-v-cbbfa969${_scopeId2}>Consent Management Interface</a> in your SME banking channels, using the same Consent Manager APIs as the retail CMI. `);
            } else {
              return [
                createTextVNode(" Provide a "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" in your SME banking channels, using the same Consent Manager APIs as the retail CMI. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Separate API Hub for SME"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-cbbfa969${_scopeId2}> SME propositions will typically require a second API Hub instance alongside the retail one, because each Hub exposes only one authorization endpoint. The second Hub can be pointed at the same Ozone Connect deployment — routing internally on the <code data-v-cbbfa969${_scopeId2}>o3-provider-id</code> header — and the LFI-held certificates (C3, S4, Sig4, Enc1) are shared across both Hubs. See <a href="/knowledge-base/articles/multi-segment-api-hubs" data-v-cbbfa969${_scopeId2}>Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments</a> for the full deployment pattern and Trust Framework implications. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" SME propositions will typically require a second API Hub instance alongside the retail one, because each Hub exposes only one authorization endpoint. The second Hub can be pointed at the same Ozone Connect deployment — routing internally on the "),
                  createVNode("code", null, "o3-provider-id"),
                  createTextVNode(" header — and the LFI-held certificates (C3, S4, Sig4, Enc1) are shared across both Hubs. See "),
                  createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments"),
                  createTextVNode(" for the full deployment pattern and Trust Framework implications. ")
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
              createTextVNode(" Phase 3 extends Data Sharing to additional product types and introduces the SME proposition. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Extended Retail Data Sharing"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Add Data Sharing for additional retail product categories:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Credit Card"),
                createTextVNode(" accounts")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Finance"),
                createTextVNode(" accounts")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Mortgage"),
                createTextVNode(" accounts")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These reuse the same Data Sharing endpoints delivered in Phase 1 — the additional work is in mapping your core banking product data into the Data Sharing schemas. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Data Sharing — Current & Savings Accounts"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Deliver "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Data Sharing"),
              createTextVNode(" for SME Current Accounts and Savings Accounts, prioritising the same endpoints as retail in Phase 1 ("),
              createVNode("code", null, "/accounts"),
              createTextVNode(", "),
              createVNode("code", null, "/accounts/{AccountId}"),
              createTextVNode(", "),
              createVNode("code", null, "/balances"),
              createTextVNode(", "),
              createVNode("code", null, "/transactions"),
              createTextVNode(", "),
              createVNode("code", null, "/customer"),
              createTextVNode(", "),
              createVNode("code", null, "/accounts/{AccountId}/customer"),
              createTextVNode("). ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Single Instant Payment"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Deliver "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements" }, "Single Instant Payment"),
              createTextVNode(" for SME customers. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Refunds"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Deliver "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements" }, "Refunds"),
              createTextVNode(" for SME payment consents. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Confirmation of Payee"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Deliver "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements" }, "CoP"),
              createTextVNode(" for SME customers. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Consent Management Interface"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Provide a "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
              createTextVNode(" in your SME banking channels, using the same Consent Manager APIs as the retail CMI. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Separate API Hub for SME"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" SME propositions will typically require a second API Hub instance alongside the retail one, because each Hub exposes only one authorization endpoint. The second Hub can be pointed at the same Ozone Connect deployment — routing internally on the "),
                createVNode("code", null, "o3-provider-id"),
                createTextVNode(" header — and the LFI-held certificates (C3, S4, Sig4, Enc1) are shared across both Hubs. See "),
                createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments"),
                createTextVNode(" for the full deployment pattern and Trust Framework implications. ")
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
    id: "phase-4",
    num: "4",
    color: "var(--at-navy)",
    eyebrow: "Phase 4",
    title: "SME Complex Payments",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Phase 4 completes the SME proposition with the more complex payment flows.`);
            } else {
              return [
                createTextVNode("Phase 4 completes the SME proposition with the more complex payment flows.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Multi-Payments (all flavours)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Deliver all domestic multi-payment types for SME — the same set as Phase 2, applied to SME accounts. `);
            } else {
              return [
                createTextVNode(" Deliver all domestic multi-payment types for SME — the same set as Phase 2, applied to SME accounts. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-cbbfa969${_scopeId}>SME Multi-Authorization</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization" data-v-cbbfa969${_scopeId2}>Multi-Authorization</a> for SME payment consents that require multiple authorisers (for example, a business account with two-signatory rules). `);
            } else {
              return [
                createTextVNode(" Implement "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization" }, "Multi-Authorization"),
                createTextVNode(" for SME payment consents that require multiple authorisers (for example, a business account with two-signatory rules). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Phase 4 completes the SME proposition with the more complex payment flows.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Multi-Payments (all flavours)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Deliver all domestic multi-payment types for SME — the same set as Phase 2, applied to SME accounts. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "SME Multi-Authorization"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization" }, "Multi-Authorization"),
              createTextVNode(" for SME payment consents that require multiple authorisers (for example, a business account with two-signatory rules). ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "after-phase-4",
    num: "5",
    color: "var(--at-teal-deep)",
    eyebrow: "After Phase 4",
    title: "Ongoing version upgrades and regulatory change",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` By the end of Phase 4 you will have delivered all of the current Open Finance capabilities across both retail and SME propositions. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the <a href="/tech/release-notes-and-erratas/release-notes/api-hub/2026" data-v-cbbfa969${_scopeId2}>API Hub Release Notes</a> schedule and plan subsequent work against your own delivery cycles. `);
            } else {
              return [
                createTextVNode(" By the end of Phase 4 you will have delivered all of the current Open Finance capabilities across both retail and SME propositions. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the "),
                createVNode("a", { href: "/tech/release-notes-and-erratas/release-notes/api-hub/2026" }, "API Hub Release Notes"),
                createTextVNode(" schedule and plan subsequent work against your own delivery cycles. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" By the end of Phase 4 you will have delivered all of the current Open Finance capabilities across both retail and SME propositions. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the "),
              createVNode("a", { href: "/tech/release-notes-and-erratas/release-notes/api-hub/2026" }, "API Hub Release Notes"),
              createTextVNode(" schedule and plan subsequent work against your own delivery cycles. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/getting-started/bank-rollout-plan.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bankRolloutPlan = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cbbfa969"]]);
export {
  bankRolloutPlan as default
};
