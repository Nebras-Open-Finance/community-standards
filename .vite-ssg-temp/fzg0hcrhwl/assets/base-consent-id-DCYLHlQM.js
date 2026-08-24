import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base-consent-id",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "when", label: "When" },
      { id: "summary", label: "Summary" }
    ];
    const meta = [
      { label: "Category", value: "Consents" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Consents", "Consent Linking", "consentGroupId"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-2d9f83ae>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "How to Link Consents — Base Consent ID (consentGroupId)",
        meta,
        lede: "The <strong>Base Consent ID</strong> (<code>consentGroupId</code>) is a persistent reference that links related consents within a TPP's service. It allows a common identifier to persist across multiple consents that belong to the same logical group — initiated by the same user, for the same service. Used to enable a coherent presentation of consent within Consent Management Interfaces (CMIs)."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-2d9f83ae${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-2d9f83ae${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When to use",
        title: "The four scenarios for a Base Consent ID",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-2d9f83ae${_scopeId}>Consent continuation</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`When a user&#39;s consent has <strong data-v-2d9f83ae${_scopeId2}>expired</strong> (i.e. the <code data-v-2d9f83ae${_scopeId2}>ExpirationDateTime</code> is in the past), but the user wishes to continue using the TPP&#39;s service, the TPP must create a new consent (with a new <code data-v-2d9f83ae${_scopeId2}>consentId</code>) for the same permissions.`);
                } else {
                  return [
                    createTextVNode("When a user's consent has "),
                    createVNode("strong", null, "expired"),
                    createTextVNode(" (i.e. the "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" is in the past), but the user wishes to continue using the TPP's service, the TPP must create a new consent (with a new "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(") for the same permissions.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`To maintain continuity, the TPP should set the <strong data-v-2d9f83ae${_scopeId2}>original <code data-v-2d9f83ae${_scopeId2}>ConsentId</code></strong> as the <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code> for the new consent.`);
                } else {
                  return [
                    createTextVNode("To maintain continuity, the TPP should set the "),
                    createVNode("strong", null, [
                      createTextVNode("original "),
                      createVNode("code", null, "ConsentId")
                    ]),
                    createTextVNode(" as the "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" for the new consent.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Important"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-2d9f83ae${_scopeId2}>If the original consent already had a <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code>, the TPP <strong data-v-2d9f83ae${_scopeId2}>must reuse that same <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code></strong>, not the immediate prior <code data-v-2d9f83ae${_scopeId2}>ConsentId</code>. This ensures the entire chain of consents is consistently linked.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("If the original consent already had a "),
                      createVNode("code", null, "BaseConsentId"),
                      createTextVNode(", the TPP "),
                      createVNode("strong", null, [
                        createTextVNode("must reuse that same "),
                        createVNode("code", null, "BaseConsentId")
                      ]),
                      createTextVNode(", not the immediate prior "),
                      createVNode("code", null, "ConsentId"),
                      createTextVNode(". This ensures the entire chain of consents is consistently linked.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-2d9f83ae${_scopeId}>Consent re-establishment after revocation</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If a user <strong data-v-2d9f83ae${_scopeId2}>revokes</strong> consent and later wants to re-establish access to the TPP&#39;s services, the TPP should create a new consent with the same permissions.`);
                } else {
                  return [
                    createTextVNode("If a user "),
                    createVNode("strong", null, "revokes"),
                    createTextVNode(" consent and later wants to re-establish access to the TPP's services, the TPP should create a new consent with the same permissions.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`As with consent continuation, the TPP should reference the original <code data-v-2d9f83ae${_scopeId2}>ConsentId</code> as the <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code> — or, if applicable, reuse the existing <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code> — to maintain the logical association.`);
                } else {
                  return [
                    createTextVNode("As with consent continuation, the TPP should reference the original "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" as the "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" — or, if applicable, reuse the existing "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" — to maintain the logical association.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-2d9f83ae${_scopeId}>Consent update (permission expansion)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Suppose a user originally grants consent with specific permissions (e.g. <code data-v-2d9f83ae${_scopeId2}>ReadAccountsBasic</code>, <code data-v-2d9f83ae${_scopeId2}>ReadAccountsDetail</code>, <code data-v-2d9f83ae${_scopeId2}>ReadBalances</code>), and the TPP later introduces new functionality (e.g. access to <code data-v-2d9f83ae${_scopeId2}>ReadDirectDebits</code>). If the user opts in to this expanded scope, the TPP should:`);
                } else {
                  return [
                    createTextVNode("Suppose a user originally grants consent with specific permissions (e.g. "),
                    createVNode("code", null, "ReadAccountsBasic"),
                    createTextVNode(", "),
                    createVNode("code", null, "ReadAccountsDetail"),
                    createTextVNode(", "),
                    createVNode("code", null, "ReadBalances"),
                    createTextVNode("), and the TPP later introduces new functionality (e.g. access to "),
                    createVNode("code", null, "ReadDirectDebits"),
                    createTextVNode("). If the user opts in to this expanded scope, the TPP should:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-2d9f83ae${_scopeId2}>Create a new consent with the updated set of permissions</li><li data-v-2d9f83ae${_scopeId2}>Revoke the old consent</li><li data-v-2d9f83ae${_scopeId2}>Link the new consent to the original one by referencing the appropriate <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code></li>`);
                } else {
                  return [
                    createVNode("li", null, "Create a new consent with the updated set of permissions"),
                    createVNode("li", null, "Revoke the old consent"),
                    createVNode("li", null, [
                      createTextVNode("Link the new consent to the original one by referencing the appropriate "),
                      createVNode("code", null, "BaseConsentId")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-2d9f83ae${_scopeId}>User identity consistency</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`It is assumed that all consents linked via a <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code> are associated with the <strong data-v-2d9f83ae${_scopeId2}>same end user</strong>. Therefore, if during authentication the LFI determines that the <code data-v-2d9f83ae${_scopeId2}>userId</code> associated with a newly submitted consent <strong data-v-2d9f83ae${_scopeId2}>differs</strong> from the user who authorised the previous consent in the chain, the LFI <strong data-v-2d9f83ae${_scopeId2}>should reject</strong> the new consent.`);
                } else {
                  return [
                    createTextVNode("It is assumed that all consents linked via a "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" are associated with the "),
                    createVNode("strong", null, "same end user"),
                    createTextVNode(". Therefore, if during authentication the LFI determines that the "),
                    createVNode("code", null, "userId"),
                    createTextVNode(" associated with a newly submitted consent "),
                    createVNode("strong", null, "differs"),
                    createTextVNode(" from the user who authorised the previous consent in the chain, the LFI "),
                    createVNode("strong", null, "should reject"),
                    createTextVNode(" the new consent.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Consent continuation"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("When a user's consent has "),
                  createVNode("strong", null, "expired"),
                  createTextVNode(" (i.e. the "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(" is in the past), but the user wishes to continue using the TPP's service, the TPP must create a new consent (with a new "),
                  createVNode("code", null, "consentId"),
                  createTextVNode(") for the same permissions.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("To maintain continuity, the TPP should set the "),
                  createVNode("strong", null, [
                    createTextVNode("original "),
                    createVNode("code", null, "ConsentId")
                  ]),
                  createTextVNode(" as the "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" for the new consent.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Important"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("If the original consent already had a "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(", the TPP "),
                    createVNode("strong", null, [
                      createTextVNode("must reuse that same "),
                      createVNode("code", null, "BaseConsentId")
                    ]),
                    createTextVNode(", not the immediate prior "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(". This ensures the entire chain of consents is consistently linked.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Consent re-establishment after revocation"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If a user "),
                  createVNode("strong", null, "revokes"),
                  createTextVNode(" consent and later wants to re-establish access to the TPP's services, the TPP should create a new consent with the same permissions.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("As with consent continuation, the TPP should reference the original "),
                  createVNode("code", null, "ConsentId"),
                  createTextVNode(" as the "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" — or, if applicable, reuse the existing "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" — to maintain the logical association.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Consent update (permission expansion)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Suppose a user originally grants consent with specific permissions (e.g. "),
                  createVNode("code", null, "ReadAccountsBasic"),
                  createTextVNode(", "),
                  createVNode("code", null, "ReadAccountsDetail"),
                  createTextVNode(", "),
                  createVNode("code", null, "ReadBalances"),
                  createTextVNode("), and the TPP later introduces new functionality (e.g. access to "),
                  createVNode("code", null, "ReadDirectDebits"),
                  createTextVNode("). If the user opts in to this expanded scope, the TPP should:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Create a new consent with the updated set of permissions"),
                  createVNode("li", null, "Revoke the old consent"),
                  createVNode("li", null, [
                    createTextVNode("Link the new consent to the original one by referencing the appropriate "),
                    createVNode("code", null, "BaseConsentId")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "User identity consistency"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("It is assumed that all consents linked via a "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" are associated with the "),
                  createVNode("strong", null, "same end user"),
                  createTextVNode(". Therefore, if during authentication the LFI determines that the "),
                  createVNode("code", null, "userId"),
                  createTextVNode(" associated with a newly submitted consent "),
                  createVNode("strong", null, "differs"),
                  createTextVNode(" from the user who authorised the previous consent in the chain, the LFI "),
                  createVNode("strong", null, "should reject"),
                  createTextVNode(" the new consent.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "summary",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Summary",
        title: "At a glance",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-2d9f83ae${_scopeId2}><thead data-v-2d9f83ae${_scopeId2}><tr data-v-2d9f83ae${_scopeId2}><th data-v-2d9f83ae${_scopeId2}>Scenario</th><th data-v-2d9f83ae${_scopeId2}>Action</th></tr></thead><tbody data-v-2d9f83ae${_scopeId2}><tr data-v-2d9f83ae${_scopeId2}><td data-v-2d9f83ae${_scopeId2}>Consent expired, user continues service</td><td data-v-2d9f83ae${_scopeId2}>Set original <code data-v-2d9f83ae${_scopeId2}>ConsentId</code> as <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code></td></tr><tr data-v-2d9f83ae${_scopeId2}><td data-v-2d9f83ae${_scopeId2}>Consent revoked, user re-establishes access</td><td data-v-2d9f83ae${_scopeId2}>Set original <code data-v-2d9f83ae${_scopeId2}>ConsentId</code> (or existing <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code>) as <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code></td></tr><tr data-v-2d9f83ae${_scopeId2}><td data-v-2d9f83ae${_scopeId2}>Permissions expanded</td><td data-v-2d9f83ae${_scopeId2}>Create new consent, revoke old, link via <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code></td></tr><tr data-v-2d9f83ae${_scopeId2}><td data-v-2d9f83ae${_scopeId2}>User identity mismatch detected</td><td data-v-2d9f83ae${_scopeId2}>LFI rejects the new consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Scenario"),
                          createVNode("th", null, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent expired, user continues service"),
                          createVNode("td", null, [
                            createTextVNode("Set original "),
                            createVNode("code", null, "ConsentId"),
                            createTextVNode(" as "),
                            createVNode("code", null, "BaseConsentId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent revoked, user re-establishes access"),
                          createVNode("td", null, [
                            createTextVNode("Set original "),
                            createVNode("code", null, "ConsentId"),
                            createTextVNode(" (or existing "),
                            createVNode("code", null, "BaseConsentId"),
                            createTextVNode(") as "),
                            createVNode("code", null, "BaseConsentId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Permissions expanded"),
                          createVNode("td", null, [
                            createTextVNode("Create new consent, revoke old, link via "),
                            createVNode("code", null, "BaseConsentId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "User identity mismatch detected"),
                          createVNode("td", null, "LFI rejects the new consent")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Chain integrity"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-2d9f83ae${_scopeId2}>Always trace back to the <strong data-v-2d9f83ae${_scopeId2}>root</strong> <code data-v-2d9f83ae${_scopeId2}>ConsentId</code> when setting <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code>. Never use the most recent consent in a chain as the <code data-v-2d9f83ae${_scopeId2}>BaseConsentId</code> if it already has one — doing so would break the link back to the original consent.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Always trace back to the "),
                      createVNode("strong", null, "root"),
                      createTextVNode(),
                      createVNode("code", null, "ConsentId"),
                      createTextVNode(" when setting "),
                      createVNode("code", null, "BaseConsentId"),
                      createTextVNode(". Never use the most recent consent in a chain as the "),
                      createVNode("code", null, "BaseConsentId"),
                      createTextVNode(" if it already has one — doing so would break the link back to the original consent.")
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
                        createVNode("th", null, "Scenario"),
                        createVNode("th", null, "Action")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent expired, user continues service"),
                        createVNode("td", null, [
                          createTextVNode("Set original "),
                          createVNode("code", null, "ConsentId"),
                          createTextVNode(" as "),
                          createVNode("code", null, "BaseConsentId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent revoked, user re-establishes access"),
                        createVNode("td", null, [
                          createTextVNode("Set original "),
                          createVNode("code", null, "ConsentId"),
                          createTextVNode(" (or existing "),
                          createVNode("code", null, "BaseConsentId"),
                          createTextVNode(") as "),
                          createVNode("code", null, "BaseConsentId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Permissions expanded"),
                        createVNode("td", null, [
                          createTextVNode("Create new consent, revoke old, link via "),
                          createVNode("code", null, "BaseConsentId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "User identity mismatch detected"),
                        createVNode("td", null, "LFI rejects the new consent")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Chain integrity"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Always trace back to the "),
                    createVNode("strong", null, "root"),
                    createTextVNode(),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" when setting "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(". Never use the most recent consent in a chain as the "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" if it already has one — doing so would break the link back to the original consent.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/consent-identifiers",
              category: "Consents",
              "category-color": "var(--at-teal)",
              title: "Consent Identifiers",
              desc: "Why end user and account IDs patched onto a consent must be opaque."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/on-behalf-of",
              category: "Consents",
              "category-color": "var(--at-teal)",
              title: "OnBehalfOf",
              desc: "When to declare another regulated entity on a data-sharing consent."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/consent-identifiers",
                category: "Consents",
                "category-color": "var(--at-teal)",
                title: "Consent Identifiers",
                desc: "Why end user and account IDs patched onto a consent must be opaque."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/on-behalf-of",
                category: "Consents",
                "category-color": "var(--at-teal)",
                title: "OnBehalfOf",
                desc: "When to declare another regulated entity on a data-sharing consent."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/base-consent-id.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const baseConsentId = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d9f83ae"]]);
export {
  baseConsentId as default
};
