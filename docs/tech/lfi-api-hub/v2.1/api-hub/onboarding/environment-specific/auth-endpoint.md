---
next: false
prev: false
aside: false
---

🕒 **8 minute read**

# Authorization Endpoint

The **Authorization Endpoint** is the HTTPS URL to which the PSU (customer) is redirected during consent authorisation flows. It is the entry point to the LFI's authentication and consent authorisation experience.

The TPP constructs the redirect URL and sends the PSU there directly — the API Hub does not perform this redirect. The URL MUST therefore be a stable, publicly accessible HTTPS endpoint that works reliably across all devices and browsers.

## What you provide

You MUST provide one Authorization Endpoint URL per API Hub instance, per environment:

| Environment | Example |
|-------------|---------|
| Pre-production | `https://openbanking-uat.example.com/authorize` |
| Production | `https://openbanking.example.com/authorize` |

There is exactly **one** Authorization Endpoint URL per API Hub instance.

## How it is used

During the consent authorisation flow:

1. A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub.
2. The API Hub creates the consent and returns a `request_uri` to the TPP.
3. The TPP constructs the authorization URL and redirects the PSU to **your Authorization Endpoint**.
4. Your system calls [`GET /auth`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/) on the Headless Heimdall Auth Server, passing through the query parameters received from the redirect.
5. Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details.
6. Your system authenticates the PSU and presents the consent for approval.
7. Your system calls `doConfirm` or `doFail` on the Headless Heimdall Auth Server with the result.
8. The PSU is redirected back to the TPP.

::: info FAPI 2.0 protocol handling
The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token binding, or OIDC protocol logic directly — these are handled when you call `GET /auth`. Your endpoint's role is to receive the redirect, invoke `GET /auth`, authenticate the PSU, and complete the consent journey.

For full details on the authorization flow, see the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide).
:::

## URL format requirements

The Authorization Endpoint URL MUST:

- Use **HTTPS** — HTTP is not permitted
- Be a clean base URL with **no query parameters** — the TPP appends OIDC query parameters (`client_id`, `response_type`, `scope`, `request_uri`) during the redirect
- Be accessible to PSU browsers over the **public internet**
- Resolve to infrastructure **owned and operated by the LFI**
- Be stable — the URL MUST NOT change without coordinated reconfiguration of the API Hub instance

The TPP constructs the full redirect URL in the following format:

```
https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&scope=openid&request_uri={request_uri}
```

Where `request_uri` is the value returned from the API Hub's `/par` response.


## App invocation via deep linking

The Authorization Endpoint URL MUST be configured as a **deep link** that opens the LFI's native mobile app when it is installed on the PSU's device. This is the primary authentication channel — most PSUs will authenticate via the LFI's mobile banking app.

### Required approach: Universal Links and App Links

LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint URL with their native app:

| Platform | Mechanism | Verification file |
|----------|-----------|-------------------|
| **iOS** | Universal Links | `/.well-known/apple-app-site-association` |
| **Android** | Android App Links | `/.well-known/assetlinks.json` |

These mechanisms allow the operating system to verify that the LFI owns both the domain and the app, and to open the app directly when the PSU navigates to the URL — without showing an intermediate browser page or disambiguation dialog.

::: danger Custom URL schemes are prohibited
Custom URL schemes (e.g. `mybank://authorize`) MUST NOT be used. Custom schemes are not verified by the operating system, meaning any app can register to handle the scheme. This creates a redirect interception risk where a malicious app could capture the authorization request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted.
:::

### How verified deep linking works

Both Universal Links (iOS) and App Links (Android) follow the same principle:

1. **The LFI hosts a verification file** on the Authorization Endpoint domain, proving ownership of both the domain and the app.
2. **The LFI's mobile app declares** that it handles URLs for the Authorization Endpoint domain.
3. **The operating system verifies** the association at app install time by fetching the verification file from the domain.
4. **When the PSU navigates to the URL**, the OS opens the LFI app directly — no browser page is loaded, no disambiguation dialog is shown.

#### iOS — Apple App Site Association

The LFI MUST host an `apple-app-site-association` file at the root of the Authorization Endpoint domain:

```
https://openbanking.example.com/.well-known/apple-app-site-association
```

This JSON file declares which paths on the domain should open the app. It MUST be served over HTTPS without redirects, and MUST NOT require authentication.

#### Android — Digital Asset Links

The LFI MUST host an `assetlinks.json` file at the root of the Authorization Endpoint domain:

```
https://openbanking.example.com/.well-known/assetlinks.json
```

This JSON file establishes a cryptographic link between the domain and the app using the app's signing certificate fingerprint. The app's `AndroidManifest.xml` MUST declare an intent filter with `android:autoVerify="true"` for the Authorization Endpoint domain.

::: tip Verification happens at install time
The operating system fetches and verifies the association file when the app is installed or updated. If verification fails (e.g. the file is missing, malformed, or the certificate fingerprint doesn't match), the OS will fall back to opening the URL in the browser — which defeats the purpose of deep linking. LFIs MUST ensure the verification files are correctly configured and accessible **before** publishing the app.
:::

### Fallback when the app is not installed

If the LFI app is not installed on the PSU's device, the URL opens in the device's browser. In this case, the Authorization Endpoint MUST serve a **mobile-optimised web page** that allows the PSU to complete authentication. See the [Authentication Implementation Guide](/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation#fallback-scenarios-when-the-app-is-not-available) for the detailed fallback flows, including browser-based authentication, app handoff via push notification, and QR code handoff from desktop.

The same URL MUST work in both cases — app invocation and browser fallback — without requiring the TPP or PSU to do anything differently.


## Desktop browser behaviour

When the PSU is on a desktop device, the Authorization Endpoint URL opens in the desktop browser. There is no native app to deep link to. In this case, the endpoint MUST render a web page that enables the PSU to complete the consent journey. Common approaches include:

- **QR code handoff** — the page displays a QR code that the PSU scans with their mobile device, opening the LFI app to complete authentication
- **Push notification handoff** — the page collects identifying information and triggers a push notification to the PSU's bound device
- **Browser-based authentication** — if the LFI supports web-based authentication in its existing digital channels, the PSU MUST be able to complete the entire journey in the desktop browser

The desktop page MUST poll for completion and redirect the PSU back to the TPP once the consent journey concludes.

For implementation details, see the [Authentication Implementation Guide](/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation#desktop-browser--qr-code-or-push-notification).


## Cross-device and cross-browser compatibility

The Authorization Endpoint is invoked by a TPP that the LFI does not control. The LFI cannot predict which device, operating system, browser, or redirect method the TPP will use. The endpoint MUST therefore work reliably across all common combinations.

### What the LFI MUST support

The Authorization Endpoint MUST function correctly:

- **Across mobile platforms** — iOS and Android, including current and recent OS versions
- **Across mobile browsers** — Safari, Chrome, Samsung Internet, Firefox, and any other browser with meaningful market share in the UAE. The deep link MUST open the app regardless of which browser the TPP is using. If the app is not installed, the browser fallback MUST render correctly in all of these browsers.
- **Across desktop browsers** — Chrome, Safari, Edge, and Firefox on Windows, macOS, and common Linux distributions
- **Regardless of how the TPP opens the redirect** — the endpoint MUST work whether the TPP opens the URL in the current browser tab, a new browser tab, or a system browser view (e.g. `SFSafariViewController` on iOS, Chrome Custom Tabs on Android). The behaviour MUST be seamless in all cases.
- **On both mobile and desktop** — the same URL serves the appropriate experience based on the device context

### What the LFI MUST test

LFIs are responsible for comprehensive testing of the Authorization Endpoint across the full range of devices, operating systems, and browsers their PSUs may use. This includes verifying that:

- Deep linking correctly opens the native app on both iOS and Android when the app is installed, across all major browsers
- The browser fallback renders and functions correctly on both iOS and Android when the app is not installed, across all major browsers
- The desktop experience works across all major desktop browsers
- The flow completes successfully regardless of whether the TPP opens the redirect in the current tab, a new tab, or a system browser view
- Navigation behaviour is sensible — for example, pressing the device back button during the flow does not leave the PSU stranded on a blank page
- The flow works on devices with different screen sizes, orientations, and accessibility settings

::: warning Compatibility failures block production certification
Any failure of the Authorization Endpoint to function on a device or browser that PSUs commonly use will be treated as a **certification failure**. The LFI is responsible for ensuring broad compatibility. The CX certification process, managed by Nebras, will verify this as part of production readiness.
:::

### App disambiguation

On Android, if multiple apps are registered to handle the same domain (for example, a production app and a development build), the OS may display a disambiguation dialog asking the PSU to choose which app to open. This MUST NOT occur in production — it confuses the PSU and undermines trust.

LFIs MUST ensure that only the production app is verified against the production Authorization Endpoint domain. Development and staging builds MUST use separate domains (e.g. `openbanking-dev.example.com`) and MUST NOT be registered against the production domain's `assetlinks.json`.


## Summary of requirements

| # | Requirement |
|---|-------------|
| 1 | HTTPS only — no HTTP, no custom URL schemes |
| 2 | No query parameters in the base URL |
| 3 | Publicly accessible over the internet |
| 4 | Universal Links (iOS) and App Links (Android) configured for the domain |
| 5 | `apple-app-site-association` and `assetlinks.json` hosted and verified |
| 6 | App opens directly when installed — no intermediate pages or disambiguation dialogs |
| 7 | Mobile-optimised web fallback when app is not installed |
| 8 | Desktop web experience with handoff to mobile app (QR, push) or browser-based auth |
| 9 | Works across all major browsers on iOS, Android, and desktop |
| 10 | Works regardless of TPP redirect method (current tab, new tab, system browser view) |
| 11 | Production app disambiguation resolved — only one app handles the production domain |
| 12 | CX certified by Nebras as part of production readiness |
