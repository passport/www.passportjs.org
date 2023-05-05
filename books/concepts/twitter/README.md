# Twitter

Twitter was one of the pioneering social networks to allow people to "connect"
their accounts to other websites.  On April 15, 2009, [Sign in with Twitter](https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter)
was introduced.  This allowed Twitter to be used for [social login](https://en.wikipedia.org/wiki/Social_login),
and was built on OAuth 1.0, which was already being used to authorize access to
the Twitter API.

While Twitter pioneered use of OAuth 1.0, support for OAuth 2.0 was made
[generally available](https://twittercommunity.com/t/announcing-oauth-2-0-general-availability/163555)
in December 2021 (after a [public beta](https://twittercommunity.com/t/announcing-oauth-2-0-beta/159189)
period starting in September 2021), almost a decade after OAuth 2.0 was
approved by the [IETF](https://www.ietf.org/).

Today, use of Twitter for signing in trails substantially behind larger
platforms such as Google, Facebook, and Apple.  That being said, Twitter remains
a widely used option on many websites.  Other websites integrate with the
Twitter API, and need users to authorize access, even if they sign in with
another authentication method.

Passport supports both OAuth 1.0 and OAuth 2.0, and can be used to let people
sign in with Twitter or get authorized access to the Twitter API on behalf of
users.
