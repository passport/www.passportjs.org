---
layout: 'guide'
title: 'Basic & Digest'
---

### Basic & Digest

Along with defining HTTP's authentication framework, [RFC 2617](http://tools.ietf.org/html/rfc2617)
also defined the Basic and Digest authentications schemes.  These two schemes
both use usernames and passwords as credentials to authenticate users, and are
often used to protect API endpoints.

It should be noted that relying on username and password creditials can have
adverse security impacts, especially in scenarios where there is not a high
degree of trust between the server and client.  In these situations, it is
recommended to use an authorization framework such as [OAuth 2.0](/guide/oauth2-api/).

Support for Basic and Digest schemes is provided by the [passport-http](https://github.com/jaredhanson/passport-http)
module.

#### Install

```bash
$ npm install passport-http
```

### Basic

The Basic scheme uses a username and password to authenticate a user.  These
credentials are transported in plain text, so it is advised to use HTTPS when
implementing this scheme.

#### Configuration

```javascript
passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

The verify callback for Basic authentication accepts `username` and `password`
arguments.

#### Protect Endpoints

```javascript
app.get('/api/me', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
```

Specify `passport.authenticate()` with the `basic` strategy to protect API
endpoints.  Sessions are not typically needed by APIs, so they can be disabled.

### Digest

The Digest scheme uses a username and password to authenticate a user.  Its
primary benefit over Basic is that it uses a challenge-response paradigm to
avoid sending the password in the clear.

#### Configuration

```javascript
passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    });
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));
```

The Digest strategy utilizes two callbacks, the second of which is optional.

The first callback, known as the "secret callback" accepts the username and
calls `done` supplying a user and the corresponding secret password.  The
password is used to compute a hash, and authentication fails if it does not
match that contained in the request.

The second "validate callback" accepts nonce related params, which can be
checked to avoid replay attacks.

#### Protect Endpoints

```javascript
app.get('/api/me', 
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
```

Specify `passport.authenticate()` with the `digest` strategy to protect API
endpoints.  Sessions are not typically needed by APIs, so they can be disabled.
