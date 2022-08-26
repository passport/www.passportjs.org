# Login Prompt

To let users sign in with Google, the app needs a page with a button that
prompts the user to do that.  In this section, you'll add a signin page.

Create a file that will contain authentication-related routes.

```sh
$ touch routes/auth.js
```

Add the following code to that file, which creates a route that will render the
signin page.

```js
var express = require('express');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
```

Next, add these route to the app.  Open `app.js` and `require()` the newly created
auth routes at line 10, below `require('routes/index')`.

```js
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
```

Continuing within `app.js`, `use()` the newly `require()`'d `authRouter` at line
27, below `app.use('/', indexRouter)`.

```js
app.use('/', indexRouter);
app.use('/', authRouter);
```

The signin page has been added to the app!  See how it looks by starting the
server.

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) and click "Sign in."  You
are prompted to sign in, but there's no place to choose Google.

Add a button which will allow the user to sign in with Google.  Open
`views/login.ejs` and add a link at line 15, below the "Sign in" heading.

```html
<h1>Sign in</h1>
<a class="button google" href="/login/federated/google">Sign in with Google</a>
```

Refresh the page.  The app now has a signin page that prompts the user to sign in
with Google.  Next, you will [redirect the user to Google](../redirect/).
