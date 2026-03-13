# Creating an Application

Within the Trust Framework, applications perform the **dual role of client and software statement** within the Open Finance ecosystem. Each application embodies the technical identity of a system integrating with other organisations and contains the essential data required to establish connections. As a software statement, it is a unique and verifiable declaration of the system's capabilities and intended actions, while as a client, it acts on behalf of the system to interact with other participants in the ecosystem.

## Walkthrough - Creating an Application

<ClientOnly>
  <Carousel :images="images1" />
</ClientOnly>

## Your Client ID

Once your application is created, the Trust Framework assigns it a **Client ID** — a UUID that permanently identifies this application. You will use this value as `client_id`, `iss`, and `sub` in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it.

<ImageViewer
  src="/images/raidiam/client_id_spotlight.png"
  alt="Client ID location in the Trust Framework application detail page"
/>

::: tip Where to find it later
Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application.
:::

## Application Details

Each application must include the following details:

| Feature | Description | Example |
|---------|-------------|---------|
| **Roles** | Functional roles assigned to the application, inherited from the parent organisation's registered roles. | `ASPSP`, `BSIP`, `BDSP` |
| **Client Name** | The public-facing name of the application as registered in the Trust Framework. | `MyApp v1` |
| **Version** | The current version of the application or software statement. | `1.0.3` |
| **Federation Entity Management Type** | Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). | `self-managed` |
| **Logo** | A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. | `logo.png` |
