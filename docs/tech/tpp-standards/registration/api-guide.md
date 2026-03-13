---
next: false
prev: false
aside: false
---



🕒 **10 minute read**



# Registering your Application

TPPs dynamically register their applications with LFIs by submitting a registration request to the LFI's `registration_endpoint`, which is discovered via the `.well-known` endpoint. This request includes the TPP application's transport certificate and corresponding private key to establish a secure and trusted connection.

## Prerequisites

Before registering with an Authorisation Server, ensure the following requirements are met:

- **Onboarded Organisation in the [Trust Framework](../trust-framework/)**  
  Your organisation must be successfully registered and approved within the Trust Framework.

- **Registered [Application](../trust-framework/application)**  
  The application must be created within the Trust Framework and assigned the appropriate [roles](../trust-framework/roles) required for the intended use case.

- **Valid [Transport Certificate](../trust-framework/certificates)**  
  An active transport certificate must be issued and registered in the Trust Framework to enable secure **mTLS communication** with the Authorisation Server.

- **Selected Authorisation Server**  
  You must identify the Authorisation Server you intend to register with by using [API Discovery](../trust-framework/api-discovery) to locate and select the appropriate endpoint.




## Retrieving the `registration_endpoint`

Once you have identified the Authorisation Server you want to register with, you can locate its registration endpoint via the (`.well-known` OpenID configuration)[../trust-framework/well-known]. 

Within the returned JSON from the `.well-known` look for:

`"registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration"`


This is the endpoint your TPP will use to register the application with.


## API Sequence Flow
<APIFlowViewer title="TPP Registration API Flow">
  <APIFlowsRegistration/>
</APIFlowViewer>



## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/tpp-registration`


#### Example Request


```bash
curl <registration_endpoint> \
  --request POST \
  --header 'Content-Type: application/json' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data '{}'
```

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates. Make sure that the 

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)


Once the registration is successful, you will receive a **204 No Content** response. This indicates that your application is registered with the server.

::: info Your Client ID is not returned here
`POST /tpp-registration` returns no body. Your `ClientId` is the UUID assigned to your application when it was created in the Trust Framework Directory — it is not issued by this endpoint. Find it on the application detail page: Organisation → Applications → select your application. See [Creating an Application](../trust-framework/application#your-client-id) for a screenshot.

You will need this value as `client_id`, `iss`, and `sub` in all Client Assertions and Request JWTs.
:::


## Activation

Registration does not automatically grant access. Once a TPP submits a registration request to an LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the TPP can communicate with the LFI.

::: info Model bank
Registration with the [model bank](/tech/tpp-standards/sandbox/model-bank) is activated automatically — no manual approval is required. For all other LFIs, activation must be performed by the LFI via their Admin Portal before the TPP can make API calls.
:::

For guidance on how an LFI activates a TPP's registration request via their Admin Portal, please review the [TPP Activation page](/tech/lfi-api-hub/admin-portal/tpp-activation).