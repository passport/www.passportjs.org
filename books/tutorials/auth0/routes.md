# Add Routes

When the user clicks the "Sign in" button, they will be redirected to our app's
sign in page, which is hosted by Auth0.  Once on that page, the user will log
in.  After they've logged in, the user will be redirect back to our app.

Open `'routes/auth.js'` and add the following code at the end of the file, which
creates two routes.  The first will redirect the user to the sigin page.  The
second will process the authentication result when the user is redirected back.

```js
var express = require('express');
var router = express.Router();

router.get('/login', passport.authenticate('openidconnect'));

router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
```

Next, we need to add these routes to our app.  Open `'app.js'` and `require` the
newly created auth routes at line 10, below where `'routes/index'` is
`require`'d:

```js
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
```

Continuing within `'app.js'`, use the newly `require`'d `authRouter` at line 27,
below where `indexRouter` is `use`'d.

```js
app.use('/', indexRouter);
app.use('/', authRouter);
```

The routes have been added to the app.  Next we need to [maintain state](../state/)
when redirecting to Auth0.
