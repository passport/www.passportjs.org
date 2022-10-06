# Issuing Tokens

Once the application has received the authorization code, the application can
exchange that code for a set of tokens.  It does this by making a _token
request_ to the authorization server's _token endpoint_
(`/v3.2/oauth/access_token`, in the case of Facebook).

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
      
      Recall that OAuth 2.0 describes itself as a framework. Other grant types
      are available that support exchanging other credentials, supporting other
      types of applications and use cases.  New types can be defined by
      extensions to OAuth 2.0.  This guide explains OAuth 2.0 as used by
      server-side web applications, so details of other grant types are not
      examined.
      
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
      
  
...
