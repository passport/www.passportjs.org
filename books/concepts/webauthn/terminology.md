# Terminology

In WebAuthn, your application is a _relying party_.


An authenticator is a device on which the a public key credential is created or stored.  Any authenticator
can store multiple credentials for multiple relying parties.

Authenticators may be on-device (platform authenticators) or off-device (roaming authenticators).  This
has implications on account recovery flows.
