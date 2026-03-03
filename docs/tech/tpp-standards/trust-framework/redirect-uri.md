---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Trust Framework - Handling Redirect URIs

Every application/software statement in the Trust Framework must have a configured `RedirectURI`. This URI serves as the destination to which users are redirected after authentication. The following guide outlines how to update your application to meet FAPI 2.0 requirements while still enabling deep linking, ensuring both compliance and a smooth user experience.

**FAPI 2.0**, which is designed to ensure the highest security standards for financial APIs, does not allow non-HTTPS redirect URIs. Therefore, if you're currently using a custom URL scheme (e.g., `myapp://home`), it won't be suitable as a redirect URI for OAuth or OpenID Connect flows.

To remain compliant with FAPI 2.0 and still support deep linking into your application, follow these steps:

#### 1. Set Up an HTTPS-based Universal/App Link

You’ll need to make your app respond to a secure URL like:

`https://yourdomain.com/callback?code=xyz`


This URL will serve as the redirect URI in your OAuth/OpenID Connect flow, and must use HTTPS to meet FAPI 2.0 standards.

#### 2. Handle the Redirect in Your App

Once the user is redirected to the HTTPS URL:
- If your app is installed, it should open and process the URL (e.g., extract the authorization code).
- If your app is not installed, it should fall back to either a web page or the app store to encourage the user to install the app.

By adopting this approach, you can continue supporting deep linking while ensuring compliance with the security standards required by FAPI 2.0.

#### Additional Resources

[Supporting Universal Links in Your App | Apple](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)


[Android App Links | Android](https://developer.android.com/training/app-links)