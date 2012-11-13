---
layout: 'guide'
title: 'Google'
---

### Google

The Google strategy allows users to sign in to a web application using their
Google account.  Internally, Google authentication works using OpenID.

Using this strategy directly, as opposed to the general-purpose OpenID strategy,
allows a site to offer one-click sign in.  The user does not have to enter an
identifier, which improves usability, albeit at the expense of limiting choice
of provider.

Support for Google is implemented by the [passport-google](https://github.com/jaredhanson/passport-google)
module.

#### Install

```bash
$ npm install passport-google
```

#### Configuration

When using Google for sign in, your application must implement a return
URL, to which Google will redirect users after they have authenticated.
The `realm` indicates the part of URL-space for which authentication is valid.
Typically this will be the root URL of your website.

```javascript
var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://www.example.com/auth/google/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));
```

The verify callback for Google authentication accepts `identifier` and `profile`
arguments.  `profile` will contain user profile information provided by Google;
refer to [User Profile](/guide/profile/) for additional information.

#### Routes

Two routes are required for Google authentication.  The first route redirects
the user to Google.  The second route is the URL to which Google will return the
user after they have signed in.

```javascript
// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
```

Note that the URL of the return route matches that of the `returnURL` option
specified when configuring the strategy.

#### Link

A link or button can be placed on a web page, allowing one-click sign in with
Google.

```xml
<a href="/auth/google">Sign In with Google</a>
```
