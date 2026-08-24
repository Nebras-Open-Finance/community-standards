import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-0bbbb138><section class="ed-doc__hero" data-v-0bbbb138><div class="ed-doc__inner" data-v-0bbbb138><div class="ed-doc__eyebrow" data-v-0bbbb138><span class="ed-doc__eyebrow-dash" data-v-0bbbb138></span> TPP · Trust Framework · LFI Discovery </div><h1 class="ed-doc__title" data-v-0bbbb138> API Resources <span class="ed-doc__read" data-v-0bbbb138>2 min read</span></h1><p class="ed-doc__lede" data-v-0bbbb138> The API resources hosted on an LFI&#39;s Authorisation Server represent the key resources that are exposed through various endpoints. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-0bbbb138>The format of these endpoints is:</p><ul class="ed-doc__bullets" data-v-0bbbb138><li data-v-0bbbb138><strong data-v-0bbbb138>Production:</strong> <code data-v-0bbbb138>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]</code></li><li data-v-0bbbb138><strong data-v-0bbbb138>Sandbox:</strong> <code data-v-0bbbb138>https://rs1.[LFICode].sandbox.apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]</code></li></ul><p class="ed-doc__lede ed-doc__lede--tight" data-v-0bbbb138> These endpoints are organized into structured categories known as <strong data-v-0bbbb138>API families</strong>. Each API family groups together related functionality, making it easier for TPPs to understand the available services. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "payment",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "API Family",
    title: "payment",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`This family includes endpoints related to initiating and managing payments.`);
            } else {
              return [
                createTextVNode("This family includes endpoints related to initiating and managing payments.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/" data-v-0bbbb138${_scopeId2}>Bank Service Initiation</a> functionality and associated with the <strong data-v-0bbbb138${_scopeId2}>BSIP</strong> role.</li><li data-v-0bbbb138${_scopeId2}>Allowed API scopes: <code data-v-0bbbb138${_scopeId2}>openid payments</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("These endpoints are part of the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                  createTextVNode(" functionality and associated with the "),
                  createVNode("strong", null, "BSIP"),
                  createTextVNode(" role.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Allowed API scopes: "),
                  createVNode("code", null, "openid payments")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-0bbbb138${_scopeId}>Consent Endpoints</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`These endpoints are used to create and manage payment consents.`);
            } else {
              return [
                createTextVNode("These endpoints are used to create and manage payment consents.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>Supported grant type: <code data-v-0bbbb138${_scopeId2}>client_credentials</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported grant type: "),
                  createVNode("code", null, "client_credentials")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Example endpoints:</em>`);
            } else {
              return [
                createVNode("em", null, "Example endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-0bbbb138${_scopeId}>Resource Endpoints</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` These endpoints are used to initiate and retrieve payments, including file-based payments. `);
            } else {
              return [
                createTextVNode(" These endpoints are used to initiate and retrieve payments, including file-based payments. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>authorization_code</code>, <code data-v-0bbbb138${_scopeId2}>refresh_token</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "authorization_code"),
                  createTextVNode(", "),
                  createVNode("code", null, "refresh_token")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Example endpoints:</em>`);
            } else {
              return [
                createVNode("em", null, "Example endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("This family includes endpoints related to initiating and managing payments.")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("These endpoints are part of the "),
                createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                createTextVNode(" functionality and associated with the "),
                createVNode("strong", null, "BSIP"),
                createTextVNode(" role.")
              ]),
              createVNode("li", null, [
                createTextVNode("Allowed API scopes: "),
                createVNode("code", null, "openid payments")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Consent Endpoints"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("These endpoints are used to create and manage payment consents.")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported grant type: "),
                createVNode("code", null, "client_credentials")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Example endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Resource Endpoints"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These endpoints are used to initiate and retrieve payments, including file-based payments. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "authorization_code"),
                createTextVNode(", "),
                createVNode("code", null, "refresh_token")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Example endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "account-information",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "API Family",
    title: "account-information",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc. `);
            } else {
              return [
                createTextVNode(" This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/data-sharing/" data-v-0bbbb138${_scopeId2}>Bank Data Sharing</a> functionality and are associated with the <strong data-v-0bbbb138${_scopeId2}>BDSP</strong> role.</li><li data-v-0bbbb138${_scopeId2}>Allowed API scopes: <code data-v-0bbbb138${_scopeId2}>openid accounts</code></li><li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>authorization_code</code>, <code data-v-0bbbb138${_scopeId2}>refresh_token</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("These endpoints are part of the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                  createTextVNode(" functionality and are associated with the "),
                  createVNode("strong", null, "BDSP"),
                  createTextVNode(" role.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Allowed API scopes: "),
                  createVNode("code", null, "openid accounts")
                ]),
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "authorization_code"),
                  createTextVNode(", "),
                  createVNode("code", null, "refresh_token")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-0bbbb138${_scopeId}>Consent Endpoints</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`These endpoints are used to create and manage account information consents.`);
            } else {
              return [
                createTextVNode("These endpoints are used to create and manage account information consents.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>Supported grant type: <code data-v-0bbbb138${_scopeId2}>client_credentials</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported grant type: "),
                  createVNode("code", null, "client_credentials")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Example endpoints:</em>`);
            } else {
              return [
                createVNode("em", null, "Example endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-0bbbb138${_scopeId}>Resource Endpoints</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`These endpoints are used to retrieve account information.`);
            } else {
              return [
                createTextVNode("These endpoints are used to retrieve account information.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>authorization_code</code>, <code data-v-0bbbb138${_scopeId2}>refresh_token</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "authorization_code"),
                  createTextVNode(", "),
                  createVNode("code", null, "refresh_token")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Example endpoints:</em>`);
            } else {
              return [
                createVNode("em", null, "Example endpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("These endpoints are part of the "),
                createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                createTextVNode(" functionality and are associated with the "),
                createVNode("strong", null, "BDSP"),
                createTextVNode(" role.")
              ]),
              createVNode("li", null, [
                createTextVNode("Allowed API scopes: "),
                createVNode("code", null, "openid accounts")
              ]),
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "authorization_code"),
                createTextVNode(", "),
                createVNode("code", null, "refresh_token")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Consent Endpoints"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("These endpoints are used to create and manage account information consents.")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported grant type: "),
                createVNode("code", null, "client_credentials")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Example endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Resource Endpoints"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("These endpoints are used to retrieve account information.")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "authorization_code"),
                createTextVNode(", "),
                createVNode("code", null, "refresh_token")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Example endpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "confirmation",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "API Family",
    title: "confirmation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments. `);
            } else {
              return [
                createTextVNode(" This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" data-v-0bbbb138${_scopeId2}>Confirmation of Payee</a> functionality and are associated with the <strong data-v-0bbbb138${_scopeId2}>BSIP</strong> role.</li><li data-v-0bbbb138${_scopeId2}>Allowed API scopes: <code data-v-0bbbb138${_scopeId2}>openid payments</code></li><li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>client_credentials</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("These endpoints are part of the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" }, "Confirmation of Payee"),
                  createTextVNode(" functionality and are associated with the "),
                  createVNode("strong", null, "BSIP"),
                  createTextVNode(" role.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Allowed API scopes: "),
                  createVNode("code", null, "openid payments")
                ]),
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "client_credentials")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Resource Endpoint examples:</em>`);
            } else {
              return [
                createVNode("em", null, "Resource Endpoint examples:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("These endpoints are part of the "),
                createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" }, "Confirmation of Payee"),
                createTextVNode(" functionality and are associated with the "),
                createVNode("strong", null, "BSIP"),
                createTextVNode(" role.")
              ]),
              createVNode("li", null, [
                createTextVNode("Allowed API scopes: "),
                createVNode("code", null, "openid payments")
              ]),
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "client_credentials")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Resource Endpoint examples:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "product",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "API Family",
    title: "product",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product. `);
            } else {
              return [
                createTextVNode(" This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>Associated with the <strong data-v-0bbbb138${_scopeId2}>BDSP</strong> role.</li><li data-v-0bbbb138${_scopeId2}>Allowed API scopes: <code data-v-0bbbb138${_scopeId2}>openid accounts</code></li><li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>client_credentials</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Associated with the "),
                  createVNode("strong", null, "BDSP"),
                  createTextVNode(" role.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Allowed API scopes: "),
                  createVNode("code", null, "openid accounts")
                ]),
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "client_credentials")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Resource Endpoint examples:</em>`);
            } else {
              return [
                createVNode("em", null, "Resource Endpoint examples:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products</code></li><li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Associated with the "),
                createVNode("strong", null, "BDSP"),
                createTextVNode(" role.")
              ]),
              createVNode("li", null, [
                createTextVNode("Allowed API scopes: "),
                createVNode("code", null, "openid accounts")
              ]),
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "client_credentials")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Resource Endpoint examples:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "atm",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "API Family",
    title: "atm",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This family includes endpoints related to the discovery of an LFI&#39;s ATM network — locations, services, and accessibility data. `);
            } else {
              return [
                createTextVNode(" This family includes endpoints related to the discovery of an LFI's ATM network — locations, services, and accessibility data. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}>These endpoints are part of the <a href="/tech/tpp-standards/v2.1/banking/atms" data-v-0bbbb138${_scopeId2}>ATMs</a> functionality and are associated with the <strong data-v-0bbbb138${_scopeId2}>BDSP</strong> role.</li><li data-v-0bbbb138${_scopeId2}>Allowed API scopes: <code data-v-0bbbb138${_scopeId2}>atm</code></li><li data-v-0bbbb138${_scopeId2}>Supported grant types: <code data-v-0bbbb138${_scopeId2}>client_credentials</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("These endpoints are part of the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/atms" }, "ATMs"),
                  createTextVNode(" functionality and are associated with the "),
                  createVNode("strong", null, "BDSP"),
                  createTextVNode(" role.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Allowed API scopes: "),
                  createVNode("code", null, "atm")
                ]),
                createVNode("li", null, [
                  createTextVNode("Supported grant types: "),
                  createVNode("code", null, "client_credentials")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<em data-v-0bbbb138${_scopeId2}>Resource Endpoint examples:</em>`);
            } else {
              return [
                createVNode("em", null, "Resource Endpoint examples:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0bbbb138${_scopeId2}><code data-v-0bbbb138${_scopeId2}>https://rs1.[LFICode].apihub.openfinance.ae/open-finance/atm/[Version]/atms</code></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/atm/[Version]/atms")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This family includes endpoints related to the discovery of an LFI's ATM network — locations, services, and accessibility data. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("These endpoints are part of the "),
                createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/atms" }, "ATMs"),
                createTextVNode(" functionality and are associated with the "),
                createVNode("strong", null, "BDSP"),
                createTextVNode(" role.")
              ]),
              createVNode("li", null, [
                createTextVNode("Allowed API scopes: "),
                createVNode("code", null, "atm")
              ]),
              createVNode("li", null, [
                createTextVNode("Supported grant types: "),
                createVNode("code", null, "client_credentials")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("em", null, "Resource Endpoint examples:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/atm/[Version]/atms")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/api-resources.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiResources = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0bbbb138"]]);
export {
  apiResources as default
};
