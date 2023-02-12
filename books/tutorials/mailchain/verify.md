# Verify Mailchain Address

Now that we've sent the user a Mailchain message with a magic link, the next step is
to verify the Mailchain address when they click the link.

Open `'routes/auth.js'`, add this route at line 66, below the `'/login/mailchain/check'`
route:

```js
router.get('/login/mailchain/verify', passport.authenticate('magiclink', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

This route will verify the Mailchain address when the link is clicked.

Now create a folder and corresponding view for our route. Run the following commands:

```
$ mkdir views/login/mailchain
$ touch views/login/mailchain/check.ejs
```

Open `'views/login/mailchain/check.ejs'`, add the following code:

```
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Express • TodoMVC</title>
		<link rel="stylesheet" href="/css/base.css">
		<link rel="stylesheet" href="/css/index.css">
		<link rel="stylesheet" href="/css/login.css">
	</head>
	<body>
		<section class="prompt">
			<h3>todos</h3>
			<h1>Check your Mailchain Inbox</h1>
			<p class="instructions">We sent a magic link to your Mailchain address. Click the link in that message to sign in.</p>
			<hr>
			<p class="help">Didn't receive the message? <a href="/login">Get another link</a></p>
		</section>
		<footer class="info">
			<p>Created by <a href="https://www.jaredhanson.me">Jared Hanson</a></p>
			<p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
			<p>Authentication powered by <a href="https://www.passportjs.org">Passport</a></p>
		</footer>
	</body>
</html>
```

Finally, update `'views/index.ejs'` at line 15 to include the `user.mailchain_address`:
```
<li class="user"><%= user.name || user.username || user.email || user.mailchain_address %></li>
```

Let's test it out to see what happens.

Start the server:

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000), click "Sign in", enter your
Mailchain address and click "Sign in with Mailchain".

Now, check your Mailchain inbox and click the link.

Uh oh... we are informed that there's an error related to sessions.  Next, we
will fix that by [establishing a session](../session/).
