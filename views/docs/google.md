
# Google

The Google strategy allows users to sign in to a web application using their
Google account.  Google [used to support OpenID internally](https://developers.google.com/identity/protocols/OpenID2Migration#shutdown-timetable), but it now works based on [OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect) and supports oAuth 1.0 and oAuth 2.0.

Support for Google is implemented by the [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth)
module.

## Install

```bash
$ npm install passport-google-oauth
```

## Configuration

The Client Id and Client Secret needed to authenticate with Google can be set up from the [Google Developers Console](https://console.developers.google.com). You may also need to enable Google+ API in the developer console, otherwise user profile data may not be fetched. Google supports authentication with both oAuth 1.0 and oAuth 2.0.

### oAuth 1.0

The Google OAuth 1.0 authentication strategy authenticates users using a Google account and OAuth tokens. The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a consumer key, consumer secret, and callback URL.

#### Configuration 

```javascript
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: GOOGLE_CONSUMER_KEY,
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));
```

#### Routes

Use passport.authenticate(), specifying the 'google' strategy, to authenticate requests. Authentication with Google requires an extra `scope` parameter. For information, go [here](https://developers.google.com/identity/protocols/OpenIDConnect#scope-param).

```javascript
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```
### oAuth 2.0

The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, and callback URL.

#### Configuration

```javascript
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
```

#### Routes

Use `passport.authenticate()`, specifying the 'google' strategy, to authenticate requests. Authentication with Google requires an extra `scope` parameter. For information, go [here](https://developers.google.com/identity/protocols/OpenIDConnect#scope-param).

```javascript
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```
## Link

A link or button can be placed on a web page, allowing one-click sign in with
Google.

```xml
<a href="/auth/google">Sign In with Google</a>
```
