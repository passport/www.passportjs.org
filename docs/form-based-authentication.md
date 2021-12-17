# Form-based Authentication


  In the example above, however, failure is typically caused
by a user entering an incorrect password and the desired behavior is to prompt
the user to re-enter their password.  This can be accomplished by redirecting
the user to the login page using the `failureRedirect` option, which overrides
the default behavior.


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



API section
-- use of WWW-Authenticate rather than redirects
