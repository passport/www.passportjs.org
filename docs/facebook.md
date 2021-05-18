---
title: Facebook
---

# Facebook

The Facebook strategy allows users to log in to a web application using their
Facebook account.  Internally, Facebook authentication works using OAuth 2.0.

Support for Facebook is implemented by the [passport-facebook](https://github.com/jaredhanson/passport-facebook)
module.

## Install

```bash
$ npm install passport-facebook
```

## Configuration

In order to use Facebook authentication, you must first create an app at
[Facebook Developers](https://developers.facebook.com/).  When created, an
app is assigned an App ID and App Secret.  Your application must also implement
a redirect URL, to which Facebook will redirect users after they have approved
access for your application.

```javascript
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
```

The verify callback for Facebook authentication accepts `accessToken`,
`refreshToken`, and `profile` arguments.  `profile` will contain user profile
information provided by Facebook; refer to [User Profile](/guide/profile/)
for additional information.

Note: For security reasons, the redirection URL must reside on the same host
that is registered with Facebook.

## Routes

Two routes are required for Facebook authentication.  The first route redirects
the user to Facebook.  The second route is the URL to which Facebook will
redirect the users after they have logged in.

```javascript
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

Note that the URL of the callback route matches that of the `callbackURL` option
specified when configuring the strategy.

## Permissions

If your application needs extended permissions, they can be requested by setting
the `scope` option.

```javascript
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);
```

Multiple permissions can be specified as an array.

```javascript
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);
```

## Link

A link or button can be placed on a web page, allowing one-click login with
Facebook.

```xml
<a href="/auth/facebook">Login with Facebook</a>
```
