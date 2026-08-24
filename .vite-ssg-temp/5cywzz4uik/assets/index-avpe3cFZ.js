import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e05f9d75><section class="ed-doc__hero" data-v-e05f9d75><div class="ed-doc__inner" data-v-e05f9d75><div class="ed-doc__eyebrow" data-v-e05f9d75><span class="ed-doc__eyebrow-dash" data-v-e05f9d75></span> LFI · Getting Started </div><h1 class="ed-doc__title" data-v-e05f9d75> Getting Started as an LFI <span class="ed-doc__read" data-v-e05f9d75>6 min read</span></h1><p class="ed-doc__lede" data-v-e05f9d75> This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating with the UAE Open Finance ecosystem — from first onboarding in the sandbox environment through to live operation with Third-Party Providers (TPPs). </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-e05f9d75> The journey is organised into three phases. Each step builds on the previous one, and each phase should be completed before progressing to the next. </p></div></section><section class="ed-doc__intro" data-v-e05f9d75><div class="ed-doc__inner" data-v-e05f9d75><div class="ed-doc__phase-grid" data-v-e05f9d75><a href="#phase-a" class="ed-doc__phase-card" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-e05f9d75><span class="ed-doc__phase-card-top" data-v-e05f9d75></span><div class="ed-doc__phase-card-meta" data-v-e05f9d75><span class="ed-doc__phase-card-cat" data-v-e05f9d75>Phase A</span></div><h3 class="ed-doc__phase-card-title" data-v-e05f9d75>Pre-production: Build &amp; Integrate</h3><p class="ed-doc__phase-card-desc" data-v-e05f9d75> Register, connect, and develop against the pre-production environment. </p><div class="ed-doc__phase-card-foot" data-v-e05f9d75><span class="ed-doc__phase-card-cta" data-v-e05f9d75>Jump to phase</span><span class="ed-doc__phase-card-arrow" data-v-e05f9d75>↓</span></div></a><a href="#phase-b" class="ed-doc__phase-card" style="${ssrRenderStyle({ "--card-color": "var(--at-gold)" })}" data-v-e05f9d75><span class="ed-doc__phase-card-top" data-v-e05f9d75></span><div class="ed-doc__phase-card-meta" data-v-e05f9d75><span class="ed-doc__phase-card-cat" data-v-e05f9d75>Phase B</span></div><h3 class="ed-doc__phase-card-title" data-v-e05f9d75>Certification</h3><p class="ed-doc__phase-card-desc" data-v-e05f9d75> Evidence that your implementation meets the functional, user experience, performance, and security standards. </p><div class="ed-doc__phase-card-foot" data-v-e05f9d75><span class="ed-doc__phase-card-cta" data-v-e05f9d75>Jump to phase</span><span class="ed-doc__phase-card-arrow" data-v-e05f9d75>↓</span></div></a><a href="#phase-c" class="ed-doc__phase-card" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-e05f9d75><span class="ed-doc__phase-card-top" data-v-e05f9d75></span><div class="ed-doc__phase-card-meta" data-v-e05f9d75><span class="ed-doc__phase-card-cat" data-v-e05f9d75>Phase C</span></div><h3 class="ed-doc__phase-card-title" data-v-e05f9d75>Production: Launch</h3><p class="ed-doc__phase-card-desc" data-v-e05f9d75> Repeat onboarding in production, validate, publish your resources, and prove live with TPPs. </p><div class="ed-doc__phase-card-foot" data-v-e05f9d75><span class="ed-doc__phase-card-cta" data-v-e05f9d75>Jump to phase</span><span class="ed-doc__phase-card-arrow" data-v-e05f9d75>↓</span></div></a></div>`);
  _push(ssrRenderComponent(_component_EdProse, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` A consolidated view of responsibilities across the ecosystem is maintained in the <a href="/tech/lfi-api-hub/" data-v-e05f9d75${_scopeId}>LFI Integration Guide overview</a>. `);
      } else {
        return [
          createTextVNode(" A consolidated view of responsibilities across the ecosystem is maintained in the "),
          createVNode("a", { href: "/tech/lfi-api-hub/" }, "LFI Integration Guide overview"),
          createTextVNode(". ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdNote, {
    type: "tip",
    title: "Phased delivery by capability"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-e05f9d75${_scopeId}> Steps 1, 2, 5 and 6 (Trust Framework and API Hub onboarding) are one-off activities per environment. Steps 3, 4 and 7–9 can be delivered iteratively — capability by capability. A bank may, for example, take <strong data-v-e05f9d75${_scopeId}>Data Sharing</strong> through development, certification and production first, then return to deliver <strong data-v-e05f9d75${_scopeId}>Service Initiation</strong> through the same steps later. All in-scope capabilities MUST be live by the regulatory compliance deadline, but the path to get there can be staged. See the <a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan" data-v-e05f9d75${_scopeId}>Recommended Bank Rollout Plan</a> or the <a href="/tech/lfi-api-hub/getting-started/insurance-rollout-plan" data-v-e05f9d75${_scopeId}>Recommended Insurance Rollout Plan</a> for suggested sequencing. </p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode(" Steps 1, 2, 5 and 6 (Trust Framework and API Hub onboarding) are one-off activities per environment. Steps 3, 4 and 7–9 can be delivered iteratively — capability by capability. A bank may, for example, take "),
            createVNode("strong", null, "Data Sharing"),
            createTextVNode(" through development, certification and production first, then return to deliver "),
            createVNode("strong", null, "Service Initiation"),
            createTextVNode(" through the same steps later. All in-scope capabilities MUST be live by the regulatory compliance deadline, but the path to get there can be staged. See the "),
            createVNode("a", { href: "/tech/lfi-api-hub/getting-started/bank-rollout-plan" }, "Recommended Bank Rollout Plan"),
            createTextVNode(" or the "),
            createVNode("a", { href: "/tech/lfi-api-hub/getting-started/insurance-rollout-plan" }, "Recommended Insurance Rollout Plan"),
            createTextVNode(" for suggested sequencing. ")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-a",
    num: "A",
    color: "var(--at-teal)",
    eyebrow: "Phase A · Pre-production",
    title: "Build & Integrate",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 1. Onboard to the Sandbox Trust Framework</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust Framework is the central directory of ecosystem participants — you must be registered here before you can connect to anything else. `);
            } else {
              return [
                createTextVNode(" Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust Framework is the central directory of ecosystem participants — you must be registered here before you can connect to anything else. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Organisation details and authorised signatories identified.</li><li data-v-e05f9d75${_scopeId2}> Nominated <a href="/tech/lfi-api-hub/trust-framework/organisation-admins" data-v-e05f9d75${_scopeId2}>Organisation Admins</a> and additional users. </li><li data-v-e05f9d75${_scopeId2}> Transport and signing certificates issued by an approved Certificate Authority (see <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-e05f9d75${_scopeId2}>Keys &amp; Certificates</a>). </li><li data-v-e05f9d75${_scopeId2}> Agreement on the <a href="/tech/lfi-api-hub/trust-framework/roles" data-v-e05f9d75${_scopeId2}>Trust Framework Roles</a> your organisation requires. </li>`);
            } else {
              return [
                createVNode("li", null, "Organisation details and authorised signatories identified."),
                createVNode("li", null, [
                  createTextVNode(" Nominated "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/organisation-admins" }, "Organisation Admins"),
                  createTextVNode(" and additional users. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Transport and signing certificates issued by an approved Certificate Authority (see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode("). ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Agreement on the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "Trust Framework Roles"),
                  createTextVNode(" your organisation requires. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Complete the <a href="/tech/lfi-api-hub/trust-framework/onboarding" data-v-e05f9d75${_scopeId2}>Trust Framework onboarding process</a>, including <a href="/tech/lfi-api-hub/trust-framework/user-sign-up" data-v-e05f9d75${_scopeId2}>organisation admin sign-up</a> and <a href="/tech/lfi-api-hub/trust-framework/adding-users" data-v-e05f9d75${_scopeId2}>adding users</a>. </li><li data-v-e05f9d75${_scopeId2}> Upload your <a href="/tech/lfi-api-hub/trust-framework/certificates/client-transport" data-v-e05f9d75${_scopeId2}>Client Transport</a> and <a href="/tech/lfi-api-hub/trust-framework/certificates/client-signing" data-v-e05f9d75${_scopeId2}>Client Signing</a> certificates. </li><li data-v-e05f9d75${_scopeId2}> Register your <a href="/tech/lfi-api-hub/trust-framework/application" data-v-e05f9d75${_scopeId2}>Application</a> and create the <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-e05f9d75${_scopeId2}>C3-hh-cm-client</a> that the API Hub will use to call your services. </li><li data-v-e05f9d75${_scopeId2}> Record organisation <a href="/tech/lfi-api-hub/trust-framework/contacts" data-v-e05f9d75${_scopeId2}>contacts</a>. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Complete the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework onboarding process"),
                  createTextVNode(", including "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/user-sign-up" }, "organisation admin sign-up"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/adding-users" }, "adding users"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Upload your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/client-transport" }, "Client Transport"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/client-signing" }, "Client Signing"),
                  createTextVNode(" certificates. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Register your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application"),
                  createTextVNode(" and create the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "C3-hh-cm-client"),
                  createTextVNode(" that the API Hub will use to call your services. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Record organisation "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "contacts"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Your organisation is visible in the sandbox directory with the correct LFI role.</li><li data-v-e05f9d75${_scopeId2}>Your application is registered and certificates are bound to it.</li><li data-v-e05f9d75${_scopeId2}>At least one Organisation Admin and one technical user can authenticate.</li>`);
            } else {
              return [
                createVNode("li", null, "Your organisation is visible in the sandbox directory with the correct LFI role."),
                createVNode("li", null, "Your application is registered and certificates are bound to it."),
                createVNode("li", null, "At least one Organisation Admin and one technical user can authenticate.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 2. Set Up and Connect to the Pre-Production API Hub</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The UAE Open Finance <a href="/tech/lfi-api-hub/v2.1/api-hub/" data-v-e05f9d75${_scopeId2}>API Hub</a> (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP interoperability on your behalf. `);
            } else {
              return [
                createTextVNode(" The UAE Open Finance "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/" }, "API Hub"),
                createTextVNode(" (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP interoperability on your behalf. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 1 complete.</li><li data-v-e05f9d75${_scopeId2}> Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub endpoints agreed. </li><li data-v-e05f9d75${_scopeId2}>mTLS certificate material in place from Step 1.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 1 complete."),
                createVNode("li", null, " Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub endpoints agreed. "),
                createVNode("li", null, "mTLS certificate material in place from Step 1.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Complete the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" data-v-e05f9d75${_scopeId2}>Prerequisites Questionnaire</a>. </li><li data-v-e05f9d75${_scopeId2}> Set up <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-e05f9d75${_scopeId2}>Connectivity &amp; Certificates</a>. </li><li data-v-e05f9d75${_scopeId2}> Configure <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" data-v-e05f9d75${_scopeId2}>Application Layer Authentication</a>, then implement the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server" data-v-e05f9d75${_scopeId2}>mTLS and JWT Auth layers</a>. </li><li data-v-e05f9d75${_scopeId2}> Apply the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-e05f9d75${_scopeId2}>Environment-Specific configuration</a> for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs). </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Complete the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "Prerequisites Questionnaire"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Set up "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Configure "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                  createTextVNode(", then implement the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server" }, "mTLS and JWT Auth layers"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Apply the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment-Specific configuration"),
                  createTextVNode(" for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs). ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>The Hub can complete an mTLS handshake with your pre-production environment.</li><li data-v-e05f9d75${_scopeId2}> A test request flows end-to-end: Hub → your Ozone Connect endpoint → response back to the Hub. </li><li data-v-e05f9d75${_scopeId2}> Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub. </li>`);
            } else {
              return [
                createVNode("li", null, "The Hub can complete an mTLS handshake with your pre-production environment."),
                createVNode("li", null, " A test request flows end-to-end: Hub → your Ozone Connect endpoint → response back to the Hub. "),
                createVNode("li", null, " Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 3. Develop Your Open Finance APIs</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This is the core build phase. It covers both directions of integration between the LFI and the Hub: `);
            } else {
              return [
                createTextVNode(" This is the core build phase. It covers both directions of integration between the LFI and the Hub: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}><strong data-v-e05f9d75${_scopeId2}>APIs your LFI exposes (Ozone Connect).</strong> Banking data sharing, payment initiation, Confirmation of Payee, and consent events. The Hub calls these on behalf of authorised TPPs. </li><li data-v-e05f9d75${_scopeId2}><strong data-v-e05f9d75${_scopeId2}>APIs your LFI consumes (API Hub).</strong> The <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-e05f9d75${_scopeId2}>Consent Manager</a> to retrieve, inspect, and revoke consents; and the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-e05f9d75${_scopeId2}>Headless Heimdall Auth Server</a> to hand off and return authorization results during the consent journey. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "APIs your LFI exposes (Ozone Connect)."),
                  createTextVNode(" Banking data sharing, payment initiation, Confirmation of Payee, and consent events. The Hub calls these on behalf of authorised TPPs. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "APIs your LFI consumes (API Hub)."),
                  createTextVNode(" The "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                  createTextVNode(" to retrieve, inspect, and revoke consents; and the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall Auth Server"),
                  createTextVNode(" to hand off and return authorization results during the consent journey. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Because API Hub is the single source of truth for consent, your LFI does not maintain independent consent state — it queries the Hub for consent details and writes lifecycle events back to the Hub as the end user journey progresses. `);
            } else {
              return [
                createTextVNode(" Because API Hub is the single source of truth for consent, your LFI does not maintain independent consent state — it queries the Hub for consent details and writes lifecycle events back to the Hub as the end user journey progresses. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 2 complete (end-to-end connectivity verified).</li><li data-v-e05f9d75${_scopeId2}> Product scope agreed (which account types, payment types, and optional APIs are in scope for launch). </li><li data-v-e05f9d75${_scopeId2}> Internal teams aligned on the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-e05f9d75${_scopeId2}>consent journey</a> user experience and the <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/" data-v-e05f9d75${_scopeId2}>Consent Management Interface</a> your LFI will provide to customers. </li>`);
            } else {
              return [
                createVNode("li", null, "Step 2 complete (end-to-end connectivity verified)."),
                createVNode("li", null, " Product scope agreed (which account types, payment types, and optional APIs are in scope for launch). "),
                createVNode("li", null, [
                  createTextVNode(" Internal teams aligned on the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "consent journey"),
                  createTextVNode(" user experience and the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                  createTextVNode(" your LFI will provide to customers. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Implement the LFI-exposed APIs per the OpenAPI specifications.</li><li data-v-e05f9d75${_scopeId2}> Integrate the LFI-consumed APIs: <ul data-v-e05f9d75${_scopeId2}><li data-v-e05f9d75${_scopeId2}> Build the authentication and authorization steps of the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-e05f9d75${_scopeId2}>Consent Journey</a>, including <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" data-v-e05f9d75${_scopeId2}>SCA</a>, returning results to Headless Heimdall. </li><li data-v-e05f9d75${_scopeId2}> Use the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-e05f9d75${_scopeId2}>Consent Manager API</a> to retrieve consent context and expose consents through your <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/" data-v-e05f9d75${_scopeId2}>Consent Management Interface</a>. </li></ul></li>`);
            } else {
              return [
                createVNode("li", null, "Implement the LFI-exposed APIs per the OpenAPI specifications."),
                createVNode("li", null, [
                  createTextVNode(" Integrate the LFI-consumed APIs: "),
                  createVNode("ul", null, [
                    createVNode("li", null, [
                      createTextVNode(" Build the authentication and authorization steps of the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey"),
                      createTextVNode(", including "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" }, "SCA"),
                      createTextVNode(", returning results to Headless Heimdall. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Use the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager API"),
                      createTextVNode(" to retrieve consent context and expose consents through your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                      createTextVNode(". ")
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
              _push3(` Because Step 3 is the largest body of work and has strong sequencing dependencies, we recommend following the <a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan" data-v-e05f9d75${_scopeId2}>Recommended Bank Rollout Plan</a> (for LFIs with a banking scope) or the <a href="/tech/lfi-api-hub/getting-started/insurance-rollout-plan" data-v-e05f9d75${_scopeId2}>Recommended Insurance Rollout Plan</a> (for LFIs with an insurance scope), which walk through the order in which to deliver these capabilities and how to stage internal delivery against certification milestones. `);
            } else {
              return [
                createTextVNode(" Because Step 3 is the largest body of work and has strong sequencing dependencies, we recommend following the "),
                createVNode("a", { href: "/tech/lfi-api-hub/getting-started/bank-rollout-plan" }, "Recommended Bank Rollout Plan"),
                createTextVNode(" (for LFIs with a banking scope) or the "),
                createVNode("a", { href: "/tech/lfi-api-hub/getting-started/insurance-rollout-plan" }, "Recommended Insurance Rollout Plan"),
                createTextVNode(" (for LFIs with an insurance scope), which walk through the order in which to deliver these capabilities and how to stage internal delivery against certification milestones. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when (per capability)</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> For the capability in delivery, all endpoints respond in line with their OpenAPI specifications. </li><li data-v-e05f9d75${_scopeId2}> The Hub can drive a full end user journey for that capability: PAR → authorization at the LFI → token issuance → data or payment call → consent visible in the Consent Management Interface. </li><li data-v-e05f9d75${_scopeId2}> Consent lifecycle events (authorised, revoked, expired) flow cleanly between Hub and LFI in both directions for that capability. </li>`);
            } else {
              return [
                createVNode("li", null, " For the capability in delivery, all endpoints respond in line with their OpenAPI specifications. "),
                createVNode("li", null, " The Hub can drive a full end user journey for that capability: PAR → authorization at the LFI → token issuance → data or payment call → consent visible in the Consent Management Interface. "),
                createVNode("li", null, " Consent lifecycle events (authorised, revoked, expired) flow cleanly between Hub and LFI in both directions for that capability. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the “Done when” criteria are satisfied for a capability, it can proceed into Phase B independently of other capabilities still in development. `);
            } else {
              return [
                createTextVNode(" Once the “Done when” criteria are satisfied for a capability, it can proceed into Phase B independently of other capabilities still in development. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Step 1. Onboard to the Sandbox Trust Framework"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust Framework is the central directory of ecosystem participants — you must be registered here before you can connect to anything else. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Organisation details and authorised signatories identified."),
              createVNode("li", null, [
                createTextVNode(" Nominated "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/organisation-admins" }, "Organisation Admins"),
                createTextVNode(" and additional users. ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Transport and signing certificates issued by an approved Certificate Authority (see "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                createTextVNode("). ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Agreement on the "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "Trust Framework Roles"),
                createTextVNode(" your organisation requires. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Complete the "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework onboarding process"),
                createTextVNode(", including "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/user-sign-up" }, "organisation admin sign-up"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/adding-users" }, "adding users"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Upload your "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/client-transport" }, "Client Transport"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/client-signing" }, "Client Signing"),
                createTextVNode(" certificates. ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Register your "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application"),
                createTextVNode(" and create the "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "C3-hh-cm-client"),
                createTextVNode(" that the API Hub will use to call your services. ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Record organisation "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "contacts"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Your organisation is visible in the sandbox directory with the correct LFI role."),
              createVNode("li", null, "Your application is registered and certificates are bound to it."),
              createVNode("li", null, "At least one Organisation Admin and one technical user can authenticate.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 2. Set Up and Connect to the Pre-Production API Hub"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The UAE Open Finance "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/" }, "API Hub"),
              createTextVNode(" (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP interoperability on your behalf. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 1 complete."),
              createVNode("li", null, " Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub endpoints agreed. "),
              createVNode("li", null, "mTLS certificate material in place from Step 1.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Complete the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "Prerequisites Questionnaire"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Set up "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Configure "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(", then implement the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server" }, "mTLS and JWT Auth layers"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Apply the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment-Specific configuration"),
                createTextVNode(" for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs). ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "The Hub can complete an mTLS handshake with your pre-production environment."),
              createVNode("li", null, " A test request flows end-to-end: Hub → your Ozone Connect endpoint → response back to the Hub. "),
              createVNode("li", null, " Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 3. Develop Your Open Finance APIs"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This is the core build phase. It covers both directions of integration between the LFI and the Hub: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "APIs your LFI exposes (Ozone Connect)."),
                createTextVNode(" Banking data sharing, payment initiation, Confirmation of Payee, and consent events. The Hub calls these on behalf of authorised TPPs. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "APIs your LFI consumes (API Hub)."),
                createTextVNode(" The "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                createTextVNode(" to retrieve, inspect, and revoke consents; and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall Auth Server"),
                createTextVNode(" to hand off and return authorization results during the consent journey. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Because API Hub is the single source of truth for consent, your LFI does not maintain independent consent state — it queries the Hub for consent details and writes lifecycle events back to the Hub as the end user journey progresses. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 2 complete (end-to-end connectivity verified)."),
              createVNode("li", null, " Product scope agreed (which account types, payment types, and optional APIs are in scope for launch). "),
              createVNode("li", null, [
                createTextVNode(" Internal teams aligned on the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "consent journey"),
                createTextVNode(" user experience and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" your LFI will provide to customers. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Implement the LFI-exposed APIs per the OpenAPI specifications."),
              createVNode("li", null, [
                createTextVNode(" Integrate the LFI-consumed APIs: "),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createTextVNode(" Build the authentication and authorization steps of the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey"),
                    createTextVNode(", including "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca" }, "SCA"),
                    createTextVNode(", returning results to Headless Heimdall. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" Use the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager API"),
                    createTextVNode(" to retrieve consent context and expose consents through your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/" }, "Consent Management Interface"),
                    createTextVNode(". ")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Because Step 3 is the largest body of work and has strong sequencing dependencies, we recommend following the "),
              createVNode("a", { href: "/tech/lfi-api-hub/getting-started/bank-rollout-plan" }, "Recommended Bank Rollout Plan"),
              createTextVNode(" (for LFIs with a banking scope) or the "),
              createVNode("a", { href: "/tech/lfi-api-hub/getting-started/insurance-rollout-plan" }, "Recommended Insurance Rollout Plan"),
              createTextVNode(" (for LFIs with an insurance scope), which walk through the order in which to deliver these capabilities and how to stage internal delivery against certification milestones. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when (per capability)"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, " For the capability in delivery, all endpoints respond in line with their OpenAPI specifications. "),
              createVNode("li", null, " The Hub can drive a full end user journey for that capability: PAR → authorization at the LFI → token issuance → data or payment call → consent visible in the Consent Management Interface. "),
              createVNode("li", null, " Consent lifecycle events (authorised, revoked, expired) flow cleanly between Hub and LFI in both directions for that capability. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once the “Done when” criteria are satisfied for a capability, it can proceed into Phase B independently of other capabilities still in development. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-b",
    num: "B",
    color: "var(--at-gold)",
    eyebrow: "Phase B · Certification",
    title: "Test and Certify Your Open Finance Capabilities",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 4. Test and Certify Your Open Finance Capabilities</h3>`);
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "To be added"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-e05f9d75${_scopeId2}>Detailed certification content is being finalised and will appear here.</p>`);
            } else {
              return [
                createVNode("p", null, "Detailed certification content is being finalised and will appear here.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Step 4. Test and Certify Your Open Finance Capabilities"),
          createVNode(_component_EdNote, {
            type: "info",
            title: "To be added"
          }, {
            default: withCtx(() => [
              createVNode("p", null, "Detailed certification content is being finalised and will appear here.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "phase-c",
    num: "C",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Phase C · Production",
    title: "Launch",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 5. Onboard to the Production Trust Framework</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Repeat the Trust Framework registration in the production environment. Production is a separate Trust Framework instance with its own directory, certificates, and application registrations — sandbox artefacts are not reused. `);
            } else {
              return [
                createTextVNode(" Repeat the Trust Framework registration in the production environment. Production is a separate Trust Framework instance with its own directory, certificates, and application registrations — sandbox artefacts are not reused. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 4 complete; certification evidence accepted.</li><li data-v-e05f9d75${_scopeId2}>Production-grade transport and signing certificates issued.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 4 complete; certification evidence accepted."),
                createVNode("li", null, "Production-grade transport and signing certificates issued.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Re-run the <a href="/tech/lfi-api-hub/trust-framework/onboarding" data-v-e05f9d75${_scopeId2}>Trust Framework onboarding</a> process against production. </li><li data-v-e05f9d75${_scopeId2}> Upload production <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-e05f9d75${_scopeId2}>certificates</a> and register the production <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-e05f9d75${_scopeId2}>C3-hh-cm-client application</a>. </li><li data-v-e05f9d75${_scopeId2}> Confirm production <a href="/tech/lfi-api-hub/trust-framework/roles" data-v-e05f9d75${_scopeId2}>roles</a> and <a href="/tech/lfi-api-hub/trust-framework/contacts" data-v-e05f9d75${_scopeId2}>contacts</a>. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Re-run the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework onboarding"),
                  createTextVNode(" process against production. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Upload production "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "certificates"),
                  createTextVNode(" and register the production "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "C3-hh-cm-client application"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Confirm production "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "roles"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "contacts"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Your organisation is listed in the production Trust Framework directory with the correct role. </li><li data-v-e05f9d75${_scopeId2}>Production application and certificates are registered.</li>`);
            } else {
              return [
                createVNode("li", null, " Your organisation is listed in the production Trust Framework directory with the correct role. "),
                createVNode("li", null, "Production application and certificates are registered.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 6. Set Up and Connect to the Production API Hub</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Repeat the API Hub connectivity setup in production.`);
            } else {
              return [
                createTextVNode("Repeat the API Hub connectivity setup in production.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 5 complete.</li><li data-v-e05f9d75${_scopeId2}>Production environment(s) built and available.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 5 complete."),
                createVNode("li", null, "Production environment(s) built and available.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Configure production connectivity and mTLS with the production Hub — see <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-e05f9d75${_scopeId2}>Connectivity &amp; Certificates</a> and the production-specific entries in <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-e05f9d75${_scopeId2}>Environment-Specific configuration</a>. </li><li data-v-e05f9d75${_scopeId2}> Re-run the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" data-v-e05f9d75${_scopeId2}>Application Layer Authentication</a> setup against production keys. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Configure production connectivity and mTLS with the production Hub — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                  createTextVNode(" and the production-specific entries in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment-Specific configuration"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Re-run the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                  createTextVNode(" setup against production keys. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> An mTLS handshake and authenticated test request succeed between the production Hub and your production environment. </li><li data-v-e05f9d75${_scopeId2}> No Pre-production credentials or endpoints remain referenced in production configuration. </li>`);
            } else {
              return [
                createVNode("li", null, " An mTLS handshake and authenticated test request succeed between the production Hub and your production environment. "),
                createVNode("li", null, " No Pre-production credentials or endpoints remain referenced in production configuration. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 7. Validate Your APIs in Production</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` A pre-live validation pass against the production environment using controlled, internal test accounts. This is the last check before real customer traffic. `);
            } else {
              return [
                createTextVNode(" A pre-live validation pass against the production environment using controlled, internal test accounts. This is the last check before real customer traffic. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 6 complete.</li><li data-v-e05f9d75${_scopeId2}>Controlled test end users (bank-staff accounts) available in production.</li><li data-v-e05f9d75${_scopeId2}>Error handling, monitoring, and audit logging enabled.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 6 complete."),
                createVNode("li", null, "Controlled test end users (bank-staff accounts) available in production."),
                createVNode("li", null, "Error handling, monitoring, and audit logging enabled.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Execute the <a href="/tech/lfi-api-hub/production/testing-certification/self-testing" data-v-e05f9d75${_scopeId2}>attestation and self-testing</a> flows against production. </li><li data-v-e05f9d75${_scopeId2}>Walk through full consent, data sharing, and payment journeys end-to-end.</li><li data-v-e05f9d75${_scopeId2}>Verify that error mapping, logging, and observability behave as in Pre-production.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Execute the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/self-testing" }, "attestation and self-testing"),
                  createTextVNode(" flows against production. ")
                ]),
                createVNode("li", null, "Walk through full consent, data sharing, and payment journeys end-to-end."),
                createVNode("li", null, "Verify that error mapping, logging, and observability behave as in Pre-production.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>All critical flows succeed in production with controlled accounts.</li><li data-v-e05f9d75${_scopeId2}>Monitoring and alerting are confirmed live.</li><li data-v-e05f9d75${_scopeId2}>No real customer traffic has been processed.</li>`);
            } else {
              return [
                createVNode("li", null, "All critical flows succeed in production with controlled accounts."),
                createVNode("li", null, "Monitoring and alerting are confirmed live."),
                createVNode("li", null, "No real customer traffic has been processed.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 8. Publish Your Open Finance Resources to the Ecosystem</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Make your certified production APIs discoverable to TPPs by publishing them in the Trust Framework. `);
            } else {
              return [
                createTextVNode(" Make your certified production APIs discoverable to TPPs by publishing them in the Trust Framework. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 7 complete.</li><li data-v-e05f9d75${_scopeId2}>Production API resource URLs and metadata finalised.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 7 complete."),
                createVNode("li", null, "Production API resource URLs and metadata finalised.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> In the production Trust Framework, create your <a href="/tech/lfi-api-hub/trust-framework/servers/creating" data-v-e05f9d75${_scopeId2}>authorisation server</a> and register your <a href="/tech/lfi-api-hub/trust-framework/servers/api/" data-v-e05f9d75${_scopeId2}>API resources</a> with the correct metadata (API family, version, endpoints). </li><li data-v-e05f9d75${_scopeId2}>Confirm that directory metadata matches the endpoints actually deployed.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" In the production Trust Framework, create your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/creating" }, "authorisation server"),
                  createTextVNode(" and register your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API resources"),
                  createTextVNode(" with the correct metadata (API family, version, endpoints). ")
                ]),
                createVNode("li", null, "Confirm that directory metadata matches the endpoints actually deployed.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> TPPs can discover your authorisation server and API resources through the Trust Framework directory. </li><li data-v-e05f9d75${_scopeId2}> Resource metadata (family, version, URLs) is correct and consistent with deployed infrastructure. </li>`);
            } else {
              return [
                createVNode("li", null, " TPPs can discover your authorisation server and API resources through the Trust Framework directory. "),
                createVNode("li", null, " Resource metadata (family, version, URLs) is correct and consistent with deployed infrastructure. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-e05f9d75${_scopeId}>Step 9. Live Proving with TPPs</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Controlled, real-customer validation with a small number of TPPs before opening to the wider ecosystem. `);
            } else {
              return [
                createTextVNode(" Controlled, real-customer validation with a small number of TPPs before opening to the wider ecosystem. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Prerequisites</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Step 8 complete.</li><li data-v-e05f9d75${_scopeId2}>One or more TPP partners identified for buddying.</li><li data-v-e05f9d75${_scopeId2}>Incident response and on-call processes in place.</li>`);
            } else {
              return [
                createVNode("li", null, "Step 8 complete."),
                createVNode("li", null, "One or more TPP partners identified for buddying."),
                createVNode("li", null, "Incident response and on-call processes in place.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>What to do</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}> Run <a href="/tech/lfi-api-hub/production/testing-certification/tpp-buddying" data-v-e05f9d75${_scopeId2}>TPP Buddying</a> sessions with each partner. </li><li data-v-e05f9d75${_scopeId2}>Exercise the full end-to-end flow with real end users.</li><li data-v-e05f9d75${_scopeId2}>Triage and resolve any issues surfaced during proving.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Run "),
                  createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/tpp-buddying" }, "TPP Buddying"),
                  createTextVNode(" sessions with each partner. ")
                ]),
                createVNode("li", null, "Exercise the full end-to-end flow with real end users."),
                createVNode("li", null, "Triage and resolve any issues surfaced during proving.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-e05f9d75${_scopeId}>Done when</h4>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e05f9d75${_scopeId2}>Each buddying TPP reports successful end-to-end flows with real customers.</li><li data-v-e05f9d75${_scopeId2}>Any defects raised during proving are resolved or formally accepted.</li><li data-v-e05f9d75${_scopeId2}>You are ready to open to general TPP traffic.</li>`);
            } else {
              return [
                createVNode("li", null, "Each buddying TPP reports successful end-to-end flows with real customers."),
                createVNode("li", null, "Any defects raised during proving are resolved or formally accepted."),
                createVNode("li", null, "You are ready to open to general TPP traffic.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Step 5. Onboard to the Production Trust Framework"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Repeat the Trust Framework registration in the production environment. Production is a separate Trust Framework instance with its own directory, certificates, and application registrations — sandbox artefacts are not reused. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 4 complete; certification evidence accepted."),
              createVNode("li", null, "Production-grade transport and signing certificates issued.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Re-run the "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework onboarding"),
                createTextVNode(" process against production. ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Upload production "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "certificates"),
                createTextVNode(" and register the production "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "C3-hh-cm-client application"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Confirm production "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/roles" }, "roles"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "contacts"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, " Your organisation is listed in the production Trust Framework directory with the correct role. "),
              createVNode("li", null, "Production application and certificates are registered.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 6. Set Up and Connect to the Production API Hub"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Repeat the API Hub connectivity setup in production.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 5 complete."),
              createVNode("li", null, "Production environment(s) built and available.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Configure production connectivity and mTLS with the production Hub — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                createTextVNode(" and the production-specific entries in "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment-Specific configuration"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createTextVNode(" Re-run the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(" setup against production keys. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, " An mTLS handshake and authenticated test request succeed between the production Hub and your production environment. "),
              createVNode("li", null, " No Pre-production credentials or endpoints remain referenced in production configuration. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 7. Validate Your APIs in Production"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" A pre-live validation pass against the production environment using controlled, internal test accounts. This is the last check before real customer traffic. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 6 complete."),
              createVNode("li", null, "Controlled test end users (bank-staff accounts) available in production."),
              createVNode("li", null, "Error handling, monitoring, and audit logging enabled.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Execute the "),
                createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/self-testing" }, "attestation and self-testing"),
                createTextVNode(" flows against production. ")
              ]),
              createVNode("li", null, "Walk through full consent, data sharing, and payment journeys end-to-end."),
              createVNode("li", null, "Verify that error mapping, logging, and observability behave as in Pre-production.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "All critical flows succeed in production with controlled accounts."),
              createVNode("li", null, "Monitoring and alerting are confirmed live."),
              createVNode("li", null, "No real customer traffic has been processed.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 8. Publish Your Open Finance Resources to the Ecosystem"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Make your certified production APIs discoverable to TPPs by publishing them in the Trust Framework. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 7 complete."),
              createVNode("li", null, "Production API resource URLs and metadata finalised.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" In the production Trust Framework, create your "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/creating" }, "authorisation server"),
                createTextVNode(" and register your "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API resources"),
                createTextVNode(" with the correct metadata (API family, version, endpoints). ")
              ]),
              createVNode("li", null, "Confirm that directory metadata matches the endpoints actually deployed.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, " TPPs can discover your authorisation server and API resources through the Trust Framework directory. "),
              createVNode("li", null, " Resource metadata (family, version, URLs) is correct and consistent with deployed infrastructure. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Step 9. Live Proving with TPPs"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Controlled, real-customer validation with a small number of TPPs before opening to the wider ecosystem. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Prerequisites"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Step 8 complete."),
              createVNode("li", null, "One or more TPP partners identified for buddying."),
              createVNode("li", null, "Incident response and on-call processes in place.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "What to do"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Run "),
                createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/tpp-buddying" }, "TPP Buddying"),
                createTextVNode(" sessions with each partner. ")
              ]),
              createVNode("li", null, "Exercise the full end-to-end flow with real end users."),
              createVNode("li", null, "Triage and resolve any issues surfaced during proving.")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Done when"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Each buddying TPP reports successful end-to-end flows with real customers."),
              createVNode("li", null, "Any defects raised during proving are resolved or formally accepted."),
              createVNode("li", null, "You are ready to open to general TPP traffic.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/getting-started/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e05f9d75"]]);
export {
  index as default
};
