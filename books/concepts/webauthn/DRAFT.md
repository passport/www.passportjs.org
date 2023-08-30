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

  