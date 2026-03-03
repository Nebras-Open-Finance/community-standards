---
next: false
prev: false
---

# Creating an Application

An **Application** in the Trust Framework represents a logical software statement for your API Hub integration. Each application holds its own set of keys and certificates used for connecting to the Hub.

Most LFIs will create a single application per environment (sandbox and production). If you operate multiple independent API systems, you may create separate applications for each.

## Creating an Application

1. Navigate to **Applications** in the Trust Framework portal.
2. Click **Create Application**.
3. Fill in the application details:

| Field | Description |
|---|---|
| **Name** | A descriptive name (e.g. "LFI API Hub – Production") |
| **Description** | Optional — describes the purpose of the application |
| **Environment** | Sandbox or Production |

4. Click **Create**.

The application is created in a **pending** state. You must add certificates and keys before it can be activated.

## Activating an Application

After adding keys and certificates (see [Keys and Certificates](./keys-certificates)):

1. Open the application and click **Request Activation**.
2. AlTareq will review the application and activate it, typically within 1–2 business days.
3. Once active, the application's software statement is visible in the Trust Framework directory.

::: info
The Hub will only process connections from applications with **Active** status. Pending or suspended applications will be rejected.
:::
