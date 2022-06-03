# Establish Session

Once we've verified the user's email address, we need a login session to
remember the fact that the user has authenticated as they navigate the app.

To do that, we'll add session support.  Begin by installing the necessary
dependencies:

```sh
$ npm install express-session
$ npm install connect-sqlite3
```

Open `'app.js'` and `require` the additional dependencies at line 8, below
where `'morgan'` is `require`'d:

```js
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);
```

Add the following code at line 29, after `express.static` middleware, to
maintain and authenticate the session.

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

Finally, we need to configure Passport to manage the login session.  Open
`'routes/auth.js'` and add the following code at line 50:

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

Now, let's retry signing in.  Open [http://localhost:3000](http://localhost:3000),
click "Sign in", enter your email address and click "Sign in with Email".

Now, check your email and click the link.

We are logged in!  Go ahead and enter some tasks you've been needing to get
done.

At this point, users can sign in with email!  Next, we will add the ability to
[sign out](../logout/).
