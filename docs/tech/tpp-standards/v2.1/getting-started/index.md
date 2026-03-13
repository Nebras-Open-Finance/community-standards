---
next: false
prev: false
aside: false
---

# Getting Started for TPPs (Sandbox)


## Prerequisites

- You are onboarded to the sandbox Trust Framework: If you are not onboarded onto the sandbox Trust Framework please see [Trust Framework Onboarding](/tech/tpp-standards/trust-framework/onboarding)

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

#### 1. Install postman

- Download Postman from https://www.postman.com/downloads/.
- Launch Postman and sign in (or create a free account).

#### 2. Import the Collection

- In Postman, click Import (top left).
- Select the downloaded .json file.
- The collection will appear in your Collections sidebar.

<ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>

#### 3. Configure mTLS certificates in Postman

1) Open Postman settings  
   - Click the gear icon (top right) → **Settings** → **Certificates** tab.

2) Navigate to the Certificates tab.

3) Click Add Certificate:

4) Add the host of the LFI Discovery URL you input 
   - In **Host**, enter the domain (no protocol), e.g. 
    `*.altareq1.sandbox.apihub.openfinance.ae`.  or 
    `*.[LFI CODE].preprod.apihub.openfinance.ae`
   - Leave port blank (defaults to 443)

5) Attach your certs  
   - CRT file: browse to `client_transport.pem`.  
   - KEY file: browse to `client_transport.key`.
   - Save the certificate entry.    

<ClientOnly>
    <Carousel :images="images2" />
  </ClientOnly>


6) Test by registring
   - Send a request to the TPP's registration endpoint.
   - If you receive a `204 (No Content)`

<ImageViewer
  src="/images/postman/register_spotlight.png"
  alt="Postman Registration Request"
/>

*Note if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in (4)*



## Your First Open Finance Requests


### Step 1 – Prepare the requests for /par

Navigate to the **Auth Flow** folder within **Single Instant Payment** and run the three [O3 utility requests](/tech/tpp-standards/security/fapi/o3-utils) in order:

1. Send **O3 Util: Prepare Encrypted PII** — encrypts the [PII payload](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/) required for the consent.
2. Send **O3 Util: Prepare Request Object JWT** — builds the [signed request object](/tech/tpp-standards/security/fapi/request-jwt) for the `/par` call.
3. Send **O3 Util: Prepare Private Key JWT** — creates the client assertion used for authentication.

<ClientOnly>
    <Carousel :images="images3" />
  </ClientOnly>

### Step 2 – Stage the Consent and Redirect to the LFI

1. Send the [`POST /par`](/tech/tpp-standards/v2.1/consent/open-api/par) request to stage the payment consent.
2. Click **Visualize** in the Postman response panel — this renders the response as a clickable redirect link.
3. Copy the link and open it in a browser to start the authorization redirect to the LFI.

<ClientOnly>
    <Carousel :images="images4" />
  </ClientOnly>

### Step 3 – Authenticate and Authorize

1. Authenticate with the LFI using your test credentials.
2. Select the account to debit and authorize the payment consent.

> The exact UI will vary by LFI. For sandbox testing, see the [Model Bank guide](/tech/tpp-standards/sandbox/model-bank).

<ClientOnly>
    <Carousel :images="images5" />
  </ClientOnly>


### Step 4 – Exchange the Authorization Code for a Token

After the LFI redirects back to your `redirect_uri`, the URL will contain a `code` query parameter.

1. Copy the `code` value from the redirect URL.
2. Set it as the `authorizationCode` [collection variable](/tech/tpp-standards/security/tokens) in Postman.
3. Send the **token request** to exchange the code for an access token.

<ClientOnly>
    <Carousel :images="images6" />
  </ClientOnly>


### Step 5 – Initiate the Payment

Navigate to the **Payments** folder and run the O3 utility requests, then submit the payment:

1. Send **O3 Util: Prepare Encrypted PII** — encrypts the [payment PII](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/).
2. Send **O3 Util: Prepare Request Object JWT for SIP** — builds the signed request object for the payment.
3. Send [`POST /payments`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments).

A `201` response confirms the payment was successfully initiated.

<ClientOnly>
    <Carousel :images="images7" />
  </ClientOnly>

### Step 6 – Retrieve the Payment ID and Status

1. Decode the [JWT](/knowledge-base/articles/jwt-claims) received in the `POST /payments` response to retrieve the `PaymentId` and `Status`. The status will typically start as `Pending`.

<ImageViewer
  src="/images/postman/first-flow-sip/16.png"
  alt="Decoded payment response JWT showing PaymentId and Status"
/>

<script setup>
const images1 =  [
  {
    src: new URL('/images/postman/postman_1_spotlight.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Import'
  },
  {
    src: new URL('/images/postman/post_spotlight.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Import'
  }
]

const images2 =  [
  {
    src: new URL('/images/postman/postman_2_spotlight.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Settings'
  },
  {
    src: new URL('/images/postman/postman_3_spotlight.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Certificates'
  },
  {
    src: new URL('/images/postman/postman_4_spotlight.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Add Certificate'
  },
  {
    src: new URL('/images/postman/postman_5_spotlight.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Host, Client Transport CRT (.pem), Client Transport KEY (.key)'
  }
]

const images3 =  [
  {
    src: new URL('/images/postman/first-flow-sip/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Navigate to Single Instant Payment → Auth Flow and send O3 Util: Prepare Encrypted PII'
  },
  {
    src: new URL('/images/postman/first-flow-sip/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Send O3 Util: Prepare Request Object JWT'
  },
  {
    src: new URL('/images/postman/first-flow-sip/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Send O3 Util: Prepare Private Key JWT'
  }
]

const images4 =  [
  {
    src: new URL('/images/postman/first-flow-sip/4.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Send POST /par to stage the payment consent'
  },
  {
    src: new URL('/images/postman/first-flow-sip/5_spotlight.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click Visualize to render the /par response as a redirect link'
  },
  {
    src: new URL('/images/postman/first-flow-sip/6.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Copy the link and open it in a browser to redirect the user to the LFI'
  }
]

const images5 =  [
  {
    src: new URL('/images/postman/first-flow-sip/7.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Authenticate with the LFI'
  },
  {
    src: new URL('/images/postman/first-flow-sip/8.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Select the account to debit for the payment'
  },
  {
    src: new URL('/images/postman/first-flow-sip/9.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Authorize the payment consent'
  }
]

const images6 =  [
  {
    src: new URL('/images/postman/first-flow-sip/10.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Copy the `code` parameter from the redirect URL'
  },
  {
    src: new URL('/images/postman/first-flow-sip/11.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Set the `authorizationCode` collection variable in Postman'
  },
  {
    src: new URL('/images/postman/first-flow-sip/12.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Send the token request to exchange the code for an access token'
  }
]

const images7 =  [
  {
    src: new URL('/images/postman/first-flow-sip/13.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Navigate to the Payments folder and send O3 Util: Prepare Encrypted PII'
  },
  {
    src: new URL('/images/postman/first-flow-sip/14.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Send O3 Util: Prepare Request Object JWT for SIP'
  },
  {
    src: new URL('/images/postman/first-flow-sip/15.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Send POST /payments — a 201 confirms the payment was initiated'
  }
]

</script>