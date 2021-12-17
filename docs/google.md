---
title: Google
---

# Google

[Sign In With Google](https://developers.google.com/identity) allows users to
sign in using their Google account.  Support for Sign In With Google is
provided by the [`passport-google-oidc`](https://github.com/jaredhanson/passport-google-openidconnect)
package.

## Install

To install `passport-google-oidc`, execute the following command:

```bash
$ npm install passport-google-oidc
```

## Configure

Before your application can make use of Sign In With Google, you must register
your app with Google.  This can be done in the [APIs & Services](https://console.cloud.google.com/apis)
page of the [Google Cloud Platform console](https://console.cloud.google.com/).
Once registered, your app will be issued a client ID and secret which will be
used in the strategy configuration.

The following code is an example that configures and registers the
`GoogleStrategy`:

```javascript
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
  },
  function(issuer, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Google account has not logged in to this app before.  Create a
        // new user record and link it to the Google account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
      
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id.toString(),
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The Google account has previously logged in to the app.  Get the
        // user record linked to the Google account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    };
  }
));
```

The options to the `GoogleStrategy` constructor must include a `clientID` and
`clientSecret`, the values of which are set to the client ID and secret that
were obtained when registering your application.  A `callbackURL` must also be
included.  Google will redirect users to this location after they have
authenticated.  The path of this URL must match the route defined below.

The `verify` function accepts `issuer` and `profile` as arguments.  `issuer` is
set to `"https://accounts.google.com"`, indicating that the user signed in with
Google.  `profile` is a [normalized](/guide/profile/) profile containing
information provided by Google about the user who is signing in.

The `verify` function is responsible for determining the user to which the
Google account belongs.  The first time that account is used to sign in, a new
user record is typically created automatically using profile information
supplied by Google, and that record is then linked to the Google account.  On
subsequent signins, the existing user record will be found via its relation to
the Google account.

Linking social accounts to a user record is recommended, as it allows users to
link multiple social accounts from other providers in the event that they stop
using Google.  Alternatively, the user could set up a credential, such as a
password, for their user account at your app.  Either feature allows the user to
continue to sign in to your application independent of their Google account.

The example above illustrates usage of a SQL database to find or create a user
record and link it to a Google account.  However, because the `verify` function
is supplied by the application, the application is free to use a database and
schema of its choosing.

Internally, Sign In With Google is implemented using [OpenID Connect](https://developers.google.com/identity/protocols/oauth2/openid-connect).
As such, the strategy configuration is able to make use of additional options
and functionality provided by the base OpenID Connect strategy.

## Prompt

Place a button on the application's login page, prompting the user to sign in
with Google.

```html
<a href="/login/google" class="button">Sign in with Google</a>
```

Define a route that, when the button is clicked, will redirect the user to
Google, where they will authenticate.

```javascript
app.get('/login/google', passport.authenticate('google'));
```

If your application needs additional information about the user, that can be
requested with the `scope` option:

```javascript
app.get('/login/google', passport.authenticate('google', {
  scope: [ 'email' ]
}));
```

## Authenticate

After the user has authenticated with Google, they will be redirected back
to your application.  Define a route which will handle this redirect.

```
app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
```

When a request to this route is processed, the strategy will authenticate the
fact that the user signed in with Google and obtain that user's profile
information.  If authentication succeeds, `passport.authenticate()` middleware
calls the next function in the stack.  In this example, the function is
redirecting the authenticated user to the home page.

When authentication fails, the user is re-prompted to sign in and informed that
their initial attempt was not successful.  This is accomplished by using the
`failureRedirect` option, which will redirect the user to the login page, along
with the `failureMessage` option which will add the message to
`req.session.messages`.

The path of this route should be the value supplied for the `callbackURL` option
in the strategy configuration above.

