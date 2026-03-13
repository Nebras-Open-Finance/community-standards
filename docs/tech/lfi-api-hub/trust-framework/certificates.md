---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

<!--@include: ../../tpp-standards/trust-framework/_shared/certificates.md-->

<script setup>
const images = [
  {
    src: new URL('/images/raidiam/generate-transport-certificate/1.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Within your application click App Certificates'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/2.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click +New Certificate'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/3.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Select the Certificate you are intending to generate.',
    tagline: `Transport, Signing or Encryption`
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/4.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Create a script to generate your private key (.key) and CSR',
    tagline: `The OpenSSL script provided is intended for demonstration and testing purposes only. In production environments, private key generation and CSR creation should be performed within a Hardware Security Module (HSM) or equivalent secure key management infrastructure, in accordance with your security policies.`
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/5.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Generate your CSR',
    tagline: `The OpenSSL script provided is intended for demonstration and testing purposes only. In production environments, private key generation and CSR creation should be performed within a Hardware Security Module (HSM) or equivalent secure key management infrastructure, in accordance with your security policies.`
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/6.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'CSR Generated'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/7.png', import.meta.url).href,
    alt: 'Step 7',
    title: 'Upload your CSR'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/8.png', import.meta.url).href,
    alt: 'Step 8',
    title: 'Upload the .CSR file'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/9.png', import.meta.url).href,
    alt: 'Step 9',
    title: 'Your certificate is generated and ready to be downloaded'
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/10.png', import.meta.url).href,
    alt: 'Step 10',
    title: 'You now have the certificate (.PEM) and Key (.Key) pair',
  },
  {
    src: new URL('/images/raidiam/generate-transport-certificate/11.png', import.meta.url).href,
    alt: 'Step 11',
    title: 'You can find and copy the Key Id (kid) here',
  },
]
</script>
