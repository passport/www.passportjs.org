---
title: Middleware
---

# Middleware

Passport is used as middleware within a web application to authenticate
requests.  Middleware was popularized in [Node.js](https://nodejs.org/) by
[Express](https://expressjs.com/) and its even more minimalist sibling [Connect](https://github.com/senchalabs/connect).
Given its popularity, middleware is easily adaptable to other web frameworks.

The following code is an example of a route that authenticates a user with a
username and password:

```javascript
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

In this route, `passport.authenticate()` is [middleware](https://expressjs.com/en/guide/using-middleware.html)
which will authenticate the request.  By default, when authentication succeeds,
the `req.user` property is set to the authenticated user, a session is
established, and the next function in the stack is called.  This next function
is typically application-specific logic which will process the request on behalf
of the user.

When authentication fails, an HTTP `401 Unauthorized` response will be sent and
the request-response cycle will end.  Any additional functions in the stack will
not be called.  This default behavior is suitable for APIs obeying [representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)
(REST) constaints, and can be modified using options.

The mechanism used to authenticate the request is implemented by a strategy, of
which there can be many.  For instance, authenticating a user with a username
and password entails a different set of operations than authenticating a user
via OpenID Connect, even though both result in the same outcome of an
authenticated user.  In the route above, the `local` strategy is used to verify
a username and password.

Prior to employing a strategy to authenticate a request, the strategy must be
installed and configured.  This brings us to our [next](/docs/configure/) topic.
