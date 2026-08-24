import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const _sfc_main = {
  __name: "APIFlowsConfirmationOfPayee",
  __ssrInlineRender: true,
  props: {
    /** Documentation version of the page rendering the diagram, e.g. 'v2.2-rc1'. */
    version: { type: String, default: "v2.1" }
  },
  setup(__props) {
    const props = __props;
    const flattened = props.version !== "v2.1";
    const confirmationLegs = flattened ? `    TPP->>+Hub: POST /confirmation (application/jwt) { IBAN, submitted name }
    Hub->>+LFI: POST /customers/action/cop-query (IBAN only, routed by IBAN prefix)
    Note over LFI: No matching at the LFI:<br/>return every holder, unranked
    LFI-->>-Hub: 200 { data[].name }
    Note over Hub: Hub matches the submitted name<br/>against every entry in data` : `    TPP->>+Hub: POST /confirmation (application/jwt)
    Hub->>+LFI: POST /customers/action/cop-query (routed by IBAN prefix)
    LFI-->>-Hub: { verifiedClaims.claims.fullName }`;
    const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    Note over TPP: Sign /discovery request as JWT
    TPP->>+Hub: POST /discovery (application/jwt)
    Hub-->>-TPP: 200 { DiscoveryEndpointUrl, ResourceServerUrl  } (application/jwt)

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    Note over TPP: Sign /confirmation request as JWT
${confirmationLegs}
    Hub-->>-TPP: 200 { NameMatchIndicator } (application/jwt)
`;
    const idPrefix = `cop-diagram-${props.version.replace(/[^a-z0-9]+/gi, "-")}`;
    useMermaidDiagram(mermaidDefinition, idPrefix);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsConfirmationOfPayee.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
