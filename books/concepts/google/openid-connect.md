# OpenID Connect

Google Identity implements [OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect),
an open, industry-standard protocol that provides an identity layer on top of
[OAuth 2.0](https://developers.google.com/identity/protocols/oauth2).  Combined,
these two protocols offer a complete authentication and authorization solution.

If you want to add a "Sign in with Google" button to your website or
application, we recommend using OpenID Connect with the [passport-google-oidc](https://www.passportjs.org/packages/passport-google-oidc/)
strategy.  This strategy implements the OpenID Connect authorization code flow
and operates entirely within the backend, where the resulting tokens can
receive the strongest security protections.
