import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /par (authorization_details)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri + expires_in}

    TPP-->>LFI: Redirect customer to LFI Auth URL

    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note over LFI: User authenticates & authorizes consent
    LFI->>Hub: PATCH /consent/{consentId}
    LFI->>Hub: POST /auth/{interactionId}/doConfirm

    LFI-->>TPP: Redirect to TPP callback with code + state + iss

    TPP->>+Hub: POST /token (authorization_code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token}

    alt Bank Data Sharing
        TPP->>+Hub: GET /account-access-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    else Bank Service Initiation
        TPP->>+Hub: GET /payment-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    else Insurance Data Sharing
        TPP->>+Hub: GET /insurance-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    end
`;
const _sfc_main = {
  __name: "APIFlowsConsentFlow",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "consent-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConsentFlow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
