# Redirect to Google

In the [previous section](../prompt/), you created a page which prompts the user
to sign in with Google.  In this section, you'll add a route which redirects the
user to Google when they click the button.  It won't work just yet, because
there are a few other pieces that need to be put in place.  Subsequent steps
will add the missing functionality and everything will work by the end of this
tutorial.

Install `passport` and the `passport-google-oidc` strategy as dependencies.

```sh
$ npm install passport
$ npm install passport-google-oidc
```

Open `routes/auth.js` and `require()` the newly installed packages, as well as
the app's database, at line 2, below `require('express')`.

```js
var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');
```

Next, add a route that will redirect the user when they click "Sign in with
Google".  Continuing within `routes/auth.js`, add the following code at line 12,
below the `/login` route.

```js
router.get('/login/federated/google', passport.authenticate('google'));
```

Try signing in by starting the server.

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in" and then
click "Sign in with Google."

Uh oh... the app fails with an error indicating that the Google authentication
strategy is unknown.  That will be fixed by [configuring the strategy](../configure/).
But first, the app needs to be [registered with Google](../register/).
