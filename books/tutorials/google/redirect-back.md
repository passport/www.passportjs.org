# Redirect Back to App

When a user signs in to our app with Google, they are redirected to Google.
Google takes care of authenticating the user and then redirects them back to our
app.

Let's close the loop by adding a route that will handle this redirect.

Open `'routes/auth.js'` and add this route at line 56, below the
`'/login/federated/accounts.google.com'` route:

```
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
```

We've now got routes that will redirect the user to Google and handle the
redirect back to our app!  Let's test it out to see what happens.

Start the server:

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in" and then
click "Sign in with Google".

Uh oh... we are informed that there's an error related to sessions.  Next, we
will fix that by [establishing a login session](../session/).
