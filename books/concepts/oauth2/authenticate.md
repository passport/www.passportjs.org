# Authentication

Remember that OAuth 2.0 is an _authorization_ framework.  How does that relate
to _authentication_?  During the authorization process, Facebook authenticated
the user and obtained their consent to allow the application to access their
account (including name and email address).  Facebook then issued an access
token to the application reflecting that authorization.  When the access token
is used to access the `/me` API, information about the user who Facebook
authenticated is returned.

This is known as _delegated authentication_.  In effect, the application is not
actually authenticating the user - Facebook is.  The application delegated that
responsibility to Facebook.  The application is relying on Facebook to inform it
about the user that authenticated.  The end result is the same: the application
knows who has logged in.

The distinction between _authentication_ and _delegated authentication_ is worth
noting, however.  It introduces another entity in the process (Facebook, in this
case), which has implications.  The user's log in experience is improved, as
they no longer have to create an account or yet another password.  On the other
hand, privacy concerns arise when granting access to data.  Often times the
benefits outweigh the drawbacks, but each application will have different
tradeoffs.

Now that Passport knows who has authenticated, it calls the application's
`verify` function with the profile information as well as the tokens.

```
passport.use(new FacebookStrategy({
  clientID: process.env['FACEBOOK_CLIENT_ID'],
  clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/facebook',
  state: true
}, function verify(accessToken, refreshToken, profile, cb) {
  // ...
}));
```

When the `verify` function is complete, Passport establishes a login session and
redirects the user back to application, where they are now logged in.  All of
this occurs while Passport is processing the authorization response:

```js
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

The complete visualization of the requests, responses, and function calls that
occur looks as follows:

```sh
+-----+ <-- POST /oauth2/redirect/facebook --- +---------+
|     |                                        |         |
|     |   ----- Token Request  -----> +-----+  |         |
|     |   <---- Token Response ------ | AS  |  |         |
|     |                               +-----+  |         |
| App |   ------ User Request  -----> +-----+  | Browser |
|     |   <----- User Response ------ | API |  |         |
|     |                               +-----+  |         |
|     |.verify();                              |         |
|     |.login();                               |         |
|     |                                        |         |
+-----+ ---- HTTP/1.1 302 [ Location: / ] ---> +---------+
```

Everything in between the request to the redirection endpoint
(`/oauth2/redirect/facebook`) and the redirect to the application (`/`) is
handled by Passport.
