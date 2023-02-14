# Configure Strategy

Now that we've set up Mailchain, we are ready to configure Passport and the
`passport-magic-link` strategy.

Install the necessary dependencies:

```sh
$ npm install passport
$ npm install passport-magic-link
$ npm install @mailchain/sdk
```

Open `'routes/auth.js'` and `require` the newly installed packages at line 2,
below where `express` is `require`'d:

```js
var passport = require("passport");
var MagicLinkStrategy = require("passport-magic-link").Strategy;
var Mailchain = require("@mailchain/sdk").Mailchain;
var db = require("../db");
```

The app's database is also `require`'d.

Add the following code at line 8 to configure the `MagicLinkStrategy`.

```js
var mailchain = Mailchain.fromSecretRecoveryPhrase(process.env.SECRET_RECOVERY_PHRASE);
let fromAddress = async function fromAddress() {
  return process.env['FROM_ADDRESS'] || mailchain.user().address;
}
let createMailchainAddress = function(address) {
    switch (address) {
    case address.match(/^[\d\w\-\_]*@mailchain\.com$/)?.input: // Mailchain address:
      return address
    case address.match(/^0x[a-fA-F0-9]{40}$/)?.input: // Ethereum address:
        return address + '@ethereum.mailchain.com'
    case address.match(/^.*\.eth$/)?.input:  // ENS address:
        return address + '@ens.mailchain.com'
    case address.match(/^.*\.*@mailchain$/)?.input: // Mailchain address without .com:
        return address + '.com'
    default:
        console.error("Invalid address");
    }
}
passport.use(new MagicLinkStrategy({
  secret: 'keyboard cat', // change this to something secret
  userFields: [ 'mailchain_address' ],
  tokenField: 'token',
  verifyUserAfterToken: true
}, async function send(user, token) {
  var link = 'http://localhost:3000/login/mailchain/verify?token=' + token;

  var msg = {
    to: [ createMailchainAddress(user.mailchain_address) ],
    from: fromAddress,
    subject: 'Sign in to Todos',
    content: {
      text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
      html: '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' + link + '">Sign in</a></p>',
    }
  };
  return await mailchain.sendMail(msg);
}, function verify(user) {
  return new Promise(function(resolve, reject) {
    db.get('SELECT * FROM users WHERE mailchain_address = ?', [
      createMailchainAddress(user.mailchain_address)
    ], function(err, row) {
      if (err) { return reject(err); }
      if (!row) {
        db.run('INSERT INTO users (mailchain_address, mailchain_address_verified) VALUES (?, ?)', [
          createMailchainAddress(user.mailchain_address,)
          1
        ], function(err) {
          if (err) { return reject(err); }
          var id = this.lastID;
          var obj = {
            id: id,
            mailchain_address: createMailchainAddress(user.mailchain_address)
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

This configures the `MagicLinkStrategy` to sanitize the input address, then send
mails containing a magic link using Mailchain. When the user clicks on the magic
link, the user record associated with the Mailchain address will be found. If a
user record does not exist, one is created the first time someone signs in.

We also need to update our database scheme. Open `'db.js'` and insert the
following at line 16:

```js
mailchain_address TEXT UNIQUE, \
mailchain_address_verified INTEGER, \
```

We will now delete the database and re-create it. NOTE: This will delete any
data you may have added in this tutorial so far. If you are considering adding
this solution to an existing app, you would simply run a DB migration to alter
your `users` table.

```sh
$ rm ./var/db/todos.db
```

The strategy is now configured. Next we need to
[send the user a magic link](../send/) when they click "Sign in with Mailchain"
