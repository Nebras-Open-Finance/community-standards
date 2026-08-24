import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition$1 = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    rect rgb(240, 249, 255)
    Note over TPP,LFI: Consent Created
    TPP->>+Hub: POST /par (authorization_details)
    Note over Hub: Consent created
    Hub->>+LFI: POST /consent/event/post
    Note over LFI: Store consent locally
    LFI-->>-Hub: 204 No Content
    Hub-->>-TPP: 200 { request_uri }
    end

    rect rgb(255, 245, 238)
    Note over TPP,LFI: Consent Updated
    TPP->>+Hub: PATCH /account-access-consents/{ConsentId} {Status: Revoked}
    Note over Hub: Consent status → Revoked
    Hub->>+LFI: POST /consent/event/patch
    Note over LFI: Update local consent record
    LFI-->>-Hub: 204 No Content
    Hub-->>-TPP: 204 No Content
    end
`;
const _sfc_main$1 = {
  __name: "APIFlowsConsentEventLFI",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition$1, "consent-event-lfi-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConsentEventLFI.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /par (authorization_details)
    Hub->>+LFI: POST /consent/action/validate
    alt status: valid
        LFI-->>-Hub: 200 { status: "valid" }
        Note over Hub: Consent created
        Hub-->>TPP: 200 { request_uri }
    else status: invalid
        LFI-->>Hub: 200 { status: "invalid" }
        Note over Hub: Consent NOT created
        Hub-->>-TPP: Error returned to TPP
    end
`;
const _sfc_main = {
  __name: "APIFlowsConsentValidate",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "consent-validate-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConsentValidate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
