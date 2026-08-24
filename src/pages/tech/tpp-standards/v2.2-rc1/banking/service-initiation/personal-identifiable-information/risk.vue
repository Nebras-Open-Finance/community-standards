<route lang="yaml">
meta:
  title: Risk
</route>

<script setup lang="ts">
const merchantExample = `{
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
}`

const a2aExample = `{
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
}`

const subscriptionExample = `{
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
}`

const delegatedScaExample = `{
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
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation &middot; PII &middot; Risk
        </div>
        <h1 class="ed-doc__title">
          Risk
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <code>Risk</code> object is a required part of the PII payload submitted at both
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>
          (consent staging) and
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
          (payment initiation). It carries contextual signals about the debtor, the transaction, and the
          creditor that the LFI uses for fraud scoring and risk assessment.
        </p>
        <p class="ed-doc__lede">
          <strong>TPPs must populate every field that is known or derivable from their system.</strong>
          Omitting available data degrades the LFI's ability to assess the payment accurately. At the same
          time, the schema enforces <code>additionalProperties: false</code> at the root &mdash; no fields
          outside the defined schema are permitted.
        </p>
        <p class="ed-doc__lede">
          Like all PII, the <code>Risk</code> object is encrypted inside the JWE and is only readable by the
          destination LFI.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="schema-overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Schema Overview"
      title="Four top-level properties of the Risk object"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>DebtorIndicators</code></td><td>Signals about the user: authentication method, device, location, account history</td></tr>
            <tr><td><code>TransactionIndicators</code></td><td>Signals about the transaction itself: channel, customer presence, merchant context</td></tr>
            <tr><td><code>CreditorIndicators</code></td><td>Signals about the payee: account type, merchant details, COP verification</td></tr>
            <tr><td><code>DestinationDeliveryAddress</code></td><td>Postal delivery address for the goods or services, if applicable</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="debtor-indicators"
      num="02"
      color="var(--at-gold)"
      eyebrow="DebtorIndicators"
      title="Who is making the payment and how they authenticated"
      tone="surface"
    >
      <h3>Authentication</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>AuthenticationChannel</code></td><td>enum</td><td>Channel on which the user authenticated: <code>App</code>, <code>Web</code></td></tr>
            <tr><td><code>PossessionFactor.IsUsed</code></td><td>boolean</td><td>Whether a possession factor was used</td></tr>
            <tr><td><code>PossessionFactor.Type</code></td><td>enum</td><td><code>FIDO2SecurityKey</code>, <code>Passkey</code>, <code>OTPDevice</code>, <code>OTPApp</code>, <code>SMSOTP</code>, <code>EmailOTP</code>, <code>PushNotification</code>, <code>WebauthnToken</code>, <code>SecureEnclaveKey</code>, <code>HardwareOTPKey</code>, <code>TrustedDevice</code>, <code>Other</code></td></tr>
            <tr><td><code>KnowledgeFactor.IsUsed</code></td><td>boolean</td><td>Whether a knowledge factor was used</td></tr>
            <tr><td><code>KnowledgeFactor.Type</code></td><td>enum</td><td><code>PIN</code>, <code>Password</code>, <code>SecurityQuestion</code>, <code>SMSOTP</code>, <code>EmailOTP</code>, <code>OTPPush</code>, <code>Other</code></td></tr>
            <tr><td><code>InherenceFactor.IsUsed</code></td><td>boolean</td><td>Whether a biometric/inherence factor was used</td></tr>
            <tr><td><code>InherenceFactor.Type</code></td><td>enum</td><td><code>Biometric</code>, <code>Fingerprint</code>, <code>FaceRecognition</code>, <code>IrisScan</code>, <code>VoiceRecognition</code>, <code>FIDOBiometric</code>, <code>DeviceBiometrics</code>, <code>Other</code></td></tr>
            <tr><td><code>ChallengeOutcome</code></td><td>enum</td><td>Result of MFA: <code>Pass</code>, <code>Fail</code>, <code>NotPerformed</code></td></tr>
            <tr><td><code>AuthenticationFlow</code></td><td>enum</td><td><code>MFA</code>, <code>Other</code></td></tr>
            <tr><td><code>AuthenticationValue</code></td><td>string</td><td>Cryptographic proof of authentication, where supported</td></tr>
            <tr><td><code>ChallengeDateTime</code></td><td>date-time</td><td>When the authentication challenge was completed</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>UserName</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>en</code></td><td>string</td><td>User's name in English</td></tr>
            <tr><td><code>ar</code></td><td>string</td><td>User's name in Arabic</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>GeoLocation</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Latitude</code></td><td>string</td><td>Yes</td><td>GPS latitude of the user's device</td></tr>
            <tr><td><code>Longitude</code></td><td>string</td><td>Yes</td><td>GPS longitude of the user's device</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>DeviceInformation</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>DeviceId</code></td><td>string</td><td>IMEISV number of the device</td></tr>
            <tr><td><code>AlternativeDeviceId</code></td><td>string</td><td>Alternative device identifier</td></tr>
            <tr><td><code>DeviceOperatingSystem</code></td><td>string</td><td>OS name (e.g. iOS, Android)</td></tr>
            <tr><td><code>DeviceOperatingSystemVersion</code></td><td>string</td><td>OS version</td></tr>
            <tr><td><code>DeviceBindingId</code></td><td>string</td><td>Identifier binding the device to this application</td></tr>
            <tr><td><code>LastBindingDateTime</code></td><td>date-time</td><td>When the device was last bound</td></tr>
            <tr><td><code>BindingDuration</code></td><td>duration</td><td>ISO 8601 duration since last binding (e.g. <code>P30D</code>)</td></tr>
            <tr><td><code>BindingStatus</code></td><td>enum</td><td><code>Active</code>, <code>Expired</code>, <code>Revoked</code>, <code>Suspended</code></td></tr>
            <tr><td><code>DeviceType</code></td><td>enum</td><td><code>Mobile</code>, <code>Desktop</code>, <code>Tablet</code>, <code>Wearable</code>, <code>Other</code></td></tr>
            <tr><td><code>DeviceManufacturer.Model</code></td><td>string</td><td>Device model name</td></tr>
            <tr><td><code>DeviceManufacturer.Manufacturer</code></td><td>string</td><td>Device manufacturer</td></tr>
            <tr><td><code>DeviceLanguage</code></td><td>string</td><td>Device language setting</td></tr>
            <tr><td><code>DeviceLocalDateTime</code></td><td>string</td><td>Local time on the device at initiation</td></tr>
            <tr><td><code>ConnectionType</code></td><td>enum</td><td><code>WiFi</code>, <code>Cellular</code>, <code>Other</code></td></tr>
            <tr><td><code>ScreenInformation.PixelDensity</code></td><td>number</td><td>Screen pixel density</td></tr>
            <tr><td><code>ScreenInformation.Orientation</code></td><td>enum</td><td><code>Portrait</code>, <code>Landscape</code></td></tr>
            <tr><td><code>BatteryStatus.Level</code></td><td>number</td><td>Battery level 0&ndash;100</td></tr>
            <tr><td><code>BatteryStatus.IsCharging</code></td><td>boolean</td><td>Whether device is charging</td></tr>
            <tr><td><code>TouchSupport.Supported</code></td><td>boolean</td><td>Whether the device supports touch input</td></tr>
            <tr><td><code>TouchSupport.MaxTouchPoints</code></td><td>integer</td><td>Maximum simultaneous touch points</td></tr>
            <tr><td><code>MotionSensors.Status</code></td><td>enum</td><td><code>InMotion</code>, <code>Stationary</code></td></tr>
            <tr><td><code>MotionSensors.Accelerometer</code></td><td>boolean</td><td>Whether accelerometer is present</td></tr>
            <tr><td><code>MotionSensors.Gyroscope</code></td><td>boolean</td><td>Whether gyroscope is present</td></tr>
            <tr><td><code>DeviceEnvironmentContext</code></td><td>array&lt;enum&gt;</td><td><code>VPNDetected</code>, <code>EmulatorDetected</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>AppInformation <em>(mobile apps)</em></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>AppVersion</code></td><td>string</td><td>Version of the TPP's mobile app</td></tr>
            <tr><td><code>PackageName</code></td><td>string</td><td>Application package identifier</td></tr>
            <tr><td><code>BuildNumber</code></td><td>string</td><td>Build number</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>BrowserInformation <em>(web sessions)</em></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>UserAgent</code></td><td>string</td><td>Full browser user agent string</td></tr>
            <tr><td><code>IsCookiesEnabled</code></td><td>boolean</td><td>Whether cookies are enabled</td></tr>
            <tr><td><code>AvailableFonts</code></td><td>array&lt;string&gt;</td><td>Installed fonts (fingerprinting signal)</td></tr>
            <tr><td><code>Plugins</code></td><td>array&lt;string&gt;</td><td>Installed browser plugins</td></tr>
            <tr><td><code>PixelRatio</code></td><td>number</td><td>Device pixel ratio</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>BiometricCapabilities</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>SupportsBiometric</code></td><td>boolean</td><td>Whether the device supports biometric authentication</td></tr>
            <tr><td><code>BiometricTypes</code></td><td>array&lt;enum&gt;</td><td><code>Fingerprint</code>, <code>FacialRecognition</code>, <code>Iris</code>, <code>VoicePrint</code>, <code>Other</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>UserBehavior</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ScrollBehavior.Direction</code></td><td>enum</td><td><code>Up</code>, <code>Down</code>, <code>Both</code></td></tr>
            <tr><td><code>ScrollBehavior.Speed</code></td><td>number</td><td>Average scroll speed in pixels per second</td></tr>
            <tr><td><code>ScrollBehavior.Frequency</code></td><td>number</td><td>Scroll events per minute</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>AccountRiskIndicators</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>UserOnboardingDateTime</code></td><td>date-time</td><td>When the user's account was first activated with the TPP</td></tr>
            <tr><td><code>LastAccountChangeDate</code></td><td>date</td><td>Date the account details were last changed</td></tr>
            <tr><td><code>LastPasswordChangeDate</code></td><td>date</td><td>Date of the last password change</td></tr>
            <tr><td><code>SuspiciousActivity</code></td><td>enum</td><td><code>NoSuspiciousActivity</code>, <code>SuspiciousActivityDetected</code></td></tr>
            <tr><td><code>TransactionHistory.LastDay</code></td><td>integer</td><td>Total transactions in the last 24 hours</td></tr>
            <tr><td><code>TransactionHistory.LastYear</code></td><td>integer</td><td>Total transactions in the past year</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>SupplementaryData</h3>
      <EdProse>
        Free-form object for any debtor-side signals that do not fit the structured fields (e.g. typing speed,
        behavioural biometrics).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="transaction-indicators"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="TransactionIndicators"
      title="The nature of the transaction itself"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>IsCustomerPresent</code></td><td>boolean</td><td><code>true</code> if the user is actively present during initiation; <code>false</code> for automated/background payments</td></tr>
            <tr><td><code>IsContractPresent</code></td><td>boolean</td><td><code>true</code> if there is a contractual relationship between the creditor and the TPP for this payment</td></tr>
            <tr><td><code>Channel</code></td><td>enum</td><td><code>Web</code>, <code>Mobile</code></td></tr>
            <tr><td><code>ChannelType</code></td><td>enum</td><td><code>ECommerce</code>, <code>InStore</code>, <code>InApp</code>, <code>Telephone</code>, <code>Mail</code>, <code>RecurringPayment</code>, <code>Other</code></td></tr>
            <tr><td><code>SubChannelType</code></td><td>enum</td><td><code>WebBrowser</code>, <code>MobileApp</code>, <code>SmartTV</code>, <code>WearableDevice</code>, <code>POSTerminal</code>, <code>ATM</code>, <code>KioskTerminal</code>, <code>Other</code></td></tr>
            <tr><td><code>PaymentProcess.TotalDuration</code></td><td>integer</td><td>Seconds from payment initiation to submission</td></tr>
            <tr><td><code>PaymentProcess.CurrentSessionAttempts</code></td><td>integer</td><td>Payment attempts in the current session</td></tr>
            <tr><td><code>PaymentProcess.CurrentSessionFailedAttempts</code></td><td>integer</td><td>Failed attempts in the current session</td></tr>
            <tr><td><code>PaymentProcess.Last24HourAttempts</code></td><td>integer</td><td>Total payment attempts in the last 24 hours</td></tr>
            <tr><td><code>PaymentProcess.Last24HourFailedAttempts</code></td><td>integer</td><td>Failed attempts in the last 24 hours</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>MerchantRisk <em>(e-commerce payments)</em></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>DeliveryTimeframe</code></td><td>enum</td><td><code>ElectronicDelivery</code>, <code>SameDayShipping</code>, <code>OvernightShipping</code>, <code>MoreThan1DayShipping</code></td></tr>
            <tr><td><code>ReorderItemsIndicator</code></td><td>enum</td><td><code>FirstTimeOrder</code>, <code>Reorder</code></td></tr>
            <tr><td><code>PreOrderPurchaseIndicator</code></td><td>enum</td><td><code>MerchandiseAvailable</code>, <code>FutureAvailability</code></td></tr>
            <tr><td><code>IsGiftCardPurchase</code></td><td>boolean</td><td>Whether the transaction includes a gift card</td></tr>
            <tr><td><code>IsDeliveryAddressMatchesBilling</code></td><td>boolean</td><td>Whether delivery address matches billing address</td></tr>
            <tr><td><code>AddressMatchLevel</code></td><td>enum</td><td><code>FullMatch</code>, <code>PartialMatch</code>, <code>NoMatch</code>, <code>NotApplicable</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>SupplementaryData</h3>
      <EdProse>
        Free-form object for transaction-side signals outside the structured fields.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="creditor-indicators"
      num="04"
      color="var(--at-navy)"
      eyebrow="CreditorIndicators"
      title="Information about the payee (beneficiary)"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>AccountType</code></td><td>enum</td><td><code>Retail</code>, <code>Corporate</code></td></tr>
            <tr><td><code>IsCreditorPrePopulated</code></td><td>boolean</td><td><code>true</code> if the TPP pre-filled the beneficiary details rather than the user entering them</td></tr>
            <tr><td><code>TradingName</code></td><td>string</td><td>Trading name of the creditor, if a business</td></tr>
            <tr><td><code>IsVerifiedByTPP</code></td><td>boolean</td><td><code>true</code> if the TPP has onboarded and verified the creditor</td></tr>
            <tr><td><code>IsCreditorConfirmed</code></td><td>boolean</td><td><code>true</code> if beneficiary account details were confirmed via Confirmation of Payee</td></tr>
            <tr><td><code>AdditionalAccountHolderIdentifiers</code></td><td>array</td><td>Additional identifiers for the creditor &mdash; each requires <code>SchemeName</code> (<code>EmiratesID</code> or <code>TradeLicenceNumber</code>) and <code>Identification</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>MerchantDetails <em>(merchant payments only)</em></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>MerchantId</code></td><td>string</td><td>Merchant identifier (8&ndash;20 chars)</td></tr>
            <tr><td><code>MerchantName</code></td><td>string</td><td>Merchant trading name</td></tr>
            <tr><td><code>MerchantSICCode</code></td><td>string</td><td>Standard Industrial Classification code (3&ndash;4 chars)</td></tr>
            <tr><td><code>MerchantCategoryCode</code></td><td>string</td><td>ISO 18245 merchant category code (3&ndash;4 chars)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>SupplementaryData</h3>
      <EdProse>
        Free-form object for creditor-side signals outside the structured fields.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="delivery-address"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="DestinationDeliveryAddress"
      title="Postal address for goods or services delivery"
      tone="cream"
    >
      <EdProse>
        Postal address for delivery of goods or services. Provide this when the payment is for physical goods
        being shipped.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>RecipientType</code></td><td>enum</td><td><code>Individual</code>, <code>Corporate</code></td></tr>
            <tr><td><code>RecipientName.en</code></td><td>string</td><td>Recipient name in English</td></tr>
            <tr><td><code>RecipientName.ar</code></td><td>string</td><td>Recipient name in Arabic</td></tr>
            <tr><td><code>NationalAddress</code></td><td>array</td><td>One or more postal addresses &mdash; see <code>AEAddress</code> schema for full field list including <code>AddressType</code>, <code>AddressLine</code>, <code>Country</code>, and UAE-specific fields such as <code>CountrySubDivision</code> (Emirate)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="examples"
      num="06"
      color="var(--at-gold)"
      eyebrow="Payment Context Examples"
      title="Minimum expected content for common scenarios"
      tone="surface"
    >
      <EdProse>
        The fields you must populate vary significantly depending on the payment scenario. The following
        examples show the minimum expected content for common cases.
      </EdProse>

      <EdNote type="warning" title="Populate everything you know">
        <p>
          These examples are illustrative minimums. If your system holds additional signals &mdash; device
          binding age, transaction history, browser fingerprint &mdash; include them. Missing data that your
          system holds weakens the LFI's risk assessment.
        </p>
      </EdNote>

      <h3>Merchant / E-Commerce Payment</h3>
      <EdProse>
        A retail customer checks out on the TPP's web storefront. The user is present, authenticated with
        username/password + OTP, and paying a known merchant.
      </EdProse>
      <EdCode :code="merchantExample" lang="json" filename="Risk — merchant / e-commerce" />

      <h3>Account-to-Account Transfer</h3>
      <EdProse>
        A user transfers funds to a friend or family member from within the TPP's mobile app. The user is
        present, authenticated with biometrics on a known device.
      </EdProse>
      <EdCode :code="a2aExample" lang="json" filename="Risk — account-to-account" />

      <h3>Subscription / Recurring Payment (Customer Not Present)</h3>
      <EdProse>
        A recurring subscription payment initiated automatically by the TPP's backend &mdash; for example, a
        monthly SaaS fee. The user is not present; the payment is executed under a standing consent.
      </EdProse>
      <EdCode :code="subscriptionExample" lang="json" filename="Risk — subscription" />

      <h3>Delegated SCA Payment</h3>
      <EdProse>
        A payment where the user has completed SCA at the TPP (satisfying the bank's SCA requirement by
        delegation). The user is present, authenticated with a strong combination of factors on a trusted
        device, and the TPP is asserting authentication on behalf of the bank.
      </EdProse>
      <EdCode :code="delegatedScaExample" lang="json" filename="Risk — delegated SCA" />
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
