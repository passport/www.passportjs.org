- WebAuthn Relying Party
- Authenticators
   - can support attestation (proof of their properties)
- Credentials
   - scoped to a relying party (website)
      scoping is jointly enforced by the browser and authenticator, in what is known as origin binding
- Authenticators being implemented on device are called platform authenticators
    could be hardwared protected  
  Authenticators off device are called roaming authenticators, and use BLE, NFC, etc

WebAuthn/FIDO2 protocol - combination of HTTP, website, API, authenticator, and back in reverse
  diagram this.
  
Registration: first time flow in which a new credential is created and registered with the server
  - variations here: add to existing account, create new account

Authentication: flow when a user has already registered

Review Section 1.3.3 about hinting the list of credentials with credential IDs

2.2.1 - Authenticators that only support the § 8.6 FIDO U2F Attestation Statement Format have
no mechanism to store a user handle, so the returned userHandle will always be null.

Attestation provides verifiable evidence regarding the origin and provenance of an authenticator.  This
is mostly used in enterprise contexts.  Obtained during registration



Terminology:
Level 3 added Backup-related capabilities, note new terminology in terminology section
  "multi-device credential" vs "single-device credential"

"Bound credential"
 - Note, however, that a server-side credential might not be physically stored in persistent memory inside the authenticator, hence "bound to" is the primary term. See § 6.2.2 Credential Storage Modality.
   explain this more

Client vs Client Device distinction - explain this, especially how credentials are bound

In L3 draft, Passkey is now a synonym of discoverable credential

Client-Side Discoverable is also known as Resident Keys
  - usable when the user is not identified first
  "This is in contrast to a Server-side Public Key Credential Source, which requires that the authenticator is given both the RP ID and the credential ID but does not require client-side storage of the public key credential source."
