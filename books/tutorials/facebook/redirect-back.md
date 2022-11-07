# Redirect Back to App

In the [previous section](../state/), you added session support to the app in
order to maintain state when redirecting to Facebook.  In this section, you'll
add a route that authenticates the user when Facebook redirects them back to the
app.

Open `routes/auth.js` and add the following code at line 55, below the
`/login/federated/facebook` route.

```js
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
```

The app now has routes that handle the complete cycle of redirecting to Facebook
and from Facebook back to the app, with state maintained in between.  Try
signing in by starting the server.

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in" and then
click "Sign in with Facebook."

Uh oh... the app fails with an error related to sessions.  Next, you will fix
that error by configuring Passport to [establish a session](../session/).
