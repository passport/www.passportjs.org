https://developers.google.com/identity/gsi/web/guides/integrate
^ Good stuff here on redirect vs. popup

GSI is also an implicit flow (but not using IDP-IFrame) where ID token is used for auth


https://developers.google.com/identity/gsi/web/guides/supported-browsers
^ Notes on FedCM and other efforts


https://developers.google.com/identity/sign-in/web/server-side-flow

Legacy Sign-In is basically a implicit flow, where ID token is used for auth.
Or a hybrid flow, exchanging the code at the backend // TODO: make example for this


https://web.archive.org/web/20220401221354/https://lists.openid.net/pipermail/openid-specs-ab/Week-of-Mon-20151116/005865.html
^ has notes about relaying back to main window from popup

"This allows RP to get authorization code without the need to add
      an new endpoint to receive the response."




https://developers.facebook.com/docs/facebook-login/web/login-button
^ has comments on server-side registration code

https://developers.facebook.com/docs/facebook-login/web/accesstokens
^ recommends passing access token back to server

https://developers.facebook.com/docs/facebook-login/guides/access-tokens
^ Yikes.  Calls tokens portable

https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived
^ Interesting.  Has new grant type for extending "short lived" access tokens after server auth

Also has a way to generate another long lived token from a long lived token, and then
issue it to other apps.  This all seems a bit overengineered equiv of refresh token

https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-session-info
^ talks about passing access tokens back to server and debug_token as historical

https://developers.facebook.com/docs/facebook-login/guides/%20access-tokens/debugging
^ debug token endpoint



// can webmessage or localstorage relay, etc
https://stackoverflow.com/questions/46711271/oauth2-implicit-grant-with-popup-without-localstorage

https://github.com/ricokahler/oauth2-popup-flow/blob/master/src/index.ts
https://gist.github.com/nightpool/a97dd650ed5eab10a64851f827a41d65

https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
https://blog.bitsrc.io/4-ways-to-communicate-across-browser-tabs-in-realtime-e4f5f6cbedca
https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event


https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
https://learn.microsoft.com/en-us/azure/active-directory-b2c/implicit-flow-single-page-application
https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow


## Classifications


Frontend-assisted authorization code flow - where state is maintained on frontend

Hybrid - per OIDC definition, some tokens issued from token endpoint


Implicit with token-based authentication



# Architectures

https://www.ietf.org/archive/id/draft-ietf-oauth-browser-based-apps-13.html

Single Domain (not OAuth -> use cookies)

