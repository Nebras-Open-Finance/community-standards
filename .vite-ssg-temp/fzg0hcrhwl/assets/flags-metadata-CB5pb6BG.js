import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const flagsExample = `"Flags": {
  "AccountType": [
    "Retail"
  ]
}`;
const metadataExample = `"ApiMetadata": {
  "AccountSubType": [
    "CurrentAccount",
    "Savings",
    "CreditCard"
  ],
  "OverLimitFees": "0.01"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "flags-metadata",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3bcd4745><section class="ed-doc__hero" data-v-3bcd4745><div class="ed-doc__inner" data-v-3bcd4745><div class="ed-doc__eyebrow" data-v-3bcd4745><span class="ed-doc__eyebrow-dash" data-v-3bcd4745></span> TPP · Trust Framework · LFI Discovery </div><h1 class="ed-doc__title" data-v-3bcd4745> Flags &amp; Meta Data <span class="ed-doc__read" data-v-3bcd4745>2 min read</span></h1><p class="ed-doc__lede" data-v-3bcd4745> Flags and API metadata returned alongside <code data-v-3bcd4745>/participants</code> let TPPs filter, select, and drive business logic on top of the LFIs and API families published in the Trust Framework Directory. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "flags",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Flags",
        title: "Additional attributes on Organisations and Authorisation Servers",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Flags provide additional attributes about an Organisation or Authorisation Server within the <code data-v-3bcd4745${_scopeId2}>/participants</code> response. `);
                } else {
                  return [
                    createTextVNode(" Flags provide additional attributes about an Organisation or Authorisation Server within the "),
                    createVNode("code", null, "/participants"),
                    createTextVNode(" response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Example:`);
                } else {
                  return [
                    createTextVNode("Example:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: flagsExample,
              lang: "json",
              filename: "Flags excerpt"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This example indicates that the Authorisation Server supports Retail account types only. Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME) account types are not supported by this server. `);
                } else {
                  return [
                    createTextVNode(" This example indicates that the Authorisation Server supports Retail account types only. Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME) account types are not supported by this server. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs should use flags to apply filtering and implement business logic decisions during participant selection and integration. `);
                } else {
                  return [
                    createTextVNode(" TPPs should use flags to apply filtering and implement business logic decisions during participant selection and integration. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Flags provide additional attributes about an Organisation or Authorisation Server within the "),
                  createVNode("code", null, "/participants"),
                  createTextVNode(" response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Example:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: flagsExample,
                lang: "json",
                filename: "Flags excerpt"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This example indicates that the Authorisation Server supports Retail account types only. Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME) account types are not supported by this server. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs should use flags to apply filtering and implement business logic decisions during participant selection and integration. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "api-metadata",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Meta Data",
        title: "Per-API attributes for filtering, fees, and conditional logic",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each <code data-v-3bcd4745${_scopeId2}>ApiResources</code> object may include an <code data-v-3bcd4745${_scopeId2}>ApiMetadata</code> section, which provides additional information about the API that TPPs can use for business logic, filtering, or display purposes. `);
                } else {
                  return [
                    createTextVNode(" Each "),
                    createVNode("code", null, "ApiResources"),
                    createTextVNode(" object may include an "),
                    createVNode("code", null, "ApiMetadata"),
                    createTextVNode(" section, which provides additional information about the API that TPPs can use for business logic, filtering, or display purposes. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Example:`);
                } else {
                  return [
                    createTextVNode("Example:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: metadataExample,
              lang: "json",
              filename: "ApiMetadata excerpt"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This example indicates that the account-information API family supports the account subtypes <code data-v-3bcd4745${_scopeId2}>CurrentAccount</code>, <code data-v-3bcd4745${_scopeId2}>Savings</code>, and <code data-v-3bcd4745${_scopeId2}>CreditCard</code>, and that data sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for this API family. `);
                } else {
                  return [
                    createTextVNode(" This example indicates that the account-information API family supports the account subtypes "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(", "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(", and "),
                    createVNode("code", null, "CreditCard"),
                    createTextVNode(", and that data sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for this API family. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`TPPs can leverage <code data-v-3bcd4745${_scopeId2}>ApiMetadata</code> to:`);
                } else {
                  return [
                    createTextVNode("TPPs can leverage "),
                    createVNode("code", null, "ApiMetadata"),
                    createTextVNode(" to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-3bcd4745${_scopeId2}>Filter available APIs by account types or product subtypes.</li><li data-v-3bcd4745${_scopeId2}>Calculate or display applicable data sharing fees to end-users.</li><li data-v-3bcd4745${_scopeId2}>Apply conditional business logic based on API capabilities.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Filter available APIs by account types or product subtypes."),
                    createVNode("li", null, "Calculate or display applicable data sharing fees to end-users."),
                    createVNode("li", null, "Apply conditional business logic based on API capabilities.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each "),
                  createVNode("code", null, "ApiResources"),
                  createTextVNode(" object may include an "),
                  createVNode("code", null, "ApiMetadata"),
                  createTextVNode(" section, which provides additional information about the API that TPPs can use for business logic, filtering, or display purposes. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Example:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: metadataExample,
                lang: "json",
                filename: "ApiMetadata excerpt"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This example indicates that the account-information API family supports the account subtypes "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(", "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(", and "),
                  createVNode("code", null, "CreditCard"),
                  createTextVNode(", and that data sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for this API family. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("TPPs can leverage "),
                  createVNode("code", null, "ApiMetadata"),
                  createTextVNode(" to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Filter available APIs by account types or product subtypes."),
                  createVNode("li", null, "Calculate or display applicable data sharing fees to end-users."),
                  createVNode("li", null, "Apply conditional business logic based on API capabilities.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/flags-metadata.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const flagsMetadata = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bcd4745"]]);
export {
  flagsMetadata as default
};
