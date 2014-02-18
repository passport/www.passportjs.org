---
layout: 'guide'
title: 'OAuth 2.0 APIs'
---

### OAuth 2.0

OAuth 2.0 (formally specified by [RFC 6749](http://tools.ietf.org/html/rfc6749))
provides an authorization framework which allows users to authorize access to
third-party applications.  When authorized, the application is issued a token to
use as an authentication credential.  This has two primary security benefits:

  1. The application does not need to store the user's username and password.
  2. The token can have a restricted scope (for example: read-only access).

These benefits are particularly important for ensuring the security of web
applications, making OAuth 2.0 the predominant standard for API authentication.

When using OAuth 2.0 to protect API endpoints, there are three distinct steps
that must be performed:

  1. The application requests permission from the user for access to protected
     resources.
  2. A token is issued to the application, if permission is granted by the user.
  3. The application authenticates using the token to access protected
     resources.
     
#### Issuing Tokens

[OAuth2orize](https://github.com/jaredhanson/oauth2orize), a sibling project to
Passport, provides a toolkit for implementing OAuth 2.0 authorization servers.

The authorization process is a complex sequence that involves authenticating
both the requesting application and the user, as well as prompting the user for
permission, ensuring that enough detail is provided for the user to make an
informed decision.

Additionally, it is up to the implementor to determine what limits can be placed
on the application regarding scope of access, as well as subsequently enforcing
those limits.

As a toolkit, OAuth2orize does not attempt to make implementation decisions.
This guide does not cover these issues, but does highly recommend that
services deploying OAuth 2.0 have a complete understanding of the security
considerations involved.

#### Authenticating Tokens

OAuth 2.0 provides a framework, in which an arbitrarily extensible set of token
types can be issued.  In practice, only specific token types have gained
widespread use.

#### Bearer Tokens

Bearer tokens are the most widely issued type of token in OAuth 2.0.  So much
so, in fact, that many implementations assume that bearer tokens are the only
type of token issued.

Bearer tokens can be authenticated using the [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer)
module.

##### Install

```bash
$ npm install passport-http-bearer
```

##### Configuration

```javascript
passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));
```

The verify callback for bearer tokens accepts the `token` as an argument.
When invoking `done`, optional `info` can be passed, which will be set by
Passport at `req.authInfo`.  This is typically used to convey the scope of the
token, and can be used when making access control checks.

##### Protect Endpoints

```javascript
app.get('/api/me', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
```

Specify `passport.authenticate()` with the `bearer` strategy to protect API
endpoints.  Sessions are not typically needed by APIs, so they can be disabled.
