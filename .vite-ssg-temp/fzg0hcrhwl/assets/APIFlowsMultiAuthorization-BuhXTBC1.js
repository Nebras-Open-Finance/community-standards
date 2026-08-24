import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Construct Authorization Details (IsSingleAuthorization=false)
    TPP->>+Hub: POST /par (service-initiation-consent)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri, expires_in}

    TPP-->>LFI: Redirect user to LFI Auth URL

    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note over LFI: User 1 authenticates & authorizes consent

    LFI->>Hub: PATCH /consents/{consentId}\\nStatus=AwaitingAuthorization\\nMeta.MultipleAuthorizers
    LFI->>Hub: POST /auth/{interactionId}/doConfirm
    LFI-->>TPP: Redirect to callback (code, state, iss)

    TPP->>+Hub: POST /token (code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token + consent Status=AwaitingAuthorization}

    loop Additional authorizers
        alt Approval
            LFI->>Hub: PATCH /consents/{consentId}\\nupdate Authorizations[]
        else Rejection
            LFI->>Hub: PATCH /consents/{consentId}\\nStatus=Rejected
        end
    end

    Hub-->>TPP: Event / GET /payment-consents/{ConsentId}\\nStatus=Authorized
    TPP->>+Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
     Hub-->>-TPP: 201 {PaymentId, Status: Pending}
`;
const _sfc_main = {
  __name: "APIFlowsMultiAuthorization",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "multi-auth-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsMultiAuthorization.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
