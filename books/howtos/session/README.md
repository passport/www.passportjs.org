This guide describes the steps needed to add session-based authentication to a
[Node.js](https://nodejs.org/) app using the [Express](https://expressjs.com/)
web framework.

# Middleware

Add session support by installing [`express-session`](https://github.com/expressjs/session):

```sh
$ npm install express-session
```

Use it as application-level middleware.

```js
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
```

# Configure

Register functions that serialize and deserialize user information to and from
the session.

```js
var passport = require('passport');

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

# Routes

Authenticate _all_ routes by using `passport.authenticate()` as
application-level middleware.

```js
app.use(passport.authenticate('session'));
```

Note that this middleware must be `use()`'d _after_ `session()` middleware added
in the previous step.

Alternatively, authenticate specific routes by using `passport.authenticate()`
on routes mounted at a path.

```js
app.get('/pages',
  passport.authenticate('session'),
  function(req, res, next) {
    /* ... */
  });
```
