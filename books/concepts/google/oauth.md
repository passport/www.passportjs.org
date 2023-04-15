# OAuth 1.0

The Google Identity Platform previously supported [OAuth 1.0](https://web.archive.org/web/20150317172055/https://developers.google.com/accounts/docs/OAuth).
OAuth 1.0 was [deprecated](https://developers.googleblog.com/2012/04/changes-to-deprecation-policies-and-api.html)
on April 20, 2012 and shut down on April 20, 2015.

Support for using OAuth 1.0 within Passport was provided by
[passport-google-oauth1](https://www.passportjs.org/packages/passport-google-oauth1/).
Due to the fact that Google no longer supports OAuth 1.0, this strategy is no
longer functional.

Any existing applications using OAuth 1.0 should migrate to [OAuth 2.0](../oauth2/).
