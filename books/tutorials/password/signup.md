# Sign Up

Users can now sign in and sign out.  The only thing that's missing is to let new
users sign up.

Open `'routes/auth.js'` and add the following route at line 50, below the
`'/logout'` route:

```js
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
```

This route will render the signup page.  Let's add an HTML form to that page.

Open `'views/signup.ejs'` and add the form at line 15, below the "Sign up"
heading:

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

Finally, we need to add a route that will process the form submission when the
user clicks "Sign up."  Add this route at line 54, below the `'/signup'` route:

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

That's it!  Users can now sign in, sign out, and sign up!
