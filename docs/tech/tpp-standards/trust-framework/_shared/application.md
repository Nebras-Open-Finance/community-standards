# Application

Within the Trust Framework, an application performs two closely related roles: **software statement** and **client**.

As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes:
- the roles it is permitted to perform (e.g. BDSP, BSIP)
- the organisation it belongs to
- its approved capabilities and permissions

In this role, it defines the identity and permissions of the application as authorised within the ecosystem.

As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it:
- is issued credentials (such as a client ID and certificates)
- uses those credentials to make API calls and perform transactions
- is registered with the API Hub

In simple terms:

An application both defines what it is allowed to do and uses those permissions to interact with other participants, in line with the rules set by the Central Bank of the UAE.


## Application Details

Each application must include the following details:

| Feature | Description | Example |
|---------|-------------|---------|
| **Roles** | Functional roles assigned to the application, inherited from the parent organisation's registered roles. | `BSIP`, `BDSP` |
| **Client Name** | The public-facing name of the application as registered in the Trust Framework. | `MyApp v1` |
| **Version** | The current version of the application or software statement. | `1.0.3` |
| **Federation Entity Management Type** | Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). | `self-managed` |
| **Logo** | A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. | `logo.png` |
| **Redirect URI** | Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication.<br><br>More information on Mobile app [Redirect URIs](../trust-framework/redirect-uri) | `https://app.example.com/callback` |