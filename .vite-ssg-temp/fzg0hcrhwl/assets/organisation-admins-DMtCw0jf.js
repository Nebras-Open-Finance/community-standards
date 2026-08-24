import { _ as __unplugin_components_5$1 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "organisation-admins",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-org-admin/1.png", import.meta.url).href, alt: "Step 1", title: "Adminstrators Section" },
      { src: new URL("/images/raidiam/add-org-admin/2.png", import.meta.url).href, alt: "Step 2", title: "New Organisation Administrator" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b65d66a9><section class="ed-doc__hero" data-v-b65d66a9><div class="ed-doc__inner" data-v-b65d66a9><div class="ed-doc__eyebrow" data-v-b65d66a9><span class="ed-doc__eyebrow-dash" data-v-b65d66a9></span> LFI · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-b65d66a9> Organisation Admins <span class="ed-doc__read" data-v-b65d66a9>2 min read</span></h1><p class="ed-doc__lede" data-v-b65d66a9> Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is properly maintained. This includes ensuring all users have the correct access, that the Organisation&#39;s details are current and correct, and that assets such as logos are kept up to date. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-b65d66a9> The first Organisation Admin is the <strong data-v-b65d66a9>Primary Organisation Admin</strong> — nominated during the CBUAE licensing process and granted access when onboarding begins. The Primary Organisation Admin can add other Organisation Admins. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-b65d66a9> For other user roles, see <a href="/tech/lfi-api-hub/trust-framework/adding-users" data-v-b65d66a9>Adding Users</a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "responsibilities",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Responsibilities",
        title: "What an Organisation Admin owns",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Organisation Admins are responsible for:`);
                } else {
                  return [
                    createTextVNode("Organisation Admins are responsible for:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b65d66a9${_scopeId2}>Ensuring all users have the correct level of access</li><li data-v-b65d66a9${_scopeId2}>Adding a <a href="/tech/lfi-api-hub/trust-framework/adding-users#primary-technical-contact-ptc" data-v-b65d66a9${_scopeId2}>Primary Technical Contact (PTC)</a> — required before applications and certificates can be managed</li><li data-v-b65d66a9${_scopeId2}>Keeping Organisation details current and accurate</li><li data-v-b65d66a9${_scopeId2}>Keeping logos and branding assets up to date</li>`);
                } else {
                  return [
                    createVNode("li", null, "Ensuring all users have the correct level of access"),
                    createVNode("li", null, [
                      createTextVNode("Adding a "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/adding-users#primary-technical-contact-ptc" }, "Primary Technical Contact (PTC)"),
                      createTextVNode(" — required before applications and certificates can be managed")
                    ]),
                    createVNode("li", null, "Keeping Organisation details current and accurate"),
                    createVNode("li", null, "Keeping logos and branding assets up to date")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Organisation Admins are responsible for:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Ensuring all users have the correct level of access"),
                  createVNode("li", null, [
                    createTextVNode("Adding a "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/adding-users#primary-technical-contact-ptc" }, "Primary Technical Contact (PTC)"),
                    createTextVNode(" — required before applications and certificates can be managed")
                  ]),
                  createVNode("li", null, "Keeping Organisation details current and accurate"),
                  createVNode("li", null, "Keeping logos and branding assets up to date")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "inviting",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Inviting an Organisation Admin",
        title: "Step-by-step in the Trust Framework portal",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__substeps" data-v-b65d66a9${_scopeId}><li data-v-b65d66a9${_scopeId}>Log in to the Trust Framework and navigate to your organisation.</li><li data-v-b65d66a9${_scopeId}>Navigate to the <strong data-v-b65d66a9${_scopeId}>Administrators</strong> section of your Organisation.</li><li data-v-b65d66a9${_scopeId}>Click <strong data-v-b65d66a9${_scopeId}>+ New Organisation Administrator</strong>.</li><li data-v-b65d66a9${_scopeId}>Enter the new Organisation Administrator&#39;s email address.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The invited Organisation Admin will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what they must do next, see <a href="/tech/lfi-api-hub/trust-framework/user-sign-up" data-v-b65d66a9${_scopeId2}>Sign Up</a>. `);
                } else {
                  return [
                    createTextVNode(" The invited Organisation Admin will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what they must do next, see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/user-sign-up" }, "Sign Up"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b65d66a9${_scopeId2}>If a user does not receive the invitation email, ask them to check their spam folder.</p>`);
                } else {
                  return [
                    createVNode("p", null, "If a user does not receive the invitation email, ask them to check their spam folder.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images1 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images1 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("ol", { class: "ed-doc__substeps" }, [
                createVNode("li", null, "Log in to the Trust Framework and navigate to your organisation."),
                createVNode("li", null, [
                  createTextVNode("Navigate to the "),
                  createVNode("strong", null, "Administrators"),
                  createTextVNode(" section of your Organisation.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Click "),
                  createVNode("strong", null, "+ New Organisation Administrator"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, "Enter the new Organisation Administrator's email address.")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The invited Organisation Admin will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what they must do next, see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/user-sign-up" }, "Sign Up"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, "If a user does not receive the invitation email, ask them to check their spam folder.")
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/organisation-admins.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const organisationAdmins = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b65d66a9"]]);
export {
  organisationAdmins as default
};
