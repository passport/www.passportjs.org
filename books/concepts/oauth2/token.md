# Issuing Token

Once the application has received the authorization code, the application can
exchange that code for an access token.  It does this by making a _token
request_ to the authorization server's _token endpoint_
(`/v3.2/oauth/access_token`, in the case of Facebook):

```http
POST /v3.2/oauth/access_token HTTP/1.1
Host: graph.facebook.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https%3A%2F%2Fwww.example.com%2Foauth2%2Fredirect%2Ffacebook
&client_id=3087198538966924
&client_secret=q0ajuzz0dvjrylrej0lklqgrz4yhbij3
```

Let's examine the parameters in this request.

  * `grant_type`: Indicates the type of grant being exchanged for an access
      token.  The value `authorization_code` indicates that an authorization
      code is being exchanged, which is used by server-side web applications.
      
      Recall that OAuth 2.0 is a framework. Additional grant types are available
      for exchanging several forms of credentials and supporting other types of
      applications and use cases.  New types can be defined by extensions to
      OAuth 2.0.  This guide explains OAuth 2.0 as used by server-side web
      applications, so details of other grant types are not examined.
      
      Exchanging the authorization code is the final step of an authorization
      code flow, which began with the earlier authorization request in which
      `response_type` was set to `code`.
      
  * `code`: The authorization code received from the authorization server in the
      authorization response.
  
  * `redirect_uri`: The redirect URL included in the earlier authorization
      request.  Passport adds this automatically to prevent attacks that modify
      the value of this parameter in the authorization request.
      
  * `client_id`: Identifies the application to the authorization server.  This
      is assigned when registering the application with Facebook.
      
  * `client_secret`: The client secret, which is typically assigned when
      registering the application.  This acts similarly to a password, allowing
      the authorization server to authenticate the application.
      

Because the application is a server-side web application, the token request is
sent from the backend to Facebook.  This is often referred to as a
_back-channel_ request.  This is in contrast to the authorization request, which
is sent using redirects via the user's web browser.  Requests that flow through
a web browser are often referred to _front-channel_ requests.

Given that front-channel requests travel through the user's web browser, any
credentials or tokens carried in those requests are accessible to the user as
well as scripts executing in the browser.  This raises security concerns.

Because the authorization code flow completes with a back-channel request, it
has a few important security benefits.  One is the the ability to authenticate
the client using the client secret, which can be confidentially stored on the
backend.  Another is that the resulting access token is issued directly to the
application, without passing through the browser where it may be exposed to the
user or scripts.

When Facebook receives this request, it authenticates the application using the
`client_id` and `client_secret`.  It then verifies that the authorization code
is valid and was issued to the authenticated application.  Finally, it confirms
that the value of `redirect_uri` is identical to that included in the earlier
authorization request.

If the authorization request is valid and authorized, Facebook issues an access
token:

```
HTTP/1.1 200 OK
Content-Type: application/json
     
{
  "access_token": "IAxLF5woqmfjTCHRD6gnp9X9RNVK3TG0",
  "token_type": "bearer",
  "expires_in": 5169265
}
```

Let's examine the parameters in this response.

  * `access_token`: The access token issued by the authorization server.  This
      token is a credential the application can use to access the resource
      server.
  
  * `token_type`: Indicates the type of token that has been issued.  In this
      case, the value `bearer` signifies that the token is a [bearer
      token](/concepts/bearer-token/).
      
      Once again, recall that OAuth 2.0 is a framework.  The set of token types
      is extensible, and the definition of a type specifies how that token is
      used to access a protected resource and what additional parameters, if
      any, are included in the token response.
      
      This guide only examines bearer tokens, as they are the most common token
      type in use today and sufficient for a wide variety of applications.
      That being said, other token types (such as proof-of-posession) exist, and
      may be encountered in highly security-sensitive scenarios.
  
  * `expires_in`: The lifetime of the token, in seconds.  In this case, the
      token is valid for approximately 60 days.


Keep in mind that at this point, even as the token request and response have been
completed, Passport is still processing the authorization response using a route:

```js
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

The token request is interleaved in the middle of processing the authorization
response.  A visualization of of the requests and responses that have occured
up to this point looks as follows:

```sh
+-----+ <-- POST /oauth2/redirect/facebook --- +---------+
|     |                                        |         |
|     |   ----- Token Request  -----> +-----+  |         |
| App |   <---- Token Response ------ | AS  |  | Browser |
|     |                               +-----+  |         |
|     |   ...additional processing...          |         |
+-----+                                        +---------+
```

Now that the application has obtained an access token, it can [access the user
profile](../profile/).
