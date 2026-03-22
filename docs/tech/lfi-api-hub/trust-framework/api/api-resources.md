---
next: false
prev: false
aside: false
---

# Retrieve all API resources for a given Authorisation Server

<RedocWrapper
    spec="/openapi/trust-framework.yaml"
    filterPath="/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources"
    :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
 />