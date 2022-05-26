# Log Out

Now that users can sign in and sign up, they'll need a way to sign out.

Open `'routes/auth.js'` and add this route at line 40, below the
`'/oauth2/redirect'` route:

```js
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    var params = {
      client_id: process.env['AUTH0_CLIENT_ID'],
      returnTo: 'http://localhost:3000/'
    };
    res.redirect('https://' + process.env['AUTH0_DOMAIN'] + '/v2/logout?' + qs.stringify(params));
  });
});
```

Return to the app, where you should already be signed in, and click "Sign out."

We've now got a working app where users can sign in, sign up, and sign out!
