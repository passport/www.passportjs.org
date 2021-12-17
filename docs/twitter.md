---
title: Twitter
---

# Twitter

[Log in with Twitter](https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter)
allows users to sign in using their Twitter account.  Support for Log in with
Twitter is provided by the [`passport-twitter`](https://www.passportjs.org/packages/passport-twitter/)
package.

## Install

To install `passport-twitter`, execute the following command:

```bash
$ npm install passport-twitter
```

## Configure

Before your application can make use of Log in with Twitter, you must register
your app with Twitter.  This can be done in the [Apps dashboard](https://developer.twitter.com/en/apps)
at [Twitter Developer Platform](https://developer.twitter.com/).  Once
registered, your app will be issued an API key and secret which will be used in
the strategy configuration.

The following code is an example that configures and registers the
`TwitterStrategy`:


```javascript
var passport = require('passport')
var TwitterStrategy = require('passport-twitter');

passport.use(new TwitterStrategy({
    consumerKey: process.env['TWITTER_API_KEY'],
    consumerSecret: process.env['TWITTER_API_SECRET'],
    callbackURL: 'http://www.example.com/oauth/callback/twitter'
  },
  function(token, tokenSecret, profile, done) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://twitter.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Twitter account has not logged in to this app before.  Create
        // new user record and link it to the Twitter account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
      
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://twitter.com',
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
        // The Twitter account has previously logged in to the app.  Get the
        // user record linked to the Twitter account and log the user in.
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

The options to the `TwitterStrategy` constructor must include a `consumerKey`
and `consumerSecret`, the values of which are set to the API key and secret that
were obtained when registering your application.  A `callbackURL` must also be
included.  Twitter will redirect users to this location after they have
authenticated.  The path of this URL must match the route defined below.

The `verify` function accepts a `token`, `tokenSecret` and `profile` as
arguments.  `token` and `tokenSecret` are used for API access, and are not
needed for authentication.  `profile` is a [normalized](/guide/profile/) profile
containing information provided by Twitter about the user who is signing in.

The `verify` function is responsible for determining the user to which the
Twitter account belongs.  The first time that account is used to sign in, a new
user record is typically created automatically using profile information
supplied by Twitter, and that record is then linked to the Twitter account.  On
subsequent signins, the existing user record will be found via its relation to
the Twitter account.

Linking social accounts to a user record is recommended, as it allows users to
link multiple social accounts from other providers in the event that they stop
using Twitter.  Alternatively, the user could set up a credential, such as a
password, for their user account at your app.  Either feature allows the user to
continue to sign in to your application independent of their Twitter account.

The example above illustrates usage of a SQL database to find or create a user
record and link it to a Twitter account.  However, because the `verify` function
is supplied by the application, the application is free to use a database and
schema of its choosing.

Internally, Log in with Twitter is implemented using [OAuth 1.0a](https://developer.twitter.com/en/docs/authentication/oauth-1-0a).
As such, the strategy configuration is able to make use of additional options
and functionality provided by the base [OAuth strategy](/docs/oauth/).

## Prompt

Place a button on the application's login page, prompting the user to sign in
with Twitter.

```html
<a href="/login/twitter" class="button">Sign in with Twitter</a>
```

Define a route that, when the button is clicked, will redirect the user to
Twitter, where they will authenticate.

```javascript
app.get('/login/twitter', passport.authenticate('twitter'));
```

## Authenticate

After the user has authenticated with Twitter, they will be redirected back to
your application.  Define a route which will handle this redirect.

```
app.get('/oauth/callback/twitter',
  passport.authenticate('twitter', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
```

When a request to this route is processed, the strategy will authenticate the
fact that the user signed in with Twitter and obtain that user's profile
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
