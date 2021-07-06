---
title: Middleware
---

# Middleware

Passport is used as middleware within a web application to authenticate
requests.  Middleware was popularized in [Node.js](https://nodejs.org/) by
[Express](https://expressjs.com/) and its even more minimalist sibling [Connect](https://github.com/senchalabs/connect).
Given its popularity, middleware is easily adaptable to other web frameworks.

A basic route that that authenticates a user with a username and password:

```javascript
app.post('/login/password',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

This route uses `passport.authenticate()`, in conjunction with the `'local'`
strategy to authenticate a user with a username and password.  When processing
the request, the `passport.authenticate()` middleware will authenticate the
request and either call the next function in the stack or end the
request-response cycle.

By default, when authentication succeeds, Passport will set the `req.user`
property to the authenticated user, establish a session for that user, and call
the next function in the stack.  When authentication fails, Passport will
respond with an HTTP `401 Unauthorized` status code and end the cycle.  Any
additional functions in the stack will not be called.  The default behavior is
modifiable using options.





Authenticating requests is as simple as calling `passport.authenticate()` and
specifying which strategy to employ.  `authenticate()`'s function signature is
standard [Connect](http://www.senchalabs.org/connect/) middleware, which makes it
convenient to use as route middleware in [Express](http://expressjs.com/)
applications.

```javascript
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
```

By default, if authentication fails, Passport will respond with a
`401 Unauthorized` status, and any additional route handlers will not be
invoked.  If authentication succeeds, the next handler will be invoked and the
`req.user` property will be set to the authenticated user.

Note: Strategies must be configured prior to using them in a route.  Continue
reading the chapter on [configuration](/guide/configure/) for details.

## Redirects

A redirect is commonly issued after authenticating a request.

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));
```

In this case, the redirect options override the default behavior.  Upon
successful authentication, the user will be redirected to the home page.  If
authentication fails, the user will be redirected back to the login page for
another attempt.

## Flash Messages

Redirects are often combined with flash messages in order to display status
information to the user.

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
```

Setting the `failureFlash` option to `true` instructs Passport to flash an
`error` message using the message given by the strategy's verify callback, if
any.  This is often the best approach, because the verify callback can make the
most accurate determination of why authentication failed.

Alternatively, the flash message can be set specifically.

```javascript
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
```

A `successFlash` option is available which flashes a `success` message when
authentication succeeds.

```javascript
passport.authenticate('local', { successFlash: 'Welcome!' });
```

Note: Using flash messages requires a `req.flash()` function.  Express 2.x
provided this functionality, however it was removed from Express 3.x.  Use of
[connect-flash](https://github.com/jaredhanson/connect-flash) middleware is
recommended to provide this functionality when using Express 3.x.

## Disable Sessions

After successful authentication, Passport will establish a persistent login
session.  This is useful for the common scenario of users accessing a web
application via a browser.  However, in some cases, session support is not
necessary.  For example, API servers typically require credentials to be
supplied with each request.  When this is the case, session support can be
safely disabled by setting the `session` option to `false`.

```javascript
app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });
```

## Custom Callback

If the built-in options are not sufficient for handling an authentication
request, a custom callback can be provided to allow the application to handle
success or failure.

```javascript
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
```

In this example, note that `authenticate()` is called from within the route
handler, rather than being used as route middleware.  This gives the callback
access to the `req` and `res` objects through closure.

If authentication failed, `user` will be set to `false`.  If an exception
occurred, `err` will be set.  An optional `info` argument will be passed,
containing additional details provided by the strategy's verify callback.

The callback can use the arguments supplied to handle the authentication result
as desired.  Note that when using a custom callback, it becomes the
application's responsibility to establish a session (by calling `req.login()`)
and send a response.
