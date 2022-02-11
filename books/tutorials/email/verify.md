# Verify Email

Now that we've sent the user an email with a magic link, the next step is to
verify the email address when they click the link.

Open `'routes/auth.js'`, add this route at line 67, below the `'/login/email/check'`
route:

```js
router.get('/login/email/verify', passport.authenticate('magiclink', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

This route will verify the email address when the link is clicked.

Let's test it out to see what happens.

Start the server:

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in", enter your
email address and click "Sign in with Email".

Now, check your email and click the link.

Uh oh... we are informed that there's an error related to sessions.  Next, we
will fix that by [establishing a session](../session/).
