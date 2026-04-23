# Health Check

The **Health Check API** is a small family of Ozone Connect endpoints implemented by your LFI. The API Hub calls these endpoints to verify end-to-end connectivity, mutual TLS, and client-certificate propagation between the Hub and your Ozone Connect surface.

These endpoints MUST be implemented and reachable before your integration can proceed to testing — they are the first endpoints Ozone will call during [onboarding connectivity validation](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation), and they are used again whenever you rotate certificates or change network routing.

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| [`GET /hello`](/tech/lfi-api-hub/v2.1/health-check/open-api/hello) | Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub. |
| [`GET /hello-mtls`](/tech/lfi-api-hub/v2.1/health-check/open-api/hello-mtls) | Same as `/hello` but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge. |
| [`GET /echo-cert`](/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert) | Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers — useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application. |

## When the Hub calls these endpoints

- **During onboarding.** Before your integration can proceed to testing, Ozone runs end-to-end connectivity validation in both directions. On the LFI side, this means calling `/hello`, `/hello-mtls`, and `/echo-cert` on your Ozone Connect server. See [Environment Specific — end-to-end validation](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation).
- **After certificate rotation.** Whenever transport certificates are rotated or network routing changes, the same endpoints are used to re-verify connectivity.
- **For ongoing health monitoring.** The Hub may periodically call `/hello` and `/hello-mtls` to confirm the LFI surface remains reachable.

## Base path

These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs. If you configure a path override for the Health Check family during onboarding, the Hub calls `OzoneConnectURL/<path>/<endpoint>` — see [Environment Specific — optional API family base paths](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#optional-api-family-base-paths).
