---
title: Twitter
---

# Twitter

The Twitter strategy allows users to sign in to a web application using their
Twitter account.  Internally, Twitter authentication works using OAuth 1.0a.

Support for Twitter is implemented by the [passport-twitter](https://github.com/jaredhanson/passport-twitter)
module.

## Install

```bash
$ npm install passport-twitter
```

## Configuration

In order to use Twitter authentication, you must first create an application at
[Twitter Developers](https://dev.twitter.com/).  When created, an application is
assigned a consumer key and consumer secret.  Your application must also
implement a callback URL, to which Twitter will redirect users after they have
approved access for your application.

```javascript
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
```

The verify callback for Twitter authentication accepts `token`, `tokenSecret`,
and `profile` arguments.  `profile` will contain user profile information
provided by Twitter; refer to [User Profile](/guide/profile/) for additional
information.

## Routes

Two routes are required for Twitter authentication.  The first route initiates
an OAuth transaction and redirects the user to Twitter.  The second route is the
URL to which Twitter will redirect the user after they have signed in.

```javascript
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));
```

Note that the URL of the callback route matches that of the `callbackURL` option
specified when configuring the strategy.

## Link

A link or button can be placed on a web page, allowing one-click sign in with
Twitter.

```xml
<a href="/auth/twitter">Sign in with Twitter</a>
```
