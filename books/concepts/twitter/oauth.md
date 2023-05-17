# OAuth 1.0

Twitter supports [OAuth 1.0a](https://developer.twitter.com/en/docs/authentication/oauth-1-0a),
which has been an integral part of Twitter's [developer platform](https://developer.twitter.com/en)
since its inception.

[Launched](https://blog.twitter.com/official/en_us/a/2006/introducing-the-twitter-api.html)
in September 2006, the Twitter API originally used basic username and password
authentication.  In early 2009, Twitter began supporting OAuth, which allowed
users to grant applications access without divulging their passwords.  To
protect both users and the platform, in August 2010 support for password-based
authentication was phased out and OAuth became mandatory in what was known as
the [OAuthpocalypse](https://techcrunch.com/2010/08/13/oauthpocalypse/).

Support for integrating with Twitter using OAuth 1.0 and Passport is provided by
the [`passport-twitter`](https://www.passportjs.org/packages/passport-twitter/)
strategy.  This strategy inherits from [`passport-oauth1`](https://www.passportjs.org/packages/passport-oauth1/)
and configures it to work out-of-the-box with Twitter's OAuth 1.0 endpoints.

OAuth 1.0 is a supported authentication method across most of the APIs within
Twitter's platform, including the Twitter API [v1.1](https://developer.twitter.com/en/docs/twitter-api/v1)
and [v2](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api)
as well as the [Twitter Ads API](https://developer.twitter.com/en/docs/twitter-ads-api).

While OAuth 1.0 is supported, Twitter also supports [OAuth 2.0](../oauth2/).  It
is recommended that new applications adopt OAuth 2.0 and existing applications
plan to [migrate](https://developer.twitter.com/en/docs/twitter-api/migrate/overview).
