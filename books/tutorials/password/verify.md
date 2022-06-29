# Verify Password

In the [previous section](../prompt/), you created a page which prompts the user
to enter their username and password.  In this section, you'll verify that the
password is correct.

Install `passport` and the `passport-local` strategy as dependencies.

```sh
$ npm install passport
$ npm install passport-local
```

Next, configure Passport.  Open `'routes/auth.js'` and `require()` the newly
installed packages at line 2, below where `express` is `require()`'d.

```js
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');
```

The built-in crypto module and the app's database are also `require()`'d.

Add the following code at line 7 to configure the `LocalStrategy`.

```js
passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));
```

This configures the `LocalStrategy` to fetch the user record from the app's
database and verify the hashed password against the password submitted by the
user.  If that succeeds, the password is valid and the user is authenticated.

Next, add a route that will authenticate the user when they submit the form by
clicking "Sign in."  Continuing within `'routes/auth.js'`, add the following
code at line 28, below the `'/login'` route.

```js
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
```

Try signing in by starting the server.

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000/), click "Sign in," and enter
the following credentials:

```
Username: alice
Password: letmein
```

Click "Sign in."

Uh oh... the app fails with an error related to sessions.  Next, you will fix
that error by configuring Passport to [establish a session](../session/).
