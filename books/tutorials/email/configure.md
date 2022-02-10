# Configure Strategy

Now that we've set up SendGrid, we are ready to configure Passport and the
`passport-magic-link` strategy.

Install the necessary dependencies:

```sh
$ npm install passport
$ npm install passport-magic-link
$ npm install @sendgrid/mail
```

Open `'routes/auth.js'` and `require` the newly installed packages at line 2,
below where `express` is `require`'d:

```js
var express = require('express');
var passport = require('passport');
var MagicLinkStrategy = require('passport-magic-link').Strategy;
var sendgrid = require('@sendgrid/mail');
var db = require('../db');
```

The app's database is also `require`'d.

Add the following code at line 7 to configure the `MagicLinkStrategy`.

```
sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

passport.use(new MagicLinkStrategy({
  secret: 'keyboard cat',
  userFields: [ 'email' ],
  tokenField: 'token',
  verifyUserAfterToken: true
}, function send(user, token) {
  var link = 'http://localhost:3000/login/email/verify?token=' + token;
  var msg = {
    to: user.email,
    from: process.env['EMAIL'],
    subject: 'Sign in to Todos',
    text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
    html: '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' + link + '">Sign in</a></p>',
  };
  return sendgrid.send(msg);
}, function verify(user) {
  return new Promise(function(resolve, reject) {
    db.get('SELECT rowid AS id, * FROM users WHERE email = ?', [
      user.email
    ], function(err, row) {
      if (err) { return reject(err); }
      if (!row) {
        db.run('INSERT INTO users (email, email_verified) VALUES (?, ?)', [
          user.email,
          1
        ], function(err) {
          if (err) { return reject(err); }
          var id = this.lastID;
          var obj = {
            id: id,
            email: user.email
          };
          return resolve(obj);
        });
      } else {
        return resolve(row);
      }
    });
  });
}));
```

This configures the `MagicLinkStrategy` to send emails containing a magic link
using SendGrid.  When the user clicks on the magic link, the user record
associated with the email address will be found.  If a user record does not
exist, one is created the first time someone signs in.

The strategy is now configured.  Next we need to [send the user a magic link](../send/)
when they click "Sign in with email."