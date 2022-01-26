# Maintain State

When a user signs in to our app via our app's Auth0-hosted sign in page, they
are redirected to Auth0.  Auth0 takes care of authenticating the user and then
redirects them back to our app.

For security, state needs to be maintained between these two redirects.
Passport does this automatically, but the app first needs session support.
Let's add that now.

Begin by installing the necessary dependencies:

```sh
$ npm install express-session
$ npm install connect-sqlite3
```

Open `'app.js'` and `require` the additional dependencies at line 8, below
where `'morgan'` is `require`'d:

```js
var logger = require('morgan');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);
```

Add the following code at line 28, after `express.static` middleware, to
add sessions to the application.

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
```

Now that the app can maintain state, the final step is [establishing a login
session](../session/).
