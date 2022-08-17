# Login Prompt

To let users sign in with a username and password, the app needs a page which
prompts the user to enter their credentials.  In this section, you'll add a
signin page.

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

Next, add these routes to the app.  Open `app.js` and `require()` the newly
created auth routes at line 10, below `require('./routes/index')`.

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

Open [http://localhost:3000](http://localhost:3000/) and click "Sign in."  You
are prompted to sign in, but there's no place to enter a username and password.

Add an HTML form which will allow the user to input their credentials.  Open
`views/login.ejs` and add a form at line 15, below the "Sign in" heading.

```html
<h1>Sign in</h1>
<form action="/login/password" method="post">
	<section>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" autocomplete="username" required autofocus>
	</section>
	<section>
		<label for="current-password">Password</label>
		<input id="current-password" name="password" type="password" autocomplete="current-password" required>
	</section>
	<button type="submit">Sign in</button>
</form>
```

Refresh the page.  The app now has a signin page that prompts the user for their
username and password.  Next, you will [verify the username and password](../verify/).
