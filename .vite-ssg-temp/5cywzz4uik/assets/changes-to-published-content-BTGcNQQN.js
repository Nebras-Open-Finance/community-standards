import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { defineComponent, mergeProps, useSSRContext, withCtx, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ErrataNotice",
  __ssrInlineRender: true,
  props: {
    affected: { type: Boolean, default: false },
    errataId: { default: "" },
    errataUrl: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["errata-block", { "errata-affected": __props.affected }],
        role: "note",
        "aria-live": "polite"
      }, _attrs))} data-v-d2e17dfe>`);
      if (__props.affected && __props.errataId && __props.errataUrl) {
        _push(`<div class="errata-banner" data-v-d2e17dfe><strong data-v-d2e17dfe>This section has been modified by Errata ${ssrInterpolate(__props.errataId)}.</strong><a${ssrRenderAttr("href", __props.errataUrl)} target="_blank" rel="noopener noreferrer" class="errata-link" data-v-d2e17dfe> View Errata </a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="errata-content" data-v-d2e17dfe>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/ErrataNotice.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d2e17dfe"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "changes-to-published-content",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "purpose", label: "Purpose" },
      { id: "published", label: "Published" },
      { id: "unpublished", label: "Unpublished" },
      { id: "governance", label: "Governance" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Read", value: "2 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdBullets = __unplugin_components_5;
      const _component_ErrataNotice = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-77451846>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Govern · Operate · Evolve",
        title: "Changes to Published Documentation Policy",
        meta,
        lede: "Defines how published documentation may be changed. Applies to <strong>TPP — Open Finance Standards</strong> and <strong>LFI — Integration Guide</strong>. Read alongside the <a href='/policy/version-management'>Version Management Policy</a>."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "purpose",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Purpose",
        title: "Why this policy exists",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This policy defines how published documentation may be changed for <strong data-v-77451846${_scopeId2}>TPP — Open Finance Standards</strong> and <strong data-v-77451846${_scopeId2}>LFI — Integration Guide</strong>, ensuring that every post-publication change is traceable, auditable, and surfaced to readers.`);
                } else {
                  return [
                    createTextVNode("This policy defines how published documentation may be changed for "),
                    createVNode("strong", null, "TPP — Open Finance Standards"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "LFI — Integration Guide"),
                    createTextVNode(", ensuring that every post-publication change is traceable, auditable, and surfaced to readers.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This policy defines how published documentation may be changed for "),
                  createVNode("strong", null, "TPP — Open Finance Standards"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "LFI — Integration Guide"),
                  createTextVNode(", ensuring that every post-publication change is traceable, auditable, and surfaced to readers.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "published",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Published versions",
        title: "Errata-only after publication",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-77451846${_scopeId2}>For any <strong data-v-77451846${_scopeId2}>published</strong> documentation version, content may only be changed through a formally published <strong data-v-77451846${_scopeId2}>Errata</strong>.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("For any "),
                      createVNode("strong", null, "published"),
                      createTextVNode(" documentation version, content may only be changed through a formally published "),
                      createVNode("strong", null, "Errata"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-77451846${_scopeId2}>This applies to all normative and implementation-impacting content in published versions</li><li data-v-77451846${_scopeId2}>Any correction or clarification made after publication must be traceable to a specific Errata identifier</li><li data-v-77451846${_scopeId2}>The affected page or section should clearly display that it has been modified by Errata</li>`);
                } else {
                  return [
                    createVNode("li", null, "This applies to all normative and implementation-impacting content in published versions"),
                    createVNode("li", null, "Any correction or clarification made after publication must be traceable to a specific Errata identifier"),
                    createVNode("li", null, "The affected page or section should clearly display that it has been modified by Errata")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-77451846${_scopeId}>Errata example</h3>`);
            _push2(ssrRenderComponent(_component_ErrataNotice, {
              affected: true,
              "errata-id": "v2.1-001",
              "errata-url": "/tech/release-notes-and-erratas/erratas/v2.1/"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 data-v-77451846${_scopeId2}>Consent State Transitions</h3><p data-v-77451846${_scopeId2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p data-v-77451846${_scopeId2}>Original content that now no longer applies as the Errata clearly says their is new content that supersedes this.</p><p data-v-77451846${_scopeId2}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`);
                } else {
                  return [
                    createVNode("h3", null, "Consent State Transitions"),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),
                    createVNode("p", null, "Original content that now no longer applies as the Errata clearly says their is new content that supersedes this."),
                    createVNode("p", null, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("For any "),
                    createVNode("strong", null, "published"),
                    createTextVNode(" documentation version, content may only be changed through a formally published "),
                    createVNode("strong", null, "Errata"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "This applies to all normative and implementation-impacting content in published versions"),
                  createVNode("li", null, "Any correction or clarification made after publication must be traceable to a specific Errata identifier"),
                  createVNode("li", null, "The affected page or section should clearly display that it has been modified by Errata")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Errata example"),
              createVNode(_component_ErrataNotice, {
                affected: true,
                "errata-id": "v2.1-001",
                "errata-url": "/tech/release-notes-and-erratas/erratas/v2.1/"
              }, {
                default: withCtx(() => [
                  createVNode("h3", null, "Consent State Transitions"),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),
                  createVNode("p", null, "Original content that now no longer applies as the Errata clearly says their is new content that supersedes this."),
                  createVNode("p", null, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "unpublished",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Non-published versions",
        title: "Updated freely until published",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For <strong data-v-77451846${_scopeId2}>non-published</strong> versions (for example <code data-v-77451846${_scopeId2}>v3.1-rc</code> or <code data-v-77451846${_scopeId2}>v3.1-rc-final</code>), content may be updated without issuing an Errata.`);
                } else {
                  return [
                    createTextVNode("For "),
                    createVNode("strong", null, "non-published"),
                    createTextVNode(" versions (for example "),
                    createVNode("code", null, "v3.1-rc"),
                    createTextVNode(" or "),
                    createVNode("code", null, "v3.1-rc-final"),
                    createTextVNode("), content may be updated without issuing an Errata.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-77451846${_scopeId2}>These versions remain draft / pre-publication artifacts</li><li data-v-77451846${_scopeId2}>Normal review and approval controls still apply</li><li data-v-77451846${_scopeId2}>Once the version is published, post-publication changes <strong data-v-77451846${_scopeId2}>must</strong> follow the Errata process</li>`);
                } else {
                  return [
                    createVNode("li", null, "These versions remain draft / pre-publication artifacts"),
                    createVNode("li", null, "Normal review and approval controls still apply"),
                    createVNode("li", null, [
                      createTextVNode("Once the version is published, post-publication changes "),
                      createVNode("strong", null, "must"),
                      createTextVNode(" follow the Errata process")
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
                  createTextVNode("For "),
                  createVNode("strong", null, "non-published"),
                  createTextVNode(" versions (for example "),
                  createVNode("code", null, "v3.1-rc"),
                  createTextVNode(" or "),
                  createVNode("code", null, "v3.1-rc-final"),
                  createTextVNode("), content may be updated without issuing an Errata.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "These versions remain draft / pre-publication artifacts"),
                  createVNode("li", null, "Normal review and approval controls still apply"),
                  createVNode("li", null, [
                    createTextVNode("Once the version is published, post-publication changes "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" follow the Errata process")
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
        id: "governance",
        num: "04",
        color: "var(--at-teal-deep)",
        eyebrow: "Governance",
        title: "Who enforces this policy",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.`);
                } else {
                  return [
                    createTextVNode("Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related policies"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/version-management",
              category: "Nebras",
              title: "Version Management Policy",
              desc: "The version cadence within which Errata operate."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/lfi-deprecation",
              category: "Nebras",
              title: "Major Version Deprecation Policy",
              desc: "How major versions are retired after publication."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/version-management",
                category: "Nebras",
                title: "Version Management Policy",
                desc: "The version cadence within which Errata operate."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/lfi-deprecation",
                category: "Nebras",
                title: "Major Version Deprecation Policy",
                desc: "How major versions are retired after publication."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/changes-to-published-content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const changesToPublishedContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77451846"]]);
export {
  changesToPublishedContent as default
};
