import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
flowchart LR
    TPP["TPP"]
    HubA["API Hub — A"]
    LFIA["LFI (Ozone Connect API) - A"]
    HubB["API Hub — B"]
    LFIB["LFI (Ozone Connect API) - B"]
    HubC["API Hub — N"]
    LFIC["LFI (Ozone Connect API) - N"]

    TPP --> HubA --> LFIA
    TPP --> HubB --> LFIB
    TPP --> HubC --> LFIC
`;
const _sfc_main = {
  __name: "APIFlowsAPIHubArchitecture",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "api-hub-architecture",
      { flowchart: { useMaxWidth: true, htmlLabels: true, curve: "basis" } }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsAPIHubArchitecture.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
