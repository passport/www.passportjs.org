# Establish Session

In the [previous section](../redirect-back/), you added a route to authenticate
the user when Twitter rediects them back to the app.  In this section, you'll
establish a login session which will maintain the user's authenticated state as
they navigate the app.

You already [added session support](../state/) to the app in order to maintain
state between redirects.  This session support will also be used to maintain a
login session.

Open `app.js` and `require()` Passport at line 9, below
`require('express-session')`.

```js
var session = require('express-session');
var passport = require('passport');
```

Add the following code at line 35, after `session()` middleware, which will
authenticate the session.

```js
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
```

Finally, configure Passport to persist user information in the login session.
Open `routes/auth.js` and add the following code at line 47.

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

Now try signing in.  Open [http://localhost:3000](http://localhost:3000), click
"Sign in" and then click "Sign in with Twitter."

You are signed in!  Go ahead and enter some tasks you've been needing to get
done.

At this point, you have built an app that allows users to sign in with Twitter!
Next, you will [add sign out](../logout/).
