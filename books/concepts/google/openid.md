# OpenID

Google previously supported [OpenID 2.0](https://web.archive.org/web/20150317150909/https://developers.google.com/accounts/docs/OpenID2).
OpenID 2.0 was [deprecated](https://web.archive.org/web/20150317085555/https://developers.google.com/accounts/docs/OpenID) and shut down on April 20, 2015.

Support for using OpenID 2.0 within Passport was provided by [`passport-google`](https://www.passportjs.org/packages/passport-google/).
Due to the fact that Google no longer supports OpenID 2.0, this strategy is no
longer functional.

Any existing applications using OpenID 2.0 should migrate to [OpenID Connect](../openid-connect/).
