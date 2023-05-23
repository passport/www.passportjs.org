# Redirect Back to App

In the [previous section](../state/), you added session support to the app in
order to maintain state when redirecting to Twitter.  In this section, you'll
add a route that authenticates the user when Twitter redirects them back to the
app.

Open `routes/auth.js` and add the following code at line 55, below the
`/login/federated/twitter` route.

```js
router.get('/oauth2/redirect/twitter', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
```

The app now has routes that handle the complete cycle of redirecting to Twitter
and from Twitter back to the app, with state maintained in between.  Try signing
in by starting the server.

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in" and then
click "Sign in with Twitter."

Uh oh... the app fails with an error related to sessions.  Next, you will fix
that error by configuring Passport to [establish a session](../session/).
