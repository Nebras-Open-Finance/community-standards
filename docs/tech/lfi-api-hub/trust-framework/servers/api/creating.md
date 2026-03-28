---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Walkthrough – Creating an API Resource

This walkthrough covers registering an API resource under your authorisation server. You must have an [authorisation server already created](../creating) before following these steps.

Repeat this process for each API family your institution supports.

---

## Step 1 – Navigate to your Authorisation Server

1. Sign in to the Trust Framework directory.
2. Navigate to your **Organisation**.
3. Open the **Auth Servers** section and select your authorisation server.
4. Open the **API Resources** section.
5. Click **+ New API Resource**.

---

## Step 2 – Select the API Family

1. From the **API Family** dropdown, select the family that corresponds to the API you are registering (e.g. `Bank Account and Transaction` for banking data sharing).

The available families are defined by the ecosystem. If the family you need is not listed, contact the Open Finance UAE team.

::: tip
You can retrieve the full list of available API families via the Trust Framework API: [`GET /references/apifamilies`](/tech/lfi-api-hub/trust-framework/api/api-families).
:::

---

## Step 3 – Provide the Base URL

Enter the **Base URL** for this API on your infrastructure. This is the root URL that TPPs will prepend to the API path when making requests.

For example, if your data sharing API is hosted at:

```
https://api.example.com/open-finance/v2.1
```

TPPs would call:

```
https://api.example.com/open-finance/v2.1/accounts
```

The base URL must:
- Use HTTPS
- Be publicly reachable from the internet (or at minimum from the Open Finance UAE test and production environments)
- Not include a trailing slash

---

## Step 4 – Provide the API Version

Enter the **version** of the API specification your implementation conforms to (e.g. `v2.1`). This helps TPPs and the platform identify which version of the standard your endpoint implements.

---

## Step 5 – Provide Metadata (Optional but Recommended)

Optionally provide additional metadata for this API resource. See [API Resource Meta Data](./meta) for a description of each field.

These fields improve the experience for TPPs and operators browsing the directory:

- **Customer Friendly Name** — a human-readable name for this resource
- **Customer Friendly Description** — a short description of what this resource provides
- **Developer Portal URI** — a URL with documentation specific to this resource
- **Terms of Service URI** — a URL to the terms governing access to this resource

---

## Step 6 – Save the API Resource

1. Review all fields.
2. Click **Create** (or **Save**) to register the API resource.

The resource will now appear under your authorisation server entry in the directory. TPPs querying the directory will see this resource and can register for the corresponding scopes.

---

## Repeating for Additional API Families

If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–6 for each family. Each family must be registered as a separate API resource with its own base URL.

---

## Verifying Registration

You can verify that your API resource is correctly registered by calling the Trust Framework API:

[`GET /organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources`](/tech/lfi-api-hub/trust-framework/api/api-resources)

This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory.
