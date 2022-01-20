# Login Prompt

We want to let users sign in using a username and password.  For that, we need
a login page that prompts the user for their username and password.  Let's add
that now.

Let's create a file that will contain authentication-related routes:

```sh
$ touch routes/auth.js
```

Add the following code to that file, which creates a login route that will
render the login page.

```js
var express = require('express');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
```

Next, we need to add this route to the app.  Open `'app.js'` and `require` the
newly created auth routes at line 8, below where `'routes/index'` is
`require`'d:

```js
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
```

Continuing within `'app.js'`, use the newly `require`'d `authRouter` at line 25,
below where `indexRouter` is `use`'d.

```js
app.use('/', indexRouter);
app.use('/', authRouter);
```

The login page has been added to our app!  Let's see how it looks.

Start the server:

```sh
$ npm start
```

And open [http://localhost:3000](http://localhost:3000) and click "Sign in."  We
are prompted to sign in, but there's no place to enter a username and password.

For that we need an HTML form.  Let's add that now.

Open `'views/login.ejs'` and add the form at line 15, below the "Sign in"
heading:

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

Refresh the page.  We've now got a login page that prompts the user for their
username and password.  Next, we will [verify the username and password](../verify/).
