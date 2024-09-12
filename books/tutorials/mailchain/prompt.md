# Login Prompt

We want to let users sign in with their Mailchain account or any valid Mailchain
address.  For that, we need a login page that prompts the user to enter their
Mailchain address.  Let's add that now.

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
newly created auth route at line 10, below where `'routes/index'` is
`require`'d:

```js
var authRouter = require('./routes/auth');
```

Continuing within `'app.js'`, use the newly `require`'d `authRouter` at line 27,
below where `indexRouter` is `use`'d.

```js
app.use('/', authRouter);
```

Now we will update the login page so the use can enter a Mailchain address.

Open `'views/login.ejs'` and add the form at line 15, below `<h1>Sign in</h1>`.
heading:

```html
<form action="/login/mailchain" method="post">
	<section>
		<label for="mailchain_address">Mailchain Address or ENS Name</label>
		<input id="mailchain_address" name="mailchain_address" type="text" autocomplete="username"
			placeholder="...@mailchain.com or ensname.eth" required autofocus>
	</section>
	<button type="submit">Sign in with Mailchain</button>
</form>
```

Refresh the page.  We've now got a login page that prompts the user to sign in
with Mailchain.  Next, we will [set up Mailchain](../setup/), in preparation for
sending the user a magic link.
