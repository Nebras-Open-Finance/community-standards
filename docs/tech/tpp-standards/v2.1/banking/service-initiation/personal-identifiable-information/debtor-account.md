---
next: false
prev: false
aside: false
---

# Debtor Account

::: info POST /par only
`Initiation.DebtorAccount` is only present in the PII submitted at `POST /par` (consent staging). It is **not part of the `POST /payments` PII schema**.

At payment time, the debtor account has already been determined: the user selected and authorised it during the consent flow at the LFI. There is no mechanism to change or re-specify the debtor account at `POST /payments`.
:::

`Initiation.DebtorAccount` is an **optional** field in the consent PII. It is used when the TPP already knows which account the user wants to pay from — for example, because the user selected it within the TPP's own application before being redirected to the LFI.

When provided, the LFI will pre-select this account on their authorisation screen. When omitted, the user chooses their account directly at the LFI during authorisation.

## Schema

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `SchemeName` | enum | Yes | Account identifier scheme — always `IBAN` | `IBAN` |
| `Identification` | string | Yes | The IBAN of the debtor account | `AE070331234567890123456` |
| `Name.en` | string | Yes* | Account holder name in English | `Ahmad Al Mansouri` |
| `Name.ar` | string | No | Account holder name in Arabic | `أحمد المنصوري` |

\* At least one of `Name.en` or `Name.ar` must be provided if `Name` is included.

## Example

POST /par PII with `DebtorAccount` provided:

```json
{
  "Initiation": {
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ahmad Al Mansouri",
        "ar": "أحمد المنصوري"
      }
    },
    "Creditor": [ ... ]   // see Creditor page
  },
  "Risk": { ... }
}
```

::: tip When to omit DebtorAccount
If your application does not hold the user's IBAN — for example, in a checkout flow where the user is paying from an account you have never seen — omit `DebtorAccount` entirely. The user will select their account at the LFI.
:::
