# OAuth 2.0

Google Identity supports [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2),
an open, industry-standard protocol that enables apps to securely call APIs.

Support for using OAuth 2.0 within Passport is provided by the [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)
strategy.  This strategy implements the OAuth 2.0 authorization code flow and
operates entirely within the backend, where the resulting tokens can receive the
strongest protections.

If you want to add a "Sign in with Google" button to your website or
application, we recommend using [OpenID Connect](../openid-connect/), rather
than OAuth 2.0.  OpenID Connect provides an identity layer on top of OAuth 2.0,
and using the combination provides complete authentication and authorization
capabilities, two features which are often paired together.

That being said, many applications don't require the capabilities of OpenID
Connect.  For instance, some applications may only need authorized access to
Google APIs, without using Google for authentication.  In these scenarios,
using OAuth 2.0 alone remains a viable and popular option.
