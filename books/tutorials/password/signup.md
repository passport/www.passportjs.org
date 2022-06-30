# Sign Up

In the [previous section](../logout/), you added sign out and now have an app
that allows users to both sign in and sign out.  Only one feature remains.  In
this section, you'll add a signup page that allows users to create an account.

Open `'routes/auth.js'` and add the following route at line 52, below the
`'/logout'` route.

```js
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
```

This route will render the signup page.  Add an HTML form to that page which
will prompt the user to create a new account with their preferred username and
password.

Open `'views/signup.ejs'` and add the form at line 15, below the "Sign up"
heading.

```html
<h1>Sign up</h1>
<form action="/signup" method="post">
	<section>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" autocomplete="username" required>
	</section>
	<section>
		<label for="new-password">Password</label>
		<input id="new-password" name="password" type="password" autocomplete="new-password" required>
	</section>
	<button type="submit">Sign up</button>
</form>
```

Finally, add a route that will handle the form submission when the user clicks
"Sign up."  Back within `'routes/auth.js'`, add the following route at line 56,
below the `'/signup'` route.

```js
router.post('/signup', function(req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt
    ], function(err) {
      if (err) { return next(err); }
      var user = {
        id: this.lastID,
        username: req.body.username
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
});
```

This route creates a new user record in the app's database, storing the username
and hashed password.  Once the record is created, the user is logged in.

Return to the app and create a new account.

You have built an app that allows users to sign up, sign in, and sign out!
