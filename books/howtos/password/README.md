This guide describes the steps needed to add username and password
authentication to a [Node.js](https://nodejs.org/) app using the [Express](https://expressjs.com/)
web framework.

<div class="alert alert-info">
This guide assumes familiarity with Passport.  If you are learning, the
<a href="/tutorials/password/">username and password tutorial</a> is a better starting point.
</div>

# Install

Install [`passport-local`](https://www.passportjs.org/packages/passport-local/)
using [npm](https://www.npmjs.com/).

```sh
$ npm install passport-local
```

# Configure

Create a new instance of `LocalStrategy` and pass a `verify` function as the
first argument.  For example:

```js
var passport = require('passport');
var LocalStrategy = require('passport-local');

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
}));
```

The `verify` function must verify the user's password.  In the example shown,
the `verify` function is executing a [SQLite](https://github.com/TryGhost/node-sqlite3)
query to fetch a user record from the database.  It then compares the hashed
password with the password submitted by the user.

Modify the `verify` function in the example according your application's
database, schema, and password-hashing function.

The `verify` function must yield back to the strategy by calling the callback
with a user object if the password is correct:

```js
return cb(null, user);
```

It must yield back with `false` if the password is incorrect:

```js
return cb(null, false);
```

And it must yield back with an error if an exception occurred:

```js
return cb(err);
```

# Routes

Add a route that will prompt the user to sign in with a username and password by
rendering a login view:

```js
app.get('/login', function(req, res, next) {
  res.render('login');
});
```

Add an HTML form to the `login` view:

```html
<h1>Sign in</h1>
<form action="/login/password" method="post">
	<section>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" autocomplete="username" required autofocus>
	</section>
	<section>
		<label for="current-password">Password</label>
		<input id="current-password" name="password" type="password" autocomplete="current-password" required>
	</section>
	<button type="submit">Sign in</button>
</form>
```

Add a route that will authenticate the username and password when the user
submits the form:

```js
app.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
```

<div class="alert alert-warning">
A session will be established after authentication.  When using this strategy,
ensure that you have <a href="/howtos/session/">added support for sessions</a>.
</div>
