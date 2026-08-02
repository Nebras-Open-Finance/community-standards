<route lang="yaml">
meta:
  title: Products and Leads - User Experience
  next: false
  prev: false
  aside: false
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Banking · Products &amp; Leads · UX
        </div>
        <h1 class="ed-doc__title">
          Products and Leads &mdash; User Experience
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The following wireframes and guidelines outline the essential information and functionality that
          must be provided to the User, while enabling TPPs to implement additional features and capabilities
          to address their commercial and service-specific needs.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter
          the meaning, clarity, or completeness of the product information presented to the User. The style
          and presentation of the returned product information within the 'Product Features &amp;
          Characteristics' section falls within the competitive domain of TPPs, enabling them to design and
          implement their own customer experience &mdash; including how product information is summarised
          and how detailed information is presented.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Your Products and Leads user experience must be submitted as part of <strong>CX certification</strong>
          prior to production, and any material changes to a production implementation must be re-submitted
          for review and approval.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="ux-guidelines"
      num="01"
      color="var(--at-gold)"
      eyebrow="UX Guidelines"
      title="Required experience for Products and Leads"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Requirement</th>
              <th>UX Guidelines Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>MAY</strong></td>
              <td>Include additional text and information about the service they will be providing to the User. This additional information should clarify that the products returned will NOT include:
                <ul>
                  <li>tailored individual quotes, or</li>
                  <li>confirmation of pre-approval for the product by the LFI</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>1.1</td>
              <td><strong>MUST</strong></td>
              <td>Request that the User selects the LFI into which their salary is currently deposited, and confirm whether they would be willing to switch banks and have their salary deposited into a different LFI if required by the product's eligibility criteria. This information is necessary for LFIs to determine whether the User is an existing customer and to assess eligibility for specific products or rates.</td>
            </tr>
            <tr>
              <td>1.2</td>
              <td><strong>MUST</strong></td>
              <td>Allow the User to select whether they only wish to see Shari'a compliant banking products. When Shari'a compliant products are displayed, the appropriate Shari'a compliant product names must be used.</td>
            </tr>
            <tr>
              <td>1.3</td>
              <td><strong>MUST</strong></td>
              <td>Allow the User to select the type of Banking products they are interested in.</td>
            </tr>
            <tr>
              <td>1.4</td>
              <td><strong>MUST</strong></td>
              <td>Display a list of optional Preference options that the User can populate to filter LFI products that do not meet their requirements or personal circumstances. TPPs <strong>MAY</strong>:
                <ul>
                  <li>Include different and/or additional Preferences to assess the suitability of each returned LFI product</li>
                  <li>Make a Preference option mandatory if the information is essential for the TPP's product assessment or User service</li>
                  <li>Decide what option values are displayed in each Preference drop-down list</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>1.5</td>
              <td><strong>MUST</strong></td>
              <td>Provide the User the option on what order or ranking the returned products are displayed to them, and ensure products are displayed in the selected order. Depending on the product type the order options could be:
                <ul>
                  <li>Rate</li>
                  <li>Annual Return</li>
                  <li>Minimum Opening Balance</li>
                  <li>Minimum Salary</li>
                  <li>Minimum Balance Required</li>
                  <li>Annual Fee</li>
                  <li>Alphabetically</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>1.6</td>
              <td><strong>MUST</strong></td>
              <td>Show a list of LFIs the product information will be requested from, using LFI logos and brand names as defined in the Trust Framework Directory (or the Alternative Brand Name provided by the LFI for Shari'a compliant products). The User must be able to de-select specific LFIs they do not wish to receive products from. By default "All LFIs" must be selected.</td>
            </tr>
            <tr>
              <td>1.7</td>
              <td><strong>MUST</strong></td>
              <td>Show a "Loading Products" screen when the User selects "View Products" to indicate that products are being requested from the selected LFIs.</td>
            </tr>
            <tr>
              <td>2.1</td>
              <td><strong>MUST NOT</strong></td>
              <td>Give preference to or recommend products based on commercial agreements with specific LFIs.</td>
            </tr>
            <tr>
              <td>2.2</td>
              <td><strong>MAY</strong></td>
              <td>Choose how they show the returned product information and the level of data displayed to the User based on the service they wish to provide.</td>
            </tr>
            <tr>
              <td>2.3</td>
              <td><strong>MUST</strong></td>
              <td>Provide three options when the User selects an individual product:
                <ul>
                  <li>Apply Now</li>
                  <li>Request contact from bank</li>
                  <li>Cancel</li>
                </ul>
                The User must be able to exit the individual product view and return to the product list.
              </td>
            </tr>
            <tr>
              <td>2.4</td>
              <td><strong>MUST</strong></td>
              <td>When the User selects the "Apply Now" option:
                <ul>
                  <li>If the LFI has provided a URI in the <code>ApplicationUri</code> field, confirm that the User will be redirected to the LFI to commence the application process</li>
                  <li>If no <code>ApplicationUri</code> is provided, display the alternative application channels provided by the LFI: <code>ApplicationPhoneNumber</code>, <code>ApplicationEmail</code>, and/or <code>ApplicationDescription</code></li>
                  <li>When a telephone number is provided and the User is on a mobile device, allow the User to initiate a phone call to the LFI</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>2.5</td>
              <td><strong>MUST</strong></td>
              <td>When the User selects the "Request contact from bank" option:
                <ul>
                  <li>Display the User information that must be provided or will be shared with the LFI when already held by the TPP</li>
                  <li>Confirm to the User that the displayed or provided information will be shared with the LFI for follow-up regarding the specific product</li>
                  <li>Capture the User's Emirates ID as part of generating a lead for an LFI</li>
                  <li>Provide an acknowledgement window or message when the User information has been successfully provided to the LFI</li>
                </ul>
                TPPs <strong>MAY</strong> include a free text box for the User to specify the reason for the LFI follow-up request.
              </td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="example-journeys"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Examples"
      title="Sample user journeys"
      tone="cream"
    >
      <h3>Example 1 &mdash; User requests product comparison and selects 'Apply Now'</h3>

      <EdProse>
        The following example reflects the standard journey in which the User is presented with a list of
        products from LFIs that meet their stated requirements. Based on the information displayed, the User
        selects a product, resulting in a redirection to the LFI's application site to begin the application
        process.
      </EdProse>

      <ImageViewer
        src="/images/user-experience/products-and-leads/1.png"
        alt="products-and-leads"
      />

      <h3>Example 2 &mdash; User requests product comparison and selects 'Request contact from bank'</h3>

      <EdProse>
        The following example reflects a journey variation in which the User selects the 'Request contact
        from bank' option, indicating that they wish to be contacted by the LFI to further discuss the
        product before proceeding with an application. When this option is selected, the TPP will invoke the
        LFI's Leads endpoint, submitting the User's contact details along with their Emirates ID. In this
        journey, the User is not redirected from the TPP's site to the LFI's site.
      </EdProse>

      <ImageViewer
        src="/images/user-experience/products-and-leads/2.png"
        alt="products-and-leads"
      />

      <h3>Example 3 &mdash; User requests product comparison and selects 'Apply Now' &mdash; No Application URL Provided</h3>

      <EdProse>
        The following example reflects a journey variation in which the LFI has NOT provided an application
        URL for redirecting the User in the Product response. Instead, the LFI has included instructions
        specifying where and how the User can apply for the selected product. When the User selects the
        'Apply Now' option, the TPP must display the application instructions provided by the LFI, rather
        than redirecting the User to the LFI's application site.
      </EdProse>

      <ImageViewer
        src="/images/user-experience/products-and-leads/3.png"
        alt="products-and-leads"
      />
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 70rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
