---
title: Username & Password
---

# Username & Password

A username and password is the traditional, and still most widely used, way for
users to authenticate to a website.  Support for this mechanism is provided by
the [`passport-local`](https://www.passportjs.org/packages/passport-local/)
package.

## Install

To install `passport-local`, execute the following command:

```bash
$ npm install passport-local
```

## Configure

The following code is an example that configures and registers the
`LocalStrategy`:

```javascript
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

passport.use(new LocalStrategy(function verify(username, password, cb) {
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

The `LocalStrategy` constructor takes a `verify` function as an argument, which
accepts `username` and `password` as arguments.  When authenticating a request,
the strategy parses a username and password, which are submitted via an HTML
form to the web application.  The strategy then calls the `verify` function with
those credentials.

The `verify` function is responsible for determining the user to which the
username belongs, as well as verifying the password.  Because the `verify`
function is supplied by the application, the application is free to use a
database and schema of its choosing.  The example above illustrates usage of a
SQL database.

Similarly, the application is free to determine its password storage format.
The example above illustrates usage of [PBKDF2](https://datatracker.ietf.org/doc/html/rfc2898)
when comparing the user-supplied password with the hashed password stored in the
database.

In case of authentication failure, the `verify` callback supplies a message, via
the `message` option, describing why authentication failed.  This will be
displayed to the user when they are re-prompted to sign in, informing them of
what went wrong.

## HTML Form

As a [form-based authentication](/docs/form-based-authentication/) strategy, the
application is responsible for prompting the user for their username and
password.

The following form is an example which uses [best practices](https://web.dev/sign-in-form-best-practices/):

```html
<form action="/login/password" method="post">
    <div>
        <label for="username">Username</label>
        <input id="username" name="username" type="text" autocomplete="username" required />
    </div>
    <div>
        <label for="current-password">Password</label>
        <input id="current-password" name="password" type="password" autocomplete="current-password" required />
    </div>
    <div>
        <button type="submit">Sign in</button>
    </div>
</form>
```

## Routes

Two routes are needed in order to allow users to sign in with a username and
password.  The first route renders the form, prompting the user for their
username and password:

```javascript
app.get('/login',
  function(req, res, next) {
    res.render('login');
  });
```

The second route processes the form submission, authenticating the user with the
username and password they entered.

```javascript
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

If authentication succeeds, `passport.authenticate()` middleware calls the next
function in the stack.  In this example, the function is redirecting the
authenticated user to their profile page.

When authentication fails, the user is re-prompted to sign in and informed that
their initial attempt was not successful.  This is accomplished by using the
`failureRedirect` option, which will redirect the user to the login page, along
with the `failureMessage` option which will add the message to
`req.session.messages`.
