import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0 } from "./CertificationTicketBanner-DF3U_2rx.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cef9d319><section class="ed-doc__hero" data-v-cef9d319><div class="ed-doc__inner" data-v-cef9d319><div class="ed-doc__eyebrow" data-v-cef9d319><span class="ed-doc__eyebrow-dash" data-v-cef9d319></span> Production · Testing &amp; Certification </div><h1 class="ed-doc__title" data-v-cef9d319> Testing &amp; Certification Overview <span class="ed-doc__read" data-v-cef9d319>3 min read</span></h1><p class="ed-doc__lede" data-v-cef9d319> Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI) in production, it must satisfy two independent sets of requirements: regulatory licensing and Nebras technical certification. </p></div></section><div class="ed-doc__intro" data-v-cef9d319><div class="ed-doc__inner" data-v-cef9d319>`);
  _push(ssrRenderComponent(_component_CertificationTicketBanner, null, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "regulatory",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Regulatory Licensing",
    title: "A valid CBUAE licence is required before production access",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` TPPs must hold a valid licence issued by the <strong data-v-cef9d319${_scopeId2}>Central Bank of the UAE (CBUAE)</strong> before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model. `);
            } else {
              return [
                createTextVNode(" TPPs must hold a valid licence issued by the "),
                createVNode("strong", null, "Central Bank of the UAE (CBUAE)"),
                createTextVNode(" before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Licence required for production access"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-cef9d319${_scopeId2}> Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live. </p>`);
            } else {
              return [
                createVNode("p", null, " Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" TPPs must hold a valid licence issued by the "),
              createVNode("strong", null, "Central Bank of the UAE (CBUAE)"),
              createTextVNode(" before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Licence required for production access"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "nebras-certification",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Nebras Certification",
    title: "Four certification areas, all mandatory before go-live",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose. Each area maps to a <strong data-v-cef9d319${_scopeId2}>Certification Type</strong> in the Service Desk evidence ticket. `);
            } else {
              return [
                createTextVNode(" Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose. Each area maps to a "),
                createVNode("strong", null, "Certification Type"),
                createTextVNode(" in the Service Desk evidence ticket. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="ed-doc__contents-grid" data-v-cef9d319${_scopeId}><a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-cef9d319${_scopeId}><span class="ed-link-card__top" data-v-cef9d319${_scopeId}></span><div class="ed-link-card__meta" data-v-cef9d319${_scopeId}><span class="ed-link-card__cat" data-v-cef9d319${_scopeId}>01 · Evidence</span></div><h3 class="ed-link-card__title" data-v-cef9d319${_scopeId}>Functional Evidence</h3><p class="ed-link-card__desc" data-v-cef9d319${_scopeId}> Documented proof that your proposition calls only the APIs it needs, requests only the minimum permissions required, and handles consent states correctly. </p><div class="ed-link-card__cert" data-v-cef9d319${_scopeId}><span class="ed-link-card__cert-label" data-v-cef9d319${_scopeId}>Certification Type</span><span class="ed-link-card__cert-value" data-v-cef9d319${_scopeId}>TPP Functional Certification Evidence</span></div><div class="ed-link-card__foot" data-v-cef9d319${_scopeId}><span class="ed-link-card__cta" data-v-cef9d319${_scopeId}>Start certification</span><span class="ed-link-card__arrow" data-v-cef9d319${_scopeId}>↗</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/user-experience" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-cef9d319${_scopeId}><span class="ed-link-card__top" data-v-cef9d319${_scopeId}></span><div class="ed-link-card__meta" data-v-cef9d319${_scopeId}><span class="ed-link-card__cat" data-v-cef9d319${_scopeId}>02 · Evidence</span></div><h3 class="ed-link-card__title" data-v-cef9d319${_scopeId}>User Experience Evidence</h3><p class="ed-link-card__desc" data-v-cef9d319${_scopeId}> Evidence that your consent and authorisation flows meet Nebras user experience requirements. </p><div class="ed-link-card__cert" data-v-cef9d319${_scopeId}><span class="ed-link-card__cert-label" data-v-cef9d319${_scopeId}>Certification Type</span><span class="ed-link-card__cert-value" data-v-cef9d319${_scopeId}>TPP CX Certification Evidence</span></div><div class="ed-link-card__foot" data-v-cef9d319${_scopeId}><span class="ed-link-card__cta" data-v-cef9d319${_scopeId}>Open requirements</span><span class="ed-link-card__arrow" data-v-cef9d319${_scopeId}>↗</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/fapi" style="${ssrRenderStyle({ "--card-color": "var(--at-blue, #2c5fb3)" })}" data-v-cef9d319${_scopeId}><span class="ed-link-card__top" data-v-cef9d319${_scopeId}></span><div class="ed-link-card__meta" data-v-cef9d319${_scopeId}><span class="ed-link-card__cat" data-v-cef9d319${_scopeId}>03 · Conformance</span></div><h3 class="ed-link-card__title" data-v-cef9d319${_scopeId}>FAPI Conformance</h3><p class="ed-link-card__desc" data-v-cef9d319${_scopeId}> Results from running the OpenID Foundation FAPI conformance test suite against your client configuration. </p><div class="ed-link-card__cert" data-v-cef9d319${_scopeId}><span class="ed-link-card__cert-label" data-v-cef9d319${_scopeId}>Certification Type</span><span class="ed-link-card__cert-value" data-v-cef9d319${_scopeId}>TPP FAPI Certification Evidence</span></div><div class="ed-link-card__foot" data-v-cef9d319${_scopeId}><span class="ed-link-card__cta" data-v-cef9d319${_scopeId}>Open guidance</span><span class="ed-link-card__arrow" data-v-cef9d319${_scopeId}>↗</span></div></a><a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/security-validation" style="${ssrRenderStyle({ "--card-color": "var(--at-gold)" })}" data-v-cef9d319${_scopeId}><span class="ed-link-card__top" data-v-cef9d319${_scopeId}></span><div class="ed-link-card__meta" data-v-cef9d319${_scopeId}><span class="ed-link-card__cat" data-v-cef9d319${_scopeId}>04 · Validation</span></div><h3 class="ed-link-card__title" data-v-cef9d319${_scopeId}>Security Validation</h3><p class="ed-link-card__desc" data-v-cef9d319${_scopeId}> Confirmation that your key management, certificate handling, and data security practices meet Nebras policy requirements. </p><div class="ed-link-card__cert" data-v-cef9d319${_scopeId}><span class="ed-link-card__cert-label" data-v-cef9d319${_scopeId}>Certification Type</span><span class="ed-link-card__cert-value" data-v-cef9d319${_scopeId}>Penetration Test Results</span></div><div class="ed-link-card__foot" data-v-cef9d319${_scopeId}><span class="ed-link-card__cta" data-v-cef9d319${_scopeId}>Open requirements</span><span class="ed-link-card__arrow" data-v-cef9d319${_scopeId}>↗</span></div></a></div>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All four areas must be satisfied before Nebras will grant production access to a live LFI environment. `);
            } else {
              return [
                createTextVNode(" All four areas must be satisfied before Nebras will grant production access to a live LFI environment. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose. Each area maps to a "),
              createVNode("strong", null, "Certification Type"),
              createTextVNode(" in the Service Desk evidence ticket. ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "ed-doc__contents-grid" }, [
            createVNode("a", {
              class: "ed-link-card",
              href: "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing",
              style: { "--card-color": "var(--at-blue-deep, #1d4ed8)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "01 · Evidence")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "Functional Evidence"),
              createVNode("p", { class: "ed-link-card__desc" }, " Documented proof that your proposition calls only the APIs it needs, requests only the minimum permissions required, and handles consent states correctly. "),
              createVNode("div", { class: "ed-link-card__cert" }, [
                createVNode("span", { class: "ed-link-card__cert-label" }, "Certification Type"),
                createVNode("span", { class: "ed-link-card__cert-value" }, "TPP Functional Certification Evidence")
              ]),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "Start certification"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↗")
              ])
            ]),
            createVNode("a", {
              class: "ed-link-card",
              href: "/tech/tpp-standards/production/testing-certification/user-experience",
              style: { "--card-color": "var(--at-teal)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "02 · Evidence")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "User Experience Evidence"),
              createVNode("p", { class: "ed-link-card__desc" }, " Evidence that your consent and authorisation flows meet Nebras user experience requirements. "),
              createVNode("div", { class: "ed-link-card__cert" }, [
                createVNode("span", { class: "ed-link-card__cert-label" }, "Certification Type"),
                createVNode("span", { class: "ed-link-card__cert-value" }, "TPP CX Certification Evidence")
              ]),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "Open requirements"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↗")
              ])
            ]),
            createVNode("a", {
              class: "ed-link-card",
              href: "/tech/tpp-standards/production/testing-certification/fapi",
              style: { "--card-color": "var(--at-blue, #2c5fb3)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "03 · Conformance")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "FAPI Conformance"),
              createVNode("p", { class: "ed-link-card__desc" }, " Results from running the OpenID Foundation FAPI conformance test suite against your client configuration. "),
              createVNode("div", { class: "ed-link-card__cert" }, [
                createVNode("span", { class: "ed-link-card__cert-label" }, "Certification Type"),
                createVNode("span", { class: "ed-link-card__cert-value" }, "TPP FAPI Certification Evidence")
              ]),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "Open guidance"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↗")
              ])
            ]),
            createVNode("a", {
              class: "ed-link-card",
              href: "/tech/tpp-standards/production/testing-certification/security-validation",
              style: { "--card-color": "var(--at-gold)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "04 · Validation")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "Security Validation"),
              createVNode("p", { class: "ed-link-card__desc" }, " Confirmation that your key management, certificate handling, and data security practices meet Nebras policy requirements. "),
              createVNode("div", { class: "ed-link-card__cert" }, [
                createVNode("span", { class: "ed-link-card__cert-label" }, "Certification Type"),
                createVNode("span", { class: "ed-link-card__cert-value" }, "Penetration Test Results")
              ]),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "Open requirements"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↗")
              ])
            ])
          ]),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All four areas must be satisfied before Nebras will grant production access to a live LFI environment. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "submitting",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Submitting Your Evidence",
    title: "Raise one Service Desk ticket per certification area",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Certification evidence is submitted to Nebras through the <strong data-v-cef9d319${_scopeId2}>Service Desk</strong>, using the dedicated <em data-v-cef9d319${_scopeId2}>Providing certification evidence</em> request type. The link is the same for every area, but each area is its own ticket: raise four tickets — one for Functional, one for User Experience, one for FAPI, and one for Security — and pick the matching <strong data-v-cef9d319${_scopeId2}>Certification Type</strong> from the dropdown on each. `);
            } else {
              return [
                createTextVNode(" Certification evidence is submitted to Nebras through the "),
                createVNode("strong", null, "Service Desk"),
                createTextVNode(", using the dedicated "),
                createVNode("em", null, "Providing certification evidence"),
                createTextVNode(" request type. The link is the same for every area, but each area is its own ticket: raise four tickets — one for Functional, one for User Experience, one for FAPI, and one for Security — and pick the matching "),
                createVNode("strong", null, "Certification Type"),
                createTextVNode(" from the dropdown on each. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Service Desk is gated by Sandbox Trust Framework SSO — see <a href="/support-service-desk" data-v-cef9d319${_scopeId2}>Support &amp; Service Desk</a> for access prerequisites, what to include in a ticket, and the alternative email and telephone channels. `);
            } else {
              return [
                createTextVNode(" The Service Desk is gated by Sandbox Trust Framework SSO — see "),
                createVNode("a", { href: "/support-service-desk" }, "Support & Service Desk"),
                createTextVNode(" for access prerequisites, what to include in a ticket, and the alternative email and telephone channels. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Certification evidence is submitted to Nebras through the "),
              createVNode("strong", null, "Service Desk"),
              createTextVNode(", using the dedicated "),
              createVNode("em", null, "Providing certification evidence"),
              createTextVNode(" request type. The link is the same for every area, but each area is its own ticket: raise four tickets — one for Functional, one for User Experience, one for FAPI, and one for Security — and pick the matching "),
              createVNode("strong", null, "Certification Type"),
              createTextVNode(" from the dropdown on each. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Service Desk is gated by Sandbox Trust Framework SSO — see "),
              createVNode("a", { href: "/support-service-desk" }, "Support & Service Desk"),
              createTextVNode(" for access prerequisites, what to include in a ticket, and the alternative email and telephone channels. ")
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
    num: "04",
    color: "var(--at-gold)",
    eyebrow: "Ongoing Conformance",
    title: "Certification at go-live is the entry bar, not the finish line",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once in production, the TPP MUST maintain its certified state across every area continuously, not only at the point of certification. Material changes to the TPP&#39;s platform, to the Open Finance standards, or to the FAPI profile may trigger re-certification of the affected area; Nebras may also request fresh evidence at any time after go-live. `);
            } else {
              return [
                createTextVNode(" Once in production, the TPP MUST maintain its certified state across every area continuously, not only at the point of certification. Material changes to the TPP's platform, to the Open Finance standards, or to the FAPI profile may trigger re-certification of the affected area; Nebras may also request fresh evidence at any time after go-live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-cef9d319${_scopeId2}><strong data-v-cef9d319${_scopeId2}>Functional conformance</strong> — the TPP MUST continue to call only the APIs required by its proposition, request only the minimum permissions needed, and handle consent state changes correctly as the Open Finance specification evolves. </li><li data-v-cef9d319${_scopeId2}><strong data-v-cef9d319${_scopeId2}>User experience</strong> — consent and authorisation flows MUST continue to meet Nebras CX requirements as those requirements are updated. </li><li data-v-cef9d319${_scopeId2}><strong data-v-cef9d319${_scopeId2}>Security of the TPP&#39;s systems</strong> — the TPP MUST keep dependencies patched, monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever significant changes are made to the application or its Open Finance integration. </li><li data-v-cef9d319${_scopeId2}><strong data-v-cef9d319${_scopeId2}>FAPI alignment</strong> — the TPP MUST maintain a current OIDF <strong data-v-cef9d319${_scopeId2}>CBUAE FAPI 2.0 RP Message Signing</strong> certification, and re-certify against each new major version of the standards. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Functional conformance"),
                  createTextVNode(" — the TPP MUST continue to call only the APIs required by its proposition, request only the minimum permissions needed, and handle consent state changes correctly as the Open Finance specification evolves. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "User experience"),
                  createTextVNode(" — consent and authorisation flows MUST continue to meet Nebras CX requirements as those requirements are updated. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Security of the TPP's systems"),
                  createTextVNode(" — the TPP MUST keep dependencies patched, monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever significant changes are made to the application or its Open Finance integration. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "FAPI alignment"),
                  createTextVNode(" — the TPP MUST maintain a current OIDF "),
                  createVNode("strong", null, "CBUAE FAPI 2.0 RP Message Signing"),
                  createTextVNode(" certification, and re-certify against each new major version of the standards. ")
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
              createTextVNode(" Once in production, the TPP MUST maintain its certified state across every area continuously, not only at the point of certification. Material changes to the TPP's platform, to the Open Finance standards, or to the FAPI profile may trigger re-certification of the affected area; Nebras may also request fresh evidence at any time after go-live. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Functional conformance"),
                createTextVNode(" — the TPP MUST continue to call only the APIs required by its proposition, request only the minimum permissions needed, and handle consent state changes correctly as the Open Finance specification evolves. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "User experience"),
                createTextVNode(" — consent and authorisation flows MUST continue to meet Nebras CX requirements as those requirements are updated. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Security of the TPP's systems"),
                createTextVNode(" — the TPP MUST keep dependencies patched, monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever significant changes are made to the application or its Open Finance integration. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "FAPI alignment"),
                createTextVNode(" — the TPP MUST maintain a current OIDF "),
                createVNode("strong", null, "CBUAE FAPI 2.0 RP Message Signing"),
                createTextVNode(" certification, and re-certify against each new major version of the standards. ")
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
    id: "scope",
    num: "05",
    color: "var(--at-navy)",
    eyebrow: "Scope",
    title: "What these requirements do and do not cover",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The certification requirements in this section are set by Nebras and govern technical and operational readiness for participation in the Open Finance UAE ecosystem. They do not constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the appropriate regulatory authorisations for their proposition before going live. `);
            } else {
              return [
                createTextVNode(" The certification requirements in this section are set by Nebras and govern technical and operational readiness for participation in the Open Finance UAE ecosystem. They do not constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the appropriate regulatory authorisations for their proposition before going live. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The certification requirements in this section are set by Nebras and govern technical and operational readiness for participation in the Open Finance UAE ecosystem. They do not constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the appropriate regulatory authorisations for their proposition before going live. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/overview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cef9d319"]]);
export {
  overview as default
};
