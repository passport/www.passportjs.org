# Configure Strategy

In the [previous section](../register/), you registered the app with Google.  In
this section, you'll configure Passport with the information obtained during
registration.

First, create a `.env` file to store the client ID and secret that were obtained
from Google.

```sh
$ touch .env
```

Then, add the client ID and secret.  The contents of `.env` should look as
follows.

```sh
GOOGLE_CLIENT_ID=__INSERT_CLIENT_ID_HERE__
GOOGLE_CLIENT_SECRET=__INSERT_CLIENT_SECRET_HERE__
```

The client ID and secret obtained from Google should be inserted where noted.

Open `routes/auth.js` and add the following code at line 6 to configure the
`GoogleStrategy`.

```js
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
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
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
  });
}));
```

This configures the `GoogleStrategy` to fetch the user record associated with
the Google account.  If a user record does not exist, one is created the first
time someone signs in.  In either case, the user is authenticated.

The strategy is now configured.  Next you will add session support to the app in
order to [maintain state](../state/) when redirecting to Google.
