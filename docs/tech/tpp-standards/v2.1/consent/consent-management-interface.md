---
next: false
prev: false
aside: false
---

# Consent Management Interface

TPPs must provide a consent management interface where users can see their existing connections, review status, and manage active consent relationships.

Configure the simulated connections below. The preview updates immediately.

<ConsentConnectionsEditor />

## Live UI Preview

The component below represents the AlTareq Connections page layout.

<div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin-top: 1.25rem;">
  <div style="width: 100%; max-width: 320px; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,39,127,0.05); border-radius: 7px; border: 1px solid rgba(0,39,127,0.12); box-sizing: border-box;">
    <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">TPP - AlTareq Connections</div>
  </div>
  <ConsentManagementConnections />
</div>
