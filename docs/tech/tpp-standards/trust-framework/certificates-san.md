---
next: false
prev: false
aside: false
---

🕒 **5 minute read**


# Create a CSR with Subject Alternative Name (SAN)


## Adding a Subject Alternative Name (SAN)
Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation. Instead, they require the Subject Alternative Name (SAN) extension.

To include a SAN directly in the CSR without needing a separate config file, you can use the -addext option:


``` bash
openssl req -new -newkey rsa:2048 -nodes \
-out ...-opf_uae_server_transport.csr \
-keyout ...-opf_uae_server_transport.key \
-subj "/C=AE/O=Organisation Name/OU=b345..." \
-sha256 \
-addext "subjectAltName=DNS:some.hostname.com"
```

In this example, some.hostname.com will appear in the SAN extension of the CSR. 

## Why SAN Instead of CN?
Historically, SSL/TLS certificates included the Common Name (CN) to specify the hostname. However:

CN is deprecated: As of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for validation.

SAN is mandatory: The Subject Alternative Name is now the authoritative field for hostname checking.

Multiple hostnames: SAN supports multiple DNS names (and even IP addresses), whereas CN supports only one.

For this reason, modern CSRs omit the CN entirely and rely solely on SAN.

## OpenSSL Version Support
The -addext option was introduced in OpenSSL 1.1.1 (released September 2018).
If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above.

On older versions of OpenSSL, you will need to use an external configuration file (openssl.cnf) to include SANs.