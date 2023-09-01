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
phone to communicate with an authenticator which stores the credentials.  This
stack, collectively known as [FIDO2](https://fidoalliance.org/fido2/), is paired
with software that authenticates public key credentials on the server-side.

Compared with the relative simplicity of authenticating a username and password,
authenticating a public key credential involves many more moving pieces.
Furthermore, how a user is being authenticated changes from something they know
(their password) to something they have (their laptop, phone, or USB security
key).

This shift in authentication, while greatly improving security, also introduces
new user journeys that a designer must illustrate and new functionality that a
developer must implement.  This guide provides an overview of WebAuthn and
explains these new concepts.  It details how Passport works when authenticating
public key credentials.  This guide will give you a better understanding of how
to build sign in experiences that are both more secure and easier to use.
