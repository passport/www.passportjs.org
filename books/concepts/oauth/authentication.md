# Authentication

Remember that OAuth 1.0 is an _authorization_ protocol.  Let's examine how that
relates to _authentication_.

During the authorization process, Twitter authenticated the user and obtained
their consent to allow the application to access their account.  Twitter then
issued an access token to the application reflecting that authorization.  When
the access token is used to access the `/account/verify-credentials.json` API,
information about the user who Twitter authenticated is returned.

This is known as _delegated authentication_.  In effect, the application is not
actually authenticating the user - Twitter is.  The application delegated that
responsibility to Twitter.  The application is relying on Twitter to inform it
about the user that authenticated.  The end result is the same: the application
knows who has logged in.

The distinction between _authentication_ and _delegated authentication_ is worth
noting, however.  It introduces another entity in the process (Twitter, in this
case), which has implications.  The user's log in experience is improved, as
they no longer have to create an account or yet another password.  On the other
hand, privacy concerns arise when granting access to data.  Often times the
benefits outweigh the drawbacks, but each application will have different
tradeoffs.

Now that Passport knows who has authenticated, it calls the application's
`verify` function with the profile information as well as the token.

```
passport.use(new TwitterStrategy({
  consumerKey: process.env['TWITTER_CONSUMER_KEY'],
  consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
  callbackURL: '/oauth/callback/twitter',
}, function verify(token, tokenSecret, profile, cb) {
  // ...
}));
```

When the `verify` function is complete, Passport establishes a login session and
redirects the user back to application, where they are now logged in.
