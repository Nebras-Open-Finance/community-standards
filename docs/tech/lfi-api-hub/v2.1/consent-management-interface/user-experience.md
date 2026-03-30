---
next: false
prev: false
aside: false
---

# Consent Management Interface — User Experience

LFIs must provide a consent management interface where customers can see their existing connections to third party providers, review status, and manage active consent relationships.


While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. The customer must always be able to clearly understand what consents they have granted, what each consent permits, and that it is part of the AlTareq ecosystem. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval.


The LFI CMI is functionally similar to the [TPP CMI](/tech/tpp-standards/v2.1/consent/consent-management-interface/user-experience) with the following key differences:

- The top bar uses the LFI brand colour (#FD6436) instead of teal
- Connection cards show TPP names rather than LFI names
- There is no Pause or Reactivate functionality — these are TPP-only concepts

## Interactive Demo

Configure the simulated connections below. The preview updates immediately.

<ConsentConnectionsEditor />

## Live UI Preview

The components below represent the LFI Connections page layout across three views: combined, data sharing only, and payments only.

<div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin-top: 1.25rem;">

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0, 192, 167, 0.07); border-radius: 7px; border: 1px solid rgba(0, 192, 167, 0.15); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">LFI Connections <br/> (Data Sharing and Payments)</div>
    </div>
    <ConsentManagementConnections perspective="lfi" />
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0, 192, 167, 0.07); border-radius: 7px; border: 1px solid rgba(0, 192, 167, 0.15); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">LFI Connections <br/> (Data Sharing)</div>
    </div>
    <ConsentManagementConnections perspective="lfi" mode="data-sharing" />
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0, 192, 167, 0.07); border-radius: 7px; border: 1px solid rgba(0, 192, 167, 0.15); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">LFI Connections <br/> (Payments)</div>
    </div>
    <ConsentManagementConnections perspective="lfi" mode="payments" />
  </div>

</div>

Tap any consent card in the live previews above to open its details and allow the customer to manage
