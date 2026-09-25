import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-BRjrby73.js";
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant LFI as LFI (channel)
    participant ICP as BPIP
    participant Hub as API Hub

    Note over PSU,LFI: Out of band — LFI channel, no Open Finance API
    PSU->>LFI: Requests BioPay registration
    LFI->>ICP: Identity verification
    ICP-->>LFI: Verified identity + ICP user id
    LFI->>LFI: Bind ICP user id to customer record
    LFI->>PSU: Select payment rail (AANI, CBDC, Jaywan, ...)
    PSU-->>LFI: Selects instrument + default

    Note over LFI,Hub: Into Open Finance — C3 (mTLS and application_auth)
    LFI->>Hub: Post completed registration
    Hub->>Hub: Store ICP user id → LFI → instrument(s)
    Hub-->>LFI: 201 {RegistrationId}

    Hub->>ICP: POST registration event (signed + encrypted JWT)<br/>Meta {EventType, RegistrationId} · Data as discovery
    ICP-->>Hub: 202 Accepted
    Note over ICP: Retains DiscoveryEndpointUrl and ResourceServerUrl —<br/>needed to address token, discovery and payment calls
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BpRegistrationFlow",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "biopay-registration-flow"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/biopay/BpRegistrationFlow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
