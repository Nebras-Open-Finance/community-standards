import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdCompareCards-BLuIwQN6.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "open-license-contribution-agreement",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "purpose", label: "Purpose" },
      { id: "scope", label: "Scope" },
      { id: "copyright", label: "Copyright" },
      { id: "attribution", label: "Attribution" },
      { id: "warranty", label: "Warranty" },
      { id: "legal-status", label: "Legal status" },
      { id: "contribution", label: "Contribution" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · TPPs · Integrators" },
      { label: "Read", value: "3 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCompareCards = __unplugin_components_7;
      const _component_EdCompareCard = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-8d05df92>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "License · Contribute · Implement",
        title: "Open License and Contribution Agreement",
        meta,
        lede: "The legal terms, licensing conditions, and contribution requirements applicable to anyone who accesses, implements, or contributes to the UAE Open Finance Standards. <strong>Agreement to these terms is mandatory before submitting any Contribution.</strong>"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "purpose",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Purpose",
        title: "Who this Agreement is for",
        lede: 'This document defines the legal terms applicable to any natural person or legal entity (the "Contributor") who:',
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>Accesses or implements the UAE Open Finance Standards</li><li data-v-8d05df92${_scopeId2}>Contributes to the development of the Standards</li><li data-v-8d05df92${_scopeId2}>Participates in consultations, working groups, or technical discussions</li>`);
                } else {
                  return [
                    createVNode("li", null, "Accesses or implements the UAE Open Finance Standards"),
                    createVNode("li", null, "Contributes to the development of the Standards"),
                    createVNode("li", null, "Participates in consultations, working groups, or technical discussions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-8d05df92${_scopeId}>It establishes</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>The open copyright license granted by the Central Bank of the United Arab Emirates (CBUAE)</li><li data-v-8d05df92${_scopeId2}>The rights and obligations of Contributors</li><li data-v-8d05df92${_scopeId2}>The intellectual property framework governing Contributions</li><li data-v-8d05df92${_scopeId2}>Confidentiality and governing law provisions</li>`);
                } else {
                  return [
                    createVNode("li", null, "The open copyright license granted by the Central Bank of the United Arab Emirates (CBUAE)"),
                    createVNode("li", null, "The rights and obligations of Contributors"),
                    createVNode("li", null, "The intellectual property framework governing Contributions"),
                    createVNode("li", null, "Confidentiality and governing law provisions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-8d05df92${_scopeId2}><strong data-v-8d05df92${_scopeId2}>Agreement to these terms is mandatory before submitting any Contribution.</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Agreement to these terms is mandatory before submitting any Contribution.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Accesses or implements the UAE Open Finance Standards"),
                  createVNode("li", null, "Contributes to the development of the Standards"),
                  createVNode("li", null, "Participates in consultations, working groups, or technical discussions")
                ]),
                _: 1
              }),
              createVNode("h3", null, "It establishes"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The open copyright license granted by the Central Bank of the United Arab Emirates (CBUAE)"),
                  createVNode("li", null, "The rights and obligations of Contributors"),
                  createVNode("li", null, "The intellectual property framework governing Contributions"),
                  createVNode("li", null, "Confidentiality and governing law provisions")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Agreement to these terms is mandatory before submitting any Contribution.")
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
        id: "scope",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Scope",
        title: "What this Agreement covers",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>The UAE Open Finance Standards, specifications, documentation, and related materials (the &quot;Standards&quot;)</li><li data-v-8d05df92${_scopeId2}>All Contributions submitted now or in the future</li><li data-v-8d05df92${_scopeId2}>All draft and final versions of the Standards</li><li data-v-8d05df92${_scopeId2}>Participation in working groups, consultations, and development activities</li>`);
                } else {
                  return [
                    createVNode("li", null, 'The UAE Open Finance Standards, specifications, documentation, and related materials (the "Standards")'),
                    createVNode("li", null, "All Contributions submitted now or in the future"),
                    createVNode("li", null, "All draft and final versions of the Standards"),
                    createVNode("li", null, "Participation in working groups, consultations, and development activities")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, 'The UAE Open Finance Standards, specifications, documentation, and related materials (the "Standards")'),
                  createVNode("li", null, "All Contributions submitted now or in the future"),
                  createVNode("li", null, "All draft and final versions of the Standards"),
                  createVNode("li", null, "Participation in working groups, consultations, and development activities")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "copyright",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Copyright",
        title: "The license granted by CBUAE",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-blue)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-8d05df92${_scopeId2}><strong data-v-8d05df92${_scopeId2}>Copyright © 2024 — Central Bank of the United Arab Emirates</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Copyright © 2024 — Central Bank of the United Arab Emirates")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`CBUAE grants a non-exclusive, royalty-free, worldwide copyright license to any contributor, developer, implementer, or interested party to:`);
                } else {
                  return [
                    createTextVNode("CBUAE grants a non-exclusive, royalty-free, worldwide copyright license to any contributor, developer, implementer, or interested party to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>Reproduce</li><li data-v-8d05df92${_scopeId2}>Prepare derivative works</li><li data-v-8d05df92${_scopeId2}>Distribute</li><li data-v-8d05df92${_scopeId2}>Perform</li><li data-v-8d05df92${_scopeId2}>Display</li>`);
                } else {
                  return [
                    createVNode("li", null, "Reproduce"),
                    createVNode("li", null, "Prepare derivative works"),
                    createVNode("li", null, "Distribute"),
                    createVNode("li", null, "Perform"),
                    createVNode("li", null, "Display")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`the UAE Open Finance Standards solely for the purpose of developing and implementing the Standards.`);
                } else {
                  return [
                    createTextVNode("the UAE Open Finance Standards solely for the purpose of developing and implementing the Standards.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCallout, { color: "var(--at-blue)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Copyright © 2024 — Central Bank of the United Arab Emirates")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("CBUAE grants a non-exclusive, royalty-free, worldwide copyright license to any contributor, developer, implementer, or interested party to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Reproduce"),
                  createVNode("li", null, "Prepare derivative works"),
                  createVNode("li", null, "Distribute"),
                  createVNode("li", null, "Perform"),
                  createVNode("li", null, "Display")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("the UAE Open Finance Standards solely for the purpose of developing and implementing the Standards.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "attribution",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Attribution",
        title: "Crediting CBUAE as source",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Attribution must be made to CBUAE as the source of the material. Such attribution must <strong data-v-8d05df92${_scopeId2}>not imply endorsement</strong> by CBUAE.`);
                } else {
                  return [
                    createTextVNode("Attribution must be made to CBUAE as the source of the material. Such attribution must "),
                    createVNode("strong", null, "not imply endorsement"),
                    createTextVNode(" by CBUAE.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Attribution must be made to CBUAE as the source of the material. Such attribution must "),
                  createVNode("strong", null, "not imply endorsement"),
                  createTextVNode(" by CBUAE.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "warranty",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Disclaimer of warranty",
        title: "The Standards are provided 'as is'",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Standards are provided &quot;as is&quot;, without warranty of any kind, express or implied, including but not limited to:`);
                } else {
                  return [
                    createTextVNode('The Standards are provided "as is", without warranty of any kind, express or implied, including but not limited to:')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>Merchantability</li><li data-v-8d05df92${_scopeId2}>Fitness for a particular purpose</li><li data-v-8d05df92${_scopeId2}>Non-infringement</li>`);
                } else {
                  return [
                    createVNode("li", null, "Merchantability"),
                    createVNode("li", null, "Fitness for a particular purpose"),
                    createVNode("li", null, "Non-infringement")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`CBUAE shall not be liable for any claim, damages, or other liability arising from:`);
                } else {
                  return [
                    createTextVNode("CBUAE shall not be liable for any claim, damages, or other liability arising from:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>Use of the Standards</li><li data-v-8d05df92${_scopeId2}>Implementation of the Standards</li><li data-v-8d05df92${_scopeId2}>Contributions made by any party</li>`);
                } else {
                  return [
                    createVNode("li", null, "Use of the Standards"),
                    createVNode("li", null, "Implementation of the Standards"),
                    createVNode("li", null, "Contributions made by any party")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode('The Standards are provided "as is", without warranty of any kind, express or implied, including but not limited to:')
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Merchantability"),
                  createVNode("li", null, "Fitness for a particular purpose"),
                  createVNode("li", null, "Non-infringement")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("CBUAE shall not be liable for any claim, damages, or other liability arising from:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Use of the Standards"),
                  createVNode("li", null, "Implementation of the Standards"),
                  createVNode("li", null, "Contributions made by any party")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "legal-status",
        num: "06",
        color: "var(--at-navy-deep)",
        eyebrow: "Legal status",
        title: "Collective Work under UAE Federal Decree-Law",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Standards, amendments, and Contributions are considered a &quot;Collective Work&quot; under <strong data-v-8d05df92${_scopeId2}>UAE Federal Decree-Law No. 38/2021</strong>, which governs copyright protection for innovative literary, artistic, and scientific creations in the United Arab Emirates.`);
                } else {
                  return [
                    createTextVNode('The Standards, amendments, and Contributions are considered a "Collective Work" under '),
                    createVNode("strong", null, "UAE Federal Decree-Law No. 38/2021"),
                    createTextVNode(", which governs copyright protection for innovative literary, artistic, and scientific creations in the United Arab Emirates.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode('The Standards, amendments, and Contributions are considered a "Collective Work" under '),
                  createVNode("strong", null, "UAE Federal Decree-Law No. 38/2021"),
                  createTextVNode(", which governs copyright protection for innovative literary, artistic, and scientific creations in the United Arab Emirates.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "contribution",
        num: "07",
        color: "var(--at-teal-deep)",
        eyebrow: "Contribution Agreement",
        title: "What contributors agree to",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-8d05df92${_scopeId}>General principles</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`CBUAE makes the Standards available for implementation without fee.`);
                } else {
                  return [
                    createTextVNode("CBUAE makes the Standards available for implementation without fee.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Any feedback, submission, suggestion, upload, or other material related to the Standards (unless clearly marked &quot;Not a Submission&quot; or &quot;Not a Contribution&quot;) constitutes a &quot;Contribution.&quot;`);
                } else {
                  return [
                    createTextVNode('Any feedback, submission, suggestion, upload, or other material related to the Standards (unless clearly marked "Not a Submission" or "Not a Contribution") constitutes a "Contribution."')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`By submitting a Contribution, the Contributor agrees to the terms below.`);
                } else {
                  return [
                    createTextVNode("By submitting a Contribution, the Contributor agrees to the terms below.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-8d05df92${_scopeId}>Contributor representations and warranties</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Contributor represents and warrants that:`);
                } else {
                  return [
                    createTextVNode("The Contributor represents and warrants that:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-navy-deep)",
                    kicker: "1. Authority to Contribute",
                    example: "If a legal entity"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-8d05df92${_scopeId3}><li data-v-8d05df92${_scopeId3}>Contributions are made by employees within the scope of employment, or</li><li data-v-8d05df92${_scopeId3}>Independent contractors under written IP assignment obligations</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, "Contributions are made by employees within the scope of employment, or"),
                            createVNode("li", null, "Independent contractors under written IP assignment obligations")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "1. Authority to Contribute",
                    example: "If an individual"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-8d05df92${_scopeId3}><li data-v-8d05df92${_scopeId3}>The employer has authorized the Contribution, waived relevant rights, or</li><li data-v-8d05df92${_scopeId3}>Has entered into a separate agreement with CBUAE</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, "The employer has authorized the Contribution, waived relevant rights, or"),
                            createVNode("li", null, "Has entered into a separate agreement with CBUAE")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-navy-deep)",
                      kicker: "1. Authority to Contribute",
                      example: "If a legal entity"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, "Contributions are made by employees within the scope of employment, or"),
                          createVNode("li", null, "Independent contractors under written IP assignment obligations")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-teal)",
                      kicker: "1. Authority to Contribute",
                      example: "If an individual"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, "The employer has authorized the Contribution, waived relevant rights, or"),
                          createVNode("li", null, "Has entered into a separate agreement with CBUAE")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-8d05df92${_scopeId}>2. No conflicting obligations</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Contributor has no third-party obligations that would prevent:`);
                } else {
                  return [
                    createTextVNode("Contributor has no third-party obligations that would prevent:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-8d05df92${_scopeId2}>Participating in working groups</li><li data-v-8d05df92${_scopeId2}>Making Contributions</li><li data-v-8d05df92${_scopeId2}>Granting rights in intellectual property</li>`);
                } else {
                  return [
                    createVNode("li", null, "Participating in working groups"),
                    createVNode("li", null, "Making Contributions"),
                    createVNode("li", null, "Granting rights in intellectual property")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "General principles"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("CBUAE makes the Standards available for implementation without fee.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode('Any feedback, submission, suggestion, upload, or other material related to the Standards (unless clearly marked "Not a Submission" or "Not a Contribution") constitutes a "Contribution."')
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("By submitting a Contribution, the Contributor agrees to the terms below.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Contributor representations and warranties"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Contributor represents and warrants that:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-navy-deep)",
                    kicker: "1. Authority to Contribute",
                    example: "If a legal entity"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, "Contributions are made by employees within the scope of employment, or"),
                        createVNode("li", null, "Independent contractors under written IP assignment obligations")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "1. Authority to Contribute",
                    example: "If an individual"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, "The employer has authorized the Contribution, waived relevant rights, or"),
                        createVNode("li", null, "Has entered into a separate agreement with CBUAE")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "2. No conflicting obligations"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Contributor has no third-party obligations that would prevent:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Participating in working groups"),
                  createVNode("li", null, "Making Contributions"),
                  createVNode("li", null, "Granting rights in intellectual property")
                ]),
                _: 1
              })
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
              desc: "How the Standards are versioned and what guarantees apply once Live."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/changes-to-published-content",
              category: "Nebras",
              title: "Changes to Published Documentation Policy",
              desc: "How amendments are issued post-publication via Errata."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/version-management",
                category: "Nebras",
                title: "Version Management Policy",
                desc: "How the Standards are versioned and what guarantees apply once Live."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/changes-to-published-content",
                category: "Nebras",
                title: "Changes to Published Documentation Policy",
                desc: "How amendments are issued post-publication via Errata."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/open-license-contribution-agreement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const openLicenseContributionAgreement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d05df92"]]);
export {
  openLicenseContributionAgreement as default
};
