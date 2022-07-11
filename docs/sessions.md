# Sessions

A web application needs the ability to identify users as they browse from page
to page.  This series of requests and responses, each associated with the same
user, is known as a session.

HTTP is a stateless protocol, meaning that each request to an application can be
understood in isolation - without any context from previous requests.  This
poses a challenge for web applications with logged in users, as the
authenticated user needs to be remembered across subsequent requests as they
navigate the application.

To solve this challenge, web applications make use of sessions, which allow
state to be maintained between the application server and the user's browser.  A
session is established by setting an [HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
in the browser, which the browser then transmits to the server on every request.
The server uses the value of the cookie to retrieve information it needs across
multiple requests.  In effect, this creates a stateful protocol on top of HTTP.

While sessions are used to maintain authentication state, they can also be used
by applications to maintain other state unrelated to authentication.  Passport
is carefully designed to isolate authentication state, referred to as a login
session, from other state.

Applications must initialize session support in order to make use of login
sessions.  In an [Express](https://expressjs.com/) app, session support is added
by using  [`express-session`](https://github.com/expressjs/session) middleware.

```javascript
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
```

To maintain a login session, Passport serializes and deserializes user
information to and from the session.  The information that is stored is
determined by the application, which supplies a `serializeUser` and a
`deserializeUser` function.

```javascript
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

A login session is established upon a user successfully authenticating using a
credential.  The following route will authenticate a user using a username and
password.  If successfully verified, Passport will call the `serializeUser`
function, which in the above example is storing the user's ID, username, and
picture.  Any other properties of the user, such as an address or birthday, are
not stored.

```javascript
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

As the user navigates from page to page, the session itself can be authenticated
using the built-in `session` strategy.  Because an authenticated session is
typically needed for the majority of routes in an application, it is common to
use this as [application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application),
after `session` middleware.

```javascript
app.use(session(/* ... */);
app.use(passport.authenticate('session'));
```

This can also be accomplished, more succinctly, using the `passport.session()`
alias.

```javascript
app.use(session(/* ... */);
app.use(passport.session());
```

When the session is authenticated, Passport will call the `deserializeUser`
function, which in the above example is yielding the previously stored user ID,
username, and picture.  The `req.user` property is then set to the yielded
information.

There is an inherent tradeoff between the amount of data stored in a session and
database load incurred when authenticating a session.  This tradeoff is
particularly pertinent when session data is stored on the client, rather than
the server, using a package such as [`cookie-session`](https://github.com/expressjs/cookie-session).
Storing less data in the session will require heavier queries to a database to
obtain that information.  Conversely, storing more data in the session reduces
database queries while potentially exceeding the maximum amount of data that can
be stored in a cookie.

This tradeoff is controlled by the application and the `serializeUser` and
`deserializeUser` functions it supplies.  In contrast to the above example, the
following example minimizes the data stored in the session at the expense of
querying the database for every request in which the session is authenticated.

```javascript
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user.id);
  });
});

passport.deserializeUser(function(id, cb) {
  db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
    if (err) { return cb(err); }
    return cb(null, user);
  });
});
```

To balance this tradeoff, it is recommended that any user information needed on
_every_ request to the application be stored in the session.  For example, if
the application displays a user element containing the user's name, email
address, and photo on every page, that information should be stored in the
session to eliminate what would otherwise be frequent database queries.
Specific routes, such as a checkout page, that need additional information such
as a shipping address, can query the database for that data.
