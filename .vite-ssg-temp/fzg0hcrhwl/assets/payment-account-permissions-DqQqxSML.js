import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const requestExample = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": { /* payment schedule */ },
      "PersonalIdentifiableInformation": "{{encryptedPII}}",
      "PaymentPurposeCode": "ACM"
    }
  }
]`;
const scopeUpdateNode = `const requestJWT = await buildRequestJWT({
  scope: 'accounts payments openid',  // changed from 'payments openid'
  codeChallenge,
  authorizationDetails,
})`;
const scopeUpdatePython = `request_jwt = build_request_jwt(
    scope="accounts payments openid",  # changed from "payments openid"
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)`;
const accountsCallNode = `const { Data: { Account: accounts } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

const accountId = accounts[0].AccountId`;
const accountsCallPython = `import httpx

accounts = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Account"]

account_id = accounts[0]["AccountId"]`;
const accountDetailCallNode = `const { Data: { Account: [account] } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts/\${accountId}\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

// account.Account[0].Identification — the IBAN`;
const accountDetailCallPython = `account = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Account"][0]

# account["Account"][0]["Identification"] — the IBAN`;
const balancesCallNode = `const { Data: { Balance } } = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/accounts/\${accountId}/balances\`,
  { headers: { Authorization: \`Bearer \${access_token}\` } }
).then(r => r.json())

// Balance[0].Amount.Amount — available balance
// Balance[0].CreditDebitIndicator — 'Credit' or 'Debit'`;
const balancesCallPython = `balance = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}/balances",
    headers={"Authorization": f"Bearer {access_token}"},
).json()["Data"]["Balance"]

# balance[0]["Amount"]["Amount"] — available balance
# balance[0]["CreditDebitIndicator"] — 'Credit' or 'Debit'`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payment-account-permissions",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "why", label: "Why include" },
      { id: "available", label: "Available perms" },
      { id: "scope", label: "Scope impact" },
      { id: "request", label: "Requesting" },
      { id: "calling", label: "Calling endpoints" },
      { id: "relationship", label: "vs Data Sharing" }
    ];
    const meta = [
      { label: "Category", value: "Payments" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Payments", "Permissions", "Account Data"];
    const scopeUpdateTabs = [{ label: "Node.js", lang: "typescript", code: scopeUpdateNode }, { label: "Python", lang: "python", code: scopeUpdatePython }];
    const accountsCallTabs = [{ label: "Node.js", lang: "typescript", code: accountsCallNode }, { label: "Python", lang: "python", code: accountsCallPython }];
    const accountDetailCallTabs = [{ label: "Node.js", lang: "typescript", code: accountDetailCallNode }, { label: "Python", lang: "python", code: accountDetailCallPython }];
    const balancesCallTabs = [{ label: "Node.js", lang: "typescript", code: balancesCallNode }, { label: "Python", lang: "python", code: balancesCallPython }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-625e38fc>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Account Permissions in a Payment Consent",
        meta,
        lede: "A payment consent can optionally include a small set of account-reading permissions. Allows a TPP to read the payer's account details and balance using the <strong>same access token</strong> issued for the payment — without creating a separate <a href='/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/'>Bank Data Sharing</a> consent."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-625e38fc${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-625e38fc${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Why include them",
        title: "What account access enables during a payment flow",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`During a payment flow the TPP typically needs to:`);
                } else {
                  return [
                    createTextVNode("During a payment flow the TPP typically needs to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-625e38fc${_scopeId2}><strong data-v-625e38fc${_scopeId2}>Display the payer&#39;s debit account</strong> — the user should be able to confirm which account they are paying from before authorizing.</li><li data-v-625e38fc${_scopeId2}><strong data-v-625e38fc${_scopeId2}>Show the available balance</strong> — helps the user check they have sufficient funds before approving the payment.</li><li data-v-625e38fc${_scopeId2}><strong data-v-625e38fc${_scopeId2}>Pre-fill the debit account</strong> — some UX patterns let the user pick an account; <code data-v-625e38fc${_scopeId2}>ReadAccountsBasic</code> provides the list.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Display the payer's debit account"),
                      createTextVNode(" — the user should be able to confirm which account they are paying from before authorizing.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Show the available balance"),
                      createTextVNode(" — helps the user check they have sufficient funds before approving the payment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Pre-fill the debit account"),
                      createTextVNode(" — some UX patterns let the user pick an account; "),
                      createVNode("code", null, "ReadAccountsBasic"),
                      createTextVNode(" provides the list.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment — it cannot call any account endpoints.`);
                } else {
                  return [
                    createTextVNode("Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment — it cannot call any account endpoints.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("During a payment flow the TPP typically needs to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Display the payer's debit account"),
                    createTextVNode(" — the user should be able to confirm which account they are paying from before authorizing.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Show the available balance"),
                    createTextVNode(" — helps the user check they have sufficient funds before approving the payment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Pre-fill the debit account"),
                    createTextVNode(" — some UX patterns let the user pick an account; "),
                    createVNode("code", null, "ReadAccountsBasic"),
                    createTextVNode(" provides the list.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment — it cannot call any account endpoints.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "available",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Available permissions",
        title: "Three reads, one refund-routing extra",
        lede: "These three permissions are the only account-reading permissions available on a payment consent. They are a <strong>small subset</strong> of the full set available in a Bank Data Sharing consent.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-625e38fc${_scopeId2}><thead data-v-625e38fc${_scopeId2}><tr data-v-625e38fc${_scopeId2}><th data-v-625e38fc${_scopeId2}>Permission</th><th data-v-625e38fc${_scopeId2}>Endpoint unlocked</th><th data-v-625e38fc${_scopeId2}>What it returns</th></tr></thead><tbody data-v-625e38fc${_scopeId2}><tr data-v-625e38fc${_scopeId2}><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>ReadAccountsBasic</code></td><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>GET /accounts</code></td><td data-v-625e38fc${_scopeId2}>List of accounts with basic metadata (account type, currency, nickname). Does <strong data-v-625e38fc${_scopeId2}>not</strong> include the full account number or IBAN.</td></tr><tr data-v-625e38fc${_scopeId2}><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>ReadAccountsDetail</code></td><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>GET /accounts/{AccountId}</code></td><td data-v-625e38fc${_scopeId2}>Full account record including the IBAN/account identification. Requires <code data-v-625e38fc${_scopeId2}>ReadAccountsBasic</code> to first retrieve an <code data-v-625e38fc${_scopeId2}>AccountId</code>.</td></tr><tr data-v-625e38fc${_scopeId2}><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>ReadBalances</code></td><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>GET /accounts/{AccountId}/balances</code></td><td data-v-625e38fc${_scopeId2}>Current balance for a specific account (available balance, credit/debit indicator, and currency).</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Permission"),
                          createVNode("th", null, "Endpoint unlocked"),
                          createVNode("th", null, "What it returns")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadAccountsBasic")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "GET /accounts")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("List of accounts with basic metadata (account type, currency, nickname). Does "),
                            createVNode("strong", null, "not"),
                            createTextVNode(" include the full account number or IBAN.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadAccountsDetail")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "GET /accounts/{AccountId}")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Full account record including the IBAN/account identification. Requires "),
                            createVNode("code", null, "ReadAccountsBasic"),
                            createTextVNode(" to first retrieve an "),
                            createVNode("code", null, "AccountId"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadBalances")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "GET /accounts/{AccountId}/balances")
                          ]),
                          createVNode("td", null, "Current balance for a specific account (available balance, credit/debit indicator, and currency).")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-625e38fc${_scopeId2}>ReadRefundAccount</code> is a fourth permission on a payment consent. It unlocks <code data-v-625e38fc${_scopeId2}>GET /payment-consents/{ConsentId}/refund</code> and is used to retrieve account details for routing a refund — it is not an account-reading permission in the same sense.`);
                } else {
                  return [
                    createVNode("code", null, "ReadRefundAccount"),
                    createTextVNode(" is a fourth permission on a payment consent. It unlocks "),
                    createVNode("code", null, "GET /payment-consents/{ConsentId}/refund"),
                    createTextVNode(" and is used to retrieve account details for routing a refund — it is not an account-reading permission in the same sense.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Permission"),
                        createVNode("th", null, "Endpoint unlocked"),
                        createVNode("th", null, "What it returns")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadAccountsBasic")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "GET /accounts")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("List of accounts with basic metadata (account type, currency, nickname). Does "),
                          createVNode("strong", null, "not"),
                          createTextVNode(" include the full account number or IBAN.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadAccountsDetail")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "GET /accounts/{AccountId}")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Full account record including the IBAN/account identification. Requires "),
                          createVNode("code", null, "ReadAccountsBasic"),
                          createTextVNode(" to first retrieve an "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadBalances")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "GET /accounts/{AccountId}/balances")
                        ]),
                        createVNode("td", null, "Current balance for a specific account (available balance, credit/debit indicator, and currency).")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "ReadRefundAccount"),
                  createTextVNode(" is a fourth permission on a payment consent. It unlocks "),
                  createVNode("code", null, "GET /payment-consents/{ConsentId}/refund"),
                  createTextVNode(" and is used to retrieve account details for routing a refund — it is not an account-reading permission in the same sense.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Scope impact",
        title: "The Request JWT scope changes",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Including any of the three permissions above <strong data-v-625e38fc${_scopeId2}>changes the required scope</strong> in the <code data-v-625e38fc${_scopeId2}>/par</code> Request JWT.`);
                } else {
                  return [
                    createTextVNode("Including any of the three permissions above "),
                    createVNode("strong", null, "changes the required scope"),
                    createTextVNode(" in the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" Request JWT.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-625e38fc${_scopeId2}><thead data-v-625e38fc${_scopeId2}><tr data-v-625e38fc${_scopeId2}><th data-v-625e38fc${_scopeId2}>Consent includes</th><th data-v-625e38fc${_scopeId2}>Scope in Request JWT</th></tr></thead><tbody data-v-625e38fc${_scopeId2}><tr data-v-625e38fc${_scopeId2}><td data-v-625e38fc${_scopeId2}>Payment only (no account permissions)</td><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>payments openid</code></td></tr><tr data-v-625e38fc${_scopeId2}><td data-v-625e38fc${_scopeId2}>Payment <strong data-v-625e38fc${_scopeId2}>with</strong> <code data-v-625e38fc${_scopeId2}>ReadAccountsBasic</code>, <code data-v-625e38fc${_scopeId2}>ReadAccountsDetail</code>, or <code data-v-625e38fc${_scopeId2}>ReadBalances</code></td><td data-v-625e38fc${_scopeId2}><code data-v-625e38fc${_scopeId2}>accounts payments openid</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Consent includes"),
                          createVNode("th", null, "Scope in Request JWT")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Payment only (no account permissions)"),
                          createVNode("td", null, [
                            createVNode("code", null, "payments openid")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Payment "),
                            createVNode("strong", null, "with"),
                            createTextVNode(),
                            createVNode("code", null, "ReadAccountsBasic"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadAccountsDetail"),
                            createTextVNode(", or "),
                            createVNode("code", null, "ReadBalances")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "accounts payments openid")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-625e38fc${_scopeId2}>If account-reading permissions are present in <code data-v-625e38fc${_scopeId2}>authorization_details</code> but <code data-v-625e38fc${_scopeId2}>accounts</code> is omitted from the <code data-v-625e38fc${_scopeId2}>scope</code>, the API Hub will reject the <code data-v-625e38fc${_scopeId2}>/par</code> request.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("If account-reading permissions are present in "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" but "),
                      createVNode("code", null, "accounts"),
                      createTextVNode(" is omitted from the "),
                      createVNode("code", null, "scope"),
                      createTextVNode(", the API Hub will reject the "),
                      createVNode("code", null, "/par"),
                      createTextVNode(" request.")
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
                  createTextVNode("Including any of the three permissions above "),
                  createVNode("strong", null, "changes the required scope"),
                  createTextVNode(" in the "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" Request JWT.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Consent includes"),
                        createVNode("th", null, "Scope in Request JWT")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Payment only (no account permissions)"),
                        createVNode("td", null, [
                          createVNode("code", null, "payments openid")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Payment "),
                          createVNode("strong", null, "with"),
                          createTextVNode(),
                          createVNode("code", null, "ReadAccountsBasic"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadAccountsDetail"),
                          createTextVNode(", or "),
                          createVNode("code", null, "ReadBalances")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "accounts payments openid")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("If account-reading permissions are present in "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" but "),
                    createVNode("code", null, "accounts"),
                    createTextVNode(" is omitted from the "),
                    createVNode("code", null, "scope"),
                    createTextVNode(", the API Hub will reject the "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request.")
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
        id: "request",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Requesting the permissions",
        title: "Add to authorization_details and update the scope",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add the <code data-v-625e38fc${_scopeId2}>Permissions</code> array to <code data-v-625e38fc${_scopeId2}>authorization_details.consent</code> in your <code data-v-625e38fc${_scopeId2}>/par</code> request alongside the payment fields:`);
                } else {
                  return [
                    createTextVNode("Add the "),
                    createVNode("code", null, "Permissions"),
                    createTextVNode(" array to "),
                    createVNode("code", null, "authorization_details.consent"),
                    createTextVNode(" in your "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request alongside the payment fields:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: requestExample,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`And update the scope in your Request JWT:`);
                } else {
                  return [
                    createTextVNode("And update the scope in your Request JWT:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: scopeUpdateTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Add the "),
                  createVNode("code", null, "Permissions"),
                  createTextVNode(" array to "),
                  createVNode("code", null, "authorization_details.consent"),
                  createTextVNode(" in your "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request alongside the payment fields:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: requestExample,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("And update the scope in your Request JWT:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: scopeUpdateTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "calling",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Calling the account endpoints",
        title: "Use the same access token returned after the payment consent is authorized",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-625e38fc${_scopeId}>GET /accounts — requires <code data-v-625e38fc${_scopeId}>ReadAccountsBasic</code></h3>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: accountsCallTabs }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-625e38fc${_scopeId}>GET /accounts/{AccountId} — requires <code data-v-625e38fc${_scopeId}>ReadAccountsDetail</code></h3>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: accountDetailCallTabs }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-625e38fc${_scopeId}>GET /accounts/{AccountId}/balances — requires <code data-v-625e38fc${_scopeId}>ReadBalances</code></h3>`);
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: balancesCallTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, [
                createTextVNode("GET /accounts — requires "),
                createVNode("code", null, "ReadAccountsBasic")
              ]),
              createVNode(_component_EdCodeGroup, { tabs: accountsCallTabs }),
              createVNode("h3", null, [
                createTextVNode("GET /accounts/{AccountId} — requires "),
                createVNode("code", null, "ReadAccountsDetail")
              ]),
              createVNode(_component_EdCodeGroup, { tabs: accountDetailCallTabs }),
              createVNode("h3", null, [
                createTextVNode("GET /accounts/{AccountId}/balances — requires "),
                createVNode("code", null, "ReadBalances")
              ]),
              createVNode(_component_EdCodeGroup, { tabs: balancesCallTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "relationship",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "vs Bank Data Sharing",
        title: "Same model, scoped to the payment context",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`These permissions follow the same permission model as <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" data-v-625e38fc${_scopeId2}>Bank Data Sharing</a> but are scoped to the payment context:`);
                } else {
                  return [
                    createTextVNode("These permissions follow the same permission model as "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing"),
                    createTextVNode(" but are scoped to the payment context:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-625e38fc${_scopeId2}>Access <strong data-v-625e38fc${_scopeId2}>expires when the payment consent expires</strong>.</li><li data-v-625e38fc${_scopeId2}>Access is <strong data-v-625e38fc${_scopeId2}>limited to the accounts the user authorized</strong> at the LFI.</li><li data-v-625e38fc${_scopeId2}>Only these three account endpoints are available — no transactions, beneficiaries, statements, or other sub-resources.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Access "),
                      createVNode("strong", null, "expires when the payment consent expires"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Access is "),
                      createVNode("strong", null, "limited to the accounts the user authorized"),
                      createTextVNode(" at the LFI.")
                    ]),
                    createVNode("li", null, "Only these three account endpoints are available — no transactions, beneficiaries, statements, or other sub-resources.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If you need access to the full range of account data, create a separate Bank Data Sharing consent.`);
                } else {
                  return [
                    createTextVNode("If you need access to the full range of account data, create a separate Bank Data Sharing consent.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("These permissions follow the same permission model as "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing"),
                  createTextVNode(" but are scoped to the payment context:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Access "),
                    createVNode("strong", null, "expires when the payment consent expires"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Access is "),
                    createVNode("strong", null, "limited to the accounts the user authorized"),
                    createTextVNode(" at the LFI.")
                  ]),
                  createVNode("li", null, "Only these three account endpoints are available — no transactions, beneficiaries, statements, or other sub-resources.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If you need access to the full range of account data, create a separate Bank Data Sharing consent.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/choosing-a-payment-type",
              category: "Payments",
              "category-color": "var(--at-gold)",
              title: "Choosing a Payment Type",
              desc: "The seven payment shapes and how to pick the right one."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/pii-encryption",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "Payment PII Encryption",
              desc: "Why PII in payment consents is encrypted end-to-end."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/choosing-a-payment-type",
                category: "Payments",
                "category-color": "var(--at-gold)",
                title: "Choosing a Payment Type",
                desc: "The seven payment shapes and how to pick the right one."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/pii-encryption",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "Payment PII Encryption",
                desc: "Why PII in payment consents is encrypted end-to-end."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/payment-account-permissions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paymentAccountPermissions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-625e38fc"]]);
export {
  paymentAccountPermissions as default
};
