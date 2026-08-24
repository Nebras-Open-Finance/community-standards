import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "secure-management",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "regulatory", label: "Regulatory" },
      { id: "practices", label: "Practices" },
      { id: "conclusion", label: "Conclusion" },
      { id: "references", label: "References" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · TPPs · Integrators · Ozone · Raidiam" },
      { label: "Read", value: "3 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const keyNums = [
      { value: "FIPS", unit: "140-3", label: "Required HSM certification" },
      { value: "13", unit: "mo", label: "Maximum key rotation interval" },
      { value: "mTLS", label: "Required client-server auth" }
    ];
    const references = [
      {
        title: "UAE Information Assurance Regulation – TDRA",
        desc: "Official TDRA regulation on information assurance requirements in the UAE.",
        href: "https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/UAE-Information-Assurance-Regulation-v1-1-pdf.ashx"
      },
      {
        title: "CBUAE Rulebook – Open Finance Regulation",
        desc: "Central Bank of the UAE's Open Finance Regulation page (security and operational requirements).",
        href: "https://rulebook.centralbank.ae/en/rulebook/open-finance-regulation-0"
      },
      {
        title: "FIPS 140-3 Cryptographic Module Validation Program – NIST",
        desc: "NIST standard for validated cryptographic modules.",
        href: "https://csrc.nist.gov/projects/cryptographic-module-validation-program"
      },
      {
        title: "UAE National Cybersecurity Strategy",
        desc: "National cybersecurity strategy framework guiding UAE cybersecurity and digital resilience.",
        href: "https://www.tra.gov.ae/userfiles/assets/Lw3seRUaIMd.pdf"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-658a3eab>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Secure · Authenticate · Audit",
        title: "Secure Management of Keys and Credentials",
        meta,
        lede: "Establishes <strong>mandatory and recommended practices</strong> for the secure management of cryptographic keys and credentials within the UAE Open Finance ecosystem — ensuring regulatory compliance, protecting organizational and user data, and maintaining trust across participants.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "What this policy covers",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-658a3eab${_scopeId2}>Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials</li><li data-v-658a3eab${_scopeId2}>Authentication, authorization, and token handling in Open Finance APIs and consent flows</li><li data-v-658a3eab${_scopeId2}>Integration with <strong data-v-658a3eab${_scopeId2}>Key Management Systems (KMS)</strong>, <strong data-v-658a3eab${_scopeId2}>Hardware Security Modules (HSMs)</strong>, and other cryptographic infrastructure</li><li data-v-658a3eab${_scopeId2}>Roles and responsibilities for LFIs, TPPs, and ecosystem participants</li>`);
                } else {
                  return [
                    createVNode("li", null, "Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials"),
                    createVNode("li", null, "Authentication, authorization, and token handling in Open Finance APIs and consent flows"),
                    createVNode("li", null, [
                      createTextVNode("Integration with "),
                      createVNode("strong", null, "Key Management Systems (KMS)"),
                      createTextVNode(", "),
                      createVNode("strong", null, "Hardware Security Modules (HSMs)"),
                      createTextVNode(", and other cryptographic infrastructure")
                    ]),
                    createVNode("li", null, "Roles and responsibilities for LFIs, TPPs, and ecosystem participants")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials"),
                  createVNode("li", null, "Authentication, authorization, and token handling in Open Finance APIs and consent flows"),
                  createVNode("li", null, [
                    createTextVNode("Integration with "),
                    createVNode("strong", null, "Key Management Systems (KMS)"),
                    createTextVNode(", "),
                    createVNode("strong", null, "Hardware Security Modules (HSMs)"),
                    createTextVNode(", and other cryptographic infrastructure")
                  ]),
                  createVNode("li", null, "Roles and responsibilities for LFIs, TPPs, and ecosystem participants")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "regulatory",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Regulatory foundation",
        title: "The controls organisations must implement",
        lede: "While the UAE does not mandate a single key management statute, organisations are required to implement robust security controls under the <strong>Information Assurance Regulation</strong> and the <strong>CBUAE Open Finance guidelines</strong>.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-658a3eab${_scopeId}>Key requirements</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-658a3eab${_scopeId2}><strong data-v-658a3eab${_scopeId2}>Key lifecycle management</strong> — secure generation, storage, distribution, rotation, revocation, and destruction</li><li data-v-658a3eab${_scopeId2}><strong data-v-658a3eab${_scopeId2}>Protection of sensitive material</strong> — secret and private keys must be protected against unauthorized access, loss, or disclosure</li><li data-v-658a3eab${_scopeId2}><strong data-v-658a3eab${_scopeId2}>Auditing and logging</strong> — all key usage and lifecycle activities must be logged and auditable</li><li data-v-658a3eab${_scopeId2}><strong data-v-658a3eab${_scopeId2}>Certification and revocation</strong> — procedures to maintain trust across ecosystem participants</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Key lifecycle management"),
                      createTextVNode(" — secure generation, storage, distribution, rotation, revocation, and destruction")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Protection of sensitive material"),
                      createTextVNode(" — secret and private keys must be protected against unauthorized access, loss, or disclosure")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Auditing and logging"),
                      createTextVNode(" — all key usage and lifecycle activities must be logged and auditable")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Certification and revocation"),
                      createTextVNode(" — procedures to maintain trust across ecosystem participants")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs and TPPs must implement these controls to ensure <strong data-v-658a3eab${_scopeId2}>confidentiality, integrity, and availability</strong> of Open Finance systems.`);
                } else {
                  return [
                    createTextVNode("LFIs and TPPs must implement these controls to ensure "),
                    createVNode("strong", null, "confidentiality, integrity, and availability"),
                    createTextVNode(" of Open Finance systems.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Key requirements"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Key lifecycle management"),
                    createTextVNode(" — secure generation, storage, distribution, rotation, revocation, and destruction")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Protection of sensitive material"),
                    createTextVNode(" — secret and private keys must be protected against unauthorized access, loss, or disclosure")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Auditing and logging"),
                    createTextVNode(" — all key usage and lifecycle activities must be logged and auditable")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Certification and revocation"),
                    createTextVNode(" — procedures to maintain trust across ecosystem participants")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs and TPPs must implement these controls to ensure "),
                  createVNode("strong", null, "confidentiality, integrity, and availability"),
                  createTextVNode(" of Open Finance systems.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "practices",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Mandatory practices",
        title: "The five practices every participant must adopt",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Adopt secure cryptographic infrastructure",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-658a3eab${_scopeId3}>Use <strong data-v-658a3eab${_scopeId3}>FIPS 140-3 certified HSMs</strong> for key generation, signing, encryption, and storage. Ensure centralized key management using modern <strong data-v-658a3eab${_scopeId3}>KMS</strong> (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Use "),
                            createVNode("strong", null, "FIPS 140-3 certified HSMs"),
                            createTextVNode(" for key generation, signing, encryption, and storage. Ensure centralized key management using modern "),
                            createVNode("strong", null, "KMS"),
                            createTextVNode(" (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Implement key lifecycle controls",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-658a3eab${_scopeId3}>Rotate transport and signing keys at least <strong data-v-658a3eab${_scopeId3}>every 13 months</strong> or more frequently if mandated. Define clear policies for key <strong data-v-658a3eab${_scopeId3}>expiration, recovery, and destruction</strong>. Maintain <strong data-v-658a3eab${_scopeId3}>audit logs</strong> of all key usage.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Rotate transport and signing keys at least "),
                            createVNode("strong", null, "every 13 months"),
                            createTextVNode(" or more frequently if mandated. Define clear policies for key "),
                            createVNode("strong", null, "expiration, recovery, and destruction"),
                            createTextVNode(". Maintain "),
                            createVNode("strong", null, "audit logs"),
                            createTextVNode(" of all key usage.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Enforce strong authentication",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-658a3eab${_scopeId3}>Use phishing-resistant, modern authentication methods:</p>`);
                        _push4(ssrRenderComponent(_component_EdBullets, { tight: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<li data-v-658a3eab${_scopeId4}><strong data-v-658a3eab${_scopeId4}>FIDO2 / Passkeys</strong> for customer authentication</li><li data-v-658a3eab${_scopeId4}><strong data-v-658a3eab${_scopeId4}>OAuth 2.0 + FAPI 2.0</strong> for secure API access</li><li data-v-658a3eab${_scopeId4}><strong data-v-658a3eab${_scopeId4}>Mutual TLS (mTLS)</strong> for client-server authentication</li>`);
                            } else {
                              return [
                                createVNode("li", null, [
                                  createVNode("strong", null, "FIDO2 / Passkeys"),
                                  createTextVNode(" for customer authentication")
                                ]),
                                createVNode("li", null, [
                                  createVNode("strong", null, "OAuth 2.0 + FAPI 2.0"),
                                  createTextVNode(" for secure API access")
                                ]),
                                createVNode("li", null, [
                                  createVNode("strong", null, "Mutual TLS (mTLS)"),
                                  createTextVNode(" for client-server authentication")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p data-v-658a3eab${_scopeId3}>Ensure secure handling of <strong data-v-658a3eab${_scopeId3}>credentials and tokens</strong> throughout consent and API flows.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Use phishing-resistant, modern authentication methods:"),
                          createVNode(_component_EdBullets, { tight: "" }, {
                            default: withCtx(() => [
                              createVNode("li", null, [
                                createVNode("strong", null, "FIDO2 / Passkeys"),
                                createTextVNode(" for customer authentication")
                              ]),
                              createVNode("li", null, [
                                createVNode("strong", null, "OAuth 2.0 + FAPI 2.0"),
                                createTextVNode(" for secure API access")
                              ]),
                              createVNode("li", null, [
                                createVNode("strong", null, "Mutual TLS (mTLS)"),
                                createTextVNode(" for client-server authentication")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("p", null, [
                            createTextVNode("Ensure secure handling of "),
                            createVNode("strong", null, "credentials and tokens"),
                            createTextVNode(" throughout consent and API flows.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Apply access management best practices",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-658a3eab${_scopeId3}>Implement <strong data-v-658a3eab${_scopeId3}>role-based access control (RBAC)</strong> and <strong data-v-658a3eab${_scopeId3}>separation of duties</strong> for key access. Limit key access to <strong data-v-658a3eab${_scopeId3}>authorized personnel and system components only</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Implement "),
                            createVNode("strong", null, "role-based access control (RBAC)"),
                            createTextVNode(" and "),
                            createVNode("strong", null, "separation of duties"),
                            createTextVNode(" for key access. Limit key access to "),
                            createVNode("strong", null, "authorized personnel and system components only"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Retain cryptographic control with BYOK / MYOK",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-658a3eab${_scopeId3}>LFIs may use <strong data-v-658a3eab${_scopeId3}>Bring Your Own Key (BYOK)</strong> or <strong data-v-658a3eab${_scopeId3}>Manage Your Own Key (MYOK)</strong> strategies to maintain control over sensitive key material while leveraging cloud infrastructure.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("LFIs may use "),
                            createVNode("strong", null, "Bring Your Own Key (BYOK)"),
                            createTextVNode(" or "),
                            createVNode("strong", null, "Manage Your Own Key (MYOK)"),
                            createTextVNode(" strategies to maintain control over sensitive key material while leveraging cloud infrastructure.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Adopt secure cryptographic infrastructure",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Use "),
                          createVNode("strong", null, "FIPS 140-3 certified HSMs"),
                          createTextVNode(" for key generation, signing, encryption, and storage. Ensure centralized key management using modern "),
                          createVNode("strong", null, "KMS"),
                          createTextVNode(" (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Implement key lifecycle controls",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Rotate transport and signing keys at least "),
                          createVNode("strong", null, "every 13 months"),
                          createTextVNode(" or more frequently if mandated. Define clear policies for key "),
                          createVNode("strong", null, "expiration, recovery, and destruction"),
                          createTextVNode(". Maintain "),
                          createVNode("strong", null, "audit logs"),
                          createTextVNode(" of all key usage.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Enforce strong authentication",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Use phishing-resistant, modern authentication methods:"),
                        createVNode(_component_EdBullets, { tight: "" }, {
                          default: withCtx(() => [
                            createVNode("li", null, [
                              createVNode("strong", null, "FIDO2 / Passkeys"),
                              createTextVNode(" for customer authentication")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "OAuth 2.0 + FAPI 2.0"),
                              createTextVNode(" for secure API access")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "Mutual TLS (mTLS)"),
                              createTextVNode(" for client-server authentication")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("p", null, [
                          createTextVNode("Ensure secure handling of "),
                          createVNode("strong", null, "credentials and tokens"),
                          createTextVNode(" throughout consent and API flows.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Apply access management best practices",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Implement "),
                          createVNode("strong", null, "role-based access control (RBAC)"),
                          createTextVNode(" and "),
                          createVNode("strong", null, "separation of duties"),
                          createTextVNode(" for key access. Limit key access to "),
                          createVNode("strong", null, "authorized personnel and system components only"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Retain cryptographic control with BYOK / MYOK",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("LFIs may use "),
                          createVNode("strong", null, "Bring Your Own Key (BYOK)"),
                          createTextVNode(" or "),
                          createVNode("strong", null, "Manage Your Own Key (MYOK)"),
                          createTextVNode(" strategies to maintain control over sensitive key material while leveraging cloud infrastructure.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Adopt secure cryptographic infrastructure",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Use "),
                        createVNode("strong", null, "FIPS 140-3 certified HSMs"),
                        createTextVNode(" for key generation, signing, encryption, and storage. Ensure centralized key management using modern "),
                        createVNode("strong", null, "KMS"),
                        createTextVNode(" (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Implement key lifecycle controls",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Rotate transport and signing keys at least "),
                        createVNode("strong", null, "every 13 months"),
                        createTextVNode(" or more frequently if mandated. Define clear policies for key "),
                        createVNode("strong", null, "expiration, recovery, and destruction"),
                        createTextVNode(". Maintain "),
                        createVNode("strong", null, "audit logs"),
                        createTextVNode(" of all key usage.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Enforce strong authentication",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Use phishing-resistant, modern authentication methods:"),
                      createVNode(_component_EdBullets, { tight: "" }, {
                        default: withCtx(() => [
                          createVNode("li", null, [
                            createVNode("strong", null, "FIDO2 / Passkeys"),
                            createTextVNode(" for customer authentication")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "OAuth 2.0 + FAPI 2.0"),
                            createTextVNode(" for secure API access")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Mutual TLS (mTLS)"),
                            createTextVNode(" for client-server authentication")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("p", null, [
                        createTextVNode("Ensure secure handling of "),
                        createVNode("strong", null, "credentials and tokens"),
                        createTextVNode(" throughout consent and API flows.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Apply access management best practices",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Implement "),
                        createVNode("strong", null, "role-based access control (RBAC)"),
                        createTextVNode(" and "),
                        createVNode("strong", null, "separation of duties"),
                        createTextVNode(" for key access. Limit key access to "),
                        createVNode("strong", null, "authorized personnel and system components only"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Retain cryptographic control with BYOK / MYOK",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("LFIs may use "),
                        createVNode("strong", null, "Bring Your Own Key (BYOK)"),
                        createTextVNode(" or "),
                        createVNode("strong", null, "Manage Your Own Key (MYOK)"),
                        createTextVNode(" strategies to maintain control over sensitive key material while leveraging cloud infrastructure.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "conclusion",
        num: "04",
        color: "var(--at-teal-deep)",
        eyebrow: "Conclusion",
        title: "Why this matters",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Secure key and credential management is a <strong data-v-658a3eab${_scopeId2}>regulatory requirement, operational imperative, and trust enabler</strong> in the UAE Open Finance ecosystem. By implementing hardware-backed cryptography, modern authentication standards, robust key lifecycle management, and strong access controls, LFIs and TPPs can:`);
                } else {
                  return [
                    createTextVNode("Secure key and credential management is a "),
                    createVNode("strong", null, "regulatory requirement, operational imperative, and trust enabler"),
                    createTextVNode(" in the UAE Open Finance ecosystem. By implementing hardware-backed cryptography, modern authentication standards, robust key lifecycle management, and strong access controls, LFIs and TPPs can:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-658a3eab${_scopeId2}>Protect user and organizational data</li><li data-v-658a3eab${_scopeId2}>Maintain regulatory compliance</li><li data-v-658a3eab${_scopeId2}>Enable secure, consented financial data sharing</li><li data-v-658a3eab${_scopeId2}>Foster trust and resilience across the Open Finance ecosystem</li>`);
                } else {
                  return [
                    createVNode("li", null, "Protect user and organizational data"),
                    createVNode("li", null, "Maintain regulatory compliance"),
                    createVNode("li", null, "Enable secure, consented financial data sharing"),
                    createVNode("li", null, "Foster trust and resilience across the Open Finance ecosystem")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Secure key and credential management is a "),
                  createVNode("strong", null, "regulatory requirement, operational imperative, and trust enabler"),
                  createTextVNode(" in the UAE Open Finance ecosystem. By implementing hardware-backed cryptography, modern authentication standards, robust key lifecycle management, and strong access controls, LFIs and TPPs can:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Protect user and organizational data"),
                  createVNode("li", null, "Maintain regulatory compliance"),
                  createVNode("li", null, "Enable secure, consented financial data sharing"),
                  createVNode("li", null, "Foster trust and resilience across the Open Finance ecosystem")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "references",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "References",
        title: "Source documents",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-refs" data-v-658a3eab${_scopeId}><!--[-->`);
            ssrRenderList(references, (r, i) => {
              _push2(`<a${ssrRenderAttr("href", r.href)} target="_blank" rel="noopener" class="ed-ref" data-v-658a3eab${_scopeId}><span class="ed-ref__num" data-v-658a3eab${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><span class="ed-ref__body" data-v-658a3eab${_scopeId}><span class="ed-ref__title" data-v-658a3eab${_scopeId}>${ssrInterpolate(r.title)}</span><span class="ed-ref__desc" data-v-658a3eab${_scopeId}>${ssrInterpolate(r.desc)}</span></span><span class="ed-ref__arrow" data-v-658a3eab${_scopeId}>↗</span></a>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-refs" }, [
                (openBlock(), createBlock(Fragment, null, renderList(references, (r, i) => {
                  return createVNode("a", {
                    key: i,
                    href: r.href,
                    target: "_blank",
                    rel: "noopener",
                    class: "ed-ref"
                  }, [
                    createVNode("span", { class: "ed-ref__num" }, toDisplayString(String(i + 1).padStart(2, "0")), 1),
                    createVNode("span", { class: "ed-ref__body" }, [
                      createVNode("span", { class: "ed-ref__title" }, toDisplayString(r.title), 1),
                      createVNode("span", { class: "ed-ref__desc" }, toDisplayString(r.desc), 1)
                    ]),
                    createVNode("span", { class: "ed-ref__arrow" }, "↗")
                  ], 8, ["href"]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related policies"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/version-management",
              category: "Nebras",
              title: "Version Management Policy",
              desc: "The major and minor version cadence within which key rotation operates."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/changes-to-published-content",
              category: "Nebras",
              title: "Changes to Published Documentation Policy",
              desc: "How errata are issued for security-impacting documentation changes."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/version-management",
                category: "Nebras",
                title: "Version Management Policy",
                desc: "The major and minor version cadence within which key rotation operates."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/changes-to-published-content",
                category: "Nebras",
                title: "Changes to Published Documentation Policy",
                desc: "How errata are issued for security-impacting documentation changes."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/secure-management.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const secureManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-658a3eab"]]);
export {
  secureManagement as default
};
