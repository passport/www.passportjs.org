---
layout: 'guide'
title: 'Authorize'
---

### Authorize

An application may need to incorporate information from multiple third-party
services.  In this case, the application will request the user to "connect", for
example, both their Facebook and Twitter accounts.

When this occurs, a user will already be authenticated with the application, and
any subsequent third-party accounts merely need to be authorized and associated
with the user.  Because authentication and authorization in this situation are
similar, Passport provides a means to accommodate both.

Authorization is performed by calling `passport.authorize()`.  If authorization
is granted, the result provided by the strategy's verify callback will be
assigned to `req.account`.  The existing login session and `req.user` will be
unaffected.

```javascript
app.get('/connect/twitter',
  passport.authorize('twitter-authz', { failureRedirect: '/account' })
);

app.get('/connect/twitter/callback',
  passport.authorize('twitter-authz', { failureRedirect: '/account' }),
  function(req, res) {
    var user = req.user;
    var account = req.account;
    
    // Associate the Twitter account with the logged-in user.
    account.userId = user.id;
    account.save(function(err) {
      if (err) { return self.error(err); }
      self.redirect('/');
    });
  }
);
```

In the callback route, you can see the use of both `req.user` and `req.account`.
The newly connected account is associated with the logged-in user and saved to
the database.

#### Configuration

Strategies used for authorization are the same as those used for authentication.
However, an application may want to offer both authentication and authorization
with the same third-party service.  In this case, a _named strategy_ can be
used, by overriding the strategy's default name in the call to `use()`.

```javascript
passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/connect/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    Account.findOne({ domain: 'twitter.com', uid: profile.id }, function(err, account) {
      if (err) { return done(err); }
      if (account) { return done(null, account); }

      var account = new Account();
      account.domain = 'twitter.com';
      account.uid = profile.id;
      var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };
      account.tokens.push(t);
      return done(null, account);
    });
  }
));
```

In the above example, you can see that the `twitter-authz` strategy is finding
or creating an `Account` instance to store Twitter account information.  The
result will be assigned to `req.account`, allowing the route handler to
associate the account with the authenticated user.

### Association in Verify Callback

One downside to the approach described above is that it requires two instances
of the same strategy and supporting routes.

To avoid this, set the strategy's `passReqToCallback` option to `true`.  With
this option enabled, `req` will be passed as the *first* argument to the verify
callback.

```javascript
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback",
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    if (!req.user) {
      // Not logged-in. Authenticate based on Twitter account.
    } else {
      // Logged in. Associate Twitter account with user.  Preserve the login
      // state by supplying the existing user after association.
      // return done(null, req.user);
    }
  }
));
```

With `req` passed as an argument, the verify callback can use the state of the
request to tailor the authentication process, handling both authentication and
authorization using a single strategy instance and set of routes.  For
example, if a user is already logged in, the newly "connected" account can be
associated.  Any additional application-specific properties set on `req`,
including `req.session`, can be used as well.