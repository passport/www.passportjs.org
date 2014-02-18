---
layout: 'guide'
title: 'OAuth APIs'
---

### OAuth

[OAuth](http://oauth.net/) (formally specified by [RFC 5849](http://tools.ietf.org/html/rfc5849))
provides a means for users to grant third-party applications access to their
data without exposing their password to those applications.

The protocol greatly improves the security of web applications, in particular,
and OAuth has been important in bringing attention to the potential dangers of
exposing passwords to external services.

While OAuth 1.0 is still widely used, it has been superseded by [OAuth 2.0](/guide/oauth2-api/).
It is recommended to base new implementations on OAuth 2.0.

When using OAuth to protect API endpoints, there are three distinct steps that
that must be performed:

  1. The application requests permission from the user for access to protected
     resources.
  2. A token is issued to the application, if permission is granted by the user.
  3. The application authenticates using the token to access protected
     resources.

#### Issuing Tokens

[OAuthorize](https://github.com/jaredhanson/oauthorize), a sibling project to
Passport, provides a toolkit for implementing OAuth service providers.

The authorization process is a complex sequence that involves authenticating
both the requesting application and the user, as well as prompting the user for
permission, ensuring that enough detail is provided for the user to make an
informed decision.

Additionally, it is up to the implementor to determine what limits can be placed
on the application regarding scope of access, as well as subsequently enforcing
those limits.

As a toolkit, OAuthorize does not attempt to make implementation decisions.
This guide does not cover these issues, but does highly recommend that
services deploying OAuth have a complete understanding of the security
considerations involved.

#### Authenticating Tokens

Once issued, OAuth tokens can be authenticated using the [passport-http-oauth](https://github.com/jaredhanson/passport-http-oauth)
module.

##### Install

```bash
$ npm install passport-http-oauth
```

##### Configuration

```javascript
passport.use('token', new TokenStrategy(
  function(consumerKey, done) {
    Consumer.findOne({ key: consumerKey }, function (err, consumer) {
      if (err) { return done(err); }
      if (!consumer) { return done(null, false); }
      return done(null, consumer, consumer.secret);
    });
  },
  function(accessToken, done) {
    AccessToken.findOne({ token: accessToken }, function (err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false); }
      Users.findById(token.userId, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // fourth argument is optional info.  typically used to pass
        // details needed to authorize the request (ex: `scope`)
        return done(null, user, token.secret, { scope: token.scope });
      });
    });
  },
  function(timestamp, nonce, done) {
    // validate the timestamp and nonce as necessary
    done(null, true)
  }
));
```

In contrast to other strategies, there are two callbacks required by OAuth.  In
OAuth, both an identifier for the requesting application and the user-specific
token are encoded as credentials.

The first callback is known as the "consumer callback", and is used to find the
application making the request, including the secret assigned to it.  The second
callback is the "token callback", which is used to indentify the user as well as
the token's corresponding secret.  The secrets supplied by the consumer and
token callbacks are used to compute a signature, and authentication fails if it
does not match the request signature.

A final "validate callback" is optional, which can be used to prevent replay
attacks by checking the timestamp and nonce used in the request.

##### Protect Endpoints

```javascript
app.get('/api/me', 
  passport.authenticate('token', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
```

Specify `passport.authenticate()` with the `token` strategy to protect API
endpoints.  Sessions are not typically needed by APIs, so they can be disabled.
