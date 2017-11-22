---
title: OAuth
---

# OAuth

[OAuth](http://oauth.net/) is a standard protocol that allows users to authorize
API access to web and desktop or mobile applications.  Once access has been
granted, the authorized application can utilize the API on behalf of the user.
OAuth has also emerged as a popular mechanism for [delegated authentication](http://hueniverse.com/2009/04/introducing-sign-in-with-twitter-oauth-style-connect/).

OAuth comes in two primary flavors, both of which are widely deployed.

The initial version of OAuth was developed as an open standard by a loosely
organized collective of web developers.  Their work resulted in [OAuth 1.0](http://oauth.net/core/1.0/),
which was superseded by [OAuth 1.0a](http://oauth.net/core/1.0a/).  This work
has now been standardized by the [IETF](http://www.ietf.org/) as [RFC 5849](http://tools.ietf.org/html/rfc5849).

Recent efforts undertaken by the [Web Authorization Protocol Working Group](http://tools.ietf.org/wg/oauth/)
have focused on defining [OAuth 2.0](http://tools.ietf.org/html/rfc6749).  Due
to the lengthy standardization effort, providers have proceeded to deploy
implementations conforming to various drafts, each with slightly different
semantics.

Thankfully, Passport shields an application from the complexities of dealing
with OAuth variants.  In many cases, a provider-specific strategy can be used
instead of the generic OAuth strategies described below.  This cuts down on the
necessary configuration, and accommodates any provider-specific quirks. See
[Facebook](/docs#facebook), [Twitter](/docs#twitter) or the list of
<a href="" data-search>providers</a> for preferred usage.

Support for OAuth is provided by the [passport-oauth](https://github.com/jaredhanson/passport-oauth)
module.

## Install

```bash
$ npm install passport-oauth
```

### OAuth 1.0

OAuth 1.0 is a delegated authentication strategy that involves multiple steps.
First, a request token must be obtained.  Next, the user is redirected to the
service provider to authorize access.  Finally, after authorization has been
granted, the user is redirected back to the application and the request token
can be exchanged for an access token.  The application requesting access, known
as a _consumer_, is identified by a consumer key and consumer secret.

## Configuration

When using the generic OAuth strategy, the key, secret, and endpoints are
specified as options.

```javascript
var passport = require('passport')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;

passport.use('provider', new OAuthStrategy({
    requestTokenURL: 'https://www.provider.com/oauth/request_token',
    accessTokenURL: 'https://www.provider.com/oauth/access_token',
    userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
    consumerKey: '123-456-789',
    consumerSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

The verify callback for OAuth-based strategies accepts `token`, `tokenSecret`,
and `profile` arguments.  `token` is the access token and `tokenSecret` is its
corresponding secret.  `profile` will contain user profile information provided
by the service provider; refer to [User Profile](/guide/profile/) for
additional information.

## Routes

Two routes are required for OAuth authentication.  The first route initiates an
OAuth transaction and redirects the user to the service provider.  The second
route is the URL to which the user will be redirected after authenticating with
the provider.

```javascript
// Redirect the user to the OAuth provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

## Link

A link or button can be placed on a web page, which will start the
authentication process when clicked.

```xml
<a href="/auth/provider">Log In with OAuth Provider</a>
```

### OAuth 2.0

OAuth 2.0 is the successor to OAuth 1.0, and is designed to overcome perceived
shortcomings in the earlier version.  The authentication flow is essentially the
same.  The user is first redirected to the service provider to authorize access.
After authorization has been granted, the user is redirected back to the
application with a code that can be exchanged for an access token.  The
application requesting access, known as a _client_, is identified by an ID and
secret.

## Configuration

When using the generic OAuth 2.0 strategy, the client ID, client secret, and
endpoints are specified as options.

```javascript
var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

The verify callback for OAuth 2.0-based strategies accepts `accessToken`,
`refreshToken`, and `profile` arguments.  `refreshToken` can be used to obtain
new access tokens, and may be `undefined` if the provider does not issue refresh
tokens.  `profile` will contain user profile information provided by the service
provider; refer to [User Profile](/guide/profile/) for additional information.

## Routes

Two routes are required for OAuth 2.0 authentication.  The first route redirects
the user to the service provider.  The second route is the URL to which the user
will be redirected after authenticating with the provider.

```javascript
// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

## Scope

When requesting access using OAuth 2.0, the scope of access is controlled by the
scope option.

```javascript
app.get('/auth/provider',
  passport.authenticate('provider', { scope: 'email' })
);
```

Multiple scopes can be specified as an array.

```javascript
app.get('/auth/provider',
  passport.authenticate('provider', { scope: ['email', 'sms'] })
);
```

Values for the `scope` option are provider-specific.  Consult the provider's
documentation for details regarding supported scopes.

## Link

A link or button can be placed on a web page, which will start the
authentication process when clicked.

```xml
<a href="/auth/provider">Log In with OAuth 2.0 Provider</a>
```
