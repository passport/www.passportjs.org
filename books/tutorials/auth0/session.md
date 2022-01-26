# Establish Session

Once the user has signed in via Auth0, our app needs a login session to remember
who the user is as they navigate the app.

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
`'routes/auth.js'` and add the following code at line 18:

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

Now, let's try signing in.

Start the server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) and click "Sign in."

If this is your first time signing in, go ahead and sign up.  Otherwise enter
the email address and password for your account.

We are logged in!  Go ahead and enter some tasks you've been needing to get
done.

At this point, users can sign in and sign up to our app!  Next, we will add the
ability to [sign out](../logout/).
