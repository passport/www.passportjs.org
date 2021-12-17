---
title: Facebook
---

# Facebook

[Facebook Login](https://developers.facebook.com/docs/facebook-login/) allows
users to sign in using their Facebook account.  Support for Faceboook Login is
provided by the [`passport-facebook`](https://www.passportjs.org/packages/passport-facebook/)
package.

## Install

To install `passport-facebook`, execute the following command:

```bash
$ npm install passport-facebook
```

## Configure

Before your application can make use of Facebook Login, you must register your
app with Facebook.  This can be done in the [App dashboard](https://developers.facebook.com/apps)
at [Facebook for Developers](https://developers.facebook.com/).  Once
registered, your app will be issued an app ID and secret which will be used in
the strategy configuration.

The following code is an example that configures and registers the
`FacebookStrategy`:

```javascript
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/facebook'
  },
  function(accessToken, refreshToken, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://www.facebook.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Facebook account has not logged in to this app before.  Create a
        // new user record and link it to the Facebook account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
      
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://www.facebook.com',
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
        // The Facebook account has previously logged in to the app.  Get the
        // user record linked to the Facebook account and log the user in.
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

The options to the `FacebookStrategy` constructor must include a `clientID` and
`clientSecret`, the values of which are set to the app ID and secret that were
obtained when registering your application.  A `callbackURL` must also be
included.  Facebook will redirect users to this location after they have
authenticated.  The path of this URL must match the route defined below.

The `verify` function accepts an `accessToken`, `refreshToken` and `profile` as
arguments.  `accessToken` and `refreshToken` are used for API access, and are
not needed for authentication.  `profile` is a [normalized](/guide/profile/)
profile containing information provided by Facebook about the user who is
signing in.

The `verify` function is responsible for determining the user to which the
Facebook account belongs.  The first time that account is used to sign in, a new
user record is typically created automatically using profile information
supplied by Facebook, and that record is then linked to the Facebook account.
On subsequent signins, the existing user record will be found via its relation
to the Facebook account.

Linking social accounts to a user record is recommended, as it allows users to
link multiple social accounts from other providers in the event that they stop
using Facebook.  Alternatively, the user could set up a credential, such as a
password, for their user account at your app.  Either feature allows the user to
continue to sign in to your application independent of their Facebook account.

The example above illustrates usage of a SQL database to find or create a user
record and link it to a Facebook account.  However, because the `verify`
function is supplied by the application, the application is free to use a
database and schema of its choosing.

Internally, Facebook Login is implemented using [OAuth 2.0](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow).
As such, the strategy configuration is able to make use of additional options
and functionality provided by the base [OAuth 2.0 strategy](/docs/oauth/).

## Prompt

Place a button on the application's login page, prompting the user to sign in
with Facebook.

```html
<a href="/login/facebook" class="button">Log In With Facebook</a>
```

Define a route that, when the button is clicked, will redirect the user to
Facebook, where they will authenticate.

```javascript
app.get('/login/facebook', passport.authenticate('facebook'));
```

If your application needs additional permissions from the user, they can be
requested with the `scope` option:

```javascript
app.get('/login/facebook', passport.authenticate('facebook', {
  scope: [ 'email', 'user_location' ]
}));
```

## Authenticate

After the user has authenticated with Facebook, they will be redirected back
to your application.  Define a route which will handle this redirect.

```
app.get('/oauth2/redirect/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
```

When a request to this route is processed, the strategy will authenticate the
fact that the user signed in with Facebook and obtain that user's profile
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
