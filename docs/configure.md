---
title: Strategies
---

# Strategies

Strategies are modules which implement authentication mechanisms.  Strategies
are distributed as independent packages which can be installed, configured, and
plugged into Passport.

Strategies for web-based authentication can be classified into three broad
categories:

1. **Browser-based**
  
  Browser-based authentication strategies work by prompting a user for
  credentials via a web browser.  The user's browser displays a form, into which
  the user enters their credentials.  The form is submitted to the server, which
  authenticates the user's credentials.
  
2. **Federated Identity**

  Federated identity strategies work by redirecting a user to an [identity
  provider](https://en.wikipedia.org/wiki/Identity_provider) (IdP), such as
  [Google](https://www.google.com/) or [Facebook](https://www.facebook.com/).
  The IdP authenticates the user and redirects them back to the web application
  with an assertion (also known as a token).  This assertion contains
  information about who authenticated and how they authenticated.
  

3. **API Authentication**

  API authentication strategies work by using the HTTP authentication framework
  to challenge a client for credentials.  The server then authenticates the
  credentials contained in the client's response.

Further details about these types of strategies will be provided later.  For
now, let's examine how to configure a basic username and password strategy and
utilize it within Passport.

```
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('./db');

passport.use(new LocalStrategy(function(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, user.salt, 10000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));
```

This configuration `require`s the `'passport-local'` package and creates a new
`LocalStrategy`.  The configured strategy is then utilized within Passport by
supplying it to `passport.use()`.

## Verify Function

The configuration of `LocalStrategy` introduces an important topic: the `verify`
function.  A `verify` function is a common pattern in many strategies, and is
what allows Passport to delegate data access to the application.  When Passport
authenticates a request, a strategy parses the credential contained in the
request.  A `verify` function is then called, which is responsible for
determining the user to which that credential belongs.

In this particular case, the `verify` function executes a [SQL](https://en.wikipedia.org/wiki/SQL)
query to obtain a user record from the database, verifies the password, and
yields the user record, if the password is valid.

A `verify` function is strategy-specific, and the exact arguments it receives
and parameters it yields will depend on the underlying authentication mechanism.
In the case of password-based authentication, the `verify` function, along with
yielding the user, is responsible for verifying the password.  This is necessary
as the hashing and storing of passwords is application-specific.

For mechanisms that provide cryptographic authentication, a `verify` function
will typically yield, along with the user, a shared secret or public key.  The
strategy will then perform the necessary cryptographic operations to
authenticate the request.

A `verify` function yields under one of three conditions: success, failure, or
an error.

If the `verify` function finds a user to which the credential belongs, and that
credential is valid, it calls the callback to inform Passport of the
authenticating user.

```javascript
return cb(null, user);
```

If the credential does not belong to a user, or is not valid, the `verify`
function calls the callback with `false` to indicate an authentication failure.

```javascript
return cb(null, false);
```

This can be accompanied by an optional message, which can be displayed to the
user to inform them of what went wrong.

```javascript
return cb(null, false, { message: 'Incorrect username or password.' });
```

If an error occurs, such as the database not being available, the callback is
called with the error, in conventional Node.js style.

```javascript
return cb(err);
```

It is important to distinguish between the two failure cases that can occur.
Authentication failures are expected conditions, in which the server is
operating normally, but invalid credentials are being received from the user
(or a malicious adversary attempting to authenticate as the user).  Only when
the server encounters an exception should `err` be set, to indicate an internal
error.

---



# Configure

Three pieces need to be configured to use Passport for authentication:

 1. Authentication strategies
 2. Application middleware
 3. Sessions (_optional_)

## Strategies

Passport uses what are termed _strategies_ to authenticate requests.  Strategies
range from verifying a username and password, delegated authentication using [OAuth](http://oauth.net/)
or federated authentication using [OpenID](http://openid.net/).

Before asking Passport to authenticate a request, the strategy (or strategies)
used by an application must be configured.

Strategies, and their configuration, are supplied via the `use()` function.  For
example, the following uses the `LocalStrategy` for username/password
authentication.

```javascript
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
```

## Verify Callback

This example introduces an important concept.  Strategies require what is known
as a _verify callback_.  The purpose of a verify callback is to find the user
that possesses a set of credentials.

When Passport authenticates a request, it parses the credentials contained in
the request.  It then invokes the verify callback with those credentials as
arguments, in this case `username` and `password`.  If the credentials are
valid, the verify callback invokes `done` to supply Passport with the user that
authenticated.

```javascript
return done(null, user);
```

If the credentials are not valid (for example, if the password is incorrect),
`done` should be invoked with `false` instead of a user to indicate an
authentication failure.

```javascript
return done(null, false);
```

An additional info message can be supplied to indicate the reason for the
failure.  This is useful for displaying a flash message prompting the user to
try again.

```javascript
return done(null, false, { message: 'Incorrect password.' });
```

Finally, if an exception occurred while verifying the credentials (for example,
if the database is not available), `done` should be invoked with an error, in
conventional Node style.

```javascript
return done(err);
```

Note that it is important to distinguish the two failure cases that can occur.
The latter is a server exception, in which `err` is set to a non-`null` value.
Authentication failures are natural conditions, in which the server is operating
normally.  Ensure that `err` remains `null`, and use the final argument to pass
additional details.

By delegating in this manner, the verify callback keeps Passport database
agnostic.  Applications are free to choose how user information is stored,
without any assumptions imposed by the authentication layer.

#### Middleware

In a [Connect](http://senchalabs.github.com/connect/) or
[Express](http://expressjs.com/)-based application, `passport.initialize()`
middleware is required to initialize Passport.  If your application uses
persistent login sessions, `passport.session()` middleware must also be used.

```javascript
app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
```

Note that enabling session support is entirely optional, though it is
recommended for most applications.  If enabled, be sure to use `session()`
*before*  `passport.session()` to ensure that the login session is restored in
the correct order.

In Express 4.x, the Connect middleware is no longer included in the Express
core, and the app.configure() method has been removed.  The same middleware
can be found in their npm module equivalents.

```javascript
var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
```

#### Sessions

In a typical web application, the credentials used to authenticate a user will
only be transmitted during the login request.  If authentication succeeds, a
session will be established and maintained via a cookie set in the user's
browser.

Each subsequent request will not contain credentials, but rather the unique
cookie that identifies the session.  In order to support login sessions,
Passport will serialize and deserialize `user` instances to and from the
session.

```javascript
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

In this example, only the user ID is serialized to the session, keeping the
amount of data stored within the session small.  When subsequent requests are
received, this ID is used to find the user, which will be restored to
`req.user`.

The serialization and deserialization logic is supplied by the application,
allowing the application to choose an appropriate database and/or object mapper,
without imposition by the authentication layer.
