---
next: false
prev: false
aside: false
---

# Getting Started for TPPs (Sandbox)


## Prerequisites

- You are onboarded to the sandbox Trust Framework: [Trust Framework Onboarding](/tech/tpp-standards/trust-framework/onboarding)

## Postman Collection (Sandbox)
Please fill in the below using an Application (Client) you have created in the **Sandbox Trust Framework**
<TPPPostmanScriptBuilder />


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.tpp-form-frame {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0 8px;
  background: linear-gradient(180deg, #f5f8fb 0%, #eef2f8 100%);
}

.tpp-form-card {
  width: min(820px, 100%);
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 24px 20px;
  box-shadow: 0 12px 28px rgba(12, 20, 65, 0.1);
  box-sizing: border-box;
}

.tpp-form-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.tpp-form-title {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.tpp-form-subtitle {
  margin: 0;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  color: #4d5566;
}

.tpp-form-help {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tpp-help-text {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #0b1340;
}

.icon-container {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0b1340;
  color: #fff;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 600;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

.icon-tooltip {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
  max-width: 320px;
  padding: 10px 12px;
  background: #0b1340;
  color: #f5f5fd;
  border-radius: 10px;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  box-shadow: 0 10px 24px rgba(12, 20, 65, 0.16);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  z-index: 5;
}

.icon-container:hover .icon-tooltip,
.icon-container:focus-within .icon-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Make the embedded form breathe inside the card */
.tpp-form-card :global(form),
.tpp-form-card :global(.tpp-postman-builder) {
  width: 100%;
}

/* Keep inputs aligned with the consent-inspired spacing */
.tpp-form-card :global(label),
.tpp-form-card :global(.field-label) {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 500;
  color: #0b1340;
}

.tpp-form-card input,
.tpp-form-card textarea,
.tpp-form-card select {
  border-radius: 10px;
  border: 1px solid #d6d9e7;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}

.tpp-form-card button {
  border-radius: 12px;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}
</style>

## Setting Up Postman

#### Install postman

- Download: https://www.postman.com/downloads/ (choose the desktop app for your OS).
- Install: run the installer and follow defaults. On macOS, drag Postman to Applications.
- Launch: open Postman and sign in (or create a free account).
- Enable HTTPS certificates: Settings → Certificates → add your sandbox certificate/key when running mTLS calls.
- Verify: import a sample collection (File → Import) and send a simple GET to confirm connectivity.

#### Configure mTLS certificates in Postman

1) Open Postman settings  
   - Click the gear icon (top right) → **Settings** → **Certificates** tab.

2) Add your sandbox host  
   - Click **Add Certificate**.  
   - In **Host**, enter the domain (no protocol), e.g. 
    `*.altareq1.sandbox.apihub.openfinance.ae`.  or 
    `*.[LFI CODE].preprod.apihub.openfinance.ae`
   - Leave port blank (defaults to 443)

3) Attach your certs  
   - CRT file: browse to `client_transport.pem`.  
   - KEY file: browse to `client_transport.key`.
   - Save the certificate entry.    

4) Test by registring
   - Send a request to the TPP's registration endpoint.
   - If you receive a `204 (No Content)`

*Note if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in (2)*


## Your First Open Finance Requests
