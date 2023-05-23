# Maintain State

In the [previous section](../configure/), you configured Passport to support
signing in with Twitter.  In this section, you'll add session support to the app
in order to maintain state.

When a user signs in to the app with Twitter, they are redirected to Twitter.
Twitter takes care of authenticating the user and then redirects them back to
the app.  For security reasons, it is important that state is maintained and
validated between these two redirects.

Passport validates state automatically, but this requires the app to have
session support.  Install `express-session` and the `connect-sqlite3` session
store as dependencies.

```sh
$ npm install express-session
$ npm install connect-sqlite3
```

Open `app.js` and `require()` the additional dependencies at line 8, below
`require('morgan')`.

```js
var logger = require('morgan');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);
```

Add the following code at line 28, after `express.static()` middleware, which
will add session support to the application.

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: 'var/db' })
}));
```

Now that the app has session support, the next step is to handle the [redirect
back](../redirect-back/) from Twitter to the app.
