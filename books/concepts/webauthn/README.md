WebAuthn is a standard which defines how to use [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
for authentication in web applications.  By using public key credentials,
WebAuthn improves the security of an application by reducing or eliminating the
need for less secure credentials like passwords and OTPs, which require shared
secrets and are easily phishable.

WebAuthn is the culmination of many years of effort spearheaded by the
[FIDO Alliance](https://fidoalliance.org/), resulting in the publication of the
[Web Authentication](https://www.w3.org/TR/webauthn-2/) specification by the
[World Wide Web Consortium](https://www.w3.org/) (W3C).  The WebAuthn
specification defines a client-side JavaScript API that allows web applications
to use public key credentials.  This specification itself depends on lower-level
[specifications](https://fidoalliance.org/specifications/) from the FIDO
Alliance which define data structures and protocols for a computer or mobile
phone to communicate with the device on which the credentials are stored.  This
stack, collectively known as [FIDO2](https://fidoalliance.org/fido2/), is paired
with software that authenticates public key credentials on the server-side.

Compared with the relative simplicity of authenticating a username and password
(setting aside the inherent security concerns), authenticating public key
credentials involves many more moving pieces.  Additionally, a user is being
authenticated with a possession factor - something they have like their laptop
with fingerprint recognition or a portable security key such as a [YubiKey](https://www.yubico.com/).
