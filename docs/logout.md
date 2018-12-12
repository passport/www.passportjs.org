---
title: Log Out
---

# Log Out

Passport exposes a `logout()` function on `req` (also aliased as `logOut()`)
that can be called from any route handler which needs to terminate a login
session.  Invoking `logout()` will remove the `req.user` property and clear the
login session (if any).

It is a good idea to use POST or DELETE requests instead of GET requests for the 
logout endpoints, in order to prevent accidental or malicious logouts.

```javascript
app.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
```
