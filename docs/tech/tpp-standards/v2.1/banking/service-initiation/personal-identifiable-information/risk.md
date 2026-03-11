---
next: false
prev: false
aside: false
---

# Risk

The `Risk` object is a required part of the PII payload submitted at both `POST /par` (consent staging) and `POST /payments` (payment initiation). It carries contextual signals about the debtor, the transaction, and the creditor that the LFI uses for fraud scoring and risk assessment.

**TPPs must populate every field that is known or derivable from their system.** Omitting available data degrades the LFI's ability to assess the payment accurately. At the same time, the schema enforces `additionalProperties: false` at the root — no fields outside the defined schema are permitted.

Like all PII, the `Risk` object is encrypted inside the JWE and is only readable by the destination LFI.

## Schema Overview

The `Risk` object has four top-level properties:

| Property | Description |
|----------|-------------|
| `DebtorIndicators` | Signals about the user: authentication method, device, location, account history |
| `TransactionIndicators` | Signals about the transaction itself: channel, customer presence, merchant context |
| `CreditorIndicators` | Signals about the payee: account type, merchant details, COP verification |
| `DestinationDeliveryAddress` | Postal delivery address for the goods or services, if applicable |


## DebtorIndicators

Describes who is making the payment and how they authenticated.

### Authentication

| Field | Type | Description |
|-------|------|-------------|
| `AuthenticationChannel` | enum | Channel on which the user authenticated: `App`, `Web` |
| `PossessionFactor.IsUsed` | boolean | Whether a possession factor was used |
| `PossessionFactor.Type` | enum | `FIDO2SecurityKey`, `Passkey`, `OTPDevice`, `OTPApp`, `SMSOTP`, `EmailOTP`, `PushNotification`, `WebauthnToken`, `SecureEnclaveKey`, `HardwareOTPKey`, `TrustedDevice`, `Other` |
| `KnowledgeFactor.IsUsed` | boolean | Whether a knowledge factor was used |
| `KnowledgeFactor.Type` | enum | `PIN`, `Password`, `SecurityQuestion`, `SMSOTP`, `EmailOTP`, `OTPPush`, `Other` |
| `InherenceFactor.IsUsed` | boolean | Whether a biometric/inherence factor was used |
| `InherenceFactor.Type` | enum | `Biometric`, `Fingerprint`, `FaceRecognition`, `IrisScan`, `VoiceRecognition`, `FIDOBiometric`, `DeviceBiometrics`, `Other` |
| `ChallengeOutcome` | enum | Result of MFA: `Pass`, `Fail`, `NotPerformed` |
| `AuthenticationFlow` | enum | `MFA`, `Other` |
| `AuthenticationValue` | string | Cryptographic proof of authentication, where supported |
| `ChallengeDateTime` | date-time | When the authentication challenge was completed |

### UserName

| Field | Type | Description |
|-------|------|-------------|
| `en` | string | User's name in English |
| `ar` | string | User's name in Arabic |

### GeoLocation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Latitude` | string | Yes | GPS latitude of the user's device |
| `Longitude` | string | Yes | GPS longitude of the user's device |

### DeviceInformation

| Field | Type | Description |
|-------|------|-------------|
| `DeviceId` | string | IMEISV number of the device |
| `AlternativeDeviceId` | string | Alternative device identifier |
| `DeviceOperatingSystem` | string | OS name (e.g. iOS, Android) |
| `DeviceOperatingSystemVersion` | string | OS version |
| `DeviceBindingId` | string | Identifier binding the device to this application |
| `LastBindingDateTime` | date-time | When the device was last bound |
| `BindingDuration` | duration | ISO 8601 duration since last binding (e.g. `P30D`) |
| `BindingStatus` | enum | `Active`, `Expired`, `Revoked`, `Suspended` |
| `DeviceType` | enum | `Mobile`, `Desktop`, `Tablet`, `Wearable`, `Other` |
| `DeviceManufacturer.Model` | string | Device model name |
| `DeviceManufacturer.Manufacturer` | string | Device manufacturer |
| `DeviceLanguage` | string | Device language setting |
| `DeviceLocalDateTime` | string | Local time on the device at initiation |
| `ConnectionType` | enum | `WiFi`, `Cellular`, `Other` |
| `ScreenInformation.PixelDensity` | number | Screen pixel density |
| `ScreenInformation.Orientation` | enum | `Portrait`, `Landscape` |
| `BatteryStatus.Level` | number | Battery level 0–100 |
| `BatteryStatus.IsCharging` | boolean | Whether device is charging |
| `TouchSupport.Supported` | boolean | Whether the device supports touch input |
| `TouchSupport.MaxTouchPoints` | integer | Maximum simultaneous touch points |
| `MotionSensors.Status` | enum | `InMotion`, `Stationary` |
| `MotionSensors.Accelerometer` | boolean | Whether accelerometer is present |
| `MotionSensors.Gyroscope` | boolean | Whether gyroscope is present |
| `DeviceEnvironmentContext` | array\<enum\> | `VPNDetected`, `EmulatorDetected` |

### AppInformation *(mobile apps)*

| Field | Type | Description |
|-------|------|-------------|
| `AppVersion` | string | Version of the TPP's mobile app |
| `PackageName` | string | Application package identifier |
| `BuildNumber` | string | Build number |

### BrowserInformation *(web sessions)*

| Field | Type | Description |
|-------|------|-------------|
| `UserAgent` | string | Full browser user agent string |
| `IsCookiesEnabled` | boolean | Whether cookies are enabled |
| `AvailableFonts` | array\<string\> | Installed fonts (fingerprinting signal) |
| `Plugins` | array\<string\> | Installed browser plugins |
| `PixelRatio` | number | Device pixel ratio |

### BiometricCapabilities

| Field | Type | Description |
|-------|------|-------------|
| `SupportsBiometric` | boolean | Whether the device supports biometric authentication |
| `BiometricTypes` | array\<enum\> | `Fingerprint`, `FacialRecognition`, `Iris`, `VoicePrint`, `Other` |

### UserBehavior

| Field | Type | Description |
|-------|------|-------------|
| `ScrollBehavior.Direction` | enum | `Up`, `Down`, `Both` |
| `ScrollBehavior.Speed` | number | Average scroll speed in pixels per second |
| `ScrollBehavior.Frequency` | number | Scroll events per minute |

### AccountRiskIndicators

| Field | Type | Description |
|-------|------|-------------|
| `UserOnboardingDateTime` | date-time | When the user's account was first activated with the TPP |
| `LastAccountChangeDate` | date | Date the account details were last changed |
| `LastPasswordChangeDate` | date | Date of the last password change |
| `SuspiciousActivity` | enum | `NoSuspiciousActivity`, `SuspiciousActivityDetected` |
| `TransactionHistory.LastDay` | integer | Total transactions in the last 24 hours |
| `TransactionHistory.LastYear` | integer | Total transactions in the past year |

### SupplementaryData

Free-form object for any debtor-side signals that do not fit the structured fields (e.g. typing speed, behavioural biometrics).


## TransactionIndicators

Describes the nature of the transaction itself.

| Field | Type | Description |
|-------|------|-------------|
| `IsCustomerPresent` | boolean | `true` if the user is actively present during initiation; `false` for automated/background payments |
| `IsContractPresent` | boolean | `true` if there is a contractual relationship between the creditor and the TPP for this payment |
| `Channel` | enum | `Web`, `Mobile` |
| `ChannelType` | enum | `ECommerce`, `InStore`, `InApp`, `Telephone`, `Mail`, `RecurringPayment`, `Other` |
| `SubChannelType` | enum | `WebBrowser`, `MobileApp`, `SmartTV`, `WearableDevice`, `POSTerminal`, `ATM`, `KioskTerminal`, `Other` |
| `PaymentProcess.TotalDuration` | integer | Seconds from payment initiation to submission |
| `PaymentProcess.CurrentSessionAttempts` | integer | Payment attempts in the current session |
| `PaymentProcess.CurrentSessionFailedAttempts` | integer | Failed attempts in the current session |
| `PaymentProcess.Last24HourAttempts` | integer | Total payment attempts in the last 24 hours |
| `PaymentProcess.Last24HourFailedAttempts` | integer | Failed attempts in the last 24 hours |

### MerchantRisk *(e-commerce payments)*

| Field | Type | Description |
|-------|------|-------------|
| `DeliveryTimeframe` | enum | `ElectronicDelivery`, `SameDayShipping`, `OvernightShipping`, `MoreThan1DayShipping` |
| `ReorderItemsIndicator` | enum | `FirstTimeOrder`, `Reorder` |
| `PreOrderPurchaseIndicator` | enum | `MerchandiseAvailable`, `FutureAvailability` |
| `IsGiftCardPurchase` | boolean | Whether the transaction includes a gift card |
| `IsDeliveryAddressMatchesBilling` | boolean | Whether delivery address matches billing address |
| `AddressMatchLevel` | enum | `FullMatch`, `PartialMatch`, `NoMatch`, `NotApplicable` |

### SupplementaryData

Free-form object for transaction-side signals outside the structured fields.


## CreditorIndicators

Describes the payee (beneficiary).

| Field | Type | Description |
|-------|------|-------------|
| `AccountType` | enum | `Retail`, `Corporate` |
| `IsCreditorPrePopulated` | boolean | `true` if the TPP pre-filled the beneficiary details rather than the user entering them |
| `TradingName` | string | Trading name of the creditor, if a business |
| `IsVerifiedByTPP` | boolean | `true` if the TPP has onboarded and verified the creditor |
| `IsCreditorConfirmed` | boolean | `true` if beneficiary account details were confirmed via Confirmation of Payee |
| `AdditionalAccountHolderIdentifiers` | array | Additional identifiers for the creditor — each requires `SchemeName` (`EmiratesID` or `TradeLicenceNumber`) and `Identification` |

### MerchantDetails *(merchant payments only)*

| Field | Type | Description |
|-------|------|-------------|
| `MerchantId` | string | Merchant identifier (8–20 chars) |
| `MerchantName` | string | Merchant trading name |
| `MerchantSICCode` | string | Standard Industrial Classification code (3–4 chars) |
| `MerchantCategoryCode` | string | ISO 18245 merchant category code (3–4 chars) |

### SupplementaryData

Free-form object for creditor-side signals outside the structured fields.


## DestinationDeliveryAddress

Postal address for delivery of goods or services. Provide this when the payment is for physical goods being shipped.

| Field | Type | Description |
|-------|------|-------------|
| `RecipientType` | enum | `Individual`, `Corporate` |
| `RecipientName.en` | string | Recipient name in English |
| `RecipientName.ar` | string | Recipient name in Arabic |
| `NationalAddress` | array | One or more postal addresses — see `AEAddress` schema for full field list including `AddressType`, `AddressLine`, `Country`, and UAE-specific fields such as `CountrySubDivision` (Emirate) |


## Payment Context Examples

The fields you must populate vary significantly depending on the payment scenario. The following examples show the minimum expected content for common cases.

::: warning Populate everything you know
These examples are illustrative minimums. If your system holds additional signals — device binding age, transaction history, browser fingerprint — include them. Missing data that your system holds weakens the LFI's risk assessment.
:::

### Merchant / E-Commerce Payment

A retail customer checks out on the TPP's web storefront. The user is present, authenticated with username/password + OTP, and paying a known merchant.

```json
{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "Web",
        "KnowledgeFactor": { "IsUsed": true, "Type": "Password" },
        "PossessionFactor": { "IsUsed": true, "Type": "SMSOTP" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "ChallengeDateTime": "2025-06-19T10:14:32Z"
      },
      "GeoLocation": {
        "Latitude": "25.2048",
        "Longitude": "55.2708"
      },
      "BrowserInformation": {
        "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "IsCookiesEnabled": true,
        "PixelRatio": 2.0
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2023-01-15T08:00:00Z",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 1, "LastYear": 47 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Web",
      "ChannelType": "ECommerce",
      "SubChannelType": "WebBrowser",
      "PaymentProcess": {
        "TotalDuration": 94,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      },
      "MerchantRisk": {
        "DeliveryTimeframe": "SameDayShipping",
        "ReorderItemsIndicator": "FirstTimeOrder",
        "IsGiftCardPurchase": false,
        "IsDeliveryAddressMatchesBilling": true,
        "AddressMatchLevel": "FullMatch"
      }
    },
    "CreditorIndicators": {
      "AccountType": "Corporate",
      "IsCreditorPrePopulated": true,
      "IsVerifiedByTPP": true,
      "IsCreditorConfirmed": true,
      "MerchantDetails": {
        "MerchantId": "MERCH00012345",
        "MerchantName": "Acme Electronics LLC",
        "MerchantCategoryCode": "5732"
      }
    },
    "DestinationDeliveryAddress": {
      "RecipientType": "Individual",
      "RecipientName": { "en": "Mohammed Al Rashid" },
      "NationalAddress": [
        {
          "AddressType": "DeliveryTo",
          "AddressLine": ["Villa 12, Al Wasl Road"],
          "CountrySubDivision": "Dubai",
          "Country": "AE"
        }
      ]
    }
  }
}
```

### Account-to-Account Transfer

A user transfers funds to a friend or family member from within the TPP's mobile app. The user is present, authenticated with biometrics on a known device.

```json
{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "App",
        "InherenceFactor": { "IsUsed": true, "Type": "FaceRecognition" },
        "PossessionFactor": { "IsUsed": true, "Type": "Passkey" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "ChallengeDateTime": "2025-06-19T14:02:11Z"
      },
      "GeoLocation": {
        "Latitude": "24.4539",
        "Longitude": "54.3773"
      },
      "DeviceInformation": {
        "DeviceType": "Mobile",
        "DeviceOperatingSystem": "iOS",
        "DeviceOperatingSystemVersion": "17.5",
        "DeviceBindingId": "a3f8b2c1-9d4e-4f12-b77a-0e1234567890",
        "BindingStatus": "Active",
        "BindingDuration": "P180D",
        "ConnectionType": "WiFi",
        "DeviceEnvironmentContext": []
      },
      "AppInformation": {
        "AppVersion": "4.2.1",
        "PackageName": "ae.example.tppapp",
        "BuildNumber": "20250601"
      },
      "BiometricCapabilities": {
        "SupportsBiometric": true,
        "BiometricTypes": ["FacialRecognition", "Fingerprint"]
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2022-08-10T09:30:00Z",
        "LastAccountChangeDate": "2025-01-04",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 0, "LastYear": 112 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Mobile",
      "ChannelType": "InApp",
      "SubChannelType": "MobileApp",
      "PaymentProcess": {
        "TotalDuration": 38,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Retail",
      "IsCreditorPrePopulated": false,
      "IsVerifiedByTPP": false,
      "IsCreditorConfirmed": true
    }
  }
}
```

### Subscription / Recurring Payment (Customer Not Present)

A recurring subscription payment initiated automatically by the TPP's backend — for example, a monthly SaaS fee. The user is not present; the payment is executed under a standing consent.

```json
{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "ChallengeOutcome": "NotPerformed"
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2021-03-22T11:00:00Z",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 0, "LastYear": 24 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": false,
      "IsContractPresent": true,
      "ChannelType": "RecurringPayment",
      "PaymentProcess": {
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Corporate",
      "IsCreditorPrePopulated": true,
      "IsVerifiedByTPP": true,
      "IsCreditorConfirmed": true,
      "MerchantDetails": {
        "MerchantId": "MERCH00099887",
        "MerchantName": "CloudSoft FZ LLC",
        "MerchantCategoryCode": "7372"
      }
    }
  }
}
```

### Delegated SCA Payment

A payment where the user has completed SCA at the TPP (satisfying the bank's SCA requirement by delegation). The user is present, authenticated with a strong combination of factors on a trusted device, and the TPP is asserting authentication on behalf of the bank.

```json
{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "App",
        "PossessionFactor": { "IsUsed": true, "Type": "SecureEnclaveKey" },
        "InherenceFactor": { "IsUsed": true, "Type": "Fingerprint" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "AuthenticationValue": "eyJhbGciOiJFUzI1NiJ9...",
        "ChallengeDateTime": "2025-06-19T09:55:44Z"
      },
      "GeoLocation": {
        "Latitude": "25.1972",
        "Longitude": "55.2744"
      },
      "DeviceInformation": {
        "DeviceType": "Mobile",
        "DeviceOperatingSystem": "Android",
        "DeviceOperatingSystemVersion": "14",
        "DeviceBindingId": "d7e9c3a2-1b5f-4c88-a991-1f2345678901",
        "BindingStatus": "Active",
        "BindingDuration": "P365D",
        "ConnectionType": "Cellular",
        "DeviceEnvironmentContext": []
      },
      "AppInformation": {
        "AppVersion": "5.0.3",
        "PackageName": "ae.example.tppapp",
        "BuildNumber": "20250610"
      },
      "BiometricCapabilities": {
        "SupportsBiometric": true,
        "BiometricTypes": ["Fingerprint"]
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2020-11-01T08:00:00Z",
        "LastAccountChangeDate": "2024-12-01",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 2, "LastYear": 198 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Mobile",
      "ChannelType": "InApp",
      "SubChannelType": "MobileApp",
      "PaymentProcess": {
        "TotalDuration": 22,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 3,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Retail",
      "IsCreditorPrePopulated": false,
      "IsVerifiedByTPP": false,
      "IsCreditorConfirmed": true
    }
  }
}
```
