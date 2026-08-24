import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant CAAP as CAAP
    participant LFI as LFI

    TPP->>+Hub: POST /par (authorization_details)
    Hub->>+LFI: POST /consent/actions/validate
    alt status: valid
        LFI-->>-Hub: 200 {status: valid}
        Hub-->>-TPP: 200 {request_uri}
    else status: invalid
        LFI-->>-Hub: 200 {status: invalid, userMessage}
        Hub-->>-TPP: 4xx error; consent not created
        Note over TPP: Journey ends
    end

    TPP-->>Hub: Redirect end user to API Hub authorize URL
    Hub-->>CAAP: Redirect end user to CAAP

    Note over CAAP: End user authenticates via EFR or UAE Pass

    CAAP->>+LFI: POST /users/actions/register/initialize
    Note over CAAP,LFI: Body carries Emirates ID encrypted with the LFI ENC1 public key
    alt LFI issues a challenge
        LFI-->>-CAAP: 200 {providerUserIdentifier.userId, registrationStatus: AwaitingChallengeResponse, challengeId}
        Note over CAAP: end user enters OTP in CAAP
        CAAP->>+LFI: POST /users/actions/register/complete (challengeResponse)
        LFI-->>-CAAP: 200 {registrationStatus: Complete}
    else No challenge
        LFI-->>-CAAP: 200 {providerUserIdentifier.userId, registrationStatus: Complete}
    end

    Note over CAAP,LFI: end user registered; CAAP now builds the authorization page

    alt Bank Data Sharing
        CAAP->>+LFI: GET /accounts (o3-caap-consent-use-case: accounts)
        LFI-->>-CAAP: 200 {every account the end user can share}
    else Bank Service Initiation
        CAAP->>+LFI: GET /accounts (o3-caap-consent-use-case: payments)
        LFI-->>-CAAP: 200 {every account the end user can initiate from}
    else Insurance Data Sharing
        loop For each insurance type in the consent permissions
            CAAP->>+LFI: GET /{type}-insurance-policies
            LFI-->>-CAAP: 200 {every policy the end user can share}
        end
    end

    Note over CAAP: end user reviews and authorizes the consent

    CAAP->>Hub: PATCH /consents/{consentId} (Authorized, accountIds or insurancePolicyIds, psuIdentifiers)
    CAAP->>Hub: POST /auth/{interactionId}/doConfirm
    CAAP-->>TPP: Redirect end user to TPP callback with code + state
`;
const _sfc_main = {
  __name: "APIFlowsCAAPConsent",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "caap-consent-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsCAAPConsent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
