# Strategies

Strategies are responsible for authenticating requests, which they accomplish by
implementing an authentication mechanism.  Authentication mechanisms define how
to encode a credential, such as a password or an assertion from an identity
provider (IdP), in a request.  They also specify the procedure necessary to
verify that credential.  If the credential is successfully verified, the request
is authenticated.

There are a wide variety of authentication mechanisms, and a corresponding
variety of strategies.  Strategies are distributed in separate packages which
must be installed, configured, and registered.

## Install

Strategies are published to the [npm](https://www.npmjs.com/) registry, and
installed using a package manager.

For example, the following command will install [`passport-local`](https://www.passportjs.org/packages/passport-local/),
a package which provides a strategy for authenticating with a username and
password:

```bash
$ npm install passport-local
```

And the following command will install [`passport-openidconnect`](https://www.passportjs.org/packages/passport-openidconnect/),
a package which implements support for [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html):

```bash
$ npm install passport-openidconnect
```

Developers only need to install the packages which provide authentication
mechanisms required by the application.  These packages are then plugged into
Passport.  This reduces overall application size by avoiding unnecessary
dependencies.

## Configure

Once a package has been installed, the strategy needs to be configured.  The
configuration varies with each authentication mechanism, so strategy-specific
documentation should be consulted.  That being said, there are common patterns
that are encountered across many strategies.

The following code is an example that configures the `LocalStrategy`:


```javascript
var LocalStrategy = require('passport-local');

var strategy = new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
});
```

#### Verify Function

The `LocalStrategy` constructor takes a function as an argument.  This function
is known as a `verify` function, and is a common pattern in many strategies.
When authenticating a request, a strategy parses the credential contained in the
request.  A `verify` function is then called, which is responsible for
determining the user to which that credential belongs.  This allows data access
to be delegated to the application.

In this particular example, the `verify` function is executing a SQL query to
obtain a user record from the database and, after verifying the password,
yielding the record back to the strategy, thus authenticating the user and
establishing a login session.

Because a `verify` function is supplied by the application itself, access to
persistent storage is not constrained in any way.  The application is free to
use any data storage system, including relational databases, graph databases,
or document stores, and structure data within that database according to any
schema.

A `verify` function is strategy-specific, and the exact arguments it receives
and parameters it yields will depend on the underlying authentication mechanism.
For authentication mechanisms involving shared secrets, such as a password, a
`verify` function is responsible for verifying the credential and yielding a
user.  For mechanisms that provide cryptographic authentication, a `verify`
function will typically yield a user and a key, the later of which the strategy
will use to cryptographically verify the credential.

A `verify` function yields under one of three conditions: success, failure, or
an error.

If the `verify` function finds a user to which the credential belongs, and that
credential is valid, it calls the callback with the authenticating user:

```javascript
return cb(null, user);
```

If the credential does not belong to a known user, or is not valid, the `verify`
function calls the callback with `false` to indicate an authentication failure:

```javascript
return cb(null, false);
```

If an error occurs, such as the database not being available, the callback is
called with an error, in idiomatic Node.js style:

```javascript
return cb(err);
```

It is important to distinguish between the two failure cases that can occur.
Authentication failures are expected conditions, in which the server is
operating normally, even though invalid credentials are being received from the
user (or a malicious adversary attempting to authenticate as the user).  Only
when the server is operating abnormally should `err` be set, to indicate an
internal error.

## Register

With the strategy configured, it is then registered by calling `.use()`:

```javascript
var passport = require('passport');

passport.use(strategy);
```

All strategies have a name which, by convention, corresponds to the package
name according to the pattern `passport-{name}`.  For instance, the
`LocalStrategy` configured above is named `local` as it is distributed in the
`passport-local` package.

Once registered, the strategy can be employed to authenticate a request by
passing the name of the strategy as the first argument to `passport.authenticate()`
middleware:

```javascript
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

In cases where there is a naming conflict, or the default name is not
sufficiently descriptive, the name can be overridden when registering the
strategy by passing a name as the first argument to `.use()`:

```javascript
var passport = require('passport');

passport.use('password', strategy);
```

That name is then specified to `passport.authenticate()` middleware:

```javascript
app.post('/login/password',
  passport.authenticate('password', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

For brevity, strategies are often configured and registered in a single
statement:

```javascript
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  // ...
});
```
