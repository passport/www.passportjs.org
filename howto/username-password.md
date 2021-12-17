# Authenticate a username and password

This document describes how to authenticate a user using a username and
password.

A working example application using the techniques described here can be found
at [express-4.x-local-example](https://github.com/passport/express-4.x-local-example).

### Prerequisites

* You have an [Express](https://expressjs.com)-based web application.
* You have a database containing user account records and passwords hashed with [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2).

## Install

Install [`passport-local`](https://github.com/jaredhanson/passport-local) using
`npm`:

```
$ npm install passport-local
```

## Use strategy

Create a new instance of the `passport-local` strategy, supplying a `verify`
callback.  The `verify` callback accepts the `username` and `password` as
arguments, along with a `done` function.  `done` is an error-first callback
which should be called with a user, or `false` if authentication failed.

```
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('./db');

passport.use(new LocalStrategy(function(username, password, done) {
  db.users.findByUsername(username, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
  
    crypto.pbkdf2(password, Buffer.from(user.salt, 'base64'), 10000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return done(err); }
      if (!crypto.timingSafeEqual(Buffer.from(user.hashedPassword, 'base64'), hashedPassword)) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));
```

## Add sign in template

Add a new template file in your `views` directory named `login.ejs`:

```
<h1>Sign in</h1>
<form action="/login/password" method="post">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Sign in</button>
</form>
```

## Add sign in route

Add a new route to your application at the path `/login`:

```
app.get('/login',
  function(req, res) {
    res.render('login');
  });
```

## Add password authentication route

```
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```
