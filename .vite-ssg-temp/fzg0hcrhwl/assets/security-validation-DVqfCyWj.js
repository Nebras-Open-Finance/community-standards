import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0 } from "./CertificationTicketBanner-DF3U_2rx.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CertificationTicketBanner = __unplugin_components_0;
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-173c1f30><section class="ed-doc__hero" data-v-173c1f30><div class="ed-doc__inner" data-v-173c1f30><div class="ed-doc__eyebrow" data-v-173c1f30><span class="ed-doc__eyebrow-dash" data-v-173c1f30></span> Testing &amp; Certification · Security </div><h1 class="ed-doc__title" data-v-173c1f30> Security Validation <span class="ed-doc__read" data-v-173c1f30>2 min read</span></h1><p class="ed-doc__lede" data-v-173c1f30> Before a TPP is approved for production access, it must submit the results of a penetration test to Nebras. This requirement provides independent assurance that the TPP&#39;s application can withstand real-world attack scenarios and that user data and financial transactions are adequately protected. </p></div></section><div class="ed-doc__intro" data-v-173c1f30><div class="ed-doc__inner" data-v-173c1f30>`);
  _push(ssrRenderComponent(_component_CertificationTicketBanner, { "cert-type": "Penetration Test Results" }, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "requirements",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Penetration Test Requirements",
    title: "What the test must cover",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-173c1f30${_scopeId}>Scope</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The penetration test must cover the <strong data-v-173c1f30${_scopeId2}>full extent of the TPP&#39;s services that rely on the Open Finance implementation</strong> — including all integration points, authentication flows, consent handling, data access, and payment initiation paths. Testing a subset of the application is not sufficient. `);
            } else {
              return [
                createTextVNode(" The penetration test must cover the "),
                createVNode("strong", null, "full extent of the TPP's services that rely on the Open Finance implementation"),
                createTextVNode(" — including all integration points, authentication flows, consent handling, data access, and payment initiation paths. Testing a subset of the application is not sufficient. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-173c1f30${_scopeId}>Independence</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The test must be carried out by an <strong data-v-173c1f30${_scopeId2}>independent third party</strong>. Internal security assessments or self-attested reviews do not satisfy this requirement. The testing organisation must have no material conflict of interest with the TPP. `);
            } else {
              return [
                createTextVNode(" The test must be carried out by an "),
                createVNode("strong", null, "independent third party"),
                createTextVNode(". Internal security assessments or self-attested reviews do not satisfy this requirement. The testing organisation must have no material conflict of interest with the TPP. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-173c1f30${_scopeId}>Application State</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The test must be conducted against the application in a <strong data-v-173c1f30${_scopeId2}>production-like state</strong> — meaning the codebase, configuration, and infrastructure assessed must closely reflect what will be deployed to production. The test should not be run against an application that is mid-development or expected to undergo significant change before go-live. `);
            } else {
              return [
                createTextVNode(" The test must be conducted against the application in a "),
                createVNode("strong", null, "production-like state"),
                createTextVNode(" — meaning the codebase, configuration, and infrastructure assessed must closely reflect what will be deployed to production. The test should not be run against an application that is mid-development or expected to undergo significant change before go-live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Non-production environments are acceptable"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-173c1f30${_scopeId2}> The penetration test does not need to be run against the live production environment. A staging or pre-production environment that mirrors production in architecture, configuration, and behaviour is acceptable, provided it is representative of what will go live. </p>`);
            } else {
              return [
                createVNode("p", null, " The penetration test does not need to be run against the live production environment. A staging or pre-production environment that mirrors production in architecture, configuration, and behaviour is acceptable, provided it is representative of what will go live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-173c1f30${_scopeId}>Security Resilience</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The test report must demonstrate <strong data-v-173c1f30${_scopeId2}>significant security resilience</strong> across the areas relevant to an Open Finance TPP integration, including but not limited to: `);
            } else {
              return [
                createTextVNode(" The test report must demonstrate "),
                createVNode("strong", null, "significant security resilience"),
                createTextVNode(" across the areas relevant to an Open Finance TPP integration, including but not limited to: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-173c1f30${_scopeId2}>Authentication and session management (OAuth 2.0, PKCE, token handling)</li><li data-v-173c1f30${_scopeId2}>mTLS certificate usage and private key protection</li><li data-v-173c1f30${_scopeId2}>Consent data handling and access control enforcement</li><li data-v-173c1f30${_scopeId2}>Input validation and injection attack resistance</li><li data-v-173c1f30${_scopeId2}>Sensitive data storage and transmission</li><li data-v-173c1f30${_scopeId2}>API rate limiting and abuse prevention</li><li data-v-173c1f30${_scopeId2}>Third-party dependency and supply chain risk</li>`);
            } else {
              return [
                createVNode("li", null, "Authentication and session management (OAuth 2.0, PKCE, token handling)"),
                createVNode("li", null, "mTLS certificate usage and private key protection"),
                createVNode("li", null, "Consent data handling and access control enforcement"),
                createVNode("li", null, "Input validation and injection attack resistance"),
                createVNode("li", null, "Sensitive data storage and transmission"),
                createVNode("li", null, "API rate limiting and abuse prevention"),
                createVNode("li", null, "Third-party dependency and supply chain risk")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Scope"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The penetration test must cover the "),
              createVNode("strong", null, "full extent of the TPP's services that rely on the Open Finance implementation"),
              createTextVNode(" — including all integration points, authentication flows, consent handling, data access, and payment initiation paths. Testing a subset of the application is not sufficient. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Independence"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The test must be carried out by an "),
              createVNode("strong", null, "independent third party"),
              createTextVNode(". Internal security assessments or self-attested reviews do not satisfy this requirement. The testing organisation must have no material conflict of interest with the TPP. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Application State"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The test must be conducted against the application in a "),
              createVNode("strong", null, "production-like state"),
              createTextVNode(" — meaning the codebase, configuration, and infrastructure assessed must closely reflect what will be deployed to production. The test should not be run against an application that is mid-development or expected to undergo significant change before go-live. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Non-production environments are acceptable"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " The penetration test does not need to be run against the live production environment. A staging or pre-production environment that mirrors production in architecture, configuration, and behaviour is acceptable, provided it is representative of what will go live. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Security Resilience"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The test report must demonstrate "),
              createVNode("strong", null, "significant security resilience"),
              createTextVNode(" across the areas relevant to an Open Finance TPP integration, including but not limited to: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Authentication and session management (OAuth 2.0, PKCE, token handling)"),
              createVNode("li", null, "mTLS certificate usage and private key protection"),
              createVNode("li", null, "Consent data handling and access control enforcement"),
              createVNode("li", null, "Input validation and injection attack resistance"),
              createVNode("li", null, "Sensitive data storage and transmission"),
              createVNode("li", null, "API rate limiting and abuse prevention"),
              createVNode("li", null, "Third-party dependency and supply chain risk")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "submission",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Submission",
    title: "How Nebras reviews your report",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The penetration test report must be submitted to Nebras as part of the production approval process. Nebras reserves the right to request clarification, require remediation of identified findings, or request a re-test before granting production access. `);
            } else {
              return [
                createTextVNode(" The penetration test report must be submitted to Nebras as part of the production approval process. Nebras reserves the right to request clarification, require remediation of identified findings, or request a re-test before granting production access. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Remediation before production"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-173c1f30${_scopeId2}> Any <strong data-v-173c1f30${_scopeId2}>critical</strong> or <strong data-v-173c1f30${_scopeId2}>high</strong> severity findings identified in the penetration test must be remediated and evidenced before production access will be granted. Medium and lower severity findings must be acknowledged with a documented remediation plan. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Any "),
                  createVNode("strong", null, "critical"),
                  createTextVNode(" or "),
                  createVNode("strong", null, "high"),
                  createTextVNode(" severity findings identified in the penetration test must be remediated and evidenced before production access will be granted. Medium and lower severity findings must be acknowledged with a documented remediation plan. ")
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
              createTextVNode(" The penetration test report must be submitted to Nebras as part of the production approval process. Nebras reserves the right to request clarification, require remediation of identified findings, or request a re-test before granting production access. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Remediation before production"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Any "),
                createVNode("strong", null, "critical"),
                createTextVNode(" or "),
                createVNode("strong", null, "high"),
                createTextVNode(" severity findings identified in the penetration test must be remediated and evidenced before production access will be granted. Medium and lower severity findings must be acknowledged with a documented remediation plan. ")
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
    id: "ongoing",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Ongoing Security Responsibility",
    title: "Security after go-live",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The penetration test is a point-in-time assessment required before go-live — it is not a substitute for a continuous security posture. Once live in production, TPPs take full responsibility for the ongoing security of their platform. `);
            } else {
              return [
                createTextVNode(" The penetration test is a point-in-time assessment required before go-live — it is not a substitute for a continuous security posture. Once live in production, TPPs take full responsibility for the ongoing security of their platform. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This includes, but is not limited to, keeping dependencies patched, monitoring for vulnerabilities, responding promptly to security incidents, and repeating penetration testing whenever significant changes are made to the application or its Open Finance integration. A material change to the platform — such as a new payment flow, a new data access surface, or a change in infrastructure — should trigger a targeted security review. `);
            } else {
              return [
                createTextVNode(" This includes, but is not limited to, keeping dependencies patched, monitoring for vulnerabilities, responding promptly to security incidents, and repeating penetration testing whenever significant changes are made to the application or its Open Finance integration. A material change to the platform — such as a new payment flow, a new data access surface, or a change in infrastructure — should trigger a targeted security review. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Nebras may request updated evidence of security assurance at any point after go-live. `);
            } else {
              return [
                createTextVNode(" Nebras may request updated evidence of security assurance at any point after go-live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The penetration test is a point-in-time assessment required before go-live — it is not a substitute for a continuous security posture. Once live in production, TPPs take full responsibility for the ongoing security of their platform. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This includes, but is not limited to, keeping dependencies patched, monitoring for vulnerabilities, responding promptly to security incidents, and repeating penetration testing whenever significant changes are made to the application or its Open Finance integration. A material change to the platform — such as a new payment flow, a new data access surface, or a change in infrastructure — should trigger a targeted security review. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Nebras may request updated evidence of security assurance at any point after go-live. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/security-validation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const securityValidation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-173c1f30"]]);
export {
  securityValidation as default
};
