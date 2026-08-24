import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
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
  const _component_ImageViewer = ImageViewer;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-adf3d4ae><section class="ed-doc__hero" data-v-adf3d4ae><div class="ed-doc__inner" data-v-adf3d4ae><div class="ed-doc__eyebrow" data-v-adf3d4ae><span class="ed-doc__eyebrow-dash" data-v-adf3d4ae></span> LFI · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-adf3d4ae> Sign Up <span class="ed-doc__read" data-v-adf3d4ae>2 min read</span></h1><p class="ed-doc__lede" data-v-adf3d4ae> This guide walks through the steps a newly invited Organisation Admin or User must complete after receiving an invitation to the Trust Framework platform. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "sign-up-steps",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Sign Up",
    title: "9 steps from invitation email to platform access",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<ol class="ed-doc__steps" data-v-adf3d4ae${_scopeId}><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Receive Onboarding Email</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once you have been invited, you will receive an email from the <strong data-v-adf3d4ae${_scopeId2}>Al Tareq Trust Framework Sandbox</strong>. This email contains a registration link — keep it to hand before proceeding. `);
            } else {
              return [
                createTextVNode(" Once you have been invited, you will receive an email from the "),
                createVNode("strong", null, "Al Tareq Trust Framework Sandbox"),
                createTextVNode(". This email contains a registration link — keep it to hand before proceeding. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/1.png",
          alt: "Onboarding email containing the registration link"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Open the Registration Link</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Click on the registration link provided in the email.`);
            } else {
              return [
                createTextVNode("Click on the registration link provided in the email.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Access the Sign-In Page</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You will be redirected to the Trust Framework Sandbox sign-in page. Click <strong data-v-adf3d4ae${_scopeId2}>Registration</strong> to begin the registration process. `);
            } else {
              return [
                createTextVNode(" You will be redirected to the Trust Framework Sandbox sign-in page. Click "),
                createVNode("strong", null, "Registration"),
                createTextVNode(" to begin the registration process. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/2.png",
          alt: "Trust Framework Sign-In Page — click Registration"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Complete Registration</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Fill in the required registration details and submit your request.`);
            } else {
              return [
                createTextVNode("Fill in the required registration details and submit your request.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-adf3d4ae${_scopeId2}> Make sure the email address you register with exactly matches the email address you were invited with. </p>`);
            } else {
              return [
                createVNode("p", null, " Make sure the email address you register with exactly matches the email address you were invited with. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/3.png",
          alt: "Complete Registration — use your invited email address"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Set Up Two-Factor Authentication</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Scan the QR code displayed on screen using <strong data-v-adf3d4ae${_scopeId2}>Google Authenticator</strong> or another authenticator app of your choice. Enter the one-time code generated by the app to complete the setup. `);
            } else {
              return [
                createTextVNode(" Scan the QR code displayed on screen using "),
                createVNode("strong", null, "Google Authenticator"),
                createTextVNode(" or another authenticator app of your choice. Enter the one-time code generated by the app to complete the setup. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/4.png",
          alt: "Set up Multi-Factor by scanning the QR code with your authenticator app"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Accept Terms of Acceptance</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` After successful registration, you will receive another email at your registered email address requesting you to review and accept the <strong data-v-adf3d4ae${_scopeId2}>Terms of Acceptance</strong> from the Al Tareq Platform. `);
            } else {
              return [
                createTextVNode(" After successful registration, you will receive another email at your registered email address requesting you to review and accept the "),
                createVNode("strong", null, "Terms of Acceptance"),
                createTextVNode(" from the Al Tareq Platform. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/5.png",
          alt: "Terms of Acceptance email"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Review and Sign the Document</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Open the Terms of Acceptance document and electronically sign it.`);
            } else {
              return [
                createTextVNode("Open the Terms of Acceptance document and electronically sign it.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/6.png",
          alt: "Review and sign the Terms of Acceptance"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Check Your Request Status</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Return to the <a href="https://web.sandbox.directory.openfinance.ae/" data-v-adf3d4ae${_scopeId2}>Trust Framework Sandbox portal</a> and check the status of your registration request. `);
            } else {
              return [
                createTextVNode(" Return to the "),
                createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "Trust Framework Sandbox portal"),
                createTextVNode(" and check the status of your registration request. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/raidiam/sign-up/7.png",
          alt: "Check status in the Sandbox Portal after signing"
        }, null, _parent2, _scopeId));
        _push2(`</li><li data-v-adf3d4ae${_scopeId}><h3 data-v-adf3d4ae${_scopeId}>Log In to the Platform</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the process is completed, you will be able to log in to the Trust Framework Sandbox and access the resources your role permits. `);
            } else {
              return [
                createTextVNode(" Once the process is completed, you will be able to log in to the Trust Framework Sandbox and access the resources your role permits. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li></ol>`);
      } else {
        return [
          createVNode("ol", { class: "ed-doc__steps" }, [
            createVNode("li", null, [
              createVNode("h3", null, "Receive Onboarding Email"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once you have been invited, you will receive an email from the "),
                  createVNode("strong", null, "Al Tareq Trust Framework Sandbox"),
                  createTextVNode(". This email contains a registration link — keep it to hand before proceeding. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/1.png",
                alt: "Onboarding email containing the registration link"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Open the Registration Link"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Click on the registration link provided in the email.")
                ]),
                _: 1
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Access the Sign-In Page"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You will be redirected to the Trust Framework Sandbox sign-in page. Click "),
                  createVNode("strong", null, "Registration"),
                  createTextVNode(" to begin the registration process. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/2.png",
                alt: "Trust Framework Sign-In Page — click Registration"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Complete Registration"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Fill in the required registration details and submit your request.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, " Make sure the email address you register with exactly matches the email address you were invited with. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/3.png",
                alt: "Complete Registration — use your invited email address"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Set Up Two-Factor Authentication"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Scan the QR code displayed on screen using "),
                  createVNode("strong", null, "Google Authenticator"),
                  createTextVNode(" or another authenticator app of your choice. Enter the one-time code generated by the app to complete the setup. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/4.png",
                alt: "Set up Multi-Factor by scanning the QR code with your authenticator app"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Accept Terms of Acceptance"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After successful registration, you will receive another email at your registered email address requesting you to review and accept the "),
                  createVNode("strong", null, "Terms of Acceptance"),
                  createTextVNode(" from the Al Tareq Platform. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/5.png",
                alt: "Terms of Acceptance email"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Review and Sign the Document"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Open the Terms of Acceptance document and electronically sign it.")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/6.png",
                alt: "Review and sign the Terms of Acceptance"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Check Your Request Status"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return to the "),
                  createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "Trust Framework Sandbox portal"),
                  createTextVNode(" and check the status of your registration request. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/sign-up/7.png",
                alt: "Check status in the Sandbox Portal after signing"
              })
            ]),
            createVNode("li", null, [
              createVNode("h3", null, "Log In to the Platform"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the process is completed, you will be able to log in to the Trust Framework Sandbox and access the resources your role permits. ")
                ]),
                _: 1
              })
            ])
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/user-sign-up.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userSignUp = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-adf3d4ae"]]);
export {
  userSignUp as default
};
