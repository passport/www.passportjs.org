# Obtain Request Token

Before the application can request authorization from the user, it must first
obtain a _request token_.  The request token identifies the authorization
request.  If the user grants access, the application can exchange this request
token for an _access token_.  To obtain a request token, the application makes
a request to the service providers's _request token URL_
(`/oauth/request_token`, in the case of Twitter):

```http
POST /oauth/request_token HTTP/1.1
Host: api.twitter.com
Authorization: OAuth oauth_callback="https%3A%2F%2Fwww.example.com%2Foauth%2Fcallback%2Ftwitter",
  oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w",
  oauth_nonce="ea9ec8429b68d6b77cd5600adbbb0456",
  oauth_signature_method="HMAC-SHA1",
  oauth_timestamp="1318467427",
  oauth_version="1.0",
  oauth_signature="qCMIWvfCvmP0ZsfWGTPnuaPXsQE%3D"
```

The parameters for this request are conveyed in the `Authorization` header.
Let's examine them.

TODO:

When Twitter receives this request, it authenticates the application by
verifying that the signature was produced by corresponding consumer key and
secret.  If successful, Twitter generates a request token and secret:

```
HTTP/1.1 200 OK
Content-Type: application/x-www-form-urlencoded

oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&
oauth_token_secret=veNRnAWe6inFuo8o2u8SLLZLjolYDmDP7SzL0YfYI&
oauth_callback_confirmed=true
```

Now that the application has obtained a request token, it can redirect the
user's web browser to Twitter:

```http
HTTP/1.1 302 Found
Location: https://api.twitter.com/oauth/authenticate?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0
```

The web browser follows this redirect and makes a request to Twitter:

```http
GET /oauth/authenticate?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0 HTTP/1.1
Host: api.twitter.com
```

This request is sent to the service providers's _user authorization URL_
(`/oauth/authenticate`, in the case of Twitter).  Let's examine the parameters
in this request.

TODO

At this point, Twitter will interact with the user.  This interaction will
typically involve logging the user in (if they are not already logged in) and
obtaining their consent (if it has not been previously obtained).  Once that
has been completed, Twitter redirects the user back to the application:

```http
HTTP/1.1 302 Found
Location: https://www.example.com/oauth/callback/twitter?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&oauth_verifier=uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY
```

The web browser follows this redirect and makes a request to the application:

```http
GET /oauth/callback/twitter?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&oauth_verifier=uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY HTTP/1.1
Host: www.example.com
```

This request is sent to the application's _callback URL_ (`/oauth/callback/twitter`,
in this case), which corresponds to the value of the `oauth_callback` parameter in
the earlier request.  Let's examine the parameters in this request.

TODO

This request is handled by a route in the application:

```js
router.get('/oauth/callback/twitter', passport.authenticate('twitter', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

This route invokes Passport, and in particular the [`passport-oauth1`](https://www.passportjs.org/packages/passport-oauth1/)
strategy.  The strategy first loads the previously stored secret associated with
the request token.  It then [exchanges the request token for an access token](../access-token/).
