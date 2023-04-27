# Requesting Authorization

The OAuth 1.0 protocol begins when the application requests authorization from
the user.  The authorization request is typically triggered based on the user
taking an action.  In the case of Twitter, such an action would be the user
clicking the "Sign in with Twitter" button.

For example, when the user clicks the following button:

```html
<a class="button" href="/login/federated/twitter">Sign in with Twitter</a>
```

The user's web browser makes a request to the application:

```http
GET /login/federated/twitter HTTP/1.1
Host: www.example.com
```

This request is handled by a route in the application:

```js
router.get('/login/federated/twitter', passport.authenticate('twitter'));
```

The route invokes Passport, and in particular the [`passport-oauth1`](https://www.passportjs.org/packages/passport-oauth1/)
strategy.  The strategy will redirect the user's web browser to Twitter, but
first it must [obtain a request token](../request-token/).

Now that the application has obtained an access token, it can [access the user
profile](../profile/).
