---
title: Snapchat
---

# Snapchat

The Snapchat strategy allows users to log in to a web application using their
Snapchat account.  Internally, Snapchat authorization works using OAuth 2.0.

Support for Snapchat is implemented by the [passport-snapchat](https://github.com/Snapchat/passport-snapchat)
module.

## Install

```bash
$ npm install passport-snapchat
```

## Configuration

In order to use Snapchat authorization, you must first create an app within the
[Snap Kit Developer Portal](https://kit.snapchat.com/portal).  Once created, you will then need
to generate a Confidential OAuth2 Client to be assigned a compatible OAuth2 Client ID and Private Key.
In addition, your application must also implement a redirect URL, to which the Snapchat accounts page will
redirect users after they have approved access for your application. This redirect URL will also need to be added
to the *Redirect URLs* section for your application within the developer portal.

```javascript
const passport = require('passport');
const { Strategy: SnapchatStrategy } = require('passport-snapchat');

passport.use(new SnapchatStrategy({
    clientID: SNAPCHAT_APP_ID,
    clientSecret: SNAPCHAT_APP_SECRET,
    callbackURL: "http://example.com/auth/snapchat/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(..., function (err, user) {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));
```

The verify callback for Snapchat authorization accepts `accessToken`,
`refreshToken`, and `profile` arguments.  `profile` will contain user profile
information provided by Snapchat; refer to
[Snapchat Profile](https://snapchat.github.io/passport-snapchat/interfaces/snapchatprofile.html) and
[User Profile](/guide/profile/) for additional information.

Note: For security reasons, the redirection URL must be registered with Snapchat through the developer portal.

## Routes

Two routes are required for Snapchat authorization.  The first route redirects
the user to Snapchat.  The second route is the URL to which Snapchat will
redirect the user after they have logged in.

```javascript
// Redirect the user to Snapchat for authorization.  When complete,
// Snapchat will redirect the user back to the application at
//     /auth/snapchat/callback
app.get('/auth/snapchat', passport.authenticate('snapchat'));

// Snapchat will redirect the user to this URL after approval.  Finish the
// authorization process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authorization has failed.
app.get('/auth/snapchat/callback',
  passport.authenticate('snapchat', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

Note that the URL of the callback route matches that of the `callbackURL` option
specified when configuring the strategy.

## Link

A link or button can be placed on a web page, allowing one-click login with
Snapchat.

```xml
<a href="/auth/snapchat">Login with Snapchat</a>
```
