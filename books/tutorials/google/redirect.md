# Redirect to Google

Now that we are prompting the user to sign in with Google, the next step is to
redirect the user to Google.

To do that, we are going to use Passport and the `passport-google-oidc`
strategy.  Install both as dependencies:

```sh
$ npm install passport
$ npm install passport-google-oidc
```

Open `'routes/auth.js'` and `require` the newly installed packages, as well as
the app's database, at line 2, below where `express` is `require`'d:

```js
var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');
```

Next, we need to add a route that will redirect the user when they click "Sign
in with Google".

Continuing within `'routes/auth.js'`, add this route at line 12, below the
`'/login'` route:

```js
router.get('/login/federated/accounts.google.com', passport.authenticate('google'));
```

We've now got a route that will redirect the user to Google!  Let's test it out
to see what happens.

Start the server:

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in" and then
click "Sign in with Google".

Uh oh... we are informed the Google authentication strategy is unknown.  We will
fix that by configuring the strategy.  But first, we need to [register our app
with Google](../register/).
