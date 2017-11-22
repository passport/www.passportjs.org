---
title: Log Out
---

# Log Out

Passport exposes a `logout()` function on `req` (also aliased as `logOut()`)
that can be called from any route handler which needs to terminate a login
session.  Invoking `logout()` will remove the `req.user` property and clear the
login session (if any).

```javascript
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
```
