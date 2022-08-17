# Log Out

In the [previous section](../session/), you established a login session after
authenticating a username and password.  In this section, you'll add sign out
which will terminate the session.

Open `routes/auth.js` and add the following route at line 45, below the
`/login/password` route.

```js
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
```

Return to the app, where you should already be signed in, and click "Sign out."

You have built an app that allows users to sign in and sign out!  Next, you will
[add a signup page](../signup/) to the app.
