# Send Email

Now that we are prompting the user for their email address, and have the
strategy configured, the next step is to send the user an email when they click
"Sign in with Email."

Open `'routes/auth.js'`, add this route at line 56, below the `'/login'` route:

```js
router.post('/login/email', passport.authenticate('magiclink', {
  action: 'requestToken',
  failureRedirect: '/login'
}), function(req, res, next) {
  res.redirect('/login/email/check');
});
```

This route will process the form on the login page and send an email to the
user.

Continuing within `'routes/auth.js'`, add this route at line 63, below the newly
added `'/login/email'` route:

```js
router.get('/login/email/check', function(req, res, next) {
  res.render('login/email/check');
});
```

This route will render a page instructing the user to check their email and
click the link.

Next, we will [verify the email](../verify/) when the user clicks that link.
