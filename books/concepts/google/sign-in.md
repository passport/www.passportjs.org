# Google Sign-In

Google provides [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in),
which was [deprecated](https://developers.google.com/identity/sign-in/web/deprecation-and-sunset)
on March 31, 2023.  Google Sign-In is a browser-based SDK for adding
authentication to a website.  It has been superseded by [Sign In with Google](../gsi/)
which offers similar functionality and security enhancements.

(Note: Google Sign-In was previously known as Google+ Sign-In, until the
[introduction of the Google Identity Platform](https://developers.googleblog.com/2015/05/introducing-google-identity-platform.html)
on May 28, 2015.  [Google+](https://en.wikipedia.org/wiki/Google%2B) was a
reference to Google's social network which was [shut down](https://blog.google/technology/safety-security/expediting-changes-google-plus/)
on April 2, 2019.)

Google Sign-In is based on OpenID Connect and OAuth 2.0, and implements a
variant of the implicit flow known as the [IDP-IFrame-based](https://lists.openid.net/pipermail/openid-specs-ab/2015-November/005865.html)
implicit flow.

Due to the fact that this library is deprecated, new applications should adopt
[Sign In with Google](../gsi/) if they rely on Google as their primary method of
authenticating users.  Existing applications are encouraged to [migrate](https://developers.google.com/identity/gsi/web/guides/migration).
Existing applications that have not yet migrated will continue to function until
Google Sign-In is [sunset](https://developers.google.com/identity/sign-in/web/deprecation-and-sunset),
the date for which is to be determined.

For those applications that continue to use this legacy library, Google Sign-In
can be used in combination with the [`passport-google-id-token`](https://www.npmjs.com/package/passport-google-id-token)
strategy to [add authentication to the application's backend](https://developers.google.com/identity/sign-in/web/backend-auth).

Just as with Sign In with Google, we recommend using [OpenID Connect](../openid-connect/)
for applications that offer Google alongside other social login options.  This
eliminates the need to add a client-side JavaScript dependency, and instead
operates on the server-side where the resulting tokens can receive the strongest
security protections.
