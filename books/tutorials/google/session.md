# Establish Session

Once the user has signed in with Google, we need to a login session to remember
the fact that the user has authenticated as they navigate the app.

Open `'app.js'` and `require` Passport at line 9, below where
`'express-session'` is `require`'d:

```js
var session = require('express-session');
var passport = require('passport');
```

Add the following code at line 35, after `session` middleware, to authenticate
the session.

```js
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
```

Finally, we need to configure Passport to manage the login session.  Open
`'routes/auth.js'` and add the following code at line 47:

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

Now, let's retry signing in.  Open [http://localhost:3000](http://localhost:3000),
click "Sign in" and then click "Sign in with Google".

We are logged in!  Go ahead and enter some tasks you've been needing to get
done.

At this point, users can sign in with Google!  Next, we will add the ability to
[sign out](../logout/).
