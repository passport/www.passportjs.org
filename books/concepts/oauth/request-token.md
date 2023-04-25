# Obtain Request Token

Before the application can request authorization from the user, it must first
obtain a _request token_.  The request token identifies the authorization
request.  If the user grants access...

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

```
HTTP/1.1 200 OK
Content-Type: application/x-www-form-urlencoded

oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&
oauth_token_secret=veNRnAWe6inFuo8o2u8SLLZLjolYDmDP7SzL0YfYI&
oauth_callback_confirmed=true
```

```http
HTTP/1.1 302 Found
Location: https://api.twitter.com/oauth/authenticate?oauth_token=cTgIrQAAAAAAC3ETAAABh7iw_6g
```

The web browser follows this redirect and makes a request to Twitter:

```http
GET /oauth/authenticate?oauth_token=cTgIrQAAAAAAC3ETAAABh7iw_6g HTTP/1.1
Host: api.twitter.com
```
