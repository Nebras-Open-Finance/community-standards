import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdBullets = __unplugin_components_5;
  const _component_ImageViewer = ImageViewer;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-56e54560><section class="ed-doc__hero" data-v-56e54560><div class="ed-doc__inner" data-v-56e54560><div class="ed-doc__eyebrow" data-v-56e54560><span class="ed-doc__eyebrow-dash" data-v-56e54560></span> TPP · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-56e54560> Onboarding <span class="ed-doc__read" data-v-56e54560>3 min read</span></h1><p class="ed-doc__lede" data-v-56e54560> The onboarding process to the <strong data-v-56e54560>Trust Framework</strong> works in tandem with the <strong data-v-56e54560>licensing processes</strong> defined by the <strong data-v-56e54560>Central Bank of the UAE (CBUAE)</strong>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "when",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "When You Can Onboard",
    title: "Sandbox or Production, depending on your licence stage",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` As a <strong data-v-56e54560${_scopeId2}>Third-Party Provider (TPP)</strong>, you may begin onboarding to the appropriate Trust Framework environment based on your licensing status: `);
            } else {
              return [
                createTextVNode(" As a "),
                createVNode("strong", null, "Third-Party Provider (TPP)"),
                createTextVNode(", you may begin onboarding to the appropriate Trust Framework environment based on your licensing status: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="ed-doc__cards" data-v-56e54560${_scopeId}><a href="#requesting-sandbox-onboarding" class="ed-link-card" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-56e54560${_scopeId}><span class="ed-link-card__top" data-v-56e54560${_scopeId}></span><div class="ed-link-card__meta" data-v-56e54560${_scopeId}><span class="ed-link-card__cat" data-v-56e54560${_scopeId}>01 · Sandbox</span></div><h3 class="ed-link-card__title" data-v-56e54560${_scopeId}>Sandbox Environment</h3><p class="ed-link-card__desc" data-v-56e54560${_scopeId}>You may onboard to the Sandbox Trust Framework once the CBUAE has confirmed receipt of your licence application and business plan. Request onboarding by emailing <code data-v-56e54560${_scopeId}>support@nebrasopenfinance.ae</code>.</p><div class="ed-link-card__foot" data-v-56e54560${_scopeId}><span class="ed-link-card__cta" data-v-56e54560${_scopeId}>View email template</span><span class="ed-link-card__arrow" data-v-56e54560${_scopeId}>↓</span></div></a><a href="https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/38" target="_blank" rel="noopener" class="ed-link-card" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-56e54560${_scopeId}><span class="ed-link-card__top" data-v-56e54560${_scopeId}></span><div class="ed-link-card__meta" data-v-56e54560${_scopeId}><span class="ed-link-card__cat" data-v-56e54560${_scopeId}>02 · Production</span></div><h3 class="ed-link-card__title" data-v-56e54560${_scopeId}>Production Environment</h3><p class="ed-link-card__desc" data-v-56e54560${_scopeId}>You may onboard to the Production Trust Framework once the CBUAE has approved your licence. Request onboarding by raising a Service Desk ticket.</p><div class="ed-link-card__foot" data-v-56e54560${_scopeId}><span class="ed-link-card__cta" data-v-56e54560${_scopeId}>Raise a Service Desk ticket</span><span class="ed-link-card__arrow" data-v-56e54560${_scopeId}>↗</span></div></a></div>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If you have not yet started your Open Finance licensing process and are interested in finding out more, please contact <a href="mailto:connect@nebrasopenfinance.ae" data-v-56e54560${_scopeId2}>connect@nebrasopenfinance.ae</a>. `);
            } else {
              return [
                createTextVNode(" If you have not yet started your Open Finance licensing process and are interested in finding out more, please contact "),
                createVNode("a", { href: "mailto:connect@nebrasopenfinance.ae" }, "connect@nebrasopenfinance.ae"),
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
              createTextVNode(" As a "),
              createVNode("strong", null, "Third-Party Provider (TPP)"),
              createTextVNode(", you may begin onboarding to the appropriate Trust Framework environment based on your licensing status: ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "ed-doc__cards" }, [
            createVNode("a", {
              href: "#requesting-sandbox-onboarding",
              class: "ed-link-card",
              style: { "--card-color": "var(--at-teal)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "01 · Sandbox")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "Sandbox Environment"),
              createVNode("p", { class: "ed-link-card__desc" }, [
                createTextVNode("You may onboard to the Sandbox Trust Framework once the CBUAE has confirmed receipt of your licence application and business plan. Request onboarding by emailing "),
                createVNode("code", null, "support@nebrasopenfinance.ae"),
                createTextVNode(".")
              ]),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "View email template"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↓")
              ])
            ]),
            createVNode("a", {
              href: "https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/38",
              target: "_blank",
              rel: "noopener",
              class: "ed-link-card",
              style: { "--card-color": "var(--at-blue-deep, #1d4ed8)" }
            }, [
              createVNode("span", { class: "ed-link-card__top" }),
              createVNode("div", { class: "ed-link-card__meta" }, [
                createVNode("span", { class: "ed-link-card__cat" }, "02 · Production")
              ]),
              createVNode("h3", { class: "ed-link-card__title" }, "Production Environment"),
              createVNode("p", { class: "ed-link-card__desc" }, "You may onboard to the Production Trust Framework once the CBUAE has approved your licence. Request onboarding by raising a Service Desk ticket."),
              createVNode("div", { class: "ed-link-card__foot" }, [
                createVNode("span", { class: "ed-link-card__cta" }, "Raise a Service Desk ticket"),
                createVNode("span", { class: "ed-link-card__arrow" }, "↗")
              ])
            ])
          ]),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If you have not yet started your Open Finance licensing process and are interested in finding out more, please contact "),
              createVNode("a", { href: "mailto:connect@nebrasopenfinance.ae" }, "connect@nebrasopenfinance.ae"),
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
    id: "requesting-sandbox-onboarding",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Requesting Sandbox Onboarding",
    title: "What to send to support@nebrasopenfinance.ae",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the CBUAE has confirmed receipt of your licence application, send the following to <a href="mailto:support@nebrasopenfinance.ae" data-v-56e54560${_scopeId2}>support@nebrasopenfinance.ae</a> to begin sandbox onboarding: `);
            } else {
              return [
                createTextVNode(" Once the CBUAE has confirmed receipt of your licence application, send the following to "),
                createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
                createTextVNode(" to begin sandbox onboarding: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "📨 Email template"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>To:</strong><a href="mailto:support@nebrasopenfinance.ae" data-v-56e54560${_scopeId2}>support@nebrasopenfinance.ae</a><br data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>Subject:</strong> Trust Framework Sandbox Onboarding Request — [Your Organisation Name] </p><p data-v-56e54560${_scopeId2}>Dear Nebras Support,</p><p data-v-56e54560${_scopeId2}> I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review the attached documents: </p><p data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>1. CBUAE Licence / Letter of Intent</strong><br data-v-56e54560${_scopeId2}> A copy of your valid Central Bank of the UAE (CBUAE) Licence, or a Letter of Intent along with the Business Proposal submitted to the CBUAE. </p><p data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>2. Organisation Details</strong><br data-v-56e54560${_scopeId2}> The completed <a href="/tech/tpp-standards/trust-framework/onboarding-form-organisation" data-v-56e54560${_scopeId2}>Organisation Details form</a>. </p><p data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>3. Primary Organisation Admin Details</strong><br data-v-56e54560${_scopeId2}> The completed <a href="/tech/tpp-standards/trust-framework/onboarding-form-admin" data-v-56e54560${_scopeId2}>Primary Organisation Admin form</a> with the nominated administrator&#39;s details. </p><p data-v-56e54560${_scopeId2}><strong data-v-56e54560${_scopeId2}>4. Primary Organisation Admin Approval</strong><br data-v-56e54560${_scopeId2}> A signed letter from your Chief Compliance Officer confirming the approval of the designated Primary Organisation Admin. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createVNode("strong", null, "To:"),
                  createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
                  createVNode("br"),
                  createVNode("strong", null, "Subject:"),
                  createTextVNode(" Trust Framework Sandbox Onboarding Request — [Your Organisation Name] ")
                ]),
                createVNode("p", null, "Dear Nebras Support,"),
                createVNode("p", null, " I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review the attached documents: "),
                createVNode("p", null, [
                  createVNode("strong", null, "1. CBUAE Licence / Letter of Intent"),
                  createVNode("br"),
                  createTextVNode(" A copy of your valid Central Bank of the UAE (CBUAE) Licence, or a Letter of Intent along with the Business Proposal submitted to the CBUAE. ")
                ]),
                createVNode("p", null, [
                  createVNode("strong", null, "2. Organisation Details"),
                  createVNode("br"),
                  createTextVNode(" The completed "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding-form-organisation" }, "Organisation Details form"),
                  createTextVNode(". ")
                ]),
                createVNode("p", null, [
                  createVNode("strong", null, "3. Primary Organisation Admin Details"),
                  createVNode("br"),
                  createTextVNode(" The completed "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding-form-admin" }, "Primary Organisation Admin form"),
                  createTextVNode(" with the nominated administrator's details. ")
                ]),
                createVNode("p", null, [
                  createVNode("strong", null, "4. Primary Organisation Admin Approval"),
                  createVNode("br"),
                  createTextVNode(" A signed letter from your Chief Compliance Officer confirming the approval of the designated Primary Organisation Admin. ")
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
              createTextVNode(" Once the CBUAE has confirmed receipt of your licence application, send the following to "),
              createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
              createTextVNode(" to begin sandbox onboarding: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "📨 Email template"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createVNode("strong", null, "To:"),
                createVNode("a", { href: "mailto:support@nebrasopenfinance.ae" }, "support@nebrasopenfinance.ae"),
                createVNode("br"),
                createVNode("strong", null, "Subject:"),
                createTextVNode(" Trust Framework Sandbox Onboarding Request — [Your Organisation Name] ")
              ]),
              createVNode("p", null, "Dear Nebras Support,"),
              createVNode("p", null, " I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review the attached documents: "),
              createVNode("p", null, [
                createVNode("strong", null, "1. CBUAE Licence / Letter of Intent"),
                createVNode("br"),
                createTextVNode(" A copy of your valid Central Bank of the UAE (CBUAE) Licence, or a Letter of Intent along with the Business Proposal submitted to the CBUAE. ")
              ]),
              createVNode("p", null, [
                createVNode("strong", null, "2. Organisation Details"),
                createVNode("br"),
                createTextVNode(" The completed "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding-form-organisation" }, "Organisation Details form"),
                createTextVNode(". ")
              ]),
              createVNode("p", null, [
                createVNode("strong", null, "3. Primary Organisation Admin Details"),
                createVNode("br"),
                createTextVNode(" The completed "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding-form-admin" }, "Primary Organisation Admin form"),
                createTextVNode(" with the nominated administrator's details. ")
              ]),
              createVNode("p", null, [
                createVNode("strong", null, "4. Primary Organisation Admin Approval"),
                createVNode("br"),
                createTextVNode(" A signed letter from your Chief Compliance Officer confirming the approval of the designated Primary Organisation Admin. ")
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
    id: "primary-admin",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Primary Organisation Admin",
    title: "The single point of contact for your organisation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` As part of your licence application, you must nominate a <strong data-v-56e54560${_scopeId2}>Primary Organisation Admin</strong>. The Primary Organisation Admin will act as your organization&#39;s main point of contact with <strong data-v-56e54560${_scopeId2}>Nebras</strong> and the <strong data-v-56e54560${_scopeId2}>CBUAE</strong> during onboarding and ongoing operations. `);
            } else {
              return [
                createTextVNode(" As part of your licence application, you must nominate a "),
                createVNode("strong", null, "Primary Organisation Admin"),
                createTextVNode(". The Primary Organisation Admin will act as your organization's main point of contact with "),
                createVNode("strong", null, "Nebras"),
                createTextVNode(" and the "),
                createVNode("strong", null, "CBUAE"),
                createTextVNode(" during onboarding and ongoing operations. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Within the Trust Framework, the Primary Organisation Admin will:`);
            } else {
              return [
                createTextVNode("Within the Trust Framework, the Primary Organisation Admin will:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-56e54560${_scopeId2}>Serve as <strong data-v-56e54560${_scopeId2}>system administrator</strong></li><li data-v-56e54560${_scopeId2}>Manage user access</li><li data-v-56e54560${_scopeId2}>Appoint technical contacts</li><li data-v-56e54560${_scopeId2}>Coordinate the signing and submission of required legal documentation</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Serve as "),
                  createVNode("strong", null, "system administrator")
                ]),
                createVNode("li", null, "Manage user access"),
                createVNode("li", null, "Appoint technical contacts"),
                createVNode("li", null, "Coordinate the signing and submission of required legal documentation")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" As part of your licence application, you must nominate a "),
              createVNode("strong", null, "Primary Organisation Admin"),
              createTextVNode(". The Primary Organisation Admin will act as your organization's main point of contact with "),
              createVNode("strong", null, "Nebras"),
              createTextVNode(" and the "),
              createVNode("strong", null, "CBUAE"),
              createTextVNode(" during onboarding and ongoing operations. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Within the Trust Framework, the Primary Organisation Admin will:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Serve as "),
                createVNode("strong", null, "system administrator")
              ]),
              createVNode("li", null, "Manage user access"),
              createVNode("li", null, "Appoint technical contacts"),
              createVNode("li", null, "Coordinate the signing and submission of required legal documentation")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "access",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Access & Registration",
    title: "Receiving the invitation email and completing sign-up",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once your onboarding request has been accepted, the <strong data-v-56e54560${_scopeId2}>Primary Organisation Admin</strong> will receive an invitation email from the Trust Framework platform. They can complete registration by following the steps in the <a href="/tech/tpp-standards/trust-framework/user-sign-up" data-v-56e54560${_scopeId2}>Sign Up guide</a>. `);
            } else {
              return [
                createTextVNode(" Once your onboarding request has been accepted, the "),
                createVNode("strong", null, "Primary Organisation Admin"),
                createTextVNode(" will receive an invitation email from the Trust Framework platform. They can complete registration by following the steps in the "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/1.png",
          alt: "Registration Email"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Agreement signing required"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-56e54560${_scopeId2}> In addition to the steps in the <a href="/tech/tpp-standards/trust-framework/user-sign-up" data-v-56e54560${_scopeId2}>Sign Up guide</a>, as part of registration, the <strong data-v-56e54560${_scopeId2}>Primary Organisation Admin</strong> will receive the <strong data-v-56e54560${_scopeId2}>TPP Agreement</strong> for electronic signature. This document must be signed by an <strong data-v-56e54560${_scopeId2}>authorised signatory</strong> — someone with the authority to legally bind the organisation. The Primary Organisation Admin must coordinate this signing before the organisation can access the Trust Framework. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" In addition to the steps in the "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up guide"),
                  createTextVNode(", as part of registration, the "),
                  createVNode("strong", null, "Primary Organisation Admin"),
                  createTextVNode(" will receive the "),
                  createVNode("strong", null, "TPP Agreement"),
                  createTextVNode(" for electronic signature. This document must be signed by an "),
                  createVNode("strong", null, "authorised signatory"),
                  createTextVNode(" — someone with the authority to legally bind the organisation. The Primary Organisation Admin must coordinate this signing before the organisation can access the Trust Framework. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` After the Primary Organisation Admin account is set up, they can <strong data-v-56e54560${_scopeId2}>add additional users</strong> within the Trust Framework platform. `);
            } else {
              return [
                createTextVNode(" After the Primary Organisation Admin account is set up, they can "),
                createVNode("strong", null, "add additional users"),
                createTextVNode(" within the Trust Framework platform. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once your onboarding request has been accepted, the "),
              createVNode("strong", null, "Primary Organisation Admin"),
              createTextVNode(" will receive an invitation email from the Trust Framework platform. They can complete registration by following the steps in the "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up guide"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/raidiam/sign-up/1.png",
            alt: "Registration Email"
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Agreement signing required"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" In addition to the steps in the "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up guide"),
                createTextVNode(", as part of registration, the "),
                createVNode("strong", null, "Primary Organisation Admin"),
                createTextVNode(" will receive the "),
                createVNode("strong", null, "TPP Agreement"),
                createTextVNode(" for electronic signature. This document must be signed by an "),
                createVNode("strong", null, "authorised signatory"),
                createTextVNode(" — someone with the authority to legally bind the organisation. The Primary Organisation Admin must coordinate this signing before the organisation can access the Trust Framework. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" After the Primary Organisation Admin account is set up, they can "),
              createVNode("strong", null, "add additional users"),
              createTextVNode(" within the Trust Framework platform. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/onboarding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onboarding = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-56e54560"]]);
export {
  onboarding as default
};
