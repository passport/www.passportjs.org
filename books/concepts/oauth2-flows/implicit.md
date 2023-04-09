# Implicit

Like the authorization code flow, the implicit flow also takes place within the
user's web browser.  It is simplified in some ways that optimize it for
applications executed in a browser using client-side JavaScript.  Nominally, it
uses the same redirect-based approach as the authorization code flow.  In
practice, other scriptable client-side capabilities such as popup windows are
used to minimize the impact of page transitions that are otherwise encountered
using redirect-based flows.

The implicit flow makes use of two OAuth 2.0 endpoints - one endpoint on the
authorization server and one on the application.   The first is the
_authorization endpoint_, which is where the user is redirected when making
an authorization request.  A browser makes an authorization request with an HTTP
request to the authorization server:

```http
GET /oauth2/authorize?response_type=token&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Foauth2%2Fredirect HTTP/1.1
Host: server.example.com
```

The flow is determined by the `response_type` parameter in the request, which in
this case is set to `token` to indicate an _implicit_ flow.

The purpose of the authorization endpoint is to allow the authorization server
to interact with the user and obtain their permission to allow the application
access to their account.  This interaction typically involves logging the user
in and obtaining their consent.

Once the user has authorized access, the authorization server redirects the user
back to the application's _redirection endpoint_ with an authorization response
containing an access token.

```http
HTTP/1.1 302 Found
Location: https://client.example.com/oauth2/redirect#access_token=2YotnFZFEjr1zCsicMWpAA&state=xyz&token_type=bearer&expires_in=3600
```

A browser follows this redirect by making an HTTP request to the application:

```http
GET /oauth2/redirect HTTP/1.1
Host: client.example.com
```

Note that the authorization response includes the access token in the fragment
of the URL, which is not present in the HTTP request to the application.  In
this case, the application responds with a page that executes a script.  The
script, in turn, will extract the access token and other parameters contained in
the fragment.  At this point, the access token is available to the application.

Unlike the authorization code flow, the token endpoint is not used by the
implicit flow as there are no intermediate credentials such as an authorization
code to exchange for an access token.  An access token is directly, or
implicitly, issued as a result of an implicit flow, which is how this flow
derives its name.

While this flow is optimized for applications executing in a browser, those
optimizations have security tradeoffs that should not be ignored.
