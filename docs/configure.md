---
title: Configure
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
