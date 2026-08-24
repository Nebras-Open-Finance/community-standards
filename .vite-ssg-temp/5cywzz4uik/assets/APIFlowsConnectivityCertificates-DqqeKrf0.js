import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition$1 = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    rect rgb(240, 249, 255)
    Note over TPP,LFI: Enc1 — TPP encrypts PII for the LFI.<br/>Enc1 is the LFI's encryption key (LFI holds the private key).<br/>The API Hub passes the encrypted payload through unchanged.
    Note over TPP: Encrypt PII fields with Enc1 (LFI public key).
    TPP->>Hub: Request (PII encrypted with Enc1)
    Hub->>LFI: Request (PII encrypted with Enc1, passed through)
    Note over LFI: Decrypt PII with Enc1 private key.
    LFI-->>Hub: Response
    Hub-->>TPP: Response
    end

    rect rgb(240, 255, 240)
    Note over TPP,LFI: Enc2 — API Hub encrypts webhook events for the TPP.<br/>Enc2 is the TPP's encryption key (TPP holds the private key).<br/>Only applies to webhook event payloads.
    Note over Hub: Encrypt event payload with Enc2 (TPP public key).
    Hub->>TPP: Webhook event (encrypted with Enc2)
    Note over TPP: Decrypt event with Enc2 private key.
    TPP-->>Hub: 200/202 ack
    end
`;
const _sfc_main$1 = {
  __name: "APIFlowsConnectivityEncryption",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition$1,
      "connectivity-encryption-diagram",
      {
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 120,
          width: 220,
          height: 65,
          boxMargin: 20,
          messageMargin: 50,
          noteMargin: 15,
          mirrorActors: false,
          useMaxWidth: true
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConnectivityEncryption.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP,Hub: TPP to API Hub over mTLS.<br/>TPP: C1 transport + Sig1 request signing.<br/>API Hub: S1 transport + Sig2 response signing.
    TPP->>Hub: Request (C1 + Sig1)
    Hub-->>TPP: Response (Sig2)

    rect rgb(240, 249, 255)
    Note over Hub,LFI: API Hub to Ozone Connect over mTLS.<br/>API Hub acts as the C4 client.<br/>API Hub: C4 transport + Sig3 signing.<br/>Ozone Connect: S4 transport + Sig4 signing.<br/>Sig3 and Sig4 only apply with JWT Auth.
    Hub->>LFI: Request (C4 + Sig3)
    LFI-->>Hub: Response (Sig4)
    end

    rect rgb(255, 245, 238)
    Note over LFI,Hub: LFI to API Hub (CM and HH) over mTLS.<br/>LFI acts as the C3-hh-cm-client.<br/>LFI: C3 transport + Sig4 signing.<br/>API Hub: S3 transport + Sig3 signing.<br/>Sig3 and Sig4 only apply with JWT Auth.
    LFI->>Hub: Request (C3 + Sig4)
    Hub-->>LFI: Response (Sig3)
    end
`;
const _sfc_main = {
  __name: "APIFlowsConnectivityCertificates",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "connectivity-certificates-diagram",
      {
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 120,
          width: 220,
          height: 65,
          boxMargin: 20,
          messageMargin: 50,
          noteMargin: 15,
          mirrorActors: false,
          useMaxWidth: true
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConnectivityCertificates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
