# OAuth 2.0

Twitter's support for [OAuth 2.0](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
reached [general availability](https://twittercommunity.com/t/announcing-oauth-2-0-general-availability/163555)
in December 2021 (after a [public beta](https://twittercommunity.com/t/announcing-oauth-2-0-beta/159189)
period starting in September 2021).  Compared to OAuth 1.0, OAuth 2.0 offers
applications finer-grained control over the scope of access being requested from
the user.

Support for integrating with Twitter using OAuth 2.0 and Passport is provided by
the [`@superfaceai/passport-twitter-oauth2`](https://www.npmjs.com/package/@superfaceai/passport-twitter-oauth2)
strategy.  This strategy inherits from [`passport-oauth2`](https://www.passportjs.org/packages/passport-oauth2/)
and configures it to work out-of-the-box with Twitter's OAuth 2.0 endpoints.

OAuth 2.0 is a supported authentication method for the [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api),
which is an ongoing effort to build the next generation of the Twitter API.  The
Twitter API v2 is now the primary Twitter API, while the legacy [v1.1](https://developer.twitter.com/en/docs/twitter-api/v1)
continues to be supported along with OAuth 1.0.

Twitter recommends that new applications be implemented using v2 and OAuth 2.0
and that existing applications [migrate](https://developer.twitter.com/en/docs/twitter-api/migrate/overview).
Some APIs within Twitter's platform, such as the [Twitter Ads API](https://developer.twitter.com/en/docs/twitter-ads-api),
do not yet support OAuth 2.0.  Applications that depend on such APIs can
continue to use [OAuth 1.0](../oauth/).
