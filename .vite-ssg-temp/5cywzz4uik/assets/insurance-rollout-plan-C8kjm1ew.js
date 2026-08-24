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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a6ecca01><section class="ed-doc__hero" data-v-a6ecca01><div class="ed-doc__inner" data-v-a6ecca01><div class="ed-doc__eyebrow" data-v-a6ecca01><span class="ed-doc__eyebrow-dash" data-v-a6ecca01></span> LFI · Getting Started · Insurance Rollout Plan </div><h1 class="ed-doc__title" data-v-a6ecca01> Recommended Insurance Rollout Plan <span class="ed-doc__read" data-v-a6ecca01>5 min read</span></h1><p class="ed-doc__lede" data-v-a6ecca01> This page proposes a sensible delivery sequence for an LFI working through <a href="/tech/lfi-api-hub/getting-started/" data-v-a6ecca01>Step 3 of the LFI Integration Journey</a> when its Open Finance scope covers insurance. It is intended as a starting path that breaks the work into manageable increments — the LFI picks a single insurance type to deliver end-to-end first, then extends to the rest of its book once the first type is live. </p></div></section><section class="ed-doc__intro" data-v-a6ecca01><div class="ed-doc__inner" data-v-a6ecca01>`);
  _push(ssrRenderComponent(_component_EdNote, {
    type: "warning",
    title: "Guidance only"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-a6ecca01${_scopeId}> This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI&#39;s responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing. </p>`);
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
        _push2(` Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through <a href="/tech/lfi-api-hub/getting-started/#phase-a" data-v-a6ecca01${_scopeId}>Step 3 → Step 9</a> (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows. `);
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
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` The plan is shaped around one core idea: an LFI that underwrites more than one insurance type should <strong data-v-a6ecca01${_scopeId}>pick a primary insurance type first</strong> — typically the type with the largest in-force book or the highest expected TPP demand — and deliver it through every phase before extending to the rest. This contains scope, lets the LFI prove the consent journey and Ozone Connect endpoints against a single product model, and avoids spreading certification and production launch effort across multiple insurance types in parallel. `);
      } else {
        return [
          createTextVNode(" The plan is shaped around one core idea: an LFI that underwrites more than one insurance type should "),
          createVNode("strong", null, "pick a primary insurance type first"),
          createTextVNode(" — typically the type with the largest in-force book or the highest expected TPP demand — and deliver it through every phase before extending to the rest. This contains scope, lets the LFI prove the consent journey and Ozone Connect endpoints against a single product model, and avoids spreading certification and production launch effort across multiple insurance types in parallel. ")
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
    title: "Foundations and First Insurance Type — Data Sharing",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 1 establishes the foundational integration with the API Hub and delivers Insurance Data Sharing for the LFI&#39;s chosen primary insurance type, end-to-end through certification and production launch. `);
            } else {
              return [
                createTextVNode(" Phase 1 establishes the foundational integration with the API Hub and delivers Insurance Data Sharing for the LFI's chosen primary insurance type, end-to-end through certification and production launch. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a6ecca01${_scopeId}>1. Consent Validate</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consent/action/validate</code></a> endpoint on your Ozone Connect server. `);
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
              _push3(` This endpoint is called by the API Hub <strong data-v-a6ecca01${_scopeId2}>before</strong> a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven&#39;t yet implemented, and then expand the accepted set as each subsequent capability comes online. `);
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide" data-v-a6ecca01${_scopeId2}>Consent Events API Guide</a> for implementation details. `);
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
        _push2(`<h3 data-v-a6ecca01${_scopeId}>2. Consent Journey</h3>`);
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
              _push3(`<table data-v-a6ecca01${_scopeId2}><thead data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><th data-v-a6ecca01${_scopeId2}>Endpoint</th><th data-v-a6ecca01${_scopeId2}>Direction</th><th data-v-a6ecca01${_scopeId2}>Purpose</th></tr></thead><tbody data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/auth</code></a></td><td data-v-a6ecca01${_scopeId2}>LFI → API Hub</td><td data-v-a6ecca01${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-a6ecca01${_scopeId2}>LFI → API Hub</td><td data-v-a6ecca01${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--patch" data-v-a6ecca01${_scopeId2}>PATCH</span><code data-v-a6ecca01${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-a6ecca01${_scopeId2}>LFI → API Hub</td><td data-v-a6ecca01${_scopeId2}>Update consent status, customer identifiers, and policy IDs</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-a6ecca01${_scopeId2}>LFI → API Hub</td><td data-v-a6ecca01${_scopeId2}>Complete the authorization interaction and redirect back to TPP successfully</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-a6ecca01${_scopeId2}>LFI → API Hub</td><td data-v-a6ecca01${_scopeId2}>Complete the authorization interaction and redirect back to TPP with a failure</td></tr></tbody></table>`);
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
                      createVNode("td", null, "Update consent status, customer identifiers, and policy IDs")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-a6ecca01${_scopeId2}>Consent Journey API Guide</a> for the end-to-end sequence, including customer authentication requirements (<a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" data-v-a6ecca01${_scopeId2}>SCA</a>) and identifier rules. `);
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
        _push2(`<h3 data-v-a6ecca01${_scopeId}>3. Pick a Primary Insurance Type</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Before building any Insurance Data Sharing endpoints, select <strong data-v-a6ecca01${_scopeId2}>one</strong> insurance type from the seven sectors covered by the standard: `);
            } else {
              return [
                createTextVNode(" Before building any Insurance Data Sharing endpoints, select "),
                createVNode("strong", null, "one"),
                createTextVNode(" insurance type from the seven sectors covered by the standard: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Employment</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Health</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Home</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Life</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Motor</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Renters</strong> insurance</li><li data-v-a6ecca01${_scopeId2}><strong data-v-a6ecca01${_scopeId2}>Travel</strong> insurance</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Employment"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Health"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Home"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Life"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Motor"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Renters"),
                  createTextVNode(" insurance")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Travel"),
                  createTextVNode(" insurance")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If your LFI underwrites more than one of these, pick the type you judge best to start with — typically the one with the largest in-force book, the highest expected TPP demand, or the cleanest mapping from your existing policy administration system into the standard&#39;s schema. The remaining types are picked up in <a href="#phase-3" data-v-a6ecca01${_scopeId2}>Phase 3</a> once Phase 1 and Phase 2 are live for the primary type. `);
            } else {
              return [
                createTextVNode(" If your LFI underwrites more than one of these, pick the type you judge best to start with — typically the one with the largest in-force book, the highest expected TPP demand, or the cleanest mapping from your existing policy administration system into the standard's schema. The remaining types are picked up in "),
                createVNode("a", { href: "#phase-3" }, "Phase 3"),
                createTextVNode(" once Phase 1 and Phase 2 are live for the primary type. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a6ecca01${_scopeId}>4. Insurance Data Sharing — Primary Type</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Implement <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/" data-v-a6ecca01${_scopeId2}>Insurance Data Sharing</a> for the primary insurance type chosen above. Each insurance type is exposed through one pair of Ozone Connect endpoints — substitute the sector slug for your chosen type (<code data-v-a6ecca01${_scopeId2}>employment</code>, <code data-v-a6ecca01${_scopeId2}>health</code>, <code data-v-a6ecca01${_scopeId2}>home</code>, <code data-v-a6ecca01${_scopeId2}>life</code>, <code data-v-a6ecca01${_scopeId2}>motor</code>, <code data-v-a6ecca01${_scopeId2}>renters</code>, or <code data-v-a6ecca01${_scopeId2}>travel</code>): `);
            } else {
              return [
                createTextVNode(" Implement "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/" }, "Insurance Data Sharing"),
                createTextVNode(" for the primary insurance type chosen above. Each insurance type is exposed through one pair of Ozone Connect endpoints — substitute the sector slug for your chosen type ("),
                createVNode("code", null, "employment"),
                createTextVNode(", "),
                createVNode("code", null, "health"),
                createTextVNode(", "),
                createVNode("code", null, "home"),
                createTextVNode(", "),
                createVNode("code", null, "life"),
                createTextVNode(", "),
                createVNode("code", null, "motor"),
                createTextVNode(", "),
                createVNode("code", null, "renters"),
                createTextVNode(", or "),
                createVNode("code", null, "travel"),
                createTextVNode("): ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-a6ecca01${_scopeId2}><thead data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><th data-v-a6ecca01${_scopeId2}>Endpoint</th><th data-v-a6ecca01${_scopeId2}>Purpose</th></tr></thead><tbody data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><span class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/{sector}-insurance-policies</code></span></td><td data-v-a6ecca01${_scopeId2}>List the policies covered by the consent</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><span class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/{sector}-insurance-policies/{InsurancePolicyId}</code></span></td><td data-v-a6ecca01${_scopeId2}>Retrieve full details for a single policy</td></tr></tbody></table>`);
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
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/{sector}-insurance-policies")
                        ])
                      ]),
                      createVNode("td", null, "List the policies covered by the consent")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/{sector}-insurance-policies/{InsurancePolicyId}")
                        ])
                      ]),
                      createVNode("td", null, "Retrieve full details for a single policy")
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
              _push3(` See <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements" data-v-a6ecca01${_scopeId2}>Data Sharing — Requirements</a> and the <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/" data-v-a6ecca01${_scopeId2}>Data Sharing API Guide</a>. Where the consent includes <code data-v-a6ecca01${_scopeId2}>ReadInsurancePremium</code>, the <code data-v-a6ecca01${_scopeId2}>Premium</code> field MUST be returned as a JWE — see <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums" data-v-a6ecca01${_scopeId2}>Encrypted Premiums</a>. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements" }, "Data Sharing — Requirements"),
                createTextVNode(" and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/" }, "Data Sharing API Guide"),
                createTextVNode(". Where the consent includes "),
                createVNode("code", null, "ReadInsurancePremium"),
                createTextVNode(", the "),
                createVNode("code", null, "Premium"),
                createTextVNode(" field MUST be returned as a JWE — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once live, update the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consent/action/validate</code></a> response to accept Insurance Data Sharing consents for the chosen sector. `);
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
                createTextVNode(" response to accept Insurance Data Sharing consents for the chosen sector. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a6ecca01${_scopeId}>5. Consent Management Interface</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Provide a <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/" data-v-a6ecca01${_scopeId2}>Consent Management Interface</a> (CMI) in your customer-facing channels so policyholders can view and revoke their active insurance consents. `);
            } else {
              return [
                createTextVNode(" Provide a "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" (CMI) in your customer-facing channels so policyholders can view and revoke their active insurance consents. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The CMI is sequenced last in Phase 1 because it consumes consents created by the Insurance Data Sharing capability. It is built against the Hub&#39;s Consent Manager APIs — the same endpoints the bank rollout uses, since the Consent Manager surface is consent-type agnostic: `);
            } else {
              return [
                createTextVNode(" The CMI is sequenced last in Phase 1 because it consumes consents created by the Insurance Data Sharing capability. It is built against the Hub's Consent Manager APIs — the same endpoints the bank rollout uses, since the Consent Manager surface is consent-type agnostic: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-a6ecca01${_scopeId2}><thead data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><th data-v-a6ecca01${_scopeId2}>Endpoint</th><th data-v-a6ecca01${_scopeId2}>Purpose</th></tr></thead><tbody data-v-a6ecca01${_scopeId2}><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/psu/{userId}/consents</code></a></td><td data-v-a6ecca01${_scopeId2}>List all consents for a given customer</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--get" data-v-a6ecca01${_scopeId2}>GET</span><code data-v-a6ecca01${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-a6ecca01${_scopeId2}>Retrieve the full details of a consent</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consents/{consentId}/action/revoke</code></a></td><td data-v-a6ecca01${_scopeId2}>Revoke a specific consent</td></tr><tr data-v-a6ecca01${_scopeId2}><td data-v-a6ecca01${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consent-groups/{consentGroupId}/consents/action/revoke</code></a></td><td data-v-a6ecca01${_scopeId2}>Revoke a group of related consents</td></tr></tbody></table>`);
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
              _push3(` See <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements" data-v-a6ecca01${_scopeId2}>CMI — Insurance Data Sharing Requirements</a>, <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience" data-v-a6ecca01${_scopeId2}>User Experience</a>, and the <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" data-v-a6ecca01${_scopeId2}>CMI API Guide</a>. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements" }, "CMI — Insurance Data Sharing Requirements"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience" }, "User Experience"),
                createTextVNode(", and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" }, "CMI API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` With Phase 1 complete, take the work through <a href="/tech/lfi-api-hub/getting-started/#phase-b" data-v-a6ecca01${_scopeId2}>Certification</a> and <a href="/tech/lfi-api-hub/getting-started/#phase-c" data-v-a6ecca01${_scopeId2}>Production Launch</a> for the chosen primary insurance type before starting Phase 2. `);
            } else {
              return [
                createTextVNode(" With Phase 1 complete, take the work through "),
                createVNode("a", { href: "/tech/lfi-api-hub/getting-started/#phase-b" }, "Certification"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/getting-started/#phase-c" }, "Production Launch"),
                createTextVNode(" for the chosen primary insurance type before starting Phase 2. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Phase 1 establishes the foundational integration with the API Hub and delivers Insurance Data Sharing for the LFI's chosen primary insurance type, end-to-end through certification and production launch. ")
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
                    createVNode("td", null, "Update consent status, customer identifiers, and policy IDs")
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
          createVNode("h3", null, "3. Pick a Primary Insurance Type"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Before building any Insurance Data Sharing endpoints, select "),
              createVNode("strong", null, "one"),
              createTextVNode(" insurance type from the seven sectors covered by the standard: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Employment"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Health"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Home"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Life"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Motor"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Renters"),
                createTextVNode(" insurance")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Travel"),
                createTextVNode(" insurance")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If your LFI underwrites more than one of these, pick the type you judge best to start with — typically the one with the largest in-force book, the highest expected TPP demand, or the cleanest mapping from your existing policy administration system into the standard's schema. The remaining types are picked up in "),
              createVNode("a", { href: "#phase-3" }, "Phase 3"),
              createTextVNode(" once Phase 1 and Phase 2 are live for the primary type. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "4. Insurance Data Sharing — Primary Type"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Implement "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/" }, "Insurance Data Sharing"),
              createTextVNode(" for the primary insurance type chosen above. Each insurance type is exposed through one pair of Ozone Connect endpoints — substitute the sector slug for your chosen type ("),
              createVNode("code", null, "employment"),
              createTextVNode(", "),
              createVNode("code", null, "health"),
              createTextVNode(", "),
              createVNode("code", null, "home"),
              createTextVNode(", "),
              createVNode("code", null, "life"),
              createTextVNode(", "),
              createVNode("code", null, "motor"),
              createTextVNode(", "),
              createVNode("code", null, "renters"),
              createTextVNode(", or "),
              createVNode("code", null, "travel"),
              createTextVNode("): ")
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
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/{sector}-insurance-policies")
                      ])
                    ]),
                    createVNode("td", null, "List the policies covered by the consent")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/{sector}-insurance-policies/{InsurancePolicyId}")
                      ])
                    ]),
                    createVNode("td", null, "Retrieve full details for a single policy")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements" }, "Data Sharing — Requirements"),
              createTextVNode(" and the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/" }, "Data Sharing API Guide"),
              createTextVNode(". Where the consent includes "),
              createVNode("code", null, "ReadInsurancePremium"),
              createTextVNode(", the "),
              createVNode("code", null, "Premium"),
              createTextVNode(" field MUST be returned as a JWE — see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
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
              createTextVNode(" response to accept Insurance Data Sharing consents for the chosen sector. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "5. Consent Management Interface"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Provide a "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
              createTextVNode(" (CMI) in your customer-facing channels so policyholders can view and revoke their active insurance consents. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The CMI is sequenced last in Phase 1 because it consumes consents created by the Insurance Data Sharing capability. It is built against the Hub's Consent Manager APIs — the same endpoints the bank rollout uses, since the Consent Manager surface is consent-type agnostic: ")
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
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements" }, "CMI — Insurance Data Sharing Requirements"),
              createTextVNode(", "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience" }, "User Experience"),
              createTextVNode(", and the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide" }, "CMI API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" With Phase 1 complete, take the work through "),
              createVNode("a", { href: "/tech/lfi-api-hub/getting-started/#phase-b" }, "Certification"),
              createTextVNode(" and "),
              createVNode("a", { href: "/tech/lfi-api-hub/getting-started/#phase-c" }, "Production Launch"),
              createTextVNode(" for the chosen primary insurance type before starting Phase 2. ")
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
    title: "First Insurance Type — Quotation",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 2 adds the Insurance Quotation capability for the <strong data-v-a6ecca01${_scopeId2}>same insurance type</strong> delivered in Phase 1. Building quotation against a type the LFI has already taken end-to-end keeps the consent journey, customer identification, and Ozone Connect integration patterns familiar — the only new work is the quotation flow itself. `);
            } else {
              return [
                createTextVNode(" Phase 2 adds the Insurance Quotation capability for the "),
                createVNode("strong", null, "same insurance type"),
                createTextVNode(" delivered in Phase 1. Building quotation against a type the LFI has already taken end-to-end keeps the consent journey, customer identification, and Ozone Connect integration patterns familiar — the only new work is the quotation flow itself. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Forthcoming capability"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-a6ecca01${_scopeId2}> Insurance Quotation is a forthcoming capability and is not yet published in these standards. When it is published, this phase will be updated with the endpoint list, requirements, and API guide links. Track the <a href="/tech/release-notes-and-erratas/release-notes/api-hub/2026" data-v-a6ecca01${_scopeId2}>API Hub Release Notes</a> for the publication date. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Insurance Quotation is a forthcoming capability and is not yet published in these standards. When it is published, this phase will be updated with the endpoint list, requirements, and API guide links. Track the "),
                  createVNode("a", { href: "/tech/release-notes-and-erratas/release-notes/api-hub/2026" }, "API Hub Release Notes"),
                  createTextVNode(" for the publication date. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Extend <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consent/action/validate</code></a> to accept Insurance Quotation consents for the chosen sector once the capability goes live, and take Phase 2 through Certification and Production Launch before starting Phase 3. `);
            } else {
              return [
                createTextVNode(" Extend "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" to accept Insurance Quotation consents for the chosen sector once the capability goes live, and take Phase 2 through Certification and Production Launch before starting Phase 3. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Phase 2 adds the Insurance Quotation capability for the "),
              createVNode("strong", null, "same insurance type"),
              createTextVNode(" delivered in Phase 1. Building quotation against a type the LFI has already taken end-to-end keeps the consent journey, customer identification, and Ozone Connect integration patterns familiar — the only new work is the quotation flow itself. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Forthcoming capability"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Insurance Quotation is a forthcoming capability and is not yet published in these standards. When it is published, this phase will be updated with the endpoint list, requirements, and API guide links. Track the "),
                createVNode("a", { href: "/tech/release-notes-and-erratas/release-notes/api-hub/2026" }, "API Hub Release Notes"),
                createTextVNode(" for the publication date. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Extend "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/validate")
              ]),
              createTextVNode(" to accept Insurance Quotation consents for the chosen sector once the capability goes live, and take Phase 2 through Certification and Production Launch before starting Phase 3. ")
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
    title: "Extend to Additional Insurance Types",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Phase 3 applies to LFIs that underwrite more than one insurance type. Once Phase 1 and Phase 2 are live for the primary type, repeat the same delivery pattern for each additional insurance type the LFI offers: `);
            } else {
              return [
                createTextVNode(" Phase 3 applies to LFIs that underwrite more than one insurance type. Once Phase 1 and Phase 2 are live for the primary type, repeat the same delivery pattern for each additional insurance type the LFI offers: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a6ecca01${_scopeId2}>Implement Insurance Data Sharing for the additional sector (<code data-v-a6ecca01${_scopeId2}>/{sector}-insurance-policies</code> and <code data-v-a6ecca01${_scopeId2}>/{sector}-insurance-policies/{InsurancePolicyId}</code>)</li><li data-v-a6ecca01${_scopeId2}>Extend the CMI to surface consents for the additional sector (no new endpoints — the Consent Manager APIs already cover it)</li><li data-v-a6ecca01${_scopeId2}>Implement Insurance Quotation for the additional sector once that capability is live</li><li data-v-a6ecca01${_scopeId2}>Extend <span class="endpoint" data-v-a6ecca01${_scopeId2}><span class="http-method http-method--post" data-v-a6ecca01${_scopeId2}>POST</span><code data-v-a6ecca01${_scopeId2}>/consent/action/validate</code></span> to accept consents for the additional sector </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Implement Insurance Data Sharing for the additional sector ("),
                  createVNode("code", null, "/{sector}-insurance-policies"),
                  createTextVNode(" and "),
                  createVNode("code", null, "/{sector}-insurance-policies/{InsurancePolicyId}"),
                  createTextVNode(")")
                ]),
                createVNode("li", null, "Extend the CMI to surface consents for the additional sector (no new endpoints — the Consent Manager APIs already cover it)"),
                createVNode("li", null, "Implement Insurance Quotation for the additional sector once that capability is live"),
                createVNode("li", null, [
                  createTextVNode("Extend "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" to accept consents for the additional sector ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each additional insurance type is a self-contained delivery increment and should be taken through Certification and Production Launch before the next one is started, unless resourcing allows types to be brought live in parallel. `);
            } else {
              return [
                createTextVNode(" Each additional insurance type is a self-contained delivery increment and should be taken through Certification and Production Launch before the next one is started, unless resourcing allows types to be brought live in parallel. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The endpoints and consent-journey integration are the same across all seven sectors — the additional work is in mapping each insurance type&#39;s policy and customer data into the standard&#39;s schemas. `);
            } else {
              return [
                createTextVNode(" The endpoints and consent-journey integration are the same across all seven sectors — the additional work is in mapping each insurance type's policy and customer data into the standard's schemas. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Phase 3 applies to LFIs that underwrite more than one insurance type. Once Phase 1 and Phase 2 are live for the primary type, repeat the same delivery pattern for each additional insurance type the LFI offers: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Implement Insurance Data Sharing for the additional sector ("),
                createVNode("code", null, "/{sector}-insurance-policies"),
                createTextVNode(" and "),
                createVNode("code", null, "/{sector}-insurance-policies/{InsurancePolicyId}"),
                createTextVNode(")")
              ]),
              createVNode("li", null, "Extend the CMI to surface consents for the additional sector (no new endpoints — the Consent Manager APIs already cover it)"),
              createVNode("li", null, "Implement Insurance Quotation for the additional sector once that capability is live"),
              createVNode("li", null, [
                createTextVNode("Extend "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" to accept consents for the additional sector ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each additional insurance type is a self-contained delivery increment and should be taken through Certification and Production Launch before the next one is started, unless resourcing allows types to be brought live in parallel. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The endpoints and consent-journey integration are the same across all seven sectors — the additional work is in mapping each insurance type's policy and customer data into the standard's schemas. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "after-phase-3",
    num: "4",
    color: "var(--at-teal-deep)",
    eyebrow: "After Phase 3",
    title: "Ongoing version upgrades and regulatory change",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` By the end of Phase 3 the LFI will have delivered Insurance Data Sharing, the Consent Management Interface, and Insurance Quotation for every insurance type it underwrites. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the <a href="/tech/release-notes-and-erratas/release-notes/api-hub/2026" data-v-a6ecca01${_scopeId2}>API Hub Release Notes</a> schedule and plan subsequent work against your own delivery cycles. `);
            } else {
              return [
                createTextVNode(" By the end of Phase 3 the LFI will have delivered Insurance Data Sharing, the Consent Management Interface, and Insurance Quotation for every insurance type it underwrites. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the "),
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
              createTextVNode(" By the end of Phase 3 the LFI will have delivered Insurance Data Sharing, the Consent Management Interface, and Insurance Quotation for every insurance type it underwrites. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the "),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/getting-started/insurance-rollout-plan.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const insuranceRolloutPlan = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a6ecca01"]]);
export {
  insuranceRolloutPlan as default
};
