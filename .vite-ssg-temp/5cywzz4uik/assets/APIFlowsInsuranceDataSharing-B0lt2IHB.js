import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Construct Authorization Details
    Note over TPP: Construct Request JWT (openid insurance)
    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /par (urn:openfinanceuae:insurance-consent:v2.1)
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

    LFI-->>TPP: Redirect customer to TPP callback with code

    TPP->>+Hub: POST /token (authorization_code)
    Hub-->>-TPP: {access_token + refresh_token + consent}

    TPP->>+Hub: GET /{type}-insurance-policies
    Hub->>LFI: GET /{type}-insurance-policies
    LFI-->>Hub: 200 {Policy[]}
    Hub-->>-TPP: 200 {Policy[]}
    TPP->>+Hub: GET /{type}-insurance-policies/{InsurancePolicyId}
    Hub->>LFI: GET /{type}-insurance-policies/{InsurancePolicyId}
    LFI-->>Hub: 200 {Policy}
    Hub-->>-TPP: 200 {Policy}

    TPP->>+Hub: POST /token (refresh_token)
    Hub-->>-TPP: {access_token + refresh_token + consent}
    TPP->>+Hub: GET /{type}-insurance-policies/{InsurancePolicyId}
    Hub->>LFI: GET /{type}-insurance-policies/{InsurancePolicyId}
    LFI-->>Hub: 200 {Policy}
    Hub-->>-TPP: 200 {Policy}
`;
const _sfc_main = {
  __name: "APIFlowsInsuranceDataSharing",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "insurance-data-sharing-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsInsuranceDataSharing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
