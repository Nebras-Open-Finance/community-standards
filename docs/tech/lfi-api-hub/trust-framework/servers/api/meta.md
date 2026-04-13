---
next: false
prev: false
aside: false
---

🕒 **10 minute read**

# API Resource – Meta Data

Each API resource registered in the Trust Framework carries a metadata schema specific to its API family. These metadata fields are surfaced in the directory and via [`GET /participants`](/tech/tpp-standards/trust-framework/open-api/participants), allowing TPPs to discover your institution's capabilities and configuration.

The metadata schemas described below correspond to version **2.1** of the Open Finance UAE standards. The full schema definitions can be retrieved programmatically via [`GET /references/apifamilies`](/tech/lfi-api-hub/trust-framework/api/api-families).

## Configuring Metadata

1. Click the actions menu on the API resource and select **Configure API Metadata**.
2. Enter the metadata fields for the API family. The required fields vary per family — see the sections below for details.

<ClientOnly>
    <Carousel :images="images1" />
</ClientOnly>

## Account Information (`account-information`)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| **AccountSubType** | Yes | `array` | Account sub-types supported for data sharing. One or more of: `CurrentAccount`, `Savings`, `CreditCard`, `Mortgage`, `Finance` |
| **OverLimitFees** | Optional | `string` | The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. `0.50`) |
| **DeprecationDate** | Optional | `string` | The date (`YYYY-MM-DD`) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date |
| **RetirementDate** | Optional | `string` | The date (`YYYY-MM-DD`) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date |

### Example

```json
{
  "AccountSubType": ["CurrentAccount", "Savings", "CreditCard"],
  "OverLimitFees": "0.50"
}
```

## Payment Initiation (`payment`)

The `payment` family declares which payment types and consent models your institution supports. **All payment type fields are required** — set `Supported` to `false` for payment types you do not support.

### Simple payment types

These payment types require a single `Supported` boolean:

| Field | Required | Description |
|-------|----------|-------------|
| **SingleInstantPayment.Supported** | Yes | `true` if single instant payments are supported |
| **FixedDefinedSchedule.Supported** | Yes | `true` if fixed amount payments on a defined schedule are supported |
| **VariableDefinedSchedule.Supported** | Yes | `true` if variable amount payments on a defined schedule are supported |
| **FixedPeriodicSchedule.Supported** | Yes | `true` if fixed amount periodic payments are supported |
| **VariablePeriodicSchedule.Supported** | Yes | `true` if variable amount periodic payments are supported |
| **FixedOnDemand.Supported** | Yes | `true` if fixed amount on-demand payments are supported |

### Beneficiary-aware payment types

These payment types require additional detail about which beneficiary models are supported:

| Field | Required | Description |
|-------|----------|-------------|
| **VariableOnDemand.SingleBeneficiarySupported** | Yes | `true` if variable on-demand consents support a single beneficiary |
| **VariableOnDemand.MultipleBeneficiariesSupported** | Yes | `true` if variable on-demand consents support multiple beneficiaries (2–10) |
| **VariableOnDemand.OpenBeneficiariesSupported** | Yes | `true` if variable on-demand consents support unrestricted beneficiaries defined at the point of payment |
| **DelegatedAuthentication.SingleBeneficiarySupported** | Yes | `true` if delegated authentication consents support a single beneficiary |
| **DelegatedAuthentication.MultipleBeneficiariesSupported** | Yes | `true` if delegated authentication consents support multiple beneficiaries (2–10) |
| **DelegatedAuthentication.OpenBeneficiariesSupported** | Yes | `true` if delegated authentication consents support unrestricted beneficiaries defined at the point of payment |

### Lifecycle fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| **DeprecationDate** | Optional | `string` | The date (`YYYY-MM-DD`) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date |
| **RetirementDate** | Optional | `string` | The date (`YYYY-MM-DD`) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date |

### Example

```json
{
  "SingleInstantPayment": {
    "Supported": true
  },
  "FixedDefinedSchedule": {
    "Supported": true
  },
  "VariableDefinedSchedule": {
    "Supported": false
  },
  "FixedPeriodicSchedule": {
    "Supported": true
  },
  "VariablePeriodicSchedule": {
    "Supported": false
  },
  "FixedOnDemand": {
    "Supported": true
  },
  "VariableOnDemand": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": true,
    "OpenBeneficiariesSupported": false
  },
  "DelegatedAuthentication": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": false,
    "OpenBeneficiariesSupported": false
  }
}
```

## Confirmation of Payee (`confirmation`)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| **DeprecationDate** | Optional | `string` | The date (`YYYY-MM-DD`) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date |
| **RetirementDate** | Optional | `string` | The date (`YYYY-MM-DD`) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date |

## ATM (`atm`)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| **DeprecationDate** | Optional | `string` | The date (`YYYY-MM-DD`) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date |
| **RetirementDate** | Optional | `string` | The date (`YYYY-MM-DD`) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date |

## Products & Leads (`product`)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| **DeprecationDate** | Optional | `string` | The date (`YYYY-MM-DD`) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date |
| **RetirementDate** | Optional | `string` | The date (`YYYY-MM-DD`) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date |

<script setup>
const images1 = [
  {
    src: new URL('/images/raidiam/add-api/15.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click the actions menu and select Configure API Metadata'
  },
  {
    src: new URL('/images/raidiam/add-api/16.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Enter the metadata fields for the API family | The example shown is account-information with Account Sub Types set to CurrentAccount Savings CreditCard'
  },
]
</script>
