
# Log In

Passport exposes a `login()` function on `req` (also aliased as `logIn()`) that
can be used to establish a login session.

```javascript
req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});
```

When the login operation completes, `user` will be assigned to `req.user`.

Note: `passport.authenticate()` middleware invokes `req.login()` automatically.
This function is primarily used when users sign up, during which `req.login()`
can be invoked to automatically log in the newly registered user.
