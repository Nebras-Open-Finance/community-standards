---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Consent Management Interface

TPPs must provide a consent management interface where users can see their existing connections, review status, and manage active consent relationships.


While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. The customer must always be able to clearly understand what consents they have granted, what each consent permits, and that it is part of the AlTareq ecosystem. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval.


## Interactive Demo

Configure the simulated connections below. The preview updates immediately.

<ConsentConnectionsEditor />

## Live UI Preview

The components below represent the AlTareq Connections page layout across three views: combined, data sharing only, and payments only.

<div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin-top: 1.25rem;">

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,39,127,0.05); border-radius: 7px; border: 1px solid rgba(0,39,127,0.12); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">AlTareq Connections <br/> (Data Sharing and Payments)</div>
    </div>
    <ConsentManagementConnections />
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,39,127,0.05); border-radius: 7px; border: 1px solid rgba(0,39,127,0.12); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">AlTareq Connections <br/> (Data Sharing)</div>
    </div>
    <ConsentManagementConnections mode="data-sharing" />
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,39,127,0.05); border-radius: 7px; border: 1px solid rgba(0,39,127,0.12); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">AlTareq Connections <br/> (Payments)</div>
    </div>
    <ConsentManagementConnections mode="payments" />
  </div>

</div>

Tap any consent card in the live previews above to open its details and allow the customer to manage

## Example Consent Management Interfaces

#### Example 1 - Data Sharing Acitve Consents

<ImageViewer
  src="/images/user-experience/consent-management-interface/1.png"
  alt="cmi-example"
/>

#### Example 2 - Data Sharing History Tab Revoked Consent

<ImageViewer
  src="/images/user-experience/consent-management-interface/2.png"
  alt="cmi-example"
/>

#### Example 3 - Payments Active Consents

<ImageViewer
  src="/images/user-experience/consent-management-interface/3.png"
  alt="cmi-example"
/>

#### Example 4 - Payments History Tab Revoked Consent

<ImageViewer
  src="/images/user-experience/consent-management-interface/4.png"
  alt="cmi-example"
/>


<!-- #### Example 5 - Data Sharing History Tab Revoked Consent

<ImageViewer
  src="/images/user-experience/consent-management-interface/5.png"
  alt="cmi-example"
/> -->


<!-- #### Example 3 - Data Sharing History Tab Revoked Consent

<ImageViewer
  src="/images/user-experience/consent-management-interface/6.png"
  alt="cmi-example"
/> -->
