# Send Web3 Email

Now that we are prompting the user for their Mailchain address, and have the
strategy configured, the next step is to send the user a Mailchain message when
they click "Sign in with Mailchain."

Open `'routes/auth.js'`, add this route at line 57, below the `'/login'` route:

```js
router.post('/login/mailchain', passport.authenticate('magiclink', {
  action: 'requestToken',
  failureRedirect: '/login'
}), function(req, res, next) {
  res.redirect('/login/mailchain/check');
});
```

This route will process the form on the login page and send a Mailchain message to
the user.

Continuing within `'routes/auth.js'`, add this route at line 63, below the newly
added `'/login/mailchain'` route:

```js
router.get('/login/mailchain/check', function(req, res, next) {
  res.render('login/mailchain/check');
});
```

This route will render a page instructing the user to check their Mailchain account
and click the link.

Next, we will [verify the Mailchain address](../verify/) when the user clicks that link.
