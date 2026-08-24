import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdProse = __unplugin_components_4;
  const _component_ImageViewer = ImageViewer;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-2a7dc0a8><section class="ed-doc__hero" data-v-2a7dc0a8><div class="ed-doc__inner" data-v-2a7dc0a8><div class="ed-doc__eyebrow" data-v-2a7dc0a8><span class="ed-doc__eyebrow-dash" data-v-2a7dc0a8></span> Banking · Products &amp; Leads · UX </div><h1 class="ed-doc__title" data-v-2a7dc0a8> Products and Leads — User Experience <span class="ed-doc__read" data-v-2a7dc0a8>5 min read</span></h1><p class="ed-doc__lede" data-v-2a7dc0a8> The following wireframes and guidelines outline the essential information and functionality that must be provided to the User, while enabling TPPs to implement additional features and capabilities to address their commercial and service-specific needs. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-2a7dc0a8> While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the product information presented to the User. The style and presentation of the returned product information within the &#39;Product Features &amp; Characteristics&#39; section falls within the competitive domain of TPPs, enabling them to design and implement their own customer experience — including how product information is summarised and how detailed information is presented. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-2a7dc0a8> Your Products and Leads user experience must be submitted as part of <strong data-v-2a7dc0a8>CX certification</strong> prior to production, and any material changes to a production implementation must be re-submitted for review and approval. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "ux-guidelines",
    num: "01",
    color: "var(--at-gold)",
    eyebrow: "UX Guidelines",
    title: "Required experience for Products and Leads",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-2a7dc0a8${_scopeId2}><thead data-v-2a7dc0a8${_scopeId2}><tr data-v-2a7dc0a8${_scopeId2}><th data-v-2a7dc0a8${_scopeId2}>ID</th><th data-v-2a7dc0a8${_scopeId2}>Requirement</th><th data-v-2a7dc0a8${_scopeId2}>UX Guidelines Statement</th></tr></thead><tbody data-v-2a7dc0a8${_scopeId2}><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MAY</strong></td><td data-v-2a7dc0a8${_scopeId2}>Include additional text and information about the service they will be providing to the User. This additional information should clarify that the products returned will NOT include: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>tailored individual quotes, or</li><li data-v-2a7dc0a8${_scopeId2}>confirmation of pre-approval for the product by the LFI</li></ul></td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.1</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Request that the User selects the LFI into which their salary is currently deposited, and confirm whether they would be willing to switch banks and have their salary deposited into a different LFI if required by the product&#39;s eligibility criteria. This information is necessary for LFIs to determine whether the User is an existing customer and to assess eligibility for specific products or rates.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.2</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Allow the User to select whether they only wish to see Shari&#39;a compliant banking products. When Shari&#39;a compliant products are displayed, the appropriate Shari&#39;a compliant product names must be used.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.3</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Allow the User to select the type of Banking products they are interested in.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.4</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Display a list of optional Preference options that the User can populate to filter LFI products that do not meet their requirements or personal circumstances. TPPs <strong data-v-2a7dc0a8${_scopeId2}>MAY</strong>: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>Include different and/or additional Preferences to assess the suitability of each returned LFI product</li><li data-v-2a7dc0a8${_scopeId2}>Make a Preference option mandatory if the information is essential for the TPP&#39;s product assessment or User service</li><li data-v-2a7dc0a8${_scopeId2}>Decide what option values are displayed in each Preference drop-down list</li></ul></td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.5</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Provide the User the option on what order or ranking the returned products are displayed to them, and ensure products are displayed in the selected order. Depending on the product type the order options could be: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>Rate</li><li data-v-2a7dc0a8${_scopeId2}>Annual Return</li><li data-v-2a7dc0a8${_scopeId2}>Minimum Opening Balance</li><li data-v-2a7dc0a8${_scopeId2}>Minimum Salary</li><li data-v-2a7dc0a8${_scopeId2}>Minimum Balance Required</li><li data-v-2a7dc0a8${_scopeId2}>Annual Fee</li><li data-v-2a7dc0a8${_scopeId2}>Alphabetically</li></ul></td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.6</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Show a list of LFIs the product information will be requested from, using LFI logos and brand names as defined in the Trust Framework Directory (or the Alternative Brand Name provided by the LFI for Shari&#39;a compliant products). The User must be able to de-select specific LFIs they do not wish to receive products from. By default &quot;All LFIs&quot; must be selected.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>1.7</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Show a &quot;Loading Products&quot; screen when the User selects &quot;View Products&quot; to indicate that products are being requested from the selected LFIs.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>2.1</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST NOT</strong></td><td data-v-2a7dc0a8${_scopeId2}>Give preference to or recommend products based on commercial agreements with specific LFIs.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>2.2</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MAY</strong></td><td data-v-2a7dc0a8${_scopeId2}>Choose how they show the returned product information and the level of data displayed to the User based on the service they wish to provide.</td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>2.3</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>Provide three options when the User selects an individual product: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>Apply Now</li><li data-v-2a7dc0a8${_scopeId2}>Request contact from bank</li><li data-v-2a7dc0a8${_scopeId2}>Cancel</li></ul> The User must be able to exit the individual product view and return to the product list. </td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>2.4</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>When the User selects the &quot;Apply Now&quot; option: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>If the LFI has provided a URI in the <code data-v-2a7dc0a8${_scopeId2}>ApplicationUri</code> field, confirm that the User will be redirected to the LFI to commence the application process</li><li data-v-2a7dc0a8${_scopeId2}>If no <code data-v-2a7dc0a8${_scopeId2}>ApplicationUri</code> is provided, display the alternative application channels provided by the LFI: <code data-v-2a7dc0a8${_scopeId2}>ApplicationPhoneNumber</code>, <code data-v-2a7dc0a8${_scopeId2}>ApplicationEmail</code>, and/or <code data-v-2a7dc0a8${_scopeId2}>ApplicationDescription</code></li><li data-v-2a7dc0a8${_scopeId2}>When a telephone number is provided and the User is on a mobile device, allow the User to initiate a phone call to the LFI</li></ul></td></tr><tr data-v-2a7dc0a8${_scopeId2}><td data-v-2a7dc0a8${_scopeId2}>2.5</td><td data-v-2a7dc0a8${_scopeId2}><strong data-v-2a7dc0a8${_scopeId2}>MUST</strong></td><td data-v-2a7dc0a8${_scopeId2}>When the User selects the &quot;Request contact from bank&quot; option: <ul data-v-2a7dc0a8${_scopeId2}><li data-v-2a7dc0a8${_scopeId2}>Display the User information that must be provided or will be shared with the LFI when already held by the TPP</li><li data-v-2a7dc0a8${_scopeId2}>Confirm to the User that the displayed or provided information will be shared with the LFI for follow-up regarding the specific product</li><li data-v-2a7dc0a8${_scopeId2}>Capture the User&#39;s Emirates ID as part of generating a lead for an LFI</li><li data-v-2a7dc0a8${_scopeId2}>Provide an acknowledgement window or message when the User information has been successfully provided to the LFI</li></ul> TPPs <strong data-v-2a7dc0a8${_scopeId2}>MAY</strong> include a free text box for the User to specify the reason for the LFI follow-up request. </td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "ID"),
                      createVNode("th", null, "Requirement"),
                      createVNode("th", null, "UX Guidelines Statement")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MAY")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Include additional text and information about the service they will be providing to the User. This additional information should clarify that the products returned will NOT include: "),
                        createVNode("ul", null, [
                          createVNode("li", null, "tailored individual quotes, or"),
                          createVNode("li", null, "confirmation of pre-approval for the product by the LFI")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.1"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, "Request that the User selects the LFI into which their salary is currently deposited, and confirm whether they would be willing to switch banks and have their salary deposited into a different LFI if required by the product's eligibility criteria. This information is necessary for LFIs to determine whether the User is an existing customer and to assess eligibility for specific products or rates.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.2"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, "Allow the User to select whether they only wish to see Shari'a compliant banking products. When Shari'a compliant products are displayed, the appropriate Shari'a compliant product names must be used.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.3"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, "Allow the User to select the type of Banking products they are interested in.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.4"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Display a list of optional Preference options that the User can populate to filter LFI products that do not meet their requirements or personal circumstances. TPPs "),
                        createVNode("strong", null, "MAY"),
                        createTextVNode(": "),
                        createVNode("ul", null, [
                          createVNode("li", null, "Include different and/or additional Preferences to assess the suitability of each returned LFI product"),
                          createVNode("li", null, "Make a Preference option mandatory if the information is essential for the TPP's product assessment or User service"),
                          createVNode("li", null, "Decide what option values are displayed in each Preference drop-down list")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.5"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Provide the User the option on what order or ranking the returned products are displayed to them, and ensure products are displayed in the selected order. Depending on the product type the order options could be: "),
                        createVNode("ul", null, [
                          createVNode("li", null, "Rate"),
                          createVNode("li", null, "Annual Return"),
                          createVNode("li", null, "Minimum Opening Balance"),
                          createVNode("li", null, "Minimum Salary"),
                          createVNode("li", null, "Minimum Balance Required"),
                          createVNode("li", null, "Annual Fee"),
                          createVNode("li", null, "Alphabetically")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.6"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, `Show a list of LFIs the product information will be requested from, using LFI logos and brand names as defined in the Trust Framework Directory (or the Alternative Brand Name provided by the LFI for Shari'a compliant products). The User must be able to de-select specific LFIs they do not wish to receive products from. By default "All LFIs" must be selected.`)
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1.7"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, 'Show a "Loading Products" screen when the User selects "View Products" to indicate that products are being requested from the selected LFIs.')
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2.1"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT")
                      ]),
                      createVNode("td", null, "Give preference to or recommend products based on commercial agreements with specific LFIs.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2.2"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MAY")
                      ]),
                      createVNode("td", null, "Choose how they show the returned product information and the level of data displayed to the User based on the service they wish to provide.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2.3"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Provide three options when the User selects an individual product: "),
                        createVNode("ul", null, [
                          createVNode("li", null, "Apply Now"),
                          createVNode("li", null, "Request contact from bank"),
                          createVNode("li", null, "Cancel")
                        ]),
                        createTextVNode(" The User must be able to exit the individual product view and return to the product list. ")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2.4"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, [
                        createTextVNode('When the User selects the "Apply Now" option: '),
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createTextVNode("If the LFI has provided a URI in the "),
                            createVNode("code", null, "ApplicationUri"),
                            createTextVNode(" field, confirm that the User will be redirected to the LFI to commence the application process")
                          ]),
                          createVNode("li", null, [
                            createTextVNode("If no "),
                            createVNode("code", null, "ApplicationUri"),
                            createTextVNode(" is provided, display the alternative application channels provided by the LFI: "),
                            createVNode("code", null, "ApplicationPhoneNumber"),
                            createTextVNode(", "),
                            createVNode("code", null, "ApplicationEmail"),
                            createTextVNode(", and/or "),
                            createVNode("code", null, "ApplicationDescription")
                          ]),
                          createVNode("li", null, "When a telephone number is provided and the User is on a mobile device, allow the User to initiate a phone call to the LFI")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2.5"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST")
                      ]),
                      createVNode("td", null, [
                        createTextVNode('When the User selects the "Request contact from bank" option: '),
                        createVNode("ul", null, [
                          createVNode("li", null, "Display the User information that must be provided or will be shared with the LFI when already held by the TPP"),
                          createVNode("li", null, "Confirm to the User that the displayed or provided information will be shared with the LFI for follow-up regarding the specific product"),
                          createVNode("li", null, "Capture the User's Emirates ID as part of generating a lead for an LFI"),
                          createVNode("li", null, "Provide an acknowledgement window or message when the User information has been successfully provided to the LFI")
                        ]),
                        createTextVNode(" TPPs "),
                        createVNode("strong", null, "MAY"),
                        createTextVNode(" include a free text box for the User to specify the reason for the LFI follow-up request. ")
                      ])
                    ])
                  ])
                ])
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
                    createVNode("th", null, "ID"),
                    createVNode("th", null, "Requirement"),
                    createVNode("th", null, "UX Guidelines Statement")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "1"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MAY")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Include additional text and information about the service they will be providing to the User. This additional information should clarify that the products returned will NOT include: "),
                      createVNode("ul", null, [
                        createVNode("li", null, "tailored individual quotes, or"),
                        createVNode("li", null, "confirmation of pre-approval for the product by the LFI")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.1"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, "Request that the User selects the LFI into which their salary is currently deposited, and confirm whether they would be willing to switch banks and have their salary deposited into a different LFI if required by the product's eligibility criteria. This information is necessary for LFIs to determine whether the User is an existing customer and to assess eligibility for specific products or rates.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.2"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, "Allow the User to select whether they only wish to see Shari'a compliant banking products. When Shari'a compliant products are displayed, the appropriate Shari'a compliant product names must be used.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.3"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, "Allow the User to select the type of Banking products they are interested in.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.4"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Display a list of optional Preference options that the User can populate to filter LFI products that do not meet their requirements or personal circumstances. TPPs "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(": "),
                      createVNode("ul", null, [
                        createVNode("li", null, "Include different and/or additional Preferences to assess the suitability of each returned LFI product"),
                        createVNode("li", null, "Make a Preference option mandatory if the information is essential for the TPP's product assessment or User service"),
                        createVNode("li", null, "Decide what option values are displayed in each Preference drop-down list")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.5"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Provide the User the option on what order or ranking the returned products are displayed to them, and ensure products are displayed in the selected order. Depending on the product type the order options could be: "),
                      createVNode("ul", null, [
                        createVNode("li", null, "Rate"),
                        createVNode("li", null, "Annual Return"),
                        createVNode("li", null, "Minimum Opening Balance"),
                        createVNode("li", null, "Minimum Salary"),
                        createVNode("li", null, "Minimum Balance Required"),
                        createVNode("li", null, "Annual Fee"),
                        createVNode("li", null, "Alphabetically")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.6"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, `Show a list of LFIs the product information will be requested from, using LFI logos and brand names as defined in the Trust Framework Directory (or the Alternative Brand Name provided by the LFI for Shari'a compliant products). The User must be able to de-select specific LFIs they do not wish to receive products from. By default "All LFIs" must be selected.`)
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "1.7"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, 'Show a "Loading Products" screen when the User selects "View Products" to indicate that products are being requested from the selected LFIs.')
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2.1"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT")
                    ]),
                    createVNode("td", null, "Give preference to or recommend products based on commercial agreements with specific LFIs.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2.2"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MAY")
                    ]),
                    createVNode("td", null, "Choose how they show the returned product information and the level of data displayed to the User based on the service they wish to provide.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2.3"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Provide three options when the User selects an individual product: "),
                      createVNode("ul", null, [
                        createVNode("li", null, "Apply Now"),
                        createVNode("li", null, "Request contact from bank"),
                        createVNode("li", null, "Cancel")
                      ]),
                      createTextVNode(" The User must be able to exit the individual product view and return to the product list. ")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2.4"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, [
                      createTextVNode('When the User selects the "Apply Now" option: '),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createTextVNode("If the LFI has provided a URI in the "),
                          createVNode("code", null, "ApplicationUri"),
                          createTextVNode(" field, confirm that the User will be redirected to the LFI to commence the application process")
                        ]),
                        createVNode("li", null, [
                          createTextVNode("If no "),
                          createVNode("code", null, "ApplicationUri"),
                          createTextVNode(" is provided, display the alternative application channels provided by the LFI: "),
                          createVNode("code", null, "ApplicationPhoneNumber"),
                          createTextVNode(", "),
                          createVNode("code", null, "ApplicationEmail"),
                          createTextVNode(", and/or "),
                          createVNode("code", null, "ApplicationDescription")
                        ]),
                        createVNode("li", null, "When a telephone number is provided and the User is on a mobile device, allow the User to initiate a phone call to the LFI")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2.5"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST")
                    ]),
                    createVNode("td", null, [
                      createTextVNode('When the User selects the "Request contact from bank" option: '),
                      createVNode("ul", null, [
                        createVNode("li", null, "Display the User information that must be provided or will be shared with the LFI when already held by the TPP"),
                        createVNode("li", null, "Confirm to the User that the displayed or provided information will be shared with the LFI for follow-up regarding the specific product"),
                        createVNode("li", null, "Capture the User's Emirates ID as part of generating a lead for an LFI"),
                        createVNode("li", null, "Provide an acknowledgement window or message when the User information has been successfully provided to the LFI")
                      ]),
                      createTextVNode(" TPPs "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" include a free text box for the User to specify the reason for the LFI follow-up request. ")
                    ])
                  ])
                ])
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
    id: "example-journeys",
    num: "02",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Examples",
    title: "Sample user journeys",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-2a7dc0a8${_scopeId}>Example 1 — User requests product comparison and selects &#39;Apply Now&#39;</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The following example reflects the standard journey in which the User is presented with a list of products from LFIs that meet their stated requirements. Based on the information displayed, the User selects a product, resulting in a redirection to the LFI&#39;s application site to begin the application process. `);
            } else {
              return [
                createTextVNode(" The following example reflects the standard journey in which the User is presented with a list of products from LFIs that meet their stated requirements. Based on the information displayed, the User selects a product, resulting in a redirection to the LFI's application site to begin the application process. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/user-experience/products-and-leads/1.png",
          alt: "products-and-leads"
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-2a7dc0a8${_scopeId}>Example 2 — User requests product comparison and selects &#39;Request contact from bank&#39;</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The following example reflects a journey variation in which the User selects the &#39;Request contact from bank&#39; option, indicating that they wish to be contacted by the LFI to further discuss the product before proceeding with an application. When this option is selected, the TPP will invoke the LFI&#39;s Leads endpoint, submitting the User&#39;s contact details along with their Emirates ID. In this journey, the User is not redirected from the TPP&#39;s site to the LFI&#39;s site. `);
            } else {
              return [
                createTextVNode(" The following example reflects a journey variation in which the User selects the 'Request contact from bank' option, indicating that they wish to be contacted by the LFI to further discuss the product before proceeding with an application. When this option is selected, the TPP will invoke the LFI's Leads endpoint, submitting the User's contact details along with their Emirates ID. In this journey, the User is not redirected from the TPP's site to the LFI's site. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/user-experience/products-and-leads/2.png",
          alt: "products-and-leads"
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-2a7dc0a8${_scopeId}>Example 3 — User requests product comparison and selects &#39;Apply Now&#39; — No Application URL Provided</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The following example reflects a journey variation in which the LFI has NOT provided an application URL for redirecting the User in the Product response. Instead, the LFI has included instructions specifying where and how the User can apply for the selected product. When the User selects the &#39;Apply Now&#39; option, the TPP must display the application instructions provided by the LFI, rather than redirecting the User to the LFI&#39;s application site. `);
            } else {
              return [
                createTextVNode(" The following example reflects a journey variation in which the LFI has NOT provided an application URL for redirecting the User in the Product response. Instead, the LFI has included instructions specifying where and how the User can apply for the selected product. When the User selects the 'Apply Now' option, the TPP must display the application instructions provided by the LFI, rather than redirecting the User to the LFI's application site. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/user-experience/products-and-leads/3.png",
          alt: "products-and-leads"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Example 1 — User requests product comparison and selects 'Apply Now'"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The following example reflects the standard journey in which the User is presented with a list of products from LFIs that meet their stated requirements. Based on the information displayed, the User selects a product, resulting in a redirection to the LFI's application site to begin the application process. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/user-experience/products-and-leads/1.png",
            alt: "products-and-leads"
          }),
          createVNode("h3", null, "Example 2 — User requests product comparison and selects 'Request contact from bank'"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The following example reflects a journey variation in which the User selects the 'Request contact from bank' option, indicating that they wish to be contacted by the LFI to further discuss the product before proceeding with an application. When this option is selected, the TPP will invoke the LFI's Leads endpoint, submitting the User's contact details along with their Emirates ID. In this journey, the User is not redirected from the TPP's site to the LFI's site. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/user-experience/products-and-leads/2.png",
            alt: "products-and-leads"
          }),
          createVNode("h3", null, "Example 3 — User requests product comparison and selects 'Apply Now' — No Application URL Provided"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The following example reflects a journey variation in which the LFI has NOT provided an application URL for redirecting the User in the Product response. Instead, the LFI has included instructions specifying where and how the User can apply for the selected product. When the User selects the 'Apply Now' option, the TPP must display the application instructions provided by the LFI, rather than redirecting the User to the LFI's application site. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/user-experience/products-and-leads/3.png",
            alt: "products-and-leads"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/products-leads/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2a7dc0a8"]]);
export {
  userJourneys as default
};
