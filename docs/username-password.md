---
title: Username & Password
---

# Username & Password

The most widely used way for websites to authenticate users is via a username
and password.  Support for this mechanism is provided by the [passport-local](https://github.com/jaredhanson/passport-local)
module.

## Install

```bash
$ npm install passport-local
```

## Configuration

```javascript
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
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

The verify callback for local authentication accepts `username` and `password`
arguments, which are submitted to the application via a login form.

## Form

A form is placed on a web page, allowing the user to enter their credentials and
log in.

```xml
<form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
```

## Route

The login form is submitted to the server via the `POST` method.  Using
`authenticate()` with the `local` strategy will handle the login request.

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
```

Setting the `failureFlash` option to `true` instructs Passport to flash an
`error` message using the `message` option set by the verify callback above.
This is helpful when prompting the user to try again.

## Parameters

By default, `LocalStrategy` expects to find credentials in parameters named
`username` and `password`.  If your site prefers to name these fields
differently, options are available to change the defaults.

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
      },
      function(username, password, done) {
        // ...
      }
    ));
