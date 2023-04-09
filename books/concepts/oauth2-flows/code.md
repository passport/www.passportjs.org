# Authorization Code

The authorization code flow is a redirect-based flow which takes place within
the user's web browser.  Authorization is requested by redirecting the user to
the authorization server.  The authorization server obtains the user's consent
and then redirects the user back to the application with an an authorization
code.  This authorization code is then exchanged for an access token.

The authorization code flow makes use of three OAuth 2.0 endpoints - two
endpoints on the authorization server and one on the application.   The first is
the _authorization endpoint_, which is where the user is redirected when making
an authorization request.  A browser makes an authorization request with an HTTP
request to the authorization server:

```http
GET /oauth2/authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Foauth2%2Fredirect HTTP/1.1
Host: server.example.com
```

The flow is determined by the `response_type` parameter in the request, which in
this case is set to `code` to indicate an _authorization code_ flow.

The purpose of the authorization endpoint is to allow the authorization server
to interact with the user and obtain their permission to allow the application
access to their account.  This interaction typically involves logging the user
in and obtaining their consent.

Once the user has authorized access, the authorization server redirects the user
back to the application's _redirection endpoint_ with an authorization response
containing an authorization code.

```http
HTTP/1.1 302 Found
Location: https://client.example.com/oauth2/redirect?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz
```

A browser follows this redirect by making an HTTP request to the application:

```http
GET /oauth2/redirect?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz HTTP/1.1
Host: client.example.com
```

The authorization code is then exchanged for access token when the application
makes a token request to the authorization server's _token endpoint_.  Unlike
the prior two requests, this request is sent directly from the application to
the authorization server in what is referred to as a _back-channel_ request.
This is in contrast to requests using redirects via the user's web browser,
which are known as _front-channel_ requests.

```http
POST /oauth2/token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https%3A%2F%2Fclient.example.com%2Foauth2%2Fredirect
&client_id=s6BhdRkqt3
&client_secret=gX1fBat3bV
```

When the authorization server receives this request, it verifies that all the
parameters are correct.  If the request is valid and authorized, an access token
(and optional refresh token) are issued:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"bearer",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
}
```

The use of the token endpoint to exchange an authorization code for an access
token is unique to the authorization code flow and has a number of important
security benefits.  One benefit is the ability to authenticate the application
using the client ID and client secret.  Applications that can securely maintain
these credentials are known as _confidential clients_.  Another is that tokens
are issued directly to the application, without passing through the browser
where the may be exposed to others.  These benefits will be examined in more
detail later in this guide to illustrate how different types of applications can
take advantage of them.
