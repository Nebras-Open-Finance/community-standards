---
next: false
prev: false
aside: false
---

# ATMs

The ATM API lets a TPP retrieve ATM location and service data published by LFIs. It is a read-only, public-data API — no user consent or redirect is required. 

::: info Required role: BDSP
Access to the ATM API requires the **BDSP** (Bank Data Sharing Provider) role. This role must be assigned to your application in the Trust Framework before calling the endpoint. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.
:::

<LiveAPIs families="['atm']" />

## What the API returns

A single `GET /atms` call returns all ATMs published by an LFI. Each ATM record includes:

| Field | Description |
|-------|-------------|
| `ATMId` | Unique terminal identifier |
| `LFIId` / `LFIBrandId` | Identifies the owning LFI and brand |
| `Location` | Address and GPS coordinates |
| `Services` | Supported transaction types (e.g. `CashWithdrawal`, `Balance`, `PINChange`) |
| `Accessibility` | Accessibility features (e.g. `WheelchairAccess`, `AudioCashMachine`) |
| `SupportedCurrencies` | ISO 4217 currency codes accepted |
| `Availability` | Operational status and opening hours |
| `ATMFee` | Fee schedule for cross-bank and international transactions |
| `MinimumPossibleAmount` / `MaximumPossibleAmount` | Withdrawal amount limits |

