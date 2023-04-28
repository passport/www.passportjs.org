# Obtain Access Token

Once the user has granted access, the application can exchange the request token
for an _access token_.  To obtain a request token, the application makes
a request to the service providers's _access token URL_ (`/oauth/access_token`,
in the case of Twitter):

```http
POST /oauth/access_token HTTP/1.1
Host: api.twitter.com
Authorization: OAuth oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w",
  oauth_nonce="a9900fe68e2573b27a37f10fbad6a755",
  oauth_signature_method="HMAC-SHA1",
  oauth_timestamp="1318467427",
  oauth_token="NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0",
  oauth_verifier="uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY",
  oauth_version="1.0",
  oauth_signature="39cipBtIOHEEnybAR4sATQTpl2I%3D"
```

The parameters for this request are conveyed in the `Authorization` header.
Let's examine them.

If the authorization request is valid and authorized, Twitter issues an access
token:

```
HTTP/1.1 200 OK
Content-Type: application/x-www-form-urlencoded

oauth_token=7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4&
oauth_token_secret=PbKfYqSryyeKDWz4ebtY3o5ogNLG11WJuZBc9fQrQo
```

Let's examine the parameters in this response.

Now that the application has obtained an access token, it can [access the user
profile](../profile/).
