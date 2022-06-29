# Establish Session

In the [previous section](../verify/), you configured Passport and added a route
to authenticate a username and password.  In this section, you'll establish a
login session which will maintain the user's authenticated state as they
navigate the app.

In order to establish a login session, the app needs session support.  Install
`express-session` and the `connect-sqlite3` session store as dependencies.

```sh
$ npm install express-session
$ npm install connect-sqlite3
```

Open `'app.js'` and `require()` the additional dependencies at line 8, below
where `'morgan'` is `require()`'d.

```js
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);
```

Add the following code at line 29, after `express.static()` middleware, which
will add session support to the app and then authenticate the session.

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
```

Finally, configure Passport to persist user information in the login session.
Open `'routes/auth.js'` and add the following code at line 22.

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

Now try signing in.  Open [http://localhost:3000](http://localhost:3000), click
"Sign in," and enter the following credentials:

```
Username: alice
Password: letmein
```

Click "Sign in."

You are signed in!  Go ahead and enter some tasks you've been needing to get
done.

At this point, users can sign in to the app with a username and password!  Next,
you will [add sign out](../logout/).
