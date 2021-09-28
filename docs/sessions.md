---
title: Sessions
---

# Sessions

After a user has authenticated, the web application needs the ability to
identify that user as they browse from page to page.  This subsequent series of
requests and responses, each associated with the same user, is known as a
session.

HTTP is a stateless protocol, so [cookies](https://datatracker.ietf.org/doc/html/rfc6265)
are used to maintain a session.  The application sets a session ID cookie and
associates that ID with information about the user, typically storing the
information in a server-side data store such as [Redis](https://redis.io).  The
user's web browser includes the session ID cookie in subsequent requests,
allowing the application to look up the associated user information and
authenticate the session.

In order to maintain a session, Passport relies on capabilities of the web
framework used by the application.  For [Express](https://expressjs.com/)-based
applications, session support is provided by [`express-session`](https://github.com/expressjs/session)
middleware, which must be initialized prior to `passport.authenticate()`
middleware:

```javascript
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
```

## User Information

Once a user has authenticated, Passport will establish a login session.  During
session establishment, information about the user will be stored.  The
information that is stored is determined by the application, by supplying a
`serializeUser` function:

```javascript
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, picture: user.picture });
  });
});
```

In this particular example, the `serializeUser` function is storing the user's
ID, username, and picture.  Any other data, such as an address or birthday,
is not stored.

As the user navigates from page to page, the session itself can be authenticated
using the built-in `'session'` strategy.  Because an authenticated session is
typically needed for the majority of routes in an application, it is common to
bind this as [application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application):

```javascript
app.use(passport.authenticate('session'));
```

This can also be accomplished, more succinctly, using the `passport.session()`
alias:

```javascript
app.use(passport.session());
```

When the session is authenticated, Passport restores the information about the
user to the `req.user` property.  The information that is restored is determined
by the application-supplied `deserializeUser` function:

```javascript
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

This particular example is typical of most applications, in that it simply
restores the information that was originally serialized.  The information that
is most commonly needed (for example, to render a user element in the top-right
corner on a page) is cached in the session, thus reducing load placed on a
database when subsequently authenticating the session.

This tradeoff between amount of data stored in a session and database load when
authenticating a session is controlled by the application-supplied
`serializeUser` and `deserializeUser` functions.

The following example minimizes the data stored in the session to just a user
ID, at the expense of querying the database for any request in which the session
is authenticated.

```
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user.id);
  });
});

passport.deserializeUser(function(id, cb) {
  db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
    if (err) { return cb(err); }
    return cb(null, user);
  });
});
```
