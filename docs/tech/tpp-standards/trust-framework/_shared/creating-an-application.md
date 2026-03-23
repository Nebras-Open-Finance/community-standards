

# Walkthrough - Creating an Application

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

