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
the [`passport-twitter`](http://www.passportjs.org/packages/passport-twitter/)
strategy.  This strategy inherits from [`passport-oauth1`](http://www.passportjs.org/packages/passport-oauth1/)
and configures it to work out-of-the-box with Twitter's OAuth 1.0 endpoints.
