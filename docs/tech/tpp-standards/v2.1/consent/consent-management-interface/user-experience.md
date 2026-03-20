---
next: false
prev: false
aside: false
---

# Consent Management Interface

TPPs must provide a consent management interface where users can see their existing connections, review status, and manage active consent relationships.

Configure the simulated connections below. The preview updates immediately.

## Interactive Demo

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

## Consent Details View


