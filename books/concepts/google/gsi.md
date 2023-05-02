# Sign In with Google

Google provides [Sign In with Google](https://developers.google.com/identity/gsi/web/guides/overview),
which is a browser-based SDK for adding authentication to a website.  This SDK
is also referred to as Google Identity Services (GIS) when it is [used for
authorization](https://developers.google.com/identity/oauth2/web/guides/overview)
to obtain access tokens for Google APIs.

(Note: Sign In with Google should not be confused with the similarly named
[Google Sign-In](../sign-in/).  This legacy library was deprecated on March 31,
2023.)

Sign In with Google is based on OpenID Connect and OAuth 2.0, and implements a
variant of the implicit flow.  The implicit flow executes within a browser using
client-side JavaScript and offers enhanced user experience via [One Tap](https://developers.google.com/identity/gsi/web/guides/offerings#one_tap),
[automatic sign-in](https://developers.google.com/identity/gsi/web/guides/offerings#automatic_sign-in),
and a [personalized button](https://developers.google.com/identity/gsi/web/guides/offerings#sign_in_with_google_button).

For applications that rely on Google as their primary method of authenticating
users, these enhancements may increase conversion and use of Sign In with Google
should be considered.  In this case, Sign In with Google can be used in
combination with the [`passport-google-one-tap`](https://www.passportjs.org/packages/passport-google-one-tap/)
strategy to [add authentication to the application's backend](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token).

For applications that offer Google alongside other social login options, we
recommend using [OpenID Connect](../openid-connect/).  This eliminates the need
to add a client-side JavaScript dependency, and instead operates on the
server-side where the resulting tokens can receive the strongest security
protections.  Furthermore, Passport itself lowers the implementation time and
reduces the amount of knowledge required to add OAuth support to an application.
