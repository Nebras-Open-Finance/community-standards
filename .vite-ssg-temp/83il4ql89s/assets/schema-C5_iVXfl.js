import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { _ as __unplugin_components_0 } from "./EndpointPage-BtLubFvo.js";
import { _ as __vite_glob_0_1, a as __vite_glob_0_0 } from "./par-file-payment-schema-D18yYJ10.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "schema",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "OFP-001 · Bulk/Batch payment schema (draft)" });
    const sources = /* @__PURE__ */ Object.assign({ "./bulk-payment-schema.yaml": __vite_glob_0_0, "./par-file-payment-schema.yaml": __vite_glob_0_1 });
    const spec = sources["./bulk-payment-schema.yaml"] ?? "";
    function downloadYaml() {
      if (typeof document === "undefined") return;
      const blob = new Blob([spec], { type: "application/yaml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ofp-001-bulk-payment-schema.yaml";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0;
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_RedocWrapper = _sfc_main$1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: "OFP-001 · Draft schema",
        title: "Bulk/Batch payment schema",
        version: "Draft · V2.2",
        method: "POST",
        path: "/file-payments"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ofp-schema-toolbar" data-v-bbc51f3d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: "/proposals/ofp-001",
              class: "ofp-schema-back"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span aria-hidden="true" data-v-bbc51f3d${_scopeId2}>←</span> Back to OFP-001 `);
                } else {
                  return [
                    createVNode("span", { "aria-hidden": "true" }, "←"),
                    createTextVNode(" Back to OFP-001 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="button" class="ofp-schema-download" data-v-bbc51f3d${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bbc51f3d${_scopeId}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bbc51f3d${_scopeId}></path><polyline points="7 10 12 15 17 10" data-v-bbc51f3d${_scopeId}></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bbc51f3d${_scopeId}></line></svg> Download .yaml </button></div>`);
            _push2(ssrRenderComponent(_component_RedocWrapper, {
              "spec-text": unref(spec),
              "override-servers": [],
              "hide-security": "",
              "container-id": "redoc-ofp001-bulk"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ofp-schema-toolbar" }, [
                createVNode(_component_RouterLink, {
                  to: "/proposals/ofp-001",
                  class: "ofp-schema-back"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { "aria-hidden": "true" }, "←"),
                    createTextVNode(" Back to OFP-001 ")
                  ]),
                  _: 1
                }),
                createVNode("button", {
                  type: "button",
                  class: "ofp-schema-download",
                  onClick: downloadYaml
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                    createVNode("polyline", { points: "7 10 12 15 17 10" }),
                    createVNode("line", {
                      x1: "12",
                      y1: "15",
                      x2: "12",
                      y2: "3"
                    })
                  ])),
                  createTextVNode(" Download .yaml ")
                ])
              ]),
              createVNode(_component_RedocWrapper, {
                "spec-text": unref(spec),
                "override-servers": [],
                "hide-security": "",
                "container-id": "redoc-ofp001-bulk"
              }, null, 8, ["spec-text"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-001/schema.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const schema = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbc51f3d"]]);
export {
  schema as default
};
