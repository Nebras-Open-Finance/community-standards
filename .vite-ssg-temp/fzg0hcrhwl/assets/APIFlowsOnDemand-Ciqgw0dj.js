import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Encrypt PII (Initiation.Creditor[], Initiation.DebtorAccount{}, Risk{})
    Note over TPP: Construct Authorization Details
    Note over TPP: Construct Request JWT (payments openid)
    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /par (urn:openfinanceuae:service-initiation-consent:v2.1)
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

    loop Each on-demand payment
        Note over TPP: Encrypt PII (Initiation.CreditorAccount{}, Initiation.Creditor{}, <br/> Initiation.CreditorAgent{}, Initiation.ConfirmationOfPayeeResponse, Risk{})
        TPP->>+Hub: POST /payments
        Hub->>LFI: POST /payments
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>-TPP: 201 {PaymentId, Status: Pending}

        LFI-->>+Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
        Hub-->>-TPP: POST (Event - Payment Initiation Request) {Status: AcceptedWithoutPosting}

        TPP->>+Hub: GET /payments/{paymentId}
        Hub->>LFI: GET /payments/{paymentId}
        LFI-->>Hub: 200 {Status: AcceptedWithoutPosting}
        Hub-->>-TPP: 200 {Status: AcceptedWithoutPosting}
    end
`;
const _sfc_main = {
  __name: "APIFlowsOnDemand",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "on-demand-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsOnDemand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
