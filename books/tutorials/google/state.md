# Maintain State

When a user sign in to our app with Google, they are redirected to Google.
Google takes care of authenticating the user and then redirects them back to our
app.

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
maintain add sessions to the application.

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
```

Now that the app has session support, we are ready to handle the [redirect back
to our app](../redirect-back/).
