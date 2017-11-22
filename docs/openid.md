---
title: OpenID
---

# OpenID

[OpenID](http://openid.net/) is an open standard for federated authentication.
When visiting a website, users present their OpenID to sign in.  The user then
authenticates with their chosen OpenID provider, which issues an assertion to
confirm the user's identity.  The website verifies this assertion in order to
sign the user in.

Support for OpenID is provided by the [passport-openid](https://github.com/jaredhanson/passport-openid)
module.

## Install

```bash
$ npm install passport-openid
```

## Configuration

When using OpenID, a return URL and realm must be specified.  The `returnURL` is
the URL to which the user will be redirected after authenticating with their
OpenID provider.  `realm` indicates the part of URL-space for which
authentication is valid.  Typically this will be the root URL of the website.

```javascript
var passport = require('passport')
  , OpenIDStrategy = require('passport-openid').Strategy;

passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));
```

The verify callback for OpenID authentication accepts an `identifier` argument
containing the user's claimed identifier.

## Form

A form is placed on a web page, allowing the user to enter their OpenID and
sign in.

```xml
<form action="/auth/openid" method="post">
    <div>
        <label>OpenID:</label>
        <input type="text" name="openid_identifier"/><br/>
    </div>
    <div>
        <input type="submit" value="Sign In"/>
    </div>
</form>
```

## Routes

Two routes are required for OpenID authentication.  The first route accepts the
form submission containing an OpenID identifier.  During authentication, the
user will be redirected to their OpenID provider.  The second route is the URL
to which the user will be returned after authenticating with their OpenID
provider.

```javascript
// Accept the OpenID identifier and redirect the user to their OpenID
// provider for authentication.  When complete, the provider will redirect
// the user back to the application at:
//     /auth/openid/return
app.post('/auth/openid', passport.authenticate('openid'));

// The OpenID provider has redirected the user back to the application.
// Finish the authentication process by verifying the assertion.  If valid,
// the user will be logged in.  Otherwise, authentication has failed.
app.get('/auth/openid/return',
  passport.authenticate('openid', { successRedirect: '/',
                                    failureRedirect: '/login' }));
```

## Profile Exchange

OpenID can optionally be configured to retrieve profile information about the
user being authenticated.  Profile exchange is enabled by setting the `profile`
option to `true`.

```javascript
passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/',
    profile: true
  },
  function(identifier, profile, done) {
    // ...
  }
));
```

When profile exchange is enabled, the function signature of the verify callback
accepts an additional `profile` argument containing user profile information
provided by the OpenID provider; refer to [User Profile](/guide/profile/) for
further information.
