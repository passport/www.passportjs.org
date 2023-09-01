# Terminology

In order to understand WebAuthn, it is helpful to define the fundamental
concepts.  WebAuthn introduces numerous concepts, so the terminology defined
here sets the baseline for further understanding.  More specific terminology
will be defined throughout this guide in later, more detailed sections.

When utilizing WebAuthn, users sign in using a device that they have - their
laptop, phone, or USB security key, for example.  This device is known as
an _authenticator_.

Authenticators create and store _credentials_.  A credential consists of a
public and private key pair.  When the key pair is created, the public key is
registered with your website or application, while the private key remains
confidentially stored by the authenticator.  During authentication, the
authenticator signs an _assertion_ using the private key.  The assertion is then
sent to the application, which verifies the assertion's signature using the
previously registered public key.  If sucessfully verified, the user is
authenticated.

When created, a credential is associated with the domain of the application it
is being registered with.  The credential is only valid at that domain.  This
is referred to as the credential being _scoped_ to a particular application.
Scoping is what makes public key credentials phishing resistant.  If a
credential for another domain is used in an attempt to log in to your
application, the application can detect the foreign domain and deny the attempt.

Your application is referred to as a _relying party_ (RP).  Relying party is a
term of art in the identity and access management industry, and refers to the
fact that your application is relying on assertions produced by an
authenticator.


-- TODO: below here

Authenticators may be on-device (platform authenticators) or off-device (roaming authenticators).  This
has implications on account recovery flows.
