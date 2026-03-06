---
next: false
prev: false
aside: false
---

🕒 **5 minute read**


# Create a CSR with Subject Alternative Name (SAN)

::: info This page applies to LFI server certificates
The Subject Alternative Name (SAN) extension is required on **server-side** certificates — specifically the transport certificates LFIs present at their API Hub endpoints. TPPs generating client certificates (transport, signing, or encryption) do **not** add a SAN; they set the `CN` to their application's Client ID instead. See [Keys and Certificates](./certificates) for the TPP client certificate requirements.
:::


## Adding a Subject Alternative Name (SAN)

Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates.

To include a SAN directly in the CSR without needing a separate config file, you can use the `-addext` option:


```bash
openssl req -new -newkey rsa:2048 -nodes \
-out ...-opf_uae_server_transport.csr \
-keyout ...-opf_uae_server_transport.key \
-subj "/C=AE/O=Organisation Name/OU=b345..." \
-sha256 \
-addext "subjectAltName=DNS:some.hostname.com"
```

In this example, `some.hostname.com` will appear in the SAN extension of the CSR.

## Why SAN Instead of CN for Server Certificates?

Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However:

- **CN is deprecated** — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates.
- **SAN is mandatory** — the Subject Alternative Name is now the authoritative field for hostname checking.
- **Multiple hostnames** — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one.

For server certificates, modern CSRs omit CN and rely solely on SAN.

## OpenSSL Version Support
The -addext option was introduced in OpenSSL 1.1.1 (released September 2018).
If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above.

On older versions of OpenSSL, you will need to use an external configuration file (openssl.cnf) to include SANs.