import { _ as __unplugin_components_5$1 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "adding-users",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-user/roles.png", import.meta.url).href, alt: "Step 1", title: "Roles Section" },
      { src: new URL("/images/raidiam/add-user/roles-2.png", import.meta.url).href, alt: "Step 2", title: "Roles Section" },
      { src: new URL("/images/raidiam/add-user/role-bsip.png", import.meta.url).href, alt: "Step 3", title: "Role BSIP" },
      { src: new URL("/images/raidiam/add-user/role-bsip-2.png", import.meta.url).href, alt: "Step 4", title: "Role BSIP (Domain Users)" },
      { src: new URL("/images/raidiam/add-user/role-bsip-new-user.png", import.meta.url).href, alt: "Step 5", title: "New Domain User" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-924bb8e5><section class="ed-doc__hero" data-v-924bb8e5><div class="ed-doc__inner" data-v-924bb8e5><div class="ed-doc__eyebrow" data-v-924bb8e5><span class="ed-doc__eyebrow-dash" data-v-924bb8e5></span> TPP · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-924bb8e5> Adding Users <span class="ed-doc__read" data-v-924bb8e5>2 min read</span></h1><p class="ed-doc__lede" data-v-924bb8e5>Organisation Administrators can onboard Users.</p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "user-types",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "User Types",
        title: "Roles supported by the Trust Framework",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-924bb8e5${_scopeId2}><thead data-v-924bb8e5${_scopeId2}><tr data-v-924bb8e5${_scopeId2}><th data-v-924bb8e5${_scopeId2}>User Type</th><th data-v-924bb8e5${_scopeId2}>Access Scope</th></tr></thead><tbody data-v-924bb8e5${_scopeId2}><tr data-v-924bb8e5${_scopeId2}><td data-v-924bb8e5${_scopeId2}><strong data-v-924bb8e5${_scopeId2}>Primary Technical Contact (PTC)</strong></td><td data-v-924bb8e5${_scopeId2}>Can manage all technical resources of an Organisation — Applications and Certificates.</td></tr><tr data-v-924bb8e5${_scopeId2}><td data-v-924bb8e5${_scopeId2}><strong data-v-924bb8e5${_scopeId2}>Secondary Technical Contact (STC)</strong></td><td data-v-924bb8e5${_scopeId2}>Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates.</td></tr><tr data-v-924bb8e5${_scopeId2}><td data-v-924bb8e5${_scopeId2}><strong data-v-924bb8e5${_scopeId2}>Primary Business Contact (PBC)</strong></td><td data-v-924bb8e5${_scopeId2}>Can manage Contacts in the Organisation. Cannot manage Technical Resources.</td></tr><tr data-v-924bb8e5${_scopeId2}><td data-v-924bb8e5${_scopeId2}><strong data-v-924bb8e5${_scopeId2}>Secondary Business Contact (SBC)</strong></td><td data-v-924bb8e5${_scopeId2}>Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "User Type"),
                          createVNode("th", null, "Access Scope")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Primary Technical Contact (PTC)")
                          ]),
                          createVNode("td", null, "Can manage all technical resources of an Organisation — Applications and Certificates.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Secondary Technical Contact (STC)")
                          ]),
                          createVNode("td", null, "Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Primary Business Contact (PBC)")
                          ]),
                          createVNode("td", null, "Can manage Contacts in the Organisation. Cannot manage Technical Resources.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Secondary Business Contact (SBC)")
                          ]),
                          createVNode("td", null, "Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework.")
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
              title: "Sandbox only"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-924bb8e5${_scopeId2}> Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework (<a href="https://web.sandbox.directory.openfinance.ae/" data-v-924bb8e5${_scopeId2}>https://web.sandbox.directory.openfinance.ae/</a>) is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework SSO. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework ("),
                      createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "https://web.sandbox.directory.openfinance.ae/"),
                      createTextVNode(") is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework SSO. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "User Type"),
                        createVNode("th", null, "Access Scope")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Primary Technical Contact (PTC)")
                        ]),
                        createVNode("td", null, "Can manage all technical resources of an Organisation — Applications and Certificates.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Secondary Technical Contact (STC)")
                        ]),
                        createVNode("td", null, "Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Primary Business Contact (PBC)")
                        ]),
                        createVNode("td", null, "Can manage Contacts in the Organisation. Cannot manage Technical Resources.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Secondary Business Contact (SBC)")
                        ]),
                        createVNode("td", null, "Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Sandbox only"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework ("),
                    createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "https://web.sandbox.directory.openfinance.ae/"),
                    createTextVNode(") is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework SSO. ")
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
        id: "primary-technical-contact-ptc",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Primary Technical Contact (PTC)",
        title: "The technical owner for applications and certificates",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications. `);
                } else {
                  return [
                    createTextVNode(" The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This includes:`);
                } else {
                  return [
                    createTextVNode("This includes:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-924bb8e5${_scopeId2}>Creating and configuring applications</li><li data-v-924bb8e5${_scopeId2}>Managing certificates (Transport, Signing, and Encryption) for each application</li><li data-v-924bb8e5${_scopeId2}>Keeping keys and certificates current and renewing them before expiry</li><li data-v-924bb8e5${_scopeId2}>Ensuring applications are correctly configured with the required roles and certificates</li>`);
                } else {
                  return [
                    createVNode("li", null, "Creating and configuring applications"),
                    createVNode("li", null, "Managing certificates (Transport, Signing, and Encryption) for each application"),
                    createVNode("li", null, "Keeping keys and certificates current and renewing them before expiry"),
                    createVNode("li", null, "Ensuring applications are correctly configured with the required roles and certificates")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/trust-framework/application" data-v-924bb8e5${_scopeId2}>Applications</a> for more on creating and managing applications, and <a href="/tech/tpp-standards/trust-framework/certificates/" data-v-924bb8e5${_scopeId2}>Keys &amp; Certificates</a> for certificate management. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Applications"),
                    createTextVNode(" for more on creating and managing applications, and "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates/" }, "Keys & Certificates"),
                    createTextVNode(" for certificate management. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This includes:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Creating and configuring applications"),
                  createVNode("li", null, "Managing certificates (Transport, Signing, and Encryption) for each application"),
                  createVNode("li", null, "Keeping keys and certificates current and renewing them before expiry"),
                  createVNode("li", null, "Ensuring applications are correctly configured with the required roles and certificates")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Applications"),
                  createTextVNode(" for more on creating and managing applications, and "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode(" for certificate management. ")
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
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Inviting a User",
        title: "Step-by-step in the Trust Framework portal",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__substeps" data-v-924bb8e5${_scopeId}><li data-v-924bb8e5${_scopeId}>Log in to the Trust Framework and navigate to the <strong data-v-924bb8e5${_scopeId}>Roles</strong> section within your organisation.</li><li data-v-924bb8e5${_scopeId}>Navigate to a role within your organisation.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-924bb8e5${_scopeId2}>Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" start="3" data-v-924bb8e5${_scopeId}><li data-v-924bb8e5${_scopeId}>Navigate to the <strong data-v-924bb8e5${_scopeId}>Domain Users</strong> section of your organisation.</li><li data-v-924bb8e5${_scopeId}>Click <strong data-v-924bb8e5${_scopeId}>+ New Domain User</strong>.</li><li data-v-924bb8e5${_scopeId}>Select the System as <strong data-v-924bb8e5${_scopeId}>AlTareq Trust Framework</strong> and select the relevant user role — <strong data-v-924bb8e5${_scopeId}>PTC</strong>, <strong data-v-924bb8e5${_scopeId}>PBC</strong>, <strong data-v-924bb8e5${_scopeId}>STC</strong>, or <strong data-v-924bb8e5${_scopeId}>SBC</strong>.</li><li data-v-924bb8e5${_scopeId}>Enter the new user&#39;s email address and confirm.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see <a href="/tech/tpp-standards/trust-framework/user-sign-up" data-v-924bb8e5${_scopeId2}>Sign Up</a>. `);
                } else {
                  return [
                    createTextVNode(" The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-924bb8e5${_scopeId2}>If a user does not receive the invitation email, ask them to check their spam folder.</p>`);
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
                createVNode("li", null, [
                  createTextVNode("Log in to the Trust Framework and navigate to the "),
                  createVNode("strong", null, "Roles"),
                  createTextVNode(" section within your organisation.")
                ]),
                createVNode("li", null, "Navigate to a role within your organisation.")
              ]),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role.")
                ]),
                _: 1
              }),
              createVNode("ol", {
                class: "ed-doc__substeps",
                start: "3"
              }, [
                createVNode("li", null, [
                  createTextVNode("Navigate to the "),
                  createVNode("strong", null, "Domain Users"),
                  createTextVNode(" section of your organisation.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Click "),
                  createVNode("strong", null, "+ New Domain User"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, [
                  createTextVNode("Select the System as "),
                  createVNode("strong", null, "AlTareq Trust Framework"),
                  createTextVNode(" and select the relevant user role — "),
                  createVNode("strong", null, "PTC"),
                  createTextVNode(", "),
                  createVNode("strong", null, "PBC"),
                  createTextVNode(", "),
                  createVNode("strong", null, "STC"),
                  createTextVNode(", or "),
                  createVNode("strong", null, "SBC"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, "Enter the new user's email address and confirm.")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/user-sign-up" }, "Sign Up"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/adding-users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const addingUsers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-924bb8e5"]]);
export {
  addingUsers as default
};
